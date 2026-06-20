"use strict";

/**
 * lib/html-sanitizer.js
 *
 * Sanitize a raw captured HTML snapshot so it can be served as an OFFLINE,
 * read-only UI reference. The sanitized output can NEVER navigate back to the
 * live platform and can NEVER submit/mutate anything.
 *
 * Rules (see SHARED CONTRACT):
 *   - Remove all <script>, <noscript> and <base>. Strip every on* inline handler.
 *   - Neutralize forms: action="#", method="get", data-disabled-form="true";
 *     submit buttons/inputs -> type="button" + disabled. Strip javascript: hrefs.
 *   - Rewrite every <a href>:
 *       * resolve absolute (lib/url-utils.resolveUrl against pageUrl/baseUrl).
 *       * internal + localPageResolver(abs).exists -> href = localHref.
 *       * internal + missing local page -> href="#" + data-missing-local-page="true".
 *       * external -> href="#".
 *       * ALWAYS set data-original-href (absolute) and rel="noopener noreferrer".
 *   - <img>: add referrerpolicy="no-referrer". Leave <link rel=stylesheet> intact.
 *   - Insert an amber offline banner at the very top of <body>.
 *
 * Defensive: NEVER throws on malformed HTML. Returns the original raw HTML as a
 * last resort if cheerio fails catastrophically.
 *
 * CommonJS only. No ESM.
 */

const cheerio = require("cheerio");
const { resolveUrl, isInternal } = require("./url-utils");

const OFFLINE_BANNER_TEXT =
  "Offline UI reference snapshot — not connected to live platform.";

const OFFLINE_BANNER_STYLE = [
  "width:100%",
  "box-sizing:border-box",
  "padding:10px 16px",
  "background:#fef3c7",
  "color:#7c2d12",
  "border-bottom:2px solid #f59e0b",
  "font-family:system-ui,Segoe UI,Arial,sans-serif",
  "font-size:14px",
  "font-weight:600",
  "text-align:center",
  "line-height:1.4",
  "z-index:2147483647",
  "position:relative",
].join(";");

/**
 * Remove every inline event-handler attribute (on*) from an element node.
 * @param {object} $el - cheerio-wrapped element.
 */
function stripInlineHandlers($el) {
  const node = $el.get(0);
  if (!node || !node.attribs) return;
  // Collect first because we mutate the attribs object while iterating.
  const toRemove = [];
  for (const attrName of Object.keys(node.attribs)) {
    if (/^on/i.test(attrName)) {
      toRemove.push(attrName);
    }
  }
  for (const attrName of toRemove) {
    $el.removeAttr(attrName);
  }
}

/**
 * Return true when an href value uses the javascript: scheme.
 * @param {string|undefined} href
 * @returns {boolean}
 */
function isJavascriptHref(href) {
  if (typeof href !== "string") return false;
  return /^\s*javascript:/i.test(href);
}

/**
 * Resolve the base URL to use for href resolution.
 * Prefer the explicit page URL, fall back to the platform base URL.
 * @param {string} pageUrl
 * @param {string} baseUrl
 * @returns {string}
 */
function pickBase(pageUrl, baseUrl) {
  if (typeof pageUrl === "string" && pageUrl.trim() !== "") return pageUrl;
  if (typeof baseUrl === "string" && baseUrl.trim() !== "") return baseUrl;
  return "";
}

/**
 * sanitizeHtml(rawHtml, { pageUrl, baseUrl, localPageResolver }) -> string
 *
 * @param {string} rawHtml
 * @param {object} opts
 * @param {string} opts.pageUrl   - absolute URL the snapshot was captured from.
 * @param {string} opts.baseUrl   - platform base URL.
 * @param {function} opts.localPageResolver - (absoluteUrl) => { exists:bool, localHref:string }
 * @returns {string} sanitized HTML
 */
function sanitizeHtml(rawHtml, opts) {
  const options = opts || {};
  const pageUrl = options.pageUrl;
  const baseUrl = options.baseUrl;
  const localPageResolver =
    typeof options.localPageResolver === "function"
      ? options.localPageResolver
      : null;

  const safeRaw = typeof rawHtml === "string" ? rawHtml : "";
  const resolveBase = pickBase(pageUrl, baseUrl);

  let $;
  try {
    $ = cheerio.load(safeRaw, { decodeEntities: false });
  } catch (_) {
    // cheerio failed to even parse — return the original raw input unchanged
    // rather than throwing.
    return safeRaw;
  }

  try {
    // ---------------------------------------------------------------------
    // 1) Remove dangerous / interfering elements entirely.
    // ---------------------------------------------------------------------
    $("script").remove();
    $("noscript").remove();
    $("base").remove();

    // ---------------------------------------------------------------------
    // 2) Strip every inline on* event handler from every element.
    // ---------------------------------------------------------------------
    $("*").each((_i, el) => {
      stripInlineHandlers($(el));
    });

    // ---------------------------------------------------------------------
    // 3) Neutralize forms.
    // ---------------------------------------------------------------------
    $("form").each((_i, el) => {
      const $form = $(el);
      $form.attr("action", "#");
      $form.attr("method", "get");
      $form.attr("data-disabled-form", "true");
    });

    // Convert submit buttons / inputs into inert buttons.
    $(
      'button[type="submit"], input[type="submit"], input[type="image"], input[type="reset"], button[type="reset"]'
    ).each((_i, el) => {
      const $btn = $(el);
      $btn.attr("type", "button");
      $btn.attr("disabled", "disabled");
    });

    // A <button> with no type defaults to submit inside a form — make it inert.
    $("form button:not([type])").each((_i, el) => {
      const $btn = $(el);
      $btn.attr("type", "button");
      $btn.attr("disabled", "disabled");
    });

    // ---------------------------------------------------------------------
    // 4) Rewrite every anchor.
    // ---------------------------------------------------------------------
    $("a").each((_i, el) => {
      const $a = $(el);
      const rawHref = $a.attr("href");

      // Always neutralize javascript: hrefs and never leave them executable.
      const jsHref = isJavascriptHref(rawHref);

      // Resolve to an absolute URL for record-keeping & classification.
      let absolute = null;
      if (!jsHref) {
        absolute = resolveUrl(resolveBase, rawHref);
      }

      // rel hardening applies to all anchors.
      $a.attr("rel", "noopener noreferrer");

      if (jsHref) {
        // Strip javascript: href entirely; record nothing navigable.
        $a.attr("href", "#");
        $a.attr("data-original-href", typeof rawHref === "string" ? rawHref : "");
        return;
      }

      if (!absolute) {
        // Unresolvable / empty / pure fragment -> inert anchor.
        $a.attr("href", "#");
        if (typeof rawHref === "string") {
          $a.attr("data-original-href", rawHref);
        }
        return;
      }

      // Record the real destination for traceability.
      $a.attr("data-original-href", absolute);

      const internal = isInternal(absolute, baseUrl);

      if (internal) {
        let resolvedLocal = null;
        if (localPageResolver) {
          try {
            resolvedLocal = localPageResolver(absolute);
          } catch (_) {
            resolvedLocal = null;
          }
        }
        if (
          resolvedLocal &&
          resolvedLocal.exists === true &&
          typeof resolvedLocal.localHref === "string" &&
          resolvedLocal.localHref !== ""
        ) {
          // Point to the local offline snapshot.
          $a.attr("href", resolvedLocal.localHref);
        } else {
          // Internal route we did not snapshot — dead-end it locally.
          $a.attr("href", "#");
          $a.attr("data-missing-local-page", "true");
        }
      } else {
        // External — never allow navigation back to the live web.
        $a.attr("href", "#");
      }
    });

    // ---------------------------------------------------------------------
    // 5) Harden <img>: do not leak referrer to remote asset hosts.
    //    (CSS/asset URLs remain remote — documented limitation.)
    // ---------------------------------------------------------------------
    $("img").each((_i, el) => {
      $(el).attr("referrerpolicy", "no-referrer");
    });

    // ---------------------------------------------------------------------
    // 6) Inject the offline banner at the very top of <body>.
    // ---------------------------------------------------------------------
    let $body = $("body");
    if ($body.length === 0) {
      // No <body> in the captured fragment — create one wrapping everything
      // so the banner still appears, but only if there is an <html> to host it.
      if ($("html").length > 0) {
        $("html").append("<body></body>");
        $body = $("body");
      }
    }

    if ($body.length > 0) {
      const bannerHtml =
        '<div data-offline-banner="true" style="' +
        OFFLINE_BANNER_STYLE +
        '">' +
        OFFLINE_BANNER_TEXT +
        "</div>";
      $body.first().prepend(bannerHtml);
    } else {
      // Truly bodyless fragment — prepend the banner to the document root.
      $.root().prepend(
        '<div data-offline-banner="true" style="' +
          OFFLINE_BANNER_STYLE +
          '">' +
          OFFLINE_BANNER_TEXT +
          "</div>"
      );
    }

    return $.html();
  } catch (_) {
    // Any unexpected failure mid-transform — fall back to whatever cheerio has,
    // and if even serialization fails, return the original raw HTML.
    try {
      return $.html();
    } catch (__) {
      return safeRaw;
    }
  }
}

module.exports = { sanitizeHtml };

"use strict";

/**
 * lib/url-utils.js
 *
 * URL utility helpers for the Academy Dashboard Discovery Crawler.
 * All functions are defensive: malformed input returns null/"external"/"" rather than throwing.
 *
 * CommonJS only. No ESM.
 */

const { slugify } = require("./fs-utils");

// ---------------------------------------------------------------------------
// Volatile query-param names to strip when normalising routes.
// Any key that starts with "utm_" is also stripped (handled in code below).
// ---------------------------------------------------------------------------
const VOLATILE_PARAMS = new Set([
  "token",
  "_",
  "t",
  "ts",
  "timestamp",
  "cache",
  "v",
  "rand",
  "nonce",
  "sid",
  "session",
  "sessionid",
  "jsessionid",
  "fbclid",
  "gclid",
]);

/**
 * Return true if the given param key should be stripped as volatile.
 * @param {string} key
 * @returns {boolean}
 */
function isVolatileParam(key) {
  const lower = key.toLowerCase();
  return VOLATILE_PARAMS.has(lower) || lower.startsWith("utm_");
}

// ---------------------------------------------------------------------------
// resolveUrl(base, href) -> absolute string | null
// ---------------------------------------------------------------------------

/**
 * Resolve an href relative to a base URL.
 * Returns the absolute URL string or null if either input is invalid.
 *
 * @param {string} base   - Absolute base URL.
 * @param {string} href   - Possibly-relative href.
 * @returns {string|null}
 */
function resolveUrl(base, href) {
  if (typeof href !== "string" || href.trim() === "") return null;
  try {
    return new URL(href, base).href;
  } catch (_) {
    return null;
  }
}

// ---------------------------------------------------------------------------
// getPathname(url) -> pathname string | ""
// ---------------------------------------------------------------------------

/**
 * Extract the pathname from a URL string.
 * Returns "" on parse failure.
 *
 * @param {string} url
 * @returns {string}
 */
function getPathname(url) {
  if (typeof url !== "string" || url.trim() === "") return "";
  try {
    return new URL(url).pathname;
  } catch (_) {
    return "";
  }
}

// ---------------------------------------------------------------------------
// isSameOrigin(url, baseUrl) -> bool
// ---------------------------------------------------------------------------

/**
 * Return true when both URLs parse successfully and share the same origin
 * (scheme + host + port).
 *
 * @param {string} url
 * @param {string} baseUrl
 * @returns {boolean}
 */
function isSameOrigin(url, baseUrl) {
  try {
    return new URL(url).origin === new URL(baseUrl).origin;
  } catch (_) {
    return false;
  }
}

// ---------------------------------------------------------------------------
// isInternal(url, baseUrl) -> bool
// ---------------------------------------------------------------------------

/**
 * Return true when the URL uses http(s) and shares the same origin as baseUrl.
 *
 * @param {string} url
 * @param {string} baseUrl
 * @returns {boolean}
 */
function isInternal(url, baseUrl) {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    return isSameOrigin(url, baseUrl);
  } catch (_) {
    return false;
  }
}

// ---------------------------------------------------------------------------
// normalizeRoute(url) -> canonical key string
// ---------------------------------------------------------------------------

/**
 * Produce a canonical dedupe key from a URL:
 *   - Lowercase origin + pathname.
 *   - Drop fragment/hash.
 *   - Drop trailing slash (except root "/").
 *   - Drop volatile query params; keep remaining sorted by key.
 *
 * Returns "" on parse failure.
 *
 * @param {string} url
 * @returns {string}
 */
function normalizeRoute(url) {
  if (typeof url !== "string" || url.trim() === "") return "";
  try {
    const parsed = new URL(url);
    // Lowercase origin
    const origin = parsed.origin.toLowerCase();

    // Lowercase pathname, strip trailing slash (unless root)
    let pathname = parsed.pathname.toLowerCase();
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Build cleaned, sorted query string (drop volatile params)
    const keptParams = [];
    for (const [key, value] of parsed.searchParams.entries()) {
      if (!isVolatileParam(key)) {
        keptParams.push([key.toLowerCase(), value]);
      }
    }
    // Sort by key for stable canonical form
    keptParams.sort((a, b) => a[0].localeCompare(b[0]));

    let query = "";
    if (keptParams.length > 0) {
      const sp = new URLSearchParams(keptParams);
      query = "?" + sp.toString();
    }

    return origin + pathname + query;
  } catch (_) {
    return "";
  }
}

// ---------------------------------------------------------------------------
// routeToSlug(url) -> filesystem-safe slug
// ---------------------------------------------------------------------------

/**
 * Derive a filesystem-safe slug from the pathname (plus meaningful query params)
 * of a URL. Root "/" becomes "home".
 *
 * @param {string} url
 * @returns {string}
 */
function routeToSlug(url) {
  if (typeof url !== "string" || url.trim() === "") return "page";
  try {
    const parsed = new URL(url);

    let pathname = parsed.pathname;
    if (pathname === "" || pathname === "/") {
      return "home";
    }

    // Build a base string from pathname
    let base = pathname;

    // Append non-volatile query params for disambiguation
    const keptParams = [];
    for (const [key, value] of parsed.searchParams.entries()) {
      if (!isVolatileParam(key)) {
        keptParams.push(key + "=" + value);
      }
    }
    if (keptParams.length > 0) {
      base += " " + keptParams.join(" ");
    }

    const slug = slugify(base);
    return slug || "page";
  } catch (_) {
    return "page";
  }
}

// ---------------------------------------------------------------------------
// isUnsupportedFile(url) -> bool
// ---------------------------------------------------------------------------

/**
 * Return true if the URL points to a non-navigable asset or download
 * (PDF, ZIP, image, font, media, Office documents, etc.).
 *
 * @param {string} url
 * @returns {boolean}
 */
function isUnsupportedFile(url) {
  const UNSUPPORTED_EXTENSIONS = new Set([
    "pdf", "zip", "rar", "7z", "gz",
    "doc", "docx", "xls", "xlsx", "ppt", "pptx", "csv",
    "png", "jpg", "jpeg", "gif", "svg", "webp", "bmp", "ico",
    "mp4", "mp3", "wav", "avi", "mov",
    "woff", "woff2", "ttf", "otf", "eot",
    "exe", "dmg", "apk", "pkg",
  ]);

  if (typeof url !== "string" || url.trim() === "") return false;
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    const lastDot = pathname.lastIndexOf(".");
    if (lastDot === -1) return false;
    const ext = pathname.slice(lastDot + 1);
    return UNSUPPORTED_EXTENSIONS.has(ext);
  } catch (_) {
    // Fall back to regex on the raw string
    const ext = url.split("?")[0].split(".").pop().toLowerCase();
    return UNSUPPORTED_EXTENSIONS.has(ext);
  }
}

// ---------------------------------------------------------------------------
// isLocaleSwitchUrl(url) -> bool
// ---------------------------------------------------------------------------

/**
 * Return true if the URL switches the UI language/locale rather than showing a
 * content page (e.g. /management/lang/de, /language/ar, ?lang=tr, ?locale=es).
 *
 * Crawling these is harmful: it changes the session display language mid-crawl
 * (mixing locales in the capture) and is a session-state change we should avoid.
 * They are recorded as a safe skip with a clear reason, never navigated.
 *
 * @param {string} url
 * @returns {boolean}
 */
function isLocaleSwitchUrl(url) {
  if (typeof url !== "string" || url.trim() === "") return false;
  let pathname = "";
  let search = "";
  try {
    const u = new URL(url);
    pathname = (u.pathname || "").toLowerCase();
    search = (u.search || "").toLowerCase();
  } catch (_) {
    const raw = url.toLowerCase();
    const q = raw.indexOf("?");
    pathname = q === -1 ? raw : raw.slice(0, q);
    search = q === -1 ? "" : raw.slice(q);
  }
  // Path form requiring a locale CODE: /lang/de, /language/ar, /locale/en-us,
  // /lng/tr. Requiring the code avoids false-matching a content page such as
  // /settings/language (no trailing locale code).
  if (/\/(lang|language|locale|lng)\/[a-z]{2,3}(-[a-z]{2,4})?\/?$/.test(pathname)) {
    return true;
  }
  // Query form: ?lang=xx, ?locale=xx, ?lng=xx, ?language=xx
  if (/[?&](lang|language|locale|lng)=[a-z]{2,3}(-[a-z]{2,4})?(&|$)/.test(search)) {
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// isAuthPage(url) -> bool
// ---------------------------------------------------------------------------

/**
 * Return true if the URL is an authentication gate (login/register/password
 * reset). When already authenticated these typically redirect to the dashboard,
 * so crawling them yields duplicate content keyed under the auth route — and a
 * stray click could end the session. Recorded as a safe skip, never navigated.
 *
 * @param {string} url
 * @returns {boolean}
 */
function isAuthPage(url) {
  if (typeof url !== "string" || url.trim() === "") return false;
  let pathname = "";
  try {
    pathname = (new URL(url).pathname || "").toLowerCase();
  } catch (_) {
    pathname = String(url).toLowerCase().split("?")[0];
  }
  return /\/(login|signin|sign-in|sign_in|register|signup|sign-up|password\/reset|reset-password|forgot-password)\/?$/.test(
    pathname
  );
}

// ---------------------------------------------------------------------------
// classifyUrlTarget(url, baseUrl) -> classification string
// ---------------------------------------------------------------------------

/**
 * Classify what a URL target represents:
 *   "internal"          - http(s) same-origin navigable page
 *   "external"          - http(s) different origin
 *   "unsupported_file"  - asset / download extension
 *   "anchor"            - empty, "#", or pure same-page hash
 *   "mailto_tel"        - mailto: or tel: scheme
 *   "javascript"        - javascript: scheme
 *
 * Returns "external" as a safe fallback for anything unrecognised.
 *
 * @param {string} url
 * @param {string} baseUrl
 * @returns {string}
 */
function classifyUrlTarget(url, baseUrl) {
  if (typeof url !== "string") return "external";

  const trimmed = url.trim();

  // Anchor: empty, "#", or starts with "#"
  if (trimmed === "" || trimmed === "#" || /^#/.test(trimmed)) {
    return "anchor";
  }

  // javascript: scheme
  if (/^javascript:/i.test(trimmed)) {
    return "javascript";
  }

  // mailto: / tel:
  if (/^(mailto|tel):/i.test(trimmed)) {
    return "mailto_tel";
  }

  // Try to parse as a full URL.  If it fails, treat as anchor (relative fragment)
  let parsed;
  try {
    parsed = new URL(trimmed, baseUrl);
  } catch (_) {
    return "anchor";
  }

  // Re-check for javascript (could have been constructed)
  if (parsed.protocol === "javascript:") return "javascript";
  if (parsed.protocol === "mailto:" || parsed.protocol === "tel:") return "mailto_tel";

  // Non-http(s) schemes (ftp, data, blob, …)
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return "external";
  }

  // Unsupported file extension
  if (isUnsupportedFile(parsed.href)) {
    return "unsupported_file";
  }

  // Internal vs external
  if (isSameOrigin(parsed.href, baseUrl)) {
    return "internal";
  }

  return "external";
}

// ---------------------------------------------------------------------------
// stripVolatileParams(url) -> cleaned URL string
// ---------------------------------------------------------------------------

/**
 * Return the URL with all volatile query parameters removed.
 * Returns the original string on parse failure.
 *
 * @param {string} url
 * @returns {string}
 */
function stripVolatileParams(url) {
  if (typeof url !== "string" || url.trim() === "") return url;
  try {
    const parsed = new URL(url);
    const keysToDelete = [];
    for (const key of parsed.searchParams.keys()) {
      if (isVolatileParam(key)) {
        keysToDelete.push(key);
      }
    }
    for (const key of keysToDelete) {
      parsed.searchParams.delete(key);
    }
    return parsed.href;
  } catch (_) {
    return url;
  }
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  resolveUrl,
  getPathname,
  isSameOrigin,
  isInternal,
  normalizeRoute,
  routeToSlug,
  classifyUrlTarget,
  isUnsupportedFile,
  isLocaleSwitchUrl,
  isAuthPage,
  stripVolatileParams,
};

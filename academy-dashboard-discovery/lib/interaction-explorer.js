"use strict";

/**
 * lib/interaction-explorer.js
 *
 * The most delicate module of the read-only discovery crawler.
 *
 * Purpose: on an already-loaded page, gently exercise SAFE interactive controls
 * (dropdown triggers, tabs, accordion toggles, filter openers, "view/details"
 * links, profile/notification/menu buttons, popover triggers) to discover the
 * UI states they reveal — dropdown menus, modals/dialogs, tab panels, accordion
 * regions, inline state changes — WITHOUT ever mutating live data.
 *
 * Hard guarantees:
 *   - NEVER clicks a control classified as unsafe (submit/logout/mutating).
 *   - Always re-queries candidate locators from a fresh list each iteration to
 *     avoid stale element handles.
 *   - One failing click NEVER stops the loop.
 *   - Always restores page state between clicks (close menus/modals, scroll top).
 *   - Does NOT deep-crawl: safe internal navigations are recorded and the page
 *     is restored via goBack so the caller can enqueue them.
 *
 * CommonJS only. Depends on lib/safety and lib/wait-utils plus Node builtins.
 */

const safety = require("./safety");
const waitUtils = require("./wait-utils");

const { classifyAction, normalizeText, isUnsafeUrl } = safety;
const {
  settle,
  waitForContent,
  waitForSpinnersGone,
  scrollToTop,
  dismissOverlay,
} = waitUtils;

// ────────────────────────────────────────────────────────────────────────────
// Selectors for candidate SAFE triggers and for state detection.
// ────────────────────────────────────────────────────────────────────────────

// Ordered list of selectors whose matches we consider as candidate triggers.
// Each candidate carries the selector that found it as a "selector hint".
const CANDIDATE_SELECTORS = [
  // Dropdown / popover / menu triggers
  "[aria-haspopup]",
  "[data-toggle*=drop]",
  "[data-bs-toggle*=drop]",
  "[class*=dropdown-toggle]",
  "[class*=menu-trigger]",
  "[data-toggle=popover]",
  "[data-bs-toggle=popover]",
  // Tabs
  "[role=tab]",
  // Accordion toggles
  "[data-toggle*=collapse]",
  "[data-bs-toggle*=collapse]",
  "[class*=accordion] [class*=header]",
  "[class*=accordion-button]",
  "[class*=accordion-toggle]",
  // Filter openers
  "[class*=filter] button",
  "button[class*=filter]",
  "[aria-label*=filter i]",
  // Profile / notifications / menu buttons
  "[class*=profile] button",
  "button[class*=profile]",
  "[class*=notification] button",
  "button[class*=notification]",
  "[aria-label*=notification i]",
  "[aria-label*=menu i]",
  "button[class*=menu]",
  // Modal / dialog openers. A data-*-toggle="modal" trigger only opens a
  // client-side dialog (no navigation, no submit, no mutation), so it is safe to
  // OPEN — we capture the dialog's fields/buttons for documentation and close it
  // without ever clicking inside it. See the modal-open allowance in the gate.
  "[data-bs-toggle=modal]",
  "[data-toggle=modal]",
];

// "view / details / more" style safe links and buttons (text-based; filtered by
// classifyAction afterwards). We collect anchors and buttons broadly and then
// keep only those whose normalized text looks like a safe view affordance.
const VIEW_DETAIL_SELECTOR = "a, button";

// Tokens (normalized EN + AR) that mark a link/button as a "view/details/more"
// affordance worth exercising.
const VIEW_DETAIL_TOKENS = [
  "view",
  "details",
  "detail",
  "more",
  "show",
  "open",
  "preview",
  "info",
  "expand",
  // Arabic (already normalized by normalizeText: ة->ه, etc.)
  "عرض",
  "تفاصيل",
  "المزيد",
  "عرض التفاصيل",
  "توسيع",
];

// Dialog / modal detection selectors (kept in sync with wait-utils).
const DIALOG_SELECTORS = [
  "[role=dialog]",
  "[aria-modal=true]",
  ".modal",
  ".drawer",
  ".offcanvas",
  "[class*=modal]",
];

// Menu / dropdown panel detection selectors.
const MENU_SELECTORS = [
  "[role=menu]",
  "[class*=dropdown-menu]",
  "[class*=menu-list]",
  "[class*=popover]",
  "[class*=popup]",
];

// Close-button selectors used as a last resort to dismiss stubborn modals.
const CLOSE_BUTTON_SELECTORS = [
  "[aria-label*=close i]",
  "[aria-label*=dismiss i]",
  "[class*=close]",
  "[class*=dismiss]",
  "button[data-dismiss]",
  "button[data-bs-dismiss]",
];

const BACKDROP_SELECTORS = ["[class*=backdrop]", "[class*=overlay]"];

const DEFAULT_CLICK_TIMEOUT = 6000;

// ────────────────────────────────────────────────────────────────────────────
// In-page state snapshot helpers (run inside page.evaluate).
// ────────────────────────────────────────────────────────────────────────────

/**
 * Capture a lightweight snapshot of "interactive UI state" so we can diff before
 * and after a click. Runs entirely in the page context (no Node access).
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<Object>} snapshot
 */
async function captureState(page) {
  try {
    return await page.evaluate(
      ({ dialogSel, menuSel }) => {
        function isVisible(el) {
          if (!el) return false;
          const style = window.getComputedStyle(el);
          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.opacity === "0"
          ) {
            return false;
          }
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }

        function anyVisible(selectors) {
          for (const sel of selectors) {
            let els;
            try {
              els = document.querySelectorAll(sel);
            } catch (e) {
              continue;
            }
            for (const el of els) {
              if (isVisible(el)) return true;
            }
          }
          return false;
        }

        // Selected tab signature (role=tab aria-selected + active classes).
        let tabSignature = "";
        try {
          const tabs = document.querySelectorAll(
            "[role=tab],[class*=tab]:not([class*=table])"
          );
          const parts = [];
          tabs.forEach((t, i) => {
            const selected =
              t.getAttribute("aria-selected") === "true" ||
              /(^|\s)(active|selected|is-active|current)(\s|$)/.test(
                t.className || ""
              );
            if (selected) parts.push(i);
          });
          tabSignature = parts.join(",");
        } catch (e) {
          tabSignature = "";
        }

        // Aggregate aria-expanded states.
        let expandedCount = 0;
        try {
          const expandables = document.querySelectorAll("[aria-expanded]");
          expandables.forEach((el) => {
            if (el.getAttribute("aria-expanded") === "true") expandedCount += 1;
          });
        } catch (e) {
          expandedCount = 0;
        }

        // Visible accordion content regions.
        let accordionOpen = 0;
        try {
          const regions = document.querySelectorAll(
            "[class*=accordion] [class*=body],[class*=accordion] [class*=content],[class*=collapse]"
          );
          regions.forEach((r) => {
            if (isVisible(r)) accordionOpen += 1;
          });
        } catch (e) {
          accordionOpen = 0;
        }

        return {
          url: window.location.href,
          dialogVisible: anyVisible(dialogSel),
          menuVisible: anyVisible(menuSel),
          tabSignature: tabSignature,
          expandedCount: expandedCount,
          accordionOpen: accordionOpen,
          domLength: document.body ? document.body.innerHTML.length : 0,
        };
      },
      { dialogSel: DIALOG_SELECTORS, menuSel: MENU_SELECTORS }
    );
  } catch (_) {
    return {
      url: "",
      dialogVisible: false,
      menuVisible: false,
      tabSignature: "",
      expandedCount: 0,
      accordionOpen: 0,
      domLength: 0,
    };
  }
}

/**
 * Capture details of the first currently-visible dialog/modal/drawer.
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<{title:string,buttons:string[],fields:string[],text:string}|null>}
 */
async function captureModalDetails(page) {
  try {
    return await page.evaluate((dialogSel) => {
      function isVisible(el) {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0"
        ) {
          return false;
        }
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }

      let dialog = null;
      for (const sel of dialogSel) {
        let els;
        try {
          els = document.querySelectorAll(sel);
        } catch (e) {
          continue;
        }
        for (const el of els) {
          if (isVisible(el)) {
            dialog = el;
            break;
          }
        }
        if (dialog) break;
      }
      if (!dialog) return null;

      function clean(s) {
        return (s || "").replace(/\s+/g, " ").trim();
      }

      // Title: aria-label, [class*=title]/[class*=header], or first heading.
      let title = clean(dialog.getAttribute("aria-label"));
      if (!title) {
        const titleEl = dialog.querySelector(
          "[class*=title],[class*=header] *,[class*=header],h1,h2,h3,h4,h5,h6"
        );
        if (titleEl) title = clean(titleEl.textContent).slice(0, 200);
      }

      // Buttons inside the dialog.
      const buttons = [];
      dialog
        .querySelectorAll("button,[role=button],a[class*=btn],input[type=button]")
        .forEach((b) => {
          const t = clean(b.textContent) || clean(b.getAttribute("aria-label"));
          if (t && buttons.indexOf(t) === -1) buttons.push(t);
        });

      // Field labels / names (NEVER capture values; never read passwords).
      const fields = [];
      dialog
        .querySelectorAll("input,select,textarea")
        .forEach((f) => {
          const type = (f.getAttribute("type") || "").toLowerCase();
          if (type === "password") return; // never describe password fields' content
          let label = "";
          const id = f.getAttribute("id");
          if (id) {
            const lab = dialog.querySelector(
              'label[for="' + id.replace(/"/g, '\\"') + '"]'
            );
            if (lab) label = clean(lab.textContent);
          }
          if (!label) label = clean(f.getAttribute("aria-label"));
          if (!label) label = clean(f.getAttribute("name"));
          if (!label) label = clean(f.getAttribute("placeholder"));
          if (!label) label = "(" + (f.tagName || "field").toLowerCase() + ")";
          if (label && fields.indexOf(label) === -1) fields.push(label);
        });

      const text = clean(dialog.textContent).slice(0, 1200);

      return { title: title || "", buttons, fields, text };
    }, DIALOG_SELECTORS);
  } catch (_) {
    return { title: "", buttons: [], fields: [], text: "" };
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Candidate collection.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build the ordered, deduped list of candidate trigger descriptors. Each
 * descriptor records the selector + the index WITHIN that selector's match list
 * so we can re-query a fresh locator on each iteration (avoiding stale handles).
 *
 * Dedupe key = normalizeText(text) + "::" + tagName.
 *
 * @param {import('playwright').Page} page
 * @param {number} cap maximum number of candidates to return
 * @returns {Promise<Array<{selector:string,nth:number,text:string,tagName:string,key:string,selectorHint:string}>>}
 */
async function collectCandidates(page, cap) {
  const candidates = [];
  const seen = new Set();

  /**
   * Pull descriptors for all elements matching one selector, attaching the
   * stable per-selector index so they can be re-located by nth().
   */
  async function gather(selector, hint, filterFn) {
    let locator;
    try {
      locator = page.locator(selector);
    } catch (_) {
      return;
    }
    let count = 0;
    try {
      count = await locator.count();
    } catch (_) {
      return;
    }
    for (let i = 0; i < count; i += 1) {
      if (candidates.length >= cap) return;
      const el = locator.nth(i);
      let descriptor;
      try {
        descriptor = await describeElement(el);
      } catch (_) {
        continue;
      }
      if (!descriptor) continue;

      // Only visible, enabled candidates are worth exercising.
      if (!descriptor.visible) continue;

      // Optional extra filter (used for the view/details text scan).
      if (typeof filterFn === "function" && !filterFn(descriptor)) continue;

      const key = normalizeText(descriptor.text) + "::" + descriptor.tagName;
      if (seen.has(key)) continue;
      seen.add(key);

      candidates.push({
        selector,
        nth: i,
        text: descriptor.text,
        tagName: descriptor.tagName,
        key,
        selectorHint: hint || selector,
      });
    }
  }

  // 1) Structured candidate selectors.
  for (const sel of CANDIDATE_SELECTORS) {
    if (candidates.length >= cap) break;
    await gather(sel, sel);
  }

  // 2) "view / details / more" text-based affordances among links & buttons.
  if (candidates.length < cap) {
    await gather(VIEW_DETAIL_SELECTOR, "view-detail-link", (descriptor) => {
      const norm = normalizeText(descriptor.text);
      if (!norm) return false;
      return VIEW_DETAIL_TOKENS.some((tok) => {
        const t = normalizeText(tok);
        return t && norm.indexOf(t) !== -1;
      });
    });
  }

  return candidates.slice(0, cap);
}

/**
 * Extract a descriptor for a single Playwright locator (handle to one element).
 * Returns null if the element cannot be described.
 *
 * @param {import('playwright').Locator} el
 * @returns {Promise<Object|null>}
 */
async function describeElement(el) {
  try {
    const visible = await el.isVisible().catch(() => false);
    const handleData = await el.evaluate((node) => {
      function clean(s) {
        return (s || "").replace(/\s+/g, " ").trim();
      }
      let enabled = true;
      if (node.disabled === true) enabled = false;
      if (node.getAttribute && node.getAttribute("aria-disabled") === "true") {
        enabled = false;
      }
      // Class-based disabled state (e.g. a disabled wizard step <a class="disabled">
      // or its <li class="disabled"> parent) — avoids a long click timeout on a
      // control Playwright would refuse to click anyway.
      try {
        const ownCls = typeof node.className === "string" ? node.className : (node.className && node.className.baseVal) || "";
        if (/(^|[\s-])disabled([\s-]|$)/i.test(ownCls)) enabled = false;
        const wrap = node.closest ? node.closest("li, [role=tab], [class*=step]") : null;
        if (wrap && /(^|[\s-])disabled([\s-]|$)/i.test(wrap.className || "")) enabled = false;
      } catch (eDis) {
        /* ignore */
      }
      return {
        text: clean(node.textContent).slice(0, 160),
        ariaLabel: clean(node.getAttribute && node.getAttribute("aria-label")),
        title: clean(node.getAttribute && node.getAttribute("title")),
        role: clean(node.getAttribute && node.getAttribute("role")),
        tagName: (node.tagName || "").toLowerCase(),
        type: clean(node.getAttribute && node.getAttribute("type")),
        href: node.href || "",
        insideForm: !!(node.closest && node.closest("form")),
        formMethod: (function () {
          var f = node.closest ? node.closest("form") : null;
          return f ? String(f.method || "get").toLowerCase() : "";
        })(),
        isModalTrigger: (function () {
          try {
            var dt = (node.getAttribute("data-bs-toggle") || node.getAttribute("data-toggle") || "").toLowerCase();
            if (dt === "modal") return true;
            var tgt = node.getAttribute("data-bs-target") || node.getAttribute("data-target") || "";
            if (tgt && tgt.charAt(0) === "#") {
              var el = document.querySelector(tgt);
              if (el && /modal|dialog|offcanvas/i.test(el.className || "")) return true;
            }
          } catch (e) {
            /* ignore */
          }
          return false;
        })(),
        enabled: enabled,
      };
    });
    return {
      visible: visible && handleData.enabled,
      text: handleData.text,
      ariaLabel: handleData.ariaLabel,
      title: handleData.title,
      role: handleData.role,
      tagName: handleData.tagName,
      type: handleData.type,
      href: handleData.href,
      insideForm: handleData.insideForm === true,
      formMethod: handleData.formMethod || "",
      isModalTrigger: handleData.isModalTrigger === true,
    };
  } catch (_) {
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Modal closing (handles modals that ignore Escape).
// ────────────────────────────────────────────────────────────────────────────

/**
 * Whether any recognised dialog is currently visible.
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<boolean>}
 */
async function dialogVisible(page) {
  for (const sel of DIALOG_SELECTORS) {
    try {
      const el = await page.$(sel);
      if (el) {
        const v = await el.isVisible().catch(() => false);
        if (v) return true;
      }
    } catch (_) {
      // ignore
    }
  }
  return false;
}

/**
 * Aggressively but safely close any open modal/dialog/drawer:
 *   1) Escape (via dismissOverlay).
 *   2) Click a visible close/dismiss button.
 *   3) Click a visible backdrop/overlay.
 * Close/dismiss buttons are inherently safe (they close UI, not mutate data),
 * so clicking them here is acceptable even though we never click unsafe controls
 * to OPEN state.
 *
 * @param {import('playwright').Page} page
 * @param {number} clickDelayMs
 * @returns {Promise<boolean>} true if no dialog remains visible
 */
async function closeAnyModal(page, clickDelayMs) {
  if (!(await dialogVisible(page))) return true;

  // 1) Escape + dismissOverlay best-effort.
  try {
    await dismissOverlay(page);
  } catch (_) {
    // ignore
  }
  if (!(await dialogVisible(page))) return true;

  // 2) Click visible close/dismiss buttons.
  for (const sel of CLOSE_BUTTON_SELECTORS) {
    try {
      const btn = await page.$(sel);
      if (btn) {
        const v = await btn.isVisible().catch(() => false);
        if (v) {
          await btn.click({ timeout: 3000 }).catch(() => {});
          await settle(page, clickDelayMs);
          if (!(await dialogVisible(page))) return true;
        }
      }
    } catch (_) {
      // try next
    }
  }

  // 3) Click visible backdrops / overlays.
  for (const sel of BACKDROP_SELECTORS) {
    try {
      const bd = await page.$(sel);
      if (bd) {
        const v = await bd.isVisible().catch(() => false);
        if (v) {
          await bd.click({ timeout: 3000, force: true }).catch(() => {});
          await settle(page, clickDelayMs);
          if (!(await dialogVisible(page))) return true;
        }
      }
    } catch (_) {
      // try next
    }
  }

  // 4) Final Escape attempt.
  try {
    await page.keyboard.press("Escape");
    await settle(page, clickDelayMs);
  } catch (_) {
    // ignore
  }

  return !(await dialogVisible(page));
}

/**
 * Close any open menu/dropdown by pressing Escape and clicking an empty area.
 * Best-effort; never throws.
 *
 * @param {import('playwright').Page} page
 * @param {number} clickDelayMs
 */
async function closeAnyMenu(page, clickDelayMs) {
  try {
    await page.keyboard.press("Escape");
  } catch (_) {
    // ignore
  }
  // Clicking the top-left body corner usually dismisses popovers without
  // triggering any control. force:true avoids actionability waits.
  try {
    await page.mouse.click(2, 2);
  } catch (_) {
    // ignore
  }
  await settle(page, clickDelayMs);
}

// ────────────────────────────────────────────────────────────────────────────
// Diff / result classification.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compare two state snapshots and classify the interaction outcome.
 *
 * Priority order per contract:
 *   navigation > modal_or_dialog > dropdown_or_menu > tab_change >
 *   accordion_expand > inline_state_change > no_visible_change
 *
 * @param {Object} before
 * @param {Object} after
 * @returns {("navigation"|"modal_or_dialog"|"dropdown_or_menu"|"tab_change"|"accordion_expand"|"inline_state_change"|"no_visible_change")}
 */
function classifyOutcome(before, after) {
  if (before.url !== after.url) return "navigation";

  if (after.dialogVisible && !before.dialogVisible) return "modal_or_dialog";

  if (
    (after.menuVisible && !before.menuVisible) ||
    after.expandedCount > before.expandedCount
  ) {
    // Could be a menu/popover or an accordion; disambiguate below.
    if (after.menuVisible && !before.menuVisible) return "dropdown_or_menu";
  }

  if (after.tabSignature !== before.tabSignature) return "tab_change";

  if (after.accordionOpen > before.accordionOpen) return "accordion_expand";

  // aria-expanded toggled but no menu/accordion captured -> still a menu-ish toggle.
  if (after.expandedCount !== before.expandedCount) return "dropdown_or_menu";

  if (after.domLength !== before.domLength) return "inline_state_change";

  return "no_visible_change";
}

// ────────────────────────────────────────────────────────────────────────────
// Main export.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Explore safe interactions on the current page.
 *
 * @param {import('playwright').Page} page
 * @param {Object} ctx
 * @param {Object} ctx.record               partial PageRecord (for context/slug)
 * @param {Object} ctx.role                 resolved role object
 * @param {string} ctx.baseUrl
 * @param {Object} ctx.config               global config (maxSafeClicksPerPage, clickDelayMs…)
 * @param {Object} ctx.logger               createLogger(...) instance
 * @param {Function} ctx.takeScreenshot     async (nameNoExt,{fullPage}) -> relativePath
 * @param {Object} ctx.normalize            { normalizeRoute }
 * @returns {Promise<{interactions:Array,modals:Array,safeSkipped:Array,unsafeSkipped:Array,failed:Array}>}
 */
async function exploreInteractions(page, ctx) {
  const c = ctx || {};
  const config = c.config || {};
  const logger = c.logger || makeNoopLogger();
  const takeScreenshot = c.takeScreenshot;
  const normalizeRoute =
    (c.normalize && c.normalize.normalizeRoute) || ((u) => u);

  const clickDelayMs =
    typeof config.clickDelayMs === "number" ? config.clickDelayMs : 0;
  const cap =
    typeof config.maxSafeClicksPerPage === "number" &&
    config.maxSafeClicksPerPage >= 0
      ? config.maxSafeClicksPerPage
      : 20;

  const result = {
    interactions: [],
    modals: [],
    safeSkipped: [],
    unsafeSkipped: [],
    failed: [],
  };

  if (cap === 0) {
    return result;
  }

  // Slug prefix for screenshot names.
  const slug =
    (c.record && c.record.slug) ||
    (c.record && c.record.normalizedRoute) ||
    "page";

  // Collect the candidate plan ONCE; we re-query the live locator each loop.
  let candidates = [];
  try {
    candidates = await collectCandidates(page, cap);
  } catch (err) {
    logger.warn &&
      logger.warn("Failed to collect interaction candidates", err.message);
    candidates = [];
  }

  logger.step &&
    logger.step(
      "Exploring " + candidates.length + " safe candidate trigger(s)"
    );

  let screenshotCounter = 0;

  for (let i = 0; i < candidates.length; i += 1) {
    const plan = candidates[i];

    // Re-query a FRESH locator from the original selector + index each loop to
    // avoid stale element handles after prior DOM mutations.
    let el = null;
    let descriptor = null;
    try {
      const locator = page.locator(plan.selector);
      const liveCount = await locator.count().catch(() => 0);
      if (plan.nth >= liveCount) {
        // The element no longer exists at that index (DOM shifted) — skip.
        result.safeSkipped.push({
          text: plan.text,
          reason: "Trigger no longer present after prior interactions",
        });
        continue;
      }
      el = locator.nth(plan.nth);
      descriptor = await describeElement(el);
    } catch (err) {
      result.failed.push({
        text: plan.text,
        error: "Re-query failed: " + (err && err.message ? err.message : err),
      });
      continue;
    }

    if (!descriptor || !descriptor.visible) {
      result.safeSkipped.push({
        text: plan.text,
        reason: "Trigger not visible/enabled at interaction time",
      });
      continue;
    }

    // 1) Classify safety. NEVER click unsafe controls.
    let classification = classifyAction({
      text: descriptor.text,
      ariaLabel: descriptor.ariaLabel,
      title: descriptor.title,
      role: descriptor.role,
      tagName: descriptor.tagName,
      type: descriptor.type,
      href: descriptor.href,
      insideForm: descriptor.insideForm,
      formMethod: descriptor.formMethod,
    });

    // Modal-open allowance: a data-*-toggle="modal" trigger only opens a
    // client-side dialog — no navigation, no submit, no data mutation — so it is
    // safe to OPEN even when labelled "Add"/"Edit"/"Delete". We capture the
    // dialog (read-only) and close it WITHOUT ever clicking inside it. We still
    // refuse if the trigger is a logout control or its href targets a mutating
    // URL (in case the element is dual-purpose).
    if (descriptor.isModalTrigger === true && !classification.safe) {
      const stillUnsafe =
        classification.category === "logout" ||
        (descriptor.href && isUnsafeUrl(descriptor.href));
      if (!stillUnsafe) {
        classification = {
          safe: true,
          reason: "Modal-open trigger — opens a dialog (read-only capture, never submitted)",
          category: "modal_open",
        };
      }
    }

    if (!classification.safe) {
      result.unsafeSkipped.push({
        text: descriptor.text || plan.text,
        reason: classification.reason,
        category: classification.category,
      });
      continue;
    }

    // 2) Snapshot before, settle, then click within a bounded timeout.
    let before;
    try {
      before = await captureState(page);
    } catch (_) {
      before = { url: page.url() };
    }
    const beforeUrl = before.url || page.url();

    await settle(page, clickDelayMs);

    let clickError = null;
    try {
      // Scroll into view best-effort, then click bounded.
      await el.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {});
      await el.click({ timeout: DEFAULT_CLICK_TIMEOUT });
    } catch (err) {
      clickError = err;
    }

    if (clickError) {
      result.failed.push({
        text: descriptor.text || plan.text,
        error:
          clickError && clickError.message
            ? clickError.message
            : String(clickError),
      });
      // Best-effort restore before moving on.
      await safeRestore(page, clickDelayMs);
      result.interactions.push({
        index: i,
        type: "failed",
        triggerText: descriptor.text || plan.text,
        triggerSelectorHint: plan.selectorHint,
        beforeUrl: beforeUrl,
        afterUrl: page.url(),
        screenshot: "",
        notes:
          "Click raised an error: " +
          (clickError && clickError.message
            ? clickError.message
            : String(clickError)),
      });
      continue;
    }

    // Let the UI react.
    await settle(page, clickDelayMs);
    try {
      await waitForSpinnersGone(page, 4000);
    } catch (_) {
      // ignore
    }

    // 3) Snapshot after and classify outcome.
    let after;
    try {
      after = await captureState(page);
    } catch (_) {
      after = { url: page.url() };
    }

    const outcome = classifyOutcome(before, after);
    let screenshotRel = "";
    let notes = "";
    let afterUrl = after.url || page.url();

    try {
      if (outcome === "navigation") {
        // Record the navigation, screenshot, then go back to restore.
        screenshotRel = await snap(
          takeScreenshot,
          screenshotName(slug, ++screenshotCounter),
          true
        );
        const normBefore = safeNormalize(normalizeRoute, beforeUrl);
        const normAfter = safeNormalize(normalizeRoute, afterUrl);
        notes =
          "Navigated to " +
          normAfter +
          (normAfter !== afterUrl ? " (" + afterUrl + ")" : "");

        // Restore: go back to the original page.
        await restoreFromNavigation(page, beforeUrl, normBefore, normalizeRoute);
      } else if (outcome === "modal_or_dialog") {
        const details = await captureModalDetails(page);
        screenshotRel = await snap(
          takeScreenshot,
          screenshotName(slug, ++screenshotCounter),
          false
        );
        const modal = {
          title: (details && details.title) || "",
          triggerText: descriptor.text || plan.text,
          buttons: (details && details.buttons) || [],
          fields: (details && details.fields) || [],
          text: (details && details.text) || "",
          screenshot: screenshotRel,
        };
        result.modals.push(modal);
        notes =
          "Opened modal/dialog" +
          (modal.title ? ': "' + modal.title + '"' : "");
        // Close the modal (Escape -> dismissOverlay -> close button -> backdrop).
        const closed = await closeAnyModal(page, clickDelayMs);
        if (!closed) {
          notes += " (warning: modal may still be open)";
        }
      } else if (outcome === "dropdown_or_menu") {
        screenshotRel = await snap(
          takeScreenshot,
          screenshotName(slug, ++screenshotCounter),
          false
        );
        notes = "Opened a dropdown / menu / popover";
        await closeAnyMenu(page, clickDelayMs);
      } else if (outcome === "tab_change") {
        screenshotRel = await snap(
          takeScreenshot,
          screenshotName(slug, ++screenshotCounter),
          false
        );
        notes = "Switched tab / revealed a different tab panel";
      } else if (outcome === "accordion_expand") {
        screenshotRel = await snap(
          takeScreenshot,
          screenshotName(slug, ++screenshotCounter),
          false
        );
        notes = "Expanded an accordion / collapsible region";
      } else if (outcome === "inline_state_change") {
        screenshotRel = await snap(
          takeScreenshot,
          screenshotName(slug, ++screenshotCounter),
          false
        );
        notes = "Inline DOM state change (no nav/modal/menu/tab detected)";
      } else {
        // no_visible_change — no screenshot to avoid noise.
        notes = "No visible change detected after click";
      }
    } catch (err) {
      // An error during outcome handling must not stop the loop.
      result.failed.push({
        text: descriptor.text || plan.text,
        error:
          "Outcome handling failed: " +
          (err && err.message ? err.message : String(err)),
      });
      notes =
        "Outcome handling error: " +
        (err && err.message ? err.message : String(err));
    }

    // 4) Record the performed interaction.
    result.interactions.push({
      index: i,
      type: outcome,
      triggerText: descriptor.text || plan.text,
      triggerSelectorHint: plan.selectorHint,
      beforeUrl: beforeUrl,
      afterUrl: afterUrl,
      screenshot: screenshotRel,
      notes: notes,
    });

    // ALWAYS restore between clicks: close stray menus/modals, scroll to top.
    await safeRestore(page, clickDelayMs);
  }

  logger.success &&
    logger.success(
      "Interaction exploration complete: " +
        result.interactions.length +
        " performed, " +
        result.modals.length +
        " modal(s), " +
        result.unsafeSkipped.length +
        " unsafe skipped, " +
        result.failed.length +
        " failed"
    );

  return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Internal helpers.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a deterministic, filesystem-friendly screenshot name (no extension).
 * @param {string} slug
 * @param {number} n
 * @returns {string}
 */
function screenshotName(slug, n) {
  const padded = String(n).padStart(3, "0");
  return slug + "-interaction-" + padded;
}

/**
 * Take a screenshot via the caller-supplied takeScreenshot, swallowing errors
 * (a failed screenshot must never abort the interaction loop).
 *
 * @param {Function} takeScreenshot
 * @param {string} nameNoExt
 * @param {boolean} fullPage
 * @returns {Promise<string>} relative path or "" on failure
 */
async function snap(takeScreenshot, nameNoExt, fullPage) {
  if (typeof takeScreenshot !== "function") return "";
  try {
    const rel = await takeScreenshot(nameNoExt, { fullPage: Boolean(fullPage) });
    return rel || "";
  } catch (_) {
    return "";
  }
}

/**
 * Restore page state after a navigation by going back to the original page and
 * waiting for content. If goBack does not land on the expected route, navigate
 * directly as a fallback.
 *
 * @param {import('playwright').Page} page
 * @param {string} beforeUrl
 * @param {string} normBefore normalized original route
 * @param {Function} normalizeRoute
 */
async function restoreFromNavigation(page, beforeUrl, normBefore, normalizeRoute) {
  try {
    await page.goBack({ waitUntil: "domcontentloaded", timeout: 20000 });
  } catch (_) {
    // goBack may fail if there is no history entry — fall through to direct nav.
  }

  await waitForContent(page);
  await waitForSpinnersGone(page, 6000);

  // Verify we are back on the original route; if not, navigate directly.
  let nowNorm = "";
  try {
    nowNorm = safeNormalize(normalizeRoute, page.url());
  } catch (_) {
    nowNorm = "";
  }

  if (normBefore && nowNorm && nowNorm !== normBefore) {
    try {
      await page.goto(beforeUrl, {
        waitUntil: "domcontentloaded",
        timeout: 25000,
      });
      await waitForContent(page);
      await waitForSpinnersGone(page, 6000);
    } catch (_) {
      // best-effort — leave the page wherever it is; caller can recover.
    }
  }
}

/**
 * Best-effort full restore between interactions: close stray modals & menus,
 * scroll to top, settle. Never throws.
 *
 * @param {import('playwright').Page} page
 * @param {number} clickDelayMs
 */
async function safeRestore(page, clickDelayMs) {
  try {
    await closeAnyModal(page, clickDelayMs);
  } catch (_) {
    // ignore
  }
  try {
    await closeAnyMenu(page, clickDelayMs);
  } catch (_) {
    // ignore
  }
  try {
    await scrollToTop(page);
  } catch (_) {
    // ignore
  }
  await settle(page, clickDelayMs);
}

/**
 * Safely normalize a route, falling back to the raw URL on error.
 * @param {Function} normalizeRoute
 * @param {string} url
 * @returns {string}
 */
function safeNormalize(normalizeRoute, url) {
  try {
    const n = normalizeRoute(url);
    return n || url || "";
  } catch (_) {
    return url || "";
  }
}

/**
 * A minimal no-op logger used if the caller does not provide one. Each method is
 * a safe no-op so optional chaining in the main body still works.
 * @returns {Object}
 */
function makeNoopLogger() {
  const noop = function () {};
  return {
    info: noop,
    success: noop,
    warn: noop,
    error: noop,
    debug: noop,
    step: noop,
  };
}

module.exports = {
  exploreInteractions,
};

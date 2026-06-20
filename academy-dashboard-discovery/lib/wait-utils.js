"use strict";

/**
 * wait-utils.js
 *
 * Best-effort Playwright wait helpers used by the crawler.
 * All functions catch timeouts internally and never throw on timeout,
 * EXCEPT gotoCalm which rethrows genuine navigation errors so callers
 * can record failed_with_error.
 */

// ─── Selectors ────────────────────────────────────────────────────────────────

const MAIN_CONTENT_SELECTORS = [
  "main",
  "[role=main]",
  "#app",
  "#root",
  ".content",
  ".main-content",
  ".page-content",
];

const SPINNER_SELECTORS = [
  "[class*=spinner]",
  "[class*=loading]",
  "[class*=loader]",
  "[class*=skeleton]",
  "[aria-busy=true]",
  ".spinner",
  ".loading",
];

const DIALOG_SELECTORS = [
  "[role=dialog]",
  "[aria-modal=true]",
  ".modal",
  ".drawer",
  ".offcanvas",
  "[class*=modal]",
];

const BACKDROP_SELECTORS = [
  "[class*=backdrop]",
  "[class*=overlay]",
];

const CLOSE_BUTTON_SELECTORS = [
  "[aria-label*=close i]",
  "[aria-label*=dismiss i]",
  "[class*=close]",
  "[class*=dismiss]",
  "button[data-dismiss]",
  "button[data-bs-dismiss]",
];

// ─── settle ───────────────────────────────────────────────────────────────────

/**
 * Waits a fixed number of milliseconds. If ms <= 0 or the page throws, it is
 * silently ignored.
 *
 * @param {import('playwright').Page} page
 * @param {number} ms
 */
async function settle(page, ms) {
  if (!ms || ms <= 0) return;
  try {
    await page.waitForTimeout(ms);
  } catch (_) {
    // best-effort
  }
}

// ─── waitForContent ───────────────────────────────────────────────────────────

/**
 * Waits for the page body to be visible and then for the first recognised
 * main-content selector to become visible. Falls back to body.
 *
 * @param {import('playwright').Page} page
 */
async function waitForContent(page) {
  // Wait for body first
  try {
    await page.waitForSelector("body", { state: "visible", timeout: 10000 });
  } catch (_) {
    // best-effort
  }

  // Try each main-content selector in order
  for (const sel of MAIN_CONTENT_SELECTORS) {
    try {
      const found = await page.$(sel);
      if (found) {
        await page.waitForSelector(sel, { state: "visible", timeout: 6000 });
        return;
      }
    } catch (_) {
      // try next
    }
  }

  // Fallback: just wait for body to be visible (already done above)
}

// ─── waitForSpinnersGone ──────────────────────────────────────────────────────

/**
 * Best-effort wait until common loading indicators are hidden or detached.
 *
 * @param {import('playwright').Page} page
 * @param {number} [timeout=8000]
 */
async function waitForSpinnersGone(page, timeout = 8000) {
  const combined = SPINNER_SELECTORS.join(",");
  try {
    // Wait until ALL matching spinners are either hidden or gone
    await page.waitForFunction(
      (sel) => {
        const els = Array.from(document.querySelectorAll(sel));
        return els.every((el) => {
          const style = window.getComputedStyle(el);
          return (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.opacity === "0" ||
            !document.body.contains(el)
          );
        });
      },
      combined,
      { timeout }
    );
  } catch (_) {
    // Timed out or no spinners found — both are acceptable
  }
}

// ─── slowScrollToBottom ───────────────────────────────────────────────────────

/**
 * Incrementally scrolls to the bottom of the page to trigger lazy-loaded
 * content, then scrolls back to top when done.
 *
 * @param {import('playwright').Page} page
 * @param {{ step?: number, delay?: number }} [opts]
 */
async function slowScrollToBottom(page, opts) {
  const step = (opts && opts.step) || 500;
  const delay = (opts && opts.delay) || 250;

  try {
    await page.evaluate(
      async ({ step, delay }) => {
        await new Promise((resolve) => {
          let currentY = 0;
          const maxY =
            document.documentElement.scrollHeight - window.innerHeight;

          const tick = () => {
            if (currentY >= maxY) {
              resolve();
              return;
            }
            currentY = Math.min(currentY + step, maxY);
            window.scrollTo({ top: currentY, behavior: "instant" });
            setTimeout(tick, delay);
          };

          if (maxY <= 0) {
            resolve();
          } else {
            tick();
          }
        });
      },
      { step, delay }
    );
  } catch (_) {
    // best-effort
  }
}

// ─── scrollToTop ─────────────────────────────────────────────────────────────

/**
 * Scrolls the page back to the top.
 *
 * @param {import('playwright').Page} page
 */
async function scrollToTop(page) {
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {
    // best-effort
  }
}

// ─── dismissOverlay ───────────────────────────────────────────────────────────

/**
 * Attempts to close a visible modal / dialog / drawer by:
 *   1. Pressing Escape.
 *   2. Clicking a visible close/dismiss button inside the dialog.
 *   3. Clicking a visible backdrop/overlay element.
 *
 * Returns true if a dialog that was open is no longer visible afterwards.
 * Never throws.
 *
 * @param {import('playwright').Page} page
 * @returns {Promise<boolean>}
 */
async function dismissOverlay(page) {
  /**
   * Check if any recognised dialog is currently visible.
   * @returns {Promise<boolean>}
   */
  async function isDialogVisible() {
    try {
      for (const sel of DIALOG_SELECTORS) {
        const el = await page.$(sel);
        if (el) {
          const visible = await el.isVisible().catch(() => false);
          if (visible) return true;
        }
      }
    } catch (_) {
      // ignore
    }
    return false;
  }

  const wasOpen = await isDialogVisible();
  if (!wasOpen) return false;

  // 1. Try Escape
  try {
    await page.keyboard.press("Escape");
    await settle(page, 400);
    if (!(await isDialogVisible())) return true;
  } catch (_) {
    // continue
  }

  // 2. Try close/dismiss buttons inside a dialog
  for (const closeSel of CLOSE_BUTTON_SELECTORS) {
    try {
      const btn = await page.$(closeSel);
      if (btn) {
        const visible = await btn.isVisible().catch(() => false);
        if (visible) {
          await btn.click({ timeout: 3000 });
          await settle(page, 400);
          if (!(await isDialogVisible())) return true;
        }
      }
    } catch (_) {
      // try next
    }
  }

  // 3. Try clicking backdrops / overlays
  for (const bdSel of BACKDROP_SELECTORS) {
    try {
      const bd = await page.$(bdSel);
      if (bd) {
        const visible = await bd.isVisible().catch(() => false);
        if (visible) {
          await bd.click({ timeout: 3000, force: true });
          await settle(page, 400);
          if (!(await isDialogVisible())) return true;
        }
      }
    } catch (_) {
      // try next
    }
  }

  // Return whether the dialog is now gone (even if we are not sure we caused it)
  return !(await isDialogVisible());
}

// ─── gotoCalm ─────────────────────────────────────────────────────────────────

/**
 * Navigates to a URL and waits for the page to settle.
 *
 * - Uses waitUntil:"domcontentloaded" for speed.
 * - Follows up with waitForContent, waitForSpinnersGone, and settle.
 * - Rethrows genuine navigation errors (network errors, non-recoverable failures)
 *   so that the crawler can record failed_with_error. Timeout-only errors from
 *   the post-navigation waits are swallowed.
 *
 * @param {import('playwright').Page} page
 * @param {string} url
 * @param {{ timeout?: number, pageDelayMs?: number }} [opts]
 * @returns {Promise<import('playwright').Response|null>}
 */
async function gotoCalm(page, url, opts) {
  const timeout = (opts && opts.timeout) || 45000;
  const pageDelayMs = (opts && opts.pageDelayMs) || 0;

  // This is the genuine navigation call — errors here are rethrown.
  let response = null;
  try {
    response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout,
    });
  } catch (navErr) {
    // Rethrow so the crawler can log failed_with_error
    throw navErr;
  }

  // Post-navigation best-effort waits (never throw)
  await waitForContent(page);
  await waitForSpinnersGone(page);
  await settle(page, pageDelayMs);

  return response;
}

// ─── Exports ──────────────────────────────────────────────────────────────────

module.exports = {
  gotoCalm,
  waitForContent,
  waitForSpinnersGone,
  slowScrollToBottom,
  scrollToTop,
  settle,
  dismissOverlay,
};

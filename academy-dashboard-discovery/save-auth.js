"use strict";

/**
 * save-auth.js
 *
 * Usage: node save-auth.js <role>
 *
 * Launches a headed Chromium browser, navigates to the role's login page,
 * attempts credential autofill when credentials are available, then waits
 * for the operator to confirm a successful manual login before persisting
 * the Playwright storage state to disk.
 *
 * SECURITY CONTRACT:
 *   - Credentials are read ONLY from .env.crawler via lib/config.
 *   - Passwords are NEVER printed, logged, or written to any output.
 *   - redact() is applied defensively before logging any user-supplied value.
 */

const path     = require("path");
const readline = require("readline");

// ---------------------------------------------------------------------------
// Bootstrap: load env first so config picks up the right values.
// ---------------------------------------------------------------------------
const { loadEnv, getRole } = require("./lib/config");
loadEnv();

const { createLogger, redact } = require("./lib/logger");

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const LOG_SCOPE = "save-auth";

// Selectors tried in order for the username field.
const USERNAME_SELECTORS = [
  'input[type="email"]',
  'input[name*="user" i]',
  'input[name*="email" i]',
  'input[id*="user" i]',
  "#username",
  "#email",
  'input[name="login"]',
];

// Password field selector.
const PASSWORD_SELECTOR = 'input[type="password"]';

// Submit control selectors tried in order.
const SUBMIT_SELECTORS = [
  'button[type="submit"]',
  'input[type="submit"]',
  "button:has-text('Login')",
  "button:has-text('Log in')",
  "button:has-text('Sign in')",
  "button:has-text('تسجيل الدخول')",
  "button:has-text('دخول')",
];

// How long to wait for the submit navigation (ms).
const SUBMIT_NAV_TIMEOUT_MS = 15_000;

// How long to wait between individual page operations (ms).
const SETTLE_MS = 1_500;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Prompts the operator for input via readline and resolves when they press
 * Enter. The returned string is the trimmed line (usually empty — we only
 * care that they hit Enter).
 *
 * @param {string} prompt
 * @returns {Promise<string>}
 */
function waitForEnter(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input:  process.stdin,
      output: process.stdout,
    });
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Returns the first matching Playwright Locator that is actually present in
 * the DOM (attached), or null if none of the selectors match.
 *
 * @param {import('playwright').Page} page
 * @param {string[]} selectors
 * @returns {Promise<import('playwright').Locator|null>}
 */
async function findFirst(page, selectors) {
  for (const sel of selectors) {
    try {
      const loc   = page.locator(sel).first();
      const count = await loc.count();
      if (count > 0) return loc;
    } catch (_) {
      // selector syntax not supported / no match — try next
    }
  }
  return null;
}

/**
 * Best-effort fill of a single Locator.  Never throws; logs warnings instead.
 *
 * @param {import('playwright').Page}    page
 * @param {import('playwright').Locator} loc
 * @param {string}                       value
 * @param {object}                       logger
 */
async function safeFill(page, loc, value, logger) {
  try {
    await loc.scrollIntoViewIfNeeded({ timeout: 3_000 });
    await loc.click({ timeout: 3_000 });
    await loc.fill(value, { timeout: 5_000 });
  } catch (err) {
    logger.warn("Could not fill field — continuing.", err.message);
  }
}

/**
 * Attempts to detect whether the current page is still the login page by
 * examining the URL and checking for a visible password field.
 *
 * @param {import('playwright').Page} page
 * @param {string}                    loginUrl
 * @returns {Promise<boolean>}
 */
async function isStillOnLoginPage(page, loginUrl) {
  const currentUrl = page.url();

  // URL contains "/login" (case-insensitive).
  if (/\/login/i.test(currentUrl)) return true;

  // URL is identical to (or a variant of) the login URL.
  try {
    const current = new URL(currentUrl);
    const login   = new URL(loginUrl);
    if (
      current.hostname === login.hostname &&
      current.pathname === login.pathname
    ) {
      return true;
    }
  } catch (_) {
    // Malformed URL — fall through to DOM check.
  }

  // A password field is still visible in the DOM.
  try {
    const pwdLoc   = page.locator(PASSWORD_SELECTOR).first();
    const pwdCount = await pwdLoc.count();
    if (pwdCount > 0) {
      const visible = await pwdLoc.isVisible({ timeout: 2_000 });
      if (visible) return true;
    }
  } catch (_) {
    // Best-effort — ignore.
  }

  return false;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const logger = createLogger(LOG_SCOPE);

  // ── 1. Resolve the requested role ───────────────────────────────────────
  const roleKey = process.argv[2];

  if (!roleKey) {
    logger.error(
      "No role argument supplied.\n" +
      "  Usage: node save-auth.js <role>\n" +
      "  Available roles: admin | teacher | family"
    );
    process.exit(1);
  }

  let role;
  try {
    role = getRole(roleKey);
  } catch (err) {
    logger.error(`Unknown role "${redact(roleKey)}": ${err.message}`);
    process.exit(1);
  }

  logger.step(`Saving authentication state for role: ${role.label} (${role.key})`);
  logger.info(`Login URL : ${role.loginUrl}`);
  logger.info(`Auth file : ${role.authStateFile}`);

  // ── 2. Launch headed Chromium ────────────────────────────────────────────
  let browser;
  let context;

  const { chromium } = require("playwright");

  try {
    browser = await chromium.launch({
      headless: false,           // ALWAYS headed — operator must be able to see / interact
      slowMo:   0,
      args: [
        "--no-sandbox",
        "--disable-blink-features=AutomationControlled",
      ],
    });
  } catch (err) {
    logger.error("Failed to launch Chromium.", err);
    process.exit(1);
  }

  try {
    context = await browser.newContext({
      viewport:          { width: 1440, height: 900 },
      locale:            "ar-EG",
      timezoneId:        "Africa/Cairo",
      ignoreHTTPSErrors: true,
    });

    const page = await context.newPage();

    // ── 3. Navigate to the login page ─────────────────────────────────────
    logger.info(`Navigating to login page: ${role.loginUrl}`);
    try {
      await page.goto(role.loginUrl, {
        waitUntil: "domcontentloaded",
        timeout:   30_000,
      });
    } catch (err) {
      logger.error("Navigation to login page failed.", err);
      await browser.close();
      process.exit(1);
    }

    // Brief settle so the page fully renders before we probe for fields.
    await page.waitForTimeout(SETTLE_MS);

    // ── 4. Attempt credential autofill ────────────────────────────────────
    const usernameLoc = await findFirst(page, USERNAME_SELECTORS);
    const passwordLoc = await findFirst(page, [PASSWORD_SELECTOR]);

    if (usernameLoc && passwordLoc && role.hasCredentials) {
      logger.info(
        `Autofill: found username and password fields. ` +
        `Filling credentials for ${redact(role.username)} (password redacted).`
      );

      await safeFill(page, usernameLoc, role.username, logger);
      await safeFill(page, passwordLoc, role.password, logger);

      // Attempt to click submit and wait for navigation.
      const submitLoc = await findFirst(page, SUBMIT_SELECTORS);
      if (submitLoc) {
        logger.info("Submitting login form…");
        try {
          await Promise.all([
            page.waitForNavigation({
              waitUntil: "domcontentloaded",
              timeout:   SUBMIT_NAV_TIMEOUT_MS,
            }),
            submitLoc.click({ timeout: 5_000 }),
          ]);
          logger.info("Navigation after submit detected.");
        } catch (err) {
          // Navigation may time out on SPAs that do client-side routing —
          // not fatal; the operator can complete the login manually.
          logger.warn(
            "Auto-submit did not trigger a detectable navigation " +
            "(this is normal on some SPAs). " +
            "Please complete the login manually in the browser window.",
            err.message
          );
        }
      } else {
        logger.warn(
          "Could not locate a submit button. " +
          "Please submit the login form manually in the browser window."
        );
      }

      await page.waitForTimeout(SETTLE_MS);
    } else {
      // Explain why autofill was skipped so the operator knows what to do.
      if (!usernameLoc || !passwordLoc) {
        logger.warn(
          "Could not locate username or password input fields on the login page. " +
          "The page may use a non-standard login form or load fields dynamically."
        );
      } else {
        // Fields found but credentials not configured.
        logger.warn(
          `No credentials found in the environment for role "${role.key}". ` +
          `Expected env vars: ${role.usernameEnv} and ${role.passwordEnv}. ` +
          "Please log in manually in the browser window."
        );
      }

      logger.info(
        "\n" +
        "══════════════════════════════════════════════════════════════════\n" +
        "  MANUAL LOGIN REQUIRED\n" +
        "  ─────────────────────────────────────────────────────────────\n" +
        `  1. Look at the Chromium browser window that just opened.\n` +
        `  2. Log in as: ${role.label} (${role.key})\n` +
        `     Login URL : ${role.loginUrl}\n` +
        (role.usernameEnv
          ? `     Username env : ${role.usernameEnv}\n`
          : "") +
        "  3. Once you are fully logged in (dashboard visible), come back\n" +
        "     here and press ENTER.\n" +
        "══════════════════════════════════════════════════════════════════"
      );
    }

    // ── 5. Operator confirmation prompt ───────────────────────────────────
    await waitForEnter(
      "\n>>> Log in in the browser, then press ENTER here to save the session... "
    );

    // ── 6. Validate — ensure we are NOT still on the login page ──────────
    logger.info("Validating session…");
    await page.waitForTimeout(SETTLE_MS);

    const stillOnLogin = await isStillOnLoginPage(page, role.loginUrl);

    if (stillOnLogin) {
      logger.error(
        "Still on the login page — session NOT saved.\n" +
        "  Please complete the login successfully before pressing ENTER.\n" +
        `  Current URL : ${page.url()}`
      );
      await browser.close();
      process.exit(1);
    }

    logger.info(`Session validated. Current URL: ${page.url()}`);

    // ── 7. Persist storage state ───────────────────────────────────────────
    try {
      await context.storageState({ path: role.authStateFile });
      logger.success(
        `Authentication state saved successfully.\n` +
        `  File : ${role.authStateFile}`
      );
    } catch (err) {
      logger.error("Failed to write authentication state file.", err);
      await browser.close();
      process.exit(1);
    }

    // ── 8. Clean shutdown ─────────────────────────────────────────────────
    await browser.close();
    logger.success(
      `Done. You can now run the crawler for role "${role.key}":\n` +
      `  node crawl-role.js ${role.key}`
    );
    process.exit(0);

  } catch (err) {
    logger.error("Unexpected error during save-auth.", err);
    try {
      if (browser) await browser.close();
    } catch (_) {
      // Ignore close errors on the way out.
    }
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
if (require.main === module) {
  main();
}

module.exports = { main };

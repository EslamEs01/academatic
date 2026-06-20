#!/usr/bin/env node
"use strict";

/**
 * crawl-role.js
 *
 * THE ORCHESTRATOR for the Academy Dashboard Discovery Crawler.
 *
 *   node crawl-role.js <role>
 *
 * Read-only, breadth-first discovery of a single authenticated role's dashboard:
 *   - Loads a previously-saved Playwright storage state (save-auth.js).
 *   - BFS over same-origin internal routes seeded from role.startUrls.
 *   - Per page: settle, extract static DOM data + design tokens, classify modules,
 *     full-page screenshot, raw HTML + visible text dump, and SAFE interaction
 *     exploration (dropdowns, tabs, accordions, modals — never mutating controls).
 *   - Captures network endpoint METADATA only (never response bodies).
 *   - Phase 2: writes sanitized, offline-safe HTML snapshots that cross-link to
 *     other captured pages.
 *   - Writes per-page records (.json + .md), a role map, and an endpoints file.
 *   - Prints a human summary INCLUDING what it could not reach and why.
 *
 * HARD RULES honoured here:
 *   - CommonJS only. No ESM.
 *   - Never mutate the target site. Never click unsafe controls. Never log secrets.
 *   - Resilient: one failing page never kills the run; the browser always closes.
 *
 * Allowed deps: playwright. Everything else is Node builtins + project lib/.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { chromium } = require("playwright");

const config = require("./lib/config");
const { createLogger } = require("./lib/logger");
const fsUtils = require("./lib/fs-utils");
const urlUtils = require("./lib/url-utils");
const waitUtils = require("./lib/wait-utils");
const safety = require("./lib/safety");
const { classifyModules } = require("./lib/page-classifier");
const { extractStaticData } = require("./lib/dom-extractor");
const { extractDesignTokens } = require("./lib/token-extractor");
const { exploreInteractions } = require("./lib/interaction-explorer");
const { sanitizeHtml } = require("./lib/html-sanitizer");
const { writePageRecord, writeRoleMap } = require("./lib/report-writer");

const {
  resolveUrl,
  normalizeRoute,
  routeToSlug,
  classifyUrlTarget,
  isLocaleSwitchUrl,
  isAuthPage,
} = urlUtils;

const {
  gotoCalm,
  waitForContent,
  waitForSpinnersGone,
  slowScrollToBottom,
  scrollToTop,
  settle,
} = waitUtils;

const logger = createLogger("crawl-role");

// ---------------------------------------------------------------------------
// Discovery end-states (every discovered URL resolves to exactly one).
// ---------------------------------------------------------------------------
const END_STATES = {
  VISITED: "visited",
  SKIPPED_SAFE: "skipped_safe_reason",
  SKIPPED_UNSAFE: "skipped_unsafe_reason",
  FAILED: "failed_with_error",
  DUPLICATE: "duplicate_of_normalized_route",
  LOGIN_REDIRECT: "login_redirect",
  EXTERNAL: "external_url",
  UNSUPPORTED_FILE: "unsupported_file",
};

// Max consecutive login redirects before we abort and ask for re-auth.
const MAX_CONSECUTIVE_LOGIN_REDIRECTS = 3;

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

/**
 * Parse the role key from argv. Accepts `node crawl-role.js admin` and
 * `node crawl-role.js --role=admin` for convenience.
 * @returns {string|null}
 */
function parseRoleKey() {
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg.startsWith("--role=")) {
      return arg.slice("--role=".length).trim();
    }
  }
  const positional = args.find((a) => !a.startsWith("-"));
  return positional ? positional.trim() : null;
}

// ---------------------------------------------------------------------------
// Network capture (metadata only — NEVER bodies)
// ---------------------------------------------------------------------------

/**
 * Wire up network capture on a Playwright context/page. Records UNIQUE
 * {method,url,resourceType,status} descriptors for SAME-ORIGIN requests only.
 *
 * We listen on page.on("response") (gives status) and supplement with
 * context.on("requestfinished") so requests without a captured response are
 * still recorded (status defaults to null).
 *
 * @param {import('playwright').BrowserContext} context
 * @param {string} baseUrl
 * @param {Map<string,object>} endpointMap  url-key -> endpoint descriptor
 */
function attachNetworkCapture(context, baseUrl, endpointMap) {
  const sameOrigin = (url) => {
    try {
      return urlUtils.isSameOrigin(url, baseUrl);
    } catch (_) {
      return false;
    }
  };

  const record = (method, url, resourceType, status) => {
    if (typeof url !== "string" || url === "") return;
    if (!sameOrigin(url)) return;
    // Strip volatile params so the same logical endpoint dedupes cleanly.
    let cleanUrl = url;
    try {
      cleanUrl = urlUtils.stripVolatileParams(url);
    } catch (_) {
      cleanUrl = url;
    }
    const key = `${method || "GET"} ${cleanUrl}`;
    const existing = endpointMap.get(key);
    if (existing) {
      // Upgrade a previously-unknown status if we now have one.
      if (existing.status == null && status != null) existing.status = status;
      return;
    }
    endpointMap.set(key, {
      method: method || "GET",
      url: cleanUrl,
      resourceType: resourceType || "other",
      status: status != null ? status : null,
    });
  };

  context.on("requestfinished", (request) => {
    try {
      record(request.method(), request.url(), request.resourceType(), null);
    } catch (_) {
      // best-effort; never let instrumentation crash the crawl
    }
  });

  context.on("response", (response) => {
    try {
      const request = response.request();
      record(
        request.method(),
        response.url(),
        request.resourceType(),
        response.status()
      );
    } catch (_) {
      // best-effort
    }
  });
}

// ---------------------------------------------------------------------------
// Login-redirect / session-expiry detection
// ---------------------------------------------------------------------------

/**
 * Detect whether the current page landed on a login screen or shows a visible
 * password field (session expired / not authenticated).
 *
 * @param {import('playwright').Page} page
 * @param {object} cfg
 * @returns {Promise<boolean>}
 */
async function looksLikeLogin(page, cfg) {
  let currentUrl = "";
  try {
    currentUrl = page.url() || "";
  } catch (_) {
    currentUrl = "";
  }

  const lowerUrl = currentUrl.toLowerCase();
  if (lowerUrl.includes("/login") || lowerUrl.includes("/signin") || lowerUrl.includes("/sign-in")) {
    return true;
  }

  // Compare against the configured login URL path as well.
  try {
    const loginPath = new URL(cfg.loginUrl).pathname.toLowerCase();
    if (loginPath && loginPath !== "/" && lowerUrl.includes(loginPath)) {
      return true;
    }
  } catch (_) {
    // ignore malformed login URL
  }

  // A password field ALONE is not enough: in-app "change password" / profile
  // / security pages also have one. Require a login-SHAPED form: a visible
  // password field together with a visible username/email field AND the absence
  // of authenticated app chrome (sidebar / main nav / user menu).
  try {
    const pwd = await page.$('input[type="password"]');
    const pwdVisible = pwd ? await pwd.isVisible().catch(() => false) : false;
    if (pwdVisible) {
      const userField = await page.$(
        'input[type="email"], input[name*="user" i], input[name*="email" i], ' +
          'input[id*="user" i], input[id*="email" i], input[name="login"]'
      );
      const userVisible = userField ? await userField.isVisible().catch(() => false) : false;
      const appChrome = await page.$(
        'aside, nav[class*="side"], [class*="sidebar"], [class*="side-menu"], ' +
          '[class*="navbar"] [class*="user"], header [class*="profile"]'
      );
      if (userVisible && !appChrome) return true;
    }
  } catch (_) {
    // ignore
  }

  return false;
}

// ---------------------------------------------------------------------------
// Queue helpers
// ---------------------------------------------------------------------------

/**
 * Add an internal candidate URL to the BFS queue if it has not already been
 * visited, queued, or otherwise resolved. Dedupe is keyed on normalizeRoute.
 *
 * @param {object} state - crawl state bag.
 * @param {string} absUrl - absolute candidate URL.
 * @param {string} via - discovery channel (sidebar|header|footer|...).
 * @param {string} fromRoute - normalized route the link was found on.
 */
function enqueueCandidate(state, absUrl, via, fromRoute) {
  if (typeof absUrl !== "string" || absUrl === "") return;

  const target = classifyUrlTarget(absUrl, state.baseUrl);
  if (target !== "internal") {
    // Non-internal links are recorded as end-states in the route graph but are
    // never enqueued for navigation.
    recordNonInternalEndState(state, absUrl, target, via, fromRoute);
    return;
  }

  const route = normalizeRoute(absUrl);
  if (!route) return;

  // Locale/language switch URLs (e.g. /management/lang/de, ?locale=tr) are not
  // content pages: navigating them changes the session display language mid-crawl
  // and mixes locales in the capture. Record a clear safe-skip; never navigate.
  if (isLocaleSwitchUrl(absUrl)) {
    if (!state.visited.has(route) && !state.resolved.has(route)) {
      state.routeGraph[route] = {
        url: absUrl,
        title: "",
        modules: [],
        status: END_STATES.SKIPPED_SAFE,
        discoveredFrom: { route: fromRoute || null, via: via || "link" },
        discovers: [],
        reason: "Locale/language switch URL — not crawled (would change session language and mix locales)",
      };
      state.resolved.add(route);
    }
    return;
  }

  // Authentication gates (/login, /register, …) redirect to the dashboard when
  // already authenticated (duplicate content under the auth route) and a stray
  // click there could end the session. Record a safe-skip; never navigate.
  if (isAuthPage(absUrl)) {
    if (!state.visited.has(route) && !state.resolved.has(route)) {
      state.routeGraph[route] = {
        url: absUrl,
        title: "",
        modules: [],
        status: END_STATES.SKIPPED_SAFE,
        discoveredFrom: { route: fromRoute || null, via: via || "link" },
        discovers: [],
        reason: "Authentication page (login/register) — not a content page; not crawled",
      };
      state.resolved.add(route);
    }
    return;
  }

  // SAFETY: never enqueue a URL whose path/query implies a mutating/destructive
  // action (e.g. /students/5/delete, ?action=archive). Record it as a clearly
  // explained skipped_unsafe end-state instead of navigating to it.
  if (safety.isUnsafeUrl(absUrl)) {
    if (!state.visited.has(route) && !state.resolved.has(route)) {
      state.routeGraph[route] = {
        url: absUrl,
        title: "",
        modules: [],
        status: END_STATES.SKIPPED_UNSAFE,
        discoveredFrom: { route: fromRoute || null, via: via || "link" },
        discovers: [],
        reason: "URL targets a mutating/destructive action — not navigated",
      };
      state.resolved.add(route);
    }
    return;
  }

  if (state.visited.has(route)) return;
  if (state.queued.has(route)) return;
  if (state.resolved.has(route)) return;

  state.queued.add(route);
  state.queue.push({ url: absUrl, route, via, fromRoute });
}

/**
 * Record an end-state for a non-internal URL in the route graph (without
 * enqueueing it). Deduped on normalizeRoute (best-effort for non-http schemes).
 *
 * @param {object} state
 * @param {string} absUrl
 * @param {string} target - classifyUrlTarget result.
 * @param {string} via
 * @param {string} fromRoute
 */
function recordNonInternalEndState(state, absUrl, target, via, fromRoute) {
  let status = null;
  if (target === "external") status = END_STATES.EXTERNAL;
  else if (target === "unsupported_file") status = END_STATES.UNSUPPORTED_FILE;
  else return; // anchor / mailto_tel / javascript are not page targets

  const route = normalizeRoute(absUrl) || absUrl;
  if (state.routeGraph[route]) {
    // Already recorded; just note the additional discoverer edge.
    pushDiscoverEdge(state, fromRoute, route);
    return;
  }

  state.routeGraph[route] = {
    url: absUrl,
    title: "",
    modules: [],
    status,
    discoveredFrom: { route: fromRoute || null, via: via || "link" },
    discovers: [],
  };
  state.resolved.add(route);
  pushDiscoverEdge(state, fromRoute, route);
}

/**
 * Record a "discovers" edge from a parent route to a child route in the graph.
 * @param {object} state
 * @param {string} fromRoute
 * @param {string} childRoute
 */
function pushDiscoverEdge(state, fromRoute, childRoute) {
  if (!fromRoute || !childRoute) return;
  const parent = state.routeGraph[fromRoute];
  if (parent && parent.discovers.indexOf(childRoute) === -1) {
    parent.discovers.push(childRoute);
  }
}

/**
 * Derive a filesystem-safe, COLLISION-FREE slug for a route. routeToSlug strips
 * non-ASCII (so distinct Arabic ?q= values can collapse to the same base slug);
 * a per-run registry guarantees every distinct normalized route maps to a unique
 * slug by appending a short stable hash of the route on collision. The chosen
 * slug is reused for every artifact of that page (json/md/screenshot/html/text)
 * and by phase-2 sanitization, so files never overwrite each other.
 *
 * @param {object} state
 * @param {string} route - normalized route (dedupe key).
 * @param {string} url - absolute URL of the page.
 * @returns {string} unique slug.
 */
/**
 * Remove the regenerated content of a role's output directory so a fresh crawl
 * never inherits stale page/screenshot/html/text/network artifacts from a prior
 * run. Best-effort; missing dirs are ignored.
 * @param {string} outputDir
 */
function cleanRoleOutput(outputDir) {
  for (const sub of ["pages", "screenshots", "html", "text", "network"]) {
    try {
      fs.rmSync(path.join(outputDir, sub), { recursive: true, force: true });
    } catch (_) {
      /* ignore */
    }
  }
  for (const file of ["role-map.json", "role-map.md"]) {
    try {
      fs.rmSync(path.join(outputDir, file), { force: true });
    } catch (_) {
      /* ignore */
    }
  }
}

function deriveUniqueSlug(state, route, url) {
  if (!state.slugByRoute) state.slugByRoute = new Map();
  if (!state.routeBySlug) state.routeBySlug = new Map();

  if (state.slugByRoute.has(route)) return state.slugByRoute.get(route);

  const base = routeToSlug(url) || "page";
  let slug = base;
  const owner = state.routeBySlug.get(slug);
  if (owner && owner !== route) {
    const hash = crypto.createHash("sha1").update(route).digest("hex").slice(0, 7);
    slug = `${base}-${hash}`;
    let n = 2;
    while (state.routeBySlug.has(slug) && state.routeBySlug.get(slug) !== route) {
      slug = `${base}-${hash}-${n}`;
      n += 1;
    }
  }

  state.slugByRoute.set(route, slug);
  state.routeBySlug.set(slug, route);
  return slug;
}

// ---------------------------------------------------------------------------
// Discovered-link harvesting from a page record
// ---------------------------------------------------------------------------

/**
 * Walk an extracted PageRecord + explorer result and enqueue every internal
 * navigation candidate with the proper `via` channel.
 *
 * @param {object} state
 * @param {object} record - the assembled PageRecord (pre-write).
 * @param {object} explorerResult - { interactions, ... } from exploreInteractions.
 * @param {string} fromRoute - normalized route of the current page.
 * @param {string} pageUrl - absolute current URL (base for relative hrefs).
 */
function harvestAndEnqueue(state, record, explorerResult, fromRoute, pageUrl) {
  const resolve = (href) => resolveUrl(pageUrl || state.baseUrl, href);

  const addList = (list, via, hrefKey) => {
    if (!Array.isArray(list)) return;
    for (const item of list) {
      if (!item) continue;
      const href = typeof item === "string" ? item : item[hrefKey || "href"];
      if (!href) continue;
      const abs = resolve(href);
      if (abs) enqueueCandidate(state, abs, via, fromRoute);
    }
  };

  addList(record.sidebarLinks, "sidebar", "href");
  addList(record.headerLinks, "header", "href");
  addList(record.footerLinks, "footer", "href");
  // breadcrumbs may be strings or objects; only objects with href are navigable.
  if (Array.isArray(record.breadcrumbs)) {
    for (const bc of record.breadcrumbs) {
      const href = bc && typeof bc === "object" ? bc.href : null;
      if (href) {
        const abs = resolve(href);
        if (abs) enqueueCandidate(state, abs, "breadcrumb", fromRoute);
      }
    }
  }
  addList(record.cards, "card", "href");
  addList(record.paginationLinks, "pagination", "href");

  // internalLinks carry an "area" hint; map known areas to channels, else "link".
  if (Array.isArray(record.internalLinks)) {
    for (const link of record.internalLinks) {
      if (!link || !link.href) continue;
      const abs = resolve(link.href);
      if (!abs) continue;
      const area = (link.area || "").toLowerCase();
      let via = "link";
      if (area === "sidebar") via = "sidebar";
      else if (area === "header") via = "header";
      else if (area === "footer") via = "footer";
      else if (area === "table") via = "table";
      enqueueCandidate(state, abs, via, fromRoute);
    }
  }

  // Tabs whose href changes the route are navigable.
  if (Array.isArray(record.tabs)) {
    for (const tab of record.tabs) {
      if (!tab || !tab.href) continue;
      const abs = resolve(tab.href);
      if (abs) enqueueCandidate(state, abs, "tab", fromRoute);
    }
  }

  // Dropdown trigger entries may expose an href (menu item links).
  if (Array.isArray(record.dropdownTriggers)) {
    for (const dd of record.dropdownTriggers) {
      const href = dd && typeof dd === "object" ? dd.href : null;
      if (href) {
        const abs = resolve(href);
        if (abs) enqueueCandidate(state, abs, "dropdown", fromRoute);
      }
    }
  }

  // Safe internal navigations discovered by the interaction explorer.
  if (explorerResult && Array.isArray(explorerResult.interactions)) {
    for (const interaction of explorerResult.interactions) {
      if (!interaction || interaction.type !== "navigation") continue;
      const after = interaction.afterUrl;
      if (!after) continue;
      const abs = resolve(after);
      if (abs) enqueueCandidate(state, abs, "dropdown", fromRoute);
    }
  }

  // discoveredHrefs is the catch-all bag from the DOM extractor.
  if (Array.isArray(record.discoveredHrefs)) {
    for (const href of record.discoveredHrefs) {
      if (!href) continue;
      const abs = resolve(href);
      if (abs) enqueueCandidate(state, abs, "link", fromRoute);
    }
  }
}

// ---------------------------------------------------------------------------
// Per-page processing
// ---------------------------------------------------------------------------

/**
 * Visit and fully process a single queue item. Returns a result object that the
 * main loop uses to update counters and (on nav failure) schedule a retry.
 *
 * Throws ONLY for session-expiry abort signalling (handled by caller).
 *
 * @param {import('playwright').Page} page
 * @param {object} item - { url, route, via, fromRoute }
 * @param {object} state
 * @param {object} ctx - { cfg, role, baseUrl, endpointMap, isRetry }
 * @returns {Promise<{status:string, retry?:boolean, loginRedirect?:boolean}>}
 */
async function processPage(page, item, state, ctx) {
  const { cfg, role, baseUrl } = ctx;
  const { url, route, via, fromRoute } = item;

  // SAFETY (belt-and-suspenders): even if a mutating URL reached the queue (e.g.
  // a configured start URL or a retry), never navigate to it.
  if (safety.isUnsafeUrl(url)) {
    logger.warn(`Skipping mutating/destructive URL (not navigated): ${url}`);
    state.routeGraph[route] = {
      url,
      title: "",
      modules: [],
      status: END_STATES.SKIPPED_UNSAFE,
      discoveredFrom: { route: fromRoute || null, via: via || "start" },
      discovers: [],
      reason: "URL targets a mutating/destructive action — not navigated",
    };
    state.resolved.add(route);
    return { status: END_STATES.SKIPPED_UNSAFE };
  }

  // Collision-free slug: two distinct routes (e.g. Arabic ?q= values that both
  // strip to the same ASCII slug) must never overwrite each other's files.
  const slug = deriveUniqueSlug(state, route, url);

  // gotoCalm rethrows genuine navigation errors so we can record failed_with_error.
  const navTimeout = ctx.isRetry ? 90000 : 45000;
  let navResponse = null;
  try {
    navResponse = await gotoCalm(page, url, { timeout: navTimeout, pageDelayMs: cfg.pageDelayMs });
  } catch (navErr) {
    const navMsg = navErr && navErr.message ? navErr.message : String(navErr);
    // A navigation that triggers a file download (export/report endpoints with no
    // file extension) is not a real failure — it is a non-navigable download.
    // Record it as unsupported_file with a clear reason instead of failed.
    if (/download is starting/i.test(navMsg)) {
      logger.info(`Download endpoint (not a page): ${url}`);
      state.routeGraph[route] = {
        url,
        title: "",
        modules: [],
        status: END_STATES.UNSUPPORTED_FILE,
        discoveredFrom: { route: fromRoute || null, via: via || "start" },
        discovers: [],
        reason: "Download/export endpoint — triggers a file download, not a navigable page",
      };
      state.resolved.add(route);
      return { status: END_STATES.UNSUPPORTED_FILE };
    }
    logger.warn(`Navigation failed: ${url}`, navMsg);
    state.routeGraph[route] = {
      url,
      title: "",
      modules: [],
      status: END_STATES.FAILED,
      discoveredFrom: { route: fromRoute || null, via: via || "start" },
      discovers: [],
      error: navMsg,
    };
    state.resolved.add(route);
    return {
      status: END_STATES.FAILED,
      retry: !ctx.isRetry && cfg.retryFailedPages === true,
    };
  }

  // Session / login detection.
  if (await looksLikeLogin(page, cfg)) {
    logger.warn(`Login redirect detected at: ${page.url()}`);
    state.routeGraph[route] = {
      url,
      title: "",
      modules: [],
      status: END_STATES.LOGIN_REDIRECT,
      discoveredFrom: { route: fromRoute || null, via: via || "start" },
      discovers: [],
    };
    state.resolved.add(route);
    return { status: END_STATES.LOGIN_REDIRECT, loginRedirect: true };
  }

  // Post-nav settling (gotoCalm already did some; be thorough for lazy content).
  await waitForContent(page);
  await waitForSpinnersGone(page);
  await slowScrollToBottom(page, { step: 600, delay: 200 });
  await scrollToTop(page);
  await settle(page, cfg.clickDelayMs);

  // ---- Static extraction --------------------------------------------------
  let staticData = {};
  try {
    staticData = await extractStaticData(page, { baseUrl });
  } catch (err) {
    logger.warn(`extractStaticData failed for ${url}`, err && err.message);
    staticData = {};
  }

  // ---- Design tokens ------------------------------------------------------
  let designTokens = {};
  try {
    designTokens = await extractDesignTokens(page);
  } catch (err) {
    logger.warn(`extractDesignTokens failed for ${url}`, err && err.message);
    designTokens = {};
  }

  // ---- Module classification ---------------------------------------------
  let modules = ["General / Unknown"];
  try {
    modules = classifyModules({
      url,
      route,
      title: staticData.title || "",
      headings: staticData.headings || [],
      breadcrumbs: staticData.breadcrumbs || [],
      sidebarActiveText: extractSidebarActiveText(staticData),
    });
    if (!Array.isArray(modules) || modules.length === 0) {
      modules = ["General / Unknown"];
    }
  } catch (err) {
    logger.warn(`classifyModules failed for ${url}`, err && err.message);
    modules = ["General / Unknown"];
  }

  // ---- Error-page detection ----------------------------------------------
  // Some discovered links lead to 404/403/error pages (broken or forbidden).
  // Record them honestly as error pages rather than misclassifying their
  // boilerplate ("Oops!") as real module content.
  const httpStatus =
    navResponse && typeof navResponse.status === "function" ? navResponse.status() : null;
  const errText =
    (staticData.title || "") + " " + (staticData.headings || []).map((h) => (h && h.text) || "").join(" ");
  const isErrorPage =
    (typeof httpStatus === "number" && httpStatus >= 400) ||
    /(^|\D)(404|403|500|401)(\D|$)|page not found|could not be found|forbidden|unauthorized|access denied|o+pps/i.test(errText);
  if (isErrorPage) {
    modules = ["General / Unknown"];
  }

  // ---- File paths (relative to role.outputDir, posix for offline links) ---
  const outDir = role.outputDir;
  const screenshotRel = path.posix.join("screenshots", `${slug}-full.png`);
  const rawHtmlRel = path.posix.join("html", "raw", `${slug}.html`);
  const sanitizedHtmlRel = path.posix.join("html", "sanitized", `${slug}.html`);
  const textRel = path.posix.join("text", `${slug}.txt`);

  const screenshotAbs = path.join(outDir, screenshotRel);
  const rawHtmlAbs = path.join(outDir, rawHtmlRel);
  const textAbs = path.join(outDir, textRel);

  // ---- Full-page screenshot ----------------------------------------------
  fsUtils.ensureDir(path.dirname(screenshotAbs));
  try {
    await page.screenshot({ path: screenshotAbs, fullPage: true });
  } catch (err) {
    logger.warn(`Full-page screenshot failed for ${url}`, err && err.message);
  }

  // ---- Raw HTML + visible text -------------------------------------------
  try {
    const rawHtml = await page.content();
    fsUtils.writeText(rawHtmlAbs, rawHtml);
    // Stash raw HTML in memory for Phase 2 sanitization.
    state.capturedHtml.set(route, { rawHtml, url, slug });
  } catch (err) {
    logger.warn(`Capturing raw HTML failed for ${url}`, err && err.message);
  }
  try {
    fsUtils.writeText(textAbs, staticData.visibleText || "");
  } catch (err) {
    logger.warn(`Writing visible text failed for ${url}`, err && err.message);
  }

  // ---- Interaction exploration (SAFE only) -------------------------------
  let interactionCounter = 0;
  const takeScreenshot = async (nameNoExt, opts) => {
    interactionCounter += 1;
    const safeName = fsUtils.slugify(nameNoExt || `interaction-${interactionCounter}`);
    const fileName = `${slug}-${String(interactionCounter).padStart(3, "0")}-${safeName}.png`;
    const rel = path.posix.join("screenshots", fileName);
    const abs = path.join(outDir, rel);
    fsUtils.ensureDir(path.dirname(abs));
    try {
      await page.screenshot({
        path: abs,
        fullPage: !!(opts && opts.fullPage),
      });
    } catch (err) {
      logger.warn(`Interaction screenshot failed (${fileName})`, err && err.message);
    }
    return rel;
  };

  let explorerResult = {
    interactions: [],
    modals: [],
    safeSkipped: [],
    unsafeSkipped: [],
    failed: [],
  };
  try {
    explorerResult = await exploreInteractions(page, {
      record: staticData,
      role,
      baseUrl,
      config: cfg,
      logger,
      takeScreenshot,
      normalize: { normalizeRoute },
    });
    explorerResult = normalizeExplorerResult(explorerResult);
  } catch (err) {
    logger.warn(`exploreInteractions failed for ${url}`, err && err.message);
    explorerResult = normalizeExplorerResult(null);
  }

  // ---- Network endpoints for this page ------------------------------------
  // We attach the global unique set (metadata only). The route-level filtering
  // to "this page-ish" is approximated by the same-origin global set, since the
  // SPA may issue requests against arbitrary endpoints per view.
  const pageEndpoints = Array.from(state.endpointMap.values());

  // ---- Assemble the full PageRecord --------------------------------------
  const record = buildPageRecord({
    role,
    url,
    route,
    slug,
    via,
    fromRoute,
    staticData,
    modules,
    designTokens,
    explorerResult,
    httpStatus,
    isErrorPage,
    interactionScreenshots: collectInteractionScreenshots(explorerResult),
    files: {
      screenshotFull: screenshotRel,
      rawHtml: rawHtmlRel,
      sanitizedHtml: sanitizedHtmlRel,
      text: textRel,
    },
    endpoints: pageEndpoints,
  });

  // ---- Persist the page record -------------------------------------------
  try {
    writePageRecord(record, role);
  } catch (err) {
    logger.error(`writePageRecord failed for ${url}`, err);
  }

  // ---- Mark visited + route graph ----------------------------------------
  state.visited.add(route);
  state.records.push(record);
  state.routeGraph[route] = {
    url,
    title: record.title,
    modules: record.modules,
    status: END_STATES.VISITED,
    discoveredFrom: record.discoveredFrom,
    discovers: [],
  };
  state.resolved.add(route);

  // ---- Enqueue discovered internal links ----------------------------------
  harvestAndEnqueue(state, record, explorerResult, route, page.url());

  logger.success(
    `Visited ${slug}  [${record.modules.join(", ")}]  ` +
      `links+${countDiscoveredLinks(record)} interactions=${explorerResult.interactions.length} ` +
      `modals=${explorerResult.modals.length}`
  );

  return { status: END_STATES.VISITED };
}

/**
 * Derive the active sidebar text from extracted static data (best-effort).
 * The DOM extractor does not export a dedicated field, so we look for an
 * active/current sidebar link's text.
 * @param {object} staticData
 * @returns {string}
 */
function extractSidebarActiveText(staticData) {
  if (!staticData) return "";
  if (typeof staticData.sidebarActiveText === "string") {
    return staticData.sidebarActiveText;
  }
  // No active item detected → return empty. We deliberately do NOT concatenate
  // every sidebar link: the full nav lists all modules, which made the highest-
  // weight classification signal match every module on every page.
  return "";
}

/**
 * Ensure an explorer result has every expected array key.
 * @param {object|null} result
 * @returns {object}
 */
function normalizeExplorerResult(result) {
  const r = result || {};
  return {
    interactions: Array.isArray(r.interactions) ? r.interactions : [],
    modals: Array.isArray(r.modals) ? r.modals : [],
    safeSkipped: Array.isArray(r.safeSkipped) ? r.safeSkipped : [],
    unsafeSkipped: Array.isArray(r.unsafeSkipped) ? r.unsafeSkipped : [],
    failed: Array.isArray(r.failed) ? r.failed : [],
  };
}

/**
 * Collect the relative interaction screenshot paths from an explorer result.
 * @param {object} explorerResult
 * @returns {string[]}
 */
function collectInteractionScreenshots(explorerResult) {
  const shots = [];
  for (const interaction of explorerResult.interactions) {
    if (interaction && interaction.screenshot) shots.push(interaction.screenshot);
  }
  for (const modal of explorerResult.modals) {
    if (modal && modal.screenshot) shots.push(modal.screenshot);
  }
  // Dedupe while preserving order.
  return Array.from(new Set(shots));
}

/**
 * Count how many internal navigation links a record exposes (for log output).
 * @param {object} record
 * @returns {number}
 */
function countDiscoveredLinks(record) {
  let n = 0;
  const add = (arr) => {
    if (Array.isArray(arr)) n += arr.length;
  };
  add(record.sidebarLinks);
  add(record.headerLinks);
  add(record.footerLinks);
  add(record.internalLinks);
  add(record.paginationLinks);
  return n;
}

/**
 * Assemble the canonical PageRecord object from its parts.
 * @param {object} parts
 * @returns {object}
 */
/**
 * Humanize a slug into a Title Case label as a last-resort display name.
 * @param {string} slug
 * @returns {string}
 */
function humanizeSlug(slug) {
  if (!slug || slug === "page") return "Page";
  if (slug === "home" || slug === "management-home") return "Home";
  return slug
    .replace(/^management-/, "")
    .replace(/^admin-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 80);
}

/**
 * Derive a human page label. The real <title> is often a generic brand string
 * (e.g. "afaaqonline"), so prefer the most-specific breadcrumb, then a content
 * heading, then the title (if not brand-like), then a humanized slug.
 * @param {object} sd - static data ({title, headings:[{level,text}], breadcrumbs})
 * @param {string} slug
 * @returns {string}
 */
function deriveDisplayName(sd, slug) {
  const brandish = /afaaq|^dashboard$|^academy$|^home$/i;
  const toText = (v) => (typeof v === "string" ? v : v && typeof v === "object" ? v.text || "" : "");

  const crumbs = (Array.isArray(sd.breadcrumbs) ? sd.breadcrumbs : [])
    .map(toText)
    .map((s) => s.trim())
    .filter(Boolean);
  if (crumbs.length) {
    const last = crumbs[crumbs.length - 1];
    if (last && last.length <= 60 && !brandish.test(last)) return last;
  }

  const headings = Array.isArray(sd.headings) ? sd.headings : [];
  // Prefer a real page-title H1 — H2-H6 are usually section/card/table headings,
  // not the page name, so the humanized route is a better label than those.
  const h1 = headings.find(
    (h) => h && (h.level === 1 || h.level === "1") && h.text && h.text.trim() && !brandish.test(h.text.trim())
  );
  if (h1) return h1.text.trim().slice(0, 80);

  const human = humanizeSlug(slug);
  if (human && human !== "Page") return human;

  // Last resort: any non-brand heading, else the slug humanization ("Page").
  const anyH = headings.find((h) => h && h.text && h.text.trim() && !brandish.test(h.text.trim()));
  if (anyH) return anyH.text.trim().slice(0, 80);

  return human;
}

/**
 * Merge statically-extracted modal definitions (complete structure for every
 * dialog on the page) with the explorer's interaction-captured modals (which
 * carry a screenshot for the ones actually opened). Static defs are the base;
 * a matching opened modal contributes its screenshot. Opened modals with no
 * static match (e.g. dynamically injected) are appended so none are lost.
 * @param {Array} staticModals
 * @param {Array} openedModals
 * @returns {Array}
 */
function mergeModals(staticModals, openedModals) {
  const norm = (s) => (s || "").toString().toLowerCase().replace(/\s+/g, " ").trim();
  const statics = Array.isArray(staticModals) ? staticModals : [];
  const opened = Array.isArray(openedModals) ? openedModals : [];
  const usedOpened = new Set();
  const result = [];

  for (const sm of statics) {
    let screenshot = "";
    let triggerText = "";
    for (let i = 0; i < opened.length; i += 1) {
      if (usedOpened.has(i)) continue;
      const om = opened[i] || {};
      if (sm.title && om.title && norm(sm.title) === norm(om.title)) {
        screenshot = om.screenshot || "";
        triggerText = om.triggerText || "";
        usedOpened.add(i);
        break;
      }
    }
    result.push({
      id: sm.id || "",
      kind: sm.kind || "modal",
      title: sm.title || "",
      triggerText: triggerText,
      fields: Array.isArray(sm.fields) ? sm.fields : [],
      buttons: Array.isArray(sm.buttons) ? sm.buttons : [],
      text: sm.text || "",
      screenshot: screenshot,
      source: screenshot ? "static+opened" : "static",
    });
  }

  for (let i = 0; i < opened.length; i += 1) {
    if (usedOpened.has(i)) continue;
    const om = opened[i] || {};
    result.push({
      id: om.id || "",
      kind: "modal",
      title: om.title || "",
      triggerText: om.triggerText || "",
      fields: Array.isArray(om.fields) ? om.fields : [],
      buttons: Array.isArray(om.buttons) ? om.buttons : [],
      text: om.text || "",
      screenshot: om.screenshot || "",
      source: "opened",
    });
  }

  return result;
}

function buildPageRecord(parts) {
  const {
    role,
    url,
    route,
    slug,
    via,
    fromRoute,
    staticData,
    modules,
    designTokens,
    explorerResult,
    interactionScreenshots,
    files,
    endpoints,
    httpStatus,
    isErrorPage,
  } = parts;

  const sd = staticData || {};
  const arr = (v) => (Array.isArray(v) ? v : []);

  return {
    role: role.key,
    url,
    normalizedRoute: route,
    slug,
    title: sd.title || "",
    displayName: deriveDisplayName(sd, slug),
    lang: sd.lang || "",
    dir: sd.dir || "",
    isRTL: !!sd.isRTL,
    httpStatus: typeof httpStatus === "number" ? httpStatus : null,
    isErrorPage: !!isErrorPage,
    modules,
    discoveryStatus: END_STATES.VISITED,
    discoveredFrom: { route: fromRoute || null, via: via || "start" },
    capturedAt: new Date().toISOString(),
    screenshots: {
      full: files.screenshotFull,
      interactions: interactionScreenshots,
    },
    html: {
      rawFile: files.rawHtml,
      sanitizedFile: files.sanitizedHtml,
      textFile: files.text,
    },
    headings: arr(sd.headings),
    breadcrumbs: arr(sd.breadcrumbs),
    sidebarLinks: arr(sd.sidebarLinks),
    headerLinks: arr(sd.headerLinks),
    footerLinks: arr(sd.footerLinks),
    internalLinks: arr(sd.internalLinks),
    externalLinks: arr(sd.externalLinks),
    paginationLinks: arr(sd.paginationLinks),
    buttons: arr(sd.buttons),
    forms: arr(sd.forms),
    labels: arr(sd.labels),
    tables: arr(sd.tables),
    cards: arr(sd.cards),
    badges: arr(sd.badges),
    filters: arr(sd.filters),
    tabs: arr(sd.tabs),
    dropdownTriggers: arr(sd.dropdownTriggers),
    interactions: explorerResult.interactions,
    modals: mergeModals(arr(sd.modals), explorerResult.modals),
    safeSkipped: explorerResult.safeSkipped,
    unsafeSkipped: explorerResult.unsafeSkipped,
    failed: explorerResult.failed,
    network: { endpoints: arr(endpoints) },
    designTokens: designTokens || {},
    domSummary: sd.domSummary || { counts: {}, topTags: [] },
  };
}

// ---------------------------------------------------------------------------
// Phase 2: sanitized offline HTML snapshots
// ---------------------------------------------------------------------------

/**
 * Build a route -> { exists, slug, sanitizedAbs } map and write a sanitized,
 * offline-safe HTML snapshot for every captured page. Cross-links between
 * captured pages are rewritten to relative local paths; everything else is
 * dead-ended so the snapshot can never reach the live platform.
 *
 * @param {object} state
 * @param {object} role
 * @param {string} baseUrl
 */
function runPhase2Sanitization(state, role, baseUrl) {
  logger.step("Phase 2: writing sanitized offline HTML snapshots");

  const sanitizedDir = path.join(role.outputDir, "html", "sanitized");
  fsUtils.ensureDir(sanitizedDir);

  // Map normalized route -> { slug, sanitizedAbs } for resolver lookups.
  const routeToLocal = new Map();
  for (const [route, captured] of state.capturedHtml.entries()) {
    routeToLocal.set(route, {
      slug: captured.slug,
      sanitizedAbs: path.join(sanitizedDir, `${captured.slug}.html`),
    });
  }

  let written = 0;
  for (const [route, captured] of state.capturedHtml.entries()) {
    const localInfo = routeToLocal.get(route);
    if (!localInfo) continue;

    // Resolver: given an absolute URL, return whether we have a local snapshot
    // and a RELATIVE href from THIS sanitized file to the target sanitized file.
    const localPageResolver = (absoluteUrl) => {
      const targetRoute = normalizeRoute(absoluteUrl);
      if (!targetRoute) return { exists: false, localHref: "" };
      const target = routeToLocal.get(targetRoute);
      if (!target) return { exists: false, localHref: "" };
      const relHref = fsUtils.relativePath(
        path.dirname(localInfo.sanitizedAbs),
        target.sanitizedAbs
      );
      return { exists: true, localHref: relHref || `${target.slug}.html` };
    };

    let sanitized;
    try {
      sanitized = sanitizeHtml(captured.rawHtml, {
        pageUrl: captured.url,
        baseUrl,
        localPageResolver,
      });
    } catch (err) {
      logger.warn(`sanitizeHtml failed for ${captured.url}`, err && err.message);
      continue;
    }

    try {
      fsUtils.writeText(localInfo.sanitizedAbs, sanitized);
      written += 1;
    } catch (err) {
      logger.warn(`Writing sanitized HTML failed for ${captured.url}`, err && err.message);
    }
  }

  logger.success(`Sanitized snapshots written: ${written}/${state.capturedHtml.size}`);
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

/**
 * Build the role-level summary object from the route graph and captured records.
 * @param {object} state
 * @param {object} role
 * @returns {object}
 */
function buildSummary(state, role) {
  const endStateCounts = {};
  for (const key of Object.values(END_STATES)) endStateCounts[key] = 0;

  const failedPages = [];
  const skipped = [];
  for (const [route, node] of Object.entries(state.routeGraph)) {
    const status = node.status || "unknown";
    endStateCounts[status] = (endStateCounts[status] || 0) + 1;
    if (status === END_STATES.FAILED) {
      failedPages.push({ route, url: node.url, error: node.error || "unknown error" });
    }
    if (
      status === END_STATES.SKIPPED_SAFE ||
      status === END_STATES.SKIPPED_UNSAFE ||
      status === END_STATES.LOGIN_REDIRECT ||
      status === END_STATES.UNSUPPORTED_FILE ||
      status === END_STATES.EXTERNAL ||
      status === END_STATES.DUPLICATE
    ) {
      skipped.push({ route, url: node.url, reason: status });
    }
  }

  // Module coverage + component/interaction totals from captured records.
  const modulesCovered = new Set();
  let totalButtons = 0;
  let totalForms = 0;
  let totalTables = 0;
  let totalModals = 0;
  let totalInteractions = 0;

  for (const rec of state.records) {
    for (const m of rec.modules || []) modulesCovered.add(m);
    totalButtons += (rec.buttons || []).length;
    totalForms += (rec.forms || []).length;
    totalTables += (rec.tables || []).length;
    totalModals += (rec.modals || []).length;
    totalInteractions += (rec.interactions || []).length;
  }

  return {
    role: role.key,
    label: role.label,
    generatedAt: new Date().toISOString(),
    counts: endStateCounts,
    pagesVisited: state.records.length,
    routesDiscovered: Object.keys(state.routeGraph).length,
    modulesCovered: Array.from(modulesCovered),
    totals: {
      buttons: totalButtons,
      forms: totalForms,
      tables: totalTables,
      modals: totalModals,
      interactions: totalInteractions,
      endpoints: state.endpointMap.size,
    },
    unreachable: {
      explanation:
        "Pages listed here could not be captured. Failed pages errored during " +
        "navigation (network/timeout); skipped pages were intentionally not " +
        "visited (unsafe URL, external, unsupported file, duplicate route, or login redirect).",
      failedPages,
      skipped,
    },
  };
}

/**
 * Print a clear human summary, INCLUDING what could not be reached and why.
 * @param {object} summary
 * @param {object} role
 */
function printHumanSummary(summary, role) {
  const c = summary.counts || {};
  const t = summary.totals || {};

  logger.step(`Crawl summary for role "${role.key}" (${role.label})`);
  logger.info(`Pages visited:        ${summary.pagesVisited}`);
  logger.info(`Routes discovered:    ${summary.routesDiscovered}`);
  logger.info(`Modules covered:      ${summary.modulesCovered.length} -> ${summary.modulesCovered.join(", ")}`);
  logger.info(
    `Components captured:  buttons=${t.buttons} forms=${t.forms} ` +
      `tables=${t.tables} modals=${t.modals} interactions=${t.interactions}`
  );
  logger.info(`Network endpoints:    ${t.endpoints}`);

  logger.info("End-states:");
  for (const [k, v] of Object.entries(c)) {
    if (v > 0) logger.info(`   ${k}: ${v}`);
  }

  const failed = (summary.unreachable && summary.unreachable.failedPages) || [];
  const skipped = (summary.unreachable && summary.unreachable.skipped) || [];

  if (failed.length > 0) {
    logger.warn(`Unreachable (FAILED) pages: ${failed.length}`);
    for (const f of failed.slice(0, 20)) {
      logger.warn(`   ${f.url || f.route}  -> ${f.error}`);
    }
    if (failed.length > 20) logger.warn(`   ... and ${failed.length - 20} more`);
  } else {
    logger.success("No failed pages.");
  }

  if (skipped.length > 0) {
    logger.info(`Intentionally skipped routes: ${skipped.length} (external/unsupported/duplicate/login/unsafe)`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  config.loadEnv();
  const cfg = config.getGlobalConfig();

  const roleKey = parseRoleKey();
  if (!roleKey) {
    logger.error('Usage: node crawl-role.js <role>   (e.g. "admin", "teacher", "family")');
    process.exitCode = 1;
    return;
  }

  let role;
  try {
    role = config.getRole(roleKey);
  } catch (err) {
    logger.error(`Unknown role "${roleKey}".`, err);
    process.exitCode = 1;
    return;
  }

  // Require a saved auth state.
  if (!role.authStateFile || !fsUtils.exists(role.authStateFile)) {
    logger.error(
      `No saved auth state for role "${role.key}" ` +
        `(expected at ${role.authStateFile || "<unset>"}). ` +
        `Run save-auth first:  node save-auth.js ${role.key}`
    );
    process.exitCode = 1;
    return;
  }

  // Start each crawl from a clean slate so stale artifacts from a previous run
  // (routes no longer discovered/visited, locale-polluted pages, etc.) never
  // linger and pollute the audit/report.
  cleanRoleOutput(role.outputDir);
  fsUtils.ensureDir(role.outputDir);

  logger.step(`Starting read-only discovery crawl for role "${role.key}" (${role.label})`);
  logger.info(`Base URL:   ${cfg.baseUrl}`);
  logger.info(`Start URLs: ${role.startUrls.join(", ")}`);
  logger.info(
    `Config: headless=${cfg.headless} slowMode=${cfg.slowMode} ` +
      `maxPages=${cfg.maxPagesPerRole} maxSafeClicks=${cfg.maxSafeClicksPerPage} ` +
      `retryFailed=${cfg.retryFailedPages}`
  );

  let browser = null;
  let fatalError = null;

  // Shared crawl state.
  const state = {
    baseUrl: cfg.baseUrl,
    queue: [],
    queued: new Set(), // routes currently queued (not yet visited)
    visited: new Set(), // routes fully visited
    resolved: new Set(), // routes with any recorded end-state (visited/skip/fail/external)
    routeGraph: {},
    records: [],
    capturedHtml: new Map(), // route -> { rawHtml, url, slug }
    endpointMap: new Map(),
    failedRetryQueue: [],
  };

  try {
    browser = await chromium.launch({ headless: cfg.headless });

    const context = await browser.newContext({
      storageState: role.authStateFile,
      viewport: cfg.viewport,
      ignoreHTTPSErrors: true,
    });

    attachNetworkCapture(context, cfg.baseUrl, state.endpointMap);

    const page = await context.newPage();

    // Seed the queue with start URLs.
    for (const startUrl of role.startUrls) {
      const route = normalizeRoute(startUrl);
      if (!route || state.queued.has(route)) continue;
      state.queued.add(route);
      state.queue.push({ url: startUrl, route, via: "start", fromRoute: null });
    }

    let consecutiveLoginRedirects = 0;

    // ---- BFS main loop ----------------------------------------------------
    while (state.queue.length > 0 && state.visited.size < cfg.maxPagesPerRole) {
      const item = state.queue.shift();
      state.queued.delete(item.route);

      // Re-check dedupe (a route may have been resolved after enqueue).
      if (state.visited.has(item.route) || state.resolved.has(item.route)) {
        // If it was visited, it's a true duplicate; record only if never seen.
        if (!state.routeGraph[item.route]) {
          state.routeGraph[item.route] = {
            url: item.url,
            title: "",
            modules: [],
            status: END_STATES.DUPLICATE,
            discoveredFrom: { route: item.fromRoute || null, via: item.via || "link" },
            discovers: [],
          };
        }
        pushDiscoverEdge(state, item.fromRoute, item.route);
        continue;
      }

      logger.info(`Visiting (${state.visited.size + 1}/${cfg.maxPagesPerRole}): ${item.url}  [via ${item.via}]`);

      let result;
      try {
        result = await processPage(page, item, state, {
          cfg,
          role,
          baseUrl: cfg.baseUrl,
          endpointMap: state.endpointMap,
          isRetry: false,
        });
      } catch (err) {
        // processPage is defensive, but guard the loop regardless.
        logger.error(`Unexpected error processing ${item.url}`, err);
        state.routeGraph[item.route] = {
          url: item.url,
          title: "",
          modules: [],
          status: END_STATES.FAILED,
          discoveredFrom: { route: item.fromRoute || null, via: item.via || "start" },
          discovers: [],
          error: err && err.message ? err.message : String(err),
        };
        state.resolved.add(item.route);
        result = { status: END_STATES.FAILED, retry: cfg.retryFailedPages === true };
      }

      // Record discover edge from parent.
      pushDiscoverEdge(state, item.fromRoute, item.route);

      // Login-redirect tracking / abort.
      if (result && result.loginRedirect) {
        consecutiveLoginRedirects += 1;
        if (consecutiveLoginRedirects >= MAX_CONSECUTIVE_LOGIN_REDIRECTS) {
          fatalError = new Error(
            `Session expired: ${consecutiveLoginRedirects} consecutive login redirects. ` +
              `Re-run save-auth:  node save-auth.js ${role.key}`
          );
          logger.error(fatalError.message);
          break;
        }
      } else {
        consecutiveLoginRedirects = 0;
      }

      // Schedule a retry for transient nav failures.
      if (result && result.retry) {
        state.failedRetryQueue.push(item);
      }
    }

    if (state.visited.size >= cfg.maxPagesPerRole) {
      logger.warn(
        `Reached maxPagesPerRole (${cfg.maxPagesPerRole}); ` +
          `${state.queue.length} route(s) remain unqueued/unvisited.`
      );
      // Mark remaining queued routes so they are visible in the summary, each
      // with an explicit reason (every skipped route must carry a reason).
      for (const pending of state.queue) {
        if (!state.routeGraph[pending.route]) {
          state.routeGraph[pending.route] = {
            url: pending.url,
            title: "",
            modules: [],
            status: END_STATES.SKIPPED_SAFE,
            discoveredFrom: { route: pending.fromRoute || null, via: pending.via || "link" },
            discovers: [],
            reason:
              `Discovered but not visited — page budget reached ` +
              `(maxPagesPerRole=${cfg.maxPagesPerRole}). Raise the cap or run the full crawl to visit it.`,
          };
        }
      }
    }

    // ---- Retry failed pages ONCE with longer waits ------------------------
    if (!fatalError && state.failedRetryQueue.length > 0) {
      logger.step(`Retrying ${state.failedRetryQueue.length} failed page(s) once with longer waits`);
      const retryItems = state.failedRetryQueue.slice();
      state.failedRetryQueue = [];
      for (const item of retryItems) {
        if (state.visited.has(item.route)) continue;
        if (state.visited.size >= cfg.maxPagesPerRole) break;
        logger.info(`Retry: ${item.url}`);
        try {
          const result = await processPage(page, item, state, {
            cfg,
            role,
            baseUrl: cfg.baseUrl,
            endpointMap: state.endpointMap,
            isRetry: true,
          });
          if (result && result.loginRedirect) {
            logger.warn("Login redirect during retry — session may be expired.");
          }
        } catch (err) {
          logger.error(`Retry failed for ${item.url}`, err);
        }
      }
    }

    // ---- Phase 2: sanitized snapshots -------------------------------------
    if (!fatalError) {
      runPhase2Sanitization(state, role, cfg.baseUrl);
    }

    // ---- Write endpoints file ---------------------------------------------
    const endpoints = Array.from(state.endpointMap.values());
    const endpointsFile = path.join(role.outputDir, "network", "endpoints.json");
    try {
      fsUtils.writeJson(endpointsFile, { role: role.key, count: endpoints.length, endpoints });
    } catch (err) {
      logger.warn("Writing endpoints.json failed", err && err.message);
    }

    // ---- Summary + role map -----------------------------------------------
    const summary = buildSummary(state, role);
    try {
      writeRoleMap(role, state.records, state.routeGraph, summary);
    } catch (err) {
      logger.error("writeRoleMap failed", err);
    }

    printHumanSummary(summary, role);
  } catch (err) {
    fatalError = err;
    logger.error("Fatal error during crawl", err);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeErr) {
        logger.warn("Error closing browser", closeErr && closeErr.message);
      }
    }
  }

  // Exit code reflects FATAL-only errors. Per-page failures are reported but
  // do not fail the process (the run still produced useful output).
  if (fatalError) {
    process.exitCode = 1;
  }
}

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

if (require.main === module) {
  main().catch((err) => {
    logger.error("Unhandled fatal error", err);
    process.exitCode = 1;
  });
}

module.exports = { main };

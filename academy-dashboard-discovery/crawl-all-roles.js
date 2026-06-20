"use strict";

/**
 * crawl-all-roles.js
 *
 * Entry point: node crawl-all-roles.js
 *
 * Orchestrates the full multi-role crawl by spawning "node crawl-role.js <key>"
 * for each role defined in roles.config.json, in the canonical order:
 *   admin -> teacher -> family -> (any additional roles in config order)
 *
 * - Continues past individual role failures (logs exit code, moves on).
 * - Skips roles whose auth-state file is absent with a clear note.
 * - Prints a final summary table after all roles finish.
 * - Exits 0 unless EVERY role failed or was skipped; exits 1 if all failed.
 *
 * Exports:
 *   crawlRole(key) -> { status, exitCode, pageCount, roleLabel }
 */

const path        = require("path");
const { spawnSync } = require("child_process");

const { loadEnv, loadRoles, PROJECT_ROOT, OUTPUT_DIR } = require("./lib/config");
const { createLogger }                                  = require("./lib/logger");
const { readJson, exists }                              = require("./lib/fs-utils");

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

loadEnv();

const log = createLogger("crawl-all-roles");

// ---------------------------------------------------------------------------
// Canonical priority order for known roles
// ---------------------------------------------------------------------------
const PRIORITY_ORDER = ["admin", "teacher", "family"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the absolute path of a role's auth-state file.
 * The authStateFile field in roles.config.json is relative to PROJECT_ROOT.
 *
 * @param {object} roleRaw - Raw role object from roles.config.json
 * @returns {string} absolute path
 */
function resolveAuthStateFile(roleRaw) {
  if (!roleRaw.authStateFile) return "";
  return path.isAbsolute(roleRaw.authStateFile)
    ? roleRaw.authStateFile
    : path.join(PROJECT_ROOT, roleRaw.authStateFile);
}

/**
 * Reads the page count for a crawled role from its role-map.json.
 * Returns 0 if the file is absent or malformed.
 *
 * @param {string} roleKey
 * @returns {number}
 */
function readPageCount(roleKey) {
  const roleMapPath = path.join(OUTPUT_DIR, "roles", roleKey, "role-map.json");
  const data = readJson(roleMapPath);
  if (!data) return 0;
  // role-map.json shape: { summary: { totalPages: N } } or { pages: [...] }
  if (data.summary && typeof data.summary.totalPages === "number") {
    return data.summary.totalPages;
  }
  if (Array.isArray(data.pages)) {
    return data.pages.length;
  }
  // Fallback: count page files directly
  const pagesDir = path.join(OUTPUT_DIR, "roles", roleKey, "pages");
  try {
    const fs = require("fs");
    const entries = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json"));
    return entries.length;
  } catch (_) {
    return 0;
  }
}

// ---------------------------------------------------------------------------
// crawlRole — exported helper
// ---------------------------------------------------------------------------

/**
 * Spawns "node crawl-role.js <key>" synchronously (stdio inherited so the
 * sub-process writes directly to the terminal in real time).
 *
 * @param {string} key - Role key matching a roles.config.json entry.
 * @returns {{ status: "ok"|"failed"|"skipped-no-auth", exitCode: number, pageCount: number, roleLabel: string }}
 */
function crawlRole(key) {
  let roleLabel = key;

  // ---- Resolve role metadata -----------------------------------------------
  let roles;
  try {
    roles = loadRoles();
  } catch (err) {
    log.error(`Failed to load roles config when crawling role "${key}"`, err);
    return { status: "failed", exitCode: 1, pageCount: 0, roleLabel };
  }

  const roleRaw = roles.find((r) => r.key === key);
  if (!roleRaw) {
    log.error(`Role key "${key}" not found in roles.config.json — skipping.`);
    return { status: "failed", exitCode: 1, pageCount: 0, roleLabel };
  }

  roleLabel = roleRaw.label || key;

  // ---- Auth-state guard -----------------------------------------------------
  const authStateFile = resolveAuthStateFile(roleRaw);
  if (authStateFile && !exists(authStateFile)) {
    log.warn(
      `Role "${roleLabel}" (${key}): auth-state file not found at ${authStateFile} — skipping.` +
      ` Run "node authenticate.js ${key}" first to create it.`
    );
    return { status: "skipped-no-auth", exitCode: 0, pageCount: 0, roleLabel };
  }

  // ---- Spawn crawl-role.js --------------------------------------------------
  const crawlRoleScript = path.join(PROJECT_ROOT, "crawl-role.js");

  log.step(`Starting crawl for role: ${roleLabel} (${key})`);
  log.info(`Spawning: node crawl-role.js ${key}`);

  const result = spawnSync(process.execPath, [crawlRoleScript, key], {
    stdio: "inherit",
    cwd: PROJECT_ROOT,
    env: process.env,
  });

  // spawnSync sets result.status = exit code, result.signal if killed
  const exitCode = result.status !== null ? result.status : 1;

  if (result.error) {
    log.error(
      `Failed to spawn crawl-role.js for role "${roleLabel}" (${key})`,
      result.error
    );
    return { status: "failed", exitCode: 1, pageCount: 0, roleLabel };
  }

  if (exitCode !== 0) {
    log.error(
      `Role "${roleLabel}" (${key}) finished with exit code ${exitCode}.`
    );
    const pageCount = readPageCount(key);
    return { status: "failed", exitCode, pageCount, roleLabel };
  }

  const pageCount = readPageCount(key);
  log.success(
    `Role "${roleLabel}" (${key}) crawl complete. Pages captured: ${pageCount}`
  );
  return { status: "ok", exitCode: 0, pageCount, roleLabel };
}

module.exports = { crawlRole };

// ---------------------------------------------------------------------------
// Main orchestrator (only runs when this file is the entry point)
// ---------------------------------------------------------------------------

if (require.main === module) {
  (function main() {
    log.step("=== Academy Dashboard Discovery — Multi-Role Crawl ===");

    // Load all roles from config
    let allRoles;
    try {
      allRoles = loadRoles();
    } catch (err) {
      log.error("Cannot read roles.config.json — aborting.", err);
      process.exit(1);
    }

    if (!allRoles || allRoles.length === 0) {
      log.error("No roles defined in roles.config.json — nothing to crawl.");
      process.exit(1);
    }

    // Build the ordered list: known priority roles first, then any extras
    const orderedKeys = [];

    // 1) Add priority roles that exist in config, in PRIORITY_ORDER sequence
    for (const pk of PRIORITY_ORDER) {
      if (allRoles.some((r) => r.key === pk)) {
        orderedKeys.push(pk);
      }
    }

    // 2) Append any remaining roles not in PRIORITY_ORDER (preserve config order)
    for (const r of allRoles) {
      if (!orderedKeys.includes(r.key)) {
        orderedKeys.push(r.key);
      }
    }

    log.info(
      `Roles to crawl (${orderedKeys.length}): ${orderedKeys.join(", ")}`
    );

    // ---- Run each role sequentially -----------------------------------------
    /** @type {Map<string, { status:string, exitCode:number, pageCount:number, roleLabel:string }>} */
    const results = new Map();

    for (const key of orderedKeys) {
      log.info(`\n${"─".repeat(60)}`);
      const outcome = crawlRole(key);
      results.set(key, outcome);
      log.info(`${"─".repeat(60)}\n`);
    }

    // ---- Final summary table ------------------------------------------------
    const ANSI = {
      reset:   "\x1b[0m",
      bold:    "\x1b[1m",
      green:   "\x1b[32m",
      yellow:  "\x1b[33m",
      red:     "\x1b[31m",
      cyan:    "\x1b[36m",
      gray:    "\x1b[90m",
    };

    const COL_KEY    = 12;
    const COL_LABEL  = 24;
    const COL_STATUS = 20;
    const COL_PAGES  = 10;

    function padR(str, len) {
      return String(str).padEnd(len, " ").slice(0, len);
    }

    const divider = "─".repeat(COL_KEY + COL_LABEL + COL_STATUS + COL_PAGES + 9);

    process.stdout.write("\n");
    process.stdout.write(
      `${ANSI.bold}${ANSI.cyan}=== Crawl Summary ==============================================${ANSI.reset}\n`
    );
    process.stdout.write(
      `${ANSI.bold}` +
      `${"Role Key".padEnd(COL_KEY)}  ` +
      `${"Label".padEnd(COL_LABEL)}  ` +
      `${"Status".padEnd(COL_STATUS)}  ` +
      `${"Pages".padEnd(COL_PAGES)}` +
      `${ANSI.reset}\n`
    );
    process.stdout.write(`${ANSI.gray}${divider}${ANSI.reset}\n`);

    let countOk      = 0;
    let countFailed  = 0;
    let countSkipped = 0;

    for (const [key, outcome] of results) {
      const { status, pageCount, roleLabel } = outcome;

      let statusColor;
      let statusText;
      if (status === "ok") {
        statusColor = ANSI.green;
        statusText  = "ok";
        countOk++;
      } else if (status === "skipped-no-auth") {
        statusColor = ANSI.yellow;
        statusText  = "skipped-no-auth";
        countSkipped++;
      } else {
        statusColor = ANSI.red;
        statusText  = "failed";
        countFailed++;
      }

      process.stdout.write(
        `${padR(key, COL_KEY)}  ` +
        `${padR(roleLabel, COL_LABEL)}  ` +
        `${statusColor}${padR(statusText, COL_STATUS)}${ANSI.reset}  ` +
        `${padR(pageCount > 0 ? String(pageCount) : (status === "ok" ? "0" : "-"), COL_PAGES)}\n`
      );
    }

    process.stdout.write(`${ANSI.gray}${divider}${ANSI.reset}\n`);
    process.stdout.write(
      `${ANSI.bold}` +
      `Total: ${results.size}  ` +
      `${ANSI.green}ok: ${countOk}${ANSI.reset}${ANSI.bold}  ` +
      `${ANSI.red}failed: ${countFailed}${ANSI.reset}${ANSI.bold}  ` +
      `${ANSI.yellow}skipped: ${countSkipped}${ANSI.reset}\n`
    );
    process.stdout.write(
      `${ANSI.cyan}================================================================${ANSI.reset}\n\n`
    );

    // ---- Exit code logic ----------------------------------------------------
    // Exit 0 unless every role failed (skipped-no-auth is NOT a failure for this purpose)
    const totalActionable = countOk + countFailed; // skipped roles are excluded
    if (totalActionable > 0 && countFailed === totalActionable) {
      // Every role that was attempted failed
      log.error("All crawled roles failed. Exiting with code 1.");
      process.exit(1);
    }

    if (countOk === 0 && countFailed === 0 && countSkipped > 0) {
      // All roles were skipped (no auth state files)
      log.warn(
        "All roles were skipped because no auth-state files exist. " +
        "Run authenticate.js for each role before crawling."
      );
      // Still exit 0 — not a crawler error, just no credentials set up yet
      process.exit(0);
    }

    process.exit(0);
  })();
}

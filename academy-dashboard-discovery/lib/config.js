"use strict";

/**
 * lib/config.js
 * -----------------------------------------------------------------------------
 * Central configuration for the Academy Dashboard Discovery Crawler.
 *
 * Responsibilities (one place, one source of truth):
 *   - Resolve the project root / output dir.
 *   - Load environment variables from `.env.crawler` (never hardcode secrets).
 *   - Expose the global crawler config derived from the environment.
 *   - Load and resolve role definitions from `roles.config.json`.
 *
 * SECURITY: credentials come ONLY from `.env.crawler`. This module never logs
 * a password and never embeds one in any returned string representation.
 */

const fs = require("fs");
const path = require("path");

// The project root is the parent of this `lib/` folder.
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "output");
const ENV_FILE = path.join(PROJECT_ROOT, ".env.crawler");
const ROLES_FILE = path.join(PROJECT_ROOT, "roles.config.json");

let _envLoaded = false;

/**
 * Load environment variables from `.env.crawler` into process.env.
 * Idempotent and safe to call when the file is absent (returns gracefully).
 *
 * @returns {{ loaded: boolean, path: string, error?: string }}
 */
function loadEnv() {
  if (_envLoaded) {
    return { loaded: true, path: ENV_FILE };
  }

  if (!fs.existsSync(ENV_FILE)) {
    // Not fatal here — entry scripts decide whether missing creds are fatal.
    return {
      loaded: false,
      path: ENV_FILE,
      error: ".env.crawler not found (copy .env.crawler.example to .env.crawler)",
    };
  }

  let dotenv;
  try {
    dotenv = require("dotenv");
  } catch (err) {
    return {
      loaded: false,
      path: ENV_FILE,
      error: "dotenv is not installed — run `npm install`",
    };
  }

  const result = dotenv.config({ path: ENV_FILE });
  _envLoaded = !result.error;
  return {
    loaded: _envLoaded,
    path: ENV_FILE,
    error: result.error ? result.error.message : undefined,
  };
}

/**
 * Parse an integer environment variable with a fallback default.
 *
 * @param {string} name
 * @param {number} fallback
 * @returns {number}
 */
function envInt(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === null || String(raw).trim() === "") {
    return fallback;
  }
  const parsed = parseInt(String(raw).trim(), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * The global crawler configuration, derived from the environment.
 *
 * Defaults mirror `.env.crawler.example`. Note the headed-by-default behavior:
 * `CRAWLER_HEADLESS=false` (the default) means a visible browser window.
 *
 * @returns {object}
 */
function getGlobalConfig() {
  const baseUrl = (process.env.ACADEMY_BASE_URL || "https://academatic.online").replace(/\/+$/, "");
  const loginUrl = process.env.ACADEMY_LOGIN_URL || `${baseUrl}/login`;
  const adminStartUrl = process.env.ACADEMY_ADMIN_START_URL || `${baseUrl}/management/home`;

  return {
    baseUrl,
    loginUrl,
    adminStartUrl,
    // Default headed: only headless when explicitly set to the string "true".
    headless: process.env.CRAWLER_HEADLESS === "true",
    // Default slow/calm: only disabled when explicitly set to "false".
    slowMode: process.env.CRAWLER_SLOW_MODE !== "false",
    pageDelayMs: envInt("CRAWLER_PAGE_DELAY_MS", 2500),
    clickDelayMs: envInt("CRAWLER_CLICK_DELAY_MS", 1200),
    maxPagesPerRole: envInt("CRAWLER_MAX_PAGES_PER_ROLE", 300),
    maxSafeClicksPerPage: envInt("CRAWLER_MAX_SAFE_CLICKS_PER_PAGE", 120),
    retryFailedPages: process.env.CRAWLER_RETRY_FAILED_PAGES !== "false",
    viewport: { width: 1440, height: 900 },
  };
}

/**
 * Read and parse `roles.config.json`.
 *
 * @returns {Array<object>} the raw `roles` array (never undefined).
 * @throws {Error} if the file is missing or invalid (callers may catch).
 */
function loadRoles() {
  if (!fs.existsSync(ROLES_FILE)) {
    throw new Error(`roles.config.json not found at ${ROLES_FILE}`);
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(ROLES_FILE, "utf8"));
  } catch (err) {
    throw new Error(`roles.config.json is not valid JSON: ${err.message}`);
  }
  const roles = parsed && Array.isArray(parsed.roles) ? parsed.roles : [];
  return roles;
}

/**
 * Resolve an absolute path from a possibly-relative path under PROJECT_ROOT.
 *
 * @param {string} p
 * @returns {string}
 */
function absUnderRoot(p) {
  if (!p) return p;
  return path.isAbsolute(p) ? p : path.join(PROJECT_ROOT, p);
}

/**
 * Resolve a fully-usable role object for the given role key.
 *
 * Credentials are read from the environment (never hardcoded). The returned
 * object intentionally includes `username`/`password` so entry scripts can use
 * them, but this module never logs them. `hasCredentials` lets callers decide
 * whether a manual login is required.
 *
 * @param {string} roleKey
 * @returns {object} resolved role
 * @throws {Error} if the role key is unknown.
 */
function getRole(roleKey) {
  const roles = loadRoles();
  const raw = roles.find((r) => r && r.key === roleKey);
  if (!raw) {
    const known = roles.map((r) => r && r.key).filter(Boolean).join(", ") || "(none)";
    throw new Error(`Unknown role "${roleKey}". Known roles: ${known}.`);
  }

  const global = getGlobalConfig();
  const username = raw.usernameEnv ? process.env[raw.usernameEnv] : undefined;
  const password = raw.passwordEnv ? process.env[raw.passwordEnv] : undefined;

  const loginUrl = raw.loginUrl || global.loginUrl;
  const startUrlsRaw =
    Array.isArray(raw.startUrls) && raw.startUrls.length > 0
      ? raw.startUrls
      : [global.adminStartUrl];

  // Resolve start URLs to absolute against the base URL.
  const startUrls = startUrlsRaw
    .map((u) => {
      try {
        return new URL(u, global.baseUrl).toString();
      } catch (err) {
        return null;
      }
    })
    .filter(Boolean);

  return {
    key: raw.key,
    label: raw.label || raw.key,
    usernameEnv: raw.usernameEnv || "",
    passwordEnv: raw.passwordEnv || "",
    username: username || "",
    password: password || "",
    hasCredentials: Boolean(username && password),
    loginUrl,
    startUrls,
    authStateFile: absUnderRoot(raw.authStateFile || `auth-state-${raw.key}.json`),
    outputDir: absUnderRoot(raw.outputDir || path.join("output", "roles", raw.key)),
  };
}

module.exports = {
  PROJECT_ROOT,
  OUTPUT_DIR,
  loadEnv,
  getGlobalConfig,
  loadRoles,
  getRole,
};

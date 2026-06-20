"use strict";

/**
 * lib/logger.js
 * Timestamped, colorized logger (raw ANSI) + redact utility.
 * No external dependencies.
 */

// ---------------------------------------------------------------------------
// ANSI color codes
// ---------------------------------------------------------------------------
const ANSI = {
  reset:   "\x1b[0m",
  cyan:    "\x1b[36m",
  green:   "\x1b[32m",
  yellow:  "\x1b[33m",
  red:     "\x1b[31m",
  gray:    "\x1b[90m",
  magenta: "\x1b[35m",
  bold:    "\x1b[1m",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns the current time as HH:MM:SS.
 * @returns {string}
 */
function timestamp() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

/**
 * Formats extras (non-string values) appended to a log line.
 * @param {any[]} extras
 * @returns {string}
 */
function formatExtras(extras) {
  if (!extras || extras.length === 0) return "";
  return " " + extras
    .map((e) => {
      if (e === null || e === undefined) return String(e);
      if (typeof e === "string") return e;
      try {
        return JSON.stringify(e, null, 2);
      } catch (_) {
        return String(e);
      }
    })
    .join(" ");
}

// ---------------------------------------------------------------------------
// redact
// ---------------------------------------------------------------------------

/**
 * Patterns that indicate a value is likely a secret:
 *   - Long Base64-ish / hex / JWT tokens (>= 20 chars of token-like characters)
 *   - Known secret-looking substrings
 */
const SECRET_PATTERNS = [
  // JWT (three dot-separated base64url segments)
  /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/,
  // Long opaque token / api key (20+ chars, mostly alphanumeric + common token chars)
  /^[A-Za-z0-9\-_+/=]{20,}$/,
  // Hex string (md5, sha1, sha256 hashes, API keys in hex)
  /^[0-9a-fA-F]{16,}$/,
  // Bearer / Basic auth header values
  /^(Bearer|Basic)\s+\S+$/i,
];

/**
 * Masks anything that looks like a secret token, password, or credential.
 * If the value is not a string, it is returned as-is (cast to string first if needed).
 *
 * @param {any} value
 * @returns {string}
 */
function redact(value) {
  if (value === null || value === undefined) return String(value);
  const str = typeof value === "string" ? value : String(value);
  const trimmed = str.trim();
  if (trimmed.length === 0) return str;

  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(trimmed)) {
      return "***";
    }
  }
  return str;
}

// ---------------------------------------------------------------------------
// createLogger
// ---------------------------------------------------------------------------

/**
 * Creates a scoped logger with methods: info, success, warn, error, debug, step.
 * Each method signature: (msg, ...extra)
 *
 * @param {string} [scope] - Optional scope label shown as [scope] prefix.
 * @returns {{ info, success, warn, error, debug, step }}
 */
function createLogger(scope) {
  const scopePrefix = scope ? ` ${ANSI.bold}[${scope}]${ANSI.reset}` : "";

  /**
   * Core print function.
   * @param {string} levelColor  - ANSI color for the level tag
   * @param {string} levelLabel  - Short tag text (INFO, OK, WARN, ERROR, DEBUG, STEP)
   * @param {string} msg
   * @param {any[]}  extras
   * @param {boolean} toStderr   - Write to stderr instead of stdout
   */
  function print(levelColor, levelLabel, msg, extras, toStderr = false) {
    const ts   = `${ANSI.gray}${timestamp()}${ANSI.reset}`;
    const lvl  = `${levelColor}${levelLabel}${ANSI.reset}`;
    const text = `${ts}${scopePrefix} ${lvl} ${msg}${formatExtras(extras)}`;
    if (toStderr) {
      process.stderr.write(text + "\n");
    } else {
      process.stdout.write(text + "\n");
    }
  }

  return {
    /**
     * Informational message (cyan).
     * @param {string} msg
     * @param {...any} extra
     */
    info(msg, ...extra) {
      print(ANSI.cyan, "INFO ", msg, extra);
    },

    /**
     * Success / completion message (green).
     * @param {string} msg
     * @param {...any} extra
     */
    success(msg, ...extra) {
      print(ANSI.green, "OK   ", msg, extra);
    },

    /**
     * Warning message (yellow).
     * @param {string} msg
     * @param {...any} extra
     */
    warn(msg, ...extra) {
      print(ANSI.yellow, "WARN ", msg, extra, false);
    },

    /**
     * Error message (red). If a second argument is an Error, prints its
     * message and then its stack trace on subsequent lines.
     * @param {string} msg
     * @param {Error|any} [err]
     */
    error(msg, err) {
      const ts        = `${ANSI.gray}${timestamp()}${ANSI.reset}`;
      const lvl       = `${ANSI.red}ERROR${ANSI.reset}`;
      const firstLine = `${ts}${scopePrefix} ${lvl} ${msg}`;
      process.stderr.write(firstLine + "\n");

      if (err) {
        if (err instanceof Error) {
          process.stderr.write(`${ANSI.red}  ${err.message}${ANSI.reset}\n`);
          if (err.stack) {
            process.stderr.write(`${ANSI.gray}${err.stack}${ANSI.reset}\n`);
          }
        } else {
          // Non-Error thrown value
          process.stderr.write(
            `${ANSI.red}  ${String(err)}${ANSI.reset}\n`
          );
        }
      }
    },

    /**
     * Debug message (gray). Only emitted when CRAWLER_DEBUG === "true".
     * @param {string} msg
     * @param {...any} extra
     */
    debug(msg, ...extra) {
      if (process.env.CRAWLER_DEBUG !== "true") return;
      print(ANSI.gray, "DEBUG", msg, extra);
    },

    /**
     * Step / progress message (magenta). Useful for marking major crawler phases.
     * @param {string} msg
     * @param {...any} extra
     */
    step(msg, ...extra) {
      print(ANSI.magenta, "STEP ", msg, extra);
    },
  };
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
module.exports = { createLogger, redact };

"use strict";

const fs = require("fs");
const path = require("path");

/**
 * Ensures a directory exists (recursive). Returns the directory path.
 * @param {string} dir
 * @returns {string}
 */
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Writes a JSON file, ensuring parent directory exists first.
 * @param {string} file - Absolute path to the file.
 * @param {any} obj - The value to serialize.
 * @param {boolean} [pretty=true] - Whether to pretty-print with 2-space indentation.
 */
function writeJson(file, obj, pretty = true) {
  ensureDir(path.dirname(file));
  const content = pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
  fs.writeFileSync(file, content, "utf8");
}

/**
 * Reads and parses a JSON file. Returns null on ENOENT or parse errors.
 * @param {string} file - Absolute path to the file.
 * @returns {any|null}
 */
function readJson(file) {
  try {
    const content = fs.readFileSync(file, "utf8");
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
}

/**
 * Writes a UTF-8 text file, ensuring parent directory exists first.
 * @param {string} file - Absolute path to the file.
 * @param {string} text - Content to write.
 */
function writeText(file, text) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, text, "utf8");
}

/**
 * Reads a UTF-8 text file. Returns null on ENOENT or read errors.
 * @param {string} file - Absolute path to the file.
 * @returns {string|null}
 */
function readText(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch (err) {
    return null;
  }
}

/**
 * Checks whether a path exists (file or directory).
 * @param {string} p - Absolute path to check.
 * @returns {boolean}
 */
function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Converts a string to a filesystem-safe ASCII slug.
 * Lowercases, strips non-[a-z0-9] to "-", collapses and trims dashes.
 * Falls back to "page" if the result is empty.
 * @param {string} str - Input string (may include unicode/Arabic).
 * @param {number} [maxLen=80] - Maximum slug length.
 * @returns {string}
 */
function slugify(str, maxLen = 80) {
  if (typeof str !== "string") return "page";

  // Normalize unicode: decompose composed characters so accented latin letters
  // decompose to base+diacritic, making the base letter survive the ASCII filter.
  let slug = str
    .normalize("NFD")
    // Keep only ASCII printable range after decomposition; this drops Arabic/CJK/etc.
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase()
    // Replace any character that is not a-z, 0-9 with a hyphen
    .replace(/[^a-z0-9]+/g, "-")
    // Collapse consecutive hyphens
    .replace(/-{2,}/g, "-")
    // Trim leading/trailing hyphens
    .replace(/^-+|-+$/g, "");

  if (!slug) return "page";

  // Truncate to maxLen, then clean any trailing partial hyphen
  if (slug.length > maxLen) {
    slug = slug.slice(0, maxLen).replace(/-+$/, "");
  }

  return slug || "page";
}

/**
 * Lists files non-recursively in a directory. Returns [] if directory is absent.
 * Optionally filters by extension (e.g. ".json").
 * @param {string} dir - Absolute path to directory.
 * @param {string} [ext] - Optional extension filter including the dot.
 * @returns {string[]} - Array of absolute file paths.
 */
function listFiles(dir, ext) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries
      .filter((e) => {
        if (!e.isFile()) return false;
        if (ext && !e.name.endsWith(ext)) return false;
        return true;
      })
      .map((e) => path.join(dir, e.name));
  } catch (_) {
    return [];
  }
}

/**
 * Returns a POSIX-style relative path from `from` to `to`.
 * Backslashes are replaced with forward slashes for cross-platform consistency.
 * @param {string} from - Absolute source path.
 * @param {string} to - Absolute destination path.
 * @returns {string}
 */
function relativePath(from, to) {
  return path.relative(from, to).replace(/\\/g, "/");
}

module.exports = {
  ensureDir,
  writeJson,
  readJson,
  writeText,
  readText,
  exists,
  slugify,
  listFiles,
  relativePath,
};

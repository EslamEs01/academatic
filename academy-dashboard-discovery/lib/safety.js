"use strict";

/**
 * lib/safety.js
 *
 * SAFETY-CRITICAL module for the read-only discovery crawler.
 *
 * Purpose: decide whether a UI control (button/link/etc.) or URL is SAFE to
 * interact with during read-only crawling. A false "safe" classification could
 * mutate live data, so this module is deliberately CONSERVATIVE: when in doubt,
 * classify as UNSAFE.
 *
 * CommonJS only. No external dependencies — pure Node builtins / plain JS.
 */

// ----------------------------------------------------------------------------
// Keyword lists (EXACTLY as specified in the shared contract).
// ----------------------------------------------------------------------------

// English action words that indicate a mutating / destructive / submitting
// control. These are matched on a word-boundary-ish basis against normalized
// text (see containsUnsafe).
const UNSAFE_EN = [
  "logout",
  "log out",
  "sign out",
  "signout",
  "delete",
  "remove",
  "destroy",
  "archive",
  "cancel",
  "pay",
  "payment",
  "checkout",
  "submit",
  "save",
  "send",
  "email",
  "message",
  "confirm",
  "approve",
  "reject",
  "block",
  "suspend",
  "disable",
  "enable",
  "update",
  "edit",
  "create",
  "add",
];

// Arabic action words (same intent as UNSAFE_EN). Matched as normalized
// substrings against normalized Arabic text.
const UNSAFE_AR = [
  "تسجيل خروج",
  "خروج",
  "حذف",
  "مسح",
  "إزالة",
  "أرشفة",
  "إلغاء",
  "دفع",
  "سداد",
  "إرسال",
  "حفظ",
  "تأكيد",
  "موافقة",
  "رفض",
  "تعطيل",
  "تفعيل",
  "تعديل",
  "إنشاء",
  "إضافة",
];

// English hints that a control is SAFE (read-only UI affordances). These are
// informational; they do NOT override an UNSAFE match.
const SAFE_HINTS_EN = [
  "open",
  "view",
  "show",
  "details",
  "detail",
  "more",
  "menu",
  "filter",
  "filters",
  "tab",
  "expand",
  "collapse",
  "preview",
  "info",
  "profile",
  "notifications",
  "search",
  "sort",
  "page",
  "next",
  "prev",
  "previous",
  "accordion",
  "dropdown",
];

// Arabic safe hints.
const SAFE_HINTS_AR = [
  "عرض",
  "تفاصيل",
  "المزيد",
  "قائمة",
  "فلتر",
  "تصفية",
  "بحث",
  "التالي",
  "السابق",
  "ملف",
  "إشعارات",
  "عرض التفاصيل",
  "طي",
  "توسيع",
];

// ----------------------------------------------------------------------------
// Logout / sign-out detection helpers.
// ----------------------------------------------------------------------------

// EN phrases that specifically indicate logging out (category: logout).
const LOGOUT_EN = ["logout", "log out", "sign out", "signout"];

// AR phrases that specifically indicate logging out.
const LOGOUT_AR = ["تسجيل خروج", "خروج"];

// ----------------------------------------------------------------------------
// Arabic character ranges used by normalizeText.
// ----------------------------------------------------------------------------

// Arabic diacritics (tashkeel): U+064B .. U+065F
const ARABIC_DIACRITICS = /[ً-ٟ]/g;
// Tatweel / kashida: U+0640
const ARABIC_TATWEEL = /ـ/g;
// Alef variants: أ (U+0623) إ (U+0625) آ (U+0622) -> ا (U+0627)
const ARABIC_ALEF_VARIANTS = /[أإآ]/g;
// Alef maksura ى (U+0649) -> ya ي (U+064A)
const ARABIC_ALEF_MAKSURA = /ى/g;
// Ta marbuta ة (U+0629) -> ha ه (U+0647)
const ARABIC_TA_MARBUTA = /ة/g;

/**
 * Normalize text for robust safe/unsafe matching.
 *
 * - lowercase + trim + collapse internal whitespace
 * - strip Arabic diacritics (U+064B..U+065F) and tatweel (U+0640)
 * - normalize alef variants (أ إ آ -> ا)
 * - normalize alef maksura (ى -> ي) and ta marbuta (ة -> ه)
 *
 * Returns "" for null/undefined/non-string input.
 *
 * @param {*} str
 * @returns {string}
 */
function normalizeText(str) {
  if (str === null || str === undefined) return "";
  let s = String(str);

  // Arabic normalizations (do these before lowercasing; they don't affect case).
  s = s.replace(ARABIC_DIACRITICS, "");
  s = s.replace(ARABIC_TATWEEL, "");
  s = s.replace(ARABIC_ALEF_VARIANTS, "ا");
  s = s.replace(ARABIC_ALEF_MAKSURA, "ي");
  s = s.replace(ARABIC_TA_MARBUTA, "ه");

  // Lowercase (affects Latin only) and whitespace normalization.
  s = s.toLowerCase();
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

/**
 * Normalize the Arabic-only keyword constants the same way as runtime text so
 * substring matching is apples-to-apples (e.g. "إضافة" -> "اضافه").
 *
 * @param {string} kw
 * @returns {string}
 */
function normalizeKeyword(kw) {
  return normalizeText(kw);
}

// Pre-normalize keyword lists once at module load for efficient matching.
const NORM_UNSAFE_AR = UNSAFE_AR.map(normalizeKeyword).filter(Boolean);
const NORM_LOGOUT_AR = LOGOUT_AR.map(normalizeKeyword).filter(Boolean);

// Escape a string for safe inclusion in a RegExp.
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Build a word-boundary-ish matcher for an English keyword/phrase against
 * normalized text. We avoid \b at non-ASCII edges (Arabic) by anchoring on
 * "not a latin letter/digit" boundaries, which is reliable for English words
 * embedded in mixed-script labels.
 *
 * For phrases containing a space (e.g. "log out", "sign out") we match the
 * phrase with whitespace-flexible separators and the same boundaries.
 *
 * @param {string} keyword normalized english keyword
 * @returns {RegExp}
 */
function buildEnWordRegex(keyword) {
  // Split on spaces and join with a flexible whitespace separator.
  const parts = keyword.split(" ").filter(Boolean).map(escapeRegExp);
  const core = parts.join("\\s+");
  // (?<![a-z0-9]) and (?![a-z0-9]) approximate word boundaries so that
  // "address" does NOT match "add", and "updated" does NOT match a bare match
  // requirement — but note "update" SHOULD still flag "updated"? Per contract,
  // UNSAFE_EN words flag as whole words; "updated" is an inflection of an
  // unsafe action and is safer treated as unsafe. We therefore allow a
  // trailing word-suffix ONLY where it does not create false positives like
  // "add"->"address". To stay conservative we keep strict boundaries here and
  // handle "add" specially (standalone token only). All other unsafe words use
  // strict whole-word boundaries.
  return new RegExp("(?<![a-z0-9])" + core + "(?![a-z0-9])", "i");
}

// Pre-compile EN regexes (excluding "add", which is handled specially).
const EN_KEYWORD_REGEXES = UNSAFE_EN.filter((k) => k !== "add").map((k) => {
  const norm = normalizeKeyword(k);
  return { keyword: k, norm, regex: buildEnWordRegex(norm) };
});

// "add" must only flag when standing alone as an action word — i.e. it appears
// as a standalone token (surrounded by non-letter/digit chars), so "address",
// "added", "ladder", "padding" do NOT match, but "add", "add new", "+ add"
// "add student" DO.
const ADD_REGEX = /(?<![a-z0-9])add(?![a-z0-9])/i;

/**
 * Determine whether the given text contains an UNSAFE action keyword.
 *
 * English keywords use word-boundary matching on normalized text; the bare
 * word "add" only flags as a standalone token. Arabic keywords use normalized
 * substring matching.
 *
 * @param {*} text
 * @returns {{unsafe:boolean, matched:string[]}}
 */
function containsUnsafe(text) {
  const norm = normalizeText(text);
  const matched = [];

  if (!norm) {
    return { unsafe: false, matched: [] };
  }

  // English whole-word matches (excluding "add").
  for (const entry of EN_KEYWORD_REGEXES) {
    if (entry.regex.test(norm)) {
      matched.push(entry.keyword);
    }
  }

  // Special handling for "add" — standalone token only.
  if (ADD_REGEX.test(norm)) {
    matched.push("add");
  }

  // Arabic substring matches on normalized text.
  for (let i = 0; i < NORM_UNSAFE_AR.length; i += 1) {
    const normKw = NORM_UNSAFE_AR[i];
    if (normKw && norm.indexOf(normKw) !== -1) {
      // Push the original (un-normalized) Arabic keyword for readability.
      matched.push(UNSAFE_AR[i]);
    }
  }

  return { unsafe: matched.length > 0, matched };
}

/**
 * Detect logout / sign-out intent in arbitrary text (EN + AR), normalized.
 *
 * @param {*} text
 * @returns {boolean}
 */
function textIsLogout(text) {
  const norm = normalizeText(text);
  if (!norm) return false;

  for (const phrase of LOGOUT_EN) {
    const p = normalizeKeyword(phrase);
    if (!p) continue;
    const parts = p.split(" ").filter(Boolean).map(escapeRegExp).join("\\s+");
    const re = new RegExp("(?<![a-z0-9])" + parts + "(?![a-z0-9])", "i");
    if (re.test(norm)) return true;
  }

  for (const normKw of NORM_LOGOUT_AR) {
    if (normKw && norm.indexOf(normKw) !== -1) return true;
  }

  return false;
}

/**
 * Detect logout / sign-out intent in an href (path or query).
 *
 * @param {string} href
 * @returns {boolean}
 */
function hrefIsLogout(href) {
  if (!href) return false;
  const lower = String(href).toLowerCase();
  return (
    lower.indexOf("logout") !== -1 ||
    lower.indexOf("log-out") !== -1 ||
    lower.indexOf("signout") !== -1 ||
    lower.indexOf("sign-out") !== -1 ||
    lower.indexOf("sign_out") !== -1
  );
}

/**
 * Is the href an internal-looking navigation target (has a real path)?
 * We treat anything that is not empty / "#" / a non-http scheme as a possible
 * navigation. This is only used to choose the "navigation" vs "open_ui"
 * category for SAFE controls.
 *
 * @param {string} href
 * @returns {boolean}
 */
function hrefIsInternalNav(href) {
  if (!href) return false;
  const h = String(href).trim();
  if (!h || h === "#") return false;

  const lower = h.toLowerCase();
  if (lower.startsWith("javascript:")) return false;
  if (lower.startsWith("mailto:")) return false;
  if (lower.startsWith("tel:")) return false;
  // Pure same-page anchor.
  if (h.startsWith("#")) return false;

  return true;
}

/**
 * Classify a single actionable control as safe or unsafe, with a category.
 *
 * Decision order (conservative — first match wins):
 *   1. type === "submit" OR tagName === "form-submit"   -> unsafe, "submit"
 *   2. logout/sign-out via href OR any label            -> unsafe, "logout"
 *   3. any unsafe keyword in any label                  -> unsafe, "mutating"
 *   4. otherwise safe:
 *        - "navigation" if it has an internal-looking href
 *        - else "open_ui"
 *
 * @param {Object} desc
 * @param {string} [desc.text]
 * @param {string} [desc.ariaLabel]
 * @param {string} [desc.title]
 * @param {string} [desc.role]
 * @param {string} [desc.tagName]
 * @param {string} [desc.type]
 * @param {string} [desc.href]
 * @returns {{safe:boolean, reason:string, category:("navigation"|"open_ui"|"mutating"|"logout"|"submit"|"unknown")}}
 */
function classifyAction(desc) {
  const d = desc || {};
  const text = d.text || "";
  const ariaLabel = d.ariaLabel || "";
  const title = d.title || "";
  const href = d.href || "";
  const type = (d.type || "").toString().toLowerCase().trim();
  const tagName = (d.tagName || "").toString().toLowerCase().trim();

  const formMethod = (d.formMethod || "").toString().toLowerCase().trim();

  // 1) Logout / sign-out — via href or any visible/accessible label.
  if (
    hrefIsLogout(href) ||
    textIsLogout(text) ||
    textIsLogout(ariaLabel) ||
    textIsLogout(title)
  ) {
    return {
      safe: false,
      reason: "Logout / sign-out control — would end the session",
      category: "logout",
    };
  }

  // 2) Any unsafe (mutating/destructive) keyword in any label. This runs BEFORE
  //    the submit decision, so a destructive label ("Delete", "حذف") is blocked
  //    regardless of the form method.
  const labelChecks = [text, ariaLabel, title];
  const allMatched = [];
  for (const label of labelChecks) {
    const res = containsUnsafe(label);
    if (res.unsafe) {
      for (const m of res.matched) {
        if (allMatched.indexOf(m) === -1) allMatched.push(m);
      }
    }
  }
  if (allMatched.length > 0) {
    return {
      safe: false,
      reason: "Mutating keyword(s) detected: " + allMatched.join(", "),
      category: "mutating",
    };
  }

  // 3) The navigation target itself implies a mutating/destructive action
  //    (e.g. /students/5/delete, ?action=archive) even when the label looks
  //    innocent ("View"/"عرض"). Closes the GET-mutation hole.
  if (isUnsafeUrl(href)) {
    return {
      safe: false,
      reason: "Navigation target looks mutating/destructive: " + href,
      category: "mutating",
    };
  }

  // 4) Submit determination. A submit control (explicit type=submit, or a
  //    default-submit <button> inside a form) is UNSAFE unless its enclosing
  //    form uses GET — a GET submit is a read-only search/filter/pagination/tab
  //    that mutates nothing and is valuable to explore. POST or unknown method
  //    stays unsafe (conservative). The label keyword/URL checks above already
  //    blocked any destructive submit before we get here.
  const isExplicitSubmit = type === "submit" || tagName === "form-submit";
  const isDefaultSubmit =
    tagName === "button" && d.insideForm === true && type !== "button" && type !== "reset";
  if (isExplicitSubmit || isDefaultSubmit) {
    if (formMethod === "get") {
      return {
        safe: true,
        reason: "Submit on a GET form (search/filter/pagination) — no data mutation",
        category: "open_ui",
      };
    }
    return {
      safe: false,
      reason: isExplicitSubmit
        ? "Submit control on a non-GET form — could submit/mutate data"
        : "Default-submit <button> inside a non-GET <form> — could submit/mutate data",
      category: "submit",
    };
  }

  // 5) Safe control. Distinguish navigation vs UI-only affordance.
  if (hrefIsInternalNav(href)) {
    return {
      safe: true,
      reason: "Navigation link with no unsafe signals",
      category: "navigation",
    };
  }

  return {
    safe: true,
    reason: "UI control with no unsafe signals",
    category: "open_ui",
  };
}

// Path segments that imply an IRREVERSIBLE / mutating action when navigated.
// Note: form-display verbs (create/edit/update/add/new) are intentionally NOT
// here — navigating to a form page is read-only and is exactly what we want to
// document; only a submit mutates, and the crawler never submits.
const DESTRUCTIVE_URL_SEGMENTS = [
  "delete",
  "remove",
  "destroy",
  "trash",
  "archive",
  "deactivate",
  "disable",
  "suspend",
  "block",
  "revoke",
  "cancel",
  "pay",
  "checkout",
  "charge",
  "refund",
  "withdraw",
  "logout",
  "signout",
];

// Query values (action=..., _method=..., do=...) that imply a mutating op.
const DESTRUCTIVE_QUERY_VALUES = [
  "delete",
  "del",
  "remove",
  "destroy",
  "archive",
  "cancel",
  "deactivate",
  "disable",
  "suspend",
  "block",
  "pay",
  "refund",
];

// Arabic mutating / session-ending verbs that may appear in a URL slug.
const AR_UNSAFE_URL = [
  "حذف",
  "إزالة",
  "أرشفة",
  "تعطيل",
  "حظر",
  "دفع",
  "سداد",
  "خروج",
  "إلغاء",
  "استرداد",
].map(normalizeText);

/**
 * Does a single path segment represent the given action verb?
 * Matches the bare verb or "verb-..." / "verb_..." (so "/students/5/delete" and
 * "/delete-student" match, but "/deleted-items" and "/cancelled-invoices" do not).
 *
 * @param {string} segment
 * @param {string} verb
 * @returns {boolean}
 */
function segmentMatchesVerb(segment, verb) {
  if (!segment) return false;
  return segment === verb || segment.startsWith(verb + "-") || segment.startsWith(verb + "_");
}

/**
 * Decide whether a URL itself is unsafe to navigate to (its path/query implies
 * a mutating or session-ending action). Conservative but precise: destructive
 * verbs are matched on whole path SEGMENTS to avoid false positives on noun-like
 * pages (e.g. /payments, /cancelled-invoices, /deleted-items).
 *
 * @param {string} url - absolute or relative URL.
 * @returns {boolean}
 */
function isUnsafeUrl(url) {
  if (!url) return false;

  let pathname = "";
  let search = "";
  let raw = String(url);

  try {
    const u = new URL(raw);
    pathname = u.pathname || "";
    search = u.search || "";
  } catch (err) {
    // Relative / malformed — split manually.
    const hashIdx = raw.indexOf("#");
    if (hashIdx !== -1) raw = raw.slice(0, hashIdx);
    const qIdx = raw.indexOf("?");
    if (qIdx !== -1) {
      pathname = raw.slice(0, qIdx);
      search = raw.slice(qIdx);
    } else {
      pathname = raw;
    }
  }

  try {
    pathname = decodeURIComponent(pathname);
  } catch (_) {
    // keep raw pathname on decode error
  }

  const lowerPath = pathname.toLowerCase();
  const lowerAll = (lowerPath + " " + search).toLowerCase();

  // Session-ending — distinctive enough to match as a substring.
  if (
    lowerAll.indexOf("logout") !== -1 ||
    lowerAll.indexOf("log-out") !== -1 ||
    lowerAll.indexOf("signout") !== -1 ||
    lowerAll.indexOf("sign-out") !== -1 ||
    lowerAll.indexOf("sign_out") !== -1
  ) {
    return true;
  }

  // Destructive verbs matched on whole path segments.
  const segments = lowerPath.split("/").filter(Boolean);
  for (const seg of segments) {
    for (const verb of DESTRUCTIVE_URL_SEGMENTS) {
      if (segmentMatchesVerb(seg, verb)) return true;
    }
  }

  // Query action params: ?action=delete, ?_method=DELETE, ?do=remove, ...
  try {
    const sp = new URLSearchParams(search);
    if ((sp.get("_method") || "").toLowerCase() === "delete") return true;
    for (const key of ["action", "_method", "do", "op", "task", "mode"]) {
      const val = (sp.get(key) || "").toLowerCase();
      if (val && DESTRUCTIVE_QUERY_VALUES.indexOf(val) !== -1) return true;
    }
  } catch (_) {
    // ignore malformed query
  }

  // Arabic mutating / session verbs in the (decoded) path, normalized so
  // diacritics/tatweel/alef-forms cannot hide them.
  const normPath = normalizeText(pathname);
  for (const kw of AR_UNSAFE_URL) {
    if (kw && normPath.indexOf(kw) !== -1) return true;
  }

  return false;
}

module.exports = {
  UNSAFE_EN,
  UNSAFE_AR,
  SAFE_HINTS_EN,
  SAFE_HINTS_AR,
  normalizeText,
  containsUnsafe,
  classifyAction,
  isUnsafeUrl,
};

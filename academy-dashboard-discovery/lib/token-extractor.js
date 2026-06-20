"use strict";

/**
 * lib/token-extractor.js
 *
 * Extracts design tokens (colors, fonts, sizes, spacing, radii, shadows, and
 * representative component style snapshots) from a live Playwright page.
 *
 * Strategy:
 *   - A single page.evaluate samples a BOUNDED set of elements:
 *       body, all headings, up to ~80 buttons, ~80 links, ~60 cards,
 *       tables (+ a few cells), ~40 inputs. Hard-capped at ~400 total.
 *   - For each sampled element it reads getComputedStyle and records:
 *       color, backgroundColor, borderColor, fontFamily, fontSize,
 *       fontWeight, borderRadius, boxShadow, padding, margin.
 *   - Frequencies are aggregated in-page and returned to Node, where they are
 *       turned into frequency-sorted [{value,count}] arrays, capped to top ~40,
 *       skipping empty / transparent / none values.
 *   - buttonStyles / cardStyles / tableStyles = up to ~12 representative
 *       computed-style snapshots each.
 *
 * Pure, bounded, never throws: any failure yields an empty-but-shaped result.
 *
 * Contract:
 *   module.exports = { extractDesignTokens }
 *   async extractDesignTokens(page) -> {
 *     textColors, backgroundColors, borderColors, fonts, fontSizes,
 *     fontWeights, borderRadius, shadows, spacing, buttonStyles,
 *     cardStyles, tableStyles
 *   }
 */

// ---- Tuning constants (bounded sampling) ----------------------------------

const CAP_BUTTONS = 80;
const CAP_LINKS = 80;
const CAP_CARDS = 60;
const CAP_INPUTS = 40;
const CAP_TABLE_CELLS = 40;
const CAP_TOTAL = 400; // hard cap across all sampled elements

const CAP_VALUES = 40; // top-N for each frequency list
const CAP_SNAPSHOTS = 12; // representative component snapshots per group

/**
 * Returns an empty result shaped exactly per contract. Used as a safe fallback.
 * @returns {object}
 */
function emptyTokens() {
  return {
    textColors: [],
    backgroundColors: [],
    borderColors: [],
    fonts: [],
    fontSizes: [],
    fontWeights: [],
    borderRadius: [],
    shadows: [],
    spacing: [],
    buttonStyles: [],
    cardStyles: [],
    tableStyles: [],
  };
}

/**
 * Decide whether a raw computed value is meaningful enough to record.
 * Skips empty / transparent / "none" / fully-transparent rgba values.
 * @param {string} value
 * @returns {boolean}
 */
function isMeaningful(value) {
  if (value === null || value === undefined) return false;
  const v = String(value).trim().toLowerCase();
  if (v === "") return false;
  if (v === "none") return false;
  if (v === "normal") return false;
  if (v === "auto") return false;
  if (v === "transparent") return false;
  if (v === "rgba(0, 0, 0, 0)") return false;
  if (v === "rgba(0,0,0,0)") return false;
  // Any rgba with a zero alpha channel is effectively invisible.
  const m = v.match(/^rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)$/);
  if (m && parseFloat(m[1]) === 0) return false;
  // Skip pure-zero sizing values that carry no design signal.
  if (v === "0px" || v === "0" || v === "0px 0px") return false;
  return true;
}

/**
 * Convert a plain frequency map { value: count } into a frequency-sorted
 * [{value,count}] array, filtered to meaningful values and capped to top N.
 * @param {Record<string, number>} freqMap
 * @param {number} cap
 * @returns {{value:string,count:number}[]}
 */
function freqMapToList(freqMap, cap) {
  if (!freqMap || typeof freqMap !== "object") return [];
  const out = [];
  for (const key of Object.keys(freqMap)) {
    if (!isMeaningful(key)) continue;
    const count = freqMap[key];
    if (typeof count !== "number" || count <= 0) continue;
    out.push({ value: key, count });
  }
  out.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
  });
  return out.slice(0, cap);
}

/**
 * Extract design tokens from the page. Never throws.
 * @param {import('playwright').Page} page
 * @returns {Promise<object>}
 */
async function extractDesignTokens(page) {
  let raw;
  try {
    raw = await page.evaluate(
      ({ capButtons, capLinks, capCards, capInputs, capTableCells, capTotal, capSnapshots }) => {
        // --- in-page only: no Node modules available here ---

        /** Safe getComputedStyle wrapper. */
        function gcs(el) {
          try {
            return window.getComputedStyle(el);
          } catch (_e) {
            return null;
          }
        }

        /** Accumulators (plain objects: value -> count). */
        const acc = {
          textColors: Object.create(null),
          backgroundColors: Object.create(null),
          borderColors: Object.create(null),
          fonts: Object.create(null),
          fontSizes: Object.create(null),
          fontWeights: Object.create(null),
          borderRadius: Object.create(null),
          shadows: Object.create(null),
          spacing: Object.create(null),
        };

        function bump(map, value) {
          if (value === null || value === undefined) return;
          const v = String(value).trim();
          if (v === "") return;
          map[v] = (map[v] || 0) + 1;
        }

        /** Record general tokens from one element's computed style. */
        function sampleElement(el) {
          const cs = gcs(el);
          if (!cs) return;
          bump(acc.textColors, cs.color);
          bump(acc.backgroundColors, cs.backgroundColor);
          // borderColor can be a multi-value string; record the top (computed) value.
          bump(acc.borderColors, cs.borderTopColor || cs.borderColor);
          bump(acc.fonts, cs.fontFamily);
          bump(acc.fontSizes, cs.fontSize);
          bump(acc.fontWeights, cs.fontWeight);
          bump(acc.borderRadius, cs.borderTopLeftRadius || cs.borderRadius);
          bump(acc.shadows, cs.boxShadow);
          bump(acc.spacing, cs.padding);
          bump(acc.spacing, cs.margin);
        }

        /** Build a compact representative style snapshot for a component. */
        function snapshot(el) {
          const cs = gcs(el);
          if (!cs) return null;
          return {
            background: cs.backgroundColor || "",
            color: cs.color || "",
            border:
              (cs.borderTopWidth || "") +
              " " +
              (cs.borderTopStyle || "") +
              " " +
              (cs.borderTopColor || ""),
            borderRadius: cs.borderTopLeftRadius || cs.borderRadius || "",
            padding: cs.padding || "",
            fontSize: cs.fontSize || "",
            fontWeight: cs.fontWeight || "",
          };
        }

        /** De-dupe identical snapshot objects by stable JSON key. */
        function pushUniqueSnapshot(list, seen, snap, cap) {
          if (!snap) return;
          if (list.length >= cap) return;
          const key = JSON.stringify(snap);
          if (seen[key]) return;
          seen[key] = true;
          list.push(snap);
        }

        /** Bounded querySelectorAll -> array. */
        function take(selector, limit) {
          let nodes;
          try {
            nodes = document.querySelectorAll(selector);
          } catch (_e) {
            return [];
          }
          const out = [];
          for (let i = 0; i < nodes.length && out.length < limit; i++) {
            out.push(nodes[i]);
          }
          return out;
        }

        let total = 0;
        function budgetLeft() {
          return total < capTotal;
        }

        // --- body (single, high-signal root) ---
        if (document.body) {
          sampleElement(document.body);
          total++;
        }

        // --- headings (all, but bounded by the global total cap) ---
        const headings = take("h1, h2, h3, h4, h5, h6", capTotal);
        for (const h of headings) {
          if (!budgetLeft()) break;
          sampleElement(h);
          total++;
        }

        // --- buttons ---
        const buttonStyles = [];
        const buttonSeen = Object.create(null);
        const buttons = take(
          "button, [role=button], input[type=button], input[type=submit], a[class*=btn], [class*=button]",
          capButtons
        );
        for (const b of buttons) {
          if (!budgetLeft()) break;
          sampleElement(b);
          total++;
          pushUniqueSnapshot(buttonStyles, buttonSeen, snapshot(b), capSnapshots);
        }

        // --- links ---
        const links = take("a[href]", capLinks);
        for (const a of links) {
          if (!budgetLeft()) break;
          sampleElement(a);
          total++;
        }

        // --- cards / widgets / KPIs ---
        const cardStyles = [];
        const cardSeen = Object.create(null);
        const cards = take(
          "[class*=card], [class*=widget], [class*=kpi], [class*=stat], [class*=tile], [class*=metric]",
          capCards
        );
        for (const c of cards) {
          if (!budgetLeft()) break;
          sampleElement(c);
          total++;
          pushUniqueSnapshot(cardStyles, cardSeen, snapshot(c), capSnapshots);
        }

        // --- tables (+ a few cells for representative styling) ---
        const tableStyles = [];
        const tableSeen = Object.create(null);
        const tables = take("table", capSnapshots);
        for (const t of tables) {
          if (!budgetLeft()) break;
          sampleElement(t);
          total++;
          pushUniqueSnapshot(tableStyles, tableSeen, snapshot(t), capSnapshots);
        }
        const cells = take("th, td", capTableCells);
        for (const cell of cells) {
          if (!budgetLeft()) break;
          sampleElement(cell);
          total++;
        }

        // --- inputs / selects / textareas ---
        const inputs = take("input, select, textarea", capInputs);
        for (const inp of inputs) {
          if (!budgetLeft()) break;
          sampleElement(inp);
          total++;
        }

        return {
          acc,
          buttonStyles,
          cardStyles,
          tableStyles,
          sampled: total,
        };
      },
      {
        capButtons: CAP_BUTTONS,
        capLinks: CAP_LINKS,
        capCards: CAP_CARDS,
        capInputs: CAP_INPUTS,
        capTableCells: CAP_TABLE_CELLS,
        capTotal: CAP_TOTAL,
        capSnapshots: CAP_SNAPSHOTS,
      }
    );
  } catch (_err) {
    // Page navigated away, evaluation blocked, etc. Return a safe shape.
    return emptyTokens();
  }

  if (!raw || typeof raw !== "object" || !raw.acc) {
    return emptyTokens();
  }

  const acc = raw.acc || {};

  return {
    textColors: freqMapToList(acc.textColors, CAP_VALUES),
    backgroundColors: freqMapToList(acc.backgroundColors, CAP_VALUES),
    borderColors: freqMapToList(acc.borderColors, CAP_VALUES),
    fonts: freqMapToList(acc.fonts, CAP_VALUES),
    fontSizes: freqMapToList(acc.fontSizes, CAP_VALUES),
    fontWeights: freqMapToList(acc.fontWeights, CAP_VALUES),
    borderRadius: freqMapToList(acc.borderRadius, CAP_VALUES),
    shadows: freqMapToList(acc.shadows, CAP_VALUES),
    spacing: freqMapToList(acc.spacing, CAP_VALUES),
    buttonStyles: Array.isArray(raw.buttonStyles) ? raw.buttonStyles.slice(0, CAP_SNAPSHOTS) : [],
    cardStyles: Array.isArray(raw.cardStyles) ? raw.cardStyles.slice(0, CAP_SNAPSHOTS) : [],
    tableStyles: Array.isArray(raw.tableStyles) ? raw.tableStyles.slice(0, CAP_SNAPSHOTS) : [],
  };
}

module.exports = { extractDesignTokens };

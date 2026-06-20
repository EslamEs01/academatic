"use strict";

/**
 * lib/report-writer.js
 *
 * Writes structured page records and role maps to disk.
 *
 * Exports:
 *   writePageRecord(record, role)     -> void
 *   buildPageMarkdown(record)         -> string
 *   writeRoleMap(role, records, routeGraph, summary) -> void
 *   buildRoleMapMarkdown(role, records, routeGraph, summary) -> string
 */

const path = require("path");
const {
  writeJson,
  writeText,
  ensureDir,
} = require("./fs-utils");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Safely returns an array, defaulting to [] for null/undefined.
 * @param {any} v
 * @returns {Array}
 */
function arr(v) {
  return Array.isArray(v) ? v : [];
}

/**
 * Safely returns a string, defaulting to "" for null/undefined.
 * @param {any} v
 * @returns {string}
 */
function str(v) {
  return typeof v === "string" ? v : (v == null ? "" : String(v));
}

/**
 * Escapes characters that could break Markdown tables or headings.
 * @param {string} text
 * @returns {string}
 */
function mdEscape(text) {
  return str(text).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

/**
 * Formats a relative screenshot path as a Markdown image link, or a
 * placeholder text if the path is absent.
 * @param {string} relPath
 * @param {string} alt
 * @returns {string}
 */
function mdScreenshot(relPath, alt) {
  if (!relPath) return "_no screenshot_";
  return `![${alt || "screenshot"}](${relPath})`;
}

/**
 * Pads a string for use in Markdown table columns.
 * @param {string} text
 * @returns {string}
 */
function col(text) {
  return mdEscape(str(text) || "—");
}

/**
 * Best human-friendly name for a page record. Prefer record.displayName (a
 * meaningful per-page label another engineer derives because the real <title>
 * is always the brand name "afaaqonline"), then title, then slug, then route.
 * displayName may be absent on the current on-disk data but will be present
 * after the next crawl — code defensively.
 * @param {object} record
 * @returns {string}
 */
function preferredName(record) {
  const r = record || {};
  return (
    str(r.displayName) ||
    str(r.title) ||
    str(r.slug) ||
    str(r.normalizedRoute) ||
    str(r.route) ||
    str(r.url) ||
    ""
  );
}

// ---------------------------------------------------------------------------
// buildPageMarkdown
// ---------------------------------------------------------------------------

/**
 * Builds a human-readable Markdown document for a single crawled page record.
 *
 * @param {object} record - Full PageRecord object.
 * @returns {string} - Markdown content.
 */
function buildPageMarkdown(record) {
  if (!record || typeof record !== "object") return "# Error\n\nNo record provided.\n";

  const lines = [];

  // ── Title & Metadata ──────────────────────────────────────────────────────
  const title = preferredName(record) || "Untitled Page";
  lines.push(`# ${title}`);
  lines.push("");
  lines.push("## Metadata");
  lines.push("");
  lines.push(`| Field | Value |`);
  lines.push(`|---|---|`);
  lines.push(`| **URL** | \`${str(record.url)}\` |`);
  lines.push(`| **Normalized Route** | \`${str(record.normalizedRoute)}\` |`);
  lines.push(`| **Slug** | \`${str(record.slug)}\` |`);
  lines.push(`| **Role** | ${col(record.role)} |`);
  lines.push(`| **Discovery Status** | ${col(record.discoveryStatus)} |`);
  lines.push(`| **Lang** | ${col(record.lang)} |`);
  lines.push(`| **Dir** | ${col(record.dir)} |`);
  lines.push(`| **RTL** | ${record.isRTL ? "Yes" : "No"} |`);
  lines.push(`| **Captured At** | ${col(record.capturedAt)} |`);

  if (record.discoveredFrom && typeof record.discoveredFrom === "object") {
    lines.push(`| **Discovered From** | route: \`${str(record.discoveredFrom.route)}\` via \`${str(record.discoveredFrom.via)}\` |`);
  }
  lines.push("");

  // ── Modules ───────────────────────────────────────────────────────────────
  lines.push("## Modules");
  lines.push("");
  const modules = arr(record.modules);
  if (modules.length > 0) {
    modules.forEach((m) => lines.push(`- ${m}`));
  } else {
    lines.push("_None classified_");
  }
  lines.push("");

  // ── Screenshots ───────────────────────────────────────────────────────────
  lines.push("## Screenshots");
  lines.push("");
  const screenshots = record.screenshots || {};
  lines.push(`**Full page:** ${mdScreenshot(screenshots.full, "full page")}`);
  lines.push("");
  const interactionShots = arr(screenshots.interactions);
  if (interactionShots.length > 0) {
    lines.push("**Interaction screenshots:**");
    lines.push("");
    interactionShots.forEach((p, i) => {
      lines.push(`- ${mdScreenshot(p, `interaction ${i + 1}`)}`);
    });
    lines.push("");
  }

  // ── HTML / Text Files ─────────────────────────────────────────────────────
  const html = record.html || {};
  if (html.rawFile || html.sanitizedFile || html.textFile) {
    lines.push("## Captured Files");
    lines.push("");
    if (html.rawFile) lines.push(`- **Raw HTML:** \`${html.rawFile}\``);
    if (html.sanitizedFile) lines.push(`- **Sanitized HTML:** \`${html.sanitizedFile}\``);
    if (html.textFile) lines.push(`- **Text:** \`${html.textFile}\``);
    lines.push("");
  }

  // ── Headings ─────────────────────────────────────────────────────────────
  const headings = arr(record.headings);
  if (headings.length > 0) {
    lines.push("## Headings");
    lines.push("");
    headings.forEach((h) => {
      const level = Number(h.level) || 1;
      const indent = "  ".repeat(Math.max(0, level - 1));
      lines.push(`${indent}- **H${level}:** ${mdEscape(str(h.text))}`);
    });
    lines.push("");
  }

  // ── Breadcrumbs ───────────────────────────────────────────────────────────
  const breadcrumbs = arr(record.breadcrumbs);
  if (breadcrumbs.length > 0) {
    lines.push("## Breadcrumbs");
    lines.push("");
    lines.push(breadcrumbs.map(mdEscape).join(" > "));
    lines.push("");
  }

  // ── Buttons ───────────────────────────────────────────────────────────────
  const buttons = arr(record.buttons);
  if (buttons.length > 0) {
    lines.push("## Buttons");
    lines.push("");
    lines.push("| Text | Tag | Type | Safe | Category | Reason |");
    lines.push("|---|---|---|---|---|---|");
    buttons.forEach((b) => {
      const safety = b.safety || {};
      lines.push(
        `| ${col(b.text || b.ariaLabel || b.title)} | ${col(b.tagName)} | ${col(b.type)} | ${safety.safe ? "✓" : "✗"} | ${col(safety.category)} | ${col(safety.reason)} |`
      );
    });
    lines.push("");
  }

  // ── Forms ─────────────────────────────────────────────────────────────────
  const forms = arr(record.forms);
  if (forms.length > 0) {
    lines.push("## Forms");
    lines.push("");
    forms.forEach((form, i) => {
      lines.push(`### Form ${i + 1}`);
      lines.push("");
      lines.push(`- **Action:** \`${str(form.action)}\``);
      lines.push(`- **Method:** \`${str(form.method)}\``);
      if (str(form.id)) lines.push(`- **ID:** \`${str(form.id)}\``);
      if (str(form.name)) lines.push(`- **Name:** \`${str(form.name)}\``);
      lines.push("");
      const fields = arr(form.fields);
      if (fields.length > 0) {
        lines.push("**Fields:**");
        lines.push("");
        lines.push("| Tag | Type | Name | Label | Placeholder | Required |");
        lines.push("|---|---|---|---|---|---|");
        fields.forEach((f) => {
          lines.push(
            `| ${col(f.tag)} | ${col(f.type)} | ${col(f.name)} | ${col(f.label)} | ${col(f.placeholder)} | ${f.required ? "Yes" : "No"} |`
          );
        });
        lines.push("");
      }
      const submitBtns = arr(form.submitButtons);
      if (submitBtns.length > 0) {
        lines.push(`**Submit buttons:** ${submitBtns.map(mdEscape).join(", ")}`);
        lines.push("");
      }
    });
  }

  // ── Tables ────────────────────────────────────────────────────────────────
  const tables = arr(record.tables);
  if (tables.length > 0) {
    lines.push("## Tables");
    lines.push("");
    tables.forEach((t, i) => {
      lines.push(`### Table ${i + 1}${t.caption ? `: ${mdEscape(t.caption)}` : ""}`);
      lines.push("");
      lines.push(`- **Columns (${t.columnCount || 0}):** ${arr(t.headers).map(mdEscape).join(", ") || "_none_"}`);
      lines.push(`- **Rows:** ${t.rowCount || 0} total`);
      const sample = arr(t.sampleRows);
      if (sample.length > 0) {
        lines.push("");
        lines.push("**Sample rows (up to 5):**");
        lines.push("");
        const headers = arr(t.headers);
        if (headers.length > 0) {
          lines.push(`| ${headers.map(col).join(" | ")} |`);
          lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
        }
        sample.forEach((row) => {
          lines.push(`| ${arr(row).map(col).join(" | ")} |`);
        });
      }
      lines.push("");
    });
  }

  // ── Cards / KPIs ──────────────────────────────────────────────────────────
  const cards = arr(record.cards);
  if (cards.length > 0) {
    lines.push("## Cards / KPIs");
    lines.push("");
    lines.push("| Title | Value | Text |");
    lines.push("|---|---|---|");
    cards.forEach((c) => {
      lines.push(`| ${col(c.title)} | ${col(c.value)} | ${col(c.text)} |`);
    });
    lines.push("");
  }

  // ── Badges ────────────────────────────────────────────────────────────────
  const badges = arr(record.badges);
  if (badges.length > 0) {
    lines.push("## Badges / Status Tags");
    lines.push("");
    badges.forEach((b) => lines.push(`- ${mdEscape(str(b))}`));
    lines.push("");
  }

  // ── Filters ───────────────────────────────────────────────────────────────
  const filters = arr(record.filters);
  if (filters.length > 0) {
    lines.push("## Filters");
    lines.push("");
    lines.push("| Type | Label | Name |");
    lines.push("|---|---|---|");
    filters.forEach((f) => {
      lines.push(`| ${col(f.type)} | ${col(f.label)} | ${col(f.name)} |`);
    });
    lines.push("");
  }

  // ── Tabs ──────────────────────────────────────────────────────────────────
  const tabs = arr(record.tabs);
  if (tabs.length > 0) {
    lines.push("## Tabs");
    lines.push("");
    lines.push("| Text | Selected | Href |");
    lines.push("|---|---|---|");
    tabs.forEach((t) => {
      lines.push(`| ${col(t.text)} | ${t.selected ? "Yes" : "No"} | ${col(t.href)} |`);
    });
    lines.push("");
  }

  // ── Modals ────────────────────────────────────────────────────────────────
  const modals = arr(record.modals);
  if (modals.length > 0) {
    lines.push("## Modals / Dialogs");
    lines.push("");
    modals.forEach((m, i) => {
      lines.push(`### Modal ${i + 1}${m.title ? `: ${mdEscape(m.title)}` : ""}`);
      lines.push("");
      if (m.triggerText) lines.push(`- **Triggered by:** ${mdEscape(m.triggerText)}`);
      const mButtons = arr(m.buttons);
      if (mButtons.length > 0) lines.push(`- **Buttons:** ${mButtons.map(mdEscape).join(", ")}`);
      const mFields = arr(m.fields);
      if (mFields.length > 0) lines.push(`- **Fields:** ${mFields.map(mdEscape).join(", ")}`);
      if (m.text) {
        lines.push(`- **Content preview:** ${mdEscape(m.text.slice(0, 200))}${m.text.length > 200 ? "…" : ""}`);
      }
      if (m.screenshot) lines.push(`- **Screenshot:** ${mdScreenshot(m.screenshot, `modal ${i + 1}`)}`);
      lines.push("");
    });
  }

  // ── Interactions ──────────────────────────────────────────────────────────
  const interactions = arr(record.interactions);
  if (interactions.length > 0) {
    lines.push("## Interactions");
    lines.push("");
    lines.push("| # | Type | Trigger | Before URL | After URL | Screenshot |");
    lines.push("|---|---|---|---|---|---|");
    interactions.forEach((ix) => {
      const beforeUrl = str(ix.beforeUrl);
      const afterUrl = str(ix.afterUrl);
      const shot = ix.screenshot ? `[screenshot](${ix.screenshot})` : "—";
      lines.push(
        `| ${ix.index ?? "—"} | ${col(ix.type)} | ${col(ix.triggerText)} | ${col(beforeUrl)} | ${col(afterUrl)} | ${shot} |`
      );
    });
    lines.push("");
  }

  // ── Safe Skipped ──────────────────────────────────────────────────────────
  const safeSkipped = arr(record.safeSkipped);
  if (safeSkipped.length > 0) {
    lines.push("## Safe-Skipped Interactions");
    lines.push("");
    lines.push("| Text | Reason |");
    lines.push("|---|---|");
    safeSkipped.forEach((s) => {
      lines.push(`| ${col(s.text)} | ${col(s.reason)} |`);
    });
    lines.push("");
  }

  // ── Unsafe Skipped ────────────────────────────────────────────────────────
  const unsafeSkipped = arr(record.unsafeSkipped);
  if (unsafeSkipped.length > 0) {
    lines.push("## Unsafe-Skipped Interactions");
    lines.push("");
    lines.push("| Text | Category | Reason |");
    lines.push("|---|---|---|");
    unsafeSkipped.forEach((u) => {
      lines.push(`| ${col(u.text)} | ${col(u.category)} | ${col(u.reason)} |`);
    });
    lines.push("");
  }

  // ── Failed ────────────────────────────────────────────────────────────────
  const failed = arr(record.failed);
  if (failed.length > 0) {
    lines.push("## Failed Interactions");
    lines.push("");
    lines.push("| Text | Error |");
    lines.push("|---|---|");
    failed.forEach((f) => {
      lines.push(`| ${col(f.text)} | ${col(f.error)} |`);
    });
    lines.push("");
  }

  // ── Discovered Links ──────────────────────────────────────────────────────
  const internalLinks = arr(record.internalLinks);
  const externalLinks = arr(record.externalLinks);
  const paginationLinks = arr(record.paginationLinks);

  if (internalLinks.length > 0 || externalLinks.length > 0 || paginationLinks.length > 0) {
    lines.push("## Discovered Links");
    lines.push("");

    if (internalLinks.length > 0) {
      lines.push(`### Internal Links (${internalLinks.length})`);
      lines.push("");
      lines.push("| Text | Href | Area |");
      lines.push("|---|---|---|");
      internalLinks.slice(0, 50).forEach((l) => {
        lines.push(`| ${col(l.text)} | \`${col(l.href)}\` | ${col(l.area)} |`);
      });
      if (internalLinks.length > 50) {
        lines.push(`| _…and ${internalLinks.length - 50} more_ | | |`);
      }
      lines.push("");
    }

    if (externalLinks.length > 0) {
      lines.push(`### External Links (${externalLinks.length})`);
      lines.push("");
      lines.push("| Text | Href |");
      lines.push("|---|---|");
      externalLinks.slice(0, 20).forEach((l) => {
        lines.push(`| ${col(l.text)} | \`${col(l.href)}\` |`);
      });
      if (externalLinks.length > 20) {
        lines.push(`| _…and ${externalLinks.length - 20} more_ | |`);
      }
      lines.push("");
    }

    if (paginationLinks.length > 0) {
      lines.push(`### Pagination Links (${paginationLinks.length})`);
      lines.push("");
      paginationLinks.forEach((l) => {
        lines.push(`- ${mdEscape(l.text || l.href)}: \`${str(l.href)}\``);
      });
      lines.push("");
    }
  }

  // ── Sidebar / Header / Footer Links ──────────────────────────────────────
  const sidebarLinks = arr(record.sidebarLinks);
  if (sidebarLinks.length > 0) {
    lines.push(`### Sidebar Links (${sidebarLinks.length})`);
    lines.push("");
    sidebarLinks.slice(0, 40).forEach((l) => {
      const internal = l.internal ? "internal" : "external";
      lines.push(`- [${mdEscape(l.text)}](${str(l.href)}) _(${internal})_`);
    });
    if (sidebarLinks.length > 40) lines.push(`- _…and ${sidebarLinks.length - 40} more_`);
    lines.push("");
  }

  // ── Network Endpoints ─────────────────────────────────────────────────────
  const network = record.network || {};
  const endpoints = arr(network.endpoints);
  if (endpoints.length > 0) {
    lines.push("## Network Endpoints");
    lines.push("");
    lines.push(`_${endpoints.length} request(s) captured_`);
    lines.push("");
    lines.push("| Method | Resource Type | Status | URL |");
    lines.push("|---|---|---|---|");
    endpoints.slice(0, 30).forEach((e) => {
      lines.push(`| ${col(e.method)} | ${col(e.resourceType)} | ${col(e.status)} | \`${col(e.url)}\` |`);
    });
    if (endpoints.length > 30) {
      lines.push(`| _…and ${endpoints.length - 30} more_ | | | |`);
    }
    lines.push("");
  }

  // ── DOM Summary ───────────────────────────────────────────────────────────
  const domSummary = record.domSummary || {};
  const counts = domSummary.counts || {};
  const topTags = arr(domSummary.topTags);
  if (Object.keys(counts).length > 0 || topTags.length > 0) {
    lines.push("## DOM Summary");
    lines.push("");
    if (Object.keys(counts).length > 0) {
      lines.push("**Element counts:**");
      lines.push("");
      Object.entries(counts).forEach(([k, v]) => {
        lines.push(`- **${k}:** ${v}`);
      });
      lines.push("");
    }
    if (topTags.length > 0) {
      lines.push("**Top HTML tags:**");
      lines.push("");
      lines.push("| Tag | Count |");
      lines.push("|---|---|");
      topTags.forEach((t) => {
        lines.push(`| \`${col(t.tag)}\` | ${t.count} |`);
      });
      lines.push("");
    }
  }

  // ── Design Tokens (summary) ───────────────────────────────────────────────
  const dt = record.designTokens;
  if (dt && typeof dt === "object") {
    lines.push("## Design Tokens (summary)");
    lines.push("");
    const tokenSections = [
      ["Text Colors", arr(dt.textColors)],
      ["Background Colors", arr(dt.backgroundColors)],
      ["Border Colors", arr(dt.borderColors)],
      ["Fonts", arr(dt.fonts)],
      ["Font Sizes", arr(dt.fontSizes)],
      ["Font Weights", arr(dt.fontWeights)],
      ["Border Radius", arr(dt.borderRadius)],
    ];
    tokenSections.forEach(([label, items]) => {
      if (items.length > 0) {
        const top5 = items.slice(0, 5).map((t) => `\`${str(t.value)}\` (×${t.count})`).join(", ");
        lines.push(`- **${label}:** ${top5}${items.length > 5 ? ` _+${items.length - 5} more_` : ""}`);
      }
    });
    lines.push("");
  }

  // ── Rebuild Notes ─────────────────────────────────────────────────────────
  lines.push("## Rebuild Notes");
  lines.push("");
  lines.push("_Neutral UX observations derived from the captured record — no proprietary copy._");
  lines.push("");

  // RTL / Language note
  if (record.isRTL) {
    lines.push("- **Layout direction:** RTL (right-to-left). New frontend must apply `dir=\"rtl\"` and use RTL-aware CSS/component library support.");
  } else {
    lines.push(`- **Layout direction:** LTR (lang: \`${str(record.lang) || "unknown"}\`).`);
  }

  // Module classification
  if (modules.length > 0 && modules[0] !== "General / Unknown") {
    lines.push(`- **Primary module(s):** ${modules.join(", ")}. Consider grouping these features into a single route or sub-navigation.`);
  }

  // Interactive elements
  const totalButtons = buttons.length;
  const safeButtons = buttons.filter((b) => b.safety && b.safety.safe).length;
  const mutatingButtons = totalButtons - safeButtons;
  if (totalButtons > 0) {
    lines.push(`- **Buttons:** ${totalButtons} total — ${safeButtons} safe/navigation, ${mutatingButtons} mutating/unsafe. Rebuild should use distinct visual treatments for destructive vs. safe actions.`);
  }

  // Forms
  if (forms.length > 0) {
    const totalFields = forms.reduce((sum, f) => sum + arr(f.fields).length, 0);
    lines.push(`- **Forms:** ${forms.length} form(s) with ${totalFields} field(s) total. Each should be rebuilt with proper validation, ARIA labels, and accessible error messaging.`);
  }

  // Tables
  if (tables.length > 0) {
    const largest = tables.reduce((max, t) => (t.rowCount > max ? t.rowCount : max), 0);
    lines.push(`- **Tables:** ${tables.length} table(s) detected. Largest has ~${largest} rows. Consider virtual scrolling or pagination for large datasets in the rebuild.`);
  }

  // Modals
  if (modals.length > 0) {
    lines.push(`- **Modals / dialogs:** ${modals.length} dialog(s) captured via interaction. Rebuild should use accessible modal patterns (focus trap, Escape to close, ARIA role=dialog).`);
  }

  // Cards/KPIs
  if (cards.length > 0) {
    lines.push(`- **KPI cards / widgets:** ${cards.length} card(s) found. Dashboard-style summary area likely present; consider responsive grid layout.`);
  }

  // Filters
  if (filters.length > 0) {
    lines.push(`- **Filters / search inputs:** ${filters.length} filter control(s). Rebuild should expose server-side filtering capabilities via query params or API calls.`);
  }

  // Tabs
  if (tabs.length > 0) {
    lines.push(`- **Tabs:** ${tabs.length} tab(s) detected. Use ARIA \`role="tablist"\` pattern in rebuild for keyboard navigation.`);
  }

  // Network
  if (endpoints.length > 0) {
    const apiEndpoints = endpoints.filter((e) => e.resourceType === "xhr" || e.resourceType === "fetch");
    if (apiEndpoints.length > 0) {
      lines.push(`- **API calls:** ${apiEndpoints.length} XHR/fetch request(s) observed. These indicate the data contract the new frontend should replicate against the backend API.`);
    }
  }

  // Failed interactions note
  if (failed.length > 0) {
    lines.push(`- **Failed interactions:** ${failed.length} interaction(s) could not be explored due to errors. Manual inspection may be needed.`);
  }

  // Pagination note
  if (paginationLinks.length > 0) {
    lines.push(`- **Pagination:** ${paginationLinks.length} pagination control(s) found. Plan server-side pagination support in the rebuild.`);
  }

  // External links note
  if (externalLinks.length > 0) {
    lines.push(`- **External links:** ${externalLinks.length} external link(s) present. Evaluate which to keep in the new design.`);
  }

  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// writePageRecord
// ---------------------------------------------------------------------------

/**
 * Writes a page record to disk:
 *   - pages/<slug>.json  (full record, pretty-printed)
 *   - pages/<slug>.md    (human-readable markdown via buildPageMarkdown)
 *
 * @param {object} record - Full PageRecord object.
 * @param {object} role   - Resolved role object (must have .outputDir).
 */
function writePageRecord(record, role) {
  if (!record || !role || !role.outputDir) {
    throw new Error("writePageRecord: record and role.outputDir are required.");
  }

  const slug = str(record.slug) || "page";
  const pagesDir = path.join(role.outputDir, "pages");
  ensureDir(pagesDir);

  const jsonFile = path.join(pagesDir, `${slug}.json`);
  const mdFile = path.join(pagesDir, `${slug}.md`);

  writeJson(jsonFile, record, true);
  writeText(mdFile, buildPageMarkdown(record));
}

// ---------------------------------------------------------------------------
// buildRoleMapMarkdown
// ---------------------------------------------------------------------------

/**
 * Builds a Markdown role map document.
 *
 * @param {object} role        - Resolved role object.
 * @param {object[]} records   - Array of page record summary objects.
 * @param {object} routeGraph  - Route graph object (key -> {status, discoveredFrom, ...}).
 * @param {object} summary     - Summary object {totalPages, visitedPages, failedPages, skippedPages, modules:{}, startTime, endTime, durationMs}.
 * @returns {string} - Markdown content.
 */
function buildRoleMapMarkdown(role, records, routeGraph, summary) {
  const lines = [];
  const safeRecords = Array.isArray(records) ? records : [];
  const safeSummary = summary || {};
  const safeGraph = routeGraph || {};
  const safeRole = role || {};

  // ── Header ────────────────────────────────────────────────────────────────
  lines.push(`# Role Map: ${str(safeRole.label) || str(safeRole.key) || "Unknown Role"}`);
  lines.push("");
  lines.push(`**Role key:** \`${str(safeRole.key)}\``);
  if (safeRole.startUrls && safeRole.startUrls.length > 0) {
    lines.push(`**Start URLs:** ${safeRole.startUrls.map((u) => `\`${u}\``).join(", ")}`);
  }
  lines.push("");

  // ── Summary ───────────────────────────────────────────────────────────────
  lines.push("## Crawl Summary");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("|---|---|");
  lines.push(`| **Total pages discovered** | ${safeSummary.totalPages ?? safeRecords.length} |`);
  lines.push(`| **Visited** | ${safeSummary.visitedPages ?? safeRecords.filter((r) => r.discoveryStatus === "visited").length} |`);
  lines.push(`| **Failed** | ${safeSummary.failedPages ?? safeRecords.filter((r) => r.discoveryStatus === "failed_with_error").length} |`);
  lines.push(`| **Skipped** | ${safeSummary.skippedPages ?? safeRecords.filter((r) => (r.discoveryStatus || "").startsWith("skipped")).length} |`);
  if (safeSummary.startTime) lines.push(`| **Start time** | ${col(safeSummary.startTime)} |`);
  if (safeSummary.endTime) lines.push(`| **End time** | ${col(safeSummary.endTime)} |`);
  if (safeSummary.durationMs != null) {
    const secs = Math.round(safeSummary.durationMs / 1000);
    lines.push(`| **Duration** | ${secs}s |`);
  }
  lines.push("");

  // ── Module Coverage ───────────────────────────────────────────────────────
  const moduleMap = safeSummary.modules || {};
  const moduleEntries = Object.entries(moduleMap);
  if (moduleEntries.length > 0) {
    lines.push("## Module Coverage");
    lines.push("");
    lines.push("| Module | Pages |");
    lines.push("|---|---|");
    moduleEntries
      .sort((a, b) => b[1] - a[1])
      .forEach(([mod, count]) => {
        lines.push(`| ${col(mod)} | ${count} |`);
      });
    lines.push("");
  } else if (safeRecords.length > 0) {
    // Derive module coverage from records
    const modCounts = {};
    safeRecords.forEach((r) => {
      arr(r.modules).forEach((m) => {
        modCounts[m] = (modCounts[m] || 0) + 1;
      });
    });
    if (Object.keys(modCounts).length > 0) {
      lines.push("## Module Coverage");
      lines.push("");
      lines.push("| Module | Pages |");
      lines.push("|---|---|");
      Object.entries(modCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([mod, count]) => {
          lines.push(`| ${col(mod)} | ${count} |`);
        });
      lines.push("");
    }
  }

  // ── Page Inventory ────────────────────────────────────────────────────────
  lines.push("## Page Inventory");
  lines.push("");

  if (safeRecords.length === 0) {
    lines.push("_No pages recorded._");
    lines.push("");
  } else {
    lines.push("| Slug | Title | Status | Modules | Buttons | Forms | Tables |");
    lines.push("|---|---|---|---|---|---|---|");
    safeRecords.forEach((r) => {
      const mods = arr(r.modules).join(", ") || "—";
      const btnCount = r.counts ? (r.counts.buttons ?? "—") : "—";
      const formCount = r.counts ? (r.counts.forms ?? "—") : "—";
      const tableCount = r.counts ? (r.counts.tables ?? "—") : "—";
      lines.push(
        `| [\`${col(r.slug)}\`](pages/${str(r.slug)}.md) | ${col(preferredName(r))} | ${col(r.discoveryStatus)} | ${col(mods)} | ${btnCount} | ${formCount} | ${tableCount} |`
      );
    });
    lines.push("");
  }

  // ── Route Graph (discovery states) ───────────────────────────────────────
  const graphEntries = Object.entries(safeGraph);
  if (graphEntries.length > 0) {
    lines.push("## Route Graph");
    lines.push("");
    lines.push(`_${graphEntries.length} route(s) in graph_`);
    lines.push("");

    // Group by status
    const byStatus = {};
    graphEntries.forEach(([route, node]) => {
      const status = str(node.status) || "unknown";
      if (!byStatus[status]) byStatus[status] = [];
      byStatus[status].push({ route, node });
    });

    const statusOrder = [
      "visited",
      "duplicate_of_normalized_route",
      "login_redirect",
      "skipped_safe_reason",
      "skipped_unsafe_reason",
      "failed_with_error",
      "external_url",
      "unsupported_file",
    ];

    // Emit in known order, then any remaining statuses
    const emittedStatuses = new Set();
    [...statusOrder, ...Object.keys(byStatus)].forEach((status) => {
      if (emittedStatuses.has(status)) return;
      if (!byStatus[status]) return;
      emittedStatuses.add(status);

      const items = byStatus[status];
      lines.push(`### Status: \`${status}\` (${items.length})`);
      lines.push("");
      items.slice(0, 30).forEach(({ route, node }) => {
        const via = node.discoveredFrom ? ` ← via \`${str(node.discoveredFrom.via)}\` from \`${str(node.discoveredFrom.route)}\`` : "";
        // Surface why a route was not visited: unsafe skips carry `reason`,
        // safe/bounded skips carry `note`. Never hide the cause of a gap.
        const why = str(node.reason) || str(node.note);
        const reasonText =
          status !== "visited" ? ` — ${why || "(reason not recorded)"}` : "";
        lines.push(`- \`${route}\`${reasonText}${via}`);
      });
      if (items.length > 30) {
        lines.push(`- _…and ${items.length - 30} more_`);
      }
      lines.push("");
    });
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// writeRoleMap
// ---------------------------------------------------------------------------

/**
 * Writes role map files to disk:
 *   - role-map.json         (structured summary; compact per-page records)
 *   - role-map.md           (human-readable markdown)
 *   - network/endpoints.json (aggregated network endpoints across all pages)
 *
 * @param {object}   role        - Resolved role object.
 * @param {object[]} records     - Array of FULL PageRecord objects.
 * @param {object}   routeGraph  - Route graph object.
 * @param {object}   summary     - Crawl summary metadata.
 */
function writeRoleMap(role, records, routeGraph, summary) {
  if (!role || !role.outputDir) {
    throw new Error("writeRoleMap: role.outputDir is required.");
  }

  const safeRecords = Array.isArray(records) ? records : [];
  const safeGraph = routeGraph || {};
  const safeSummary = summary || {};

  // Build compact per-page summaries for role-map.json
  const pageSummaries = safeRecords.map((r) => ({
    slug: str(r.slug),
    url: str(r.url),
    route: str(r.normalizedRoute),
    title: str(r.title),
    // Carry displayName through so reports can prefer it over the brand <title>.
    displayName: str(r.displayName),
    modules: arr(r.modules),
    discoveryStatus: str(r.discoveryStatus),
    capturedAt: str(r.capturedAt),
    counts: {
      buttons: arr(r.buttons).length,
      forms: arr(r.forms).length,
      tables: arr(r.tables).length,
      cards: arr(r.cards).length,
      modals: arr(r.modals).length,
      interactions: arr(r.interactions).length,
      internalLinks: arr(r.internalLinks).length,
      externalLinks: arr(r.externalLinks).length,
      networkEndpoints: arr((r.network || {}).endpoints).length,
    },
    screenshots: r.screenshots || {},
    isRTL: Boolean(r.isRTL),
    lang: str(r.lang),
    dir: str(r.dir),
    discoveredFrom: r.discoveredFrom || null,
  }));

  // Derive module coverage for summary if not provided
  let moduleMap = safeSummary.modules || null;
  if (!moduleMap) {
    moduleMap = {};
    safeRecords.forEach((r) => {
      arr(r.modules).forEach((m) => {
        moduleMap[m] = (moduleMap[m] || 0) + 1;
      });
    });
  }

  // Build role-map.json payload
  const roleMapJson = {
    role: {
      key: str(role.key),
      label: str(role.label),
      startUrls: arr(role.startUrls),
      outputDir: str(role.outputDir),
    },
    summary: {
      ...safeSummary,
      modules: moduleMap,
      totalPages: safeSummary.totalPages ?? safeRecords.length,
      visitedPages:
        safeSummary.visitedPages ??
        safeRecords.filter((r) => r.discoveryStatus === "visited").length,
      failedPages:
        safeSummary.failedPages ??
        safeRecords.filter((r) => r.discoveryStatus === "failed_with_error").length,
      skippedPages:
        safeSummary.skippedPages ??
        safeRecords.filter((r) => (r.discoveryStatus || "").startsWith("skipped")).length,
    },
    pages: pageSummaries,
    routeGraph: safeGraph,
  };

  // Write role-map.json
  const roleMapJsonFile = path.join(role.outputDir, "role-map.json");
  writeJson(roleMapJsonFile, roleMapJson, true);

  // Write role-map.md
  const roleMapMdFile = path.join(role.outputDir, "role-map.md");
  writeText(roleMapMdFile, buildRoleMapMarkdown(role, pageSummaries, safeGraph, roleMapJson.summary));

  // Aggregate all network endpoints from all full records
  const allEndpoints = [];
  const seenEndpoints = new Set();
  safeRecords.forEach((r) => {
    const eps = arr((r.network || {}).endpoints);
    eps.forEach((ep) => {
      // Deduplicate by method+url
      const key = `${str(ep.method)}:${str(ep.url)}`;
      if (!seenEndpoints.has(key)) {
        seenEndpoints.add(key);
        allEndpoints.push({
          method: str(ep.method),
          url: str(ep.url),
          resourceType: str(ep.resourceType),
          status: ep.status ?? null,
          observedOnSlug: str(r.slug),
          observedOnUrl: str(r.url),
        });
      }
    });
  });

  const endpointsFile = path.join(role.outputDir, "network", "endpoints.json");
  writeJson(endpointsFile, { role: str(role.key), total: allEndpoints.length, endpoints: allEndpoints }, true);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
module.exports = {
  writePageRecord,
  buildPageMarkdown,
  writeRoleMap,
  buildRoleMapMarkdown,
};

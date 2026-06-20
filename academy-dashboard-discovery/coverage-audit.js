"use strict";

/**
 * coverage-audit.js
 *
 * Cross-role coverage audit & reporting for the academy dashboard discovery
 * crawler. This is a READ-ONLY post-processing step: it consumes the per-role
 * output the crawler has already written (output/roles/<role>/role-map.json +
 * pages/*.json) and produces a suite of combined reports under output/combined/.
 *
 * It never touches the live platform and never mutates any input data. It is
 * deliberately defensive: missing roles, missing files, and absent fields must
 * never crash the audit — they are noted in the reports instead.
 *
 * Entry point:
 *   node coverage-audit.js
 *
 * Outputs (output/combined/):
 *   academy-system-map.json / .md    - master structured system map
 *   page-inventory.md                - every page across roles
 *   route-graph.md                   - per-role route discovery graph
 *   role-permission-matrix.md        - module x role presence + counts
 *   shared-unique-pages.md           - shared/unique + pairwise comparisons
 *   component-inventory.md           - UI component tallies
 *   interaction-inventory.md         - interaction-type tallies
 *   modal-inventory.md               - all captured modals
 *   form-inventory.md                - all forms + fields
 *   table-inventory.md               - all tables + headers
 *   button-coverage.md               - buttons + safety + exercised/skipped
 *   missing-coverage.md              - gaps: unknown/failed/redirect/empty modules
 *   failed-pages.md                  - pages that failed to crawl
 *   skipped-actions.md               - safe + unsafe skipped controls
 *   design-token-summary.md          - aggregate design tokens
 *   llm-context.md                   - compact LLM-ready system overview
 *   speckit-discovery.md             - spec-kit oriented discovery document
 *
 * Module system: CommonJS only.
 */

const path = require("path");

const config = require("./lib/config");
const { createLogger } = require("./lib/logger");
const fsUtils = require("./lib/fs-utils");
const comparator = require("./lib/role-comparator");
const { MODULES } = require("./lib/page-classifier");

const logger = createLogger("coverage-audit");

// ===========================================================================
// Small generic helpers
// ===========================================================================

/**
 * Coerce any value into a non-null array.
 * @param {any} v
 * @returns {any[]}
 */
function asArray(v) {
  return Array.isArray(v) ? v : [];
}

/**
 * Coerce a value to a trimmed string (empty string for null/undefined).
 * @param {any} v
 * @returns {string}
 */
function asStr(v) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

/**
 * Coerce a value to a finite number (0 fallback).
 * @param {any} v
 * @returns {number}
 */
function asNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Escape a string for safe inclusion inside a markdown table cell.
 * Pipes break tables; newlines collapse to spaces.
 * @param {any} v
 * @returns {string}
 */
function mdCell(v) {
  return asStr(v)
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Truncate a string to a maximum length with an ellipsis marker.
 * @param {any} v
 * @param {number} [max=120]
 * @returns {string}
 */
function truncate(v, max = 120) {
  const s = asStr(v);
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}

/**
 * Render a markdown table from a header array and an array of row arrays.
 * Cells are escaped. Returns a string with a trailing blank line.
 * @param {string[]} headers
 * @param {Array<Array<any>>} rows
 * @returns {string}
 */
function mdTable(headers, rows) {
  const head = `| ${headers.map(mdCell).join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows
    .map((r) => `| ${r.map(mdCell).join(" | ")} |`)
    .join("\n");
  return rows.length > 0
    ? `${head}\n${sep}\n${body}\n`
    : `${head}\n${sep}\n`;
}

/**
 * Standard report header block (title + generation metadata).
 * @param {string} title
 * @param {string[]} roleKeys
 * @param {string[]} missingRoles
 * @returns {string}
 */
function reportHeader(title, roleKeys, missingRoles) {
  const lines = [];
  lines.push(`# ${title}`);
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push(
    `Roles with crawled output: ${
      roleKeys.length ? roleKeys.join(", ") : "_none_"
    }`
  );
  if (missingRoles && missingRoles.length) {
    lines.push("");
    lines.push(
      `Roles configured but NOT crawled (no output found): ${missingRoles.join(
        ", "
      )}`
    );
  }
  lines.push("");
  return lines.join("\n");
}

// ===========================================================================
// Record-level accessors (defensive)
// ===========================================================================

/**
 * The route identity of a record (normalizedRoute, fallback url).
 * @param {object} rec
 * @returns {string}
 */
function recRoute(rec) {
  return asStr(rec && rec.normalizedRoute) || asStr(rec && rec.url);
}

/**
 * Human-friendly title for a record. Prefer record.displayName (a meaningful
 * per-page label another engineer derives because the real <title> is always
 * the brand name "afaaqonline"), then record.title, then record.slug, then the
 * route. displayName may be absent on the current on-disk data but will be
 * present after the next crawl — code defensively.
 * @param {object} rec
 * @returns {string}
 */
function recTitle(rec) {
  return (
    asStr(rec && rec.displayName) ||
    asStr(rec && rec.title) ||
    asStr(rec && rec.slug) ||
    recRoute(rec) ||
    "(untitled)"
  );
}

/**
 * Modules array for a record, never empty.
 * @param {object} rec
 * @returns {string[]}
 */
function recModules(rec) {
  const mods = asArray(rec && rec.modules).map(asStr).filter(Boolean);
  return mods.length ? mods : ["General / Unknown"];
}

/**
 * Derive the observed UI language/direction distribution from the actual page
 * records of the given roles, and render it as a single factual sentence.
 *
 * NEVER hardcode "Arabic-first / RTL" (or any locale): the crawled session's
 * locale is whatever the records say. We only count pages that were actually
 * visited (discoveryStatus "visited" or unset) so the statement reflects real
 * captured DOM, not skipped placeholder routes.
 *
 * @param {object} allData
 * @param {string[]} roleKeys
 * @returns {string}
 */
function describeLanguageDirection(allData, roleKeys) {
  const langCounts = {};
  const dirCounts = {};
  let visited = 0;
  for (const key of roleKeys) {
    for (const rec of asArray(allData[key] && allData[key].records)) {
      const status = asStr(rec.discoveryStatus) || "visited";
      if (status !== "visited") continue;
      visited += 1;
      // dir: explicit `dir`, else derived from isRTL, else "(unspecified)".
      const lang = asStr(rec.lang) || "(unspecified)";
      const dir =
        asStr(rec.dir) || (rec.isRTL === true ? "rtl" : rec.isRTL === false ? "ltr" : "(unspecified)");
      langCounts[lang] = (langCounts[lang] || 0) + 1;
      dirCounts[dir] = (dirCounts[dir] || 0) + 1;
    }
  }
  if (visited === 0) {
    return "No visited pages were captured, so UI language/direction cannot be reported.";
  }
  const fmt = (counts) =>
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([v, c]) => `${v} (${c}/${visited} pages)`)
      .join(", ");
  return (
    `Captured UI language: ${fmt(langCounts)}; direction: ${fmt(dirCounts)}. ` +
    "Note: this reflects the crawled session's locale as observed in the page " +
    "DOM, not a fixed product requirement."
  );
}

// ===========================================================================
// Data loading orchestration
// ===========================================================================

/**
 * Determine which configured roles produced output and which did not.
 * @param {string[]} configuredKeys
 * @param {object} allData - result of loadAllRoleData
 * @returns {{ presentKeys: string[], missingKeys: string[] }}
 */
function splitRoles(configuredKeys, allData) {
  const present = [];
  const missing = [];
  for (const key of configuredKeys) {
    if (allData[key] && Array.isArray(allData[key].records)) {
      present.push(key);
    } else {
      missing.push(key);
    }
  }
  return { presentKeys: present, missingKeys: missing };
}

/**
 * Flatten every record across all roles, tagging each with its role key.
 * @param {object} allData
 * @param {string[]} roleKeys
 * @returns {Array<{ roleKey: string, record: object }>}
 */
function flattenRecords(allData, roleKeys) {
  const out = [];
  for (const key of roleKeys) {
    const records = asArray(allData[key] && allData[key].records);
    for (const rec of records) {
      if (rec && typeof rec === "object") out.push({ roleKey: key, record: rec });
    }
  }
  return out;
}

/**
 * Read a role's route graph (route -> { url, status, reason, note,
 * discoveredFrom, ... }) from its loaded role map, normalized into an array of
 * { route, url, status, reason, discoveredFrom }. Returns [] when no graph is
 * present. The reason is taken from the entry's `reason` (unsafe skips) or
 * `note` (safe skips) field, whichever is set — the on-disk schema uses both.
 * @param {object} roleData - one entry of allData (has .roleMap)
 * @returns {Array<{route:string,url:string,status:string,reason:string,discoveredFrom:object|null}>}
 */
function roleRouteGraphEntries(roleData) {
  const roleMap = (roleData && roleData.roleMap) || {};
  const rg = roleMap.routeGraph || roleMap.routes || null;
  if (!rg || typeof rg !== "object") return [];
  const out = [];
  const isArr = Array.isArray(rg);
  for (const [graphKey, info] of Object.entries(rg)) {
    if (!info || typeof info !== "object") continue;
    const route =
      asStr(info.route) ||
      asStr(info.normalizedRoute) ||
      asStr(info.url) ||
      (isArr ? "" : asStr(graphKey));
    out.push({
      route,
      url: asStr(info.url) || route,
      status: asStr(info.status || info.endState) || "unknown",
      // Unsafe skips carry `reason`; safe skips carry `note`. Surface either.
      reason: asStr(info.reason) || asStr(info.note),
      discoveredFrom:
        info.discoveredFrom && typeof info.discoveredFrom === "object"
          ? info.discoveredFrom
          : null,
    });
  }
  return out;
}

// ===========================================================================
// academy-system-map.json + .md
// ===========================================================================

/**
 * Build the master structured system map object.
 * @param {object} ctx - audit context (see runAudit)
 * @returns {object}
 */
function buildSystemMap(ctx) {
  const {
    presentKeys,
    missingKeys,
    allData,
    sharedUnique,
    permissionMatrix,
    componentInventory,
    interactionInventory,
    pairwise,
    globalCfg,
  } = ctx;

  // modules -> pages (route + roles + title), across all roles.
  const modulesToPages = {};
  for (const moduleName of MODULES) modulesToPages[moduleName] = [];
  for (const entry of sharedUnique.routes) {
    for (const moduleName of asArray(entry.modules)) {
      const key = modulesToPages[moduleName] ? moduleName : "General / Unknown";
      modulesToPages[key].push({
        route: entry.route,
        title: entry.title,
        roles: entry.roles,
      });
    }
  }

  // routeGraph per role: route -> { title, status, discoveredFrom, modules }
  const routeGraph = {};
  for (const key of presentKeys) {
    const graph = [];
    for (const rec of asArray(allData[key].records)) {
      graph.push({
        route: recRoute(rec),
        url: asStr(rec.url),
        title: recTitle(rec),
        status: asStr(rec.discoveryStatus) || "visited",
        discoveredFrom: rec.discoveredFrom || null,
        modules: recModules(rec),
      });
    }
    // Also fold in route-graph end-states recorded on the role map, if present.
    const roleMap = allData[key].roleMap || {};
    routeGraph[key] = {
      pages: graph,
      routeGraphFromMap:
        (roleMap && (roleMap.routeGraph || roleMap.routes)) || null,
    };
  }

  // Per-role summary counts.
  const roleSummaries = {};
  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    let buttons = 0;
    let forms = 0;
    let tables = 0;
    let modals = 0;
    let interactions = 0;
    const moduleSet = new Set();
    for (const rec of records) {
      buttons += asArray(rec.buttons).length;
      forms += asArray(rec.forms).length;
      tables += asArray(rec.tables).length;
      modals += asArray(rec.modals).length;
      interactions += asArray(rec.interactions).length;
      for (const m of recModules(rec)) moduleSet.add(m);
    }
    roleSummaries[key] = {
      label: asStr(allData[key].role && allData[key].role.label) || key,
      pages: records.length,
      modules: Array.from(moduleSet).sort(),
      buttons,
      forms,
      tables,
      modals,
      interactions,
      summaryFromMap: allData[key].summary || null,
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    target: {
      baseUrl: globalCfg.baseUrl,
      loginUrl: globalCfg.loginUrl,
      adminStartUrl: globalCfg.adminStartUrl,
    },
    roles: {
      crawled: presentKeys,
      notCrawled: missingKeys,
      summaries: roleSummaries,
    },
    modules: {
      canonical: MODULES.slice(),
      modulesToPages,
    },
    routeGraph,
    sharedUnique,
    permissionMatrix,
    components: componentInventory,
    interactions: interactionInventory,
    comparisons: pairwise,
  };
}

/**
 * Render the system map markdown overview.
 * @param {object} systemMap
 * @param {object} ctx
 * @returns {string}
 */
function renderSystemMapMd(systemMap, ctx) {
  const { presentKeys, missingKeys } = ctx;
  const out = [];
  out.push(reportHeader("Academy System Map", presentKeys, missingKeys));

  out.push("## Target");
  out.push("");
  out.push(`- Base URL: ${systemMap.target.baseUrl}`);
  out.push(`- Login URL: ${systemMap.target.loginUrl}`);
  out.push(`- Admin start URL: ${systemMap.target.adminStartUrl}`);
  out.push("");

  out.push("## Role summaries");
  out.push("");
  const roleRows = presentKeys.map((key) => {
    const s = systemMap.roles.summaries[key];
    return [
      key,
      s.label,
      s.pages,
      s.modules.length,
      s.buttons,
      s.forms,
      s.tables,
      s.modals,
      s.interactions,
    ];
  });
  out.push(
    mdTable(
      [
        "Role",
        "Label",
        "Pages",
        "Modules",
        "Buttons",
        "Forms",
        "Tables",
        "Modals",
        "Interactions",
      ],
      roleRows
    )
  );

  out.push("## Modules → pages (across all roles)");
  out.push("");
  for (const moduleName of MODULES) {
    const pages = asArray(systemMap.modules.modulesToPages[moduleName]);
    if (pages.length === 0) continue;
    out.push(`### ${moduleName} (${pages.length})`);
    out.push("");
    const rows = pages.map((p) => [
      truncate(p.title, 60),
      p.route,
      asArray(p.roles).join(", "),
    ]);
    out.push(mdTable(["Title", "Route", "Roles"], rows));
  }

  // Modules with zero pages.
  const emptyModules = MODULES.filter(
    (m) => asArray(systemMap.modules.modulesToPages[m]).length === 0
  );
  out.push("## Modules with no discovered pages");
  out.push("");
  if (emptyModules.length) {
    for (const m of emptyModules) out.push(`- ${m}`);
  } else {
    out.push("_None — every canonical module had at least one discovered page._");
  }
  out.push("");

  out.push("## Route graph (page counts per role)");
  out.push("");
  const rgRows = presentKeys.map((key) => [
    key,
    asArray(systemMap.routeGraph[key] && systemMap.routeGraph[key].pages).length,
  ]);
  out.push(mdTable(["Role", "Routes"], rgRows));

  out.push(
    "See the companion JSON (academy-system-map.json) for the full structured map, " +
      "and the dedicated inventory reports for component-level detail."
  );
  out.push("");

  return out.join("\n");
}

// ===========================================================================
// page-inventory.md
// ===========================================================================

function renderPageInventory(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Page Inventory", presentKeys, missingKeys));
  out.push(
    "Every page discovered across every crawled role, with component counts."
  );
  out.push("");

  let grandTotal = 0;
  for (const key of presentKeys) {
    const records = asArray(allData[key].records)
      .slice()
      .sort((a, b) => recRoute(a).localeCompare(recRoute(b)));
    grandTotal += records.length;
    out.push(`## Role: ${key} (${records.length} pages)`);
    out.push("");
    const rows = records.map((rec) => [
      truncate(recTitle(rec), 50),
      recRoute(rec),
      recModules(rec).join(", "),
      asStr(rec.discoveryStatus) || "visited",
      asArray(rec.buttons).length,
      asArray(rec.forms).length,
      asArray(rec.tables).length,
      asArray(rec.modals).length,
      asArray(rec.interactions).length,
    ]);
    out.push(
      mdTable(
        [
          "Title",
          "Route",
          "Modules",
          "Status",
          "Btn",
          "Forms",
          "Tbl",
          "Modal",
          "Inter",
        ],
        rows
      )
    );
  }

  out.push(`## Total pages across all roles: ${grandTotal}`);
  out.push("");
  return out.join("\n");
}

// ===========================================================================
// route-graph.md
// ===========================================================================

function renderRouteGraph(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Route Graph", presentKeys, missingKeys));
  out.push(
    "How each route was discovered per role: the parent route and the UI region " +
      "(`via`) that linked to it, plus the discovery end-state."
  );
  out.push("");

  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    out.push(`## Role: ${key}`);
    out.push("");

    // Build parent -> children adjacency from discoveredFrom.
    const children = new Map(); // parentRoute -> [{route,via}]
    const startRoutes = [];
    for (const rec of records) {
      const route = recRoute(rec);
      const from = rec.discoveredFrom || {};
      const parent = asStr(from.route);
      const via = asStr(from.via) || "unknown";
      if (!parent || via === "start") {
        startRoutes.push(route);
      } else {
        if (!children.has(parent)) children.set(parent, []);
        children.get(parent).push({ route, via });
      }
    }

    // Discovery table: route, discovered-from, via, status.
    const rows = records
      .slice()
      .sort((a, b) => recRoute(a).localeCompare(recRoute(b)))
      .map((rec) => {
        const from = rec.discoveredFrom || {};
        return [
          recRoute(rec),
          asStr(from.route) || "(start)",
          asStr(from.via) || "start",
          asStr(rec.discoveryStatus) || "visited",
        ];
      });
    out.push("### Discovery table");
    out.push("");
    out.push(mdTable(["Route", "Discovered from", "Via", "Status"], rows));

    // Parent -> children tree.
    out.push("### Parent → children");
    out.push("");
    if (startRoutes.length) {
      out.push(`Entry / start routes: ${startRoutes.join(", ")}`);
      out.push("");
    }
    const parents = Array.from(children.keys()).sort();
    if (parents.length === 0) {
      out.push("_No parent/child relationships recorded._");
      out.push("");
    } else {
      for (const parent of parents) {
        out.push(`- \`${parent}\``);
        for (const c of children.get(parent)) {
          out.push(`  - → \`${c.route}\` _(via ${c.via})_`);
        }
      }
      out.push("");
    }

    // End-state breakdown from the role map's route graph if available.
    const roleMap = allData[key].roleMap || {};
    const rg = roleMap.routeGraph || roleMap.routes || null;
    if (rg && typeof rg === "object") {
      const states = {};
      const entries = Array.isArray(rg) ? rg : Object.values(rg);
      for (const e of entries) {
        const st = asStr(e && (e.status || e.endState)) || "unknown";
        states[st] = (states[st] || 0) + 1;
      }
      const stateRows = Object.keys(states)
        .sort()
        .map((s) => [s, states[s]]);
      if (stateRows.length) {
        out.push("### Discovery end-states (from role map)");
        out.push("");
        out.push(mdTable(["End-state", "Count"], stateRows));
      }
    }
  }

  return out.join("\n");
}

// ===========================================================================
// role-permission-matrix.md
// ===========================================================================

function renderPermissionMatrix(ctx) {
  const { presentKeys, missingKeys, permissionMatrix } = ctx;
  const out = [];
  out.push(reportHeader("Role × Module Permission Matrix", presentKeys, missingKeys));
  out.push(
    "Presence and component counts per canonical module per role. A module is " +
      "considered *available* to a role when at least one crawled page for that " +
      "role classified into it. Counts are summed across that role's pages in the module."
  );
  out.push("");

  const roles = permissionMatrix.roles;

  // Presence overview: module x role with a check mark.
  out.push("## Presence overview");
  out.push("");
  const presenceRows = MODULES.map((moduleName) => {
    const row = [moduleName];
    for (const key of roles) {
      const cell = permissionMatrix.matrix[moduleName][key];
      row.push(cell.present ? `yes (${cell.pages}p)` : "—");
    }
    return row;
  });
  out.push(mdTable(["Module", ...roles], presenceRows));

  // Detailed counts per module.
  out.push("## Detailed counts");
  out.push("");
  for (const moduleName of MODULES) {
    const anyPresent = roles.some(
      (key) => permissionMatrix.matrix[moduleName][key].present
    );
    if (!anyPresent) continue;
    out.push(`### ${moduleName}`);
    out.push("");
    const rows = roles.map((key) => {
      const c = permissionMatrix.matrix[moduleName][key];
      return [
        key,
        c.present ? "yes" : "no",
        c.pages,
        c.buttons,
        c.forms,
        c.modals,
        c.tables,
      ];
    });
    out.push(
      mdTable(
        ["Role", "Present", "Pages", "Buttons", "Forms", "Modals", "Tables"],
        rows
      )
    );
  }

  // Modules absent for everyone.
  const absentEverywhere = MODULES.filter(
    (m) => !roles.some((key) => permissionMatrix.matrix[m][key].present)
  );
  out.push("## Modules with no pages for any role");
  out.push("");
  if (absentEverywhere.length) {
    for (const m of absentEverywhere) out.push(`- ${m}`);
  } else {
    out.push("_None._");
  }
  out.push("");

  return out.join("\n");
}

// ===========================================================================
// shared-unique-pages.md
// ===========================================================================

function renderSharedUnique(ctx) {
  const { presentKeys, missingKeys, sharedUnique, pairwise, allData } = ctx;
  const out = [];
  out.push(reportHeader("Shared & Unique Pages by Role", presentKeys, missingKeys));
  out.push(
    "Which routes are shared across all crawled roles, which are unique to a " +
      "single role, and pairwise comparisons (including same route rendered with " +
      "a different UI per role)."
  );
  out.push("");

  // Shared across all roles.
  out.push(
    `## Routes shared by all crawled roles (${sharedUnique.sharedAll.length})`
  );
  out.push("");
  if (sharedUnique.sharedAll.length) {
    for (const route of sharedUnique.sharedAll) out.push(`- \`${route}\``);
  } else {
    out.push(
      presentKeys.length > 1
        ? "_No route was present for every crawled role._"
        : "_Only one role was crawled, so there is no cross-role sharing to report._"
    );
  }
  out.push("");

  // Unique per role.
  out.push("## Routes unique to a single role");
  out.push("");
  for (const key of presentKeys) {
    const uniq = asArray(sharedUnique.unique[key]);
    out.push(`### ${key} (${uniq.length})`);
    out.push("");
    if (uniq.length) {
      for (const route of uniq) out.push(`- \`${route}\``);
    } else {
      out.push("_No routes unique to this role._");
    }
    out.push("");
  }

  // Route → roles matrix.
  out.push("## Route presence matrix");
  out.push("");
  const matrixRows = sharedUnique.routes.map((entry) => {
    const row = [truncate(entry.title, 40) || "(untitled)", entry.route];
    for (const key of presentKeys) {
      row.push(asArray(entry.roles).includes(key) ? "yes" : "—");
    }
    return row;
  });
  out.push(mdTable(["Title", "Route", ...presentKeys], matrixRows));

  // Pairwise comparisons.
  out.push("## Pairwise comparisons");
  out.push("");
  for (const pair of pairwise) {
    out.push(`### ${pair.a} vs ${pair.b}`);
    out.push("");
    if (!pair.available) {
      out.push(
        `_Skipped: ${
          !ctx.allData[pair.a] ? pair.a + " has no crawled output" : ""
        }${
          !ctx.allData[pair.a] && !ctx.allData[pair.b] ? "; " : ""
        }${!ctx.allData[pair.b] ? pair.b + " has no crawled output" : ""}._`
      );
      out.push("");
      continue;
    }
    const cmp = pair.comparison;
    out.push(`- Shared routes: ${cmp.shared.length}`);
    out.push(`- Only in ${pair.a}: ${cmp.onlyA.length}`);
    out.push(`- Only in ${pair.b}: ${cmp.onlyB.length}`);
    out.push(
      `- Shared routes with a different UI: ${cmp.sameRouteDifferentUI.length}`
    );
    out.push("");

    if (cmp.onlyA.length) {
      out.push(`**Only in ${pair.a}:**`);
      out.push("");
      for (const r of cmp.onlyA) out.push(`- \`${r}\``);
      out.push("");
    }
    if (cmp.onlyB.length) {
      out.push(`**Only in ${pair.b}:**`);
      out.push("");
      for (const r of cmp.onlyB) out.push(`- \`${r}\``);
      out.push("");
    }

    if (cmp.sameRouteDifferentUI.length) {
      out.push("**Same route, different UI:**");
      out.push("");
      const rows = cmp.sameRouteDifferentUI.map((d) => [
        d.route,
        `${d.differences.buttons.a} / ${d.differences.buttons.b}`,
        `${d.differences.forms.a} / ${d.differences.forms.b}`,
        `${d.differences.tables.a} / ${d.differences.tables.b}`,
        `${d.differences.modals.a} / ${d.differences.modals.b}`,
      ]);
      out.push(
        mdTable(
          [
            "Route",
            `Buttons (${pair.a}/${pair.b})`,
            `Forms (${pair.a}/${pair.b})`,
            `Tables (${pair.a}/${pair.b})`,
            `Modals (${pair.a}/${pair.b})`,
          ],
          rows
        )
      );

      // Button-level detail where it exists.
      const withBtnDetail = cmp.sameRouteDifferentUI.filter(
        (d) =>
          d.differences.buttons.onlyA.length ||
          d.differences.buttons.onlyB.length
      );
      if (withBtnDetail.length) {
        out.push("Button differences by route:");
        out.push("");
        for (const d of withBtnDetail) {
          out.push(`- \`${d.route}\``);
          if (d.differences.buttons.onlyA.length) {
            out.push(
              `  - only ${pair.a}: ${d.differences.buttons.onlyA
                .map((x) => `"${truncate(x, 30)}"`)
                .join(", ")}`
            );
          }
          if (d.differences.buttons.onlyB.length) {
            out.push(
              `  - only ${pair.b}: ${d.differences.buttons.onlyB
                .map((x) => `"${truncate(x, 30)}"`)
                .join(", ")}`
            );
          }
        }
        out.push("");
      }
    }
  }

  return out.join("\n");
}

// ===========================================================================
// component-inventory.md
// ===========================================================================

function renderComponentInventory(ctx) {
  const { presentKeys, missingKeys, componentInventory } = ctx;
  const out = [];
  out.push(reportHeader("Component Inventory", presentKeys, missingKeys));
  out.push(
    `UI component tallies across ${componentInventory.pagesScanned} scanned pages.`
  );
  out.push("");

  out.push("## Global totals");
  out.push("");
  const totalRows = componentInventory.componentTypes.map((type) => [
    type,
    asNum(componentInventory.totals[type]),
  ]);
  out.push(mdTable(["Component", "Total"], totalRows));

  out.push("## Per-role breakdown");
  out.push("");
  const headers = ["Component", ...presentKeys];
  const rows = componentInventory.componentTypes.map((type) => {
    const row = [type];
    for (const key of presentKeys) {
      const roleCounts = componentInventory.perRole[key] || {};
      row.push(asNum(roleCounts[type]));
    }
    return row;
  });
  out.push(mdTable(headers, rows));

  return out.join("\n");
}

// ===========================================================================
// interaction-inventory.md
// ===========================================================================

function renderInteractionInventory(ctx) {
  const { presentKeys, missingKeys, interactionInventory } = ctx;
  const out = [];
  out.push(reportHeader("Interaction Inventory", presentKeys, missingKeys));
  out.push(
    "Tally of safe interactions that the crawler actually exercised, by result type."
  );
  out.push("");

  out.push("## Aggregate");
  out.push("");
  out.push(`- Modals captured: ${interactionInventory.modalsCaptured}`);
  out.push(`- Safe controls skipped: ${interactionInventory.safeSkipped}`);
  out.push(`- Unsafe controls skipped: ${interactionInventory.unsafeSkipped}`);
  out.push(`- Failed interactions/pages: ${interactionInventory.failed}`);
  out.push("");

  out.push("## Interaction types (global)");
  out.push("");
  const totalRows = interactionInventory.interactionTypes.map((type) => [
    type,
    asNum(interactionInventory.totals[type]),
  ]);
  if (totalRows.length) {
    out.push(mdTable(["Interaction type", "Count"], totalRows));
  } else {
    out.push("_No interactions were exercised across any role._");
    out.push("");
  }

  out.push("## Per-role breakdown");
  out.push("");
  if (interactionInventory.interactionTypes.length) {
    const headers = ["Interaction type", ...presentKeys];
    const rows = interactionInventory.interactionTypes.map((type) => {
      const row = [type];
      for (const key of presentKeys) {
        const roleCounts = interactionInventory.perRole[key] || {};
        row.push(asNum(roleCounts[type]));
      }
      return row;
    });
    out.push(mdTable(headers, rows));
  } else {
    out.push("_No interactions recorded._");
    out.push("");
  }

  return out.join("\n");
}

// ===========================================================================
// modal-inventory.md
// ===========================================================================

function renderModalInventory(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Modal Inventory", presentKeys, missingKeys));
  out.push("Every modal/dialog/drawer captured during safe interaction exploration.");
  out.push("");

  let total = 0;
  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    const modalEntries = [];
    for (const rec of records) {
      for (const modal of asArray(rec.modals)) {
        if (!modal) continue;
        modalEntries.push({ rec, modal });
      }
    }
    total += modalEntries.length;
    out.push(`## Role: ${key} (${modalEntries.length} modals)`);
    out.push("");
    if (modalEntries.length === 0) {
      out.push("_No modals captured for this role._");
      out.push("");
      continue;
    }
    const rows = modalEntries.map(({ rec, modal }) => [
      truncate(asStr(modal.title) || "(untitled modal)", 40),
      truncate(asStr(modal.triggerText), 30),
      recRoute(rec),
      asArray(modal.buttons).length,
      asArray(modal.fields).length,
      truncate(asArray(modal.buttons).join(", "), 60),
    ]);
    out.push(
      mdTable(
        ["Modal title", "Trigger", "On route", "Btns", "Fields", "Buttons list"],
        rows
      )
    );
  }

  out.push(`## Total modals captured: ${total}`);
  out.push("");
  return out.join("\n");
}

// ===========================================================================
// form-inventory.md
// ===========================================================================

function renderFormInventory(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Form Inventory", presentKeys, missingKeys));
  out.push(
    "Every form discovered, with its fields. Forms were never submitted — this " +
      "is structural documentation only."
  );
  out.push("");

  let total = 0;
  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    out.push(`## Role: ${key}`);
    out.push("");
    let roleHasForms = false;
    for (const rec of records) {
      const forms = asArray(rec.forms);
      if (forms.length === 0) continue;
      roleHasForms = true;
      for (let i = 0; i < forms.length; i++) {
        const form = forms[i] || {};
        total += 1;
        const idName =
          asStr(form.id) || asStr(form.name) || `form #${i + 1}`;
        out.push(`### ${idName} — \`${recRoute(rec)}\``);
        out.push("");
        out.push(
          `- Action: \`${asStr(form.action) || "(none)"}\` · Method: ${
            asStr(form.method) || "(none)"
          }`
        );
        const submits = asArray(form.submitButtons).filter(Boolean);
        if (submits.length) {
          out.push(`- Submit buttons: ${submits.map((s) => `"${s}"`).join(", ")}`);
        }
        out.push("");
        const fields = asArray(form.fields);
        if (fields.length) {
          const rows = fields.map((f) => [
            asStr(f.label) || asStr(f.name) || asStr(f.id) || "(unnamed)",
            asStr(f.tag),
            asStr(f.type),
            asStr(f.name),
            asStr(f.required) === "true" || f.required === true ? "yes" : "",
            asArray(f.options).length
              ? `${asArray(f.options).length} options`
              : "",
          ]);
          out.push(
            mdTable(
              ["Label", "Tag", "Type", "Name", "Required", "Options"],
              rows
            )
          );
        } else {
          out.push("_No fields captured for this form._");
          out.push("");
        }
      }
    }
    if (!roleHasForms) {
      out.push("_No forms discovered for this role._");
      out.push("");
    }
  }

  out.push(`## Total forms discovered: ${total}`);
  out.push("");
  return out.join("\n");
}

// ===========================================================================
// table-inventory.md
// ===========================================================================

function renderTableInventory(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Table Inventory", presentKeys, missingKeys));
  out.push(
    "Every data table discovered, with its column headers and row counts. Sample " +
      "rows are stored in the per-page JSON; only structure is summarized here."
  );
  out.push("");

  let total = 0;
  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    out.push(`## Role: ${key}`);
    out.push("");
    let roleHasTables = false;
    for (const rec of records) {
      const tables = asArray(rec.tables);
      if (tables.length === 0) continue;
      roleHasTables = true;
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i] || {};
        total += 1;
        const caption =
          asStr(table.caption) || `table #${i + 1}`;
        out.push(
          `### ${truncate(caption, 60)} — \`${recRoute(rec)}\``
        );
        out.push("");
        out.push(
          `- Rows: ${asNum(table.rowCount)} · Columns: ${asNum(
            table.columnCount
          )}`
        );
        const headers = asArray(table.headers).map(asStr).filter(Boolean);
        if (headers.length) {
          out.push(
            `- Headers: ${headers.map((h) => `\`${h}\``).join(", ")}`
          );
        } else {
          out.push("- Headers: _(none detected)_");
        }
        out.push("");
      }
    }
    if (!roleHasTables) {
      out.push("_No tables discovered for this role._");
      out.push("");
    }
  }

  out.push(`## Total tables discovered: ${total}`);
  out.push("");
  return out.join("\n");
}

// ===========================================================================
// button-coverage.md
// ===========================================================================

function renderButtonCoverage(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Button Coverage", presentKeys, missingKeys));
  out.push(
    "Buttons per role broken down by safety category, plus how many were actually " +
      "exercised as safe interactions versus skipped (safe-but-bounded or unsafe)."
  );
  out.push("");

  for (const key of presentKeys) {
    const records = asArray(allData[key].records);

    // Safety category tallies.
    const byCategory = {};
    let totalButtons = 0;
    for (const rec of records) {
      for (const btn of asArray(rec.buttons)) {
        if (!btn) continue;
        totalButtons += 1;
        const cat =
          asStr(btn.safety && btn.safety.category) || "unknown";
        byCategory[cat] = (byCategory[cat] || 0) + 1;
      }
    }

    // Exercised vs skipped.
    let exercised = 0;
    let safeSkipped = 0;
    let unsafeSkipped = 0;
    let failed = 0;
    for (const rec of records) {
      exercised += asArray(rec.interactions).length;
      safeSkipped += asArray(rec.safeSkipped).length;
      unsafeSkipped += asArray(rec.unsafeSkipped).length;
      failed += asArray(rec.failed).length;
    }

    out.push(`## Role: ${key}`);
    out.push("");
    out.push(`- Total buttons discovered: ${totalButtons}`);
    out.push(`- Interactions exercised: ${exercised}`);
    out.push(`- Safe controls skipped (bounded/dedup): ${safeSkipped}`);
    out.push(`- Unsafe controls skipped (never clicked): ${unsafeSkipped}`);
    out.push(`- Failed interactions: ${failed}`);
    out.push("");

    const catRows = Object.keys(byCategory)
      .sort()
      .map((cat) => [cat, byCategory[cat]]);
    out.push("### Buttons by safety category");
    out.push("");
    if (catRows.length) {
      out.push(mdTable(["Safety category", "Count"], catRows));
    } else {
      out.push("_No buttons discovered for this role._");
      out.push("");
    }

    // Sample of unsafe buttons (documentation of what was deliberately avoided).
    const unsafeButtons = [];
    for (const rec of records) {
      for (const btn of asArray(rec.buttons)) {
        if (!btn || !btn.safety) continue;
        if (btn.safety.safe === false) {
          unsafeButtons.push({
            text: asStr(btn.text) || asStr(btn.ariaLabel) || asStr(btn.title),
            category: asStr(btn.safety.category),
            reason: asStr(btn.safety.reason),
            route: recRoute(rec),
          });
        }
      }
    }
    if (unsafeButtons.length) {
      out.push("### Unsafe buttons (classified, never clicked)");
      out.push("");
      const rows = unsafeButtons
        .slice(0, 200)
        .map((b) => [
          truncate(b.text, 40) || "(no label)",
          b.category,
          truncate(b.reason, 40),
          b.route,
        ]);
      out.push(mdTable(["Button", "Category", "Reason", "Route"], rows));
      if (unsafeButtons.length > 200) {
        out.push(
          `_…and ${unsafeButtons.length - 200} more unsafe buttons (see per-page JSON)._`
        );
        out.push("");
      }
    }
  }

  return out.join("\n");
}

// ===========================================================================
// missing-coverage.md
// ===========================================================================

function renderMissingCoverage(ctx) {
  const {
    presentKeys,
    missingKeys,
    allData,
    permissionMatrix,
    configuredKeys,
  } = ctx;
  const out = [];
  out.push(reportHeader("Missing Coverage & Gaps", presentKeys, missingKeys));
  out.push(
    "What the crawler could not reach or could not confidently classify, and why. " +
      "Use this to target follow-up crawls or manual review."
  );
  out.push("");

  // Roles not crawled.
  out.push("## Roles configured but not crawled");
  out.push("");
  if (missingKeys.length) {
    for (const key of missingKeys) {
      out.push(
        `- **${key}** — no output found under \`output/roles/${key}/\`. ` +
          "Likely causes: credentials not provided in .env.crawler, login failed, " +
          "or the role was never run by crawl-all-roles."
      );
    }
  } else {
    out.push(
      `_All configured roles (${configuredKeys.join(", ")}) produced output._`
    );
  }
  out.push("");

  // General / Unknown pages.
  out.push("## Pages classified as General / Unknown");
  out.push("");
  const unknownRows = [];
  for (const key of presentKeys) {
    for (const rec of asArray(allData[key].records)) {
      const mods = recModules(rec);
      if (mods.length === 1 && mods[0] === "General / Unknown") {
        unknownRows.push([
          key,
          truncate(recTitle(rec), 50),
          recRoute(rec),
        ]);
      }
    }
  }
  if (unknownRows.length) {
    out.push(
      "These pages did not match any module keyword set. They may be custom, " +
        "empty, or need additional classifier keywords."
    );
    out.push("");
    out.push(mdTable(["Role", "Title", "Route"], unknownRows));
  } else {
    out.push("_No pages fell back to General / Unknown._");
    out.push("");
  }

  // Routes that did NOT reach the 'visited' end-state. The authoritative source
  // is the role map's routeGraph (which records EVERY discovered route and its
  // end-state, not just the pages that were fully crawled into per-page JSON).
  // We must surface every non-visited route, grouped by status, with its reason
  // and URL — never hide a gap behind an "all visited" claim.
  out.push("## Routes that did not reach the 'visited' end-state");
  out.push("");
  out.push(
    "Source: each role's `routeGraph` in `output/roles/<role>/role-map.json`. " +
      "Every discovered route is listed here unless it was actually visited. " +
      "A route may be skipped because it is unsafe/mutating, was bounded out by a " +
      "page cap, points off-site, etc. This is the crawler's honest record of what " +
      "it did NOT reach."
  );
  out.push("");

  let anyNonVisited = false;
  for (const key of presentKeys) {
    const entries = roleRouteGraphEntries(allData[key]);
    // Count every end-state so the per-role tally is complete and verifiable.
    const stateCounts = {};
    for (const e of entries) {
      stateCounts[e.status] = (stateCounts[e.status] || 0) + 1;
    }
    const nonVisited = entries.filter((e) => e.status !== "visited");

    out.push(`### Role: ${key}`);
    out.push("");

    if (entries.length === 0) {
      out.push(
        "_No routeGraph recorded for this role (role-map.json missing a " +
          "`routeGraph`/`routes` map) — non-visited routes cannot be enumerated._"
      );
      out.push("");
      continue;
    }

    // End-state counts (always shown, including the visited count for context).
    const stateRows = Object.keys(stateCounts)
      .sort()
      .map((s) => [s, stateCounts[s]]);
    out.push(
      `End-states across ${entries.length} discovered route(s): ` +
        stateRows.map(([s, c]) => `${s}=${c}`).join(", ") +
        "."
    );
    out.push("");

    if (nonVisited.length === 0) {
      out.push(
        `_All ${entries.length} discovered route(s) for this role reached the ` +
          "'visited' end-state._"
      );
      out.push("");
      continue;
    }

    anyNonVisited = true;
    out.push(
      `**${nonVisited.length} of ${entries.length} discovered route(s) were NOT visited.** ` +
        "Grouped by end-state below."
    );
    out.push("");

    // Group the non-visited routes by status for readability.
    const byStatus = {};
    for (const e of nonVisited) {
      if (!byStatus[e.status]) byStatus[e.status] = [];
      byStatus[e.status].push(e);
    }
    for (const status of Object.keys(byStatus).sort()) {
      const group = byStatus[status];
      out.push(`#### \`${status}\` (${group.length})`);
      out.push("");
      const rows = group.map((e) => [
        e.url || e.route || "(unknown route)",
        e.reason || "(reason not recorded)",
        e.discoveredFrom
          ? `${asStr(e.discoveredFrom.route) || "(start)"} via ${
              asStr(e.discoveredFrom.via) || "?"
            }`
          : "(unknown)",
      ]);
      out.push(mdTable(["Route URL", "Reason", "Discovered from"], rows));
    }
  }

  if (!anyNonVisited) {
    out.push(
      "_Across all crawled roles, every discovered route reached the 'visited' " +
        "end-state._"
    );
    out.push("");
  }

  // Login redirects detected in route graphs.
  out.push("## Login redirects");
  out.push("");
  const loginRows = [];
  for (const key of presentKeys) {
    const roleMap = allData[key].roleMap || {};
    const rg = roleMap.routeGraph || roleMap.routes || null;
    if (rg && typeof rg === "object") {
      const entries = Array.isArray(rg) ? rg : Object.values(rg);
      for (const e of entries) {
        const st = asStr(e && (e.status || e.endState));
        if (st === "login_redirect") {
          loginRows.push([
            key,
            asStr(e.route || e.url || e.normalizedRoute) || "(unknown)",
          ]);
        }
      }
    }
    // Also detect from page records whose URL bounced to the login page.
    for (const rec of asArray(allData[key].records)) {
      if (asStr(rec.discoveryStatus) === "login_redirect") {
        loginRows.push([key, recRoute(rec)]);
      }
    }
  }
  if (loginRows.length) {
    out.push(
      "These routes redirected to the login page (session expired or access denied):"
    );
    out.push("");
    out.push(mdTable(["Role", "Route"], loginRows));
  } else {
    out.push("_No login redirects recorded._");
    out.push("");
  }

  // Modules with zero pages for any role.
  out.push("## Modules with zero discovered pages (any role)");
  out.push("");
  const emptyModules = MODULES.filter(
    (m) =>
      !permissionMatrix.roles.some(
        (key) => permissionMatrix.matrix[m][key].present
      )
  );
  if (emptyModules.length) {
    out.push(
      "No crawled page classified into these modules. They may not exist on the " +
        "platform, may live behind an uncrawled role, or may need classifier keywords."
    );
    out.push("");
    for (const m of emptyModules) out.push(`- ${m}`);
  } else {
    out.push("_Every canonical module had at least one discovered page._");
  }
  out.push("");

  // Per-role per-module gaps (module present for someone but absent for a role).
  out.push("## Modules present for some roles but absent for others");
  out.push("");
  const gapRows = [];
  for (const m of MODULES) {
    const present = presentKeys.filter(
      (key) => permissionMatrix.matrix[m][key].present
    );
    const absent = presentKeys.filter(
      (key) => !permissionMatrix.matrix[m][key].present
    );
    if (present.length && absent.length) {
      gapRows.push([m, present.join(", "), absent.join(", ")]);
    }
  }
  if (gapRows.length) {
    out.push(
      "This often reflects a genuine permission difference between roles."
    );
    out.push("");
    out.push(mdTable(["Module", "Present for", "Absent for"], gapRows));
  } else {
    out.push("_No partial-presence module gaps among crawled roles._");
    out.push("");
  }

  return out.join("\n");
}

// ===========================================================================
// failed-pages.md
// ===========================================================================

function renderFailedPages(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Failed Pages & Interactions", presentKeys, missingKeys));
  out.push(
    "Pages that failed to crawl and individual interactions that threw during " +
      "exploration. The crawler is resilient: a failure here did not stop the run."
  );
  out.push("");

  let totalFailedPages = 0;
  let totalFailedInteractions = 0;

  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    out.push(`## Role: ${key}`);
    out.push("");

    // Pages with failed status.
    const failedPages = records.filter(
      (rec) => asStr(rec.discoveryStatus) === "failed_with_error"
    );
    totalFailedPages += failedPages.length;
    if (failedPages.length) {
      out.push("### Failed pages");
      out.push("");
      const rows = failedPages.map((rec) => [
        recRoute(rec),
        asStr(rec.url),
        truncate(
          asStr(rec.error) ||
            asStr(rec.failureReason) ||
            "(no detail recorded)",
          80
        ),
      ]);
      out.push(mdTable(["Route", "URL", "Detail"], rows));
    }

    // Failed interactions per page.
    const failRows = [];
    for (const rec of records) {
      for (const f of asArray(rec.failed)) {
        if (!f) continue;
        totalFailedInteractions += 1;
        failRows.push([
          recRoute(rec),
          truncate(asStr(f.text) || "(no label)", 40),
          truncate(asStr(f.error), 70),
        ]);
      }
    }
    if (failRows.length) {
      out.push("### Failed interactions");
      out.push("");
      out.push(mdTable(["Route", "Trigger", "Error"], failRows));
    }

    if (!failedPages.length && !failRows.length) {
      out.push("_No failures recorded for this role._");
      out.push("");
    }
  }

  out.push(
    `## Totals: ${totalFailedPages} failed pages, ${totalFailedInteractions} failed interactions`
  );
  out.push("");
  return out.join("\n");
}

// ===========================================================================
// skipped-actions.md
// ===========================================================================

function renderSkippedActions(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Skipped Actions", presentKeys, missingKeys));
  out.push(
    "What the crawler deliberately did NOT exercise, from two distinct sources:\n\n" +
      "1. **Route-level skips** — discovered URLs the crawler chose not to navigate, " +
      "recorded in each role's `routeGraph` (`skipped_safe_reason` = bounded out by a " +
      "page/click cap or dedupe; `skipped_unsafe_reason` = the URL targets a " +
      "mutating/destructive action).\n" +
      "2. **Action-level refusals** — buttons on visited pages classified as unsafe " +
      "(`buttons[].safety.safe === false`) and therefore never clicked, grouped by " +
      "`safety.category` (submit / mutating / logout / …).\n\n" +
      "These are independent counts (a page can be visited yet still contain unsafe " +
      "buttons). Both are reported in full; neither is collapsed to zero when data exists."
  );
  out.push("");

  // Grand totals across all roles.
  let grandRouteSkips = 0;
  let grandActionRefusals = 0;

  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    out.push(`## Role: ${key}`);
    out.push("");

    // ---- (1) Route-level skips from the routeGraph -----------------------
    const graphEntries = roleRouteGraphEntries(allData[key]);
    const routeSkips = graphEntries.filter((e) =>
      String(e.status).startsWith("skipped")
    );
    grandRouteSkips += routeSkips.length;

    out.push(`### Route-level skips (${routeSkips.length})`);
    out.push("");
    if (graphEntries.length === 0) {
      out.push(
        "_No routeGraph recorded for this role — route-level skips cannot be " +
          "enumerated._"
      );
      out.push("");
    } else if (routeSkips.length === 0) {
      out.push("_No routes were skipped for this role._");
      out.push("");
    } else {
      const byStatus = {};
      for (const e of routeSkips) {
        if (!byStatus[e.status]) byStatus[e.status] = [];
        byStatus[e.status].push(e);
      }
      for (const status of Object.keys(byStatus).sort()) {
        const group = byStatus[status];
        out.push(`#### \`${status}\` (${group.length})`);
        out.push("");
        const rows = group.slice(0, 300).map((e) => [
          e.url || e.route || "(unknown route)",
          e.reason || "(reason not recorded)",
        ]);
        out.push(mdTable(["Route URL", "Reason"], rows));
        if (group.length > 300) {
          out.push(
            `_…and ${group.length - 300} more (see role-map.json routeGraph)._`
          );
          out.push("");
        }
      }
    }

    // ---- (2) Action-level refusals: unsafe buttons on visited pages ------
    const refusals = [];
    for (const rec of records) {
      for (const btn of asArray(rec.buttons)) {
        if (!btn || !btn.safety) continue;
        if (btn.safety.safe === false) {
          refusals.push({
            text:
              asStr(btn.text) ||
              asStr(btn.ariaLabel) ||
              asStr(btn.title) ||
              "(no label)",
            category: asStr(btn.safety.category) || "(uncategorized)",
            reason: asStr(btn.safety.reason),
            route: recRoute(rec),
          });
        }
      }
    }
    grandActionRefusals += refusals.length;

    // Tally by category.
    const byCategory = {};
    for (const r of refusals) {
      if (!byCategory[r.category]) byCategory[r.category] = [];
      byCategory[r.category].push(r);
    }

    out.push(
      `### Action-level refusals — unsafe buttons never clicked (${refusals.length})`
    );
    out.push("");
    if (refusals.length === 0) {
      out.push(
        "_No buttons on visited pages were classified unsafe " +
          "(`safety.safe === false`)._"
      );
      out.push("");
    } else {
      const catSummary = Object.keys(byCategory)
        .sort()
        .map((c) => `${c}=${byCategory[c].length}`)
        .join(", ");
      out.push(`By category: ${catSummary}.`);
      out.push("");
      for (const cat of Object.keys(byCategory).sort()) {
        const group = byCategory[cat];
        out.push(`#### Category \`${cat}\` (${group.length})`);
        out.push("");
        const rows = group.slice(0, 300).map((r) => [
          truncate(r.text, 40),
          r.reason || "(reason not recorded)",
          r.route,
        ]);
        out.push(mdTable(["Button", "Reason", "On page"], rows));
        if (group.length > 300) {
          out.push(`_…and ${group.length - 300} more (see per-page JSON)._`);
          out.push("");
        }
      }
    }
  }

  out.push("## Totals (all crawled roles)");
  out.push("");
  out.push(`- Route-level skips: ${grandRouteSkips}`);
  out.push(`- Action-level refusals (unsafe buttons never clicked): ${grandActionRefusals}`);
  out.push("");
  return out.join("\n");
}

// ===========================================================================
// design-token-summary.md
// ===========================================================================

/**
 * Merge a [{value,count}] frequency list into an accumulator map.
 * @param {Map<string,number>} acc
 * @param {Array<{value:string,count:number}>} list
 */
function mergeFreqList(acc, list) {
  for (const item of asArray(list)) {
    if (!item) continue;
    const value = asStr(item.value);
    if (!value) continue;
    acc.set(value, (acc.get(value) || 0) + asNum(item.count) || 1);
  }
}

/**
 * Convert a frequency map to a sorted, capped array of [value,count] rows.
 * @param {Map<string,number>} acc
 * @param {number} [cap=40]
 * @returns {Array<[string,number]>}
 */
function freqRows(acc, cap = 40) {
  return Array.from(acc.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, cap);
}

function renderDesignTokenSummary(ctx) {
  const { presentKeys, missingKeys, allData } = ctx;
  const out = [];
  out.push(reportHeader("Design Token Summary", presentKeys, missingKeys));
  out.push(
    "Aggregated design tokens sampled across every crawled page. Frequencies are " +
      "summed across pages and roles. These are observed values from the existing " +
      "platform to inform — not dictate — a new original design system."
  );
  out.push("");

  const FREQ_FIELDS = [
    ["textColors", "Text colors"],
    ["backgroundColors", "Background colors"],
    ["borderColors", "Border colors"],
    ["fonts", "Font families"],
    ["fontSizes", "Font sizes"],
    ["fontWeights", "Font weights"],
    ["borderRadius", "Border radius"],
    ["shadows", "Box shadows"],
    ["spacing", "Spacing values"],
  ];

  // Accumulators per frequency field.
  const accs = {};
  for (const [field] of FREQ_FIELDS) accs[field] = new Map();

  // Style sample collectors.
  const buttonStyles = [];
  const cardStyles = [];
  const tableStyles = [];

  let pagesWithTokens = 0;
  for (const key of presentKeys) {
    for (const rec of asArray(allData[key].records)) {
      const tokens = rec.designTokens;
      if (!tokens || typeof tokens !== "object") continue;
      pagesWithTokens += 1;
      for (const [field] of FREQ_FIELDS) {
        mergeFreqList(accs[field], tokens[field]);
      }
      for (const s of asArray(tokens.buttonStyles)) {
        if (s) buttonStyles.push(s);
      }
      for (const s of asArray(tokens.cardStyles)) {
        if (s) cardStyles.push(s);
      }
      for (const s of asArray(tokens.tableStyles)) {
        if (s) tableStyles.push(s);
      }
    }
  }

  out.push(`Pages contributing tokens: ${pagesWithTokens}`);
  out.push("");

  if (pagesWithTokens === 0) {
    out.push(
      "_No design tokens were captured (token extraction may have been disabled " +
        "or no pages were crawled)._"
    );
    out.push("");
    return out.join("\n");
  }

  for (const [field, label] of FREQ_FIELDS) {
    const rows = freqRows(accs[field]).map(([value, count]) => [
      `\`${value}\``,
      count,
    ]);
    out.push(`## ${label} (top ${rows.length})`);
    out.push("");
    if (rows.length) {
      out.push(mdTable(["Value", "Frequency"], rows));
    } else {
      out.push("_None captured._");
      out.push("");
    }
  }

  // Representative computed styles.
  function styleTable(title, styles) {
    out.push(`## ${title} (sample of ${Math.min(styles.length, 15)})`);
    out.push("");
    if (styles.length === 0) {
      out.push("_None captured._");
      out.push("");
      return;
    }
    const rows = styles
      .slice(0, 15)
      .map((s) => [
        mdCell(asStr(s.background)),
        mdCell(asStr(s.color)),
        mdCell(asStr(s.border)),
        mdCell(asStr(s.borderRadius)),
        mdCell(asStr(s.padding)),
        mdCell(asStr(s.fontSize)),
        mdCell(asStr(s.fontWeight)),
      ]);
    out.push(
      mdTable(
        ["Background", "Color", "Border", "Radius", "Padding", "Font size", "Weight"],
        rows
      )
    );
  }
  styleTable("Button styles", buttonStyles);
  styleTable("Card styles", cardStyles);
  styleTable("Table styles", tableStyles);

  return out.join("\n");
}

// ===========================================================================
// llm-context.md
// ===========================================================================

function renderLlmContext(ctx) {
  const {
    presentKeys,
    missingKeys,
    allData,
    sharedUnique,
    componentInventory,
    interactionInventory,
    globalCfg,
  } = ctx;
  const out = [];
  out.push("# Academy Dashboard — LLM Context Pack");
  out.push("");
  out.push(`Generated: ${new Date().toISOString()}`);
  out.push("");
  out.push(
    "Compact, machine-readable-friendly overview of the discovered academy admin " +
      "dashboard system. This was produced by a read-only discovery crawl; it " +
      "documents the EXISTING platform so a NEW, original, improved frontend can " +
      "be designed. Do not treat any captured value as a spec to copy verbatim."
  );
  out.push("");

  out.push("## What this system is");
  out.push("");
  out.push(
    "A multi-role academy management dashboard. Administrators, teachers, and " +
      "families log into role-specific dashboards to manage students, courses, " +
      "classes, attendance, assignments, exams, certificates, payments, and reports."
  );
  out.push("");
  // Language/direction is DERIVED from the captured records, never assumed.
  out.push(describeLanguageDirection(allData, presentKeys));
  out.push("");
  out.push(`- Base URL: ${globalCfg.baseUrl}`);
  out.push(`- Crawled roles: ${presentKeys.join(", ") || "none"}`);
  if (missingKeys.length) {
    out.push(`- Not crawled: ${missingKeys.join(", ")}`);
  }
  out.push("");

  // Per-role one-liners.
  out.push("## Roles at a glance");
  out.push("");
  for (const key of presentKeys) {
    const records = asArray(allData[key].records);
    const moduleSet = new Set();
    for (const rec of records) for (const m of recModules(rec)) moduleSet.add(m);
    out.push(
      `- **${key}** — ${records.length} pages across modules: ${Array.from(
        moduleSet
      )
        .sort()
        .join(", ")}.`
    );
  }
  out.push("");

  // Modules with page counts, computed directly from each page's real
  // `modules[]`. A page can list 1–3 modules, so the same page may appear under
  // several modules; the count below is "pages that touch this module", NOT a
  // claim that the module is fully built or has that many dedicated pages.
  out.push("## Modules (discovered)");
  out.push("");
  // module -> Set of "role:route" page identities (dedupe per page).
  const modulePages = {};
  let totalVisitedPages = 0;
  for (const key of presentKeys) {
    for (const rec of asArray(allData[key].records)) {
      totalVisitedPages += 1;
      const pageId = `${key}:${recRoute(rec)}`;
      for (const m of recModules(rec)) {
        if (!modulePages[m]) modulePages[m] = new Set();
        modulePages[m].add(pageId);
      }
    }
  }
  const moduleNames = Object.keys(modulePages).sort(
    (a, b) => modulePages[b].size - modulePages[a].size || a.localeCompare(b)
  );
  if (moduleNames.length === 0) {
    out.push("_No modules were classified on any crawled page._");
  } else {
    out.push(
      `Counts are the number of crawled pages whose classifier tagged that ` +
        `module (out of ${totalVisitedPages} page(s) total). A page often tags ` +
        `more than one module, so these do not sum to the page total and do not ` +
        `imply each module is complete:`
    );
    out.push("");
    for (const m of moduleNames) {
      out.push(`- ${m}: ${modulePages[m].size} page(s) reference this module`);
    }
  }
  out.push("");

  // Key routes (shared by all).
  out.push("## Core shared routes (all roles)");
  out.push("");
  if (sharedUnique.sharedAll.length) {
    for (const r of sharedUnique.sharedAll.slice(0, 50)) out.push(`- \`${r}\``);
  } else {
    out.push("_No routes shared by every crawled role._");
  }
  out.push("");

  // Component + interaction snapshot.
  out.push("## Component & interaction snapshot");
  out.push("");
  const compRows = componentInventory.componentTypes.map((t) => [
    t,
    asNum(componentInventory.totals[t]),
  ]);
  out.push(mdTable(["Component", "Total"], compRows));
  out.push(
    `Interactions exercised by result type: ${
      interactionInventory.interactionTypes
        .map((t) => `${t}=${asNum(interactionInventory.totals[t])}`)
        .join(", ") || "none"
    }.`
  );
  out.push(
    `Modals captured: ${interactionInventory.modalsCaptured}; unsafe controls ` +
      `deliberately skipped: ${interactionInventory.unsafeSkipped}.`
  );
  out.push("");

  out.push("## How to use this pack");
  out.push("");
  out.push(
    "- Pair this file with `academy-system-map.json` for full structure.\n" +
      "- Use `role-permission-matrix.md` to understand which role sees which module.\n" +
      "- Use `shared-unique-pages.md` for per-route role differences.\n" +
      "- Use `design-token-summary.md` only as observational reference, not a target.\n" +
      "- Treat all data as documentation of the legacy system to improve upon."
  );
  out.push("");

  return out.join("\n");
}

// ===========================================================================
// speckit-discovery.md
// ===========================================================================

function renderSpeckitDiscovery(ctx) {
  const {
    presentKeys,
    missingKeys,
    allData,
    sharedUnique,
    permissionMatrix,
    componentInventory,
    configuredKeys,
    globalCfg,
  } = ctx;
  const out = [];
  out.push("# Spec-Kit Discovery — Academy Dashboard Rebuild");
  out.push("");
  out.push(`Generated: ${new Date().toISOString()}`);
  out.push("");
  out.push(
    "Discovery input for a spec-kit driven rebuild of the academy dashboard. The " +
      "goal is a NEW, original, improved frontend — not a clone. This document maps " +
      "the existing product so requirements and a fresh design can be authored."
  );
  out.push("");

  out.push("## 1. Product map");
  out.push("");
  out.push(
    "A multi-role academy management platform. Three configured personas operate " +
      "distinct but overlapping dashboards."
  );
  out.push("");
  // Language/direction is DERIVED from the captured records, never assumed.
  out.push(describeLanguageDirection(allData, presentKeys));
  out.push("");
  out.push(`- Target base URL: ${globalCfg.baseUrl}`);
  out.push(`- Configured roles: ${configuredKeys.join(", ")}`);
  out.push(
    `- Crawled roles: ${presentKeys.join(", ") || "none"}` +
      (missingKeys.length ? ` (not crawled: ${missingKeys.join(", ")})` : "")
  );
  out.push("");

  out.push("## 2. Modules (functional areas)");
  out.push("");
  out.push(
    "Canonical modules with which roles have at least one page in them:"
  );
  out.push("");
  const moduleRows = [];
  for (const m of MODULES) {
    const present = permissionMatrix.roles.filter(
      (key) => permissionMatrix.matrix[m][key].present
    );
    let pages = 0;
    for (const key of present) pages += permissionMatrix.matrix[m][key].pages;
    moduleRows.push([m, pages, present.join(", ") || "—"]);
  }
  out.push(mdTable(["Module", "Pages", "Available to"], moduleRows));

  out.push("## 3. Roles & permissions");
  out.push("");
  out.push(
    "Observed access differences. A module marked for a role means crawled pages " +
      "classified into it; absence may reflect a real permission boundary."
  );
  out.push("");
  const permHeaders = ["Module", ...presentKeys];
  const permRows = MODULES.filter((m) =>
    presentKeys.some((key) => permissionMatrix.matrix[m][key].present)
  ).map((m) => {
    const row = [m];
    for (const key of presentKeys) {
      row.push(permissionMatrix.matrix[m][key].present ? "yes" : "—");
    }
    return row;
  });
  out.push(mdTable(permHeaders, permRows));

  out.push("## 4. Page list");
  out.push("");
  out.push(
    "All discovered routes with the roles that can reach them (full detail in " +
      "`page-inventory.md` and `shared-unique-pages.md`)."
  );
  out.push("");
  const pageRows = sharedUnique.routes.map((entry) => [
    truncate(entry.title, 45) || "(untitled)",
    entry.route,
    asArray(entry.modules).join(", "),
    asArray(entry.roles).join(", "),
  ]);
  out.push(mdTable(["Title", "Route", "Modules", "Roles"], pageRows));

  out.push("## 5. Components");
  out.push("");
  out.push("Observed UI building blocks (counts across all crawled pages):");
  out.push("");
  const compRows = componentInventory.componentTypes.map((t) => [
    t,
    asNum(componentInventory.totals[t]),
  ]);
  out.push(mdTable(["Component type", "Count"], compRows));
  out.push(
    "These indicate the breadth of UI primitives the new design system must cover " +
      "(tables, forms, cards/KPIs, filters, tabs, modals, dropdowns, badges, buttons)."
  );
  out.push("");

  out.push("## 6. Open questions for spec authoring");
  out.push("");
  const openQuestions = [];
  if (missingKeys.length) {
    openQuestions.push(
      `Roles ${missingKeys.join(
        ", "
      )} were not crawled — their requirements are unknown and must be gathered separately.`
    );
  }
  // Unknown pages.
  let unknownCount = 0;
  for (const key of presentKeys) {
    for (const rec of asArray(allData[key].records)) {
      const mods = recModules(rec);
      if (mods.length === 1 && mods[0] === "General / Unknown") unknownCount += 1;
    }
  }
  if (unknownCount) {
    openQuestions.push(
      `${unknownCount} page(s) could not be classified into a module (General / Unknown) — confirm their purpose.`
    );
  }
  // Empty modules.
  const emptyModules = MODULES.filter(
    (m) =>
      !permissionMatrix.roles.some(
        (key) => permissionMatrix.matrix[m][key].present
      )
  );
  if (emptyModules.length) {
    openQuestions.push(
      `Modules with no discovered pages: ${emptyModules.join(
        ", "
      )} — verify whether the platform lacks them or they are behind uncrawled access.`
    );
  }
  openQuestions.push(
    "Data mutation flows (create/edit/delete/pay/submit) were intentionally NOT exercised; their exact behavior must be specified from product requirements, not inferred."
  );
  openQuestions.push(
    "Offline snapshots reference remote CSS/assets; visual fidelity comes from screenshots. Confirm the intended new visual language independently."
  );
  for (const q of openQuestions) out.push(`- ${q}`);
  out.push("");

  out.push("## 7. Recommended next steps");
  out.push("");
  out.push(
    "- Author spec-kit specifications per module using sections 2–4 as the scope.\n" +
      "- Design a fresh component library covering section 5's primitives, with " +
      "direction support driven by the captured locale (see Product map) rather " +
      "than an assumed default.\n" +
      "- Resolve the open questions in section 6 with product stakeholders.\n" +
      "- Reference `design-token-summary.md` for observational context only."
  );
  out.push("");

  return out.join("\n");
}

// ===========================================================================
// Orchestration
// ===========================================================================

/**
 * Compute the three required pairwise comparisons, tolerating missing roles.
 * @param {object} allData
 * @returns {Array<{ a:string, b:string, available:boolean, comparison?:object }>}
 */
function buildPairwise(allData) {
  const pairs = [
    ["admin", "teacher"],
    ["admin", "family"],
    ["teacher", "family"],
  ];
  return pairs.map(([a, b]) => {
    const aData = allData[a];
    const bData = allData[b];
    if (!aData || !bData) {
      return { a, b, available: false };
    }
    return {
      a,
      b,
      available: true,
      comparison: comparator.compareRolePair(aData, bData),
    };
  });
}

/**
 * Write a markdown report and log it.
 * @param {string} outDir
 * @param {string} filename
 * @param {string} content
 */
function writeReport(outDir, filename, content) {
  const file = path.join(outDir, filename);
  fsUtils.writeText(file, content.endsWith("\n") ? content : content + "\n");
  logger.success(`Wrote ${filename}`);
}

/**
 * Main entry point.
 */
function runAudit() {
  logger.step("Starting coverage audit");

  config.loadEnv();
  const globalCfg = config.getGlobalConfig();

  // Configured role keys (raw from roles.config.json).
  let configuredKeys = [];
  try {
    configuredKeys = comparatorSafeRoleKeys();
  } catch (err) {
    logger.error("Failed to load roles config", err);
    configuredKeys = [];
  }

  // Load all per-role data (defensive; missing roles omitted).
  const allData = comparator.loadAllRoleData(configuredKeys);

  const { presentKeys, missingKeys } = splitRoles(configuredKeys, allData);

  if (presentKeys.length === 0) {
    logger.warn(
      "No crawled role output was found. Reports will be generated but will " +
        "mostly note the absence of data."
    );
  } else {
    logger.info(`Crawled roles found: ${presentKeys.join(", ")}`);
  }
  if (missingKeys.length) {
    logger.warn(`Configured roles without output: ${missingKeys.join(", ")}`);
  }

  // Build the data aggregates once.
  const sharedUnique = comparator.buildSharedUnique(allData);
  const permissionMatrix = comparator.buildPermissionMatrix(allData);
  const componentInventory = comparator.buildComponentInventory(allData);
  const interactionInventory = comparator.buildInteractionInventory(allData);
  const pairwise = buildPairwise(allData);

  // Ensure the permission matrix carries every present role even if buildPermissionMatrix
  // ordered them differently (it derives roles from allData keys; align defensively).
  if (
    permissionMatrix.roles.length === 0 ||
    presentKeys.some((k) => !permissionMatrix.roles.includes(k))
  ) {
    // Rebuild role list union to keep renderers safe.
    const unionRoles = Array.from(
      new Set([...permissionMatrix.roles, ...presentKeys])
    );
    for (const m of MODULES) {
      if (!permissionMatrix.matrix[m]) permissionMatrix.matrix[m] = {};
      for (const key of unionRoles) {
        if (!permissionMatrix.matrix[m][key]) {
          permissionMatrix.matrix[m][key] = {
            present: false,
            pages: 0,
            buttons: 0,
            forms: 0,
            modals: 0,
            tables: 0,
          };
        }
      }
    }
    permissionMatrix.roles = unionRoles;
  }

  const ctx = {
    configuredKeys,
    presentKeys,
    missingKeys,
    allData,
    sharedUnique,
    permissionMatrix,
    componentInventory,
    interactionInventory,
    pairwise,
    globalCfg,
  };

  // Output directory.
  const combinedDir = path.join(config.OUTPUT_DIR, "combined");
  fsUtils.ensureDir(combinedDir);
  logger.info(`Writing combined reports to ${combinedDir}`);

  // 1. Master system map (JSON + MD).
  const systemMap = buildSystemMap(ctx);
  fsUtils.writeJson(path.join(combinedDir, "academy-system-map.json"), systemMap);
  logger.success("Wrote academy-system-map.json");
  writeReport(combinedDir, "academy-system-map.md", renderSystemMapMd(systemMap, ctx));

  // 2..N. Markdown reports. Each is wrapped so one failing renderer can't abort
  // the rest of the audit.
  const reports = [
    ["page-inventory.md", renderPageInventory],
    ["route-graph.md", renderRouteGraph],
    ["role-permission-matrix.md", renderPermissionMatrix],
    ["shared-unique-pages.md", renderSharedUnique],
    ["component-inventory.md", renderComponentInventory],
    ["interaction-inventory.md", renderInteractionInventory],
    ["modal-inventory.md", renderModalInventory],
    ["form-inventory.md", renderFormInventory],
    ["table-inventory.md", renderTableInventory],
    ["button-coverage.md", renderButtonCoverage],
    ["missing-coverage.md", renderMissingCoverage],
    ["failed-pages.md", renderFailedPages],
    ["skipped-actions.md", renderSkippedActions],
    ["design-token-summary.md", renderDesignTokenSummary],
    ["llm-context.md", renderLlmContext],
    ["speckit-discovery.md", renderSpeckitDiscovery],
  ];

  for (const [filename, renderer] of reports) {
    try {
      const content = renderer(ctx);
      writeReport(combinedDir, filename, content);
    } catch (err) {
      logger.error(`Failed to render ${filename}`, err);
      // Still write a stub explaining the failure so downstream tooling sees a file.
      const fallback =
        `# ${filename.replace(/\.md$/, "")}\n\n` +
        `Generated: ${new Date().toISOString()}\n\n` +
        `This report could not be generated due to an error: ${asStr(
          err && err.message
        )}.\n` +
        `The audit continued; other reports are unaffected.\n`;
      try {
        fsUtils.writeText(path.join(combinedDir, filename), fallback);
      } catch (_) {
        /* nothing more we can do */
      }
    }
  }

  logger.step("Coverage audit complete");
}

/**
 * Safely read configured role keys from roles.config.json via config.loadRoles().
 * @returns {string[]}
 */
function comparatorSafeRoleKeys() {
  const roles = config.loadRoles();
  return asArray(roles)
    .map((r) => asStr(r && r.key))
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// CLI entry
// ---------------------------------------------------------------------------
if (require.main === module) {
  try {
    runAudit();
  } catch (err) {
    logger.error("Coverage audit failed", err);
    process.exitCode = 1;
  }
}

module.exports = { runAudit };

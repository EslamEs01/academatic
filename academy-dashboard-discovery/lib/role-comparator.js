"use strict";

/**
 * lib/role-comparator.js
 *
 * Cross-role comparison and aggregation utilities for the academy dashboard
 * discovery crawler. These functions read the per-role output that the crawler
 * has already written (role-map.json + pages/*.json) and produce plain data
 * objects that the coverage-audit renderer turns into markdown.
 *
 * This module returns DATA ONLY — it never renders markdown and never writes
 * files. It is deliberately defensive: missing roles / files / fields must
 * never throw.
 *
 * Exports:
 *   { loadAllRoleData, compareRolePair, buildSharedUnique, buildPermissionMatrix,
 *     buildComponentInventory, buildInteractionInventory }
 */

const path = require("path");

const fsUtils = require("./fs-utils");
const config = require("./config");
const { MODULES } = require("./page-classifier");

// ---------------------------------------------------------------------------
// Small internal helpers
// ---------------------------------------------------------------------------

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
 * Resolve a role's absolute output directory.
 *
 * Prefers config.getRole(key).outputDir (already absolute per the config
 * contract). Falls back to PROJECT_ROOT/output/roles/<key> if config cannot
 * resolve the role for any reason (e.g. it is not an "active" role but still
 * has output on disk).
 *
 * @param {string} roleKey
 * @returns {{ outputDir: string, role: object|null }}
 */
function resolveRoleOutput(roleKey) {
  let role = null;
  try {
    role = config.getRole(roleKey);
  } catch (_) {
    role = null;
  }

  let outputDir = role && role.outputDir ? role.outputDir : null;

  if (!outputDir) {
    const projectRoot =
      config && config.PROJECT_ROOT
        ? config.PROJECT_ROOT
        : path.resolve(__dirname, "..");
    const baseOutput =
      config && config.OUTPUT_DIR
        ? config.OUTPUT_DIR
        : path.join(projectRoot, "output");
    outputDir = path.join(baseOutput, "roles", roleKey);
  }

  return { outputDir, role };
}

/**
 * Count the visible / safe buttons in a page record and collect their texts.
 * "Visible button text" is the trimmed button text (or aria-label/title as a
 * fallback) used for the same-route UI comparison.
 *
 * @param {object} record - a full PageRecord
 * @returns {string[]} - de-duplicated, sorted button label set
 */
function buttonTextSet(record) {
  const set = new Set();
  for (const btn of asArray(record && record.buttons)) {
    if (!btn) continue;
    const label = asStr(btn.text) || asStr(btn.ariaLabel) || asStr(btn.title);
    if (label) set.add(label);
  }
  return Array.from(set).sort();
}

/**
 * Compute the difference (items in a not in b) of two arrays of strings.
 * @param {string[]} a
 * @param {string[]} b
 * @returns {string[]}
 */
function diffArray(a, b) {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
}

/**
 * Key a list of page records by their normalizedRoute.
 * If two records share a normalizedRoute, the first one wins (the crawler
 * dedupes by normalized route, so this is just defensive).
 *
 * @param {object[]} records
 * @returns {Map<string, object>}
 */
function indexByRoute(records) {
  const map = new Map();
  for (const rec of asArray(records)) {
    if (!rec) continue;
    const route = asStr(rec.normalizedRoute) || asStr(rec.url);
    if (!route) continue;
    if (!map.has(route)) map.set(route, rec);
  }
  return map;
}

// ---------------------------------------------------------------------------
// loadAllRoleData
// ---------------------------------------------------------------------------

/**
 * Load all output data for the given role keys.
 *
 * For each role it reads:
 *   - <outputDir>/role-map.json        -> roleMap (and roleMap.summary if present)
 *   - <outputDir>/pages/*.json          -> full PageRecords
 *
 * Roles with no output on disk are skipped entirely (omitted from the result).
 * Never throws: unreadable files are skipped individually.
 *
 * @param {string[]} roleKeys
 * @returns {Object.<string, { role: object|null, records: object[], roleMap: object|null, summary: object|null }>}
 */
function loadAllRoleData(roleKeys) {
  const result = {};
  const keys = asArray(roleKeys).map(asStr).filter(Boolean);

  for (const roleKey of keys) {
    const { outputDir, role } = resolveRoleOutput(roleKey);

    const roleMapFile = path.join(outputDir, "role-map.json");
    const pagesDir = path.join(outputDir, "pages");

    const roleMap = fsUtils.readJson(roleMapFile); // null if missing/invalid
    const pageFiles = fsUtils.listFiles(pagesDir, ".json");

    // Skip a role with no output at all (no role-map AND no page files).
    if (!roleMap && pageFiles.length === 0) {
      continue;
    }

    const records = [];
    for (const file of pageFiles) {
      const rec = fsUtils.readJson(file);
      if (rec && typeof rec === "object") {
        records.push(rec);
      }
    }

    // Summary may live on the role map (writeRoleMap stores it) — pull it out
    // for convenience, falling back to null.
    let summary = null;
    if (roleMap && typeof roleMap === "object") {
      if (roleMap.summary && typeof roleMap.summary === "object") {
        summary = roleMap.summary;
      }
    }

    result[roleKey] = {
      role: role || (roleMap && roleMap.role) || { key: roleKey },
      records,
      roleMap: roleMap || null,
      summary,
    };
  }

  return result;
}

// ---------------------------------------------------------------------------
// compareRolePair
// ---------------------------------------------------------------------------

/**
 * Compare two roles' page records by normalizedRoute.
 *
 * @param {{ records: object[] }} aData
 * @param {{ records: object[] }} bData
 * @returns {{
 *   shared: string[],
 *   onlyA: string[],
 *   onlyB: string[],
 *   sameRouteDifferentUI: Array<{
 *     route: string,
 *     differences: {
 *       buttons: { a: number, b: number, onlyA: string[], onlyB: string[] },
 *       forms: { a: number, b: number },
 *       tables: { a: number, b: number },
 *       modals: { a: number, b: number }
 *     }
 *   }>
 * }}
 */
function compareRolePair(aData, bData) {
  const aRecords = aData && Array.isArray(aData.records) ? aData.records : [];
  const bRecords = bData && Array.isArray(bData.records) ? bData.records : [];

  const aMap = indexByRoute(aRecords);
  const bMap = indexByRoute(bRecords);

  const aRoutes = Array.from(aMap.keys());
  const bRoutes = Array.from(bMap.keys());
  const bRouteSet = new Set(bRoutes);
  const aRouteSet = new Set(aRoutes);

  const shared = aRoutes.filter((r) => bRouteSet.has(r)).sort();
  const onlyA = aRoutes.filter((r) => !bRouteSet.has(r)).sort();
  const onlyB = bRoutes.filter((r) => !aRouteSet.has(r)).sort();

  const sameRouteDifferentUI = [];

  for (const route of shared) {
    const recA = aMap.get(route);
    const recB = bMap.get(route);

    const aBtnCount = asArray(recA.buttons).length;
    const bBtnCount = asArray(recB.buttons).length;
    const aFormCount = asArray(recA.forms).length;
    const bFormCount = asArray(recB.forms).length;
    const aTableCount = asArray(recA.tables).length;
    const bTableCount = asArray(recB.tables).length;
    const aModalCount = asArray(recA.modals).length;
    const bModalCount = asArray(recB.modals).length;

    const aBtnTexts = buttonTextSet(recA);
    const bBtnTexts = buttonTextSet(recB);
    const onlyAButtons = diffArray(aBtnTexts, bBtnTexts);
    const onlyBButtons = diffArray(bBtnTexts, aBtnTexts);

    const buttonsDiffer =
      aBtnCount !== bBtnCount ||
      onlyAButtons.length > 0 ||
      onlyBButtons.length > 0;
    const formsDiffer = aFormCount !== bFormCount;
    const tablesDiffer = aTableCount !== bTableCount;
    const modalsDiffer = aModalCount !== bModalCount;

    if (buttonsDiffer || formsDiffer || tablesDiffer || modalsDiffer) {
      sameRouteDifferentUI.push({
        route,
        differences: {
          buttons: {
            a: aBtnCount,
            b: bBtnCount,
            onlyA: onlyAButtons,
            onlyB: onlyBButtons,
          },
          forms: { a: aFormCount, b: bFormCount },
          tables: { a: aTableCount, b: bTableCount },
          modals: { a: aModalCount, b: bModalCount },
        },
      });
    }
  }

  return { shared, onlyA, onlyB, sameRouteDifferentUI };
}

// ---------------------------------------------------------------------------
// buildSharedUnique
// ---------------------------------------------------------------------------

/**
 * Build a shared/unique route map across all loaded roles.
 *
 * @param {Object.<string, { records: object[] }>} allData
 * @returns {{
 *   routes: Array<{ route: string, title: string, modules: string[], roles: string[] }>,
 *   sharedAll: string[],
 *   unique: Object.<string, string[]>
 * }}
 */
function buildSharedUnique(allData) {
  const data = allData && typeof allData === "object" ? allData : {};
  const roleKeys = Object.keys(data).sort();

  // route -> { title, modules, roles:Set }
  const routeInfo = new Map();

  for (const roleKey of roleKeys) {
    const records = asArray(data[roleKey] && data[roleKey].records);
    const seenForRole = new Set(); // avoid double-counting a route within one role
    for (const rec of records) {
      if (!rec) continue;
      const route = asStr(rec.normalizedRoute) || asStr(rec.url);
      if (!route) continue;

      if (!routeInfo.has(route)) {
        routeInfo.set(route, {
          title: asStr(rec.title),
          modules: asArray(rec.modules).map(asStr).filter(Boolean),
          roles: new Set(),
        });
      }
      const info = routeInfo.get(route);
      // Fill in a title/modules if the first occurrence lacked them.
      if (!info.title && asStr(rec.title)) info.title = asStr(rec.title);
      if (info.modules.length === 0) {
        info.modules = asArray(rec.modules).map(asStr).filter(Boolean);
      }
      if (!seenForRole.has(route)) {
        info.roles.add(roleKey);
        seenForRole.add(route);
      }
    }
  }

  const routes = [];
  for (const [route, info] of routeInfo.entries()) {
    routes.push({
      route,
      title: info.title,
      modules: info.modules,
      roles: Array.from(info.roles).sort(),
    });
  }
  // Sort routes alphabetically for stable, readable output.
  routes.sort((a, b) => a.route.localeCompare(b.route));

  const totalRoles = roleKeys.length;
  const sharedAll = [];
  const unique = {};
  for (const key of roleKeys) unique[key] = [];

  for (const entry of routes) {
    // Shared across ALL loaded roles (only meaningful when >1 role).
    if (totalRoles > 0 && entry.roles.length === totalRoles) {
      sharedAll.push(entry.route);
    }
    // Unique to a single role.
    if (entry.roles.length === 1) {
      const onlyRole = entry.roles[0];
      if (!unique[onlyRole]) unique[onlyRole] = [];
      unique[onlyRole].push(entry.route);
    }
  }

  sharedAll.sort();
  for (const key of Object.keys(unique)) unique[key].sort();

  return { routes, sharedAll, unique };
}

// ---------------------------------------------------------------------------
// buildPermissionMatrix
// ---------------------------------------------------------------------------

/**
 * Build a per-module, per-role matrix of presence and component counts.
 *
 * For every canonical MODULE and every loaded role, aggregates the pages whose
 * `modules` array includes that module, summing pages/buttons/forms/modals/
 * tables and recording presence.
 *
 * @param {Object.<string, { records: object[] }>} allData
 * @returns {{
 *   roles: string[],
 *   modules: string[],
 *   matrix: Object.<string, Object.<string, {
 *     present: boolean, pages: number, buttons: number,
 *     forms: number, modals: number, tables: number
 *   }>>
 * }}
 */
function buildPermissionMatrix(allData) {
  const data = allData && typeof allData === "object" ? allData : {};
  const roleKeys = Object.keys(data).sort();

  function emptyCell() {
    return {
      present: false,
      pages: 0,
      buttons: 0,
      forms: 0,
      modals: 0,
      tables: 0,
    };
  }

  const matrix = {};
  for (const moduleName of MODULES) {
    matrix[moduleName] = {};
    for (const roleKey of roleKeys) {
      matrix[moduleName][roleKey] = emptyCell();
    }
  }

  for (const roleKey of roleKeys) {
    const records = asArray(data[roleKey] && data[roleKey].records);
    for (const rec of records) {
      if (!rec) continue;
      let mods = asArray(rec.modules).map(asStr).filter(Boolean);
      if (mods.length === 0) mods = ["General / Unknown"];

      const btnCount = asArray(rec.buttons).length;
      const formCount = asArray(rec.forms).length;
      const modalCount = asArray(rec.modals).length;
      const tableCount = asArray(rec.tables).length;

      for (const moduleName of mods) {
        // Only canonical modules have a row; unknown labels are coalesced into
        // "General / Unknown" so nothing is lost.
        const key = matrix[moduleName] ? moduleName : "General / Unknown";
        const cell = matrix[key][roleKey];
        if (!cell) continue;
        cell.present = true;
        cell.pages += 1;
        cell.buttons += btnCount;
        cell.forms += formCount;
        cell.modals += modalCount;
        cell.tables += tableCount;
      }
    }
  }

  return { roles: roleKeys, modules: MODULES.slice(), matrix };
}

// ---------------------------------------------------------------------------
// buildComponentInventory
// ---------------------------------------------------------------------------

/**
 * Tally UI component types across all roles.
 *
 * Component types counted: buttons, forms, tables, cards, filters, tabs, modals,
 * badges, dropdownTriggers. Provides both a global total and a per-role breakdown.
 *
 * @param {Object.<string, { records: object[] }>} allData
 * @returns {{
 *   componentTypes: string[],
 *   totals: Object.<string, number>,
 *   perRole: Object.<string, Object.<string, number>>,
 *   pagesScanned: number
 * }}
 */
function buildComponentInventory(allData) {
  const data = allData && typeof allData === "object" ? allData : {};
  const roleKeys = Object.keys(data).sort();

  // Map component-type label -> the PageRecord array field that holds it.
  const COMPONENT_FIELDS = {
    buttons: "buttons",
    forms: "forms",
    tables: "tables",
    cards: "cards",
    filters: "filters",
    tabs: "tabs",
    modals: "modals",
    badges: "badges",
    dropdownTriggers: "dropdownTriggers",
  };
  const componentTypes = Object.keys(COMPONENT_FIELDS);

  const totals = {};
  for (const type of componentTypes) totals[type] = 0;

  const perRole = {};
  let pagesScanned = 0;

  for (const roleKey of roleKeys) {
    const roleCounts = {};
    for (const type of componentTypes) roleCounts[type] = 0;

    const records = asArray(data[roleKey] && data[roleKey].records);
    for (const rec of records) {
      if (!rec) continue;
      pagesScanned += 1;
      for (const type of componentTypes) {
        const field = COMPONENT_FIELDS[type];
        const n = asArray(rec[field]).length;
        roleCounts[type] += n;
        totals[type] += n;
      }
    }

    perRole[roleKey] = roleCounts;
  }

  return { componentTypes, totals, perRole, pagesScanned };
}

// ---------------------------------------------------------------------------
// buildInteractionInventory
// ---------------------------------------------------------------------------

/**
 * Tally interaction types across all roles.
 *
 * Interaction types are the `type` field on each record.interactions[] entry,
 * e.g. "navigation", "modal_or_dialog", "dropdown_or_menu", "tab_change",
 * "accordion_expand", "inline_state_change", "no_visible_change", "failed".
 * Discovered dynamically so any new type is included automatically.
 *
 * Also surfaces aggregate counts for safeSkipped / unsafeSkipped / failed and
 * total modals captured.
 *
 * @param {Object.<string, { records: object[] }>} allData
 * @returns {{
 *   interactionTypes: string[],
 *   totals: Object.<string, number>,
 *   perRole: Object.<string, Object.<string, number>>,
 *   modalsCaptured: number,
 *   safeSkipped: number,
 *   unsafeSkipped: number,
 *   failed: number
 * }}
 */
function buildInteractionInventory(allData) {
  const data = allData && typeof allData === "object" ? allData : {};
  const roleKeys = Object.keys(data).sort();

  const totals = {}; // interaction type -> global count
  const perRole = {}; // roleKey -> { type -> count }
  const typeSet = new Set();

  let modalsCaptured = 0;
  let safeSkipped = 0;
  let unsafeSkipped = 0;
  let failed = 0;

  for (const roleKey of roleKeys) {
    const roleCounts = {};
    const records = asArray(data[roleKey] && data[roleKey].records);

    for (const rec of records) {
      if (!rec) continue;

      for (const inter of asArray(rec.interactions)) {
        if (!inter) continue;
        const type = asStr(inter.type) || "unknown";
        typeSet.add(type);
        roleCounts[type] = (roleCounts[type] || 0) + 1;
        totals[type] = (totals[type] || 0) + 1;
      }

      modalsCaptured += asArray(rec.modals).length;
      safeSkipped += asArray(rec.safeSkipped).length;
      unsafeSkipped += asArray(rec.unsafeSkipped).length;
      failed += asArray(rec.failed).length;
    }

    perRole[roleKey] = roleCounts;
  }

  const interactionTypes = Array.from(typeSet).sort();

  // Ensure every role's per-role map carries a 0 for every discovered type so
  // the renderer can build a dense table without undefined cells.
  for (const roleKey of roleKeys) {
    const roleCounts = perRole[roleKey];
    for (const type of interactionTypes) {
      if (!(type in roleCounts)) roleCounts[type] = 0;
    }
  }

  return {
    interactionTypes,
    totals,
    perRole,
    modalsCaptured,
    safeSkipped,
    unsafeSkipped,
    failed,
  };
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
module.exports = {
  loadAllRoleData,
  compareRolePair,
  buildSharedUnique,
  buildPermissionMatrix,
  buildComponentInventory,
  buildInteractionInventory,
};

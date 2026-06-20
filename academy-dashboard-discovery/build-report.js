#!/usr/bin/env node
"use strict";

/**
 * build-report.js
 *
 * Generates a SINGLE self-contained, offline-friendly HTML report from the
 * per-role crawl output produced by the academy dashboard discovery crawler.
 *
 * Entry point:  node build-report.js
 *
 * Output:       output/combined/report.html
 *
 * The report embeds a trimmed JSON dataset (one entry per discovered page,
 * WITHOUT the huge visibleText blob) in a <script type="application/json">
 * tag. Inline vanilla JS renders:
 *   - a left sidebar of roles -> pages (grouped, collapsible) with a live
 *     search/filter box (filter by role, module, page title, url),
 *   - a main area for the selected page: the full-page screenshot on the LEFT,
 *     a structured report on the RIGHT, and interaction screenshots BELOW,
 *   - a link to the local sanitized HTML snapshot.
 *
 * No external CDN: all CSS + JS are inlined so report.html opens standalone
 * over file://. Screenshot/snapshot references are computed as relative paths
 * from output/combined/ to ../roles/<role>/... so they resolve offline.
 *
 * CommonJS only. Allowed deps only (here: Node builtins + project lib/).
 */

const path = require("path");

const config = require("./lib/config");
const { createLogger } = require("./lib/logger");
const fsUtils = require("./lib/fs-utils");
const roleComparator = require("./lib/role-comparator");

const logger = createLogger("build-report");

// ---------------------------------------------------------------------------
// Small defensive helpers
// ---------------------------------------------------------------------------

/** Coerce any value into a non-null array. */
function asArray(v) {
  return Array.isArray(v) ? v : [];
}

/** Coerce a value to a trimmed string ("" for null/undefined). */
function asStr(v) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

/** Coerce a value to a finite integer (0 fallback). */
function asInt(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Best human-friendly name for a page record. Prefer rec.displayName (a
 * meaningful per-page label another engineer derives because the real <title>
 * is always the brand name "afaaqonline"), then title, then slug, then url.
 * displayName may be absent on the current on-disk data but will be present
 * after the next crawl — code defensively.
 * @param {object} rec
 * @returns {string}
 */
function pageDisplayName(rec) {
  const r = rec || {};
  return (
    asStr(r.displayName) ||
    asStr(r.title) ||
    asStr(r.slug) ||
    asStr(r.url) ||
    "(untitled)"
  );
}

/**
 * Convert a path that is RELATIVE to a role's outputDir (e.g.
 * "screenshots/admin-home-full.png") into a path that is relative to the
 * combined output directory (output/combined/), so links resolve over file://.
 *
 * Role output dir:  <OUTPUT_DIR>/roles/<roleKey>
 * Combined dir:     <OUTPUT_DIR>/combined
 *
 * @param {string} combinedDir - absolute path to output/combined
 * @param {string} roleKey
 * @param {string} relUnderRole - path relative to the role output dir
 * @returns {string} posix-style relative path from combinedDir, or "" if input empty
 */
function roleRelToCombined(combinedDir, roleKey, relUnderRole) {
  const rel = asStr(relUnderRole);
  if (!rel) return "";
  // Normalize any leading "./" and backslashes.
  const cleaned = rel.replace(/\\/g, "/").replace(/^\.\//, "");
  const projectRoot = config.PROJECT_ROOT || path.resolve(__dirname);
  const outputDir = config.OUTPUT_DIR || path.join(projectRoot, "output");
  const absTarget = path.join(outputDir, "roles", roleKey, cleaned);
  return fsUtils.relativePath(combinedDir, absTarget);
}

// ---------------------------------------------------------------------------
// Dataset trimming
// ---------------------------------------------------------------------------

/**
 * Build a trimmed, JSON-serializable page entry for the embedded dataset.
 * Deliberately OMITS visibleText and other heavy fields.
 *
 * @param {object} rec - a full PageRecord
 * @param {string} roleKey
 * @param {string} roleLabel
 * @param {string} combinedDir - absolute path to output/combined
 * @returns {object}
 */
function trimPage(rec, roleKey, roleLabel, combinedDir) {
  const screenshots = rec && rec.screenshots ? rec.screenshots : {};
  const html = rec && rec.html ? rec.html : {};

  // Resolve relative-to-combined link targets (empty string when absent).
  const fullShotRel = roleRelToCombined(combinedDir, roleKey, asStr(screenshots.full));
  const sanitizedRel = roleRelToCombined(combinedDir, roleKey, asStr(html.sanitizedFile));

  const interactions = asArray(rec.interactions).map((it) => {
    const shot = roleRelToCombined(combinedDir, roleKey, asStr(it && it.screenshot));
    return {
      index: asInt(it && it.index),
      type: asStr(it && it.type),
      triggerText: asStr(it && it.triggerText),
      beforeUrl: asStr(it && it.beforeUrl),
      afterUrl: asStr(it && it.afterUrl),
      notes: asStr(it && it.notes),
      screenshot: shot, // relative-to-combined
    };
  });

  const buttons = asArray(rec.buttons).map((b) => {
    const safety = b && b.safety ? b.safety : {};
    return {
      text: asStr(b && b.text),
      ariaLabel: asStr(b && b.ariaLabel),
      title: asStr(b && b.title),
      tagName: asStr(b && b.tagName),
      type: asStr(b && b.type),
      href: asStr(b && b.href),
      safety: {
        safe: Boolean(safety.safe),
        reason: asStr(safety.reason),
        category: asStr(safety.category),
      },
    };
  });

  const forms = asArray(rec.forms).map((f) => ({
    action: asStr(f && f.action),
    method: asStr(f && f.method),
    id: asStr(f && f.id),
    name: asStr(f && f.name),
    fields: asArray(f && f.fields).map((fl) => ({
      tag: asStr(fl && fl.tag),
      type: asStr(fl && fl.type),
      name: asStr(fl && fl.name),
      id: asStr(fl && fl.id),
      label: asStr(fl && fl.label),
      placeholder: asStr(fl && fl.placeholder),
      required: Boolean(fl && fl.required),
    })),
    submitButtons: asArray(f && f.submitButtons).map(asStr).filter(Boolean),
  }));

  const tables = asArray(rec.tables).map((t) => ({
    caption: asStr(t && t.caption),
    headers: asArray(t && t.headers).map(asStr),
    rowCount: asInt(t && t.rowCount),
    columnCount: asInt(t && t.columnCount),
    sampleRows: asArray(t && t.sampleRows)
      .slice(0, 5)
      .map((row) => asArray(row).map(asStr)),
  }));

  const cards = asArray(rec.cards).map((c) => ({
    title: asStr(c && c.title),
    value: asStr(c && c.value),
    text: asStr(c && c.text),
  }));

  const filters = asArray(rec.filters).map((fi) => ({
    type: asStr(fi && fi.type),
    label: asStr(fi && fi.label),
    name: asStr(fi && fi.name),
  }));

  const tabs = asArray(rec.tabs).map((tb) => ({
    text: asStr(tb && tb.text),
    selected: Boolean(tb && tb.selected),
    href: asStr(tb && tb.href),
  }));

  const modals = asArray(rec.modals).map((m) => ({
    title: asStr(m && m.title),
    triggerText: asStr(m && m.triggerText),
    buttons: asArray(m && m.buttons).map(asStr).filter(Boolean),
    fields: asArray(m && m.fields).map(asStr).filter(Boolean),
    text: asStr(m && m.text),
    screenshot: roleRelToCombined(combinedDir, roleKey, asStr(m && m.screenshot)),
  }));

  const headings = asArray(rec.headings).map((h) => ({
    level: asInt(h && h.level) || 1,
    text: asStr(h && h.text),
  }));

  const unsafeSkipped = asArray(rec.unsafeSkipped).map((u) => ({
    text: asStr(u && u.text),
    reason: asStr(u && u.reason),
    category: asStr(u && u.category),
  }));

  const failed = asArray(rec.failed).map((f) => ({
    text: asStr(f && f.text),
    error: asStr(f && f.error),
  }));

  // Discovered link counts (we omit full link lists to keep payload small).
  const linkCounts = {
    sidebar: asArray(rec.sidebarLinks).length,
    header: asArray(rec.headerLinks).length,
    footer: asArray(rec.footerLinks).length,
    internal: asArray(rec.internalLinks).length,
    external: asArray(rec.externalLinks).length,
    pagination: asArray(rec.paginationLinks).length,
  };

  // Rebuild notes: derived neutral UX observations (the .md report carries the
  // full prose; here we surface a few computed cues plus any breadcrumb trail).
  const rebuildNotes = buildRebuildNotes(rec);

  return {
    role: roleKey,
    roleLabel,
    title: pageDisplayName(rec),
    url: asStr(rec.url),
    normalizedRoute: asStr(rec.normalizedRoute),
    slug: asStr(rec.slug),
    modules: asArray(rec.modules).map(asStr).filter(Boolean),
    dir: asStr(rec.dir) || "ltr",
    isRTL: Boolean(rec.isRTL),
    discoveryStatus: asStr(rec.discoveryStatus) || "visited",
    breadcrumbs: asArray(rec.breadcrumbs).map(asStr).filter(Boolean),
    screenshotFull: fullShotRel,
    sanitizedHtml: sanitizedRel,
    headings,
    buttons,
    forms,
    tables,
    cards,
    filters,
    tabs,
    modals,
    interactions,
    unsafeSkipped,
    failed,
    linkCounts,
    rebuildNotes,
  };
}

/**
 * Derive a few neutral, computed "rebuild notes" cues from a record. These are
 * observations about structure/density to help inform a fresh rebuild — never
 * a copy of proprietary content.
 *
 * @param {object} rec
 * @returns {string[]}
 */
function buildRebuildNotes(rec) {
  const notes = [];
  const dir = asStr(rec.dir) || (rec.isRTL ? "rtl" : "ltr");
  notes.push(
    `Layout direction is ${dir.toUpperCase()}${rec.isRTL ? " (RTL — mirror layout, align start to the right)." : "."}`
  );

  const tableCount = asArray(rec.tables).length;
  if (tableCount > 0) {
    const cols = asArray(rec.tables)
      .map((t) => asInt(t && t.columnCount))
      .filter((n) => n > 0);
    const maxCols = cols.length ? Math.max(...cols) : 0;
    notes.push(
      `${tableCount} data table(s) present (up to ${maxCols} columns) — consider responsive/virtualized tables with sort + filter.`
    );
  }

  const cardCount = asArray(rec.cards).length;
  if (cardCount > 0) {
    notes.push(`${cardCount} KPI/stat card(s) — group into a responsive summary grid at the top.`);
  }

  const filterCount = asArray(rec.filters).length;
  if (filterCount > 0) {
    notes.push(`${filterCount} filter control(s) — provide a consolidated, debounced filter bar.`);
  }

  const tabCount = asArray(rec.tabs).length;
  if (tabCount > 0) {
    notes.push(`${tabCount} tab(s) — keep tab state in the URL for deep-linking.`);
  }

  const formCount = asArray(rec.forms).length;
  if (formCount > 0) {
    notes.push(`${formCount} form(s) — add inline validation and clear required-field affordances.`);
  }

  const modalCount = asArray(rec.modals).length;
  if (modalCount > 0) {
    notes.push(`${modalCount} modal/dialog interaction(s) observed — ensure focus-trap + Escape-to-close + ARIA roles.`);
  }

  const unsafeCount = asArray(rec.unsafeSkipped).length;
  if (unsafeCount > 0) {
    notes.push(
      `${unsafeCount} mutating/destructive control(s) detected — gate behind confirmation + permission checks in the rebuild.`
    );
  }

  return notes;
}

// ---------------------------------------------------------------------------
// HTML assembly
// ---------------------------------------------------------------------------

/**
 * Escape a string for safe embedding inside an HTML text node / attribute.
 * @param {string} s
 * @returns {string}
 */
function escapeHtml(s) {
  return asStr(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Serialize the dataset for the embedded <script type="application/json">.
 * We escape the closing tag sequence so it cannot break out of the script.
 * @param {object} dataset
 * @returns {string}
 */
function serializeDataset(dataset) {
  // Note: U+2028 (line separator) and U+2029 (paragraph separator) are valid in
  // JSON strings but break inline <script>, so escape them. We build the
  // separator strings via char codes to avoid embedding raw separators in source.
  const LS = String.fromCharCode(0x2028);
  const PS = String.fromCharCode(0x2029);
  return JSON.stringify(dataset)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .split(LS)
    .join("\\u2028")
    .split(PS)
    .join("\\u2029");
}

/** Inline stylesheet (no external CDN). */
function buildCss() {
  return `
:root{
  --bg:#0f1419; --panel:#161c24; --panel-2:#1c242e; --border:#2a3441;
  --text:#e6edf3; --muted:#8b98a5; --accent:#4c9aff; --accent-2:#2f6fd6;
  --safe:#2ea043; --unsafe:#e5534b; --warn:#d29922; --chip:#243240;
  --shadow:0 2px 8px rgba(0,0,0,.35);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;height:100%}
body{
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,
    "Noto Sans Arabic","Segoe UI Arabic",sans-serif;
  background:var(--bg); color:var(--text); font-size:14px; line-height:1.5;
}
a{color:var(--accent); text-decoration:none}
a:hover{text-decoration:underline}
.app{display:flex; height:100vh; overflow:hidden}

/* Sidebar */
.sidebar{
  width:340px; min-width:280px; max-width:48vw; flex:0 0 auto;
  background:var(--panel); border-right:1px solid var(--border);
  display:flex; flex-direction:column; height:100%;
}
.sidebar .brand{padding:14px 16px; border-bottom:1px solid var(--border)}
.sidebar .brand h1{font-size:15px; margin:0 0 2px}
.sidebar .brand .sub{color:var(--muted); font-size:12px}
.search-wrap{padding:10px 12px; border-bottom:1px solid var(--border)}
.search-wrap input{
  width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);
  background:var(--panel-2); color:var(--text); font-size:13px; outline:none;
}
.search-wrap input:focus{border-color:var(--accent)}
.search-meta{color:var(--muted); font-size:11px; margin-top:6px}
.nav{overflow-y:auto; flex:1 1 auto; padding:6px 6px 24px}
.role-group{margin:4px 0}
.role-head{
  display:flex; align-items:center; gap:8px; padding:8px 10px; cursor:pointer;
  border-radius:6px; user-select:none; font-weight:600;
}
.role-head:hover{background:var(--panel-2)}
.role-head .caret{transition:transform .15s; color:var(--muted); font-size:11px}
.role-group.collapsed .caret{transform:rotate(-90deg)}
.role-head .count{margin-inline-start:auto; color:var(--muted); font-weight:400; font-size:12px}
.role-pages{margin:2px 0 6px}
.role-group.collapsed .role-pages{display:none}
.page-item{
  display:block; padding:6px 10px 6px 28px; border-radius:6px; cursor:pointer;
  color:var(--text); font-size:13px; border-inline-start:2px solid transparent;
}
.page-item:hover{background:var(--panel-2)}
.page-item.active{background:var(--accent-2); color:#fff; border-inline-start-color:var(--accent)}
.page-item .pi-title{display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
.page-item .pi-url{display:block; color:var(--muted); font-size:11px; overflow:hidden;
  text-overflow:ellipsis; white-space:nowrap}
.page-item.active .pi-url{color:#dbe7ff}
.page-item.hidden,.role-group.hidden{display:none}

/* Main */
.main{flex:1 1 auto; overflow-y:auto; height:100%; padding:18px 22px 60px}
.empty-state{color:var(--muted); padding:40px; text-align:center}
.page-head h2{margin:0 0 4px; font-size:20px}
.page-head .url-line{color:var(--muted); font-size:12px; word-break:break-all; margin-bottom:8px}
.chips{display:flex; flex-wrap:wrap; gap:6px; margin:6px 0 14px}
.chip{
  background:var(--chip); border:1px solid var(--border); color:var(--text);
  padding:2px 9px; border-radius:999px; font-size:11px; white-space:nowrap;
}
.chip.status{background:#13301c; border-color:#1f5130; color:#7ee2a0}
.chip.dir{background:#2a2440; border-color:#473b73; color:#c4b6ff}

.split{display:flex; gap:20px; align-items:flex-start}
.col-shot{flex:0 0 46%; max-width:46%; position:sticky; top:0}
.col-report{flex:1 1 auto; min-width:0}
@media (max-width:1100px){
  .split{flex-direction:column}
  .col-shot{position:static; flex-basis:auto; max-width:100%; width:100%}
}
.shot-frame{
  border:1px solid var(--border); border-radius:8px; overflow:hidden;
  background:var(--panel); box-shadow:var(--shadow);
}
.shot-frame img{display:block; width:100%; height:auto}
.shot-missing{
  padding:36px 16px; text-align:center; color:var(--muted); font-size:13px;
  border:1px dashed var(--border); border-radius:8px; background:var(--panel);
}
.shot-actions{margin-top:10px; display:flex; flex-wrap:wrap; gap:10px; font-size:12px}

section.block{
  background:var(--panel); border:1px solid var(--border); border-radius:8px;
  padding:12px 14px; margin-bottom:14px;
}
section.block > h3{
  margin:0 0 10px; font-size:13px; text-transform:uppercase; letter-spacing:.04em;
  color:var(--muted); border-bottom:1px solid var(--border); padding-bottom:6px;
}
section.block h3 .n{color:var(--accent); margin-inline-start:6px}
ul.clean{margin:0; padding-inline-start:18px}
ul.clean li{margin:2px 0}
.kv{display:grid; grid-template-columns:max-content 1fr; gap:4px 12px}
.kv dt{color:var(--muted)}
.kv dd{margin:0; word-break:break-word}

table.data{border-collapse:collapse; width:100%; font-size:12px; margin:6px 0}
table.data th,table.data td{
  border:1px solid var(--border); padding:4px 7px; text-align:start; vertical-align:top;
}
table.data th{background:var(--panel-2); color:var(--muted); font-weight:600}
.tag-safe{color:var(--safe)}
.tag-unsafe{color:var(--unsafe)}
.cat{font-size:11px; color:var(--muted)}

.kpi-grid{display:flex; flex-wrap:wrap; gap:10px}
.kpi{
  background:var(--panel-2); border:1px solid var(--border); border-radius:8px;
  padding:8px 12px; min-width:120px;
}
.kpi .kpi-val{font-size:18px; font-weight:700}
.kpi .kpi-title{font-size:11px; color:var(--muted)}

.inter-shots{display:flex; flex-wrap:wrap; gap:14px; margin-top:6px}
.inter-card{
  border:1px solid var(--border); border-radius:8px; overflow:hidden; width:280px;
  background:var(--panel-2);
}
.inter-card img{display:block; width:100%; height:auto}
.inter-card .cap{padding:6px 8px; font-size:11px}
.inter-card .cap .t{display:block; color:var(--accent); font-weight:600}
.inter-card .cap .x{color:var(--muted)}
.inter-missing{padding:18px; text-align:center; color:var(--muted); font-size:12px}

.note-list li{color:var(--text)}
.muted{color:var(--muted)}
.badge-count{
  display:inline-block; background:var(--chip); border:1px solid var(--border);
  border-radius:6px; padding:1px 8px; margin:2px; font-size:12px;
}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:11px}
[dir="rtl"] .page-item{padding:6px 28px 6px 10px}
`;
}

/** Inline client-side renderer script (vanilla JS, no deps). */
function buildClientJs() {
  // NOTE: kept as a single template string; it is rendered verbatim into the
  // page. Uses only DOM APIs available offline.
  return String.raw`
(function(){
  "use strict";
  var DATA = [];
  try{
    var raw = document.getElementById("dataset").textContent;
    DATA = JSON.parse(raw);
  }catch(e){ DATA = []; }

  // Index pages by a stable id.
  DATA.forEach(function(p, i){ p.__id = i; });

  var nav = document.getElementById("nav");
  var main = document.getElementById("main");
  var searchInput = document.getElementById("search");
  var searchMeta = document.getElementById("searchMeta");

  function esc(s){
    s = (s==null)?"":String(s);
    return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function el(tag, attrs, html){
    var n = document.createElement(tag);
    if(attrs){ for(var k in attrs){ if(attrs[k]!=null) n.setAttribute(k, attrs[k]); } }
    if(html!=null) n.innerHTML = html;
    return n;
  }

  // ---- Build sidebar grouped by role ----
  var rolesOrder = [];
  var byRole = {};
  DATA.forEach(function(p){
    if(!byRole[p.role]){ byRole[p.role] = {label:p.roleLabel||p.role, pages:[]}; rolesOrder.push(p.role); }
    byRole[p.role].pages.push(p);
  });

  function buildNav(){
    nav.innerHTML = "";
    rolesOrder.forEach(function(roleKey){
      var grp = byRole[roleKey];
      var groupEl = el("div", {"class":"role-group", "data-role":roleKey});
      var head = el("div", {"class":"role-head"});
      head.innerHTML = '<span class="caret">&#9662;</span>' +
        '<span class="role-label">'+esc(grp.label)+'</span>' +
        '<span class="count">'+grp.pages.length+'</span>';
      head.addEventListener("click", function(){ groupEl.classList.toggle("collapsed"); });
      groupEl.appendChild(head);

      var pagesEl = el("div", {"class":"role-pages"});
      grp.pages.forEach(function(p){
        var item = el("a", {"class":"page-item", "data-id":String(p.__id), "href":"javascript:void(0)"});
        item.innerHTML = '<span class="pi-title">'+esc(p.title)+'</span>' +
                         '<span class="pi-url">'+esc(p.normalizedRoute || p.url)+'</span>';
        item.addEventListener("click", function(){ selectPage(p.__id); });
        pagesEl.appendChild(item);
      });
      groupEl.appendChild(pagesEl);
      nav.appendChild(groupEl);
    });
  }

  // ---- Search / filter ----
  function applyFilter(){
    var q = (searchInput.value||"").toLowerCase().trim();
    var terms = q.split(/\s+/).filter(Boolean);
    var shown = 0, total = DATA.length;
    DATA.forEach(function(p){
      var hay = (p.role+" "+(p.roleLabel||"")+" "+(p.title||"")+" "+(p.url||"")+" "+
                 (p.normalizedRoute||"")+" "+(p.modules||[]).join(" ")).toLowerCase();
      var match = terms.every(function(t){ return hay.indexOf(t) !== -1; });
      var item = nav.querySelector('.page-item[data-id="'+p.__id+'"]');
      if(item){ item.classList.toggle("hidden", !match); }
      if(match) shown++;
    });
    // Hide empty role groups; update counts.
    rolesOrder.forEach(function(roleKey){
      var groupEl = nav.querySelector('.role-group[data-role="'+roleKey+'"]');
      if(!groupEl) return;
      var visible = groupEl.querySelectorAll('.page-item:not(.hidden)').length;
      groupEl.classList.toggle("hidden", visible===0);
      var c = groupEl.querySelector('.count');
      if(c) c.textContent = visible;
    });
    searchMeta.textContent = shown + " / " + total + " page" + (total===1?"":"s") + " shown";
  }

  // ---- Render a section helper ----
  function section(title, count, bodyHtml){
    var n = (count==null) ? "" : ' <span class="n">'+count+'</span>';
    return '<section class="block"><h3>'+esc(title)+n+'</h3>'+bodyHtml+'</section>';
  }

  function renderHeadings(p){
    if(!p.headings || !p.headings.length) return "";
    var rows = p.headings.map(function(h){
      return '<li><span class="muted">H'+(h.level||1)+'</span> '+esc(h.text)+'</li>';
    }).join("");
    return section("Headings", p.headings.length, '<ul class="clean">'+rows+'</ul>');
  }

  function renderButtons(p){
    if(!p.buttons || !p.buttons.length) return "";
    var rows = p.buttons.map(function(b){
      var lbl = b.text || b.ariaLabel || b.title || "(no label)";
      var safe = b.safety && b.safety.safe;
      var cls = safe ? "tag-safe" : "tag-unsafe";
      var word = safe ? "safe" : "UNSAFE";
      var cat = (b.safety && b.safety.category) ? b.safety.category : "";
      return '<tr><td>'+esc(lbl)+'</td><td class="mono">'+esc(b.tagName||"")+
             (b.type?("/"+esc(b.type)):"")+'</td>'+
             '<td class="'+cls+'">'+word+'</td><td class="cat">'+esc(cat)+'</td></tr>';
    }).join("");
    return section("Buttons / Actions", p.buttons.length,
      '<table class="data"><thead><tr><th>Label</th><th>Element</th><th>Safety</th><th>Category</th></tr></thead>'+
      '<tbody>'+rows+'</tbody></table>');
  }

  function renderForms(p){
    if(!p.forms || !p.forms.length) return "";
    var blocks = p.forms.map(function(f, idx){
      var head = '<div class="muted">Form '+(idx+1)+
        (f.name?(' · '+esc(f.name)):'')+
        (f.method?(' · '+esc(f.method.toUpperCase())):'')+'</div>';
      var fields = (f.fields||[]).map(function(fl){
        var name = fl.label || fl.name || fl.placeholder || fl.id || "(field)";
        var req = fl.required ? ' <span class="tag-unsafe">required</span>' : '';
        return '<tr><td>'+esc(name)+'</td><td class="mono">'+esc(fl.tag||"")+
               (fl.type?("/"+esc(fl.type)):"")+'</td><td>'+req+'</td></tr>';
      }).join("");
      var tbl = fields ? ('<table class="data"><thead><tr><th>Field</th><th>Type</th><th></th></tr></thead><tbody>'+fields+'</tbody></table>') : '<div class="muted">No fields captured.</div>';
      return '<div style="margin-bottom:10px">'+head+tbl+'</div>';
    }).join("");
    return section("Forms / Fields", p.forms.length, blocks);
  }

  function renderTables(p){
    if(!p.tables || !p.tables.length) return "";
    var blocks = p.tables.map(function(t, idx){
      var cap = t.caption ? esc(t.caption) : ('Table '+(idx+1));
      var meta = '<div class="muted" style="margin-bottom:4px">'+cap+' · '+
        (t.rowCount||0)+' rows · '+(t.columnCount|| (t.headers?t.headers.length:0))+' cols</div>';
      var heads = (t.headers||[]).map(function(h){ return '<th>'+esc(h)+'</th>'; }).join("");
      var rows = (t.sampleRows||[]).map(function(r){
        return '<tr>'+(r||[]).map(function(c){ return '<td>'+esc(c)+'</td>'; }).join("")+'</tr>';
      }).join("");
      var thead = heads ? '<thead><tr>'+heads+'</tr></thead>' : '';
      var tbody = rows ? '<tbody>'+rows+'</tbody>' : '';
      var tbl = (heads||rows) ? ('<table class="data">'+thead+tbody+'</table>') : '<div class="muted">No sample rows.</div>';
      return '<div style="margin-bottom:10px">'+meta+tbl+'</div>';
    }).join("");
    return section("Tables / Columns", p.tables.length, blocks);
  }

  function renderCards(p){
    if(!p.cards || !p.cards.length) return "";
    var items = p.cards.map(function(c){
      var val = c.value || "";
      var ttl = c.title || c.text || "";
      return '<div class="kpi"><div class="kpi-val">'+esc(val||"—")+'</div>'+
             '<div class="kpi-title">'+esc(ttl)+'</div></div>';
    }).join("");
    return section("Cards / KPIs", p.cards.length, '<div class="kpi-grid">'+items+'</div>');
  }

  function renderFilters(p){
    if(!p.filters || !p.filters.length) return "";
    var items = p.filters.map(function(f){
      var l = f.label || f.name || f.type || "filter";
      return '<span class="badge-count">'+esc(l)+(f.type?(' · '+esc(f.type)):'')+'</span>';
    }).join("");
    return section("Filters", p.filters.length, items);
  }

  function renderTabs(p){
    if(!p.tabs || !p.tabs.length) return "";
    var items = p.tabs.map(function(t){
      var sel = t.selected ? ' <span class="tag-safe">(selected)</span>' : '';
      return '<span class="badge-count">'+esc(t.text||"(tab)")+sel+'</span>';
    }).join("");
    return section("Tabs", p.tabs.length, items);
  }

  function renderModals(p){
    if(!p.modals || !p.modals.length) return "";
    var blocks = p.modals.map(function(m){
      var head = '<div class="muted">'+esc(m.title||m.triggerText||"Modal")+'</div>';
      var btns = (m.buttons&&m.buttons.length) ? ('<div>Buttons: '+m.buttons.map(esc).join(", ")+'</div>') : '';
      var flds = (m.fields&&m.fields.length) ? ('<div>Fields: '+m.fields.map(esc).join(", ")+'</div>') : '';
      var shot = m.screenshot ? ('<div style="margin-top:6px"><a href="'+esc(m.screenshot)+'" target="_blank">open screenshot</a></div>') : '';
      return '<div style="margin-bottom:8px">'+head+btns+flds+shot+'</div>';
    }).join("");
    return section("Modals / Dialogs", p.modals.length, blocks);
  }

  function renderInteractions(p){
    if(!p.interactions || !p.interactions.length) return "";
    var rows = p.interactions.map(function(it){
      return '<tr><td class="mono">'+esc(it.type||"")+'</td><td>'+esc(it.triggerText||"")+
             '</td><td>'+esc(it.notes||"")+'</td></tr>';
    }).join("");
    return section("Interactions", p.interactions.length,
      '<table class="data"><thead><tr><th>Type</th><th>Trigger</th><th>Notes</th></tr></thead><tbody>'+rows+'</tbody></table>');
  }

  function renderUnsafe(p){
    if(!p.unsafeSkipped || !p.unsafeSkipped.length) return "";
    var rows = p.unsafeSkipped.map(function(u){
      return '<tr><td>'+esc(u.text||"")+'</td><td class="cat">'+esc(u.category||"")+
             '</td><td class="muted">'+esc(u.reason||"")+'</td></tr>';
    }).join("");
    return section("Unsafe Controls (skipped — not clicked)", p.unsafeSkipped.length,
      '<table class="data"><thead><tr><th>Label</th><th>Category</th><th>Reason</th></tr></thead><tbody>'+rows+'</tbody></table>');
  }

  function renderFailed(p){
    if(!p.failed || !p.failed.length) return "";
    var rows = p.failed.map(function(f){
      return '<tr><td>'+esc(f.text||"")+'</td><td class="muted">'+esc(f.error||"")+'</td></tr>';
    }).join("");
    return section("Failed Interactions", p.failed.length,
      '<table class="data"><thead><tr><th>Trigger</th><th>Error</th></tr></thead><tbody>'+rows+'</tbody></table>');
  }

  function renderLinkCounts(p){
    var c = p.linkCounts || {};
    var items = [
      ["Sidebar", c.sidebar], ["Header", c.header], ["Footer", c.footer],
      ["Internal", c.internal], ["External", c.external], ["Pagination", c.pagination]
    ].map(function(pair){
      return '<span class="badge-count">'+pair[0]+': '+(pair[1]||0)+'</span>';
    }).join("");
    return section("Discovered Links", null, items);
  }

  function renderRebuild(p){
    if(!p.rebuildNotes || !p.rebuildNotes.length) return "";
    var rows = p.rebuildNotes.map(function(n){ return '<li>'+esc(n)+'</li>'; }).join("");
    return section("Rebuild Notes", null, '<ul class="clean note-list">'+rows+'</ul>');
  }

  function renderInteractionShots(p){
    var shots = (p.interactions||[]).filter(function(it){ return it.screenshot; });
    if(!shots.length) return "";
    var cards = shots.map(function(it){
      return '<div class="inter-card">' +
        '<img loading="lazy" src="'+esc(it.screenshot)+'" alt="interaction screenshot" '+
        'onerror="this.parentNode.innerHTML=\'<div class=&quot;inter-missing&quot;>screenshot missing</div>\'">' +
        '<div class="cap"><span class="t">'+esc(it.type||"interaction")+'</span>'+
        '<span class="x">'+esc(it.triggerText||"")+'</span></div></div>';
    }).join("");
    return '<section class="block"><h3>Interaction Screenshots <span class="n">'+shots.length+'</span></h3>'+
           '<div class="inter-shots">'+cards+'</div></section>';
  }

  // ---- Render full page detail ----
  function renderPage(p){
    var chips = [];
    (p.modules||[]).forEach(function(m){ chips.push('<span class="chip">'+esc(m)+'</span>'); });
    chips.push('<span class="chip status">'+esc(p.discoveryStatus||"visited")+'</span>');
    chips.push('<span class="chip dir">'+esc((p.dir||"ltr").toUpperCase())+(p.isRTL?' · RTL':'')+'</span>');

    var bc = (p.breadcrumbs&&p.breadcrumbs.length) ?
      ('<div class="url-line">'+p.breadcrumbs.map(esc).join(" &rsaquo; ")+'</div>') : '';

    var head = '<div class="page-head">'+
      '<h2>'+esc(p.title)+'</h2>'+
      '<div class="url-line">'+esc(p.url||"")+'</div>'+
      bc +
      '<div class="chips">'+chips.join("")+'</div></div>';

    // Left: screenshot
    var shotHtml;
    if(p.screenshotFull){
      shotHtml = '<div class="shot-frame"><img src="'+esc(p.screenshotFull)+'" alt="full page screenshot of '+esc(p.title)+'" '+
        'onerror="this.parentNode.outerHTML=&quot;<div class=\\&quot;shot-missing\\&quot;>Screenshot file not found.<br><span class=\\&quot;mono\\&quot;>'+esc(p.screenshotFull)+'</span></div>&quot;"></div>';
    }else{
      shotHtml = '<div class="shot-missing">No screenshot captured for this page.</div>';
    }
    var actions = [];
    if(p.sanitizedHtml){
      actions.push('<a href="'+esc(p.sanitizedHtml)+'" target="_blank">Open offline HTML snapshot &#8599;</a>');
    }else{
      actions.push('<span class="muted">No sanitized HTML snapshot.</span>');
    }
    if(p.screenshotFull){
      actions.push('<a href="'+esc(p.screenshotFull)+'" target="_blank">Open screenshot &#8599;</a>');
    }
    var shotCol = '<div class="col-shot">'+shotHtml+'<div class="shot-actions">'+actions.join("")+'</div></div>';

    // Right: structured report
    var report =
      renderHeadings(p) +
      renderButtons(p) +
      renderForms(p) +
      renderTables(p) +
      renderCards(p) +
      renderFilters(p) +
      renderTabs(p) +
      renderModals(p) +
      renderInteractions(p) +
      renderUnsafe(p) +
      renderFailed(p) +
      renderLinkCounts(p) +
      renderRebuild(p);
    if(!report) report = '<section class="block"><div class="muted">No structured components captured for this page.</div></section>';
    var reportCol = '<div class="col-report">'+report+'</div>';

    var belowShots = renderInteractionShots(p);

    main.setAttribute("dir", p.isRTL ? "rtl" : "ltr");
    main.innerHTML = head + '<div class="split">'+shotCol+reportCol+'</div>' + belowShots;
    main.scrollTop = 0;
  }

  function selectPage(id){
    var p = DATA[id];
    if(!p) return;
    var items = nav.querySelectorAll('.page-item');
    for(var i=0;i<items.length;i++){ items[i].classList.remove("active"); }
    var active = nav.querySelector('.page-item[data-id="'+id+'"]');
    if(active){
      active.classList.add("active");
      var grp = active.closest(".role-group");
      if(grp) grp.classList.remove("collapsed");
    }
    renderPage(p);
    try{ history.replaceState(null,"","#page-"+id); }catch(e){}
  }

  // ---- Init ----
  buildNav();
  searchInput.addEventListener("input", applyFilter);
  applyFilter();

  if(DATA.length){
    var startId = 0;
    var m = (location.hash||"").match(/page-(\d+)/);
    if(m){ var hid = parseInt(m[1],10); if(DATA[hid]) startId = hid; }
    selectPage(startId);
  }else{
    main.innerHTML = '<div class="empty-state">No crawl data found.<br>'+
      'Run the crawler first (crawl-all-roles.js) to populate output/roles/.</div>';
  }
})();
`;
}

/**
 * Assemble the full HTML document.
 * @param {object} dataset - { pages: [...], generatedAt, totals }
 * @returns {string}
 */
function buildHtml(dataset) {
  const json = serializeDataset(dataset.pages);
  const css = buildCss();
  const js = buildClientJs();
  const generatedAt = escapeHtml(dataset.generatedAt);
  const totalPages = dataset.pages.length;
  const totalRoles = dataset.totals.roles;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Academy Dashboard Discovery — Report</title>
<style>
${css}
</style>
</head>
<body>
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <h1>Dashboard Discovery Report</h1>
      <div class="sub">${totalRoles} role(s) · ${totalPages} page(s) · generated ${generatedAt}</div>
    </div>
    <div class="search-wrap">
      <input id="search" type="search" placeholder="Filter by role, module, title, or URL…" autocomplete="off" spellcheck="false">
      <div id="searchMeta" class="search-meta"></div>
    </div>
    <nav id="nav" class="nav" aria-label="Pages"></nav>
  </aside>
  <main id="main" class="main">
    <div class="empty-state">Select a page from the left to view its report.</div>
  </main>
</div>
<script id="dataset" type="application/json">${json}</script>
<script>
${js}
</script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  config.loadEnv();

  const projectRoot = config.PROJECT_ROOT || path.resolve(__dirname);
  const outputDir = config.OUTPUT_DIR || path.join(projectRoot, "output");
  const combinedDir = path.join(outputDir, "combined");
  const reportFile = path.join(combinedDir, "report.html");

  // Resolve the role keys from roles.config.json.
  let roleKeys = [];
  try {
    roleKeys = asArray(config.loadRoles())
      .map((r) => asStr(r && r.key))
      .filter(Boolean);
  } catch (err) {
    logger.error("Failed to load roles.config.json — defaulting to known roles.", err);
    roleKeys = ["admin", "teacher", "family"];
  }

  logger.step(`Loading crawl data for ${roleKeys.length} role(s): ${roleKeys.join(", ")}`);

  let allData = {};
  try {
    allData = roleComparator.loadAllRoleData(roleKeys) || {};
  } catch (err) {
    logger.error("loadAllRoleData failed.", err);
    allData = {};
  }

  const loadedRoleKeys = Object.keys(allData);
  if (loadedRoleKeys.length === 0) {
    logger.warn("No role output found on disk. Writing an empty report shell.");
  }

  // Build the trimmed dataset (one entry per page across all loaded roles).
  const pages = [];
  for (const roleKey of loadedRoleKeys) {
    const entry = allData[roleKey] || {};
    const role = entry.role || {};
    const roleLabel = asStr(role.label) || roleKey;
    const records = asArray(entry.records);

    // Sort records by normalizedRoute for stable, readable ordering.
    const sorted = records
      .filter((r) => r && typeof r === "object")
      .sort((a, b) =>
        asStr(a.normalizedRoute || a.url).localeCompare(
          asStr(b.normalizedRoute || b.url)
        )
      );

    for (const rec of sorted) {
      try {
        pages.push(trimPage(rec, roleKey, roleLabel, combinedDir));
      } catch (err) {
        logger.error(
          `Failed to process a page record for role "${roleKey}" — skipping it.`,
          err
        );
      }
    }
    logger.info(`Role "${roleKey}": ${sorted.length} page(s) included.`);
  }

  const dataset = {
    pages,
    generatedAt: new Date().toISOString().replace("T", " ").replace(/\..+$/, "Z"),
    totals: {
      roles: loadedRoleKeys.length,
      pages: pages.length,
    },
  };

  const html = buildHtml(dataset);

  try {
    fsUtils.writeText(reportFile, html);
  } catch (err) {
    logger.error(`Failed to write report to ${reportFile}`, err);
    process.exitCode = 1;
    return;
  }

  logger.success(
    `Report written: ${reportFile} (${dataset.totals.roles} role(s), ${dataset.totals.pages} page(s)).`
  );
  logger.info("Open it directly in a browser over file:// — it is fully self-contained.");
}

if (require.main === module) {
  main();
}

module.exports = { main };

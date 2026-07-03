/* Smoke tests: no raw i18n keys · no external (CDN) requests · no dead buttons
 * (every control gives feedback) · disabled-with-reason · keyboard reachability.
 * Exits non-zero on any failure. */
const { chromium } = require('playwright');
const { PORT } = require('../../scripts/serve.cjs');

const BASE = `http://localhost:${PORT}`;
const PAGES = ['dashboard', 'reports', 'finance', 'gallery', 'sessions', 'schedule', 'students', 'teachers', 'courses', 'settings',
  'families', 'add-family', 'family', 'student', 'attendance', 'groups', 'course', 'group', 'teacher', 'teacher-performance',
  'portals', 'student-portal', 'family-portal', 'teacher-portal'];

// Spec 012 — the role-portal surface (portal shell, not the admin shell). Admin-shell
// assertions are scoped to admin pages; portal pages get their own block below. The
// future-role portal-ABSENCE assertion stays enforced verbatim on every ADMIN page.
const PORTAL_PAGES = new Set(['portals', 'student-portal', 'family-portal', 'teacher-portal']);
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

// Spec 010 — the set of built page files, for the link-integrity crawl (a link must
// target one of these, an in-page hash, or be a documented hash-view).
const VALID_FILES = new Set();
for (const b of PAGES) { VALID_FILES.add(`${b}.html`); VALID_FILES.add(`${b}.en.html`); }
VALID_FILES.add('index.html');

// Spec 010 — the sessions badge must equal the authored fixture total (nav-IA contract §5:
// derived, not a hard-coded literal). Read SESSIONS.total from source so the assertion proves
// the tie to the exact fixture the badge derives from (and does not rot if the fixture changes).
const fs = require('fs');
const path = require('path');
const sessSrc = fs.readFileSync(path.join(__dirname, '../../src/js/fixtures/sessions.js'), 'utf8');
const SESSIONS_TOTAL = (sessSrc.match(/export const SESSIONS\s*=\s*\{[\s\S]*?total:\s*(\d+)/) || [])[1] || '';
if (!/^\d+$/.test(SESSIONS_TOTAL)) throw new Error('[smoke] could not extract SESSIONS.total from src/js/fixtures/sessions.js — the badge assertions would be meaningless');

// Spec 010 — pages with a filter form / tiles-as-filters. Each must genuinely hide non-matching
// rows (the [data-row][hidden] fix) AND keep only matching rows visible. `facet`/`value` (lowercased
// to match enhance.js's compare) drive the correctness check; a null facet (schedule's dynamic
// teacher index) is engagement/leak-only, its correctness covered by the per-page schedule block.
const FILTER_SPEC = {
  attendance: { facet: 'outcome', value: 'studentabsent', apply: (p) => p.click('.outcome-tile[data-filter-set="outcome:studentAbsent"]') },
  finance: { facet: 'status', value: 'overdue', apply: (p) => p.click('[data-filter-set="status:overdue"]') },
  sessions: { facet: 'status', value: 'completed', apply: (p) => p.selectOption('select[data-filter="status"]', 'completed') },
  students: { facet: 'status', value: 'active', apply: (p) => p.selectOption('select[data-filter="status"]', 'active') },
  teachers: { facet: 'status', value: 'active', apply: (p) => p.selectOption('select[data-filter="status"]', 'active') },
  courses: { facet: 'status', value: 'active', apply: (p) => p.selectOption('select[data-filter="status"]', 'active') },
  groups: { facet: 'status', value: 'active', apply: (p) => p.selectOption('select[data-filter="status"]', 'active') },
  families: { facet: 'status', value: 'active', apply: (p) => p.selectOption('select[data-filter="status"]', 'active') },
  'teacher-performance': { facet: 'workload', value: 'high', apply: (p) => p.selectOption('select[data-filter="workload"]', 'high') },
  reports: { facet: 'area', value: 'attendance', apply: (p) => p.selectOption('select[data-filter="area"]', 'attendance') },
  schedule: { facet: null, value: null, apply: (p) => p.selectOption('select[data-filter="teacher"]', { index: 1 }) },
};

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

  for (const page of PAGES) {
    for (const lang of ['ar', 'en']) {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      const ext = [];
      p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) ext.push(u); });
      const errs = [];
      p.on('pageerror', (e) => errs.push(e.message));
      const file = lang === 'en' ? `${page}.en.html` : `${page}.html`;
      await p.goto(`${BASE}/${file}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(250);

      const info = await p.evaluate(() => {
        const raw = (document.body.innerText.match(/⟦[^⟧]+⟧/g) || []);
        const disabled = [...document.querySelectorAll('button[disabled],[aria-disabled="true"]')];
        const disabledNoReason = disabled.filter((d) => !d.getAttribute('title') && !d.getAttribute('aria-label')).length;
        const focusables = document.querySelectorAll('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])').length;
        // static HTML-first structure: real shell + content, no whole-page #app mount
        const hasAppMount = !!document.querySelector('#app');
        const hasShell = !!document.querySelector('.app-shell .sidebar') && !!document.querySelector('#page-body');
        // new shell (sidebar-reference.png): slim icon rail + light nav panel + exactly one active item
        const hasRail = !!document.querySelector('.app-shell .sidebar .nav-rail');
        const hasPanel = !!document.querySelector('.app-shell .sidebar .nav-panel');
        const activeNav = document.querySelectorAll('.nav-panel .nav-item.is-active[aria-current="page"]').length;
        // full-IA: no dead nav — anchors need a real href; planned/disabled are <button>s with a coming-soon/reason hook
        const deadNav = [...document.querySelectorAll('.nav-panel .nav-item')].filter((n) => n.tagName === 'A'
          ? (!n.getAttribute('href') || n.getAttribute('href') === '#')
          : (!n.hasAttribute('data-coming-soon') && !n.hasAttribute('data-disabled-reason'))).length;
        // category rail: one tab per category; exactly ONE category panel visible at a time
        const railCats = document.querySelectorAll('.nav-rail .rail-cat[data-nav-category]').length;
        const visiblePanels = [...document.querySelectorAll('.nav-panel .cat-panel')].filter((pn) => !pn.hidden).length;
        // Spec 003 content tabs (List / Timetable): baked panels, exactly one visible
        const contentTabs = document.querySelectorAll('[data-tabs] [role="tab"][data-tab]').length;
        const visibleTabpanels = [...document.querySelectorAll('[data-tabs] [data-tabpanel]')].filter((p) => !p.hidden).length;
        const hasTimetable = !!document.querySelector('[data-tabpanel="timetable"] .timetable[aria-label]');
        // GitHub-Pages: asset refs must be relative
        const absAssets = [...document.querySelectorAll('link[href],script[src]')]
          .map((n) => n.getAttribute('href') || n.getAttribute('src'))
          .filter((u) => u && (u.startsWith('/') || /^https?:/.test(u)));
        // future-role portals must NEVER be rendered (admin app only)
        const portals = ['teacher-portal', 'family-portal', 'student-portal']
          .filter((id) => document.getElementById(id) || document.querySelector(`[data-nav="${id}"]`)).length;
        return { raw, disabledNoReason, focusables, hasAppMount, hasShell, hasRail, hasPanel, activeNav, deadNav, railCats, visiblePanels, contentTabs, visibleTabpanels, hasTimetable, absAssets, portals };
      });

      ok(info.raw.length === 0, `${page}/${lang}: raw i18n keys ${JSON.stringify(info.raw)}`);
      ok(ext.length === 0, `${page}/${lang}: external requests ${JSON.stringify(ext.slice(0, 3))}`);
      ok(errs.length === 0, `${page}/${lang}: page errors ${JSON.stringify(errs.slice(0, 2))}`);
      ok(info.disabledNoReason === 0, `${page}/${lang}: ${info.disabledNoReason} disabled controls without a reason`);
      // portal foundation pages are deliberately action-light (honest few affordances);
      // admin pages keep the original richer threshold
      ok(info.focusables > (PORTAL_PAGES.has(page) ? 3 : 5), `${page}/${lang}: too few focusable elements (${info.focusables})`);
      ok(!info.hasAppMount, `${page}/${lang}: found a whole-page #app mount (must be static HTML-first)`);
      if (!PORTAL_PAGES.has(page)) {
        // ===== ADMIN-shell assertions (all 20 admin bases — unchanged from Specs 001–011) =====
        ok(info.hasShell, `${page}/${lang}: missing static shell/content`);
        ok(info.hasRail, `${page}/${lang}: missing slim icon rail (.nav-rail)`);
        ok(info.hasPanel, `${page}/${lang}: missing light nav panel (.nav-panel)`);
        // every product page marks exactly one active nav item; the dev gallery has none
        ok(info.activeNav === (page === 'gallery' ? 0 : 1), `${page}/${lang}: expected ${page === 'gallery' ? 0 : 1} active nav item, got ${info.activeNav}`);
        ok(info.deadNav === 0, `${page}/${lang}: ${info.deadNav} dead nav item(s) — anchor without route or planned/disabled button without a hook`);
        ok(info.railCats >= 6, `${page}/${lang}: expected ≥6 category tabs in the rail, got ${info.railCats}`);
        ok(info.visiblePanels === 1, `${page}/${lang}: expected exactly ONE category panel visible (not all links at once), got ${info.visiblePanels}`);
        // Spec 012: future-role portal ids must NEVER render inside the ADMIN console
        ok(info.portals === 0, `${page}/${lang}: a future-role portal is rendered in the ADMIN console DOM`);
      }
      // Spec 003: schedule + sessions carry baked List/Timetable content tabs; exactly one panel visible
      const hasTabs = page === 'schedule' || page === 'sessions';
      ok(!hasTabs || info.contentTabs >= 2, `${page}/${lang}: expected ≥2 content tabs (List/Timetable), got ${info.contentTabs}`);
      ok(!hasTabs || info.visibleTabpanels === 1, `${page}/${lang}: expected exactly ONE visible tabpanel, got ${info.visibleTabpanels}`);
      ok(page !== 'schedule' || info.hasTimetable, `${page}/${lang}: schedule is missing the baked timetable grid`);
      ok(info.absAssets.length === 0, `${page}/${lang}: non-relative asset paths ${JSON.stringify(info.absAssets)}`);

      // behavioral no-dead-button: a filter button and a pager must produce feedback
      if (page === 'dashboard') {
        const clickFeedback = async (sel) => {
          const elFound = await p.$(sel);
          if (!elFound) return `selector ${sel} not found`;
          await elFound.click();
          await p.waitForTimeout(120);
          const fb = await p.evaluate(() => !!document.querySelector('.toast,.popover,.modal-scrim'));
          await p.keyboard.press('Escape');
          await p.waitForTimeout(120);
          return fb ? null : `${sel} produced no feedback (dead button)`;
        };
        for (const sel of ['.select-btn', '.pager:not(.is-current)', '[data-action="theme-menu"]',
          '[data-action="apps-grid"]', '[data-action="quick-actions"]', '.nav-item.is-planned']) {
          const r = await clickFeedback(sel);
          ok(!r, `${page}/${lang}: ${r}`);
        }
        // disabled finance nav is aria-disabled (announced disabled to AT) but still fires its reason
        // toast on a real click; Playwright won't auto-click an aria-disabled node, so dispatch directly.
        const dis = await p.$('.nav-item.is-disabled');
        if (dis) {
          await dis.evaluate((el) => el.click());
          await p.waitForTimeout(120);
          const fb = await p.evaluate(() => !!document.querySelector('.toast'));
          await p.keyboard.press('Escape');
          ok(fb, `${page}/${lang}: disabled nav item produced no reason feedback`);
        }
        // category switching: clicking a rail category shows ONLY that category's panel (not all links)
        const railFam = await p.$('.rail-cat[data-nav-category="families"]');
        if (railFam) {
          await railFam.click();
          await p.waitForTimeout(160);
          const okSwitch = await p.evaluate(() => {
            const vis = [...document.querySelectorAll('.nav-panel .cat-panel')].filter((pn) => !pn.hidden);
            return vis.length === 1 && vis[0].getAttribute('data-nav-panel') === 'families';
          });
          ok(okSwitch, `${page}/${lang}: clicking the families rail category did not switch to ONLY the families panel`);
        }
      }

      // behavioral: filtering narrows rows + preview drawer opens (Spec 002 patterns)
      if (page === 'sessions') {
        const visible = () => p.$$eval('#sessions-table [data-row]', (els) => els.filter((e) => !e.hidden).length);
        const before = await visible();
        await p.selectOption('select[data-filter="status"]', 'completed').catch(() => {});
        await p.waitForTimeout(150);
        const after = await visible();
        ok(after > 0 && after < before, `${page}/${lang}: status filter did not narrow rows (${before} → ${after})`);
        await p.selectOption('select[data-filter="status"]', 'all').catch(() => {});
        await p.waitForTimeout(100);
        const kebab = await p.$('[data-row-menu]');
        if (kebab) { await kebab.click(); await p.waitForTimeout(120); const v = await p.$('.popover [data-drawer]'); if (v) { await v.click(); await p.waitForTimeout(220); } }
        const sheet = await p.evaluate(() => !!document.querySelector('.drawer.sheet'));
        ok(sheet, `${page}/${lang}: session preview drawer did not open`);
        await p.keyboard.press('Escape');
      }

      // behavioral: Schedule tabs (List↔Timetable), timetable block → drawer, teacher lens (Spec 003)
      if (page === 'schedule') {
        await p.click('[data-tab="timetable"]');
        await p.waitForTimeout(170);
        const ttOk = await p.evaluate(() => {
          const vis = [...document.querySelectorAll('[data-tabs] [data-tabpanel]')].filter((x) => !x.hidden);
          return vis.length === 1 && vis[0].getAttribute('data-tabpanel') === 'timetable' && !!vis[0].querySelector('.timetable .tt-block');
        });
        ok(ttOk, `${page}/${lang}: clicking the Timetable tab did not show ONLY the timetable grid`);
        const blk = await p.$('[data-tabpanel="timetable"] .tt-block[data-drawer]');
        if (blk) { await blk.click(); await p.waitForTimeout(240); }
        const ttSheet = await p.evaluate(() => !!document.querySelector('.drawer.sheet'));
        ok(ttSheet, `${page}/${lang}: clicking a timetable block did not open the appointment drawer`);
        await p.keyboard.press('Escape');
        await p.waitForTimeout(120);
        const before = await p.$$eval('[data-tabpanel="timetable"] .tt-block', (els) => els.length);
        await p.selectOption('select[data-filter="teacher"]', { index: 1 }).catch(() => {});
        await p.waitForTimeout(170);
        const after = await p.$$eval('[data-tabpanel="timetable"] .tt-block', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `${page}/${lang}: teacher lens did not narrow the timetable (${before} → ${after})`);
      }

      // Spec 004 — Families directory: cards group children · promoted nav · view-profile · filter
      if (page === 'families') {
        const fam = await p.evaluate(() => {
          const cards = [...document.querySelectorAll('.family-card')];
          const navFam = document.querySelector('.nav-panel .nav-item[data-nav="families"]');
          const navAdd = document.querySelector('.nav-panel .nav-item[data-nav="addFamily"]');
          return {
            cards: cards.length,
            withKids: cards.filter((c) => c.querySelector('.fam-avatars')).length,
            navFamOk: !!(navFam && navFam.tagName === 'A' && /families\.(en\.)?html/.test(navFam.getAttribute('href') || '')),
            navAddOk: !!(navAdd && navAdd.tagName === 'A' && /add-family\.(en\.)?html/.test(navAdd.getAttribute('href') || '')),
            viewProfile: !!document.querySelector('.family-card a[href*="family"]'),
          };
        });
        ok(fam.cards >= 8, `${page}/${lang}: expected ≥8 family cards, got ${fam.cards}`);
        ok(fam.withKids >= 1, `${page}/${lang}: family cards do not group children (.fam-avatars)`);
        ok(fam.navFamOk, `${page}/${lang}: families nav is not a real <a> to families.html`);
        ok(fam.navAddOk, `${page}/${lang}: addFamily nav is not a real <a> to add-family.html`);
        ok(fam.viewProfile, `${page}/${lang}: family card missing a view-profile link to family.html`);
        const before = await p.$$eval('#families-grid .family-card', (els) => els.filter((e) => !e.hidden).length);
        await p.selectOption('select[data-filter="status"]', 'active').catch(() => {});
        await p.waitForTimeout(160);
        const after = await p.$$eval('#families-grid .family-card', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `${page}/${lang}: status filter did not narrow family cards (${before} → ${after})`);
      }

      // Spec 004 — family/student profile: baked tabs (one visible) · switch · cross links
      if (page === 'family' || page === 'student') {
        const minTabs = page === 'student' ? 7 : 5;
        const prof = await p.evaluate((g) => {
          const wrap = document.querySelector(`[data-tabs="${g}"]`);
          return {
            tabsN: wrap ? wrap.querySelectorAll('[role="tab"][data-tab]').length : 0,
            vis: wrap ? [...wrap.querySelectorAll('[data-tabpanel]')].filter((x) => !x.hidden).length : 0,
            statusChip: !!document.querySelector('.profile-banner .chip'),
          };
        }, page);
        ok(prof.tabsN >= minTabs, `${page}/${lang}: expected ≥${minTabs} profile tabs, got ${prof.tabsN}`);
        ok(prof.vis === 1, `${page}/${lang}: expected exactly ONE visible tabpanel, got ${prof.vis}`);
        ok(prof.statusChip, `${page}/${lang}: profile banner missing a status chip`);
        const target = page === 'student' ? 'results' : 'students';
        await p.click(`[data-tabs="${page}"] [data-tab="${target}"]`).catch(() => {});
        await p.waitForTimeout(160);
        const switched = await p.evaluate(({ g, tgt }) => {
          const wrap = document.querySelector(`[data-tabs="${g}"]`);
          const vis = [...wrap.querySelectorAll('[data-tabpanel]')].filter((x) => !x.hidden);
          return vis.length === 1 && vis[0].getAttribute('data-tabpanel') === tgt;
        }, { g: page, tgt: target });
        ok(switched, `${page}/${lang}: clicking the ${target} tab did not show only it`);
        const links = await p.evaluate(() => ({
          student: !!document.querySelector('a[href*="student"]'),
          family: !!document.querySelector('a[href*="family"]'),
          sched: !!document.querySelector('a[href*="schedule"][href*="view=timetable"]'),
        }));
        if (page === 'family') ok(links.student, `${page}/${lang}: family profile has no link to a student profile`);
        if (page === 'student') {
          ok(links.family, `${page}/${lang}: student profile has no family link`);
          ok(links.sched, `${page}/${lang}: student profile missing the schedule deep-link`);
        }
      }

      // Spec 004 — add-family wizard: 5 baked steps · labeled fields · Next/Back · Save toasts
      if (page === 'add-family') {
        const wiz = await p.evaluate(() => {
          const steps = [...document.querySelectorAll('[data-wizard] [data-step]')];
          const fields = [...document.querySelectorAll('[data-wizard] input, [data-wizard] select, [data-wizard] textarea')];
          const unlabeled = fields.filter((f) => !f.id || !document.querySelector(`label[for="${f.id}"]`)).length;
          return { steps: steps.length, vis: steps.filter((s) => !s.hidden).length, fields: fields.length, unlabeled };
        });
        ok(wiz.steps === 5, `${page}/${lang}: expected 5 baked wizard steps, got ${wiz.steps}`);
        ok(wiz.vis === 1, `${page}/${lang}: expected exactly ONE visible step, got ${wiz.vis}`);
        ok(wiz.fields > 0 && wiz.unlabeled === 0, `${page}/${lang}: ${wiz.unlabeled} unlabeled wizard fields`);
        await p.click('[data-step]:not([hidden]) [data-step-next]').catch(() => {});
        await p.waitForTimeout(130);
        const adv = await p.evaluate(() => { const v = [...document.querySelectorAll('[data-wizard] [data-step]')].filter((s) => !s.hidden); return v.length === 1 && v[0].getAttribute('data-step') === 'contact'; });
        ok(adv, `${page}/${lang}: data-step-next did not advance to the contact step`);
        await p.click('[data-step]:not([hidden]) [data-step-prev]').catch(() => {});
        await p.waitForTimeout(130);
        const ret = await p.evaluate(() => { const v = [...document.querySelectorAll('[data-wizard] [data-step]')].filter((s) => !s.hidden); return v.length === 1 && v[0].getAttribute('data-step') === 'identity'; });
        ok(ret, `${page}/${lang}: data-step-prev did not return to the identity step`);
        await p.click('[data-step-go="review"]').catch(() => {});
        await p.waitForTimeout(130);
        const saveBtn = await p.$('[data-step="review"] [data-demo-action]');
        if (saveBtn) { await saveBtn.click(); await p.waitForTimeout(160); }
        const toasted = await p.evaluate(() => !!document.querySelector('.toast'));
        ok(toasted, `${page}/${lang}: wizard Save did not show a demo toast`);
        await p.keyboard.press('Escape');
      }

      // Spec 005 — Attendance: tiles-as-filters · outcome rows · labeled chips · canonical drawer · links
      if (page === 'attendance') {
        const a = await p.evaluate(() => {
          const tiles = [...document.querySelectorAll('.outcome-tile[data-filter-set]')];
          const rows = [...document.querySelectorAll('#attendance-list .outcome-row[data-row]')];
          const chips = [...document.querySelectorAll('#attendance-list .outcome-row .or-meta .chip')];
          const navAtt = document.querySelector('.nav-panel .nav-item[data-nav="attendance"]');
          // the labeled OUTCOME chip text for a given outcome (to prove absence types are distinct)
          const chipText = (oid) => { const row = document.querySelector(`#attendance-list .outcome-row[data-outcome="${oid.toLowerCase()}"]`); const ch = row && row.querySelector('.or-meta .chip'); return ch ? ch.textContent.trim() : ''; };
          return {
            tiles: tiles.length, rows: rows.length, chipsTotal: chips.length,
            // EVERY outcome chip must be labeled (icon + text) — never color-only
            labeledChips: chips.filter((c) => c.querySelector('svg') && c.textContent.trim().length > 0).length,
            studentAbsentChip: chipText('studentAbsent'), teacherAbsentChip: chipText('teacherAbsent'),
            navAttOk: !!(navAtt && navAtt.tagName === 'A' && /attendance\.(en\.)?html/.test(navAtt.getAttribute('href') || '')),
            studentLink: !!document.querySelector('#attendance-list a[href*="student"]'),
            familyLink: !!document.querySelector('#attendance-list a[href*="family"]'),
            drawers: document.querySelectorAll('template[data-preview]').length,
          };
        });
        ok(a.tiles === 5, `${page}/${lang}: expected 5 filter tiles, got ${a.tiles}`);
        ok(a.rows >= 12, `${page}/${lang}: expected ≥12 outcome rows, got ${a.rows}`);
        ok(a.chipsTotal >= 12 && a.labeledChips === a.chipsTotal, `${page}/${lang}: not all outcome chips are labeled icon+text (${a.labeledChips}/${a.chipsTotal})`);
        // US4: student-absent and teacher-absent must be textually distinct (not color-only)
        ok(a.studentAbsentChip && a.teacherAbsentChip && a.studentAbsentChip !== a.teacherAbsentChip,
          `${page}/${lang}: studentAbsent vs teacherAbsent chips not distinct ("${a.studentAbsentChip}" / "${a.teacherAbsentChip}")`);
        ok(a.navAttOk, `${page}/${lang}: attendance nav is not a real <a> to attendance.html`);
        ok(a.studentLink && a.familyLink, `${page}/${lang}: outcome rows missing student/family links`);
        ok(a.drawers >= 12, `${page}/${lang}: outcome drawer templates not baked`);
        // a summary tile sets the outcome filter + narrows the rows
        const before = await p.$$eval('#attendance-list .outcome-row', (els) => els.filter((e) => !e.hidden).length);
        await p.click('.outcome-tile[data-filter-set="outcome:studentAbsent"]').catch(() => {});
        await p.waitForTimeout(170);
        const after = await p.$$eval('#attendance-list .outcome-row', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `${page}/${lang}: tile filter did not narrow rows (${before} → ${after})`);
        // the kebab "view" opens the canonical outcome drawer with the Outcome section.
        // The app shell scrolls inside an `.page-scroll` overflow container; give this
        // interaction a tall viewport so the row + kebab + anchored popover all fit, then
        // seat each target before clicking (robustness only — same real kebab/menu/drawer).
        await p.setViewportSize({ width: 1366, height: 1280 });
        const kebab = await p.$('#attendance-list .outcome-row:not([hidden]) [data-row-menu]');
        if (kebab) {
          await kebab.scrollIntoViewIfNeeded(); await kebab.click(); await p.waitForTimeout(150);
          const v = await p.$('.popover [data-drawer]');
          if (v) { await v.scrollIntoViewIfNeeded(); await v.click(); await p.waitForTimeout(240); }
        }
        const drawer = await p.evaluate(() => { const d = document.querySelector('.drawer.sheet'); return d ? { open: true, hasOutcome: /النتيجة|Outcome/.test(d.textContent) } : { open: false }; });
        ok(drawer.open, `${page}/${lang}: the outcome drawer did not open from a row`);
        ok(drawer.hasOutcome, `${page}/${lang}: the outcome drawer is missing the Outcome section`);
        await p.keyboard.press('Escape');
      }

      // Spec 006 — Groups directory: promoted nav · EVERY row a labeled group-status chip · rows → group.html · tiles/filters
      if (page === 'groups') {
        const a = await p.evaluate(() => {
          const rows = [...document.querySelectorAll('#groups-list .group-row')];
          const chips = rows.map((r) => r.querySelector('.gr-meta .chip')); // one per row (null if a row has none)
          const navG = document.querySelector('.nav-panel .nav-item[data-nav="groups"]');
          const titles = [...document.querySelectorAll('#groups-list a.gr-title')];
          return {
            rows: rows.length,
            chipsPresent: chips.filter(Boolean).length,
            chipsLabeled: chips.filter((c) => c && c.querySelector('svg') && c.textContent.trim().length > 0).length,
            navOk: !!(navG && navG.tagName === 'A' && /(^|\/)groups\.(en\.)?html$/.test(navG.getAttribute('href') || '')),
            groupLinks: titles.length > 0 && titles.every((x) => /(^|\/)group\.(en\.)?html$/.test(x.getAttribute('href') || '')),
            tiles: document.querySelectorAll('.outcome-tile[data-filter-set]').length,
          };
        });
        ok(a.rows >= 6, `${page}/${lang}: expected ≥6 group rows, got ${a.rows}`);
        // EVERY row must carry a labeled status chip (tie to row count so a chip-less row fails, not just ≥1)
        ok(a.chipsPresent === a.rows && a.chipsLabeled === a.rows, `${page}/${lang}: not every group row has a labeled status chip (${a.chipsLabeled} labeled / ${a.chipsPresent} present / ${a.rows} rows)`);
        ok(a.navOk, `${page}/${lang}: groups nav is not a real <a> to groups.html`);
        ok(a.groupLinks, `${page}/${lang}: group rows missing group.html links (exact)`);
        ok(a.tiles === 3, `${page}/${lang}: expected 3 group tiles, got ${a.tiles}`);
        const before = await p.$$eval('#groups-list .group-row', (els) => els.filter((e) => !e.hidden).length);
        await p.selectOption('select[data-filter="status"]', 'active').catch(() => {});
        await p.waitForTimeout(150);
        const after = await p.$$eval('#groups-list .group-row', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `${page}/${lang}: status filter did not narrow groups (${before} → ${after})`);
      }

      // Spec 006 — Course/Group profiles: labeled banner chip · baked tabs · a REAL named-tab switch · reused canonical drawer
      if (page === 'course' || page === 'group') {
        const switchTab = page === 'course' ? 'groups' : 'students'; // a named tab whose activation we verify
        const outTab = page === 'course' ? 'outcomes' : 'sessions';
        const a = await p.evaluate(() => {
          const wrap = document.querySelector('[data-tabs]');
          const panels = wrap ? [...wrap.querySelectorAll('[data-tabpanel]')] : [];
          return {
            bannerLabeled: [...document.querySelectorAll('.profile-banner .chip')].some((c) => c.querySelector('svg') && c.textContent.trim().length > 0),
            tabsN: wrap ? wrap.querySelectorAll('[role="tab"][data-tab]').length : 0,
            panels: panels.length, visible: panels.filter((pn) => !pn.hidden).length,
            drawers: document.querySelectorAll('template[data-preview]').length,
          };
        });
        ok(a.bannerLabeled, `${page}/${lang}: profile banner missing a labeled status chip (icon + text)`);
        ok(a.tabsN >= 7 && a.panels === a.tabsN, `${page}/${lang}: profile tabs not baked (${a.tabsN} tabs / ${a.panels} panels)`);
        ok(a.visible === 1, `${page}/${lang}: expected exactly one visible tab panel, got ${a.visible}`);
        ok(a.drawers >= 4, `${page}/${lang}: reused appointment/outcome drawer templates not baked (${a.drawers})`);
        // SWITCH: click a NAMED tab and assert THAT panel is the (only) visible one — proves the switch handler works
        await p.click(`[data-tabs] [role="tab"][data-tab="${switchTab}"]`).catch(() => {});
        await p.waitForTimeout(150);
        const sw = await p.evaluate(() => { const v = [...document.querySelectorAll('[data-tabpanel]')].filter((pn) => !pn.hidden); return { count: v.length, id: v[0] ? v[0].getAttribute('data-tabpanel') : null }; });
        ok(sw.count === 1 && sw.id === switchTab, `${page}/${lang}: named tab switch did not activate '${switchTab}' (visible=${sw.count}, id=${sw.id})`);
        // profile BODY cross-links — scoped to #page-body (NOT the sidebar nav) and matched to EXACT target files
        const links = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const has = (re) => [...body.querySelectorAll('a[href]')].some((x) => re.test(x.getAttribute('href') || ''));
          return {
            group: has(/(^|\/)group\.(en\.)?html/), course: has(/(^|\/)course\.(en\.)?html/),
            student: has(/(^|\/)student\.(en\.)?html/), family: has(/(^|\/)family\.(en\.)?html/),
            ladder: document.querySelectorAll('.level-ladder .level-step').length,
          };
        });
        if (page === 'course') {
          ok(links.group && links.student, `${page}/${lang}: course profile body missing group.html/student.html links`);
          ok(links.ladder >= 4, `${page}/${lang}: learning-path ladder not baked (${links.ladder} steps, expected ≥4)`);
        } else {
          ok(links.student && links.family && links.course, `${page}/${lang}: group profile body missing student/family/course links`);
        }
        // the CANONICAL Spec 005 outcome drawer must open from the Outcomes/Sessions tab (reuse, not bespoke)
        await p.setViewportSize({ width: 1366, height: 1280 });
        await p.click(`[data-tabs] [role="tab"][data-tab="${outTab}"]`).catch(() => {});
        await p.waitForTimeout(160);
        const kebab = await p.$(`[data-tabpanel="${outTab}"] .outcome-row [data-row-menu]`);
        if (kebab) {
          await kebab.scrollIntoViewIfNeeded(); await kebab.click(); await p.waitForTimeout(150);
          const v = await p.$('.popover [data-drawer]');
          if (v) { await v.scrollIntoViewIfNeeded(); await v.click(); await p.waitForTimeout(240); }
        }
        const drawer = await p.evaluate(() => { const d = document.querySelector('.drawer.sheet'); return d ? { open: true, hasOutcome: /النتيجة|Outcome/.test(d.textContent) } : { open: false }; });
        ok(drawer.open, `${page}/${lang}: the canonical outcome drawer did not open from the '${outTab}' tab`);
        ok(drawer.hasOutcome, `${page}/${lang}: the '${outTab}'-tab drawer is missing the Outcome section (bespoke drawer?)`);
        await p.keyboard.press('Escape');
      }

      // Spec 006 — Student/Family course-group integration (US9), scoped + exact files
      if (page === 'student') {
        await p.click('[data-tabs] [role="tab"][data-tab="courses"]').catch(() => {});
        await p.waitForTimeout(150);
        const a = await p.evaluate(() => {
          const panel = document.querySelector('[data-tabpanel="courses"]');
          if (!panel) return { course: false, group: false };
          const has = (re) => [...panel.querySelectorAll('a[href]')].some((x) => re.test(x.getAttribute('href') || ''));
          return { course: has(/(^|\/)course\.(en\.)?html/), group: has(/(^|\/)group\.(en\.)?html/) };
        });
        ok(a.course && a.group, `${page}/${lang}: student Courses tab missing course.html/group.html links`);
      }
      if (page === 'family') {
        const a = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const has = (re) => [...body.querySelectorAll('a[href]')].some((x) => re.test(x.getAttribute('href') || ''));
          return { courses: has(/(^|\/)courses\.(en\.)?html/), groups: has(/(^|\/)groups\.(en\.)?html/) };
        });
        ok(a.courses && a.groups, `${page}/${lang}: family profile missing courses/groups deep-links`);
      }

      // Spec 007 — Teachers page enrichment: labeled status chips · counts · real teacher.html links · status filter
      if (page === 'teachers') {
        const a = await p.evaluate(() => {
          const cards = [...document.querySelectorAll('#teachers-grid .dir-card')];
          const labeled = cards.filter((c) => { const ch = c.querySelector('.chip'); return ch && ch.querySelector('svg') && ch.textContent.trim().length > 0; }).length;
          const profileLinks = [...document.querySelectorAll('#teachers-grid a[href]')].filter((x) => /(^|\/)teacher\.(en\.)?html$/.test(x.getAttribute('href') || '')).length;
          const withCounts = cards.filter((c) => [...c.querySelectorAll('.stat-mini .v')].filter((v) => v.textContent.trim().length > 0).length >= 3).length;
          return { cards: cards.length, labeled, profileLinks, withCounts };
        });
        ok(a.cards >= 6, `${page}/${lang}: expected ≥6 teacher cards, got ${a.cards}`);
        ok(a.labeled === a.cards, `${page}/${lang}: not every teacher card has a labeled status chip (${a.labeled}/${a.cards})`);
        ok(a.profileLinks >= a.cards, `${page}/${lang}: teacher cards missing teacher.html profile links (${a.profileLinks}/${a.cards})`);
        ok(a.withCounts === a.cards, `${page}/${lang}: not every teacher card shows its courses/groups/students counts (${a.withCounts}/${a.cards})`);
        const before = await p.$$eval('#teachers-grid .dir-card', (els) => els.filter((e) => !e.hidden).length);
        await p.selectOption('select[data-filter="status"]', 'active').catch(() => {});
        await p.waitForTimeout(150);
        const after = await p.$$eval('#teachers-grid .dir-card', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `${page}/${lang}: status filter did not narrow teachers (${before} → ${after})`);
      }

      // Spec 007 — Teacher profile: 8 baked tabs · one visible · named switch · cross-links · canonical drawer · teacherAbsent≠studentAbsent · not a nav item
      if (page === 'teacher') {
        const a = await p.evaluate(() => {
          const wrap = document.querySelector('[data-tabs="teacher"]');
          const panels = wrap ? [...wrap.querySelectorAll('[data-tabpanel]')] : [];
          return {
            bannerLabeled: [...document.querySelectorAll('.profile-banner .chip')].some((c) => c.querySelector('svg') && c.textContent.trim().length > 0),
            tabsN: wrap ? wrap.querySelectorAll('[role="tab"][data-tab]').length : 0,
            panels: panels.length, visible: panels.filter((pn) => !pn.hidden).length,
            drawers: document.querySelectorAll('template[data-preview]').length,
            notNav: !document.querySelector('.nav-panel .nav-item[data-nav="teacher"]'),
          };
        });
        ok(a.tabsN === 8 && a.panels === 8, `${page}/${lang}: expected 8 profile tabs/panels, got ${a.tabsN}/${a.panels}`);
        ok(a.visible === 1, `${page}/${lang}: expected exactly one visible tab panel, got ${a.visible}`);
        ok(a.bannerLabeled, `${page}/${lang}: teacher banner missing a labeled status chip (icon + text)`);
        ok(a.drawers >= 4, `${page}/${lang}: reused appointment/outcome drawer templates not baked (${a.drawers})`);
        ok(a.notNav, `${page}/${lang}: teacher.html must NOT be a sidebar nav item`);
        await p.click('[data-tabs="teacher"] [role="tab"][data-tab="students"]').catch(() => {});
        await p.waitForTimeout(150);
        const sw = await p.evaluate(() => { const v = [...document.querySelectorAll('[data-tabpanel]')].filter((pn) => !pn.hidden); return { count: v.length, id: v[0] ? v[0].getAttribute('data-tabpanel') : null }; });
        ok(sw.count === 1 && sw.id === 'students', `${page}/${lang}: named tab switch did not activate 'students' (visible=${sw.count}, id=${sw.id})`);
        const links = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const has = (re) => [...body.querySelectorAll('a[href]')].some((x) => re.test(x.getAttribute('href') || ''));
          return {
            course: has(/(^|\/)course\.(en\.)?html/), group: has(/(^|\/)group\.(en\.)?html/),
            student: has(/(^|\/)student\.(en\.)?html/), family: has(/(^|\/)family\.(en\.)?html/),
            sched: has(/(^|\/)schedule\.(en\.)?html#view=timetable/), att: has(/(^|\/)attendance\.(en\.)?html/),
          };
        });
        ok(links.course && links.group && links.student && links.family, `${page}/${lang}: teacher profile body missing course/group/student/family links`);
        ok(links.sched && links.att, `${page}/${lang}: teacher profile missing schedule/attendance deep-links`);
        // Sessions & Outcomes tab — teacherAbsent vs studentAbsent distinct + the CANONICAL drawer opens (reuse, not bespoke)
        await p.setViewportSize({ width: 1366, height: 1280 });
        await p.click('[data-tabs="teacher"] [role="tab"][data-tab="sessions-outcomes"]').catch(() => {});
        await p.waitForTimeout(160);
        const ab = await p.evaluate(() => {
          const panel = document.querySelector('[data-tabpanel="sessions-outcomes"]');
          const chipText = (oid) => { const row = panel && panel.querySelector(`.outcome-row[data-outcome="${oid}"]`); const ch = row && row.querySelector('.or-meta .chip'); return ch ? ch.textContent.trim() : ''; };
          return { ta: chipText('teacherabsent'), sa: chipText('studentabsent') };
        });
        ok(ab.ta && ab.sa && ab.ta !== ab.sa, `${page}/${lang}: teacherAbsent vs studentAbsent not distinct in teacher context ("${ab.ta}" / "${ab.sa}")`);
        const kebab = await p.$('[data-tabpanel="sessions-outcomes"] .outcome-row [data-row-menu]');
        if (kebab) { await kebab.scrollIntoViewIfNeeded(); await kebab.click(); await p.waitForTimeout(150); const v = await p.$('.popover [data-drawer]'); if (v) { await v.scrollIntoViewIfNeeded(); await v.click(); await p.waitForTimeout(240); } }
        const drawer = await p.evaluate(() => { const d = document.querySelector('.drawer.sheet'); return d ? { open: true, hasOutcome: /النتيجة|Outcome/.test(d.textContent) } : { open: false }; });
        ok(drawer.open, `${page}/${lang}: the canonical outcome drawer did not open from the teacher 'sessions-outcomes' tab`);
        ok(drawer.hasOutcome, `${page}/${lang}: the teacher outcome drawer is missing the Outcome section (bespoke drawer?)`);
        await p.keyboard.press('Escape');
        await p.waitForTimeout(120);
        // Timetable tab reuses the Spec 003 agenda — named switch + at least one agenda block (data-drawer)
        await p.click('[data-tabs="teacher"] [role="tab"][data-tab="timetable"]').catch(() => {});
        await p.waitForTimeout(150);
        const tt = await p.evaluate(() => {
          const panel = document.querySelector('[data-tabpanel="timetable"]');
          return { visible: !!(panel && !panel.hidden), blocks: panel ? panel.querySelectorAll('[data-drawer]').length : 0 };
        });
        ok(tt.visible && tt.blocks >= 1, `${page}/${lang}: teacher Timetable tab did not show the reused agenda (visible=${tt.visible}, blocks=${tt.blocks})`);
        // banner Notify-family confirm is an honest action — clicking it opens a confirm modal (not a dead control)
        const conf = await p.$('.profile-banner [data-confirm]');
        if (conf) { await conf.click(); await p.waitForTimeout(160); }
        const modal = await p.evaluate(() => !!document.querySelector('.modal-scrim, .drawer.sheet'));
        ok(modal, `${page}/${lang}: the banner Notify-family action did not open a confirm modal`);
        await p.keyboard.press('Escape');
      }

      // Spec 007 — Teacher Performance board: promoted nav · KPI tiles · comparison rows → teacher.html · queue · counts-not-scores · filter
      if (page === 'teacher-performance') {
        const a = await p.evaluate(() => {
          const cards = [...document.querySelectorAll('#perf-list .dir-card')];
          const navK = document.querySelector('.nav-panel .nav-item[data-nav="teacherKpi"]');
          const body = document.getElementById('page-body');
          const profileLinks = [...body.querySelectorAll('#perf-list a[href]')].filter((x) => /(^|\/)teacher\.(en\.)?html$/.test(x.getAttribute('href') || '')).length;
          return {
            cards: cards.length, profileLinks,
            tiles: body.querySelectorAll('.medallion.m-soft').length,
            navOk: !!(navK && navK.tagName === 'A' && /(^|\/)teacher-performance\.(en\.)?html$/.test(navK.getAttribute('href') || '')),
            queueRows: body.querySelectorAll('.people-row').length,
            // forbidden: a computed score/rank/leaderboard or a finance figure visible in the board body (EN + AR)
            forbidden: /\b(score|scored|rank|ranked|ranking|leaderboard|percentile|gpa|salary|payroll|payout|compensation)\b/i.test(body.innerText)
              || /لوحة الصدارة|الترتيب|تقييم رقمي|الرواتب|الراتب/.test(body.innerText),
          };
        });
        ok(a.cards >= 6, `${page}/${lang}: expected ≥6 per-teacher comparison cards, got ${a.cards}`);
        ok(a.profileLinks >= a.cards, `${page}/${lang}: comparison cards missing teacher.html links (${a.profileLinks}/${a.cards})`);
        ok(a.tiles >= 5, `${page}/${lang}: expected ≥5 KPI tiles, got ${a.tiles}`);
        ok(a.navOk, `${page}/${lang}: teacherKpi nav is not a real <a> to teacher-performance.html`);
        ok(a.queueRows >= 1, `${page}/${lang}: follow-up queue has no rows (${a.queueRows})`);
        ok(!a.forbidden, `${page}/${lang}: board shows a forbidden score/rank/leaderboard/finance token in the page body`);
        const before = await p.$$eval('#perf-list .dir-card', (els) => els.filter((e) => !e.hidden).length);
        await p.selectOption('select[data-filter="workload"]', 'high').catch(() => {});
        await p.waitForTimeout(150);
        const after = await p.$$eval('#perf-list .dir-card', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `${page}/${lang}: workload filter did not narrow the board (${before} → ${after})`);
      }

      // Spec 008 — Academic Reports shell: baked category cards (available real <a> · planned disabled-with-reason)
      // · operations overview tiles · per-area sections · real source links · honest actions · teacherAbsent≠studentAbsent
      // · NO finance/chart/score-rank token in the page body · filter narrows · no dead links/#app.
      if (page === 'reports') {
        const a = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const grid = document.getElementById('reports-grid');
          const cards = [...(grid ? grid.querySelectorAll('.report-card') : [])];
          const availableCards = cards.filter((c) => c.tagName === 'A');
          const plannedCards = cards.filter((c) => c.classList.contains('is-disabled'));
          const deadCardLinks = availableCards.filter((c) => { const h = c.getAttribute('href') || ''; return !h || h === '#'; }).length;
          // each available card must point at one of the expected implemented pages (not just "not dead")
          const EXPECTED = ['attendance', 'sessions', 'courses', 'teacher-performance', 'students'];
          const badRoute = availableCards.filter((c) => {
            const base = (c.getAttribute('href') || '').replace(/\.en\.html.*$/, '').replace(/\.html.*$/, '');
            return !EXPECTED.includes(base);
          }).length;
          const plannedDead = plannedCards.filter((c) => c.tagName === 'A').length;
          const plannedHaveReason = plannedCards.every((c) => (c.getAttribute('title') || '').length > 0 || !!c.querySelector('.report-reason'));
          const hrefs = [...body.querySelectorAll('a[href]')].map((x) => x.getAttribute('href') || '');
          const has = (re) => hrefs.some((h) => re.test(h));
          const sources = {
            attendance: has(/(^|\/)attendance\.(en\.)?html$/),
            sessions: has(/(^|\/)sessions\.(en\.)?html$/),
            timetable: has(/(^|\/)schedule\.(en\.)?html#view=timetable$/),
            courses: has(/(^|\/)courses\.(en\.)?html$/),
            groups: has(/(^|\/)groups\.(en\.)?html$/),
            teacherPerf: has(/(^|\/)teacher-performance\.(en\.)?html$/),
            teacher: has(/(^|\/)teacher\.(en\.)?html$/),
            students: has(/(^|\/)students\.(en\.)?html$/),
            families: has(/(^|\/)families\.(en\.)?html$/),
          };
          // teacherAbsent vs studentAbsent must be two textually-distinct chips (both use the user-x glyph)
          const userXChips = [...body.querySelectorAll('.chip')].filter((c) => c.querySelector('use[href="#i-user-x"]'));
          const userXTexts = [...new Set(userXChips.map((c) => c.textContent.replace(/\s+/g, ' ').trim()))];
          // honest actions only — no real export/download anchor
          const realExport = body.querySelectorAll('a[download], a[href^="blob:"], a[href$=".csv"], a[href$=".pdf"]').length;
          const txt = body.innerText;
          const forbidden = /\b(salary|payroll|payout|invoice|revenue|accounting|compensation|chart|canvas|graph|leaderboard|percentile|score|scored|rank|ranked|ranking)\b/i.test(txt)
            || /الرواتب|الراتب|المدفوعات|الفواتير|الإيرادات|المحاسبة|الرسم البياني|لوحة الصدارة|لوحة المتصدرين|الترتيب|النسبة المئوية|تقييم رقمي/.test(txt);
          return {
            cards: cards.length, availableCards: availableCards.length, plannedCards: plannedCards.length,
            deadCardLinks, badRoute, plannedDead, plannedHaveReason,
            // scope the tile count to the operations-overview section ONLY (card medallions are excluded)
            tiles: document.querySelectorAll('#ops-overview .medallion.m-soft').length,
            sources, userXTexts,
            demo: !!body.querySelector('[data-demo-action]'),
            disabledReason: body.querySelectorAll('[data-disabled-reason]').length,
            confirm: !!body.querySelector('[data-confirm]'),
            realExport, forbidden,
            deadHash: body.querySelectorAll('a[href="#"]').length,
          };
        });
        ok(a.cards === 7, `${page}/${lang}: expected exactly 7 baked category cards (5 available + 2 planned), got ${a.cards}`);
        ok(a.availableCards === 5, `${page}/${lang}: expected exactly 5 available category cards as real <a>, got ${a.availableCards}`);
        ok(a.plannedCards === 2, `${page}/${lang}: expected exactly 2 planned/backendRequired cards, got ${a.plannedCards}`);
        ok(a.deadCardLinks === 0, `${page}/${lang}: an available category card has a dead/empty link`);
        ok(a.badRoute === 0, `${page}/${lang}: an available card points at an unexpected page (${a.badRoute})`);
        ok(a.plannedDead === 0, `${page}/${lang}: a planned card is a dead <a> instead of disabled-with-reason`);
        ok(a.plannedHaveReason, `${page}/${lang}: a planned card has no visible reason`);
        ok(a.tiles === 8, `${page}/${lang}: expected exactly 8 baked operations-overview tiles in #ops-overview, got ${a.tiles}`);
        for (const [k, v] of Object.entries(a.sources)) ok(v, `${page}/${lang}: missing real source link (${k})`);
        ok(a.userXTexts.length >= 2, `${page}/${lang}: teacherAbsent vs studentAbsent are not two distinct chips (${JSON.stringify(a.userXTexts)})`);
        ok(a.demo, `${page}/${lang}: missing Print demo action`);
        ok(a.disabledReason >= 3, `${page}/${lang}: expected ≥3 disabled-with-reason actions (CSV/PDF/Share), got ${a.disabledReason}`);
        ok(a.confirm, `${page}/${lang}: missing Schedule confirm action`);
        ok(a.realExport === 0, `${page}/${lang}: found a real export/download link (must be demo only)`);
        ok(!a.forbidden, `${page}/${lang}: reports body shows a forbidden finance/chart/score/rank token`);
        ok(a.deadHash === 0, `${page}/${lang}: dead href="#" present in the reports body`);
        const before = await p.$$eval('#reports-grid .report-card', (els) => els.filter((e) => !e.hidden).length);
        await p.selectOption('select[data-filter="area"]', 'attendance').catch(() => {});
        await p.waitForTimeout(150);
        const after = await p.$$eval('#reports-grid .report-card', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `${page}/${lang}: area filter did not narrow the category cards (${before} → ${after})`);
        const sched = await p.$('.report-actions [data-confirm]');
        if (sched) { await sched.click(); await p.waitForTimeout(160); }
        const modal = await p.evaluate(() => !!document.querySelector('.modal-scrim, .drawer.sheet'));
        ok(modal, `${page}/${lang}: the Schedule action did not open a confirm modal`);
        await p.keyboard.press('Escape');
      }

      // Spec 009 — Finance shell: 4 status tiles equal invoice-list row counts per status
      // · 9 invoice rows + 6 payment rows baked · labeled chips for every invoice/payment status
      // · honest actions (≥3 disabled-with-reason + ≥1 demo in the action cluster, ≥1 confirm in rows,
      // the cancelled invoice gates record-payment to disabled-with-reason, never confirm)
      // · one drawer per invoice (9) · zero href="#"/receipt/upload/type="file" tokens
      // · confirming Record payment mutates NO invoice status chip · the planned section renders
      // 9 figure-free disabled report-cards with availability chips · zero chart/score/rank tokens.
      if (page === 'finance') {
        const FIN_STATUS_LABELS = (lang === 'en'
          ? { paid: 'Paid', unpaid: 'Unpaid', overdue: 'Overdue', cancelled: 'Cancelled' }
          : { paid: 'مدفوعة', unpaid: 'غير مدفوعة', overdue: 'متأخرة', cancelled: 'ملغاة' });
        const FIN_PAY_LABELS = (lang === 'en'
          ? { recorded: 'Recorded', pending: 'Pending', returned: 'Returned' }
          : { recorded: 'مسجَّلة', pending: 'قيد التأكيد', returned: 'مرتجعة' });
        const a = await p.evaluate(() => {
          const toNum = (s) => parseInt(String(s).trim().replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)), 10);
          const body = document.getElementById('page-body');
          const tiles = [...document.querySelectorAll('.fin-tile[data-filter-set]')];
          const tileCounts = tiles.map((tl) => ({
            status: (tl.getAttribute('data-filter-set') || '').split(':')[1],
            count: toNum((tl.querySelector('.ft-v') || {}).textContent || ''),
          }));
          const rows = [...document.querySelectorAll('#invoice-list [data-row]')];
          const rowCountByStatus = {};
          rows.forEach((r) => { const s = r.getAttribute('data-status'); rowCountByStatus[s] = (rowCountByStatus[s] || 0) + 1; });
          const payRows = [...document.querySelectorAll('.fin-pay-row')];
          const invoiceChipTexts = [...new Set(rows.map((r) => { const c = r.querySelector('.fr-meta .chip'); return c ? c.textContent.replace(/\s+/g, ' ').trim() : ''; }))];
          const paymentChipTexts = [...new Set(payRows.map((r) => { const chips = r.querySelectorAll('.chip'); const c = chips[chips.length - 1]; return c ? c.textContent.replace(/\s+/g, ' ').trim() : ''; }))];
          const actionCluster = document.querySelector('.report-actions');
          const disabledInCluster = actionCluster ? actionCluster.querySelectorAll('[data-disabled-reason]').length : 0;
          const demoInCluster = actionCluster ? actionCluster.querySelectorAll('[data-demo-action]').length : 0;
          const rowConfirm = document.querySelectorAll('#invoice-list [data-row] [data-confirm]').length;
          const cancelledRow = document.querySelector('#invoice-list [data-row][data-status="cancelled"]');
          const cancelledDisabledRecord = cancelledRow ? !!cancelledRow.querySelector('.fr-actions [data-disabled-reason]') : false;
          const cancelledConfirmRecord = cancelledRow ? !!cancelledRow.querySelector('.fr-actions [data-confirm]') : false;
          const drawers = document.querySelectorAll('template[data-preview]').length;
          const hrefHash = body.querySelectorAll('a[href="#"]').length;
          const receiptTokens = /receipt|upload|type="file"|إيصال|مرفق/i.test(body.innerHTML);
          const plannedCards = [...document.querySelectorAll('.report-card')];
          const plannedDisabled = plannedCards.filter((c) => c.classList.contains('is-disabled')).length;
          const plannedDigitFree = plannedCards.every((c) => !/[0-9٠-٩]/.test(c.textContent));
          const plannedHasAvailability = plannedCards.every((c) => !!c.querySelector('.chip'));
          const forbidden = /\b(chart|canvas|graph|score|rank|leaderboard|percentile)\b/i.test(body.innerHTML);
          return {
            tileCounts, rowCountByStatus, rowsN: rows.length, payRowsN: payRows.length,
            invoiceChipTexts, paymentChipTexts, disabledInCluster, demoInCluster, rowConfirm,
            cancelledFound: !!cancelledRow, cancelledDisabledRecord, cancelledConfirmRecord,
            drawers, hrefHash, receiptTokens,
            plannedN: plannedCards.length, plannedDisabled, plannedDigitFree, plannedHasAvailability,
            forbidden,
          };
        });
        // (a) exactly 4 tiles, each count === its facet's #invoice-list row count
        ok(a.tileCounts.length === 4, `${page}/${lang}: expected exactly 4 invoice status tiles, got ${a.tileCounts.length}`);
        for (const tl of a.tileCounts) {
          ok(tl.count === (a.rowCountByStatus[tl.status] || 0),
            `${page}/${lang}: tile '${tl.status}' shows ${tl.count} but #invoice-list has ${a.rowCountByStatus[tl.status] || 0} rows`);
        }
        // (b) 9 invoice rows + 6 payment rows baked
        ok(a.rowsN === 9, `${page}/${lang}: expected 9 baked invoice rows, got ${a.rowsN}`);
        ok(a.payRowsN === 6, `${page}/${lang}: expected 6 baked payment rows, got ${a.payRowsN}`);
        // (c) ≥1 chip text per invoice/payment status, using the exact AR/EN label copy
        for (const [id, label] of Object.entries(FIN_STATUS_LABELS)) {
          ok(a.invoiceChipTexts.includes(label), `${page}/${lang}: no invoice row shows the '${id}' status chip text "${label}"`);
        }
        for (const [id, label] of Object.entries(FIN_PAY_LABELS)) {
          ok(a.paymentChipTexts.includes(label), `${page}/${lang}: no payment row shows the '${id}' status chip text "${label}"`);
        }
        // (d) honest actions: ≥3 disabled-with-reason + ≥1 demo in the action cluster; ≥1 confirm among
        // rows; the cancelled invoice's row disables record-payment (never a confirm control there)
        ok(a.disabledInCluster >= 3, `${page}/${lang}: expected ≥3 disabled-with-reason controls in the finance action cluster, got ${a.disabledInCluster}`);
        ok(a.demoInCluster >= 1, `${page}/${lang}: expected ≥1 demo action in the finance action cluster, got ${a.demoInCluster}`);
        ok(a.rowConfirm >= 1, `${page}/${lang}: expected ≥1 [data-confirm] record-payment control among invoice rows`);
        ok(a.cancelledFound, `${page}/${lang}: no cancelled invoice row found`);
        ok(a.cancelledDisabledRecord, `${page}/${lang}: the cancelled invoice's row is missing a disabled-with-reason record-payment control`);
        ok(!a.cancelledConfirmRecord, `${page}/${lang}: the cancelled invoice's row must NOT have a confirm record-payment control`);
        // (e) one drawer template per invoice
        ok(a.drawers === 9, `${page}/${lang}: expected 9 baked invoice drawer templates, got ${a.drawers}`);
        // (f) no dead links / receipt-upload tokens in the page body
        ok(a.hrefHash === 0, `${page}/${lang}: dead href="#" present in the finance page body`);
        ok(!a.receiptTokens, `${page}/${lang}: a receipt/upload/type="file" token was found in the finance page body`);
        // (h) the planned section: exactly 9 disabled, figure-free report-cards with availability chips
        ok(a.plannedN === 9 && a.plannedDisabled === 9, `${page}/${lang}: expected exactly 9 disabled planned report-cards, got ${a.plannedN} (${a.plannedDisabled} disabled)`);
        ok(a.plannedDigitFree, `${page}/${lang}: a planned finance card shows a digit (must be figure-free)`);
        ok(a.plannedHasAvailability, `${page}/${lang}: a planned finance card is missing its availability chip`);
        // (i) no chart/score/rank/leaderboard/percentile token anywhere in the page body
        ok(!a.forbidden, `${page}/${lang}: finance page body shows a forbidden chart/score/rank/leaderboard/percentile token`);

        // (g) confirming a Record-payment action changes NO invoice status chip (before/after)
        const chipsBefore = await p.$$eval('#invoice-list .fr-meta .chip', (els) => els.map((e) => e.textContent.trim()));
        const confirmBtn = await p.$('#invoice-list [data-row]:not([data-status="cancelled"]) [data-confirm]');
        if (confirmBtn) {
          await confirmBtn.click();
          await p.waitForTimeout(160);
          const modalOpen = await p.evaluate(() => !!document.querySelector('.modal-scrim'));
          ok(modalOpen, `${page}/${lang}: Record payment did not open a confirm modal`);
          const go = await p.$('.modal-scrim [data-confirm-go]');
          if (go) { await go.click(); await p.waitForTimeout(160); }
        }
        await p.keyboard.press('Escape');
        await p.waitForTimeout(100);
        const chipsAfter = await p.$$eval('#invoice-list .fr-meta .chip', (els) => els.map((e) => e.textContent.trim()));
        ok(JSON.stringify(chipsBefore) === JSON.stringify(chipsAfter),
          `${page}/${lang}: confirming Record payment changed an invoice status chip (before=${JSON.stringify(chipsBefore)}, after=${JSON.stringify(chipsAfter)})`);

        // (j) tiles-as-filters narrows VISUALLY (computed display — the [hidden] attr alone is not
        // enough: a component display rule can win the specificity tie and leave rows rendered)
        await p.click('[data-filter-set="status:overdue"]');
        await p.waitForTimeout(250);
        const narrowed = await p.evaluate(() => {
          const rows = [...document.querySelectorAll('#invoice-list [data-row]')];
          return {
            shown: rows.filter((r) => getComputedStyle(r).display !== 'none').length,
            overdue: rows.filter((r) => r.getAttribute('data-status') === 'overdue').length,
          };
        });
        ok(narrowed.shown === narrowed.overdue,
          `${page}/${lang}: overdue tile did not visually narrow the invoice list (shown=${narrowed.shown}, expected=${narrowed.overdue})`);
      }

      // Spec 009 — Dashboard/Reports integration: no new finance chrome in the body,
      // the sidebar carries exactly one finance link, the six wallet items stay locked.
      if (page === 'dashboard' || page === 'reports') {
        const fin = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const txt = body.innerText;
          const enHit = /\b(invoice|invoices|payment|payments|billing|salary|salaries|payroll|payout|accounting)\b/i.test(txt);
          const arHit = /فاتورة|فواتير|مدفوعات|رواتب|محاسبة|الفوترة/.test(txt);
          // structural money-widget guard: a token-free finance widget (e.g. a bare "SAR 12,300" card)
          // must fail too — the only sanctioned wallet icon + currency token in a #page-body is the
          // pre-existing Spec 001 revenue KPI on the dashboard; the reports body has zero of both.
          const walletInBody = body.querySelectorAll('use[href="#i-wallet"]').length;
          const currencyTokens = (txt.match(/ريال|\bSAR\b/g) || []).length;
          const isFinanceLink = (h) => /(^|\/)finance\.(en\.)?html$/.test(h || '');
          const sidebarFinanceLinks = [...document.querySelectorAll('.sidebar a[href]')].filter((x) => isFinanceLink(x.getAttribute('href'))).length;
          const bodyFinanceLinks = [...body.querySelectorAll('a[href]')].filter((x) => isFinanceLink(x.getAttribute('href'))).length;
          const walletIds = ['invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments', 'classSalaryReport'];
          const walletOk = walletIds.every((id) => {
            const el = document.querySelector(`.nav-item[data-nav="${id}"]`);
            return !!el && el.getAttribute('data-nav-status') === 'disabled' && el.getAttribute('aria-disabled') === 'true' && !!el.querySelector('use[href="#i-lock"]');
          });
          return { enHit, arHit, sidebarFinanceLinks, bodyFinanceLinks, walletOk, walletInBody, currencyTokens };
        });
        // (a) finance-token regex over #page-body must be clean (revenue words are deliberately excluded —
        // the pre-existing Spec 001 revenue KPI legitimately says "الإيرادات الشهرية"/"Monthly revenue")
        ok(!fin.enHit, `${page}/${lang}: #page-body contains a forbidden finance token (EN: invoice/payment/billing/salary/payroll/payout/accounting)`);
        ok(!fin.arHit, `${page}/${lang}: #page-body contains a forbidden finance token (AR: فاتورة/فواتير/مدفوعات/رواتب/محاسبة/الفوترة)`);
        // (b) the sidebar carries exactly one finance link
        ok(fin.sidebarFinanceLinks === 1, `${page}/${lang}: expected exactly one sidebar finance link, got ${fin.sidebarFinanceLinks}`);
        // (c) the six wallet items remain locked/disabled
        ok(fin.walletOk, `${page}/${lang}: one or more of the six locked wallet nav items lost its disabled/lock state`);
        // (d) zero finance.html links inside the page body
        ok(fin.bodyFinanceLinks === 0, `${page}/${lang}: #page-body must not contain a finance.html link`);
        // (e) structural money-widget guard (see the evaluate block): sanctioned counts only
        const wantMoney = page === 'dashboard' ? 1 : 0;
        ok(fin.walletInBody === wantMoney, `${page}/${lang}: expected ${wantMoney} wallet icon(s) in #page-body, got ${fin.walletInBody} — a finance widget may have been added`);
        ok(fin.currencyTokens === wantMoney, `${page}/${lang}: expected ${wantMoney} currency token(s) in #page-body, got ${fin.currencyTokens} — a money figure may have been added`);
      }

      // ===== Spec 010 — navigation IA corrections (shared ADMIN sidebar; admin pages only —
      // portal pages carry the portal shell and are asserted in the Spec 012 block below) =====
      if (!PORTAL_PAGES.has(page)) {
      const nav010 = await p.evaluate(() => {
        const railCats = document.querySelectorAll('.nav-rail .rail-cat[data-nav-category]').length;
        const rep = document.getElementById('catpanel-reports');
        const adm = document.getElementById('catpanel-admin');
        const finSub = rep ? [...rep.querySelectorAll('.nav-subsection')]
          .find((s) => (s.querySelector('.nav-subsection-label')?.textContent || '').trim().length > 0) : null;
        const finLabel = finSub ? finSub.querySelector('.nav-subsection-label').textContent.trim() : '';
        const finMembers = finSub ? [...finSub.querySelectorAll('.nav-item')].map((n) => n.getAttribute('data-nav')) : [];
        const finLinks = finSub ? [...finSub.querySelectorAll('a.nav-item[data-nav-status="implemented"]')].map((n) => n.getAttribute('data-nav')) : [];
        const admItems = adm ? [...adm.querySelectorAll('.nav-item')].map((n) => n.getAttribute('data-nav')) : [];
        const banksInReports = !!rep?.querySelector('[data-nav="banks"]');
        const banksInAdmin = !!adm?.querySelector('[data-nav="banks"]');
        const sessBadge = (document.querySelector('.nav-item[data-nav="sessions"] .nav-badge')?.textContent || '').trim();
        const famTitle = (document.querySelector('#catpanel-families .cat-title')?.textContent || '').trim();
        // sitewide locked finance items (six billing + banks) — all disabled + reason + lock
        const lockedFin = ['invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments', 'classSalaryReport', 'banks'];
        const lockedOk = lockedFin.every((id) => {
          const el = document.querySelector(`.nav-item[data-nav="${id}"]`);
          return !!el && el.getAttribute('data-nav-status') === 'disabled'
            && el.getAttribute('data-reason-key') === 'nav.reason.finance'
            && !!el.querySelector('use[href="#i-lock"]');
        });
        return { railCats, finLabel, finMembers, finLinks, admItems, banksInReports, banksInAdmin, sessBadge, famTitle, lockedOk };
      });
      const expFinMembers = ['finance', 'invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments', 'classSalaryReport', 'banks'];
      const expFamTitle = lang === 'en' ? 'Families & Students' : 'العائلات والطلاب';
      const expFinLabel = lang === 'en' ? 'Finance' : 'المالية';
      ok(nav010.railCats === 6, `${page}/${lang}: expected exactly 6 rail categories, got ${nav010.railCats} (no 7th finance rail category)`);
      ok(nav010.finLabel === expFinLabel, `${page}/${lang}: finance sub-section label should be "${expFinLabel}", got "${nav010.finLabel}"`);
      ok(JSON.stringify(nav010.finMembers) === JSON.stringify(expFinMembers), `${page}/${lang}: finance sub-section members/order wrong: ${JSON.stringify(nav010.finMembers)}`);
      ok(JSON.stringify(nav010.finLinks) === JSON.stringify(['finance']), `${page}/${lang}: finance sub-section must have exactly one implemented link (finance), got ${JSON.stringify(nav010.finLinks)}`);
      ok(nav010.banksInReports && !nav010.banksInAdmin, `${page}/${lang}: banks must live in the reports finance sub-section, not admin (reports=${nav010.banksInReports}, admin=${nav010.banksInAdmin})`);
      ok(nav010.admItems.length === 5 && !nav010.admItems.includes('banks'), `${page}/${lang}: admin category should have 5 planned items and no banks, got ${JSON.stringify(nav010.admItems)}`);
      ok(nav010.lockedOk, `${page}/${lang}: the seven locked finance items (six billing + banks) must stay disabled+reason+lock`);
      // Spec 011 — the badge is localized: Arabic pages show Arabic-Indic digits, English pages Western,
      // both equal the fixture SESSIONS.total (num()/Intl.NumberFormat). Assert the locale-correct form.
      const expBadge = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ar-EG').format(Number(SESSIONS_TOTAL));
      ok(nav010.sessBadge === expBadge, `${page}/${lang}: sessions badge should be the localized fixture SESSIONS.total ("${expBadge}"), got "${nav010.sessBadge}" — must be derived and locale-formatted, not a stray/Western literal`);
      // formatter-independent guard: an Arabic badge must carry NO ASCII digit (catches a Western "24"
      // even if the Node ICU build ever collapsed both sides of the compare above to Latin digits)
      if (lang === 'ar') ok(!/[0-9]/.test(nav010.sessBadge), `${page}/ar: sessions badge must be Arabic-Indic digits only, got "${nav010.sessBadge}"`);
      ok(nav010.famTitle === expFamTitle, `${page}/${lang}: families category label should be "${expFamTitle}", got "${nav010.famTitle}"`);
      } // end admin-only Spec 010 nav IA block (Spec 012 re-scope)

      // ===== Spec 010 — link integrity crawl (every anchor: no href="#", target exists, no external) =====
      const links010 = await p.evaluate((valid) => {
        const anchors = [...document.querySelectorAll('a[href]')];
        let deadHash = 0, external = 0, badTarget = 0;
        for (const a of anchors) {
          let h = (a.getAttribute('href') || '').trim();
          if (h === '#' || h === '') { deadHash++; continue; }
          if (h.startsWith('#')) continue;                       // in-page anchor (skip link, hash view)
          if (/^https?:|^\/\//.test(h)) { external++; continue; }
          h = h.replace(/^\.\//, '');                            // normalize the relative "./" prefix
          const file = h.split('#')[0];                          // strip hash-view fragment
          if (file && !valid.includes(file)) badTarget++;
        }
        return { deadHash, external, badTarget };
      }, [...VALID_FILES]);
      // Spec 011 closed the one pre-existing dashboard "overview → view all" href="#" (now points to
      // reports.html). Zero dead href="#" is the invariant on EVERY page — any occurrence is a regression.
      ok(links010.deadHash === 0, `${page}/${lang}: ${links010.deadHash} dead href="#" link(s) (expected 0)`);
      ok(links010.external === 0, `${page}/${lang}: ${links010.external} unexpected external link(s)`);
      ok(links010.badTarget === 0, `${page}/${lang}: ${links010.badTarget} link(s) to a nonexistent page file`);

      // ===== Spec 010 — planned/backendRequired truthfulness sweep =====
      const truth010 = await p.evaluate(() => {
        const items = [...document.querySelectorAll('.nav-panel .nav-item')];
        // every non-implemented item is a <button> (cannot navigate), with a coming-soon or reason hook
        const badPlanned = items.filter((n) => n.getAttribute('data-nav-status') === 'planned'
          && (n.tagName !== 'BUTTON' || !n.hasAttribute('data-coming-soon'))).length;
        const badDisabled = items.filter((n) => n.getAttribute('data-nav-status') === 'disabled'
          && (n.tagName !== 'BUTTON' || n.getAttribute('aria-disabled') !== 'true' || !n.hasAttribute('data-reason-key'))).length;
        return { badPlanned, badDisabled };
      });
      ok(truth010.badPlanned === 0, `${page}/${lang}: ${truth010.badPlanned} planned nav item(s) not a non-navigating «قريبًا» button`);
      ok(truth010.badDisabled === 0, `${page}/${lang}: ${truth010.badDisabled} disabled nav item(s) missing button/aria-disabled/reason`);

      // ===== Spec 010 — the one sanctioned family→finance body link =====
      if (page === 'family') {
        const famFin = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const isFin = (h) => /(^|\/)finance\.(en\.)?html($|#)/.test(h || '');
          return [...body.querySelectorAll('a[href]')].filter((a) => isFin(a.getAttribute('href'))).length;
        });
        ok(famFin === 1, `${page}/${lang}: family body must contain exactly one finance link, got ${famFin}`);
      }

      // ===== Spec 012 — role portal foundation block (portal pages only) =====
      if (PORTAL_PAGES.has(page)) {
        const prt = await p.evaluate(() => {
          const shell = document.querySelector('.portal-shell');
          const role = shell ? shell.getAttribute('data-role') : '';
          const adminMarkup = !!document.querySelector('.app-shell, .nav-rail, .nav-panel');
          const switchLink = [...document.querySelectorAll('.pt-header a[href]')]
            .some((a) => /portals\.(en\.)?html$/.test(a.getAttribute('href') || ''));
          const bodyText = (document.getElementById('page-body') || document.body).innerText;
          // AR digit hygiene: the big authored counters must be Arabic-Indic on Arabic pages
          const gauges = [...document.querySelectorAll('.pt-gauge-num')];
          const gaugeCount = gauges.length;
          const gaugeAscii = gauges.filter((el) => /[0-9]/.test(el.textContent)).length;
          const planned = [...document.querySelectorAll('.pt-planned')];
          // a planned card must never navigate and must carry a LABELED chip (icon + text, never color-only)
          const plannedBad = planned.filter((c) => c.tagName === 'A' || !c.querySelector('.chip svg')
            || !(c.querySelector('.chip')?.textContent || '').trim()).length;
          const hubRoleTargets = [...document.querySelectorAll('.pt-hub-card[href]')]
            .map((a) => (a.getAttribute('href') || '').replace('.en.html', '').replace('.html', '')).sort();
          const hubAdminLink = [...document.querySelectorAll('#page-body a[href]')]
            .filter((a) => /dashboard\.(en\.)?html$/.test(a.getAttribute('href') || '')).length;
          // Spec 013 — student dashboard section/empty-state counts + planned-card graduation.
          // Bind the backend-gate check to the actual planned chips (amber lock = backendRequired,
          // neutral clock = planned), so it can't pass on descriptive prose alone.
          const sectionCount = document.querySelectorAll('.pt-section').length;
          const emptyCount = document.querySelectorAll('.pt-empty').length;
          const bodyAnchors = [...document.querySelectorAll('#page-body a[href]')].length;
          const plannedBackend = document.querySelectorAll('.pt-planned .chip.tone-amber').length;
          const plannedPlanned = document.querySelectorAll('.pt-planned .chip.tone-neutral').length;
          // Spec 014 — family: five children each carry a progress bar; the page has zero form controls
          const progressBars = document.querySelectorAll('.pt-bar').length;
          const formControls = document.querySelectorAll('#page-body form, #page-body input, #page-body select, #page-body textarea').length;
          return { hasShell: !!shell, role, adminMarkup, switchLink, bodyText, gaugeCount, gaugeAscii, plannedCount: planned.length, plannedBad, hubRoleTargets, hubAdminLink, sectionCount, emptyCount, bodyAnchors, plannedBackend, plannedPlanned, progressBars, formControls };
        });
        const expRole = page === 'portals' ? 'hub' : page.replace('-portal', '');
        ok(prt.hasShell && prt.role === expRole, `${page}/${lang}: expected .portal-shell[data-role="${expRole}"], got "${prt.role}"`);
        ok(!prt.adminMarkup, `${page}/${lang}: ADMIN shell markup (.app-shell/.nav-rail/.nav-panel) leaked into a portal page`);
        if (page !== 'portals') ok(prt.switchLink, `${page}/${lang}: portal header is missing the demo role-switch link to the hub`);
        // existence floor first, so the AR digit check below can never pass vacuously
        // Spec 013 — the deepened student dashboard: ≥2 gauge counters (overall + attendance trio),
        // ≥10 sections, the truthful Friday empty-state, and a page body that never navigates.
        if (page === 'student-portal') {
          ok(prt.gaugeCount >= 2, `${page}/${lang}: expected ≥2 progress gauge counters (overall + trio), got ${prt.gaugeCount}`);
          ok(prt.sectionCount >= 10, `${page}/${lang}: expected ≥10 dashboard sections, got ${prt.sectionCount}`);
          ok(prt.emptyCount >= 1, `${page}/${lang}: expected the friendly empty-state pattern (≥1 .pt-empty), got ${prt.emptyCount}`);
          ok(prt.bodyAnchors === 0, `${page}/${lang}: the student page body must contribute zero anchors, got ${prt.bodyAnchors}`);
          // planned-card graduation: homework + materials gates are backendRequired (amber lock),
          // full-history is planned (neutral clock) — the exact re-registered semantics.
          ok(prt.plannedBackend === 2, `${page}/${lang}: expected 2 backendRequired planned gates (homework + materials), got ${prt.plannedBackend}`);
          ok(prt.plannedPlanned === 1, `${page}/${lang}: expected 1 planned gate (full history), got ${prt.plannedPlanned}`);
        }
        // Spec 014 — the deepened family dashboard: all five fam1 children visible, ≥10 sections,
        // the truthful meetings empty-state, zero body anchors/form controls, and the ZERO-PAY hard line.
        if (page === 'family-portal') {
          ok(prt.progressBars === 5, `${page}/${lang}: expected all 5 fam1 children (5 progress bars), got ${prt.progressBars}`);
          ok(prt.sectionCount >= 10, `${page}/${lang}: expected ≥10 dashboard sections, got ${prt.sectionCount}`);
          ok(prt.emptyCount >= 1, `${page}/${lang}: expected the reassuring empty-state pattern (≥1 .pt-empty), got ${prt.emptyCount}`);
          ok(prt.bodyAnchors === 0, `${page}/${lang}: the family page body must contribute zero anchors, got ${prt.bodyAnchors}`);
          ok(prt.formControls === 0, `${page}/${lang}: the family page must contain zero form controls, got ${prt.formControls}`);
          // planned-card graduation: billing + materials gates are backendRequired (amber lock),
          // full-history + meeting-request are planned (neutral clock).
          ok(prt.plannedBackend === 2, `${page}/${lang}: expected 2 backendRequired family gates (billing + materials), got ${prt.plannedBackend}`);
          ok(prt.plannedPlanned === 2, `${page}/${lang}: expected 2 planned family gates (full history + meeting), got ${prt.plannedPlanned}`);
          // THE ZERO-PAY HARD LINE — no currency/amount/pay-action token may render on the family body
          // (Arabic-first: mirror the EN amount/price tokens with مبلغ/سعر/رسوم so a bare AR amount is caught too)
          const payFigure = /ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|ادفع|سداد|pay now|payment|\bamount\b|\bprice\b|مبلغ|سعر|رسوم/i.test(prt.bodyText);
          ok(!payFigure, `${page}/${lang}: the family dashboard shows a currency/pay figure — forbidden (SC-005, the zero-pay hard line)`);
        }
        if (lang === 'ar') ok(prt.gaugeAscii === 0, `${page}/ar: ${prt.gaugeAscii} portal counter(s) show ASCII digits — must be Arabic-Indic on Arabic pages`);
        const expPlanned = { 'student-portal': 3, 'family-portal': 4, 'teacher-portal': 2, portals: 0 }[page];
        ok(prt.plannedCount === expPlanned, `${page}/${lang}: expected ${expPlanned} planned cards, got ${prt.plannedCount}`);
        ok(prt.plannedBad === 0, `${page}/${lang}: ${prt.plannedBad} planned card(s) navigate or lack a labeled availability chip`);
        if (page === 'portals') {
          ok(JSON.stringify(prt.hubRoleTargets) === JSON.stringify(['family-portal', 'student-portal', 'teacher-portal']),
            `${page}/${lang}: hub role cards must target exactly the three portals, got ${JSON.stringify(prt.hubRoleTargets)}`);
          ok(prt.hubAdminLink === 1, `${page}/${lang}: hub should offer exactly one labeled admin-console link, got ${prt.hubAdminLink}`);
        }
        if (page === 'teacher-portal') {
          // FR-006/SC-005 — the pay-free rule, enforced on the rendered body in BOTH languages
          const payHit = /\b(salary|salaries|payouts?|earnings?|compensation)\b/i.test(prt.bodyText)
            || /راتب|رواتب|أجر|مستحقات|غرامة|مكافأة/.test(prt.bodyText);
          ok(!payHit, `${page}/${lang}: the teacher portal contains pay vocabulary — forbidden (FR-006)`);
        }
        // the student + family dashboards are table-free and mobile-clean by contract
        if (page === 'student-portal' || page === 'family-portal') {
          const tables = await p.$$eval('#page-body table', (els) => els.length);
          ok(tables === 0, `${page}/${lang}: this portal must contain zero tables, got ${tables}`);
          // mobile-first: no horizontal overflow at 390px (this context is discarded after)
          await p.setViewportSize({ width: 390, height: 900 });
          await p.waitForTimeout(120);
          const overflow = await p.evaluate(() => document.documentElement.scrollWidth);
          ok(overflow <= 391, `${page}/${lang}: horizontal overflow at 390px (scrollWidth ${overflow})`);
        }
      }

      // ===== Spec 010 — filter visibility: filtered-out rows are genuinely invisible, and only
      // matching rows stay visible (the [data-row][hidden] fix + correct narrowing) =====
      if (FILTER_SPEC[page]) {
        const spec = FILTER_SPEC[page];
        await spec.apply(p).catch(() => {});
        await p.waitForTimeout(240);
        const vis = await p.evaluate((f) => {
          const rows = [...document.querySelectorAll('[data-row]')];
          const shownRows = rows.filter((r) => getComputedStyle(r).display !== 'none');
          const leaked = rows.filter((r) => r.hasAttribute('hidden') && getComputedStyle(r).display !== 'none').length;
          const hidden = rows.filter((r) => r.hasAttribute('hidden')).length;
          // correctness: with a known facet, every still-visible row must match the applied value.
          // If the filter silently failed to engage, non-matching rows stay visible → mismatch > 0.
          const mismatch = f ? shownRows.filter((r) => (r.getAttribute('data-' + f.facet) || '').toLowerCase() !== f.value).length : 0;
          return { leaked, hidden, shown: shownRows.length, total: rows.length, mismatch };
        }, spec.facet ? { facet: spec.facet, value: spec.value } : null);
        ok(vis.leaked === 0, `${page}/${lang}: ${vis.leaked} filtered-out row(s) attribute-hidden but still visually rendered — the [data-row][hidden] fix failed`);
        ok(vis.hidden > 0, `${page}/${lang}: narrowing filter hid 0 of ${vis.total} rows — filter did not engage, visibility check is vacuous`);
        ok(vis.mismatch === 0, `${page}/${lang}: ${vis.mismatch} visible row(s) do not match the applied filter (${spec.facet}=${spec.value}) — filtering is incorrect or did not engage`);
      }

      await ctx.close();
    }
  }

  await browser.close();
  if (fails.length) { console.error('SMOKE FAILED:\n - ' + fails.join('\n - ')); process.exit(1); }
  console.log(`[smoke] PASS — ${PAGES.length * 2} page loads, no raw keys / external requests / dead buttons / unexplained disabled controls`);
  process.exit(0);
})();

/* Smoke tests: no raw i18n keys · no external (CDN) requests · no dead buttons
 * (every control gives feedback) · disabled-with-reason · keyboard reachability.
 * Exits non-zero on any failure. */
const { chromium } = require('playwright');
const { PORT } = require('../../scripts/serve.cjs');

const BASE = `http://localhost:${PORT}`;
const PAGES = ['dashboard', 'reports', 'finance', 'gallery', 'sessions', 'schedule', 'students', 'teachers', 'courses', 'settings',
  'families', 'add-family', 'family', 'student', 'attendance', 'groups', 'course', 'group', 'teacher', 'teacher-performance',
  // Spec 026 — the three new admin ops pages
  'sessions-analysis', 'public-holiday', 'scheduled-actions',
  // Spec 031 — Users&Staff / Content library / Certificates (settings folds into the existing settings page)
  'staff', 'library', 'certificates',
  // Spec 034 — Control Center pages (messages/leads/tasks/announcements/time-converter)
  'messages', 'leads', 'tasks', 'announcements', 'time-converter',
  'portals', 'student-portal', 'family-portal', 'teacher-portal', 'family-child',
  'student-schedule', 'student-homework', 'student-materials', 'student-progress', 'student-history', 'student-profile',
  'family-children', 'family-schedule', 'family-progress', 'family-billing', 'family-requests', 'family-materials', 'family-profile',
  'teacher-schedule', 'teacher-students', 'teacher-outcomes', 'teacher-tasks', 'teacher-reports', 'teacher-profile', 'teacher-library'];

// Spec 012 — the role-portal surface (portal shell, not the admin shell). Admin-shell
// assertions are scoped to admin pages; portal pages get their own block below. The
// future-role portal-ABSENCE assertion stays enforced verbatim on every ADMIN page.
const PORTAL_PAGES = new Set(['portals', 'student-portal', 'family-portal', 'teacher-portal', 'family-child',
  'student-schedule', 'student-homework', 'student-materials', 'student-progress', 'student-history', 'student-profile',
  'family-children', 'family-schedule', 'family-progress', 'family-billing', 'family-requests', 'family-materials', 'family-profile',
  'teacher-schedule', 'teacher-students', 'teacher-outcomes', 'teacher-tasks', 'teacher-reports', 'teacher-profile', 'teacher-library']);
// Spec 019 — the six student internal pages (all consume the student shell with a full 7-item, all-implemented registry)
const STUDENT_INTERNAL = new Set(['student-schedule', 'student-homework', 'student-materials', 'student-progress', 'student-history', 'student-profile']);
// Spec 020 — the seven family internal pages (all consume the family shell with a full 8-item, all-implemented registry)
const FAMILY_INTERNAL = new Set(['family-children', 'family-schedule', 'family-progress', 'family-billing', 'family-requests', 'family-materials', 'family-profile']);
// Spec 025 — the seven teacher internal pages (all consume the teacher shell with a full 8-item, all-implemented registry)
const TEACHER_INTERNAL = new Set(['teacher-schedule', 'teacher-students', 'teacher-outcomes', 'teacher-tasks', 'teacher-reports', 'teacher-profile', 'teacher-library']);
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

// ===== Spec 032 — Create-Edit Forms Completion freeze (FC-01…FC-40). Every Add/Create/
// Edit/Duplicate action now opens a form-bearing drawer: a baked <template data-preview>
// whose body holds ≥1 INERT input/select/textarea + a clickable data-disabled-reason
// backendRequired final (no fake save, no persistence, no mutation). This map pins every
// rebuilt form drawer to its host page(s); the block below audits each template body,
// re-pins the candidate-list pickers + the 3 hybrid category-create drawers, and enforces
// the MUST-OMIT / MUST-GATE contracts on every form body. ADDITIVE ONLY — every protected
// Spec-026…031 assert in this file stays byte-verbatim. =====
const FORM_DRAWERS_032 = {
  sessions: ['sess-new'], dashboard: ['sess-new'],
  families: ['fam-edit', 'fam-cat'], family: ['fam-edit', 'fam-child', 'fam-note', 'fam-cat'],
  students: ['stu-edit', 'stu-add'], student: ['stu-edit', 'stu-note'],
  courses: ['crs-add'], course: ['crs-edit', 'grp-add'],
  groups: ['grp-add'], group: ['grp-edit'],
  teachers: ['trn-edit', 'trn-add', 'trn-categories'], teacher: ['trn-edit', 'trn-note'],
  reports: ['fb-create', 'form-create', 'rep-fbcat'],
  finance: ['bank-add'], staff: ['staff-add', 'staff-edit', 'staff-dup'],
  certificates: ['cert-tpl', 'cert-create'], library: ['mat-add', 'mat-edit', 'lib-item', 'lib-cats'],
  settings: ['head-add'], attendance: [],
};
// the outcome drawer's Add-feedback form (FC-25) is NESTED inside the attended outcome
// templates (resolvable while the outcome sheet is open) on these pages
const NESTED_FB_032 = new Set(['attendance', 'sessions', 'course', 'group', 'teacher']);
// the candidate-list pickers re-pinned by Spec 032 (list + honest gate; no fake assign)
const PICKERS_032 = {
  student: ['stu-enroll', 'stu-assign', 'stu-move'],
  course: ['crs-enroll', 'crs-assign-teacher'],
  group: ['grp-assign', 'grp-assign-teacher'],
  teacher: ['trn-assign-course', 'trn-assign-group', 'trn-availability'],
  teachers: ['trn-categories'], family: ['fam-cat'],
  reports: ['rep-fbcat'], library: ['lib-cats'], staff: ['st-perm'],
};
// the 3 hybrid category drawers whose embedded Create is now a REAL form (FC-24/26/38)
const HYBRID_032 = { teachers: ['trn-categories'], reports: ['rep-fbcat'], library: ['lib-cats'] };

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

      // Spec 026 — Global Action Completion: no action may claim it happened. Every
      // data-toast / data-confirm-toast / data-confirm-msg must be honest (backendRequired
      // wording), never the old fake «(تجريبي)»/"(demo)"/"preview action"/«بنجاح»/"successfully".
      const actionInfo = await p.evaluate(() => {
        const FAKE = /\(تجريبي\)|\(demo\)|إجراء تجريبي|preview action|بنجاح|\bsuccessfully\b/i;
        const bad = [];
        document.querySelectorAll('[data-toast],[data-confirm-toast],[data-confirm-msg]').forEach((el) => {
          ['data-toast', 'data-confirm-toast', 'data-confirm-msg'].forEach((a) => {
            const v = el.getAttribute(a);
            if (v && FAKE.test(v)) bad.push(`${a}="${v.slice(0, 44)}"`);
          });
        });
        // a create/add primary must open a modal or a gate — never a bare unhandled data-action
        const fakeCreate = [...document.querySelectorAll('[data-action="new-session"],[data-action="add-session"],[data-action="apply-filter"],[data-action="clear-filter"]')].length;
        return { bad, fakeCreate };
      });
      ok(actionInfo.bad.length === 0, `${page}/${lang}: misleading success wording on an action: ${JSON.stringify(actionInfo.bad.slice(0, 3))}`);
      ok(actionInfo.fakeCreate === 0, `${page}/${lang}: ${actionInfo.fakeCreate} unhandled create/filter data-action(s) (must open a modal/gate or be a real filter)`);

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
        // Spec 026 (DU-20): the dashboard's fake .select-btn filter controls were removed (Option B) —
        // the honest replacement is a real "view all sessions" link; the remaining controls still must feed back.
        for (const sel of ['.pager:not(.is-current)', '[data-action="theme-menu"]',
          '[data-action="apps-grid"]', '[data-action="quick-actions"]']) {
          const r = await clickFeedback(sel);
          ok(!r, `${page}/${lang}: ${r}`);
        }
        // Spec 034: the Control category (default panel) no longer has a planned «قريبًا» item —
        // all 5 flipped to implemented. Reveal a category that still has one (families →
        // familyCategories) and verify the planned-item toast still fires — coverage preserved.
        await p.click('[data-nav-category="families"]').catch(() => {});
        await p.waitForTimeout(140);
        const rPlanned = await clickFeedback('.cat-panel:not([hidden]) .nav-item.is-planned');
        ok(!rPlanned, `${page}/${lang}: ${rPlanned}`);
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

      // Spec 027 — deep management: every new action opens a real modal / drawer-picker /
      // confirm / gate; NO fake create/enroll/assign/move/save. (One sanctioned amendment.)
      if (page === 'students') {
        await p.setViewportSize({ width: 1366, height: 1280 });
        const kb = await p.evaluate(() => {
          const rows = [...document.querySelectorAll('#students-table [data-row]')];
          const kebabs = [...document.querySelectorAll('#students-table [data-row-menu][data-row-menu-kind="student"]')];
          return { rows: rows.length, kebabs: kebabs.length };
        });
        ok(kb.kebabs > 0 && kb.kebabs === kb.rows, `${page}/${lang}: students table missing the per-row student kebab (${kb.kebabs}/${kb.rows})`);
        const kebab = await p.$('#students-table [data-row-menu][data-row-menu-kind="student"]');
        if (kebab) { await kebab.scrollIntoViewIfNeeded(); await kebab.click(); await p.waitForTimeout(150); }
        const menu = await p.evaluate(() => {
          const pop = document.querySelector('.popover');
          if (!pop) return { open: false };
          return {
            open: true,
            link: !!pop.querySelector('a[href*="student"]'),
            editModal: !!pop.querySelector('[data-modal-trigger][data-modal-title-key="sp.act.edit"]'),
            confirms: pop.querySelectorAll('[data-confirm]').length,
            demo: pop.querySelectorAll('[data-demo-action]').length,
          };
        });
        ok(menu.open && menu.link && menu.editModal && menu.confirms >= 2 && menu.demo === 0,
          `${page}/${lang}: student row kebab is not honest (View link + Edit modal + Suspend/Remove confirm, no demo) — ${JSON.stringify(menu)}`);
        await p.keyboard.press('Escape');
      }
      if (page === 'student') {
        const s = await p.evaluate(() => {
          const tpl = document.querySelector('template[data-preview="stu-enroll"]');
          const body = document.querySelector('#page-body') || document.body;
          return {
            enroll: !!document.querySelector('[data-drawer="stu-enroll"]'),
            assign: !!document.querySelector('[data-drawer="stu-assign"]'),
            move: !!document.querySelector('[data-drawer="stu-move"]'),
            crossGate: !!(document.querySelector('template[data-preview="stu-move"]') || {}).content?.querySelector?.('[data-reason-key="sp.move.crossReason"]'),
            editModal: !!document.querySelector('[data-modal-trigger][data-modal-title-key="sp.act.edit"]'),
            suspend: !!document.querySelector('[data-confirm][data-confirm-title]'),
            tplGate: !!(tpl && tpl.content.querySelector('[data-disabled-reason]')),
            noScore: !/\b(percentile|leaderboard)\b|<canvas|chart\.js|data-chart/i.test(body.innerHTML),
          };
        });
        ok(s.enroll && s.assign && s.move, `${page}/${lang}: student missing enroll/assign/move picker triggers`);
        ok(s.editModal, `${page}/${lang}: student Edit is not an honest modal trigger`);
        ok(s.suspend, `${page}/${lang}: student missing the suspend confirm`);
        ok(s.tplGate, `${page}/${lang}: enroll picker is not a display-only list with a backendRequired gate`);
        ok(s.crossGate, `${page}/${lang}: cross-family transfer must be an honest gate inside the move picker`);
        ok(s.noScore, `${page}/${lang}: results/evaluation must not add a computed score/rank/chart`);
      }
      if (page === 'course' || page === 'group') {
        await p.setViewportSize({ width: 1366, height: 1280 });
        const did = page === 'course' ? 'crs-enroll' : 'grp-assign';
        const ek = page === 'course' ? 'crs.act.edit' : 'grp.act.edit';
        const c = await p.evaluate(({ did2, ek2 }) => ({
          edit: !!document.querySelector(`[data-modal-trigger][data-modal-title-key="${ek2}"]`),
          addDrawer: !!document.querySelector(`[data-drawer="${did2}"]`),
          tpl: !!document.querySelector(`template[data-preview="${did2}"]`),
          createGroup: !!document.querySelector('[data-modal-trigger][data-modal-title-key="crs.act.createGroup"]'),
        }), { did2: did, ek2: ek });
        ok(c.edit, `${page}/${lang}: ${page} Edit is not an honest modal trigger`);
        ok(c.addDrawer && c.tpl, `${page}/${lang}: ${page} add-students picker (drawer + baked template) missing`);
        if (page === 'course') ok(c.createGroup, `${page}/${lang}: course missing the create-group modal trigger`);
        const trg = await p.$(`[data-drawer="${did}"]`);
        if (trg) { await trg.scrollIntoViewIfNeeded(); await trg.click(); await p.waitForTimeout(230); }
        const drw = await p.evaluate(() => {
          const d = document.querySelector('.drawer.sheet');
          if (!d) return { open: false };
          return { open: true, gate: !!d.querySelector('[data-disabled-reason]') };
        });
        ok(drw.open && drw.gate, `${page}/${lang}: ${page} add-students picker is not an honest drawer w/ backendRequired gate (${JSON.stringify(drw)})`);
        await p.keyboard.press('Escape');
      }
      if (page === 'family') {
        const fm = await p.evaluate(() => ({
          edit: !!document.querySelector('[data-modal-trigger][data-modal-title-key="fam.act.edit"]'),
          addChild: !!document.querySelector('[data-modal-trigger][data-modal-title-key="fam.act.addChild"]'),
          reclassDrawer: !!document.querySelector('[data-drawer="fam-cat"]'),
          reclassTpl: !!(document.querySelector('template[data-preview="fam-cat"]') || {}).content?.querySelector?.('[data-disabled-reason]'),
        }));
        ok(fm.edit && fm.addChild, `${page}/${lang}: family banner missing edit/add-child modal triggers`);
        ok(fm.reclassDrawer && fm.reclassTpl, `${page}/${lang}: family category reclassify drawer/template (w/ backendRequired gate) missing`);
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
        // Spec 026 (DU-07): wizard Save now opens an HONEST backendRequired modal (data-modal-trigger),
        // never a fake "saved" toast. Verify the modal opens.
        const saveBtn = await p.$('[data-step="review"] [data-modal-trigger]');
        if (saveBtn) { await saveBtn.click(); await p.waitForTimeout(200); }
        const modaled = await p.evaluate(() => !!document.querySelector('.modal-scrim'));
        ok(modaled, `${page}/${lang}: wizard Save must open an honest backendRequired modal (not a fake save toast)`);
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

      // Spec 028 — admin teacher deep management: honest kebab / modals / assign pickers /
      // availability / category drawer / status confirms; NO computed score, NO pay figure in
      // the #page-body (the shared finance nav «الرواتب» lives in the sidebar, not the body).
      // (One sanctioned amendment; the payHit/tchPay protected asserts below stay byte-verbatim.)
      const PAY28 = /راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|\bEGP\b|\bAED\b|\bEUR\b/i;
      if (page === 'teachers') {
        await p.setViewportSize({ width: 1366, height: 1280 });
        const kb = await p.evaluate((paySrc) => {
          const PAY = new RegExp(paySrc, 'i');
          const cards = [...document.querySelectorAll('#teachers-grid .dir-card')];
          const kebabs = [...document.querySelectorAll('#teachers-grid [data-row-menu][data-row-menu-kind="teacher"]')];
          const body = document.getElementById('page-body');
          return { cards: cards.length, kebabs: kebabs.length, pay: PAY.test(body.innerText),
            cat: !!document.querySelector('[data-drawer="trn-categories"]'), catTpl: !!document.querySelector('template[data-preview="trn-categories"]') };
        }, PAY28.source);
        ok(kb.kebabs > 0 && kb.kebabs === kb.cards, `${page}/${lang}: teacher cards missing the row kebab (${kb.kebabs}/${kb.cards})`);
        ok(!kb.pay, `${page}/${lang}: admin teachers page body shows a pay/salary figure — forbidden`);
        ok(kb.cat && kb.catTpl, `${page}/${lang}: teacher-categories manage drawer/template missing`);
        const kebab = await p.$('#teachers-grid [data-row-menu][data-row-menu-kind="teacher"]');
        if (kebab) { await kebab.scrollIntoViewIfNeeded(); await kebab.click(); await p.waitForTimeout(150); }
        const menu = await p.evaluate(() => {
          const pop = document.querySelector('.popover');
          if (!pop) return { open: false };
          return { open: true, link: !!pop.querySelector('a[href*="teacher"]'),
            editModal: !!pop.querySelector('[data-modal-trigger][data-modal-title-key="trn.act.edit"]'),
            confirms: pop.querySelectorAll('[data-confirm]').length, demo: pop.querySelectorAll('[data-demo-action]').length };
        });
        ok(menu.open && menu.link && menu.editModal && menu.confirms >= 2 && menu.demo === 0,
          `${page}/${lang}: teacher kebab is not honest (View link + Edit modal + confirms, no demo) — ${JSON.stringify(menu)}`);
        await p.keyboard.press('Escape');
      }
      if (page === 'teacher') {
        const t28 = await p.evaluate((paySrc) => {
          const PAY = new RegExp(paySrc, 'i');
          const body = document.getElementById('page-body');
          const gate = (id) => { const x = document.querySelector(`template[data-preview="${id}"]`); return !!(x && x.content.querySelector('[data-disabled-reason]')); };
          return {
            editModal: !!document.querySelector('.profile-banner [data-modal-trigger][data-modal-title-key="trn.act.edit"]'),
            noteModal: !!document.querySelector('.profile-banner [data-modal-trigger][data-modal-title-key="trn.act.note"]'),
            assignCourse: !!document.querySelector('[data-drawer="trn-assign-course"]') && gate('trn-assign-course'),
            assignGroup: !!document.querySelector('[data-drawer="trn-assign-group"]') && gate('trn-assign-group'),
            availability: !!document.querySelector('[data-drawer="trn-availability"]') && gate('trn-availability'),
            confirms: document.querySelectorAll('.profile-banner [data-confirm]').length,
            pay: PAY.test(body.innerText),
          };
        }, PAY28.source);
        ok(t28.editModal && t28.noteModal, `${page}/${lang}: teacher Edit/Note are not honest modal triggers`);
        ok(t28.assignCourse && t28.assignGroup, `${page}/${lang}: assign-course/group pickers (drawer + backendRequired gate) missing`);
        ok(t28.availability, `${page}/${lang}: availability drawer (with backendRequired gate) missing`);
        ok(t28.confirms >= 3, `${page}/${lang}: teacher banner missing status/delete confirms (got ${t28.confirms})`);
        ok(!t28.pay, `${page}/${lang}: admin teacher profile body shows a pay/salary figure — forbidden`);
        await p.click('[data-drawer="trn-assign-course"]').catch(() => {});
        await p.waitForTimeout(220);
        const drw = await p.evaluate(() => { const d = document.querySelector('.drawer.sheet'); return d ? { open: true, gate: !!d.querySelector('[data-disabled-reason]') } : { open: false }; });
        ok(drw.open && drw.gate, `${page}/${lang}: assign-course picker not an honest drawer w/ backendRequired gate (${JSON.stringify(drw)})`);
        await p.keyboard.press('Escape');
      }
      if (page === 'teacher-performance') {
        const perf = await p.evaluate((paySrc) => {
          const PAY = new RegExp(paySrc, 'i');
          const body = document.getElementById('page-body');
          return { noChart: !/\b(percentile|leaderboard)\b|<canvas|chart\.js|data-chart/i.test(body.innerHTML), pay: PAY.test(body.innerText) };
        }, PAY28.source);
        ok(perf.noChart, `${page}/${lang}: teacher-performance board must carry no computed percentile/leaderboard/chart`);
        ok(!perf.pay, `${page}/${lang}: teacher-performance board body shows a pay/salary figure — forbidden`);
      }
      if (page === 'course' || page === 'group') {
        const did = page === 'course' ? 'crs-assign-teacher' : 'grp-assign-teacher';
        const c = await p.evaluate((id) => ({ trigger: !!document.querySelector(`[data-drawer="${id}"]`), tpl: !!document.querySelector(`template[data-preview="${id}"]`) }), did);
        ok(c.trigger && c.tpl, `${page}/${lang}: assign-teacher picker (${did}) trigger + template missing`);
        const trg = await p.$(`[data-drawer="${did}"]`);
        if (trg) { await trg.scrollIntoViewIfNeeded(); await trg.click(); await p.waitForTimeout(230); }
        const drw = await p.evaluate(() => { const d = document.querySelector('.drawer.sheet'); return d ? { open: true, gate: !!d.querySelector('[data-disabled-reason]') } : { open: false }; });
        ok(drw.open && drw.gate, `${page}/${lang}: ${page} assign-teacher picker not an honest drawer w/ backendRequired gate (${JSON.stringify(drw)})`);
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
        ok(!a.demo, `${page}/${lang}: reports must not use a fake demo-action (Spec 029 R-G — Print is a backendRequired export gate, not a demo toast)`);
        ok(a.disabledReason >= 4, `${page}/${lang}: expected ≥4 disabled-with-reason export gates (Print/CSV/PDF/Share), got ${a.disabledReason}`);
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

        // ── Spec 029 — Feedback review + Forms/surveys folded into reports.html (no new page) ──
        const f29 = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const fbSec = document.getElementById('reports-feedback');
          const fmSec = document.getElementById('reports-forms');
          const fbRows = document.querySelectorAll('#reports-feedback-grid [data-row]').length;
          const fbDrawers = document.querySelectorAll('template[data-preview^="rep-fb-"]').length;
          const catDrawer = !!document.querySelector('template[data-preview="rep-fbcat"]');
          const fbCreate = !!document.querySelector('[data-modal-trigger][data-modal-title-key="rep.fb.createTitle"]');
          const catManage = !!document.querySelector('[data-drawer="rep-fbcat"]');
          const fmRows = document.querySelectorAll('#reports-forms-grid [data-row]').length;
          const fmDrawers = document.querySelectorAll('template[data-preview^="rep-form-"]').length;
          const fmCreate = !!document.querySelector('[data-modal-trigger][data-modal-title-key="rep.form.createTitle"]');
          // the folded feedback+forms region must carry NO chart/canvas and NO computed %/score/rank
          const seg = (fbSec ? fbSec.innerHTML : '') + (fmSec ? fmSec.innerHTML : '');
          const noChart = !/<canvas|chart\.js|apexcharts|amcharts|data-chart|<svg[^>]*class="[^"]*chart/i.test(seg);
          const noComputed = !/\b(percentile|leaderboard|\bscored?\b|\brank(ed|ing)?\b)\b/i.test(body.innerText);
          // progress form is a REAL deep-link to the existing student Evaluation tab (not a duplicate engine)
          const evalLink = [...body.querySelectorAll('a[href]')].some((a) => /student(\.en)?\.html#view=evaluation$/.test(a.getAttribute('href') || ''));
          return { fbSec: !!fbSec, fmSec: !!fmSec, fbRows, fbDrawers, catDrawer, fbCreate, catManage, fmRows, fmDrawers, fmCreate, noChart, noComputed, evalLink };
        });
        ok(f29.fbSec && f29.fmSec, `${page}/${lang}: reports is missing the folded Feedback and/or Forms section`);
        ok(f29.fbRows >= 6 && f29.fbDrawers === f29.fbRows, `${page}/${lang}: feedback rows/drawers mismatch (rows=${f29.fbRows}, drawers=${f29.fbDrawers})`);
        ok(f29.catDrawer && f29.catManage, `${page}/${lang}: feedback Manage-categories drawer/trigger missing`);
        ok(f29.fbCreate, `${page}/${lang}: Create-feedback must be an honest backendRequired modal trigger`);
        ok(f29.fmRows >= 4 && f29.fmDrawers === f29.fmRows, `${page}/${lang}: form rows/drawers mismatch (rows=${f29.fmRows}, drawers=${f29.fmDrawers})`);
        ok(f29.fmCreate, `${page}/${lang}: Create-form must be an honest backendRequired modal trigger`);
        ok(f29.noChart, `${page}/${lang}: feedback/forms region must not add a chart/canvas`);
        ok(f29.noComputed, `${page}/${lang}: reports body must not add a computed score/rank/percentile`);
        ok(f29.evalLink, `${page}/${lang}: forms section missing the real deep-link to the student Evaluation tab`);
        // a feedback detail drawer opens READ-ONLY (sheet rows + Approve/Delete confirms, no persisting inputs)
        const fbTrg = await p.$('#reports-feedback-grid [data-drawer^="rep-fb-"]');
        if (fbTrg) { await fbTrg.scrollIntoViewIfNeeded(); await fbTrg.click(); await p.waitForTimeout(200); }
        const fbDrw = await p.evaluate(() => {
          const d = document.querySelector('.drawer.sheet');
          if (!d) return { open: false };
          return {
            open: true,
            rows: d.querySelectorAll('.sheet-row').length,
            confirms: d.querySelectorAll('[data-confirm]').length,
            inputs: d.querySelectorAll('input,textarea,select').length, // read-only: none persist
          };
        });
        ok(fbDrw.open && fbDrw.rows >= 4 && fbDrw.confirms >= 2 && fbDrw.inputs === 0,
          `${page}/${lang}: feedback detail drawer is not read-only with Approve/Delete confirms (${JSON.stringify(fbDrw)})`);
        await p.keyboard.press('Escape');
        // the feedback type filter narrows the grid client-side (real static filter)
        const fbBefore = await p.$$eval('#reports-feedback-grid [data-row]', (els) => els.filter((e) => !e.hidden).length);
        await p.selectOption('select[data-filter="type"]', 'teacher').catch(() => {});
        await p.waitForTimeout(150);
        const fbAfter = await p.$$eval('#reports-feedback-grid [data-row]', (els) => els.filter((e) => !e.hidden).length);
        ok(fbAfter > 0 && fbAfter < fbBefore, `${page}/${lang}: feedback type filter did not narrow the rows (${fbBefore} → ${fbAfter})`);
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
          // Spec 032 (the ONE declared scope amendment): count the INVOICE drawer templates by
          // their inv* ids — the additive bank-add FORM drawer (FC-29) now also bakes a template
          // on this page; the "one drawer template per invoice" intent below stays exactly 9.
          const drawers = document.querySelectorAll('template[data-preview^="inv"]').length;
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
        ok(a.disabledInCluster >= 4, `${page}/${lang}: expected ≥4 disabled-with-reason controls in the finance action cluster (Create/CSV/PDF/Print), got ${a.disabledInCluster}`);
        ok(a.demoInCluster === 0, `${page}/${lang}: finance action cluster must have 0 demo-actions (Spec 030 F-J — Print is a backendRequired export gate, not a demo toast), got ${a.demoInCluster}`);
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

        // ── Spec 030 — finance tabbed hub: Salaries + Banks folded in (no new page; figure-free) ──
        const f30 = await p.evaluate(() => {
          const tabsWrap = document.querySelector('[data-tabs="finance"]');
          const tabIds = [...document.querySelectorAll('[data-tabs="finance"] [role="tab"][data-tab]')].map((tb) => tb.getAttribute('data-tab'));
          const panels = [...document.querySelectorAll('[data-tabs="finance"] [data-tabpanel]')];
          const visible = panels.filter((pn) => !pn.hidden).length;
          const salPanel = document.querySelector('[data-tabpanel="salaries"]');
          const bankPanel = document.querySelector('[data-tabpanel="banks"]');
          const salRows = salPanel ? salPanel.querySelectorAll('.card').length : 0;
          const bankRows = bankPanel ? bankPanel.querySelectorAll('.card').length : 0;
          const salGates = salPanel ? salPanel.querySelectorAll('[data-disabled-reason]').length : 0;
          const addBank = bankPanel ? !!bankPanel.querySelector('[data-modal-trigger][data-modal-title-key="fin.bank.addTitle"]') : false;
          const bankGates = bankPanel ? bankPanel.querySelectorAll('[data-disabled-reason]').length : 0;
          // figure-free: the salaries + banks panels carry NO currency/amount figure (salary/payout WORDS are fine).
          // Use textContent (not innerText) — the panels are hidden by default, and innerText would be ''.
          const figTxt = (salPanel ? salPanel.textContent : '') + ' ' + (bankPanel ? bankPanel.textContent : '');
          const salFigureFree = !/ريال|ر\.س|\bSAR\b|جنيه|\bEGP\b|\bAED\b|\bEUR\b|[$€£]|[0-9]+[.,][0-9]/.test(figTxt);
          // no credential/secret/upload anywhere in the finance body
          const bodyHTML = document.getElementById('page-body').innerHTML;
          const noSecret = !/type="password"|api[- ]?key|webhook|secret|paymob|payoneer/i.test(bodyHTML);
          const noFile = !/type="file"/i.test(bodyHTML);
          return { hasTabs: !!tabsWrap, tabIds, visible, salRows, bankRows, salGates, addBank, bankGates, salFigureFree, noSecret, noFile };
        });
        ok(f30.hasTabs && JSON.stringify(f30.tabIds) === JSON.stringify(['overview', 'salaries', 'banks']), `${page}/${lang}: finance hub tabs missing/incorrect (${JSON.stringify(f30.tabIds)})`);
        ok(f30.visible === 1, `${page}/${lang}: exactly one finance tabpanel must be visible, got ${f30.visible}`);
        ok(f30.salRows >= 6, `${page}/${lang}: salaries board missing status-first rows (${f30.salRows})`);
        ok(f30.salGates >= 4, `${page}/${lang}: salaries board missing Generate/Approve/Mark-paid/Export gates (${f30.salGates})`);
        ok(f30.salFigureFree, `${page}/${lang}: salaries/banks panel shows a pay amount figure — must be status-first FIGURE-FREE`);
        ok(f30.bankRows >= 4 && f30.addBank && f30.bankGates >= 2, `${page}/${lang}: banks board incomplete (${JSON.stringify({ bankRows: f30.bankRows, addBank: f30.addBank, bankGates: f30.bankGates })})`);
        ok(f30.noSecret && f30.noFile, `${page}/${lang}: finance body must not render a credential/secret/type=file affordance`);
        // the Salaries tab actually switches (real static tab), then restore Overview (localStorage safety)
        const salTab = await p.$('[data-tabs="finance"] [data-tab="salaries"]');
        if (salTab) { await salTab.click(); await p.waitForTimeout(150); }
        const salVisible = await p.evaluate(() => { const s = document.querySelector('[data-tabpanel="salaries"]'); return !!s && !s.hidden; });
        ok(salVisible, `${page}/${lang}: Salaries tab did not become visible on click`);
        const ovTab = await p.$('[data-tabs="finance"] [data-tab="overview"]');
        if (ovTab) { await ovTab.click(); await p.waitForTimeout(120); }
      }

      // ── Spec 031 — admin management/content/certificates/settings honesty ──
      // Display is allowed; every write/secret/file/generation is a gate. Provider names
      // (Paymob/Payoneer/Stripe) + "no secrets shown" reason text are LEGITIMATE on the
      // settings Integrations tab, so credential checks target real INPUTS (DOM), not words.
      if (page === 'staff' || page === 'library' || page === 'certificates' || page === 'settings') {
        const a31 = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const html = body.innerHTML;
          const txt = body.innerText;
          const q = (s) => body.querySelectorAll(s).length;
          const credInputs = [...body.querySelectorAll('input,textarea')]
            .filter((i) => /pass|secret|api|key|token|webhook|card|cvv/i.test((i.getAttribute('name') || '') + ' ' + (i.getAttribute('id') || ''))).length;
          return {
            passwordInputs: q('input[type="password"]'),
            fileInputs: q('input[type="file"]'),
            canvas: q('canvas'),
            credInputs,
            gates: q('[data-disabled-reason]'),
            noPdf: !/\.pdf"|\.csv"|\.xlsx"|blob:|createObjectURL|window\.open|download=/i.test(html),
            noDrag: !/ui-draggable|draggable="true"|json_data|apexcharts|chart\.js|<canvas/i.test(html),
            currency: (txt.match(/ريال|\bSAR\b|جنيه|\bEGP\b|\bAED\b|\bEUR\b|[$€£]/g) || []).length,
            tabIds: [...body.querySelectorAll('[data-tabs] [data-tab]')].map((b) => b.getAttribute('data-tab')),
            rows: q('[data-row]'),
            rowMenuStaff: q('[data-row-menu-kind="staff"]'),
            modalTriggers: q('[data-modal-trigger]'),
            permTpl: q('template[data-preview="st-perm"]'),
            certStage: q('.cert-stage'),
            themeCtl: q('[data-set-theme]'),
          };
        });
        // shared: no credential/file/canvas/pdf affordance; figure-free
        ok(a31.passwordInputs === 0 && a31.fileInputs === 0, `${page}/${lang}: renders a type=password/type=file input (${a31.passwordInputs}/${a31.fileInputs}) — forbidden`);
        ok(a31.canvas === 0 && a31.noDrag, `${page}/${lang}: a <canvas>/draggable-designer/chart-engine leaked into the 031 body`);
        ok(a31.credInputs === 0, `${page}/${lang}: a credential-like input (password/secret/api/key/token/webhook) is rendered — 031 shows locked placeholders only`);
        ok(a31.noPdf, `${page}/${lang}: a real file/pdf/download/window.open affordance leaked into the 031 body`);
        ok(a31.currency === 0, `${page}/${lang}: a currency/pay figure appears in the 031 body — must be figure-free`);
        if (page === 'staff') {
          ok(a31.rows >= 5, `staff/${lang}: staff directory rows missing (${a31.rows})`);
          ok(a31.rowMenuStaff >= 5, `staff/${lang}: per-row staff kebab missing (${a31.rowMenuStaff})`);
          ok(a31.modalTriggers >= 1, `staff/${lang}: Add-member backendRequired modal missing`);
          ok(a31.permTpl === 1, `staff/${lang}: display-only RBAC permission drawer missing`);
        }
        if (page === 'library') {
          ok(JSON.stringify(a31.tabIds) === JSON.stringify(['materials', 'books']), `library/${lang}: content tabs wrong (${JSON.stringify(a31.tabIds)})`);
          ok(a31.rows >= 6, `library/${lang}: book rows missing (${a31.rows})`);
          ok(a31.gates >= 3, `library/${lang}: upload/download/publish gates missing (${a31.gates})`);
        }
        if (page === 'certificates') {
          ok(JSON.stringify(a31.tabIds) === JSON.stringify(['templates', 'requests']), `certificates/${lang}: tabs wrong (${JSON.stringify(a31.tabIds)})`);
          ok(a31.certStage === 1, `certificates/${lang}: static designer stage missing`);
          ok(a31.gates >= 4, `certificates/${lang}: approve/reject/generate gates missing (${a31.gates})`);
        }
        if (page === 'settings') {
          ok(JSON.stringify(a31.tabIds) === JSON.stringify(['general', 'notifications', 'customization', 'security', 'users', 'integrations']), `settings/${lang}: hub tabs wrong (${JSON.stringify(a31.tabIds)})`);
          ok(a31.themeCtl >= 1, `settings/${lang}: real theme control missing — theme/lang must stay functional`);
          ok(a31.gates >= 4, `settings/${lang}: settings save/connect/test gates missing (${a31.gates})`);
        }
        // a real static tab actually switches, then restore the first tab (localStorage safety)
        const grp = page === 'settings' ? 'settings' : page === 'library' ? 'library' : page === 'certificates' ? 'certificates' : null;
        if (grp) {
          const secondTab = page === 'settings' ? 'notifications' : page === 'library' ? 'books' : 'requests';
          const tb = await p.$(`[data-tabs="${grp}"] [data-tab="${secondTab}"]`);
          if (tb) { await tb.click(); await p.waitForTimeout(120); }
          const vis = await p.evaluate((tt) => { const s = document.querySelector(`[data-tabpanel="${tt}"]`); return !!s && !s.hidden; }, secondTab);
          ok(vis, `${page}/${lang}: ${secondTab} tab did not become visible on click`);
          const firstTab = page === 'settings' ? 'general' : page === 'library' ? 'materials' : 'templates';
          const ft = await p.$(`[data-tabs="${grp}"] [data-tab="${firstTab}"]`);
          if (ft) { await ft.click(); await p.waitForTimeout(100); }
        }
      }

      // ===== Spec 032 — form-completion + MUST-OMIT/MUST-GATE + picker re-pin (additive) =====
      if (FORM_DRAWERS_032[page] || PICKERS_032[page]) {
        const f32 = await p.evaluate(({ formIds, pickerIds, hybridIds, expectNestedFb }) => {
          const out = { missing: [], fieldless: [], noGate: [], multiPrimary: [], omitLeak: [], nestedFbAdd: 0, pickerBad: [], hybridBad: [] };
          const OMIT = /pass|secret|api[-_]?key|token|webhook|otp|salary|hour[-_]?rate|fine|payout|iban|cvv/i;
          const audit = (content, id) => {
            const ctrls = content.querySelectorAll('input,select,textarea').length;
            const gates = content.querySelectorAll('[data-disabled-reason],[data-confirm]').length;
            const primaries = content.querySelectorAll('.btn-primary[data-disabled-reason]').length;
            if (ctrls === 0) out.fieldless.push(id);
            if (gates === 0) out.noGate.push(id);
            if (primaries > 1) out.multiPrimary.push(id);
            const badType = content.querySelectorAll('input[type="password"],input[type="file"]').length;
            const badName = [...content.querySelectorAll('input,select,textarea')]
              .filter((i) => OMIT.test((i.getAttribute('name') || '') + ' ' + (i.getAttribute('id') || ''))).length;
            if (badType + badName > 0) out.omitLeak.push(id);
            if (content.querySelector('canvas')) out.omitLeak.push(id + ':canvas');
          };
          for (const id of formIds) {
            const tpl = document.querySelector(`template[data-preview="${id}"]`);
            if (!tpl) { out.missing.push(id); continue; }
            audit(tpl.content, id);
          }
          // the nested fb-add form (FC-25) lives inside the attended outcome templates
          if (expectNestedFb) {
            document.querySelectorAll('template[data-preview]').forEach((tpl) => {
              const inner = tpl.content.querySelector('template[data-preview="fb-add"]');
              if (inner) { out.nestedFbAdd++; audit(inner.content, 'fb-add'); }
            });
          }
          // picker re-pin: each candidate-list drawer still renders content + an honest final
          for (const id of pickerIds) {
            const tpl = document.querySelector(`template[data-preview="${id}"]`);
            if (!tpl || !tpl.content.querySelector('[data-disabled-reason]')
              || (tpl.content.textContent || '').trim().length < 40) out.pickerBad.push(id);
          }
          // the 3 hybrid category drawers now carry a REAL create form (≥2 controls)
          for (const id of hybridIds) {
            const tpl = document.querySelector(`template[data-preview="${id}"]`);
            if (!tpl || tpl.content.querySelectorAll('input,select,textarea').length < 2) out.hybridBad.push(id);
          }
          return out;
        }, { formIds: FORM_DRAWERS_032[page] || [], pickerIds: PICKERS_032[page] || [], hybridIds: HYBRID_032[page] || [], expectNestedFb: NESTED_FB_032.has(page) });
        ok(f32.missing.length === 0, `${page}/${lang}: Spec-032 form drawer template(s) missing: ${JSON.stringify(f32.missing)}`);
        ok(f32.fieldless.length === 0, `${page}/${lang}: field-less create/edit drawer(s) (fieldlessCreateEdit must be 0): ${JSON.stringify(f32.fieldless)}`);
        ok(f32.noGate.length === 0, `${page}/${lang}: form drawer(s) without a backendRequired final: ${JSON.stringify(f32.noGate)}`);
        ok(f32.multiPrimary.length === 0, `${page}/${lang}: form drawer(s) with more than one primary final: ${JSON.stringify(f32.multiPrimary)}`);
        ok(f32.omitLeak.length === 0, `${page}/${lang}: MUST-OMIT leak inside a form body (secret/pay/upload-typed or -named control): ${JSON.stringify(f32.omitLeak)}`);
        ok(!NESTED_FB_032.has(page) || f32.nestedFbAdd >= 1, `${page}/${lang}: the outcome drawer's fb-add feedback form template is missing`);
        ok(f32.pickerBad.length === 0, `${page}/${lang}: candidate-list picker(s) lost their list/honest-final: ${JSON.stringify(f32.pickerBad)}`);
        ok(f32.hybridBad.length === 0, `${page}/${lang}: hybrid category drawer(s) missing the real create form: ${JSON.stringify(f32.hybridBad)}`);
        // behavioral proof — the first VISIBLE page-level trigger opens a sheet with real
        // controls + the gate final (kebab-hosted triggers are covered structurally above)
        if (page === 'finance') { const bt = await p.$('[data-tabs="finance"] [data-tab="banks"]'); if (bt) { await bt.click(); await p.waitForTimeout(150); } }
        const openable32 = await p.evaluate((ids) => {
          for (const id of ids) {
            const trg = document.querySelector(`[data-drawer="${id}"]`);
            if (trg && trg.offsetParent) return id;
          }
          return null;
        }, FORM_DRAWERS_032[page] || []);
        if (openable32) {
          await p.click(`[data-drawer="${openable32}"]`);
          await p.waitForTimeout(280);
          const sheet32 = await p.evaluate(() => {
            const d = document.querySelector('.drawer.sheet');
            if (!d) return { open: false };
            return { open: true, ctrls: d.querySelectorAll('input,select,textarea').length, gate: !!d.querySelector('[data-disabled-reason]') };
          });
          ok(sheet32.open && sheet32.ctrls >= 1 && sheet32.gate,
            `${page}/${lang}: form drawer "${openable32}" did not open with visible controls + a backendRequired final (${JSON.stringify(sheet32)})`);
          await p.keyboard.press('Escape');
          await p.waitForTimeout(320); // the panel removes 260ms after close — let it fully unmount
        }
        if (page === 'finance') { const ot = await p.$('[data-tabs="finance"] [data-tab="overview"]'); if (ot) { await ot.click(); await p.waitForTimeout(120); } }
      }
      // Spec 032 — sitewide MUST-GATE freeze (DOM-scoped input checks; library's data-type="file"
      // facet attribute is legitimately NOT an input) + admin-menu item-count freeze (50 items).
      const g32 = await p.evaluate(() => ({
        pw: document.querySelectorAll('input[type="password"]').length,
        file: document.querySelectorAll('input[type="file"]').length,
        canvas: document.querySelectorAll('canvas').length,
        pdfish: /window\.open|blob:|createObjectURL|\.pdf"|[^-\w]download=/i.test((document.getElementById('page-body') || document.body).innerHTML),
      }));
      ok(g32.pw === 0 && g32.file === 0 && g32.canvas === 0, `${page}/${lang}: forbidden live input/canvas affordance (pw=${g32.pw}, file=${g32.file}, canvas=${g32.canvas})`);
      ok(!g32.pdfish, `${page}/${lang}: a pdf/window.open/blob/download affordance leaked into the body`);
      if (!PORTAL_PAGES.has(page)) {
        const navCount32 = await p.evaluate(() => document.querySelectorAll('.nav-panel .nav-item').length);
        ok(navCount32 === 50, `${page}/${lang}: admin menu freeze expects exactly 50 classified nav items, got ${navCount32}`);
      }

      // ===== Spec 034 — Control Center pages: real frontend shell first, gated finals =====
      // (additive; the sitewide g32 file/canvas/pdf + base FAKE/dead-button/raw-key/href
      //  checks already run on these pages too). Per page: the shell renders + every write
      //  drawer is a form(≥1 control)+one backendRequired final; timeConverter is a real,
      //  gate-free client tool whose output actually changes on input (no external request).
      const CC_PAGES = new Set(['messages', 'leads', 'tasks', 'announcements', 'time-converter']);
      if (CC_PAGES.has(page)) {
        const cc = await p.evaluate((pg) => {
          const body = document.getElementById('page-body');
          const q = (s) => document.querySelectorAll(s).length;
          const bq = (s) => body.querySelectorAll(s).length;
          const tpl = (id) => document.querySelector(`template[data-preview="${id}"]`);
          const tplCtrls = (id) => { const x = tpl(id); return x ? x.content.querySelectorAll('input,select,textarea').length : 0; };
          const tplGate = (id) => { const x = tpl(id); return x ? x.content.querySelectorAll('[data-disabled-reason]').length : 0; };
          // an honest final gate = clickable data-disabled-reason OR an inert disabled button (both carry a reason, enforced elsewhere)
          const bodyGates = bq('[data-disabled-reason]') + bq('button[disabled]');
          const o = { fileInputs: q('input[type="file"]'), pwInputs: q('input[type="password"]'), canvas: q('canvas'), demo: bq('[data-demo-action]'), bodyGates };
          if (pg === 'messages') { o.rows = q('#msg-list [data-row]'); o.bubbles = q('.cc-bubble'); o.compose = bq('textarea'); o.groupCtrls = tplCtrls('msg-group'); o.groupGate = tplGate('msg-group'); o.memberTpl = !!tpl('msg-member'); }
          else if (pg === 'leads') { o.kpi = bq('.medallion'); o.rows = q('#leads-table [data-row]'); o.statusFilter = q('select[data-filter="status"]'); o.newCtrls = tplCtrls('lead-new'); o.newGate = tplGate('lead-new'); o.detailTpl = q('template[data-preview^="lead-l"]'); }
          else if (pg === 'tasks') { o.board = q('.cc-board-col'); o.cards = q('.cc-board .card'); o.newCtrls = tplCtrls('task-new'); o.newGate = tplGate('task-new'); o.sectionTpl = !!tpl('task-section'); }
          else if (pg === 'announcements') { o.list = q('#ann-list .card, #ann-list [data-row]'); o.compose = bq('textarea'); }
          else if (pg === 'time-converter') { o.root = q('[data-time-converter]'); o.src = q('[data-tc-source]'); o.tgt = q('[data-tc-target]'); o.dateIn = q('[data-tc-date]'); o.timeIn = q('[data-tc-time]'); o.output = q('[data-tc-output]'); o.quick = q('[data-tc-quick]'); o.tcGate = bq('[data-time-converter] [data-disabled-reason], [data-time-converter] button[disabled]'); }
          return o;
        }, page);
        ok(cc.fileInputs === 0 && cc.pwInputs === 0 && cc.canvas === 0, `${page}/${lang}: Control page has a forbidden file/password/canvas affordance`);
        ok(cc.demo === 0, `${page}/${lang}: Control page has a data-demo-action (fake action) in the body`);
        if (page === 'messages') {
          ok(cc.rows >= 3, `messages/${lang}: inbox rows missing (${cc.rows})`);
          ok(cc.bubbles >= 2, `messages/${lang}: thread bubbles missing (${cc.bubbles})`);
          ok(cc.compose >= 1 && cc.bodyGates >= 1, `messages/${lang}: compose+Send gate missing (compose=${cc.compose}, gates=${cc.bodyGates})`);
          ok(cc.groupCtrls >= 2 && cc.groupGate >= 1, `messages/${lang}: Create-Group not a form+gate (ctrls=${cc.groupCtrls}, gate=${cc.groupGate})`);
          ok(cc.memberTpl, `messages/${lang}: Add-Member drawer missing`);
        } else if (page === 'leads') {
          ok(cc.kpi >= 4, `leads/${lang}: KPI cards missing (${cc.kpi})`);
          ok(cc.rows >= 6, `leads/${lang}: lead rows missing (${cc.rows})`);
          ok(cc.statusFilter >= 1, `leads/${lang}: status filter missing`);
          ok(cc.newCtrls >= 5 && cc.newGate >= 1, `leads/${lang}: Create-Request not a form+gate (ctrls=${cc.newCtrls}, gate=${cc.newGate})`);
          ok(cc.detailTpl >= 1, `leads/${lang}: lead detail drawer missing`);
        } else if (page === 'tasks') {
          ok(cc.board >= 3, `tasks/${lang}: board columns missing (${cc.board})`);
          ok(cc.cards >= 4, `tasks/${lang}: task cards missing (${cc.cards})`);
          ok(cc.newCtrls >= 4 && cc.newGate >= 1, `tasks/${lang}: Create-task not a form+gate (ctrls=${cc.newCtrls}, gate=${cc.newGate})`);
          ok(cc.sectionTpl, `tasks/${lang}: Add-Section drawer missing`);
        } else if (page === 'announcements') {
          ok(cc.list >= 3, `announcements/${lang}: announcement list missing (${cc.list})`);
          ok(cc.compose >= 1 && cc.bodyGates >= 1, `announcements/${lang}: compose+Publish gate missing (compose=${cc.compose}, gates=${cc.bodyGates})`);
        } else if (page === 'time-converter') {
          ok(cc.root === 1 && cc.src >= 1 && cc.tgt >= 1 && cc.dateIn >= 1 && cc.timeIn >= 1 && cc.output >= 1 && cc.quick >= 1, `time-converter/${lang}: converter controls missing (${JSON.stringify(cc)})`);
          ok(cc.tcGate === 0, `time-converter/${lang}: the converter tool must have NO backendRequired gate (it works locally), got ${cc.tcGate}`);
          // behavioral: the conversion actually updates on input change, computed locally (no external request)
          await p.selectOption('[data-tc-source]', 'Africa/Cairo').catch(() => {});
          await p.selectOption('[data-tc-target]', 'America/New_York').catch(() => {});
          await p.fill('[data-tc-date]', '2026-06-20').catch(() => {});
          await p.fill('[data-tc-time]', '15:00').catch(() => {});
          await p.waitForTimeout(130);
          const o1 = await p.$eval('[data-tc-output]', (e) => e.textContent.trim()).catch(() => '');
          await p.fill('[data-tc-time]', '18:00').catch(() => {});
          await p.waitForTimeout(130);
          const o2 = await p.$eval('[data-tc-output]', (e) => e.textContent.trim()).catch(() => '');
          ok(!!o1 && !!o2 && o1 !== o2, `time-converter/${lang}: conversion output did not update on input change (o1="${o1}", o2="${o2}")`);
          ok(ext.length === 0, `time-converter/${lang}: the converter triggered ${ext.length} external request(s) — must compute locally`);
        }
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
          // Spec 018 — compact-home KPI row + family-child baked panels
          const kpiCards = document.querySelectorAll('#page-body .pt-kpi').length;
          // Spec 022 — the living-layer primitives (identity hero replaces the KPI row;
          // day rail replaces the today cards; flow strip / status stories / child-view link)
          const idHero = document.querySelectorAll('#page-body .pt-idhero').length;
          const railStops = document.querySelectorAll('#page-body .pt-rail .pt-stop').length;
          const flowSteps = document.querySelectorAll('#page-body .pt-flow-step').length;
          const storyRows = document.querySelectorAll('#page-body .pt-story').length;
          const childViewLinks = [...document.querySelectorAll('#page-body a[href]')]
            .filter((a) => /(^|\/)student-portal\.(en\.)?html$/.test(a.getAttribute('href') || '')).length;
          const childPanelCount = document.querySelectorAll('#page-body .pt-child-panel').length;
          const childDefaultVisible = [...document.querySelectorAll('#page-body .pt-child-panel')]
            .filter((el) => getComputedStyle(el).display !== 'none').map((el) => el.id);
          const plannedBackend = document.querySelectorAll('.pt-planned .chip.tone-amber').length;
          const plannedPlanned = document.querySelectorAll('.pt-planned .chip.tone-neutral').length;
          // Spec 014 — family: five children each carry a progress bar; the page has zero form controls
          const progressBars = document.querySelectorAll('.pt-bar').length;
          const formControls = document.querySelectorAll('#page-body form, #page-body input, #page-body select, #page-body textarea').length;
          // Spec 015 — teacher: the exact body-anchor inventory + the roster/board avatar floor
          const anchorTargets = [...document.querySelectorAll('#page-body a[href]')].map((a) => a.getAttribute('href') || '');
          const avatars = document.querySelectorAll('#page-body .avatar').length;
          // Spec 017 — Shell v2: role sidebar / native drawer / registry counts / shell-anchor inventory
          const sidenavs = document.querySelectorAll('.pt-sidenav').length;
          const navAside = document.querySelectorAll('.pt-sidenav .pt-nav > .pt-nav-item').length;
          const navDrawer = document.querySelectorAll('.pt-nav-drawer .pt-nav > .pt-nav-item').length;
          const drawerSummary = !!document.querySelector('details.pt-nav-drawer > summary');
          const navCurrentHrefs = [...document.querySelectorAll('.pt-nav-item[aria-current="page"]')].map((a) => a.getAttribute('href') || '');
          const plannedNavAnchors = document.querySelectorAll('a.pt-nav-item.is-planned').length;
          const navListAnchors = document.querySelectorAll('.pt-sidenav .pt-nav > a.pt-nav-item').length;
          const shellAnchors = [...document.querySelectorAll('a[href]')]
            .filter((a) => !a.closest('#page-body') && !(a.getAttribute('href') || '').startsWith('#'))
            .map((a) => a.getAttribute('href'));
          return { hasShell: !!shell, role, adminMarkup, switchLink, bodyText, gaugeCount, gaugeAscii, plannedCount: planned.length, plannedBad, hubRoleTargets, hubAdminLink, sectionCount, emptyCount, bodyAnchors, plannedBackend, plannedPlanned, progressBars, formControls, anchorTargets, avatars, sidenavs, navAside, navDrawer, drawerSummary, navCurrentHrefs, plannedNavAnchors, navListAnchors, shellAnchors, kpiCards, childPanelCount, childDefaultVisible, idHero, railStops, flowSteps, storyRows, childViewLinks };
        });
        const expRole = page === 'portals' ? 'hub' : page === 'family-child' ? 'family' : STUDENT_INTERNAL.has(page) ? 'student' : FAMILY_INTERNAL.has(page) ? 'family' : TEACHER_INTERNAL.has(page) ? 'teacher' : page.replace('-portal', '');
        ok(prt.hasShell && prt.role === expRole, `${page}/${lang}: expected .portal-shell[data-role="${expRole}"], got "${prt.role}"`);
        ok(!prt.adminMarkup, `${page}/${lang}: ADMIN shell markup (.app-shell/.nav-rail/.nav-panel) leaked into a portal page`);
        if (page !== 'portals') ok(prt.switchLink, `${page}/${lang}: portal header is missing the demo role-switch link to the hub`);
        // existence floor first, so the AR digit check below can never pass vacuously
        // Spec 018 — the COMPACT student home (re-scoped from the 013 long-home floors): the 7-band
        // recipe (4–7 sections), exactly 4 KPI cards, a body that never navigates (all detail displaced
        // to Spec 019), and the two rendered gates (homework-submit backendRequired + full-history planned).
        if (page === 'student-portal') {
          ok(prt.sectionCount >= 4 && prt.sectionCount <= 7, `${page}/${lang}: compact home must have 4–7 sections, got ${prt.sectionCount}`);
          // Spec 022 — the KPI overview row is now absorbed into the identity hero (kpiCards 4→0);
          // the living layer must be present: exactly one identity hero + a day rail with stops.
          ok(prt.kpiCards === 0, `${page}/${lang}: the KPI row is absorbed into the identity hero — expected 0 .pt-kpi, got ${prt.kpiCards}`);
          ok(prt.idHero === 1, `${page}/${lang}: expected exactly one identity hero (.pt-idhero), got ${prt.idHero}`);
          ok(prt.railStops >= 1, `${page}/${lang}: expected a living day rail with ≥1 stop, got ${prt.railStops}`);
          ok(prt.flowSteps === 0 && prt.storyRows === 0, `${page}/${lang}: the child-view home carries no flow strip / status stories, got flow ${prt.flowSteps} / story ${prt.storyRows}`);
          // Spec 019 — the honesty fix: the quick-links band now navigates to the six LIVE sibling pages
          // (a «قريبًا» pill over a live page would lie). Home body anchors 0 → 6, exact sibling targets.
          const qRe = new RegExp(`^student-(schedule|homework|materials|progress|history|profile)${lang === 'en' ? '\\.en' : ''}\\.html$`);
          const qIds = prt.anchorTargets.map((h) => (h.match(qRe) || [])[1]).filter(Boolean);
          ok(prt.bodyAnchors === 6 && prt.anchorTargets.every((h) => qRe.test(h)),
            `${page}/${lang}: student home body must be exactly 6 quick-link sibling anchors, got ${JSON.stringify(prt.anchorTargets)}`);
          ok(JSON.stringify([...new Set(qIds)].sort()) === JSON.stringify(['history', 'homework', 'materials', 'profile', 'progress', 'schedule'].sort()),
            `${page}/${lang}: the six quick links must target schedule/homework/materials/progress/history/profile exactly, got ${JSON.stringify(qIds)}`);
          ok(prt.plannedBackend === 1, `${page}/${lang}: expected 1 backendRequired gate (homework submit), got ${prt.plannedBackend}`);
          ok(prt.plannedPlanned === 1, `${page}/${lang}: expected 1 planned gate (full history), got ${prt.plannedPlanned}`);
        }
        // Spec 019 — a student INTERNAL page: the sidebar owns navigation (body anchors 0), display-only
        // (zero forms), real content (a card floor), and honest gates (profile shows exactly its three).
        if (STUDENT_INTERNAL.has(page)) {
          ok(prt.bodyAnchors === 0, `${page}/${lang}: student internal page body must contribute zero anchors, got ${prt.bodyAnchors}`);
          ok(prt.formControls === 0, `${page}/${lang}: student internal page must contain zero form controls, got ${prt.formControls}`);
          const cards = await p.$$eval('#page-body .pt-card', (els) => els.length);
          ok(cards >= 3, `${page}/${lang}: expected a real content floor (≥3 cards), got ${cards}`);
          if (page === 'student-profile') ok(prt.plannedBackend === 3, `${page}/${lang}: the profile must show exactly 3 backendRequired gates (photo/save/password), got ${prt.plannedBackend}`);
        }
        // Spec 024 B-01 — child-view surfaces must never carry pre-021 Student-primary framing
        // (the demoted child-view is «عرض الابن», owned by the family; F-00-1 correction).
        if (page === 'student-portal' || STUDENT_INTERNAL.has(page)) {
          ok(!/لوحة الطالب|بوابة الطالب|student dashboard/i.test(prt.bodyText),
            `${page}/${lang}: child-view #page-body carries forbidden Student-primary wording — must read child-view/family-owned (Spec 024 B-01)`);
        }
        // Spec 020 — a family INTERNAL page: display-only (zero forms), a real content floor, THE
        // ZERO-PAY HARD LINE on every page (the identical payFigure regex — billing is the strictest
        // surface), and the pinned drill-down inventories (children/progress = the five exact child
        // links; every other page body contributes zero anchors — the sidebar owns navigation).
        if (FAMILY_INTERNAL.has(page)) {
          ok(prt.formControls === 0, `${page}/${lang}: family internal page must contain zero form controls, got ${prt.formControls}`);
          const cards = await p.$$eval('#page-body .pt-card', (els) => els.length);
          ok(cards >= 3, `${page}/${lang}: expected a real content floor (≥3 cards), got ${cards}`);
          const famPay = /ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|ادفع|سداد|pay now|payment|\bamount\b|\bprice\b|مبلغ|سعر|رسوم/i.test(prt.bodyText);
          ok(!famPay, `${page}/${lang}: a family page shows a currency/pay figure — forbidden (the zero-pay hard line)`);
          if (page === 'family-children' || page === 'family-progress') {
            const childRe = new RegExp(`^family-child${lang === 'en' ? '\\.en' : ''}\\.html#child=(st1|st6|st11|st12|st13)$`);
            const ids = prt.anchorTargets.map((h) => (h.match(childRe) || [])[1]).filter(Boolean);
            ok(prt.bodyAnchors === 5 && prt.anchorTargets.every((h) => childRe.test(h)),
              `${page}/${lang}: body must be exactly 5 child drill-down links, got ${JSON.stringify(prt.anchorTargets)}`);
            ok(JSON.stringify([...new Set(ids)].sort()) === JSON.stringify(['st1', 'st11', 'st12', 'st13', 'st6'].sort()),
              `${page}/${lang}: the five child links must cover st1/st6/st11/st12/st13 exactly once, got ${JSON.stringify(ids)}`);
          } else {
            ok(prt.bodyAnchors === 0, `${page}/${lang}: this family page body must contribute zero anchors, got ${prt.bodyAnchors}`);
          }
          if (page === 'family-children') ok(prt.progressBars === 5, `${page}/${lang}: expected 5 child progress bars, got ${prt.progressBars}`);
          if (page === 'family-progress') ok(prt.progressBars === 5, `${page}/${lang}: expected 5 child progress bars, got ${prt.progressBars}`);
          if (page === 'family-billing') ok(prt.plannedBackend === 1, `${page}/${lang}: billing must show exactly 1 backendRequired gate, got ${prt.plannedBackend}`);
          if (page === 'family-requests') ok(prt.plannedPlanned === 1, `${page}/${lang}: requests must show exactly 1 planned gate (meeting), got ${prt.plannedPlanned}`);
          if (page === 'family-materials') {
            ok(prt.plannedBackend === 1, `${page}/${lang}: materials must show exactly 1 backendRequired gate (download), got ${prt.plannedBackend}`);
            ok(cards >= 6, `${page}/${lang}: expected ≥5 material items + the gate (≥6 cards), got ${cards}`);
          }
          if (page === 'family-profile') ok(prt.plannedBackend === 3, `${page}/${lang}: the family profile must show exactly 3 backendRequired gates (photo/save/password), got ${prt.plannedBackend}`);
        }
        // Spec 025 — a teacher INTERNAL page: teacher shell, display-only (zero forms), a real content
        // floor (≥3 cards), zero body anchors (the sidebar owns navigation; every unavailable action is
        // a non-anchor backendRequired gate), and — the teacher hard rule — ZERO pay vocabulary (the
        // payHit lineage, byte-verbatim). teacher-profile carries exactly the three write gates.
        if (TEACHER_INTERNAL.has(page)) {
          ok(prt.formControls === 0, `${page}/${lang}: teacher internal page must contain zero form controls, got ${prt.formControls}`);
          const tcards = await p.$$eval('#page-body .pt-card', (els) => els.length);
          ok(tcards >= 3, `${page}/${lang}: expected a real content floor (≥3 cards), got ${tcards}`);
          ok(prt.bodyAnchors === 0, `${page}/${lang}: teacher internal page body must contribute zero anchors, got ${prt.bodyAnchors}`);
          const tchPay = /\b(salary|salaries|payouts?|earnings?|compensation)\b/i.test(prt.bodyText) || /راتب|رواتب|أجر|مستحقات|غرامة|مكافأة/.test(prt.bodyText);
          ok(!tchPay, `${page}/${lang}: a teacher internal page contains pay vocabulary — forbidden (teacher pay-free GLOBAL)`);
          if (page === 'teacher-profile') ok(prt.plannedBackend === 3, `${page}/${lang}: the teacher profile must show exactly 3 backendRequired gates (photo/save/password), got ${prt.plannedBackend}`);
        }
        // Spec 018 — the COMPACT family home (re-scoped from the 014 long-home floors): the 7-band
        // recipe (4–7 sections), 4 KPI cards, the five REAL child drill-down links (body anchors === 5,
        // one per fam1 child, targeting family-child), a form-free body, the two rendered gates
        // (billing backendRequired + meeting planned), and — unchanged, byte-verbatim — the ZERO-PAY hard line.
        if (page === 'family-portal') {
          ok(prt.sectionCount >= 4 && prt.sectionCount <= 7, `${page}/${lang}: compact home must have 4–7 sections, got ${prt.sectionCount}`);
          // Spec 022 — the living guardian cockpit: the KPI row is absorbed into the identity hero
          // (kpiCards 4→0), plus a living day rail and the billing/requests status stories.
          ok(prt.kpiCards === 0, `${page}/${lang}: the KPI row is absorbed into the identity hero — expected 0 .pt-kpi, got ${prt.kpiCards}`);
          ok(prt.idHero === 1, `${page}/${lang}: expected exactly one identity hero (.pt-idhero), got ${prt.idHero}`);
          ok(prt.railStops >= 1, `${page}/${lang}: expected a living day rail with ≥1 stop, got ${prt.railStops}`);
          ok(prt.storyRows === 2, `${page}/${lang}: expected the two billing/requests status stories, got ${prt.storyRows}`);
          ok(prt.flowSteps === 0, `${page}/${lang}: the family home carries no teacher flow strip, got ${prt.flowSteps}`);
          ok(prt.formControls === 0, `${page}/${lang}: the family page must contain zero form controls, got ${prt.formControls}`);
          // Spec 020 — the home body is now TWO exact anchor subsets: the five child drill-downs
          // (unchanged from 018) + the seven quick-tile sibling links (the honesty fix: a «قريبًا»
          // pill over a live page would lie). Total 12, each subset pinned exactly.
          const childRe = new RegExp(`^family-child${lang === 'en' ? '\\.en' : ''}\\.html#child=(st1|st6|st11|st12|st13)$`);
          const sibRe = new RegExp(`^family-(children|schedule|progress|billing|requests|materials|profile)${lang === 'en' ? '\\.en' : ''}\\.html$`);
          const childIds = prt.anchorTargets.map((h) => (h.match(childRe) || [])[1]).filter(Boolean);
          const sibIds = prt.anchorTargets.map((h) => (h.match(sibRe) || [])[1]).filter(Boolean);
          ok(prt.bodyAnchors === 12 && prt.anchorTargets.every((h) => childRe.test(h) || sibRe.test(h)),
            `${page}/${lang}: family home body must be exactly 5 child links + 7 sibling tiles, got ${JSON.stringify(prt.anchorTargets)}`);
          ok(JSON.stringify([...new Set(childIds)].sort()) === JSON.stringify(['st1', 'st11', 'st12', 'st13', 'st6'].sort()),
            `${page}/${lang}: the five child links must target st1/st6/st11/st12/st13 exactly once, got ${JSON.stringify(childIds)}`);
          ok(JSON.stringify([...new Set(sibIds)].sort()) === JSON.stringify(['billing', 'children', 'materials', 'profile', 'progress', 'requests', 'schedule'].sort()),
            `${page}/${lang}: the seven quick tiles must target the seven family pages exactly once, got ${JSON.stringify(sibIds)}`);
          ok(prt.plannedBackend === 1, `${page}/${lang}: expected 1 backendRequired gate (billing), got ${prt.plannedBackend}`);
          ok(prt.plannedPlanned === 1, `${page}/${lang}: expected 1 planned gate (meeting request), got ${prt.plannedPlanned}`);
          // THE ZERO-PAY HARD LINE — no currency/amount/pay-action token may render on the family body
          // (Arabic-first: mirror the EN amount/price tokens with مبلغ/سعر/رسوم so a bare AR amount is caught too)
          const payFigure = /ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|ادفع|سداد|pay now|payment|\bamount\b|\bprice\b|مبلغ|سعر|رسوم/i.test(prt.bodyText);
          ok(!payFigure, `${page}/${lang}: the family dashboard shows a currency/pay figure — forbidden (SC-005, the zero-pay hard line)`);
        }
        // Spec 018 — the NEW family-child drill-down page (family shell; five baked child panels,
        // default st1 visible, pure-CSS :target deep-link switching because the frozen enhance.js tab
        // hash reads only #view=). The body's only anchors are the five #child= switcher pills; zero
        // forms; the same zero-pay hard line applies here too.
        if (page === 'family-child') {
          ok(prt.childPanelCount === 5, `${page}/${lang}: expected 5 baked child panels, got ${prt.childPanelCount}`);
          ok(JSON.stringify(prt.childDefaultVisible) === JSON.stringify(['child=st1']),
            `${page}/${lang}: exactly the default child (st1) must be visible on load, got ${JSON.stringify(prt.childDefaultVisible)}`);
          ok(prt.formControls === 0, `${page}/${lang}: the family-child page must contain zero form controls, got ${prt.formControls}`);
          // Spec 022 — the ONE sanctioned body delta (Spec 021 DEC-006): the five #child= switcher
          // pills (unchanged) + exactly one child-view fold-point link (→ student-portal). Body
          // anchors 5→6; the panels/default/switcher machinery below stays byte-verbatim.
          const switchRe = /^#child=(st1|st6|st11|st12|st13)$/;
          const foldRe = /^student-portal(\.en)?\.html$/;
          const switchIds = prt.anchorTargets.map((h) => (h.match(switchRe) || [])[1]).filter(Boolean);
          const foldLinks = prt.anchorTargets.filter((h) => foldRe.test(h)).length;
          ok(prt.bodyAnchors === 6 && prt.anchorTargets.every((h) => switchRe.test(h) || foldRe.test(h)),
            `${page}/${lang}: family-child body must be 5 #child= switchers + 1 child-view link, got ${JSON.stringify(prt.anchorTargets)}`);
          ok(JSON.stringify([...new Set(switchIds)].sort()) === JSON.stringify(['st1', 'st11', 'st12', 'st13', 'st6'].sort()),
            `${page}/${lang}: the switcher must cover st1/st6/st11/st12/st13 exactly, got ${JSON.stringify(switchIds)}`);
          ok(foldLinks === 1, `${page}/${lang}: family-child must carry exactly one child-view fold-point link, got ${foldLinks}`);
          const payFigure = /ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|ادفع|سداد|pay now|payment|\bamount\b|\bprice\b|مبلغ|سعر|رسوم/i.test(prt.bodyText);
          ok(!payFigure, `${page}/${lang}: the family-child page shows a currency/pay figure — forbidden (the zero-pay hard line)`);
        }
        if (lang === 'ar') ok(prt.gaugeAscii === 0, `${page}/ar: ${prt.gaugeAscii} portal counter(s) show ASCII digits — must be Arabic-Indic on Arabic pages`);
        const expPlanned = { 'student-portal': 2, 'family-portal': 2, 'teacher-portal': 1, portals: 0, 'family-child': 0,
          'student-schedule': 0, 'student-homework': 1, 'student-materials': 1, 'student-progress': 0, 'student-history': 0, 'student-profile': 3,
          'family-children': 0, 'family-schedule': 0, 'family-progress': 0, 'family-billing': 1, 'family-requests': 1, 'family-materials': 1, 'family-profile': 3,
          'teacher-schedule': 0, 'teacher-students': 0, 'teacher-outcomes': 1, 'teacher-tasks': 0, 'teacher-reports': 0, 'teacher-profile': 3, 'teacher-library': 0 }[page];
        ok(prt.plannedCount === expPlanned, `${page}/${lang}: expected ${expPlanned} planned cards, got ${prt.plannedCount}`);
        ok(prt.plannedBad === 0, `${page}/${lang}: ${prt.plannedBad} planned card(s) navigate or lack a labeled availability chip`);
        if (page === 'portals') {
          // Spec 022 (Spec 021 DEC-001/002/004) — the CORRECTED role model: the hub leads with the
          // TWO primary role cards (family + teacher) + the admin console; the student surface is
          // DEMOTED to exactly one secondary child-view preview link (never a fourth role card).
          ok(JSON.stringify(prt.hubRoleTargets) === JSON.stringify(['family-portal', 'teacher-portal']),
            `${page}/${lang}: hub primary role cards must be exactly family + teacher (student is demoted), got ${JSON.stringify(prt.hubRoleTargets)}`);
          ok(prt.hubAdminLink === 1, `${page}/${lang}: hub should offer exactly one labeled admin-console link, got ${prt.hubAdminLink}`);
          ok(prt.childViewLinks === 1, `${page}/${lang}: hub must offer exactly one demoted child-view preview link (→ student-portal), got ${prt.childViewLinks}`);
        }
        if (page === 'teacher-portal') {
          // FR-006/SC-005 — the pay-free rule, enforced on the rendered body in BOTH languages
          const payHit = /\b(salary|salaries|payouts?|earnings?|compensation)\b/i.test(prt.bodyText)
            || /راتب|رواتب|أجر|مستحقات|غرامة|مكافأة/.test(prt.bodyText);
          ok(!payHit, `${page}/${lang}: the teacher portal contains pay vocabulary — forbidden (FR-006)`);
          // Spec 018 — the COMPACT teacher cockpit (re-scoped from the 015 long-home floors): the 7-band
          // recipe (4–7 sections), 4 KPI cards, a form-free body, the KEPT single page-body anchor pinned
          // to the performance board, and the one rendered gate (outcome-save backendRequired).
          ok(prt.sectionCount >= 4 && prt.sectionCount <= 7, `${page}/${lang}: compact home must have 4–7 sections, got ${prt.sectionCount}`);
          // Spec 022 — the living teaching cockpit: the KPI row is absorbed into the identity hero
          // (kpiCards 4→0), plus a living day rail and the prepare→attend→record→review flow strip.
          ok(prt.kpiCards === 0, `${page}/${lang}: the KPI row is absorbed into the identity hero — expected 0 .pt-kpi, got ${prt.kpiCards}`);
          ok(prt.idHero === 1, `${page}/${lang}: expected exactly one identity hero (.pt-idhero), got ${prt.idHero}`);
          ok(prt.railStops >= 1, `${page}/${lang}: expected a living day rail with ≥1 stop, got ${prt.railStops}`);
          ok(prt.flowSteps === 4, `${page}/${lang}: expected the 4-step outcome flow strip (prepare→attend→record→review), got ${prt.flowSteps}`);
          ok(prt.storyRows === 0, `${page}/${lang}: the teacher home carries no family status stories, got ${prt.storyRows}`);
          ok(prt.bodyAnchors === 1, `${page}/${lang}: the teacher page body must contribute exactly ONE anchor (the performance link), got ${prt.bodyAnchors}`);
          ok(prt.anchorTargets.every((h) => /(^|\/)teacher-reports\.(en\.)?html$/.test(h)),
            `${page}/${lang}: the teacher body anchor must target the teacher-reports page (Spec 025 repoint), got ${JSON.stringify(prt.anchorTargets)}`);
          ok(prt.formControls === 0, `${page}/${lang}: the teacher page must contain zero form controls, got ${prt.formControls}`);
          ok(prt.plannedBackend === 1, `${page}/${lang}: expected 1 backendRequired gate (outcome save), got ${prt.plannedBackend}`);
          ok(prt.plannedPlanned === 0, `${page}/${lang}: expected 0 planned teacher gates on the compact home, got ${prt.plannedPlanned}`);
        }
        // ===== Spec 017 — Shell v2: role sidebar + native drawer + the sanctioned anchor registry.
        // The nav is baked twice (desktop aside + mobile details drawer), all of it OUTSIDE
        // #page-body — so every body-scoped assert above is untouched by construction. =====
        if (page === 'portals') {
          ok(prt.sidenavs === 0 && !prt.drawerSummary, `${page}/${lang}: the hub must not carry the role sidebar/drawer`);
          ok(prt.shellAnchors.length === 0, `${page}/${lang}: the hub shell must contribute zero non-hash anchors outside the body, got ${prt.shellAnchors.length}`);
        } else if (page === 'family-child') {
          // Spec 018/020 — the family-child page consumes the FAMILY shell; home STAYS the active nav
          // anchor (build passes no activeId → shell default 'home' — the drill-down semantics), so
          // aria-current still points at family-portal. After the Spec-020 flip the registry bakes as
          // 8 LINKS ×2 instances (+ hub×3 = multiset 19); it remains OUT of the sidebar itself.
          const homeHref = `family-portal${lang === 'en' ? '.en' : ''}.html`;
          const hubHref = `portals${lang === 'en' ? '.en' : ''}.html`;
          const famBases = ['family-portal', 'family-children', 'family-schedule', 'family-progress', 'family-billing', 'family-requests', 'family-materials', 'family-profile'];
          const wantFam = famBases.map((b) => `${b}${lang === 'en' ? '.en' : ''}.html`).concat(hubHref).sort();
          ok(prt.sidenavs === 1, `${page}/${lang}: expected exactly one role sidebar, got ${prt.sidenavs}`);
          ok(prt.navAside === 8 && prt.navDrawer === 8, `${page}/${lang}: family registry count mismatch (aside ${prt.navAside} / drawer ${prt.navDrawer}, want 8)`);
          ok(prt.drawerSummary, `${page}/${lang}: the native mobile nav disclosure (details>summary) is missing`);
          ok(prt.navCurrentHrefs.length === 2 && prt.navCurrentHrefs.every((h) => h === homeHref),
            `${page}/${lang}: family-child must keep home (family-portal) active once per nav instance, got ${JSON.stringify(prt.navCurrentHrefs)}`);
          ok(prt.plannedNavAnchors === 0, `${page}/${lang}: planned nav entries must never be anchors, got ${prt.plannedNavAnchors}`);
          ok(prt.navListAnchors === 8, `${page}/${lang}: expected all 8 family nav items implemented as links, got ${prt.navListAnchors}`);
          const uniq = [...new Set(prt.shellAnchors)].sort();
          ok(JSON.stringify(uniq) === JSON.stringify(wantFam),
            `${page}/${lang}: family-child shell anchors outside {8 family pages, hub}: ${JSON.stringify(uniq)}`);
          ok(prt.shellAnchors.length === 19,
            `${page}/${lang}: sanctioned family shell-anchor multiset must be 19 (8×2 + hub×3), got ${prt.shellAnchors.length}`);
        } else if (page === 'family-portal' || FAMILY_INTERNAL.has(page)) {
          // Spec 020 — after the flip, EVERY family page carries the full 8-item registry, ALL
          // implemented: aside + drawer each render 8 links; the current page is the active one;
          // the shell-anchor multiset is 19 (8 nav ×2 + hub×3).
          const selfHref = `${page}${lang === 'en' ? '.en' : ''}.html`;
          const hubHref = `portals${lang === 'en' ? '.en' : ''}.html`;
          const famBases = ['family-portal', 'family-children', 'family-schedule', 'family-progress', 'family-billing', 'family-requests', 'family-materials', 'family-profile'];
          const wantFam = famBases.map((b) => `${b}${lang === 'en' ? '.en' : ''}.html`).concat(hubHref).sort();
          ok(prt.sidenavs === 1, `${page}/${lang}: expected exactly one role sidebar, got ${prt.sidenavs}`);
          ok(prt.navAside === 8 && prt.navDrawer === 8,
            `${page}/${lang}: family registry count mismatch (aside ${prt.navAside} / drawer ${prt.navDrawer}, want 8)`);
          ok(prt.drawerSummary, `${page}/${lang}: the native mobile nav disclosure (details>summary) is missing`);
          ok(prt.navCurrentHrefs.length === 2 && prt.navCurrentHrefs.every((h) => h === selfHref),
            `${page}/${lang}: expected this page active once per nav instance (2×self), got ${JSON.stringify(prt.navCurrentHrefs)}`);
          ok(prt.plannedNavAnchors === 0, `${page}/${lang}: planned nav entries must never be anchors, got ${prt.plannedNavAnchors}`);
          ok(prt.navListAnchors === 8, `${page}/${lang}: expected all 8 family nav items implemented as links, got ${prt.navListAnchors}`);
          const uniq = [...new Set(prt.shellAnchors)].sort();
          ok(JSON.stringify(uniq) === JSON.stringify(wantFam),
            `${page}/${lang}: family shell anchors outside {8 family pages, hub}: ${JSON.stringify(uniq)}`);
          ok(prt.shellAnchors.length === 19,
            `${page}/${lang}: sanctioned family shell-anchor multiset must be 19 (8×2 + hub×3), got ${prt.shellAnchors.length}`);
        } else if (page === 'student-portal' || STUDENT_INTERNAL.has(page)) {
          // Spec 019 — after the nav flip, EVERY student page carries the full 7-item registry, ALL
          // implemented: aside + drawer each render 7 links; the current page is the active one; the
          // shell-anchor multiset is 17 (7 nav ×2 + hub×3), unique = {the 7 student pages + hub}.
          const selfHref = `${page}${lang === 'en' ? '.en' : ''}.html`;
          const hubHref = `portals${lang === 'en' ? '.en' : ''}.html`;
          const stuBases = ['student-portal', 'student-schedule', 'student-homework', 'student-materials', 'student-progress', 'student-history', 'student-profile'];
          const wantSet = stuBases.map((b) => `${b}${lang === 'en' ? '.en' : ''}.html`).concat(hubHref).sort();
          ok(prt.sidenavs === 1, `${page}/${lang}: expected exactly one role sidebar, got ${prt.sidenavs}`);
          ok(prt.navAside === 7 && prt.navDrawer === 7,
            `${page}/${lang}: student registry count mismatch (aside ${prt.navAside} / drawer ${prt.navDrawer}, want 7)`);
          ok(prt.drawerSummary, `${page}/${lang}: the native mobile nav disclosure (details>summary) is missing`);
          ok(prt.navCurrentHrefs.length === 2 && prt.navCurrentHrefs.every((h) => h === selfHref),
            `${page}/${lang}: expected this page active once per nav instance (2×self), got ${JSON.stringify(prt.navCurrentHrefs)}`);
          ok(prt.plannedNavAnchors === 0, `${page}/${lang}: planned nav entries must never be anchors, got ${prt.plannedNavAnchors}`);
          ok(prt.navListAnchors === 7, `${page}/${lang}: expected all 7 student nav items implemented as links, got ${prt.navListAnchors}`);
          const uniq = [...new Set(prt.shellAnchors)].sort();
          ok(JSON.stringify(uniq) === JSON.stringify(wantSet),
            `${page}/${lang}: student shell anchors outside {7 student pages, hub}: ${JSON.stringify(uniq)}`);
          ok(prt.shellAnchors.length === 17,
            `${page}/${lang}: sanctioned student shell-anchor multiset must be 17 (7×2 + hub×3), got ${prt.shellAnchors.length}`);
        } else if (page === 'teacher-portal' || TEACHER_INTERNAL.has(page)) {
          // Spec 025 — after the flip, EVERY teacher page carries the full 8-item registry, ALL
          // implemented: aside + drawer each render 8 links; the current page is the active one;
          // the shell-anchor multiset is 19 (8 nav ×2 + hub×3). NO planned nav anchors; no chat/pay nav.
          const selfHref = `${page}${lang === 'en' ? '.en' : ''}.html`;
          const hubHref = `portals${lang === 'en' ? '.en' : ''}.html`;
          const tchBases = ['teacher-portal', 'teacher-schedule', 'teacher-students', 'teacher-outcomes', 'teacher-tasks', 'teacher-reports', 'teacher-library', 'teacher-profile'];
          const wantTch = tchBases.map((b) => `${b}${lang === 'en' ? '.en' : ''}.html`).concat(hubHref).sort();
          ok(prt.sidenavs === 1, `${page}/${lang}: expected exactly one role sidebar, got ${prt.sidenavs}`);
          ok(prt.navAside === 8 && prt.navDrawer === 8,
            `${page}/${lang}: teacher registry count mismatch (aside ${prt.navAside} / drawer ${prt.navDrawer}, want 8)`);
          ok(prt.drawerSummary, `${page}/${lang}: the native mobile nav disclosure (details>summary) is missing`);
          ok(prt.navCurrentHrefs.length === 2 && prt.navCurrentHrefs.every((h) => h === selfHref),
            `${page}/${lang}: expected this page active once per nav instance (2×self), got ${JSON.stringify(prt.navCurrentHrefs)}`);
          ok(prt.plannedNavAnchors === 0, `${page}/${lang}: planned nav entries must never be anchors, got ${prt.plannedNavAnchors}`);
          ok(prt.navListAnchors === 8, `${page}/${lang}: expected all 8 teacher nav items implemented as links, got ${prt.navListAnchors}`);
          const uniq = [...new Set(prt.shellAnchors)].sort();
          ok(JSON.stringify(uniq) === JSON.stringify(wantTch),
            `${page}/${lang}: teacher shell anchors outside {8 teacher pages, hub}: ${JSON.stringify(uniq)}`);
          ok(prt.shellAnchors.length === 19,
            `${page}/${lang}: sanctioned teacher shell-anchor multiset must be 19 (8×2 + hub×3), got ${prt.shellAnchors.length}`);
        }

        // Spec 018 — the compact role homes + family-child are table-free and mobile-clean; the three
        // homes also carry the HARD COMPACTNESS CEILING (the endless page can never return).
        const isCompactHome = page === 'student-portal' || page === 'family-portal' || page === 'teacher-portal';
        const isInternalPage = STUDENT_INTERNAL.has(page) || FAMILY_INTERNAL.has(page) || TEACHER_INTERNAL.has(page);
        const isRoleContent = isCompactHome || page === 'family-child' || isInternalPage;
        if (isRoleContent) {
          const tables = await p.$$eval('#page-body table', (els) => els.length);
          ok(tables === 0, `${page}/${lang}: this portal must contain zero tables, got ${tables}`);
        }
        if (isCompactHome) {
          // ceiling probe @1366×768 — scrollHeight must sit in the compact window [900, 2200]px (research D1)
          await p.setViewportSize({ width: 1366, height: 768 });
          await p.waitForTimeout(150);
          const tallH = await p.evaluate(() => document.documentElement.scrollHeight);
          ok(tallH >= 900 && tallH <= 2200, `${page}/${lang}: scrollHeight ${tallH}px is outside the compact window [900, 2200] @1366×768 — the endless page must not return`);
        } else if (isInternalPage) {
          // Spec 019 — student internal pages carry the same HARD CEILING (endless page can never return);
          // a lower floor [500] because a single-purpose page is legitimately shorter than a home.
          await p.setViewportSize({ width: 1366, height: 768 });
          await p.waitForTimeout(150);
          const tallH = await p.evaluate(() => document.documentElement.scrollHeight);
          ok(tallH >= 500 && tallH <= 2200, `${page}/${lang}: scrollHeight ${tallH}px is outside the compact window [500, 2200] @1366×768 — the endless page must not return`);
        }
        if (isRoleContent) {
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
          // correctness: with a known facet, every still-visible row IN THAT FACET'S DOMAIN must match
          // the applied value. If the filter silently failed to engage, matching-domain rows stay
          // visible → mismatch > 0. (Spec 029: reports now hosts TWO independent facet domains — the
          // area facet over the category cards AND a type/status facet over the folded feedback rows;
          // rows that do not carry the applied facet attribute are outside this filter's domain and are
          // not judged here. A broken area filter still trips this: the area cards DO carry data-area.)
          const mismatch = f ? shownRows.filter((r) => r.hasAttribute('data-' + f.facet) && (r.getAttribute('data-' + f.facet) || '').toLowerCase() !== f.value).length : 0;
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

  // ===== Spec 022 — reduced-motion CSS audit: every auto-playing living-layer animation
  // (lv-fill / lv-fadeup / lv-pulse) must be quarantined inside the prefers-reduced-motion:
  // no-preference guard. No such animation may be DECLARED before that guard — so with reduced
  // motion the pages render their finished, static state. (Works on the minified build.) =====
  {
    const css = fs.readFileSync(require('path').join(__dirname, '../../public/assets/app.css'), 'utf8');
    const at = css.search(/@media\s*\(prefers-reduced-motion:\s*no-preference\)/);
    ok(at !== -1, 'app.css: the prefers-reduced-motion: no-preference guard is missing');
    // brace-match the guard block so the audit covers the WHOLE file OUTSIDE it (before AND after),
    // not just the prefix — an lv-* animation declared anywhere but inside the guard fails this.
    let end = css.length;
    if (at !== -1) {
      let depth = 0;
      for (let i = css.indexOf('{', at); i < css.length; i++) {
        if (css[i] === '{') depth++;
        else if (css[i] === '}' && --depth === 0) { end = i; break; }
      }
    }
    const outside = at === -1 ? css : css.slice(0, at) + css.slice(end + 1);
    const leak = (outside.match(/animation(-name)?\s*:\s*[^;}]*\blv-(fill|fadeup|pulse)\b/g) || []).length;
    ok(leak === 0, `app.css: ${leak} living-layer animation(s) declared OUTSIDE the reduced-motion guard`);
  }

  // ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103 =====
  {
    const pub = fs.readdirSync(path.join(__dirname, '../../public')).filter((f) => f.endsWith('.html'));
    ok(pub.length === 113, `route freeze: public/ must hold exactly 113 HTML pages (56×2+index; Spec 034 +10), got ${pub.length}`);
    ok(pub.includes('index.html'), 'route freeze: index.html missing');
    for (const b of PAGES) {
      ok(pub.includes(`${b}.html`) && pub.includes(`${b}.en.html`), `route freeze: ${b} is missing a language mirror`);
    }
  }

  if (fails.length) { console.error('SMOKE FAILED:\n - ' + fails.join('\n - ')); process.exit(1); }
  console.log(`[smoke] PASS — ${PAGES.length * 2} page loads, no raw keys / external requests / dead buttons / unexplained disabled controls`);
  process.exit(0);
})();

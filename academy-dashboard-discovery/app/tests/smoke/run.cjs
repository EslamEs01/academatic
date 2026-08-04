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
  // Spec 035 — Schedule Search (families-category nav completion; the only new page base)
  'schedule-search',
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

async function waitForOnlyPanel(page, group, panel) {
  await page.waitForFunction(([expectedGroup, expectedPanel]) => {
    const visible = [...document.querySelectorAll(`[data-tabs="${expectedGroup}"] [data-tabpanel]`)]
      .filter((candidate) => !candidate.hidden)
      .map((candidate) => candidate.getAttribute('data-tabpanel'));
    return visible.length === 1 && visible[0] === expectedPanel;
  }, [group, panel], { timeout: 5000 });
}

async function openRequiredMenu(page, selector) {
  const trigger = page.locator(selector);
  if (await trigger.count() !== 1) throw new Error(`required menu trigger must exist exactly once: ${selector}`);
  await trigger.waitFor({ state: 'visible', timeout: 5000 });
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    await trigger.click();
    if (await trigger.getAttribute('aria-expanded') === 'true') return;
    await page.waitForTimeout(100);
  }
  throw new Error(`required menu did not open after its enhancement listener became available: ${selector}`);
}

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
  // Spec 035 — schedule-search availability facet over authored candidate rows (client-side only)
  'schedule-search': { facet: 'availability', value: 'available', apply: (p) => p.selectOption('select[data-filter="availability"]', 'available') },
};

// ===== Spec 032 — Create-Edit Forms Completion freeze (FC-01…FC-40). Every Add/Create/
// Edit/Duplicate action now opens a form-bearing drawer: a baked <template data-preview>
// whose body holds ≥1 input/select/textarea + exactly one active data-interaction-submit
// backendRequired final (validation + no fake save, no persistence, no mutation). This map pins every
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
  // Spec 041 — S1 (RELOCATION, not a weakening): `trn-add` and `trn-categories` are no longer DRAWERS on
  // teachers.html. Under D-1 their forms MOVED into real tab panels (#view=add / #view=categories), reached
  // directly from the sidebar with no second click. The guarantee is unchanged — same 13 fields, same CV gate,
  // exactly one backendRequired Save — only the HOST moved. The compensating assertions live in the sp041
  // direct-surface block. `teacher` (teacher.html) is UNTOUCHED.
  teachers: ['trn-edit'], teacher: ['trn-edit', 'trn-note'],
  reports: ['fb-create', 'form-create', 'rep-fbcat'],
  finance: ['bank-add'], staff: ['staff-add', 'staff-edit', 'staff-dup'],
  certificates: ['cert-tpl', 'cert-create'], library: ['mat-add', 'mat-edit', 'lib-item', 'lib-cats'],
  // Spec 040 — SANCTIONED STRENGTHENING T2: the 11 provider Configure drawers are REGISTERED.
  // An unregistered drawer silently escapes the fieldless / noGate / multiPrimary / MUST-OMIT /
  // canvas audit below — that would be a spec failure, not a pass.
  settings: [
    'head-add',
    'integ-stripe', 'integ-paypal', 'integ-mollie', 'integ-xpay', 'integ-payoneer', 'integ-paymob',
    'integ-custom', 'integ-paymob-payout', 'integ-payoneer-payout', 'integ-whatsapp', 'integ-email',
  ],
  attendance: [],
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
  // Spec 041 — S2 (RELOCATION): the teachers entry is removed — the category surface is a TAB panel now,
  // not a picker drawer. family/reports/library/staff are byte-verbatim.
  family: ['fam-cat'],
  reports: ['rep-fbcat'], library: ['lib-cats'], staff: ['st-perm'],
};
// the 3 hybrid category drawers whose embedded Create is now a REAL form (FC-24/26/38)
// Spec 041 — S3 (RELOCATION): the teachers entry is removed. The "category list + a REAL embedded create
// form" guarantee did not disappear — it moved to the #view=categories tab panel and is asserted there.
// reports/library are byte-verbatim.
const HYBRID_032 = { reports: ['rep-fbcat'], library: ['lib-cats'] };

(async () => {
  const LAUNCH = () => chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  let browser = await LAUNCH();
  const relaunch = async () => { await browser.close().catch(() => {}); browser = await LAUNCH(); };

  for (const page of PAGES) {
    // Fresh browser per base page: rolling one browser across all 114 pages×2 locales
    // accumulates renderer state and the host OOM-kills it mid-crawl (crash at a moving page,
    // "Target page ... has been closed", no SMOKE FAILED line — an infrastructure failure).
    // A fresh browser per page bounds peak memory at a single clean browser.
    await relaunch();
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
        // ── Spec 040 — SUPERSESSION S2: the planned-item CLICK probe is RETIRED ──────────────
        // Settings was the LAST planned-bearing category. Spec 040 flipped its six items to real
        // deep-links, so sitewide planned === 0 and there is NO honest specimen left to click.
        // Keeping a dishonest planned nav item purely to feed a test is forbidden, and the probe
        // must NEVER be repointed at classSalaryReport — a `disabled` lock is categorically NOT a
        // planned item, and it keeps its own probe below (byte-verbatim, still exercised).
        //
        // Precedent: components/portal-shell.js:30 has rendered an `is-planned` branch with ZERO
        // instances since Spec 025, and the suite already expresses that as an honest VACUOUS
        // assert (plannedNavAnchors === 0). "Zero coming-soon claims left" is a product milestone,
        // not a coverage hole. The production render branches (sidebar.js `is-planned` +
        // data-coming-soon, and the enhance.js coming-soon handler) are RETAINED, not deleted —
        // zero-deletion law.
        //
        // Replacement coverage: (1) the sitewide zero-census below; (2) the six anchor asserts in
        // the nav040 block; (3) the nav.config SOURCE audit (planned === 0) after browser.close().
        await p.click('[data-nav-category="settings"]').catch(() => {});
        await p.waitForTimeout(140);
        const zeroPlanned = await p.evaluate(() => ({
          planned: document.querySelectorAll('.nav-item.is-planned').length,
          comingSoon: document.querySelectorAll('[data-coming-soon]').length,
        }));
        ok(zeroPlanned.planned === 0 && zeroPlanned.comingSoon === 0,
          `${page}/${lang}: Spec 040 — the product must carry ZERO planned «قريبًا» nav items (got planned=${zeroPlanned.planned}, coming-soon=${zeroPlanned.comingSoon})`);
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
          reclassTerminals: (document.querySelector('template[data-preview="fam-cat"]') || {}).content
            ?.querySelectorAll?.('.btn-primary[data-interaction-submit][data-reason-key]').length || 0,
        }));
        ok(fm.edit && fm.addChild, `${page}/${lang}: family banner missing edit/add-child modal triggers`);
        ok(fm.reclassDrawer && fm.reclassTerminals === 1, `${page}/${lang}: family category reclassify drawer/template must have exactly one active backendRequired terminal (got ${fm.reclassTerminals})`);
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
            // Spec 041 — S4 (RELOCATION): the category surface is no longer a drawer + template. It is the
            // #view=categories TAB PANEL, rendered directly on a fresh load. We assert the SAME guarantee at
            // its new host: the list + the REAL inline create form + the assign gate + exactly ONE primary Save.
            catPanel: (() => {
              const el = document.querySelector('[data-tabs="teachers"] [data-tabpanel="categories"]');
              if (!el) return null;
              return {
                fields: el.querySelectorAll('input,select,textarea').length,
                gates: el.querySelectorAll('[data-disabled-reason]').length,
                primary: el.querySelectorAll('.btn-primary[data-disabled-reason]').length,
                rows: el.querySelectorAll('.sheet-row').length,
              };
            })(),
            noCatDrawer: document.querySelectorAll('[data-drawer="trn-categories"],template[data-preview="trn-categories"]').length };
        }, PAY28.source);
        ok(kb.kebabs > 0 && kb.kebabs === kb.cards, `${page}/${lang}: teacher cards missing the row kebab (${kb.kebabs}/${kb.cards})`);
        ok(!kb.pay, `${page}/${lang}: admin teachers page body shows a pay/salary figure — forbidden`);
        ok(kb.catPanel && kb.catPanel.fields >= 3 && kb.catPanel.primary === 1 && kb.catPanel.gates >= 2 && kb.catPanel.rows > 0,
          `${page}/${lang}: the #view=categories TAB PANEL must carry the category list + the real create form + the assign gate + exactly ONE primary Save (Spec 041 S4), got ${JSON.stringify(kb.catPanel)}`);
        ok(kb.noCatDrawer === 0, `${page}/${lang}: the trn-categories DRAWER/template must be gone — its form moved into the categories tab (Spec 041 S4)`);
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
        // (i2) Spec 038 — finance is now a SIX-tab hub (overview/invoices/payments/monthly-invoices/salaries/banks)
        const finTabs = await p.evaluate(() => [...document.querySelectorAll('[data-tabs="finance"] [data-tabpanel]')].map((p) => p.getAttribute('data-tabpanel')));
        ok(JSON.stringify(finTabs) === JSON.stringify(['overview', 'invoices', 'payments', 'monthly-invoices', 'salaries', 'banks']),
          `${page}/${lang}: finance must have exactly the six tabs overview/invoices/payments/monthly-invoices/salaries/banks, got ${JSON.stringify(finTabs)}`);
        // (i3) Spec 038 — monthly-invoices board: the 9 invoices grouped by month (each once), no computed total
        const finMonthly = await p.evaluate(() => {
          const panel = document.querySelector('[data-tabpanel="monthly-invoices"]');
          if (!panel) return { rows: -1, groups: -1, serials: [], amounts: -1, totalToken: true };
          return {
            rows: panel.querySelectorAll('.finm-row').length,
            groups: panel.querySelectorAll('.finm-group').length,
            serials: [...panel.querySelectorAll('.finm-row .finm-serial')].map((e) => e.textContent.trim()),
            amounts: panel.querySelectorAll('.finm-row .finm-amount').length,
            // no computed monthly total/subtotal: the panel must carry no total/sum wording
            // (the invoice-drawer «المجموعة»=group label is NOT rendered in the monthly board).
            totalToken: /إجمالي|المجموع|\btotal\b|subtotal|مجموع/i.test(panel.textContent),
          };
        });
        // (i3) Spec 038 — monthly-invoices identity: exactly the nine authored INVOICES serials,
        // grouped into their four authored month groups, each appearing exactly once; no computed total.
        const EXPECTED_INV_SERIALS = ['INV-2026-041', 'INV-2026-052', 'INV-2026-043', 'INV-2026-054', 'INV-2026-044', 'INV-2026-035', 'INV-2026-046', 'INV-2026-047', 'INV-2026-028'];
        const finUniq = [...new Set(finMonthly.serials)];
        ok(finMonthly.rows === 9 && finMonthly.groups === 4, `${page}/${lang}: monthly-invoices board must show 9 invoice rows across 4 month groups, got ${JSON.stringify({ rows: finMonthly.rows, groups: finMonthly.groups })}`);
        ok(finUniq.length === finMonthly.serials.length, `${page}/${lang}: monthly-invoices board has duplicate invoice serial(s): ${JSON.stringify(finMonthly.serials)}`);
        ok(finMonthly.serials.length === 9 && EXPECTED_INV_SERIALS.every((s) => finUniq.includes(s)) && finUniq.every((s) => EXPECTED_INV_SERIALS.includes(s)), `${page}/${lang}: monthly-invoices serials must be exactly the nine authored INVOICES (no missing, no extra, no dup), got ${JSON.stringify(finMonthly.serials)}`);
        ok(finMonthly.amounts === 9 && !finMonthly.totalToken, `${page}/${lang}: monthly-invoices board must show exactly 9 per-row amounts and NO computed total/subtotal, got ${JSON.stringify({ amounts: finMonthly.amounts, totalToken: finMonthly.totalToken })}`);

        // (g) confirming a Record-payment action changes NO invoice status chip (before/after).
        // Spec 038 — the invoice tiles + list now live in the #view=invoices tab; activate it before interacting.
        await p.click('[data-tabs="finance"] [data-tab="invoices"]').catch(() => {});
        await p.waitForTimeout(160);
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
        ok(f30.hasTabs && JSON.stringify(f30.tabIds) === JSON.stringify(['overview', 'invoices', 'payments', 'monthly-invoices', 'salaries', 'banks']), `${page}/${lang}: finance hub tabs missing/incorrect (${JSON.stringify(f30.tabIds)})`); // Spec 038 — 3→6 tabs
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
          // Spec 040 — SANCTIONED STRENGTHENING T1: the completed hub renders 60 gates (4 general +
          // 7 notifications + 3 customization + 12 security + 34 integrations). The floor is raised
          // 4 → 20. Exact per-tab censuses live in the sp040 block below; this stays a floor.
          ok(a31.gates >= 20, `settings/${lang}: settings save/connect/test gates missing (${a31.gates})`);

          // ===== Spec 040 — the COMPLETE-FORMS census (exact, not a floor) =====
          // The hub went from 2 rendered form controls to 73. Every number below is exact; a
          // regression that silently drops a domain back to a stub fails here.
          const sp040 = await p.evaluate(() => {
            const body = document.querySelector('#page-body');
            const panelOf = (id) => body.querySelector(`[data-tabpanel="${id}"]`);
            const cens = (el) => ({
              field: el.querySelectorAll('input,select,textarea').length
                + [...el.querySelectorAll('template')].reduce((n, t) => n + t.content.querySelectorAll('input,select,textarea').length, 0),
              toggle: el.querySelectorAll('.toggle').length
                + [...el.querySelectorAll('template')].reduce((n, t) => n + t.content.querySelectorAll('.toggle').length, 0),
              struct: el.querySelectorAll('.set-struct').length
                + [...el.querySelectorAll('template')].reduce((n, t) => n + t.content.querySelectorAll('.set-struct').length, 0),
            });
            const inTpl = (sel) => [...body.querySelectorAll('template')].reduce((n, t) => n + t.content.querySelectorAll(sel).length, 0);
            const allText = body.innerText + [...body.querySelectorAll('template')].map((t) => t.innerHTML.replace(/<[^>]+>/g, ' ')).join(' ');
            // a status chip may NEVER read «متصل»/"connected" — not even "not connected". The census is
            // CHIP-SCOPED and token-absolute: the honest backendRequired sentence "available once the
            // server is connected" legitimately contains the word elsewhere in the body, so a body-wide
            // /connected/i rejection would fail on an honest build.
            const chips = [...body.querySelectorAll('.chip'), ...[...body.querySelectorAll('template')].flatMap((t) => [...t.content.querySelectorAll('.chip')])];
            return {
              general: cens(panelOf('general')), notifications: cens(panelOf('notifications')),
              customization: cens(panelOf('customization')), security: cens(panelOf('security')),
              users: cens(panelOf('users')), integrations: cens(panelOf('integrations')),
              field: body.querySelectorAll('input,select,textarea').length + inTpl('input,select,textarea'),
              toggle: body.querySelectorAll('.toggle').length + inTpl('.toggle'),
              dataToggle: body.querySelectorAll('[data-toggle]').length + inTpl('[data-toggle]'),
              struct: body.querySelectorAll('.set-struct').length + inTpl('.set-struct'),
              drawers: body.querySelectorAll('template[data-preview]').length,
              connectedChips: chips.filter((c) => /متصل|connected/i.test(c.textContent || '')).length,
              fakeSuccess: (allText.match(/تم الحفظ|\bsaved\b|بنجاح|\bsuccessfully\b|تم الربط/gi) || []).length,
              // the 11 excluded teacher-pay legacy names must not appear ANYWHERE on this page
              payNames: (body.innerHTML.match(/rate_student_absent|salary_period_type|salary_period_day|applayFins|settings_data\[|hours-input|rate-input|fin\[/gi) || []).length,
              // the legacy import-template EXAMPLE VALUES (a pay figure + the currency enum)
              importExamples: (allText.match(/25\.50|30\.00|150\.00|\bUSD\b|\bGBP\b|\bEGP\b|\bAUD\b|\bCAD\b|\bAED\b/g) || []).length,
              // real PII from the crawl corpus
              realPii: (allText.match(/01015264856|أحمد محمد|chat\.whatsapp\.com|201508604112|afaaqonline1/g) || []).length,
            };
          });
          const EXPECT = {
            general: { field: 22, toggle: 7, struct: 0 }, notifications: { field: 13, toggle: 34, struct: 0 },
            customization: { field: 16, toggle: 0, struct: 0 }, security: { field: 1, toggle: 0, struct: 34 },
            users: { field: 0, toggle: 0, struct: 0 }, integrations: { field: 21, toggle: 8, struct: 26 },
          };
          for (const tab of Object.keys(EXPECT)) {
            for (const k of ['field', 'toggle', 'struct']) {
              ok(sp040[tab][k] === EXPECT[tab][k], `settings/${lang}: ${tab} ${k} census — expected ${EXPECT[tab][k]}, got ${sp040[tab][k]}`);
            }
          }
          ok(sp040.field === 73, `settings/${lang}: the hub must render 73 form controls (was 2 before Spec 040), got ${sp040.field}`);
          ok(sp040.struct === 60, `settings/${lang}: 60 structure-only rows expected (34 security + 26 integrations), got ${sp040.struct}`);
          ok(sp040.drawers === 12, `settings/${lang}: 12 baked drawers expected (head-add + 11 integ-*), got ${sp040.drawers}`);
          // 49 boolean controls = 47 interactive data-toggle previews + 2 HONESTLY DISABLED toggles
          // (gen-monthlyPlan, ntf-inApp). A disabled control carries no toggle hook — that is correct,
          // not a miscount: it cannot be previewed because it cannot be operated.
          ok(sp040.toggle === 49, `settings/${lang}: 49 boolean controls expected, got ${sp040.toggle}`);
          ok(sp040.dataToggle === 47, `settings/${lang}: 47 interactive data-toggle previews expected (49 booleans − 2 disabled), got ${sp040.dataToggle}`);
          ok(sp040.connectedChips === 0, `settings/${lang}: a provider status chip reads "connected"/«متصل» — forbidden (got ${sp040.connectedChips})`);
          ok(sp040.fakeSuccess === 0, `settings/${lang}: fake-success copy on the settings body (got ${sp040.fakeSuccess}) — use «لا يُخزَّن»/"nothing is stored", never "saved"`);
          ok(sp040.payNames === 0, `settings/${lang}: an excluded teacher-pay legacy field name leaked (got ${sp040.payNames})`);
          ok(sp040.importExamples === 0, `settings/${lang}: a legacy import example value (25.50/150.00/currency enum) leaked (got ${sp040.importExamples})`);
          ok(sp040.realPii === 0, `settings/${lang}: real PII from the crawl corpus leaked (got ${sp040.realPii})`);
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
            const gates = content.querySelectorAll('button.btn-primary[data-interaction-submit][data-reason-key]:not([disabled]):not([aria-disabled="true"])').length;
            const primaries = gates;
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
              const inner = tpl.content.querySelector('template[data-preview^="fb-add-"]');
              if (inner) {
                const target = inner.getAttribute('data-preview');
                const opener = tpl.content.querySelector(`[data-drawer="${target}"]`);
                if (!opener) out.missing.push(target);
                out.nestedFbAdd++;
                audit(inner.content, target);
              }
            });
          }
          // picker re-pin: each candidate-list drawer still renders content + an honest final
          for (const id of pickerIds) {
            const tpl = document.querySelector(`template[data-preview="${id}"]`);
            if (!tpl || !tpl.content.querySelector('[data-disabled-reason], button.btn-primary[data-interaction-submit][data-reason-key]:not([disabled]):not([aria-disabled="true"])')
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
          const sheet32 = await p.evaluate((target) => {
            const d = document.querySelector(`.interaction-surface[role="dialog"][aria-modal="true"][data-interaction-target="${target}"]`);
            if (!d) return { open: false };
            const gate = d.querySelectorAll('button.btn-primary[data-interaction-submit][data-reason-key]:not([disabled]):not([aria-disabled="true"])').length;
            return { open: true, ctrls: d.querySelectorAll('input,select,textarea').length, gate };
          }, openable32);
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
          const tplGate = (id) => { const x = tpl(id); return x ? x.content.querySelectorAll('button.btn-primary[data-interaction-submit][data-reason-key]:not([disabled]):not([aria-disabled="true"])').length : 0; };
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

      // ===== Spec 035 — Families & Students nav completion (additive; protected asserts byte-verbatim) =====
      // (a) the four families-category items are now real anchors/deep-links (no «قريبًا»);
      // the families category has ZERO planned items. Verified on every admin page's shared sidebar.
      if (!PORTAL_PAGES.has(page)) {
        const nav035 = await p.evaluate(() => {
          const info = (id) => { const n = document.querySelector(`.nav-item[data-nav="${id}"]`); return n ? { a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon') } : null; };
          const fam = document.querySelector('#catpanel-families');
          return {
            fc: info('familyCategories'), ss: info('scheduleSearch'), sr: info('studentResult'), se: info('studentEvaluation'),
            famPlanned: fam ? fam.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
          };
        });
        const anchorOk = (o, re) => !!o && o.a && !o.soon && re.test(o.href);
        // Spec 037 sanctioned route refinements: familyCategories → families.html#view=categories
        // (labeled Categories board tab); studentResult/studentEvaluation → students.html#view=results/
        // evaluation (cross-student boards). Still real anchors/deep-links, no «قريبًا».
        ok(anchorOk(nav035.fc, /(^|\/)families\.(en\.)?html#view=categories$/), `${page}/${lang}: familyCategories must be a real deep-link → families.html#view=categories, got ${JSON.stringify(nav035.fc)}`);
        ok(anchorOk(nav035.ss, /(^|\/)schedule-search\.(en\.)?html$/), `${page}/${lang}: scheduleSearch must be a real anchor → schedule-search.html, got ${JSON.stringify(nav035.ss)}`);
        ok(anchorOk(nav035.sr, /(^|\/)students\.(en\.)?html#view=results$/), `${page}/${lang}: studentResult must be a real deep-link → students.html#view=results, got ${JSON.stringify(nav035.sr)}`);
        ok(anchorOk(nav035.se, /(^|\/)students\.(en\.)?html#view=evaluation$/), `${page}/${lang}: studentEvaluation must be a real deep-link → students.html#view=evaluation, got ${JSON.stringify(nav035.se)}`);
        ok(nav035.famPlanned === 0, `${page}/${lang}: families category still has ${nav035.famPlanned} planned «قريبًا» item(s) after Spec 035`);
      }

      // ===== Spec 036 — Teachers nav completion (additive; protected + teacher-pay asserts byte-verbatim) =====
      // (a) the four teachers-category items are now real anchors/deep-links (no «قريبًا»); the teachers
      // category (items + cat.teachersPerf section) has ZERO planned items. Verified on every admin page.
      if (!PORTAL_PAGES.has(page)) {
        const nav036 = await p.evaluate(() => {
          const info = (id) => { const n = document.querySelector(`.nav-item[data-nav="${id}"]`); return n ? { a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon') } : null; };
          const tp = document.querySelector('#catpanel-teachers');
          return {
            at: info('addTeacher'), tc: info('teacherCategories'), sk: info('sessionsKpi'), mp: info('monthlyPerf'),
            teachersPlanned: tp ? tp.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
          };
        });
        const anchorOk036 = (o, re) => !!o && o.a && !o.soon && re.test(o.href);
        // Spec 041 — S5 (RELOCATION): these were Spec-036 "fold-anchors" to the BARE teachers.html — the same
        // href as the `teachers` item, so three nav items shared one destination and "Add Teacher" delivered
        // the directory. They are now real deep-links to the real surfaces.
        ok(anchorOk036(nav036.at, /(^|\/)teachers\.(en\.)?html#view=add$/), `${page}/${lang}: addTeacher must be a real deep-link → teachers.html#view=add, got ${JSON.stringify(nav036.at)}`);
        ok(anchorOk036(nav036.tc, /(^|\/)teachers\.(en\.)?html#view=categories$/), `${page}/${lang}: teacherCategories must be a real deep-link → teachers.html#view=categories, got ${JSON.stringify(nav036.tc)}`);
        ok(anchorOk036(nav036.sk, /(^|\/)teacher-performance\.(en\.)?html#view=sessions-kpi$/), `${page}/${lang}: sessionsKpi must be a real deep-link → teacher-performance.html#view=sessions-kpi, got ${JSON.stringify(nav036.sk)}`);
        ok(anchorOk036(nav036.mp, /(^|\/)teacher-performance\.(en\.)?html#view=monthly$/), `${page}/${lang}: monthlyPerf must be a real deep-link → teacher-performance.html#view=monthly, got ${JSON.stringify(nav036.mp)}`);
        ok(nav036.teachersPlanned === 0, `${page}/${lang}: teachers category still has ${nav036.teachersPlanned} planned «قريبًا» item(s) after Spec 036`);
      }

      // ===== Spec 037 — Reports/Analytics nav completion + flagged-035 route refinements (additive) =====
      // monthlyReports/dataAnalysis are now real display-tab deep-links (no «قريبًا»); the reports
      // category has ZERO planned items. Verified on every admin page's shared sidebar.
      if (!PORTAL_PAGES.has(page)) {
        const nav037 = await p.evaluate(() => {
          const info = (id) => { const n = document.querySelector(`.nav-item[data-nav="${id}"]`); return n ? { a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon') } : null; };
          const rep = document.querySelector('#catpanel-reports');
          return {
            mr: info('monthlyReports'), da: info('dataAnalysis'),
            reportsPlanned: rep ? rep.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
          };
        });
        const anchorOk037 = (o, re) => !!o && o.a && !o.soon && re.test(o.href);
        ok(anchorOk037(nav037.mr, /(^|\/)reports\.(en\.)?html#view=monthly$/), `${page}/${lang}: monthlyReports must be a real deep-link → reports.html#view=monthly, got ${JSON.stringify(nav037.mr)}`);
        ok(anchorOk037(nav037.da, /(^|\/)reports\.(en\.)?html#view=analysis$/), `${page}/${lang}: dataAnalysis must be a real deep-link → reports.html#view=analysis, got ${JSON.stringify(nav037.da)}`);
        ok(nav037.reportsPlanned === 0, `${page}/${lang}: reports category still has ${nav037.reportsPlanned} planned «قريبًا» item(s) after Spec 037`);
      }

      // ===== Spec 039 — Admin content/certificates nav completion (additive; protected asserts byte-verbatim) =====
      // materials → library.html#view=materials and certificateRequests → certificates.html#view=requests are now
      // real deep-links (no «قريبًا»); books refined → library.html#view=books so the two library items open
      // distinct tabs. The admin category has ZERO planned items (asserted in nav010); settings stays the ONLY
      // planned-bearing category (6 items, owner Spec 040). Verified on every admin page's shared sidebar.
      if (!PORTAL_PAGES.has(page)) {
        const nav039 = await p.evaluate(() => {
          const info = (id) => { const n = document.querySelector(`.nav-item[data-nav="${id}"]`); return n ? { a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon'), disabled: n.getAttribute('aria-disabled') === 'true', lock: !!n.querySelector('use[href="#i-lock"]') } : null; };
          const set = document.querySelector('#catpanel-settings');
          return {
            mat: info('materials'), cr: info('certificateRequests'), bk: info('books'),
            settingsPlanned: set ? set.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
          };
        });
        const anchorOk039 = (o, re) => !!o && o.a && !o.soon && !o.disabled && !o.lock && re.test(o.href);
        ok(anchorOk039(nav039.mat, /(^|\/)library\.(en\.)?html#view=materials$/), `${page}/${lang}: materials must be a real deep-link → library.html#view=materials, got ${JSON.stringify(nav039.mat)}`);
        ok(anchorOk039(nav039.cr, /(^|\/)certificates\.(en\.)?html#view=requests$/), `${page}/${lang}: certificateRequests must be a real deep-link → certificates.html#view=requests, got ${JSON.stringify(nav039.cr)}`);
        ok(anchorOk039(nav039.bk, /(^|\/)library\.(en\.)?html#view=books$/), `${page}/${lang}: books must be a real deep-link → library.html#view=books, got ${JSON.stringify(nav039.bk)}`);
        // Spec 040 — SUPERSESSION S1 (a STRENGTHENING of the same truth contract): settings was the
        // last planned-bearing category; its six items are now real deep-links.
        ok(nav039.settingsPlanned === 0, `${page}/${lang}: settings must have 0 planned «قريبًا» items after Spec 040 (six real deep-links), got ${nav039.settingsPlanned}`);
      }

      // ===== Spec 040 — Settings nav completion + the ZERO-PLANNED milestone (additive) =====
      // The six settings items were the LAST planned «قريبًا» claims in the product. Each is now a real
      // deep-link into an EXISTING, completed tab of the settings hub. After this spec:
      //   sitewide planned === 0 · [data-coming-soon] === 0 · exactly ONE honest lock (classSalaryReport).
      // A disabled lock is NOT a planned item — the is-disabled reason-toast probe above still covers it.
      if (!PORTAL_PAGES.has(page)) {
        const nav040 = await p.evaluate(() => {
          const info = (id) => { const n = document.querySelector(`.nav-item[data-nav="${id}"]`); return n ? { a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon'), disabled: n.getAttribute('aria-disabled') === 'true', lock: !!n.querySelector('use[href="#i-lock"]') } : null; };
          return {
            gen: info('settingsGeneral'), integ: info('settingsIntegrations'), cust: info('settingsCustomization'),
            notif: info('settingsNotifications'), sec: info('settingsSecurity'), usr: info('settingsUsers'),
            planned: document.querySelectorAll('.nav-item.is-planned').length,
            comingSoon: document.querySelectorAll('[data-coming-soon]').length,
            locks: document.querySelectorAll('.nav-item.is-disabled').length,
            menu: document.querySelectorAll('.nav-panel .nav-item').length,
          };
        });
        // NB: `lock` is deliberately NOT part of this predicate. `settingsSecurity` legitimately uses a
        // PADLOCK as its own nav icon, so an icon-based lock check false-positives on it. The real signal
        // for an honest lock is a <button> with aria-disabled (+ data-disabled-reason) — never an icon —
        // and `o.a && !o.disabled` already proves this item is a real, enabled anchor.
        const anchorOk040 = (o, re) => !!o && o.a && !o.soon && !o.disabled && re.test(o.href);
        const SIX = [
          ['gen', 'general'], ['integ', 'integrations'], ['cust', 'customization'],
          ['notif', 'notifications'], ['sec', 'security'], ['usr', 'users'],
        ];
        for (const [k, tab] of SIX) {
          // NB the US spelling `customization` — the legacy route is UK `customisation`; carrying that
          // `s` into the hash would produce a dead deep-link the tab machinery silently ignores.
          const re = new RegExp(`(^|/)settings\\.(en\\.)?html#view=${tab}$`);
          ok(anchorOk040(nav040[k], re), `${page}/${lang}: settings${tab} must be a real deep-link → settings.html#view=${tab}, got ${JSON.stringify(nav040[k])}`);
        }
        ok(nav040.planned === 0 && nav040.comingSoon === 0, `${page}/${lang}: Spec 040 — sitewide planned must be 0 (got planned=${nav040.planned}, coming-soon=${nav040.comingSoon})`);
        ok(nav040.locks === 1, `${page}/${lang}: exactly ONE honest lock must remain (classSalaryReport), got ${nav040.locks}`);
        ok(nav040.menu === 50, `${page}/${lang}: admin menu must stay 50, got ${nav040.menu}`);
      }

      // (b0) reports — three display tabs (overview + monthly + analysis); overview PRESERVES the 7
      // category cards; monthly/analysis are authored display boards with NO computed metric/chart/
      // canvas and NO finance figure (finance-free reports invariant re-checked in the new panels).
      if (page === 'reports') {
        const rp = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const panel = (id) => body.querySelector(`[data-tabpanel="${id}"]`);
          const mr = panel('monthly'), da = panel('analysis');
          const newHTML = (mr ? mr.innerHTML : '') + (da ? da.innerHTML : '');
          const newText = (mr ? mr.textContent : '') + (da ? da.textContent : '');
          return {
            tabs: body.querySelectorAll('[data-tabs="reports"]').length,
            panels: ['overview', 'monthly', 'analysis'].filter((id) => panel(id)).length,
            cards: body.querySelectorAll('#reports-grid .report-card').length,
            canvas: body.querySelectorAll('canvas').length,
            computed: /\b(score|rank|percentage|percentile|leaderboard|gpa)\b|<canvas|chart\.js|data-chart/i.test(newHTML),
            money: /ريال|\bSAR\b|\bEGP\b|ج\.م/i.test(newText),
            gates: (mr ? mr.querySelectorAll('[data-disabled-reason]').length : 0) + (da ? da.querySelectorAll('[data-disabled-reason]').length : 0),
          };
        });
        ok(rp.tabs === 1 && rp.panels === 3, `reports/${lang}: expected the reports tabs widget with 3 panels (overview/monthly/analysis), got ${JSON.stringify(rp)}`);
        ok(rp.cards === 7, `reports/${lang}: overview must preserve exactly 7 category cards, got ${rp.cards}`);
        ok(rp.canvas === 0 && !rp.computed, `reports/${lang}: a computed metric/percentage/chart/canvas leaked into the monthly/analysis boards`);
        ok(!rp.money, `reports/${lang}: a money/currency figure leaked into the reports monthly/analysis boards (must stay finance-free)`);
        ok(rp.gates > 0, `reports/${lang}: the monthly/analysis boards must carry backendRequired gates`);
      }

      // (b1) families — Directory + Categories tabs; categories board lists authored categories +
      // the reclassify drawer is reachable + a Create gate; no computed stat, no money figure.
      if (page === 'families') {
        const fp = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const cat = body.querySelector('[data-tabpanel="categories"]');
          return {
            tabs: body.querySelectorAll('[data-tabs="families"]').length,
            panels: ['directory', 'categories'].filter((id) => body.querySelector(`[data-tabpanel="${id}"]`)).length,
            catCards: cat ? cat.querySelectorAll('#fam-cats-grid .card').length : 0,
            reclass: cat ? cat.querySelectorAll('[data-drawer="fam-cat"]').length : 0,
            createGate: cat ? cat.querySelectorAll('[data-disabled-reason]').length : 0,
            money: cat ? /ريال|\bSAR\b|\bEGP\b|ج\.م/i.test(cat.textContent) : false,
          };
        });
        ok(fp.tabs === 1 && fp.panels === 2, `families/${lang}: expected the families tabs widget (directory/categories), got ${JSON.stringify(fp)}`);
        ok(fp.catCards >= 4, `families/${lang}: categories board must list the authored categories, got ${fp.catCards}`);
        ok(fp.reclass > 0 && fp.createGate > 0, `families/${lang}: categories board must expose the reclassify drawer + a Create gate`);
        ok(!fp.money, `families/${lang}: a money/plan figure leaked into the categories board`);
      }

      // (b2) students — Directory + Results + Evaluation tabs; cross-student boards with per-student
      // deep-links; NO computed score/rank/GPA/percentage/rubric-total, NO canvas.
      if (page === 'students') {
        const sp = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const res = body.querySelector('[data-tabpanel="results"]'), ev = body.querySelector('[data-tabpanel="evaluation"]');
          const newHTML = (res ? res.innerHTML : '') + (ev ? ev.innerHTML : '');
          return {
            tabs: body.querySelectorAll('[data-tabs="students"]').length,
            panels: ['directory', 'results', 'evaluation'].filter((id) => body.querySelector(`[data-tabpanel="${id}"]`)).length,
            resLinks: res ? res.querySelectorAll('a[href*="#view=results"]').length : 0,
            evLinks: ev ? ev.querySelectorAll('a[href*="#view=evaluation"]').length : 0,
            canvas: body.querySelectorAll('canvas').length,
            computed: /\b(score|rank|percentage|percentile|leaderboard|gpa)\b|<canvas|chart\.js|data-chart/i.test(newHTML),
          };
        });
        ok(sp.tabs === 1 && sp.panels === 3, `students/${lang}: expected the students tabs widget (directory/results/evaluation), got ${JSON.stringify(sp)}`);
        ok(sp.resLinks > 0 && sp.evLinks > 0, `students/${lang}: results/evaluation boards must carry per-student deep-links`);
        ok(sp.canvas === 0 && !sp.computed, `students/${lang}: a computed score/rank/percentage/chart/canvas leaked into the results/evaluation boards`);
      }

      // (b) teacher-performance — three display-only tabs (overview + sessions-kpi + monthly); authored
      // counts + categorical chips only; NO computed score/rank/percentage/chart/canvas, NO pay figure.
      if (page === 'teacher-performance') {
        const tp = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          return {
            tabs: body.querySelectorAll('[data-tabs="perf"]').length,
            panels: ['overview', 'sessions-kpi', 'monthly'].filter((id) => body.querySelector(`[data-tabpanel="${id}"]`)).length,
            canvas: body.querySelectorAll('canvas').length,
            computed: /\b(percentage|percentile|leaderboard|gpa)\b|<canvas|chart\.js|data-chart/i.test(body.innerHTML),
            pay: /salary|salaries|راتب|رواتب|hour_rate|\brate\b|payout|payroll|ريال|\bSAR\b|fine_per_hour/i.test(body.innerText),
          };
        });
        ok(tp.tabs === 1 && tp.panels === 3, `teacher-performance/${lang}: expected the perf tabs widget with 3 panels (overview/sessions-kpi/monthly), got ${JSON.stringify(tp)}`);
        ok(tp.canvas === 0 && !tp.computed, `teacher-performance/${lang}: a computed score/rank/percentage/chart/canvas leaked into the board`);
        ok(!tp.pay, `teacher-performance/${lang}: a pay/salary/rate/payout figure leaked into the teacher-performance body`);
      }

      // (b) schedule-search — a display-only availability finder: real search/filter form + authored
      // results board + per-slot detail drawers + honest backendRequired Book/Assign gates. Client-side
      // facet filtering ONLY (no engine, no network); NO pay figure, NO file/password/canvas.
      if (page === 'schedule-search') {
        const ss = await p.evaluate(() => {
          const body = document.getElementById('page-body');
          const q = (s) => body.querySelectorAll(s).length;
          return {
            search: q('[data-filter="search"]'), selects: q('select[data-filter]'),
            results: q('#ss-results [data-row]'), gates: q('[data-disabled-reason]'),
            demo: q('[data-demo-action]'), file: q('input[type="file"]'), pw: q('input[type="password"]'), canvas: q('canvas'),
            drawers: document.querySelectorAll('template[data-preview^="ss-"]').length,
            pay: /ريال|\bSAR\b|\$|\bsalary\b|\bsalaries\b|راتب|رواتب|payroll|أجر/i.test(body.innerText),
          };
        });
        ok(ss.search >= 1 && ss.selects >= 5, `schedule-search/${lang}: search form controls missing (search=${ss.search}, selects=${ss.selects})`);
        ok(ss.results >= 8, `schedule-search/${lang}: results board rows missing (${ss.results})`);
        ok(ss.gates >= 1 && ss.demo === 0, `schedule-search/${lang}: Book/Assign finals must be backendRequired gates with no data-demo-action (gates=${ss.gates}, demo=${ss.demo})`);
        ok(ss.file === 0 && ss.pw === 0 && ss.canvas === 0, `schedule-search/${lang}: forbidden file/password/canvas affordance in body`);
        ok(ss.drawers >= 8, `schedule-search/${lang}: per-slot detail drawer templates not baked (${ss.drawers})`);
        ok(!ss.pay, `schedule-search/${lang}: a pay/price figure leaked into the schedule-search body`);
        // behavioral: a facet narrows visible rows
        const before = await p.$$eval('#ss-results [data-row]', (els) => els.filter((e) => !e.hidden).length);
        await p.selectOption('select[data-filter="availability"]', 'booked').catch(() => {});
        await p.waitForTimeout(180);
        const after = await p.$$eval('#ss-results [data-row]', (els) => els.filter((e) => !e.hidden).length);
        ok(after > 0 && after < before, `schedule-search/${lang}: availability facet did not narrow rows (${before} → ${after})`);
        // behavioral: a no-match combo reveals the empty state (t6 has no booked slot)
        await p.selectOption('select[data-filter="teacher"]', 't6').catch(() => {});
        await p.waitForTimeout(180);
        const empty = await p.evaluate(() => {
          const vis = [...document.querySelectorAll('#ss-results [data-row]')].filter((e) => !e.hidden).length;
          const nr = document.querySelector('[data-no-results]');
          return { vis, shown: nr ? getComputedStyle(nr).display !== 'none' : false };
        });
        ok(empty.vis === 0 && empty.shown, `schedule-search/${lang}: no-match filter did not reveal the empty state (visible=${empty.vis}, noResults=${empty.shown})`);
        // reset filters to a clean state for the generic FILTER_SPEC correctness pass below
        await p.selectOption('select[data-filter="teacher"]', 'all').catch(() => {});
        await p.selectOption('select[data-filter="availability"]', 'all').catch(() => {});
        await p.waitForTimeout(120);
        ok(ext.length === 0, `schedule-search/${lang}: schedule-search triggered ${ext.length} external request(s) — must filter locally`);
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
          // Spec 038 — the six billing items are unlocked to finance.html#view=… deep-links; only
          // classSalaryReport stays an honest disabled+lock. (The unlocked hrefs carry a #view= hash,
          // so `sidebarFinanceLinks` — which matches the bare finance.html link only — stays 1.)
          const walletIds = ['classSalaryReport'];
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
        // (c) Spec 038 — classSalaryReport remains the one honest locked/disabled finance item
        ok(fin.walletOk, `${page}/${lang}: classSalaryReport lost its disabled/lock state (it must stay the one honest finance lock)`);
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
        const admPlanned = adm ? adm.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1; // Spec 039 — admin category now has ZERO planned «قريبًا» items
        const banksInReports = !!rep?.querySelector('[data-nav="banks"]');
        const banksInAdmin = !!adm?.querySelector('[data-nav="banks"]');
        const sessBadge = (document.querySelector('.nav-item[data-nav="sessions"] .nav-badge')?.textContent || '').trim();
        const famTitle = (document.querySelector('#catpanel-families .cat-title')?.textContent || '').trim();
        // Spec 038 — the one remaining honest finance lock (classSalaryReport) — disabled + reason + lock
        const lockedFin = ['classSalaryReport']; // Spec 038 — only classSalaryReport stays an honest lock; the other six finance items are unlocked to finance.html#view=… deep-links
        const lockedOk = lockedFin.every((id) => {
          const el = document.querySelector(`.nav-item[data-nav="${id}"]`);
          return !!el && el.getAttribute('data-nav-status') === 'disabled'
            && el.getAttribute('data-reason-key') === 'nav.reason.finance'
            && !!el.querySelector('use[href="#i-lock"]');
        });
        return { railCats, finLabel, finMembers, finLinks, admItems, admPlanned, banksInReports, banksInAdmin, sessBadge, famTitle, lockedOk };
      });
      const expFinMembers = ['finance', 'invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments', 'classSalaryReport', 'banks'];
      const expFamTitle = lang === 'en' ? 'Families & Students' : 'العائلات والطلاب';
      const expFinLabel = lang === 'en' ? 'Finance' : 'المالية';
      ok(nav010.railCats === 6, `${page}/${lang}: expected exactly 6 rail categories, got ${nav010.railCats} (no 7th finance rail category)`);
      ok(nav010.finLabel === expFinLabel, `${page}/${lang}: finance sub-section label should be "${expFinLabel}", got "${nav010.finLabel}"`);
      ok(JSON.stringify(nav010.finMembers) === JSON.stringify(expFinMembers), `${page}/${lang}: finance sub-section members/order wrong: ${JSON.stringify(nav010.finMembers)}`);
      // Spec 038 — six finance items unlocked → implemented deep-links (finance + invoices/monthlyInvoices/salaries/staffSalaries/payments/banks, in DOM order); classSalaryReport stays locked.
      ok(JSON.stringify(nav010.finLinks) === JSON.stringify(['finance', 'invoices', 'monthlyInvoices', 'salaries', 'staffSalaries', 'payments', 'banks']), `${page}/${lang}: finance sub-section implemented links wrong after Spec 038: ${JSON.stringify(nav010.finLinks)}`);
      ok(nav010.banksInReports && !nav010.banksInAdmin, `${page}/${lang}: banks must live in the reports finance sub-section, not admin (reports=${nav010.banksInReports}, admin=${nav010.banksInAdmin})`);
      ok(nav010.admItems.length === 5 && !nav010.admItems.includes('banks'), `${page}/${lang}: admin category should have exactly 5 items and no banks, got ${JSON.stringify(nav010.admItems)}`);
      // Spec 039 — materials/certificateRequests flipped to deep-links → the admin category now has ZERO
      // planned «قريبًا» items (matches the families/teachers/reports precedent). Settings is now the only
      // category still carrying planned items (owner Spec 040).
      ok(nav010.admPlanned === 0, `${page}/${lang}: admin category still has ${nav010.admPlanned} planned «قريبًا» item(s) after Spec 039`);
      ok(nav010.lockedOk, `${page}/${lang}: the one honest finance lock (classSalaryReport) must stay disabled+reason+lock`);
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
          // Spec 045 — quick-tile truthfulness: a tile that targets an implemented destination is
          // a REAL anchor; a "soon" badge on such a tile is the FR-012 defect.
          const qtileLinks = document.querySelectorAll('#page-body a.pt-qtile').length;
          const qtileSoon = document.querySelectorAll('#page-body .pt-qtile-soon').length;
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
          return { hasShell: !!shell, role, adminMarkup, switchLink, bodyText, gaugeCount, gaugeAscii, plannedCount: planned.length, plannedBad, hubRoleTargets, hubAdminLink, sectionCount, emptyCount, bodyAnchors, plannedBackend, plannedPlanned, progressBars, formControls, anchorTargets, avatars, sidenavs, navAside, navDrawer, drawerSummary, navCurrentHrefs, plannedNavAnchors, navListAnchors, shellAnchors, kpiCards, childPanelCount, childDefaultVisible, idHero, railStops, flowSteps, storyRows, qtileLinks, qtileSoon, childViewLinks };
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
          if (page === 'student-profile') ok(prt.plannedBackend === 2, `${page}/${lang}: the profile must show exactly 2 backendRequired gates (photo/save), got ${prt.plannedBackend}`);
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
          /* ── Spec 045 · DECLARED SUPERSESSION S45-2 (T033 / FR-024–FR-025) ────────────────────
           * Superseded assertion (Spec 025 lineage), verbatim:
           *   ok(prt.formControls === 0, '… teacher internal page must contain zero form controls …');
           *
           * WHY it must change for ONE page: FR-024/FR-025 require `teacher-library` to provide
           * evidence-backed deterministic resource search (the reference platform's `search_form`
           * with its `query` input). A search field IS a form control, so the blanket rule and the
           * requirement cannot both hold. The blanket rule existed to stop teacher internal pages
           * carrying DATA-ENTRY forms that imply persistence — a client-side filter over content
           * already rendered on the page is not that, and claims nothing.
           *
           * WHY this is NOT a weakening: the rule stays byte-identical (`=== 0`) for the other seven
           * teacher internal pages. The single exception is pinned far more tightly than "some form
           * controls are allowed": exactly one form and exactly one input, that input must be
           * type=search carrying data-filter="search", and select/textarea must remain zero — so a
           * data-entry field, a dropdown, or a second input on teacher-library now FAILS where the
           * old blanket rule would merely have counted them. The discovery contract is additionally
           * enforced (reset control present, exactly one no-results state).
           * Falsifying mutation: M45-12 (swallowed selector) and M45-13 (false saved wording). */
          if (page === 'teacher-library') {
            const lib = await p.evaluate(() => ({
              forms: document.querySelectorAll('#page-body form').length,
              inputs: document.querySelectorAll('#page-body input').length,
              selects: document.querySelectorAll('#page-body select').length,
              textareas: document.querySelectorAll('#page-body textarea').length,
              searchInputs: document.querySelectorAll('#page-body input[type="search"][data-filter="search"]').length,
              reset: document.querySelectorAll('#page-body [data-filter-reset]').length,
              noResults: document.querySelectorAll('#page-body [data-no-results]').length,
              targets: document.querySelectorAll('#page-body #library-resources').length,
            }));
            ok(lib.forms === 1 && lib.inputs === 1 && lib.selects === 0 && lib.textareas === 0,
              `${page}/${lang}: teacher-library may carry ONLY the sanctioned discovery control (1 form, 1 input, 0 select, 0 textarea), got ${JSON.stringify(lib)}`);
            ok(lib.searchInputs === 1,
              `${page}/${lang}: the one permitted control must be input[type=search][data-filter=search], got ${lib.searchInputs}`);
            ok(lib.reset === 1 && lib.noResults === 1 && lib.targets === 1,
              `${page}/${lang}: library discovery contract incomplete (reset=${lib.reset}, no-results=${lib.noResults}, target=${lib.targets}; each must be exactly 1)`);
            /* the filter must really narrow, and clearing must really restore everything.
             * Visibility is measured from COMPUTED STYLE, not the `hidden` property: the shared
             * filterBar/noResults mechanism toggles the empty state with CSS `display`, and never
             * sets the `hidden` attribute. `!n.hidden` was therefore true whenever the node merely
             * EXISTED, so the old `emptyShown` term could not fail — a partly vacuous assertion.
             * Corrected 2026-08-04 during the Spec-045 evidence reconciliation; the shape of the
             * guarantee is unchanged, it is simply now actually enforced. */
            const vis = (els) => els.filter((e) => !e.hidden && getComputedStyle(e).display !== 'none').length;
            const before = await p.$$eval('#library-resources .pt-card', vis);
            const emptyHiddenAtStart = await p.evaluate(() => { const n = document.querySelector('#page-body [data-no-results]'); return !!n && getComputedStyle(n).display === 'none'; });
            await p.fill('#page-body input[data-filter="search"]', 'zzzznomatch');
            await p.waitForTimeout(200);
            const narrowed = await p.$$eval('#library-resources .pt-card', vis);
            const emptyShown = await p.evaluate(() => { const n = document.querySelector('#page-body [data-no-results]'); return !!n && getComputedStyle(n).display !== 'none'; });
            await p.click('#page-body [data-filter-reset]');
            await p.waitForTimeout(200);
            const restored = await p.$$eval('#library-resources .pt-card', vis);
            const emptyHiddenAgain = await p.evaluate(() => { const n = document.querySelector('#page-body [data-no-results]'); return !!n && getComputedStyle(n).display === 'none'; });
            ok(before >= 3 && narrowed === 0 && emptyShown,
              `${page}/${lang}: library search did not narrow to an accessible empty state (before=${before}, narrowed=${narrowed}, empty=${emptyShown})`);
            ok(emptyHiddenAtStart && emptyHiddenAgain,
              `${page}/${lang}: the no-results state must be HIDDEN while results exist (atStart=${emptyHiddenAtStart}, afterReset=${emptyHiddenAgain}) — an always-visible empty state is not a state`);
            ok(restored === before,
              `${page}/${lang}: clearing the library search did not restore every resource (${restored}/${before})`);
          } else {
            ok(prt.formControls === 0, `${page}/${lang}: teacher internal page must contain zero form controls, got ${prt.formControls}`);
          }
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
          'student-schedule': 0, 'student-homework': 1, 'student-materials': 1, 'student-progress': 0, 'student-history': 0, 'student-profile': 2,
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
          /* ── Spec 045 · DECLARED SUPERSESSION S45-1 (T016 / FR-012) ───────────────────────────
           * Superseded assertions (Spec 025 / Spec 022 lineage), verbatim:
           *   ok(prt.bodyAnchors === 1, '… must contribute exactly ONE anchor (the performance link) …');
           *   ok(prt.anchorTargets.every((h) => /(^|\/)teacher-reports\.(en\.)?html$/.test(h)), '… Spec 025 repoint …');
           *
           * WHY it must change: those lines were written when the seven Teacher internal pages were
           * NOT reachable from the home — the quick tiles rendered as `is-planned` divs carrying a
           * "soon" badge. Spec 045 FR-012 requires every IMPLEMENTED Teacher destination to be a
           * working localized affordance rather than a false planned state, and all eight
           * ROLE_NAV.teacher entries are `status: 'implemented'` with all eight pages built. So the
           * body necessarily contributes 1 + 7 = 8 anchors. Keeping `=== 1` would mandate the defect.
           *
           * WHY this is a STRENGTHENING, not a weakening: the old pair pinned ONE destination and
           * left the other seven unconstrained (they did not exist as anchors). The replacement pins
           * the EXACT localized target of all eight, requires the quick-tile set to equal the
           * implemented ROLE_NAV set exactly, and adds a zero-"soon" guard that did not exist.
           * A regression to the old rendering now fails on three independent assertions.
           * Falsifying mutation: M45-04 / M45-07. */
          const TCH_QTILE_PAGES = ['teacher-schedule', 'teacher-students', 'teacher-outcomes',
            'teacher-tasks', 'teacher-reports', 'teacher-library', 'teacher-profile'];
          const suffix = lang === 'en' ? '.en.html' : '.html';
          const expectedTargets = ['teacher-reports' + suffix, ...TCH_QTILE_PAGES.map((b) => b + suffix)];
          ok(prt.bodyAnchors === 8,
            `${page}/${lang}: the teacher home body must contribute exactly 8 anchors (1 reports link + 7 implemented quick tiles), got ${prt.bodyAnchors}`);
          ok(prt.qtileLinks === 7,
            `${page}/${lang}: expected 7 REAL quick-tile links for the 7 implemented Teacher destinations, got ${prt.qtileLinks}`);
          ok(prt.qtileSoon === 0,
            `${page}/${lang}: an implemented Teacher destination is still labelled "soon" (${prt.qtileSoon} badge(s)) — FR-012 violation`);
          ok(expectedTargets.every((want) => prt.anchorTargets.some((h) => h === want || h.endsWith('/' + want))),
            `${page}/${lang}: teacher home is missing an exact localized destination. want=${JSON.stringify(expectedTargets)} got=${JSON.stringify(prt.anchorTargets)}`);
          ok(prt.anchorTargets.every((h) => expectedTargets.some((want) => h === want || h.endsWith('/' + want))),
            `${page}/${lang}: teacher home emitted an unexpected body anchor. allowed=${JSON.stringify(expectedTargets)} got=${JSON.stringify(prt.anchorTargets)}`);
          ok(!prt.anchorTargets.some((h) => /teacher-performance/.test(h)),
            `${page}/${lang}: the teacher portal must never link the admin-only performance board (FR-013/FR-041), got ${JSON.stringify(prt.anchorTargets)}`);
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

  // ===== Spec 035 — studentResult/studentEvaluation deep-links: the nav route
  // student.html#view=results / #view=evaluation must OPEN the matching display-only tab on load
  // (the tabs widget honors the #view= hash). Also re-assert no computed score/rank/chart. =====
  for (const lang of ['ar', 'en']) {
    const file = lang === 'en' ? 'student.en.html' : 'student.html';
    for (const view of ['results', 'evaluation']) {
      // a FRESH context/load per view — enhance.js reads the #view= hash on load (a hash-only
      // re-goto on the same document would not re-run it), exactly how the nav link is followed.
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      const dext = [];
      p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });
      await p.goto(`${BASE}/${file}#view=${view}`, { waitUntil: 'networkidle' });
      await waitForOnlyPanel(p, 'student', view);
      const r = await p.evaluate(() => {
        const vis = [...document.querySelectorAll('[data-tabs="student"] [data-tabpanel]')].filter((x) => !x.hidden);
        const body = document.getElementById('page-body');
        return {
          active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
          noScore: !/\b(percentile|leaderboard|gpa)\b|<canvas|chart\.js|data-chart/i.test(body.innerHTML),
        };
      });
      ok(r.active === view, `student/${lang}: nav deep-link #view=${view} did not open the ${view} tab (active=${r.active})`);
      ok(r.noScore, `student/${lang}: the ${view} deep-link tab must not add a computed score/rank/chart`);
      ok(dext.length === 0, `student/${lang}: deep-link #view=${view} navigation triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
      await ctx.close();
    }
  }

  // ===== Spec 036 — sessionsKpi/monthlyPerf deep-links: teacher-performance.html#view=sessions-kpi /
  // #view=monthly must OPEN the matching display-only tab on load (fresh context per view, as the nav
  // link is followed). Re-assert display-only: no computed score/rank/percentage/chart, no pay. =====
  for (const lang of ['ar', 'en']) {
    const file = lang === 'en' ? 'teacher-performance.en.html' : 'teacher-performance.html';
    for (const view of ['sessions-kpi', 'monthly']) {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      const dext = [];
      p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });
      await p.goto(`${BASE}/${file}#view=${view}`, { waitUntil: 'networkidle' });
      await waitForOnlyPanel(p, 'perf', view);
      const r = await p.evaluate(() => {
        const vis = [...document.querySelectorAll('[data-tabs="perf"] [data-tabpanel]')].filter((x) => !x.hidden);
        const body = document.getElementById('page-body');
        return {
          active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
          noScore: !/\b(percentage|percentile|leaderboard|gpa)\b|<canvas|chart\.js|data-chart/i.test(body.innerHTML),
          noPay: !/salary|salaries|راتب|رواتب|hour_rate|\brate\b|payout|payroll|ريال|\bSAR\b|fine_per_hour/i.test(body.innerText),
        };
      });
      ok(r.active === view, `teacher-performance/${lang}: nav deep-link #view=${view} did not open the ${view} tab (active=${r.active})`);
      ok(r.noScore, `teacher-performance/${lang}: the ${view} tab must not add a computed score/rank/percentage/chart`);
      ok(r.noPay, `teacher-performance/${lang}: the ${view} tab must not surface a pay/salary/rate/payout figure`);
      ok(dext.length === 0, `teacher-performance/${lang}: deep-link #view=${view} navigation triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
      await ctx.close();
    }
  }

  // ===== Spec 037 — reports/families/students deep-links: the nav routes
  // reports.html#view=monthly|analysis, families.html#view=categories,
  // students.html#view=results|evaluation must OPEN the matching display tab on load
  // (fresh context per view, as the nav link is followed). Re-assert no computed score/chart. =====
  const SP037_DEEPLINKS = [
    { file: 'reports', group: 'reports', views: ['monthly', 'analysis'] },
    { file: 'families', group: 'families', views: ['categories'] },
    { file: 'students', group: 'students', views: ['results', 'evaluation'] },
  ];
  for (const lang of ['ar', 'en']) {
    for (const s of SP037_DEEPLINKS) {
      const file = lang === 'en' ? `${s.file}.en.html` : `${s.file}.html`;
      for (const view of s.views) {
        const ctx = await browser.newContext();
        const p = await ctx.newPage();
        const dext = [];
        p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });
        await p.goto(`${BASE}/${file}#view=${view}`, { waitUntil: 'networkidle' });
        await waitForOnlyPanel(p, s.group, view);
        const r = await p.evaluate((group) => {
          const vis = [...document.querySelectorAll(`[data-tabs="${group}"] [data-tabpanel]`)].filter((x) => !x.hidden);
          const body = document.getElementById('page-body');
          return {
            active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
            noScore: !/\b(percentile|leaderboard|gpa)\b|<canvas|chart\.js|data-chart/i.test(body.innerHTML),
          };
        }, s.group);
        ok(r.active === view, `${s.file}/${lang}: nav deep-link #view=${view} did not open the ${view} tab (active=${r.active})`);
        ok(r.noScore, `${s.file}/${lang}: the ${view} deep-link tab must not add a computed score/rank/chart`);
        ok(dext.length === 0, `${s.file}/${lang}: deep-link #view=${view} navigation triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
        await ctx.close();
      }
    }
  }

  // ===== Spec 038 — finance six-tab deep-links: the nav routes finance.html#view=…
  // (overview/invoices/payments/monthly-invoices/salaries/banks) must OPEN the matching tab on
  // fresh load (fresh context per view). Re-assert no chart/canvas + no external request. =====
  for (const lang of ['ar', 'en']) {
    const file = lang === 'en' ? 'finance.en.html' : 'finance.html';
    for (const view of ['overview', 'invoices', 'payments', 'monthly-invoices', 'salaries', 'banks']) {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      const dext = [];
      p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });
      await p.goto(`${BASE}/${file}#view=${view}`, { waitUntil: 'networkidle' });
      await waitForOnlyPanel(p, 'finance', view);
      const r = await p.evaluate(() => {
        const vis = [...document.querySelectorAll('[data-tabs="finance"] [data-tabpanel]')].filter((x) => !x.hidden);
        const body = document.getElementById('page-body');
        return {
          active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
          noChart: !/<canvas|chart\.js|data-chart|\bgraph\b|leaderboard|percentile/i.test(body.innerHTML),
        };
      });
      ok(r.active === view, `finance/${lang}: nav deep-link #view=${view} did not open the ${view} tab (active=${r.active})`);
      ok(r.noChart, `finance/${lang}: the ${view} tab must not add a chart/canvas/graph`);
      ok(dext.length === 0, `finance/${lang}: deep-link #view=${view} triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
      await ctx.close();
    }
  }
  // Spec 038 — EXACT finance nav route coverage (AR + EN): each of the six unlocked items is a real
  // implemented anchor to its finance.html#view=… deep-link (no aria-disabled, no lock icon);
  // classSalaryReport stays a disabled+reason+lock non-anchor with NO route; finance-analysis has NO
  // nav item/route; admin menu stays 50. (Finance sub-section order is protected byte-verbatim by the
  // nav010 finMembers assert.)
  for (const lang of ['ar', 'en']) {
    const file = lang === 'en' ? 'finance.en.html' : 'finance.html';
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE}/${file}`, { waitUntil: 'networkidle' });
    const nav = await p.evaluate(() => {
      const info = (id) => {
        const n = document.querySelector(`.nav-item[data-nav="${id}"]`);
        if (!n) return null;
        return {
          a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon'),
          disabled: n.getAttribute('aria-disabled') === 'true', status: n.getAttribute('data-nav-status') || '',
          reason: n.getAttribute('data-reason-key') || '', lock: !!n.querySelector('use[href="#i-lock"]'),
        };
      };
      return {
        invoices: info('invoices'), payments: info('payments'), monthlyInvoices: info('monthlyInvoices'),
        salaries: info('salaries'), staffSalaries: info('staffSalaries'), banks: info('banks'),
        csr: info('classSalaryReport'),
        fa: info('financeAnalysis'), an: info('analysis'), ae: info('analysisExpenses'), ai: info('analysisInvoices'),
        adminMenu: document.querySelectorAll('.nav-panel .nav-item').length,
      };
    });
    const routeOk = (o, re) => !!o && o.a && !o.soon && !o.disabled && !o.lock && re.test(o.href);
    ok(routeOk(nav.invoices, /(^|\/)finance\.(en\.)?html#view=invoices$/), `finance/${lang}: invoices must be a real anchor → finance.html#view=invoices, got ${JSON.stringify(nav.invoices)}`);
    ok(routeOk(nav.payments, /(^|\/)finance\.(en\.)?html#view=payments$/), `finance/${lang}: payments must be a real anchor → finance.html#view=payments, got ${JSON.stringify(nav.payments)}`);
    ok(routeOk(nav.monthlyInvoices, /(^|\/)finance\.(en\.)?html#view=monthly-invoices$/), `finance/${lang}: monthlyInvoices must be a real anchor → finance.html#view=monthly-invoices, got ${JSON.stringify(nav.monthlyInvoices)}`);
    ok(routeOk(nav.salaries, /(^|\/)finance\.(en\.)?html#view=salaries$/), `finance/${lang}: salaries must be a real anchor → finance.html#view=salaries, got ${JSON.stringify(nav.salaries)}`);
    ok(routeOk(nav.staffSalaries, /(^|\/)finance\.(en\.)?html#view=salaries$/), `finance/${lang}: staffSalaries must be a real anchor → finance.html#view=salaries, got ${JSON.stringify(nav.staffSalaries)}`);
    ok(routeOk(nav.banks, /(^|\/)finance\.(en\.)?html#view=banks$/), `finance/${lang}: banks must be a real anchor → finance.html#view=banks, got ${JSON.stringify(nav.banks)}`);
    ok(!!nav.csr && !nav.csr.a && nav.csr.disabled && nav.csr.status === 'disabled' && nav.csr.reason === 'nav.reason.finance' && nav.csr.lock && !nav.csr.href, `finance/${lang}: classSalaryReport must stay a disabled+nav.reason.finance+lock non-anchor with NO route, got ${JSON.stringify(nav.csr)}`);
    ok(!nav.fa && !nav.an && !nav.ae && !nav.ai, `finance/${lang}: finance-analysis must have NO nav item/route (financeAnalysis/analysis/analysisExpenses/analysisInvoices all absent)`);
    ok(nav.adminMenu === 50, `finance/${lang}: admin menu must stay 50 classified nav items, got ${nav.adminMenu}`);
    await ctx.close();
  }

  // ===== Spec 039 — content/certificate deep-links: library.html#view=materials|books and
  // certificates.html#view=requests must OPEN the matching tab on fresh load (fresh context per view,
  // as the nav link is followed). Re-assert no canvas/chart + no type=file/password + no external request. =====
  // Each view is loaded with the OPPOSITE tab pre-seeded as the stored view (localStorage
  // academy.schedView.<group>), so the assertion is DISCRIMINATING: the hash must WIN over the stored view.
  // Without this, `#view=materials` would pass even with JS disabled (materials is library's baked default tab).
  const SP039_DEEPLINKS = [
    { file: 'library', group: 'library', views: { materials: 'books', books: 'materials' } },
    { file: 'certificates', group: 'certificates', views: { requests: 'templates' } },
  ];
  for (const lang of ['ar', 'en']) {
    for (const s of SP039_DEEPLINKS) {
      const file = lang === 'en' ? `${s.file}.en.html` : `${s.file}.html`;
      for (const [view, other] of Object.entries(s.views)) {
        const ctx = await browser.newContext();
        await ctx.addInitScript(([g, o]) => { try { localStorage.setItem('academy.schedView.' + g, o); } catch (e) { /* ignore */ } }, [s.group, other]);
        const p = await ctx.newPage();
        const dext = [];
        p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });
        await p.goto(`${BASE}/${file}#view=${view}`, { waitUntil: 'networkidle' });
        await waitForOnlyPanel(p, s.group, view);
        const r = await p.evaluate((group) => {
          const vis = [...document.querySelectorAll(`[data-tabs="${group}"] [data-tabpanel]`)].filter((x) => !x.hidden);
          const body = document.getElementById('page-body');
          return {
            active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
            noFake: !/<canvas|chart\.js|data-chart/i.test(body.innerHTML) && body.querySelectorAll('input[type=file],input[type=password]').length === 0,
          };
        }, s.group);
        ok(r.active === view, `${s.file}/${lang}: nav deep-link #view=${view} did not open the ${view} tab (active=${r.active}; the URL hash must beat the stored view '${other}')`);
        ok(r.noFake, `${s.file}/${lang}: the ${view} deep-link tab must not add a canvas/chart or type=file/password`);
        ok(dext.length === 0, `${s.file}/${lang}: deep-link #view=${view} navigation triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
        await ctx.close();
      }
    }
  }

  // ===== Spec 040 — the SIX settings deep-links must open their tab on a FRESH load (AR + EN) =====
  // Each view is seeded with a DIFFERENT stored view, so the assertion is DISCRIMINATING: the URL hash
  // must beat localStorage['academy.schedView.settings']. Without the seed, #view=general would pass
  // trivially (general is the baked default tab). 6 views × 2 langs = 12 executions.
  const SP040_VIEWS = {
    general: 'integrations', notifications: 'general', customization: 'security',
    security: 'users', users: 'notifications', integrations: 'customization',
  };
  for (const lang of ['ar', 'en']) {
    const sfile = lang === 'en' ? 'settings.en.html' : 'settings.html';
    for (const [view, other] of Object.entries(SP040_VIEWS)) {
      const ctx = await browser.newContext();
      await ctx.addInitScript((o) => { try { localStorage.setItem('academy.schedView.settings', o); } catch (e) { /* ignore */ } }, other);
      const p = await ctx.newPage();
      const dext = [];
      p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) dext.push(u); });
      await p.goto(`${BASE}/${sfile}#view=${view}`, { waitUntil: 'networkidle' });
      await waitForOnlyPanel(p, 'settings', view);
      const r = await p.evaluate(() => {
        const vis = [...document.querySelectorAll('[data-tabs="settings"] [data-tabpanel]')].filter((x) => !x.hidden);
        const body = document.getElementById('page-body');
        return {
          active: vis.length === 1 ? vis[0].getAttribute('data-tabpanel') : `n=${vis.length}`,
          noSecret: body.querySelectorAll('input[type=file],input[type=password],canvas').length === 0,
        };
      });
      ok(r.active === view, `settings/${lang}: nav deep-link #view=${view} did not open exactly that tab (active=${r.active}; the hash must beat the stored view '${other}')`);
      ok(r.noSecret, `settings/${lang}: the ${view} deep-link must not render a file/password input or a canvas`);
      ok(dext.length === 0, `settings/${lang}: deep-link #view=${view} triggered external request(s) ${JSON.stringify(dext.slice(0, 2))}`);
      await ctx.close();
    }
  }

  // Spec 039 — EXACT content/certificate nav route coverage (AR + EN): materials → library.html#view=materials
  // and certificateRequests → certificates.html#view=requests are real implemented anchors (no «قريبًا»/
  // aria-disabled/lock); books is refined → library.html#view=books; the admin category has 5 items / 0 planned;
  // settings keeps its 6 planned items (owner Spec 040); the admin menu stays 50. (Read from the shared sidebar.)
  for (const lang of ['ar', 'en']) {
    const file = lang === 'en' ? 'library.en.html' : 'library.html';
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE}/${file}`, { waitUntil: 'networkidle' });
    const nav = await p.evaluate(() => {
      const info = (id) => {
        const n = document.querySelector(`.nav-item[data-nav="${id}"]`);
        if (!n) return null;
        return { a: n.tagName === 'A', href: n.getAttribute('href') || '', soon: n.hasAttribute('data-coming-soon'), disabled: n.getAttribute('aria-disabled') === 'true', lock: !!n.querySelector('use[href="#i-lock"]') };
      };
      const adm = document.getElementById('catpanel-admin');
      const set = document.getElementById('catpanel-settings');
      return {
        materials: info('materials'), certificateRequests: info('certificateRequests'), books: info('books'),
        admItems: adm ? adm.querySelectorAll('.nav-item').length : -1,
        admPlanned: adm ? adm.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
        settingsPlanned: set ? set.querySelectorAll('.nav-item.is-planned, [data-coming-soon]').length : -1,
        adminMenu: document.querySelectorAll('.nav-panel .nav-item').length,
      };
    });
    const routeOk = (o, re) => !!o && o.a && !o.soon && !o.disabled && !o.lock && re.test(o.href);
    ok(routeOk(nav.materials, /(^|\/)library\.(en\.)?html#view=materials$/), `content/${lang}: materials must be a real anchor → library.html#view=materials, got ${JSON.stringify(nav.materials)}`);
    ok(routeOk(nav.certificateRequests, /(^|\/)certificates\.(en\.)?html#view=requests$/), `content/${lang}: certificateRequests must be a real anchor → certificates.html#view=requests, got ${JSON.stringify(nav.certificateRequests)}`);
    ok(routeOk(nav.books, /(^|\/)library\.(en\.)?html#view=books$/), `content/${lang}: books must be a real anchor → library.html#view=books, got ${JSON.stringify(nav.books)}`);
    ok(nav.admItems === 5 && nav.admPlanned === 0, `content/${lang}: admin category must have 5 items and 0 planned, got items=${nav.admItems} planned=${nav.admPlanned}`);
    // Spec 040 — SUPERSESSION S1 (second site).
    ok(nav.settingsPlanned === 0, `content/${lang}: settings must have 0 planned items after Spec 040, got ${nav.settingsPlanned}`);
    ok(nav.adminMenu === 50, `content/${lang}: admin menu must stay 50 classified nav items, got ${nav.adminMenu}`);
    await ctx.close();
  }

  // ===== Spec 041 — the ROUTE FREEZE: a DERIVED, group-aware matrix over NAV_CATEGORIES =====
  // STRICTLY ADDITIVE (R-1): SP037_DEEPLINKS / SP039_DEEPLINKS / SP040_VIEWS / the Spec-038 finance
  // block are all RETAINED VERBATIM above — they remain the domain-specific regression coverage.
  // This block is the generic FREEZE layer: it derives every route from the nav source, so a new or
  // edited nav item cannot escape the audit by not being hand-listed.
  {
    const navSrc = await import('../../src/js/nav.config.js');
    const all = navSrc.NAV_CATEGORIES.flatMap((c) => [...c.items, ...(c.sections || []).flatMap((s) => s.items)]);
    const impl = all.filter((i) => i.status === 'implemented');
    ok(impl.length === 49, `route-matrix: 49 implemented routes expected, got ${impl.length}`);

    // The tab-group id is NOT derivable from the route string (teacher-performance → group "perf").
    // The map is asserted COMPLETE: every deep-link file has an entry, and there are no orphan entries.
    const GROUPS = {
      'families.html': 'families', 'students.html': 'students', 'teacher-performance.html': 'perf',
      'reports.html': 'reports', 'finance.html': 'finance', 'library.html': 'library',
      'certificates.html': 'certificates', 'settings.html': 'settings', 'teachers.html': 'teachers',
    };
    const deep = impl.filter((i) => i.route.includes('#view='));
    const plain = impl.filter((i) => !i.route.includes('#'));
    ok(deep.length === 24, `route-matrix: 24 deep-links expected after Spec 041 D-1, got ${deep.length}`);
    ok(plain.length === 25, `route-matrix: 25 plain routes expected after Spec 041 D-1, got ${plain.length}`);
    const lock = all.filter((i) => i.status === 'disabled');
    ok(lock.length === 1 && lock[0].id === 'classSalaryReport' && !lock[0].route,
      `route-matrix: exactly ONE route-less honest lock (classSalaryReport), got ${JSON.stringify(lock.map((l) => l.id))}`);
    ok(deep.length + plain.length + lock.length === 50, 'route-matrix: 24 + 25 + 1 must equal the 50-item menu');

    const files = new Set(fs.readdirSync(require('path').join(__dirname, '../../public')).filter((f) => f.endsWith('.html')));
    const usedGroups = new Set();
    for (const it of impl) {
      const [file, frag] = it.route.split('#');
      // (a) the destination file must EXIST — in both languages
      ok(files.has(file), `route-matrix: ${it.id} → ${file} does not exist`);
      ok(files.has(file.replace('.html', '.en.html')), `route-matrix: ${it.id} → the EN twin of ${file} does not exist`);
      if (!frag) continue;
      const view = frag.replace('view=', '');
      const group = GROUPS[file];
      ok(!!group, `route-matrix: ${it.id} → ${file} has no tab-group entry in the GROUPS map (the map must be complete)`);
      usedGroups.add(file);
      // (b) the fragment must resolve to a REAL [data-tab] AND a REAL [data-tabpanel] in the OWNING group
      for (const L of ['', '.en']) {
        const html = fs.readFileSync(require('path').join(__dirname, '../../public', file.replace('.html', `${L}.html`)), 'utf8');
        ok(html.includes(`data-tab="${view}"`), `route-matrix: ${it.id} → ${file}${L} has no [data-tab="${view}"]`);
        ok(html.includes(`data-tabpanel="${view}"`), `route-matrix: ${it.id} → ${file}${L} has no [data-tabpanel="${view}"]`);
      }
    }
    for (const f of Object.keys(GROUPS)) ok(usedGroups.has(f), `route-matrix: GROUPS has an ORPHAN entry '${f}' that no deep-link uses`);

    // (c) repeated-destination census — exactly ONE sanctioned repeat is tolerated, and it is named.
    const byDest = {};
    for (const it of impl) (byDest[it.route] = byDest[it.route] || []).push(it.id);
    const repeats = Object.entries(byDest).filter(([, ids]) => ids.length > 1);
    ok(repeats.length === 1, `route-matrix: exactly ONE sanctioned repeated destination is allowed, got ${JSON.stringify(repeats)}`);
    ok(repeats[0][0] === 'finance.html#view=salaries' && repeats[0][1].sort().join(',') === 'salaries,staffSalaries',
      `route-matrix: the ONLY sanctioned repeat is S-1 (salaries + staffSalaries → finance.html#view=salaries), got ${JSON.stringify(repeats[0])}`);
    // after D-1 the teachers TRIPLE must no longer be a repeat
    ok(byDest['teachers.html'].length === 1 && byDest['teachers.html'][0] === 'teachers',
      `route-matrix: D-1 — teachers.html must now be reached by exactly ONE nav item, got ${JSON.stringify(byDest['teachers.html'])}`);
  }

  // ===== Spec 041 — T-03: the EXACT 50-ROUTE REGISTER (closes gap G-1) =====
  // The derived matrix above proves each destination EXISTS; it does NOT prove it is the RIGHT one.
  // Mutation M-2 (repoint a plain route at a real-but-wrong page: staff → library.html) passed the
  // ENTIRE suite with 0 failures — the 25 plain routes were pinned NOWHERE. That is gap G-1, named in
  // the Spec-041 plan (§9, T-03) and empirically confirmed before this block was written.
  // This register pins every one of the 50 nav ids to its EXACT route string, read from the nav.config
  // SOURCE. Editing any route, adding an item, or removing one now fails. STRICTLY ADDITIVE (R-1):
  // no existing assertion is deleted, relaxed or rescoped.
  {
    const navSrc = await import('../../src/js/nav.config.js');
    const ROUTES_50 = {
      home: 'dashboard.html', sessions: 'sessions.html', schedule: 'schedule.html',
      attendance: 'attendance.html', sessionsAnalysis: 'sessions-analysis.html',
      messages: 'messages.html', leads: 'leads.html', tasks: 'tasks.html',
      announcements: 'announcements.html', timeConverter: 'time-converter.html',
      publicHoliday: 'public-holiday.html', scheduledActions: 'scheduled-actions.html',
      families: 'families.html', addFamily: 'add-family.html', students: 'students.html',
      courses: 'courses.html', familyCategories: 'families.html#view=categories',
      groups: 'groups.html', scheduleSearch: 'schedule-search.html',
      studentResult: 'students.html#view=results', studentEvaluation: 'students.html#view=evaluation',
      teachers: 'teachers.html', addTeacher: 'teachers.html#view=add',
      teacherCategories: 'teachers.html#view=categories', teacherKpi: 'teacher-performance.html',
      sessionsKpi: 'teacher-performance.html#view=sessions-kpi',
      monthlyPerf: 'teacher-performance.html#view=monthly',
      reports: 'reports.html', monthlyReports: 'reports.html#view=monthly',
      dataAnalysis: 'reports.html#view=analysis', finance: 'finance.html',
      invoices: 'finance.html#view=invoices', monthlyInvoices: 'finance.html#view=monthly-invoices',
      salaries: 'finance.html#view=salaries', staffSalaries: 'finance.html#view=salaries',
      payments: 'finance.html#view=payments',
      classSalaryReport: null, // the ONE honest lock — route-less by contract
      banks: 'finance.html#view=banks', staff: 'staff.html',
      materials: 'library.html#view=materials', books: 'library.html#view=books',
      certificates: 'certificates.html', certificateRequests: 'certificates.html#view=requests',
      settings: 'settings.html', settingsGeneral: 'settings.html#view=general',
      settingsIntegrations: 'settings.html#view=integrations',
      settingsCustomization: 'settings.html#view=customization',
      settingsNotifications: 'settings.html#view=notifications',
      settingsSecurity: 'settings.html#view=security', settingsUsers: 'settings.html#view=users',
    };
    const all = navSrc.NAV_CATEGORIES.flatMap((c) => [...c.items, ...(c.sections || []).flatMap((s) => s.items)]);
    const expected = Object.keys(ROUTES_50);
    ok(expected.length === 50, `route-register: the register itself must hold exactly 50 ids, got ${expected.length}`);
    const actualIds = all.map((i) => i.id).sort();
    const added = actualIds.filter((id) => !(id in ROUTES_50));
    const removed = expected.filter((id) => !actualIds.includes(id));
    ok(added.length === 0, `route-register: UNREGISTERED nav item(s) ${JSON.stringify(added)} — every nav item must be pinned to an exact route`);
    ok(removed.length === 0, `route-register: MISSING nav item(s) ${JSON.stringify(removed)} — a registered item disappeared from nav.config`);
    for (const it of all) {
      if (!(it.id in ROUTES_50)) continue;
      const want = ROUTES_50[it.id];
      const got = it.route === undefined ? null : it.route;
      ok(got === want,
        `route-register: ${it.id} must route EXACTLY to ${JSON.stringify(want)}, got ${JSON.stringify(got)} — a real-but-wrong destination is still wrong (gap G-1)`);
    }
  }

  // ===== Spec 041 — ALL 24 deep-links, SEEDED (the discrimination fix) =====
  // Before 041 only 9 of the 22 deep-links were seeded with a conflicting stored view. A regression of
  // initTabs (enhance.js) from `hash || stored` to `stored || hash` would have passed the other 13 and
  // been caught only by those 9. Every one of the 24 is now discriminating: the URL hash must BEAT a
  // pre-seeded, different stored view. AR + EN = 48 executions.
  {
    const navSrc = await import('../../src/js/nav.config.js');
    const all = navSrc.NAV_CATEGORIES.flatMap((c) => [...c.items, ...(c.sections || []).flatMap((s) => s.items)]);
    const GROUPS = {
      'families.html': 'families', 'students.html': 'students', 'teacher-performance.html': 'perf',
      'reports.html': 'reports', 'finance.html': 'finance', 'library.html': 'library',
      'certificates.html': 'certificates', 'settings.html': 'settings', 'teachers.html': 'teachers',
    };
    const deep = all.filter((i) => i.status === 'implemented' && i.route.includes('#view='));
    for (const it of deep) {
      const [file, frag] = it.route.split('#');
      const view = frag.replace('view=', '');
      const group = GROUPS[file];
      for (const lang of ['ar', 'en']) {
        const f = lang === 'en' ? file.replace('.html', '.en.html') : file;
        // pick a DIFFERENT existing tab of the same group to seed as the stored view
        const html = fs.readFileSync(require('path').join(__dirname, '../../public', f), 'utf8');
        const tabIds = [...html.matchAll(/data-tabpanel="([a-z0-9-]+)"/g)].map((m) => m[1]);
        const other = tabIds.find((x) => x !== view);
        ok(!!other, `deeplink/${it.id}/${lang}: the ${group} group must have >1 tab to make the seed discriminating`);
        const ctx = await browser.newContext();
        await ctx.addInitScript(([g, o]) => { try { localStorage.setItem('academy.schedView.' + g, o); } catch (e) { /* ignore */ } }, [group, other]);
        const p = await ctx.newPage();
        const ext = [];
        p.on('request', (r) => { const u = r.url(); if (!u.startsWith(BASE) && !u.startsWith('data:')) ext.push(u); });
        await p.goto(`${BASE}/${f}#view=${view}`, { waitUntil: 'networkidle' });
        await waitForOnlyPanel(p, group, view);
        const vis = await p.evaluate((g) => [...document.querySelectorAll(`[data-tabs="${g}"] [data-tabpanel]`)].filter((x) => !x.hidden).map((x) => x.getAttribute('data-tabpanel')), group);
        ok(vis.length === 1 && vis[0] === view,
          `deeplink/${it.id}/${lang}: #view=${view} must open EXACTLY that panel — the URL hash must beat the seeded stored view '${other}'. Got ${JSON.stringify(vis)}`);
        ok(ext.length === 0, `deeplink/${it.id}/${lang}: triggered external request(s) ${JSON.stringify(ext.slice(0, 2))}`);
        await ctx.close();
      }
    }
  }

  // ===== Spec 041 — D-1: the DIRECT-SURFACE law + the PAY28 hidden-panel closure =====
  // A fresh #view=add must show the REAL form — not a button that opens one. And because the moved
  // forms now live inside [hidden] tab panels, the PROTECTED PAY28 grep (which uses innerText, and so
  // SKIPS hidden subtrees) can no longer see them. PAY28 stays byte-verbatim; this ADDITIVE panel-scoped
  // textContent grep closes the hole, so teacher pay-free coverage on teachers.html is strictly LARGER
  // after 041 than before.
  for (const lang of ['ar', 'en']) {
    const f = lang === 'en' ? 'teachers.en.html' : 'teachers.html';
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE}/${f}#view=add`, { waitUntil: 'networkidle' });
    await waitForOnlyPanel(p, 'teachers', 'add');
    const r = await p.evaluate(() => {
      const add = document.querySelector('[data-tabs="teachers"] [data-tabpanel="add"]');
      const cat = document.querySelector('[data-tabs="teachers"] [data-tabpanel="categories"]');
      const vis = [...document.querySelectorAll('[data-tabs="teachers"] [data-tabpanel]')].filter((x) => !x.hidden).map((x) => x.getAttribute('data-tabpanel'));
      const panels = [...document.querySelectorAll('[data-tabs="teachers"] [data-tabpanel]')];
      // Reuse the PROTECTED PAY28 regex verbatim — do NOT invent a broader one. A naive /SAR/i (no word
      // boundary) matches the persona name "Sara"; a bare /\brate\b/ matches ordinary UI copy. The point of
      // this assert is the SCOPE (hidden panels included), not a stricter pattern.
      const PAY = /راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|\bEGP\b|\bAED\b|\bEUR\b/i;
      return {
        active: vis,
        addFields: add ? add.querySelectorAll('input,select,textarea').length : -1,
        addPrimary: add ? add.querySelectorAll('.btn-primary[data-disabled-reason]').length : -1,
        addDrawerBtns: add ? add.querySelectorAll('[data-drawer]').length : -1,
        addFileInputs: add ? add.querySelectorAll('input[type=file],input[type=password]').length : -1,
        catFields: cat ? cat.querySelectorAll('input,select,textarea').length : -1,
        catPrimary: cat ? cat.querySelectorAll('.btn-primary[data-disabled-reason]').length : -1,
        // hidden panels INCLUDED — this is the point
        payInAnyPanel: panels.some((el) => PAY.test(el.textContent || '')),
        editDrawer: !!document.querySelector('template[data-preview="trn-edit"]'),
        goneDrawers: document.querySelectorAll('[data-drawer="trn-add"],[data-drawer="trn-categories"],template[data-preview="trn-add"],template[data-preview="trn-categories"]').length,
      };
    });
    ok(r.active.length === 1 && r.active[0] === 'add', `teachers/${lang}: #view=add must open exactly the add panel, got ${JSON.stringify(r.active)}`);
    ok(r.addFields === 13, `teachers/${lang}: the add panel must render the REAL form — 13 field() controls, got ${r.addFields}`);
    ok(r.addPrimary === 1, `teachers/${lang}: the add panel must end at EXACTLY ONE primary backendRequired Save, got ${r.addPrimary}`);
    ok(r.addDrawerBtns === 0, `teachers/${lang}: DIRECT-SURFACE LAW — the add panel must contain NO drawer-opening button (no second click), got ${r.addDrawerBtns}`);
    ok(r.addFileInputs === 0, `teachers/${lang}: the add panel must render 0 type=file / type=password inputs (the CV upload stays a gate)`);
    ok(r.catFields >= 3 && r.catPrimary === 1, `teachers/${lang}: the categories panel must carry the real create form + exactly one primary Save, got fields=${r.catFields} primary=${r.catPrimary}`);
    ok(!r.payInAnyPanel, `teachers/${lang}: teacher pay-free — a pay/salary/rate token appears in a teachers tab panel (HIDDEN panels included; this closes the PAY28 innerText hole)`);
    ok(r.editDrawer, `teachers/${lang}: the trn-edit drawer must be RETAINED (it is opened from the card kebab, not a nav item)`);
    ok(r.goneDrawers === 0, `teachers/${lang}: the trn-add / trn-categories drawers and templates must be GONE — their forms moved into tabs (got ${r.goneDrawers})`);
    await ctx.close();
  }

  // ===== Spec 041 — D-2: the ORPHAN SET is frozen at exactly {gallery.html, gallery.en.html} =====
  // A NEW orphan fails. LOSING the exception (giving gallery an inbound link) also fails.
  {
    const dir = require('path').join(__dirname, '../../public');
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
    const linked = new Set();
    for (const f of files) {
      const h = fs.readFileSync(require('path').join(dir, f), 'utf8');
      for (const m of h.matchAll(/href="([^"#]*\.html)(#[^"]*)?"/g)) linked.add(m[1].replace(/^\.\//, ''));
    }
    const orphans = files.filter((f) => !linked.has(f) && f !== 'index.html').sort();
    ok(JSON.stringify(orphans) === JSON.stringify(['gallery.en.html', 'gallery.html']),
      `orphan-set: the frozen orphan set is exactly {gallery.html, gallery.en.html} — a new orphan, or gallery gaining an inbound link, is a failure. Got ${JSON.stringify(orphans)}`);
  }

  // ===== Spec 041 — D-3: the TOPBAR language switch must PRESERVE the URL fragment =====
  // enhance.js `langUrl()` used to build the mirrored URL from location.pathname ALONE, so a language
  // switch DESTROYED the hash: finance.html#view=banks → finance.en.html, and the page silently fell
  // back to its baked default tab. The SIDEBAR was never affected (components/sidebar.js langRoute()
  // has been hash-aware since Spec 035) — this was a topbar-only defect, and it sits inside the route
  // freeze, so Spec 041 owns it.
  //
  // ⚠ SELECTOR TRAP (this is why the test is written the way it is): `settings.html` renders TWO
  // [data-set-lang] elements — the TOPBAR menu item (built by enhance.js, role="menuitem") and the
  // Customization tab's REAL language control (settings-section.js, class="tab"). An unscoped
  // [data-set-lang] click hits the wrong control and silently proves nothing. We therefore open
  // [data-action="lang-menu"] and click ONLY [role="menuitem"][data-set-lang=…].
  {
    const D3 = [
      // file (start)                       to    expected mirrored URL                       group      expected panel
      ['finance.html#view=banks',           'en', 'finance.en.html#view=banks',               'finance', 'banks'],
      ['settings.html#view=security',       'en', 'settings.en.html#view=security',           'settings', 'security'],
      ['library.en.html#view=books',        'ar', 'library.html#view=books',                  'library', 'books'],
      ['reports.html#view=analysis',        'en', 'reports.en.html#view=analysis',            'reports', 'analysis'],
      // the OTHER two fragment families the app uses — neither may be dropped
      ['add-family.html#step=children',     'en', 'add-family.en.html#step=children',         null, null],
      ['family-child.html#child=st11',      'en', 'family-child.en.html#child=st11',          null, null],
      // the CONTROL row: a page with NO fragment must NOT gain one
      ['dashboard.html',                    'en', 'dashboard.en.html',                        null, null],
    ];
    for (const [start, to, want, group, panel] of D3) {
      const ctx = await browser.newContext();
      // seed a CONFLICTING stored view: the preserved hash must still win after the switch.
      if (group) await ctx.addInitScript(([g, o]) => { try { localStorage.setItem('academy.schedView.' + g, o); } catch (e) { /* ignore */ } }, [group, 'overview']);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/${start}`, { waitUntil: 'networkidle' });
      // open the TOPBAR language popover and assert it really opened
      await openRequiredMenu(p, '[data-action="lang-menu"]');
      const languageItem = p.locator(`[role="menuitem"][data-set-lang="${to}"]:visible`);
      await languageItem.waitFor({ timeout: 5000, state: 'visible' });
      const menuCount = await p.locator('[role="menuitem"][data-set-lang]:visible').count();
      if (menuCount !== 2) throw new Error(`d3/${start}: expected exactly two visible topbar language items, got ${menuCount}`);
      await Promise.all([
        p.waitForURL((url) => url.href.endsWith(`/${want}`), { waitUntil: 'networkidle', timeout: 5000 }),
        languageItem.click(),
      ]);
      if (group) await waitForOnlyPanel(p, group, panel);
      const r = await p.evaluate((g) => ({
        href: location.href.split('/').pop(),
        hashes: (location.href.match(/#/g) || []).length,
        active: g ? [...document.querySelectorAll(`[data-tabs="${g}"] [data-tabpanel]`)].filter((x) => !x.hidden).map((x) => x.getAttribute('data-tabpanel')) : null,
      }), group);
      ok(r.href === want, `d3/${start} → ${to}: the language switch must PRESERVE the fragment — expected ${want}, got ${r.href}`);
      ok(r.hashes <= 1, `d3/${start}: double hash in the mirrored URL (${r.href})`);
      if (group) {
        ok(r.active.length === 1 && r.active[0] === panel,
          `d3/${start} → ${to}: exactly the '${panel}' panel must be visible after the switch (the preserved hash must beat the seeded stored view), got ${JSON.stringify(r.active)}`);
      }
      await ctx.close();
    }
    // the topbar language control stays keyboard-reachable
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(`${BASE}/dashboard.html`, { waitUntil: 'networkidle' });
    const kb = await p.evaluate(() => {
      const b = document.querySelector('[data-action="lang-menu"]');
      return !!b && b.tabIndex >= 0 && b.getAttribute('aria-haspopup') === 'menu';
    });
    ok(kb, 'd3: the topbar language control must stay keyboard-accessible (focusable + aria-haspopup=menu)');
    await ctx.close();
  }

  await browser.close();

  // ===== Spec 039 — FUTURE_ROUTES source audit: `materials` was the last stale placeholder route
  // (Spec 031 folded it into the library Materials tab). Now that materials is a real deep-link it must be
  // GONE from the map, and certificateRequests must never have been added to it — a promoted item carries a
  // real `route`, never a documented-future one. Asserted against the nav source, not the rendered DOM. =====
  {
    const navSrc = await import('../../src/js/nav.config.js');
    const fr = navSrc.FUTURE_ROUTES;
    ok(!('materials' in fr), `nav.config: FUTURE_ROUTES.materials must be removed after Spec 039, got ${JSON.stringify(fr.materials)}`);
    ok(!('certificateRequests' in fr), `nav.config: certificateRequests must NOT be added to FUTURE_ROUTES (it is a real deep-link), got ${JSON.stringify(fr.certificateRequests)}`);
    const byId = (cat, id) => navSrc.NAV_CATEGORIES.find((c) => c.id === cat).items.find((i) => i.id === id);
    ok(byId('admin', 'materials').route === 'library.html#view=materials', 'nav.config: materials route must be library.html#view=materials');
    ok(byId('admin', 'certificateRequests').route === 'certificates.html#view=requests', 'nav.config: certificateRequests route must be certificates.html#view=requests');
    ok(byId('admin', 'books').route === 'library.html#view=books', 'nav.config: books route must be refined to library.html#view=books');
    // the honest finance lock is untouched by Spec 039
    const csr = navSrc.NAV_CATEGORIES.flatMap((c) => [...c.items, ...(c.sections || []).flatMap((s) => s.items)]).find((i) => i.id === 'classSalaryReport');
    ok(csr.status === 'disabled' && csr.reasonKey === 'nav.reason.finance' && !csr.route, 'nav.config: classSalaryReport must stay an honest disabled lock with no route');

    /* ===== Spec 045 — ADDITIVE GUARD G45-1: teacherAbsent / studentAbsent must stay DISTINCT
     * at the SOURCE, in every locale (FR-020, SC-005).
     *
     * This guard exists because mutation M45-06 proved the DOM-level check insufficient. Asserting
     * only that "a teacher-absence label and a student-absence label both appear on the page" passes
     * even when one has been rewritten to the other's wording, because a sibling block elsewhere on
     * the page still supplies the missing phrasing. Conflation is precisely FR-020's forbidden state,
     * so the guarantee has to be checked where the two values sit side by side: the locale source.
     *
     * Every object literal that defines BOTH keys must give them different values, in both locales.
     * Falsifying mutation: M45-06. */
    {
      const absSrcs = ['ar.trn.js', 'en.trn.js', 'ar.js', 'en.js']
        .map((f) => ({ f, p: require('path').join(__dirname, '../../src/locales', f) }))
        .filter((x) => fs.existsSync(x.p))
        .map((x) => ({ f: x.f, s: fs.readFileSync(x.p, 'utf8') }));
      let pairsChecked = 0;
      for (const { f, s } of absSrcs) {
        /* pair them up in emission order: the Nth teacherAbsent value belongs to the Nth
         * studentAbsent value, since every block that defines one defines the other. */
        const tVals = [...s.matchAll(/teacherAbsent:\s*'([^']*)'/g)].map((m) => m[1]);
        const sVals = [...s.matchAll(/studentAbsent:\s*'([^']*)'/g)].map((m) => m[1]);
        ok(tVals.length === sVals.length,
          `locale ${f}: teacherAbsent/studentAbsent are defined an unequal number of times (${tVals.length} vs ${sVals.length}) — one absence concept lost its counterpart`);
        for (let i = 0; i < Math.min(tVals.length, sVals.length); i += 1) {
          ok(tVals[i] !== sVals[i],
            `locale ${f}: teacherAbsent and studentAbsent share the identical label "${tVals[i]}" — the two absence concepts have been conflated (FR-020)`);
          pairsChecked += 1;
        }
      }
      ok(pairsChecked >= 4,
        `Spec 045: expected at least 4 teacherAbsent/studentAbsent label pairs across the locales, checked ${pairsChecked} — the guard would pass vacuously`);
    }

    /* ===== Spec 045 — ADDITIVE GUARD G45-7: every Teacher drawer opener must resolve to a real
     * target (FR-047, FR-034).
     *
     * This guard exists because mutation M45-14 proved the inherited Spec-044 driver does not cover
     * it. Renaming a Teacher drawer template so its opener pointed at a target that no longer exists
     * produced a dangling trigger — a control that looks live and does nothing — and all 22
     * inherited interaction guards still passed. FR-047 requires every trigger-to-target mapping in
     * changed Teacher interactions to be exercised and to fail loudly when absent, so the Teacher
     * domain needs its own assertion rather than assuming the inherited suite covers it.
     *
     * For each of the 22 localized Teacher consumers: every `data-drawer="X"` must have a matching
     * `<template data-preview="X">` on that same page.
     * Falsifying mutation: M45-14. */
    {
      const pubDir7 = require('path').join(__dirname, '../../public');
      const SCOPES7 = ['teacher-portal', 'teacher-schedule', 'teacher-students', 'teacher-outcomes',
        'teacher-tasks', 'teacher-reports', 'teacher-library', 'teacher-profile',
        'teachers', 'teacher', 'teacher-performance'];
      let openers7 = 0, pages7 = 0;
      for (const b of SCOPES7) for (const s of ['', '.en']) {
        const f = require('path').join(pubDir7, `${b}${s}.html`);
        ok(fs.existsSync(f), `G45-7: generated consumer ${b}${s}.html is missing`);
        const h = fs.readFileSync(f, 'utf8');
        pages7 += 1;
        const targets = new Set([...h.matchAll(/<template[^>]*data-preview="([^"]+)"/g)].map((m) => m[1]));
        for (const m of h.matchAll(/data-drawer="([^"]+)"/g)) {
          openers7 += 1;
          ok(targets.has(m[1]),
            `G45-7: ${b}${s}.html has a dangling drawer opener data-drawer="${m[1]}" with no <template data-preview="${m[1]}"> on the page (FR-047)`);
        }
      }
      ok(pages7 === 22, `G45-7: expected 22 localized Teacher consumers, inspected ${pages7}`);
      ok(openers7 >= 30, `G45-7: expected the Teacher domain to carry its known drawer openers, found only ${openers7} — the guard would pass vacuously`);
    }

    /* ===== Spec 045 — ADDITIVE GUARD G45-3: AR/EN locale key parity for the Teacher namespaces
     * (FR-052, SC-001). A missing key renders its raw dotted name to the user in one locale only,
     * which the DOM raw-key sweep can miss if the affected page/state is not visited. Comparing the
     * flattened key SETS of each mirrored pair catches it structurally.
     * Falsifying mutation: M45-08. */
    {
      const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
        (v && typeof v === 'object' && !Array.isArray(v)) ? flat(v, p + k + '.') : [p + k]);
      for (const ns of ['prt', 'trn']) {
        const a = (await import(`../../src/locales/ar.${ns}.js`)).default;
        const e = (await import(`../../src/locales/en.${ns}.js`)).default;
        const A = new Set(flat(a)); const B = new Set(flat(e));
        const onlyAr = [...A].filter((k) => !B.has(k));
        const onlyEn = [...B].filter((k) => !A.has(k));
        ok(A.size > 0 && B.size > 0, `G45-3: locale namespace ${ns} loaded no keys — the guard must not pass vacuously`);
        ok(onlyAr.length === 0, `G45-3: ar.${ns}.js has ${onlyAr.length} key(s) with no EN mirror → ${JSON.stringify(onlyAr.slice(0, 6))} (FR-052)`);
        ok(onlyEn.length === 0, `G45-3: en.${ns}.js has ${onlyEn.length} key(s) with no AR mirror → ${JSON.stringify(onlyEn.slice(0, 6))} (FR-052)`);
      }
    }

    /* ===== Spec 045 — ADDITIVE GUARD G45-4: the Teacher-domain dark-theme rules must survive in the
     * COMPILED stylesheet (FR-053). `--pt-accent-weak` reads near-charcoal in dark (the documented
     * Spec-024 D-06 hazard), so the Teacher layer carries explicit dark overrides. Tailwind purges
     * anything it believes unused, so their presence in the built artifact — not the source — is
     * what actually protects the dark theme.
     * Falsifying mutation: M45-10. */
    {
      const cssPath = require('path').join(__dirname, '../../public/assets/app.css');
      ok(fs.existsSync(cssPath), 'G45-4: compiled public/assets/app.css is missing — the guard has no target');
      const css = fs.readFileSync(cssPath, 'utf8');
      for (const sel of ['.td-focus', '.td-meta', '.td-gates', '.td-actions']) {
        ok(css.includes(sel), `G45-4: Teacher-domain primitive ${sel} is absent from the compiled stylesheet — it was purged or deleted`);
      }
      /* Two separate dark rules protect this layer and BOTH must survive:
       *   (a) the explicit  [data-theme=dark] .td-gates { … }
       *   (b) the system fallback :root:not([data-theme=light]):not([data-theme=dark]) .td-gates { … }
       *       inside an @media (prefers-color-scheme: dark) block.
       * Mutation M45-10 proved a naive regex is not enough: `[data-theme=dark][^{]*\.td-gates`
       * ALSO matches (b), because (b) contains `[data-theme=dark])` before its ` .td-gates`. So
       * deleting (a) outright still satisfied the guard and M45-10 came back GREEN. The explicit
       * rule is therefore anchored to the START of a rule — preceded by `}`, `,` or the file start —
       * which the `:not(...)` form can never satisfy, since its bracket is preceded by `)`.
       * The stylesheet is minified, so attribute-selector quotes may be stripped; accept either form. */
      ok(/(^|[};,])\s*\[data-theme=["']?dark["']?\]\s+\.td-gates\s*\{/.test(css),
        'G45-4: the EXPLICIT [data-theme=dark] .td-gates rule is gone from the compiled stylesheet (FR-053)');
      ok(/prefers-color-scheme:\s*dark/.test(css),
        'G45-4: the system-dark fallback block is gone from the compiled stylesheet (FR-053)');
      ok(/:not\(\[data-theme=["']?dark["']?\]\)\s+\.td-gates/.test(css),
        'G45-4: the system-dark fallback rule for .td-gates is gone from the compiled stylesheet (FR-053)');
      ok(/@media[^{]*max-width:\s*390px/.test(css),
        'G45-4: the exact-390px containment block for the Teacher layer is gone from the compiled stylesheet (FR-054)');
    }

    /* ===== Spec 045 — ADDITIVE GUARD G45-5: the Teacher self-profile and the admin Teacher detail
     * are never the same surface (FR-040, SC-005). `teacher-profile` is the teacher's own account
     * page; `teacher` is the administrator's record of that teacher. Confusing them either leaks
     * admin capability into the portal or self-identity into the admin console.
     * Falsifying mutation: M45-05. */
    {
      const pub = require('path').join(__dirname, '../../public');
      const read = (f) => fs.readFileSync(require('path').join(pub, f), 'utf8');
      for (const lang of ['', '.en']) {
        const self = read(`teacher-profile${lang}.html`);
        const admin = read(`teacher${lang}.html`);
        ok(/class="portal-shell/.test(self), `G45-5: teacher-profile${lang}.html is not rendered in the portal shell — self/admin identity confusion`);
        ok(!/class="portal-shell/.test(admin), `G45-5: teacher${lang}.html is rendered in the PORTAL shell — it is an administrator surface`);
        ok(/data-tabs="teacher"/.test(admin), `G45-5: teacher${lang}.html lost its admin eight-tab structure`);
        ok(!/data-tabs="teacher"/.test(self), `G45-5: teacher-profile${lang}.html adopted the admin detail tab structure — the two surfaces must stay distinct`);
        /* the admin action cluster must never appear on the self page */
        for (const admOnly of ['trn-assign-course', 'trn-assign-group', 'trn-policy', 'trn-availability']) {
          ok(!self.includes(admOnly), `G45-5: teacher-profile${lang}.html exposes the admin-only control "${admOnly}" (FR-040)`);
        }
      }
    }

    /* ===== Spec 045 — ADDITIVE GUARD G45-6: the Spec-045 guards must themselves fail loudly
     * (FR-061). A guard wrapped in a silent catch, or one whose selector is optional, passes while
     * proving nothing — the exact failure mode this Spec forbids in its own test code. This
     * meta-guard reads THIS file and rejects those shapes inside the Spec-045 blocks.
     * Falsifying mutation: M45-12. */
    {
      const selfSrc = fs.readFileSync(__filename, 'utf8');
      const blocks = [...selfSrc.matchAll(/ADDITIVE GUARD G45-\d[\s\S]{0,4200}?\n    \}/g)].map((m) => m[0]);
      ok(blocks.length >= 5, `G45-6: expected at least 5 Spec-045 guard blocks to inspect, found ${blocks.length} — the meta-guard must not pass vacuously`);
      for (const b of blocks) {
        const name = (b.match(/G45-\d/) || ['G45-?'])[0];
        /* M45-12 proved the first form missed bare ES2019 optional-catch-binding `catch {}`
         * (no param list) — a canonical swallowed selector. Match BOTH `catch (e) {}` and `catch {}`.
         * This guard scans OTHER guards' source, so it must not test its own block: its source
         * necessarily names the pattern it rejects, which the widened regex would otherwise flag. */
        if (name === 'G45-6') continue;
        const emptyCatch = new RegExp('cat' + 'ch(\\s*\\(\\s*\\w*\\s*\\))?\\s*\\{' + '\\s*\\}');
        ok(!emptyCatch.test(b), `G45-6: guard ${name} contains an empty catch — a swallowed failure (FR-061)`);
        const emptyDotCatch = new RegExp('\\.cat' + 'ch\\(\\s*\\(\\)\\s*=>\\s*\\{?\\s*\\}?\\s*\\)');
        ok(!emptyDotCatch.test(b), `G45-6: guard ${name} swallows a rejection with an empty .catch() (FR-061)`);
        ok(/\bok\(/.test(b), `G45-6: guard ${name} contains no assertion at all (FR-061)`);
      }
    }

    /* ===== Spec 045 — ADDITIVE GUARD G45-2: the Teacher directory summary may never present a
     * computed performance measure (FR-031, EG-045-09).
     *
     * The directory shipped a third summary card computing `Math.round(rows.reduce((a,r)=>a+r.util,0)
     * / rows.length)` and rendering it as a percentage — an average-utilization metric across
     * teachers. FR-031 forbids computing or displaying average utilization, scores, ranks or
     * percentages there; only authored categorical status/workload information is allowed.
     *
     * A DOM-only check is insufficient: a future refactor could compute the mean and render it
     * without a literal '%' (a ratio, an index, a "load score"), and the page would look clean while
     * the prohibited calculation was back. So this guard reads the AUTHORED SOURCE and rejects the
     * arithmetic itself, then separately confirms the rendered summary carries no percentage.
     * A plain COUNT of records matching an authored categorical value stays allowed — that is what
     * the three cards legitimately do.
     * Falsifying mutation: M45-17 (reintroduce the avgUtil mean). */
    {
      const tsrcPath = require('path').join(__dirname, '../../src/js/pages/teachers.js');
      ok(fs.existsSync(tsrcPath), 'G45-2: pages/teachers.js is missing — the guard has no target');
      const tsrc = fs.readFileSync(tsrcPath, 'utf8');
      ok(!/\bavgUtil\b/.test(tsrc),
        'G45-2: pages/teachers.js reintroduced `avgUtil` — a computed average utilization is forbidden (FR-031)');
      ok(!/\.\s*util\b/.test(tsrc.replace(/\/\*[\s\S]*?\*\//g, '')),
        'G45-2: pages/teachers.js reads the numeric `util` fixture field again — the directory must use authored categorical information only (FR-031)');
      /* reject a mean in any spelling: reduce(...) divided by a length */
      ok(!/reduce\([\s\S]{0,200}?\)\s*\/\s*\w+\.length/.test(tsrc),
        'G45-2: pages/teachers.js computes an arithmetic mean over the records — forbidden performance measure (FR-031)');

      const dirPub = require('path').join(__dirname, '../../public');
      let summariesChecked = 0;
      for (const f of ['teachers.html', 'teachers.en.html']) {
        const p = require('path').join(dirPub, f);
        ok(fs.existsSync(p), `G45-2: generated consumer ${f} is missing`);
        const h = fs.readFileSync(p, 'utf8');
        /* Anchor on the exact grid `teachers.js` emits for its three summary cards
         * (summaryCards({cols:'grid-cols-1 sm:grid-cols-3'})). If that markup ever moves, this
         * assertion fails rather than silently checking nothing. */
        const m = h.match(/<div class="grid gap-4 grid-cols-1 sm:grid-cols-3">[\s\S]*?(?=<div class="tabs|<div class="filter|$)/);
        ok(!!m, `G45-2: could not locate the directory summary row in ${f} — the guard must not pass vacuously`);
        const seg = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        ok(!/[%٪]/.test(seg),
          `G45-2: the Teacher directory summary in ${f} renders a percentage — forbidden computed measure (FR-031). Segment: ${seg.slice(0, 160)}`);
        ok(/\d|[٠-٩]/.test(seg),
          `G45-2: the directory summary in ${f} rendered no counts at all — the guard must not pass on an empty region`);
        summariesChecked += 1;
      }
      ok(summariesChecked === 2, `G45-2: expected to check 2 localized directory summaries, checked ${summariesChecked}`);
    }

    /* ===== Spec 045 — ADDITIVE GUARD G45-8: consolidated fail-loud Teacher-domain census
     * (FR-060): one auditable roll-up of the scope / consumer / route / link / action / pay /
     * rank / role / absence / locale guarantees across all ELEVEN Teacher scopes — the eight
     * portal scopes (teacher-portal, teacher-schedule, teacher-students, teacher-outcomes,
     * teacher-tasks, teacher-reports, teacher-library, teacher-profile) plus the three admin
     * scopes (teachers, teacher, teacher-performance) — ×2 locales = 22 localized consumers.
     *
     * Everything asserted here is additive: no existing Spec 000–043 assertion is weakened,
     * stubbed, skipped, or silenced. The per-page live loop above keeps its browser-level
     * guarantees; this census independently re-pins them against the generated bytes so a
     * failing run names the exact scope and file. Scope audiences: PORTAL_SCOPES render the
     * portal shell (teacher-facing), ADMIN_SCOPES render the admin shell, and the pay-free
     * hard line extends to every page the teacher role can ever reach.
     *
     * Digits are deliberately NOT censused in this positive form: Arabic pages render authored
     * numerals in Arabic-Indic form by design, and the teacher-schedule list honestly renders a
     * student-count noun phrase for each session (counting attendees is not ranking them).
     * The failing shape this block forbids is the leaderboard/ranked-list/score vocabulary and
     * the chart machinery — both word-bounded below. */
    {
      const pubDir8 = require('path').join(__dirname, '../../public');
      const srcPages8 = require('path').join(__dirname, '../../src/js/pages');
      const read8 = (base, suffix) => fs.readFileSync(require('path').join(pubDir8, `${base}${suffix}.html`), 'utf8');
      const stripTags8 = (h) => h.replace(/<[^>]+>/g, ' ');
      const stripComments8 = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
      const bodyOfFile8 = (file) => {
        const h = read8(file.base, file.suffix);
        const i = h.indexOf('id="page-body"');
        const j = h.indexOf('</main>', i);
        ok(i >= 0 && j > i, `G45-8: §scope ${file.base}${file.suffix}.html has no #page-body…</main> content region — the link census has no region to audit`);
        return i >= 0 && j > i ? h.slice(i, j) : '';
      };
      const PORTAL_SCOPES_8 = ['teacher-portal', 'teacher-schedule', 'teacher-students', 'teacher-outcomes',
        'teacher-tasks', 'teacher-reports', 'teacher-library', 'teacher-profile'];
      const ADMIN_SCOPES_8 = ['teachers', 'teacher', 'teacher-performance'];
      const TCH_SCOPES_8 = [...PORTAL_SCOPES_8, ...ADMIN_SCOPES_8];
      // the pages the teacher ROLE can reach (portal scope only) — the strictest pay-free surface
      const TCH_FACING_8 = PORTAL_SCOPES_8;

      /* §1 scope/consumer presence (falsifying mutation: M45-01 drop-scope, M45-02 drop-consumer).
       * Each of the 22 localized consumers must exist, be non-trivial, and carry the #page-body
       * region it is authored around. */
      let consumers8 = 0;
      for (const b of TCH_SCOPES_8) for (const suffix of ['', '.en']) {
        const f = require('path').join(pubDir8, `${b}${suffix}.html`);
        ok(fs.existsSync(f), `G45-8: §1 missing localized consumer ${b}${suffix}.html (scope ${b})`);
        if (fs.existsSync(f)) {
          const h = fs.readFileSync(f, 'utf8');
          ok(h.length > 3000, `G45-8: §1 consumer ${b}${suffix}.html is suspiciously small (${h.length} bytes) — the guard must not pass on a near-empty shell`);
          ok(h.includes('id="page-body"'), `G45-8: §1 consumer ${b}${suffix}.html has no #page-body region`);
          consumers8 += 1;
        }
      }
      ok(consumers8 === TCH_SCOPES_8.length * 2,
        `G45-8: §1 expected exactly ${TCH_SCOPES_8.length * 2} Teacher localized consumers (11 scopes × AR/EN), found ${consumers8}`);

      /* §2 route & link truth (falsifying mutation: M45-07 broken deep link). Every navigable
       * anchor and every form action reachable from a Teacher scope must carry a real href, never
       * a dead `href="#"`, never a bare `javascript:`, and must target a page that actually ships
       * (one of the 115 generated files), an in-page/state hash, or a hash-view on a real file. */
      const FILES_SET_8 = new Set(fs.readdirSync(pubDir8).filter((f) => f.endsWith('.html')));
      let linksChecked8 = 0, deadLinks8 = 0;
      for (const b of TCH_SCOPES_8) for (const suffix of ['', '.en']) {
        const h = read8(b, suffix);
        const body = bodyOfFile8({ base: b, suffix });
        const hrefs = [...body.matchAll(/\bhref="([^"]*)"/g)].map((m) => m[1]);
        const actions = [...body.matchAll(/<form[^>]*\baction="([^"]*)"/g)].map((m) => m[1]);
        for (const href of [...hrefs, ...actions]) {
          linksChecked8 += 1;
          const bare = href === '' || href === '#';
          const deadHash = href === '#' || /^#+$/.test(href);
          const jsProto = /^\s*javascript:/i.test(href);
          if (bare || deadHash || jsProto) { deadLinks8 += 1; ok(false, `G45-8: §2 dead control href="${href}" on Teacher scope ${b}${suffix}.html`); }
          const noHash = href.split('#')[0];
          if (noHash && !FILES_SET_8.has(noHash)) {
            ok(false, `G45-8: §2 Teacher scope ${b}${suffix}.html links to a non-existent route "${noHash}" (FR-012)`);
          }
        }
        // every Teacher scope must actually CONTAIN navigable routes — an empty census proves nothing
        ok(linksChecked8 > 0, `G45-8: §2 scope ${b}${suffix}.html exposed no links/actions to audit — the guard would pass vacuously`);
      }
      ok(deadLinks8 === 0, `G45-8: §2 ${deadLinks8} dead link(s)/href="#"/javascript: action(s) across the Teacher scopes`);
      ok(linksChecked8 >= 60,
        `G45-8: §2 expected at least 60 Teacher navigable links/actions to audit, found ${linksChecked8} — the census would pass vacuously`);

      /* §3 pay-free hard line on every teacher-facing (portal) page, both locales — word-bounded
       * EN so "payment" can't hide inside another word, and a substring AR set for the authored
       * vocabulary (راتب/رواتب/أجر/مستحقات/غرامة/مكافأة). The teacher portal domain is the
       * strictest surface: no salary/payroll/compensation token may ever render. */
      const PAY_TOKENS_EN_8 = /\b(salary|salaries|payroll|payouts?|compensation|earnings?|remuneration|wages?)\b/i;
      const PAY_TOKENS_AR_8 = /راتب|رواتب|أجر|أجور|مستحقات|مكافأة|مكافآت|غرامة|غرامات/;
      let payScopesChecked8 = 0;
      for (const b of TCH_FACING_8) for (const suffix of ['', '.en']) {
        const raw = read8(b, suffix);
        const bodyText8 = stripTags8(bodyOfFile8({ base: b, suffix }));
        const enHit = raw.match(PAY_TOKENS_EN_8);
        const arHit = raw.match(PAY_TOKENS_AR_8);
        const enBody = bodyText8.match(PAY_TOKENS_EN_8);
        const arBody = bodyText8.match(PAY_TOKENS_AR_8);
        ok(!enHit && !arHit, `G45-8: §3 pay/salary/payroll/compensation token on teacher-facing page ${b}${suffix}.html → "${(enHit || arHit || [])[0]}" (FR-006)`);
        ok(!enBody && !arBody, `G45-8: §3 pay vocabulary rendered in the #page-body of ${b}${suffix}.html → "${(enBody || arBody || [])[0]}" (FR-006)`);
        payScopesChecked8 += 1;
      }
      ok(payScopesChecked8 === TCH_FACING_8.length * 2,
        `G45-8: §3 expected to sweep ${TCH_FACING_8.length * 2} teacher-facing localized consumers, swept ${payScopesChecked8}`);

      /* §4 no rank/score/leaderboard vocabulary or chart machinery on any teacher-facing page —
       * the display-only rule. Negated/honest statements ("no computed rating", "دون أي ترتيب
       * محسوب") are legitimate and stay allowed; the census forbids the leaderboard/ranked-list
       * shape and the score tokens only where they would present a measure. */
      const RANK_EN_8 = /\b(leaderboard|leaderboards|percentile|percentiles|ranked|ranking|top[- ]?rated|high[- ]?score|outperform(?:s|ed|ing)?|gpa)\b/i;
      const RANK_AR_8 = /لوحة المتصدرين|المتصدرين|ترتيب المعلمين|أفضل المعلمين/;
      const CHART_8 = /<canvas|chart\.js|data-chart/i;
      let rankScopesChecked8 = 0;
      for (const b of TCH_FACING_8) for (const suffix of ['', '.en']) {
        const raw = read8(b, suffix);
        const body8 = bodyOfFile8({ base: b, suffix });
        const enHit = raw.match(RANK_EN_8);
        const arHit = raw.match(RANK_AR_8);
        const chartHit = body8.match(CHART_8);
        ok(!enHit && !arHit, `G45-8: §4 rank/score/leaderboard vocabulary on teacher-facing page ${b}${suffix}.html → "${(enHit || arHit || [])[0]}" (FR-031)`);
        ok(!chartHit, `G45-8: §4 chart/canvas machinery on teacher-facing page ${b}${suffix}.html (FR-031)`);
        rankScopesChecked8 += 1;
      }
      ok(rankScopesChecked8 === TCH_FACING_8.length * 2,
        `G45-8: §4 expected to sweep ${TCH_FACING_8.length * 2} teacher-facing localized consumers, swept ${rankScopesChecked8}`);

      /* §5 portal/admin role separation (falsifying mutation: M45-04 retarget a portal link to
       * teacher-performance). The admin performance board must never be referenced from a
       * teacher-portal page, an admin page must never render the portal shell, and a portal page
       * must never render the admin nav rail. */
      let roleScopesChecked8 = 0;
      for (const b of PORTAL_SCOPES_8) for (const suffix of ['', '.en']) {
        const h = read8(b, suffix);
        ok(!/teacher-performance/.test(h),
          `G45-8: §5 teacher-portal page ${b}${suffix}.html references the admin-only teacher-performance board (FR-041)`);
        ok(!/class="app-shell|nav-rail|nav-panel/.test(h),
          `G45-8: §5 teacher-portal page ${b}${suffix}.html carries ADMIN shell markup (.app-shell/.nav-rail/.nav-panel) — role leak`);
        roleScopesChecked8 += 1;
      }
      for (const b of ADMIN_SCOPES_8) for (const suffix of ['', '.en']) {
        const h = read8(b, suffix);
        ok(!/class="portal-shell/.test(h),
          `G45-8: §5 admin Teacher scope ${b}${suffix}.html is rendered in the portal shell — self/admin identity confusion (FR-040)`);
        roleScopesChecked8 += 1;
      }
      ok(roleScopesChecked8 === TCH_SCOPES_8.length * 2,
        `G45-8: §5 expected to census ${TCH_SCOPES_8.length * 2} Teacher localized consumers for role separation, censused ${roleScopesChecked8}`);

      /* §6 absence-integrity (FR-020): teacherAbsent and studentAbsent labels must stay distinct
       * at the AUTHORED source. G45-1 already pairs the trn sources across ar/en; this section
       * re-asserts the same invariant inside this consolidated census so a G45-8 failure names the
       * concept (teacher vs student absence), the locale, and the exact shared label in one line —
       * the labels only legitimately exist in the trn namespace (the prt namespace has no absence
       * strings: teacher absence is masked roster privacy on the roster page, not a label). The
       * non-zero count guard keeps the check from passing vacuously should the keys be renamed. */
      let absencePairsChecked8 = 0;
      for (const f of ['ar.trn.js', 'en.trn.js']) {
        const p = require('path').join(__dirname, '../../src/locales', f);
        ok(fs.existsSync(p), `G45-8: §6 locale source ${f} is missing — the absence census has no target`);
        const s = fs.readFileSync(p, 'utf8');
        const tVals = [...s.matchAll(/teacherAbsent:\s*'([^']*)'/g)].map((m) => m[1]);
        const sVals = [...s.matchAll(/studentAbsent:\s*'([^']*)'/g)].map((m) => m[1]);
        ok(tVals.length === sVals.length && tVals.length >= 3,
          `G45-8: §6 ${f} teacherAbsent/studentAbsent are defined an unequal or too-few number of times (${tVals.length} vs ${sVals.length}) — the absence census must never pass vacuously`);
        for (let i = 0; i < Math.min(tVals.length, sVals.length); i += 1) {
          ok(tVals[i] !== sVals[i],
            `G45-8: §6 ${f} teacherAbsent ("${tVals[i]}") and studentAbsent ("${sVals[i]}") share the identical label — the two absence concepts are conflated (FR-020)`);
          absencePairsChecked8 += 1;
        }
      }

      /* §7 locale key stub/parity — no raw dotted i18n key may reach the generated markup, and
       * every Teacher-namespace key present in one locale must resolve to a real string in the
       * other. G45-3 compares the two namespace SETS; this section additionally rejects empty
       * stubs and placeholder values so a mirrored `""` cannot masquerade as parity. */
      const flat8 = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
        (v && typeof v === 'object' && !Array.isArray(v)) ? flat8(v, p + k + '.') : [[p + k, v]]);
      for (const ns of ['prt', 'trn']) {
        const ar8 = (await import(`../../src/locales/ar.${ns}.js`)).default;
        const en8 = (await import(`../../src/locales/en.${ns}.js`)).default;
        const arFlat8 = new Map(flat8(ar8));
        const enFlat8 = new Map(flat8(en8));
        ok(arFlat8.size > 0 && enFlat8.size > 0, `G45-8: §7 locale namespace ${ns} loaded no keys — the census must not pass vacuously`);
        for (const [k, v] of arFlat8) {
          const mirror = enFlat8.get(k);
          ok(typeof mirror === 'string' && mirror.trim() !== '' && String(v).trim() !== '',
            `G45-8: §7 stub/empty i18n value at "${k}" — ar="${String(v).slice(0, 24)}" en="${String(mirror).slice(0, 24)}" (a mirrored stub is not parity)`);
        }
        for (const [k] of enFlat8) {
          ok(arFlat8.has(k), `G45-8: §7 en.${ns}.js key "${k}" has no AR counterpart — raw-key risk`);
        }
      }
      // rendered-DOM raw-key sweep across every Teacher consumer in both locales — visible text
      // only (innerText-style): attribute-carried key handles such as data-reason-key="trn.reason.assign"
      // are resolved by enhance.js at runtime and are legitimate; a raw key is a defect only when it
      // reaches the user as a visible string. The sweep anchors on the prt/trn/adm namespaces, which
      // never legitimately appear as visible prose.
      let rawKeyConsumers8 = 0;
      for (const b of TCH_SCOPES_8) for (const suffix of ['', '.en']) {
        const bodyText8 = stripTags8(bodyOfFile8({ base: b, suffix }));
        const rawKey = bodyText8.match(/\b(?:prt|trn|adm)\.[a-z]\w*(?:\.[a-z]\w*)+\b/);
        ok(!rawKey, `G45-8: §7 raw i18n key "${rawKey && rawKey[0]}" rendered as visible text on Teacher consumer ${b}${suffix}.html (FR-052)`);
        rawKeyConsumers8 += 1;
      }
      ok(rawKeyConsumers8 === TCH_SCOPES_8.length * 2,
        `G45-8: §7 expected to sweep ${TCH_SCOPES_8.length * 2} Teacher consumers for raw keys, swept ${rawKeyConsumers8}`);
    }

    // ===== Spec 040 — nav.config SOURCE audit (the one thing the DOM-only tests cannot reach) =====
    // The six settings items are the LAST planned items in the product. Assert against the SOURCE that
    // they carry real routes, that NOTHING anywhere is still `planned`, that exactly one honest lock
    // survives, and that FUTURE_ROUTES stays empty (a promoted item carries a real route, never a
    // documented-future one).
    const SIX_ROUTES = {
      settingsGeneral: 'settings.html#view=general',
      settingsIntegrations: 'settings.html#view=integrations',
      settingsCustomization: 'settings.html#view=customization',
      settingsNotifications: 'settings.html#view=notifications',
      settingsSecurity: 'settings.html#view=security',
      settingsUsers: 'settings.html#view=users',
    };
    for (const [id, route] of Object.entries(SIX_ROUTES)) {
      const it = byId('settings', id);
      ok(it.status === 'implemented', `nav.config: ${id} must be implemented after Spec 040, got ${it.status}`);
      ok(it.route === route, `nav.config: ${id} route must be ${route}, got ${it.route}`);
    }
    const allItems = navSrc.NAV_CATEGORIES.flatMap((c) => [...c.items, ...(c.sections || []).flatMap((s) => s.items)]);
    const stillPlanned = allItems.filter((i) => i.status === 'planned');
    ok(stillPlanned.length === 0, `nav.config: Spec 040 — ZERO nav items may remain planned, got ${stillPlanned.length} (${stillPlanned.map((i) => i.id).join(', ')})`);
    const locks = allItems.filter((i) => i.status === 'disabled');
    ok(locks.length === 1 && locks[0].id === 'classSalaryReport', `nav.config: exactly ONE honest lock must remain (classSalaryReport), got ${locks.map((i) => i.id).join(', ') || 'none'}`);
    ok(Object.keys(fr).length === 0, `nav.config: FUTURE_ROUTES must stay empty after Spec 040, got ${JSON.stringify(fr)}`);
    ok(navSrc.NAV_CATEGORIES.find((c) => c.id === 'settings').items.length === 7, 'nav.config: the settings category must keep exactly 7 items');
    ok(allItems.length === 50, `nav.config: the admin menu must stay 50 items, got ${allItems.length}`);
  }

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
    ok(pub.length === 115, `route freeze: public/ must hold exactly 115 HTML pages (57×2+index; Spec 035 +2 = schedule-search pair), got ${pub.length}`);
    ok(pub.includes('index.html'), 'route freeze: index.html missing');
    for (const b of PAGES) {
      ok(pub.includes(`${b}.html`) && pub.includes(`${b}.en.html`), `route freeze: ${b} is missing a language mirror`);
    }
  }

  // ============================================================================================
  // ===== Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching: G1–G14 + freeze =====
  // Additive privacy guards (G5 = the declared 2-line child-view supersession above; G9/G10 are the
  // existing per-page external-host + g32 credential censuses, unchanged). Each census reads the BUILT
  // public/*.html (+ src where noted) and accumulates into fails[] via ok(); body-scoped censuses read
  // the #page-body region so the shared shell/sidebar is excluded. Every guarantee ships a paired
  // falsifying mutation (contracts/mutation-protocol-plan.md). A required target FAILS loudly.
  // ============================================================================================
  {
    const pubDir = path.join(__dirname, '../../public');
    const srcDir = path.join(__dirname, '../../src');
    const files = fs.readdirSync(pubDir).filter((f) => f.endsWith('.html'));
    const H = {}; for (const f of files) H[f] = fs.readFileSync(path.join(pubDir, f), 'utf8');
    const readSrc = (rel) => fs.readFileSync(path.join(srcDir, rel), 'utf8');
    const bodyOf = (h) => { const i = h.indexOf('id="page-body"'); const j = h.indexOf('</main>', i); if (i < 0 || j < 0) throw new Error('Spec 043: required #page-body region is missing'); return h.slice(i, j); };
    const renderedScope = (f) => f === 'index.html' ? H[f] : bodyOf(H[f]);
    const elementsWith = (h, attr) => [...h.matchAll(new RegExp(`<([a-z][\\w-]*)\\b(?=[^>]*${attr})[^>]*>[\\s\\S]*?<\\/\\1>`, 'gi'))].map((m) => m[0]);
    const baseOf = (f) => f.replace(/\.en\.html$/, '').replace(/\.html$/, '');
    const PORTAL_BASES = new Set(['portals', 'student-portal', 'family-portal', 'teacher-portal', 'family-child',
      'student-schedule', 'student-homework', 'student-materials', 'student-progress', 'student-history', 'student-profile',
      'family-children', 'family-schedule', 'family-progress', 'family-billing', 'family-requests', 'family-materials', 'family-profile',
      'teacher-schedule', 'teacher-students', 'teacher-outcomes', 'teacher-tasks', 'teacher-reports', 'teacher-profile', 'teacher-library']);
    const ADMIN_BASES = new Set(PAGES.filter((b) => !PORTAL_BASES.has(b)));
    const isPortal = (f) => PORTAL_BASES.has(baseOf(f));
    const isTeacherBody = (f) => { const b = baseOf(f); return b === 'teacher' || (b.startsWith('teacher-') && PORTAL_BASES.has(b)); };
    const isFamilyBody = (f) => { const b = baseOf(f); return b === 'family-portal' || (b.startsWith('family-') && PORTAL_BASES.has(b)); };

    // ---- G7/G8 (strengthening): sitewide real-PII + live WhatsApp-invite census (broadens smoke:1287) ----
    const PII_RE = /01015264856|أحمد محمد|chat\.whatsapp\.com|201508604112|afaaqonline1|01154859653|441200480244|201278910727|eslammekky|ui-avatars|abod11|msadeqx9|aboda155502|alaashapan1996/;
    { const hit = files.filter((f) => PII_RE.test(H[f]));
      ok(hit.length === 0, `G7/G8: real crawl PII / live WhatsApp invite token in built page(s): ${hit.join(', ')}`); }

    // ---- G10 (additive, strengthening): no raw PAN / card number (13–19 consecutive digits, or 4-4-4-4
    // format) sitewide. The existing per-page g32 census (smoke:1406-1412, pw/file/canvas===0, byte-verbatim
    // and unrelaxed) stays the primary credential guard; this is an additive card-number census. ----
    { const bad = files.filter((f) => /\b\d{13,19}\b|\b\d{4}[ -]\d{4}[ -]\d{4}[ -]\d{4}\b/.test(H[f]));
      ok(bad.length === 0, `G10: a raw PAN / card-number pattern appears in built page(s): ${bad.join(', ')}`); }

    // ---- G1: teacher bodies carry no guardian/student contact VALUE (the teacher's own e-mail excluded) ----
    const OWN_TEACHER_EMAILS = new Set(['sara@academy.example', 'name@example.com']);
    { const bad = [];
      for (const f of files) if (isTeacherBody(f)) {
        const b = bodyOf(H[f]);
        const phones = (b.match(/\b\d{9,}\b/g) || []);
        const emails = (b.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).filter((e) => !OWN_TEACHER_EMAILS.has(e));
        const guardian = /parent phone|parent e-?mail|guardian phone|guardian e-?mail|هاتف\s*ولي|بريد\s*ولي/i.test(b);
        if (phones.length || emails.length || guardian) bad.push(`${f}(phone:${phones.length},email:${emails.length},guardian:${guardian})`);
      }
      ok(bad.length === 0, `G1: a teacher body contains guardian/student contact value: ${bad.join(', ')}`); }

    // ---- G2: teacher fixtures carry no phone/e-mail/address/country/locality, no Left/Acquired ----
    { const src = readSrc('js/fixtures/teachers.js') + readSrc('js/fixtures/teacher-management.js');
      const contactField = /\b(phone|email|address|country|locality|city)\s*:/i.test(src);
      const leftAcq = /left\s*students|acquired\s*students/i.test(src);
      ok(!contactField && !leftAcq, `G2: teacher fixture carries a contact/locality/Left-Acquired field (contact:${contactField}, leftAcq:${leftAcq})`); }

    // ---- G3: teacher-unreachable — no teacher-facing file references the parent-contact keys; not on any teacher body ----
    { const teacherSrc = readSrc('js/pages/teacher.js') + readSrc('js/pages/teacher-profile.js') + readSrc('js/fixtures/teacher-management.js') + readSrc('js/fixtures/teachers.js');
      const srcLeak = /adm\.staff\.perm\.g\.parents|adm\.staff\.perm\.i\.(viewPhone|viewEmail|exportContacts|approvedUse|revealMasked)|\bPERM_GROUPS\b/.test(teacherSrc);
      const bodyLeak = files.filter((f) => isTeacherBody(f) && /تواصل أولياء الأمور|Parent contacts|عرض هاتف وليّ الأمر|View guardian phone/.test(bodyOf(H[f])));
      ok(!srcLeak && bodyLeak.length === 0, `G3: parent-contact registry reachable by a teacher surface (srcLeak:${srcLeak}, body:${bodyLeak.join(',')})`); }

    // ---- G11: parent-contact rows deny-by-default (exactly 5, all granted:false) ----
    { const src = readSrc('js/fixtures/staff-management.js');
      const grp = (src.match(/adm\.staff\.perm\.g\.parents[\s\S]*?\]\s*\}/) || [''])[0];
      const flags = [...grp.matchAll(/granted:\s*(true|false)/g)].map((m) => m[1]);
      ok(flags.length === 5 && flags.every((v) => v === 'false'), `G11: parent-contact group must be exactly 5 deny-by-default rows, got ${flags.length} [${flags.join(',')}]`); }

    // ---- G4: family portal bodies carry only the active authored family (no non-fam1 guardian) ----
    { const OTHER_GUARDIANS = ['أم جوري', 'أم سارة', 'أم لمى', 'أبو خالد', 'أبو عبدالرحمن', 'أبو فيصل', 'أبو ياسر'];
      const bad = [];
      for (const f of files) if (isFamilyBody(f)) { const b = bodyOf(H[f]);
        for (const g of OTHER_GUARDIANS) if (b.includes(g)) bad.push(`${f}:${g}`); }
      ok(bad.length === 0, `G4: a family portal body shows a non-fam1 guardian identity: ${bad.join(', ')}`); }

    // ---- G6: portal bodies contain no admin-base link (sanctioned exception: portals.html -> dashboard.html) ----
    { const bad = [];
      for (const f of files) if (isPortal(f)) { const b = bodyOf(H[f]);
        const hrefs = [...b.matchAll(/href="([a-z][a-z0-9-]*)\.html/g)].map((m) => m[1]);
        for (const h of hrefs) { if (!ADMIN_BASES.has(h)) continue; if (baseOf(f) === 'portals' && h === 'dashboard') continue; bad.push(`${f}->${h}`); } }
      ok(bad.length === 0, `G6: a portal body links to an admin base: ${bad.join(', ')}`); }

    // ---- G13: no minor-identifying query param in any built href (#view=/#child= hashes allowed) ----
    { const bad = [];
      for (const f of files) { const hrefs = [...H[f].matchAll(/href="([^"]*\?[^"]*)"/g)].map((m) => m[1]);
        for (const h of hrefs) if (/student_name=|student_id=|child_name=|child_id=|[?&](student|child)=/i.test(h)) bad.push(`${f}:${h}`); }
      ok(bad.length === 0, `G13: minor-identifying query param in href: ${bad.join(', ')}`); }

    // ---- G12: no certificate group-delivery option / recipient picker implying real delivery ----
    { const bad = [];
      for (const f of ['certificates.html', 'certificates.en.html']) if (H[f] && /value="group"|send\s*group|group\s*delivery|إرسال\s*لمجموعة|تسليم\s*جماعي/i.test(H[f])) bad.push(f);
      ok(bad.length === 0, `G12: a certificate group-delivery option is present: ${bad.join(', ')}`); }

    // ---- G14: current auth/enforcement claims are forbidden only in structured gate/authz contexts.
    // The historical staff activity value “signed in” is deliberately outside these selectors.
    { const FORBID = /\bauthorized\b|\bverified\b|محمي|مسجّل الدخول|\blogged in\b/i;
      const authzContext = (h) => [
        ...elementsWith(h, 'data-disabled-reason|data-reason-key'),
        ...elementsWith(h, 'data-toast|data-(?:authz|enforce)'),
        ...elementsWith(h, 'role=["\\\'](?:status|alert)["\\\']'),
        ...elementsWith(h, 'class=["\\\'][^"\\\']*(?:chip|status)[^"\\\']*["\\\']'),
      ].join('\n');
      const bad = files.filter((f) => FORBID.test(authzContext(renderedScope(f))));
      ok(bad.length === 0, `G14: fake current-auth claim in gate/authz context (authorized/verified/محمي/مسجّل الدخول/logged in): ${bad.join(', ')}`); }

    // ---- Teacher capability/notification policy census (C02-04/C02-05, MUT-TP): structure-only, pay-free ----
    { for (const f of ['teacher.html', 'teacher.en.html']) if (H[f]) {
        const b = bodyOf(H[f]);
        const tmpl = (b.match(/<template[^>]*data-preview="trn-policy"[\s\S]*?<\/template>/) || [''])[0];
        ok(tmpl.length > 0, `${f}: the trn-policy policy drawer template must be baked in the body`);
        ok((b.match(/data-drawer="trn-policy"/g) || []).length === 1, `${f}: trn-policy must have exactly one overview trigger`);
        ok((tmpl.match(/class="sheet-row"/g) || []).length === 7, `${f}: trn-policy must render exactly 4 capability + 3 notification rows`);
        ok((tmpl.match(/class="ic-title"/g) || []).length === 2, `${f}: trn-policy must render exactly academic + communication subheads`);
        ok((tmpl.match(/data-disabled-reason/g) || []).length === 1, `${f}: trn-policy must end in exactly one honest backend gate`);
        ok(!/\bsalary\b|\bsalaries\b|راتب|رواتب|\bpayout\b|hour[ -]?rate|student[ -]?rate|teacher[ -]?rate|\bEGP\b|\bSAR\b|currency/i.test(tmpl), `${f}: trn-policy must contain 0 pay/salary/rate token`);
        ok(!/<input|type="checkbox"|role="switch"|data-toggle/i.test(tmpl), `${f}: trn-policy must contain 0 input/value slot/toggle`);
        ok(!/parent phone|guardian|هاتف|بريد ولي|\bcountry\b|locality/i.test(tmpl), `${f}: trn-policy must contain 0 guardian-contact/locality token`);
      } }

    // ---- Class-(2) existing-safe freeze (C14-09 DST column absent; C15-01/18 no invented identity controls) ----
    { const tc = (H['time-converter.html'] || '') + (H['time-converter.en.html'] || '');
      ok(!/Affected Accounts|الحسابات المتأثرة/i.test(tc), 'freeze (C14-09): time-converter must not add an Affected-Accounts column'); }
    { const bad = files.filter((f) => /<form[^>]*action=["'][^"']*(login|signin|sign-in)/i.test(H[f]));
      ok(bad.length === 0, `freeze (C15-01): an invented login <form action> appeared: ${bad.join(', ')}`); }
    { const controls = (h) => [...h.matchAll(/<(?:a|button)\b[\s\S]*?<\/(?:a|button)>|<input\b[^>]*>/gi)].map((m) => m[0]).join('\n');
      const fakeImpersonation = /\b(?:login|sign)\s+as\b|\bimpersonat(?:e|ion)\b|تسجيل\s*الدخول\s*باسم|انتحال/i;
      const bad = files.filter((f) => fakeImpersonation.test(controls(renderedScope(f))));
      ok(bad.length === 0, `freeze (C12-19): a fake login-as/impersonation control appeared: ${bad.join(', ')}`); }
  }

  if (fails.length) { console.error('SMOKE FAILED:\n - ' + fails.join('\n - ')); process.exit(1); }
  console.log(`[smoke] PASS — ${PAGES.length * 2} page loads, no raw keys / external requests / dead buttons / unexplained disabled controls`);
  process.exit(0);
})();

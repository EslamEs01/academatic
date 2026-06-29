/* Smoke tests: no raw i18n keys · no external (CDN) requests · no dead buttons
 * (every control gives feedback) · disabled-with-reason · keyboard reachability.
 * Exits non-zero on any failure. */
const { chromium } = require('playwright');
const { PORT } = require('../../scripts/serve.cjs');

const BASE = `http://localhost:${PORT}`;
const PAGES = ['dashboard', 'reports', 'gallery', 'sessions', 'schedule', 'students', 'teachers', 'courses', 'settings',
  'families', 'add-family', 'family', 'student', 'attendance'];
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); };

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
      ok(info.focusables > 5, `${page}/${lang}: too few focusable elements (${info.focusables})`);
      ok(!info.hasAppMount, `${page}/${lang}: found a whole-page #app mount (must be static HTML-first)`);
      ok(info.hasShell, `${page}/${lang}: missing static shell/content`);
      ok(info.hasRail, `${page}/${lang}: missing slim icon rail (.nav-rail)`);
      ok(info.hasPanel, `${page}/${lang}: missing light nav panel (.nav-panel)`);
      // every product page marks exactly one active nav item; the dev gallery has none
      ok(info.activeNav === (page === 'gallery' ? 0 : 1), `${page}/${lang}: expected ${page === 'gallery' ? 0 : 1} active nav item, got ${info.activeNav}`);
      ok(info.deadNav === 0, `${page}/${lang}: ${info.deadNav} dead nav item(s) — anchor without route or planned/disabled button without a hook`);
      ok(info.railCats >= 6, `${page}/${lang}: expected ≥6 category tabs in the rail, got ${info.railCats}`);
      ok(info.visiblePanels === 1, `${page}/${lang}: expected exactly ONE category panel visible (not all links at once), got ${info.visiblePanels}`);
      // Spec 003: schedule + sessions carry baked List/Timetable content tabs; exactly one panel visible
      const hasTabs = page === 'schedule' || page === 'sessions';
      ok(!hasTabs || info.contentTabs >= 2, `${page}/${lang}: expected ≥2 content tabs (List/Timetable), got ${info.contentTabs}`);
      ok(!hasTabs || info.visibleTabpanels === 1, `${page}/${lang}: expected exactly ONE visible tabpanel, got ${info.visibleTabpanels}`);
      ok(page !== 'schedule' || info.hasTimetable, `${page}/${lang}: schedule is missing the baked timetable grid`);
      ok(info.absAssets.length === 0, `${page}/${lang}: non-relative asset paths ${JSON.stringify(info.absAssets)}`);
      ok(info.portals === 0, `${page}/${lang}: a future-role portal is rendered in the DOM`);

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
      await ctx.close();
    }
  }

  await browser.close();
  if (fails.length) { console.error('SMOKE FAILED:\n - ' + fails.join('\n - ')); process.exit(1); }
  console.log(`[smoke] PASS — ${PAGES.length * 2} page loads, no raw keys / external requests / dead buttons / unexplained disabled controls`);
  process.exit(0);
})();

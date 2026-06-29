/* Smoke tests: no raw i18n keys · no external (CDN) requests · no dead buttons
 * (every control gives feedback) · disabled-with-reason · keyboard reachability.
 * Exits non-zero on any failure. */
const { chromium } = require('playwright');
const { PORT } = require('../../scripts/serve.cjs');

const BASE = `http://localhost:${PORT}`;
const PAGES = ['dashboard', 'reports', 'gallery', 'sessions', 'schedule', 'students', 'teachers', 'courses', 'settings'];
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
        // GitHub-Pages: asset refs must be relative
        const absAssets = [...document.querySelectorAll('link[href],script[src]')]
          .map((n) => n.getAttribute('href') || n.getAttribute('src'))
          .filter((u) => u && (u.startsWith('/') || /^https?:/.test(u)));
        return { raw, disabledNoReason, focusables, hasAppMount, hasShell, hasRail, hasPanel, activeNav, deadNav, railCats, visiblePanels, absAssets };
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
      await ctx.close();
    }
  }

  await browser.close();
  if (fails.length) { console.error('SMOKE FAILED:\n - ' + fails.join('\n - ')); process.exit(1); }
  console.log(`[smoke] PASS — ${PAGES.length * 2} page loads, no raw keys / external requests / dead buttons / unexplained disabled controls`);
  process.exit(0);
})();

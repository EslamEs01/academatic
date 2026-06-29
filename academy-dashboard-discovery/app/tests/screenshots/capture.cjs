/* Capture the screenshot acceptance matrix with Playwright (Chromium).
 * Usage: node tests/screenshots/capture.cjs [filterSubstring]
 * Output: app/screenshots/<page>__<lang>__<theme>__<viewport>.png
 */
const path = require('path');
const { chromium } = require('playwright');
const { PORT } = require('../../scripts/serve.cjs'); // starts the static server

const BASE = `http://localhost:${PORT}`;
const OUT = path.resolve(__dirname, '../../screenshots');

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

const MATRIX = [
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'dashboard', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'dashboard', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'gallery', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'gallery', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'tablet' },
  // Spec 002 — admin operation pages
  { page: 'sessions', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'sessions', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'sessions', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'schedule', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'courses', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'sessions', lang: 'ar', theme: 'light', vp: 'mobile' },
  // Spec 003 — Timetable & Scheduling
  { page: 'schedule', lang: 'ar', theme: 'light', vp: 'desktop', view: 'list', variant: 'list' },
  { page: 'schedule', lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', variant: 'timetable' },
  { page: 'schedule', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'timetable', variant: 'timetable' },
  { page: 'schedule', lang: 'en', theme: 'light', vp: 'desktop', view: 'timetable', variant: 'timetable' },
  { page: 'schedule', lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', teacher: 1, variant: 'teacher' },
  { page: 'schedule', lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', sheet: true, variant: 'drawer' },
  { page: 'schedule', lang: 'ar', theme: 'light', vp: 'mobile', view: 'timetable', variant: 'agenda' },
  { page: 'schedule', lang: 'ar', theme: 'light', vp: 'tablet', view: 'timetable', variant: 'timetable' },
  { page: 'sessions', lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', variant: 'timetable' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'schedule-impact' },
  // new shell: collapsed icon-rail (light panel hidden) — proves the rail-only state
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', rail: '1' },
  // mobile off-canvas drawer OPEN — proves the full-IA panel inside the drawer
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'mobile', drawer: true },
  // category switching — clicking a rail category shows ONLY that category's panel
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', cat: 'families' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', cat: 'teachers' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', cat: 'reports' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', cat: 'admin' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', cat: 'settings' },
  { page: 'dashboard', lang: 'en', theme: 'light', vp: 'desktop', cat: 'families' },
];

(async () => {
  const filter = process.argv[2];
  const jobs = MATRIX.filter((s) => !filter || `${s.page}-${s.lang}-${s.theme}-${s.vp}`.includes(filter));
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const results = [];

  for (const s of jobs) {
    const ctx = await browser.newContext({
      viewport: VIEWPORTS[s.vp],
      deviceScaleFactor: s.vp === 'mobile' ? 2 : 1.5,
    });
    await ctx.addInitScript(({ theme, rail }) => { localStorage.setItem('academy.theme', theme); if (rail) localStorage.setItem('academy.rail', rail); }, { theme: s.theme, rail: s.rail });

    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

    const file = s.lang === 'en' ? `${s.page}.en.html` : `${s.page}.html`;
    await page.goto(`${BASE}/${file}${s.view ? '#view=' + s.view : ''}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
      const b = document.querySelector('#page-body');
      return b && b.children.length > 0;
    }, { timeout: 8000 }).catch(() => {});
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
    await page.waitForTimeout(350);
    if (s.drawer) { await page.click('[data-action="open-drawer"]').catch(() => {}); await page.waitForTimeout(380); }
    if (s.cat) { await page.click(`[data-nav-category="${s.cat}"]`).catch(() => {}); await page.waitForTimeout(260); }
    // Spec 003 content tabs / teacher lens / appointment drawer
    if (s.tab) { await page.click(`[data-tab="${s.tab}"]`).catch(() => {}); await page.waitForTimeout(220); }
    if (s.teacher != null) { await page.selectOption('select[data-filter="teacher"]', { index: s.teacher }).catch(() => {}); await page.waitForTimeout(220); }
    if (s.sheet) { await page.click('[data-tabpanel="timetable"]:not([hidden]) .tt-block[data-drawer]').catch(() => {}); await page.waitForTimeout(420); }

    const name = `${s.page}__${s.lang}__${s.theme}__${s.vp}${s.variant ? '__' + s.variant : ''}${s.rail ? '__rail' : ''}${s.drawer ? '__drawer' : ''}${s.cat ? '__cat-' + s.cat : ''}.png`;
    await page.screenshot({ path: path.join(OUT, name), fullPage: !s.drawer && !s.sheet });
    results.push({ name, errors });
    if (errors.length) console.log(`  ⚠ ${name} console errors:\n   - ${errors.slice(0, 6).join('\n   - ')}`);
    else console.log(`  ✓ ${name}`);
    await ctx.close();
  }

  await browser.close();
  const withErrors = results.filter((r) => r.errors.length).length;
  console.log(`\n[screenshots] ${results.length} captured · ${withErrors} with console errors`);
  process.exit(0);
})();

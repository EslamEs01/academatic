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
    await ctx.addInitScript((theme) => { localStorage.setItem('academy.theme', theme); }, s.theme);

    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

    const file = s.lang === 'en' ? `${s.page}.en.html` : `${s.page}.html`;
    await page.goto(`${BASE}/${file}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
      const b = document.querySelector('#page-body');
      return b && b.children.length > 0;
    }, { timeout: 8000 }).catch(() => {});
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
    await page.waitForTimeout(350);

    const name = `${s.page}__${s.lang}__${s.theme}__${s.vp}.png`;
    await page.screenshot({ path: path.join(OUT, name), fullPage: true });
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

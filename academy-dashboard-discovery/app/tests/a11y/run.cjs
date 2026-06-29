/* Accessibility tests via axe-core. Fails on any CRITICAL violation; reports
 * SERIOUS as warnings. Runs each page in AR (light + dark) and EN. */
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const { PORT } = require('../../scripts/serve.cjs');

const BASE = `http://localhost:${PORT}`;
const MATRIX = [
  { page: 'dashboard', lang: 'ar', theme: 'light' },
  { page: 'dashboard', lang: 'ar', theme: 'dark' },
  { page: 'dashboard', lang: 'en', theme: 'light' },
  { page: 'reports', lang: 'ar', theme: 'light' },
  { page: 'gallery', lang: 'ar', theme: 'light' },
  { page: 'gallery', lang: 'ar', theme: 'dark' },
];

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  let critical = 0, serious = 0;

  for (const s of MATRIX) {
    const ctx = await browser.newContext();
    await ctx.addInitScript((theme) => { localStorage.setItem('academy.theme', theme); }, s.theme);
    const p = await ctx.newPage();
    const file = s.lang === 'en' ? `${s.page}.en.html` : `${s.page}.html`;
    await p.goto(`${BASE}/${file}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(250);

    const { violations } = await new AxeBuilder({ page: p })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const crit = violations.filter((v) => v.impact === 'critical');
    const ser = violations.filter((v) => v.impact === 'serious');
    critical += crit.length; serious += ser.length;
    const tag = `${s.page}/${s.lang}/${s.theme}`;
    if (crit.length) console.error(`  ✗ ${tag}: ${crit.length} CRITICAL — ${crit.map((v) => v.id).join(', ')}`);
    if (ser.length) console.warn(`  ⚠ ${tag}: ${ser.length} serious — ${ser.map((v) => v.id).join(', ')}`);
    if (!crit.length && !ser.length) console.log(`  ✓ ${tag}: clean`);
    await ctx.close();
  }

  await browser.close();
  console.log(`\n[a11y] critical=${critical} serious=${serious}`);
  if (critical > 0) { console.error('A11Y FAILED: critical violations present'); process.exit(1); }
  process.exit(0);
})();

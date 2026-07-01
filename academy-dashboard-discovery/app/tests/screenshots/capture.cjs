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
  { page: 'reports', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'reports', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', reportAction: true, variant: 'action' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', reportFilter: true, variant: 'filter' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'mobile' },
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
  // Spec 004 — Families & Student Academic Profiles (acceptance matrix, min 13)
  { page: 'families', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'families', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'families', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'families', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', view: 'students', variant: 'students' },
  { page: 'add-family', lang: 'ar', theme: 'light', vp: 'desktop', step: 'children', variant: 'wizard-step3' },
  { page: 'students', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'results', variant: 'results' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'evaluation', variant: 'evaluation' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'family-impact' },
  // Spec 005 — Attendance & Session Outcomes (acceptance matrix, 11 frames)
  { page: 'attendance', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'attendance', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'attendance', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'attendance', lang: 'ar', theme: 'light', vp: 'desktop', outcomeDrawer: true, variant: 'drawer' },
  { page: 'attendance', lang: 'ar', theme: 'light', vp: 'desktop', confirm: true, variant: 'confirm' },
  { page: 'sessions', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'outcome' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'attendance' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'attendance' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'outcome-impact' },
  { page: 'attendance', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'attendance', lang: 'ar', theme: 'light', vp: 'mobile', outcomeDrawer: true, variant: 'drawer' },
  // Spec 006 — courses, groups & learning paths (acceptance matrix, 15 frames)
  { page: 'courses', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'courses', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'courses', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'course', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'course', lang: 'ar', theme: 'light', vp: 'desktop', view: 'learningPath', variant: 'learning-path' },
  { page: 'groups', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'groups', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'group', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'group', lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', variant: 'timetable' },
  { page: 'group', lang: 'ar', theme: 'light', vp: 'desktop', view: 'sessions', variant: 'outcomes' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'courses', variant: 'course-links' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'course-group' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'groups-impact' },
  { page: 'groups', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'group', lang: 'ar', theme: 'light', vp: 'mobile' },
  // Spec 007 — Teacher Performance & Academic KPIs (acceptance matrix, 12 frames)
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teachers', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'teachers', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', variant: 'timetable' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', view: 'sessions-outcomes', variant: 'outcomes' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', teacherConfirm: true, variant: 'confirm' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', view: 'students', variant: 'students' },
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'teachers-followup' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'mobile' },
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
    const hash = s.step ? '#step=' + s.step : (s.view ? '#view=' + s.view : '');
    await page.goto(`${BASE}/${file}${hash}`, { waitUntil: 'networkidle' });
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
    // Spec 005 — open the canonical outcome drawer (kebab → view), optionally a confirm modal
    if (s.outcomeDrawer || s.confirm) {
      const rowSel = s.confirm ? '#attendance-list .outcome-row:nth-child(8) [data-row-menu]' : '#attendance-list .outcome-row:not([hidden]) [data-row-menu]';
      await page.click(rowSel).catch(() => {}); await page.waitForTimeout(240);
      await page.click('.popover [data-drawer]').catch(() => {}); await page.waitForTimeout(460);
      if (s.confirm) { await page.click('.drawer.sheet [data-confirm]').catch(() => {}); await page.waitForTimeout(340); }
    }
    // Spec 007 — open the teacher banner Notify-family confirm modal
    if (s.teacherConfirm) { await page.click('.profile-banner [data-confirm]').catch(() => {}); await page.waitForTimeout(380); }
    // Spec 008 — reports: Schedule confirm modal (demo) / category-card filter narrowed
    if (s.reportAction) { await page.click('.report-actions [data-confirm]').catch(() => {}); await page.waitForTimeout(360); }
    if (s.reportFilter) { await page.selectOption('select[data-filter="area"]', 'attendance').catch(() => {}); await page.waitForTimeout(220); }

    const name = `${s.page}__${s.lang}__${s.theme}__${s.vp}${s.variant ? '__' + s.variant : ''}${s.rail ? '__rail' : ''}${s.drawer ? '__drawer' : ''}${s.cat ? '__cat-' + s.cat : ''}.png`;
    await page.screenshot({ path: path.join(OUT, name), fullPage: !s.drawer && !s.sheet && !s.outcomeDrawer && !s.confirm && !s.teacherConfirm && !s.reportAction });
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

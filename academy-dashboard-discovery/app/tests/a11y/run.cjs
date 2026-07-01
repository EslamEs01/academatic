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
  { page: 'reports', lang: 'ar', theme: 'dark' },
  { page: 'reports', lang: 'en', theme: 'light' },
  { page: 'gallery', lang: 'ar', theme: 'light' },
  { page: 'gallery', lang: 'ar', theme: 'dark' },
  // Spec 002 pages
  { page: 'sessions', lang: 'ar', theme: 'light' },
  { page: 'sessions', lang: 'ar', theme: 'dark' },
  { page: 'sessions', lang: 'en', theme: 'light' },
  { page: 'schedule', lang: 'ar', theme: 'light' },
  { page: 'students', lang: 'ar', theme: 'light' },
  { page: 'teachers', lang: 'ar', theme: 'light' },
  { page: 'courses', lang: 'ar', theme: 'light' },
  { page: 'settings', lang: 'ar', theme: 'light' },
  // Spec 003 — scan the VISIBLE timetable view (hash activates the Timetable tab on load)
  { page: 'schedule', lang: 'ar', theme: 'light', hash: '#view=timetable' },
  { page: 'schedule', lang: 'ar', theme: 'dark', hash: '#view=timetable' },
  { page: 'schedule', lang: 'en', theme: 'light', hash: '#view=timetable' },
  { page: 'sessions', lang: 'ar', theme: 'light', hash: '#view=timetable' },
  // new shell coverage: dashboard dark + collapsed-rail are checked via dashboard rows above
  { page: 'dashboard', lang: 'en', theme: 'dark' },
  // Spec 004 — families & student academic profiles (AR light + dark + EN + tab/step states)
  { page: 'families', lang: 'ar', theme: 'light' },
  { page: 'families', lang: 'ar', theme: 'dark' },
  { page: 'families', lang: 'en', theme: 'light' },
  { page: 'family', lang: 'ar', theme: 'light' },
  { page: 'family', lang: 'ar', theme: 'light', hash: '#view=students' },
  { page: 'add-family', lang: 'ar', theme: 'light' },
  { page: 'add-family', lang: 'ar', theme: 'light', hash: '#step=children' },
  { page: 'students', lang: 'ar', theme: 'dark' },
  { page: 'student', lang: 'ar', theme: 'light' },
  { page: 'student', lang: 'ar', theme: 'dark' },
  { page: 'student', lang: 'ar', theme: 'light', hash: '#view=results' },
  { page: 'student', lang: 'ar', theme: 'light', hash: '#view=evaluation' },
  { page: 'student', lang: 'en', theme: 'light' },
  // Spec 005 — attendance & session outcomes (AR light + dark + EN)
  { page: 'attendance', lang: 'ar', theme: 'light' },
  { page: 'attendance', lang: 'ar', theme: 'dark' },
  { page: 'attendance', lang: 'en', theme: 'light' },
  // Spec 006 — courses (enriched) + groups + course/group profiles
  { page: 'courses', lang: 'ar', theme: 'dark' },
  { page: 'courses', lang: 'en', theme: 'light' },
  { page: 'groups', lang: 'ar', theme: 'light' },
  { page: 'groups', lang: 'ar', theme: 'dark' },
  { page: 'groups', lang: 'en', theme: 'light' },
  { page: 'course', lang: 'ar', theme: 'light' },
  { page: 'course', lang: 'ar', theme: 'light', hash: '#view=learningPath' },
  { page: 'course', lang: 'en', theme: 'light' },
  { page: 'group', lang: 'ar', theme: 'light' },
  { page: 'group', lang: 'ar', theme: 'light', hash: '#view=sessions' },
  // Spec 007 — teacher performance & academic KPIs (teachers enriched + teacher profile + board)
  { page: 'teachers', lang: 'ar', theme: 'dark' },
  { page: 'teachers', lang: 'en', theme: 'light' },
  { page: 'teacher', lang: 'ar', theme: 'light' },
  { page: 'teacher', lang: 'ar', theme: 'light', hash: '#view=sessions-outcomes' },
  { page: 'teacher', lang: 'en', theme: 'light' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light' },
  { page: 'teacher-performance', lang: 'ar', theme: 'dark' },
  { page: 'teacher-performance', lang: 'en', theme: 'light' },
];

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  let critical = 0, serious = 0;

  for (const s of MATRIX) {
    const ctx = await browser.newContext();
    await ctx.addInitScript((theme) => { localStorage.setItem('academy.theme', theme); }, s.theme);
    const p = await ctx.newPage();
    const file = s.lang === 'en' ? `${s.page}.en.html` : `${s.page}.html`;
    await p.goto(`${BASE}/${file}${s.hash || ''}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(250);

    const { violations } = await new AxeBuilder({ page: p })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const crit = violations.filter((v) => v.impact === 'critical');
    const ser = violations.filter((v) => v.impact === 'serious');
    critical += crit.length; serious += ser.length;
    const tag = `${s.page}/${s.lang}/${s.theme}${s.hash ? ' ' + s.hash : ''}`;
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

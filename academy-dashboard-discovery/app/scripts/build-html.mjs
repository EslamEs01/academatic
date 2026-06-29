/* Static-site generator. Pre-renders each page (Arabic default + English) into
 * COMPLETE static HTML — the shipped .html files contain the full shell + page
 * markup (no runtime JS mount). Output → public/ with relative asset paths,
 * suitable for GitHub Pages / any static host / VS Code Live Server.
 *
 * Django mapping: each generated page maps to a Django template (e.g.
 * public/dashboard.html → templates/admin/dashboard.html); the shell/sidebar/
 * topbar markup extracts into partials; fixtures become template context. */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { applyLang, t, LANGS } from '../src/js/i18n.js';
import { shellMarkup } from '../src/js/components/shell-markup.js';
import { renderDashboard } from '../src/js/pages/dashboard.js';
import { renderReports } from '../src/js/pages/reports.js';
import { renderGallery } from '../src/js/pages/gallery.js';
import { renderSessions } from '../src/js/pages/sessions.js';
import { renderSchedule } from '../src/js/pages/schedule.js';
import { renderStudents } from '../src/js/pages/students.js';
import { renderTeachers } from '../src/js/pages/teachers.js';
import { renderCourses } from '../src/js/pages/courses.js';
import { renderSettings } from '../src/js/pages/settings.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT = resolve(ROOT, 'public');
mkdirSync(OUT, { recursive: true });

// clean stale pre-rendered pages so renamed/removed routes never linger in public/
// (assets in public/assets/ are managed by build:assets and left untouched)
for (const f of readdirSync(OUT)) {
  if (f.endsWith('.html')) rmSync(resolve(OUT, f));
}

const sprite = readFileSync(resolve(ROOT, 'src/icons/sprite.svg'), 'utf8');

const PAGES = [
  { base: 'dashboard', activeId: 'home', titleKey: 'topbar.title.dashboard', crumbKey: 'topbar.crumb.dashboard', render: renderDashboard },
  { base: 'reports', activeId: 'reports', titleKey: 'topbar.title.reports', crumbKey: 'topbar.crumb.reports', render: renderReports },
  { base: 'gallery', activeId: null, titleKey: 'topbar.title.gallery', crumbKey: 'topbar.crumb.gallery', render: renderGallery },
  { base: 'sessions', activeId: 'sessions', titleKey: 'topbar.title.sessions', crumbKey: 'topbar.crumb.sessions', render: renderSessions },
  { base: 'schedule', activeId: 'schedule', titleKey: 'topbar.title.schedule', crumbKey: 'topbar.crumb.schedule', render: renderSchedule },
  { base: 'students', activeId: 'students', titleKey: 'topbar.title.students', crumbKey: 'topbar.crumb.students', render: renderStudents },
  { base: 'teachers', activeId: 'teachers', titleKey: 'topbar.title.teachers', crumbKey: 'topbar.crumb.teachers', render: renderTeachers },
  { base: 'courses', activeId: 'courses', titleKey: 'topbar.title.courses', crumbKey: 'topbar.crumb.courses', render: renderCourses },
  { base: 'settings', activeId: 'settings', titleKey: 'topbar.title.settings', crumbKey: 'topbar.crumb.settings', render: renderSettings },
];

const THEME_SNIPPET = `(function(){try{var th=localStorage.getItem('academy.theme');if(th==='light'||th==='dark')document.documentElement.setAttribute('data-theme',th);}catch(e){}})();`;

function htmlDoc({ lang, dir, title, body }) {
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script>${THEME_SNIPPET}</script>
  <link rel="stylesheet" href="./assets/app.css" />
</head>
<body data-page-lang="${lang}">
  <a href="#page" class="sr-only">${t('common.skipToContent')}</a>
  ${sprite}
  ${body}
  <script type="module" src="./assets/js/enhance.js"></script>
</body>
</html>
`;
}

let count = 0;
for (const p of PAGES) {
  for (const lang of ['ar', 'en']) {
    applyLang(lang);
    const dir = LANGS[lang].dir;
    const title = `${t(p.titleKey)} · ${t('brand.name')}`;
    const body = shellMarkup({ activeId: p.activeId, titleKey: p.titleKey, crumbKey: p.crumbKey, bodyHTML: p.render() });
    const file = lang === 'en' ? `${p.base}.en.html` : `${p.base}.html`;
    writeFileSync(resolve(OUT, file), htmlDoc({ lang, dir, title, body }));
    count++;
  }
}

// landing redirect + GitHub Pages: disable Jekyll so _-prefixed paths are served
writeFileSync(resolve(OUT, 'index.html'),
  `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=./dashboard.html"><title>…</title></head>
<body><a href="./dashboard.html">لوحة التحكم</a></body></html>\n`);
writeFileSync(resolve(OUT, '.nojekyll'), '');

console.log(`[build:html] ${count} static pages → public/  (+ index.html, .nojekyll)`);

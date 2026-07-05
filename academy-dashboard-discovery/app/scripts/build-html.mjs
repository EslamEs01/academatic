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
import { renderFamilies } from '../src/js/pages/families.js';
import { renderFamily } from '../src/js/pages/family.js';
import { renderAddFamily } from '../src/js/pages/add-family.js';
import { renderStudent } from '../src/js/pages/student.js';
import { renderAttendance } from '../src/js/pages/attendance.js';
import { renderGroups } from '../src/js/pages/groups.js';
import { renderCourse } from '../src/js/pages/course.js';
import { renderGroup } from '../src/js/pages/group.js';
import { renderTeacher } from '../src/js/pages/teacher.js';
import { renderTeacherPerformance } from '../src/js/pages/teacher-performance.js';
import { renderFinance } from '../src/js/pages/finance.js';
// Spec 012 — role portal foundation (portal shell, not the admin shell)
import { portalShellMarkup } from '../src/js/components/portal-shell.js';
import { renderPortalsHub } from '../src/js/pages/portals.js';
import { renderStudentPortal } from '../src/js/pages/student-portal.js';
import { renderFamilyPortal } from '../src/js/pages/family-portal.js';
import { renderTeacherPortal } from '../src/js/pages/teacher-portal.js';
import { renderFamilyChild } from '../src/js/pages/family-child.js';
import { renderStudentSchedule } from '../src/js/pages/student-schedule.js';
import { renderStudentHomework } from '../src/js/pages/student-homework.js';
import { renderStudentMaterials } from '../src/js/pages/student-materials.js';
import { renderStudentProgress } from '../src/js/pages/student-progress.js';
import { renderStudentHistory } from '../src/js/pages/student-history.js';
import { renderStudentProfile } from '../src/js/pages/student-profile.js';
import { renderFamilyChildren } from '../src/js/pages/family-children.js';
import { renderFamilySchedule } from '../src/js/pages/family-schedule.js';
import { renderFamilyProgress } from '../src/js/pages/family-progress.js';
import { renderFamilyBilling } from '../src/js/pages/family-billing.js';
import { renderFamilyRequests } from '../src/js/pages/family-requests.js';
import { renderFamilyMaterials } from '../src/js/pages/family-materials.js';
import { renderFamilyProfile } from '../src/js/pages/family-profile.js';

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
  // Spec 004 — families & student academic profiles (family/student = profile templates, not nav items)
  { base: 'families', activeId: 'families', titleKey: 'topbar.title.families', crumbKey: 'topbar.crumb.families', render: renderFamilies },
  { base: 'add-family', activeId: 'addFamily', titleKey: 'topbar.title.addFamily', crumbKey: 'topbar.crumb.addFamily', render: renderAddFamily },
  { base: 'family', activeId: 'families', titleKey: 'topbar.title.family', crumbKey: 'topbar.crumb.family', render: renderFamily },
  { base: 'student', activeId: 'students', titleKey: 'topbar.title.student', crumbKey: 'topbar.crumb.student', render: renderStudent },
  // Spec 005 — attendance & session outcomes (control category)
  { base: 'attendance', activeId: 'attendance', titleKey: 'topbar.title.attendance', crumbKey: 'topbar.crumb.attendance', render: renderAttendance },
  // Spec 006 — courses, groups & learning paths (groups = promoted nav item; course/group = profile templates)
  { base: 'groups', activeId: 'groups', titleKey: 'topbar.title.groups', crumbKey: 'topbar.crumb.groups', render: renderGroups },
  { base: 'course', activeId: 'courses', titleKey: 'topbar.title.course', crumbKey: 'topbar.crumb.course', render: renderCourse },
  { base: 'group', activeId: 'groups', titleKey: 'topbar.title.group', crumbKey: 'topbar.crumb.group', render: renderGroup },
  // Spec 007 — teacher performance & academic KPIs (teacher = profile template; teacher-performance = promoted teacherKpi nav)
  { base: 'teacher', activeId: 'teachers', titleKey: 'topbar.title.teacher', crumbKey: 'topbar.crumb.teacher', render: renderTeacher },
  { base: 'teacher-performance', activeId: 'teacherKpi', titleKey: 'topbar.title.teacherPerf', crumbKey: 'topbar.crumb.teacherPerf', render: renderTeacherPerformance },
  // Spec 009 — finance, billing & payments shell
  { base: 'finance', activeId: 'finance', titleKey: 'topbar.title.finance', crumbKey: 'topbar.crumb.finance', render: renderFinance },
  // Spec 012 — role portal foundation (portal shell; NOT admin nav pages; hub = the documented demo entry)
  { base: 'portals', shell: 'portal', role: 'hub', activeId: null, titleKey: 'prt.title.hub', render: renderPortalsHub },
  { base: 'student-portal', shell: 'portal', role: 'student', personaKey: 'data.stud.a.name', activeId: null, titleKey: 'prt.title.student', render: renderStudentPortal },
  { base: 'family-portal', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: null, titleKey: 'prt.title.family', render: renderFamilyPortal },
  { base: 'teacher-portal', shell: 'portal', role: 'teacher', personaKey: 'data.t.sara', activeId: null, titleKey: 'prt.title.teacher', render: renderTeacherPortal },
  { base: 'family-child', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: null, titleKey: 'prt.title.familyChild', render: renderFamilyChild },
  { base: 'student-schedule', shell: 'portal', role: 'student', personaKey: 'data.stud.a.name', activeId: 'schedule', titleKey: 'prt.title.stuSchedule', render: renderStudentSchedule },
  { base: 'student-homework', shell: 'portal', role: 'student', personaKey: 'data.stud.a.name', activeId: 'homework', titleKey: 'prt.title.stuHomework', render: renderStudentHomework },
  { base: 'student-materials', shell: 'portal', role: 'student', personaKey: 'data.stud.a.name', activeId: 'materials', titleKey: 'prt.title.stuMaterials', render: renderStudentMaterials },
  { base: 'student-progress', shell: 'portal', role: 'student', personaKey: 'data.stud.a.name', activeId: 'progress', titleKey: 'prt.title.stuProgress', render: renderStudentProgress },
  { base: 'student-history', shell: 'portal', role: 'student', personaKey: 'data.stud.a.name', activeId: 'history', titleKey: 'prt.title.stuHistory', render: renderStudentHistory },
  { base: 'student-profile', shell: 'portal', role: 'student', personaKey: 'data.stud.a.name', activeId: 'profile', titleKey: 'prt.title.stuProfile', render: renderStudentProfile },
  { base: 'family-children', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: 'children', titleKey: 'prt.title.famChildren', render: renderFamilyChildren },
  { base: 'family-schedule', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: 'schedule', titleKey: 'prt.title.famSchedule', render: renderFamilySchedule },
  { base: 'family-progress', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: 'progress', titleKey: 'prt.title.famProgress', render: renderFamilyProgress },
  { base: 'family-billing', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: 'billing', titleKey: 'prt.title.famBilling', render: renderFamilyBilling },
  { base: 'family-requests', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: 'requests', titleKey: 'prt.title.famRequests', render: renderFamilyRequests },
  { base: 'family-materials', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: 'materials', titleKey: 'prt.title.famMaterials', render: renderFamilyMaterials },
  { base: 'family-profile', shell: 'portal', role: 'family', personaKey: 'data.fam.fam1.name', activeId: 'profile', titleKey: 'prt.title.famProfile', render: renderFamilyProfile },
];

const THEME_SNIPPET = `(function(){try{var th=localStorage.getItem('academy.theme');if(th==='light'||th==='dark')document.documentElement.setAttribute('data-theme',th);}catch(e){}})();`;

/* Chip-tone build guard (Spec 010): every `chip tone-X` in rendered HTML must map to
 * a styled `.chip.tone-X` rule — an unstyled tone renders as a bare pill silently
 * (the Spec 008 `coral` bug). Unknown tone → throw (fails the build). Medallions use a
 * separate, richer palette (`m-soft/m-grad tone-*`) and are intentionally NOT scanned. */
const STYLED_CHIP_TONES = new Set(['live', 'upcoming', 'completed', 'cancelled', 'amber', 'neutral']);
function assertChipTones(html, file) {
  for (const m of html.matchAll(/\bchip tone-([a-z-]+)/g)) {
    if (!STYLED_CHIP_TONES.has(m[1])) {
      throw new Error(`[build:html] ${file}: unstyled chip tone "tone-${m[1]}" — add a .chip.tone-${m[1]} rule or use a styled tone (${[...STYLED_CHIP_TONES].join('/')})`);
    }
  }
}

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
    const body = p.shell === 'portal'
      ? portalShellMarkup({ role: p.role, personaKey: p.personaKey || '', bodyHTML: p.render(), activeId: p.activeId || 'home' })
      : shellMarkup({ activeId: p.activeId, titleKey: p.titleKey, crumbKey: p.crumbKey, bodyHTML: p.render() });
    const file = lang === 'en' ? `${p.base}.en.html` : `${p.base}.html`;
    assertChipTones(body, file);
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

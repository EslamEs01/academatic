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
  mobileKeyboard: { width: 390, height: 480 },
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
  // Spec 009 — Finance, Billing & Payments Shell (acceptance matrix)
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'finance', lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'finance', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'invoices', financeDrawer: true,  variant: 'drawer' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'invoices', financeConfirm: true, variant: 'confirm' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'invoices', financeFilter: true,  variant: 'filter' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'mobile' },
  // Spec 026 — the three new admin ops pages + one create modal + one details drawer + mobile + dark
  { page: 'sessions-analysis', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'sessions-analysis', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'public-holiday', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'public-holiday', lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'scheduled-actions', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'scheduled-actions', lang: 'ar', theme: 'light', vp: 'mobile' },
  // Spec 032 — the New-session action now opens the sess-new FORM drawer (same frame name)
  { page: 'sessions', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'sess-new', variant: 'create-modal' },
  // Spec 010 — Coverage, Navigation IA & Polish (acceptance frames). The six rail categories
  // expanded (AR light) are already covered above via the default control view + cat: families/
  // teachers/reports/admin/settings; the reports-category frame shows the finance sub-section.
  { page: 'dashboard',  lang: 'ar', theme: 'dark',  vp: 'desktop', cat: 'reports', variant: 'finance-group' },
  { page: 'dashboard',  lang: 'en', theme: 'light', vp: 'desktop', cat: 'reports', variant: 'finance-group' },
  { page: 'family',     lang: 'ar', theme: 'light', vp: 'desktop', view: 'plan',   variant: 'plan-billing' },
  { page: 'attendance', lang: 'ar', theme: 'light', vp: 'desktop', attnFilter: true, variant: 'filtered' },
  // Spec 012 — role portal foundation (12-frame acceptance matrix; plain page loads).
  // Frame 12 (admin unchanged-proof) = the existing dashboard ar/light/desktop frame above.
  { page: 'student-portal', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student-portal', lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'student-portal', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'student-portal', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-portal',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-portal',  lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'family-portal',  lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'family-portal',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'teacher-portal', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-portal', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'teacher-portal', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'portals',        lang: 'ar', theme: 'light', vp: 'desktop' },
  // Spec 018 — compact role home band close-ups (the header is a <div>, so 'section' nth-of-type =
  // the 5 compact bands: 1=KPI row · 2=now band · 3=role-core · 4=preview · 5=quick-links). The
  // full-page desktop frames above show each home top-to-bottom in ~1.5–2 screens.
  { page: 'student-portal', lang: 'ar', theme: 'light', vp: 'desktop', area: 'section:nth-of-type(1)', variant: 'area-kpi' },
  { page: 'student-portal', lang: 'ar', theme: 'light', vp: 'desktop', area: 'section:nth-of-type(2)', variant: 'area-now' },
  { page: 'student-portal', lang: 'ar', theme: 'light', vp: 'desktop', area: 'section:nth-of-type(3)', variant: 'area-homework' },
  { page: 'family-portal',  lang: 'ar', theme: 'light', vp: 'desktop', area: 'section:nth-of-type(1)', variant: 'area-kpi' },
  { page: 'family-portal',  lang: 'ar', theme: 'light', vp: 'desktop', area: 'section:nth-of-type(3)', variant: 'area-children' },
  { page: 'teacher-portal', lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'teacher-portal', lang: 'ar', theme: 'light', vp: 'desktop', area: 'section:nth-of-type(1)', variant: 'area-kpi' },
  { page: 'teacher-portal', lang: 'ar', theme: 'light', vp: 'desktop', area: 'section:nth-of-type(3)', variant: 'area-followup' },
  // Spec 018 — the NEW family-child drill-down page (default st1 · a switched child #child=st11 ·
  // dark · EN · mobile). Proves the mandatory guardian→child-profile flow.
  { page: 'family-child', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-child', lang: 'ar', theme: 'light', vp: 'desktop', childHash: 'st11', variant: 'child-st11' },
  { page: 'family-child', lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'family-child', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'family-child', lang: 'ar', theme: 'light', vp: 'mobile' },
  // Spec 019 — the six student internal pages (AR desktop + mobile), a dark + an EN sample,
  // and the student home refresh (quick-tiles are now REAL links). Full-page frames.
  { page: 'student-schedule',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student-schedule',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'student-schedule',  lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'student-homework',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student-homework',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'student-materials', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student-materials', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'student-progress',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student-progress',  lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'student-progress',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'student-history',   lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student-history',   lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'student-profile',   lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'student-profile',   lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'student-portal',    lang: 'ar', theme: 'light', vp: 'desktop', variant: 'tiles-now-links' },
  // Spec 020 — the seven family internal pages (AR desktop + mobile), billing dark + children EN
  // samples, the family home refresh (tiles-now-links) and the family-child preservation proof.
  { page: 'family-children',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-children',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-children',  lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'family-schedule',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-schedule',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-progress',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-progress',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-billing',   lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-billing',   lang: 'ar', theme: 'dark',  vp: 'desktop' },
  { page: 'family-billing',   lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-requests',  lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-requests',  lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-materials', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-materials', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-profile',   lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'family-profile',   lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'family-portal',    lang: 'ar', theme: 'light', vp: 'desktop', variant: 'tiles-now-links' },
  // Spec 017 — Shell v2: the native mobile nav disclosure, captured OPEN (amendment A1 proof)
  { page: 'teacher-portal', lang: 'ar', theme: 'light', vp: 'mobile', roleDrawer: true, variant: 'drawer-open' },
  // Spec 025 — the seven teacher internal pages: all seven AR desktop + reports EN + schedule dark + schedule mobile
  { page: 'teacher-schedule', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-schedule', lang: 'ar', theme: 'dark', vp: 'desktop' },
  { page: 'teacher-schedule', lang: 'ar', theme: 'light', vp: 'mobile' },
  { page: 'teacher-students', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-outcomes', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-tasks', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-reports', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-reports', lang: 'en', theme: 'light', vp: 'desktop' },
  { page: 'teacher-profile', lang: 'ar', theme: 'light', vp: 'desktop' },
  { page: 'teacher-library', lang: 'ar', theme: 'light', vp: 'desktop' },
  // Spec 028 — admin teacher deep management: kebab · edit modal · assign-teacher/course pickers · availability · category drawer · status confirm
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', teacherKebab: true, variant: 'sp028-kebab' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp028-categories' }, // Spec 041 D-1: drawer → tab (historical name kept)
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', mgmtModal: 'trn.act.edit', variant: 'sp028-edit-modal' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'trn-assign-course', variant: 'sp028-assign-course' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', view: 'timetable', openDrawer: 'trn-availability', variant: 'sp028-availability' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', mgmtConfirm: true, variant: 'sp028-confirm' },
  { page: 'course', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'crs-assign-teacher', variant: 'sp028-assign-teacher' },
  { page: 'group', lang: 'ar', theme: 'dark', vp: 'desktop', openDrawer: 'grp-assign-teacher', variant: 'sp028-assign-teacher-dark' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp028-mobile' },
  { page: 'teacher', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp028-en' },
  // Spec 029 — Reports feedback/forms fold: review rows · read-only detail drawer · categories drawer ·
  // create-feedback modal · forms drawer · export/print gates (in the action cluster) · mobile · dark
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'rep-fb-fb1', variant: 'sp029-feedback-drawer' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'rep-fbcat', variant: 'sp029-categories' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', mgmtModal: 'rep.fb.createTitle', variant: 'sp029-create-feedback' },
  { page: 'reports', lang: 'en', theme: 'light', vp: 'desktop', openDrawer: 'rep-form-frm1', variant: 'sp029-form-drawer-en' },
  { page: 'reports', lang: 'ar', theme: 'dark', vp: 'desktop', openDrawer: 'rep-fb-fb1', variant: 'sp029-feedback-drawer-dark' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp029-mobile' },
  // Spec 030 — finance tabbed hub: Salaries + Banks folded in (figure-free) · Add-bank modal · export gate · mobile · dark
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'salaries', variant: 'sp030-salaries' },
  { page: 'finance', lang: 'en', theme: 'light', vp: 'desktop', view: 'banks', variant: 'sp030-banks-en' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'banks', mgmtModal: 'fin.bank.addTitle', variant: 'sp030-add-bank-modal' },
  { page: 'finance', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'salaries', variant: 'sp030-salaries-dark' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'mobile', view: 'salaries', variant: 'sp030-mobile' },
  // Spec 031 — admin management/content/certificates/settings deep management
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp031-staff' },
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'desktop', requiredDrawer: true, staffKebabDrawer: 'st-perm', variant: 'sp031-staff-rbac' },
  { page: 'library', lang: 'en', theme: 'light', vp: 'desktop', view: 'books', variant: 'sp031-library-en' },
  { page: 'library', lang: 'ar', theme: 'light', vp: 'desktop', view: 'books', openDrawer: 'lib-cats', variant: 'sp031-library-cats' },
  { page: 'certificates', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp031-certificates' },
  { page: 'certificates', lang: 'ar', theme: 'light', vp: 'desktop', view: 'requests', variant: 'sp031-cert-requests' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp031-settings' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'integrations', variant: 'sp031-integrations' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'general', openDrawer: 'head-add', variant: 'sp031-add-head-modal' },
  { page: 'settings', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'security', variant: 'sp031-settings-dark' },
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp031-mobile' },
  // Spec 027 — admin deep management: honest modals / drawer-pickers / row-kebab / gates
  { page: 'students', lang: 'ar', theme: 'light', vp: 'desktop', studentKebab: true, variant: 'sp027-row-kebab' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'courses', openDrawer: 'stu-enroll', variant: 'sp027-enroll-picker' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'fam-cat', variant: 'sp027-reclassify' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', mgmtModal: 'fam.act.edit', variant: 'sp027-edit-modal' },
  { page: 'course', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'crs-enroll', variant: 'sp027-add-students' },
  { page: 'group', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'grp-assign', variant: 'sp027-add-students' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', mgmtConfirm: true, variant: 'sp027-suspend-confirm' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp027-mobile' },
  { page: 'course', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp027-en' },
  { page: 'group', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp027-dark' },
  // Spec 032 — form-completion freeze: one OPEN-FORM frame per rebuilt create/edit surface
  // (desktop AR + select EN + dark + mobile 390) + picker-drawer + nested-feedback proofs
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'sess-new', variant: 'sp032-sess-new' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'fam-edit', variant: 'sp032-fam-edit' },
  { page: 'family', lang: 'ar', theme: 'dark', vp: 'desktop', openDrawer: 'fam-edit', variant: 'sp032-fam-edit-dark' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'fam-child', variant: 'sp032-fam-child' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', view: 'notes', openDrawer: 'fam-note', variant: 'sp032-fam-note' },
  { page: 'add-family', lang: 'ar', theme: 'light', vp: 'desktop', step: 'children', disclose: true, variant: 'sp032-wizard-child3' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'stu-add', variant: 'sp032-stu-add' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'mobile', openDrawer: 'stu-add', variant: 'sp032-stu-add-mobile' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'stu-edit', variant: 'sp032-stu-edit' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'notes', openDrawer: 'stu-note', variant: 'sp032-stu-note' },
  { page: 'courses', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'crs-add', variant: 'sp032-crs-add' },
  { page: 'courses', lang: 'en', theme: 'light', vp: 'desktop', openDrawer: 'crs-add', variant: 'sp032-crs-add-en' },
  { page: 'course', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'crs-edit', variant: 'sp032-crs-edit' },
  { page: 'course', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'grp-add', variant: 'sp032-create-group' },
  { page: 'groups', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'grp-add', variant: 'sp032-grp-add' },
  { page: 'group', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'grp-edit', variant: 'sp032-grp-edit' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'add', variant: 'sp032-trn-add' }, // Spec 041 D-1: drawer → tab
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'mobile', view: 'add', variant: 'sp032-trn-add-mobile' }, // Spec 041 D-1: drawer → tab
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'trn-edit', variant: 'sp032-trn-edit' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'trn-note', variant: 'sp032-trn-note' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp032-trn-categories-form' }, // Spec 041 D-1: drawer → tab
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'fb-create', variant: 'sp032-fb-create' },
  { page: 'reports', lang: 'en', theme: 'light', vp: 'desktop', openDrawer: 'form-create', variant: 'sp032-form-create-en' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'rep-fbcat', variant: 'sp032-fbcat-form' },
  { page: 'attendance', lang: 'ar', theme: 'light', vp: 'desktop', outcomeDrawer: true, nestedDrawer: 'fb-add-out1', variant: 'sp032-fb-add' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'banks', openDrawer: 'bank-add', variant: 'sp032-bank-add' },
  { page: 'finance', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'banks', openDrawer: 'bank-add', variant: 'sp032-bank-add-dark' },
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'staff-add', variant: 'sp032-staff-add' },
  { page: 'staff', lang: 'en', theme: 'light', vp: 'desktop', openDrawer: 'staff-add', variant: 'sp032-staff-add-en' },
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'desktop', staffKebabDrawer: 'staff-edit', variant: 'sp032-staff-edit' },
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'desktop', staffKebabDrawer: 'staff-dup', variant: 'sp032-staff-dup' },
  { page: 'certificates', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'cert-tpl', variant: 'sp032-cert-tpl' },
  { page: 'certificates', lang: 'ar', theme: 'dark', vp: 'desktop', openDrawer: 'cert-tpl', variant: 'sp032-cert-tpl-dark' },
  { page: 'certificates', lang: 'ar', theme: 'light', vp: 'desktop', view: 'requests', openDrawer: 'cert-create', variant: 'sp032-cert-create' },
  { page: 'library', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'mat-add', variant: 'sp032-mat-add' },
  { page: 'library', lang: 'ar', theme: 'light', vp: 'desktop', view: 'books', openDrawer: 'lib-item', variant: 'sp032-lib-item' },
  // ── Spec 039 — content/certificate deep-linked tabs reachable from the sidebar (additive) ──
  { page: 'library', lang: 'ar', theme: 'light', vp: 'desktop', view: 'materials', variant: 'sp039-materials-ar' },
  { page: 'library', lang: 'en', theme: 'light', vp: 'desktop', view: 'materials', variant: 'sp039-materials-en' },
  { page: 'library', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'materials', variant: 'sp039-materials-dark' },
  { page: 'library', lang: 'en', theme: 'light', vp: 'desktop', view: 'books', variant: 'sp039-books-en' },
  { page: 'certificates', lang: 'en', theme: 'light', vp: 'desktop', view: 'requests', variant: 'sp039-requests-en' },
  { page: 'certificates', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'requests', variant: 'sp039-requests-dark' },
  { page: 'certificates', lang: 'ar', theme: 'light', vp: 'desktop', view: 'requests', openDrawer: 'cr-cr1', variant: 'sp039-request-review' },
  { page: 'library', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'mat-edit', variant: 'sp039-mat-edit' },
  { page: 'library', lang: 'en', theme: 'light', vp: 'mobile', view: 'materials', variant: 'sp039-materials-m' },
  { page: 'certificates', lang: 'en', theme: 'light', vp: 'mobile', view: 'requests', variant: 'sp039-requests-m' },
  // the Materials row delete-confirmation (honest gate — nothing is deleted)
  { page: 'library', lang: 'ar', theme: 'light', vp: 'desktop', view: 'materials', confirmSel: '[data-tabpanel="materials"] [data-confirm]', variant: 'sp039-mat-delete' },
  // the shared admin sidebar itself: Materials + Certificate Requests now render as real links (no «قريبًا»/lock)
  { page: 'library', lang: 'ar', theme: 'light', vp: 'desktop', cat: 'admin', variant: 'sp039-sidebar-ar' },
  { page: 'library', lang: 'en', theme: 'light', vp: 'desktop', cat: 'admin', variant: 'sp039-sidebar-en' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'general', openDrawer: 'head-add', variant: 'sp032-head-add' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'mobile', view: 'general', openDrawer: 'head-add', variant: 'sp032-head-add-mobile' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'trn-assign-course', variant: 'sp032-picker-proof' },
  // Spec 034 — Control Center pages: inbox/board/compose/converter + open forms + mobile/dark/EN
  { page: 'messages', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp034-messages' },
  { page: 'messages', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp034-messages-en' },
  { page: 'messages', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp034-messages-dark' },
  { page: 'messages', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'msg-group', variant: 'sp034-messages-group' },
  { page: 'messages', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp034-messages-mobile' },
  { page: 'leads', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp034-leads' },
  { page: 'leads', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp034-leads-en' },
  { page: 'leads', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp034-leads-dark' },
  { page: 'leads', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'lead-new', variant: 'sp034-leads-create' },
  { page: 'leads', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'lead-l1', variant: 'sp034-leads-detail' },
  { page: 'leads', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp034-leads-mobile' },
  { page: 'tasks', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp034-tasks' },
  { page: 'tasks', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp034-tasks-en' },
  { page: 'tasks', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp034-tasks-dark' },
  { page: 'tasks', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'task-new', variant: 'sp034-tasks-create' },
  { page: 'tasks', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp034-tasks-mobile' },
  { page: 'announcements', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp034-announcements' },
  { page: 'announcements', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp034-announcements-en' },
  { page: 'announcements', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp034-announcements-dark' },
  { page: 'announcements', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp034-announcements-mobile' },
  { page: 'time-converter', lang: 'ar', theme: 'light', vp: 'desktop', tcConvert: true, variant: 'sp034-timeconverter' },
  { page: 'time-converter', lang: 'en', theme: 'light', vp: 'desktop', tcConvert: true, variant: 'sp034-timeconverter-en' },
  { page: 'time-converter', lang: 'ar', theme: 'dark', vp: 'desktop', tcConvert: true, variant: 'sp034-timeconverter-dark' },
  { page: 'time-converter', lang: 'ar', theme: 'light', vp: 'mobile', tcConvert: true, variant: 'sp034-timeconverter-mobile' },
  // Spec 035 — Families & Students nav completion: schedule-search page + families fold + student deep-links
  { page: 'schedule-search', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp035-schedule-search' },
  { page: 'schedule-search', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp035-schedule-search-en' },
  { page: 'schedule-search', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp035-schedule-search-dark' },
  { page: 'schedule-search', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'ss-ss1', variant: 'sp035-schedule-search-detail' },
  { page: 'schedule-search', lang: 'ar', theme: 'light', vp: 'desktop', ssEmpty: true, variant: 'sp035-schedule-search-empty' },
  { page: 'schedule-search', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp035-schedule-search-mobile' },
  { page: 'families', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp035-families-fold' },
  { page: 'family', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'fam-cat', variant: 'sp035-family-cat-drawer' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'results', variant: 'sp035-student-results' },
  { page: 'student', lang: 'en', theme: 'light', vp: 'desktop', view: 'results', variant: 'sp035-student-results-en' },
  { page: 'student', lang: 'ar', theme: 'light', vp: 'desktop', view: 'evaluation', variant: 'sp035-student-evaluation' },
  // Spec 036 — Teachers nav completion: fold-anchor drawers (Add Teacher / Teacher Categories) + the two teacher-performance tabs
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'add', variant: 'sp036-add-teacher' }, // Spec 041 D-1: drawer → tab
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp036-teacher-categories' }, // Spec 041 D-1: drawer → tab
  { page: 'teacher-performance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'sessions-kpi', variant: 'sp036-sessions-kpi' },
  { page: 'teacher-performance', lang: 'en', theme: 'light', vp: 'desktop', view: 'sessions-kpi', variant: 'sp036-sessions-kpi-en' },
  { page: 'teacher-performance', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'sessions-kpi', variant: 'sp036-sessions-kpi-dark' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light', vp: 'mobile', view: 'sessions-kpi', variant: 'sp036-sessions-kpi-mobile' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'monthly', variant: 'sp036-monthly' },
  { page: 'teacher-performance', lang: 'en', theme: 'light', vp: 'desktop', view: 'monthly', variant: 'sp036-monthly-en' },
  { page: 'teacher-performance', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'monthly', variant: 'sp036-monthly-dark' },
  // Spec 037 — Reports/Analytics display tabs + flagged-035 corrective boards
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp037-reports-overview' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', view: 'monthly', variant: 'sp037-monthly' },
  { page: 'reports', lang: 'en', theme: 'light', vp: 'desktop', view: 'monthly', variant: 'sp037-monthly-en' },
  { page: 'reports', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'monthly', variant: 'sp037-monthly-dark' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'mobile', view: 'monthly', variant: 'sp037-monthly-mobile' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', view: 'analysis', variant: 'sp037-analysis' },
  { page: 'reports', lang: 'en', theme: 'light', vp: 'desktop', view: 'analysis', variant: 'sp037-analysis-en' },
  { page: 'reports', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'analysis', variant: 'sp037-analysis-dark' },
  { page: 'families', lang: 'ar', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp037-family-categories' },
  { page: 'families', lang: 'en', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp037-family-categories-en' },
  { page: 'families', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'categories', variant: 'sp037-family-categories-dark' },
  { page: 'families', lang: 'ar', theme: 'light', vp: 'mobile', view: 'categories', variant: 'sp037-family-categories-mobile' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'desktop', view: 'results', variant: 'sp037-student-results' },
  { page: 'students', lang: 'en', theme: 'light', vp: 'desktop', view: 'results', variant: 'sp037-student-results-en' },
  { page: 'students', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'results', variant: 'sp037-student-results-dark' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'mobile', view: 'results', variant: 'sp037-student-results-mobile' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'desktop', view: 'evaluation', variant: 'sp037-student-evaluation' },
  { page: 'students', lang: 'en', theme: 'light', vp: 'desktop', view: 'evaluation', variant: 'sp037-student-evaluation-en' },
  { page: 'students', lang: 'ar', theme: 'dark', vp: 'desktop', view: 'evaluation', variant: 'sp037-student-evaluation-dark' },
  // Spec 038 — finance six-tab hub: the three new tabs (invoices/payments/monthly-invoices) + classSalaryReport honest-lock proof
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'invoices', variant: 'sp038-invoices' },
  { page: 'finance', lang: 'en', theme: 'light', vp: 'desktop', view: 'invoices', variant: 'sp038-invoices-en' },
  { page: 'finance', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'invoices', variant: 'sp038-invoices-dark' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'mobile',  view: 'invoices', variant: 'sp038-invoices-mobile' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'payments', variant: 'sp038-payments' },
  { page: 'finance', lang: 'en', theme: 'light', vp: 'desktop', view: 'payments', variant: 'sp038-payments-en' },
  { page: 'finance', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'payments', variant: 'sp038-payments-dark' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', view: 'monthly-invoices', variant: 'sp038-monthly' },
  { page: 'finance', lang: 'en', theme: 'light', vp: 'desktop', view: 'monthly-invoices', variant: 'sp038-monthly-en' },
  { page: 'finance', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'monthly-invoices', variant: 'sp038-monthly-dark' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'mobile',  view: 'monthly-invoices', variant: 'sp038-monthly-mobile' },
  { page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp038-classsalary-lock' },
  { page: 'finance', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp038-classsalary-lock-en' },

  // ===== Spec 040 — the six completed settings domains + the ZERO-«قريبًا» sidebar proof =====
  // A documented representative matrix: every domain and every high-risk state, without a
  // combinatorial explosion. 23 frames.
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'general', variant: 'sp040-general' },
  { page: 'settings', lang: 'en', theme: 'light', vp: 'desktop', view: 'general', variant: 'sp040-general-en' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'notifications', variant: 'sp040-notifications' },
  { page: 'settings', lang: 'en', theme: 'light', vp: 'desktop', view: 'notifications', variant: 'sp040-notifications-en' },
  { page: 'settings', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'notifications', variant: 'sp040-notifications-dark' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'mobile',  view: 'notifications', variant: 'sp040-notifications-mobile' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'customization', variant: 'sp040-customization' },
  { page: 'settings', lang: 'en', theme: 'light', vp: 'desktop', view: 'customization', variant: 'sp040-customization-en' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'security', variant: 'sp040-security' },
  { page: 'settings', lang: 'en', theme: 'light', vp: 'desktop', view: 'security', variant: 'sp040-security-en' },
  { page: 'settings', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'security', variant: 'sp040-security-dark' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'integrations', variant: 'sp040-integrations' },
  { page: 'settings', lang: 'en', theme: 'light', vp: 'desktop', view: 'integrations', variant: 'sp040-integrations-en' },
  { page: 'settings', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'integrations', variant: 'sp040-integrations-dark' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'mobile',  view: 'integrations', variant: 'sp040-integrations-mobile' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'users', variant: 'sp040-users' },
  { page: 'settings', lang: 'en', theme: 'light', vp: 'desktop', view: 'users', variant: 'sp041-users-en' }, // Spec 041 (E-10): settingsUsers had only 1 frame
  { page: 'teachers', lang: 'en', theme: 'light', vp: 'desktop', view: 'add', variant: 'sp041-add-en' },
  { page: 'teachers', lang: 'en', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp041-categories-en' },
  { page: 'teachers', lang: 'ar', theme: 'dark',  vp: 'desktop', view: 'add', variant: 'sp041-add-dark' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'directory', variant: 'sp041-directory' },
  // the three provider drawers that carry the sensitive STRUCTURE-ONLY rows — the visual proof that
  // a credential is described, never rendered as an input.
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'integrations', openDrawer: 'integ-paymob', variant: 'sp040-drawer-paymob' },
  { page: 'settings', lang: 'en', theme: 'light', vp: 'desktop', view: 'integrations', openDrawer: 'integ-paymob', variant: 'sp040-drawer-paymob-en' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'integrations', openDrawer: 'integ-email', variant: 'sp040-drawer-email' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'desktop', view: 'integrations', openDrawer: 'integ-whatsapp', variant: 'sp040-drawer-whatsapp' },
  { page: 'settings', lang: 'ar', theme: 'light', vp: 'mobile',  view: 'integrations', openDrawer: 'integ-paymob', variant: 'sp040-drawer-paymob-mobile' },
  // the zero-«قريبًا» proof: the admin sidebar now renders all six settings items as REAL links.
  { page: 'dashboard', lang: 'ar', theme: 'light', vp: 'desktop', cat: 'settings', variant: 'sp040-sidebar-zero-soon' },
  { page: 'dashboard', lang: 'en', theme: 'light', vp: 'desktop', cat: 'settings', variant: 'sp040-sidebar-zero-soon-en' },
  // Spec 043 — the 3 changed privacy surfaces (visual acceptance of the 6 localized bodies).
  // child-view 2-gate state (no password affordance) — AR/EN, light/dark.
  { page: 'student-profile', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp043-2gate-en' },
  { page: 'student-profile', lang: 'ar', theme: 'dark',  vp: 'desktop', variant: 'sp043-2gate-dark' },
  { page: 'student-profile', lang: 'ar', theme: 'light', vp: 'desktop', variant: 'sp043-2gate' },
  { page: 'student-profile', lang: 'en', theme: 'dark',  vp: 'desktop', variant: 'sp043-2gate-en-dark' },
  // staff RBAC preview OPEN — the 5 parent-contact deny-by-default rows (kebab-driven via staffKebabDrawer).
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'desktop', requiredDrawer: true, staffKebabDrawer: 'st-perm', variant: 'sp043-parents' },
  { page: 'staff', lang: 'en', theme: 'light', vp: 'desktop', requiredDrawer: true, staffKebabDrawer: 'st-perm', variant: 'sp043-parents-en' },
  { page: 'staff', lang: 'ar', theme: 'dark',  vp: 'desktop', requiredDrawer: true, staffKebabDrawer: 'st-perm', variant: 'sp043-parents-dark' },
  { page: 'staff', lang: 'en', theme: 'dark',  vp: 'desktop', requiredDrawer: true, staffKebabDrawer: 'st-perm', variant: 'sp043-parents-en-dark' },
  { page: 'staff', lang: 'ar', theme: 'light', vp: 'mobile',  requiredDrawer: true, staffKebabDrawer: 'st-perm', variant: 'sp043-parents-mobile' },
  // teacher capability/notification policy preview OPEN — direct data-drawer trigger in the overview panel.
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', requiredDrawer: true, openDrawer: 'trn-policy', variant: 'sp043-policy' },
  { page: 'teacher', lang: 'en', theme: 'light', vp: 'desktop', requiredDrawer: true, openDrawer: 'trn-policy', variant: 'sp043-policy-en' },
  { page: 'teacher', lang: 'ar', theme: 'dark',  vp: 'desktop', requiredDrawer: true, openDrawer: 'trn-policy', variant: 'sp043-policy-dark' },
  { page: 'teacher', lang: 'en', theme: 'dark',  vp: 'desktop', requiredDrawer: true, openDrawer: 'trn-policy', variant: 'sp043-policy-en-dark' },
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'mobile',  requiredDrawer: true, openDrawer: 'trn-policy', variant: 'sp043-policy-mobile' },
  // Spec 044 — representative shared-interaction states. Every selector below is fail-loud.
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'desktop', confirmSel: '.profile-banner [data-confirm]', variant: 'sp044-confirm' },
  { page: 'teacher', lang: 'en', theme: 'dark', vp: 'desktop', confirmSel: '.profile-banner [data-confirm]', variant: 'sp044-confirm-en-dark' },
  { page: 'reports', lang: 'ar', theme: 'light', vp: 'desktop', openDrawer: 'fb-create', spec044State: 'dirty-warning', variant: 'sp044-dirty' },
  { page: 'reports', lang: 'en', theme: 'dark', vp: 'desktop', openDrawer: 'fb-create', spec044State: 'validation-error', variant: 'sp044-validation-en-dark' },
  { page: 'reports', lang: 'ar', theme: 'dark', vp: 'desktop', openDrawer: 'fb-create', spec044State: 'backend-required', variant: 'sp044-backend-dark' },
  { page: 'students', lang: 'ar', theme: 'light', vp: 'mobile', openDrawer: 'stu-add', variant: 'sp044-simple-mobile' },
  { page: 'students', lang: 'en', theme: 'dark', vp: 'mobileKeyboard', openDrawer: 'stu-add', variant: 'sp044-keyboard-viewport-en-dark' },
  { page: 'leads', lang: 'en', theme: 'light', vp: 'desktop', openDrawer: 'lead-new', variant: 'sp044-long-form-en' },
  { page: 'leads', lang: 'ar', theme: 'dark', vp: 'mobile', openDrawer: 'lead-new', variant: 'sp044-long-form-mobile-dark' },
  { page: 'attendance', lang: 'en', theme: 'dark', vp: 'desktop', outcomeDrawer: true, variant: 'sp044-details-en-dark' },
  { page: 'add-family', lang: 'ar', theme: 'light', vp: 'desktop', spec044State: 'wizard-dirty-warning', variant: 'sp044-wizard-dirty' },
  { page: 'dashboard', lang: 'en', theme: 'dark', vp: 'mobile', drawer: true, variant: 'sp044-sidebar-en-dark' },
  { page: 'dashboard', lang: 'ar', theme: 'dark', vp: 'desktop', spec044State: 'dropdown', variant: 'sp044-dropdown-dark' },
  // Spec 045 — Teacher visual-state coverage (additive rows only; existing fields only).
  // NOTE: the requested teacher-library search match / no-match / single-empty-state frames are
  // INTENTIONALLY OMITTED — no existing row field types a text query into `input[data-filter="search"]`
  // and applies it (the library's filterBar). `ssEmpty`/`reportFilter`/`teacher` drive <select> dropdowns,
  // not a free-text search. Per the no-invention rule these states are skipped, not faked.
  // teachers admin directory, deep-linked non-default tabs (#view=):
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'add', variant: 'sp045-teachers-add' },
  { page: 'teachers', lang: 'ar', theme: 'light', vp: 'desktop', view: 'categories', variant: 'sp045-teachers-categories' },
  // teacher admin detail at 390px (mobile vp) — default Overview view shows the profileBanner action cluster:
  { page: 'teacher', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp045-teacher-detail-mobile' },
  // teacher-performance at 390px on the two non-default tabs (#view= ):
  { page: 'teacher-performance', lang: 'ar', theme: 'light', vp: 'mobile', view: 'sessions-kpi', variant: 'sp045-perf-sessions-kpi-mobile' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light', vp: 'mobile', view: 'monthly', variant: 'sp045-perf-monthly-mobile' },
  // dark rows for the four teacher pages currently light-only in the committed matrix:
  { page: 'teacher-students', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp045-teacher-students-dark' },
  { page: 'teacher-tasks', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp045-teacher-tasks-dark' },
  { page: 'teacher-reports', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp045-teacher-reports-dark' },
  { page: 'teacher-profile', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp045-teacher-profile-dark' },
  // Spec 045 — T064 (this batch): EN/LTR light frames for the six teacher pages that had AR-only
  // desktop coverage, the two missing dark frames (outcomes/library), and the 390px frames that
  // close the per-row AR+EN desktop+390px + dark parity required by responsive-matrix.md.
  // (teacher-portal/teacher-schedule AR-390px and every en/ar light-desktop frame already exist as
  // non-variant rows above; they are not duplicated.) Every `mobile` row below renders at exactly
  // 390px (VIEWPORTS.mobile) and numerically proves scrollWidth === clientWidth via the exhaustive
  // per-page/per-lang 390px equality gate in tests/smoke/run.cjs (documentElement.scrollWidth <= 391
  // at a 390px viewport) — capture.cjs itself asserts zero console errors and carries no other
  // assertion style to mirror.
  { page: 'teacher-schedule', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp045-schedule-en' },
  { page: 'teacher-students', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp045-students-en' },
  { page: 'teacher-outcomes', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp045-outcomes-en' },
  { page: 'teacher-tasks', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp045-tasks-en' },
  { page: 'teacher-library', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp045-library-en' },
  { page: 'teacher-profile', lang: 'en', theme: 'light', vp: 'desktop', variant: 'sp045-profile-en' },
  { page: 'teacher-outcomes', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp045-outcomes-dark' },
  { page: 'teacher-reports', lang: 'en', theme: 'dark', vp: 'desktop', variant: 'sp045-reports-en-dark' },
  { page: 'teacher-library', lang: 'ar', theme: 'dark', vp: 'desktop', variant: 'sp045-library-dark' },
  // 390px — the seven teacher portal pages, AR and EN each (schedule AR-390 exists above):
  { page: 'teacher-schedule', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-schedule-mobile-en' },
  { page: 'teacher-students', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp045-students-mobile' },
  { page: 'teacher-students', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-students-mobile-en' },
  { page: 'teacher-outcomes', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp045-outcomes-mobile' },
  { page: 'teacher-outcomes', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-outcomes-mobile-en' },
  { page: 'teacher-tasks', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp045-tasks-mobile' },
  { page: 'teacher-tasks', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-tasks-mobile-en' },
  { page: 'teacher-reports', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp045-reports-mobile' },
  { page: 'teacher-reports', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-reports-mobile-en' },
  { page: 'teacher-library', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp045-library-mobile' },
  { page: 'teacher-library', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-library-mobile-en' },
  { page: 'teacher-profile', lang: 'ar', theme: 'light', vp: 'mobile', variant: 'sp045-profile-mobile' },
  { page: 'teacher-profile', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-profile-mobile-en' },
  // 390px EN for the three admin teacher surfaces (their AR-390 frames exist above):
  { page: 'teachers', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-teachers-mobile-en' },
  { page: 'teacher', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-detail-mobile-en' },
  { page: 'teacher-performance', lang: 'en', theme: 'light', vp: 'mobile', variant: 'sp045-perf-mobile-en' },
  // BLOCKED-ON-HARNESS (documented, not faked): teacher-library search-match / no-match / empty
  // frames need a driver that types into `input[data-filter="search"]` and applies the form — no
  // existing MATRIX field does that (`ssEmpty`/`reportFilter`/`teacher` drive <select> facets only;
  // `spec044State: 'validation-error'` hard-requires exactly one `.interaction-surface` input and a
  // `[data-interaction-submit]`, neither of which the portal-shell library page has). The teacher
  // pages carry no editable form (validation state), no drawer/modal trigger other than the mobile
  // nav disclosure (already covered by the Spec 017 roleDrawer row), and no deterministic empty/long-
  // content switches (fixtures always populate) — so those page-state-matrix states stay untriggered.
];

async function requiredClick(page, selector) {
  await page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
  await page.locator(`${selector}:visible`).first().click();
}

async function requiredPopoverItem(page, triggerSelector, itemSelector) {
  await page.waitForSelector(triggerSelector, { timeout: 5000, state: 'visible' });
  const trigger = page.locator(`${triggerSelector}:visible`).first();
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    await trigger.click();
    if (await trigger.getAttribute('aria-expanded') === 'true') {
      await page.waitForSelector(itemSelector, { timeout: 5000, state: 'visible' });
      return;
    }
    await page.waitForTimeout(100);
  }
  throw new Error(`required popover did not open: ${triggerSelector}`);
}

async function requiredDrawer(page, selector) {
  await page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
  const trigger = page.locator(`${selector}:visible`).first();
  const target = await trigger.getAttribute('data-drawer');
  if (!target) throw new Error(`required drawer trigger has no data-drawer target: ${selector}`);
  await trigger.click();
  await page.waitForSelector(`.interaction-surface[role="dialog"][aria-modal="true"][data-interaction-target="${target}"]`, { timeout: 5000, state: 'visible' });
  return target;
}

async function requiredConfirm(page, selector) {
  await requiredClick(page, selector);
  await page.waitForSelector('.interaction-surface[role="dialog"][aria-modal="true"][data-interaction-family="confirmation"]', { timeout: 5000, state: 'visible' });
}

(async () => {
  const filter = process.argv[2];
  const jobs = MATRIX.filter((s) => !filter || `${s.page}-${s.lang}-${s.theme}-${s.vp}`.includes(filter));
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const results = [];

  for (const s of jobs) {
    const ctx = await browser.newContext({
      viewport: VIEWPORTS[s.vp],
      deviceScaleFactor: s.vp.startsWith('mobile') ? 2 : 1.5,
    });
    await ctx.addInitScript(({ theme, rail }) => { localStorage.setItem('academy.theme', theme); if (rail) localStorage.setItem('academy.rail', rail); }, { theme: s.theme, rail: s.rail });

    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

    const file = s.lang === 'en' ? `${s.page}.en.html` : `${s.page}.html`;
    const hash = s.step ? '#step=' + s.step : (s.view ? '#view=' + s.view : (s.childHash ? '#child=' + s.childHash : ''));
    await page.goto(`${BASE}/${file}${hash}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
      const b = document.querySelector('#page-body');
      return b && b.children.length > 0;
    }, { timeout: 8000 });
    await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
    await page.waitForTimeout(350);
    if (s.drawer) { await requiredClick(page, '[data-action="open-drawer"]'); await page.waitForSelector('.interaction-surface[data-interaction-family="sidebar"]', { timeout: 5000, state: 'visible' }); await page.waitForTimeout(380); }
    if (s.cat) { await requiredClick(page, `[data-nav-category="${s.cat}"]`); await page.waitForTimeout(260); }
    // Spec 003 content tabs / teacher lens / appointment drawer
    if (s.tab) { await requiredClick(page, `[data-tab="${s.tab}"]`); await page.waitForTimeout(220); }
    if (s.teacher != null) { await page.waitForSelector('select[data-filter="teacher"]', { timeout: 5000, state: 'visible' }); await page.selectOption('select[data-filter="teacher"]', { index: s.teacher }); await page.waitForTimeout(220); }
    if (s.sheet) { await requiredDrawer(page, '[data-tabpanel="timetable"]:not([hidden]) .tt-block[data-drawer]'); await page.waitForTimeout(420); }
    // Spec 005 — open the canonical outcome drawer (kebab → view), optionally a confirm modal
    if (s.outcomeDrawer || s.confirm) {
      const rowSel = s.confirm ? '#attendance-list .outcome-row:nth-child(8) [data-row-menu]' : '#attendance-list .outcome-row:not([hidden]) [data-row-menu]';
      await requiredClick(page, rowSel); await page.waitForTimeout(240);
      await requiredDrawer(page, '.popover [data-drawer]'); await page.waitForTimeout(460);
      if (s.confirm) { await requiredConfirm(page, '.interaction-surface [data-confirm]'); await page.waitForTimeout(340); }
    }
    // Spec 007 — open the teacher banner Notify-family confirm modal
    if (s.teacherConfirm) { await requiredConfirm(page, '.profile-banner [data-confirm]'); await page.waitForTimeout(380); }
    // Spec 008 — reports: Schedule confirm modal (demo) / category-card filter narrowed
    if (s.reportAction) { await requiredConfirm(page, '.report-actions [data-confirm]'); await page.waitForTimeout(360); }
    if (s.reportFilter) { await page.waitForSelector('select[data-filter="area"]', { timeout: 5000, state: 'visible' }); await page.selectOption('select[data-filter="area"]', 'attendance'); await page.waitForTimeout(220); }
    // Spec 009 — finance: invoice drawer / record-payment confirm / overdue-tile filter
    if (s.financeDrawer) { await requiredDrawer(page, '#invoice-list [data-drawer]'); await page.waitForTimeout(380); }
    if (s.financeConfirm) { await requiredConfirm(page, '#invoice-list [data-confirm]'); await page.waitForTimeout(380); }
    if (s.financeFilter) { await requiredClick(page, '[data-filter-set="status:overdue"]'); await page.waitForTimeout(250); }
    // Spec 010 — attendance status-tile filter narrowing proof
    if (s.attnFilter) { await requiredClick(page, '.outcome-tile[data-filter-set="outcome:studentAbsent"]'); await page.waitForTimeout(280); }
    // Spec 017 — open the role-nav native disclosure (mobile)
    if (s.roleDrawer) { await requiredClick(page, '.pt-nav-drawer > summary'); await page.waitForTimeout(260); }
    if (s.sessCreateModal) { await requiredClick(page, '[data-modal-trigger]'); await page.waitForSelector('.interaction-surface[role="dialog"][aria-modal="true"]', { timeout: 5000, state: 'visible' }); await page.waitForTimeout(340); }
    // Spec 027 — deep-management surfaces (view/hash flags above position the trigger's tab first)
    if (s.studentKebab) { await requiredClick(page, '#students-table [data-row-menu][data-row-menu-kind="student"]'); await page.waitForTimeout(320); }
    if (s.teacherKebab) { await requiredClick(page, '#teachers-grid [data-row-menu][data-row-menu-kind="teacher"]'); await page.waitForTimeout(320); }
    if (s.openDrawer) { await requiredDrawer(page, `[data-drawer="${s.openDrawer}"]`); await page.waitForTimeout(440); }
    // Spec 035 — schedule-search: drive a no-match filter combo to capture the empty state
    if (s.ssEmpty) {
      await page.waitForSelector('select[data-filter="availability"]', { timeout: 5000, state: 'visible' });
      await page.waitForSelector('select[data-filter="teacher"]', { timeout: 5000, state: 'visible' });
      await page.selectOption('select[data-filter="availability"]', 'booked');
      await page.selectOption('select[data-filter="teacher"]', 't6');
      await page.waitForTimeout(280);
    }
    // Spec 032 — staff kebab → form drawer; the fb-add form nested in the open outcome sheet;
    // the add-family wizard native child-disclosure
    if (s.staffKebabDrawer && s.requiredDrawer) {
      const selector = `.popover [data-drawer="${s.staffKebabDrawer}"]`;
      await requiredPopoverItem(page, '#staff-grid [data-row-menu][data-row-menu-kind="staff"]', selector);
      await requiredDrawer(page, selector);
      await page.waitForTimeout(440);
    } else if (s.staffKebabDrawer) {
      await requiredClick(page, '#staff-grid [data-row-menu][data-row-menu-kind="staff"]'); await page.waitForTimeout(280);
      await requiredDrawer(page, `.popover [data-drawer="${s.staffKebabDrawer}"]`); await page.waitForTimeout(440);
    }
    if (s.nestedDrawer) { await requiredDrawer(page, `.interaction-surface [data-drawer="${s.nestedDrawer}"]`); await page.waitForTimeout(460); }
    if (s.disclose) { await requiredClick(page, '[data-wizard] details > summary'); await page.waitForTimeout(260); }
    // Spec 034 — drive the time converter so the screenshot shows a real computed result
    if (s.tcConvert) {
      await page.waitForSelector('[data-tc-source]', { timeout: 5000, state: 'visible' });
      await page.waitForSelector('[data-tc-target]', { timeout: 5000, state: 'visible' });
      await page.waitForSelector('[data-tc-date]', { timeout: 5000, state: 'visible' });
      await page.waitForSelector('[data-tc-time]', { timeout: 5000, state: 'visible' });
      await page.selectOption('[data-tc-source]', 'Africa/Cairo');
      await page.selectOption('[data-tc-target]', 'America/New_York');
      await page.fill('[data-tc-date]', '2026-06-20');
      await page.fill('[data-tc-time]', '15:00');
      await page.waitForTimeout(200);
    }
    if (s.mgmtModal) { await requiredClick(page, `[data-modal-trigger][data-modal-title-key="${s.mgmtModal}"]`); await page.waitForSelector('.interaction-surface[role="dialog"][aria-modal="true"]', { timeout: 5000, state: 'visible' }); await page.waitForTimeout(340); }
    if (s.mgmtConfirm) { await requiredConfirm(page, '.profile-banner [data-confirm]'); await page.waitForTimeout(360); }
    // Spec 039 — open an arbitrary confirm gate by selector (materials row delete)
    if (s.confirmSel) { await requiredConfirm(page, s.confirmSel); await page.waitForTimeout(380); }

    if (s.spec044State === 'dirty-warning') {
      const input = page.locator('.interaction-surface input:not([type="hidden"]), .interaction-surface textarea').first();
      if (await input.count() !== 1) throw new Error('Spec 044 dirty-state screenshot field is missing');
      await input.fill(`${await input.inputValue()} changed`);
      await page.keyboard.press('Escape');
      await page.waitForSelector('.interaction-surface [data-interaction-discard-state]', { timeout: 5000, state: 'visible' });
    } else if (s.spec044State === 'validation-error') {
      const input = page.locator('.interaction-surface input:not([type="hidden"]), .interaction-surface textarea').first();
      if (await input.count() !== 1) throw new Error('Spec 044 validation screenshot field is missing');
      await input.evaluate((node) => node.setCustomValidity('Spec 044 validation probe'));
      await page.locator('.interaction-surface [data-interaction-submit]').click();
      await page.waitForSelector('.interaction-surface [data-interaction-error-summary]', { timeout: 5000, state: 'visible' });
    } else if (s.spec044State === 'backend-required') {
      await page.locator('.interaction-surface [data-interaction-submit]').click();
      await page.waitForSelector('.interaction-surface [data-interaction-backend-state]', { timeout: 5000, state: 'visible' });
    } else if (s.spec044State === 'wizard-dirty-warning') {
      const input = page.locator('[data-wizard] input, [data-wizard] textarea, [data-wizard] select').first();
      if (await input.count() !== 1) throw new Error('Spec 044 wizard screenshot field is missing');
      await input.fill(`${await input.inputValue()} changed`);
      await requiredClick(page, '.sidebar a[href="families.html"]');
      await page.waitForSelector('[data-page-discard-state]', { timeout: 5000, state: 'visible' });
    } else if (s.spec044State === 'dropdown') {
      await requiredClick(page, '[data-action="profile-menu"]');
      await page.waitForSelector('[role="menu"]', { timeout: 5000, state: 'visible' });
    }

    const name = `${s.page}__${s.lang}__${s.theme}__${s.vp}${s.variant ? '__' + s.variant : ''}${s.rail ? '__rail' : ''}${s.drawer ? '__drawer' : ''}${s.cat ? '__cat-' + s.cat : ''}.png`;
    // Spec 013 — area close-ups are element-scoped (Playwright auto-scrolls the element into view)
    if (s.area) {
      await page.waitForSelector(s.area, { timeout: 5000, state: 'visible' });
      await page.locator(s.area).first().screenshot({ path: path.join(OUT, name) });
    } else {
      await page.screenshot({ path: path.join(OUT, name), fullPage: !s.drawer && !s.sheet && !s.outcomeDrawer && !s.confirm && !s.teacherConfirm && !s.reportAction && !s.financeDrawer && !s.financeConfirm && !s.sessCreateModal && !s.studentKebab && !s.teacherKebab && !s.openDrawer && !s.mgmtModal && !s.mgmtConfirm && !s.staffKebabDrawer && !s.nestedDrawer && !s.confirmSel });
    }
    results.push({ name, errors });
    if (errors.length) console.log(`  ⚠ ${name} console errors:\n   - ${errors.slice(0, 6).join('\n   - ')}`);
    else console.log(`  ✓ ${name}`);
    await ctx.close();
  }

  await browser.close();
  const withErrors = results.filter((r) => r.errors.length).length;
  console.log(`\n[screenshots] ${results.length} captured · ${withErrors} with console errors`);
  /* Spec 041 — R-3 (a test-runner STRENGTHENING, not a protected-assert supersession).
   * This runner used to ALWAYS exit 0 — console errors were counted, printed, then ignored. "0 console
   * errors" has been reported as a pass condition for many specs while being, mechanically, only a log
   * line. The baseline was demonstrated at 0 BEFORE this gate was added. No filtering, no
   * ignored-console allowlist. */
  if (withErrors > 0) {
    console.error('SCREENSHOTS FAILED: console error(s) captured — gated since Spec 041 (R-3)');
    for (const r of results.filter((x) => x.errors.length)) console.error(`  ✗ ${r.name}: ${r.errors.slice(0, 2).join(' | ')}`);
    process.exit(1);
  }
  process.exit(0);
})();

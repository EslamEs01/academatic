/* Category-based academy ADMIN navigation IA (data-driven, matches the
 * sidebar-reference.png two-level rail). The slim rail shows one icon per
 * CATEGORY; selecting a category swaps the expanded panel to show ONLY that
 * category's links (never all categories at once). Each item carries a STATUS:
 *   implemented — a real static page; <a href> + active pill.
 *   planned     — an upcoming admin spec; «قريبًا» <button> (no route, no dead link).
 *   disabled    — visible but disabled-with-reason (reasonKey required).
 *   future-role — student/teacher/family portals; NEVER rendered.
 *   hidden      — discovered but intentionally not shown now.
 * See contracts/navigation-ia-contract.md. */

import { SESSIONS } from './fixtures/sessions.js';

export const BRAND = { nameKey: 'brand.name', icon: 'graduation-cap' };

const item = (o) => ({ status: o.status || 'implemented', ...o });

/* Six rail categories; each renders a panel of its OWN links only. */
export const NAV_CATEGORIES = [
  {
    id: 'control', labelKey: 'cat.control', icon: 'layers',
    items: [
      item({ id: 'home', labelKey: 'nav.home', icon: 'home', route: 'dashboard.html' }),
      item({ id: 'sessions', labelKey: 'nav.sessions', icon: 'sessions', route: 'sessions.html', badge: SESSIONS.total }),
      item({ id: 'schedule', labelKey: 'nav.schedule', icon: 'schedule', route: 'schedule.html' }),
      item({ id: 'attendance', labelKey: 'nav.attendance', icon: 'clipboard-check', route: 'attendance.html' }),
      item({ id: 'sessionsAnalysis', labelKey: 'nav.sessionsAnalysis', icon: 'trending-up', route: 'sessions-analysis.html' }),
      item({ id: 'messages', labelKey: 'nav.messages', icon: 'messages', status: 'planned' }),
      item({ id: 'leads', labelKey: 'nav.leads', icon: 'inbox', status: 'planned' }),
      item({ id: 'tasks', labelKey: 'nav.tasks', icon: 'tasks', status: 'planned' }),
      item({ id: 'announcements', labelKey: 'nav.announcements', icon: 'megaphone', status: 'planned' }),
      item({ id: 'timeConverter', labelKey: 'nav.timeConverter', icon: 'clock', status: 'planned' }),
      item({ id: 'publicHoliday', labelKey: 'nav.publicHoliday', icon: 'calendar', route: 'public-holiday.html' }),
      item({ id: 'scheduledActions', labelKey: 'nav.scheduledActions', icon: 'tasks', route: 'scheduled-actions.html' }),
    ],
  },
  {
    id: 'families', labelKey: 'cat.families', icon: 'families',
    items: [
      item({ id: 'families', labelKey: 'nav.families', icon: 'families', route: 'families.html' }),
      item({ id: 'addFamily', labelKey: 'nav.addFamily', icon: 'user-plus', route: 'add-family.html' }),
      item({ id: 'students', labelKey: 'nav.students', icon: 'students', route: 'students.html' }),
      item({ id: 'courses', labelKey: 'nav.courses', icon: 'curricula', route: 'courses.html' }),
      item({ id: 'familyCategories', labelKey: 'nav.familyCategories', icon: 'filter', status: 'planned' }),
      item({ id: 'groups', labelKey: 'nav.groups', icon: 'students', route: 'groups.html' }),
      item({ id: 'scheduleSearch', labelKey: 'nav.scheduleSearch', icon: 'search', status: 'planned' }),
      item({ id: 'studentResult', labelKey: 'nav.studentResult', icon: 'check-circle', status: 'planned' }),
      item({ id: 'studentEvaluation', labelKey: 'nav.studentEvaluation', icon: 'sparkles', status: 'planned' }),
    ],
  },
  {
    id: 'teachers', labelKey: 'cat.teachers', icon: 'trainers',
    items: [
      item({ id: 'teachers', labelKey: 'nav.teachers', icon: 'trainers', route: 'teachers.html' }),
      item({ id: 'addTeacher', labelKey: 'nav.addTeacher', icon: 'user-plus', status: 'planned' }),
      item({ id: 'teacherCategories', labelKey: 'nav.teacherCategories', icon: 'filter', status: 'planned' }),
    ],
    sections: [
      {
        titleKey: 'cat.teachersPerf',
        items: [
          item({ id: 'teacherKpi', labelKey: 'nav.teacherKpi', icon: 'trending-up', route: 'teacher-performance.html' }),
          item({ id: 'sessionsKpi', labelKey: 'nav.sessionsKpi', icon: 'trending-up', status: 'planned' }),
          item({ id: 'monthlyPerf', labelKey: 'nav.monthlyPerf', icon: 'reports', status: 'planned' }),
        ],
      },
    ],
  },
  {
    id: 'reports', labelKey: 'cat.reports', icon: 'reports',
    items: [
      item({ id: 'reports', labelKey: 'nav.reports', icon: 'reports', route: 'reports.html' }),
      item({ id: 'monthlyReports', labelKey: 'nav.monthlyReports', icon: 'reports', status: 'planned' }),
      item({ id: 'dataAnalysis', labelKey: 'nav.dataAnalysis', icon: 'trending-up', status: 'planned' }),
    ],
    sections: [
      {
        /* Finance shell + its backend-locked siblings, grouped under one honest
         * sub-section (same mechanism as teachers → cat.teachersPerf). Finance is
         * the only real link; the rest stay disabled-with-reason until the real
         * billing backend exists. `banks` lives here (moved from admin). */
        titleKey: 'cat.finance',
        items: [
          item({ id: 'finance', labelKey: 'nav.finance', icon: 'wallet', route: 'finance.html' }),
          item({ id: 'invoices', labelKey: 'nav.invoices', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
          item({ id: 'monthlyInvoices', labelKey: 'nav.monthlyInvoices', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
          item({ id: 'salaries', labelKey: 'nav.salaries', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
          item({ id: 'staffSalaries', labelKey: 'nav.staffSalaries', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
          item({ id: 'payments', labelKey: 'nav.payments', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
          item({ id: 'classSalaryReport', labelKey: 'nav.classSalaryReport', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
          item({ id: 'banks', labelKey: 'nav.banks', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }),
        ],
      },
    ],
  },
  {
    id: 'admin', labelKey: 'cat.admin', icon: 'grid',
    items: [
      item({ id: 'staff', labelKey: 'nav.staff', icon: 'staff', route: 'staff.html' }),
      item({ id: 'materials', labelKey: 'nav.materials', icon: 'materials', status: 'planned' }),
      item({ id: 'books', labelKey: 'nav.books', icon: 'curricula', route: 'library.html' }),
      item({ id: 'certificates', labelKey: 'nav.certificates', icon: 'certificates', route: 'certificates.html' }),
      item({ id: 'certificateRequests', labelKey: 'nav.certificateRequests', icon: 'certificates', status: 'planned' }),
    ],
  },
  {
    id: 'settings', labelKey: 'cat.settings', icon: 'settings',
    items: [
      item({ id: 'settings', labelKey: 'nav.settings', icon: 'settings', route: 'settings.html' }),
      item({ id: 'settingsGeneral', labelKey: 'nav.settingsGeneral', icon: 'settings', status: 'planned' }),
      item({ id: 'settingsIntegrations', labelKey: 'nav.settingsIntegrations', icon: 'grid', status: 'planned' }),
      item({ id: 'settingsCustomization', labelKey: 'nav.settingsCustomization', icon: 'sparkles', status: 'planned' }),
      item({ id: 'settingsNotifications', labelKey: 'nav.settingsNotifications', icon: 'bell', status: 'planned' }),
      item({ id: 'settingsSecurity', labelKey: 'nav.settingsSecurity', icon: 'lock', status: 'planned' }),
      item({ id: 'settingsUsers', labelKey: 'nav.settingsUsers', icon: 'staff', status: 'planned' }),
    ],
  },
];

/* flat helpers */
export const catItems = (c) => [...c.items, ...(c.sections || []).flatMap((s) => s.items)];

/* which category owns the current route's nav id (so the panel opens to it on load) */
export function categoryOf(activeId) {
  for (const c of NAV_CATEGORIES) {
    if (catItems(c).some((i) => i.id === activeId)) return c.id;
  }
  return NAV_CATEGORIES[0].id; // default → control
}

/* Documented-but-NOT-rendered registers (reference IA). */
export const FUTURE_ROLE = [
  { id: 'teacher-portal', reason: 'Separate Teacher portal surface — foundation shipped by Spec 012 (teacher-portal.html); deep experience is Spec 015; never an admin nav item.' },
  { id: 'family-portal', reason: 'Family/Guardian portal with the multi-child pattern — foundation shipped by Spec 012 (family-portal.html); deep experience is Spec 014; never an admin nav item.' },
  { id: 'student-portal', reason: 'Student portal split out of the legacy guardian-proxied portal as its own surface — foundation Spec 012 (student-portal.html); deep experience is Spec 013; never an admin nav item.' },
];

/* intended routes when a planned item is promoted (NI9 / NI12).
 * Spec 032 stale-map cleanup: sessionsAnalysis removed (implemented with its own
 * route since Spec 026 — no longer a future route). */
export const FUTURE_ROUTES = {
  messages: 'messages.html', leads: 'leads.html', tasks: 'tasks.html',
  announcements: 'announcements.html', studentResult: 'student-results.html',
  studentEvaluation: 'student-evaluation.html',
  teacherCategories: 'teachers.html', // Spec 028 — folds into the teachers.html trn-categories drawer (no standalone page)
  materials: 'library.html', // Spec 031 — materials folds into the library.html Materials tab (no standalone page)
  dataAnalysis: 'analytics.html', monthlyReports: 'monthly-reports.html',
};

/* build-time guard — a dead link cannot ship */
for (const c of NAV_CATEGORIES) {
  for (const it of catItems(c)) {
    if (it.status === 'implemented' && !it.route) throw new Error(`nav.config: implemented item '${it.id}' needs a route`);
    if (it.status !== 'implemented' && it.route) throw new Error(`nav.config: non-implemented item '${it.id}' must not have a route`);
    if (it.status === 'disabled' && !it.reasonKey) throw new Error(`nav.config: disabled item '${it.id}' needs a reasonKey`);
  }
}

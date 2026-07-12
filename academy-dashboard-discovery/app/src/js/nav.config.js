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
      item({ id: 'messages', labelKey: 'nav.messages', icon: 'messages', route: 'messages.html' }),
      item({ id: 'leads', labelKey: 'nav.leads', icon: 'inbox', route: 'leads.html' }),
      item({ id: 'tasks', labelKey: 'nav.tasks', icon: 'tasks', route: 'tasks.html' }),
      item({ id: 'announcements', labelKey: 'nav.announcements', icon: 'megaphone', route: 'announcements.html' }),
      item({ id: 'timeConverter', labelKey: 'nav.timeConverter', icon: 'clock', route: 'time-converter.html' }),
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
      item({ id: 'familyCategories', labelKey: 'nav.familyCategories', icon: 'filter', route: 'families.html#view=categories' }), // Spec 037 — deep-link to the labeled Family Categories board tab
      item({ id: 'groups', labelKey: 'nav.groups', icon: 'students', route: 'groups.html' }),
      item({ id: 'scheduleSearch', labelKey: 'nav.scheduleSearch', icon: 'search', route: 'schedule-search.html' }), // Spec 035 — standalone availability-search page
      item({ id: 'studentResult', labelKey: 'nav.studentResult', icon: 'check-circle', route: 'students.html#view=results' }), // Spec 037 — cross-student Results board tab (per-student drill-down → student.html#view=results)
      item({ id: 'studentEvaluation', labelKey: 'nav.studentEvaluation', icon: 'sparkles', route: 'students.html#view=evaluation' }), // Spec 037 — cross-student Evaluation board tab (per-student drill-down → student.html#view=evaluation)
    ],
  },
  {
    id: 'teachers', labelKey: 'cat.teachers', icon: 'trainers',
    items: [
      item({ id: 'teachers', labelKey: 'nav.teachers', icon: 'trainers', route: 'teachers.html' }),
      item({ id: 'addTeacher', labelKey: 'nav.addTeacher', icon: 'user-plus', route: 'teachers.html' }), // Spec 036 — fold-anchor to teachers.html (trn-add drawer)
      item({ id: 'teacherCategories', labelKey: 'nav.teacherCategories', icon: 'filter', route: 'teachers.html' }), // Spec 036 — fold-anchor to teachers.html (trn-categories drawer)
    ],
    sections: [
      {
        titleKey: 'cat.teachersPerf',
        items: [
          item({ id: 'teacherKpi', labelKey: 'nav.teacherKpi', icon: 'trending-up', route: 'teacher-performance.html' }),
          item({ id: 'sessionsKpi', labelKey: 'nav.sessionsKpi', icon: 'trending-up', route: 'teacher-performance.html#view=sessions-kpi' }), // Spec 036 — display tab on teacher-performance
          item({ id: 'monthlyPerf', labelKey: 'nav.monthlyPerf', icon: 'reports', route: 'teacher-performance.html#view=monthly' }), // Spec 036 — display tab on teacher-performance
        ],
      },
    ],
  },
  {
    id: 'reports', labelKey: 'cat.reports', icon: 'reports',
    items: [
      item({ id: 'reports', labelKey: 'nav.reports', icon: 'reports', route: 'reports.html' }),
      item({ id: 'monthlyReports', labelKey: 'nav.monthlyReports', icon: 'reports', route: 'reports.html#view=monthly' }), // Spec 037 — display-only Monthly Reports tab
      item({ id: 'dataAnalysis', labelKey: 'nav.dataAnalysis', icon: 'trending-up', route: 'reports.html#view=analysis' }), // Spec 037 — display-only Data Analysis tab
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
          item({ id: 'invoices', labelKey: 'nav.invoices', icon: 'wallet', route: 'finance.html#view=invoices' }), // Spec 038 — unlock → invoices tab (authored rows; writes gated)
          item({ id: 'monthlyInvoices', labelKey: 'nav.monthlyInvoices', icon: 'wallet', route: 'finance.html#view=monthly-invoices' }), // Spec 038 — unlock → monthly board (no computed total)
          item({ id: 'salaries', labelKey: 'nav.salaries', icon: 'wallet', route: 'finance.html#view=salaries' }), // Spec 038 — unlock → figure-free salaries tab
          item({ id: 'staffSalaries', labelKey: 'nav.staffSalaries', icon: 'wallet', route: 'finance.html#view=salaries' }), // Spec 038 — unlock → staff board in the salaries tab
          item({ id: 'payments', labelKey: 'nav.payments', icon: 'wallet', route: 'finance.html#view=payments' }), // Spec 038 — unlock → payments tab
          item({ id: 'classSalaryReport', labelKey: 'nav.classSalaryReport', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' }), // Spec 038 — HONEST LOCK kept (a real class-salary report ⇒ computed per-class pay; needs the payroll backend)
          item({ id: 'banks', labelKey: 'nav.banks', icon: 'wallet', route: 'finance.html#view=banks' }), // Spec 038 — unlock → banks tab (name+status, no balance)
        ],
      },
    ],
  },
  {
    id: 'admin', labelKey: 'cat.admin', icon: 'grid',
    items: [
      item({ id: 'staff', labelKey: 'nav.staff', icon: 'staff', route: 'staff.html' }),
      item({ id: 'materials', labelKey: 'nav.materials', icon: 'materials', route: 'library.html#view=materials' }), // Spec 039 — unlock → library.html Materials tab (subject catalog; writes gated)
      item({ id: 'books', labelKey: 'nav.books', icon: 'curricula', route: 'library.html#view=books' }), // Spec 039 — refine → open the Books tab explicitly (was library.html, which defaulted to Materials)
      item({ id: 'certificates', labelKey: 'nav.certificates', icon: 'certificates', route: 'certificates.html' }),
      item({ id: 'certificateRequests', labelKey: 'nav.certificateRequests', icon: 'certificates', route: 'certificates.html#view=requests' }), // Spec 039 — unlock → certificates.html Requests tab (authored queue; dispositions gated)
    ],
  },
  {
    id: 'settings', labelKey: 'cat.settings', icon: 'settings',
    items: [
      item({ id: 'settings', labelKey: 'nav.settings', icon: 'settings', route: 'settings.html' }),
      // Spec 040 — the SIX settings deep-links. These were the LAST planned «قريبًا» items in the
      // product: after this flip, sitewide planned === 0 and [data-coming-soon] === 0. Each opens an
      // EXISTING, now-completed tab of the settings hub. Routes carry no `.en` — the hash-aware
      // langRoute() (Spec 035) inserts it, so components/sidebar.js stays 0-diff.
      // Spelling trap: the nav id is settingsCustomiz*ation* and the tab id is `customization`
      // (US). The LEGACY route is /settings/customi*s*ation/ (UK) — carrying that `s` into the hash
      // would yield a dead deep-link that the tab machinery silently ignores.
      item({ id: 'settingsGeneral', labelKey: 'nav.settingsGeneral', icon: 'settings', route: 'settings.html#view=general' }),
      item({ id: 'settingsIntegrations', labelKey: 'nav.settingsIntegrations', icon: 'grid', route: 'settings.html#view=integrations' }),
      item({ id: 'settingsCustomization', labelKey: 'nav.settingsCustomization', icon: 'sparkles', route: 'settings.html#view=customization' }),
      item({ id: 'settingsNotifications', labelKey: 'nav.settingsNotifications', icon: 'bell', route: 'settings.html#view=notifications' }),
      item({ id: 'settingsSecurity', labelKey: 'nav.settingsSecurity', icon: 'lock', route: 'settings.html#view=security' }),
      item({ id: 'settingsUsers', labelKey: 'nav.settingsUsers', icon: 'staff', route: 'settings.html#view=users' }),
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
 * Spec 032 stale-map cleanup: sessionsAnalysis removed (implemented since Spec 026).
 * Spec 034: messages/leads/tasks/announcements removed (now implemented Control routes). */
export const FUTURE_ROUTES = {
  // Spec 035 — studentResult/studentEvaluation promoted to deep-links (student.html#view=results/evaluation);
  // familyCategories folded to families.html; scheduleSearch shipped as its own page. All removed from this map.
  // Spec 039 — materials promoted to a deep-link (library.html#view=materials) and certificateRequests to
  // certificates.html#view=requests; both removed from this map (no standalone page — they open existing tabs).
  // Spec 037 — monthlyReports/dataAnalysis promoted to display-only tabs on reports.html
  // (#view=monthly / #view=analysis); their stale placeholder routes removed from this map.
};

/* build-time guard — a dead link cannot ship */
for (const c of NAV_CATEGORIES) {
  for (const it of catItems(c)) {
    if (it.status === 'implemented' && !it.route) throw new Error(`nav.config: implemented item '${it.id}' needs a route`);
    if (it.status !== 'implemented' && it.route) throw new Error(`nav.config: non-implemented item '${it.id}' must not have a route`);
    if (it.status === 'disabled' && !it.reasonKey) throw new Error(`nav.config: disabled item '${it.id}' needs a reasonKey`);
  }
}

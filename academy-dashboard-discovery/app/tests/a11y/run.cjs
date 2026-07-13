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
  // Spec 029 — the folded Feedback review + Forms/surveys sections in EN dark (drawer/modal
  // machinery is centrally covered by finance/sessions; this scans the new baked content)
  { page: 'reports', lang: 'en', theme: 'dark' },
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
  // Spec 027 — the Courses tab surfaces the enroll/assign/move picker triggers + the availability gate
  { page: 'student', lang: 'ar', theme: 'light', hash: '#view=courses' },
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
  // Spec 028 — the Timetable tab surfaces the availability-editor trigger
  { page: 'teacher', lang: 'ar', theme: 'light', hash: '#view=timetable' },
  { page: 'teacher', lang: 'en', theme: 'light' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light' },
  { page: 'teacher-performance', lang: 'ar', theme: 'dark' },
  { page: 'teacher-performance', lang: 'en', theme: 'light' },
  // Spec 036 — the two new display-only tabs (Sessions KPI · Monthly performance)
  { page: 'teacher-performance', lang: 'ar', theme: 'light', hash: '#view=sessions-kpi' },
  { page: 'teacher-performance', lang: 'ar', theme: 'dark', hash: '#view=sessions-kpi' },
  { page: 'teacher-performance', lang: 'en', theme: 'light', hash: '#view=sessions-kpi' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light', hash: '#view=monthly' },
  { page: 'teacher-performance', lang: 'ar', theme: 'dark', hash: '#view=monthly' },
  { page: 'teacher-performance', lang: 'en', theme: 'light', hash: '#view=monthly' },
  { page: 'teacher-performance', lang: 'ar', theme: 'light', hash: '#view=sessions-kpi', viewport: 'mobile' },
  // Spec 037 — Reports/Analytics display tabs + flagged-035 corrective boards (deep-link views)
  { page: 'reports', lang: 'ar', theme: 'light', hash: '#view=monthly' },
  { page: 'reports', lang: 'ar', theme: 'dark', hash: '#view=monthly' },
  { page: 'reports', lang: 'en', theme: 'light', hash: '#view=monthly' },
  { page: 'reports', lang: 'ar', theme: 'light', hash: '#view=analysis' },
  { page: 'reports', lang: 'en', theme: 'dark', hash: '#view=analysis' },
  { page: 'reports', lang: 'ar', theme: 'light', hash: '#view=monthly', viewport: 'mobile' },
  { page: 'families', lang: 'ar', theme: 'light', hash: '#view=categories' },
  { page: 'families', lang: 'ar', theme: 'dark', hash: '#view=categories' },
  { page: 'families', lang: 'en', theme: 'light', hash: '#view=categories' },
  { page: 'families', lang: 'ar', theme: 'light', hash: '#view=categories', viewport: 'mobile' },
  { page: 'students', lang: 'ar', theme: 'light', hash: '#view=results' },
  { page: 'students', lang: 'ar', theme: 'dark', hash: '#view=results' },
  { page: 'students', lang: 'en', theme: 'light', hash: '#view=results' },
  { page: 'students', lang: 'ar', theme: 'light', hash: '#view=evaluation' },
  { page: 'students', lang: 'en', theme: 'dark', hash: '#view=evaluation' },
  { page: 'students', lang: 'ar', theme: 'light', hash: '#view=evaluation', viewport: 'mobile' },
  // Spec 009 — finance, billing & payments shell (AR light + dark + EN)
  { page: 'finance', lang: 'ar', theme: 'light' },
  { page: 'finance', lang: 'ar', theme: 'dark' },
  { page: 'finance', lang: 'en', theme: 'light' },
  { page: 'finance', lang: 'en', theme: 'dark' },
  // Spec 030 — the folded Salaries + Banks tabs of the finance hub (activate via #view hash)
  { page: 'finance', lang: 'ar', theme: 'light', hash: '#view=salaries' },
  { page: 'finance', lang: 'ar', theme: 'dark', hash: '#view=banks' },
  { page: 'finance', lang: 'en', theme: 'light', hash: '#view=salaries' },
  // Spec 038 — the three new finance tabs (invoices/payments/monthly-invoices) × AR/EN × light/dark
  // + mobile-390 + the invoice-drawer open state on #view=invoices.
  { page: 'finance', lang: 'ar', theme: 'light', hash: '#view=invoices' },
  { page: 'finance', lang: 'ar', theme: 'dark', hash: '#view=invoices' },
  { page: 'finance', lang: 'en', theme: 'light', hash: '#view=invoices' },
  { page: 'finance', lang: 'en', theme: 'dark', hash: '#view=invoices' },
  { page: 'finance', lang: 'ar', theme: 'light', hash: '#view=payments' },
  { page: 'finance', lang: 'ar', theme: 'dark', hash: '#view=payments' },
  { page: 'finance', lang: 'en', theme: 'light', hash: '#view=payments' },
  { page: 'finance', lang: 'en', theme: 'dark', hash: '#view=payments' },
  { page: 'finance', lang: 'ar', theme: 'light', hash: '#view=monthly-invoices' },
  { page: 'finance', lang: 'ar', theme: 'dark', hash: '#view=monthly-invoices' },
  { page: 'finance', lang: 'en', theme: 'light', hash: '#view=monthly-invoices' },
  { page: 'finance', lang: 'en', theme: 'dark', hash: '#view=monthly-invoices' },
  { page: 'finance', lang: 'ar', theme: 'light', hash: '#view=invoices', viewport: 'mobile' },
  { page: 'finance', lang: 'ar', theme: 'light', hash: '#view=invoices', open: '[data-drawer="inv-inv1"]' },
  { page: 'finance', lang: 'en', theme: 'dark', hash: '#view=invoices', open: '[data-drawer="inv-inv1"]' },
  // Spec 026 — the three new admin ops pages (AR light+dark; sessions-analysis as the EN sample)
  { page: 'sessions-analysis', lang: 'ar', theme: 'light' },
  { page: 'sessions-analysis', lang: 'ar', theme: 'dark' },
  { page: 'sessions-analysis', lang: 'en', theme: 'light' },
  { page: 'public-holiday', lang: 'ar', theme: 'light' },
  { page: 'public-holiday', lang: 'ar', theme: 'dark' },
  { page: 'scheduled-actions', lang: 'ar', theme: 'light' },
  { page: 'scheduled-actions', lang: 'ar', theme: 'dark' },
  // the shared modal + drawer machinery is covered by finance (drawer/confirm) + sessions (outcome drawer)
  // Spec 012 — role portal foundation (portal shell surfaces)
  { page: 'portals', lang: 'ar', theme: 'light' },
  { page: 'portals', lang: 'ar', theme: 'dark' },
  { page: 'student-portal', lang: 'ar', theme: 'light' },
  { page: 'student-portal', lang: 'ar', theme: 'dark' },
  { page: 'student-portal', lang: 'en', theme: 'light' },
  { page: 'family-portal', lang: 'ar', theme: 'light' },
  { page: 'family-portal', lang: 'ar', theme: 'dark' },
  { page: 'family-portal', lang: 'en', theme: 'light' },
  { page: 'teacher-portal', lang: 'ar', theme: 'light' },
  { page: 'teacher-portal', lang: 'ar', theme: 'dark' },
  { page: 'teacher-portal', lang: 'en', theme: 'light' },
  // Spec 018 — family-child drill-down (default st1 + a deep-linked switched panel); the compact
  // role homes are re-scanned by the student/family/teacher-portal rows above.
  { page: 'family-child', lang: 'ar', theme: 'light' },
  { page: 'family-child', lang: 'ar', theme: 'dark' },
  { page: 'family-child', lang: 'en', theme: 'light' },
  { page: 'family-child', lang: 'ar', theme: 'light', hash: '#child=st11' },
  // Spec 019 — the six student internal pages (AR light + AR dark; schedule as the EN sample)
  { page: 'student-schedule', lang: 'ar', theme: 'light' },
  { page: 'student-schedule', lang: 'ar', theme: 'dark' },
  { page: 'student-schedule', lang: 'en', theme: 'light' },
  { page: 'student-homework', lang: 'ar', theme: 'light' },
  { page: 'student-homework', lang: 'ar', theme: 'dark' },
  { page: 'student-materials', lang: 'ar', theme: 'light' },
  { page: 'student-materials', lang: 'ar', theme: 'dark' },
  { page: 'student-progress', lang: 'ar', theme: 'light' },
  { page: 'student-progress', lang: 'ar', theme: 'dark' },
  { page: 'student-history', lang: 'ar', theme: 'light' },
  { page: 'student-history', lang: 'ar', theme: 'dark' },
  { page: 'student-profile', lang: 'ar', theme: 'light' },
  { page: 'student-profile', lang: 'ar', theme: 'dark' },
  // Spec 020 — the seven family internal pages (AR light + AR dark; children as the EN sample)
  { page: 'family-children', lang: 'ar', theme: 'light' },
  { page: 'family-children', lang: 'ar', theme: 'dark' },
  { page: 'family-children', lang: 'en', theme: 'light' },
  { page: 'family-schedule', lang: 'ar', theme: 'light' },
  { page: 'family-schedule', lang: 'ar', theme: 'dark' },
  { page: 'family-progress', lang: 'ar', theme: 'light' },
  { page: 'family-progress', lang: 'ar', theme: 'dark' },
  { page: 'family-billing', lang: 'ar', theme: 'light' },
  { page: 'family-billing', lang: 'ar', theme: 'dark' },
  { page: 'family-requests', lang: 'ar', theme: 'light' },
  { page: 'family-requests', lang: 'ar', theme: 'dark' },
  { page: 'family-materials', lang: 'ar', theme: 'light' },
  { page: 'family-materials', lang: 'ar', theme: 'dark' },
  { page: 'family-profile', lang: 'ar', theme: 'light' },
  { page: 'family-profile', lang: 'ar', theme: 'dark' },
  // Spec 025 — the seven teacher internal pages (AR light covers all seven; reports/schedule AR dark; schedule as the EN sample)
  { page: 'teacher-schedule', lang: 'ar', theme: 'light' },
  { page: 'teacher-schedule', lang: 'ar', theme: 'dark' },
  { page: 'teacher-schedule', lang: 'en', theme: 'light' },
  { page: 'teacher-students', lang: 'ar', theme: 'light' },
  { page: 'teacher-outcomes', lang: 'ar', theme: 'light' },
  { page: 'teacher-tasks', lang: 'ar', theme: 'light' },
  { page: 'teacher-reports', lang: 'ar', theme: 'light' },
  { page: 'teacher-reports', lang: 'ar', theme: 'dark' },
  { page: 'teacher-profile', lang: 'ar', theme: 'light' },
  { page: 'teacher-library', lang: 'ar', theme: 'light' },
  // Spec 031 — Users&Staff / Library (materials+books) / Certificates (templates+requests) / Settings hub
  { page: 'staff', lang: 'ar', theme: 'light' },
  { page: 'staff', lang: 'en', theme: 'light' },
  { page: 'staff', lang: 'ar', theme: 'dark' },
  { page: 'library', lang: 'ar', theme: 'light' },
  { page: 'library', lang: 'ar', theme: 'light', hash: '#view=books' },
  { page: 'library', lang: 'en', theme: 'light' },
  { page: 'certificates', lang: 'ar', theme: 'light' },
  { page: 'certificates', lang: 'ar', theme: 'light', hash: '#view=requests' },
  { page: 'certificates', lang: 'ar', theme: 'dark' },
  { page: 'settings', lang: 'ar', theme: 'light', hash: '#view=integrations' },
  { page: 'settings', lang: 'ar', theme: 'dark', hash: '#view=security' },
  { page: 'settings', lang: 'en', theme: 'light', hash: '#view=users' },
  { page: 'settings', lang: 'ar', theme: 'dark', hash: '#view=users' }, // Spec 041 (E-10): settingsUsers had only 1 row; the floor is >=2
  // ── Spec 032 — form-completion freeze rows (additive) ──
  // (a) OPEN-FORM interaction rows: axe scans the page WITH the form drawer open
  // (focus-trap / labelled controls / dialog semantics on the rebuilt FC surfaces)
  { page: 'staff', lang: 'ar', theme: 'light', open: '[data-drawer="staff-add"]' },
  { page: 'family', lang: 'ar', theme: 'light', open: '[data-drawer="fam-edit"]' },
  // Spec 041 — D-1 RELOCATION: the trn-add DRAWER no longer exists; the form is the #view=add TAB panel.
  // Left as-is this row would have SILENTLY PASSED (the runner .catch()es a missing selector) while
  // auditing the directory instead of the form.
  { page: 'teachers', lang: 'ar', theme: 'light', hash: '#view=add' },
  { page: 'teachers', lang: 'en', theme: 'light', hash: '#view=add' },
  // The categories surface had ZERO a11y rows before 041 (only screenshots covered it) — a GAP, not a
  // relocation. Two genuine rows are added to reach the >=2 floor.
  { page: 'teachers', lang: 'ar', theme: 'light', hash: '#view=categories' },
  { page: 'teachers', lang: 'en', theme: 'dark', hash: '#view=categories' },
  { page: 'courses', lang: 'ar', theme: 'light', open: '[data-drawer="crs-add"]' },
  { page: 'groups', lang: 'ar', theme: 'light', open: '[data-drawer="grp-add"]' },
  { page: 'certificates', lang: 'ar', theme: 'light', open: '[data-drawer="cert-tpl"]' },
  { page: 'finance', lang: 'ar', theme: 'light', hash: '#view=banks', open: '[data-drawer="bank-add"]' },
  { page: 'reports', lang: 'ar', theme: 'light', open: '[data-drawer="fb-create"]' },
  { page: 'library', lang: 'ar', theme: 'light', open: '[data-drawer="mat-add"]' },
  // ── Spec 039 — content/certificate deep-linked tabs + drawers (additive; no duplicate of the
  //    existing library/certificates rows at #view=books / #view=requests / mat-add / cert-tpl / mobile) ──
  { page: 'library', lang: 'en', theme: 'light', hash: '#view=materials' },
  { page: 'library', lang: 'ar', theme: 'dark', hash: '#view=materials' },
  { page: 'library', lang: 'en', theme: 'light', hash: '#view=books' },
  { page: 'certificates', lang: 'en', theme: 'light', hash: '#view=requests' },
  { page: 'certificates', lang: 'ar', theme: 'dark', hash: '#view=requests' },
  { page: 'library', lang: 'ar', theme: 'light', open: '[data-drawer="mat-edit"]' },
  { page: 'library', lang: 'ar', theme: 'light', hash: '#view=books', open: '[data-drawer="lib-item"]' },
  { page: 'library', lang: 'ar', theme: 'light', hash: '#view=books', open: '[data-drawer="lib-cats"]' },
  { page: 'certificates', lang: 'ar', theme: 'light', hash: '#view=requests', open: '[data-drawer="cr-cr1"]' },
  { page: 'certificates', lang: 'ar', theme: 'light', hash: '#view=requests', open: '[data-drawer="cert-create"]' },
  { page: 'library', lang: 'en', theme: 'light', hash: '#view=materials', viewport: 'mobile' },
  { page: 'certificates', lang: 'en', theme: 'light', hash: '#view=requests', viewport: 'mobile' },
  // the Materials row delete-confirmation (honest backendRequired confirm — no mutation)
  { page: 'library', lang: 'ar', theme: 'light', hash: '#view=materials', open: '[data-tabpanel="materials"] [data-confirm]' },
  // keyboard tab switching (roving tabindex): focus the deep-linked tab, ArrowRight → the sibling tab
  { page: 'library', lang: 'ar', theme: 'light', hash: '#view=materials', keys: { focus: '#tab-library-materials', seq: ['ArrowRight'] } },
  { page: 'certificates', lang: 'en', theme: 'light', hash: '#view=requests', keys: { focus: '#tab-certificates-requests', seq: ['ArrowLeft'] } },
  { page: 'settings', lang: 'ar', theme: 'light', open: '[data-drawer="head-add"]' },
  { page: 'staff', lang: 'en', theme: 'light', open: '[data-drawer="staff-add"]' },
  { page: 'family', lang: 'ar', theme: 'dark', open: '[data-drawer="fam-edit"]' },
  // the picker-drawer proof (candidate list + honest gate, open state)
  { page: 'teacher', lang: 'ar', theme: 'light', open: '[data-drawer="trn-assign-course"]' },
  // ── Spec 034 — Control Center pages: light/dark + EN + mobile-390 + open-form rows ──
  { page: 'messages', lang: 'ar', theme: 'light' },
  { page: 'messages', lang: 'ar', theme: 'dark' },
  { page: 'messages', lang: 'en', theme: 'light' },
  { page: 'messages', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'messages', lang: 'ar', theme: 'light', open: '[data-drawer="msg-group"]' },
  { page: 'leads', lang: 'ar', theme: 'light' },
  { page: 'leads', lang: 'ar', theme: 'dark' },
  { page: 'leads', lang: 'en', theme: 'light' },
  { page: 'leads', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'leads', lang: 'ar', theme: 'light', open: '[data-drawer="lead-new"]' },
  { page: 'tasks', lang: 'ar', theme: 'light' },
  { page: 'tasks', lang: 'ar', theme: 'dark' },
  { page: 'tasks', lang: 'en', theme: 'light' },
  { page: 'tasks', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'tasks', lang: 'ar', theme: 'light', open: '[data-drawer="task-new"]' },
  { page: 'announcements', lang: 'ar', theme: 'light' },
  { page: 'announcements', lang: 'ar', theme: 'dark' },
  { page: 'announcements', lang: 'en', theme: 'light' },
  { page: 'announcements', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'time-converter', lang: 'ar', theme: 'light' },
  { page: 'time-converter', lang: 'ar', theme: 'dark' },
  { page: 'time-converter', lang: 'en', theme: 'light' },
  { page: 'time-converter', lang: 'ar', theme: 'light', viewport: 'mobile' },
  // ── Spec 035 — Schedule Search: light/dark + EN + mobile-390 + open detail drawer ──
  { page: 'schedule-search', lang: 'ar', theme: 'light' },
  { page: 'schedule-search', lang: 'ar', theme: 'dark' },
  { page: 'schedule-search', lang: 'en', theme: 'light' },
  { page: 'schedule-search', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'schedule-search', lang: 'ar', theme: 'light', open: '[data-drawer="ss-ss1"]' },
  // (b) MOBILE-390 rows for the key surfaces (the matrix had no mobile row before 032)
  { page: 'dashboard', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'sessions', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'students', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'finance', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'reports', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'student-portal', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'family-portal', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'teacher-portal', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'sessions-analysis', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'public-holiday', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'scheduled-actions', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'staff', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'library', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'certificates', lang: 'ar', theme: 'light', viewport: 'mobile' },
  { page: 'settings', lang: 'ar', theme: 'light', viewport: 'mobile' },
  // mobile OPEN-FORM proofs (the .wiz-grid must reflow to one column, controls stay labelled)
  // Spec 041 — D-1 RELOCATION (mobile-390).
  { page: 'teachers', lang: 'ar', theme: 'light', viewport: 'mobile', hash: '#view=add' },
  { page: 'teachers', lang: 'ar', theme: 'light', viewport: 'mobile', hash: '#view=categories' },
  { page: 'students', lang: 'ar', theme: 'light', viewport: 'mobile', open: '[data-drawer="stu-add"]' },
  // (c) dark rows for the newer teacher-internal family members that had none
  { page: 'teacher-students', lang: 'ar', theme: 'dark' },
  { page: 'teacher-outcomes', lang: 'ar', theme: 'dark' },
  { page: 'teacher-tasks', lang: 'ar', theme: 'dark' },
  { page: 'teacher-profile', lang: 'ar', theme: 'dark' },
  { page: 'teacher-library', lang: 'ar', theme: 'dark' },
  // (d) missing-EN rows for internals that only had AR coverage
  { page: 'student-progress', lang: 'en', theme: 'light' },
  { page: 'student-profile', lang: 'en', theme: 'light' },
  { page: 'family-progress', lang: 'en', theme: 'light' },
  { page: 'family-billing', lang: 'en', theme: 'light' },
  { page: 'teacher-outcomes', lang: 'en', theme: 'light' },
  { page: 'teacher-profile', lang: 'en', theme: 'light' },

  // ===== Spec 040 — the six completed settings views (the hub went from 2 form controls to 73) =====
  // general / notifications / customization had ZERO a11y coverage before this spec.
  { page: 'settings', lang: 'ar', theme: 'light', hash: '#view=general' },
  { page: 'settings', lang: 'ar', theme: 'dark', hash: '#view=general' },
  { page: 'settings', lang: 'en', theme: 'light', hash: '#view=general' },
  { page: 'settings', lang: 'ar', theme: 'light', hash: '#view=notifications' },
  { page: 'settings', lang: 'ar', theme: 'dark', hash: '#view=notifications' },
  { page: 'settings', lang: 'en', theme: 'light', hash: '#view=notifications' },
  { page: 'settings', lang: 'ar', theme: 'light', hash: '#view=customization' },
  { page: 'settings', lang: 'ar', theme: 'dark', hash: '#view=customization' },
  { page: 'settings', lang: 'en', theme: 'light', hash: '#view=customization' },
  { page: 'settings', lang: 'en', theme: 'dark', hash: '#view=security' },
  { page: 'settings', lang: 'ar', theme: 'dark', hash: '#view=integrations' },
  { page: 'settings', lang: 'en', theme: 'light', hash: '#view=integrations' },
  // mobile-390: the 47-row notifications matrix and the 11-card integrations grid are the two
  // heaviest surfaces — they must reflow with ZERO horizontal overflow.
  { page: 'settings', lang: 'ar', theme: 'light', viewport: 'mobile', hash: '#view=notifications' },
  { page: 'settings', lang: 'ar', theme: 'light', viewport: 'mobile', hash: '#view=integrations' },
  { page: 'settings', lang: 'en', theme: 'light', viewport: 'mobile', hash: '#view=general' },
  // open provider drawers: focus trap + role=dialog + every field labelled. integ-paymob carries the
  // most sensitive structure rows (5); integ-email carries the two SMTP ones.
  { page: 'settings', lang: 'ar', theme: 'light', hash: '#view=integrations', open: '[data-drawer="integ-paymob"]' },
  { page: 'settings', lang: 'ar', theme: 'light', hash: '#view=integrations', open: '[data-drawer="integ-email"]' },
  { page: 'settings', lang: 'en', theme: 'light', hash: '#view=integrations', open: '[data-drawer="integ-whatsapp"]' },
];

// Spec 032 — mobile viewport for the new rows (the pre-032 matrix is desktop-only)
const VIEWPORTS = { mobile: { width: 390, height: 844 } };

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  let critical = 0, serious = 0;

  for (const s of MATRIX) {
    // Spec 032 — a row may pin a mobile viewport and/or open a form/picker drawer before the scan
    const ctx = await browser.newContext(s.viewport ? { viewport: VIEWPORTS[s.viewport] } : {});
    await ctx.addInitScript((theme) => { localStorage.setItem('academy.theme', theme); }, s.theme);
    const p = await ctx.newPage();
    const file = s.lang === 'en' ? `${s.page}.en.html` : `${s.page}.html`;
    await p.goto(`${BASE}/${file}${s.hash || ''}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(250);
    if (s.open) { await p.click(s.open).catch(() => {}); await p.waitForTimeout(420); }
    // Spec 039 — a row may drive the tablist from the KEYBOARD (roving tabindex) before the scan,
    // so the tab reached by ArrowLeft/ArrowRight is audited in its focused, switched state.
    if (s.keys) {
      await p.focus(s.keys.focus).catch(() => {});
      for (const k of s.keys.seq) { await p.keyboard.press(k).catch(() => {}); await p.waitForTimeout(200); }
      await p.waitForTimeout(300);
    }

    const { violations } = await new AxeBuilder({ page: p })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const crit = violations.filter((v) => v.impact === 'critical');
    const ser = violations.filter((v) => v.impact === 'serious');
    critical += crit.length; serious += ser.length;
    const tag = `${s.page}/${s.lang}/${s.theme}${s.hash ? ' ' + s.hash : ''}${s.viewport ? ' @' + s.viewport : ''}${s.open ? ' open:' + s.open : ''}${s.keys ? ' keys:' + s.keys.seq.join('+') : ''}`;
    if (crit.length) console.error(`  ✗ ${tag}: ${crit.length} CRITICAL — ${crit.map((v) => v.id).join(', ')}`);
    if (ser.length) console.warn(`  ⚠ ${tag}: ${ser.length} serious — ${ser.map((v) => v.id).join(', ')}`);
    if (!crit.length && !ser.length) console.log(`  ✓ ${tag}: clean`);
    await ctx.close();
  }

  await browser.close();
  console.log(`\n[a11y] critical=${critical} serious=${serious}`);
  /* Spec 041 — R-2 (a test-runner STRENGTHENING, not a protected-assert supersession).
   * Until now this runner exited non-zero on `critical > 0` ONLY: `serious` was counted, printed and
   * warned above — but never failed the suite. Every spec from 031 to 040 reported "critical=0
   * serious=0" as a pass condition; the first half was enforced, the second half was an UNENFORCED
   * CLAIM. A production freeze may not certify a result its own suite does not gate.
   * The baseline was demonstrated at 0/0 BEFORE this gate was added, so it tightens an already-true
   * invariant rather than hiding an existing failure. No threshold, no allowlist, no suppression. */
  if (critical > 0 || serious > 0) {
    console.error(`A11Y FAILED: ${critical} critical + ${serious} serious violation(s) — both are gated since Spec 041 (R-2)`);
    process.exit(1);
  }
  process.exit(0);
})();

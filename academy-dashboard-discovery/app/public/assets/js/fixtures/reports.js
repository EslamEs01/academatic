/* Spec 008 — Academic Reports roll-up + honest category list.
 *
 * EVERY number here is a DISPLAY-ONLY roll-up of an existing fixture summary — there is
 * NO fabricated metric, NO computed score/rank/percentile/trend/chart, and NO finance
 * figure anywhere. The legacy placeholder cards (the money card, the
 * permission-locked `trainers` card, and the dead `route:'#'` cards) are REMOVED.
 *
 * `REPORTS` keeps its export name + array shape so `dashboard.js` (which imports REPORTS
 * and renders `reportCard(r, { hasPermission })`) keeps working unchanged — its Reports
 * section now shows the honest category cards with real source links. */
import { OUTCOME_SUMMARY } from './attendance.js';
import { STATUS_SUMMARY } from './status-summary.js';
import { SESSIONS } from './sessions.js';
import { GROUP_SUMMARY } from './groups.js';
import { COURSES } from './courses.js';
import { TEACHERS_NEEDING_FOLLOWUP } from './teachers.js';
import { FAMILIES } from './families.js';
import { STUDENTS } from './students.js';

/* session-status count by id (STATUS_SUMMARY is [{ statusId, count }]) */
const byStatus = (id) => (STATUS_SUMMARY.find((s) => s.statusId === id) || { count: 0 }).count;

/* active courses — same expression the catalogue uses */
const activeCourses = COURSES.rows.filter((c) => c.statusId === 'active').length;

/* families with an attention hint */
const familiesAttention = FAMILIES.rows.filter((f) => f.attention).length;

/* students needing follow-up — REUSED VERBATIM from dashboard.js peopleSignal():
 * a student counts if its family is flagged `attention`, or its own lifecycle is
 * suspended/stopped. No new rule. */
const attnFamilies = new Set(FAMILIES.rows.filter((f) => f.attention).map((f) => f.id));
const studentsNeedFollowUp = STUDENTS.rows.filter(
  (s) => attnFamilies.has(s.familyId) || s.statusId === 'suspended' || s.statusId === 'stopped',
).length;

/**
 * The single display-only roll-up object. Every field is an existing fixture count;
 * the Reports shell and the dashboard chips therefore show the SAME numbers.
 */
export const REPORT_SUMMARY = {
  sessions: {
    total: SESSIONS.total,
    completed: byStatus('completed'),
    upcoming: byStatus('upcoming'),
    live: byStatus('live'),
    cancelled: byStatus('cancelled'),
    byStatus: STATUS_SUMMARY,
  },
  outcomes: {
    total: OUTCOME_SUMMARY.total,
    attended: OUTCOME_SUMMARY.attended,
    studentAbsent: OUTCOME_SUMMARY.studentAbsent,
    teacherAbsent: OUTCOME_SUMMARY.teacherAbsent,
    cancelledOrRescheduled: OUTCOME_SUMMARY.cancelledOrRescheduled,
    needsFollowUp: OUTCOME_SUMMARY.needsFollowUp,
  },
  courses: { active: activeCourses },
  groups: {
    total: GROUP_SUMMARY.total,
    active: GROUP_SUMMARY.active,
    needsAttention: GROUP_SUMMARY.needsAttention,
  },
  teachers: {
    needFollowUp: TEACHERS_NEEDING_FOLLOWUP,
    teacherAbsent: OUTCOME_SUMMARY.teacherAbsent,
    studentAbsentInTeacherSessions: OUTCOME_SUMMARY.studentAbsent,
  },
  families: { attention: familiesAttention },
  students: { needFollowUp: studentsNeedFollowUp },
};

/**
 * Honest report-category cards. `available` cards carry a real `route` to an implemented
 * page; the planned/backendRequired advanced reports carry NO route (rendered as
 * disabled-with-reason cards, never a dead `#` link). `area` drives the card filter.
 */
export const REPORTS = [
  {
    id: 'attendance', area: 'attendance',
    titleKey: 'rep.cat.attendance.title', descKey: 'rep.cat.attendance.desc',
    icon: 'clipboard-check', tone: 'primary', availability: 'available', route: 'attendance.html',
  },
  {
    id: 'sessions', area: 'sessions',
    titleKey: 'rep.cat.sessions.title', descKey: 'rep.cat.sessions.desc',
    icon: 'sessions', tone: 'sky', availability: 'available', route: 'sessions.html',
  },
  {
    id: 'coursesGroups', area: 'coursesGroups',
    titleKey: 'rep.cat.coursesGroups.title', descKey: 'rep.cat.coursesGroups.desc',
    icon: 'curricula', tone: 'teal', availability: 'available', route: 'courses.html',
  },
  {
    id: 'teachers', area: 'teachers',
    titleKey: 'rep.cat.teachers.title', descKey: 'rep.cat.teachers.desc',
    icon: 'trainers', tone: 'success', availability: 'available', route: 'teacher-performance.html',
  },
  {
    id: 'studentsFamilies', area: 'studentsFamilies',
    titleKey: 'rep.cat.studentsFamilies.title', descKey: 'rep.cat.studentsFamilies.desc',
    icon: 'students', tone: 'coral', availability: 'available', route: 'students.html',
  },
  /* advanced reports — honestly labeled, no route (disabled-with-reason, NOT dead links) */
  {
    id: 'monthlyReports', area: 'advanced',
    titleKey: 'rep.cat.monthly.title', descKey: 'rep.cat.monthly.desc',
    icon: 'calendar', tone: 'muted', availability: 'planned', disabledReasonKey: 'rep.planned.monthlyReason',
  },
  {
    id: 'dataAnalysis', area: 'advanced',
    titleKey: 'rep.cat.analysis.title', descKey: 'rep.cat.analysis.desc',
    icon: 'layers', tone: 'muted', availability: 'backendRequired', disabledReasonKey: 'rep.planned.analysisReason',
  },
];

/* Django-parity alias (the template iterates `report_categories`). */
export const REPORT_CATEGORIES = REPORTS;

/* ── Spec 037 — Monthly Reports board (reports.html#view=monthly) ──────────────
 * DISPLAY-ONLY authored monthly roll-ups. Every `count` is a hand-authored fixture
 * literal (NOT a computed aggregate), every status is a categorical signal id (reuses
 * the reportSignalChip vocabulary). No money figure, no computed metric/percentage,
 * no chart. Grouped by month for scannability (no live filterBar — the page already
 * owns one filterBar in the overview tab and enhance.js has a single global
 * [data-no-results], so the new tab stays a pure display board). */
export const MONTHLY_REPORT_MONTHS = ['may', 'apr', 'mar'];
export const MONTHLY_SUMMARY = [
  { icon: 'sessions', tone: 'sky', value: 142, labelKey: 'rep.monthly.sum.sessions' },
  { icon: 'clipboard-check', tone: 'success', value: 128, labelKey: 'rep.monthly.sum.attended' },
  { icon: 'alert-triangle', tone: 'amber', value: 6, labelKey: 'rep.monthly.sum.followUp' },
];
export const MONTHLY_REPORTS = [
  { id: 'mr-may-1', monthId: 'may', areaKey: 'rep.cat.sessions.title', count: 142, statusId: 'healthy', noteKey: 'rep.monthly.n.sessMay' },
  { id: 'mr-may-2', monthId: 'may', areaKey: 'rep.cat.attendance.title', count: 128, statusId: 'healthy', noteKey: 'rep.monthly.n.attMay' },
  { id: 'mr-may-3', monthId: 'may', areaKey: 'rep.cat.studentsFamilies.title', count: 6, statusId: 'needsFollowUp', noteKey: 'rep.monthly.n.stuMay' },
  { id: 'mr-apr-1', monthId: 'apr', areaKey: 'rep.cat.sessions.title', count: 135, statusId: 'healthy', noteKey: 'rep.monthly.n.sessApr' },
  { id: 'mr-apr-2', monthId: 'apr', areaKey: 'rep.cat.teachers.title', count: 3, statusId: 'needsFollowUp', noteKey: 'rep.monthly.n.tchApr' },
  { id: 'mr-apr-3', monthId: 'apr', areaKey: 'rep.cat.coursesGroups.title', count: 18, statusId: 'healthy', noteKey: 'rep.monthly.n.crsApr' },
  { id: 'mr-mar-1', monthId: 'mar', areaKey: 'rep.cat.sessions.title', count: 130, statusId: 'healthy', noteKey: 'rep.monthly.n.sessMar' },
  { id: 'mr-mar-2', monthId: 'mar', areaKey: 'rep.cat.attendance.title', count: 121, statusId: 'healthy', noteKey: 'rep.monthly.n.attMar' },
];

/* ── Spec 037 — Data Analysis board (reports.html#view=analysis) ───────────────
 * DISPLAY-ONLY authored insight cards. `count` = authored literal; `trendId` =
 * an AUTHORED CATEGORICAL label (improving/steady/declining) — NOT a computed
 * trend/percentage. No analytics engine, no chart/<canvas>, no finance figure,
 * no computed metric/rank/score. Finance-flavoured analysis (expenses/invoices)
 * is deliberately excluded → owned by Spec 038 (reports body stays finance-free). */
export const DATA_INSIGHTS = [
  { id: 'da1', areaKey: 'rep.cat.sessions.title', count: 142, trendId: 'improving', statusId: 'healthy', noteKey: 'rep.analysis.n.sessions' },
  { id: 'da2', areaKey: 'rep.cat.attendance.title', count: 128, trendId: 'steady', statusId: 'healthy', noteKey: 'rep.analysis.n.attendance' },
  { id: 'da3', areaKey: 'rep.cat.coursesGroups.title', count: 18, trendId: 'improving', statusId: 'healthy', noteKey: 'rep.analysis.n.courses' },
  { id: 'da4', areaKey: 'rep.cat.teachers.title', count: 12, trendId: 'steady', statusId: 'healthy', noteKey: 'rep.analysis.n.teachers' },
  { id: 'da5', areaKey: 'rep.cat.studentsFamilies.title', count: 6, trendId: 'declining', statusId: 'needsFollowUp', noteKey: 'rep.analysis.n.students' },
];

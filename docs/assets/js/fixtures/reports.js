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

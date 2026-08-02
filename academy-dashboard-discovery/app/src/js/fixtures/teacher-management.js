/* Spec 028 — admin teacher deep-management picker candidates (display-only).
 * Candidate lists shown INSIDE the assign-teacher / assign-course / assign-group /
 * category-members drawers and the availability-window editor. Each entry reuses an
 * EXISTING authored entity's localized name + one meta label — NO new content, NO
 * computed value/score/rating, NO pay/salary/rate figure, and NO persisted selection.
 * Every picker is a read-only preview; the final Assign/Save ends at a backendRequired
 * gate (never mutates a teacher/course/group/schedule). Pure data — imports fixtures only. */
import { TEACHERS } from './teachers.js';
import { COURSES } from './courses.js';
import { GROUPS } from './groups.js';

const asName = (nameKey, metaKey) => ({ nameKey, metaKey });

/* single-teacher candidates (course.html / group.html assign-teacher pickers) — name + subject */
export const ASSIGN_TEACHERS = TEACHERS.rows
  .filter((tr) => tr.statusId === 'active')
  .slice(0, 5)
  .map((tr) => asName(tr.nameKey, tr.subjectsKeys[0]));

/* candidate courses / groups (teacher.html assign-course / assign-group pickers) */
export const ASSIGN_COURSES = COURSES.rows
  .filter((c) => c.statusId === 'active')
  .slice(0, 4)
  .map((c) => asName(c.titleKey, c.subjectKey));

export const ASSIGN_GROUPS = GROUPS.rows
  .filter((g) => g.statusId === 'active' || g.statusId === 'trial')
  .slice(0, 4)
  .map((g) => asName(g.nameKey, g.levelKey));

/* teacher categories (display-only; the teacherCategories nav item stays planned — no page) */
export const TEACHER_CATEGORIES = [
  { id: 'senior', nameKey: 'trn.cat.name.senior', count: 3 },
  { id: 'associate', nameKey: 'trn.cat.name.associate', count: 3 },
  { id: 'trial', nameKey: 'trn.cat.name.trial', count: 2 },
];

/* assign-members candidate list for a teacher category */
export const CATEGORY_MEMBERS = TEACHERS.rows
  .slice(0, 5)
  .map((tr) => asName(tr.nameKey, tr.subjectsKeys[0]));

/* recurring weekly availability windows (day-pair + time-pair; display-only, NO recurrence/exception) */
export const AVAILABILITY_WINDOWS = [
  { dayFromKey: 'sch.day.sun', dayToKey: 'sch.day.tue', timeFrom: '16:00', timeTo: '19:00' },
  { dayFromKey: 'sch.day.wed', dayToKey: 'sch.day.thu', timeFrom: '17:00', timeTo: '20:00' },
  { dayFromKey: 'sch.day.sat', dayToKey: 'sch.day.sat', timeFrom: '10:00', timeTo: '13:00' },
];

/* Spec 043 — teacher capability/notification POLICY (C02-04/C02-05): structure-only preview data.
 * Academic capabilities (legacy can_chat/can_see_library/can_edit_schedule/can_edit_class) + communication
 * events × channels. Display-only authored labels — NO toggle, NO value slot, NO pay/salary/rate figure
 * (the legacy salary_* notification row is EXCLUDED — teacher pay-free), NO guardian/student contact,
 * NO locality. Real capability authorization + channel delivery stay FUTURE_BACKEND. */
export const TEACHER_CAPABILITY_POLICY = {
  academic: [
    { k: 'chat', status: 'on' },
    { k: 'library', status: 'on' },
    { k: 'editSchedule', status: 'off' },
    { k: 'editClass', status: 'off' },
  ],
  comm: [
    { k: 'coursesUpdate', channels: ['whatsapp', 'email'] },
    { k: 'classReminders', channels: ['whatsapp', 'email'] },
    { k: 'classUpdates', channels: ['whatsapp', 'email'] },
    // NO salary row — teacher pay-free (legacy salary_by_whatsapp / salary_by_email EXCLUDED forever)
  ],
};

/* Group (cohort) fixture (Spec 006). Each row = one class/cohort that DELIVERS a course:
 * one teacher + many students + a shared weekly schedule. All cross-references are
 * resolved BY ID at render time (display-only — NO FK / scheduling / enrolment engine):
 *   courseId        → fixtures/courses.js   (each group delivers exactly one course)
 *   teacherId       → fixtures/teachers.js  (one teacher)
 *   studentIds[]    → fixtures/students.js  (the roster)
 *   scheduleBlockIds[] → fixtures/schedule.js (Spec 003 — the Timetable tab agenda)
 *   outcomeIds[]    → fixtures/attendance.js (Spec 005 — the Sessions & Outcomes tab)
 * `statusId` = the group-status map; `needsAttention` = a display flag (not a status).
 * This module imports NOTHING (pure data) so it never creates an import cycle. */

const g = (r) => ({ notesKey: 'grp.notes', needsAttention: false, ...r });

export const GROUPS = {
  rows: [
    g({ id: 'grp1', nameKey: 'data.grp.math',        courseId: 'c1', teacherId: 'sara',     levelKey: 'data.crs.lvl.l2',         statusId: 'active',    studentIds: ['st1', 'st6', 'st11', 'st13'], scheduleBlockIds: ['b14', 'b4'],  outcomeIds: ['out1', 'out11'],         schedule: { dayId: 'sun', time: '09:00' }, capacity: 16, enrolledCount: 14, accent: 'violet' }),
    g({ id: 'grp2', nameKey: 'data.grp.prog',        courseId: 'c3', teacherId: 'layan',    levelKey: 'data.crs.lvl.l1',         statusId: 'active',    needsAttention: true, studentIds: ['st3', 'st9', 'st14'],   scheduleBlockIds: ['b1', 'b13'],  outcomeIds: ['out3', 'out9', 'out13'], schedule: { dayId: 'mon', time: '08:00' }, capacity: 14, enrolledCount: 13, accent: 'teal' }),
    g({ id: 'grp3', nameKey: 'data.grp.eng',         courseId: 'c5', teacherId: 'nora',     levelKey: 'data.crs.lvl.l2',         statusId: 'full',      studentIds: ['st5', 'st2', 'st7', 'st4'],   scheduleBlockIds: ['b3', 'b12'],  outcomeIds: ['out7', 'out12'],         schedule: { dayId: 'sun', time: '12:30' }, capacity: 16, enrolledCount: 16, accent: 'coral' }),
    g({ id: 'grp4', nameKey: 'data.grp.arabicA',     courseId: 'c2', teacherId: 'mohammed', levelKey: 'data.crs.lvl.l1',         statusId: 'active',    studentIds: ['st2', 'st7'],                 scheduleBlockIds: ['b15', 'b2'],  outcomeIds: ['out2'],                  schedule: { dayId: 'sun', time: '10:30' }, capacity: 25, enrolledCount: 22, accent: 'amber' }),
    g({ id: 'grp5', nameKey: 'data.grp.arabicTrial', courseId: 'c2', teacherId: 'reem',     levelKey: 'data.crs.lvl.foundation', statusId: 'trial',     studentIds: ['st8'],                        scheduleBlockIds: ['b16'],        outcomeIds: ['out6'],                  schedule: { dayId: 'sat', time: '14:00' }, capacity: 12, enrolledCount: 6,  accent: 'sky' }),
    g({ id: 'grp6', nameKey: 'data.grp.mathAdv',     courseId: 'c1', teacherId: 'huda',     levelKey: 'data.crs.lvl.l3',         statusId: 'paused',    needsAttention: true, studentIds: ['st4', 'st12'],          scheduleBlockIds: ['b6'],         outcomeIds: ['out4'],                  schedule: { dayId: 'mon', time: '11:00' }, capacity: 12, enrolledCount: 5,  accent: 'violet' }),
    g({ id: 'grp7', nameKey: 'data.grp.scienceA',    courseId: 'c6', teacherId: 'khalid',   levelKey: 'data.crs.lvl.foundation', statusId: 'completed', studentIds: ['st12', 'st10'],               scheduleBlockIds: ['b5'],         outcomeIds: ['out8', 'out14'],         schedule: { dayId: 'mon', time: '14:00' }, capacity: 13, enrolledCount: 13, accent: 'sky' }),
  ],
};

const rows = GROUPS.rows;
export const GROUP_BY_ID = Object.fromEntries(rows.map((r) => [r.id, r]));
export const groupsOfCourse = (courseId) => rows.filter((r) => r.courseId === courseId);
export const groupsOfTeacher = (teacherId) => rows.filter((r) => r.teacherId === teacherId);
export const groupsOfStudent = (studentId) => rows.filter((r) => r.studentIds.includes(studentId));

/* derived counts — drives the Groups tiles + the dashboard signal (display-only) */
export const GROUP_SUMMARY = {
  total: rows.length,
  active: rows.filter((r) => r.statusId === 'active').length,
  trial: rows.filter((r) => r.statusId === 'trial').length,
  full: rows.filter((r) => r.statusId === 'full').length,
  needsAttention: rows.filter((r) => r.needsAttention).length,
};

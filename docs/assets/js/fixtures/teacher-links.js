/* Spec 007 — per-teacher resolvers (display-only id-joins; the single source for the
 * teacher↔course/group/student/schedule/outcome graph). NO finance, NO computed score —
 * every value here is a fixture count or a resolved list (no rating, no ordering).
 * `groupsOfTeacher` already lives
 * in groups.js; `outcomesOfTeacher` in attendance.js — re-exported here for one import. */
import { COURSES } from './courses.js';
import { groupsOfTeacher } from './groups.js';
import { STUDENT_BY_ID } from './students.js';
import { SCHEDULE_WEEK } from './schedule.js';
import { outcomesOfTeacher } from './attendance.js';

export { groupsOfTeacher, outcomesOfTeacher };

export const coursesOfTeacher = (id) => COURSES.rows.filter((c) => c.teacherIds.includes(id));
export const scheduleOfTeacher = (id) => SCHEDULE_WEEK.flatMap((d) => d.blocks).filter((b) => b.trainer && b.trainer.id === id);

export function studentsOfTeacher(id) {
  const ids = new Set();
  groupsOfTeacher(id).forEach((g) => (g.studentIds || []).forEach((sid) => ids.add(sid)));
  return [...ids].map((sid) => STUDENT_BY_ID[sid]).filter(Boolean);
}

/* the per-teacher count breakdown — raw fixture COUNTS only (no score/rank/percentile) */
export function teacherCounts(id) {
  const outs = outcomesOfTeacher(id);
  const by = (o) => outs.filter((r) => r.outcomeId === o).length;
  const blocks = scheduleOfTeacher(id);
  return {
    courses: coursesOfTeacher(id).length,
    groups: groupsOfTeacher(id).length,
    students: studentsOfTeacher(id).length,
    upcoming: blocks.filter((b) => b.statusId === 'upcoming' || b.statusId === 'live').length,
    blocks: blocks.length,
    completed: by('attended'),
    teacherAbsent: by('teacherAbsent'),
    studentAbsent: by('studentAbsent'),
    cancelled: by('cancelled') + by('rescheduled'),
  };
}

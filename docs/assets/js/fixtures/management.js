/* Spec 027 — deep-management picker candidates (display-only).
 * These are the candidate lists shown INSIDE the enroll / assign / move / add-students
 * drawers on the admin management pages. Each entry reuses an EXISTING authored entity's
 * localized name + one meta label (subject/level) — there is NO new content, NO computed
 * value/score, NO pay figure, and NO persisted selection. The pickers are a read-only
 * preview of what COULD be linked; every final Enroll/Assign/Move/Add ends at a
 * backendRequired gate (never mutates the roster). Pure data — imports fixtures only. */
import { COURSES } from './courses.js';
import { GROUPS } from './groups.js';
import { STUDENTS } from './students.js';

const asName = (nameKey, metaKey) => ({ nameKey, metaKey });

/* enroll-in-course picker (student.html) — a slice of the active catalogue */
export const ENROLL_COURSES = COURSES.rows
  .filter((c) => c.statusId === 'active')
  .slice(0, 4)
  .map((c) => asName(c.titleKey, c.subjectKey));

/* assign-to-group picker (student.html) — active/trial cohorts */
export const ASSIGN_GROUPS = GROUPS.rows
  .filter((g) => g.statusId === 'active' || g.statusId === 'trial')
  .slice(0, 4)
  .map((g) => asName(g.nameKey, g.levelKey));

/* move-between-groups picker (student.html) — candidate target cohorts (not full) */
export const MOVE_GROUPS = GROUPS.rows
  .filter((g) => g.statusId !== 'full')
  .slice(0, 3)
  .map((g) => asName(g.nameKey, g.levelKey));

/* add-students picker (course.html / group.html) — a slice of the directory */
export const ADD_STUDENTS = STUDENTS.rows
  .slice(0, 5)
  .map((s) => asName(s.nameKey, s.levelKey));

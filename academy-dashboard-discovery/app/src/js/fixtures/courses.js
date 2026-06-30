/* Courses directory (fixture). A Course = a SUBJECT OFFERING (not a 1:1 enrolment —
 * that lives on the student). Spec 006 enriches each row with the cohorts that deliver
 * it (groupIds via groupsOfCourse), assigned teachers, a level ladder with per-level
 * counts (for the display-only Learning Path), display counts, and an optional attention
 * hint. The catalogue status map now lives in components/course-status.js (adds paused);
 * re-exported here so existing imports keep working. */
import { COURSE_STATUS } from '../components/course-status.js';
import { groupsOfCourse } from './groups.js';
export { COURSE_STATUS };

/* a level ladder: [key, studentsCount]; `cur` marks the current level */
const ladder = (cur, ...steps) => steps.map(([k, n]) => ({ key: k, labelKey: `data.crs.lvl.${k}`, studentsCount: n, isCurrent: k === cur }));

export const COURSES = {
  rows: [
    { id: 'c1', titleKey: 'data.crs.math.title',    subject: 'math',        subjectKey: 'data.subj.math',        levelKey: 'data.crs.lvl.l2',         statusId: 'active',   icon: 'reports',      accent: 'primary', enrolled: 142, sessions: 38, upcoming: 6, teacherIds: ['sara', 'huda'],     certificates: 12, attention: { kind: 'attention', labelKey: 'group.status.needsAttention' }, notesKey: 'crs.notes', levels: ladder('l2', ['foundation', 34], ['l1', 48], ['l2', 42], ['l3', 18]) },
    { id: 'c2', titleKey: 'data.crs.arabic.title',  subject: 'arabic',      subjectKey: 'data.subj.arabic',      levelKey: 'data.crs.lvl.l1',         statusId: 'active',   icon: 'curricula',    accent: 'sky',     enrolled: 118, sessions: 31, upcoming: 4, teacherIds: ['mohammed', 'reem'], certificates: 9,  notesKey: 'crs.notes', levels: ladder('l1', ['foundation', 40], ['l1', 50], ['l2', 28]) },
    { id: 'c3', titleKey: 'data.crs.prog.title',    subject: 'programming', subjectKey: 'data.subj.programming', levelKey: 'data.crs.lvl.l1',         statusId: 'active',   icon: 'graduation-cap', accent: 'teal',  enrolled: 96,  sessions: 27, upcoming: 3, teacherIds: ['layan'],            certificates: 6,  notesKey: 'crs.notes', levels: ladder('l1', ['l1', 52], ['l2', 30], ['advanced', 14]) },
    { id: 'c4', titleKey: 'data.crs.physics.title', subject: 'physics',     subjectKey: 'data.subj.physics',     levelKey: 'data.crs.lvl.l3',         statusId: 'draft',    icon: 'sparkles',     accent: 'amber',   enrolled: 0,   sessions: 0,  upcoming: 0, teacherIds: ['abdullah'],         certificates: 0,  notesKey: 'crs.notes', levels: ladder('l3', ['l3', 0], ['advanced', 0]) },
    { id: 'c5', titleKey: 'data.crs.english.title', subject: 'english',     subjectKey: 'data.subj.english',     levelKey: 'data.crs.lvl.l2',         statusId: 'active',   icon: 'students',     accent: 'coral',   enrolled: 134, sessions: 35, upcoming: 5, teacherIds: ['nora'],             certificates: 11, notesKey: 'crs.notes', levels: ladder('l2', ['foundation', 38], ['l1', 44], ['l2', 36], ['l3', 16]) },
    { id: 'c6', titleKey: 'data.crs.science.title', subject: 'science',     subjectKey: 'data.subj.science',     levelKey: 'data.crs.lvl.foundation', statusId: 'archived', icon: 'trending-up',  accent: 'success', enrolled: 41,  sessions: 12, upcoming: 0, teacherIds: ['khalid'],           certificates: 3,  notesKey: 'crs.notes', levels: ladder('foundation', ['foundation', 28], ['l1', 13]) },
  ],
};

/* derived display counts — groups resolve from the groups fixture (coherence: every
 * Course.groupsCount === groupsOfCourse(id).length); studentsCount = the headline enrolled. */
COURSES.rows.forEach((c) => {
  const gs = groupsOfCourse(c.id);
  c.groupIds = gs.map((x) => x.id);
  c.groupsCount = gs.length;
  c.teachersCount = c.teacherIds.length;
  c.studentsCount = c.enrolled;
});

export const COURSE_BY_ID = Object.fromEntries(COURSES.rows.map((c) => [c.id, c]));
export const courseOf = (id) => COURSE_BY_ID[id];

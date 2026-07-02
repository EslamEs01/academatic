/* Students directory (fixture, EXTENDED for Spec 004).
 * Each student now carries a real `familyId` (replacing the bare guardian string)
 * + academic fields: enrollments, group ids, upcoming session refs (schedule block
 * ids), a results summary (progress + certificates), and the monthly evaluation
 * rubric. The lifecycle status (active/trial/suspended/stopped/inactive) resolves
 * through components/family-status.js — distinct from the SESSION status map.
 * All display-only; NO grade/enrollment/evaluation engine. */

/* lightweight learning groups (R28 — the full Groups module stays planned) */
export const STUDENT_GROUPS = [
  { id: 'grp1', nameKey: 'data.grp.math', teacherNameKey: 'data.t.sara' },
  { id: 'grp2', nameKey: 'data.grp.prog', teacherNameKey: 'data.t.layan' },
  { id: 'grp3', nameKey: 'data.grp.eng', teacherNameKey: 'data.t.nora' },
];
export const GROUP_BY_ID = Object.fromEntries(STUDENT_GROUPS.map((g) => [g.id, g]));

/* subject → course / teacher / schedule-block / certificate maps (all existing keys) */
const SUBJ_COURSE = { math: 'data.crs.math.title', arabic: 'data.crs.arabic.title', programming: 'data.crs.prog.title', physics: 'data.crs.physics.title', english: 'data.crs.english.title', science: 'data.crs.science.title' };
const SUBJ_TEACHER = { math: { nameKey: 'data.t.sara', accent: 'violet' }, arabic: { nameKey: 'data.t.mohammed', accent: 'amber' }, programming: { nameKey: 'data.t.layan', accent: 'teal' }, physics: { nameKey: 'data.t.abdullah', accent: 'success' }, english: { nameKey: 'data.t.nora', accent: 'coral' }, science: { nameKey: 'data.t.khalid', accent: 'sky' } };
const SUBJ_BLOCKS = { math: ['b14', 'b4', 'b6'], arabic: ['b15', 'b2', 'b7'], programming: ['b1', 'b13', 'b11'], physics: ['b8', 'b10'], english: ['b3', 'b12'], science: ['b5'] };
const CERT_KEY = { math: 'data.cert.math', arabic: 'data.cert.arabic', programming: 'data.cert.prog', physics: 'data.cert.physics', english: 'data.cert.english', science: 'data.cert.science' };
const SECONDARY = { math: 'physics', arabic: 'english', programming: 'math', physics: 'science', english: 'arabic', science: 'math' };

const ratingFor = (p) => (p >= 80 ? 'excellent' : p >= 58 ? 'good' : p >= 32 ? 'sometimes' : 'rarely');
const band = (p) => (p >= 70 ? 'high' : p >= 40 ? 'mid' : 'low');

const enr = (sid, n, subject, statusId, progress, cert = false) => ({
  id: `${sid}-e${n}`, courseTitleKey: SUBJ_COURSE[subject],
  teacherNameKey: SUBJ_TEACHER[subject].nameKey, accent: SUBJ_TEACHER[subject].accent,
  statusId, progress, ...(cert ? { certificateKey: CERT_KEY[subject] } : {}),
});

/* derive a coherent academic record from the student's subject / level / progress */
function academic(s, i) {
  const enrollments = [enr(s.id, 1, s.subject, 'active', s.progress, s.progress >= 85)];
  if (s.groupIds && s.groupIds.length) enrollments[0].groupId = s.groupIds[0]; // surface the group chip on the primary course
  if (s.enrolled >= 2) {
    const secSubj = SECONDARY[s.subject];
    const secProg = Math.max(20, Math.min(100, s.progress + 22 - (i % 2) * 12));
    const secStatus = secProg >= 100 ? 'completed' : (s.statusId === 'suspended' || s.statusId === 'stopped' ? 'paused' : 'active');
    enrollments.push(enr(s.id, 2, secSubj, secStatus, secProg, secProg >= 90));
  }
  if (s.enrolled >= 3) {
    const tertSubj = ['arabic', 'english', 'science'].find((x) => x !== s.subject && x !== SECONDARY[s.subject]) || 'arabic';
    enrollments.push(enr(s.id, 3, tertSubj, 'completed', 100, true));
  }
  const courses = enrollments.map((e) => ({ courseTitleKey: e.courseTitleKey, progress: e.progress }));
  const certificates = enrollments.filter((e) => e.certificateKey).map((e) => ({ titleKey: e.certificateKey, dateKey: 'data.cert.date', statusId: 'issued' }));
  const b = band(s.progress);
  return {
    enrollments,
    upcomingSessionIds: (SUBJ_BLOCKS[s.subject] || []).slice(0, 3),
    results: { levelKey: s.levelKey, termKey: 'data.res.term', overallProgress: s.progress, courses, certificates },
    evaluation: {
      monthKey: 'data.eval.month',
      criteria: [
        { key: 'learningProgress', ratingId: ratingFor(s.progress) },
        { key: 'focus', ratingId: ratingFor(s.progress - 6) },
        { key: 'homework', ratingId: ratingFor(s.progress + 6) },
        { key: 'punctuality', ratingId: ratingFor(s.progress + 14) },
      ],
      achievementsKey: `data.eval.ach.${b}`,
      objectivesKey: `data.eval.obj.${b}`,
      approved: s.progress >= 70,
    },
    notesKey: `data.stud.note.${b}`,
  };
}

const s = (o) => ({ ...o, groupIds: o.groupIds || [], levelKey: `data.crs.lvl.${o.level}`, subjectKey: `data.subj.${o.subject}` });

const BASE = [
  s({ id: 'st1',  nameKey: 'data.stud.a.name', accent: 'violet',  statusId: 'active',    level: 'l2',         progress: 78, enrolled: 3, subject: 'math',        familyId: 'fam1', groupIds: ['grp1'] }),
  s({ id: 'st2',  nameKey: 'data.stud.b.name', accent: 'teal',    statusId: 'active',    level: 'l3',         progress: 64, enrolled: 2, subject: 'arabic',      familyId: 'fam2' }),
  s({ id: 'st3',  nameKey: 'data.stud.c.name', accent: 'amber',   statusId: 'trial',     level: 'l1',         progress: 22, enrolled: 1, subject: 'programming', familyId: 'fam3', groupIds: ['grp2'] }),
  s({ id: 'st4',  nameKey: 'data.stud.d.name', accent: 'sky',     statusId: 'active',    level: 'advanced',   progress: 91, enrolled: 4, subject: 'physics',     familyId: 'fam4' }),
  s({ id: 'st5',  nameKey: 'data.stud.e.name', accent: 'success', statusId: 'suspended', level: 'l2',         progress: 45, enrolled: 2, subject: 'english',     familyId: 'fam5', groupIds: ['grp3'] }),
  s({ id: 'st6',  nameKey: 'data.stud.f.name', accent: 'violet',  statusId: 'active',    level: 'foundation', progress: 33, enrolled: 1, subject: 'science',     familyId: 'fam1' }),
  s({ id: 'st7',  nameKey: 'data.stud.g.name', accent: 'coral',   statusId: 'inactive',  level: 'l1',         progress: 12, enrolled: 1, subject: 'math',        familyId: 'fam2' }),
  s({ id: 'st8',  nameKey: 'data.stud.h.name', accent: 'teal',    statusId: 'trial',     level: 'l3',         progress: 70, enrolled: 3, subject: 'arabic',      familyId: 'fam3' }),
  s({ id: 'st9',  nameKey: 'data.stud.i.name', accent: 'amber',   statusId: 'trial',     level: 'l1',         progress: 18, enrolled: 1, subject: 'programming', familyId: 'fam6', groupIds: ['grp2'] }),
  s({ id: 'st10', nameKey: 'data.stud.j.name', accent: 'sky',     statusId: 'stopped',   level: 'l2',         progress: 56, enrolled: 2, subject: 'math',        familyId: 'fam7', groupIds: ['grp1'] }),
  s({ id: 'st11', nameKey: 'data.stud.k.name', accent: 'sky',     statusId: 'active',    level: 'l1',         progress: 41, enrolled: 2, subject: 'math',        familyId: 'fam1', groupIds: ['grp1'] }),
  s({ id: 'st12', nameKey: 'data.stud.l.name', accent: 'success', statusId: 'active',    level: 'foundation', progress: 28, enrolled: 1, subject: 'science',     familyId: 'fam1' }),
  s({ id: 'st13', nameKey: 'data.stud.m.name', accent: 'amber',   statusId: 'trial',     level: 'l1',         progress: 15, enrolled: 1, subject: 'english',     familyId: 'fam1' }),
  s({ id: 'st14', nameKey: 'data.stud.n.name', accent: 'teal',    statusId: 'active',    level: 'l2',         progress: 52, enrolled: 2, subject: 'programming', familyId: 'fam2', groupIds: ['grp2'] }),
];

export const STUDENTS = { rows: BASE.map((row, i) => ({ ...row, ...academic(row, i) })) };

export const STUDENT_BY_ID = Object.fromEntries(STUDENTS.rows.map((x) => [x.id, x]));
export function studentsOfFamily(familyId) { return STUDENTS.rows.filter((x) => x.familyId === familyId); }

/* Spec 012 — Role Portal Foundation fixture (display-only).
 * Personas bind to EXISTING fixture entities (no new domain data):
 *   student → st1 (a fam1 child: math, group grp1) · family → fam1 (5 children) · teacher → sara.
 * Everything below is authored preview material for the foundation pages —
 * literals and key references only; no engine-shaped state, no derivations. */

export const PORTAL_PERSONAS = {
  student: 'st1',
  family: 'fam1',
  teacher: 'sara',
};

/* Student portal — Spec 013 deep dashboard. All authored/display-only literals
 * (anchored in the legacy hours-gauge + per-session summary/homework record ideas,
 * presented as friendly visuals). NO computed score/rank, NO backend-shaped state,
 * NO pay-adjacent fields. Personas/family/teacher registers untouched. */
export const STUDENT_PREVIEW = {
  overallProgress: 78, // mirrors st1's authored progress figure
  courses: [
    { courseId: 'c1', titleKey: 'data.s1.title', subjectIcon: 'curricula', pct: 78, levelKey: 'data.s1.level', nextStepKey: 'prt.stu.courseNext.math' },
    { courseId: 'c3', titleKey: 'data.s3.title', subjectIcon: 'sessions', pct: 41, levelKey: 'data.s3.level', nextStepKey: 'prt.stu.courseNext.prog' },
  ],
  achievements: [
    { id: 'streak', icon: 'sparkles', titleKey: 'prt.stu.ach1', descKey: 'prt.stu.ach1d' },
    { id: 'levelUp', icon: 'trending-up', titleKey: 'prt.stu.ach2', descKey: 'prt.stu.ach2d' },
    { id: 'attend', icon: 'check-circle', titleKey: 'prt.stu.ach3', descKey: 'prt.stu.ach3d' },
  ],
  /* Spec 013 — homework/tasks (display-only cards; due labels authored, never computed) */
  homework: [
    { id: 'hw1', titleKey: 'data.prtStuHw1', courseId: 'c1', dueKey: 'prt.stu.due.tomorrow', stateKey: 'prt.stu.hwState.new' },
    { id: 'hw2', titleKey: 'data.prtStuHw2', courseId: 'c3', dueKey: 'prt.stu.due.thu', stateKey: 'prt.stu.hwState.progress' },
    { id: 'hw3', titleKey: 'data.prtStuHw3', courseId: 'c1', dueKey: 'prt.stu.due.nextWeek', stateKey: 'prt.stu.hwState.new' },
  ],
  /* Spec 013 — materials library preview (display-only; type icon + course ref) */
  materials: [
    { id: 'mat1', titleKey: 'data.prtStuMat1', courseId: 'c1', typeIcon: 'file-text' },
    { id: 'mat2', titleKey: 'data.prtStuMat2', courseId: 'c1', typeIcon: 'play' },
    { id: 'mat3', titleKey: 'data.prtStuMat3', courseId: 'c3', typeIcon: 'materials' },
  ],
  /* Spec 013 — attendance trio (motivational register: a streak, not a follow-up flag) */
  attendance: { attended: 9, upcoming: 2, streakDays: 5 },
  /* Spec 013 — group celebration (unordered wins; NO ranks/points/peer comparison) */
  celebration: [
    { id: 'cel1', icon: 'award', titleKey: 'prt.stu.celeb.c1t', descKey: 'data.prtStuCeleb1' },
    { id: 'cel2', icon: 'sparkles', titleKey: 'prt.stu.celeb.c2t', descKey: 'data.prtStuCeleb2' },
    { id: 'cel3', icon: 'check-circle', titleKey: 'prt.stu.celeb.c3t', descKey: 'data.prtStuCeleb3' },
  ],
  /* Spec 013 — recent-sessions feedback (F6 record shape: summary + homework note).
   * The first record references the REAL SESSION_OUTCOMES row out1 (st1·math·sara·attended). */
  history: [
    { id: 'h1', outcomeId: 'out1' },
    { id: 'h2', courseId: 'c3', teacherKey: 'data.t.layan', dayKey: 'prt.stu.hist.dayMon', summaryKey: 'data.prtStuHist2sum', homeworkKey: 'data.prtStuHist2hw', hasAttachment: true },
    { id: 'h3', courseId: 'c1', teacherKey: 'data.t.sara', dayKey: 'prt.stu.hist.daySat', summaryKey: 'data.prtStuHist3sum', homeworkKey: 'data.prtStuHist3hw' },
  ],
};

/* Family portal — authored after-session teacher notes (the legacy per-session
 * Class-Summary/Homework record, reborn as friendly note cards). */
export const FAMILY_PREVIEW = {
  teacherNotes: [
    { id: 'n1', studentId: 'st1', teacherKey: 'data.t.sara', noteKey: 'data.prtNote1', dateKey: 'sess.today' },
    { id: 'n2', studentId: 'st6', teacherKey: 'data.t.khalid', noteKey: 'data.prtNote2', dateKey: 'sess.today' },
  ],
};

/* Planned/backend-gated foundation cards per portal (availability reuses the
 * Spec 008 vocabulary via availabilityChip — labeled, never color-only). */
export const PORTAL_PLANNED = {
  /* Spec 013 — the three student mini-cards, each placed inside its own section:
   * homework-submit + materials-download are backend-gated; full-history is planned. */
  student: [
    { id: 'hwSubmit', icon: 'tasks', titleKey: 'prt.stu.plan.hwSubmit.t', descKey: 'prt.stu.plan.hwSubmit.d', availability: 'backendRequired' },
    { id: 'matDownload', icon: 'materials', titleKey: 'prt.stu.plan.matDownload.t', descKey: 'prt.stu.plan.matDownload.d', availability: 'backendRequired' },
    { id: 'fullHistory', icon: 'clipboard-check', titleKey: 'prt.stu.plan.fullHistory.t', descKey: 'prt.stu.plan.fullHistory.d', availability: 'planned' },
  ],
  family: [
    { id: 'billing', icon: 'wallet', titleKey: 'prt.fam.planned.bill.t', descKey: 'prt.fam.planned.bill.d', availability: 'backendRequired' },
    { id: 'meetings', icon: 'calendar', titleKey: 'prt.fam.planned.meet.t', descKey: 'prt.fam.planned.meet.d', availability: 'planned' },
    { id: 'subscriptions', icon: 'certificates', titleKey: 'prt.fam.planned.subs.t', descKey: 'prt.fam.planned.subs.d', availability: 'planned' },
  ],
  teacher: [
    { id: 'materials', icon: 'materials', titleKey: 'prt.tch.planned.mat.t', descKey: 'prt.tch.planned.mat.d', availability: 'planned' },
    { id: 'tasks', icon: 'tasks', titleKey: 'prt.tch.planned.tasks.t', descKey: 'prt.tch.planned.tasks.d', availability: 'planned' },
  ],
};

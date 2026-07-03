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
 * NO money-adjacent fields. Personas/family/teacher registers untouched. */
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

/* Family portal — Spec 014 guardian control center (fam1 + 5 children).
 * All authored/display-only literals or refs to EXISTING fixtures. NO computed
 * score/rank, NO backend-shaped state, and — the hard line — NO money-like field
 * is ever surfaced (the family fixture's hourRate/plan cost is display-suppressed).
 * Personas + student/teacher registers untouched. */
export const FAMILY_PREVIEW = {
  /* authored sessionId → child mapping for the today band (which child each session is for) */
  todayChildren: { s2: 'st1', s3: 'st11', s5: 'st6' },
  /* authored family attendance trio (display-only; gentle, not a KPI wall) */
  attendance: { attended: 12, upcoming: 3, followUp: 1 },
  /* the "is anyone behind?" signals — REAL outcome rows only (no fabrication):
   * out15 = st11 studentAbsent + follow-up (with support feedback) · out12 = st13 trial cancel */
  signals: [
    { outcomeId: 'out15', framingKey: 'prt.fam.sig.absence' },
    { outcomeId: 'out12', framingKey: 'prt.fam.sig.trial' },
  ],
  /* recent after-session teacher notes (the legacy Class-Summary/Homework record, reborn) */
  teacherNotes: [
    { id: 'n1', studentId: 'st1', teacherKey: 'data.t.sara', noteKey: 'data.prtNote1', dateKey: 'sess.today' },
    { id: 'n2', studentId: 'st6', teacherKey: 'data.t.khalid', noteKey: 'data.prtNote2', dateKey: 'sess.today' },
    { id: 'n3', studentId: 'st12', teacherKey: 'data.t.khalid', noteKey: 'data.prtFamNote3', dateKey: 'sess.today' },
  ],
  /* guardian history mirror (F6) — child-first cards; first two resolve REAL outcome rows */
  history: [
    { id: 'h1', outcomeId: 'out1', dayKey: 'prt.fam.hist.daySun' },
    { id: 'h2', outcomeId: 'out15', dayKey: 'prt.fam.hist.dayTue' },
    { id: 'h3', childId: 'st6', teacherKey: 'data.t.khalid', dayKey: 'prt.fam.hist.dayMon', summaryKey: 'data.prtFamHist3sum', homeworkKey: 'data.prtFamHist3hw', hasAttachment: true },
  ],
  /* family materials preview (F12 slice) — display-only; child-associated */
  materials: [
    { id: 'm1', titleKey: 'data.prtFamMat1', childId: 'st1', typeIcon: 'file-text' },
    { id: 'm2', titleKey: 'data.prtFamMat2', childId: 'st11', typeIcon: 'play' },
    { id: 'm3', titleKey: 'data.prtFamMat3', childId: 'st6', typeIcon: 'materials' },
  ],
  /* per-child gentle hint lines (authored, display-only) */
  kidHints: { st1: 'data.prtFamKid1', st6: 'data.prtFamKid2', st11: 'data.prtFamKid3', st12: 'data.prtFamKid4', st13: 'data.prtFamKid5' },
};

/* Teacher portal — Spec 015 daily cockpit (sara). All authored/display-only
 * literals or refs to EXISTING fixtures via the teacher-links graph. NO computed
 * score/rank (sara's numeric rating/util stay display-suppressed — labeled,
 * worded signals only), NO backend-shaped state, NO money-like field of any kind.
 * Personas + student/family registers untouched. */
export const TEACHER_PREVIEW = {
  /* the "who needs follow-up" board — REAL outcome rows only (no fabrication):
   * out15 = st11 absence w/ the support feedback · out4 = st7 needs a make-up slot */
  followUps: [
    { outcomeId: 'out15', framingKey: 'prt.tch.sig.absence' },
    { outcomeId: 'out4', framingKey: 'prt.tch.sig.makeup' },
  ],
  /* recent sessions (the T20/T21 history slice) — REAL outcome refs (out1 st1 ·
   * out11 st11, both attended sara rows); the homework-note lines are authored */
  history: [
    { outcomeId: 'out1', homeworkKey: 'data.prtTchHist1hw' },
    { outcomeId: 'out11', homeworkKey: 'data.prtTchHist2hw' },
  ],
  /* authored per-roster-student learning notes (worded signals — no numbers) */
  studentNotes: { st1: 'data.prtTchStu1', st6: 'data.prtTchStu2', st11: 'data.prtTchStu3', st13: 'data.prtTchStu4' },
  /* prep/review cards (display-only; due labels authored, never computed) */
  tasks: [
    { id: 'tk1', titleKey: 'data.prtTchTask1', subKey: 'data.prtTchTask1s', dueKey: 'prt.tch.due.today', icon: 'file-text' },
    { id: 'tk2', titleKey: 'data.prtTchTask2', subKey: 'data.prtTchTask2s', dueKey: 'prt.tch.due.tomorrow', icon: 'tasks' },
    { id: 'tk3', titleKey: 'data.prtTchTask3', subKey: 'data.prtTchTask3s', dueKey: 'prt.tch.due.endOfWeek', icon: 'clipboard-check' },
  ],
  /* teaching materials preview (display-only; type icon + course ref) */
  materials: [
    { id: 'tm1', titleKey: 'data.prtTchMat1', courseId: 'c1', typeIcon: 'file-text' },
    { id: 'tm2', titleKey: 'data.prtTchMat2', courseId: 'c1', typeIcon: 'play' },
    { id: 'tm3', titleKey: 'data.prtTchMat3', courseId: 'c1', typeIcon: 'materials' },
  ],
  /* monthly-report rubric dimensions (display-only question lines — no answer scales) */
  rubricKeys: ['prt.tch.rubric.achievements', 'prt.tch.rubric.learning', 'prt.tch.rubric.focus', 'prt.tch.rubric.homework', 'prt.tch.rubric.punctuality'],
  /* certificate-request concept lines (display-only preview of what a request carries) */
  certKeys: ['prt.tch.cert.line1', 'prt.tch.cert.line2'],
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
  /* Spec 014 — four family mini-cards, each placed inside its owning section:
   * billing view/settle + materials download are backend-gated; full-history +
   * meeting-request are planned. (billing carries ZERO amounts — a gate, not a ledger.) */
  family: [
    { id: 'billingGate', icon: 'wallet', titleKey: 'prt.fam.plan.billing.t', descKey: 'prt.fam.plan.billing.d', availability: 'backendRequired' },
    { id: 'matDownload', icon: 'materials', titleKey: 'prt.fam.plan.matDownload.t', descKey: 'prt.fam.plan.matDownload.d', availability: 'backendRequired' },
    { id: 'fullHistory', icon: 'clipboard-check', titleKey: 'prt.fam.plan.fullHistory.t', descKey: 'prt.fam.plan.fullHistory.d', availability: 'planned' },
    { id: 'meetingRequest', icon: 'calendar', titleKey: 'prt.fam.plan.meetingRequest.t', descKey: 'prt.fam.plan.meetingRequest.d', availability: 'planned' },
  ],
  /* Spec 015 — four teacher mini-cards, each placed inside its owning section:
   * outcome-save + file upload/download + availability editing are backend-gated;
   * the full task surface is planned (the Spec-016 operations shell). */
  teacher: [
    { id: 'outcomeSave', icon: 'clipboard-check', titleKey: 'prt.tch.plan.outcomeSave.t', descKey: 'prt.tch.plan.outcomeSave.d', availability: 'backendRequired' },
    { id: 'matUpload', icon: 'materials', titleKey: 'prt.tch.plan.matUpload.t', descKey: 'prt.tch.plan.matUpload.d', availability: 'backendRequired' },
    { id: 'availabilityEdit', icon: 'calendar', titleKey: 'prt.tch.plan.availabilityEdit.t', descKey: 'prt.tch.plan.availabilityEdit.d', availability: 'backendRequired' },
    { id: 'taskManage', icon: 'tasks', titleKey: 'prt.tch.plan.taskManage.t', descKey: 'prt.tch.plan.taskManage.d', availability: 'planned' },
  ],
};

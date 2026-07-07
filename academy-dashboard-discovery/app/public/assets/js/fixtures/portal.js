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
 * NO figure-bearing fields. Personas/family/teacher registers untouched. */
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
 * score/rank, NO backend-shaped state, and — the hard line — NO figure-bearing field
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
 * worded signals only), NO backend-shaped state, NO figure-bearing field of any kind.
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

/* Spec 017 — the role dashboard navigation registries (Shell v2). Data-driven,
 * display-only: `implemented` renders a real language-correct link; `planned`
 * renders a labeled non-anchor button (the honest «قريبًا» state). Specs 018–020
 * flip statuses one line at a time as their pages ship. Frozen order and labels
 * per the Spec-017 nav table; the teacher set is worded clean by the standing
 * teacher hard rule (zero flagged vocabulary anywhere in this register). */
export const ROLE_NAV = {
  student: [
    { id: 'home', labelKey: 'prt.nav.stu.home', icon: 'home', page: 'student-portal', status: 'implemented' },
    { id: 'schedule', labelKey: 'prt.nav.stu.schedule', icon: 'schedule', page: 'student-schedule', status: 'implemented' },
    { id: 'homework', labelKey: 'prt.nav.stu.homework', icon: 'tasks', page: 'student-homework', status: 'implemented' },
    { id: 'materials', labelKey: 'prt.nav.stu.materials', icon: 'materials', page: 'student-materials', status: 'implemented' },
    { id: 'progress', labelKey: 'prt.nav.stu.progress', icon: 'trending-up', page: 'student-progress', status: 'implemented' },
    { id: 'history', labelKey: 'prt.nav.stu.history', icon: 'clipboard-check', page: 'student-history', status: 'implemented' },
    { id: 'profile', labelKey: 'prt.nav.stu.profile', icon: 'user', page: 'student-profile', status: 'implemented' },
  ],
  family: [
    { id: 'home', labelKey: 'prt.nav.fam.home', icon: 'home', page: 'family-portal', status: 'implemented' },
    { id: 'children', labelKey: 'prt.nav.fam.children', icon: 'families', page: 'family-children', status: 'implemented' },
    { id: 'schedule', labelKey: 'prt.nav.fam.schedule', icon: 'calendar', page: 'family-schedule', status: 'implemented' },
    { id: 'progress', labelKey: 'prt.nav.fam.progress', icon: 'trending-up', page: 'family-progress', status: 'implemented' },
    { id: 'billing', labelKey: 'prt.nav.fam.billing', icon: 'wallet', page: 'family-billing', status: 'implemented' },
    { id: 'requests', labelKey: 'prt.nav.fam.requests', icon: 'help', page: 'family-requests', status: 'implemented' },
    { id: 'materials', labelKey: 'prt.nav.fam.materials', icon: 'materials', page: 'family-materials', status: 'implemented' },
    { id: 'profile', labelKey: 'prt.nav.fam.profile', icon: 'user', page: 'family-profile', status: 'implemented' },
  ],
  teacher: [
    { id: 'home', labelKey: 'prt.nav.tch.home', icon: 'home', page: 'teacher-portal', status: 'implemented' },
    { id: 'schedule', labelKey: 'prt.nav.tch.schedule', icon: 'calendar', page: 'teacher-schedule', status: 'planned' },
    { id: 'students', labelKey: 'prt.nav.tch.students', icon: 'students', page: 'teacher-students', status: 'planned' },
    { id: 'outcomes', labelKey: 'prt.nav.tch.outcomes', icon: 'clipboard-check', page: 'teacher-outcomes', status: 'planned' },
    { id: 'tasks', labelKey: 'prt.nav.tch.tasks', icon: 'tasks', page: 'teacher-tasks', status: 'planned' },
    { id: 'reports', labelKey: 'prt.nav.tch.reports', icon: 'reports', page: 'teacher-reports', status: 'planned' },
    { id: 'library', labelKey: 'prt.nav.tch.library', icon: 'book-open', page: 'teacher-library', status: 'planned' },
    { id: 'profile', labelKey: 'prt.nav.tch.profile', icon: 'user', page: 'teacher-profile', status: 'planned' },
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

/* ─────────────────────────────────────────────────────────────────────────────
 * Spec 018 — Role Dashboards Admin-Like UX Rework (ADDITIVE; nothing above is
 * touched — the 013/014/015 PREVIEW slices and the 017 ROLE_NAV/PLANNED registers
 * are RETAINED verbatim so Specs 019–021 re-render the displaced detail on their
 * own pages). Below: the compact-home 4-KPI rows (authored fixture literals, the
 * admin `kpiRow` rhythm re-expressed portal-side) + the baked child-profile panels
 * for the REAL fam1 roster. Zero computed values, zero figure-bearing fields. */

/* The four KPI cards per compact home. Every `value` is an authored literal that
 * mirrors an EXISTING preview figure (attended/progress/roster/etc.) — rendered via
 * num(), never derived at runtime. `format:'percent'` appends the locale % sign. */
export const COMPACT_HOME = {
  student: {
    kpis: [
      { icon: 'check-circle', value: 9, labelKey: 'prt.kpi.stu.attended' },
      { icon: 'trending-up', value: 78, format: 'percent', labelKey: 'prt.kpi.stu.progress' },
      { icon: 'tasks', value: 3, labelKey: 'prt.kpi.stu.homework' },
      { icon: 'sparkles', value: 5, labelKey: 'prt.kpi.stu.streak' },
    ],
  },
  family: {
    kpis: [
      { icon: 'families', value: 5, labelKey: 'prt.kpi.fam.children' },
      { icon: 'check-circle', value: 12, labelKey: 'prt.kpi.fam.attended' },
      { icon: 'clock', value: 3, labelKey: 'prt.kpi.fam.upcoming' },
      { icon: 'alert-triangle', value: 1, labelKey: 'prt.kpi.fam.followUps' },
    ],
  },
  teacher: {
    kpis: [
      { icon: 'schedule', value: 2, labelKey: 'prt.kpi.tch.today' },
      { icon: 'alert-triangle', value: 2, labelKey: 'prt.kpi.tch.followUps' },
      { icon: 'tasks', value: 3, labelKey: 'prt.kpi.tch.tasks' },
      { icon: 'students', value: 4, labelKey: 'prt.kpi.tch.roster' },
    ],
  },
};

/* Per-child baked panel content for `family-child` — the REAL fam1 roster
 * st1·st6·st11·st12·st13 (identity/level/subject/progress/status/teacher resolve
 * from students.js; today/next from SESSIONS_FULL + FAMILY_PREVIEW.todayChildren;
 * the note is a REAL FAMILY_PREVIEW teacher note where one exists — st1/st6/st12 —
 * else an authored line for st11/st13). The attendance trio + homework/materials
 * summary lines are authored display-only literals. NO figure-bearing field, NO
 * computed score/rank; the history/profile drill-downs are honest availability gates. */
export const CHILD_PROFILE = {
  st1:  { attendance: { attended: 9, upcoming: 2, absent: 0 }, noteKey: 'data.prtNote1',         hwKey: 'data.prtChildHwSt1',  matKey: 'data.prtChildMatSt1' },
  st6:  { attendance: { attended: 7, upcoming: 1, absent: 1 }, noteKey: 'data.prtNote2',         hwKey: 'data.prtChildHwSt6',  matKey: 'data.prtChildMatSt6' },
  st11: { attendance: { attended: 6, upcoming: 2, absent: 1 }, noteKey: 'data.prtChildNoteSt11', hwKey: 'data.prtChildHwSt11', matKey: 'data.prtChildMatSt11' },
  st12: { attendance: { attended: 8, upcoming: 1, absent: 0 }, noteKey: 'data.prtFamNote3',      hwKey: 'data.prtChildHwSt12', matKey: 'data.prtChildMatSt12' },
  st13: { attendance: { attended: 2, upcoming: 1, absent: 0 }, noteKey: 'data.prtChildNoteSt13', hwKey: 'data.prtChildHwSt13', matKey: 'data.prtChildMatSt13' },
};

/* the fam1 child order for family-child panels + the home drill-down cards (deep
 * links `#child=st1|st6|st11|st12|st13`); default visible panel = the first (st1). */
export const CHILD_ORDER = ['st1', 'st6', 'st11', 'st12', 'st13'];

/* ─────────────────────────────────────────────────────────────────────────────
 * Spec 019 — Student Internal Pages (ADDITIVE; the 013/018 STUDENT_PREVIEW slices
 * above are RETAINED verbatim and re-rendered by these pages — schedule reuses
 * SESSIONS_FULL/SCHEDULE_WEEK, progress re-renders STUDENT_PREVIEW.{courses,
 * attendance,achievements,celebration}). Below = only the NET-NEW authored bits the
 * six pages need (homework state grouping, per-course material groups, teacher
 * signals, extra history records, profile prefs + the three legacy-evidenced gates).
 * All authored literals consistent with st1 (9 attended · math 78% · prog 41% ·
 * streak 5); zero computed, zero figure-bearing/flagged fields. */
export const STUDENT_PAGES = {
  /* homework page — the KPI trio + five records grouped by state (pending/inProgress/
   * reviewed); the first three re-reference the RETAINED hw1–hw3 titleKeys. */
  homework: {
    kpis: [
      { icon: 'clock', value: 2, labelKey: 'prt.stu.pg.hw.kPending' },
      { icon: 'tasks', value: 1, labelKey: 'prt.stu.pg.hw.kProgress' },
      { icon: 'check-circle', value: 2, labelKey: 'prt.stu.pg.hw.kReviewed' },
    ],
    records: [
      { id: 'hw1', titleKey: 'data.prtStuHw1', courseId: 'c1', dueKey: 'prt.stu.due.tomorrow', stateId: 'pending' },
      { id: 'hw3', titleKey: 'data.prtStuHw3', courseId: 'c1', dueKey: 'prt.stu.due.nextWeek', stateId: 'pending' },
      { id: 'hw2', titleKey: 'data.prtStuHw2', courseId: 'c3', dueKey: 'prt.stu.due.thu', stateId: 'inProgress' },
      { id: 'hw4', titleKey: 'data.prtStuPgHw4', courseId: 'c1', dueKey: 'prt.stu.pg.hw.dueDone', stateId: 'reviewed', noteKey: 'data.prtStuPgHw4note' },
      { id: 'hw5', titleKey: 'data.prtStuPgHw5', courseId: 'c3', dueKey: 'prt.stu.pg.hw.dueDone', stateId: 'reviewed', noteKey: 'data.prtStuPgHw5note' },
    ],
  },
  /* materials page — per-course groups; mat1–mat3 re-referenced + one NEW item per course */
  materials: {
    groups: [
      { courseId: 'c1', items: [
        { id: 'mat1', titleKey: 'data.prtStuMat1', typeIcon: 'file-text', typeKey: 'prt.stu.pg.mat.tPdf' },
        { id: 'mat2', titleKey: 'data.prtStuMat2', typeIcon: 'play', typeKey: 'prt.stu.pg.mat.tVideo' },
        { id: 'matN1', titleKey: 'data.prtStuPgMat1', typeIcon: 'materials', typeKey: 'prt.stu.pg.mat.tSheet' },
      ] },
      { courseId: 'c3', items: [
        { id: 'mat3', titleKey: 'data.prtStuMat3', typeIcon: 'materials', typeKey: 'prt.stu.pg.mat.tSheet' },
        { id: 'matN2', titleKey: 'data.prtStuPgMat2', typeIcon: 'play', typeKey: 'prt.stu.pg.mat.tVideo' },
      ] },
    ],
  },
  /* progress page — two authored teacher-signal lines (progress re-renders the RETAINED
   * STUDENT_PREVIEW.{overallProgress,courses,attendance,achievements,celebration}) */
  progress: { signals: ['data.prtStuPgSig1', 'data.prtStuPgSig2'] },
  /* history page — the F6 record list; h1 resolves the REAL out1 outcome, then the
   * RETAINED h2/h3 record shapes re-referenced, then two NEW authored records. */
  history: {
    records: [
      { id: 'h1', outcomeId: 'out1' },
      { id: 'h2', courseId: 'c3', teacherKey: 'data.t.layan', dayKey: 'prt.stu.hist.dayMon', summaryKey: 'data.prtStuHist2sum', homeworkKey: 'data.prtStuHist2hw', hasAttachment: true },
      { id: 'h3', courseId: 'c1', teacherKey: 'data.t.sara', dayKey: 'prt.stu.hist.daySat', summaryKey: 'data.prtStuHist3sum', homeworkKey: 'data.prtStuHist3hw' },
      { id: 'h4', courseId: 'c1', teacherKey: 'data.t.sara', dayKey: 'prt.stu.pg.hist.dayThu', summaryKey: 'data.prtStuPgHist4sum', homeworkKey: 'data.prtStuPgHist4hw' },
      { id: 'h5', courseId: 'c3', teacherKey: 'data.t.layan', dayKey: 'prt.stu.pg.hist.dayWed', summaryKey: 'data.prtStuPgHist5sum', homeworkKey: 'data.prtStuPgHist5hw' },
    ],
  },
  /* profile page — display-only preference chips + the three legacy-evidenced write
   * gates (the profile-edit page's exact surface: photo upload · profile save · password). */
  profile: {
    prefs: [
      { icon: 'globe', labelKey: 'prt.stu.pg.prof.prefLang', valueKey: 'prt.stu.pg.prof.prefLangV' },
      { icon: 'sun', labelKey: 'prt.stu.pg.prof.prefTheme', valueKey: 'prt.stu.pg.prof.prefThemeV' },
      { icon: 'help', labelKey: 'prt.stu.pg.prof.prefContact', valueKey: 'prt.stu.pg.prof.prefContactV' },
    ],
    gates: [
      { id: 'photoUpload', icon: 'materials', titleKey: 'prt.stu.pg.prof.gPhoto.t', descKey: 'prt.stu.pg.prof.gPhoto.d', availability: 'backendRequired' },
      { id: 'profileSave', icon: 'user', titleKey: 'prt.stu.pg.prof.gSave.t', descKey: 'prt.stu.pg.prof.gSave.d', availability: 'backendRequired' },
      { id: 'passwordChange', icon: 'help', titleKey: 'prt.stu.pg.prof.gPass.t', descKey: 'prt.stu.pg.prof.gPass.d', availability: 'backendRequired' },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
 * Spec 020 — Family / Guardian Internal Pages (ADDITIVE; every retained 014/018
 * slice above stays verbatim and is re-rendered by these pages). Only the NET-NEW
 * authored bits: the hour-quota trio (hours are session units — figure-safe, never
 * a ledger), per-child subscription context, invoice STATUS rows (the shape has NO
 * figure-bearing field by construction — the legacy column is deliberately dropped),
 * request-type cards re-referencing the RETAINED prt.fam.req.* register, the two
 * missing per-child material items, and the guardian profile prefs + the three
 * legacy-evidenced write gates. All authored literals consistent with fam1 and the
 * five family-child children. */
export const FAMILY_PAGES = {
  /* the legacy home hour-quota idea (Total/Remaining/Taken) — authored, 40 = 12 + 28;
   * takenH mirrors the retained FAMILY_PREVIEW.attendance.attended register */
  quota: { totalH: 40, takenH: 12, remainH: 28 },
  /* per-child directory context (identity/course/teacher/progress/status resolve from
   * students.js + SUBJ maps + the RETAINED kidHints; subscription = the family plan) */
  children: [
    { childId: 'st1', subscriptionKey: 'data.fam.fam1.plan' },
    { childId: 'st6', subscriptionKey: 'data.fam.fam1.plan' },
    { childId: 'st11', subscriptionKey: 'data.fam.fam1.plan' },
    { childId: 'st12', subscriptionKey: 'data.fam.fam1.plan' },
    { childId: 'st13', subscriptionKey: 'data.fam.fam1.plan' },
  ],
  /* invoice STATUS rows — serial/month/due/course/status ONLY (no figure field exists) */
  billing: {
    invoices: [
      { id: 'inv1', serialKey: 'data.prtFamPgInv1s', monthKey: 'data.prtFamPgInv1m', dueKey: 'data.prtFamPgInv1d', courseId: 'c1', statusTone: 'completed' },
      { id: 'inv2', serialKey: 'data.prtFamPgInv2s', monthKey: 'data.prtFamPgInv2m', dueKey: 'data.prtFamPgInv2d', courseId: 'c3', statusTone: 'completed' },
      { id: 'inv3', serialKey: 'data.prtFamPgInv3s', monthKey: 'data.prtFamPgInv3m', dueKey: 'data.prtFamPgInv3d', courseId: 'c1', statusTone: 'upcoming' },
    ],
  },
  /* requests page summary counts — the four request TYPES render as bespoke sections on
   * the page itself (each re-homing its RETAINED prt.fam.req.* register verbatim) */
  requests: { counts: { types: 4, open: 0 } },
  /* materials — the RETAINED FAMILY_PREVIEW.materials rows re-referenced (st1/st11/st6)
   * + the two NEW items so every child has coverage */
  materials: {
    extra: [
      { id: 'fm4', titleKey: 'data.prtFamPgMat4', childId: 'st12', typeIcon: 'file-text', typeKey: 'prt.stu.pg.mat.tPdf' },
      { id: 'fm5', titleKey: 'data.prtFamPgMat5', childId: 'st13', typeIcon: 'play', typeKey: 'prt.stu.pg.mat.tVideo' },
    ],
  },
  /* guardian profile — display-only prefs + the profile-edit page's exact write surface */
  profile: {
    prefs: [
      { icon: 'globe', labelKey: 'prt.fam.pg.prof.prefLang', valueKey: 'prt.fam.pg.prof.prefLangV' },
      { icon: 'sun', labelKey: 'prt.fam.pg.prof.prefTheme', valueKey: 'prt.fam.pg.prof.prefThemeV' },
      { icon: 'help', labelKey: 'prt.fam.pg.prof.prefContact', valueKey: 'prt.fam.pg.prof.prefContactV' },
    ],
    gates: [
      { id: 'photoUpload', icon: 'materials', titleKey: 'prt.fam.pg.prof.gPhoto.t', descKey: 'prt.fam.pg.prof.gPhoto.d', availability: 'backendRequired' },
      { id: 'profileSave', icon: 'user', titleKey: 'prt.fam.pg.prof.gSave.t', descKey: 'prt.fam.pg.prof.gSave.d', availability: 'backendRequired' },
      { id: 'passwordChange', icon: 'help', titleKey: 'prt.fam.pg.prof.gPass.t', descKey: 'prt.fam.pg.prof.gPass.d', availability: 'backendRequired' },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
 * Spec 022 — Living Dashboards Experience Rework (ADDITIVE; nothing above is
 * touched). The hero counter VALUES re-express the RETAINED COMPACT_HOME.kpis
 * literals (same authored numbers, now presented as identity counters with a
 * one-line story); labels reuse the existing prt.kpi.* keys, stories are the NEW
 * prt.lv.* namespace. Rail stops derive at render time from the EXISTING today
 * slices — no new session data. Teacher counters are hour/class/task COUNTS only
 * (the teacher GLOBAL hard rule holds — zero figure-bearing/flagged fields anywhere).
 * The hub childView entry demotes the student surface to the family journey. */
export const LIVING_HOME = {
  family: {
    hero: { emoji: '🌿', subKey: 'prt.lv.fam.heroSub', counters: [
      { icon: 'families',        value: 5, labelKey: 'prt.kpi.fam.children',  storyKey: 'prt.lv.fam.st.kids' },
      { icon: 'calendar',        value: 3, labelKey: 'prt.kpi.fam.upcoming',  storyKey: 'prt.lv.fam.st.today' },
      { icon: 'alert-triangle',  value: 1, labelKey: 'prt.kpi.fam.followUps', storyKey: 'prt.lv.fam.st.watch' },
    ] },
    stories: [
      { icon: 'wallet',  tone: 'completed', titleKey: 'prt.lv.fam.story.billT', subKey: 'prt.lv.fam.story.billD' },
      { icon: 'message-circle', tone: 'neutral', titleKey: 'prt.lv.fam.story.reqT',  subKey: 'prt.lv.fam.story.reqD' },
    ],
  },
  teacher: {
    hero: { emoji: '👋', subKey: 'prt.lv.tea.heroSub', counters: [
      { icon: 'schedule',        value: 2, labelKey: 'prt.kpi.tch.today',     storyKey: 'prt.lv.tea.st.today' },
      { icon: 'alert-triangle',  value: 2, labelKey: 'prt.kpi.tch.followUps', storyKey: 'prt.lv.tea.st.watch' },
      { icon: 'tasks',           value: 3, labelKey: 'prt.kpi.tch.tasks',     storyKey: 'prt.lv.tea.st.tasks' },
    ] },
    /* the outcome workflow as a 4-step visual flow; the RECORD step is the honest gate */
    flow: [
      { icon: 'file-text',        titleKey: 'prt.lv.tea.flow.prepT',   subKey: 'prt.lv.tea.flow.prepD' },
      { icon: 'check-circle',     titleKey: 'prt.lv.tea.flow.attendT', subKey: 'prt.lv.tea.flow.attendD' },
      { icon: 'clipboard-check',  titleKey: 'prt.lv.tea.flow.recT',    subKey: 'prt.lv.tea.flow.recD', gated: true },
      { icon: 'trending-up',      titleKey: 'prt.lv.tea.flow.revT',    subKey: 'prt.lv.tea.flow.revD' },
    ],
  },
  student: {
    hero: { emoji: '🌟', subKey: 'prt.lv.stu.heroSub', counters: [
      { icon: 'check-circle',  value: 9,  labelKey: 'prt.kpi.stu.attended', storyKey: 'prt.lv.stu.st.attended' },
      { icon: 'trending-up',   value: 78, format: 'percent', labelKey: 'prt.kpi.stu.progress', storyKey: 'prt.lv.stu.st.progress' },
      { icon: 'tasks',         value: 3,  labelKey: 'prt.kpi.stu.homework', storyKey: 'prt.lv.stu.st.homework' },
    ] },
  },
  /* the hub's demoted child-view entry — a real link to the preserved student
   * pages, framed as a preview inside the family journey (never a fourth role). */
  hub: { childView: { icon: 'user', page: 'student-portal', tKey: 'prt.lv.hub.cvT', dKey: 'prt.lv.hub.cvD', openKey: 'prt.lv.hub.cvOpen' } },
};

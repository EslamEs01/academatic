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

/* Student portal — authored progress + achievement previews (illustrative literals;
 * anchored in the legacy hours-gauge idea, presented as friendly visuals). */
export const STUDENT_PREVIEW = {
  overallProgress: 78, // mirrors st1's authored progress figure
  courses: [
    { courseId: 'c1', titleKey: 'data.s1.title', subjectIcon: 'curricula', pct: 78, levelKey: 'data.s1.level' },
    { courseId: 'c3', titleKey: 'data.s3.title', subjectIcon: 'sessions', pct: 41, levelKey: 'data.s3.level' },
  ],
  achievements: [
    { id: 'streak', icon: 'sparkles', titleKey: 'prt.stu.ach1', descKey: 'prt.stu.ach1d' },
    { id: 'levelUp', icon: 'trending-up', titleKey: 'prt.stu.ach2', descKey: 'prt.stu.ach2d' },
    { id: 'attend', icon: 'check-circle', titleKey: 'prt.stu.ach3', descKey: 'prt.stu.ach3d' },
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
  student: [
    { id: 'homework', icon: 'tasks', titleKey: 'prt.stu.planned.hw.t', descKey: 'prt.stu.planned.hw.d', availability: 'planned' },
    { id: 'materials', icon: 'materials', titleKey: 'prt.stu.planned.mat.t', descKey: 'prt.stu.planned.mat.d', availability: 'planned' },
    { id: 'leaderboard', icon: 'trending-up', titleKey: 'prt.stu.planned.lead.t', descKey: 'prt.stu.planned.lead.d', availability: 'planned' },
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

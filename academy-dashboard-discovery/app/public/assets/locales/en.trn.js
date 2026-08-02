/* Spec 007 — English keys (Teacher Performance & Academic KPIs).
 * Mirrors ar.trn.js exactly. Merged into en.js at runtime (deepMerge extends). */
export default {
  topbar: {
    title: { teacher: 'Teacher details', teacherPerf: 'Teacher Performance' },
    crumb: { teacher: 'Teachers · Details', teacherPerf: 'Teachers · Performance' },
  },

  dash: { teachersFollowup: '{n} teachers need follow-up' },

  dir: { preview: 'Quick preview' },

  trn: {
    /* Spec 041 — D-1: the teachers-page tablist (see the AR note on the namespace choice). */
    list: { tab: { aria: 'Teachers page sections', directory: 'Directory', add: 'Add teacher', categories: 'Categories' } },
    viewProfile: 'View profile',

    status: { active: 'Active', paused: 'Paused', inactive: 'Inactive' },
    workload: { light: 'Light load', balanced: 'Balanced', high: 'High load' },
    signal: { strongDelivery: 'Strong delivery', stable: 'Stable', needsFollowUp: 'Needs follow-up', attentionRisk: 'Attention risk' },

    fStatus: 'Status', fWorkload: 'Workload', fSignal: 'Follow-up signal',
    counts: { courses: 'Courses', groups: 'Groups', students: 'Active students' },
    upcomingHint: '{n} upcoming sessions', noSessions: 'No recent sessions',

    kpi: { courses: 'Courses', groups: 'Groups', students: 'Active students', upcoming: 'Upcoming sessions' },
    tab: { overview: 'Overview', courses: 'Courses', groups: 'Groups', timetable: 'Timetable', sessions: 'Sessions & Outcomes', students: 'Students', followup: 'Follow-up', notes: 'Notes' },
    ov: {
      title: 'Teacher snapshot', subjects: 'Subjects', status: 'Status', availability: 'Availability', workload: 'Workload',
      courses: 'Courses', groups: 'Groups', students: 'Students', upcoming: 'Upcoming sessions',
      absence: 'Attendance & absence', completed: 'Completed sessions', teacherAbsent: 'Teacher absences', studentAbsent: 'Student absences in their sessions', cancelled: 'Cancelled/rescheduled',
    },
    none: { courses: 'No courses assigned yet', groups: 'No groups yet', students: 'No students yet', sessions: 'No sessions or outcomes yet', followup: 'Nothing needs follow-up right now' },
    viewCourse: 'View course', viewGroup: 'View group', viewStudent: 'View student',
    notesText: 'A steady teacher following the weekly course schedule; notes are reviewed periodically.',

    card: { menu: 'Teacher actions' },

    act: {
      add: 'Add teacher', addToast: 'Adding a teacher will be available once the server is connected.',
      edit: 'Edit', editToast: 'Editing the teacher will be available once the server is connected.',
      message: 'Message teacher', messageToast: 'Messaging will be available once the server is connected.',
      note: 'Add follow-up note', noteToast: 'Saving the note will be available once the server is connected.',
      notify: 'Notify family', notifyTitle: 'Send a family notification?', notifyMsg: 'This will be available once the server is connected — no notification is sent yet.', notifyCta: 'Send', notifyToast: 'Sending the notification will be available once the server is connected.',
      assignCourse: 'Assign course', assignGroup: 'Assign group', openTimetable: 'Open timetable', viewAttendance: 'View attendance', print: 'Print · export summary',
      vacation: 'On vacation', vacationTitle: 'Put this teacher on vacation?', vacationMsg: 'This will be available once the server is connected — nothing changes yet.', vacationCta: 'Set vacation', vacationToast: 'Setting vacation will be available once the server is connected.',
      deactivate: 'Deactivate', deactivateTitle: 'Deactivate this teacher?', deactivateMsg: 'This will be available once the server is connected — the status does not change yet.', deactivateCta: 'Deactivate', deactivateToast: 'Deactivating will be available once the server is connected.',
      del: 'Delete teacher', delTitle: 'Delete this teacher?', delMsg: 'This will be available once the server is connected — nothing is deleted yet.', delCta: 'Delete', delToast: 'Deleting the teacher will be available once the server is connected.',
      resetPassword: 'Send password reset', loginAs: 'Log in as teacher',
    },
    reason: {
      assign: 'Assigning requires the assignment module (out of current scope).',
      export: 'Export requires the backend (out of current scope).',
      resetPassword: 'Password reset requires the backend (out of current scope).',
      loginAs: 'Logging in as a teacher requires the backend (out of current scope).',
    },

    /* Spec 028 — assign-teacher picker (course/group) + assign-course/group picker (teacher profile) */
    assignT: { title: 'Assign teacher', hint: 'Pick a teacher from the list — assigned once the server is connected.', cta: 'Assign teacher' },
    assignC: { title: 'Assign a course to the teacher', hint: 'Pick a course from the list — assigned once the server is connected.', cta: 'Assign' },
    assignG: { title: 'Assign a group to the teacher', hint: 'Pick a group from the list — assigned once the server is connected.', cta: 'Assign' },

    /* availability-window editor (Timetable tab) — day/time only, no recurrence */
    availEdit: { open: 'Availability', title: 'Teacher availability', hint: 'Weekly availability windows — saved once the server is connected.', add: 'Add window', reason: 'Editing availability requires the backend (out of current scope).' },

    /* Spec 043 — capability/notification POLICY preview (structure-only; salary_* excluded; pay-free) */
    policy: {
      open: 'Capability policy', title: 'Capability & notification policy', edit: 'Edit policy',
      reason: 'Editing capabilities and notifications requires the backend (out of current scope).',
      note: 'Display-only policy preview — capabilities and notification delivery are enforced once the server is connected.',
      academicTitle: 'Academic capabilities', commTitle: 'Communication & notifications',
      granted: 'Allowed', notGranted: 'Not allowed',
      cap: { chat: 'Chat with families', library: 'See the library', editSchedule: 'Edit the schedule', editClass: 'Edit a class' },
      ev: { coursesUpdate: 'Course updates', classReminders: 'Class reminders', classUpdates: 'Class updates' },
      ch: { whatsapp: 'WhatsApp', email: 'E-mail' },
    },

    /* Spec 032 — teacher form drawers (trn-edit / trn-add / trn-note / category create).
     * INERT demo fields; every Save is a backendRequired gate. The excluded legacy
     * fieldset (see must-omit contract) is omitted; upload stays a gate. */
    form: {
      editTitle: 'Edit teacher details',
      addTitle: 'Add a new teacher',
      firstName: 'First name (English)', lastName: 'Last name (English)',
      firstNameAr: 'First name (Arabic)', lastNameAr: 'Last name (Arabic)',
      email: 'Email', emailPh: 'name@example.com',
      phone: 'Mobile number', phonePh: '05xxxxxxxx',
      level: 'Level', courses: 'Assigned course',
      city: 'City', country: 'Country',
      note: 'Note text', notesPh: 'Write a short note…',
      cv: 'CV & certificates', cvGate: 'Upload files',
      cvReason: 'Uploading files requires the backend (out of current scope).',
      catName: 'Category name', catDesc: 'Category description',
    },

    /* teacher categories (nav stays planned — no page) */
    cat: {
      manage: 'Manage categories', title: 'Teacher categories', hint: 'Current categories — creating and assigning happen once the server is connected.',
      createTitle: 'Add teacher category', members: '{n} teachers', assign: 'Assign teachers to category',
      assignReason: 'Assigning teachers to a category requires the backend (out of current scope).',
      name: { senior: 'Senior teachers', associate: 'Associate teachers', trial: 'Trial period' },
    },

    board: {
      title: 'Teacher Performance', sub: 'Academic follow-up of teacher delivery using real fixture counts and labeled signals.',
      searchPh: 'Search teachers…',
      compareTitle: 'Teacher comparison', queueTitle: 'Follow-up queue', queueNone: 'Nothing needs follow-up right now',
      row: { completed: 'Completed', teacherAbsent: 'Teacher absent', studentAbsent: 'Student absent', groups: 'Groups' },
      tile: {
        activeTeachers: 'Active teachers', completed: 'Completed sessions', teacherAbsent: 'Teacher absences',
        studentAbsent: 'Student absences in teacher sessions', cancelled: 'Cancelled/rescheduled',
        groupsAttention: 'Groups needing follow-up', followup: 'Teachers needing follow-up',
      },
      tab: { overview: 'Overview', sessionsKpi: 'Sessions KPI', monthly: 'Monthly performance' },
    },
    sessKpi: {
      title: 'Sessions KPI', sub: 'Per-teacher session delivery from authored counts and labeled signals — display only.',
      searchPh: 'Search teachers…', quality: 'Quality', none: 'No teachers match these filters.',
      q: { onTrack: 'On track', watch: 'Watch', needsAttention: 'Needs attention' },
    },
    monthly: {
      title: 'Monthly performance', sub: 'Per-teacher monthly delivery trend and notes — display only, no scores.',
      searchPh: 'Search teachers…', trend: 'Trend', note: 'Note', month: 'Month', none: 'No rows match these filters.',
      m: { mar: 'March', apr: 'April', may: 'May' },
      t: { improving: 'Improving', steady: 'Steady', declining: 'Declining' },
      n: {
        sara: 'Session completion improved this month; keep the current pacing.',
        mohammed: 'Delivery steady; a few make-up sessions still pending.',
        abdullah: 'Several teacher absences this month — schedule a follow-up.',
        layan: 'Attendance recovered; students re-engaged well.',
        reem: 'Consistent delivery across her groups.',
        nora: 'Fewer cancellations than the prior month.',
        huda: 'Rising student absences in her sessions — review timing.',
        khalid: 'On plan; no follow-up needed.',
        saraMar: 'Baseline month; delivery on plan.',
        mohammedMar: 'Reduced no-shows after the schedule change.',
        abdullahMar: 'Coverage gaps flagged for the coordinator.',
      },
    },
  },
};

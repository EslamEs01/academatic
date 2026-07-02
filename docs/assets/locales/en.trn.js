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

    act: {
      add: 'Add teacher', addToast: 'Add-teacher opened (demo) — nothing is saved.',
      edit: 'Edit', editToast: 'Edit-teacher opened (demo).',
      message: 'Message teacher', messageToast: 'Compose opened (demo) — no message is sent.',
      note: 'Add follow-up note', noteToast: 'Note added (demo) — nothing is saved.',
      notify: 'Notify family', notifyTitle: 'Send a family notification?', notifyMsg: 'A front-end demo only — no real notification is sent.', notifyCta: 'Send', notifyToast: 'Sent (demo).',
      assignCourse: 'Assign course', assignGroup: 'Assign group', openTimetable: 'Open timetable', viewAttendance: 'View attendance', print: 'Print · export summary',
    },
    reason: {
      assign: 'Assigning requires the assignment module (out of current scope).',
      export: 'Export requires the backend (out of current scope).',
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
    },
  },
};

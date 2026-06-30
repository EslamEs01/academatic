/* Spec 006 — English keys (Courses, Groups & Learning Paths). Mirrors ar.crs.js. */
export default {
  topbar: {
    title: { groups: 'Groups', course: 'Course details', group: 'Group details' },
    crumb: { groups: 'Groups', course: 'Course', group: 'Group' },
  },

  cur: { status: { paused: 'Paused' } },

  group: {
    status: {
      active: 'Active', trial: 'Trial', full: 'Full',
      paused: 'Paused', completed: 'Completed', needsAttention: 'Needs follow-up',
    },
  },

  dash: { groupsAttention: '{n} groups need follow-up' },

  crs: {
    viewCourse: 'View course',
    counts: { students: 'students', groups: 'groups', teachers: 'teachers' },
    upcomingHint: '{n} upcoming sessions',
    tab: { overview: 'Overview', groups: 'Groups', students: 'Students', teachers: 'Teachers', timetable: 'Timetable', outcomes: 'Outcomes', learningPath: 'Learning Path', notes: 'Notes' },
    ov: { title: 'About the course', subject: 'Subject', level: 'Level', status: 'Status', groups: 'Groups', students: 'Active students', teachers: 'Teachers', upcoming: 'Upcoming sessions' },
    none: { groups: 'No groups for this course yet', students: 'No enrolled students yet', teachers: 'No teachers assigned yet' },
    notes: 'The course runs on the approved term plan; levels are reviewed periodically.',
    viewInSchedule: 'View in schedule', viewAttendance: 'View attendance', viewGroup: 'View group', viewStudent: 'View student', viewTeacher: 'View teacher',
    lp: {
      title: 'Learning Path', sub: 'The academic level sequence — display only, not a curriculum builder.',
      display: 'Display only — no curriculum or certificate engine.',
      certificates: 'Certificates', certHint: '{n} certificates issued within this course', current: 'Current level', students: '{n} students',
    },
    act: {
      add: 'New course', addToast: 'Add-course opened (demo) — nothing is saved.',
      edit: 'Edit course', editToast: 'Edit-course opened (demo).',
      assignTeacher: 'Assign teacher', addStudents: 'Add students', print: 'Print summary',
    },
    reason: {
      assign: 'Assigning teachers needs the backend (out of current scope).',
      enroll: 'Enrolling students needs the enrolment engine (out of current scope).',
      export: 'Exporting the summary needs the backend (out of current scope).',
    },
    studentTitle: 'Course & group', familyTitle: "Children's courses & groups",
    familyHint: '{c} active courses · {g} groups', familyNone: 'No active courses yet',
  },

  grp: {
    title: 'Groups', sub: 'Track classes and cohorts: course, teacher, students, schedule and outcomes.',
    searchPh: 'Search groups…',
    fCourse: 'Course', fTeacher: 'Teacher', fLevel: 'Level', fDay: 'Day', fStatus: 'Status', fAttention: 'Follow-up',
    allCourses: 'All courses', allTeachers: 'All teachers', allLevels: 'All levels', allDays: 'All days', allStatuses: 'All statuses', needsAttentionOpt: 'Needs follow-up',
    tile: { active: 'Active groups', trial: 'Trial groups', attention: 'Need follow-up' },
    students: 'students', capacity: 'Capacity', schedule: 'Schedule',
    tab: { overview: 'Overview', students: 'Students', timetable: 'Timetable', sessions: 'Sessions & Outcomes', teacher: 'Teacher', course: 'Course', notes: 'Notes' },
    ov: { title: 'About the group', course: 'Course', teacher: 'Teacher', level: 'Level', status: 'Status', students: 'Students', capacity: 'Capacity', schedule: 'Schedule' },
    none: { students: 'No students in this group yet', sessions: 'No sessions or outcomes yet' },
    notes: 'A regular cohort following the course weekly schedule.',
    viewCourse: 'View course', viewInSchedule: 'View in schedule', viewAttendance: 'View attendance',
    empty: { title: 'No groups yet', msg: 'Groups will appear here once created.' },
    act: {
      add: 'New group', addToast: 'Add-group opened (demo) — nothing is saved.',
      edit: 'Edit group', editToast: 'Edit-group opened (demo).',
      assignTeacher: 'Assign teacher', addStudents: 'Add students', addStudentsToast: 'Add-students opened (demo).',
      removeStudent: 'Remove student', removeTitle: 'Remove the student from this group?', removeMsg: 'A front-end demo only — nothing is saved.', removeCta: 'Remove', removeToast: 'Removed (demo).',
      print: 'Print summary',
    },
    reason: {
      assign: 'Assigning teachers needs the backend (out of current scope).',
      enroll: 'Enrolling students needs the enrolment engine (out of current scope).',
      full: 'The group is full — students cannot be added.',
      export: 'Exporting the summary needs the backend (out of current scope).',
    },
  },

  data: {
    grp: { arabicA: 'Arabic Group A', arabicTrial: 'Arabic — Trial Group', mathAdv: 'Advanced Math Group', scienceA: 'Science Group' },
  },
};

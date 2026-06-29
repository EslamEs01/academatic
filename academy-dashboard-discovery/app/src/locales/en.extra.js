/* Spec 002 — English keys (merged into en.js at runtime). Mirrors ar.extra.js. */
export default {
  common: { close: 'Close', confirm: 'Confirm', cancel: 'Cancel', save: 'Save', add: 'Add', view: 'View', edit: 'Edit' },

  filter: {
    apply: 'Apply', reset: 'Reset',
    count: 'Showing {shown} of {total}',
    noResults: { title: 'No matching results', msg: 'Try adjusting your search or resetting the filters.' },
    all: 'All', search: 'Search…',
  },
  table: { showing: 'Showing {shown} of {total}' },
  dir: { viewProfile: 'View profile', viewDetails: 'View details' },

  topbar: {
    title: { sessions: 'Sessions', schedule: 'Timetable', students: 'Students', teachers: 'Teachers', courses: 'Courses', settings: 'Settings' },
    crumb: { sessions: 'Sessions', schedule: 'Timetable', students: 'Students', teachers: 'Teachers', courses: 'Courses', settings: 'Settings' },
  },

  sess: {
    title: 'Sessions', sub: 'Track, filter, and inspect the academy’s sessions for the day.',
    newSession: 'New session', searchPh: 'Search sessions…',
    fSubject: 'Subject', fStatus: 'Status', fTrainer: 'Trainer',
    colSubject: 'Subject', empty: { title: 'No sessions yet', msg: 'Add the first session for today and it will appear here instantly.' },
    note: 'This session runs per the academy’s approved schedule.', detailsTitle: 'Session details',
    agendaEmpty: 'No sessions today', tablistAria: 'Sessions views', today: 'Today',
  },

  sch: {
    title: 'Timetable', sub: 'A calm overview of this week’s sessions, grouped by day.',
    blockPreview: 'Session preview', searchPh: 'Search the schedule…',
    empty: { title: 'Nothing scheduled', msg: 'This week’s sessions will appear here once added.' },
    day: { sun: 'Sunday', mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', sat: 'Saturday' },
    tablistAria: 'Schedule views', timetableEmpty: 'No matching sessions in the grid',
  },

  stu: {
    title: 'Students', sub: 'Student directory — search, filter, sort, and preview a profile.',
    add: 'New student', searchPh: 'Search students…', fStatus: 'Status', fSubject: 'Subject', fSort: 'Sort',
    sort: { name: 'Name', level: 'Level', progress: 'Progress' },
    col: { name: 'Student', status: 'Status', level: 'Level', progress: 'Progress', courses: 'Courses', actions: '' },
    status: { active: 'Active', paused: 'Paused', trial: 'Trial', inactive: 'Inactive' },
    sum: { total: 'Total students', active: 'Active', trial: 'Trial' },
    detailsTitle: 'Student profile', joined: 'Joined', guardian: 'Guardian', courses: 'Enrolled courses', contact: 'Contact',
    empty: { title: 'No students', msg: 'Students will appear here once added.' },
  },

  trn: {
    title: 'Teachers', sub: 'Teacher directory — availability, status, and a performance glance.',
    searchPh: 'Search teachers…', fAvail: 'Availability', fSubject: 'Subject',
    avail: { available: 'Available', busy: 'Busy', off: 'Off' },
    perf: { utilization: 'Utilization', sessions: 'Sessions', rating: 'Rating', hours: 'Hours' },
    sum: { total: 'Total teachers', available: 'Available now', util: 'Avg utilization' },
    detailsTitle: 'Teacher profile', bio: 'About', subjects: 'Subjects', availability: 'Weekly availability', contact: 'Contact',
    empty: { title: 'No teachers', msg: 'Teachers will appear here once added.' },
  },

  cur: {
    title: 'Courses', sub: 'A structured overview of courses, levels, and their status.',
    add: 'New course', searchPh: 'Search courses…', fSubject: 'Field', fLevel: 'Level', fStatus: 'Status',
    status: { active: 'Active', draft: 'Draft', archived: 'Archived' },
    counts: { enrolled: 'enrolled', sessions: 'sessions' },
    sum: { total: 'Total courses', active: 'Active', levels: 'Levels' },
    detailsTitle: 'Course details', levels: 'Levels', overview: 'Overview',
    empty: { title: 'No courses', msg: 'Courses will appear here once added.' },
  },

  set: {
    title: 'Settings', sub: 'Academy profile, appearance, account, and permissions.',
    savedToast: 'Changes saved (demo).', toggle: 'Toggle',
    sec: {
      profile: 'Academy profile', profileDesc: 'Name, logo, and contact details.',
      appearance: 'Appearance', appearanceDesc: 'Dashboard theme and default language.',
      account: 'Account', accountDesc: 'Your account details and access.',
      notif: 'Notifications', notifDesc: 'Notification preferences (demo).',
      roles: 'Roles & permissions', rolesDesc: 'A permissions preview — read-only, not enforced.',
    },
    row: {
      academyName: 'Academy name', academyNameVal: 'Mishkah Academy',
      logo: 'Academy logo', email: 'Email', emailVal: 'admin@example.edu',
      theme: 'Theme', language: 'Language',
      sessionAlerts: 'Session alerts', weeklyReport: 'Weekly digest', billingAlerts: 'Billing alerts',
      saveProfile: 'Save changes', twoFactor: 'Two-factor auth', resetData: 'Reset demo data',
    },
    reason: { backend: 'Available once the backend is connected in a later spec.', billing: 'Requires the billing module (out of current scope).' },
    confirm: { resetTitle: 'Reset demo data?', resetMsg: 'This resets the on-screen demo values only — it does not affect any real data.', resetCta: 'Reset', resetToast: 'Demo data reset (demo).' },
    perm: {
      group: { sessions: 'Sessions', people: 'People', content: 'Content', settings: 'Settings' },
      view: 'View', manage: 'Manage', create: 'Create', export: 'Export',
      roleAdmin: 'Academy manager', roleStaff: 'Staff',
    },
  },

  /* ---- Spec 003 — Timetable / Appointment drawer ---- */
  tab: { list: 'List', timetable: 'Timetable' },

  tt: {
    allTeachers: 'All teachers', teacherLabel: 'Teacher', weekLabel: 'This week', today: 'Today',
    emptyDay: 'No sessions', emptyWeek: 'No sessions this week',
    tablistAria: 'Schedule views', gridAria: 'Week grid',
  },

  attention: {
    conflict: 'Possible conflict', delayed: 'May run late', cancelled: 'Cancelled',
    emptyDay: 'Empty day', label: 'Needs attention',
  },

  appt: {
    date: 'Date', time: 'Time', duration: 'Duration', teacher: 'Teacher',
    students: 'Students', family: 'Family', subject: 'Subject', room: 'Room',
    onlineLink: 'Session link', join: 'Join',
    joinReason: 'Live-session links arrive once live sessions are connected (out of current scope).',
    tzHint: 'Times shown in the academy timezone.',
    notes: 'Notes', materials: 'Materials', edit: 'Edit / Reschedule', notify: 'Notify',
    cancel: 'Cancel session', cancelTitle: 'Cancel this session?',
    cancelMsg: 'A front-end demo only — it does not affect any real data.',
    cancelCta: 'Cancel session', cancelToast: 'Cancelled (demo).',
    editedToast: 'Edit opened (demo).', notifiedToast: 'Notification sent (demo).',
    attentionLabel: 'Attention',
  },

  dash: {
    upNext: 'Up next this week', viewTimetable: 'View timetable', attention: '{n} need attention',
  },

  data: {
    t: { nora: 'Noura Al-Zahrani', khalid: 'Khalid Al-Anazi', huda: 'Huda Al-Maliki' },
    room: { lab2: 'Lab 2', e: 'Hall E' },
    subj: { math: 'Mathematics', arabic: 'Arabic', programming: 'Programming', physics: 'Physics', english: 'English', science: 'Science' },
    s6: { title: 'English Conversation', level: 'Intermediate' },
    s7: { title: 'Chemistry Basics', level: 'Level 1' },
    s8: { title: 'Math Club', level: 'Enrichment' },
    s9: { title: 'Creative Writing', level: 'Level 3' },
    s10: { title: 'Physics Review', level: 'Level 4' },
    stud: {
      a: { name: 'Salman Al-Ghamdi' }, b: { name: 'Joury Al-Qahtani' }, c: { name: 'Yasser Al-Dosari' },
      d: { name: 'Lama Al-Otaibi' }, e: { name: 'Faisal Al-Shehri' }, f: { name: 'Dana Al-Harbi' },
      g: { name: 'Omar Bawazir' }, h: { name: 'Raghad Al-Mutairi' }, i: { name: 'Turki Al-Subaie' }, j: { name: 'Shahad Al-Zahrani' },
      contactA: '05xxxxxxxx',
      g1: 'Abu Salman', g2: 'Umm Joury', g3: 'Abu Yasser', g4: 'Umm Lama', g5: 'Abu Faisal',
    },
    crs: {
      math: { title: 'Mathematics' }, arabic: { title: 'Arabic Language' }, prog: { title: 'Intro to Programming' },
      physics: { title: 'Physics' }, english: { title: 'English' }, science: { title: 'General Science' },
      lvl: { foundation: 'Foundation', l1: 'Level 1', l2: 'Level 2', l3: 'Level 3', advanced: 'Advanced' },
    },
    trn: {
      bioMath: 'A mathematics teacher with 8+ years of interactive teaching experience.',
      bioArabic: 'An Arabic-language teacher focused on grammar and clear expression.',
      bioProg: 'A programming instructor who builds practical skills through small projects.',
      bioPhysics: 'A physics teacher who connects concepts to experiments and daily life.',
      bioEnglish: 'An English teacher focused on conversation and confident expression.',
      bioScience: 'A science teacher who encourages exploration and scientific thinking.',
    },
  },
};

/* English (LTR). Mirrors ar.js key-for-key. */
export default {
  brand: { name: 'Mishkah Academy', plan: 'Advanced plan' },

  /* rail category labels (also the panel titles) */
  cat: {
    control: 'Control panel', families: 'Families', teachers: 'Teachers', teachersPerf: 'Performance',
    reports: 'Reports', admin: 'Administration', settings: 'Settings',
  },

  nav: {
    categories: 'Navigation categories', landmark: 'Sidebar', collapse: 'Collapse menu',
    soon: 'Soon', comingSoon: 'This page is being prepared and will be available soon.',
    reason: { finance: 'Requires the billing module (out of current scope).' },
    // control
    home: 'Home', sessions: 'Sessions', schedule: 'Schedule',
    sessionsAnalysis: 'Sessions analysis', messages: 'Messages', leads: 'New Requests', tasks: 'Tasks',
    announcements: 'Announcements', timeConverter: 'Time converter', publicHoliday: 'Public holidays', scheduledActions: 'Scheduled actions',
    // families
    families: 'Families', addFamily: 'Add family', students: 'Students', courses: 'Courses',
    familyCategories: 'Family categories', groups: 'Groups', scheduleSearch: 'Schedule search', studentResult: 'Student results', studentEvaluation: 'Student evaluation',
    // teachers
    teachers: 'Teachers', addTeacher: 'Add teacher', teacherCategories: 'Teacher categories',
    teacherKpi: 'Teacher performance', sessionsKpi: 'Sessions performance', monthlyPerf: 'Monthly performance',
    // reports
    reports: 'Reports', monthlyReports: 'Monthly reports', dataAnalysis: 'Data analysis',
    invoices: 'Invoices', monthlyInvoices: 'Monthly invoices', salaries: 'Salaries', staffSalaries: 'Staff salaries', payments: 'Payments', classSalaryReport: 'Class salary report',
    // administration
    staff: 'Staff & Roles', materials: 'Materials', books: 'Library', certificates: 'Certificates', certificateRequests: 'Certificate requests', banks: 'Banks',
    // settings
    settings: 'Settings', settingsGeneral: 'General', settingsIntegrations: 'Integrations', settingsCustomization: 'Customization', settingsNotifications: 'Notifications', settingsSecurity: 'Security', settingsUsers: 'Users & staff',
  },

  topbar: {
    title: { dashboard: 'Dashboard', reports: 'Reports center', gallery: 'Component gallery' },
    crumb: { home: 'Home', dashboard: 'Dashboard', reports: 'Reports', gallery: 'Gallery' },
    searchPlaceholder: 'Search students, sessions, teachers…',
    openMenu: 'Open menu', notifications: 'Notifications', toggleTheme: 'Toggle theme', toggleLang: 'Change language',
    profileMenu: 'Account menu',
    apps: 'Quick launch', quickActions: 'Quick actions',
    qa: { newSession: 'New session', addStudent: 'Add student', addTeacher: 'Add teacher', announce: 'Create announcement' },
    qaToast: 'Creating records will be available once the backend is connected in a later spec.',
    announceReason: 'Requires the communication module (soon).',
    cmd: { hint: 'Quick search', recent: 'Recent searches', shortcut: 'Add shortcut', empty: 'No matching results' },
    notifViewAll: 'View all notifications', notifViewAllReason: 'The notification center is being prepared (soon).',
  },

  theme: { light: 'Light', dark: 'Dark', system: 'System', label: 'Theme' },
  lang: { label: 'Language', ar: 'العربية', en: 'English' },
  menu: {
    account: 'Profile', settings: 'Settings', logout: 'Sign out', help: 'Help & support',
    logoutConfirm: { title: 'Sign out?', msg: 'Your demo session will end. No real data is saved.', cta: 'Sign out', toast: 'Signed out (demo).' },
  },

  welcome: {
    greeting: { morning: 'Good morning, Noura 👋' },
    summary: 'You have {today} sessions today and {live} running right now. Everything is on track.',
    action: { newSession: 'New session', viewSchedule: 'View schedule' },
    stat: { upcoming: 'Upcoming today', live: 'Live now' },
    attendance: { label: 'Attendance rate', note: 'Above the weekly average' },
  },

  section: {
    overview: 'Overview', overviewLink: 'View all metrics',
    reports: 'Reports', reportsLink: 'Reports center',
    states: 'Interface states',
  },

  kpi: {
    revenue: 'Monthly revenue', attendance: 'Attendance rate',
    activeStudents: 'Active students', todaySessions: 'Today’s sessions',
  },
  unit: { sar: 'SAR' },

  sessions: {
    title: 'Today’s sessions',
    meta: '{count} sessions · {updated}',
    updated: { twoMin: 'Updated 2 minutes ago' },
    newSession: 'New session', apply: 'Apply',
    filterActive: 'Active filter: Today', anytime: 'Any time', dateValue: 'Jun 28',
    subjectLabel: 'Subject: All', searchPlaceholder: 'Search sessions…',
    col: { time: 'Time', session: 'Session', trainer: 'Teacher', room: 'Room', students: 'Students', status: 'Status', actions: '' },
    duration: '{n} min',
    pagination: 'Showing {shown} of {total} sessions',
    action: { view: 'View details', edit: 'Edit session', cancel: 'Cancel session' },
    rowMenu: 'Session actions',
  },

  status: { live: 'Live now', upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' },

  report: {
    permissionBadge: 'Permission required',
    trainers: { title: 'Teachers report', desc: 'Teacher performance, hours and ratings.', reason: 'Requires academy-manager permission.' },
    revenue: { title: 'Revenue report', desc: 'Monthly subscriptions and payments.' },
    studentPerf: { title: 'Student performance', desc: 'Grade progress and participation across the term.' },
    attendanceMonthly: { title: 'Monthly attendance', desc: 'Attendance and absence rates per subject and level.' },
  },

  state: {
    loading: 'Loading…',
    error: { title: 'Couldn’t load data', msg: 'A temporary connection error occurred. Check your network and try again.', retry: 'Try again' },
    empty: { title: 'No sessions yet', msg: 'Add the first session for today and it will appear here instantly.', cta: 'Add session' },
  },

  reportsPage: {
    title: 'Reports center',
    subtitle: 'Operational and financial academy reports in one place.',
  },

  gallery: {
    title: 'Component gallery',
    subtitle: 'Design-system proof: base components across both directions and all themes.',
    sec: { buttons: 'Buttons', chips: 'Status chips', tiles: 'Status tiles', kpi: 'KPI cards', medallions: 'Medallions', fields: 'Form fields', avatars: 'Avatars', badges: 'Badges', table: 'Table', report: 'Report cards', states: 'Interface states', menu: 'Menus', toast: 'Toasts' },
    demoToast: 'Changes saved successfully.',
    showToast: 'Show toast',
  },

  data: {
    profile: { name: 'Noura Al-Otaibi', role: 'Academy Manager' },
    t: { sara: 'Sara Al-Qahtani', mohammed: 'Mohammed Al-Dosari', layan: 'Layan Al-Shamri', abdullah: 'Abdullah Al-Harbi', reem: 'Reem Al-Mutairi' },
    room: { a: 'Hall A', c: 'Hall C', lab1: 'Lab 1', b: 'Hall B', d: 'Hall D' },
    s1: { title: 'Mathematics Foundations', level: 'Level 3' },
    s2: { title: 'Arabic Grammar', level: 'Level 2' },
    s3: { title: 'Intro to Programming', level: 'Level 1' },
    s4: { title: 'Physics Booster Circle', level: 'Level 4' },
    s5: { title: 'Communication Skills', level: 'Evening program' },
  },

  common: { skipToContent: 'Skip to content' },
};

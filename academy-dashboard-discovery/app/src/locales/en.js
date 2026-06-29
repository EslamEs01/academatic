/* English (LTR). Mirrors ar.js key-for-key. */
export default {
  brand: { name: 'Mishkah Academy', plan: 'Advanced plan' },

  nav: {
    group: { general: 'General', academic: 'Academic', administration: 'Administration' },
    home: 'Home', sessions: 'Sessions', schedule: 'Schedule',
    students: 'Students', trainers: 'Trainers', curricula: 'Curricula',
    reports: 'Reports', settings: 'Settings',
    help: { title: 'Help center', subtitle: '24-hour support' },
  },

  topbar: {
    title: { dashboard: 'Dashboard', reports: 'Reports center', gallery: 'Component gallery' },
    crumb: { home: 'Home', dashboard: 'Dashboard', reports: 'Reports', gallery: 'Gallery' },
    searchPlaceholder: 'Search students, sessions, trainers…',
    openMenu: 'Open menu', notifications: 'Notifications', toggleTheme: 'Toggle theme', toggleLang: 'Change language',
    profileMenu: 'Account menu',
  },

  theme: { light: 'Light', dark: 'Dark', system: 'System', label: 'Theme' },
  lang: { label: 'Language', ar: 'العربية', en: 'English' },
  menu: { account: 'Profile', settings: 'Settings', logout: 'Sign out' },

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
    col: { time: 'Time', session: 'Session', trainer: 'Trainer', room: 'Room', students: 'Students', status: 'Status', actions: '' },
    duration: '{n} min',
    pagination: 'Showing {shown} of {total} sessions',
    action: { view: 'View details', edit: 'Edit session', cancel: 'Cancel session' },
    rowMenu: 'Session actions',
  },

  status: { live: 'Live now', upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' },

  report: {
    permissionBadge: 'Permission required',
    trainers: { title: 'Trainers report', desc: 'Trainer performance, hours and ratings.', reason: 'Requires academy-manager permission.' },
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

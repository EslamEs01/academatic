/* Arabic (default). Original placeholder copy — no legacy/private wording. */
export default {
  brand: { name: 'أكاديمية مشكاة', plan: 'الخطة المتقدمة' },

  /* rail category labels (also the panel titles) */
  cat: {
    control: 'لوحة التحكم', families: 'العائلات', teachers: 'المعلمون', teachersPerf: 'مؤشرات الأداء',
    reports: 'التقارير', admin: 'الإدارة', settings: 'الإعدادات',
  },

  nav: {
    categories: 'فئات التنقّل', landmark: 'القائمة الجانبية', collapse: 'طيّ القائمة',
    soon: 'قريبًا', comingSoon: 'هذه الصفحة قيد الإعداد وستتوفر قريبًا.',
    reason: { finance: 'تتطلب وحدة الفوترة (خارج النطاق الحالي).' },
    // control
    home: 'الرئيسية', sessions: 'الجلسات', schedule: 'الجدول الدراسي',
    sessionsAnalysis: 'تحليل الجلسات', messages: 'المحادثات', leads: 'الطلبات الجديدة', tasks: 'المهام',
    announcements: 'الإعلانات والإشعارات', timeConverter: 'محوّل الوقت', publicHoliday: 'العطلات الرسمية', scheduledActions: 'الإجراءات المجدولة',
    // families
    families: 'العائلات', addFamily: 'إضافة عائلة', students: 'الطلاب', courses: 'الدورات',
    familyCategories: 'فئات العائلات', groups: 'المجموعات', scheduleSearch: 'بحث الجدول', studentResult: 'نتائج الطلاب', studentEvaluation: 'تقييم الطلاب',
    // teachers
    teachers: 'المعلمون', addTeacher: 'إضافة معلم', teacherCategories: 'فئات المعلمين',
    teacherKpi: 'مؤشرات أداء المعلمين', sessionsKpi: 'مؤشر أداء الحصص', monthlyPerf: 'الأداء الشهري',
    // reports
    reports: 'التقارير', monthlyReports: 'التقارير الشهرية', dataAnalysis: 'تحليل البيانات',
    invoices: 'الفواتير', monthlyInvoices: 'الفواتير الشهرية', salaries: 'الرواتب', staffSalaries: 'رواتب الموظفين', payments: 'المدفوعات', classSalaryReport: 'تقرير رواتب الفصول',
    // administration
    staff: 'الفريق والصلاحيات', materials: 'المواد التعليمية', books: 'المكتبة', certificates: 'الشهادات', certificateRequests: 'طلبات الشهادات', banks: 'البنوك',
    // settings
    settings: 'الإعدادات', settingsGeneral: 'عام', settingsIntegrations: 'التكاملات', settingsCustomization: 'التخصيص', settingsNotifications: 'الإشعارات', settingsSecurity: 'الأمان', settingsUsers: 'المستخدمون والموظفون',
  },

  topbar: {
    title: { dashboard: 'لوحة التحكم', reports: 'مركز التقارير', gallery: 'معرض المكوّنات' },
    crumb: { home: 'الرئيسية', dashboard: 'لوحة التحكم', reports: 'التقارير', gallery: 'المعرض' },
    searchPlaceholder: 'ابحث عن طالب، جلسة، معلم…',
    openMenu: 'فتح القائمة', notifications: 'الإشعارات', toggleTheme: 'تبديل السمة', toggleLang: 'تغيير اللغة',
    profileMenu: 'قائمة الحساب',
    apps: 'الوصول السريع', quickActions: 'إجراءات سريعة',
    qa: { newSession: 'جلسة جديدة', addStudent: 'إضافة طالب', addTeacher: 'إضافة معلم', announce: 'إنشاء إعلان' },
    qaToast: 'سيتوفّر الإنشاء بعد ربط الخادم في مرحلة لاحقة.',
    announceReason: 'تتطلب وحدة التواصل (قريبًا).',
    cmd: { hint: 'بحث سريع', recent: 'عمليات البحث الأخيرة', shortcut: 'إضافة اختصار', empty: 'لا توجد نتائج مطابقة' },
    notifViewAll: 'عرض كل الإشعارات', notifViewAllReason: 'مركز الإشعارات قيد الإعداد (قريبًا).',
  },

  theme: { light: 'فاتح', dark: 'داكن', system: 'حسب النظام', label: 'السمة' },
  lang: { label: 'اللغة', ar: 'العربية', en: 'English' },
  menu: {
    account: 'الملف الشخصي', settings: 'الإعدادات', logout: 'تسجيل الخروج', help: 'المساعدة والدعم',
    logoutConfirm: { title: 'تسجيل الخروج؟', msg: 'سيتم إنهاء جلستك التجريبية. لا يتم حفظ أي بيانات حقيقية.', cta: 'تسجيل الخروج', toast: 'تم تسجيل الخروج (تجريبي).' },
  },

  welcome: {
    greeting: { morning: 'صباح الخير، نورة 👋' },
    summary: 'لديك {today} جلسة اليوم، و{live} جلسات جارية الآن. كل شيء يسير بسلاسة.',
    action: { newSession: 'جلسة جديدة', viewSchedule: 'عرض الجدول' },
    stat: { upcoming: 'قادمة اليوم', live: 'جارية الآن' },
    attendance: { label: 'نسبة الحضور', note: 'أعلى من المعدل الأسبوعي' },
  },

  section: {
    overview: 'نظرة عامة', overviewLink: 'عرض كل المؤشرات',
    reports: 'التقارير', reportsLink: 'مركز التقارير',
    states: 'حالات الواجهة',
  },

  kpi: {
    revenue: 'الإيرادات الشهرية', attendance: 'نسبة الحضور',
    activeStudents: 'الطلاب النشطون', todaySessions: 'جلسات اليوم',
  },
  unit: { sar: 'ريال' },

  sessions: {
    title: 'جلسات اليوم',
    meta: '{count} جلسة · {updated}',
    updated: { twoMin: 'آخر تحديث قبل دقيقتين' },
    newSession: 'جلسة جديدة', apply: 'تطبيق',
    filterActive: 'فلتر نشط: اليوم', anytime: 'أي وقت', dateValue: '٢٨ يونيو',
    subjectLabel: 'المادة: الكل', searchPlaceholder: 'ابحث في الجلسات…',
    col: { time: 'الوقت', session: 'الجلسة', trainer: 'المعلم', room: 'القاعة', students: 'الطلاب', status: 'الحالة', actions: '' },
    duration: '{n} دقيقة',
    pagination: 'عرض {shown} من {total} جلسة',
    action: { view: 'عرض التفاصيل', edit: 'تعديل الجلسة', cancel: 'إلغاء الجلسة' },
    rowMenu: 'إجراءات الجلسة',
  },

  status: { live: 'جارية الآن', upcoming: 'قادمة', completed: 'مكتملة', cancelled: 'ملغاة' },

  report: {
    permissionBadge: 'صلاحية مطلوبة',
    trainers: { title: 'تقرير المعلمين', desc: 'أداء المعلمين وساعاتهم وتقييماتهم.', reason: 'يتطلب صلاحية مدير الأكاديمية.' },
  },

  state: {
    loading: 'جارٍ التحميل…',
    error: { title: 'تعذّر تحميل البيانات', msg: 'حدث خطأ مؤقت في الاتصال. تحقّق من الشبكة وحاول مجددًا.', retry: 'إعادة المحاولة' },
    empty: { title: 'لا توجد جلسات بعد', msg: 'ابدأ بإضافة أول جلسة لهذا اليوم وستظهر هنا مباشرة.', cta: 'إضافة جلسة' },
  },

  reportsPage: {
    title: 'مركز التقارير',
    subtitle: 'تقارير الأكاديمية الأكاديمية والتشغيلية في مكان واحد.',
  },

  gallery: {
    title: 'معرض المكوّنات',
    subtitle: 'إثبات نظام التصميم: المكوّنات الأساسية في الاتجاهين وكل السمات.',
    sec: { buttons: 'الأزرار', chips: 'شارات الحالة', tiles: 'بطاقات الحالة', kpi: 'بطاقات المؤشرات', medallions: 'الميداليات', fields: 'حقول الإدخال', avatars: 'الصور الرمزية', badges: 'الشارات', table: 'الجدول', report: 'بطاقات التقارير', states: 'حالات الواجهة', menu: 'القوائم', toast: 'التنبيهات' },
    demoToast: 'تم حفظ التغييرات بنجاح.',
    showToast: 'عرض تنبيه',
  },

  data: {
    profile: { name: 'نورة العتيبي', role: 'مديرة الأكاديمية' },
    t: { sara: 'سارة القحطاني', mohammed: 'محمد الدوسري', layan: 'ليان الشمري', abdullah: 'عبدالله الحربي', reem: 'ريم المطيري' },
    room: { a: 'قاعة أ', c: 'قاعة ج', lab1: 'معمل ١', b: 'قاعة ب', d: 'قاعة د' },
    s1: { title: 'أساسيات الرياضيات', level: 'المستوى الثالث' },
    s2: { title: 'قواعد اللغة العربية', level: 'المستوى الثاني' },
    s3: { title: 'مقدمة في البرمجة', level: 'المستوى الأول' },
    s4: { title: 'حلقة تقوية فيزياء', level: 'المستوى الرابع' },
    s5: { title: 'مهارات التواصل', level: 'برنامج مسائي' },
  },

  common: { skipToContent: 'تخطَّ إلى المحتوى' },
};

/* Arabic (default). Original placeholder copy — no legacy/private wording. */
export default {
  brand: { name: 'أكاديمية مشكاة', plan: 'الخطة المتقدمة' },

  nav: {
    group: { general: 'عام', academic: 'الأكاديمية', administration: 'الإدارة' },
    home: 'الرئيسية', sessions: 'الجلسات', schedule: 'الجدول الزمني',
    students: 'الطلاب', trainers: 'المدربون', curricula: 'المناهج',
    reports: 'التقارير', settings: 'الإعدادات',
    help: { title: 'مركز المساعدة', subtitle: 'دعم على مدار ٢٤ ساعة' },
  },

  topbar: {
    title: { dashboard: 'لوحة التحكم', reports: 'مركز التقارير', gallery: 'معرض المكوّنات' },
    crumb: { home: 'الرئيسية', dashboard: 'لوحة التحكم', reports: 'التقارير', gallery: 'المعرض' },
    searchPlaceholder: 'ابحث عن طالب، جلسة، مدرب…',
    openMenu: 'فتح القائمة', notifications: 'الإشعارات', toggleTheme: 'تبديل السمة', toggleLang: 'تغيير اللغة',
    profileMenu: 'قائمة الحساب',
  },

  theme: { light: 'فاتح', dark: 'داكن', system: 'حسب النظام', label: 'السمة' },
  lang: { label: 'اللغة', ar: 'العربية', en: 'English' },
  menu: { account: 'الملف الشخصي', settings: 'الإعدادات', logout: 'تسجيل الخروج' },

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
    col: { time: 'الوقت', session: 'الجلسة', trainer: 'المدرب', room: 'القاعة', students: 'الطلاب', status: 'الحالة', actions: '' },
    duration: '{n} دقيقة',
    pagination: 'عرض {shown} من {total} جلسة',
    action: { view: 'عرض التفاصيل', edit: 'تعديل الجلسة', cancel: 'إلغاء الجلسة' },
    rowMenu: 'إجراءات الجلسة',
  },

  status: { live: 'جارية الآن', upcoming: 'قادمة', completed: 'مكتملة', cancelled: 'ملغاة' },

  report: {
    permissionBadge: 'صلاحية مطلوبة',
    trainers: { title: 'تقرير المدربين', desc: 'أداء المدربين وساعاتهم وتقييماتهم.', reason: 'يتطلب صلاحية مدير الأكاديمية.' },
    revenue: { title: 'تقرير الإيرادات', desc: 'الاشتراكات والمدفوعات الشهرية.' },
    studentPerf: { title: 'أداء الطلاب', desc: 'تطوّر الدرجات والمشاركة عبر الفصل.' },
    attendanceMonthly: { title: 'تقرير الحضور الشهري', desc: 'نِسب الحضور والغياب لكل مادة ومستوى.' },
  },

  state: {
    loading: 'جارٍ التحميل…',
    error: { title: 'تعذّر تحميل البيانات', msg: 'حدث خطأ مؤقت في الاتصال. تحقّق من الشبكة وحاول مجددًا.', retry: 'إعادة المحاولة' },
    empty: { title: 'لا توجد جلسات بعد', msg: 'ابدأ بإضافة أول جلسة لهذا اليوم وستظهر هنا مباشرة.', cta: 'إضافة جلسة' },
  },

  reportsPage: {
    title: 'مركز التقارير',
    subtitle: 'تقارير الأكاديمية التشغيلية والمالية في مكان واحد.',
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

/* Spec 002 — Arabic keys (merged into ar.js at runtime). Original placeholder
 * content; no legacy/private wording. */
export default {
  common: { close: 'إغلاق', confirm: 'تأكيد', cancel: 'إلغاء', save: 'حفظ', add: 'إضافة', view: 'عرض', edit: 'تعديل' },

  filter: {
    apply: 'تطبيق', reset: 'إعادة ضبط',
    count: 'عرض {shown} من {total}',
    noResults: { title: 'لا توجد نتائج مطابقة', msg: 'جرّب تعديل البحث أو إعادة ضبط عوامل التصفية.' },
    all: 'الكل', search: 'ابحث…',
  },
  table: { showing: 'عرض {shown} من {total}' },
  dir: { viewProfile: 'عرض الملف', viewDetails: 'عرض التفاصيل' },

  topbar: {
    title: { sessions: 'الجلسات', schedule: 'الجدول الدراسي', students: 'الطلاب', teachers: 'المعلمون', courses: 'الدورات', settings: 'الإعدادات' },
    crumb: { sessions: 'الجلسات', schedule: 'الجدول الدراسي', students: 'الطلاب', teachers: 'المعلمون', courses: 'الدورات', settings: 'الإعدادات' },
  },

  /* ---- Sessions page ---- */
  sess: {
    title: 'الجلسات', sub: 'تابِع جلسات الأكاديمية اليوم وصفِّها وافتح تفاصيلها.',
    newSession: 'جلسة جديدة', searchPh: 'ابحث في الجلسات…',
    fSubject: 'المادة', fStatus: 'الحالة', fTrainer: 'المدرب',
    colSubject: 'المادة', empty: { title: 'لا توجد جلسات بعد', msg: 'ابدأ بإضافة أول جلسة لهذا اليوم وستظهر هنا مباشرة.' },
    note: 'تُدار هذه الجلسة وفق الجدول المعتمد للأكاديمية.', detailsTitle: 'تفاصيل الجلسة',
  },

  /* ---- Schedule page ---- */
  sch: {
    title: 'الجدول الدراسي', sub: 'نظرة هادئة على جلسات الأسبوع مرتّبة حسب اليوم.',
    blockPreview: 'معاينة الجلسة', searchPh: 'ابحث في الجدول…',
    empty: { title: 'لا توجد جلسات مجدولة', msg: 'ستظهر جلسات الأسبوع هنا فور إضافتها.' },
    day: { sun: 'الأحد', mon: 'الإثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس' },
  },

  /* ---- Students page ---- */
  stu: {
    title: 'الطلاب', sub: 'دليل الطلاب — ابحث وصفِّ ورتّب واطّلع على الملف بسرعة.',
    add: 'طالب جديد', searchPh: 'ابحث عن طالب…', fStatus: 'الحالة', fSubject: 'المادة', fSort: 'ترتيب',
    sort: { name: 'الاسم', level: 'المستوى', progress: 'التقدّم' },
    col: { name: 'الطالب', status: 'الحالة', level: 'المستوى', progress: 'التقدّم', courses: 'المواد', actions: '' },
    status: { active: 'نشط', paused: 'موقوف مؤقتًا', trial: 'تجريبي', inactive: 'غير نشط' },
    sum: { total: 'إجمالي الطلاب', active: 'النشطون', trial: 'تجريبي' },
    detailsTitle: 'ملف الطالب', joined: 'تاريخ الالتحاق', guardian: 'وليّ الأمر', courses: 'المواد المسجّلة', contact: 'وسيلة التواصل',
    empty: { title: 'لا يوجد طلاب', msg: 'سيظهر الطلاب هنا بعد إضافتهم.' },
  },

  /* ---- Trainers page ---- */
  trn: {
    title: 'المعلمون', sub: 'دليل المعلمين — التوفّر والحالة ولمحة عن الأداء.',
    searchPh: 'ابحث عن معلم…', fAvail: 'التوفّر', fSubject: 'المادة',
    avail: { available: 'متاح', busy: 'مشغول', off: 'إجازة' },
    perf: { utilization: 'الإشغال', sessions: 'جلسات', rating: 'التقييم', hours: 'ساعات' },
    sum: { total: 'إجمالي المعلمين', available: 'متاحون الآن', util: 'متوسط الإشغال' },
    detailsTitle: 'ملف المعلم', bio: 'نبذة', subjects: 'المواد', availability: 'التوفّر الأسبوعي', contact: 'وسيلة التواصل',
    empty: { title: 'لا يوجد معلمون', msg: 'سيظهر المعلمون هنا بعد إضافتهم.' },
  },

  /* ---- Curricula page ---- */
  cur: {
    title: 'الدورات', sub: 'نظرة منظّمة على الدورات والمستويات وحالتها.',
    add: 'دورة جديدة', searchPh: 'ابحث في الدورات…', fSubject: 'المجال', fLevel: 'المستوى', fStatus: 'الحالة',
    status: { active: 'فعّالة', draft: 'مسودّة', archived: 'مؤرشفة' },
    counts: { enrolled: 'مسجّل', sessions: 'جلسة' },
    sum: { total: 'إجمالي الدورات', active: 'الفعّالة', levels: 'المستويات' },
    detailsTitle: 'تفاصيل الدورة', levels: 'المستويات', overview: 'نظرة عامة',
    empty: { title: 'لا توجد دورات', msg: 'ستظهر الدورات هنا بعد إضافتها.' },
  },

  /* ---- Settings page ---- */
  set: {
    title: 'الإعدادات', sub: 'إعدادات الأكاديمية والمظهر والحساب والصلاحيات.',
    savedToast: 'تم حفظ التغييرات (تجريبي).', toggle: 'تبديل',
    sec: {
      profile: 'ملف الأكاديمية', profileDesc: 'الاسم والشعار ومعلومات التواصل.',
      appearance: 'المظهر', appearanceDesc: 'السمة واللغة الافتراضية للوحة التحكم.',
      account: 'الحساب', accountDesc: 'بيانات حسابك ووصولك.',
      notif: 'التنبيهات', notifDesc: 'تفضيلات الإشعارات (تجريبية).',
      roles: 'الأدوار والصلاحيات', rolesDesc: 'معاينة للصلاحيات — للعرض فقط، دون تفعيل.',
    },
    row: {
      academyName: 'اسم الأكاديمية', academyNameVal: 'أكاديمية مشكاة',
      logo: 'شعار الأكاديمية', email: 'البريد الإلكتروني', emailVal: 'admin@example.edu',
      theme: 'السمة', language: 'اللغة',
      sessionAlerts: 'تنبيهات الجلسات', weeklyReport: 'الملخّص الأسبوعي', billingAlerts: 'تنبيهات الفوترة',
      saveProfile: 'حفظ التغييرات', twoFactor: 'التحقّق بخطوتين', resetData: 'إعادة ضبط البيانات التجريبية',
    },
    reason: { backend: 'متاح بعد ربط الخادم في مرحلة لاحقة.', billing: 'تتطلب وحدة الفوترة (خارج النطاق الحالي).' },
    confirm: { resetTitle: 'إعادة ضبط البيانات التجريبية؟', resetMsg: 'سيعيد هذا ضبط القيم التجريبية في الواجهة فقط — لا يؤثّر على أي بيانات حقيقية.', resetCta: 'إعادة الضبط', resetToast: 'تمت إعادة الضبط (تجريبي).' },
    perm: {
      group: { sessions: 'الجلسات', people: 'الأشخاص', content: 'المحتوى', settings: 'الإعدادات' },
      view: 'عرض', manage: 'إدارة', create: 'إنشاء', export: 'تصدير',
      roleAdmin: 'مدير الأكاديمية', roleStaff: 'موظّف',
    },
  },

  /* ============ fixture content ============ */
  data: {
    t: { nora: 'نورة الزهراني', khalid: 'خالد العنزي', huda: 'هدى المالكي' },
    room: { lab2: 'معمل ٢', e: 'قاعة هـ' },
    subj: { math: 'الرياضيات', arabic: 'اللغة العربية', programming: 'البرمجة', physics: 'الفيزياء', english: 'الإنجليزية', science: 'العلوم' },
    s6: { title: 'محادثة إنجليزية', level: 'المستوى المتوسط' },
    s7: { title: 'أساسيات الكيمياء', level: 'المستوى الأول' },
    s8: { title: 'نادي الرياضيات', level: 'إثرائي' },
    s9: { title: 'الكتابة الإبداعية', level: 'المستوى الثالث' },
    s10: { title: 'مراجعة الفيزياء', level: 'المستوى الرابع' },
    stud: {
      a: { name: 'سلمان الغامدي' }, b: { name: 'جوري القحطاني' }, c: { name: 'ياسر الدوسري' },
      d: { name: 'لمى العتيبي' }, e: { name: 'فيصل الشهري' }, f: { name: 'دانة الحربي' },
      g: { name: 'عمر باوزير' }, h: { name: 'رغد المطيري' }, i: { name: 'تركي السبيعي' }, j: { name: 'شهد الزهراني' },
      contactA: '٠٥xxxxxxxx',
      g1: 'أبو سلمان', g2: 'أم جوري', g3: 'أبو ياسر', g4: 'أم لمى', g5: 'أبو فيصل',
    },
    crs: {
      math: { title: 'الرياضيات' }, arabic: { title: 'اللغة العربية' }, prog: { title: 'مقدمة في البرمجة' },
      physics: { title: 'الفيزياء' }, english: { title: 'الإنجليزية' }, science: { title: 'العلوم العامة' },
      lvl: { foundation: 'تأسيسي', l1: 'المستوى الأول', l2: 'المستوى الثاني', l3: 'المستوى الثالث', advanced: 'متقدّم' },
    },
    trn: {
      bioMath: 'معلّمة رياضيات بخبرة تتجاوز ثماني سنوات في التعليم التفاعلي.',
      bioArabic: 'معلّم لغة عربية يركّز على القواعد والتعبير بأسلوب ميسّر.',
      bioProg: 'مدرّب برمجة يبني المهارات العملية عبر مشاريع صغيرة.',
      bioPhysics: 'معلّم فيزياء يربط المفاهيم بالتجارب والحياة اليومية.',
      bioEnglish: 'معلّمة إنجليزية تركّز على المحادثة والثقة في التعبير.',
      bioScience: 'معلّم علوم يشجّع الاستكشاف والتفكير العلمي.',
    },
  },
};

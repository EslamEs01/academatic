/* Spec 002 — Arabic keys (merged into ar.js at runtime). Original placeholder
 * content; no legacy/private wording. */
export default {
  common: { close: 'إغلاق', confirm: 'تأكيد', cancel: 'إلغاء', save: 'حفظ', add: 'إضافة', view: 'عرض', edit: 'تعديل', backendRequiredNote: 'هذا الإجراء يحتاج اتصال الخادم لإتمامه — لا يُحفَظ شيء الآن.' },
  interaction: {
    discardTitle: 'توجد تغييرات غير محفوظة',
    discardMessage: 'هل تريد متابعة التعديل أم تجاهل التغييرات؟ لم يتم حفظ المعلومات بعد.',
    continueEditing: 'متابعة التعديل',
    discardChanges: 'تجاهل التغييرات',
    validationSummary: 'راجع الحقول المعلَّمة وصحّحها قبل المتابعة.',
    validationError: 'تحقق من هذه القيمة.',
  },

  /* ---- Spec 032 — shared form-drawer option labels (fixtures/form-options.js) ---- */
  fopt: {
    status: { active: 'نشط', trial: 'تجريبي', suspended: 'موقوف مؤقتًا', inactive: 'غير نشط' },
    gender: { male: 'ذكر', female: 'أنثى' },
    role: { manager: 'مدير', accountant: 'محاسب', supervisor: 'مشرف', support: 'دعم' },
    day: { sat: 'السبت', sun: 'الأحد', mon: 'الاثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس' },
    dur: { m30: '٣٠ دقيقة', m45: '٤٥ دقيقة', m60: '٦٠ دقيقة', m90: '٩٠ دقيقة' },
    ftype: { text: 'نص', select: 'قائمة اختيار', yesno: 'نعم / لا', note: 'ملاحظة' },
  },

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
    agendaEmpty: 'لا جلسات اليوم', tablistAria: 'طرق عرض الجلسات', today: 'اليوم',
    /* Spec 032 — the sess-new form drawer */
    form: {
      course: 'الدورة', teacher: 'المعلم', date: 'التاريخ', time: 'الوقت', duration: 'المدة',
      fromCredit: 'مصدر رصيد الجلسة', datePh: '2025-03-15', timePh: '16:30',
      credit: { package: 'من رصيد الباقة', extra: 'جلسة إضافية', trial: 'جلسة تجريبية' },
    },
  },

  /* ---- Schedule page ---- */
  sch: {
    title: 'الجدول الدراسي', sub: 'نظرة هادئة على جلسات الأسبوع مرتّبة حسب اليوم.',
    blockPreview: 'معاينة الجلسة', searchPh: 'ابحث في الجدول…',
    empty: { title: 'لا توجد جلسات مجدولة', msg: 'ستظهر جلسات الأسبوع هنا فور إضافتها.' },
    day: { sun: 'الأحد', mon: 'الإثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس', sat: 'السبت' },
    tablistAria: 'طرق عرض الجدول', timetableEmpty: 'لا توجد جلسات مطابقة في الجدول',
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
    savedToast: 'سيتوفّر حفظ التغييرات بعد ربط الخادم.', toggle: 'تبديل',
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
    confirm: { resetTitle: 'إعادة ضبط البيانات التجريبية؟', resetMsg: 'سيعيد هذا ضبط القيم التجريبية في الواجهة فقط — لا يؤثّر على أي بيانات حقيقية.', resetCta: 'إعادة الضبط', resetToast: 'سيتوفّر إعادة الضبط بعد ربط الخادم.' },
    perm: {
      group: { sessions: 'الجلسات', people: 'الأشخاص', content: 'المحتوى', settings: 'الإعدادات' },
      view: 'عرض', manage: 'إدارة', create: 'إنشاء', export: 'تصدير',
      roleAdmin: 'مدير الأكاديمية', roleStaff: 'موظّف',
    },
  },

  /* ---- Spec 003 — Timetable / Appointment drawer ---- */
  tab: { list: 'القائمة', timetable: 'الجدول الأسبوعي' },

  tt: {
    allTeachers: 'كل المعلمين', teacherLabel: 'المعلم', weekLabel: 'هذا الأسبوع', today: 'اليوم',
    emptyDay: 'لا جلسات', emptyWeek: 'لا توجد جلسات هذا الأسبوع',
    tablistAria: 'طرق عرض الجدول', gridAria: 'جدول الأسبوع',
  },

  attention: {
    conflict: 'تعارض محتمل', delayed: 'قد تتأخر', cancelled: 'ملغاة',
    emptyDay: 'يوم فارغ', label: 'تحتاج انتباه',
  },

  appt: {
    date: 'التاريخ', time: 'الوقت', duration: 'المدة', teacher: 'المعلم',
    students: 'الطلاب', family: 'العائلة', subject: 'المادة', room: 'القاعة',
    onlineLink: 'رابط الجلسة', join: 'انضمام',
    joinReason: 'يتوفر الرابط بعد ربط الجلسات المباشرة (خارج النطاق الحالي).',
    tzHint: 'الأوقات معروضة بتوقيت الأكاديمية.',
    notes: 'ملاحظات', materials: 'المواد', edit: 'تعديل / إعادة جدولة', notify: 'تنبيه',
    cancel: 'إلغاء الجلسة', cancelTitle: 'إلغاء هذه الجلسة؟',
    cancelMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يتغيّر أي شيء الآن.',
    cancelCta: 'إلغاء الجلسة', cancelToast: 'سيتوفّر إلغاء الجلسة بعد ربط الخادم.',
    editedToast: 'سيتوفّر تعديل الجلسة بعد ربط الخادم.', notifiedToast: 'سيتوفّر إرسال التنبيه بعد ربط الخادم.',
    attentionLabel: 'تنبيه',
  },

  dash: {
    upNext: 'القادم هذا الأسبوع', viewTimetable: 'عرض الجدول', viewAllSessions: 'عرض كل الجلسات', attention: '{n} تحتاج انتباه',
  },

  /* ---- Spec 026 — folded ops bands (queue → Sessions, requests → Schedule) ---- */
  ops: {
    reason: { backend: 'يتطلب اتصال الخادم — خارج النطاق الحالي.' },
    queue: {
      title: 'قائمة المهام التشغيلية', sub: 'ملاحظات ومهام مرتبطة بالجلسات — للعرض فقط.',
      add: 'إضافة إلى القائمة',
      lvl: { urgent: 'عاجل', medium: 'متوسط', normal: 'عادي' },
      st: { open: 'مفتوح', inprogress: 'قيد التنفيذ', closed: 'مغلق' },
      cls: { math: 'أساسيات الرياضيات', english: 'محادثة إنجليزية', science: 'نادي العلوم' },
      i: { q1: 'متابعة تجهيز قاعة الاختبار قبل الحصة.', q2: 'التأكد من روابط الحضور للطلاب الجدد.', q3: 'مراجعة ملاحظات الحصة السابقة.' },
    },
    req: {
      title: 'طلبات الجدولة الواردة', sub: 'طلبات جلسات وتجارب بانتظار المراجعة — للعرض فقط.',
      accept: 'قبول', reject: 'رفض',
      kind: { regular: 'جلسة', trial: 'تجربة' },
      s: { salman: 'سلمان الغامدي', dana: 'دانة الحربي' },
      c: { math: 'الرياضيات', english: 'الإنجليزية' },
      w: { satEve: 'السبت · مساءً', monMorn: 'الإثنين · صباحًا' },
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

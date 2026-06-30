/* Spec 004 — Arabic keys (families & student academic profiles).
 * Merged into ar.js at runtime by i18n.js (deepMerge, so nested topbar/stu/data
 * blocks EXTEND the existing dictionaries without clobbering prior keys).
 * Original placeholder content — no legacy/private wording. */
export default {
  /* page titles / breadcrumbs for the new surfaces */
  topbar: {
    title: { families: 'العائلات', addFamily: 'إضافة عائلة', family: 'ملف العائلة', student: 'ملف الطالب' },
    crumb: { families: 'العائلات', addFamily: 'إضافة عائلة', family: 'العائلات', student: 'الطلاب' },
  },

  /* labeled family/student LIFECYCLE status (never numeric/color-only) */
  famStatus: {
    active: 'نشطة', trial: 'تجريبية', suspended: 'موقوفة مؤقتًا', stopped: 'متوقفة', inactive: 'غير نشطة',
  },

  /* students directory — Spec 004 additions (family link + facet) */
  stu: {
    col: { family: 'العائلة' }, fFamily: 'العائلة', allFamilies: 'كل العائلات', viewProfile: 'عرض الملف الأكاديمي',
  },

  /* dashboard impact (minimal, fixture-backed) */
  dash: {
    families: 'العائلات', viewFamilies: 'عرض العائلات',
    studentsAttention: '{n} بحاجة إلى متابعة', familiesHint: 'تابِع العائلات والطلاب الذين يحتاجون انتباهًا.',
  },

  /* ============ Families directory + family profile ============ */
  fam: {
    title: 'العائلات', sub: 'دليل العائلات — كل عائلة وأبناؤها في مكان واحد.',
    add: 'إضافة عائلة', searchPh: 'ابحث عن عائلة أو وليّ أمر…',
    fStatus: 'الحالة', fCategory: 'الفئة', allCategories: 'كل الفئات',
    sum: { total: 'إجمالي العائلات', active: 'العائلات النشطة', attention: 'تحتاج انتباه' },
    card: {
      students: 'الأبناء', courses: 'دورات نشطة', viewProfile: 'عرض ملف العائلة',
      more: '+{n}', noChildren: 'لا يوجد أبناء بعد', menu: 'إجراءات العائلة',
    },
    cat: {
      premium: 'مميّزة', premiumDesc: 'عائلات باشتراك متقدّم وحضور منتظم.',
      standard: 'أساسية', standardDesc: 'عائلات بالخطة الأساسية.',
      trial: 'تجريبية', trialDesc: 'عائلات في الفترة التجريبية.',
      scholarship: 'منح', scholarshipDesc: 'عائلات ضمن برنامج المنح.',
    },
    plan: { perHour: 'ريال/ساعة' },
    attn: { trialEnds: 'الفترة التجريبية تنتهي قريبًا', payment: 'دفعة متأخرة' },

    /* family profile */
    profileTitle: 'ملف العائلة',
    metaChildren: '{n} من الأبناء',
    tab: { overview: 'نظرة عامة', students: 'الأبناء', schedule: 'الجدول', billing: 'الخطة والفوترة', notes: 'ملاحظات' },
    kpi: { students: 'الأبناء', courses: 'دورات نشطة', sessions: 'جلسات الأسبوع', joined: 'الانضمام' },
    ov: {
      contact: 'معلومات التواصل', phone: 'الهاتف', email: 'البريد الإلكتروني', whatsapp: 'واتساب',
      location: 'الموقع', joined: 'تاريخ الانضمام', category: 'الفئة',
      details: 'تفاصيل العائلة', attentionTitle: 'بحاجة إلى انتباه',
    },
    child: {
      title: 'أبناء العائلة', count: '{n} من الأبناء', add: 'إضافة ابن',
      none: 'لا يوجد أبناء بعد', noneMsg: 'أضِف أول ابن لهذه العائلة وسيظهر هنا.',
      viewProfile: 'عرض الملف', addToast: 'سيتوفّر ربط ابن جديد بعد ربط الخادم (تجريبي).',
    },
    sch: { title: 'جلسات الأسبوع', viewInSchedule: 'عرض في الجدول', none: 'لا جلسات قادمة لهذه العائلة.' },
    bill: {
      title: 'الخطة والفوترة', planLabel: 'الخطة الحالية', rate: 'سعر الساعة', cycle: 'دورة الفوترة', cycleVal: 'شهري',
      status: 'حالة الفوترة', statusVal: 'مُحدّثة', reason: 'تتطلب وحدة الفوترة (خارج النطاق الحالي).',
      manage: 'إدارة الفوترة', note: 'عرض فقط — لا تُحتسب أي مبالغ فعلية.',
    },
    notes: { title: 'ملاحظات العائلة', none: 'لا توجد ملاحظات.' },
    act: {
      edit: 'تعديل', suspend: 'إيقاف مؤقت', stop: 'إيقاف الاشتراك', addChild: 'إضافة ابن',
      editToast: 'تم فتح التعديل (تجريبي).',
      suspendTitle: 'إيقاف هذه العائلة مؤقتًا؟', suspendMsg: 'إجراء تجريبي على الواجهة فقط — لا يؤثّر على أي بيانات حقيقية.', suspendCta: 'إيقاف مؤقت', suspendToast: 'تم الإيقاف المؤقت (تجريبي).',
      stopTitle: 'إيقاف اشتراك هذه العائلة؟', stopMsg: 'إجراء تجريبي على الواجهة فقط — لا يؤثّر على أي بيانات حقيقية.', stopCta: 'إيقاف', stopToast: 'تم الإيقاف (تجريبي).',
    },

    /* add-family wizard */
    wiz: {
      title: 'إضافة عائلة', sub: 'أنشئ حساب العائلة وأضِف أبناءها عبر خطوات بسيطة.',
      stepLabel: 'الخطوة {n} من {total}',
      step: { identity: 'الهوية', contact: 'التواصل والموقع', children: 'الأبناء', billing: 'الخطة والفوترة', review: 'المراجعة' },
      stepDesc: {
        identity: 'بيانات وليّ الأمر الأساسية.', contact: 'وسائل التواصل والموقع.',
        children: 'أضِف أبناء العائلة.', billing: 'الخطة وسعر الساعة (عرض فقط).', review: 'راجِع البيانات قبل الحفظ.',
      },
      next: 'التالي', back: 'السابق', save: 'حفظ العائلة',
      savedToast: 'تم إنشاء العائلة (تجريبي) — لا يتم حفظ أي بيانات حقيقية.',
      f: {
        guardianName: 'اسم وليّ الأمر', status: 'الحالة', category: 'الفئة',
        phone: 'رقم الهاتف', email: 'البريد الإلكتروني', whatsapp: 'واتساب',
        country: 'الدولة', city: 'المدينة', timezone: 'المنطقة الزمنية',
        childName: 'اسم الابن', childLevel: 'المستوى', childSubject: 'المادة',
        planType: 'نوع الخطة', hourRate: 'سعر الساعة (ريال)', cycle: 'دورة الفوترة', notes: 'ملاحظات',
      },
      ph: {
        guardianName: 'مثال: أبو سلمان الغامدي', phone: '05xxxxxxxx', email: 'name@example.edu',
        city: 'مثال: الرياض', childName: 'اسم الابن', hourRate: '٦٠', notes: 'أضِف ملاحظة عن العائلة…',
      },
      children: { add: 'إضافة ابن آخر', addToast: 'يمكن إضافة الأبناء فعليًا بعد ربط الخادم (تجريبي).', row: 'الابن {n}', hint: 'يمكنك إضافة أكثر من ابن لنفس العائلة.' },
      review: { title: 'مراجعة قبل الحفظ', note: 'هذه معاينة تجريبية — لن يتم حفظ أي بيانات حقيقية.', guardian: 'وليّ الأمر', contact: 'التواصل', children: 'الأبناء', plan: 'الخطة', childrenVal: 'ابنان (تجريبي)' },
    },
  },

  /* ============ Student academic profile ============ */
  sp: {
    profileTitle: 'الملف الأكاديمي',
    tab: { overview: 'نظرة عامة', courses: 'المواد', timetable: 'الجدول', results: 'النتائج', evaluation: 'التقييم', family: 'العائلة', notes: 'ملاحظات' },
    kpi: { level: 'المستوى', progress: 'التقدّم', courses: 'المواد', status: 'الحالة' },
    ov: {
      title: 'لمحة سريعة', status: 'الحالة', level: 'المستوى', joined: 'تاريخ الالتحاق',
      subject: 'المادة الأساسية', family: 'العائلة', viewFamily: 'عرض العائلة', attentionTitle: 'بحاجة إلى انتباه',
      latestEval: 'أحدث تقييم', summary: 'ملخّص',
    },
    courses: { title: 'المواد المسجّلة', none: 'لا توجد مواد مسجّلة.', teacher: 'المعلم', progress: 'التقدّم', group: 'المجموعة', cert: 'شهادة' },
    courseStatus: { active: 'جارية', completed: 'مكتملة', paused: 'متوقّفة' },
    timetable: { title: 'الجلسات القادمة', viewInSchedule: 'عرض في الجدول', none: 'لا جلسات قادمة لهذا الطالب.' },
    family: { title: 'العائلة', guardian: 'وليّ الأمر', viewFamily: 'عرض ملف العائلة', siblings: 'الإخوة', noSiblings: 'لا يوجد إخوة مسجّلون.' },
    notes: { title: 'ملاحظات الطالب', none: 'لا توجد ملاحظات.' },
    act: { message: 'مراسلة', edit: 'تعديل', editToast: 'تم فتح التعديل (تجريبي).', messageToast: 'سيتوفّر التواصل بعد ربط وحدة الرسائل (تجريبي).', viewFamily: 'عرض العائلة' },
  },

  /* student Results tab (fixture-only — no gradebook) */
  res: {
    title: 'النتائج والتقدّم', overall: 'التقدّم العام', level: 'المستوى', term: 'الفصل',
    courses: 'تقدّم المواد', certificates: 'الشهادات', noCerts: 'لا توجد شهادات بعد.',
    certStatus: { issued: 'صادرة', pending: 'قيد الإصدار' },
    export: 'تصدير PDF', exportReason: 'يتوفّر التصدير بعد ربط الخادم (خارج النطاق الحالي).',
    print: 'طباعة', printToast: 'تم فتح الطباعة (تجريبي).',
    note: 'عرض تجريبي — ليست نتائج فعلية أو نظام درجات.',
  },

  /* student Evaluation tab — monthly progress-report rubric (fixture-only) */
  eval: {
    title: 'التقييم الشهري', subtitle: 'تقرير تقدّم شهري وصفي — وليس نظام درجات.',
    criteria: { learningProgress: 'مستوى التعلّم', focus: 'التركيز', homework: 'أداء الواجبات', punctuality: 'الالتزام بالمواعيد' },
    rating: { excellent: 'ممتاز', good: 'جيد', sometimes: 'أحيانًا', rarely: 'نادرًا' },
    achievements: 'أبرز الإنجازات', objectives: 'أهداف الشهر القادم',
    approve: 'اعتماد التقرير', approved: 'مُعتمد', pending: 'قيد المراجعة', approveToast: 'تم اعتماد التقرير (تجريبي).',
    note: 'عرض تجريبي — لا يوجد سير عمل اعتماد فعلي.',
  },

  /* ============ fixture content (placeholder, display-only) ============ */
  data: {
    fam: {
      phone: '+966 50 000 0000', whatsapp: '+966 55 000 0000', country: 'السعودية', tz: 'الرياض (GMT+3)',
      fam1: { name: 'أبو سلمان الغامدي', email: 'ghamdi.family@example.edu', city: 'الرياض', joined: 'مارس ٢٠٢٣', plan: 'الخطة المتقدمة', note: 'عائلة منتظمة الحضور، خمسة أبناء في مستويات مختلفة.' },
      fam2: { name: 'أم جوري القحطاني', email: 'qahtani.family@example.edu', city: 'جدة', joined: 'سبتمبر ٢٠٢٣', plan: 'الخطة الأساسية', note: 'ثلاثة أبناء، تواصل جيد مع الأكاديمية.' },
      fam3: { name: 'أبو ياسر الدوسري', email: 'dosari.family@example.edu', city: 'الدمام', joined: 'يناير ٢٠٢٦', plan: 'خطة تجريبية', note: 'عائلة في الفترة التجريبية، تنتهي قريبًا.' },
      fam4: { name: 'أم لمى العتيبي', email: 'otaibi.family@example.edu', city: 'مكة', joined: 'نوفمبر ٢٠٢٢', plan: 'الخطة الأساسية', note: 'ابنة متفوّقة في المسار المتقدّم.' },
      fam5: { name: 'أبو فيصل الشهري', email: 'shehri.family@example.edu', city: 'المدينة', joined: 'فبراير ٢٠٢٤', plan: 'الخطة الأساسية', note: 'يوجد دفعة متأخرة بانتظار المتابعة.' },
      fam6: { name: 'أبو عبدالرحمن باوزير', email: 'bawazir.family@example.edu', city: 'الخبر', joined: 'يوليو ٢٠٢٣', plan: 'الخطة المتقدمة', note: 'ابن واحد في مرحلة مبكرة من التعلّم.' },
      fam7: { name: 'أم سارة المطيري', email: 'mutairi.family@example.edu', city: 'أبها', joined: 'أبريل ٢٠٢٢', plan: 'الخطة الأساسية', note: 'تم إيقاف الاشتراك بناءً على طلب العائلة.' },
      fam8: { name: 'أبو خالد السبيعي', email: 'subaie.family@example.edu', city: 'تبوك', joined: 'مايو ٢٠٢١', plan: 'منحة', note: 'حساب غير نشط حاليًا، بلا أبناء مسجّلين.' },
    },
    grp: { math: 'مجموعة الرياضيات أ', prog: 'مجموعة البرمجة ب', eng: 'نادي الإنجليزية' },
    cert: { math: 'شهادة الرياضيات', arabic: 'شهادة اللغة العربية', prog: 'شهادة البرمجة', physics: 'شهادة الفيزياء', english: 'شهادة الإنجليزية', science: 'شهادة العلوم', date: '١٢ مايو ٢٠٢٦' },
    res: { term: 'الفصل الثاني · ٢٠٢٦' },
    eval: {
      month: 'تقرير يونيو ٢٠٢٦',
      ach: {
        high: 'أتمّ جميع الواجبات في موعدها وأظهر مشاركة فاعلة طوال الشهر.',
        mid: 'تقدّم ملحوظ في المهارات الأساسية مع التزام جيد بالحضور.',
        low: 'بدأ يبني أساسًا أوضح ويحتاج إلى دعم في الانتظام.',
      },
      obj: {
        high: 'الانتقال إلى تحديات أعلى مستوى والمشاركة في مشروع إثرائي.',
        mid: 'تعزيز حلّ الواجبات بانتظام ورفع نسبة الإتمام.',
        low: 'بناء عادة مذاكرة أسبوعية وحضور الجلسات بانتظام.',
      },
    },
    stud: {
      k: { name: 'وليد الغامدي' }, l: { name: 'ريناد الغامدي' }, m: { name: 'سلمى الغامدي' }, n: { name: 'بدر القحطاني' },
      joined: 'سبتمبر ٢٠٢٤',
      note: {
        high: 'طالب متميّز ومنتظم، يُظهر تقدّمًا ثابتًا.',
        mid: 'تقدّم جيد مع حاجة لمتابعة الواجبات عن قرب.',
        low: 'يحتاج إلى دعم إضافي وتحفيز للانتظام.',
      },
    },
  },
};

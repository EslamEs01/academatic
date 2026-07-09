/* Spec 007 — Arabic keys (Teacher Performance & Academic KPIs).
 * Merged into ar.js at runtime by i18n.js (deepMerge — nested blocks extend, so the
 * existing trn.* directory/availability/perf keys in ar.extra.js are preserved).
 * No legacy/private wording, no numeric statuses, no pay/finance wording. */
export default {
  topbar: {
    title: { teacher: 'تفاصيل المعلّم', teacherPerf: 'أداء المعلّمين' },
    crumb: { teacher: 'المعلّمون · التفاصيل', teacherPerf: 'المعلّمون · الأداء' },
  },

  /* dashboard signal (minimal — one fixture chip) */
  dash: { teachersFollowup: '{n} معلّم يحتاج متابعة' },

  /* directory-card secondary action */
  dir: { preview: 'معاينة سريعة' },

  trn: {
    viewProfile: 'عرض الملف',

    /* NEW labeled maps — icon + label, never numeric/color-only */
    status: { active: 'نشط', paused: 'متوقّف مؤقتًا', inactive: 'غير نشط' },
    workload: { light: 'حِمل خفيف', balanced: 'حِمل متوازن', high: 'حِمل مرتفع' },
    signal: { strongDelivery: 'أداء قوي', stable: 'مستقر', needsFollowUp: 'يحتاج متابعة', attentionRisk: 'بحاجة انتباه' },

    /* teachers page enrichment */
    fStatus: 'الحالة', fWorkload: 'الحِمل', fSignal: 'مؤشّر المتابعة',
    counts: { courses: 'دورات', groups: 'مجموعات', students: 'طلاب نشطون' },
    upcomingHint: '{n} جلسة قادمة', noSessions: 'لا جلسات قريبة',

    /* teacher profile */
    kpi: { courses: 'الدورات', groups: 'المجموعات', students: 'الطلاب النشطون', upcoming: 'جلسات قادمة' },
    tab: { overview: 'نظرة عامة', courses: 'الدورات', groups: 'المجموعات', timetable: 'الجدول', sessions: 'الجلسات والنتائج', students: 'الطلاب', followup: 'المتابعة', notes: 'ملاحظات' },
    ov: {
      title: 'لمحة عن المعلّم', subjects: 'المواد', status: 'الحالة', availability: 'التوفّر', workload: 'الحِمل',
      courses: 'الدورات', groups: 'المجموعات', students: 'الطلاب', upcoming: 'جلسات قادمة',
      absence: 'الحضور والغياب', completed: 'جلسات مكتملة', teacherAbsent: 'غياب المعلّم', studentAbsent: 'غياب طلاب في جلساته', cancelled: 'ملغاة/مُعاد جدولتها',
    },
    none: { courses: 'لا توجد دورات مُسنَدة بعد', groups: 'لا توجد مجموعات بعد', students: 'لا يوجد طلاب بعد', sessions: 'لا توجد جلسات أو نتائج بعد', followup: 'لا شيء يحتاج متابعة الآن' },
    viewCourse: 'عرض الدورة', viewGroup: 'عرض المجموعة', viewStudent: 'عرض الطالب',
    notesText: 'معلّم منتظم وفق جدول الدورة الأسبوعي؛ تُراجَع الملاحظات دوريًا.',

    /* directory-card kebab */
    card: { menu: 'إجراءات المعلّم' },

    /* honest actions */
    act: {
      add: 'إضافة معلّم', addToast: 'سيتوفّر إضافة معلّم بعد ربط الخادم.',
      edit: 'تعديل', editToast: 'سيتوفّر تعديل بيانات المعلّم بعد ربط الخادم.',
      message: 'مراسلة المعلّم', messageToast: 'سيتوفّر إرسال الرسائل بعد ربط الخادم.',
      note: 'إضافة ملاحظة متابعة', noteToast: 'سيتوفّر حفظ الملاحظة بعد ربط الخادم.',
      notify: 'تنبيه ولي الأمر', notifyTitle: 'إرسال تنبيه لولي الأمر؟', notifyMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يُرسَل أي إشعار الآن.', notifyCta: 'إرسال', notifyToast: 'سيتوفّر إرسال التنبيه بعد ربط الخادم.',
      assignCourse: 'إسناد دورة', assignGroup: 'إسناد مجموعة', openTimetable: 'عرض الجدول', viewAttendance: 'عرض الحضور', print: 'طباعة/تصدير الملخّص',
      vacation: 'إجازة', vacationTitle: 'وضع المعلّم في إجازة؟', vacationMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يتغيّر شيء الآن.', vacationCta: 'تفعيل الإجازة', vacationToast: 'سيتوفّر ضبط الإجازة بعد ربط الخادم.',
      deactivate: 'إيقاف التنشيط', deactivateTitle: 'إيقاف تنشيط هذا المعلّم؟', deactivateMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا تتغيّر الحالة الآن.', deactivateCta: 'إيقاف التنشيط', deactivateToast: 'سيتوفّر إيقاف التنشيط بعد ربط الخادم.',
      del: 'حذف المعلّم', delTitle: 'حذف هذا المعلّم؟', delMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يُحذَف شيء الآن.', delCta: 'حذف', delToast: 'سيتوفّر حذف المعلّم بعد ربط الخادم.',
      resetPassword: 'إرسال إعادة تعيين كلمة المرور', loginAs: 'الدخول كمعلّم',
    },
    reason: {
      assign: 'الإسناد يتطلب وحدة الإسناد (خارج النطاق الحالي).',
      export: 'التصدير يتطلب ربط الخادم (خارج النطاق الحالي).',
      resetPassword: 'إعادة تعيين كلمة المرور تتطلب ربط الخادم (خارج النطاق الحالي).',
      loginAs: 'الدخول كمعلّم يتطلب ربط الخادم (خارج النطاق الحالي).',
    },

    /* Spec 028 — assign-teacher picker (course/group) + assign-course/group picker (teacher profile) */
    assignT: { title: 'إسناد معلّم', hint: 'اختر معلّمًا من القائمة — يتم الإسناد بعد ربط الخادم.', cta: 'إسناد المعلّم' },
    assignC: { title: 'إسناد دورة للمعلّم', hint: 'اختر دورة من القائمة — يتم الإسناد بعد ربط الخادم.', cta: 'إسناد' },
    assignG: { title: 'إسناد مجموعة للمعلّم', hint: 'اختر مجموعة من القائمة — يتم الإسناد بعد ربط الخادم.', cta: 'إسناد' },

    /* availability-window editor (Timetable tab) — day/time only, no recurrence */
    availEdit: { open: 'أوقات التوفّر', title: 'أوقات توفّر المعلّم', hint: 'أوقات التوفّر الأسبوعية — يتم الحفظ بعد ربط الخادم.', add: 'إضافة وقت', reason: 'تعديل أوقات التوفّر يتطلب ربط الخادم (خارج النطاق الحالي).' },

    /* teacher categories (nav stays planned — no page) */
    cat: {
      manage: 'إدارة الفئات', title: 'فئات المعلّمين', hint: 'الفئات الحالية — الإنشاء والإسناد يتمّان بعد ربط الخادم.',
      createTitle: 'إضافة فئة معلّمين', members: '{n} معلّم', assign: 'إسناد معلّمين للفئة',
      assignReason: 'إسناد المعلّمين للفئة يتطلب ربط الخادم (خارج النطاق الحالي).',
      name: { senior: 'معلّمون أوائل', associate: 'معلّمون مساعدون', trial: 'فترة تجريبية' },
    },

    /* performance board (display-only counts + signals — NO score/rank/chart) */
    board: {
      title: 'أداء المعلّمين', sub: 'متابعة أكاديمية لأداء المعلّمين بالاعتماد على أعداد فعلية وإشارات موصّفة.',
      searchPh: 'ابحث عن معلّم…',
      compareTitle: 'مقارنة المعلّمين', queueTitle: 'قائمة المتابعة', queueNone: 'لا شيء يحتاج متابعة الآن',
      row: { completed: 'مكتملة', teacherAbsent: 'غياب المعلّم', studentAbsent: 'غياب طلاب', groups: 'مجموعات' },
      tile: {
        activeTeachers: 'معلّمون نشطون', completed: 'جلسات مكتملة', teacherAbsent: 'غياب المعلّمين',
        studentAbsent: 'غياب الطلاب في جلسات المعلّمين', cancelled: 'ملغاة/مُعاد جدولتها',
        groupsAttention: 'مجموعات تحتاج متابعة', followup: 'معلّمون يحتاجون متابعة',
      },
    },
  },
};

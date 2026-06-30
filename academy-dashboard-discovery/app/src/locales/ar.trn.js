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

    /* honest actions */
    act: {
      add: 'إضافة معلّم', addToast: 'تم فتح إضافة المعلّم (تجريبي) — لا يُحفظ شيء.',
      edit: 'تعديل', editToast: 'تم فتح تعديل المعلّم (تجريبي).',
      message: 'مراسلة المعلّم', messageToast: 'تم فتح المراسلة (تجريبي) — لا تُرسَل رسالة.',
      note: 'إضافة ملاحظة متابعة', noteToast: 'تمت إضافة الملاحظة (تجريبي) — لا يُحفظ شيء.',
      notify: 'تنبيه ولي الأمر', notifyTitle: 'إرسال تنبيه لولي الأمر؟', notifyMsg: 'إجراء تجريبي على الواجهة فقط — لا يُرسَل أي إشعار حقيقي.', notifyCta: 'إرسال', notifyToast: 'تم الإرسال (تجريبي).',
      assignCourse: 'إسناد دورة', assignGroup: 'إسناد مجموعة', openTimetable: 'عرض الجدول', viewAttendance: 'عرض الحضور', print: 'طباعة/تصدير الملخّص',
    },
    reason: {
      assign: 'الإسناد يتطلب وحدة الإسناد (خارج النطاق الحالي).',
      export: 'التصدير يتطلب ربط الخادم (خارج النطاق الحالي).',
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

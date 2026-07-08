/* Spec 005 — Arabic keys (attendance & session outcomes).
 * Merged into ar.js at runtime by i18n.js (deepMerge — nested blocks extend).
 * Original placeholder content — no legacy/private wording, no numeric statuses. */
export default {
  topbar: {
    title: { attendance: 'الحضور ونتائج الجلسات' },
    crumb: { attendance: 'الحضور' },
  },
  nav: { attendance: 'الحضور' },

  /* the labeled OUTCOME (review) vocabulary — icon + label, never numeric/color-only */
  outcome: {
    attended: 'حضور مكتمل', studentAbsent: 'غياب الطالب', teacherAbsent: 'غياب المعلم',
    cancelled: 'ملغاة', rescheduled: 'مُعاد جدولتها', upcoming: 'قادمة', live: 'جارية الآن',
    makeUpSuggested: 'تعويض مقترح', needsFollowUp: 'تحتاج متابعة',
  },

  /* dashboard outcome signal (minimal) */
  dash: { outcomeFollowUp: '{n} بحاجة إلى متابعة اليوم' },

  att: {
    title: 'الحضور ونتائج الجلسات', sub: 'راجِع نتائج جلسات اليوم: الحضور والغياب والإلغاء وإعادة الجدولة والمتابعة.',
    searchPh: 'ابحث في الجلسات…',
    fDay: 'اليوم', fTeacher: 'المعلم', fFamily: 'العائلة', fSubject: 'المادة', fOutcome: 'النتيجة', fAttention: 'المتابعة',
    allDays: 'كل الأيام', allOutcomes: 'كل النتائج', allTeachers: 'كل المعلمين', allFamilies: 'كل العائلات',
    needsFollowUpOpt: 'تحتاج متابعة', fCancelledResched: 'ملغاة أو مؤجلة',

    tile: {
      total: 'إجمالي الجلسات', attended: 'حضور مكتمل', studentAbsent: 'غياب طلاب',
      teacherAbsent: 'غياب معلمين', cancelledRescheduled: 'ملغاة ومؤجلة', needsFollowUp: 'تحتاج متابعة',
    },

    /* outcome drawer */
    outcome: 'النتيجة', student: 'الطالب', viewProfile: 'عرض الملف', present: 'الحضور',
    attribution: {
      studentAbsent: 'تغيّب الطالب عن الجلسة', teacherAbsent: 'تغيّب المعلم عن الجلسة',
      cancelTeacher: 'أُلغيت بطلب من المعلم', cancelStudent: 'أُلغيت بطلب من العائلة', cancelAdmin: 'أُلغيت من الإدارة',
    },
    makeup: { auto: 'تعويض تلقائي (تجريبي)', reschedule: 'تعويض بإعادة الجدولة', credit: 'أُضيفت إلى الرصيد (تجريبي)' },
    followUp: { absence: 'متابعة غياب', cancel: 'متابعة إلغاء', reschedule: 'تأكيد إعادة الجدولة', feedback: 'بانتظار ملاحظة المعلم' },
    feedback: 'ملاحظة المعلم', viewInSchedule: 'عرض في الجدول', viewAttendance: 'عرض الحضور',
    newTime: 'الموعد الجديد',

    /* status-gated, demo-only actions */
    act: {
      attend: 'تسجيل حضور', attendToast: 'سيتوفّر تسجيل الحضور بعد ربط الخادم.',
      notify: 'تنبيه العائلة', notifyToast: 'سيتوفّر إرسال التنبيه بعد ربط الخادم.',
      feedback: 'إضافة ملاحظة', feedbackToast: 'سيتوفّر حفظ الملاحظة بعد ربط الخادم.',
      reverse: 'تراجع', reverseToast: 'سيتوفّر التراجع عن النتيجة بعد ربط الخادم.',
      cancel: 'إلغاء الجلسة', cancelTitle: 'إلغاء هذه الجلسة؟', cancelMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يتغيّر أي شيء الآن.', cancelCta: 'إلغاء الجلسة', cancelToast: 'سيتوفّر إلغاء الجلسة بعد ربط الخادم.',
      reschedule: 'إعادة جدولة', rescheduleTitle: 'إعادة جدولة هذه الجلسة؟', rescheduleMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يتم حجز موعد فعلي الآن.', rescheduleCta: 'إعادة الجدولة', rescheduleToast: 'سيتوفّر إعادة الجدولة بعد ربط الخادم.',
      studentAbsent: 'تسجيل غياب الطالب', studentAbsentTitle: 'تسجيل غياب الطالب؟', studentAbsentMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يُحفَظ شيء الآن.', studentAbsentCta: 'تسجيل الغياب', studentAbsentToast: 'سيتوفّر تسجيل غياب الطالب بعد ربط الخادم.',
      teacherAbsent: 'تسجيل غياب المعلم', teacherAbsentTitle: 'تسجيل غياب المعلم؟', teacherAbsentMsg: 'سيتوفّر هذا الإجراء بعد ربط الخادم — لا يُحفَظ شيء الآن.', teacherAbsentCta: 'تسجيل الغياب', teacherAbsentToast: 'سيتوفّر تسجيل غياب المعلم بعد ربط الخادم.',
      addToCredit: 'إضافة إلى الرصيد',
    },
    reason: {
      finance: 'تتطلب وحدة الفوترة/الرصيد (خارج النطاق الحالي).',
      persist: 'حفظ النتائج يتطلب ربط الخادم (خارج النطاق الحالي).',
      notify: 'الإرسال الفعلي يتطلب وحدة الإشعارات (خارج النطاق الحالي).',
    },

    empty: { title: 'لا توجد جلسات لهذا اليوم بعد', msg: 'ستظهر نتائج الجلسات هنا فور انعقادها.' },

    /* profile signals (fixture-only) */
    studentSignalTitle: 'الحضور الأخير', studentSignal: 'حضر {a} من {m} جلسة', studentFollowUp: '{k} بحاجة إلى متابعة',
    familySignalTitle: 'متابعة جلسات الأبناء', familySignal: '{k} جلسات لأبناء العائلة تحتاج متابعة', familyNone: 'لا توجد جلسات تحتاج متابعة.',
  },

  /* ============ fixture content (placeholder, display-only) ============ */
  data: {
    att: {
      reschedHint: 'إلى الخميس ١٠:٠٠ ص',
      fb: {
        good: 'مشاركة فاعلة وأداء ممتاز خلال الجلسة.',
        support: 'يحتاج إلى متابعة الواجب قبل الجلسة القادمة.',
      },
      note: {
        attended: 'انعقدت الجلسة كاملة وفق الخطة.',
        studentAbsent: 'لم يحضر الطالب؛ تم إخطار العائلة.',
        teacherAbsent: 'اعتذر المعلم؛ بانتظار تعويض.',
        cancelled: 'أُلغيت الجلسة قبل موعدها.',
        rescheduled: 'تم نقل الجلسة إلى موعد جديد.',
        upcoming: 'جلسة قادمة ضمن جدول اليوم.',
        live: 'جلسة جارية الآن.',
      },
    },
  },
};

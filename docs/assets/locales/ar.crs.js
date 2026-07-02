/* Spec 006 — Arabic keys (Courses, Groups & Learning Paths).
 * Merged into ar.js at runtime by i18n.js (deepMerge — nested blocks extend).
 * No legacy/private wording, no numeric statuses. Reuses existing `data.grp.*`
 * (math/prog/eng), `nav.groups`, `sp.courseStatus.*` (enrollment) + `cur.*` (catalogue). */
export default {
  topbar: {
    title: { groups: 'المجموعات', course: 'تفاصيل الدورة', group: 'تفاصيل المجموعة' },
    crumb: { groups: 'المجموعات', course: 'الدورة', group: 'المجموعة' },
  },

  /* extend the catalogue course-status (adds paused) */
  cur: { status: { paused: 'متوقّفة مؤقتًا' } },

  /* NEW labeled GROUP status vocabulary — icon + label, never numeric/color-only */
  group: {
    status: {
      active: 'نشطة', trial: 'تجريبية', full: 'مكتملة العدد',
      paused: 'موقوفة مؤقتًا', completed: 'منتهية', needsAttention: 'تحتاج متابعة',
    },
  },

  /* dashboard signal (minimal) */
  dash: { groupsAttention: '{n} مجموعة تحتاج متابعة' },

  /* courses-enrich + course profile + learning path */
  crs: {
    viewCourse: 'عرض الدورة',
    counts: { students: 'طلاب', groups: 'مجموعات', teachers: 'معلمون' },
    upcomingHint: '{n} جلسة قادمة',
    tab: { overview: 'نظرة عامة', groups: 'المجموعات', students: 'الطلاب', teachers: 'المعلمون', timetable: 'الجدول', outcomes: 'النتائج', learningPath: 'المسار التعليمي', notes: 'ملاحظات' },
    ov: { title: 'عن الدورة', subject: 'المادة', level: 'المستوى', status: 'الحالة', groups: 'المجموعات', students: 'الطلاب النشطون', teachers: 'المعلمون', upcoming: 'جلسات قادمة' },
    none: { groups: 'لا توجد مجموعات لهذه الدورة بعد', students: 'لا يوجد طلاب مسجّلون بعد', teachers: 'لم يُسنَد معلمون بعد' },
    notes: 'انطلقت الدورة وفق الخطة الفصلية المعتمدة؛ تُراجَع المستويات دوريًا.',
    viewInSchedule: 'عرض في الجدول', viewAttendance: 'عرض الحضور', viewGroup: 'عرض المجموعة', viewStudent: 'عرض الطالب', viewTeacher: 'عرض المعلم',
    lp: {
      title: 'المسار التعليمي', sub: 'تسلسل المستويات الأكاديمية — عرض فقط، ليس محرّر مناهج.',
      display: 'عرض فقط — لا يوجد محرّك مناهج أو شهادات.',
      certificates: 'الشهادات', certHint: '{n} شهادة صادرة ضمن هذه الدورة', current: 'المستوى الحالي', students: '{n} طالب',
    },
    act: {
      add: 'دورة جديدة', addToast: 'تم فتح إضافة الدورة (تجريبي) — لا يُحفظ شيء.',
      edit: 'تعديل الدورة', editToast: 'تم فتح تعديل الدورة (تجريبي).',
      assignTeacher: 'إسناد معلم', addStudents: 'إضافة طلاب', print: 'طباعة الملخّص',
    },
    reason: {
      assign: 'إسناد المعلمين يتطلب ربط الخادم (خارج النطاق الحالي).',
      enroll: 'تسجيل الطلاب يتطلب محرّك التسجيل (خارج النطاق الحالي).',
      export: 'تصدير الملخّص يتطلب ربط الخادم (خارج النطاق الحالي).',
    },
    /* student/family integration hints */
    studentTitle: 'الدورة والمجموعة', familyTitle: 'دورات الأبناء ومجموعاتهم',
    familyHint: '{c} دورات نشطة · {g} مجموعات', familyNone: 'لا توجد دورات نشطة بعد',
  },

  /* groups directory + group profile */
  grp: {
    title: 'المجموعات', sub: 'تابِع الفصول والمجموعات: الدورة والمعلم والطلاب والجدول والنتائج.',
    searchPh: 'ابحث في المجموعات…',
    fCourse: 'الدورة', fTeacher: 'المعلم', fLevel: 'المستوى', fDay: 'اليوم', fStatus: 'الحالة', fAttention: 'المتابعة',
    allCourses: 'كل الدورات', allTeachers: 'كل المعلمين', allLevels: 'كل المستويات', allDays: 'كل الأيام', allStatuses: 'كل الحالات', needsAttentionOpt: 'تحتاج متابعة',
    tile: { active: 'مجموعات نشطة', trial: 'مجموعات تجريبية', attention: 'تحتاج متابعة' },
    students: 'طلاب', capacity: 'السعة', schedule: 'الجدول',
    tab: { overview: 'نظرة عامة', students: 'الطلاب', timetable: 'الجدول', sessions: 'الجلسات والنتائج', teacher: 'المعلم', course: 'الدورة', notes: 'ملاحظات' },
    ov: { title: 'عن المجموعة', course: 'الدورة', teacher: 'المعلم', level: 'المستوى', status: 'الحالة', students: 'عدد الطلاب', capacity: 'السعة', schedule: 'الجدول' },
    none: { students: 'لا يوجد طلاب في هذه المجموعة بعد', sessions: 'لا توجد جلسات أو نتائج بعد' },
    notes: 'مجموعة منتظمة وفق جدول الدورة الأسبوعي.',
    viewCourse: 'عرض الدورة', viewInSchedule: 'عرض في الجدول', viewAttendance: 'عرض الحضور',
    empty: { title: 'لا توجد مجموعات بعد', msg: 'ستظهر المجموعات هنا عند إنشائها.' },
    act: {
      add: 'مجموعة جديدة', addToast: 'تم فتح إضافة المجموعة (تجريبي) — لا يُحفظ شيء.',
      edit: 'تعديل المجموعة', editToast: 'تم فتح تعديل المجموعة (تجريبي).',
      assignTeacher: 'إسناد معلم', addStudents: 'إضافة طلاب', addStudentsToast: 'تم فتح إضافة الطلاب (تجريبي).',
      removeStudent: 'إزالة طالب', removeTitle: 'إزالة الطالب من المجموعة؟', removeMsg: 'إجراء تجريبي على الواجهة فقط — لا يُحفظ شيء.', removeCta: 'إزالة', removeToast: 'تمت الإزالة (تجريبي).',
      print: 'طباعة الملخّص',
    },
    reason: {
      assign: 'إسناد المعلمين يتطلب ربط الخادم (خارج النطاق الحالي).',
      enroll: 'تسجيل الطلاب يتطلب محرّك التسجيل (خارج النطاق الحالي).',
      full: 'المجموعة مكتملة العدد — لا يمكن إضافة طلاب.',
      export: 'تصدير الملخّص يتطلب ربط الخادم (خارج النطاق الحالي).',
    },
  },

  /* fixture group names (grp1/2/3 reuse the existing data.grp.math/prog/eng) */
  data: {
    grp: { arabicA: 'مجموعة العربية أ', arabicTrial: 'العربية — مجموعة تجريبية', mathAdv: 'مجموعة الرياضيات المتقدّمة', scienceA: 'مجموعة العلوم' },
  },
};

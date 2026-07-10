/* Spec 009 — Arabic keys (Finance, Billing & Payments shell).
 * Mirrored exactly by en.fin.js. Merged into ar.js at runtime (deepMerge extends,
 * registered after the rep.* overlay) — nav.finance / topbar.title.finance /
 * topbar.crumb.finance are NEW keys that extend the existing nav/topbar blocks,
 * the same pattern ar.trn.js used for topbar.title.teacher(Perf).
 * Every amount referenced by this copy is an authored demo literal — nothing here
 * is derived or computed; the only numbers that vary anywhere on the page are row
 * counts. The reference system had no payment-evidence concept and none is worded here. */
export default {
  nav: {
    finance: 'المالية',
  },

  topbar: {
    title: { finance: 'المالية والفوترة' },
    crumb: { finance: 'المالية' },
  },

  finPage: {
    title: 'المالية والفوترة',
    subtitle: 'نظّم فواتير العائلات ومدفوعاتها في مكان هادئ واحد — عرض تجريبي بالاعتماد على بيانات نموذجية.',
  },

  fin: {
    status: {
      paid: 'مدفوعة',
      unpaid: 'غير مدفوعة',
      overdue: 'متأخرة',
      cancelled: 'ملغاة',
    },
    pay: {
      recorded: 'مسجَّلة',
      pending: 'قيد التأكيد',
      returned: 'مرتجعة',
    },
    method: {
      bankTransfer: 'تحويل بنكي',
      card: 'بطاقة',
      cash: 'نقدًا',
    },
    tile: {
      paid: 'فواتير مدفوعة',
      unpaid: 'فواتير غير مدفوعة',
      overdue: 'فواتير متأخرة',
      cancelled: 'فواتير ملغاة',
    },
    sec: {
      invoices: 'فواتير العائلات',
      invoicesSub: 'الفواتير المُصدرة للعائلات — افتح أي فاتورة لعرض تفاصيلها.',
      payments: 'المدفوعات الأخيرة',
      paymentsSub: 'أحدث الدفعات المسجّلة مقابل الفواتير.',
      planned: 'الرواتب والحسابات',
      plannedSub: 'قدرات تصل مع نظام الفوترة الفعلي — معروضة هنا للسياق فقط.',
      teacherContext: 'عرض أداء المعلمين (سياق أكاديمي)',
    },
    act: {
      group: 'إجراءات المالية',
      createInvoice: 'إنشاء فاتورة',
      exportCsv: 'تصدير CSV',
      exportPdf: 'تصدير PDF',
      print: 'طباعة',
      printToast: 'سيتوفّر إنشاء ملف الطباعة بعد ربط الخادم.',
      view: 'عرض الفاتورة',
      recordPayment: 'تسجيل دفعة',
      recordTitle: 'تسجيل دفعة على هذه الفاتورة؟',
      recordMsg: 'هذا عرض تجريبي فقط — لا يتم حفظ أي دفعة ولا تتغيّر حالة الفاتورة.',
      recordCta: 'تأكيد التسجيل',
      recordToast: 'سيتوفّر تسجيل الدفعة بعد ربط الخادم.',
      markPaid: 'تحديد كمدفوعة',
      markTitle: 'تحديد هذه الفاتورة كمدفوعة؟',
      markMsg: 'هذا عرض تجريبي فقط — لا تتغيّر حالة الفاتورة فعليًا.',
      markCta: 'تأكيد',
      markToast: 'سيتوفّر تحديث حالة الفاتورة بعد ربط الخادم.',
      sendReminder: 'إرسال تذكير',
      remindTitle: 'إرسال تذكير بالدفع لهذه العائلة؟',
      remindMsg: 'هذا عرض تجريبي فقط — لا يُرسَل أي تذكير حقيقي.',
      remindCta: 'إرسال',
      remindToast: 'سيتوفّر إرسال التذكير بعد ربط الخادم.',
      sendInvoice: 'إرسال الفاتورة',
    },
    reason: {
      export: 'التصدير يتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
      backend: 'يتطلب نظام الفوترة الفعلي.',
      send: 'الإرسال يتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
      cancelled: 'فاتورة ملغاة — لا يمكن تسجيل دفعة عليها.',
      comingSoon: 'قيد التخطيط — ليست جزءًا من المعاينة التجريبية الحالية.',
    },
    filter: {
      searchPh: 'ابحث في الفواتير…',
      status: 'الحالة',
      family: 'العائلة',
      allStatuses: 'كل الحالات',
      allFamilies: 'كل العائلات',
    },
    drawer: {
      serial: 'رقم الفاتورة',
      family: 'العائلة',
      students: 'الطلاب',
      course: 'الدورة',
      group: 'المجموعة',
      month: 'شهر الفوترة',
      issued: 'تاريخ الإصدار',
      due: 'تاريخ الاستحقاق',
      amount: 'المبلغ',
      displayOnly: 'عرض فقط — لا تُحتسب أي مبالغ فعلية.',
      status: 'الحالة',
      note: 'ملاحظة',
    },
    planned: {
      monthlyInvoices: { title: 'الفواتير الشهرية', desc: 'قيد التخطيط — عرض مجمّع لفواتير العائلات شهرًا بشهر.' },
      invoicesEngine: { title: 'محرّك الفواتير', desc: 'إنشاء الفواتير وبنودها وخصوماتها يتفعّل مع نظام الفوترة الفعلي.' },
      paymentsCollection: { title: 'تحصيل المدفوعات', desc: 'تسجيل الدفعات وربطها بمزوّدي المدفوعات يتفعّل مع نظام الفوترة الفعلي.' },
      teacherSalaries: { title: 'رواتب المعلمين', desc: 'احتساب رواتب المعلمين يتفعّل مع نظام الفوترة الفعلي.' },
      staffSalaries: { title: 'رواتب الموظفين', desc: 'احتساب رواتب فريق العمل يتفعّل مع نظام الفوترة الفعلي.' },
      classSalaryReport: { title: 'تقرير رواتب الفصول', desc: 'تفصيل رواتب الفصول لكل معلم يتفعّل مع نظام الفوترة الفعلي.' },
      payoutsCompensations: { title: 'الدفعات والتعويضات', desc: 'صرف المستحقات والتعويضات يتفعّل مع نظام الفوترة الفعلي.' },
      accountingExpenses: { title: 'الحسابات والمصروفات', desc: 'المصروفات والتحليلات والعملات تتفعّل مع نظام الفوترة الفعلي.' },
      banks: { title: 'البنوك', desc: 'ربط الحسابات البنكية يتفعّل مع نظام الفوترة الفعلي.' },
    },

    /* Spec 030 — finance hub tabs */
    tab: { overview: 'نظرة عامة', salaries: 'الرواتب', banks: 'البنوك', aria: 'أقسام المالية' },

    /* Spec 030 — salaries board (STATUS-FIRST, FIGURE-FREE — no pay amount) */
    sal: {
      title: 'رواتب المعلمين وفريق العمل',
      sub: 'حالة الرواتب لكل شهر — عرض فقط؛ الاحتساب والصرف يتمّان بعد ربط نظام الفوترة الفعلي.',
      teacher: 'المعلمون',
      staff: 'فريق العمل',
      lblPeriod: 'الفترة',
      status: { pending: 'قيد الاعتماد', approved: 'مُعتمدة', paid: 'مصروفة', onhold: 'معلّقة' },
      generate: 'احتساب الرواتب',
      generateReason: 'احتساب الرواتب يتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
      approve: 'اعتماد',
      approveReason: 'اعتماد الرواتب يتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
      markPaid: 'تحديد كمصروفة',
      markReason: 'صرف الرواتب يتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
      exportRoster: 'تصدير كشف الرواتب',
      exportReason: 'التصدير يتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
      empty: 'لا رواتب مطابقة.',
      name: { sara: 'أ. سارة', mohammed: 'أ. محمد', layan: 'أ. ليان', reem: 'أ. ريم', owner: 'إدارة الأكاديمية', coord: 'منسّق الأكاديمية' },
      period: { jun: 'الشهر الماضي', jul: 'الشهر الحالي' },
    },

    /* Spec 030 — banks (name/status only; no credentials) */
    bank: {
      title: 'الحسابات البنكية',
      sub: 'قائمة الحسابات البنكية — عرض فقط؛ الربط والاستيراد والمطابقة تتطلب ربط البنك الفعلي.',
      status: { active: 'نشط', inactive: 'غير نشط' },
      add: 'إضافة حساب بنكي',
      addTitle: 'إضافة حساب بنكي',
      /* Spec 032 (FC-29) — add-bank drawer: bank name only */
      form: { name: 'اسم البنك', namePh: 'مثال: مصرف الراجحي' },
      import: 'استيراد كشف حساب',
      importReason: 'استيراد كشوف الحسابات يتطلب ربط البنك الفعلي — خارج النطاق الحالي.',
      reconcile: 'مطابقة',
      reconcileReason: 'المطابقة البنكية تتطلب ربط البنك الفعلي — خارج النطاق الحالي.',
      empty: 'لا حسابات بنكية.',
      name: { rajhi: 'مصرف الراجحي', ahli: 'البنك الأهلي', riyad: 'بنك الرياض', inma: 'مصرف الإنماء' },
    },

    /* Spec 030 — payment collection gates */
    pay2: {
      add: 'تسجيل دفعة',
      addReason: 'تسجيل الدفعات يتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
      reconcile: 'مطابقة المدفوعات',
      reconcileReason: 'مطابقة المدفوعات تتطلب نظام الفوترة الفعلي — خارج النطاق الحالي.',
    },
  },

  /* ============ fixture content (authored demo literals, display-only) ============ */
  data: {
    fin: {
      month: {
        april: 'أبريل ٢٠٢٦',
        may: 'مايو ٢٠٢٦',
        june: 'يونيو ٢٠٢٦',
        july: 'يوليو ٢٠٢٦',
      },
      inv: {
        inv6: { note: 'تم إرسال تذكير بالدفع لهذه العائلة.' },
        inv9: { note: 'توقفت هذه العائلة عن الدراسة؛ الفاتورة أُلغيت.' },
      },
    },
  },
};

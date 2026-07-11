/* Spec 035 — Schedule Search (بحث الجدول) Arabic locale. Mirrors en.ssr.js
 * exactly (0 divergence). Display-only copy; NO pay/price, NO computed figure. */
export default {
  ssr: {
    title: 'بحث الجدول',
    sub: 'ابحث عن وقت متاح لدى المعلمين حسب المادة واليوم والفترة — العرض فقط.',
    searchPh: 'ابحث باسم المعلم أو المادة…',
    hint: 'اضبط عوامل التصفية لعرض الأوقات المتاحة المطابقة.',
    f: {
      teacher: 'المعلم',
      category: 'المادة',
      day: 'اليوم',
      slot: 'الفترة',
      availability: 'الإتاحة',
    },
    kpi: {
      teachers: 'المعلمون',
      openSlots: 'أوقات متاحة',
      categories: 'المواد',
      days: 'أيام الأسبوع',
    },
    t: {
      t1: 'أ. سارة',
      t2: 'أ. خالد',
      t3: 'أ. منى',
      t4: 'أ. أحمد',
      t5: 'أ. ليلى',
      t6: 'أ. يوسف',
    },
    day: {
      sun: 'الأحد',
      mon: 'الإثنين',
      tue: 'الثلاثاء',
      wed: 'الأربعاء',
      thu: 'الخميس',
    },
    slot: {
      morning: 'صباحًا',
      afternoon: 'ظهرًا',
      evening: 'مساءً',
    },
    avail: {
      available: 'متاح',
      partial: 'متاح جزئيًا',
      booked: 'محجوز',
    },
    time: {
      t0900: '٩:٠٠ ص',
      t1000: '١٠:٠٠ ص',
      t1100: '١١:٠٠ ص',
      t1400: '٢:٠٠ م',
      t1500: '٣:٠٠ م',
      t1800: '٦:٠٠ م',
      t1900: '٧:٠٠ م',
    },
    room: {
      a: 'قاعة أ',
      b: 'قاعة ب',
      c: 'قاعة ج',
      d: 'قاعة د',
      online: 'عبر الإنترنت',
    },
    res: {
      title: 'الأوقات المتاحة',
      teacher: 'المعلم',
      subject: 'المادة',
      day: 'اليوم',
      time: 'الوقت',
      room: 'القاعة',
    },
    act: {
      book: 'حجز الوقت',
      assign: 'إسناد لمجموعة',
    },
    reason: {
      backend: 'يُتاح بعد ربط الخادم.',
    },
  },
};

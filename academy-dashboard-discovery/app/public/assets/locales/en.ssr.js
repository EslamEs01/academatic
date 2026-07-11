/* Spec 035 — Schedule Search (بحث الجدول) English locale. Mirrors ar.ssr.js
 * exactly (0 divergence). Display-only copy; NO pay/price, NO computed figure. */
export default {
  ssr: {
    title: 'Schedule Search',
    sub: 'Find an available time across teachers by subject, day and window — display only.',
    searchPh: 'Search by teacher or subject…',
    hint: 'Adjust the filters to see matching available times.',
    f: {
      teacher: 'Teacher',
      category: 'Subject',
      day: 'Day',
      slot: 'Window',
      availability: 'Availability',
    },
    kpi: {
      teachers: 'Teachers',
      openSlots: 'Open slots',
      categories: 'Subjects',
      days: 'Weekdays',
    },
    t: {
      t1: 'Ms. Sara',
      t2: 'Mr. Khaled',
      t3: 'Ms. Mona',
      t4: 'Mr. Ahmed',
      t5: 'Ms. Layla',
      t6: 'Mr. Youssef',
    },
    day: {
      sun: 'Sunday',
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
    },
    slot: {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
    },
    avail: {
      available: 'Available',
      partial: 'Partially available',
      booked: 'Booked',
    },
    time: {
      t0900: '9:00 AM',
      t1000: '10:00 AM',
      t1100: '11:00 AM',
      t1400: '2:00 PM',
      t1500: '3:00 PM',
      t1800: '6:00 PM',
      t1900: '7:00 PM',
    },
    room: {
      a: 'Room A',
      b: 'Room B',
      c: 'Room C',
      d: 'Room D',
      online: 'Online',
    },
    res: {
      title: 'Available times',
      teacher: 'Teacher',
      subject: 'Subject',
      day: 'Day',
      time: 'Time',
      room: 'Room',
    },
    act: {
      book: 'Book slot',
      assign: 'Assign to group',
    },
    reason: {
      backend: 'Available once the server is connected.',
    },
  },
};

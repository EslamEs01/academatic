/* Spec 035 — Schedule Search authored fixtures (بحث الجدول). A DISPLAY-ONLY
 * availability finder grounded in the legacy `management/search-schedule` tool
 * (search for an available time across teachers' timetables: time-window +
 * category + availability filters → matching teacher/slot rows).
 *
 * Everything is authored: labels are locale keys (ar/en.ssr.js), values are
 * literals. NO real PII, NO money/pay/rate, NO credential/secret, NO computed
 * value (availability is an authored label, never a computed overlap). Consumed
 * by pages/schedule-search.js; the Book/Assign final is an honest backendRequired
 * gate — it never books, never mutates a row, never fakes success. */

/* KPI strip — authored literals (NOT computed) */
export const SS_KPIS = [
  { icon: 'trainers', tone: 'primary', value: '6', labelKey: 'ssr.kpi.teachers' },
  { icon: 'schedule', tone: 'success', value: '14', labelKey: 'ssr.kpi.openSlots' },
  { icon: 'curricula', tone: 'sky', value: '6', labelKey: 'ssr.kpi.categories' },
  { icon: 'calendar', tone: 'upcoming', value: '5', labelKey: 'ssr.kpi.days' },
];

/* teacher facet — authored names (name only, NO pay/rate) */
export const SS_TEACHERS = {
  t1: { labelKey: 'ssr.t.t1' },
  t2: { labelKey: 'ssr.t.t2' },
  t3: { labelKey: 'ssr.t.t3' },
  t4: { labelKey: 'ssr.t.t4' },
  t5: { labelKey: 'ssr.t.t5' },
  t6: { labelKey: 'ssr.t.t6' },
};
export const SS_TEACHER_ORDER = ['t1', 't2', 't3', 't4', 't5', 't6'];

/* category/subject facet — reuse the shared, already-mirrored data.subj.* keys */
export const SS_CATEGORIES = ['physics', 'arabic', 'english', 'math', 'programming', 'science'];

/* day facet */
export const SS_DAYS = {
  sun: { labelKey: 'ssr.day.sun' },
  mon: { labelKey: 'ssr.day.mon' },
  tue: { labelKey: 'ssr.day.tue' },
  wed: { labelKey: 'ssr.day.wed' },
  thu: { labelKey: 'ssr.day.thu' },
};
export const SS_DAY_ORDER = ['sun', 'mon', 'tue', 'wed', 'thu'];

/* time-window facet (from/to buckets, grounded in the legacy from/to controls) */
export const SS_SLOTS = {
  morning: { labelKey: 'ssr.slot.morning' },
  afternoon: { labelKey: 'ssr.slot.afternoon' },
  evening: { labelKey: 'ssr.slot.evening' },
};
export const SS_SLOT_ORDER = ['morning', 'afternoon', 'evening'];

/* availability status — authored label + labeled chip (icon + text), never color-only.
 * Tones restricted to the STYLED_CHIP_TONES set (completed/amber/neutral). */
export const SS_AVAILABILITY = {
  available: { labelKey: 'ssr.avail.available', tone: 'completed', icon: 'check-circle' },
  partial: { labelKey: 'ssr.avail.partial', tone: 'amber', icon: 'clock' },
  booked: { labelKey: 'ssr.avail.booked', tone: 'neutral', icon: 'x-circle' },
};
export const SS_AVAIL_ORDER = ['available', 'partial', 'booked'];

/* candidate slots — authored rows. Each: teacher + subject/category + day + time
 * window + an authored availability label + a display time range + room. No pay. */
export const SS_CANDIDATES = [
  { id: 'ss1', teacherId: 't1', subject: 'physics', dayId: 'sun', slotId: 'morning', availabilityId: 'available', timeKey: 'ssr.time.t0900', roomKey: 'ssr.room.a' },
  { id: 'ss2', teacherId: 't2', subject: 'arabic', dayId: 'sun', slotId: 'afternoon', availabilityId: 'partial', timeKey: 'ssr.time.t1400', roomKey: 'ssr.room.b' },
  { id: 'ss3', teacherId: 't3', subject: 'english', dayId: 'mon', slotId: 'morning', availabilityId: 'available', timeKey: 'ssr.time.t1000', roomKey: 'ssr.room.c' },
  { id: 'ss4', teacherId: 't1', subject: 'physics', dayId: 'mon', slotId: 'evening', availabilityId: 'booked', timeKey: 'ssr.time.t1800', roomKey: 'ssr.room.a' },
  { id: 'ss5', teacherId: 't4', subject: 'math', dayId: 'tue', slotId: 'morning', availabilityId: 'available', timeKey: 'ssr.time.t0900', roomKey: 'ssr.room.d' },
  { id: 'ss6', teacherId: 't5', subject: 'programming', dayId: 'tue', slotId: 'afternoon', availabilityId: 'partial', timeKey: 'ssr.time.t1500', roomKey: 'ssr.room.online' },
  { id: 'ss7', teacherId: 't2', subject: 'arabic', dayId: 'wed', slotId: 'morning', availabilityId: 'available', timeKey: 'ssr.time.t1100', roomKey: 'ssr.room.b' },
  { id: 'ss8', teacherId: 't6', subject: 'science', dayId: 'wed', slotId: 'evening', availabilityId: 'available', timeKey: 'ssr.time.t1900', roomKey: 'ssr.room.c' },
  { id: 'ss9', teacherId: 't3', subject: 'english', dayId: 'thu', slotId: 'afternoon', availabilityId: 'booked', timeKey: 'ssr.time.t1400', roomKey: 'ssr.room.online' },
  { id: 'ss10', teacherId: 't4', subject: 'math', dayId: 'thu', slotId: 'morning', availabilityId: 'partial', timeKey: 'ssr.time.t1000', roomKey: 'ssr.room.d' },
  { id: 'ss11', teacherId: 't5', subject: 'programming', dayId: 'wed', slotId: 'morning', availabilityId: 'available', timeKey: 'ssr.time.t0900', roomKey: 'ssr.room.online' },
  { id: 'ss12', teacherId: 't6', subject: 'science', dayId: 'sun', slotId: 'evening', availabilityId: 'partial', timeKey: 'ssr.time.t1800', roomKey: 'ssr.room.c' },
];

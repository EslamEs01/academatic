/* Weekly schedule fixture — 6-day week SAT-first (Friday omitted).
   Each day: { dayId, nameKey:'sch.day.<dayId>', dateISO, isToday, blocks[] }.
   Blocks extend the original shape with trainer.id, students, attention, type,
   roomLinkKey, and familyKey where applicable.
   Overlapping pair: b12 (10:00–11:00) and b13 (10:30–11:30) on TUE exercise grid overlap.
   Attention markers: b12→conflict, b3→delayed, b10→cancelled. */

export const SCHEDULE_WEEK = [

  /* ── SAT 2026-06-27 ─────────────────────────────────────────────── */
  {
    dayId: 'sat', nameKey: 'sch.day.sat', dateISO: '2026-06-27', isToday: false,
    blocks: [
      { id: 'b14', start: '09:00', end: '10:00',
        titleKey: 'data.s1.title', levelKey: 'data.s1.level',
        trainer: { id: 'sara', nameKey: 'data.t.sara', accent: 'violet' },
        roomKey: 'data.room.a', statusId: 'completed', subject: 'math',
        students: 15, type: 'group' },
      { id: 'b15', start: '11:30', end: '12:15',
        titleKey: 'data.s2.title', levelKey: 'data.s2.level',
        trainer: { id: 'mohammed', nameKey: 'data.t.mohammed', accent: 'amber' },
        roomKey: 'data.room.c', statusId: 'completed', subject: 'arabic',
        students: 12 },
      { id: 'b16', start: '14:00', end: '15:00',
        titleKey: 'data.s5.title', levelKey: 'data.s5.level',
        trainer: { id: 'reem', nameKey: 'data.t.reem', accent: 'sky' },
        roomKey: 'data.room.d', statusId: 'completed', subject: 'arabic',
        students: 10 },
    ],
  },

  /* ── SUN 2026-06-28 (today) ──────────────────────────────────────── */
  {
    dayId: 'sun', nameKey: 'sch.day.sun', dateISO: '2026-06-28', isToday: true,
    blocks: [
      { id: 'b1', start: '08:00', end: '09:00',
        titleKey: 'data.s3.title', levelKey: 'data.s3.level',
        trainer: { id: 'layan', nameKey: 'data.t.layan', accent: 'teal' },
        roomKey: 'data.room.lab1', statusId: 'completed', subject: 'programming',
        students: 14 },
      { id: 'b2', start: '10:30', end: '11:15',
        titleKey: 'data.s2.title', levelKey: 'data.s2.level',
        trainer: { id: 'mohammed', nameKey: 'data.t.mohammed', accent: 'amber' },
        roomKey: 'data.room.c', statusId: 'live', subject: 'arabic',
        students: 18 },
      { id: 'b3', start: '12:30', end: '13:15',
        titleKey: 'data.s6.title', levelKey: 'data.s6.level',
        trainer: { id: 'nora', nameKey: 'data.t.nora', accent: 'coral' },
        roomKey: 'data.room.e', statusId: 'live', subject: 'english',
        students: 16, roomLinkKey: 'data.room.e',
        attention: { kind: 'delayed', labelKey: 'attention.delayed' } },
    ],
  },

  /* ── MON 2026-06-29 ─────────────────────────────────────────────── */
  {
    dayId: 'mon', nameKey: 'sch.day.mon', dateISO: '2026-06-29', isToday: false,
    blocks: [
      { id: 'b4', start: '09:00', end: '10:00',
        titleKey: 'data.s1.title', levelKey: 'data.s1.level',
        trainer: { id: 'sara', nameKey: 'data.t.sara', accent: 'violet' },
        roomKey: 'data.room.a', statusId: 'upcoming', subject: 'math',
        students: 20 },
      { id: 'b5', start: '11:00', end: '11:45',
        titleKey: 'data.s7.title', levelKey: 'data.s7.level',
        trainer: { id: 'khalid', nameKey: 'data.t.khalid', accent: 'sky' },
        roomKey: 'data.room.lab2', statusId: 'upcoming', subject: 'science',
        students: 13 },
    ],
  },

  /* ── TUE 2026-06-30 ─────────────────────────────────────────────── */
  {
    dayId: 'tue', nameKey: 'sch.day.tue', dateISO: '2026-06-30', isToday: false,
    blocks: [
      { id: 'b6', start: '08:30', end: '09:30',
        titleKey: 'data.s8.title', levelKey: 'data.s8.level',
        trainer: { id: 'sara', nameKey: 'data.t.sara', accent: 'violet' },
        roomKey: 'data.room.c', statusId: 'upcoming', subject: 'math',
        students: 17 },
      /* overlapping pair — b12 10:00–11:00, b13 10:30–11:30 overlap 10:30–11:00 */
      { id: 'b12', start: '10:00', end: '11:00',
        titleKey: 'data.s6.title', levelKey: 'data.s6.level',
        trainer: { id: 'nora', nameKey: 'data.t.nora', accent: 'coral' },
        roomKey: 'data.room.e', statusId: 'upcoming', subject: 'english',
        students: 9, type: 'trial',
        attention: { kind: 'conflict', labelKey: 'attention.conflict' } },
      { id: 'b13', start: '10:30', end: '11:30',
        titleKey: 'data.s3.title', levelKey: 'data.s3.level',
        trainer: { id: 'layan', nameKey: 'data.t.layan', accent: 'teal' },
        roomKey: 'data.room.lab1', statusId: 'upcoming', subject: 'programming',
        students: 14, roomLinkKey: 'data.room.lab1' },
      { id: 'b7', start: '13:15', end: '14:05',
        titleKey: 'data.s5.title', levelKey: 'data.s5.level',
        trainer: { id: 'reem', nameKey: 'data.t.reem', accent: 'sky' },
        roomKey: 'data.room.d', statusId: 'upcoming', subject: 'arabic',
        students: 15, familyKey: 'data.stud.g1' },
      { id: 'b8', start: '15:00', end: '16:00',
        titleKey: 'data.s10.title', levelKey: 'data.s10.level',
        trainer: { id: 'abdullah', nameKey: 'data.t.abdullah', accent: 'success' },
        roomKey: 'data.room.b', statusId: 'upcoming', subject: 'physics',
        students: 11 },
    ],
  },

  /* ── WED 2026-07-01 ─────────────────────────────────────────────── */
  {
    dayId: 'wed', nameKey: 'sch.day.wed', dateISO: '2026-07-01', isToday: false,
    blocks: [
      { id: 'b9', start: '10:00', end: '11:00',
        titleKey: 'data.s9.title', levelKey: 'data.s9.level',
        trainer: { id: 'reem', nameKey: 'data.t.reem', accent: 'sky' },
        roomKey: 'data.room.d', statusId: 'upcoming', subject: 'arabic',
        students: 19 },
      { id: 'b10', start: '12:00', end: '12:45',
        titleKey: 'data.s4.title', levelKey: 'data.s4.level',
        trainer: { id: 'abdullah', nameKey: 'data.t.abdullah', accent: 'success' },
        roomKey: 'data.room.b', statusId: 'cancelled', subject: 'physics',
        attention: { kind: 'cancelled', labelKey: 'attention.cancelled' } },
    ],
  },

  /* ── THU 2026-07-02 ─────────────────────────────────────────────── */
  {
    dayId: 'thu', nameKey: 'sch.day.thu', dateISO: '2026-07-02', isToday: false,
    blocks: [
      { id: 'b11', start: '09:30', end: '10:30',
        titleKey: 'data.s3.title', levelKey: 'data.s3.level',
        trainer: { id: 'layan', nameKey: 'data.t.layan', accent: 'teal' },
        roomKey: 'data.room.lab1', statusId: 'upcoming', subject: 'programming',
        students: 22, type: 'group', roomLinkKey: 'data.room.lab1' },
    ],
  },
];

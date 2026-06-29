/* Weekly schedule (fixture). Day-grouped blocks; no calendar library. */
const b = (o) => o;
export const SCHEDULE_WEEK = [
  { nameKey: 'sch.day.sun', dateISO: '2026-06-28', blocks: [
    b({ id: 'b1', start: '08:00', end: '09:00', titleKey: 'data.s3.title', levelKey: 'data.s3.level', trainer: { nameKey: 'data.t.layan', accent: 'teal' }, roomKey: 'data.room.lab1', statusId: 'completed', subject: 'programming' }),
    b({ id: 'b2', start: '10:30', end: '11:15', titleKey: 'data.s2.title', levelKey: 'data.s2.level', trainer: { nameKey: 'data.t.mohammed', accent: 'amber' }, roomKey: 'data.room.c', statusId: 'upcoming', subject: 'arabic' }),
    b({ id: 'b3', start: '12:30', end: '13:15', titleKey: 'data.s6.title', levelKey: 'data.s6.level', trainer: { nameKey: 'data.t.nora', accent: 'coral' }, roomKey: 'data.room.e', statusId: 'upcoming', subject: 'english' }),
  ] },
  { nameKey: 'sch.day.mon', dateISO: '2026-06-29', blocks: [
    b({ id: 'b4', start: '09:00', end: '10:00', titleKey: 'data.s1.title', levelKey: 'data.s1.level', trainer: { nameKey: 'data.t.sara', accent: 'violet' }, roomKey: 'data.room.a', statusId: 'upcoming', subject: 'math' }),
    b({ id: 'b5', start: '11:00', end: '11:45', titleKey: 'data.s7.title', levelKey: 'data.s7.level', trainer: { nameKey: 'data.t.khalid', accent: 'sky' }, roomKey: 'data.room.lab2', statusId: 'upcoming', subject: 'science' }),
  ] },
  { nameKey: 'sch.day.tue', dateISO: '2026-06-30', blocks: [
    b({ id: 'b6', start: '08:30', end: '09:30', titleKey: 'data.s8.title', levelKey: 'data.s8.level', trainer: { nameKey: 'data.t.sara', accent: 'violet' }, roomKey: 'data.room.c', statusId: 'upcoming', subject: 'math' }),
    b({ id: 'b7', start: '13:15', end: '14:05', titleKey: 'data.s5.title', levelKey: 'data.s5.level', trainer: { nameKey: 'data.t.reem', accent: 'sky' }, roomKey: 'data.room.d', statusId: 'upcoming', subject: 'arabic' }),
    b({ id: 'b8', start: '15:00', end: '16:00', titleKey: 'data.s10.title', levelKey: 'data.s10.level', trainer: { nameKey: 'data.t.abdullah', accent: 'success' }, roomKey: 'data.room.b', statusId: 'upcoming', subject: 'physics' }),
  ] },
  { nameKey: 'sch.day.wed', dateISO: '2026-07-01', blocks: [
    b({ id: 'b9', start: '10:00', end: '11:00', titleKey: 'data.s9.title', levelKey: 'data.s9.level', trainer: { nameKey: 'data.t.reem', accent: 'sky' }, roomKey: 'data.room.d', statusId: 'upcoming', subject: 'arabic' }),
    b({ id: 'b10', start: '12:00', end: '12:45', titleKey: 'data.s4.title', levelKey: 'data.s4.level', trainer: { nameKey: 'data.t.abdullah', accent: 'success' }, roomKey: 'data.room.b', statusId: 'cancelled', subject: 'physics' }),
  ] },
  { nameKey: 'sch.day.thu', dateISO: '2026-07-02', blocks: [
    b({ id: 'b11', start: '09:30', end: '10:30', titleKey: 'data.s3.title', levelKey: 'data.s3.level', trainer: { nameKey: 'data.t.layan', accent: 'teal' }, roomKey: 'data.room.lab1', statusId: 'upcoming', subject: 'programming' }),
  ] },
];

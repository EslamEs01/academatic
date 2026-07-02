/* Today's sessions (fixture rows). Display strings are i18n keys (data.*).
 * Trainer avatar initial is derived from the localized name at render. */
export const SESSIONS = {
  total: 24,
  pageSize: 5,
  page: 1,
  lastUpdatedKey: 'sessions.updated.twoMin',
  rows: [
    {
      id: 's1', time: '09:00', durationMin: 60,
      titleKey: 'data.s1.title', levelKey: 'data.s1.level',
      trainer: { nameKey: 'data.t.sara', accent: 'violet', id: 'sara' }, roomKey: 'data.room.a',
      present: 18, capacity: 20, statusId: 'live',
      dateKey: 'sess.today',
    },
    {
      id: 's2', time: '10:30', durationMin: 45,
      titleKey: 'data.s2.title', levelKey: 'data.s2.level',
      trainer: { nameKey: 'data.t.mohammed', accent: 'amber', id: 'mohammed' }, roomKey: 'data.room.c',
      present: 22, capacity: 25, statusId: 'upcoming',
      dateKey: 'sess.today',
    },
    {
      id: 's3', time: '08:00', durationMin: 60,
      titleKey: 'data.s3.title', levelKey: 'data.s3.level',
      trainer: { nameKey: 'data.t.layan', accent: 'teal', id: 'layan' }, roomKey: 'data.room.lab1',
      present: 15, capacity: 16, statusId: 'completed',
      dateKey: 'sess.today',
    },
    {
      id: 's4', time: '11:45', durationMin: 30,
      titleKey: 'data.s4.title', levelKey: 'data.s4.level',
      trainer: { nameKey: 'data.t.abdullah', accent: 'success', id: 'abdullah' }, roomKey: 'data.room.b',
      present: null, capacity: 12, statusId: 'cancelled',
      dateKey: 'sess.today',
      attention: { kind: 'cancelled', labelKey: 'attention.cancelled' },
    },
    {
      id: 's5', time: '13:15', durationMin: 50,
      titleKey: 'data.s5.title', levelKey: 'data.s5.level',
      trainer: { nameKey: 'data.t.reem', accent: 'sky', id: 'reem' }, roomKey: 'data.room.d',
      present: 9, capacity: 20, statusId: 'upcoming',
      dateKey: 'sess.today',
    },
  ],
};

/* Full sessions page (≥10 rows + subject facet). Separate from the dashboard's
 * 5-row module so the dashboard stays unchanged. */
const r = (o) => ({ ...o, subjectKey: `data.subj.${o.subject}` });
export const SESSIONS_FULL = {
  total: 24, pageSize: 10, lastUpdatedKey: 'sessions.updated.twoMin',
  rows: [
    r({ id: 's1', time: '08:00', durationMin: 60, titleKey: 'data.s3.title', levelKey: 'data.s3.level', trainer: { nameKey: 'data.t.layan', accent: 'teal', id: 'layan' }, roomKey: 'data.room.lab1', present: 15, capacity: 16, statusId: 'completed', subject: 'programming', dateKey: 'sess.today', notesKey: 'sess.note', roomLinkKey: 'data.room.lab1' }),
    r({ id: 's2', time: '09:00', durationMin: 60, titleKey: 'data.s1.title', levelKey: 'data.s1.level', trainer: { nameKey: 'data.t.sara', accent: 'violet', id: 'sara' }, roomKey: 'data.room.a', present: 18, capacity: 20, statusId: 'live', subject: 'math', dateKey: 'sess.today', familyKey: 'data.stud.g1' }),
    r({ id: 's3', time: '09:30', durationMin: 50, titleKey: 'data.s8.title', levelKey: 'data.s8.level', trainer: { nameKey: 'data.t.sara', accent: 'violet', id: 'sara' }, roomKey: 'data.room.c', present: 8, capacity: 12, statusId: 'live', subject: 'math', dateKey: 'sess.today', notesKey: 'sess.note' }),
    r({ id: 's4', time: '10:30', durationMin: 45, titleKey: 'data.s2.title', levelKey: 'data.s2.level', trainer: { nameKey: 'data.t.mohammed', accent: 'amber', id: 'mohammed' }, roomKey: 'data.room.c', present: 22, capacity: 25, statusId: 'upcoming', subject: 'arabic', dateKey: 'sess.today', attention: { kind: 'delayed', labelKey: 'attention.delayed' } }),
    r({ id: 's5', time: '11:00', durationMin: 60, titleKey: 'data.s7.title', levelKey: 'data.s7.level', trainer: { nameKey: 'data.t.khalid', accent: 'sky', id: 'khalid' }, roomKey: 'data.room.lab2', present: 17, capacity: 20, statusId: 'upcoming', subject: 'science', dateKey: 'sess.today', roomLinkKey: 'data.room.lab1' }),
    r({ id: 's6', time: '11:45', durationMin: 30, titleKey: 'data.s4.title', levelKey: 'data.s4.level', trainer: { nameKey: 'data.t.abdullah', accent: 'success', id: 'abdullah' }, roomKey: 'data.room.b', present: null, capacity: 12, statusId: 'cancelled', subject: 'physics', dateKey: 'sess.today', attention: { kind: 'conflict', labelKey: 'attention.conflict' } }),
    r({ id: 's7', time: '12:30', durationMin: 45, titleKey: 'data.s6.title', levelKey: 'data.s6.level', trainer: { nameKey: 'data.t.nora', accent: 'coral', id: 'nora' }, roomKey: 'data.room.e', present: 12, capacity: 15, statusId: 'completed', subject: 'english', dateKey: 'sess.today', notesKey: 'sess.note', familyKey: 'data.stud.g2' }),
    r({ id: 's8', time: '13:15', durationMin: 50, titleKey: 'data.s5.title', levelKey: 'data.s5.level', trainer: { nameKey: 'data.t.reem', accent: 'sky', id: 'reem' }, roomKey: 'data.room.d', present: 9, capacity: 20, statusId: 'upcoming', subject: 'arabic', dateKey: 'sess.today' }),
    r({ id: 's9', time: '14:00', durationMin: 60, titleKey: 'data.s9.title', levelKey: 'data.s9.level', trainer: { nameKey: 'data.t.reem', accent: 'sky', id: 'reem' }, roomKey: 'data.room.d', present: 14, capacity: 18, statusId: 'upcoming', subject: 'arabic', dateKey: 'sess.today' }),
    r({ id: 's10', time: '15:00', durationMin: 60, titleKey: 'data.s10.title', levelKey: 'data.s10.level', trainer: { nameKey: 'data.t.abdullah', accent: 'success', id: 'abdullah' }, roomKey: 'data.room.b', present: 16, capacity: 16, statusId: 'completed', subject: 'physics', dateKey: 'sess.today' }),
  ],
};

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
      trainer: { nameKey: 'data.t.sara', accent: 'violet' }, roomKey: 'data.room.a',
      present: 18, capacity: 20, statusId: 'live',
    },
    {
      id: 's2', time: '10:30', durationMin: 45,
      titleKey: 'data.s2.title', levelKey: 'data.s2.level',
      trainer: { nameKey: 'data.t.mohammed', accent: 'amber' }, roomKey: 'data.room.c',
      present: 22, capacity: 25, statusId: 'upcoming',
    },
    {
      id: 's3', time: '08:00', durationMin: 60,
      titleKey: 'data.s3.title', levelKey: 'data.s3.level',
      trainer: { nameKey: 'data.t.layan', accent: 'teal' }, roomKey: 'data.room.lab1',
      present: 15, capacity: 16, statusId: 'completed',
    },
    {
      id: 's4', time: '11:45', durationMin: 30,
      titleKey: 'data.s4.title', levelKey: 'data.s4.level',
      trainer: { nameKey: 'data.t.abdullah', accent: 'success' }, roomKey: 'data.room.b',
      present: null, capacity: 12, statusId: 'cancelled',
    },
    {
      id: 's5', time: '13:15', durationMin: 50,
      titleKey: 'data.s5.title', levelKey: 'data.s5.level',
      trainer: { nameKey: 'data.t.reem', accent: 'sky' }, roomKey: 'data.room.d',
      present: 9, capacity: 20, statusId: 'upcoming',
    },
  ],
};

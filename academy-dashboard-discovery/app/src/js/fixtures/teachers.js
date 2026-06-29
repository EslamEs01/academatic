/* Teachers directory (fixture). availability → chip tone map kept here. */
export const TEACHER_AVAIL = {
  available: { tone: 'completed', labelKey: 'trn.avail.available' },
  busy: { tone: 'amber', labelKey: 'trn.avail.busy' },
  off: { tone: 'neutral', labelKey: 'trn.avail.off' },
};

const tr = (o) => ({ ...o, subjectsKeys: o.subjects.map((x) => `data.subj.${x}`), primary: o.subjects[0] });
export const TEACHERS = {
  rows: [
    tr({ id: 'sara', nameKey: 'data.t.sara', accent: 'violet', subjects: ['math'], avail: 'available', util: 86, sessions: 24, rating: 4.8, hours: 18, bioKey: 'data.trn.bioMath' }),
    tr({ id: 'mohammed', nameKey: 'data.t.mohammed', accent: 'amber', subjects: ['arabic'], avail: 'busy', util: 72, sessions: 19, rating: 4.6, hours: 15, bioKey: 'data.trn.bioArabic' }),
    tr({ id: 'layan', nameKey: 'data.t.layan', accent: 'teal', subjects: ['programming'], avail: 'available', util: 64, sessions: 16, rating: 4.7, hours: 12, bioKey: 'data.trn.bioProg' }),
    tr({ id: 'abdullah', nameKey: 'data.t.abdullah', accent: 'success', subjects: ['physics'], avail: 'off', util: 40, sessions: 9, rating: 4.5, hours: 8, bioKey: 'data.trn.bioPhysics' }),
    tr({ id: 'reem', nameKey: 'data.t.reem', accent: 'sky', subjects: ['arabic'], avail: 'available', util: 78, sessions: 21, rating: 4.9, hours: 16, bioKey: 'data.trn.bioArabic' }),
    tr({ id: 'nora', nameKey: 'data.t.nora', accent: 'coral', subjects: ['english'], avail: 'busy', util: 69, sessions: 17, rating: 4.7, hours: 14, bioKey: 'data.trn.bioEnglish' }),
    tr({ id: 'khalid', nameKey: 'data.t.khalid', accent: 'sky', subjects: ['science'], avail: 'available', util: 58, sessions: 14, rating: 4.4, hours: 11, bioKey: 'data.trn.bioScience' }),
    tr({ id: 'huda', nameKey: 'data.t.huda', accent: 'violet', subjects: ['math'], avail: 'off', util: 35, sessions: 7, rating: 4.6, hours: 6, bioKey: 'data.trn.bioMath' }),
  ],
};

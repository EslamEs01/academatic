/* Students directory (fixture). status → chip tone map kept here. */
export const STUDENT_STATUS = {
  active: { tone: 'completed', labelKey: 'stu.status.active' },
  paused: { tone: 'amber', labelKey: 'stu.status.paused' },
  trial: { tone: 'upcoming', labelKey: 'stu.status.trial' },
  inactive: { tone: 'neutral', labelKey: 'stu.status.inactive' },
};

const s = (o) => ({ ...o, levelKey: `data.crs.lvl.${o.level}`, subjectKey: `data.subj.${o.subject}` });
export const STUDENTS = {
  rows: [
    s({ id: 'st1', nameKey: 'data.stud.a.name', accent: 'violet', statusId: 'active', level: 'l2', progress: 78, enrolled: 3, subject: 'math', guardian: 'g1' }),
    s({ id: 'st2', nameKey: 'data.stud.b.name', accent: 'teal', statusId: 'active', level: 'l3', progress: 64, enrolled: 2, subject: 'arabic', guardian: 'g2' }),
    s({ id: 'st3', nameKey: 'data.stud.c.name', accent: 'amber', statusId: 'trial', level: 'l1', progress: 22, enrolled: 1, subject: 'programming', guardian: 'g3' }),
    s({ id: 'st4', nameKey: 'data.stud.d.name', accent: 'sky', statusId: 'active', level: 'advanced', progress: 91, enrolled: 4, subject: 'physics', guardian: 'g4' }),
    s({ id: 'st5', nameKey: 'data.stud.e.name', accent: 'success', statusId: 'paused', level: 'l2', progress: 45, enrolled: 2, subject: 'english', guardian: 'g5' }),
    s({ id: 'st6', nameKey: 'data.stud.f.name', accent: 'violet', statusId: 'active', level: 'foundation', progress: 33, enrolled: 1, subject: 'science', guardian: 'g1' }),
    s({ id: 'st7', nameKey: 'data.stud.g.name', accent: 'coral', statusId: 'inactive', level: 'l1', progress: 12, enrolled: 1, subject: 'math', guardian: 'g2' }),
    s({ id: 'st8', nameKey: 'data.stud.h.name', accent: 'teal', statusId: 'active', level: 'l3', progress: 70, enrolled: 3, subject: 'arabic', guardian: 'g3' }),
    s({ id: 'st9', nameKey: 'data.stud.i.name', accent: 'amber', statusId: 'trial', level: 'l1', progress: 18, enrolled: 1, subject: 'programming', guardian: 'g4' }),
    s({ id: 'st10', nameKey: 'data.stud.j.name', accent: 'sky', statusId: 'active', level: 'l2', progress: 56, enrolled: 2, subject: 'math', guardian: 'g5' }),
  ],
};

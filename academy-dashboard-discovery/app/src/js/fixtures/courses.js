/* Courses directory (fixture). status → chip tone map kept here. */
export const COURSE_STATUS = {
  active: { tone: 'completed', labelKey: 'cur.status.active' },
  draft: { tone: 'amber', labelKey: 'cur.status.draft' },
  archived: { tone: 'neutral', labelKey: 'cur.status.archived' },
};

const lv = (...keys) => keys.map((k) => ({ labelKey: `data.crs.lvl.${k}` }));
export const COURSES = {
  rows: [
    { id: 'c1', titleKey: 'data.crs.math.title', subject: 'math', subjectKey: 'data.subj.math', levelKey: 'data.crs.lvl.l2', statusId: 'active', icon: 'reports', accent: 'primary', enrolled: 142, sessions: 38, levels: lv('foundation', 'l1', 'l2', 'l3') },
    { id: 'c2', titleKey: 'data.crs.arabic.title', subject: 'arabic', subjectKey: 'data.subj.arabic', levelKey: 'data.crs.lvl.l1', statusId: 'active', icon: 'curricula', accent: 'sky', enrolled: 118, sessions: 31, levels: lv('foundation', 'l1', 'l2') },
    { id: 'c3', titleKey: 'data.crs.prog.title', subject: 'programming', subjectKey: 'data.subj.programming', levelKey: 'data.crs.lvl.l1', statusId: 'active', icon: 'graduation-cap', accent: 'teal', enrolled: 96, sessions: 27, levels: lv('l1', 'l2', 'advanced') },
    { id: 'c4', titleKey: 'data.crs.physics.title', subject: 'physics', subjectKey: 'data.subj.physics', levelKey: 'data.crs.lvl.l3', statusId: 'draft', icon: 'sparkles', accent: 'amber', enrolled: 0, sessions: 0, levels: lv('l3', 'advanced') },
    { id: 'c5', titleKey: 'data.crs.english.title', subject: 'english', subjectKey: 'data.subj.english', levelKey: 'data.crs.lvl.l2', statusId: 'active', icon: 'students', accent: 'coral', enrolled: 134, sessions: 35, levels: lv('foundation', 'l1', 'l2', 'l3') },
    { id: 'c6', titleKey: 'data.crs.science.title', subject: 'science', subjectKey: 'data.subj.science', levelKey: 'data.crs.lvl.foundation', statusId: 'archived', icon: 'trending-up', accent: 'success', enrolled: 41, sessions: 12, levels: lv('foundation', 'l1') },
  ],
};

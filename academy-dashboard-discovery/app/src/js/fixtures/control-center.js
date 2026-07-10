/* Spec 034 — Control Center authored fixtures (messages / leads / tasks /
 * announcements / time-converter). Display-only demo data: labels are locale
 * keys (ar/en.ctrl.js), values are authored literals. NO real PII, NO money/pay,
 * NO credential/secret, NO computed value. Consumed by the five Control pages;
 * every write action on those pages is an honest backendRequired gate. */

/* ---- Messages (grounded: management-chat) ---- */
export const MSG_STATUS = {
  unread: { labelKey: 'msg.status.unread', tone: 'live', icon: 'bell' },
  read: { labelKey: 'msg.status.read', tone: 'neutral', icon: 'check' },
};
export const MESSAGES = [
  { id: 'c1', nameKey: 'msg.c.c1.name', roleKey: 'msg.role.family', unread: 2, lastKey: 'msg.c.c1.last', timeKey: 'msg.time.t1', statusId: 'unread',
    bubbles: [
      { mine: false, textKey: 'msg.c.c1.b1', timeKey: 'msg.time.b1' },
      { mine: true, textKey: 'msg.c.c1.b2', timeKey: 'msg.time.b2' },
      { mine: false, textKey: 'msg.c.c1.b3', timeKey: 'msg.time.b3' },
    ] },
  { id: 'c2', nameKey: 'msg.c.c2.name', roleKey: 'msg.role.teacher', unread: 0, lastKey: 'msg.c.c2.last', timeKey: 'msg.time.t2', statusId: 'read',
    bubbles: [ { mine: false, textKey: 'msg.c.c2.b1', timeKey: 'msg.time.b1' }, { mine: true, textKey: 'msg.c.c2.b2', timeKey: 'msg.time.b2' } ] },
  { id: 'c3', nameKey: 'msg.c.c3.name', roleKey: 'msg.role.family', unread: 5, lastKey: 'msg.c.c3.last', timeKey: 'msg.time.t3', statusId: 'unread',
    bubbles: [ { mine: false, textKey: 'msg.c.c3.b1', timeKey: 'msg.time.b1' } ] },
  { id: 'c4', nameKey: 'msg.c.c4.name', roleKey: 'msg.role.staff', unread: 0, lastKey: 'msg.c.c4.last', timeKey: 'msg.time.t4', statusId: 'read',
    bubbles: [ { mine: false, textKey: 'msg.c.c4.b1', timeKey: 'msg.time.b1' }, { mine: true, textKey: 'msg.c.c4.b2', timeKey: 'msg.time.b2' } ] },
  { id: 'c5', nameKey: 'msg.c.c5.name', roleKey: 'msg.role.teacher', unread: 1, lastKey: 'msg.c.c5.last', timeKey: 'msg.time.t5', statusId: 'unread',
    bubbles: [ { mine: false, textKey: 'msg.c.c5.b1', timeKey: 'msg.time.b1' } ] },
];

/* ---- Leads / New Requests (grounded: management-new-requests) ---- */
export const LEAD_STATUSES = {
  pending: { labelKey: 'lead.st.pending', tone: 'upcoming', icon: 'clock' },
  contacting: { labelKey: 'lead.st.contacting', tone: 'live', icon: 'phone' },
  no_response: { labelKey: 'lead.st.noResponse', tone: 'neutral', icon: 'x-circle' },
  qualified: { labelKey: 'lead.st.qualified', tone: 'completed', icon: 'check-circle' },
  scheduled: { labelKey: 'lead.st.scheduled', tone: 'upcoming', icon: 'calendar' },
  trial_taken: { labelKey: 'lead.st.trialTaken', tone: 'completed', icon: 'check' },
  trial_missed: { labelKey: 'lead.st.trialMissed', tone: 'cancelled', icon: 'x-circle' },
  duplicated: { labelKey: 'lead.st.duplicated', tone: 'neutral', icon: 'copy' },
  teacher: { labelKey: 'lead.st.teacher', tone: 'neutral', icon: 'trainers' },
};
export const LEAD_STATUS_ORDER = ['pending', 'contacting', 'no_response', 'qualified', 'scheduled', 'trial_taken', 'trial_missed', 'duplicated', 'teacher'];
export const LEAD_SOURCES = {
  website: { labelKey: 'lead.src.website', icon: 'globe' },
  referral: { labelKey: 'lead.src.referral', icon: 'user-plus' },
  social: { labelKey: 'lead.src.social', icon: 'megaphone' },
  campaign: { labelKey: 'lead.src.campaign', icon: 'sparkles' },
};
export const LEAD_KPIS = [
  { icon: 'inbox', tone: 'primary', value: '18', labelKey: 'lead.kpi.new' },
  { icon: 'phone', tone: 'live', value: '7', labelKey: 'lead.kpi.contacting' },
  { icon: 'check-circle', tone: 'success', value: '9', labelKey: 'lead.kpi.qualified' },
  { icon: 'calendar', tone: 'upcoming', value: '5', labelKey: 'lead.kpi.trials' },
];
export const LEADS = [
  { id: 'l1', dateKey: 'lead.date.d1', parentKey: 'lead.l.l1.parent', email: 'noor@example.com', phone: '0500000001', statusId: 'pending', sourceId: 'website',
    students: [{ nameKey: 'lead.l.l1.s1', age: 8 }], notes: [{ dateKey: 'lead.date.d1', byKey: 'lead.by.reception', textKey: 'lead.l.l1.n1' }] },
  { id: 'l2', dateKey: 'lead.date.d2', parentKey: 'lead.l.l2.parent', email: 'huda@example.com', phone: '0500000002', statusId: 'contacting', sourceId: 'referral',
    students: [{ nameKey: 'lead.l.l2.s1', age: 10 }, { nameKey: 'lead.l.l2.s2', age: 12 }], notes: [{ dateKey: 'lead.date.d2', byKey: 'lead.by.reception', textKey: 'lead.l.l2.n1' }] },
  { id: 'l3', dateKey: 'lead.date.d3', parentKey: 'lead.l.l3.parent', email: 'sami@example.com', phone: '0500000003', statusId: 'qualified', sourceId: 'social',
    students: [{ nameKey: 'lead.l.l3.s1', age: 9 }], notes: [] },
  { id: 'l4', dateKey: 'lead.date.d4', parentKey: 'lead.l.l4.parent', email: 'lina@example.com', phone: '0500000004', statusId: 'scheduled', sourceId: 'website',
    students: [{ nameKey: 'lead.l.l4.s1', age: 7 }], notes: [{ dateKey: 'lead.date.d4', byKey: 'lead.by.advisor', textKey: 'lead.l.l4.n1' }] },
  { id: 'l5', dateKey: 'lead.date.d5', parentKey: 'lead.l.l5.parent', email: 'omar@example.com', phone: '0500000005', statusId: 'trial_taken', sourceId: 'campaign',
    students: [{ nameKey: 'lead.l.l5.s1', age: 11 }], notes: [] },
  { id: 'l6', dateKey: 'lead.date.d6', parentKey: 'lead.l.l6.parent', email: 'rana@example.com', phone: '0500000006', statusId: 'trial_missed', sourceId: 'referral',
    students: [{ nameKey: 'lead.l.l6.s1', age: 6 }], notes: [] },
  { id: 'l7', dateKey: 'lead.date.d7', parentKey: 'lead.l.l7.parent', email: 'yara@example.com', phone: '0500000007', statusId: 'no_response', sourceId: 'social',
    students: [{ nameKey: 'lead.l.l7.s1', age: 13 }], notes: [] },
  { id: 'l8', dateKey: 'lead.date.d8', parentKey: 'lead.l.l8.parent', email: 'tarek@example.com', phone: '0500000008', statusId: 'duplicated', sourceId: 'website',
    students: [{ nameKey: 'lead.l.l8.s1', age: 8 }], notes: [] },
];
/* Create-Request form field spec (grounded: management-new-requests-create) — no money field */
export const LEAD_GENDERS = ['male', 'female'];
export const LEAD_LANGS = ['ar', 'en'];

/* ---- Tasks (grounded: management-tickets) ---- */
export const TASK_STATUSES = {
  pending: { labelKey: 'task.st.pending', tone: 'upcoming', icon: 'clock' },
  inprogress: { labelKey: 'task.st.inprogress', tone: 'live', icon: 'play' },
  completed: { labelKey: 'task.st.completed', tone: 'completed', icon: 'check-circle' },
  overdue: { labelKey: 'task.st.overdue', tone: 'cancelled', icon: 'alert-triangle' },
};
export const TASK_STATUS_ORDER = ['pending', 'inprogress', 'completed', 'overdue'];
export const TASK_PRIORITIES = {
  high: { labelKey: 'task.pri.high', tone: 'cancelled', icon: 'arrow-up' },
  medium: { labelKey: 'task.pri.medium', tone: 'amber', icon: 'minus' },
  low: { labelKey: 'task.pri.low', tone: 'neutral', icon: 'arrow-down' },
};
export const TASK_KPIS = [
  { icon: 'tasks', tone: 'primary', value: '24', labelKey: 'task.kpi.total' },
  { icon: 'check-circle', tone: 'success', value: '11', labelKey: 'task.kpi.completed' },
  { icon: 'clock', tone: 'upcoming', value: '9', labelKey: 'task.kpi.pending' },
  { icon: 'alert-triangle', tone: 'coral', value: '4', labelKey: 'task.kpi.overdue' },
];
export const TASK_SECTIONS = ['onboarding', 'followup', 'scheduling', 'content'];
export const TASKS = [
  { id: 't1', titleKey: 'task.t.t1.title', descKey: 'task.t.t1.desc', assigneeKey: 'task.asg.reception', statusId: 'pending', priorityId: 'high', dueKey: 'task.due.d1', sectionId: 'onboarding' },
  { id: 't2', titleKey: 'task.t.t2.title', descKey: 'task.t.t2.desc', assigneeKey: 'task.asg.advisor', statusId: 'inprogress', priorityId: 'medium', dueKey: 'task.due.d2', sectionId: 'followup' },
  { id: 't3', titleKey: 'task.t.t3.title', descKey: 'task.t.t3.desc', assigneeKey: 'task.asg.supervisor', statusId: 'inprogress', priorityId: 'high', dueKey: 'task.due.d3', sectionId: 'scheduling' },
  { id: 't4', titleKey: 'task.t.t4.title', descKey: 'task.t.t4.desc', assigneeKey: 'task.asg.reception', statusId: 'completed', priorityId: 'low', dueKey: 'task.due.d4', sectionId: 'onboarding' },
  { id: 't5', titleKey: 'task.t.t5.title', descKey: 'task.t.t5.desc', assigneeKey: 'task.asg.content', statusId: 'completed', priorityId: 'medium', dueKey: 'task.due.d5', sectionId: 'content' },
  { id: 't6', titleKey: 'task.t.t6.title', descKey: 'task.t.t6.desc', assigneeKey: 'task.asg.advisor', statusId: 'overdue', priorityId: 'high', dueKey: 'task.due.d6', sectionId: 'followup' },
  { id: 't7', titleKey: 'task.t.t7.title', descKey: 'task.t.t7.desc', assigneeKey: 'task.asg.supervisor', statusId: 'pending', priorityId: 'low', dueKey: 'task.due.d7', sectionId: 'scheduling' },
];
export const STAFF_TASK_ROWS = [
  { nameKey: 'task.asg.reception', total: '8', pending: '3', overdue: '1', completed: '4', average: 'task.avg.good' },
  { nameKey: 'task.asg.advisor', total: '7', pending: '2', overdue: '2', completed: '3', average: 'task.avg.fair' },
  { nameKey: 'task.asg.supervisor', total: '5', pending: '2', overdue: '0', completed: '3', average: 'task.avg.good' },
  { nameKey: 'task.asg.content', total: '4', pending: '2', overdue: '1', completed: '1', average: 'task.avg.fair' },
];

/* ---- Announcements (grounded: management-public-advertisement) ---- */
export const ANN_CHANNELS = {
  dashboard: { labelKey: 'ann.ch.dashboard', tone: 'neutral', icon: 'layers' },
  whatsapp: { labelKey: 'ann.ch.whatsapp', tone: 'completed', icon: 'message-circle' },
};
export const ANN_STATUSES = {
  published: { labelKey: 'ann.st.published', tone: 'completed', icon: 'check-circle' },
  scheduled: { labelKey: 'ann.st.scheduled', tone: 'upcoming', icon: 'calendar' },
  draft: { labelKey: 'ann.st.draft', tone: 'neutral', icon: 'edit' },
};
export const ANN_AUDIENCES = ['allTeachers', 'allFamilies', 'activeStudents', 'trialFamilies'];
export const ANNOUNCEMENTS = [
  { id: 'a1', msgKey: 'ann.a.a1.msg', audienceKey: 'ann.aud.allFamilies', channelId: 'dashboard', statusId: 'published', expireKey: 'ann.exp.e1' },
  { id: 'a2', msgKey: 'ann.a.a2.msg', audienceKey: 'ann.aud.allTeachers', channelId: 'dashboard', statusId: 'published', expireKey: 'ann.exp.e2' },
  { id: 'a3', msgKey: 'ann.a.a3.msg', audienceKey: 'ann.aud.activeStudents', channelId: 'whatsapp', statusId: 'scheduled', expireKey: 'ann.exp.e3' },
  { id: 'a4', msgKey: 'ann.a.a4.msg', audienceKey: 'ann.aud.trialFamilies', channelId: 'dashboard', statusId: 'draft', expireKey: 'ann.exp.e4' },
];
export const ANN_RECIPIENTS = {
  teachers: ['ann.rcp.t1', 'ann.rcp.t2', 'ann.rcp.t3'],
  students: ['ann.rcp.s1', 'ann.rcp.s2', 'ann.rcp.s3'],
};

/* ---- Time Converter (grounded: management-time-convertor) ----
 * IANA zone ids drive native Intl.DateTimeFormat({timeZone}); labels are locale keys.
 * The browser's own tz database performs the conversion — no data fetched. */
export const TIMEZONES = [
  { id: 'Africa/Cairo', labelKey: 'tz.z.cairo', region: 'africa' },
  { id: 'Asia/Riyadh', labelKey: 'tz.z.riyadh', region: 'asia' },
  { id: 'Asia/Dubai', labelKey: 'tz.z.dubai', region: 'asia' },
  { id: 'Asia/Amman', labelKey: 'tz.z.amman', region: 'asia' },
  { id: 'Asia/Istanbul', labelKey: 'tz.z.istanbul', region: 'asia' },
  { id: 'Europe/London', labelKey: 'tz.z.london', region: 'europe' },
  { id: 'Europe/Paris', labelKey: 'tz.z.paris', region: 'europe' },
  { id: 'Europe/Berlin', labelKey: 'tz.z.berlin', region: 'europe' },
  { id: 'America/New_York', labelKey: 'tz.z.newyork', region: 'americas' },
  { id: 'America/Chicago', labelKey: 'tz.z.chicago', region: 'americas' },
  { id: 'America/Los_Angeles', labelKey: 'tz.z.la', region: 'americas' },
  { id: 'Australia/Sydney', labelKey: 'tz.z.sydney', region: 'oceania' },
];
/* quick chips = common academy zones (subset of TIMEZONES by id) */
export const TZ_QUICK = ['Africa/Cairo', 'Asia/Riyadh', 'Asia/Dubai', 'Europe/London', 'America/New_York'];
/* authored DST "Changes" board — display-only (NOT a live sync; no computed account counts) */
export const TZ_CHANGES = [
  { zoneKey: 'tz.z.london', nextKey: 'tz.chg.london.next', curKey: 'tz.chg.london.cur', upKey: 'tz.chg.london.up' },
  { zoneKey: 'tz.z.paris', nextKey: 'tz.chg.paris.next', curKey: 'tz.chg.paris.cur', upKey: 'tz.chg.paris.up' },
  { zoneKey: 'tz.z.newyork', nextKey: 'tz.chg.newyork.next', curKey: 'tz.chg.newyork.cur', upKey: 'tz.chg.newyork.up' },
  { zoneKey: 'tz.z.sydney', nextKey: 'tz.chg.sydney.next', curKey: 'tz.chg.sydney.cur', upKey: 'tz.chg.sydney.up' },
];

/* Spec 029 — Admin Reports/Feedback/Forms authored, DISPLAY-ONLY fixtures.
 *
 * Feeds the folded Feedback-review + Forms/surveys sections on reports.html. EVERY value is
 * an authored literal or a `rep.*` locale key — there is NO computed proportion / numeric mark /
 * ordering, NO runtime aggregation, NO plotting data, and NO money / billing field anywhere.
 * Remarks are CATEGORICAL labels (never a number); counts are authored literals. Self-contained:
 * references only keys authored in ar/en.rep.js, so no cross-fixture key drift. */

/* Feedback review rows — teacher / class / family / student lenses.
 * remarkId ∈ {excellent, good, watch, concern} → categorical label + tone (a qualitative remark, never a number).
 * statusId ∈ {open, reviewed, resolved}. */
export const FEEDBACK = [
  { id: 'fb1',  type: 'teacher', subjectKey: 'rep.fb.subj.sara',    categoryKey: 'rep.fbcat.name.teaching',      remarkId: 'excellent', statusId: 'reviewed', dateKey: 'rep.fb.date.d1', noteKey: 'rep.fb.note.n1' },
  { id: 'fb2',  type: 'teacher', subjectKey: 'rep.fb.subj.mohammed',categoryKey: 'rep.fbcat.name.communication', remarkId: 'good',      statusId: 'open',     dateKey: 'rep.fb.date.d2', noteKey: 'rep.fb.note.n2' },
  { id: 'fb3',  type: 'teacher', subjectKey: 'rep.fb.subj.layan',   categoryKey: 'rep.fbcat.name.teaching',      remarkId: 'good',      statusId: 'resolved', dateKey: 'rep.fb.date.d3', noteKey: 'rep.fb.note.n3' },
  { id: 'fb4',  type: 'class',   subjectKey: 'rep.fb.subj.mathGrp', categoryKey: 'rep.fbcat.name.session',       remarkId: 'excellent', statusId: 'reviewed', dateKey: 'rep.fb.date.d1', noteKey: 'rep.fb.note.n4' },
  { id: 'fb5',  type: 'class',   subjectKey: 'rep.fb.subj.progGrp', categoryKey: 'rep.fbcat.name.session',       remarkId: 'watch',     statusId: 'open',     dateKey: 'rep.fb.date.d4', noteKey: 'rep.fb.note.n5' },
  { id: 'fb6',  type: 'class',   subjectKey: 'rep.fb.subj.engGrp',  categoryKey: 'rep.fbcat.name.session',       remarkId: 'good',      statusId: 'reviewed', dateKey: 'rep.fb.date.d2', noteKey: 'rep.fb.note.n6' },
  { id: 'fb7',  type: 'family',  subjectKey: 'rep.fb.subj.fam1',    categoryKey: 'rep.fbcat.name.communication', remarkId: 'good',      statusId: 'resolved', dateKey: 'rep.fb.date.d3', noteKey: 'rep.fb.note.n7' },
  { id: 'fb8',  type: 'family',  subjectKey: 'rep.fb.subj.fam2',    categoryKey: 'rep.fbcat.name.meeting',        remarkId: 'watch',     statusId: 'open',     dateKey: 'rep.fb.date.d4', noteKey: 'rep.fb.note.n8' },
  { id: 'fb9',  type: 'family',  subjectKey: 'rep.fb.subj.fam3',    categoryKey: 'rep.fbcat.name.meeting',        remarkId: 'concern',   statusId: 'open',     dateKey: 'rep.fb.date.d5', noteKey: 'rep.fb.note.n9' },
  { id: 'fb10', type: 'student', subjectKey: 'rep.fb.subj.st1',     categoryKey: 'rep.fbcat.name.progress',       remarkId: 'excellent', statusId: 'reviewed', dateKey: 'rep.fb.date.d1', noteKey: 'rep.fb.note.n10' },
  { id: 'fb11', type: 'student', subjectKey: 'rep.fb.subj.st6',     categoryKey: 'rep.fbcat.name.progress',       remarkId: 'good',      statusId: 'resolved', dateKey: 'rep.fb.date.d2', noteKey: 'rep.fb.note.n11' },
  { id: 'fb12', type: 'student', subjectKey: 'rep.fb.subj.st11',    categoryKey: 'rep.fbcat.name.progress',       remarkId: 'watch',     statusId: 'open',     dateKey: 'rep.fb.date.d5', noteKey: 'rep.fb.note.n12' },
];

/* Feedback categories — authored labels used to group feedback (display-only CRUD). */
export const FEEDBACK_CATEGORIES = [
  { id: 'fc1', nameKey: 'rep.fbcat.name.teaching',      descKey: 'rep.fbcat.desc.teaching',      statusId: 'active',   count: 5 },
  { id: 'fc2', nameKey: 'rep.fbcat.name.communication', descKey: 'rep.fbcat.desc.communication', statusId: 'active',   count: 3 },
  { id: 'fc3', nameKey: 'rep.fbcat.name.session',       descKey: 'rep.fbcat.desc.session',       statusId: 'active',   count: 4 },
  { id: 'fc4', nameKey: 'rep.fbcat.name.meeting',       descKey: 'rep.fbcat.desc.meeting',       statusId: 'active',   count: 2 },
  { id: 'fc5', nameKey: 'rep.fbcat.name.progress',      descKey: 'rep.fbcat.desc.progress',      statusId: 'inactive', count: 3 },
];

/* Forms / surveys — authored definitions (display-only list). questions/responses are
 * authored literals, NEVER aggregated at runtime. */
export const FORMS = [
  { id: 'frm1', titleKey: 'rep.form.t.progress',     questions: 6, responses: 42, isDefault: true,  statusId: 'active', createdKey: 'rep.form.created.c1' },
  { id: 'frm2', titleKey: 'rep.form.t.trial',        questions: 4, responses: 18, isDefault: false, statusId: 'active', createdKey: 'rep.form.created.c2' },
  { id: 'frm3', titleKey: 'rep.form.t.satisfaction', questions: 8, responses: 31, isDefault: false, statusId: 'active', createdKey: 'rep.form.created.c1' },
  { id: 'frm4', titleKey: 'rep.form.t.teacherReview',questions: 5, responses: 0,  isDefault: false, statusId: 'draft',  createdKey: 'rep.form.created.c3' },
  { id: 'frm5', titleKey: 'rep.form.t.exit',         questions: 3, responses: 12, isDefault: false, statusId: 'closed', createdKey: 'rep.form.created.c4' },
];

/* categorical remark → tone (reuses the existing .rating-pill tone-* CSS; a qualitative label, never a number) */
export const FB_REMARK_TONE = { excellent: 'excellent', good: 'good', watch: 'sometimes', concern: 'rarely' };
/* feedback status → chip tone (icon+label chip; never color-only) */
export const FB_STATUS = {
  open:     { tone: 'amber',     icon: 'clock' },
  reviewed: { tone: 'upcoming',  icon: 'search' },
  resolved: { tone: 'completed', icon: 'check-circle' },
};
/* form status → chip tone */
export const FORM_STATUS = {
  active: { tone: 'completed', icon: 'check-circle' },
  draft:  { tone: 'amber',     icon: 'edit' },
  closed: { tone: 'neutral',   icon: 'x-circle' },
};
export const FB_TYPES = ['teacher', 'class', 'family', 'student'];

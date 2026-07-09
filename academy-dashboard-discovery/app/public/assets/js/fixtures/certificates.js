/* Spec 031 — Certificates fixtures: templates + a STATIC designer layout + requests.
 * The designer is a display-only preview (CSS-positioned labels over a background band) —
 * no plotting element, no drag-reposition, no serialized layout or server render commands,
 * no upload. usageCount is an authored literal. Approve/Generate/Preview/Download/Send are
 * backendRequired gates in the page (no real document, no opening a file, no status
 * mutation, no send). No real PII. */

export const CERT_TEMPLATES = [
  { id: 'tpl1', nameKey: 'adm.cert.tpl.completion', usageCount: 42, accent: 'violet' },
  { id: 'tpl2', nameKey: 'adm.cert.tpl.excellence', usageCount: 18, accent: 'amber' },
  { id: 'tpl3', nameKey: 'adm.cert.tpl.attendance', usageCount: 27, accent: 'teal' },
  { id: 'tpl4', nameKey: 'adm.cert.tpl.quran',      usageCount: 9,  accent: 'primary' },
];

/* Static designer preview — merge-field labels at authored (x%,y%) positions over an
 * authored background band. Rendered as absolutely-positioned <span>s in CSS; there is
 * NO interactivity (no drag, no reposition, no properties panel that mutates anything). */
export const CERT_DESIGNER = {
  titleKey: 'adm.cert.designer.title',
  fields: [
    { key: 'student', labelKey: 'adm.cert.field.student', x: 50, y: 42 },
    { key: 'course',  labelKey: 'adm.cert.field.course',  x: 50, y: 58 },
    { key: 'teacher', labelKey: 'adm.cert.field.teacher', x: 30, y: 78 },
    { key: 'date',    labelKey: 'adm.cert.field.date',    x: 70, y: 78 },
  ],
};

export const CERT_STATUS = {
  pending:  { tone: 'amber',     icon: 'clock',        labelKey: 'adm.cert.st.pending' },
  approved: { tone: 'completed', icon: 'check-circle', labelKey: 'adm.cert.st.approved' },
  rejected: { tone: 'cancelled', icon: 'x-circle',     labelKey: 'adm.cert.st.rejected' },
};
export const CERT_STATUS_ORDER = ['pending', 'approved', 'rejected'];

/* certificate-request queue rows. */
export const CERT_REQUESTS = [
  { id: 'cr1', studentKey: 'adm.cert.req.s1', courseKey: 'adm.cert.req.c.arabic',  teacherKey: 'adm.cert.req.t1', descKey: 'adm.cert.req.d.completion', dateKey: 'adm.cert.req.dt.today',     statusId: 'pending' },
  { id: 'cr2', studentKey: 'adm.cert.req.s2', courseKey: 'adm.cert.req.c.math',    teacherKey: 'adm.cert.req.t2', descKey: 'adm.cert.req.d.excellence', dateKey: 'adm.cert.req.dt.today',     statusId: 'pending' },
  { id: 'cr3', studentKey: 'adm.cert.req.s3', courseKey: 'adm.cert.req.c.quran',   teacherKey: 'adm.cert.req.t3', descKey: 'adm.cert.req.d.attendance', dateKey: 'adm.cert.req.dt.yesterday', statusId: 'approved' },
  { id: 'cr4', studentKey: 'adm.cert.req.s4', courseKey: 'adm.cert.req.c.science', teacherKey: 'adm.cert.req.t1', descKey: 'adm.cert.req.d.completion', dateKey: 'adm.cert.req.dt.week',      statusId: 'approved' },
  { id: 'cr5', studentKey: 'adm.cert.req.s5', courseKey: 'adm.cert.req.c.english', teacherKey: 'adm.cert.req.t2', descKey: 'adm.cert.req.d.completion', dateKey: 'adm.cert.req.dt.week',      statusId: 'rejected' },
];

/* issued certificates (per-request drawer) — display-only; Options non-actionable. */
export const CERT_ISSUED = [
  { id: 'iss1', labelKey: 'adm.cert.iss.i1', statusId: 'approved' },
  { id: 'iss2', labelKey: 'adm.cert.iss.i2', statusId: 'approved' },
];

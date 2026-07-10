/* Spec 032 — shared authored option lists for the form drawers. Display-only
 * demo values with locale-key labels (fopt.* in ar/en.extra.js, plus reused
 * lang.* / data.crs.lvl.* / data.subj.* keys). NO pay/credential/PII value,
 * nothing computed. Selects render via field({type:'select'}) — INERT. */
const opts = (keys, prefix) => keys.map((k, i) => ({ value: k, labelKey: `${prefix}.${k}`, selected: i === 0 }));

export const FORM_STATUS_OPTS = opts(['active', 'trial', 'suspended', 'inactive'], 'fopt.status');
export const GENDER_OPTS = opts(['male', 'female'], 'fopt.gender');
export const LANGUAGE_OPTS = opts(['ar', 'en'], 'lang');
export const LEVEL_OPTS = opts(['foundation', 'l1', 'l2', 'l3', 'advanced'], 'data.crs.lvl');
export const SUBJECT_OPTS = opts(['math', 'arabic', 'programming', 'physics', 'english', 'science'], 'data.subj');
export const ROLE_OPTS = opts(['manager', 'accountant', 'supervisor', 'support'], 'fopt.role');
export const DAY_OPTS = opts(['sat', 'sun', 'mon', 'tue', 'wed', 'thu'], 'fopt.day');
export const DURATION_OPTS = opts(['m30', 'm45', 'm60', 'm90'], 'fopt.dur');
export const FIELD_TYPE_OPTS = opts(['text', 'select', 'yesno', 'note'], 'fopt.ftype');

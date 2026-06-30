/* Spec 007 — TEACHER lifecycle status map. A distinct, labeled vocabulary —
 * the 7th map, separate from the SESSION (status-map.js), LIFECYCLE (family-status.js),
 * OUTCOME (outcome-status.js), COURSE (course-status.js), GROUP (group-status.js), and
 * ENROLLMENT (enrollment-status.js) maps. Rendered via the generic `chip` as icon +
 * label, NEVER numeric or color-only; `tone` is an EXISTING chip class so colors never
 * drift. Collapses the legacy active/inactive/incomplete/unconfirmed/deleted into three
 * calm labels. Display-only — no state machine, no computed engine. */
import { chip } from './ui.js';

export const TEACHER_STATUS = {
  active:   { id: 'active',   tone: 'completed', icon: 'check-circle', labelKey: 'trn.status.active' },
  paused:   { id: 'paused',   tone: 'amber',     icon: 'pause-circle', labelKey: 'trn.status.paused' },
  inactive: { id: 'inactive', tone: 'neutral',   icon: 'user-x',       labelKey: 'trn.status.inactive' },
};

export const TEACHER_STATUS_ORDER = ['active', 'paused', 'inactive'];

export function teacherStatusOf(id) { return TEACHER_STATUS[id] || TEACHER_STATUS.active; }

/** labeled teacher-status chip (icon + label) */
export function teacherStatusChip(id) {
  const s = teacherStatusOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

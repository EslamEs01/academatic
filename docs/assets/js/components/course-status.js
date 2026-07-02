/* Spec 006 — catalogue COURSE status map (the SUBJECT-OFFERING status). Relocated +
 * EXTENDED from fixtures/courses.js (adds `paused`). Distinct from the ENROLLMENT map
 * (enrollment-status.js: active/paused/completed, the student↔course relationship) and
 * the GROUP map (group-status.js). Labeled icon + label, never numeric/color-only;
 * `tone` is an existing chip class. */
import { chip } from './ui.js';

export const COURSE_STATUS = {
  active:   { id: 'active',   tone: 'completed', icon: 'check-circle', labelKey: 'cur.status.active' },
  draft:    { id: 'draft',    tone: 'amber',     icon: 'edit',         labelKey: 'cur.status.draft' },
  paused:   { id: 'paused',   tone: 'amber',     icon: 'pause-circle', labelKey: 'cur.status.paused' },
  archived: { id: 'archived', tone: 'neutral',   icon: 'inbox',        labelKey: 'cur.status.archived' },
};

export const COURSE_STATUS_ORDER = ['active', 'draft', 'paused', 'archived'];

export function courseStatusOf(id) { return COURSE_STATUS[id] || COURSE_STATUS.active; }

/** labeled course-status chip (icon + label) */
export function courseStatusChip(id) {
  const s = courseStatusOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

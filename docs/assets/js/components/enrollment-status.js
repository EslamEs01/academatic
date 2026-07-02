/* Spec 006 — ENROLLMENT status map (the student↔course relationship: active/paused/
 * completed). Relocated out of pages/student.js so it no longer SHADOWS the catalogue
 * CourseStatus (course-status.js). Deliberately DISTINCT tones/icons (active→live/play)
 * from the catalogue map (active→completed/check-circle) so the two never read alike.
 * Reuses the existing `sp.courseStatus.*` labels (no new i18n keys). Labeled icon+text. */
import { chip } from './ui.js';

export const ENROLLMENT_STATUS = {
  active:    { id: 'active',    tone: 'live',      icon: 'play',         labelKey: 'sp.courseStatus.active' },
  completed: { id: 'completed', tone: 'completed', icon: 'check-circle', labelKey: 'sp.courseStatus.completed' },
  paused:    { id: 'paused',    tone: 'amber',     icon: 'pause-circle', labelKey: 'sp.courseStatus.paused' },
};

export function enrollmentStatusOf(id) { return ENROLLMENT_STATUS[id] || ENROLLMENT_STATUS.active; }

/** labeled enrollment-status chip (icon + label) */
export function enrollmentStatusChip(id) {
  const s = enrollmentStatusOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

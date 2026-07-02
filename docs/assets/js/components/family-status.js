/* Family / student LIFECYCLE status map (Spec 004, R25). A single source of
 * truth: id → { tone, icon, labelKey }, rendered via the generic `chip`
 * (icon + label — NEVER numeric or color-only, fixing the legacy /status/0..6).
 * Distinct from the SESSION status map (live/upcoming/completed/cancelled). */
import { chip } from './ui.js';

export const FAMILY_STATUS = {
  active:    { id: 'active',    tone: 'completed', icon: 'check-circle',   labelKey: 'famStatus.active' },
  trial:     { id: 'trial',     tone: 'upcoming',  icon: 'sparkles',       labelKey: 'famStatus.trial' },
  suspended: { id: 'suspended', tone: 'amber',     icon: 'pause-circle',   labelKey: 'famStatus.suspended' },
  stopped:   { id: 'stopped',   tone: 'cancelled', icon: 'x-circle',       labelKey: 'famStatus.stopped' },
  inactive:  { id: 'inactive',  tone: 'neutral',   icon: 'moon',           labelKey: 'famStatus.inactive' },
};

export function lifecycleStatusOf(id) { return FAMILY_STATUS[id] || FAMILY_STATUS.inactive; }

/** labeled lifecycle chip (icon + label) */
export function familyStatusChip(statusId) {
  const s = lifecycleStatusOf(statusId);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

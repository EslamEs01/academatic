/* Spec 006 — GROUP (cohort) status map. A distinct, labeled vocabulary — separate
 * from the SESSION map (status-map.js), the LIFECYCLE map (family-status.js), the
 * OUTCOME map (outcome-status.js), and the catalogue/enrollment course maps. Rendered
 * via the generic `chip` as icon + label, NEVER numeric or color-only; `tone` is an
 * EXISTING chip class so colors never drift. `needsAttention` is a display FLAG
 * (rendered via attentionFlag), not a lifecycle state. */
import { chip } from './ui.js';

export const GROUP_STATUS = {
  active:    { id: 'active',    tone: 'completed', icon: 'check-circle',   labelKey: 'group.status.active' },
  trial:     { id: 'trial',     tone: 'upcoming',  icon: 'sparkles',       labelKey: 'group.status.trial' },
  full:      { id: 'full',      tone: 'neutral',   icon: 'students',       labelKey: 'group.status.full' },
  paused:    { id: 'paused',    tone: 'amber',     icon: 'pause-circle',   labelKey: 'group.status.paused' },
  completed: { id: 'completed', tone: 'neutral',   icon: 'graduation-cap', labelKey: 'group.status.completed' },
};

/* stable order for tiles/filters */
export const GROUP_STATUS_ORDER = ['active', 'trial', 'full', 'paused', 'completed'];

export function groupStatusOf(id) { return GROUP_STATUS[id] || GROUP_STATUS.active; }

/** labeled group-status chip (icon + label) */
export function groupStatusChip(id) {
  const s = groupStatusOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

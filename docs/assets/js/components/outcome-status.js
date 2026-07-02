/* Session OUTCOME (review) status map (Spec 005, R33). The THIRD status
 * vocabulary — distinct from the SESSION map (status-map.js: live/upcoming/
 * completed/cancelled) and the LIFECYCLE map (family-status.js). Rendered via
 * the generic `chip` as icon + label, NEVER numeric or color-only; collapses the
 * legacy ~11-state + numeric `status=0..N` codes. `tone` is an EXISTING chip
 * class so colors never drift; studentAbsent/teacherAbsent/cancelled stay
 * distinguishable by icon + label even in grayscale. */
import { chip } from './ui.js';

export const OUTCOME_STATUS = {
  attended:       { id: 'attended',       tone: 'completed', icon: 'check-circle',   labelKey: 'outcome.attended' },
  studentAbsent:  { id: 'studentAbsent',  tone: 'cancelled', icon: 'user-x',         labelKey: 'outcome.studentAbsent' },
  teacherAbsent:  { id: 'teacherAbsent',  tone: 'amber',     icon: 'user-x',         labelKey: 'outcome.teacherAbsent' },
  cancelled:      { id: 'cancelled',      tone: 'neutral',   icon: 'x-circle',       labelKey: 'outcome.cancelled' },
  rescheduled:    { id: 'rescheduled',    tone: 'upcoming',  icon: 'calendar-clock', labelKey: 'outcome.rescheduled' },
  upcoming:       { id: 'upcoming',       tone: 'upcoming',  icon: 'clock',          labelKey: 'outcome.upcoming' },
  live:           { id: 'live',           tone: 'live',      icon: 'play',           labelKey: 'outcome.live' },
  /* display flags (rendered alongside an outcome, never a standalone status) */
  makeUpSuggested:{ id: 'makeUpSuggested',tone: 'amber',     icon: 'rotate-cw',      labelKey: 'outcome.makeUpSuggested' },
  needsFollowUp:  { id: 'needsFollowUp',  tone: 'amber',     icon: 'alert-triangle', labelKey: 'outcome.needsFollowUp' },
};

/* stable order for tiles/filters */
export const OUTCOME_ORDER = ['attended', 'studentAbsent', 'teacherAbsent', 'cancelled', 'rescheduled', 'upcoming', 'live'];

export function outcomeOf(id) { return OUTCOME_STATUS[id] || OUTCOME_STATUS.upcoming; }

/** labeled outcome chip (icon + label) */
export function outcomeChip(id) {
  const o = outcomeOf(id);
  return chip({ labelKey: o.labelKey, tone: o.tone, icon: o.icon });
}

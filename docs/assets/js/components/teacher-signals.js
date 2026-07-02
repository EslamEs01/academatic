/* Spec 007 — TEACHER workload + follow-up signal maps. Two distinct labeled
 * vocabularies (the 8th + 9th maps), separate from the six existing status maps.
 * BOTH are display-only AUTHORED FIXTURE FLAGS — never a computed rating, ordering,
 * or workload-calculation engine. Rendered via the generic `chip` as
 * icon + label, NEVER numeric or color-only; `tone` is an EXISTING chip class.
 *   workload : light / balanced / high   (a calm load hint, backed by session/hour counts)
 *   follow-up: strongDelivery / stable / needsFollowUp / attentionRisk  (a delivery signal) */
import { chip } from './ui.js';

/* ---- workload (a fixture load hint, never a computed metric) ---- */
export const TEACHER_WORKLOAD = {
  light:    { id: 'light',    tone: 'upcoming',  icon: 'clock',       labelKey: 'trn.workload.light' },
  balanced: { id: 'balanced', tone: 'live',      icon: 'target',      labelKey: 'trn.workload.balanced' },
  high:     { id: 'high',     tone: 'amber',     icon: 'trending-up', labelKey: 'trn.workload.high' },
};
export const WORKLOAD_ORDER = ['light', 'balanced', 'high'];
export function workloadOf(id) { return TEACHER_WORKLOAD[id] || TEACHER_WORKLOAD.balanced; }
export function workloadChip(id) {
  const s = workloadOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

/* ---- follow-up / delivery signal (a fixture flag, never a score/rank) ---- */
export const TEACHER_SIGNAL = {
  strongDelivery: { id: 'strongDelivery', tone: 'completed', icon: 'award',          labelKey: 'trn.signal.strongDelivery' },
  stable:         { id: 'stable',         tone: 'live',      icon: 'check',           labelKey: 'trn.signal.stable' },
  needsFollowUp:  { id: 'needsFollowUp',  tone: 'amber',     icon: 'alert-triangle',  labelKey: 'trn.signal.needsFollowUp' },
  attentionRisk:  { id: 'attentionRisk',  tone: 'cancelled', icon: 'x-circle',        labelKey: 'trn.signal.attentionRisk' },
};
export const SIGNAL_ORDER = ['strongDelivery', 'stable', 'needsFollowUp', 'attentionRisk'];
export function signalOf(id) { return TEACHER_SIGNAL[id] || TEACHER_SIGNAL.stable; }
export function signalChip(id) {
  const s = signalOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}
/** the follow-up flag is shown ON A CARD only when the teacher actually needs follow-up */
export function needsFollowUp(id) { return id === 'needsFollowUp' || id === 'attentionRisk'; }

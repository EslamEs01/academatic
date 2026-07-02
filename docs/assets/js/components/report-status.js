/* Spec 008 — REPORT status vocabularies. TWO NEW labeled maps, distinct from the six
 * existing maps (session status-map.js, outcome-status.js, group-status.js,
 * family-status.js, teacher-status.js, teacher-signals.js) and from each other:
 *   - report-signal       — an authored DISPLAY flag summarizing an area's state
 *                           (healthy / needsFollowUp / attentionRisk). NOT a computed
 *                           grade/ordering — just a labeled roll-up of fixture counts.
 *   - report-availability — labels each category card honestly
 *                           (available / demoOnly / planned / backendRequired).
 * Both render via the generic `chip` as icon + label, NEVER numeric or color-only;
 * `tone` is always one of the EXISTING chip classes so colors never drift. */
import { chip } from './ui.js';

/* ── report-signal ─────────────────────────────────────────────────────────── */
export const REPORT_SIGNAL = {
  healthy:       { id: 'healthy',       tone: 'completed', icon: 'check-circle',   labelKey: 'rep.signal.healthy' },
  needsFollowUp: { id: 'needsFollowUp', tone: 'amber',     icon: 'alert-triangle', labelKey: 'rep.signal.needsFollowUp' },
  attentionRisk: { id: 'attentionRisk', tone: 'cancelled', icon: 'x-circle',       labelKey: 'rep.signal.attentionRisk' },
};

/* stable order for any iteration */
export const SIGNAL_ORDER = ['healthy', 'needsFollowUp', 'attentionRisk'];

export function reportSignalOf(id) { return REPORT_SIGNAL[id] || REPORT_SIGNAL.healthy; }

/** labeled report-signal chip (icon + label) */
export function reportSignalChip(id) {
  const s = reportSignalOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

/* ── report-availability ───────────────────────────────────────────────────── */
export const REPORT_AVAILABILITY = {
  available:       { id: 'available',       tone: 'live',     icon: 'check',    labelKey: 'rep.avail.available' },
  demoOnly:        { id: 'demoOnly',        tone: 'upcoming', icon: 'sparkles', labelKey: 'rep.avail.demoOnly' },
  planned:         { id: 'planned',         tone: 'neutral',  icon: 'clock',    labelKey: 'rep.avail.planned' },
  backendRequired: { id: 'backendRequired', tone: 'amber',    icon: 'lock',     labelKey: 'rep.avail.backendRequired' },
};

/* stable order for any iteration */
export const AVAILABILITY_ORDER = ['available', 'demoOnly', 'planned', 'backendRequired'];

export function availabilityOf(id) { return REPORT_AVAILABILITY[id] || REPORT_AVAILABILITY.available; }

/** labeled report-availability chip (icon + label) */
export function availabilityChip(id) {
  const a = availabilityOf(id);
  return chip({ labelKey: a.labelKey, tone: a.tone, icon: a.icon });
}

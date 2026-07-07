/* Spec 026 — Sessions Analysis fixtures (admin ops).
 *
 * Grounded in `output/roles/admin/pages/management-sessions-analysis.md` (the legacy
 * `sessions_analysis` outcome KPI board: Regular + Trial classes, each row a
 * "count (duration)" pair, plus a small Helpers strip).
 *
 * EVERY value here is a STATIC AUTHORED small integer / label — there is NO backend,
 * NO persistence, NO computed average/score/rank/percentile/chart, and NO
 * monetary value anywhere. The counts do not need to (and are not derived
 * to) sum; they are display-only authored placeholders. `durationLabel` is an authored
 * "HH:MM" total-time string, language-neutral (shown verbatim in both locales). */

/* HelperTile: { key, icon, tone, value, labelKey } — the live "Helpers" strip. */
export const SA_HELPERS = [
  { key: 'lastSession', icon: 'clock',          tone: 'muted',   value: 0, labelKey: 'sa.help.lastSession' },
  { key: 'currentHour', icon: 'calendar-clock', tone: 'muted',   value: 0, labelKey: 'sa.help.currentHour' },
  { key: 'waiting',     icon: 'pause-circle',   tone: 'amber',   value: 1, labelKey: 'sa.help.waiting' },
  { key: 'running',     icon: 'play',           tone: 'success', value: 0, labelKey: 'sa.help.running' },
];

/* OutcomeStat: { key, labelKey, count, durationLabel } — REGULAR classes (full set). */
export const SA_REGULAR = [
  { key: 'total',         labelKey: 'sa.item.total',         count: 42, durationLabel: '31:30' },
  { key: 'studentCancel', labelKey: 'sa.item.studentCancel', count: 3,  durationLabel: '02:15' },
  { key: 'teacherCancel', labelKey: 'sa.item.teacherCancel', count: 1,  durationLabel: '00:45' },
  { key: 'adminCancel',   labelKey: 'sa.item.adminCancel',   count: 1,  durationLabel: '00:45' },
  { key: 'attended',      labelKey: 'sa.item.attended',      count: 32, durationLabel: '24:00' },
  { key: 'studentAbsent', labelKey: 'sa.item.studentAbsent', count: 2,  durationLabel: '01:30' },
  { key: 'teacherAbsent', labelKey: 'sa.item.teacherAbsent', count: 1,  durationLabel: '00:45' },
  { key: 'pending',       labelKey: 'sa.item.pending',       count: 2,  durationLabel: '01:30' },
  { key: 'rescheduled',   labelKey: 'sa.item.rescheduled',   count: 3,  durationLabel: '02:15' },
  { key: 'makeup',        labelKey: 'sa.item.makeup',        count: 2,  durationLabel: '01:30' },
];

/* OutcomeStat parallel — TRIAL classes (smaller authored set). */
export const SA_TRIAL = [
  { key: 'trialTotal',    labelKey: 'sa.item.trialTotal',    count: 6, durationLabel: '03:00' },
  { key: 'studentCancel', labelKey: 'sa.item.studentCancel', count: 1, durationLabel: '00:30' },
  { key: 'attended',      labelKey: 'sa.item.attended',      count: 3, durationLabel: '01:30' },
  { key: 'studentAbsent', labelKey: 'sa.item.studentAbsent', count: 1, durationLabel: '00:30' },
  { key: 'teacherAbsent', labelKey: 'sa.item.teacherAbsent', count: 0, durationLabel: '00:00' },
  { key: 'pending',       labelKey: 'sa.item.pending',       count: 1, durationLabel: '00:30' },
];

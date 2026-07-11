/* Spec 036 — Teacher Performance authored fixtures for the two new display-only
 * tabs on teacher-performance.html (Sessions KPI · Monthly Performance).
 *
 * DISPLAY-ONLY. Everything is authored: labels are locale keys (ar/en.trn.js),
 * values are literals. NO PII beyond the existing authored teacher names, NO
 * salary/rate/fine/payout/currency/pay figure, NO computed score/rank/percentage/
 * rating/total, NO chart/canvas. The legacy "Classes KPI" and "Monthly Performance"
 * reports each carried a computed `Percentage` — it is deliberately NOT reproduced;
 * these boards show authored session COUNTS + categorical LABELS only. Session
 * counts come from the existing authored `teacherCounts` (teacher-links.js). */

/* ---- Sessions KPI ---- categorical quality/attendance label per teacher (authored,
 * NOT computed). Keyed by the existing TEACHERS row ids. */
export const KPI_QUALITY = {
  onTrack: { labelKey: 'trn.sessKpi.q.onTrack', tone: 'completed', icon: 'check-circle' },
  watch: { labelKey: 'trn.sessKpi.q.watch', tone: 'amber', icon: 'clock' },
  needsAttention: { labelKey: 'trn.sessKpi.q.needsAttention', tone: 'cancelled', icon: 'alert-triangle' },
};
export const KPI_QUALITY_ORDER = ['onTrack', 'watch', 'needsAttention'];
export const SESSIONS_KPI_LABELS = {
  sara: 'onTrack', mohammed: 'watch', layan: 'onTrack', abdullah: 'needsAttention',
  reem: 'onTrack', nora: 'watch', khalid: 'onTrack', huda: 'needsAttention',
};

/* ---- Monthly Performance ---- authored month + categorical trend + note per row.
 * NO percentage/score. Trend is an authored enum. */
export const PERF_MONTHS = {
  mar: { labelKey: 'trn.monthly.m.mar' },
  apr: { labelKey: 'trn.monthly.m.apr' },
  may: { labelKey: 'trn.monthly.m.may' },
};
export const PERF_MONTH_ORDER = ['may', 'apr', 'mar'];
export const PERF_TRENDS = {
  improving: { labelKey: 'trn.monthly.t.improving', tone: 'completed', icon: 'trending-up' },
  steady: { labelKey: 'trn.monthly.t.steady', tone: 'neutral', icon: 'clock' },
  declining: { labelKey: 'trn.monthly.t.declining', tone: 'amber', icon: 'alert-triangle' },
};
export const PERF_TREND_ORDER = ['improving', 'steady', 'declining'];

/* per-row monthly performance (authored). teacherId joins TEACHERS; note is an
 * authored recommendation string (locale key). NO computed figure. */
export const MONTHLY_ROWS = [
  { id: 'mp1', teacherId: 'sara', monthId: 'may', trendId: 'improving', noteKey: 'trn.monthly.n.sara' },
  { id: 'mp2', teacherId: 'mohammed', monthId: 'may', trendId: 'steady', noteKey: 'trn.monthly.n.mohammed' },
  { id: 'mp3', teacherId: 'abdullah', monthId: 'may', trendId: 'declining', noteKey: 'trn.monthly.n.abdullah' },
  { id: 'mp4', teacherId: 'layan', monthId: 'may', trendId: 'improving', noteKey: 'trn.monthly.n.layan' },
  { id: 'mp5', teacherId: 'reem', monthId: 'apr', trendId: 'steady', noteKey: 'trn.monthly.n.reem' },
  { id: 'mp6', teacherId: 'nora', monthId: 'apr', trendId: 'improving', noteKey: 'trn.monthly.n.nora' },
  { id: 'mp7', teacherId: 'huda', monthId: 'apr', trendId: 'declining', noteKey: 'trn.monthly.n.huda' },
  { id: 'mp8', teacherId: 'khalid', monthId: 'apr', trendId: 'steady', noteKey: 'trn.monthly.n.khalid' },
  { id: 'mp9', teacherId: 'sara', monthId: 'mar', trendId: 'steady', noteKey: 'trn.monthly.n.saraMar' },
  { id: 'mp10', teacherId: 'mohammed', monthId: 'mar', trendId: 'improving', noteKey: 'trn.monthly.n.mohammedMar' },
  { id: 'mp11', teacherId: 'abdullah', monthId: 'mar', trendId: 'declining', noteKey: 'trn.monthly.n.abdullahMar' },
];

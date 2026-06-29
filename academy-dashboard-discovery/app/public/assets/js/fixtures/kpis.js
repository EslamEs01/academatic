/* KPI/stat cards. Order matches the approved row in RTL DOM order
 * (first child = rightmost): sessions → active students → attendance → revenue.
 * spark[] feeds hand-rolled SVG (no chart lib). */
export const KPIS = [
  {
    id: 'todaySessions', labelKey: 'kpi.todaySessions', value: 24, format: 'number',
    tone: 'primary', icon: 'calendar', trendDirection: 'up', trendPercent: 12, sparkKind: 'line',
    spark: [14, 16, 15, 18, 17, 19, 18, 21, 22, 24],
  },
  {
    id: 'activeStudents', labelKey: 'kpi.activeStudents', value: 1284, format: 'number',
    tone: 'teal', icon: 'students', trendDirection: 'up', trendPercent: 4, sparkKind: 'line',
    spark: [11, 12, 12, 13, 12, 14, 15, 14, 16, 17],
  },
  {
    id: 'attendance', labelKey: 'kpi.attendance', value: 92, format: 'percent',
    tone: 'success', icon: 'check-circle', trendDirection: 'up', trendPercent: 3, sparkKind: 'progress',
    spark: [92],
  },
  {
    id: 'revenue', labelKey: 'kpi.revenue', value: 48200, format: 'currency', unitKey: 'unit.sar',
    tone: 'amber', icon: 'wallet', trendDirection: 'up', trendPercent: 8, sparkKind: 'line',
    spark: [28, 30, 27, 33, 31, 36, 34, 40, 44, 48],
  },
];

# Contract — Metric / Chart Guard

**Guarantee**: NO chart engine, NO `<canvas>`, NO computed score/rank/percentile/leaderboard; `sparkline.js` NOT repurposed as a metric.
- Allowed: authored counts (== row counts), categorical status/quality chips, authored literals, real links.
- Legacy Chart.js/ApexCharts/amCharts remain evidence only.
**Verify**: source grep (canvas|chart|apex|amcharts|d3|highcharts|recharts) over new modules = 0; smoke greps 029 bodies for `<canvas>`/chart/percentile = 0.
**Fail if**: any chart lib/canvas/computed metric appears.

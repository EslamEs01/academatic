# Contract — No Chart (Finance)

**Guarantee**: NO chart engine / `<canvas>` / library chart; `sparkline.js` NOT a finance metric.
- Legacy accounting ApexCharts + analysis Chart.js are evidence only.
- Accounting/analysis surfaces = status-first counts or planned gates (no plotting).
**Verify**: source grep `canvas|chart\.js|apexcharts|amcharts|d3|highcharts|recharts|getContext` over finance modules = 0; smoke: no `<canvas>`/chart in finance body; the existing finance `forbidden` regex byte-verbatim.
**Fail if**: any chart lib/canvas appears.

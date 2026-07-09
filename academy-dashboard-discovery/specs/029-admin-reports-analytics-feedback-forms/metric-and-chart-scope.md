# Spec 029 — Metric & Chart Scope

Defines what metrics 029 may display, what is forbidden, which controls are real, and which are gates. This
is the guardrail that keeps 029 honest given that **legacy used three chart engines and computed percentages**
on exactly these surfaces.

## Allowed authored display-only metrics

- **Authored counts** equal to their underlying authored row count (e.g. "12 feedback items", "8 forms",
  "3 categories"). Rendered via `summaryCards`/`kpiRow`/plain text. No runtime `reduce`/aggregation over a
  live dataset beyond counting authored fixture rows.
- **Categorical status/quality labels** (icon+text chips): Excellent / Very Good / Good / Acceptable / Needs
  Improvement; Always / Often / Sometimes / Rarely; active/incomplete/suspended/trial/inactive — all from the
  existing status-chip vocabularies.
- **Authored literal figures** that legacy showed as a number but the app treats as static (e.g. a "response
  count" on a form row) — clearly authored, never derived at runtime.
- **Real deep-links** to existing detail pages (attendance/sessions/course/group/student/family/teacher).

## Forbidden (hard stop)

- **Chart engine / library** of any kind (Chart.js, ApexCharts, amCharts, d3, Highcharts, Recharts) — legacy
  used the first three on `analysis-course`/`analysis-student`/`analysis-expenses`/`analysis-invoices`/
  `teacher-feedback`/`class-feedback`. 029 introduces NONE.
- **`<canvas>` chart / library `<svg>` chart / geo-map**.
- **Repurposing `sparkline.js`** (the hand-rolled inline-SVG progress bar/ring) as an analytics/feedback
  metric or "trend". It stays a decorative progress affordance only, per `028…performance-metric-scope.md:14`.
- **Computed score / rank / percentile / leaderboard** — the legacy feedback **Percentage** columns
  (`table-inventory.md:106-109,1271-1279`) and completion-rate **%** KPIs (`02-…:1511-1571`) MUST NOT be
  reproduced as computed values.
- **Runtime aggregation / math** producing a displayed figure (sum/avg/%/ratio over a live set).

## Percentage / feedback-score rule (explicit)

Legacy computed per-teacher %, per-category %, and completion-rate %. Because (a) the app forbids computed
metrics and (b) the underlying inputs are categorical (not numeric), 029:

- shows the **categorical remark/note/status** instead of a number, OR
- omits the number entirely, OR
- if a percentage is unavoidable for grounding fidelity, shows an **authored fixture literal** clearly marked
  display-only and never recomputed at runtime.

Smoke asserts no computed `%`/score/rank pattern appears in the 029 page bodies beyond authored literals.

## Which filters / tabs are real static

- **Real static filters** (`data-filter` via `filterBar`): report category/area/availability/status; feedback
  category/status; forms status. Client-side facet only.
- **Real static tabs** (`data-tab`): results/evaluation/outcomes panels; any feedback-type switcher.
- **NOT a real filter** (→ honest gate): any control that would require a server query (cross-period date
  search, "generate report for range", live analytics recompute) → `backendRequired`/planned gate.

## Which exports / reports are backendRequired gates

- Export CSV / Export PDF / Export Excel / Print / Share / Schedule-report / Generate-report → all
  `backendRequired`/planned gates (disabled-with-reason or a backendRequired modal). No file, no silent no-op.
- Teacher-performance export/print (028 T-L/T-print) → honest gate; board stays figure-free.

## Which finance/payroll metrics are owner-030

- Any revenue / profit / net-income / salary / staff-salary / expense / invoice-amount / paid / due / overdue
  / discount / payout / bonus / fine figure → **030**. These NEVER appear on a 029 body. See
  `finance-exclusion-register.md`.

## Enforcement

- Source grep (incl. comments) over new 029 modules/fixtures/locales: no chart/canvas/apex/d3/chart.js token;
  no computed-% helper.
- Built grep over 029 pages: no `<canvas>`; no chart lib; no derived `%`/score/rank.
- Smoke over rendered `#page-body`: no chart element; no percentile/leaderboard; no pay figure; authored
  counts only.

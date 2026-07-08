# Spec 030 — Amount & Calculation Scope

The guardrail that keeps finance honest given that legacy computed P&L, summed salaries, ran group-by/sum
reports, and used charts.

## Allowed authored static amounts

- **Invoice amount**: one authored per-invoice literal + unit (e.g. `1280 ريال`), admin-only, display-only.
  Spec-009-sanctioned. No balance/tax/discount computed from it.
- **Payment amount**: one authored per-payment literal + unit, display-only. No collected-total.
- **Expense value** (if the expense surface is built): one authored per-expense literal + currency. No expense
  total / income-vs-outcome aggregate.
- **Row counts**: counts of invoices/payments by status (the existing `FINANCE_SUMMARY` row-count roll-up). A
  count is not a money figure.

## Forbidden runtime calculations (hard stop)

- **No sum / total / balance / net** of any amount (invoice totals, payment balance, outstanding dues, net
  income, gross, profit/loss).
- **No aggregation engine** over the fixture rows for money (only `.filter().length` row counts are allowed).
- **No salary generation / payroll computation** (Fixed + plus − minus − Fine + Gift × Hour-Rate = Total).
- **No profit/loss / net income / revenue** computation (the accounting hub + analysis-expenses P&L).
- **No invoice balance / discount / fee / tax** computation (the create-parent-invoice line-item math).
- **No bank reconciliation / statement-matching** computation.
- **No group-by/sum** report (the salary-class-report engine).
- **No FX / currency conversion**.

## Forbidden figures (never displayed anywhere)

- **Salary / payroll / compensation / payout amount figures** — NEVER, even on admin finance pages. Salaries/
  staff-salaries/class-report/payouts are STATUS-FIRST and FIGURE-FREE.
- **Computed aggregates** — Total Income, Net Income, Total Expenses, summed salaries, invoice balance,
  paid/due/overdue money totals (row counts of paid/due/overdue statuses are allowed; money sums are not).

## Which displayed totals are authored literals only

- The only displayed money figures are the **per-invoice** and **per-payment** (and optionally per-expense)
  **single authored literals**. There is NO "grand total" / "sum" / "balance" line anywhere. If a legacy
  surface showed a total (e.g. invoice "Final Total Price", accounting "Net Income"), 030 either omits it or
  renders a status-first count — never a computed or even an authored "total" that implies a sum.

## Charts / metrics

- **No chart engine / `<canvas>` / library chart** (legacy ApexCharts on accounting; Chart.js on analysis-
  expenses/invoices are evidence only). No `sparkline.js` as a finance metric. Prefer table/card/status-chip.

## Smoke grep / calculation strategy

- **No-arithmetic grep** (source): `grep -RnE '\.reduce\(|\+=|\bSum\b|total\s*=|amount\s*[*+/-]|\* *[0-9]|/
  *(total|count)'` over the new/changed finance modules = 0 (row-count `.filter().length` excepted).
- **No-salary-figure grep** (rendered body, salaries/staff/payouts/class-report `#page-body`): the union pay
  regex (`راتب|رواتب|salary|salaries|payroll|payout|compensation|fine|gift|hour rate|أجر|مستحقات|غرامة|مكافأة`
  + a numeric-near-pay proximity) = 0.
- **No-aggregate grep** (finance `#page-body`): no "Net Income / Total Income / Total Expenses / صافي الدخل /
  إجمالي / الربح" money-total labels; row-count labels allowed.
- **No-chart grep** (finance bodies + source): `canvas|chart\.js|apexcharts|amcharts|d3|highcharts|recharts` = 0.
- **Keep byte-verbatim**: the existing Spec-009 finance `forbidden` regex (`chart|canvas|graph|score|rank|
  leaderboard|percentile`) and the no-mutation-on-confirm assertion.
- **Invoice/payment amount literals are allowed** — the pay grep for the salaries surfaces must be scoped so it
  does NOT flag the sanctioned invoice/payment amount literals on the invoice/payment surfaces (as the existing
  finance body already carries authored SAR amounts today under the Spec-009 sanction).

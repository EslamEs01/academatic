# Contract — Finance-Analysis Honest Lock / Deferred

**Decision:** **STAY LOCKED / DEFERRED** — no nav item, no route, no tab, no `#view=` is added in
Spec 038 for finance-flavoured "analysis" (legacy `management/analysis-expenses`,
`management/analysis-invoices`). Count 0. No body edit.

## State (grounded — nothing to unlock)
- **No `financeAnalysis`/`analysisExpenses`/`analysisInvoices` id exists anywhere in `nav.config.js`.**
  Confirmed by search — unlike `salaries`/`classSalaryReport`, there is no locked nav item to flip; this
  surface has zero nav representation today.
- The only "analysis"-named nav item is `dataAnalysis` (`nav.config.js:74`,
  `reports.html#view=analysis`) — the Spec-037 display-only reports tab, which is explicitly NOT this
  surface (Spec-037's `future-owner-register.md` hands finance-flavoured analysis to Spec 038 precisely
  to keep the reports body finance-free FOREVER, per the Spec-009 invariant).
- Sole existing representation: the `accountingExpenses` planned card
  (`fixtures/finance.js:101`, `availability:'backendRequired'`), one of the 9 cards in
  `plannedSection()`.

## Why (grounded)
Both legacy pages are, at their core, computed financial-aggregate dashboards:
- `analysis-expenses` = P&L: Expected/Actual Revenue, Expected/Actual Net Profit, Teachers Salaries,
  Staff Salaries, Total Expenses — every field is a sum, a difference, or a salary figure, plus
  `Chart.js` canvases (`actualMonthlyChart`/`currentMonthChart`/`expectedMonthlyChart`).
- `analysis-invoices` = Paid/Due/Overdue totals + Total Before/After Discount + two charts
  (`cumulativeChart`/`monthlyChart`). The per-status COUNT is the one honest slice, and it is ALREADY
  shown (`FINANCE_SUMMARY.invoices.{paid,unpaid,overdue,cancelled}` row-count tiles in the Overview tab)
  — the totals/discount amounts and both charts are forbidden.

There is no version of "analysis" that keeps the name's promise without computing an aggregate or
drawing a chart — both are standing, spec-independent prohibitions.

## Owner
Future backend billing/accounting spec. Introducing ANY new surface here — even a categorical one —
reopens a page whose legacy identity is "financial analysis," risking scope creep toward the very
totals/charts this law forbids.

## Must NOT
- ❌ No new nav item, route, `#view=`, tab, or panel for finance-analysis, on `finance.html` or
  `reports.html`.
- ❌ No computed profit/loss/net-income/revenue/expense-total/VAT/tax figure of any kind, anywhere.
- ❌ No chart/`<canvas>`/Chart.js or equivalent plotting surface.
- ❌ No invoice discount amount, before/after total, or money SUM extending the existing row-count
  tiles.
- ❌ No fold into `reports.html` (would violate the Spec-009/037 reports-finance-free invariant).

## Smoke / a11y
- No `lockedFin` change (no nav item exists to unlock or keep locked).
- Re-confirm `plannedN === 9` and the existing `forbidden` money/chart regex on `finance.html` (and the
  reports finance-free regex on `reports.html`) stay green, byte-verbatim.
- No new a11y surface.

## Acceptance
- Count 115 unchanged; admin-menu 50 unchanged.
- `finance.html`/`.en` bodies byte-identical for this scope item (0 change).
- `reports.html`/`.en` bodies byte-identical (Spec-009/037 invariant re-affirmed, not touched).
- `plannedN === 9` held; 0 computed money/chart token anywhere, both languages.

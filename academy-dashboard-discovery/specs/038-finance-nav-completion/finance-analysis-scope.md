# Scope — finance-flavoured "analysis" (legacy `analysis-expenses` / `analysis-invoices`)

## Current state (grounded)
- **No dedicated nav item exists for this today.** There is no `financeAnalysis`/`analysisExpenses`/`analysisInvoices` id anywhere in `app/src/js/nav.config.js` — confirmed by search. The only "analysis"-named nav item is `dataAnalysis` (`nav.config.js:74`, `reports.html#view=analysis`), which is the Spec-037 **reports** display-only tab and is explicitly NOT this surface (see below).
- `specs/037-reports-analytics-nav-completion/future-owner-register.md:16` records: *"Finance-flavoured 'analysis' (`analysis-expenses`, `analysis-invoices`, `monthly-invoices` legacy pages) — Not surfaced anywhere — Explicitly excluded from `reports.html#view=analysis` to keep the reports body finance-free FOREVER (Spec-009 invariant) — never folded into reports; any future surface is a finance-owned page/tab — **Spec 038**."* This is the direct handoff into this scope file.
- The only existing representation is the `accountingExpenses` planned card: `app/src/js/fixtures/finance.js:101` — `{ id: 'accountingExpenses', availability: 'backendRequired', titleKey: 'fin.planned.accountingExpenses.title', descKey: 'fin.planned.accountingExpenses.desc', icon: 'grid', tone: 'muted' }`, one of the 9 cards in `plannedSection()`.
- Legacy grounding (money-heavy, Chart.js-driven): `specs/029-.../visual-grounding.md:26-27` — `management-analysis-expenses.html` has canvases `actualMonthlyChart`/`currentMonthChart`/`expectedMonthlyChart` + `chart.js`; `management-analysis-invoices.html` has canvases `cumulativeChart`/`monthlyChart` + `chart.js`. `specs/029-.../finance-exclusion-register.md:9-10` lists the legacy fields: Expected/Actual Revenue, Expected/Actual Net Profit, Teachers Salaries, Staff Salaries, Total Expenses (analysis-expenses); Paid/Due/Overdue, Total Before/After Discount, Discount amount (analysis-invoices).

## Why this cannot be shown honestly
Both legacy pages are, at their core, computed financial-aggregate dashboards:
- `analysis-expenses` = P&L: revenue, net profit, salary totals, expense totals — every field is either a sum, a difference, or a salary figure. Forbidden three ways at once (no computed aggregate, no salary/payout figure, no chart).
- `analysis-invoices` = paid/due/overdue **totals + discount amounts** + two charts (cumulative, monthly). The per-status **counts** are the one part that could legitimately be shown (the finance Overview tab already does this — `FINANCE_SUMMARY.invoices.{paid,unpaid,overdue,cancelled}` row-counts, `finance.js:66-73`), but the totals/discount amounts and both charts are forbidden.

There is no version of "analysis" that keeps the name's promise (financial analysis) without either computing something or displaying a chart — both are standing prohibitions independent of this spec.

## Decision (recommended — record for `/speckit.plan`)
**Stay locked / deferred.** Do not create a nav item, route, tab, or `#view=` for finance-analysis in Spec 038. The existing `accountingExpenses` planned card already communicates this honestly ("requires the real accounting backend"), and the Spec-037 handoff explicitly kept it out of `reports.html` to protect the reports-finance-free invariant. Introducing ANY new surface here — even a categorical one — reopens a page whose legacy identity is "financial analysis," inviting scope creep toward the very totals/charts this law forbids. The safest and most honest choice is to leave it exactly where Spec 030/037 left it: a single `backendRequired` planned card, no nav item, no page.

## If a display is ever attempted (fallback only — not recommended for 038)
Any surface must be:
- **Figure-free categorical only**: expense CATEGORY names (e.g. rent, utilities, materials — labels only) + a status chip (e.g. `recorded`/`pending`), NO amount column, NO total row.
- **No chart/canvas** of any kind (cumulative, monthly, or otherwise) — the legacy `chart.js` dependency and all three/two canvases are explicitly excluded, matching the sitewide "no plotting library" constraint.
- **No discount, no before/after totals, no paid/due/overdue SUMS** (the existing invoice-status TILE counts in Overview already cover the honest row-count version of "paid/due/overdue" — do not duplicate or extend that into a money total).
- Route, if ever built: `finance.html#view=analysis` or `finance.html#view=expenses` — but this is explicitly NOT part of the Spec 038 baseline recommendation.

## Route
None (recommended). No nav item is added; no `#view=` is created.

## Display sections
None — the `accountingExpenses` planned card (title + description + `backendRequired` gate) stands as the entire representation.

## Allowed authored data
None new. No fixture rows, no locale keys beyond what already exists for the planned card.

## Forbidden
- Computed profit/loss/net-income/revenue/expense-total/VAT/tax figure of any kind.
- Any chart/`<canvas>`/Chart.js or equivalent plotting surface.
- Invoice discount amounts, before/after totals, or any money SUM (row-count-only tiles already exist in Overview — do not extend them into totals).
- Salary/payout/compensation figures (the same standing law as `salaries-scope.md`/`class-salary-report-scope.md`).
- Folding this into `reports.html` (would violate the Spec-009 reports-finance-free invariant that Spec 037 explicitly preserved).

## Gated finals
None new. The existing `accountingExpenses` card's `backendRequired` availability (rendered via `plannedCard()` → `fin.reason.backend`) is the entire gate surface.

## Smoke / a11y scope
- No `lockedFin` change (no nav item exists to unlock).
- No new smoke assertions required beyond re-confirming `plannedN === 9` and the existing `forbidden` money-regex checks on `finance.html` stay green (byte-verbatim).
- No new a11y surface.

## Acceptance
- Count 115 unchanged; admin-menu 50 unchanged; `finance.html`/`.en` bodies byte-identical (0 change from this scope item).
- `plannedN === 9` held.
- Reports body stays finance-free FOREVER (Spec-009 invariant, re-affirmed, not touched by this spec).

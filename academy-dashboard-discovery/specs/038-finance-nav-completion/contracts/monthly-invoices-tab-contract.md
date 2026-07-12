# Contract — monthlyInvoices Tab

**Decision:** a display tab folded into `finance.html` → `finance.html#view=monthly-invoices`
(+ `.en`). Count impact **0** — a planned-card→tab promotion, the SAME kind of promotion Spec 036
did for `sessionsKpi`/`monthlyPerf` and Spec 037 did for `monthlyReports`/`dataAnalysis`.

## Mechanism
- Extend the `tabs({ group: 'finance', items, panels })` call in `renderFinance()` with a
  `{ id: 'monthly-invoices', labelKey: 'fin.tab.monthlyInvoices', icon: 'calendar' }` item and a
  new panel `monthlyInvoicesTab()`. `enhance.js`'s existing `#view=` deep-link opener activates
  the tab on fresh load — no new hook, `enhance.js` 0-diff.
- Nav: `nav.config.js` `monthlyInvoices` item `status:'disabled'`, `reasonKey:'nav.reason.finance'`
  → `status:'implemented'` (drop `status`/`reasonKey`), `route:'finance.html#view=monthly-invoices'`.
- **The `PLANNED_FINANCE` card stays.** `fixtures/finance.js`'s `monthlyInvoices` planned-card
  entry (`availability:'planned'`, the real bulk invoice-GENERATION engine) is explicitly KEPT —
  a genuinely different capability from this tab's read-only grouped display of the 9 EXISTING
  authored invoices. `plannedN===9` (Spec 030/032/037 precedent) is **preserved byte-verbatim**;
  this file does not remove or repoint that card. The new tab never claims to be the generation
  engine.

## Must render (display-only)
- In-tab section title + muted sub line, new copy `fin.sec.monthlyInvoices`/
  `fin.sec.monthlyInvoicesSub` clarifying this is a grouped VIEW of existing invoices, distinct
  from the `fin.planned.monthlyInvoices` generation gate on the Overview tab.
- **Default mechanism: display-only, no `filterBar()`** — the 4 authored `monthKey` values
  (april/may/june/july, sourced from the CLOSED set already present on `INVOICES.rows`) each
  rendered as an `<h3>` group heading (`t(monthKey)`) followed by that month's `INVOICES.rows`
  subset, filtered at BUILD time (`INVOICES.rows.filter((r) => r.monthKey === monthKey)`) — not
  computed/aggregated. Each row reuses the existing `invoiceRow()` fields (serial/family/course/
  amount-literal/status chip), matching the Invoices tab.
  - A `filterBar()` scoped to this tab's OWN container (e.g. `#monthly-invoice-groups`, single
    `month` facet, `facetAttrs({ month: inv.monthKey })`) MAY be added ONLY if `enhance.js` is
    confirmed to support multiple independent `[data-filter-form]`+`noResults()` pairs on one
    page without colliding on the single global `[data-no-results]` target. **Absent that
    confirmation, the display-only grouped board (no filter) is the required fallback.**
- **Per-group count only**: each month heading MAY show a `(N)` row-count literal (the
  `FINANCE_SUMMARY`/`OUTCOME_SUMMARY` row-count precedent) — a COUNT, never a money SUM.
- Rows open the SAME baked `inv-<id>` `previewTemplate()` drawers already rendered once in
  `renderFinance()` — no second copy of the 9 drawer templates.

## Must NOT
- **NO computed monthly total/subtotal/sum** — grouping by month must never introduce a
  `reduce((sum, r) => sum + r.amount, 0)`-style aggregate anywhere (renderer or fixture layer).
- No per-month amount SUM, no running/cumulative cross-month balance, no month-over-month
  percentage/trend/comparison figure.
- No fake bulk "Generate this month's invoices" success — that action stays the EXISTING
  `fin.planned.monthlyInvoices` `planned` gate on the Overview tab, unchanged.
- No fake Export/PDF/Send success toast; no row/status mutation.
- No new `INVOICES` fixture rows/fields, no new month invented; no backend/API/websocket call; no
  `<canvas>`/chart.
- **Never reuse `.fin-row` / `#invoice-list` / `.fin-pay-row` / `.fin-tile` / `.report-card`** —
  this tab's own containers use NEW classes/id (`.finm-*`, `#fin-monthly`) so the existing
  page-wide/id-scoped byte-verbatim asserts (`#invoice-list`=9, `.fin-pay-row`=6, `.fin-tile`=4,
  `.report-card`=9) are never at risk of double-counting this tab's rows.

## Final gated actions
- Any Generate / Send / PDF / Export control on this tab is a `data-disabled-reason`
  `backendRequired` gate, reusing `fin.reason.backend` / `fin.reason.export` / `fin.reason.send` —
  identical honesty class to the Overview tab's `plannedCard()` gate for the same `monthlyInvoices`
  capability. No new reason copy invented if the existing keys already fit.

## Fixture / locale plan
- **0-diff to `fixtures/finance.js`** — no new fixture file, no new `INVOICES` rows/fields;
  `PLANNED_FINANCE`'s `monthlyInvoices` entry untouched (kept).
- New locale keys `fin.tab.monthlyInvoices`, `fin.sec.monthlyInvoices`,
  `fin.sec.monthlyInvoicesSub` (+ `fin.filter.month`/`fin.filter.allMonths` ONLY if the optional
  filter path is taken) — mirrored `ar.fin.js`/`en.fin.js`, 0 divergence AR/EN.

## Acceptance (smoke)
- `finance.html#view=monthly-invoices` / `.en` opens the tab on fresh load; all **9** invoices
  appear exactly once across the 4 month groups (9 = sum of group ROW counts, verified as a
  count check only — never a money check).
- The Overview tab's `plannedN===9` assert (including the kept `monthlyInvoices` planned card)
  stays byte-verbatim.
- 0 computed monthly-total token anywhere in the tab; 0 fake-success toast on
  Generate/Send/PDF/Export; 0 new `.fin-row`/`#invoice-list`/`.fin-pay-row`/`.fin-tile`/
  `.report-card` element introduced by this tab.
- Admin-menu stays 50; route/page count stays 115; a11y critical=0 serious=0 (light/dark/
  mobile-390); existing finance/payHit/famPay/child-view/Spec 026-037 asserts stay byte-verbatim.

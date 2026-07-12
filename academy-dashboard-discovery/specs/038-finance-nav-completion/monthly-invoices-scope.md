# Monthly Invoices — Scope (Spec 038)

## Tab decision
- Route: `finance.html#view=monthly-invoices` (and the EN mirror
  `finance.en.html#view=monthly-invoices`).
- Page-count impact: **0 new pages**; count HELD 115 → 115. `monthlyInvoices` is promoted from a
  figure-free `planned` CARD (inside the Overview tab's `plannedSection()` /
  `PLANNED_FINANCE` list) to a display tab folded into `finance.html` — the SAME kind of
  planned-card→tab promotion Spec 036 did for `sessionsKpi`/`monthlyPerf` and Spec 037 did for
  `monthlyReports`/`dataAnalysis`.
- Mechanism: extend the `tabs({ group: 'finance', items, panels })` call in `renderFinance()`
  with a `{ id: 'monthly-invoices', labelKey: 'fin.tab.monthlyInvoices', icon: 'calendar' }` item
  and panel `monthlyInvoicesTab()`. `enhance.js`'s existing `#view=` deep-link opener activates the
  tab on fresh load — no new hook, `enhance.js` 0-diff.
- Nav flip: `nav.config.js` — the `monthlyInvoices` item (`cat.finance` sub-section, line ~86)
  currently `status: 'disabled', reasonKey: 'nav.reason.finance'` (no route) → `status:
  'implemented'` (drop `status`/`reasonKey`), `route: 'finance.html#view=monthly-invoices'`.
- **`PLANNED_FINANCE` card stays.** The `monthlyInvoices` entry in `fixtures/finance.js`'s
  `PLANNED_FINANCE` array (id `monthlyInvoices`, `availability: 'planned'`) is explicitly KEPT —
  it represents the real backend invoice-generation ENGINE (bulk-generate monthly invoices for
  every family), which is a genuinely different capability from this tab's read-only grouped
  display of the 9 EXISTING authored invoices. The `plannedN===9` smoke assert (Spec 030/032/037
  precedent) is PRESERVED unchanged — this file does not remove or repoint that card. The new tab
  is purely an ADDITIVE display view; it does not claim to be the generation engine.

## Display sections (all authored, display-only)
1. **Tab header** — reuse the existing `section-title` + muted `<p>` sub pattern; new copy
   `fin.tab.monthlyInvoices` (tab label) + `fin.sec.monthlyInvoices`/`fin.sec.monthlyInvoicesSub`
   (panel header), explaining this is a grouped view of the existing invoices, not the generation
   engine (which stays the `fin.planned.monthlyInvoices` gate on the Overview tab).
2. **Month filter** — a `filterBar()` select, `targetId` pointed at this tab's OWN row container
   (e.g. `#monthly-invoice-groups`), single `month` facet sourced from the CLOSED set of
   `monthKey` values already present on `INVOICES.rows` (`data.fin.month.april/may/june/july` — 4
   authored months, no live calendar/date-math, no new month invented). This is the tab's only
   filter surface; reuse `facetAttrs({ month: inv.monthKey })` per group/row, matching the
   established `status`/`family` facet pattern in `invoiceSection()`. `noResults()` is added for
   this tab's empty-filter state — this is the SECOND `[data-filter-form]`+`noResults()` pair
   introduced by Spec 038 as a whole (the first being an explicit decision NOT to add one on the
   Invoices tab, and NOT one on Payments/Banks) — confirm with whoever owns `enhance.js` that
   multiple independent filter-form/noResults pairs on one page are already supported (the Spec
   030 Overview tab + Spec 038 Invoices/Payments/Banks/Monthly-Invoices tabs must not collide on
   the SAME `[data-no-results]` target id; each filter form's `noResults()` must bind to its own
   `targetId`). If `enhance.js`'s `[data-no-results]` wiring is confirmed to be GLOBAL (one
   listener, not scoped per target), this tab MUST fall back to a display-only, non-filtering
   month-GROUPED board instead (no `filterBar()`) — the same fallback the Invoices-tab scope
   chose. **Default to the safe fallback (display-only, grouped-by-month, no filter) unless
   `enhance.js` is confirmed to support multiple independent filter/noResults pairs — do not risk
   the single global `[data-no-results]` constraint.**
3. **Month groups** — the 4 authored `monthKey` values (april/may/june/july) each rendered as a
   `<h3>` group heading (reusing `t(monthKey)`) followed by a `cardGrid()`/list of that month's
   `INVOICES.rows` subset — same `invoiceRow()` fields (serial/family/course/amount-literal/status
   chip) as the Invoices tab, filtered by `monthKey` at BUILD time (`INVOICES.rows.filter((r) =>
   r.monthKey === monthKey)`), not computed/aggregated.
4. **Per-group count only** — each month heading MAY show a `(N)` row-count literal (the
   `OUTCOME_SUMMARY`/`FINANCE_SUMMARY` row-count precedent — e.g. `${rows.length}`) — this is a
   COUNT, never a money SUM. No "Month total: X SAR" anywhere.
5. **Detail drawer** — reuse the EXISTING baked `inv-<id>` `previewTemplate()` drawers (same as
   the Invoices tab) — no second copy of the 9 templates.

## Allowed authored data
- The EXISTING 9 `INVOICES.rows`, grouped by their EXISTING `monthKey` field (no new fixture rows,
  no new months). Per-row `amount` LITERALS allowed (Spec-009-sanctioned). Per-GROUP row COUNT
  literals allowed (never a money sum).
- Explicitly **forbidden as data**: a per-month amount SUM/subtotal, a running/cumulative balance
  across months, any month-over-month percentage/trend/comparison figure.

## Forbidden behavior
- **NO computed monthly total/subtotal/sum** — grouping by month must never introduce a
  `reduce((sum, r) => sum + r.amount, 0)`-style aggregate anywhere in this tab's renderer or
  fixture layer.
- No fake bulk "Generate this month's invoices" success — that action stays the EXISTING
  `fin.planned.monthlyInvoices` `planned` gate on the Overview tab (unchanged); if a
  Generate/Send/PDF control is ALSO surfaced on this new tab for convenience, it MUST be the same
  honest `data-disabled-reason` gate, never a second, softer affordance.
- No fake Export/PDF/Send success toast.
- No row/status mutation.
- No backend/API/websocket call, no chart/canvas.

## Final gated actions
- Any Generate / Send / PDF / Export control on this tab is a `data-disabled-reason`
  `backendRequired` gate, reusing `fin.reason.backend` / `fin.reason.export` / `fin.reason.send` —
  identical honesty class to the Overview tab's `plannedCard()` gate for the same `monthlyInvoices`
  capability. No new reason copy invented if the existing keys already fit.

## Fixture plan
- **No new fixture file and no new `INVOICES` rows/fields.** The tab groups the EXISTING 9 rows by
  the EXISTING `monthKey` field — `fixtures/finance.js` stays 0-diff (import-only from
  `pages/finance.js`). `PLANNED_FINANCE`'s `monthlyInvoices` entry is untouched (kept).
- Locale: new keys `fin.tab.monthlyInvoices`, `fin.sec.monthlyInvoices`,
  `fin.sec.monthlyInvoicesSub`, and (if the safe display-only fallback is taken, no filter keys
  needed; if the filter path is used) `fin.filter.month`/`fin.filter.allMonths` — mirrored
  `ar.fin.js`/`en.fin.js`, extending the existing `fin.tab`/`fin.sec`/`fin.filter` blocks. 0
  divergence between AR and EN.

## Smoke / a11y / screenshot scope
- Smoke: `finance.html#view=monthly-invoices` and `finance.en.html#view=monthly-invoices`
  deep-links open the tab on fresh load; all 9 invoices appear exactly once across the 4 month
  groups (9 = sum of group counts, verified as a row-count check only — not a money check); the
  Overview tab's `plannedN===9` assert (including the kept `monthlyInvoices` planned card) stays
  byte-verbatim; 0 computed monthly-total token anywhere in the tab; 0 fake-success toast on
  Generate/Send/PDF/Export. Admin-menu stays 50; route/page count stays 115. Re-pin all existing
  finance/payHit/famPay/child-view/Spec 026-037 asserts byte-verbatim.
- a11y: critical=0 serious=0 on the tab, light + dark + mobile-390.
- Screenshots: Monthly Invoices tab AR, EN, dark, mobile-390 — 0 console errors.

## Acceptance checks
- [ ] `nav.config.js` `monthlyInvoices` item: `disabled` → `implemented`, `route:
      'finance.html#view=monthly-invoices'`, no `reasonKey`.
- [ ] `finance.js` `tabs()` call gains a `monthly-invoices` item + panel; overview (incl. its
      `PLANNED_FINANCE` card) /salaries/banks/invoices/payments panels byte-unchanged.
- [ ] `PLANNED_FINANCE`'s `monthlyInvoices` planned card is KEPT — `plannedN===9` unchanged.
- [ ] 0 new HTML pages; 0 new `INVOICES` fixture rows; 0 new `data-*` hooks; `enhance.js` 0-diff.
- [ ] 0 computed money aggregate (per-row literals + per-group COUNTS only) anywhere in the tab.
- [ ] Admin-menu 50 items; route/page count 115; smoke green.

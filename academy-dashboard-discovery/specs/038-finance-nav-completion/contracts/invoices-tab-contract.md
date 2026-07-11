# Contract — invoices Tab

**Decision:** a display tab folded into `finance.html` → `finance.html#view=invoices` (+
`.en`). Count impact **0** (fold-anchor, mirrors the Spec 035/036/037 fold precedent —
`familyCategories` → `families.html`, `sessionsKpi`/`monthlyPerf` → `teacher-performance.html`,
`monthlyReports`/`dataAnalysis` → `reports.html`).

## Mechanism
- Extend the existing `tabs({ group: 'finance', items, panels })` call in `renderFinance()`
  (`pages/finance.js`) with a fourth item `{ id: 'invoices', labelKey: 'fin.tab.invoices', icon:
  'file-text' }` and a new panel `invoicesTab()`. `enhance.js`'s existing `#view=` deep-link
  opener (proven by Specs 035/036/037) activates the tab on fresh load — no new hook,
  `enhance.js` 0-diff.
- Nav: `nav.config.js` `invoices` item (`cat.finance` sub-section) `status:'disabled'`,
  `reasonKey:'nav.reason.finance'` → `status:'implemented'` (drop `status`/`reasonKey`),
  `route:'finance.html#view=invoices'`. `salaries`/`staffSalaries`/`classSalaryReport` are out of
  scope for this file (untouched).
- **MOVE, do not duplicate (authoritative — matches `page-count-contract.md` + `plan.md`):** the
  existing `invoiceSection()` (4 status tiles + `filterBar` + the single `#invoice-list` with 9
  `.fin-row [data-row]`) is **RELOCATED** from the Overview tab into this `#view=invoices` tab.
  Overview **no longer renders the invoice list/tiles** (it keeps `financeActions()` + the 9
  planned `.report-card`s + the 9 baked `inv-<id>` drawers). There is exactly ONE `#invoice-list`
  (now here) — **duplicating it in Overview is forbidden** (would make `.fin-row`/`#invoice-list`
  counts 18 and break the byte-verbatim 9-invoice assert). The 9 `inv-<id>` drawer templates are
  baked **once** on the page (Overview or here) and cloned by `data-drawer` from any tab.

## Must render (display-only)
- In-tab section title + muted sub line (reuse the existing `section-title` pattern; no duplicate
  top-level `pageHeader()`).
- One row per authored `INVOICES.rows` entry, reusing the EXISTING `invoiceRow()` renderer
  verbatim (imported/called from the new tab function, not re-implemented): `serial` (LTR
  tabular), family name (linked to `family.html`), course/group chip (linked), `monthKey` label,
  `dueISO` date, `amount` + `unitKey` (SAR) literal, `invoiceStatusChip(statusId)`.
- Rows open the SAME baked `data-drawer="inv-<id>"` templates already rendered once in
  `renderFinance()` — no second copy of the 9 `previewTemplate()` drawers.
- **Filter surface: display-only, no new `filterBar()`/`noResults()` pair on this tab** (the
  single global `[data-no-results]` constraint — the Overview tab's `#invoice-list` filter stays
  the sole interactive filter surface). Order rows by `dueISO` ascending; status is shown via the
  per-row chip, not a second filter.

## Must NOT
- **NO computed total/subtotal/outstanding/balance/net/due-sum/profit/loss/revenue/VAT/tax** —
  never sum, average, or aggregate the 9 `amount` literals.
- No new `#invoice-list`-shaped `[data-filter-form]`/`noResults()` pair (0 second filter/noResults
  instance on this tab).
- No fake Create/Generate/PDF/Send/Export success toast.
- No fake Mark-as-paid / status mutation — the chip never flips on click.
- No new invoice fixture rows/fields; `fixtures/finance.js` stays import-only, 0-diff.
- No backend/API/websocket call of any kind.

## Final gated actions
- Any Create-invoice / Generate / PDF / Send / Export control on this tab is a
  `data-disabled-reason` `backendRequired` gate, reusing the EXISTING `fin.reason.backend` /
  `fin.reason.export` / `fin.reason.send` keys — same honesty class as `financeActions()` /
  `invoiceDrawerActions()` on the Overview tab. Record-payment/Mark-as-paid, if surfaced, reuse the
  EXISTING status-gated confirm→toast pattern (no mutation) rather than inventing new UI.

## Fixture / locale plan
- **0-diff to `fixtures/finance.js`** — no new fixture file, no new `INVOICES` rows.
- One new locale key `fin.tab.invoices` (mirrored `ar.fin.js`/`en.fin.js`, extending the existing
  `fin.tab` block); reuse `fin.sec.invoices`/`fin.sec.invoicesSub` verbatim for the panel header
  copy — 0 divergence AR/EN.

## Acceptance (smoke)
- `finance.html#view=invoices` / `.en` opens the Invoices tab on fresh load (no click needed).
- The tab renders exactly **9** rows (re-pin the existing 9-invoice assert against this tab too);
  every `inv-<id>` drawer opens from both the Overview list AND the Invoices tab.
- 0 computed-total/balance token in the tab; 0 fake-success toast on Create/Generate/PDF/Send.
- Admin-menu stays 50; route/page count stays 115; a11y critical=0 serious=0 (light/dark/
  mobile-390); existing finance/payHit/famPay/child-view/Spec 026-037 asserts stay byte-verbatim.

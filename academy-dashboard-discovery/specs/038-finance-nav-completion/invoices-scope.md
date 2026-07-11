# Invoices — Scope (Spec 038)

## Tab decision
- Route: `finance.html#view=invoices` (and the EN mirror `finance.en.html#view=invoices`).
- Page-count impact: **0 new pages**; count HELD 115 → 115. `invoices` folds into the existing
  `finance.html` Spec-030 tabbed hub as a fourth sibling tab, exactly like the Spec 035/036/037
  fold-anchor precedent (`familyCategories` → `families.html`, `sessionsKpi`/`monthlyPerf` →
  `teacher-performance.html`, `monthlyReports`/`dataAnalysis` → `reports.html`).
- Mechanism: extend the existing `tabs({ group: 'finance', items, panels })` call in
  `renderFinance()` (`pages/finance.js`) with a fourth item `{ id: 'invoices', labelKey:
  'fin.tab.invoices', icon: 'file-text' }` and panel `invoicesTab()`. The current **overview** tab
  keeps its own invoice list (tiles + `filterBar` + `#invoice-list` + payments + the 9 planned
  cards) UNCHANGED — the new Invoices tab is an ADDITIVE, focused surface over the SAME 9 authored
  `INVOICES.rows`, not a replacement. `enhance.js`'s existing `#view=` deep-link opener (proven by
  Specs 035/036/037) activates the Invoices tab on fresh load — no new hook, `enhance.js` 0-diff.
- Nav flip: `nav.config.js` — the `invoices` item (`cat.finance` sub-section, line ~85) currently
  `status: 'disabled', reasonKey: 'nav.reason.finance'` (no route) → `status: 'implemented'`
  (drop `status`/`reasonKey`, default is `implemented` per the `item()` helper), `route:
  'finance.html#view=invoices'`. This is the ONE nav item this scope unlocks; `salaries`/
  `staffSalaries`/`classSalaryReport` stay `disabled` (out of scope — reserved for a future
  Spec-038-sibling or later spec, NOT touched here). No `FUTURE_ROUTES` entry exists for
  `invoices` today, so nothing to trim there.

## Display sections (all authored, display-only)
1. **Tab header** — reuse the existing `section-title` + muted `<p>` sub pattern already used by
   `invoiceSection()`/`salariesSection()`/`banksSection()`; no duplicate top-level `pageHeader()`
   call (the page already has one for `finPage.title`).
2. **Status filter** — REUSE the existing invoice status filter mechanism: either point a second
   `filterBar()` at a NEW `#invoice-list-2` target scoped to this tab's own row container, OR (the
   simpler, single-filter-surface option) render the tab as a **read-only, unfiltered** grid and
   let the Overview tab's existing filtered list remain the one interactive filter surface. Given
   the single global `[data-no-results]` constraint (`enhance.js` binds exactly one `noResults()`
   listener target per filter form), the RECOMMENDED approach is: the Invoices tab reuses the SAME
   `#invoice-list` DOM id is NOT possible (duplicate ids), so this tab must either (a) be
   display-only with no filter (preferred — zero risk to the constraint), or (b) if a filter is
   truly wanted, it must be the ONLY `[data-filter-form]`+`noResults()` pair added and the Overview
   tab's existing one must stay the sole other instance — do not add a THIRD. **Decision: (a)
   display-only grid, ordered by `dueISO` ascending, with a lightweight non-filtering status-tone
   grouping (status chip on each row) — no new `filterBar()`/`noResults()` instance on this tab.**
3. **Invoice cards/rows** — one row per authored `INVOICES.rows` entry: `serial` (LTR tabular),
   family name (linked to `family.html`), course/group chip (linked), `monthKey` label, `dueISO`
   date, `amount` + `unitKey` (SAR) literal, and `invoiceStatusChip(statusId)`. Reuse the existing
   `invoiceRow()` renderer verbatim (import/call it from the new tab function) rather than
   duplicating markup — the SAME 9 rows, SAME chip vocabulary, SAME family/course/group links.
4. **Detail drawer** — reuse the EXISTING baked `previewTemplate('inv-' + id, …)` drawers already
   rendered once per invoice in `renderFinance()` (`INVOICES.rows.map(invoiceDrawer)`); the
   Invoices-tab rows open the SAME `data-drawer="inv-<id>"` targets — do NOT bake a second copy of
   the 9 drawer templates (duplicate `id` attributes are forbidden in HTML).

## Allowed authored data
- The EXISTING 9 `INVOICES.rows` fields only: `serial`, `familyId`, `studentIds`, `courseId`,
  `groupId`, `monthKey`, `issuedISO`, `dueISO`, `amount` (SAR literal), `statusId`
  (paid/unpaid/overdue/cancelled), `unitKey`, optional `noteKey`. No new invoice fixture rows, no
  new fields.
- Per-row `amount` LITERALS are Spec-009-sanctioned demo data — allowed as-is (already shipped).

## Forbidden behavior
- **NO computed total/subtotal/outstanding/balance/net/due-sum/profit/loss/revenue/VAT/tax** —
  this tab must never sum, average, or aggregate the 9 `amount` literals in any way (no "Total
  outstanding: X SAR" tile, no running balance column).
- No fake Create/Generate/PDF/Send/Export success toast.
- No fake Mark-as-paid / status mutation (chip never flips on click; matches the existing
  `invoiceDrawerActions`/`invoiceRowActions` status-gated-confirm pattern, which only fires a
  "pending backend" toast, never a persisted change).
- No new `#invoice-list`-shaped `[data-filter-form]`/`noResults()` pair (single global
  `[data-no-results]` contract — `enhance.js` stays 0-diff).
- No backend/API/websocket call of any kind.

## Final gated actions
- Any Create-invoice / Generate / PDF / Send / Export control surfaced on this tab is a
  `data-disabled-reason` `backendRequired` gate, reusing the EXISTING `fin.reason.backend` /
  `fin.reason.export` / `fin.reason.send` keys — identical honesty class to `financeActions()` and
  `invoiceDrawerActions()` on the Overview tab. Record-payment / Mark-as-paid stay the EXISTING
  status-gated confirm→toast pattern (no mutation) if surfaced on the row — or simply reuse the
  drawer's existing action cluster and omit a duplicate row-level action to avoid inventing new UI.

## Fixture plan
- **No new fixture file and no new `INVOICES` rows.** This tab is a pure display re-composition of
  `fixtures/finance.js`'s existing 9-row `INVOICES.rows` — the module stays import-only from
  `pages/finance.js`, 0-diff to `fixtures/finance.js`.
- Locale: one new key `fin.tab.invoices` (mirrored `ar.fin.js`/`en.fin.js`, extending the existing
  `fin.tab` block that already holds `overview`/`salaries`/`banks`/`aria`) + an optional
  `fin.sec.invoicesTab`/`fin.sec.invoicesTabSub` pair if a distinct header copy is wanted (may also
  reuse the existing `fin.sec.invoices`/`fin.sec.invoicesSub` strings verbatim to avoid adding
  keys) — 0 divergence between AR and EN.

## Smoke / a11y / screenshot scope
- Smoke: `finance.html#view=invoices` and `finance.en.html#view=invoices` deep-links open the
  Invoices tab on fresh load (no click needed); the tab renders exactly 9 rows (re-pin the
  existing 9-invoice assert against this tab too); every `inv-<id>` drawer opens from both the
  Overview list AND the Invoices tab; 0 computed-total/balance token in the tab; 0 fake-success
  toast on Create/Generate/PDF/Send. Admin-menu stays 50; route/page count stays 115. Re-pin all
  existing finance/payHit/famPay/child-view/Spec 026-037 asserts byte-verbatim.
- a11y: critical=0 serious=0 on the Invoices tab, light + dark + mobile-390, tab-panel
  keyboard/focus behavior consistent with the existing `tabs()` widget.
- Screenshots: Invoices tab AR, EN, dark, mobile-390, one open drawer — 0 console errors.

## Acceptance checks
- [ ] `nav.config.js` `invoices` item: `disabled` → `implemented`, `route:
      'finance.html#view=invoices'`, no `reasonKey`.
- [ ] `finance.js` `tabs()` call gains a 4th `invoices` item + panel; overview/salaries/banks
      panels byte-unchanged.
- [ ] 0 new HTML pages; 0 new fixture rows; 0 new `data-*` hooks; `enhance.js` 0-diff.
- [ ] 0 computed money aggregate anywhere in the new tab.
- [ ] Admin-menu 50 items; route/page count 115; smoke green.

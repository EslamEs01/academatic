# Payments — Scope (Spec 038)

## Tab decision
- Route: `finance.html#view=payments` (and the EN mirror `finance.en.html#view=payments`).
- Page-count impact: **0 new pages**; count HELD 115 → 115. `payments` folds into the existing
  `finance.html` Spec-030 tabbed hub as a sibling tab alongside the new `invoices` tab (both part
  of Spec 038), following the SAME fold-anchor precedent as Specs 035/036/037.
- Mechanism: extend the `tabs({ group: 'finance', items, panels })` call in `renderFinance()`
  (`pages/finance.js`) with a `{ id: 'payments', labelKey: 'fin.tab.payments', icon: 'wallet' }`
  item and panel `paymentsTab()`. The Overview tab keeps its existing `paymentsSection()`
  (header count + Add/Reconcile gates + the 6-row list) UNCHANGED — the new Payments tab is an
  ADDITIVE, focused surface over the SAME 6 authored `PAYMENTS.rows`, not a replacement.
  `enhance.js`'s existing `#view=` deep-link opener activates the Payments tab on fresh load — no
  new hook, `enhance.js` 0-diff.
- Nav flip: `nav.config.js` — the `payments` item (`cat.finance` sub-section, line ~89) currently
  `status: 'disabled', reasonKey: 'nav.reason.finance'` (no route) → `status: 'implemented'`
  (drop `status`/`reasonKey`), `route: 'finance.html#view=payments'`. `salaries`/`staffSalaries`/
  `classSalaryReport` stay `disabled` (out of scope for this file). No `FUTURE_ROUTES` entry
  exists for `payments` today.

## Display sections (all authored, display-only)
1. **Tab header** — reuse the existing `section-title` + muted `<p>` sub pattern (matching
   `paymentsSection()`'s own header, `fin.sec.payments`/`fin.sec.paymentsSub`); no duplicate
   top-level `pageHeader()` call.
2. **No new filter surface.** `research.md` (Spec 009, D6) already documents that the page's
   single `[data-filter-form]` is bound to the invoice list only — payments are deliberately
   NON-filterable. This tab preserves that decision: a plain, unfiltered list/grid, ordered by
   `dateISO` descending (most recent first) — matching the Overview payments list's implicit
   order. No new `filterBar()`/`noResults()` instance is added anywhere in this tab (the single
   global `[data-no-results]` constraint stays satisfied — `enhance.js` 0-diff).
3. **Payment rows** — one row per authored `PAYMENTS.rows` entry: `dateISO` (LTR tabular), family
   name (linked to `family.html`), the linked invoice serial (`data-drawer="inv-<invoiceId>"`,
   opening the SAME baked invoice drawer the Invoices tab and Overview tab already share), `amount`
   + `unitKey` (SAR) literal, `methodKey` chip (bank-transfer/card/cash), and
   `paymentStatusChip(statusId)` (recorded/pending/returned). Reuse the existing `paymentRow()`
   renderer verbatim rather than duplicating markup.
4. **No detail drawer of its own.** Payments do not have (and this tab does not invent) a
   dedicated payment-detail sheet — clicking the invoice serial opens the EXISTING invoice drawer,
   consistent with the Overview tab's `paymentRow()` behavior today.

## Allowed authored data
- The EXISTING 6 `PAYMENTS.rows` fields only: `invoiceId`, `familyId`, `dateISO`, `amount` (SAR
  literal), `unitKey`, `methodKey`, `statusId` (recorded/pending/returned). No new fixture rows,
  no new fields (e.g. no invented "reference number", "gateway transaction id", or "fee").
- Per-row `amount` LITERALS are Spec-009-sanctioned demo data — allowed as-is (already shipped).

## Forbidden behavior
- **NO computed settlement/total-collected/net-received/reconciled-balance figure** — this tab
  must never sum the 6 `amount` literals (no "Total collected this month: X SAR" tile).
- No fake Record/Confirm/Refund/Export success toast.
- No fake status mutation (a `pending` or `returned` payment never flips to `recorded` on click).
- No payment gateway integration of any kind (no card-entry field, no provider logo linking to a
  real flow).
- No new `[data-filter-form]`/`noResults()` pair on this tab.
- No backend/API/websocket call of any kind.

## Final gated actions
- Any Record-payment / Confirm / Refund / Export control surfaced on this tab is a
  `data-disabled-reason` `backendRequired` gate, reusing the EXISTING `fin.pay2.add` /
  `fin.pay2.addReason` / `fin.pay2.reconcile` / `fin.pay2.reconcileReason` keys already defined for
  the Overview tab's payment-collection gates (`paymentsSection()`) — or a straight re-render of
  the SAME two gate buttons at the top of this tab, avoiding invented new copy/keys.

## Fixture plan
- **No new fixture file and no new `PAYMENTS` rows.** This tab is a pure display re-composition of
  `fixtures/finance.js`'s existing 6-row `PAYMENTS.rows` — the module stays import-only, 0-diff to
  `fixtures/finance.js`.
- Locale: one new key `fin.tab.payments` (mirrored `ar.fin.js`/`en.fin.js`, extending the existing
  `fin.tab` block) — reuse `fin.sec.payments`/`fin.sec.paymentsSub` verbatim for the tab header
  copy to avoid adding redundant keys. 0 divergence between AR and EN.

## Smoke / a11y / screenshot scope
- Smoke: `finance.html#view=payments` and `finance.en.html#view=payments` deep-links open the
  Payments tab on fresh load; the tab renders exactly 6 rows (re-pin the existing 6-payment
  assert against this tab too); every payment row's invoice-serial link opens the correct
  `inv-<id>` drawer; 0 computed-settlement token in the tab; 0 fake-success toast on
  Record/Confirm/Refund/Export. Admin-menu stays 50; route/page count stays 115. Re-pin all
  existing finance/payHit/famPay/child-view/Spec 026-037 asserts byte-verbatim.
- a11y: critical=0 serious=0 on the Payments tab, light + dark + mobile-390.
- Screenshots: Payments tab AR, EN, dark, mobile-390 — 0 console errors.

## Acceptance checks
- [ ] `nav.config.js` `payments` item: `disabled` → `implemented`, `route:
      'finance.html#view=payments'`, no `reasonKey`.
- [ ] `finance.js` `tabs()` call gains a `payments` item + panel; overview/salaries/banks/invoices
      panels byte-unchanged.
- [ ] 0 new HTML pages; 0 new fixture rows; 0 new `data-*` hooks; `enhance.js` 0-diff.
- [ ] 0 computed money aggregate anywhere in the new tab.
- [ ] Admin-menu 50 items; route/page count 115; smoke green.

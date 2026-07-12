# Contract — payments Tab

**Decision:** a display tab folded into `finance.html` → `finance.html#view=payments` (+
`.en`). Count impact **0** (fold-anchor, sibling of the `invoices` tab, same Spec 035/036/037
fold precedent).

## Mechanism
- Extend the `tabs({ group: 'finance', items, panels })` call in `renderFinance()` with a
  `{ id: 'payments', labelKey: 'fin.tab.payments', icon: 'wallet' }` item and a new panel
  `paymentsTab()`. `enhance.js`'s existing `#view=` deep-link opener activates the tab on fresh
  load — no new hook, `enhance.js` 0-diff.
- Nav: `nav.config.js` `payments` item `status:'disabled'`, `reasonKey:'nav.reason.finance'` →
  `status:'implemented'` (drop `status`/`reasonKey`), `route:'finance.html#view=payments'`.
  `salaries`/`staffSalaries`/`classSalaryReport` are out of scope for this file.
- **MOVE, do not duplicate (authoritative — matches `page-count-contract.md` + `plan.md`):** the
  existing `paymentsSection()` (header count + Add/Reconcile gates + the single 6-row
  `.fin-pay-row` list) is **RELOCATED** from Overview into this `#view=payments` tab. Overview
  **no longer renders the payments list**. There is exactly ONE `.fin-pay-row` list (now here) —
  **duplicating it is forbidden** (would make `.fin-pay-row` count 12 and break the byte-verbatim
  6-payment assert). Invoice-serial links reuse the existing `inv-<id>` drawer (baked once).

## Must render (display-only)
- In-tab section title + muted sub line (reuse `fin.sec.payments`/`fin.sec.paymentsSub` verbatim
  — no duplicate top-level `pageHeader()`).
- One row per authored `PAYMENTS.rows` entry, reusing the EXISTING `paymentRow()` renderer
  verbatim: `dateISO` (LTR tabular), family name (linked to `family.html`), the invoice-serial
  link (`data-drawer="inv-<invoiceId>"` — opens the SAME baked invoice drawer the Invoices tab and
  Overview tab already share), `amount` + `unitKey` (SAR) literal, `methodKey` chip
  (bank-transfer/card/cash), `paymentStatusChip(statusId)` (recorded/pending/returned).
- **No new filter surface** — payments stay deliberately NON-filterable (research.md Spec 009 D6:
  the page's single `[data-filter-form]` is bound to the invoice list only). Plain unfiltered
  list ordered by `dateISO` descending (most recent first). 0 new `filterBar()`/`noResults()`
  instance on this tab.
- **No dedicated payment-detail drawer of its own** — clicking the invoice serial opens the
  EXISTING `inv-<id>` drawer; this tab does not invent a payment-detail sheet.

## Must NOT
- **NO computed settlement/total-collected/net-received/reconciled-balance figure** — never sum
  the 6 `amount` literals.
- No new `[data-filter-form]`/`noResults()` pair on this tab.
- No fake Record/Confirm/Refund/Export success toast.
- No fake status mutation — a `pending`/`returned` payment never flips to `recorded` on click.
- No payment-gateway integration of any kind (no card-entry field, no provider logo linking to a
  real flow).
- No invented fields (no "reference number", "gateway transaction id", "fee" — the 6 existing
  `PAYMENTS.rows` fields only).
- No backend/API/websocket call of any kind.

## Final gated actions
- Any Record-payment / Confirm / Refund / Export control on this tab is a `data-disabled-reason`
  `backendRequired` gate, reusing the EXISTING `fin.pay2.add` / `fin.pay2.addReason` /
  `fin.pay2.reconcile` / `fin.pay2.reconcileReason` keys already defined for the Overview tab's
  payment-collection gates — a straight re-render of the same two gate buttons, no invented copy.

## Fixture / locale plan
- **0-diff to `fixtures/finance.js`** — no new fixture file, no new `PAYMENTS` rows/fields.
- One new locale key `fin.tab.payments` (mirrored `ar.fin.js`/`en.fin.js`, extending the existing
  `fin.tab` block); reuse `fin.sec.payments`/`fin.sec.paymentsSub` verbatim — 0 divergence AR/EN.

## Acceptance (smoke)
- `finance.html#view=payments` / `.en` opens the Payments tab on fresh load (no click needed).
- The tab renders exactly **6** rows (re-pin the existing 6-payment assert against this tab too);
  every payment row's invoice-serial link opens the correct `inv-<id>` drawer.
- 0 computed-settlement token in the tab; 0 fake-success toast on Record/Confirm/Refund/Export.
- Admin-menu stays 50; route/page count stays 115; a11y critical=0 serious=0 (light/dark/
  mobile-390); existing finance/payHit/famPay/child-view/Spec 026-037 asserts stay byte-verbatim.

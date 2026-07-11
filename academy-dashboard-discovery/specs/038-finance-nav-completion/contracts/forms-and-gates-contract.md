# Contract — Forms & Gates (all six Spec 038 finance tabs)

Reuse ONLY existing primitives and the CLOSED `data-*` hook set on `finance.html`/`.en` (widened from
3 tabs to 6: overview/invoices/payments/monthly-invoices/salaries/banks). No new hook, storage key,
or engine.

## Primitives (reuse as-is)
- `tabs({group:'finance', ariaKey:'fin.tab.aria', items, panels})` + `#view=` hash — widened from 3 to
  6 items; same `academy.schedView.finance` persistence key (Spec 030 mechanism, 0-diff).
- `filterBar({targetId, searchKey, selects})` + `facetAttrs({...})` + `noResults()` — the Overview
  tab's sole existing `#invoice-list` filter/no-results pair stays the ONLY interactive filter surface
  by default; the new Invoices/Payments/Banks tabs are display-only (no new filter-form/noResults
  pair), per each tab's own scope contract. If Monthly-Invoices ever adds a month filter it must be
  the ONE additional pair confirmed safe under the single global `[data-no-results]` constraint —
  otherwise it stays display-only (the required fallback).
- `formDrawer(id,{titleKey,headIcon,fields,ctaKey,reasonKey})` (wraps `previewTemplate`) — the ONE
  form on all six tabs: `bank-add` (Banks tab, Spec 032 FC-29, unchanged), a single `field()`
  (`bankAdd-bankName`, text). Default `ctaKey='common.save'`, `reasonKey='common.backendRequiredNote'`
  — Save is the standard clickable `data-disabled-reason` gate.
- `previewTemplate('inv-<id>', …)` — the 9 baked invoice drawers, shared verbatim by
  Overview/Invoices/Payments/Monthly-Invoices tabs (one copy, never duplicated — duplicate DOM ids
  are forbidden).
- `gate(labelKey, icon, reasonKey)` (`pages/finance.js`) / `disabledAction({labelKey,icon,reasonKey})`
  (`components/finance-actions.js`) — every non-form final (Create/Generate/Export/Send/Import/
  Reconcile/Approve/Mark-paid/Print).
- `confirmAction({...})` (`components/confirm-modal.js`) — Record-payment / Mark-as-paid /
  Send-reminder: opens a confirm modal, fires the honest `acknowledge()`-worded toast, mutates
  NOTHING (existing Spec 009/026 pattern, unchanged).
- `cardGrid` / `chip` / `medallion` — board rows/tiles/chips (finance uses custom `.fin-row`/
  `.fin-pay-row`/`.fin-tile` classes, no `<table>`).

## Hooks (closed set — do not extend)
`data-tab`/`data-tabs`/`data-tabpanel` (+ `#view=`), `data-drawer`→`template[data-preview]`,
`data-disabled-reason`/`data-reason-key`/`aria-disabled`, `data-confirm*`/`data-confirm-go`,
`data-filter`/`data-facet`/`data-filter-set`/`data-target`, `data-modal-trigger`/
`data-modal-title-key`. No new attribute name is introduced anywhere by this spec.

## Gate inventory (every write/generate/export/import final, across all six tabs)
| Surface | Action | Gate class | Reason key |
|---|---|---|---|
| Overview (unchanged) | Create invoice / Export CSV / Export PDF / Print | `data-disabled-reason` | `fin.reason.backend` / `fin.reason.export` ×2 / `fin.reason.export` |
| Overview / Invoices tab (shared drawer) | Record payment (non-cancelled) | `confirmAction` → toast, 0 mutation | n/a (confirm, not gate) |
| Overview / Invoices tab (shared drawer) | Record payment (cancelled) | `data-disabled-reason` | `fin.reason.cancelled` |
| Overview / Invoices tab (shared drawer) | Mark as paid (non-cancelled) | `confirmAction` → toast, 0 mutation | n/a |
| Overview / Invoices tab (shared drawer) | Mark as paid (cancelled) | `data-disabled-reason` | `fin.reason.cancelled` |
| Overview / Invoices tab (shared drawer) | Send reminder | `confirmAction` → toast, 0 mutation | n/a |
| Overview / Invoices tab (shared drawer) | Send invoice | `data-disabled-reason` | `fin.reason.send` |
| Overview / Invoices tab (shared drawer) | Print (drawer) | `data-disabled-reason` | `fin.reason.export` |
| Overview / Payments tab | Add payment | `data-disabled-reason` | `fin.pay2.addReason` |
| Overview / Payments tab | Reconcile | `data-disabled-reason` | `fin.pay2.reconcileReason` |
| Monthly-Invoices tab | Generate this month's invoices (if surfaced; else stays on the Overview planned card) | `data-disabled-reason` | `fin.reason.backend` |
| Monthly-Invoices tab | Send / PDF (if surfaced) | `data-disabled-reason` | `fin.reason.send` / `fin.reason.export` |
| Salaries tab (`salaries` + `staffSalaries`) | Generate payroll | `data-disabled-reason` | `fin.sal.generateReason` |
| Salaries tab | Approve | `data-disabled-reason` | `fin.sal.approveReason` |
| Salaries tab | Mark-paid | `data-disabled-reason` | `fin.sal.markReason` |
| Salaries tab | Export roster | `data-disabled-reason` | `fin.sal.exportReason` |
| Banks tab | Add bank (Save, inside `bank-add` form drawer) | `data-disabled-reason` (formDrawer default) | `common.backendRequiredNote` |
| Banks tab | Import statement | `data-disabled-reason` | `fin.bank.importReason` |
| Banks tab | Reconcile | `data-disabled-reason` | `fin.bank.reconcileReason` |

Every `data-disabled-reason` control is keyboard-reachable (`aria-disabled="true"`, never a dead/
hidden button), surfaces its reason on click/hover/focus via `title`, and produces the ONE honest
toast: "available once the server is connected" / «يُتاح بعد ربط الخادم» (`enhance.js`'s existing
`acknowledge()`, unchanged since Spec 026). Every `confirmAction` fires the same-class honest wording
and changes 0 DOM state.

## MUST-OMIT (0 rendered anywhere across all six tabs)
- `type="file"`, `type="password"`.
- Any secret/API-key/webhook/credential/IBAN/account-number/routing-number input.
- `window.open`, a `blob:` URL, `.pdf` generation/link, a `download=` attribute.
- Payment-gateway name/logo/link (PayPal/Paymob/Stripe/Payoneer) or any real-redirect "Pay now" control.
- Fake success wording ("تم"/"حُفظ"/"paid"/"sent"/"generated"/"saved"/"done"/"(demo)"/"(تجريبي)") — the
  ONLY toast text is `acknowledge()`'s standing copy.
- Any second `[data-filter-form]`/`noResults()` pair beyond the Overview tab's existing `#invoice-list`
  one, unless a tab's own scope contract explicitly confirms `enhance.js` supports multiple
  independent pairs.
- A second copy of the 9 `inv-<id>` `previewTemplate()` drawers, or a second `#invoice-list`/
  `.fin-pay-row`/`.fin-tile` id/class (duplicate DOM ids forbidden; double-counting risk).
- `href="#"`, a dead/inert button, a new dependency, or any `package.json`/`build-html.mjs`/
  `enhance.js`/`i18n.js` diff beyond the tab-widening already covered by `page-count-contract.md`.

## The one form (Add-bank) — full field census
- `formDrawer('bank-add', { titleKey:'fin.bank.addTitle', headIcon:'plus', fields: field({
  labelKey:'fin.bank.form.name', name:'bankAdd-bankName', placeholderKey:'fin.bank.form.namePh',
  full:true }) })` — ONE text field (bank name). No status/type/balance/credential field. `ctaKey`/
  `reasonKey` default to `common.save`/`common.backendRequiredNote`.
- This is the ONLY form-bearing drawer touched or introduced by Spec 038 across all six tabs — every
  other action is either a plain `data-disabled-reason` gate or the existing non-mutating
  `confirmAction` confirm→toast.

## Acceptance
- Grep across `finance.html`/`.en`: 0 `type="file"` / `type="password"` / `window.open` / `blob:` /
  `.pdf` / `download=` / gateway-name / credential-field token.
- Grep: 0 fake-success token outside `acknowledge()`'s exact wording.
- Smoke: every gate in the inventory is `aria-disabled` with a resolvable `data-reason-key`; clicking
  each produces 0 DOM mutation (row count, chip state, tile count, drawer count all unchanged
  before/after) — re-pins the existing finance display-block checks (`run.cjs` ~958-1045) plus one
  assert per new tab's own gates (`invoices-tab-contract.md`/`payments-tab-contract.md`/
  `monthly-invoices-tab-contract.md`).
- `bank-add` remains the ONLY `formDrawer` on the page; its Save gate produces 0 new `BANKS` row.
- No new `data-*` attribute name anywhere in `enhance.js` or any finance panel; `enhance.js` stays
  0-diff.
- Re-pin byte-verbatim: `payHit`, `famPay`, `tchPay`, `payFigure`, `child-view`, admin-menu-50,
  route/page-count-115, and the Spec 026-037 gate asserts.
- Cross-reference: `no-fake-money-contract.md` (NF-01…NF-16, the per-action honesty register),
  `finance-locks-and-gates-contract.md` (disposition/reason-key table), and
  `lockedFin-smoke-supersession-contract.md` (the nav-lock assert rewrite) — this contract governs
  the shared hook/MUST-OMIT/form surface only, not a duplicate register.

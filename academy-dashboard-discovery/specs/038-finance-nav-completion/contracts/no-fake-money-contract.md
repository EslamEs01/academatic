# Contract — No-Fake-Money (Spec 038)

Binding on all six unlocked finance tabs (`invoices` · `payments` · `monthly-invoices` · `salaries`
[teacher+staff via `salaries`/`staffSalaries`] · `banks`) plus the two items that stay honest locks
(`classSalaryReport`, `finance-analysis`). Reuses the **existing** `gate()`/`disabledAction()`
(`data-disabled-reason` → `enhance.js` `acknowledge()`: "available once the server is connected" /
«يُتاح بعد ربط الخادم») and the existing `confirmAction()` non-mutating confirm→toast pattern — no new
gate mechanism, no new hook. Authored per-row amount **literals** (SAR) are Spec-009-sanctioned demo
data; no aggregate/derived/computed money figure is ever introduced.

| # | Fake behavior — MUST NOT | Surface | Honest treatment | Acceptance check |
|---|---|---|---|---|
| NF-01 | Fake invoice generation | Overview `financeActions()`, Invoices tab, Monthly-Invoices tab | Create/Generate = `data-disabled-reason` (`fin.reason.backend`); boards show only the 9 authored `INVOICES.rows` | grep: 0 fake-success toast; smoke: 0 new row after click |
| NF-02 | Fake payment record/add | Overview `paymentsSection()`, Payments tab | Add/Record = `data-disabled-reason` (`fin.pay2.addReason`) or the existing confirm→toast that mutates nothing | smoke: `.fin-pay-row` count and every chip byte-identical before/after |
| NF-03 | Fake refund | Payments tab | Refund = `data-disabled-reason` gate; no refund handler exists in the codebase | grep: 0 refund handler/route; smoke: 0 status change |
| NF-04 | Fake mark-paid / settle | Invoice drawer (`invoiceDrawerActions`), Salaries tab | Mark-as-paid = existing confirm→toast (0 mutation) except on a cancelled invoice (`fin.reason.cancelled` gate); Salaries Mark-paid = `data-disabled-reason` (`fin.sal.markReason`) | smoke: invoice/salary status chip byte-identical before/after a confirmed click |
| NF-05 | Fake teacher-salary calculation | Salaries tab, teacher board (`salaries` anchor) | Figure-free board: `nameKey`+`statusId`+`periodKey` only; Generate/Approve/Mark-paid/Export = gates | grep: 0 pay/salary/rate/hour_rate/payout figure in the salaries panel |
| NF-06 | Fake staff-salary calculation | Salaries tab, staff board (`staffSalaries` deep-link, same `#view=salaries` panel) | Same figure-free board, `role:'staff'` rows only | same grep, staff section scoped |
| NF-07 | Fake per-class salary calculation | `classSalaryReport` | **Stays an honest lock** — `disabled`+`nav.reason.finance`+`#i-lock`, no route, no board | smoke: nav item asserted disabled+reason+lock; 0 `#view=class-salary-report` anywhere |
| NF-08 | Fake bank balance | Banks tab | Name + status ONLY (`bankRow()`); no balance/IBAN/account-number field, ever | grep: 0 balance/IBAN/account-number token in the banks panel |
| NF-09 | Fake reconcile / verify / import-transactions | Banks tab | Import statement / Reconcile = `data-disabled-reason` (`fin.bank.importReason`/`fin.bank.reconcileReason`); no sync/match success | smoke: bank status chip unchanged after clicking Import/Reconcile |
| NF-10 | Computed profit / loss / revenue / expenses | `finance-analysis` | **Never surfaced** — no nav item, route, tab, or `#view=`, ever; sole representation is the existing figure-free `accountingExpenses` planned card | grep: 0 `financeAnalysis`/`analysisExpenses`/`analysisInvoices` route; `forbidden` regex 0 hits |
| NF-11 | Computed VAT / tax | anywhere in `finance.html` | Never computed, never shown | grep: 0 VAT/tax computation token |
| NF-12 | Computed total / subtotal / outstanding / balance / net / due-sum | Invoices, Payments, Monthly-Invoices tabs | ONLY per-row `amount` literals + per-status/per-month ROW-COUNT roll-ups (`FINANCE_SUMMARY`, month-group `(N)`); 0 `reduce((sum,r)=>sum+r.amount,0)`-style aggregate anywhere | grep: 0 amount-summing expression in `pages/finance.js`; smoke: tile counts === row counts |
| NF-13 | Fake export / PDF / download / send / receipt | Invoices/Payments/Monthly-Invoices/Salaries tabs, invoice drawer | Export/PDF/Print/Send = `data-disabled-reason` (`fin.reason.export`/`fin.reason.send`); Send-reminder stays the existing confirm→toast (0 mutation, no receipt affordance) | grep: 0 `window.open`/`blob:`/`.pdf`/`download=`; existing no-receipt assert re-pinned |
| NF-14 | Payment gateway | Payments tab, Banks tab | None — no card-entry field, no PayPal/Paymob/Stripe/Payoneer logo or link, no webhook | grep: 0 gateway name/credential/webhook token |
| NF-15 | Row / status / payment / salary mutation on any confirm | all six tabs | Nothing persists; every confirm fires the honest `acknowledge()` toast and changes 0 DOM state | smoke: full before/after snapshot of every list/board byte-identical after clicking every gated/confirm control |
| NF-16 | Backend / API / database / auth / websocket | all six tabs + the `#view=` tab mechanism | 100% client-side; tab switching = pure hash routing over baked fixtures | smoke: 0 external network request on load + every tab switch; `package.json` 0-diff |

## Global grep gate set (expected 0 in the new/changed finance panels)
`<canvas` · `getContext` · `chart`/Chart.js token · a rendered sum-of-amounts / `Math.*`-over-`.amount`
aggregate · a salary/rate/payout/hour_rate/fine figure inside the Salaries panel · a balance/IBAN/
account-number/routing token inside the Banks panel · `window.open`/`blob:`/`.pdf`/`download=` ·
payment-gateway name or credential/API-key/webhook input · fake-success wording ("تم"/"حُفظ"/"paid"/
"sent"/"generated"/"saved"/"done"/"(demo)"/"(تجريبي)") outside `acknowledge()`'s exact copy ·
`type="file"` · `type="password"` · `href="#"`.

## Allowed (recorded so it is not mistaken for a violation)
- Authored per-row **amount literals** (`INVOICES.rows[].amount`, `PAYMENTS.rows[].amount`) in SAR —
  Spec-009-sanctioned demo, per-row only, never summed, never a new field.
- Row-**count** roll-ups: the 4 `FINANCE_SUMMARY.invoices.*` tile counts, `FINANCE_SUMMARY.payments.total`,
  and the Monthly-Invoices tab's per-month `(N)` heading count — the `OUTCOME_SUMMARY`/`GROUP_SUMMARY`
  precedent, never a money sum.
- Categorical status chips (paid/unpaid/overdue/cancelled; recorded/pending/returned; pending/approved/
  paid/onhold; active/inactive) as authored icon+text labels.
- Client-side filtering over authored rows (the Overview tab's existing `#invoice-list` filter stays the
  page's primary interactive filter surface; the new tabs are display-only per their own scope contracts).
- Read-only detail drawers (`inv-<id>`, shared across Overview/Invoices/Payments/Monthly-Invoices tabs)
  and deep-links to `family.html`/`course.html`/`group.html`/`teacher-performance.html`.
- The `bank-add` name-only form drawer (Spec 032 FC-29) — its Save is a `data-disabled-reason` gate;
  nothing persists.

## Acceptance
- Every NF-row's Acceptance check passes on both AR/EN builds of the widened `finance.html`/`.en`.
- The finance-body `forbidden` regex (`chart|canvas|graph|score|rank|leaderboard|percentile`, `run.cjs`
  ~996) and this contract's grep gate set both stay 0-hit across all six tabs.
- The carried-over smoke checks (9 invoice rows, 6 payment rows, 4 status tiles, 9 drawer templates,
  ≥4 disabled-with-reason + 0 demo-actions in the Overview action cluster, the cancelled-invoice
  disabled-record-payment check, `plannedN===9`/`plannedDisabled===9`/figure-free/availability-chip,
  0 `href="#"`, 0 receipt/upload/`type="file"` token, the (g) no-mutation-on-confirm check) are re-pinned
  byte-verbatim — cross-reference `finance-locks-and-gates-contract.md` (gate inventory),
  `forms-and-gates-contract.md` (hook/MUST-OMIT surface), and `lockedFin-smoke-supersession-contract.md`
  (the ONE sanctioned assert change, which is nav-lock-only and does not touch any row in this table).

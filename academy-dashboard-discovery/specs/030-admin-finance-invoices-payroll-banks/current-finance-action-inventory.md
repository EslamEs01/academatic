# Spec 030 — Current Finance Action Inventory

Every current finance action, classified. Classification: real-page-link · real-static-tab · real-static-filter
· real-modal · real-drawer · backendRequired-gate · planned-future-gate · display-only-not-action ·
folded-into-existing-page · remove-or-reword · missing-needs-030-fix · missing-owner-future-spec ·
intentionally-excluded. **Forbidden**: dead-button, href-hash, fake-submit/save/pay/mark-paid/approve/payout/
salary-generation/bank-import/reconcile/export/download/pdf/csv/print/calculation/payment-gateway.

| Page/component | Action text/labelKey | Element type | Hook | Current behavior | Expected (030) | Classification | Fix in 030? | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|
| finance.js tiles | status tiles (paid/unpaid/overdue/cancelled) | filter tiles | `data-filter-set` | facet invoice list; count = row count | keep | real-static-filter | No | 030 | tile count == rows |
| finance.js invoice list | invoice rows | display + drawer trigger | `data-drawer="inv-<id>"` | opens read-only drawer | keep | real-drawer | No | 030 | drawer read-only |
| finance.js filter | family/status filter | filter | `data-filter` via filterBar | facet client-side | keep | real-static-filter | No | 030 | facet works |
| finance-actions.js | fin.act.createInvoice | button (disabled) | `data-disabled-reason` fin.reason.backend | honest gate | keep | backendRequired-gate | No | 030 | reason shown; no create |
| finance-actions.js | fin.act.exportCsv / exportPdf | button (disabled) | `data-disabled-reason` fin.reason.export | honest gate | keep | backendRequired-gate | No | 030 | no file |
| finance-actions.js | fin.act.print | button | `data-demo-action data-toast` | honest toast | **reclassify → disabled-with-reason gate** (like Spec 029 R-G) | remove-or-reword | Yes | 030 | no fake print; honest gate |
| finance-actions.js | fin.act.recordPayment | button→confirm (or disabled if cancelled) | `data-confirm` / `data-disabled-reason` | confirm → honest toast; no mutation | keep or reword to backendRequired; NO mutation | backendRequired-gate | maybe | 030 | no money movement; no chip flip |
| finance-actions.js | fin.act.markPaid | button→confirm (or disabled if cancelled) | `data-confirm` / `data-disabled-reason` | confirm → honest toast; no mutation | keep; NO mutation | backendRequired-gate | maybe | 030 | no status flip |
| finance-actions.js | fin.act.sendReminder | button→confirm | `data-confirm` | confirm → honest toast | keep | backendRequired-gate | No | 030 | no send |
| finance-actions.js | fin.act.sendInvoice | button (disabled) | `data-disabled-reason` fin.reason.send | honest gate | keep | backendRequired-gate | No | 030 | no send |
| finance.js planned section | 9 planned finance cards (payroll/accounting/banks preview) | display + availability chip | reportCard planned | figure-free planned preview | **convert some → real pages/folds; rest stay gates** | folded-into-existing-page | Yes | 030 | supersede 9-card count (declared) |
| fixtures/finance.js | FINANCE_SUMMARY | display | `.filter().length` | row-count roll-up (no money math) | keep row-count-only | display-only-not-action | No | 030 | no aggregation |
| fixtures/finance.js | invoice/payment amounts | display | authored literal | single-value SAR literal | keep (Spec-009-sanctioned) | display-only-not-action | No | 030 | no sum/balance |
| **(missing)** invoices standalone / deepened surface | — | — | — | nav item disabled | build display-only list + filters + drawer + gates | missing-needs-030-fix | Yes | 030 | rows authored; gates honest |
| **(missing)** monthly-invoices | — | — | — | nav disabled | fold status-first list | missing-needs-030-fix | Yes | 030 | Parent/Status; no aggregate |
| **(missing)** salaries / staff-salaries | — | — | — | nav disabled | **status-first FIGURE-FREE** board + Generate/Approve gates | missing-needs-030-fix | Yes | 030 | NO salary amount; gates honest |
| **(missing)** class-salary-report | — | — | — | nav disabled | figure-free display-only OR gate | missing-needs-030-fix | Yes | 030 | no group-by/sum |
| **(missing)** payments (deepened) | — | — | — | nav disabled | fold payment list + Add/Verify/Refund/Reconcile gates | missing-needs-030-fix | Yes | 030 | amount literal only; gates honest |
| **(missing)** banks | — | — | — | nav disabled | fold/page name/status list + Add modal + Import/Reconcile gates | missing-needs-030-fix | Yes | 030 | no credentials; Add = modal |
| **(missing)** payouts | — | — | — | (candidate) | status-first FIGURE-FREE + Approve gate | missing-needs-030-fix | planning | 030 | NO payout amount; no money movement |
| **(missing)** accounting / analysis (P&L/Net Income) | — | — | — | (candidate) | status-first counts or planned gate; NO chart/aggregate | missing-needs-030-fix | planning | 030 | no chart; no computed figure |
| payout-providers / payment gateway | credentials/webhooks | — | — | (legacy secrets) | NOT built | intentionally-excluded / future-backend | No | future-backend/031 | no secret rendered |
| teacher-portal salary twin | — | — | — | excluded | NOT built | intentionally-excluded | No | excluded | pay-free green |
| family payment | — | — | — | excluded | NOT built | intentionally-excluded | No | excluded | family zero-pay green |

## Key facts (from source audit)

1. **`FINANCE_SUMMARY` is row-count-only** — `.filter().length`/`Set.size`; grep for `.reduce(|+=|Sum|total =|
   amount [*+/-]` = 0. No money arithmetic anywhere. 030 keeps this permanent.
2. **Invoice/payment amounts are authored single-value SAR literals** — displayed directly (`num(inv.amount)`),
   never summed. Spec-009-sanctioned. Salary/payout figures do NOT exist in the current app and must NOT be
   added.
3. **finance Print is `data-demo-action`** — the one reclassify candidate (→ gate, like Spec 029 R-G).
4. **Confirm actions never mutate** — smoke asserts status chips unchanged before/after confirm; 030 keeps this.
5. **No chart/canvas anywhere** — 030 adds none; legacy ApexCharts/Chart.js are evidence only.
6. **Reusable primitives (zero new hooks)**: `filterBar`, `data-filter-set` tiles, `previewTemplate`/`sheetRow`
   drawers, `data-confirm`, `data-modal-trigger`, `data-disabled-reason`, `data-tab`, status chips
   (`finance-status.js`). A 030 finance surface composes entirely from these.

**No row remains unresolved.** Existing actions are honest; the "missing-needs-030-fix" rows are the additive
finance sub-surfaces (status-first/figure-free where payroll/payout) + the Print reclassification + the Spec-009
supersession.

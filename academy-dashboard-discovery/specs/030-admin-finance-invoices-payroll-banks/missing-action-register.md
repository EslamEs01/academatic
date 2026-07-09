# Spec 030 — Missing / Dead / Misleading Action Register

Every missing/dead/misleading/out-of-scope finance action/page, with a resolution + owner. **No row unresolved.**
IDs use F- prefix (Finance/030).

| ID | Page/Menu | Action/Page | Problem | Evidence | Resolution | Fix now? | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|---|
| F-A | finance | Invoices surface (deepened/standalone) | nav item disabled; legacy `/invoices` grounded | `table-inventory.md:726-814`; `nav.config.js:85` | Build display-only list + status/date filters + read-only drawer; Create/Mark-paid/Record/Export → gates (amount literals OK) | **Yes** | 030 | rows authored; drawer read-only; gates honest; no aggregate |
| F-B | finance | Monthly invoices | nav disabled; legacy `/monthly-invoices` | `table-inventory.md:831-834` | Fold status-first Parent/Status list | **Yes** | 030 | no aggregate |
| F-C | finance | Payments / collections | nav disabled | `fixtures/finance.js:42-49` | Fold payment list; Add/Verify/Refund/Reconcile → gates | **Yes** | 030 | amount literal only; no balance; no receipt-upload |
| F-D | finance | Teacher salaries | nav disabled; legacy "Generate Salary" + EUR figures | `table-inventory.md:1036-1039`; `management-salaries.txt` | **STATUS-FIRST FIGURE-FREE** board (name+status); Generate/Request-payouts → gates | **Yes** | 030 | NO salary amount; gates honest |
| F-E | finance | Staff salaries | nav disabled; "Generate Salary" | `form-inventory.md:14276-14295` | STATUS-FIRST FIGURE-FREE; Generate → gate | **Yes** | 030 | NO salary amount |
| F-F | finance | Class salary report | nav disabled; computed group-by-sum | `form-inventory.md:12562-12595` | Figure-free display-only OR honest gate; NO group-by/sum engine | **Yes** | 030 | no computed total; figure-free |
| F-G | finance | Banks | nav disabled; legacy `/banks` + create | `table-inventory.md:91-94`; `form-inventory.md:1346-1354` | Name/status list; Add/Edit = backendRequired modal; Import/Reconcile → gates | **Yes** | 030 | no credentials; Add = modal |
| F-H | finance | Payouts | (candidate); legacy `/payouts` approve→pay | `form-inventory.md:11988-12043` | STATUS-FIRST FIGURE-FREE (name/method/status); Approve → gate | planning | 030 | NO payout amount; no money movement |
| F-I | finance | Expense | (candidate); legacy `/expense` + heads | `table-inventory.md:416-419` | Status-first; Value+Currency single-value literal OK; Add/Edit → gates; NO aggregate | planning | 030 | single-value literal; no P&L |
| F-J | finance | finance Print | `data-demo-action` toast | `finance-actions.js:39-47` | Reclassify → disabled-with-reason export gate (Spec 029 R-G precedent) | **Yes** | 030 | no fake print; honest gate |
| F-K | finance | Record-payment / Mark-paid / Send-reminder | confirm→toast implying money op | `finance-actions.js:75-115` | Keep as backendRequired confirm OR modal; NO status flip, NO money movement | maybe | 030 | no mutation; honest final |
| F-L | finance | Export / Download / PDF / CSV (all) | must be gates | `finance-actions.js`; `/downlaod` | All → backendRequired/disabled-with-reason gates | **Yes** | 030 | no file; no silent no-op |
| F-M | finance | Accounting hub (Net Income/P&L) | computed aggregate + ApexCharts | `management-accounting.html:1379,3246` | Status-first counts OR planned gate; NO aggregate figure; NO chart | planning | 030 | no computed figure; no chart |
| F-N | finance | Analysis-expenses (P&L) | computed P&L + Chart.js | `table-inventory.md:81-84` | Honest planned gate or status-first summary; NO P&L figure; NO chart | planning | 030 | no P&L; no chart |
| F-O | finance | Analysis-invoices (Paid/Due/Overdue) | aggregate totals + Chart.js | `table-inventory.md:86-89` | Status counts OK (row counts); aggregate money totals + chart forbidden | planning | 030 | status counts only; no chart |
| F-P | finance | Spec-009 finance-body-frozen invariant | 030 must modify finance.html | `specs/011-…/contracts/finance-impact-contract.md:7` | Declared supersession (lift freeze; keep permanent guarantees) | **Yes** | 030 | supersession declared; guarantees kept |
| F-Q | finance | Finance nav coverage | 6 disabled wallet items + banks | `nav.config.js:85-91` | Flip 030-owned items to implemented (page/fold) OR keep honest future-backend gates; guard intact | **Yes** | 030 | no dead placeholder; guard green |
| F-R | payout-providers | Paymob/Payoneer creds/webhooks/keys | legacy secrets exposed | `form-inventory.md:11845-11940` | NOT built; future-backend/excluded; NO secret rendered | No | future-backend | no credential/API-key input |
| F-S | settings/payments | Payment-gateway credentials | legacy gateway config | `form-inventory.md:13764-13903` | → 031 (settings) / future-backend; not a 030 figure surface | No | 031/future-backend | not built in 030 |
| F-T | teacher portal | salary / salary-class-report twin | pay-free law | `output/roles/teacher/text/teacher-salary*.txt` | Excluded FOREVER | No | excluded | teacher-portal byte-identical |
| F-U | family | payment page/figure | family zero-pay | family portal | Excluded | No | excluded | family zero-pay green |
| F-V | teacher.html | Compensations / Salary tab (Fine/Bonus) | pay figures on teacher.html | `management-teachers-1-compensations-1.txt` | If surfaced: figure-free; else NOT built | planning | 030 | NO Fine/Bonus/salary amount |

## Resolution summary

- **Fixed in 030** (build): F-A invoices · F-B monthly · F-C payments · F-D/F-E salaries (status-first) · F-F
  class-report · F-G banks · F-J Print gate · F-L export gates · F-P Spec-009 supersession · F-Q nav coverage.
- **030 planning decides** (fold vs page vs gate): F-H payouts · F-I expense · F-K record/mark-paid honesty ·
  F-M/F-N/F-O accounting/analysis (status-first vs gate) · F-V teacher compensations.
- **Routed out / never built**: F-R payout-providers → future-backend; F-S payment-gateway → 031/future-backend;
  F-T teacher-portal twin → excluded; F-U family payment → excluded.

**Every row resolved.** No dead-button, no href-hash, no fake-pay/mark-paid/salary-generation/payout/bank-import/
reconcile/export/chart/aggregate survives.

# Spec 030 — No-Fake-Money Register

Every finance action that could imply a real money operation, its honest replacement, and its smoke assertion.
This is the core honesty guardrail for the money domain. **Nothing in 030 moves money, generates a salary,
approves a payout, imports a bank statement, reconciles, or produces a file.**

## Money movement / payment

| Action | Implies | Honest replacement | Smoke assertion |
|---|---|---|---|
| Record payment / Add payment | recording real money | `data-confirm`/`data-disabled-reason` backendRequired gate; NO status flip | confirm changes 0 invoice/payment status chips before/after |
| Mark as paid | flipping invoice to paid | backendRequired confirm/gate; NO mutation | invoice status chip unchanged after confirm |
| Verify payment / Refund | money movement | backendRequired gate | no refund; no mutation |
| Reconcile / Match | bank reconciliation | backendRequired gate | no reconcile; no computed match |
| Send invoice / Send reminder | dispatching | backendRequired gate/confirm | no send |

## Salary / payroll / payout

| Action | Implies | Honest replacement | Smoke assertion |
|---|---|---|---|
| Generate Salary (teacher) | payroll computation | backendRequired gate; STATUS-FIRST board FIGURE-FREE | no salary amount figure; no generation |
| Generate Salary (staff) | payroll computation | backendRequired gate; FIGURE-FREE | no salary amount figure |
| Request payouts / Approve selected | payout money movement | backendRequired gate; FIGURE-FREE | no payout amount; no money movement |
| Salary class report (group-by/sum) | computed aggregation | figure-free display OR gate; NO group-by/sum | no computed total; figure-free |
| Any salary/payout/compensation figure | pay leakage | NEVER displayed | pay-free grep over salary/payout bodies = 0 |

## Bank

| Action | Implies | Honest replacement | Smoke assertion |
|---|---|---|---|
| Add/Edit bank account | persistence | `data-modal-trigger` backendRequired modal (name only) | no persistence; no credentials field |
| Import statement | bank integration | backendRequired gate | no import; no file input |
| Match / Reconcile | reconciliation engine | backendRequired gate | no reconcile |
| Bank credentials / API keys | secret exposure | NEVER rendered (future-backend) | no credential/API-key/`type=password` input on any finance body |

## Export / print / download

| Action | Implies | Honest replacement | Smoke assertion |
|---|---|---|---|
| Export CSV / PDF / Excel | file generation | `data-disabled-reason` gate | no `a[download]`/`.csv`/`.pdf`/`blob:`; no file |
| Print | print output | reclassify demo-toast → disabled-with-reason gate (F-J) | no fake print; no demo-action on export/print |
| Download (`downlaod`) | file download | backendRequired gate | no real download control |

## Computed / chart

| Action | Implies | Honest replacement | Smoke assertion |
|---|---|---|---|
| Net Income / Total Income / P&L / Total Expenses | computed aggregate | status-first counts OR planned gate; NO figure | no money-total label; no aggregate |
| Invoice balance / discount / fee / tax math | computed | authored single-value literal only | no `.reduce`/`sum`/`amount [*+/-]` in finance source |
| Charts (accounting ApexCharts, analysis Chart.js) | plotting | none — display-only cards/tables | no `<canvas>`/chart lib in finance body/source |

## Receipt / upload / gateway

| Action | Implies | Honest replacement | Smoke assertion |
|---|---|---|---|
| Receipt upload | file upload | NONE — no upload affordance | no `type="file"` on any finance body |
| Payment gateway action (Paymob/Payoneer) | live integration | NONE — future-backend/excluded | no gateway credential/webhook rendered |

## Global no-fake-money smoke strategy

- Every finance write ends at a `backendRequired`/`disabled-with-reason` gate or a `data-confirm` that mutates
  nothing (chip/row unchanged before/after).
- Body greps over the finance surfaces: no `type="file"`, no `a[download]`/`.csv`/`.pdf`/`blob:`, no
  credential/API-key/`type=password`, no `<canvas>`/chart lib, no money-total/aggregate label, no salary/payout
  figure on the status-first boards.
- Source greps over new/changed finance modules: no money arithmetic (`.reduce`/`+=`/`Sum`/`total =`/`amount
  [*+/-]`), no chart lib.
- Keep byte-verbatim the existing Spec-009 no-mutation-on-confirm + `forbidden` (chart/canvas/graph/score/rank/
  leaderboard/percentile) assertions.

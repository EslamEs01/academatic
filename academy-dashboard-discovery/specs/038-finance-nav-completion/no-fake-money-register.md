# No-Fake-Money Register — Spec 038

The binding finance honesty contract for every Spec-038 surface. **MUST NOT** create fake business truth; **MUST-GATE** every backend write. Intro: reuse the existing `gate()` (`data-disabled-reason` → enhance.js toasts "available once the server is connected"); authored per-row amount **literals** are Spec-009-sanctioned demo (unit SAR), but **no aggregate/derived money** ever.

| # | Fake behavior — MUST NOT | Honest treatment | Acceptance check |
|---|---|---|---|
| M-01 | fake invoice generation | Create/Generate = `backendRequired` gate; board shows existing authored rows only | grep new finance panels: 0 fake success toast; Create is `data-disabled-reason` |
| M-02 | fake payment confirmation / record | Record/Confirm = gate | payment status chips are authored; 0 mutation on confirm |
| M-03 | fake refund | Refund = gate | no refund handler; gate only |
| M-04 | fake mark-paid | Mark-paid = gate; invoice/payment `statusId` never changes on click | confirm-then-status-change asserted absent (existing no-mutation assert) |
| M-05 | fake salary calculation | figure-free salary board (name+status+period); Generate/Approve/Mark-paid = gates | **0 pay/salary/rate/payout figure** in salaries body |
| M-06 | fake staff salary calculation | figure-free staff board | 0 pay figure |
| M-07 | fake class salary calculation | figure-free per-class status board OR honest lock; Generate/Export = gates | 0 per-class pay figure; if locked, honest reason |
| M-08 | fake bank balance | banks show name + status only | 0 balance/number in banks body |
| M-09 | fake reconciliation / transaction sync / verify | Import/Reconcile/Verify = gates | 0 mutation; gates only |
| M-10 | computed profit / loss / revenue / expenses | not surfaced (finance-analysis stays honest lock) | 0 computed aggregate token in any finance body |
| M-11 | computed VAT / tax | never computed | 0 VAT/tax computation |
| M-12 | computed total / subtotal / outstanding / balance / net / due-sum | only row-COUNT roll-ups (FINANCE_SUMMARY); per-row amount literals only | no sum-of-amounts rendered; FINANCE_SUMMARY stays count-only |
| M-13 | fake export / PDF / download | Export/PDF/Download = gates | no `window.open`/`blob:`/`.pdf`/download attr |
| M-14 | fake send / email / receipt | Send/Email = gates; no receipt affordance | 0 receipt/proof affordance (existing no-receipt assert) |
| M-15 | payment gateway (PayPal/Paymob/Stripe) | none | 0 gateway string/integration |
| M-16 | row/status/payment/salary mutation | nothing persists/mutates on any confirm | existing no-mutation assert byte-verbatim |
| M-17 | backend / API / database / auth / websocket | none | 0 external request (smoke) |

## Allowed (recorded, so it's not mistaken for a violation)
- Authored per-row **amount literals** (invoices/payments/monthly) in SAR — Spec-009-sanctioned demo, per-row only, never summed.
- Row-**count** roll-ups (`FINANCE_SUMMARY.invoices.paid` etc.) — the OUTCOME_SUMMARY/GROUP_SUMMARY precedent.
- Categorical status chips (paid/unpaid/overdue/cancelled; recorded/pending/returned; salary pending/approved/paid/onhold; bank active/inactive) as authored labels (icon + text).
- Client-side filtering over authored rows; read-only detail drawers; deep-links between finance surfaces.

## Global grep gates (expected 0 in the new/changed finance panels)
`<canvas` · `getContext` · `chart` · computed-percentage/`Math.*` over amounts · a rendered sum-of-amounts · `salary`/`payout`/`rate` figure in salary boards · balance number in banks · `window.open`/`blob:`/`.pdf` · payment-gateway names · fake success wording ("paid", "sent", "generated", "done").

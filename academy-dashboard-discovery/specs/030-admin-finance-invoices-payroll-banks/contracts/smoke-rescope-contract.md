# Contract — Smoke Rescope

**Guarantee**: smoke changes are ADDITIVE + a DECLARED Spec-009 supersession; protected asserts byte-verbatim.
**Add a Spec-030 block asserting**:
- public HTML count == 97.
- finance.html AR/EN loads; tab bar works (Overview/Salaries/Banks; exactly one panel visible).
- Salaries + Banks tabs render; Salaries board is FIGURE-FREE (scoped pay grep = 0); Banks rows name/status only.
- every finance action opens page/modal/drawer/gate; Add-bank = modal; Import/Reconcile/Generate/Approve/Export = gates.
- no fake payment/mark-paid/salary-generation/payout/bank-import/reconcile; confirm mutates 0 status chips.
- no `type=file`, no `type=password`, no API-key/webhook/secret text; no `a[download]`/`.csv`/`.pdf`/`blob:`.
- no `<canvas>`/chart; no money aggregate/total/net/P&L label; no salary/payout figure.
- Print = disabled-with-reason (no demo-action on export/print).
- finance nav coverage (six-wallet-locked + membership) byte-verbatim.
**DECLARED SUPERSESSION**: update the 9-planned-cards count/shape assertion + the finance body-structure expectation.
**KEEP byte-verbatim**: 4 tiles, 9 invoice rows, 6 payment rows, 9 drawers (Overview), the finance `forbidden` regex, no-mutation-on-confirm, no-receipt, finance-token-clean on dashboard/reports, + all 026/027/028/029 + payHit/tchPay/famPay/payFigure/child-view asserts.
**Fail if**: a permanent assert is weakened; a hardcoded pass is added; the supersession is undeclared.

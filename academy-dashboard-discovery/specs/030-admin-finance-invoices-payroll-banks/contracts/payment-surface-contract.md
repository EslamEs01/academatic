# Contract — Payment Surface (F-C/F-K)

**Guarantee**: display-only payments; honest gates; no money movement.
- Payment rows display-only (method/status/date + single authored literal); Add/Verify/Refund/Reconcile = gates.
- NO receipt upload (`type=file`); NO refund; NO reconciliation; NO collected total.
- Record-payment/Mark-paid confirms mutate nothing.
**Verify (smoke)**: amount literal only; no `type=file`; gates honest; status unchanged after confirm.
**Fail if**: a collected-total/balance appears; a receipt-upload affordance appears; a status flips.

# Contract — No Fake Money

**Guarantee**: nothing in 030 moves money, records a payment, marks paid, generates a salary, approves a payout, imports a bank statement, reconciles, or produces a file.
- Record-payment/Mark-paid/Verify/Refund/Reconcile/Generate-salary/Approve-payout/Import = backendRequired/disabled-with-reason gates.
- Confirm-on-write mutates NOTHING (invoice/payment/salary status chip unchanged before/after).
- No `type="file"` (receipt upload); no `type="password"`/API-key/webhook/secret (gateway/payout creds).
**Verify (smoke)**: status chips unchanged after every confirm; no type=file/password; no credential text; no a[download]/.csv/.pdf/blob.
**Fail if**: any status flip on confirm; any fake money/file/credential affordance.

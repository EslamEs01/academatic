# Contract — Admin Finance Invariant (Spec 028)
**MUST**: the Spec-009 finance invariant is preserved; no new finance/payroll module in 028; no salary/payroll/compensation/payout figures; teacher pay/finance routes to 030.
**Acceptance**
- `finance.html`/`reports.html` byte-identical (028 doesn't touch them).
- No aggregate/sum/math introduced; no salary/payroll figure anywhere on admin teacher surfaces.
- Teacher compensations/salary/payouts stay owner-030 records (not built).
- **STOP** on a new finance module, any payroll figure, or math on a plan literal.

# Contract — Admin Finance Invariant

**MUST**: Spec-009 finance invariant preserved; **no new finance module in 027**; no salary/payroll/payout figures; billing/plan persistence → 030. The family.html admin plan hour-rate literal stays a single-value, no-aggregate/no-math admin-only literal.

**Acceptance**
- `finance.html`/`reports.html` byte-identical (027 doesn't touch them).
- No aggregate/sum/math introduced on any admin plan literal; no salary/payroll figure anywhere.
- Billing actions stay owner-030 gates.
- **STOP** on a new finance module, any payroll figure, or math on the plan literal.

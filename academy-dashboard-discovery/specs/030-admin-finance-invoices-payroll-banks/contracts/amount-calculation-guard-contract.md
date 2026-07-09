# Contract — Amount & Calculation Guard

**Guarantee**: only single authored invoice/payment (and optional expense) amount literals; NO money arithmetic; NO aggregate; NO salary/payout figure.
- Allowed: per-row authored literal + unit; row counts by status.
- Forbidden: sum/total/balance/net/P&L; group-by/sum; FX; runtime aggregation; salary/payroll/compensation/payout amount figures anywhere.
**Verify**: source grep `\.reduce\(|\+=|Sum|total =|amount [*+/-]` over new/changed finance modules = 0 (row-count `.filter().length` excepted); smoke: no money-total/net/P&L label; no salary/payout figure on salary/payout tab bodies.
**Fail if**: any computed money figure or salary/payout amount appears.

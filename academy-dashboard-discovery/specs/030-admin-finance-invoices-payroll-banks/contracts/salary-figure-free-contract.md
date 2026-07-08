# Contract — Salary Figure-Free (F-D/F-E)

**Guarantee**: teacher + staff salary boards are STATUS-FIRST and FIGURE-FREE.
- Rows: name + status chip + period/row-count ONLY. **NO salary/fixed/fine/gift/hour-rate/total/EUR/amount figure.**
- Generate salary / Approve / Mark-paid / Export payroll = backendRequired gates. NO payroll engine, NO generation.
- Teacher-portal pay-free law untouched (no teacher-portal salary page).
**Verify (smoke)**: scoped pay grep over the Salaries tab body (`salary|salaries|payroll|payout|fixed|fine|gift|hour rate|أجر|راتب|رواتب|مستحقات|غرامة|مكافأة` + numeric-near-pay) = 0; gates honest.
**Fail if**: any salary/pay amount figure appears; any generation/approve mutates anything.

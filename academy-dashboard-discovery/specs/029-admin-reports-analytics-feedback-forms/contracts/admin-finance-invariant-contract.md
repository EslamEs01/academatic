# Contract — Admin Finance Spec-009 Invariant

**Guarantee**: finance stays Spec-009-invariant.
- `finance.js`/`fixtures/finance.js`/`components/finance-*.js`/`locales/*.fin.js` = 0-diff; finance.html/.en #page-body byte-identical.
- No salary/payroll/profit/loss/payment math anywhere in 029.
- Shared «الرواتب» finance nav item stays in the sidebar (outside #page-body), sanctioned.
**Verify**: finance file diff empty; finance body byte-identical; no money math in 029.
**Fail if**: a finance file/body changes; any finance calculation is introduced.

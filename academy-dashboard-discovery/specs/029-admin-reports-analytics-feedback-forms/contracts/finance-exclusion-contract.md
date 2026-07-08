# Contract — Finance Exclusion

**Guarantee**: no finance/payroll built; finance invariant green; no pay figure in any 029 body.
- Build none of analysis-expenses/analysis-invoices/salary-class-report/downlaod/invoice-export/payouts (→030).
- `finance.js`, `fixtures/finance.js`, `components/finance-*.js`, `locales/*.fin.js` = **0-diff**; finance.html #page-body byte-identical.
- Body-scoped pay-figure smoke assert over every new/changed 029 body (excludes sidebar nav); token union incl. AED/EUR.
**Verify**: `git diff --stat` on finance files empty; body pay grep = 0.
**Fail if**: a finance file changes; a pay figure appears in a 029 body.

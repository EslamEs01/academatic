# Contract — Finance Menu Coverage Gate

**Guarantee**: every finance nav item classified; none dead; `nav.config.js` 0-diff.
- All 8 finance items (finance + invoices/monthlyInvoices/salaries/staffSalaries/payments/classSalaryReport/banks) in `finance-menu-coverage-inventory.md` with status + disposition; 0 unclassified.
- The 7 disabled sub-items stay honest future-backend gates (real billing/payroll/bank engine requires the server); display-only previews fold into the finance hub.
- Build guard intact (implemented⇒route, disabled⇒reasonKey).
**Verify (smoke)**: six-wallet-locked + finance sub-section membership byte-verbatim; salaries/banks tabs render in the hub; no dead finance nav item.
**Fail if**: any finance item unclassified; a disabled item lacks a reason; nav guard weakened.

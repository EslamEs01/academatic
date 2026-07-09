# Spec 029 — Finance Exclusion Register

How 029 keeps finance/payroll out of the reporting/feedback/forms scope while still inventorying it for 030.

## Legacy report pages that include money / payroll / invoices / profit-loss

| Legacy page | Money content | Evidence | Disposition |
|---|---|---|---|
| `analysis-expenses` | Expected/Actual Revenue, Expected/Actual Net Profit, Teachers Salaries, Staff Salaries, Expenses, Total Expenses (EUR) + monthly/cumulative charts | `table-inventory.md:81-84`; `02-…:3984-3992` | **→030**; not built in 029 |
| `analysis-invoices` | Paid, Due, Overdue, Total Before/After Discount, Discount (AED) + charts | `table-inventory.md:86-89`; `02-…:1797-1806` | **→030** |
| `salary-class-report` (+ teacher-side twin) | Per-class salary computation (`update-result`, Wallet module) | `page-inventory.md:182,335`; `form-inventory.md:12571-12580` | **→030**; teacher-side **excluded FOREVER** |
| `downlaod` (invoice accounting) | Total Price / Total (AED), New-Transaction, payment gateway | `02-…:1808-1819` | **→030** |
| `invoicesexportdata` | Invoice export (link-only) | `route-graph.md:424` | **→030** |

## Current finance-like nav / items (already honest)

| Nav item | State | File |
|---|---|---|
| finance | implemented (real link) | `nav.config.js:84` → finance.html |
| invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks | `status:'disabled'`, `reasonKey:'nav.reason.finance'` | `nav.config.js:85-91` |

## Disposition per item

- All rows above → **030** (or intentionally-excluded for the teacher-side salary twin). 029 builds none of
  them, surfaces none of their figures, and adds no salary/payroll/profit/loss/payment field to any 029 body.

## Admin finance Spec-009 invariant (must stay green)

`app/src/js/pages/finance.js`, `fixtures/finance.js`, `components/finance-{status,actions}.js`, and
`locales/*.fin.js` must show **zero git diff**; `finance.html`/`finance.en.html` `#page-body` byte-identical to
HEAD. No runtime money arithmetic, no receipt concept, no new pay figure beyond the existing authored single-
value invoice/payment demo literals, status vocabularies unchanged. 029 touches none of these files. The
shared «الرواتب/الرواتب» finance NAV item lives in the sidebar (outside every `#page-body`) and is sanctioned.

## How 029 avoids finance leakage

1. **Scope**: 029 owns academic reports/feedback/forms only; finance analytics is explicitly out (spec §Out of
   Scope; `future-owner-register.md#030`).
2. **No finance files touched**: finance page/fixture/components/locales stay 0-diff.
3. **Body-scoped grep**: the new pay assertion runs over `document.getElementById('page-body')` so the shared
   sidebar finance nav item never trips it.
4. **Feedback splitting**: any legacy feedback/report that mixes academic + money keeps only the academic
   (categorical) part; money fields route to 030.

## Smoke grep strategy (extend the existing token union)

Existing regexes (quote for reuse, byte-verbatim where they already run):

- Family zero-pay / payFigure (`app/tests/smoke/run.cjs:1208,1274,1298`):
  `/ريال|ر\.س|\bSAR\b|\bUSD\b|جنيه|\bEGP\b|[$€£]|ادفع|سداد|pay now|payment|\bamount\b|\bprice\b|مبلغ|سعر|رسوم/i`
- Teacher pay-free / payHit / tchPay (`run.cjs:1239-1240,1319-1321`):
  `/\b(salary|salaries|payouts?|earnings?|compensation)\b/i || /راتب|رواتب|أجر|مستحقات|غرامة|مكافأة/`
- Spec-028 admin-surface token set (`028…pay-finance-exclusion-register.md:43`):
  `راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|\bEGP\b|\bAED\b|\bEUR\b`

**029 strategy**: apply a body-scoped pay-figure assertion (the union above, incl. `AED`/`EUR` from the legacy
finance analytics) to every NEW/changed 029 report/feedback/forms page `#page-body`, excluding the sidebar nav.
`teacher-performance.html` remains the sanctioned exempt admin board (not grepped to 0) but 029 adds no pay
figure to it. Any hit on a 029 body = STOP. Do NOT weaken `payHit`/`famPay`/`tchPay`.

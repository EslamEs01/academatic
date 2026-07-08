# Spec 030 — Legacy Finance Coverage Map

Maps each LEGACY finance capability → current page/module → disposition → owner → fix-in-030. Evidence under
`academy-dashboard-discovery/`. Disposition: **deepen-030** · **fold-030** (into finance.html) ·
**page-candidate-030** (planning decides) · **status-first-030** (figure-free) · **gate-030** (honest gate) ·
**future-backend** · **excluded** · **031**.

| # | Legacy capability | Legacy route | Evidence | Current module | Disposition | Owner | Fix in 030? | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Finance overview | `finance` (app) | `finance.js` | `finance.html` (implemented) | deepen-030 | 030 | Yes | Supersede Spec-009 freeze; keep guarantees |
| 2 | Invoices list (+date/status filters) | `/invoices` | `table-inventory.md:726-814` | finance.html invoice list | deepen-030 / page-candidate | 030 | Yes | Amount literals OK; filters real; Create/Mark-paid → gates |
| 3 | Invoice detail / create-parent-invoice | `/invoices/create-parent-invoice/{id}` | `form-inventory.md:9724-9776` | finance.html invoice drawer | deepen-030 | 030 | Yes | Read-only drawer; Create = backendRequired modal (no line-item math) |
| 4 | Record payment (New-Transaction) | `/accountant/store-transaction` | `form-inventory.md:10834-10891` | `invoiceRowActions` confirm→demo | gate-030 | 030 | Yes | → backendRequired gate; no money movement/mutation |
| 5 | Monthly invoices | `/monthly-invoices` | `table-inventory.md:831-834` | none | fold-030 / status-first | 030 | Yes | Parent/Status list; no aggregate |
| 6 | Payments / collections | (invoices payments) | `fixtures/finance.js:42-49` | finance.html payments section | deepen-030 | 030 | Yes | Method/status/date + amount literal; Add/Verify/Refund/Reconcile → gates |
| 7 | Downlaod (invoice accounting) | `/downlaod` | `table-inventory.md:376-414` | none | gate-030 | 030 | Yes | Mirror of invoices; export = honest gate (no real download control in legacy) |
| 8 | Expense (+ heads) | `/expense`, `/heads` | `table-inventory.md:416-419`; `form-inventory.md:5556-5618` | none | status-first-030 / page-candidate | 030 | planning | Value+Currency literal OK (single-value); Add/Edit = gates; NO expense aggregate/P&L |
| 9 | Teacher salaries board | `/salaries` | `table-inventory.md:1036-1039`; `management-salaries.txt` | none | status-first-030 | 030 | Yes | **FIGURE-FREE** (name+status only); Generate/Request-payouts → gates; NO salary amount |
| 10 | Staff salaries board | `/staff-salaries` | `form-inventory.md:14276-14295` | none | status-first-030 | 030 | Yes | **FIGURE-FREE**; Generate → gate |
| 11 | Salary class report | `/salary-class-report` | `form-inventory.md:12562-12595` | none | gate-030 / status-first | 030 | Yes | Figure-free display-only OR gate; NO group-by/sum engine |
| 12 | Banks list | `/banks` | `table-inventory.md:91-94` | none | fold-030 / page-candidate | 030 | Yes | Name/status rows; Add = modal; Import/Reconcile = gates |
| 13 | Create bank | `/banks/create` | `form-inventory.md:1346-1354` | none | modal-030 | 030 | Yes | `name` only; backendRequired modal; no credentials |
| 14 | Payouts queue | `/payouts` | `form-inventory.md:11988-12043` | none | status-first-030 | 030 | Yes | **FIGURE-FREE** (name/method/status); Approve → gate; NO payout amount, NO money movement |
| — | **Forbidden / not reproduced as figures/charts** | | | | | | | |
| 15 | Accounting hub (P&L/Net Income + ApexCharts) | `/accounting` | `management-accounting.html:1379,3246` | none | status-first-030 / gate | 030 | Partial | NO aggregate figures, NO chart; status-first counts or planned gate |
| 16 | Accounting transaction ledgers (invoices/salary/session profit) | `/accounting/transaction/*` | `table-inventory.md:11-69` | none | status-first-030 / gate | 030 | Partial | Session "Profit" + salary totals FORBIDDEN as figures; status-first or gate |
| 17 | Analysis Expenses (P&L + Chart.js) | `/analysis-expenses` | `table-inventory.md:81-84` | none | gate-030 | 030 | No (figures) | Computed P&L + salaries = forbidden; honest planned gate or status-first summary; NO chart |
| 18 | Analysis Invoices (Paid/Due/Overdue + Chart.js) | `/analysis-invoices` | `table-inventory.md:86-89` | none | status-first-030 / gate | 030 | Partial | Status counts OK (row counts); aggregate money totals + chart forbidden |
| — | **NEVER built even by 030 — future-backend / excluded** | | | | | | | |
| 19 | Payout providers (Paymob/Payoneer creds+webhooks) | `/payout-providers` (+edit) | `form-inventory.md:11845-11940` | none | future-backend / excluded | future-backend | No | NEVER mock secrets/API keys/webhooks |
| 20 | Payment-gateway credential settings | `/settings/payments/*` | `form-inventory.md:13764-13903` | none | 031 / future-backend | 031/future-backend | No | Settings-domain credentials; not 030 figures |
| 21 | Teacher-portal salary + salary-class-report twin | `/teacher/salary*` | `output/roles/teacher/text/teacher-salary*.txt` | teacher portal (closed) | excluded FOREVER | excluded | No | Teacher pay-free GLOBAL law |
| 22 | Family payment page / figure | (family billing) | family portal | family portal (zero-pay) | excluded | excluded | No | Family zero-pay law |
| 23 | Teacher-detail Compensations / Salary tab | `/teachers/{id}/*` | `management-teachers-1-compensations-1.txt` | teacher.html | status-first-030 / excluded-figure | 030 | planning | If surfaced at all: figure-free; NO Fine/Bonus/salary amount |

## Consolidated: what 030 owns

**Deepen / build (display-only + gates)**: finance.html overview, invoices (+detail drawer), monthly-invoices,
payments, banks (+create modal), expense (single-value literal), plus **status-first figure-free** salaries /
staff-salaries / payouts / class-salary-report.
**Gates**: Create-invoice, Record-payment, Mark-paid, Send, Generate-salary, Request-payouts, Approve-payout,
Import-statement, Reconcile, Export/Print/PDF/CSV/Download.
**Status-first summaries or planned gates (no figures/charts)**: accounting hub, analysis-expenses, analysis-
invoices, accounting transaction ledgers.

## Routed OUT of 030

Payout providers / payment-gateway credentials → **future-backend** (never mock secrets); payment-gateway
*settings* → **031**; teacher-portal salary twin → **excluded FOREVER**; family payment → **excluded**; real
money movement / gateway / bank integration / payroll engine / export generation → **future-backend**.

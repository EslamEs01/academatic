# Spec 030 — Finance Menu Coverage Inventory (MANDATORY GATE)

Every 030-owned finance nav item (from `app/src/js/nav.config.js:76-92`) + legacy/current candidates,
classified. **No 030-owned finance item may remain unclassified.** This extends the Spec 029 Admin Menu
Coverage Gate to the finance sub-section.

Status legend: **implemented** · **disabled** (disabled-with-reason) · **planned**.
Disposition legend: **deepen** (existing finance.html) · **fold** (section/tab in finance.html) · **page**
(standalone, planning-justified) · **status-first** (figure-free board) · **gate** (honest future-backend gate)
· **future-backend** · **excluded**.

## Current finance nav sub-section (`cat.finance`)

| Menu item | Current nav status | Current route | Current page file | Legacy evidence | Current status | Disposition (030) | Owner | Needs page? | Fold? | Modal/drawer? | Action deepening | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| finance | implemented | finance.html | finance.html | `finance` app | live (Spec 009) | **deepen** | 030 | no | hub | drawers | supersede freeze; add sub-surfaces | smoke: finance loads AR/EN; no computed aggregate |
| invoices | disabled (nav.reason.finance) | — | — | `/invoices` (+filters) | disabled→030 | **deepen/fold or page** | 030 | candidate | yes (or page) | read-only drawer | Create/Mark-paid/Record/Export → gates | smoke: rows authored; drawer read-only; gates honest |
| monthlyInvoices | disabled | — | — | `/monthly-invoices` | disabled→030 | **fold** (or gate) | 030 | no | yes | — | status-first Parent/Status | smoke: rows authored; no aggregate |
| salaries | disabled | — | — | `/salaries` (Generate Salary) | disabled→030 | **status-first** (fold/page) | 030 | candidate | yes | — | Generate/Request-payouts → gates | smoke: **FIGURE-FREE**; no salary amount; gates honest |
| staffSalaries | disabled | — | — | `/staff-salaries` | disabled→030 | **status-first** (fold) | 030 | no | yes | — | Generate → gate | smoke: FIGURE-FREE; no salary amount |
| payments | disabled | — | — | payments/collections | disabled→030 | **fold** | 030 | no | yes | read-only drawer | Add/Verify/Refund/Reconcile → gates | smoke: amount literal only; no balance; gates honest |
| classSalaryReport | disabled | — | — | `/salary-class-report` (group-by-sum) | disabled→030 | **gate** or status-first | 030 | no | maybe | — | Generate/Export → gate | smoke: no group-by/sum engine; figure-free |
| banks | disabled | — | — | `/banks` (+create) | disabled→030 | **fold or page** | 030 | candidate | yes | Add/Edit modal | Import/Reconcile → gates | smoke: name/status only; no credentials; Add = modal |

## Legacy/current candidates (not current nav items)

| Item | Legacy evidence | Disposition (030) | Owner | Notes / acceptance |
|---|---|---|---|---|
| analysisExpenses | `/analysis-expenses` (P&L + Chart.js) | **gate** / status-first | 030 | NO P&L figures, NO chart; planned gate or count summary |
| analysisInvoices | `/analysis-invoices` (Paid/Due/Overdue + Chart.js) | **status-first** / gate | 030 | Status counts OK (row counts); aggregate totals + chart forbidden |
| accounting (hub) | `/accounting` (Net Income + ApexCharts) | **gate** / status-first | 030 | NO aggregate figures, NO chart |
| accounting/transaction/* | invoices/salary/session ledgers | **status-first** / gate | 030 | Session "Profit" + salary totals forbidden as figures |
| expense | `/expense` (+heads) | **status-first** (candidate) | 030 | Value+Currency single-value literal OK; Add/Edit gates; no aggregate |
| payouts | `/payouts` (approve→pay) | **status-first** | 030 | FIGURE-FREE (name/method/status); Approve → gate; no amount, no money movement |
| payoutProviders | `/payout-providers` (Paymob/Payoneer creds+webhooks) | **future-backend / excluded** | future-backend | NEVER mock secrets/API keys/webhooks/integration status |
| invoiceExport / downlaod | `/downlaod`, `invoicesexportdata` | **gate** | 030 | Honest export gate; no real download control in legacy |
| paymentGateway (settings/payments) | `/settings/payments/*` credentials | **031** / future-backend | 031/future-backend | Settings-domain credentials; not a 030 figure surface |
| wallet | nav icon (all finance items use `wallet` icon) | n/a | — | Not a separate item; icon only |

## Coverage summary

- **030-owned finance nav items**: 8 (finance implemented; invoices/monthlyInvoices/salaries/staffSalaries/
  payments/classSalaryReport/banks disabled→030). **0 unclassified.**
- **Deepen/fold/page (build display-only + gates)**: finance, invoices, monthlyInvoices, payments, banks,
  expense; **status-first figure-free**: salaries, staffSalaries, payouts, classSalaryReport.
- **Status-first summary or planned gate (no figures/charts)**: accounting hub, analysis-expenses,
  analysis-invoices, accounting transaction ledgers.
- **future-backend / excluded (NEVER built)**: payout-providers (creds/webhooks), payment-gateway credentials
  (031/future-backend), teacher-portal salary twin (excluded FOREVER), family payment (excluded).
- **Post-030 rule**: every 030-owned item is implemented/folded/status-first/gate; no finance item stays a dead
  disabled placeholder that 030 could handle honestly; items needing real backend/payment/bank/payout
  integration stay honest future-backend gates. `nav.config.js` build guard intact.
- **Nav flip note**: items flipped disabled→implemented (planning decides which) get a real route + page/fold;
  items kept as honest future-backend gates stay disabled-with-reason. Exact set fixed in `/speckit.plan`.

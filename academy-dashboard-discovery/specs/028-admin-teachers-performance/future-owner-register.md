# Future-Owner Register — Spec 028

Every out-of-028-scope teacher action, routed to an owner and kept as an honest gate (never built in 028).

| ID | Action | Owner | Gate type | Note |
|---|---|---|---|---|
| T-O | Teacher Compensations tab (Fine/Bonus amounts) | **030** finance/payroll | not built | Highest scope-creep risk (lives ON teacher.html) — never add a compensations tab/drawer/modal in 028; figure-free. |
| T-P | Salary tab · Accounting hub · Accounting→Invoices/Salary/Session ledgers · Salaries board · Staff-Salaries · Salary-Class-Report | **030** finance/payroll | not built | Payroll/finance boards; zero salary/payroll/compensation/payout math anywhere; admin finance Spec-009 invariant. |
| T-P2 | Payouts queue (approve→pay money movement) | **030** finance/payroll | not built | Real money-movement workflow — banned (no real CRUD/persistence). |
| T-Q | Payout Providers (Paymob/Payoneer credentials + webhooks) | **future-backend** | intentionally-excluded | Live integration secrets; unbuildable honestly even as a mock. |
| T-R | Teacher Feedback (%+note) · Class Feedback (per-session %) | **029** reports/analytics/feedback | not built | Computed-percentage evaluation; if ever built, authored/display-only only (no derived %). |
| T-S | Login as teacher (impersonation) | **future-backend** | honest gate | Needs a real auth/session engine. |
| T-T | Send Reset Password | **future-backend** | honest gate | Auth action; no fake send. |
| T-U | Session-level teacher reassignment (Edit-Class `teacher_id`) | **Spec-026** sessions/attendance ops | not built | Do not fold into 028's course/group/category scope (avoid double-invention). |
| T-V | Teacher-portal own salary + salary-class-report | **intentionally-excluded FOREVER** | never built | Teacher pay-free GLOBAL law (Spec 016/025); the `teacher-*` pay grep must stay 0. |
| T-L | Teacher-performance export/print · export summary | **029** | honest gate | No fake file; board stays figure-free. |
| T-print | Teacher print / export summary (existing gate) | **029** | honest gate | Already `trn.reason.export` disabled+reason; keep. |
| T-mat | Teacher materials / certificates / settings-app | **031** management/content/certificates/settings | planned gate | Not in 028 scope. |

**Rule**: 028 builds none of 029/030/031/032/future-backend/intentionally-excluded. Each out-of-scope action stays an honest `data-disabled-reason`/`data-coming-soon`/`data-demo-action`(honest-toast) gate; smoke asserts each is non-dead and figure-free.

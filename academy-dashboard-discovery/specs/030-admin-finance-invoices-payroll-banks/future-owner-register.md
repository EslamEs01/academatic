# Spec 030 — Future Owner Register

Every out-of-scope finance action/page, with an owner + rationale. Owners: **031** management/content/certs/
settings/materials · **032** final QA · **future-backend** · **intentionally-excluded**. Finance is 030's
domain, so only real backend/payment/bank/payout **integration** pieces route out.

## → future-backend (real integration — never built as fixtures)

| Item | Legacy evidence | Rationale |
|---|---|---|
| Real payment gateway / processing | `/settings/payments/*`, invoice `gateway` field | Real money processing; no mock |
| Real bank connection / statement import / reconciliation | `/banks`, Import/Reconcile actions | Real bank integration engine |
| Payout providers (Paymob/Payoneer) creds + webhooks + API keys | `form-inventory.md:11845-11940` (`key1/2/3/4 type=password`, webhook URLs) | NEVER mock secrets/credentials/integration status |
| Real payroll / salary generation engine | `/salaries` "Generate Salary" | Salary computation engine |
| Real invoice / PDF / export generation | `/downlaod`, export/PDF/CSV controls | File generation engine |
| Real payout / money movement (approve→pay) | `/payouts/approve` | Real money movement |
| Real reconciliation engine | bank match/reconcile | Reconciliation engine |

## → 031 (management / content / settings)

| Item | Legacy evidence | Rationale |
|---|---|---|
| Payment-gateway **settings** pages (Paypal/Stripe/XPay/mollie/Payoneer config UI) | `form-inventory.md:13764-13903` | Settings-domain (credentials); not a 030 finance figure surface. May be 031 settings OR future-backend if it exposes secrets |
| Expense **heads** lookup admin | `/heads` | Content/lookup admin (adjacent to expense) — 031 if surfaced |

## → 032 (final QA)

| Item | Rationale |
|---|---|
| Final no-missing sweep across the finance menu | 032 re-verifies 030's finance coverage held |
| Any residual finance nav item left as a future-backend gate | 032 confirms it is honest, not dead |

## intentionally-excluded (binding role laws — never built)

| Item | Rationale |
|---|---|
| Teacher-portal own Salary / Salary-Class-Report | Teacher pay-free GLOBAL law (Spec 016/024/028) — excluded FOREVER |
| Family payment page / any family pay figure | Family zero-pay law |
| Salary / payroll / compensation / payout amount FIGURES anywhere | Standing law (Spec 016/024-B-09) |
| Computed P&L / Net Income / Total aggregates | Forbidden computed money figures |
| Charts / `<canvas>` / chart libraries | Standing no-chart law |
| Teacher-detail Compensations (Fine/Bonus) amount figures | Pay figures on teacher.html — figure-free only if surfaced |

**Rule restated**: 030 implements only the display-only finance surfaces + honest gates in `spec.md`. Every
item above stays an honest gate / owner record / exclusion; 030 builds none of it and renders no secret,
credential, or fake integration status. Smoke asserts each out-of-scope surface is non-dead and figure/secret-free.

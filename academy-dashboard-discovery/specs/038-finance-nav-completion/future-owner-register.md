# Future Owner Register — Spec 038 (Finance Nav Completion)

Items grounded in legacy evidence but NOT closed by Spec 038, with an explicit owner + reason.
Nothing below is mocked, faked, or given a fabricated frontend surface now or later without a real
backend/engine behind it.

| Item | Legacy evidence | Why not closed in 038 | Owner | Reason |
|---|---|---|---|---|
| **Analysis — Expenses / Profit & Losses** board (`management/analysis-expenses`) | `management-analysis-expenses.md` — computed Expected/Actual Net Profit, Expected/Actual Revenue, Teachers Salaries, Staff Salaries, Expenses, Total Expenses (live EUR figures, e.g. "Staff Salaries EUR 9,333.00") | Requires computed aggregate money math (net profit, revenue, salary totals) — exactly the class of arithmetic the no-fake-money law forbids on a frontend with no real accounting backend | **Future backend billing/accounting spec** (post-041) | Never mocked: a real net-profit/revenue engine needs a real ledger + real payroll figures; showing zero/placeholder totals would itself be dishonest, so the honest move is no surface until the backend exists |
| **Analysis — Invoices & Accounts** board (`management/analysis-invoices`) | `management-analysis-invoices.md` — computed Total Before/After Discount, Discount, Paid/UnPaid/Overdue AED totals + per-family Paid/Due/Overdue breakdown table | Same class of computed-aggregate money math as analysis-expenses | **Future backend billing/accounting spec** (post-041) | Same as above; the existing `FINANCE_SUMMARY` tiles intentionally stay row-count-only rather than approximate this |
| **`classSalaryReport` as a real board** (only if the open board-vs-lock decision in `legacy-finance-coverage.md` resolves to "stay locked" in `plan.md`) | `management-salary-class-report.md` — group-by teacher/student/date pay-per-class report | If kept locked: a genuine per-class pay linkage needs real payroll math to be meaningful; a figure-free stand-in board may under-deliver on the legacy capability's intent | **Future backend billing/accounting spec** (post-041), OR closed within 038 as a figure-free board — final call in `plan.md` | Recorded here so the "kept as an honest lock" branch has a documented owner regardless of which way `plan.md` decides |
| **Real billing/payroll/gateway ENGINE** — compute invoices, run payroll, reconcile banks, generate PDFs, process a payment gateway (Paymob/Payoneer/etc.), send receipts | `page-inventory.md` Downlaod (CSV/PDF export variants), Accounting Transaction captures, Settings Payments create-payment-method captures (payment_method 1–7) | This is backend/engine work by definition — no frontend spec can close it | **Future backend** (never a frontend spec) | Standing law: no payment-gateway credential, no fake mark-paid/settle/refund/reconcile/generate/PDF/export/send/receipt on the frontend, ever, until a real backend exists behind the gate |
| **Materials fold** (`management/materials` catalog capability) | Prior specs (031/039 track) | Already folded into `library.html`'s Materials tab per Spec 031; any further deep management is out of 038's finance scope | **Spec 039** | Recorded per the roadmap split — not a finance item |
| **Certificate Requests** (`management/certificate-requests`) | Prior specs (031/039 track) | `certificateRequests` nav item stays `planned`; out of 038's finance scope | **Spec 039** | Recorded per the roadmap split — not a finance item |
| **Settings ×6** (`settingsGeneral`/`settingsNotifications`/`settingsCustomization`/`settingsSecurity`/`settingsUsers`/`settingsIntegrations`) | Prior specs (031/040 track) — folded into `settings.html` tabs; individual nav anchors stay `planned` | Out of 038's finance scope entirely | **Spec 040** | Recorded per the roadmap split — not a finance item |
| **Final sidebar / route / production re-freeze** | N/A — process item | Spec 038 is one more nav-completion increment in the Spec-033 roadmap, not the final freeze | **Spec 041** | The roadmap's designated final QA / full admin-menu coverage / production-freeze checkpoint, mirroring the Spec-032 precedent for the earlier roadmap half |

## Non-owned-by-038, explicitly confirmed elsewhere (no action needed here)

- Teacher salary/payout figures — excluded FOREVER under the teacher pay-free GLOBAL law (not a
  "future" item; permanently out of scope for any spec).
- Family-portal pay figures — excluded FOREVER under the family zero-pay law (permanently out of
  scope; distinct from the admin-only Spec-009 invoice literals Spec 038 unlocks).

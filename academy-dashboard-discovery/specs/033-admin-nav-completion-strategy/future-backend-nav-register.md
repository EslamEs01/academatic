# Future-Backend Nav Register — Spec 033

Items whose **final action** legitimately stays `backendRequired` because it needs a real engine. **Critical rule (Spec-032 principle):** future-backend applies to the **final action**, NOT the surface — every user-facing item still gets a real frontend shell (list/board/compose/search). No item stays a no-UI «قريبًا»/lock after the follow-up specs. An item qualifies ONLY if it names a real engine below; "not built yet" alone never qualifies.

## Allowed real-engine reasons (the only justifications)
real messaging delivery · real CRM/leads ingestion · real task persistence/assignment · real broadcast/notification delivery · real payment movement · real payroll generation · real bank sync/reconciliation · real export/PDF/file generation · real integration credential storage · real auth/permission engine.

## Register
| Item | Why future-backend (real engine) | Frontend shell still buildable? | Recommended shell | Owner |
|---|---|---|---|---|
| messages | real message-delivery engine (send/receive/thread persistence) | Yes | messages.html: inbox + thread view + compose form; **Send** = backendRequired | 034 |
| leads | real CRM ingestion (capture/convert/assign) | Yes | leads.html: new-requests inbox + detail + convert form; **Convert/Assign** = backendRequired | 034 |
| tasks | real task persistence + assignment | Yes | tasks.html: board/list + create form; **Save/Assign** = backendRequired | 034 |
| announcements | real broadcast/notification delivery | Yes | announcements.html: list + compose; **Publish/Send** = backendRequired | 034 |
| timeConverter | **none** — pure client math | Yes — fully | time-converter.html: a working timezone tool; **no gate** | 034 |
| scheduleSearch | real availability engine for the final booking | Yes | search form + results board; **Book** = backendRequired | 035 |
| invoices | real billing/payment movement | Yes | figure-free/amount-literal ledger display; **Record/Export** = backendRequired | 038 |
| monthlyInvoices | real billing aggregation | Yes | figure-free monthly board; actions gated | 038 |
| salaries | real payroll generation | Yes (surface EXISTS) | finance Salaries tab (deep-link); **Generate/Approve/Mark-paid** = backendRequired | 038 |
| staffSalaries | real payroll generation | Yes | figure-free staff-salary board; actions gated | 038 |
| payments | real payment movement | Yes | figure-free payments ledger; **Record-payment** = backendRequired | 038 |
| classSalaryReport | real payroll aggregation | Yes | figure-free class-salary board; export gated | 038 |
| banks | real bank sync/reconciliation | Yes (surface EXISTS) | finance Banks tab (deep-link); **Add/Import/Reconcile** = backendRequired | 038 |
| dataAnalysis | real analytics/aggregation engine (legacy chart) | Partial | display-only authored board (NO computed chart/`<canvas>`); if no honest display, stays a documented future-backend gate with a shell placeholder | 037 |
| settingsIntegrations (connect/test/configure) | real integration credential storage + connectors | Yes (surface EXISTS) | Integrations tab (deep-link); **Connect/Test/Configure** = backendRequired; NO credential input | 040 |
| settingsSecurity (2FA/session) | real auth engine | Yes (surface EXISTS) | Security tab (deep-link); auth actions gated; NO OTP/secret control | 040 |
| settingsCustomization (Save) / settingsGeneral (Save) | real settings persistence | Yes (surface EXISTS) | tabs (deep-link); **Save** = backendRequired panel gate | 040 |

## Notes
- **Non-user-facing, no-shell future-backend: NONE.** Every item above is user-facing and gets a shell. The engines are hidden behind the final action, not the nav item.
- The finance items (invoices/salaries/payments/banks/etc.) are bound by the **finance no-fake-money law** (see `role-law-and-no-fake-carryover.md`): display is allowed (Spec-009 amount literals, no arithmetic/computed-Total), but money movement / payment / payroll / PDF / bank-sync / reconciliation stay `backendRequired`.
- `dataAnalysis` is the one borderline item: if a legacy chart cannot be honestly reproduced as an authored display board, it stays a documented future-backend gate (with a placeholder shell explaining the analytics engine dependency) rather than faking a chart.

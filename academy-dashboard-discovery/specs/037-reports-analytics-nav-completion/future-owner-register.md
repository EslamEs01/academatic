# Future-Owner Register (Spec 037)

Capabilities the Admin Missing-Pages Audit surfaced that Spec 037 will **not** build or close (they need a
backend, carry pay, or belong to another owner's group). Recorded so nothing is silently dropped. See
`admin-missing-pages-audit.md` for the full 50-item classification this table is drawn from.

| Capability (nav key) | Current state | Why deferred | Honest treatment today | Owner |
|---|---|---|---|---|
| **invoices** | `status:'disabled'`, `reasonKey='nav.reason.finance'` | Finance no-fake-money law — figure/board work belongs to the finance group | honest visible lock (disabled + reason), not «قريبًا» | **Spec 038** |
| **monthlyInvoices** | `status:'disabled'` (locked) | Same — finance-flavoured monthly roll-up carries figures | honest lock; fold/board deferred | **Spec 038** |
| **salaries** | `status:'disabled'` (locked) | Teacher/staff pay-free + finance no-fake-money law | honest lock; deep-link to the existing `finance.html` Salaries tab deferred | **Spec 038** |
| **staffSalaries** | `status:'disabled'` (locked) | Same | honest lock; fold deferred | **Spec 038** |
| **payments** | `status:'disabled'` (locked) | Same | honest lock; board deferred | **Spec 038** |
| **classSalaryReport** | `status:'disabled'` (locked) | Same | honest lock; fold deferred | **Spec 038** |
| **banks** | `status:'disabled'` (locked) | Same | honest lock; deep-link to the existing `finance.html` Banks tab deferred | **Spec 038** |
| **Finance-flavoured "analysis"** (`analysis-expenses`, `analysis-invoices`, `monthly-invoices` legacy pages) | Not surfaced anywhere | Explicitly excluded from `reports.html#view=analysis` to keep the reports body finance-free FOREVER (Spec-009 invariant) | never folded into reports; any future surface is a finance-owned page/tab | **Spec 038** |
| **materials** | `status:'planned'` («قريبًا»), functionally already folded into `library.html` Materials tab | Nav status flip is a separate content-group decision (031/039 territory), not a Reports/Analytics item | folded target already exists; nav flip to fold-anchor deferred | **Spec 039** |
| **certificateRequests** | `status:'planned'` («قريبًا»), functionally already folded into `certificates.html` Requests tab | Same — content-group nav flip, not Reports/Analytics | folded target already exists; nav flip deferred | **Spec 039** |
| **settingsGeneral** | `status:'planned'`, folded into `settings.html` General tab | Settings-group nav flip, not Reports/Analytics | folded target exists; deep-link `settings.html#view=general` deferred | **Spec 040** |
| **settingsIntegrations** | `status:'planned'`, folded into `settings.html` Integrations tab | Same | folded target exists; deep-link deferred | **Spec 040** |
| **settingsCustomization** | `status:'planned'`, folded into `settings.html` Customization tab | Same | folded target exists; deep-link deferred | **Spec 040** |
| **settingsNotifications** | `status:'planned'`, folded into `settings.html` Notifications tab | Same | folded target exists; deep-link deferred | **Spec 040** |
| **settingsSecurity** | `status:'planned'`, folded into `settings.html` Security tab | Same | folded target exists; deep-link deferred | **Spec 040** |
| **settingsUsers** | `status:'planned'`, folded into `settings.html` Users tab / `staff.html` | Same | folded target exists; deep-link deferred | **Spec 040** |
| **Final sidebar / route / production re-freeze** | N/A — cross-cutting QA pass | Needs every prior group (038/039/040) closed first | not attempted by Spec 037 | **Spec 041** |

## Conditional deferral — the three flagged-035 correctives

Spec 037's own scope includes a **recommended** (not yet finalized) corrective for each of
`familyCategories`, `studentResult`, `studentEvaluation` (see `flagged-035-items-audit.md`): strengthen
each into a labeled folded board (`families.html#view=categories`, `students.html#view=results`,
`students.html#view=evaluation`), count-neutral (115→115).

- **If `/speckit.plan` adopts all three correctives**, Spec 037 closes them itself — no future-owner entry needed.
- **If any corrective is deferred** (e.g. scope/time-boxed out of Spec 037's implementation), that item's
  ownership passes to the **next available follow-up spec after 041** (exact number to be assigned when the
  deferral is made) and must be re-recorded in that spec's own future-owner register — it must NOT quietly
  revert to "resolved" status just because the nav route already exists. This is a conditional, not a
  committed deferral: the default plan is to close all three now.

## Not future-owner items (recorded to avoid confusion)

- **sessionsAnalysis, publicHoliday, scheduledActions** (Control) — already closed by Spec 026; not touched or reopened by Spec 037.
- **messages, leads, tasks, announcements, timeConverter** (Control) — already closed by Spec 034; not touched by Spec 037.
- **addTeacher, teacherCategories, sessionsKpi, monthlyPerf** (Teachers) — already closed by Spec 036; not touched by Spec 037.
- **scheduleSearch** (Families) — already closed by Spec 035; not touched by Spec 037.

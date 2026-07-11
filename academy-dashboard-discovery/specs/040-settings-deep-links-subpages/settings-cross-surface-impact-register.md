# Settings Cross-Surface Impact Register (Spec 040)

Where each setting will eventually take effect. **Spec 040 implements no propagation** — enforcement is owned by **Spec 055 — Cross-Role Feature Propagation & Workflow Consistency**. This register exists so 055 does not have to re-derive it.

| Setting | Producer / editor | Consumers (surfaces) | Affected roles | Notification impact | Reporting impact | Audit impact | Backend dependency | Future owner |
|---|---|---|---|---|---|---|---|---|
| **Academy identity** (name, Arabic name, domain, email, phone, WhatsApp, logo) | Admin · System Settings | Shell branding, topbar, index, invoices, certificates, outbound email, public pages | all | reply-to / sender identity | report headers | who changed the academy's identity | settings store + asset storage (logo) | Spec 053 (delivery) · backend |
| **Location** (country, city, address) | Admin | Academy profile, documents | admin | — | — | ✔ | settings store | backend |
| **Timezone** | Admin | **Every schedule, session, attendance, reminder and timetable surface across all roles** — "changing the timezone changes every class's admin time & date" | **all** | reminder send times shift | every time-bound report | **high** — a silent timezone change moves history | settings store + scheduling engine | Spec 055 |
| **Course/class automation** (renewal, stop-after, cancellation windows, auto-makeup, credit rules, unclosed-class handling, pre-class entry) | Admin · System Settings | Courses, sessions, schedule, attendance, cancellation/make-up flows, family requests, teacher session actions, credit balances | admin · teacher · family · student | drives class-update and reminder events | attendance & session reports | **high** — these rules decide who is charged and who is credited | rules engine | Spec 055 |
| **Teacher pay rules** (hour rates, tiers, salary period, late fine) | **NOT in Settings** | Salary computation only | — | salary events (routing only) | payroll reports | ✔ | payroll backend | **Payroll/billing backend** — never teacher-visible, never a frontend calculation |
| `rate_student_absent` (% of class price added to teacher salary) | **NOT in Settings** | Salary computation | — | — | payroll | ✔ | payroll backend | **Payroll backend** |
| **Notification routing** (47 controls) | Admin · System Settings | Every notification the product sends: course events, the 9 class events per recipient, reminders, invoice + invoice reminders, salary events, family status | admin · teacher · family | **this IS the notification impact** | delivery reports | ✔ | notification service + WhatsApp/email integrations | Spec 053 (channels) · Spec 055 (propagation) |
| **Theme / language** | **Every user (their own)** | That user's whole app | all | — | — | — | **none — already real, local** | — (done) |
| **Brand colours, layout, sidebar, card style** | Admin · System Settings | All role apps ("applies globally to all users") | all | — | — | ✔ | settings store + theme tokens | Spec 055 |
| **Class/session status palette** (11) | Admin · System Settings | Every status chip on every schedule/attendance/session surface, all roles | all | — | report legends | ✔ | settings store + theme tokens · **contrast validation is a hard gate** | Spec 055 |
| **Data import** (teachers, families, children, invoices) | Admin · Security · manage | Creates/updates the core directories | admin | account-creation events | data quality everywhere | **very high** — bulk mutation | import service + validation + dry-run + undo | Spec 043 (privacy) · backend |
| **Backup** (destination + send) | Admin · Security · manage | The database | admin | backup-complete notice | — | **very high** | backup job + mail | backend |
| **Policies** (family, teacher) | Admin · Security · edit | Family portal, teacher portal, onboarding | family · teacher | — | — | ✔ (versioning) | content store | Spec 049 / 050 (portal display) |
| **2FA / OTP** | Admin · Security · manage | Authentication for admins and support; privileged-settings access | admin · staff | OTP delivery | security audit | **very high** | auth backend | Spec 043 · auth backend |
| **Users & roles / permissions** | Admin · Users · manage | Every admin surface's visibility and write access | admin · staff | — | — | **very high** | RBAC backend | Spec 043 |
| **Payment methods** (per gateway) | Admin · Payment Methods · manage | Family billing, admin finance, invoices, checkout | admin · family | invoice + payment events | revenue reports | **very high** — money | payments backend + gateway | Spec 053 · payments backend |
| **Payout providers** | Admin · Integrations · manage | Teacher salary disbursement | admin | salary events | payroll reports | **very high** | payouts backend | Spec 053 · payroll backend |
| **WhatsApp integration** | Admin · Integrations · manage | Broadcasts, class reminders, invoice notices, family communication, announcements | admin · teacher · family | **enables the WhatsApp channel** in the notification matrix | delivery reports | ✔ | WhatsApp provider + pairing | Spec 053 |
| **Email / SMTP integration** | Admin · Integrations · manage | All outbound mail: reminders, invoices, reports, backups | admin · teacher · family | **enables the E-mail channel** | delivery reports | ✔ | SMTP + secret storage | Spec 053 |
| **Meeting integration** (Zoom / Google Meet) | *(no legacy Settings evidence)* | Session creation, teacher dashboard, student/family join surfaces | all | join reminders | attendance | ✔ | meeting provider | **Spec 054 — Embedded Virtual Classroom** |
| **Message templates** (message-builder) | Admin | Every templated message on every channel | all | template content | — | ✔ | template engine | **Spec 053** (no legacy evidence — 504) |

## Cross-cutting notes

1. **Timezone and the automation rules are the two highest-leverage non-credential settings.** Both silently change behaviour for every role. Both must carry prominent inline help now, and a change-confirmation when they become real.
2. **Integrations gate the notification matrix.** Choosing WhatsApp or E-mail for an event is meaningless until that provider is connected. The matrix must say so — and must never imply the channel is live.
3. **Nothing here is propagated in Spec 040.** Every value is inert. The only genuinely live settings are theme and language, which already propagate through the existing mechanism.

# Legacy Management / Content / Certificates / Settings Coverage — Spec 031

Legacy capability → evidence → current module → disposition → owner. Grounded via the 8-agent audit (`visual-grounding.md`). **Not a pixel clone** — capability coverage only. Dispositions obey the binding law (no fake persistence/secret/file/PDF/generation; no salary figure).

Disposition legend: **DO**=display-only row · **RD**=read-only drawer · **MOD**=backendRequired modal · **GATE**=disabled-with-reason / backendRequired gate · **FOLD**=fold into existing page · **FB**=future-backend · **EXCL**=intentionally-excluded.

## A. Staff / Users / Roles / Permissions

| # | Legacy capability | Evidence | Current | Disposition | Owner | Fix in 031? |
|---|---|---|---|---|---|---|
| A1 | Staff/Admins list (kebab: Show-activity/Edit-perms/Category/Edit/Duplicate/Delete) | `pages/management-admins.md`; `html/raw/management-admins.html:2485-2502` | nav `staff` planned | DO + row-kebab | 031 | Yes |
| A2 | Add/Edit staff (name/email/username/phone/**password**/**salary**/role/status/2FA) | `management-admins-create.md:70-91,123`; `-6-edit.md:70-92` | — | MOD (**omit password + salary**) | 031 | Yes |
| A3 | Duplicate-with-permissions (source_id clone) | `management-admins-duplicate-6.md:70-124` | — | MOD (or fold into Add) | 031 | Yes |
| A4 | RBAC permission matrix (~170 checkboxes / ~17 groups) | `management-admins-permission-6.md:37-341` | — | DO matrix + Save GATE (no engine) | 031 | Yes |
| A5 | Category-scope (student/teacher visibility) | `management-admins-categories-6.md:70-84` | — | RD + assign GATE | 031 | Yes |
| A6 | Activity log (filterable audit, GET-only) | `management-admins-appear-6.md:36-136` | — | DO/RD | 031 | Yes |
| A7 | Delete staff (method-spoofed DELETE) | `html/raw/management-admins.html:2501-2552` | — | GATE (confirm) | 031 | Yes |
| A8 | Role enum (Manager/Accountant/Supervisor/Support) — no definition CRUD | `management-admins-create.md:123` | — | DO field in MOD | 031 | Yes |
| A9 | Activate/Deactivate (status select — no isolated route found) | `management-admins-create.md` status field | — | GATE (confirm) | 031 | Yes |
| A10 | Invite / Reset-password | **no legacy flow found** | — | FB (no password field) | future-backend | Record |

## B. Materials / Books / Library

| # | Legacy capability | Evidence | Current | Disposition | Owner | Fix in 031? |
|---|---|---|---|---|---|---|
| B1 | Materials = subject catalog (name/name_ar, no files) | `management-materials.md`(+create/edit) | nav `materials` planned → `materials.html` route | DO + MOD (name only) | 031 | Yes |
| B2 | Library = book/media catalog (name/type/category/published/views/downloads/status) | `management-library.md:153-171` | nav `books` planned → `library.html` route | DO (count literals) | 031 | Yes |
| B3 | Add-Material (**file + thumbnail `type=file`**) | `management-library.md:104-121,216-222` | — | GATE (**no `type=file`**) | 031 | Yes |
| B4 | Library category CRUD (name/type) | `management-library.md:88-102,198-209` | — | RD + MOD (name only) | 031 | Yes |
| B5 | Material details modal (educational-use disclaimer) | `management-library.md:211-214` | — | RD (re-author neutrally) | 031 | Yes |
| B6 | Upload/Download/Delete/Publish per-row | `management-library.md` Actions col (empty capture) | — | GATE (no file/download/publish) | 031 | Yes |
| B7 | Teacher/Student library browse | `frontend-planning/03:157,181` | already built (portal, read-only) | (not 031) | 025/portal | No |

## C. Certificates

| # | Legacy capability | Evidence | Current | Disposition | Owner | Fix in 031? |
|---|---|---|---|---|---|---|
| C1 | Certificate Requests queue | `management-certificate-requests.md:99-110` | nav `certificateRequests` planned | DO | 031 | Yes |
| C2 | Approve/Reject (template select + **live PDF preview** + WhatsApp send) | `html/raw/management-certificate-requests.html:2804-2934` | — | GATE (no PDF/send/mutation) | 031 | Yes |
| C3 | Templates list (name/background/usage-count) | `management-pdf.md:95-106` | nav `certificates` planned → `certificates.html` route | DO + Edit/Delete GATE | 031 | Yes |
| C4 | **Designer** (jQuery-UI drag-drop, NOT canvas; FPDF backend) | `html/raw/management-pdf-create.html:2523-3252` | — | DO static preview + Save MOD (**no drag/canvas/upload**) | 031 | Yes |
| C5 | Direct Create-Certificate (per student-course, bypasses queue) | `management-student-1.md:433-452` | — | MOD | 031 | Yes |
| C6 | Upload-Certificate (`type=file`) | `management-student-1.md:160-170` | — | GATE (no `type=file`) | 031 | Yes |
| C7 | Certificate-Details modal (Options col, empty capture) | `management-student-1.md:644,833-836` | — | RD (non-actionable Options) | 031 | Yes |
| C8 | Teacher request-certificate (queue origin) | `form-inventory.md:20247-20257` | teacher portal | EXCL (pre-seed fixture rows) | 025/portal | No |
| C9 | Family cert-notification toggles | `form-inventory.md:5856-5859` | family settings | FOLD/adjacent (don't duplicate) | family | No |
| C10 | RBAC "Add/View Certificates" perms | `form-inventory.md:786-787` | — | FOLD into RBAC matrix (A4) | 031 | Yes |
| C11 | Teacher CV `cv_certificates` (name collision) | `form-inventory.md:16061` | teacher onboarding | EXCL | teacher | No |

## D. Settings (general / customization / notifications / security)

| # | Legacy capability | Evidence | Current | Disposition | Owner | Fix in 031? |
|---|---|---|---|---|---|---|
| D1 | General — Academy Identity (name/domain/contact/address/**logo `type=file`**) | `management-settings-general.md:85-108` | `settings.html#set-profile` (partial) | DO + Save GATE; logo GATE (no `type=file`) | 031 | Yes |
| D2 | General — Teacher pay-rate / hour-rate rules | `management-settings-general.md:110-133,214` | — | **EXCL** (finance/pay figure) | 030/excluded | No |
| D3 | General — Courses/Classes automation (+`rate_student_absent` %) | `management-settings-general.md:135-165` | — | DO toggle (no-persist); **EXCL** the salary-% field | 031 | Yes |
| D4 | General — Accessibility/2FA (`tfa`+`otp`) | `management-settings-general.md:167-181` | `settings.html#set-account` (disabled 2FA) | GATE (extend existing) | 031 | Yes |
| D5 | Customization — Personalisation (theme/layout/brand/status colors, logo eyedropper) | `management-settings-customisation-personalisation.md:74-121` | `settings.html#set-appearance` (theme/lang real) | DO toggle + Save GATE; theme/lang **preserved real** | 031 | Yes |
| D6 | Customization — Message Builder | `...message-builder.md` (**504, 0 fields**) | — | EXCL / generic FB gate (no invented fields) | future-backend | Record |
| D7 | Notifications — ~47-field event×role×channel matrix (incl. `salaries` toggle) | `management-settings-notification.md:74-127` | `settings.html#set-notif` (partial) | DO toggle (figure-free) + Save GATE | 031 | Yes |
| D8 | Security — Family/Teacher Policy documents (WYSIWYG) | `management-settings-security-policy.md:39-77` | — | DO static text + edit GATE (no live editor) | 031 | Yes |
| D9 | Users & Staff (nested last in Settings group) | `html/raw/management-admins.html:1846-1889` | nav `settingsUsers` planned + `#set-roles` preview | FOLD → the ONE staff home (A1); alias duplicate (B-16) | 031 | Yes |

## E. Integrations / Backup / Payment-gateway settings

| # | Legacy capability | Evidence | Current | Disposition | Owner | Fix in 031? |
|---|---|---|---|---|---|---|
| E1 | Integrations catalog (11 provider cards) | `management-settings-integrations.md:39-52` | nav `settingsIntegrations` planned | DO locked-placeholder cards | 031 | Yes |
| E2 | Payment-gateway configure (Stripe/Paypal/Mollie/Xpay/Payoneer/Paymob/Custom — key1-4/api_key) | `...integrations-{2..7,10}-configure.*` | — | FB (no credentials, no config surface) | future-backend/030-boundary | Record |
| E3 | Payout-provider configure (Paymob/Payoneer — Webhook/OAuth/`type=password`) | `...integrations-8/9-configure.md` | — | FB (no credentials/webhook) | future-backend | Record |
| E4 | WhatsApp connect (pairing wizard + status + test-send) | `...integrations-1-configure.md` | nav (WhatsApp under integrations) | DO locked status card + FB gate (no phone/wizard) | 031/FB | Yes (card) |
| E5 | WhatsApp Insights (Families/Teachers — real PII) | `...whatsapp-{families,teachers}-insights.md` | — | DO status (authored fake data only) | 031 | Yes |
| E6 | Email/SMTP integration (`smtp_password` type=password) | `...integrations-11-configure.md` | — | FB (no credentials) | future-backend | Record |
| E7 | Backup Settings (1-click LMS export via `backup_email`) | `management-settings-security-data.md:40,57` | — | **EXCL/FB** (no backup, no email input) | future-backend | Record |
| E8 | Import Data (4×`type=file`; family template `password:123456`) | `management-settings-security-data.md:93-230` | — | **EXCL/FB** (no `type=file`, no template) | future-backend | Record |

## F. Content / Lookups

| # | Legacy capability | Evidence | Current | Disposition | Owner | Fix in 031? |
|---|---|---|---|---|---|---|
| F1 | Expense Heads (name/status lookup; head_id filter) | `management-heads.md`; `management-expense.md:47` | no nav item | DO + MOD (**name/status only, no amount**) | 031 (per 030 register) | Yes if surfaced |
| F2 | Locations (RBAC group name only, no page) | `management-admins-permission-6-full.png`; `024` B-02 | no nav item | FOLD → settings-general display slice | 031 | Yes (slice) |
| F3 | Content (static) — only Policy + Personalisation are real editors | `role-map.md` | — | (covered by D5/D8) | 031 | — |

## Ownership tensions (resolved)
- **Expense-heads**: Spec-016 (old numbering) placed it under finance; **`030/future-owner-register.md:24` re-deferred it to 031** (most-recent, authoritative) → **031 owns it, figure-free**.
- **settingsUsers vs staff** (B-16): two nav spots for one capability → **031 names ONE staff home** and aliases/folds the duplicate.
- **Locations** (B-02/M-04): no page evidence → **fold slice into settings-general**, not a dedicated page.
- **teacher-library** (B-05): owned by **Spec 025**, not 031 — do not double-count.

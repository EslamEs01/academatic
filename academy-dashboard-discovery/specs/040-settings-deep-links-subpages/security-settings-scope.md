# Security Settings — Scope (Spec 040)

**Nav id** `settingsSecurity` · **Route** `settings.html#view=security` · **Surface** the existing `security` tab · **Count impact** 0

Legacy: `/management/settings/security/data` (**6 visible fields**) + `/management/settings/security/policy` (**2 editors**). This is where the rebuild must be **safer** than the original, not merely equivalent.

## A — Backup

| Legacy | Detail |
|---|---|
| `backup_email` | type=email, placeholder `backup@…`; **not inside any `<form>`**; saved by an AJAX `PATCH …/backup/update` |
| `Save changes` | AJAX write |
| **`Send Backup`** | a plain `<a>` → `GET …/backup/send` — **fires a real database backup with NO confirmation**, and the route is a **302 into the Email/SMTP integration page** |

**Spec 040**: render the backup **destination** field (inert) and a `Save` gate. **Send Backup = confirmation modal → backendRequired gate.** No backup is claimed to start; no redirect; no SMTP surface anywhere near it.

## B — Data import (4 types)

Legacy: 4 multipart forms → `POST /settings/security/data/import`, each `type` + `file` (`accept=.xlsx`, required).

| `type` | Legacy card title | Real target | Template link |
|---|---|---|---|
| 1 | Upload teachers | teachers | ✔ |
| 2 | Upload families | families | ✔ |
| 3 | Upload children | children | ✔ |
| 4 | **"Upload families"** — *mis-titled* | **invoices** (`invoices_file`) | ✘ |

**Spec 040**: four **correctly and distinctly labelled** import types. Each shows its purpose, its accepted format, and a **required-column reference** the admin can read before preparing data. **`type="file"` = 0** — the Upload action and the Download-template action are both `data-disabled-reason` gates.

### The column contracts — and the two columns that must NOT be published

| Import | Legacy columns | Rebuild |
|---|---|---|
| Teachers (10) | id, first_name, last_name, email, phone, gender, status, timezone, currency, **`hour_rate`** | render 8 — **omit `hour_rate` and `currency`** (teacher pay-free law) |
| Families (15) | id, name, user_name, **`password`**, email, phone, status, country_id, timezone, currency, **`hour_rate`**, total_hours, invoice_type, course_type, payment_method | render 11 — **omit `password` (no-secret law) and `hour_rate` / `currency` (pay law)** |
| Children (7) | id, name, parent_id, age, gender, language, status | render all 7 |
| Invoices (7) | id, parent_id, price, currency, status, due_date, note | render as a **structure reference only**; this is finance-owned and carries no computed money in Settings |

**This is a law-level finding**: publishing the legacy column contract verbatim would put a plaintext `password` column and an `hour_rate` pay column on screen, breaching two standing laws in one table. The omitted columns are backend-owned — **privacy → Spec 043**, **pay → the payroll backend** — and are recorded in the future-owner register.

Legacy has **no validation preview, no dry-run, no mapping UI and no undo** — and, per the deep corpus, "**no bulk-import action has a confirmation dialog — the highest risk item in this batch**". Spec 040 requires a **confirm before the gate** on every import.

## C — Policy documents

Legacy: two **Quill** rich-text editors (`Family Policy`, `Teacher Policy`), both empty and **both disabled on load**; a pencil button enables one and reveals a Submit that **posts both policies together** (`family_privacy` + `teacher_privacy`) and pops a "Policies updated successfully" alert.

**Spec 040**: both policies render as **display-only documents** with a gated Edit. **No rich-text editor engine is introduced** (no new dependency — standing law). The two documents are presented as **independently owned**, not silently co-submitted. No versioning or last-updated is invented (no evidence).

## D — Two-factor authentication

Legacy: `tfa` (checkbox, **disabled**, "No WhatsApp Connected") + a hidden `otp` phone field, on an inert tab whose Save card is hidden — while the page copy promises password complexity and session timeouts **that do not exist**.

**Spec 040**: 2FA is an **honest gate** (the unused locale keys `adm.set.sec.tfa|tfaReason` already exist). Per Spec 033's security acceptance — *"no secret/OTP control"* — **no OTP entry field is rendered**, and no working 2FA control exists. The legacy **shared-OTP-phone-for-all-admins** anti-pattern is recorded, never reproduced. No copy promises a capability that is not present.

## Honesty contract for this tab

| Action | Class |
|---|---|
| Save backup destination | gate |
| **Send backup** | **confirm → gate** |
| Upload (×4) | **confirm → gate** |
| Download template (×4) | gate (no file leaves the page) |
| Edit / publish policy | gate |
| Enable 2FA | gate |
| Reset demo data (existing) | confirm, no mutation (unchanged) |

**Forbidden**: fake import, fake backup, fake policy save, fake success wording, any real file input, any secret, any destructive action without a confirm.

Real security enforcement and field-level PII isolation are **not** widened into here — they are owned by **Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching**.

## Field accounting

6 evidenced fields + 4 import types + 2 policies + 2 auth fields → backup destination **rendered**; 4 import types **rendered with gated actions**; 2 policies **rendered display-only**; `tfa` **gated**; `otp` **not rendered (by law)**; 3 column names **omitted by law**.

# Future-Owner Register — Spec 031

Every out-of-scope action, page, or engine assigned to an owner: **future-backend**, **Spec 032 (final QA)**, or **intentionally-excluded**. 031 renders these as honest gates/records — never a mocked engine, secret, upload, or file.

## → future-backend (real engines 031 gates but never builds)
| Item | Legacy evidence | Why future-backend | 031 honest replacement |
|---|---|---|---|
| Real auth / user account engine | `management-admins-create.md` (password) | no real auth in scope | Add/Edit staff = modal (no password); Deactivate/Delete = confirm |
| Real role/permission engine (170-checkbox RBAC) | `management-admins-permission-6.md` | no permission enforcement | display-only grouped matrix + Save gate |
| Reset-password / Invite | (no legacy flow found) | credential handling | future-backend gate (no password field) |
| Real file upload/storage/download | `management-library.md` (file+thumbnail), Import (4×file) | no file engine | Upload/Download = gate; **no `type=file`** |
| Real PDF / certificate generator (FPDF) | `management-pdf-create.html:3018-3025` | no generation engine | static designer preview; Generate/Preview/Download = gate |
| Real certificate approval + WhatsApp dispatch | `management-certificate-requests.html:2804-2934` | no approval/dispatch engine | Approve/Send = gate; no mutation, no send |
| Payment-gateway connectors (Stripe/Paypal/Mollie/Xpay/Payoneer/Paymob/Custom) | `...integrations-{2..7,10}-configure.*` | secrets/credentials (Spec-030 boundary) | locked-placeholder card; Configure = gate; **no credentials** |
| Payout-provider connectors (Paymob/Payoneer Payout) | `...integrations-8/9-configure.md` | webhook/OAuth secrets | locked-placeholder; Configure = gate; **no webhook/secret** |
| WhatsApp integration (pairing/connect/test-send) | `...integrations-1-configure.md` | live connection | locked status card; Connect/Test = gate; no phone/wizard |
| Email/SMTP integration | `...integrations-11-configure.md` (`smtp_password`) | credentials | locked-placeholder; Add-account/Test = gate; **no `type=password`** |
| Notification delivery engine | `management-settings-notification.md` | no delivery | display toggles + Save gate; no "sent" |
| Backup / restore | `management-settings-security-data.md` (backup_email, Send) | destructive/data engine | excluded/gate; no email input, no Send |
| Import data (CSV/XLSX) | `management-settings-security-data.md` (4×file, template) | bulk-account creation | excluded/gate; **no `type=file`, no template** |
| Message Builder | `...message-builder.md` (504) | no evidence | generic gate; **no invented fields** |
| Real settings persistence | `management-settings-general.md` (Save) | no backend | Save = gate; toggles authored-state only |

## → intentionally-excluded (never built, never mocked)
| Item | Why | Note |
|---|---|---|
| `type="password"` / `type="file"` controls | binding law | never rendered on any 031 surface |
| API key / secret / webhook / token values | binding law | never rendered; locked placeholders only |
| Salary / payout / compensation **figures** | finance/pay law | staff salary field omitted; expense-heads name/status only; Notifications `salaries` figure-free |
| Teacher hour-rate / salary-period / `rate_student_absent`-% (settings general) | finance/pay law | omitted; "managed in Finance" pointer at most |
| Certificate `<canvas>` / jQuery-UI drag designer | no-canvas / no-generation | static preview only |
| Import-Data family template (`password:123456`) | credential/PII leak | never shown |
| Real PII from legacy captures (emails/phones/names) | privacy | fixtures are authored fake data |
| Backup/restore engine | destructive | excluded |

## → owned by other specs (do not duplicate)
| Item | Owner | Note |
|---|---|---|
| teacher-library | Spec 025 | already built |
| family cert-notification toggles | family settings | adjacent |
| teacher CV `cv_certificates` | teacher onboarding | name collision only |
| teacher request-certificate (queue origin) | teacher portal | pre-seed fixture rows |
| payment / payout / bank / salary **figures** | Spec 030 | finance.html only |
| pay-rate rules | Spec 030 / excluded | finance domain |

## → Spec 032 (final QA)
| Item | Note |
|---|---|
| Residual stale-map / final coverage sweep | after 031 ships |
| Any 031 page-candidate deferred at planning | re-verify in 032 |

## Boundary note — Expense-heads ownership (resolved)
Spec-016's original (old-numbering) schedule placed the expense/heads GATE under the finance spec; **`030/future-owner-register.md:24` re-deferred the real Heads lookup to 031** ("Content/lookup admin adjacent to expense — 031 if surfaced"). As the most-recent authoritative decision, **031 owns expense-heads** as a figure-free name/status lookup. This supersedes the earlier finance placement and is recorded here to avoid a mis-read as a duplicate/conflicting assignment.

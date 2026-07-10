# Future-Backend / Excluded Form Register — Spec 032

Fields and actions that **cannot safely be shown as a working control** and therefore stay omitted or gated even when their parent form gains real fields. Grounded in `output/combined/form-inventory.md` + integration-configure evidence. Two rules:
- **MUST-OMIT** — the field is never rendered on any rebuilt form (real-auth credential, pay/salary figure, computed total).
- **MUST-GATE** — the affordance stays a `data-disabled-reason`/backendRequired gate (file upload, PDF/canvas generation, live pairing) — no working control, no form field.

## MUST-OMIT fields (never rendered)
| Field(s) | On form(s) | Evidence | Reason |
|---|---|---|---|
| `password` | family, teacher, staff create+edit | :5628, :16019, :569 | real-auth credential (no `type=password` law) |
| `salary`, currency (paired) | staff | :569 | staff pay figure (pay-free law) |
| `fixed_salary`, `salary_type`, `hour_rate`, `fine_per_hour` | teacher | :16019 | teacher compensation figures (pay-free GLOBAL) |
| `teacher_hour_rate`(+type), `t_hour_rate` | course, group | :2955, :7820 | per-course/group teacher compensation |
| `salary_period_type/day`, `applayFins`, `fin[10]` | settings general "teachers" fieldset | :13136 | salary-period/fine config |
| notification `salaries` toggle | settings notifications | :13689 | payroll-adjacent toggle |
| `zoom_password`, `zoom_client_secret`, `zoom_*` | teacher | :16019 | live-room credentials (no fake live room) |
| `payout_*`, `paymob_*`, `payoneer_*` | teacher, integrations 8/9 | :16019, integrations-8/9 | payout-provider account details (never mocked) |
| gateway `key1`/`key2` (Client ID/Secret), `Payment Details` | settings/payments, integrations 2-7 | :13814, integrations-2..7 | payment-gateway credentials |
| SMTP `username`/`password`/host | integrations 11 (Email) | integrations-11 | mail credentials |
| `otp` (2FA) | settings accessibility | :13106 | real-auth 2FA |
| computed `Total` (`basic+additional+taxes`) | Record Payment | :9853 | money arithmetic (no computed total) |

## MUST-GATE affordances (stay a gate; no working control)
| Affordance | On surface | Evidence | Gate reason |
|---|---|---|---|
| `type=file` (cv_file, cv_certificates) | teacher form | :16019 | no real upload |
| `type=file` (background) + canvas WYSIWYG designer (`json_data`, posX/Y/W, font/color) | certificate template | :12071 | no upload, no canvas/engine — Spec-031 renders a STATIC preview only |
| PDF preview/download/generate/send | certificate approve modal | certApproveModal | no client PDF generation |
| `type=file` (file, thumbnail) | library item | :10922 | no real upload |
| `type=file` (logo) | settings general | :13115 | no real upload |
| WhatsApp phone-pairing wizard | settings integrations 1 | integrations-1 | no live pairing/QR |
| Record Payment (whole form) | invoice list | :9853 | computed total + money movement → stays a full gate |

## Future-backend actions (no form; documented gate/owner)
| Action | Owner | Reason |
|---|---|---|
| reset-password · invite · login-as · 2FA | future-backend | real auth |
| integration connect/disconnect/test/configure (gateway/payout/SMTP/WhatsApp) | future-backend | real connectors + credentials |
| generate/download/print/export/PDF/CSV/Excel · upload/import · backup/restore | future-backend | real file/report generation + storage |
| notification send / message-builder | future-backend | real delivery engine |
| messages · leads · tasks · announcements · timeConverter · scheduleSearch (nav) | future-backend | need their own engines |
| studentResult · studentEvaluation · sessionsKpi · monthlyPerf · monthlyReports · dataAnalysis (nav) | Spec-029 planned-gate | deliberate page-candidate rejections; overview/tabs stand in |

## Notable grounded exclusions / substitutions (don't invent)
- **Add-Note**: no standalone legacy form → reuse the entity's own `notes`/`admin_note`/`teacher_note` field, not a new entity.
- **create-group-from-course**: no distinct endpoint → prefilled group form.
- **group edit**: no legacy edit route → reuse the group create field set.
- **teacher-side feedback category**: create form not crawled → reuse the family-category name/status/description shape (flagged inferred).

**Every future-backend/excluded item has evidence + a MUST-OMIT/MUST-GATE reason. No item is silently dropped.**

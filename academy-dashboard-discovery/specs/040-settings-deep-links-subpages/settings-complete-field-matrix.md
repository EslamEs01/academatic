# Settings Complete Field Matrix (Spec 040)

**The completeness law**: every evidenced field resolves to exactly one disposition — **R** rendered · **S** structure-only (sensitive; label + requirement + purpose, never an input) · **G** gated action (no input) · **X** omitted by law (with a named owner). **Silent omission is a defect.** No field may be rendered that is not evidenced.

Evidence key: `RAW` = the raw legacy HTML record (authoritative input names) · `SHOT` = the legacy screenshot (opened) · `CORPUS` = the deep-planning corpus.

## Totals

| Domain | Evidenced | R | S | G | X | Invented |
|---|---|---|---|---|---|---|
| General | 41 | 28 | 0 | 2 | 11 | 0 |
| Notifications | 47 | 47 | 0 | 0 | 0 | 0 |
| Customization | 17 distinct (35 visible) | 15 + 2 real | 0 | 0 | 0 | 0 |
| Security | 6 fields + 4 imports + 2 policies + 2 auth | 8 | 0 | 10 | 4 (3 columns + `otp`) | 0 |
| Users | RBAC preview + 1 link | all | 0 | mgmt actions | 0 | 0 |
| Integrations + payment methods | 11 providers · 44 provider fields | 20 | **17** | all finals | 0 | 0 |

## 1. General (41)

| # | Field (`RAW`) | Type | Req | Default | Validation | Help / impact | Disp. | Owner if X |
|---|---|---|---|---|---|---|---|---|
| 1 | `company_name` | text | ✔ | — | non-empty | shell, invoices, certificates | **R** | |
| 2 | `company_name_ar` | text | ✔ | — | non-empty | the Arabic surface | **R** | |
| 3 | `domain` | text | ✔ | — | hostname | public address | **R** | |
| 4 | `email_info` | text | ✔ | — | email | reply-to on outbound mail | **R** | |
| 5 | `phone` | text | ✔ | — | phone | shown to families | **R** | |
| 6 | `whatsapp` | text | ✔ | — | phone | used by the WhatsApp integration | **R** | |
| 7 | `logo` | file | — | — | image | shell + documents | **G** | upload → backend |
| 8 | `country_id` | select (251) | ✔ | Egypt | one-of | — | **R** | |
| 9 | `city` | select (27) | ✔ | — | one-of; depends on 8 | — | **R** | |
| 10 | `timezone` | select | — | — | one-of | **changes every class's admin time & date** | **R** | |
| 11 | `address` | text | — | — | — | — | **R** | |
| 12–21 | `settings_data[*]`, `salary_period_type`, `salary_period_day`, `applayFins`, `fin[*]`, tier repeaters | rate/period/fine | — | — | — | teacher pay engine | **X ×10** | payroll backend |
| 22 | `new_course_status` | select | — | Active & unpaid | one-of | course lifecycle | **R** | |
| 23 | `renew` | select | — | On | one-of | course renewal | **R** | |
| 24 | `stop_after` | number | — | 2 | ≥0; requires 23 | unpaid-invoice stop | **R** | |
| 25 | `send_plan_report` (completed course) | toggle | — | off | — | report to management | **R** | |
| 26 | `send_plan_report` (monthly plan — **legacy duplicate name/id**) | toggle | — | off, disabled | — | depends on WhatsApp | **R** (renamed, integration-gated) | |
| 27 | `teacher_cancel_enable` | toggle | — | off | — | teacher cancellation | **R** | |
| 28 | `student_cancel_enable` (labelled "Family") | toggle | — | off | — | family cancellation | **R** | |
| 29 | `auto_makeup` | select | — | Auto makeup | one-of | runs daily; drives make-up | **R** | |
| 30 | `auto_add_makeup_to_credit` | toggle | — | **on** | — | credit | **R** | |
| 31 | `auto_add_no_makeup_to_credit` | toggle | — | **on** | — | credit | **R** | |
| 32 | `classes_not_closed` | select | — | 0 | one-of | unclosed classes | **R** | |
| 33 | `classes_not_closed_hours` | number | — | 12 | ≥1; requires 32 | — | **R** | |
| 34 | `teacher_cancel_before_class` | number (min) | — | 120 | ≥0 | cancellation window | **R** | |
| 35 | `student_cancel_before_class` | number (min) | — | 120 | ≥0 | cancellation window | **R** | |
| 36 | `teacher_absent_student` | toggle | — | off | — | absence rule | **R** | |
| 37 | **`rate_student_absent`** | number **%** | — | 50 | — | **"% of the class price added to the teacher's salary"** | **X** | payroll backend |
| 38 | `show_enter_btn` | number (min) | — | 5 | ≥0 | pre-class entry | **R** | |
| 39 | `teacher_can_edit_class` | select | — | As teacher profile | one-of | — | **R** | |
| 40 | `tfa` | checkbox | — | off, disabled | — | 2FA | **G** (on Security) | auth backend |
| 41 | `otp` | text (hidden) | — | — | — | OTP phone | **X** | auth backend — Spec 033: *"no secret/OTP control"* |

Plus (retained, Spec 031): expense heads — name + status, **no amount**.

## 2. Notifications (47) — see `notification-routing-matrix.md`

All **47** are **R** (inert controls, one gated Save). The `salaries` row is routing-only: **no figure, no rate, no amount.**

## 3. Customization (17 distinct)

| Field | Type | Disposition |
|---|---|---|
| `theme` | radio ×3 (light/dark/**system**) | **R — REAL**, persists via `academy.theme`. Labelled a personal preference. |
| *(language)* | our equivalent | **R — REAL**, persists via `academy.lang` |
| `color_scheme` | colour + hex | **R** display-only + gated Save |
| `secondary_color_scheme` | colour + hex | **R** display-only + gated Save |
| `container_layout` | radio ×2 | **R** display-only + gated Save |
| `sidebar_type` | radio ×2 | **R** display-only + gated Save |
| `card_style` | radio ×2 | **R** display-only + gated Save |
| `class_statuses_colors[…]` ×11 | colour | **R** display-only palette + gated Reset (confirm) — **icon + text always accompanies colour** |
| *Pick from logo* ×2 | action | not rebuilt (depends on a real logo upload) — recorded |

## 4. Security

| Item | Disposition |
|---|---|
| `backup_email` | **R** (inert) |
| Save backup destination | **G** |
| **Send backup** | **confirm → G** |
| Import ×4 (`teachers`, `families`, `children`, `invoices`) — `type` + `file` | type **R** (labelled correctly); **file = G** (`type="file"` = 0) |
| Upload ×4 | **confirm → G** |
| Download template ×4 | **G** |
| Column references | **R**, minus the omissions below |
| `password` column (families import) | **X** — no-secret law → Spec 043 |
| `hour_rate` column (teachers + families imports) | **X ×2** — teacher pay-free law → payroll backend |
| `currency` column (pay-coupled) | **X** — pay law |
| Family policy / Teacher policy | **R** display-only, independent; edit = **G**; no rich-text engine |
| `tfa` | **G** |
| `otp` | **X** |

## 5. Users

RBAC role/permission preview (display-only, no enforcement claimed) + **one real anchor** to `staff.html`. Management actions = **G**. The staff directory is **not** duplicated here.

## 6. Integrations + payment methods

Full detail in `integration-provider-field-matrix.md`. Summary: **11 providers**; **17 sensitive fields → S** (structure-only rows); **20 non-sensitive fields → R**; every Save / Connect / Test / Activate / Delete → **G** (Delete and Disconnect additionally **confirm → G**). **Zero** key/secret/token/webhook-secret values are authored anywhere. **Zero** `type="password"`.

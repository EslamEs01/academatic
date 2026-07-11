# General Settings — Scope (Spec 040)

**Nav id** `settingsGeneral` · **Route** `settings.html#view=general` (EN: `settings.en.html#view=general`) · **Surface** the existing `general` tab · **Count impact** 0

Legacy: `/management/settings/general`, **4 tabs, 41 visible fields**, 4 separate `PATCH` endpoints, 4 separate `Save changes` buttons with **no cross-tab dirty state**.

## Group A — Academy identity (11 fields) → **RENDER ALL**

| Legacy name | Label | Type | Req. | Default (legacy) | Validation | Help | Current app | Disposition |
|---|---|---|---|---|---|---|---|---|
| `company_name` | Academy name | text | ✔ | — | non-empty | shown on shell, invoices, certificates | display row | **render** (input) |
| `company_name_ar` | Academy name (Arabic) | text | ✔ | — | non-empty | used on the Arabic surface | **absent** | **render (new)** |
| `domain` | Domain | text | ✔ | — | hostname shape | public address of the academy | display row | **render** |
| `email_info` | Contact email | text | ✔ | — | email shape | reply-to on outbound mail | display row | **render** |
| `phone` | Phone | text | ✔ | — | phone shape | shown to families | display row | **render** |
| `whatsapp` | WhatsApp number | text | ✔ | — | phone shape | used by the WhatsApp integration | display row | **render** |
| `logo` | Academy logo | **file** (`accept=image/*`) | — | 404 in legacy | image | shell + documents | gated button | **GATE** — no `type=file` (law) |
| `country_id` | Country | select (251 opts) | ✔ | Egypt | one-of | — | display row | **render** (authored option list) |
| `city` | City | select (27 opts) | ✔ | — | one-of | depends on country | display row | **render** (conditional on country) |
| `timezone` | Timezone | select | — | — | one-of | **"changing the timezone changes every class's admin time & date"** — must be surfaced | display row | **render** + prominent help |
| `address` | Address | text | — | — | — | — | display row | **render** |

Also retained: the existing **expense-heads** lookup (name + status, **no amount**) — a Spec 031 surface, unchanged.

## Group B — Teacher pay rules (10 fields) → **OMITTED BY LAW. All 10.**

Legacy tab "Teachers" is a complete teacher-pay engine. Recorded here so the omission is deliberate and auditable, never rebuilt:

| Legacy name | What it is |
|---|---|
| `settings_data[1]` (+ dynamic `settings_data[<hours>]`) | Default session rate + **hour-rate tiers** ("if greater than N hours, rate becomes X") |
| `salary_period_type` | Pay period (`monthly` / `custom_day`) |
| `salary_period_day` | Pay-period day (28 options; "1th…28th" ordinal bug) |
| `applayFins` *(sic)* | Enable the late-start **fine** |
| `fin[10]` (+ dynamic `fin[<minutes>]`) | **Discount/fine %** applied when a teacher starts late |
| repeater rows (`.hours-input` / `.rate-input`) | Tier editors |

**Rule**: no hour-rate, rate tier, salary period, fine or pay figure may appear on any Settings surface. The **only** permitted trace is the existing non-numeric pointer that teacher pay rules are managed in Finance. **Owner**: the future payroll/billing backend spec (the same owner as the `classSalaryReport` lock).

## Group C — Course & class automation (18 fields, 17 distinct names) → **RENDER 17, OMIT 1**

| Legacy name | Label | Type | Options / default | Disposition |
|---|---|---|---|---|
| `new_course_status` | Status after renewal | select | 0 Inactive · 1 Active · **2 Active & unpaid** ✓ · 6 Free | **render** |
| `renew` | Renew unpaid courses | select | 0 Off · **1 On** ✓ · 2 As family profile | **render** |
| `stop_after` | Stop after N unpaid invoices | number | 2 | **render** (conditional on `renew`) |
| `send_plan_report` | Completed-course report to management | toggle | — | **render** |
| `send_plan_report` **(duplicate name + id)** | "monthly plan" — disabled, "No WhatsApp Connected" | toggle | — | **render as a distinct, correctly-named control**, gated on the WhatsApp integration (the legacy duplicate-name bug is not reproduced) |
| `teacher_cancel_enable` | Teacher may cancel | toggle | off | **render** |
| `student_cancel_enable` | Family may cancel *(legacy names it `student_*` but labels it "Family")* | toggle | off | **render**, named honestly for its real recipient |
| `auto_makeup` | Automatic cancel behaviour | select | 0 No action · **1 Auto makeup** ✓ · 2 No make-up · 3 Teacher absent | **render** + help (legacy runs it at 04:00 daily) |
| `auto_add_makeup_to_credit` | Add make-up to credit | toggle | **on** | **render** |
| `auto_add_no_makeup_to_credit` | Add no-make-up to credit | toggle | **on** | **render** |
| `classes_not_closed` | Unclosed-class action | select | **0** ✓ · 2 · 3 (no `1`) | **render** |
| `classes_not_closed_hours` | …after N hours | number | 12 | **render** (conditional) |
| `teacher_cancel_before_class` | Teacher cancellation window (min) | number | 120 | **render** |
| `student_cancel_before_class` | Family cancellation window (min) | number | 120 | **render** |
| `teacher_absent_student` | Teacher-absent-student rule | toggle | off | **render** |
| **`rate_student_absent`** | **"Teacher Absent Student Class Rate" = 50 % — "what percentage of the class price is added to the teacher's salary"** | number (%) | 50 | **OMITTED BY LAW — this is a pay field hiding in the automation tab.** Owner: payroll backend |
| `show_enter_btn` | Pre-class entry window (min) | number | 5 | **render** |
| `teacher_can_edit_class` | Teacher may edit a class | select | 0 Off · 1 On · **2 As teacher profile** ✓ | **render** |

**This entire group is absent from the current app.** Four unused locale keys (`adm.set.gen.automationTitle|autoRenew|autoMakeup|autoClose`) prove it was always intended.

## Group D — Accessibility / 2FA (2 fields) → **GATE BOTH**

| Legacy name | Label | Type | Legacy state | Disposition |
|---|---|---|---|---|
| `tfa` | Two-factor authentication | checkbox | **disabled**, "No WhatsApp Connected" | **honest gate** — no working control |
| `otp` | OTP phone | text (`d-none`) | hidden | **not rendered** — Spec 033's security acceptance is explicit: *"no secret/OTP control"* |

The legacy tab is **inert** (its Save card is hidden) and its copy promises password complexity and session timeouts that do not exist. In the rebuild this lives on the **Security** tab (unused keys `adm.set.sec.tfa|tfaReason` already exist), not as a fake "Accessibility" section.

The legacy corpus also flags a **shared OTP phone for all admins** as a security anti-pattern — recorded, not reproduced.

## Presentation

Inline tab; four titled groups (identity · location · automation · expense heads) with inline help; one **gated** Save. Long-form requirements per `forms-modals-interactions-register.md`. The logo action is a gate, not an upload.

## Field accounting

41 evidenced → **28 rendered** · **1 gated** (logo) · **1 gated, relocated** (2FA) · **11 omitted by law** (10 pay-rule fields + `rate_student_absent`) · **1 not rendered** (`otp`). Zero silently dropped.

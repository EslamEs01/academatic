# Spec 042 — Forms Completeness Ledger (cross-cutting)

**Lens:** FORMS COMPLETENESS. For every create/edit/configure/request/import workflow: the legacy-evidenced
field set vs the current field set, **field by field**. Required/optional/conditional/sensitive. Fields that
**MUST be omitted** (pay-free · no-secret · privacy). Missing validation, help text, dependencies, confirmation.
Every "decorative 2–3-field approximation" of a larger evidenced workflow is flagged.

**Read-only** on `app/**`. The only file written is this one. Baseline HEAD `de8d552` (Spec 041). 115 HTML.

**Method.** Legacy field sets were extracted from the raw crawl records (`output/roles/*/pages/*.json` →
`forms[].fields[]`, and `html/raw/*.html` for modal bodies the JSON collapsed). Current field sets were counted
from the **built** `app/public/*.html` `<template data-preview="…">` bodies and the `app/src/js/**` renderers.
Every count below is reproducible from those paths.

**Dispositions:** COMPLETE_AND_VERIFIED · COMPLETE_BUT_VISUAL_REVIEW_REQUIRED · PARTIAL · MISSING ·
INTENTIONALLY_IMPROVED · HONEST_LOCK · REJECTED_SECURITY · REJECTED_PRIVACY · REJECTED_NO_FAKE ·
REJECTED_PAY_FREE · FUTURE_BACKEND · UNKNOWN_EVIDENCE.

---

## 0. Executive counts

| Metric | Value |
|---|---|
| Legacy create/edit/configure/request/import forms audited | **48** |
| Current form-bearing drawers/panels in the product (`data-preview` with ≥1 `field-label`) | **72 templates** (see §9) |
| `field()` controls rendered sitewide (built HTML `class="field-label"` count) | **~410** across 26 pages (§9) |
| Zero-field pages in the product | **31** (all 8 family-portal + 8 student child-view + 8 teacher-portal internal + 7 admin ops boards: schedule/schedule-search/sessions-analysis/scheduled-actions/public-holiday + index/portals) |
| **PARTIAL** forms (real form, materially fewer fields than evidenced) | **26** |
| **MISSING** forms (evidenced workflow, no capture surface at all) | **13** |
| **Field-less gates standing in for a captured multi-field form** (the Spec-032 "too-early gate" class, finance/ops edition) | **9** (§6) |
| Law-driven omissions correctly enforced (pay/secret/privacy) | **11 field families** (§7) |
| Validation / required-marker / help-text coverage in the product | **~0** (§8) — a systemic gap |
| Owner for the bulk | **056 Complete Forms & Data Capture Audit** (+ 044 long-form host · 043 privacy · 055 propagation) |

**The three most serious findings**

1. **The entire session-outcome + monthly-report + parent-meeting capture chain is field-less** while every
   downstream consumer exists. Admin attend/absent/cancel/edit (legacy **7/13/10/8** fields) and teacher
   end-class / mark-absent / monthly-progress (legacy **5/2/24** fields) all render **0 input controls** — a
   toast, a 0-field confirm, or read-only labels. See §1. Owner 056 + 044 + 055.
2. **Four of the five biggest finance workflows are 0-field gates** (create-parent-invoice **16** fields,
   record-payment **8**, run-teacher-salaries **5**, run-staff-salaries **7** → all **0**). The salary
   selection forms are *pay-free by construction* and could ship honestly today. See §5. Owner 056.
3. **The three highest-control conditional forms in the corpus have no host at all** — scheduled-action create
   (**18** conditional controls), request-schedule (**~52**, incl. 7 weekly slot rows), public-holiday
   (**11**). All three are single field-less `data-disabled-reason` gates. See §6. Owner 044 (conditional
   long-form pattern) + 056.

---

## 1. Session-outcome / class-report / evaluation capture chain (the largest gap)

All legacy field sets below are from `output/roles/admin/pages/management-home.json` (the class-board modals)
and `output/roles/teacher/pages/teacher-home.json` / `teacher-studentslist.json`. Current surfaces from
`app/public/*.html` + `app/src/js/components/outcome-details.js`.

| Capability | Legacy fields (record) | Current | Disp | Owner |
|---|---|---|---|---|
| **Mark attended / record class** | **7** visible: `markAsAttend` radio ×2, `remark`* (select 6), `summary` (ta), `homework` (ta), `notes`, `images[]` file — `management-home.json` FORM[7] `markAsAttended_form` | **0 fields**; `components/outcome-details.js` "تسجيل حضور" = `data-demo-action` toast; the `out*` drawers render 3 display rows (2 select + 1 textarea are *feedback* fields, not the attend fields) | PARTIAL | 056 + 044; persistence FUTURE_BACKEND |
| **Mark absent** | **13**: `absent_by` (select), `note`, `sendMessage` radio ×3, `message` (custom), `add_to_credit`, `cancelTzType` radio ×2, `date`, `time`+H/M — `management-home.json` FORM[9] `markAsabsent_form` | **0 fields**; `studentAbsent`/`teacherAbsent` = `data-confirm` dialogs | PARTIAL | 056 + 044 |
| **Cancel class** | **10**: `cancel_by` (Teacher/Student/**Admin**), `note`, `sendMessage`, `makupclass` (3-button hidden), `add_to_credit`, `cancelTzType` ×2, `date`, `time`+H/M — FORM[11] `cancelClass_form` | **0 fields**; confirm-danger. NOTE: the `sessions.html` row-kebab Cancel is `data-demo-action` with **no confirm** — the one destructive kebab item lacking a confirm | PARTIAL | 056 + 044 |
| **Edit / reschedule class** | **8**: `date`, `time`+H/M, `sendMessage`, `duration`* (15 opts), **`teacher_id`* (reassign)**, `accounting_statement` (Paid/Paid-if-continue/Free) — FORM[10] `editClass_form`, action `/courseClasses/edit-class` | **0 fields**; dashboard/sessions "Edit" = `data-demo-action` toast. The ONLY session form we ship is CREATE (`sess-new`, 7 fields). **Teacher reassignment exists nowhere in the product.** | PARTIAL | 056 — teacher-reassign is the single biggest missing operator control |
| **Add quick queue** | **2** visible: `level` (Urgent/Medium/Normal), `text` (ta) — FORM[6] `add_queue_form` | **0 fields**; `components/ops-bands.js:16` "إضافة إلى القائمة" = bare gate | PARTIAL | 056 (give the gate its 2 fields) |
| **Class feedback** | **3**: `feedback_note` (ta), `feedback_files[]` file, category — FORM[12] `add_feedback` | **3 fields**: category · remark · note in `fb-add` drawer + backendRequired Save (`outcome-details.js`). File attach correctly a gate. | INTENTIONALLY_IMPROVED (superset minus file) | settled (Spec 029); file → FUTURE_BACKEND |
| **TEACHER end class** | **5**: `remark`*, `summary`*, `homework`*, `notes`, `images[]` file — `teacher-home.json` FORM[3] `/teacher/classes-end` | **0 fields**; `teacher-outcomes.html` renders the 5 as read-only cards + a gateNote (`teacher-outcomes.js:94`) | PARTIAL | 056 + 044 |
| **TEACHER mark absent** | **2**: `video` file, `notes` — FORM[4] `/teacher/classes-absent` | **0** (no surface) | MISSING | 056 + 044 |
| **TEACHER request cancel/reschedule** | **8**: `type` radio (Reschedule / Auto Make-up), `date`+Month/Year, `time`+H/M — `teacher-home.json` FORM[2] `cancel_form__request` | **0** (teacher-schedule shows a gateNote only) | MISSING | 055 + 044 |
| **TEACHER edit class** | **8**: `date`+Month/Year, `time`+H/M, `sendMessage`, `duration`* — FORM[5] `/teacher/edit-class` | **0** | MISSING | 055 + 056; gated in legacy by `can_edit_class` (§7) |
| **TEACHER monthly progress report** | **24** controls / 9 groups: `month`, `achievements` (ta), `learning_progress` r×4, `focus` r×4, `homework_completion` r×4, `punctuality` r×4, `rescheduled_sessions` r×4, `additional_support` (ta), `learning_objectives` (ta) — `teacher-studentslist.json` FORM[2] `/teacher/student-progress` | **0** authoring controls; `teacher-reports.html` renders 5 dimension LABELS; `student.html#view=evaluation` shows a READ-ONLY rubric (missing `rescheduled_sessions` + `additional_support`) | MISSING (producer) / PARTIAL (reader) | 056 + 044 + 055 |
| **TEACHER certificate request** | **4**: `student_name`, `course_name`, `description`*, `date_certificate`* — `teacher-studentslist.json` FORM[3] `/teacher/certificate-request` | **0** (no teacher surface; the admin approval queue at `certificates.html#view=requests` exists — a letterbox with no letter) | MISSING | 055 + 056 |

**Cross-cutting note.** Every consumer of this chain (family session summary + homework, child-view homework
list, admin attendance/outcomes board, reports) is fed **only** by authored fixtures. "Creation surface exists"
is FALSE for the whole chain.

---

## 2. People forms — Teachers / Students / Families / Staff

### 2.1 Add / Edit Teacher — `management-teachers-create.json` FORM[1] (56 visible)

Legitimate (non-pay, non-credential) legacy set ≈ **26**; the pay block (15) and credential block (9) are
correctly rejected (§7). Current `trn-edit` = **12** fields (`teacher.html` template; `components/teacher-actions.js:56-70`); there is no `trn-add` FORM in a drawer — Spec 041 moved add into the `#view=add` tab panel (`teachers.html` = 13 `field()` controls per CLAUDE.md).

| Legacy field | In current add/edit? |
|---|---|
| first/last name (+ AR) | ✅ |
| email, phone | ✅ |
| status, subjects/material, level, courses | ✅ |
| notes | ✅ |
| **username** (`user_name`) | ❌ MISSING |
| **national_id** | ❌ |
| **alt_phone** | ❌ |
| **birth_date** | ❌ |
| **gender** | ❌ |
| **timezone + timezone_diff** (load-bearing for every session time) | ❌ |
| **category membership** (`member_id[]`) | ❌ (categories exist as a separate tab) |
| age bands (`age_student[]` ×3) | ❌ |
| `is_free_meeting` | ❌ |
| `send_info` toggle | ❌ (REJECTED_SECURITY-adjacent — credential broadcast; keep out) |
| CV upload (`cv_file`, `cv_certificates`) | rendered as a GATE (correct) |

**Disp PARTIAL · owner 056.** C02-02 (the master row's proof column lists exactly this missing-field set).

### 2.2 Add / Edit Student — `management-student-1-create.json` (14) / `-edit.json` (7)

Current `stu-add` = **9** fields; `stu-edit` = **8**. Missing on add: `teacher_note`, `admin_note`, `hasTrial`
toggle, trial `date`, trial `time` (the create form's inline first-trial). `accounting_statement` is a finance
enum to route, not invent. **Disp PARTIAL · owner 056.** C03-04 (the audit books create+edit as ONE PARTIAL
row; the edit side is a field-level superset — all 7 legacy edit controls render among `stu-edit`'s 8, verified
against `pages/student.js` `stuEditDrawer()` — the deficit is on the create side).

### 2.3 Create Trial (student) — `management-student-1-trial-create.json` FORM[1] (11)

Legacy: `student_id`*, gender, `studies_ages` r×3, `material_id`, `duration`, `accounting_statement`, `date`,
`time`, `teacher_id`. Current: **3** fields only (material/teacher/duration inside `stu-add`); no age band, no
date/time, no trial statement. **Disp PARTIAL · owner 056** (the wider trial lifecycle — Trials tab, waiting
queue, family Request-Trial wizard — is C03-10, owner 055).

### 2.4 Add / Edit Family — `management-families-create.json` FORM[1] (36)

Current `fam-edit` = **9** fields; `add-family.html` 5-step wizard = **21** field-labels. The whole
**Payment + Courses contract block** (course_type r×4, hour_rate, total_hours, fees, invoice_day, session_day,
cost_type, currency, is_recurring, auto_invoice, is_post_payment, payment_method) is present in the legacy but
only partially in the wizard billing step (planType/hourRate/cycle — `add-family.js:57-59`).
Legacy `password`* / `user_name`* / `send_info` are **REJECTED_SECURITY** (§7). **Disp PARTIAL · owner 056 (fields) + 044 (long-form host)** — a faithful family edit is a ~28-control multi-section form the narrow `fam-edit` drawer cannot host. C04-16 (host: C04-18).

### 2.5 Add child (existing family) — `fam-child` (7) vs the §2.2 student-create (14)

Current 7 fields vs field parity with the student-create form. **Disp PARTIAL · owner 056.** C03-04 (the same
14-control legacy create set is the yardstick).

### 2.6 Family Settings tab — `management-families-1.json` FORMs 9–12 — **entirely absent**

| Panel | Legacy fields | Current |
|---|---|---|
| Location update | 5 (`country_id`*, `city_id`*, timezone*, `timezone_diff`) FORM[9] | ❌ NONE (captured once in the wizard, never editable) — MISSING, owner 056. C04-11 |
| Preferences | 7 (`language`*, `auto_add_credit_to_invoice`*, `pw_reset_method`*, `whatsapp_private`, `renew_unpaid_courses`, `send_invoice`, `stop_after`) FORM[10] | ❌ NONE on admin; family-profile shows read-only chips — MISSING, owner 056 (+ 043 for `pw_reset_method`=REJECTED_SECURITY). C04-11 |
| Capabilities | 2 (`can_chat`*, `can_see_library`*) FORM[11] | ❌ NONE — MISSING, owner 043 (Role Isolation grant model; the cross-role gate itself is C04-12's 055 register row). C04-12 |
| Notifications matrix | 14 checkboxes (7 events × wa/email) FORM[12] | ❌ per-family NONE (settings#notifications is academy-wide) — MISSING, owner 056 (+ 053 channels). C04-13 |

### 2.7 Teacher Settings tab — `management-teachers-1.json` FORMs 11–14 — **entirely absent** (0 of 15)

Location (5) · Preferences (3, incl. `pw_reset_method`=REJECTED_SECURITY) · Capabilities (4:
`can_chat`/`can_see_library`/`can_edit_schedule`/`can_edit_class`) · Notifications matrix (8; **the
`salary_by_*` row MUST NOT be ported** — pay-free). **Disp MISSING · owner 056 (location/preferences:
C02-03) + 043 (capabilities: C02-04 · notification matrix: C02-05).**

### 2.8 Create / Edit / Duplicate Staff — `management-admins-create.json` (10)

Current `staff-add`/`staff-edit`/`staff-dup` = **6** fields each (name, username, email, phone, role, status).
The 4 omissions (`password`, `salary`, `currency`, redundant `enable`) are **law-driven and correct** — 3
REJECTED_* + 1 redundant. **Disp PARTIAL · owner 056; do NOT restore the omissions.** Audit row: **C12-11**
(the C12 audit's 9-page cluster corpus lacked the staff-create record and marked the legacy staff fieldset
UNKNOWN_EVIDENCE; this ledger's 10-field legacy set is grounded directly in
`output/roles/admin/pages/management-admins-create.json`, which exists in the admin corpus — an evidence
conflict recorded, not smoothed: the record wins on the fieldset, the audit's UNKNOWN stands only for the
pages *its* corpus covered).

### 2.9 Suspend / Stop (family + student) — confirms that lost their fields

| Action | Legacy fields | Current |
|---|---|---|
| Suspend family | 3: `date`*, `schedule_return`, `note`* — `management-families-1.json` FORM[13] `/suspend` | 0-field confirm — PARTIAL, owner 056 + 044 (confirm-with-fields). C04-14 |
| Stop family | 1: `note`* — FORM[15] `/stop` | 0-field confirm — PARTIAL, owner 056 + 044. C04-14 |
| Suspend student | 3: `date`*, `schedule_return`, `note`* — `management-student-1.json` FORM[15] | 0-field confirm — PARTIAL, owner 056 + 044. C03-05 |
| Stop student | 1: `note`* — FORM[14] `/student/1/stop` | 0 — MISSING (this leg has no confirm at all; the master books the suspend/stop/schedule-stop set as ONE PARTIAL row), owner 056 + 044. C03-05 |

A bodyless `confirmAction()` cannot carry a return date + mandatory note. **Spec 044 must define a
"confirm-with-fields" pattern** before 056 can complete these.

---

## 3. Courses & Groups

### 3.1 Create/Edit course enrollment — `management-courses-1-create.json` FORM[1] `students_form` (16)

Current `crs-add` = **6** fields, `crs-edit` = **7**. Missing (non-pay): **repeatable weekly schedule rows**
(legacy `schedule[0..N][value/time/duration]`), the teacher-timezone mirror row, **`student_cancel` /
`teacher_cancel` cancellation limits** (Off…10), `update_current`/`update_default`. The two rate blocks
(`family_hour_rate`, `teacher_hour_rate`) are correctly **REJECTED_PAY_FREE** (§7). **Disp PARTIAL · owner
056 (fields) + 044 (repeatable rows).** C05-02 (rate blocks: C05-04 · dual-timezone mirror: C05-12).

### 3.2 Create/Edit group — `management-groups-create.json` FORM[1] (44)

Current `grp-add`/`grp-edit` = **8** fields. Legacy is 8 fields **+ a full 7-day weekly timetable grid**
(`schedule[0..6][value/time/H/M/duration]` = 35 controls) **+ a multi-select `students[]` roster** **+ a
`teacher` select**. Current ships a single-day, single-select approximation and (per C05) `grp-add` has **no
teacher field at all** — a group with no teacher contradicts the legacy's own "one teacher, many students".
Rate fields (`t_hour_rate`, `s_hour_rate`) correctly rejected. **Disp PARTIAL · owner 056 + 044 (multi-select
+ weekly grid).** C05-11. `grp-edit` field set is **UNKNOWN_EVIDENCE** (no `/groups/{id}/edit` was ever
crawled — the group list rendered empty); current reuses create — keep grounded, do not harden. Carried by
this ledger (the C05 normalized table `C05-01 … C05-18` mints no UNKNOWN_EVIDENCE row; nearest anchors
C05-11/C05-16).

### 3.3 Add classes to a course — `management-student-1.json` FORM[16] `addClass_form` (6)

`date`, `time`, `duration`, `credit` (from-credit), `teacher` (override), `accounting_statement`. **No
course-scoped entry point exists** in the product; nearest is the generic `sess-new` (7 fields). **Disp
PARTIAL · owner 055 (the course-scoped entry point; fields → 056).** C05-03.

---

## 4. Sessions / Schedule / Operations conditional forms (§6 has the field-less ones)

### 4.1 Create session (`sess-new`, 7 fields) — UNKNOWN_EVIDENCE

No create-class FORM appears in any C06 legacy record; classes are generated from course schedules /
request-schedule. Our 7-field `sess-new` (course·teacher·date·time·duration·credit·status) may be an
invention. **Disp UNKNOWN_EVIDENCE · owner 056 — confirm the field set against a real endpoint before
treating it as complete.** Carried by this ledger (the C06 normalized table `C06-01 … C06-29` mints no
UNKNOWN_EVIDENCE row; nearest anchor C05-03 — `sess-new` ≈ legacy Add Lesson, wrong entry point) /
C14-24 (tasks form set likewise unevidenced — UNKNOWN_EVIDENCE, 056).

### 4.2 Teacher availability windows — `teacher-timetable.html` raw `#availabilityModal` (5 + 3 buttons)

Controls: `avFromDay` (select), `avToDay` (select), `avFromTime`, `avToTime`, `avTypeSelect` + Add/Update/Delete
buttons. Current: a single `gateNote` line on `teacher-schedule.html` (`teacher-schedule.js:97`). **Disp MISSING
· owner 056 (form) + future-backend (persistence).** C06-08.

---

## 5. Finance forms (four field-less gates over evidenced multi-field workflows)

| Capability | Legacy fields (record) | Current | Disp | Owner |
|---|---|---|---|---|
*(Row-ID note: the C07 audit landed after this section was drafted and minted different row numbers; the
references below use the audit's ACTUAL IDs from `cluster-audits/C07-audit.md`.)*

| **Create parent invoice** | **14** visible: `serial`, `due_date`, add-course select, `price`, `discount`, `fees`, `additional`, `adjustment_type`, `adjustment_value`, `adjustment_count`, `note`, `paymentMethod`, `sendMessage` + repeatable line rows — `management-invoices-create-parent-invoice-1.json` FORM[1] `invoice-form` | **0 fields**; `finance-actions.js:47` `createInvoice` = `disabledAction` gate | FUTURE_BACKEND (engine) + PARTIAL (form) | 056 + 044 + billing backend. C07-02 |
| **Record payment / transaction** | **8**: `transaction_id`, `date_payment` (date), `basic`, `additional`, `taxes`, `total`, `currancy`, `getway` — `management-invoices.json` FORM[2] `/accountant/store-transaction` | **0 fields**; `finance-actions.js:66` confirm dialog | PARTIAL | 056 + billing backend. C07-03 |
| **Run teacher salaries** | **5**: `month`, `date_range`, `generateteacher`, `allteachers`, `teachers[]` — `management-salaries.json` FORM[2]. **PAY-FREE by construction** (a selection form, no figures) | **0 fields**; `finance.js:228` gate | PARTIAL — **could ship honestly today with a gated Save** | 056 (form) + payroll backend (the run). C07-12/C07-13 (the audit ledgers the boards + the 4 payroll gates as C07-12 INTENTIONALLY_IMPROVED and the figures/run as C07-13 REJECTED_PAY_FREE; the figure-free *selection form* itself is this ledger's 056 item) |
| **Run staff salaries** | **7**: `month`, `date_range`, `generatestaff`, `allstaff`, `staff_members[]` (×N) — `management-staff-salaries.json` FORM[1]. Also pay-free selection | **0 fields**; same tab gate | PARTIAL | 056 + payroll backend. C07-12/C07-13 (same split as the teacher row) |
| **Add bank** | **1**: `name`* — `management-banks-create.json` FORM[1] | **1 field** + gated Save (`bank-add`) — the ONE field-complete finance workflow | COMPLETE_AND_VERIFIED | — (import/reconcile → future-backend). C07-30 |
| **Add expense / income** | **8**: `head_id`, `user_id`, `is_income`, `description`, `reason`, `amount`, `currency`, `date` — `management-expense.json` FORM[1] | **NONE** — no expense surface | MISSING | accounting backend + 056. C07-11 |
| **Adjustment (per family)** | **4**: `type`*, `amount`*, `count`*, `note` — `management-families-1.json` FORM[8] `adjustmentForm` | NONE | MISSING | 056 (the 4-field form) + future billing backend (the persistence). C04-08 |

These five 0-field gates are exactly the "too-early gate" class Spec 032 eliminated across 24 admin drawers —
**finance was never revisited.**

---

## 6. Field-less gates standing in for captured multi-field forms (the ops edition)

Nine writes are honest `data-disabled-reason` gates or 0-field confirms today, each in place of a large
evidenced form. They escaped Spec 032's `fieldlessCreateEdit===0` audit because that audit only covered
`data-modal-trigger` openers, not `data-disabled-reason` / `data-demo-action`.

| # | Current gate | Legacy form it replaces | Fields | Owner |
|---|---|---|---|---|
| 1 | `scheduled-actions.js:88` "إنشاء إجراء مجدول" | `management-scheduled-actions-create.json` FORM[1] | **18** conditional (`action_type`* drives family/student/cancel/activate targets · `criteria[teacher_id/material_id]` · `criteria[cancel_type]` r×3 · reschedule date/time · `add_to_credit` · `returned_at` · `note`) | 044 (conditional long form) + 056. C14-11/C06-06 |
| 2 | `public-holiday.js` header gate ×2 | `management-public-holiday.json` FORM[1] | **11** (`from_date`*/`from_time`+H/M, `to_date`*/`to_time`+H/M, `category_selected[]` multiselect, Select-All) | 056 + 055 (bulk-cancel fan-out). C06-05 |
| 3 | *(no surface)* request-schedule | `management-request-schedule-1-1.json` FORM[1] `/store-request-schedule` | **~52** (`request_type` r, teacher-category multiselect + Select-All, `course_id`, `duration`, `accounting_statement`, date/time, `total_hours`, `start_date`, **7 weekly slot rows** each value/time/H/M/duration) | 056 + 055. C06-04 |
| 4 | `ops-bands.js:16` "إضافة إلى القائمة" | `add_queue_form` (§1) | 2 | 056. C01-11 |
| 5 | `finance.js:228` salaries generate | `management-salaries.json` (§5) | 5 | 056. C07-12/13 |
| 6 | `finance.js:47`/`:66` invoice/payment (§5) | 14 / 8 | — | 056. C07-02/03 |
| 7 | `certificates.js:107` "Approve" | `certApproveModal` (§8-adjacent): `cert-student_name`, `cert-teacher_name`, `cert-description`, `cert-date_certificate`, `cert-template`*, `cert-send`, `cert-message` = **7** — `management-certificate-requests.html` raw | 044 (modal) + FUTURE_BACKEND. `cert-create` (a *separate* drawer) does carry 5 fields but omits `teacher_name`. C10-12 (cert-create: C10-18) |
| 8 | `families.js:84` categories "Create" | `management-categories-families-create.json` FORM[1]: `name`, `status`, `description` = **3** — a bare gate with NO fields, breaking the Spec-032 "render fields first, gate the Save" rule that `rep-fbcat`/`lib-cats`/`trn-categories` all follow | 056 + 044. C04-19 |
| 9 | `family-requests.html` trial/cancel gates | `student-request-trial.json` FORM[1] (**11**: `request_type` r, name, age, language, gender, `student_id`, date, time, duration, course) · `student-feedback` (**4**) | 056 + 044. C03-10 (trial) / C04-20 (feedback) |

---

## 7. MUST-OMIT field families — correctly enforced (do NOT restore)

Verified: **0** `type=password`, **0** `type=file`, **0** salary/currency figure across all 115 built pages
(`grep '<input[^>]*type="password\|file"' app/public/*.html` = 0; only 4 non-input `type="file"` strings are
button data-attrs in announcements gates).

| Omitted field family | Legacy evidence | Disp |
|---|---|---|
| Teacher pay (`fixed_salary`, `hour_rate`, `salary_type`, `fine_per_hour`, `currency`) | `management-teachers-create.json` FORM[1] | REJECTED_PAY_FREE — never a teacher surface |
| Teacher payout (`payout_method`, `paymob_*`, `payoneer_payee_id`, `payout_email/notes`) | same record | REJECTED_PAY_FREE / REJECTED_SECURITY (bank card PAN) — owner 053 structure-only |
| Teacher Zoom credentials (`zoom_password`, `zoom_client_secret`, …8) | same record | REJECTED_SECURITY — owner 053 (provisioning only, never creds) |
| Teacher/family/staff `password` + `send_info` | `management-teachers-create.json`, `management-families-create.json` FORM[1], `management-admins-create.json` | REJECTED_SECURITY — auth backend |
| `pw_reset_method` select (family + teacher preferences) | `management-families-1.json` FORM[10], `management-teachers-1.json` FORM[12] | REJECTED_SECURITY |
| Staff `salary` + 17-currency select | `management-admins-create.json` | REJECTED_PAY_FREE (Spec 031 must-omit) |
| Course rate blocks (`family_hour_rate`, `teacher_hour_rate`) | `management-courses-1-create.json` | REJECTED_PAY_FREE (teacher) / finance-owned (family) |
| Settings `rate_student_absent` + the whole General→Teachers pay tab (10 controls) | `management-settings-general.json` FORM[2] | REJECTED_PAY_FREE — payroll backend (FO-14) |
| Import `password` column (families) | `management-settings-security-data.html` raw | REJECTED_SECURITY |
| Import `hour_rate` + `currency` columns | same | REJECTED_PAY_FREE |
| Provider credentials (Stripe/PayPal/Paymob/Payoneer/SMTP keys + secrets) | `management-settings-integrations-*-configure.json`, `management-settings-payments-create-payment-method-*` | REJECTED_SECURITY — owner 053 structure-only rows (already de-fanged by Spec 040; PayPal Sandbox default) |

**Teacher notification `salary_by_whatsapp`/`salary_by_email`** (`management-teacher/teacher-notifications/1`
FORM[14]) — the *row* is pay-adjacent; if a per-teacher matrix is ever built the salary row MUST be omitted.
**Family notification matrix** carries no pay row and is safe. C02-05 / C04-13.

---

## 8. Validation / required / help-text / confirmation — a systemic gap

Machine-checked across `app/public/*.html`:

| Signal | Legacy | Current |
|---|---|---|
| `required` on a real `<input/select/textarea>` | pervasive (e.g. family create has 12 required fields) | **0** (`grep '<input[^>]* required'` = 0; the 61 "required" string hits are all `data-reason` "Backend required" copy) |
| `aria-required` / `aria-invalid` / `aria-describedby` | n/a | **0 / 0 / 0** |
| Required-marker `*` in a `field-label` | legacy uses `*` on every required label | **0** |
| Field-level help / hint text (`field-hint`) | legacy has section subtitles + placeholder guidance | **0** |
| Section headings inside a form drawer | legacy splits into "Main / Additional information", "Payment / Courses" | drawers are flat `.wiz-grid` (e.g. `lead-new` = 19 fields, no headings, though `lead.create.main`/`.more` keys exist unused — `en.ctrl.js`) |

Because fields are **INERT by design** (no persistence, no validation — `components/form-field.js:1-4`), the
absence of `required`/validation is not a functional bug today. But it is a completeness gap the form spec must
close: **Spec 056 must define the honest validation/required/help vocabulary**, and **044** must give the drawer
a section-heading slot + a required-marker convention. Every "5 required markers not rendered" note (leads,
family, teacher, course country/city) rolls up here. C11-22 (leads) / C04-16 (family) / C02-02 (teacher) /
C05-02 (course) / C09-02 (country-city option sets).

**Confirmation gap.** Suspend/Stop/Cancel lost their forms to bodyless confirms (§2.9, §1). The `sessions.html`
row-kebab **Cancel** is a `data-demo-action` toast with **no confirm at all** — the one destructive kebab item
missing the guard every other kebab (`familyMenu`/`studentMenu`/`teacherMenu`/`staffMenu`) has. Owner 044 + 055.

---

## 9. Form builder & configure forms

| Form | Legacy fields | Current | Disp | Owner |
|---|---|---|---|---|
| **Custom form builder** | `form_name`*, `day`* (1–29), **repeatable** `fields[N][label]`* / `[type]`* (6 types: Short/Paragraph/Checkboxes/Multiple/Dropdown/Rating) / `[options][]` / `[is_required]` + Add-Question/Add-Option + per-form colour — `management-forms-create.json` FORM[1] | `form-create` drawer = **12** field-labels but **exactly 2 baked question rows** (`reports.html`); no add/remove row, no option repeater, no colour | PARTIAL | 056 + **044 (repeatable-row primitive — blocks the builder)**. C08-01 |
| **Feedback (fb-create)** | 1 visible (`feedback_note`) + hidden teacher_id/date — `management-teacher-feedback` | 5 fields (superset) but lacks teacher+month binding | PARTIAL | 056. C08-05 |
| **Feedback categories (rep-fbcat)** | 3 (`name`/`status`/`description`) — `management-family-feedback-categories-create.json` | 3 fields — parity | COMPLETE_AND_VERIFIED | settled (Spec 029). C11-32 |
| **Announcement compose** | 15: `type[]` (ad/whatsapp), `private`, `message`, `media[]` file, `expire_at` (date), `category_selected[]` + `student_category_selected[]` (Select-All ×2), `country_id` (full list), `hours`, `language` (11) — `management-public-advertisement.json` | 8 field-labels; **3 selects are single-"All" stubs** (`announcements.js:83` `oneOpt`); `expire` is free-TEXT not a date; recipient targeting is **display-only chips** (no Select-All tables); no edit/delete of existing | PARTIAL | 045–050 + 056 + 043 (targeting). `ann.field.hours` label "Timing" is mislabelled — legacy `hours` is a contracted-hours **audience facet**. C11-17 (targeting: C11-18 · edit/delete: C11-19) |
| **Certificate designer (cert-tpl)** | ~16: `name`*, `background` file, Font, B/I/U, Size (range), Color (color+text), Alignment r×4, X/Y/W (number ×3), draggable merge boxes — `management-pdf-create.json` FORM[1] `certForm` | `cert-tpl` = **2** fields (name + STATIC preview) + background GATE | PARTIAL (sanctioned by Spec 031 cert-pdf-gate) | FUTURE_BACKEND (render) + 044. C10-10 |
| **Chat group create (msg-group)** | 6: `name`, `bio`, `image` file, `staff[]`, `teachers[]`, `students[]` — `management-chat.json` FORM[4] | `msg-group` = 6 fields (image = gate) | COMPLETE_AND_VERIFIED | future-backend. C11-06 |
| **Add member (msg-member)** | 3 multiselects — FORM[5] | 3 fields | COMPLETE_AND_VERIFIED | future-backend. C11-07 |
| **Lead intake (lead-new)** | 19 visible (21 − 2 hidden H/M) — `management-new-requests-create.json` FORM[1] | `lead-new` = **19** fields — a genuine 1:1 | COMPLETE_AND_VERIFIED (field count); missing required markers + section headings (§8); `country` free-text vs `country_id` select | 056 (polish) + 044. C11-22 (country option set: C11-23). **Children repeater + teacher-gender are NOT in this record** → any such claim is UNKNOWN_EVIDENCE (may live in a detail modal not captured). |
| **Expense heads (head-add)** | 2 (`name`*, `status`) — `management-heads.json` FORM[1] | 2 fields | COMPLETE_AND_VERIFIED (add); the row **edit/delete** (`editHeadForm`) has no counterpart → PARTIAL | 056. C14-15/C14-16 |
| **Materials add/edit (mat-add/mat-edit)** | 2 (`name`, `name_ar`) — `management-materials-create.json` | 2 fields each | COMPLETE_AND_VERIFIED (per-row identity is a 044 issue) | —. C10-02 |
| **Library item (lib-item)** | 5 (`name`, `type`, `category_id`, `file`, `thumbnail`) — `management-library.json` FORM[3] | 3 fields + 2 upload gates | PARTIAL | FUTURE_BACKEND + 056. C10-05 (uploads: C10-06) |
| **Settings General identity** | 11 — `management-settings-general.json` FORM[1] | rendered (`settings.html#view=general`) | COMPLETE_AND_VERIFIED | backend. C09-01 |
| **Settings Notifications matrix** | 47 — `management-settings-notification.json` FORM[1] | 7 accordion sections, ~34 toggles | COMPLETE_AND_VERIFIED | 053 + 055. C11-13 (visual form: C09-14) |
| **Settings Customization palette** | 35 (`personalisation`) incl. 13 colour pickers | rendered but **13 hex TEXT fields, 0 `<input type=color>`** | PARTIAL | 055 (FO-19/20). C09-10 |
| **Settings Security backup** | destination `backup_email` + Save + a bare `<a>` "Send Backup" (fires a real GET DB backup, no confirm) | destination field + Save gate + Send gate + standing scope/audit copy | INTENTIONALLY_IMPROVED (the legacy no-confirm GET backup is refused — C08-12, REJECTED_SECURITY primary) | backend (FO-11). C09-08 (real execution: C09-26) |
| **Data import (×4)** | 4 file uploads + required-column contracts (`teachers/families/childs/invoices.xlsx`) | 4 cards, structure-only column tables + Upload/Download gates (minus `password`/`hour_rate`/`currency` columns) | COMPLETE_AND_VERIFIED | backend + 043. C09-03 (real execution: C09-26) |
| **Provider configure drawers (11)** | safe options + credential fields — `management-settings-integrations-*-configure` | 11 drawers: safe fields rendered, sensitive = structure-only rows | COMPLETE_AND_VERIFIED (safe) / REJECTED_SECURITY (creds) | 053. C09-05 (real connections: C09-15) |

---

## 10. Self-service profile forms (all three roles)

| Form | Legacy fields | Current |
|---|---|---|
| Teacher profile edit | 4 (`onlineImage`, `image` file, first/last/email) + 3-field password form — `teacher-profile-edit.json` FORM[1]/[2] | `teacher-profile.html` display-only + 3 backendRequired gate cards (`teacher-profile.js:83-85`) — **0 editable fields** |
| Family profile edit | 4 + 3 password — `student-profile-edit.json` (the /student/* login IS the family) | `family-profile.html` — 3 gates, 0 fields |
| Student child-view profile | (same family record) | `student-profile.html` — 3 gates incl. a `passwordChange` gate for **a login the child does not have** → REJECTED_PRIVACY (carried by the privacy register **G-03**, owner 043; nearest C12 audit row C12-09 — the audit mints no child-view-specific row) |
| **Admin** profile | 5 (name/email/username/`password` type=text/avatar) — `management-profile-edit.json` | **NO admin profile surface at all**; topbar "الحساب" = `data-action=noop` → honest toast |

**Disp PARTIAL · owner 056** (build the inert edit fields behind the gates) + backend for the save + 043 for
the child-view password gate. The password `type=text` legacy pattern is REJECTED_SECURITY forever. Audit rows
(per `cluster-audits/C12-audit.md` as published): **C12-04** (admin account MISSING) · **C12-05** (password
`type=text` REJECTED_SECURITY) · **C12-07/C12-08** (teacher/family profile-edit PARTIAL) · **C12-09** (portal
change-password FUTURE_BACKEND).

---

## 11. Owner roll-up

| Owner | Forms work assigned |
|---|---|
| **056 Complete Forms & Data Capture Audit** | The bulk: all PARTIAL field completions (teacher/student/family/staff create-edit; course/group; trial; lead polish; announcement option sets; library item; expense heads edit; salary selection forms; palette colour inputs; form-builder fields), the validation/required/help vocabulary (§8), the `sess-new`/`grp-edit`/tasks UNKNOWN_EVIDENCE field-set confirmations, admin profile surface |
| **044 Modal/Drawer/Long-Form Interaction System** | The confirm-with-fields pattern (suspend/stop/cancel/absent); the repeatable-row primitive (form-builder, weekly schedule grids, invoice line items); the conditional long-form host (scheduled-action, request-schedule); section-heading + required-marker slot in `formDrawer`; per-row drawer identity; certificate approve modal |
| **055 Cross-Role Propagation** | Teacher end-class / monthly-report / cancel-request producers → admin/family consumers; certificate-request teacher origin; scheduled-action & public-holiday fan-out; announcement delivery |
| **043 Sensitive Data / Role Isolation** | Family + teacher capabilities forms; per-role notification targeting; child-view password gate; anti-poaching on lead contact + audience selects |
| **053 Integrations** | Provider credential structure-only rows; WhatsApp pairing; per-family/teacher notification channels; message builder (UNKNOWN_EVIDENCE — 504-only) |
| **Future billing/payroll backend** (FUTURE_BACKEND; Spec 030 shipped the honest gates — provenance, not an owner) | Invoice builder, record-payment, adjustments, expense/income ledger, salary run persistence — the *forms* stay 056 items |
| **HONEST_LOCK / permanent rejects** | `classSalaryReport` (sole lock); all pay/secret field families in §7 — never any spec |
| **UNKNOWN_EVIDENCE** | `sess-new` field set · `grp-edit` field set · tasks create/section field set · lead children-repeater · message builder · `custemize-table` board-preference form (C01-05 — its 2 controls are evidenced; anything beyond them is what must not be hardened) — do not harden until re-crawled |

---

*End of forms-completeness-ledger. Read-only on `app/**`; no source, test, public HTML or config was modified.*

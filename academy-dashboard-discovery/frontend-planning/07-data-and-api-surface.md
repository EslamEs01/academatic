<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **12-data-api-surface-v2.md & 06-complete-data-surface.md (195 GET routes, 109 mutation endpoints)**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 07 — Data & API Surface

> Preliminary entity model + data/API surface inferred from table headers, form fields, and modal fields across the crawl. **Everything here is INFERRED** from the legacy DOM unless marked "observed endpoint". Field names in `code` are the legacy form `name` attributes (useful as a hint to the backend team, not a contract). The new frontend must confirm the real API with the backend before implementation — see Open Questions.

## 0. Tech signals (observed)
- Backend is **Laravel** (CSRF `_token`, `_method` spoofing for PUT/PATCH/DELETE, route patterns). All mutations are `POST`; all list filters are `GET` query params.
- Front‑end libs in legacy (reference only — we will replace): select2, flatpickr, dropzone, sweetalert2, Quill, ApexCharts, iconify, Bootstrap, moment.
- **No clean REST/JSON API was observed** for page data — pages are server‑rendered; some sections load via XHR (chat, class‑feedback drilldown ~344 XHRs, search‑schedule, analytics charts). **We do not know the JSON contract.** → A backend API (REST or GraphQL) likely needs to be defined/confirmed for the new SPA‑less‑but‑dynamic frontend. **Flag.**

## 1. Core entities & inferred fields

### Family (account owner / biller)
`first_name, last_name, first_name_ar, last_name_ar, user_name, password, emails[], phones[], birth_date, join_at, gender, status, group_name (WhatsApp), country_id, city_id, timezone, timezone_offset, is_recurring, auto_invoice, is_post_payment (pre/post), payment_method, currency, course_type, hour_rate, total_hours, fees, invoice_day, session_day, cost_type (fixed/variable), member_id[] (staff/category), notes`
- **Statuses:** On Trial, Incomplete, Active, Stopped, Suspended, Inactive, Deleted.
- **Sub‑objects:** preferences (language, pw_reset_method, whatsapp_private, auto_add_credit, renew_unpaid, send_invoice, stop_after), capabilities (can_chat, can_see_library), notification matrix (7 types × WhatsApp/Email), credits pool, invoice adjustments.
- **Relationships:** has many Students (children); has many Invoices/Transactions/Credits; belongs to many FamilyCategories.

### Student (child)
`name, name_ar, language (10), gender, birth_date, teacher_note, admin_note` + (trial embed) `studies_ages (Children/Teens/Adults), material_id, teacher_id, duration, accounting_statement, date, time`
- **Statuses:** Active, Suspended, Stop, Inactive, On Trial, Incomplete, Deleted.
- **Relationships:** belongs to Family; has many Courses/Enrollments, Trials, Sessions, MonthlyProgressReports, Certificates, Siblings.

### Teacher
`first_name, last_name, first_name_ar, last_name_ar, email, password, user_name, national_id, phone, alt_phone, group_name, member_id[], birth_date, gender, status, country_id, city_id, timezone, timezone_diff, currency, salary_type (fixed/variable), fixed_salary, hour_rate, fine_per_hour, is_free_meeting, zoom_email, zoom_password, zoom_meeting_link, zoom_passcode, zoom_id, zoom_account_id, zoom_client_id, zoom_client_secret, course_id[], level[] (Preliminary/Middle/Advanced), age_student[] (Children/Teens/Adults), cv_file, cv_certificates, notes` + payout (`payout_method, paymob_*, payoneer_payee_id, payout_email, payout_notes`)
- **Sub‑objects:** preferences, capabilities (can_chat, can_see_library, can_edit_schedule, can_edit_class), notifications, availability slots.
- **Relationships:** has many Students/Courses/Sessions/Compensations/Salaries/Availability; belongs to many TeacherCategories.

### Staff / Admin
`name, email, username, phone, password, salary, currency, role (Manager/Accountant/Supervisor/Support), status, enable (2FA)` + `permissions[]` (~170) + `categories[]` (student+teacher scope).
- **Relationships:** has Role, PermissionSet, CategoryScope, ActivityLog, Salary.

### Course / Enrollment
`material_id (subject), teacher_id, start_date, schedule[n][value|time|duration], family_hour_rate_type, family_hour_rate, teacher_hour_rate_type, teacher_hour_rate, student_cancel (limit), teacher_cancel (limit)` (+ free variant omits family rate; edit adds `delete_old_sessions, update_current, update_default`)
- **Course types (4):** Monthly Subscription, Hours per Course, Hours Subscription, Number Session.
- **Statuses:** Stopped, Inactive, Active, Active & unpaid, Suspended, Indebted, Completed, Free.
- **Relationships:** belongs to Student; has Schedule; generates many Sessions; links to Invoices.

### Session / Class (the spine)
columns/fields: `class_id/session_id, course_id, teacher_id, family_id, date, time, duration, accounting_statement (According to teacher/Paid/Paid if continue/Free), status, remark, summary, homework, notes, images[], enter_times (student/teacher/remind), recording, left_hours`
- **Statuses (11):** Pending, Waiting, Running, Attended, Student Absent, Teacher Absent, Student Cancel, Teacher Cancel, Admin Cancel, Reschedule, Make‑up.
- **Sub‑objects:** Queue item (`level, text, status`), Attendance record, Feedback, Timeline events.
- **Make‑up model:** `makupclass (no/auto/reschedule), add_to_credit, cancelTzType (student/teacher)`.

### Trial
`student_id, course, studies_ages, material_id, duration, accounting_statement, date, time, teacher_id` — tracked through CRM stages + schedule‑request responses.

### Lead / Request (CRM)
`first_name, last_name, email, phone, friends_number, classes_Duration, hear_from, classes_count, gender, age, parent_age, language, timezone, trial_date, trial_time, coupone_code, country_id, course_name, note` + captured geo/device (ip, country, city, iso, device, browser) + notes thread + stage.
- **Stages (9):** New, Contacted, Qualified, Trial Taken, No Response, Duplicated, Trial Missed, Scheduled, Teacher.

### MonthlyProgressReport
`month, achievements, learning_progress (Excellent/Very Good/Good/Very Slow), focus, homework_completion, punctuality, rescheduled_sessions, additional_support, learning_objectives` + `student_id, course_id, teacher_id`.

### FeedbackMeeting / Report
`family_id, date, user_id (manager)` + notes (feedback) + report (`curriculum, expected, level, achievements`). Family→teacher feedback: `teacher_rating, class_interactive, see_hear, like_teacher, complain, additional_comment`.

### Certificate
- **Template:** `name, background (image), json_data (canvas layout), font, style, size, color, textAlign, X, Y, W (mm)`, merge fields (e.g. Student Name).
- **Request:** `student, course, teacher, description, date` + admin approval (template select, WhatsApp delivery).

### Finance entities
- **Invoice:** `serial, date, due_date, family_id, course_id[], price, discount, fees, additional, adjustment_type, adjustment_value, adjustment_count (instalments), note, paymentMethod, sendMessage`; statuses All/Unpaid/Paid/Overdue/SoftDelete; columns add `Total (native), Total (AED)`.
- **Transaction:** `transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currency, gateway`.
- **InvoiceAdjustment:** `type (discount/percentage/add), amount, count, note`.
- **Credit:** session/student/teacher/duration pool (family‑level).
- **Expense:** `head_id, user_id (executor), is_income, description, reason, amount, currency, date`; **ExpenseHead:** `name, status`.
- **Salary (teacher):** `teacher_id, month, fixed, plus, minus, fine, gift, hour_rate, total, total_EUR, salary_type, status` + attendance breakdown (attended/absent counts+hours, trials). **Staff salary:** `name, fine, gift, total, status`.
- **Payout:** `teacher_id, amount, method, status (8: Pending approval/Approved/Rejected/Successful/Failed/Pending/Returned/Unknown), month, requested_at`. **PayoutProvider:** `mode (sandbox/live), is_active, key1–4, webhook_url`.
- **PaymentMethod:** `payment_method (type id), name, key1, key2, xpay_url (live/sandbox)` or custom instructions.
- **Bank:** `name`. **CurrencyRate:** `currency, code, rate` (16; AED base).

### Content
- **Material (subject):** `name, name_ar`.
- **LibraryItem:** `name, type (Files/Video/Images/Audio/Links), category_id, file, thumbnail, views, downloads, status`; **LibraryCategory:** `name, type_id`.

### Config / system
- **Settings.General:** identity (`company_name, company_name_ar, domain, email_info, phone, whatsapp, logo, country_id, city, timezone, address`), teacher pay rules (default rate + rate tiers + fine tiers + salary period), class automation (~18 toggles: cancel rules, auto‑makeup, credit rules, enter button, edit‑class), accessibility (`tfa, otp`).
- **Integration:** id, type, mode, keys, webhook (11 integrations).
- **NotificationSetting:** ~47 fields = event (course/class/invoice/salary/family‑status/reminders) × role (teacher/student) × channel (WhatsApp/Email/App/Private).
- **ScheduledAction:** `action_type (stop/activate family/student, cancel classes), scheduled_date, returned_at, criteria{teacher_id,material_id,cancel_type,reschedule_*,add_to_credit}, note, status`.
- **ChatGroup/Message:** `name, bio, image, members{staff[],teachers[],students[]}, messages`.
- **Broadcast:** `type[] (dashboard/WhatsApp), private, message, media[], expire_at, category_selected[], student_category_selected[], country_id, hours, language`.
- **Task/Ticket:** lifecycle (Total/Pending/In‑progress/Completed/Overdue) + per‑staff metrics.
- **Profile:** `name, email, username, password, image`.

## 2. Entity relationship sketch (inferred)
```
Family 1───* Student 1───* Course(Enrollment) 1───* Session ──* AttendanceRecord
  │            │                │                      │
  │            │                └─ Schedule            ├─ Queue / Feedback / Timeline
  │            └─* Trial, MonthlyProgressReport        └─ links → Invoice/Salary/Credit
  ├─* Invoice 1─* InvoiceLine, *─Transaction, *─InvoiceAdjustment, *─Credit
  ├─* FeedbackMeeting/Report
  └─* FamilyCategory (m:n)
Teacher 1─* Session, Course, Compensation, Salary, Availability ; m:n TeacherCategory
Staff 1─ Role, PermissionSet(~170), CategoryScope, ActivityLog, Salary
Lead 1─* LeadNote ; converts → Family/Student + Trial
Payout *─1 PayoutProvider ; Expense *─1 ExpenseHead ; Invoice/Salary use CurrencyRate
CertificateTemplate 1─* CertificateRequest ; LibraryCategory 1─* LibraryItem
Material(subject) 1─* Course
```

## 3. Data/API surfaces the frontend will need (inferred — confirm with backend)
| Surface | Used by | Shape needed |
|---|---|---|
| Auth + session + **permission set** | all | login, role, ~170 permission flags, category scope |
| List endpoints w/ server filter/sort/paginate | every list | query params → `{rows, total, page, facets}` |
| Detail endpoints | each entity detail | nested record + tab sub‑resources (lazy) |
| Calendar/events | timetable/home | `{start,end,title,teacher,student,course,status}` |
| Mutations | every form/modal | create/update/delete + validation errors |
| Aggregates/analytics | dashboards/reports | KPI blocks + chart series + geo data |
| Real‑time | chat, live session status, notifications | WS/SSE channel (**unknown** — flag) |
| File up/download | uploads, exports, PDFs, salary slips, certificates | multipart up; file/stream down (2 export endpoints failed in crawl) |
| Search | global search | omni + recent |
| Lookups | selects | countries(254), cities, currencies(16), timezones(IANA), materials, teachers, students, categories |

## 4. Reference enums (observed)
- **Currencies (16):** AED(base), AUD, CAD, EGP, EUR, GBP, KWD, MAD, PKR, QAR, RUB, RWF, SAR, TRY, USD, YER.
- **Languages (10):** Arabic, English, French, German, Italian, Portuguese, Russian, Spanish, Turkish, Urdu.
- **Durations (min):** 10,15,20,25,30,40,45,50,60,75,80,90,120,150,180.
- **Age groups:** Children (1–10), Teens (11–20), Adults (>20).
- **Accounting statement:** According to teacher / Paid / Paid if continue / Free.
- **Remark:** Excellent / Very Good / Good / Acceptable / Needs Improvement.

## 5. Inferred vs unknown (be honest)
- **Inferred (medium confidence):** all field lists above (from DOM names/labels) — names may differ from API; required/validation rules largely unknown.
- **Unknown (must get from backend):** the actual JSON API contract & auth tokens; real‑time mechanism; file upload/download/export flows; payment‑gateway server flows; notification delivery internals; PDF/certificate generation; exact permission semantics per flag; pagination/sort param names; multi‑currency conversion timing; how `json_data` certificate canvas serialises.
- **Do not invent endpoints.** Where this doc lists a "surface", it is a *need*, not a discovered API. See [12-open-decisions.md](12-open-decisions.md) §API.

<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **07-product-module-map-v2.md**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 02 — Product Module Map

> The platform grouped into business modules, with purpose, the legacy routes that feed each, the roles that use it, and the core entities. Routes are legacy reference only; the rebuilt IA is in [08-improved-information-architecture.md](08-improved-information-architecture.md).

Legend for roles: **A** = admin/staff · **T** = teacher · **F** = family/guardian.

---

## 1. Dashboard / Home
**Purpose:** Role landing page summarising the day. Admin: 8 KPI tiles (Total/Pending/Attend/Waiting+Running/Cancel/Absent/Trials/Last sessions) + today's class table with per‑row actions. Teacher: hours/attendance KPIs + salary‑till‑today tile + today's classes. Family: hours used/remaining + today's classes + teachers panel.
**Legacy routes:** `/management/home` (+ `?status`, `?trial` variants), `/teacher/home`, `/student/home`.
**Roles:** A, T, F. **Entities:** Session, KPI aggregates.

## 2. New Requests / Leads (CRM)
**Purpose:** Inbound‑lead funnel. Stage KPI cards drive a filtered list; each lead has a 25+‑field detail (incl. geo/device), notes thread, status transitions, and a "create account / book trial" path. Includes scheduled‑trials tracking + top‑teacher stats.
**Legacy routes:** `/management/new-requests` (+ `/create`, `/filter/{stage}`, `/scheduled-trials/...`).
**Roles:** A. **Entities:** Lead/Request, LeadNote, Trial.

## 3. Students
**Purpose:** Student records (always child‑of‑a‑Family). List with 7 status segments; rich detail (tabs: Courses, Trials, Siblings, Monthly Plan) with the full session‑action modal set; create/edit; add trial; per‑student analytics.
**Legacy routes:** `/management/student` (+ `/status/{n}`, `/{id}`, `/{id}/edit`, `/{family_id}/create`, `/{id}/trial/create`), `/management/analysis-student`, `/management/forms/students`. Teacher: `/teacher/studentslist`, `/teacher/students`. Family: `/student/studentslist`.
**Roles:** A (full), T (own roster, read + report), F (own children). **Entities:** Student, Trial, MonthlyProgressReport.

## 4. Families / Guardians
**Purpose:** The billing & account owner. List (7 status segments) + advanced financial filter; 8‑tab detail (Children, Billing, Invoice Adjustments, Credits, Profile Activity, Student Feedback, Settings ×4 sub‑forms, Notification matrix); create/edit; family categories (+ assign); family feedback/meetings.
**Legacy routes:** `/management/families` (+ `/create`, `/{id}`, `/{id}/edit`, `/status/{s}`, `/feedback`, `/feedback/students`, `/feedback/family/{id}`), `/management/categories/families` (+ `/create`, `/{id}/assign`), `/management/family/feedback-categories`.
**Roles:** A. **Entities:** Family, FamilyCategory, FeedbackMeeting/Report, InvoiceAdjustment, Credit, Transaction, NotificationPrefs.

## 5. Teachers
**Purpose:** Teacher records & performance. List (5 scope segments × sortable columns); deep profile (tabs: Home, Monthly Classes, Schedule/availability, Compensations, Salary, Settings, Activity); create/edit (Zoom, payout, capabilities, rates); categories; compensations (Fine/Bonus + per‑class deductions); attendance report; feedback/KPIs; public‑holiday bulk scheduling.
**Legacy routes:** `/management/teachers` (+ `/create`, `/{id}`, `/{id}/edit`, `/scope/{s}`, sort variants, `/{id}/compensations/...`), `/management/teacher-categories` (+ create/edit/members), `/management/teachers_details`, `/management/teacher-feedback`, `/management/public-holiday`. Teacher self‑view: `/teacher/teacher-history/{id}`, `/teacher/course-history/{id}`.
**Roles:** A (full), T (own history/salary/reports). **Entities:** Teacher, TeacherCategory, Compensation, Availability, TeacherFeedback.

## 6. Staff / Admins + Roles / Permissions
**Purpose:** Internal staff accounts with role (Manager/Accountant/Supervisor/Support), ~170‑permission RBAC matrix (17 groups), category‑scoped visibility, activity log, 2FA toggle.
**Legacy routes:** `/management/admins` (+ `/create`, `/{id}/edit`, `/permission/{id}`, `/appear/{id}`, `/categories/{id}`, `/duplicate/{id}`).
**Roles:** A only (manager‑level). **Entities:** Staff, Role, Permission, StaffCategoryScope.

## 7. Courses (Enrollments)
**Purpose:** A *course* = a student's enrollment in a subject with a recurring weekly schedule, dual rates, cancellation limits, and a generated session series. List with 7 type filters × 8 status filters; rich detail (current course, history, timeline) with the full class‑action modal set; create (paid/free), edit (with session‑impact preview), copy.
**Legacy routes:** `/management/courses` (+ `/{id}`, `/{student_id}/create`, `/create_free`, `/{id}/edit`, `/create_new_copy/{id}`, type/status variants).
**Roles:** A (full), T/F (read enrollments). **Entities:** Course/Enrollment, Schedule, Material (subject).

## 8. Classes / Live Sessions
**Purpose:** The session instance and its lifecycle. Session detail page (info, files, enter‑times, recording, queue, timeline) with the canonical action set: Attend / Absent / Cancel / Edit / Reschedule / Make‑up / Add‑to‑Credit / WhatsApp / Queue / Feedback. The session‑room route is the live‑class entry point. Teacher runs/ends classes; family requests cancel + uploads files.
**Legacy routes:** `/management/courseClasses/{id}`, `/management/session-class-room/{enc}/{id}`, `/management/sessions_analysis`, `/management/group/index` (+ `/groups/create`), `/teacher/session-class-room/...`, `/teacher/classes-end|absent|edit`, `/student/today-sessions`.
**Roles:** A, T, F. **Entities:** Session, Queue item, Attendance record, Group.

## 9. Timetable / Schedule
**Purpose:** Weekly calendar (Sat–Fri, 24h) of sessions; all‑teachers calendar + per‑teacher; teacher availability editor; a teacher‑availability **search/matching** tool; trial/session **schedule‑request broadcast** to groups of teachers and response tracking.
**Legacy routes:** `/management/all/teachers/timetable`, `/management/search-schedule`, `/management/schedule-trials-response`, `/management/schedule-sessions-response`, `/management/request-schedule/{p}/{s}`, `/teacher/timetable`, `/student/timetable`.
**Roles:** A, T, F. **Entities:** Session, Availability, ScheduleRequest.

## 10. Attendance
**Purpose:** Not a standalone page — attendance is **embedded in the session lifecycle** (Mark Attend modal: remark/summary/homework/notes/files; Mark Absent: who‑absent + make‑up + credit). Aggregated in Sessions Analysis, Teacher Details (attendance report), and salary calculations.
**Legacy routes:** embedded in §1, §7, §8; aggregates at `/management/sessions_analysis`, `/management/teachers_details`.
**Roles:** A, T (mark), F (view). **Entities:** AttendanceRecord (part of Session).

## 11. Assignments / Homework / Tasks
**Purpose:** Two things share this space: (a) **Homework** is captured as part of attendance (Summary + Homework + files on End/Attend); (b) **Tasks/Tickets** is an internal staff task board (KPIs: Total/Pending/In‑progress/Completed/Overdue + per‑staff breakdown, "Add Section").
**Legacy routes:** `/management/tickets`, `/teacher/tickets`; homework embedded in session modals.
**Roles:** A, T. **Entities:** Task/Ticket, (Homework ⊂ Session).

## 12. Exams / Quizzes
**Purpose:** **Thin / not a built‑out module in the crawl.** No dedicated exam builder was found; the classifier tagged a couple of pages here (trial scheduling responses), and the **Forms** builder (monthly report forms with question types incl. Rating/Multiple‑Choice) is the closest thing to a quiz/assessment engine. Treat as a *gap / future* unless the owner confirms an exam feature exists behind an un‑crawled route.
**Legacy routes:** none confirmed; nearest = `/management/forms` (form builder).
**Roles:** A (forms). **Entities:** Form, FormField, FormResponse (proposed). *Flag for owner — see [12-open-decisions.md](12-open-decisions.md).*

## 13. Certificates
**Purpose:** Certificate **template designer** (canvas with positioned merge fields, background image, fonts, mm coordinates, PDF output), template list, and a **request → approve** queue (admin picks template, previews, optionally delivers via WhatsApp). Teachers/students *request*; admin approves.
**Legacy routes:** `/management/pdf` (+ `/create`), `/management/certificate-requests`; `/teacher/certificate-request`.
**Roles:** A (manage), T (request). **Entities:** CertificateTemplate, CertificateRequest.

## 14. Payments / Invoices
**Purpose:** Invoice lifecycle. List (status segments: All/Unpaid/Paid/SoftDelete; filter by date‑type Due/Payment, currency, gateway); create **parent invoice** (line items from courses, discount/fees/additional, adjustment type/value/count for instalments, payment method, notify); monthly invoices; record payment ("New Transaction"); family invoice adjustments & credits; exports.
**Legacy routes:** `/management/invoices` (+ `/create-parent-invoice/{id}`, `/monthly-invoices`, status/date variants, `downlaod` export), `/management/accountant/store-transaction`; family `/student/billing`.
**Roles:** A (manage), F (view own). **Entities:** Invoice, InvoiceLine, Transaction, InvoiceAdjustment, Credit, PaymentMethod.

## 15. Wallet / Finance
**Purpose:** Everything else financial. Accounting dashboard (11 KPIs, charts, editable 16‑currency FX rates); transactions ledger (session/invoice/salary tabs); expenses (income+outcome, heads); **teacher salaries** (generate by month, attendance‑driven, slip PDF) and **staff salaries**; **payouts** (request → bulk approve → provider Paymob/Payoneer, 8 statuses); payout providers config; salary‑class report; profit‑&‑loss analysis (expected vs actual); banks.
**Legacy routes:** `/management/accounting` (+ `/transaction/{type}`), `/management/expense`, `/management/heads`, `/management/salaries`, `/management/staff-salaries`, `/management/payouts` (+ `?all=1`), `/management/payout-providers` (+ `/{id}/edit`), `/management/salary-class-report`, `/management/analysis-expenses`, `/management/banks`. Teacher: `/teacher/salary`, `/teacher/salary-class-report`.
**Roles:** A (manage), T (own salary). **Entities:** Salary, Payout, PayoutProvider, Expense, ExpenseHead, Bank, CurrencyRate.

## 16. Reports / Analytics
**Purpose:** Dashboards across domains: student stats, course stats, invoice analysis, P&L, sessions analysis, class‑feedback KPIs, teacher monthly performance, new‑requests stats, monthly report forms. Charting via a chart library (ApexCharts observed), incl. a geo/country map.
**Legacy routes:** `/management/analysis-student|course|invoices|expenses`, `/management/sessions_analysis`, `/management/class-feedback`, `/management/teacher-feedback`, `/management/forms` (+ `/create`).
**Roles:** A (full), T (own KPIs). **Entities:** read aggregates over Session/Invoice/Student/Teacher.

## 17. Messages / Notifications
**Purpose:** (a) In‑app **chat** (multi‑role groups: staff+teachers+students, group create/members/settings); (b) **broadcast** "Advertise & Notify" (dashboard + WhatsApp, targeted by category/country/language, with quotas); (c) **notification routing settings** (~47‑field matrix: event × role × channel WhatsApp/Email/App/Private); (d) WhatsApp connection diagnostics.
**Legacy routes:** `/management/chat`, `/management/public-advertisement`, `/management/settings/notification`, `/settings/integrations/whatsapp/families/insights`, `/teacher/chat`.
**Roles:** A, T (chat). **Entities:** ChatGroup, Message, Broadcast, NotificationSetting.

## 18. Content / Library + Materials
**Purpose:** **Library** = digital content (Files/Video/Images/Audio/Links) in categories, with views/downloads metrics, admin upload, teacher/family read‑only browse + search. **Materials** = the subject/course catalog (bilingual name) referenced by enrollments.
**Legacy routes:** `/management/library`, `/management/materials` (+ create/edit); `/teacher/library`, `/student/library`.
**Roles:** A (manage), T/F (read). **Entities:** LibraryItem, LibraryCategory, Material.

## 19. Settings · Roles/Permissions · Profile · Error/Utility
**Settings (admin):** General (4 tabs: identity, teacher pay rules, class‑lifecycle automation, accessibility/2FA), Integrations catalog (11: Stripe/PayPal/Mollie/Xpay/Payoneer/Paymob/Custom + 2 payouts + WhatsApp/Email), per‑integration configure, Notification matrix, Security (CSV import + backup + dual policy editor), Customisation (theme + 11 status colors), Payment methods.
**Roles/Permissions:** see §6.
**Profile/Account:** view (broken in legacy for T/F) + edit (name/email/username/avatar + password) for all roles; personal "shortcuts" widget.
**Error/Utility:** 404 page, 500 page, time‑zone converter tool, scheduled‑actions automation, world‑time, search.
**Legacy routes:** `/management/settings/*`, `/management/profile/*`, `/teacher|student/profile-edit`, `/management/time-convertor`, `/management/scheduled-actions`.
**Roles:** A (settings), all (profile). **Entities:** Setting, Integration, Profile, ScheduledAction.

---

### Module → role coverage (summary)

| Module | A | T | F |
|---|:--:|:--:|:--:|
| Dashboard/Home | ✅ | ✅ | ✅ |
| New Requests (CRM) | ✅ | — | — |
| Students | ✅ | ◑ roster/reports | ◑ own children |
| Families/Guardians | ✅ | — | ◑ own account |
| Teachers | ✅ | ◑ own | — |
| Staff/Admins + Roles/Perms | ✅ | — | — |
| Courses (Enrollments) | ✅ | ◑ read | ◑ read |
| Classes/Live Sessions | ✅ | ✅ run | ◑ view/cancel |
| Timetable/Schedule | ✅ | ✅ | ◑ view |
| Attendance (embedded) | ✅ | ✅ mark | ◑ view |
| Assignments/Tasks | ✅ | ◑ view | — |
| Exams/Quizzes | ◑ forms only | — | — |
| Certificates | ✅ | ◑ request | — |
| Payments/Invoices | ✅ | — | ◑ view |
| Wallet/Finance | ✅ | ◑ salary | — |
| Reports/Analytics | ✅ | ◑ own | — |
| Messages/Notifications | ✅ | ◑ chat | ◑ notices |
| Content/Library + Materials | ✅ | ◑ read | ◑ read |
| Settings | ✅ | — | — |
| Profile/Account | ✅ | ✅ | ✅ |

✅ full · ◑ partial/scoped · — none.

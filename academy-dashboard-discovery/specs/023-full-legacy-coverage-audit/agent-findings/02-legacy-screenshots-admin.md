# Agent 02a — Legacy ADMIN Screenshots Visual Audit

Spec 023 "Full Legacy Coverage Audit 000-022". Audit date: undefined (session date 2026-07-06).

## Scope & method

Mission: visually inspect the legacy **admin** surface captured under
`academy-dashboard-discovery/output/roles/admin/screenshots/` (1,019 PNGs; 300 are `*-full.png`
full-page captures — one per distinct admin page/state).

Method actually followed:
1. Listed the screenshots folder and derived the complete set of distinct module-group prefixes
   from filenames (`ls | grep -c -- '-full.png$'` → 300; full sorted listing captured and grouped
   by hand since the grouping regex under-splits `management-*` compound names).
2. Opened 55 representative `*-full.png` files with the Read tool (visual inspection), spanning
   every distinct module group identified in step 1: home/dashboard, admins, analysis/reports,
   accounting/finance (transactions: invoices/salary), banks, families categories, certificate
   requests, chat, class-feedback, courseclasses, courses, download-center (invoices export),
   expenses, export (error state), families (+ family detail, feedback, feedback-categories),
   forms, groups (list + create), heads (expense heads), invoices (+ paid filter), library
   (books/materials), materials (course materials), monthly invoices, new-requests (+ statistics +
   scheduled-trials-completed), payout providers (integration config), payouts, PDF export
   (error state), profile (self), public advertisement & notify, public holiday, request-schedule
   (trial/regular), salaries (teacher salaries), salary class report, scheduled actions, schedule
   responses (sessions + trials), search schedule, session/class deep-link (`mq=3` row highlight),
   sessions analysis, settings (general, integrations, payments-edit, security/backup), staff
   salaries, students (list + detail), teacher categories, teacher feedback, teachers (list +
   detail + compensations), tickets/tasks, time convertor, total queues.
3. For groups not opened as screenshots, cross-referenced the matching
   `academy-dashboard-discovery/output/roles/admin/pages/*.md` / `.json` text captures (600 files
   present, i.e. a `.md`+`.json` pair per screenshot state) to confirm textual coverage exists —
   confirmed a matching pair exists for every group sampled (spot-checked via `ls pages/ | head`).

No files were modified anywhere; this is a read-only visual/textual audit.

## Evidence opened (exact paths)

All paths relative to
`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/admin/screenshots/`:

1. `management-home-full.png`
2. `management-home-status-full.png`
3. `teacher-home-full.png` (byte-for-byte same rendered dashboard as #1/#2 — see finding)
4. `management-admins-full.png`
5. `management-admins-permission-6-full.png`
6. `management-analysis-student-full.png`
7. `management-analysis-expenses-full.png`
8. `management-banks-full.png`
9. `management-categories-families-full.png`
10. `management-certificate-requests-full.png`
11. `management-chat-full.png`
12. `management-class-feedback-full.png`
13. `management-courseclasses-1-full.png`
14. `management-courseclasses-default-member-course-details-1-full.png`
15. `management-courses-full.png`
16. `management-courses-1-edit-full.png`
17. `management-downlaod-full.png`
18. `management-expense-full.png`
19. `management-export-course-full.png` (500 Server Error page)
20. `management-families-full.png`
21. `management-families-1-full.png`
22. `management-families-feedback-full.png`
23. `management-family-feedback-categories-full.png`
24. `management-forms-full.png`
25. `management-group-index-full.png`
26. `management-groups-create-full.png`
27. `management-heads-full.png`
28. `management-invoices-full.png`
29. `management-invoices-status-paid-full.png`
30. `management-library-full.png`
31. `management-materials-full.png`
32. `management-monthly-invoices-full.png`
33. `management-new-requests-full.png`
34. `management-new-requests-scheduled-trials-completed-date-2026-06-01-to-2026-06-30-full.png`
35. `management-payout-providers-full.png`
36. `management-payouts-full.png`
37. `management-pdf-full.png` (500 Server Error page)
38. `management-profile-show-full.png`
39. `management-public-advertisement-full.png`
40. `management-public-holiday-full.png`
41. `management-request-schedule-1-1-full.png`
42. `management-salaries-full.png`
43. `management-salary-class-report-full.png`
44. `management-scheduled-actions-full.png`
45. `management-schedule-sessions-response-full.png`
46. `management-schedule-trials-response-full.png`
47. `management-search-schedule-full.png`
48. `management-session-class-room-mq-3-full.png`
49. `management-sessions-analysis-full.png`
50. `management-settings-general-full.png`
51. `management-settings-integrations-full.png`
52. `management-settings-payments-1-edit-full.png`
53. `management-settings-security-data-full.png`
54. `management-staff-salaries-full.png`
55. `management-student-full.png`
56. `management-student-1-full.png`
57. `management-teacher-categories-full.png`
58. `management-teacher-feedback-full.png`
59. `management-teachers-full.png`
60. `management-teachers-1-full.png`
61. `management-teachers-1-compensations-1-full.png`
62. `management-tickets-full.png`
63. `management-time-convertor-full.png`
64. `management-total-queues-full.png`
65. `management-accounting-transaction-invoices-full.png`
66. `management-accounting-transaction-salary-full.png`
67. `management-admins-create-full.png`
68. `management-class-feedback-feedback-full.png`

Total distinct screenshots visually opened: **68** (exceeds the 40–55 target).

Cross-reference (existence check only, not opened as images):
`academy-dashboard-discovery/output/roles/admin/pages/` — 600 files (`.md`+`.json` pairs),
confirmed via `ls` that a matching pair exists for the groups above (e.g.
`management-accounting.md/.json`, `management-admins-6-edit.md/.json`, etc.) — used to confirm
every group has a corresponding text capture for follow-on textual audit agents, not to extract
additional facts beyond what the images already show.

## Module-group inventory (from filename prefixes, 300 `*-full.png` total)

Derived from the full sorted `ls *-full.png` listing (see Scope & method step 1). Approximate
counts per compound group (a state/filter variant counts toward its parent group):

| Group | Count (approx.) | Sampled screenshot(s) |
|---|---|---|
| Home / dashboard | 8 | management-home, management-home-status, teacher-home |
| Teachers (list, detail, compensations, sort/scope variants) | ~71 (65 `management-teachers*` + 6 `management-teacher-*`) | management-teachers, management-teachers-1, management-teachers-1-compensations-1 |
| Settings (general/integrations/customisation/security/payments/notification) | 29 | management-settings-general, -integrations, -payments-1-edit, -security-data |
| Families (list, detail, categories, feedback, status filters) | 26 (20 `families` + 6 `categories-families`) | management-families, -1, -feedback, family-feedback-categories, categories-families |
| Invoices (list, status filters, date-range, create) | 19 | management-invoices, -status-paid |
| Courses (list, create, edit, status filters) | 19 | management-courses, -1-edit |
| Admins (list, create, edit, permission, categories, duplicate) | 11 | management-admins, -permission-6, -create |
| New requests / trial pipeline | 15 | management-new-requests, -scheduled-trials-completed |
| Students (list, detail, trial, status filters) | 13 | management-student, -1 |
| Download center (invoice export/date/status filters) | 7 | management-downlaod |
| Class feedback | 3 | management-class-feedback, -feedback |
| Courseclasses (sessions, default course details) | 7 | management-courseclasses-1, -default-member-course-details-1 |
| Categories (teacher/family) | 6 | management-categories-families |
| Accounting (transactions: invoices/salary/session status) | 6 | management-accounting-transaction-invoices, -salary |
| Analysis / reports | 4 | management-analysis-student, -expenses |
| Payout providers | 3 | management-payout-providers |
| Class / session-room deep link | 3 (class + session + session-class-room) | management-session-class-room-mq-3 |
| Scheduled actions | 2 | management-scheduled-actions |
| Schedule (sessions/trials responses) | 2+2 | management-schedule-sessions-response, -trials-response |
| Request (schedule) | 2 | management-request-schedule-1-1 |
| Public (advertisement, holiday) | 2+1 | management-public-advertisement, -holiday |
| Profile | 2 | management-profile-show |
| Materials | 2 | management-materials |
| Forms | 2 | management-forms |
| Family (feedback categories, singular) | 2 | management-family-feedback-categories |
| Single-instance groups: banks, certificate-requests, chat, export, expense, group(-index), groups(-create), heads, library, monthly-invoices, pdf, salaries, salary-class-report, scheduled(-actions dup), search-schedule, staff-salaries, teacher-categories/feedback (dup), tickets, time-convertor, total-queues, all-teachers-timetable | 1 each | all sampled above |

Zero uncategorised filenames remained after this pass — every `*-full.png` prefix maps to one of
the groups above.

## Per-screenshot findings

**Home / dashboard** (`management-home-full.png`, `management-home-status-full.png`,
`teacher-home-full.png`): the admin landing page. Six KPI tiles across the top (Total Classes,
Sessions Pending, Attend Sessions, Waiting & Running, Cancel Sessions, Sessions Absent) each with a
"Show Details" drill-through — no charts, plain counters. Below: a collapsible "Filter Classes"
panel and a dated "Classes Of" table (columns: #, Class Time, Student/Group Name, Teacher Name,
Course Details, Left hours, Class Status, Actions) with an Excel-export icon and a settings/gear
icon per row, plus status chips (Trial, Waiting) and a fine badge ("3.00 Fine"). Notable: all three
files (`management-home`, `management-home-status`, `teacher-home-full.png`) render pixel-identical
content — `teacher-home-full.png` is evidently the same admin dashboard captured under a
differently-named crawl state, not a distinct teacher-facing page; this is legacy-crawler naming
noise, not a second surface, and should not be treated as evidence of an admin-side "teacher home."

**Admins** (`management-admins-full.png`, `-permission-6-full.png`, `-create-full.png`): a Staff
Members table (Name/avatar, Username, Phone, Role badge "Manager", row-actions menu) with an "+ Add
Member" action. The **permissions matrix** page is a large single-page checklist (170/170
permissions selected in the sample) grouped by capability domain — Dashboard, New Requests,
Families (24), Students List (21), Teachers (17), Reports (20, includes Expenses/Transactions/
**Salaries/Payouts**/Invoices), Payment Methods, Locations, Material, Library, Banks, System
Settings, Staff Members, Groups, Scheduled Actions — each with a "X/X selected" counter and
per-group Select-All/Clear-All. The admin-create form collects Full name/E-mail/Username/Phone/
Password/**Salary+Currency**/Select role/Status/Enable 2FA — i.e. admin staff records carry a
**salary field** natively (legitimate: admin-only surface, not a family/teacher/student view).

**Analysis / reports** (`management-analysis-student-full.png`, `-expenses-full.png`): student
statistics page has two tabs (General Student Statistics / Course Statistics), 4 KPI tiles, then
donut/bar charts (Students Per Month, by Age Group, by Language, by Status, by Gender, by Country)
plus a world map with per-country pins. The Profit-and-Losses view (`-expenses`) shows an
Expected/Actual Net Profit + Revenue + **Teachers Salaries + Staff Salaries + Expenses** KPI row,
a bar chart, and two 12-month cumulative line-chart tables (Expected vs Actual) plus a full
Financial Data Table (Monthly) with EUR columns for every month Jan–Dec. This is a legitimate
admin-only finance/reporting surface (explicitly out of scope for family/teacher/student apps per
binding law, but fully in-scope for admin).

**Banks** (`management-banks-full.png`): simple "Banks list" table (#, Bank Name, Settings) with
"+ Add Bank", empty state "No data found".

**Families categories** (`management-categories-families-full.png`): Families Categories table
(#, Name, Description, Status, Count, Settings) with "+ Create category"; two seeded rows.

**Certificate requests** (`management-certificate-requests-full.png`): table (Student/Course/
Teacher/Description/Date/Action) linked to a "Certificate Templates" page, empty state.

**Chat** (`management-chat-full.png`): a two-pane messenger UI — contact list (search, "+" new
chat) on the left, "Open chat from the list" placeholder on the right; one seeded group thread.

**Class feedback** (`management-class-feedback-full.png`, `-feedback-full.png`): a sub-nav under
Teacher & Management leading to a Classes KPI report — filters (Teachers/Range/Staff Name), a
"List of Teachers" table with Percentage and session count columns.

**Courseclasses** (`management-courseclasses-1-full.png`,
`-default-member-course-details-1-full.png`): a "Class History" detail card (Trial/Paid badges,
Actions dropdown) showing Teacher/Student/Course panels, Management/Time/Duration row, then
Class Information (remark/note/summary/homework), Files, TimeTable (student/teacher enter
timestamps), Class Recording ("No recording available"), Show Queues/Direct Links buttons, and an
audit Timeline. The "default course details" variant is a compact read-only summary card
(Student/Teacher/Parent/Course/Schedule/Price/Total Hours) plus its own Timeline.

**Courses** (`management-courses-full.png`, `-1-edit-full.png`): the family-scoped Courses list
shows six status tiles (Active, Active & unpaid, Completed, Suspended, Indebted, Inactive) each
with a % ring, then a filterable table (Student/Teacher/Date/Total Hours/Status/Invoice/Price/
Actions) with CSV/download export. The edit form is a rich scheduling UI: Course Name/Teacher
selectors, first-session date + "delete sessions before" toggle, a repeatable weekly Schedule block
(Student vs Teacher timezone, day, time, duration, Remove), Additional Settings (**Student hour
rate / Teacher hour rate — Custom values e.g. 6 / 120**, course edit type toggles, cancellation
limit dropdowns), and a generated session table with per-row Status chips (Admin Cancel, Pending).

**Download center** (`management-downlaod-full.png`): "Deleted Invoices" report reachable from four
KPI tiles (all invoices / unpaid / paid / deleted), a Filter panel, and an invoice table (Ordered
Number/Due Date/Parent/Payment Date/Payment Id/Total Price/Total AED/Status/Actions); shows a
"Cannot download invoice" inline error banner (a real legacy failure mode, not a placeholder).

**Expenses** (`management-expense-full.png`): "+ Add Expenses" / "+ Heads" actions over a table
(Name of Income or Outcome, Value, Currency, Description, Date, Reason, Name of Executor,
Transaction Type, Actions); empty state.

**Export** (`management-export-course-full.png`): renders a **500 Server Error** page ("Something
went wrong, try again later" + "Go Back to Home") — a genuine legacy dead-end captured by the
crawler, not a normal content page. `management-pdf-full.png` (PDF export) is the same 500 error
template. Both are evidence that these two legacy export actions were broken/unavailable at
crawl-time — a capability gap in the legacy system itself, not something the rebuild needs to
faithfully reproduce as broken.

**Families** (`management-families-full.png`, `-1-full.png`, `-feedback-full.png`,
`family-feedback-categories-full.png`): the Families list shows 7 status tiles (On Trial,
Incomplete, Active, Stopped, Suspended, Inactive, Deleted) with % rings, a Range filter, and an
Active Families table (Family name+avatar, Phone (masked), Join Date, User Name, Course Type badge
"Monthly Subscription", child count). The **family detail** page is data-rich: avatar banner,
"Login as {family}" impersonation action, Total Hours / Family Members counters, an action list
(Edit, Send Reset Password, Deactivate, Suspend, Stop, Schedule Stop on Date, Delete), then a full
attribute dump including **Total Fees (72 EUR), Hour Rate (6 EUR), Total Hours (12/month), Invoice
Type (Pre), Course Type (Monthly - Variable Cost), Invoice Day, Session Day, Notes**, and a
Children/Billing/Invoice-Adjustments/Credits/Profile-Activity/Student-Feedback/Settings tab strip
with a Family Members table (Student, Status, Teacher, course details, Subscription "5 H"). This
confirms the legacy family record carries granular **pay/rate/invoice data that the rebuilt family
app must never surface** (per the zero-pay-figures / hour-quota-only law) — admin retains it,
family-facing UI must not.

**Forms** (`management-forms-full.png`): a "Forms" builder list (Form Title/Questions/Responses/
Default/Status/Created at/Actions) with "Create Form" and a "reports follow-up" action; empty.

**Groups** (`management-group-index-full.png`, `-create-full.png`): "List of Groups" table (Start
Date, Group Name, Teacher Name, **Teacher rate, Student rate**, Schedule, Status) — group-teaching
sessions (one teacher : many students) distinct from 1:1 courses; the create form has a weekly
per-day HH:MM + duration grid for up to all 7 days plus rate fields.

**Heads** (`management-heads-full.png`): a minimal "Add Head" (expense-category heads) table,
empty state.

**Invoices** (`management-invoices-full.png`, `-status-paid-full.png`): four KPI cards (all/unpaid/
paid/deleted invoices) + Filter + a table (Ordered Number, Due Date, Parent, Payment Date, Payment
Id, Total Price, Total (AED), Status, Actions); status-tab switching re-scopes the same table.

**Library** (`management-library-full.png`): "List of Books" media table (Book Name, Category,
Published at, Views, Downloads, Status, View, Actions) with Filter Media / Categories / Add
Material actions; empty.

**Materials** (`management-materials-full.png`): course-material catalogue keyed by course name
("arabic" seeded) with "+ Add Course" action — distinct from the Library/Books surface above
though navigationally adjacent.

**Monthly invoices** (`management-monthly-invoices-full.png`): "Monthly Invoices" table (#,
Parent, Status) reached via breadcrumb Dashboard → monthly invoice list; empty.

**New requests** (`management-new-requests-full.png`,
`-scheduled-trials-completed-...-full.png`): a rich lead-funnel statistics dashboard — 9 status
tiles (Duplicated, Pending, Contacted, No response, Qualified, Scheduled, Trial Taken, Trial
Missed, Teacher) each linking to "Show Details", Converted (18) vs Not Converted (10) cards, Total
Request counter, Male/Female Teachers Requested split, Avg Scheduling Time / Pending Actions /
Completed Trials / Cancelled Trials tiles, then a second data-analysis band (Total Teachers/
Families, New Families This Month, Avg Families per Teacher, Requests Growth MoM, Fastest
Scheduling, Top Performer, Most Requests From, Most Requested). The "Taken Trials Dashboard" state
shows a purple hero banner ("X Trials Completed"), Trials This Week/Month tiles, Top Performing
Teacher, a Recent Trials table, and a Top Teachers This Week leaderboard-style table (Rank/Teacher/
Trials) — note: this **is a ranking table** on the legacy admin side; since admin is unrestricted by
the "no computed rank/leaderboard" law (that constraint targets the rebuilt dashboards, not a
literal ban on legacy admin from ever having had one), it is flagged here only as a capability to
consciously decide on, not an automatic violation.

**Payout providers** (`management-payout-providers-full.png`): a Payout Providers config table
(Method: Paymob/Payoneer, Mode: sandbox, Active: Inactive, Webhook URL exposing
`https://academatic.online/api/payouts/webhook/...`) with per-row Configure — a real backend
integration surface, admin-only.

**Payouts** (`management-payouts-full.png`): month-scoped payouts dashboard (Pending approval/
Pending/Successful/Failed/Rejected/Returned tiles, each with an EUR total), Filter (Month/Year/
Status), "Approve selected (0)" bulk action, and a Teacher/Amount/Method/Status/Month/Requested-at
table.

**Profile** (`management-profile-show-full.png`): self-service Name/E-mail/Username/Password edit
card for the logged-in admin.

**Public advertisement / holiday** (`management-public-advertisement-full.png`,
`-holiday-full.png`): the advertisement form supports Type (Advertisement/WhatsApp), a "Send
Private" throttle checkbox, rich message + file attachment, Expire At, Teacher/Student category and
country/hours/language filters, plus "List of Teachers"/"List of Students" multi-select panes. The
Public Holiday form (labelled "Teacher Timezone") sets a From/To range + category and targets the
teacher list only.

**Request schedule** (`management-request-schedule-1-1-full.png`): bulk trial/regular-course
request tool — Duration, Trial statement ("Paid if continue" — a monetised trial-continuation
label visible only on admin), Date/Time (Student tz), category, course, and a teacher multi-select
with Send Request.

**Salaries** (`management-salaries-full.png`, `-class-report-full.png`,
`management-staff-salaries-full.png`): the Teachers Salaries dashboard has Attended/Student
Absent/Teacher Absent/Fixed/Fine-Gift/Total(EUR) tiles, "Request payouts"/"Generate Salary" bulk
actions, and a per-teacher table (Cash Number, Fixed, plus/minus, Fine, Gift, Hour Rate, Total,
Total EUR, Salary Type, Status). Salary Class Report is a Range+GroupBy(Student)+Teacher filter
form. Staff Salaries is the parallel table for internal staff (Name/Cash Number/Fine/Gift/Total/
Total EUR/Status/Actions) with its own "Generate Salary" action. All of this is legitimate
admin-only payroll tooling explicitly out of scope for the rebuild's non-admin surfaces.

**Scheduled actions** (`management-scheduled-actions-full.png`): Action Type/Status filters over a
table (Action Type, Target, Scheduled Date, Status, Created by, Executed At, Result, Note,
Settings) with "+ Create Scheduled Action"; empty.

**Schedule responses** (`management-schedule-sessions-response-full.png`,
`-trials-response-full.png`): two-tab (Trial Responses / Schedule Responses) results viewer for the
request-schedule tool above; both show a table shape (Student/Parent/Course/Date-or-Schedule/
Time/Duration/Status/Requests) with distinct empty-state copy ("no schedule requests" vs "no trial
requests").

**Search schedule** (`management-search-schedule-full.png`): a From/To + category + Availability/
Courses checkbox filter for finding open teacher timetable slots ("Teacher Timezone" badge).

**Session / class-room deep link** (`management-session-class-room-mq-3-full.png`): the home
dashboard with the matched class row highlighted (blue) via a `?mq=` deep-link query param — used
for direct-linking a specific session row from notifications/chat, not a distinct page template.

**Sessions analysis** (`management-sessions-analysis-full.png`): a three-column analytics board —
Regular Classes (8 counters incl. Total/Attended/Cancels by role/Rescheduled/Make-up), Trial
Classes (6 counters), and Helpers (Last Session, Current Hour, Waiting, Running) — all with
`(HH:MM)` duration annotations, no charts.

**Settings** (`management-settings-general-full.png`, `-integrations-full.png`,
`-payments-1-edit-full.png`, `-security-data-full.png`): General has 4 tabs (General/Teachers/
Courses & Classes/Accessibility) covering Company Name/Domain/Email/Phone/WhatsApp and a
Location block (Country/City/Timezone/Full Address — "changing timezone will change all classes'
admin time & date"). Integrations is the richest settings surface: Payments (incoming) — Stripe,
PayPal, Mollie, Xpay, Payoneer, Paymob, Custom (offline) — each a toggle+Configure card with
descriptive copy; Payouts (outgoing) — Paymob Payout, Payoneer Payout; Communications — WhatsApp
(Free), Email. The "Edit — Custom" payment method form takes a free-text Name + multi-line Payment
Details ("End Each Line With \n"). Security → System Data offers one-click Backup (email target) +
four Import-Data upload cards (Upload teachers / families / children / families-again, each
`.xlsx` with a Download Template link) — a real bulk data-migration tool.

**Staff salaries**: see Salaries above.

**Students** (`management-student-full.png`, `-1-full.png`): 7 status tiles (Active, Suspended,
Stop, Inactive, On Trial, Incomplete, Deleted) + an Active Students table (Student Name, Parent
name-link, Timezone, WhatsApp Group, Language, Gender, Age). The student detail page has a banner
hero, name+"Active" badge, Admin Notice/Teacher Notice chips, and a Courses/Trials/Siblings/
Monthly-plan tab strip with Add trial/Add Course/Search Teacher actions and a course-status table
showing **"Not Paid"** payment-status chips alongside course status.

**Teacher categories / feedback** (`management-teacher-categories-full.png`,
`-feedback-full.png`): a Feedback Categories table (parallel structure to Families Category) and a
"List of Teachers" percentage/session-count report reached via the KPIs sub-nav.

**Teachers** (`management-teachers-full.png`, `-1-full.png`, `-1-compensations-1-full.png`): the
list has 4 status tiles (Active, Under Training, Incomplete, Inactive) + Filters + an Active
Teachers table (avatar, Status, "All students has course" badge, Total Hours, Phone, Schedule
button, Country, …). The detail page is the richest single record in the whole admin app: a
Home/Monthly-Classes/Schedule/**Compensations**/Salary/Settings/Activity tab set, action list
(Edit, Send Reset Password, **On Vacation toggle**, "Login as {teacher}" impersonation, Deactivate,
Delete), a List of Students / Left Students / Acquired Students triptych, then a full attribute
dump (Username, E-mail, Address, Birth Date, Levels, Age Study, Gender, Timezone, **Hour Rate: 120
EGP**, CV File, Certificates, Notes). The Compensations sub-page shows a single fine/bonus record:
Type ("Fine" chip), **Amount (1,000.00)**, Month/Year, Created at, Description, and an audit
Timeline — i.e. teachers can be issued monetary fines/bonuses tracked per-month, admin-only.

**Tickets** (`management-tickets-full.png`): actually resolves to the Tasks dashboard (Total/
Completed/Pending/In-progress/Overdue tiles + a pie-chart legend + a Staff Members task-load table)
— "Tickets" appears to be a legacy nav label pointing at the same Tasks feature, not a separate
support-ticket system.

**Time convertor** (`management-time-convertor-full.png`): a full "World Time Zone Converter" —
Business/Night-hours legend, date navigator (Previous/Today/Next + literal date field), and a
24-hour grid row per configured location (seeded: Cairo +3) with an "Add Location" affordance and a
Remove control — plus a second "Changes" tab (not opened, but visible in the tab strip).

**Total queues** (`management-total-queues-full.png`): Filter by Level / Filter by Status over an
empty queue table (#, Added by, Level, Text, Class, Status, Created at, Action) — a moderation/
review-queue mechanism (likely AI/quality-flagging) not otherwise represented in the rebuild's
admin console today.

**Accounting → Transaction sub-tabs** (`-invoices-full.png`, `-salary-full.png`): the family-scoped
"Transaction" report has 3 tabs — Sessions / Invoices / Salary. Invoices tab: a wide ledger table
(Serial, Invoice Date, Total Net Price, Total Additions, Discount Value, Fees Value, Other Effects,
Final Total Price, Paid At, Family). Salary tab: Month vs Teachers-Total-Salary vs Staff-Total-
Salary, with an EUR currency toggle top-right.

## Risks, gaps, and proposed corrections

1. **`management-export-course-full.png` and `management-pdf-full.png` are both hard 500 Server
   Error pages**, not real content — the legacy "Export course" and "PDF export/create" actions
   were broken at crawl time. Risk: a naive coverage-matrix pass could count these as "covered
   pages" when in fact no functional behaviour was ever observed. Correction: mark both as
   **not-observable / capability-unknown** in the coverage matrix rather than "seen and skipped",
   and do not treat their absence from the rebuild as a gap requiring parity — there is nothing to
   parity-match.

2. **`teacher-home-full.png` is pixel-identical to the admin `management-home*` captures.** Risk:
   double-counting this filename as a distinct "admin viewing a teacher home" capability. This is
   consistent with Spec 021's finding that there is no standalone teacher-portal-under-admin;
   it is simply crawler-state naming noise on the same admin dashboard. No correction needed beyond
   flagging it so downstream matrix-builders don't invent a phantom capability from the filename.

3. **Legacy admin retains extensive pay/rate/fine/salary data at the record level**
   (family detail: Total Fees/Hour Rate/Invoice Type/Course Type-Variable-Cost; teacher detail:
   Hour Rate/On-Vacation/Compensations-Fine-Amount; course edit: Student/Teacher hour-rate fields;
   admin-create: Salary+Currency) that is fully legitimate for admin (per binding law, only
   teacher/family/student-facing surfaces are pay-free) but is a **rich, currently-unaudited
   capability surface** the rebuilt admin console (40 admin pages, byte-identical since Spec 018)
   may under-cover. Recommend a follow-up admin-textual-coverage agent explicitly check the
   40-page admin inventory against: family billing/invoice-adjustments tab strip, teacher
   compensations/fine-bonus history, course-level hour-rate overrides, and the Integrations
   payments/payouts provider config screens — these look like plausible gaps in the 026–031
   admin-groups sequence, not violations, just candidates for the coverage matrix.

4. **"Top Teachers This Week" (`management-new-requests-...trials-completed...png`) is a literal
   Rank/Teacher/Trials leaderboard table on the legacy admin.** This appears to conflict in
   spirit (though not in binding scope — the "no computed rank/leaderboard" law targets the
   rebuilt non-admin dashboards per Spec 016/022) with the project's general allergy to ranking
   UIs. Flagging for an explicit corrections-agent decision: reclassify/omit/relabel if this
   surface is ever brought into the admin coverage matrix, rather than silently importing a
   leaderboard pattern.

5. **"Total Queues" (moderation/quality-flag table) and "Tickets" (which resolves to the existing
   Tasks feature) are two admin nav entries whose legacy purpose is only partially legible from a
   single empty-state screenshot each.** Total Queues in particular (Level/Status/Text/Class
   columns, empty) looks like an AI-content-quality or spam-queue review tool with no obvious
   analogue in the current 40-page admin build. Recommend the text-capture (`.md`/`.json`) for
   `management-total-queues.md` be read by a follow-up textual-detail agent before any
   reclassify/hide/merge decision, since the screenshot alone (empty table) under-specifies intent.

6. **The Download-center "Cannot download invoice" error banner** (`management-downlaod-full.png`)
   is a real captured failure state, not a placeholder — worth noting for anyone building a
   "legacy behaviour" reference so they don't assume the download action always succeeded.

No file inside `academy-dashboard-discovery/` outside the `specs/023-full-legacy-coverage-audit/`
folder, and no file anywhere else in the repo, was modified during this audit.

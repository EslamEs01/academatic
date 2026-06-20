<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **08-role-page-inventory-v2.md (178 templates) & 02-all-pages-expanded-inventory.md (every page)**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 03 — Role × Page Inventory

> The unique **page templates** per role (query‑param variants collapsed), with legacy URL, module, purpose, key sections, key actions, important modals/forms/tables, and a rebuild note. Every discovered page maps to one template here. "Mutating" actions are listed so the rebuild gives them confirm dialogs and never auto‑fires them.

Variant‑collapse key: a template marked **(×N variants)** stands for N crawled pages that differ only by query params (status/scope/sort/page/date/stage). They need **one** rebuilt page with filter/sort/pagination state, not N pages.

---

## A. ADMIN (`/management/*`) — ~75 templates (300 crawled pages)

### A1 · Dashboard / Home
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals / forms / tables | Rebuild note |
|---|---|---|---|---|---|---|
| Home (×9: status/trial/helper variants) | `/management/home` | Daily ops dashboard | 8 KPI tiles; today's class table; filters (date/time/teacher/family/student/type) | filter; per‑row Actions; export; customize table | Modals: Settings, Add Queue, Mark Attend, Send WhatsApp, Mark Absent, Edit Class, Cancel Class, Add Feedback, Add shortcuts. **Mutating:** attend/absent/cancel/edit/queue/send/reverse | Single page; the 9 variants are filter state. Per‑row action menu (not 6 buttons). |
| Total Queues | `/management/total-queues` | Cross‑class support queue | table; level+status filter | filter | — | Status/level color chips; server pagination |
| Banks list (+create) | `/management/banks`(`/create`) | Bank accounts | table (Name, Settings); create form (`name`) | add/edit/delete | inline | Trivial CRUD; consider extra fields (IBAN) |
| Groups (+create) | `/management/group/index`(`/groups/create`) | Group classes | table (Start/Group/Teacher/rates/Schedule/Status); create with weekly schedule repeater + multi‑student | create/edit/delete | multi‑select students w/ search; per‑day time+duration | Reuse schedule‑repeater + async multi‑select |

### A2 · New Requests / Leads (CRM)
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| New Requests funnel | `/management/new-requests` | 9‑stage lead funnel summary | 9 stage KPI cards; date filter | navigate to stage list | — | Cards click → filtered list |
| Lead list by stage (×~10) | `/new-requests/filter/{stage}` | Leads at a stage | table (Date/Parent/Email/Phone/Status); date filter | view/change‑status/add‑note | Modals: Lead Detail (25+ fields, geo/device), Change Status, Add Notes, Notes List. **Mutating:** change status, add note | One list parameterised by stage+date |
| Create lead | `/new-requests/create` | New lead | 2‑section form (~18 fields incl. referral, trial, coupon, country) | submit | **Mutating:** create | Replace free‑text timezone with picker |
| Scheduled‑trials completed (×N date) | `/new-requests/scheduled-trials/completed` | Completed‑trial tracking | recent trials table; top teachers | view report; submit feedback | family/teacher feedback forms; Teacher Report modal. **Mutating:** submit feedback | — |

### A3 · Students
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Student list (+status ×7) | `/management/student`(`/status/{n}`) | Students by status | 7 status KPI cards (clickable); table (Name/Parent/TZ/WA group/Lang/Gender/Age) | filter; add course; edit; suspend; delete | row actions. **Mutating:** suspend/delete/add‑course | KPI cards = status filters |
| Student detail | `/management/student/{id}` | Full student record | tabs: Courses, Trials, Siblings, Monthly Plan; header status | manage courses/classes; certs | 23+ forms / 23 modals incl. Schedule Stop/Suspend, Add Lesson, Mark Attend/Absent, Cancel/Edit Class, Cert info. **Mutating:** many | Most complex page; lazy‑load tabs |
| Student create | `/management/student/{family_id}/create` | New child under family | base fields + optional embedded trial | submit | **Mutating:** create | Always family‑scoped |
| Student edit | `/management/student/{id}/edit` | Edit student | name/name_ar/lang/gender/birth/teacher_note/admin_note | save | **Mutating:** update | Dual‑language name |
| Add trial | `/management/student/{id}/trial/create` | Book trial | student/course/age‑group/material/duration/accounting/date/time/teacher | submit | **Mutating:** create | age‑group radio (Children/Teens/Adults) |
| Student analytics | `/management/analysis-student` | Stats dashboard | KPIs; 7 charts incl. country map | filter month | charts only | Pure read; chart lib + geo map |
| Student report forms | `/management/forms/students` | Monthly progress reports | table; filters; Send Report modal (rubric radios) | filter; send report | **Mutating:** send report | Rubric = report data model |

### A4 · Families / Guardians
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Family list (+status ×7, +filter) | `/management/families`(`/status/{s}`) | Families by status | 7 status KPIs; 12‑col table; advanced finance filter (rate/children/cost type/course type/payment method/currency) | filter; detail; edit; delete; update suspension | Modal: Update Suspension. **Mutating:** delete | Advanced filter = family finance model |
| Family detail | `/management/families/{id}` | Account hub | 8 tabs: Children, Billing, Invoice Adjustments, Credits, Profile Activity, Student Feedback, Settings(×4 forms), Notifications(7×2 matrix) | login‑as; suspend/stop/deactivate/delete; add child/invoice/adjustment/transaction; toggle prefs/notifs | New Transaction, Invoice Adjustment, Suspend/Stop/Schedule‑Stop, Activate. **Mutating:** many | 2nd most complex page |
| Family create | `/management/families/create` | New family | 4 sections: identity/auth, location/TZ, payment/billing, subscription | submit | **Mutating:** create | Full Family entity (≈30 fields) |
| Family edit | `/management/families/{id}/edit` | Edit family | same minus password/location | save | **Mutating:** update | — |
| Family feedback (global) | `/management/families/feedback` | Meetings list | table; date filter; report fields | add notes/report; delete report | Add Notes, Add Report, View/Delete. **Mutating:** save/delete | — |
| Family feedback (per‑family / students) | `/families/feedback/family/{id}`, `/feedback/students` | Scoped feedback | tables/KPIs; Add Meeting Date | add meeting | **Mutating:** add meeting | — |
| Family categories (+create, +assign) | `/management/categories/families`(...) | Org groups | table (Name/Desc/Status/Count); create; assign families (multi‑select) | create/edit/delete/assign | **Mutating:** create/assign | Status enum: Active/Deactive |
| Feedback categories (+create) | `/management/family/feedback-categories` | KPI categories | table; create form | create/edit/delete | **Mutating:** create | Empty in test data |

### A5 · Teachers
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Teacher list (+scope ×5, +sort ×~14) | `/management/teachers`(`/scope/{s}`, sort params) | Teachers by scope | 5 scope KPIs; table (Name/Status/students/hours/phone/schedule/country); filters (material, category) | filter; sort; add; edit; delete | **Mutating:** delete | ~60 crawled pages = one list w/ scope+sort+page state |
| Teacher detail | `/management/teachers/{id}` | Teacher profile | tabs: Home, Monthly Classes, Schedule(availability), Compensations, Salary, Settings, Activity | edit; vacation; reset pw; deactivate/delete; update settings/notifs; manage comp | Availability editor, session popup. **Mutating:** many | Tabbed; availability calendar |
| Teacher create | `/management/teachers/create` | New teacher | 5 sections: main, location, salary, Zoom, additional(+payout) | submit | **Mutating:** create | Largest entity (~40 fields incl. 8 Zoom, payout) |
| Teacher edit | `/management/teachers/{id}/edit` | Edit teacher | same minus location | save | **Mutating:** update | — |
| Teacher details (attendance report) | `/management/teachers_details` | Cross‑teacher attendance | table (Cancel/Absent/Attend counts+hours+%); date filter | filter; per‑row send/edit/delete | **Mutating:** send/edit/delete | — |
| Teacher categories (+create, +edit, +members) | `/management/teacher-categories`(...) | Category CRUD + assign | table; forms (name/status/desc); member multi‑select | create/edit/delete/assign | **Mutating:** create/assign | Mirrors family categories |
| Teacher feedback / monthly performance | `/management/teacher-feedback`(+per‑teacher year) | Performance KPIs | filters (teachers[]/month/year); tables (%, categories) | add category/score | **Mutating:** add feedback | — |
| Compensations (+create, +detail, +edit) | `/management/teachers/{id}/compensations/...` | Fines/bonuses | form (type Fine/Bonus, amount, month, year, desc); detail+timeline | create/edit | **Mutating:** create/edit | Also per‑class deductions on profile |
| Public holiday | `/management/public-holiday` | Bulk teacher absence | date/time window; category multi‑select; teacher table+select‑all | submit | **Mutating:** mass‑schedule | Respects teacher TZ; mass effect — strong confirm |

### A6 · Staff / Admins + Roles/Permissions
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Admins list | `/management/admins` | Staff accounts | table (Name/User/Phone/Role/Actions) | show/edit/permissions/category/duplicate/delete | **Mutating:** delete | Roles: Manager/Accountant/Supervisor/Support |
| Admin create/edit | `/admins/create`, `/admins/{id}/edit` | Staff record | name/email/username/phone/password/salary/currency/role/status/2FA | submit | **Mutating:** create/update | — |
| Permission matrix (×6/×7) | `/admins/permission/{id}` | RBAC | ~170 checkboxes in 17 groups; select‑all/clear‑all; search | save | **Mutating:** save perms | Build as searchable grouped tree |
| Staff activity log | `/admins/appear/{id}` | Audit trail | entity+action filter tabs; log | filter | read‑only | — |
| Staff category scope | `/admins/categories/{id}` | Visibility scoping | student+teacher category checkboxes | save | **Mutating:** save | Scopes what staff can see |

### A7 · Courses (Enrollments)
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Courses list (+type/status ×~18) | `/management/courses`(type/status variants) | Enrollments | table (Student/Teacher/Date/Hours/Status/Invoice/Price); 7 type + 8 status filters | filter; add lesson; assign invoice; update status; bulk‑cancel | Schedule Cancel Classes, Add Lesson, Assign Invoice, Update Status. **Mutating:** all | Type radio = tab strip |
| Course detail | `/management/courses/{id}` | Enrollment detail | Current course; history table; timeline; full class‑action modal set | many class actions; copy; export; change status | 16 modals incl. Add Classes, Schedule Cancel, Mark Attend/Absent, Cancel/Edit, Assign Invoice, Timetable. **Mutating:** many | Action set gated by status |
| Course create (paid) | `/courses/{student_id}/create` | New enrollment | material/teacher/start; schedule repeater; dual rates; cancel limits | submit | **Mutating:** create | Dual rate model |
| Course create (free) | `/courses/{student_id}/create_free` | Free enrollment | same minus family billing | submit | **Mutating:** create | Toggle on create form |
| Course edit | `/courses/{id}/edit` | Edit + regenerate | fields + session‑impact preview table; delete‑old‑sessions | save | **Mutating:** update (destructive option) | Live impact preview |
| Course copy | `/courses/create_new_copy/{id}` | Clone enrollment | same fields; current/default radio | submit | **Mutating:** create | "creates new, not edits" |

### A8 · Classes / Live Sessions
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Session detail (×6 courseclasses + member detail) | `/management/courseClasses/{id}` | Single session lifecycle | info/files/enter‑times/recording/queue/timeline; direct links | attend/absent/cancel/edit/reschedule/queue/WA/feedback | full action modal set. **Mutating:** all | State machine; gate actions by status |
| Session room | `/session-class-room/{enc}/{id}` | Live entry point | renders ops view in legacy | enter session | — | Needs real classroom UI (video/whiteboard) — gap |
| Sessions analysis | `/management/sessions_analysis` | Outcome KPIs | regular+trial+helper KPI groups; filters | filter | read‑only | Near‑real‑time |

### A9 · Timetable / Schedule
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| All‑teachers timetable | `/management/all/teachers/timetable` | Weekly calendar | 7×24 grid; session blocks; teacher toggle | view; click→detail/edit | session popup | Custom calendar component |
| Search schedule | `/management/search-schedule` | Availability matcher | from/to time; category; available‑only toggle | search (async) | results inline | AJAX matcher |
| Request schedule | `/management/request-schedule/{p}/{s}` | Broadcast schedule req | request type (trial/regular); schedule grid; teacher multi‑select | send request | **Mutating:** broadcast | Two‑step in one form |
| Trials/Sessions response | `/schedule-trials-response`, `/schedule-sessions-response` | Request inbox | request + contacted + responses tables | view; (accept/decline) | "Sent"/"Accepted" modals | Inbox pattern |
| Request schedule detail | `/request-schedule/{n}/{n}` | Single request | form | submit | **Mutating:** create | — |

### A10 · Certificates / Materials / Library
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Certificate templates (+create) | `/management/pdf`(`/create`) | Template designer | canvas; merge fields; bg upload; font/size/color/align; mm coords | design; save | **Mutating:** save | Canvas designer; PDF gen |
| Certificate requests | `/management/certificate-requests` | Approve queue | table; filters; Approve modal (template+preview+WA) | approve/cancel/send | **Mutating:** approve | PDF preview iframe |
| Materials (+create, +edit) | `/management/materials`(...) | Subject catalog | table (name/name_ar); forms | create/edit/delete | **Mutating:** CRUD | Bilingual name only |
| Library | `/management/library` | Content + categories | materials table (views/downloads); categories; Add Material (file+thumb) | upload; add/edit category; filter by type | **Mutating:** upload/edit | Multipart upload; type taxonomy |

### A11 · Payments / Invoices / Wallet / Finance
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Invoice list (+status/date/export ×~25) | `/management/invoices`(status/date variants, `downlaod`) | Invoices | 4 status KPIs; table; filters (date‑type Due/Payment, currency, gateway) | filter; record payment; export; restore | New Transaction modal. **Mutating:** record/restore | One list; export = endpoint |
| Create parent invoice | `/invoices/create-parent-invoice/{id}` | Invoice builder | header; line items (courses); discount/fees/additional; adjustment type/value/count; pay method; notify | add line; submit | **Mutating:** create | Reveals invoice model + instalments |
| Monthly invoices | `/management/monthly-invoices` | Monthly grouping | table (Parent/Status); date filter | filter | — | Simple |
| Accounting dashboard | `/management/accounting` | Finance overview | 11 KPIs; 5 charts; FX rate table (16) | filter; edit FX | Currency Rates modal. **Mutating:** save FX | — |
| Transactions (session/invoice/salary tabs) | `/accounting/transaction/{type}` | Ledger | per‑type tables; filters | filter | read‑only | 3 tabs |
| Expenses (+heads) | `/management/expense`, `/management/heads` | Income/outcome ledger | table (10 col); Add/Edit Expense; heads CRUD | add/edit/delete | **Mutating:** CRUD | is_income flag |
| Teacher salaries | `/management/salaries` | Payroll | 6 KPIs; ledger (15 col); slip preview; generate modal | generate; request payouts; delete; slip PDF | Generate Salary, Salary slip. **Mutating:** generate/payout/delete | Attendance‑driven |
| Staff salaries | `/management/staff-salaries` | Staff payroll | ledger (9 col); generate modal | generate; delete | **Mutating:** generate | Simpler (fixed+fine+gift) |
| Payouts (+all) | `/management/payouts`(`?all=1`) | Payout requests | 6 status KPIs; table; bulk approve | filter; approve | **Mutating:** approve | 8 statuses; month vs all toggle |
| Payout providers (+edit) | `/management/payout-providers`(`/{id}/edit`) | Provider config | table (Method/Mode/Active/Webhook); edit (key1–4, mode) | configure | **Mutating:** save creds | Paymob/Payoneer; generic key1–4 |
| Salary class report | `/management/salary-class-report` | Param report | filters (date/group‑by/teacher) | run | read‑only | Inline result table |
| Analysis: invoices | `/management/analysis-invoices` | Invoice analytics | 6 KPIs; 2 charts; family breakdown; status filter | filter | charts | tabbed with P&L |
| Analysis: expenses (P&L) | `/management/analysis-expenses` | Profit & loss | 8 KPIs (expected vs actual); charts; 12‑month table | year range | charts | Budget/forecast layer |
| Payment methods (create/edit) | `/settings/payments/create`, `/{id}/edit` | Gateway config | key1/key2 or custom instructions; live/sandbox | submit | **Mutating:** save | Generic per‑provider |

### A12 · Reports / Messages / Settings / Profile / Utility
| Template | Legacy URL | Purpose | Key sections | Key actions | Modals/forms/tables | Rebuild note |
|---|---|---|---|---|---|---|
| Forms (+create) | `/management/forms`(`/create`) | Report/form builder | table; builder (6 question types, day‑of‑month) | build; save | **Mutating:** save | Closest thing to quiz engine |
| Course analysis | `/management/analysis-course` | Course stats | 2 tabs; KPIs; charts; filters | filter | charts | — |
| Chat | `/management/chat` | Group messaging | contacts + chat; create group; members | message; create; add/leave | Group Settings, Create Group. **Mutating:** send/create | Real‑time (WS) |
| Advertise & Notify | `/management/public-advertisement` | Broadcast | type(dashboard/WA); message+media; targeting; recipients | send | **Mutating:** broadcast | Quota indicators |
| Tasks/Tickets | `/management/tickets` | Staff task board | 5 KPIs; per‑staff table | add section | **Mutating:** add | Empty in test data |
| Settings: General | `/management/settings/general` | Platform config | 4 tabs: identity, teacher pay rules, class automation, accessibility/2FA | save tabs | **Mutating:** save | Tab‑per‑domain |
| Settings: Integrations (+configure) | `/settings/integrations`(`/{id}/configure`) | 11 integrations | catalog (payments/payouts/comms); WhatsApp pairing wizard; Email/SMTP multi‑account | connect/configure | **Mutating:** save keys | Catalog grid + per‑integration form |
| Settings: Notification | `/settings/notification` | Routing matrix | ~47 toggles: event × role × channel | save | **Mutating:** save | Build as matrix grid |
| Settings: Security (data/policy/backup) | `/settings/security/data`,`/policy` | Import/backup/policies | 4 CSV imports; backup send; dual rich‑text policy editor | import; save | **Mutating:** import/save | Quill editors |
| Settings: Customisation | `/settings/customisation/personalisation` | Theming | 2 brand colors; theme(light/dark/system); layout/sidebar/card; 11 status colors; pick‑from‑logo | save; reset | **Mutating:** save | Confirms our themeable + dark‑mode direction |
| Profile show/edit | `/management/profile/show`,`/edit` | Account | display; edit (name/email/username/avatar/password) | save | **Mutating:** save | — |
| Time converter | `/management/time-convertor` | TZ tool | TZ grid; DST changes table; add location | navigate; add location | Add Location modal | Custom TZ component |
| Scheduled actions (+create) | `/management/scheduled-actions`(`/create`) | Automation | table; conditional create form (stop/activate/cancel) | filter; create | **Mutating:** schedule | Conditional form by action type |

---

## B. TEACHER (`/teacher/*`) — ~18 templates (26 crawled pages)

| Template | Legacy URL | Purpose | Key sections | Key actions | Modals | Rebuild note |
|---|---|---|---|---|---|---|
| Teacher home | `/teacher/home` | Daily classes | hours/attendance KPIs; salary‑till‑today tile; today table | enter; end; request‑cancel; edit; reminder | End class, Mark absent, Edit Class, Request Cancel, Add shortcuts. **Mutating:** end/absent/cancel/edit | Cleaner per‑row menu |
| Timetable | `/teacher/timetable` | Weekly + availability | 7×24 grid | view; set availability; edit schedule | Availability, Edit Schedule. **Mutating:** availability/edit | Calendar + availability editor |
| Students list | `/teacher/studentslist` | Roster | table (Name/Country/Course/History/Schedule/Report/plans/cert) | view; report; request cert | Student Timetable, Send Report (24‑field), Request Certificate. **Mutating:** report/cert | Big report form → drawer |
| Monthly reports roster | `/teacher/students` | Reports list | table; Send Report | report | Send Report. **Mutating:** report | Narrow studentslist |
| Monthly plans (+show) | `/teacher/monthly-plans`(`/{id}/show`) | Report history | tables (pending/history) | view; report; (approve = mgmt) | Send Report. **Mutating:** report | Notification landing |
| Chat | `/teacher/chat` | Messaging | contacts + chat | message; group settings; leave | Group Settings. **Mutating:** send/leave | Real‑time |
| Library | `/teacher/library` | Browse content | search; category filter | search; filter | — | Read‑only |
| Tasks | `/teacher/tickets` | Task view | KPIs; staff table | — | — | Read‑only / empty |
| Salary | `/teacher/salary` | Own salary | ledger (13 col incl. trials) | — | — | Read‑only |
| Salary class report (+results) | `/teacher/salary-class-report` → `/teacher/update-result` | Salary report | filters; 23‑col results table | filter | — | Horizontal scroll + sticky col |
| Course/Teacher history (+class) | `/teacher/course-history/{id}`, `/teacher/teacher-history/{id}`, `/.../{id}/class` | Class history | table; class detail card | view detail | Student Details. read‑only | **Consolidate duplicate routes** |
| Session room | `/teacher/session-class-room/{enc}/{n}` | Live entry | falls back to home in legacy | enter | (home modals) | Needs real classroom UI — gap |
| Profile edit | `/teacher/profile-edit` | Account | profile + change password | save | **Mutating:** save | `/teacher/profile` is 500 — drop |
| Update‑result (salary) | `/teacher/update-result?...` | Salary detail | 23‑col table; filter | filter | — | (see salary report) |
| **Error pages** | `/teacher/profile` (500), `*/main/index.html` (404) | — | — | — | — | Do not rebuild; fix nav |

**Cross‑role read‑throughs:** teacher links into `/management/student/{id}` (renders home / effectively blocked) — in rebuild, give a teacher‑scoped student view instead.

---

## C. FAMILY / GUARDIAN (`/student/*`) — ~12 templates (13 crawled pages)

| Template | Legacy URL | Purpose | Key sections | Key actions | Modals | Rebuild note |
|---|---|---|---|---|---|---|
| Student home | `/student/home` | Dashboard | hours KPIs; time gauge; today's classes; teachers panel | view invoices; request trial; show more | notifications. **Mutating:** mark‑notifications‑read | Child name shown (RTL‑capable) |
| Timetable | `/student/timetable` | Weekly grid | 7‑day (Sat‑first) table | — | — | Fixed current week (no nav captured) |
| Classes summary / history | `/student/student-history-fillter` | Past sessions | table (Date/Teacher/Show); student filter | view detail; filter | Student Details (×2). read‑only | Multi‑child filter |
| Courses / subscriptions | `/student/studentslist` | Enrollments | table (Status/Teacher/Course/Subscription/History/Feedback); child filter | view; feedback about teacher | **Feedback about your teacher** (rating+qual). **Mutating:** feedback | Per‑subscription feedback |
| Billing | `/student/billing` | Invoices (view) | table (Serial/Month‑Year/Due/Course/Amount/Status) | view | — | Read‑only; no pay form found — flag |
| Student feedback / meetings | `/student/feedbacks` | Meeting log | table (Meeting Date/Time/Manager/Members/Action) | view | — | Empty in test data |
| Library | `/student/library` | Browse content | search; category filter; cards | search; filter | — | Read‑only; Arabic categories |
| Today's sessions | `/student/today-sessions` | Live classes | table (10 col incl. Files); date filter | view; request cancel; upload files | **Request Cancel**, **Upload File** (file + voice record). **Mutating:** cancel/upload | Most complex; MediaRecorder for voice |
| Request trial | `/student/request-trial` | Trial wizard | 2 steps: student details (new/existing child), trial info | submit | **Mutating:** create | Conditional new‑vs‑existing child |
| Profile edit | `/student/profile-edit` | Account | profile + change password | save | **Mutating:** save | `/student/profile` is 500 — drop |
| **Error pages** | `/student/profile` (500), `/main/index.html` (404) | — | — | — | — | Do not rebuild; fix nav |

**Family account model:** guardian‑operated, student‑centric; supports **multiple children** (child selector on history/courses; new‑vs‑existing child in trial wizard).

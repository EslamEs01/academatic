# Legacy Inventory Audit — Spec 023 Full Legacy Coverage Audit 000–022

- **Title:** Legacy Inventory Audit (roles · routes · templates · nav · forms · modals · tables · interactions · screenshots · unsafe endpoints)
- **Audit date:** 2026-07-06
- **Baseline:** branch `feature/012-role-portal-foundation`, HEAD `837b0c1`, Specs 020/021/022 committed, 77 public HTML files
  (evidence: `specs/023-full-legacy-coverage-audit/agent-findings/00-main-session-grounding.md` §"Baseline facts")
- **Inputs used (findings files):**
  - `specs/023-full-legacy-coverage-audit/agent-findings/00-main-session-grounding.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/01-legacy-routes.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/02-legacy-screenshots-admin.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/02-legacy-screenshots-family.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/02-legacy-screenshots-teacher.md`
  - `specs/023-full-legacy-coverage-audit/agent-findings/03-legacy-forms-modals-tables.md`

All evidence paths below are relative to `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/` unless prefixed with `specs/`. Legacy is a **capability checklist, not a visual clone target** (binding law); rows marked "intentional exclusion" are law-mandated, not gaps.

---

## 1) Role list

The legacy system has exactly **THREE authenticated roles**, all logging in through the same `/login` URL with distinct credentials (`roles.config.json` lines 4–38; every combined report header repeats "Roles with crawled output: admin, teacher, family").

| Role key | Label | Login URL | Auth state file | Output dir | Evidence |
|---|---|---|---|---|---|
| `admin` | Administrator | `https://academatic.online/login` | `auth-state-admin.json` | `output/roles/admin` | `roles.config.json` lines 3–14 (via `agent-findings/01-legacy-routes.md` §1/§7) |
| `teacher` | Teacher | `https://academatic.online/login` | `auth-state-teacher.json` | `output/roles/teacher` | `roles.config.json` lines 15–26 (via `agent-findings/01-legacy-routes.md` §1/§7) |
| `family` | Family / Guardian | `https://academatic.online/login` | `auth-state-family.json` | `output/roles/family` | `roles.config.json` lines 27–38 (via `agent-findings/01-legacy-routes.md` §1/§7) |

**No fourth role exists.** `roles.config.json` line 41 lists `supportedFutureRoles: ["student", "manager", "director", "staff", "guardian"]` — placeholders never configured with credentials and never crawled (`output/combined/missing-coverage.md` line 11: only admin/teacher/family "produced output"; via `agent-findings/01-legacy-routes.md` §1).

## 2) Route list by role

Full per-route detail lives in `output/combined/page-inventory.md`; module counts in `output/combined/role-permission-matrix.md` lines 13–33 (both via `agent-findings/01-legacy-routes.md` §2).

**Route prefixes (page-inventory.md, via `agent-findings/01-legacy-routes.md` §2):**

| Role | Prefixes | Pages visited / routes discovered |
|---|---|---|
| admin | `https://academatic.online/management/*` (all 300 pages) + 1 shared `teacher/home` capture (`page-inventory.md` line 312) | 300 / 365 (budget-capped — see §10) |
| teacher | `https://academatic.online/teacher/*` (bulk) + shared `management/home`, `management/student/1` + `/main/index.html` 404 stubs | 26 / 37 |
| family | **every crawled page is `https://academatic.online/student/*`** (`billing`, `feedbacks`, `home`, `library`, `profile`, `profile-edit`, `request-trial`, `student-history-fillter`, `studentslist`, `timetable`, `today-sessions`) + shared `management/home` + `/main/index.html` 404 stub (`page-inventory.md` lines 349–361) | 13 / 24 |

**Module → page counts per role** (`output/combined/role-permission-matrix.md` lines 13–33, via `agent-findings/01-legacy-routes.md` §2):

| Module | admin | family | teacher |
|---|---|---|---|
| Dashboard / Home | 29 | 3 | 4 |
| Students | 26 | 8 | 5 |
| Teachers | 94 | 0 | 15 |
| Parents / Guardians / Families | 31 | 0 | 0 |
| Courses | 22 | 1 | 3 |
| Classes / Live Sessions | 10 | 2 | 5 |
| Timetable / Schedule | 6 | 1 | 1 |
| Assignments / Homework | 1 | 0 | 1 |
| Exams / Quizzes | 2 | 0 | 0 |
| Certificates | 3 | 0 | 0 |
| Payments / Invoices | 51 | 2 | 0 |
| Wallet / Finance | 16 | 0 | 3 |
| Reports / Analytics | 16 | 0 | 1 |
| Messages / Notifications | 4 | 0 | 1 |
| Content / Materials / Library | 4 | 1 | 1 |
| Settings | 27 | 0 | 0 |
| Roles / Permissions | 2 | 0 | 0 |
| Profile / Account | 5 | 1 | 1 |
| General / Unknown | 12 | 2 | 5 |
| Subjects · Attendance | 0 | 0 | 0 |

Note the legacy permission scoping itself: Payments/Invoices present for admin+family but **absent for teacher's invoice module** — yet teacher DOES have 3 Wallet/Finance pages (`/teacher/salary`, `/teacher/salary-class-report`, `/teacher/update-result`), which the rebuild excludes by the teacher pay-free GLOBAL law (intentional exclusion, evidence: `agent-findings/02-legacy-screenshots-teacher.md` §"Legacy TEACHER pay/finance surfaces"; `output/combined/missing-coverage.md` lines 199–215 via `agent-findings/01-legacy-routes.md` §6).

**Dead/error routes that must NOT inflate "missing" counts:**

| Route | Status | Evidence |
|---|---|---|
| `/teacher/main/index.html` | 404 "Opps!!!" (broken legacy "Dashboard 1" sidebar link) | `output/roles/teacher/pages/teacher-main-index-html.md` via `agent-findings/02-legacy-screenshots-teacher.md` row 17 |
| `/teacher/course-history/main/index.html` | 404 "Opps!!!" | `output/roles/teacher/pages/teacher-course-history-main-index-html.md` (same) |
| `/teacher/monthly-plans/main/index.html` | 404 "Opps!!!" | `output/roles/teacher/pages/teacher-monthly-plans-main-index-html.md` (same) |
| `/main/index.html` | 404 "Opps!!!" (also hit by family role) | `output/roles/teacher/pages/main-index-html.md` + `output/roles/family/pages/main-index-html.md` via `agent-findings/02-legacy-screenshots-family.md` §1 |
| `/management/invoicesexportData` | `failed_with_error` — export action, never rendered | `output/combined/missing-coverage.md` lines 55–60 via `agent-findings/01-legacy-routes.md` §6 |
| `/management/courseClasses/export-class/1` | `failed_with_error` — export action, never rendered | same |
| `/management/export-course` | rendered a hard 500 Server Error page | `output/roles/admin/screenshots/management-export-course-full.png` via `agent-findings/02-legacy-screenshots-admin.md` risk 1 |
| `/management/pdf` | rendered a hard 500 Server Error page | `output/roles/admin/screenshots/management-pdf-full.png` (same) |
| `/student/profile` | 500 Server Error (view route broken; only `profile-edit` works) | `output/roles/family/screenshots/student-profile-full.png` via `agent-findings/02-legacy-screenshots-family.md` §7 |
| `/teacher/profile` | error capture "Something went wrong" (only `profile-edit` works) | `output/roles/teacher/pages/teacher-profile.md` lines 32–49 via `agent-findings/02-legacy-screenshots-teacher.md` row 12 |
| `/management/settings/customisation/message-builder` | Gateway Timeout at capture | `08-role-page-inventory-v2.md` via `agent-findings/01-legacy-routes.md` §6 risks |
| `/management/teachers/1/monthly-classes` | HTTP 500 at capture | `frontend-planning-deep/08-role-page-inventory-v2.md` line 81 via `agent-findings/01-legacy-routes.md` §6 risks |

**Route aliasing (not distinct pages):** `/management/home` 302-redirects per role — for family it renders the exact same page as `/student/home` (`output/roles/family/pages/management-home.md` via `agent-findings/02-legacy-screenshots-family.md` §2); for teacher, `management-home`, `management-student-1`, and `teacher-session-class-room-mq-2` captures are byte-identical redirected copies of `/teacher/home` (`agent-findings/02-legacy-screenshots-teacher.md` row 1 + final risk). The true teacher live class-room page was never distinctly captured — classify as **unverified**, not covered or excluded.

## 3) Page templates by role

Per `frontend-planning-deep/08-role-page-inventory-v2.md` line 5 (via `agent-findings/01-legacy-routes.md` §3): **339 captured pages → 178 route templates**.

| Role | Captured pages | Route templates | Evidence |
|---|---|---|---|
| admin | 300 (600 files ÷ 2 in `output/roles/admin/pages/`) | 145 | `agent-findings/01-legacy-routes.md` §3; `page-inventory.md` line 363 |
| teacher | 26 (52 files ÷ 2) | 22 | same |
| family | 13 (26 files ÷ 2) | 11 | same; templates map 1:1 to the 11 distinct `/student/*` routes (`08-role-page-inventory-v2.md` lines 315–365) |
| **Total** | **339** | **178** | `20-no-missing-items-audit.md` line 6: "339/339… 0 orphans, 0 map-only… 0 artifact gaps" |

Admin module-group breakdown of the 300 full screenshots (approximate, filename-prefix derived — `agent-findings/02-legacy-screenshots-admin.md` §"Module-group inventory", zero uncategorised prefixes): Teachers ~71 · Settings 29 · Families 26 · Invoices 19 · Courses 19 · New-requests 15 · Students 13 · Admins 11 · Home 8 · Download center 7 · Courseclasses 7 · Categories 6 · Accounting 6 · Analysis 4 · Payout providers 3 · Class/session deep-link 3 · Class feedback 3 · plus ~20 one/two-instance groups (banks, certificate-requests, chat, expenses, forms, groups, heads, library, materials, monthly-invoices, profile, public advertisement/holiday, request-schedule, salaries, salary-class-report, scheduled-actions, schedule-responses, search-schedule, staff-salaries, tickets, time-convertor, total-queues, all-teachers-timetable).

## 4) Sidebar / menu items by role

**Admin** (`output/roles/admin/pages/management-home.md` lines 615–654, sampled prefix — the full admin rail has more rows; via `agent-findings/01-legacy-routes.md` §4): My Profile, Log Out, Home, Teachers Schedule, Chat, New Requests, Sessions Analysis, Time Convertor, Public Holiday, Advertise & Notify, Tasks, Scheduled Actions, Families, Add new Family, Students, Courses, Families Category, Groups, Search Schedule, Request Result, Student Feedback, Teachers, Add New Teacher, Teachers Category, Teachers (details), KPIs, Classes KPI, Monthly Performance, monthly reports, Students (analysis), Invoices & Accounts, Profits & Losses, Accounting, Transaction, Expenses, List of Invoices, List of Monthly Invoices, Salaries, …

**Teacher** (`output/roles/teacher/pages/management-home.md` lines 322–333, via `agent-findings/01-legacy-routes.md` §4): Home, Chat, Schedule, Students, Library, Tasks (New), Log Out, monthly reports, **Salaries**, **Salary Class Report**, Log Out (duplicate render). The Salaries / Salary Class Report items (routes `/teacher/salary`, `/teacher/salary-class-report`, `page-inventory.md` lines 334–335) are legacy capability the rebuild **intentionally excludes** per the teacher pay-free GLOBAL contract (Spec 016) — a law-mandated exclusion, not a gap.

**Family** (`output/roles/family/pages/student-home.md` "Sidebar Links (15)" section, via `agent-findings/01-legacy-routes.md` §4): Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout — 8 real nav rows (plus icon-only/duplicate/`javascript:void(0)` placeholders). Mapped routes: `/student/home`, `/student/timetable`, `/student/student-history-fillter?2`, `/student/studentslist`, `/student/billing`, `/student/feedbacks`, `/student/library`, `/student/logout`. Note the sidebar label "Courses" opens a page titled **"All Account Subscriptions"** — account-level, multi-child (`output/roles/family/pages/student-studentslist.md` via `agent-findings/02-legacy-screenshots-family.md` §11).

## 5) Forms by role

Crawler total: **1,713 forms** discovered; distinct form-bearing URLs: **admin 294 · teacher 21 · family 4**; **109 distinct mutation endpoints** overall (`output/combined/form-inventory.md` + `frontend-planning-deep/06-complete-data-surface.md` §B, via `agent-findings/03-legacy-forms-modals-tables.md` §1). The 1,713-vs-319 spread is global chrome (logout/shortcuts/notifications) repeating on nearly every page.

**Admin (~95 admin-only mutation endpoints)** — key entity families (`06-complete-data-surface.md` §B via `agent-findings/03-legacy-forms-modals-tables.md` §1): Family CRUD + lifecycle (`families`, `…/deactivate|stop|suspend|activate`, location/preferences/capabilities/notifications/invoice-adjustments) · Student CRUD + lifecycle (`student/{id}/store|update|delete|stop`, trial store) · Teacher CRUD (`teachers` ×56 / `teachers/{id}` ×50, salary_type field) · Teacher compensations (`compensations/{id}` ×22: type, amount, month, year) · Course (`store`, `store_free`, `update_status` ×17, `delete` ×12; family/teacher hour-rate fields) · Session/class (`add-classes` ×19, `edit-class` ×20) · Invoice (`invoices` ×28) · Transaction (`accountant/store-transaction` ×28) · Salaries/Payouts (`salaries`, `staff-salaries`, `payouts/approve`, `payout-providers/{id}`) · Expense (`expense`, `heads`) · Admins/RBAC (`admins` ×3, `permission/store`; the create form carries a native Salary+Currency field — admin-only, sanctioned) · Groups · Leads/CRM (`new-requests`) · Settings (7 sub-forms) · Certificates (`create-certificate`, `upload-certificate`) · Materials/Library · Public holiday / scheduled actions (×16) · Class/teacher feedback (×21/×2) · Forms builder.

**Teacher (10 distinct mutation endpoints)** — `form-inventory.md` teacher section lines ~19381–20389 via `agent-findings/03-legacy-forms-modals-tables.md` §1:

| Endpoint | Capability | Pay fields? |
|---|---|---|
| `POST /teacher/edit-class` | edit own session (date/time/duration/sendMessage) | **none — confirmed field-by-field** |
| `POST /teacher/classes-end` | end-of-class report (remark enum, summary, homework, notes, images[]) | none |
| `POST /teacher/classes-absent` | mark class absent (video upload, notes) | none |
| `POST /teacher/student-progress` | monthly progress report (24-field structured form) | none |
| `POST /teacher/certificate-request` | request certificate (course_id, description, date) | none |
| `POST /teacher/update-teacher-password` | change password | none |
| `POST /teacher/profile-edit` | profile (image, names, email) | none |
| `POST /teacher/timetable` | availability/course selection | none |
| `POST /teacher/get-schedual` | schedule lookup | none |
| `POST /teacher/logout` | session end | none |

**Family (6 distinct mutation endpoints)** — `form-inventory.md` family section lines ~20390–20619 via `agent-findings/03-legacy-forms-modals-tables.md` §1: `POST /student/request-trial` (stepped wizard: Create New Child / Choose Existing Child radio, name, age, language, gender, student_id, date/time/duration/course) · `POST /student/feedback` (teacher rating: see_hear, like_teacher, complain) · `POST /student/upload-files` (session files[] + hidden audio voice-note) · `POST /student/update-password` · `POST /student/profile-edit` · `POST /student/logout`. **Zero currency/amount fields in any family form** — the zero-pay law holds at the form level, not just copy level (`agent-findings/03-legacy-forms-modals-tables.md` §1, family subsection).

## 6) Modals by role

Instance counts (`output/combined/modal-inventory.md` role-boundary headings via `agent-findings/03-legacy-forms-modals-tables.md` §2): **admin 1,280 · teacher 77 · family 16 · total 1,373**, deduplicated to **66 distinct modals** (63 functional + 3 global chrome) in `frontend-planning-deep/05-distinct-interaction-catalog.md` §B + `11-interactions-states-v2.md` line 6.

**Admin (notable):** Mark As Absent (20 pages) · Cancel Class (20) · Mark as attend (20) · Send Whatsapp Message (20) · New Transaction (28, currency-bearing, admin-only) · Schedule Cancel Classes (6, bulk) · Suspend/Stop/Schedule-Stop/Activate family & student lifecycle · Certificate Information / Request Certificate · Create Group / Add Member · view-only: Student Timetable, Details, Notes List, Direct Links for Sessions, Total Queues, Course History, Country List, Teacher Salary (Download only). (Evidence: `05-distinct-interaction-catalog.md` §B via `agent-findings/03-legacy-forms-modals-tables.md` §2.)

**Teacher (notable):** End class (remark/summary/homework/notes/images[]) · Mark class as absent (video/notes) · Request Certificate ("sent to management for approval" — `output/roles/teacher/screenshots/teacher-studentslist-004-page-interaction-004.png`) · Send Report / Monthly Report (24-field) · Availability + Edit Schedule modals on timetable · Student Details (view) · Student Timetable (view) · Chats offcanvas · Group Settings (About/Members/Leave Group). (Evidence: `agent-findings/02-legacy-screenshots-teacher.md` rows 2–4, 10 + `agent-findings/03-legacy-forms-modals-tables.md` §2.)

**Family (notable):** Feedback about your teacher (matches `POST /student/feedback`) · Upload File: (files[] + voice recording Start/timer — matches `POST /student/upload-files`) · Request Cancel (Reschedule vs No-Reschedule radio + new date/time — the ONE mutation modal shared verbatim with teacher) · Student Details (view, per-class remark/summary/homework/note/files drill-down on the history page). (Evidence: `agent-findings/03-legacy-forms-modals-tables.md` §2 + `output/roles/family/pages/student-today-sessions.md`, `student-student-history-fillter-2.md` via `agent-findings/02-legacy-screenshots-family.md` §10/§13.)

## 7) Tables by role

**104 distinct column-sets** total (`output/combined/table-inventory.md` deduplicated in `06-complete-data-surface.md` §C, via `agent-findings/03-legacy-forms-modals-tables.md` §3). Operationally important shapes:

| Reuse | Role | Columns (abbrev.) | Meaning |
|--:|---|---|---|
| 55 | admin | Teacher Name, Status, Total Hours, Phone, Schedule, Country, … | teacher roster + per-status scopes |
| 26 | admin | Ordered Number, Due Date, Parent, Payment Id, Total Price, Total (AED), Status | invoices list — **currency column, admin-only (sanctioned)** |
| 18 | admin | Category, Percentage | teacher-category report |
| 18 | admin | Student, Teacher, Duration, Week Days, Time ×2 | timetable grid |
| 14 | admin | Student, Teacher, Date, Total Hours, Status, Invoice, Price | session/accounting ledger |
| 11 | admin | Class Time, Student/Group, Teacher, Course, Left hours, Class Status, Actions | course-classes session table (spawns Attend/Absent/Cancel modals) |
| 9 | admin | Family name, Phone, Join Date, Course Type, No. Children, Hour Rate, Total Hours | families list |
| 9 | admin | Date, Parent name, E-mail, Phone, Status | leads/new-requests |
| 8 | admin | Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age | student roster |
| 7 | admin | Currency, Code, Rate | FX rates |
| 6 | admin | Name, Status, Last Feedback, Next Meeting, Meeting Manager | family feedback/meeting tracker |
| 4 | teacher | Class Time, Student Name, Course Name, Class Status, History, Action | teacher class list — **no rate/amount column, confirmed** |
| 4 | family/teacher | Class Date & Time, Teacher Name, Show | shared history/today-sessions shape |
| 2 | admin/teacher | Name, Total:, Pending, Overdue, Completed, Average | task/report summary ("Total:" ambiguous — flagged for field-level confirmation before any port) |
| 2 | family | "No Teachers" | verified empty-state |

**Family-role table schemas (from screenshots, `agent-findings/02-legacy-screenshots-family.md`):** Billing = `#, Serial No, Month-Year, Due Date, Course, Amount, Status` — legacy billing IS amount-bearing; the rebuild's status-first/hour-quota billing is a **declared, deliberate exclusion** (Spec 020) · Feedback meeting log = `#, Meeting Date, Meeting Time, Meeting Manager, Family Members, Action` · Subscriptions = `#, Student Name, Status, Teacher Name, Course Name, Subscription, History, Feedback About Course` (no Amount column) · Timetable = Sat–Fri week grid · Today-sessions = `Class Date, Class Time, Student Name, Teacher Name, Course Name, Subscription, Class Status, History, Files`. All family tables were captured **empty** (fixture account) — column schemas provable, populated rendering NOT provable (`agent-findings/02-legacy-screenshots-family.md` risk 2).

**Teacher pay-bearing tables (intentional exclusions per pay-free GLOBAL law, evidence `agent-findings/02-legacy-screenshots-teacher.md` §"pay/finance surfaces"):** `/teacher/salary` 13-column ledger (Fixed…Fine/Gift/Hour Rate/Total:/Status) · `/teacher/salary-class-report` "Report By Student" (rates/Total:/Paid, EGP) · `/teacher/update-result` 23-column report (Price/Paid Duration/Paid/Paid-if-continue/Free, EGP) · plus the `/teacher/home` "Your Salary" band (997.00 EGP + Estimated 1,537.00 / Fines 1,003.00 / Bonus 2,000.00). Four distinct pay surfaces — note the fourth (`update-result`) is reachable ONLY via the home salary-band link, not the sidebar.

**Admin finance-only shapes (sanctioned, admin surface):** Payment Id/Due Date/Amount, expense ledger (Value/Currency/Transaction Type), salary summary (Teachers/Staff Total Salary), P&L (Expected/Actual Revenue, Net Profit) — all with currency columns, all admin-scoped (`agent-findings/03-legacy-forms-modals-tables.md` §3).

## 8) Interactions by role

Evidence: `output/combined/interaction-inventory.md` + `05-distinct-interaction-catalog.md` §C + `11-interactions-states-v2.md`, via `agent-findings/03-legacy-forms-modals-tables.md` §4.

| Interaction class | admin | teacher | family | Notes |
|---|--:|--:|--:|---|
| Dropdown/menu opens | 513 | 26 | 12 | row action menus, profile/lang/notification chrome, select2 filters (top fields: Month 278, material_id 63, category_id 56, duration 54, teacher_id 51, status 49; currency/gateway filters admin-only) |
| Tab changes | 8 | 0 | 0 | all admin (session-action tabs; family/teacher detail pages are flatter) |
| Accordion expands | 104 | 0 | 0 | admin filter panels/detail sections |
| Inline state changes | 4 | 1 | 0 | toggle-style controls |
| Wizards | — | — | 1 | family `request-trial` stepped form (`steps-uid-0`), radio-gated Create-New vs Choose-Existing child |
| Uploads | Add Material, certificates | classes-absent video | upload-files (files[] + voice audio) | |
| Chat | offcanvas (view-only) | offcanvas (view-only) | — | message-SEND never captured — unconfirmed capability, do not invent fields |
| Date ranges | date_type 26, date_payment 26 | salary-report range filter | inside Request-Cancel modal | |

Role-specific workflow highlights: admin session lifecycle set (Attend/Absent/Cancel/Edit/Reschedule/Make-up/Queue, status-gated) · teacher end-of-class + monthly-report + certificate-request pipeline (the monthly-report workflow is duplicated across `/teacher/students`, `/teacher/studentslist`, `/teacher/monthly-plans` + approval queue at `/teacher/monthly-plans/{id}/show` — ONE capability, count once; `agent-findings/02-legacy-screenshots-teacher.md` risks) · family trial-booking wizard, post-class teacher feedback, homework/voice upload, session Request-Cancel · teacher home row actions View / Enter Again / End class / Send Reminder / gear menu (Reschedule/Edit/Cancel) (`agent-findings/02-legacy-screenshots-teacher.md` row 1).

Also: `/teacher/tickets` ("Tasks") carries a computed pie chart + "Average" column — a second forbidden-pattern class (no computed chart/score) beyond pay: intentional exclusion when audited against the rebuild (`output/roles/teacher/pages/teacher-tickets.md` lines 103–120 via `agent-findings/02-legacy-screenshots-teacher.md` row 11). Admin's "Top Teachers This Week" Rank/Teacher/Trials leaderboard (`management-new-requests-…trials-completed…png`) is on the ADMIN surface — flagged for a conscious decision, not an automatic violation (`agent-findings/02-legacy-screenshots-admin.md` risk 4).

## 9) Screenshot counts by role

Directory listings of `output/roles/{role}/{pages,screenshots,html/sanitized}` (via `agent-findings/01-legacy-routes.md` §5); visual-audit sample sizes from the 02-series findings.

| Role | pages (files÷2) | Screenshots | of which `*-full.png` | html/sanitized | Visually opened in this audit |
|---|--:|--:|--:|--:|---|
| admin | 300 | **1,019** | **300** | 300 | 68 full shots across every module group (`agent-findings/02-legacy-screenshots-admin.md` §Evidence) |
| family | 13 | **27** | 13 | 13 | 27/27 (100%) + 13/13 page `.md` (`agent-findings/02-legacy-screenshots-family.md` §Evidence) |
| teacher | 26 | **67** | 26 | 26 | 14 PNGs + 26/26 page `.md` (`agent-findings/02-legacy-screenshots-teacher.md` §Evidence) |

Screenshot count exceeds page count because most pages captured a full shot plus 1–2 interaction shots (e.g. `student-home-full.png` + two `…-page-interaction-00N.png`; `agent-findings/01-legacy-routes.md` §5). Crawler recorded **0 failed pages / 0 failed interactions** (`output/combined/failed-pages.md` via `agent-findings/01-legacy-routes.md` §6).

## 10) Unsafe / skipped endpoints

Evidence: `output/combined/skipped-actions.md` (full) + `output/combined/missing-coverage.md` lines 39–187 + `output/combined/button-coverage.md`, via `agent-findings/01-legacy-routes.md` §6 and `agent-findings/03-legacy-forms-modals-tables.md` §5. **Totals: 84 route-level skips + 1,935 action-level refusals.**

**Route-level `skipped_unsafe_reason` (5):**

| Route | Role | Why notable |
|---|---|---|
| `/management/logout` | admin | logout treated unsafe everywhere |
| `/teacher/logout` | teacher | same |
| `/student/logout` | family | same — and its very shape (`/student/logout` on the FAMILY session) corroborates `/student/*` = family ownership |
| `/management/student/1/suspend` | admin | crawler refused even a GET — **suspend is the single most guarded capability in the legacy app** |
| `/management/student/2/suspend` | admin | same |

**Route-level `skipped_safe_reason` (~79):** 9 locale-switch URLs per role (`…/lang/{ar,fr,de,es,ur,it,pt,ru,tr}` — deliberately un-crawled; the rebuild's ar/en toggle has ZERO legacy behavioral evidence, a "design fresh" item, not a gap) + admin pagination/sort-permutation URLs cut off by the **300-page budget cap (300/365 admin routes visited — variants of already-covered templates, so do NOT claim 100% admin route coverage, and do NOT count the 65 unvisited as missing capability)**.

**Route-level `failed_with_error` (2):** `/management/invoicesexportData`, `/management/courseClasses/export-class/1` — export actions with no page to render; classify as legacy export actions, never renderable templates (see §2 dead-routes table).

**Action-level refusals (1,935):**

| Class | admin | teacher | family | Notes |
|---|--:|--:|--:|---|
| mutating | 1,463 | 72 | 6 | every Save/Submit/Add/Delete/Send/Approve — crawler policy, not a gap; the role distribution itself maps where legacy concentrates mutating power |
| submit | 353 (of 393 total) | — | — | mostly "See All Notifications" (non-GET read — legacy tech debt) + teacher "Show Details" + family "Upload" (both real capability signals) |
| logout | 1 | — | — | a mid-page Logout button on `settings/integrations/1/configure` |

**Unresolved capability flags carried forward** (from `agent-findings/03-legacy-forms-modals-tables.md` risks): family `student/today-sessions` "Send" button has no matching captured form — confirm against Spec 020's shipped family actions before closing 023 · chat message-send unconfirmed (pagination endpoints only) · teacher live class-room page never distinctly captured (redirects) — mark **unverified / needs fresh crawl**.

---

## Verification block — corrected role model (Spec 021 DEC-001..009)

Each line states the claim, the verdict, and the exact evidence path(s).

- **Admin role exists — VERIFIED.** `roles.config.json` lines 3–14 (key `admin`, label "Administrator", dedicated credentials, `auth-state-admin.json`); 300 crawled pages at `output/roles/admin/pages/` and `output/combined/page-inventory.md` line 9. (Via `specs/023-full-legacy-coverage-audit/agent-findings/01-legacy-routes.md` §7.)
- **Teacher role exists — VERIFIED.** `roles.config.json` lines 15–26 (key `teacher`, dedicated credentials, `auth-state-teacher.json`); 26 crawled pages rooted at `/teacher/*` (`output/combined/page-inventory.md` line 314; sidebar inventory `output/roles/teacher/pages/management-home.md` lines 322–333). (Via `agent-findings/01-legacy-routes.md` §7.)
- **Family role exists — VERIFIED.** `roles.config.json` lines 27–38 (key `family`, label "Family / Guardian", dedicated credentials, `auth-state-family.json`); 13 crawled pages (`output/combined/page-inventory.md` line 345; `output/combined/academy-system-map.md` line 19). (Via `agent-findings/01-legacy-routes.md` §7.)
- **NO standalone Student role exists — VERIFIED.** The crawler's authenticated `roles` array contains exactly three entries (admin, teacher, family); "student" appears ONLY in `supportedFutureRoles` (`roles.config.json` line 41) with no credentials/auth-state ever populated; `output/combined/missing-coverage.md` line 11 states only admin/teacher/family "produced output"; every combined report header repeats "Roles with crawled output: admin, teacher, family" (`page-inventory.md` line 5, `role-permission-matrix.md` line 5, `academy-system-map.md` line 5, `missing-coverage.md` line 5). No counter-evidence anywhere in the crawl. (Via `agent-findings/01-legacy-routes.md` §7 + closing risk note.)
- **`/student/*` belongs to the Family/Guardian login — VERIFIED (route + form + visual + multi-child evidence).**
  1. All 13 family-role captures are `/student/*` routes (or the two shared aliases) — `output/combined/page-inventory.md` lines 349–361; `output/roles/family/pages/student-home.md` records `Role | family`, logout action `POST https://academatic.online/student/logout`, and `Discovered From: route …/management/home via sidebar`. (Via `agent-findings/01-legacy-routes.md` §7.)
  2. Visual: `output/roles/family/screenshots/student-home-full.png` shows the guardian home with child persona «الطالبة لمار حسن» under the family sidebar. (Via `agent-findings/01-legacy-routes.md` §7 + `agent-findings/00-main-session-grounding.md` observation 2.)
  3. Multi-child guardian proof (five independent pieces, `agent-findings/02-legacy-screenshots-family.md` §"Cross-page role-model evidence"): a SECOND child «منار حسن» selectable on the class-history page for the same session (`output/roles/family/screenshots/student-student-history-fillter-2-full.png`); the subscriptions page titled "All Account Subscriptions" (`output/roles/family/pages/student-studentslist.md`); the trial wizard's "Create New Child" vs "Choose Existing Child" radio with populated `student_id` select (`output/roles/family/pages/student-request-trial.md`); the feedback log's "Family Members" column (`output/roles/family/pages/student-feedbacks.md`); the default child «لمار حسن» across home/billing/profile-edit (`output/roles/family/screenshots/student-home-full.png`, `student-profile-edit-full.png`).

Conflict check performed: no contradictions found between findings 01, 02a/b/c, and 03 on any count or role claim (page counts 300/26/13, screenshot counts 1,019/67/27, and the `/student/*`=family attribution agree across all files; the teacher `teacher-home-full.png` filename inside the ADMIN screenshot set was confirmed by 02a as crawl-naming noise on the admin dashboard, consistent with 01's "shared capture" note — no underlying evidence re-open was required).

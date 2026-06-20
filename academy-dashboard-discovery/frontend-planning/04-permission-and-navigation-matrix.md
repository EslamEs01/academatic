<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **09-permission-navigation-matrix-v2.md**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 04 — Permission & Navigation Matrix

> Comparison of admin vs teacher vs family: what each sees, what's unique, what the rebuilt **shell** should share vs keep separate. Sourced from `role-permission-matrix.md` + the per‑role page reads, including the 170‑permission admin RBAC screen.

## 1. Three distinct apps, one design system

The three roles are **not** the same app with hidden buttons — they live under different URL namespaces, different sidebars, and (for teacher/family) different layouts and even different domains of concern:

- **Admin** `/management/*` — wide back office, ~75 page templates, 19 modules, granular RBAC among staff.
- **Teacher** `/teacher/*` — ~18 templates, teaching‑centric.
- **Family** `/student/*` — ~12 templates, guardian/parent portal.

**Implication for rebuild:** one shared **design system + component library + app‑shell primitives**, but **three separate role apps / route trees** with their own navigation config. Do not try to render all three from one sidebar.

## 2. Module visibility by role

| Module | Admin | Teacher | Family | Notes |
|---|:--:|:--:|:--:|---|
| Dashboard/Home | full ops | own teaching day | own child day | different KPIs per role |
| New Requests (CRM) | ✅ | — | — | admin‑only |
| Students | all | own roster (read + report) | own children | scope differs sharply |
| Families/Guardians | all | — | own account only | admin manages; family self‑service |
| Teachers | all | own profile/history/salary | — | — |
| Staff/Admins + RBAC | ✅ (manager) | — | — | admin‑only, gated by permission |
| Courses (enrollments) | manage | read own | read own | — |
| Classes/Live Sessions | manage all | run own | view + request‑cancel own | core shared concept |
| Timetable/Schedule | all teachers + matcher | own + availability | own (view) | — |
| Attendance | mark/report | mark own | view | embedded in sessions |
| Tasks/Tickets | manage | view | — | — |
| Certificates | manage + approve | request | — | request→approve flow |
| Payments/Invoices | manage | — | view own | family = read‑only |
| Wallet/Finance | full | own salary (read) | — | — |
| Reports/Analytics | full | own KPIs | — | — |
| Messages/Notifications | chat + broadcast + routing | chat | receive notices | — |
| Content/Library + Materials | manage | read | read | — |
| Settings | ✅ | — | — | admin‑only |
| Profile/Account | ✅ | ✅ | ✅ | shared (view broken in legacy T/F) |

## 3. What is unique to each role

**Admin‑only (never in teacher/family):** New Requests/CRM, Families management, Staff/Admins + Permissions, Courses CRUD, Invoices/Accounting/Expenses/Salaries/Payouts/Banks, Settings (all), Materials/Library management, Certificate templates+approval, Broadcast, Scheduled Actions, Public Holiday, Teacher categories, Reports suite, Chat group creation across all roles.

**Teacher‑only:** run/end a class, mark absent with video evidence, request class cancel (reschedule/auto‑makeup), submit monthly progress report (24‑field rubric), request a certificate, manage own availability slots, own salary + salary‑class report, course/teacher history of own students.

**Family‑only:** request a trial (new/existing child wizard), give feedback about a teacher (rating + qualitative, per subscription), request cancel/reschedule a session, upload session files **+ voice recording**, view own billing, multi‑child account switching.

## 4. Admin internal RBAC (staff are not all equal)

Within the admin app, staff have **roles** (Manager, Accountant, Supervisor, Support) **and** a **~170‑permission matrix in 17 groups**, **and** category‑scoped visibility (which student/teacher categories they can see). Permission groups & counts:

| Group | Perms | Group | Perms |
|---|--:|---|--:|
| Dashboard/General | 14 | Invoices | 15 |
| New Requests | 6 | Payment Methods | 3 |
| Families | 24 | Locations | 4 |
| Students | 21 | Materials | 4 |
| Teachers | 17 | Library | 4 |
| Courses | (within above) | Banks | 4 |
| Reports/Analytics | 20 | System Settings | 6 |
| Search Teacher Schedule | 1 | Staff Members | 7 |
| Groups | 5 | Scheduled Actions | 4 |

**Implication:** the admin app needs **fine‑grained, server‑driven permission flags** controlling not just route access but individual buttons, table columns, tabs, and modals. The frontend must treat permissions as data (a permission set fetched at login), not hard‑coded role checks. An Accountant sees Finance but not Settings; a Supervisor sees their category's families only; etc.

## 5. Navigation: shared vs separate

### Shared app‑shell primitives (build once, theme once)
- **Top bar:** global search, notification bell, language switcher (10 locales: en + ar, fr, de, es, ur, it, pt, ru, tr), profile menu, logout.
- **Sidebar shell:** collapsible, grouped sections, with a personal **"shortcuts"** widget (every role can pin quick links — POST `/{role}/shortcuts`).
- **Breadcrumbs**, page header with title + primary actions.
- **Theme controls:** light/dark/system, RTL/LTR, brand color — already a first‑class product feature in legacy customisation.
- The **session‑action modal family** (Attend/Absent/Cancel/Edit/Reschedule/Make‑up) — admin & teacher share most of it (with role‑appropriate field subsets); family has a simpler Request‑Cancel.

### Separate per role
- **Sidebar *contents*** (navigation config) — three different trees.
- **Dashboard composition** — three different KPI sets and tables.
- **Route guards / permission model** — admin = permission‑matrix‑driven; teacher/family = role‑fixed + own‑resource scoping.
- **Layout density** — admin is data‑dense (wide tables, many tabs); teacher/family are lighter, task‑focused, more mobile‑friendly.

### Legacy navigation trees (reference)

**Admin sidebar (grouped):** Home · Teachers Schedule · Chat · New Requests · Sessions Analysis · Time Convertor · Public Holiday · Advertise & Notify · Tasks · Scheduled Actions ‖ Families · Add Family · Students · Courses · Families Category · Groups · Search Schedule · Request Result · Student Feedback ‖ Teachers · Add Teacher · Teacher Category · Teacher Details ‖ KPIs · Classes KPI · Monthly Performance · Monthly Reports ‖ Data Analysis (Students · Invoices · Profits & Losses) ‖ Accounting · Transaction · Expenses · Invoices · Monthly Invoices · Salaries · Staff Salaries · Payouts · Salary Class Report · Banks ‖ Materials · Library · Certificate · Certificate Requests ‖ Settings (General · Integrations · …). *(This is long and flat — the rebuilt IA regroups it; see [08](08-improved-information-architecture.md).)*

**Teacher sidebar:** Home · Chat · Schedule · Students · Library · Tasks ‖ Monthly Reports · Salaries · Salary Class Report ‖ (broken "Dashboard 1" — remove) · Log Out. Header: notifications → monthly plans, language, profile (broken), settings (= profile‑edit), logout.

**Family sidebar:** Home · Schedule · Classes Summary · Courses · Billing · Student Feedback · Library ‖ (broken "Dashboard 1" — remove) · Logout. Header: View invoices, Settings (= profile‑edit), My Profile (broken), logout.

## 6. Cross‑role flows (must stay coherent across apps)

These workflows hand off between roles — the rebuild must keep their data contracts aligned even though the UIs are separate:

1. **Certificate:** teacher *requests* → admin *approves & delivers*.
2. **Schedule request:** admin *broadcasts* to teachers → teachers *respond* → admin *confirms*.
3. **Class cancel/reschedule:** family or teacher *requests* → affects admin session ledger, makeup/credit, and notifications.
4. **Trial:** family *requests* (or admin creates lead→trial) → admin schedules → teacher delivers → feedback both ways.
5. **Monthly progress report:** teacher *submits* → admin/family *view*.
6. **Salary→Payout:** admin *generates salary* → teacher *requests payout* → admin *approves* → provider processes.
7. **Feedback:** family rates teacher; admin aggregates into Classes KPI / Monthly Performance.

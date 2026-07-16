# Spec 042 — Page & Route Reconciliation

**Baseline**: HEAD `de8d552` · **57 bases → 115 HTML** · **50 admin nav items** · route split **24 / 25 / 1**
**Legacy**: **339 unique pages** across 19 modules

---

## 1. Partition proof — every base owned exactly once

| Cluster | Bases | Legacy pages |
|---|---|---|
| C01 Dashboard & Home | **2** | 36 |
| C02 Teachers | **11** | 109 |
| C03 Students | **9** | 39 |
| C04 Families / Guardians | **12** | 31 |
| C05 Courses & Groups | **4** | 26 |
| C06 Sessions · Schedule · Attendance | **7** | 24 |
| C07 Finance · Payments · Invoices | **1** | 67 |
| C08 Reports & Analytics | **1** | 17 |
| C09 Settings | **1** | 27 |
| C10 Content · Materials · Certificates | **2** | 9 |
| C11 Messages · Notifications · Leads | **3** | 5 |
| C12 Staff · Profile · Roles | **1** | 9 |
| C13 Exams · Assignments · Results | **0** | 4 |
| C14 General · Utilities | **3** | 19 |
| C15 Auth · Public · Shared Shell | **0** | 0 |
| **TOTAL** | **57** | **422 memberships / 339 unique** |

> **57 = 57.** Every current page base belongs to **exactly one** cluster — no gap, no overlap.
> **339/339 legacy pages assigned; 0 unassigned.** 69 pages carry >1 module tag, so cluster memberships
> total 422 while the unique page count stays 339.

**Two clusters own 0 page bases — and that is correct, not a gap:**

- **C13 (Exams · Assignments · Results)** — its 4 legacy pages map to **tabs**, not pages:
  `students.html#view=results`, `students.html#view=evaluation`, the `student.html` Results/Evaluation tabs, and
  the `student-homework` child-view page (which is counted under **C03**, its owning base). C13 therefore
  reconciles **capabilities**, not files.
- **C15 (Auth · Public · Shared Shell)** — has **no legacy module tag at all** and owns no base. It reconciles
  cross-cutting infrastructure: `index.html`, the admin shell, the portal shell, the topbar/sidebar, theme,
  language, and the `enhance.js` hook set. Its findings land on **every** page rather than one.

A cluster owning zero bases is a **reporting fact**, not an unowned surface: every one of the 57 bases is still
claimed exactly once above, and both C13's and C15's *capabilities* are dispositioned in the ledger.

## 2. Current base → cluster → nav → legacy evidence

`nav` = the admin nav item(s) whose route resolves to this base. `portal` = a role-portal page (no admin nav).

| # | Base | Cluster | Admin nav item(s) | Route(s) | Legacy pages in cluster |
|---|---|---|---|---|---|
| 1 | `dashboard` | C01 | `home` | dashboard.html | 36 |
| 2 | `reports` | C08 | `reports`, `monthlyReports`, `dataAnalysis` | reports.html, reports.html#view=analysis, reports.html#view=monthly | 17 |
| 3 | `gallery` | C14 | **none — sanctioned ORPHAN** | _direct URL only_ | 19 |
| 4 | `sessions` | C06 | `sessions` | sessions.html | 24 |
| 5 | `schedule` | C06 | `schedule` | schedule.html | 24 |
| 6 | `students` | C03 | `students`, `studentResult`, `studentEvaluation` | students.html, students.html#view=evaluation, students.html#view=results | 39 |
| 7 | `teachers` | C02 | `teachers`, `addTeacher`, `teacherCategories` | teachers.html, teachers.html#view=add, teachers.html#view=categories | 109 |
| 8 | `courses` | C05 | `courses` | courses.html | 26 |
| 9 | `settings` | C09 | `settings`, `settingsGeneral`, `settingsIntegrations`, `settingsCustomization`, `settingsNotifications`, `settingsSecurity`, `settingsUsers` | settings.html, settings.html#view=customization, settings.html#view=general, settings.html#view=integrations, settings.html#view=notifications, settings.html#view=security, settings.html#view=users | 27 |
| 10 | `families` | C04 | `families`, `familyCategories` | families.html, families.html#view=categories | 31 |
| 11 | `add-family` | C04 | `addFamily` | add-family.html | 31 |
| 12 | `family` | C04 | _(none)_ | — | 31 |
| 13 | `student` | C03 | _(none)_ | — | 39 |
| 14 | `attendance` | C06 | `attendance` | attendance.html | 24 |
| 15 | `groups` | C05 | `groups` | groups.html | 26 |
| 16 | `course` | C05 | _(none)_ | — | 26 |
| 17 | `group` | C05 | _(none)_ | — | 26 |
| 18 | `teacher` | C02 | _(none)_ | — | 109 |
| 19 | `teacher-performance` | C02 | `teacherKpi`, `sessionsKpi`, `monthlyPerf` | teacher-performance.html, teacher-performance.html#view=monthly, teacher-performance.html#view=sessions-kpi | 109 |
| 20 | `finance` | C07 | `finance`, `invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `banks` | finance.html, finance.html#view=banks, finance.html#view=invoices, finance.html#view=monthly-invoices, finance.html#view=payments, finance.html#view=salaries | 67 |
| 21 | `sessions-analysis` | C06 | `sessionsAnalysis` | sessions-analysis.html | 24 |
| 22 | `public-holiday` | C06 | `publicHoliday` | public-holiday.html | 24 |
| 23 | `scheduled-actions` | C06 | `scheduledActions` | scheduled-actions.html | 24 |
| 24 | `messages` | C11 | `messages` | messages.html | 5 |
| 25 | `leads` | C11 | `leads` | leads.html | 5 |
| 26 | `tasks` | C14 | `tasks` | tasks.html | 19 |
| 27 | `announcements` | C11 | `announcements` | announcements.html | 5 |
| 28 | `time-converter` | C14 | `timeConverter` | time-converter.html | 19 |
| 29 | `staff` | C12 | `staff` | staff.html | 9 |
| 30 | `library` | C10 | `materials`, `books` | library.html#view=books, library.html#view=materials | 9 |
| 31 | `certificates` | C10 | `certificates`, `certificateRequests` | certificates.html, certificates.html#view=requests | 9 |
| 32 | `schedule-search` | C06 | `scheduleSearch` | schedule-search.html | 24 |
| 33 | `portals` | C01 | _portal_ | _role portal_ | 36 |
| 34 | `student-portal` | C03 | _portal_ | _role portal_ | 39 |
| 35 | `family-portal` | C04 | _portal_ | _role portal_ | 31 |
| 36 | `teacher-portal` | C02 | _portal_ | _role portal_ | 109 |
| 37 | `family-child` | C04 | _portal_ | _role portal_ | 31 |
| 38 | `student-schedule` | C03 | _portal_ | _role portal_ | 39 |
| 39 | `student-homework` | C03 | _portal_ | _role portal_ | 39 |
| 40 | `student-materials` | C03 | _portal_ | _role portal_ | 39 |
| 41 | `student-progress` | C03 | _portal_ | _role portal_ | 39 |
| 42 | `student-history` | C03 | _portal_ | _role portal_ | 39 |
| 43 | `student-profile` | C03 | _portal_ | _role portal_ | 39 |
| 44 | `family-children` | C04 | _portal_ | _role portal_ | 31 |
| 45 | `family-schedule` | C04 | _portal_ | _role portal_ | 31 |
| 46 | `family-progress` | C04 | _portal_ | _role portal_ | 31 |
| 47 | `family-billing` | C04 | _portal_ | _role portal_ | 31 |
| 48 | `family-requests` | C04 | _portal_ | _role portal_ | 31 |
| 49 | `family-materials` | C04 | _portal_ | _role portal_ | 31 |
| 50 | `family-profile` | C04 | _portal_ | _role portal_ | 31 |
| 51 | `teacher-schedule` | C02 | _portal_ | _role portal_ | 109 |
| 52 | `teacher-students` | C02 | _portal_ | _role portal_ | 109 |
| 53 | `teacher-outcomes` | C02 | _portal_ | _role portal_ | 109 |
| 54 | `teacher-tasks` | C02 | _portal_ | _role portal_ | 109 |
| 55 | `teacher-reports` | C02 | _portal_ | _role portal_ | 109 |
| 56 | `teacher-profile` | C02 | _portal_ | _role portal_ | 109 |
| 57 | `teacher-library` | C02 | _portal_ | _role portal_ | 109 |

## 3. The one orphan (frozen by Spec 041)

`gallery.html` / `gallery.en.html` have **no inbound link** and **no nav item** — direct-URL only, by design
(a design-system reference page). The orphan set is machine-frozen at **exactly these two**: a NEW orphan fails
(mutation M-11) **and** gallery *gaining* an inbound link also fails (mutation M-12). Owner: the frontend/
design-system maintainer; it still receives a review owner in `page-review-ownership-map.md`.

## 4. Route register (all 50 nav items)

| Status | Count |
|---|---|
| deep-link (`#view=`) | **24** |
| plain route | **25** |
| route-less honest lock | **1** (`classSalaryReport`) |
| **TOTAL** | **50** |

Pinned by the Spec-041 **`ROUTES_50`** exact-route register — every id → exact route string. A route repointed
at a *real but wrong* page fails (mutation **M-2**); before that register existed it passed the whole suite.

## 5. Legacy routes with no current surface

Resolved at **capability** level, not page level — a legacy route without a same-named page is NOT automatically
a gap (the legacy inflates its count with per-entity detail routes and modal-as-page patterns). See
`legacy-current-capability-ledger.md` for the per-capability dispositions and
`future-spec-allocation-register.md` for the owner of every `PARTIAL` / `MISSING` / `UNKNOWN_EVIDENCE`.

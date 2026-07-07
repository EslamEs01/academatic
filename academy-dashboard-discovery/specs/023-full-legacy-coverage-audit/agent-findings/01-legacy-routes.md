# Agent 01 — Legacy Route / Page Inventory Audit

## Scope & method

Mission: build the authoritative legacy inventory (roles, routes, page templates, sidebar/menu
items, screenshot/page/html counts, unsafe/skipped endpoints) from the real crawler output, and
explicitly verify the corrected role model (Admin / Teacher / Family exist; no standalone Student
role; `/student/*` belongs to Family/Guardian).

Method: read the combined cross-role reports in `output/combined/` (page-inventory, route-graph,
academy-system-map, role-permission-matrix, shared-unique-pages, missing-coverage, failed-pages,
skipped-actions, llm-context), the deep-planning artifacts in `frontend-planning-deep/` (01, 02,
08, 09, 20), the crawler's own role configuration (`roles.config.json`), directory listings under
`output/roles/{admin,family,teacher}/{pages,screenshots,html/sanitized}`, sampled per-page capture
`.md` files (raw sidebar link inventories + logout form actions), and one full-page screenshot to
visually corroborate the family/`/student/*` finding. No build/test commands were run; nothing
outside `specs/023-full-legacy-coverage-audit/` was modified.

## Evidence opened (exact paths)

- `academy-dashboard-discovery/output/combined/page-inventory.md` (full, 363 lines)
- `academy-dashboard-discovery/output/combined/role-permission-matrix.md` (full, 192 lines)
- `academy-dashboard-discovery/output/combined/academy-system-map.md` (lines 1–100)
- `academy-dashboard-discovery/output/combined/missing-coverage.md` (full, 215 lines)
- `academy-dashboard-discovery/output/combined/failed-pages.md` (full, 21 lines)
- `academy-dashboard-discovery/output/combined/skipped-actions.md` (lines 1–150)
- `academy-dashboard-discovery/output/combined/llm-context.md` (grep on "role", lines 9–71)
- `academy-dashboard-discovery/frontend-planning-deep/08-role-page-inventory-v2.md` (full, 364 lines)
- `academy-dashboard-discovery/frontend-planning-deep/20-no-missing-items-audit.md` (grep hit, line 6)
- `academy-dashboard-discovery/roles.config.json` (full, 58 lines)
- `academy-dashboard-discovery/output/roles/{admin,family,teacher}` directory listings
  (`pages/`, `screenshots/`, `html/raw/`, `html/sanitized/`, `text/`, `network/` subfolders)
- `academy-dashboard-discovery/output/roles/family/pages/student-home.md` (full capture: sidebar
  links, logout form, discovered-from field)
- `academy-dashboard-discovery/output/roles/admin/pages/management-home.md` (lines 615–654,
  sidebar link inventory)
- `academy-dashboard-discovery/output/roles/teacher/pages/management-home.md` (lines 322–333 +
  359 + 407, sidebar link inventory)
- `academy-dashboard-discovery/output/roles/family/screenshots/student-home-full.png` (opened
  visually — confirms family-login home page renders a "Student" badge / child persona "الطالبة
  لمار حسن")

## 1) Role list (as actually crawled)

Per `roles.config.json` (the crawler's own credential/role configuration) and confirmed by every
combined report's "Roles with crawled output: admin, teacher, family" header:

| Role key | Label | Login URL | Auth state file | Output dir |
| --- | --- | --- | --- | --- |
| `admin` | Administrator | `https://academatic.online/login` | `auth-state-admin.json` | `output/roles/admin` |
| `teacher` | Teacher | `https://academatic.online/login` | `auth-state-teacher.json` | `output/roles/teacher` |
| `family` | Family / Guardian | `https://academatic.online/login` | `auth-state-family.json` | `output/roles/family` |

All three log in through the **same** `/login` URL with distinct credentials
(`ADMIN_USERNAME`/`PASSWORD`, `TEACHER_USERNAME`/`PASSWORD`, `FAMILY_USERNAME`/`PASSWORD` env
vars) — `academy-dashboard-discovery/roles.config.json` lines 4–38. The file's
`supportedFutureRoles` array (line 41) lists `["student", "manager", "director", "staff",
"guardian"]` — these are placeholders for a **future** crawl and were never configured with
credentials or actually crawled (`missing-coverage.md` line 11: "All configured roles (admin,
teacher, family) produced output" — only 3, not 4).

## 2) Route list by role (grouped by module for admin)

Full per-route detail is `output/combined/page-inventory.md`; per-module counts are
`role-permission-matrix.md`. Summary (module → admin/family/teacher page counts), from
`role-permission-matrix.md` lines 13–33:

| Module | admin | family | teacher |
| --- | --- | --- | --- |
| Dashboard / Home | 29p | 3p | 4p |
| Students | 26p | 8p | 5p |
| Teachers | 94p | 0 | 15p |
| Parents / Guardians / Families | 31p | 0 | 0 |
| Courses | 22p | 1p | 3p |
| Classes / Live Sessions | 10p | 2p | 5p |
| Timetable / Schedule | 6p | 1p | 1p |
| Assignments / Homework | 1p | 0 | 1p |
| Exams / Quizzes | 2p | 0 | 0 |
| Certificates | 3p | 0 | 0 |
| Payments / Invoices | 51p | 2p | 0 |
| Wallet / Finance | 16p | 0 | 3p |
| Reports / Analytics | 16p | 0 | 1p |
| Messages / Notifications | 4p | 0 | 1p |
| Content / Materials / Library | 4p | 1p | 1p |
| Settings | 27p | 0 | 0 |
| Roles / Permissions | 2p | 0 | 0 |
| Profile / Account | 5p | 1p | 1p |
| General / Unknown | 12p | 2p | 5p |
| Subjects, Attendance | 0 (all roles) | 0 | 0 |

Route prefixes observed (`page-inventory.md`):
- **admin**: `https://academatic.online/management/*` (all 300 pages) plus one shared
  `https://academatic.online/teacher/home` capture (line 312, listed under admin because the
  admin persona also reaches it).
- **teacher**: `https://academatic.online/teacher/*` (bulk) + `https://academatic.online/management/home`,
  `https://academatic.online/management/student/1` (shared with admin, permission-scoped),
  and `https://academatic.online/main/index.html` (404 stub pages).
- **family**: **every single one of the 13 crawled pages** is under
  `https://academatic.online/student/*` (`student/billing`, `student/feedbacks`, `student/home`,
  `student/library`, `student/profile`, `student/profile-edit`, `student/request-trial`,
  `student/student-history-fillter`, `student/studentslist`, `student/timetable`,
  `student/today-sessions`) plus the shared `https://academatic.online/management/home` and the
  generic 404 stub `https://academatic.online/main/index.html` (`page-inventory.md` lines
  349–361).

## 3) Page templates by role with counts

Per `frontend-planning-deep/08-role-page-inventory-v2.md` line 5: **339 captured pages → 178
route templates** (admin 145 templates, teacher 22 templates, family 11 templates). Family's 11
templates map 1:1 to the 11 distinct `/student/*` (+2 shared) routes above, organized by module
in `08-role-page-inventory-v2.md` lines 315–365 (Classes/Live Sessions, Content/Materials/Library,
Dashboard/Home, General/Unknown, Payments/Invoices, Profile/Account, Students ×4, Timetable/Schedule).

Raw page counts confirmed by directory listing (`output/roles/<role>/pages`, one `.json` + one
`.md` per captured page):
- admin: 600 files / 2 = 300 pages
- family: 26 files / 2 = 13 pages
- teacher: 52 files / 2 = 26 pages
- Total: 339 pages, matching `page-inventory.md` line 363 ("Total pages across all roles: 339")
  and the manifest cross-check in `20-no-missing-items-audit.md` line 6 ("339/339... 0 orphans, 0
  map-only... 0 artifact gaps").

## 4) Sidebar/menu items by role (from page captures)

Extracted from the "Sidebar Links" / "Internal Links … sidebar" sections of representative home
captures:

**Admin** (`output/roles/admin/pages/management-home.md` lines 615–654, non-exhaustive — admin
sidebar has many more rows, this is the sampled prefix): My Profile, Log Out, Home, Teachers
Schedule, Chat, New Requests, Sessions Analysis, Time Convertor, Public Holiday, Advertise &
Notify, Tasks, Scheduled Actions, Families, Add new Family, Students, Courses, Families Category,
Groups, Search Schedule, Request Result, Student Feedback, Teachers, Add New Teacher, Teachers
Category, Teachers (details), KPIs, Classes KPI, Monthly Performance, monthly reports, Students
(analysis), Invoices & Accounts, Profits & Losses, Accounting, Transaction, Expenses, List of
Invoices, List of Monthly Invoices, Salaries, … (six-category admin rail per Spec 016/018 binding
law).

**Teacher** (`output/roles/teacher/pages/management-home.md` lines 322–333): Home, Chat, Schedule,
Students, Library, Tasks New, Log Out, monthly reports, Salaries, Salary Class Report, Log Out
(duplicate render). **Note**: "Salaries"/"Salary Class Report" sidebar items exist in the legacy
teacher account (routes `/teacher/salary`, `/teacher/salary-class-report`,
`page-inventory.md` lines 334–335) — this is a legacy capability the rebuild's teacher app is
bound by law to keep PAY-FREE; it is an intentional exclusion, not a gap (Spec 016 teacher
pay-free global contract).

**Family** (`output/roles/family/pages/student-home.md`, "Sidebar Links (15)" section): Home,
Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout (8 real nav rows,
plus icon-only/duplicate/`javascript:void(0)` placeholder entries). Routes: `/student/home`,
`/student/timetable`, `/student/student-history-fillter?2`, `/student/studentslist`,
`/student/billing`, `/student/feedbacks`, `/student/library`, `/student/logout`.

## 5) Screenshots / pages / html counts per role

| Role | pages/ (files÷2) | screenshots | html/sanitized |
| --- | --- | --- | --- |
| admin | 600 → 300 pages | 1019 | 300 |
| family | 26 → 13 pages | 27 | 13 |
| teacher | 52 → 26 pages | 67 | 26 |

(Bash directory listings of `output/roles/{admin,family,teacher}/{pages,screenshots,html/sanitized}`.)
Screenshot counts exceed page counts because most pages capture a "full" screenshot plus 1–2
"interaction" screenshots (confirmed in `student-home.md`: `student-home-full.png` +
`student-home-001-page-interaction-001.png` + `-002-...png`).

## 6) Unsafe / skipped endpoints

From `output/combined/failed-pages.md`: **0 failed pages, 0 failed interactions** for all three
roles (crawler never hit a hard failure).

From `output/combined/skipped-actions.md` (admin section, lines 14–90) and
`output/combined/missing-coverage.md` (lines 39–187, per-role route-graph end-states):

- **admin**: 365 discovered routes → 300 visited, 65 not visited (1 external_url, 2
  failed_with_error — `invoicesexportData`, `courseClasses/export-class/1` — 59
  skipped_safe_reason [locale-switch URLs + page-budget cap of 300], 3 skipped_unsafe_reason:
  `/management/logout`, `/management/student/1/suspend`, `/management/student/2/suspend`).
  Action-level refusals: **1817** unsafe buttons never clicked (logout=1, mutating=1463,
  submit=353) — e.g. every "Save"/"Submit"/"Add shortcuts" button site-wide.
- **teacher**: 37 discovered routes → 26 visited, 11 not visited (10 skipped_safe_reason =
  locale switches + login page, 1 skipped_unsafe_reason = `/teacher/logout`).
- **family**: 24 discovered routes → 13 visited, 11 not visited (10 skipped_safe_reason = locale
  switches + login page, 1 skipped_unsafe_reason = `/student/logout`).

`missing-coverage.md` lines 199–215 ("Modules present for some roles but absent for others") is
itself the raw legacy permission-difference evidence downstream specs should treat as intentional
role scoping, not a gap: e.g. Payments/Invoices present for admin+family but absent for teacher
(pay-free teacher law is legacy-consistent, not a rebuild invention).

## 7) EXPLICIT ROLE-MODEL VERIFICATION

- **Admin role exists**: `roles.config.json` lines 3–14 (key `admin`, label "Administrator",
  dedicated credentials, `auth-state-admin.json`); confirmed crawled — 300 pages
  (`page-inventory.md` line 9).
- **Teacher role exists**: `roles.config.json` lines 15–26 (key `teacher`, dedicated
  credentials, `auth-state-teacher.json`); confirmed crawled — 26 pages, sidebar rooted at
  `/teacher/*` (`page-inventory.md` line 314; `management-home.md` lines 322–333).
- **Family role exists**: `roles.config.json` lines 27–38 (key `family`, label "Family /
  Guardian", dedicated credentials, `auth-state-family.json`); confirmed crawled — 13 pages
  (`page-inventory.md` line 345; `academy-system-map.md` line 19: "family | Family / Guardian |
  13 | 9 | 47 | 21 | 8 | 16 | 16").
- **NO standalone Student role exists**: `roles.config.json`'s `roles` array (the only array the
  crawler actually authenticates and crawls with) contains exactly three entries — admin,
  teacher, family. "student" appears **only** inside `supportedFutureRoles` (line 41), a
  placeholder list with no `usernameEnv`/`passwordEnv`/`authStateFile` ever populated, and
  `missing-coverage.md` line 11 states plainly that only admin/teacher/family "produced output."
  Every combined report's header repeats "Roles with crawled output: admin, teacher, family"
  (e.g. `page-inventory.md` line 5, `role-permission-matrix.md` line 5,
  `academy-system-map.md` line 5, `missing-coverage.md` line 5) — three roles, never four.
- **`/student/*` routes belong to the Family/Guardian login**: all 13 pages captured under the
  `family` role's output directory (`output/roles/family/pages/`) are `/student/*` routes (or the
  two universal shared routes `/management/home`, `/main/index.html`) —
  `page-inventory.md` lines 349–361. The captured page `student-home.md` records
  `**Role** | family` (line explicitly under "## Metadata"), a logout form whose action is
  `https://academatic.online/student/logout` (not `/management/logout` or `/teacher/logout`),
  and a `Discovered From` field of `route: https://academatic.online/management/home via
  sidebar` — i.e. reached by clicking the family account's own sidebar link, not a separate
  login. The rendered screenshot `output/roles/family/screenshots/student-home-full.png`
  visually shows the family-account home page displaying a "Student" badge and the child's
  Arabic name "الطالبة لمار حسن" under a sidebar labeled Home/Schedule/Classes
  Summary/Courses/Billing/Student Feedback/Library/Logout — i.e. the family login IS the portal
  into the child's ("student") view, not a distinct student credential/session. This directly
  corroborates Spec 021 DEC-001 (persona Salman/Lamar's "student" view is reached solely through
  the family/guardian account).

## Risks, gaps, and proposed corrections

- **Risk — admin page-budget truncation (65/365 routes unvisited)**: admin crawl stopped at the
  configured 300-page cap; several route families (teacher `scope/{Active,Unconfirmed,
  Incomplete,Inactive,Deleted}` sort-order permutations, `downlaod` date-range permutations,
  one `settings/integrations/.../configure?activeTab=...` variant) were discovered but never
  visited (`missing-coverage.md` lines 76–124). These are query-param/sort-order variants of
  already-covered templates (not new capabilities), so the risk to the coverage audit is low, but
  downstream agents should not claim 100% admin route coverage — only 300/365 discovered URLs were
  actually rendered. Proposed correction: none needed for the rebuild (variants of already-modeled
  templates); flag for the coverage-matrix agent to confirm no *distinct* template hides in the
  unvisited set.
- **Risk — 2 admin routes errored (`failed_with_error`)**: `/management/invoicesexportData` and
  `/management/courseClasses/export-class/1` never resolved during crawl (`missing-coverage.md`
  lines 55–60). Both look like file-download/export endpoints (no page to render). Proposed
  correction: treat as legacy export actions, not renderable page templates — exclude from the
  page-template coverage matrix, note in the admin export/download capability list instead.
  Not a gap the rebuild needs to "cover" as a page.
- **Risk — 2 admin pages returned server errors during capture but were still recorded as
  "visited"**: `/management/export-course` (line 87, page-inventory.md, "Export Course",
  0 buttons/0 forms) and `/management/settings/customisation/message-builder` ("Gateway Timeout",
  0 components) and `/management/teachers/1/monthly-classes` (HTTP 500, per
  `08-role-page-inventory-v2.md` line 81) are legacy-server errors (500/504), not real page
  templates with content. Proposed correction: exclude these from the "must reproduce" coverage
  count; they document legacy fragility, not a capability to rebuild.
- **Risk — teacher "Salaries" sidebar item survives in the legacy teacher account**
  (`/teacher/salary`, `/teacher/salary-class-report` — `management-home.md` teacher sidebar
  lines 330–332): confirms the legacy system does show pay figures to teachers, which the
  rebuild's binding law (pay-free teacher, global) intentionally excludes. This is a deliberate,
  law-mandated deviation, not an accidental gap — flag explicitly for the coverage-matrix agent so
  it is recorded as "intentionally excluded per Spec 016" rather than "missing."
- **Risk — `/student/profile` and `/main/index.html` both returned HTTP 500/404 for the family
  role** (`missing-coverage.md` lines 36–37): "Student Profile" page classified General/Unknown
  with an HTTP 500 flag (`08-role-page-inventory-v2.md` line 337). This is a genuinely broken
  legacy page (no real content ever captured) — no coverage obligation exists for it; note only
  that `student-profile-edit` (the sibling edit page, which DOES render) is the real capability to
  cover.
- **No evidence of a 4th role or of `/student/*` being served by any account other than
  `family`** was found anywhere in the crawler output — the three-login / no-standalone-student
  model is confirmed with no counter-evidence.


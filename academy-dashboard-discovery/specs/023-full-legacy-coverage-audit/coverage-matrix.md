# Coverage Matrix — Spec 023 Full Legacy Coverage Audit 000–022

**Title**: Master legacy→current coverage matrix (THE most important artifact)
**Date**: 2026-07-06
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Specs 020/021/022 committed; 77 public HTML files (38 ar+en page pairs + `index.html`), 38 page modules.
**Inputs used** (all evidence paths trace back to these agent findings, which carry the per-variant detail):
- `agent-findings/05-admin-coverage.md` (78-row admin table folding all 300 admin captures; §b overbuilt/renamed/split; §c 57-row re-verification; §d pay/finance)
- `agent-findings/06-family-child-student-coverage.md` (A1 13 legacy family capabilities + A2 16 current-surface rows)
- `agent-findings/07-teacher-coverage.md` (20-row legacy teacher table + 6 current-surface rows + denominator guard)
- `agent-findings/09-drift-extra-pages.md` (reverse direction X-01…X-39, hub/shell/global grounding)
- `agent-findings/01-legacy-routes.md`, `agent-findings/04-current-app-inventory.md` (role model + current inventory)

**Classification vocabularies (used verbatim; nothing outside these sets appears below):**
- Coverage: `implemented | improved | merged | renamed | reclassified | gated-backendRequired | planned-future | intentionally-excluded | missing | unclear-needs-review`
- Quality: `legacy-grounded | legacy-grounded-improved | useful-net-new | useful-but-needs-better-grounding | wrong-role-classification | weak-design | duplicate-or-merge-candidate | random-or-unnecessary | needs-correction`
- Owner spec: `done | 024-correction | 025-teacher-pages | 026-admin-control-sessions-ops | 027-admin-families-students-courses-groups | 028-admin-teachers-performance | 029-admin-reports-analytics-feedback-forms | 030-admin-finance-invoices-salaries-banks | 031-admin-management-content-certificates-settings | 032-final-qa | future-backend | intentionally-excluded`

Path shorthand: `PUB` = `academy-dashboard-discovery/app/public`, `SRC` = `academy-dashboard-discovery/app/src`, `NAV` = `SRC/js/nav.config.js`, `FIN` = `SRC/js/fixtures/finance.js`, `PORTAL` = `SRC/js/fixtures/portal.js`, `LEGADMIN` = `academy-dashboard-discovery/output/roles/admin`, `LEGFAM` = `academy-dashboard-discovery/output/roles/family`, `LEGTCH` = `academy-dashboard-discovery/output/roles/teacher`, `PI` = `academy-dashboard-discovery/output/combined/page-inventory.md`, `M016` = `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze`.

---

## Summary — coverage roll-up per role

Legacy denominator (honest capability count, dead-404/500-only routes excluded — see the mini-table at the end):
- **Admin**: 300 captured pages → 78 finding rows → **~44 distinct capabilities** (this matrix folds create/edit/variant siblings; the full 78-row breakdown is `agent-findings/05-admin-coverage.md`).
- **Family/Guardian**: 13 crawled pages → **13 capabilities** (`agent-findings/06` A1).
- **Teacher**: 26 captures → **~17 honest capabilities** (4 dead-404 + 3 redirect-home copies + 1 500 + 5 history/monthly routes fold to 2 — `agent-findings/07` denominator guard).

### Admin (44 capabilities)

| Coverage class | Count | Verdict |
|---|---|---|
| implemented / improved | 14 | All shipped admin pages are legacy-grounded or sanctioned net-new; zero require deletion/rework |
| merged | 5 | status/variant/route-family consolidations (home status lenses, schedule-request inboxes, forms/students, feedback categories, courseclasses detail) |
| gated-backendRequired | 8 | writes + all pay ledgers = honest gates / figure-free finance shells (030) |
| planned-future | 15 | the 026–031 sequence, honestly nav-planned «قريبًا»/disabled-with-reason today |
| intentionally-excluded | 8 | impersonation, fake live room, 5 broken 500/504 routes, pay-signal leaks, >AR/EN locales |
| unclear-needs-review | 1 | RBAC **Locations** permission group has no owner row (→ M-04 / B-02) |
**Admin verdict**: complete and correct. Every one of the 300 captures is owned by exactly one row; the 43 future items re-verify against the 016 57-row inventory EXACTLY (`agent-findings/05` §c: 13 built + 1 thin + 1 lens + 43 future = 57). One genuine hole (Locations). No P0.

### Family/Guardian (13 capabilities)

| Coverage class | Count | Verdict |
|---|---|---|
| improved | 6 | home, studentslist, timetable/today, history, billing (status-first), library, profile |
| merged | 3 | management-home→home, today-sessions/timetable, feedbacks+request-trial |
| implemented | 1 | feedbacks meetings (truthful empty) |
| gated-backendRequired | 2 | profile-edit (3 gates ↔ 3 legacy forms), request-trial |
| intentionally-excluded | 2 | `/main/index.html` 404 artifact; >AR/EN locales |
| reclassified | 1 | auth pair `/login`+logout → the demo hub |
| missing | 1 | header notifications (→ M-01 / B-03, honest gate) |
**Family verdict**: strongly covered after Specs 020/022. 13/13 accounted; family zero-pay verified at all three layers; one cross-cutting missing capability (notifications), one child-view copy leftover (F-00-1). No P0.

### Teacher (17 capabilities)

| Coverage class | Count | Verdict |
|---|---|---|
| improved | 1 | teacher home (living cockpit) |
| gated-backendRequired | 1 | end-class outcome recording (flowStrip gate) |
| planned-future | 8 | timetable, students, monthly-eval, histories, tickets/tasks, certificate-request, profile-edit (→ 025); chat (→ 026) |
| intentionally-excluded | 6 | 4 pay surfaces, tickets chart+Average, `/profile` 500, 4 dead 404s, notifications/shortcuts |
| reclassified | 1 | language switcher/logout → hub |
| unclear-needs-review | 1 | live `session-class-room` never captured (→ M-05 / B-04) |
**Teacher verdict**: home improved; internals correctly planned for Spec 025; pay-free verified at all three layers. Two open items (library has no visible gate → M-03; live-room unverified → M-05). No P0.

---

## Master coverage table

### ADMIN (module-grouped; full 78-row breakdown in `agent-findings/05-admin-coverage.md`)

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| admin | `/management/home` ops dashboard (KPI wall + Classes-Of-today table + 7 modals; 11 variants + 6 status lenses + helper/trial siblings) | `LEGADMIN/screenshots/management-home-full.png` | dashboard(.en).html | `PUB/dashboard.html`; `SRC/js/pages/dashboard.js` | improved | legacy-grounded-improved | No | done | Status lenses merged as tiles-as-filters; legacy «(3.00 Fine)» money fragment excluded (zero-pay) |
| admin | `/management/total-queues` support-queue counter | `LEGADMIN/pages/management-total-queues.md` | — (folds to ops band) | `NAV` (016 fold decision) | planned-future | — | Yes | 026-admin-control-sessions-ops | — |
| admin | `/management/new-requests` leads/CRM funnel (+create 22-field, +8 filter variants, +scheduled-trials 500s) | `LEGADMIN/screenshots/management-new-requests-full.png` | — (planned nav `leads`) | `NAV` line 29 | planned-future | — | Yes | 026-admin-control-sessions-ops | create/write = backendRequired gate; broken 500 variants excluded |
| admin | `/management/sessions_analysis` outcome KPI board | `LEGADMIN/pages/management-sessions-analysis.md` | — (planned nav `sessionsAnalysis`) | `NAV` line 27 | planned-future | — | Yes | 026-admin-control-sessions-ops | display-only STAT page; no computed score |
| admin | `/management/chat` group messaging | `LEGADMIN/pages/management-chat.md` | — (planned nav `messages`) | `NAV` line 28 | planned-future | — | Yes | 026-admin-control-sessions-ops | send = future-backend gate (send-form unconfirmed in crawl) |
| admin | `/management/tickets` tasks board (empty in legacy) | `LEGADMIN/pages/management-tickets.md` | — (planned nav `tasks`) | `NAV` line 30 | planned-future | — | Yes | 026-admin-control-sessions-ops | manage writes gated |
| admin | `/management/public-advertisement` broadcast | `LEGADMIN/pages/management-public-advertisement.md` | — (planned nav `announcements`) | `NAV` line 31 | planned-future | — | Yes | 026-admin-control-sessions-ops | — |
| admin | `/management/time-convertor` TZ converter | `LEGADMIN/pages/management-time-convertor.md` | — (planned nav `timeConverter`) | `NAV` line 32 | planned-future | — | Yes | 026-admin-control-sessions-ops | static TZ table (no TZ engine) |
| admin | `/management/public-holiday` holidays + bulk-absence | `LEGADMIN/pages/management-public-holiday.md` | — (planned nav `publicHoliday`) | `NAV` line 33 | planned-future | — | Yes | 026-admin-control-sessions-ops | list real, write gated |
| admin | `/management/scheduled-actions` (+create 20 fields) automation | `LEGADMIN/pages/management-scheduled-actions.md` | — (planned nav `scheduledActions`) | `NAV` line 34 | planned-future | — | Yes | 026-admin-control-sessions-ops | automation engine = future-backend |
| admin | schedule-request inboxes (sessions-response + trials-response + request-schedule) | `LEGADMIN/pages/management-schedule-sessions-response.md` (+2) | — (ONE inbox) | `M016/legacy-to-new-coverage-matrix.md` line 45 | merged | — | Yes | 026-admin-control-sessions-ops | three legacy boxes → one preview inbox |
| admin | `/management/families` (+7 status variants) family list | `LEGADMIN/pages/management-families.md` | families(.en).html | `PUB/families.html`; `SRC/js/pages/families.js` | implemented | legacy-grounded | No | done | status variants = facets |
| admin | `/management/families/{id}` family hub (8 tabs) | `PI` (families rows) | family(.en).html | `PUB/family.html`; `SRC/js/pages/family.js` | implemented | legacy-grounded | No | done | billing tab deepens via 030 |
| admin | `/management/families/create` (+edit) | `LEGADMIN/pages/management-families-create.md` | add-family(.en).html wizard | `PUB/add-family.html`; `SRC/js/pages/add-family.js` | implemented | legacy-grounded-improved | No | done | 37-field form → stepped wizard; edit writes gated |
| admin | `/management/families/index?filter=payment_methods` pay-method lens | `LEGADMIN/pages/management-families-index-filter-payment-methods-0-1.md` | finance family filter | `SRC/js/pages/finance.js` | reclassified | legacy-grounded-improved | No | done | lens moved off roster to finance, status-first |
| admin | `/management/families/feedback` (+students, 5 lenses) meetings/feedback | `LEGADMIN/pages/management-families-feedback.md` | — | `M016/legacy-to-new-coverage-matrix.md` line 24 | planned-future | — | Yes | 029-admin-reports-analytics-feedback-forms | +feedback categories fold |
| admin | `/management/categories/families` (+create/edit/assign) | `LEGADMIN/pages/management-categories-families.md` | — (planned nav `familyCategories`); chips already render | `NAV` line 44; `SRC/js/pages/families.js` (FAMILY_CATEGORIES) | planned-future | — | Yes | 027-admin-families-students-courses-groups | — |
| admin | `/management/student` (+6 status +softdelete) roster | `LEGADMIN/pages/management-student.md` | students(.en).html | `PUB/students.html`; `SRC/js/pages/students.js` | implemented | legacy-grounded-improved | No | done | family chip added (legacy lacked it) |
| admin | `/management/student/{id}` detail (20 modals) + create/edit/trial | `PI` (student rows) | student(.en).html | `PUB/student.html`; `SRC/js/pages/student.js` | improved | legacy-grounded-improved | No (writes gated) | done | modals → tabs+drawers; writes = gated-backendRequired → future-backend |
| admin | student results / evaluation views | `M016/admin-sidebar-page-inventory.md` lines 37–38 | — (planned nav `studentResult`/`studentEvaluation`); content in student tabs | `NAV` lines 47–48 | planned-future | — | Yes | 027-admin-families-students-courses-groups | thin pages over profile tab content |
| admin | `/management/courses` (+status/type variants) enrollments | `LEGADMIN/pages/management-courses.md` | courses(.en).html | `PUB/courses.html`; `SRC/js/pages/courses.js` | implemented | legacy-grounded | No | done | «no-invoices» lens → finance status filters |
| admin | `/management/courses/{id}` detail (13 modals, 85 fields) + create variants | `LEGADMIN` (courses/{id}) | course(.en).html | `PUB/course.html`; `SRC/js/pages/course.js` | improved | legacy-grounded-improved | No (writes gated) | done | Learning-Path deepening → 027; writes gated |
| admin | `/management/courseclasses/{id}` ×6 session lifecycle (9 modals, recording, timeline) | `LEGADMIN/screenshots/management-courseclasses-1-full.png` | sessions(.en).html + shared drawers | `PUB/sessions.html`; `SRC/js/pages/sessions.js` | improved | legacy-grounded-improved | No | done | «Class Recording» fake-live excluded; status writes future-backend |
| admin | `/management/group/index` + `/management/groups/create` (45 fields) | `LEGADMIN/pages/management-group-index.md` | groups(.en).html + group(.en).html | `PUB/groups.html`, `PUB/group.html` | implemented | legacy-grounded | No (create gated) | done | — |
| admin | `/management/all/teachers/timetable` all-teachers grid (Active/«Active & unpaid»/Inactive) | `LEGADMIN/screenshots/management-all-teachers-timetable-full.png` | schedule.html teacher lens | `PUB/schedule.html`; `SRC/js/pages/schedule.js` | improved | legacy-grounded-improved | No | done | «unpaid» tint excluded (pay-signal leak); 016 needs-decision resolved |
| admin | `/management/search-schedule` availability matcher | `LEGADMIN/pages/management-search-schedule.md` | — (planned nav `scheduleSearch`) | `NAV` line 46 | planned-future | — | Yes | 027-admin-families-students-courses-groups | async search gated |
| admin | `/management/teachers` (+scope/sort ≈60 captures) roster | `LEGADMIN/pages/management-teachers.md` | teachers(.en).html | `PUB/teachers.html`; `SRC/js/pages/teachers.js` | implemented | legacy-grounded-improved | No | done | scopes→chips; sort permutations = table affordances |
| admin | `/management/teachers/{id}` (+edit) hub incl. comp/salary tabs | `PI` (teachers rows) | teacher(.en).html (8 tabs) | `PUB/teacher.html`; `SRC/js/pages/teacher.js` | improved | legacy-grounded-improved | No | done | pay tabs NEVER rendered (pay-free law) |
| admin | `/management/teachers/create` add-teacher wizard (payout section) | `LEGADMIN/pages/management-teachers-create.md` | — (planned nav `addTeacher`) | `NAV` line 55 | planned-future | — | Yes | 028-admin-teachers-performance | ZERO pay fields; payout block stays a 030 gate |
| admin | `/management/teachers/{id}/compensations` fines/bonuses ledger («Fine 1,000.00») | `LEGADMIN/screenshots/management-teachers-1-compensations-1-full.png` | finance GATE card `payoutsCompensations` | `FIN` line 100 | gated-backendRequired | — | No | 030-admin-finance-invoices-salaries-banks | zero figures forever |
| admin | `/management/teachers_details` teacher attendance report | `LEGADMIN/pages/management-teachers-details.md` | — (performance band) | `M016/admin-sidebar-page-inventory.md` line 51 | planned-future | — | Yes | 028-admin-teachers-performance | — |
| admin | `/management/teacher-categories` (+create/edit/members) | `LEGADMIN/pages/management-teacher-categories.md` | — (planned nav `teacherCategories`) | `NAV` line 56 | planned-future | — | Yes | 028-admin-teachers-performance | — |
| admin | `/management/teacher-feedback` teacher KPIs (List + «Percentage» col) | `LEGADMIN/screenshots/management-teacher-feedback-full.png` | teacher-performance(.en).html | `PUB/teacher-performance.html`; `SRC/js/pages/teacher-performance.js` | improved | legacy-grounded-improved | No | done | computed «Percentage» excluded (no-score); counts+signals instead |
| admin | `/management/teacher-feedback/feedback?…` monthly perf + sessions KPI lens | `LEGADMIN/pages/management-teacher-feedback-feedback-teacher-id-1-year-2026.md` | — (planned nav `monthlyPerf`/`sessionsKpi`) | `NAV` lines 63–64 | planned-future | — | Yes | 028-admin-teachers-performance | display-only boards |
| admin | `/management/class-feedback` (+filters) | `LEGADMIN/pages/management-class-feedback.md` | — | `M016/legacy-to-new-coverage-matrix.md` line 43 | planned-future | — | Yes | 029-admin-reports-analytics-feedback-forms | 029 feedback family |
| admin | `/management/forms` (+create, 6 question types, +students) form builder | `LEGADMIN/screenshots/management-forms-full.png` | — (monthlyReports hub exists) | `NAV` line 73 (`monthlyReports` planned) | planned-future | — | Yes | 029-admin-reports-analytics-feedback-forms | builder preview; no form engine (constitution) |
| admin | `/management/analysis-student` + `/management/analysis-course` (charts) | `LEGADMIN/screenshots/management-analysis-student-full.png` | — (planned nav `dataAnalysis`) | `NAV` line 74 | planned-future | — | Yes | 029-admin-reports-analytics-feedback-forms | STAT cards, NO charts (constitution) |
| admin | التقارير hub concept | `LEGADMIN/screenshots/management-forms-full.png` (REPORT group) | reports(.en).html (5 detail sections) | `PUB/reports.html`; `SRC/js/pages/reports.js` | implemented | legacy-grounded-improved | No | done | reports body finance-free forever |
| admin | `/management/accounting` finance overview (10-tile AED wall + 5 charts) | `LEGADMIN/screenshots/management-accounting-full.png` | finance(.en).html (status tiles + invoices + 9 GATE cards) | `PUB/finance.html`; `SRC/js/pages/finance.js` | improved | legacy-grounded-improved | No (030 deepens) | done | money aggregates + charts excluded; status-first counts |
| admin | `/management/invoices` (+status/date variants) + monthly-invoices + create-parent | `LEGADMIN/screenshots/management-invoices-full.png` | finance invoice list (4 status tiles); disabled nav `invoices`/`monthlyInvoices` | `PUB/finance.html`; `NAV` lines 85–86; `FIN` line 94 | improved | legacy-grounded-improved | Yes (dedicated pages) | 030-admin-finance-invoices-salaries-banks | fixture list real; 24 authored «ريال» literals sanctioned (Spec 009-invariant); write gated |
| admin | `/management/accounting/transaction/{session,invoices,salary}` + expense + heads ledgers | `LEGADMIN/pages/management-accounting-transaction-salary.md` | finance GATE card `accountingExpenses` | `FIN` line 101 | gated-backendRequired | — | No (030 shells) | 030-admin-finance-invoices-salaries-banks | salary ledger = zero figures forever |
| admin | `/management/salaries` + staff-salaries + salary-class-report + payouts + payout-providers | `LEGADMIN/screenshots/management-salaries-full.png` | 6 disabled nav + GATE cards | `NAV` lines 87–91; `FIN` lines 97–100 | gated-backendRequired | — | No (030 shells, ZERO figures) | 030-admin-finance-invoices-salaries-banks | payroll math permanently out of scope |
| admin | `/management/banks` (+create) bank accounts | `LEGADMIN/pages/management-banks.md` | GATE card `banks` + disabled nav | `FIN` line 102; `NAV` line 91 | planned-future | — | Yes | 030-admin-finance-invoices-salaries-banks | real label list, no balances, CRUD gated |
| admin | `/management/settings/payments` (+methods) gateway config + analysis-invoices/expenses | `LEGADMIN/pages/management-settings-payments.md` | finance planned cards | `M016/legacy-to-new-coverage-matrix.md` line 58; `FIN` lines 95,101 | planned-future | — | Yes | 030-admin-finance-invoices-salaries-banks | keys never shown/faked |
| admin | `/management/admins` (+create/edit/duplicate/appear/categories) staff + audit | `PI` lines 20–29 | — (planned nav `staff`) | `NAV` line 99 | planned-future | — | Yes | 031-admin-management-content-certificates-settings | staff salary field NEVER rendered |
| admin | `/management/admins/permission/{id}` RBAC matrix (170 checkboxes, 16 groups) | `LEGADMIN/screenshots/management-admins-permission-6-full.png` | settings roles preview (foretaste); full matrix pending | `SRC/js/pages/settings.js` (rolesSection) | planned-future | useful-but-needs-better-grounding | Yes | 031-admin-management-content-certificates-settings | display-only matrix + save gate |
| admin | RBAC **Locations** permission group (Show/Add/Edit/Delete) — no crawled page, no inventory row | `LEGADMIN/screenshots/management-admins-permission-6-full.png` (Locations block) | — (no owner row anywhere) | `M016/admin-sidebar-page-inventory.md` (absent) | unclear-needs-review | — | Yes | 024-correction | THE only admin capability with no owner (→ M-04 / B-02); natural home = 031 settings/general slice |
| admin | `/management/materials` SUBJECTS catalog + `/management/library` books | `LEGADMIN/screenshots/management-materials-full.png`, `management-library-full.png` | — (planned nav `materials`/`books`) | `NAV` lines 100–101 | planned-future | — | Yes | 031-admin-management-content-certificates-settings | legacy Subjects folded to materials (G20); browse real, upload gated |
| admin | `/management/pdf` certificate templates + `/management/certificate-requests` queue | `LEGADMIN/screenshots/management-pdf-full.png` | — (planned nav `certificates`/`certificateRequests`) | `NAV` lines 102–103 | planned-future | — | Yes | 031-admin-management-content-certificates-settings | template/queue preview; designer/approve gated |
| admin | `/management/settings/general` 4-tab platform config (identity, location, TZ, accessibility) | `LEGADMIN/screenshots/management-settings-general-full.png` | settings(.en).html hub (thin) + real theme/lang | `PUB/settings.html`; `SRC/js/fixtures/settings.js`; `NAV` line 110 | planned-future | useful-but-needs-better-grounding | Yes | 031-admin-management-content-certificates-settings | appearance controls ALREADY real sitewide; deepening → 031 |
| admin | `/management/settings/{integrations,customisation,notification,security,users}` | `LEGADMIN/screenshots/management-settings-integrations-full.png` | — (planned nav 111–115) | `NAV` lines 111–115 | planned-future | duplicate-or-merge-candidate (settingsUsers) | Yes | 031-admin-management-content-certificates-settings | catalog/matrix/backup; connect+keys gated; settingsUsers merges with staff (→ X-45) |
| admin | `/management/profile/{show,edit}` admin account | `LEGADMIN/pages/management-profile-show.md` | settings profile + account sections | `SRC/js/fixtures/settings.js`; `PUB/settings.html` | implemented | legacy-grounded | No | done | 031 may deepen |
| admin | `/teacher/home` impersonation mirror | `LEGADMIN/pages/teacher-home.md` | — | `M016/legacy-to-new-coverage-matrix.md` line 15 | intentionally-excluded | — | No | intentionally-excluded | impersonation requires real auth (future-backend) |
| admin | `/management/session-class-room/{enc}/{id}` fake live classroom | `academy-dashboard-discovery/frontend-planning-deep/08-role-page-inventory-v2.md` (session-class-room) | — | `M016/legacy-to-new-coverage-matrix.md` line 40 | intentionally-excluded | — | No | future-backend | fake never cloned (G13); real room = backend |
| admin | 5 broken legacy routes (export-course 500, families/feedback/family 500, scheduled-trials 500, monthly-classes 500, message-builder 504) | `academy-dashboard-discovery/frontend-planning-deep/08-role-page-inventory-v2.md` (500/504 flags) | — | — | intentionally-excluded | — | No | future-backend | capabilities re-homed; keep NAMED so 032 doesn't count as gaps |
| admin | export/download actions (export-course, downlaod, invoicesexportData) | `LEGADMIN/pages/management-export-course.md` | — | `M016/legacy-to-new-coverage-matrix.md` line 41 | gated-backendRequired | — | No | future-backend | exports = backend; typo route + 500 are G13 anti-patterns |
| admin | `/management/lang/{×9}` + `/login` + logout + shortcuts | `M016/legacy-to-new-coverage-matrix.md` line 72 | ar/en page pairs + theme/lang toggles | `PUB/` (77 files, .en pairs) | intentionally-excluded | — | No | future-backend | auth = backend; language = static pairs |
| admin | *(net-new)* attendance outcome board | — (legacy had NO attendance page; only modals inside courseclasses) | attendance(.en).html | `PUB/attendance.html`; `SRC/js/pages/attendance.js` | improved | useful-net-new | No | done | overbuilt-better; per-student roster lens → 026 |

### FAMILY / GUARDIAN (13 legacy capabilities → current)

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Family/Guardian | `/management/home` landing (302→student/home) | `LEGFAM/pages/management-home.md` | family-portal(.en).html | `PUB/family-portal.html` | merged | legacy-grounded-improved | No | done | same page as student-home after redirect |
| Family/Guardian | `/student/home` guardian home (hours trio, Time Spendings, Today's Classes, Your Teachers, Request Trial) | `LEGFAM/pages/student-home.md`; `LEGFAM/screenshots/student-home-full.png` | family-portal(.en).html idHero/rail/story | `PUB/family-portal.html` lines 275–420 | improved | legacy-grounded-improved | No | done | multi-child truth restored; hours → family-billing quota tiles ٤٠/١٢/٢٨ |
| Family/Guardian | `/student/today-sessions` day table + cancel/reschedule + upload | `LEGFAM/pages/student-today-sessions.md` | family-schedule + family-requests + child-view homework gate | `PUB/family-schedule.html`; `PUB/family-requests.html` | merged | legacy-grounded-improved | No | done | mutating actions honestly gated |
| Family/Guardian | `/student/timetable` weekly grid | `LEGFAM/pages/student-timetable.md` | family-schedule(.en).html + student-schedule(.en).html | `PUB/family-schedule.html`; `PUB/student-schedule.html` | merged | legacy-grounded-improved | No | done | grid → day groups (020 FR-006) |
| Family/Guardian | `/student/studentslist` "All Account Subscriptions" (8-col) + feedback form | `LEGFAM/pages/student-studentslist.md`; `LEGFAM/screenshots/student-studentslist-full.png` | family-children(.en).html + family-requests «تقييم المعلّم» | `PUB/family-children.html`; `PUB/family-requests.html` | improved | legacy-grounded-improved | No | done | legacy table empty; rebuild renders real fam1 roster |
| Family/Guardian | `/student/student-history-fillter` per-student history + select filter | `LEGFAM/pages/student-student-history-fillter-2.md` | family-progress + family-child `#child=stX` + student-history/progress | `PUB/family-progress.html`; `PUB/family-child.html` | improved | legacy-grounded-improved | No | done | select-filter → pure-CSS `:target` switching |
| Family/Guardian | `/student/billing` invoice table (…**Amount**…Status) | `LEGFAM/pages/student-billing.md`; `LEGFAM/screenshots/student-billing-full.png` | family-billing(.en).html STATUS-FIRST | `PUB/family-billing.html` lines 282–401 | improved | legacy-grounded-improved | No | done | Amount column = intentionally-excluded (family zero-pay LAW); token scan 0 hits |
| Family/Guardian | `/student/feedbacks` follow-up meetings table | `LEGFAM/pages/student-feedbacks.md` | family-requests «لقاءات المتابعة» | `PUB/family-requests.html` | implemented | legacy-grounded | No | done | legacy table itself "No data"; truthfully mirrored |
| Family/Guardian | `/student/request-trial` 2-step wizard | `LEGFAM/pages/student-request-trial.md` | family-requests two-path tiles + gate | `PUB/family-requests.html` | gated-backendRequired | legacy-grounded | No | future-backend | step-2 fields = recorded gap (021 map) |
| Family/Guardian | `/student/library` hero + search + category | `LEGFAM/pages/student-library.md` | family-materials + student-materials | `PUB/family-materials.html`; `PUB/student-materials.html` | improved | legacy-grounded-improved | No | done | hero dropped (020 FR-010); per-child grouping |
| Family/Guardian | `/student/profile` (BROKEN 500 in legacy) + `/student/profile-edit` (3 POST forms) | `LEGFAM/pages/student-profile.md`, `student-profile-edit.md` | family-profile(.en).html (3 gates) + student-profile | `PUB/family-profile.html`; smoke `run.cjs:1096` | improved / gated-backendRequired | legacy-grounded-improved | No | done | 3 gates ↔ 3 legacy forms; rebuild exceeds broken legacy view |
| Family/Guardian | Header notifications bell («See All Notifications», badge) — all 13 pages | `LEGFAM/pages/student-home.md` (Buttons/Badges) | — no current surface or gate | — | missing | — | Yes | 024-correction | → M-01 / B-03; honest `pt-guide` gate or futures register, never a fake bell |
| Family/Guardian | `/login` + `/student/logout`; 9-language switcher; `/main/index.html` 404 | `LEGFAM/role-map.md`; `LEGFAM/pages/main-index-html.md` | demo hub; ar/en pairs; (no 404 clone) | `PUB/portals.html`; `PUB/*.en.html` | reclassified / intentionally-excluded | useful-net-new / legacy-grounded | No | future-backend / intentionally-excluded | auth→hub; >AR/EN out of scope; 404 artifact not cloned |

### TEACHER (17 honest capabilities → current)

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| teacher | `/teacher/home` daily cockpit (hour counters, today table, next-class) | `LEGTCH/pages/teacher-home.md`; `LEGTCH/screenshots/teacher-home-full.png` | teacher-portal(.en).html living cockpit | `PUB/teacher-portal.html` lines 275–402; `SRC/js/pages/teacher-portal.js` | improved | legacy-grounded-improved | No | done | table→living rail; 022 D10 six bands verified |
| teacher | `/teacher/home` "Your Salary" band (997.00 EGP + Estimated/Fines/Bonus) | `LEGTCH/pages/teacher-home.md` lines 47–48,60; `teacher-home-full.png` | NOT rebuilt (zero pay tokens) | `M016/contracts/teacher-pay-free-global-contract.md` rules 1–2; `agent-findings/07` Scan 1 | intentionally-excluded | — | No | intentionally-excluded | pay-free GLOBAL law; excluded content documented precisely |
| teacher | `/teacher/home` end-class outcome recording (classes-end/absent forms) | `LEGTCH/pages/teacher-home.md` forms 4–5 | flowStrip step "تسجيل النتيجة" gate + outcomeSave guidePanel | `PUB/teacher-portal.html` lines 362–391; `PORTAL` line 193 | gated-backendRequired | legacy-grounded | No | 025-teacher-pages | full outcomes page = 025; recording backendRequired forever |
| teacher | `/teacher/home` class-row actions (Enter Again / End / Reschedule / Auto-make-up / Cancel) | `LEGTCH/pages/teacher-home.md` buttons + form 3 | not faked; owned by planned schedule/outcomes | `specs/015-teacher-dashboard/spec.md` FR-014; `PORTAL` lines 161,163 | planned-future | legacy-grounded | No | 025-teacher-pages | reschedule/make-up = honest gate on 025 pages |
| teacher | `/teacher/timetable` weekly grid + Availability modal | `LEGTCH/pages/teacher-timetable.md`; `teacher-timetable-full.png` | ROLE_NAV `schedule` «قريبًا»; today slice in dayRail | `PUB/teacher-portal.html` lines 258,270,399; `PORTAL` lines 161,195 | planned-future | legacy-grounded | No | 025-teacher-pages | agenda cards not a grid clone; availability edit backendRequired |
| teacher | `/teacher/studentslist` full roster (+certificate/report actions; timetable modal) | `LEGTCH/pages/teacher-studentslist.md` lines 180–237 | ROLE_NAV `students` «قريبًا»; roster/recent-sessions retained | `PUB/teacher-portal.html` line 258; `PORTAL` line 162 + TEACHER_PREVIEW | planned-future | legacy-grounded | No | 025-teacher-pages | displacement law honored (fixtures retained for 025) |
| teacher | `/teacher/students` + `/teacher/monthly-plans` (+show) — 24-field monthly evaluation + approval queue | `LEGTCH/pages/teacher-students.md`, `teacher-monthly-plans.md` | ROLE_NAV `reports` «قريبًا»; rubric dims retained display-only | `PORTAL` line 165 + TEACHER_PREVIEW; `specs/015-teacher-dashboard/spec.md` FR-010 | planned-future | legacy-grounded | No | 025-teacher-pages | 3 near-identical routes = ONE capability; no rating-scale mockup (no-score) |
| teacher | `/teacher/update-result` 23-col per-student pay matrix | `LEGTCH/pages/teacher-update-result-…-filter-student.md` lines 101–112; `…-full.png` | NOT rebuilt | `agent-findings/07` Scan 1; contract rules 1–2,6 | intentionally-excluded | — | No | intentionally-excluded | 4th pay surface; ledger concept survives only as 030 GATE shells |
| teacher | `/teacher/salary` 13-col ledger + `/teacher/salary-class-report` filter | `LEGTCH/pages/teacher-salary.md`; `teacher-salary-full.png` | NOT rebuilt | `agent-findings/07` Scan 1; contract rules 1–2,6 | intentionally-excluded | — | No | intentionally-excluded | core Wallet module; admin-side zero-figure shell → 030 |
| teacher | `/teacher/course-history/{id}` (+class) + `/teacher/teacher-history/{id}` per-student history (5 captures) | `LEGTCH/pages/teacher-course-history-1.md` (+4) | ROLE_NAV students/outcomes planned; recent-sessions retained; admin teacher.html sessions tab | `PORTAL` lines 162–163 + TEACHER_PREVIEW; `run.cjs` 514–528; `PUB/teacher.html` | planned-future | legacy-grounded | No | 025-teacher-pages | 5 captures = ONE capability (no double-count) |
| teacher | `/teacher/library` materials (hero, search, categories; empty capture) | `LEGTCH/pages/teacher-library.md` | TEACHER_PREVIEW.materials + matUpload gate retained; NO nav entry, NOT on home | `PORTAL` line 194 + TEACHER_PREVIEW; `specs/015-teacher-dashboard/spec.md` FR-008 | planned-future | useful-but-needs-better-grounding | Yes | 025-teacher-pages | → M-03 / B-05: the one teacher internal with no visible planned gate; 025 adds nav item or folds + records decision |
| teacher | `/teacher/chat` messaging (contact list, groups) | `LEGTCH/pages/teacher-chat.md` | not represented; only admin-side preview sequenced | `specs/015-teacher-dashboard/spec.md` (T13); `M016/future-spec-sequence.md` line 13 | planned-future | useful-but-needs-better-grounding | Yes | 026-admin-control-sessions-ops | → M-02 / B-06: decide teacher «قريبًا» chat item vs explicit exclusion; send-form unconfirmed |
| teacher | `/teacher/tickets` "Tasks" (5 KPI tiles, staff table; empty in legacy) | `LEGTCH/pages/teacher-tickets.md`; `teacher-tickets-full.png` | ROLE_NAV `tasks` «قريبًا» + 3 authored task cards + idHero counter | `PORTAL` line 164 + tasks slice; `PUB/teacher-portal.html` lines 291–295 | planned-future | legacy-grounded | No | 025-teacher-pages | legacy shell all-zero; concept kept, shell excluded |
| teacher | `/teacher/tickets` pie chart + computed "Average" column | `LEGTCH/pages/teacher-tickets.md`; `teacher-tickets-full.png` | NOT rebuilt | CLAUDE.md hard constraints; `specs/015` FR-010 | intentionally-excluded | — | No | intentionally-excluded | second forbidden-pattern class (chart + computed avg) |
| teacher | certificate-request modal (T10) | `LEGTCH/pages/teacher-studentslist.md` modal 4 | concept lines + AR keys baked, retained | `PORTAL` line 129; `SRC/locales/ar.prt.js` lines 429–431 | planned-future | legacy-grounded | No | 025-teacher-pages | retained not dropped; 025 re-renders with submit gate |
| teacher | `/teacher/profile-edit` (avatar/name/email/password) + `/teacher/profile` (500) | `LEGTCH/pages/teacher-profile-edit.md`, `teacher-profile.md` | ROLE_NAV `profile` «قريبًا» | `PORTAL` line 166; `specs/015` FR-012 | planned-future / intentionally-excluded | legacy-grounded | No | 025-teacher-pages / intentionally-excluded | password = backendRequired; /profile 500 not reproduced |
| teacher | `/teacher/session-class-room/{id}/{n}` live class room | `LEGTCH/pages/teacher-session-class-room-mq-2.md` (verified = redirected home copy incl. salary band) | no equivalent; true page NEVER captured | `agent-findings/07` R6 | unclear-needs-review | — | Yes | 024-correction | → M-05 / B-04: order fresh crawl before 025 designs teacher day surfaces |
| teacher | header notifications + "Add shortcuts" widget; 9-lang switcher + logout | `LEGTCH/pages/teacher-home.md` lines 67–69; `teacher-salary.md` form 2 | not faked (no persistence); ar/en + hub demo switch | `specs/015` FR-001/FR-014; `PUB/teacher-portal.html` lines 250–253 | intentionally-excluded / reclassified | legacy-grounded | Yes (register only) | 024-correction / done | → M-10 / B-08: register the honest exclusions so 032 doesn't flag them |

### CROSS-CUTTING / HUB / SHELL / NET-NEW (current→legacy grounding, from `agent-findings/09`)

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| all (3 logins) | The FACT of three legacy logins (no single route) | `PI` role sections L9/L314/L345; Spec 021 DEC-001 | portals(.en).html demo hub | `PUB/portals.html`; `run.cjs:1099–1106` | reclassified | useful-net-new | No | done | X-21: honest no-auth stand-in; 2 role cards + admin + demoted child-view preview |
| Family/Guardian (child view) | `/student/home` single-child presentation | `LEGFAM/pages/student-home.md`; `student-home-full.png` | student-portal(.en).html («عرض الابن») | `PUB/student-portal.html` | reclassified | legacy-grounded-improved | Yes (F-00-1 note) | 024-correction | X-24: demoted per DEC-002/003; body footer leftover → B-01 |
| Family/Guardian (child view) | `/student/timetable,library,history,profile` single-child | `LEGFAM/pages/*` | student-schedule/materials/history/progress/profile(.en).html | `PUB/student-*.html` | reclassified | legacy-grounded | Yes (5 carry F-00-1 note) | 024-correction | X-25…X-30: bodies byte-preserved (022 law); notes → B-01 |
| Family/Guardian | per-child ACCOUNT SWITCH concept | `student-studentslist-full.png` (switcher) + DEC-004 | family-child(.en).html (5 baked `#child=stX` panels) | `PUB/family-child.html` (6 anchors); `run.cjs:1085` | reclassified | useful-net-new | No | done | X-32: baked account-switcher equivalent; THE fold point; MUST STAY |
| admin (design system) | none | — | gallery(.en).html | `PUB/gallery.html`; `SRC/js/pages/gallery.js` | reclassified | useful-net-new | Yes (hide from nav) | 032-final-qa | X-20: visual-acceptance proof page; 032 machine-checks no role nav links it |
| all | GitHub-Pages entry | none (legacy `/main/index.html` was 404) | index.html redirect | `PUB/index.html` | reclassified | useful-net-new | No | done | X-01: 3-line meta-refresh |
| all | Portal Shell v2 nav (topbar + sidenav + mobile drawer) | legacy per-role sidebars | portal-shell.js + ROLE_NAV registries (7/8/7) | `SRC/js/components/portal-shell.js`; `PORTAL` line 139 ff. | implemented | legacy-grounded-improved | No | done | Spec 017; planned items = «قريبًا» non-anchor buttons, `plannedNavAnchors===0` |

---

## Excluded from the coverage denominator (legacy-broken; intentionally unreproduced)

Per the standing instruction, these are NOT matrix rows for "missing" purposes — they are dead in legacy and correctly not rebuilt. Kept NAMED so Spec 032's no-missing audit does not count them as gaps.

| Legacy route | Status in legacy | Evidence | Disposition |
|---|---|---|---|
| `/main/index.html` (admin + family + teacher "Dashboard 1" link) | HTTP 404 "Opps!!!" | `agent-findings/06` A1; `agent-findings/07` (4 teacher 404s) | intentionally-excluded (broken sidebar link) |
| `/teacher/main/index.html`, `/teacher/course-history/main/index.html`, `/teacher/monthly-plans/main/index.html` | HTTP 404 | `agent-findings/07` coverage row "4 dead routes" | intentionally-excluded |
| `/student/profile` (family) | HTTP 500 | `agent-findings/06` A1 row (rebuild EXCEEDS it) | intentionally-excluded |
| `/management/export-course`, `downlaod`/`invoicesexportData` | HTTP 500 (export actions, no page) | `agent-findings/05` Risk 4 | gated-backendRequired (exports = backend) |
| `/management/families/feedback/family/{id}`, new-requests scheduled-trials, `/management/teachers/{id}/monthly-classes` | HTTP 500 | `agent-findings/05` rows | intentionally-excluded (capability re-homed) |
| `/management/settings/customisation/message-builder` | HTTP 504 | `agent-findings/05` row | intentionally-excluded (capability = builder gate in 031) |
| `/teacher/session-class-room/{id}/{n}` | never truly captured (redirected to home) | `agent-findings/07` R6 | unclear-needs-review → B-04 (order a fresh crawl; do NOT count covered OR excluded) |

---

## Conflict resolutions applied during synthesis

1. **Teacher denominator** — findings 02c and 07 agreed: 26 raw captures fold to ~17 honest capabilities (4 dead-404, 3 redirect-home copies, 1 `/profile` 500, 5 history/monthly routes → 2). The matrix uses the folded count; raw captures would overstate "missing".
2. **`teacher-performance.html` role** — finding 09 marked it done; finding 07 verified it is an ADMIN `app-shell` surface (nav rail carries `finance.html` + الرواتب labels) despite the `teacher-*` filename. Resolved: its `#page-body` is pay-free and smoke-asserted (`run.cjs:548–561`), so it is legacy-grounded-improved as an admin board, but the pay-free contract needs a written exemption for it (→ M-09 / B-07). Both findings are right about different layers.
3. **F-00-1 (child-view footer wording)** — findings 00/06/role-model audit agree the note «لوحة الطالب — النسخة الأولى» survives on 6 of 7 child-view pages (byte-preserved BY LAW in 022). The child-view rows above carry `Correction needed? = Yes` and route to B-01; the role model itself remains intact (shell framing dominates).
4. **family-children fold link** — the 022 spec draft mentioned per-child fold links; the implementation sanctioned family-child ONLY (per-child links rejected as dishonest — preview persona is st1). Recorded as INTENTIONAL, not a gap (do not "fix" in 024).

**No P0 coverage blockers.** Every legacy capability is implemented, improved, merged, honestly gated/planned under DEC-009 (025–031), intentionally excluded by law, or a single unclear item (Locations) routed to 024.

# Legacy → New Master Coverage Matrix (Spec 016)

**Scope**: every distinct legacy route TEMPLATE from the crawl (178 templates: admin 145 · teacher 22 · family 11 · student 0 — no separate legacy student role) plus documented-only items. Query/sort/status variants are folded into their template (161+ variants). This matrix EXTENDS `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` (§§1–9 untouched); role-level T/F rows keep their dispositions — this file adds the admin surface + final destinations. **Zero uncategorized rows.**

Status vocabulary (sanctioned 21): already-delivered-001-015 · overview-home · dedicated-page-needed · role-dashboard-shell-needed · admin-page-needed · admin-locked-shell-needed · shared-operations-needed · backendRequired · planned-spec-017…027 · intentionally-excluded · duplicate-merged · needs-decision.

Design treatments (frozen vocabulary, see design freeze): CARDS (card grid/list) · AGENDA (day-grouped) · DRAWER (detail overlay) · TILES (count tiles-as-filters) · LINES (question/concept lines) · GATE (backendRequired shell/note) · LOCK (permission-locked shell) · STAT (stat-card band, authored figures).

## ADMIN (145 templates)

| Legacy route (template) | AR sidebar item | Function | Current destination | Planned destination | Status | Spec | Treatment |
|---|---|---|---|---|---|---|---|
| /management/home (+9 var) | الرئيسية | ops dashboard, 8 KPI + today table, 7 modals | dashboard.html | — | already-delivered-001-015 | — | CARDS+STAT (money fragments excluded) |
| /management/total-queues | — | support queue | — | sessions/attendance ops band | duplicate-merged | 021 | TILES |
| /teacher/home (admin view) | — | impersonation mirror | — | — | intentionally-excluded | — | — |
| /management/new-requests (+8 stage filters +create +requests +scheduled-trials×3) | الطلبات الجديدة | leads/CRM funnel | planned nav | leads funnel page (stages as cards; lead detail drawer; submits gated) | planned-spec-021 | 021 | CARDS+TILES+DRAWER+GATE |
| /management/student (+7 status) | الطلاب | roster by status | students.html | — | already-delivered-001-015 | — | CARDS+TILES |
| /management/student/{id} (+create/edit/trial) | — | student detail, 20 modals | student.html profile | — | already-delivered-001-015 | — | DRAWER→tabs |
| /management/student/{id}/suspend | — | mutating action | — | gated action in profile | backendRequired | — | GATE |
| /management/analysis-student · analysis-course | تحليل البيانات | analytics + charts | planned nav | data-analysis page, display-only STAT (no chart engine) | planned-spec-024 | 024 | STAT+LINES |
| /management/forms/students | نتائج/تقارير الطلاب | monthly report forms | planned nav | monthly-reports family | planned-spec-024 | 024 | LINES+GATE |
| /management/families (+7 status +filter) | العائلات | family list | families.html | — | already-delivered-001-015 | — | CARDS |
| /management/families/{id} (+create/edit) | — | family hub, 8 tabs | family.html | billing tab deepens via 025 links | already-delivered-001-015 | — | tabs |
| /management/families/feedback (+students +family/{id}) | — | meetings/feedback | — | feedback/meetings preview | planned-spec-024 | 024 | CARDS+GATE |
| /management/categories/families (+create/edit/assign) | فئات العائلات | category CRUD | planned nav | categories page (assign preview, save GATE) | planned-spec-022 | 022 | CARDS+GATE |
| /management/family/feedback-categories (+create) | — | feedback categories (empty data) | — | folded into 024 feedback family | duplicate-merged | 024 | LINES |
| /management/teachers (+5 scopes +~14 sorts) | المعلمون | roster | teachers.html | — | already-delivered-001-015 | — | CARDS+TILES |
| /management/teachers/{id} (+create/edit) | — | teacher hub (comp/salary tabs = pay) | teacher.html (pay tabs NEVER) | pay tabs → 025 GATE shells (admin side only) | already-delivered-001-015 (+pay: backendRequired) | 025 | tabs; pay=GATE |
| /management/teachers/{id}/monthly-classes | — | 500 broken | — | capability inside teacher profile | intentionally-excluded | — | — |
| /management/teachers/{id}/compensations family 💰 | — | fines/bonuses ledger | — | admin finance GATE shell | backendRequired | 025 | GATE |
| /management/teachers_details | — | attendance report | — | 023 performance band | planned-spec-023 | 023 | STAT |
| /management/teacher-categories (+create/edit/members) | فئات المعلمين | category CRUD | planned nav | categories page | planned-spec-023 | 023 | CARDS+GATE |
| /management/teacher-feedback (+feedback?y) | مؤشرات الأداء/الأداء الشهري | teacher KPIs/monthly | teacher-performance.html (007) | monthly-perf page adds | already-delivered-001-015 + planned-spec-023 | 023 | STAT+LINES |
| /management/public-holiday | العطلات الرسمية | bulk absence window | planned nav | holidays page (list REAL, write GATE) | planned-spec-021 | 021 | CARDS+GATE |
| /management/all/teachers/timetable | جدول المعلمين | 7×24 grid | schedule teacher-lens (003) | lens stands | already-delivered-001-015 | — | AGENDA (grid never cloned) |
| /management/admins family (+permission ×170cb +appear +categories +duplicate) | الفريق والصلاحيات / المستخدمون | staff + RBAC + audit log | planned nav | staff page + RBAC matrix display + audit preview; saves GATE; salary field NEVER | planned-spec-026 | 026 | CARDS+LINES+GATE |
| /management/courses (+~18 var) | الدورات | enrollments list | courses.html | — | already-delivered-001-015 | — | CARDS |
| /management/courses/{id} (+create/free/edit/copy) | — | enrollment detail, 13 modals | course.html | — | already-delivered-001-015 | — | tabs+DRAWER |
| /management/courseclasses/{id} (×6 +member-details) | الجلسات | session lifecycle + 9 modals | sessions.html + attendance drawer | — | already-delivered-001-015 | — | DRAWER |
| /management/session-class-room/{enc}/{id} | — | fake live room | — | — | intentionally-excluded (real room backendRequired) | — | GATE note |
| /management/export-course · /export-class · /invoicesexportData | — | exports (one 500) | — | export = backend | backendRequired | — | GATE |
| /management/group/index (+groups/create) | المجموعات | group classes | groups.html + group.html | — | already-delivered-001-015 | — | CARDS |
| /management/class-feedback (+feedback?) | — | class feedback | — | 024 feedback family | planned-spec-024 | 024 | LINES |
| /management/sessions_analysis | تحليل الجلسات | outcome KPIs | planned nav | sessions-analysis page STAT | planned-spec-021 | 021 | STAT |
| /management/schedule-sessions-response · schedule-trials-response · request-schedule/{p}/{s} | — | schedule request inboxes/broadcast | — | one schedule-requests inbox preview | planned-spec-021 | 021 | CARDS+GATE |
| /management/search-schedule | بحث الجدول | availability matcher | planned nav | search page (async search GATE) | planned-spec-022 | 022 | CARDS+GATE |
| /management/pdf (+create) | الشهادات | certificate designer | planned nav | templates preview; designer GATE | planned-spec-026 | 026 | CARDS+GATE |
| /management/certificate-requests | طلبات الشهادات | approval queue | planned nav | queue preview; approve GATE | planned-spec-026 | 026 | CARDS+GATE |
| /management/materials (+create/edit) | المواد التعليمية (+Subjects folded) | catalog CRUD | planned nav | catalog page | planned-spec-026 | 026 | CARDS+GATE |
| /management/library | المكتبة | content library | planned nav | browse page; upload GATE | planned-spec-026 | 026 | CARDS+GATE |
| /management/invoices (+~18 var +create-parent +downlaod×8 +monthly-invoices) 💰 | الفواتير/الفواتير الشهرية | invoice mgmt/export | finance.html partial (009) + disabled nav | invoice pages (fixture lists REAL, payments/export GATE) | planned-spec-025 | 025 | CARDS+TILES+GATE |
| /management/accounting (+transaction×3(+3)) 💰 | المالية | finance overview/ledgers | finance.html (009) | deepened w/ GATE ledgers (no runtime math) | already-delivered-001-015 + planned-spec-025 | 025 | STAT+GATE |
| /management/analysis-invoices · analysis-expenses 💰 | — | invoice/P&L analytics | 009 planned card | GATE shells (status language) | backendRequired | 025 | GATE |
| /management/expense (+heads) 💰 | — | expense ledger | 009 planned card | GATE shell | backendRequired | 025 | GATE |
| /management/salaries · staff-salaries · salary-class-report 💰 | الرواتب/رواتب الموظفين/تقرير رواتب الفصول | payroll ledgers | disabled nav | GATE shells, ZERO figures | backendRequired | 025 | GATE |
| /management/payouts (+providers/edit) 💰 | المدفوعات | payout queue/providers | disabled nav | GATE shells (provider names only, keys never) | backendRequired | 025 | GATE |
| /management/banks (+create) 💰 | البنوك | bank accounts | disabled nav | label list REAL; CRUD GATE | planned-spec-025 | 025 | CARDS+GATE |
| /management/settings/payments (×7 +edit) 💰 | — | gateway methods | — | methods preview; config GATE | planned-spec-025 | 025 | CARDS+GATE |
| /management/chat | المحادثات | group messaging | planned nav | chat preview page; send GATE | planned-spec-021 | 021 | CARDS+GATE |
| /management/public-advertisement | الإعلانات والإشعارات | broadcast | planned nav | announce preview; send GATE | planned-spec-021 | 021 | CARDS+GATE |
| /management/settings/notification | — | 47-toggle routing matrix | planned nav | matrix display; toggles GATE | planned-spec-026 | 026 | LINES+GATE |
| /management/tickets | المهام | tasks board (empty) | planned nav | authored board; manage GATE | planned-spec-021 | 021 | CARDS+GATE |
| /management/forms (+create) | — | form builder 6 q-types | — | builder preview; create GATE (no form engine) | planned-spec-024 | 024 | LINES+GATE |
| /management/settings/general | عام | 4-tab platform config | planned nav | display + save GATE | planned-spec-026 | 026 | settings cards |
| /management/settings/integrations (+11 configure +2 insights) | التكاملات | integrations catalog | planned nav | catalog; connect GATE | planned-spec-026 | 026 | CARDS+GATE |
| /management/settings/customisation/personalisation | التخصيص | theming | planned nav | theming preview (theme controls already real) | planned-spec-026 | 026 | settings cards |
| /management/settings/customisation/message-builder | — | 504 broken | — | builder GATE inside 026 customisation | intentionally-excluded (capability: backendRequired) | 026 | GATE |
| /management/settings/security/{data,policy} (+backup) | الأمان | import/backup/policy | planned nav | GATE shell | planned-spec-026 | 026 | GATE |
| /management/profile/{show,edit} | — | admin account | settings.html slice | 026 account slice | already-delivered-001-015 | — | profile cards |
| /management/time-convertor | محول الوقت | TZ converter | planned nav | static TZ page (display-only) | planned-spec-021 | 021 | CARDS |
| /management/scheduled-actions (+create) | الإجراءات المجدولة | automation rules | planned nav | rules preview; automation GATE | planned-spec-021 | 021 | CARDS+GATE |
| /management/lang/{×9} · /login · logout · shortcuts POST | — | system | — | — | intentionally-excluded (auth backendRequired) | — | — |

## TEACHER (22 templates) — all dispositioned in coverage §9; final destinations

| Route | §9 row | Final destination | Status | Spec |
|---|---|---|---|---|
| /teacher/home | T1 | teacher-portal.html HOME (kept) | overview-home | done |
| /teacher/timetable | T14 | teacher-schedule.html | planned-spec-020 | 020 |
| /teacher/studentslist · /students | T8/T12 | teacher-students.html (one roster) | planned-spec-020 (+duplicate-merged) | 020 |
| /teacher/monthly-plans (+show) | T11 | teacher-reports.html | planned-spec-020 | 020 |
| /teacher/update-result 💰 | T19 | — (admin finance) | backendRequired | 025 |
| /teacher/course-history · /teacher-history (dup family) | T20/T21 | teacher-outcomes.html (one history) | planned-spec-020 (+duplicate-merged) | 020 |
| /teacher/session-class-room | T6/T7 | — (honest live GATE stands) | intentionally-excluded / backendRequired | — |
| /teacher/chat | T13 | GATE note in app; admin chat page 021 | backendRequired | 021 |
| /teacher/library | T15 | teacher-tasks.html materials band | planned-spec-020 | 020 |
| /teacher/tickets | T16 | teacher-tasks.html tasks band | planned-spec-020 | 020 |
| /teacher/salary · salary-class-report 💰 | T17/T18 | — NEVER in teacher app | backendRequired | 025 (admin only) |
| /teacher/profile-edit · /profile(500) | T23/T24 | teacher-profile.html | planned-spec-020 / intentionally-excluded | 020 |
| main/index 404s ×4 | T25 | — | intentionally-excluded | — |

## FAMILY/GUARDIAN (11 templates) — §§2/8 dispositioned; final destinations

| Route | Final destination | Status | Spec |
|---|---|---|---|
| /student/home | family-portal.html HOME (kept) | overview-home | done |
| /student/timetable | family-schedule.html | planned-spec-019 | 019 |
| /student/student-history-fillter | family-progress.html history | planned-spec-019 | 019 |
| /student/studentslist (courses/subscriptions + feedback modal) | family-children.html + family-billing.html (labels) + family-requests.html (rubric) | planned-spec-019 | 019 |
| /student/billing 💰 (view-only, no pay form in legacy!) | family-billing.html STATUS-ONLY (zero figures — stricter than legacy) | planned-spec-019 | 019 |
| /student/feedbacks | family-requests.html meetings (truthful empty) | planned-spec-019 | 019 |
| /student/library | family-materials.html | planned-spec-019 | 019 |
| /student/today-sessions (+cancel/upload/voice) | family-schedule.html today + request GATE; upload/voice GATE (F4) | planned-spec-019 | 019 |
| /student/request-trial | family-requests.html trial tiles | planned-spec-019 | 019 |
| /student/profile-edit · /profile(500) | family-profile.html | planned-spec-019 / intentionally-excluded | 019 |

## STUDENT — no legacy role existed

Our student app (013 HOME + Spec-018 pages) is **net-new value beyond legacy**, grounded in product goals; each 018 page maps to guardian-proxy capabilities where they exist (schedule/history/library/homework-records) and to honest new value where they don't (progress/achievements/celebration — never leaderboard/rank).

## Reconciliation & assertion

178 templates: admin 145 → 33 already-delivered-cluster rows + 52 planned-021…026 destinations + 18 backendRequired + 9 intentionally-excluded + 6 duplicate-merged (folded rows counted within their cluster lines above) · teacher 22 → §9 + destinations above · family 11 → §8 + destinations above. Role shell = planned-spec-017 (`role-dashboard-shell-needed` applies to all 018–020 rows implicitly). `needs-decision` rows: **0 remaining** (both candidates resolved in the sidebar inventory: studentResult/studentEvaluation = dedicated thin pages; all-teachers timetable = lens stands). **Every legacy route template above carries a status — zero uncategorized.**

## Delivery annotations (append-only)

**Spec 017 (2026-07-03) — Role Dashboard Shell + Navigation: DELIVERED.** The `role-dashboard-shell-needed` layer is satisfied: Portal Shell v2 (role topbar · persistent desktop sidebar with identity block and hub exit · native mobile `details` disclosure — freeze amendments A1/A2 recorded) now hosts all three role HOME pages with data-driven `ROLE_NAV` registries (student 7 · family 8 · teacher 7; home=implemented, futures=labeled planned buttons). Home `#page-body` content proven byte-equal to HEAD; 41/49 built files hash-identical; the sanctioned-anchor registry is smoke-pinned per portal page. **Specs 018–020 flip individual registry statuses `planned → implemented` — one status line + the built page pair = a live nav destination; zero shell rework remains.**

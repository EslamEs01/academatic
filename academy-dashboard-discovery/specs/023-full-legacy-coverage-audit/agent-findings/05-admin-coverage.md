# Agent 05 — ADMIN Coverage Audit (Spec 023, legacy 000–022)

## Scope & method

Mission: map every legacy ADMIN module/page group (300 captured pages → ~90 distinct template
groups after folding query/sort/status variants) to the rebuilt admin surface, with one coverage
classification per legacy item and one quality classification per current item.

Method actually used (no memory, no assumptions):

1. Enumerated all 300 legacy admin page captures from
   `academy-dashboard-discovery/output/roles/admin/pages/` (filename listing + prefix grouping).
2. Opened 7 legacy page extracts (.md) — they are metadata stubs pointing at screenshots, so the
   REAL legacy evidence is visual: opened 17 full-page legacy screenshots (list below) covering
   every major module family (home, leads, finance ×5, RBAC, integrations, certificates, forms,
   library, materials, analytics, timetable, compensations, session lifecycle, teacher KPIs,
   settings general).
3. Cross-read `output/combined/page-inventory.md`, `output/combined/route-graph.md`, and
   `frontend-planning-deep/08-role-page-inventory-v2.md` (template-level counts, HTTP 500/504 flags).
4. RE-VERIFIED (not trusted) the Spec 016 prior-art: `admin-sidebar-page-inventory.md` (57 rows),
   `legacy-to-new-coverage-matrix.md`, `missing-pages-and-gaps-register.md` (G1–G20),
   `future-spec-sequence.md` (incl. the DEC-009 renumbering 026–031 for admin groups).
5. Opened the CURRENT rebuilt surface: `app/src/js/nav.config.js` (the whole admin nav registry,
   statuses per item), 18 page modules under `app/src/js/pages/`, `app/src/js/fixtures/finance.js`
   and `fixtures/settings.js`, plus token-level greps of built `app/public/finance.html`,
   `reports.html`, `settings.html`.

Path convention: all relative paths below are under
`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/`.
Owner specs use the DEC-009 renumbering (old 021→026 … 026→031) per
`specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/future-spec-sequence.md` lines 72–88.

## Evidence opened (exact paths)

Legacy (screenshots — opened visually):
- output/roles/admin/screenshots/management-home-full.png
- output/roles/admin/screenshots/management-new-requests-full.png
- output/roles/admin/screenshots/management-accounting-full.png
- output/roles/admin/screenshots/management-salaries-full.png
- output/roles/admin/screenshots/management-invoices-full.png
- output/roles/admin/screenshots/management-admins-permission-6-full.png
- output/roles/admin/screenshots/management-settings-integrations-full.png
- output/roles/admin/screenshots/management-pdf-full.png
- output/roles/admin/screenshots/management-forms-full.png
- output/roles/admin/screenshots/management-library-full.png
- output/roles/admin/screenshots/management-materials-full.png
- output/roles/admin/screenshots/management-analysis-student-full.png
- output/roles/admin/screenshots/management-all-teachers-timetable-full.png
- output/roles/admin/screenshots/management-teachers-1-compensations-1-full.png
- output/roles/admin/screenshots/management-courseclasses-1-full.png
- output/roles/admin/screenshots/management-teacher-feedback-full.png
- output/roles/admin/screenshots/management-settings-general-full.png

Legacy (page extracts / inventories):
- output/roles/admin/pages/ (full 300-file directory enumeration + prefix grouping)
- output/roles/admin/pages/management-home.md
- output/roles/admin/pages/management-new-requests.md
- output/roles/admin/pages/management-tickets.md
- output/roles/admin/pages/management-chat.md
- output/roles/admin/pages/management-time-convertor.md
- output/roles/admin/pages/management-total-queues.md
- output/roles/admin/pages/management-sessions-analysis.md
- output/combined/page-inventory.md (admin section)
- output/combined/route-graph.md (admin discovery table)
- frontend-planning-deep/08-role-page-inventory-v2.md (admin template tables, lines 1–80)

Prior-art (re-verified):
- specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/admin-sidebar-page-inventory.md
- specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/legacy-to-new-coverage-matrix.md
- specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/missing-pages-and-gaps-register.md
- specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/future-spec-sequence.md

Current rebuilt surface:
- app/public/ (full 77-file directory enumeration)
- app/src/js/nav.config.js (full read — every admin nav item + status + FUTURE_ROUTES + guards)
- app/src/js/pages/dashboard.js, sessions.js, schedule.js, attendance.js, finance.js, reports.js,
  settings.js, families.js, family.js, add-family.js, students.js, student.js, courses.js,
  course.js, groups.js, group.js, teachers.js, teacher.js, teacher-performance.js, gallery.js
  (module headers + structure; reports.js section map; finance.js tiles/planned cards)
- app/src/js/fixtures/finance.js (PLANNED_FINANCE nine cards, lines 85–124)
- app/src/js/fixtures/settings.js (section ids: profile/appearance/notif/account + roles preview)
- app/public/finance.html (token greps: 5 fin-tiles, invoice list, 24 authored «ريال» literals,
  «قريبًا» ×29, salary/banks/payments GATE card labels present, zero `availability` raw keys)
- app/public/reports.html (5 rep-section detail cards), app/public/settings.html (profile slice)

## Coverage table

Groups fold variants: e.g. `/management/teachers` sort/scope variants = 60 captured pages = ONE row.
Row count: 78. Every one of the 300 captured files is owned by exactly one row below.

| Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes |
|---|---|---|---|---|---|---|---|---|---|
| admin | /management/home — ops dashboard (KPI wall + Classes-Of-today table + 7 modals; 11 var) | output/roles/admin/screenshots/management-home-full.png | dashboard.html | app/src/js/pages/dashboard.js | improved | legacy-grounded-improved | No | done | KPI row + today sessions + up-next rebuilt; legacy «(3.00 Fine)» money fragment on home deliberately excluded (zero-pay law) |
| admin | /management/home?status=… (6 status filter variants) | output/roles/admin/pages/management-home-status.md (+5 siblings) | dashboard.html status tiles + sessions.html filters | app/src/js/pages/sessions.js | merged | legacy-grounded | No | done | status lenses became tiles-as-filters, not separate pages |
| admin | /management/home helper/trial variants | output/roles/admin/pages/management-home-helper-1.md, management-home-trial-0.md | dashboard.html | app/src/js/pages/dashboard.js | merged | legacy-grounded | No | done | same template per 08-role-page-inventory-v2.md |
| admin | /management/total-queues — support queue counter page | output/roles/admin/pages/management-total-queues.md | — (not yet) | app/src/js/nav.config.js (no item; 016 fold decision) | planned-future | — | Yes — build ops band | 026-admin-control-sessions-ops | folds into sessions/attendance ops band per admin-sidebar-page-inventory.md row «قوائم الانتظار» |
| admin | /teacher/home — admin impersonation mirror of teacher home | output/roles/admin/pages/teacher-home.md | — | specs/016-…/legacy-to-new-coverage-matrix.md line 15 | intentionally-excluded | — | No | intentionally-excluded | impersonation requires real auth (future-backend) |
| admin | /management/new-requests — leads/CRM funnel (9 stage cards, converted/not-converted, gender/velocity stats) | output/roles/admin/screenshots/management-new-requests-full.png | — (planned nav `leads`) | app/src/js/nav.config.js line 29 | planned-future | — | Yes — leads funnel page | 026-admin-control-sessions-ops | stages as cards + detail drawer; submits gated |
| admin | /management/new-requests/create (22-field lead form) | output/roles/admin/pages/management-new-requests-create.md | — | app/src/js/nav.config.js line 29 | planned-future | — | Yes — create gated | 026-admin-control-sessions-ops | write = backendRequired gate on the 026 page |
| admin | /management/new-requests filter variants (contacting/duplicat/no-response/pending/qualified/teacher/trial-missed/trial-taken ×date-range) | output/roles/admin/pages/management-new-requests-filter-pending-date-range-2026-06-01-to-2026-06-30.md (+7 siblings) | — | — | merged | — | No (folds into 026 page filters) | 026-admin-control-sessions-ops | filter lenses, not pages |
| admin | /management/new-requests/requests + scheduled-trials family (2 of 4 routes HTTP 500) | frontend-planning-deep/08-role-page-inventory-v2.md («HTTP 500» flags) | — | — | planned-future | — | Yes — one trials inbox slice | 026-admin-control-sessions-ops | broken 500 variants intentionally-excluded; capability kept |
| admin | /management/sessions_analysis — outcome KPI form/board | output/roles/admin/pages/management-sessions-analysis.md | — (planned nav `sessionsAnalysis`) | app/src/js/nav.config.js line 27 | planned-future | — | Yes — display-only STAT page | 026-admin-control-sessions-ops | authored figures only; no computed score |
| admin | /management/chat — group messaging | output/roles/admin/pages/management-chat.md | — (planned nav `messages`) | app/src/js/nav.config.js line 28 | planned-future | — | Yes — thread preview page | 026-admin-control-sessions-ops | send = future-backend gate |
| admin | /management/tickets — tasks board (empty in legacy) | output/roles/admin/pages/management-tickets.md | — (planned nav `tasks`) | app/src/js/nav.config.js line 30 | planned-future | — | Yes — authored board | 026-admin-control-sessions-ops | manage writes gated |
| admin | /management/public-advertisement — broadcast/announce | output/roles/admin/pages/management-public-advertisement.md | — (planned nav `announcements`) | app/src/js/nav.config.js line 31 | planned-future | — | Yes — preview + send gate | 026-admin-control-sessions-ops | — |
| admin | /management/time-convertor — TZ converter | output/roles/admin/pages/management-time-convertor.md | — (planned nav `timeConverter`) | app/src/js/nav.config.js line 32 | planned-future | — | Yes — static TZ table | 026-admin-control-sessions-ops | display-only (no TZ engine) |
| admin | /management/public-holiday — holidays + bulk-absence window | output/roles/admin/pages/management-public-holiday.md | — (planned nav `publicHoliday`) | app/src/js/nav.config.js line 33 | planned-future | — | Yes — list REAL, write gate | 026-admin-control-sessions-ops | — |
| admin | /management/scheduled-actions (+create, 20 fields) — automation rules | output/roles/admin/pages/management-scheduled-actions.md, management-scheduled-actions-create.md | — (planned nav `scheduledActions`) | app/src/js/nav.config.js line 34 | planned-future | — | Yes — rules preview | 026-admin-control-sessions-ops | automation engine = future-backend |
| admin | /management/schedule-sessions-response + schedule-trials-response + request-schedule/{p}/{s} — schedule-request inboxes | output/roles/admin/pages/management-schedule-sessions-response.md, management-schedule-trials-response.md, management-request-schedule-1-1.md | — | specs/016-…/legacy-to-new-coverage-matrix.md line 45 | merged | — | Yes — ONE schedule-requests inbox | 026-admin-control-sessions-ops | three legacy boxes → one preview inbox |
| admin | /management/search-schedule — availability matcher | output/roles/admin/pages/management-search-schedule.md | — (planned nav `scheduleSearch`) | app/src/js/nav.config.js line 46 | planned-future | — | Yes — matcher preview, async search gated | 027-admin-families-students-courses-groups | — |
| admin | /management/all/teachers/timetable — 7×24 all-teachers grid w/ per-teacher checkboxes + Active/«Active & unpaid»/Inactive legend | output/roles/admin/screenshots/management-all-teachers-timetable-full.png | schedule.html teacher-lens (tabs: agenda + hand-rolled grid + teacher filter) | app/src/js/pages/schedule.js | improved | legacy-grounded-improved | No | done | 016 needs-decision resolved: lens suffices; «unpaid» status coloring on a schedule intentionally-excluded (pay-signal leak) |
| admin | /management/session-class-room/{enc}/{id} — fake live classroom (re-rendered home) | frontend-planning-deep/08-role-page-inventory-v2.md (session-class-room row) | — | specs/016-…/legacy-to-new-coverage-matrix.md line 40 | intentionally-excluded | — | No | future-backend | real live room = backend engine; the fake is never cloned (G13) |
| admin | /management/families (+7 status variants) — family list | output/roles/admin/pages/management-families.md, management-families-status-active.md (+6) | families.html (cards + search + status/category filters) | app/src/js/pages/families.js | implemented | legacy-grounded | No | done | status variants = facets |
| admin | /management/families/index?filter=payment_methods — payment-method lens on families | output/roles/admin/pages/management-families-index-filter-payment-methods-0-1.md | finance.html family filter (invoice-status by family) | app/src/js/pages/finance.js (familiesWithInvoices) | reclassified | legacy-grounded-improved | No | done | pay-method lens moved off the roster to the finance surface, status-first |
| admin | /management/families/{id} — family hub (8 tabs) | output/combined/page-inventory.md (families rows) | family.html (Overview/Students/Schedule/Plan & Billing/Notes) | app/src/js/pages/family.js | implemented | legacy-grounded | No | done | billing tab deepens via 030 links per 016 matrix line 23 |
| admin | /management/families/create + {id}/edit | output/roles/admin/pages/management-families-create.md, management-families-1-edit.md | add-family.html wizard (multi-step, save=gate) | app/src/js/pages/add-family.js | implemented | legacy-grounded | No | done | edit writes gated |
| admin | /management/families/feedback (+students +5 status lenses) — meetings/feedback | output/roles/admin/pages/management-families-feedback.md, management-families-feedback-students.md | — | specs/016-…/legacy-to-new-coverage-matrix.md line 24 | planned-future | — | Yes — feedback/meetings preview | 029-admin-reports-analytics-feedback-forms | — |
| admin | /management/families/feedback/family/{id} (HTTP 500) | frontend-planning-deep/08-role-page-inventory-v2.md («HTTP 500») | — | — | intentionally-excluded | — | No | intentionally-excluded | broken route; capability lives in the 029 feedback family |
| admin | /management/categories/families (+create/edit/assign ×2) — family categories CRUD | output/roles/admin/pages/management-categories-families.md (+5) | — (planned nav `familyCategories`) | app/src/js/nav.config.js line 44 | planned-future | — | Yes — labels + assignment preview | 027-admin-families-students-courses-groups | families.html already renders category chips (FAMILY_CATEGORIES fixture) |
| admin | /management/family/feedback-categories (+create) — feedback categories (empty data) | output/roles/admin/pages/management-family-feedback-categories.md | — | specs/016-…/legacy-to-new-coverage-matrix.md line 26 | merged | — | No (folds into 029) | 029-admin-reports-analytics-feedback-forms | — |
| admin | /management/student (+status ×6 +softdelete) — roster by status | output/roles/admin/pages/management-student.md, management-student-status-0.md (+6) | students.html (table + status facets + family chips) | app/src/js/pages/students.js | implemented | legacy-grounded-improved | No | done | family relationship added (legacy lacked the chip) |
| admin | /management/student/{id} — student detail (20 modals) | output/combined/page-inventory.md (student rows) | student.html (Overview/Courses/Timetable/Results/Evaluation/Family/Notes) | app/src/js/pages/student.js | improved | legacy-grounded-improved | No | done | modals → tabs + drawers |
| admin | /management/student/{id}/create + edit + trial-create | output/roles/admin/pages/management-student-1-create.md, management-student-1-edit.md, management-student-1-trial-create.md | student.html gated actions | app/src/js/pages/student.js | gated-backendRequired | legacy-grounded | No | future-backend | writes = honest gates per the four action classes |
| admin | student suspend / force-delete / restore mutations (RBAC verbs) | output/roles/admin/screenshots/management-admins-permission-6-full.png (Students List group) | — | specs/016-…/legacy-to-new-coverage-matrix.md line 19 | gated-backendRequired | — | No | future-backend | — |
| admin | نتائج الطلاب / تقييم الطلاب (student results & evaluation views — no distinct legacy route; teacher update-result + profile tabs) | specs/016-…/admin-sidebar-page-inventory.md lines 37–38 | — (planned nav `studentResult`, `studentEvaluation`) | app/src/js/nav.config.js lines 47–48 | planned-future | — | Yes — thin pages over profile tab content | 027-admin-families-students-courses-groups | student.html Results/Evaluation tabs already carry the content |
| admin | /management/courses (+6 status +6 type=no-invoices variants +14 var) — enrollments list | output/roles/admin/pages/management-courses.md (+13) | courses.html | app/src/js/pages/courses.js | implemented | legacy-grounded | No | done | «no-invoices» lens = a finance-tinged facet; status-first equivalent covered via finance.html family/status filters |
| admin | /management/courses/{id} — enrollment detail (13 modals, 85 fields) | frontend-planning-deep/08-role-page-inventory-v2.md (courses/{id} row) | course.html (Overview/Groups/Students/Teachers/Timetable/Outcomes/Learning Path/Notes) | app/src/js/pages/course.js | improved | legacy-grounded-improved | No | done | Learning-Path deepening owned by 027 (016 matrix line 33) |
| admin | /management/courses/{id}/create + create_free + edit + create_new_copy | output/roles/admin/pages/management-courses-1-create.md (+5) | course.html gated actions | app/src/js/pages/course.js | gated-backendRequired | legacy-grounded | No | future-backend | enrolment writes gated |
| admin | /management/courseclasses/{id} ×6 — session lifecycle (Class History/Info/Files/Timetable timeline/Recording/Timeline + 9 modals) | output/roles/admin/screenshots/management-courseclasses-1-full.png | sessions.html (list+agenda tabs) + shared outcome/appointment drawers | app/src/js/pages/sessions.js | improved | legacy-grounded-improved | No | done | «Class Recording» = fake-live adjacencies intentionally-excluded; status writes future-backend |
| admin | /management/courseclasses/default-member-course-details/{id} | output/roles/admin/pages/management-courseclasses-default-member-course-details-1.md | course.html + sessions drawer | app/src/js/pages/course.js | merged | legacy-grounded | No | done | — |
| admin | /management/group/index + /management/groups/create (45 fields) | output/roles/admin/pages/management-group-index.md, management-groups-create.md | groups.html + group.html | app/src/js/pages/groups.js, app/src/js/pages/group.js | implemented | legacy-grounded | No | done | create = gated |
| admin | /management/export-course (HTTP 500) + /management/downlaod family (typo route; invoice export ×8) + invoicesexportData | output/roles/admin/pages/management-export-course.md, management-downlaod.md (+7) | — | specs/016-…/legacy-to-new-coverage-matrix.md line 41 | gated-backendRequired | — | No | future-backend | exports = backend; the typo route + 500 are G13 anti-patterns, never cloned |
| admin | /management/teachers (+scope ×5 +sort ×14 ≈ 60 captured pages) — roster | output/roles/admin/pages/management-teachers.md (+59 variant files) | teachers.html (card grid + status chips + counts) | app/src/js/pages/teachers.js | implemented | legacy-grounded-improved | No | done | scopes → labeled status chips; sort permutations = table affordances, not pages |
| admin | /management/teachers/create — add-teacher wizard (incl. payout section) | output/roles/admin/pages/management-teachers-create.md | — (planned nav `addTeacher`) | app/src/js/nav.config.js line 55 | planned-future | — | Yes — wizard preview, ZERO pay fields | 028-admin-teachers-performance | legacy form's payout block stays a 030 GATE, per 016 row |
| admin | /management/teachers/{id} (+edit) — teacher hub incl. comp/salary tabs | output/combined/page-inventory.md (teachers rows) | teacher.html (8 tabs: Overview/Courses/Groups/Timetable/Sessions&Outcomes/Students/Follow-up/Notes) | app/src/js/pages/teacher.js | improved | legacy-grounded-improved | No | done | pay tabs NEVER rendered (module header states it; pay-free law) |
| admin | /management/teachers/{id}/compensations (+create/edit ×3) — fines/bonuses ledger («Fine · Amount 1,000.00») | output/roles/admin/screenshots/management-teachers-1-compensations-1-full.png | — (finance GATE card `payoutsCompensations`) | app/src/js/fixtures/finance.js line 100 | gated-backendRequired | — | No (030 builds the honest shell) | 030-admin-finance-invoices-salaries-banks | zero figures forever |
| admin | /management/teachers/{id}/monthly-classes (HTTP 500) | output/roles/admin/pages/management-teachers-1-monthly-classes.md | teacher.html sessions tab | app/src/js/pages/teacher.js | intentionally-excluded | — | No | intentionally-excluded | broken; capability inside the profile (016 matrix line 29) |
| admin | /management/teachers_details — teacher attendance report | output/roles/admin/pages/management-teachers-details.md | — | specs/016-…/admin-sidebar-page-inventory.md line 51 | planned-future | — | Yes — performance band | 028-admin-teachers-performance | — |
| admin | /management/teacher-categories (+create/edit/members) | output/roles/admin/pages/management-teacher-categories.md (+3) | — (planned nav `teacherCategories`) | app/src/js/nav.config.js line 56 | planned-future | — | Yes — labels + members preview | 028-admin-teachers-performance | — |
| admin | /management/teacher-feedback — teacher KPIs (List of Teachers + «Percentage» column + Add Category) | output/roles/admin/screenshots/management-teacher-feedback-full.png | teacher-performance.html (KPI tiles + per-teacher comparison + follow-up queue) | app/src/js/pages/teacher-performance.js | improved | legacy-grounded-improved | No | done | legacy computed «Percentage» intentionally-excluded (no computed score law); counts + labeled signals instead |
| admin | /management/teacher-feedback/feedback?teacher_id&year — monthly performance view | output/roles/admin/pages/management-teacher-feedback-feedback-teacher-id-1-year-2026.md | — (planned nav `monthlyPerf`) | app/src/js/nav.config.js line 64 | planned-future | — | Yes — display-only monthly view | 028-admin-teachers-performance | — |
| admin | مؤشر أداء الحصص — sessions/classes KPI lens | specs/016-…/admin-sidebar-page-inventory.md line 49 | — (planned nav `sessionsKpi`) | app/src/js/nav.config.js line 63 | planned-future | — | Yes — display-only board | 028-admin-teachers-performance | — |
| admin | /management/class-feedback (+feedback +teacher/date filters) | output/roles/admin/pages/management-class-feedback.md (+2) | — | specs/016-…/legacy-to-new-coverage-matrix.md line 43 | planned-future | — | Yes — 029 feedback family | 029-admin-reports-analytics-feedback-forms | — |
| admin | «monthly reports» sidebar item → /management/forms family (Forms list + Create Form + reports follow-up) | output/roles/admin/screenshots/management-forms-full.png | reports.html hub exists; monthly-reports page not yet | app/src/js/nav.config.js line 73 (`monthlyReports` planned) | planned-future | — | Yes — display-only monthly reports | 029-admin-reports-analytics-feedback-forms | — |
| admin | /management/forms (+create — 6 question types) — form builder | output/roles/admin/pages/management-forms.md, management-forms-create.md | — | specs/016-…/legacy-to-new-coverage-matrix.md line 63 | planned-future | — | Yes — builder preview; engine gated | 029-admin-reports-analytics-feedback-forms | no form engine (constitution) |
| admin | /management/forms/students — student monthly report forms | output/roles/admin/pages/management-forms-students.md | — | specs/016-…/admin-sidebar-page-inventory.md line 39 | merged | — | No (folds into 029) | 029-admin-reports-analytics-feedback-forms | — |
| admin | /management/analysis-student — student statistics (stat tiles + bar/donut/world-map CHARTS) | output/roles/admin/screenshots/management-analysis-student-full.png | — (planned nav `dataAnalysis`) | app/src/js/nav.config.js line 74 | planned-future | — | Yes — STAT cards, NO charts | 029-admin-reports-analytics-feedback-forms | chart engine intentionally-excluded by constitution; counts/labels only |
| admin | /management/analysis-course — course statistics tab | output/roles/admin/pages/management-analysis-course.md | — (same `dataAnalysis`) | app/src/js/nav.config.js line 74 | planned-future | — | Yes | 029-admin-reports-analytics-feedback-forms | — |
| admin | التقارير hub (reports concept) | output/roles/admin/screenshots/management-forms-full.png (REPORT sidebar group) | reports.html (ops overview + catalog + 5 per-area detail sections) | app/src/js/pages/reports.js; app/public/reports.html (5 `rep-section`) | implemented | legacy-grounded-improved | No | done | reports body finance-free forever |
| admin | /management/accounting — finance overview (AED money-KPI wall ×10 + 5 line charts) | output/roles/admin/screenshots/management-accounting-full.png | finance.html (status tiles + invoice list + payments + 9 planned/GATE cards) | app/src/js/pages/finance.js; app/public/finance.html | improved | legacy-grounded-improved | No | done (030 deepens) | money aggregates + charts excluded; status-first counts instead |
| admin | /management/accounting/transaction/{session,invoices,salary} (+3 session status lenses) — ledgers | output/roles/admin/pages/management-accounting-transaction-salary.md (+5) | finance.html GATE card `accountingExpenses` | app/src/js/fixtures/finance.js line 101 | gated-backendRequired | — | No (030 shells) | 030-admin-finance-invoices-salaries-banks | salary ledger = zero figures forever |
| admin | /management/invoices (+status ×4 +date/date-type ~14 var) — invoice management | output/roles/admin/screenshots/management-invoices-full.png | finance.html invoice list w/ 4 status tiles (paid/unpaid/overdue/cancelled) + disabled nav `invoices` | app/public/finance.html (5 fin-tile, invoice-list); app/src/js/nav.config.js line 85 | improved (partial) | legacy-grounded-improved | Yes — dedicated invoices page | 030-admin-finance-invoices-salaries-banks | fixture list REAL; payment-record writes gated |
| admin | /management/invoices/create-parent-invoice/{id} ×2 — invoice builder | output/roles/admin/pages/management-invoices-create-parent-invoice-1.md | — | specs/016-…/legacy-to-new-coverage-matrix.md line 51 | gated-backendRequired | — | No (030 gate) | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/monthly-invoices | output/roles/admin/pages/management-monthly-invoices.md | — (disabled nav `monthlyInvoices`) | app/src/js/nav.config.js line 86; app/src/js/fixtures/finance.js line 94 | planned-future | — | Yes — fixture list + gate | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/expense + /management/heads — expense ledger + expense heads | output/roles/admin/pages/management-expense.md, management-heads.md | finance.html GATE card `accountingExpenses` | app/src/js/fixtures/finance.js line 101 | gated-backendRequired | — | No (030 shells) | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/salaries — teacher payroll ledger (Fixed/plus/minus/Fine/Gift/Hour-Rate/Total-EUR columns + «Generate Salary» + «Request payouts») | output/roles/admin/screenshots/management-salaries-full.png | finance.html GATE card `teacherSalaries` + disabled nav `salaries` | app/src/js/fixtures/finance.js line 97; app/src/js/nav.config.js line 87 | gated-backendRequired | — | No (030 shell, ZERO figures) | 030-admin-finance-invoices-salaries-banks | payroll math permanently out of scope |
| admin | /management/staff-salaries | output/roles/admin/pages/management-staff-salaries.md | finance.html GATE card `staffSalaries` + disabled nav | app/src/js/fixtures/finance.js line 98; app/src/js/nav.config.js line 88 | gated-backendRequired | — | No (030 shell) | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/salary-class-report | output/roles/admin/pages/management-salary-class-report.md | finance.html GATE card `classSalaryReport` + disabled nav | app/src/js/fixtures/finance.js line 99; app/src/js/nav.config.js line 90 | gated-backendRequired | — | No (030 shell) | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/payouts (+payouts/all) + /management/payout-providers (+edit ×2) | output/roles/admin/pages/management-payouts.md, management-payout-providers.md (+3) | finance.html GATE card `payoutsCompensations` + disabled nav `payments` | app/src/js/fixtures/finance.js line 100; app/src/js/nav.config.js line 89 | gated-backendRequired | — | No (030 shells; provider names only, keys never) | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/banks (+create) — bank accounts list | output/roles/admin/pages/management-banks.md, management-banks-create.md | finance.html GATE card `banks` + disabled nav `banks` | app/src/js/fixtures/finance.js line 102; app/src/js/nav.config.js line 91 | planned-future | — | Yes — REAL label list (no balances), CRUD gated | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/settings/payments (+create-payment-method ×7 +edit) — gateway methods | output/roles/admin/pages/management-settings-payments.md (+8) | — | specs/016-…/legacy-to-new-coverage-matrix.md line 58 | planned-future | — | Yes — methods preview; config gated | 030-admin-finance-invoices-salaries-banks | keys never shown/faked |
| admin | /management/analysis-invoices + /management/analysis-expenses — invoice/P&L analytics | output/roles/admin/pages/management-analysis-invoices.md, management-analysis-expenses.md | finance.html planned cards (invoicesEngine/accountingExpenses tones) | app/src/js/fixtures/finance.js lines 95, 101 | gated-backendRequired | — | No (030 shells, status language) | 030-admin-finance-invoices-salaries-banks | — |
| admin | /management/admins (+create/edit ×2/duplicate ×2/appear ×2/categories ×2) — staff directory + audit («appear») | output/combined/page-inventory.md lines 20–29 | — (planned nav `staff`) | app/src/js/nav.config.js line 99 | planned-future | — | Yes — directory + audit preview | 031-admin-management-content-certificates-settings | staff salary field NEVER rendered (016 row) |
| admin | /management/admins/permission/{id} — RBAC matrix (170 checkboxes / 16 permission groups incl. Dashboard, New Requests, Families, Students, Teachers, Reports, Invoices, Payment Methods, Locations, Material, Library, Banks, System Settings, Staff, Groups, Scheduled Actions) | output/roles/admin/screenshots/management-admins-permission-6-full.png | settings.html roles preview (display-only groups) is a foretaste; full matrix page pending | app/src/js/pages/settings.js (rolesSection) | planned-future | useful-but-needs-better-grounding | Yes — display-only matrix + save gate | 031-admin-management-content-certificates-settings | — |
| admin | /management/materials (+create/edit) — SUBJECTS catalog (legacy list shows «arabic / لغه عربيه») | output/roles/admin/screenshots/management-materials-full.png | — (planned nav `materials`) | app/src/js/nav.config.js line 100 | planned-future | — | Yes — catalog page | 031-admin-management-content-certificates-settings | legacy Subjects folded here (G20) |
| admin | /management/library — List of Books (Book/Category/Views/Downloads/Status; Add Material; Categories) | output/roles/admin/screenshots/management-library-full.png | — (planned nav `books`) | app/src/js/nav.config.js line 101 | planned-future | — | Yes — browse REAL; upload gated | 031-admin-management-content-certificates-settings | — |
| admin | /management/pdf (+create, 18-field designer) — certificate templates | output/roles/admin/screenshots/management-pdf-full.png | — (planned nav `certificates`) | app/src/js/nav.config.js line 102 | planned-future | — | Yes — template preview; designer gated | 031-admin-management-content-certificates-settings | — |
| admin | /management/certificate-requests — approval queue | output/roles/admin/pages/management-certificate-requests.md | — (planned nav `certificateRequests`) | app/src/js/nav.config.js line 103 | planned-future | — | Yes — queue preview; approve gated | 031-admin-management-content-certificates-settings | — |
| admin | /management/settings/general — 4-tab platform config (General/Teachers/Courses & Classes/Accessibility; company identity, location, TZ) | output/roles/admin/screenshots/management-settings-general-full.png | settings.html hub (profile/appearance/notif/account + roles) exists; general page pending | app/src/js/fixtures/settings.js; app/src/js/nav.config.js line 110 | planned-future | useful-but-needs-better-grounding | Yes — display + save gate | 031-admin-management-content-certificates-settings | appearance controls are ALREADY real sitewide |
| admin | /management/settings/integrations (+11 configure +2 WhatsApp insights) — catalog: Stripe/PayPal/Mollie/Xpay/Payoneer/Paymob/Custom payments, Paymob+Payoneer payouts, WhatsApp/Email comms | output/roles/admin/screenshots/management-settings-integrations-full.png | — (planned nav `settingsIntegrations`) | app/src/js/nav.config.js line 111 | planned-future | — | Yes — catalog; connect gated; keys never | 031-admin-management-content-certificates-settings | payout-provider configs stay figure-free |
| admin | /management/settings/customisation/personalisation — theming | output/roles/admin/pages/management-settings-customisation-personalisation.md | — (planned nav `settingsCustomization`); theme switcher already real | app/src/js/nav.config.js line 112 | planned-future | — | Yes — theming preview | 031-admin-management-content-certificates-settings | — |
| admin | /management/settings/customisation/message-builder (HTTP 504) | frontend-planning-deep/08-role-page-inventory-v2.md («HTTP 504») | — | specs/016-…/legacy-to-new-coverage-matrix.md line 67 | intentionally-excluded | — | No | future-backend | capability = builder gate inside 031 customisation |
| admin | /management/settings/notification — 47-toggle routing matrix | output/roles/admin/pages/management-settings-notification.md | — (planned nav `settingsNotifications`) | app/src/js/nav.config.js line 113 | planned-future | — | Yes — matrix display; toggles gated | 031-admin-management-content-certificates-settings | — |
| admin | /management/settings/security/{data,policy} (+backup-send) — import/backup/policy | output/roles/admin/pages/management-settings-security-data.md (+2) | — (planned nav `settingsSecurity`) | app/src/js/nav.config.js line 114 | gated-backendRequired | — | No (031 GATE shell) | 031-admin-management-content-certificates-settings | — |
| admin | «المستخدمون والموظفون» settings item (admins family duplicate entry) | specs/016-…/admin-sidebar-page-inventory.md line 92 | — (planned nav `settingsUsers`) | app/src/js/nav.config.js line 115 | merged | duplicate-or-merge-candidate | Yes — 031 decides the single staff home | 031-admin-management-content-certificates-settings | one staff surface, two nav spots |
| admin | /management/profile/{show,edit} — admin account | output/roles/admin/pages/management-profile-show.md, management-profile-edit.md | settings.html profile + account sections | app/src/js/fixtures/settings.js (ids `profile`, `account`); app/public/settings.html | implemented | legacy-grounded | No | done | 031 may deepen |
| admin | RBAC «Locations» permission group (Show/Add/Edit/Delete Locations) — no crawled locations page anywhere | output/roles/admin/screenshots/management-admins-permission-6-full.png (Show Locations block) | — (no row in the 57-row inventory either) | specs/016-…/admin-sidebar-page-inventory.md (absent) | unclear-needs-review | — | Yes — decide a destination (likely a settings/general slice) | 024-correction | the ONLY legacy admin capability with no owner row found in this audit |
| admin | /management/lang/{×9} + /login + logout + shortcuts POST — system routes | specs/016-…/legacy-to-new-coverage-matrix.md line 72 | ar/en page pairs + theme/lang toggles (static equivalents) | app/public/ (77 built files, .en pairs) | intentionally-excluded | — | No | future-backend | auth = backend; language = static pairs by design |

## (b) Admin areas overbuilt / underbuilt / renamed / split-differently vs legacy

**Overbuilt (better than legacy — net-new value, keep):**
- `attendance.html` — legacy had NO attendance page at all (only modals inside courseclasses); the
  rebuilt outcome board + tiles-as-filters + canonical drawer is net-new
  (app/src/js/pages/attendance.js; G14 register row adds the per-student roster lens in 026).
- `gallery.html` — design-system component preview with no legacy counterpart
  (app/src/js/pages/gallery.js). Classification: useful-net-new, dev-facing, not in the nav rail.
- `reports.html` — legacy "REPORT" sidebar group was forms + money analytics; the rebuilt
  finance-free ops report hub (5 detail sections) is broader than any single legacy page.
- Entity profile pages (`family/student/teacher/course/group.html`) are richer tabbed hubs than
  the legacy modal-stacked details (13–20 modals → tabs + drawers).

**Underbuilt (legacy has it, current is nav-planned only — all scheduled, none silently missing):**
- The whole CONTROL ops family: leads funnel, chat, tasks, announcements, time converter,
  holidays, scheduled actions, sessions-analysis, schedule-request inboxes, total-queues
  (10 items → 026; nav.config.js lines 27–34 all `planned`).
- Family categories + schedule search + the two thin student pages (027).
- Add-teacher, teacher categories, sessions KPI, monthly performance, teachers-details (028).
- Monthly reports, data analysis, the three feedback families, forms builder (029).
- Dedicated invoice pages, monthly invoices, payment methods, banks, plus ALL pay GATE shells (030).
- Staff+RBAC, materials, library, certificates ×2, six settings sub-pages (031).
- `settings.html` is a built-but-thin hub (fixtures/settings.js: 4 sections + roles preview) vs
  the legacy 6-area settings tree — deepening owned by 031 (G17).

**Renamed / reclassified:**
- Legacy «Materials» = a SUBJECTS catalog (screenshot shows course-subject rows), while the legacy
  «Library» is the books/files catalog — the rebuilt nav keeps both ids (`materials`, `books`) and
  folds legacy Subjects into materials (G20).
- Legacy «Teachers Schedule» sidebar item = /management/all/teachers/timetable → rebuilt as the
  schedule.html teacher lens (renamed into the schedule family, grid not cloned).
- Legacy «monthly reports» sidebar item lands on the /management/forms family → split across 029
  (monthlyReports + forms builder preview).
- The families payment-method filter moved to the finance surface (status-first).

**Split differently:**
- Legacy home carried queue/monitor header tools (WhatsApp monitor, total queues) — rebuilt splits
  them into 026 ops bands instead of the dashboard.
- Legacy `courseclasses/{id}` was one giant lifecycle page (9 modals + recording + timeline) —
  rebuilt splits it into sessions list/agenda + shared appointment/outcome drawers + attendance.
- Legacy invoices/downlaod/monthly-invoices/create-parent are four route families — rebuilt
  consolidates on finance.html now, with dedicated honest pages in 030.
- Legacy admins family carries staff + RBAC + audit + categories + duplication in five routes —
  031 plans ONE staff surface + a display-only permission matrix (settingsUsers merge decision).

## (c) Admin groups remaining for Specs 026–031 (57-row re-verification)

Re-verified `specs/016-…/admin-sidebar-page-inventory.md` (57 rows) against TODAY's
`app/src/js/nav.config.js` — the mapping still holds exactly, with only the DEC-009 renumbering
applied (old 021→026 · 022→027 · 023→028 · 024→029 · 025→030 · 026→031, per
future-spec-sequence.md lines 82–88):

| New spec | Items (nav ids re-verified in nav.config.js) | Count |
|---|---|---|
| 026-admin-control-sessions-ops | sessionsAnalysis, messages, leads, tasks, announcements, timeConverter, publicHoliday, scheduledActions (8 planned, lines 27–34) + total-queues fold + schedule-requests inbox fold | 10 |
| 027-admin-families-students-courses-groups | familyCategories (44), scheduleSearch (46), studentResult (47), studentEvaluation (48) | 4 |
| 028-admin-teachers-performance | addTeacher (55), teacherCategories (56), sessionsKpi (63), monthlyPerf (64) + teachers-details fold | 5 |
| 029-admin-reports-analytics-feedback-forms | monthlyReports (73), dataAnalysis (74) + feedback/forms folds (class/teacher/family feedback, forms, forms/students) | 3 (+folds) |
| 030-admin-finance-invoices-salaries-banks | 7 disabled: invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks (85–91) + expense/heads + invoice/P&L analytics GATE shells | 9 |
| 031-admin-management-content-certificates-settings | staff, materials, books, certificates, certificateRequests (99–103) + settingsGeneral/Integrations/Customization/Notifications/Security/Users (110–115) + settings-hub deepening (G17) | 12 |

Totals re-check: 13 already-built + 1 built-needs-redesign (settings hub) + 1 already-covered
(all-teachers timetable lens) + 43 future-owned (10+4+5+3+9+12) = 57 — matches the 016 inventory
line 96 EXACTLY. No nav item has flipped, been added, or been dropped since (nav.config.js's
build-time guard also still enforces no dead links, lines 148–154).

One addition found beyond the 57 rows: the legacy RBAC **Locations** permission group (see the
unclear-needs-review row) — recommend 024 assign it an owner (031 settings/general slice is the
natural home).

## (d) Pay/finance surfaces in legacy admin and the zero-pay law

Legacy admin is saturated with money surfaces — all verified visually:
- `management-accounting-full.png`: a 10-tile AED money wall (Total/UnPaid/Paid/Teachers Salaries/
  Staff Salaries/Expenses In/Out/Total Income/Total Expenses/Net Income) + FIVE line charts
  (Net Income, invoices, Teachers Salaries, Staff Salaries, Expenses).
- `management-salaries-full.png`: teacher payroll ledger — Fixed/plus/minus/Fine/Gift/Hour Rate/
  Total(EUR) columns, «Generate Salary» and «Request payouts (0)» actions.
- `management-invoices-full.png`: invoice table with Total Price + Total(AED) columns.
- `management-teachers-1-compensations-1-full.png`: a Fine of «1,000.00» with month + timeline.
- `management-settings-integrations-full.png`: payment gateways (incoming) + payout providers
  (outgoing, «Disburse instructor salaries via Paymob…»).
- Legacy home even leaks pay onto the ops table («(3.00 Fine)» in management-home-full.png) and the
  all-teachers timetable colors sessions by «Active & unpaid».

How the rebuilt surface constrains them (all verified in current files):
- `finance.html` is STATUS-FIRST: 4 invoice-status tiles + row-count roll-ups + payments list, and
  NINE figure-free planned/GATE cards (fixtures/finance.js PLANNED_FINANCE lines 93–103:
  monthlyInvoices planned; invoicesEngine, paymentsCollection, teacherSalaries, staffSalaries,
  classSalaryReport, payoutsCompensations, accountingExpenses, banks = backendRequired). The built
  page renders them with «قريبًا» ×29 and salary-card labels with zero figures (grep of
  app/public/finance.html).
- The 7 finance nav items are disabled-with-reason (`nav.reason.finance`, nav.config.js 85–91) —
  honest non-links until 030 builds the shells.
- NO salary/payroll/compensation figure exists anywhere in the rebuilt admin; teacher.html
  explicitly never renders the legacy comp/salary tabs (module header, app/src/js/pages/teacher.js).
- Charts are excluded everywhere (no chart engine); legacy accounting/analysis chart walls become
  STAT cards with authored literals (029/030 treatments per the 016 matrix).
- Nuance to keep explicit: `app/public/finance.html` DOES carry 24 authored «ريال» invoice-amount
  literals (Spec 009 invariant — authored demo literals on the admin invoice rows/payments, with NO
  aggregate and NO runtime math). This is sanctioned: the zero-pay law targets salary/payroll/
  compensation/payout figures and family/teacher surfaces; family billing is amount-free and the
  teacher family is token-level pay-free. 030 must preserve exactly this line: invoice amounts may
  stay authored-literal on admin finance pages; salary-class figures may NEVER appear.

## Risks, gaps, and proposed corrections

1. **Locations capability has no owner** (unclear-needs-review row). Evidence: the legacy RBAC
   matrix (output/roles/admin/screenshots/management-admins-permission-6-full.png) has a
   «Show/Add/Edit/Delete Locations» group, but no locations page was crawled and no row exists in
   the 57-row inventory. Proposed: 024 records a decision — most naturally a display slice inside
   031's settings/general (the legacy general settings already carries Country/City/Timezone/Address,
   management-settings-general-full.png).
2. **FUTURE_ROUTES map is incomplete** (app/src/js/nav.config.js lines 139–145): only 14 of the 29
   planned nav ids have intended routes. Missing: timeConverter, publicHoliday, scheduledActions,
   familyCategories, scheduleSearch, addTeacher, sessionsKpi, monthlyPerf, certificateRequests, and
   all six settings* ids. Cosmetic (the map is documentation-only), but 026–031 will each need to
   extend it; 024 could pre-fill it in one pass to prevent per-spec drift.
3. **Variant-folding must be codified for 032**: 300 captured admin pages collapse to ~90 template
   groups (e.g. 60 teachers sort/scope pages = ONE roster row). If the final no-missing script
   counts captured pages instead of templates, it will false-alarm. The 016 matrix already counts
   templates (145) — 032 should assert against templates, citing
   frontend-planning-deep/08-role-page-inventory-v2.md.
4. **Broken-legacy register must survive to 032**: five admin routes are broken in LEGACY
   (export-course 500, families/feedback/family/{id} 500, new-requests/scheduled-trials/index 500s,
   teachers/{id}/monthly-classes 500, settings/customisation/message-builder 504 — flags in
   frontend-planning-deep/08-role-page-inventory-v2.md). All are intentionally-excluded with their
   capabilities re-homed; keep them named so the final audit doesn't count them as gaps.
5. **The «Active & unpaid» schedule tint + home «Fine» fragment** are pay-signal leaks in legacy
   UI patterns (management-all-teachers-timetable-full.png, management-home-full.png). The rebuilt
   equivalents correctly drop them; 026/028 authors must not re-import them when building the ops
   bands and teacher performance pages.
6. **Zero-pay wording risk** (see §d): the blanket phrase "zero pay figures anywhere" coexists with
   24 authored invoice-amount literals on admin finance (Spec 009-invariant). Not a violation —
   invoice amounts ≠ pay figures — but 024 should restate the boundary in one sentence inside the
   030 spec contract so a future pass doesn't "fix" finance.html into breaking the Spec 009 body
   invariant (or, conversely, copy amounts onto family/teacher surfaces).
7. **No admin gap requires deletion or rework of shipped pages.** All 14 implemented admin routes
   (nav.config.js implemented items + the 5 profile pages + gallery) are legacy-grounded or
   sanctioned net-new; every remaining legacy capability is owned by exactly one of 026–031 or an
   explicit exclusion. The single 024-correction item from this audit is Risk 1 (+ optionally 2/6 as
   recorded clarifications).

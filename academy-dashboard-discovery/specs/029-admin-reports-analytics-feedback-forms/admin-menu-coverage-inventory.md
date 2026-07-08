# Spec 029 — Admin Menu Coverage Inventory (MANDATORY GATE)

Every admin nav item from `app/src/js/nav.config.js` (all six categories + sub-sections), classified. **No
item may be unclassified.** This is the "Admin Menu Coverage Gate": after 029 no admin page is forgotten and
no menu item is a dead placeholder.

Status legend: **implemented** (real static page) · **planned** («قريبًا» button, no route) · **disabled**
(visible + disabled-with-reason) · **folded** (capability delivered via a modal/drawer on an existing page;
nav item intentionally stays planned).
Owner legend: **— (done)** · **029** · **030** finance · **031** mgmt/content/certs/settings/materials ·
**032** final QA · **future-backend** · **excluded**.

## Category: control (`cat.control`)

| Item id | labelKey | Status | Route / page file | Legacy evidence | Action state | Owner | Needs page? | Needs modal/drawer? | Needs deepening? | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|
| home | nav.home | implemented | dashboard.html | dashboard | live | — | no | no | 029: report widgets honesty | smoke: loads AR/EN; report links real |
| sessions | nav.sessions | implemented | sessions.html | sessions | live | — | no | no | no | smoke green (026/027) |
| schedule | nav.schedule | implemented | schedule.html | schedule + folded teacher-lens | live | — | no | no | no | smoke green (028 fold) |
| attendance | nav.attendance | implemented | attendance.html | attendance | live | — | no | no | 029: "Add feedback" outcome action honesty | smoke: feedback action = honest gate |
| sessionsAnalysis | nav.sessionsAnalysis | implemented | sessions-analysis.html | `sessions_analysis` | live | **029** | no | no | **yes**: export gate honesty (native-disabled → review) | smoke: export = honest gate, no fake file |
| messages | nav.messages | planned | — | (messaging) | gate | future-backend | future | no | no | smoke: honest «قريبًا» button, no route |
| leads | nav.leads | planned | — | `new-requests` | gate | future-backend | future | no | no | smoke: planned gate |
| tasks | nav.tasks | planned | — | admin tasks | gate | future-backend | future | no | no | smoke: planned gate |
| announcements | nav.announcements | planned | — | announcements | gate | future-backend | future | no | no | smoke: planned gate |
| timeConverter | nav.timeConverter | planned | — | utility | gate | future-backend | future | no | no | smoke: planned gate |
| publicHoliday | nav.publicHoliday | implemented | public-holiday.html | (Spec 026) | live | — | no | no | no | smoke green |
| scheduledActions | nav.scheduledActions | implemented | scheduled-actions.html | (Spec 026) | live | — | no | no | no | smoke green |

## Category: families (`cat.families`)

| Item id | labelKey | Status | Route / page file | Legacy evidence | Action state | Owner | Needs page? | Needs modal/drawer? | Needs deepening? | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|
| families | nav.families | implemented | families.html | families | live | — | no | no | no | smoke green (027) |
| addFamily | nav.addFamily | implemented | add-family.html | add family | live | — | no | no | no | smoke green |
| students | nav.students | implemented | students.html | students | live | — | no | no | no | smoke green (027) |
| courses | nav.courses | implemented | courses.html | courses | live | — | no | no | 029: course export gate | smoke: export honest |
| familyCategories | nav.familyCategories | folded | — (`fam-cat` drawer on family.html) | `family/feedback-categories` analogue | folded | — (folded) | no | no (exists) | no | smoke: nav planned; reclassify drawer works |
| groups | nav.groups | implemented | groups.html | groups | live | — | no | no | 029: group export gate | smoke: export honest |
| scheduleSearch | nav.scheduleSearch | planned | — | availability search | gate | future-backend | future | no | no | smoke: planned gate (needs engine) |
| studentResult | nav.studentResult | planned | — (`student-results.html` reserved) | `update-result`/results | gate | **029** | **candidate** | or fold into reports | yes | smoke: gate honest until 029 decides page/fold |
| studentEvaluation | nav.studentEvaluation | planned | — (`student-evaluation.html` reserved) | `forms/students` progress | gate | **029** | **candidate** | or fold into reports/feedback | yes | smoke: gate honest; NO computed % |

## Category: teachers (`cat.teachers` + `cat.teachersPerf` section)

| Item id | labelKey | Status | Route / page file | Legacy evidence | Action state | Owner | Needs page? | Needs modal/drawer? | Needs deepening? | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|
| teachers | nav.teachers | implemented | teachers.html | teachers | live | — | no | no | no | smoke green (028) |
| addTeacher | nav.addTeacher | folded | — (modal on teachers.html) | add teacher | folded | — (folded) | no | no (exists) | no | smoke: nav planned; add modal honest |
| teacherCategories | nav.teacherCategories | folded | — (`trn-categories` drawer, Spec 028) | teacher categories | folded | — (folded) | no | no (exists) | no | smoke: nav planned; drawer works |
| teacherKpi | nav.teacherKpi | implemented | teacher-performance.html | teacher-performance | live | **029** | no | no | **yes**: export/print gate; STAY display-only | smoke: no score/rank/chart/pay; export honest |
| sessionsKpi | nav.sessionsKpi | planned | — | sessions KPI | gate | **029** | candidate/fold | or fold into reports/analytics | yes | smoke: gate honest; NO chart |
| monthlyPerf | nav.monthlyPerf | planned | — | monthly performance | gate | **029** | candidate/fold | or fold into reports | yes | smoke: gate honest; NO chart/score |

## Category: reports (`cat.reports` + `cat.finance` section)

| Item id | labelKey | Status | Route / page file | Legacy evidence | Action state | Owner | Needs page? | Needs modal/drawer? | Needs deepening? | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|
| reports | nav.reports | implemented | reports.html | reports | live | **029** | no | maybe (detail drawers) | **yes**: export/print honesty | smoke: filters real; export honest; no fake file |
| monthlyReports | nav.monthlyReports | planned | — (`monthly-reports.html` reserved) | monthly reports | gate | **029** | candidate/fold | or fold into reports | yes | smoke: gate honest |
| dataAnalysis | nav.dataAnalysis | planned | — (`analytics.html` reserved) | `analysis-course/student` | gate | **029** | candidate/fold | or fold into reports | yes | smoke: gate honest; **NO chart engine, NO computed %** |
| finance | nav.finance | implemented | finance.html | finance | live | **030** | no | no | no (Spec-009 invariant) | smoke: finance body byte-identical |
| invoices | nav.invoices | disabled | — (reason nav.reason.finance) | invoices | disabled-reason | **030** | future | no | no | smoke: disabled+reason |
| monthlyInvoices | nav.monthlyInvoices | disabled | — | monthly invoices | disabled-reason | **030** | future | no | no | smoke: disabled+reason |
| salaries | nav.salaries | disabled | — | salaries | disabled-reason | **030** | future | no | no | smoke: disabled+reason; pay-free |
| staffSalaries | nav.staffSalaries | disabled | — | staff salaries | disabled-reason | **030** | future | no | no | smoke: disabled+reason; pay-free |
| payments | nav.payments | disabled | — | payments | disabled-reason | **030** | future | no | no | smoke: disabled+reason |
| classSalaryReport | nav.classSalaryReport | disabled | — | `salary-class-report` | disabled-reason | **030** | future | no | no | smoke: disabled+reason; pay-free |
| banks | nav.banks | disabled | — | banks | disabled-reason | **030** | future | no | no | smoke: disabled+reason |

## Category: admin (`cat.admin`)

| Item id | labelKey | Status | Route / page file | Legacy evidence | Action state | Owner | Needs page? | Needs modal/drawer? | Needs deepening? | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|
| staff | nav.staff | planned | — (`staff.html` reserved) | staff | gate | **031** | future | no | no | smoke: planned gate |
| materials | nav.materials | planned | — (`materials.html` reserved) | materials | gate | **031** | future | no | no | smoke: planned gate |
| books | nav.books | planned | — (`library.html` reserved) | books/library | gate | **031** | future | no | no | smoke: planned gate |
| certificates | nav.certificates | planned | — (`certificates.html` reserved) | `pdf` cert designer | gate | **031** | future | no | no | smoke: planned gate |
| certificateRequests | nav.certificateRequests | planned | — | cert requests | gate | **031** | future | no | no | smoke: planned gate |

## Category: settings (`cat.settings`)

| Item id | labelKey | Status | Route / page file | Legacy evidence | Action state | Owner | Needs page? | Needs modal/drawer? | Needs deepening? | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|
| settings | nav.settings | implemented | settings.html | settings | live | — | no | no | no | smoke green |
| settingsGeneral | nav.settingsGeneral | planned | — | settings/general | gate | **031** | future | no | no | smoke: planned gate |
| settingsIntegrations | nav.settingsIntegrations | planned | — | settings/integrations (WhatsApp) | gate | **031** | future | no | no | smoke: planned gate |
| settingsCustomization | nav.settingsCustomization | planned | — | settings/customization | gate | **031** | future | no | no | smoke: planned gate |
| settingsNotifications | nav.settingsNotifications | planned | — | settings/notifications | gate | **031** | future | no | no | smoke: planned gate |
| settingsSecurity | nav.settingsSecurity | planned | — | settings/security (backup) | gate | **031**/future-backend | future | no | no | smoke: planned gate |
| settingsUsers | nav.settingsUsers | planned | — | settings/users | gate | **031** | future | no | no | smoke: planned gate |

## Coverage summary

- **Total nav items**: 43 (12 control + 9 families + 6 teachers + 11 reports/finance + 5 admin + 7 settings — sub-sections included). **0 unclassified.**
- **Implemented (live pages)**: 18 — home, sessions, schedule, attendance, sessionsAnalysis, publicHoliday, scheduledActions, families, addFamily, students, courses, groups, teachers, teacherKpi, reports, finance, settings.
- **Folded (delivered via modal/drawer, nav stays planned)**: 3 — familyCategories, addTeacher, teacherCategories.
- **029-owned (deepen or planned→candidate)**: sessionsAnalysis (deepen), studentResult, studentEvaluation, teacherKpi (deepen), sessionsKpi, monthlyPerf, reports (deepen), monthlyReports, dataAnalysis. Deepen = export/feedback/honesty; planned candidates = fold-preferred, page only if planning justifies.
- **030-owned (finance)**: finance (deepen), invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks.
- **031-owned (mgmt/content/settings)**: staff, materials, books, certificates, certificateRequests, settingsGeneral, settingsIntegrations, settingsCustomization, settingsNotifications, settingsSecurity, settingsUsers.
- **future-backend**: messages, leads, tasks, announcements, timeConverter, scheduleSearch (need engines).
- **Build guard**: `nav.config.js:148-154` enforces implemented⇒route, non-implemented⇒no-route, disabled⇒reasonKey. 029 must keep this green.

**Stale-map note (record, not a 029 build item)**: `FUTURE_ROUTES.sessionsAnalysis` (`nav.config.js:140`) still
lists an already-implemented item — a harmless unused map entry; flag for a future cleanup (032), not a 029
change unless planning folds it in.

# Spec 029 — Missing / Dead / Misleading Action Register

Every missing, dead, misleading, or out-of-scope action/page for the reporting/analytics/feedback/forms/
admin-menu scope. **No row may remain unresolved.** Fix-now = 029; else assigned to a future owner with an
honest gate. IDs use R- prefix (Reports/029).

| ID | Page/Menu | Action/Page | Problem | Evidence | Resolution | Fix now? | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|---|
| R-A | admin feedback | Teacher/Class/Family/Student feedback review board | Capability absent; no admin feedback surface exists | `legacy…coverage.md#5-7,10`; audit "no admin feedback surface" | Add honest display-only feedback review (rows + read-only detail drawer + status chips); categorical remarks only | **Yes** | 029 | smoke: rows authored; drawer read-only; NO computed % |
| R-B | admin feedback | Feedback category Create/Edit/Assign | Absent; legacy had CRUD `family/feedback-categories` | `table-inventory.md:586-589`; `form-inventory.md:7550-7607` | Create/Edit category = honest modal gate; assign-members = display-only picker (mirror `trn-categories`/`fam-cat`); nav item stays planned/folded | **Yes** | 029 | smoke: modal honest, no persist; nav planned |
| R-C | admin forms | Forms/surveys list + Create form | Absent; legacy form/survey builder | `page-inventory.md:113-114`; `form-inventory.md:7627-7642` | Display-only list (title/questions/responses/status as literals); Create = backendRequired modal | **Yes** (or fold) | 029 | smoke: counts authored; create gate honest |
| R-D | admin forms | Per-student progress form Save/Submit | Legacy `forms/students` monthly categorical form; app has partial Evaluation tab | `form-inventory.md:7688-7725`; `evaluation-rubric.js` | Categorical radios display-only; Save/Submit = backendRequired gate | **Yes** | 029 | smoke: no fake submit; NO numeric score |
| R-E | attendance/sessions | "Add feedback" outcome action | `data-demo-action` toast on a write that implies feedback capture | `outcome-details.js:59-60` | Reclassify to backendRequired modal/gate (honest, no persist) | **Yes** | 029 | smoke: no fake feedback submit |
| R-F | student.html | eval.approve | `data-demo-action` toast on an approve *write* | `evaluation-rubric.js:60` | Reclassify to backendRequired confirm/gate | **Yes** | 029 | smoke: no fake approve/persist |
| R-G | reports.html | rep.act.print | Print fires a toast (honest wording) but implies a real print | `report-actions.js:29-35` | Reclassify to disabled-with-reason export gate for cross-surface consistency | **Yes** (consistency) | 029 | smoke: no fake print; honest gate |
| R-H | sessions-analysis.html | sa.act.export | Native disabled+title (reason only on hover) — less discoverable than the clickable idiom | `sessions-analysis.js:19-22` | Review: upgrade to clickable `data-disabled-reason` (honest gate) OR keep (not dead) | **Yes** (review) | 029 | smoke: honest gate, not silent no-op |
| R-I | course/group/student/teacher | print/export gates (native disabled) | Consistency: several export/print use native-disabled vs clickable | `course-group-actions.js:22-49`; `result-summary.js:65`; `teacher-actions.js:46` | Standardize on the honest gate idiom where practical; keep all backendRequired | Yes (consistency) | 029 | smoke: every export/print honest, no file |
| R-J | reports/analytics | Analytics summary (course/student stats) | Legacy used Chart.js/ApexCharts/amCharts + computed values; absent in app | `analysis-course/student` raw HTML | If surfaced: authored counts/rows only, NO chart, NO computed %; else honest planned gate (`dataAnalysis`) | planning | 029 | smoke: no `<canvas>`/chart; no % |
| R-K | reports/analytics | `monthlyReports`, `monthlyPerf`, `sessionsKpi` nav | Planned nav items with no page | `nav.config.js:73,64,63` | 029 candidate: fold into reports OR planned gate; page only if planning justifies | planning | 029 | smoke: planned gate honest |
| R-L | families/students | `studentResult`, `studentEvaluation` nav | Planned standalone boards; single-student views exist | `nav.config.js:47-48` | 029 candidate: fold into reports/feedback OR planned gate; NO computed % | planning | 029 | smoke: gate honest; NO % |
| R-M | teacher-performance | export/print of the board | 028 routed export/print here (T-L/T-print) | `028…future-owner-register.md:16-17` | Honest export gate; board STAYS figure-free/display-only | **Yes** | 029 | smoke: no fake file; no score/chart/pay |
| R-N | reports/feedback | Feedback computed **Percentage** column | Legacy computed per-teacher/category % + completion-rate KPIs | `table-inventory.md:106-109,1271-1279`; `02-…:1511-1571` | FORBIDDEN to reproduce as computed; show categorical remark/status or omit; any % must be authored literal | **Yes** (guardrail) | 029 | smoke: no computed %/score/rank on 029 bodies |
| R-O | export/course | `export-course` | Legacy page 500; no UI | `02-…:1148-1153` | Honest export gate only; no invented fields | **Yes** | 029 | smoke: honest gate |
| R-P | analysis-expenses/invoices | Finance analytics | Money/payroll/profit — out of 029 | `table-inventory.md:81-89` | → 030; do NOT build; keep finance invariant | No | **030** | finance body byte-identical; no pay figure in 029 |
| R-Q | salary-class-report / downlaod / invoicesexportdata | Finance reports/exports | Salary/invoice money | `page-inventory.md:182`; `02-…:1808-1819`; `route-graph.md:424` | → 030 (teacher-side excluded forever) | No | **030**/excluded | pay-free smoke green |
| R-R | admin ▸ certificates (pdf designer) | Certificate PDF designer | Content/cert domain, not reporting | `page-inventory.md:173-174` | → 031 | No | **031** | nav planned gate |
| R-S | control ▸ leads/messages/tasks/announcements/timeConverter | Planned control items | Need real engines | `nav.config.js:28-32` | → future-backend; keep planned gates | No | future-backend | nav planned gate honest |
| R-T | families ▸ scheduleSearch | Availability search | Needs a search engine | `nav.config.js:46` | → future-backend; planned gate | No | future-backend | nav planned gate |
| R-U | settings ▸ backup/whatsapp/integrations | Settings surfaces | Settings/integration domain | `page-inventory.md:205-206,217` | → 031 | No | **031** | nav planned gate |
| R-V | nav.config.js:140 | stale `FUTURE_ROUTES.sessionsAnalysis` | Unused map entry for an already-implemented item | `nav.config.js:140` | Record only; optional cleanup | No | **032** | not a 029 build item |

## Resolution summary

- **Fixed in 029** (build): R-A feedback review · R-B feedback categories · R-C forms list · R-D progress
  form gates · R-E add-feedback honesty · R-F eval.approve honesty · R-G print honesty · R-M teacher-perf
  export gate · R-N computed-% guardrail · R-O export-course gate. Plus consistency pass R-H/R-I.
- **029 planning decides** (fold vs page): R-J analytics summary · R-K monthly/sessionsKpi/monthlyPerf ·
  R-L studentResult/studentEvaluation.
- **Routed out**: R-P/R-Q → **030** (finance); R-R/R-U → **031** (certs/settings); R-S/R-T → **future-backend**;
  R-V → **032** (record only).

**Every row resolved.** No dead-button, no href-hash, no fake-submit/export/chart/percentage survives.

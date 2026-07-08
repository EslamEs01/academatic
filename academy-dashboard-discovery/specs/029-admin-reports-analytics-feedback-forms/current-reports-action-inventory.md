# Spec 029 — Current Reports / Feedback / Analytics / Export Action Inventory

Every current action on the report-like / feedback-like / analytics / export / print surfaces, classified.
Classification vocabulary: real-page-link · real-static-tab · real-static-filter · real-modal · real-drawer ·
backendRequired-gate · planned-future-gate · display-only-not-action · folded-into-existing-page ·
remove-or-reword · missing-needs-029-fix · missing-owner-future-spec · intentionally-excluded.
**Forbidden (must never appear)**: dead-button, href-hash, fake-submit/save/export/download/pdf/excel/csv/
print/chart/analytics/percentage/score/rank/feedback-submit/report-generation.

| Page/component | Action text/labelKey | Element type | Hook | Current behavior | Expected (029) | Classification | Fix in 029? | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|
| reports.js | rep.act.print | button | `data-demo-action data-toast` | honest toast "available once server connected" | reclassify to disabled-with-reason export gate for consistency | remove-or-reword | Yes (consistency) | 029 | smoke: no fake print; honest gate |
| report-actions.js:37 | rep.act.exportCsv | button (disabled) | `data-disabled-reason data-reason-key=rep.reason.export` | clickable disabled, shows reason | keep | backendRequired-gate | No | 029 | smoke: reason shown, no file |
| report-actions.js:38 | rep.act.exportPdf | button (disabled) | `data-disabled-reason` | clickable disabled | keep | backendRequired-gate | No | 029 | smoke: no file |
| report-actions.js:39 | rep.act.share | button (disabled) | `data-disabled-reason rep.reason.share` | clickable disabled | keep | backendRequired-gate | No | 029 | smoke: reason shown |
| report-actions.js:41-50 | rep.act.schedule | button→confirm | `confirmAction` | confirm → honest toast | keep (honest) or reword to backendRequired | backendRequired-gate | maybe | 029 | smoke: no fake job |
| reports.js:110-134 | rep.filter.area/availability/search | filter/select | `data-filter` via filterBar | facets report cards client-side | keep | real-static-filter | No | 029 | smoke: facet works |
| report-card.js:14-43 | category cards (attendance/sessions/coursesGroups/teachers/studentsFamilies) | link | `href` (real when available) | deep-links out | keep | real-page-link | No | 029 | smoke: real hrefs |
| reports.js:42-239 | detail "more" links (viewAttendance/…/familyProfile) | link | `href` | real deep-links | keep | real-page-link | No | 029 | smoke: real hrefs |
| teacher-performance.js:74-81 | trn.ov.subjects/fWorkload/fSignal | filter/select | `data-filter` | facets perf-list | keep | real-static-filter | No | 029 | smoke: facet works |
| teacher-performance.js:42,55 | trn.viewProfile | link | `href="teacher.html"` | deep-link | keep | real-page-link | No | 029 | smoke: real href |
| teacher-performance.js:64-72 | KPI tiles | display | summaryCards | raw counts, no chart | keep display-only | display-only-not-action | No | 029 | smoke: no score/rank/chart |
| (teacher.html) teacher-actions.js:46 | trn.act.print | button (disabled) | native `disabled`+`title` trn.reason.export | non-clickable gate | keep or upgrade to clickable disabled-reason | backendRequired-gate | maybe | 029 | smoke: honest gate |
| sessions-analysis.js:19-22 | sa.act.export | button (disabled) | native `disabled`+`title` | non-clickable, reason via title only | review: upgrade to clickable `data-disabled-reason` for consistency | remove-or-reword | Yes (consistency) | 029 | smoke: honest gate, not silent |
| sessions-analysis.js:39-61 | outcome stat cards | display | none | authored counts | keep | display-only-not-action | No | 029 | smoke: no chart |
| dashboard.js:94,111-113 | overviewLink/reportsLink + report cards | link | `href` reportCard | links to reports.html | keep | real-page-link | No | 029 | smoke: real hrefs |
| dashboard.js:52,79-83 | attention/followUp chips | link | `href` | deep-links | keep | real-page-link | No | 029 | smoke: real hrefs |
| result-summary.js:65 | res.export | button (disabled) | native `disabled`+`title` res.exportReason | gate | keep/upgrade | backendRequired-gate | maybe | 029 | smoke: honest gate |
| result-summary.js:66 | res.print | button | `data-demo-action data-toast` | honest toast | reclassify to gate (consistency) | remove-or-reword | maybe | 029 | smoke: no fake print |
| result-summary.js:23 | certRow "View" | button | `data-demo-action data-toast` | honest toast | keep or gate | display-only-not-action | maybe | 029 | smoke: no fake file |
| evaluation-rubric.js:60 | eval.approve | button | `data-demo-action data-toast` | honest toast | reclassify to backendRequired confirm/gate (it's a write) | remove-or-reword | Yes | 029 | smoke: no fake approve/persist |
| student.js:82-83,203-220 | sp.tab.results/evaluation | tab | `data-tab` | switches panel | keep | real-static-tab | No | 029 | smoke: tab works; NO gradebook/score |
| course.js:135,145 | crs.tab.outcomes | tab | `data-tab` + cohortOutcomesPanel | display-only outcome log | keep | real-static-tab | No | 029 | smoke: tab works |
| course-group-actions.js:22-30 | crs.act.print | button (disabled) | native `disabled`+`title` | gate | keep/upgrade | backendRequired-gate | maybe | 029 | smoke: honest gate |
| group.js:136,145 | grp.tab.sessions | tab | `data-tab` | display-only outcome log | keep | real-static-tab | No | 029 | smoke: tab works |
| course-group-actions.js:37-49 | grp.act.print | button (disabled) | native `disabled`+`title` | gate | keep/upgrade | backendRequired-gate | maybe | 029 | smoke: honest gate |
| attendance.js:35-48 | outcome-tile filters | filter | `data-filter-set` | facet attendance list | keep | real-static-filter | No | 029 | smoke: facet works |
| outcome-details.js:59-60 | att.act.feedback ("Add feedback") | button | `data-demo-action data-toast` | honest toast | reclassify to backendRequired modal/gate (it's a feedback write) | missing-needs-029-fix | Yes | 029 | smoke: no fake feedback submit |
| outcome-details.js:42 | att.feedback text row | display | none | read-only fixture text | keep | display-only-not-action | No | 029 | smoke: read-only |
| **(missing)** teacher/class/family feedback review board | — | — | — | **does not exist** | add honest display-only feedback review + read-only drawer + gates | missing-needs-029-fix | Yes | 029 | smoke: rows authored, drawer read-only, NO % |
| **(missing)** feedback categories create/edit | — | — | — | **does not exist** | add create/edit modal gate + assign display-only (mirror trn-categories) | missing-needs-029-fix | Yes | 029 | smoke: modal honest, no persist |
| **(missing)** forms/surveys list | — | — | — | **does not exist** | add display-only list + backendRequired create/submit | missing-needs-029-fix | Yes | 029 | smoke: counts authored, gates honest |
| **(missing)** analytics summary (course/student) | — | — | — | **does not exist** | if surfaced: authored counts/rows, NO chart, NO computed % | missing-needs-029-fix | planning | 029 | smoke: no chart/canvas, no % |

## Key facts (from source audit)

1. **reports.html DOES have export/print** — Print = `data-demo-action` toast; Export CSV/PDF + Share =
   `data-disabled-reason` gates; Schedule = confirm→toast. Nothing generates a file (`report-actions.js`).
2. **No chart/canvas anywhere** — repo-wide grep clean; only hand-rolled `sparkline.js` (inline SVG, "NO
   chart library") used for progress bars — MUST NOT be repurposed as an analytics/feedback metric.
3. **No admin feedback surface exists** — only the outcome-drawer "Add feedback" demo-action + read-only
   fixture feedback text + the student Evaluation tab. This is the real 029 gap.
4. **Two disabled-gate idioms exist** — native `disabled+title` (sessions-analysis, teacher/course/group
   print, result export) vs clickable `data-disabled-reason` (reports export/share). 029 should standardize
   on the clickable idiom for export/print where practical (honesty consistency), but native-disabled is not
   a dead button — it is not forbidden, only less discoverable.
5. **Reusable display primitives (zero new hooks)**: `filterBar`, `data-table`/`table`, `card-grid`,
   `report-card`, `directory-card`, `previewTemplate`/`sheetRow` (drawers), `tabs`/`data-tab`,
   `confirm-modal`/`data-confirm`, `data-modal-trigger`, `states` (noResults/emptyBox), `data-row-menu`(+kind),
   status-chip vocabularies. A 029 feedback/report/forms surface composes entirely from these.

**No row remains unresolved.** Every existing action is real/honest today; the "missing-needs-029-fix" rows
are the additive feedback/forms/analytics gap, plus a small honesty-consistency pass on demo-action writes
(Print, eval.approve, Add-feedback) that imply a write.

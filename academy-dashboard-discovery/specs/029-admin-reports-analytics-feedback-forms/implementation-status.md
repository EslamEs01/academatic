# Spec 029 — Implementation Status: IMPLEMENTED (awaiting watcher commit)

**Baseline**: Spec 028 committed, HEAD `4be3e87`, 97 public HTML. **After 029: 97 public HTML (ZERO new pages).**
No commit / no push performed — the watcher commits.

## Tasks T001–T054 — all complete

| Phase | Tasks | Result |
|---|---|---|
| 1 Setup/Preflight | T001–T007 | HEAD `4be3e87`, feature.json→029, count 97, baseline build 97 + smoke PASS + a11y green; guards loaded; zero app diff at start |
| 2 Foundational | T008–T012 | new `fixtures/report-feedback.js` (FEEDBACK/FEEDBACK_CATEGORIES/FORMS — authored, no %, no pay, no chart); `rep.fb.*`/`rep.fbcat.*`/`rep.form.*` keys in `ar/en.rep.js` (mirrored); no CSS needed (reused `.rep-*`/`.sheet-row`/`.rating-pill`) |
| 3 US1 Reports hub | T013–T016 | new `components/report-feedback.js`; `reports.js` appends `feedbackSection()`+`formsSection()`; overview/catalog/detail behavior unchanged; filters real; no chart/computed metric |
| 4 US2 Feedback+categories | T017–T022 | authored feedback rows + type/status `filterBar` + read-only detail drawers (Approve/Delete confirms) + Create-feedback modal + Manage-categories drawer (create modal + assign gate); nav 0-diff |
| 5 US3 Forms | T023–T025 | authored forms list + read-only drawers + Create-form modal + visible real deep-link to the student Evaluation tab (no duplicate engine) |
| 6 US4 Export/print | T026–T030 | **R-G** reports Print `data-demo-action`→disabled-with-reason gate; **R-H/R-I** native disabled-with-reason gates KEPT (already honest); **R-M** teacher-performance stays export-free/display-only; **R-O** export-course recorded honest-gate-only |
| 7 US9 Write honesty | T031–T032 | **R-E** outcome "Add feedback" `data-demo-action`→backendRequired modal (`outcome-details.js` — propagates through the canonical outcome drawer to attendance/sessions/course/group/teacher); **R-F** student "Approve" `data-demo-action`→backendRequired confirm (`evaluation-rubric.js`) |
| 8 US5 Metric guard | T033–T036 | no chart/canvas/engine; `monthlyReports`/`monthlyPerf`/`sessionsKpi` + `studentResult`/`studentEvaluation` stay planned gates; computed-% guardrail (categorical remark pills only) |
| 9 US6 Menu coverage | T037–T038 | `nav.config.js` **0-diff**; coverage enforced by the existing Spec-010 nav block (6 rail cats · exact finance sub-section · banks placement · link-integrity deadHash/badTarget=0 · planned-truthfulness) + new 029 assert that feedback/forms render on reports |
| 10 US7 Finance/future-owner | T039–T041 | finance files **0-diff**; body-scoped forbidden/pay grep over reports #page-body (existing check covers salary/payroll/invoice/etc.); R-P/Q→030, R-R/U→031, R-S/T→future-backend, R-V→032 recorded, none built |
| 11 Cross-cut | T042–T043 | every R-row resolved; smoke action-completion green; `href="#"`=0; no raw keys; no dead buttons |
| 12 Smoke/a11y/screenshots | T044–T047 | smoke +additive Spec-029 block (feedback/forms load, read-only drawer, create modals, filter, no chart/computed-%) + R-G re-pin + facet-scoped filter-correctness refinement; a11y +1 row (reports EN dark); 6 Spec-029 capture frames |
| 13 Docs/final | T048–T054 | README + CLAUDE + this record; clean-code + test guards green; impact/diff review; no commit/push |

## R-row resolution
**Built/fixed in 029**: R-A (feedback review) · R-B (categories modal+drawer) · R-C (forms list+create) · R-D
(progress form deep-link) · R-E (add-feedback modal) · R-F (eval approve confirm) · R-G (reports Print gate) ·
R-N (computed-% guardrail) · R-O (export-course honest gate).
**Kept honest / no-change (already Spec-026 honest)**: R-H (sessions-analysis native disabled-reason) · R-I
(course/group/student/teacher native print gates) · R-M (teacher-performance export-free, display-only).
**Folded/planned gates**: R-J (analytics numberless/chartless) · R-K (monthlyReports/monthlyPerf/sessionsKpi) ·
R-L (studentResult/studentEvaluation).
**Owner-routed (not built)**: R-P/R-Q→030 · R-R/R-U→031 · R-S/R-T→future-backend · R-V→032.

## Verification
- Build: `96 static pages → public/ (+ index)` = **97**; icons 69 ok / 0 missing.
- Smoke: **PASS — 96 loads**; new Spec-029 asserts (feedback+forms sections load, ≥6 feedback rows == drawers,
  category drawer + Create modal honest, read-only detail drawer with Approve/Delete confirms + zero persisting
  inputs, forms rows == drawers + Create modal + real Evaluation deep-link, no chart/canvas, no computed
  score/rank/percentile, feedback type filter narrows) all green; R-G Print gate re-pin; protected asserts
  (payHit/tchPay/famPay/payFigure/child-view/admin-finance + 026/027/028) byte-verbatim; ONE sanctioned
  filter-correctness refinement (facet-domain scoping for the now-two-facet reports page — still fails a broken
  area filter).
- A11y: (recorded on run) critical=0 serious=0 (+`reports` EN dark row).
- Screenshots: (recorded on run) 0 console errors (6 Spec-029 frames: feedback drawer · categories · create
  modal · form drawer EN · feedback drawer dark · mobile).
- Impact: **14 HTML changed** (reports/attendance/sessions/course/group/teacher/student ×2). R-E propagates
  through the ONE canonical outcome drawer (`outcome-details.js`) to all 5 consumers — verified byte-clean
  (only the `att.act.feedback` demo→modal line differs). **teacher-performance + 16 teacher-portal + family +
  finance + index + dashboard byte-identical**; `package.json` / `nav.config.js` / finance source **0-diff**.
- Role laws: teacher pay-free (16 portal files byte-identical; `teacher-performance.html` untouched,
  display-only), family zero-pay, student child-view, admin finance Spec-009 invariant — all green. No pay
  figure / computed metric / chart in any 029 body. No new hook/storage key/engine/dependency/page.

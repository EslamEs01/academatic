---
description: "Task list for Spec 029 — Admin Reports / Analytics / Feedback / Forms Deep Management + Admin Menu Coverage Gate"
---

# Tasks: Admin Reports / Analytics / Feedback / Forms Deep Management + Admin Menu Coverage Gate

**Input**: `academy-dashboard-discovery/specs/029-admin-reports-analytics-feedback-forms/` (spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/ ×24, + 8 evidence artifacts)
**Baseline**: Spec 028 committed — HEAD `4be3e87`, branch `feature/012-role-portal-foundation`, public HTML **97**, build/smoke/a11y green.
**Locked**: count target **97**, ZERO new pages; feedback + forms FOLD into `reports.html`; no chart/canvas/computed-%; no fake export/feedback/report; no finance leakage; no new hook/storage key/engine; no commit/push.

**Tests**: additive smoke/a11y/screenshot tasks included (verification is mandatory for every task).
**Organization**: grouped by user story (US1–US9 from spec.md). Every task carries an exact file path + verification. `[P]` = safe parallel (independent files). Repo-root paths shown; app root = `academy-dashboard-discovery/app/`.

**Path key**: `app/` = `academy-dashboard-discovery/app/`; `spec/` = `academy-dashboard-discovery/specs/029-admin-reports-analytics-feedback-forms/`.

## R-row → task map (coverage index)

| R-row | Owner | Task(s) |
|---|---|---|
| R-A Feedback review board | US2 | T017, T018, T019, T020 |
| R-B Feedback category Create/Edit/Assign | US2 | T021, T022 |
| R-C Forms/surveys list + Create form | US3 | T023, T024 |
| R-D Progress form Save/Submit | US3 | T025 |
| R-E Add-feedback outcome action | US9 | T031 |
| R-F Student eval.approve | US9 | T032 |
| R-G reports Print consistency | US4 | T026 |
| R-H sessions-analysis export consistency | US4 | T027 |
| R-I course/group/student/teacher print gates | US4 | T028 |
| R-J analytics no-chart/no-computed | US5 | T033 |
| R-K monthlyReports/monthlyPerf/sessionsKpi | US5 | T034 |
| R-L studentResult/studentEvaluation | US5 | T035 |
| R-M teacher-performance export/print | US4 | T029 |
| R-N computed percentage guardrail | US5 | T036 |
| R-O export-course / export links gate | US4 | T030 |
| R-P/R-Q finance → 030 | US7 | T039, T040 |
| R-R/R-U certs/settings → 031 | US7 | T041 |
| R-S/R-T messages/leads/… → future-backend | US7 | T041 |
| R-V stale-map / final sweep → 032 | US7 | T041 |

---

## Phase 1: Setup / Preflight

**Purpose**: prove the baseline before any edit; load the scope guards. No app file changes.

- [ ] T001 Verify baseline git state: run `git rev-parse --short HEAD` (expect `4be3e87`), `git branch --show-current` (expect `feature/012-role-portal-foundation`), `git status --short` (clean except untracked `spec/`); record in `spec/implementation-status.md`. Verification: HEAD/branch/clean match; STOP + report if not.
- [ ] T002 Verify `.specify/feature.json` points to `academy-dashboard-discovery/specs/029-admin-reports-analytics-feedback-forms`; confirm Spec 028 is the committed baseline (`git log -1 --oneline` = `4be3e87`). Verification: feature.json path correct; baseline confirmed.
- [ ] T003 Verify public HTML count == 97: `find app/public -maxdepth 1 -name '*.html' | wc -l`. Verification: prints 97; STOP if not.
- [ ] T004 Run baseline `cd app && npm run build` and `npm run test:smoke`; capture "96 static pages → public/ (+ index) = 97" and "[smoke] PASS". Verification: build 97, smoke PASS.
- [ ] T005 Run baseline `cd app && npm run test:a11y` (background if needed). Verification: critical=0 serious=0.
- [ ] T006 [P] Load and re-read the scope guards: `spec/contracts/scope-guard.md`, `spec/contracts/page-count-contract.md`, `spec/contracts/metric-chart-guard-contract.md`, `spec/contracts/finance-exclusion-contract.md`, `spec/contracts/impact-protection-contract.md`. Verification: allowed/forbidden file list + stop conditions noted before edits.
- [ ] T007 [P] Confirm no implementation has begun: `git diff --stat -- app/` is empty. Verification: zero app diff at task start.

**Checkpoint**: baseline green (97 / smoke PASS / a11y 0/0), guards loaded, zero app diff.

---

## Phase 2: Foundational (blocking prerequisites for US1–US5)

**Purpose**: the authored fixture + mirrored locale keys + optional CSS that every folded surface depends on. MUST complete before Phase 3+.

- [ ] T008 Create `app/src/js/fixtures/report-feedback.js` exporting `FEEDBACK` (~10–14 authored rows across type teacher/class/family/student — `{id, type, subjectKey, categoryKey, remarkId∈{excellent,good,sometimes,rarely}, statusId∈{open,reviewed,resolved}, dateKey, noteKey}`), per `spec/data-model.md`. NO `percentage`/`score`/`rank`/`amount`/pay field; `remarkId` is a categorical label. Verification: file parses; grep `percent|score|rank|salary|pay|amount|invoice|ريال|جنيه|AED|EUR|[$€£]` over the file = 0.
- [ ] T009 Extend `app/src/js/fixtures/report-feedback.js` with `FEEDBACK_CATEGORIES` (`{id, nameKey, descKey, statusId∈{active,inactive}, count:int-literal}`) and `FORMS` (`{id, titleKey, questions:int, responses:int, isDefault, statusId∈{active,draft,closed}, createdKey}`) — counts are authored literals, NO aggregation. Verification: exports present; no computed value; no pay token. (Same file as T008 → sequential.)
- [ ] T010 Add mirrored `rep.fb.*` + `rep.fbcat.*` + `rep.form.*` keys to `app/src/locales/ar.rep.js` (feedback/category/forms titles, filters, gate labels, confirm titles/msgs/ctas/toasts). Verification: keys added; reuse `common.backendRequiredNote`; no raw key.
- [ ] T011 Mirror the exact same keys into `app/src/locales/en.rep.js` (same nesting, EN copy). Verification: AR/EN key sets identical (diff of key paths == empty); no raw `⟦key⟧` after build.
- [ ] T012 [P] If a feedback-row/forms-row layout needs styling, add additive-only classes to `app/src/styles/app.css` (reuse `.rep-*`/`.sheet-row`/`.rating-pill`/chips; motion only inside the existing `prefers-reduced-motion` block). Verification: additive diff only; no redesign; no new hook/storage key; build clean.

**Checkpoint**: fixture + AR/EN locales + optional CSS ready; guards green.

---

## Phase 3 (US1): Reports overview stays honest + hub deepening — Priority P1

**Goal**: `reports.html` keeps its display-only overview/catalog/detail; becomes the 029 hub. **Independent test**: reports loads AR/EN; filters facet; no chart/computed metric; Print honest.

- [ ] T013 [US1] Create `app/src/js/components/report-feedback.js` skeleton exporting `feedbackSection()` and `formsSection()` (import `FEEDBACK`/`FEEDBACK_CATEGORIES`/`FORMS`, `previewTemplate`/`sheetRow`, `filterBar`, `rating-pill`/status chips). Verification: module imports resolve; no chart/canvas import; exports stubbed.
- [ ] T014 [US1] In `app/src/js/pages/reports.js` append `${feedbackSection()}${formsSection()}` after `detailSections()` and import from `../components/report-feedback.js`; keep overview/catalog/detail byte-behavior-identical. Verification: build 97; reports.html renders new sections; existing sections unchanged. (Same file chain as T013 → sequential.)
- [ ] T015 [US1] Confirm the existing report filters/search (`filterBar` → `data-filter`) still facet `#reports-grid` after the fold. Verification: smoke filter facet works; no reload; honest `noResults` on empty.
- [ ] T016 [US1] Confirm reports overview tiles remain authored roll-ups (== row counts) with NO runtime aggregation, NO chart, NO computed metric. Verification: grep `app/src/js/pages/reports.js` + `app/src/js/components/report-feedback.js` for `canvas|chart|reduce\(|\* 100|percent` = 0 (authored literals excepted).

**Checkpoint (US1)**: reports.html loads AR/EN with feedback+forms sections; filters real; overview display-only.

---

## Phase 4 (US2): Feedback review + categories (R-A / R-B) — Priority P1

**Goal**: honest display-only feedback review folded into reports.html. **Independent test**: rows authored; drawer read-only; categorical remarks only; every write backendRequired; NO computed %.

- [ ] T017 [US2] Implement `feedbackSection()` rows in `app/src/js/components/report-feedback.js`: authored `FEEDBACK` rows (subject, category chip, `rating-pill` remark, status chip, date) with a `filterBar` (type + status). Verification: rows render; filter facets by type/status; NO numeric score/percentage in output.
- [ ] T018 [US2] Add a per-row **read-only detail drawer** via `previewTemplate('rep-fb-'+id, …)` + `sheetRow` (subject/category/remark/date/note/status) in `app/src/js/components/report-feedback.js`, opened by `data-drawer`. Verification: drawer opens read-only; no edit field persists; smoke opens one drawer.
- [ ] T019 [US2] Add feedback header action Create-feedback in `app/src/js/components/report-feedback.js`: `data-modal-trigger data-modal-title-key="rep.fb.createTitle" data-modal-note-key="common.backendRequiredNote"`. Verification: modal opens; final = backendRequired; nothing saved.
- [ ] T020 [US2] Add Approve = `data-confirm` (`rep.fb.approve*`) and Delete = `data-confirm-danger` (`rep.fb.del*`) on the feedback detail/row in `app/src/js/components/report-feedback.js`. Verification: confirm opens → backendRequired; NO status flip; NO DOM row removal.
- [ ] T021 [US2] Add a **Manage-categories drawer** in `app/src/js/components/report-feedback.js` (mirror `teachers.js categoriesDrawer()`): `FEEDBACK_CATEGORIES` list via `sheetRow` + Create-category `data-modal-trigger` + assign-members `data-disabled-reason data-reason-key="rep.fbcat.assignReason"`; header trigger `data-drawer="rep-fbcat"`. Verification: drawer opens; create = modal gate; assign = disabled-reason; nav item unchanged (folded/planned).
- [ ] T022 [US2] Verify the `familyCategories`/`teacherCategories` precedent holds: no new nav item, `app/src/js/nav.config.js` **0-diff**; feedback categories delivered via the reports.html drawer only. Verification: `git diff --stat app/src/js/nav.config.js` empty.

**Checkpoint (US2)**: feedback review + categories honest, display-only, read-only drawer, backendRequired writes, no computed %.

---

## Phase 5 (US3): Forms / surveys fold (R-C / R-D) — Priority P3

**Goal**: display-only forms list + honest create; progress form via existing student Evaluation tab. **Independent test**: forms list authored; Create-form = modal gate; progress reference intact; no fake persistence.

- [ ] T023 [US3] Implement `formsSection()` in `app/src/js/components/report-feedback.js`: authored `FORMS` rows (title, authored question count, authored response count, status chip, default badge) display-only + per-row read-only drawer. Verification: rows render; counts are literals; NO aggregation; drawer read-only.
- [ ] T024 [US3] Add Create-form in `app/src/js/components/report-feedback.js`: `data-modal-trigger data-modal-title-key="rep.form.createTitle" data-modal-note-key="common.backendRequiredNote"`. Verification: modal opens; final backendRequired; no form saved.
- [ ] T025 [US3] Link the forms section to the existing per-student progress form (`student.html` Evaluation tab) via a real localized deep-link in `app/src/js/components/report-feedback.js` (no duplicate builder). Verification: link resolves (AR/EN); no new form engine added.

**Checkpoint (US3)**: forms list + create modal honest; progress form referenced, not duplicated; no fake submit.

---

## Phase 6 (US4): Export / print honesty pass (R-G / R-H / R-I / R-M / R-O) — Priority P2

**Goal**: every export/print = honest gate; reclassify the reports Print demo-toast; keep native-disabled gates. **Independent test**: no export/print produces a file or silent no-op; each shows a reason.

- [ ] T026 [US4] In `app/src/js/components/report-actions.js` reclassify Print from `data-demo-action` → the `disabledAction()` disabled-with-reason gate (reason `rep.reason.export`) (R-G). Verification: reports Print is disabled-with-reason; no fake toast; Export CSV/PDF/Share/Schedule unchanged; reports.html re-pins.
- [ ] T027 [US4] Review `app/src/js/pages/sessions-analysis.js` Export gate (R-H): confirm `button({disabled, reasonKey:'sa.reason.backend'})` stays an honest native disabled-with-reason gate (KEEP; no reclassification). Verification: `sessions-analysis.html` **byte-identical**; export is honest gate.
- [ ] T028 [US4] Review course/group/student/teacher print gates (R-I) in `app/src/js/components/course-group-actions.js`, `app/src/js/components/result-summary.js`, `app/src/js/components/teacher-actions.js`: confirm native disabled-with-reason gates are honest → **KEEP** (no reclassification; avoids churning protected pages). Verification: course/group/student/teacher HTML **byte-identical**; gates honest.
- [ ] T029 [US4] Confirm `app/src/js/pages/teacher-performance.js` stays export-free/display-only (R-M): no export button added, no score/rank/chart/pay. Verification: `teacher-performance.html` **byte-identical**; display-only.
- [ ] T030 [US4] Record export-course / invoice-export / export-links (R-O) as honest gates only (legacy 500 / link-only): no build; confirm `spec/missing-action-register.md` resolution stands. Verification: no export-course page built; existing report export gates cover the honest-gate requirement.

**Checkpoint (US4)**: all export/print honest; only reports.html changed for export honesty; sessions-analysis/course/group/student/teacher/teacher-performance byte-identical.

---

## Phase 7 (US9): Feedback/form write honesty on existing surfaces (R-E / R-F)

**Goal**: reclassify the two write-implying demo-actions on shared components to backendRequired finals (intended deltas to attendance/sessions/student). **Independent test**: Add-feedback = modal; Approve = confirm; no fake submit/approve; no DOM mutation.

- [ ] T031 [US9] In `app/src/js/components/outcome-details.js` reclassify `att.act.feedback` from `demoBtn(...)` → `data-modal-trigger data-modal-title-key="att.act.feedback" data-modal-note-key="common.backendRequiredNote"` (R-E). Verification: Add-feedback opens backendRequired modal; `attendance.html` + `sessions.html` re-pin (sanctioned smoke amendment); no fake feedback toast; other outcome actions unchanged.
- [ ] T032 [US9] In `app/src/js/components/evaluation-rubric.js` reclassify `eval.approve` from `data-demo-action` → `confirmAction({titleKey:'eval.approveTitle', msgKey:'eval.approveMsg', confirmKey:'eval.approveCta', toastKey:'eval.approveToast'})` (R-F). Verification: Approve opens backendRequired confirm; `student.html` re-pins; no fake approve; no persistence.

**Checkpoint (US9)**: both write-implying demo-actions now honest gates; only attendance/sessions/student changed (intended deltas).

---

## Phase 8 (US5): Analytics / metric guard (R-J / R-K / R-L / R-N)

**Goal**: no chart/canvas/computed metric; thin analytics candidates stay folded/planned. **Independent test**: no chart lib/canvas; no computed %/score/rank; nav planned gates honest.

- [ ] T033 [US5] Enforce analytics no-chart/no-computed (R-J) across `app/src/js/pages/reports.js` + `app/src/js/components/report-feedback.js`: reports overview stays authored counts; add NO chart/canvas and NO computed analytics. Verification: grep `canvas|chart\.js|apexcharts|amcharts|\bd3\b|highcharts|recharts` over new/changed `app/src/js/**` = 0; `sparkline.js` not imported as a metric.
- [ ] T034 [US5] Keep `monthlyReports`/`monthlyPerf`/`sessionsKpi` as honest planned gates (R-K) in `app/src/js/nav.config.js`: no page, **0-diff**. Verification: these nav items still `status:'planned'` (honest «قريبًا» button); no route.
- [ ] T035 [US5] Keep `studentResult`/`studentEvaluation` as planned gates + existing `app/src/js/pages/student.js` tabs (R-L): no new page; NO computed % on the Results/Evaluation tabs. Verification: nav items planned; student.html tabs display-only; no derived %.
- [ ] T036 [US5] Implement the computed-percentage guardrail (R-N): feedback shows categorical remark pills only; any percentage is an authored literal. Verification: smoke greps 029 bodies for computed-`%`/percentile/leaderboard (authored literals excepted) = 0.

**Checkpoint (US5)**: zero charts/canvas/computed metrics; analytics candidates folded/planned honestly.

---

## Phase 9 (US6): Admin Menu Coverage Gate

**Goal**: prove every nav item is classified; no forgotten admin page; `nav.config.js` 0-diff. **Independent test**: nav-id set == classified-id set; build guard intact.

- [ ] T037 [US6] Read-only verify `app/src/js/nav.config.js` against `spec/admin-menu-coverage-inventory.md`: all 43 items present with status + owner; 0 unclassified; implemented⇒route, planned⇒no route, disabled⇒reasonKey. Verification: 1:1 mapping; 0 unclassified; `nav.config.js` **0-diff**.
- [ ] T038 [US6] Add a smoke assertion in `app/tests/smoke/run.cjs` that derives the nav-id set from `nav.config.js` and asserts it equals the classified-id set (drift fails); re-affirm the build-time guard (`nav.config.js:148-154`) is intact; assert feedback/forms render on reports.html. Verification: smoke coverage assert PASS; no dead menu route.

**Checkpoint (US6)**: admin menu fully classified; coverage proof in smoke; no forgotten page.

---

## Phase 10 (US7): Finance / future-owner exclusion (R-P…R-V)

**Goal**: build none of 030/031/032/future-backend; keep finance invariant. **Independent test**: finance files 0-diff; no finance leakage; owner rows registered.

- [ ] T039 [US7] Verify finance exclusion (R-P/R-Q): build no analysis-expenses/analysis-invoices/salary-class-report/downlaod/invoice-export/payouts; `app/src/js/pages/finance.js`, `app/src/js/fixtures/finance.js`, `app/src/js/components/finance-*.js`, `app/src/locales/*.fin.js` **0-diff**. Verification: `git diff --stat` on those paths empty; finance.html body byte-identical.
- [ ] T040 [US7] Add/confirm a body-scoped pay-figure smoke assert (token union incl. `AED`/`EUR`) in `app/tests/smoke/run.cjs` over every new/changed 029 body (reports/attendance/sessions/student `#page-body`), excluding sidebar nav; `teacher-performance.html` stays the sanctioned exempt board. Verification: pay grep on 029 bodies = 0; payHit/tchPay/famPay/payFigure regexes byte-verbatim.
- [ ] T041 [US7] Confirm future-owner routing records (R-R/R-U→031, R-S/R-T→future-backend, R-V→032) in `spec/future-owner-register.md`; build none; each nav item stays an honest gate. Verification: register complete; smoke shows those nav items are honest gates (no dead link); stale `FUTURE_ROUTES.sessionsAnalysis` recorded for 032, not touched.

**Checkpoint (US7)**: finance 0-diff, no leakage, all out-of-scope items owned + gated, none built.

---

## Phase 11 (US6/US9): Cross-cutting action completion

**Goal**: every R-row resolved; every 029 action honest; no forbidden pattern. **Independent test**: smoke action-completion asserts pass.

- [ ] T042 [US6] Verify every R-row (R-A…R-V) has an implementation task or an owner gate (cross-check this file's R-map + `spec/missing-action-register.md`). Verification: 0 unresolved rows.
- [ ] T043 [US9] Verify no forbidden pattern on 029 surfaces via `app/tests/smoke/run.cjs`: `href="#"`==0 sitewide, no raw `⟦key⟧`, no dead button, no unexplained disabled, no fake submit/save/export/download/print/report-generation/feedback-submit, no preview-action persistence, no fake chart/analytics engine, no computed %. Verification: smoke PASS; all patterns 0.

**Checkpoint**: all actions honest; zero forbidden patterns.

---

## Phase 12 (US8/US9): Smoke / a11y / screenshots

**Goal**: additive verification; protected asserts byte-verbatim. **Independent test**: build 97 / smoke PASS / a11y 0/0 / screenshots 0 console errors.

- [ ] T044 [US8] Extend `app/tests/smoke/run.cjs` with an ADDITIVE Spec-029 block (per `spec/contracts/smoke-rescope-contract.md`): count==97; reports AR/EN loads feedback+forms; open a feedback drawer (read-only); every feedback/form action = page/modal/drawer/gate; no fake export/download/pdf/csv/print/feedback-submit/report-generation; no `<canvas>`/chart; no computed %/score/rank on 029 bodies; body-scoped pay grep==0; filters/tabs work; R-E add-feedback=modal, R-F approve=confirm, R-G print=disabled-reason. Verification: smoke PASS; additive only.
- [ ] T045 [US9] Re-pin ONLY the sanctioned assertions changed by R-E/R-F (attendance/sessions add-feedback = modal; student eval-approve = confirm) in `app/tests/smoke/run.cjs`; keep **payHit/tchPay/famPay/payFigure/child-view/admin-finance + all 026/027/028 asserts BYTE-VERBATIM**. Verification: only the two sanctioned assertions changed; protected regexes untouched (diff review). (Same file as T044 → sequential.)
- [ ] T046 [US8] Add a11y matrix rows in `app/tests/a11y/run.cjs`: a reports feedback/forms state, a feedback detail drawer, a create modal, an export gate (dark/light + mobile 390). Verification: critical=0 serious=0; gates aria-safe.
- [ ] T047 [US8] Add Spec-029 capture rows in `app/tests/screenshots/capture.cjs` (reports overview, feedback review, feedback detail drawer, forms/create-form modal, export/print gate, mobile 390, dark); update `app/screenshots/REVIEW.md`. Verification: screenshots captured, 0 console errors; REVIEW.md updated.

**Checkpoint (US8/US9)**: build 97 / smoke PASS / a11y 0/0 / screenshots 0 errors; protected asserts byte-verbatim.

---

## Phase 13: Docs / final audit

**Goal**: record + guard-prove + confirm no commit. **Independent test**: guards clean; only intended files changed; HEAD unchanged.

- [ ] T048 [P] Update `academy-dashboard-discovery/app/README.md` with a Spec-029 section (feedback/forms fold, count 97, honesty pass). Verification: section added; no over-claim.
- [ ] T049 [P] Update `CLAUDE.md` active-feature pointer → Spec 029 IMPLEMENTED (count 97, folds, role laws green). Verification: pointer updated.
- [ ] T050 [P] Create `spec/implementation-status.md` (tasks T001–T054 complete; verification results; changed-file list). Verification: record present.
- [ ] T051 Run clean-code guard: grep new/changed source (incl. comments) for chart/canvas/apex/d3, computed %/score/rank helper, salary/pay/invoice/amount tokens; reword any disclaimer tripping forbidden tokens. Verification: guard clean.
- [ ] T052 Run test guard: confirm smoke changes are additive (payHit/tchPay/famPay/payFigure/child-view/admin-finance + 026/027/028 asserts byte-verbatim; only R-E/R-F re-pins changed); no hardcoded pass. Verification: additive-only; protected regexes intact.
- [ ] T053 Final impact/diff review: `git diff --stat` shows ONLY `reports/attendance/sessions/student` HTML (×2) + allowed source (reports.js, report-actions.js, report-feedback.js, outcome-details.js, evaluation-rubric.js, report-feedback fixture, ar/en.rep.js, app.css, tests, docs) changed; `package.json`/`nav.config.js`/finance/teacher-portal **0-diff**; count 97. Verification: matches allowlist; STOP if any forbidden file changed.
- [ ] T054 Confirm no commit/no push (watcher commits): HEAD still `4be3e87`. Verification: `git rev-parse --short HEAD` == `4be3e87`; report Spec 029 ready for review.

**Checkpoint**: docs updated, guards clean, only intended deltas, HEAD unchanged.

---

## Dependencies & execution order

- **Phase 1 (T001–T007)** → gate; must pass before any edit.
- **Phase 2 (T008–T012)** → foundational; blocks Phases 3–8 (fixture + locales are imported everywhere).
- **Phase 3 (US1, T013–T016)** → hub fold; blocks Phase 4/5 (sections mount into reports.js).
- **Phase 4 (US2, T017–T022)** and **Phase 5 (US3, T023–T025)** → depend on T013/T014; sequential on `report-feedback.js` + `reports.js` (shared files, NOT [P]).
- **Phase 6 (US4, T026–T030)** → mostly verify/keep; T026 edits `report-actions.js` (independent of report-feedback).
- **Phase 7 (T031/T032, R-E/R-F)** → edits `outcome-details.js` + `evaluation-rubric.js` (independent files; each re-pins smoke, so keep before Phase 12).
- **Phase 8–11 (T033–T043)** → verification + guardrails (depend on Phases 3–7 in place).
- **Phase 12 (T044–T047)** → after all source edits; smoke/a11y/screenshot files shared and sequential (NOT [P]).
- **Phase 13 (T048–T054)** → last; docs [P] among themselves (T048/T049/T050), then guards + diff review sequential.

## Parallel opportunities

- **[P] safe**: T006, T007 (read-only); T012 (app.css, if isolated); T048, T049, T050 (separate docs).
- **NOT [P]**: T008/T009 (same fixture file); T010/T011 (mirrored locale edits — AR then EN to keep parity); T013–T025 (shared `report-feedback.js` + `reports.js`); T026 (report-actions); T031/T032 (each re-pins smoke); T044/T045 (same smoke file); all Phase 12 test edits; T051–T054 (final audit).

## Implementation strategy (MVP → increments)

- **MVP = US1 + US2** (T001–T022): reports.html hub + honest feedback review + categories. Deliverable, testable, count 97.
- **Increment 2 = US3 + US4** (T023–T030): forms fold + export/print honesty.
- **Increment 3 = R-E/R-F + US5** (T031–T036): write honesty + metric guard.
- **Increment 4 = US6/US7** (T037–T043): menu coverage + finance/future-owner exclusion.
- **Verification = US8/US9** (T044–T054): smoke/a11y/screenshots + guards + no-commit.

## Independent test criteria (per story)

- **US1**: reports.html loads AR/EN; filters real; Print/export honest; no fake report generation. (T013–T016, T026)
- **US2**: feedback rows render; drawer read-only; categorical labels only; no computed %. (T017–T022)
- **US3**: forms list renders; create-form modal gate; progress reference intact; no fake persistence. (T023–T025, T031, T032)
- **US4**: every export/print/download/PDF/CSV/Excel = honest gate, no file. (T026–T030)
- **US5**: no chart/canvas/computed %; analytics candidates folded/planned. (T033–T036)
- **US6**: all nav items classified; 0 unclassified; no forgotten admin page. (T037, T038, T042)
- **US7**: 030/031/032/future-backend rows routed, not built; finance 0-diff. (T039–T041)
- **US8**: build/smoke/a11y/screenshots green. (T044, T046, T047)
- **US9**: teacher pay-free / family zero-pay / student child-view / admin-finance / 026-028 green. (T031, T032, T040, T043, T045)

## Guard laws (apply to every task)

Count 97 · ZERO new pages · no chart/canvas/computed-%/score/rank · no fake export/print/download/feedback/report · no finance/pay leakage · finance & teacher-portal & package.json & nav.config.js 0-diff · closed `data-*` set only, no new hook/storage key/engine · `href="#"`==0 · no raw keys · no dead buttons · protected smoke asserts byte-verbatim · no commit/push.

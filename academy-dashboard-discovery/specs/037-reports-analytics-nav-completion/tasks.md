# Tasks — Spec 037: Reports / Analytics Nav Completion + Missing Pages Correctives

**Feature dir**: `academy-dashboard-discovery/specs/037-reports-analytics-nav-completion/`
**Branch**: `feature/012-role-portal-foundation` · **Baseline**: public HTML **115** → target **115** (delta 0). Specs 035 **and** 036 are green but **UNCOMMITTED** in the working tree.
**Locked plan**: `plan.md` (D1–D38) + `contracts/*` (20). **This file plans work only — no implementation, no commit, no push.**

## Legend & rules
- Format: `- [ ] T### [P?] [US?] action — exact path. **Verify**: measurable check.`
- `[P]` = parallelizable (independent file, no incomplete-task dep). **Shared files are NEVER `[P]`**: `src/js/nav.config.js`, `src/js/pages/reports.js` (US1+US2), `src/js/pages/students.js` (US5+US6), `src/locales/ar.rep.js`/`en.rep.js` (US1+US2), `src/locales/ar.fam.js`/`en.fam.js` (US4+US5+US6), `src/styles/app.css`, `tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`. (All paths under `academy-dashboard-discovery/app/`.)
- **Absolute no-fake / no-computed / finance-free laws** (binding on every task; see `contracts/no-fake-report-actions-contract.md`, `no-fake-student-family-corrections-contract.md`, `no-computed-score-rank-chart-contract.md`, `finance-free-reports-contract.md`): no fake report generation / analytics engine / prediction / export-PDF-download / send / family-category persistence / student result-evaluation calculation; **no computed score/rank/GPA/percentage-as-metric/rubric-total/average/trend-math**; **no `<canvas>`/chart/ApexCharts/`getContext`**; **no money/currency figure in any reports tab**; no row/status/category/result/evaluation mutation; no fake success wording; no backend/API/websocket/external request/dependency; no `type=file`/`type=password`/secret/`window.open`/`blob:`/`.pdf`; no `href="#"`/raw key/dead button; **no `package.json`/`build-html.mjs`/`i18n.js`/`enhance.js` change**.
- **Allowed**: display-only authored fixtures; authored count literals; categorical status/trend chips (icon+label); client-side filtering of authored rows; read-only detail drawers; `backendRequired` final gates (Export/PDF/Send/Generate/Run-analysis/Create-category/Reclassify/Approve); per-student deep-links to existing `student.html#view=results`/`#view=evaluation`; `tabs()`+`#view=` deep-link; existing `filterBar`/`facetAttrs`/`noResults`.

## Model routing
- **Opus**: reports/families/students tab architecture; the no-computed student-board boundary; the dataAnalysis honest-display vs documented-gate call; finance-free boundary; nav/audit validation; smoke/a11y guard strategy; final clean-code + test-guard review.
- **Sonnet**: authored fixture rows (MONTHLY_REPORTS/DATA_INSIGHTS); AR/EN locale mirroring; simple card/list board sections; screenshot/a11y row config; docs/checklist updates.
- **Serial chains (do NOT parallelize)**: per page → fixture/locale (Sonnet, may be [P] among themselves as different files) → page tab-wrap (Opus) → nav flip → build. `ar.fam.js`/`en.fam.js` are shared by US4+US5+US6 → those locale edits are sequential across those phases.

## Baseline note (staging guidance)
- **Specs 035 AND 036 are uncommitted.** **Do not begin implementation until the user explicitly approves continuing on the green working tree** (approved for specify/plan; re-confirm for implement). Recommended: the watcher commits Spec 035, then Spec 036, then Spec 037 as three separate commits. Keep the three conceptually separate in staging guidance; do not mix.

---

## Phase 1 — Setup / Preflight (no story label)

- [X] T001 Confirm branch + HEAD + tree — `git status --short && git rev-parse --short HEAD && git branch --show-current`. **Verify**: branch `feature/012-role-portal-foundation`; record the tree carries the uncommitted-but-green Spec 035 + Spec 036 work + the 037 spec dir.
- [X] T002 Confirm feature pointer — `cat .specify/feature.json`. **Verify**: `feature_directory` = `academy-dashboard-discovery/specs/037-reports-analytics-nav-completion`.
- [X] T003 Confirm Spec 037 plan artifacts — `ls academy-dashboard-discovery/specs/037-reports-analytics-nav-completion/{plan.md,research.md,data-model.md,quickstart.md} .../contracts/`. **Verify**: plan/research/data-model/quickstart + 20 contracts present.
- [X] T004 Confirm baseline count — `find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l`. **Verify**: **115**. STOP if not 115.
- [X] T005 Baseline gate — from `academy-dashboard-discovery/app`: `npm run build && npm run test:smoke && npm run test:a11y`. **Verify**: build green (115); smoke PASS; a11y critical=0 serious=0. STOP if any fails.
- [X] T006 Implementation-approval gate. **Verify**: the user has explicitly approved continuing on the uncommitted-but-green 035/036 tree for implementation; if not, STOP (tasks may exist, implementation waits).

## Phase 2 — Foundational (no story label; blocking prerequisites)

- [X] T007 Re-run Targeted Visual Grounding for implementation — inspect `src/js/pages/{reports,families,students,student}.js`, `src/js/components/tabs.js`, `src/js/fixtures/{reports,families,students}.js`, `src/locales/ar.rep.js`+`ar.fam.js`, `tests/smoke/run.cjs`. **Verify**: a grounding note per surface group is recorded confirming `tabs({group,items,panels,ariaKey})` API, enhance.js `#view=` sync, and the existing bodies to preserve; no invented calculation/backend (per `contracts/targeted-visual-grounding-contract.md`).
- [X] T008 Confirm mechanism 0-diff scope — grep `src/js/components/tabs.js` + `src/js/enhance.js` for the `#view=`/`academy.schedView.<group>` path. **Verify**: `tabs()`+`#view=` already support new groups `reports`/`families`/`students`; **no `enhance.js` change is required** (record if any is — that would be a STOP condition).
- [X] T009 Confirm locale/i18n registration — grep `src/js/i18n.js` for `ar.rep`/`ar.fam` imports. **Verify**: `arR/enR` (rep) and `arF/enF` (fam) already registered → **`i18n.js` stays 0-diff**; all new copy extends these modules.

## Phase 3 — US1 Monthly Reports (P1) — `reports.html#view=monthly`

**Goal**: Admin clicks Monthly Reports → a clear month-scoped display board instead of «قريبًا». **Independent test**: `reports.html#view=monthly` (+`.en`) opens the Monthly tab on fresh load; board renders; exports gated; no computed/canvas/finance. **Contracts**: `reports-tabs-contract.md`, `monthly-reports-tab-contract.md`, `finance-free-reports-contract.md`.

- [X] T010 [P] [US1] Author `MONTHLY_REPORTS` fixture — `academy-dashboard-discovery/app/src/js/fixtures/reports.js` (append: `[{id, monthKey, areaKey, count, statusId, noteKey}]`, ~3 months × areas). **Verify**: authored count literals only; 0 money/currency token; 0 computed expression; no PII.
- [X] T011 [P] [US1] Add Monthly + tab locale keys (AR) — `academy-dashboard-discovery/app/src/locales/ar.rep.js` (`rep.tab.{overview,monthly,analysis}`, `rep.monthly.*`, `rep.monthly.m.*`). **Verify**: keys added; nested under existing `rep` root.
- [X] T012 [P] [US1] Add Monthly + tab locale keys (EN) — `academy-dashboard-discovery/app/src/locales/en.rep.js` (mirror of T011). **Verify**: EN mirrors AR exactly; 0 divergence.
- [X] T013 [US1] Wrap `reports.js` body as the **overview** tab + add the `tabs({group:'reports'})` shell (overview·monthly·analysis) — `academy-dashboard-discovery/app/src/js/pages/reports.js`. **Verify**: `renderReports()` body moved verbatim into `panels.overview` (first/active); `#reports-grid`/`.report-card`/feedback/forms markup unchanged inside overview; overview is index 0.
- [X] T014 [US1] Build the Monthly panel (`monthlyPanel()`) reading `MONTHLY_REPORTS` — `academy-dashboard-discovery/app/src/js/pages/reports.js` (header + month `filterBar` + `summaryCards` + monthly rows w/ area+count+status chip + `noResults` + Export/Send/Generate `backendRequired` gates). **Verify**: uses `#mr-grid`/`.mr-*` (NEVER `#reports-grid`/`.report-card`); every write final is a gate; no `<canvas>`/computed/money.
- [X] T015 [US1] Additive Monthly board CSS — `academy-dashboard-discovery/app/src/styles/app.css` (`.mr-*` only). **Verify**: additive only; no change to `.report-card`/existing selectors.
- [X] T016 [US1] Build + verify Monthly — from `app`: `npm run build`; open `public/reports.html#view=monthly` + `.en`. **Verify**: count still 115; 0 raw keys; Monthly tab renders; deep-link opens Monthly on fresh load AR/EN; grep the built body → 0 `<canvas>`/money/computed-% in the monthly panel.

## Phase 4 — US2 Data Analysis (P1) — `reports.html#view=analysis`

**Goal**: Admin clicks Data Analysis → a clear analytics board instead of «قريبًا». **Independent test**: `reports.html#view=analysis` (+`.en`) opens the Analysis tab on fresh load; authored insights; no engine/computed/canvas/finance. **Contracts**: `data-analysis-tab-contract.md`, `no-computed-score-rank-chart-contract.md`, `finance-free-reports-contract.md`. **Depends on**: T013 (reports tab shell).

- [X] T017 [P] [US2] Author `DATA_INSIGHTS` fixture — `academy-dashboard-discovery/app/src/js/fixtures/reports.js` (append: `[{id, areaKey, count, trendId, statusId, noteKey}]`; trendId categorical improving/steady/declining). **Verify**: authored literals + categorical trend LABELS; finance-free; 0 computed metric.
- [X] T018 [P] [US2] Add Analysis locale keys (AR) — `academy-dashboard-discovery/app/src/locales/ar.rep.js` (`rep.analysis.*` + trend/status labels). **Verify**: keys added; not colliding with `rep.monthly.*`.
- [X] T019 [P] [US2] Add Analysis locale keys (EN) — `academy-dashboard-discovery/app/src/locales/en.rep.js` (mirror of T018). **Verify**: 0 divergence vs AR.
- [X] T020 [US2] Build the Analysis panel (`analysisPanel()`) reading `DATA_INSIGHTS` — `academy-dashboard-discovery/app/src/js/pages/reports.js` (header + filters + insight cards + categorical trend/status chips + read-only list + `noResults` + Export/Run-analysis gates). **Verify**: uses `#da-grid`/`.da-*`; **no `<canvas>`/ApexCharts/computed metric/prediction/percentage**; finance-free; if authored insights too thin → documented `backendRequired` analysis gate (never a fake chart).
- [X] T021 [US2] Build + verify Analysis — from `app`: `npm run build`; open `public/reports.html#view=analysis` + `.en`. **Verify**: count 115; Analysis tab renders + deep-links AR/EN; grep built body → 0 `<canvas>`/`getContext`/money/computed-% in analysis panel; reports overview still shows the 7 `.report-card`.

## Phase 5 — US4 Family Categories corrective (P2) — `families.html#view=categories`

**Goal**: «فئات العائلات» reaches a clearly-labeled Family Categories board, not a filter. **Independent test**: `families.html#view=categories` (+`.en`) opens a labeled Categories board; reclassify reachable; Create gated; 0 mutation. **Contracts**: `family-categories-corrective-contract.md`, `forms-and-gates-contract.md`.

- [X] T022 [P] [US4] Add Families tab + Categories board locale (AR) — `academy-dashboard-discovery/app/src/locales/ar.fam.js` (`fam.tab.{directory,categories}`, `fam.cat.board.*`, Create-category CTA + reason). **Verify**: keys under existing `fam` root; reuse `fam.cat.*` names.
- [X] T023 [P] [US4] Add Families tab + Categories board locale (EN) — `academy-dashboard-discovery/app/src/locales/en.fam.js` (mirror of T022). **Verify**: 0 divergence.
- [X] T024 [US4] Wrap `families.js` body as **directory** tab + add **categories** tab board — `academy-dashboard-discovery/app/src/js/pages/families.js` (`tabs({group:'families'})`; categories panel renders `FAMILY_CATEGORIES` cards/rows w/ authored `count` + status chips + descriptions; existing `famCatDrawer` stays reachable; Create-category `backendRequired` gate). **Verify**: directory tab holds the existing body verbatim (`#families-grid`+drawers intact); categories board uses authored counts (no `.filter().length` computed stat); no fake mutation.
- [X] T025 [US4] Additive Categories board CSS if needed — `academy-dashboard-discovery/app/src/styles/app.css`. **Verify**: additive only.
- [X] T026 [US4] Build + verify Family Categories — `npm run build`; open `public/families.html#view=categories` + `.en`. **Verify**: count 115; labeled Categories board renders AR/EN on fresh load; reclassify drawer reachable; Create gated; directory tab unchanged; 0 money-plan figure.

## Phase 6 — US5 Student Results corrective (P2) — `students.html#view=results`

**Goal**: «نتائج الطلاب» reaches a cross-student Results board, not one student. **Independent test**: `students.html#view=results` (+`.en`) opens a Results board listing students + per-student deep-links; no computed score. **Contracts**: `student-results-board-contract.md`, `no-computed-score-rank-chart-contract.md`.

- [X] T027 [P] [US5] (Optional) add authored categorical `resultStatusId` per student — `academy-dashboard-discovery/app/src/js/fixtures/students.js`. **Verify**: authored categorical literal only (or reuse existing `statusId`/`results.certificates.length`); NO new computed expression; if not needed, record "reuse existing fields — no fixture change".
- [X] T028 [P] [US5] Add Students tab + Results board locale (AR) — `academy-dashboard-discovery/app/src/locales/ar.fam.js` (`stu.tab.{directory,results,evaluation}`, `stu.results.*`). **Verify**: keys under `stu` root; sequential after T022 (same file).
- [X] T029 [P] [US5] Add Students tab + Results board locale (EN) — `academy-dashboard-discovery/app/src/locales/en.fam.js` (mirror of T028). **Verify**: 0 divergence.
- [X] T030 [US5] Wrap `students.js` body as **directory** tab + add the `tabs({group:'students'})` shell (directory·results·evaluation) — `academy-dashboard-discovery/app/src/js/pages/students.js`. **Verify**: `renderStudents()` body verbatim in `panels.directory` (`#students-table`+drawers intact); directory index 0.
- [X] T031 [US5] Build the Results board (`resultsPanel()`) — `academy-dashboard-discovery/app/src/js/pages/students.js` (per-student rows: name + family chip + level + `results.certificates.length` count + result status chip + per-student deep-link to `student.html#view=results`; `noResults`). **Verify**: **no computed score/rank/GPA/percentage/average**; no cross-student aggregation/ranking/sort-by-score; deep-links localize (`.en`).
- [X] T032 [US5] Build + verify Results — `npm run build`; open `public/students.html#view=results` + `.en`. **Verify**: count 115; Results board renders AR/EN on fresh load; per-student deep-links present; directory tab unchanged; grep built body → 0 `<canvas>`/computed-% in results panel.

## Phase 7 — US6 Student Evaluation corrective (P2) — `students.html#view=evaluation`

**Goal**: «تقييم الطلاب» reaches a cross-student Evaluation board. **Independent test**: `students.html#view=evaluation` (+`.en`) opens an Evaluation board + per-student deep-links; no computed rubric total. **Contract**: `student-evaluation-board-contract.md`. **Depends on**: T030 (students tab shell).

- [X] T033 [P] [US6] Add Evaluation board locale (AR) — `academy-dashboard-discovery/app/src/locales/ar.fam.js` (`stu.eval.*`). **Verify**: under `stu` root; sequential after T028 (same file).
- [X] T034 [P] [US6] Add Evaluation board locale (EN) — `academy-dashboard-discovery/app/src/locales/en.fam.js` (mirror of T033). **Verify**: 0 divergence.
- [X] T035 [US6] Build the Evaluation board (`evaluationPanel()`) — `academy-dashboard-discovery/app/src/js/pages/students.js` (per-student rows: name + level + evaluation status chip from `evaluation.approved` + `evaluation.monthKey` + per-student deep-link to `student.html#view=evaluation`; `noResults`). **Verify**: **no computed rubric total/score/rank/rating math**; categorical chip only; single-student `evaluationRubric` untouched.
- [X] T036 [US6] Build + verify Evaluation — `npm run build`; open `public/students.html#view=evaluation` + `.en`. **Verify**: count 115; Evaluation board renders AR/EN on fresh load; deep-links present; grep built body → 0 rubric-total/score/`<canvas>` in evaluation panel.

## Phase 8 — US3 Nav completion & Admin audit (P1)

**Goal**: the 5 items are honest nav entries; admin sidebar audit holds. **Independent test**: monthlyReports/dataAnalysis no longer «قريبًا»; reports category 0-planned; admin menu 50; count 115. **Contracts**: `nav-completion-contract.md`, `page-count-contract.md`, `scope-guard.md`. **Depends on**: Phases 3–7 (routes must resolve to real tabs).

- [X] T037 [US3] nav.config.js — flip `monthlyReports`→`implemented` route `reports.html#view=monthly`; `dataAnalysis`→`implemented` route `reports.html#view=analysis` — `academy-dashboard-discovery/app/src/js/nav.config.js`. **Verify**: build-time dead-link guard passes; reports category has 0 `planned` items.
- [X] T038 [US3] nav.config.js — route-refine `familyCategories`→`families.html#view=categories`, `studentResult`→`students.html#view=results`, `studentEvaluation`→`students.html#view=evaluation`; drop `FUTURE_ROUTES.monthlyReports` + `.dataAnalysis` only (keep `materials`) — `academy-dashboard-discovery/app/src/js/nav.config.js`. **Verify**: exactly these 5 nav changes + 2 FUTURE_ROUTES trims; finance/materials/certificateRequests/settings untouched.
- [X] T039 [US3] Verify admin-menu count + audit — `npm run build`; count classified nav items. **Verify**: admin menu = **50**; no item added/removed; `admin-missing-pages-audit.md` still accurate (materials/certificateRequests→039, settings→040, finance→038 untouched).
- [X] T040 [US3] Link/route integrity — build + grep. **Verify**: count 115; 0 `href="#"`; every implemented nav item resolves to a real page/hash target; hash routes strip to an existing page; 0 raw keys.

## Phase 9 — US7 no-fake + US8 role-law verification & Tests (P1)

**Goal**: prove no-fake/no-computed and role-law carryover; additive tests. **Contracts**: `smoke-coverage-contract.md`, `a11y-screenshot-contract.md`, `role-law-carryover-contract.md`, `no-fake-report-actions-contract.md`, `no-fake-student-family-corrections-contract.md`.

- [X] T041 [US7] Additive smoke — nav + surfaces — `academy-dashboard-discovery/app/tests/smoke/run.cjs`. **Verify** (additive; prior asserts byte-verbatim): count 115; admin-menu 50; reports category 0-planned; monthlyReports/dataAnalysis are anchors (not coming-soon); the 5 deep-links (`#view=monthly/analysis/categories/results/evaluation`) open the correct tab on **fresh context per lang×view**; boards render; per-student drill-down links present.
- [X] T042 [US7] Additive smoke — no-fake/no-computed/finance-free greps — `academy-dashboard-discovery/app/tests/smoke/run.cjs`. **Verify**: 0 `<canvas>`/`getContext`/chart in reports/students new panels; 0 money/currency token in reports tabs (inspect all 3 tabpanels' innerHTML, not just visible text); 0 computed score/rank/GPA/percentage/rubric-total in students boards; gates present (Export/Generate/Create/Reclassify); 0 external request; 0 `type=file`/`type=password`.
- [X] T043 [US8] Smoke — role-law carryover byte-verbatim — `academy-dashboard-discovery/app/tests/smoke/run.cjs`. **Verify**: admin-menu-50, reports 7-card/2-planned (`#reports-grid`), finance 9-planned, families 0-planned, teachers 0-planned, payHit/tchPay/famPay/payFigure/child-view, Spec 026–036 asserts all UNCHANGED; the ONE sanctioned amendment (reports category planned probe) noted; run `npm run test:smoke` → PASS.
- [X] T044 [P] [US7] Additive a11y rows — `academy-dashboard-discovery/app/tests/a11y/run.cjs` (monthly/analysis/categories/results/evaluation × AR/EN × light/dark + mobile-390 + categories open-drawer). **Verify**: `npm run test:a11y` critical=0 serious=0.
- [X] T045 [P] [US7] Additive screenshot frames — `academy-dashboard-discovery/app/tests/screenshots/capture.cjs` (reports overview preservation + 5 boards × AR/EN/dark/mobile). **Verify**: `node tests/screenshots/capture.cjs` → 0 console errors; frames captured.
- [X] T046 [P] [US7] Update screenshot review notes — `academy-dashboard-discovery/app/screenshots/REVIEW.md`. **Verify**: Spec 037 frames listed.
- [X] T047 [US8] Full test gate — from `app`: `npm run build && npm test && npm run test:smoke && npm run test:a11y`. **Verify**: build 115; all green; PASS; 0/0.

## Phase 10 — Polish / Guards / Docs / Final audit (no story label)

- [X] T048 Impact-protection proof — `git stash` the 037 source files (`pages/{reports,families,students}.js`, `fixtures/reports.js`, `locales/{ar,en}.rep.js`+`{ar,en}.fam.js`, `nav.config.js`, `app.css`), rebuild, md5 `#page-body` slices, unstash — per `contracts/impact-protection-contract.md`. **Verify**: `student.html`/`family.html` + `result-summary`/`evaluation-rubric` output byte-identical; other admin `#page-body` + 16 portal pages + index byte-identical; only reports/families/students bodies + shared sidebar changed.
- [X] T049 Forbidden-file 0-diff proof — `git diff --stat -- academy-dashboard-discovery/app/package.json .../scripts/build-html.mjs .../src/js/i18n.js .../src/js/enhance.js`. **Verify**: all four 0-diff; no new dependency.
- [X] T050 Clean-code guard (Opus) over the full diff. **Verify**: PASS — 0 blockers (scope creep, count drift, wrong flips, fake action, computed metric, canvas, finance figure, locale divergence, raw key, `href="#"`, dead button, a11y serious/critical, mobile overflow, role-law regression).
- [X] T051 Test-guard (Opus) over changed tests. **Verify**: PASS — additive only; no weakened role-law/no-fake/Spec-032 asserts; deep-link tests actually load `#view=`; no hidden hardcoded pass; re-run after any fix.
- [X] T052 [P] Docs — `academy-dashboard-discovery/app/README.md` + `CLAUDE.md` (Spec 037 section). **Verify**: reports tabs + correctives + count 115 + admin-menu 50 recorded.
- [X] T053 [P] Implementation status — `academy-dashboard-discovery/specs/037-reports-analytics-nav-completion/implementation-status.md`. **Verify**: surfaces, nav changes, counts, verification, impact protection, staging guidance (035→036→037) recorded.
- [X] T054 Final audit + report — `git status --short`, `git diff --name-only`, count. **Verify**: count 115; only allowed files touched; no commit/push; Spec 037 safe-to-review verdict; recommend the watcher commit 035 → 036 → 037 as separate commits.

---

## Dependencies & order
- **Phase 1 → 2** gate everything. **Phase 3 (US1)** builds the reports tab shell that **Phase 4 (US2)** reuses (T013 blocks T020). **Phase 6 (US5)** builds the students tab shell that **Phase 7 (US6)** reuses (T030 blocks T035). **Phase 8 (US3)** nav flips depend on Phases 3–7 (routes must resolve). **Phase 9** tests depend on all surfaces + nav. **Phase 10** guards/docs last.
- **Shared-file serial chains**: `reports.js` (T013→T014→T020), `students.js` (T030→T031→T035), `ar.fam.js`/`en.fam.js` (T022/T023→T028/T029→T033/T034), `ar.rep.js`/`en.rep.js` (T011/T012→T018/T019), `app.css` (T015→T025), `nav.config.js` (T037→T038), `tests/smoke/run.cjs` (T041→T042→T043).

## Parallel opportunities
- Fixtures + AR-locale + EN-locale within a phase are different files → `[P]` (e.g., T010/T011/T012; T017/T018/T019). A11y + screenshots + REVIEW (T044/T045/T046) are `[P]`. Docs T052/T053 are `[P]`.
- **Never `[P]`**: the shared files listed in Legend; page tab-wraps; nav.config; smoke.

## Story coverage
- **US1** Monthly Reports → Phase 3 (T010–T016). **US2** Data Analysis → Phase 4 (T017–T021). **US4** Family Categories → Phase 5 (T022–T026). **US5** Student Results → Phase 6 (T027–T032). **US6** Student Evaluation → Phase 7 (T033–T036). **US3** Nav/audit → Phase 8 (T037–T040). **US7** no-fake + **US8** role-law → Phase 9 (T041–T047) + guards (T050–T051).

## MVP / safest path
- **MVP = US1 + US2 + US3** (the two owned Reports/Analytics items become real tabs + honest nav; count 115, admin-menu 50) — this closes Spec 037's core mandate.
- **Full = + US4/US5/US6** (the three flagged-035 correctives) — addresses the maintainer's "still missing" flag, still count 115.
- Safest increment order: Phase 1–2 → US1 → US2 → US3 (ship MVP green) → US4 → US5 → US6 → tests/guards/docs.

## Totals
- **54 tasks** across 10 phases. Story tasks: US1=7, US2=5, US4=5, US5=6, US6=4, US3=4; US7/US8 verification=7; setup/foundational=9; polish=7.
- **No implementation performed. No commit. No push.** Implementation is gated on explicit maintainer approval to continue on the uncommitted-but-green 035/036 tree.

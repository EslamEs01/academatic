# Tasks — Spec 036: Teachers Nav Completion

**Feature dir**: `academy-dashboard-discovery/specs/036-teachers-nav-completion/`
**Branch**: `feature/012-role-portal-foundation` · **Baseline**: public HTML **115** → target **115** (delta 0). Spec 035 is green but **uncommitted** (approved green-tree baseline).
**Locked plan**: `plan.md` (D1–D33) + `contracts/*`. **This file plans work only — no implementation, no commit.**

## Legend & rules
- Format: `- [ ] T### [P?] [US?] action — exact path. **Verify**: measurable check.`
- `[P]` = parallelizable (independent file, no incomplete-task dep). Shared files are **never** `[P]`: `nav.config.js`, `pages/teacher-performance.js`, `fixtures/teacher-performance.js`, `locales/ar.trn.js`, `locales/en.trn.js`, `app.css`, `tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`.
- **Teacher pay-free (GLOBAL) + absolute no-fake laws** (binding on every task; see `contracts/teacher-pay-free-contract.md`, `no-fake-teacher-actions-contract.md`, `no-computed-rank-chart-score-contract.md`): 0 salary/fixed_salary/salary_type/hour_rate/rate/fine/fine_per_hour/payout/payroll/payment/compensation/currency figure; no computed score/rank/percentage/rating/total/chart/`<canvas>`; no fake teacher/category/KPI/monthly creation-calculation-persistence; no fake success wording; no row/status mutation; no backend/API/websocket/external request/dependency; no `type=file`/`type=password`/secret; no `href="#"`/raw key/dead button; **no `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` change**.
- **Allowed**: display-only authored fixtures; categorical chips; authored session counts (not pay/rank); authored monthly notes/trends (not computed); real filters/tabs; read-only drawers; frontend forms/drawers; `backendRequired` final gates; deep-links to existing tabs; folded-owner anchors.

## Model routing
- **Opus**: visual-grounding synthesis, page-vs-fold validation, teacher pay-free boundary, no-computed-score/rank/chart boundary, sessionsKpi/monthlyPerf architecture (the teacher-performance tabs refactor), role-law/smoke/a11y guard strategy, final clean-code/test-guard review.
- **Sonnet**: repetitive fixture rows, AR/EN locale mirroring, simple card/list sections, screenshot config, docs/checklist updates.
- **Do not parallelize** edits to any shared file above; the teacher-performance page (Opus) + its fixture/locale (Sonnet) are a serial chain (fixture → locale → page tabs → nav → build).

## Baseline note (staging guidance)
- Spec 035 is uncommitted. **Do not begin implementation until the user approves continuing on the green tree** (already approved for specify/plan; re-confirm for implement). Keep Spec 035 and Spec 036 changes conceptually separate; prefer the watcher commits Spec 035 first so the two land as distinct commits. Do not mix 035/036 in final staging guidance.

---

## Phase 1 — Setup / Preflight (no story label)

- [X] T001 Confirm branch + HEAD + tree — `git status --short`, `git rev-parse --short HEAD`, `git branch --show-current`. **Verify**: branch `feature/012-role-portal-foundation`; record that the tree carries the uncommitted-but-green Spec 035 work + the 036 spec dir (the approved green-tree baseline).
- [X] T002 Confirm feature pointer — `cat .specify/feature.json`. **Verify**: `feature_directory` = `academy-dashboard-discovery/specs/036-teachers-nav-completion`.
- [X] T003 Confirm Spec 036 plan artifacts — `ls academy-dashboard-discovery/specs/036-teachers-nav-completion/{plan.md,research.md,data-model.md,quickstart.md} contracts/`. **Verify**: plan.md, research.md, data-model.md, quickstart.md + 17 contracts present.
- [X] T004 Confirm baseline count — `find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l`. **Verify**: **115**. STOP if not 115.
- [X] T005 Baseline gate — from `academy-dashboard-discovery/app`: `npm run build && npm run test:smoke && npm run test:a11y`. **Verify**: build green (115); smoke PASS; a11y critical=0 serious=0. STOP if any fails.
- [X] T006 Implementation-approval gate — **Verify**: the user has explicitly approved continuing on the uncommitted green Spec-035 tree for implementation; if not, STOP and report (tasks may exist, implementation waits).

---

## Phase 2 — Foundation / Registration (no story label; serial shared-file chain)

- [X] T007 (Sonnet) Create authored fixture — `academy-dashboard-discovery/app/src/js/fixtures/teacher-performance.js` exporting `SESSIONS_KPI_LABELS` (per-teacher categorical quality label keyed by teacher id), `MONTHLY_ROWS` (id/teacherId/monthId/trendId/statusId/noteKey), and vocab `KPI_QUALITY`/`PERF_TRENDS`/`PERF_MONTHS`. **Verify**: module imports via build; 0 PII, 0 pay/rate/fine/payout/currency token, 0 score/rank/percentage/computed token, 0 `canvas`.
- [X] T008 (Sonnet) Extend teacher locale — `academy-dashboard-discovery/app/src/locales/ar.trn.js` + `en.trn.js`: add `trn.tab.*` (overview/sessions-kpi/monthly tab labels), `trn.kpi.*` (KPI board + quality labels), `trn.monthly.*` (monthly board + trend/status/month labels + notes). **Verify**: `ar.trn.js`/`en.trn.js` new subtrees identical (0 divergence); NO new locale pair; `i18n.js` 0-diff.
- [X] T009 (SHARED) Nav flips — edit `academy-dashboard-discovery/app/src/js/nav.config.js`: flip the 4 items `planned→implemented` + route (`addTeacher`→`teachers.html`, `teacherCategories`→`teachers.html`, `sessionsKpi`→`teacher-performance.html#view=sessions-kpi`, `monthlyPerf`→`teacher-performance.html#view=monthly`); remove `FUTURE_ROUTES.teacherCategories`. **Verify**: exactly 4 items changed; build guard passes; no other nav item touched; `FUTURE_ROUTES.teacherCategories` gone.
- [X] T010 Foundation build gate — `npm run build && find public -name '*.html' | wc -l`. **Verify**: **115** (no new file); `git diff -- academy-dashboard-discovery/app/package.json` empty; `git diff -- academy-dashboard-discovery/app/scripts/build-html.mjs` empty (0-diff); `git diff -- academy-dashboard-discovery/app/src/js/i18n.js` empty.
- [X] T011 Confirm no new page base — inspect `scripts/build-html.mjs`. **Verify**: 0 new PAGES entries; teacher-performance still the only teacher-performance base (activeId `teacherKpi`).

---

## Phase 3 — Fixtures / Locales / CSS QA (no story label)

- [X] T012 (Sonnet) Complete authored KPI + monthly rows in `fixtures/teacher-performance.js` (≥1 row per quality/trend category; enough teachers/months to exercise every filter + reach an empty state). **Verify**: quality/trend are authored enums (never computed); ≥1 filter combo yields 0 rows.
- [X] T013 Mirror + proof AR/EN copy in `locales/ar.trn.js` / `en.trn.js` (shared teacher locale pair — follows T008, not parallel). **Verify**: `trn.tab`/`trn.kpi`/`trn.monthly` key sets equal (sorted-key diff empty); grep for `⟦` in built `teacher-performance.html`/`.en` = 0.
- [X] T014 Fixture/page purity scan — grep `fixtures/teacher-performance.js` + `pages/teacher-performance.js`. **Verify**: 0 hits for salary/fixed_salary/salary_type/hour_rate/rate/fine/payout/payroll/payment/compensation/currency; 0 for computed score/rank/percentage/rating/total; 0 for `canvas`; 0 for `type=file`/`type=password`.
- [X] T015 CSS additive audit — `git diff -- academy-dashboard-discovery/app/src/styles/app.css`. **Verify**: only additions (new `.tp-*` if any), no edits/removals; motion (if any) inside the reduced-motion block. (If no CSS needed, 0-diff.)

---

## Phase 4 — US1: Add Teacher Fold Anchor

**Goal**: `addTeacher` → real anchor to `teachers.html`; existing `trn-add` drawer reachable; no pay/password. **Independent test**: click Add Teacher → teachers.html; open Add-teacher drawer; Save gated; no forbidden field.

- [X] T016 [US1] Grounding note (addTeacher) — from `teacher-actions.js:45-73` (`trn-add`, pay omitted :36), `teachers.js:105/112`, legacy `management-teachers-create.md` (Salary/Payout/password excluded), Spec 033 CS-10 / 032 FC-22. **Verify**: note records fold-anchor→teachers.html, forbidden fields, Save=gate.
- [X] T017 [US1] Confirm the nav flip landed (from T009) — inspect `nav.config.js`. **Verify**: `addTeacher` implemented, `route:'teachers.html'`, real anchor (no «قريبًا»). No re-edit here.
- [X] T018 [US1] Verify fold reachability + body invariance — build then diff. **Verify**: `teachers.html`/`.en` load; `trn-add` drawer reachable via the header primary; Save = `data-disabled-reason` gate; **0** salary/rate/fine/payout/`type=password`/`type=file` token in the trn-add body; `teachers.html`/`teacher.html` `#page-body` byte-identical HEAD→working (only shared sidebar differs); no standalone add-teacher page.

---

## Phase 5 — US2: Teacher Categories Fold Anchor

**Goal**: `teacherCategories` → real anchor to `teachers.html`; existing `trn-categories` drawer reachable; no fake mutation. **Independent test**: click Teacher Categories → teachers.html; open "Manage categories"; Save/assign are gates.

- [X] T019 [US2] Grounding note (teacherCategories) — from `teachers.js:70-84/105/110` (`trn-categories`), legacy `management-teacher-categories*.md`, Spec 033 CS-11 / 028 T-K / 032 FC-24. **Verify**: note records fold-anchor→teachers.html, list+Create form+gates, FUTURE_ROUTES drop.
- [X] T020 [US2] Confirm the nav flip + FUTURE_ROUTES drop landed (from T009) — inspect `nav.config.js`. **Verify**: `teacherCategories` implemented, `route:'teachers.html'`, real anchor; `FUTURE_ROUTES.teacherCategories` removed. No re-edit here.
- [X] T021 [US2] Verify fold reachability + body invariance — build then diff. **Verify**: `teachers.html`/`.en` load; `trn-categories` drawer (list + Create form + Save `common.backendRequiredNote` gate + assign `trn.cat.assignReason` gate) reachable via the header secondary; `teachers.html` `#page-body` byte-identical; no fake mutation.

---

## Phase 6 — US3: Sessions KPI Tab

**Goal**: fold a display-only sessions-KPI tab into teacher-performance. **Independent test**: click Sessions KPI → `teacher-performance.html#view=sessions-kpi` opens the KPI tab; counts + categorical chips; no computed %/chart; no pay.

- [X] T022 [US3] Grounding note (sessionsKpi) — from `teacher-performance.js` (flat board, no tabs), `tabs.js`, legacy `management-class-feedback.md` (Percentage NOT reproduced), Spec 033 CS-12 / 028 performance-metric-scope. **Verify**: note records fold-as-tab, counts+categorical labels, NO computed %.
- [X] T023 [US3] (Opus, SHARED) Tabs refactor in `pages/teacher-performance.js` — wrap the current board (tiles + comparison list + follow-up queue) as the **overview** panel and introduce `tabs({group:'perf', items:[overview, sessions-kpi, monthly], panels})`. **Verify**: build green 115; `teacher-performance.html` has a `[data-tabs="perf"]` widget with `overview` as the default (first) visible tabpanel; the existing tiles/comparison/queue render inside overview unchanged.
- [X] T024 [US3] (Opus, SHARED) Sessions-KPI board in `pages/teacher-performance.js` — the `sessions-kpi` panel: per-teacher rows (name + status chip + authored session counts via `teacherCounts` + a categorical quality chip from `KPI_QUALITY`) + a `filterBar` (teacher/subject) over the board + `noResults` + optional read-only drawer. **Verify**: `#ss-kpi`-style board renders; rows carry `facetAttrs`; every final (if any) is a `data-disabled-reason` gate; 0 `data-demo-action`.
- [X] T025 [US3] No-compute + pay-free proof (sessions-kpi) — grep the `sessions-kpi` panel body. **Verify**: 0 computed score/rank/percentage/rating token; 0 `<canvas>`/chart; 0 pay/rate/fine/payout/currency token; counts are literals, quality is a categorical chip.
- [X] T026 [US3] Behavioral deep-link check — load `teacher-performance.html#view=sessions-kpi` + `.en` (fresh). **Verify**: the `sessions-kpi` tabpanel is the only visible one; a facet narrows visible rows; **0** external request; nav `sessionsKpi` anchors to this hash route.

---

## Phase 7 — US4: Monthly Performance Tab

**Goal**: fold a display-only monthly tab into teacher-performance. **Independent test**: click Monthly Performance → `teacher-performance.html#view=monthly`; month + categorical trend/status + notes; no computed figures; no pay.

- [X] T027 [US4] Grounding note (monthlyPerf) — from `tabs.js`, legacy `management-teacher-feedback.md` (Percentage NOT reproduced; feedback engine not duplicated), Spec 033 CS-13 / 029 (feedback owned by reports). **Verify**: note records fold-as-tab, month+categorical trend/status+notes, NO computed %, no duplicate feedback engine.
- [X] T028 [US4] (Opus, SHARED) Monthly board in `pages/teacher-performance.js` — the `monthly` panel: per-teacher monthly rows (name + status + month label + categorical trend/status chip from `PERF_TRENDS` + authored note) + a month/teacher `filterBar` + `noResults` + optional read-only drawer. **Verify**: the monthly panel renders authored `MONTHLY_ROWS`; rows carry `facetAttrs`; any final = gate.
- [X] T029 [US4] No-compute + pay-free proof (monthly) — grep the `monthly` panel body. **Verify**: 0 computed %/score/rank/total token; 0 `<canvas>`/chart; 0 pay/rate/fine/payout/currency token; trend/status categorical; notes authored.
- [X] T030 [US4] Behavioral deep-link check — load `teacher-performance.html#view=monthly` + `.en` (fresh). **Verify**: the `monthly` tabpanel is the only visible one; a month/teacher facet narrows rows; **0** external request; nav `monthlyPerf` anchors to this hash route.

---

## Phase 8 — Nav / Count / Link Integrity (no story label)

- [X] T031 Count + menu invariants — build + `find public -name '*.html' | wc -l`; inspect `nav.config.js`. **Verify**: **115** (no new file); admin-menu **50**; **teachers category 0 planned** items; exactly **4** scoped flips; no unrelated route added/removed; all 115 prior files present.
- [X] T032 Hash-route link integrity — confirm the nav/link-integrity smoke resolves `teacher-performance.html#view=sessions-kpi` / `#view=monthly` by stripping `#…` to the existing `teacher-performance.html` (optionally assert the tab id exists). **Verify**: 0 dead links / badTarget; the two hash deep-links not flagged.
- [X] T033 No-accidental-removal proof — `git diff --name-status` on `public/`. **Verify**: 0 added/removed HTML files; `teachers.html`/`teacher.html` change only in the shared sidebar; only `teacher-performance.html`/`.en` bodies change (tabs); portals ×16 + index byte-identical.

---

## Phase 9 — Smoke / A11y / Screenshots (no story label; additive only)

- [X] T034 (Opus, SHARED) Smoke additive Teachers block — `tests/smoke/run.cjs`: assert 4 nav flips (no «قريبًا», teachers 0-planned, admin-menu 50, count 115); `trn-add` reachable + Save gate + no salary/rate/fine/payout/`type=password`/`type=file`; `trn-categories` reachable + Create form + Save/assign gates; `teacher-performance.html#view=sessions-kpi` + `#view=monthly` open the right tabpanel (fresh load) + facet narrows + no computed score/rank/percentage/`<canvas>` + 0 pay token; teacher-pay grep byte-verbatim; global `href="#"`=0/raw-keys=0/dead-buttons=0/0 external request. **Verify**: `npm run test:smoke` PASS; protected regexes (payHit/pay guards, payFigure/famPay, child-view, nav010 admItems===5, Spec-032 trn FORM_DRAWERS/PICKERS/HYBRID, 026–035) byte-verbatim in the diff.
- [X] T035 Smoke behavioral checks are real (not hardcoded) — review the added smoke code. **Verify**: the tab tests actually load `#view=sessions-kpi`/`#view=monthly` (fresh context) and observe the visible tabpanel; the drawer tests actually open `trn-add`/`trn-categories`; a facet test actually changes a filter and observes narrowing; no `assert(true)` hides a fake.
- [X] T036 (SHARED) A11y rows — `tests/a11y/run.cjs`: add teacher-performance `#view=sessions-kpi` + `#view=monthly` AR/EN light/dark + mobile-390 + open-drawer rows. **Verify**: `npm run test:a11y` critical=0 serious=0 (fix any scrollable-region-focusable on a board wrapper via `tabindex="0" role="region" aria-label`).
- [X] T037 (SHARED) Screenshots — `tests/screenshots/capture.cjs`: add frames for teachers Add-Teacher drawer + Teacher-Categories drawer + teacher-performance `#view=sessions-kpi` + `#view=monthly`; AR/EN, dark, mobile-390. **Verify**: `node tests/screenshots/capture.cjs` → 0 console errors; no capture handler fires a network call.
- [X] T038 [P] Update `academy-dashboard-discovery/app/screenshots/REVIEW.md` with the new sp036 frames. **Verify**: REVIEW.md lists every new sp036 frame.
- [X] T039 Sanctioned-amendment log — in the smoke diff header, record the ONE sanctioned amendment: the dashboard planned-item probe repointed from `teachers` → a category still holding a planned item (`reports`/`admin`/`settings`), since teachers now has 0 planned. **Verify**: no protected assert edited; route-freeze stays 115.

---

## Phase 10 — Docs / Final Audit + Guards (no story label)

- [X] T040 [P] Update `academy-dashboard-discovery/app/README.md` with the Spec-036 section (2 fold anchors + 2 teacher-performance tabs; count 115; teacher pay-free; no computed %). **Verify**: README names the 4 nav resolutions + the tabs + count 115.
- [X] T041 [P] Write `academy-dashboard-discovery/specs/036-teachers-nav-completion/implementation-status.md` (counts/invariants/pay-free proof/no-computed proof/verification, mirroring Spec 035's status doc). **Verify**: status doc records 115→115, 4 flips, pay-free + no-computed proofs, byte-identical impact set.
- [X] T042 Update `CLAUDE.md` active-feature block → Spec 036 IMPLEMENTED (Spec 035 → History). **Verify**: active feature = Spec 036; Spec 035 moved to history; no other law edited.
- [X] T043 Full verification run — from `academy-dashboard-discovery/app`: `npm run build && npm test && node tests/screenshots/capture.cjs`. **Verify**: build 115; `npm test` exit 0 (smoke PASS + a11y 0/0); screenshots 0 console errors.
- [X] T044 Final diff review — `git status --short`, `git diff --stat`, `git diff -- .../package.json`, `git diff -- .../scripts/build-html.mjs`, `git diff -- .../src/js/enhance.js`, `git diff -- .../src/js/i18n.js`, `find public -name '*.html' | wc -l`. **Verify**: count 115; package.json/enhance.js/build-html.mjs/i18n.js **0-diff**; nav.config = only 4 flips + FUTURE_ROUTES trim; only `teacher-performance.js`+`fixtures/teacher-performance.js`+`ar/en.trn.js`(+app.css) among teacher source; `teachers.js`/`teacher.js`/`teacher-actions.js` 0-diff; no backend/API; no new dependency.
- [X] T045 (Opus) `$clean-code-guard` — run before reporting. **Verify**: 0 blockers (scope creep, count drift, wrong nav flips, new page drift, fake teacher/category/KPI/monthly, computed score/rank/percentage/chart, canvas, salary/pay/rate/fine/payout/currency figure, fake success wording, type=file/password, backend/API/websocket/external, package drift, locale divergence, raw key, href="#", dead button, a11y serious/critical, mobile overflow, role-law regression, teacher pay-free regression).
- [X] T046 (Opus) `$test-guard` — run before reporting. **Verify**: tests additive only; no role-law/no-fake/Spec-032/teacher-pay assert weakened; no hardcoded pass hides a fake; the tab tests truly load `#view=sessions-kpi`/`#view=monthly`; the drawer tests truly open trn-add/trn-categories; tests re-run green after any fix.

---

## Dependencies & ordering
- **Phase 1** → **Phase 2** (foundation blocks all).
- Phase 2 shared chain: **T007 → T008 → T009 → T010 → T011**.
- **Phases 6 & 7 both edit `pages/teacher-performance.js`** — strictly serial: T023 (tabs refactor) → T024 (sessions-kpi board) → T028 (monthly board). T023 must land first (adds the tabs widget both tabs live in).
- **Phases 4–5 (US1/US2)** depend on the Phase 2 nav flips; otherwise independent (verification-only, teachers.html reused unchanged).
- **Phase 8** depends on US1–US4. **Phase 9** depends on Phase 8. **Phase 10** depends on Phase 9 (guards T045/T046 last).

## Parallel opportunities
- `[P]` tasks: **T038** (REVIEW.md), **T040** (README), **T041** (implementation-status.md) — 3 parallelizable (independent docs). The locale proof (T013) is tied to the shared trn pair and follows T008.
- The 4 grounding notes (T016/T019/T022/T027) are independent read-only research; each gates its phase.
- **Never `[P]`**: T007–T011 (shared fixture/locale/nav chain), T023/T024/T028 (same page file, serial), T034/T036/T037 (shared test files), T031–T033/T043–T046 (audits).

## MVP / safest path
- **Safest first slice = US1 + US2** (addTeacher + teacherCategories fold anchors): nav-flip + verification only, `teachers.html` body byte-identical, near-zero blast radius; removes 2 of 4 «قريبًا».
- **US3 + US4** (the teacher-performance tabs) are the only body change (the sanctioned one) and the main build/test effort; do them after the count-0 anchors so the risky refactor is isolated. Full MVP = all four (required for 0 «قريبًا» in the teachers category).

## Confirmations
- No implementation performed by this step. No app source modified. No commit. No push. Only prior app-source touch across the spec = `.specify/feature.json` → 036.

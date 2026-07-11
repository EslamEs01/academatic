# Tasks — Spec 035: Families & Students Nav Completion

**Feature dir**: `academy-dashboard-discovery/specs/035-families-students-nav-completion/`
**Branch**: `feature/012-role-portal-foundation` · **Baseline**: HEAD `1eb4d9a`, public HTML **113** → target **115** (+2).
**Locked plan**: `plan.md` (D1–D31) + `contracts/*`. **This file plans work only — no implementation, no commit.**

## Legend & rules
- Format: `- [ ] T### [P?] [US?] action — exact path. **Verify**: measurable check.`
- `[P]` = parallelizable (independent file, no incomplete-task dep). Shared files are **never** `[P]`: `nav.config.js`, `build-html.mjs`, `i18n.js`, `fixtures/schedule-search.js`, `locales/ar.ssr.js`, `locales/en.ssr.js`, `pages/schedule-search.js`, `app.css`, `tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`.
- **Absolute no-fake laws** (binding on every task; see `contracts/no-fake-academic-actions-contract.md` + `no-computed-score-rank-chart-contract.md`): no fake booking/assignment/category-save/result-calc/evaluation-calc; no computed score/rank/GPA/%/rubric-total; no chart/`<canvas>`; no fake publish/export/PDF; no fake success wording; no row/status/result mutation; no backend/API/db/auth/websocket/external-request/dependency; no `type=file`/`type=password`/secret; no `href="#"`/raw key/dead button; **no `package.json` change**.
- **Allowed**: display-only authored fixtures; client-side filtering of authored rows; real filter/search UI; read-only result/evaluation surfaces; frontend forms/drawers; `backendRequired` final Book/Assign/Save/Reclassify; deep-links to existing tabs; folded-owner anchors.

## Model routing (workflow/agent guidance)
- **Opus**: visual-grounding synthesis, schedule-search architecture, page-vs-deep-link validation, no-fake/no-engine boundary, no-computed-score boundary, child-view/role-law review, smoke/a11y guard strategy, final clean-code/test-guard review.
- **Sonnet**: repetitive fixture rows, AR/EN locale mirroring, simple card/list/table sections, screenshot config, docs/checklist updates.
- **Do not parallelize** edits to any shared file above; author the schedule-search page (Opus) and its fixture/locale (Sonnet) as a serial chain (fixture → locale → i18n → page → build-html → nav → build).

---

## Phase 1 — Setup / Preflight (no story label)

- [X] T001 Confirm branch + HEAD + clean tree — run `git status --short`, `git rev-parse --short HEAD`, `git branch --show-current`. **Verify**: branch = `feature/012-role-portal-foundation`; HEAD = `1eb4d9a` or later; working tree shows only `.specify/feature.json` + the `035-…` spec dir (no app-source changes yet).
- [X] T002 Confirm feature pointer — `cat .specify/feature.json`. **Verify**: `feature_directory` = `academy-dashboard-discovery/specs/035-families-students-nav-completion`.
- [X] T003 Confirm Spec 035 plan artifacts exist — `ls academy-dashboard-discovery/specs/035-families-students-nav-completion/{plan.md,research.md,data-model.md,quickstart.md} contracts/`. **Verify**: plan.md, research.md, data-model.md, quickstart.md present + 16 contracts.
- [X] T004 Confirm baseline count — `find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l`. **Verify**: **113**. STOP if not 113.
- [X] T005 Baseline gate — from `academy-dashboard-discovery/app`: `npm run build && npm run test:smoke && npm run test:a11y`. **Verify**: build green (113); smoke PASS; a11y critical=0 serious=0. STOP if any fails.

---

## Phase 2 — Foundation / Registration (no story label; blocks all stories)
> Serial chain (shared files). Creates the schedule-search surface + wires the 4 nav flips so the build reaches 115.

- [X] T006 (Sonnet) Create authored fixture — `academy-dashboard-discovery/app/src/js/fixtures/schedule-search.js` exporting `SS_KPIS` (authored literals), `SS_CANDIDATES` (rows: `id, teacherKey, subjectKey/categoryId, dayId, slotId, startKey, endKey, availabilityId, roomKey?`) and facet vocabs `SS_TEACHERS/SS_CATEGORIES/SS_DAYS/SS_SLOTS/SS_AVAILABILITY`. **Verify**: module imports without error (`node -e "import('./src/js/fixtures/schedule-search.js')"`-equivalent via build); 0 PII, 0 pay/price/money token, 0 score/rank/GPA/percentage token, 0 `canvas`.
- [X] T007 (Sonnet) Create locale pair — `academy-dashboard-discovery/app/src/locales/ar.ssr.js` + `en.ssr.js` under `ssr.*` (title/sub/searchPh, filter labels, result/chip labels, empty-state, gate reason `ssr.reason.backend`, KPI labels). **Verify**: `ar.ssr.js` and `en.ssr.js` key trees identical (0 divergence).
- [X] T008 Register locale pair (SHARED) — edit `academy-dashboard-discovery/app/src/js/i18n.js`: `import arSsr/enSsr` + `deepMerge(ar,arSsr)`/`deepMerge(en,enSsr)`. **Verify**: 13 mirrored pairs registered; build reports 0 raw keys.
- [X] T009 (Opus) Create page module — `academy-dashboard-discovery/app/src/js/pages/schedule-search.js` exporting `renderScheduleSearch()`, mirroring `pages/leads.js`: `pageHeader`+`summaryCards(SS_KPIS)` + `filterBar({targetId:'ss-results',…,selects:[teacher,category,day,timeWindow,availability]})` + `#ss-results` authored rows via `facetAttrs({search,teacher,category,day,slot,availability})` + `noResults()` + optional `previewTemplate('ss-<id>')` + Book/Assign `data-disabled-reason` gate. **Verify**: exports `renderScheduleSearch`; no `type=file`/`type=password`/`<canvas>`/`href="#"`/pay token; every final is a `data-disabled-reason` gate.
- [X] T010 Register page (SHARED) — edit `academy-dashboard-discovery/app/scripts/build-html.mjs`: `import { renderScheduleSearch }` + PAGES entry `{ base:'schedule-search', activeId:'scheduleSearch', titleKey:'ssr.title', crumbKey:'nav.scheduleSearch', render:renderScheduleSearch }`. **Verify**: exactly 1 new PAGES entry; build emits `schedule-search.html` + `schedule-search.en.html`.
- [X] T011 (SHARED) Additive CSS if needed — `academy-dashboard-discovery/app/src/styles/app.css` add only `.ss-*` results/grid classes (theme-aware; any motion inside the existing `prefers-reduced-motion: no-preference` block). **Verify**: diff is additive (no existing rule changed); no new CSS framework.
- [X] T012 (SHARED) Nav flips — edit `academy-dashboard-discovery/app/src/js/nav.config.js`: flip the 4 items `planned→implemented` + route (`familyCategories`→`families.html`, `scheduleSearch`→`schedule-search.html`, `studentResult`→`student.html#view=results`, `studentEvaluation`→`student.html#view=evaluation`); remove `FUTURE_ROUTES.studentResult` + `.studentEvaluation`. **Verify**: exactly 4 items changed; build guard (lines 150-156) passes; no other nav item touched; `FUTURE_ROUTES` no longer has studentResult/studentEvaluation.
- [X] T013 Foundation build gate — `npm run build && find public -name '*.html' | wc -l`. **Verify**: **115**; only new files are `schedule-search.html` + `.en`; `git diff -- academy-dashboard-discovery/app/package.json` empty (0-diff).

---

## Phase 3 — Fixtures / Locales / CSS content QA (no story label)

- [X] T014 (Sonnet) Complete authored candidate rows + facet vocab in `fixtures/schedule-search.js` (teacher/category/day/time-window/availability coverage sufficient to exercise every filter + reach an empty state). **Verify**: ≥1 row per availability state; at least one filter combination yields 0 rows (empty-state reachable); availability is an authored enum, never computed.
- [X] T015 (Sonnet) [P] Mirror + proof AR/EN copy in `locales/ar.ssr.js` / `en.ssr.js`. **Verify**: key sets equal (diff of sorted keys = empty); grep for `⟦` in built `schedule-search.html`/`.en` = 0.
- [X] T016 Fixture/page purity scan — grep `fixtures/schedule-search.js` + `pages/schedule-search.js`. **Verify**: 0 hits for pay/price/money/salary/rate; 0 for score/rank/gpa/percentage/rubric-total; 0 for `canvas`; 0 for `type=file`/`type=password`/token/secret/webhook.
- [X] T017 CSS additive audit — `git diff -- academy-dashboard-discovery/app/src/styles/app.css`. **Verify**: only additions (new `.ss-*`), no edits/removals of existing selectors; motion (if any) inside the reduced-motion block.

---

## Phase 4 — US1: Family Categories Fold Anchor

**Goal**: `familyCategories` becomes a real anchor to `families.html`; the existing category surface stays reachable; no fake mutation. **Independent test**: click Family Categories → families.html with category filter + `fam-cat` drawer (gated Save).

- [X] T018 [US1] Grounding note (families/familyCategories) — produce the "Targeted Visual Grounding — Complete" note from `families.js:32`, `family.js:68/149-165`, `families.js:39`, legacy `management-categories-families*.md`, Spec 027 M-K / 033 CS-06. **Verify**: note records surface=families.html, decision=fold-anchor count 0, forbidden=fake category create/save/mutation.
- [X] T019 [US1] Confirm the nav flip landed (from T012) — inspect `nav.config.js`. **Verify**: `familyCategories` is `implemented`, `route:'families.html'`; renders a real `<a>` (not «قريبًا»/`data-coming-soon`). No re-edit here (single edit lives in T012).
- [X] T020 [US1] Verify fold reachability + body invariance — build then diff. **Verify**: `families.html`/`.en` load; category filter present (families.js:32); `fam-cat` drawer + `data-disabled-reason` Save (`fam.cat.reclassReason`) present; `families.html`/`family.html` `#page-body` byte-identical HEAD→working (only the shared sidebar differs); no `familyCategories` standalone page created.

---

## Phase 5 — US2: Schedule Search Page

**Goal**: a real display-only availability-search page (search + authored results + empty state), Book/Assign gated. **Independent test**: load schedule-search AR/EN, change a filter → rows narrow / empty state; Book/Assign shows a reason and mutates nothing; 0 external request.

- [X] T021 [US2] Grounding note (scheduleSearch) — produce the note from `schedule.js:45-77` (browse≠search), `leads.js` precedent, legacy `management-search-schedule.md` (from/to window, category[], availability/courses toggles), Spec 027 M-S / 033 CS-07. **Verify**: note records decision=standalone page +2, mechanism=client-side facet over authored fixtures, forbidden=engine/booking/mutation/pay.
- [X] T022 [US2] Header + KPIs in `pages/schedule-search.js` — `pageHeader({titleKey:'ssr.title',subKey:'ssr.sub',summaryHTML:summaryCards(SS_KPIS)})`. **Verify**: rendered header + KPI cards from authored literals (no computed value).
- [X] T023 [US2] Search/filter form in `pages/schedule-search.js` — `filterBar` with search + selects: teacher, category/course, day, time-window (from/to bucket), availability status. **Verify**: all controls render; each `<select>` has `data-filter="<facet>"`; no `type=file`/`type=password`.
- [X] T024 [US2] Results board in `pages/schedule-search.js` — `#ss-results` of candidate rows (teacher name + subject/category + day + start–end + availability chip icon+label) via `facetAttrs`. **Verify**: rows render; each carries `data-row` + facet attrs; no pay/rate figure; availability chip is icon+text.
- [X] T025 [US2] Empty state + optional detail drawer — `noResults()` + initial hint; optional read-only `previewTemplate('ss-<id>')`. **Verify**: applying a no-match filter reveals the empty state; drawer (if built) is read-only with a gated final.
- [X] T026 [US2] Book/Assign/Add-to-schedule gate in `pages/schedule-search.js` — `data-disabled-reason data-reason-key="ssr.reason.backend" aria-disabled="true"`. **Verify**: clicking mutates no row/status, fires no request, shows only the reason; 0 fake-success wording.
- [X] T027 [US2] Behavioral load/filter check — serve `public/` and load `schedule-search.html` + `.en`. **Verify**: both load; a facet change narrows visible `#ss-results` rows client-side (attribute/CSS only); **0 external request** on load + interaction (network log empty); active nav pill = `scheduleSearch`.
- [X] T028 [US2] No-engine / no-mutation proof — inspect `pages/schedule-search.js` + `enhance.js`. **Verify**: filtering reuses the existing `data-filter` mechanism (no new hook/storage key); `enhance.js` 0-diff; no availability computation; no `fetch`/`XHR`/`WebSocket`/`import()` of network.

---

## Phase 6 — US3: Student Results Deep-Link

**Goal**: `studentResult` → `student.html#view=results` (existing display-only tab). **Independent test**: click Student Results → Results tab active via hash; no computed score/chart.

- [X] T029 [US3] Grounding note (studentResult) — from `student.js:233/242`, `result-summary.js` header, `tabs.js:4`+`enhance.js:265`, legacy audited-absent + Spec 027 M-R / 029 R-L / 033 CS-08. **Verify**: note records decision=deep-link count 0, no aggregate board, no computed figure.
- [X] T030 [US3] Confirm nav flip landed (from T012) — inspect `nav.config.js`. **Verify**: `studentResult` `implemented`, `route:'student.html#view=results'`; `FUTURE_ROUTES.studentResult` removed; real anchor (no «قريبًا»). No re-edit here.
- [X] T031 [US3] Verify deep-link + display-only invariance — load `student.html#view=results` + `.en`. **Verify**: Results tab is the active view via `#view=`; `result-summary.js` byte-identical HEAD→working; `student.html` `#page-body` byte-identical; no new score/rank/GPA/%/`canvas` token; Export stays `disabled` gate, no `.pdf`/`window.open`; count unchanged by this item.

---

## Phase 7 — US4: Student Evaluation Deep-Link

**Goal**: `studentEvaluation` → `student.html#view=evaluation` (existing display-only rubric tab). **Independent test**: click Student Evaluation → Evaluation tab active; no computed total; Approve gated.

- [X] T032 [US4] Grounding note (studentEvaluation) — from `student.js:234/243`, `evaluation-rubric.js` header + `:60` Approve gate, legacy audited-absent + Spec 027 M-R / 029 R-F/US3 / 033 CS-09. **Verify**: note records decision=deep-link count 0, categorical ratings only, no total.
- [X] T033 [US4] Confirm nav flip landed (from T012) — inspect `nav.config.js`. **Verify**: `studentEvaluation` `implemented`, `route:'student.html#view=evaluation'`; `FUTURE_ROUTES.studentEvaluation` removed; real anchor. No re-edit here.
- [X] T034 [US4] Verify deep-link + display-only invariance — load `student.html#view=evaluation` + `.en`. **Verify**: Evaluation tab active via `#view=`; `evaluation-rubric.js` byte-identical; `student.html` `#page-body` byte-identical; ratings categorical (no number/total/`canvas`); Approve = `common.backendRequiredNote` gate; count unchanged by this item.

---

## Phase 8 — Nav / Count / Link Integrity (no story label)

- [X] T035 Count + menu invariants — build + `find public -name '*.html' | wc -l`; inspect `nav.config.js`. **Verify**: **115**; admin-menu **50** items; families category **0** planned items; exactly **4** scoped flips; no unrelated route added/removed; all 113 prior files still present.
- [X] T036 Hash-route link integrity — confirm the nav/link-integrity smoke resolves `student.html#view=results` / `#view=evaluation` by stripping `#…` to the existing file (optionally assert the tab id exists). **Verify**: 0 dead links / 0 badTarget; the two deep-links are not flagged; `schedule-search.html` route resolves to the built file.
- [X] T037 No-accidental-removal proof — `git diff --name-status` on `public/`. **Verify**: only `schedule-search.html`/`.en` added; every other admin page changed only in its shared sidebar region; portals ×16 + index byte-identical.

---

## Phase 9 — Smoke / A11y / Screenshots (no story label; additive only)

- [X] T038 (Opus) Smoke additive block (SHARED) — `academy-dashboard-discovery/app/tests/smoke/run.cjs`: add `schedule-search` to PAGES; route-freeze 113→115; assert 4 nav flips (no «قريبًا», `plannedNavAnchors===0`, families 0 planned, admin-menu 50); schedule-search form/`#ss-results`/empty/gates + facet-narrows + **0 external request** + no pay/`type=file`/`type=password`/`<canvas>`; `student.html#view=results` + `#view=evaluation` open the right tab; no new computed-score/chart token; global `href="#"`=0/raw-keys=0/dead-buttons=0. **Verify**: `npm run test:smoke` PASS; protected regexes (`payHit`/`payFigure`/`famPay`/child-view + 026–034) byte-verbatim in the diff.
- [X] T039 Smoke behavioral checks are real (not hardcoded) — review the added smoke code. **Verify**: the schedule-search filter test actually changes a filter and observes results/empty; the student deep-link tests actually load `#view=results`/`#view=evaluation`; no `assert(true)`/hardcoded pass hides a fake behavior.
- [X] T040 (SHARED) A11y rows — `academy-dashboard-discovery/app/tests/a11y/run.cjs`: add schedule-search AR/EN light+dark, mobile-390, open-filter/open-drawer rows (+ student deep-link tab rows if needed). **Verify**: `npm run test:a11y` critical=0 serious=0 (fix any `scrollable-region-focusable` on a results wrapper via `tabindex="0" role="region" aria-label`, per tasks.js:99).
- [X] T041 (SHARED) Screenshots — `academy-dashboard-discovery/app/tests/screenshots/capture.cjs`: add frames for schedule-search (form/results/empty), families fold proof, `student.html#view=results`, `student.html#view=evaluation`; AR/EN, dark, mobile-390. **Verify**: `node tests/screenshots/capture.cjs` → 0 console errors; capture handler for schedule-search fires no network call.
- [X] T042 [P] Update `academy-dashboard-discovery/app/screenshots/REVIEW.md` with the new frames. **Verify**: REVIEW.md lists every new sp035 frame.
- [X] T043 Sanctioned-amendment log — in the smoke diff header, record the two sanctioned amendments (route-freeze 113→115 + `schedule-search` PAGES entry; repoint any families-panel planned-item probe since families now has 0 planned). **Verify**: no protected assert edited; only the two documented amendments present.

---

## Phase 10 — Docs / Final Audit + Guards (no story label)

- [X] T044 [P] Update `academy-dashboard-discovery/app/README.md` with the Spec-035 surfaces (schedule-search page + 3 fold/deep-link resolutions). **Verify**: README names the new page + the 4 nav resolutions + count 115.
- [X] T045 [P] Write `academy-dashboard-discovery/specs/035-families-students-nav-completion/implementation-status.md` (counts/invariants/no-fake proof/verification, mirroring Spec 034's status doc). **Verify**: status doc records 113→115, 4 flips, no-fake/no-computed proofs, byte-identical impact set.
- [X] T046 Update `CLAUDE.md` active-feature block → Spec 035 IMPLEMENTED (Spec 034 → History). **Verify**: active feature = Spec 035; prior Spec 034 moved to history; no other law edited.
- [X] T047 Full verification run — from `academy-dashboard-discovery/app`: `npm run build && npm test && node tests/screenshots/capture.cjs`. **Verify**: build 115; `npm test` exit 0 (smoke PASS + a11y 0/0); screenshots 0 console errors.
- [X] T048 Final diff review — `git status --short`, `git diff --stat`, `git diff -- .../package.json`, `git diff -- .../nav.config.js`, `git diff -- .../build-html.mjs`, `find public -name '*.html' | wc -l`. **Verify**: count 115; package.json 0-diff; nav.config = only 4 flips + FUTURE_ROUTES trim; build-html = +1 import/entry; no backend/API/auth; no new dependency; no unrelated role-page drift beyond the shared sidebar.
- [X] T049 (Opus) `$clean-code-guard` — run before reporting. **Verify**: 0 blockers (scope creep, count drift, wrong nav flips, fake booking/category-save/result-eval calc, computed score/rank/chart, canvas, fake success wording, type=file/password, backend/API/websocket/external API, package drift, locale divergence, raw key, href="#", dead button, a11y serious/critical, mobile overflow, role-law regression).
- [X] T050 (Opus) `$test-guard` — run before reporting. **Verify**: tests additive only; no role-law/no-fake/Spec-032 assert weakened; no hardcoded pass hides a fake; the schedule-search filter test truly toggles a filter and observes results/empty; the student deep-link tests truly load `#view=results`/`#view=evaluation`; tests re-run green after any fix.

---

## Dependencies & ordering
- **Phase 1** → **Phase 2** (foundation blocks everything).
- Within Phase 2 the shared chain is strictly serial: **T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013**.
- **Phase 3** QA depends on T006–T012. **Phases 4–7 (US1–US4)** depend on Phase 2 (nav flips + page + deep-links) and are otherwise independently testable.
- **Phase 8** depends on US1–US4. **Phase 9** depends on Phase 8. **Phase 10** depends on Phase 9 (guards T049/T050 run last).

## Parallel opportunities
- `[P]` tasks: **T042** (REVIEW.md), **T044** (README), **T045** (implementation-status.md) — 3 parallelizable (independent docs, no shared-file dep).
- The 4 grounding notes (T018/T021/T029/T032) are independent read-only research and may be drafted concurrently, but each must precede its phase's edits (kept unmarked as phase gates).
- **Never `[P]`**: T008/T010/T012 (shared nav/build/i18n), T006/T007/T009/T011 (shared page/fixture/locale/css chain), T038/T040/T041 (shared test files), T035–T037/T047–T050 (audits).

## MVP / safest path
- **Safest first slice = US1 (Family Categories)** + **US3/US4 (deep-links)** — all count-0, reuse existing surfaces, near-zero risk (nav-flip + verification only). Ship these to remove 3 of the 4 «قريبًا» with minimal blast radius.
- **US2 (Schedule Search)** is the only new page (+2) and the main build/test effort; do it after the count-0 items so the risky work is isolated. Full MVP = all four (required to hit 0 «قريبًا» in the families category and count 115).

## Confirmations
- No implementation performed by this step. No app source modified. No commit. No push. Only prior app-source touch across the spec = `.specify/feature.json` → 035.

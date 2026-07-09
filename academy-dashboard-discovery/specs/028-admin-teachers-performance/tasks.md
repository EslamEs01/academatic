# Tasks: Spec 028 — Admin Teachers / Performance Deep Management

**Input**: Design docs in `academy-dashboard-discovery/specs/028-admin-teachers-performance/`
**Prerequisites**: `plan.md` (count STAYS 97, zero new pages; all-teachers-timetable folds into `schedule.html`), `spec.md` (US1–US9), `research.md` (D1–D41), `data-model.md`, `contracts/` (21).
**Baseline**: Spec 027 committed, HEAD `f10cc56`, 97 public HTML, tests green. Branch `feature/012-role-portal-foundation`.

**Tests**: smoke + a11y + screenshots are acceptance-binding (Phase 11). All test edits are additive; the protected asserts (`payHit`/`tchPay`/`famPay`/`payFigure`/child-view/admin-finance + Spec-026/027 action-completion) stay byte-verbatim.

**Organization**: grouped by user story. **US1 Teacher Management = MVP** (exercises kebab + modal + confirm + gate on one domain; US2–US6 replicate the pattern).

## Format: `[ID] [P?] [Story?] Description with file path + verification`
- **[P]** = parallelizable (different files, no dependency on an incomplete task).
- **[Story]** = US1…US9. Setup / Foundational / cross-cutting / docs phases carry no story label except where a story's acceptance is verified.

## Standing laws (every task)
- **Count 97 — zero new pages.** all-teachers-timetable **folds into the existing `schedule.html` teacher-lens** (already present, `schedule.js:49-56`); `schedule.js` stays read-only. `teacherCategories` nav stays planned.
- **No-fake law**: no fake create/edit/delete/status-change/assign/schedule-mutation/availability-mutation/score/rank/chart/payroll/export/message. Only honest: real page · modal · drawer · static tab/filter · `backendRequired` gate · planned/permission gate · display-only · confirm-with-backendRequired-final.
- **Closed hook set only**: `data-modal-trigger`(+title/note), `data-confirm[-danger]`, `data-drawer`, `data-disabled-reason`(+`data-reason-key`), `data-tab`, `data-filter`/`data-filter-set`, `data-row-menu`(+`-kind`). The teachers card kebab reuses `data-row-menu` via a `teacherMenu` variant + one `'teacher'` dispatch branch — **NO new hook/storage key/engine**.
- **Pay-finance law**: omit Salary/Payout fieldsets from create/edit modals; assign-teacher pickers show name/subjects/workload only (no rate); no compensations/salary tab on teacher.html; the unused `rating` fixture field stays unsurfaced; teacher-performance stays display-only + figure-free.
- **Role laws byte-verbatim green**: teacher portal pay-free (16 `teacher-*` files byte-identical; `teacher-performance.html` is the sanctioned admin exempt board — NOT grepped to 0, never linked from the portal), family zero-pay, student child-view, admin finance Spec-009 invariant. All Spec-026/027 protections held.
- **No commit / no push** — the watcher commits.

**File-touch map (shared-file serializations)**: `enhance.js` = US1 only (teacherMenu). `components/course-group-actions.js` = US2 only. `components/teacher-actions.js` + `pages/teacher.js` = US3 only (teacher-detail incl. the assign-from-teacher pickers). `pages/teachers.js` = US1 → US4 (sequential). `pages/course.js`/`pages/group.js` = US2 only. `pages/teacher-performance.js` = US5 only. `locales/{ar,en}.trn.js` = ALL copy in the Foundations task (single). `fixtures/teacher-management.js` = new (Foundations). `tests/smoke/run.cjs` = one amendment. `schedule.js` = read-only (verify).

---

## Phase 1: Setup / Preflight

- [ ] T001 Verify HEAD + branch (`git rev-parse --short HEAD`; `git branch --show-current`) — verification: HEAD `f10cc56`, branch `feature/012-role-portal-foundation`.
- [ ] T002 Verify `.specify/feature.json` → 028 — verification: `feature_directory` == `academy-dashboard-discovery/specs/028-admin-teachers-performance`.
- [ ] T003 Verify Spec 027 committed baseline + count 97 in `academy-dashboard-discovery/app/public` — verification: `find public -maxdepth 1 -name '*.html' | wc -l` == 97; working tree has no app-source diffs.
- [ ] T004 Run baseline build in `academy-dashboard-discovery/app` (`npm run build`) — verification: exit 0; count stays 97.
- [ ] T005 Run baseline smoke + a11y (`npm run test:smoke` + `npm run test:a11y`) — verification: `[smoke] PASS`; a11y `critical=0 serious=0`.
- [ ] T006 Load `contracts/scope-guard.md` + the other 20 contracts; record the allowed/forbidden edit surface — verification: allowed/forbidden captured; no forbidden file (esp. no teacher-portal file) will be touched.
- [ ] T007 Confirm no implementation before task generation — verification: `git status --short` shows only the 028 spec dir + `feature.json` + `CLAUDE.md`; zero `src/`/`public/` diffs.

**Checkpoint**: baseline green, count 97, scope loaded.

---

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ No user-story task may begin until Phase 2 is complete.**

- [ ] T008 [P] Create additive fixture `academy-dashboard-discovery/app/src/js/fixtures/teacher-management.js` — display-only: `ASSIGN_TEACHERS` (single-teacher candidates: nameKey + subjects/workload metaKey), `ASSIGN_COURSES`, `ASSIGN_GROUPS`, `TEACHER_CATEGORIES` (+ `CATEGORY_MEMBERS`), `AVAILABILITY_WINDOWS` (day-pair/time-pair rows) — derived from existing `TEACHERS`/`COURSES`/`GROUPS` — verification: exports carry no computed value/score and **no pay token** (`grep -E 'راتب|salary|payroll|rate|fine|[$€£]|EGP|AED|EUR' = 0`); no persisted state.
- [ ] T009 [P] Add mirrored teacher keys to `academy-dashboard-discovery/app/src/locales/ar.trn.js` + `en.trn.js` (`trn.*`): kebab menu labels, edit/note modal titles, status/vacation/deactivate/activate/delete confirm keys, availability keys, category create/edit/assign keys, assign-teacher picker titles/hints/CTAs, reset-password/login-as gate reasons; reuse `common.backendRequiredNote` — verification: AR/EN key sets identical; no raw keys at build; **no pay tokens**; no `«لوحة الطالب»`.
- [ ] T010 [P] Additive CSS in `academy-dashboard-discovery/app/src/styles/app.css` **only if needed** (card kebab, availability rows) — verification: additive only; pickers reuse `sheet-*`/`icon-btn`/`btn`; expected 0 lines (skip if none).
- [ ] T011 Verify the closed `data-*` hook set is preserved (read-only over `academy-dashboard-discovery/app/src/js/enhance.js`) — verification: plan introduces NO new `data-*` dispatch hook/storage key; `teacherMenu` will reuse `data-row-menu`; matches `contracts/modal-drawer-picker-contract.md`.

**Checkpoint**: fixtures + locales + CSS ready; page/component wiring can begin.

---

## Phase 3: US1 — Teacher Management (Priority: P1) 🎯 MVP

**Goal**: teachers list gains an honest per-card kebab (View · Edit modal · On-Vacation/Deactivate confirm · Delete confirm); teacher-detail Edit/Add-note become modals and status/delete become confirms; Add-teacher stays an honest modal — every final backendRequired; no pay figure.

**Independent test**: `teachers.html` cards carry `data-row-menu-kind="teacher"`; kebab opens (View real · Edit modal · Suspend/Delete confirm); no pay figure; count 97.

- [ ] T012 [US1] Add `teacherMenu(id)` builder (View real link · Edit `data-modal-trigger` · On-Vacation/Deactivate `data-confirm` · Delete `data-confirm-danger`) + a `'teacher'` branch in the `data-row-menu` dispatch in `academy-dashboard-discovery/app/src/js/enhance.js`, mirroring `familyMenu`/`studentMenu` — verification: dispatch routes `data-row-menu-kind="teacher"` → `teacherMenu`; each entry honest; no new dispatch hook/storage key. **NOT [P]** (shared `enhance.js`).
- [ ] T013 [P] [US1] Add an optional `menuId`/`menuKind` kebab slot to `academy-dashboard-discovery/app/src/js/components/directory-card.js` `directoryCard()` (renders a `data-row-menu` kebab ONLY when passed) — verification: kebab renders only for teacher cards; `directoryCard()` (called only by `teachers.js`) leaves all other output byte-identical.
- [ ] T014 [US1] Wire the kebab in `academy-dashboard-discovery/app/src/js/pages/teachers.js` `card()` (pass `menuId: tr.id, menuKind:'teacher'`) — verification: `grep -c data-row-menu-kind="teacher" public/teachers.html` > 0 (was 0); each row a kebab. Depends on T012+T013. **NOT [P]** (shared with US4 T029).
- [ ] T015 [P] [US1] Teacher pay-free + no-`rating` scan (read-only) over `academy-dashboard-discovery/app/public/teachers.html` — verification: no pay figure; `rating` field not rendered.
- [ ] T016 [US1] Build + targeted teachers smoke in `academy-dashboard-discovery/app` — verification: `npm run build` == 97; teachers card kebab present + honest (View real · Edit modal · Suspend/Delete confirm).
- [ ] T017 [US1] Checkpoint — validate US1 against `academy-dashboard-discovery/app/public/teachers.html` + `spec.md` US1 independent-test — verification: card kebab + edit/status/delete honest; no pay figure; count 97 (MVP demoable).

---

## Phase 4: US2 — Assign Teacher to Course/Group (Priority: P1)

**Goal**: the M-N handoff — course/group assign-teacher gates become display-only single-teacher candidate-picker drawers → backendRequired; teacher stays read-only; no rate figure.

**Independent test**: `course.html`/`group.html` assign-teacher opens `crs-assign-teacher`/`grp-assign-teacher` drawers → backendRequired; candidate rows show name/subjects/workload only.

- [ ] T018 [US2] In `academy-dashboard-discovery/app/src/js/components/course-group-actions.js`: replace `off('crs.act.assignTeacher','crs.reason.assign')` → `drawerBtn('crs.act.assignTeacher','user-check','crs-assign-teacher')` (courseActions) and `off('grp.act.assignTeacher','grp.reason.assign')` → `drawerBtn(...,'grp-assign-teacher')` (groupActions) — verification: assign-teacher renders a `data-drawer` trigger (not a bare disabled gate). **NOT [P]** (shared file).
- [ ] T019 [P] [US2] Bake the `crs-assign-teacher` single-teacher picker `<template data-preview>` in `academy-dashboard-discovery/app/src/js/pages/course.js` (`ASSIGN_TEACHERS`, display-only + `data-disabled-reason` backendRequired final) — verification: template baked; candidate rows name/subjects/workload only; **no rate figure**.
- [ ] T020 [P] [US2] Bake the `grp-assign-teacher` picker `<template>` in `academy-dashboard-discovery/app/src/js/pages/group.js` — **SEPARATE** from the existing `grp-assign` student drawer — verification: `data-preview="grp-assign-teacher"` distinct from `grp-assign`; backendRequired final; no rate figure.
- [ ] T021 [US2] Build + targeted course/group smoke — verification: build == 97; assign-teacher opens the picker drawer → backendRequired; teacher stays read-only; no fake assignment; no rate.

---

## Phase 5: US3 — Teacher Detail / Availability (Priority: P2)

**Goal**: teacher-detail Edit/Add-note → modals; Notify stays confirm; On-Vacation/Deactivate/Activate/Delete → confirms; assign-course/group → drawer pickers; availability windows editor drawer; Reset-password/Login-as → future-backend gates; Message→026/future, Print→029 gates.

**Independent test**: edit/note modals + status/delete confirms + assign pickers + availability drawer all open → backendRequired; no fake schedule mutation; reset/login are future-backend gates.

- [ ] T022 [US3] Deepen `academy-dashboard-discovery/app/src/js/components/teacher-actions.js` `teacherActions()`: Edit (`demo`→`data-modal-trigger`), Add-note (`demo`→`data-modal-trigger`), keep Notify `confirmAction`; assign-course/group (`off`→`drawerBtn` `trn-assign-course`/`trn-assign-group`); add On-Vacation/Deactivate/Activate `confirmAction`s + Delete `confirm-danger`; Reset-password + Login-as = `data-disabled-reason` future-backend gates; keep Message (026/future) + Print (029) gates — verification: each action opens modal/confirm/drawer/gate → backendRequired; no fake status flip; no pay figure. **NOT [P]** (single shared file).
- [ ] T023 [US3] Bake the `trn-assign-course`, `trn-assign-group`, and `trn-availability` `<template data-preview>` drawers in `academy-dashboard-discovery/app/src/js/pages/teacher.js` (assign candidates from `ASSIGN_COURSES`/`ASSIGN_GROUPS`; availability day/time rows from `AVAILABILITY_WINDOWS`; Add/Update/Delete availability = `data-disabled-reason` backendRequired gates) + wire the availability trigger in the Timetable tab — verification: templates baked; availability writes = gates; **no invented recurrence**; no fake schedule mutation. Depends on T022. **NOT [P]** (shared `teacher.js`).
- [ ] T024 [P] [US3] No-fake-schedule + availability read-only scan over `academy-dashboard-discovery/app/public/teacher.html` — verification: availability Add/Update/Delete are backendRequired gates; no schedule mutation; no `rating`/pay figure.
- [ ] T025 [US3] Build + targeted teacher-detail smoke — verification: build == 97; edit/note modals, status/delete confirms, assign pickers, availability drawer all open honestly; reset/login = gates.
- [ ] T026 [US3] Checkpoint — validate US1+US2+US3 against `academy-dashboard-discovery/app/public/{teacher,teachers,course,group}.html` — verification: edit/note/status/delete/assign/availability all honest → backendRequired; count 97.

---

## Phase 6: US4 — Teacher Categories (Priority: P2)

**Goal**: teacher categories (grounded) surface as an in-flow Create/Edit modal + an assign-members drawer from `teachers.html`; `teacherCategories` nav stays planned; no page.

**Independent test**: category Create/Edit modal + assign-members drawer open → backendRequired; nav stays planned; count 97.

- [ ] T027 [US4] Add a "Manage categories" header action → `data-modal-trigger` Create/Edit category modal, and bake the assign-members `data-drawer` picker `<template>` (`CATEGORY_MEMBERS`, display-only + backendRequired) in `academy-dashboard-discovery/app/src/js/pages/teachers.js` — verification: category modal + assign-members drawer open → backendRequired; no fake category/member mutation. **NOT [P]** (shared `teachers.js`; sequential after T014).
- [ ] T028 [P] [US4] Verify `academy-dashboard-discovery/app/src/js/nav.config.js` `teacherCategories` stays `status:'planned'` (read-only) — verification: non-anchor planned gate; no `teacher-categories.html` page; count 97.
- [ ] T029 [US4] Build + targeted category smoke — verification: build == 97; create/edit modal + assign-members drawer honest; nav planned; no page.

---

## Phase 7: US5 — Teacher Performance (Priority: P2)

**Goal**: preserve the display-only board; add no computed metric; optional export gate → 029.

**Independent test**: board has no computed score/rank/chart and no pay figure; `rating` unsurfaced; export (if added) = gate.

- [ ] T030 [US5] Preserve `academy-dashboard-discovery/app/src/js/pages/teacher-performance.js` display-only; (optional) add a `data-disabled-reason` export gate → 029; add **no** computed score/rank/chart — verification: board stays counts + labeled signals + facet filters + real links; grep `score|rank|percentile|leaderboard|<canvas>|chart` in the board body = none; export = gate if added. **NOT [P]** if it also touches shared signals.
- [ ] T031 [P] [US5] No-score/rating read-only scan over `academy-dashboard-discovery/app/public/teacher-performance.html` + `academy-dashboard-discovery/app/src/js/components/teacher-signals.js` — verification: no computed rank/score/chart; `rating` unsurfaced; no pay figure added (teacher-performance.html is the sanctioned exempt board for pre-existing nav tokens only).
- [ ] T032 [US5] Build + targeted performance smoke — verification: build == 97; board display-only; no score/rank/chart/canvas; no new pay figure.

---

## Phase 8: US6 — All-Teachers-Timetable Fold (Priority: P3)

**Goal**: the cross-teacher timetable is served by the EXISTING `schedule.html` teacher-lens — no new page, no schedule.js code.

**Independent test**: `schedule.html` teacher filter exists over the Timetable view; `teacher.html`→`schedule.html#view=timetable` link is real; count 97; `schedule.js` unchanged.

- [ ] T033 [US6] **Verify-only**: `academy-dashboard-discovery/app/src/js/pages/schedule.js` already renders the admin teacher-lens (`teacher` filter over List+Timetable, `schedule.js:49-56`); `academy-dashboard-discovery/app/src/js/pages/teacher.js` keeps the real `schedule.html#view=timetable` link — verification: `grep 'data-filter="teacher"' public/schedule.html` present; teacher.html timetable link real; **no new page; `schedule.js` byte-unchanged**; count 97.
- [ ] T034 [US6] Checkpoint — all-teachers-timetable folded into schedule.html; count 97 held; no fake timetable mutation.

---

## Phase 9: US7 — Future-Owner Gates / Pay-Finance Exclusion (Priority: P2)

**Goal**: every out-of-scope teacher action stays an honest gate; zero pay/finance surface built.

- [ ] T035 [US7] Verify T-O…T-V + T-mat stay honest gates / not built across `academy-dashboard-discovery/app/src/js/components/teacher-actions.js` + `pages/teacher.js` — verification: T-O/T-P Compensations/Salary/Accounting/Salaries/Payouts→030 (not built); T-Q Payout-Providers→future-backend; T-R Teacher/Class-Feedback→029; T-S Login-as→future-backend; T-T Reset-password→future-backend; T-U session-reassign→026; T-V teacher-portal salary→excluded; T-mat→031 — each a `data-disabled-reason`/`data-coming-soon` gate or an unbuilt register entry.
- [ ] T036 [US7] Pay-finance exclusion enforcement over the admin teacher surfaces — verification: no Salary/Payout fieldset in any teacher create/edit modal; assign-teacher pickers show name/subjects/workload only; no compensations/salary tab on `teacher.html`; `grep -E 'راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|EGP|AED|EUR' public/teachers.html public/teacher.html` = 0; `rating` unsurfaced.
- [ ] T037 [US7] Verify no 029/030/031/future-backend domain built in 028 (`academy-dashboard-discovery/app/public`) — verification: no new finance/reports/settings/payroll page; count 97; forbidden-page grep = 0.

---

## Phase 10: US7 — Cross-Cutting Action Completion (Priority: P2)

- [ ] T038 [US7] Verify every T-row (T-A…T-W) resolved against `missing-action-register.md` — verification: each 028-owned row implemented (T-A/B/D/E/F/G/H/I/J/K + folds T-W) or owner-gated (T-O…T-V, T-mat); optional rows (T-C/L/M/N) recorded; 0 unresolved.
- [ ] T039 [US7] Verify every teacher/admin action opens page/modal/drawer/tab/gate across `academy-dashboard-discovery/app/public/{teachers,teacher,teacher-performance,course,group}.html` — verification: `current-teacher-action-inventory.md` classes all honest; 0 forbidden classes.
- [ ] T040 [US7] Verify no fake final + no persistence + no relationship/status/schedule mutation (built grep over `academy-dashboard-discovery/app/public/*.html`) — verification: 0 `«(تجريبي)»`/`(demo)`/`preview action`/`«بنجاح»`/`successfully`; picker selections never persist; confirm finals never claim done/saved; no roster/schedule/status change.
- [ ] T041 [US7] Verify `href="#"`=0, no dead buttons, no raw keys across `academy-dashboard-discovery/app/public/*.html` — verification: `grep -rl 'href="#"' public/*.html | wc -l` == 0; every `data-action` handled/gated; no `⟦key⟧` leakage.

**Checkpoint**: zero dead/fake actions; every T-row resolved.

---

## Phase 11: US8 — Smoke / A11y / Screenshots (Priority: P2) + US9 role laws

- [ ] T042 [US8] Extend `academy-dashboard-discovery/app/tests/smoke/run.cjs` additively (ONE sanctioned amendment): count 97; teachers/teacher/teacher-performance load; teachers card kebab honest; course/group + teacher-detail assign-teacher open picker → backendRequired; edit/note modals; status/delete confirms; availability drawer; category modal/drawer; teacher-performance no computed score/rank/chart; admin teacher surfaces no pay figure (excluding `teacher-performance.html`); 16 teacher-portal files byte-identical; `href="#"`=0; no dead/fake final. **Keep `payHit`/`tchPay`/`famPay`/`payFigure`/child-view/admin-finance + the Spec-026/027 asserts BYTE-VERBATIM** — verification: protected asserts unchanged (diff = additions only); no new action unasserted. **NOT [P]** (test file).
- [ ] T043 [US8] Run `npm run test:smoke` in `academy-dashboard-discovery/app` — verification: `[smoke] PASS`; count 97; all new asserts green.
- [ ] T044 [US9] Verify role-law asserts green (smoke output) — verification: teacher portal pay-free (`payHit`/`tchPay`), family zero-pay (`famPay`/`payFigure`), student child-view, admin finance Spec-009 invariant — all byte-verbatim green.
- [ ] T045 [US9] Verify impact protection via `git status --short academy-dashboard-discovery/app/public` + `git diff --stat HEAD -- academy-dashboard-discovery/app/package.json` — verification: only teachers/teacher/teacher-performance/course/group HTML changed; **16 teacher-portal + admin-ops + 9 Spec-027 pages + index byte-identical**; `schedule.html` byte-identical; `package.json` 0-diff.
- [ ] T046 [US8] Extend the a11y matrix in `academy-dashboard-discovery/app/tests/a11y/run.cjs` — teachers/teacher/teacher-performance + ≥1 edit modal + ≥1 assign picker (drawer) + ≥1 availability drawer + ≥1 confirm + ≥1 category drawer; dark/light; mobile-390 — verification: matrix additions present; gate aria labels; keyboard/focus safe. **NOT [P]** (test file).
- [ ] T047 [US8] Run `npm run test:a11y` — verification: `critical=0 serious=0`; mobile-390 no overflow.
- [ ] T048 [US8] Capture screenshots via `academy-dashboard-discovery/app/tests/screenshots/capture.cjs` — teachers(card-kebab)/teacher/teacher-performance + edit modal + assign picker + availability drawer + category surface + status confirm + mobile-390 + dark — verification: all surfaces captured; 0 console errors. **NOT [P]** (capture run).
- [ ] T049 [US8] Update `academy-dashboard-discovery/app/screenshots/REVIEW.md` with a Spec 028 section — verification: REVIEW.md references the captured teacher deep-management surfaces.

**Checkpoint**: smoke + a11y green; role laws held; screenshots captured.

---

## Phase 12: Docs / Final Audit & Cross-Cutting

- [ ] T050 [P] Update `academy-dashboard-discovery/app/README.md` (Spec 028 teacher deep-management summary; count stays 97; timetable fold) — verification: README notes 028 deltas; no count drift.
- [ ] T051 [P] Update `CLAUDE.md` active-feature pointer to Spec 028 IMPLEMENTED (count 97; per-area deltas; role laws green) — verification: pointer reflects implemented state.
- [ ] T052 [P] Add `academy-dashboard-discovery/specs/028-admin-teachers-performance/implementation-status.md`; append-only to 016/023/025/026/027 records only if needed — verification: 028 status recorded; prior records append-only.
- [ ] T053 Run clean-code-guard (scope-guard grep incl. source comments) over `academy-dashboard-discovery/app/src` — verification: no forbidden token (score/rank/chart/salary/pay/rating-surfaced) leaks in source OR comments; no unused imports; disclaimers reworded per convention.
- [ ] T054 Run test-guard: full `npm test` in `academy-dashboard-discovery/app` — verification: smoke + a11y green; no protected assert weakened.
- [ ] T055 Final diff review + forbidden-file proof — verification: `git diff --name-only HEAD` touches only allowed files (pages/{teachers,teacher,teacher-performance,course,group}, components/{teacher-actions,directory-card,course-group-actions,teacher-signals,teacher-status}, enhance.js, fixtures/teacher-management.js, locales/{ar,en}.trn.js, styles/app.css, tests/*, REVIEW.md, README.md, CLAUDE.md, 028 spec dir); `package.json`/backend/new-page/new-hook = 0; **no teacher-portal file changed**; count 97.
- [ ] T056 Confirm no commit / no push performed by the agent — verification: HEAD unchanged during implementation; the watcher commits; no `git commit`/`git push` run.

---

## Dependencies & Execution Order

### Phase order
Setup → Foundational (blocks all) → US1 → US2 → US3 → US4 → US5 → US6 → US7 (future-owner + action-completion) → US8 (QA) → Docs. US2/US3/US4/US5 can overlap after Foundations **subject to the shared-file serializations below**.

### Shared-file serializations (never [P] across these)
- `enhance.js`: **T012 only** (US1 `teacherMenu`).
- `components/course-group-actions.js`: **T018 only** (US2).
- `components/teacher-actions.js`: **T022 only** (US3).
- `pages/teacher.js`: **T023 only** (US3; assign + availability templates).
- `pages/teachers.js`: **T014 (US1) → T027 (US4)** sequential (same file).
- `locales/ar.trn.js`/`en.trn.js`: all copy in **T009** (single). `fixtures/teacher-management.js`: **T008** only. `styles/app.css`: **T010** only. `tests/smoke/run.cjs`: **T042** only. `tests/a11y/run.cjs`: **T046** only.

### Within a story
Wire fixtures/locales (Phase 2) before pages reference them. The kebab emit (T014) depends on the `teacherMenu` builder (T012) + the directory-card slot (T013). `teacher.js` templates (T023) depend on the `teacher-actions.js` triggers (T022). Each story's build/smoke runs after its wiring.

---

## Parallel Opportunities
- **Phase 2**: T008 ∥ T009 ∥ T010 (fixture, locales, CSS — distinct files).
- **Phase 3 (after T012)**: T013 (directory-card) ∥ T015 (scan).
- **Phase 4**: T019 (course.js) ∥ T020 (group.js).
- **Phase 5**: T024 (scan) ∥ the teacher.js/teacher-actions.js chain.
- **Phase 7**: T031 (scan) ∥ its phase.
- **Phase 12**: T050 ∥ T051 ∥ T052 (README, CLAUDE.md, spec records — distinct files).

### Parallel example: Phase 2 foundations
```bash
Task T008: Create fixtures/teacher-management.js (candidates + categories + availability windows)
Task T009: Add trn.* keys to ar.trn.js + en.trn.js
Task T010: Add kebab/availability CSS to app.css (only if needed)
```

---

## Implementation Strategy

### MVP first (US1 Teacher Management)
Setup → Foundational → US1 → **STOP & VALIDATE** (teachers kebab + edit/status/delete honest; no pay figure; count 97) → demo.

### Incremental delivery
US1 (MVP) → US2 Assign-teacher → US3 Teacher-detail/Availability → US4 Categories → US5 Performance → US6 Timetable-fold (verify) → future-owner + action-completion → QA (smoke/a11y/screenshots) → Docs. Each story adds value without breaking the previous; role-law asserts stay byte-verbatim green throughout.

---

## Traceability — T-row → task coverage

### 028-owned rows
| T-row | Action | Tasks |
|---|---|---|
| T-A | Teachers card kebab | T012 (builder+dispatch), T013 (slot), T014 (emit) |
| T-B | Edit teacher modal | T012 (kebab), T022 (banner) |
| T-C | Add teacher create enrichment (optional) | T022 (kept honest; optional scaffold) |
| T-D | Add follow-up note modal | T022 |
| T-E | Notify family confirm (kept) | T022 |
| T-F | Assign teacher → course picker | T018, T019 (course), T022/T023 (from teacher) |
| T-G | Assign teacher → group picker | T018, T020 (group), T022/T023 (from teacher) |
| T-H | On-Vacation/Deactivate/Activate confirm | T012 (kebab), T022 (banner) |
| T-I | Delete teacher confirm | T012 (kebab), T022 (banner) |
| T-J | Availability windows drawer | T023 |
| T-K | Teacher category create/edit + assign-members | T027 (+ T008 data, T009 locales) |
| T-L | Performance export gate (optional) | T030 |
| T-M | Settings/capabilities/notifications (optional) | T022 (gate) / deferred |
| T-N | Status scopes/sorts (optional) | T014/T033 (facet) |
| T-W | All-teachers-timetable fold | T033 (verify schedule.html teacher-lens) |

### Future-owner rows (gated, not built)
| T-row | Owner | Tasks |
|---|---|---|
| T-O Compensations/Salary | 030 | T035, T036 |
| T-P Accounting/Salaries/Payouts | 030 | T035, T037 |
| T-Q Payout-Providers | future-backend | T035 |
| T-R Teacher/Class-Feedback | 029 | T035 |
| T-S Login-as | future-backend | T022 (gate), T035 |
| T-T Reset-password | future-backend | T022 (gate), T035 |
| T-U Session-reassign | 026 | T035 |
| T-V Teacher-portal salary | excluded forever | T036, T044 |
| T-mat Materials/settings-app | 031 | T035 |

---

## Notes
- [P] = different files, no dependency on an incomplete task.
- Count stays **97**; new standalone pages = **0**; all-teachers-timetable **folds into `schedule.html`**; `schedule.js` read-only.
- Reuse the closed Spec-026 `data-*` set + Spec-027 precedents only — no new hook/storage key/engine; `teacherMenu` reuses `data-row-menu`.
- Zero pay/salary/payroll/compensation/payout figures; `rating` field unsurfaced; teacher-performance display-only.
- No teacher-portal file changes; 16 `teacher-*` files byte-identical.
- No commit / no push — the watcher commits after implementation.

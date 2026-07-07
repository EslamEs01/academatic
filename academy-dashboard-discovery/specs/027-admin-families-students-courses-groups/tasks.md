# Tasks: Spec 027 — Admin Families / Students / Courses / Groups Deep Management

**Input**: Design documents from `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/`
**Prerequisites**: `plan.md` (locked: count STAYS 97, zero new pages), `spec.md` (US1–US8), `research.md` (D1–D41), `data-model.md`, `contracts/` (20)
**Baseline**: Spec 026 committed, HEAD `a0189d0`, 97 public HTML, tests green. Branch `feature/012-role-portal-foundation`.

**Tests**: Tests ARE requested for this feature (smoke + a11y + screenshots are acceptance-binding). Test tasks appear in Phase 9. All test edits are additive; the Spec-026 protected asserts stay byte-verbatim.

**Organization**: Tasks are grouped by user story. US1 Family = MVP (exercises the full mechanism set: modal + confirm + assignment-preview drawer + gate on one domain; US2/US3 replicate the pattern).

## Format: `[ID] [P?] [Story?] Description with file path + verification`

- **[P]**: parallelizable — different files, no dependency on an incomplete task.
- **[Story]**: US1…US8 (Setup / Foundational / Future-owner-verify / Polish phases carry no story label except where a story's acceptance is verified).
- Every task names a concrete file path and a verification.

## Standing laws (apply to EVERY task)

- **Count stays 97** — zero new standalone pages; every delta is a modal / drawer / picker / row-kebab / tab-deepening / gate on an existing page.
- **No-fake law** — no fake create/edit/save/delete/remove/suspend/enroll/assign/move/upload/download/export/print/message/score/chart/DOM-mutation. Only honest outcomes: real page · real modal · real drawer · real static tab/filter · `backendRequired` gate · planned gate · permission gate · display-only · confirm-with-backendRequired-final.
- **Closed hook set only** — `data-modal-trigger`(+`data-modal-title-key`/`data-modal-note-key`), `data-confirm[-danger]`, `data-drawer`, `data-disabled-reason`, `data-tab`, `data-filter`/`data-filter-set`, `data-row-menu`(+`-kind`). **No new dispatch hook, no new storage key, no new engine.** The students row kebab reuses `data-row-menu` via a `studentMenu` variant + one `'student'` dispatch branch.
- **Role laws byte-verbatim green** — family zero-pay (portal figure-free; admin plan literal single-value/no-math), student child-view (no «لوحة الطالب»), teacher pay-free (reference only; no teacher CRUD), admin finance Spec-009 invariant. All Spec-026 protections held.
- **No commit / no push** — the watcher commits after implementation.

**Real component/file note**: `components/family.js` and `components/student.js` do **not** exist — family/student detail render in `pages/family.js`/`pages/student.js` (+ `components/family-card.js`, `components/family-status.js`, `components/group-row.js`, `components/course-group-actions.js`, `components/wizard.js`, `components/table.js`/`components/data-table.js`). Tasks target the real files. Fixture home = a new additive `src/js/fixtures/management.js`. Locale homes: `ar.fam.js`/`en.fam.js` (family `fam.*` + student `stu.*`/`res.*`/`eval.*`), `ar.crs.js`/`en.crs.js` (course `crs.*` + group `grp.*`/`group.*`), `common.backendRequiredNote` in `ar.extra.js`/`en.extra.js` (reused).

---

## Phase 1: Setup / Preflight

**Purpose**: Verify the baseline before any wiring. No app files change in this phase.

- [ ] T001 Verify HEAD and branch via `git rev-parse --short HEAD` + `git branch --show-current` — verification: HEAD `a0189d0`, branch `feature/012-role-portal-foundation`.
- [ ] T002 Verify `.specify/feature.json` points to Spec 027 — verification: `feature_directory` == `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups`.
- [ ] T003 Verify Spec 026 is the committed baseline and count = 97 in `academy-dashboard-discovery/app/public` — verification: `find public -maxdepth 1 -name '*.html' | wc -l` == 97; `git status --short` shows no app-source diffs (only spec dir + feature.json + CLAUDE.md).
- [ ] T004 Run baseline build in `academy-dashboard-discovery/app` (`npm run build`) — verification: exit 0; public HTML count stays 97.
- [ ] T005 Run baseline smoke + a11y in `academy-dashboard-discovery/app` (`npm run test:smoke` + `npm run test:a11y`) — verification: `[smoke] PASS`; a11y `critical=0 serious=0`.
- [ ] T006 Load `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/contracts/scope-guard.md` + the other 19 contracts; record the allowed/forbidden edit surface — verification: allowed/forbidden lists captured; no forbidden file will be touched.
- [ ] T007 Confirm no implementation has started before task generation — verification: `git status --short` shows only the 027 spec dir + `.specify/feature.json` + `CLAUDE.md`; zero diffs under `academy-dashboard-discovery/app/src`.

**Checkpoint**: Baseline green, count 97, scope loaded.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Static data + locale keys + CSS + hook-preservation that ALL stories depend on. No page/component wiring yet.

**⚠️ CRITICAL**: No user story task may begin until Phase 2 is complete.

- [ ] T008 [P] Create additive fixture `academy-dashboard-discovery/app/src/js/fixtures/management.js` — display-only authored data: `CourseCandidate[]`/`GroupCandidate[]`/`StudentCandidate[]` picker lists, `ResultDimension[]` (M-R rubric dimension labels), `CategoryMember[]` (M-K assignment preview) — verification: exports carry no computed score/total/percent and no pay tokens (`grep -E 'راتب|رواتب|salary|payroll|[$€£]|مبلغ|سعر' = 0`); no fake mutation state.
- [ ] T009 [P] Add mirrored family + student locale keys to `academy-dashboard-discovery/app/src/locales/ar.fam.js` + `en.fam.js` — `fam.act.edit/addChild/addNote/category*`, `stu.act.edit/addNote/enroll/assign/move/suspend/remove/kebab*`, `res.*`/`eval.*` dimension labels, gate copy; reuse `common.backendRequiredNote` — verification: AR/EN key sets identical; no raw keys at build; no «لوحة الطالب»/«بوابة الطالب»; no pay tokens. (Same file for family+student — NOT [P] with itself.)
- [ ] T010 [P] Add mirrored course + group locale keys to `academy-dashboard-discovery/app/src/locales/ar.crs.js` + `en.crs.js` — `crs.act.edit/addStudents/createGroup`, `grp.act.edit/addStudents/move/capacity`, picker/modal/gate copy — verification: AR/EN mirrored; no raw keys; no teacher pay tokens.
- [ ] T011 [P] Add additive CSS in `academy-dashboard-discovery/app/src/styles/app.css` — picker candidate rows + student row-kebab menu styling only — verification: additive only (no redesign); any motion lives ONLY inside the existing `prefers-reduced-motion: no-preference` block; no new class collides with admin/portal.
- [ ] T012 Verify the closed `data-*` hook set is preserved (planning guard, read-only over `academy-dashboard-discovery/app/src/js/enhance.js`) — verification: plan introduces NO new `data-*` dispatch hook or storage key; the `studentMenu` will reuse `data-row-menu`; matches `contracts/modal-drawer-picker-contract.md`.

**Checkpoint**: Fixtures + locales + CSS ready; page/component wiring can begin.

---

## Phase 3: User Story 1 — Family Management (Priority: P1) 🎯 MVP

**Goal**: Every families/family/add-family action opens a real page/modal/drawer/confirm/gate — Edit family, Add child, Add note, category reclassify — with backendRequired finals; suspend/stop stay honest confirms; billing routes to 030.

**Independent Test**: families/family/add-family actions open real page/modal/drawer/gate; Edit/Add-child/Add-note are modals (not bare toasts); family zero-pay green; admin plan literal single-value/no-math.

- [ ] T013 [US1] Upgrade `familyMenu(id)` Edit entry from toast to `data-modal-trigger` (`fam.act.edit` + `common.backendRequiredNote`) in `academy-dashboard-discovery/app/src/js/enhance.js` (~line 103) (M-F) — verification: `familyMenu` Edit opens a titled modal → backendRequired; no new dispatch hook. **NOT [P]** (shared `enhance.js`; US2 `studentMenu` sequences after this).
- [ ] T014 [US1] Upgrade `academy-dashboard-discovery/app/src/js/pages/family.js` — banner Edit-family (M-F), Add-child → `data-modal-trigger` modal (M-H), Notes-tab Add → `data-modal-trigger` modal (M-F), family-category reclassify → assignment-preview modal (M-K: display-only `CategoryMember` list from `management.js` + backendRequired Save); Suspend/Stop stay `data-confirm`; "Manage billing" stays owner-030 `data-disabled-reason` gate (single-value plan literal, no math) — verification: each action opens modal/confirm/gate → backendRequired; no fake save; no family pay figure. **NOT [P]** (single file).
- [ ] T015 [P] [US1] Upgrade `academy-dashboard-discovery/app/src/js/pages/families.js` + `academy-dashboard-discovery/app/src/js/components/family-card.js` — card-kebab Edit routes to the T013 modal; category-reclassify entry opens the M-K assignment-preview modal; Suspend/Stop confirm stays honest (M-F/M-K) — verification: families card kebab Edit → modal; suspend confirm → backendRequired; no status flip/DOM removal. (Different files from T014; depends on T013.)
- [ ] T016 [P] [US1] Upgrade `academy-dashboard-discovery/app/src/js/pages/add-family.js` + `academy-dashboard-discovery/app/src/js/components/wizard.js` — Add-child wizard step + final Save = honest `data-modal-trigger` backendRequired modal (M-H, M-M); billing step stays owner-030 gate — verification: wizard Save opens modal → backendRequired; no fake create; billing gate honest. (Distinct files.)
- [ ] T017 [P] [US1] Family zero-pay + finance-invariant scan (read-only) over `academy-dashboard-discovery/app/public/family*.html` — verification: `famPay`/`payFigure` grep = 0 on family surfaces; admin plan literal unchanged single-value/no-math; `finance.html`/`reports.html` untouched.
- [ ] T018 [US1] Build + targeted family smoke in `academy-dashboard-discovery/app` — verification: `npm run build` == 97; families/family/add-family load; Edit/Add-child/Add-note/category open modal/drawer/gate; no bare `data-demo-action` toast on Edit.

**Checkpoint**: US1 independently testable and green — MVP deliverable.

---

## Phase 4: User Story 2 — Student Management (Priority: P2)

**Goal**: Students table gains the (currently absent) row kebab; student Edit/Add-note are modals; suspend/deactivate/reactivate confirm; enroll-in-course + assign-to-group are display-only picker drawers; move-between-groups grounded (cross-family transfer = gate only); Results/Evaluation deepen display-only; schedule-search + message are honest gates.

**Independent Test**: students rows carry a `data-row-menu data-row-menu-kind="student"` kebab (View real · Edit modal · Suspend/Remove confirm); enroll/assign/move open a picker → backendRequired; Results/Evaluation show named dimensions only (no score/rank/chart); no fake mutation; no «لوحة الطالب» wording.

- [ ] T019 [US2] Add `studentMenu(id)` builder (View real link · Edit modal · Suspend confirm · Remove confirm) + a `'student'` branch in the `data-row-menu` dispatch (line ~525) in `academy-dashboard-discovery/app/src/js/enhance.js`, mirroring `familyMenu` (M-I, D11) — verification: dispatch routes `data-row-menu-kind="student"` → `studentMenu`; no new dispatch hook/storage key; each entry honest. **NOT [P]** (shared `enhance.js`; sequential AFTER T013).
- [ ] T020 [US2] Emit the row kebab button (`data-row-menu="${id}" data-row-menu-kind="student"`) on each student row in `academy-dashboard-discovery/app/src/js/pages/students.js`, mirroring `components/family-card.js:45` (M-I) — verification: `grep -c data-row-menu public/students.html` > 0 (was 0); kebab opens; View real / Edit modal / Suspend+Remove confirm. Depends on T019.
- [ ] T021 [US2] Upgrade `academy-dashboard-discovery/app/src/js/pages/student.js` — banner Edit-student → `data-modal-trigger` modal (M-G), Notes Add → modal (M-G), Suspend/deactivate/reactivate → `data-confirm` (M-J) — verification: Edit/Add-note open modals → backendRequired; suspend confirm → backendRequired; no status flip. **NOT [P]** (same file as T022/T023/T024).
- [ ] T022 [US2] Extend `academy-dashboard-discovery/app/src/js/pages/student.js` — Courses-tab "Add" → `data-drawer` course-picker (enroll, M-B); assign-to-group → `data-drawer` group-picker (M-A/M-B); group↔group move → `data-modal-trigger`/`data-drawer` (M-C, grounded); cross-family transfer = `data-disabled-reason` gate only (M-C, no invented fields) — verification: enroll/assign/move open a display-only picker → backendRequired; cross-family transfer is a labeled gate; no fake enroll/assign; picker selection never persists. **NOT [P]** (same file).
- [ ] T023 [US2] Deepen `academy-dashboard-discovery/app/src/js/pages/student.js` Results/Evaluation tabs display-only (M-R, D23) with `ResultDimension` lines from `management.js` (named dimensions only — NO computed score/rank/percentile/chart); schedule-search = availability-preview `data-disabled-reason` gate (M-S, D24) — verification: results/eval tabs show dimensions only; `grep -oE 'score|rank|percentile|chart|%' public/student.html` finds none in the results/eval body; schedule-search = gate, no fake results. **NOT [P]** (same file).
- [ ] T024 [US2] Keep Message/contact an honest gate → 026/future in `academy-dashboard-discovery/app/src/js/pages/student.js` (M-O) — verification: message = `data-disabled-reason` gate; no fake composer. **NOT [P]** (same file).
- [ ] T025 [P] [US2] Student child-view wording guard (read-only) over `academy-dashboard-discovery/app/public/student.html`,`students.html` — verification: `grep -E 'لوحة الطالب|بوابة الطالب|student dashboard'` = 0; portal `student-*` pages byte-identical (untouched by 027).
- [ ] T026 [US2] Build + targeted student smoke in `academy-dashboard-discovery/app` — verification: build == 97; students row kebab present + honest; enroll/assign/move open modal/drawer/gate; edit/add-note modals; results/eval no computed score.

**Checkpoint**: US1 AND US2 both independently testable.

---

## Phase 5: User Story 3a — Course Management (Priority: P3)

**Goal**: Edit-course is a modal; Add-students/enroll is a display-only picker drawer; create-group-from-course is a prefilled modal; assign-teacher/print/materials stay honest owner gates.

**Independent Test**: course Edit modal opens; add-students picker → backendRequired; create-group modal → backendRequired; assign-teacher(→028)/print(→029)/materials(→031) gates honest; no course pay figure; no fake roster/status mutation.

- [ ] T027 [US3] Upgrade `courseActions` in `academy-dashboard-discovery/app/src/js/components/course-group-actions.js` (line ~19) — Edit: replace `demo('crs.act.edit',…)` with `data-modal-trigger` modal (M-D, D17); Add-students → `data-drawer` `StudentCandidate` picker (M-B, D18); keep assign-teacher `data-disabled-reason` gate → 028 (M-N) and Print gate → 029 (M-P) — verification: Edit opens modal → backendRequired; add-students picker → backendRequired; gates honest; no teacher CRUD. **NOT [P]** (shared file; group T030 sequences after this).
- [ ] T028 [P] [US3] Add create-group-from-course flow in `academy-dashboard-discovery/app/src/js/pages/course.js` — `data-modal-trigger`/`data-drawer` prefilled-course create-group (M-L, D19) → backendRequired; materials/subjects stays gate → 031 (M-V); course tabs/group/student/teacher links stay real — verification: create-group opens modal → backendRequired; materials gate honest; links real. (Different file from T027.)
- [ ] T029 [US3] Build + targeted course smoke in `academy-dashboard-discovery/app` — verification: build == 97; course Edit modal; add-students picker; create-group modal; assign-teacher/print/materials gates honest; no course pay figure.

**Checkpoint**: Course management honest and complete.

---

## Phase 6: User Story 3b — Group Management (Priority: P3)

**Goal**: Edit-group is a modal (grounded fields only); Add-students is a display-only picker drawer; remove-student stays confirm; move is grounded/gated; capacity grounds on total-hours (no invented seat field); assign-teacher/print stay owner gates.

**Independent Test**: group Edit modal opens; add-students picker → backendRequired; remove confirm → backendRequired; move opens modal/gate; capacity = total-hours (no seat invention); no group pay figure; no fake roster/status mutation.

- [ ] T030 [US3] Upgrade `groupActions` in `academy-dashboard-discovery/app/src/js/components/course-group-actions.js` (line ~34) — Edit: replace `demo('grp.act.edit',…)` with `data-modal-trigger` modal, grounded fields only, unconfirmed fields stay gated (M-E, D20); Add-students → `data-drawer` `StudentCandidate` picker (M-A, D21); Remove-student stays `data-confirm[-danger]` → backendRequired (M-A/D22); keep assign-teacher gate → 028 (M-N) and Print gate → 029 (M-P) — verification: Edit modal; add-students picker → backendRequired; remove confirm; gates honest; no invented seat field. **NOT [P]** (shared file; sequential AFTER T027).
- [ ] T031 [P] [US3] Ground group move + capacity in `academy-dashboard-discovery/app/src/js/pages/group.js` + `academy-dashboard-discovery/app/src/js/components/group-row.js` — group↔group move = `data-modal-trigger`/`data-drawer` where grounded else honest gate (M-C); capacity display grounds on `suggested_total_hours` (no invented seat cap); schedule/attendance/course/student links stay real — verification: move opens modal/drawer or a labeled gate; capacity = total-hours; links real. (Different files from T030.)
- [ ] T032 [US3] Build + targeted group smoke in `academy-dashboard-discovery/app` — verification: build == 97; group Edit modal; add-students picker; remove confirm; move gate/modal; no seat-field invention; no group pay figure.

**Checkpoint**: US3 (course + group) independently testable.

---

## Phase 7: Future-Owner Gates (Story US6)

**Purpose**: Keep every out-of-scope action an honest gate routed to its owner; build none of the 028–032 domains.

- [ ] T033 [US6] Verify M-N/M-O/M-P/M-Q/M-T/M-U/M-V stay honest gates across `academy-dashboard-discovery/app/src/js/components/course-group-actions.js`, `pages/student.js`, `pages/family.js`, `pages/course.js` — verification: M-N assign-teacher → 028; M-O message → 026/future; M-P print/export → 029; M-Q billing/plan → 030; M-T feedback/reports → 029; M-U login-as/reset → future-backend; M-V materials/subjects → 031 — each `data-disabled-reason`/`data-coming-soon`, no owner-domain persistence built.
- [ ] T034 [US6] Verify no 028/029/030/031/032 domain is built in 027 (grep `academy-dashboard-discovery/app/public`) — verification: no new finance/reports/settings/teacher-mgmt page; count 97; forbidden-page grep = 0.
- [ ] T035 [US6] Cross-check the implemented gates against `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/future-owner-register.md` — verification: every out-of-scope action has a gate + owner note; smoke asserts each gate non-dead.

**Checkpoint**: All future-owner actions gated and recorded.

---

## Phase 8: Cross-Cutting Action Completion (Stories US4 / US5)

**Purpose**: Prove every action on the 9 pages resolves honestly and every M-row is resolved.

- [ ] T036 [US5] Verify every M-row (M-A…M-V) is resolved against `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/missing-action-register.md` — verification: each fix-now row implemented (M-A…M-M, M-R, M-S) OR owner-gated (M-N/M-O/M-P/M-Q/M-T/M-U/M-V); 0 unresolved rows.
- [ ] T037 [US4] Verify every management action opens page/modal/drawer/tab/filter/gate across `academy-dashboard-discovery/app/public/{families,family,add-family,students,student,courses,course,groups,group}.html` — verification: classifications in `current-management-action-inventory.md` all honest; 0 forbidden classes (dead-button/href-hash/fake-*).
- [ ] T038 [US4] Verify no fake final + no preview-action persistence (built grep over `academy-dashboard-discovery/app/public/*.html`) — verification: 0 `«(تجريبي)»`/`(demo)`/`preview action`/`«بنجاح»`/`successfully`; picker selections never persist; confirm finals never claim done/saved.
- [ ] T039 [US4] Verify no fake DOM mutation across the 9 pages — verification: no roster add/remove, no status flip, no fabricated link; confirm/picker finals are backendRequired only.
- [ ] T040 [US4] Verify `href="#"`=0 and no dead buttons sitewide (`academy-dashboard-discovery/app/public/*.html`) — verification: `grep -rl 'href="#"' public/*.html | wc -l` == 0; every `data-action` handled or honest gate.
- [ ] T041 [US4] Verify no raw i18n keys leak in built pages (`academy-dashboard-discovery/app/public/*.html`) — verification: no `namespace.key`-pattern text renders; build throws on unknown key already.
- [ ] T042 [US4] Verify entity-relationship writes all end backendRequired against `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/entity-relationship-scope.md` — verification: Family→Students, Student↔Courses, Student↔Groups, Course→Groups, Group→Students, Group/Course→Teacher(ref), →Schedule/Attendance(read-only) — every write gated; teacher + schedule/attendance references only; matches `contracts/entity-relationship-contract.md`.

**Checkpoint**: Zero dead/fake actions; every M-row resolved.

---

## Phase 9: Smoke / A11y / Screenshots (Stories US7 / US8)

**Purpose**: Additive test coverage + role-law protection + visual proof.

- [ ] T043 [US7] Extend `academy-dashboard-discovery/app/tests/smoke/run.cjs` additively (ONE sanctioned amendment) — assert: count 97; the 9 pages load; students row kebab honest (View real · Edit modal · Suspend/Remove confirm); enroll/assign/move open modal/drawer/gate; edit family/student/course/group open modals (not bare toasts); Results/Evaluation carry no computed score/rank/chart; `href="#"`=0; no dead button; no fake final. **Keep `payHit`/`famPay`/`payFigure`/child-view/admin-finance + the Spec-026 action-completion asserts BYTE-VERBATIM.** verification: protected asserts unchanged (diff shows additions only); no new action left unasserted. **NOT [P]** (test file).
- [ ] T044 [US7] Run `npm run test:smoke` in `academy-dashboard-discovery/app` — verification: `[smoke] PASS`; count 97; all new asserts green.
- [ ] T045 [US8] Verify role-law asserts green (smoke output) — verification: family zero-pay (`famPay`/`payFigure`), student child-view, teacher pay-free (`payHit`), admin finance Spec-009 invariant all byte-verbatim green.
- [ ] T046 [US8] Verify impact protection via `git status --short academy-dashboard-discovery/app/public` + `git diff --stat HEAD -- academy-dashboard-discovery/app/package.json` — verification: only touched management pages changed; portal + admin-ops (sessions-analysis/public-holiday/scheduled-actions) + index byte-identical; `package.json` 0-diff.
- [ ] T047 [US7] Extend the a11y matrix in `academy-dashboard-discovery/app/tests/a11y/run.cjs` — changed family/student/course/group pages + wizard + ≥1 create modal + ≥1 edit modal/drawer + ≥1 assignment picker (drawer) + ≥1 confirm; dark/light; mobile-390 — verification: matrix additions present; gate aria labels; keyboard/focus safe. **NOT [P]** (test file).
- [ ] T048 [US7] Run `npm run test:a11y` in `academy-dashboard-discovery/app` — verification: `critical=0 serious=0`; mobile-390 no overflow.
- [ ] T049 [US7] Capture screenshots via `academy-dashboard-discovery/app/tests/screenshots/capture.cjs` — families/family/students(row-kebab)/student/course/group + wizard final gate + edit modal/drawer + assignment picker + confirm final + a results/scheduleSearch proof + mobile-390 + dark — verification: all listed surfaces captured. **NOT [P]** (capture run).
- [ ] T050 [US7] Update `academy-dashboard-discovery/app/screenshots/REVIEW.md` with a Spec 027 section — verification: REVIEW.md references the captured deep-management surfaces.

**Checkpoint**: Smoke + a11y green; role laws held; screenshots captured.

---

## Phase 10: Docs / Final Audit & Cross-Cutting

**Purpose**: Documentation + guards + final proof. No commit/push.

- [ ] T051 [P] Update `academy-dashboard-discovery/app/README.md` — Spec 027 deep-management summary (count stays 97; deltas via modals/drawers/pickers/kebab/gates) — verification: README notes 027 deltas; no count drift.
- [ ] T052 [P] Update `CLAUDE.md` active-feature pointer to Spec 027 IMPLEMENTED (count 97; per-domain deltas; role laws green) — verification: pointer reflects implemented state.
- [ ] T053 [P] Update Spec 027 records in `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/` (implementation/status notes); append-only to 016/023/026 records only if needed — verification: 027 status recorded; 016/023/026 edits (if any) append-only.
- [ ] T054 Run clean-code-guard (scope-guard grep including source comments) over `academy-dashboard-discovery/app/src` — verification: no forbidden token (score/rank/chart/salary/pay) leaks in source OR comments; disclaimers reworded per the project convention.
- [ ] T055 Run test-guard: full `npm test` in `academy-dashboard-discovery/app` — verification: smoke + a11y green; no protected assert weakened.
- [ ] T056 Final diff review + forbidden-file proof — verification: `git diff --name-only HEAD` touches only allowed files (pages/{9}, components/{family-card,family-status,group-row,course-group-actions,wizard,table}, enhance.js, fixtures/management.js, locales/{ar,en}.{fam,crs}.js, styles/app.css, tests/*, screenshots/REVIEW.md, README.md, CLAUDE.md, 027 spec dir); `package.json`/backend/new-page/new-hook = 0; count 97.
- [ ] T057 Confirm no commit / no push performed by the agent — verification: HEAD unchanged during implementation; the watcher performs the commit; no `git commit`/`git push` run.

---

## Dependencies & Execution Order

### Phase order
- **Phase 1 Setup** → **Phase 2 Foundational** (blocks all stories) → **Phase 3 US1** → **Phase 4 US2** → **Phase 5 US3a** → **Phase 6 US3b** → **Phase 7 US6** → **Phase 8 US4/US5** → **Phase 9 US7/US8** → **Phase 10 Docs**.
- Stories US1/US2/US3 can be developed in parallel by different people ONLY after Phase 2, **subject to the shared-file serializations below**.

### Shared-file serializations (MUST be sequential — never [P] across these)
- `src/js/enhance.js`: **T013 (US1 familyMenu Edit) → T019 (US2 studentMenu builder + dispatch branch)**. Same file.
- `src/js/components/course-group-actions.js`: **T027 (US3 courseActions) → T030 (US3 groupActions)**. Same file.
- `src/js/pages/family.js`: T014 is a single sequential task (all family.js deltas).
- `src/js/pages/student.js`: **T021 → T022 → T023 → T024** sequential (same file).
- `src/locales/ar.fam.js`/`en.fam.js`: all family+student copy in T009 (single task). `src/locales/ar.crs.js`/`en.crs.js`: all course+group copy in T010.
- `src/styles/app.css`: T011 only. `tests/smoke/run.cjs`: T043 only. `tests/a11y/run.cjs`: T047 only.

### Within a story
- Wire fixtures/locales (Phase 2) before pages reference them.
- The students kebab button (T020) depends on the `studentMenu` builder (T019).
- Each story's targeted build/smoke task runs after that story's wiring.

---

## Parallel Opportunities

- **Phase 2**: T008 ∥ T009 ∥ T010 ∥ T011 (fixtures, family/student locales, course/group locales, CSS — all distinct files).
- **Phase 3 (after T013)**: T015 ∥ T016 ∥ T017 (families+card, add-family+wizard, zero-pay scan — distinct files).
- **Phase 4**: T025 (child-view scan) ∥ the student.js chain (read-only vs source).
- **Phase 5/6**: T028 (course.js) ∥ its phase; T031 (group.js + group-row) ∥ its phase.
- **Phase 10**: T051 ∥ T052 ∥ T053 (README, CLAUDE.md, spec records — distinct files).

### Parallel example: Phase 2 foundations
```bash
Task T008: Create src/js/fixtures/management.js (picker candidates + result dimensions + category members)
Task T009: Add fam.*/stu.*/res.*/eval.* keys to ar.fam.js + en.fam.js
Task T010: Add crs.*/grp.* keys to ar.crs.js + en.crs.js
Task T011: Add picker/kebab CSS to app.css
```

---

## Implementation Strategy

### MVP first (US1 Family)
1. Phase 1 Setup → 2. Phase 2 Foundational → 3. Phase 3 US1 → **STOP & VALIDATE** (families/family/add-family honest; zero-pay green; count 97) → demo.

### Incremental delivery
US1 (MVP) → US2 Student → US3a Course → US3b Group → Future-owner gates → Action-completion sweep → QA (smoke/a11y/screenshots) → Docs. Each story adds value without breaking the previous; role-law asserts stay byte-verbatim green throughout.

---

## Traceability — M-row → task coverage

### 027-owned rows (fix-now)
| M-row | Action | Tasks |
|---|---|---|
| M-A | Assign / add students to group | T022 (student), T030 (group picker), T042 |
| M-B | Enroll student in course | T022 (student), T027 (course add-students) |
| M-C | Move / transfer between groups; cross-family = gate | T022 (student move + cross-family gate), T031 (group move) |
| M-D | Edit course | T027 |
| M-E | Edit group | T030 |
| M-F | Edit family (+ family note) | T013 (familyMenu), T014 (banner + notes) |
| M-G | Edit student + Add note | T021 |
| M-H | Add child | T014 (family modal), T016 (wizard step) |
| M-I | Students row kebab | T019 (builder + dispatch), T020 (emit) |
| M-J | Suspend / deactivate / reactivate student | T021 |
| M-K | Reclassify family category | T014, T015 |
| M-L | Create group from course | T028 |
| M-M | Richer create forms | T014/T016 (family), T021 (student), T027/T028 (course), T030 (group) |
| M-R | Student results / evaluation (display-only) | T023 |
| M-S | Schedule search / availability preview | T023 |

### Future-owner rows (gated, not built)
| M-row | Owner | Tasks |
|---|---|---|
| M-N | Assign-teacher persistence → 028 | T027/T030 (gate), T033 |
| M-O | Message / contact → 026/future-backend | T024, T033 |
| M-P | Print / export roster → 029 | T027/T030 (gate), T033 |
| M-Q | Billing / plan persistence → 030 | T014, T033 |
| M-T | Feedback / reports → 029 | T034/T035 |
| M-U | Login-as / reset-password → future-backend | T034/T035 |
| M-V | Materials / catalog → 031 | T028 (gate), T033 |

---

## Notes

- [P] = different files, no dependency on an incomplete task.
- [Story] label maps a task to US1…US8 for traceability.
- Every story is independently completable and testable.
- Count stays **97**; new standalone pages = **0**; generated public-page delta = **0**; no removals; no unrelated additions.
- Reuse the closed Spec-026 `data-*` set only — no new hook/storage key/engine.
- No commit / no push — the watcher commits after implementation.

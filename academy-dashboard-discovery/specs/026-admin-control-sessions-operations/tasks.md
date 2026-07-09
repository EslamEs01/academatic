# Tasks — Spec 026: Admin Control / Sessions / Operations + Global Action Completion Pass

**Feature dir**: `academy-dashboard-discovery/specs/026-admin-control-sessions-operations/`
**Baseline**: Spec 025 committed (HEAD `e4ee3cd`), 91 public HTML, tests green. **Target**: 97 public HTML.
**App root**: `academy-dashboard-discovery/app` (all `src/`, `scripts/`, `tests/`, `public/` paths are relative to it).
**Laws**: static-first · no backend/API/auth · no fake persistence · reuse the CLOSED `data-*` hook set (NO new hook/storage key) · teacher pay-free · family zero-pay · student child-view · admin finance Spec-009-invariant · `package.json` unchanged.

Tests are REQUESTED (smoke/a11y/screenshots are part of every prior spec and the FR set).

---

## Phase 1: Setup & preflight

- [ ] T001 Preflight from app root: `npm run build` (assert 91 HTML), `npm test`, `npm run test:smoke`, `npm run test:a11y` all green; record HEAD/branch/count. STOP if count ≠ 91 or baseline red.
- [ ] T002 [P] Build the reclassification worklist: grep `data-demo-action` across `src/js/components/*.js` + `src/js/pages/*.js`, and `data-action="apply-filter"|"clear-filter"|"new-session"|"add-session"` in `src/js/`, and cross-check every DU row in `specs/026-.../dead-ui-register.md`; write the confirmed target node list to `specs/026-admin-control-sessions-operations/reclassification-worklist.md`.

---

## Phase 2: Foundational (blocking prerequisites — shared conventions)

**⚠️ Complete before Phase 3/4/5.** No new hook/storage key; reuse existing `enhance.js` dispatch.

- [ ] T003 Define the admin **backendRequired-gate convention** (reuse `data-disabled-reason` + a `*.gate.*`/`nav.reason.*` reason key toast; visibly-gated but non-dead) and the **confirm-backendRequired convention** (keep `data-confirm`, reword `data-confirm-toast`/msg to "requires the server", never success, never DOM-mutate). Document both as a short code comment block in `src/js/enhance.js` near the dispatch (no behavior change yet) and in `specs/026-.../modal-and-gate-scope.md` (append "adopted conventions").
- [ ] T004 Add a shared **create/edit modal template** helper reusing `openModal()` in `src/js/components/` (e.g. `create-modal.js`): renders a display-only field scaffold from a `CreateFieldSet` + a final Save that is a `backendRequired` gate (no submit/persist). Wire it through the existing `data-modal-trigger`/`openModal()` path only.
- [ ] T005 [P] Add mirrored **AR locale** keys: new module `src/locales/ar.ops.js` (registered in the locale loader) for `sa.*` (sessions-analysis), `ph.*` (public-holiday), `sca.*` (scheduled-actions), fold keys `sess.queue.*`/`sched.req.*`, plus reworked `*.gate.*`/`*.confirm.*` backendRequired copy; AR RTL, no raw keys, no pay tokens.
- [ ] T006 [P] Add mirrored **EN locale** keys: `src/locales/en.ops.js` mirroring T005 exactly (LTR).

---

## Phase 3: User Story 1 — Admin daily sessions/operations without dead controls (Priority: P1)

**Goal**: build the grounded admin ops surface (3 pages + 2 folds + nav flips + honest dashboard filter).
**Independent test**: load `sessions-analysis`/`public-holiday`/`scheduled-actions` (AR/EN); every control opens a page/modal/drawer/tab/filter or an honest `backendRequired` gate; the dashboard "Today's Sessions" widget is honest.

- [ ] T007 [P] [US1] Add fixture `src/js/fixtures/sessions-analysis.js` — authored `OutcomeStat` (regular + trial: count + durationLabel) + `HelperTile`, per `data-model.md`. No computed score/rank/chart.
- [ ] T008 [P] [US1] Add fixture `src/js/fixtures/public-holiday.js` — authored `HolidayWindow` rows + gate metadata (setHoliday/bulkAbsence = backendRequired).
- [ ] T009 [P] [US1] Add fixture `src/js/fixtures/scheduled-actions.js` — authored `ScheduledAction` rows + gate metadata (create/automation = backendRequired/future-backend).
- [ ] T010 [US1] Build page module `src/js/pages/sessions-analysis.js` — admin-shell, display-only outcome KPI board from T007, static `data-filter` (date/teacher/type) if wired, Export = `backendRequired` gate. No score/rank/chart.
- [ ] T011 [US1] Build page module `src/js/pages/public-holiday.js` — admin-shell, holiday windows list from T008, set-holiday/bulk-absence = `backendRequired` gate. No fake bulk cancel.
- [ ] T012 [US1] Build page module `src/js/pages/scheduled-actions.js` — admin-shell, queued lifecycle-actions list from T009, create/automation = `backendRequired`/future-backend gate. No fake scheduler.
- [ ] T013 [US1] Register the 3 pages in `scripts/build-html.mjs` — 3 imports + 3 PAGES entries (`shell:'app'`, role admin, correct `activeId` = sessionsAnalysis/publicHoliday/scheduledActions, `titleKey`). Purely additive.
- [ ] T014 [US1] Flip 3 nav items planned→implemented in `src/js/nav.config.js:27,33,34` (`sessionsAnalysis`→`sessions-analysis.html`, `publicHoliday`→`public-holiday.html`, `scheduledActions`→`scheduled-actions.html`) as real anchors; other 5 stay `planned`.
- [ ] T015 [US1] Fold **total-queues** ops band into `src/js/pages/sessions.js` — authored `QueueItem` rows (extend `fixtures/sessions.js`), Add-queue = `backendRequired` gate. No standalone page.
- [ ] T016 [US1] Fold **schedule-requests** inbox preview into `src/js/pages/schedule.js` — authored `ScheduleRequest` rows (extend `fixtures/schedule.js`), Accept/Reject = `backendRequired` gate. No invented form fields.
- [ ] T017 [US1] Resolve the dashboard "Today's Sessions" filter widget (DU-20) in `src/js/pages/dashboard.js` (+ `fixtures/welcome.js` if needed): **Option A** wire `apply-filter`/`clear-filter` to the real `data-filter` engine (closed hooks); if not honestly wireable, **Option B** reword to a static "showing today" label (remove fake Apply/Clear). Never a preview-toast filter.
- [ ] T018 [US1] `npm run build` → assert **97** HTML; open `public/sessions-analysis.html`, `public/public-holiday.html`, `public/scheduled-actions.html` (AR+EN) — no raw keys, no `href="#"`, gates present.

---

## Phase 4: User Story 2 — Admin create/edit/view/cancel/reschedule flows are honest (Priority: P1)

**Goal**: reclassify every misleading admin «preview action» persistence toast → honest `backendRequired` final (fix shared components once → propagates to ~8 pages each).
**Independent test**: every Create/Edit/Delete/Save/Print on admin pages opens a modal/drawer/gate; none toasts «preview action»; confirms say backendRequired; no DOM-fake.

- [ ] T019 [US2] Reclassify `src/js/components/appointment-details.js` (DU-09): Edit/Notify `data-demo-action`→create/edit modal (T004) or `backendRequired` gate; Cancel `data-confirm` reworded to backendRequired (T003). Join stays honest.
- [ ] T020 [US2] Reclassify `src/js/components/outcome-details.js` (DU-10): Attend/Feedback/Notify/Reverse `data-demo-action`→`backendRequired` gate; absent/cancel/reschedule confirms reworded; Add-to-credit stays honest.
- [ ] T021 [US2] Reclassify `src/js/enhance.js` `rowMenu()` + `familyMenu()` (DU-11/12): View stays `data-drawer`/real link; Edit/Cancel/Suspend/Stop → modal + `backendRequired`/reworded confirm. No new hook.
- [ ] T022 [P] [US2] Reclassify `src/js/components/teacher-actions.js` (DU-15): Edit/Message/Note→modal/gate backendRequired; Notify confirm reworded; Assign/Print stay honest gates.
- [ ] T023 [P] [US2] Reclassify `src/js/components/course-group-actions.js` (DU-14): Edit/Add-students→modal/gate backendRequired; Remove-student confirm reworded; Assign/Print honest.
- [ ] T024 [P] [US2] Reclassify `src/js/components/finance-actions.js` (DU-18): Print→`backendRequired` gate (align with Export); Record/Mark-paid/Send-reminder confirms reworded. Spec-009-invariant — no pay math, authored literals only.
- [ ] T025 [P] [US2] Reclassify `src/js/components/settings-section.js` (DU-16): Save→`backendRequired`; alert toggles→backendRequired or display-only; Reset confirm reworded; theme/lang stay real.
- [ ] T026 [P] [US2] Reclassify `src/js/components/wizard.js` (DU-07/08): final Save→create-review modal + `backendRequired`; Add-another-child→backendRequired; steps stay real.
- [ ] T027 [P] [US2] Reclassify `src/js/pages/family.js` (DU-13): Edit/Add-child/Add-note/Message→modal/gate backendRequired; Suspend/Stop confirms reworded; tabs/links/Manage-billing stay honest.
- [ ] T028 [P] [US2] Reclassify `src/js/pages/student.js` (DU-13): Message/Edit/Add-note→modal/gate backendRequired; Add-course stays honest; tabs/links stay real.
- [ ] T029 [US2] Reclassify the Create/Add **primaries** (DU-01…06) to open the create modal (T004) with `backendRequired` final: `src/js/pages/sessions.js` New-session, `src/js/pages/students.js` Add-student, `src/js/pages/teachers.js` (via `teacher-actions.js`) Add-teacher, `src/js/pages/courses.js` Add-course, `src/js/pages/groups.js` Add-group, `src/js/pages/dashboard.js` (via `welcome.js`) New/Add-session. Where a field modal is disproportionate, align to the finance Create-invoice `data-disabled-reason` gate.
- [ ] T030 [US2] Reclassify `src/js/components/report-actions.js` Print (DU-17)→`backendRequired` gate (align with Export CSV/PDF); Schedule-report confirm reworded.
- [ ] T031 [US2] `npm run build`; grep built admin pages: `data-demo-action` absent from all persistence-implying actions; no «preview action» toast on Create/Edit/Delete/Save/Print; `href="#"`=0.

---

## Phase 5: User Story 3 — Admin reviews attendance/outcomes through honest gates (Priority: P2)

**Goal**: the attendance/outcome review surface is view+filter real, every write a `backendRequired` gate.
**Independent test**: open `attendance` + `sessions-analysis`; roster/board display + filters work statically; mark/save/approve are `backendRequired`.

- [ ] T032 [US3] Verify/deepen `src/js/pages/attendance.js` — mark-attend/absent/cancel via the shared outcome drawer (T020) resolve to `backendRequired`; summary tiles + `data-filter` stay real; no fake attendance/outcome write.
- [ ] T033 [US3] Verify `sessions-analysis` (T010) outcome board is display-only academic counts (no computed average/score/chart — M-13); export = gate.
- [ ] T034 [US3] Build/verify: `public/attendance.html` + `public/sessions-analysis.html` — writes gated, views/filters real, no fake persistence.

---

## Phase 6: User Story 6 — Out-of-scope actions recorded to owner specs (Priority: P2)

- [ ] T035 [US6] Keep `leads`/`tasks`/`messages`/`announcements`/`timeConverter` as honest `data-coming-soon` planned nav (non-anchor) in `src/js/nav.config.js`; confirm each maps to an owner in `specs/026-.../future-owner-register.md` (append concrete rows if missing).
- [ ] T036 [US6] Build; confirm the 5 non-core items render as non-anchor coming-soon gates (not broken anchors), and every "missing/points-to-future" inventory row has an owner entry.

---

## Phase 7: User Stories 4 & 5 — Completion audit + zero dead buttons (Priority: P1)

**Goal**: prove every action across all 97 pages is honest and machine-checked.

- [ ] T037 [US4] Update `specs/026-.../current-action-inventory.md` + `dead-ui-register.md` to mark every DU row resolved (fixed-in-026 or owner+gate); 0 unresolved rows.
- [ ] T038 [US5] Smoke rescope in `tests/smoke/run.cjs` (ONE sanctioned additive amendment): count 91→**97**; add the 3 new pages (load + ops-gate asserts); assert the 3 nav flips implemented + other 5 planned non-anchor; add action-completion asserts (no «preview action» on Create/Edit/Delete/Save/Print; reclassified actions open modal/drawer/gate; confirm finals backendRequired; dashboard Apply/Clear honest); keep `href="#"`=0 + no-dead-button + no-raw-key. **Keep payHit/famPay/payFigure/child-view/admin-finance/portal asserts BYTE-VERBATIM.**
- [ ] T039 [US5] `npm run test:smoke` green (all new asserts + protected asserts unchanged).

---

## Phase 8: Polish & cross-cutting (US7 role protection + verification + docs)

- [ ] T040 [P] [US7] Teacher pay-free 3-layer: source grep (incl comments) on touched files + built grep on `public/teacher-*.html` + smoke `payHit`/`tchPay` byte-verbatim green. STOP on any hit.
- [ ] T041 [P] [US7] Family zero-pay (`famPay`/`payFigure`) + student child-view (`عرض الابن`, no primary wording) byte-verbatim green; admin finance Spec-009-invariant (no salary/payroll figures on finance/reports).
- [ ] T042 [P] Impact protection: `git diff --stat HEAD -- package.json` = 0; portal 49 files + index + unrelated admin pages byte-identical; touched admin pages change ONLY at reclassified nodes + fold bands (byte-diff review). No new `data-*` hook/storage key.
- [ ] T043 A11y coverage in `tests/a11y/run.cjs`: add `sessions-analysis`/`public-holiday`/`scheduled-actions` (AR light+dark, EN sample) + one modal-open + one drawer-open state; run `npm run test:a11y` → critical=0 serious=0.
- [ ] T044 Screenshots in `tests/screenshots/capture.cjs`: 3 new pages AR desktop + ≥1 EN + a create modal + a details drawer + one action-gate + dashboard filter proof (if Option A) + mobile-390 + dark; run `node tests/screenshots/capture.cjs`.
- [ ] T045 [P] Update `screenshots/REVIEW.md` with a Spec 026 section (pages, reclassification tiers, gate proofs, failure sweep).
- [ ] T046 [P] Update `README.md` + `CLAUDE.md` with the Spec 026 IMPLEMENTED pointer (3 ops pages, action-completion pass, 91→97, closed-hook reuse).
- [ ] T047 Final gate: `npm run build` (97) && `npm test` && `npm run test:a11y` && screenshots — all green; run the `quickstart.md` stop-condition greps (0 hits); confirm HEAD unchanged (no commit). Produce the final report.

---

## Dependencies & order

- **Phase 1 → Phase 2 → {Phase 3, Phase 4} → Phase 5 → Phase 6 → Phase 7 → Phase 8.**
- Phase 2 (T003–T006) blocks Phases 3/4/5 (gate convention + create-modal + locales).
- Phase 3 (US1) and Phase 4 (US2) are largely independent (new pages vs existing components) and MAY overlap, but both must precede the Phase 7 build/smoke (count 97 needs Phase 3; action-completion asserts need Phase 4).
- Phase 5 (US3) depends on T020 (outcome drawer) + T010 (sessions-analysis).
- Phase 7/8 verification depends on Phases 3–6 complete.

## Parallel execution examples

- **Fixtures** T007/T008/T009 — different files, run together.
- **Locales** T005/T006 — AR/EN, run together.
- **Shared components** T022/T023/T024/T025/T026/T027/T028 — different files, run together (T019/T020/T021 touch enhance.js/shared drawers — sequence those; NEVER parallelize edits to the same file: `enhance.js`, `build-html.mjs`, `nav.config.js`, `ar.js`/`en.js`, `run.cjs`, `app.css`).
- **Role-law/impact checks** T040/T041/T042 — read-only greps, run together.

## Implementation strategy (MVP first)

- **MVP = User Story 2 (Phase 4)**: reclassifying the misleading admin «preview action» toasts is the product owner's core "no dead mockup" ask and is independently shippable/testable on the existing 91 pages.
- **Increment 2 = User Story 1 (Phase 3)**: the 3 new ops pages + folds (91→97).
- **Increment 3 = US3/US6** then **verification US4/US5/US7 (Phases 7–8)**.
- Never parallelize edits to shared single files. Reuse the closed `data-*` hook set — if a fix seems to need a new hook, prefer a gate/reword (STOP + justify before adding a hook). Any fake persistence, any role-law hit, count ≠ 97, or `href="#"` = STOP + report.

# Tasks: Teacher Internal Pages (Spec 025)

**Input**: Design docs in `academy-dashboard-discovery/specs/025-teacher-internal-pages/`
**Prerequisites**: plan.md, spec.md (US1–US9), research.md (D1–D25), data-model.md, quickstart.md, 18 contracts
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `32c78c8` (Spec 024 committed); **77 public HTML → 91 target**.

**Nature**: static frontend implementation — 7 teacher internal pages, pay-free, honest gates, no backend, no fake actions. Generated only; do not execute here.

## Format: `- [ ] T### [P?] [US?] Description + exact file + verification`

- **[P]** = parallelizable (separate file, no dependency on an incomplete task).
- **[US?]** = spec user story (US1 schedule · US2 students · US3 outcomes · US4 tasks · US5 reports+anchor · US6 profile · US7 library · US8 grounded/pay-free visibility · US9 QA loads/links/pay-free). Setup/foundational/polish carry no story label.
- **Shared-file rule**: `fixtures/portal.js`, `ar.prt.js`, `en.prt.js`, `build-html.mjs`, `app.css`, `run.cjs` are edited by many stories — those edits are **sequential** (never `[P]` across stories). The 7 `teacher-*.js` **modules are separate files → `[P]`**.

---

## Phase 1 — Setup

- [ ] T001 Preflight: confirm `git branch --show-current` == `feature/012-role-portal-foundation`; `git log -1` == `32c78c8` (Spec 024 committed); `find academy-dashboard-discovery/app/public -maxdepth 1 -name "*.html" | wc -l` == **77**; `.specify/feature.json` → 025. Verification: all match; if count ≠ 77, STOP.
- [ ] T002 Baseline green: `cd academy-dashboard-discovery/app && npm run build` (idempotent, git clean after) then `npm test` (smoke + a11y green at HEAD). Verification: green baseline captured (so later reds are attributable to 025).
- [ ] T003 Load the scope guard (`contracts/scope-guard.md`): the forbidden-file list (package.json, admin/family/student modules, enhance.js, topbar.js, portal-shell.js, teacher-chat/finance/salary/pay/live-room pages) and the hard guards (91 HTML, pay-free 3-layer, no fake actions, anchor→teacher-reports). Verification: no forbidden file appears in any later task path.

## Phase 2 — Foundational (shared scaffolding; blocks all page stories)

- [ ] T004 Extend `TEACHER_PREVIEW` in `academy-dashboard-discovery/app/src/js/fixtures/portal.js` with static authored slices for the 7 pages (schedule sessions · roster · outcome states · tasks · report summaries · profile fields · library resources), reusing real outcome refs (out1/out4/out11/out15) where they exist; NO pay/computed/fake-live/chat/upload data (`contracts/teacher-pay-free-enforcement-contract.md`, data-model.md §3). Verification: source pay-free grep 0 hits; every value authored.
- [ ] T005 Add mirrored locale namespaces to `academy-dashboard-discovery/app/src/locales/ar.prt.js` and `en.prt.js`: `prt.title.tchSchedule/tchStudents/tchOutcomes/tchTasks/tchReports/tchProfile/tchLibrary` + `prt.tch.<page>.*` content/gate keys (camelCase title convention per research D7). AR RTL + EN mirrored; no raw keys; no pay/finance/chat-send/live-join wording. Verification: ar/en key sets identical; pay-free grep 0 hits.
- [ ] T006 [P] Add any additive living-layer CSS card classes needed by the pages (roster card, outcome checklist, resource card, rubric row) to `academy-dashboard-discovery/app/src/styles/app.css` — additive only, motion inside the existing reduced-motion block, no new hook/storage key (`contracts/scope-guard.md`). Verification: `git diff app.css` is additive; no rule above touched.

## Phase 3 — US1 teacher-schedule (P1) 🎯 MVP

- [ ] T007 [P] [US1] Create `academy-dashboard-discovery/app/src/js/pages/teacher-schedule.js` → `renderTeacherSchedule()`: `pageHead` + today `dayRail` (time·course/group·room·student count·status·prep) + week day-grouped agenda cards (Sat–Fri, truthful rest days, no grid clone) + next-class prep hint; enter/live-room + availability-edit = backendRequired `gateNote` (`contracts/teacher-schedule-contract.md`). Verification: no `href="#"`; no fake join; pay-free.
- [ ] T008 [US1] Register in `academy-dashboard-discovery/app/scripts/build-html.mjs`: `import { renderTeacherSchedule }` + PAGES entry `{ base:'teacher-schedule', shell:'portal', role:'teacher', personaKey:'data.t.sara', activeId:'schedule', titleKey:'prt.title.tchSchedule', render:renderTeacherSchedule }` (family-internal shape). Verification: exactly one import + one entry added.
- [ ] T009 [US1] Flip `ROLE_NAV.teacher` `schedule` `status:'planned'`→`'implemented'` in `fixtures/portal.js`. Verification: schedule nav is now an implemented self-link.
- [ ] T010 [US1] Rebake + verify: `npm run build`; `teacher-schedule.html`+`.en` exist; HTML count 79; page loads; agenda cards render; live-room/availability are backendRequired gates; `payHit` false; mobile-390 clean. Verification: all pass.

## Phase 4 — US2 teacher-students (P1)

- [ ] T011 [P] [US2] Create `academy-dashboard-discovery/app/src/js/pages/teacher-students.js` → `renderTeacherStudents()`: `pageHead` + roster cards (st1/st6/st11/st13: name·course/group·calm learning signal from out15/out4·next-session/latest-outcome) + follow-up `storyRow`; contact (if surfaced) = backendRequired; view-only (`contracts/teacher-students-contract.md`). Verification: zero form controls; no messaging composer; pay-free.
- [ ] T012 [US2] Register teacher-students in `build-html.mjs` (import + PAGES entry, `activeId:'students'`, `titleKey:'prt.title.tchStudents'`). Verification: one import + one entry.
- [ ] T013 [US2] Flip `ROLE_NAV.teacher` `students`→`implemented` in `fixtures/portal.js`. Verification: students nav is an implemented self-link.
- [ ] T014 [US2] Rebake + verify: `npm run build`; teacher-students pair exists; HTML count 81; roster view-only; no fake contact/edit; `payHit` false; mobile-390 clean. Verification: all pass.

## Phase 5 — US3 teacher-outcomes (P1)

- [ ] T015 [P] [US3] Create `academy-dashboard-discovery/app/src/js/pages/teacher-outcomes.js` → `renderTeacherOutcomes()`: `pageHead` + `flowStrip` prepare→attend→record→review (4 steps) + the five-field checklist display-only (attendance·remark·summary·homework note·files note) + example states (out1/out11) + honest review status; save/submit = backendRequired `guidePanel` (`contracts/teacher-outcomes-contract.md`). Verification: zero form controls; no fake save; no pay matrix; pay-free.
- [ ] T016 [US3] Register teacher-outcomes in `build-html.mjs` (`activeId:'outcomes'`, `titleKey:'prt.title.tchOutcomes'`). Verification: one import + one entry.
- [ ] T017 [US3] Flip `ROLE_NAV.teacher` `outcomes`→`implemented` in `fixtures/portal.js`. Verification: outcomes nav is an implemented self-link.
- [ ] T018 [US3] Rebake + verify: `npm run build`; teacher-outcomes pair exists; HTML count 83; flowStrip 4 steps + 5-field checklist display-only; save backendRequired; `payHit` false; mobile-390 clean. Verification: all pass.

## Phase 6 — US4 teacher-tasks (P2)

- [ ] T019 [P] [US4] Create `academy-dashboard-discovery/app/src/js/pages/teacher-tasks.js` → `renderTeacherTasks()`: `pageHead` + task board from `TEACHER_PREVIEW.tasks` (tk1/tk2 + static: title·priority/status tag·due/next-class) + monthly-plan preview row; complete/assign = backendRequired (`contracts/teacher-tasks-contract.md`). Verification: no fake completion; no tickets chart/Average; pay-free.
- [ ] T020 [US4] Register teacher-tasks in `build-html.mjs` (`activeId:'tasks'`, `titleKey:'prt.title.tchTasks'`). Verification: one import + one entry.
- [ ] T021 [US4] Flip `ROLE_NAV.teacher` `tasks`→`implemented` in `fixtures/portal.js`. Verification: tasks nav is an implemented self-link.
- [ ] T022 [US4] Rebake + verify: `npm run build`; teacher-tasks pair exists; HTML count 85; task cards + status tags; complete backendRequired; no chart/average; `payHit` false. Verification: all pass.

## Phase 7 — US5 teacher-reports (P2) + performance anchor repoint

- [ ] T023 [P] [US5] Create `academy-dashboard-discovery/app/src/js/pages/teacher-reports.js` → `renderTeacherReports()`: `pageHead` (academic-only) + session-completion/attendance-quality summary (authored counts, NO charts) + student-progress summaries + monthly rubric dimension lines display-only (achievements·learning-progress·focus·homework·punctuality + rescheduled/support/objectives, no scales); export/download = backendRequired (`contracts/teacher-reports-pay-free-contract.md`). Verification: **zero pay/finance token; no computed score/chart**; pay-free.
- [ ] T024 [US5] Register teacher-reports in `build-html.mjs` (`activeId:'reports'`, `titleKey:'prt.title.tchReports'`). Verification: one import + one entry.
- [ ] T025 [US5] Flip `ROLE_NAV.teacher` `reports`→`implemented` in `fixtures/portal.js`. Verification: reports nav is an implemented self-link.
- [ ] T026 [US5] Repoint the teacher-home performance anchor in `academy-dashboard-discovery/app/src/js/pages/teacher-portal.js:70`: `perfHref` `teacher-performance(.en).html` → `teacher-reports(.en).html`. Verification: teacher-portal body anchor now targets teacher-reports.
- [ ] T027 [US5] Re-pin the smoke anchor assert in `academy-dashboard-discovery/app/tests/smoke/run.cjs` (teacher-portal block ~line 1124): `bodyAnchors === 1` kept; target regex `teacher-performance` → `teacher-reports` (`contracts/smoke-rescope-contract.md`). Verification: assert updated; shell-anchor multiset stays {self×2,hub×3}=5.
- [ ] T028 [US5] Update the Spec 024 B-07 exemption note in `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/contracts/teacher-pay-free-global-contract.md`: the teacher-home→admin-board tension is CLOSED (anchor now → teacher-reports, teacher-owned pay-free); the admin board is admin-nav-only. Verification: append-only note added.
- [ ] T029 [US5] Rebake + verify: `npm run build`; teacher-reports pair exists; HTML count 87; three-layer pay-free scan zero-hit ON THIS PAGE; no chart/score; export backendRequired; teacher-portal → teacher-reports (grep `teacher-performance` in teacher-portal.html == 0). Verification: all pass.

## Phase 8 — US6 teacher-profile (P2)

- [ ] T030 [P] [US6] Create `academy-dashboard-discovery/app/src/js/pages/teacher-profile.js` → `renderTeacherProfile()`: `pageHead`/light `idHero` + identity·subjects/specializations·availability windows (from/to day+time display-only)·teaching preferences; exactly three backendRequired write gates (photo·save·password) (`contracts/teacher-profile-contract.md`). Verification: no financial info; no fake save; pay-free.
- [ ] T031 [US6] Register teacher-profile in `build-html.mjs` (`activeId:'profile'`, `titleKey:'prt.title.tchProfile'`). Verification: one import + one entry.
- [ ] T032 [US6] Flip `ROLE_NAV.teacher` `profile`→`implemented` in `fixtures/portal.js`. Verification: profile nav is an implemented self-link.
- [ ] T033 [US6] Rebake + verify: `npm run build`; teacher-profile pair exists; HTML count 89; identity/subjects/availability display-only; exactly 3 write gates; `payHit` false; mobile-390 clean. Verification: all pass.

## Phase 9 — US7 teacher-library (P2)

- [ ] T034 [P] [US7] Create `academy-dashboard-discovery/app/src/js/pages/teacher-library.js` → `renderTeacherLibrary()`: `pageHead` + resource cards from `TEACHER_PREVIEW.materials` (tm1/tm2/tm3 + static: name·type chip·status·linked course/group) + static filter ONLY if it works; upload/download = backendRequired (`contracts/teacher-library-contract.md`). Verification: no fake upload/download/open/delete; no fake filter; pay-free.
- [ ] T035 [US7] Register teacher-library in `build-html.mjs` (`activeId:'library'`, `titleKey:'prt.title.tchLibrary'`). Verification: one import + one entry.
- [ ] T036 [US7] Flip `ROLE_NAV.teacher` `library`→`implemented` in `fixtures/portal.js`. Verification: library nav is an implemented self-link; ALL 7 teacher internals now implemented.
- [ ] T037 [US7] Rebake + verify: `npm run build`; teacher-library pair exists; **HTML count 91**; resource cards + status; upload/download backendRequired; any filter works statically; `payHit` false. Verification: all pass; count == 91.

## Phase 10 — Cross-cutting: smoke / a11y / screenshots / audits (US8, US9 + polish)

- [ ] T038 [US9] Smoke rescope in `academy-dashboard-discovery/app/tests/smoke/run.cjs` (`contracts/smoke-rescope-contract.md`): add the 7 pages to PORTAL_PAGES + per-page load/gate asserts; teacher nav block `navListAnchors===8` (was 1), `plannedNavAnchors===0`, `navAside===8 && navDrawer===8`, `aria-current` self; bump the load count to the new total; per-page gate asserts (schedule live-room, outcomes save, library upload/download, profile 3 gates, reports export + no-chart/finance-free). `payHit`/`famPay`/admin asserts BYTE-VERBATIM. Verification: `git diff run.cjs` shows only additive/declared amendments.
- [ ] T039 [US9] Run full smoke: `npm run test:smoke`. Verification: green — 91-page total, teacher nav 8 implemented, `plannedNavAnchors===0`, anchor→teacher-reports, no `href="#"`/dead/raw-key, `payHit` false on all 8 teacher pages, admin/family/student pins intact.
- [ ] T040 [US9] A11y coverage in `academy-dashboard-discovery/app/tests/a11y/run.cjs`: add the 7 pages (AR+EN + ≥1 dark + ≥1 mobile-390); run `npm run test:a11y`. Verification: critical=0 serious=0; honest gates aria-safe.
- [ ] T041 [US8] Screenshots in `academy-dashboard-discovery/app/tests/screenshots/capture.cjs`: capture all 7 AR desktop + ≥1 EN + teacher-portal post-conversion (8-item nav) + teacher-reports + teacher-library + a mobile-390 + a dark sample; run `node tests/screenshots/capture.cjs`. Verification: captured, 0 console errors.
- [ ] T042 [P] [US8] Update `academy-dashboard-discovery/app/screenshots/REVIEW.md` with a Spec 025 section (the 7 pages, nav conversion, anchor repoint, pay-free result). Verification: section added.
- [ ] T043 [US8] Teacher pay-free three-layer audit (`contracts/teacher-pay-free-enforcement-contract.md`): source grep (incl. comments) over the 7 modules + teacher fixture slices + teacher locale keys → 0; built grep over teacher-portal + 7 pages ×2 langs → 0; smoke `payHit` false on all 8. Verification: all three green; `payHit` byte-verbatim.
- [ ] T044 [P] [US9] Count + identity audit (`contracts/teacher-page-count-contract.md`, `impact-protection-contract.md`): HTML == 91; a sampled admin page + a family page + a student page byte-identical vs HEAD; teacher-portal diff limited to nav+anchor. Verification: all pass.
- [ ] T045 [P] Docs: update `academy-dashboard-discovery/app/README.md` + CLAUDE.md (Spec 025 delivered: 7 teacher internals, 91 HTML, nav conversion, anchor repoint, pay-free). Verification: append-only; no unrelated content changed.
- [ ] T046 Clean-code guard on the full diff: 7 modules idiomatic + consistent with family/student pages, locales mirrored ar/en, CSS additive, no dead code, no forbidden-token comments; no scope creep. Verification: reviewer notes recorded.
- [ ] T047 Test-guard on the smoke/a11y diff: every amendment additive + declared (new pages, nav 1→8, anchor re-pin, gate asserts); `payHit`/`famPay`/admin byte-verbatim; no assertion loosened. Verification: `git diff run.cjs` within the sanctioned amendments.
- [ ] T048 Forbidden-file diff proof: `git diff --name-only` contains NONE of package.json, admin/family/student page modules, enhance.js, topbar.js, portal-shell.js, or any teacher-chat/finance/salary/pay/live-room page. Verification: name-only diff within the `scope-guard.md` allowed set.
- [ ] T049 Final gate + report: re-run `npm run build && npm test && node tests/screenshots/capture.cjs`; produce the report (files changed · HTML 91 · 7 pages result · nav conversion · anchor repoint · pay-free 3 layers · a11y 0/0 · identity protection · clean-code/test-guard · forbidden-file proof · no backend/fake-actions · no commit/push · GO for Spec 026). Verification: all green; report complete.

---

## Dependencies & execution order

- **Phase 1–2** (T001–T006) block all page stories (baseline + shared fixtures/locales/CSS).
- **US1 schedule (Phase 3)** is the P1 **MVP** — independently testable, delivers one live nav page.
- **US2/US3** (P1) and **US4–US7** (P2) each deliver one live page; run in priority order. Each story's module (`.js`) is `[P]` (separate file); its build-html/portal.js/rebake steps are sequential (shared files).
- **US5** additionally does the anchor repoint (T026) + smoke re-pin (T027) + B-07 note (T028) — teacher-reports must exist first (T023).
- **Phase 10** runs after all 7 pages exist: smoke rescope (T038) → smoke (T039) → a11y (T040) → screenshots (T041) → audits (T043/T044) → docs → guards → final gate.

## Parallel opportunities

`[P]` (separate files): the 7 module-creation tasks T007/T011/T015/T019/T023/T030/T034 could be authored in parallel BEFORE their sequential build-html/nav/rebake steps; T006 (CSS) · T042 (REVIEW.md) · T044 (audit) · T045 (docs). **Never parallelize** edits to `portal.js`, `ar.prt.js`, `en.prt.js`, `build-html.mjs`, `run.cjs`, or a rebake.

## Implementation strategy (MVP → incremental)

1. **MVP**: Phase 1–2 + US1 schedule → one live teacher internal page (nav link works, gates honest, pay-free). Shippable + testable alone.
2. **+ P1 core**: US2 students + US3 outcomes (the daily teaching triad).
3. **+ P2**: US4 tasks → US5 reports (+ anchor repoint, the pay-free-sharpest page) → US6 profile → US7 library.
4. **Gate**: Phase 10 after all 7 — never proceed past a red pay-free/count/a11y audit.

## Count checkpoints (per story)

77 → schedule 79 → students 81 → outcomes 83 → tasks 85 → reports 87 → profile 89 → library **91**. Any deviation = STOP.

## Out of scope (NO tasks)

No teacher-chat/finance/salary/pay/live-room page; no backend/API/auth; no package.json/dependency change; no admin/family/student module edits; no new chart/animation engine; no new hook/storage key. Chat stays future (→ Spec 026); live-room stays future-backend (honest gate).

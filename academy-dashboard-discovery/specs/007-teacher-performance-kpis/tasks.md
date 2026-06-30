---
description: "Task list for Spec 007 — Teacher Performance and Academic KPIs"
---

# Tasks: Teacher Performance and Academic KPIs

**Input**: Design documents from `academy-dashboard-discovery/specs/007-teacher-performance-kpis/`
**Prerequisites**: plan.md, spec.md (US1–US10), research.md (D1–D10), data-model.md (16 shapes + 3 maps), contracts/ (13) — all present.

**Tests**: **INCLUDED** — the spec mandates automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, HTML-structure/no-`#app`, labeled-chip/filter/profile-tab/link asserts, teacherAbsent≠studentAbsent, no-score/rank/chart, no-finance) **and** screenshot-based visual acceptance (the final gate).

**App root**: `academy-dashboard-discovery/app/` (paths relative to it). Spec 007 **extends the implemented Spec 001–006 app in place** — same static HTML-first SSG, same pipeline, **no new dependency, no new runtime hook**. Existing files are unchanged unless a task says EXTEND/CHANGE.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US10 (story phases only)

## Story sequencing rationale (read first)

This is a reuse-heavy, multi-surface spec (Teachers enrich + Teacher profile + Teacher Performance board + light integrations), sequenced **MVP-first by dependency** (plan §Phasing):

- **Setup + Foundational** build the page-agnostic blocks: the i18n overlay + CSS, the **three labeled maps** (`teacher-status`, `teacher-signals` = workload + follow-up), the **`teacherActions()`** cluster, the **teacher-fixture extension** (status/workload/followUp/notes — **NO finance**), the **`outcomesOfTeacher(id)`** resolver, and the per-teacher resolvers every surface composes.
- **US1 (Teachers enrich, P1)** + **US2 (Teacher profile, P1 — the MVP payoff)** build the entry point + the academic hub; the profile ships with the Timetable tab filled (pure Spec 003 reuse) and the **Sessions & Outcomes** + **Follow-up** tabs as labelled stubs owned by:
  - **US3 (workload, P2)** verifies the workload chip across card/banner/board (authored flag, no engine).
  - **US4 (outcomes & absence, P2)** fills the Sessions & Outcomes tab (reuse the Spec 005 canonical drawer; teacherAbsent ≠ studentAbsent).
  - **US5 (follow-up navigation, P2)** fills the Follow-up tab + the cross-surface student/family/course/group links.
  - **US6 (actions, P2)** fills the action clusters on the card/profile/board.
- **US7 (Teacher Performance board, P1)** promotes `teacherKpi` and builds the KPI/follow-up board (display-only counts).
- **US8 (dashboard, P2)** is a one-chip integration.
- **US9 (static/Django, P1)** + **US10 (visual + screenshots, P1)** are the cross-cutting acceptance gates sequenced last.

Earliest demo = **US1** (enriched Teachers). **MVP = US1 + US2** (enriched Teachers → a real Teacher profile). US7 is the headline second increment.

---

## Phase 1: Setup

**Purpose**: Guard the baseline; add the i18n namespace, CSS scaffolding, and any new icons.

- [x] T001 Verify the Spec 001–006 baseline is green before extending: run `npm run build && npm test && npm run test:smoke && npm run test:a11y && npm run screenshots` in `academy-dashboard-discovery/app/` and confirm clean (no regressions to protect)
- [x] T002 [P] Add Spec 007 i18n keys: NEW `src/locales/ar.trn.js` + `src/locales/en.trn.js` (`topbar.title/crumb.{teacher,teacherPerf}`; the profile tab labels `trn.tab.*`; `trn.kpi.*` banner KPIs; `trn.status.*` active/paused/inactive; `trn.workload.*` light/balanced/high; `trn.signal.*` strongDelivery/stable/needsFollowUp/attentionRisk; `trn.perfTile.*` board tiles; `trn.action.*` toasts/titles + `trn.reason.assign`/`trn.reason.export`; `trn.followup.*`; `trn.none.*` empty states; `dash.teachersFollowup`) and wire both into `src/js/i18n.js` (two imports + two `deepMerge` lines, exactly like `ar.att.js`/`ar.crs.js`) — Arabic «تفاصيل المعلّم»/«أداء المعلّمين» first + English; mirror every key, keep all prior keys (reuse the existing base `trn.*` directory/availability keys — do NOT duplicate them)
- [x] T003 [P] EXTEND `src/styles/app.css` (Spec 007 `@layer`): the enriched teacher-card counts row + workload/follow-up chip placement; the performance-board KPI tile band; the per-teacher comparison row; the follow-up-queue list; reuse existing card/chip/medallion/tab/tile tones (NO new tone CSS, NO chart CSS)
- [x] T004 [P] Vendor any new icons in `scripts/vendor-assets.cjs` only if used by the three maps (e.g. `pause-circle`/`user-x`/`trending-down`/`activity`/`trending-up`/`award`/`flag`); reuse existing icons where possible; build must report `0 missing` (NO chart/sparkline icon)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The labeled maps + actions cluster + fixture extension + resolvers every surface composes.

**⚠️ CRITICAL**: No story begins until this phase is complete.

- [x] T005 [P] Implement `src/js/components/teacher-status.js` — the NEW labeled TEACHER status map (`active/paused/inactive`) `{id,tone,icon,labelKey}` + `TEACHER_STATUS_ORDER` + `teacherStatusOf(id)` (fallback `active`) + `teacherStatusChip(id)`; reuse existing chip tones; **never numeric/color-only**; the 7th vocabulary, distinct from session/lifecycle/outcome/course/group/enrollment maps (per teacher-status-contract §3 / data-model §2)
- [x] T006 [P] Implement `src/js/components/teacher-signals.js` — TWO labeled maps: **workload** (`light/balanced/high`) + `WORKLOAD_ORDER` + `workloadOf(id)` + `workloadChip(id)`, and **follow-up** (`strongDelivery/stable/needsFollowUp/attentionRisk`) + `SIGNAL_ORDER` + `signalOf(id)` + `signalChip(id)`; both **display-only authored fixture flags** (never computed scores/ranks); icon+text, never numeric/color-only (per teacher-status-contract §4/§5 / data-model §4/§5)
- [x] T007 [P] Implement `src/js/components/teacher-actions.js` — `teacherActions(item)` the honest cluster: add/edit/message/addNote = `data-demo-action`+`data-toast`; notifyFamily = `data-confirm`(+`-title/-msg/-cta/-toast`)→demo toast; assignCourse/assignGroup/exportSummary = `data-disabled-reason`+`data-reason-key`; openTimetable/viewAttendance = real `<a href>` links — reusing the EXISTING hooks; **NO add of any salary/deactivate/login-as/delete action** (per teacher-actions-contract / data-model §15)
- [x] T008 EXTEND `src/js/fixtures/teachers.js` — add `statusId` (active/paused/inactive), `workload` (light/balanced/high), `followUp` (strongDelivery/stable/needsFollowUp/attentionRisk), and `notesKey` to **each of the 8 rows** (authored seed per data-model §1: sara active/balanced/strongDelivery … abdullah paused/light/attentionRisk … huda inactive/light/needsFollowUp); keep all existing fields; optionally add a `TEACHER_BY_ID` export. **NO salary/payroll/compensation/payout/hour-rate/currency field is added** (scope-guard G1)
- [x] T009 EXTEND `src/js/fixtures/attendance.js` — add `outcomesOfTeacher(teacherId) = SESSION_OUTCOMES.rows.filter(r => r.trainer.id === teacherId)` beside `outcomesOfStudent`/`outcomesOfFamily` (the only new resolver); optionally seed a couple of fixture outcomes for a sparse teacher (e.g. `huda`) so the baked profile/board reads representatively — **real fixture rows, never fabricated/computed metrics** (per teacher-outcomes-contract §2 / data-model §11)
- [x] T010 [P] Implement the per-teacher resolvers (a small `src/js/fixtures/teacher-links.js` OR inline helpers reused by the pages): `coursesOfTeacher(id)` (`COURSES.rows.filter(c => c.teacherIds.includes(id))`), `studentsOfTeacher(id)` (union of the teacher's `groupsOfTeacher` rosters → `STUDENT_BY_ID`, deduped), `scheduleOfTeacher(id)` (`SCHEDULE_WEEK` blocks where `trainer.id===id`), and the count breakdown (completed/teacherAbsent/studentAbsent/cancelled from `outcomesOfTeacher`) — single-source resolvers; `groupsOfTeacher` already exists (per data-model §6–§11)

**Checkpoint**: maps + actions + fixture extension + resolvers ready; build still green (no page wired yet); the G8a grep audit (no finance/score token) clean.

---

## Phase 3: User Story 1 — Admin reviews & filters Teachers (Priority: P1) 🏗️ MVP start

**Goal**: An enriched Teachers directory — academic counts + labeled status/workload + a profile link.

**Independent Test**: Open Teachers; read each card's labeled status + courses/groups/students counts + upcoming hint + workload hint + "View profile" link; filter by subject/status/workload (narrow + count + no-results/reset); a sparse teacher shows calm zero hints. Not a generic HR table.

- [x] T011 [US1] CHANGE `src/js/pages/teachers.js` `renderTeachers()` — enrich each `directoryCard` (the `teacherStatusChip(statusId)` as card status; courses/groups/students counts via `statMini` + an upcoming-sessions hint, from the T010 resolvers; the `workloadChip(workload)`; a `signalChip(followUp)` flag **only when** `followUp ∈ {needsFollowUp, attentionRisk}`; a **"View profile"** `<a href="teacher.html">`) over the EXISTING `cardGrid`; add `status` + `workload` facets to the `filterBar` (keep search/subject/availability); update `facetAttrs` on the card root with `status`/`workload`; keep `summaryCards` + `noResults` + the preview drawer
- [x] T012 [US1] Build + verify `public/teachers.html` (+ `.en`): enriched counts + labeled status/workload chips baked; the status/workload filters narrow with a count + a no-results/reset state; the View-profile links are real `<a href="teacher.html">`; the follow-up flag appears only on flagged teachers; a sparse teacher (`huda`) shows zero hints; no salary; no computed score; no dead controls; not an HR/employee table

**Checkpoint** 🎯: Teachers is the enriched academic entry point.

---

## Phase 4: User Story 2 — Admin opens a Teacher profile (Priority: P1) 🏗️ MVP payoff

**Goal**: The teacher academic hub — banner + 8 baked tabs (Sessions&Outcomes + Follow-up filled by US4/US5).

**Independent Test**: Open `teacher.html`; banner shows medallion + name + labeled status + meta (subjects/availability/workload) + KPIs; switch tabs (exactly one visible); Courses → `course.html`, Groups → `group.html`, Students → `student.html` (family chip → `family.html`); Timetable shows the shared agenda + a `schedule.html#view=timetable` link. Not a portal; no salary tab.

- [x] T013 [US2] Implement `src/js/pages/teacher.js` `renderTeacher()` (bake `sara`) — `profileBanner` (medallion + name + `teacherStatusChip` + meta [subject chips · `TEACHER_AVAIL` chip · `workloadChip`] + ≤4 `statMini` KPIs [courses/groups/students/upcoming] + an actions slot) + `tabs` (8: `overview/courses/groups/timetable/sessions-outcomes/students/follow-up/notes`); FILL **Overview** (snapshot `sheetRow`s + the absence summary as **two distinct** labeled facts teacherAbsent/studentAbsent + cross-links to schedule/attendance) + **Courses** (rows → `course.html`) + **Groups** (cards → `group.html`; `abdullah`→"no groups yet") + **Students** (rows → `student.html`, family chip → `family.html`) + **Timetable** (reuse `scheduleAgenda` via `cohortTimetablePanel` + `cohortTemplates` over `scheduleOfTeacher(id)` + a `schedule.html#view=timetable` deep-link) + **Notes**; leave **Sessions & Outcomes** + **Follow-up** as labelled stubs (filled US4/US5)
- [x] T014 [US2] EXTEND `scripts/build-html.mjs` — register `{base:'teacher', activeId:'teachers', titleKey:'topbar.title.teacher', crumbKey:'topbar.crumb.teacher', render: renderTeacher}` (ar+en); profile template, **NOT** a nav item
- [x] T015 [US2] Build + verify `public/teacher.html` (+ `.en`): banner + 8 baked tabs, exactly one visible + tab-switch works; Courses→course.html / Groups→group.html / Students→student.html (family→family.html) links real; the Timetable tab shows the shared agenda + the schedule deep-link + opens the shared appointment drawer; the `teachers` nav item stays active (`aria-current`); `teacher` is not a nav item; **not a portal, no salary/compensation tab**

**Checkpoint** 🎯: MVP — enriched Teachers + a real Teacher profile.

---

## Phase 5: User Story 3 — Admin understands teacher workload (Priority: P2)

**Goal**: The workload chip reads consistently as an authored fixture flag across card, banner, and board.

**Independent Test**: On Teachers + the profile banner (+ the board after US7), the labeled workload hint (icon+text) is backed by fixture session/hour counts; no claim of a computed/real workload metric.

- [x] T016 [US3] Verify the `workloadChip` renders consistently on the teacher card (US1) + the profile banner (US2) (and is ready for the board, US7); CHANGE only the surface(s) missing it; assert the workload is an **authored fixture flag** (from `teacher.workload`), backed by display session/hour counts, **never** a computed/calculated metric and never numeric/color-only; build + verify

**Checkpoint**: Workload is an honest fixture display everywhere.

---

## Phase 6: User Story 4 — Admin reviews teacher outcomes & absence (Priority: P2)

**Goal**: Fill the Sessions & Outcomes tab via the Spec 005 canonical drawer; teacherAbsent ≠ studentAbsent.

**Independent Test**: On `teacher.html` → Sessions & Outcomes tab, the teacher's outcomes render with labeled chips, teacherAbsent and studentAbsent are visibly distinct, opening one uses the canonical drawer, and a "View attendance" link opens `attendance.html`.

- [x] T017 [US4] CHANGE `src/js/pages/teacher.js` — FILL the **Sessions & Outcomes** tab via `outcomeRow` + the canonical `outcomeTemplate` drawer (resolve `outcomesOfTeacher(id)`) through `cohortOutcomesPanel` + `cohortTemplates` + an `attendance.html` deep-link; bake the outcome drawer `<template>`s; ensure `teacherAbsent` vs `studentAbsent` render as two distinct chips; complete the Overview absence summary (two distinct facts) using the `outcomesOfTeacher` count breakdown — **reuse, NO bespoke drawer (SC-009)**
- [x] T018 [US4] Build + verify: outcome rows with labeled outcome chips; opening one opens the SAME canonical drawer (Status + Outcome + present/capacity + attribution); `teacherAbsent` ≠ `studentAbsent` (lowercased `data-outcome="teacherabsent"` vs `"studentabsent"`); the attendance deep-link navigates; a zero-outcome teacher (`huda`) → "no outcomes yet"; **no attendance mutation, no computed delivery score**

**Checkpoint**: The teacher's delivery is reviewable, absences distinct.

---

## Phase 7: User Story 5 — Admin follows up from teacher context (Priority: P2)

**Goal**: Fill the Follow-up tab + the cross-surface student/family/course/group navigation.

**Independent Test**: On `teacher.html` → Follow-up tab, fixture follow-up rows render with deep-links; from the profile, student/family/group/course/schedule/attendance links all navigate.

- [x] T019 [US5] CHANGE `src/js/pages/teacher.js` — FILL the **Follow-up** tab (a calm fixture list: needs-follow-up outcomes / groups needing attention, each with a labeled chip + group/student/family context + deep-links to `student.html`/`family.html`/`group.html`/`course.html`/`attendance.html` + an `addNote` demo action); confirm the Students/Courses/Groups tab cross-links resolve (no dead links) — **no follow-up engine, no persistence**
- [x] T020 [US5] Build + verify: the follow-up rows + every teacher→student/family/group/course/schedule/attendance link navigate to the right in-scope page; an item with no group/family shows no dead link; empty → "nothing needs follow-up"; no portal

**Checkpoint**: Cross-surface follow-up works.

---

## Phase 8: User Story 6 — Admin performs demo teacher actions (Priority: P2)

**Goal**: Honest actions across the card, profile, and board.

**Independent Test**: Trigger each action; confirm demo toast / confirm→toast / disabled-with-reason / real link; Notify-family opens a confirm modal → toast; nothing mutates.

- [x] T021 [US6] CHANGE `src/js/pages/teacher.js` (banner actions slot) + `src/js/pages/teachers.js` (card/preview actions) — wire the `teacherActions()` cluster (add/edit/message/addNote = demo toast; notifyFamily = confirm→toast; assignCourse/assignGroup/exportSummary = disabled-with-reason; openTimetable/viewAttendance = real links). (The Teacher Performance board reuses the same cluster in US7/T024.)
- [x] T022 [US6] Build + verify: add/edit/message/addNote → demo toast; notifyFamily → confirm modal → toast; assignCourse/assignGroup/exportSummary → disabled-with-reason; openTimetable/viewAttendance → real links; **no salary/deactivate/login-as/delete action; no dead control; no persistence/mutation**

**Checkpoint**: Honest actions, no engine, no finance.

---

## Phase 9: User Story 7 — Admin reviews the Teacher Performance board (Priority: P1)

**Goal**: Promote `teacherKpi`; build the academy-wide KPI/follow-up board — display-only counts.

**Independent Test**: Open `teacher-performance.html`; the sidebar item is a real `<a>`; read the KPI tiles + the per-teacher comparison rows (raw counts + workload/follow-up chips, each → `teacher.html`) + the follow-up queue; confirm NO computed score/rank/percentile/chart and NO salary/finance.

- [x] T023 [US7] CHANGE `src/js/nav.config.js` — promote the planned `teacherKpi` item to `route:'teacher-performance.html'` (remove `status:'planned'`); leave `sessionsKpi`/`monthlyPerf`/`addTeacher`/`teacherCategories` planned; the build-time nav guard must pass (per navigation-impact-contract §2c)
- [x] T024 [US7] Implement `src/js/pages/teacher-performance.js` `renderTeacherPerformance()` — `pageHeader` («أداء المعلّمين») + **KPI tiles** (`summaryCards`/`kpiCard`/`status-tile` over fixture counts: active teachers · completed sessions · teacher absences · student absences in teacher sessions · cancelled/rescheduled · groups needing attention · teachers needing follow-up) + `filterBar` (facets teacher/subject/workload/follow-up/status) + a **per-teacher comparison list** (`directoryCard`/`statMini` rows: avatar + name + `workloadChip` + `signalChip` + raw counts [completed/teacherAbsent/studentAbsent/groups] + a **"View profile"** `<a href="teacher.html">`) + a **follow-up queue** + `noResults`; wire the `teacherActions()` board actions; **NO score, NO rank/position/percentile, NO chart/canvas, NO salary** — every number is a fixture count
- [x] T025 [US7] EXTEND `scripts/build-html.mjs` — register `{base:'teacher-performance', activeId:'teacherKpi', titleKey:'topbar.title.teacherPerf', crumbKey:'topbar.crumb.teacherPerf', render: renderTeacherPerformance}` (ar+en); the build-time nav guard must pass
- [x] T026 [US7] Build + verify `public/teacher-performance.html` (+ `.en`): the `teacherKpi` nav item is a real `<a href="teacher-performance.html">` (active pill); the KPI tiles + comparison rows (each → `teacher.html`) + follow-up queue are baked; `teacherAbsent` and `studentAbsent` appear as **two distinct labeled facts** (never one "absences"); the only numbers are fixture **counts** (the G8a grep finds no `score`/`rank`/`chart`/`salary` token); filters narrow via facets; no dead link

**Checkpoint** 🎯: The Teacher Performance board is live — counts + signals, no fake analytics.

---

## Phase 10: User Story 8 — Dashboard impact (Priority: P2)

**Goal**: ONE minimal fixture teacher signal.

**Independent Test**: On the dashboard, ONE "teachers needing follow-up" chip + a deep-link to Teacher Performance; no new stat wall.

- [x] T027 [US8] CHANGE `src/js/pages/dashboard.js` — fold ONE fixture-backed "teachers needing follow-up" chip (`TEACHERS.rows.filter(r => r.followUp==='needsFollowUp' || r.followUp==='attentionRisk').length`) into the EXISTING people-signal card (beside the students-attention + outcome-follow-up + groups-attention chips) linking to `teacher-performance.html`; build + verify (no new card/tile/stat wall, no fabricated analytics, no finance widget)

**Checkpoint**: The dashboard connects to teacher performance minimally.

---

## Phase 11: User Story 9 — Static / Django-ready (Priority: P1)

**Goal**: The new surfaces are complete baked HTML; no runtime page DOM.

**Independent Test**: Build; View Source on `teachers.html`/`teacher.html`/`teacher-performance.html` — full shell + cards/tiles/rows + all tab panels + all drawer templates baked, no `#app`, relative paths.

- [x] T028 [US9] EXTEND `tests/smoke/run.cjs` — add `teacher` + `teacher-performance` to PAGES and assert: enriched teacher cards (labeled status chip icon+text + courses/groups/students counts + a real `<a href="teacher.html">`); the status/workload facets narrow with a count + no-results/reset; the profile **8 tabs** baked + **exactly one visible** + switch works; Courses→`course.html` / Groups→`group.html` / Students→`student.html` / family→`family.html` links real; the Timetable tab has `data-agenda` + a real `<a href>` to `schedule.html#view=timetable`; the Sessions & Outcomes tab opens the **canonical** outcome drawer with **both a teacherAbsent and a studentAbsent row present and distinct** (lowercased `data-outcome`); `teacher-performance` has KPI **tiles** + a per-teacher comparison list (each → `teacher.html`) + a follow-up queue with **counts but NO `score`/`rank`/`chart`/`canvas` token**; **no `salary`/`payroll`/`compensation`/`payout` text or widget**; the `teacherKpi` nav item is a real `<a>` (rest of teacher items stay Soon); `teacher.html` is **NOT** in the sidebar nav; the dashboard adds **at most one** teacher chip; **all** teacher actions are demo/disabled/confirm-only (no dead control); portal ids absent; no `#app`; relative paths; no external/CDN request
- [x] T029 [US9] Update `app/README.md` + `quickstart.md` with the Django mapping for the teacher surfaces (`{% for teacher %}`, the teacher profile → `teacher_detail.html` with `{% if active_tab %}`, the canonical outcome drawer → ONE `{% include "admin/_outcome_details.html" %}`, the appointment drawer → ONE `{% include "admin/_appointment_details.html" %}`, the status/workload/follow-up maps → template tags, the board → `{% for row in teacher_perf %}`)

**Checkpoint**: Static/Django integrity verified for the new surfaces.

---

## Phase 12: User Story 10 — Visual / reference alignment + screenshots (Priority: P1)

**Goal**: The new surfaces match the approved direction; the 12-frame matrix passes.

**Independent Test**: Capture the matrix; review each vs Spec 001–006 + the legacy teacher screens (product reference only); axe clean; responsive correct; no failure condition.

- [x] T030 [P] [US10] EXTEND `tests/screenshots/capture.cjs` MATRIX with the 12 Spec 007 frames (Teachers AR light/dark + EN; Teacher profile AR light; Teacher Performance board AR light; Teacher profile Timetable + Sessions&Outcomes + Students tabs; Teacher action confirm modal [Notify family]; Dashboard teachers-followup; mobile Teachers; mobile Teacher profile) reusing the existing `view`/`variant` mechanism + a click step for the confirm frame — per screenshot-acceptance §A2a
- [x] T031 [P] [US10] EXTEND `tests/a11y/run.cjs` — add `teachers` (dark + EN), `teacher` (ar light + a `#view=` tab state), `teacher-performance` (ar light + dark); fix any critical violation; confirm status/workload/follow-up/outcome chips never color-only
- [x] T032 [US10] Run `npm run build && npm run screenshots`; review each capture side-by-side vs the approved Spec 001–006 direction + the sidebar reference + the legacy teacher screens (product reference only); fix any failure condition (generic-HR-dashboard / employee-table / fake-analytics / score-rank-leaderboard / salary-widget / missing-teacher↔course/group/schedule-relationship / missing-teacherAbsent-vs-studentAbsent / dead-actions / poor-dark / broken-RTL-LTR / persistence-claim / raw-i18n-keys / JS-rendered-whole-page / portal); record verdicts in `app/screenshots/REVIEW.md` (the FINAL gate)
- [x] T033 [US10] Responsive pass: verify + fix mobile Teachers (cards → single-column; chips wrap) and mobile Teacher profile (tabs scroll; drawer full-height) — no horizontal overflow in RTL or LTR

**Checkpoint**: Screenshot matrix accepted; no drift; relationships + labeled signals + reused drawer present; no fake score/salary.

---

## Phase 13: Polish & Cross-Cutting Concerns

- [x] T034 [P] Verify the scope guard end-to-end per `contracts/scope-guard.md` — run the **G8a grep AUDIT** (each prints nothing: no `salary`/`payroll`/`payout`/`compensation`/`fine`/`hour-rate`/`currency`; no `chart`/`canvas`/`leaderboard`/`percentile`; no `http(s)`/CDN; no raw `⟦`; no `id="app"`); confirm no backend/auth/CRUD/persistence; no teacher-management/assignment/workload-calc/performance-scoring/ranking/salary-payroll/attendance/scheduling/notification engine; no portals/role dashboards (smoke: portal ids absent); no legacy numeric `status=0..N`; no legacy assets/classes/palette/wording; **every number on the teacher surfaces traces to a fixture count / resolved list length**
- [x] T035 [P] Run the `quickstart.md` flow end-to-end (build → preview → review teachers/teacher/teacher-performance/timetable/outcomes/actions/dashboard → verify teacherAbsent-vs-studentAbsent → verify student/family/course/group links → verify static-first → verify no-persistence/scoring/payroll → test → screenshots) and fix any gap
- [x] T036 Fixture coherence: `outcomesOfTeacher(id)` returns only `trainer.id`-matching rows; every teacher's `coursesCount/groupsCount/studentsCount/upcomingCount` + the completed/teacherAbsent/studentAbsent/cancelled breakdown match the resolved links; `abdullah` (no group) → "no groups yet" (no dead link), `huda` (zero schedule/outcomes) → calm empty Timetable/Outcomes; the dashboard chip count = `followUp ∈ {needsFollowUp, attentionRisk}`; **NO finance field exists in any fixture**; no console missing-key warnings
- [x] T037 Final consistency + cleanup: run a clean-code-guard review on the production-code diff + a test-guard review on the changed tests; fix blocking issues (weak/fake tests, unscoped assertions); re-run `build`/`test:smoke`/`test:a11y`/`screenshots`; remove dead code; mark this `tasks.md` accurately; update `app/screenshots/REVIEW.md` + the project memory note

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (T001–T004)**: start immediately. T002/T003/T004 are `[P]` (different files).
- **Foundational (T005–T010)**: after Setup; **blocks all stories**. T005/T006/T007/T010 are `[P]` (different files); **T008** (teachers fixture) and **T009** (attendance resolver) are independent of each other but T010's resolvers consume both → T010 after T008+T009.
- **US1 (T011–T012)**: after Foundational → the entry point. T011 consumes T005/T006/T010.
- **US2 (T013–T015)**: after Foundational → the MVP profile. T014 edits `build-html.mjs`.
- **US3 (T016)**: after US1+US2 (verifies the workload chip across surfaces).
- **US4 (T017–T018)** / **US5 (T019–T020)**: after US2 — each FILLS a stub tab in `teacher.js` (serialize on that file).
- **US6 (T021–T022)**: after US1+US2 — edits `teacher.js` + `teachers.js`.
- **US7 (T023–T026)**: after Foundational (+ benefits from US2 for the profile links). T023 edits `nav.config.js`; T025 edits `build-html.mjs`.
- **US8 (T027)**: after US7 (the deep-link target) — edits `dashboard.js`.
- **US9 (T028–T029)** / **US10 (T030–T033)**: after the page stories exist — the acceptance gates.
- **Polish (T034–T037)**: last.

### Same-file serialization (never run these in parallel)

- `src/js/pages/teacher.js`: T013 → T017 → T019 → T021 (then any visual fix in T032/T033).
- `src/js/pages/teachers.js`: T011 → T021.
- `src/js/pages/teacher-performance.js`: T024 (then T032 visual fix).
- `scripts/build-html.mjs`: T014 / T025 (serialize).
- `src/js/nav.config.js`: T023 only.
- `src/js/fixtures/teachers.js`: T008 only. `src/js/fixtures/attendance.js`: T009 only.
- `src/js/i18n.js` + `src/locales/{ar,en}.trn.js`: T002 only.
- `src/styles/app.css`: T003 (then any visual fix in T032/T033).
- `tests/smoke/run.cjs`: T028; `tests/screenshots/capture.cjs`: T030; `tests/a11y/run.cjs`: T031 (different files → `[P]`).

### Parallel opportunities

- Setup T002/T003/T004 (different files).
- Foundational T005/T006/T007 in parallel; T010 after T008+T009.
- US9/US10 harness extensions T028 (smoke) ‖ T030 (capture) ‖ T031 (a11y) are different files.
- Polish T034 ‖ T035 (read-only audits over different concerns).

---

## Parallel Example: Foundational blocks

```bash
# After Setup, build the shared pieces (different files):
Task: "T005 components/teacher-status.js"   Task: "T006 components/teacher-signals.js"
Task: "T007 components/teacher-actions.js"   Task: "T008 fixtures/teachers.js (+status/workload/followUp, NO finance)"
Task: "T009 fixtures/attendance.js (outcomesOfTeacher)"
# then T010 teacher-links resolvers (consumes T008 + T009 + groupsOfTeacher)
```

## Parallel Example: US9/US10 acceptance harness

```bash
Task: "T028 smoke/run.cjs (teacher + teacher-performance asserts)"
Task: "T030 capture.cjs MATRIX (12 Spec 007 frames)"
Task: "T031 a11y/run.cjs coverage (teachers/teacher/teacher-performance)"
# → then T032 review + T033 responsive
```

---

## Implementation Strategy

### MVP path

1. Setup → 2. Foundational → 3. **US1** (Teachers enrich) → 4. **US2** (Teacher profile).
   **Stop & validate** at the US2 checkpoint: the enriched Teachers directory + a real Teacher profile (banner + 8 tabs, Timetable reused, Courses/Groups/Students linked) prove the "academically complete teacher hub" feel. This is the demoable MVP (spec MVP = US1 + US2).

### Incremental delivery

- After **US1–US2**: the entry point + the academic hub.
- After **US3**: the workload display. After **US4**: outcomes/absence (teacherAbsent ≠ studentAbsent). After **US5**: cross-surface follow-up. After **US6**: honest actions.
- After **US7**: the Teacher Performance board (the headline second increment). After **US8**: the dashboard chip.
- After **US9 / US10**: static/Django integrity + the 12-frame screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (labeled-chip/filter/profile-tab/link smoke, teacherAbsent≠studentAbsent, no-score/rank/chart, no-finance, axe, no-`#app`) are necessary but the **manual screenshot review against Spec 001–006 + the legacy reference is the final gate** (`contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. **Serialize all edits to the same file** (esp. `teacher.js`, touched by US2 then US4/US5/US6; `build-html.mjs`; `teachers.js`).
- **No fake analytics**: every number on the teacher surfaces is a baked fixture **count** / resolved list length — **NO** computed score, ranking, leaderboard, percentile, predictive risk, chart/graph, or analytics engine (scope-guard G1; screenshot A4).
- **No finance**: no salary/payroll/compensation/payout/earnings/hour-rate/finance widget anywhere; **no finance field is added to any fixture** (scope-guard G1).
- **No portals**: `teachers.html`/`teacher.html`/`teacher-performance.html` are admin-facing; no teacher/student/family portal or dashboard, no "my classes"/login-as/role-switcher (scope-guard G1/G7).
- **Reuse required**: Spec 003 `scheduleAgenda` + the shared appointment drawer; Spec 005 `outcomeRow` + the canonical `outcomeTemplate` drawer; Spec 006 `cohort-panels` + `profileBanner`/`tabs` + the course/group links; Spec 004 student/family links; the existing `directoryCard`/`filterBar`/`summaryCards`/`kpiCard`/`status-tile`/`noResults`. **NO new timetable builder, NO new outcome drawer, NO new tab engine** (SC-009).
- Routes: `teacher-performance.html` is the **promotion** of the planned `teacherKpi` item (`activeId:'teacherKpi'`); `teacher.html` is a **profile template** (`activeId:'teachers'`, not a nav item); `addTeacher`/`teacherCategories`/`sessionsKpi`/`monthlyPerf` stay planned; Django later → `teacher/<id>`.
- The three new labeled maps stay DISTINCT from the six existing maps and from each other: **teacher-status** (active/paused/inactive) on the card + banner; **workload** (light/balanced/high) on card + banner + board; **follow-up** (strongDelivery/stable/needsFollowUp/attentionRisk) on the card flag + board + follow-up queue — never shadowing, never numeric/color-only.

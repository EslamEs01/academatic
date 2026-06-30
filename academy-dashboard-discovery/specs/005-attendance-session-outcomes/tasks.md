---
description: "Task list for Spec 005 — Attendance and Session Outcomes"
---

# Tasks: Attendance and Session Outcomes

**Input**: Design documents from `academy-dashboard-discovery/specs/005-attendance-session-outcomes/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (all present)

**Tests**: **INCLUDED** — the spec mandates automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, HTML-structure/no-`#app`, tiles/filter/outcome-row/drawer asserts, keyboard) **and** screenshot-based visual acceptance.

**App root**: `academy-dashboard-discovery/app/` (paths relative to it). Spec 005 **extends the implemented Spec 001/002/003/004 app in place** — same static HTML-first SSG, same pipeline, **no new dependencies**. Existing files are unchanged unless a task says EXTEND/CHANGE.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US11 (story phases only)

## Story sequencing rationale (read first)

This is a focused single-surface spec (one Attendance page + a canonical drawer + light integrations), so it is sequenced **MVP-first by dependency**:

- **Setup + Foundational** build the page-agnostic blocks (the **outcome status map**, CSS, the new **fixture** (`attendance.js`), the **outcome-row** + the canonical **outcome drawer** (`outcome-details.js`, with the shared `appointmentRows` refactor), and the tiny **`data-filter-set`** tile→filter hook in `enhance.js`).
- **US1 (Attendance page, P1)** is the MVP entry: the daily outcomes board. **US2 (filters)**, **US3 (outcome drawer)**, **US4 (absence-type distinction)** complete the MVP surface (per the spec MVP = US1 + US3 + US4).
- **US5 (demo actions)**, **US6 (follow-up links + Sessions integration)**, **US7 (Student)**, **US8 (Family)**, **US9 (Dashboard)** are independent increments composing the proven pieces.
- **US10 (static/Django, P1)** and **US11 (visual + screenshots, P1)** are cross-cutting verification/acceptance stories sequenced last (they require all surfaces to exist) — same rationale as the prior specs.

Earliest demo = **US1** (Attendance board). Full MVP = through **US4** (board + filters + canonical drawer + student-absent vs teacher-absent distinction).

---

## Phase 1: Setup

**Purpose**: Guard the baseline, add the i18n namespace, the outcome status map, and CSS scaffolding.

- [x] T001 Verify the Spec 001/002/003/004 baseline is green before extending: run `npm run build && npm test && npm run screenshots` in `academy-dashboard-discovery/app/` and confirm clean (no regressions to protect)
- [x] T002 [P] Add Spec 005 i18n keys: new `src/locales/ar.att.js` + `src/locales/en.att.js` (`att.*` page/tiles/filters, `outcome.*` status + action + attribution labels, `topbar.title/crumb.attendance`, the nav `nav.attendance` label) and wire both into `src/js/i18n.js` (deep-merge, like `ar.fam.js`) — Arabic «الحضور ونتائج الجلسات»/«الحضور» (no RTL-reversed wording) + English; keep all prior keys
- [x] T003 [P] Implement `src/js/components/outcome-status.js` — the OUTCOME status map (`attended/studentAbsent/teacherAbsent/cancelled/rescheduled/upcoming/live` + flags `makeUpSuggested/needsFollowUp` → `{tone, icon, labelKey}`) + `outcomeChip(id)`, rendered via the generic `chip`; **never numeric/color-only**; distinct from the session + lifecycle maps (per outcome-status-contract / R33)
- [x] T004 [P] EXTEND `src/styles/app.css` scaffolding: `.outcome-row` (+ card reflow), the outcome chip tones, the summary-tile-as-filter affordance, and mobile reflow

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The new fixture + the outcome-row + the canonical outcome drawer + the tile-filter hook that the page stories reuse.

**⚠️ CRITICAL**: No page story begins until this phase is complete.

- [x] T005 [P] Implement `src/js/fixtures/attendance.js` — `SESSION_OUTCOMES` (≥12 rows spanning **every** outcome state: attended/studentAbsent/teacherAbsent/cancelled/rescheduled/upcoming/live; reuse the session shape titleKey/levelKey/subject/trainer/roomKey/time/duration/dateKey/present/capacity; carry both `statusId` + `outcomeId`; resolve a real `studentId`→`STUDENTS` + `familyId`→`FAMILIES`; attribution `absentBy?`/`cancelBy?`; `makeup?`/`followUp?`/`rescheduleHint?`/`notesKey?`/`feedbackKey?`) + the derived `OUTCOME_SUMMARY` counts, per data-model
- [x] T006 [P] Implement `src/js/components/outcome-row.js` — the attendance list/card-hybrid row (time/date · session+course · teacher avatar/name · student/family link-chip · the **labeled outcome chip** · attention/follow-up flag · a `data-row-menu`), with `facetAttrs({outcome,teacher,family,day,subject,attention,search})`; opens the canonical outcome drawer; per attendance-page-contract / R39
- [x] T007 EXTEND `src/js/components/appointment-details.js` — factor the shared session field-rows (status·date/time/duration·teacher·students·family·subject·room·notes) into an exported `appointmentRows(item)` helper (**additive** — `appointmentTemplate` keeps behaving identically; Schedule unaffected), per outcome-details-contract / R35
- [x] T008 Implement `src/js/components/outcome-details.js` — `outcomeTemplate(item)`: the ONE canonical outcome drawer (a SUPERSET of `appointmentRows(item)` + an outcome section: the **Outcome** chip + the **who-absent/who-cancelled attribution** + present/capacity + the make-up/credit **display hint** + the follow-up hint + feedback) + a status-gated **action-cluster slot** (`outcomeActions(item)`, filled in US5); labels BOTH "Status" + "Outcome" (no double-encoding); emits a baked `<template data-preview>` via `previewTemplate`; per outcome-details-contract (after T007)
- [x] T009 EXTEND `src/js/enhance.js` — the tiny **`[data-filter-set]`** hook: a delegated click parses `facet:value`, sets the matching `<select data-filter="facet">` in the page's `[data-filter-form]`, and re-runs the EXISTING `applyFilter` (no new engine); the drawer/confirm/demo/disabled/toast branches are reused as-is

**Checkpoint**: Status map + fixture + outcome-row + canonical drawer + tile-filter hook ready; build still green (no page wired yet).

---

## Phase 3: User Story 1 - Admin reviews attendance / outcomes (Priority: P1) 🏗️ MVP

**Goal**: A premium daily Attendance/Outcomes board — summary tiles + an airy outcome list/card hybrid.

**Independent Test**: Open Attendance; read the summary tiles + the outcome rows (time · session · teacher · student/family · labeled outcome chip + flag); confirm it is not a generic attendance spreadsheet.

- [x] T010 [US1] Implement `src/js/pages/attendance.js` — `renderAttendance()`: `pageHeader` (title «الحضور ونتائج الجلسات») + `summaryCards` outcome tiles + `filterBar` + the outcome list (`id="attendance-list"`) of `outcome-row`s + `noResults()` + the baked outcome drawer `<template>`s; per attendance-page-contract
- [x] T011 [US1] CHANGE `src/js/nav.config.js` (add+promote `attendance` in the **control** category: `route:'attendance.html'`; add `attendance:'attendance.html'` to `FUTURE_ROUTES`; `sessionsAnalysis` + rest stay planned) + EXTEND `scripts/build-html.mjs` (register `{base:'attendance', activeId:'attendance', titleKey:'topbar.title.attendance', crumbKey:'topbar.crumb.attendance', render: renderAttendance}` ar+en) — the build-time guard must pass
- [x] T012 [US1] Build + verify `public/attendance.html` (+ `.en`): the tiles + filter bar + outcome rows are baked; the nav `attendance` item is a real `<a>` (active pill); labeled outcome chips (icon+text); no dead controls

**Checkpoint** 🎯: The Attendance board is live — the MVP entry.

---

## Phase 4: User Story 2 - Admin filters outcomes (Priority: P1)

**Goal**: Filter the board by day/teacher/family/subject/outcome/attention, with the summary tiles doubling as filters.

**Independent Test**: Apply each filter + click a tile; rows show/hide with feedback + a count + a no-results/reset state; never a dead control.

- [x] T013 [US2] CHANGE `src/js/pages/attendance.js` — wire the summary tiles as filters (`data-filter-set="outcome:<id>"` / `"attention:1"` over `data-target="#attendance-list"`) + the `filterBar` facets day/teacher/family/subject/outcome/attention (the row `data-*` facets already exist from T006)
- [x] T014 [US2] Build + verify: the facet selects narrow the rows with visible feedback + a result count + a no-results/reset; clicking a tile sets the outcome/attention filter and narrows the rows; no dead control

**Checkpoint**: The board is a single stateful filtered page (no route-per-status wall).

---

## Phase 5: User Story 3 - Admin opens outcome details (Priority: P1)

**Goal**: The canonical outcome drawer, opened from a row.

**Independent Test**: Open a row → the shared drawer shows status + outcome + people + attendance summary + attribution + make-up/follow-up hint + actions; confirm it is the SAME builder reused on Sessions.

- [x] T015 [US3] CHANGE `src/js/pages/attendance.js` — bake one `outcomeTemplate(item)` drawer per outcome row + the rows open it via `data-drawer="<id>"` (reusing the existing `openSheet` engine)
- [x] T016 [US3] Build + verify: the outcome drawer opens from a row with the outcome section (chip + attribution + present/capacity + make-up/follow-up hint + the action cluster) and both labeled "Status" + "Outcome"; confirm it degrades gracefully when no outcome and is the canonical builder

**Checkpoint**: One canonical outcome surface.

---

## Phase 6: User Story 4 - Admin distinguishes absence types (Priority: P1)

**Goal**: Student-absent vs teacher-absent vs cancelled vs rescheduled are unmistakable.

**Independent Test**: On the list + in the drawer, confirm `studentAbsent`/`teacherAbsent`/`cancelled`/`rescheduled` are visually + textually distinct.

- [x] T017 [US4] Ensure `src/js/components/outcome-status.js` renders `studentAbsent` vs `teacherAbsent` with **distinct icon + label** (never color-only), the fixture (`attendance.js`) covers both + a cancelled + a rescheduled row, and the drawer (`outcome-details.js`) states the **attribution** ("Student absent" / "Cancelled by the teacher" / new-time hint)
- [x] T018 [US4] Build + verify: a student-absent and a teacher-absent row carry distinct chips; the drawer states who was absent / who cancelled; cancelled vs rescheduled are distinguished

**Checkpoint** 🎯: Full MVP (board + filters + canonical drawer + absence-type distinction).

---

## Phase 7: User Story 5 - Admin performs demo outcome actions (Priority: P2)

**Goal**: Status-gated, demo-only outcome actions.

**Independent Test**: Trigger each action; confirm demo toast / confirm-modal→toast / disabled-with-reason; never a dead control, never a real mutation.

- [x] T019 [US5] CHANGE `src/js/components/outcome-details.js` — fill the status-gated `outcomeActions(item)` cluster: markAttend/notify/feedback/reverse = `data-demo-action` + `data-toast`; cancel/reschedule/markStudentAbsent/markTeacherAbsent = `data-confirm` (+ `-danger`) → demo toast; real-save/real-notify/make-up-add-to-credit = `data-disabled-reason` + `data-reason-key`; per-`outcomeId` gating per outcome-actions-contract
- [x] T020 [US5] Build + verify: markAttend toasts; cancel opens a confirm modal → toast; a disabled action shows its reason; actions are status-gated; no status mutation / persistence; no dead control

**Checkpoint**: Honest demo actions, no engine.

---

## Phase 8: User Story 6 - Admin follows up + Sessions integration (Priority: P2)

**Goal**: Cross-surface follow-up — student/family/schedule links + the Sessions page outcome integration.

**Independent Test**: From a row/drawer use the student/family/"view in schedule" links; on Sessions confirm the secondary outcome chip + the canonical drawer + a "View attendance" deep-link.

- [x] T021 [US6] CHANGE `src/js/pages/attendance.js` + `src/js/components/outcome-details.js` — the student/family links (→ `student.html`/`family.html`) + a "View in schedule" deep-link (→ `schedule.html#view=timetable`), language-aware, on the rows + in the drawer
- [x] T022 [US6] CHANGE `src/js/pages/sessions.js` — a SECONDARY outcome chip per row (ONLY where a recorded outcome exists; the scheduling status stays primary — no double-encoding) + rows open the **canonical outcome drawer** (`outcomeTemplate`) + a "View attendance" deep-link to `attendance.html` (FR-008 / sessions-integration-contract)
- [x] T023 [US6] Build + verify: the row/drawer links navigate to the right student/family/schedule; the Sessions secondary chip + canonical drawer + "View attendance" link work; no dead links

**Checkpoint**: The outcome surfaces are connected; the canonical drawer is reused on Sessions.

---

## Phase 9: User Story 7 - Student profile reflects outcomes (Priority: P2)

**Goal**: A light fixture attendance/outcome hint on the student profile.

**Independent Test**: On `student.html`, confirm a fixture recent-outcomes/attendance hint + a "View attendance" deep-link; no engine claim.

- [x] T024 [US7] CHANGE `src/js/pages/student.js` — a calm fixture **recent-outcomes/attendance hint** (`StudentOutcomeSignal`: "attended N of M · K to follow up") inside the EXISTING Overview/Timetable area (**no new tab**) + a "View attendance" deep-link; build + verify (fixture-only, no metric claim)

**Checkpoint**: The student profile links to attendance.

---

## Phase 10: User Story 8 - Family profile reflects outcomes (Priority: P2)

**Goal**: A light fixture children follow-up hint on the family profile.

**Independent Test**: On `family.html`, confirm a fixture children follow-up hint + a deep-link.

- [x] T025 [US8] CHANGE `src/js/pages/family.js` — a calm fixture **children follow-up hint** (`FamilyOutcomeSignal`) + a "View attendance" deep-link; build + verify (fixture-only, no finance/credit claim)

**Checkpoint**: The family profile links to attendance.

---

## Phase 11: User Story 9 - Dashboard impact (Priority: P2)

**Goal**: A minimal, fixture-backed outcome dashboard signal.

**Independent Test**: On the dashboard, ONE fixture "needs follow-up today" chip + a deep-link to Attendance; the Today's Sessions rows may carry an outcome chip; no new stat wall.

- [x] T026 [US9] CHANGE `src/js/pages/dashboard.js` — fold ONE fixture-backed **"needs follow-up today"** count chip (from the `followUp`/absence flags) into the EXISTING people-signal card (no new card/tile/row) linking to the filtered `attendance.html`; optionally add a small outcome chip to the Today's Sessions rows (open the canonical drawer); build + verify (no new stat wall, no fake/unbacked widget)

**Checkpoint**: The dashboard connects to Attendance minimally.

---

## Phase 12: User Story 10 - Static / Django-ready (Priority: P1)

**Goal**: The Attendance surface is complete baked HTML; no runtime page DOM.

**Independent Test**: Build; View Source on `attendance.html` — full shell + tiles + filter bar + all rows + drawer templates baked, no `#app`, relative paths; no external requests.

- [x] T027 [US10] EXTEND `tests/smoke/run.cjs` — add `attendance` to PAGES and assert: the tiles + filter bar + `.outcome-row`s are baked, the tiles filter via `data-filter-set`, the outcome chips are labeled (icon+text), the canonical drawer opens from a row with the outcome section, the student/family/schedule links are real `<a>`, the `attendance` nav item is a real `<a>` with a route (rest stay Soon), portal ids absent, no `#app`, relative paths
- [x] T028 [US10] Update `app/README.md` + `quickstart.md` with the Django mapping for the new surface (`{% for outcome in outcomes %}`, the canonical drawer → ONE `{% include "admin/_outcome_details.html" %}`, the outcome status map → a template tag, tiles/filters → `data-*` hooks)

**Checkpoint**: Static/Django integrity verified for the new surface.

---

## Phase 13: User Story 11 - Visual / reference alignment + screenshots (Priority: P1)

**Goal**: The Attendance surfaces match the approved direction and improve on the reference; the screenshot matrix passes.

**Independent Test**: Capture the matrix; review each vs Spec 001–004 + the old session/attendance screenshots (product reference only); axe clean; responsive correct.

- [x] T029 [P] [US11] EXTEND `tests/screenshots/capture.cjs` MATRIX + variant support with the Spec 005 frames (Attendance AR light/dark + EN; outcome `drawer`; action `confirm` modal; Sessions `outcome` integration; Student `attendance` section; Family `attendance` section; Dashboard `outcome-impact`; mobile attendance; mobile attendance `drawer`), per screenshot-acceptance
- [x] T030 [P] [US11] EXTEND `tests/a11y/run.cjs` coverage for the new page (attendance AR light + a dark + an EN + a drawer-open state); fix any critical violations
- [x] T031 [US11] Run `npm run build && npm run screenshots`; review each capture side-by-side vs the approved Spec 001–004 direction + the sidebar reference + the old session/attendance screenshots (product reference only); fix any failure condition (generic-spreadsheet / missing-vocabulary / missing-absence-distinction / missing-drawer / dead-actions / poor-dark / broken-RTL / real-persistence-claim); record verdicts in `app/screenshots/REVIEW.md`
- [x] T032 [US11] Responsive pass: verify + fix mobile (outcome rows → single-column cards; tiles wrap; drawer full-height) and tablet — no overflow

**Checkpoint**: Screenshot matrix accepted; no drift; outcome vocabulary + absence distinction + canonical drawer present.

---

## Phase 14: Polish & Cross-Cutting Concerns

- [x] T033 [P] Verify the scope guard end-to-end per `contracts/scope-guard.md` — `grep` confirms no chart/table/form/calendar library; no backend/API/auth/permission-enforcement/CRUD/persistence; no attendance/outcome/reschedule/make-up/finance/credit engine; no real status mutation/notification; no portals/role dashboards (smoke: portal ids absent); no legacy numeric `status=0..N`; no legacy assets/classes/palette/wording; no `#app`
- [x] T034 [P] Run the `quickstart.md` flow (install → build → preview → review attendance/filters/drawer/actions/integrations → verify static-first → verify no-persistence → verify no-library → test → screenshots) and fix any gaps
- [x] T035 Final consistency + cleanup: fixture coherence (every `SessionOutcome.studentId`/`familyId` resolves; the tile counts match the rows; the dashboard chip count matches), no console missing-key warnings, remove dead code, update `app/screenshots/REVIEW.md` + the project memory note

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (T001–T004)**: start immediately. T002/T003/T004 are `[P]` (different files).
- **Foundational (T005–T009)**: after Setup; **blocks all stories**. T005/T006 are parallel; **T007 → T008** (the shared-rows refactor before the drawer); **T009 edits `enhance.js`** (single).
- **US1 (T010–T012)**: after Foundational → the MVP entry. T011 edits `nav.config.js` + `build-html.mjs`.
- **US2 (T013–T014)** / **US3 (T015–T016)** / **US4 (T017–T018)**: after US1 — all CHANGE `attendance.js` (serialize after T010 + each other); US4 also touches `outcome-status.js`/`outcome-details.js`.
- **US5 (T019–T020)**: after US3 — edits `outcome-details.js` (serialize after T008).
- **US6 (T021–T023)**: after US3/US5 — T021 edits `attendance.js`+`outcome-details.js`; T022 edits `sessions.js`.
- **US7 (T024)** / **US8 (T025)** / **US9 (T026)**: after Foundational + US3 — different page files (`student.js`/`family.js`/`dashboard.js`), largely independent.
- **US10 (T027–T028)** / **US11 (T029–T032)**: after the page stories exist — the final acceptance gates.
- **Polish (T033–T035)**: last.

### Same-file serialization (never run these in parallel)

- `src/js/pages/attendance.js`: T010 / T013 / T015 / T021 (then read by T027/T031).
- `src/js/components/outcome-details.js`: T008 / T019 / T021.
- `src/js/components/appointment-details.js`: T007 only (then T008 imports `appointmentRows`).
- `src/js/components/outcome-status.js`: T003 / T017.
- `src/js/enhance.js`: T009 only.
- `src/js/nav.config.js` + `scripts/build-html.mjs`: T011 only.
- `src/js/i18n.js` + `src/locales/{ar,en}.att.js`: T002 only.
- `src/styles/app.css`: T004 (then any visual fix in T031/T032).
- `src/js/pages/{sessions,student,family,dashboard}.js`: T022 / T024 / T025 / T026 (each single).

### Parallel opportunities

- Setup T002/T003/T004 (different files).
- Foundational T005/T006 in parallel; then T007→T008; then T009.
- US10/US11 harness extensions T027 (smoke) ‖ T029 (capture) ‖ T030 (a11y) are different files.
- After US3, the increment stories US7 / US8 / US9 are largely independent (different page files), while US2/US4/US5/US6 serialize on `attendance.js`/`outcome-details.js`.

---

## Parallel Example: Foundational blocks

```bash
# After Setup, build the shared pieces (different files):
Task: "T005 fixtures/attendance.js (SESSION_OUTCOMES)"   Task: "T006 components/outcome-row.js"
# then T007 (appointmentRows refactor) → T008 (outcome-details.js drawer) → T009 (enhance.js data-filter-set)
```

## Parallel Example: US11 acceptance harness

```bash
Task: "T027 smoke/run.cjs (attendance + outcome asserts)"
Task: "T029 capture.cjs MATRIX (Spec 005 frames)"
Task: "T030 a11y/run.cjs coverage"
# then T031 review + T032 responsive
```

---

## Implementation Strategy

### MVP path

1. Setup → 2. Foundational → 3. **US1** (Attendance board) → 4. **US2** (filters) → 5. **US3** (canonical drawer) → 6. **US4** (absence-type distinction).
   **Stop & validate** at the US4 checkpoint: the daily outcomes board + the tiles-as-filters + the canonical outcome drawer + the unmistakable student-absent vs teacher-absent distinction prove the "session outcome management" feel. This is the demoable MVP (spec MVP = US1 + US3 + US4).

### Incremental delivery

- After **US1–US4**: the Attendance board + filters + canonical drawer + absence distinction.
- After **US5**: the status-gated demo actions.
- After **US6**: the follow-up links + the Sessions integration.
- After **US7 / US8 / US9**: the student / family / dashboard light integrations — each independently testable.
- After **US10 / US11**: static/Django integrity verified + the screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (smoke tiles/filter/drawer/links, axe, no-`#app`) are necessary but the **manual screenshot review against Spec 001–004 + the reference is the final gate** (`contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. **Serialize all edits to the same file** (`attendance.js`, `outcome-details.js`, `appointment-details.js`, `outcome-status.js`, `enhance.js`, `nav.config.js`/`build-html.mjs`, `i18n.js`, `app.css`).
- Honor `contracts/scope-guard.md` throughout: fixtures only; static HTML-first (no `#app`, baked tiles/rows/drawers); **no chart/table/form/calendar library**; **no attendance/outcome/reschedule/make-up/finance/credit engine**; **no real status mutation/notification**; **no portals/role dashboards**; **no legacy numeric statuses or legacy copy**.
- The Attendance page (`attendance.html`) is an **NI12 promotion** of a new `attendance` item in the `control` category (`activeId:'attendance'`); `sessionsAnalysis` + the rest stay planned; Django later → a real `attendance/` route.
- The OUTCOME map (attended/studentAbsent/teacherAbsent/cancelled/rescheduled + flags) is the **review** vocabulary; the **scheduling** status (live/upcoming/completed/cancelled) is reused unchanged — outcome PRIMARY on Attendance, status PRIMARY + outcome SECONDARY on Sessions (no double-encoding).

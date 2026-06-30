---
description: "Task list for Spec 006 — Courses, Groups and Learning Paths Deep Experience"
---

# Tasks: Courses, Groups and Learning Paths Deep Experience

**Input**: Design documents from `academy-dashboard-discovery/specs/006-courses-groups-learning-paths/`
**Prerequisites**: plan.md, spec.md, research.md (R44–R59), data-model.md (19 shapes), contracts/ (13) — all present.

**Tests**: **INCLUDED** — the spec mandates automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, HTML-structure/no-`#app`, labeled-chip/filter/profile-tab/link asserts) **and** screenshot-based visual acceptance (the final gate).

**App root**: `academy-dashboard-discovery/app/` (paths relative to it). Spec 006 **extends the implemented Spec 001/002/003/004/005 app in place** — same static HTML-first SSG, same pipeline, **no new dependency, no new runtime hook**. Existing files are unchanged unless a task says EXTEND/CHANGE.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US12 (story phases only)

## Story sequencing rationale (read first)

This is a multi-surface spec (Courses enrich + Course profile + Groups directory + Group profile + a Learning-Path section + integrations), sequenced **MVP-first by dependency** (plan R57):

- **Setup + Foundational** build the page-agnostic blocks: the i18n overlay + CSS, the **three status maps** (NEW `group-status`, EXTENDED course-status, relocated `enrollment-status`), the **fixtures** (`groups.js` + enriched `courses.js`), and the shared components (`group-row`, `learning-path` ladder, `course-group-actions` cluster) that every page story composes.
- **US1 (Courses, P1)** + **US2 (Groups directory, P1) + US3 (Course profile, P1) + US4 (Group profile, P1)** build the four page surfaces — the profile **shells** (banner + tabs + the static tabs); the cross-cutting tabs are owned by the cross-cutting stories so each ships a visible, testable increment:
  - **US5 (Learning Path, P3)** fills the course-profile Learning-Path tab.
  - **US6 (actions, P2)** fills the action clusters on the directories + both profiles.
  - **US7 (timetable, P2)** fills the Timetable tab on both profiles (reuse Spec 003 `scheduleAgenda`).
  - **US8 (outcomes, P2)** fills the Outcomes/Sessions tab on both profiles (reuse the Spec 005 canonical drawer).
- **US9 (student/family)** + **US10 (dashboard)** are light fixture integrations.
- **US11 (static/Django, P1)** + **US12 (visual + screenshots, P1)** are cross-cutting acceptance gates sequenced last.

Earliest demo = **US1** (enriched Courses). Full MVP = **US1 + US2 + US4** (Courses-enrich + Groups directory + Group profile) — the "academically complete" cohort feel.

---

## Phase 1: Setup

**Purpose**: Guard the baseline; add the i18n namespace, CSS scaffolding, and any new icons.

- [x] T001 Verify the Spec 001–005 baseline is green before extending: run `npm run build && npm test && npm run screenshots` in `academy-dashboard-discovery/app/` and confirm clean (no regressions to protect)
- [x] T002 [P] Add Spec 006 i18n keys: NEW `src/locales/ar.crs.js` + `src/locales/en.crs.js` (`nav.groups`; `topbar.title/crumb.{groups,course,group}`; `crs.*` courses-enrich + course-profile; `grp.*` groups directory + group-profile; `cur.status.paused`; `group.status.*`; `enroll.status.*`; learning-path `crs.lp.*`; action labels/toasts + `crs.reason.*`/`grp.reason.*`; `dash.groupsAttention`) and wire both into `src/js/i18n.js` (deepMerge, like `ar.att.js`) — Arabic «الدورات»/«المجموعات»/«تفاصيل الدورة»/«تفاصيل المجموعة»/«المسار التعليمي» + English; mirror every key, keep all prior keys
- [x] T003 [P] EXTEND `src/styles/app.css` (Spec 006 `@layer`): the enriched `.course-card` counts row, the `.group-row` list/card hybrid + mobile reflow, the `.level-ladder`/`.level-step` learning-path strip, `.group-meta`; reuse existing card/chip/medallion/tab tones (NO new tone CSS)
- [x] T004 [P] Vendor any new icons in `scripts/vendor-assets.cjs` only if used (e.g. `graduation-cap`/`layers`/`route`/`flag`/`archive`/`pause-circle`); reuse existing icons where possible; build must report `0 missing`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The status maps + fixtures + shared components every page story composes.

**⚠️ CRITICAL**: No page story begins until this phase is complete.

- [x] T005 [P] Implement `src/js/components/group-status.js` — the NEW labeled GROUP status map (`active/trial/full/paused/completed` + a separate `needsAttention` flag) `{tone,icon,labelKey}` + `GROUP_STATUS_ORDER` + `groupStatusOf(id)` + `groupStatusChip(id)`; reuse existing chip tones; **never numeric/color-only**; distinct from session/lifecycle/outcome maps (per course-group-status-contract / R46)
- [x] T006 [P] Implement `src/js/components/course-status.js` — relocate + EXTEND the catalogue course-status map to `active/draft/paused/archived` (adds `paused`, `cur.status.*` keys) + `courseStatusChip(id)`; update `fixtures/courses.js` to import it (keep the existing chip output identical for active/draft/archived)
- [x] T007 [P] Implement `src/js/components/enrollment-status.js` — relocate the LOCAL course/enrollment chip out of `pages/student.js` (`active/paused/completed`, `enroll.status.*`, deliberately distinct tones so it never shadows the catalogue map) + `enrollmentStatusChip(id)`; `student.js` will import it in US9 (per course-group-status-contract §reconciliation)
- [x] T008 [P] Implement `src/js/fixtures/groups.js` — `GROUPS` (≥6 cohorts spanning **every** group status + ≥1 `needsAttention`; each: `id, nameKey, courseId, teacherId, studentIds[], scheduleBlockIds[], outcomeIds[], levelKey, statusId, needsAttention?, scheduleSummary{daysKey,time}, capacity, enrolledCount, accent, notesKey`; resolve `courseId`→COURSES, `teacherId`→TEACHERS, `studentIds`→STUDENTS, `scheduleBlockIds`→SCHEDULE_WEEK, `outcomeIds`→SESSION_OUTCOMES) + `GROUP_BY_ID`, `groupsOfCourse/Teacher/Student`, `GROUP_SUMMARY` (per data-model #7)
- [x] T009 EXTEND `src/js/fixtures/courses.js` — add `groupIds[]`, `teacherIds[]`, enriched `levels[]` (per-level `studentsCount`), `studentsCount`/`groupsCount`/`teachersCount`/`upcomingCount`, optional `attention?`, `notesKey` to each row + `COURSE_BY_ID`, `courseOf(id)`; keep existing fields (enriched, NOT replaced); supersede the Spec 004 `STUDENT_GROUPS` seed so student group chips resolve to real `group.html` (after T008)
- [x] T010 [P] Implement `src/js/components/group-row.js` — the groups directory list/card hybrid row (`facetAttrs({course,teacher,level,day,status,attention,search})` + group name + a course link + teacher + level + schedule summary + `enrolledCount/capacity` count + the labeled group-status chip + a `needsAttention` flag + a `data-row-menu` kebab) (per groups-page-contract / data-model #7/#8)
- [x] T011 [P] Implement `src/js/components/learning-path.js` — the DISPLAY-ONLY `.level-ladder` (an ordered strip of labeled `.level-step`s `foundation→l1→l2→l3→advanced` + per-level counts + a certificates hint + optional `isCurrent`); NO curriculum/unit/module/milestone engine, NO editing (per learning-path-contract / data-model #13/#14)
- [x] T012 [P] Implement `src/js/components/course-group-actions.js` — the shared honest action cluster: `courseActions(item)` + `groupActions(item)` (add/edit = `data-demo-action`+`data-toast`; assignTeacher/printSummary = `data-disabled-reason`+`data-reason-key`; addStudents = demo toast BUT disabled-with-reason when `group.statusId==='full'` via `grp.reason.full`; removeStudent = `data-confirm`+danger→toast; openTimetable/viewAttendance = real links) reusing the EXISTING hooks (per course-group-actions-contract / data-model #15/#16)

**Checkpoint**: status maps + fixtures + group-row + learning-path + actions ready; build still green (no page wired yet).

---

## Phase 3: User Story 1 — Admin reviews & filters Courses (Priority: P1) 🏗️

**Goal**: An enriched Courses catalogue — academic counts + labeled status + a profile link.

**Independent Test**: Open Courses; read each card's labeled status + active-students/groups/teachers counts + "View course" link; filter by subject/level/status (narrow + count + no-results/reset). Not a generic catalogue.

- [x] T013 [US1] CHANGE `src/js/pages/courses.js` `renderCourses()` — enrich each course card (the `courseStatusChip`; active-students/groups/teachers counts + an upcoming-sessions hint; optional attention hint; a "View course" `<a href="course.html">`) over the EXISTING `cardGrid`; keep `summaryCards` + `filterBar` (subject/level/status) + `noResults`
- [x] T014 [US1] Build + verify `public/courses.html` (+ `.en`): enriched counts + labeled chips are baked; the filters narrow with a count + no-results/reset; the View-course links are real `<a>`; no dead controls; no table library

**Checkpoint** 🎯: Courses is the enriched catalogue entry point.

---

## Phase 4: User Story 2 — Admin reviews & filters the Groups directory (Priority: P1) 🏗️ MVP headline

**Goal**: The promoted Groups directory — the cohort layer the legacy system dead-ended.

**Independent Test**: Open Groups; the nav item is a real `<a>`; each row shows course/teacher/level/schedule-summary/count + a labeled group-status chip + attention; filter by course/teacher/level/day/status/attention (+ tiles) narrows; click a row → `group.html`. Not a class spreadsheet.

- [x] T015 [US2] CHANGE `src/js/nav.config.js` — promote the planned `groups` item to `status:'implemented', route:'groups.html'` in the `families` category (NI12 flip); all other planned items stay planned; `FUTURE_ROUTES.groups` already reserved
- [x] T016 [US2] Implement `src/js/pages/groups.js` `renderGroups()` — `pageHeader` + OPTIONAL `data-filter-set` summary tiles (active/trial/needs-attention) + `filterBar` (facets course/teacher/level/day/status/attention, `targetId:'groups-list'`) + the `group-row` list (`id="groups-list"`) + `noResults()`
- [x] T017 [US2] EXTEND `scripts/build-html.mjs` — register `{base:'groups', activeId:'groups', titleKey:'topbar.title.groups', crumbKey:'topbar.crumb.groups', render: renderGroups}` (ar+en); the build-time nav guard must pass
- [x] T018 [US2] Build + verify `public/groups.html` (+ `.en`): the `groups` nav item is a real `<a>` (active pill, families category); labeled group-status chips (icon+text); the facets + tiles narrow rows with a count + no-results/reset; rows link to `group.html`; mobile reflow (rows → single-column cards); no dead controls

**Checkpoint** 🎯: The Groups directory is live — the MVP headline.

---

## Phase 5: User Story 3 — Admin opens a Course profile (Priority: P1)

**Goal**: The course profile shell — banner + 8 baked tabs (cross-cutting tabs filled by US5/US7/US8).

**Independent Test**: Open `course.html`; banner shows subject + level + labeled status + counts; switch tabs (exactly one visible); Groups cards → `group.html`, Students → `student.html`.

- [x] T019 [US3] Implement `src/js/pages/course.js` `renderCourse()` — `profileBanner` (status chip + counts + an actions slot) + `tabs` (Overview, Groups, Students, Teachers, Timetable, Outcomes, Learning Path, Notes); FILL Overview + Groups (cards → `group.html`) + Students (rows → `student.html`) + Teachers (resolve `teacherIds`→TEACHERS) + Notes; leave Timetable/Outcomes/Learning-Path tab bodies as labelled stubs (filled in US7/US8/US5)
- [x] T020 [US3] EXTEND `scripts/build-html.mjs` — register the course profile `{base:'course', activeId:'courses', titleKey:'topbar.title.course', crumbKey:'topbar.crumb.course', render: renderCourse}` (ar+en); profile template, NOT a nav item
- [x] T021 [US3] Build + verify `public/course.html` (+ `.en`): banner + 8 baked tabs, exactly one visible + tab-switch works; Groups→group.html + Students→student.html links real; `courses` nav item stays active; not a portal

**Checkpoint**: The course profile shell is reachable from Courses.

---

## Phase 6: User Story 4 — Admin opens a Group profile (Priority: P1)

**Goal**: The group profile shell — banner + 7 baked tabs (cross-cutting tabs filled by US7/US8).

**Independent Test**: Open `group.html`; banner shows a course chip-link + teacher + level + labeled status + count; roster → `student.html` (family chip → `family.html`); Course tab → `course.html`.

- [x] T022 [US4] Implement `src/js/pages/group.js` `renderGroup()` — `profileBanner` (group name + a course chip-link + teacher + level + `groupStatusChip` + students count + an actions slot) + `tabs` (Overview, Students, Timetable, Sessions & Outcomes, Teacher, Course, Notes); FILL Overview + Students (roster rows → `student.html`, family chip → `family.html`) + Teacher (resolve `teacherId`) + Course (→ `course.html`) + Notes; leave Timetable/Sessions&Outcomes as labelled stubs (filled in US7/US8)
- [x] T023 [US4] EXTEND `scripts/build-html.mjs` — register the group profile `{base:'group', activeId:'groups', titleKey:'topbar.title.group', crumbKey:'topbar.crumb.group', render: renderGroup}` (ar+en); profile template, NOT a nav item
- [x] T024 [US4] Build + verify `public/group.html` (+ `.en`): banner course chip-link + labeled group-status; roster→student.html + family chip→family.html; Course→course.html; `groups` nav item stays active; not a portal

**Checkpoint** 🎯: Full MVP (Courses-enrich + Groups directory + Group profile + Course profile shells).

---

## Phase 7: User Story 5 — Admin understands the Learning Path (Priority: P3)

**Goal**: The display-only level ladder inside the course profile.

**Independent Test**: On `course.html` → Learning Path tab, the labeled ordered ladder + per-level counts + certificates hint render; display-only (no save).

- [x] T025 [US5] CHANGE `src/js/pages/course.js` — fill the Learning-Path tab with `learning-path.js` (the `levels[]` from the enriched `courses.js` + the certificates hint reusing the Spec 004 certificate shape); any "manage curriculum" affordance is `data-disabled-reason` or absent
- [x] T026 [US5] Build + verify: the ladder renders labeled + ordered (icon+text, never numeric/color-only) with counts + a certificates hint; NO curriculum/unit/module engine; no control implies real persistence

**Checkpoint**: The course profile is academically oriented.

---

## Phase 8: User Story 6 — Admin performs demo course/group actions (Priority: P2)

**Goal**: Honest, status-gated actions across the directories + both profiles.

**Independent Test**: Trigger each action; confirm demo toast / confirm→toast / disabled-with-reason / real link; `addStudents` disabled-with-reason on a `full` group; nothing mutates.

- [x] T027 [US6] CHANGE `src/js/pages/course.js` + `src/js/pages/group.js` (banner actions slot) + `src/js/pages/courses.js` + `src/js/pages/groups.js` (card/row kebabs) — wire the `course-group-actions.js` clusters (add/edit/assignTeacher/addStudents/removeStudent/openTimetable/viewAttendance/printSummary); status-gate `addStudents` on `full`
- [x] T028 [US6] Build + verify: add/edit toast; removeStudent → confirm modal → toast; assignTeacher/printSummary disabled-with-reason; addStudents disabled-with-reason on a full group; openTimetable/viewAttendance are real links; no dead control, no persistence/mutation

**Checkpoint**: Honest actions, no engine.

---

## Phase 9: User Story 7 — Timetable linkage (Priority: P2)

**Goal**: Reuse the Spec 003 agenda on both profiles' Timetable tab.

**Independent Test**: On a course/group Timetable tab, the shared agenda renders the cohort's sessions + a "View in schedule" deep-link.

- [x] T029 [US7] CHANGE `src/js/pages/course.js` + `src/js/pages/group.js` — fill the Timetable tab via `scheduleAgenda` (resolve `scheduleBlockIds`/course sessions → `SCHEDULE_WEEK`) + a `schedule.html#view=timetable` deep-link + the baked `appointmentTemplate` drawer `<template>`s (reuse — no new timetable builder)
- [x] T030 [US7] Build + verify: the Timetable tab shows the cohort's weekly sessions via the shared agenda; the deep-link navigates to the timetable view; the block drawer opens; no new grid/engine

**Checkpoint**: Schedule reachable from the academic context.

---

## Phase 10: User Story 8 — Attendance/outcome linkage (Priority: P2)

**Goal**: Reuse the Spec 005 canonical drawer on both profiles' Outcomes/Sessions tab.

**Independent Test**: On a course/group Outcomes tab, outcome rows render + opening one uses the canonical drawer + a "View attendance" deep-link.

- [x] T031 [US8] CHANGE `src/js/pages/course.js` + `src/js/pages/group.js` — fill the Outcomes / Sessions & Outcomes tab via `outcomeRow` + the canonical `outcomeTemplate` drawer (resolve `outcomeIds` → `SESSION_OUTCOMES`) + an `attendance.html` deep-link; bake the outcome drawer `<template>`s (reuse — SC-009, no bespoke drawer)
- [x] T032 [US8] Build + verify: outcome rows with labeled outcome chips; opening one opens the SAME canonical drawer (Status + Outcome + present/capacity + attribution); the attendance deep-link navigates; no bespoke drawer

**Checkpoint**: The full academic graph is connected.

---

## Phase 11: User Story 9 — Student & family integration (Priority: P2)

**Goal**: Two-way navigation student/family ↔ course/group, fixture-only.

**Independent Test**: On `student.html` Courses tab, enrollment cards → `course.html` + group chip → `group.html`; on `family.html`, a courses/groups hint + deep-link.

- [x] T033 [US9] CHANGE `src/js/pages/student.js` — make each enrollment card title a real `<a href="course.html">` and the group chip a real `<a href="group.html">`; import the relocated `enrollment-status.js` (no new tab, no portal)
- [x] T034 [US9] CHANGE `src/js/pages/family.js` — add ONE calm fixture "children's courses & groups" Overview hint card (counts + deep-links to `courses.html`/`groups.html`) beside the Spec 005 attendance hint (no finance/enrollment claim, no portal)
- [x] T035 [US9] Build + verify: the student enrollment → course/group links navigate; the family hint + deep-links work; the relocated enrollment status renders unchanged; no new tab/portal

**Checkpoint**: Student/family profiles link into the course/group graph.

---

## Phase 12: User Story 10 — Dashboard impact (Priority: P2)

**Goal**: ONE minimal fixture course/group signal.

**Independent Test**: On the dashboard, ONE "groups needing attention" chip + a deep-link to Groups; no new stat wall.

- [x] T036 [US10] CHANGE `src/js/pages/dashboard.js` — fold ONE fixture-backed "groups needing attention" chip (`GROUP_SUMMARY.needsAttention`) into the EXISTING people-signal card (beside the students-attention + outcome-follow-up chips) linking to `groups.html`; optionally repoint a quick-link to courses/groups; build + verify (no new card/tile/stat wall, no fabricated analytics)

**Checkpoint**: The dashboard connects to courses/groups minimally.

---

## Phase 13: User Story 11 — Static / Django-ready (Priority: P1)

**Goal**: The new surfaces are complete baked HTML; no runtime page DOM.

**Independent Test**: Build; View Source on `groups.html`/`course.html`/`group.html` — full shell + cards/rows + all tab panels + all drawer templates baked, no `#app`, relative paths.

- [x] T037 [US11] EXTEND `tests/smoke/run.cjs` — add `groups`, `course`, `group` to PAGES and assert: labeled group-status chips (ALL, icon+text), the facets + tiles narrow via `data-filter-set`, the profile tabs are baked + exactly one visible + switch, Groups→`group.html` / Students→`student.html` / family→`family.html` / Course→`course.html` links are real `<a>`, the learning-path ladder is labeled, the `groups` nav item is a real `<a>` with a route (rest stay Soon), the canonical outcome drawer opens from a profile Outcomes tab, portal ids absent, no `#app`, relative paths
- [x] T038 [US11] Update `app/README.md` + `quickstart.md` with the Django mapping for the new surfaces (`{% for course/group/student %}`, course/group profiles → `course_detail.html`/`group_detail.html` with `{% if active_tab %}`, the canonical drawer → ONE `{% include "admin/_outcome_details.html" %}`, the status maps → template tags, the level ladder → `{% include "admin/_level_ladder.html" %}`)

**Checkpoint**: Static/Django integrity verified for the new surfaces.

---

## Phase 14: User Story 12 — Visual / reference alignment + screenshots (Priority: P1)

**Goal**: The new surfaces match the approved direction; the 15-frame matrix passes.

**Independent Test**: Capture the matrix; review each vs Spec 001–005 + the legacy course/group screens (product reference only); axe clean; responsive correct.

- [x] T039 [P] [US12] EXTEND `tests/screenshots/capture.cjs` MATRIX + variant support with the 15 Spec 006 frames (Courses AR light/dark + EN; Course profile + Learning-Path tab; Groups AR light/dark; Group profile + Sessions&Outcomes + Timetable tabs; Student Courses-tab links; Family hint; Dashboard groups-attention; mobile Groups; mobile Group profile) — per screenshot-acceptance
- [x] T040 [P] [US12] EXTEND `tests/a11y/run.cjs` — add courses (dark + EN), groups (ar light + dark + en), course + group (ar light + a tab state); fix any critical violation
- [x] T041 [US12] Run `npm run build && npm run screenshots`; review each capture side-by-side vs the approved Spec 001–005 direction + the sidebar reference + the legacy course/group screens (product reference only); fix any failure condition (generic-catalogue / class-spreadsheet / missing-relationship / missing-profile / dead-actions / poor-dark / broken-RTL / persistence-claim); record verdicts in `app/screenshots/REVIEW.md`
- [x] T042 [US12] Responsive pass: verify + fix mobile Groups (rows → single-column cards; tiles wrap) and mobile Group profile (tabs scroll; drawer full-height) — no overflow

**Checkpoint**: Screenshot matrix accepted; no drift; the course↔group relationship + labeled statuses + reused drawer present.

---

## Phase 15: Polish & Cross-Cutting Concerns

- [x] T043 [P] Verify the scope guard end-to-end per `contracts/scope-guard.md` — `grep` confirms no chart/table/form/calendar library; no backend/API/auth/permission/CRUD/persistence; no course/group/enrollment/assignment/curriculum/certificate/scheduling/attendance/finance engine; no portals/role dashboards (smoke: portal ids absent); no legacy numeric `status=0..N`; no legacy assets/classes/palette/wording; no `#app`
- [x] T044 [P] Run the `quickstart.md` flow end-to-end (build → preview → review courses/course/groups/group/learning-path/timetable/outcomes/integration/dashboard → verify static-first → verify no-persistence → verify no-library → test → screenshots) and fix any gap
- [x] T045 Fixture coherence: every `Course.groupIds[]`↔`Group.courseId` resolves bidirectionally; `Group.teacherId`/`studentIds`/`scheduleBlockIds`/`outcomeIds` resolve; course counts match resolved links; a `full` group has `enrolledCount===capacity`; the dashboard chip count matches `GROUP_SUMMARY.needsAttention`; no console missing-key warnings
- [x] T046 Final consistency + cleanup: run a clean-code-guard review on the production-code diff + a test-guard review on the changed tests; fix blocking issues; re-run build/smoke/a11y/screenshots; remove dead code; update `app/screenshots/REVIEW.md` + the project memory note

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (T001–T004)**: start immediately. T002/T003/T004 are `[P]` (different files).
- **Foundational (T005–T012)**: after Setup; **blocks all stories**. T005/T007/T008/T010/T011/T012 are `[P]`; **T006 then T009** (course-status before the courses fixture imports it); **T009 after T008** (supersede the STUDENT_GROUPS seed).
- **US1 (T013–T014)**: after Foundational → the catalogue entry.
- **US2 (T015–T018)**: after Foundational → the MVP headline. T015 edits `nav.config.js`; T017 edits `build-html.mjs`.
- **US3 (T019–T021)** / **US4 (T022–T024)**: after Foundational — the profile shells. Both edit `build-html.mjs` (serialize T017/T020/T023).
- **US5 (T025–T026)** / **US6 (T027–T028)** / **US7 (T029–T030)** / **US8 (T031–T032)**: after the profile shells — each FILLS a tab/cluster in `course.js`+`group.js` (serialize on those files).
- **US9 (T033–T035)** / **US10 (T036)**: after Foundational + US3/US4 — different page files (`student.js`/`family.js`/`dashboard.js`).
- **US11 (T037–T038)** / **US12 (T039–T042)**: after the page stories exist — the acceptance gates.
- **Polish (T043–T046)**: last.

### Same-file serialization (never run these in parallel)

- `src/js/pages/course.js`: T019 → T025 → T027 → T029 → T031.
- `src/js/pages/group.js`: T022 → T027 → T029 → T031.
- `src/js/pages/courses.js`: T013 → T027 (kebab actions).
- `src/js/pages/groups.js`: T016 → T027 (kebab actions).
- `scripts/build-html.mjs`: T017 / T020 / T023 (serialize).
- `src/js/fixtures/courses.js`: T006 (import) / T009 / T025 (levels) — serialize.
- `src/js/nav.config.js`: T015 only.
- `src/js/i18n.js` + `src/locales/{ar,en}.crs.js`: T002 only.
- `src/styles/app.css`: T003 (then any visual fix in T041/T042).
- `tests/smoke/run.cjs`: T037; `tests/screenshots/capture.cjs`: T039; `tests/a11y/run.cjs`: T040 (different files → `[P]`).

### Parallel opportunities

- Setup T002/T003/T004 (different files).
- Foundational T005/T007/T008/T010/T011/T012 in parallel; T006→T009.
- US11/US12 harness extensions T037 (smoke) ‖ T039 (capture) ‖ T040 (a11y) are different files.
- US9 (`student.js`/`family.js`) ‖ US10 (`dashboard.js`) are independent page files.

---

## Parallel Example: Foundational blocks

```bash
# After Setup, build the shared pieces (different files):
Task: "T005 components/group-status.js"   Task: "T007 components/enrollment-status.js"
Task: "T008 fixtures/groups.js"           Task: "T010 components/group-row.js"
Task: "T011 components/learning-path.js"   Task: "T012 components/course-group-actions.js"
# then T006 course-status → T009 enrich courses.js (imports it + supersedes STUDENT_GROUPS)
```

## Parallel Example: US12 acceptance harness

```bash
Task: "T039 capture.cjs MATRIX (15 Spec 006 frames)"
Task: "T040 a11y/run.cjs coverage (courses/groups/course/group)"
# (T037 smoke is its own file too) → then T041 review + T042 responsive
```

---

## Implementation Strategy

### MVP path

1. Setup → 2. Foundational → 3. **US1** (Courses enrich) → 4. **US2** (Groups directory) → 5. **US4** (Group profile) [+ **US3** Course profile shell].
   **Stop & validate** at the US4 checkpoint: the enriched catalogue + the Groups directory + the Group profile (course chip-link + roster→student + reused timetable/outcomes once US7/US8 land) prove the "academically complete cohort" feel. This is the demoable MVP (spec MVP = US1 + US2 + US4).

### Incremental delivery

- After **US1–US4**: the four page surfaces (Courses enriched + Groups directory + both profile shells).
- After **US5**: the learning-path display. After **US6**: honest actions. After **US7/US8**: timetable + outcome linkage (the cross-cutting tabs filled).
- After **US9 / US10**: student/family + dashboard integration.
- After **US11 / US12**: static/Django integrity + the 15-frame screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (labeled-chip/filter/profile-tab/link smoke, axe, no-`#app`) are necessary but the **manual screenshot review against Spec 001–005 + the legacy reference is the final gate** (`contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. **Serialize all edits to the same file** (esp. `course.js`/`group.js`, touched by US3/US4 then US5–US8; `build-html.mjs`; `courses.js`).
- Honor `contracts/scope-guard.md` throughout: fixtures only; static HTML-first (no `#app`, baked cards/rows/profile-tabs/drawers); **no chart/table/form/calendar library**; **no course/group/enrollment/assignment/curriculum/certificate/scheduling/attendance/finance engine**; **no real status mutation/notification**; **no portals/role dashboards**; **no legacy numeric statuses or legacy copy**; **reuse** Spec 003 `scheduleAgenda` + the Spec 005 canonical `outcomeTemplate` drawer (NO new builder — SC-009).
- Routes: `groups.html` is the **NI12 promotion** of the planned `groups` item (`activeId:'groups'`); `course.html`/`group.html` are **profile templates** (`activeId:'courses'`/`'groups'`, not nav items); `familyCategories` + the rest stay planned; Django later → `course/<id>`, `group/<id>`.
- The three status maps stay DISTINCT: **catalogue** course-status (active/draft/paused/archived) on Courses + course banner; **cohort** group-status (active/trial/full/paused/completed + needsAttention) on Groups + group banner; **enrollment** status (active/paused/completed) on the student Courses tab — never shadowing each other, never numeric/color-only.

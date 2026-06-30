# Feature Specification: Teacher Performance and Academic KPIs

**Feature Branch**: `feature/001-approved-dashboard-design` (single-branch spec-kit; Spec 007 lives beside 001–006)
**Created**: 2026-06-30
**Status**: Draft
**Input**: User description: "Teacher Performance and Academic KPIs — how admins understand, review, and follow up on teacher academic performance (workload, session delivery, outcomes, absence, follow-up) using fixture-backed data from teachers/courses/groups/schedule/sessions/attendance/students/families; frontend-only, fixture-only, grounded in the analyzed legacy academy system."

---

## Context & Grounding *(why this spec is shaped the way it is)*

Two grounding passes were run before writing this spec: one over the analyzed legacy academy system (`output/combined/*-inventory.md`, `frontend-planning-deep/*`) and one over the current implemented app (`academy-dashboard-discovery/app/`). Four findings drive every decision below:

1. **The legacy system had NO computed teacher score and NO ranking/leaderboard.** Teacher "performance" was a set of scattered **raw counts** — `Teachers Details` (per-teacher Cancel / Absent / Attend), `Teacher Feedback` (a single ratio %), `Class Feedback` (% + session count), and `Sessions Analysis` (a system-wide aggregate with a `teacher_id` filter but **no per-teacher drill-down**). A `View KPIs` permission existed but **no KPI page** was ever built. **So Spec 007's performance surface is a calm, fixture-backed DISPLAY of raw counts + labeled signals — never a computed score, rank, or analytics engine.**

2. **Teacher academic operations and FINANCE were mixed in the legacy UI but are architecturally separable** (the legacy v2 IA itself recommends isolating finance). The legacy teacher profile crammed academic data (Students, Schedule, Monthly Classes) and finance (Compensations, Salary, Payouts) onto one 56-button page. **Spec 007 builds the ACADEMIC side only.** All salary / payroll / compensation / payout / accounting is **explicitly out of scope** (a future finance spec).

3. **Teacher absence is first-class and already modeled.** The legacy `absent_by` distinguished teacher-absent vs student-absent sessions (separate accounting filters + salary columns). Spec 005 already encodes this as the `teacherAbsent` vs `studentAbsent` outcome statuses + the canonical outcome drawer. **Spec 007 REUSES Spec 005 for all teacher outcome/absence views — no new outcome engine.**

4. **Every teacher↔course/group/schedule/outcome linkage is already derivable by id-join** in the current fixtures (`groupsOfTeacher`, `COURSES.teacherIds`, `SCHEDULE_WEEK` `trainer.id`, `SESSION_OUTCOMES` `trainer.id`), exactly like the Spec 006 course/group profiles. The current Teachers page is a card-grid directory (no profile page); the nav `teachers` category already has a **`cat.teachersPerf` section with a planned `teacherKpi` item → `teacher-performance.html`** (in `FUTURE_ROUTES`), ready to promote. **Reuse, don't duplicate** (the Spec 003 `scheduleAgenda`, the Spec 005 `outcomeRow`/`outcomeTemplate`, the Spec 006 `profileBanner`/`tabs`/`cohort-panels`, and the existing teacher fixture). One data gap to handle: `huda` (and `abdullah` for groups) have sparse fixture data — the surfaces must handle **zero-data** teachers gracefully (and the plan may add a couple of fixture sessions so the baked profile is rich).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin reviews & filters Teachers with academic context (Priority: P1)

An admin opens **Teachers** and sees each teacher as a calm card — name + subject(s) + a labeled status chip + academic counts (courses, groups, active students, upcoming sessions) + a workload hint + a follow-up/attention flag — and can search/filter by subject, status, and workload/availability. Each card links to that teacher's profile.

**Why this priority**: Teachers already exist (`teachers.html`); enriching them with course/group/session context + the profile link is the smallest change that surfaces the teacher's academic footprint and is the entry point for everything else.

**Independent Test**: Open Teachers; read each card's labeled status + courses/groups/students/upcoming counts + workload hint + a "View profile" link; apply each filter (narrow + count + no-results/reset). Confirm it does not read as a generic HR/employee table.

**Acceptance Scenarios**:

1. **Given** the Teachers page, **When** it loads, **Then** every teacher card shows a labeled (icon+text, never color-only) status chip + subject chip(s) + the courses/groups/students counts + an upcoming-sessions hint, and a "View profile" link to `teacher.html`.
2. **Given** the Teachers page, **When** the admin filters by subject (or status/workload), **Then** only matching teachers remain with a result count and a no-results/reset state.
3. **Given** a teacher with sparse data (e.g. no sessions yet), **When** rendered, **Then** the card shows a calm zero/empty hint (e.g. "no recent sessions") rather than a broken or misleading count.

---

### User Story 2 - Admin opens a Teacher profile (Priority: P1) 🏗️ MVP

An admin opens a **Teacher profile** and sees a banner (name + status + subjects + workload + KPIs + demo actions) over baked tabs: **Overview**, **Courses** (→ `course.html`), **Groups** (→ `group.html`), **Timetable** (the teacher's weekly sessions via the shared agenda + a schedule deep-link), **Sessions & Outcomes** (the teacher's recent outcomes via the shared rows/drawer — teacher-absent vs student-absent distinct — + an attendance deep-link), **Students** (→ `student.html`, family chip → `family.html`), **Follow-up** (a calm fixture follow-up list), and **Notes**.

**Why this priority**: The teacher profile is where the teacher's scattered academic footprint unifies into one hub; it is the destination of US1's links and the MVP payoff.

**Independent Test**: On `teacher.html`, switch each tab and confirm baked content: Courses → `course.html`, Groups → `group.html`, Timetable reuses `scheduleAgenda` + `schedule.html#view=timetable`, Sessions & Outcomes reuses the **same** canonical outcome drawer (teacherAbsent visible) + `attendance.html`, Students → `student.html` (family chip → `family.html`).

**Acceptance Scenarios**:

1. **Given** a teacher profile, **When** it loads, **Then** the banner shows a labeled status chip + workload hint + KPIs, and exactly one baked tab panel is visible.
2. **Given** the Sessions & Outcomes tab, **When** the admin opens a session, **Then** the SAME canonical Spec 005 outcome drawer opens (Status + Outcome + present/capacity + attribution), and **teacherAbsent** rows are visibly distinct from **studentAbsent** rows.
3. **Given** the Courses/Groups/Students tabs, **When** the admin clicks an item, **Then** it navigates to the right `course.html`/`group.html`/`student.html` (family chip → `family.html`).

---

### User Story 3 - Admin understands teacher workload (Priority: P2)

The admin sees each teacher's **workload** as a calm fixture hint (e.g. balanced / high / light, plus session & hour counts) on the card, the profile banner, and the performance surface — with no real workload-calculation engine.

**Why this priority**: Workload is a headline "academic operations" signal, but it must stay an honest fixture display (the legacy system had only raw hours/counts, no computed load).

**Independent Test**: On Teachers + the teacher profile + the performance page, confirm a labeled workload hint (icon+text) backed by fixture session/hour counts; confirm no claim of a computed/real workload metric.

**Acceptance Scenarios**:

1. **Given** a teacher, **When** rendered, **Then** a labeled workload hint appears with fixture session/hour counts, never a numeric-only or color-only badge, and never a computed-score claim.

---

### User Story 4 - Admin reviews teacher outcomes & absence (Priority: P2)

The admin reviews a teacher's recent session outcomes — completed/attended, **teacher absences**, **student absences under that teacher**, cancelled/rescheduled — reusing the Spec 005 outcome rows + the canonical drawer, with the teacher-absent vs student-absent distinction unmistakable.

**Why this priority**: Outcome/absence review is the core of "how is this teacher delivering"; it reuses Spec 005 entirely.

**Independent Test**: On the teacher profile Sessions & Outcomes tab (and the performance surface), confirm teacher outcomes render with labeled chips, teacherAbsent ≠ studentAbsent, and the canonical drawer opens.

**Acceptance Scenarios**:

1. **Given** the teacher Sessions & Outcomes tab, **When** rendered, **Then** teacherAbsent and studentAbsent rows are visually + textually distinct (reusing the Spec 005 outcome-status map), and a "View attendance" link opens `attendance.html`.

---

### User Story 5 - Admin follows up from teacher context (Priority: P2)

From a teacher card/profile, the admin moves to the connected contexts: student, family, group, course, timetable, and attendance — all via existing deep-links.

**Why this priority**: Cross-surface follow-up is the "academically complete" payoff and reuses Specs 003–006.

**Independent Test**: From the teacher profile, use the student/family/group/course/schedule/attendance links and confirm each navigates to the right in-scope page.

**Acceptance Scenarios**:

1. **Given** the teacher profile, **When** the admin uses any cross-link, **Then** it navigates to `student.html`/`family.html`/`group.html`/`course.html`/`schedule.html#view=timetable`/`attendance.html` — no dead links.

---

### User Story 6 - Admin performs demo teacher actions (Priority: P2)

The admin triggers teacher actions — add teacher, edit teacher, assign course/group, message teacher, notify family, add follow-up note, open timetable, view attendance, print/export summary — and always receives honest feedback: a demo toast, a confirm modal → demo toast, a disabled control with a visible reason, or a real in-scope link. Nothing mutates real data.

**Why this priority**: Action honesty is mandatory; it is P2 because the surfaces (P1) must host the actions first.

**Independent Test**: Trigger each action; confirm demo toast / confirm→toast / disabled-with-reason / real link; confirm no teacher/assignment/notification/salary mutation.

**Acceptance Scenarios**:

1. **Given** add/edit/message actions, **When** clicked, **Then** a demo toast (or confirm→toast for destructive); **Given** assign-course/assign-group/export, **Then** disabled-with-reason ("requires the backend, out of current scope"); **Given** open-timetable/view-attendance, **Then** a real link.

---

### User Story 7 - Admin reviews the Teacher Performance surface (Priority: P1)

An admin opens **Teacher Performance** (a promoted nav page) — an academy-wide, fixture-backed teacher KPI/follow-up board: summary KPI tiles (active teachers · completed sessions · teacher absences · student absences in teacher sessions · cancelled/rescheduled · groups needing attention · teachers needing follow-up), a **per-teacher comparison list** (each teacher's raw counts + workload + follow-up signal, linking to the teacher profile), and a **follow-up queue** — all display-only, with NO score, NO ranking, NO analytics engine.

**Why this priority**: This is the headline new surface the brief asks for; the legacy system had the data scattered across weak pages — Spec 007 unifies it into one calm board.

**Independent Test**: Open `teacher-performance.html`; read the KPI tiles + the per-teacher comparison rows (raw counts + labeled workload/follow-up signals, each → `teacher.html`) + the follow-up queue; confirm there is no computed score, rank, leaderboard, or chart, and no salary/finance widget.

**Acceptance Scenarios**:

1. **Given** the performance page exists, **When** the sidebar renders, **Then** the **Teacher Performance** item is a real `<a href="teacher-performance.html">` (promoted from planned) in the teachers category, and no nav link is dead.
2. **Given** the performance board, **When** it loads, **Then** the KPI tiles + the per-teacher comparison rows + the follow-up queue are baked, each comparison row links to `teacher.html`, and the only numbers shown are fixture **counts** (no score/rank/percentile, no chart, no salary).

---

### User Story 8 - Dashboard reflects teacher signals minimally (Priority: P2)

The dashboard surfaces only useful fixture-backed teacher signals — e.g. one "teachers needing follow-up" (or "teacher absences today") chip folded into an existing card, deep-linking to Teacher Performance. No new stat wall, no ranking, no salary widget.

**Why this priority**: Keeps the dashboard connected without inflating it; mirrors the minimal-impact pattern of Specs 003–006.

**Independent Test**: On the dashboard, confirm at most one fixture-backed teacher chip + a deep-link folded into an existing card; confirm no new standalone widgets, no fabricated metrics, no finance.

**Acceptance Scenarios**:

1. **Given** the dashboard, **When** rendered, **Then** a single fixture "teachers needing follow-up" chip links to `teacher-performance.html`, with no new stat wall.

---

### User Story 9 - Experience stays static / Django-ready (Priority: P1)

Teacher lists, profiles, KPI tiles, outcome rows, schedule blocks, drawers, and demo actions are complete baked HTML at build time; runtime JS only switches tabs, filters pre-rendered cards/rows, opens drawers/modals, and shows demo/disabled feedback. The surface deploys to GitHub Pages and maps cleanly to Django templates.

**Why this priority**: A hard architectural constraint inherited from Specs 001–006; a violation breaks the project.

**Independent Test**: Build; View Source on `teachers.html`, `teacher.html`, `teacher-performance.html` (+ `.en`) — full shell + cards/rows + all tab panels + all drawer templates baked, no `#app`, relative paths, no external requests.

**Acceptance Scenarios**:

1. **Given** any new/enriched page, **When** viewing source, **Then** the cards/rows, every tab panel, and every drawer `<template>` are baked, with no whole-page `#app` mount and relative asset paths.

---

### User Story 10 - Visual / reference alignment (Priority: P1)

The teacher surfaces look premium, calm, academy-specific, and visually consistent with Specs 001–006 in Arabic-RTL (default), English-LTR, and Light/Dark/System — better and cleaner than the legacy reference, never a generic HR dashboard, employee table, or fake analytics suite.

**Why this priority**: Screenshot-based visual acceptance is the project's final gate.

**Independent Test**: Capture the screenshot matrix and review each frame against the approved Spec 001–006 direction + the legacy teacher screens (product reference only); confirm no failure condition.

**Acceptance Scenarios**:

1. **Given** the captured frames, **When** reviewed, **Then** Teachers/Teacher-profile/Teacher-Performance read as premium academy teacher operations (relationships visible, labeled signals, calm density, **no fake scores/ranks/charts/salary**) in AR light/dark + EN, with correct RTL/LTR and strong dark mode.

---

### Edge Cases

- **A teacher with zero sessions/outcomes** (e.g. `huda`): the profile + performance row show calm "no recent sessions / no outcomes yet" empty states and zeroed counts, never a broken/misleading metric. (The plan may add a couple of fixture sessions so the *baked* profile is rich, but zero-data must still render cleanly.)
- **A teacher with no groups** (e.g. `abdullah`, physics-draft): the Groups tab shows "no groups yet" — no dead "group" link.
- **A teacher absence vs a student absence** in the same teacher's sessions: both render, each labeled and attributed (teacherAbsent vs studentAbsent), never conflated.
- **Filtering to an empty result** on Teachers: a no-results panel with a reset, distinct from a zero-data teacher.
- **The performance surface with no follow-ups**: the follow-up queue shows a calm "nothing needs follow-up" state, not an empty broken table.
- **No salary/finance anywhere**: if a teacher card/profile would naturally show pay (the legacy did), it MUST instead show only academic counts; any "earnings/salary" affordance is absent or disabled-with-reason ("finance is out of scope").
- **Deep-linked profile templates** (`teacher.html`) bake one representative teacher (Django later → `teacher/<id>`); they highlight the **Teachers** nav item and never appear as their own nav item.

---

## Requirements *(mandatory)*

### Functional Requirements — Teachers page (US1, US3)

- **FR-001**: The system MUST enrich the existing `teachers.html` cards with academic context — subject chip(s), a labeled teacher-status chip, counts (courses · groups · active students), an upcoming-sessions hint, a workload hint, and a follow-up/attention flag — reusing the existing card-grid/directory-card/filter/summary/no-results pattern (no new table library).
- **FR-002**: Each teacher card MUST link to that teacher's baked profile (`teacher.html`), and MUST carry only fixture-backed counts/hints (no fabricated/computed metric, no salary).
- **FR-003**: The Teachers page MUST support search + filters for **subject** and **status** (and a workload or availability facet), with a visible result count and a no-results/reset state; sparse-data teachers render calm zero hints.

### Functional Requirements — Teacher profile (US2, US4, US5)

- **FR-004**: The system MUST provide a baked **Teacher profile** page (`teacher.html` + `teacher.en.html`) as a profile template (not a nav item), highlighting the **Teachers** nav item (`activeId:'teachers'`), composed of a profile banner + baked tabs; one representative teacher baked; Django later → `teacher/<id>`.
- **FR-005**: The Teacher profile MUST include the tabs **Overview, Courses, Groups, Timetable, Sessions & Outcomes, Students, Follow-up, Notes**, with exactly one panel visible at a time and all panels baked into static HTML.
- **FR-006**: The Courses tab MUST link to `course.html`; the Groups tab to `group.html`; the Students tab to `student.html` (with a family chip → `family.html`).
- **FR-007**: The Timetable tab MUST reuse the Spec 003 `scheduleAgenda` (the teacher's blocks resolved by `trainer.id`) + a `schedule.html#view=timetable` deep-link; the Sessions & Outcomes tab MUST reuse the Spec 005 `outcomeRow` + the **canonical** outcome drawer (the teacher's outcomes resolved by `trainer.id`; teacherAbsent vs studentAbsent distinct) + an `attendance.html` deep-link — no duplicated builders.
- **FR-008**: The Follow-up tab MUST present a calm fixture follow-up list (the teacher's needs-follow-up outcomes / groups needing attention) with deep-links — no follow-up engine, no persistence.

### Functional Requirements — Teacher Performance surface (US7)

- **FR-009**: The system MUST add a baked **Teacher Performance** page (`teacher-performance.html` + `.en`) by **promoting the existing planned `teacherKpi` nav item** to implemented (`route:'teacher-performance.html'`, already reserved in `FUTURE_ROUTES`) in the teachers `cat.teachersPerf` section; `sessionsKpi`/`monthlyPerf` and the rest stay planned; no dead links.
- **FR-010**: The Teacher Performance board MUST present summary KPI tiles (active teachers · completed sessions · teacher absences · student absences in teacher sessions · cancelled/rescheduled · groups needing attention · teachers needing follow-up), a **per-teacher comparison list** (each teacher's fixture raw counts + labeled workload + follow-up signal, linking to `teacher.html`), and a **follow-up queue** — all display-only.
- **FR-011**: The performance surface MUST show only fixture **counts** and **labeled signals** — NO computed score, NO ranking/leaderboard/percentile, NO chart/graph, NO salary/finance figure; the per-teacher rows MUST be sortable/filterable only via the existing client-side facet/filter mechanism (no analytics engine).

### Functional Requirements — Status/workload/performance vocabularies (US1, US3, US7)

- **FR-012**: The system MUST define a labeled **teacher-status** map — `active / paused / inactive` (collapsing the legacy active/inactive/incomplete/unconfirmed/deleted) — icon + text, never numeric/color-only, distinct from the session/lifecycle/outcome/course/group maps.
- **FR-013**: The system MUST define a labeled **workload** signal (`balanced / high / light`) and a labeled **performance/follow-up** signal (`strongDelivery / stable / needsFollowUp / attentionRisk`) — both **display-only fixture flags** (never computed scores/ranks). The existing **availability** map (`available/busy/off`) MAY be reused as the schedule-availability chip. All Arabic/English localized.

### Functional Requirements — Actions (US6)

- **FR-014**: Every teacher action (add/edit teacher, assign course/group, message teacher, notify family, add follow-up note, open timetable, view attendance, print/export summary) MUST be honest: a **demo toast**, a **confirm modal → demo toast** (destructive), **disabled-with-reason**, or a **real in-scope link** — reusing the existing `data-demo-action` / `data-confirm` / `data-disabled-reason` hooks.
- **FR-015**: No action MAY perform a real save, create, assign, notify, mutate attendance, or touch salary/finance; there MUST be no dead controls.

### Functional Requirements — Integrations (US5, US8)

- **FR-016**: The teacher surfaces MUST cross-link to `student.html` / `family.html` / `course.html` / `group.html` / `schedule.html#view=timetable` / `attendance.html` (fixture-only, no portals).
- **FR-017**: The dashboard MUST surface at most one fixture-backed teacher signal (a "teachers needing follow-up" or "teacher absences today" chip) folded into an existing card with a deep-link to `teacher-performance.html` — no new stat wall, no ranking, no salary widget.

### Functional Requirements — Data, static architecture, i18n (US9, US10)

- **FR-018**: The system MUST extend the teacher fixture with a `statusId`, a workload signal, a follow-up signal, and derived/fixture academic counts (courses/groups/students/upcoming/completed/teacherAbsent/studentAbsent), plus a `outcomesOfTeacher(id)` resolution (derive by `trainer.id`); every cross-reference MUST resolve, and zero-data teachers MUST be handled. **No salary/finance fields are added.**
- **FR-019**: All new lists, cards, profile tabs, KPI tiles, comparison rows, outcome rows, schedule blocks, drawers, and demo actions MUST be **baked static HTML** at build time; runtime JS MUST only switch tabs, filter pre-rendered cards/rows, open drawers/modals, and show demo/disabled feedback — it MUST construct no page DOM and there MUST be no `#app` mount.
- **FR-020**: All pages MUST be GitHub-Pages compatible (relative/local paths, no CDN), per-language pre-rendered (`*.html` AR default + `*.en.html`), RTL/LTR correct, Light/Dark/System, and Django-template-ready (`{% for teacher %}`, tabs → `{% if %}`, the canonical drawer → one shared partial, status/signal maps → template tags).
- **FR-021**: No new dependency; NO chart/table/form/calendar/SPA library, no TypeScript, no CDN, no backend/API/auth/CRUD/persistence; **no teacher-management / assignment / workload-calc / performance-scoring / ranking / salary-payroll / attendance / notification engine**; no portals/role dashboards; no legacy numeric statuses or copied legacy assets/classes/palette/wording.
- **FR-022**: The surface MUST pass the project gates: build clean (no raw i18n keys), smoke (baked cards/rows/tabs/drawers, tile/filter behavior, real `<a>` nav links, no dead controls, no `#app`), axe critical=0, and the screenshot matrix reviewed against the approved direction.

### Key Entities *(fixture-only; no persistence)*

- **Teacher (academic)**: id, name, subject(s), labeled `status` (active/paused/inactive), availability, fixture counts (courses/groups/students/upcoming/sessions/hours/rating), an outcome-count breakdown (completed/teacherAbsent/studentAbsent/cancelled), a workload signal, a follow-up signal, notes. *No salary/finance fields.*
- **Teacher status / workload / follow-up signal maps**: labeled vocabularies (icon+text), distinct from the session/lifecycle/outcome/course/group maps; display-only (never computed scores/ranks).
- **Teacher profile**: a baked tabbed profile template (banner + 8 tabs), reusing `profile-banner` + `tabs` + `cohort-panels`.
- **Teacher Performance board**: KPI tiles + a per-teacher comparison list (counts + signals) + a follow-up queue — display-only.
- **Teacher links (reused)**: courses (`COURSES.teacherIds`), groups (`groupsOfTeacher`), schedule (`SCHEDULE_WEEK` `trainer.id`), outcomes (`SESSION_OUTCOMES` `trainer.id`), students/families (via the teacher's groups' rosters).
- **Dashboard teacher signal (minimal)**: one fixture follow-up chip + a deep-link.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: From Teachers, an admin can reach any teacher's courses, groups, timetable, recent outcomes, and students in **≤ 2 clicks**; from Teacher Performance, reach any teacher's profile in **1 click**.
- **SC-002**: **100%** of teacher statuses/workload/follow-up signals are shown as labeled chips (icon + text); **zero** numeric-only or color-only indicators, and **zero** computed scores/ranks/percentiles anywhere.
- **SC-003**: **100%** of teacher→course/group/student/family/schedule/attendance links resolve to a real in-scope baked page or the canonical drawer — **zero** dead links or dead controls.
- **SC-004**: **Every** teacher action produces visible honest feedback (demo toast / confirm→toast / disabled-with-reason / real link); **zero** actions mutate data or perform a real save; **zero** salary/finance figures appear.
- **SC-005**: The Teacher profile and Teacher Performance page are **fully baked** static HTML — viewing source shows all cards/rows, all tab panels, and all drawer templates with **no** `#app` mount and **only** relative asset paths; the pages render correctly opened directly from the filesystem / GitHub Pages.
- **SC-006**: Teacher filters narrow results with a visible count and a distinct no-results vs zero-data (sparse teacher) state in **100%** of filter combinations tested; zero-data teachers (e.g. huda) render calm empty states.
- **SC-007**: Accessibility: axe reports **critical = 0** across the new pages in AR (light + dark) and EN; RTL and LTR both render without overflow on desktop, tablet, and mobile.
- **SC-008**: Visual acceptance: **every** screenshot-matrix frame is reviewed and passes against the Spec 001–006 approved direction with **no** failure condition (generic HR dashboard / employee table / fake analytics / fake score-rank / salary widget / missing teacher↔course/group/schedule relationship / missing teacherAbsent-vs-studentAbsent / dead actions / poor dark mode / broken RTL/LTR / copied legacy visuals / raw i18n keys).
- **SC-009**: The Spec 003 schedule agenda and the Spec 005 canonical outcome drawer are **reused unchanged** on the teacher surfaces — **zero** new bespoke outcome-drawer, timetable, or analytics builders are introduced.

---

## Assumptions

- **Performance = display-only counts, never scores.** Grounded in the legacy reality (no computed score, no ranking ever existed). The Teacher Performance surface shows fixture raw counts + labeled signals; any computed/normalized/ranked metric is out of scope.
- **Three surfaces are accepted**: enrich `teachers.html`; add `teacher.html` (profile template, `activeId:'teachers'`, not a nav item); promote `teacherKpi` → `teacher-performance.html` (the academy-wide KPI/follow-up board, in the teachers `cat.teachersPerf` section). `sessionsKpi`/`monthlyPerf`/`addTeacher`/`teacherCategories` stay planned. Label «أداء المعلمين»/"Teacher Performance".
- **Finance is entirely out of scope.** No salary/payroll/compensation/payout/accounting — a future finance spec. Where the legacy showed pay, the teacher surfaces show only academic counts.
- **Reuse over rebuild.** Teachers reuse `cardGrid`/`directoryCard`/`filterBar`/`summaryCards`/`noResults`; the profile reuses `profileBanner`/`tabs`/`cohort-panels`; timetable reuses `scheduleAgenda` + the schedule deep-link; outcomes reuse the Spec 005 `outcomeRow`/`outcomeTemplate` (canonical drawer, teacherAbsent distinct) + the attendance deep-link; course/group/student/family links reuse Specs 004/006. New maps: teacher-status + workload + follow-up signals; a `teacherActions()` cluster; a `outcomesOfTeacher(id)` helper.
- **Zero-data is handled.** `huda`/`abdullah` are sparse in the current fixtures; the surfaces render calm empty states, and the plan may add a few fixture sessions so the baked profile/comparison is representative (no fabricated metrics).
- **One representative teacher is baked** (`teacher.html`) as a Django-ready template (`teacher/<id>` later), highlighting the **Teachers** nav category.
- **Fixtures only.** Counts/rosters/schedules/outcomes resolve from the existing teachers/courses/groups/schedule/attendance/students/families fixtures; no analytics, finance, or performance metrics are fabricated.
- **No commit/push and no implementation in this phase** — this command produces the spec only. The single-branch convention is preserved (the `before_specify` git branch/commit hook is intentionally not triggered).
- **Scope is sequenced MVP-first**: US1 (Teachers enrich) + US2 (Teacher profile) form the demoable MVP; US7 (Teacher Performance), US3/US4/US5/US6 (workload/outcomes/follow-up/actions), and US8 (dashboard) are independent increments; US9/US10 (static/Django + visual) are the cross-cutting acceptance gates.

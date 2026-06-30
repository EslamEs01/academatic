# Feature Specification: Courses, Groups and Learning Paths Deep Experience

**Feature Branch**: `feature/001-approved-dashboard-design` (single-branch spec-kit; Spec 006 lives beside 001–005)
**Created**: 2026-06-30
**Status**: Draft
**Input**: User description: "Courses, Groups and Learning Paths Deep Experience — make the academy feel academically complete by connecting courses ↔ groups ↔ students ↔ families ↔ teachers ↔ schedules ↔ attendance/outcomes, grounded in the analyzed legacy academy system, frontend-only and fixture-only."

---

## Context & Grounding *(why this spec is shaped the way it is)*

Two grounding passes were run before writing this spec: one over the analyzed legacy academy system (`output/combined/*-inventory.md`, `frontend-planning-deep/*`) and one over the current implemented app (`academy-dashboard-discovery/app/`). Three findings drive every decision below — they are stated up front because they override the naive reading of the brief:

1. **The legacy "Course" is an individual enrollment, not a catalogue offering.** In the reference, a *Course* = one student + one teacher + a schedule + rates + a *Material* (a 2-field subject lookup). The page titled "Courses" is a flat list of every enrollment. The current app already **improved** on this by reframing `courses.html` as a **subject-offering catalogue** (Math, Arabic, Programming… each with enrolled/sessions counts and a status), and by modelling the per-student enrollment separately inside the Spec 004 student profile (`enrollments[]`). **Spec 006 keeps that improved framing**: a *Course* = a subject offering the academy runs; a student's participation in it = an *enrollment* (already owned by Spec 004); a *Group* = a cohort that delivers the course.

2. **The legacy "Group" was the right idea but skeletal — this is the genuine new depth.** A legacy *Group* = one teacher + many students sharing one schedule, linked to a `course_id`. It had its own two routes, but **zero rows, no detail page, and no reverse link from the course**. The concept (a class/cohort) is exactly the modern academic primitive the app is missing. The app already has the seeds: a planned `groups` nav item (`FUTURE_ROUTES.groups='groups.html'`), a `STUDENT_GROUPS` fixture (`grp1/grp2/grp3`), and a `groupId` on student enrollments. **Groups (directory + profile) is the headline of Spec 006**, built better than the dead-ended reference by giving it the connections the reference lacked (course, teacher, students, timetable, outcomes).

3. **There is NO reference-backed curriculum / learning-path engine.** In the reference, "Material" is a name lookup, "Level" is a per-session note + an age-group filter, "Curriculum" is a free-text field in a meeting report, and certificates are manually requested/approved. There is no level hierarchy, no units, no modules, no milestone automation. **Therefore "Learning Paths" in Spec 006 is a calm, display-only level/progression strip** (the academy's `foundation → l1 → l2 → l3 → advanced` ladder, already present in the course fixture as `levels[]`, plus fixture cohort counts and a certificates hint) that lives **inside the Course profile** — explicitly NOT a curriculum builder, NOT a progression engine.

Everything else (timetable, sessions, attendance/outcomes, students, families, teachers, status maps, drawers, demo actions, the static-HTML/Django architecture) is **reused** from Specs 001–005, never duplicated.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin reviews and filters the Courses catalogue (Priority: P1)

An admin opens **Courses** and sees the academy's subject offerings as calm cards — each showing the subject, level, a labeled status chip, and academic counts (active students, groups, assigned teachers, upcoming sessions) — and can search/filter by subject, level, and status. Each card links to that course's profile.

**Why this priority**: Courses already exist (`courses.html`); enriching them with the group/teacher counts and the profile link is the smallest change that makes the "academically complete" graph visible, and it is the entry point for everything else.

**Independent Test**: Open Courses; read each card's subject + level + labeled status + counts; apply each filter and confirm rows narrow with a count and a no-results/reset state; click a card and land on the course profile. Confirm it does not read as a generic course catalogue (it carries real academic counts and links, not just titles).

**Acceptance Scenarios**:

1. **Given** the Courses page, **When** it loads, **Then** every course card shows a labeled (icon+text, never color-only) status chip and the active-students / groups / teachers counts, plus a "View course" link to its profile.
2. **Given** the Courses page, **When** the admin selects a subject and a level filter, **Then** only matching course cards remain, a result count updates, and an empty match shows a no-results panel with a reset.
3. **Given** a course card, **When** the admin clicks "View course", **Then** the browser navigates to that course's baked profile page (`course.html`), with the **Courses** nav item active.

---

### User Story 2 - Admin reviews and filters the Groups directory (Priority: P1) 🏗️ MVP headline

An admin opens **Groups** (a newly promoted nav page) and sees every class/cohort as an airy list/card hybrid — each showing the group name, its course, its teacher, the level, a schedule summary (days · time), a students count, a labeled group-status chip, and an attention/outcome hint — and can filter by course, teacher, level, day, status, and attention. Each group links to its profile.

**Why this priority**: Groups is the genuine new academic surface (the legacy system dead-ended it). It is the single most valuable addition for "feeling academically complete" and is independently demoable on its own.

**Independent Test**: Open Groups; read each group's course + teacher + level + schedule-summary + students-count + labeled status; apply each filter (course/teacher/level/day/status/attention) and confirm narrowing + count + no-results/reset; click a group and land on its profile. Confirm it does not read as a generic class spreadsheet.

**Acceptance Scenarios**:

1. **Given** the Groups page exists, **When** the sidebar renders, **Then** the **Groups** item is a real `<a href="groups.html">` (promoted from planned) with the correct active category, and no nav link is dead.
2. **Given** the Groups directory, **When** it loads, **Then** every group shows its course link, teacher, level, schedule summary, students count, and a labeled group-status chip (active/trial/full/paused/completed) — never numeric or color-only.
3. **Given** the Groups directory, **When** the admin filters by course (or teacher/level/day/status/attention), **Then** only matching groups remain with a result count and a no-results/reset state.

---

### User Story 3 - Admin opens a Course profile (Priority: P1)

An admin opens a **Course profile** and sees a banner (subject, level, status, counts, demo actions) over baked tabs: **Overview**, **Groups** (the cohorts delivering this course, linking to group profiles), **Students** (enrolled, linking to student profiles), **Teachers** (assigned, linking to teacher previews), **Timetable** (this course's sessions via the shared agenda + a schedule deep-link), **Outcomes** (recent attendance/outcomes via the shared outcome rows/drawer + an attendance deep-link), **Learning Path** (the display-only level ladder + certificates hint), and **Notes**.

**Why this priority**: The course profile is where the scattered relationships unify into one academic hub; it is the "course is academically complete" payoff and the destination of US1's links.

**Independent Test**: On `course.html`, switch each tab and confirm baked content: Groups list links to `group.html`, Students link to `student.html`, Timetable reuses the schedule agenda + `schedule.html#view=timetable` link, Outcomes reuses the outcome rows + the **same** canonical outcome drawer + `attendance.html` link, and Learning Path shows the level ladder (no engine claim).

**Acceptance Scenarios**:

1. **Given** a course profile, **When** it loads, **Then** exactly one tab panel is visible and all panels are baked into the static HTML (no runtime DOM construction).
2. **Given** the Groups tab, **When** the admin clicks a group, **Then** it navigates to that group's profile; **Given** the Students tab, a student links to `student.html`.
3. **Given** the Outcomes tab, **When** the admin opens a session, **Then** the SAME canonical outcome drawer from Spec 005 opens (Status + Outcome, present/capacity, attribution, gated demo actions) — not a bespoke drawer.

---

### User Story 4 - Admin opens a Group profile (Priority: P1)

An admin opens a **Group profile** and sees a banner (group name, course chip-link, teacher, level, status, students count, demo actions) over baked tabs: **Overview**, **Students** (the cohort roster, each linking to student + family), **Timetable** (the group's weekly sessions via the shared agenda + schedule deep-link), **Sessions & Outcomes** (recent outcomes via the shared rows/drawer + attendance deep-link), **Teacher**, **Course** (link to the course profile), and **Notes**.

**Why this priority**: The group profile is the cohort's operational home — roster + schedule + outcomes in one place — and is the destination of US2's links. Together US2+US4 are the MVP that proves the new academic depth.

**Independent Test**: On `group.html`, switch each tab: the roster links to `student.html`/`family.html`, Timetable reuses `scheduleAgenda` + the schedule deep-link, Sessions & Outcomes reuses the outcome rows + the canonical drawer + the attendance deep-link, and the Course tab links to `course.html`.

**Acceptance Scenarios**:

1. **Given** a group profile, **When** it loads, **Then** the banner shows a course chip-link + teacher + labeled group-status, and exactly one baked tab panel is visible.
2. **Given** the Students tab, **When** the admin clicks a student row, **Then** it navigates to `student.html`; a family chip navigates to `family.html`.
3. **Given** the Timetable / Sessions & Outcomes tabs, **When** rendered, **Then** they reuse the Spec 003 agenda and the Spec 005 outcome rows/drawer (no duplicated builders) and deep-link to `schedule.html#view=timetable` / `attendance.html`.

---

### User Story 5 - Admin understands the learning path / levels (Priority: P3)

An admin views the **Learning Path** section inside a course profile: the academy's level ladder (`foundation → l1 → l2 → l3 → advanced`) as a calm labeled strip, with fixture cohort/student counts per level and a certificates hint — a static display that orients the admin to where the course sits academically, with no editing.

**Why this priority**: It rounds out the "academically complete" feel, but since no curriculum engine is reference-backed, it is deliberately the lightest, lowest-priority surface and lives inside the course profile rather than as its own page.

**Independent Test**: On the course profile Learning Path tab, confirm a labeled level ladder + per-level fixture counts + a certificates hint render statically, with an explicit "display-only / not a curriculum engine" framing and no editing controls that imply persistence.

**Acceptance Scenarios**:

1. **Given** the Learning Path section, **When** rendered, **Then** levels appear as labeled chips/steps (icon+text, never numeric/color-only), in order, with fixture counts.
2. **Given** the Learning Path section, **When** the admin looks for actions, **Then** any "manage curriculum" affordance is disabled-with-reason or absent — no real curriculum mutation is implied.

---

### User Story 6 - Admin performs demo course/group actions (Priority: P2)

An admin triggers course/group actions — add course, edit course, add group, edit group, assign teacher, add students to a group, remove a student, open timetable, view attendance, print/export summary — and always receives honest feedback: a demo toast, a confirmation modal then a demo toast, or a disabled control with a visible reason. Nothing is ever a dead control and nothing mutates real data.

**Why this priority**: Action honesty is mandatory for the whole app; it is P2 because the directories/profiles (P1) must exist first to host the actions.

**Independent Test**: Trigger each action; confirm a demo toast / confirm→toast / disabled-with-reason; confirm no row, roster, schedule, or status actually changes and no network/persistence occurs.

**Acceptance Scenarios**:

1. **Given** an "Add group" / "Add course" button, **When** clicked, **Then** it shows a demo toast (or a confirm→demo toast for destructive ones like "Remove student"), never a real save.
2. **Given** an action that needs a real engine (e.g. real enrollment, real assignment, real export), **When** clicked, **Then** it is disabled with a visible reason (e.g. "requires the backend, out of current scope").

---

### User Story 7 - Admin connects courses/groups to the timetable (Priority: P2)

From a course or group context, the admin moves to the schedule/timetable: the Timetable tab reuses the shared agenda and a "View in schedule" deep-link to `schedule.html#view=timetable`.

**Why this priority**: Reuses Spec 003 with no new engine; it makes the cohort's schedule reachable without leaving the academic context.

**Independent Test**: On a course/group Timetable tab, confirm the agenda renders the cohort's sessions and the deep-link navigates to the timetable view.

**Acceptance Scenarios**:

1. **Given** a group Timetable tab, **When** rendered, **Then** it shows the group's weekly sessions via `scheduleAgenda` and a "View in schedule" link to `schedule.html#view=timetable`.

---

### User Story 8 - Admin connects courses/groups to attendance/outcomes (Priority: P2)

From a course or group context, the admin moves to attendance/outcome review: the Outcomes / Sessions tab reuses the Spec 005 outcome rows and the canonical outcome drawer, plus a "View attendance" deep-link to `attendance.html`.

**Why this priority**: Reuses Spec 005; closes the loop from "who is in this cohort" to "how are they doing", which is the academic-completeness payoff.

**Independent Test**: On a course/group Outcomes tab, confirm outcome rows render with labeled outcome chips, opening one uses the canonical drawer, and the deep-link navigates to attendance.

**Acceptance Scenarios**:

1. **Given** a group Sessions & Outcomes tab, **When** the admin opens a session, **Then** the canonical Spec 005 outcome drawer opens (no bespoke drawer) and a "View attendance" link navigates to `attendance.html`.

---

### User Story 9 - Student & family profiles connect to course/group context (Priority: P2)

The student profile's Courses tab links each enrollment to its **course** profile and, where the enrollment has a group, to its **group** profile. The family profile gains a calm fixture children's course/group summary with deep-links. No new tabs, no portals.

**Why this priority**: Light, fixture-only integration that completes the two-way navigation (student ↔ course/group) without duplicating Spec 004.

**Independent Test**: On `student.html` Courses tab, confirm enrollment cards link to `course.html` and a group chip links to `group.html`; on `family.html`, confirm a children course/group hint + deep-link.

**Acceptance Scenarios**:

1. **Given** the student Courses tab, **When** rendered, **Then** each enrollment links to its course profile and its group chip (when present) links to its group profile.
2. **Given** the family profile, **When** rendered, **Then** a calm fixture course/group summary + deep-link appears with no finance/enrollment-engine claim and no new portal.

---

### User Story 10 - Dashboard reflects courses/groups minimally (Priority: P2)

The dashboard surfaces only useful fixture-backed course/group signals — e.g. one "groups needing attention" chip and/or an "active courses" quick-link — folded into existing cards/quick-links, deep-linking to Groups/Courses. No new stat wall, no unbacked analytics.

**Why this priority**: Keeps the dashboard connected without inflating it; mirrors the minimal-impact pattern of Specs 003–005.

**Independent Test**: On the dashboard, confirm at most one fixture-backed course/group chip + a deep-link folded into an existing card; confirm no new standalone stat widgets and no fabricated metrics.

**Acceptance Scenarios**:

1. **Given** the dashboard, **When** rendered, **Then** a single fixture "groups needing attention" chip (from the attention flags) links to `groups.html`, with no new stat wall.

---

### User Story 11 - Experience stays static / Django-ready (Priority: P1)

Course/group lists, profiles, tabs, drawers, and demo actions are complete baked HTML at build time; runtime JS only switches tabs, filters pre-rendered cards/rows, opens drawers/modals, and shows demo/disabled feedback. The surface deploys to GitHub Pages and maps cleanly to Django templates.

**Why this priority**: A hard architectural constraint inherited from Specs 001–005; a violation breaks the whole project, so it is P1 and verified.

**Independent Test**: Build; View Source on `courses.html`, `course.html`, `groups.html`, `group.html` (+ `.en`) — full shell + cards/rows + all tab panels + all drawer templates are present, no `#app`, relative `./assets/` paths, no external requests.

**Acceptance Scenarios**:

1. **Given** any new page, **When** viewing source, **Then** the cards/rows, every tab panel, and every drawer `<template>` are baked, with no whole-page `#app` mount and relative asset paths.
2. **Given** the runtime JS, **When** it executes, **Then** it constructs no page DOM — it only enhances existing markup via `data-*` hooks.

---

### User Story 12 - Visual / reference alignment (Priority: P1)

The courses/groups/learning-path surfaces look premium, calm, academy-specific, and visually consistent with Specs 001–005 in Arabic-RTL (default), English-LTR, and Light/Dark/System — better and cleaner than the legacy reference, never a generic catalogue or class spreadsheet.

**Why this priority**: Screenshot-based visual acceptance is the project's final gate.

**Independent Test**: Capture the screenshot matrix and review each frame against the approved Spec 001–005 direction + the legacy screens (product reference only); confirm no failure condition (generic catalogue/spreadsheet, missing relationships, dead actions, poor dark mode, broken RTL/LTR, legacy copy, raw i18n keys).

**Acceptance Scenarios**:

1. **Given** the captured frames, **When** reviewed, **Then** Courses/Groups/profiles read as premium academy academic operations (relationships visible, labeled statuses, calm density) in AR light/dark + EN, with correct RTL/LTR and strong dark mode.

---

### Edge Cases

- **A course with zero groups or zero enrolled students** (e.g. a `draft` course): the profile shows a calm "no groups yet" / "no students yet" empty state, distinct from a "no filter match" state — never a blank table.
- **A group that is `full`**: the status is labeled "full" (icon+text); adding a student is a demo/disabled action, never a real capacity mutation.
- **A group `trial`/forming cohort**: distinguished by a labeled status, not by color alone.
- **A student enrolled in a course but not in any group** (1:1 enrollment, the legacy default): the student Courses tab links to the course profile with no group chip — no dead "group" link.
- **A course/group whose teacher is unavailable or whose sessions were cancelled**: the attention/outcome hint reflects fixture flags only (e.g. recent absences), with no fabricated metric.
- **Filtering to an empty result** on Courses or Groups: a no-results panel with a reset, distinct from the empty-data state.
- **Learning Path with no certificates in fixtures**: shows the level ladder with a calm "no certificates yet" hint, not a broken/raw state.
- **Deep-linked profile templates** (`course.html`/`group.html`) represent one baked example each (Django later → `course/<id>`, `group/<id>`); they must highlight the correct parent nav category and never appear as their own nav items.

---

## Requirements *(mandatory)*

### Functional Requirements — Courses page (US1)

- **FR-001**: The system MUST enrich the existing `courses.html` cards with the academic counts **active students**, **groups**, and **assigned teachers**, plus an upcoming-sessions hint, and a labeled status chip — reusing the existing card-grid/filter/no-results pattern (no new table library).
- **FR-002**: Each course card MUST link to that course's baked profile page (`course.html`) and MUST carry a fixture-backed attention/outcome hint only where the fixtures support it (no fabricated metric).
- **FR-003**: The Courses page MUST support search + filters for **subject**, **level**, and **status**, with a visible result count and a no-results/reset state.

### Functional Requirements — Course profile (US3, US5)

- **FR-004**: The system MUST provide a baked **Course profile** page (`course.html` + `course.en.html`) as a profile template (not a nav item), highlighting the **Courses** nav item, composed of a profile banner + baked tabs.
- **FR-005**: The Course profile MUST include the tabs **Overview, Groups, Students, Teachers, Timetable, Outcomes, Learning Path, Notes**, with exactly one panel visible at a time and all panels baked into static HTML.
- **FR-006**: The Groups tab MUST list the cohorts delivering the course (each linking to `group.html`); the Students tab MUST list enrolled students (each linking to `student.html`); the Teachers tab MUST list assigned teachers.
- **FR-007**: The Timetable tab MUST reuse the Spec 003 `scheduleAgenda` + a `schedule.html#view=timetable` deep-link; the Outcomes tab MUST reuse the Spec 005 outcome rows + the **canonical** outcome drawer + an `attendance.html` deep-link — no duplicated builders.
- **FR-008**: The **Learning Path** section MUST be a display-only labeled level ladder (`foundation → l1 → l2 → l3 → advanced`) with fixture per-level counts + a certificates hint, with NO curriculum-management engine and NO control implying real persistence.

### Functional Requirements — Groups page (US2)

- **FR-009**: The system MUST add a baked **Groups directory** page (`groups.html` + `groups.en.html`) by **promoting the existing planned `groups` nav item** to implemented (`route:'groups.html'`) in its current category, with the correct active state and no dead links; all other planned items stay planned.
- **FR-010**: The Groups directory MUST present each group as a list/card hybrid showing the group name, a **course** link, the **teacher**, the **level**, a **schedule summary** (days · time), a **students count**, a labeled **group-status** chip, and a fixture attention/outcome hint; and MUST link each group to its profile (`group.html`).
- **FR-011**: The Groups directory MUST support filters for **course, teacher, level, day, status, and attention**, with a visible result count and a no-results/reset state.

### Functional Requirements — Group profile (US4)

- **FR-012**: The system MUST provide a baked **Group profile** page (`group.html` + `group.en.html`) as a profile template (not a nav item), highlighting the **Groups** nav item, composed of a profile banner (group name + course chip-link + teacher + level + labeled status + students count + demo actions) + baked tabs.
- **FR-013**: The Group profile MUST include the tabs **Overview, Students, Timetable, Sessions & Outcomes, Teacher, Course, Notes**, with exactly one panel visible and all baked.
- **FR-014**: The Students tab MUST list the cohort roster (each row linking to `student.html`, with a family chip linking to `family.html`); the Course tab MUST link to `course.html`.
- **FR-015**: The Timetable tab MUST reuse `scheduleAgenda` + the schedule deep-link; the Sessions & Outcomes tab MUST reuse the Spec 005 outcome rows + the canonical outcome drawer + the attendance deep-link.

### Functional Requirements — Status vocabularies (US1, US2, US5)

- **FR-016**: The system MUST define a **course status** vocabulary (extend the existing `active/draft/archived` with `paused`) as a labeled map (icon + text, never numeric/color-only), Arabic/English localized.
- **FR-017**: The system MUST define a NEW **group status** vocabulary — `active / trial / full / paused / completed` — plus a **needs-attention flag** (a separate flag, not a status, mirroring the Spec 005 `needsFollowUp` flag pattern), as a labeled map distinct from the session-status, family-lifecycle, and outcome maps; never numeric/color-only.
- **FR-018**: The **learning-path levels** MUST be rendered as a labeled, ordered ladder reusing the existing level vocabulary (`foundation/l1/l2/l3/advanced`) — display-only, not a status lifecycle.

### Functional Requirements — Actions (US6)

- **FR-019**: Every course/group action (add/edit course, add/edit group, assign teacher, add/remove students, open timetable, view attendance, print/export summary) MUST be honest: a **demo toast**, a **confirmation modal → demo toast** (for destructive ones), or **disabled-with-reason** — reusing the existing `data-demo-action` / `data-confirm` / `data-disabled-reason` hooks.
- **FR-020**: No action MAY perform a real save, create, enroll, assign, remove, schedule, mutate attendance, notify, or touch finance; there MUST be no dead controls.

### Functional Requirements — Integrations (US7, US8, US9, US10)

- **FR-021**: The student profile Courses tab MUST link each enrollment to its **course** profile and each enrollment's group (when present) to its **group** profile (no new tab, no portal).
- **FR-022**: The family profile MUST gain a calm fixture children's course/group summary + a deep-link (no finance/enrollment-engine claim, no portal).
- **FR-023**: The dashboard MUST surface at most one fixture-backed course/group signal (e.g. a "groups needing attention" chip) folded into an existing card/quick-link with a deep-link to Groups/Courses — no new stat wall, no fabricated analytics.

### Functional Requirements — Data, static architecture, i18n (US11, US12)

- **FR-024**: The system MUST add fixture data: a **Groups** fixture (`id, nameKey, courseId, teacherId, studentIds[], scheduleBlockIds[], levelKey, statusId, attention?, scheduleSummary, notesKey`) that resolves `courseId`→courses, `teacherId`→teachers, `studentIds`→students, `scheduleBlockIds`→schedule, and outcomes→Spec 005 — plus extensions to the course fixture for `groupIds`/`teacherIds`/`levels`; fixtures only, every reference resolves.
- **FR-025**: All new lists, cards, profile tabs, group/course rows, drawers, modals, confirmations, and demo actions MUST be **baked static HTML** at build time; runtime JS MUST only switch tabs, filter pre-rendered cards/rows, open drawers/modals, and show demo/disabled feedback — it MUST construct no page DOM and there MUST be no whole-page `#app` mount.
- **FR-026**: All pages MUST be GitHub-Pages compatible (relative, local asset paths; no CDN), per-language pre-rendered (`*.html` Arabic default + `*.en.html` English), RTL/LTR correct, Light/Dark/System, and Django-template-ready (`{% for course/group/student %}`, tabs → `{% if %}`, the canonical drawer → one shared partial, status maps → template tags).
- **FR-027**: No new dependencies; NO chart/table/form/calendar/SPA library, no TypeScript, no CDN, no backend/API/auth/CRUD/persistence; no real course/group/enrollment/assignment/curriculum/certificate engine; no portals/role dashboards; no legacy numeric statuses or copied legacy assets/classes/palette/wording.
- **FR-028**: The surface MUST pass the project gates: build clean (no raw i18n keys), smoke (baked cards/rows/tabs/drawers, tile/filter behavior, real `<a>` nav links, no dead controls, no `#app`), axe critical=0, and the screenshot matrix reviewed against the approved direction.

### Key Entities *(fixture-only; no persistence)*

- **Course (subject offering)**: a subject the academy runs — `id`, subject, title, level, labeled status (active/draft/paused/archived), counts (enrolled students, groups, teachers, sessions), `levels[]` ladder, notes. *Not* a 1:1 enrollment (that lives on the student).
- **Group (cohort/class)**: one teacher + many students delivering a course on a shared schedule — `id`, name, `courseId`, `teacherId`, `studentIds[]`, `scheduleBlockIds[]`, level, labeled status (active/trial/full/paused/completed) + attention flag, schedule summary, notes.
- **Course/Group status maps**: labeled vocabularies (icon+text), distinct from the session-status, family-lifecycle, and outcome maps.
- **Learning Path (display-only)**: the academy level ladder (`foundation → l1 → l2 → l3 → advanced`) with fixture per-level counts + a certificates hint — no curriculum engine.
- **Enrollment (reused, Spec 004)**: a student's participation in a course (optionally within a group) — already owned by the student fixture; Spec 006 only *links* it to course/group profiles.
- **Course/Group profile**: a baked tabbed profile template (banner + tabs), reusing `profile-banner` + `tabs`.
- **Dashboard course/group signal (minimal)**: one fixture-backed attention chip + a deep-link.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: From the dashboard, an admin can reach any course's groups, students, teacher, timetable, and recent outcomes in **≤ 3 clicks**, and from any group reach its course, roster, schedule, and outcomes in **≤ 2 clicks**.
- **SC-002**: **100%** of course and group statuses are shown as labeled chips (icon + text); **zero** numeric-only or color-only status indicators across the new surfaces.
- **SC-003**: **100%** of course/group/student/teacher/family/schedule/attendance links resolve to a real in-scope baked page or the canonical drawer — **zero** dead links or dead controls.
- **SC-004**: **Every** course/group action produces visible honest feedback (demo toast / confirm→toast / disabled-with-reason); **zero** actions mutate data or perform a real save.
- **SC-005**: The Groups directory and both profiles are **fully baked** static HTML — viewing source shows all cards/rows, all tab panels, and all drawer templates with **no** `#app` mount and **only** relative asset paths; the pages render correctly opened directly from the filesystem / GitHub Pages.
- **SC-006**: Course/group filters narrow results with a visible count and a distinct no-results vs no-data state in **100%** of filter combinations tested.
- **SC-007**: Accessibility: axe reports **critical = 0** across the new pages in AR (light + dark) and EN; RTL and LTR both render without overflow on desktop, tablet, and mobile.
- **SC-008**: Visual acceptance: **every** screenshot-matrix frame is reviewed and passes against the Spec 001–005 approved direction with **no** failure condition (generic catalogue/spreadsheet, missing relationships, dead actions, poor dark mode, broken RTL/LTR, copied legacy visuals, raw i18n keys).
- **SC-009**: The canonical Spec 005 outcome drawer and the Spec 003 schedule agenda are **reused unchanged** on the course/group surfaces — **zero** new bespoke outcome-drawer or timetable builders are introduced.

---

## Assumptions

- **Course = subject offering, not a 1:1 enrollment.** Spec 006 keeps the app's existing improved framing (`courses.html` = catalogue); the legacy "course = enrollment" is represented by the Spec 004 student `enrollments[]`, which Spec 006 only links — it does not rebuild it.
- **Group is the genuine new surface.** Both `groups.html` (directory) and `group.html` (profile) are accepted into scope, because the legacy Group feature was skeletal and the cohort concept is the headline academic depth. `groups` is promoted from its existing planned nav item (NI12 pattern); `course.html`/`group.html` are profile templates, not nav items.
- **Learning Paths are display-only.** No curriculum/level/unit/module/milestone engine is reference-backed, so the Learning Path is a calm static level-ladder section inside the Course profile — not its own page, not editable. ("Group → attendance/outcomes" and "course → timetable" ARE reference-backed and are reused from Specs 003/005.)
- **Reuse over rebuild.** Directories reuse `cardGrid`/`directoryCard`/`filterBar`/`noResults`; profiles reuse `profileBanner`/`tabs`; timetable reuses `scheduleAgenda` + the schedule deep-link; sessions/outcomes reuse the Spec 005 `outcomeRow`/`outcomeTemplate` (canonical drawer) + the attendance deep-link; statuses reuse `status-chip`/`family-status`/`outcome-status` and add only the new **group-status** map (and extend course-status with `paused`).
- **One representative course and one representative group are baked** (`course.html`, `group.html`) as Django-ready templates (`course/<id>`, `group/<id>` later), each highlighting the correct parent nav category.
- **Fixtures only.** Counts, rosters, schedules, and outcomes come from fixtures resolving to the existing students/families/teachers/schedule/attendance data; no analytics, finance, certificate, or performance metrics are fabricated.
- **No commit/push and no implementation in this phase** — this command produces the spec only. The single-branch convention is preserved (the `before_specify` git branch/commit hook is intentionally not triggered).
- **Scope is sequenced MVP-first**: US1 (Courses enrich) + US2 (Groups directory) + US4 (Group profile) form the demoable MVP; US3 (Course profile) + US5 (Learning Path) + US6–US10 (actions, integrations, dashboard) are independent increments; US11/US12 (static/Django + visual) are the cross-cutting acceptance gates.

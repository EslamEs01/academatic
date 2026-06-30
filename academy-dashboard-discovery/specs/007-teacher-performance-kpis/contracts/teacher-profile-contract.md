# Contract: Teacher Profile Page

**Status**: Binding · `public/teacher.html` (+ `.en`). The teacher academic hub — a profile **banner** + **baked tabs** (Overview / Courses / Groups / Timetable / Sessions & Outcomes / Students / Follow-up / Notes) over the shared `tabs` widget. A registered SSG page reached via "View profile" links; **NOT** a nav item. Active nav: `teachers`. References FR-004 / FR-005 / FR-006 / FR-007 / FR-008 / FR-016 / FR-019 / FR-020 / FR-021; data-model §12 (TeacherProfile), §6–§11 (links), §14 (Follow-up), §15 (actions).

---

## 1. Purpose & reuse

Give the admin a calm, relationship-visible hub for one **teacher** — the banner orienting to status/availability/workload + KPIs, the tabs distributing the teacher's academic graph (courses, cohorts, schedule, outcomes, students, follow-up) into progressive disclosure. It MUST read as the same product as Specs 001–006 and MUST replace the legacy reality (a 56-button, finance-mixed teacher profile with no calm academic hub) with a focused, academically-complete, **admin-facing** page. It composes **existing** components only — `profileBanner`, the shared `tabs` widget, `chip`/`medallion`/`avatar`/`statMini`, `scheduleAgenda` (Spec 003) + the Spec 006 `cohort-panels` (`cohortTimetablePanel`/`cohortOutcomesPanel`/`cohortTemplates`), `outcomeRow`/`outcomeTemplate` (Spec 005 canonical drawer), `states`, `sheetRow`. **No new tab engine, no new outcome drawer, no new timetable grid, no portal.** Behavior is `enhance.js` over baked markup via `data-*` hooks only (SC-009).

## 2. Page registration & active state (NOT a nav item, NOT a portal)

- `teacher.html` is a **registered SSG page** (`PAGES` entry `{ base:'teacher', activeId:'teachers', titleKey:'topbar.title.teacher', crumbKey:'topbar.crumb.teacher', render }`) rendering **one representative `Teacher` fixture** (`sara` — the richest: course `c1`, group `grp1`, schedule blocks, outcomes) as the baked template. It is **NOT** added to `NAV_CATEGORIES`.
- Its `activeId:'teachers'` keeps the **Teachers** nav item active (violet pill + `aria-current="page"`) and opens the teachers category panel — exactly like `course.html` → `activeId:'courses'`.
- It is reached only via a **"View profile"** real `<a href="./teacher.html">` from a teacher card (`teachers.html`) or a comparison row (`teacher-performance.html`) — language-aware (`teacher.en.html`). Django later maps the one template to `teacher/<id>`.
- The page MUST NOT render any teacher/student/family **portal or dashboard**, any "my classes / my students / login as / role-switcher" framing, or any **salary/compensation** tab (those stay out / `future-role`).

## 3. Profile banner (`profileBanner`)

In a calm header band (NOT a stat wall), via the existing `profileBanner`:

- **Identity** — a `medallion` in the teacher `accent` + the teacher `nameKey` as `<h1 class="pb-name">` + the **teacher-status chip** (`teacherStatusChip(statusId)`; icon+label, never numeric/color-only) + a breadcrumb `<a href="./teachers.html">` back to «المعلّمون»/«Teachers».
- **Meta row** — subject chip(s) + the **availability** chip (`TEACHER_AVAIL`, reused) + the **workload** chip (`workloadChip(workload)`). Display-only.
- **KPIs** — at most four `statMini` facts: **courses** (`trn.kpi.courses`), **groups** (`trn.kpi.groups`), **active students** (`trn.kpi.students`), **upcoming sessions** (`trn.kpi.upcoming`). All fixture counts; **display-only, never finance, never a score**.
- **Actions row** — edit / message / notify-family / open-timetable / view-attendance / (assign disabled) — each honest per `teacher-actions-contract.md`.

Long teacher names truncate/wrap gracefully in AR-RTL and EN-LTR.

## 4. Tabbed sections (shared `tabs` widget — baked, JS toggles visibility only)

- Uses the shared `tabs` widget (`data-tabs="teacher-profile"`): a `role="tablist"` of `role="tab"` controls (each `data-tab="<id>"`, `aria-controls`, `aria-selected`) + a baked `role="tabpanel"` (`data-tabpanel="<id>"`, `hidden` on all but the first) **per** tab. Tabs, in order: **Overview · Courses · Groups · Timetable · Sessions & Outcomes · Students · Follow-up · Notes** (8 tabs, FR-005).
- **All eight panels MUST be pre-rendered complete static HTML.** `enhance.js` only toggles visibility — it MUST NOT render/build/fetch panel content. Selection persists in `localStorage['academy.schedView.teacher']` + URL hash `#view=<tab>` (hash wins, else storage, else **Overview**). Roving-tabindex keyboard nav. JS off → all panels reachable as sections.
- **Exactly one panel** visible at load (Overview). Smoke asserts exactly one visible.

## 5. Overview tab (`data-tabpanel="overview"`)

- **Snapshot** — a `sheetRow` quick-facts list: subject(s) · status chip · availability · workload · courses/groups/students counts · upcoming/completed session counts. Display-only, tabular numerals.
- **Absence summary (labeled, distinct)** — two **distinct** labeled facts: **teacher absences** (`teacherAbsentCount`) and **student absences in this teacher's sessions** (`studentAbsentCount`), plus cancelled/rescheduled — each with the Spec 005 outcome chip vocabulary, **never** collapsed into one "absences" number.
- **Follow-up hint** (conditional) — when `followUp ∈ {needsFollowUp, attentionRisk}`: `signalChip(followUp)` + a one-line reason. Icon+label, never color-only.
- **Cross-links** — a calm row: «عرض الجدول» → `schedule.html#view=timetable`, «عرض الحضور» → `attendance.html`. Real `<a href>`, not demo buttons.

## 6. Courses tab (`data-tabpanel="courses"`)

Lists courses the teacher delivers (`COURSES.rows.filter(c => c.teacherIds.includes(id))`) as calm course rows/cards — each: title + subject/level chip + labeled `course-status` chip + a **"View course"** real `<a href="./course.html">`. **Empty state** ("no courses assigned yet") never blank. No assignment engine (assign-course is disabled-with-reason in the banner actions).

## 7. Groups tab (`data-tabpanel="groups"`)

Lists the teacher's cohort(s) (`groupsOfTeacher(id)`) as group cards — each: name + level chip + schedule summary + `enrolledCount/capacity` + labeled `group-status` chip + a **"View group"** real `<a href="./group.html">`. **Empty state** — for a teacher with **no group** (e.g. `abdullah`): a calm "no groups yet" (no dead `group.html` link). No cohort engine.

## 8. Timetable tab (`data-tabpanel="timetable"`)

Reuses the Spec 003 **`scheduleAgenda`** via `cohortTimetablePanel` — the teacher's weekly blocks (resolved by `trainer.id`) as baked `data-agenda` rows, each opening the **shared `appointmentTemplate`** drawer (`data-drawer="<blockId>"` over a baked `<template>`). A language-aware **"View in schedule"** deep-link → `schedule.html#view=timetable`. **Empty state** — zero blocks (e.g. `huda`): "no recent sessions". **No new grid builder** (SC-009). Detail in `teacher-timetable-contract.md`.

## 9. Sessions & Outcomes tab (`data-tabpanel="sessions-outcomes"`)

Reuses the Spec 005 **`outcomeRow`** via `cohortOutcomesPanel` — the teacher's outcomes (`outcomesOfTeacher(id)`) as baked rows with **labeled outcome chips** where **teacherAbsent and studentAbsent are visibly distinct**, each opening the **canonical `outcomeTemplate` drawer** (`data-drawer="<outcomeId>"`). A language-aware **"View attendance"** deep-link → `attendance.html`. **Empty state** — "no outcomes yet". **No bespoke drawer** (SC-009). Detail in `teacher-outcomes-contract.md`.

## 10. Students tab (`data-tabpanel="students"`)

Lists the union of the teacher's groups' rosters as calm student rows — each: avatar + name + level mini + a **"View student"** real `<a href="./student.html">` + a **family chip-link** → `family.html` (when the family resolves). **Empty state** — "no students yet". No portal. Detail in `student-family-impact-contract.md`.

## 11. Follow-up tab (`data-tabpanel="follow-up"`)

A calm fixture follow-up list — the teacher's needs-follow-up outcomes / group-needing-attention items (data-model §14) — each with a labeled chip + context (group/student/family) + deep-links + an honest action (`add-follow-up-note` → demo toast). **Empty state** — "nothing needs follow-up". **No follow-up engine, no persistence.**

## 12. Notes tab (`data-tabpanel="notes"`)

A calm free-text display of `notesKey` + a timestamp placeholder. **Empty state** — "no notes yet" + a demo "+ add note" (`data-demo-action` → toast). Display-only.

## 13. Profile actions (demo / link / confirm / disabled)

All honest (FR-014/FR-015); no action persists. Full catalogue in `teacher-actions-contract.md`; the banner MUST include: **Edit** (`data-demo-action` → toast), **Message teacher** (`data-demo-action` → toast), **Notify family** (`data-confirm` → demo toast), **Open timetable** (real `<a>` → `schedule.html#view=timetable`), **View attendance** (real `<a>` → `attendance.html`), **Assign course / Assign group** (`data-disabled-reason` + `data-reason-key="trn.reason.assign"`), **Print/export summary** (`data-disabled-reason` + `data-reason-key="trn.reason.export"`). **No salary/deactivate/login-as action.** Every button satisfies action-honesty; no raw key; no dead control.

## 14. States & responsive

- Each tab shows its **own** calm empty state — never a blank region. Page-level loading/error reuse the Spec 001 `states`.
- **Responsive**: the banner stacks at mobile; the tablist scrolls/stacks (no overflow); all course/group/student/session/outcome lists stack to single column; the shared drawers are full-height on mobile.

## 15. `data-*` hooks (exact, reuse only — no new hook)

`data-tabs="teacher-profile"`, `data-tab="overview|courses|groups|timetable|sessions-outcomes|students|follow-up|notes"`, `data-tabpanel="<same>"`, `data-view`; `data-agenda` + per session row `data-row`; `data-drawer="<id>"`/`data-preview="<id>"`/`data-sheet-close`; per outcome row `data-drawer="<outcomeId>"`; actions via `data-demo-action`/`data-toast`/`data-confirm` (+`-title|-msg|-cta|-toast|-danger`)/`data-disabled-reason`/`data-reason-key`. "View course/group/student" (→ `course/group/student.html`), family chip (→ `family.html`), "View in schedule" (→ `schedule.html#view=timetable`), "View attendance" (→ `attendance.html`), breadcrumb (→ `teachers.html`) are real `<a href>`. **No JS-generated ids/classes. No new `data-*` hook.**

## 16. Static-HTML-first & Django mapping

- `teacher.html` MUST be a **complete pre-rendered** static file — full shell + banner + **all eight** baked tab panels + every schedule-row + every `<template data-preview>` (appointment + outcome drawers) baked. **No `<div id="app">`**, no JS-built page DOM. Relative `./assets/`; per-language pages; `.nojekyll`; zero external/CDN requests; no chart/table/form/calendar library.
- **Django**: `public/teacher.html` → `templates/admin/teacher.html` at `teacher/<id>`; tabs → static sections (`{% if view == 'courses' %}` etc., default Overview); Courses → `{% for course in teacher.courses %}`; Groups → `{% for group in teacher.groups %}`; Timetable → `{% for block in teacher.schedule %}` + `_appointment_details.html`; Sessions & Outcomes → `{% for o in teacher.outcomes %}` + `_outcome_details.html`; Students → `{% for s in teacher.students %}`; status/workload/follow-up → template tags. No `#app`.

## 17. Enforcement & cross-references

- **Smoke**: `teacher` is in `PAGES` with `activeId:'teachers'`; the profile tablist has **8 tabs** with **exactly one** visible panel; the Courses tab links to `course.html`, Groups → `group.html`, Students → `student.html` (family chip → `family.html`); the Timetable tab has `data-agenda` + a real `<a href>` to `schedule.html#view=timetable`; the Sessions & Outcomes tab has `.outcome-row` + `data-drawer` + a real `<a href>` to `attendance.html`, with **teacherAbsent and studentAbsent both present and distinct**; the banner shows a teacher-status chip (icon+text); **no salary tab, no portal markup, no computed score**; no dead actions; no `id="app"`; relative assets; axe critical = 0.
- **Screenshots**: frames #4, #6, #7, #8, #9, #12 (profile + timetable + outcomes + confirm + students + mobile) — verdicts in `app/screenshots/REVIEW.md`.
- Binds to `teachers-page-contract.md` (the "View profile" origin), `teacher-performance-contract.md` (the comparison-row origin), `teacher-timetable-contract.md` + `teacher-outcomes-contract.md` (the reused Timetable/Outcomes tabs), `teacher-actions-contract.md`, `student-family-impact-contract.md`, the Spec 003 `appointment-details` + Spec 005 `outcome-details` (the reused drawers), and the Spec 006 `../../006-courses-groups-learning-paths/contracts/course-profile-contract.md` (the profile-template precedent).
- MUST NOT: introduce a teacher portal/dashboard, a salary/compensation tab, an assignment/notification engine, a bespoke outcome drawer or timetable grid, a numeric/color-only status chip, a computed score/rank, or any `data-*` hook not in §15; dead-link to any non-baked page.

**Acceptance (binding):**
1. **Given** the teacher profile, **When** loaded, **Then** the banner shows a labeled status chip + workload + KPIs, and exactly one baked tab panel is visible.
2. **Given** the Sessions & Outcomes tab, **When** a session opens, **Then** the SAME canonical Spec 005 outcome drawer opens, and **teacherAbsent rows are visibly distinct from studentAbsent rows**.
3. **Given** the Courses/Groups/Students tabs, **When** an item is clicked, **Then** it navigates to `course.html`/`group.html`/`student.html` (family chip → `family.html`) — no dead link, no portal, no salary tab.

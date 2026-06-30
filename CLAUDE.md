<!-- SPECKIT START -->
Active feature: **Spec 006 — Courses, Groups and Learning Paths Deep Experience**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/006-courses-groups-learning-paths/plan.md`
(see also `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`).

Spec 006 EXTENDS the implemented Spec 001/002/003/004/005 app (`academy-dashboard-discovery/app/`)
with the admin **Courses, Groups & Learning Paths** experience — making the academy "academically
complete" by unifying the course↔group↔student↔family↔teacher↔schedule↔attendance graph the legacy
system scattered/dead-ended, calmer/cleaner and Arabic-RTL-first. Grounding decision: a **Course =
a subject offering** (the app's improved framing; the legacy "course = enrollment" lives on the
Spec 004 student `enrollments[]`), a **Group = a cohort/class** (one teacher + many students + a
shared schedule delivering a course — the genuine new depth), and **Learning Paths are display-only**
(NO curriculum engine is reference-backed). Surfaces: **ENRICH** `courses.html` (counts active-students/
groups/teachers + a course-profile link); add **`course.html`** profile (banner + baked tabs Overview/
Groups/Students/Teachers/Timetable/Outcomes/Learning-Path/Notes); **promote `groups` planned→implemented**
(NI12) and add **`groups.html`** directory (filter bar course/teacher/level/day/status/attention +
optional `data-filter-set` tiles + a `.group-row` list/card hybrid); add **`group.html`** profile
(banner + tabs Overview/Students/Timetable/Sessions&Outcomes/Teacher/Course/Notes). `course.html`/
`group.html` are **profile templates** (activeId `courses`/`groups`, NOT nav items). NEW labeled
**group-status** map (`group-status.js`: active/trial/full/paused/completed + a `needsAttention` flag),
**EXTENDED** course-status (+`paused`), and a relocated **enrollment-status** (active/paused/completed) —
three DISTINCT labeled maps, never numeric/color-only. NEW fixture `groups.js` (`GROUPS` resolving
`courseId`→courses + `teacherId`→teachers + `studentIds`→students + `scheduleBlockIds`→schedule +
`outcomeIds`→Spec 005 outcomes) + EXTENDED `courses.js` (groupIds/teacherIds/levels/counts/attention).
**REUSE, never duplicate**: Spec 003 `scheduleAgenda` (+`schedule.html#view=timetable`) for the Timetable
tabs; Spec 005 `outcomeRow`/`outcomeTemplate` (the canonical drawer, +`attendance.html`) for the
Outcomes tabs — NO new outcome-drawer/timetable/filter engine. Light fixture-only integration: Student
Courses-tab links to course/group, Family Overview gets ONE courses/groups hint, Dashboard gets ONE
"groups needing attention" chip folded into the people-signal card. **Learning Path** = a display-only
level ladder (foundation→l1→l2→l3→advanced + counts + certificates hint) inside `course.html`. Prior
plans: `…/005-attendance-session-outcomes/plan.md`, `…/004-family-student-profiles/plan.md`,
`…/003-timetable-scheduling/plan.md`, `…/002-admin-core-operations/plan.md`,
`…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Spec 001 + 002 + 003 + 004 + 005 + 006): continue the approved design (Spec 001 is the
visual target); **static HTML-first** — pages pre-rendered to complete `public/*.html`, NO
whole-page `<div id="app">` mount, **all course/group cards + profile tabs + `<template data-preview>`
drawers are baked at build time** (runtime JS builds no page DOM), runtime JS enhances existing markup
only via `data-*` hooks (switch profile tabs, filter pre-rendered cards/rows, tile→`data-filter-set`,
open drawer/confirm, toasts/disabled-reason, fake-submit demo — NO new hook); per-language pre-rendered
pages; relative asset paths; GitHub-Pages compatible; Django-template-ready (`{% for course/group/student %}`,
tabs → `{% if %}`, canonical drawer → ONE partial, status maps → template tags); Arabic RTL first +
English LTR; Light/Dark/System; labeled course/group/enrollment status chips (never numeric/color-only);
native JS; no CDN/TypeScript/SPA/chart libs/**table libs/form libs/calendar libs**; fixtures only — no real
API/auth/permissions/CRUD/persistence, **no course/group/enrollment/assignment/curriculum/certificate/
scheduling/attendance/finance engine**, no real status mutation/notification; **no student/family/teacher
dashboards or portals** (future-role, never rendered); the Groups DIRECTORY + PROFILE are now built
(fixture-only) but Family-Categories stays planned; no copied legacy assets/classes/logo/palette/wording,
no legacy numeric statuses; screenshot-based visual acceptance.
<!-- SPECKIT END -->

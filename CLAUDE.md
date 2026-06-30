<!-- SPECKIT START -->
Active feature: **Spec 007 — Teacher Performance and Academic KPIs**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/007-teacher-performance-kpis/plan.md`
(see also `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`).

Spec 007 EXTENDS the implemented Spec 001–006 app (`academy-dashboard-discovery/app/`) with the admin
**Teacher Performance & Academic KPIs** experience — turning the flat teacher directory into a unified
academic hub (teacher↔course↔group↔students↔family↔schedule↔outcomes↔absence↔follow-up) and giving admins
one calm board to review/compare/follow-up teacher delivery. **Grounding spine** (legacy + current-app
passes): the legacy system **NEVER** had a computed teacher score/rank/leaderboard — "performance" was
scattered **raw counts** (Teachers-Details Cancel/Absent/Attend, a single feedback %, a system-wide
Sessions-Analysis with a `teacher_id` filter but no per-teacher drill-down) + a `View KPIs` nav group with
no destination page; and the legacy 56-button teacher profile **mixed academic data with FINANCE**
(Compensations/Salary/Payouts). So Spec 007 is a **DISPLAY of fixture-backed raw counts + labeled signals
— NEVER a computed score/rank/analytics engine**, and **ALL finance (salary/payroll/compensation/payout)
is explicitly OUT of scope** (a future finance spec). Surfaces: **ENRICH** `teachers.html` (status chip +
counts courses/groups/students + upcoming hint + workload hint + conditional follow-up flag + a
profile link); add **`teacher.html`** profile (banner + baked tabs Overview/Courses/Groups/Timetable/
Sessions&Outcomes/Students/Follow-up/Notes — bake `sara`); **promote `teacherKpi` planned→implemented**
and add **`teacher-performance.html`** board (KPI tiles + a per-teacher comparison list + a follow-up
queue — display-only counts, no score/rank/chart/salary). `teacher.html` is a **profile template**
(activeId `teachers`, NOT a nav item); `teacher-performance.html` is the promoted nav page (activeId
`teacherKpi`). `sessionsKpi`/`monthlyPerf`/`addTeacher`/`teacherCategories` stay planned. THREE NEW
labeled maps: **teacher-status** (`teacher-status.js`: active/paused/inactive), **workload**
(`teacher-signals.js`: light/balanced/high), **follow-up signal** (`teacher-signals.js`:
strongDelivery/stable/needsFollowUp/attentionRisk) — distinct from the six existing maps, never
numeric/color-only; **REUSE** availability (`TEACHER_AVAIL` available/busy/off). EXTEND `fixtures/teachers.js`
(+statusId/workload/followUp/notes + derived counts — **NO finance fields**); add the only new resolver
**`outcomesOfTeacher(id)`** (`SESSION_OUTCOMES` filter by `trainer.id`) in `attendance.js`; new actions
cluster `teacherActions()` (`teacher-actions.js`). **REUSE, never duplicate**: Spec 003 `scheduleAgenda`
(+`schedule.html#view=timetable`) for Timetable tabs; Spec 005 `outcomeRow`/`outcomeTemplate` (the
canonical drawer, +`attendance.html`) for Sessions&Outcomes — **teacherAbsent vs studentAbsent stay two
DISTINCT labeled chips, never one "absences"**; Spec 006 `cohort-panels`/`profileBanner`/`tabs`,
`directoryCard`/`filterBar`/`summaryCards`. Light integration: teacher→student/family/course/group
deep-links; Dashboard gets ONE "teachers needing follow-up" chip folded into the people-signal card →
`teacher-performance.html`. New locale overlay `ar.trn.js`/`en.trn.js` (`trn.*`). Prior plans:
`…/006-courses-groups-learning-paths/plan.md`, `…/005-attendance-session-outcomes/plan.md`,
`…/004-family-student-profiles/plan.md`, `…/003-timetable-scheduling/plan.md`,
`…/002-admin-core-operations/plan.md`, `…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Spec 001 + 002 + 003 + 004 + 005 + 006 + 007): continue the approved design (Spec 001 is
the visual target); **static HTML-first** — pages pre-rendered to complete `public/*.html`, NO whole-page
`<div id="app">` mount, **all teacher cards + KPI tiles + comparison rows + profile tabs +
`<template data-preview>` drawers are baked at build time** (runtime JS builds no page DOM), runtime JS
enhances existing markup only via `data-*` hooks (switch profile tabs, filter pre-rendered cards/rows,
open drawer/confirm, toasts/disabled-reason, fake-submit demo — NO new hook); per-language pre-rendered
pages; relative asset paths; GitHub-Pages compatible; Django-template-ready (`{% for teacher %}`, tabs →
`{% if %}`, canonical drawer → ONE partial, status/signal maps → template tags); Arabic RTL first +
English LTR; Light/Dark/System; labeled teacher-status/workload/follow-up status chips (never
numeric/color-only); native JS; no CDN/TypeScript/SPA/chart libs/table libs/form libs/calendar libs;
fixtures only — no real API/auth/permissions/CRUD/persistence, **no teacher-management/assignment/
workload-calc/performance-scoring/ranking/salary-payroll/attendance/scheduling/notification engine**, no
real status mutation; **NO computed teacher score/rank/leaderboard/percentile/chart anywhere; ALL
finance (salary/payroll/compensation/payout) OUT of scope**; **no student/family/teacher dashboards or
portals** (future-role, never rendered; `teacher.html` is an ADMIN profile, not a portal); the Teacher
Performance board is now built (fixture-only) but addTeacher/teacherCategories/sessionsKpi/monthlyPerf
stay planned; no copied legacy assets/classes/logo/palette/wording, no legacy numeric statuses;
screenshot-based visual acceptance.
<!-- SPECKIT END -->

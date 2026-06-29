<!-- SPECKIT START -->
Active feature: **Spec 005 — Attendance and Session Outcomes**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/005-attendance-session-outcomes/plan.md`
(see also `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`).

Spec 005 EXTENDS the implemented Spec 001/002/003/004 app (`academy-dashboard-discovery/app/`)
with the admin **Attendance & Session Outcomes** experience — the daily post-session review
board, grounded in the academy reference (the "Classes Of {date}" outcomes board + the ONE
canonical Mark-Attend / Mark-Absent("who") / Cancel("who") / make-up-credit action family,
status-gated) but calmer/cleaner and Arabic-RTL-first. Adds ONE surface: an **Attendance /
Outcomes page** `attendance.html` (title «الحضور ونتائج الجلسات» / "Attendance & Session
Outcomes", nav «الحضور» / "Attendance") — outcome **summary tiles that double as filters** (a
tiny NEW `data-filter-set` hook over the existing `applyFilter`) + a persistent filter bar + an
airy **`.outcome-row` list/card hybrid**. A NEW labeled **OUTCOME status map** (`outcome-status.js`:
attended / studentAbsent / teacherAbsent / cancelled / rescheduled / upcoming / live + flags
makeUpSuggested / needsFollowUp — icon+label, **never numeric/color-only**) collapses the legacy
11-state + numeric codes; distinct from the session + lifecycle maps. ONE **canonical outcome
drawer** `outcome-details.js` (`outcomeTemplate` = a SUPERSET of the Spec 003 appointment drawer
via a shared `appointmentRows` helper + an outcome section: chip + who-absent/who-cancelled
attribution + present/capacity + make-up/credit **DISPLAY hint** + follow-up + a **status-gated
DEMO action cluster** attend/absent/cancel/reschedule/notify/feedback/reverse — demo / confirm→demo /
disabled-with-reason, **no mutation**). Outcome PRIMARY on Attendance; session status PRIMARY +
outcome SECONDARY on Sessions (no double-encoding). New fixture `attendance.js` `SESSION_OUTCOMES`
(reuse the session shape; resolve `studentId`→students + `familyId`→families). Light fixture-only
integration: Sessions (secondary chip + drawer + "View attendance" link), Student + Family profiles
(a recent-outcomes / follow-up hint + deep-link, NO new tab), Dashboard (ONE follow-up chip folded
into the people-signal card). Nav: promote ONE new `attendance` item (NI12) in the **control**
category; `sessionsAnalysis` + the rest stay planned. Prior plans: `…/004-family-student-profiles/plan.md`,
`…/003-timetable-scheduling/plan.md`, `…/002-admin-core-operations/plan.md`,
`…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Spec 001 + 002 + 003 + 004 + 005): continue the approved design (Spec 001 is the
visual target); **static HTML-first** — pages pre-rendered to complete `public/*.html`, NO
whole-page `<div id="app">` mount, **all family cards / profile tabs / wizard steps /
`<template data-preview>` drawers are baked at build time** (runtime JS builds no page DOM),
runtime JS enhances existing markup only via `data-*` hooks (switch profile tabs + wizard
steps, filter pre-rendered cards/rows, open drawer/confirm, toasts/disabled-reason, fake-submit
demo); per-language pre-rendered pages; relative asset paths; GitHub-Pages compatible;
Django-template-ready (`{% for family/student/child %}`, tabs/steps → `{% if %}`); Arabic RTL
first + English LTR; Light/Dark/System; labeled lifecycle status chips (never numeric/color-only);
native JS; no CDN/TypeScript/SPA/chart libs/**table libs/form libs**; fixtures only — no real
API/auth/permissions/CRUD/persistence, **no enrollment/grade/evaluation/attendance/finance
engine**; **no student/family/teacher dashboards or portals** (future-role, never rendered);
no full Groups/Family-Categories module; no copied legacy assets/classes/logo/palette/wording;
screenshot-based visual acceptance.
<!-- SPECKIT END -->

<!-- SPECKIT START -->
Active feature: **Spec 004 — Families and Student Academic Profiles**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/004-family-student-profiles/plan.md`
(see also `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`).

Spec 004 EXTENDS the implemented Spec 001/002/003 app (`academy-dashboard-discovery/app/`)
with the admin Families & Students academic experience — grounded in the family-centric
reference (**Family = the guardian/parent account; students are children nested under one
family**, linked `Family.studentIds[]` ↔ `Student.familyId`). Adds five surfaces: a **Families
directory** `families.html` (family **cards** grouping each family's children), a **Family
profile** `family.html` (baked **tabs**: Overview/Students/Schedule/Plan&Billing/Notes), an
**Add-Family wizard** `add-family.html` (a **baked multi-step stepper** — all steps static
HTML, JS toggles step visibility via data-step-next/prev, Save = demo toast, no persistence),
an enriched **Students** `students.html` (real `familyId` + family facet + profile link), and
a **Student academic profile** `student.html` (baked **tabs**: Overview/Courses/Timetable/
Results/Evaluation/Family/Notes). **Results = fixture-only** progress + certificates + summary;
**Evaluation = a fixture-only monthly progress-report rubric** (criteria + rating pills +
narrative + approve-demo) — **NOT a gradebook** (the reference has none). Timetable sections
reuse Spec 003 `scheduleAgenda` + the shared appointment drawer + a `schedule.html#view=timetable`
deep-link. Nav: promote `families`/`addFamily` (NI12); `family.html`/`student.html` are profile
templates (not nav items; `activeId` = families/students); the rest of the families category
stays planned. Prior plans: `…/003-timetable-scheduling/plan.md`, `…/002-admin-core-operations/plan.md`,
`…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Spec 001 + 002 + 003 + 004): continue the approved design (Spec 001 is the
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

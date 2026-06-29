<!-- SPECKIT START -->
Active feature: **Spec 003 — Timetable and Scheduling Experience**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/003-timetable-scheduling/plan.md`
(see also `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`).

Spec 003 EVOLVES the implemented Spec 001/002 app (`academy-dashboard-discovery/app/`)
Schedule + Sessions surfaces into a timetable/scheduling experience: a two-tab pattern —
**List/Agenda** (the existing day-grouped block list, kept) + **Timetable** (a NEW
hand-rolled weekly CSS grid, **no calendar library**) — clickable time blocks that open
one shared appointment-details drawer, strong filters (week/day, teacher, subject, status)
narrowing both views, an admin-facing **teacher-timetable lens** inside the Schedule page
(NOT a new page, NOT a teacher portal), and a minimal fixture-backed dashboard impact.
The user-facing Schedule label is reconciled to **`الجدول الدراسي` / `Timetable`** (id +
route stay `schedule`/`schedule.html`). Spec 002 plan:
`academy-dashboard-discovery/specs/002-admin-core-operations/plan.md`; Spec 001 plan:
`academy-dashboard-discovery/specs/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Spec 001 + 002 + 003): continue the approved design (Spec 001 is the
visual target); **static HTML-first** — pages pre-rendered to complete `public/*.html`,
NO whole-page `<div id="app">` mount, **the weekly timetable grid is baked at build time
(block grid-row spans computed at build, NOT runtime-drawn)**, runtime JS enhances existing
markup only via `data-*` hooks (toggle tabs + persist localStorage/URL-hash, filter
pre-rendered blocks, open drawer/confirm, toasts/disabled-reason); per-language pre-rendered
pages; relative asset paths; GitHub-Pages compatible; Django-template-ready
(`{% for day %}{% for block %}`); Arabic RTL first + English LTR; Light/Dark/System; native
JS; no CDN/TypeScript/SPA/chart libs/**calendar libs**/drag-drop libs; fixtures only — no
real API/auth/permissions/CRUD/persistence, no recurrence engine, **no real conflict
detection** (attention flags are fixture-only display); no business modules/dashboards/portals
(teacher timetable is admin-facing display only); no copied legacy assets/classes/logo/palette/
wording; screenshot-based visual acceptance.
<!-- SPECKIT END -->

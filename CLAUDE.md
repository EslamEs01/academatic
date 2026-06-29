<!-- SPECKIT START -->
Active feature: **Spec 002 — Admin Core Operations Pages**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/002-admin-core-operations/plan.md`
(see also `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`).

Spec 002 EXTENDS the implemented Spec 001 app (`academy-dashboard-discovery/app/`)
with six fixture-only admin pages behind the sidebar — Sessions, Schedule,
Students, Teachers, Courses, Settings (Trainers/Curricula were renamed to
Teachers/Courses) — reusing the Spec 001 shell, tokens, and components. The shell
visual target is now `design-references/approved-dashboard/sidebar-reference.png`
(slim icon rail + light nav panel + active violet pill + bottom profile avatar),
superseding the previous single dark column. Spec 001 reference plan:
`academy-dashboard-discovery/specs/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Spec 001 + 002): continue the approved design (Spec 001 is the
visual target); **static HTML-first** — pages pre-rendered to complete `public/*.html`,
NO whole-page `<div id="app">` mount, runtime JS enhances existing markup only via
`data-*` hooks; per-language pre-rendered pages; relative asset paths; GitHub-Pages
compatible; Django-template-ready; Arabic RTL first + English LTR; Light/Dark/System;
native JS; no CDN/TypeScript/SPA/chart libs/calendar libs; fixtures only — no real
API/auth/permissions/CRUD; no business modules/dashboards/portals; no copied legacy
assets/classes/logo/palette/wording; screenshot-based visual acceptance.
<!-- SPECKIT END -->

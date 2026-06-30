# Implementation Plan: Courses, Groups and Learning Paths Deep Experience

**Branch**: `feature/001-approved-dashboard-design` (single-branch spec-kit) | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/006-courses-groups-learning-paths/spec.md`

## Summary

Make the academy admin app feel **academically complete** by giving it the course↔group↔student↔family↔teacher↔schedule↔attendance graph the legacy system scattered and dead-ended — **frontend-only, fixture-only**, reusing the implemented Spec 001–005 app. Concretely: **enrich** the existing `courses.html` (academic counts + a course-profile link), add a **Course profile** (`course.html`) and a promoted **Groups directory** (`groups.html`) + **Group profile** (`group.html`), a **display-only Learning Path** strip inside the course profile, a NEW **group-status** map, fixtures for courses (enriched) + groups, light student/family integration, and one minimal dashboard signal. Scheduling and outcomes are **reused unchanged** from Specs 003/005 (the shared `scheduleAgenda` + the canonical outcome drawer); no new engine is introduced. Technical approach and all decisions are in [research.md](./research.md) (R44–R59) and [data-model.md](./data-model.md) (19 fixture shapes).

## Technical Context

**Language/Version**: ES modules (native browser JS), Node ≥18 for the build scripts — no TypeScript.
**Primary Dependencies**: NONE new. Existing local Tailwind 3 + PostCSS (build-time), Playwright + axe-core (tests), self-hosted Tajawal + a local lucide SVG sprite. No CDN, no chart/table/form/calendar/SPA library.
**Storage**: N/A — fixtures only (`src/js/fixtures/*.js`); no DB, no API, no persistence, no `localStorage` beyond the existing theme/nav-category/tab keys.
**Testing**: `npm run build` (SSG, must be raw-key-clean), `npm run test:smoke` (structure + behavior), `npm run test:a11y` (axe WCAG 2.1 AA, critical=0), `npm run screenshots` (Playwright matrix) + **manual screenshot review** (the final gate).
**Target Platform**: Static site — GitHub Pages / VS Code Live Server / any static host; per-language pre-rendered pages opened directly from the filesystem. Django-template-ready.
**Project Type**: Static-site-generated multi-page admin frontend (HTML-first; runtime JS enhances only).
**Performance Goals**: Instant static page loads; no runtime page-DOM construction; ≤3-click reachability (SC-001); 0 console errors per captured frame.
**Constraints**: Static HTML-first (no `#app`, baked cards/rows/profile tabs/drawer templates); JS enhancement only via `data-*` hooks; relative/local assets (GitHub Pages); Arabic-RTL default + English `.en.html`; Light/Dark/System; labeled status chips (never numeric/color-only); no real course/group/enrollment/assignment/curriculum/certificate/scheduling/attendance engine; no portals/role dashboards.
**Scale/Scope**: 4 page surfaces (`courses` enriched, `course` NEW, `groups` NEW, `group` NEW) × 2 languages = up to 6 new `public/*.html` (course/group/groups × ar+en) on top of the enriched courses pair; ~6 courses + ~6–8 groups fixtures; 1 new status map; 1 new fixture module + 1 extended; 1 i18n overlay pair; 13 contracts. Builds on 28 existing pages.

## Constitution Check

*The repo constitution (`.specify/memory/constitution.md`) is an unfilled template, so the binding gates are the **Hard Constraints in `CLAUDE.md`** (Spec 001+002+003+004+005), treated as the de-facto constitution — the same basis used by Specs 002–005.*

| Gate (from CLAUDE.md hard constraints) | Spec 006 compliance |
|---|---|
| Continue the approved Spec 001 design | Reuses the shell, cards, profiles, chips, tabs, agenda, drawers — no visual drift; screenshot-gated (US12). ✓ |
| Static HTML-first; no whole-page `#app`; baked cards/profile tabs/drawer templates | All directories, profile tabs, and drawer `<template>`s baked at build; runtime JS enhances only. ✓ (FR-025) |
| Runtime JS enhances existing markup via `data-*` only | Reuses `data-filter*`/`data-filter-set`/`data-tab`/`data-drawer`/`data-confirm`/`data-demo-action`/`data-disabled-reason`/`data-toast`; **no new hook**. ✓ |
| Per-language pre-rendered pages; relative/local assets; GitHub-Pages compatible | `*.html` + `*.en.html` via the SSG; `./assets/`; no CDN. ✓ (FR-026) |
| Django-template-ready | Every shape maps to `{% for %}`/`{% if %}` + a status template tag (data-model). ✓ |
| Arabic RTL first + English LTR; Light/Dark/System | New `ar.crs.js`/`en.crs.js`; RTL/LTR + dark verified in screenshots + a11y. ✓ |
| Labeled lifecycle/status chips (never numeric/color-only) | NEW labeled `group-status`; EXTENDED `course-status`; reused enrollment status — all icon+text. ✓ (FR-016/017/018) |
| No CDN/TypeScript/SPA/chart/table/form/calendar library | None added. ✓ (FR-027) |
| Fixtures only — no API/auth/CRUD/persistence; **no engine** (course/group/enrollment/assignment/curriculum/certificate/scheduling/attendance/finance) | Fixtures + honest demo/disabled/confirm actions only. ✓ (FR-019/020/027, scope-guard) |
| No student/family/teacher dashboards or portals | None added; profile templates are admin-facing detail pages, not portals. ✓ |
| No copied legacy assets/classes/logo/palette/wording/numeric statuses | New tokens/labels only; legacy = UX reference only. ✓ |
| Screenshot-based visual acceptance | 15-frame matrix + manual review is the final gate (US12). ✓ |

**Initial gate: PASS** (no violations). **Post-design re-check: PASS** — the design adds no dependency, no engine, no new runtime hook, and reuses the Spec 003 agenda + Spec 005 canonical drawer unchanged (SC-009). **Complexity Tracking: empty** (no violations to justify).

## Project Structure

### Documentation (this feature)

```text
specs/006-courses-groups-learning-paths/
├── spec.md              # /speckit.specify output (accepted)
├── checklists/
│   └── requirements.md  # spec quality checklist (passed)
├── plan.md              # THIS FILE
├── research.md          # Phase 0 — R44–R59
├── data-model.md        # Phase 1 — 19 fixture shapes
├── quickstart.md        # Phase 1 — build/preview/review/verify
├── contracts/           # Phase 1 — 13 UI contracts (below)
└── tasks.md             # Phase 2 — /speckit.tasks (NOT created here)
```

### Source code (relative to `academy-dashboard-discovery/app/`)

```text
src/js/
├── fixtures/
│   ├── courses.js          # EXTEND: groupIds/teacherIds/levels[counts]/counts/attention + COURSE_BY_ID, courseOf()
│   └── groups.js           # NEW: GROUPS + GROUP_BY_ID + groupsOf{Course,Teacher,Student} + GROUP_SUMMARY
├── components/
│   ├── course-status.js    # EXTEND COURSE_STATUS (+ paused) + courseStatusChip   (or fold into courses fixture)
│   ├── group-status.js     # NEW labeled group-status map + groupStatusChip
│   ├── enrollment-status.js# NEW: relocate student.js' local course-status (active/paused/completed)
│   ├── group-row.js        # NEW: groups directory list/card-hybrid row (facetAttrs + status chip + links + kebab)
│   ├── course-card.js      # NEW (or extend directoryCard usage in courses.js): enriched course card
│   └── learning-path.js    # NEW: display-only level ladder (.level-step)
├── pages/
│   ├── courses.js          # ENRICH: counts + course-profile link + attention hint (keep card grid)
│   ├── course.js           # NEW: renderCourse() profile (banner + 8 baked tabs)
│   ├── groups.js           # NEW: renderGroups() directory (header + optional tiles + filter bar + rows)
│   ├── group.js            # NEW: renderGroup() profile (banner + 7 baked tabs)
│   ├── student.js          # CHANGE: enrollment cards → course.html, group chip → group.html
│   ├── family.js           # CHANGE: ONE courses/groups overview hint + deep-links
│   └── dashboard.js        # CHANGE: ONE "groups needing attention" chip in the people-signal card
├── nav.config.js           # CHANGE: promote `groups` (planned→implemented, route:'groups.html')
└── i18n.js                 # CHANGE: deepMerge ar.crs.js + en.crs.js
src/locales/{ar,en}.crs.js  # NEW i18n overlay
src/styles/app.css          # EXTEND: Spec 006 @layer (.course-card/.group-row/.level-ladder/.level-step + mobile)
scripts/
├── build-html.mjs          # CHANGE: register courses(enriched)/groups/course/group pages
└── vendor-assets.cjs       # CHANGE only if new icons needed (graduation-cap/layers/route)
tests/
├── smoke/run.cjs           # EXTEND: groups/course/group + Spec 006 asserts
├── a11y/run.cjs            # EXTEND: courses dark/EN + groups/course/group
└── screenshots/capture.cjs # EXTEND: 15-frame Spec 006 matrix + variant support
```

**Structure Decision.** Spec 006 **extends the existing SSG app in place** (the Spec 002–005 pattern): new page render modules in `src/js/pages/`, registered in `scripts/build-html.mjs`; new fixtures + components; interactions through the existing `src/js/enhance.js` hooks (no new hook). `course.html`/`group.html` are **profile templates** (registered with `activeId:'courses'`/`'groups'`, not nav items); `groups.html` is the one **promoted** nav page. No backend, no new dependency.

## Phase 0 — Outline & Research

Complete → [research.md](./research.md). Resolved the spec's open questions: the course-vs-group model (R44), routes/nav promotion (R45), the three-status reconciliation (R46), learning-path-as-display-only (R47), the reuse map (R48), fixture-only group↔schedule/outcome mapping (R49), fixture files (R50), action honesty (R51), student/family/dashboard integration (R52–R53), i18n/CSS/icons (R54), tests/screenshots (R55–R56), **one-spec-vs-split** (R57 → keep one, MVP-first), optional group tiles (R58), and the scope/constitution confirmation (R59). No NEEDS CLARIFICATION remains.

## Phase 1 — Design & Contracts

Complete → [data-model.md](./data-model.md) (19 shapes), [quickstart.md](./quickstart.md), and `contracts/` (13 UI contracts):

1. `courses-page-contract.md` — enriched courses directory (counts, profile link, filters, states).
2. `course-profile-contract.md` — `course.html` banner + 8 baked tabs + links.
3. `groups-page-contract.md` — `groups.html` directory (tiles/filters/rows/states, nav promotion).
4. `group-profile-contract.md` — `group.html` banner + 7 baked tabs + links.
5. `course-group-status-contract.md` — the three labeled maps + reconciliation rules.
6. `learning-path-contract.md` — display-only level ladder inside the course profile.
7. `course-group-actions-contract.md` — demo/confirm/disabled action matrix.
8. `student-family-impact-contract.md` — light student + family integration.
9. `dashboard-impact-contract.md` — the one minimal groups-attention signal.
10. `navigation-impact-contract.md` — `groups` promotion + profile-template `activeId` rules.
11. `static-html-django-ready-contract.md` — baked markup + Django mapping.
12. `screenshot-acceptance.md` — the 15-frame matrix + failure conditions.
13. `scope-guard.md` — the forbidden list + grep audit.

**Agent context update**: the `CLAUDE.md` active-feature pointer is updated to Spec 006 (this plan).

## Phase 2 — Tasks (NOT in this command)

`/speckit.tasks` will derive the task list from this plan + contracts, following the MVP sequencing below. **Not run here.**

## MVP Sequencing (incremental, no mixed engines)

1. **Fixtures + status maps** — `groups.js`, enrich `courses.js`, `group-status.js`, extend `course-status`, relocate `enrollment-status` (foundational).
2. **Enriched Courses** (US1) — counts + profile link + attention hint.
3. **Course profile** (US3) — `course.html` banner + tabs (Overview/Groups/Students/Teachers/Timetable/Outcomes/Learning-Path/Notes).
4. **Groups directory** (US2) — promote nav + `groups.html` + filters/tiles/rows.
5. **Group profile** (US4) — `group.html` banner + tabs (Overview/Students/Timetable/Sessions&Outcomes/Teacher/Course/Notes).
6. **Learning Path display** (US5) — the level ladder inside the course profile.
7. **Timetable linkage** (US7) — reuse `scheduleAgenda` + schedule deep-link on both profiles.
8. **Attendance/outcome linkage** (US8) — reuse `outcomeRow`/`outcomeTemplate` + attendance deep-link on both profiles.
9. **Student/family integration** (US9) — enrollment→course/group links; family hint.
10. **Dashboard impact** (US10) — the one groups-attention chip.
11. **Navigation reconciliation** (US2/US11) — promotion verified, profile templates `activeId`, no dead links.
12. **Static/Django checks + screenshots** (US11/US12) — smoke/a11y extensions + the 15-frame matrix + manual review.

**Demoable MVP** = steps 1–2 + 4 + 5 (Courses-enrich + Groups directory + Group profile = US1+US2+US4). Steps 3, 6–10 are independent increments; 11–12 are the cross-cutting acceptance gates. **Decision: this remains ONE Spec 006** (R57) — the MVP path is clear and every increment reuses proven components without introducing an engine; a documented fallback allows deferring the Course profile (US3/US5) to a "Spec 006b" only if it overflows a reviewable increment during `/speckit.tasks`.

## Complexity Tracking

*No constitution violations — table intentionally empty.*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| — | — | — |

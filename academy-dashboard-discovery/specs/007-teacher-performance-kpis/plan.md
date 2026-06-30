# Implementation Plan: Teacher Performance and Academic KPIs

**Branch**: `feature/001-approved-dashboard-design` (single-branch spec-kit; Spec 007 lives beside 001–006) | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/007-teacher-performance-kpis/spec.md`

## Summary

Spec 007 adds the admin-facing **Teacher Performance and Academic KPIs** experience to the implemented Spec 001–006 app, making the academy "academically complete" on the teacher axis: it turns the teacher from a flat directory card into a unified academic hub (courses ↔ groups ↔ students ↔ families ↔ schedule ↔ outcomes ↔ absence ↔ follow-up) and gives admins one calm board to review/compare/follow-up teacher delivery.

Grounding decision (the spine of the whole plan): the legacy system **never** had a computed teacher score, rank, leaderboard, or rating engine — teacher "performance" was scattered **raw counts** (per-teacher Cancel/Absent/Attend, a single feedback ratio %, a system-wide Sessions-Analysis aggregate) plus a `View KPIs` permission whose page was never built; and the legacy teacher profile crammed **academic** data together with **finance** (salary/compensations/payouts) on a 56-button page. Therefore Spec 007 builds **the academic side only**, as a **display of fixture-backed raw counts + labeled signals** — **never** a computed score/rank/analytics engine, and with **all salary/payroll/compensation explicitly out of scope** (a future finance spec).

Technical approach: **reuse, don't rebuild.** Three surfaces — (1) **enrich** `teachers.html` (existing `cardGrid`/`directoryCard`/`filterBar`/`summaryCards`/`noResults`) with academic counts + a profile link; (2) add `teacher.html` — a baked **profile template** (`activeId:'teachers'`, NOT a nav item) reusing `profileBanner` + `tabs` + `cohort-panels`; (3) **promote** the already-reserved planned `teacherKpi` nav item → `teacher-performance.html`, an academy-wide KPI/follow-up board. Timetable tabs reuse the Spec 003 `scheduleAgenda` (+ `schedule.html#view=timetable`); outcomes tabs reuse the Spec 005 `outcomeRow`/`outcomeTemplate` canonical drawer (+ `attendance.html`); course/group/student/family links reuse Specs 004/006. New work is intentionally thin: three labeled maps (teacher-status, workload, follow-up signal), a `teacherActions()` cluster, an `outcomesOfTeacher(id)` resolver, and a teacher-fixture extension (status/signals/counts — **no finance fields**). Static-HTML-first, per-language pre-render, Django-template-ready — exactly as Specs 001–006.

## Technical Context

**Language/Version**: ES modules (native browser JS, no transpile); Node ≥ 18 for the build/test scripts only
**Primary Dependencies**: none added — existing in-repo build (`scripts/build-html.mjs`), `i18n.js` deep-merge overlays, Playwright (smoke/a11y/screenshots), `@axe-core/playwright`. **No** chart/table/form/calendar/SPA library, **no** CDN, **no** TypeScript.
**Storage**: none — fixtures only (`src/js/fixtures/*.js`); no API/DB/persistence
**Testing**: `npm run build` + smoke (`tests/smoke/run.cjs`) + a11y (axe) + screenshots (Playwright); screenshot-based visual acceptance is the final gate
**Target Platform**: static site — opened from filesystem / GitHub Pages; Django-template-ready downstream
**Project Type**: static HTML-first multi-page admin app (SSG: page render modules → complete `public/*.html` AR + `*.en.html` EN); runtime JS enhances baked markup only via `data-*` hooks
**Performance Goals**: instant static page loads; runtime JS only filters/switches/opens (no page-DOM construction)
**Constraints**: NO whole-page `<div id="app">` mount; all cards/rows/tabs/KPI-tiles/outcome-rows/schedule-blocks/drawers baked at build time; relative+local asset paths; Arabic RTL default + English LTR; Light/Dark/System; labeled status/signal chips (never numeric/color-only); **no real teacher-management / assignment / workload-calc / performance-scoring / ranking / salary-payroll / attendance / notification engine**; no portals/role dashboards; no copied legacy assets/classes/palette/wording/numeric-statuses
**Scale/Scope**: 3 surfaces (1 enriched + 2 new pages) × 2 languages = 4 new `public/*.html` files + the enriched `teachers.*`; 8 teachers; 8-tab profile; ~3 new components + 3 maps + 1 fixture extension + 1 resolver + 2 locale overlays

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution file is an unfilled template (no ratified principles); the binding gates are the **CLAUDE.md hard constraints** (Spec 001–006) + this spec's scope guard. Checked against them:

| Gate (from CLAUDE.md + spec) | Status | Note |
|---|---|---|
| Static HTML-first, no `#app` whole-page mount | ✅ PASS | All teacher cards/rows/tabs/KPI-tiles/drawers baked; runtime JS enhances only |
| No new library (chart/table/form/calendar/SPA), no CDN/TS | ✅ PASS | Reuses existing components; native JS only |
| Fixtures only — no API/auth/CRUD/persistence | ✅ PASS | Teacher fixture extension; no engines |
| **No performance-scoring / ranking / workload-calc engine** | ✅ PASS | Display-only fixture counts + labeled signals (the spec's spine) |
| **No salary/payroll/compensation engine or widget** | ✅ PASS | Finance entirely out of scope; no finance fields added |
| Labeled status/signal chips (icon+text, never numeric/color-only) | ✅ PASS | New teacher-status + workload + follow-up maps, distinct from existing maps |
| Reuse Spec 003 agenda + Spec 005 canonical drawer (no new builders) | ✅ PASS | SC-009 enforces zero new outcome-drawer/timetable/analytics builders |
| Per-language pre-render, relative paths, Django-ready, RTL/LTR, Light/Dark | ✅ PASS | `teacher.*` + `teacher-performance.*` baked AR + EN |
| No portals / role dashboards (teacher/student/family) | ✅ PASS | Admin-facing profile template only; `teacher.html` ≠ teacher portal |
| No dead links; promoted nav item points to a real page | ✅ PASS | Only `teacherKpi`→`teacher-performance.html` promoted; rest stay planned |

**Result: PASS** (no violations; Complexity Tracking left empty).

## Project Structure

### Documentation (this feature)

```text
specs/007-teacher-performance-kpis/
├── plan.md              # This file
├── research.md          # Phase 0 — decisions (no computed score; finance out; reuse map; nav promotion; zero-data; maps)
├── data-model.md        # Phase 1 — fixture-only entities + the 3 labeled maps + Django-context mapping
├── quickstart.md        # Phase 1 — build/preview/review/verify steps
├── contracts/           # Phase 1 — 13 contracts (below)
│   ├── teachers-page-contract.md
│   ├── teacher-profile-contract.md
│   ├── teacher-performance-contract.md
│   ├── teacher-status-contract.md
│   ├── teacher-actions-contract.md
│   ├── teacher-timetable-contract.md
│   ├── teacher-outcomes-contract.md
│   ├── student-family-impact-contract.md
│   ├── dashboard-impact-contract.md
│   ├── navigation-impact-contract.md
│   ├── static-html-django-ready-contract.md
│   ├── screenshot-acceptance.md
│   └── scope-guard.md
├── checklists/requirements.md   # already created in /speckit.specify
└── tasks.md             # Phase 2 (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

All work is inside the existing app; **no new top-level dirs**. New (N) and edited (E) files:

```text
academy-dashboard-discovery/app/
├── scripts/
│   └── build-html.mjs                    # E  register teacher (profile-template) + teacher-performance pages
├── src/
│   ├── js/
│   │   ├── pages/
│   │   │   ├── teachers.js                # E  enrich cards (counts/workload/follow-up/profile link)
│   │   │   ├── teacher.js                 # N  baked profile template (banner + 8 tabs)
│   │   │   ├── teacher-performance.js     # N  KPI tiles + per-teacher comparison list + follow-up queue
│   │   │   └── dashboard.js               # E  ONE "teachers needing follow-up" chip (folded into existing card)
│   │   ├── components/
│   │   │   ├── teacher-status.js          # N  active/paused/inactive labeled map
│   │   │   ├── teacher-signals.js         # N  workload (light/balanced/high) + follow-up (strongDelivery/stable/needsFollowUp/attentionRisk) maps
│   │   │   └── teacher-actions.js         # N  teacherActions() honest-action cluster (demo/confirm/disabled/link)
│   │   ├── fixtures/
│   │   │   ├── teachers.js                # E  + statusId, workload, followUp, academic counts, outcome breakdown (NO finance)
│   │   │   └── sessions.js (or attendance.js)  # E  add outcomesOfTeacher(id); optionally a few fixture sessions for sparse teachers
│   │   └── nav.config.js                  # E  promote teacherKpi planned→implemented (teacher-performance.html)
│   └── locales/
│       ├── ar.trn.js                      # N  Arabic teacher-performance overlay
│       └── en.trn.js                      # N  English teacher-performance overlay
└── tests/
    ├── smoke/run.cjs                      # E  add teacher + teacher-performance page assertions (baked tabs/rows/drawer/links)
    ├── a11y/*                             # E  add new pages to the axe sweep
    └── screenshots/*                      # E  add the Spec 007 frame matrix
```

**Structure Decision**: Reuse the established SSG layout exactly (page render module in `src/js/pages/` → registered in `scripts/build-html.mjs` → complete `public/*.html` AR + `.en.html`). `teacher.html`/`teacher-performance.html` follow the Spec 006 `course.html`/`group.html` profile-template + directory precedents. No new architecture, no new build step, no new dependency.

## Phasing & MVP Sequencing

Increment order (each independently reviewable; matches the spec's MVP-first sequencing):

1. **Foundation** — teacher-fixture extension (status/workload/follow-up/counts/outcome-breakdown, NO finance) + the 3 labeled maps (`teacher-status.js`, `teacher-signals.js`) + the `outcomesOfTeacher(id)` resolver + locale overlays (`ar.trn.js`/`en.trn.js`). *Blocking prerequisite for every surface.*
2. **US1 — Teachers enrich** (P1): academic counts + workload + follow-up flag + status chip + `teacher.html` link on each card; subject/status/workload filters; zero-data hints.
3. **US2 — Teacher profile** (P1, **MVP payoff**): `teacher.html` banner + 8 baked tabs (Overview/Courses/Groups/Timetable/Sessions&Outcomes/Students/Follow-up/Notes); reuse `cohort-panels` for Timetable + Outcomes.
4. **US7 — Teacher Performance board** (P1): `teacher-performance.html` KPI tiles + per-teacher comparison list + follow-up queue; promote `teacherKpi` nav item.
5. **US3/US4 — Workload + Outcomes/absence** (P2): labeled workload hints everywhere; reuse Spec 005 drawer with teacherAbsent ≠ studentAbsent.
6. **US5 — Cross-surface follow-up** (P2): student/family/group/course/schedule/attendance deep-links from teacher context.
7. **US6 — Demo actions** (P2): `teacherActions()` — demo toast / confirm→toast / disabled-with-reason / real link.
8. **US8 — Dashboard signal** (P2): ONE fixture follow-up chip folded into an existing card → `teacher-performance.html`.
9. **US9/US10 — Static/Django + Visual** (P1, cross-cutting gates): baked-source verification; build/smoke/a11y green; screenshot matrix reviewed.

**MVP = US1 + US2** (enriched Teachers → a real Teacher profile). US7 is the headline second increment.

## How this plan avoids becoming fake analytics (explicit, per spec mandate)

Because this spec touches "performance/KPIs," the plan states the guardrail up front and the contracts enforce it:

- **Allowed (display-only fixture values):** completed-sessions count, teacher-absence count, student-absence-in-teacher-sessions count, cancelled/rescheduled count, groups-needing-follow-up count, a labeled workload hint, a labeled follow-up signal, and a raw display percentage **only if** it is a baked fixture value clearly labeled display-only (default: avoid percentages entirely; prefer counts).
- **Forbidden (no exceptions):** any calculated score engine, ranking, leaderboard, percentile, automatic rating, predictive/risk computation, chart/graph, salary/payroll metric, or computed-analytics engine. The per-teacher comparison list is **sortable/filterable only via the existing client-side facet mechanism** — not a computed model.
- **Vocabulary discipline:** the surfaces are never called an "evaluation," "scoring," or "rating" system; they are a **review/follow-up board**. Workload and follow-up are **labeled fixture flags**, authored in the fixture, not derived by a formula. `scope-guard.md` lists every forbidden engine; `screenshot-acceptance.md` makes "fake score/rank/chart/salary visible" a hard failure condition.

## Complexity Tracking

*No constitution violations — section intentionally empty.*

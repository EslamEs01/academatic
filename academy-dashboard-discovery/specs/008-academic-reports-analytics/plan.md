# Implementation Plan: Academic Reports and Operations Analytics Shell

**Branch**: `feature/001-approved-dashboard-design` (single-branch spec-kit; Spec 008 lives beside 001–007) | **Date**: 2026-06-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/008-academic-reports-analytics/spec.md`

## Summary

Spec 008 turns the academy's scattered, placeholder `reports.html` into a calm, premium, fixture-only **Academic Reports & Operations Shell** — one honest page that **organizes, summarizes, and links** the already-implemented Spec 001–007 academic operations (attendance/outcomes · sessions/timetable · courses/groups · teachers · students/families) into report-category cards + a fixture-backed operations overview, with honest demo export actions and real drill-down links to the source pages.

Grounding decision (the spine): **`reports.html` already exists and is implemented** (a real `reports` nav item, `activeId:'reports'`, registered in `build-html.mjs`, rendered by `pages/reports.js`) but today shows only **4 placeholder `reportCard`s** with dead `route:'#'` links — including a **finance `revenue` card**. So Spec 008 **ENRICHES the existing page** (the proven Spec 006/007 enrich-an-existing-page pattern) — **no new page, no nav promotion, no dashboard chrome** — replacing the placeholders with real category cards, fixture roll-up summaries, and honest actions, and **removing all finance**.

Technical approach: **reuse, don't rebuild.** Every report number is a **display-only roll-up of an existing fixture summary** — `OUTCOME_SUMMARY` (Spec 005), `STATUS_SUMMARY`/`SESSIONS` (Spec 001/003), `GROUP_SUMMARY` + active-courses count (Spec 006), `TEACHERS_NEEDING_FOLLOWUP` + `OUTCOME_SUMMARY` absences (Spec 007), and the Spec 004 family/student attention computation (reused verbatim from `dashboard.js` `peopleSignal()`). No metric is fabricated; **no computed score, rank, percentile, chart, BI, or finance figure** is introduced. New work is intentionally thin: rewrite `pages/reports.js` + `fixtures/reports.js` (a `report-summary` roll-up resolver + honest report categories), lightly extend `report-card.js` (an availability chip + a summary slot), add two labeled maps (`report-signal` + `report-availability`), a `reportActions()` honest-action cluster, and a locale overlay (`ar.rep.js`/`en.rep.js`). Static-HTML-first, per-language pre-render, Django-template-ready — exactly as Specs 001–007.

## Technical Context

**Language/Version**: ES modules (native browser JS, no transpile); Node ≥ 18 for the build/test scripts only
**Primary Dependencies**: none added — existing in-repo build (`scripts/build-html.mjs`), `i18n.js` deep-merge overlays, Playwright (smoke/a11y/screenshots), `@axe-core/playwright`. **No** chart/table/form/calendar/analytics/SPA library, **no** CDN, **no** TypeScript.
**Storage**: none — fixtures only (`src/js/fixtures/*.js`); no API/DB/persistence/export
**Testing**: `npm run build` + smoke (`tests/smoke/run.cjs`) + a11y (axe) + screenshots (Playwright); screenshot-based visual acceptance is the final gate
**Target Platform**: static site — opened from filesystem / GitHub Pages; Django-template-ready downstream
**Project Type**: static HTML-first multi-page admin app (SSG: page render modules → complete `public/*.html` AR + `*.en.html`); runtime JS enhances baked markup only via `data-*` hooks
**Performance Goals**: instant static page loads; runtime JS only filters/switches/opens (no page-DOM construction); ≤1-click reach to any source area
**Constraints**: NO whole-page `<div id="app">` mount; all category cards/summary sections/signal chips/rows/modals baked at build time; relative+local asset paths; Arabic RTL default + English LTR; Light/Dark/System; labeled signal/availability chips (never numeric/color-only); **no reporting/analytics/aggregation/export/PDF/CSV/scheduled-report/BI engine, no performance-scoring/ranking, no finance/salary/payroll/invoice/accounting/revenue report**; no portals/role dashboards; no copied legacy assets/classes/palette/wording/numeric-statuses
**Scale/Scope**: 1 enriched page surface (`reports` + `reports.en`) — **no new public page** — on top of the existing 19 pages; ~2 new components (`report-status.js`, `report-actions.js`) + 1 rewritten page + 1 rewritten fixture (with the roll-up resolver) + 1 lightly-extended component (`report-card.js`) + 1 locale overlay pair + the 3 test files. **No build-html / nav / dashboard change.**

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The repo constitution (`.specify/memory/constitution.md`) is an unfilled template, so the binding gates are the **Hard Constraints in `CLAUDE.md`** (Spec 001–007), treated as the de-facto constitution — the same basis used by Specs 002–007. Checked:

| Gate (from CLAUDE.md hard constraints) | Status | Note |
|---|---|---|
| Continue the approved Spec 001 design | ✅ PASS | Reuses shell/cards/chips/states; screenshot-gated (US10) |
| Static HTML-first, no `#app` whole-page mount | ✅ PASS | All category cards/sections/chips/modals baked; runtime JS enhances only |
| No new library (chart/table/form/calendar/analytics/SPA), no CDN/TS | ✅ PASS | Reuses existing components; native JS only |
| Fixtures only — no API/auth/CRUD/persistence | ✅ PASS | `report-summary` rolls up existing fixture counts; no engine |
| **No reporting/analytics/aggregation/export/BI engine** | ✅ PASS | Display roll-up of existing summaries; honest demo actions |
| **No computed score / ranking / leaderboard / percentile / chart** | ✅ PASS | Every number is a fixture count; labeled signals only (the spec's spine) |
| **No finance/salary/payroll/invoice/accounting/revenue report** | ✅ PASS | The legacy `revenue` placeholder is removed; finance entirely out of scope |
| Labeled signal/availability chips (icon+text, never numeric/color-only) | ✅ PASS | New `report-signal` + `report-availability` maps, distinct from existing maps |
| teacherAbsent vs studentAbsent kept distinct | ✅ PASS | Reuses the Spec 005 `outcome-status` chips in the attendance + teacher sections |
| Drill-down only to implemented pages; no dead links | ✅ PASS | Category cards → real source pages; advanced reports labeled planned/backendRequired |
| Per-language pre-render, relative paths, Django-ready, RTL/LTR, Light/Dark | ✅ PASS | `reports.*` re-rendered AR + EN |
| No portals / role dashboards | ✅ PASS | Admin reports shell only; links to admin pages |
| Minimal dashboard impact | ✅ PASS | **No** new dashboard chrome (it already links to `reports.html`) |

**Result: PASS** (no violations; Complexity Tracking left empty).

## Project Structure

### Documentation (this feature)

```text
specs/008-academic-reports-analytics/
├── plan.md              # This file
├── research.md          # Phase 0 — decisions (enrich-not-add; roll-up-not-fabricate; finance-out; no-BI; reuse map; maps; actions; nav/dashboard none)
├── data-model.md        # Phase 1 — fixture-only shapes (13) + the 2 labeled maps + Django mapping
├── quickstart.md        # Phase 1 — build/preview/review/verify steps
├── contracts/           # Phase 1 — 14 contracts (below)
│   ├── reports-page-contract.md
│   ├── academic-operations-contract.md
│   ├── attendance-outcomes-report-contract.md
│   ├── sessions-report-contract.md
│   ├── course-group-report-contract.md
│   ├── teacher-report-contract.md
│   ├── student-family-report-contract.md
│   ├── report-actions-contract.md
│   ├── report-status-contract.md
│   ├── dashboard-impact-contract.md
│   ├── navigation-impact-contract.md
│   ├── static-html-django-ready-contract.md
│   ├── screenshot-acceptance.md
│   └── scope-guard.md
├── checklists/requirements.md   # already created in /speckit.specify
└── tasks.md             # Phase 2 (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

All work is inside the existing app; **no new top-level dirs, no new public page**. New (N) and edited (E):

```text
academy-dashboard-discovery/app/
├── src/
│   ├── js/
│   │   ├── pages/
│   │   │   └── reports.js                 # E  REWRITE → the Academic Reports shell (header + actions + overview + category cards + per-area sections)
│   │   ├── components/
│   │   │   ├── report-card.js             # E  light extend (availability chip + a fixture summary slot; keep the disabled-with-reason variant)
│   │   │   ├── report-status.js           # N  report-signal (healthy/needsFollowUp/attentionRisk) + report-availability (available/demoOnly/planned/backendRequired) maps
│   │   │   └── report-actions.js          # N  reportActions() — print/export-csv/export-pdf/share/schedule (demo/confirm/disabled-with-reason)
│   │   ├── fixtures/
│   │   │   └── reports.js                 # E  REWRITE → REPORT_CATEGORIES + the report-summary ROLL-UP resolver (imports OUTCOME_SUMMARY/STATUS_SUMMARY/SESSIONS/GROUP_SUMMARY/COURSES/TEACHERS_NEEDING_FOLLOWUP/families+students attention) — NO finance, NO new metric
│   │   └── i18n.js                        # E  register the ar.rep.js/en.rep.js overlay (2 imports + 2 deepMerge lines)
│   ├── locales/
│   │   ├── ar.rep.js                      # N  Arabic reports overlay (rep.*)
│   │   └── en.rep.js                      # N  English reports overlay
│   └── styles/
│       └── app.css                        # E  minor: report category-card summary chips + the per-area section band (reuse existing .report-card/.grid-reports/.card/.chip; NO new tone, NO chart CSS)
└── tests/
    ├── smoke/run.cjs                      # E  reports assertions (category cards + real source links + teacherAbsent≠studentAbsent + honest actions + no finance/score/chart token + no dead links)
    ├── a11y/*                             # E  add reports dark + EN (+ a section/filter state) to the axe sweep
    └── screenshots/*                      # E  add the Spec 008 reports frame matrix
```

**Structure Decision**: Enrich the existing SSG-registered `reports.html` in place — **no `build-html.mjs` change** (the page is already registered with `activeId:'reports'`), **no `nav.config.js` change** (the `reports` item is already implemented), **no `dashboard.js` change** (it already links to `reports.html`). The only new files are two small components + one locale pair; `reports.js`/`fixtures/reports.js` are rewritten in place. No new architecture, build step, or dependency.

## Phasing & MVP Sequencing

Increment order (each independently reviewable; matches the spec's MVP-first sequencing):

1. **Foundation** — `fixtures/reports.js` rewrite (the `report-summary` roll-up resolver + `REPORT_CATEGORIES`, finance removed) + the two labeled maps (`report-status.js`) + the `reportActions()` cluster + the locale overlay (`ar.rep.js`/`en.rep.js`). *Blocking prerequisite for the page.*
2. **US1 — Reports shell** (P1, **MVP start**): rewrite `pages/reports.js` → header + action cluster + report-category cards (each → a real source page + availability chip + summary) + a filter bar + planned/backendRequired cards; extend `report-card.js`.
3. **US2 — Academic Operations overview** (P1, **MVP payoff**): the fixture-backed summary band (sessions/outcomes/courses/groups/teachers/students-families counts + labeled report-signal chips + source links).
4. **US3 — Attendance & Outcomes section** (P2): reuse Spec 005 `outcome-status`; teacherAbsent ≠ studentAbsent + cancelled/rescheduled + needs-follow-up; `attendance.html` link.
5. **US4 — Sessions & Timetable section** (P2): reuse the session-status summary; `sessions.html` + `schedule.html#view=timetable` links.
6. **US5 — Courses & Groups section** (P2): reuse `GROUP_SUMMARY` + active-courses; `courses.html`/`groups.html` links.
7. **US6 — Teacher section** (P2): reuse `TEACHERS_NEEDING_FOLLOWUP` + absences; `teacher-performance.html`/`teacher.html` links; no score/rank.
8. **US7 — Students & Families section** (P2): reuse the attention computation; `students.html`/`student.html`/`families.html`/`family.html` links.
9. **US8 — Filters + honest actions** (P2): filter the baked cards/rows; print/export/share/schedule = demo/confirm/disabled-with-reason.
10. **US9/US10 — Static/Django + Visual** (P1, cross-cutting gates): baked-source verification; build/smoke/a11y green; screenshot matrix reviewed.

**MVP = US1 + US2** (the Reports shell + the Academic Operations overview).

## How this plan avoids becoming fake BI / charts / scoring / finance (explicit, per spec mandate)

Because this spec touches "reports/analytics," the plan states the guardrail up front and the contracts enforce it:

- **Allowed (display-only fixture values):** baked fixture **counts** and **resolved list lengths** rolled up from existing summaries (`OUTCOME_SUMMARY` / `STATUS_SUMMARY` / `SESSIONS.total` / `GROUP_SUMMARY` / active-courses count / `TEACHERS_NEEDING_FOLLOWUP` / the Spec 004 family-student attention count); authored labeled signals (`healthy/needsFollowUp/attentionRisk`) and availability (`available/demoOnly/planned/backendRequired`); category cards; source-page deep-links. **A raw count is shown as a count** — never normalized into a score/percentage-as-grade.
- **Forbidden (no exceptions):** any chart/graph/sparkline/canvas; any computed score, rank, leaderboard, percentile, trend, prediction, or "health %"; any analytics/aggregation/report/export/PDF/CSV/scheduled-report engine; any finance/salary/payroll/invoice/payment/accounting/revenue report, figure, or widget. The shell is a **review/navigation surface**, never a "BI/analytics" system; filtering is the existing client-side facet mechanism only.
- **Reuse discipline:** the per-area sections reuse the Spec 005 `outcome-status`, the Spec 001/003 session-status map, the Spec 006 `group-status`, and the Spec 007 teacher signals **unchanged** — no new report builder. `scope-guard.md` lists every forbidden engine + a grep audit; `screenshot-acceptance.md` makes "chart / fake score-rank / finance widget visible" a hard failure condition.

## Complexity Tracking

*No constitution violations — section intentionally empty.*

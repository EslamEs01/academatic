# Implementation Plan: Attendance and Session Outcomes

**Branch**: `feature/001-approved-dashboard-design` | **Date**: 2026-06-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/005-attendance-session-outcomes/spec.md`

## Summary

Build the admin-facing **Attendance & Session Outcomes** experience on the implemented Spec 001/002/003/004 app (`academy-dashboard-discovery/app/`), grounded in the analyzed academy reference (the daily "Classes Of {date}" outcomes board + the canonical Mark-Attend / Mark-Absent("who") / Cancel("who") / make-up-credit action family reused on 20+ pages, with status-gated actions) — but cleaner, calmer, more premium, and Arabic-RTL-first. Adds **one new surface**, an **Attendance / Outcomes page** (`attendance.html` — page title **«الحضور ونتائج الجلسات» / "Attendance & Session Outcomes"**, nav label **«الحضور» / "Attendance"**) with outcome summary tiles (that double as filters), a persistent filter bar, and an airy **list/card hybrid** of session-outcome rows; plus a **canonical outcome details drawer** reused across the Attendance and Sessions pages; light fixture-only integration into the **Sessions** page, the **Student** and **Family** profiles, and a **minimal dashboard** signal. A new **labeled OUTCOME status map** (attended / studentAbsent / teacherAbsent / cancelled / rescheduled + upcoming/live + makeUpSuggested/needsFollowUp flags — icon+label, never numeric/color-only) collapses the legacy 11-state lifecycle. All actions are **demo / confirm→demo / disabled-with-reason** — no real status mutation, persistence, notification, reschedule, make-up, or finance/credit engine.

Technical approach: preserve the **static HTML-first / GitHub-Pages / Django-ready** architecture exactly. Every tile, filter, outcome row, and `<template data-preview>` outcome drawer is **baked into the static `public/*.html` at build time** by the existing SSG (`scripts/build-html.mjs`); runtime `enhance.js` only **filters pre-rendered rows/cards (incl. a tiny new `data-filter-set` tile→filter hook), opens the shared drawer/confirm-modal, and shows demo/disabled feedback** — it builds no page DOM and adds no new engine. New components — an **outcome-status** map, a canonical **outcome-details** drawer (a superset of the Spec 003 appointment drawer's fields + an outcome section + a status-gated action cluster), and an **outcome-row** — compose existing Spec 001–004 atoms (`pageHeader`/`summaryCards`, `filterBar`, `dataTable`/`cardGrid`, `previewTemplate`/`sheetRow` + the appointment rows, `chip`, `states`, `confirmAction`, `toast`, `avatar`, `attentionFlag`, `statusChip`). A new **session-outcome fixture** (reusing the session/participant shape and resolving to real `Student`/`Family`/teacher refs) backs it. Quality is enforced by the existing build + smoke + axe + screenshot pipeline, extended for the new page, the outcome drawer, the tile-filters, and the integrations.

## Technical Context

**Language/Version**: HTML5, CSS3, native JavaScript (ES2022 modules). Node.js (tooling only). **No TypeScript.**
**Primary Dependencies**: Tailwind CSS 3 + PostCSS + Autoprefixer + postcss-import (build only); Playwright + `@axe-core/playwright` (tests); `@fontsource/tajawal` + `lucide-static` (vendored locally). **No runtime framework, no SPA, no chart/table/form/calendar library, no CDN.** (All inherited from Spec 001–004 — **no new dependencies**.)
**Storage**: N/A. Display data from static JS fixtures. Preferences persist in `localStorage` (theme/language/sidebar rail/nav category/selected-tab — unchanged; the Attendance filter + drawer state are client-side transient, not persisted).
**Testing**: Playwright (screenshot matrix + DOM smoke for tiles/filters/outcome-rows/drawer/no-dead-button/no-raw-i18n-key/no-external-request/keyboard), axe-core (a11y), and **mandatory manual screenshot review** vs the Spec 001–004 approved design + the old-system session/attendance screenshots (product reference only).
**Target Platform**: Modern evergreen browsers; responsive desktop/tablet/mobile (outcome rows → single-column cards; tiles wrap; drawer full-height).
**Project Type**: Static multi-page web frontend (extends the Spec 001–004 app in place; no backend tier).
**Performance Goals**: Fast first paint (static, self-hosted assets); **zero layout shift** on theme/direction/filter switch; instant client-side tile-filtering; small payload (no framework/chart/table libs).
**Constraints**: Arabic RTL default + English LTR; Light/Dark/System; offline-capable (relative + local assets, no CDN); fixtures only; **static HTML-first, no whole-page JS mount, baked rows/tiles/drawers**; GitHub-Pages compatible; Django-template-ready; visual output must match Spec 001–004 and improve on the legacy reference; **no engines, no portals/role dashboards, no finance/credit**.
**Scale/Scope**: Pages added = **`attendance` (× ar/en = 2 new `public/*.html`)** + the enriched `sessions`/`student`/`family`/`dashboard`; ~3 new components (outcome-status, outcome-details drawer, outcome-row); 1 new fixture (`attendance.js`); 1 nav promotion; **11 contracts**; ≥11 acceptance screenshots.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is still an **unfilled template**. Per the standing instruction, the **Spec 001 + 002 + 003 + 004 constraints are the binding gates**:

| Gate (binding constraint) | Plan compliance |
|---|---|
| Continue the approved Spec 001–004 design | Reuses the shell/tokens/components; the page/tiles/rows/drawer use the approved tokens + a labeled status map; screenshot acceptance compares to Spec 001–004. **PASS** |
| Static HTML-first; no whole-page JS mount | Attendance page + tiles + filter bar + all outcome rows + drawer templates baked into complete `public/*.html`; no `<div id="app">`; SSG via `build-html.mjs`. **PASS** |
| Runtime JS enhances only | `enhance.js` only filters pre-rendered rows (incl. the tiny `data-filter-set` tile→filter), opens the shared drawer/confirm, toasts/disabled-reason; **builds no page DOM, adds no engine**. **PASS** |
| Per-language pre-rendered pages | `attendance.html` (ar) + `attendance.en.html` (en); language toggle navigates. **PASS** |
| Relative asset paths / local only / no CDN | `./assets/...`; vendored fonts/icons; no-external-request smoke test. **PASS** |
| GitHub-Pages compatible | Self-contained `public/` + `.nojekyll`; `deploy:pages`. **PASS** |
| Django-template-ready | The list → `{% for outcome %}`; the shared drawer → one `{% include %}` partial; tiles/filters → `data-*`; status map → a template tag; fixtures → context. **PASS** |
| Native JS only; no TS/SPA | ES modules, no framework, no router. **PASS** |
| **No chart/table/form/calendar library** | Tiles/rows/drawer/chips are hand-rolled HTML/CSS; the list is the existing `dataTable`/row pattern reflowing to cards; **no library**. **PASS** |
| No real API/auth/permissions/CRUD/persistence | Fixtures only; attend/absent/cancel/reschedule/notify/feedback/make-up = demo-with-toast / confirm→demo / disabled-with-reason; **no status mutation, no attendance/outcome/reschedule/make-up/finance engine**. **PASS** |
| No portals/role dashboards | Admin attendance **page** only; student/family/teacher portals + dashboards stay `future-role`, **never rendered** (smoke-asserted absent). **PASS** |
| No dead links (NI2/IP8) | The NI12 `attendance` promotion satisfies the build-time guard; `sessionsAnalysis` + the rest stay Soon; every control acts/demos/disabled-with-reason. **PASS** |
| Arabic RTL first + English LTR; Light/Dark/System | Logical CSS; labeled outcome status (never numeric/color-only); validated per surface; the AR label «الحضور ونتائج الجلسات» / «الحضور» is verified (no RTL-reversed wording). **PASS** |
| No copied legacy assets/classes/logo/wording/numeric statuses | Original tokens/markup; the legacy 11-state + numeric `status=0..N` codes are NOT imported; avoid-list in `scope-guard.md`. **PASS** |
| Screenshot-based visual acceptance | Mandatory matrix + failure conditions in `screenshot-acceptance.md`. **PASS** |

No gate violations → **Complexity Tracking is empty**.

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/005-attendance-session-outcomes/
├── plan.md                 # This file
├── spec.md                 # Approved Spec 005
├── research.md             # Phase 0 output (R32–R43, extending 002 R1–R10 + 003 R11–R19 + 004 R20–R31)
├── data-model.md           # Phase 1 output (fixture display shapes)
├── quickstart.md           # Phase 1 output
├── contracts/              # Phase 1 output (11 contracts)
└── checklists/requirements.md
```

### Source Code (extends the Spec 001–004 app, in place)

New/changed files under `academy-dashboard-discovery/app/` (existing files unchanged unless noted):

```text
app/
├── src/js/
│   ├── nav.config.js                  # CHANGE: add+promote `attendance` (control category, status:implemented + route:'attendance.html'; add to FUTURE_ROUTES); `sessionsAnalysis` + rest stay planned
│   ├── enhance.js                     # EXTEND: a tiny `[data-filter-set]` hook (summary tile → set a filter facet + re-apply); reuse the existing drawer/confirm/demo/disabled/toast branches (no new engine)
│   ├── pages/
│   │   ├── attendance.js              # NEW — renderAttendance() (page header + outcome summary tiles-as-filters + filterBar + outcome list/card hybrid + states + baked outcome drawer templates)
│   │   ├── sessions.js                # CHANGE: a SECONDARY outcome chip per row (when a recorded outcome exists) + rows open the canonical outcome drawer + a "View attendance" deep-link
│   │   ├── student.js                 # CHANGE (light): a fixture recent-outcomes/attendance hint (in the existing Timetable/Overview area) + a "View attendance" deep-link
│   │   ├── family.js                  # CHANGE (light): a fixture children follow-up hint + a "View attendance" deep-link
│   │   └── dashboard.js               # CHANGE (minimal): ONE outcome signal (fold a "needs follow-up today" count into the existing people-signal card) + the Today's Sessions rows can carry an outcome chip
│   ├── components/
│   │   ├── outcome-status.js          # NEW — the OUTCOME status map (attended/studentAbsent/teacherAbsent/cancelled/rescheduled/upcoming/live + makeUpSuggested/needsFollowUp flags → tone+icon+label) + outcomeChip()
│   │   ├── outcome-details.js         # NEW — outcomeTemplate(item): the ONE canonical outcome drawer (a SUPERSET of the appointment rows + an outcome section: outcome chip + who-absent/who-cancelled attribution + present/capacity + make-up/credit hint + follow-up + notes/feedback) + a status-gated action cluster
│   │   ├── outcome-row.js             # NEW — the attendance list/card-hybrid row (time/date · session+course · teacher · student/family link · outcome chip · attention/follow-up flag · row menu → opens the outcome drawer), with facetAttrs
│   │   └── (reuse) pageHeader / summaryCards / filterBar / dataTable / cardGrid / chip / states / confirmAction / toast / previewTemplate+sheetRow / appointment-details rows / avatar / attentionFlag / statusChip
│   └── fixtures/
│       └── attendance.js              # NEW — SESSION_OUTCOMES (≥12 rows spanning every outcome state; reuse the session shape; resolve studentId→STUDENTS + familyId→FAMILIES + teacher refs) + the derived OUTCOME_SUMMARY counts
├── src/styles/app.css                 # EXTEND — .outcome-row (+ card reflow), the outcome chip tones, the summary-tile-as-filter affordance, mobile reflow
├── src/locales/{ar.att.js,en.att.js}  # NEW overlay (merged in i18n.js, like ar.fam.js) — `att.*`/`outcome.*` namespace + page `topbar.title/crumb.attendance` + the nav label
├── scripts/build-html.mjs             # EXTEND: register `{base:'attendance', activeId:'attendance', titleKey, crumbKey, render: renderAttendance}` (ar+en)
├── public/                            # +2 generated pages (attendance × ar/en) + regenerated sessions/student/family/dashboard
└── tests/                             # EXTEND — smoke (attendance page + outcome asserts) + capture matrix (Spec 005 frames) + a11y coverage
```

**Structure Decision**: Extend the Spec 001–004 app **in place**. The Attendance page is an **NI12 promotion** of a NEW `attendance` nav item in the **`control` category** (daily operations, beside `sessions`/`schedule`); `sessionsAnalysis` stays planned. The **outcome details drawer is canonical** — `outcomeTemplate()` is a **superset of the Spec 003 appointment drawer** (it renders the same session field-rows plus an outcome section + a status-gated action cluster, and degrades to the plain appointment view when a session has no recorded outcome). To avoid duplicating the appointment field-rows, the shared rows are factored into a small reusable helper imported by both `appointment-details.js` and `outcome-details.js`. The **Attendance and Sessions** pages use the canonical outcome drawer; the **Schedule/Timetable** page keeps its existing appointment drawer (pure scheduling); the **profiles deep-link** to Attendance/Schedule rather than carrying a bespoke outcome drawer — satisfying "one consistent drawer pattern, no bespoke per-page drawers." Every panel/tile/row/template is baked; `enhance.js` gains only a tiny **`data-filter-set`** tile→filter hook (the filter, drawer, confirm, demo, disabled, and toast behaviors are all reused as-is). This guarantees visual + architectural continuity and keeps everything GitHub-Pages and Django ready.

## Complexity Tracking

No constitution/constraint violations — intentionally empty.

## Phase Notes

- **Phase 0 (research.md)** records the Spec-005-specific decisions **R32–R43** (the new Attendance page + `control`-category nav promotion; the labeled OUTCOME status map collapsing the legacy 11-state; the outcome-vs-session status primary/secondary rule; the canonical outcome drawer as a superset of the appointment drawer + the shared-rows helper; the status-gated demo action cluster; make-up/credit as a display hint; the tile-as-filter `data-filter-set` hook; the outcome list/card hybrid; the Sessions/Student/Family integrations; the minimal dashboard impact; tests/screenshots), extending Spec 002 R1–R10 + Spec 003 R11–R19 + Spec 004 R20–R31 (inherited unchanged). No `NEEDS CLARIFICATION` remained in the spec.
- **Phase 1 (data-model.md, contracts/, quickstart.md)** defines the new fixture display shapes, the **eleven** binding contracts, and the updated build/preview/screenshot workflow.
- **Phase 2 (tasks)** is **NOT run here.** `/speckit.tasks` will generate `tasks.md` later.

## Dashboard Impact Review (plan-level decision)

**Changes now (active, fixture-backed):** (1) **one** small fixture-backed signal — a **"needs follow-up today"** count chip (derived from the `followUp` / absence flags already in `SESSION_OUTCOMES`) linking to the filtered Attendance surface — folded into the **existing Spec 004 people-signal card** (no new card/tile/row); (2) the existing **Today's Sessions** rows MAY carry a small **outcome chip** and open the **canonical outcome drawer** (reuse, not a new module). **Deferred / out:** real attendance rates, real at-risk detection, finance/credit/salary signals, Sessions-Analysis count+hours roll-ups, and any portal/role dashboard. **No new stat wall, no fake/unbacked finance/credit widget, no real attendance metrics.**
**Why:** the dashboard already surfaces Today's Sessions + the people-signal; the right impact is *connecting* it to the new Attendance surface + one tiny fixture-backed signal — not new clutter.

## Navigation / Sidebar / Topbar impact

- **Sidebar**: add+promote **`attendance`** (status `implemented`, route `attendance.html`, route added to `FUTURE_ROUTES` at promotion) inside the **`control` category** (beside `home`/`sessions`/`schedule`); nav label **«الحضور» / "Attendance"**, icon a calm check/clipboard glyph (vendored from lucide). `sessionsAnalysis` and the rest of the `control` category **stay planned** (Soon buttons, no route). The build-time guard must pass. No new profile templates. No dead links.
- **Topbar**: unchanged structure; the apps-grid quick-launcher *may* add an Attendance cell (optional). No new clutter.
- **Shell invariant** preserved: exactly one visible `.cat-panel`, one `is-active[aria-current]`, six category tabs; the new page opens the `control` category via `categoryOf('attendance')`.

## Future direction note (out of scope, do not implement now)

Student/Family/Teacher **portals and role dashboards** stay `future-role` (never rendered). The legacy real **attendance / outcome-workflow / reschedule / make-up** engines, the **finance/credit/accounting/salary** ledgers, **Sessions Analysis** as a built page, and the enter-time/queue/proof-video workflows are out of scope. When the role experiences are specified later they MUST feel cheerful, comfortable, simple, and human — not this admin UI.

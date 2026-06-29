# Implementation Plan: Families and Student Academic Profiles

**Branch**: `feature/001-approved-dashboard-design` | **Date**: 2026-06-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/004-family-student-profiles/spec.md`

## Summary

Build the admin-facing **Families & Students academic management** experience on the implemented Spec 001/002/003 app (`academy-dashboard-discovery/app/`), grounded in the analyzed academy reference (a **family-centric model**: Family = the guardian/parent account; students are children nested under one family) but cleaner, calmer, more premium, and academy-specific. Adds five surfaces: a **Families directory** (`families.html` — family cards that group each family's children), a **Family profile hub** (`family.html` — tabbed: Overview / Students / Schedule / Plan&Billing / Notes), an **Add-Family wizard** (`add-family.html` — a baked multi-step demo flow), an enriched **Students directory** (`students.html` — real `familyId` + family facet + profile link), and a **Student academic profile** (`student.html` — tabbed: Overview / Courses / Timetable / Results / Evaluation / Family / Notes). Results = fixture-only progress + certificates; Evaluation = a fixture-only monthly progress-report rubric (no gradebook — the reference has none). Timetable sections reuse Spec 003's `scheduleAgenda` + the shared appointment drawer + a `schedule.html#view=timetable` deep-link. Dashboard impact stays minimal + fixture-backed.

Technical approach: preserve the **static HTML-first / GitHub-Pages / Django-ready** architecture exactly. Every list, card, profile tab, **wizard step**, and `<template data-preview>` drawer is **baked into the static `public/*.html` at build time** by the existing SSG (`scripts/build-html.mjs`); runtime `enhance.js` only **switches profile tabs (reusing the Spec 003 tabs engine), advances/retreats wizard steps, filters pre-rendered cards/rows, opens drawers/modals, and shows demo/disabled feedback**. New components — a **family-card**, a shared **profile-banner**, a **wizard** stepper, labeled **form-field** helpers, an **evaluation-rubric**, a **result-summary**, and a **family/student status map** — compose existing Spec 001/002/003 atoms (`pageHeader`, `filterBar`, `cardGrid`/`directoryCard`, `dataTable`, `tabs`, `previewTemplate`, `scheduleAgenda`, `appointmentTemplate`, `chip`, `states`, `ui`). A new **Family fixture** + extended **Student fixture** (real `familyId` + academic fields) back it. Quality is enforced by the existing build + smoke + axe + screenshot pipeline, extended for the new pages, the profile tabs, and the wizard.

## Technical Context

**Language/Version**: HTML5, CSS3, native JavaScript (ES2022 modules). Node.js (tooling only). **No TypeScript.**
**Primary Dependencies**: Tailwind CSS 3 + PostCSS + Autoprefixer + postcss-import (build only); Playwright + `@axe-core/playwright` (tests); `@fontsource/tajawal` + `lucide-static` (vendored locally). **No runtime framework, no SPA, no chart/table/form/calendar library, no CDN.** (All inherited from Spec 001/002/003 — **no new dependencies**.)
**Storage**: N/A. Display data from static JS fixtures. Preferences persist in `localStorage` (theme/language/sidebar rail/nav category/selected-tab — unchanged; the profile tabs reuse the existing `academy.schedView.<page>` tab key; the wizard step is transient).
**Testing**: Playwright (screenshot matrix + DOM smoke for tabs/wizard/cards/filters/drawers/no-dead-button/no-raw-i18n-key/no-external-request/keyboard), axe-core (a11y), and **mandatory manual screenshot review** vs the Spec 001/002/003 approved design + the old-system family/student screenshots (product reference only).
**Target Platform**: Modern evergreen browsers; responsive desktop/tablet/mobile (family cards → single column; profile tabs scroll/stack; wizard one step per screen).
**Project Type**: Static multi-page web frontend (extends the Spec 001/002/003 app in place; no backend tier).
**Performance Goals**: Fast first paint (static, self-hosted assets); **zero layout shift** on theme/direction/tab/step switch; instant client-side tab/step toggle + fixture filtering; small payload (no framework/chart/form libs).
**Constraints**: Arabic RTL default + English LTR; Light/Dark/System; offline-capable (relative + local assets, no CDN); fixtures only; **static HTML-first, no whole-page JS mount, baked wizard steps + profile tabs**; GitHub-Pages compatible; Django-template-ready; visual output must match Spec 001/002/003 and improve on the legacy reference; **no portals/role dashboards, no real engines**.
**Scale/Scope**: Pages added = **`families` + `add-family` + `family` + `student` (× ar/en = 8 new `public/*.html`)** + the enriched `students` + a minimal `dashboard` change; ~7 new components; 1 new fixture (`families.js`) + 1 extended (`students.js`); 2 nav promotions; **12 contracts**; ≥13 acceptance screenshots.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`.specify/memory/constitution.md`) is still an **unfilled template**. Per the standing instruction, the **Spec 001 + 002 + 003 constraints are the binding gates**:

| Gate (binding constraint) | Plan compliance |
|---|---|
| Continue the approved Spec 001/002/003 design | Reuses the shell/tokens/components; new cards/profiles/wizard use the approved tokens + status maps; screenshot acceptance compares to Spec 001/002/003. **PASS** |
| Static HTML-first; no whole-page JS mount | Families/family/add-family/student pages + profile tabs + **all wizard steps** + drawer templates are baked into complete `public/*.html`; no `<div id="app">`; SSG via `build-html.mjs`. **PASS** |
| Runtime JS enhances only | `enhance.js` only toggles tabs/steps, filters pre-rendered cards/rows, opens drawer/confirm, toasts/disabled-reason; **builds no page DOM**. **PASS** |
| Per-language pre-rendered pages | Each page generated `*.html` (ar) + `*.en.html` (en); language toggle navigates. **PASS** |
| Relative asset paths / local only / no CDN | `./assets/...`; vendored fonts/icons; no-external-request smoke test. **PASS** |
| GitHub-Pages compatible | Self-contained `public/` + `.nojekyll`; `deploy:pages`. **PASS** |
| Django-template-ready | Lists → `{% for family/student/child %}`; profile tabs + wizard steps → static sections / `{% if %}`; shell → partials; fixtures → context; stable `data-*` hooks. **PASS** |
| Native JS only; no TS/SPA | ES modules, no framework, no router. **PASS** |
| **No chart/table/form/calendar library** | Family cards/tables hand-rolled; the wizard is a baked stepper (no form lib); progress visuals via existing hand-rolled SVG/CSS; the rubric is plain HTML/CSS. **PASS** |
| No real API/auth/permissions/CRUD/persistence | Fixtures only; create/edit/save/enroll/approve = demo-with-toast or disabled-with-reason; **no enrollment/grade/evaluation/attendance/finance engine**. **PASS** |
| No portals/role dashboards | Admin family/student **pages** only; student/family/teacher portals + dashboards stay `future-role`, **never rendered** (smoke-asserted absent). **PASS** |
| No dead links (NI2/IP8) | NI12 promotions satisfy the build-time guard; planned items stay Soon buttons; profile templates reached via real links; every control acts/demos/disabled-with-reason. **PASS** |
| Arabic RTL first + English LTR; Light/Dark/System | Logical CSS; labeled status (never numeric/color-only); validated per surface. **PASS** |
| No copied legacy assets/classes/logo/wording | Original tokens/markup; legacy family/student screens are structural reference only; avoid-list in `scope-guard.md`. **PASS** |
| Screenshot-based visual acceptance | Mandatory matrix + failure conditions in `screenshot-acceptance.md`. **PASS** |

No gate violations → **Complexity Tracking is empty**.

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/004-family-student-profiles/
├── plan.md                 # This file
├── spec.md                 # Approved Spec 004
├── research.md             # Phase 0 output (R20–R31, extending 002 R1–R10 + 003 R11–R19)
├── data-model.md           # Phase 1 output (fixture display shapes)
├── quickstart.md           # Phase 1 output
├── contracts/              # Phase 1 output (12 contracts)
└── checklists/requirements.md
```

### Source Code (extends the Spec 001/002/003 app, in place)

New/changed files under `academy-dashboard-discovery/app/` (existing files unchanged unless noted):

```text
app/
├── src/js/
│   ├── nav.config.js                  # CHANGE: promote families→families.html + addFamily→add-family.html (status:implemented + route; add add-family.html to FUTURE_ROUTES); rest of families category stays planned
│   ├── enhance.js                     # EXTEND: wizard stepper (data-step-next/prev over the existing tab engine); profile tabs reuse the tab engine as-is
│   ├── pages/
│   │   ├── families.js                # NEW — renderFamilies() (family cards directory)
│   │   ├── family.js                  # NEW — renderFamily() (family profile hub, tabbed)
│   │   ├── add-family.js              # NEW — renderAddFamily() (baked multi-step wizard)
│   │   ├── student.js                 # NEW — renderStudent() (student academic profile, tabbed)
│   │   ├── students.js                # CHANGE: family link + family facet + "view profile" → student.html (keep drawer)
│   │   └── dashboard.js               # CHANGE (minimal): deep-link to families + a fixture attention chip
│   ├── components/
│   │   ├── family-card.js             # NEW — family-as-hero card (guardian + grouped child chips + counts + status + attention)
│   │   ├── profile-banner.js          # NEW — shared profile banner (avatar + name + status + KPIs + actions) for family + student
│   │   ├── wizard.js                  # NEW — baked stepper (step indicator + panels + Next/Back/Save)
│   │   ├── form-field.js              # NEW — labeled field helpers (text/select/textarea/toggle) over .field-label/.input/.select-input
│   │   ├── evaluation-rubric.js       # NEW — monthly progress-report rubric (criteria rows + calm rating pills)
│   │   ├── result-summary.js          # NEW — results (per-course progress + certificates + level/term summary)
│   │   ├── family-status.js           # NEW — family/student lifecycle status map (active/trial/suspended/stopped/inactive → tone+icon+label)
│   │   └── (reuse) tabs / cardGrid / directoryCard / dataTable / filterBar / pageHeader / previewTemplate / scheduleAgenda / appointmentTemplate / chip / states / ui
│   └── fixtures/
│       ├── families.js                # NEW — FAMILIES (guardian + studentIds + category + status + contact + plan stub + attention) + FAMILY_CATEGORIES
│       └── students.js                # EXTEND — real familyId + academic fields (courses, upcoming session refs, results/certificates, evaluation rubric, notes)
├── src/styles/app.css                 # EXTEND — .family-card, .profile-banner, .wizard/.wiz-step/.wiz-dots, .rubric/.rating-pill, .result-*, profile layout, mobile reflow
├── src/locales/{ar.extra.js,en.extra.js} # EXTEND — fam/result/eval namespaces + page titles/crumbs (families/family/add-family/student); promote labels
├── scripts/build-html.mjs             # EXTEND: register families/family/add-family/student pages (ar+en); family/student activeId = families/students
├── public/                            # +8 generated pages (families/add-family/family/student × ar/en) + regenerated students/dashboard
└── tests/                             # EXTEND — smoke (new pages + tabs/wizard/family-card asserts) + capture matrix (Spec 004 frames) + a11y coverage
```

**Structure Decision**: Extend the Spec 001/002/003 app **in place**. The Families/Add-Family pages are **NI12 promotions** of existing planned nav items; `family.html`/`student.html` are **new per-entity profile templates** (the codebase's first profile-page pattern) registered in the SSG with `activeId` keeping the families/students nav active, reached by "view profile" links (Django later → `family/<id>`/`student/<id>`). Every panel/step is baked; `enhance.js` gains only a tiny **wizard stepper** (the profile tabs reuse the Spec 003 tab engine unchanged). This guarantees visual + architectural continuity and keeps everything GitHub-Pages and Django ready.

## Complexity Tracking

No constitution/constraint violations — intentionally empty.

## Phase Notes

- **Phase 0 (research.md)** records the Spec-004-specific decisions **R20–R31** (Family entity + `familyId` link; family-card-as-hero; profile pages vs drawers; the tabbed profile mechanism reusing the Spec 003 tabs engine; the baked wizard stepper; labeled form-field helpers; the family/student status map; results = fixture progress/certificates; evaluation = the fixture rubric; family-categories as a facet; timetable linkage reuse; minimal dashboard impact; tests/screenshots), extending Spec 002 R1–R10 + Spec 003 R11–R19 (inherited unchanged). No `NEEDS CLARIFICATION` remained in the spec.
- **Phase 1 (data-model.md, contracts/, quickstart.md)** defines the new fixture display shapes, the **twelve** binding contracts, and the updated build/preview/screenshot workflow.
- **Phase 2 (tasks)** is **NOT run here.** `/speckit.tasks` will generate `tasks.md` later.

## Dashboard Impact Review (plan-level decision)

**Changes now (active, fixture-backed):** (1) a **deep-link** from an existing dashboard affordance to `families.html` (e.g., the welcome/secondary area or a "view all" on a students-related signal); (2) the existing Today's Sessions rows already open the **shared appointment drawer**, which now carries family context (no change needed); (3) **one** small fixture-backed **"students needing attention"** count chip (derived from the `attention` flags already in the student/family fixtures) linking to the Students/Families filtered surface. **Deferred / out:** real attendance/finance/credits signals, real at-risk detection, "new families" feeds, and any portal/role dashboard. **No new stat wall, no fake/unbacked finance widget.**
**Why:** the dashboard already surfaces sessions/students; the right impact is *connecting* it to the new Families/Students surfaces + one tiny fixture-backed signal — not new clutter.

## Navigation / Sidebar / Topbar impact

- **Sidebar**: promote `families` (planned→implemented, route `families.html`) and `addFamily` (planned→implemented, route `add-family.html` — added to `FUTURE_ROUTES` at promotion) within the **`families` category**; `students`/`courses` stay implemented; `familyCategories`, `groups`, `scheduleSearch`, `studentResult`, `studentEvaluation` **stay planned** (Soon buttons, no route). The build-time guard must pass. `family.html`/`student.html` are **not nav items** (profile templates; `activeId` = families/students). No dead links.
- **Topbar**: unchanged structure; the apps-grid quick-launcher *may* add a Families cell (optional). No new clutter.
- **Shell invariant** preserved: exactly one visible `.cat-panel`, one `is-active[aria-current]`, six category tabs; new pages open the families category via `categoryOf`.

## Future direction note (out of scope, do not implement now)

Student/Family/Teacher **portals and role dashboards** stay `future-role` (never rendered). The legacy billing/invoices/credits/feedback-meeting **workflows**, a full **Groups** module, and a real **grade/evaluation/attendance** engine are out of scope. When the role experiences are specified later they MUST feel cheerful, comfortable, simple, and human — not this admin UI.

# Academy Dashboard — Visual Foundation (Spec 001)

The approved academy admin dashboard foundation, shipped as a **static HTML site**:
HTML-first (real markup in every page, **not** a JS-mounted app), deployable to
**GitHub Pages / any static host**, openable with **VS Code Live Server**, and
**Django-template-ready**. Arabic RTL first, English LTR, Light/Dark/System.
Local Tailwind/PostCSS, native ES modules, **no CDN, no framework, no TypeScript,
no chart library**.

Spec: `../specs/001-approved-dashboard-foundation/`. Visual target: `../design-references/approved-dashboard/`.

## Architecture at a glance

- **Final client preview uses `public/`** — a built static site (`npm run build`).
- **Live Server opens `public/dashboard.html`** directly — no Node server required.
- **GitHub Pages** can publish `public/`; copy it to **`docs/`** via `npm run deploy:pages -- --out=../../docs`.
- **JavaScript only enhances existing markup** (`src/js/enhance.js`) — it creates **no page DOM**.
- **No JS-rendered empty app mount remains** (no `<div id="app">`); every page ships the full shell + sections as static HTML.
- **Pages are Django-template-ready** (see [Django portability](#django-portability)).

## How it works

- **Authoring** lives in `src/` (styles, components, fixtures, locales).
- A **static-site generator** (`scripts/build-html.mjs`) pre-renders each page to
  **complete static HTML** in `public/` — the shipped `.html` files contain the full
  shell + sections (slim icon rail + light nav panel + topbar, KPI cards, sessions
  table, tiles, reports, states). No page DOM is created at runtime.
- The browser loads `public/assets/js/enhance.js`, which **only enhances** the
  existing markup: theme switch, language switch, icon-rail collapse + off-canvas
  nav drawer, dropdowns, modal, filter/table demo feedback, and the no-dead-button
  catch-all.
- **i18n**: one pre-rendered page per language — `dashboard.html` (Arabic, default)
  and `dashboard.en.html` (English). The language toggle navigates between them;
  theme persists across the switch.
- All asset paths are **relative** (`./assets/...`), so the site works at a GitHub
  Pages project URL (`user.github.io/repo/`) and under Live Server.

## Build → preview (Live Server, no server needed)

```bash
npm install
npm run build          # vendor fonts/icons → copy assets → compile CSS → generate public/*.html
```

Then **open `public/dashboard.html` with VS Code Live Server** (right-click → "Open with Live Server").
No Node server required. (Other pages: `public/reports.html`, `public/gallery.html`,
and the English variants `*.en.html`.)

Prefer a Node server instead? `npm run preview` → http://localhost:4178.

> Note: open via an HTTP host (Live Server / `npm run preview`), not `file://` —
> ES modules need http. The page **content** renders without JS; only the
> interactive behaviors need the http origin.

## Deploy to GitHub Pages

```bash
npm run build
npm run deploy:pages -- --out=../../docs    # or any folder; copies public/ there
```

`public/` is a self-contained static site (relative paths + `.nojekyll`). Publish it
via your Pages source (repo `/docs`, a `gh-pages` branch, or a Pages action).

## Test & screenshots

```bash
npm test               # smoke + a11y
npm run test:smoke     # no raw i18n keys · no external (CDN) requests · no dead buttons · disabled-with-reason
npm run test:a11y      # axe-core — fails on any critical violation
npm run screenshots    # capture the acceptance matrix → screenshots/  (review vs the approved PNG)
```

See `screenshots/REVIEW.md` and `../specs/.../contracts/screenshot-acceptance.md`.

## Django portability

The generated pages map straight to Django templates:

- `public/dashboard.html` → `templates/admin/dashboard.html`, `public/reports.html` → `templates/admin/reports.html`.
- **Spec 002 admin pages** (same mapping): `sessions.html`, `schedule.html`, `students.html`, `teachers.html`, `courses.html`, `settings.html` (+ each `.en.html`) → `templates/admin/<page>.html`. Their lists (session rows, schedule blocks, student/teacher/course cards, settings rows, preview `<template>`s) become `{% for %}` loops; filters/drawers/modals stay client-side over the same `data-*` hooks; fixtures (`src/js/fixtures/*`) → Django view context.
- **Spec 004 families & student academic profiles**: `families.html`, `add-family.html`, `family.html`, `student.html` (+ each `.en.html`) → `templates/admin/<page>.html`; `students.html`/`dashboard.html` are regenerated (enriched). Mapping:
  - **Families** (`families.html`) — the family **cardGrid** → `{% for family in families %}`, each card's grouped children → `{% for child in family.students %}` with the **"+N" overflow precomputed in context** (never JS); facets (`data-status`/`data-category`/`data-search`) emitted server-side; the family/student **lifecycle status** (`active/trial/suspended/stopped/inactive`) resolves through a template tag/filter (icon + label, never numeric/color-only).
  - **Family / Student profiles** (`family.html`/`student.html`) are the codebase's first **per-entity profile templates** — registered SSG pages (NOT nav items; `activeId` = `families`/`students`) reached via "view profile" links, baking **one representative** entity. In Django they become `family/<id>` / `student/<id>` views over one `Family`/`Student` (+ `family.students` / `student.family`). The **tabs** (family: Overview/Children/Schedule/Plan&Billing/Notes; student: Overview/Courses/Timetable/Results/Evaluation/Family/Notes) are baked `role="tabpanel"` sections → static sections or `{% if view == "results" %}…{% endif %}` (default Overview); the tab engine only toggles visibility (`#view=` hash + `localStorage['academy.schedView.<group>']`). **Results** (`{% for course in student.results.courses %}` progress bars with baked `--pct`, `{% for cert in student.results.certificates %}`) and **Evaluation** (`{% for c in student.evaluation.criteria %}` rating pills) are **fixture display only — no gradebook/engine**.
  - **Add-Family wizard** (`add-family.html`) — all five steps are baked `[data-step]` panels → static sections / `{% if step == "children" %}…{% endif %}` (default Identity); the tiny `data-step-next`/`data-step-prev` stepper toggles visibility (transient `#step=` hash, **not persisted**); every field is a labeled `form-field`; "Save" stays a `data-demo-action` demo toast (**no server write**).
  - **Timetable** sections reuse the Spec 003 agenda loop (server-filtered to that family/student) + **one** shared `{% include "admin/_appointment_details.html" %}` drawer partial; "View in schedule" is a language-aware link to `{% url 'schedule' %}#view=timetable`. Nav promotes `families`/`addFamily` (`{% url %}` anchors); the rest of the families category stays planned; no `future-role` portal is emitted.
- **Spec 007 teacher performance & academic KPIs**: `teacher.html` (profile template) + `teacher-performance.html` (promoted `teacherKpi` nav page) (+ each `.en.html`) → `templates/admin/<page>.html`; `teachers.html`/`dashboard.html` are regenerated (enriched). Mapping:
  - **Teachers** (`teachers.html`) — the enriched `directoryCard` grid → `{% for teacher in teachers %}`; the **teacher-status** (`active/paused/inactive`), **workload** (`light/balanced/high`), and **follow-up** (`strongDelivery/stable/needsFollowUp/attentionRisk`) chips each resolve through a template tag (icon + label, never numeric/color-only); the academic counts (courses/groups/active-students/upcoming) come from the view context; "View profile" is a language-aware `{% url 'teacher' teacher.id %}`. **No salary/finance field, no computed score.**
  - **Teacher profile** (`teacher.html`) is a per-entity profile template (NOT a nav item; `activeId = teachers`) → `teacher/<id>`. The 8 baked tabs (Overview/Courses/Groups/Timetable/Sessions&Outcomes/Students/Follow-up/Notes) → static sections / `{% if view == "students" %}…{% endif %}` (default Overview); **Timetable** reuses the Spec 003 agenda + the shared `_appointment_details.html` drawer; **Sessions & Outcomes** reuses the Spec 005 `{% for outcome in teacher.outcomes %}` rows + **one** shared `{% include "admin/_outcome_details.html" %}` canonical drawer (teacher-absent vs student-absent stay two distinct labeled chips); Courses/Groups/Students link to `course/group/student`/`family`. It is an **admin profile, not a teacher portal**.
  - **Teacher Performance** (`teacher-performance.html`, the promoted `teacherKpi`) — the KPI **tiles** + the per-teacher **comparison** list (`{% for row in teacher_perf %}`, each → `teacher/<id>`) + the **follow-up queue** are display-only **fixture counts** — **no computed score, ranking, percentile, chart, or salary**; filtering stays client-side over the existing facet hooks. The dashboard gains **one** fixture "teachers needing follow-up" chip folded into the existing people-signal card → `teacher-performance.html`.
- **Spec 008 academic reports shell** (`reports.html`, the enriched in-place `reports` page; **no new page, no `build-html.mjs`/`nav.config.js`/`dashboard.js` change**) → `templates/admin/reports.html`. Mapping:
  - The **academic-operations overview** → `{% for tile in academic_ops %}`; the **report-category cards** → `{% for category in report_categories %}` → `_report_card.html` with `{{ category.availability|report_availability_chip }}` (`available` → real `{% url %}`; `planned`/`backendRequired` → a disabled-with-reason block, never a dead `#`); the **per-area sections** → `{% for section in report_sections %}` of `{% include %}` blocks with `{{ section.signal|report_signal_chip }}`. The roll-up is a context dict `report_summary` — **every number equals an existing fixture export and matches the dashboard chips** (no server-side aggregation beyond the same roll-ups).
  - Source links are language-aware `{% url 'attendance' %}` / `{% url 'sessions' %}` / `{% url 'schedule' %}#view=timetable` / `{% url 'courses' %}` / `{% url 'groups' %}` / `{% url 'teacher-performance' %}` / `{% url 'students' %}` / `{% url 'families' %}` (+ `teacher`/`student`/`family` profile urls). The honest actions (Print = demo · Export CSV/PDF/Share = disabled-with-reason · Schedule = confirm→demo) are static markup wired by `enhance.js`. **No reporting/analytics/aggregation/export/BI engine, no chart/canvas, no computed grade/ordering/percentile/trend, no finance/revenue/salary report** (the legacy `revenue` card is removed); teacher-absent vs student-absent stay two distinct labeled chips. The `reports` nav item is unchanged; `monthlyReports`/`dataAnalysis` stay planned, surfaced as disabled-with-reason cards.
- The shell (slim **category icon rail** + light **category panel** + topbar) is three markup blocks → extract to `{% include "admin/_nav_rail.html" %}` / `_nav_panel.html` / `_topbar.html`. Each of the six category panels maps to a Django **partial** (or a `{% if cat == "control" %}…{% endif %}` block); the rail is a loop over the six categories.
- **Navigation is a two-level category rail**, data-driven from `src/js/nav.config.js` (`NAV_CATEGORIES`): a slim rail of **six category tabs** (control / families / teachers / reports / admin / settings) beside a panel that shows **ONLY the selected category's links** — never all categories at once. Each item carries a `status` — `implemented` (real `<a href>` page), `planned` (a «قريبًا/Soon» button, no route, no dead link), `disabled` (locked, disabled-with-reason), `future-role` (portals — never rendered), or `hidden` (documented, not shown). All six category panels are **baked into the static HTML**; client-side, only the selected category renders (the rest carry `hidden`) — swapped purely via the `data-nav-category` (rail tab) / `data-nav-panel` (panel) hooks, no navigation. In Django this maps cleanly: `implemented`/`planned`/`disabled` are emitted server-side, with planned/disabled gated as `{% if perms %}` blocks or **disabled partials** carrying the same `data-*` hooks (`data-coming-soon`, `data-disabled-reason`); `future-role`/`hidden` are simply not emitted. See `../specs/002-admin-core-operations/contracts/navigation-ia-contract.md` for the authoritative categories, items, statuses, the category-switching behavior, and the no-dead-link rule.
- `src/styles` → Django **static** CSS; `src/js` → Django **static** JS (enhancement only, attaches to the same markup via `data-*` hooks).
- Build-time **fixtures** (`src/js/fixtures/`) map to Django **view context**; the per-row markup (KPI/table/report loops) maps to `{% for %}`.
- Behavior hooks are `data-*` attributes (`data-action`, `data-row-menu`, `data-shell`, `data-nav`, …) — reproducible from Django with no JS-generated IDs.
- For i18n, Django can collapse the two per-language pages into one template with `{% trans %}` / `LocaleMiddleware`; the Arabic page is the canonical basis.

## Structure

```
src/styles/   tokens.css · base.css · app.css (Tailwind entry + component layer)
src/js/       enhance.js (runtime) · theme · i18n · components/ (render + widgets) · fixtures/
src/locales/  ar.js (default) · en.js          src/icons/ + src/fonts/  (vendored, no CDN)
scripts/      vendor-assets.cjs · build-assets.mjs · build-html.mjs · serve.cjs · deploy-pages.mjs
public/       BUILT static site (gitignored) — open with Live Server / publish to Pages
tests/        smoke/ · a11y/ · screenshots/
```

## Scope (Spec 001)

In: tokens, shell, base components, admin dashboard, reports overview, gallery,
RTL/LTR, Light/Dark/System, a11y, responsive, screenshot acceptance, static
preview + Django-readiness.

Out: real API/auth/permissions, business modules (students/families/teachers/
courses/attendance/finance), sessions lifecycle beyond fixtures, report detail
pages, portals, charts, CDN, TypeScript, SPA frameworks, copied legacy assets/wording.

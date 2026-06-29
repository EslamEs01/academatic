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

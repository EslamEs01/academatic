# Contract: Static HTML-first / GitHub Pages / Django-ready

**Status**: Binding · Spec 002 MUST preserve the Spec 001 delivery architecture. This is the non-negotiable structural contract.

## SD1. Static HTML-first

- Every page is **pre-rendered to a complete static HTML file** in `app/public/` by the SSG (`scripts/build-html.mjs`): the full shell + all page sections are real markup in the file.
- **No whole-page `<div id="app">` mount.** No runtime JavaScript builds the page DOM.
- Verified by a structure check: each `public/<page>.html` contains the sidebar, topbar, page header, and the page's primary content as static elements (and zero `id="app"` whole-page mounts).

## SD2. Runtime JS = enhancement only

- The browser loads `./assets/js/enhance.js`, which attaches behavior to existing markup via `data-*` hooks (filters, row menus, drawers, modals, confirm, demo actions, theme/lang/sidebar). It MAY create transient overlays (drawer/modal/popover/toast) but MUST NOT render page content.

## SD3. Per-language pre-rendered pages

- Each page is generated in Arabic (`<page>.html`, `lang="ar" dir="rtl"`, default) and English (`<page>.en.html`, `lang="en" dir="ltr"`). The language toggle navigates between them; theme persists via `localStorage`.

## SD4. Relative paths / local assets / GitHub Pages

- All asset references are **relative** (`./assets/app.css`, `./assets/js/enhance.js`, fonts `./fonts/...`, icon sprite inlined). Works at a GitHub Pages **project URL** (`user.github.io/repo/`). `public/` ships `.nojekyll` and is self-contained. **Zero external (CDN) requests.**
- `npm run deploy:pages -- --out=../../docs` copies `public/` to a Pages source (e.g. `/docs`).

## SD5. Build pipeline (extends Spec 001)

- `npm run build` = vendor assets → copy assets → compile Tailwind CSS → `build-html.mjs` generates **all** pages (Spec 001 + 002). The six new pages are added to the SSG `PAGES` list; no new build tool.
- Final client preview is `public/`; **Live Server opens `public/sessions.html`** (and the other pages) with no Node server required (`npm run preview` is the optional Node static server).

## SD6. Django-template readiness (mapping)

Each generated page maps cleanly to Django:

- `public/<page>.html` → `templates/admin/<page>.html`.
- The shell (sidebar + topbar + page-header) → `{% include "admin/_sidebar.html" %}` / `_topbar.html` / `_page_header.html` partials.
- Page lists (sessions rows, schedule blocks, student/trainer/course rows) → `{% for %}` loops; each row's `data-*` facets are reproduced server-side.
- `src/styles` → Django **static** CSS; `src/js` → Django **static** JS (enhancement only, attaches to the same markup).
- Build-time **fixtures** (`src/js/fixtures/`) → Django **view context**.
- Per-language pages → one template per page with `{% trans %}` / `LocaleMiddleware`; the Arabic page is the canonical basis.
- **No JS-generated IDs/classes** Django can't reproduce; behavior keys are stable `data-*` attributes.

## SD7. Enforcement

- `no-external-request` smoke test (SD4); HTML-structure check (SD1, no `id="app"`); per-language pages exist (SD3); relative-path check (SD4). These run on the new pages, not only Spec 001's.

# Contract: Static HTML-first / GitHub Pages / Django-ready (Timetable & Scheduling)

**Status**: Binding · Spec 003 EXTENDS the Spec 002 delivery architecture to the new scheduling surfaces (baked tab panels + a build-time-placed weekly timetable grid + baked agenda/drawer templates). This is the non-negotiable structural contract for Spec 003.

## SD1. Static HTML-first (every scheduling page is complete)

- Every scheduling page — `schedule.html` and `sessions.html` (each + its `.en.html`) — MUST be **pre-rendered to a complete static HTML file** in `app/public/` by the SSG (`scripts/build-html.mjs`): the full shell (category rail + panel + topbar + page header) **and** all page content are real markup in the file.
- **No whole-page `<div id="app">` mount.** No runtime JavaScript builds the page DOM, lays out the grid, or renders a tab panel/agenda/drawer body.
- Verified by a structure check: each page contains the sidebar, topbar, page header, the **tablist + all tab panels**, the **weekly timetable grid**, the **agenda list**, and every per-item `<template data-preview>` as static elements, with **zero** `id="app"` whole-page mounts.

## SD2. Tab panels are BAKED (no JS-rendered panel)

- Each scheduling surface MUST ship an accessible `role="tablist"` whose **every** `role="tabpanel"` (List, Timetable, and on Sessions the today's-timetable/agenda) is **real baked HTML** present in the file at build time.
- `enhance.js` MUST only **toggle panel visibility** (the inactive panel carries the `hidden` attribute) — it MUST NOT create, populate, or destroy panel content. With JS disabled, all baked panels remain reachable as anchored sections.
- Hooks: `data-tabs="<group>"`, `data-tab="<id>"`, `data-tabpanel="<id>"`, `data-view`. Selection persists in `localStorage['academy.schedView.<page>']` and is mirrored in the **URL hash** (`#view=list|timetable`); on load the hash wins, else storage, else the **List** default.

## SD3. Weekly timetable grid is placed at BUILD time (no runtime layout)

- The Timetable view MUST be a **hand-rolled CSS-grid weekly timetable** (a leading time-axis column + one day column per weekday, Sat-first) authored as semantic HTML — **no calendar library, no chart library, no drag-and-drop, no runtime-drawn grid.**
- Each block's placement (`grid-row` span over the **cropped** working-hours axis, and any `gridCol` overlap sub-index) MUST be **computed by the SSG at build time** and baked onto the block as a **class or inline custom property** (e.g. `style="--row:3 / 7"`). Runtime JS MUST NOT compute or apply any block geometry.
- The cropped axis (`floor(min start) … ceil(max end)`, fixed 30-min rows) is rendered as baked `TimeSlot` rows; time numerals stay LTR even in RTL. Hooks: `data-timetable`, `data-slot`, `data-teacher`.

## SD4. Agenda + per-item drawer templates are BAKED

- The mobile/Sessions **agenda** (single-day vertical block list) MUST be baked markup (`data-agenda`); JS only shows/hides days and filters pre-rendered blocks — it never builds the agenda.
- Every schedule block / session row MUST carry a hidden `<template data-preview="<id>">` containing its full **AppointmentDetails** payload as real markup. The drawer engine clones the template into a transient overlay on open; it MUST NOT fetch or assemble fields at runtime.

## SD5. enhance.js = enhancement only (closed allowlist)

`enhance.js` MAY ONLY: toggle tabs (`hidden`) + persist selection (`localStorage` + URL hash); show/hide & filter **pre-rendered** blocks/rows/agenda items; open the **drawer/sheet** (clone `<template data-preview>`, scrim, focus-trap, Esc, return-focus) and the **confirm modal**; fire **demo toasts** and surface **disabled-with-reason**; switch the teacher lens by filtering baked blocks; apply theme/language/sidebar state. It MAY create transient overlays (drawer/modal/popover/toast) but **MUST NOT render page content, draw the grid, or generate ids/classes Django can't reproduce.** Behavior attaches via stable hooks only: `data-tabs/-tab/-tabpanel/-view`, `data-timetable/-slot/-teacher`, `data-agenda`, `data-attention`, plus the existing `data-filter-form/-filter/-target/-filter-apply|reset|count`, `data-table/-row`, `data-row-menu`, `data-drawer/-preview/-sheet-close`, `data-modal-trigger/-confirm`, `data-demo-action`, `data-disabled-reason`, `data-toast`.

## SD6. Per-language pre-rendered pages

- Each scheduling page is generated in Arabic (`<page>.html`, `lang="ar" dir="rtl"`, default) and English (`<page>.en.html`, `lang="en" dir="ltr"`). The language toggle navigates between them; theme persists via `localStorage`. Grid columns/chevrons mirror via logical properties; times/numbers/dates are **never** mirrored.
- The reconciled Schedule label `الجدول الدراسي` / `Timetable` is baked into the nav item, page title, breadcrumb, and tab/section headings on the Arabic and English pages respectively; the nav **id and route stay `schedule` / `schedule.html`.**

## SD7. Relative paths / local assets / no CDN / no calendar lib

- All asset references MUST be **relative** (`./assets/app.css`, `./assets/js/enhance.js`, `./fonts/...`, inlined icon sprite). Pages MUST work from a GitHub Pages **project URL** (`user.github.io/repo/`). `public/` ships `.nojekyll` and is self-contained.
- **Zero external (CDN) requests.** No calendar/chart/drag-and-drop library, no remote font/script/style. The grid, agenda, and drawer use only local, compiled CSS/JS.

## SD8. Build pipeline (no new page)

- `npm run build` = vendor assets → copy assets → compile Tailwind CSS → `build-html.mjs` generates **all** pages. `schedule`, `sessions`, and `dashboard` are **already registered** in the SSG `PAGES` list — Spec 003 adds **no new page** (the teacher timetable is an in-page lens). No new build tool is introduced.
- Final client preview is `public/`; **Live Server opens `public/schedule.html`** with no Node server required.

## SD9. Django-template readiness (mapping)

Each generated scheduling page MUST map cleanly to Django:

- `public/<page>.html` → `templates/admin/<page>.html`; shell → `{% include "admin/_sidebar.html" %}` / `_topbar.html` / `_page_header.html` partials.
- **Tab panels** → static sections or `{% if view == "timetable" %} … {% endif %}` (default List); the tablist is plain markup.
- **Weekly grid** → `{% for day in week.days %}{% for block in day.blocks %}` with the **precomputed span** emitted as an inline `style="--row:{{ block.grid_row }}"` / class (never JS-computed); the axis from `{% for slot in week.axis.slots %}`.
- **List & agenda** → the same `{% for day %}{% for block %}` loops; the teacher lens is a server-side filter over the same blocks (no new endpoint).
- Build-time **fixtures** (`src/js/fixtures/`) → Django **view context**; per-item `<template data-preview>` → a `{% include "admin/_appointment_details.html" %}` partial per block/row.
- Per-language pages → one template per page with `{% trans %}` / `LocaleMiddleware`; the Arabic page is the canonical basis. `src/styles` → static CSS; `src/js` → static JS (enhancement only).
- **No JS-generated IDs/classes** Django can't reproduce; all behavior keys are stable `data-*` attributes.

## SD10. Enforcement & no-runtime-mount verification

- `no-external-request` smoke (SD7, also proves no calendar/chart lib loads); HTML-structure check (SD1/SD2/SD3) asserts the static shell + a `role="tablist"` with **≥2 tabs**, **exactly one** visible `tabpanel`, a present `[data-timetable]` grid with **baked block spans** (a `--row`/class present in source, not added by JS), a baked `[data-agenda]`, baked `<template data-preview>`s, and **no `id="app"`**; per-language pages exist (SD6); relative-path check (SD7). With JS disabled, View Source MUST show every panel, the full grid, the agenda, and the templates as real markup. These checks run on the scheduling pages, not only Spec 001/002's.

# Contract: Static HTML-first / GitHub Pages / Django-ready (Families & Student Academic Profiles)

**Status**: Binding · Spec 004 EXTENDS the Spec 002/003 delivery architecture to the new family/student surfaces — baked family cards, baked profile **tab panels**, ALL baked wizard **steps**, and baked `<template data-preview>` drawers — all real markup at build time. This is the non-negotiable structural contract for Spec 004; it is self-contained and supersedes nothing it does not name.

## SD1. Static HTML-first (every Spec 004 surface is complete)

- Every Spec 004 page — `families.html`, `family.html`, `add-family.html`, `student.html`, and the regenerated `students.html` + `dashboard.html` (each + its `.en.html`) — MUST be **pre-rendered to a complete static HTML file** in `app/public/` by the SSG (`scripts/build-html.mjs`): the full shell (category rail + panel + topbar + page header) **and** all page content are real markup in the file.
- **No whole-page `<div id="app">` mount.** No runtime JavaScript builds the page DOM, lays out a family card, renders a profile tab panel, assembles a wizard step, or populates a drawer body.
- Verified by a structure check (SD12): each page contains the sidebar, topbar, page header, and its surface-specific baked content — the family **cardGrid**, the profile **tablist + all tabpanels**, the wizard **stepper + all step panels**, and every per-item `<template data-preview>` — as static elements, with **zero** `id="app"` whole-page mounts.

## SD2. Family cards are BAKED (`families.html`)

- The Families directory MUST ship a baked `cardGrid` of **family cards** (`family-card`), each a complete static element carrying its facet attributes (`data-row`, `data-status`, `data-category`, `data-search`) and a "view profile" link (`<a href="family.html">`, language-aware).
- Each card MUST bake its **grouped children** (the family's child avatars/chips, with the overflow "+N" chip computed at **build time**, never assembled by JS), the guardian, the student & active-course counts, the labeled family-status chip (icon+label), and any fixture attention hint — all as real markup.
- `enhance.js` MUST only **show/hide and filter** these pre-rendered cards (SD7); it MUST NOT create, populate, reorder by fetch, or destroy a card. With JS off, every family card and its children render.

## SD3. Profile TABS are BAKED (`family.html` / `student.html`)

- The family profile and the student academic profile MUST each ship an accessible `role="tablist"` whose **every** `role="tabpanel"` is **real baked HTML** present in the file at build time — Family: **Overview · Students · Schedule · Plan & Billing · Notes**; Student: **Overview · Courses · Timetable · Results · Evaluation · Family · Notes**.
- These tabs reuse the **Spec 003 `tabs` widget** (`../../003-timetable-scheduling/contracts/schedule-tabs-contract.md`): baked panels, the existing `enhance.js` tab engine toggles visibility only — set/remove `hidden`, flip `aria-selected`, move roving `tabindex` — and MUST NOT render, build, or fetch any panel content. No new tab runtime is introduced.
- Hooks: `data-tabs="<group>"` (e.g. `family-view`, `student-view`), `data-tab="<id>"`, `data-tabpanel="<id>"`, `data-view="<token>"`. Selection persists in `localStorage['academy.schedView.<page>']` and is mirrored in the **URL hash** (`#view=overview|students|schedule|plan|notes` / `#view=overview|courses|timetable|results|evaluation|family|notes`); on load the hash wins, else storage, else the **Overview** default. Tab + panel ids are stable, build-baked, and **never JS-generated**. With JS off, every panel remains reachable as an anchored section.
- The **Results / Evaluation** panels are baked display markup (hand-rolled progress bars/rings, a certificates list, the rating-pill rubric) — **no chart/grade/evaluation engine** computes them at runtime; the Approve / export controls are demo-with-toast or disabled-with-reason (SD7).

## SD4. ALL wizard STEPS are BAKED (`add-family.html`)

- The Add/Edit-family wizard MUST ship **all five steps** — **Identity → Contact & Location → Children → Plan & Billing → Review** — as **pre-rendered static `role=tabpanel`-style panels** present in the file at build time, with a baked **step indicator** and every field carrying a **visible `<label>`** (improving the legacy's unlabeled inputs). The fields are a curated subset per step (`form-field` definitions), **not** a port of the ~30 legacy fields.
- Runtime adds only a tiny **stepper**: `data-step-next` / `data-step-prev` controls find the active step and advance/retreat it via the **same tab-selection logic** as SD3 (no new engine, no form library, no validation). `data-wizard` marks the container; the active step is mirrored in the URL hash so a deep link can open a specific step. `enhance.js` MUST NOT create, populate, validate, or submit a step.
- The wizard "Save"/submit MUST be `data-demo-action` → a clearly-labeled **demo toast**; backend-bound controls are `data-disabled-reason`. **No persistence, no draft storage.** With JS off, all steps render as anchored sections (graceful degradation).

## SD5. `<template data-preview>` drawers are BAKED (quick-peek + shared appointment drawer)

- The **quick-peek** path is preserved: each `students.html` row (and any card offering a peek) MUST carry a hidden `<template data-preview="<id>">` containing its full preview payload as **real baked markup** (`previewTemplate` + `sheetRow`). The drawer engine clones the template into a transient overlay on open; it MUST NOT fetch or assemble fields at runtime.
- A student's **session** detail MUST reuse the **one shared `appointmentTemplate` drawer** (`../../003-timetable-scheduling/contracts/appointment-details-contract.md`) — which already renders a `familyKey` row — baked once per session item; no per-profile bespoke drawer is introduced.
- The trigger carries `data-drawer="<id>"` / `data-preview="<id>"`; activation calls the existing `openSheet(id)`. This is enhancement-only: with JS off the trigger and the baked template content still exist as real markup; no drawer is JS-rendered as page content.

## SD6. Profile pages registered in the SSG (`activeId` = families/students; NI12 promotions)

- Four pages are added to the `PAGES` registry in `scripts/build-html.mjs` as `{ base, activeId, titleKey, crumbKey, render }`:
  - `{ base: 'families', activeId: 'families', titleKey: 'topbar.title.families', crumbKey: 'topbar.crumb.families', render: renderFamilies }`
  - `{ base: 'add-family', activeId: 'addFamily', titleKey: 'topbar.title.addFamily', crumbKey: 'topbar.crumb.addFamily', render: renderAddFamily }`
  - `{ base: 'family', activeId: 'families', titleKey: 'topbar.title.family', crumbKey: 'topbar.crumb.family', render: renderFamilyProfile }`
  - `{ base: 'student', activeId: 'students', titleKey: 'topbar.title.student', crumbKey: 'topbar.crumb.student', render: renderStudentProfile }`
- `family.html` and `student.html` are **registered pages, NOT nav items** — they carry `activeId: 'families'` / `activeId: 'students'` so the existing **Families / Students** nav item keeps its active pill while a profile is open; they are reached via "view profile" links (Django later → `family/<id>` / `student/<id>`).
- **NI12 promotion** (per `../../002-admin-core-operations/contracts/navigation-ia-contract.md`): in `nav.config.js`, set `families` → `status:'implemented'` + `route:'families.html'` and `addFamily` → `status:'implemented'` + `route:'add-family.html'`; **add `add-family.html` to `FUTURE_ROUTES`** (`families.html` is already reserved there). `familyCategories`, `groups`, `scheduleSearch`, `studentResult`, `studentEvaluation` **stay `planned`** (Soon buttons, no route). The build-time guard (one route per implemented item, no route on a non-implemented item) MUST pass — **no dead links**. `future-role`/`hidden` portals are never rendered.
- `students.html` and `dashboard.html` are **already registered** — Spec 004 **regenerates** them (enriched students directory; minimal fixture-backed dashboard impact) and adds **no** further page beyond the four above.

## SD7. `enhance.js` = enhancement only (closed allowlist)

`enhance.js` MAY ONLY: toggle profile **tabs** + wizard **steps** (set/remove `hidden`, flip `aria-selected`, move roving `tabindex`) and persist the tab selection (`localStorage` + URL hash); show/hide & **filter pre-rendered** family cards / student rows by their `data-*` facets and update the active-filter chips + count; open the **drawer/sheet** (clone `<template data-preview>` / the shared appointment template, scrim, focus-trap, Esc, return-focus) and the **confirm modal**; fire **demo toasts** and surface **disabled-with-reason**; apply theme/language/sidebar/nav-category state. It MAY create transient overlays (drawer/modal/popover/toast) but **MUST NOT render page content, build a card/tab/step/drawer body, or generate ids/classes Django can't reproduce.** Behavior attaches via stable hooks only — no invented hooks, no JS-generated ids/classes:

`data-filter-form`, `data-filter="<facet>"` (status/category/family/subject/search), `data-target`, `data-filter-apply|reset|count`; `data-table`, `data-row` + `data-<facet>`, `data-row-menu="<id>"`; `data-drawer="<id>"`, `data-preview="<id>"`, `data-sheet-close`; `data-modal-trigger="<id>"`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`); `data-demo-action`, `data-disabled-reason` / `data-reason-key`, `data-toast`; the Spec 003 `data-tabs`/`data-tab`/`data-tabpanel`/`data-view`; and the NEW `data-wizard`, `data-step-next`, `data-step-prev`.

## SD8. Per-language pre-rendered pages

- Each Spec 004 page is generated in Arabic (`<page>.html`, `lang="ar" dir="rtl"`, default) and English (`<page>.en.html`, `lang="en" dir="ltr"`). The language toggle navigates between the equivalents; theme persists via `localStorage`. Cards, tabs, the stepper, and drawers mirror via **logical properties**; numbers/dates/progress percentages and the "View in schedule" deep-link token are **never** mirrored.
- The "View in schedule" deep-link is **language-aware**: it targets `schedule.html#view=timetable` from Arabic pages and `schedule.en.html#view=timetable` from English pages (via `langRoute()`). Every user-facing string is an i18n key resolved at build time — **no raw i18n keys**. The new family/student lifecycle status (`active/trial/suspended/stopped/inactive`) resolves through the **family-status map** as `{tone, icon, labelKey}` — icon+label, **never numeric or color-only** — distinct from the session status map.

## SD9. Relative paths / local assets / no CDN / no chart-table-form lib

- All asset references MUST be **relative** (`./assets/app.css`, `./assets/js/enhance.js`, `./fonts/...`, the inlined icon sprite). Pages MUST work from a GitHub Pages **project URL** (`user.github.io/repo/`); `public/` ships `.nojekyll` and is self-contained.
- **Zero external (CDN) requests.** No chart, table, form, calendar, or grade/evaluation library; no remote font/script/style. The family cards, profile tabs, the wizard stepper + form fields, the progress visuals, the rating pills, and the drawers use only local, compiled CSS/JS. The "no-external-request" smoke (SD12) also proves no such library loads.

## SD10. Build pipeline (no new tool)

- `npm run build` = vendor assets → copy assets → compile Tailwind CSS → `build-html.mjs` generates **all** pages. Spec 004 adds the four `PAGES` entries of SD6 and regenerates `students`/`dashboard`; **no new build tool** is introduced (`families`/`add-family`/`family`/`student` reuse the same `shellMarkup` + per-page `render()` path as every existing page).
- Final client preview is `public/`; **Live Server opens `public/families.html`** (and the linked `family.html`/`student.html`/`add-family.html`) with no Node server required.

## SD11. Django-template readiness (mapping)

Each generated Spec 004 page MUST map cleanly to Django:

- `public/<page>.html` → `templates/admin/<page>.html`; the shell → `{% include "admin/_sidebar.html" %}` / `_topbar.html` / `_page_header.html` partials.
- **Family cards** → `{% for family in families %}` with the grouped children from `{% for child in family.students %}` (the "+N" overflow precomputed in context, never JS); facets emitted as the same `data-*` attributes server-side.
- **Profile tabs** → static sections or `{% if view == "students" %} … {% endif %}` (default Overview); the tablist is plain markup; `family.html`/`student.html` → `family/<id>` / `student/<id>` views over one `Family` / `Student` (+ `family.students` / `student.family`).
- **Wizard steps** → `{% if step == "children" %} … {% endif %}` static sections; the step indicator is plain markup; "Save" stays a demo `data-*` action (no server write).
- **Results / Evaluation** → looped fixture context (`student.results.courses`, `student.evaluation.criteria`) rendered as static progress/pill markup; the family/student status map → a template tag/filter.
- **Timetable section** → reuse the Spec 003 `{% for block %}` agenda loop (a server-side filter to that family/student) + the **one** `{% include "admin/_appointment_details.html" %}` drawer partial; "View in schedule" is a plain language-aware link.
- Build-time **fixtures** (`src/js/fixtures/families.js` + the extended `students.js`) → Django **view context**; per-item `<template data-preview>` → a partial included per row/session.
- Per-language pages → one template per page with `{% trans %}` / `LocaleMiddleware`; the Arabic page is the canonical basis. `src/styles` → static CSS; `src/js` → static JS (enhancement only).
- **No JS-generated IDs/classes** Django can't reproduce; all behavior keys are stable `data-*` attributes.

## SD12. Enforcement & no-runtime-mount verification

- **no-external-request** smoke (SD9, also proves no chart/table/form/calendar/grade lib loads) over `families`/`family`/`add-family`/`student`/`students`/`dashboard` (AR + EN).
- **HTML-structure** check (SD1–SD5) asserts, on each Spec 004 page: the static shell + page header; a baked `cardGrid` of family cards with **build-baked grouped children** on `families.html`; a `role="tablist"` with **≥3 tabs** and **exactly one** visible `tabpanel` on `family.html`/`student.html`; a baked `[data-wizard]` with **all five** step panels (exactly one visible) + `data-step-next`/`data-step-prev` on `add-family.html`; baked `<template data-preview>` drawers (and the shared `appointmentTemplate`); and **no `id="app"`** whole-page mount; relative asset paths only.
- **NI12 guard** (SD6): `families`/`addFamily` are real `<a>` with routes; `familyCategories`/`groups`/`scheduleSearch`/`studentResult`/`studentEvaluation` stay Soon buttons with no `href`; `family.html`/`student.html` keep the **families/students** nav item active (exactly one `is-active[aria-current]`); no `future-role` portal in the DOM; **no dead nav link**.
- **no-dead-button / no-raw-i18n-key** smoke over every Spec 004 surface (every card/tab/step/drawer/wizard control navigates, opens an overlay, filters, switches a tab-or-step, demos with a toast, or is disabled-with-reason).
- With JS disabled, **View Source MUST show** every family card + its children, every profile tab panel, every wizard step, and every `<template data-preview>` as real baked markup — proving nothing is runtime-mounted. These checks run on the Spec 004 pages, not only Spec 001/002/003's.

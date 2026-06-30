# Contract: Static HTML-first / GitHub Pages / Django-ready (Attendance & Session Outcomes)

**Status**: Binding · Spec 005 EXTENDS the Spec 002/003/004 delivery architecture to the new attendance/outcomes surfaces — a baked Attendance board (summary tiles + filter bar + every `.outcome-row`), every baked `<template data-preview>` **outcome drawer**, and the light fixture-only Sessions/Student/Family/Dashboard integration — all real markup at build time. This is the non-negotiable structural contract for Spec 005; it is self-contained and supersedes nothing it does not name.

## SD0. Scope of this contract

This contract governs the **delivery structure** of the Spec 005 surfaces — how `attendance.html` and the four regenerated integration pages are baked, what `enhance.js` may and may not do, and how each maps to a Django template. It does not redefine the IA (`navigation-impact-contract.md`) or the visual acceptance (`screenshot-acceptance.md`); it is the binding **architecture** gate. Where any other description disagrees with the static-HTML-first / one-new-hook / Django-ready rules below, **this contract wins**.

## SD1. Static HTML-first (every Spec 005 surface is complete)

- Every Spec 005 page — `attendance.html` and the regenerated `sessions.html`, `student.html`, `family.html`, `dashboard.html` (each + its `.en.html`) — MUST be **pre-rendered to a complete static HTML file** in `app/public/` by the SSG (`scripts/build-html.mjs`): the full shell (category rail + control panel + topbar + page header) **and** all page content are real markup in the file.
- **No whole-page `<div id="app">` mount.** No runtime JavaScript builds the page DOM, lays out the summary tiles, assembles an `.outcome-row`, computes a tile count, or **populates the outcome drawer body**. Every count is baked from the fixture at build time.
- Verified by a structure check (SD11): `attendance.html` contains the sidebar, topbar, page header, the **summary tiles**, the **filter bar**, **every** `.outcome-row`, and **every** per-outcome `<template data-preview>` drawer — as static elements, with **zero** `id="app"` whole-page mounts.

## SD2. The Attendance board is BAKED (`attendance.html`)

- The Attendance page MUST ship, as complete baked markup: a **page header**; the **outcome summary tiles** (`summaryCards` — total / attended / studentAbsent / teacherAbsent / cancelled-or-rescheduled / needsFollowUp), each carrying its **build-time-derived count** (from `OUTCOME_SUMMARY`, never JS-computed) and its tile→filter hook (SD6); a persistent **filter bar** (day · teacher · student/family · subject · outcome · attention) with no hidden filters; and an airy **list/card hybrid** of **every** `.outcome-row` (time/date · session + course · teacher · student/family link · **labeled outcome chip** · attention/follow-up flag · a row-action menu) present in the file at build time.
- Each `.outcome-row` MUST bake its **facet attributes** (`data-row` + `data-outcome` / `data-teacher` / `data-family` / `data-day` / `data-subject` / `data-attention`) and its labeled outcome chip (icon + text, **never numeric or color-only**) as real markup, plus the warm **empty / no-results / loading / error** state markup.
- `enhance.js` MUST only **show/hide and filter** these pre-rendered rows/tiles (SD6); it MUST NOT create, populate, reorder by fetch, or destroy a row or tile. With JS off, every outcome row + every tile count renders.

## SD3. `<template data-preview>` outcome drawers are BAKED (the one canonical drawer)

- Each `.outcome-row` (and any Sessions row offering the outcome view) MUST carry a hidden **`<template data-preview="<id>">`** containing its full **outcome drawer** payload as **real baked markup** (research R35, spec D3): the shared appointment field-rows (status · date/time/duration · teacher · students `present/capacity` · **family** · subject · room · notes) **plus** the outcome section (outcome chip · who-absent / who-cancelled attribution · attendance summary · make-up/credit display hint · follow-up hint · feedback note) **plus** the status-gated action cluster — all baked, never assembled at runtime.
- This is the **one canonical outcome drawer** (`outcomeTemplate`, a superset of the Spec 003 `appointmentTemplate`), reused by **Attendance + Sessions** (and degrading to the plain appointment view when a session has no recorded outcome). The Schedule/Timetable page keeps its existing appointment drawer; the Student/Family profiles **deep-link** rather than carry a bespoke drawer. **No per-page bespoke outcome drawer** is introduced.
- The drawer engine clones the `<template data-preview>` into a transient overlay on open (`data-drawer="<id>"` → the existing `openSheet(id)`); it MUST NOT fetch or assemble fields at runtime. With JS off, the trigger and the baked template content still exist as real markup; no drawer is JS-rendered as page content.

## SD4. `enhance.js` = enhancement only (closed allowlist)

`enhance.js` MAY ONLY, for Spec 005: **filter pre-rendered** `.outcome-row`s by their `data-*` facets and update the active-filter chips + result count (including the **tile→filter** shortcut, SD6); open the **outcome drawer/sheet** (clone `<template data-preview>`, scrim, focus-trap, Esc, return-focus) and the **confirm modal**; fire **demo toasts** and surface **disabled-with-reason**; apply theme/language/sidebar/nav-category state. It MAY create transient overlays (drawer / confirm modal / toast) but **MUST NOT render page content, build a tile / row / drawer body, compute a count, or generate ids/classes Django can't reproduce.** It adds **no engine** — no real status mutation, persistence, notification, reschedule, make-up, or finance/credit.

**The ONLY new hook in Spec 005 is `data-filter-set`** (SD6). Every other hook is **reused as-is** from Spec 002/003/004 — no invented hooks, no JS-generated ids/classes. The closed allowlist of hooks Spec 005 surfaces:

```text
NEW (one):
  data-filter-set="<facet>:<value>"   — summary tile → set a filter facet + re-run applyFilter (SD6)

REUSED (filtering):
  data-filter-form · data-filter="<facet>" (day|teacher|family|subject|outcome|attention)
  data-target · data-filter-apply | data-filter-reset | data-filter-count
  data-table · data-row + data-<facet> · data-row-menu="<id>"

REUSED (overlays):
  data-drawer="<id>" · data-preview="<id>" · data-sheet-close       (the canonical outcome drawer)
  data-modal-trigger="<id>" · data-confirm (+ -title|-msg|-cta|-toast|-danger)

REUSED (honest feedback):
  data-demo-action · data-disabled-reason / data-reason-key · data-toast

REUSED (Spec 003 tabs, only on the integrated Sessions/profile pages):
  data-tabs · data-tab · data-tabpanel · data-view
```

No outcome action ever writes data: each resolves to a `data-demo-action` (toast), a `data-confirm` (modal → toast, for destructive cancel/mark-absent/reschedule), or a `data-disabled-reason` (real save / real notify / add-to-credit). There is **no new action hook and no new engine**.

## SD5. Outcome status & status-vs-outcome both emitted server-side

- The session outcome resolves through the new **OUTCOME status map** (`outcome-status.js`: id → `{ tone, icon, labelKey }` for `attended/studentAbsent/teacherAbsent/cancelled/rescheduled/upcoming/live` + the `makeUpSuggested`/`needsFollowUp` display flags) — rendered as **icon + label, AA-contrast, never numeric or color-only**, distinct from the Spec 001/003 **session** status map and the Spec 004 **lifecycle** map.
- A session carries **both** a scheduling `statusId` (session map) and a review `outcomeId` (outcome map) — both resolved and **emitted at build time** (research R34): the **outcome** chip is primary on the Attendance row; the scheduling **status** stays primary on the Sessions row with the outcome as a small secondary chip only when a recorded outcome exists; the drawer labels **both** ("Status" / "Outcome"). No status is computed at runtime; no double-encoding into one merged code.

## SD6. The tile→filter `data-filter-set` hook (the one new behavior)

- Each Attendance summary tile is a baked `<button data-filter-set="<facet>:<value>" data-target="#attendance-list">` (e.g. `data-filter-set="outcome:studentAbsent"`, `data-filter-set="attention:1"`). `enhance.js` gains a tiny delegated `[data-filter-set]` branch that parses `facet:value`, sets the matching `<select data-filter="<facet>">` in the page's filter form, and re-runs the existing `applyFilter` — a **clickable status tile = a filter shortcut** over the established client-side filtering (research R38). No route-per-status wall, no new filter engine, no heavy runtime.
- The tiles remain real, labeled, count-bearing display elements with JS off (graceful degradation); the `data-filter-set` behavior is pure enhancement.

## SD6b. Integration pages are baked deltas (Sessions / Student / Family / Dashboard)

The four regenerated pages gain **baked** outcome content only — no runtime assembly:

- **`sessions.html`** — each row's small **secondary outcome chip** (only where a recorded outcome exists, research R34) is baked into the row markup; the row's outcome view reuses the **same** baked `<template data-preview>` canonical drawer; the "View attendance" deep-link is a baked `<a>`. The List/Timetable tab structure is unchanged.
- **`student.html`** — a calm **fixture** recent-outcomes / attendance hint (e.g. "attended N of M · 1 absence to follow up") is baked into the existing Overview/Timetable area + a baked "View attendance" deep-link. No new tab; no runtime metric.
- **`family.html`** — a baked **fixture** children follow-up hint + a baked deep-link.
- **`dashboard.html`** — **one** baked follow-up count chip folded into the existing people-signal card; the Today's Sessions rows MAY carry a baked outcome chip + reuse the canonical drawer. No new card/tile/row.

`enhance.js` only filters/opens overlays on these; it builds none of the chips/hints. With JS off they all render.

## SD6c. Empty / no-results / loading / error states are baked

The Attendance board MUST bake the **warm empty state** ("no sessions for this day yet"), the **filter no-results + reset** state, and the **skeleton/loading** and **friendly error+retry** patterns as static markup (improving the legacy's bare "Loading…" / "No data"). `enhance.js` toggles their visibility during filtering — it does not construct them at runtime.

## SD7. Per-language pre-rendered pages

- Each Spec 005 page is generated in Arabic (`<page>.html`, `lang="ar" dir="rtl"`, default) and English (`<page>.en.html`, `lang="en" dir="ltr"`). The language toggle navigates between equivalents; theme persists via `localStorage`. Tiles, filter bar, outcome rows, and the drawer mirror via **logical properties**; numbers / dates / times / `present/capacity` and the "View attendance" / `#view=timetable` deep-link tokens are **never** mirrored.
- The "View attendance" deep-link is **language-aware** (`attendance.html` from AR pages, `attendance.en.html` from EN pages, via `langRoute()`); the schedule deep-link stays `schedule.html#view=timetable` / `schedule.en.html#view=timetable`. Every user-facing string is an i18n key (the new `att.*` / `outcome.*` namespace + `topbar.title/crumb.attendance` + the `nav.attendance` label) resolved at build time — **no raw i18n keys**.

## SD8. Relative paths / local assets / no CDN / no chart-table-form-calendar lib

- All asset references MUST be **relative** (`./assets/app.css`, `./assets/js/enhance.js`, `./fonts/...`, the inlined icon sprite). Pages MUST work from a GitHub Pages **project URL** (`user.github.io/repo/`); `public/` ships `.nojekyll` and is self-contained.
- **Zero external (CDN) requests.** No chart, table, form, calendar, or grade library; no remote font / script / style. The summary tiles, the filter bar, the outcome rows/cards, the labeled outcome chips, the make-up/follow-up hints, and the drawer use only local, compiled CSS/JS. The "no-external-request" smoke (SD11) also proves no such library loads.
- The labeled OUTCOME chips, the attendance summary, the make-up/follow-up hints, and the attribution lines are **hand-rolled SVG/CSS** — no widget library renders them, and they degrade to readable static markup with JS off.

## SD9. Build pipeline (no new tool)

- `npm run build` = vendor assets → copy assets → compile Tailwind CSS → `build-html.mjs` generates **all** pages. Spec 005 adds **one** `PAGES` entry (`attendance`) and **regenerates** `sessions`/`student`/`family`/`dashboard`; **no new build tool** is introduced (`attendance` reuses the same `shellMarkup` + per-page `render()` path as every existing page).
- Final client preview is `public/`; **Live Server opens `public/attendance.html`** (and the linked sessions/student/family/dashboard) with no Node server required.

## SD10. Django-template readiness (mapping)

Each generated Spec 005 page MUST map cleanly to Django:

- `public/attendance.html` → `templates/admin/attendance.html`; the shell → `{% include "admin/_sidebar.html" %}` / `_topbar.html` / `_page_header.html` partials.
- **Outcome list** → `{% for outcome in outcomes %}` with `outcome.student` / `outcome.family` resolving the profile links; facets emitted as the same `data-*` attributes server-side.
- **Summary tiles** → context counts (`summary.attended`, `summary.studentAbsent`, …, `summary.needsFollowUp`) rendered into plain markup + the same `data-filter-set` attribute server-side (the count precomputed in context, never JS).
- **The canonical drawer** → **ONE** `{% include "admin/_outcome_details.html" %}` per outcome row (the single partial reused on Attendance + Sessions) — never a per-page bespoke drawer.
- **The outcome status map** → a **template tag / filter** (`{{ outcome.outcomeId|outcome_chip }}`) emitting the tone+icon+label; the **scheduling status and the review outcome are BOTH emitted server-side** (the "Status" and "Outcome" rows), never merged into one code.
- **Build-time fixtures** (`src/js/fixtures/attendance.js` → `SESSION_OUTCOMES` + derived `OUTCOME_SUMMARY`) → Django **view context** (`outcomes`, `summary`), resolving to real `Student`/`Family`/teacher FKs.
- Per-language pages → one template per page with `{% trans %}` / `LocaleMiddleware`; the Arabic page is the canonical basis. `src/styles` → static CSS; `src/js` → static JS (enhancement only). **No whole-page `#app`; no JS-generated IDs/classes** Django can't reproduce; all behavior keys are stable `data-*` attributes.

Mapping summary:

| static artifact | Django |
|---|---|
| `public/attendance.html` | `templates/admin/attendance.html` |
| every `.outcome-row` | `{% for outcome in outcomes %}` over view context |
| summary tiles + counts | `{{ summary.* }}` context + the same `data-filter-set` attrs |
| the canonical outcome drawer | ONE `{% include "admin/_outcome_details.html" %}` per row |
| the OUTCOME status map | a template tag/filter (`{{ id|outcome_chip }}`) |
| scheduling status + review outcome | both emitted server-side (Status + Outcome rows) |
| `SESSION_OUTCOMES` / `OUTCOME_SUMMARY` | `outcomes` / `summary` view context (real FKs) |

Representative Django shape (the list + the canonical drawer included once per row, both statuses emitted server-side):

```django
{% for outcome in outcomes %}
  <div class="outcome-row" data-row
       data-outcome="{{ outcome.outcomeId }}" data-teacher="{{ outcome.trainer.id }}"
       data-family="{{ outcome.familyId }}" data-day="{{ outcome.dayId }}"
       data-subject="{{ outcome.subject }}" data-attention="{{ outcome.followUp|yesno:'1,0' }}">
    … time · session · teacher · <a href="{% url 'student' outcome.studentId %}">…</a>
    {{ outcome.outcomeId|outcome_chip }}            {# the OUTCOME status template tag #}
  </div>
  <template data-preview="{{ outcome.id }}">
    {% include "admin/_outcome_details.html" with outcome=outcome %}   {# ONE shared partial #}
  </template>
{% endfor %}
```

## SD11. Enforcement & no-runtime-mount verification

- **no-external-request** smoke (SD8, also proves no chart/table/form/calendar/grade lib loads) over `attendance`/`sessions`/`student`/`family`/`dashboard` (AR + EN).
- **HTML-structure** check (SD1–SD6) asserts, on `attendance.html`:
  - the static shell + page header;
  - baked **summary tiles** each with a `data-filter-set` + a derived count;
  - a baked **filter bar** with the six facet selects (day/teacher/family/subject/outcome/attention);
  - **≥12** baked `.outcome-row`s each with a labeled outcome chip (icon + text) + facet attributes;
  - baked per-outcome `<template data-preview>` drawers (containing the outcome section + the status-gated action cluster);
  - **no `id="app"`** whole-page mount; relative asset paths only.
- **tile→filter / drawer / actions smoke**: clicking a summary tile sets the matching filter and narrows the rows (`data-filter-set`); a row opens the canonical drawer with its outcome section; a demo action toasts; a destructive action (cancel/mark-absent/reschedule) opens the confirm modal then toasts; a backend-bound action is disabled-with-reason — no dead control, no real mutation.
- **integration smoke** (SD6b): `sessions.html` carries the secondary outcome chip + the shared drawer + the "View attendance" deep-link; `student.html`/`family.html` carry the fixture hint + deep-link; `dashboard.html` carries exactly one folded follow-up chip + deep-link (no new stat wall).
- **no-dead-button / no-raw-i18n-key** smoke over every Spec 005 surface (the new `att.*` / `outcome.*` i18n namespace resolves in both AR and EN — no raw keys leak).
- With JS disabled, **View Source MUST show** every summary tile (with its count), the filter bar, every `.outcome-row` (with its outcome chip), and every `<template data-preview>` outcome drawer as real baked markup — proving nothing is runtime-mounted. These checks run on the Spec 005 pages, not only Spec 001–004's.

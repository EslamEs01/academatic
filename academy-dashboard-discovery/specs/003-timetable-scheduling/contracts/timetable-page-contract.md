# Contract: Timetable / Schedule Page

**Status**: Binding · `public/schedule.html` (+ `.en`). A tabbed weekly experience (List + Timetable) over one fixture week — **no calendar library**. Active nav: `schedule`.

## 1. Purpose

Give the admin one calm Schedule page that presents the same fixture week two ways — a **List/Agenda** (day-grouped blocks, kept from Spec 002) and a hand-rolled **Timetable** grid — with strong shared filters, a teacher lens, and a per-item details drawer. The page MUST read as the same product as Spec 001/002 (warm canvas `#FAF6EF`, violet `#5145CD`/`--g-violet`, `--r-card:20px`, Tajawal) and MUST improve on the legacy weekly timetable (no dead 24h axis, no tiny saturated blocks, no rainbow status).

## 2. Label & navigation (D6 / R19)

- The page title, breadcrumb leaf, and section/tab headings MUST use the single reconciled label **`الجدول الدراسي`** (Arabic) / **`Timetable`** (English) — no second wording anywhere on the page.
- The nav **id `schedule`** and route **`schedule.html`** MUST stay unchanged; the Schedule nav item MUST carry the active violet pill and `aria-current="page"`. **No new nav item/route** is introduced (the teacher timetable is an in-page lens, D3).

## 3. Layout (RTL, top → bottom)

1. **Page header** — title `الجدول الدراسي`/`Timetable` + breadcrumb + an **optional compact week strip** (week label + prev/this/next as demo highlight, never a real date engine).
2. **Tablist** — `List | Timetable` (per `schedule-tabs-contract.md`), List active by default.
3. **Schedule filter bar** — week/day, teacher, subject, status facets feeding **both** panels (§5).
4. **Two baked `tabpanel`s** — List panel (§6) and Timetable panel (§7); the inactive one carries `hidden`.
5. **Per-item details drawer** trigger on every block/row (§8) plus the page-level states region (§9).

Single calm column; the shell (rail + topbar) is unchanged. Reflows per §10.

## 4. Tablist (List | Timetable)

The tablist MUST be the generic widget defined in `schedule-tabs-contract.md`: `role="tablist"` of two `role="tab"` controls, baked `role="tabpanel"`s, roving tabindex, **List default**, selection persisted in `localStorage['academy.schedView.schedule']` + URL hash `#view=list|timetable` (hash wins on load). Switching tabs MUST change only the visible panel — no navigation, no reload, no JS-built DOM. Filter and selected-teacher state (§5) MUST be preserved across a tab switch.

## 5. Schedule filter bar (feeds BOTH panels)

- Reuses `filterBar` / IP2 (`../../002-admin-core-operations/contracts/interaction-patterns-contract.md`): search + selects + **apply** + **reset** + active-filter chips + result count.
- Facets MUST include **week/day**, **teacher** (`data-filter="teacher"`, the teacher-lens facet of §7), **subject**, and **status** (the calm 4-set: live→teal, upcoming→sky, completed→success, cancelled→coral; never color-only). Type/student-family MAY be added only where the fixture supports it.
- On apply, `enhance.js` MUST show/hide the pre-rendered blocks (by their `data-<facet>` values) in **both** the List and Timetable panels consistently, update the count, and surface the **no-results** state with a reset when nothing matches. Filters MUST give visible feedback always — **never dead**.
- Degrades gracefully: with JS off, all blocks render and filters are inert (all visible).

## 6. List tab (day-grouped blocks — reuse)

The List panel MUST reuse the Spec 002 day-grouped block list: per-day header (weekday + date + count) over stacked `.sched-block` rows (time range, title+level, teacher avatar+name, room, status chip, preview chevron). It is the **default** view and MUST remain readable with JS off. Each block carries its facet `data-*` attributes (§11) and the `data-drawer` trigger (§8).

## 7. Timetable tab (grid + teacher lens)

- The Timetable panel MUST render the hand-rolled weekly grid defined in `calendar-view-contract.md`: a leading time-axis column + one day column per weekday, **Sat-first**, a **cropped** working-hours axis (never an empty 24h span), build-time placed status-toned blocks, a quiet today/now accent. No calendar/chart library; baked at build, not runtime-drawn.
- The **teacher lens** (D3 / R14) is the `data-filter="teacher"` facet (§5): default **"All teachers"** shows the combined week with each block labeled by teacher; selecting a teacher scopes the grid to that teacher's fixture blocks. It is admin-facing display only — **no teacher-portal chrome, no edit/availability persistence**. See `teacher-timetable-contract.md`.
- Below the timetable breakpoint the grid MUST reflow to a single-day **agenda** (§10).

## 8. Per-block drawer trigger

Every block (List and Timetable) and every agenda item MUST open the **shared** appointment-details drawer via `data-drawer="<id>"` over a baked `<template data-preview="<id>">` (engine: IP5, scrim/focus-trap/Esc/return-focus). Content + fields + demo/disabled actions are defined in `appointment-details-contract.md`. Activation MUST be click **and** keyboard; closing MUST return focus to the originating block/row.

## 9. States

The page MUST provide, using the Spec 001 `states` patterns: **empty** (distinguish "no sessions scheduled" from "no match" — per day and whole-week), **loading** skeleton (grid + list), **error + retry**, and the filter **no-results** state with reset. The legacy bare "No data found" is explicitly improved.

## 10. Responsive

Desktop/tablet show the full weekly grid (Timetable) and the calm list (List). Below the timetable breakpoint the Timetable panel MUST become a single-day agenda with a day switcher (no horizontally-cramped 7-column grid, no horizontal overflow); the List panel stacks. The drawer is full-height on mobile.

## 11. `data-*` hooks (exact, no invention)

`data-tabs="schedule-view"`, `data-tab="list|timetable"`, `data-tabpanel="list|timetable"`, `data-view` (hash token, §4); `data-filter-form`, `data-filter="day|week|teacher|subject|status"`, `data-target`, `data-filter-apply|reset|count`, `data-no-results`; `data-timetable`, `data-slot`, `data-teacher` (= `data-filter="teacher"`), `data-agenda`, `data-attention`; per block `data-row` + `data-status|data-subject|data-teacher|data-day`; `data-drawer`, `data-preview`, `data-sheet-close`; drawer actions via `data-demo-action`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`), `data-disabled-reason`/`data-reason-key`, `data-toast`, `data-action`. **No JS-generated ids/classes.**

## 12. Reused / cross-references

Reuses Spec 001 `status-chip`/`status-map`, `ui` (avatar/medallion/button), `filterBar`, `states`, the drawer/sheet engine, `toast`, `confirmAction`, and the page shell. Binds to: `schedule-tabs-contract.md` (tabs), `calendar-view-contract.md` (grid), `teacher-timetable-contract.md` (lens), `appointment-details-contract.md` (drawer); and the Spec 002 `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP2/IP5/IP8/IP9) + `../../002-admin-core-operations/contracts/static-html-django-ready-contract.md` (SD1–SD7) remain in force.

## 13. Django mapping

`public/schedule.html` → `templates/admin/schedule.html`. Tab panels → static sections / `{% if view %}`; the grid + list → `{% for day in week.days %}{% for block in day.blocks %}` with each block's build-time `--row`/`--col` and `data-*` facets reproduced server-side; the drawer `<template>` → an include fed by context. No whole-page `#app` mount; relative `./assets/` paths; zero external requests.

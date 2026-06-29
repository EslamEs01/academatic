# Phase 0 Research: Timetable and Scheduling Experience

Spec 003 inherits the entire Spec 001 stack and Spec 002 decisions **R1–R10** (`../002-admin-core-operations/research.md`: SSG `renderX()` pages, real `.html` routing + baked `aria-current`, **R3 schedule day-grouped list**, students/trainers layouts, **R5 drawer-for-previews/modal-for-confirm**, **R6 client-side filtering of pre-rendered rows**, settings taxonomy, **R8 shared components**, **R9 hand-rolled SVG/CSS visuals**, **R10 extend the test harness**). **No new dependencies.** This file records only the decisions specific to the timetable/scheduling experience. Each: **Decision · Rationale · Alternatives rejected**. It is grounded in the inspected reference system (old academy *All Teachers Timetable* weekly grid, today's-classes tables, status-gated session modals) and the current implementation — not invented.

---

## R11 — A generic, accessible content-tabs widget (List | Timetable)

**Decision**: Add a reusable `tabs.js` component rendering a `role="tablist"` of `role="tab"` buttons controlling baked `role="tabpanel"` panels. **Both panels are pre-rendered into the static HTML**; `enhance.js` only toggles visibility (the inactive panel carries `hidden`). Roving tabindex + **Arrow/Home/End + Enter/Space** (mirrors the nav-rail pattern). The selected tab persists in `localStorage['academy.schedView.<page>']` and is reflected in the **URL hash** (`#view=list` | `#view=timetable`); on load the hash wins, else the stored value, else the default. **List is the default tab.** Hooks: `data-tabs="<group>"`, `data-tab="<id>"`, `data-tabpanel="<id>"`. With JS off, all panels remain visible as anchored sections (graceful degradation).

**Rationale**: The only existing tablist is nav-only; a generic content-tabs widget is needed and must stay HTML-first (panels baked, JS toggles only) so it is Django-portable (`{% if view %}` / static sections) and deep-linkable. Reusing the nav-rail's keyboard model keeps one a11y idiom.

**Alternatives rejected**: JS-rendered panels (violates HTML-first/no-mount); CSS `:target`-only tabs (no persistence, weaker a11y/keyboard); a routing/SPA view switch (banned).

---

## R12 — Calendar/Timetable view = a hand-rolled weekly CSS grid (no library) — EVOLVES R3

**Decision**: Add a **Timetable tab** rendering a **hand-rolled CSS-grid weekly timetable**: a leading **time-axis column** + one **day column per weekday** (Sat-first). Time blocks are placed by a **build-time computed `grid-row` span** derived from each block's `start`/`end` against the grid's **cropped axis** — the axis spans only `floor(min start) … ceil(max end)` across the visible fixture week (a small pad), in fixed 30-minute rows — **never an empty 24-hour timeline**. Blocks carry the status tone (status-map: live→teal, upcoming→sky, completed→success, cancelled→coral) as a subtle tint + inline-start accent, show **course/teacher primary, time/duration secondary**, and a **quiet "today/now" accent** marks today's column. **Overlapping** sessions in one day split that day's column into side-by-side sub-columns (CSS sub-grid/flex), computed at build. The grid is RTL-first (columns mirrored via logical properties; the time axis numerals stay LTR) and **reflows to a single-day agenda on mobile** (R13a). Everything is **baked at build time** — runtime JS draws nothing.

This **evolves Spec 002 R3**: the day-grouped list (R3) is kept as Tab 1; the week grid that R3 rejected as a *sole* view is now added as Tab 2. The "**no calendar library**" rule is preserved (native HTML/CSS only); R3's RTL/responsive concerns are answered by the cropped axis, logical-property mirroring, and the mobile agenda fallback.

**Rationale**: A timetable must show the timing relationship (the spec's core ask and a reference staple); a hand-rolled CSS grid gives that without a library, stays static/Django-friendly (`{% for %}` over days/blocks with a precomputed span class), and — by cropping the axis and using generous blocks + one quiet accent — fixes the legacy weaknesses (dead 24h axis, tiny saturated blocks, color overload).

**Alternatives rejected**: a calendar library / FullCalendar (banned, heavy, not Django-portable); a runtime-drawn grid (violates HTML-first); a full 24-hour axis (the legacy dead-whitespace problem); absolute-positioned blocks by pixel (fragile in RTL/responsive — CSS-grid row spans are deterministic and mirror cleanly).

---

## R13 — Mobile agenda fallback + the single-day agenda component

**Decision**: Below the timetable breakpoint, the weekly grid is replaced by a **single-day agenda** (`schedule-agenda.js`) — a day switcher (chips/prev-next) over a vertical list of `.sched-block`-style time blocks for the selected day. The same component powers the **Sessions "Timetable/agenda" tab** (today only). It reuses the existing `.sched-block` visual + the appointment drawer trigger.

**Rationale**: A 7-column grid is unreadable on phones (the legacy table-only-on-mobile weakness); an agenda is calm, scannable, and reuses proven markup; one component serves both mobile-schedule and Sessions-today.

**Alternatives rejected**: horizontal-scroll the grid on mobile (cramped, poor RTL); hide the timetable on mobile (loses the feature); a separate mobile-only fixture (duplication).

---

## R14 — Teacher-timetable lens inside the Schedule page (admin display only)

**Decision**: The Timetable tab includes a **teacher facet** (reuse `data-filter="teacher"`): default **"All teachers"** shows the combined week with each block labeled by teacher avatar/name; selecting a teacher scopes the grid to that teacher's fixture blocks. The teacher list is **derived from the schedule fixture** at build time. This is an admin-facing **lens/filter**, not a new page/route, and carries **no teacher-portal chrome and no edit/availability persistence**.

**Rationale**: The old system's *All Teachers Timetable* / per-teacher timetable is a central surface; exposing it as an admin filter reuses R6 filtering, adds real value, and stays in scope (scope-guard G6b: a new page would need its own spec). Sat-first + conflict-aware concepts come from the reference; here they are display-only.

**Alternatives rejected**: a dedicated teacher-timetable page/route (needs its own spec; risks portal drift); a teacher dashboard (out of scope); per-teacher static pages (file explosion, no real value at fixture scale).

---

## R15 — One shared appointment/session details drawer (progressive disclosure)

**Decision**: A single `appointment-details.js` content builder produces the baked `<template data-preview="<id>">` for **every** schedule/session item (Schedule blocks, Sessions rows, Sessions agenda, dashboard session rows). It opens via the existing template-based drawer engine (`data-drawer` → `openSheet` → scrim/focus-trap/Esc/return-focus). Layout = **progressive disclosure**: a summary header (status chip, date, **start–end**, duration, teacher) → **people** (students/family if present) → **logistics** (subject/course, room and/or online link) → **notes/materials** → an **attention/conflict note** when flagged. A small **timezone hint** line ("times shown in academy timezone") is a static display nod to the reference's dual-TZ — **no real conversion**. An **actions row**: *View* (open), *Edit/Reschedule* and *Notify* → **demo toast**, *Cancel* → **confirm modal → demo toast**, *Join/Open link* → **disabled-with-reason** (no real Zoom). No real persistence.

**Rationale**: Replaces the legacy long detail *page* with a calm, focused drawer (R5 extended); one builder guarantees a consistent experience across all four entry points and maps to one Django partial; honest demo/disabled actions satisfy no-dead-button.

**Alternatives rejected**: separate detail pages (out of scope, deeper nav); per-surface bespoke drawers (drift); cramming the old 7-section detail into one screen (clutter — the documented weakness).

---

## R16 — Minimal, fixture-backed dashboard impact

**Decision**: (a) The hero **"View Schedule"** + Today's Sessions **"view all"** deep-link to `schedule.html#view=timetable`; (b) the Today's Sessions row detail uses the **shared appointment drawer** (R15); (c) add **one** small **"Up next / This week"** strip reusing `.sched-block` over `SCHEDULE_WEEK`/`SESSIONS`, linking to Schedule; (d) a **fixture-only attention count** chip on the sessions-card header (e.g., "2 need attention"), linking to the schedule filtered to attention. Real conflict detection / upcoming feeds / notifications stay **deferred**.

**Rationale**: The dashboard already carries strong schedule signals; the impact should *connect* them to the timetable and unify the drawer, plus one tiny preview an existing fixture backs — not a new stat wall (the legacy clutter). Everything added is fixture-backed and links to an in-scope page (the spec's hard rule).

**Alternatives rejected**: multiple new dashboard widgets (clutter; unbacked); a mini calendar on the dashboard (calendar-lib-shaped, heavy); no impact at all (misses the spec's Dashboard Impact requirement and leaves "View Schedule" pointing at a list-only page).

---

## R17 — Fixture extension (display-only shapes)

**Decision**: Extend `SCHEDULE_WEEK` blocks with the fields the grid/drawer/lens need: keep `start`/`end` (→ build-time `durationMin` + grid span), add `roomLinkKey?` (online link label), `students?` (count or short list) / `familyKey?`, `attention?` (`{ kind, labelKey }` | null), `type?` (`session`/`trial`/`group`); the day wrapper keeps `dateISO`/`nameKey`. Extend `SESSIONS_FULL` rows with `dateKey`, `roomLinkKey?`, `familyKey?`, `notesKey?`, `materialsKey?`, `attention?`. Teachers for the lens are **derived** from the blocks. All strings stay **i18n keys**; content is **original placeholder** (no legacy names/wording). Status stays the calm **4-set** + optional display tag `rescheduled`.

**Rationale**: Minimal, additive extension keeps the grid/drawer/lens honest and fixture-only; deriving teachers avoids a second source of truth; i18n-key + status-map reuse keeps AR/EN + theming consistent.

**Alternatives rejected**: adopting the legacy 11 backend statuses (implies a real lifecycle — out of scope); a separate timetable fixture (divergence from the list); embedding real timezone math (out of scope).

---

## R18 — Tests & screenshots extend the existing harness

**Decision**: Extend `tests/smoke/run.cjs` to assert, on schedule/sessions: a `role="tablist"` with **≥2 tabs**, **exactly one** visible `tabpanel`, a present **timetable grid** (`[data-timetable]`) on the Timetable panel, tab-switch works (click + keyboard) and persists, filters narrow **both** views, and the **appointment drawer** opens with required fields (no dead tab/block). Extend `tests/screenshots/capture.cjs` MATRIX + naming (`{page}__{lang}__{theme}__{viewport}[__{variant}]`) with the Spec 003 frames (schedule list/timetable, dark, EN, teacher-lens, `drawer`, dashboard impact, mobile agenda, tablet, sessions timetable). a11y page coverage already includes schedule/sessions/dashboard. The "no external requests" assertion already guarantees **no calendar/chart library** is loaded.

**Rationale**: One pipeline covers Spec 001+002+003; deterministic; reuses installed Playwright/axe; turns the spec's failure conditions into machine-checkable + screenshot-checked gates.

**Alternatives rejected**: a separate harness (duplication); manual-only verification (not reproducible).

---

## R19 — Arabic label reconciliation (per user decision)

**Decision**: The user-facing label is **`الجدول الدراسي`** (Arabic) / **`Timetable`** (English; "Academic Timetable" where a longer form helps), applied consistently to the **sidebar item, page title, breadcrumb, and tab/section headings**. The technical **id and route remain `schedule` / `schedule.html`** (stable, GitHub-Pages + Django friendly). This finalizes spec **D6** and overrides the spec's tentative suggestion of "الجدول الزمني" — the user explicitly chose the clearer academic-timetable wording.

**Rationale**: Clear for academy users; keeps technical identifiers stable so no routing/test churn; one label everywhere prevents the Spec 002 label drift.

**Alternatives rejected**: "الجدول الزمني" (less clear to academy users — user overrode); renaming the route/id to `timetable` (needless churn across nav config, SSG, tests, and existing links).

---

## Resolved decisions summary

| # | Topic | Decision |
|---|---|---|
| R11 | Tabs | Generic accessible content-tabs; baked panels + JS toggle; persist localStorage + URL hash; List default |
| R12 | Timetable grid | Hand-rolled weekly CSS grid, cropped axis, build-time row spans, status tones, today accent, RTL Sat-first — **no calendar lib** (evolves R3) |
| R13 | Mobile/agenda | Single-day agenda fallback; same component powers Sessions "today" tab |
| R14 | Teacher lens | Teacher filter + all-teachers overview inside Schedule; admin display only, no new page |
| R15 | Detail drawer | One shared appointment-details drawer, progressive disclosure, demo/disabled actions, tz hint |
| R16 | Dashboard impact | Deep-links + shared drawer + one up-next strip + fixture attention count; rest deferred |
| R17 | Fixtures | Additive extension of SCHEDULE_WEEK/SESSIONS_FULL; teachers derived; calm 4-status set |
| R18 | Tests | Extend smoke (tabs/grid/drawer) + capture matrix; no-external-request covers no-calendar-lib |
| R19 | Label | `الجدول الدراسي` / `Timetable`; id/route stay `schedule` |

No unresolved `NEEDS CLARIFICATION` remain.

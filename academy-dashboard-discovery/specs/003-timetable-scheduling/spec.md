# Feature Specification: Timetable and Scheduling Experience

**Feature Branch**: `feature/001-approved-dashboard-design` (continues; spec dir is independent)
**Spec Directory**: `003-timetable-scheduling`
**Created**: 2026-06-29
**Status**: Draft
**Input**: User description: "Timetable and Scheduling Experience — improve how schedules, class sessions, teacher timetables, and planned class times are displayed in the approved admin frontend. Any schedule/timetable/appointment surface must offer a tabbed experience (List/structured view + Calendar/timetable view); clicking an item opens its details in a drawer/modal. Grounded in the analyzed old academy system as product/UX reference, but cleaner, calmer, more premium, and more modern. Static HTML-first, Django-ready, fixtures only, no calendar library."

---

## Context & Design Grounding *(mandatory for this spec)*

This spec **extends Spec 001** (`001-approved-dashboard-foundation`) and **Spec 002** (`002-admin-core-operations`), both implemented in `academy-dashboard-discovery/app/`. It is grounded in inspected artifacts (current code, binding contracts, approved references, and the old-system analysis), not invented.

### Foundation this builds on (Spec 001 + 002 — the VISUAL + ARCHITECTURE target)

- **Static, HTML-first** site: `scripts/build-html.mjs` pre-renders each page to a complete static file in `app/public/` (Arabic default + English `*.en.html`); `src/js/enhance.js` only enhances the baked markup via `data-*` hooks; relative `./assets/` paths; GitHub-Pages / Live-Server compatible; Django-template-ready. Verified passing: build clean, smoke (no raw keys / external requests / dead buttons), axe critical=0/serious=0, screenshot review.
- **Approved design**: warm cream canvas `#FAF6EF`, two-part inline-start nav shell (slim **category icon rail** + light **category panel** showing only the active category's links + violet active pill + bottom rail avatar) per `sidebar-reference.png`, organized topbar, violet primary `#5145CD` with the `--g-violet` gradient, 5-accent palette (teal/green/sky/amber/coral) → status map (`live→teal, upcoming→sky, completed→success, cancelled→coral`), Tajawal font, soft rounded cards (`--r-card:20px`), icon medallions, light/dark/system.
- **Existing schedule/sessions surfaces** (what this spec improves):
  - **Schedule page** (`schedule.html`) — a calm **day-grouped block list** (`schedule-list.js` over the `SCHEDULE_WEEK` fixture): per-day header (weekday + date + count) over stacked `.sched-block` rows (time range, title+level, trainer avatar, status chip, preview chevron). Filterable (search/status/subject) with per-block `data-drawer` preview. **No list↔calendar tabs and no weekly time-grid exist today.** Blocks carry `start/end/title/level/trainer/room/status/subject` — **no dayOfWeek, duration-span, room link, student/family, or attention fields.**
  - **Sessions page** (`sessions.html`) — a modern **data table** (`dataTable`) of today's sessions + status-summary tiles + filter bar + per-row kebab menu + a template-based **preview drawer** (status, time·duration, trainer, subject, room, students, a static note). Fixture `SESSIONS_FULL` (10 rows).
  - **Dashboard** (`dashboard.html`) already surfaces schedule heavily: a "Today's Sessions" table module, a welcome hero with `todaySessions/liveNow/upcomingToday/attendanceRate` counts and a **"View Schedule"** action, a "Today's Sessions" KPI (+trend, sparkline), and 4 status-summary tiles. **No week-at-a-glance / next-up timetable widget exists.**
- **Reusable components/tokens** (compose, don't reinvent): `pageHeader`, `filterBar` (`data-filter-form`/`data-filter`/`data-target`/`data-filter-apply|reset|count`), `dataTable`/`tableFooter`, `statusChip`/`statusTile`/`status-map` (single source of truth `STATUS` + `STATUS_ORDER`), the **drawer/sheet engine** in `enhance.js` (`openPanel`/`openSheet` over hidden `<template data-preview>` + `data-drawer`/`data-sheet-close`, with scrim/focus-trap/Esc/return-focus), `confirmAction` (`data-confirm-*`), `states` (`noResults`/`emptyBox`/`loadingSkeleton`/`errorState`), `card-grid`, `ui` atoms (`button`/`avatar`/`medallion`/`chip`), `facetAttrs`, and the `.day-group`/`.sched-block`/`.tbl`/`.tabs`/`.tab` CSS. The only existing ARIA tablist is the **nav rail** (nav-only); there is **no generic content-tabs widget** yet.

### Old academy system (PRODUCT/UX reference ONLY — never a visual copy)

Confirmed in `output/combined/{page,table,form,modal,interaction}-inventory.md`, `frontend-planning-deep/*` (03/05/06/07/10/11/13), and admin/teacher/family schedule contact sheets + screenshots:

- **Schedule/timetable pages**: *All Teachers Timetable* (`/management/all/teachers/timetable`) — a **7-day weekly grid of status-colored session blocks** with a left teacher-filter rail, a top metric/legend strip, and an availability editor; *Teacher Timetable* (per-teacher week); *Student Timetable* (a 7-day-column grid table, also a small Day/Time/Duration modal); *Today's Classes* (admin home — the operational hub, a date-filtered flat table topped by clickable KPI status tiles); *CourseClasses*, *Session Class Room*, *Sessions Analysis*, *Request/Search Schedule*, *Scheduled Trials/Actions*.
- **Session table fields**: Class Time, Student/Group, Teacher, Course Details, Left-hours/Duration, Status, Actions (+ accounting: Duration, Student/Teacher amounts, Profit, Status).
- **Filters**: date-range, from/to time, teacher, family, student, type, status (opaque URL codes), and a "group-by-time" display toggle (flagged: filters were hidden/collapsed — a weakness).
- **Session modals/actions** (status-gated): Mark Attend, Mark Absent, Cancel, Edit/Reschedule, Feedback, WhatsApp/Notify, Quick Queue, Details, Direct Links, Student Timetable; make-up/credit outcomes; **dual-timezone** (student vs teacher).
- **Teacher timetable**: abstracted as one *WeeklyCalendar* (all-teachers / single / availability bands with conflict warnings; Sat-first; dual-TZ); a block click opened Show Details / Edit / Show Student.
- **Visual structure**: weekly grid (timetable) + dense flat tables topped by KPI status tiles (sessions) + an analytics dashboard; **no card/agenda view existed** (rebuild docs recommend adding a mobile agenda).
- **Status vocabulary (11)**: Pending, Waiting, Running, Attended, Student Absent, Teacher Absent, Student Cancel, Teacher Cancel, Admin Cancel, Reschedule, Make-up (an admin-themeable color map).
- **Documented weaknesses to improve**: full empty 24-hour time axis; tiny saturated blocks; 3–6 inline colored action pills per row; hidden filters + opaque status codes; tall field-dense single modals (Cancel/Absent/Edit); ad-hoc per-status colors; bare "No data found" empty states; table-only on mobile; heavy eager-loaded detail pages; RTL never exercised.

### What is reused as product/UX concept

The weekly-timetable idea (days × time, status blocks); the today's-sessions operational list with status tiles that double as filters; the status-gated session action set surfaced as one menu (not a pill wall); the make-up/credit and dual-timezone affordances as *display-only* detail fields; the all-teachers vs single-teacher timetable lens; a session "detail" surface (improved from a long page into a focused drawer with progressive disclosure); a family/student-facing weekly timetable + today list (as future-role product context only, not built here).

### What MUST NOT be copied (hard constraint)

Old logo/assets/favicon; legacy colors (esp. purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`); Bootstrap modal/offcanvas/grid structure; old CSS classes; old icon sets (tabler/Font Awesome); legacy widget libraries (select2/flatpickr/ApexCharts/Quill/Dropzone); academy-specific/private wording, names, or data; and any pixel-for-pixel legacy layout. The old system informs **structure/UX only**.

### Missing references

None. All current app files, Spec 001/002 contracts, approved references, and old-system inventories + schedule/timetable/teacher-timetable/session screenshots named in the request were located and inspected; nothing was guessed in place of a missing file.

---

## Design Decisions *(mandatory for this spec — resolve known tensions up front)*

**D1 — Calendar/Timetable view evolves the recorded R3 decision (does not violate "no calendar library").** Spec 002's research R3 chose a single day-grouped *list* over a 7-column week grid for the Schedule page. Spec 003 **deliberately supersedes that single-view choice** by offering **both** views as **tabs**: the day-grouped list (Tab 1, default) is kept, and a **hand-rolled CSS-grid weekly timetable** (Tab 2) is added. The "**no calendar library**" constraint (scope-guard G2, schedule-contract, FR-013 of Spec 002) is fully honored — the grid is native HTML/CSS, baked at build time, RTL-safe, and Django-loop-friendly. This is recorded here so the plan does not read it as a silent reversal.

**D2 — Tabs are a new generic, accessible content-switcher.** A small `role="tablist"` / `role="tabpanel"` widget (mirroring the nav rail's roving-tabindex + Arrow/Home/End pattern, styled with the existing `.tabs`/`.tab` CSS). **All tab panels are baked static HTML**; runtime JS only toggles visibility (no panel is JS-rendered). The selected tab persists in `localStorage` and is reflected in the URL hash so a deep link can open a specific view.

**D3 — Teacher timetable is an admin-facing LENS inside the Schedule page, not a new page.** Per scope-guard G6b, a brand-new nav page would need its own promotion (NI12) and its own spec. Instead, the admin views a teacher's week by selecting a teacher in the Schedule timetable (a teacher filter/lens), plus an optional "all teachers" overview grouping. This stays in-scope, admin-only, fixture-only, and is **not** a teacher portal or teacher dashboard.

**D4 — Session/appointment detail becomes a focused DRAWER with progressive disclosure**, replacing the old long detail page: summary first (status, time, duration, teacher, students/family, subject, room/online link, notes), with secondary info (materials, attendance summary, attention/conflict note, activity) below; all actions are demo or disabled-with-reason. Reuses the existing template-based drawer engine.

**D5 — Status vocabulary stays the calm 4-set, with optional display-only refinements.** The product keeps the existing AA-contrast, icon+label status map (`live / upcoming / completed / cancelled`) rather than importing the legacy 11 backend states (which imply a real lifecycle — out of scope). A small set of **display-only** refinements MAY be shown as fixture flags where the reference calls for them — e.g. a `rescheduled` tag and an "attention/conflict/delayed" indicator — but they are presentation flags, never a real engine, and never color-only.

**D6 — Schedule label reconciliation.** The nav/spec call it "الجدول الدراسي / Schedule" while the Spec 002 schedule-contract titled the page "الجدول الزمني". Spec 003 standardizes on **one** label across nav item, page title, and breadcrumb (recommended page/section wording: **"الجدول الزمني" / "Timetable"** to match the timetable experience), keeping the stable nav id `schedule` and route `schedule.html`. No new nav item is introduced.

**D7 — Dashboard impact is minimal and fixture-backed** (full reasoning in *Dashboard Impact Review* below): reuse the existing schedule signals, wire their "view" affordances to the new timetable, optionally add **one** small week-at-a-glance/up-next preview backed by the existing fixture, and surface attention as a clearly fixture-only display flag. No fake widget is added without a fixture and a link to an in-scope page.

---

## Scope *(mandatory for this spec)*

### In Scope (Spec 003)

A focused, frontend-only **scheduling/timetable experience** layered onto the existing pages, reusing the Spec 001/002 shell, tokens, components, and `data-*` vocabulary, fixtures only:

1. **Enhanced Schedule / Timetable page** (`schedule.html` + `.en`): a **tabbed** experience — **Tab 1 List/structured view** (the existing calm day-grouped block list, kept and polished) and **Tab 2 Calendar/Timetable view** (a new hand-rolled weekly time-grid, no library); a stronger **schedule filter bar** (week/day, teacher, subject, status, and type/student-or-family where the reference supports it); fixture-only time blocks; click a block/row → **detail drawer**; empty/loading/error/no-results states; responsive mobile/tablet/desktop (timetable reflows to an agenda list on mobile).
2. **Teacher-timetable admin view** (D3): an admin-facing teacher lens/filter on the Schedule timetable (single-teacher week + optional all-teachers overview), fixture-only.
3. **Sessions page schedule integration** (`sessions.html` + `.en`): keep the list/table (Tab 1) and add a **Tab 2 today's-timetable** (single-day time-blocks/agenda of today's sessions); make the **session detail drawer richer** (D4); the table↔timetable connection is explicit.
4. **Shared scheduling components/patterns**: a generic **tabs** widget; a **weekly-timetable grid**; a **time-block** card; an extended **schedule filter bar**; a richer **session/appointment detail drawer**; a fixture-only **attention/conflict indicator**; a **mobile agenda** fallback.
5. **Dashboard schedule impact** (D7): reuse + wire existing signals to the new timetable; optionally one small week-at-a-glance/up-next preview; a fixture-only attention count — all backed by existing fixtures and linked to an in-scope page.
6. **Sidebar/topbar integration**: reconcile the Schedule label (D6), keep correct active state + `aria-current`, no dead links; no new nav items (teacher timetable is in-page).

Plus, preserved end-to-end: per-language pre-rendered pages, RTL/LTR, Light/Dark/System, accessibility (axe critical=0), responsiveness, no-dead-button / no-raw-i18n-key / no-external-request guarantees, static / GitHub-Pages / Django-ready delivery, and screenshot acceptance.

### Out of Scope (Spec 003)

Backend scheduling API; database; real auth; real permission enforcement; **real create/edit/delete** of sessions; **real drag-and-drop** scheduling; a **real recurring-schedule engine**; **real conflict detection** (attention flags are fixture-only display); real Zoom/live integration; real attendance workflow; real notifications backend; finance/payroll/invoices/wallet; the **request→respond scheduling broadcast** workflow and **scheduled-actions** automation (reference concepts only); **student/teacher/family dashboards or portals**; calendar libraries; chart libraries; CDN; TypeScript; SPA framework; and any copied legacy assets/classes/logo/palette/icons/private wording. **Teacher timetable here is admin-facing display only — not the teacher dashboard.**

> Family/student-facing timetables and the role dashboards remain future specs; when built they must feel comfortable, cheerful, simple, and human — not heavy admin UI.

### MVP slice (and why)

The MVP is **US1 (List↔Timetable tabs on Schedule) + US3 (detail drawer) + US8 (static/Django-ready timetable markup)**. Delivering the tabbed Schedule page with a readable hand-rolled weekly grid and a focused detail drawer proves the entire scheduling pattern and the static-grid architecture that every other surface (Sessions tabs, teacher lens, dashboard preview) reuses. Filters (US2), the teacher lens (US4), attention (US5), Sessions integration (US6), and dashboard impact (US7) are independent increments composing the same proven pattern. Each is independently testable, so all stay in scope, sequenced by dependency/value.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin views the schedule as List AND Calendar/Timetable (Priority: P1)

As an academy administrator, I open the Schedule page and switch between a structured **List view** and a **Calendar/Timetable view** of the same sessions, so I can both scan details and see the timing relationship at a glance.

**Why this priority**: The tabbed List/Timetable experience is the core request and the connective pattern reused by Sessions and the dashboard; without it, nothing else in the spec is meaningful.

**Independent Test**: Open Schedule; confirm two tabs (List, Timetable); the List tab shows the day-grouped blocks; the Timetable tab shows a readable weekly time-grid of the same fixture sessions; switching tabs changes only the visible panel (no navigation, no reload), is keyboard-operable, and the choice persists.

**Acceptance Scenarios**:

1. **Given** the Schedule page, **When** it renders, **Then** it shows a page header and a **tablist** with at least "List" and "Timetable/Calendar" tabs, with the List tab active by default and both panels present as real baked HTML.
2. **Given** the Timetable tab, **When** it is shown, **Then** it renders a hand-rolled weekly grid (days as columns, time as rows) of status-colored time blocks, cropped to the active hours (not an empty 24-hour axis), readable in RTL with times not mirrored, and **no calendar library** is loaded.
3. **Given** either tab, **When** the admin switches tabs (click or keyboard), **Then** only the active panel becomes visible (the other is hidden, not removed), focus/selection follow ARIA tab semantics, and the selection persists (revisit/deep-link reopens the same view).
4. **Given** a small screen, **When** the Timetable tab is shown, **Then** the grid reflows to a single-day/agenda list without horizontal breakage.

---

### User Story 2 - Admin filters the schedule (Priority: P1)

As an administrator, I filter the schedule by week/day, teacher, subject, and status (and type/student-or-family where supported), so I can quickly find the right sessions in either view.

**Why this priority**: Filtering is essential to a usable schedule and was a flagged weakness of the old system (hidden filters, opaque status codes); strong, visible filters are a screenshot acceptance criterion.

**Independent Test**: On Schedule, apply each filter; confirm both the List and Timetable panels narrow to matching fixture items with visible feedback (active-filter chips + count), a "no results" state with reset when nothing matches, and that filters affect both views consistently.

**Acceptance Scenarios**:

1. **Given** the schedule filter bar, **When** the admin selects a teacher / subject / status / day or week, **Then** both views show only matching pre-rendered items, with active-filter chips and an updated count — never a dead control.
2. **Given** a filter combination that matches nothing, **When** applied, **Then** a friendly "no results" state appears with a clear reset action.
3. **Given** filters are applied in one tab, **When** the admin switches tabs, **Then** the same filter state applies to the other view (consistent narrowing).

---

### User Story 3 - Admin opens appointment/session details (Priority: P1)

As an administrator, I click a time block (Timetable) or a row (List/table) and see a details **drawer** with the session's full fixture info and clearly-labeled demo/disabled actions — instead of navigating into a heavy detail page.

**Why this priority**: Detail-on-demand is the second core request and replaces the old long detail page with a calm, progressive-disclosure drawer; it is shared by Schedule, Sessions, and the dashboard.

**Independent Test**: From the Timetable and from the List/table, open a session's detail drawer; confirm it shows teacher, students/family (if present), subject, room/online link, status, duration/time, and notes, with actions that demo (toast) or are disabled-with-reason; Esc/scrim/close return focus.

**Acceptance Scenarios**:

1. **Given** a time block or a table row, **When** activated (click or keyboard), **Then** a right-side detail drawer opens with summary-first fields (status chip, date/time, duration, teacher, students/family, subject, room/online link) and secondary info (notes, materials, attention/conflict note) below.
2. **Given** the detail drawer, **When** the admin uses an action (e.g., edit/reschedule/cancel/join), **Then** it performs a clearly-labeled demo (toast) or is disabled with a visible reason — **no real persistence, no real join**.
3. **Given** the drawer is open, **When** the admin presses Esc, clicks the scrim, or the close button, **Then** it closes and focus returns to the trigger; the drawer is focus-trapped while open.

---

### User Story 4 - Admin views a teacher's timetable (Priority: P2)

As an administrator, I select a teacher and see that teacher's weekly timetable (and optionally an all-teachers overview) from the admin side, so I can review a teacher's planned sessions without a teacher portal.

**Why this priority**: The all-teachers/per-teacher timetable was a central old-system surface; exposing it as an admin lens adds real value while staying in scope.

**Independent Test**: On the Schedule Timetable tab, choose a teacher; confirm the grid scopes to that teacher's fixture sessions; switch to an all-teachers overview; confirm it is admin-facing display only (no portal, no edit).

**Acceptance Scenarios**:

1. **Given** the Timetable tab, **When** the admin selects a specific teacher, **Then** the grid shows only that teacher's weekly fixture sessions, clearly labeled with the teacher's name/avatar.
2. **Given** the teacher lens, **When** the admin switches to "all teachers", **Then** the timetable shows the combined fixture week (grouped/legible), still readable and not cluttered.
3. **Given** the teacher timetable, **When** reviewed, **Then** it presents as an admin display only — no teacher-portal chrome, no real editing/availability persistence.

---

### User Story 5 - Admin understands schedule alerts (Priority: P2)

As an administrator, I can see fixture-only attention signals — e.g., a teacher/room conflict, a late/delayed session, or an empty schedule day — so I understand where the schedule needs attention.

**Why this priority**: Surfacing attention is valuable and reference-grounded (conflict warnings, cancelled/absent states), but it builds on the views and must be clearly fixture-only (no real detection engine).

**Independent Test**: On Schedule, confirm that fixture items flagged for attention (conflict/delay) show a subtle, non-color-only indicator on the block/row and in the detail drawer; confirm an empty day renders a clear empty-day state; confirm nothing implies real-time detection.

**Acceptance Scenarios**:

1. **Given** a fixture session flagged for attention (conflict/delayed/cancelled), **When** the schedule renders, **Then** it shows a subtle attention indicator (icon + label, never color-only) on the block/row and a matching note in the detail drawer.
2. **Given** a day with no sessions, **When** the schedule renders, **Then** that day shows a clear "no sessions" state (distinguishing "none scheduled" from "no match"), not a blank region.
3. **Given** any attention signal, **When** inspected, **Then** it is visibly a fixture/demo indicator — no claim of real conflict detection or live status.

---

### User Story 6 - Sessions page gains the schedule/timetable connection (Priority: P2)

As an administrator, on the Sessions page I keep the operational table but can also see today's sessions as a timetable/agenda, and the session detail drawer is richer — so the list and the timing view are clearly connected.

**Why this priority**: Sessions is the operational hub; tying it to the timetable pattern and enriching its detail drawer makes the experience cohesive.

**Independent Test**: Open Sessions; confirm a List (table) tab and a Timetable (today's time-blocks/agenda) tab over the same fixture; open a row/block detail drawer and confirm the enriched fields.

**Acceptance Scenarios**:

1. **Given** the Sessions page, **When** it renders, **Then** the existing table is the default List tab and a Timetable/agenda tab shows today's sessions as time-ordered blocks, both driven by the same fixture and filters.
2. **Given** a session in either tab, **When** opened, **Then** the richer detail drawer (D4) appears with the same fields/actions as Schedule, for a consistent experience.
3. **Given** the table tab, **When** reviewed, **Then** it still reads as a modern product table (not a spreadsheet) and the status tiles/filters continue to work.

---

### User Story 7 - Admin Dashboard reflects schedule impact (Priority: P2)

As an administrator, the dashboard's existing schedule signals connect to the new timetable, and (optionally) a small week-at-a-glance/up-next preview backed by the existing fixture is shown — without adding fake widgets.

**Why this priority**: The dashboard already carries strong schedule signals; the impact should be a deliberate, minimal wiring, not new clutter.

**Independent Test**: On the dashboard, confirm the "View Schedule"/"view all" affordances deep-link to the new Schedule Timetable tab; confirm a session row opens the same richer detail drawer; if added, confirm the small up-next/this-week preview reuses the schedule fixture and links to Schedule.

**Acceptance Scenarios**:

1. **Given** the dashboard, **When** the admin uses "View Schedule" (hero) or a "view all" on the Today's Sessions module, **Then** it navigates to the Schedule page and opens the Timetable view (deep link).
2. **Given** the dashboard's Today's Sessions module, **When** a row's detail is opened, **Then** it uses the same richer detail drawer as Schedule/Sessions.
3. **Given** any added schedule preview or attention count, **When** present, **Then** it is backed by an existing fixture and links to an in-scope page — no fake/unbacked widget.

---

### User Story 8 - Static / Django-ready timetable markup (Priority: P1)

As a developer, every scheduling surface (tabs, timetable grid, agenda, detail templates) is real baked HTML in `public/`, deployable to GitHub Pages and convertible to Django templates; JS only toggles tabs, opens overlays, and filters pre-rendered items.

**Why this priority**: The static/Django-ready architecture is non-negotiable; the timetable grid must not be a runtime-drawn calendar.

**Independent Test**: Build; open `public/schedule.html` (Live Server) and View Source — full shell + both tab panels + the timetable grid + detail templates are present as real markup with relative paths; no `<div id="app">`; no external requests; toggling tabs/filters works as enhancement only.

**Acceptance Scenarios**:

1. **Given** a built Schedule/Sessions page, **When** its source is viewed, **Then** the tabs, the weekly timetable grid, the agenda, and the detail `<template>`s are complete static HTML (no whole-page `#app` mount, no JS-built page DOM) with relative `./assets/` paths.
2. **Given** the site served from any static host (incl. a project subpath), **When** a scheduling page loads, **Then** all assets resolve and there are **zero** external (CDN) requests; no calendar/chart library is loaded.
3. **Given** a scheduling page, **When** assessed for portability, **Then** it maps cleanly to Django (`{% for day %}{% for block %}` for the grid/list, shell → partials, fixtures → context, behavior via stable `data-*` hooks).

---

### User Story 9 - Visual / reference alignment (Priority: P1)

As a reviewer, the scheduling experience resembles the analyzed system's product idea but is cleaner, calmer, more premium, and more modern — and is visually consistent with Spec 001/002.

**Why this priority**: The explicit goal is "better than the reference"; visual drift or a raw-spreadsheet/crowded-grid look is a failure.

**Independent Test**: Review the timetable, list, agenda, and detail drawer against the approved design and the old-system screenshots (as product reference only); confirm premium/calm/readable, not a legacy copy and not invented-from-nowhere.

**Acceptance Scenarios**:

1. **Given** the Timetable view, **When** reviewed, **Then** it uses generous, readable time blocks (not tiny saturated rectangles), a cropped time axis, a small consistent status set (icon+label, not a rainbow), and a quiet "today/now" accent — recognizably the same product as Spec 001.
2. **Given** any scheduling surface, **When** compared to Spec 001/002, **Then** shell, canvas, sidebar, topbar, cards, chips, and typography match — no drift — and nothing is copied from the legacy visuals.

---

### User Story 10 - Screenshot acceptance (Priority: P1)

As a reviewer, the required screenshot matrix is captured and judged against the approved direction and the reference, with verdicts recorded.

**Independent Test**: Capture the matrix below; review each against the Spec 001 approved direction + sidebar reference + existing Spec 001/002 screenshots + the old schedule screenshots (product reference only); record verdicts in `app/screenshots/REVIEW.md`.

**Acceptance Scenarios**:

1. **Given** the captured screenshots, **When** reviewed side-by-side, **Then** the List, Timetable, teacher-timetable, detail drawer, dashboard impact, mobile, and tablet frames match the approved direction with zero failure conditions triggered.
2. **Given** any failure condition (plain-table-only, missing calendar tab, missing detail drawer, invented/unrelated, legacy copy, clutter, unreadable blocks, weak filters, dead actions, poor dark mode, broken RTL/LTR, JS-rendered page, calendar library, non-deployable, hard-to-Djangoify, missing dashboard impact review), **When** detected, **Then** the build is not accepted until fixed.

---

### Edge Cases

- **Empty day / empty week**: a clear "no sessions scheduled" state per day and for the whole week (distinct from "no match"), never a blank grid; the old system's bare "No data found" is explicitly improved.
- **Loading / error**: skeleton placeholders for the grid/list and a friendly error+retry state, matching the approved patterns.
- **Long content**: long Arabic/English titles, teacher names, and room labels truncate/wrap gracefully inside time blocks, day headers, table cells, and the drawer in both directions.
- **Overlapping / back-to-back sessions**: the timetable renders adjacent/overlapping fixture blocks legibly (stacked/side-by-side) without breaking the grid; an overlap may carry the fixture attention indicator.
- **Off-hours sessions**: a fixture session outside the default visible window expands the cropped axis just enough (or is surfaced in the agenda), rather than forcing a full 24-hour grid.
- **Sparse vs dense days**: a day with many sessions stays readable (scroll within the column / sensible min block height); a day with one session is not stretched awkwardly.
- **Tab + filter + drawer interplay**: switching tabs preserves filters and selected teacher; opening a drawer from either view returns focus to the originating block/row.
- **Theme/direction switch**: switching Light↔Dark↔System re-themes the grid/blocks/drawer instantly with no flash; switching Arabic↔English navigates to the equivalent page, mirrors the grid columns/chevrons, and never mirrors times/numbers/dates.
- **Mobile timetable**: the weekly grid becomes a single-day/agenda list (day switcher), not a horizontally-cramped grid.
- **No-JS / progressive enhancement**: with JS off, the default (List) panel and all baked content still render; tabs degrade to anchored sections; filters show all items.

---

## Requirements *(mandatory)*

### Functional Requirements — Tabs & Views

- **FR-001**: Every schedule/timetable/appointment surface (Schedule page; Sessions page; any future appointment-like page in scope) MUST offer a **tabbed experience** with at least a **List/structured view** and a **Calendar/Timetable view**, implemented as an accessible `role="tablist"`/`role="tabpanel"` widget with the List tab active by default.
- **FR-002**: All tab panels MUST be **pre-rendered static HTML**; runtime JS MUST only toggle panel visibility (no panel is JS-rendered). The selected tab MUST persist (e.g., `localStorage`) and be reflected in the URL hash for deep-linking.
- **FR-003**: The tablist MUST be keyboard-operable (Arrow/Home/End + Enter/Space, roving tabindex), expose correct `aria-selected`/`aria-controls`/`tabindex`, and degrade gracefully with JS disabled (panels remain reachable as baked sections).

### Functional Requirements — Calendar / Timetable Grid

- **FR-004**: The Calendar/Timetable view MUST be a **hand-rolled weekly time-grid** (days as columns, time as rows) built with semantic HTML + CSS grid/flex — **no calendar library, no chart library, no drag-and-drop, no external dependency** — and baked at build time (not runtime-drawn).
- **FR-005**: The grid MUST crop the time axis to the active/working hours of the fixture week (not a full empty 24-hour span), render generous, readable status-colored **time blocks** (course/teacher primary, time/duration secondary), and mark a quiet "today/now" accent.
- **FR-006**: The grid MUST be RTL-first (Sat-first week, columns mirrored via logical properties) and LTR-correct, never mirroring times/numbers/dates, and MUST reflow to a single-day **agenda** on mobile.
- **FR-007**: The grid MUST render overlapping/back-to-back fixture sessions legibly and MUST show clear empty-day and empty-week states.

### Functional Requirements — Filters & Scanning

- **FR-008**: The schedule filter bar MUST provide week/day, teacher, subject, and status facets (plus type and student/family where the fixture supports it), applied to the pre-rendered items in **both** views consistently, with visible feedback (active-filter chips + count) and a "no results" + reset state — **no weak/dead filters**.
- **FR-009**: Filter and selected-teacher state MUST be preserved when switching tabs.

### Functional Requirements — Teacher Timetable (admin lens)

- **FR-010**: The Schedule Timetable view MUST allow the admin to scope the grid to a **single teacher's** weekly fixture sessions and to an **all-teachers** overview, as admin-facing display only — **not** a teacher portal/dashboard and with no real availability/edit persistence.

### Functional Requirements — Appointment / Session Detail

- **FR-011**: Clicking a time block or a table row MUST open a **detail drawer** (reusing the existing template-based drawer engine: scrim, focus trap, Esc, return-focus) showing summary-first fields — status, date/time, duration, teacher, students/family (if present), subject, room/online link — and secondary fields (notes, materials, attention/conflict note) below.
- **FR-012**: Detail-drawer actions (edit/reschedule/cancel/join/notify, etc.) MUST be **demo-with-toast** or **disabled-with-reason** — no real persistence, no real join/integration. A destructive demo MUST use the approved confirmation-modal pattern.

### Functional Requirements — Attention / Alerts (fixture-only)

- **FR-013**: The schedule MUST be able to surface **fixture-only** attention signals (conflict, delayed/late, cancelled, empty day) as a subtle indicator (icon + label, **never color-only**) on the block/row and in the detail drawer, clearly presented as demo data — **no real conflict-detection or live-status engine**.

### Functional Requirements — Sessions Integration

- **FR-014**: The Sessions page MUST keep its table as the default List tab and add a **Timetable/agenda** tab presenting today's sessions as time-ordered blocks over the same fixture and filters, and MUST use the same richer detail drawer (FR-011/FR-012).

### Functional Requirements — Dashboard Impact

- **FR-015**: The dashboard's existing schedule affordances ("View Schedule", Today's Sessions "view all", row detail) MUST connect to the new timetable (deep-link to the Timetable tab) and the unified detail drawer. Any added schedule preview (e.g., week-at-a-glance / up-next) or attention count MUST be backed by an existing fixture and link to an in-scope page; **no fake/unbacked widget** may be added.

### Functional Requirements — Navigation & Labeling

- **FR-016**: The Schedule label MUST be reconciled to a single consistent value across the nav item, page title, and breadcrumb (keeping nav id `schedule`, route `schedule.html`), with the active nav pill + `aria-current` correct; **no new dead nav links** and no new nav page are introduced for the teacher timetable.

### Functional Requirements — Fixture Data & Architecture

- **FR-017**: All displayed schedule/timetable/session/appointment data MUST come from local static fixtures (extending `SCHEDULE_WEEK` / `SESSIONS_FULL` with the fields the grid/drawer need — e.g., day/date, duration→grid span, room/online link, students/family, attention flag, optional type) — no real backend, auth, permissions, persistence, recurrence engine, or conflict detection.
- **FR-018**: Each scheduling page MUST remain a complete static HTML file in `public/` (real shell + tab panels + grid + templates; no `<div id="app">` whole-page mount; no runtime JS building page DOM), deployable to GitHub Pages, and structured for clean Django conversion (`{% for %}` over days/blocks, shell → partials, fixtures → context, `data-*` hooks).
- **FR-019**: Behavior MUST attach via the established **`data-*` hook vocabulary** (`data-filter-form`/`data-filter`/`data-target`/`data-filter-apply|reset|count`, `data-table`, `data-row` + facets, `data-row-menu`, `data-drawer`/`data-preview`/`data-sheet-close`, `data-modal-trigger`/`data-confirm`, `data-demo-action`, `data-disabled-reason`, `data-toast`) plus new tab/timetable hooks (e.g., `data-tabs`/`data-tab`/`data-tabpanel`, `data-timetable`/`data-slot`/`data-teacher`) — reused, stable, Django-reproducible, never JS-generated ids/classes.

### Functional Requirements — Cross-cutting Quality

- **FR-020**: Every scheduling surface MUST render correctly in Arabic RTL and English LTR (mirroring layout/columns/chevrons, never numbers/times/dates) and in Light, Dark, and System themes (true-dark surfaces, correct contrast, no flash).
- **FR-021**: Every scheduling surface MUST be responsive across mobile, tablet, and desktop (timetable → agenda, tables scroll/stack, drawer full-height on mobile) without horizontal overflow or breakage.
- **FR-022**: Every control MUST satisfy the **no-dead-button** rule (demo action, in-scope navigation, open overlay, apply/reset filter, switch tab, or disabled-with-reason); there MUST be **no raw i18n keys** and **zero external/CDN requests**; all assets local + relative.
- **FR-023**: Every scheduling surface MUST be keyboard operable with visible focus and meet WCAG AA expectations, verified by an automated accessibility scan reporting **no critical violations**; status/attention is never conveyed by color alone.
- **FR-024**: Acceptance MUST include a **screenshot review** of the matrix below, visibly matching the Spec 001/002 approved direction and improving on the old-system reference.

### Key Entities *(display fixtures only — no persistence, no API)*

- **Schedule/Timetable Block (fixture)** — id, day-of-week/date, start, end/duration (→ grid span), title, level, subject, teacher (name+avatar+accent), room and/or online link, students/family (optional), status (`live/upcoming/completed/cancelled` + optional display tags `rescheduled`), optional `attention` flag (conflict/delayed). *(extends `SCHEDULE_WEEK`)*
- **Session (fixture)** — the existing session row enriched for the drawer: time, duration, title, level, subject, teacher, room/online link, students present/capacity, family (optional), notes, materials, status, optional `attention`. *(extends `SESSIONS_FULL`)*
- **Teacher (lens, fixture)** — name, avatar+accent, and the subset of weekly blocks they teach (for the teacher-timetable lens). No portal data.
- **Tab State (display-only)** — selected tab per surface (persisted + URL-hash), no server contract.
- **Filter State (fixture, display-only)** — selected week/day, teacher, subject, status, type/student-family; reflected as active-filter chips; no URL/server contract beyond the deep-link hash.
- **Attention Signal (fixture, display-only)** — kind (conflict/delayed/cancelled/empty-day) + label; presentation flag only, no detection engine.
- **Status vocabulary** — reuses the single Spec 001 status map (color + icon + label; never color-only).

---

## Dashboard Impact Review *(mandatory for this spec)*

1. **Does schedule/timetable affect the Admin Dashboard?** Yes, but lightly — the dashboard already carries strong schedule signals; the impact is wiring + at most one small preview, not new clutter.
2. **Which schedule signals should appear now?** The ones that already exist: the **Today's Sessions** table module, the welcome-hero counts (`todaySessions/liveNow/upcomingToday/attendanceRate`), the "Today's Sessions" KPI, and the 4 status tiles. These are kept.
3. **Should we update an existing dashboard sessions card?** Yes — make its row detail open the **unified richer drawer** (FR-011) and make its "view all" / the hero "View Schedule" **deep-link to the new Timetable tab** (FR-015).
4. **Should we add a small "Today's timetable" / "Upcoming sessions" preview?** Optionally **one** compact **week-at-a-glance / up-next** strip reusing `.sched-block` over the existing `SCHEDULE_WEEK`/`SESSIONS` fixture, linking to Schedule — included only because a fixture and an in-scope target already exist. It is a P2/optional increment, kept small and calm.
5. **Should we add attention alerts (conflicts/delays)?** Only a **fixture-only** display indicator (count or badge) consistent with FR-013, clearly demo — not a real alerting system.
6. **Active, fixture-only, planned, or deferred?** The deep-links + unified drawer = **active**. The up-next preview + attention count = **active but fixture-only/demo**. Anything implying real detection, real upcoming feeds, or notifications = **deferred/out**.
7. **What stays out until backend modules exist?** Real conflict detection, real upcoming/notification feeds, attendance, recordings, accounting/payout, and the request→respond scheduling workflow.

> No fake dashboard widget is added without a clear fixture and a link to an implemented, in-scope page.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On the Schedule page, an admin can switch between a List view and a Calendar/Timetable view of the same sessions; both are present as baked HTML and the timetable shows the timing relationship at a glance (not a plain table/list).
- **SC-002**: 100% of the required screenshot matrix is captured and judged to match the approved direction and improve on the reference; **zero** screenshots trigger a stated failure condition (notably: not plain-table-only, calendar tab present, detail drawer present, readable blocks, strong filters, no dead actions, good dark mode, correct RTL/LTR).
- **SC-003**: Clicking any time block or session row opens a details drawer with the session's fixture info; **100%** of detail-drawer and schedule controls are functional/navigational/overlay/filter/tab/disabled-with-reason (no dead buttons); **zero** raw i18n keys appear.
- **SC-004**: The admin can scope the timetable to a single teacher and to all teachers (admin-facing display only); a reviewer confirms it is not a teacher portal/dashboard.
- **SC-005**: Fixture attention signals (conflict/delayed/cancelled/empty-day) are visible as icon+label indicators on the schedule and in the drawer, and a reviewer confirms they read as demo/fixture data (no real-detection claim).
- **SC-006**: The Sessions page offers List (table) + Timetable/agenda tabs over the same fixture and uses the same richer detail drawer; the table still reads as a modern product table.
- **SC-007**: The dashboard's schedule affordances deep-link to the new Timetable and use the unified drawer; any added preview/attention element is fixture-backed and links to an in-scope page.
- **SC-008**: Every scheduling page renders correctly in all 6 combinations of {Arabic RTL, English LTR} × {Light, Dark, System} and at representative mobile/tablet/desktop widths, with the timetable reflowing to an agenda on mobile and no horizontal overflow.
- **SC-009**: Automated accessibility scans report **zero critical violations**; every scheduling surface is keyboard-operable with visible focus; status/attention is never color-only.
- **SC-010**: Each scheduling page is a complete static HTML file in `public/` with **zero external (CDN) requests** and **no calendar/chart library**, loads from a static host (incl. a project subpath), contains no whole-page JS mount, and maps cleanly to a Django template (`{% for %}` over days/blocks).
- **SC-011**: A reviewer unfamiliar with the project, shown the scheduling surfaces beside Spec 001/002, confirms they belong to the same product (no visual drift) and resemble the analyzed system's idea without copying its visuals.

---

## Visual Acceptance *(mandatory for this spec)*

Automated tests are required but insufficient. Final acceptance REQUIRES a screenshot review visibly matching the Spec 001/002 approved direction. Required matrix (minimum) — file naming `{page}__{lang}__{theme}__{viewport}[__{variant}].png`, verdicts appended to `app/screenshots/REVIEW.md`:

1. Schedule — **List tab** — Arabic RTL, Light, Desktop
2. Schedule — **Timetable tab** — Arabic RTL, Light, Desktop
3. Schedule — **Timetable tab** — Arabic RTL, Dark, Desktop
4. Schedule — **Timetable tab** — English LTR, Light, Desktop
5. Schedule — **Teacher-timetable lens** — Arabic RTL, Light, Desktop
6. **Appointment/session detail drawer** — Arabic RTL, Light, Desktop (variant `drawer`)
7. **Admin Dashboard** schedule impact — Arabic RTL, Light, Desktop (if a preview/deep-link change is visible)
8. **Mobile** schedule/timetable agenda fallback — Arabic RTL, Light
9. **Tablet** Timetable view — Arabic RTL, Light
10. Sessions — **Timetable/agenda tab** — Arabic RTL, Light, Desktop

Reviewed against: the Spec 001 approved dashboard direction, the approved sidebar reference, the existing Spec 001/002 screenshots, and the old academy schedule/timetable screenshots **as product/UX reference only (not visual copy)**.

**A review FAILS if any of the following are true:** the schedule/timetable appears as a plain table only; the calendar/timetable tab is missing; the modal/drawer details are missing; it looks invented and unrelated to the reference; it looks copied from the legacy visuals; too cluttered; unreadable time blocks; weak filters; dead actions; poor dark mode; broken RTL/LTR; the page is JS-rendered instead of static HTML-first; a calendar library is used; it cannot deploy to GitHub Pages; it is hard to convert to Django templates; or the Dashboard Impact Review is missing.

---

## Constraints & Non-Negotiables *(mandatory for this spec)*

**Must continue (from Spec 001/002):** static HTML-first delivery to `public/`; per-language pre-rendered pages; relative + local assets; compiled Tailwind/PostCSS CSS; native ES-module JS that **only enhances** existing markup (tabs/overlays/filters only); self-hosted fonts/icons; GitHub-Pages compatible; Django-template-ready; the established `data-*` hook vocabulary; the unchanged category-rail shell + topbar; the single status map; screenshot-based visual acceptance; Arabic RTL first + English LTR; Light/Dark/System.

**Must NOT use:** calendar libraries; chart libraries; drag-and-drop libraries; SPA framework; TypeScript; CDN; backend API; database; real auth; real permission enforcement; real CRUD/persistence; a recurrence engine; real conflict detection; legacy widget libraries; any copied legacy assets/classes/Bootstrap/logo/palette/icons/private wording; or a JS-rendered whole-page mount / runtime-drawn grid.

**Must NOT include (product scope):** backend scheduling; real create/edit/delete/reschedule; real drag-drop scheduling; real Zoom/live; attendance workflow; notifications backend; finance/payroll/invoices/wallet; the request→respond scheduling workflow + scheduled-actions automation; student/teacher/family dashboards or portals. **Teacher timetable = admin-facing display only.**

---

## Anticipated Contracts *(for the later plan)*

The `/speckit.plan` step is expected to produce, at minimum:

- `timetable-page-contract.md` — Schedule page anatomy: tabs, filters, list + timetable views, teacher lens, states.
- `calendar-view-contract.md` — the hand-rolled weekly grid (structure, time-axis cropping, blocks, overlap, RTL, mobile agenda, no library).
- `schedule-tabs-contract.md` — the generic tabs widget (ARIA, keyboard, persistence, URL hash, baked panels, JS-off degradation).
- `appointment-details-contract.md` — the detail drawer fields, progressive disclosure, demo/disabled actions, confirm modal.
- `teacher-timetable-contract.md` — the admin teacher lens / all-teachers overview (display-only, no portal).
- `dashboard-impact-contract.md` — the deep-links, unified drawer, optional up-next preview, fixture attention.
- `static-html-django-ready-contract.md` — SSG output for grid/tabs/templates, per-language pages, relative paths, GitHub Pages, Django `{% for %}` mapping.
- `screenshot-acceptance.md` — the matrix + failure conditions above.
- `scope-guard.md` — the in/out scope + forbidden list above (no calendar lib; teacher timetable admin-only; fixtures only).

---

## Assumptions

- **Pages touched** = the existing `schedule.html`, `sessions.html`, and `dashboard.html` (+ their `.en` variants). **No new nav page** is added; the teacher timetable is an in-page admin lens (D3). The Schedule label is reconciled to one value (D6).
- **Reuse over reinvention**: the experience composes existing components (`pageHeader`, `filterBar`, `dataTable`, `status-chip/tile/map`, the drawer engine, `confirmAction`, `states`, `card-grid`, `.day-group`/`.sched-block`, `.tabs`/`.tab`) plus a small set of new pieces (a generic **tabs** widget, a **weekly-timetable grid**, a **time-block**, an enriched **detail drawer**, an **attention** indicator, a **mobile agenda**). No new framework/library.
- **Calendar/Timetable = hand-rolled** native HTML/CSS grid, baked at build time (D1); the day-grouped list is kept as the default tab — the timetable view is added, not substituted. "No calendar library" is preserved.
- **Status stays the calm 4-set** (D5); the legacy 11 backend states inform structure only and are not adopted (they imply a real lifecycle, out of scope). Optional display-only tags (`rescheduled`, attention) are presentation flags.
- **Fixtures are original placeholder content** extending `SCHEDULE_WEEK`/`SESSIONS_FULL` with the fields the grid/drawer/teacher-lens need; no legacy/private wording, names, or assets.
- **Previews over deep navigation**: session/appointment details use the drawer with fixture data; no separate detail pages (out of scope).
- **Language model** continues Spec 001/002: per-language pre-rendered pages with a navigating toggle; the canonical basis for later Django `{% trans %}`. Tab/filter state persists client-side (+ URL hash for deep-linking) only.
- **No constitution constraints yet**: the project constitution is an unfilled template; if ratified later, re-check this spec against it.
- **Git**: per the established project pattern, Spec 003 continues on branch `feature/001-approved-dashboard-design` (specs 001/002 live there with uncommitted work); the spec directory name is independent of the branch, and nothing is committed by this command.

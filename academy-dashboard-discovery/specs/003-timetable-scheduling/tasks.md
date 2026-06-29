---
description: "Task list for Spec 003 — Timetable and Scheduling Experience"
---

# Tasks: Timetable and Scheduling Experience

**Input**: Design documents from `academy-dashboard-discovery/specs/003-timetable-scheduling/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (all present)

**Tests**: **INCLUDED** — the spec mandates automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, HTML-structure/no-`#app`, tabs/grid/drawer asserts, keyboard) **and** screenshot-based visual acceptance.

**App root**: `academy-dashboard-discovery/app/` (paths relative to it). Spec 003 **evolves the implemented Spec 001/002 app in place** — same static HTML-first SSG, same pipeline, **no new dependencies, no new pages/routes**. Only the `schedule` / `sessions` / `dashboard` surfaces change. Existing files are unchanged unless a task says EXTEND/CHANGE.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US10 (story phases only)

## Story sequencing rationale (read first)

Six of the ten stories are P1. They are sequenced by **build dependency**, not raw priority number:

- **Foundational** builds the page-agnostic shared building blocks every surface needs — the tabs widget, the timetable block/grid pieces, the shared appointment drawer, the attention indicator, the fixture extensions, the CSS, and the `enhance.js` tab/drawer engines.
- **US1 (List↔Timetable tabs on Schedule, P1)** is the MVP: it assembles the tabbed Schedule page with the hand-rolled weekly grid.
- **US2 (filters, P1)** and **US3 (detail drawer, P1)** complete the core Schedule experience.
- **US8 (static/Django-ready, P1)** is a verification story sequenced right after the grid exists (it checks the baked markup).
- **US4 / US5 (teacher lens, attention — P2)**, **US6 (Sessions, P2)**, **US7 (dashboard, P2)** are independent increments.
- **US9 (visual alignment, P1)** and **US10 (screenshot acceptance, P1)** are cross-cutting acceptance stories sequenced last because they require all surfaces to exist — same rationale as Spec 001/002's final P1 stories.

Earliest demo = **US1** (Schedule has List + Timetable tabs). Full scheduling MVP = through **US3** (tabs + filters + detail drawer on Schedule).

---

## Phase 1: Setup

**Purpose**: Guard the Spec 001/002 baseline, add i18n namespaces, and reconcile the Schedule label.

- [x] T001 Verify the Spec 001/002 baseline is green before evolving: run `npm run build && npm test && npm run screenshots` in `academy-dashboard-discovery/app/` and confirm clean (no regressions to protect)
- [x] T002 [P] Add Spec 003 i18n keys to `src/locales/ar.extra.js` + `src/locales/en.extra.js` (EXTEND via the existing `deepMerge`): `tab.*` (list/timetable), `tt.*` (timetable axis/today/empty), `teacherLens.*` (all-teachers + per-teacher), `attention.*` (conflict/delayed/cancelled/emptyDay), `appt.*` (drawer groups/actions + `appt.tzHint`), and reconcile the Schedule label to **`الجدول الدراسي` / `Timetable`** (per research R19); keep all Spec 001/002 keys
- [x] T003 [P] Reconcile the Schedule label in `src/js/nav.config.js` (the `schedule` item `labelKey` → `الجدول الدراسي`/`Timetable`) and in `scripts/build-html.mjs` (`schedule` page `titleKey`/`crumbKey`); **keep id + route `schedule` / `schedule.html` unchanged** (FR-016, R19)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared, surface-agnostic building blocks + enhancement engines every scheduling surface reuses (the substance of US8 static-first).

**⚠️ CRITICAL**: No story phase begins until this phase is complete.

- [x] T004 [P] Implement `src/js/components/tabs.js` — a generic accessible content-tabs builder: `tabs({ group, tabs:[{id,labelKey}], panels })` → a `role="tablist"` of `role="tab"` buttons (`data-tab`, `aria-selected`, `aria-controls`, roving `tabindex`) + baked `role="tabpanel"` panels (`data-tabpanel`, inactive carries `hidden`); List is the default tab, per schedule-tabs-contract
- [x] T005 [P] Implement `src/js/components/time-block.js` — a single timetable block card (status tone via the status map, time/duration secondary, title/teacher primary, `data-row` + facet attrs, `data-drawer` trigger, optional attention slot), per calendar-view-contract
- [x] T006 [P] Implement `src/js/components/attention-flag.js` — a fixture-only attention indicator (`{kind,labelKey}` → icon + label, never color-only; `data-attention`), per FR-013
- [x] T007 [P] Implement `src/js/components/appointment-details.js` — the shared drawer-content builder producing a `<template data-preview="<id>">` with the 5 progressive-disclosure groups (Summary / People / Logistics+tz-hint / More / Actions), per appointment-details-contract
- [x] T008 [P] EXTEND `src/js/fixtures/schedule.js` — `ScheduleWeek` { days(Sat-first), axis(cropped working hours, 30-min step), teachers(derived) }; each `TimetableBlock` gains `roomLinkKey?`/`students?`/`familyKey?`/`attention?`/`type?` + a **build-time** `gridRow` span (and `gridCol` for overlaps) computed from `start`/`end` vs the axis, per data-model + calendar-view-contract §5
- [x] T009 [P] EXTEND `src/js/fixtures/sessions.js` — rows gain `dateKey`/`roomLinkKey?`/`familyKey?`/`notesKey?`/`materialsKey?`/`attention?` + a `details` object for the shared drawer, per data-model
- [x] T010 [P] EXTEND `src/styles/app.css` — `.tabs`/`.tab`/`.tabpanel`; the timetable grid `.timetable` + `.tt-axis`/`.tt-col`/`.tt-slot` + `.tt-block` (status tones + inline-start accent + today accent); `.agenda` blocks; `.attention-flag`; RTL logical properties + mobile breakpoint (grid→agenda)
- [x] T011 EXTEND `src/js/enhance.js` — the **tab engine**: delegated `[data-tab]` click + Arrow/Home/End/Enter/Space roving-tabindex toggle the matching `[data-tabpanel]` (`hidden` on the rest), persist `localStorage['academy.schedView.<page>']`, sync the URL hash (`#view=list|timetable`, hash-wins-on-load), degrade with JS off, per schedule-tabs-contract
- [x] T012 EXTEND `src/js/enhance.js` — the **appointment drawer + attention** wiring: `[data-drawer]` opens the baked `<template data-preview>` via the existing `openSheet`/`openPanel` engine (scrim/focus-trap/Esc/return-focus); drawer actions resolve to demo-toast / confirm-modal / disabled-with-reason; render `data-attention` notes (same file as T011 → **serialize after T011**)

**Checkpoint**: Shared components + tab/drawer engines + extended fixtures + CSS ready; build still green.

---

## Phase 3: User Story 1 - Admin views the schedule as List AND Timetable (Priority: P1) 🏗️ MVP

**Goal**: The Schedule page offers a List/Agenda tab and a hand-rolled weekly Timetable tab over the same fixture; switching changes only the visible panel.

**Independent Test**: Open Schedule; confirm a tablist (List default + Timetable); the Timetable tab shows a readable weekly grid; switching tabs (click + keyboard) changes only the panel, persists, and updates `#view`.

- [x] T013 [P] [US1] Implement `src/js/components/timetable-grid.js` — the hand-rolled weekly grid: a `.tt-axis` time column + one `.tt-col` per weekday (Sat-first), placing each `time-block` by its **build-time** `gridRow`/`gridCol`, a quiet today accent, `data-timetable`/`data-slot` hooks; **no calendar library**, per calendar-view-contract
- [x] T014 [US1] CHANGE `src/js/pages/schedule.js` — page header (`الجدول الدراسي`/`Timetable` + breadcrumb + optional week strip) + `tabs({List, Timetable})`: the **List** panel reuses `schedule-list` (baked), the **Timetable** panel renders `timetable-grid` (baked); both panels in the static HTML, List active by default, per timetable-page-contract
- [x] T015 [US1] Build + verify `public/schedule.html` (+ `.en`): a `role="tablist"` with ≥2 tabs, **both** panels baked, **exactly one** visible, the Timetable panel shows the weekly grid; tab switch (click + Arrow/Home/End) + persistence + `#view=timetable` deep-link all work; no `#app`

**Checkpoint** 🎯: Schedule has working List + Timetable tabs — the MVP.

---

## Phase 4: User Story 2 - Admin filters the schedule (Priority: P1)

**Goal**: Week/day, teacher, subject, and status filters narrow **both** views consistently with visible feedback, preserved across tabs.

**Independent Test**: Apply each filter; both panels narrow to matching blocks with chips + count; an empty match shows "no results" + reset; switching tabs keeps the filter.

- [x] T016 [US2] CHANGE `src/js/pages/schedule.js` — extend the `filter-bar` with **teacher** + **week/day** facets (subject/status already exist); ensure every block in **both** the List and Timetable panels carries the `data-row` + `data-teacher`/`data-subject`/`data-status`/`data-day` facet attrs, per timetable-page-contract §5
- [x] T017 [US2] EXTEND `src/js/enhance.js` — make `data-filter-form` show/hide pre-rendered blocks across **both** panels, update active chips + `data-filter-count`, drive the `data-no-results` state, and **preserve filter state across tab switches** (same file as T011/T012 → **serialize after T012**), per interaction-patterns IP2 + FR-009
- [x] T018 [US2] Verify filters narrow both List and Timetable, "no results" + reset works, and state is preserved when switching tabs (`src/js/pages/schedule.js` → `public/schedule.html`)

**Checkpoint**: Strong, consistent filters across both views.

---

## Phase 5: User Story 3 - Admin opens appointment/session details (Priority: P1)

**Goal**: Clicking a time block (Timetable) or a row (List) opens the shared appointment drawer with progressive disclosure and demo/disabled actions.

**Independent Test**: Open a detail drawer from the Timetable and from the List; confirm summary→people→logistics→more fields and that actions demo/confirm/disable; Esc/scrim/close return focus.

- [x] T019 [US3] CHANGE `src/js/pages/schedule.js` — bake a `<template data-preview="<id>">` per block via `appointment-details`; each block/list row carries `data-drawer="<id>"` to open it
- [x] T020 [US3] Wire the drawer actions (in `appointment-details` output + `enhance.js` already): Edit/Reschedule + Notify → `data-demo-action` toast; Cancel → `data-confirm` modal → toast; Join/Open link → `data-disabled-reason` (no real Zoom); render the static `appt.tzHint` line, per appointment-details-contract §3
- [x] T021 [US3] Verify the drawer opens from **both** the List and Timetable, shows the required fields (status/date/start–end/duration/teacher/students-family/subject/room-link/notes/attention), is focus-trapped, Esc/scrim/close return focus, and has **no dead actions**

**Checkpoint**: One shared, calm detail drawer replaces the legacy long detail page.

---

## Phase 6: User Story 8 - Static / Django-ready timetable markup (Priority: P1)

**Goal**: The tabs, weekly grid, agenda, and detail templates are real baked HTML; the grid is placed at build time, not runtime-drawn.

**Independent Test**: Build; View Source on `public/schedule.html` — full shell + both panels + grid + `<template>`s present, no `#app`, block placement baked, relative paths; no external requests.

- [x] T022 [US8] EXTEND `tests/smoke/run.cjs` — assert on schedule/sessions: a `role="tablist"` with **≥2 tabs**, **exactly one** visible `tabpanel`, a present `[data-timetable]` grid on the Timetable panel, block placement is **baked** (class/inline custom property, not computed at runtime), `<template data-preview>` present, **no `id="app"`**, relative `./assets/` paths, and tab-switch works (click + key)
- [x] T023 [US8] Update `app/README.md` + `quickstart.md` (Django section) with the timetable/tabs mapping (`{% for day in week.days %}{% for block in day.blocks %}` for grid/list/agenda, tabs → static panels / `{% if view %}`, the precomputed span as an inline style/class, fixtures → context, `data-*` hooks), per static-html-django-ready-contract

**Checkpoint**: Static/Django architecture preserved and verified for the new surfaces.

---

## Phase 7: User Story 4 - Admin views a teacher's timetable (Priority: P2)

**Goal**: An admin teacher lens inside the Timetable tab — all-teachers overview (default) + single-teacher scoping, display only.

**Independent Test**: On the Timetable tab, pick a teacher → the grid scopes to that teacher; switch to "all teachers" → combined week; confirm no portal/edit.

- [x] T024 [US4] CHANGE `src/js/pages/schedule.js` — add the teacher facet (`data-filter="teacher"`, options **derived** from the schedule fixture) to the Timetable tab; default **"All teachers"** labels each block with its teacher avatar/name; selecting a teacher scopes via the existing client-side filter of baked blocks, per teacher-timetable-contract
- [x] T025 [US4] Verify single-teacher scoping + all-teachers overview are readable and RTL-correct, and that it is **admin display only** (no teacher-portal chrome, no edit/availability persistence, no new route)

**Checkpoint**: Admin teacher-timetable lens works without a portal.

---

## Phase 8: User Story 5 - Admin understands schedule alerts (Priority: P2)

**Goal**: Fixture-only attention signals (conflict/delayed/cancelled/empty-day) surface on blocks/rows and in the drawer.

**Independent Test**: Confirm flagged fixture items show an icon+label attention indicator on the block/row and a note in the drawer; an empty day shows a clear state; nothing implies real detection.

- [x] T026 [US5] EXTEND `src/js/fixtures/schedule.js` (+ `sessions.js`) — flag a few blocks/rows with `attention: {kind,labelKey}`; render `attention-flag` on the affected blocks/rows and ensure each day renders a clear **empty-day** state when it has no blocks (serialize after T008/T009)
- [x] T027 [US5] Surface the attention note in the appointment drawer (the `More` group) and verify it is icon+label (never color-only) and visibly **fixture/demo** — no real conflict-detection claim

**Checkpoint**: Calm, honest attention signals.

---

## Phase 9: User Story 6 - Sessions page schedule integration (Priority: P2)

**Goal**: Sessions keeps its table as the List tab and adds a today Timetable/agenda tab over the same fixture, using the shared drawer.

**Independent Test**: Open Sessions; confirm List (table) + Timetable (today agenda) tabs over one fixture; open a row/block → the shared drawer.

- [x] T028 [P] [US6] Implement `src/js/components/schedule-agenda.js` — a single-day agenda (day switcher + `.sched-block` blocks, `data-agenda`); reused by the Sessions today tab **and** the mobile schedule fallback, per calendar-view-contract §11
- [x] T029 [US6] CHANGE `src/js/pages/sessions.js` — wrap the existing table as the **List** tab and add a **Timetable/agenda (today)** tab via `tabs` + `schedule-agenda`, both baked, sharing the same filters; List default
- [x] T030 [US6] CHANGE `src/js/pages/sessions.js` — make table rows + agenda blocks open the **shared** `appointment-details` drawer (richer than the old session preview), with the same demo/disabled actions (same file as T029 → serialize)
- [x] T031 [US6] Verify Sessions has List + Timetable tabs over one fixture, the table still reads as a modern product table, the shared drawer opens from both, and filters narrow both

**Checkpoint**: Sessions is cohesively tied to the timetable.

---

## Phase 10: User Story 7 - Admin Dashboard reflects schedule impact (Priority: P2)

**Goal**: Minimal, fixture-backed dashboard impact — deep-links + shared drawer + one up-next strip + a fixture attention count.

**Independent Test**: On the dashboard, "View Schedule"/"view all" deep-link to the Timetable view; a session row opens the shared drawer; the up-next strip + attention count are fixture-backed and link to Schedule.

- [x] T032 [US7] CHANGE `src/js/pages/dashboard.js` — point the hero "View Schedule" + the Today's Sessions module "view all" at `./schedule.html#view=timetable`; make the Today's Sessions row detail open the **shared** `appointment-details` drawer, per dashboard-impact-contract §2–§3
- [x] T033 [US7] CHANGE `src/js/pages/dashboard.js` — add one small **"Up next / This week"** strip (reuse `.sched-block` over `SCHEDULE_WEEK`/`SESSIONS`) + a fixture-only **attention-count** chip on the sessions-card header; both link to Schedule (in-scope), per dashboard-impact-contract §4–§5 (same file as T032 → serialize)
- [x] T034 [US7] Verify the dashboard impact: deep-links land on the Timetable view, the drawer is shared, every added element is fixture-backed + links to an in-scope page, and the dashboard stays calm (no new stat wall)

**Checkpoint**: Deliberate, minimal dashboard impact.

---

## Phase 11: User Story 9 - Visual / reference alignment (Priority: P1)

**Goal**: The timetable is premium, calm, and readable — recognizably the same product as Spec 001/002 and better than the legacy reference.

**Independent Test**: Review the timetable/list/agenda/drawer in light + dark, AR + EN, desktop/tablet/mobile; confirm readable blocks, cropped axis, one quiet accent, no clutter/drift/legacy-copy.

- [x] T035 [US9] Visual pass on the timetable: cropped axis (no dead 24h), generous readable blocks (no tiny rectangles), one quiet today/now accent + the calm status set, dark-mode surfaces, RTL Sat-first mirroring (times stay LTR), and the mobile→agenda / tablet reflow (`src/styles/app.css`, `src/js/components/timetable-grid.js`, `schedule-agenda.js`)
- [x] T036 [US9] Compare the timetable/drawer against the old-system schedule screenshots (**product/UX reference only**) + Spec 001/002; fix any clutter, spreadsheet feel, unreadable blocks, color overload, or visual drift

**Checkpoint**: Premium, calm scheduling visuals with no drift.

---

## Phase 12: User Story 10 - Screenshot acceptance (Priority: P1)

**Goal**: The required matrix is captured, reviewed, and recorded; axe clean; responsive correct.

**Independent Test**: Capture the matrix; review each side-by-side with the approved direction + reference; axe critical=0; mobile/tablet correct.

- [x] T037 [P] [US10] EXTEND `tests/screenshots/capture.cjs` MATRIX + variant support (`list`/`timetable`/`teacher`/`drawer`/`agenda`) with the 10 Spec 003 frames (schedule list + timetable AR light, timetable AR dark + EN light, teacher-lens, drawer, dashboard impact, mobile agenda, tablet timetable, sessions timetable), per screenshot-acceptance A2
- [x] T038 [P] [US10] EXTEND `tests/a11y/run.cjs` coverage for the schedule/sessions Timetable panels + drawer-open states (AR light + a dark + an EN sample); fix any critical violations
- [x] T039 [US10] Run `npm run build && npm run screenshots`; review each capture side-by-side vs the approved Spec 001/002 direction + sidebar reference + existing screenshots + the old schedule screenshots (product reference only); fix any failure condition (plain-table-only / missing tab / missing drawer / invented / legacy-copy / clutter / unreadable blocks / weak filters / dead actions / poor dark / broken RTL-LTR / JS-rendered / calendar-lib); record verdicts in `app/screenshots/REVIEW.md`
- [x] T040 [US10] Responsive review: verify + fix the **mobile agenda** fallback and **tablet timetable** (no horizontal overflow; grid→agenda on mobile)

**Checkpoint**: Screenshot matrix accepted; no drift; calendar tab + drawer present.

---

## Phase 13: Polish & Cross-Cutting Concerns

- [x] T041 [P] Verify the scope guard end-to-end per `contracts/scope-guard.md` — `grep` confirms **no calendar/chart/drag-drop library**; no backend/API/auth/permission-enforcement/CRUD/persistence/recurrence/**real conflict detection**; no portals/role dashboards (teacher timetable admin-only); no legacy assets/classes/logo/palette/wording; no `#app` / no runtime-drawn grid
- [x] T042 [P] Run the `quickstart.md` flow (install → build → preview → review List vs Timetable → test drawer → verify static-first → verify no-calendar-lib → test → screenshots) and fix any gaps
- [x] T043 Final consistency + cleanup: fixture coherence (teacher-lens options derived correctly, attention counts match the dashboard chip, axis cropping sane), no console missing-key warnings, remove dead code, and update `app/screenshots/REVIEW.md` + `app/README.md` (and the project memory note)

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (T001–T003)**: start immediately. T002/T003 are `[P]` (different files).
- **Foundational (T004–T012)**: after Setup; **blocks all stories**. T004–T010 are parallel (different files); **T011 then T012** edit `enhance.js` (serialize).
- **US1 (T013–T015)**: after Foundational → the MVP (Schedule List + Timetable tabs).
- **US2 (T016–T018)**: after US1; **T017 edits `enhance.js` (serialize after T012)**.
- **US3 (T019–T021)**: after US1 (drawer templates on schedule blocks).
- **US8 (T022–T023)**: after US1/US3 (verifies the baked grid/tabs/templates).
- **US4 (T024–T025)** / **US5 (T026–T027)**: after US1 (lens + attention over the baked grid); US5's fixture edit serializes after T008/T009.
- **US6 (T028–T031)**: after Foundational (Sessions tabs + agenda + shared drawer); T029/T030 same file (serialize).
- **US7 (T032–T034)**: after US3/US6 (shared drawer + deep-link target exist); T032/T033 same file (serialize).
- **US9 (T035–T036)** / **US10 (T037–T040)**: after the feature stories exist — the final acceptance gate.
- **Polish (T041–T043)**: last.

### Within a story

- Component/fixture before the page that renders it (e.g., T013 before T014; T028 before T029).
- Page body before its drawer/states wiring (T014 before T019; T029 before T030).
- Build/verify after assembly (T015, T018, T021, T031, T034).

### Parallel opportunities

- Foundational components T004–T010 in parallel (different files); then T011→T012 on `enhance.js`.
- `timetable-grid.js` (T013) and `schedule-agenda.js` (T028) are `[P]` (different files) once Foundational is done.
- US10 harness extensions T037/T038 in parallel.
- The page-edit tasks on the **same file** (schedule.js: T014/T016/T019/T024; sessions.js: T029/T030; dashboard.js: T032/T033; enhance.js: T011/T012/T017; app.css: T010/T035) are **serialized** — never run two of them in parallel.

---

## Parallel Example: Foundational shared building blocks

```bash
# After Setup, build the shared pieces together (different files):
Task: "T004 components/tabs.js"        Task: "T005 components/time-block.js"
Task: "T006 components/attention-flag.js"  Task: "T007 components/appointment-details.js"
Task: "T008 fixtures/schedule.js EXTEND"   Task: "T009 fixtures/sessions.js EXTEND"
Task: "T010 styles/app.css EXTEND"
# then T011 (enhance.js tab engine) → T012 (enhance.js drawer/attention)
```

## Parallel Example: US10 harness extensions

```bash
Task: "T037 capture.cjs MATRIX (Spec 003 frames)"
Task: "T038 a11y/run.cjs coverage (timetable + drawer)"
# then T039 review + T040 responsive
```

---

## Implementation Strategy

### MVP path

1. Setup → 2. Foundational → 3. **US1** (Schedule List + Timetable tabs) → 4. **US2** (filters) → 5. **US3** (detail drawer).
   **Stop & validate** at the US3 checkpoint: a tabbed Schedule page with a readable hand-rolled weekly timetable, strong filters, and a shared detail drawer proves the entire scheduling pattern. This is the demoable MVP.

### Incremental delivery

- After **US1**: Schedule has List + Timetable tabs (the grid is real).
- After **US2 + US3**: filters narrow both views and blocks open the detail drawer — the core experience.
- After **US8**: static/Django integrity of the new markup verified.
- After **US4 / US5 / US6 / US7**: teacher lens, attention signals, Sessions integration, dashboard impact — each independently testable.
- After **US9 / US10**: visual alignment verified and the screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (smoke tabs/grid/drawer, axe, no-`#app`) are necessary but the **manual screenshot review against Spec 001/002 + the reference is the final gate** (`contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. **Serialize all edits to the same file** (`enhance.js`, `schedule.js`, `sessions.js`, `dashboard.js`, `app.css`).
- Honor `contracts/scope-guard.md` throughout: fixtures only; static HTML-first (no `#app`, **no runtime-drawn grid** — block spans baked at build); **no calendar/chart library**; teacher timetable admin-only; no portals/role dashboards; no legacy copy.
- The timetable grid placement (`gridRow`/`gridCol`) is computed **at build time** in the fixture/SSG, never at runtime (calendar-view-contract §5, static-html-django-ready-contract).

---

## Implementation notes / deviations (2026-06-29)

All 43 tasks complete and verified: **build clean** (18 pages, 52 icons / 0 missing) · **smoke PASS** (18 loads + Spec 003 asserts: ≥2 content tabs · exactly ONE visible tabpanel · baked timetable grid · tab-switch shows only the grid · timetable block opens the drawer · teacher lens narrows the grid) · **axe critical=0 / serious=0** (incl. `#view=timetable` scans) · **35 screenshots, 0 console errors**, reviewed in `app/screenshots/REVIEW.md`. **No new dependencies.** Honest delivery choices:

- **Build-time grid placement**: `timetable-grid.js` computes each block's `--col`/`--r1`/`--r2` (row span) + overlap lanes (`--cols`/`--colidx`) at build and bakes them as inline CSS custom properties; `app.css` positions via CSS grid. Runtime JS draws nothing.
- **One markup, two layouts**: the timetable mobile fallback is the SAME baked grid reflowed to a stacked agenda by source order + a `@media (max-width:640px)` rule (head → its blocks) — no duplicate markup, no runtime swap. `schedule-agenda.js` powers the Sessions "today" tab.
- **Filter both views**: the schedule filter targets `#schedule-views` (wrapping both panels); each block carries `data-block` so `enhance.js applyFilter` dedupes the "showing X of N" count across the List + Timetable panels. Teacher facet (`data-teacher`) added to both list + timetable blocks = the admin teacher lens.
- **Shared appointment drawer**: one `appointment-details.js` builder bakes a `<template data-preview>` per item; reused by Schedule blocks, Sessions rows/agenda, and the dashboard rows (one Django partial). Actions are demo-toast / confirm-modal / disabled-with-reason (join link). Status stayed the calm 4-set (+ display-only attention flags `conflict/delayed/cancelled`).
- **Label**: English `Timetable` (en.js nav + en.extra title/crumb/sch.title); Arabic `الجدول الدراسي` was already correct (unchanged). Route/id stay `schedule`/`schedule.html`; no new nav page.
- **Dashboard impact** kept minimal: hero "View schedule" + "Up next this week" strip deep-link to `schedule.html#view=timetable`; rows open the shared drawer; a fixture attention-count chip ("2 need attention") — all fixture-backed, no new stat wall.
- **a11y fix during review**: the cancelled timetable block's `opacity:.7` dropped its attention-flag text below AA (2.78); replaced with a line-through title (state still clear). Block `tt-time`/`tt-meta` bumped to `--c-ink-2` for AA on tinted live blocks in dark. Timetable container uses `aria-label` (not `role="grid"`) to avoid axe required-children. Times wrapped in a nested `dir="ltr"` span so ranges never mirror in RTL.
- **New components** (alongside Spec 001/002's): `tabs`, `time-block`, `timetable-grid`, `attention-flag`, `appointment-details`, `schedule-agenda`; `enhance.js` extended (tab engine: toggle + localStorage `academy.schedView.<page>` + `#view` hash + roving tabindex; dedupe filter count). No Spec 001/002 component broken (all prior pages still pass build/smoke/a11y).

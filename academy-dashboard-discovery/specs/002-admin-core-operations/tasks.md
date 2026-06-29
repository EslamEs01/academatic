---
description: "Task list for Spec 002 — Admin Core Operations Pages"
---

# Tasks: Admin Core Operations Pages

**Input**: Design documents from `academy-dashboard-discovery/specs/002-admin-core-operations/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (all present)

**Tests**: **INCLUDED** — the spec mandates automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, HTML-structure/no-`#app`, keyboard) **and** screenshot-based visual acceptance.

**App root**: `academy-dashboard-discovery/app/` (paths relative to it). Spec 002 **extends the implemented Spec 001 app in place** — same static HTML-first SSG, same pipeline, no new dependencies. Existing Spec 001 files are unchanged unless a task says EXTEND/CHANGE.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US10 (story phases only)

## Story sequencing rationale (read first)

Six of the ten stories are P1. They are sequenced by **build dependency**, not raw priority number:

- **Foundational** builds the page-agnostic shared components + `enhance.js` behaviors that every page needs (the substance of **US8**).
- **US1 (navigation)** wires real routes + registers all six pages as minimal-but-real (header + placeholder) so the nav works end-to-end (the early navigable MVP; also satisfies **US9**'s page registration).
- **US2 (Sessions, P1)** fleshes out the first full page and proves the shared patterns; **US3–US7** flesh out the remaining pages.
- **US8 / US9 / US10 (all P1)** are cross-cutting **verification/acceptance** stories sequenced last because they require all pages to exist (consistency pass, static/Django structure checks, screenshot matrix) — same rationale as Spec 001's US1.

Earliest demo = US1 (all pages navigable). Full operations MVP = through **US2** (navigable shell + complete Sessions page + shared patterns).

---

## Phase 1: Setup

**Purpose**: Guard the Spec 001 baseline and prepare i18n namespaces.

- [x] T001 Verify the Spec 001 baseline is green before extending: run `npm run build && npm test && npm run screenshots` and confirm clean (no regressions to protect)
- [x] T002 [P] Add Spec 002 i18n namespace skeletons (page titles/breadcrumbs + shared admin keys: `nav.*` routes labels already exist; add `page.*`, `filter.*`, `sessions2.*`, `schedule.*`, `students.*`, `trainers.*`, `curricula.*`, `settings.*`) to `src/locales/ar.js` and `src/locales/en.js` (EXTEND; keep all Spec 001 keys)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared, page-agnostic building blocks + enhancement behaviors every page reuses (the substance of US8).

**⚠️ CRITICAL**: No page story begins until this phase is complete.

- [x] T003 [P] Implement `src/js/components/page-header.js` (title + breadcrumb + subtitle + actions slot + optional summary-tiles slot), per admin-pages-contract AP1
- [x] T004 [P] Implement `src/js/components/filter-bar.js` (search + selects + apply/reset + active-filter chips), generalized from the Spec 001 sessions toolbar, per interaction-patterns-contract IP2
- [x] T005 [P] Implement `src/js/components/card-grid.js` (responsive card-grid wrapper using Spec 001 tokens)
- [x] T006 [P] Implement `src/js/components/directory-card.js` (avatar, name, tags, status, optional performance slot)
- [x] T007 [P] Implement `src/js/components/schedule-list.js` (day-group header + session blocks; no calendar lib), per schedule-page-contract
- [x] T008 [P] Implement `src/js/components/settings-section.js` (panel + rows + control-kind rendering: real/demo/disabled), per settings-page-contract
- [x] T009 [P] Implement `src/js/components/preview-drawer.js` (entity preview content; reuses Spec 001 `drawer.js` shell), per interaction-patterns-contract IP5
- [x] T010 [P] Implement `src/js/components/confirm-modal.js` (confirmation modal: focus trap, Esc, scrim, confirm/cancel → demo), per IP6
- [x] T011 [P] Implement `src/js/components/data-table.js` (generalized table reused by Sessions + Students; rows carry `data-*` facets), per IP3
- [x] T012 EXTEND `src/js/enhance.js` with shared behaviors over existing markup: `data-filter-form` (client-side show/hide of pre-rendered rows + chips + result count + no-results), `data-row-menu`→popover, `data-drawer`→preview drawer, `data-modal-trigger`, `data-confirm`→confirm modal, `data-demo-action`→toast, `data-disabled-reason` (no page DOM created), per interaction-patterns-contract

**Checkpoint**: Shared components + enhancement behaviors ready; build still green.

---

## Phase 3: User Story 1 - Admin can navigate core pages (Priority: P1) 🏗️ navigable MVP

**Goal**: The six sidebar items open real static pages (each with header + placeholder), correct active pill, and working language navigation.

**Independent Test**: From the dashboard, click Sessions/Schedule/Students/Trainers/Curricula/Settings; each loads a distinct static page with the shell + active pill; the language toggle navigates to the `.en` equivalent (theme preserved).

- [x] T013 [US1] CHANGE `src/js/nav.config.js`: real routes for the six items (`sessions.html`, `schedule.html`, `students.html`, `trainers.html`, `curricula.html`, `settings.html`) with active-id mapping, per research R2
- [x] T014 [P] [US1] Create `src/js/pages/sessions.js` skeleton: `renderSessions()` = page-header + empty-state placeholder
- [x] T015 [P] [US1] Create `src/js/pages/schedule.js` skeleton (`renderSchedule()`)
- [x] T016 [P] [US1] Create `src/js/pages/students.js` skeleton (`renderStudents()`)
- [x] T017 [P] [US1] Create `src/js/pages/trainers.js` skeleton (`renderTrainers()`)
- [x] T018 [P] [US1] Create `src/js/pages/curricula.js` skeleton (`renderCurricula()`)
- [x] T019 [P] [US1] Create `src/js/pages/settings.js` skeleton (`renderSettings()`)
- [x] T020 [US1] EXTEND `scripts/build-html.mjs` `PAGES` to register the six pages (ar + en) with `activeId`/`titleKey`/`crumbKey`; add their titles/breadcrumbs to `src/locales/{ar,en}.js` (depends T013–T019)
- [x] T021 [US1] Build and verify: each sidebar item navigates to its page with the violet active pill + `aria-current="page"`; the language toggle reaches the `.en` page with theme preserved (`src/pages` via `public/*.html`)

**Checkpoint** 🎯: All six pages exist and are navigable — the early MVP.

---

## Phase 4: User Story 2 - Admin can manage daily sessions visually (Priority: P1) 🎯 operations MVP

**Goal**: A premium, filterable, readable Sessions page with table, row actions, preview drawer, and states.

**Independent Test**: Open Sessions; read fixture rows; apply/clear a filter (visible feedback); open a row's "view details" → preview drawer; observe empty/loading/error demos.

- [x] T022 [P] [US2] EXTEND `src/js/fixtures/sessions.js`: ≥10 rows with facets (`data-status`/`data-subject`/`data-trainer`/`data-search`) + `details` (date/notes/attendees/materials) + `total`/`pageSize`/`lastUpdatedKey`, per data-model
- [x] T023 [US2] Build the Sessions page body in `src/js/pages/sessions.js`: page-header (+ "new session" demo) + status summary tiles + `filter-bar` + `data-table` sessions table (status chips, kebab row-menu) + pagination/"showing X of N", per sessions-page-contract
- [x] T024 [US2] Wire session row "view details" → `preview-drawer` (session `details`); create/edit/cancel → demo toast or disabled-with-reason (no lifecycle) in `src/js/pages/sessions.js` (depends T012, T023)
- [x] T025 [US2] Add Sessions empty/no-results/loading/error states + ensure filter facets resolve (apply/reset chips) in `src/js/pages/sessions.js`

**Checkpoint**: Sessions is a complete, premium operations page; shared patterns proven.

---

## Phase 5: User Story 3 - Admin can inspect the schedule (Priority: P2)

**Goal**: A calm day-grouped weekly overview with filters and block previews (no calendar lib).

**Independent Test**: Open Schedule; scan day-grouped blocks; apply a filter; open a block preview.

- [x] T026 [P] [US3] Create `src/js/fixtures/schedule.js`: a `ScheduleWeek` (ordered days + `blocks[]` with facets), per data-model
- [x] T027 [US3] Build the Schedule page in `src/js/pages/schedule.js`: page-header + week/day strip + `filter-bar` (subject/trainer/status/date) + `schedule-list` (day groups), per schedule-page-contract (decision R3: grouped-by-day list)
- [x] T028 [US3] Wire schedule block → `preview-drawer`; filter feedback; empty/no-results/loading/error states in `src/js/pages/schedule.js`

**Checkpoint**: Schedule is a comfortable, RTL-readable overview.

---

## Phase 6: User Story 4 - Admin can browse students (Priority: P2)

**Goal**: A scannable students directory table with search/filter/sort and a profile preview.

**Independent Test**: Open Students; search/filter/sort; open a student profile preview drawer.

- [x] T029 [P] [US4] Create `src/js/fixtures/students.js`: ≥10 students with facets + `details`, per data-model
- [x] T030 [US4] Build the Students page in `src/js/pages/students.js`: page-header + summary tiles + `filter-bar` (search/status/subject/sort) + `data-table` directory (avatar/status/level/progress/enrolled), per directory-pages-contract
- [x] T031 [US4] Wire student row → `preview-drawer` (profile); sort/filter behavior; empty/no-results/loading/error states in `src/js/pages/students.js`

**Checkpoint**: Students directory is easy to scan with previews.

---

## Phase 7: User Story 5 - Admin can browse trainers (Priority: P2)

**Goal**: A trainers card-grid directory with availability + hand-rolled performance and a profile preview.

**Independent Test**: Open Trainers; scan availability/performance cards; filter; open a trainer profile preview.

- [x] T032 [P] [US5] Create `src/js/fixtures/trainers.js`: ≥8 trainers with availability/performance/subjects + `details`, per data-model
- [x] T033 [US5] Build the Trainers page in `src/js/pages/trainers.js`: page-header + summary tiles + `filter-bar` (search/availability/subject) + `card-grid` of `directory-card`s with hand-rolled ring/sparkline performance (no chart lib), per directory-pages-contract (R4/R9)
- [x] T034 [US5] Wire trainer card "view profile" → `preview-drawer`; filter behavior; empty/no-results/loading/error states in `src/js/pages/trainers.js`

**Checkpoint**: Trainers directory shows availability/performance as cards.

---

## Phase 8: User Story 6 - Admin can browse curricula/courses (Priority: P3)

**Goal**: A structured, uncluttered courses overview with level previews.

**Independent Test**: Open Curricula; scan course cards; filter; open a level preview.

- [x] T035 [P] [US6] Create `src/js/fixtures/curricula.js`: ≥6 courses with subject/level/status/counts + `levels[]`, per data-model
- [x] T036 [US6] Build the Curricula page in `src/js/pages/curricula.js`: page-header + summary tiles + `filter-bar` (search/subject/level/status) + `card-grid` of course cards, per curricula-page-contract
- [x] T037 [US6] Wire course card → level `preview-drawer`/modal; filter behavior; empty/no-results/loading/error states in `src/js/pages/curricula.js`

**Checkpoint**: Curricula reads as structured education content.

---

## Phase 9: User Story 7 - Admin can open the settings shell (Priority: P3)

**Goal**: A grouped settings shell where appearance is real and everything else is demo or disabled-with-reason.

**Independent Test**: Open Settings; navigate sections; switch theme/language (real); "save" (demo toast); a disabled control shows its reason; a destructive demo opens a confirmation modal.

- [x] T038 [P] [US7] Create `src/js/fixtures/settings.js`: sections (academy profile / appearance / account / notifications / roles preview) with rows tagged `kind` (real/demo/disabled) + roles preview groups, per data-model (R7)
- [x] T039 [US7] Build the Settings page in `src/js/pages/settings.js`: page-header + `settings-section` panels (incl. read-only roles/permissions preview), per settings-page-contract
- [x] T040 [US7] Wire settings controls: real theme/language (reuse Spec 001), `data-demo-action`→toast, `data-disabled-reason`, destructive demo → `confirm-modal` in `src/js/pages/settings.js`

**Checkpoint**: Settings shell proves the layout + control taxonomy without a backend.

---

## Phase 10: User Story 8 - Shared admin patterns remain consistent (Priority: P1)

**Goal**: Header/filter/table/card/drawer/modal/toast/states/buttons are consistent across all six pages and identical in style to Spec 001.

**Independent Test**: Compare the shared patterns across all pages; confirm one consistent language and Spec-001 fidelity.

- [x] T041 [US8] Cross-page consistency pass: audit header/filter/table/card/drawer/modal/toast/state usage across `src/js/pages/*.js`; refactor any drift to the shared components/tokens
- [x] T042 [US8] Verify the confirmation-modal pattern on a destructive demo action (focus trap, Esc, scrim, visible outcome) and that toasts/disabled-with-reason read identically everywhere

**Checkpoint**: One consistent product language across all pages.

---

## Phase 11: User Story 9 - Static / Django-ready delivery remains intact (Priority: P1)

**Goal**: Every new page is complete static HTML in `public/`, GitHub-Pages deployable, Django-template-ready.

**Independent Test**: Build; open `public/sessions.html` (Live Server) + View Source — full markup, relative paths, no `#app`; confirm zero external requests.

- [x] T043 [US9] Add an HTML-structure smoke check (full shell + page content present, **no `id="app"` whole-page mount**, relative `./assets/` paths) over the six new pages in `tests/smoke/run.cjs`
- [x] T044 [US9] EXTEND `tests/smoke/run.cjs` page list to include the six new pages (ar + en) for no-dead-button / no-raw-i18n-key / no-external-request checks
- [x] T045 [US9] Update `app/README.md` (+ note in quickstart) with the new pages and their Django-template mapping (templates/admin/*, shell→partials, fixtures→context, `data-*` hooks), per static-html-django-ready-contract

**Checkpoint**: Static/Django architecture preserved and verified for the new pages.

---

## Phase 12: User Story 10 - Visual acceptance (Priority: P1)

**Goal**: The new pages visibly match the Spec 001 approved design in both directions and all themes; the screenshot matrix passes.

**Independent Test**: Capture the matrix; review each side-by-side with Spec 001; axe clean; responsive correct.

- [x] T046 [P] [US10] EXTEND `tests/screenshots/capture.cjs` MATRIX with the Spec 002 scenarios (Sessions ar light/dark + en light; Schedule/Students/Trainers/Curricula/Settings ar light; one mobile table page; one tablet), per screenshot-acceptance A2
- [x] T047 [P] [US10] EXTEND `tests/a11y/run.cjs` page list with the six new pages (ar light + a dark + an en sample); fix any critical violations
- [x] T048 [US10] Run `npm run build && npm run screenshots`; review each capture side-by-side vs the approved Spec 001 dashboard + sidebar reference + existing Spec 001 screenshots (old academy = product/UX reference only); fix any §A4 failure (drift/clutter/spreadsheet/placeholder/dead/poor-dark/broken-RTL-LTR); record verdicts in `app/screenshots/REVIEW.md`
- [x] T049 [US10] Responsive pass: verify + fix mobile (complex table page) and tablet (schedule/students) — sidebar→drawer, tables scroll/stack, schedule reflows — no overflow

**Checkpoint**: Screenshot matrix accepted; no drift from Spec 001.

---

## Phase 13: Polish & Cross-Cutting Concerns

- [x] T050 [P] Verify the scope guard end-to-end (no backend/API/auth/permission-enforcement/CRUD; no dashboards/portals; no chart/calendar libs; no CDN/TS/SPA; no legacy assets/classes/logo/palette/wording) per `contracts/scope-guard.md`
- [x] T051 [P] Run the `quickstart.md` flow (install → build → preview → test → screenshots) and fix any gaps
- [x] T052 Final consistency + cleanup: fixture coherence (counts/cross-references), remove dead code, confirm no console missing-key warnings, sidebar `sessions` badge mirrors the Sessions fixture total

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (T001–T002)**: start immediately.
- **Foundational (T003–T012)**: after Setup; **blocks all stories**. T003–T011 are parallel (different files); T012 extends `enhance.js`.
- **US1 (T013–T021)**: after Foundational. Creates all six pages (skeletons) + routes + registration → the navigable MVP.
- **US2 (T022–T025)**: after US1 (fills `sessions.js`). The operations MVP.
- **US3–US7 (T026–T040)**: after US1; each fills its own page file — largely independent of each other (only the shared `build-html.mjs`/locales already wired in US1).
- **US8 (T041–T042)**: after the page stories exist (consistency audit).
- **US9 (T043–T045)**: after pages exist (structure/smoke checks).
- **US10 (T046–T049)**: after pages exist (screenshots/a11y/responsive) — the final acceptance gate.
- **Polish (T050–T052)**: last.

### Within a story

- Fixture before the page that renders it (e.g., T022 before T023; T026 before T027).
- Page body before its preview/states wiring (T023 before T024/T025).
- Build/screenshot/review after assembly.

### Parallel opportunities

- Foundational shared components T003–T011 in parallel (different files).
- US1 page skeletons T014–T019 in parallel (different files).
- Per-story fixtures are `[P]` vs their page (different files): T022/T026/T029/T032/T035/T038.
- After US1, the page stories US3–US7 can be staffed in parallel by different developers (different `pages/*.js` and `fixtures/*.js`); only the shared `build-html.mjs`/`locales` (already wired in US1) and the late verification stories (US8/US9/US10) are serialized.
- US10 test-harness extensions T046/T047 in parallel.

---

## Parallel Example: Foundational shared components

```bash
# After Setup, build the shared components together (different files):
Task: "T003 page-header.js"   Task: "T004 filter-bar.js"   Task: "T005 card-grid.js"
Task: "T006 directory-card.js"   Task: "T007 schedule-list.js"   Task: "T008 settings-section.js"
Task: "T009 preview-drawer.js"   Task: "T010 confirm-modal.js"   Task: "T011 data-table.js"
# then T012 extends enhance.js
```

## Parallel Example: page skeletons (US1)

```bash
Task: "T014 pages/sessions.js skeleton"   Task: "T015 pages/schedule.js skeleton"
Task: "T016 pages/students.js skeleton"   Task: "T017 pages/trainers.js skeleton"
Task: "T018 pages/curricula.js skeleton"  Task: "T019 pages/settings.js skeleton"
# then T020 registers them in build-html.mjs
```

---

## Implementation Strategy

### MVP path

1. Setup → 2. Foundational → 3. US1 (all pages navigable) → 4. US2 (complete Sessions page).
   **Stop & validate** at the US2 checkpoint: a navigable admin shell with a premium, filterable Sessions page proves the core operations experience. This is the demoable MVP.

### Incremental delivery

- After **US1**: demo navigation across all six (header-only) pages.
- After **US2**: the Sessions operations page (MVP).
- After **US3/US4/US5/US6/US7**: schedule, students, trainers, curricula, settings — each independently testable.
- After **US8/US9/US10**: consistency verified, static/Django structure verified, screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (axe/smoke/structure) are necessary but the **manual screenshot review against Spec 001 is the final gate** (`contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. Serialize tasks editing the same file (each `pages/*.js` is filled within one story; `build-html.mjs`/locales are touched in T020 then read-only after).
- Honor `contracts/scope-guard.md` throughout: fixtures only; static HTML-first (no `#app` mount); no backend/dashboards/portals/charts/calendar libs/legacy copy.

---

## Implementation notes / deviations (2026-06-29)

All 52 tasks complete and verified: build clean · smoke PASS (18 page loads, incl. static-structure / no-`#app` / relative-path / behavioral filter+drawer checks) · axe critical=0/serious=0 (14 scenarios incl. all new pages) · 18/18 screenshots captured (0 console errors) and the new pages reviewed side-by-side vs Spec 001 (AR light/dark, EN LTR, mobile, tablet). A few delivery choices, noted for honesty:

- **i18n keys** (T002/T020): added in **separate `src/locales/ar.extra.js` + `en.extra.js`** merged into the Spec 001 dictionaries via a `deepMerge` in `i18n.js` — keeps the large Spec 001 locale files untouched and the Spec 002 keys isolated. Same effect as extending ar.js/en.js.
- **US1 pages**: written as **full page modules directly** (not skeleton-then-fill) — the skeleton tasks (T014–T019) are satisfied by the final modules; US2–US7 are their full implementations.
- **Filter facets**: each page filters by its most useful facets — sessions/schedule: status + subject (+ search); students: status + subject (+ sort via search); trainers: availability + subject; curricula: subject + level + status. Trainer/date filtering is via the search box / week view (per research R3/R6); filters are real (client-side show/hide of pre-rendered rows), not weak.
- **Generic chip**: added `chip()` to `ui.js` + two chip tones (`amber`, `neutral`) for non-session statuses (student/trainer/course); the single session **status map** is unchanged.
- **Routing**: sidebar routes made **relative + language-aware** (`sidebar.js` `langRoute`), and the Spec 001 dashboard's one absolute `/reports` link made relative — GitHub-Pages-safety improvements, no visual regression (Spec 001 screenshots/tests still pass).
- **Session preview**: derived from row fields + a shared note (the data-model `details` object was simplified to avoid per-row detail keys); previews are complete and consistent.
- **New components live alongside Spec 001's**: `page-header`, `filter-bar`, `card-grid`, `directory-card`, `schedule-list`, `settings-section`, `preview-drawer`, `confirm-modal`, `data-table`; `enhance.js` extended (filter/drawer/confirm/demo/toggle/disabled). No Spec 001 component was broken (Spec 001 pages still pass build/smoke/a11y).

---

## Pre-003 Alignment (2026-06-29)

Shell + naming changes that landed in the app after the run above and ahead of Spec 003. The tasks above stay checked (that work shipped) — this section records what changed so the docs match the code:

- **Shell refactor → rail + light panel** (per `design-references/approved-dashboard/sidebar-reference.png`): the single dark indigo sidebar (`#1F1B38`) was replaced by a two-part inline-start nav — a slim icon rail (`.nav-rail`: hamburger collapse `data-action="toggle-rail"`, icon-only `.rail-item`s with the active icon inside a filled violet square, a bottom circular profile avatar `.rail-foot` `data-action="profile-menu"`) beside an expanded light nav panel (`.nav-panel#nav-panel`: brand medallion + wordmark, a `.nav-section-label`, grouped list where the active item is a large rounded violet pill `.nav-item.is-active`). The outer `<aside class="sidebar">` is now a transparent flex-row wrapper; `data-rail="true"` collapses to the rail only; mobile shows the panel as a full-width off-canvas drawer (rail hidden). The old bottom "help card" is gone (the rail avatar replaces it). `sidebar-reference.png` is now the SHELL source of truth; `academy-dashboard.png` remains the BODY/content target. Django shell partials: `_nav_rail.html` / `_nav_panel.html` / `_topbar.html`.
- **Nav tokens**: added `--c-nav-panel` (light = white surface, dark = `#221F31`), `--c-nav-rail` (light = warm `#F1EADC`, dark = `#0E0C18`), `--c-nav-line`, `--c-nav-ink`, `--c-nav-ink-muted`, `--c-nav-hover`; the active pill/square reuse the existing `--g-violet`. Legacy `--c-sidebar-2` / `--c-sb-*` are now mostly unused (`--c-sidebar` is reused as the dark rail value).
- **Trainers → Teachers**: route `trainers.html` → `teachers.html`, nav id `teachers`, Arabic المعلمون; the Sessions table "trainer" column label → "teacher" (المعلم).
- **Curricula → Courses**: route `curricula.html` → `courses.html`, nav id `courses`, Arabic الدورات.
- **Schedule**: keeps the English label + `schedule.html` route; Arabic label changed الجدول الزمني → الجدول الدراسي.
- **Reports header**: now uses the shared `page-header` (`pageHeader`) for consistency with the Spec 002 pages.
- **Dark-mode primary-button contrast fixed**: added `--c-primary-btn` / `--c-primary-btn-hover` so the filled primary button keeps AA-contrast white text in both themes (the bright dark `--c-primary` `#9486F4` failed 4.5:1 as a button fill).

Nav still groups in three (عام / الأكاديمية / الإدارة); Home / Sessions / Students / Reports / Settings are unchanged; the dev `gallery` page stays out of the product nav.

---

## Navigation IA Alignment (2026-06-29)

The nav was expanded from the three reference groups to the **full admin IA** and the topbar was improved. This shipped in the app (`nav.config.js`, `sidebar.js`, `topbar.js`, `enhance.js`, `app.css`, locales); the tasks above stay checked. New `navigation-ia-contract.md` is the authoritative source; the docs above cross-reference it.

- [x] N01 Model the full IA in `src/js/nav.config.js`: **7 job-based groups, 17 items** with a `status` (`implemented`/`planned`/`disabled`/`future-role`/`hidden`); item shape `{ id, labelKey, icon, status, route?, badge?, reasonKey?, rail? }`; `route` required iff implemented, `reasonKey` required iff disabled, `rail` defaults to `status==='implemented'`. Add `FUTURE_ROLE`/`HIDDEN_NAV`/`FUTURE_ROUTES` registers for documented-but-not-rendered areas.
- [x] N02 Build-time guard in `nav.config.js`: throw if an implemented item lacks a route, a non-implemented item has a route, or a disabled item lacks a reasonKey — a dead link cannot ship.
- [x] N03 `sidebar.js` rendering by status: implemented → `<a href>` + violet active pill + `aria-current` (only implemented may be active); planned → `<button class="nav-item is-planned" data-coming-soon data-soon-key="nav.comingSoon">` + muted amber «قريبًا/Soon» `.nav-soon` pill (no href); disabled → `<button class="nav-item is-disabled" aria-disabled data-disabled-reason data-reason-key title aria-label>` + lock glyph; future-role/hidden → not rendered. The **rail mirrors implemented-only** + the bottom avatar.
- [x] N04 `enhance.js` behaviors (placed BEFORE the generic catch-all): `data-coming-soon` → `toast(t(soon-key||'nav.comingSoon'))`; `data-disabled-reason` → `toast(t(reason-key))`; implemented → normal anchor nav. Every nav item acts or explains itself — zero dead links.
- [x] N05 Improved `topbar.js`: lead menu-toggle + breadcrumb/title; center **global search** `data-action="command-palette"` with a ⌘K hint opening a command popover (Recent searches + Add shortcut → noop toast) + a global Ctrl/⌘+K listener; trailing cluster = **Quick-Actions «+»** menu (new session / add student / add teacher = demo-toast; create announcement = disabled-with-reason «قريبًا»), notifications bell (rows + disabled "View all"), theme + language switches, and a **profile chip** menu folding Profile (demo) / Settings (real `<a href>`) / Help & support (demo) / Log out (confirm modal via `data-confirm`). No standalone support/announcement icons.
- [x] N06 Add new sprite icons: `tasks`, `messages`, `families`, `materials`, `certificates`, `staff`, `megaphone` (Quick-Actions create-announcement), reusing existing `inbox`(leads), `wallet`(finance), `trending-up`(insights), `trainers`/`curricula`/`home`/`reports`/`settings`/`schedule`/`sessions`/`students`.
- [x] N07 Add `nav.*` locale keys (group labels, planned item labels, `nav.comingSoon`, `nav.reason.finance`) to `src/locales/{ar,en}.js`; Arabic RTL default + English.
- [x] N08 Author `contracts/navigation-ia-contract.md` as the authoritative nav IA source (groups/items/statuses, data model, rail-mirrors-implemented-only, no-dead-link, NI9/NI12 promotion checklist); cross-reference it from `admin-pages-contract.md`, `scope-guard.md`, `screenshot-acceptance.md`, the app `README.md`, and `quickstart.md`.

---

## Category Navigation Rail (2026-06-29)

The flat seven-group sidebar was reworked into a **two-level CATEGORY rail** to match `design-references/approved-dashboard/sidebar-reference.png`: the slim rail is now a `role="tablist"` of one icon per **category**, and selecting a category swaps the expanded panel to show **ONLY that category's links** (never all groups at once). This shipped in the app (`nav.config.js`, `sidebar.js`, `enhance.js`, `app.css`, `topbar.js`, locales); the tasks/N-items above stay checked. `navigation-ia-contract.md` was rewritten as the authoritative source for the new model.

- [x] C01 Rework `src/js/nav.config.js` to `NAV_CATEGORIES`: **6 categories** (control / families / teachers / reports / admin / settings), **~48 items** total with their `status` (8 implemented, the rest planned, the Finance-gated rows disabled with `reasonKey: 'nav.reason.finance'`), plus a **sub-section** model (`category.sections[] = { titleKey, items[] }`, e.g. teachers → `cat.teachersPerf`). Add helpers `catItems(cat)` (flatten items + sections) and `categoryOf(activeId)` (which category owns the current route → the panel opens to it on load); keep `FUTURE_ROLE` + `FUTURE_ROUTES` registers; keep the build-time guard (implemented⇒route, non-implemented⇒no route, disabled⇒reasonKey).
- [x] C02 `src/js/components/sidebar.js`: render `.rail-cat` category tabs (`role="tab"`, `data-nav-category`, `aria-controls=catpanel-<id>`, `aria-selected`, roving `tabindex`) inside `.rail-cats[role="tablist"][data-nav-rail]` between the top `.rail-toggle` hamburger and the bottom `.rail-foot` avatar; render one `.cat-panel` per category (`role="tabpanel"`, `data-nav-panel`, `aria-labelledby`, a `.cat-title` + `.panel-nav` + `.nav-subsection` blocks). Only the route's category panel is visible on load (`categoryOf`); the rest carry `hidden`.
- [x] C03 `src/js/enhance.js`: `selectCategory(catId, root)` hides every `[data-nav-panel]` except `catId` and syncs the rail tabs (`aria-selected`/`.is-active`/roving `tabindex`); a `[data-nav-category]` click swaps the panel (no navigation), persists `localStorage['academy.navCategory']`, and re-expands the rail if collapsed; tablist **Arrow Up/Down/Left/Right + Home/End** roving-tabindex keyboard nav. The mobile drawer clones BOTH the rail + panel (stripping `id`s + `aria-controls`/`aria-labelledby`) so category switching works on mobile.
- [x] C04 `src/styles/app.css`: `.rail-cats` / `.rail-cat` (+ `.is-active` violet square) / `.cat-panel` (`[hidden]` → `display:none`) / `.cat-title` / `.nav-subsection` + `.nav-subsection-label`, and the topbar `.apps-cells` / `.apps-cell` launcher grid.
- [x] C05 New sprite icons for the categories/items: `layers` (control), `grid` (admin + apps-grid launcher), `user-plus` (add family / add teacher), reusing existing `families`/`trainers`/`reports`/`settings` for the other category tabs.
- [x] C06 `src/js/components/topbar.js` + `enhance.js`: add the **apps-grid «▦» launcher** (`data-action="apps-grid"` → `appsMenu()` — a 3-column grid of the eight implemented pages) alongside the existing ⌘K command palette and Quick-Actions «+» menu.
- [x] C07 `src/locales/{ar,en}.js`: `cat.*` category labels (also the panel titles) incl. `cat.teachersPerf`, the ~48 `nav.*` item labels, `nav.categories` (rail aria-label), `nav.soon`, `nav.comingSoon`, `topbar.apps`; Arabic RTL default + English.
- [x] C08 Rewrite `contracts/navigation-ia-contract.md` for the category-rail model and update the cross-referencing docs (`sidebar-shell-contract.md` S1–S3 + a11y, `admin-pages-contract.md` AP1/AP2, `screenshot-acceptance.md` category rows + §A4 "one category at a time", `README.md`, `quickstart.md`).

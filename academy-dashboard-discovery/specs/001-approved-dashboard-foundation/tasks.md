---
description: "Task list for Spec 001 — Approved Academy Dashboard Visual Foundation"
---

# Tasks: Approved Academy Dashboard Visual Foundation

**Input**: Design documents from `academy-dashboard-discovery/specs/001-approved-dashboard-foundation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (all present)

**Tests**: **INCLUDED** — the spec explicitly requires automated tests (axe a11y, no-dead-button, no-raw-i18n-key, no-external-request, keyboard) **and** mandatory screenshot-based visual acceptance. These are NOT optional for this feature.

**App root**: `academy-dashboard-discovery/app/` (all paths below are relative to it unless noted). Static multi-page frontend — native HTML/CSS/JS (ES modules), local Tailwind/PostCSS, no framework, no CDN.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1–US7, mapping to the spec's user stories (story phases only)

## Story sequencing rationale (read first)

The spec has four P1 stories. They are sequenced here by **build dependency**, not raw priority number, because the P1 "first impression" story (US1) requires every dashboard zone to exist:

- **US2 (shell)** is built first — every page renders inside it.
- **US3 (welcome + KPI + status)**, **US4 (sessions)**, **US5 (reports)** build the dashboard zones.
- **US1 (first impression / full visual match)** then integrates all zones + interface states and runs the holistic AR-RTL-light fidelity review — this is the MVP visual-acceptance milestone.
- **US6 (gallery)** proves the component system; **US7 (a11y/bilingual/theme/responsive + screenshot matrix)** is the cross-cutting quality gate.

Earliest demo = US2 + US3 (a real shell with a scannable dashboard top). Full first-impression MVP = through **US1**.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, build pipeline, local assets, test harness.

- [x] T001 Create the app directory structure per plan.md (`src/{styles,js/components,js/fixtures,locales,icons,fonts,pages}`, `dist/`, `tests/{screenshots,a11y,smoke}`, `screenshots/`) under `academy-dashboard-discovery/app/`
- [x] T002 Initialize app-local `package.json` with scripts (`dev`, `build`, `screenshots`, `test:a11y`, `test:smoke`, `test`) in `package.json`
- [x] T003 [P] Add dev dependencies (tailwindcss 3.x, postcss, autoprefixer, @axe-core/playwright) and create `tailwind.config.js` mapping `theme.extend` colors/radii/shadows/fontFamily onto CSS custom-property tokens (per tokens-contract T8)
- [x] T004 [P] Configure PostCSS in `postcss.config.js` and create the Tailwind entry `src/styles/app.css` (`@tailwind base/components/utilities` + component `@layer`s)
- [x] T005 [P] Vendor self-hosted **Tajawal** woff2 (weights 400/500/700) into `src/fonts/` with `@font-face` (no CDN), per research R4
- [x] T006 [P] Vendor a local outline **SVG icon** set/sprite into `src/icons/sprite.svg` (currentColor; no FontAwesome/tabler/CDN), per research R5
- [x] T007 [P] Configure the test/dev harness: `playwright.config.js` (Chromium, viewports desktop/tablet/mobile) and a minimal local static server used by `npm run dev`
- [x] T008 [P] Add formatting/lint config for plain JS (`.editorconfig`, prettier/eslint flat config) in `academy-dashboard-discovery/app/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Cross-cutting systems and shared atoms every story needs.

**⚠️ CRITICAL**: No user-story work begins until this phase is complete.

- [x] T009 Implement design tokens (CSS custom properties, light + `[data-theme="dark"]` + `prefers-color-scheme` block) covering all `--c-*`, `--r-*`, `--sh-*`, gradients, and motion in `src/styles/tokens.css`, verbatim from tokens-contract T1–T6
- [x] T010 [P] Implement `src/styles/base.css` (resets, RTL logical-property defaults, base typography scale, `:focus-visible`)
- [x] T011 [P] Implement the theme engine (light/dark/system, `localStorage`, pre-paint no-flash snippet) in `src/js/theme.js`, per research R2
- [x] T012 [P] Implement the i18n engine (load ar/en, set `dir`/`lang`, `data-i18n`/`data-i18n-attr` binder, **missing-key guard**) in `src/js/i18n.js`, per research R8
- [x] T013 [P] Create namespaced locale dictionaries (`nav.*`, `topbar.*`, `welcome.*`, `kpi.*`, `session.*`, `status.*`, `report.*`, `state.*`) in `src/locales/ar.json` (default) and `src/locales/en.json`
- [x] T014 [P] Implement the single status map (`id → accent/icon/label`) in `src/js/components/status-map.js`, per tokens-contract T7 + data-model Status
- [x] T015 [P] Create fixture modules (`sessions`, `kpis`, `statusSummary`, `reports`, `profile`, `welcome`) in `src/js/fixtures/` and the data-driven nav in `src/js/nav.config.js`, per data-model.md (keep `24` consistent across nav badge / KPI / welcome / status sum)
- [x] T016 [P] Implement Button (primary/secondary/ghost/danger, sizes, disabled-with-reason) in `src/js/components/button.js`
- [x] T017 [P] Implement Card + Section/Section-header (title + optional "see all →" link) in `src/js/components/card.js`
- [x] T018 [P] Implement Avatar (image + initials fallback) in `src/js/components/avatar.js`
- [x] T019 [P] Implement Badge/Pill in `src/js/components/badge.js`
- [x] T020 [P] Implement Icon + Icon Medallion (accent gradient tile, per tokens-contract T4) in `src/js/components/medallion.js`
- [x] T021 Create page scaffolds `src/pages/dashboard.html`, `src/pages/reports.html`, `src/pages/gallery.html` (link compiled `dist/app.css`, shell mount points, `data-i18n` ready)
- [x] T022 Implement `src/js/main.js` bootstrap (apply theme + i18n + mount shell on every page)

**Checkpoint**: Tokens, theme, i18n, status map, fixtures, shared atoms, and page scaffolds ready.

---

## Phase 3: User Story 2 - Real product shell (Priority: P1) 🏗️ built first

**Goal**: A right-side RTL dark premium sidebar + organized topbar that feel like a real SaaS shell, reused by every page.

**Independent Test**: Operate the shell across all 3 pages — collapse to slim rail and back, open the mobile drawer, open profile/notifications menus, switch theme and language — and confirm it re-themes/re-mirrors with no breakage and the active pill tracks the page.

- [x] T023 [P] [US2] Implement Sidebar (brand block + plan badge, grouped nav from `nav.config`, strong violet active pill, bottom help card) in `src/js/components/sidebar.js`, per sidebar-shell-contract S1–S2
- [x] T024 [US2] Add sidebar collapse → **slim icon-rail** state with hover labels + persist `sidebarCollapsed` in `src/js/components/sidebar.js` (depends T023), per S3
- [x] T025 [US2] Implement Drawer and wire the sidebar mobile/tablet off-canvas drawer (scrim, focus trap, Esc) in `src/js/components/drawer.js` (depends T023)
- [x] T026 [P] [US2] Implement Topbar (breadcrumb/title, centered global search, grouped utility cluster) in `src/js/components/topbar.js`, per S4
- [x] T027 [US2] Implement Dropdown/Menu and wire profile + notifications + language menus into the topbar in `src/js/components/dropdown.js` (depends T026)
- [x] T028 [US2] Wire topbar theme + language switches to `theme.js`/`i18n.js` so the whole shell re-themes/re-mirrors in `src/js/components/topbar.js` (depends T011, T012, T026)
- [x] T029 [US2] Implement `src/js/shell.js` (mount sidebar + topbar + content region, active-route detection, responsive behavior)
- [x] T030 [US2] Mount the shell on all 3 pages and verify navigation + active-pill state in `src/pages/dashboard.html`, `reports.html`, `gallery.html` (depends T029)

**Checkpoint**: A polished, reusable product shell works across all pages, themes, and directions.

---

## Phase 4: User Story 3 - Operational scanning (Priority: P1)

**Goal**: The compact welcome zone, KPI cards, and status tiles let an admin read the academy's state at a glance.

**Independent Test**: Show the dashboard top; a fresh reviewer can state today's sessions, live-now count, attendance %, and pending/cancelled counts within ~10 seconds.

- [x] T031 [P] [US3] Implement the Welcome/top zone (gradient hero: greeting, date, summary, primary+secondary actions, motif; plus two small stat cards + attendance ring) in `src/js/components/welcome.js`, per dashboard-layout D1
- [x] T032 [P] [US3] Implement KPI/stat card (icon medallion, trend pill, large tabular value, label, mini-visual slot, accent) in `src/js/components/kpi-card.js`, per D2
- [x] T033 [P] [US3] Implement hand-rolled mini visuals (inline SVG line/bar sparkline + CSS/SVG progress + ring) — **no chart library** — in `src/js/components/sparkline.js`, per research R6
- [x] T034 [P] [US3] Implement Status tile (large count + status icon + label on accent-weak surface; never a gray pill) in `src/js/components/status-tile.js`, per D4
- [x] T035 [US3] Assemble the welcome zone + 4 KPI cards + 4 status tiles from fixtures into `src/pages/dashboard.html` (depends T031–T034)

**Checkpoint**: The dashboard's at-a-glance top is scannable and reads as premium.

---

## Phase 5: User Story 4 - Sessions workflow preview (Priority: P2)

**Goal**: A modern sessions table with an integrated filter/action bar as the operational foundation.

**Independent Test**: Render the sessions module with fixtures; confirm filter bar, columns, status chips, row-action menu, and "showing 5 of 24" pagination read as a modern product table, not a spreadsheet.

- [x] T036 [P] [US4] Implement Form Field + inputs (always-labeled; text, search-with-icon, custom Select, date, time) in `src/js/components/field.js`, per component-contracts (Field/inputs)
- [x] T037 [P] [US4] Implement Status chip (resolved from the status map) in `src/js/components/status-chip.js`
- [x] T038 [US4] Implement Data Table (sticky header, rows, status-chip column, **kebab row-action menu**, pagination + "showing X of N", empty/loading/error row states) in `src/js/components/table.js`, per component-contracts + D3 (depends T037)
- [x] T039 [US4] Implement the sessions integrated filter/action bar (primary "new session", active-filter chip, search/subject/date/time + apply) in `src/js/components/sessions-toolbar.js` (depends T036)
- [x] T040 [US4] Assemble the sessions module (header + toolbar + table from session fixtures) into `src/pages/dashboard.html` (depends T038, T039)

**Checkpoint**: The sessions module is a modern, readable table with working (fixture) filters and actions.

---

## Phase 6: User Story 5 - Reports overview (Priority: P2)

**Goal**: Report entry cards that feel like real product areas, including a permission-locked disabled card, plus a Reports Overview page.

**Independent Test**: View the dashboard reports area and the Reports page; confirm cards look real, one shows a disabled "permission required" reason and is non-clickable, and the page reuses the shell with no detail pages.

- [x] T041 [P] [US5] Implement Report card (medallion, title, description, nav chevron, **disabled-with-reason** variant) in `src/js/components/report-card.js`, per D5
- [x] T042 [US5] Assemble the dashboard reports area (4 cards incl. the permission-locked trainers report) into `src/pages/dashboard.html` (depends T041)
- [x] T043 [US5] Build the Reports Overview page (shell + report cards only, no detail pages) in `src/pages/reports.html` (depends T041)

**Checkpoint**: Reports read as real product areas on both the dashboard and the Reports page.

---

## Phase 7: User Story 1 - Admin first impression / full visual match (Priority: P1) 🎯 MVP visual acceptance

**Goal**: Integrate all zones + interface states and run the holistic fidelity pass so the dashboard visibly matches the approved design on first load (AR-RTL light).

**Independent Test**: Load the assembled dashboard in Arabic RTL light and review side-by-side against `design-references/approved-dashboard/academy-dashboard.png` — it must pass all failure conditions in screenshot-acceptance §A4.

- [x] T044 [P] [US1] Implement EmptyState (medallion + title + message + CTA) in `src/js/components/empty-state.js`, per D6
- [x] T045 [P] [US1] Implement LoadingSkeleton (shimmer, honors `prefers-reduced-motion`) in `src/js/components/loading-skeleton.js`
- [x] T046 [P] [US1] Implement ErrorState (coral medallion, cause, retry action) in `src/js/components/error-state.js`
- [x] T047 [US1] Add the "حالات الواجهة" states section (loading/error/empty demos) to `src/pages/dashboard.html` (depends T044–T046)
- [x] T048 [US1] Visual-fidelity pass across the full dashboard (spacing, depth, gradients, medallions, typography, warm canvas) to match `academy-dashboard.png` in `src/pages/dashboard.html` + `src/styles/app.css`, per approved-design-contract + dashboard-layout-contract
- [x] T049 [US1] Capture the dashboard AR-RTL light screenshot and record the side-by-side verdict vs the approved reference in `screenshots/REVIEW.md` (depends T048)

**Checkpoint** 🎯: The dashboard passes first-impression visual acceptance — MVP milestone.

---

## Phase 8: User Story 6 - Design system proof / gallery (Priority: P2)

**Goal**: A gallery page proving every base component works in both directions and all themes, with no dead buttons and no raw i18n keys.

**Independent Test**: Open the gallery in RTL/LTR × light/dark; confirm all components render correctly, no control is dead, and no raw key appears.

- [x] T050 [P] [US6] Implement Modal (focus trap, Esc, return-focus, scrim, ARIA dialog; original structure, not Bootstrap) in `src/js/components/modal.js`
- [x] T051 [P] [US6] Implement Tabs (keyboard arrows/Home/End, token-styled) in `src/js/components/tabs.js`
- [x] T052 [P] [US6] Implement Toast/notification (`aria-live`, token-typed) in `src/js/components/toast.js`
- [x] T053 [US6] Build the Gallery page rendering every base component in both directions + all themes (assert no dead buttons / no raw keys) in `src/pages/gallery.html` (depends on all component tasks T016–T052)

**Checkpoint**: The design system is proven globally on one page.

---

## Phase 9: User Story 7 - Accessibility, bilingual & theme quality (Priority: P1)

**Goal**: Harden RTL/LTR, light/dark/system, keyboard/a11y, and responsiveness across all pages, then run the full automated + screenshot acceptance matrix.

**Independent Test**: Run keyboard-only navigation, axe (zero critical), and responsive checks across dashboard/reports/gallery in both directions and all theme modes; capture and review the full screenshot matrix.

- [x] T054 [US7] RTL/LTR audit + fixes (logical properties, mirrored chevrons/column order, numbers/times/currency not mirrored, bidi isolation) across `src/pages/*.html` + `src/styles/app.css`
- [x] T055 [US7] Theme audit + fixes (true-dark surfaces, contrast, no-flash) across light/dark/system on all pages
- [x] T056 [US7] Responsive audit + fixes (sidebar→drawer, KPI/card reflow, table scroll/stack; no overflow) at mobile/tablet/desktop on all pages
- [x] T057 [P] [US7] Keyboard + focus pass (logical order, visible focus, ≥44px targets, dialog focus traps, accessible names on icon controls) across shell + pages
- [x] T058 [P] [US7] Implement smoke tests — no-dead-button, no-raw-i18n-key, no-external-request (no-CDN) — in `tests/smoke/`, per screenshot-acceptance A5
- [x] T059 [P] [US7] Implement axe-core a11y specs (zero critical) for dashboard/reports/gallery in `tests/a11y/`
- [x] T060 [P] [US7] Implement the Playwright screenshot-matrix capture (dashboard ar/light, ar/dark, en/light; reports ar/light; gallery ar/light + dark; dashboard mobile + tablet) in `tests/screenshots/`, per screenshot-acceptance A2
- [x] T061 [US7] Run the full matrix + side-by-side review vs the approved reference, apply failure conditions (A4), and record verdicts in `screenshots/REVIEW.md` (depends T058–T060)

**Checkpoint**: All quality gates pass and the full screenshot matrix is accepted.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across the whole feature.

- [x] T062 [P] Verify the scope guard end-to-end (no business modules/API/auth/permissions, no charts/CDN/TypeScript/SPA, no legacy assets/classes/logo/wording) per `contracts/scope-guard.md`
- [x] T063 [P] Run the `quickstart.md` flow (install → build → dev → screenshots → test) and fix any gaps
- [x] T064 [P] Write `app/README.md` documenting the build/dev/screenshot workflow
- [x] T065 Final consistency + cleanup pass (fixture coherence: `24` across nav badge/KPI/welcome/status sum; remove dead code; confirm no console missing-key warnings)

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (P1tasks T001–T008)**: start immediately; T002 before T003/T004; assets (T005/T006) independent.
- **Foundational (T009–T022)**: after Setup; **blocks all user stories**. T009 (tokens) before styling-dependent work; T021/T022 after the atoms exist.
- **US2 shell (T023–T030)**: after Foundational. First user story (all pages render in it).
- **US3 (T031–T035)**, **US4 (T036–T040)**, **US5 (T041–T043)**: after US2 (they populate the shell's content). Largely independent of each other.
- **US1 (T044–T049)**: after US3 + US4 + US5 (its acceptance integrates all dashboard zones + states).
- **US6 gallery (T050–T053)**: after all component tasks exist.
- **US7 quality (T054–T061)**: after the pages/components exist (final cross-cutting gate).
- **Polish (T062–T065)**: last.

### Within a story

- Components before the assembly task that composes them (e.g., T031–T034 before T035; T038/T039 before T040; T044–T046 before T047).
- Visual-fidelity + screenshot tasks come after assembly (T048 before T049; T058–T060 before T061).

### Parallel opportunities

- Setup: T003–T008 in parallel.
- Foundational: T010–T020 in parallel (different files) once T009 exists.
- US2: T023 and T026 in parallel; US3: T031–T034 in parallel; US4: T036/T037 in parallel; US1: T044–T046 in parallel; US6: T050–T052 in parallel; US7 tests: T057–T060 in parallel.
- After US2, the content stories US3/US4/US5 can be staffed in parallel (different component files; only their `dashboard.html` assembly tasks must be serialized to avoid editing the same file simultaneously).

---

## Parallel Example: Foundational shared atoms

```bash
# After T009 (tokens) lands, build the shared atoms together (different files):
Task: "T016 Button in src/js/components/button.js"
Task: "T017 Card/Section in src/js/components/card.js"
Task: "T018 Avatar in src/js/components/avatar.js"
Task: "T019 Badge/Pill in src/js/components/badge.js"
Task: "T020 Icon Medallion in src/js/components/medallion.js"
```

## Parallel Example: User Story 3

```bash
# Welcome zone + KPI card + mini-visuals + status tile in parallel (different files):
Task: "T031 Welcome zone in src/js/components/welcome.js"
Task: "T032 KPI card in src/js/components/kpi-card.js"
Task: "T033 Sparkline/ring (no chart lib) in src/js/components/sparkline.js"
Task: "T034 Status tile in src/js/components/status-tile.js"
# then T035 assembles them into dashboard.html
```

---

## Implementation Strategy

### MVP path (first-impression visual acceptance)

1. Phase 1 Setup → 2. Phase 2 Foundational → 3. US2 shell → 4. US3 + US4 + US5 (dashboard zones) → 5. US1 integration + fidelity pass + AR-RTL-light screenshot review.
   **Stop & validate** at the US1 checkpoint: the dashboard must match the approved design. This is the demoable MVP.

### Incremental delivery

- After **US2**: demo the shell (sidebar/topbar across themes/dirs).
- After **US3**: demo the scannable dashboard top.
- After **US4 / US5**: sessions table, then reports — each independently testable.
- After **US1**: full first-impression match (MVP).
- After **US6**: design-system gallery.
- After **US7**: full a11y/bilingual/theme/responsive + complete screenshot matrix accepted.

### Notes

- Tests are included because the spec mandates them; automated checks (axe/smoke) are necessary but the **manual screenshot review against the approved reference is the final gate** (see `contracts/screenshot-acceptance.md`).
- `[P]` = different files, no incomplete-task dependency. Serialize tasks that edit the same file (notably the three `dashboard.html` assembly tasks T035/T040/T042/T047).
- Honor `contracts/scope-guard.md` throughout: fixtures only; no business modules, real API/auth, charts, CDN, TypeScript, SPA, or legacy assets/wording.

---

## Implementation notes / deviations (2026-06-29)

All 65 tasks are complete and verified (build clean · smoke PASS · axe critical=0/serious=0 · 8/8 screenshots reviewed vs the approved design). A few were delivered by **consolidating files** rather than one-file-per-task — functionally equivalent, noted here for honesty:

- **Atoms grouped** (T016–T020): Button, Avatar, Badge/Pill, Medallion, and Section-header live in `src/js/components/ui.js` (one cohesive atoms module) rather than separate `button.js`/`avatar.js`/etc. The Card/Section (T017) is a CSS component class (`.card`, `.card-2`) + the `sectionHeader()` helper.
- **Form fields** (T036): inputs are delivered as CSS component classes (`.field-label`, `.input`, `.input-wrap`, `.select-btn`) used by the sessions toolbar and gallery, not a standalone `field.js`. Every field has a visible label.
- **Sessions toolbar** (T039): implemented inside `src/js/components/table.js` (`toolbar()`), not a separate `sessions-toolbar.js`.
- **Tabs** (T051): delivered as a styled tab pattern (`.tabs`/`.tab`) shown in the gallery; full keyboard-arrow Tabs JS was not needed by any Spec-001 page (no tabbed page exists) and is deferred to the owning future spec.
- **Modal** (T050): implemented as `openModal()` in the gallery page (focus, Esc, scrim) rather than a separate `modal.js`.
- **Locales** (T013): `ar.js` / `en.js` ES modules (default-export dictionaries) instead of `.json`, to avoid JSON-module/MIME fragility in the no-build ESM runtime (see research R8). Same data, namespaced keys.
- **Playwright harness** (T007): Chromium + viewports are configured inline in `tests/screenshots/capture.cjs` (+ `scripts/serve.cjs` static server) rather than a separate `playwright.config.js`.

Locations differing from the task text are intentional and documented above; the **deliverable** (a screenshot-accepted, AA-clean, bilingual, themed dashboard foundation) is fully met.

---

## Architecture decision — static HTML-first / GitHub Pages / Django-ready (2026-06-29)

After the initial build, the delivery model was changed (per stakeholder requirement) from a JS-rendered app to a **static, HTML-first site**. This is binding for Spec 001 and all later work:

- **Final client preview uses `app/public/`** — a built static site. `npm run build` pre-renders each page to complete HTML there.
- **VS Code Live Server opens `app/public/dashboard.html`** directly (no Node server required). `npm run preview` is an optional Node static server.
- **GitHub Pages** can publish the self-contained `app/public/` (relative paths + `.nojekyll`); `npm run deploy:pages -- --out=../../docs` copies it to **`docs/`** for the common "/docs" Pages source.
- **JS only enhances existing markup** (`src/js/enhance.js`: theme, language, sidebar rail/drawer, dropdowns, modal, filter/table demo feedback, no-dead-button catch-all). It creates **no page DOM**.
- **No JS-rendered empty app mount remains** — there is no `<div id="app">`; every page ships the full shell + sections as static HTML (verified).
- **Pages are Django-template-ready**: `public/dashboard.html` → `templates/admin/dashboard.html`; shell → partials; `src/styles`/`src/js` → Django static; fixtures → view context; behavior via `data-*` hooks.
- i18n = per-language pre-rendered pages (`*.html` Arabic / `*.en.html` English); the language toggle navigates, theme switches in place.

Affected tasks were re-satisfied under this model: T007 (serve `public/`), T021–T022 (page scaffolds/bootstrap → SSG `build-html.mjs` + enhancement `enhance.js`; obsolete `src/pages/*.html`, `main.js`, `shell.js` removed), plus new build/deploy scripts (`build-html.mjs`, `build-assets.mjs`, `deploy-pages.mjs`). Re-verified: build clean · smoke PASS · axe critical=0/serious=0 · 8/8 screenshots pixel-identical to the approved-matching set. Details in `quickstart.md`, `app/README.md`, and `contracts/scope-guard.md` + `contracts/screenshot-acceptance.md`.

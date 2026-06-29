# Feature Specification: Admin Core Operations Pages

**Feature Branch**: `feature/001-approved-dashboard-design` (continues; spec dir is independent)
**Spec Directory**: `002-admin-core-operations`
**Created**: 2026-06-29
**Status**: Draft
**Input**: User description: "Admin Core Operations Pages — extend the approved Spec 001 frontend with the first set of real admin operation pages behind the sidebar nav (sessions, schedule, students, trainers, curricula, settings), same approved design + static HTML-first / Django-ready architecture, fixtures only."

---

## Context & Design Grounding *(mandatory for this spec)*

This spec **extends Spec 001** (`001-approved-dashboard-foundation`, implemented in `academy-dashboard-discovery/app/`). It is grounded in inspected artifacts, not invented.

**Spec 001 (the foundation this builds on — the VISUAL target):**

- App is a **static, HTML-first** site: a generator (`scripts/build-html.mjs`) pre-renders each page to complete HTML in `app/public/` (Arabic default + English `*.en.html`); `src/js/enhance.js` only enhances the markup; relative `./assets/` paths; GitHub-Pages / Live-Server compatible; Django-template-ready. Verified passing: build clean, smoke (no raw keys / external requests / dead buttons), axe critical=0/serious=0, screenshot review against the approved design.
- Approved design tokens: warm cream canvas `#FAF6EF`, a two-part inline-start nav shell — a slim icon rail beside a light nav panel with a violet active pill (per `sidebar-reference.png`; the dark `#1F1B38` is now reused only as the rail's dark-mode plane), violet primary `#5145CD`, 5-accent palette (teal/green/sky/amber/coral) with light/dark/system; Tajawal font; soft rounded cards; icon medallions.
- **Reusable components already built** (`app/src/js/components/`): `sidebar`, `topbar`, `shell-markup`, `table` (+ sessions toolbar), `status-chip`, `status-map`, `status-tile`, `kpi-card`, `sparkline`, `report-card`, `drawer`, `dropdown`, `toast`, `states` (empty/loading/error), `ui` (button/medallion/avatar/badge/trendPill/sectionHeader), `welcome`.
- **Existing pages**: `dashboard`, `reports`, `gallery` (+ `.en`). The sidebar (`src/js/nav.config.js`) already defines the nav; six items currently route to `#`.

**The six placeholder nav destinations become this spec's pages:** `sessions`, `schedule`, `students`, `teachers`, `courses`, `settings` (home→dashboard and reports are already built).

**Old academy system (PRODUCT/UX reference ONLY — never copy its visuals):** confirmed in `output/combined/{page,table,form,modal,interaction}-inventory.md` and `frontend-planning-deep/*` + admin contact sheets:

- **Sessions / classes** (`courseclasses`, session-accounting): tables keyed by time, student/group, teacher, course/details, duration, status, actions; status used as quick filters (attend, student-absent, teacher-absent, cancelled, etc.).
- **Schedule**: "All Teachers Timetable" — a 7-day weekly grid of session blocks per teacher/day, with an availability editor.
- **Students**: directory + analysis-student; per-student detail = banner + status + up to 8 tabs.
- **Teachers**: directory (sortable: name, country, phone, status, students_count, total_hours, performance %/session-count), timetable, permission matrix per admin.
- **Courses / curricula** (`courseclasses`): Name, Description, Status, Count, Settings; per-course Levels with Added-by/Level/Text/Status/Created-at.
- **Settings**: academy/admin profile, roles & permissions (grouped collapsible checkbox matrix), appearance.
- Common patterns: collapsible filter bars (date-range, teacher/student/family/duration/status selects), select2/flatpickr widgets, Bootstrap modals (Mark Attend/Absent, Cancel Class, Edit Class, confirmations), per-row action menus.

### What was found (product patterns reused as concept)

Right-side admin nav grouping; operational sessions table with status quick-filters; weekly timetable concept; people directories (students/teachers) with status/hours/performance; course/level structure; grouped settings + permission matrix; filter/table/row-action/modal/toast patterns.

### What MUST NOT be copied (hard constraint)

Old logo/assets, legacy colors (esp. purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`), Bootstrap modal/offcanvas/grid structure, old CSS classes, old icon sets (tabler/Font Awesome), legacy widget libraries (select2/flatpickr/ApexCharts/Quill/Dropzone), academy-specific/private wording or data, and any pixel-for-pixel legacy layout.

### What the approved direction requires

Every Spec 002 page must read as a natural extension of the approved Spec 001 dashboard: premium, modern, calm, easy to scan, comfortable, not cluttered, not generic-admin, not flat/pale — sharing the exact shell (slim icon rail + light nav panel with a violet active pill and a bottom rail avatar, plus the organized topbar), warm canvas, violet primary, soft rounded cards, icon medallions, readable Arabic typography, and quality dark mode.

### Missing references

None. All Spec 001 docs/app files, approved references, and old-system inventories named in the request were located and inspected; nothing was guessed in place of a missing file.

---

## Scope *(mandatory for this spec)*

### In Scope (Spec 002)

Six new admin operation pages behind the sidebar, each pre-rendered Arabic + English, reusing the Spec 001 shell, tokens, and components, with fixture-only data:

1. **Sessions** — full operational sessions list (the dashboard sessions module expanded into a page).
2. **Schedule** — a calm weekly/day schedule overview (no calendar library); Arabic label الجدول الدراسي.
3. **Students** — students directory.
4. **Teachers** (المعلمون · `teachers.html`) — teachers directory.
5. **Courses** (الدورات · `courses.html`) — courses overview.
6. **Settings** — academy settings shell.

Plus: wiring the sidebar so these items navigate to the real pages with correct active state; a **shared admin page-pattern set** (page header, breadcrumbs, filter bar, table, card grid, drawer, modal, confirmation modal, toast, disabled-with-reason); fixture data; RTL/LTR; Light/Dark/System; accessibility; responsive; screenshot acceptance; no-dead-button and no-raw-i18n-key guarantees; and preservation of the static / GitHub-Pages / Django-ready delivery.

### Out of Scope (Spec 002)

Backend API; database; real auth; real permission enforcement; real create/update/delete persistence; attendance workflow; finance/payroll/invoices/wallet; family/student/teacher **portals**; student/teacher/family **dashboards**; live Zoom; notifications backend; report detail analytics; chart libraries; calendar libraries; CDN; TypeScript; SPA framework; and any copied legacy assets/classes/logo/palette/private wording.

> **Note:** Student/Teacher/Family dashboards are explicitly **not** in Spec 002. When specified later they must be visually comfortable, cheerful, simple, human, and creative — **not** heavy admin-style dashboards.

### MVP slice (and why)

The MVP is **US1 (navigation) + US2 (Sessions page) + US8 (shared patterns)**: wiring the sidebar to real pages and delivering the Sessions page proves the core operations experience and establishes every shared admin pattern that the other five pages reuse. Schedule/Students/Teachers (P2) and Courses/Settings (P3) are independent increments that compose the same proven patterns. Each page is independently testable, so the spec keeps all six in scope while sequencing by dependency/value.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin can navigate core pages (Priority: P1)

As an academy administrator, I click sidebar items and land on real static pages with the same shell, correct breadcrumb/title, and the active nav pill on the current item.

**Why this priority**: Until the nav opens real pages, no operation page is reachable; this is the connective tissue for every other story.

**Independent Test**: From the dashboard, click each of Sessions, Schedule, Students, Teachers, Courses, Settings; confirm each loads a distinct static page with the shell intact and the active pill on the right item; the language/theme controls keep working.

**Acceptance Scenarios**:

1. **Given** any Spec 001 page, **When** the admin clicks a sidebar item (sessions/schedule/students/teachers/courses/settings), **Then** the matching static page loads with the slim icon rail + light nav panel, topbar, breadcrumb, and the active pill on that item.
2. **Given** a Spec 002 page in Arabic, **When** the admin switches language, **Then** it navigates to the English equivalent of the same page with the theme preserved.
3. **Given** any Spec 002 page, **When** it loads, **Then** the topbar (title, breadcrumb, search, utilities) is identical in structure to Spec 001 — no drift.

---

### User Story 2 - Admin can manage daily sessions visually (Priority: P1)

As an administrator, I open the Sessions page and see a clear, filterable, readable list of sessions with status chips, row actions, and helpful states — the operational heart of the academy.

**Why this priority**: Sessions are the highest-value recurring surface; this page also establishes the shared filter/table/row-action/state patterns the other pages reuse.

**Independent Test**: Open Sessions; read the session list with fixture data; use the filter/search controls (demo); open a row action menu and a session details preview; observe empty/loading/error demonstrations.

**Acceptance Scenarios**:

1. **Given** the Sessions page, **When** it renders, **Then** it shows a page header (title + context + primary action), quick summary tiles, an integrated filter/search bar, and a modern sessions table (time+duration, session+level, teacher avatar+name, room, students, status chip, row-actions menu) with pagination.
2. **Given** the filter bar, **When** the admin applies/clears a fixture filter, **Then** there is visible feedback (e.g., active-filter chip + toast) — no dead controls.
3. **Given** a table row, **When** the admin opens its actions menu and chooses "view details", **Then** a details **drawer/modal** opens with the session's fixture info; create/edit actions are demo-with-feedback or disabled-with-reason (no real lifecycle).
4. **Given** the page is judged visually, **When** reviewed, **Then** the table reads as a modern product table (depth, spacing, status color, hierarchy) — not a spreadsheet — and matches Spec 001.

---

### User Story 3 - Admin can inspect the schedule (Priority: P2)

As an administrator, I open the Schedule page and get a comfortable overview of upcoming activity grouped by day, with filters for subject/teacher/status/date — without a heavy calendar widget.

**Why this priority**: Operational awareness of timing is core, but it builds on the shared patterns proven by Sessions.

**Independent Test**: Open Schedule; scan the day-grouped overview; apply a fixture filter; open a session block preview.

**Acceptance Scenarios**:

1. **Given** the Schedule page, **When** it renders, **Then** it shows a structured weekly/day overview of session blocks (time, title, teacher, room, status) grouped clearly, readable in RTL, with no calendar library.
2. **Given** the schedule filters (subject/teacher/status/date), **When** used, **Then** they give visible fixture feedback.
3. **Given** a session block, **When** activated, **Then** a preview drawer/modal shows its fixture details; the layout stays calm and uncluttered.

---

### User Story 4 - Admin can browse students (Priority: P2)

As an administrator, I open the Students page and quickly scan the student directory with search/filter/sort, status, avatars, and a light progress indicator, and preview a student without deep navigation.

**Independent Test**: Open Students; search/filter/sort the directory; open a student profile preview drawer.

**Acceptance Scenarios**:

1. **Given** the Students page, **When** it renders, **Then** it shows a page header, optional quick summary cards, an easy search/filter/sort area, and a scannable directory (cards or table) with avatar, name, status chip, and a progress/level indicator.
2. **Given** a student entry, **When** opened, **Then** a profile **preview drawer** shows fixture details (contact, enrolled courses, status) — no real edit/persistence.
3. **Given** the directory, **When** reviewed, **Then** it is easy to scan and not a raw data dump (comfortable spacing, clear hierarchy, helpful microcopy).

---

### User Story 5 - Admin can browse teachers (Priority: P2)

As an administrator, I open the Teachers page and see teachers with availability/status and a performance-like fixture summary, and preview a teacher.

**Independent Test**: Open Teachers; scan availability/status/performance fixture info; open a teacher profile preview.

**Acceptance Scenarios**:

1. **Given** the Teachers page, **When** it renders, **Then** it shows teachers with avatar, name, subject(s), an availability/status indicator, and a performance-like summary (e.g., sessions count, rating, hours) using fixture data and hand-rolled visuals (no chart library).
2. **Given** a teacher entry, **When** opened, **Then** a profile preview drawer shows fixture details; any unavailable action is disabled-with-reason.

---

### User Story 6 - Admin can browse courses (Priority: P3)

As an administrator, I open the Courses page and see structured education content (courses/levels/subjects/status) without clutter.

**Independent Test**: Open Courses; scan course/level cards or table; open a course preview if provided.

**Acceptance Scenarios**:

1. **Given** the Courses page, **When** it renders, **Then** it shows courses as overview cards or a clean table with title, subject/level, status, and a count (e.g., enrolled/sessions) — calm and structured, not cluttered.
2. **Given** a course entry, **When** opened (if a preview is provided), **Then** a drawer/modal shows fixture levels/details; otherwise the card navigates or is disabled-with-reason — never dead.

---

### User Story 7 - Admin can open the settings shell (Priority: P3)

As an administrator, I open Settings and see a well-organized settings layout (academy profile, appearance/theme/language, account, roles/permissions preview) where controls demo locally or are disabled-with-reason — proving the settings experience without a backend.

**Independent Test**: Open Settings; navigate its sections; toggle theme/language (real); attempt a "save" (demo feedback) and a disabled control (reason shown).

**Acceptance Scenarios**:

1. **Given** the Settings page, **When** it renders, **Then** it shows grouped settings sections (e.g., academy profile, appearance, account, roles/permissions preview) in the approved card style with clear labels.
2. **Given** appearance controls, **When** theme/language are changed, **Then** they apply for real (reusing Spec 001 behavior); **Given** a "save"/backend control, **When** used, **Then** it shows local demo feedback (toast) or is disabled with a visible reason.

---

### User Story 8 - Shared admin patterns remain consistent (Priority: P1)

As a developer/reviewer, the page header, breadcrumbs, filter bar, table, card grid, drawer, modal, confirmation modal, toast, states, and buttons are visually and behaviorally consistent across all Spec 002 pages and identical in style to Spec 001.

**Why this priority**: Consistency is the difference between a product and a pile of pages; these patterns are reused by every page.

**Independent Test**: Compare the header/filter/table/drawer/modal/toast/state patterns across Sessions, Schedule, Students, Teachers, Courses, Settings; confirm one consistent language and Spec-001 fidelity.

**Acceptance Scenarios**:

1. **Given** any two Spec 002 pages, **When** their shared patterns are compared, **Then** headers, filters, tables/cards, drawers/modals, toasts, and states use the same components and tokens.
2. **Given** a confirmation modal (e.g., a destructive demo action), **When** triggered, **Then** it uses the approved modal pattern (focus trap, Esc, scrim) with clear confirm/cancel and visible outcome — no real persistence.

---

### User Story 9 - Static / Django-ready delivery remains intact (Priority: P1)

As a developer, every Spec 002 page is a complete static HTML file in `public/`, deployable to GitHub Pages and easy to convert to a Django template, with JS only enhancing existing markup.

**Independent Test**: Build the site; open `public/sessions.html` (Live Server) and View Source — full markup, relative paths, no empty mount; confirm no external requests.

**Acceptance Scenarios**:

1. **Given** a built Spec 002 page, **When** its source is viewed, **Then** it contains the full shell + page sections as real HTML (no `<div id="app">` whole-page mount) with relative `./assets/` paths.
2. **Given** the site is served from any static host (incl. a project subpath), **When** a Spec 002 page loads, **Then** all assets resolve and there are zero external (CDN) requests.
3. **Given** a Spec 002 page, **When** assessed for portability, **Then** it maps cleanly to a Django template (shell → partials, fixtures → context, behavior via `data-*` hooks).

---

### User Story 10 - Visual acceptance (Priority: P1)

As a reviewer, the Spec 002 pages visibly match the Spec 001 approved design system and do not drift into generic admin UI, in both directions and all themes.

**Independent Test**: Capture the screenshot matrix and review each against the approved Spec 001 direction + sidebar reference + existing Spec 001 screenshots.

**Acceptance Scenarios**:

1. **Given** the captured screenshots, **When** reviewed side-by-side with Spec 001, **Then** shell, canvas, sidebar, topbar, cards, chips, and typography match — no drift.
2. **Given** any failure condition (generic look, clutter, spreadsheet table, placeholder cards, dead actions, poor dark mode, broken RTL/LTR), **When** detected, **Then** the build is not accepted until fixed.

---

### Edge Cases

- **Empty data**: each list/directory/schedule shows a warm, human empty state with a clear next step — never a blank region.
- **Loading**: skeleton/shimmer placeholders matching the approved loading pattern (not a bare "Loading…").
- **Error**: a friendly error state with cause + retry, matching the approved error card.
- **Disabled-with-reason**: any not-yet-implemented action (create/edit/save/delete/export) is visibly disabled with a stated reason, or performs a clearly-labeled local demo with toast feedback.
- **Long content**: long Arabic/English names, course titles, and many filter chips wrap/truncate gracefully in both directions without breaking cards, rows, drawers, or the schedule grid.
- **Dense tables on small screens**: tables scroll horizontally or restructure into stacked cards; the schedule reflows to a single-day/stacked view on mobile.
- **Theme/direction switch mid-page**: switching Light↔Dark↔System re-themes instantly with no flash; switching Arabic↔English navigates to the equivalent page preserving theme.
- **Filters with no matches**: applying a fixture filter that matches nothing shows a "no results" state with a clear reset action.

---

## Requirements *(mandatory)*

### Functional Requirements — Navigation & Shell

- **FR-001**: The sidebar items Sessions, Schedule, Students, Teachers, Courses, and Settings MUST navigate to their real static pages (replacing the placeholder `#` routes), with the active nav pill and `aria-current` on the current page.
- **FR-002**: Every Spec 002 page MUST reuse the exact Spec 001 shell (slim icon rail + light nav panel with a violet active pill + bottom rail avatar + organized topbar + content region) with a consistent breadcrumb and page title; the topbar structure MUST NOT drift from Spec 001.
- **FR-003**: Each page MUST be delivered as a pre-rendered static page in **both** Arabic (default) and English; the language switch MUST navigate to the equivalent page preserving the theme.

### Functional Requirements — Shared Admin Page Patterns

- **FR-004**: The system MUST provide a consistent **page-header** pattern (title, optional subtitle/context, optional quick summary, and a primary action area) reused on every page.
- **FR-005**: The system MUST provide a consistent **filter/search bar** pattern (search, relevant selects, apply/reset) that gives visible fixture feedback and never contains dead controls.
- **FR-006**: The system MUST provide consistent **table** and **card-grid** patterns (reusing Spec 001 table/chips/medallions) that are readable, responsive, and not spreadsheet-like.
- **FR-007**: The system MUST provide consistent **drawer**, **modal**, and **confirmation-modal** patterns (focus trap, Esc, scrim, return-focus) and a **toast** feedback pattern, reused across pages.
- **FR-008**: Every interactive control MUST satisfy the **no-dead-button** rule: perform a visible local demo action, navigate to an in-scope page, open a drawer/modal/dropdown/toast, apply/reset fixture filters, or be disabled-with-reason.
- **FR-009**: Behavior MUST be attached via **`data-*` hooks** (e.g. `data-filter-form`, `data-table`, `data-row-menu`, `data-dropdown`, `data-modal-trigger`, `data-drawer`, `data-toast`, plus the existing theme/lang/sidebar hooks) over existing markup — JS MUST NOT generate whole-page DOM.

### Functional Requirements — Sessions Page

- **FR-010**: The Sessions page MUST present a page header, quick status summary, an integrated filter/search bar, and a modern sessions table (time+duration, session+level, teacher avatar+name, room, students count, status chip, per-row actions menu) with pagination and a "showing X of N" summary.
- **FR-011**: A session row action MUST open a **details drawer/modal** with fixture details; create/edit/cancel actions MUST be demo-with-feedback or disabled-with-reason (no real lifecycle).
- **FR-012**: The Sessions page MUST demonstrate empty, loading, and error states with warm microcopy.

### Functional Requirements — Schedule Page

- **FR-013**: The Schedule page MUST present a calm, structured weekly/day overview of session blocks (time, title, teacher, room, status) grouped by day, readable in RTL, implemented **without any calendar library**.
- **FR-014**: The Schedule page MUST provide subject/teacher/status/date filters with visible fixture feedback, and allow previewing a session block (drawer/modal).

### Functional Requirements — Directory Pages (Students, Teachers)

- **FR-015**: The Students page MUST present a scannable directory (cards or table) with avatar, name, status chip, and a level/progress indicator, plus search/filter/sort, and a student **profile preview drawer** (fixture).
- **FR-016**: The Teachers page MUST present teachers with avatar, name, subject(s), availability/status, and a performance-like fixture summary (e.g., sessions, rating, hours) using hand-rolled visuals (no chart library), plus a teacher **profile preview drawer**.
- **FR-017**: Directory pages MUST include optional quick summary cards and MUST read as easy-to-scan product pages, not raw data dumps.

### Functional Requirements — Courses Page

- **FR-018**: The Courses page MUST present courses as overview cards or a clean table with title, subject/level, status, and a count, structured and uncluttered; entries either preview (drawer/modal), navigate in-scope, or are disabled-with-reason.

### Functional Requirements — Settings Page

- **FR-019**: The Settings page MUST present grouped settings sections (e.g., academy profile, appearance, account, roles/permissions preview) in the approved card style with clear labels.
- **FR-020**: Appearance controls (theme/language) MUST function for real (reusing Spec 001 behavior); backend-bound controls (e.g., save) MUST give local demo feedback or be disabled-with-reason — no real persistence.

### Functional Requirements — Cross-cutting Quality

- **FR-021**: Every page MUST render correctly in Arabic RTL and English LTR, mirroring layout/nav/chevrons/table-column-order while never mirroring numbers/times/currency.
- **FR-022**: Every page MUST render correctly in Light, Dark, and System themes (true-dark surfaces, correct contrast, no flash).
- **FR-023**: Every page MUST be responsive across mobile, tablet, and desktop (sidebar→drawer, tables scroll/stack, schedule reflows) without overflow or broken layout.
- **FR-024**: There MUST be **no raw i18n keys** visible and **no external (CDN) requests** on any page; all assets MUST be local with relative paths.
- **FR-025**: Every page MUST be keyboard operable with visible focus and meet recognized accessibility expectations (target WCAG AA), verified by an automated accessibility scan reporting **no critical violations**.
- **FR-026**: Acceptance MUST include **screenshot review** of the matrix below, visibly matching the Spec 001 approved direction.

### Functional Requirements — Fixture Data & Architecture

- **FR-027**: All displayed data (sessions, schedule, students, teachers, courses, settings, summaries) MUST come from local static fixtures; no real backend, auth, or permission enforcement.
- **FR-028**: Each page MUST be a complete static HTML file in `public/` (real shell + sections; no `<div id="app">` whole-page mount), deployable to GitHub Pages, and structured for clean conversion to Django templates (shell → partials, fixtures → context, `data-*` hooks).
- **FR-029**: Fixture content MUST be original placeholder content; it MUST NOT reuse any legacy/private wording, names, or brand assets.

### Key Entities *(display fixtures only — no persistence, no API)*

- **Session (fixture)** — time, duration, title, level, teacher (name+avatar+accent), room, students present/capacity, status (live/upcoming/completed/cancelled), available row actions. *(extends the Spec 001 sessions fixture)*
- **Schedule Block (fixture)** — day, time range, session title, teacher, room, status; grouped by day.
- **Student (fixture)** — name, avatar/initials+accent, status, level/grade, progress indicator, enrolled courses, contact (placeholder).
- **Teacher (fixture)** — name, avatar+accent, subject(s), availability/status, performance summary (sessions count, rating, hours).
- **Course (fixture)** — title, subject/level, status, count (enrolled/sessions), optional level breakdown.
- **Settings Section (fixture)** — section title, fields/controls, control kind (real / demo / disabled-with-reason).
- **Filter State (fixture, display-only)** — selected fixture filters per page, reflected as active-filter chips; no URL/server contract implied.
- **Status vocabulary** — reuses the single Spec 001 status map (color + icon + label; never color-only).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six pages are reachable from the sidebar with correct active state; clicking each lands on a distinct static page with the shell intact (6/6).
- **SC-002**: 100% of the required screenshot matrix is captured and judged to match the Spec 001 approved direction; **zero** screenshots trigger a stated failure condition.
- **SC-003**: A reviewer unfamiliar with the project, shown any Spec 002 page beside a Spec 001 page, confirms they belong to the same product (no visual drift).
- **SC-004**: 100% of interactive controls are functional, navigational, open an overlay, apply/reset filters, or disabled-with-reason (no dead buttons); **zero** raw i18n keys appear in any screenshot or page.
- **SC-005**: Every page renders correctly in all 6 combinations of {Arabic RTL, English LTR} × {Light, Dark, System} with no layout breakage and legible contrast.
- **SC-006**: Automated accessibility scans report **zero critical violations** on every Spec 002 page; the pages are keyboard-operable with visible focus.
- **SC-007**: Every page renders without horizontal overflow or broken layout at representative mobile, tablet, and desktop widths.
- **SC-008**: Each Spec 002 page is a complete static HTML file in `public/` with **zero external (CDN) requests** and relative asset paths, loads correctly from a static host (incl. a project subpath), and contains no whole-page JS mount.
- **SC-009**: A reviewer confirms the pages do **not** read as generic / cluttered / flat / pale / spreadsheet-like / placeholder, and that tables, cards, drawers, modals, filters, toasts, and states are consistent across all pages.

---

## Visual Acceptance *(mandatory for this spec)*

Automated tests are required but insufficient. Final acceptance REQUIRES a screenshot review visibly matching the Spec 001 approved direction. Required matrix (minimum):

1. Sessions — **Arabic RTL, Light, Desktop**
2. Sessions — **Arabic RTL, Dark, Desktop**
3. Sessions — **English LTR, Light, Desktop**
4. Schedule — **Arabic RTL, Light, Desktop**
5. Students — **Arabic RTL, Light, Desktop**
6. Teachers — **Arabic RTL, Light, Desktop**
7. Courses — **Arabic RTL, Light, Desktop**
8. Settings — **Arabic RTL, Light, Desktop**
9. **Mobile** — the most complex table page (Sessions or Students)
10. **Tablet** — Schedule or Students

Reviewed against: the Spec 001 approved dashboard direction, the approved sidebar reference, the existing Spec 001 screenshots, and the old academy screenshots **as product/UX reference only (not visual copy)**.

**A review FAILS if any of the following are true:** the page looks generic; looks disconnected from Spec 001; the sidebar/topbar drift from Spec 001; too much clutter; tiny unreadable text; weak filters; the table looks like a spreadsheet; cards look like placeholders; actions are dead; dark mode is poor; RTL/LTR is broken; the page is JS-rendered instead of HTML-first; the page cannot deploy to GitHub Pages; or the page is hard to convert to a Django template.

---

## Constraints & Non-Negotiables *(mandatory for this spec)*

**Must continue (from Spec 001):** static HTML-first delivery to `public/`; per-language pre-rendered pages; relative asset paths; local Tailwind/PostCSS compiled CSS; native ES-module JS that **only enhances** existing markup; self-hosted fonts/icons; GitHub-Pages compatible; Django-template-ready; `data-*` behavior hooks; screenshot-based visual acceptance; Arabic RTL first + English LTR; Light/Dark/System.

**Must NOT use:** backend API; database; real auth; real permission enforcement; real CRUD persistence; CDN; TypeScript; SPA framework; chart libraries; calendar libraries; legacy widget libraries; any copied legacy assets/classes/Bootstrap/logo/palette/icons/private wording; or a JS-rendered whole-page mount.

**Must NOT include (product scope):** attendance workflow; finance/payroll/invoices/wallet; portals; student/teacher/family dashboards; live Zoom; notifications backend; report detail analytics.

---

## Anticipated Contracts *(for the later plan)*

The `/speckit.plan` step is expected to produce, at minimum:

- `admin-pages-contract.md` — shared admin page anatomy (header, breadcrumbs, sections, nav wiring, page meta).
- `sessions-page-contract.md` — sessions list, filters, table, row actions, details overlay, states.
- `schedule-page-contract.md` — weekly/day overview structure, filters, block preview (no calendar lib).
- `directory-pages-contract.md` — students + teachers directory anatomy, summary cards, preview drawers.
- `settings-page-contract.md` — settings sections, real vs demo vs disabled-with-reason controls.
- `interaction-patterns-contract.md` — filter, table, drawer, modal, confirmation, toast, no-dead-button, `data-*` hooks.
- `static-html-django-ready-contract.md` — SSG output, per-language pages, relative paths, GitHub Pages, Django mapping.
- `screenshot-acceptance.md` — the matrix + failure conditions above.
- `scope-guard.md` — the in/out scope + forbidden list above.

---

## Assumptions

- **Pages = the six placeholder nav destinations** (sessions, schedule, students, teachers, courses, settings); home/dashboard and reports are already built in Spec 001. Each ships Arabic + English (12 new `public/*.html`).
- **Reuse over reinvention**: pages compose existing Spec 001 components (table, chips, tiles, cards, drawer, modal, dropdown, toast, states, ui, sidebar, topbar) plus a small set of new page-specific pieces (directory card, schedule list, settings section). No new framework or libraries.
- **Schedule = structured list/grid**, not a calendar widget (no calendar library); a weekly/day-grouped overview is the approved-consistent, Django-friendly choice.
- **Previews over deep navigation**: student/teacher/session/course details use drawers/modals with fixture data instead of separate detail pages (which are out of scope).
- **Settings appearance controls are real** (theme/language reuse Spec 001 behavior); all other settings are demo-with-feedback or disabled-with-reason.
- **Language model** continues Spec 001: per-language pre-rendered pages with a navigating toggle; this is the canonical basis for later Django `{% trans %}`.
- **No constitution constraints yet**: the project constitution is an unfilled template; if ratified later, re-check this spec against it.
- **Fixtures are original placeholder content** mirroring the shape of the old-system entities (for realism) without copying any private wording, names, or assets.

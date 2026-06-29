# Feature Specification: Approved Academy Dashboard Visual Foundation

**Feature Branch**: `feature/001-approved-dashboard-design`
**Spec Directory**: `001-approved-dashboard-foundation`
**Created**: 2026-06-29
**Status**: Draft
**Input**: User description: "Approved Academy Dashboard Visual Foundation — restart frontend work from a clean commit as the NEW Spec 001, grounded in the approved Claude Design dashboard, old academy system as product/UX reference only."

---

## Context & Design Grounding *(mandatory for this spec)*

This specification is **grounded in inspected reference artifacts**, not invented. Before writing, the following were read and analyzed:

**Approved visual target (PRIMARY — the design this product must look like):**

- `design-references/approved-dashboard/academy-dashboard.html` — a complete, single-page approved dashboard mockup carrying a full CSS custom-property token system with **paired light/dark values**, theme switching via `[data-theme="light"|"dark"]`, and an `Tajawal` Arabic-first typeface.
- `design-references/approved-dashboard/academy-dashboard.png` — the rendered approved admin dashboard (Arabic RTL, light theme), now the **BODY/content visual target**: warm cream canvas, topbar, welcome hero, KPI cards, sessions module + table, status tiles, reports cards, and explicit empty/loading/error states. (Its original dark right sidebar is superseded as the shell by `sidebar-reference.png`.)
- `design-references/approved-dashboard/sidebar-reference.png` — **the SHELL source of truth**: a two-part navigation showing a **slim icon rail + expanded light nav panel**, a strong purple/violet active pill, a brand medallion + wordmark, and a bottom profile avatar.

**Old academy system (PRODUCT/UX REFERENCE ONLY — visuals must NOT be copied):**

- `frontend-planning-deep/14-design-system-direction-v2.md`, `16-spec-001-brief-v2.md`, `13-improved-information-architecture-v2.md` (v2 is the authoritative planning layer; v1 files `frontend-planning/09`, `11` are superseded).
- `output/combined/design-token-summary.md`, `page-inventory.md`, `table-inventory.md`, `form-inventory.md`, `modal-inventory.md`, `interaction-inventory.md`.
- `frontend-planning-deep/03-visual-patterns.md`, `03-screenshot-review.md`, and admin contact sheets under `frontend-planning-deep/contact-sheets/`.

**Repo / spec-kit structure:** spec-kit is initialized at the repository root (`branch_numbering: sequential`); `specs/` is empty, confirming this is genuinely **Spec 001**. The constitution file is still an unfilled template (no binding principles to honor yet).

### What was found (visual & product patterns)

- The approved design is a **premium, calm, colorful EduTech admin shell** with a warm cream canvas (`#FAF6EF`), white rounded cards (10–20px radii), soft warm-tinted depth, a two-part navigation shell (slim icon rail + light nav panel, per `sidebar-reference.png`), a violet/indigo primary (`#5145CD`), and a 5-accent semantic palette (teal, green, sky, amber, coral) — each with a "weak" tint and a dark-theme variant.
- Layout (RTL): right nav shell (icon rail + light panel) → topbar → compact welcome hero (violet→teal gradient) with two small stat cards → "نظرة عامة" KPI row of 4 cards with icon medallions, trend pills, large numerals, and mini sparklines/progress → "جلسات اليوم" sessions module (integrated filter/action bar + modern table) → 4 colored status summary tiles → "التقارير" reports cards (including a permission-locked disabled card) → "حالات الواجهة" loading/error/empty state demonstrations.
- The nav shell uses a **simpler 3-group navigation** (عام / الأكاديمية / الإدارة) than the old system's 40-item flat list; in the light panel the active item is a large rounded violet pill (and its rail icon a filled violet rounded square); a circular profile avatar sits at the bottom of the rail (replacing any bottom help card).

### Old-system ideas reused as PRODUCT reference only (not visuals)

- Right-side admin navigation; sticky top utility bar; KPI/status tiles that double as quick filters; an operational sessions/lessons table with status chips; a reports/analytics area; role-based dashboard concept; collapsible filter bar (date/teacher/student/duration/status).
- Old sessions table column intent (time, who, what, where, status, actions) — re-expressed cleanly, not copied.

### What MUST NOT be copied (hard constraint)

- Old logo, favicon, and brand assets (academatic.online).
- Old colors/tokens — explicitly avoid legacy purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, and the purple-tinted lift shadow.
- Bootstrap modal/offcanvas class structure, old CSS classes, old icon sets (tabler/Font Awesome), and old widget libraries (select2, flatpickr, ApexCharts, Quill, Dropzone).
- The flat 40-item ungrouped sidebar, 3–6 per-row colored action pills, unlabeled form fields, and any academy-specific/private wording.
- Pixel-for-pixel legacy layout.

### What the approved direction requires

The build must look and feel like the approved Claude Design dashboard: premium, modern, creative, comfortable, joyful-but-calm, educational, human, trustworthy, client-ready, global SaaS/EduTech quality — and must **not** look generic, empty, flat, pale, old, default-Tailwind, or like a weak admin template.

### Missing references

None. All reference files named in the request were located and inspected. No required artifact was missing; nothing was guessed in place of a missing file.

---

## Scope *(mandatory for this spec)*

### In Scope (Spec 001)

1. A frontend **scaffold/foundation** (app structure, local build pipeline, local fonts/icons/assets policy).
2. A **design-token system** derived from the approved design (color, typography, spacing, radius, shadow, motion), with light/dark/system support and RTL/LTR.
3. The **application shell**: icon rail + light nav panel (inline-start) + topbar + content region.
4. The **base UI component set** required by the dashboard (see Key Entities / FRs).
5. The **Admin Dashboard page** reproducing the approved layout with fixture (static) data.
6. A **Reports Overview page** — a real second route used to prove navigation and shell behavior (entry cards only; no report detail pages).
7. A **Component / Style Preview gallery** page proving the design system works globally and that there are no dead buttons or raw i18n keys.
8. RTL (Arabic-first) and LTR (English) support; Light / Dark / System themes.
9. Accessibility, screenshot-based visual acceptance, no-dead-button and no-raw-i18n-key guarantees, and responsive desktop/tablet/mobile behavior.

### Out of Scope (Spec 001)

Real backend API; real authentication; real permission system; students / families / teachers / courses modules; sessions lifecycle beyond fixture/static display; attendance; finance / payroll / invoices; report detail pages; teacher portal; family/student portal; chart libraries; external CDN; TypeScript; SPA framework; and any copied legacy assets, classes, logo, icons, or private wording.

This spec delivers **only the dashboard foundation and visual system.**

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin first impression (Priority: P1)

As an academy administrator, when I open the dashboard for the first time, it looks premium, modern, and client-ready — visibly matching the approved design — so I immediately trust the product.

**Why this priority**: First impression is the core purpose of this spec. If the dashboard does not look like the approved design on first load, the foundation has failed regardless of any passing test.

**Independent Test**: Load the Admin Dashboard in Arabic RTL light theme and visually compare the screenshot to `academy-dashboard.png`. It can be judged independently and delivers the foundational "premium look" value on its own.

**Acceptance Scenarios**:

1. **Given** the Admin Dashboard is opened in Arabic RTL light theme, **When** it finishes loading, **Then** it shows the warm cream canvas, icon rail + light nav panel, topbar, welcome hero, KPI cards, sessions module, status tiles, and reports cards in the approved arrangement.
2. **Given** a reviewer compares the rendered screenshot to the approved reference, **When** they assess premium-ness, **Then** the result reads as "global SaaS/EduTech quality" and does **not** read as generic/flat/pale/default-Tailwind.
3. **Given** the dashboard is rendered, **When** the reviewer inspects color, depth, rounding, and spacing, **Then** they match the approved token system (warm canvas, violet primary, soft depth, rounded cards, icon medallions).

---

### User Story 2 - Real product shell (Priority: P1)

As an administrator, I navigate via a sidebar and topbar that feel like a real SaaS product shell — not a weak template — so the system feels trustworthy and complete.

**Why this priority**: The shell is reused by every future page and module. A weak shell undermines all later specs. The user designated the sidebar as "critical."

**Independent Test**: Operate the shell (collapse the sidebar to its slim icon rail and back, open the profile/notification/language/theme controls, navigate between Dashboard and Reports) and confirm it behaves and looks like a polished product shell.

**Acceptance Scenarios**:

1. **Given** the nav shell, **When** it renders, **Then** it shows a slim icon rail (hamburger collapse control at top, icon-only items with a filled-violet active rounded square, a circular profile avatar pinned at the bottom) beside a light nav panel (brand medallion + wordmark at top, a small section label, grouped navigation عام / الأكاديمية / الإدارة, a large rounded violet active pill, clear icons, readable labels, comfortable spacing) — and no bottom help/support card.
2. **Given** the nav shell, **When** the admin collapses it (`data-rail="true"`), **Then** the light nav panel hides and only the slim icon rail remains (per `sidebar-reference.png`), and expanding restores the panel without layout breakage.
3. **Given** the topbar, **When** it renders, **Then** search, profile, notifications, language, and theme controls are organized and grouped — never a row of random tiny buttons.
4. **Given** the admin clicks a navigation item, **When** the route changes, **Then** the active pill moves and the content region updates without a full visual reset of the shell.

---

### User Story 3 - Operational scanning (Priority: P1)

As an administrator, I can quickly scan academy activity — today's sessions, attendance, pending items, and reports — at a glance, so I understand the day's state in seconds.

**Why this priority**: The dashboard's product job is rapid operational awareness. KPI cards, status tiles, and the sessions module exist to make the academy "readable at a glance."

**Independent Test**: Show the dashboard with fixture data and confirm a reviewer can state today's session count, live count, attendance %, and pending/cancelled counts within seconds, purely from the visuals.

**Acceptance Scenarios**:

1. **Given** the KPI row, **When** it renders, **Then** each card shows a soft colored surface, an icon medallion, a large readable number, a supporting label, a trend indicator, and a mini sparkline/progress visual.
2. **Given** the status summary, **When** it renders, **Then** it shows compact colored tiles (cancelled / upcoming / live now / completed) each with a count, status icon, and label — never gray flat pills.
3. **Given** the welcome hero, **When** it renders, **Then** it presents a greeting, the current date/context, an at-a-glance summary, primary/secondary action buttons, and a small educational motif — and remains compact (not a giant empty hero).

---

### User Story 4 - Sessions workflow preview (Priority: P2)

As an administrator, I can view a static/fixture sessions table with an integrated filter/action bar, so the operational workflow is visible as a product foundation even before real data exists.

**Why this priority**: The sessions table is the highest-value recurring surface and the template for all future tables. It must be proven now, but only as a fixture (no lifecycle).

**Independent Test**: Render the sessions module with fixture rows and confirm the filter/action bar, table columns, status chips, row actions, and pagination read as a modern product table — not a spreadsheet.

**Acceptance Scenarios**:

1. **Given** the sessions module, **When** it renders, **Then** it has a header (title + count + last-updated context), an integrated bar with a primary "new session" action, an active-filter chip, and search/subject/date/time controls plus an apply action.
2. **Given** the sessions table, **When** it renders, **Then** it shows readable rows with teacher avatar+name, session title+level, room, students count, a clear status chip (live / upcoming / completed / cancelled), time+duration, and a per-row actions menu — not a row of colored pill buttons.
3. **Given** more rows than one page, **When** the table renders, **Then** pagination and a "showing X of N" summary appear and read clearly in RTL.
4. **Given** the table is judged visually, **When** reviewed, **Then** it does not look like a bare spreadsheet (it has depth, spacing, status color, and clear hierarchy).

---

### User Story 5 - Reports overview (Priority: P2)

As an administrator, I see report entry cards that feel like real product areas — including a permission-locked card with a clear reason — even though report details are not implemented.

**Why this priority**: Reports communicate that the product is "deep" and real, and the disabled-with-reason pattern is a reusable foundation behavior.

**Independent Test**: Render the reports area on the dashboard and the Reports Overview page and confirm the cards read as real product entries, with one card showing a disabled "permission required" state and reason.

**Acceptance Scenarios**:

1. **Given** the reports area, **When** it renders, **Then** each report card shows an icon medallion, a clear title and description, and a navigation affordance — and does not look like an empty placeholder.
2. **Given** a report requires a permission the current (fixture) user lacks, **When** its card renders, **Then** it appears in a disabled state with a visible "permission required" reason, and its action is not clickable.
3. **Given** the admin opens the Reports Overview page, **When** it renders, **Then** it reuses the shell and presents the report entry cards as a real second route (no detail pages).

---

### User Story 6 - Design system proof (Priority: P2)

As a developer or reviewer, I can open a component/style preview gallery that proves the approved design direction works globally across every base component and both themes/directions.

**Why this priority**: The gallery is the guarantee that the design system is real and reusable, and the place where no-dead-button and no-raw-i18n-key rules are verified.

**Independent Test**: Open the gallery and confirm every base component renders correctly in RTL/LTR and light/dark, with no dead buttons and no raw i18n keys.

**Acceptance Scenarios**:

1. **Given** the gallery, **When** it renders, **Then** it displays every base component (buttons, form fields, selects, chips/badges, KPI card, status tile, table, modal/drawer, dropdown/menu, tabs, toast, avatar, empty/loading/error states) using the design tokens.
2. **Given** any interactive element in the build, **When** it is inspected, **Then** it either performs a visible action or is intentionally disabled with a reason — there are **no dead buttons**.
3. **Given** any visible text, **When** inspected, **Then** it resolves to localized copy — there are **no raw i18n keys** (e.g., `messages.Materials`) shown to the user.

---

### User Story 7 - Accessibility, bilingual & theme quality (Priority: P1)

As any user, the foundation remains strong across Arabic RTL, English LTR, Light/Dark/System, keyboard operation, automated accessibility checks, and responsive breakpoints.

**Why this priority**: These are cross-cutting quality gates that every future spec inherits; regressions here are expensive and compound.

**Independent Test**: Run keyboard-only navigation, an automated accessibility scan, and responsive checks across the dashboard, reports page, and gallery in both directions and all three theme modes.

**Acceptance Scenarios**:

1. **Given** Arabic RTL, **When** the app renders, **Then** layout, sidebar side, chevrons, and table column order mirror correctly, while numbers, times, and currency are not mirrored.
2. **Given** English LTR, **When** the app renders, **Then** the same screens render correctly mirrored to LTR with no broken spacing.
3. **Given** Light, Dark, and System theme modes, **When** each is selected, **Then** every surface and component is legible with appropriate contrast (dark mode uses true dark surfaces, not pure black), and System follows the OS preference.
4. **Given** keyboard-only operation, **When** the admin tabs through the shell and dashboard, **Then** focus order is logical, focus is visible, and all controls are reachable and operable.
5. **Given** an automated accessibility scan, **When** run on each page, **Then** no critical violations are reported.
6. **Given** mobile, tablet, and desktop widths, **When** each renders, **Then** the layout adapts (sidebar collapses/becomes a drawer on small screens; cards reflow; the table scrolls or stacks) without overflow or broken UI.

---

### Edge Cases

- **Empty data**: The sessions module and dashboard show a warm, human empty state ("no sessions yet") with a clear next-step CTA — never a blank region.
- **Loading**: While data would load, a skeleton/shimmer placeholder appears (matching the approved "حالات الواجهة" loading card), not a bare "Loading…" string.
- **Error**: A connection/load failure shows a friendly error state with a cause and a retry action (matching the approved error card), not a stack trace or raw 500.
- **Disabled-with-reason**: A control the fixture user is not permitted to use is visibly disabled and states why; it is never silently dead.
- **Long content**: Long Arabic/English session titles, teacher names, and numbers truncate or wrap gracefully without breaking card or row layout in either direction.
- **Theme switch mid-session**: Switching Light↔Dark↔System re-themes all surfaces instantly with no flash of unstyled or mismatched colors.
- **Direction switch**: Switching Arabic↔English re-mirrors the entire shell and content without layout breakage or clipped controls.
- **Mixed bidi content**: A Latin name or number inside Arabic text (and vice versa) stays correctly isolated and readable.

---

## Requirements *(mandatory)*

### Functional Requirements — Design Foundation & Tokens

- **FR-001**: The system MUST define a single source-of-truth design-token set derived from the approved design, covering color, typography, spacing, radius, shadow/elevation, and motion, with every component consuming tokens (no hard-coded colors or directions).
- **FR-002**: The color tokens MUST reproduce the approved palette: warm cream canvas, white card surfaces, a violet/indigo primary, and a 5-accent semantic set (teal, green/success, sky/info, amber/warning, coral/danger), each with a "weak" tint, plus navigation-shell tokens (light nav panel + icon rail) and AA-contrast primary-button fill tokens. (Reference values in Appendix A.)
- **FR-003**: The system MUST provide Light, Dark, and System theme modes; Dark MUST use true dark (not pure black) surfaces; System MUST follow the operating-system preference; and every component MUST be legible in all three.
- **FR-004**: The system MUST support Arabic RTL as the first-class default direction and English LTR as a supported direction, mirroring layout, navigation side, and directional icons while never mirroring numbers, times, or currency.
- **FR-005**: Typography MUST use a single self-hosted Arabic-first + Latin UI typeface matching the approved design's character (the approved reference uses **Tajawal**), with a defined type scale, tabular numerals for KPI/table numbers, and weights that remain legible in Arabic (avoid hairline weights).
- **FR-006**: Status meaning MUST be conveyed by a consistent, themeable status vocabulary mapping each status to a color + icon + label, and MUST never be communicated by color alone.

### Functional Requirements — Application Shell & Sidebar

- **FR-007**: The system MUST provide an application shell composed of an icon rail + light nav panel (inline-start; right in RTL), a topbar, and a content region, reused across all pages in this spec. The outer `<aside class="sidebar">` is a transparent flex-row wrapper holding the rail + panel.
- **FR-008**: The nav shell MUST be a **two-part navigation**: (a) a slim **icon rail** (`.nav-rail`) pinned to the inline-start screen edge — a hamburger collapse control (`data-action="toggle-rail"`) at the top, a vertical stack of icon-only links (`.rail-item`) whose active item shows its icon inside a **filled violet rounded square**, and a circular profile avatar (`.rail-foot`, `data-action="profile-menu"`) pinned at the bottom; and (b) an expanded **light nav panel** (`.nav-panel`, `id="nav-panel"`) beside the rail — a brand medallion (teal/violet gradient) + wordmark at the top, a small section label (`.nav-section-label`), grouped navigation, and a **large rounded violet active pill** (`.nav-item.is-active`, white text + white icon) on the current item with dark-ink inactive items. This REPLACES the previous single dark sidebar; there is **no** bottom help/support card.
- **FR-009**: The sidebar MUST be data-driven from a navigation configuration (groups → items with label, icon, optional badge/count, route) so future role apps can supply their own navigation.
- **FR-010**: The nav shell MUST support a collapsed state (`data-rail="true"`) that **hides the light nav panel and keeps the slim icon rail**, and an expanded state showing both (per `sidebar-reference.png`), toggling without layout breakage; on small screens it MUST become an off-canvas drawer that shows the panel full-width (rail hidden).
- **FR-011**: The sidebar MUST NOT be a weak plain list; it MUST read as a real SaaS product shell.

### Functional Requirements — Topbar

- **FR-012**: The topbar MUST present an organized set of utilities: a global search field, a profile/account control, a notifications control, a language switcher, and a theme switcher — grouped logically, never a row of random tiny buttons.
- **FR-013**: The topbar MUST show page/breadcrumb context and remain sticky/visible while the content region scrolls.
- **FR-014**: The language and theme switchers MUST visibly change direction and theme respectively when used, with the change reflected across the whole shell.

### Functional Requirements — Dashboard Content Zones

- **FR-015**: The dashboard MUST include a **compact welcome zone** with a greeting, current date/context, an at-a-glance summary line, primary and secondary action buttons, and a small educational motif — and MUST NOT be a giant empty hero.
- **FR-016**: The dashboard MUST include a **KPI/stat card row** where each card has a soft colored surface, an icon medallion, a large readable number, a supporting label, a trend indicator, and a mini sparkline/progress visual implemented without any chart library.
- **FR-017**: The dashboard MUST include a **sessions module** with an integrated action/filter bar (primary "new session" action, active-filter chip, search, subject, date, and time controls plus an apply action) and a modern sessions table.
- **FR-018**: The sessions table MUST display readable rows with: time + duration, session title + level, teacher (avatar + name), room, students count, a clear status chip, and a per-row actions menu; it MUST provide pagination and a "showing X of N" summary; and it MUST NOT look like a bare spreadsheet or use a row of colored pill buttons.
- **FR-019**: The dashboard MUST include a **status summary** of compact colored tiles (e.g., cancelled / upcoming / live now / completed), each with a count, status icon, and label — never gray flat pills.
- **FR-020**: The dashboard MUST include a **reports area** of report entry cards, each with an icon medallion, clear title and description, and a navigation affordance; at least one card MUST demonstrate a disabled "permission required" state with a visible reason; cards MUST NOT look like placeholders.
- **FR-021**: The dashboard MUST demonstrate **empty, loading, and error** interface states with warm, helpful, human microcopy and a clear next step (CTA or retry), matching the approved "حالات الواجهة" patterns.

### Functional Requirements — Base Components

- **FR-022**: The system MUST provide the base UI components the dashboard depends on: button, form field (always labeled), select, status chip/badge, KPI card, status tile, data table (with row-action menu, pagination, sticky header), avatar (always with a fallback), modal, drawer, dropdown/menu, tabs, toast/notification, and empty/loading/error state components.
- **FR-023**: Every form field MUST have an associated visible label (correcting the legacy pattern of unlabeled fields).
- **FR-024**: Every avatar MUST render a graceful fallback (initials/placeholder) when no image is available.

### Functional Requirements — Secondary Pages

- **FR-025**: The system MUST include a **Reports Overview page** as a real second route that reuses the shell and presents report entry cards (no report detail pages).
- **FR-026**: The system MUST include a **Component / Style Preview gallery** page that renders every base component in both directions and all theme modes as proof of the design system.

### Functional Requirements — Quality Gates (cross-cutting)

- **FR-027**: There MUST be **no dead buttons**: every interactive control either performs a visible action or is intentionally disabled with a stated reason.
- **FR-028**: There MUST be **no raw i18n keys** visible to the user; all visible text MUST resolve to localized Arabic or English copy.
- **FR-029**: All pages MUST be operable by keyboard alone, with logical focus order and a visible focus indicator, and MUST meet recognized accessibility contrast and labeling expectations (target WCAG AA), verified by an automated accessibility scan with no critical violations.
- **FR-030**: All pages MUST be responsive across mobile, tablet, and desktop widths without overflow or broken layout, adapting the sidebar (drawer on mobile), cards (reflow), and table (scroll/stack).
- **FR-031**: The build MUST be acceptance-reviewed by **screenshots** that visibly match the approved design direction (see Visual Acceptance), in addition to any automated checks.

### Functional Requirements — Fixture Data

- **FR-032**: All displayed data (KPIs, sessions, statuses, reports, user/profile) MUST come from local static fixtures; the system MUST NOT call a real backend, perform real authentication, or enforce a real permission system in this spec.
- **FR-033**: Fixture content MUST be original placeholder content and MUST NOT reuse any private/academy-specific legacy wording, names, or brand assets.

### Key Entities *(display fixtures only — no persistence, no API)*

- **Navigation Item**: A sidebar entry — group, label (localized), icon, optional badge/count, target route, active state.
- **KPI / Stat**: A headline metric — label, large value, unit, trend direction/percentage, accent color, and a mini visual (sparkline/progress).
- **Session (fixture)**: A scheduled class row — time, duration, title, level, teacher (name + avatar), room, students count/capacity, and status.
- **Session Status**: A status value mapped to color + icon + localized label (e.g., live now, upcoming, completed, cancelled).
- **Status Summary Tile**: An aggregate count per status — count, status, icon, accent color, label.
- **Report Entry**: A report area card — title, description, icon, accent, navigation target, and an optional disabled/permission-required reason.
- **User / Profile (fixture)**: The displayed admin identity — name, role label, avatar, and (fixture) permission flags used only to demonstrate disabled-with-reason.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a side-by-side review of the Admin Dashboard (Arabic RTL, light) against the approved reference, an independent reviewer confirms it visibly matches the approved direction (warm canvas, icon rail + light nav panel, KPI cards, sessions table, status tiles, reports cards) on **first load with zero interaction**.
- **SC-002**: A reviewer unfamiliar with the project, shown the dashboard for 10 seconds, can correctly state today's session count, the live-now count, the attendance figure, and the number of pending/cancelled sessions — confirming at-a-glance scannability.
- **SC-003**: 100% of the required screenshot matrix (Visual Acceptance below) is captured and judged to match the approved direction; **zero** screenshots trigger a stated failure condition.
- **SC-004**: 100% of interactive controls are either functional or disabled-with-reason (no dead buttons), and **zero** raw i18n keys appear in any captured screenshot or page.
- **SC-005**: Every page renders correctly in all 6 combinations of {Arabic RTL, English LTR} × {Light, Dark, System}, with no layout breakage and legible contrast in each.
- **SC-006**: Automated accessibility scans report **zero critical violations** on the dashboard, reports page, and gallery, and the full shell + dashboard is operable by keyboard alone.
- **SC-007**: Every page renders without horizontal overflow or broken layout at representative mobile, tablet, and desktop widths.
- **SC-008**: A reviewer confirms the result does **not** read as generic / empty / flat / pale / old / default-Tailwind / weak-template — i.e., none of the qualitative failure conditions are met.

---

## Visual Acceptance *(mandatory for this spec)*

Automated tests alone are insufficient. Final acceptance REQUIRES a screenshot review that visibly matches the approved Claude Design direction. The required screenshot matrix is:

1. Admin Dashboard — **Arabic RTL, Light**
2. Admin Dashboard — **Arabic RTL, Dark**
3. Admin Dashboard — **English LTR, Light**
4. Reports Overview page — **Arabic RTL, Light**
5. Component / Style Preview gallery — **Arabic RTL, Light** (and a Dark capture)
6. Responsive — Admin Dashboard at **mobile** and **tablet** widths (Arabic RTL)

**A screenshot review FAILS if any of the following are true:**

- It looks like a generic Tailwind admin template.
- The nav shell (icon rail + light panel) is weak or a plain list.
- The dashboard is empty, flat, or pale.
- The topbar icons feel random or ungrouped.
- The KPI cards look basic (no medallion / no depth / no visual indicator).
- The sessions table looks like a bare spreadsheet.
- The reports cards look like placeholders.
- The design does not resemble the approved design direction.
- It only passes automated tests but looks bad.
- It ignored the available reference files and guessed.

---

## Constraints & Non-Negotiables *(mandatory for this spec)*

These constraints are explicit product/delivery requirements for this foundation (the delivery medium is part of acceptance), captured here rather than in the outcome-focused Functional Requirements:

**Must use (future implementation):**

- Local build pipeline with Tailwind/PostCSS compiled locally (no external CDN for any asset).
- Native JavaScript only (plain HTML/CSS/JS).
- Arabic RTL first, English LTR supported.
- Light / Dark / System theme support.
- Locally hosted fonts, icons, and assets only.
- Screenshot-based visual acceptance.

**Must NOT use:**

- External CDN; TypeScript; any SPA framework; any chart library; real API; real authentication; real permission system.
- Any copied legacy assets, CSS classes, Bootstrap structure, old logo/icons, old color tokens, or private academy wording.

**Must NOT copy from the old system** (product/UX reference only): legacy palette (esp. purple `rgb(94,77,126)`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`), purple-tinted lift shadow, Bootstrap modals/offcanvas, 40-item flat sidebar, per-row colored action pills, unlabeled form fields, legacy widget libraries, and any academy-specific wording or brand assets.

---

## Assumptions

- **Default direction/language**: Arabic RTL is the default on first load; English LTR is available via the language switcher. (Arabic-first is an explicit constraint.)
- **Secondary pages included**: A Reports Overview page and a Component/Style Preview gallery are included because the user stories for "reports overview" and "design system proof" require them and they best prove the shell; no other business pages are added.
- **Reference font**: The approved design uses **Tajawal**; this spec assumes Tajawal (or a closely equivalent open Arabic+Latin UI typeface) is self-hosted locally. The exact font choice is confirmable at planning.
- **Fixture-only data**: All numbers, sessions, reports, and the profile are static fixtures chosen to mirror the approved mockup's content shape; they imply no real data model or API contract.
- **Permission demonstration only**: The single disabled "permission required" report card demonstrates the disabled-with-reason pattern using a fixture flag; no real permission system exists in this spec.
- **No constitution constraints yet**: The project constitution is an unfilled template, so this spec introduces no conflicts with ratified principles; if a constitution is later ratified, this spec should be re-checked against it.
- **Token reference values** in Appendix A are taken directly from the approved design HTML and are authoritative for the visual foundation; they are reference values for grounding, not an implementation mandate on file structure.

---

## Appendix A — Design Token Reference (extracted from the approved design)

These values were read directly from `design-references/approved-dashboard/academy-dashboard.html` and define the visual foundation. Theme is switched via a `[data-theme]` attribute (light / dark).

**Light theme**

- Canvas: `#FAF6EF` · Canvas-2: `#F1EADC` · Surface (cards): `#FFFFFF` · Surface-2: `#F7F1E7`
- Ink (text): `#211D33` · Ink-2: `#544F66` · Ink-3: `#7C7790` · Lines: `#E7DECF` / `#F1EADD`
- Primary (violet): `#5145CD` · Primary-2: `#6E63E0` · Primary-weak: `#EAE7FB`
- Nav shell (per `sidebar-reference.png`): Nav panel `--c-nav-panel` `#FFFFFF` · Nav rail `--c-nav-rail` warm `#F1EADC` · plus `--c-nav-line` / `--c-nav-ink` / `--c-nav-ink-muted` / `--c-nav-hover` (derived from the warm-canvas inks); the active nav pill (panel) + active icon square (rail) use the `--g-violet` gradient. Primary-button fill: `--c-primary-btn` (`#5145CD`) / `--c-primary-btn-hover` (`#6E63E0`) — AA-contrast white text. Legacy `--c-sidebar-2` / `--c-sb-*` are now mostly unused; `--c-sidebar` (`#1F1B38`) is reused only as the dark rail value.
- Accents: teal `#0E8C7E` (weak `#D3EEEA`) · success `#1B8E59` (weak `#D2ECDC`) · sky `#2774BC` (weak `#D6E6F6`) · amber `#C9781F` (weak `#F7E5C9`) · coral `#D7503A` (weak `#F8DAD2`)

**Dark theme**

- Canvas: `#141220` · Canvas-2: `#1B1828` · Surface: `#221F31` · Surface-2: `#2A2640`
- Ink: `#F3F0FB` · Ink-2: `#C2BDD4` · Ink-3: `#928CA8` · Lines: `#363046` / `#2A2639`
- Primary: `#9486F4` · Primary-2: `#B0A4FA` · Nav panel `--c-nav-panel`: `#221F31` · Nav rail `--c-nav-rail`: `#0E0C18` (deepest plane) · Primary-button fill `--c-primary-btn` / `--c-primary-btn-hover` (AA white text — the bright `#9486F4` primary failed 4.5:1 as a button fill).
- Accents (brighter): teal `#34C9B6` · success `#3FBE7E` · sky `#62A6E6` · amber `#EAA94F` · coral `#F2876F`

**Shape, depth & motion**

- Radii: pills `999px`; large cards `20px`; cards `10–13px`; small `6px`; avatars `50%`.
- Shadows (warm-tinted in light): xs `0 1px 2px rgba(40,33,60,.07)` · sm `0 5px 18px rgba(40,33,60,.08)` · md `0 16px 40px rgba(40,33,60,.11)` · lg `0 30px 66px rgba(40,33,60,.17)`.
- Hero/medallion gradients: hero `linear-gradient(135deg,#3C32A6,#5145CD,#0E8C7E)`; medallions use 150° two-color gradients (violet→teal, teal→sky, violet→sky, amber→coral).
- Easing: `cubic-bezier(.22,1,.36,1)`.
- Typography: `Tajawal`, system-ui fallback; UI sizes ~12.5–15px; KPI display ~34–36px; tight letter-spacing on headings.

*(Dark-theme accent values use the alternate variant; the new build must not reuse legacy old-system tokens listed under Constraints.)*

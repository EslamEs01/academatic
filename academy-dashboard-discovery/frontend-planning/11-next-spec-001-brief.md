<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **16-spec-001-brief-v2.md**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 11 — Brief for Spec 001 (Foundation + Design System + App Shell)

> A **review brief**, not a spec. Nothing here has been built and no spec‑kit command has been run. Once you approve/adjust this, we turn it into the actual `/speckit.specify` input for Spec 001. Keep it small and foundational — it unblocks every later spec.

## Title
Frontend Foundation, Design System & App Shell

## One‑line goal
Stand up the project scaffold, an **original** themeable design system (light/dark, Arabic‑first RTL + LTR), and the reusable app‑shell + base component library — with **no business pages** yet.

## Why this is first
Every later spec (admin modules, teacher/family portals, settings) consumes these tokens, primitives, and the shell. Building it once, correctly (accessible, RTL‑ready, dark‑ready, no CDN), prevents rework across all 11 later specs.

## In scope
1. **Project scaffold**
   - HTML + **Tailwind compiled locally (no CDN)** + **native JS modules** (no SPA framework).
   - Build tooling (Tailwind build, asset pipeline, dev server), folder structure, linting/formatting, a component/style **gallery page** for internal review.
2. **Design system (original)**
   - Token layer as CSS variables + Tailwind theme: color (semantic + brand‑able), typography scale, spacing (4px base), radii, shadows, z‑index, breakpoints.
   - **Light / Dark / System** theming via `data-theme` + variables.
   - **Arabic‑first RTL + LTR** via logical properties + `dir` switching; bidi‑safe mixed content.
   - The **status‑color map** (11 session statuses + account/invoice/payout) as a single themeable source.
   - Original palette + type choice (incl. an Arabic‑capable font) — decided in this spec, distinct from legacy.
3. **App‑shell primitives**
   - AppShell (sidebar + topbar + content + optional right drawer; boxed/full container; collapsible sidebar).
   - Sidebar (data‑driven from a nav config; grouped; collapsible/icon‑rail; pinned ShortcutsWidget).
   - Topbar (GlobalSearch field, notification bell, LanguageSwitcher, ThemeSwitcher, profile menu, logout).
   - Breadcrumbs, PageHeader (title + actions slot + optional status).
4. **Base component library**
   - Button (primary/secondary/ghost/danger/icon/link + loading), FormField (+ validation/help/required/disabled), Select, MultiSelect/TokenInput (basic), Modal, Drawer, Dropdown/Menu, Tabs, Accordion, Toast + ConfirmService, StatusChip/Badge, KpiCard, DataTable (base: columns, sort, empty/loading), Pagination, Avatar (with fallback), and the system states EmptyState / LoadingSkeleton / ErrorState.

## Out of scope (explicitly NOT in Spec 001)
- Any business page or module (dashboards, people, finance, etc.).
- Real data, API integration, or auth/permission logic (only a guard *scaffold* interface — no real rules).
- Charts, the weekly calendar, certificate canvas, chat/realtime, file upload, rich‑text — these arrive with their owning specs.
- Final content/wording for product pages.

## Components delivered
See "Base component library" + "App‑shell primitives" above. Each must work in **light+dark** and **LTR+RTL**, be keyboard‑accessible, and appear in the gallery with all states.

## Interactions delivered
Theme toggle, locale + RTL switch, sidebar collapse/expand, modal/drawer/dropdown/tab/accordion open‑close (focus trap, Esc, ARIA), toast + promise‑based confirm, responsive shell reflow, pinned‑shortcut add/remove.

## Acceptance criteria
- [ ] Tailwind builds locally with **no CDN**; native‑JS module structure in place; gallery page runs.
- [ ] Design tokens centralised; **zero hard‑coded colors/directions** in components.
- [ ] Shell + all base components render correctly in **light and dark** and **LTR and RTL** (Arabic verified).
- [ ] All interactive components are **keyboard accessible** with visible focus, correct ARIA roles, and **WCAG AA** contrast.
- [ ] Sidebar is driven by a single nav‑config object (proves the three role apps can each supply their own).
- [ ] Status‑color map is the single source for StatusChip and is themeable.
- [ ] **No dead buttons** in the gallery; every control has a defined behavior or is clearly a stub.
- [ ] Responsive: shell adapts mobile→wide (sidebar→off‑canvas/icon‑rail).
- [ ] Brief design doc records the chosen palette/type/tokens (original, not legacy).

## Dependencies
None (this is the root spec).

## Open questions to resolve before/while writing Spec 001
- Final **product name + logo + brand palette** (original) — needed to pick `--primary`/`--secondary`. (See [12](12-open-decisions.md).)
- **Default language**: Arabic‑first confirmed? (drives default `dir` and font priority).
- **Font choice** for Arabic + Latin coverage.
- Confirm **no SPA framework** (native JS only) — affects how we structure routing/state primitives in the shell.
- Confirm we want a shared component library consumed by three separate role apps (vs one app).

## Reviewer action
Approve or adjust scope/criteria above. On approval, this becomes the `/speckit.specify` input for Spec 001 — **we will not run any spec‑kit command until you say go.**

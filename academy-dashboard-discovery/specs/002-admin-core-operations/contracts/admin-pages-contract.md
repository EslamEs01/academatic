# Contract: Admin Pages (shared anatomy)

**Status**: Binding · Applies to all six Spec 002 pages. Every page is a static, pre-rendered HTML file in `public/` that reuses the Spec 001 shell and looks like it belongs to the approved dashboard.

## AP1. Page anatomy (top → bottom, RTL)

1. **Shell** — the exact Spec 001 shell: a slim **category icon rail** (six category tabs) + a **light category panel** that shows only the selected category's links, with a large violet active pill (and a bottom rail avatar) marking the active route, + organized topbar (title, breadcrumb, search, apps-grid launcher, notifications/theme/language/profile) + content region. No drift from Spec 001.
2. **Page header** (`page-header`): page title (large), breadcrumb (`الرئيسية · <page>`), optional subtitle/context, an optional row of **quick summary tiles/cards**, and a primary action area (inline-end). Reused on every page.
3. **Page body**: the page-specific content (filter bar + table/cards/list), built from the shared patterns in `interaction-patterns-contract.md`.
4. **States**: each data region can render empty / loading / error using the Spec 001 `states` components.

## AP2. Shell & navigation

> **Authoritative nav source**: `navigation-ia-contract.md` is the AUTHORITATIVE source for the full nav IA — the **category-rail model** (six rail categories and their ~48 items), each item's `status` (implemented/planned/disabled/future-role/hidden), the **category-switching** behavior, and the **no-dead-link** rule. This contract defers to it for anything nav-related.

- The nav is a **two-level category rail** data-driven from `nav.config.js` (`NAV_CATEGORIES`): the slim rail is a **tablist of six category tabs** (control / families / teachers / reports / admin / settings), and the expanded light panel shows **ONLY the selected category's links** — never all categories at once. The eight implemented items route to real `.html` pages (incl. `teachers.html` and `courses.html`); the current page's item shows the large violet active pill + `aria-current="page"` inside its own category panel.
- Each category panel renders that category's items by `status`: implemented as `<a href>` (active pill), **planned** items as a muted amber «قريبًا/Soon» `<button>` (no route → no dead link, fires a coming-soon toast), and **disabled** items (the Finance-gated rows) as a locked, disabled-with-reason `<button>` (title/aria-label, reason toast). `future-role`/`hidden` items are never rendered. Clicking a rail category **swaps the panel** (no navigation); the route's category opens on load (`categoryOf`).
- The topbar adds (without overloading) an **apps-grid «▦» launcher** (`data-action="apps-grid"` — a quick grid of the eight implemented pages), a **Quick-Actions «+» menu**, and a **⌘K command popover** (`data-action="command-palette"`, plus a global Ctrl/⌘+K listener), alongside notifications, theme/language switches, and a profile chip menu (Profile/Settings/Help/Log-out). See `navigation-ia-contract.md` for the topbar anatomy.
- The topbar is identical in structure across all pages; breadcrumb + title come from the page's `titleKey`/`crumbKey`.
- Each page is generated in Arabic (`<page>.html`) and English (`<page>.en.html`); the language toggle navigates between them, theme persists.

## AP3. Visual continuity (must match Spec 001)

Warm cream canvas; a slim icon rail + light nav panel with a large violet active pill + bottom rail avatar; violet primary; soft rounded cards; warm soft shadows; icon medallions; Arabic-first Tajawal typography; comfortable spacing; calm EduTech SaaS quality; quality dark mode; responsive. Pages MUST NOT read as generic admin, raw data dumps, spreadsheet-only, flat/pale/empty, cluttered, or disconnected from the dashboard.

## AP4. Page meta (build-time)

Each page registers in the SSG `PAGES` list as `{ base, activeId, titleKey, crumbKey, render }`. `render()` returns the page body HTML from fixtures. The generator wraps it with `shellMarkup(...)` and writes both language files. (See `static-html-django-ready-contract.md`.)

## AP5. Per-page deliverable checklist (each of the six)

For each page the implementation MUST define: purpose · layout structure · Spec-001 components reused · new components · fixture shape · empty/loading/error states · demo interactions · disabled-with-reason actions · screenshot acceptance · Django-template mapping notes. (Per-page specifics in the individual page contracts.)

## AP6. Quality (every page)

No dead buttons; no raw i18n keys; keyboard-operable with visible focus; axe critical = 0; responsive (sidebar→drawer, tables scroll/stack); no external requests; relative asset paths; screenshot review vs Spec 001 passes.

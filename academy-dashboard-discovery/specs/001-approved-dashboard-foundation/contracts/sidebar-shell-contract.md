# Contract: App Shell — Sidebar & Topbar

**Status**: Binding · Reused by every page in Spec 001 and by future role apps.

The shell = **two-level category sidebar (category icon rail + light category panel)** + **topbar** + **content region**. It must read as a real SaaS product shell, never a weak template. Per `sidebar-reference.png` (the SHELL source of truth) the sidebar is a slim **category icon rail** pinned to the inline-start screen edge beside an expanded **light category panel** — not a single dark column, and **not** an all-groups-at-once list. The rail is a **tablist of category tabs**; selecting a category swaps the expanded panel to show **ONLY that category's links**.

> **Authoritative nav source**: the category model, the six categories, their items + statuses, and the no-dead-link rule are defined in Spec 002's `navigation-ia-contract.md` (binding, kept in lockstep with `nav.config.js` / `sidebar.js` / `enhance.js`). This contract describes the **shell shape**; defer to it for the item IA.

## S1. Sidebar — structure

The outer `<aside class="sidebar">` is a **transparent flex-row wrapper** holding two parts pinned to the inline-start screen edge (RIGHT in RTL, LEFT in LTR): a slim **category icon rail** and, beside it, an expanded **light category panel**.

**Category icon rail** (`.nav-rail`), top → bottom:

1. A hamburger **collapse button** (`.rail-toggle`, `data-action="toggle-rail"`, `aria-controls="nav-panel"`) at the top.
2. A vertical **category tablist** (`.rail-cats`, `role="tablist"`, `aria-orientation="vertical"`, `data-nav-rail`) of **one icon-only tab per CATEGORY** (`.rail-cat`, `role="tab"`, `data-nav-category="<catId>"`, `id="railcat-<catId>"`, `aria-controls="catpanel-<catId>"`, `aria-selected`, roving `tabindex`). The SELECTED category's icon sits inside a **filled violet rounded square** (`--g-violet`). The six tabs, in order, are the `NAV_CATEGORIES`: **control** (لوحة التحكم / Control panel, icon `layers`), **families** (العائلات / Families, icon `families`), **teachers** (المعلمون / Teachers, icon `trainers`), **reports** (التقارير / Reports, icon `reports`), **admin** (الإدارة / Administration, icon `grid`), **settings** (الإعدادات / Settings, icon `settings`).
3. A circular profile **avatar** (`.rail-foot`, `data-action="profile-menu"`) pinned at the BOTTOM. This replaces the old help/support card.

**Light category panel** (`.nav-panel`, `id="nav-panel"`), top → bottom:

1. **Brand mark**: a teal/violet gradient medallion + wordmark. Original mark only — no legacy logo.
2. **Six category panels** (`.cat-panel`, `role="tabpanel"`, `id="catpanel-<catId>"`, `data-nav-panel="<catId>"`, `aria-labelledby="railcat-<catId>"`), one per category — **all six are baked into the static HTML**, but **only the active category's panel is shown**; the others carry the `hidden` attribute (out of the a11y tree). The panel shows **ONLY the selected category's links**, never all categories at once.
3. Each panel = a **`.cat-title`** (the category's own label) + a **`.panel-nav`** of that category's items (`.nav-item`s, icon + label, comfortable vertical rhythm) + optional **`.nav-subsection`** blocks with a `.nav-subsection-label` (e.g. the **teachers** category nests a *Performance* / مؤشرات الأداء (`cat.teachersPerf`) sub-section).

Items are data-driven from `nav.config.js` and carry a `status`: **implemented** → `<a href>` + violet active pill (+ `aria-current` on the current route); **planned** → a «قريبًا/Soon» `<button>` (no route, no dead link); **disabled** → a locked, disabled-with-reason `<button>`. The eight implemented pages are home (`dashboard.html`), sessions (badge `24`), schedule, students, courses, teachers, reports, settings; everything else is planned or (Finance-gated) disabled. See `navigation-ia-contract.md` for the full table.

There is **no bottom help/support card** — the rail's bottom avatar replaces it.

## S2. Sidebar — visual rules

- The **light panel** uses a surface plane (`--c-nav-panel`: white in light, a true-dark `#221F31` in dark) with `--c-nav-ink` text, `--c-nav-ink-muted` labels/headings, and `--c-nav-line` dividers. The **rail** uses `--c-nav-rail` (warm `#F1EADC` in light, the deepest plane `#0E0C18` in dark). The shell re-themes by swapping tokens; it is **not** a single dark `#1F1B38` column.
- **Two synced selections**: (a) the **active CATEGORY** — shown in the rail as a **filled violet rounded square** (`.rail-cat.is-active`, fill from `--g-violet`) behind that category's icon; exactly one rail tab is `aria-selected` at a time, and its `.cat-panel` is the only visible one. (b) the **active ROUTE** inside the visible panel — shown as a **large rounded violet pill** (`.nav-item.is-active`, fill from `--g-violet`) with white label + white icon and `aria-current="page"`; at most one item is active, derived from the current page id (only the route's own category panel carries it). Inactive panel items are dark ink on the light panel.
- On load the **route's category wins**: `categoryOf(activeId)` resolves the category that owns the current route, so that panel is the one baked visible and its rail tab is pre-selected.
- Hover/focus = a subtle wash (`--c-nav-hover`), not the full active fill; focus is always visible (keyboard).
- Icons come from the local SVG set, inherit color, optical size ~20px. Labels are readable (≥13px), never clipped in either direction.
- The rail is pinned to the **inline-start screen edge** — on the **right** in RTL, mirrored to the **left** in LTR via logical properties — not a hard-coded side.

## S3. Sidebar — category switching, responsive & collapse

- **Expanded** (default, desktop): the category rail + the light panel side by side (brand, the active category's `.cat-title` + links, rail avatar). Only the **active category's** `.cat-panel` is visible; the other five are `hidden`.
- **Category switching** (no navigation): clicking a `.rail-cat` category tab → `selectCategory(catId)` hides every `[data-nav-panel]` except `catId`, marks the matching rail tab `aria-selected`/`.is-active`/`tabindex="0"` (the rest `tabindex="-1"`), and persists the choice in `localStorage['academy.navCategory']`. **No page load happens** — only the panel's visible category changes. If the rail is collapsed, picking a category first re-expands the panel.
- **Keyboard**: the rail is a roving-tabindex tablist — **Arrow Up/Down (and Left/Right), Home, End** move the selection between category tabs (and swap the panel); only the selected tab is in the tab order.
- **Collapsed** (`data-rail="true"`, toggled by the rail's hamburger): the **light panel hides** while the slim **category rail persists** (category icons only, the active category still legible via the filled violet square, labels via tooltip/aria-label); toggling expanded↔collapsed causes **no layout break**.
- **Mobile/tablet**: an off-canvas **drawer** shows **both the rail and the panel** (so category switching still works on mobile), opened from the topbar, with a scrim and focus trap; closes on Esc/scrim/selection. The drawer is a **clone** of the static sidebar with `id`s and `aria-controls`/`aria-labelledby` stripped to avoid duplicate ids/dangling refs.
- Collapsed/expanded preference persists (`localStorage['academy.rail']` / `UIPreference.sidebarCollapsed`); the selected category persists (`localStorage['academy.navCategory']`), while the route's category always wins on a fresh page load.

## S4. Topbar — structure

Organized, grouped — **never a row of random tiny buttons**.

- **Lead (inline-start)**: page title + breadcrumb (e.g. "الرئيسية · لوحة التحكم"); a drawer/hamburger toggle appears on small screens (opens the off-canvas panel). The desktop rail-collapse control no longer lives here — it moved into the rail (`data-action="toggle-rail"`).
- **Center**: global search field with placeholder ("ابحث عن طالب، جلسة، معلم…") and a keyboard hint; non-functional search is a focusable input, not a dead button (it may open an empty results popover).
- **Trailing (inline-end)**: a tidy utility cluster — notifications (bell with dot), theme switcher (light/dark/system), language switcher (ع/EN), and a profile control (avatar + name + role) that opens a menu. The same profile control is also surfaced as the rail's bottom avatar (`.rail-foot`, `data-action="profile-menu"`).

## S5. Topbar — behavior

- Sticky/visible while content scrolls; sits across the top of the content region beside the sidebar.
- Theme and language switchers visibly re-theme / re-mirror the whole shell on use and persist the choice.
- Every control either acts or is disabled-with-reason — **no dead buttons** (FR-027). Profile/notifications open real (fixture) menus/panels.

## S6. Content region

- Fills the remaining inline space; uses `--c-canvas`; max content width with comfortable gutters; vertical scroll independent of the fixed shell.
- Hosts the page body (dashboard / reports / gallery) and inherits direction + theme from `<html>`.

## S7. Accessibility

- Sidebar is an `<aside>` with an accessible name; each category panel's `.panel-nav` is a labelled `<nav>`; the active route item exposes `aria-current="page"`.
- **Category tablist semantics**: the rail is a `role="tablist"` (`aria-orientation="vertical"`); each category is a `role="tab"` (`aria-selected`, `aria-controls="catpanel-<id>"`, roving `tabindex` — only the selected tab is `tabindex="0"`). Each `.cat-panel` is a `role="tabpanel"` (`aria-labelledby="railcat-<id>"`); inactive panels carry `hidden`, so they are absent from the a11y tree. **Arrow Up/Down/Left/Right + Home/End** move between tabs (roving tabindex) and switch the visible panel.
- Drawer uses proper dialog semantics (focus trap, Esc, return focus); its cloned rail/panel drop `id`s + `aria-controls`/`aria-labelledby` so there are no duplicate ids or dangling references.
- Full keyboard operability and visible focus throughout; touch targets ≥44px; icon-only controls (category tabs, rail toggle, rail avatar) have accessible labels (no raw i18n keys).

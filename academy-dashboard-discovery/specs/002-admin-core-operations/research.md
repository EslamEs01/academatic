# Phase 0 Research: Admin Core Operations Pages

Spec 002 inherits the entire Spec 001 technology stack and architecture decisions (R1–R10 in `../001-approved-dashboard-foundation/research.md`: local Tailwind+tokens, `[data-theme]` theming, RTL logical properties, self-hosted Tajawal, local SVG sprite, hand-rolled SVG/CSS visuals, native ES-module components, JSON-module-free locales, minimal static server, Playwright+axe). **No new dependencies.** This file records only the decisions specific to the new admin pages. Each: **Decision · Rationale · Alternatives rejected.**

---

## R1 — Page generation reuses the Spec 001 SSG (no runtime mount)

**Decision**: Each new page is a `renderX()` function in `src/js/pages/<page>.js` returning the page **body HTML** from fixtures, registered in `scripts/build-html.mjs`'s `PAGES` list. The SSG wraps it with `shellMarkup({activeId,titleKey,crumbKey,bodyHTML})` and writes `public/<page>.html` (ar) + `public/<page>.en.html` (en). Runtime loads `enhance.js` only.

**Rationale**: Identical to `dashboard.js`/`reports.js` — guarantees complete static HTML (no `<div id="app">`), per-language pages, relative paths, and Django-readiness with zero architectural drift.

**Alternatives rejected**: client-side rendering / hydration (violates HTML-first, no-mount rule); a router/SPA shell (banned); hand-written HTML per page (duplication, drift from the component design language).

---

## R2 — Sidebar routing + active state

**Decision**: Update `nav.config.js` so the six items route to real files: `sessions→/sessions.html`, `schedule→/schedule.html`, `students→/students.html`, `trainers→/trainers.html`, `curricula→/curricula.html`, `settings→/settings.html` (home→`/dashboard.html`, reports→`/reports.html` already). The SSG passes each page's `activeId`; the sidebar marks the matching item active with `aria-current="page"`. The language toggle in `enhance.js` already maps `<base>.html ↔ <base>.en.html`, so it works unchanged for the new pages.

**Rationale**: One nav config drives active state across all pages; routes are plain relative `.html` links (GitHub-Pages + Django friendly); no per-page nav duplication.

**Alternatives rejected**: hash routing (not static-file navigation); absolute `/` routes (break at GitHub-Pages project subpaths); JS-driven nav state (unnecessary; SSG bakes active state).

---

## R3 — Schedule layout: grouped-by-day list (not a week grid, no calendar lib)

**Decision**: Render the Schedule as a **day-grouped vertical list** — a day header (date + weekday + count) followed by session blocks (time range, title, level, trainer avatar+name, room, status chip) — for the current week. A compact day-selector / week strip sits in the page header. No calendar library; no drag/drop.

**Rationale**: A grouped-by-day list reads cleanly **right-to-left** (Arabic), reflows trivially to mobile (single column), is easy to scan and uncluttered, maps directly to a Django `{% for day %}{% for block %}` loop, and avoids the horizontal-scroll/overflow problems a 7-column week grid causes in RTL and on small screens. A 7-day grid is the old-system pattern but reads as dense/spreadsheet-like — against the calm-EduTech requirement.

**Alternatives rejected**: 7-column week grid (RTL + responsive + clutter risk; spreadsheet feel); third-party calendar (banned, heavy, not Django-portable); drag/drop scheduling (out of scope).

---

## R4 — Directory layout: Students = table, Trainers = card grid

**Decision**: **Students** render as a responsive **directory table** (avatar+name, status chip, level/grade, progress indicator, enrolled count, row-actions → preview drawer) — scannable and sortable. **Trainers** render as a **card grid** of directory cards (avatar, name, subject(s), availability/status, a small performance summary with hand-rolled ring/sparkline, "view profile") — availability/performance reads better as cards. Both stack to single-column cards on mobile.

**Rationale**: Matches data shape to layout — a student list is list-like (many rows, quick scan), while trainers carry richer per-person summaries that suit cards; both reuse Spec 001 table/card/medallion/chip components and avoid a monotonous "two identical tables" feel. Demonstrates both the table and card-grid shared patterns.

**Alternatives rejected**: both as tables (monotonous, trainer performance cramped); both as cards (student scanning slower at volume); a toggle view (extra complexity, not needed for the foundation).

---

## R5 — Previews via drawer; confirmations/forms via modal

**Decision**: Entity **previews** (session, student, trainer, course details) open in a right-side **drawer** (reusing Spec 001 `drawer.js` shell + a new `preview-drawer.js` content builder). **Confirmations** (e.g., a destructive demo action) and any demo "form" use a centered **modal** (`confirm-modal.js`, reusing the modal pattern). Triggers are `data-drawer="<id>"` / `data-modal-trigger` / `data-confirm`.

**Rationale**: Drawers suit contextual record previews (keep list context, avoid deep navigation — detail pages are out of scope); modals suit focused decisions. Both already exist as Spec 001 patterns (focus trap, Esc, scrim). Keeps navigation shallow and static.

**Alternatives rejected**: separate detail pages (out of scope; more files; deeper nav); everything-in-modal (loses list context for previews); inline expansion (accessibility + layout complexity).

---

## R6 — Filters: client-side filtering of pre-rendered rows (progressive enhancement)

**Decision**: All rows/cards are **pre-rendered in the static HTML** with `data-*` facet attributes (e.g. `data-status`, `data-subject`, `data-trainer`, `data-search`). The filter bar (`data-filter-form`) is enhanced by `enhance.js` to **show/hide** matching rows client-side, update an active-filter chip, and show a "no results" state when empty; a reset restores all. With JS disabled, all rows render (graceful degradation).

**Rationale**: Keeps the page HTML-first and complete (rows exist in the DOM, not built by JS); gives real, instant fixture interactivity (visible feedback → no dead controls); maps cleanly to Django (server renders all rows or filters server-side; the same `data-*` facets remain). No data is fetched.

**Alternatives rejected**: JS builds the rows from a fixture array (violates no-mount/HTML-first); URL-query server filtering (no server in this spec); toast-only "demo" with no real effect (weaker UX; "weak filters" is a screenshot failure condition).

---

## R7 — Settings control taxonomy

**Decision**: Three explicit control kinds, each a `data-*`-tagged pattern: **real** (theme + language — reuse Spec 001 behavior; the appearance section actually switches), **demo** (`data-demo-action` — e.g., "save profile" shows a success toast, no persistence), **disabled-with-reason** (`data-disabled-reason` — e.g., backend-bound toggles render disabled with a visible reason/tooltip). Settings sections: Academy Profile, Appearance (theme/language), Account, Notifications-preference (demo), Roles & Permissions **preview** (read-only grouped list — no enforcement).

**Rationale**: Proves the settings experience honestly without a backend; every control satisfies the no-dead-button rule with a clear, testable kind; the permission preview references the old-system matrix as concept without implementing enforcement.

**Alternatives rejected**: pretending controls persist (dishonest, breaks fixture-only); hiding unimplemented controls (loses the "settings shell" proof); a real settings store (out of scope).

---

## R8 — Shared component extraction (DRY across pages)

**Decision**: Generalize recurring structure into small components reused by all pages: `page-header` (title + breadcrumb + subtitle + actions + optional summary tiles), `filter-bar` (from the sessions toolbar), `card-grid`, `directory-card`, `schedule-list`, `settings-section`, `preview-drawer`, `confirm-modal`, and an optional generalized `data-table` (sessions + students share it). All consume Spec 001 tokens/atoms (`ui.js`, `status-chip`, `status-tile`, `medallion`, `avatar`, `table`).

**Rationale**: One visual language across six pages; less drift risk; each shared pattern is built once and screenshot-verified everywhere; maps to Django partials/inclusion tags.

**Alternatives rejected**: per-page bespoke markup (drift, inconsistency, the "disconnected pages" failure condition).

---

## R9 — Trainer performance & any mini-visuals stay hand-rolled

**Decision**: Trainer performance summaries (e.g., utilization %, sessions trend, rating) and any student progress indicators use the existing hand-rolled `sparkline`/`ring`/`progressBar` (inline SVG/CSS) from Spec 001.

**Rationale**: Honors "no chart library"; reuses proven, themeable, accessible visuals; keeps payload tiny.

**Alternatives rejected**: any chart library (banned); canvas drawing (heavier, worse a11y/theming).

---

## R10 — Tests & screenshots extend the existing harness

**Decision**: Extend `tests/screenshots/capture.cjs` MATRIX with the Spec 002 scenarios (Sessions ar light/dark + en light; Schedule/Students/Trainers/Curricula/Settings ar light; one mobile table page; one tablet) and add the new page names to the smoke + axe page lists. Reuse the per-language file loading and theme-via-localStorage already in place.

**Rationale**: One pipeline covers Spec 001 + 002; deterministic; reuses installed Playwright/axe.

**Alternatives rejected**: a separate test harness (duplication); manual-only capture (not reproducible).

---

## Resolved decisions summary

| # | Topic | Decision |
|---|---|---|
| R1 | Page generation | `renderX()` modules via the Spec 001 SSG → complete static `public/*.html`, no mount |
| R2 | Routing/active state | `nav.config` real `.html` routes + baked `aria-current`; existing lang-toggle works |
| R3 | Schedule | Day-grouped list (no week grid, no calendar lib) — RTL/responsive friendly |
| R4 | Directories | Students = table, Trainers = card grid (match layout to data) |
| R5 | Overlays | Drawer for previews, modal for confirmations/demo forms |
| R6 | Filters | Client-side show/hide of pre-rendered rows via `data-*` facets (progressive) |
| R7 | Settings | real / demo / disabled-with-reason control taxonomy |
| R8 | Components | Extract shared page-header/filter-bar/card-grid/directory-card/schedule-list/settings-section/preview-drawer/confirm-modal |
| R9 | Mini-visuals | Hand-rolled SVG/CSS only (no chart lib) |
| R10 | Tests | Extend the existing capture/smoke/a11y harness |

No unresolved `NEEDS CLARIFICATION` remain.

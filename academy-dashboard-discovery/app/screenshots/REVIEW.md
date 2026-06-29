# Screenshot Acceptance Review — Spec 001

**Date:** 2026-06-29 · **Reference:** `design-references/approved-dashboard/academy-dashboard.png` + `sidebar-reference.png`
**Harness:** `npm run screenshots` (Playwright/Chromium, deterministic fixtures + fixed clock).

Each capture was reviewed side-by-side against the approved design and judged against the §A4 failure conditions in `contracts/screenshot-acceptance.md`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · Arabic RTL · Light · Desktop | `dashboard__ar__light__desktop.png` | ✅ PASS — matches approved (warm canvas, dark right sidebar, violet active pill, KPI row order, sessions table, status tiles, reports, states) |
| 2 | Dashboard · Arabic RTL · Dark · Desktop | `dashboard__ar__dark__desktop.png` | ✅ PASS — true-dark surfaces, brighter accents, gradient hero preserved |
| 3 | Dashboard · English LTR · Light · Desktop | `dashboard__en__light__desktop.png` | ✅ PASS — fully mirrored to LTR, all copy localized, Latin digits |
| 4 | Reports overview · Arabic RTL · Light | `reports__ar__light__desktop.png` | ✅ PASS — reuses shell, report cards incl. permission-locked, no detail pages |
| 5 | Gallery · Arabic RTL · Light | `gallery__ar__light__desktop.png` | ✅ PASS — all base components render; no dead buttons / raw keys |
| 5b | Gallery · Arabic RTL · Dark | `gallery__ar__dark__desktop.png` | ✅ PASS — components correct in dark |
| 6 | Dashboard · Arabic RTL · Light · Mobile (390) | `dashboard__ar__light__mobile.png` | ✅ PASS — sidebar → hamburger/drawer, content reflows, no overflow |
| 6b | Dashboard · Arabic RTL · Light · Tablet (834) | `dashboard__ar__light__tablet.png` | ✅ PASS — sidebar retained, 2×2 KPI/reports grids |

**Failure conditions (§A4):** none triggered — not generic Tailwind, sidebar is strong, dashboard is full/colorful, topbar utilities grouped, KPI cards have medallions + trend + sparklines, table is not a spreadsheet, reports are real cards, resembles the approved direction.

**Automated checks (accompanying, not replacing this review):**
- `npm run test:smoke` → PASS (no raw i18n keys, no external/CDN requests, no dead buttons, all disabled controls have a reason, keyboard-reachable).
- `npm run test:a11y` → axe **critical = 0, serious = 0** across dashboard/reports/gallery × {ar light, ar dark, en light}.
- All captures: **0 console errors**.

## Fixes applied during review
1. KPI card order reversed to match the approved RTL row (sessions → active students → attendance → revenue).
2. Attendance ring: removed an accidental Tailwind `ring` utility collision (class renamed `att-ring`) that drew a focus-blue box.
3. Avatar gradient classes (`av-*`) were purged by Tailwind (runtime-composed) → added to `safelist`.
4. Responsive: in-grid sidebar now collapses below `md`; drawer takes over (mobile no longer crushed).
5. WCAG AA contrast: added darker `*-ink` text tokens for chips/tiles/trend/badges; darkened `--c-ink-3`; brightened dark sidebar muted text; fixed `.badge-count` for light surfaces.

## Architecture change (static / HTML-first / Django-ready)
Re-captured after converting from a JS-rendered app to a **static-site-generated** build: pages ship as complete static HTML in `public/` (real shell + sections, no JS mount), runtime JS only enhances, per-language pre-rendered pages, relative `./assets/` paths (GitHub Pages / Live Server compatible). The rendered design is **pixel-identical** to the pre-refactor captures — all 8 frames still PASS, smoke PASS, axe critical=0/serious=0, 0 console errors. Behaviors verified: theme toggles in-place, language navigates (theme persists), mobile drawer clones the static sidebar.

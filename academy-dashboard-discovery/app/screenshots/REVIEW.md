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

## Spec 002 — Admin Core Operations Pages (2026-06-29)

Six new admin pages reviewed against the Spec 001 approved direction + sidebar reference + existing Spec 001 screenshots (old academy = product/UX reference only). All static `public/*.html`, AR default + EN.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Sessions · AR RTL · Light | `sessions__ar__light__desktop.png` | ✅ PASS — premium ops page (header, status tiles, filter bar, modern table, kebab, pagination); active pill on الجلسات |
| 2 | Sessions · AR RTL · Dark | `sessions__ar__dark__desktop.png` | ✅ PASS — true-dark, brighter accents, consistent |
| 3 | Sessions · EN LTR · Light | `sessions__en__light__desktop.png` | ✅ PASS — fully mirrored + translated, Latin digits |
| 4 | Schedule · AR RTL · Light | `schedule__ar__light__desktop.png` | ✅ PASS — calm day-grouped list, status-accent borders, no calendar widget |
| 5 | Students · AR RTL · Light | `students__ar__light__desktop.png` | ✅ PASS — directory table, status chips, progress bars, summary cards, preview |
| 6 | Trainers · AR RTL · Light | `trainers__ar__light__desktop.png` | ✅ PASS — card grid, availability chips, hand-rolled performance stats |
| 7 | Curricula · AR RTL · Light | `curricula__ar__light__desktop.png` | ✅ PASS — course cards, status chips, counts, level preview |
| 8 | Settings · AR RTL · Light | `settings__ar__light__desktop.png` | ✅ PASS — sections; real theme/lang, demo save/toggles, disabled-with-reason, reset→confirm, roles preview |
| 9 | Sessions · AR RTL · Light · Mobile | `sessions__ar__light__mobile.png` | ✅ PASS — sidebar→hamburger, 2×2 tiles, table scrolls |
| 10 | Schedule · AR RTL · Light · Tablet | `schedule__ar__light__tablet.png` | ✅ PASS — sidebar retained, filter wraps, day-groups reflow |

**§A4 failure conditions:** none triggered — not generic, not disconnected from Spec 001, sidebar/topbar identical, not cluttered, readable, real filters, not spreadsheet-like, real cards, no dead actions, good dark mode, RTL/LTR correct, static HTML-first (no `#app`), GitHub-Pages relative paths, Django-mappable.

**Automated (accompanying):** build clean · smoke PASS (18 loads, structure + filter/drawer behavior) · axe critical=0/serious=0 (14 scenarios) · 0 console errors. Spec 001 pages re-verified — no regression.

## Architecture change (static / HTML-first / Django-ready)
Re-captured after converting from a JS-rendered app to a **static-site-generated** build: pages ship as complete static HTML in `public/` (real shell + sections, no JS mount), runtime JS only enhances, per-language pre-rendered pages, relative `./assets/` paths (GitHub Pages / Live Server compatible). The rendered design is **pixel-identical** to the pre-refactor captures — all 8 frames still PASS, smoke PASS, axe critical=0/serious=0, 0 console errors. Behaviors verified: theme toggles in-place, language navigates (theme persists), mobile drawer clones the static sidebar.

## Pre-003 Alignment — Sidebar/Shell refactor + naming (2026-06-29)

The shell was corrected to the now-mandatory **`sidebar-reference.png`**: a **slim icon rail** (hamburger top · icon stack with the active icon in a filled-violet square · circular profile avatar at the bottom) **+ an expanded light nav panel** (brand wordmark · section label · grouped list with a **large violet active pill**), replacing the previous single dark `#1F1B38` column. Naming aligned to the analyzed academy system: **Trainers→Teachers** (المعلمون, `teachers.html`), **Curricula→Courses** (الدورات, `courses.html`), Schedule AR → الجدول الدراسي, Sessions "trainer" column → "teacher". Each capture reviewed directly against `sidebar-reference.png` + the approved `academy-dashboard.png` body.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · AR · Light | `dashboard__ar__light__desktop.png` | ✅ PASS — faithful to sidebar-reference: rail+light panel, violet pill on الرئيسية, filled-violet rail square, bottom avatar; warm body preserved |
| 2 | Dashboard · AR · Dark | `dashboard__ar__dark__desktop.png` | ✅ PASS — rail is the deepest plane (#0E0C18), panel a step lighter w/ divider; premium dark, violet pill pops |
| 3 | Dashboard · AR · Light · **collapsed rail** | `dashboard__ar__light__desktop__rail.png` | ✅ PASS — panel hidden, rail-only (active square + avatar), content reflows, no layout break |
| 4 | Teachers · AR · Light | `teachers__ar__light__desktop.png` | ✅ PASS — renamed المعلمون (title/crumb/active pill); card grid, availability chips, varied bios/stats |
| 5 | Courses · AR · Light | `courses__ar__light__desktop.png` | ✅ PASS — renamed الدورات ("دورة جديدة"); status chips, subject·level, counts |
| 6 | Sessions · EN · Light (LTR) | `sessions__en__light__desktop.png` | ✅ PASS — shell **mirrored** (rail far-left, panel right); Teachers/Courses + "Teacher" column; status tiles, table |
| 7 | Sessions · AR · Light · Mobile | `sessions__ar__light__mobile.png` | ✅ PASS — sidebar→hamburger drawer, 2×2 tiles, table reflows, المعلم column |
| 8 | Sessions/Schedule/Students/Settings · AR · Light | respective files | ✅ PASS — all carry the new shell + correct active pill; bodies unchanged (aligned), Reports now uses shared `pageHeader` |

**§A4 failure conditions:** none triggered — shell clearly matches `sidebar-reference.png`, not generic, sidebar/topbar coherent, real filters, not spreadsheet-like, good dark mode, RTL/LTR correct, static HTML-first (no `#app`), relative paths.

**Automated (accompanying):** build clean (18 pages, idempotent — stale `trainers`/`curricula` routes removed) · smoke PASS (18 loads + new `.nav-rail`/`.nav-panel`/single-active-item assertions + filter/drawer behavior) · axe **critical=0 / serious=0** (15 scenarios incl. dashboard EN dark) · 19 screenshots, 0 console errors. Fixed a real **dark-mode AA contrast** bug on `.btn-primary` (white on `#9486F4` = 3.01 → new `--c-primary-btn`).

## Navigation IA + Topbar alignment (2026-06-29)

The sidebar now renders the **full discovered admin IA** — **7 job-based groups, 17 items**: 8 implemented (real links + violet active pill) + 8 **planned** («قريبًا» amber pill, `<button>` not `<a>`, coming-soon toast) + 1 **disabled** (Finance, lock + reason toast). The 3 role portals stay **future-role (hidden)**; the long tail (announcements/library/finance sub-areas/tools/etc.) is folded or documented in `navigation-ia-contract.md`. The rail mirrors **only navigable (implemented) pages**. The topbar adds a **«+» Quick-Actions menu** (new session/add student/add teacher = demo; create announcement = disabled-with-reason) + a **⌘K command popover** + a notifications "View all" (disabled-with-reason) + a profile menu that **folds** Help/Settings/Log-out (confirm modal). No dead links — every nav/topbar control acts, opens a menu, fires a demo toast, or is disabled-with-reason.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · AR · Light (full IA) | `dashboard__ar__light__desktop.png` | ✅ PASS — 7 calm groups; implemented rows unchanged (active pill, 24 badge); planned «قريبًا» clearly secondary; Finance disabled w/ lock; topbar «+» + ⌘K; not cluttered |
| 2 | Dashboard · AR · Dark (full IA) | `dashboard__ar__dark__desktop.png` | ✅ PASS — قريبًا pills + lock legible/premium on the deep panel; violet active pill correct |
| 3 | Dashboard · EN · LTR (full IA) | `dashboard__en__light__desktop.png` | ✅ PASS — rail far-left, "Soon" pills + lock mirror to inline-end; ⌘K renders LTR; groups translated |
| 4 | Collapsed rail | `dashboard__ar__light__desktop__rail.png` | ✅ PASS — rail shows only implemented icons + avatar (no planned/disabled); no scroll |
| 5 | Mobile drawer (open) | `dashboard__ar__light__mobile__drawer.png` | ✅ PASS — full-IA panel full-width (rail hidden); planned/disabled render; active pill correct |
| 6 | Sessions / Students / Settings · AR · Light | respective files | ✅ PASS — same full-IA shell + correct active pill; page bodies unchanged |

**Interaction proof (recorded, not a static shot):** clicking a planned row → «قريبًا» toast; clicking Finance → billing-reason toast; «+» opens the quick-actions menu; ⌘K opens the command popover — none navigate, none dead (smoke-asserted).

**§A4 failure conditions:** none — sidebar matches `sidebar-reference.png`, full IA visible but **not** overwhelming, future items clearly marked + non-dead, topbar complete but not cluttered, active state correct, RTL/LTR + dark + mobile drawer all good, static HTML-first (no `#app`), relative paths.

**Automated (accompanying):** build clean (18 pages) · smoke PASS (18 loads + NEW assertions: no-dead-nav, rail-only-implemented, planned/disabled/quick-actions feedback) · axe **critical=0 / serious=0** · 20 screenshots, 0 console errors. New icons vendored (tasks/messages/families/materials/certificates/staff/megaphone), 0 missing.

## Category Navigation Rail (2026-06-29)

Corrected the sidebar to the **two-level category rail** of `sidebar-reference.png`: the slim rail is a **tablist of 6 category icons** (Control 📚 · Families 👥 · Teachers · Reports 📊 · Administration ▦ · Settings ⚙ + hamburger + bottom avatar); selecting a category swaps the expanded panel to show **ONLY that category's links** (with its title + optional sub-section) — never all categories at once. The route's category opens on load; clicking a rail icon switches the panel client-side (no navigation, persisted). Topbar gained an **apps-grid quick-launcher**. Reviewed each capture against `sidebar-reference.png`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · AR · Light — **Control** category | `dashboard__ar__light__desktop.png` | ✅ PASS — matches the reference Dashboard panel exactly (الرئيسية pill, الجلسات 24, الجدول الدراسي + قريبًا items); other categories NOT shown |
| 2 | **Families** category selected (clicked, no nav) | `dashboard__ar__light__desktop__cat-families.png` | ✅ PASS — panel swapped to ONLY Families links (الطلاب/الدورات implemented, rest قريبًا); rail Families icon = violet square |
| 3 | **Teachers** category (with sub-section) | `dashboard__ar__light__desktop__cat-teachers.png` | ✅ PASS — المعلمون link + sub-section «مؤشرات الأداء» (3 perf items قريبًا) |
| 4 | Reports / Admin / Settings categories | `..__cat-reports/admin/settings.png` | ✅ PASS — each shows only its links; Reports/Admin finance items disabled w/ lock |
| 5 | **EN LTR** — Families category | `dashboard__en__light__desktop__cat-families.png` | ✅ PASS — rail far-left, panel right, only Families links, "Soon" pills, apps-grid in topbar |
| 6 | Dashboard · AR · **Dark** | `dashboard__ar__dark__desktop.png` | ✅ PASS — category rail + panel premium in dark; violet active square/pill correct |
| 7 | Collapsed rail / Mobile drawer | `..__rail.png` / `..__drawer.png` | ✅ PASS — collapse hides panel (rail categories persist); drawer keeps rail+panel so switching works on mobile |

**Core requirement met:** the sidebar **no longer shows all links at once** — only the selected category's links are visible, and clicking a rail category switches the panel (smoke-asserted: 6 category tabs · exactly ONE visible panel · switching to families works).

**Automated:** build clean · smoke PASS (+ category-switch + single-visible-panel + 6-tabs assertions) · axe **critical=0 / serious=0** · 26 screenshots, 0 console errors. New icons: layers/grid/user-plus (52 total, 0 missing).

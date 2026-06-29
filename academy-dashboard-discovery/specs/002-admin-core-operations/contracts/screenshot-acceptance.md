# Contract: Screenshot Acceptance (Spec 002)

**Status**: Binding · Automated tests are required but NOT sufficient. Final acceptance is a human screenshot review of the new pages against the Spec 001 approved direction. "Passes tests but looks bad / drifts from Spec 001" = **fail**.

## A0. Targets are static pre-rendered pages

Acceptance runs against the built static site in `app/public/`. New pages are pre-rendered per language: `public/<page>.html` (Arabic) and `public/<page>.en.html` (English). `npm run build` produces them; the harness serves `public/` and loads these files (content renders without JS).

## A1. Capture harness

Extends `tests/screenshots/capture.cjs` (Playwright/Chromium): per scenario, set theme via `localStorage` and load the per-language file at the viewport; capture full-page PNG to `app/screenshots/`. Viewports: desktop 1440×900, tablet 834×1112, mobile 390×844. Deterministic fixtures + fixed date; non-essential animation disabled.

## A2. Required matrix (minimum)

| # | Page | Direction | Theme | Viewport |
|---|---|---|---|---|
| 1 | Sessions | Arabic RTL | Light | Desktop |
| 2 | Sessions | Arabic RTL | Dark | Desktop |
| 3 | Sessions | English LTR | Light | Desktop |
| 4 | Schedule | Arabic RTL | Light | Desktop |
| 5 | Students | Arabic RTL | Light | Desktop |
| 6 | Teachers | Arabic RTL | Light | Desktop |
| 7 | Courses | Arabic RTL | Light | Desktop |
| 8 | Settings | Arabic RTL | Light | Desktop |
| 9 | Most complex table page (Sessions or Students) | Arabic RTL | Light | **Mobile** |
| 10 | Schedule or Students | Arabic RTL | Light | **Tablet** |
| 11 | **Category sidebar — Control** selected (ONLY Control links: home active pill + sessions badge + planned «قريبًا») | Arabic RTL | Light | Desktop |
| 12 | **Category sidebar — Control** selected (same — verify calm dark mode) | Arabic RTL | Dark | Desktop |
| 13 | **Category sidebar — Families** selected (ONLY Families links; previous category's links gone) | Arabic RTL | Light | Desktop |
| 14 | **Category sidebar — Teachers** selected (+ the *Performance* / مؤشرات الأداء **sub-section** renders) | Arabic RTL | Light | Desktop |
| 15 | **Category sidebar — Reports** selected (disabled Finance rows show lock + reason) | Arabic RTL | Light | Desktop |
| 16 | **Category sidebar — Admin** selected | Arabic RTL | Light | Desktop |
| 17 | **Category sidebar — Settings** selected | Arabic RTL | Light | Desktop |
| 18 | **Category sidebar + rail** (six category tabs; selected tab violet square) | English LTR | Light | Desktop |
| 19 | **Category switching** (Control → click Families → panel swaps to Families links, no navigation) | Arabic RTL | Light | Desktop |
| 20 | **Topbar menus** (apps-grid «▦» launcher, Quick-Actions «+», ⌘K command popover, notifications, profile) | Arabic RTL | Light | Desktop |
| 21 | **Mobile nav drawer** (off-canvas keeps BOTH rail + panel; category switching works) | Arabic RTL | Light | **Mobile** |

(Additional dark/EN captures may be added; the rows above are the minimum gate.)

## A2b. Navigation IA & topbar acceptance criteria

- **Category sidebar (rows 11–17)**: the rail shows **one icon per category** (control / families / teachers / reports / admin / settings); the selected category's tab is a filled violet square and its `.cat-panel` is the **only** one visible — showing **ONLY that category's links** with the `.cat-title` header. Implemented items show the violet active pill + `aria-current` only on the current page; **planned** items show a muted amber «قريبًا/Soon» pill (no link affordance); **disabled** Finance-gated rows (Reports/Admin) show a lock glyph + disabled styling with the reason in `title`/`aria-label`. A panel must read **calm and uncluttered** — a single category's links, not the whole IA — and `future-role`/`hidden` items are absent.
- **Sub-section (row 14)**: the **teachers** category renders its *Performance* / مؤشرات الأداء (`cat.teachersPerf`) sub-section with its `.nav-subsection-label` and the three KPI rows beneath the top-level Teachers links.
- **Category switching (row 19)**: switching the rail category swaps the visible panel to the new category's links and hides the previous category's links — with **no page navigation**.
- **Rail (row 18)**: the slim rail is the six category tabs + the bottom avatar; the selected tab is highlighted (violet square) and is the only one `aria-selected`.
- **Topbar (row 20)**: the apps-grid «▦» launcher (a 3-column grid of the eight implemented pages), the Quick-Actions «+» menu, the ⌘K command popover (Recent searches + Add shortcut), the notifications panel (rows + disabled-with-reason "View all"), and the profile chip menu (Profile/Settings/Help/Log out) each open and read cleanly; no standalone support/announcement icons.
- **Mobile drawer (row 21)**: the off-canvas drawer keeps **both the rail and the panel** so category switching still works; no overflow; planned/disabled affordances render the same as desktop.
- These rows are subject to the same §A4 failure conditions (clutter, drift, dead actions, poor dark, broken RTL/LTR) and the no-dead-link rule from `navigation-ia-contract.md`.

## A3. Review process

1. Generate the matrix via the harness.
2. Place each capture **side-by-side** with: the Spec 001 approved dashboard (`design-references/approved-dashboard/academy-dashboard.png`), the **sidebar reference**, and the **existing Spec 001 screenshots** (`app/screenshots/dashboard__*.png`). Old academy screenshots are **product/UX reference only — not visual copy**.
3. Apply the failure conditions (A4). Any single failure = not accepted; fix and re-capture.
4. Record verdicts per scenario in `app/screenshots/REVIEW.md`.

## A4. Failure conditions (any one = FAIL)

- Page looks generic / like a generic admin template.
- Page looks disconnected from Spec 001.
- Sidebar or topbar drift from Spec 001.
- **Sidebar panel shows more than one category's links at once** (the expanded panel must show ONLY the selected category's links — never all categories together).
- Too much clutter.
- Tiny unreadable text.
- Weak filters.
- Table looks like a spreadsheet.
- Cards look like placeholders.
- Actions are dead.
- Dark mode is poor.
- RTL or LTR is broken.
- Page is JS-rendered instead of HTML-first.
- Page cannot deploy to GitHub Pages (absolute paths / external requests).
- Page is hard to convert to a Django template.

## A5. Automated checks that accompany (not replace) the review

- **a11y**: axe critical = 0 on every new page (AR light + at least one dark + one EN sampled).
- **no-dead-button** / **no-raw-i18n-key** / **no-external-request**: smoke tests over the new pages.
- **HTML-structure**: each new page has the static shell + page content and **no `id="app"` whole-page mount**; relative asset paths.
- **keyboard**: scripted tab-through reaches controls with visible focus on each new page.

## A6. Output & naming

`app/screenshots/<page>__<dir>__<theme>__<viewport>.png` (e.g. `sessions__ar__dark__desktop.png`), plus verdicts appended to `app/screenshots/REVIEW.md`.

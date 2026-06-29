# Contract: Screenshot Acceptance

**Status**: Binding · **Automated tests are required but NOT sufficient.** Final acceptance is a human screenshot review against the approved reference. "Passes tests but looks bad" = **fail**.

## A0. Targets are static pre-rendered pages

Acceptance runs against the **built static site** in `app/public/` (HTML-first; JS only
enhances). Pages are pre-rendered per language: `public/<page>.html` (Arabic) and
`public/<page>.en.html` (English). `npm run build` produces them; the harness serves
`public/` and loads these files (content renders without JS — only behaviors need the http origin).

## A1. Capture harness

- Tool: Playwright 1.61 (installed) driving Chromium; `@axe-core/playwright` for a11y in the same run.
- For each scenario the harness: loads the page over `http://localhost`, sets `lang`/`dir` (ar/en) and theme (light/dark/system, applied before paint), waits for fonts + fixtures to settle, then captures a **full-page** PNG to `app/screenshots/<scenario>.png`.
- Viewports: **desktop** 1440×900, **tablet** 834×1112, **mobile** 390×844 (device-scale 2 where useful).
- Deterministic: fixed fixtures, fixed clock/date string, disabled non-essential animation during capture.

## A2. Required screenshot matrix (all mandatory)

| # | Page | Direction | Theme | Viewport |
|---|---|---|---|---|
| 1 | Admin Dashboard | Arabic RTL | Light | Desktop |
| 2 | Admin Dashboard | Arabic RTL | Dark | Desktop |
| 3 | Admin Dashboard | English LTR | Light | Desktop |
| 4 | Reports Overview | Arabic RTL | Light | Desktop |
| 5 | Gallery / Style Preview | Arabic RTL | Light | Desktop |
| 5b | Gallery / Style Preview | Arabic RTL | Dark | Desktop |
| 6 | Admin Dashboard | Arabic RTL | Light | **Mobile** |
| 6b | Admin Dashboard | Arabic RTL | Light | **Tablet** |

(Additional dark/LTR captures may be added, but the rows above are the minimum gate.)

## A3. Review process

1. Generate the full matrix via the harness.
2. Place each capture **side-by-side** with `design-references/approved-dashboard/academy-dashboard.png` (and `sidebar-reference.png` for the rail).
3. Apply the failure conditions (A4). Any single failure = the build is **not accepted**; fix and re-capture.
4. Record the review verdict (pass/fail + notes) per scenario.

## A4. Failure conditions (any one = FAIL)

- Looks like a generic Tailwind admin template.
- Sidebar is weak or a plain list.
- Dashboard is empty, flat, or pale.
- Topbar icons feel random / ungrouped.
- KPI cards look basic (missing medallion / depth / trend / mini-visual).
- Sessions table looks like a bare spreadsheet.
- Reports cards look like placeholders.
- Design does not resemble the approved direction.
- Only passes automated tests but looks bad.
- Ignored available reference files and guessed.
- (Per-theme) Dark mode uses pure black or is illegible; (per-dir) LTR or RTL has broken/clipped layout; (responsive) overflow or broken layout at mobile/tablet.

## A5. Automated checks that accompany (not replace) the review

- **a11y**: axe-core reports **zero critical violations** on dashboard, reports, gallery (each direction/theme sampled).
- **no-dead-button**: smoke test asserts every `<button>`/clickable either has a handler/href or `disabled` + a reason.
- **no-raw-i18n-key**: smoke test asserts no visible text matches an unresolved key pattern (e.g. `*.* ` namespaced token) and the i18n missing-key guard logged nothing.
- **no-external-request**: harness fails if any request resolves to a non-local origin (enforces no-CDN).
- **keyboard**: scripted tab-through of shell + dashboard reaches all controls with visible focus.

## A6. Output location & naming

`app/screenshots/<page>__<dir>__<theme>__<viewport>.png` (e.g. `dashboard__ar__dark__desktop.png`), plus a short `app/screenshots/REVIEW.md` recording verdicts. These are the artifacts presented for sign-off.

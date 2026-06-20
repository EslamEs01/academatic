# 04 — HTML Structure Analysis

> Structural signatures of **all 339 sanitized HTML snapshots** (`_build/html_sig.py` → `_build/html_signatures.json`). **Counts only — no source code copied.** Purpose: understand the legacy DOM/component structure so we build cleaner equivalents. The legacy stack is reference only; our rebuild is HTML + compiled Tailwind + native JS.

## Aggregate structural tallies (across 339 pages)

**Tags (top):** `li` 26,952 · `ul` 4,887 · `button` 4,255 · `nav` 2,821 · `form` 1,713 · `select` 1,284 · `svg` 1,225 · `aside` 359 · `table` 345 · `tbody` 345 · `thead` 336 · `header` 329 · `textarea` 309 · `footer` 294 · `canvas` 12 · `section` 6.

**Class/component patterns (top):** `sidebar` 37,410 · `flatpickr` 21,567 · `dropdown` 16,510 · `nav-link` 7,026 · `modal` 6,743 · `card` 5,162 · `btn` 5,160 · `navbar` 3,260 · `badge` 3,030 · `form-control` 2,649 · `tooltip` 2,011 · `collapse` 1,699 · `offcanvas` 932 · `select2` 907 · `form-select` 880 · `apexcharts` 684 · `alert` 618 · `accordion` 429 · `table-responsive` 311 · `avatar` 190 · `tab-pane` 161 · `pagination` 118 · `breadcrumb` 88 · `dropzone` 17 · `popover` 7 · `ql-editor` 2 · `datatable` 1 · `toast` 1.

**Bootstrap toggles:** `dropdown` 2,222 · `modal` 1,259 · `collapse` 770 · `offcanvas` 626 · `tab` 120 · `pill` 41.

## What the structure tells us
- **Legacy stack = Bootstrap 5 + jQuery plugins:** `data-bs-toggle` for modal/offcanvas/dropdown/collapse/tab; **flatpickr** (date/time, ~21.5k usages → dates are pervasive), **select2** (searchable selects, ~900), **ApexCharts** (charts, 684), **dropzone** (file upload, 17), **Quill** (`ql-editor`, 2 → only the policy editors), Bootstrap tooltips (2k). `datatable`/`toast` barely used (1 each) → tables are hand‑rolled, not a datatable lib; toasts likely via toastr JS (not class‑based).
- **Nav structure:** a `nav`/`aside` **sidebar** (huge `sidebar` class count = repeated on every page), `navbar` top bar, `nav-link` items, `breadcrumb` on most pages, `nav-tabs`/`tab-pane` for in‑page tabs (161 tab panes). Heavy `li`/`ul` (27k `li`) = long nested sidebar menus.
- **Form structure:** 1,713 `<form>`, 2,649 `form-control` + 880 `form-select` + 1,284 `<select>` + 309 `<textarea>`. Forms are Bootstrap‑styled; many selects are select2‑enhanced. Confirms forms are the dominant interactive surface.
- **Table structure:** 345 `<table>` (≈ matched `thead`/`tbody`), only 311 wrapped in `table-responsive` and just 118 `pagination` blocks → **not every table is responsive‑wrapped or paginated** (a gap to fix). Tables are server‑rendered HTML, not virtualized.
- **Modal/offcanvas:** 6,743 `modal` class refs + 932 `offcanvas` + 1,259 modal toggles → modals are everywhere and many are **statically present in the DOM** (pre‑rendered, hidden) rather than lazy — contributes to page weight.
- **Charts:** `apexcharts` on analytics/accounting pages (684) + 12 `canvas` (certificate designer + some charts).
- **Cards & badges:** 5,162 `card`, 3,030 `badge` → card‑based layout + heavy status‑badge usage (matches the status‑centric model).

## Heaviest / most complex pages (sanitized HTML bytes)
`management-student-1` 379 KB · `management-families-2` 378 KB · `management-teachers-1` 355 KB · `management-courses-1` 348 KB · `management-families-1` 332 KB · `management-admins-permission-6/7` 319 KB · `management-time-convertor` 314 KB · `management-student-2` 307 KB · `management-settings-security-data` 292 KB · `management-accounting` 273 KB · `management-families-create` 267 KB.
→ The entity **detail pages** + the **permission matrix** + **time‑converter** + **accounting** are the complexity hotspots. These pages eager‑render every tab + every modal in the DOM (why they're 300+ KB). **Rebuild fix:** lazy‑load tab/modal content, code‑split, skeletons.

## Legacy structural weaknesses → rebuild actions
1. **Eager DOM bloat** — all tabs/modals pre‑rendered → 300–380 KB pages. → lazy/async tab + modal content.
2. **Inconsistent table responsiveness** — only ~90% wrapped, only ~34% of tables paginated. → standard responsive, server‑paginated DataTable for all.
3. **Plugin sprawl** (flatpickr/select2/ApexCharts/Quill/dropzone/Bootstrap JS) → one cohesive native‑JS component set with our own date/select/upload/richtext/chart choices (no CDN).
4. **Repeated chrome in every page's DOM** (sidebar 37k, search, shortcuts, logout) → a single app‑shell rendered once; content swapped.
5. **Hand‑rolled tables** without a consistent empty/loading/sort contract → one DataTable primitive with built‑in states.
6. **Sections vs divs** — almost no semantic `<section>`/`<article>` (6 total) → use semantic landmarks + ARIA for accessibility.

> No legacy markup is reused. These signatures only inform *what component equivalents and behaviors* our original system must provide.

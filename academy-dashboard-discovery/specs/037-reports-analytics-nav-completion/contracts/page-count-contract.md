# Contract — Page Count

| | Value |
|---|---|
| Before | **115** |
| After | **115** |
| Delta | **0** |
| New page bases | **0** |
| New public HTML files | **0** |
| Admin menu items | **50** (unchanged) |

## Rules
- `build-html.mjs` gains **0** PAGES entries — `reports.html`, `families.html`, `students.html` are already registered; no new page is created. `build-html.mjs` stays **0-diff**.
- All five surfaces (monthlyReports, dataAnalysis, familyCategories, studentResult, studentEvaluation) are **tabs/folds on existing pages** via the shared `tabs({group,items,panels,ariaKey})` widget — never a standalone page.
- No `monthly-reports.html` / `analytics.html` / `family-categories.html` / `student-results.html` / `student-evaluations.html` may be created.
- `find public -maxdepth 1 -name '*.html' | wc -l` MUST equal **115** post-build.
- Admin-menu item count stays **50** — `planned`→`implemented` status flips and route refinements change status/route, never item count (no item added, none removed).

## Forbidden (the ONLY count-affecting operations, all disallowed)
- Adding a `PAGES` entry to `build-html.mjs`.
- Adding a new `.html`/`.en.html` file under `public/`.
- Adding or removing a `nav.config.js` item (`item({...})` entry) in any category.
- Splitting a fold into a standalone page mid-implementation without a declared, build-verified amendment first.

## Standalone-page fallback (only if ever chosen)
If grounding or plan work reveals a fold is not viable and a standalone page is required for any of the five surfaces, that choice MUST be:
1. Declared explicitly in `plan.md` with the exact new base name(s) and file count delta, **before** any source edit.
2. Build-verified (`node scripts/build-html.mjs` run, `find public -maxdepth 1 -name '*.html' | wc -l` recorded) showing the new total.
3. Reflected in an amendment to this contract and to `count-and-route-contract.md` (before/after tables updated) — the recommended default remains 0 standalone pages / count 115.

## Acceptance
- `find public -maxdepth 1 -name '*.html' | wc -l` → **115**.
- Smoke route-freeze / page-count constant stays **115** (byte-verbatim unless the standalone fallback above was declared and build-verified).
- Admin-menu-50 freeze smoke assert stays byte-verbatim.
- Only `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en` bodies change (new tabs) + the shared sidebar on all admin pages (status-flip anchors); no other page body changes.
- `package.json` and `build-html.mjs` show **0 diff**.

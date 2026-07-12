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
- `build-html.mjs` gains **0** PAGES entries — `finance.html` is already registered (Spec-009/030); no new page is
  created. `build-html.mjs` stays **0-diff**.
- All six unlocked surfaces (invoices, payments, monthlyInvoices, salaries, staffSalaries, banks) are **tabs on the
  existing `finance.html`** via the shared `tabs({group:'finance', ariaKey:'fin.tab.aria'})` widget — never a
  standalone page. `finance.html` widens from 3 tabs (overview·salaries·banks) to 6 tabs
  (overview·invoices·payments·monthly-invoices·salaries·banks); the invoices/payments sections that currently live
  inside `overview` are MOVED into their own tabs, not duplicated.
- No `invoices.html` / `payments.html` / `monthly-invoices.html` / `salaries.html` / `staff-salaries.html` /
  `banks.html` may be created.
- `find public -maxdepth 1 -name '*.html' | wc -l` MUST equal **115** post-build.
- Admin-menu item count stays **50** — `disabled`→`implemented` status flips change status/route, never item count
  (no item added, none removed). `classSalaryReport` and `finance-analysis` are unaffected by count (both stay
  locked/absent, see `nav-completion-contract.md`).

## Forbidden (the ONLY count-affecting operations, all disallowed)
- Adding a `PAGES` entry to `build-html.mjs`.
- Adding a new `.html`/`.en.html` file under `public/`.
- Adding or removing a `nav.config.js` item (`item({...})` entry) in any category.
- Splitting any of the 6 unlocked surfaces into a standalone page mid-implementation without a declared,
  build-verified amendment first.

## Standalone-page fallback (only if ever chosen — not recommended)
If grounding or plan work reveals a fold is not viable and a standalone page is required for any of the 6 unlocked
surfaces, that choice MUST be:
1. Declared explicitly in `plan.md` with the exact new base name(s) and file count delta, **before** any source edit.
2. Build-verified (`node scripts/build-html.mjs` run, `find public -maxdepth 1 -name '*.html' | wc -l` recorded)
   showing the new total.
3. Reflected in an amendment to this contract and to `count-and-route-contract.md` (before/after tables updated) —
   the recommended default remains 0 standalone pages / count 115.

## Acceptance
- `find public -maxdepth 1 -name '*.html' | wc -l` → **115**.
- Smoke route-freeze / page-count constant stays **115** (byte-verbatim unless the standalone fallback above was
  declared and build-verified).
- Admin-menu-50 freeze smoke assert stays byte-verbatim.
- Only `finance.html`/`.en` bodies change (new tabs) + the shared sidebar on all admin pages (status-flip anchors for
  the 6 unlocked items); no other page body changes.
- `package.json` and `build-html.mjs` show **0 diff**.

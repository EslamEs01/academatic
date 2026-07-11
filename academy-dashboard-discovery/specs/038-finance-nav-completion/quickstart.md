# Quickstart — Spec 038 (implementation runbook, NOT executed here)

## Preflight (gate)
```bash
cd academy-dashboard-discovery/app
git rev-parse --short HEAD          # 56bc418 (035/036/037 committed) or later
git status --short                  # clean (only expected: spec docs)
cat ../../.specify/feature.json      # → 038
find public -maxdepth 1 -name '*.html' | wc -l   # 115
npm run build && npm run test:smoke && npm run test:a11y   # green / PASS / 0-0
```
STOP if count ≠ 115, feature.json ≠ 038, or baseline red.

## Build order
1. **finance.js** — restructure `renderFinance()` tabs from 3 → 6 (`overview/invoices/payments/monthly-invoices/salaries/banks`):
   - **overview** panel = `financeActions()` (keep it the FIRST `.report-actions`) + `plannedSection()` (9 `.report-card`) + the 9 baked `invoiceDrawer` templates + a short summary/links.
   - **invoices** panel = the 4 `tile()`s + `invoiceSection()` (filterBar → `#invoice-list`, 9 rows). MOVE from overview (do not duplicate).
   - **payments** panel = `paymentsSection()` (6 `.fin-pay-row`). MOVE from overview.
   - **monthly-invoices** panel = new `monthlyInvoicesSection()` — INVOICES grouped by `monthKey`, `.finm-*`/`#fin-monthly` classes, no filterBar, no computed total, Generate/Send/PDF gates.
   - **salaries** / **banks** = existing sections, unchanged.
2. **ar/en.fin.js** — add `fin.tab.{invoices,payments,monthlyInvoices}` + `fin.monthly.*` (mirrored).
3. **app.css** — additive `.finm-*` monthly board styles only.
4. **nav.config.js** — 6 unlocks (`disabled`→`implemented` + `finance.html#view=…`; staffSalaries → `#view=salaries`); keep `classSalaryReport` `disabled`+reason; no FUTURE_ROUTES edit.
5. **tests** — smoke (nav010 lockedFin amendment + 6 deep-links + monthly board + finance asserts preserved) + a11y rows + screenshot frames.
6. **docs** — README / CLAUDE / REVIEW / implementation-status.

## Verify
```bash
npm run build                 # 115 pages, 0 raw keys, ar/en.fin parity
npm run test:smoke            # PASS + finance unlock block; 9 invoices/6 payments/4 tiles/9 planned/9 drawers preserved
npm run test:a11y             # critical=0 serious=0
node tests/screenshots/capture.cjs   # 0 console errors
git diff --stat -- src/js/nav.config.js scripts/build-html.mjs src/js/enhance.js src/js/i18n.js package.json src/js/fixtures/finance.js
find public -maxdepth 1 -name '*.html' | wc -l   # 115
```
Expect: `build-html.mjs`/`enhance.js`/`i18n.js`/`package.json` 0-diff; ideally `fixtures/finance.js` 0-diff; only `finance.html`/`.en` body + shared sidebar changed.

## Manual deep-link smoke (fresh load each)
- `finance.html#view=invoices` / `.en` → Invoices tab (9 rows, tiles, filter), writes gated, no computed total.
- `finance.html#view=payments` / `.en` → Payments tab (6 rows), writes gated.
- `finance.html#view=monthly-invoices` / `.en` → month-grouped board, no computed total.
- `finance.html#view=salaries` / `.en` → figure-free teacher+staff boards (0 pay figure).
- `finance.html#view=banks` / `.en` → name+status (no balance).
- classSalaryReport nav item → still `disabled` + lock + reason (honest).

## Guards before report
- `$clean-code-guard` — no-fake-money, no computed total/salary, figure-free salaries/banks, finance asserts preserved, only the declared nav010 lockedFin change, scope, 0-diff forbidden files.
- `$test-guard` — additive except nav010 lockedFin; deep-link tests load `#view=`; finance 9/6/4/9/9 asserts byte-verbatim; classSalaryReport still asserted locked.

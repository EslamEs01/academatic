# Implementation Plan — Spec 038: Finance Nav Completion

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-11 | **Spec**: [spec.md](./spec.md)
**Baseline HEAD**: `56bc418` (Specs 035/036/037 committed; working tree clean). **Count before**: 115. **feature.json** → 038.

> ✅ **Baseline committed & clean.** Implementation may proceed on a committed baseline (no green-tree caveat). No commit/push in this step.

## Targeted Visual Grounding — Spec 038 Plan Complete

**Scope:** invoices · payments · monthlyInvoices · salaries · staffSalaries · banks · classSalaryReport · finance-flavoured analysis.

**Evidence inspected (this pass):** `src/js/pages/finance.js` (Spec-030 hub `tabs({group:'finance'})` overview/salaries/banks), `src/js/fixtures/finance.js` (INVOICES ×9, PAYMENTS ×6, SALARIES ×6, BANKS ×4, PLANNED_FINANCE ×9, FINANCE_SUMMARY count-only), `src/js/components/tabs.js`, `nav.config.js` (7 finance `disabled` locks), `tests/smoke/run.cjs` (finance block @≈958-1045 + nav010 lockedFin @≈1586-1604), `output/…/management-analysis-*`/`monthly-invoices`/`salary-class-report`, Spec 038 specify artifacts (spec/visual-grounding/registers/scopes/count-and-route).

**Current app state:**
- **finance.html** = 3-tab hub. **overview** = `financeActions()` (`.report-actions` — 4 gate buttons) + 4 status **tiles** (`.fin-tile`, filter `#invoice-list`) + **invoiceSection** (filterBar → `#invoice-list`, 9 `.fin-row [data-row]`) + **paymentsSection** (6 `.fin-pay-row` + Add/Reconcile gates) + **plannedSection** (9 `.report-card` figure-free) + 9 baked `template[data-preview="inv-*"]` drawers. **salaries** = figure-free teacher+staff boards + gates. **banks** = name+status + Add-bank drawer + gates.
- **7 nav locks**: invoices/monthlyInvoices/salaries/staffSalaries/payments/classSalaryReport/banks = `disabled` + `nav.reason.finance` + `#i-lock`.
- **Finance smoke asserts are page-wide / id-scoped** (`#invoice-list`, `.fin-pay-row`, `.fin-tile`, `.report-card`, `template[data-preview^="inv"]`, first `.report-actions`, `#page-body` regexes) — so moving sections between tabs preserves them.

**Planning decisions:** invoices→`#view=invoices`; payments→`#view=payments`; monthlyInvoices→`#view=monthly-invoices` (new board); salaries + staffSalaries→`#view=salaries` (existing figure-free tab); banks→`#view=banks` (existing); classSalaryReport→**honest lock** (kept); finance-analysis→**honest lock/deferred**. count 115→115; tests additive except the declared nav010 lockedFin supersession.

**Proceeding to plan: YES.**

## Architecture — restructure the finance hub into focused tabs (move, don't duplicate)

`finance.html` grows from 3 to **6 tabs**: **overview · invoices · payments · monthly-invoices · salaries · banks**. Existing sections are **relocated** into their focused tabs (never duplicated — duplication would double `#invoice-list`/`.fin-pay-row` and break the 9/6 asserts).

| Tab | `#view=` | Content | Source |
|---|---|---|---|
| overview | `overview` (default) | `financeActions()` (first `.report-actions`, 4 gates) + `plannedSection()` (9 `.report-card`) + the 9 baked invoice drawers + a short summary/links | existing (minus the two lists) |
| invoices | `invoices` | 4 status **tiles** + invoice **filterBar** → `#invoice-list` (9 `.fin-row` rows) + row record-payment confirm/cancelled-gate | moved `invoiceSection()` + tiles |
| payments | `payments` | 6 `.fin-pay-row` + Add/Reconcile gates | moved `paymentsSection()` |
| monthly-invoices | `monthly-invoices` | **NEW** display board — INVOICES grouped by `monthKey` (per-row amount literals, status chips), Generate/Send/PDF gates | new `monthlyInvoicesSection()` |
| salaries | `salaries` | figure-free teacher + staff boards + gates | existing (unchanged) |
| banks | `banks` | name+status + Add-bank drawer + gates | existing (unchanged) |

**Hard preservation constraints (keep every finance assert byte-verbatim):**
- `#invoice-list` stays ONE list with 9 `[data-row]`; keep tiles + filterBar + `#invoice-list` **co-located** in the invoices tab so tile→filter works in-tab and `tile.count === rowCountByStatus` holds.
- `.fin-pay-row` stays 6 (payments tab, one list).
- `.fin-tile` stays exactly 4.
- `.report-card` stays exactly 9 (the planned cards, in overview) — the monthly-invoices board must NOT use `.report-card`.
- `template[data-preview^="inv"]` stays 9 (bake the invoice drawers once — recommended in the invoices tab beside the list, or overview).
- The FIRST `.report-actions` on the page stays `financeActions()` with **≥4 `data-disabled-reason` + 0 `data-demo-action`** — keep `financeActions()` in the overview tab (tab 1) so it precedes the salaries/banks `.report-actions`.
- `#page-body` regexes (`chart|canvas|graph|score|rank|leaderboard|percentile`, `receipt|upload|type="file"`, `a[href="#"]`) stay 0 → the monthly board uses new classes (`.finm-*`, id `#fin-monthly`) and no chart/canvas/receipt.
- **monthly board is a pure display board (no filterBar)** — the page already owns ONE filterBar (invoice list); enhance.js's single global `[data-no-results]` stays uncontaminated.

## Nav & count

- **6 flips** `disabled`→`implemented`: invoices/payments/monthlyInvoices/salaries/staffSalaries/banks → `finance.html#view=…` (staffSalaries → `#view=salaries`).
- **2 kept locks**: classSalaryReport (`disabled`+reason), finance-analysis (no route; represented by the `accountingExpenses` planned card).
- No `FUTURE_ROUTES` finance entries exist → no trim. Admin menu **50**. Count **115 → 115**, **0 new pages**.
- `build-html.mjs`/`enhance.js`/`i18n.js`/`package.json` **0-diff** (fold only; `tabs()`+`#view=` already support the `finance` group; extend the existing `ar/en.fin.js`).

## Data model (see `data-model.md`)
Reuse existing `fixtures/finance.js` verbatim: INVOICES (amount literals), PAYMENTS, SALARIES (figure-free), BANKS (name+status), PLANNED_FINANCE (9). The monthly-invoices board is a **derived view** (INVOICES grouped by `monthKey`) — **no fixture change** (keep `fixtures/finance.js` read-only if possible). No new money fields; no computed totals.

## Locale (see `contracts/fixtures-locale-contract.md`)
Add tab labels + monthly-board copy to the existing mirrored `ar/en.fin.js` (`fin.tab.{invoices,payments,monthlyInvoices}` + `fin.monthly.*`). Mirrored, 0 divergence. `i18n.js` 0-diff.

## Tests (see contracts)
- Smoke (additive + the ONE declared amendment): nav010 `lockedFin` updated — the 6 unlocked items become `implemented` deep-links; classSalaryReport stays in the locked set (+finance-analysis has no nav item). New: the 6 `#view=` deep-links open the right tab on fresh load AR/EN; monthly board renders grouped rows with no computed total; salaries/banks unlock verified figure-free/no-balance. ALL existing finance asserts (9/6/4/9/9/first-actions/forbidden/no-receipt/no-mutation/tile-count) stay **byte-verbatim** (they're page-wide/id-scoped and survive the move).
- A11y: the 6 finance views × AR/EN × light/dark + mobile-390 + open-drawer; critical=0 serious=0.
- Screenshots: the 6 finance tabs + classSalaryReport honest-lock proof × AR/EN/dark/mobile; 0 console errors.

## Impact protection (see `contracts/impact-protection-contract.md`)
- **Changes (sanctioned):** `finance.html`/`.en` body (tab restructure) + the shared admin sidebar (6 nav unlocks). 
- **Byte-identical:** every other admin `#page-body`, all 16 portal pages, index, reports/families/students (Spec 037).
- **0-diff:** `package.json`, `build-html.mjs`, `enhance.js`, `i18n.js`, and ideally `fixtures/finance.js` (monthly board derives from existing data).

## Complexity / constitution check
No new dependency/engine/backend/hook/storage-key/page. Additive CSS only. Reuses `tabs`/`filterBar`/`cardGrid`/`chip`/`noResults`/`previewTemplate`/`gate()`. **Finance no-fake-money law + teacher pay-free law upheld** (authored literals + figure-free boards only; every write gated). **Constitution: PASS.**

## Phasing (for /speckit.tasks — NOT executed here)
1. Preflight/baseline gate. 2. finance.js restructure into 6 tabs (move invoiceSection→invoices, paymentsSection→payments; overview keeps financeActions+planned+drawers) + new `monthlyInvoicesSection()` + `ar/en.fin.js` tab/monthly keys + additive CSS. 3. nav.config.js 6 unlocks (keep classSalaryReport locked). 4. Smoke (nav010 lockedFin amendment + deep-links + monthly board + finance asserts preserved) + a11y + screenshots. 5. Clean-code guard + test-guard + impact proof + docs + final audit.

## Stop conditions
Stop if: count can't stay 115 · a new standalone finance page is required · classSalaryReport/finance-analysis must be unlocked to satisfy QA · any computed money/salary/payout figure is required · any fake payment/invoice/salary/bank action or success · backend/API/gateway introduced · `type=file`/`type=password` appears · `package.json`/`build-html.mjs`/`enhance.js`/`i18n.js` must change · any finance/role-law assert must weaken **beyond** the declared nav010 lockedFin supersession.

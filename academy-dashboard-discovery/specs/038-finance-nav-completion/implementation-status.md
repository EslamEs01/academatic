# Implementation Status — Spec 038 (Finance Nav Completion)

**Status: IMPLEMENTED** (awaiting the watcher commit). Branch `feature/012-role-portal-foundation`. **Baseline: HEAD `56bc418` (Specs 035/036/037 committed; working tree clean)** — no green-tree caveat. **No commit / no push** performed.

## Verdict
The finance hub grew from **3 → 6 tabs** (overview · invoices · payments · monthly-invoices · salaries · banks) by **relocating** (not duplicating) the existing invoice/payment surfaces + adding a derived monthly board. **6 finance nav locks were unlocked** to `finance.html#view=…` deep-links; **classSalaryReport stays an honest lock** and **finance-analysis stays deferred**. Count held **115**; admin menu **50**. Every backend write remains a `backendRequired` gate; no computed money. Safe to review/commit.

## Counts / invariants
- Public HTML **115 → 115** (0 new pages). Admin menu **50**.
- Nav: **6 unlocks** `disabled`→`implemented` (invoices/payments/monthlyInvoices/salaries/staffSalaries/banks → `finance.html#view=…`; staffSalaries → `#view=salaries`); **classSalaryReport kept `disabled`+`nav.reason.finance`+lock**; finance-analysis has no nav item/route (represented by the `accountingExpenses` planned card).
- **0-diff**: `src/js/fixtures/finance.js`, `package.json`, `scripts/build-html.mjs`, `src/js/enhance.js`, `src/js/i18n.js`.
- No new dependency/backend/API/gateway/hook/storage-key/page.

## Surfaces (all folded into finance.html)
| Item | Tab | Route | Notes |
|---|---|---|---|
| invoices | Invoices | `#view=invoices` | MOVED: 4 tiles + filterBar + single `#invoice-list` (9 rows) + row gates; Create/Generate/PDF/Send/Mark-Paid = gates |
| payments | Payments | `#view=payments` | MOVED: single `.fin-pay-row` list (6) + Add/Reconcile gates; serial links open `inv-*` drawer |
| monthlyInvoices | Monthly Invoices | `#view=monthly-invoices` | NEW derived board: the 9 INVOICES grouped by `monthKey` (4 groups), `.finm-*`/`#fin-monthly`, per-row literals, **no computed total**; Generate/Send/Export = gates |
| salaries + staffSalaries | Salaries | `#view=salaries` | existing figure-free teacher + staff boards (name+status+period, **no amount**); gates |
| banks | Banks | `#view=banks` | existing name+status (**no balance**); Add/Import/Reconcile = gates |
| overview | Overview | `#view=overview` (default) | financeActions (first `.report-actions`) + the 9 figure-free planned cards + the 9 baked `inv-*` drawers |
| classSalaryReport | — | (locked) | honest `disabled`+reason+lock; owner = future backend billing/accounting spec |
| finance-analysis | — | (deferred) | no nav/route; `accountingExpenses` planned card; owner = future backend spec |

## No-fake-money / role-law proof
- Authored per-row invoice/payment amount **literals** only (SAR); `FINANCE_SUMMARY` row-count-only; **0 computed** total/subtotal/outstanding/balance/net/profit/loss/revenue/VAT/tax/salary/payout/per-class-pay (the `المجموع` hits are the pre-existing `المجموعة`="group" drawer label, not a total).
- Salaries/staff boards **figure-free** (0 pay figure); banks **no balance**; monthly board **no computed total**.
- Every write final = `data-disabled-reason` gate; 0 fake mark-paid/settle/refund/reconcile/verify mutation; 0 payment gateway; 0 `<canvas>`/chart/graph; 0 `type=file`/`type=password`; 0 `href="#"`; 0 raw key.
- Teacher pay-free GLOBAL upheld (finance salary boards are the Spec-030 sanctioned figure-free exempt).

## Protected finance asserts (byte-verbatim)
9 invoice rows · 6 payment rows · 4 status tiles (tile.count===row-count) · 9 planned cards · 9 invoice drawer templates · first `.report-actions` ≥4 disabled / 0 demo · no-receipt/no-file · no-mutation · forbidden regex — all preserved (page-wide/id-scoped, survive the MOVE). **The ONE sanctioned change** = the nav010 `lockedFin` (`→['classSalaryReport']`) + `finLinks` (`→['finance','invoices','monthlyInvoices','salaries','staffSalaries','payments','banks']`) supersession, plus the mechanical 3→6 finance tab-structure assert and moving the interactive invoice checks to `#view=invoices`.

## Verification
- `npm run build` → **115 pages**, 0 raw keys, `ar/en.fin.js` parity **158/158** (0 divergence).
- `npm run test:smoke` → **PASS** (114 loads) — finance 6-tab hub + 6 deep-links (fresh-context AR/EN) + monthly board (9 across 4 groups) + salaries figure-free + banks no-balance + classSalaryReport locked + all protected finance asserts byte-verbatim.
- `npm run test:a11y` → **critical=0 serious=0** (+ finance invoices/payments/monthly-invoices × AR/EN × light/dark + mobile + invoice-drawer + bank-add drawer).
- `node tests/screenshots/capture.cjs` → 0 console errors (+ sp038 finance frames + classSalaryReport lock proof).

## Impact protection
Only `finance.html`/`.en` body (6-tab restructure) + the shared admin sidebar (6 unlocks) change. Every non-finance admin `#page-body`, all 16 portal pages, index, reports/families/students byte-identical (proven vs the captured baseline `#page-body` md5 snapshot). `fixtures/finance.js`/`package.json`/`build-html.mjs`/`enhance.js`/`i18n.js` 0-diff.

## Test-coverage hardening pass (post-implementation, test-only)
A follow-up hardening pass strengthened `tests/smoke/run.cjs` only (no app source / fixtures / locale / CSS / nav / dependency change):
- **Monthly-invoice identity**: the monthly board assert now verifies exactly 4 month groups + 9 rows, that the rendered `.finm-serial` set equals the nine authored INVOICES serials (`INV-2026-041/052/043/054/044/035/046/047/028`) with **no missing, no duplicate, each once**, exactly 9 per-row `.finm-amount`, and **no computed total/subtotal token** in the panel.
- **Exact finance nav routes** (AR + EN): per-item assertions that invoices→`#view=invoices`, payments→`#view=payments`, monthlyInvoices→`#view=monthly-invoices`, salaries→`#view=salaries`, staffSalaries→`#view=salaries`, banks→`#view=banks` are real implemented anchors (no `aria-disabled`, no lock icon); classSalaryReport stays `disabled`+`nav.reason.finance`+lock with **no route**; finance-analysis has **no nav item/route**; admin menu **50**.
- Re-verified: build 115 · smoke PASS · a11y critical=0 serious=0 · forbidden files (`fixtures/finance.js`/`package.json`/`build-html.mjs`/`enhance.js`/`i18n.js`) 0-diff · impact `#page-body` unchanged (only finance.html/.en). Additive only; all prior protected asserts + the declared nav010 supersession intact.

## Next
Watcher commit. Remaining Spec-033 roadmap: 039 (content deep-links: materials/certificateRequests), 040 (settings deep-links ×6), 041 (final sidebar/route/production re-freeze). The real billing/payroll/gateway ENGINE + classSalaryReport + finance-analysis remain future-backend (never mocked).

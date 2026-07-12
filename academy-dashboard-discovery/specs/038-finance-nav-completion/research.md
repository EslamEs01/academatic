# Research & Decisions — Spec 038

Grounded decisions D1–D38. Evidence: `finance.js`, `fixtures/finance.js`, `components/tabs.js`, `nav.config.js`, `tests/smoke/run.cjs` (finance block + nav010), legacy `output/…/management-analysis-*`, Spec 009/030/033/037 + Spec 038 specify artifacts.

| # | Decision | Resolution | Evidence / rationale |
|---|---|---|---|
| D1 | Baseline HEAD + clean tree | HEAD **56bc418**, tree clean, 035/036/037 committed | `git status`/`git log` |
| D2 | Current count | **115** | `find public … | wc -l` |
| D3 | Target count | **115** (delta 0) | all folds into finance.html |
| D4 | New page bases | **0** | finance.html is the hub |
| D5 | build-html.mjs | **0-diff** (no new page; finance already registered) | build-html PAGES |
| D6 | invoices tab architecture | `#view=invoices`; MOVE tiles + filterBar + `#invoice-list` here | finance.js `invoiceSection()`; smoke `#invoice-list`=9 (id-scoped, survives move) |
| D7 | invoices no-dup / no computed total | reuse the 9 INVOICES rows; bake invoice drawers ONCE; amount literals per-row only, NO sum | fixtures INVOICES; FINANCE_SUMMARY count-only |
| D8 | invoices gates | Create/Generate/PDF/Send/Mark-Paid = `data-disabled-reason`; cancelled row keeps disabled record-payment | existing `invoiceRowActions`/`financeActions` |
| D9 | payments tab architecture | `#view=payments`; MOVE `paymentsSection()` (6 `.fin-pay-row`) here | smoke `.fin-pay-row`=6 (page-wide) |
| D10 | payments no gateway/settlement | invoice-serial links open existing `inv-*` drawer; NO gateway/reference/settlement | finance.js `paymentRow()` |
| D11 | payments gates | Record/Confirm/Refund/Export = gates | existing Add/Reconcile gate pattern |
| D12 | monthlyInvoices tab architecture | `#view=monthly-invoices`; NEW `monthlyInvoicesSection()` grouping INVOICES by `monthKey` | INVOICES carry `monthKey` |
| D13 | monthlyInvoices no computed total | per-row amount literals grouped by month; NO monthly sum/total | no-fake-money law |
| D14 | monthlyInvoices ↔ planned card | the `monthlyInvoices` PLANNED_FINANCE card STAYS (backend-engine gate) → `plannedN===9` preserved; the tab is additive display | smoke `plannedN===9` |
| D15 | salaries unlock | `#view=salaries` (existing figure-free tab) | finance.js `salariesSection()` |
| D16 | salaries figure-free | 0 pay/salary/rate/payout/currency amount; Generate/Approve/Mark-paid/Export = gates | SALARIES status-only; teacher pay-free law |
| D17 | staffSalaries route | `#view=salaries` (reuse the staff board in the salaries tab; NO separate tab) | SALARIES role:'staff' rows exist |
| D18 | staffSalaries figure-free | same figure-free law | — |
| D19 | banks unlock | `#view=banks` (existing name+status tab) | finance.js `banksSection()` |
| D20 | banks no balance/reconcile | name+status only; Add/Import/Reconcile/Verify = gates | BANKS name+status |
| D21 | classSalaryReport | **HONEST LOCK** (kept `disabled`+reason); NOT unlocked | a real class-salary report ⇒ computed per-class pay (forbidden) |
| D22 | classSalaryReport owner + reason | future backend billing/accounting spec; keep `classSalaryReport` PLANNED_FINANCE card; reason `nav.reason.finance` | preserves honesty |
| D23 | finance-analysis | **HONEST LOCK / DEFERRED**; no nav item, no route, no tab | analysis-expenses/invoices ⇒ computed profit/loss/revenue/VAT (forbidden) |
| D24 | finance-analysis owner | future backend billing/accounting spec; represented by `accountingExpenses` planned card | Spec 037 finance-free carryover |
| D25 | nav.config exact changes | 6 unlocks (invoices/payments/monthlyInvoices/salaries/staffSalaries/banks) → `finance.html#view=…`; classSalaryReport unchanged; no FUTURE_ROUTES edit | nav.config finance sub-section |
| D26 | lockedFin smoke supersession | rewrite nav010 `lockedFin`/`lockedOk`: the 6 unlocked become `implemented` deep-link asserts; classSalaryReport stays in the locked set | the ONE declared protected-assert change (Spec-030 precedent) |
| D27 | PLANNED_FINANCE preservation | keep all 9 cards → `plannedN===9` byte-verbatim | display tabs are additive, not replacements |
| D28 | finance overview preservation | overview keeps `financeActions()` (first `.report-actions`, ≥4 disabled/0 demo) + 9 planned cards + 9 baked drawers | first-`.report-actions`/plannedN/drawers asserts |
| D29 | locale strategy | extend existing `ar/en.fin.js` (`fin.tab.*` + `fin.monthly.*`); mirrored 0-divergence; i18n 0-diff | i18n registers fin |
| D30 | fixture strategy | reuse `fixtures/finance.js` as-is; monthly board derives from INVOICES; **prefer 0-diff on the fixture** | no new money data |
| D31 | CSS strategy | additive-only (`.finm-*` monthly board); no change to `.fin-row`/`.fin-tile`/`.report-card` | avoid breaking scoped asserts |
| D32 | smoke strategy | additive + nav010 lockedFin amendment; 6 deep-links; monthly board; finance asserts byte-verbatim | finance block page-wide/id-scoped |
| D33 | a11y strategy | +6 finance views × AR/EN × light/dark + mobile + open-drawer; 0/0 | additive |
| D34 | screenshot strategy | 6 finance tabs + classSalaryReport lock proof × AR/EN/dark/mobile; 0 errors | additive |
| D35 | role-law/no-fake carryover | finance no-fake-money, teacher pay-free, family zero-pay, student child-view, no-computed, no-fake-wording — byte-verbatim (except nav010) | carryover contract |
| D36 | impact protection | only finance.html body + shared sidebar change; all else byte-identical; package/build-html/enhance/i18n 0-diff | stash-rebuild proof at implement |
| D37 | allowed/forbidden files | allowed: finance.js, nav.config.js, ar/en.fin.js, app.css, tests, docs, spec; read-only: fixtures/finance.js; forbidden: package.json, build-html.mjs, enhance.js, i18n.js, gateway/backend, other pages | scope-guard |
| D38 | risks / stop conditions | nav010 lockedFin amendment; no-fake-money boundary; classSalaryReport/finance-analysis stay locked; preserve finance asserts under the tab move | see plan Stop conditions |

## Key risk register
1. **Move-not-duplicate**: relocating `invoiceSection`/`paymentsSection` into focused tabs must not duplicate `#invoice-list`/`.fin-pay-row` (would break the 9/6 asserts). Verified the asserts are id/page-scoped → a clean move preserves them.
2. **nav010 lockedFin amendment** — the single declared protected-assert change; must keep classSalaryReport in the locked set and assert the 6 unlocked as real deep-links.
3. **No-fake-money boundary** — amount literals per-row only; salaries/class figure-free; banks no balance; monthly board no computed total; every write gated.
4. **classSalaryReport / finance-analysis stay locked** — resisting the urge to fake computed pay/aggregates; honest locks are the correct outcome.
5. **Monthly board classes** — must avoid `.fin-row`/`.fin-pay-row`/`.fin-tile`/`.report-card`/`#invoice-list` to not inflate the scoped counts; no filterBar (single global no-results).

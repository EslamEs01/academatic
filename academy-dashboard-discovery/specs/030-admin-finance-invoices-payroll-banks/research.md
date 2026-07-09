# Spec 030 — Research & Decisions (D1–D42)

All decisions resolved. Evidence under `academy-dashboard-discovery/`. Baseline: HEAD `4be3e87`; **Spec 029
UNCOMMITTED** (working-tree baseline, accepted for planning only); public HTML 97; `app/public/finance.html`
0-diff; build/smoke green.

| # | Decision | Resolution | Rationale / evidence |
|---|---|---|---|
| D1 | Evidence gate sufficient? | **PASS** | specify 3-agent audit + finance-source re-reads; `visual-grounding.md` |
| D2 | Spec 029 baseline status | **UNCOMMITTED → accepted for PLANNING (docs-only); implementation STOP until 029 watcher commit** | HEAD `4be3e87`=Spec 028; 029 in working tree; plan writes only to 030 spec dir (cannot mix) |
| D3 | Current count = 97? | **Yes** | `find public -name '*.html' \| wc -l` = 97; finance.html 0-diff |
| D4 | Final count after 030 | **97** | tabbed fold; no page justified |
| D5 | Spec-009 supersession amendment | Declared contract; lift finance-freeze/body-byte/9-cards; keep permanent guarantees | `contracts/spec-009-supersession-contract.md` |
| D6 | finance.html tabbed hub vs pages | **Tabbed hub** (Overview·Salaries·Banks); count 97 | `PLANNED_FINANCE` maps 1:1 to sub-domains; `data-tab` precedent (course/group) |
| D7 | Invoices: fold vs page | **Fold** (Overview tab, existing list) | already present; no page needed |
| D8 | Monthly invoices | **Fold** status-first (or planned card) | thin Parent/Status |
| D9 | Payments | **Deepen** in Overview; Add/Verify/Refund/Reconcile gates | already present |
| D10 | Salaries | **Fold → Salaries tab**, STATUS-FIRST FIGURE-FREE | grounded; figure-free law |
| D11 | Staff salaries | **Fold** into Salaries tab, FIGURE-FREE | thin |
| D12 | Class salary report | **Figure-free fold OR gate** | computed group-by/sum forbidden |
| D13 | Banks | **Fold → Banks tab** + Add modal | simple name/status |
| D14 | Payouts | **Status-first fold OR gate**, FIGURE-FREE | approve→pay money movement banned |
| D15 | Expense | **Status-first fold OR gate** (single literal, no total) | planning decides |
| D16 | Accounting hub | **Status-first OR planned gate**; NO aggregate/chart | P&L/Net Income forbidden |
| D17 | analysisExpenses / analysisInvoices | **Status counts OR gate**; NO P&L/chart | Chart.js evidence only |
| D18 | Finance menu coverage strategy | `nav.config.js` **0-diff**; disabled sub-items = honest future-backend gates for the real engine; display folds in-hub | design intent (nav.config:78-81) + Spec-029 folded precedent |
| D19 | Current action inventory resolution | every existing action honest; deepen via tabs + gates | `current-finance-action-inventory.md` |
| D20 | F-A…F-V resolution | see plan §7-13 + `missing-action-register.md` | all rows resolved |
| D21 | Invoice/payment amount literal | single authored literal per row; no aggregate | Spec-009-sanctioned |
| D22 | Salary/payout figure-free | STATUS-FIRST boards; NO amount anywhere | standing "zero pay figures" law |
| D23 | No runtime calculation | no sum/total/balance/net/group-by; row counts only | `amount-and-calculation-scope.md` |
| D24 | No chart/canvas | none; legacy ApexCharts/Chart.js evidence only; sparkline not a metric | `contracts/no-chart-finance-contract.md` |
| D25 | Print reclassification | `data-demo-action` → `disabled-with-reason` gate (F-J) | Spec 029 R-G precedent |
| D26 | Record/Mark-paid/Send-reminder | keep backendRequired confirm; NO status mutation | existing Spec-009 guarantee kept |
| D27 | Export/download/PDF/CSV | all disabled-with-reason gates; no file | F-L |
| D28 | Bank Add/Edit/Import/Reconcile | Add/Edit = modal (name only); Import/Reconcile = gates; no credentials | F-G |
| D29 | Payout providers / gateway creds | future-backend/excluded; NEVER rendered | `future-owner-register.md`; F-R/F-S |
| D30 | Fixture strategy | extend `fixtures/finance.js`: SALARIES/BANKS/(PAYOUTS) FIGURE-FREE; FINANCE_SUMMARY row-count-only | `data-model.md` |
| D31 | Locale AR/EN mirrored | extend `ar/en.fin.js`: `fin.tab.*`/`fin.sal.*`/`fin.bank.*`/`fin.payout.*` + gate reasons | i18n merge (`*.fin.js`) |
| D32 | CSS additive only | reuse `.fin-*`/`.sheet-row`/chips + existing `data-tab` styles | `app.css` |
| D33 | Closed hook strategy | `data-tab`/`data-filter[-set]`/`data-drawer`/`data-modal-trigger`/`data-confirm`/`data-disabled-reason`; NO new hook | `enhance.js` |
| D34 | Smoke plan | additive block (tabs/salaries/banks/no-figure/no-file/no-secret/no-chart/no-mutation) + declared supersession; protected asserts byte-verbatim | `contracts/smoke-rescope-contract.md` |
| D35 | A11y plan | +rows: salaries tab, banks tab, drawer, add-bank modal, export gate; dark/light; mobile 390; 0/0 | `contracts/mobile-a11y-screenshot-contract.md` |
| D36 | Screenshot plan | overview/invoices/payments/salaries/class-report/banks/drawer/modal/gate/mobile/dark; REVIEW.md | same |
| D37 | Role-law protection | teacher pay-free · family zero-pay · student child-view; finance salary boards figure-free | `contracts/*-contract.md` |
| D38 | 026/027/028/029 protection | prior pages byte-identical; only finance.html changes | `contracts/spec-026-027-028-029-protection-contract.md` |
| D39 | Impact protection | only finance HTML changes; package.json/nav.config/enhance 0-diff | `contracts/impact-protection-contract.md` |
| D40 | Allowed/forbidden files | see plan §19 | `contracts/scope-guard.md` |
| D41 | Risks & stop conditions | see plan §20 | `contracts/scope-guard.md` |
| D42 | Final menu-coverage proof | smoke: six-wallet-locked + membership byte-verbatim + salaries/banks tabs render | `contracts/finance-menu-coverage-contract.md` |

## Key research notes

- **Why a tabbed hub, not new pages**: the 9 `PLANNED_FINANCE` cards already map 1:1 to the finance sub-domains
  and the `data-tab` mechanism is proven (course/group/student). Folding keeps count 97, `nav.config.js`
  0-diff, and minimizes churn (Overview tab keeps the existing invoice/payment content behavior-identical). A
  standalone `invoices.html`/`salaries.html`/`banks.html` fails the page-candidate test at Q3 (folds cleanly).
- **Why nav stays disabled-with-reason**: the finance sub-items represent the REAL billing/payroll/bank BACKEND
  (create/pay/generate/import) which genuinely requires the server — 030 builds only the display preview
  in-hub. A disabled-with-reason item is honest + non-dead (smoke already asserts "disabled+reason"). This
  matches the nav.config design intent ("the rest stay disabled-with-reason until the real billing backend
  exists") and the Spec-029 folded-capability precedent (familyCategories/teacherCategories).
- **Why salaries/payouts are FIGURE-FREE**: the standing law (Spec 016/024-B-09) forbids salary/payroll/
  compensation/payout FIGURES anywhere, even on admin finance pages — only invoice/payment amount literals are
  Spec-009-sanctioned. Legacy salaries showed live EUR figures + "Generate Salary" money-movement — 030 shows
  name+status only and gates the actions.
- **Why no aggregates/charts**: legacy accounting/analysis computed Net Income/P&L and used ApexCharts/Chart.js
  — both forbidden. 030 shows status-first counts or planned gates; row counts by status are allowed (they are
  not money figures).
- **Why the Spec-009 supersession is safe**: 030 changes finance.html structure (tab-wrap + new tabs) but keeps
  every permanent guarantee (no arithmetic, no chart, no mutation-on-confirm, no receipt, row-count roll-ups,
  amount-literals-only, no pay figure). The freeze was a Spec-009-era gate for a page nobody was allowed to
  touch yet; 030 is the sanctioned owner. The supersession is DECLARED via a contract, not silent (precedent:
  the 018/020/022 declared-hash supersessions).
- **Baseline caution**: Spec 029 uncommitted → planning is docs-only and safe; implementation must wait for the
  029 watcher commit to avoid mixing app changes. `docs/` mirror drift is out of scope.

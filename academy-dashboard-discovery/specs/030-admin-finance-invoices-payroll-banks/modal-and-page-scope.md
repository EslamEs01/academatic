# Spec 030 — Modal & Page Scope

Per-surface page/fold/modal/drawer/gate decision + count policy. The EXACT count is fixed in `/speckit.plan`;
specify sets the default preference and the page-candidate test.

## Count policy

- **Default preference**: keep the count as low as possible — fold simple finance sub-sections into
  `finance.html` (tabs/sections) where it stays clean and navigable.
- A standalone page is allowed ONLY if the surface (a) is legacy-grounded, (b) is in the finance menu, (c)
  cannot be honestly folded into `finance.html` (fold would be cramped/dishonest), (d) cannot be a drawer/modal,
  and (e) has a justified AR/EN (+2) delta with added smoke/a11y/screenshot coverage.
- No accidental removals; no unrelated additions.

## Surface → mechanism

| Surface | Mechanism | Rationale | Count impact |
|---|---|---|---|
| Finance overview | existing page, deepen | `finance.html` exists; becomes the finance hub | 0 |
| Invoice detail | **drawer** (`previewTemplate`/`sheetRow`) | already exists; read-only | 0 |
| Invoices list | **fold (tab/section) in finance.html** OR **page** | grounded, large; fold preferred | 0 (fold) or +2 (page) |
| Monthly invoices | **fold** (status-first) | thin Parent/Status list | 0 |
| Payments | **fold** (deepen existing payments section) | already partially present | 0 |
| Salaries (teacher) | **fold or page** — STATUS-FIRST FIGURE-FREE | grounded; figure-free board | 0 (fold) or +2 (page) |
| Staff salaries | **fold** — STATUS-FIRST FIGURE-FREE | thin | 0 |
| Class salary report | **gate** or fold (figure-free) | computed engine forbidden | 0 |
| Banks | **fold or page** | name/status list + Add modal | 0 (fold) or +2 (page) |
| Payouts | **fold** — STATUS-FIRST FIGURE-FREE | figure-free | 0 |
| Expense | **fold** (status-first) or gate | single-value literal | 0 |
| Accounting hub / analysis (P&L/Net Income) | **planned gate** or status-first count | aggregate + chart forbidden | 0 |
| Create/Edit invoice / Add bank | **modal** (backendRequired) | bounded write | 0 |
| Mark-paid / Record-payment / Generate-salary / Approve-payout / Import / Reconcile | **gate** (confirm / disabled-with-reason) | no money movement | 0 |
| Export / Print / PDF / CSV / Download | **gate** | no real file | 0 |

## Finance-menu missing-page decisions

| Nav item | Decision | Why |
|---|---|---|
| invoices | fold-into-finance (tab) OR page | large + grounded; planning runs page-candidate test |
| monthlyInvoices | fold (status-first) | thin |
| salaries / staffSalaries | fold (status-first figure-free) OR page | grounded; figure-free |
| payments | fold (deepen) | already present |
| classSalaryReport | gate or fold (figure-free) | engine forbidden |
| banks | fold OR page | simple; Add modal |
| payouts / expense / accounting / analysis | fold (status-first) or planned gate | figure/chart forbidden |

## Expected count

- **Planning default: 97** (fold finance sub-surfaces into `finance.html` via tabs/sections). Finance.html
  becomes a tabbed hub (overview · invoices · payments · salaries · banks · …).
- **Upper bound if pages are justified**: each justified standalone finance page adds +2 (AR+EN). Candidates
  most likely to justify a page (if the finance.html tab-hub becomes cramped): `invoices`, `salaries`, `banks`.
  Planning must run the page-candidate test per candidate and build-verify the exact number. Specify does NOT
  fix a number > 97.

## Page-candidate test (per candidate, answered in planning)

1. Legacy-grounded? (cite) 2. In the finance menu? (cite nav id) 3. Can it fold into finance.html? (why not)
4. Can it be a drawer/modal/gate? (why not) 5. Does a standalone route reduce clutter enough to justify? (IA
argument) 6. AR/EN delta (+2 exactly)? 7. Which smoke/a11y/screenshot checks added?

Any candidate that fails 3–5 is folded or gated, not built as a page.

## Spec-009 supersession (declared)

Because 030 modifies `finance.html`, planning MUST add a new `finance-impact-contract.md` (or equivalent) that
declares the supersession of `specs/011-…/contracts/finance-impact-contract.md:7`: lift the file-freeze /
`#page-body` byte-identical / 9-planned-card clauses; KEEP the permanent guarantees (no arithmetic, no chart,
no mutation-on-confirm, no receipt, row-count roll-ups, no finance-leak on dashboard/reports bodies). Update the
finance smoke counts (invoice/payment/drawer/planned) with a declared amendment.

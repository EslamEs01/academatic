# Targeted Visual Grounding — Spec 038 (Finance Nav Completion)

**Method:** direct source + fixture + built-HTML + legacy inspection (no reliance on memory). Run before writing spec artifacts.

## Baseline (verified)
- **HEAD `56bc418`** — Specs 035/036/037 are **COMMITTED** (bundled in that commit: "navigation completion for family, student, teacher, and analytics reporting"). **Working tree CLEAN.** count **115**. branch `feature/012-role-portal-foundation`. feature.json → 038. **The baseline-commit gate is satisfied — no uncommitted-tree caveat.**

## Scope
invoices · monthlyInvoices · salaries · staffSalaries · payments · classSalaryReport · banks · finance-flavoured analysis (analysis-expenses/analysis-invoices).

## Evidence inspected (exact paths)
- `src/js/pages/finance.js` (Spec-030 tabbed hub: `tabs({group:'finance'})` → overview·salaries·banks).
- `src/js/fixtures/finance.js` (INVOICES ×9, PAYMENTS ×6, SALARIES ×6 [4 teacher + 2 staff], BANKS ×4, PLANNED_FINANCE ×9, FINANCE_SUMMARY row-count-only).
- `src/js/nav.config.js` (Reports category → Finance sub-section: `finance` implemented → `finance.html`; **7 `disabled`+`nav.reason.finance`+lock**: invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks).
- `tests/smoke/run.cjs` (nav010 `lockedFin`/`lockedOk` @1586-1604 — all 7 finance items must be disabled+reason+lock; finance block: 9 invoices, 6 payments, 9 planned cards, `forbidden` regex, no-mutation, no-receipt).
- `output/combined/page-inventory.md` + `output/roles/admin/pages/management-{analysis-expenses,analysis-invoices,monthly-invoices,salary-class-report}.md`.
- Prior specs 009 (finance shell), 030 (finance tabbed hub + salaries/banks), 033 (roadmap: 038 owns finance), 037 (deferred finance analysis → 038).

## Legacy capabilities found
- **invoices**: family billing list (serial/family/course/month/amount/status). **monthlyInvoices**: per-month billing roll-up. **payments**: recorded/pending/returned. **salaries / staffSalaries / salary-class-report**: payroll (money). **banks**: accounts. **analysis-expenses / analysis-invoices**: finance BI aggregates (profit/loss/expense/revenue). All money-centric.

## Current frontend state
- **finance.html** = 3-tab hub (`#view=overview` default · `#view=salaries` · `#view=banks`).
- **invoices**: 9 authored rows (amount literals + status chips + status/family filter + baked drawers) in **Overview**. nav = `disabled` lock.
- **payments**: 6 authored rows (amount + method + status) + Add/Reconcile gates in **Overview**. nav = `disabled` lock.
- **salaries / staffSalaries**: FIGURE-FREE teacher + staff status boards (name+status+period, **no amount**) + Generate/Approve/Mark-paid/Export gates in the **Salaries** tab. nav = `disabled` locks.
- **banks**: name+status list (**no balance**) + Add-bank name-only drawer + Import/Reconcile gates in the **Banks** tab. nav = `disabled` lock.
- **monthlyInvoices / classSalaryReport / accounting-expenses**: exist only as 3 of the 9 figure-free **planned cards** in Overview. nav = `disabled` locks.
- **current disabled reasons**: all 7 = `nav.reason.finance` ("requires the real billing backend") + `#i-lock` icon.

## Implementation decision (recommended; /speckit.plan finalizes)
Fold everything into `finance.html` tabs (0 new pages, count 115, admin-menu 50) by **unlocking** the nav locks → `implemented` deep-links to honest display surfaces (writes stay `backendRequired`):
- invoices → `finance.html#view=invoices` · payments → `finance.html#view=payments` · monthlyInvoices → `finance.html#view=monthly-invoices` (promote planned card → authored monthly board, amount literals, **no computed total**) · salaries → `finance.html#view=salaries` (figure-free, exists) · staffSalaries → `finance.html#view=salaries` (staff board) or `#view=staff-salaries` · banks → `finance.html#view=banks` (exists).
- **classSalaryReport** → figure-free per-class status board `finance.html#view=class-salary-report` **OR keep honest lock** (open decision — a real class salary report implies computed per-class pay, forbidden).
- **finance-analysis** → **honest lock / deferred** (inherently computed expense/revenue aggregates; keep the `accountingExpenses` planned card as the honest gate; a figure-free categorical board only if genuinely non-misleading).

## Forbidden for this scope
no fake invoice/payment/salary/bank calculation · no computed total/outstanding/balance/net/profit/loss/revenue/VAT/tax/salary/payout · no fake mark-paid/settle/refund/reconcile mutation · no fake generate/PDF/export/download/send/receipt · no payment gateway (PayPal/Paymob/Stripe) · no backend/API · no weakening the finance no-fake-money law or teacher pay-free law.

## Key open decisions for /speckit.plan
1. **Unlock vs keep-locked**: unlocking the finance nav items requires a **sanctioned amendment** to the nav010 `lockedFin`/`lockedOk` assert (currently all 7 locked) — declared supersession (Spec-030 precedent). Which items unlock vs stay locked?
2. **Tab granularity**: dedicated tab per nav item (Invoices/Payments/Monthly/Salaries/Staff/Class/Banks) vs deep-link multiple items to shared tabs (overview/salaries/banks). Count 115 either way.
3. **classSalaryReport + finance-analysis**: figure-free board vs honest lock.
4. **9 planned cards**: keep as-is (they represent the real backend engine; `plannedN===9` preserved) — recommended — vs prune promoted items (would amend the assert).

## Proceeding to specify: YES.

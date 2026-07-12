# Page-vs-Fold / Lock Decision Register — Spec 038

For each finance item: standalone page vs folded tab vs honest lock, with reason, evidence, route, count. **Recommendation = fold into `finance.html` tabs (count 0).** Standalone alternative documented for /speckit.plan.

| Item | Decision (recommended) | Reason | Evidence | Route | Count | Alternative |
|---|---|---|---|---|---|---|
| invoices | **folded tab** on finance.html | authored invoice list already exists in Overview; finance.html is the hub | finance.js `invoiceSection()`; INVOICES ×9 | `finance.html#view=invoices` | 0 | standalone `invoices.html` (+2) |
| payments | **folded tab** | authored payment list already in Overview | finance.js `paymentsSection()`; PAYMENTS ×6 | `finance.html#view=payments` | 0 | standalone `payments.html` (+2) |
| monthlyInvoices | **folded tab** (promote planned card) | INVOICES carry `monthKey` → group by month; no new data | fixtures INVOICES; PLANNED_FINANCE `monthlyInvoices` | `finance.html#view=monthly-invoices` | 0 | standalone (+2) |
| salaries | **folded tab** (exists) | Spec-030 figure-free teacher board already built | finance.js `salariesSection()`; SALARIES role:'teacher' | `finance.html#view=salaries` | 0 | — |
| staffSalaries | **folded** → salaries tab staff board | staff board already in the salaries tab | SALARIES role:'staff' | `finance.html#view=salaries` (or `#view=staff-salaries`) | 0 | dedicated tab (still count 0) |
| classSalaryReport | **figure-free tab OR honest lock** (open) | a real class-salary report = computed per-class pay (forbidden); a figure-free version is thin | PLANNED_FINANCE `classSalaryReport` | `finance.html#view=class-salary-report` / (locked) | 0 | honest lock (count 0) |
| banks | **folded tab** (exists) | Spec-030 name+status board already built | finance.js `banksSection()`; BANKS ×4 | `finance.html#view=banks` | 0 | — |
| finance-analysis | **honest lock / deferred** | computed profit/loss/expense/revenue aggregates cannot be shown honestly | PLANNED_FINANCE `accountingExpenses`; legacy analysis-expenses/invoices | (locked) | 0 | figure-free categorical board (risky) |

## Rationale

- **Fold-first + no-fake-money:** `finance.html` is already the consolidated finance hub (Spec 030). Every finance item can be hosted as a tab (existing or promoted) with authored/figure-free data → **count 115, 0 new pages**. Standalone finance pages would duplicate the hub shell and scatter money surfaces.
- **Unlock, don't fake:** the items are currently `disabled` locks because the *write* engine needs a backend. But honest *display* surfaces exist (Spec 009/030). Per the core law ("show the surface first; gate the final"), unlocking the nav to the display board + gating writes is more honest than a blanket lock — for the items that HAVE an honest surface.
- **Keep locked when honesty demands it:** classSalaryReport and finance-analysis inherently imply computed money; if a figure-free board would be misleading or empty, they stay honest locks (documented), which is the correct outcome — not every item must unlock.

## Standalone bundle (if ever chosen) — explicit count
| Choice | New bases | Count after |
|---|---|---|
| invoices + payments standalone | 2 | 119 |
| + monthly-invoices/class-salary/banks standalone | +N | explicit per base (+2 each) |
| **Recommended** | **0** | **115** |

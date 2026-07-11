# Spec 038 — Finance Nav Completion (Invoices / Payments / Monthly Invoices / Salaries / Staff Salaries / Class Salary Report / Banks)

**Status:** SPECIFIED (documentation only). **Feature dir:** `academy-dashboard-discovery/specs/038-finance-nav-completion/`. **Branch:** `feature/012-role-portal-foundation`. **Baseline HEAD:** `56bc418`. **Count before:** 115.

> ✅ **Baseline is committed & clean.** HEAD `56bc418` bundles Specs 035 + 036 + 037 (the watcher committed them); the working tree is clean. The baseline-commit gate is satisfied — implementation of Spec 038 may proceed on a committed baseline (no green-tree caveat). This `/speckit.specify` step still touches only `.specify/feature.json` + files under this spec folder.

## Why this spec exists

Spec 033 assigned the remaining **Finance** locked sidebar items to Spec 038, and Spec 037 explicitly deferred all finance-flavoured reports/analysis to Spec 038. The seven finance items are currently honest **locks** (`disabled` + reason + lock icon) in the Reports→Finance sub-section:

`invoices` · `monthlyInvoices` · `salaries` · `staffSalaries` · `payments` · `classSalaryReport` · `banks`

plus the finance-flavoured legacy analytics excluded from Spec 037: `analysis-expenses`, `analysis-invoices`, `monthly-invoices`, `salary-class-report`.

Spec 038 completes finance nav **honestly** — surfacing the display boards that already exist (Spec 009/030) and gating every backend write — **without ever creating fake business truth**.

## Binding finance no-fake-money law (Spec 009/030 invariant)

- **Allowed:** authored per-row amount **literals** (invoices/payments/monthly — clearly demo, unit SAR, never derived); row-**count** roll-ups only (`FINANCE_SUMMARY`); **figure-free** salary/staff/class boards (name + status + period, no amount); bank name + status (no balance); status chips as authored labels; filters over authored rows; read-only drawers; `backendRequired` final actions; honest locks; deep-links to finance tabs; folded boards in `finance.html`.
- **Forbidden:** computed total / subtotal / outstanding / balance / net / due-sum / profit / loss / revenue / VAT / tax / salary / payout / per-class-pay; fake invoice/receipt/PDF generation; fake export/download/send/email; fake mark-paid / settle / confirm / refund / reconcile / verify **mutation**; payment gateway (PayPal/Paymob/Stripe); real invoice/payroll run; backend/API/database/auth. **If a finance item cannot be surfaced honestly without fake numbers, it stays an honest lock and the reason is documented.**

## Grounding verdict (see `visual-grounding.md`)

`finance.html` is already a Spec-030 tabbed hub (`overview`/`salaries`/`banks`). The domain is largely built: 9 authored invoices + 6 payments (amount literals) in Overview; figure-free teacher+staff Salaries tab; name+status Banks tab; 9 figure-free planned cards; `FINANCE_SUMMARY` row-count-only. The 7 nav items are `disabled` locks. So Spec 038 mainly **unlocks** the nav to point at existing honest surfaces (+ promotes monthlyInvoices to a display tab), keeping every write gated.

## Recommended decisions (count-preserving; /speckit.plan finalizes)

| Item | Disposition | Route | Count |
|---|---|---|---|
| invoices | unlock → dedicated tab (existing rows) | `finance.html#view=invoices` | 0 |
| payments | unlock → dedicated tab (existing rows) | `finance.html#view=payments` | 0 |
| monthlyInvoices | promote planned card → authored monthly board | `finance.html#view=monthly-invoices` | 0 |
| salaries | unlock → existing figure-free tab | `finance.html#view=salaries` | 0 |
| staffSalaries | unlock → salaries tab staff board (or dedicated) | `finance.html#view=salaries` | 0 |
| classSalaryReport | figure-free per-class board **OR honest lock** (open) | `finance.html#view=class-salary-report` / (locked) | 0 |
| banks | unlock → existing tab | `finance.html#view=banks` | 0 |
| finance-analysis | **honest lock / deferred** (computed money) | (locked; `accountingExpenses` planned card) | 0 |

**Recommended count target: 115 → 115 (Option A — fold all into finance.html tabs; 0 new page bases; admin menu 50).** Alternatives (standalone invoices/payments pages) quantified in `count-and-route-contract.md`; not recommended (the finance hub already exists; consolidation preserves the no-fake-money invariant).

**Central sanctioned amendment:** unlocking finance nav items changes the nav010 `lockedFin`/`lockedOk` smoke assert (currently all 7 must be `disabled`+lock). Spec 038 declares a supersession (Spec-030 precedent): unlocked items move out of the locked set; any deferred item (classSalaryReport/finance-analysis) stays locked. **Key open decisions for /speckit.plan:** which items unlock vs stay locked; tab granularity; whether classSalaryReport/finance-analysis get figure-free boards or stay locked.

## User Scenarios & Testing

### US1 — Invoices (P1)
Admin opens **Invoices** → a clear invoice surface (authored rows, status chips, filter, detail drawer) instead of a lock; Create/Generate/PDF/Send/Mark-Paid = `backendRequired` gates.
- **Acceptance:** `finance.html#view=invoices` opens on fresh load AR/EN; authored invoice rows render; no computed total/balance; no status mutation; writes gated.

### US2 — Payments (P1)
Admin opens **Payments** → authored payment rows (date/family/invoice/amount literal/method/status); Record/Confirm/Refund/Export = gates.
- **Acceptance:** `finance.html#view=payments` opens AR/EN; no computed settlement; no mutation; writes gated.

### US3 — Monthly Invoices (P1)
Admin opens **Monthly Invoices** → an authored month-grouped invoice board; Generate/Send/PDF = gates.
- **Acceptance:** `finance.html#view=monthly-invoices` opens AR/EN; amount literals only, **no computed monthly total**; no mutation.

### US4 — Salaries (P1)
Admin opens **Salaries** → a **figure-free** teacher salary board (name+status+period, no amount); Generate/Approve/Mark-paid/Export = gates.
- **Acceptance:** `finance.html#view=salaries` opens AR/EN; **0 pay/salary figure**; no computed salary; writes gated.

### US5 — Staff Salaries (P1)
Admin opens **Staff Salaries** → a **figure-free** staff salary board.
- **Acceptance:** the staff board renders figure-free; 0 pay figure; no computed salary; writes gated.

### US6 — Class Salary Report (P2)
Admin opens **Class Salary Report** → a figure-free per-class status board **or** an honest lock (documented) — never computed per-class pay.
- **Acceptance:** the decision is recorded; if a board ships it is figure-free (0 salary amount); if locked, the reason is honest; no computed calculation.

### US7 — Banks (P1)
Admin opens **Banks** → a bank-accounts board (name + status, **no balance**); Add/Import/Reconcile/Verify = gates.
- **Acceptance:** `finance.html#view=banks` opens AR/EN; no fake balance/reconciliation; writes gated.

### US8 — Finance no-fake-money + carryover (P1)
QA verifies the finance no-fake-money law and all prior role-law/no-fake contracts remain green.
- **Acceptance:** no computed money anywhere; every finance write gated; the finance 9-invoices/6-payments/9-planned/forbidden-regex/no-mutation/no-receipt asserts + teacher pay-free + admin-menu-50 stay byte-verbatim; the ONE sanctioned change = the nav010 lockedFin assert (unlock).

## Functional Requirements

- **FR-001** Targeted Visual Grounding run + recorded (done in `visual-grounding.md`).
- **FR-002…FR-008** Each of the 7 finance items covered with a page-vs-fold/lock decision (see per-item scope files + `finance-nav-completion-register.md`).
- **FR-009** Finance-flavoured analysis ownership decided (recommended: honest lock/deferred; `finance-analysis-scope.md`).
- **FR-010** Count target evidence-based (recommended 115; alternatives explicit).
- **FR-011** Nav changes evidence-based and scoped to the finance items only; admin menu stays 50; no accidental removals.
- **FR-012** No fake invoice/payment/salary/bank calculation; no computed total/balance/profit/loss/revenue/VAT/tax/salary/payout.
- **FR-013** No fake generate/PDF/export/download/send/receipt; no fake mark-paid/settle/refund/reconcile/verify mutation; no payment gateway; every write = `backendRequired` gate.
- **FR-014** No backend/API/auth/database/websocket/external request; no `type=file`/`type=password`/secret; no `href="#"`/raw keys/dead buttons; no `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` change.
- **FR-015** Salaries/staff/class boards stay **figure-free** (teacher pay-free GLOBAL + salary-figure-never-shown law).
- **FR-016** AR/EN locale parity; RTL/LTR; mobile 390; a11y critical=0 serious=0; screenshots; additive smoke coverage.
- **FR-017** All prior role-law/no-fake/finance asserts stay byte-verbatim except the declared nav010 lockedFin amendment.

## Key Entities (display-only; reuse existing `fixtures/finance.js`)

- **Invoice** (existing): serial, family, course, month, **authored amount literal**, status chip.
- **Payment** (existing): date, family, invoice link, amount literal, method chip, status chip.
- **Salary row** (existing): name, status, period — **figure-free** (role teacher/staff).
- **Bank** (existing): name, status — **no balance**.
- **Monthly invoice** (derived view of existing INVOICES grouped by month — no computed total).
- **Class salary status** (new, if built): class + teacher + categorical status — **figure-free**.

## Non-goals

Implement now · plan.md/tasks.md · commit/push · touch app source except `.specify/feature.json` · backend/API/auth/database · payment gateway · generate real invoices/PDFs · send real receipts/emails · compute salary/profit/loss/VAT/tax · mutate payment status / mark invoice paid · fake bank balance · weaken existing no-fake-money/role-law tests.

## Assumptions

- `finance.html`'s existing Overview/Salaries/Banks content is preserved; new views are additive tabs (the 9 planned cards stay — they represent the real backend engine; `plannedN===9` preserved).
- The `tabs()`/`#view=` mechanism opens the correct tab on fresh load (enhance.js, proven by Specs 030/035/036/037).
- Authored SAR amount literals on invoices/payments/monthly are Spec-009-sanctioned demo data (per-row only, never aggregated).
- Materials/certificateRequests → Spec 039; settings×6 → Spec 040; final re-freeze → Spec 041 (not this spec).

## Dependencies

- Spec 009 (finance shell), Spec 030 (finance tabbed hub + salaries/banks), Spec 033 (owner map), Spec 037 (deferred finance analysis).

## Success Criteria

- **SC-001** Every finance nav item resolves to a clear honest surface or a documented honest lock; none is a vague/dead route.
- **SC-002** 0 computed money figure anywhere; every finance write gated.
- **SC-003** Salaries/staff/class boards are figure-free (0 pay amount).
- **SC-004** Count target held (recommended 115); admin menu 50; no accidental removals.
- **SC-005** All prior finance/role-law/no-fake asserts green (byte-verbatim) except the declared nav010 lockedFin amendment.

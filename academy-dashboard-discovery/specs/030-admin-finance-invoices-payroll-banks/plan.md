# Spec 030 — Implementation Plan: Admin Finance / Invoices / Payroll / Banks Deep Management

**Feature dir**: `academy-dashboard-discovery/specs/030-admin-finance-invoices-payroll-banks/`
**Baseline**: **Spec 029 is UNCOMMITTED** (implemented in the working tree; HEAD `4be3e87` = Spec 028's commit).
Planning proceeds against the **accepted working-tree baseline** (see D2). Public HTML **97** (verified);
baseline `npm run build` = 97 / smoke **PASS** / a11y green; `app/public/finance.html` **0-diff** (Spec-009
invariant intact).
**Status**: PLANNED (plan-only — no tasks, no implementation, no commit).

---

## 1. Decision headline

**Count STAYS 97 — ZERO new pages. `nav.config.js` stays 0-diff.** `finance.html` becomes a **tabbed hub**
(Overview · Salaries · Banks) via the EXISTING `data-tab` mechanism. The 9 `PLANNED_FINANCE` cards map 1:1 to
the finance sub-domains and are the natural fold points: **Salaries** (teacher + staff) and **Banks** become
real display-only tabs; the rest (monthly-invoices, payments-deepen, class-salary-report, payouts, accounting/
analysis) fold as sub-sections/gates or stay honest figure-free planned cards.

Every finance write ends at an honest `backendRequired`/`disabled-with-reason` gate; **nothing moves money,
generates a salary, approves a payout, imports a bank statement, reconciles, or produces a file.** Two figure
classes: **invoice/payment amount literals allowed** (Spec-009-sanctioned, no math); **salary/payout/
compensation figures NEVER shown** (Salaries/payouts/class-report are STATUS-FIRST, FIGURE-FREE); **computed
aggregates (Net Income/P&L/totals) and charts forbidden.**

**Mechanism** = the CLOSED `data-*` set + existing primitives (`tabs`/`data-tab`, `filterBar`, `previewTemplate`/
`sheetRow`, `data-confirm`, `data-modal-trigger`, `data-disabled-reason`, `data-filter-set`, finance-status
chips) — NO new hook/storage key/engine/page. **030 is the first spec to modify `finance.html`** → it declares
a supersession of the Spec-009 finance-body freeze while keeping every permanent guarantee.

## 2. Baseline status (D1/D2/D3) — reported, accepted

- **D1 Evidence gate**: PASS — specify 3-agent audit + this plan's finance-source re-reads (`finance.js`,
  `finance-actions.js`, `finance-status.js`, `fixtures/finance.js`, `PLANNED_FINANCE`, nav finance sub-section,
  finance smoke block). Every 030 surface is legacy-grounded (`visual-grounding.md`).
- **D2 Spec 029 baseline**: **UNCOMMITTED** — HEAD `4be3e87` is Spec 028's commit; Spec 029 is in the working
  tree (14 changed HTML + assets + tests + docs). This plan is **docs-only** (written solely into the 030 spec
  dir) — it CANNOT mix with the Spec-029 app changes. Planning is therefore safe against the working-tree
  baseline. **HARD STOP for IMPLEMENTATION**: Spec 030 implementation MUST NOT begin until the Spec-029 watcher
  commit lands (so 030 app changes are not mixed with uncommitted 029 app changes). `docs/` is a separate
  tracked GitHub-Pages mirror with its own publish drift — outside 030's scope.
- **D3 Count**: **97** (verified). `app/public/finance.html` 0-diff — Spec-009 invariant intact at plan time.

## 3. Count target (D4) — **97, ZERO new pages**

- Current 97 → target **97**. Page delta **0**. `nav.config.js` **0-diff**.
- All finance sub-domains fold into the `finance.html` tabbed hub. Every standalone-page candidate (invoices/
  salaries/banks) FAILS the page-candidate test at Q3 (folds cleanly into a tab). No removals, no unrelated
  additions.

## 4. Spec-009 supersession amendment (D5) — declared

Because 030 modifies `finance.html`, it **SUPERSEDES** `specs/011-…/contracts/finance-impact-contract.md:7`
via a new `contracts/spec-009-supersession-contract.md`:
- **LIFTED** (declared): the "zero git diff" freeze on `pages/finance.js` / `fixtures/finance.js` /
  `components/finance-{status,actions}.js` / `locales/*.fin.js`; the `finance.html` `#page-body` byte-identical
  clause; the exact "9 figure-free planned cards" shape.
- **KEPT permanent** (byte-verbatim guarantees): no money arithmetic; no status mutation on confirm; no
  receipt/`type="file"`; no chart/`<canvas>`; `FINANCE_SUMMARY` row-count-only; invoice/payment amount literals
  only (no aggregate); **salary/payroll/payout figures never shown**; the finance `forbidden` regex
  (`chart|canvas|graph|score|rank|leaderboard|percentile`); the no-finance-leak assertion on dashboard/reports
  bodies; the six-wallet-locked nav + finance sub-section membership.
- **Smoke amendment (declared)**: supersede the "9 planned disabled cards" count/shape and the finance
  `#page-body` structure (now tab-wrapped); KEEP byte-verbatim the 4-tiles, 9-invoice-rows, 6-payment-rows,
  9-drawers (Overview tab unchanged), forbidden regex, no-mutation-on-confirm, no-receipt, six-wallet-locked,
  finance-token-clean-on-dashboard/reports assertions. See `contracts/spec-009-supersession-contract.md` +
  `contracts/smoke-rescope-contract.md`.

## 5. Finance hub architecture (D6) — tabbed, minimal-churn

`finance.html` gains a `data-tab` tab bar; the EXISTING content stays behavior-identical under a default tab:
- **Overview tab** (default, visible): the CURRENT finance content unchanged — 4 status tiles + invoice
  section (filter + list) + payments section + invoice drawers. Keeps the existing smoke behavior (tiles/
  invoices/payments/drawers) valid. Payment-action gates (Add/Verify/Refund/Reconcile) added here or in a
  Payments sub-section.
- **Salaries tab** (new): STATUS-FIRST, FIGURE-FREE teacher + staff salary boards (name + status + period +
  row-count only; NO amount); Generate salary / Approve / Mark-paid / Export payroll = `backendRequired` gates.
- **Banks tab** (new): bank name/status list; Add/Edit bank = `backendRequired` modal (name only); Import
  statement / Match / Reconcile = gates; NO credentials.
- **Folded sub-sections / gates** (planning-final in tasks): monthly-invoices (status-first list), class-salary-
  report (figure-free or gate), payouts (status-first figure-free), accounting/analysis (status-first counts or
  planned gate, NO chart/aggregate). The `PLANNED_FINANCE` cards are updated: surfaces now delivered in-hub
  point to their tab; surfaces still needing the real engine stay honest figure-free planned/backendRequired
  cards.

## 6. Finance menu coverage plan (D18/D42) — nav 0-diff

- `nav.config.js` **0-diff**: the finance sub-section (`finance` implemented + `invoices`/`monthlyInvoices`/
  `salaries`/`staffSalaries`/`payments`/`classSalaryReport`/`banks` disabled-with-reason) stays as-is. This is
  HONEST: those items represent the REAL billing/payroll/bank BACKEND (create/pay/generate/import), which
  genuinely requires the server — 030 builds only the DISPLAY-ONLY preview inside the finance hub. A
  disabled-with-reason item is keyboard-reachable + reason-bearing = NOT a dead placeholder (smoke already
  asserts "disabled+reason").
- **Coverage proof (D42)**: `finance-menu-coverage-inventory.md` classifies all 8 items (0 unclassified);
  smoke keeps the six-wallet-locked + finance-sub-section-membership assertions byte-verbatim AND adds asserts
  that the folded display surfaces (Salaries/Banks tabs) render in the finance hub. Every finance item is
  implemented (finance) / display-folded-in-hub + honest future-backend gate (the 7 sub-items).

## 7. Invoice / payment plan (D7/D8/D9/D21/D26) — F-A/F-B/F-C/F-K

- **Invoices (F-A)**: keep the existing Overview invoice list + filters + read-only drawers. Create/Edit
  invoice = `backendRequired` modal (add if grounded); Mark-paid / Record-payment / Send-invoice = gates (keep
  the existing confirm→honest-final, NO status mutation). Amount = single authored SAR literal (no balance/tax/
  discount math).
- **Monthly invoices (F-B)**: fold a status-first Parent/Status mini-list (no aggregate) — or an honest planned
  card if grounding is thin.
- **Payments (F-C)**: keep the payments list; Add payment / Verify / Refund / Reconcile = gates; NO receipt
  upload (`type="file"` forbidden), NO collected total. Amount = single authored literal.
- **Record-payment / Mark-paid / Send-reminder (F-K)**: keep as `backendRequired` confirms (or reword to modal);
  confirm mutates NOTHING (status chip unchanged before/after — existing Spec-009 guarantee kept).

## 8. Salaries / payroll plan (D10/D11/D12/D14/D22) — F-D/F-E/F-F, FIGURE-FREE

- **Teacher + Staff salaries (F-D/F-E)**: STATUS-FIRST boards — name + status chip + period/row-count ONLY.
  **NO salary/fixed/fine/gift/hour-rate/total/EUR figure.** Generate salary / Approve / Mark-paid / Export
  payroll = `backendRequired` gates. NO payroll engine, NO generation.
- **Class salary report (F-F)**: figure-free display-only rows (grouping label + status) OR an honest planned
  gate (preferred if grounding thin). NO group-by/sum engine, NO salary total. Generate/Export = gates.
- **Payouts (F-H)**: STATUS-FIRST FIGURE-FREE (name/method/status/month) OR a gate. Approve/Pay = gates. NO
  payout amount, NO money movement.

## 9. Banks plan (D13/D28) — F-G

- Bank name/status list; Add/Edit bank = `backendRequired` modal (name only); Import statement / Match /
  Reconcile = gates. NO credentials, NO account numbers, NO balances, NO bank integration.

## 10. Expense / accounting / analytics plan (D15/D16/D17) — F-I/F-M/F-N/F-O

- **Expense (F-I)**: optional status-first fold — single authored per-expense literal + currency allowed; NO
  expense total / income-vs-outcome aggregate; Add/Edit = gates. OR a planned gate (planning decides).
- **Accounting hub (F-M)** / **analysis-expenses (F-N)**: NO P&L / Net Income / Total figures, NO chart —
  status-first counts or an honest planned gate.
- **Analysis-invoices (F-O)**: status counts (row counts by paid/due/overdue status) allowed; aggregate money
  totals + chart forbidden — status-first or gate.

## 11. Export / print plan (D25/D27) — F-J/F-L

- **Print (F-J)**: reclassify `finance-actions.js` Print from `data-demo-action` → `disabled-with-reason` gate
  (consistent with Export CSV/PDF; Spec 029 R-G precedent).
- **Export / Download / PDF / CSV / Excel (F-L)**: all `backendRequired`/`disabled-with-reason` gates. NO real
  file, NO `a[download]`, NO `.csv`/`.pdf`/`blob:` link, NO fake print, NO silent no-op.

## 12. Amount / calculation + no-fake-money guard (D21/D22/D23/D24) — F-P

- **Allowed**: per-invoice/per-payment (and optional per-expense) single authored literals; row counts by
  status. **Forbidden**: any sum/total/balance/net/P&L; salary/payout/compensation figures; group-by/sum; FX;
  chart/`<canvas>`; `sparkline.js` as a finance metric.
- **Confirm-on-write mutates nothing** (F-K); no `type="file"`, no `type="password"`, no credential/API-key/
  webhook/secret text anywhere. See `no-fake-money-register.md` + `contracts/amount-calculation-guard-contract.md`.

## 13. Future-owner / excluded plan (D29) — F-R…F-U

- **F-R payout-providers** (Paymob/Payoneer creds/webhooks/keys) → **future-backend/excluded**; NEVER rendered.
- **F-S payment-gateway settings** → **031/future-backend**; not a 030 figure surface.
- **F-T teacher-portal salary twin** → **intentionally-excluded FOREVER** (pay-free law); no teacher-portal
  file changes.
- **F-U family payment page/figure** → **intentionally-excluded** (family zero-pay); no family payment page.
- **F-V teacher-detail Compensations** → figure-free only if surfaced, else NOT built (no Fine/Bonus/salary
  amount). See `future-owner-register.md`.

## 14. Fixtures / locale / CSS plan (D30/D31/D32)

- **Fixtures (D30)**: extend `fixtures/finance.js` with authored `SALARIES` (teacher/staff: `{nameKey, role,
  statusId, periodKey}` — **NO amount**), `BANKS` (`{nameKey, statusId}`), optional `PAYOUTS` (`{nameKey,
  methodKey, statusId, monthKey}` — **NO amount**). Keep `FINANCE_SUMMARY` row-count-only. NO salary/payout
  amount field anywhere. Update `PLANNED_FINANCE` (which cards now fold in-hub vs stay gated).
- **Locale (D31)**: extend `ar/en.fin.js` with `fin.tab.*` (Overview/Salaries/Banks), `fin.sal.*`, `fin.bank.*`,
  `fin.payout.*`, new gate reasons (generate/approve/import/reconcile), status labels — AR/EN mirrored. Reuse
  `fin.reason.*`/`common.backendRequiredNote`.
- **CSS (D32)**: reuse existing `.fin-*`/`.sheet-row`/`.rating-pill`/chips + the existing `data-tab` tab styles
  (course/group precedent). Additive-only if a salary/bank row layout needs it; motion only inside the existing
  reduced-motion block; NO new hook/storage key.

## 15. Closed hook strategy (D33)

Reuse ONLY: `data-tab` (tab bar), `data-filter`/`data-filter-set` (existing invoice filters/tiles),
`data-drawer`+`<template data-preview>` (detail), `data-modal-trigger`+note-key (Add-bank/Create-invoice),
`data-confirm` (record/mark-paid/generate confirms that mutate nothing), `data-disabled-reason` (export/import/
reconcile/print/salary gates). **NO new hook, NO new storage key.**

## 16. Smoke / a11y / screenshots plan (D34/D35/D36)

- **Smoke (D34)**: additive block — count == 97; finance loads AR/EN; tab bar works (Overview/Salaries/Banks,
  one panel visible); Salaries/Banks tabs render; **no salary/payout figure** on the Salaries/Payouts/Class-
  report tab bodies (scoped pay grep, excluding the invoice/payment amount literals); no `type="file"`, no
  `type="password"`, no credential/API-key/webhook text; no `a[download]`/`.csv`/`.pdf`/`blob:`; no `<canvas>`/
  chart; no money aggregate/total label; Print = disabled-with-reason (no demo-action on export/print);
  confirm-on-write mutates 0 status chips; finance nav coverage (six-wallet-locked + membership) byte-verbatim;
  `href="#"`=0; no raw keys; no dead buttons. **Supersede** (declared): the 9-planned-cards count + finance
  body structure. **KEEP byte-verbatim**: 4 tiles, 9 invoices, 6 payments, 9 drawers, forbidden regex, no-
  mutation-on-confirm, no-receipt, finance-token-clean on dashboard/reports, + all 026/027/028/029 + role-law
  asserts.
- **A11y (D35)**: add rows — finance Salaries tab, Banks tab, a finance detail drawer, an Add-bank modal, an
  export gate; dark/light; mobile 390; critical=0 serious=0.
- **Screenshots (D36)**: finance overview, invoices, payments, salaries status-first board, class-salary-report
  gate/figure-free, banks, detail drawer, Add-bank modal, mark-paid/approve gate, export gate, mobile 390,
  dark; update `screenshots/REVIEW.md`.

## 17. Role-law protection plan (D37)

Teacher pay-free GLOBAL (16 teacher-portal files byte-identical; no teacher-portal salary/pay page; teacher-
performance display-only; payHit/tchPay byte-verbatim); family zero-pay (famPay/payFigure byte-verbatim; no
family payment page); student child-view; **the 030 finance salary/payout surfaces are the sanctioned ADMIN
figure-free boards — they carry NO amount, keeping the "zero pay figures anywhere" law green.**

## 18. Impact protection plan (D38/D39)

Changed outputs (intended): `finance.html`/`.en` (tab hub + salaries/banks) + shared-asset hashes. Everything
else byte-identical: 16 teacher-portal, teacher-performance, family, student, reports (Spec-029 fold intact),
all 026/027/028/029 pages, index. `package.json` **0-diff**; `nav.config.js` **0-diff**; `enhance.js` **0-diff**;
no new dependency/engine/hook/storage key. **Spec-029 pages stay working** (reports feedback/forms unchanged).

## 19. Allowed / forbidden files (D40)

**Allowed to change**: `pages/finance.js`; `fixtures/finance.js`; `components/finance-actions.js`,
`components/finance-status.js` (only if a new status vocab is needed — prefer reuse); `locales/ar.fin.js` +
`en.fin.js`; `styles/app.css` (additive); `tests/{smoke,a11y,screenshots}`; `screenshots/REVIEW.md`;
`README.md`; `CLAUDE.md`; the 030 spec dir. **Generated**: `finance.html`/`.en` (+ shared assets).
**Forbidden**: `package.json`; dependencies; backend/API/auth; `nav.config.js` (0-diff — coverage via inventory
+ smoke); teacher-portal files; family/student pages; new chart/export/gateway/payroll/bank/reconciliation
engine; new hook/storage key; any new standalone page; 031 pages; payout-provider/payment-gateway credential
UI; secret/API-key/`type=password`/`type=file` fields.

## 20. Risks & stop conditions (D41)

**Stop if**: Spec-029 baseline judged unstable by the owner · count ≠ 97 · any finance nav item unclassified ·
any F-row unresolved · a new page chosen without the candidate test · a fake payment/mark-paid/salary-
generation/payout/bank-import/reconcile/export appears · a salary/payout/compensation figure appears · a money
total/net/P&L appears · a chart/`<canvas>` appears · `type=file`/`type=password`/API-key/webhook/secret appears
· status mutates after confirm · a teacher-portal/family/finance-source-outside-allowlist file changes ·
`href="#"`/dead button/raw key appears · `package.json`/`nav.config.js` changes unexpectedly · a new hook/key/
engine is needed. **IMPLEMENTATION STOP**: do not start until the Spec-029 watcher commit lands.
**Risks**: (1) salary/payout figure leakage — mitigated by figure-free boards + scoped pay grep; (2) the
Spec-009 supersession must be declared, not silent — mitigated by the supersession contract; (3) finance.html
tab-wrap must not break the Overview smoke — mitigated by keeping Overview the default visible tab with
unchanged content; (4) computed-aggregate/chart temptation from legacy P&L — hard-guarded.

## 21. Constitution / standing-law check

Static HTML-first · closed `data-*` set · fixtures-only · no engine · no computed money/score/chart · no pay
figure (salary/payout) · AR RTL + EN LTR mirrored · light/dark/system · icon+text chips · relative paths ·
screenshot acceptance — ALL preserved. The one sanctioned deviation (modifying finance.html) is a **declared
supersession** of the Spec-009 freeze, keeping every permanent guarantee. No new complexity.

## 22. Next step

`/speckit.tasks` for Spec 030 (generate `tasks.md`). No implementation until the Spec-029 watcher commit lands
AND tasks are approved. No commit/push.

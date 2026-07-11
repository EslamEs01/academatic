# Contract — Role-Law & No-Fake Carryover

All standing laws (Specs 009/016–037) remain BINDING; protected smoke assertions stay
**byte-verbatim** except the ONE sanctioned nav010 amendment. (Plan mirror of
`../role-law-and-no-fake-carryover.md` and `../no-fake-money-register.md`.)

## Role laws (green)
- **Finance no-fake-money (Spec-009/030 invariant):** Spec 038 unlocks nav access to content that
  already satisfies this law — it does not touch the 9 invoice/6 payment amount **literals**, the
  row-COUNT-only `FINANCE_SUMMARY`, or introduce any new aggregate. The new monthly-invoices board
  is a pure grouped re-render of the existing 9 rows (per-group row COUNTS only, never a money
  sum). `classSalaryReport` — the one item that WOULD require a computed per-class pay figure —
  stays an honest lock, not a figure-free workaround.
- **Teacher pay-free (GLOBAL):** Spec 038 touches only `finance.html`/`.en` + `nav.config.js` — no
  `teacher-*` file (source incl. comments, built HTML, or the 16-file teacher portal) is in scope.
  The Salaries-tab teacher rows Spec 038 deep-links `salaries`/`staffSalaries` into are the
  pre-existing figure-free Spec-030 board (`nameKey`/`statusId`/`periodKey`, no amount field) —
  unlocking the nav does not add a rate/hour_rate/fine/payout token.
- **Family zero-pay:** the family PORTAL is untouched (no `family-portal*`/`family*` portal file in
  scope). The finance-hub invoice/payment rows Spec 038 unlocks are the pre-existing admin-only
  Spec-009-sanctioned literals — a different, already-approved surface from the family-portal
  zero-pay law, never confused with it.
- **Student child-view:** zero student/student-portal files touched.
- **No computed metric/chart:** no chart/canvas/computed-percentage/score/rank is introduced by any
  of the 6 nav-lock removals; the monthly-invoices board groups by an existing categorical field
  (`monthKey`) and shows per-row literals + per-group counts only — never a derived aggregate.
- **No fake success wording:** the 6 unlocked nav items resolve to READ-ONLY deep-links into
  existing (or newly-added-but-still-gated) content; every Create/Generate/PDF/Send/Mark-Paid/
  Record/Confirm/Refund/Export/Add/Import/Reconcile/Verify final on every finance tab stays a
  `data-disabled-reason` `backendRequired` gate saying "available once the server is connected" /
  «يُتاح بعد ربط الخادم» — never a `data-demo-action` preview toast, never a persisted mutation.
- **Closed hook set / no source-surface change:** no `href="#"`; no raw storage key; no
  `type="file"`; no `type="password"`; no `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js`
  diff (all 6 items resolve to the existing `finance.html` via the existing `tabs()`+`#view=`
  mechanism — Spec 035/036/037 fold-anchor/deep-link precedent).
- **Admin-menu-50 / route-freeze:** flipping `status` on 6 EXISTING nav items from `disabled` to
  `implemented` does not change the classified-item COUNT (still 50), nor the page count (still
  115, 0 new pages).
- **Reports finance-free:** `reports.html`/`.en` and its fixtures/pages source are not touched by
  Spec 038 at all — the finance work is confined to `finance.html`/`.en` + `nav.config.js`.

## No-fake laws (green, per `no-fake-money-register.md`)
- No fake invoice generation/payment confirmation/refund/mark-paid mutation (M-01…M-04): every
  final stays a gate; no invoice/payment `statusId` changes on click (re-pinned no-mutation check).
- No fake salary/staff/class-salary calculation (M-05…M-07): salaries/staff boards stay
  figure-free; `classSalaryReport` stays locked (never a figure-free workaround board — the
  documented decision is (b) honest lock, not (a) thin board).
- No fake bank balance/reconciliation/verify (M-08…M-09): banks show name+status only; Import/
  Reconcile/Verify stay gates.
- No computed profit/loss/revenue/VAT/tax/total/subtotal/outstanding/balance/net/due-sum (M-10…
  M-12): not surfaced anywhere in scope; `finance-analysis` stays a separate, untouched honest lock
  (owner: already deferred, out of Spec 038's unlock set).
- No fake export/PDF/download/send/receipt/email (M-13…M-14): gates only.
- No payment gateway (M-15); no row/status/payment/salary mutation (M-16); no backend/API/
  database/auth/websocket (M-17).

## Protected assertions (byte-verbatim)
- `payHit`/teacher-pay guards (`tchPay`), `payFigure`/`famPay`, child-view guard — untouched
  surfaces, re-verified anyway per standing law.
- Admin-menu-50 freeze (`navCount32 === 50`); 9-invoice/6-payment/4-tile/9-planned/9-drawer/
  forbidden-regex/no-mutation/no-receipt finance asserts (see `smoke-coverage-contract.md` for
  exact line refs) — held at their exact threshold values, only their tab-context adapts.
- `finMembers` (the 8-item finance sub-section id list, unchanged order), `railCats === 6`,
  `admItems.length === 5 && !admItems.includes('banks')`, `banksInReports && !banksInAdmin`.
- Spec-026 action-completion, Spec-032 form-completion, 026–037 per-page asserts.
- Spec-038 additions = a separate additive finance-unlock block; never edit a protected regex
  beyond the ONE declared amendment.

## The ONE sanctioned amendment
Per the Spec-030/035/036/037 precedent, Spec 038's sanctioned amendment is:

> **`app/tests/smoke/run.cjs:1571-1613` — the `nav010` block (`lockedFin`/`lockedOk`/`finLinks`).**
> Today `lockedFin` requires ALL SEVEN of `invoices, monthlyInvoices, salaries, staffSalaries,
> payments, classSalaryReport, banks` to be `disabled`+reason+lock, and `finLinks` requires the
> finance sub-section to expose exactly ONE implemented link (`finance`). Spec 038 amends
> `lockedFin` to `['classSalaryReport']` only, and `finLinks` to the 7-item implemented set
> (`finance` + the 6 newly-unlocked items, `classSalaryReport` excluded) — a declared, additive
> supersession (still-locked `classSalaryReport` must still assert `disabled`+reason+lock).

No other assert, fixture, or non-finance page is touched. Every other line in this document is a
"stays green, verbatim" carryover.

## Impact-protection expectation
- `finance.html`/`.en` bodies change (tab restructure: 3 tabs → 6, sections moved not duplicated)
  + the shared admin sidebar (6 nav unlocks). Every other admin `#page-body`, all 16 portal pages,
  index, `reports.html`/`families.html`/`students.html` (Spec 037 territory) stay byte-identical.
  `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` 0-diff (see
  `impact-protection-contract.md`).

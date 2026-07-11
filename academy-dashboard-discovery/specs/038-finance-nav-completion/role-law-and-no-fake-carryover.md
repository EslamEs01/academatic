# Role Law & No-Fake Carryover — Spec 038 (Finance Nav Completion)

Every standing law below must stay green **byte-verbatim** through Spec 038. Spec 038 is additive
only: it removes 7 items from the `lockedFin` nav-lock set and wires `finance.html#view=…`
deep-links; it adds smoke assertions, never removes or weakens an existing one (except the ONE
sanctioned amendment recorded at the bottom).

## 1. Finance no-fake-money (Spec-009 / Spec-030 invariant)

- **Law**: authored per-row amount literals are sanctioned (invoices/payments/monthly, SAR);
  `FINANCE_SUMMARY` stays row-COUNT-only (never a SAR sum); salaries/staff-salaries/
  class-salary-report stay FIGURE-FREE (no pay amount, ever); banks show name+status only (no
  balance); NO computed total/balance/profit/loss/revenue/VAT/tax/salary/payout anywhere; NO fake
  mark-paid/settle/refund/reconcile/generate/PDF/export/send/receipt; NO payment-gateway
  credential/webhook; every write ends at a `backendRequired` gate.
- **Spec 038 upholds it by**: unlocking nav access to content that already satisfies this law
  (the 9 invoice rows, 6 payment rows, figure-free salary board, name+status bank list, and the
  row-count-only `FINANCE_SUMMARY` tiles are all pre-existing Spec-030 artifacts — Spec 038 does
  not touch their fixtures or math). The `classSalaryReport` open decision (see
  `legacy-finance-coverage.md`) is bound by the same figure-free rule if a board ships. The
  analysis-expenses / analysis-invoices legacy capabilities (computed net-profit/revenue/discount
  totals) are explicitly NOT unlocked — see `future-owner-register.md`.
- **Protected smoke asserts held verbatim** (`app/tests/smoke/run.cjs`): 9 baked invoice rows,
  6 baked payment rows, 4 status tiles = row-count per facet, 9 invoice drawer templates,
  ≥4 disabled-with-reason controls in the finance action cluster, 0 demo-actions in that cluster,
  ≥1 confirm among rows, the cancelled-invoice record-payment-disabled check, `plannedN===9` /
  `plannedDisabled===9` / figure-free / availability-chip checks on the planned cards, the
  chart/score/rank/leaderboard/percentile-forbidden regex on the finance body, `hrefHash===0`,
  and no receipt/upload/`type="file"` token.

## 2. Teacher pay-free GLOBAL

- **Law**: the entire `teacher-*` family (source incl. comments, built HTML, smoke) carries zero
  salary/rate/hour_rate/fine/payout/currency token; `teacher-performance.html` is the sole
  sanctioned admin-exempt board (figure-free); portal files stay byte-identical since `e4ee3cd`.
- **Spec 038 upholds it by**: touching only `finance.html`/`.en` and `nav.config.js`. No
  `teacher-*` file is in scope. The Salaries-tab teacher rows (name/status/period) that Spec 038
  deep-links into are the pre-existing figure-free Spec-030 board — no amount field is added.
- **Protected asserts held verbatim**: `tchPay` teacher-portal pay-vocabulary regex (0 hits);
  admin teachers-page/teacher-profile/`teacher-performance` pay-figure checks (`!kb.pay`,
  `!t28.pay`, `!perf.pay`).

## 3. Family zero-pay

- **Law**: the family PORTAL carries zero currency/pay figures (`famPay`/`payFigure` regexes);
  the admin-side family invoice amount literals (Spec-009-sanctioned, admin-only, single-value/
  no-math) are a DIFFERENT, already-approved surface — never confused with the family-portal law.
- **Spec 038 upholds it by**: not touching any `family-portal*` / `family*` portal file. The
  finance-hub invoice/payment rows Spec 038 unlocks are the pre-existing admin-only Spec-009
  literals (`fam1`/`fam2`/… ids used only as authored fixture keys), not a family-facing surface.
- **Protected asserts held verbatim**: `famPay` (family-portal + family-child), `payFigure`
  (family dashboard + family-child) pay-vocabulary regexes, all 0-hit.

## 4. Student child-view

- **Law**: student-facing pages read as "عرض الابن" / child-view (Spec 024 B-01), never
  "لوحة الطالب" / student-primary framing; student internals stay byte-identical unless a spec
  explicitly targets them.
- **Spec 038 upholds it by**: zero student/student-portal files touched.
- **Protected asserts held verbatim**: the child-view forbidden-wording check on all
  `STUDENT_INTERNAL` pages.

## 5. No computed metric / score / chart

- **Law**: no computed score/rank/leaderboard/percentile/chart/`<canvas>` anywhere; the finance
  body specifically forbids `chart|canvas|graph|score|rank|leaderboard|percentile`.
- **Spec 038 upholds it by**: deep-linking into existing display-only content; no chart/canvas/
  computed-percentage is introduced by a nav-lock removal. If `classSalaryReport` becomes a board
  (open decision), it must be a categorical list (date/teacher/student/session), never a computed
  pay score.
- **Protected asserts held verbatim**: the finance-body `forbidden` regex check (line ~996-1040
  in `run.cjs`), the reports-body and teacher-performance-body forbidden-token checks (untouched,
  out of scope).

## 6. No fake success wording

- **Law**: `acknowledge()` says "available once the server is connected" / «يُتاح بعد ربط الخادم»,
  never a fake "(demo)"/"saved"/"done" toast; every Create/Add/Save/Export/Print/Record-payment/
  Generate/Approve/Mark-paid/Reconcile ends at an honest `backendRequired`
  (`data-disabled-reason`) gate, never a `data-demo-action` preview toast on a persistence-implying
  action.
- **Spec 038 upholds it by**: the 7 unlocked nav items resolve to READ-ONLY deep-links into
  existing gated content; no new write action, no new toast wording, no new confirm body.
- **Protected asserts held verbatim**: `demoInCluster === 0` in the finance action cluster,
  `disabledInCluster >= 4`, the no-fake-success global sweep (0 fake-success toast in any built
  page).

## 7. Closed hook set / no source-surface change

- **Law (binding on this spec)**: no `href="#"`; no raw storage key beyond the closed set; no
  `type="file"`; no `type="password"`; no `package.json` diff; no `enhance.js` diff; no
  `build-html.mjs` diff (0 new pages — all 7 items resolve to the existing `finance.html`); no
  `i18n.js` diff (any new deep-link label copy reuses the existing `fin.*` locale keys already
  registered for finance.html, or falls under the existing route/label pattern used by prior
  fold-anchors such as `familyCategories`/`addTeacher`).
- **Spec 038 upholds it by**: this being a `nav.config.js`-only + `finance.html`/`.en`-body-only
  change (status/route field flips + `#view=` hash wiring), following the exact Spec-035/036/037
  fold-anchor / deep-link precedent (`familyCategories`, `studentResult`, `monthlyReports`,
  `dataAnalysis`, `sessionsKpi`, `monthlyPerf`).
- **Protected asserts held verbatim**: `hrefHash === 0` sitewide; `passwordInputs === 0` /
  `fileInputs === 0` on all audited pages; the admin-menu classified-item-count freeze.

## 8. Admin-menu-50 freeze / route-freeze

- **Law**: exactly 50 classified admin nav items (`navCount32 === 50` in `run.cjs:1271`); 0
  unclassified; page count held at 115 unless a spec explicitly ships a new page (Spec 038 ships
  none).
- **Spec 038 upholds it by**: flipping `status` on 7 EXISTING nav items from `disabled` to
  `implemented` (with a route) — the classified-item COUNT does not change, only the status value
  of already-counted items. Page count stays 115 (0 new pages).
- **Protected asserts held verbatim**: `navCount32 === 50`; the 115-page build/smoke count; the
  `admItems.length === 5 && !admItems.includes('banks')` admin-category assert (banks is a
  `reports`/finance-category item, not admin — unaffected by Spec 038).

## 9. Reports finance-free

- **Law**: `reports.html` body stays finance-free FOREVER (its own `forbidden` regex covers
  `salary|payroll|payout|invoice|revenue|accounting|compensation|...`).
- **Spec 038 upholds it by**: not touching `reports.html`/`.en` or its fixtures/pages source at
  all — Spec 038's finance work is confined to `finance.html`/`.en` + `nav.config.js`.
- **Protected asserts held verbatim**: the reports-body `forbidden` regex check.

## The ONE sanctioned amendment

Per the Spec-030 precedent (which itself amended the Spec-009 finance-body freeze via a declared
supersession), Spec 038's sanctioned amendment is:

> **`app/tests/smoke/run.cjs:1586-1604` — the `lockedFin` / `lockedOk` nav010 assert.** Today it
> requires ALL SEVEN of `invoices, monthlyInvoices, salaries, staffSalaries, payments,
> classSalaryReport, banks` to be `disabled` + reason + lock. Spec 038 amends this list to remove
> whichever of the 7 are promoted to `implemented` deep-links in `plan.md` (up to all 7, or 6 if
> `classSalaryReport` stays locked per the open decision) — a declared, additive supersession, not
> a deletion of the assert's intent (still-locked items must still assert `disabled` + reason).

No other assert, fixture, or non-finance page is touched. Every other line in this document is a
"stays green, verbatim" carryover.

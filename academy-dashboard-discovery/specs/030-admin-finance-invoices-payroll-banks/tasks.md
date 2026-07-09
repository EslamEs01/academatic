---
description: "Task list for Spec 030 — Admin Finance / Invoices / Payroll / Banks Deep Management"
---

# Tasks: Admin Finance / Invoices / Payroll / Banks Deep Management

**Input**: `academy-dashboard-discovery/specs/030-admin-finance-invoices-payroll-banks/` (spec.md, plan.md, research.md, data-model.md, quickstart.md, contracts/ ×24, + 8 evidence artifacts)
**Baseline**: **Spec 029 is UNCOMMITTED at plan time** (working-tree baseline; HEAD `4be3e87` = Spec 028). Public HTML **97**; `app/public/finance.html` **0-diff** (Spec-009 invariant intact); build/smoke/a11y green.
**Locked**: count **97**, ZERO new pages, `nav.config.js` **0-diff**; `finance.html` → tabbed hub (Overview·Salaries·Banks); invoice/payment amount literals OK; **salary/payout/compensation figures NEVER**; no aggregate/P&L/chart; no fake money; declared Spec-009 supersession; no new hook/storage key/engine; no commit/push.

**⚠️ IMPLEMENTATION-BLOCKING GATE (T001)**: Do NOT begin any edit until the **Spec-029 watcher commit has landed** (HEAD must no longer be `4be3e87`). Planning is docs-only and safe; implementation must not mix uncommitted Spec-029 app changes with Spec-030 app changes.

**Tests**: additive smoke/a11y/screenshot tasks included (verification mandatory per task).
**Organization**: grouped by user story (US1–US11 from spec.md). Every task carries an exact file path + verification. `[P]` = safe parallel (independent files). App root = `academy-dashboard-discovery/app/`; `spec/` = `academy-dashboard-discovery/specs/030-admin-finance-invoices-payroll-banks/`.

## F-row → task map (coverage index)

| F-row | Owner | Task(s) |
|---|---|---|
| F-A Invoices surface | US2 | T019, T020, T021 |
| F-B Monthly invoices | US3 | T022 |
| F-C Payments/collections | US3 | T023, T024 |
| F-D Teacher salaries (figure-free) | US4 | T025, T027, T028 |
| F-E Staff salaries (figure-free) | US4 | T026, T027, T028 |
| F-F Class salary report | US5 | T029, T030 |
| F-G Banks | US6 | T031, T032, T033 |
| F-H Payouts (figure-free) | US4 | T037 |
| F-I Expense | US3 | T039 |
| F-J Finance Print gate | US7 | T034 |
| F-K Record/Mark-paid/Send honesty | US2 | T020 |
| F-L Export/Download/PDF/CSV gates | US7 | T035, T036 |
| F-M Accounting hub (no aggregate/chart) | US1 | T038 |
| F-N Analysis-expenses (no P&L/chart) | US1 | T038 |
| F-O Analysis-invoices (status counts/no chart) | US1 | T039 |
| F-P Spec-009 supersession | US1 | T044 |
| F-Q Finance nav coverage | US8 | T040, T041 |
| F-R payout-providers → future-backend | US9 | T042 |
| F-S payment-gateway → 031/future-backend | US9 | T042 |
| F-T teacher-portal salary twin → excluded | US9 | T042 |
| F-U family payment → excluded | US9 | T042 |
| F-V teacher compensations figure-free/excluded | US9 | T042 |

---

## Phase 1: Setup / Preflight

**Purpose**: prove the baseline is safe (Spec-029 committed) before any edit; load scope guards.

- [ ] T001 **GATE** — verify the Spec-029 watcher commit landed: `git rev-parse --short HEAD` must NOT be `4be3e87` and `git log -1 --oneline` must reference Spec-029 (reports/feedback/forms). Verification: HEAD advanced past `4be3e87`; **STOP + report if Spec 029 is still uncommitted** (do not mix baselines).
- [ ] T002 Verify branch + clean tree: `git branch --show-current` = `feature/012-role-portal-foundation`; `git status --short` clean except the untracked 030 spec dir. Verification: matches; STOP if unexpected app diff.
- [ ] T003 Verify `.specify/feature.json` points to `academy-dashboard-discovery/specs/030-admin-finance-invoices-payroll-banks`. Verification: path correct.
- [ ] T004 Verify public HTML count == 97 (`find app/public -maxdepth 1 -name '*.html' | wc -l`) AND `git diff --stat -- app/public/finance.html` is empty (Spec-009 invariant intact at start). Verification: 97 + finance.html 0-diff; STOP if not.
- [ ] T005 Run baseline `cd app && npm run build` + `npm run test:smoke`; capture "= 97" and "[smoke] PASS". Verification: build 97, smoke PASS.
- [ ] T006 Run baseline `cd app && npm run test:a11y`. Verification: critical=0 serious=0.
- [ ] T007 [P] Load scope guards: `spec/contracts/scope-guard.md`, `spec/contracts/page-count-contract.md`, `spec/contracts/spec-009-supersession-contract.md`, `spec/contracts/no-fake-money-contract.md`, `spec/contracts/amount-calculation-guard-contract.md`, `spec/contracts/salary-figure-free-contract.md`, `spec/contracts/impact-protection-contract.md`. Verification: allowed/forbidden + stop conditions noted before edits.
- [ ] T008 [P] Confirm no implementation begun: `git diff --stat -- app/` empty. Verification: zero app diff at task start.

**Checkpoint**: Spec 029 committed, baseline green (97 / smoke PASS / a11y 0/0), finance.html 0-diff, guards loaded.

---

## Phase 2: Foundational (blocking prerequisites for US1–US6)

**Purpose**: the authored figure-free fixtures + mirrored locale keys + optional CSS the finance hub depends on. MUST complete before Phase 3+.

- [ ] T009 In `app/src/js/fixtures/finance.js` add `SALARIES` (~6–8 rows, teacher+staff): `{id, role∈{teacher,staff}, nameKey, statusId, periodKey}` per `spec/data-model.md`. **NO amount/fixed/fine/gift/hourRate/total/salary field.** Verification: file parses; grep the SALARIES block for `amount|fixed|fine|gift|hour|total|salary|EUR|SAR|ريال|أجر|راتب` = 0.
- [ ] T010 In `app/src/js/fixtures/finance.js` add `BANKS` (`{id, nameKey, statusId}`, ~3–5 rows) and optional `PAYOUTS` (`{id, nameKey, methodKey, statusId, monthKey}` — **NO amount**). Verification: no credential/account-number/balance field; no payout amount. (Same file as T009 → sequential.)
- [ ] T011 In `app/src/js/fixtures/finance.js` update `PLANNED_FINANCE` (mark which cards now fold in-hub: teacherSalaries/staffSalaries→Salaries tab, banks→Banks tab) and keep `FINANCE_SUMMARY` **row-count-only**. Verification: no money arithmetic added (`grep -E '\.reduce\(|\+=|Sum|total =|amount [*+/-]'` = 0); invoice/payment amounts unchanged.
- [ ] T012 Add mirrored `fin.tab.*` + `fin.sal.*` + `fin.bank.*` + `fin.payout.*` keys to `app/src/locales/ar.fin.js` (tab labels, board titles/subs, status labels, generate/approve/import/reconcile/export gate reasons). Verification: keys added; reuse `fin.reason.*`/`common.backendRequiredNote`; no raw key; **no salary/payout amount in copy**.
- [ ] T013 Mirror the exact same keys into `app/src/locales/en.fin.js` (same nesting, EN copy). Verification: AR/EN key sets identical (key-path diff empty); no raw `⟦key⟧` after build.
- [ ] T014 [P] If a salary/bank row layout needs styling, add additive-only classes to `app/src/styles/app.css` (reuse `.fin-*`/`.sheet-row`/`.rating-pill`/chips + the existing `data-tab` styles). Verification: additive diff only; no redesign; no new hook/storage key; build clean.

**Checkpoint**: figure-free fixtures + AR/EN locales + optional CSS ready; guards green.

---

## Phase 3 (US1): Finance hub / overview + Spec-009 supersession — Priority P1

**Goal**: `finance.html` becomes a tabbed hub; Overview stays behavior-identical; no aggregate/chart. **Independent test**: finance loads AR/EN; tab bar works; Overview tiles/invoices/payments/drawers unchanged; no computed money figure.

- [ ] T015 [US1] In `app/src/js/pages/finance.js` add a `data-tab` tab bar (reuse the `tabs()`/`data-tab` pattern from course/group) with tabs Overview·Salaries·Banks (Overview default/visible). Verification: build 97; exactly one tabpanel visible; tab switch works.
- [ ] T016 [US1] Wrap the CURRENT finance content (4 status tiles + invoice section + payments section + invoice drawers) in the **Overview** tabpanel, behavior-identical. Verification: `.fin-tile`×4, `#invoice-list` (9 rows), payments (6), drawers (9) still present + visible by default; existing tile-filter interaction still narrows the list.
- [ ] T017 [US1] Confirm the Overview keeps display-only row-count roll-ups (`FINANCE_SUMMARY`) and per-row amount literals only; NO aggregate/total/net/P&L. Verification: grep finance.js for money arithmetic = 0; no "total/net/إجمالي/صافي" money-total label added.
- [ ] T018 [US1] Confirm NO chart/`<canvas>` and the existing finance `forbidden` regex still holds on the finance body. Verification: grep finance.js + built finance body `canvas|chart\.js|apexcharts|amcharts|d3|highcharts|recharts` = 0.

**Checkpoint (US1)**: finance hub loads AR/EN; Overview behavior-identical; no aggregate/chart.

---

## Phase 4 (US2): Invoices (F-A / F-K) — Priority P1

**Goal**: display-only invoices + honest write gates; amount literals only; no status mutation. **Independent test**: rows authored; drawer read-only; Create/Mark-paid/Record/Send/Export gates; no aggregate; no status flip.

- [ ] T019 [US2] Keep the invoice list + status/date/family `filterBar` + read-only invoice drawers in `app/src/js/pages/finance.js` (Overview tab). Verification: filters facet client-side; drawer read-only; no `type="file"`.
- [ ] T020 [US2] In `app/src/js/components/finance-actions.js`: Create/Edit invoice = `data-modal-trigger` backendRequired modal (add if grounded); Record-payment / Mark-paid / Send-invoice / Send-reminder = `data-confirm`/`data-disabled-reason` gates that **mutate nothing** (F-K). Verification: confirm changes 0 invoice status chips before/after; no fake payment/PDF.
- [ ] T021 [US2] Confirm invoice amount = single authored SAR literal in `app/src/js/fixtures/finance.js`; NO balance/tax/discount/total computation. Verification: no aggregate; amount literals unchanged.

**Checkpoint (US2)**: invoices display-only; every write a gate; no mutation; amount literals only.

---

## Phase 5 (US3): Monthly invoices + payments (F-B / F-C / F-I) — Priority P2

**Goal**: honest monthly + payment surfaces; no receipt/refund/reconcile; no collected total. **Independent test**: rows authored; amount literal only; gates honest; no `type=file`.

- [ ] T022 [US3] Fold a status-first **monthly-invoices** mini-list (Parent/Status, no aggregate) into `app/src/js/pages/finance.js` (Overview or a folded sub-section), OR keep it an honest planned card. Verification: no monthly total; rows authored.
- [ ] T023 [US3] Deepen the payments section in `app/src/js/pages/finance.js` + `app/src/js/components/finance-actions.js`: Add payment / Verify / Refund / Reconcile = `backendRequired` gates; NO receipt upload (`type="file"` forbidden), NO refund, NO reconciliation. Verification: gates honest; no `type=file`; no collected total.
- [ ] T024 [US3] Confirm payment amount = single authored literal; NO collected-total/balance. Optionally fold **expense** (F-I) as status-first (single per-expense literal, no total) or an honest gate. Verification: amount literal only; no expense aggregate.

**Checkpoint (US3)**: monthly + payments honest; no receipt/refund/reconcile; no aggregate.

---

## Phase 6 (US4): Salaries + payouts — STATUS-FIRST FIGURE-FREE (F-D / F-E / F-H) — Priority P1

**Goal**: teacher/staff salary + payout boards with NO amount; write gates. **Independent test**: NO salary/payout figure; rows name+status only; Generate/Approve/Export gates; no generation.

- [ ] T025 [US4] Build the **Salaries** tabpanel in `app/src/js/pages/finance.js`: teacher salary board (name + status chip + period; **NO amount**) from `SALARIES` (role=teacher). Verification: NO salary figure; rows name/status only.
- [ ] T026 [US4] Add the staff salary board (role=staff) to the Salaries tabpanel; **NO amount**. Verification: NO salary figure. (Same file/tab as T025 → sequential.)
- [ ] T027 [US4] Add Generate salary / Approve / Mark-paid / Export payroll = `data-disabled-reason` backendRequired gates on the Salaries board (reasons from `fin.sal.*`). Verification: gates honest; no generation; no mutation.
- [ ] T028 [US4] Build a **payouts** status-first figure-free surface (name/method/status/month; **NO amount**) with an Approve gate — OR an honest planned gate if grounding is thin (F-H). Verification: NO payout amount; no money movement.

**Checkpoint (US4)**: salaries + payouts figure-free; every action a gate; scoped pay grep = 0.

---

## Phase 7 (US5): Class salary report (F-F) — Priority P2

**Goal**: no computed salary engine. **Independent test**: figure-free rows or gate; no group-by/sum; Generate/Export gates.

- [ ] T029 [US5] In `app/src/js/pages/finance.js` add a figure-free class-salary-report surface (grouping label + status, NO total) OR an honest planned gate (preferred if grounding thin). Verification: no computed total; figure-free.
- [ ] T030 [US5] Add Generate / Export = `data-disabled-reason` gates; confirm NO group-by/sum aggregation. Verification: no aggregation engine; gates honest.

**Checkpoint (US5)**: class-salary-report figure-free/gated; no group-by/sum.

---

## Phase 8 (US6): Banks (F-G) — Priority P2

**Goal**: display-only banks; Add modal; Import/Reconcile gates; no credentials. **Independent test**: rows name/status only; Add = modal; Import/Reconcile gates; no credential field.

- [ ] T031 [US6] Build the **Banks** tabpanel in `app/src/js/pages/finance.js`: bank name/status list from `BANKS`. Verification: rows name/status only; no account number/balance.
- [ ] T032 [US6] Add Add/Edit bank = `data-modal-trigger` backendRequired modal (name only) via `fin.bank.*`. Verification: modal honest; no persistence; no credential field.
- [ ] T033 [US6] Add Import statement / Match / Reconcile = `data-disabled-reason` gates; NO credentials, NO `type="password"`, NO API keys, NO bank integration. Verification: gates honest; no credential/`type=password`/API-key field.

**Checkpoint (US6)**: banks name/status only; Add modal; Import/Reconcile gates; no credentials.

---

## Phase 9 (US7): Export / print gates + accounting/analysis folds (F-J / F-L / F-M / F-N / F-O) — Priority P2

**Goal**: every export/print = honest gate; accounting/analysis = status-first or gate (no aggregate/chart). **Independent test**: no file/download/blob; Print = gate; no P&L/chart.

- [ ] T034 [US7] In `app/src/js/components/finance-actions.js` reclassify Print from `data-demo-action` → `disabledAction({reasonKey:'fin.reason.export'})` (F-J). Verification: no demo-action on Print; honest gate; finance.html re-pins.
- [ ] T035 [US7] Confirm Export CSV/PDF/Excel/Download stay `data-disabled-reason` gates in `finance-actions.js`; no real file (F-L). Verification: no `a[download]`/`.csv`/`.pdf`/`blob:`.
- [ ] T036 [US7] Verify no fake print/download/silent-no-op across the finance body. Verification: every export/print control shows a reason; 0 files.
- [ ] T037 [US7] Verify every finance planned/backendRequired card in `app/src/js/pages/finance.js`/`PLANNED_FINANCE` carries an honest visible reason (no dead placeholder), and any Export/Print/Generate/Approve control across the finance body is a gate — never a demo-action on a money/export/write action. Verification: 0 dead cards; 0 `data-demo-action` on export/print/write; every planned card shows a reason.
- [ ] T038 [US1] Represent the accounting hub + analysis-expenses as **status-first counts OR an honest planned gate** in `app/src/js/pages/finance.js`/`PLANNED_FINANCE` (F-M/F-N): NO Net Income/P&L/Total figure, NO chart/`<canvas>`. Verification: no aggregate money label; no chart.
- [ ] T039 [US1] Represent analysis-invoices as **status counts** (row counts by paid/due/overdue status) or a gate (F-O); no aggregate money totals, no chart. Verification: status counts only; no money total; no chart.

**Checkpoint (US7)**: all export/print honest; accounting/analysis figure/chart-free.

---

## Phase 10 (US8): Finance menu coverage gate (F-Q)

**Goal**: prove every finance nav item classified; `nav.config.js` 0-diff. **Independent test**: six-wallet-locked + membership byte-verbatim; Salaries/Banks tabs render.

- [ ] T040 [US8] Read-only verify `app/src/js/nav.config.js` finance sub-section is **0-diff** and every item is classified in `spec/finance-menu-coverage-inventory.md` (8 items, 0 unclassified; disabled sub-items = honest future-backend gates). Verification: `git diff --stat app/src/js/nav.config.js` empty; inventory complete.
- [ ] T041 [US8] Keep the existing finance nav smoke assertions (six-wallet-locked + finance sub-section membership) **byte-verbatim** in `app/tests/smoke/run.cjs`, and add an assert that the Salaries + Banks tabs render in the finance hub. Verification: nav asserts unchanged; hub-tab assert PASS.

**Checkpoint (US8)**: finance menu fully classified; nav 0-diff; coverage proven in smoke.

---

## Phase 11 (US9): Future-owner / exclusion (F-R…F-V)

**Goal**: build no real-money integration; render no secret. **Independent test**: no credential/gateway/teacher-portal-salary/family-payment surface.

- [ ] T042 [US9] Verify F-R (payout-providers→future-backend), F-S (payment-gateway→031/future-backend), F-T (teacher-portal salary twin→excluded), F-U (family payment→excluded), F-V (teacher compensations figure-free/excluded) are NOT built; no `type="password"`/API-key/webhook/secret/`paymob`/`payoneer` text anywhere; no teacher-portal/family payment page. Verification: `spec/future-owner-register.md` complete; grep built finance bodies for credential/secret tokens = 0.
- [ ] T043 [US9] Confirm the future-owner records are complete and each out-of-scope surface stays an honest gate/exclusion. Verification: register lists each with owner + rationale.

**Checkpoint (US9)**: all real-money integrations owned/excluded; 0 secrets rendered.

---

## Phase 12 (US1): Spec-009 supersession + cross-cutting action completion (F-P)

**Goal**: declare the supersession; every finance action honest. **Independent test**: supersession declared; no forbidden pattern.

- [ ] T044 [US1] Declare the Spec-009 supersession per `spec/contracts/spec-009-supersession-contract.md`: record it in `spec/implementation-status.md` (which finance smoke counts/assertions are lifted vs kept byte-verbatim) and apply the smoke amendment (supersede the 9-planned-cards count/finance body-structure; keep 4-tiles/9-invoices/6-payments/9-drawers + permanent asserts byte-verbatim). Verification: supersession declared, not silent; permanent guarantees intact.
- [ ] T045 [US1] Verify no forbidden pattern on finance surfaces via `app/tests/smoke/run.cjs`: `href="#"`==0, no raw keys, no dead button, no unexplained disabled, no fake pay/mark-paid/salary-generation/payout/bank-import/reconcile/export/print, no status mutation on confirm, no computed money figure, no chart. Verification: smoke PASS; all patterns 0.

**Checkpoint**: supersession declared; all finance actions honest.

---

## Phase 13 (US10): Smoke / a11y / screenshots

**Goal**: additive verification; protected asserts byte-verbatim. **Independent test**: build 97 / smoke PASS / a11y 0/0 / screenshots 0 console errors.

- [ ] T046 [US10] Extend `app/tests/smoke/run.cjs` with an ADDITIVE Spec-030 block (per `spec/contracts/smoke-rescope-contract.md`): count==97; finance loads AR/EN; tab bar works; Salaries/Banks tabs render; **no salary/payout figure** on Salaries/Payouts/Class-report tab bodies (scoped pay grep, excluding invoice/payment amount literals); no `type=file`/`type=password`/API-key/webhook/secret; no `a[download]`/`.csv`/`.pdf`/`blob:`; no `<canvas>`/chart; no money aggregate/net/P&L label; Print = disabled-with-reason; confirm mutates 0 status chips. Verification: smoke PASS; additive + the declared supersession only.
- [ ] T047 [US10] Re-pin ONLY the sanctioned Spec-009 supersession assertions (9-planned-cards + finance body structure) in `app/tests/smoke/run.cjs`; keep **4-tiles/9-invoices/6-payments/9-drawers/forbidden-regex/no-mutation-on-confirm/no-receipt/finance-token-clean + payHit/tchPay/famPay/payFigure/child-view + 026/027/028/029 asserts BYTE-VERBATIM**. Verification: only the sanctioned supersession asserts changed; protected regexes untouched (diff review). (Same file as T046 → sequential.)
- [ ] T048 [US10] Add a11y matrix rows in `app/tests/a11y/run.cjs`: finance Salaries tab, Banks tab, a finance detail drawer, an Add-bank modal, an export gate (dark/light + mobile 390). Verification: critical=0 serious=0; gates/tabs aria-safe.
- [ ] T049 [US10] Add Spec-030 capture rows in `app/tests/screenshots/capture.cjs` (finance overview, invoices, payments, salaries board, class-salary-report gate, banks, detail drawer, Add-bank modal, mark-paid/approve gate, export gate, mobile 390, dark); update `app/screenshots/REVIEW.md`. Verification: screenshots captured, 0 console errors; REVIEW.md updated.

**Checkpoint (US10)**: build 97 / smoke PASS / a11y 0/0 / screenshots 0 errors; protected asserts byte-verbatim.

---

## Phase 14 (US11): Role-law + prior-spec protection + docs/final audit

**Goal**: role laws + prior specs green; record + guard-prove + confirm no commit. **Independent test**: teacher/family/student + 026-029 green; only finance HTML changed; HEAD unchanged.

- [ ] T050 [US11] Verify role laws via `app/tests/smoke/run.cjs`: teacher pay-free (16 teacher-portal + teacher-performance byte-identical; payHit/tchPay byte-verbatim), family zero-pay (famPay/payFigure byte-verbatim), student child-view — all green; the 030 salary boards are figure-free. Verification: protected regexes unchanged; teacher-portal/family/student pages byte-identical.
- [ ] T051 [P] Update `academy-dashboard-discovery/app/README.md` with a Spec-030 section (finance tabbed hub, figure-free salaries/payouts, count 97, Spec-009 supersession). Verification: section added; no over-claim.
- [ ] T052 [P] Update `CLAUDE.md` active-feature pointer → Spec 030 IMPLEMENTED (count 97, tabbed hub, figure-free, supersession, role laws green). Verification: pointer updated.
- [ ] T053 [P] Create `spec/implementation-status.md` (tasks T001–T055 complete; verification results; changed-file list; declared Spec-009 supersession). Verification: record present.
- [ ] T054 [US11] Run clean-code guard: grep new/changed finance source (incl. comments) for chart/canvas/apex, money arithmetic (`.reduce`/`+=`/`Sum`/`total =`/`amount [*+/-]`), salary/payout amount on salary/payout fixtures, credential/secret tokens; reword any disclaimer tripping forbidden tokens. Verification: guard clean.
- [ ] T055 [US11] Run test guard + final impact/diff review: smoke changes additive (payHit/tchPay/famPay/payFigure/child-view/026-029 asserts byte-verbatim; only the sanctioned Spec-009 supersession re-pins changed); `git diff --stat` shows ONLY `finance.html`/`.en` (+ shared assets) + allowed source (finance.js, finance-actions.js, finance-status.js?, fixtures/finance.js, ar/en.fin.js, app.css, tests, docs); `package.json`/`nav.config.js`/`enhance.js` **0-diff**; teacher-portal/family/student byte-identical; count 97; HEAD unchanged (no commit — watcher owns it). Verification: matches allowlist; STOP if any forbidden file changed; report Spec 030 ready for review.

**Checkpoint**: role laws + prior specs green; only finance HTML changed; supersession declared; HEAD unchanged.

---

## Dependencies & execution order

- **Phase 1 (T001–T008)** → gate; **T001 blocks everything** (Spec 029 must be committed first).
- **Phase 2 (T009–T014)** → foundational; blocks Phases 3–9 (fixtures + locales imported by the hub).
- **Phase 3 (US1, T015–T018)** → tab hub; blocks Phases 4–9 (tabs/sections mount into finance.js).
- **Phases 4–9 (T019–T039)** → all edit the shared `finance.js` + `finance-actions.js` + `fixtures/finance.js` + locales → **sequential (NOT [P])**.
- **Phase 10 (US8, T040–T041)** → verify + smoke (after the hub exists).
- **Phase 11 (US9, T042–T043)** → verification (read-only).
- **Phase 12 (T044–T045)** → supersession declaration + action-completion (after all source edits).
- **Phase 13 (US10, T046–T049)** → tests; smoke/a11y/screenshot files shared + sequential (NOT [P]).
- **Phase 14 (T050–T055)** → last; docs [P] among themselves (T051/T052/T053), then guards + diff review sequential.

## Parallel opportunities

- **[P] safe**: T007, T008 (read-only guards); T014 (isolated CSS); T051/T052/T053 (separate docs).
- **NOT [P]**: T009/T010/T011 (same fixture file); T012/T013 (mirrored locale edits — AR then EN); T015–T039 (shared `finance.js`/`finance-actions.js`); T046/T047 (same smoke file); all Phase 13 test edits; T054/T055 (final audit).

## Implementation strategy (MVP → increments)

- **MVP = US1 + US2** (T001–T021): finance tabbed hub + honest invoices. Deliverable, testable, count 97.
- **Increment 2 = US3 + US4** (T022–T028): monthly/payments + figure-free salaries/payouts.
- **Increment 3 = US5 + US6 + US7** (T029–T039): class-report + banks + export/print/accounting folds.
- **Increment 4 = US8 + US9** (T040–T043): menu coverage + future-owner/exclusion.
- **Verification = US10 + US11** (T044–T055): supersession + smoke/a11y/screenshots + role-law/guards + no-commit.

## Independent test criteria (per story)

- **US1**: finance hub loads AR/EN; Overview behavior-identical; no aggregate/chart. (T015–T018, T038, T039, T044)
- **US2**: invoices display-only; drawer read-only; every write a gate; no status mutation. (T019–T021)
- **US3**: monthly + payments honest; amount literal only; no receipt/refund/reconcile. (T022–T024)
- **US4**: salaries + payouts FIGURE-FREE; gates honest; no generation. (T025–T028)
- **US5**: class-salary-report figure-free/gated; no group-by/sum. (T029, T030)
- **US6**: banks name/status only; Add modal; Import/Reconcile gates; no credentials. (T031–T033)
- **US7**: every export/print = honest gate; no file; accounting/analysis figure/chart-free. (T034–T036, T038, T039)
- **US8**: all finance nav items classified; nav 0-diff; no dead item. (T040, T041)
- **US9**: real-money integrations owned/excluded; 0 secrets rendered. (T042, T043)
- **US10**: build/smoke/a11y/screenshots green; supersession declared. (T044–T049)
- **US11**: teacher pay-free / family zero-pay / student child-view / 026-029 green. (T050, T055)

## Guard laws (apply to every task)

Count 97 · ZERO new pages · `nav.config.js`/`package.json`/`enhance.js` 0-diff · invoice/payment amount literals only · **no salary/payout/compensation figure** · no money aggregate/total/net/P&L · no chart/`<canvas>` · no fake payment/mark-paid/salary-gen/payout/bank-import/reconcile/export · no status mutation on confirm · no `type=file`/`type=password`/credential/secret · closed `data-*` set only, no new hook/storage key/engine · `href="#"`==0 · no raw keys · no dead buttons · declared Spec-009 supersession · protected smoke asserts byte-verbatim · no commit/push · **do not start until Spec-029 is committed.**

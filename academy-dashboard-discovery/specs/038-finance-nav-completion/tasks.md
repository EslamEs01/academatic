# Tasks — Spec 038: Finance Nav Completion

**Feature dir**: `academy-dashboard-discovery/specs/038-finance-nav-completion/`
**Branch**: `feature/012-role-portal-foundation` · **Baseline**: HEAD `56bc418` (Specs 035/036/037 committed; tree clean). public HTML **115 → 115** (delta 0), admin menu **50**.
**Locked plan**: `plan.md` (D1–D38) + `contracts/*` (21). **This file plans work only — no implementation, no commit, no push.**

## Legend & rules
- Format: `- [ ] T### [P?] [US?] action — exact path. **Contract**: … **Done when**: measurable check.`
- `[P]` = parallelizable (independent file, no incomplete-task dep). **`src/js/pages/finance.js` is edited by nearly every implementation phase → those tasks are STRICTLY SERIAL (never `[P]`).** Other shared files (never `[P]` across phases): `src/js/nav.config.js`, `src/locales/ar.fin.js`, `src/locales/en.fin.js`, `src/styles/app.css`, `tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`. `[P]` only applies to AR-vs-EN locale within one phase, or a11y-vs-screenshots-vs-REVIEW/docs (different files). All paths under `academy-dashboard-discovery/app/` unless noted.
- **Binding finance no-fake-money + role-law (every task):** authored per-row amount **literals** only (SAR); row-**count** roll-ups only; salaries/staff **figure-free**; banks **no balance**; **FORBIDDEN**: computed total/subtotal/outstanding/balance/net/profit/loss/revenue/VAT/tax/salary/payout/per-class-pay; fake generate/PDF/export/download/send/receipt; fake mark-paid/settle/confirm/refund/reconcile/verify **mutation**; payment gateway; backend/API/network; `<canvas>`/chart/graph/score/rank/leaderboard; `type=file`/`type=password`/secret; `href="#"`; raw keys; dead buttons; new dependency; **`package.json`/`build-html.mjs`/`enhance.js`/`i18n.js` change** (0-diff). Every Create/Generate/PDF/Send/Mark-Paid/Record/Confirm/Refund/Export/Add-bank/Import/Reconcile/Verify/Approve = honest `data-disabled-reason` gate.
- **MOVE, never duplicate:** relocate `invoiceSection`/`paymentsSection` into their tabs (Overview loses the lists). Duplicating would double `#invoice-list`(9)/`.fin-pay-row`(6) and break the byte-verbatim asserts.

## Model routing (for implementation)
- **Opus**: finance no-fake-money validation; the finance.js 6-tab restructure (move-not-duplicate); the nav010 lockedFin/finLinks supersession; monthly-board no-computed-total boundary; clean-code + test-guard + final regression.
- **Sonnet**: ar/en.fin.js mirroring; scoped `.finm-*` CSS; a11y/screenshot rows; docs. **Agents must not edit the same file concurrently** (finance.js is single-writer).

## Baseline note
Baseline is committed + clean (HEAD `56bc418`). No green-tree caveat. Do not cut a branch; do not commit/push/stash/reset.

---

## Phase 1 — Preflight, baseline & targeted visual grounding (no story label)

- [X] T001 Confirm branch + HEAD + clean tree — `git status --short && git rev-parse --short HEAD && git branch --show-current`. **Done when**: branch `feature/012-role-portal-foundation`, HEAD `56bc418`, and the only changes are the spec-038 dir + `feature.json`. STOP if unrelated finance-scope source changes exist.
- [X] T002 Confirm feature pointer + count — `cat .specify/feature.json` + `find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l`. **Done when**: feature_directory = `…/038-finance-nav-completion`; count = **115**. STOP if not 115.
- [X] T003 Baseline gate — from `app`: `npm run build && npm run test:smoke && npm run test:a11y`. **Done when**: build green (115), smoke PASS, a11y critical=0 serious=0. STOP if any fails.
- [X] T004 Targeted Visual Grounding — re-inspect `src/js/pages/finance.js`, `src/js/fixtures/finance.js`, `src/js/components/tabs.js`, `src/js/nav.config.js`, `src/locales/ar.fin.js`+`en.fin.js`, `tests/smoke/run.cjs` (finance block + nav010 @≈1579-1601), legacy `output/…/management-{analysis-expenses,analysis-invoices,monthly-invoices,salary-class-report}.md`. **Contract**: `contracts/targeted-visual-grounding-contract.md`. **Done when**: a grounding note records: finance = 3 tabs (overview/salaries/banks); INVOICES 9 / PAYMENTS 6 / SALARIES 6 (4+2) / BANKS 4 / PLANNED_FINANCE 9; 7 nav locks; nav010 `finLinks===['finance']`, `lockedFin`=7-items, `finMembers`=8-item order; no stale path/count.
- [X] T005 Confirm admin-menu 50 — `grep -c "class=\"nav-item[^\"]*\" data-nav=" public/finance.html` (or nav.config count). **Done when**: 50 classified nav items.
- [X] T006 Confirm no Spec-038 implementation source already present — `git diff --stat HEAD -- src/js/pages/finance.js src/js/nav.config.js src/locales/ar.fin.js src/locales/en.fin.js`. **Done when**: all 0-diff (only planning docs changed so far).

## Phase 2 — Foundational: finance 6-tab shell + locale/CSS prep (no story label)

- [X] T007 Restructure `renderFinance()` tabs from 3 → 6 — `src/js/pages/finance.js`: `tabs({group:'finance', items:[overview,invoices,payments,monthly-invoices,salaries,banks], panels})`. Overview panel = `financeActions()` (keep it the FIRST `.report-actions`) + `plannedSection()` (9 `.report-card`) + the 9 baked `invoiceDrawer` templates + a short summary/links; invoices/payments/monthly-invoices panels are wired (filled in Phases 3-5); salaries/banks panels reuse the existing sections. **Contract**: `plan.md` Architecture + `contracts/nav-completion-contract.md`. **Done when**: build emits `data-tabs="finance"` with 6 `data-tabpanel`s (overview/invoices/payments/monthly-invoices/salaries/banks); overview default; `enhance.js`/`build-html.mjs` 0-diff.
- [X] T008 [P] Add finance tab + monthly-board locale (AR) — `src/locales/ar.fin.js`: `fin.tab.{invoices,payments,monthlyInvoices}` + `fin.monthly.{title,sub,generate,generateReason,export,exportReason,send,sendReason,m.*}`. **Contract**: `contracts/fixtures-locale-contract.md`. **Done when**: keys under existing `fin` root; `i18n.js` 0-diff.
- [X] T009 [P] Add finance tab + monthly-board locale (EN) — `src/locales/en.fin.js` (mirror of T008). **Done when**: EN mirrors AR exactly (0 divergence).
- [X] T010 Additive monthly-board CSS — `src/styles/app.css`: scoped `.finm-*` classes (RTL/LTR, light/dark, mobile-390). **Contract**: `contracts/fixtures-locale-contract.md` (CSS additive). **Done when**: additive only; no change to `.fin-row`/`.fin-tile`/`.fin-pay-row`/`.report-card`.
- **CHECKPOINT 2**: `npm run build` → 115 pages, 0 raw keys, `ar/en.fin.js` parity; 6 finance tabpanels present.

## Phase 3 — US1 Invoices (`finance.html#view=invoices`)

- [X] T011 [US1] MOVE the invoice surface into the invoices tab — `src/js/pages/finance.js`: relocate the 4 status `tile()`s + `invoiceSection()` (filterBar + single `#invoice-list` with 9 `.fin-row [data-row]` + row record-payment confirm + cancelled-row disabled record) from Overview into `panels['invoices']`. Overview no longer renders the list/tiles. Bake the 9 `inv-*` drawers exactly once (page-wide). **Contract**: `contracts/invoices-tab-contract.md` (MOVE, not duplicate). **Done when**: exactly ONE `#invoice-list` (9 rows) + 4 `.fin-tile`; Create/Generate/PDF/Send/Mark-Paid = `data-disabled-reason` gates; no computed total.
- [X] T012 [US1] Build + verify Invoices — from `app`: `npm run build`; open `public/finance.html#view=invoices` + `.en`. **Done when**: count 115; `#view=invoices` opens the Invoices tab on fresh load AR/EN; 9 rows + 4 tiles render; grep the invoices panel → 0 computed total / 0 `<canvas>`; drawers still 9 (`template[data-preview^="inv"]`).
- **CHECKPOINT US1**: invoices tab is a focused, honest display surface; `#invoice-list`=9 preserved; writes gated.

## Phase 4 — US2 Payments (`finance.html#view=payments`)

- [X] T013 [US2] MOVE the payments surface into the payments tab — `src/js/pages/finance.js`: relocate `paymentsSection()` (6 `.fin-pay-row` + Add/Reconcile gates) from Overview into `panels['payments']`; invoice-serial links reuse the existing `inv-*` drawer. **Contract**: `contracts/payments-tab-contract.md` (MOVE). **Done when**: exactly ONE `.fin-pay-row` list (6 rows); Record/Confirm/Refund/Export = gates; no settlement/gateway/mutation.
- [X] T014 [US2] Build + verify Payments — `npm run build`; open `public/finance.html#view=payments` + `.en`. **Done when**: count 115; `#view=payments` opens on fresh load AR/EN; 6 rows render; serial link opens `inv-*` drawer; 0 gateway token.
- **CHECKPOINT US2**: payments tab focused + honest; `.fin-pay-row`=6 preserved.

## Phase 5 — US3 Monthly Invoices (`finance.html#view=monthly-invoices`)

- [X] T015 [US3] Add `monthlyInvoicesSection()` — `src/js/pages/finance.js`: group the EXISTING 9 `INVOICES.rows` by authored `monthKey` into month sections; render per-row serial/family/amount-literal/status chip using NEW classes (`.finm-*`, id `#fin-monthly`) — never `.fin-row`/`#invoice-list`/`.fin-pay-row`/`.fin-tile`/`.report-card`; NO filterBar; Generate/Send/PDF = gates. **Contract**: `contracts/monthly-invoices-tab-contract.md`. **Done when**: no new fixture (derives from INVOICES); **no computed monthly total/sum**; the `monthlyInvoices` PLANNED_FINANCE card still present (plannedN stays 9).
- [X] T016 [US3] Build + verify Monthly Invoices — `npm run build`; open `public/finance.html#view=monthly-invoices` + `.en`. **Done when**: count 115; tab opens on fresh load AR/EN; the 9 invoices appear across the authored month groups (each invoice once); `#fin-monthly` uses `.finm-*` (0 `.fin-row`/`.report-card` added); grep → 0 computed total / 0 `<canvas>`; `.report-card`=9 unchanged.
- **CHECKPOINT US3**: monthly board is a derived display grouped by month; `fixtures/finance.js` 0-diff; plannedN=9.

## Phase 6 — US4/US5 Salaries & Staff Salaries (`finance.html#view=salaries`)

- [X] T017 [US4][US5] Verify the salaries tab serves both salaries + staffSalaries — `src/js/pages/finance.js` (no body change expected: `salariesSection()` already renders teacher + staff figure-free boards). **Contract**: `contracts/salaries-unlock-contract.md` + `contracts/staff-salaries-unlock-contract.md`. **Done when**: `#view=salaries` renders 4 teacher + 2 staff rows, name+status+period only; Generate/Approve/Mark-paid/Export = gates; if any edit was needed, it is figure-free.
- [X] T018 [US4][US5] Build + verify figure-free salaries — `npm run build`; open `public/finance.html#view=salaries` + `.en`. **Done when**: tab opens on fresh load AR/EN; grep the salaries panel → **0** salary/rate/hour_rate/fine/payout/payroll/currency amount (figure-free); writes gated.
- **CHECKPOINT US4/US5**: salaries tab figure-free; both nav items will deep-link here (Phase 8).

## Phase 7 — US7 Banks (`finance.html#view=banks`)

- [X] T019 [US7] Verify the banks tab — `src/js/pages/finance.js` (no body change expected: `banksSection()` renders 4 name+status rows + Add-bank name-only drawer + Import/Reconcile gates). **Contract**: `contracts/banks-unlock-contract.md`. **Done when**: `#view=banks` renders 4 rows, **no balance/number/credential**; Add/Import/Reconcile/Verify = gates.
- [X] T020 [US7] Build + verify Banks — `npm run build`; open `public/finance.html#view=banks` + `.en`. **Done when**: tab opens on fresh load AR/EN; grep banks panel → 0 balance/credential wording; writes gated.
- **CHECKPOINT US7**: banks tab honest (name+status only).

## Phase 8 — Nav unlocks & honest locks (no story label)

- [X] T021 Unlock the 6 finance nav items — `src/js/nav.config.js`: flip `invoices`/`payments`/`monthlyInvoices`/`salaries`/`staffSalaries`/`banks` from `status:'disabled'`+`reasonKey` → `status:'implemented'` + `route:'finance.html#view=…'` (invoices/payments/monthly-invoices/salaries/banks; **staffSalaries → `finance.html#view=salaries`**). **Contract**: `contracts/nav-completion-contract.md`. **Done when**: build-time dead-link guard passes; each has the correct `#view=` route.
- [X] T022 Keep classSalaryReport + finance-analysis honest — `src/js/nav.config.js`: `classSalaryReport` stays `status:'disabled'` + `reasonKey:'nav.reason.finance'` + lock; finance-analysis has NO nav item/route (represented by the `accountingExpenses` planned card). **Contract**: `contracts/class-salary-honest-lock-contract.md` + `contracts/finance-analysis-honest-lock-contract.md`. **Done when**: `git diff nav.config.js` shows ONLY the 6 flips (classSalaryReport unchanged); no FUTURE_ROUTES edit.
- [X] T023 Verify nav count/integrity — `npm run build`; count classified nav items + finance sub-section. **Contract**: `contracts/page-count-contract.md`. **Done when**: admin menu = **50**; count 115; finance sub-section membership/order unchanged (8 members: finance + 7); exactly one item still locked (classSalaryReport); 0 `href="#"`; 0 raw keys.
- **CHECKPOINT 8**: 6 unlocks + 1 kept lock; admin-menu 50; count 115.

## Phase 9 — Smoke regression & declared supersessions (no story label)

- [X] T024 nav010 lockedFin + finLinks supersession — `tests/smoke/run.cjs`: `lockedFin` (≈line 1586) `['invoices','monthlyInvoices','salaries','staffSalaries','payments','classSalaryReport','banks']` → **`['classSalaryReport']`**; the `finLinks` assert (≈1601) `=== ['finance']` → **`=== ['finance','invoices','monthlyInvoices','salaries','staffSalaries','payments','banks']`** (DOM order). **Preserve** `finMembers`/`expFinMembers` (≈1595/1600) and every other nav010 assert byte-verbatim. **Contract**: `contracts/lockedFin-smoke-supersession-contract.md`. **Done when**: the ONLY nav010 edits are these two; classSalaryReport still asserted disabled+reason+lock.
- [X] T025 Finance tab-structure assert (3→6) — `tests/smoke/run.cjs` (finance `page==='finance'` block): assert `[data-tabs="finance"]` has 6 `data-tabpanel`s = overview/invoices/payments/monthly-invoices/salaries/banks. **Contract**: `contracts/smoke-coverage-contract.md`. **Done when**: added/updated to expect 6 (was 3 or absent); no threshold weakened.
- [X] T026 Move interactive invoice checks to `#view=invoices` — `tests/smoke/run.cjs`: the record-payment before/after chip check + tile-filter interactive check now run with the invoices tab active (navigate `finance.html#view=invoices` or click the invoices tab first, since `#invoice-list` is no longer on the default overview tab). Static page-wide counts (9/6/4/9/9) stay as-is. **Contract**: `contracts/smoke-coverage-contract.md`. **Done when**: interactive clicks target visible controls; before/after status chip unchanged (no mutation) still asserted.
- [X] T027 Additive finance deep-link + honesty block — `tests/smoke/run.cjs`: fresh-context-per-view loop asserting the 6 `#view=` deep-links (`invoices/payments/monthly-invoices/salaries/banks`; staffSalaries→salaries) open exactly one visible `[data-tabs="finance"] [data-tabpanel]` === the view on fresh load AR/EN; monthly board shows 9 invoices across the authored month groups (each once); salaries figure-free; banks no balance; 0 external request; no computed money/gateway/`type=file`/`type=password`. **Contract**: `contracts/smoke-coverage-contract.md`. **Done when**: additive; all protected finance asserts (9/6/4/9/9/first-`.report-actions`/forbidden/no-receipt/no-mutation/tile-count) stay byte-verbatim.
- [X] T028 Run smoke — `npm run test:smoke`. **Done when**: PASS; the only assertion changes vs HEAD are T024/T025/T026 (declared) + the additive T027 block.
- **CHECKPOINT 9**: smoke PASS; nav010 supersession + 6-tab adaptation applied; every no-fake law green.

## Phase 10 — Accessibility & screenshot verification (no story label)

- [X] T029 [P] Additive a11y rows — `tests/a11y/run.cjs`: **all SIX** finance views `overview/invoices/payments/monthly-invoices/salaries/banks` × AR/EN × light/dark + mobile-390 + **open invoice-drawer state** (`#view=invoices` with a baked `inv-*` drawer open) + open bank-add drawer. **Contract**: `contracts/a11y-screenshot-contract.md`. **Done when**: the matrix covers all 6 views incl. overview + the invoice drawer open state; `npm run test:a11y` critical=0 serious=0.
- [X] T030 [P] Additive screenshot frames — `tests/screenshots/capture.cjs`: the 6 finance tabs + classSalaryReport honest-lock proof × AR/EN/dark/mobile. **Contract**: `contracts/a11y-screenshot-contract.md`. **Done when**: `node tests/screenshots/capture.cjs` → 0 console errors; frames captured.
- [X] T031 [P] Update screenshot review — `screenshots/REVIEW.md` (Spec 038 finance frames). **Done when**: 6 tabs + lock proof listed.
- **CHECKPOINT 10**: a11y 0/0; screenshots 0 console errors.

## Phase 11 — Impact protection, guards, docs & final audit (no story label)

- [X] T032 Impact-protection proof (**non-destructive — NO stash/reset/branch**) — capture baseline `#page-body` md5s during preflight (T001a) from a **detached temporary worktree of HEAD `56bc418` under `/tmp`** (`git worktree add --detach /tmp/spec038-baseline 56bc418` → `npm ci`/reuse + `npm run build` there → md5 each `public/*.html` `#page-body` slice), then compare against the implementation build's slices; **remove only the temp worktree** afterward (`git worktree remove /tmp/spec038-baseline`). The current working tree is never stashed/reset/altered. **Contract**: `contracts/impact-protection-contract.md`. **Done when**: every non-finance admin `#page-body`, all 16 portal pages, index, reports/families/students byte-identical to baseline; only `finance.html`/`.en` body (+ the shared sidebar across admin pages) differs; temp worktree removed.
- [X] T033 Forbidden-file 0-diff proof — `git diff --stat HEAD -- src/js/fixtures/finance.js package.json scripts/build-html.mjs src/js/enhance.js src/js/i18n.js`. **Contract**: `contracts/scope-guard.md`. **Done when**: `fixtures/finance.js` 0-diff (monthly derives from existing data); `package.json`/`build-html.mjs`/`enhance.js`/`i18n.js` 0-diff; no new dependency.
- [X] T034 Clean-code guard (Opus) over the full diff. **Contract**: `contracts/no-fake-money-contract.md` + `role-law-carryover-contract.md`. **Done when**: PASS — 0 blockers (no computed money/salary, figure-free salaries/banks, MOVE-not-duplicate, monthly no total, finance asserts preserved, only declared nav010 change, scope, 0-diff forbidden files, no gateway/type=file/href=#/raw-key).
- [X] T035 Test-guard (Opus) over changed tests. **Contract**: `contracts/lockedFin-smoke-supersession-contract.md`. **Done when**: PASS — additive except the declared nav010 lockedFin/finLinks + 6-tab + move-interactive adaptations; finance 9/6/4/9/9 asserts byte-verbatim; classSalaryReport still asserted locked; deep-link tests load `#view=`; no weakened threshold/no-fake law.
- [X] T036 [P] Docs — `README.md` + `CLAUDE.md` (repo root) Spec 038 section. **Done when**: 6 unlocks + 2 honest locks + count 115 + admin-menu 50 + no-fake-money recorded.
- [X] T037 [P] Implementation status — `specs/038-finance-nav-completion/implementation-status.md`. **Done when**: surfaces, nav changes, counts, verification, impact protection, nav010 supersession recorded.
- [X] T038 Full test gate — from `app`: `npm run build && npm test && npm run test:smoke && npm run test:a11y && node tests/screenshots/capture.cjs`. **Done when**: build 115; all green; PASS; 0/0; 0 console errors.
- [X] T039 Final audit — `git status --short`, `git diff --name-only`, count. **Done when**: count 115; only allowed files touched (`finance.js`, `nav.config.js`, `ar/en.fin.js`, `app.css`, tests, `REVIEW.md`, `README.md`, `CLAUDE.md`, spec dir, regenerated `public/`); no commit/push; Spec 038 safe-to-review verdict.

---

## Dependencies & order
- **Phase 1 → 2** gate everything. **Phase 2 (T007 shell)** blocks Phases 3-7 (panels fill the shell). **finance.js is single-writer** → T007 → T011 → T013 → T015 → T017 → T019 are a strict serial chain. **Phase 8 (nav unlocks)** depends on Phases 3-7 (routes must resolve to real tabs). **Phase 9** depends on all surfaces + nav. **Phases 10-11** last.
- **Locale**: T008/T009 [P] (AR vs EN) before the panels that use `fin.tab.*`/`fin.monthly.*` render (T007/T015). **CSS**: T010 before T015 (monthly board styling).
- **Tests serial**: T024 → T025 → T026 → T027 → T028 (all `tests/smoke/run.cjs`). A11y/screenshots/docs (T029/T030/T031, T036/T037) are `[P]` (different files).

## Parallel opportunities
- `[P]`: T008/T009 (AR/EN locale); T029/T030/T031 (a11y/screenshots/REVIEW); T036/T037 (README+CLAUDE / implementation-status). **Never `[P]`**: any `finance.js`, `nav.config.js`, or `tests/smoke/run.cjs` task.

## Story coverage
- **US1** Invoices → Phase 3 (T011-T012). **US2** Payments → Phase 4 (T013-T014). **US3** Monthly Invoices → Phase 5 (T015-T016). **US4/US5** Salaries + Staff → Phase 6 (T017-T018). **US7** Banks → Phase 7 (T019-T020). Nav/locks (incl. **US6** classSalaryReport honest lock + finance-analysis defer — verification only, no implementation) → Phase 8 (T021-T023). **US8** no-fake + carryover → Phases 9-11 (T024-T035).

## MVP / safest path
- **MVP = Phases 1-2 + US1 + US2 + Phase 8 (nav)** — the finance hub gains focused invoices/payments tabs + the 6 unlocks (count 115, admin-menu 50), the core of the finance nav completion.
- **Full = + US3 (monthly) + US4/US5 (salaries) + US7 (banks) + Phases 9-11.**
- classSalaryReport + finance-analysis are **honest locks (no implementation)** — verified, never built.

## Totals
- **39 tasks** across 11 phases. Implementation: T007-T023 (finance.js single-writer chain + locale/CSS/nav). Verification/tests/guards/docs: T024-T039. Story tasks: US1=2, US2=2, US3=2, US4/US5=2, US7=2; nav/locks=3; setup=6; smoke=5; a11y/screenshots=3; impact/guards/docs/audit=8.
- **No implementation performed. No commit. No push.** classSalaryReport/finance-analysis get NO implementation tasks (honest locks).

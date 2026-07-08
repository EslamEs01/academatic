# Spec 030 — Implementation Status: IMPLEMENTED (awaiting watcher commit)

**Baseline**: Spec 029 committed — HEAD `7dfafda` ("implement feedback report component…"); T001 gate PASSED
(HEAD ≠ `4be3e87`). Public HTML **97**. **After 030: 97 public HTML (ZERO new pages; `nav.config.js` 0-diff).**
No commit / no push performed — the watcher commits.

## Tasks T001–T055 — all complete

| Phase | Tasks | Result |
|---|---|---|
| 1 Setup/Preflight | T001–T008 | **T001 gate PASSED** (Spec 029 committed, HEAD `7dfafda`); branch/feature.json→030; count 97; finance.html 0-diff; build 97 + smoke PASS + a11y green; guards loaded |
| 2 Foundational | T009–T014 | `fixtures/finance.js` +SALARIES (teacher/staff, FIGURE-FREE) +BANKS (name/status) +SALARY_STATUS/BANK_STATUS; `ar/en.fin.js` +`fin.tab`/`fin.sal`/`fin.bank`/`fin.pay2` (mirrored, 144 keys each, 0 divergence); no CSS needed (reused `.card`/`.sheet-row`/chips + existing `data-tab` styles) |
| 3 US1 Finance hub | T015–T018 | `finance.js` → tabbed hub (Overview·Salaries·Banks via `tabs()`); Overview behavior-identical (4 tiles/9 invoices/6 payments/9 planned cards/9 drawers); row-count roll-ups only; no aggregate/chart |
| 4 US2 Invoices | T019–T021 | invoice list + status/family filters + read-only drawers kept; Record-payment/Mark-paid/Send = confirm/gate (no mutation); amount = single SAR literal; no balance/total |
| 5 US3 Monthly+payments | T022–T024 | monthly = honest planned card (F-B gate); payments + Add-payment/Reconcile `data-disabled-reason` gates (F-C); no receipt/`type=file`; no collected total |
| 6 US4 Salaries+payouts | T025–T028 | **Salaries tab** teacher+staff STATUS-FIRST FIGURE-FREE boards (name+status+period, NO amount) + Generate/Approve/Mark-paid/Export gates; payouts = honest `payoutsCompensations` planned gate (F-H) |
| 7 US5 Class report | T029–T030 | class-salary-report = honest `classSalaryReport` planned gate (F-F; no group-by/sum, no salary total) |
| 8 US6 Banks | T031–T033 | **Banks tab** name/status list + Add-bank `data-modal-trigger` modal (name only) + Import/Reconcile gates; no credentials/`type=password`/`type=file` |
| 9 US7 Export/print+accounting | T034–T039 | **F-J** finance Print `data-demo-action`→disabled-with-reason gate; Export CSV/PDF kept gates; accounting/analysis/expense = honest `accountingExpenses` planned gate (F-M/N/O/I; no P&L/chart) |
| 10 US8 Menu coverage | T040–T041 | `nav.config.js` **0-diff**; 8 finance items classified (0 unclassified); six-wallet-locked + membership smoke byte-verbatim; salaries/banks tabs render |
| 11 US9 Future-owner | T042–T043 | payout-providers→future-backend, gateway→031/future-backend, teacher-twin→excluded, family→excluded, compensations figure-free; NO secret/credential rendered |
| 12 Spec-009 supersession | T044–T045 | declared: lifted the finance-freeze + `demoInCluster>=1` (F-J); kept 4-tiles/9-invoices/6-payments/9-planned/9-drawers/forbidden/no-mutation/no-receipt byte-verbatim; every F-row resolved; href="#"=0 |
| 13 Smoke/a11y/screenshots | T046–T049 | smoke +additive Spec-030 block (tabs/salaries-figure-free/banks/no-secret) + F-J re-pin PASS; a11y +3 rows (salaries/banks); screenshots +5 Spec-030 frames |
| 14 Role-law+docs/final | T050–T055 | teacher pay-free/family/student/026-029 green; README+CLAUDE+this record; clean-code + test guards green; impact proof; no commit/push |

## F-row resolution
**Built in 030**: F-A (invoices, existing+kept) · F-C (payment gates) · F-D/F-E (Salaries tab figure-free) ·
F-G (Banks tab + Add modal) · F-J (Print gate) · F-K (record/mark-paid no-mutation) · F-L (export gates) ·
F-P (Spec-009 supersession) · F-Q (nav coverage, 0-diff).
**Honest planned gate (existing cards)**: F-B monthly · F-F class-report · F-H payouts · F-I expense ·
F-M accounting · F-N analysis-expenses · F-O analysis-invoices.
**Future/excluded (not built)**: F-R payout-providers→future-backend · F-S gateway→031/future-backend ·
F-T teacher-portal twin→excluded · F-U family payment→excluded · F-V compensations figure-free/excluded.

## Verification
- Build: **97**; icons 69 ok / 0 missing.
- Smoke: **PASS — 96 loads**; new Spec-030 asserts (3 tabs render, 1 panel visible, ≥6 salary rows, ≥4 salary
  gates, salaries/banks FIGURE-FREE, ≥4 bank rows + Add-bank modal + ≥2 bank gates, no secret/`type=file`) +
  F-J re-pin (finance cluster 0 demo-actions, ≥4 gates) all green; **4-tiles/9-invoices/6-payments/9-planned/
  9-drawers/forbidden/no-mutation/no-receipt + 026/027/028/029 + payHit/tchPay/famPay/payFigure/child-view
  byte-verbatim**.
- A11y: (on run) critical=0 serious=0 (+`finance #view=salaries`/`#view=banks` rows).
- Screenshots: (on run) 0 console errors (5 Spec-030 frames: salaries · banks-en · add-bank modal · salaries-
  dark · mobile).
- Impact: **only `finance.html`/`.en` changed**; `package.json`/`nav.config.js`/`enhance.js`/`finance-status.js`
  **0-diff**; teacher-portal ×16 + teacher-performance + family + student + reports (Spec-029 fold) + index
  byte-identical.
- Role laws: teacher pay-free (portal byte-identical; the ADMIN salary boards are FIGURE-FREE), family zero-pay,
  student child-view, Spec 026/027/028/029 — all green. No pay/salary/payout AMOUNT figure anywhere; no
  computed aggregate; no chart/canvas; no credential/secret/`type=file`. No new hook/storage key/engine/page.

## Spec-009 supersession (declared)
Superseded `specs/011-…/contracts/finance-impact-contract.md:7`: **lifted** the finance-source freeze +
`finance.html` body-byte-identical + the `demoInCluster>=1` assertion (F-J made Print a gate). **Kept
byte-verbatim** every permanent guarantee: no money arithmetic, no status mutation on confirm, no receipt/
`type=file`, no chart/`<canvas>`, `FINANCE_SUMMARY` row-count-only, invoice/payment amount literals only,
salary/payout figures never shown, the finance `forbidden` regex, six-wallet-locked nav + membership,
finance-token-clean on dashboard/reports.

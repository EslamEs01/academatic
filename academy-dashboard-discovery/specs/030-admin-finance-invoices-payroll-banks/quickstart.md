# Spec 030 — Quickstart (implementation runbook, for `/speckit.tasks` → implement)

Plan-only reference. Do NOT run during planning. **Do NOT start implementation until the Spec-029 watcher
commit lands** (avoid mixing uncommitted 029 app changes). Baseline: 97 HTML; `finance.html` 0-diff.

## Preflight (at implement time)
```bash
cd academy-dashboard-discovery/app
git rev-parse --short HEAD                 # expect the Spec-029 commit (NOT 4be3e87)
find public -maxdepth 1 -name '*.html' | wc -l   # expect 97
npm run build && npm run test:smoke        # expect 97 / PASS
git diff --stat -- public/finance.html     # expect 0-diff at start
```
If Spec 029 is still uncommitted OR count ≠ 97 → STOP.

## Build order (fold into finance.html; no new page; nav 0-diff)
1. **Fixtures** — extend `src/js/fixtures/finance.js`: add `SALARIES` (teacher/staff, FIGURE-FREE), `BANKS`
   (name/status), optional `PAYOUTS` (FIGURE-FREE); update `PLANNED_FINANCE`; keep `FINANCE_SUMMARY` row-count.
   NO amount on salary/payout rows. See `data-model.md`.
2. **Locale** — extend `src/locales/ar.fin.js` + `en.fin.js` (`fin.tab.*`/`fin.sal.*`/`fin.bank.*`/`fin.payout.*`
   + gate reasons), AR/EN mirrored.
3. **Page** — in `src/js/pages/finance.js`: wrap the current content in an **Overview** `data-tab` panel
   (default visible, behavior-identical) + add **Salaries** and **Banks** tabpanels; add a `tabs()` bar. Reuse
   the course/group `data-tab` pattern.
4. **Salaries tab** — status-first FIGURE-FREE teacher+staff board (name+status+period); Generate/Approve/
   Mark-paid/Export = `disabled-with-reason` gates.
5. **Banks tab** — name/status list; Add/Edit bank = `data-modal-trigger` backendRequired modal (name only);
   Import/Reconcile = gates.
6. **F-J Print** — in `src/js/components/finance-actions.js`, change Print from `data-demo-action` →
   `disabledAction({reasonKey:'fin.reason.export'})`.
7. **Folded thin surfaces** — monthly-invoices/class-salary-report/payouts/accounting/analysis as status-first
   sub-sections or honest gates (planning-final in tasks); NO figures/charts.
8. **CSS** — only if a salary/bank row needs it; additive; reuse `.fin-*`/`.sheet-row`/`data-tab` styles.

## Verify
```bash
npm run build                        # expect 97; icons 0 missing
npm run test:smoke                   # PASS + new 030 asserts
npm run test:a11y                    # critical=0 serious=0
node tests/screenshots/capture.cjs   # 0 console errors
```

## Guard greps (must all pass)
```bash
# no salary/payout figure on the salary/payout tab bodies (scoped — invoice/payment amounts are OK elsewhere)
# (smoke does the scoped body assert; source-level:)
grep -rniE "amount|fixed|fine|gift|hour.?rate|\btotal\b|salary" src/js/fixtures/finance.js | grep -iE "sal[0-9]|SALARIES|PAYOUTS" && echo REVIEW || echo OK
# no money arithmetic in finance source
grep -rnE "\.reduce\(|\+=|\bSum\b|total\s*=|amount\s*[*+/-]" src/js/pages/finance.js src/js/fixtures/finance.js src/js/components/finance-*.js && echo FAIL || echo OK
# no chart/canvas
grep -rniE "canvas|chart\.?js|apexcharts|amcharts|\bd3\b|highcharts|recharts|getContext" src/js/pages/finance.js src/js/components/finance-*.js src/js/fixtures/finance.js && echo FAIL || echo OK
# no credential/secret/upload in built finance body
grep -rniE 'type="file"|type="password"|api.?key|webhook|secret|paymob|payoneer' public/finance.html public/finance.en.html && echo FAIL || echo OK
# no href="#" sitewide
grep -rn 'href="#"' public/*.html && echo FAIL || echo OK
# nav.config / package.json 0-diff
git diff --stat -- src/js/nav.config.js package.json   # expect empty
# teacher-portal byte-identical
git diff --stat -- public/teacher-portal.html public/teacher-portal.en.html   # expect empty
```

## Expected changed outputs (intended deltas ONLY)
`finance.html`/`.en` (+ shared-asset hashes). Everything else byte-identical (teacher-portal ×16, teacher-
performance, family, student, reports + Spec-029 fold, all 026/027/028/029 pages, index).

## Stop conditions
Spec 029 uncommitted at implement time · count ≠ 97 · unclassified finance nav item · unresolved F-row · new
page without candidate-test · fake payment/mark-paid/salary-generation/payout/bank-import/reconcile/export ·
salary/payout/compensation figure · money total/net/P&L · chart/canvas · `type=file`/`type=password`/API-key/
webhook/secret · status mutates after confirm · teacher-portal/family change · `href="#"`/dead button/raw key ·
`package.json`/`nav.config.js` change · new hook/key/engine.

## Docs
Update `README.md`, `CLAUDE.md`, `screenshots/REVIEW.md`, `specs/030-…/implementation-status.md`. No commit/push
(watcher commits). Declare the Spec-009 supersession in the implementation record.

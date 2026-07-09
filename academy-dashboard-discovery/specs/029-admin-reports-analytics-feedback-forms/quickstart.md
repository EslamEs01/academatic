# Spec 029 — Quickstart (implementation runbook, for `/speckit.tasks` → implement)

Plan-only reference. Do NOT run during planning. Baseline: HEAD `4be3e87`, 97 HTML, clean.

## Preflight
```bash
cd academy-dashboard-discovery/app
git rev-parse --short HEAD           # expect 4be3e87
find public -maxdepth 1 -name '*.html' | wc -l   # expect 97
npm run build && npm run test:smoke  # expect 97 / PASS
```
If count ≠ 97 → STOP.

## Build order (additive; no new page)
1. **Fixture** — create `src/js/fixtures/report-feedback.js` (`FEEDBACK`, `FEEDBACK_CATEGORIES`, `FORMS` —
   authored, no %, no pay). See `data-model.md`.
2. **Locale** — extend `src/locales/ar.rep.js` + `src/locales/en.rep.js` (`rep.fb.*`/`rep.form.*`/`rep.fbcat.*`),
   AR/EN mirrored; reuse `common.backendRequiredNote`.
3. **Component** — create `src/js/components/report-feedback.js`: `feedbackSection()` (rows + `filterBar` +
   read-only drawers + create-feedback/create-category modals + manage-categories drawer),
   `formsSection()` (list + create-form modal + read-only drawers). Reuse `previewTemplate`/`sheetRow`,
   `filterBar`, `card`/`data-table`, `rating-pill`, status chips.
4. **Reports page** — in `src/js/pages/reports.js`, append `${feedbackSection()}${formsSection()}` after
   `detailSections()`; import from `report-feedback.js`.
5. **R-G** — in `src/js/components/report-actions.js`, change Print from `data-demo-action` → `disabledAction`
   (reason `rep.reason.export`).
6. **R-E** — in `src/js/components/outcome-details.js`, change `att.act.feedback` from `demoBtn` →
   `data-modal-trigger data-modal-title-key="att.act.feedback" data-modal-note-key="common.backendRequiredNote"`.
7. **R-F** — in `src/js/components/evaluation-rubric.js`, change `eval.approve` from `data-demo-action` →
   `confirmAction({ titleKey:'eval.approveTitle', msgKey:'eval.approveMsg', confirmKey:'eval.approveCta',
   toastKey:'eval.approveToast' })` (backendRequired confirm).
8. **CSS** — only if a feedback-row layout needs it; additive; reuse `.rep-*`/`.sheet-row`/`.rating-pill`.

## Verify
```bash
npm run build                        # expect 97; icons 0 missing
npm run test:smoke                   # PASS + new 029 asserts
npm run test:a11y                    # critical=0 serious=0
node tests/screenshots/capture.cjs   # 0 console errors
```

## Guard greps (must all pass)
```bash
# no chart engine / canvas
grep -rniE "canvas|chart\.js|apexcharts|amcharts|\bd3\b|highcharts|recharts" src/js/fixtures/report-feedback.js src/js/components/report-feedback.js && echo FAIL || echo OK
# no computed %/score/rank in new source
grep -rniE "percent|percentage|\bscore\b|\brank\b|leaderboard|reduce\(|\.length \* 100" src/js/components/report-feedback.js src/js/fixtures/report-feedback.js && echo REVIEW || echo OK
# no pay/finance token in new source
grep -rniE "salary|payroll|payout|invoice|amount|price|ريال|جنيه|راتب|\bAED\b|\bEGP\b|\bEUR\b|[$€£]" src/js/fixtures/report-feedback.js src/js/components/report-feedback.js && echo FAIL || echo OK
# no href="#" sitewide
grep -rn 'href="#"' public/*.html && echo FAIL || echo OK
# finance files unchanged
git diff --stat -- src/js/pages/finance.js src/js/fixtures/finance.js 'src/js/components/finance-*.js' 'src/locales/*.fin.js'   # expect empty
# teacher-portal byte-identical
git diff --stat -- public/teacher-portal.html public/teacher-portal.en.html   # expect empty
# package.json 0-diff
git diff --stat -- package.json   # expect empty
```

## Expected changed outputs (intended deltas ONLY)
`reports.html`/`.en`, `attendance.html`/`.en`, `sessions.html`/`.en`, `student.html`/`.en` (+ shared-asset
hashes). Everything else byte-identical (teacher-portal ×16, teacher-performance, teacher/teachers/course/
group/family, all 027/028 pages, portals, admin-ops, finance, index).

## Stop conditions
count ≠ 97 · unclassified nav item · unresolved R-row · new page without candidate-test · chart/canvas ·
computed %/score/rank · fake report/feedback/export · pay figure in a 029 body · finance file change ·
teacher-portal change · family pay figure · student primary wording · `href="#"` · dead button · raw key ·
`package.json` change · new hook/key/engine.

## Docs
Update `README.md`, `CLAUDE.md`, `screenshots/REVIEW.md`, and `specs/029-…/implementation-status.md`. No
commit/push (watcher commits).

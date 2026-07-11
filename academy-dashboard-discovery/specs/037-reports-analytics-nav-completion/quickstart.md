# Quickstart — Spec 037 (implementation runbook, NOT executed here)

> Do not begin until the maintainer approves continuing on the uncommitted-but-green 035/036 tree.

## Preflight (gate)
```bash
cd academy-dashboard-discovery/app
git rev-parse --short HEAD          # expect the committed baseline (035/036 ideally committed first)
git branch --show-current           # feature/012-role-portal-foundation
cat ../../.specify/feature.json      # → 037
find public -maxdepth 1 -name '*.html' | wc -l   # 115
npm run build && npm run test:smoke && npm run test:a11y   # green / PASS / 0-0
```
STOP if count ≠ 115, feature.json ≠ 037, or baseline red.

## Build order
1. **reports.js** — extract current `renderReports()` body into an `overviewPanel()`; wrap with `tabs({group:'reports', items:[overview,monthly,analysis], panels})`. Add `monthlyPanel()` + `analysisPanel()` reading `MONTHLY_REPORTS`/`DATA_INSIGHTS` (new in `fixtures/reports.js`). New copy in `ar/en.rep.js`. New panels use `#mr-grid`/`.mr-*`, `#da-grid`/`.da-*` (never `#reports-grid`/`.report-card`).
2. **families.js** — wrap current body as `directory` panel; add `categories` panel rendering `FAMILY_CATEGORIES` (authored counts) + reachable `famCatDrawer` + Create-category gate. Copy in `ar/en.fam.js`.
3. **students.js** — wrap current body as `directory` panel; add `results` + `evaluation` panels (cross-student boards, per-student deep-links to `student.html#view=results`/`#view=evaluation`). Copy in `ar/en.fam.js`.
4. **nav.config.js** — flip monthlyReports/dataAnalysis to implemented (+routes); refine familyCategories/studentResult/studentEvaluation routes; drop FUTURE_ROUTES `monthlyReports`+`dataAnalysis`.
5. **app.css** — additive board styles only.
6. **tests** — additive smoke/a11y/screenshots.
7. **docs** — README / CLAUDE / REVIEW / implementation-status.

## Verify
```bash
npm run build     # 115 pages, 0 raw keys, ar/en parity
npm run test:smoke   # PASS + additive Reports/Analytics + correctives block
npm run test:a11y    # critical=0 serious=0
node tests/screenshots/capture.cjs   # 0 console errors
git diff --stat -- src/js/nav.config.js scripts/build-html.mjs src/js/i18n.js package.json src/js/enhance.js
find public -maxdepth 1 -name '*.html' | wc -l   # 115
```
Expect: `build-html.mjs`/`i18n.js`/`package.json`/`enhance.js` 0-diff; only reports/families/students bodies + shared sidebar changed; student.html/family.html byte-identical.

## Manual deep-link smoke (fresh load each)
- `reports.html#view=monthly` / `.en` → Monthly tab active, board visible, no chart/computed/finance, exports gated.
- `reports.html#view=analysis` / `.en` → Analysis tab active.
- `families.html#view=categories` / `.en` → labeled Categories board, reclassify reachable, Create gated.
- `students.html#view=results` / `.en` → Results board, per-student deep-links present, no computed score.
- `students.html#view=evaluation` / `.en` → Evaluation board, per-student deep-links, no rubric total.
- `reports.html` (no hash) → overview tab; existing reports asserts still pass.

## Guards before report
- `$clean-code-guard` over the full diff (scope creep, count drift, wrong flips, fake actions, computed metric, canvas, finance figure, locale divergence, raw keys, href="#", role-law regression).
- `$test-guard` over changed tests (additive only; deep-link tests actually load `#view=`; no weakened asserts; no hidden pass).

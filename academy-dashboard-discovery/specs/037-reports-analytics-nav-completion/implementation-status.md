# Implementation Status — Spec 037 (Reports / Analytics Nav Completion + Missing-Pages Correctives)

**Status: IMPLEMENTED** (awaiting the watcher commit). Branch `feature/012-role-portal-foundation`. **Baseline: the uncommitted-but-green Spec 035 + Spec 036 working tree** (HEAD `1eb4d9a` = Spec 034; the watcher had not committed Specs 035/036, and the maintainer approved continuing on the green tree via the implement command). **No commit / no push** performed.

## Verdict
The two Reports/Analytics «قريبًا» items become real display-only tabs on `reports.html`, and the three flagged Spec-035 items are strengthened into folded boards — all as `tabs()`/`#view=` folds on existing pages. Count held **115**; admin menu held **50**. Safe to review; recommend committing 035 → 036 → 037 as three separate commits.

## Counts / invariants
- Public HTML **115 → 115** (delta 0; 0 new page bases, 0 new files). `find public -name '*.html' | wc -l` = 115.
- Nav: **2 flips** (monthlyReports/dataAnalysis `planned → implemented`) + **3 route refinements** (familyCategories/studentResult/studentEvaluation) + `FUTURE_ROUTES` trim of `monthlyReports`/`dataAnalysis` only. Reports category now **0 planned** «قريبًا»; admin-menu **50**.
- `package.json` **0-diff**; `enhance.js` **0-diff**; `build-html.mjs` **0-diff** (reports/families/students already registered); `i18n.js` **0-diff** (extended the existing `ar/en.rep.js` + `ar/en.fam.js` modules). *(The build-html/i18n diffs vs HEAD are the pre-existing Spec 035 baseline, not Spec 037.)*
- No dependency; no backend/API/websocket/engine; no new `data-*` hook/storage key.

## Surfaces
| Item | Disposition | Route | Writes |
|---|---|---|---|
| monthlyReports | display-only tab on reports.html | `reports.html#view=monthly` | Export/Generate = backendRequired gates |
| dataAnalysis | display-only tab on reports.html | `reports.html#view=analysis` | Run/Export = backendRequired gates |
| familyCategories | labeled Categories board tab on families.html | `families.html#view=categories` | Create = gate; Reclassify = existing fam-cat drawer gate |
| studentResult | cross-student Results board on students.html | `students.html#view=results` | none (display; per-student deep-link → `student.html#view=results`) |
| studentEvaluation | cross-student Evaluation board on students.html | `students.html#view=evaluation` | none (display; per-student deep-link → `student.html#view=evaluation`) |

## Mechanism
- All five surfaces = the shared `tabs({group,…})` widget + `#view=` deep-link (enhance.js syncs the hash on fresh load; proven by Spec 036). The existing page body becomes the **first/default** tab verbatim (reports → overview; families → directory; students → directory), so all prior asserts stay green (`#reports-grid` + 7 `.report-card`, families card grid + drawers, students table + drawers).
- **Single-global `[data-no-results]` constraint honored**: enhance.js (forbidden to edit) uses one global no-results query, so the new tabs are **pure display boards** (grouped/sectioned, no live filterBar) — the existing single filterBar per page (overview/directory) is preserved and untouched.

## Files changed (Spec 037)
- **Modified:** `src/js/pages/reports.js` (overview wrap + Monthly + Analysis panels), `src/js/pages/families.js` (Directory + Categories tabs + board), `src/js/pages/students.js` (Directory + Results + Evaluation tabs + boards), `src/js/fixtures/reports.js` (+`MONTHLY_REPORTS`/`MONTHLY_SUMMARY`/`DATA_INSIGHTS` authored), `src/js/nav.config.js` (2 flips + 3 refinements + FUTURE_ROUTES trim), `src/locales/ar.rep.js`+`en.rep.js` (`rep.tab.*`/`rep.monthly.*`/`rep.analysis.*`), `src/locales/ar.fam.js`+`en.fam.js` (`fam.cats.*`/`stu.vtab.*`/`stu.resBoard.*`/`stu.evalBoard.*`), `src/styles/app.css` (additive `.mr-*`/`.brd-*`), tests (smoke/a11y/screenshots — additive), docs.
- **Unchanged:** `student.js`, `family.js`, `result-summary.js`, `evaluation-rubric.js` (single-student drill-downs reused as-is), `enhance.js`, `build-html.mjs`, `i18n.js`, `package.json`.

## No-fake / no-computed / finance-free proof
- **0** computed score/rank/GPA/percentage/rubric-total/average; **0** `<canvas>`/`getContext`/chart; trend chips are AUTHORED categorical labels (improving/steady/declining), not computed.
- Reports tabs **finance-free**: 0 money/currency figure in the monthly/analysis panels (the `salary`/`sara` grep hits are the shared finance sidebar + the overview feedback filter option, outside the new panels).
- Family categories use the authored `FAMILY_CATEGORIES.count` literals — no computed statistic; Create/Reclassify are gates; 0 mutation.
- Student boards read existing per-row `results`/`evaluation` categorical fields + `certificates.length` count literal only; no new derivation; per-student deep-links target the unchanged single-student tabs.

## Verification
- `npm run build` → **115 pages**, 0 raw keys, `ar/en.rep.js` parity **251/251**, `ar/en.fam.js` parity **393/393** (0 divergence).
- `npm run test:smoke` → **PASS** (114 loads) + additive Reports/Analytics + correctives block (nav037 anchors + reports 0-planned; reports/families/students tab widgets; overview preserves 7 cards; no computed/canvas/money in new panels; per-student deep-links; gates; the 5 deep-links open the right tab on fresh load AR/EN). Sanctioned amendments: the nav035 route asserts updated to the refined routes (familyCategories→#view=categories, studentResult/studentEvaluation→students.html).
- `npm run test:a11y` → **critical=0 serious=0** (+16 rows: reports/families/students new views AR/EN light/dark + mobile).
- `node tests/screenshots/capture.cjs` → 0 console errors (+19 sp037 frames).

## Impact protection
- Bodies changed (sanctioned): `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en` (tab wrap) + the shared admin sidebar (2 flips + 3 route refinements). `student.html`/`family.html` + `result-summary`/`evaluation-rubric` output byte-identical; all 16 portal pages + index byte-identical.

## Next
Watcher commit (ideally Spec 035, then 036, then 037 as separate commits). Remaining planned items per the Spec-033 roadmap: 038 finance, 039 content deep-links, 040 settings deep-links, 041 final re-freeze.

# Contract — Smoke Coverage

All additions are **additive**; every protected regex/assert (role-law, teacher-pay, no-computed-score, nav010, 026–036) stays **byte-verbatim** except the one sanctioned amendment below.

## Must assert (new Reports/Analytics + Families/Students corrective block)
1. **Count/route-freeze** stays **115** (`find public -maxdepth 1 -name '*.html' | wc -l` = 115; no PAGES entry added).
2. **Nav flips** — `monthlyReports`→`reports.html#view=monthly`, `dataAnalysis`→`reports.html#view=analysis`; each a real anchor (not `data-coming-soon`); exactly **2** status changes (planned→implemented); **reports category 0 planned**; admin-menu **50**.
3. **Route refinements** — `familyCategories`→`families.html#view=categories`, `studentResult`→`students.html#view=results`, `studentEvaluation`→`students.html#view=evaluation`; each already an anchor (no status change), only the target `href` refines; exactly 3 refinements.
4. **`reports.html#view=monthly`** (fresh load, AR+EN) — exactly one visible `[data-tabs="reports"]` tabpanel === monthly; authored month-scoped board renders (summary cards + report rows + area/status chips + month filter); Export/PDF/Send = `[data-disabled-reason]` gates; **0** `<canvas>`, **0** computed metric/percentage, **0** finance/money token.
5. **`reports.html#view=analysis`** (fresh load, AR+EN) — analysis tabpanel is the only visible one; insight cards + categorical trend/status chips + filters + a read-only list/table render; **0** `<canvas>`/chart library, **0** computed metric/percentage/rank, **0** finance token; export final = gate.
6. **Overview tab preservation** — default (no hash) load renders the existing reports 7-card/5-available/2-planned board scoped to `#reports-grid` inside the overview tabpanel unchanged; the pre-existing Spec 029/030/034 detail/feedback/forms/ops-tile asserts continue to pass, unmoved.
7. **`families.html#view=categories`** (fresh load, AR+EN) — Categories tabpanel visible; each category row shows an authored member-count literal + status chip; the existing `fam-cat` reclassify drawer is reachable; Create-category = `[data-disabled-reason]` gate; **0** category mutation/persistence.
8. **`students.html#view=results`** (fresh load, AR+EN) — Results tabpanel visible; board lists students with authored result-status chips (certs-earned count / level / completion label); ≥1 per-student deep-link to `student.html#view=results`; **0** computed score/GPA/rank/percentage.
9. **`students.html#view=evaluation`** (fresh load, AR+EN) — Evaluation tabpanel visible; board lists students with authored categorical evaluation chips (on-track/needs-attention); ≥1 per-student deep-link to `student.html#view=evaluation`; **0** computed rubric-total/score/rank.
10. **Drill-down targets unchanged** — `student.html#view=results`/`#view=evaluation` single-student tabs still open correctly and remain the deep-link target from the new boards; `result-summary.js`/`evaluation-rubric.js` output byte-identical.
11. **No computed/chart token** — 0 `<canvas>`/chart/score/rank/percentage/GPA/rubric-total anywhere across the 5 new tabs.
12. **No money figure** — 0 finance/salary/invoice/currency token in any reports/families/students tab body (finance category untouched; families stays zero-pay).
13. **No unsafe input** — 0 `type=file`/`type=password`/credential/secret in any new tab.
14. **0 external request** triggered by any tab switch or deep-link load.
15. **Global honesty** — `href="#"`=0; raw-keys=0; dead-buttons=0; `FAKE` guard byte-verbatim.
16. **Protected byte-verbatim** — admin-menu-50 (~line 1271); reports 7-card/2-planned scoped to `#reports-grid` (~824/870-876, a distinct in-page concept from the nav planned-count, unaffected); finance 9-planned figure-free (~1036); families 0-planned (~1355, Spec-035 baseline, untouched); teachers 0-planned (~1367, Spec-036 baseline, untouched); payHit/tchPay/famPay/payFigure/child-view; Spec 026–036 per-page asserts.

## Sanctioned amendments (record in the smoke diff header)
- **Reports-category planned-count**: the `nav010` reports-category planned-item line goes **2 → 0** (mirrors the families/teachers 0-planned pattern set by Specs 035/036) — add a `#catpanel-reports` 0-planned assert analogous to the existing families/teachers ones.
- **Dashboard planned-item probe re-repoint**: Spec 036 pointed the dashboard's planned-item preview probe at reports (`monthlyReports`/`dataAnalysis`) since teachers had reached 0. Because Spec 037 folds both reports items too, reports also reaches 0 planned — the probe MUST repoint again to a category that still holds a planned item after 037 (**admin**: `materials`/`certificateRequests`, owner 039, or **settings**, owner 040). No route-freeze number change.

## Fresh-context requirement
- Every deep-link assert (items 4, 5, 7, 8, 9) MUST use a **fresh browser context per lang × view** (new `browser.newContext()`, `page.goto(url#hash)`, no prior in-page navigation) — the Spec 035/036 pattern — then assert exactly one visible `[data-tabs="<group>"]` tabpanel equals the target view before any other check runs.

## Forbidden
- Rewriting/relaxing any protected regex; removing any existing assert; making fake generation/analytics/reclassify/mutation pass; weakening the no-computed-score, finance-free, or families/teachers-0-planned guards.

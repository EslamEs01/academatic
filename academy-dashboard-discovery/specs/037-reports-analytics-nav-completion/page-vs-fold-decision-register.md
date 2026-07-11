# Page-vs-Fold / Deep-link / Standalone Decision Register — Spec 037

For each item: standalone page vs deep-link vs folded owner/tab, with reason, evidence, expected route, count impact, acceptance check. **Recommendation column is the primary; the alternative is documented for /speckit.plan.**

| Item | Decision (recommended) | Reason | Evidence | Route | Count | Alternative (documented) |
|---|---|---|---|---|---|---|
| monthlyReports | **folded tab on reports.html** | reports.html exists + is the natural owner; Spec 036 proved the tabs() fold; a standalone month page would duplicate the reports shell | `reports.js` single display page; 033 roadmap "display-only tabs on reports.html" | `reports.html#view=monthly` | 0 | standalone `monthly-reports.html` (+2) |
| dataAnalysis | **folded tab on reports.html** | same host; keeps analysis honest & finance-free next to the ops overview | legacy analysis-course/analysis-student; 033 roadmap | `reports.html#view=analysis` | 0 | standalone `analytics.html` (+2) |
| familyCategories | **stronger folded tab/board on families.html** | families.html is the folded owner (Spec 035); it just needs a *labeled* Categories surface; a standalone page is heavier than warranted | `families.js` has category filter + famCatDrawer but no labeled board | `families.html#view=categories` | 0 | standalone `family-categories.html` (+2) |
| studentResult | **folded cross-student board on students.html** + per-student deep-link | students.html is the directory owner; a board answers the plural label; the single-student tab remains the drill-down | `students.js` single table, no board; `student.js` results tab (st1) | `students.html#view=results` | 0 | standalone `student-results.html` (+2); or keep deep-link only (0, but does not fix the flag) |
| studentEvaluation | **folded cross-student board on students.html** + per-student deep-link | same as studentResult; shares the students.html tabs() | `students.js`; `student.js` evaluation tab (st1) | `students.html#view=evaluation` | 0 | standalone `student-evaluations.html` (+2); or keep deep-link only |

## Decision rationale

- **Fold-first law** (Spec 016/033): show the surface first inside an existing owner when possible; standalone pages only when the fold cannot host the feature clearly. All five items can be hosted honestly as tabs on existing owners → **count 0**.
- **reports.html tabs()** introduces the same overview-wrap pattern Spec 036 applied to teacher-performance.html (proven, low-risk). Preserves the existing reports asserts (7 cards / 2 planned / feedback / forms) inside the overview tab.
- **families.html / students.html tabs()** are new tab-wraps of currently single-content pages — slightly higher effort but count-0 and directly answer the maintainer's "still missing" flag.
- **Deep-link-only (no board)** for studentResult/studentEvaluation is technically valid (count 0) but is explicitly recorded as **not addressing the maintainer's concern** — so it is the fallback, not the recommendation.

## Standalone bundle (if chosen instead) — explicit count

If the maintainer prefers standalone pages for the flagged items and/or reports items, the count impact is additive and must be declared before build:

| Bundle | New bases | New files | Count after |
|---|---|---|---|
| reports items standalone | monthly-reports, analytics | +4 | 119 |
| flagged items standalone | family-categories, student-results, student-evaluations | +6 | 121 |
| both | 5 bases | +10 | 125 |

**Recommended: none of the above — all folds, count 115.**

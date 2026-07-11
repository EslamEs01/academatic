# Count & Route Contract — Spec 037

## Count

| Field | Value |
|---|---|
| Before count | **115** |
| After count (recommended) | **115** (delta 0) |
| New page bases (recommended) | **0** |
| New public HTML files (recommended) | **0** |
| Admin menu | **50** (unchanged) |

**Recommended: all five surfaces are folds/tabs on existing pages → count stays 115.** The count is evidence-based: `reports.js`, `families.js`, `students.js` already exist and can host tabs; no new page base is required.

### Explicit count impact IF standalone pages are chosen instead

| Choice | New bases | New files | Count after |
|---|---|---|---|
| monthlyReports standalone (`monthly-reports.html`) | 1 | +2 | 117 |
| dataAnalysis standalone (`analytics.html`) | 1 | +2 | 117 / +2 more |
| familyCategories standalone (`family-categories.html`) | 1 | +2 | +2 |
| studentResult standalone (`student-results.html`) | 1 | +2 | +2 |
| studentEvaluation standalone (`student-evaluations.html`) | 1 | +2 | +2 |
| **All five standalone** | **5** | **+10** | **125** |

Any standalone choice must be declared and build-verified **before** implementation. The recommendation is **0 standalone pages** (all folds).

## Route changes

### Core (Reports/Analytics — always in 037 scope)

| Nav key | Before | After |
|---|---|---|
| monthlyReports | `planned` (no route) | `implemented` → `reports.html#view=monthly` |
| dataAnalysis | `planned` (no route) | `implemented` → `reports.html#view=analysis` |

- `FUTURE_ROUTES`: remove the stale `monthlyReports: 'monthly-reports.html'` and `dataAnalysis: 'analytics.html'` entries when the items are promoted (they no longer describe an intended future route). Leave `materials: 'library.html'` untouched (owner 039).

### Corrective route refinements (only if the flagged-035 correctives are adopted)

| Nav key | Before | After |
|---|---|---|
| familyCategories | `families.html` | `families.html#view=categories` |
| studentResult | `student.html#view=results` | `students.html#view=results` |
| studentEvaluation | `student.html#view=evaluation` | `students.html#view=evaluation` |

If the correctives are **deferred**, these three routes stay exactly as Spec 035 set them (no change), and the corrective ownership moves to a follow-up spec.

## Invariants (must hold)

- **admin menu still = 50** — promoting `planned`→`implemented` changes status, not item count; route refinements change routes, not count.
- **nav changes = monthlyReports + dataAnalysis (+ up to 3 corrective route refinements) only.** No other nav item changes.
- **no accidental removals** — no nav item deleted; FUTURE_ROLE untouched; finance 7 `disabled` items untouched; materials/certificateRequests/settings×6 stay `planned` (owners 039/040).
- **reports category after 037 has 0 `planned` items** (the 7 finance items are `disabled`, not `planned`) → additive smoke assert `#catpanel-reports` 0-planned, mirroring families/teachers.
- **build-html.mjs** — 0 new PAGES entry under the recommended (fold) path; +N entries only if standalone pages are chosen.
- **package.json 0-diff**; no new dependency; no backend/API.

## Acceptance

- `find public -maxdepth 1 -name '*.html' | wc -l` = 115 (recommended path).
- Admin-menu-50 freeze smoke assert stays byte-verbatim.
- Reports 7-card / 2-planned and finance 9-planned smoke asserts stay byte-verbatim (they live inside the reports overview tab / finance section).
- Exactly the declared nav changes; `git diff nav.config.js` shows only the 2 flips (+ ≤3 route refinements + FUTURE_ROUTES trim).

# Count & Route Contract (Spec 035)

## Count envelope
| | Value |
|---|---|
| Public HTML **before** (Spec 034 committed baseline, HEAD `1eb4d9a`) | **113** |
| Public HTML **after** (recommended) | **115** |
| **Delta** | **+2** |
| New page **bases** | **1** (`schedule-search`) |
| New public **HTML files** | **2** (`schedule-search.html` + `schedule-search.en.html`) |

Verified baseline: `find public -name '*.html' | wc -l` = **113** at HEAD `1eb4d9a`.

## Per-item count impact
| Item | Disposition | New page? | Count impact |
|---|---|---|---|
| `familyCategories` | Fold-anchor → `families.html` | No | **0** |
| `scheduleSearch` | **Standalone page** `schedule-search.html` (+`.en`) | Yes (1 base) | **+2** |
| `studentResult` | Deep-link → `student.html#view=results` | No | **0** |
| `studentEvaluation` | Deep-link → `student.html#view=evaluation` | No | **0** |
| **Total** | | **1 base** | **+2 → 115** |

## Route contract
| Item | `nav.config.js` change | Resulting route |
|---|---|---|
| `familyCategories` | `status: planned` → `implemented` + `route` | `families.html` |
| `scheduleSearch` | `status: planned` → `implemented` + `route` | `schedule-search.html` |
| `studentResult` | `status: planned` → `implemented` + `route`; drop `FUTURE_ROUTES.studentResult` | `student.html#view=results` |
| `studentEvaluation` | `status: planned` → `implemented` + `route`; drop `FUTURE_ROUTES.studentEvaluation` | `student.html#view=evaluation` |

- **`build-html.mjs`**: add exactly **1** PAGES base (`schedule-search`) → 2 HTML files. No other page added or removed.
- **Nav changes = exactly the 4 scoped items.** No other nav item's status/route changes. After Spec 035, the **families category has 0 «قريبًا» items** (the 4 were its only planned entries — nav.config lines 44,46,47,48).
- **No unrelated pages**; **no accidental removals** (all 113 existing files remain; only the shared admin sidebar re-renders to turn 4 buttons into anchors, the standard nav-flip footprint).

## Alternative envelopes (recorded, NOT chosen)
- **Minimum +0 → 113**: if scheduleSearch folds into `schedule.html#view=search` (a new tab) instead of a standalone page. Rejected because schedule.html is a *browse* surface (filter over List/Timetable) and a distinct availability-search tool reads more honestly as its own page; Spec 033 recommended standalone.
- **Maximum +6 → 119**: if scheduleSearch + studentResult + studentEvaluation each became standalone AR/EN pairs. Rejected — studentResult/studentEvaluation standalone pages have no honest content under the no-computed-score law.

## Guard
- The `nav.config.js` build-time guard (lines 150-156) enforces: implemented ⇒ has route; non-implemented ⇒ no route; disabled ⇒ has reasonKey. All four flips satisfy it (each gains a route).

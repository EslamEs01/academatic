# Count & Route Contract (Spec 036)

## Count envelope
| | Value |
|---|---|
| Public HTML **before** (working-tree baseline after Spec 035) | **115** |
| Public HTML **after** | **115** |
| **Delta** | **0** |
| New page bases | **0** |
| New public HTML files | **0** |

Verified baseline: `find public -name '*.html' \| wc -l` = **115** (Spec 035 build output in the working tree).

## Per-item disposition & count
| Item | Disposition | Route | New page? | Count |
|---|---|---|---|---|
| `addTeacher` | Fold-anchor → existing `trn-add` drawer | `teachers.html` | No | **0** |
| `teacherCategories` | Fold-anchor → existing `trn-categories` drawer | `teachers.html` | No | **0** |
| `sessionsKpi` | Fold as a **display tab** on teacher-performance | `teacher-performance.html#view=sessions-kpi` | No | **0** |
| `monthlyPerf` | Fold as a **display tab** on teacher-performance | `teacher-performance.html#view=monthly` | No | **0** |
| **Total** | | | **0 bases** | **0 → 115** |

## Route contract
| Item | `nav.config.js` change | Resulting route |
|---|---|---|
| `addTeacher` | `status: planned` → `implemented` + `route` | `teachers.html` |
| `teacherCategories` | `status: planned` → `implemented` + `route`; drop `FUTURE_ROUTES.teacherCategories` | `teachers.html` |
| `sessionsKpi` | `status: planned` → `implemented` + `route` | `teacher-performance.html#view=sessions-kpi` |
| `monthlyPerf` | `status: planned` → `implemented` + `route` | `teacher-performance.html#view=monthly` |

- **`build-html.mjs`: 0 new PAGES entries** (no new page base).
- **Nav changes = exactly the 4 scoped items.** No other nav item's status/route changes. After Spec 036, the teachers category (`items` + `cat.teachersPerf` section) has **0 «قريبًا»**; admin-menu total stays **50** items.
- The `teacherKpi`→`teacher-performance.html` item (already implemented) is unchanged; sessionsKpi/monthlyPerf join it as sibling tabs on the same page.
- **No unrelated pages; no accidental removals** — all 115 existing files remain; `teacher-performance.html`/`.en` bodies change (tabs added), `teachers.html`/`.en` bodies stay byte-identical (nav flip only), all other admin pages change only in the shared sidebar.

## Body-change note (differs from Spec 035's pure deep-links)
- `teacher-performance.html` currently has **no tabs widget** — folding sessionsKpi/monthlyPerf as `#view=` tabs requires wrapping the existing board as the default tab and adding two display-only tabs. So `teacher-performance.html`/`.en` **bodies legitimately change** (still count-0). This is the fold owner and is expected to change; `teachers.html`/`teacher.html` bodies do **not** change.

## Alternative envelope (recorded, NOT chosen)
- **+6 → 121** if addTeacher + sessionsKpi + monthlyPerf each became standalone pairs. Rejected — the drawers/boards fold honestly with no new page; Spec 033 recommended 0.

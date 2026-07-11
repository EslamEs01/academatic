# Families & Students Nav Completion Register (Spec 035)

The four scoped Families-category nav items, their current state, and the resolution Spec 035 will apply. (Source: `nav.config.js:44,46,47,48` — all four are `status:'planned'` in the `families` category.)

## familyCategories / فئات العائلات
- **Current nav status:** `planned`
- **Current visible marker:** «قريبًا» button (no route)
- **Current owner/surface:** `families.html` — category filter (families.js:32) + `fam-cat` reclassify drawer (family.js:149-165, baked on families.js:39)
- **Recommended:** **Fold-anchor** → `families.html`
- **Count impact:** 0
- **Final nav status:** `implemented`, `route:'families.html'`
- **Acceptance check:** nav renders a real anchor to families.html; 0 «قريبًا»; `fam-cat` drawer reachable; Save still `backendRequired`.

## scheduleSearch / بحث الجدول
- **Current nav status:** `planned`
- **Current visible marker:** «قريبًا» button (no route)
- **Current owner/surface:** none (Spec 027 M-S kept it gate-only; `schedule.html` is a browse surface, not a search tool)
- **Recommended:** **Standalone page** → `schedule-search.html` (+ `.en`)
- **Count impact:** +2
- **Final nav status:** `implemented`, `route:'schedule-search.html'`
- **Acceptance check:** page loads AR/EN with search form + results board + empty state; Book/Assign = `backendRequired`; no fake results/booking.

## studentResult / نتائج الطلاب
- **Current nav status:** `planned` (stale `FUTURE_ROUTES.studentResult = 'student-results.html'`)
- **Current visible marker:** «قريبًا» button (no route)
- **Current owner/surface:** `student.html` Results tab (`resultSummary`, display-only)
- **Recommended:** **Deep-link** → `student.html#view=results`
- **Count impact:** 0
- **Final nav status:** `implemented`, `route:'student.html#view=results'`; drop the stale `FUTURE_ROUTES` entry
- **Acceptance check:** nav anchors to the Results tab which opens via `#view=`; no computed score/rank/chart.

## studentEvaluation / تقييم الطلاب
- **Current nav status:** `planned` (stale `FUTURE_ROUTES.studentEvaluation = 'student-evaluation.html'`)
- **Current visible marker:** «قريبًا» button (no route)
- **Current owner/surface:** `student.html` Evaluation tab (`evaluationRubric`, display-only)
- **Recommended:** **Deep-link** → `student.html#view=evaluation`
- **Count impact:** 0
- **Final nav status:** `implemented`, `route:'student.html#view=evaluation'`; drop the stale `FUTURE_ROUTES` entry
- **Acceptance check:** nav anchors to the Evaluation tab which opens via `#view=`; no computed score/total/chart.

## Roll-up
- **Nav flips/resolutions = exactly 4** (all in the families category).
- After Spec 035 the **families category has 0 «قريبًا»** items.
- Admin-menu total item count is **unchanged at 50** (statuses flip; no item added/removed).
- **Count:** 113 → **115** (+2, from scheduleSearch only).

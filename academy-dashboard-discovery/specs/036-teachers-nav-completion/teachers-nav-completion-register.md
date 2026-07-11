# Teachers Nav Completion Register (Spec 036)

The four scoped Teachers-category nav items (nav.config.js: `addTeacher` :55, `teacherCategories` :56 in the category `items`; `sessionsKpi` :63, `monthlyPerf` :64 in the `cat.teachersPerf` section) — all `status:'planned'`.

## addTeacher / إضافة معلم
- **Current nav status:** `planned` · **marker:** «قريبًا» button
- **Current owner/surface:** `teachers.html` — `trn-add` form drawer (teacher-actions.js:71, `addTeacherAction()` header button)
- **Recommended:** **Fold-anchor** → `teachers.html`
- **Count impact:** 0
- **Final nav status:** `implemented`, `route:'teachers.html'`
- **Acceptance:** real anchor (no «قريبًا»); `trn-add` drawer reachable; Save = backendRequired; NO pay/password field.

## teacherCategories / فئات المعلمين
- **Current nav status:** `planned` · **marker:** «قريبًا» button · also stale `FUTURE_ROUTES.teacherCategories='teachers.html'`
- **Current owner/surface:** `teachers.html` — `trn-categories` drawer (teachers.js:70-84; "Manage categories" header button)
- **Recommended:** **Fold-anchor** → `teachers.html`
- **Count impact:** 0
- **Final nav status:** `implemented`, `route:'teachers.html'`; drop the `FUTURE_ROUTES` entry
- **Acceptance:** real anchor; `trn-categories` list + Create form + Save/assign gates reachable; no fake mutation.

## sessionsKpi / مؤشر أداء الحصص
- **Current nav status:** `planned` · **marker:** «قريبًا» button
- **Current owner/surface:** none (no existing surface; legacy "Classes KPI" showed a computed % which we do NOT reproduce)
- **Recommended:** **Fold as a display tab** → `teacher-performance.html#view=sessions-kpi`
- **Count impact:** 0
- **Final nav status:** `implemented`, `route:'teacher-performance.html#view=sessions-kpi'`
- **Acceptance:** the hash opens a display-only sessions-KPI tab (counts + categorical labels); NO computed score/rank/%/chart; NO pay.

## monthlyPerf / الأداء الشهري
- **Current nav status:** `planned` · **marker:** «قريبًا» button
- **Current owner/surface:** none (legacy "Monthly Performance" showed a computed % which we do NOT reproduce)
- **Recommended:** **Fold as a display tab** → `teacher-performance.html#view=monthly`
- **Count impact:** 0
- **Final nav status:** `implemented`, `route:'teacher-performance.html#view=monthly'`
- **Acceptance:** the hash opens a display-only monthly tab (month + categorical trend/status + notes); NO computed score/rank/%/chart; NO pay.

## Roll-up
- **Nav flips/resolutions = exactly 4** (2 in the teachers `items`, 2 in the `cat.teachersPerf` section).
- After Spec 036 the **teachers category has 0 «قريبًا»** items.
- Admin-menu total stays **50** (statuses flip; no item added/removed).
- **Count:** 115 → **115** (delta 0).

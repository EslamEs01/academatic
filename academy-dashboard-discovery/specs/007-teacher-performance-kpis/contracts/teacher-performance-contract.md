# Contract: Teacher Performance Board

**Status**: Binding · `public/teacher-performance.html` (+ `.en`). An academy-wide, fixture-backed teacher KPI/follow-up board — **KPI tiles + a per-teacher comparison list + a follow-up queue**, all **display-only counts + labeled signals**, with **NO computed score, NO ranking/leaderboard/percentile, NO chart, NO salary/finance**. The promoted `teacherKpi` nav page. References FR-009 / FR-010 / FR-011 / FR-013 / FR-016 / FR-019 / FR-021; SC-002; data-model §13 (PerformanceSummary), §14 (FollowUpItem), §16.

---

## 1. Purpose & honest scope (the central no-fake-analytics rule)

The legacy scattered teacher "performance" across weak pages — `Teachers Details` (Cancel/Absent/Attend counts), `Teacher Feedback` (one %), `Class Feedback` (% + session count), `Sessions Analysis` (a system aggregate with a `teacher_id` filter but **no per-teacher drill-down**) — and **never** had a computed score or ranking. Spec 007 unifies those scattered **raw counts** into one calm board. **THE BINDING RULE**: every number on this page is a **baked fixture count** (or a resolved list length); there is **NO** calculated score, NO rank/position/percentile, NO automatic rating, NO predictive risk, NO chart/graph/sparkline, and NO salary/payroll figure. The board is a **review/follow-up** surface, never an "evaluation/scoring" system.

## 2. Page registration & active state

`teacher-performance.html` is the **promoted** `teacherKpi` page (`PAGES` entry `{ base:'teacher-performance', activeId:'teacherKpi', titleKey:'topbar.title.teacherPerf', crumbKey:'topbar.crumb.teacherPerf', render }`). It IS a nav item (the promoted sidebar link in the teachers `cat.teachersPerf` section). Active nav: `teacherKpi`. Detail in `navigation-impact-contract.md`.

## 3. Layout (RTL, top → bottom)

`pageHeader` («أداء المعلّمين») → **KPI tiles** (`summaryCards`/`kpiCard`/`status-tile`) → `filterBar` → **per-teacher comparison list** (`directoryCard`/`statMini` rows) → **follow-up queue** (calm list) → `noResults` (for the filtered list).

## 4. KPI tiles (display-only fixture counts)

A calm tile band of **fixture counts** (each icon+label+count, never a score/percentage-as-rating):

- **active teachers** (`statusId==='active'` count)
- **completed sessions** (sum of `completedCount` / `attended` outcomes)
- **teacher absences** (sum of `teacherAbsentCount`)
- **student absences in teacher sessions** (sum of `studentAbsentCount`) — **distinct** from teacher absences
- **cancelled / rescheduled** (sum of `cancelledCount`)
- **groups needing attention** (reused Spec 006 count)
- **teachers needing follow-up** (`followUp ∈ {needsFollowUp, attentionRisk}` count)

A raw display percentage MAY appear **only if** it is a baked fixture value clearly labeled display-only (default: avoid — prefer counts). No tile is computed at runtime.

## 5. Filter bar (client-side facets — NOT an analytics engine)

Facets over the pre-rendered comparison rows: **teacher** (search) · **subject/course** · **workload** (`light/balanced/high`) · **follow-up signal** (`strongDelivery/stable/needsFollowUp/attentionRisk`) · optionally **status**. A visible result count + a no-results/reset state. The rows are **sortable/filterable only via this existing client-side facet/filter mechanism** — there is no computed sort key, no ranking.

## 6. Per-teacher comparison list (counts + signals, links to profile)

Each row (a `directoryCard`/people-row with `facetAttrs`) shows: avatar + name + subject(s) + **workload** chip + **follow-up** chip + the raw counts (completed · teacherAbsent · studentAbsent · groups handled) via `statMini` + a **"View profile"** real `<a href="./teacher.html">`. **No rank number, no score, no position, no percentile, no salary.** Order is the fixture order (or a facet filter) — not a computed ranking.

## 7. Follow-up queue (calm fixture list)

A list of `TeacherFollowUpItem`s (data-model §14) — each: teacher + group + student/family context + a labeled chip + deep-links (`teacher.html`/`group.html`/`student.html`/`family.html`/`attendance.html`) + an honest action (`add-follow-up-note` → demo toast, or `notify-family` → confirm→toast). **Empty state** — "nothing needs follow-up" (calm, not a broken table). No follow-up engine, no persistence.

## 8. teacherAbsent vs studentAbsent (binding visibility)

The KPI tiles AND the comparison rows MUST show **teacher absences** and **student absences in teacher sessions** as **two distinct labeled facts** (reusing the Spec 005 outcome-status vocabulary), never summed into one "absences" number.

## 9. Actions

Board-level actions reuse `teacherActions()` (demo/confirm/disabled/link) per `teacher-actions-contract.md`. No bulk mutation, no export (disabled-with-reason), no salary action.

## 10. States & responsive

- **No-results** (filtered list empties): the `noResults` panel + reset.
- **Empty follow-up queue**: a calm "nothing needs follow-up".
- **Zero-data teacher row** (e.g. `huda`): zeroed counts + a calm hint, never a broken metric.
- Responsive: tiles wrap; comparison rows stack to single column on mobile; no horizontal overflow in RTL/LTR; strong dark mode.

## 11. `data-*` hooks (reuse only)

`data-filter-form`/`data-filter`/`data-filter-reset`/`data-filter-apply`/`data-filter-count`/`data-no-results`; per row `facetAttrs` → `data-row data-subject data-workload data-signal data-status data-search`; action hooks per `teacher-actions-contract.md`; "View profile" + deep-links are real `<a href>`. No new hook; no chart/canvas.

## 12. Static-HTML-first & Django

All tiles + comparison rows + the follow-up queue baked; JS filters only. **No `#app`**; relative paths; per-language; no chart/table library. **Django**: `{% for row in teacher_perf %}` for the comparison list; `{% for item in follow_up_queue %}` for the queue; the tiles from a fixture context dict; status/workload/follow-up via template tags.

## 13. Enforcement & cross-references

- **Smoke**: `teacher-performance` is in `PAGES` with `activeId:'teacherKpi'` and is a real sidebar `<a href>`; the page has baked KPI **tiles** + a baked **per-teacher comparison list** (each row → `teacher.html`) + a baked **follow-up queue**; **teacherAbsent and studentAbsent appear as two distinct labeled facts**; the only numbers are fixture counts (the G8a grep audit finds no `score`/`rank`/`chart`/`salary` token); no dead link; no `id="app"`; relative assets; axe critical = 0.
- **Screenshots**: frame #5 (`teacher-performance__ar__light__desktop.png`) — and the reviewer confirms **no score/rank/chart/salary**.
- Binds to `navigation-impact-contract.md` (the promotion), `teacher-profile-contract.md` (the "View profile" target), `teacher-status-contract.md` (the workload/follow-up chips), `teacher-outcomes-contract.md` (the absence counts), `dashboard-impact-contract.md` (the deep-link source), `scope-guard.md` (the no-engine boundary), and the Spec 006 `../../006-courses-groups-learning-paths/contracts/learning-path-contract.md` (the display-only-surface precedent).
- MUST NOT: render a computed score, a rank/position/percentile, a chart/graph/sparkline, a salary/finance figure, a bespoke analytics engine, or a runtime-computed tile/row number; collapse teacherAbsent + studentAbsent into one number; add a dead control.

**Acceptance (binding):**
1. **Given** the sidebar, **When** rendered, **Then** **Teacher Performance** is a real `<a href="teacher-performance.html">` (promoted) and no nav link is dead.
2. **Given** the board, **When** loaded, **Then** the KPI tiles + the per-teacher comparison rows + the follow-up queue are baked, each comparison row links to `teacher.html`, and the only numbers are fixture **counts** (no score/rank/percentile, no chart, no salary).
3. **Given** the board, **When** audited, **Then** teacher absences and student absences in teacher sessions are two distinct labeled facts, never one "absences" number.

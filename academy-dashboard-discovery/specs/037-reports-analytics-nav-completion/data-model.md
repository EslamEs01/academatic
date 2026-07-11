# Data Model — Spec 037 (display-only fixtures)

All entities are authored/display-only. **No computed metric, no money figure, no persistence.** Chips are categorical (icon + label, never color-only). Counts are authored literals or a `.length` of an authored array (a display count, never a derived score/aggregate/rank).

## 1. MonthlyReportRow — NEW, `fixtures/reports.js` → `MONTHLY_REPORTS`

| Field | Type | Notes |
|---|---|---|
| id | string | `mr1…` |
| monthKey | i18n key | authored month label (e.g., `rep.monthly.m.may`) |
| areaKey | i18n key | area/category (attendance/sessions/courses/teachers/studentsFamilies) |
| count | number | authored count literal (e.g., sessions completed that month) — NOT computed |
| statusId | enum | categorical: `healthy` \| `needsFollowUp` (reuse `reportSignalChip`) |
| noteKey | i18n key | short authored note |

Board groups rows by month (month filter). No money, no percentage, no computed roll-up.

## 2. DataInsight — NEW, `fixtures/reports.js` → `DATA_INSIGHTS`

| Field | Type | Notes |
|---|---|---|
| id | string | `da1…` |
| areaKey | i18n key | subject/area (students/courses/sessions/attendance) — finance-free |
| count | number | authored count literal |
| trendId | enum | categorical LABEL: `improving` \| `steady` \| `declining` (NOT computed math) |
| statusId | enum | categorical status chip |
| noteKey | i18n key | authored insight note |

Insight cards + read-only list. **No `<canvas>`, no computed metric/percentage/prediction, no finance figure.**

## 3. FamilyCategory — EXISTING, `fixtures/families.js` → `FAMILY_CATEGORIES` (reused as-is)

| Field | Type | Notes |
|---|---|---|
| id | string | premium/standard/trial/scholarship |
| nameKey | i18n key | category name |
| descKey | i18n key | category description |
| count | number | **authored** member count (2/4/1/1) — NOT computed |
| statusId | enum | active/inactive |

Categories board renders these as cards/rows + the existing `famCatDrawer` reclassify (reachable) + a Create-category `backendRequired` gate. No new field required.

## 4. StudentResultSummary — EXISTING per-row `results` (reused), `fixtures/students.js`

Board reads, per student row: `nameKey`, `familyId` (→ family chip), `levelKey`, `results.certificates.length` (authored count literal), and a **categorical result status chip** (reuse `statusId` / `enrollmentStatus`, or add an authored `resultStatusId`). Per-student deep-link → `student.html#view=results`.

**Forbidden on the board:** `results.overallProgress` shown as a score/grade; any rank/GPA/percentage/average/total; any cross-student aggregation or sort-by-score. (The single-student `resultSummary` drill-down keeps its existing authored `overallProgress%` display — unchanged.)

## 5. StudentEvaluationSummary — EXISTING per-row `evaluation` (reused), `fixtures/students.js`

Board reads, per student row: `nameKey`, `levelKey`, `evaluation.monthKey`, and a **categorical evaluation status chip** from `evaluation.approved` (`approved` → completed chip, else `pending` → amber) or an authored `evalStatusId`. Per-student deep-link → `student.html#view=evaluation`.

**Forbidden on the board:** any rubric total/score/rank/rating-average. (The single-student `evaluationRubric` drill-down keeps its existing categorical rating pills — unchanged.)

## Optional authored additions (keep additive, categorical only)

If clearer than reusing `statusId`, add per-student authored categorical fields in `fixtures/students.js`:
- `resultStatusId`: `onTrack` \| `watch` \| `atRisk` (categorical; NOT derived-from-percentage at display time)
- `evalStatusId`: `approved` \| `pending`

These must be authored literals or reuse the existing fixture booleans — never a new computed expression displayed as a metric.

## Locale namespaces

- Reports: `ar/en.rep.js` → `rep.tab.{overview,monthly,analysis}`, `rep.monthly.*`, `rep.analysis.*`, `rep.monthly.m.*` (months), trend/status labels.
- Families/Students: `ar/en.fam.js` → `fam.tab.{directory,categories}`, `fam.cat.board.*`; `stu.tab.{directory,results,evaluation}`, `stu.results.*`, `stu.eval.*`.
- Mirrored AR/EN, 0 divergence. `i18n.js` 0-diff.

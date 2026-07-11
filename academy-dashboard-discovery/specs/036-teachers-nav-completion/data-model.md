# Data Model — Spec 036

All data is authored, display-only. No persistence, no computed values, no PII, no pay figures.

## New entities (`fixtures/teacher-performance.js`)

### SessionsKpiRow (`SESSIONS_KPI_LABELS` keyed by teacher id, joined with authored counts)
Per-teacher sessions-KPI display row.
| Field | Type | Notes |
|---|---|---|
| `teacherId` | id | joins to the existing `TEACHERS` fixture (name/status/subjects) |
| session counts | via `teacherCounts(id)` | authored literals: completed / teacherAbsent / studentAbsent / cancelled — **counts, not pay, not computed** |
| `qualityId` | id | categorical attendance/quality label (`on-track` \| `watch` \| `needs-attention`) — **authored, never computed** |

**Rules:** NO `percentage`/score/rank field; quality is an authored enum; counts are display literals (reused from `teacher-links.js`).

### MonthlyPerfRow (`MONTHLY_ROWS`)
Per-teacher monthly display row.
| Field | Type | Notes |
|---|---|---|
| `id` | string | e.g. `mp1` |
| `teacherId` | id | joins to `TEACHERS` |
| `monthId` | id | month facet (`jan`…`dec` or authored month key) |
| `trendId` | id | categorical trend (`improving` \| `steady` \| `declining`) — authored label |
| `statusId` | id | categorical status chip |
| `noteKey` | i18n key | authored recommendation/note |

**Rules:** NO computed `percentage`/score/rank/total; trend/status are authored enums; note is an authored string.

### Vocabularies (`fixtures/teacher-performance.js`)
`KPI_QUALITY` (id→{labelKey,tone,icon}), `PERF_TRENDS` (id→{labelKey,tone,icon}), `PERF_MONTHS` (id→labelKey) — used for filterBar options + chips. Tones restricted to the styled-chip set (completed/amber/neutral/upcoming).

## Reused / unchanged entities (no edit)
- **TEACHERS** (`fixtures/teachers.js`) + **teacherCounts** (`teacher-links.js`) — authored teacher rows + session counts. Unchanged.
- **trn-add** / **trn-categories** drawers (teacher-actions.js / teachers.js) — reached via the fold anchors, unchanged.

## State transitions
**None.** No entity has mutable state. Every final (trn-add Save, trn-categories Save/assign, any tab action) is a `backendRequired` gate. Client-side filtering/tabs only toggle visibility, never data.

## Locale keys (new, in existing `ar/en.trn.js`)
- `trn.tab.*` — the 3 teacher-performance tab labels (overview / sessions-kpi / monthly).
- `trn.kpi.*` — sessions-KPI board copy + quality labels.
- `trn.monthly.*` — monthly board copy + trend/status/month labels + note prefixes.
- **No** new keys for addTeacher/teacherCategories (nav labels + drawers already exist). **No new locale pair.**

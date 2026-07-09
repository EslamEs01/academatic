# Spec 029 — Data Model (display-only fixtures)

All entities are **authored fixtures** in a NEW `src/js/fixtures/report-feedback.js`, derived from existing
entities (teachers/families/students/courses). **No persistence, no runtime aggregation, no computed
score/rank/percentage, no pay/finance figure.** Every value is a fixture literal or a locale key.

## Fixture module: `fixtures/report-feedback.js` (NEW)

Imports (for authored derivation only — names/labels, never money/computed): `TEACHERS` (teachers.js),
`FAMILIES`/`STUDENTS` (families.js/students.js), `COURSES` (courses.js).

### `FEEDBACK` — array of feedback records (display-only)

| Field | Type | Notes |
|---|---|---|
| `id` | string | e.g. `'fb1'` |
| `type` | `'teacher' \| 'class' \| 'family' \| 'student'` | feedback source lens |
| `subjectKey` | locale key | who/what the feedback is about (existing name key) |
| `categoryKey` | locale key | e.g. `rep.fbcat.teaching`, `rep.fbcat.communication` |
| `remarkId` | categorical id | reuse `rating-pill` vocab: `excellent \| good \| sometimes \| rarely` (NO number) |
| `statusId` | categorical id | `open \| reviewed \| resolved` (icon+text chip) |
| `dateKey` | locale key | authored relative date |
| `noteKey` | locale key | authored free-text remark shown in the drawer |

Constraints: NO `percentage`/`score`/`rank`/`amount` field. `remarkId` is a label, never a computed value.
~10–14 authored rows spanning all four `type` values.

### `FEEDBACK_CATEGORIES` — array (display-only)

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'fc1'` |
| `nameKey` | locale key | `rep.fbcat.name.*` |
| `descKey` | locale key | authored description |
| `statusId` | `'active' \| 'inactive'` | chip |
| `count` | int literal | authored usage count (NOT aggregated) |

### `FORMS` — array of form/survey definitions (display-only)

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'frm1'` |
| `titleKey` | locale key | form title |
| `questions` | int literal | authored question count |
| `responses` | int literal | authored response count (NOT aggregated) |
| `isDefault` | bool | badge |
| `statusId` | `'active' \| 'draft' \| 'closed'` | chip |
| `createdKey` | locale key | authored date |

## Entity relationships (display-only)

- `FEEDBACK.subjectKey` references an existing teacher/family/student/course name key (authored, not a live
  join).
- `FEEDBACK.categoryKey` references a `FEEDBACK_CATEGORIES.nameKey` (authored).
- `FORMS` are standalone authored definitions; the per-student progress form is the existing `student.html`
  Evaluation tab (`evaluation-rubric.js`) — not duplicated here.

## Locale keys (extend `ar.rep.js` + `en.rep.js`, mirrored)

- `rep.fb.title`, `rep.fb.sub`, `rep.fb.filterType`, `rep.fb.filterStatus`, `rep.fb.create`, `rep.fb.createTitle`,
  `rep.fb.detailTitle`, `rep.fb.type.{teacher,class,family,student}`, `rep.fb.status.{open,reviewed,resolved}`,
  `rep.fb.approve`, `rep.fb.approveTitle/Msg/Cta/Toast`, `rep.fb.del`, `rep.fb.delTitle/Msg/Cta/Toast`, `rep.fb.note`, `rep.fb.date`.
- `rep.fbcat.manage`, `rep.fbcat.title`, `rep.fbcat.hint`, `rep.fbcat.createTitle`, `rep.fbcat.members`,
  `rep.fbcat.assign`, `rep.fbcat.assignReason`, `rep.fbcat.name.*`, `rep.fbcat.desc.*`.
- `rep.form.title`, `rep.form.sub`, `rep.form.questions`, `rep.form.responses`, `rep.form.create`,
  `rep.form.createTitle`, `rep.form.detailTitle`, `rep.form.status.{active,draft,closed}`, `rep.form.default`.
- Reuse: `common.backendRequiredNote`, existing `eval.rating.*` (remark pills), existing chip tones.

## Chart / metric constraints (binding)

- NO `<canvas>`, NO chart library, NO `sparkline()` as a metric.
- NO computed `%`/score/rank/percentile/leaderboard. Any number is an authored literal.
- NO money/pay/salary/payroll/invoice/amount field on any entity.

## What is NOT modeled (out of scope)

Finance analytics (expenses/invoices/salary — 030), certificate designer (031), real form/response engine
(future-backend), real feedback persistence (future-backend), computed analytics (forbidden).

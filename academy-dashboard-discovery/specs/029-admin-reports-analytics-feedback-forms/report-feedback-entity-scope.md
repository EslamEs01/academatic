# Spec 029 — Report / Feedback Entity Scope

Defines each display-only entity, its allowed display fields, and which writes are `backendRequired`. All
entities are **authored fixtures**; nothing persists; no runtime aggregation; no computed score/rank/%.

## Report (overview / summary board)

- **Purpose**: an authored reporting surface (card or summary board).
- **Allowed display fields**: id, title/area, category, availability signal (available/planned/backendRequired),
  a set of authored count tiles (each equal to its authored row count), real deep-links.
- **Forbidden**: computed aggregate, derived score/rank/percentile, chart/`<canvas>`, live query.
- **Writes**: none (display-only). Export/Print = `backendRequired` gate.

## Report filter

- **Purpose**: client-side facet over report cards/rows.
- **Allowed**: category/area/availability/status selects + search (`data-filter` via `filterBar`).
- **Forbidden**: server query; a date-range that implies backend fetch → honest gate, not a fake filter.
- **Writes**: none.

## Report row

- **Purpose**: an authored row within a report table/list.
- **Allowed display fields**: label/name, authored count/value literal, status chip (icon+text), a real link.
- **Forbidden**: computed value, derived %, editable cell that persists.
- **Writes**: none; detail opens a read-only drawer.

## Feedback item

- **Purpose**: an authored feedback record (teacher/class/family/student).
- **Allowed display fields**: subject (teacher/class/family/student name), category, **categorical remark/label**
  (e.g. Excellent/Very Good/Good/Acceptable/Needs Improvement), date, free-text note (authored), status chip.
- **Forbidden**: numeric score/rating, computed percentage, derived aggregate, chart.
- **Writes**: Create/Edit feedback = `backendRequired` modal; Approve/Delete = `backendRequired` confirm.
  Nothing persists; no DOM row removal; no status flip.

## Feedback category

- **Purpose**: an authored label used to group feedback.
- **Allowed display fields**: name, description, status, member/usage count (authored literal).
- **Writes**: Create/Edit category = `backendRequired` modal; Assign-members = display-only picker →
  `backendRequired` gate. Nav item stays planned/folded (mirror `trn-categories`/`fam-cat`).

## Feedback detail

- **Purpose**: read-only drawer for a feedback item (`previewTemplate`/`sheetRow`).
- **Allowed**: all feedback-item display fields, read-only.
- **Writes**: none (edit is reached via the create/edit modal gate, not inline).

## Form / survey

- **Purpose**: an authored form/survey definition (display-only list).
- **Allowed display fields**: title, question count (authored literal), response count (authored literal),
  default flag, status, created-at (authored).
- **Forbidden**: live response engine, real submission, computed response %/aggregation.
- **Writes**: Create-form / Edit-form = `backendRequired` modal. No form actually saves.

## Form submission (student progress form)

- **Purpose**: a categorical monthly progress-evaluation record.
- **Allowed display fields**: month, achievements text (authored), categorical radios (learning_progress:
  Excellent/Very Good/Good/Very Slow; focus/homework/punctuality: Always/Often/Sometimes/Rarely;
  rescheduled: None/1/2/More), all display-only.
- **Forbidden**: numeric score, computed %.
- **Writes**: Save/Submit = `backendRequired` gate.

## Export action

- **Purpose**: CSV/PDF/Excel export trigger.
- **Behavior**: `backendRequired`/planned gate (disabled-with-reason or a backendRequired modal). NEVER a
  real file; NEVER a silent no-op.

## Print action

- **Purpose**: print trigger.
- **Behavior**: `backendRequired`/planned gate. NEVER a fake "printing…"; reclassify existing print toasts
  for consistency.

## Writes summary (all backendRequired — nothing persists)

| Entity | Write | Mechanism | Persists? |
|---|---|---|---|
| Feedback item | Create/Edit | `data-modal-trigger` + backendRequired note | No |
| Feedback item | Approve/Delete | `data-confirm` → backendRequired | No |
| Feedback category | Create/Edit | `data-modal-trigger` | No |
| Feedback category | Assign members | display-only picker `data-drawer` → `data-disabled-reason` | No |
| Form | Create/Edit | `data-modal-trigger` | No |
| Progress form | Save/Submit | `data-disabled-reason`/`data-confirm` | No |
| Report/Feedback | Export/Print/CSV/PDF/Excel | `data-disabled-reason` gate / backendRequired modal | No |

**Allowed display fields are the ONLY fields surfaced.** No pay/finance field appears on any 029 entity (any
money field routes to 030). No numeric score/percentage appears on any 029 entity.

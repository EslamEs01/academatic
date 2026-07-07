# Contract: teacher-tasks (T11/T16)

**Module**: `teacher-tasks.js` → `renderTeacherTasks()`. Nav `tasks`. Persona sara.

## Must include
- `pageHead` («المهام»/"Tasks").
- Task/follow-up board from `TEACHER_PREVIEW.tasks` (tk1/tk2 + static): title · priority/status tag · due/next-class context.
- A monthly-plan preview row (T11).

## Gates (backendRequired)
- Complete/assign = backendRequired.

## Forbidden
- Fake completion/toggle; the empty tickets KPI shell; the tickets pie / computed "Average"; any pay token / «fine».

## Acceptance
- Task cards from fixtures with status tags; complete backendRequired; no chart/average; `payHit` false; mobile-390 clean.

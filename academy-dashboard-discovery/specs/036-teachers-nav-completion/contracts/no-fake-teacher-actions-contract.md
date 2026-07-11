# Contract — No-Fake Teacher Actions

Every write across the four surfaces is an honest gate; no teacher/category/KPI value is created, computed, or persisted. (Binding plan mirror of `../no-fake-teacher-actions-register.md`.)

| Action | Surface | Required treatment |
|---|---|---|
| Add teacher (Save) | teachers.html `trn-add` | existing `formDrawer` backendRequired gate; INERT fields |
| Category create/save | teachers.html `trn-categories` | existing `common.backendRequiredNote` gate; INERT fields; authored list |
| Category assign | teachers.html `trn-categories` | existing `trn.cat.assignReason` gate |
| (view) sessions-KPI | teacher-performance#view=sessions-kpi | display authored counts + categorical labels; no calc |
| (view) monthly | teacher-performance#view=monthly | display authored rows + categorical trend/status; no calc |

## Hard forbiddens
- fake teacher/category/KPI/monthly persistence or calculation; fake success wording («تم/حُفظ/(تجريبي)» / "saved/done"); row/status mutation.
- computed score / rank / percentage / rating / total; `<canvas>` / chart.
- backend/API/websocket/db/auth; external request; external dependency; new hook/storage key.
- `type=file` (CV=gate); `type=password` (reset=gate); credential/secret; `.pdf`/`window.open`/`blob:`/`href="#"`; raw keys; dead buttons.

## Honest wording
- All gates use the standing Spec-026 phrasing («يُتاح بعد ربط الخادم» / "available once the server is connected") via existing reason keys.

## Acceptance
- Smoke `FAKE` guard runs on the teacher surfaces with 0 hits; post-click state unchanged; 0 external request; the two tabs are display-only.

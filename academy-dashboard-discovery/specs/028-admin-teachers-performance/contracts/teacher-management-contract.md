# Contract — Teacher Management (Spec 028)
**MUST**: teachers list gains an honest per-card kebab (View · Edit modal · On-Vacation/Deactivate confirm · Delete confirm) via a new `teacherMenu` on the EXISTING `data-row-menu` hook; teacher-detail Edit/Add-note → modals; Notify stays confirm; status lifecycle + delete → confirms; Add-teacher stays an honest modal (no Salary/Payout fieldset).
**Acceptance**
- `teachers.html` cards carry `data-row-menu data-row-menu-kind="teacher"`; kebab entries honest.
- Edit/Add-note open modals (not bare toasts) → backendRequired; On-Vacation/Deactivate/Activate/Delete → confirm → backendRequired; no status flip / DOM removal.
- No teacher pay/salary figure; the `rating` field stays unsurfaced.
- **Fail** on fake teacher create/update/status/delete, a Salary/Payout fieldset, or teacher-CRUD that persists.

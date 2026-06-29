# Contract: Teacher Timetable (admin lens)

**Status**: Binding · An admin-facing teacher LENS inside the Schedule **Timetable** tab — display only; NOT a teacher portal/dashboard, NO new page/route, NO real availability or conflict engine. (research R14, spec D3, data-model `TeacherTimetable`.)

## 1. Purpose & placement

- The lens lets the admin view one teacher's weekly fixture timetable, or an **all-teachers** overview, from inside the existing Schedule Timetable tab. It MUST live in `schedule.html` (+ `.en`) — NO new nav item, page, or route (FR-016; scope-guard). It reuses the Spec 003 weekly-timetable grid and the shared appointment drawer (`appointment-details-contract.md`).
- It is realized PURELY by client-side filtering of pre-rendered blocks (research R6) — not a new data source, not a runtime-drawn grid.

## 2. Teacher facet (derived options)

- The Timetable tab MUST expose a **teacher facet** as `data-filter="teacher"` in the schedule filter bar, with a default **"All teachers"** option.
- The teacher options MUST be **derived from the schedule fixture at build time** (the `ScheduleWeek.teachers` set, data-model) — one option per teacher who has a block that week, plus "All teachers". No second teacher store; the lens references Spec 002 teacher fixtures by name only.
- Each block MUST carry `data-teacher="<id>"` so the facet can scope it.

## 3. All-teachers overview (default)

- Default state = "All teachers": the grid MUST show the COMBINED week, with **each block labeled by its teacher's avatar + name** (`teacher.nameKey` + `accent`) so blocks stay attributable.
- Overlapping / back-to-back blocks across teachers MUST stay legible (the grid's overlap sub-column rule); the overview MUST NOT become cluttered or a rainbow — status stays the calm 4-set (icon+label), never color-only.

## 4. Single-teacher scoping (client-side filter)

- Selecting a teacher MUST scope the grid to that teacher's baked blocks ONLY, via the same R6 show/hide of pre-rendered blocks (no re-layout, no fetch); non-matching blocks are hidden, not removed.
- The scoped view MUST clearly label the active teacher (name/avatar) and reflect the selection as an active-filter chip with a count, consistent with the filter bar.
- An empty result (a teacher with no blocks, or a combination matching nothing) MUST show the friendly "no results" state with reset — never a dead control or blank grid.

## 5. Guardrails (binding — admin display only)

- This is ADMIN DISPLAY ONLY. It MUST NOT render teacher-portal / teacher-dashboard chrome, a teacher home, or any role-portal navigation.
- NO new page / route / nav item (FR-016). NO real availability editor, NO drag-drop, NO reschedule, NO persistence — the legacy availability-editor + conflict-warnings are PRODUCT REFERENCE ONLY.
- "Conflict" / attention here is a **fixture-only** flag (`AttentionSignal`, icon+label), NOT a real conflict-detection or live-status engine (FR-013). No availability bands are computed.

## 6. Composition with the grid + filter bar

- The teacher facet composes with the other schedule facets (day/week, subject, status, type) on the SAME filter bar; combined filters narrow the grid consistently.
- Filter and selected-teacher state MUST be PRESERVED when switching between the List and Timetable tabs and when re-opening via deep link (FR-009).
- Blocks open the shared appointment drawer (`appointment-details-contract.md`) unchanged — the lens scopes which blocks show, not what a block reveals.

## 7. RTL / LTR

- Sat-first week; day columns mirrored via logical properties in AR-RTL and correct in EN-LTR. Teacher names/avatars follow text direction; the time-axis numerals and times are **never mirrored**.
- Below the timetable breakpoint the lens reflows with the grid to the single-day agenda; the teacher facet still scopes the agenda.

## 8. data-* hooks (enumerated — no hooks beyond these)

| hook | role |
|---|---|
| `data-filter="teacher"` | the teacher facet control in the schedule filter bar |
| `data-teacher="<id>"` | per-block teacher value (and the option values) scoped by the facet |
| `data-timetable` | the weekly-grid region the lens filters |
| `data-attention` | fixture-only attention/conflict flag on a block (icon+label) |
| `data-drawer` / `data-preview` | block → shared appointment drawer (unchanged) |
| `data-filter-form` / `data-filter-apply` / `data-filter-reset` / `data-filter-count` | the established filter-bar mechanism the facet composes with |

No JS-generated ids/classes; all hooks are stable and Django-reproducible.

## 9. Django mapping

- Facet options → `{% for teacher in week.teachers %}`; blocks already loop `{% for day %}{% for block in day.blocks %}` carrying `data-teacher`. The same attribute drives client-side (or later server-side) scoping.
- NO new template / route; the lens is a facet on the existing `schedule.html` partial set, fed from the same week context.

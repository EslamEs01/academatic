# Contract: Teacher Timetable Linkage (reuse Spec 003)

**Status**: Binding · The teacher profile **Timetable** tab reuses the Spec 003 `scheduleAgenda` (the teacher's blocks resolved by `trainer.id`) + the shared appointment drawer + a `schedule.html#view=timetable` deep-link. **No new timetable engine, no scheduling mutation.** References FR-007; SC-009; data-model §10.

---

## 1. Purpose & reuse

Show the teacher's weekly sessions inside the profile without rebuilding any timetable. The Timetable tab renders the Spec 003 **`scheduleAgenda`** via the Spec 006 **`cohortTimetablePanel`** + **`cohortTemplates`** — the SAME agenda markup the Group/Course profiles use. No new grid, no availability editor, no slot allocation.

## 2. Data source (binding)

The teacher's schedule blocks = `SCHEDULE_WEEK.flatMap(d => d.blocks).filter(b => (b.trainer && b.trainer.id) === teacherId)` (the same `trainer.id` join `scheduleAgenda`/`outcome-row` already use). Resolved at render via `blocksOf(...)`/`cohortTimetablePanel(blocks)`. Display-only.

## 3. Anatomy (RTL, top → bottom)

A panel header + a **"View in schedule"** deep-link → `schedule.html#view=timetable` (language-aware `schedule.en.html#view=timetable`) + the `scheduleAgenda(blocks)` `data-agenda` block of baked session rows (day/time · title · subject · room). Each row carries `data-row` facets + `data-drawer="<blockId>"`.

## 4. The shared appointment drawer (reused)

Each session row opens the **shared `appointmentTemplate`** drawer (`appointment-details.js`) via `data-drawer="<blockId>"` over a baked `<template data-preview="<blockId>">` (emitted by `cohortTemplates`). **No new drawer** (SC-009). The drawer shows the Spec 003 appointment fields (status chip + date/time/duration + teacher + students + room + notes).

## 5. Deep-link (binding)

The "View in schedule" link MUST navigate to `schedule.html#view=timetable` — the hash opens the Timetable tab per the Spec 003 tabs widget (hash wins on load). A real `<a href>`, never dead.

## 6. Empty state

A teacher with **zero blocks** (e.g. `huda`) → a calm "no recent sessions" hint (the `cohortTimetablePanel` empty key), never a blank region or a broken grid.

## 7. MUST NOT

No new weekly-grid builder, no availability form, no slot allocation, no drag-and-drop, no scheduling mutation, no FK retrofit onto schedule blocks; no bespoke drawer.

## 8. `data-*` hooks (reuse only)

`data-agenda`; per block `data-row` + `data-status`/`data-subject`/`data-teacher`/`data-day`; `data-drawer`/`data-preview`/`data-sheet-close`. The deep-link is a real `<a href>`. No new hook.

## 9. States / responsive / a11y

Agenda rows stack on mobile; the drawer is full-height on mobile; RTL/LTR + dark correct; axe critical = 0; keyboard reaches each row + the drawer.

## 10. Static-HTML-first & Django

The agenda + every `<template data-preview>` baked. **Django**: `{% for block in teacher.schedule %}` + the shared `_appointment_details.html` include; the deep-link → `{% url 'schedule' %}#view=timetable`.

## 11. Enforcement & cross-references

- **Smoke**: the teacher Timetable tab contains a `data-agenda` block + a real `<a href>` to `schedule.html#view=timetable`; session rows open the shared appointment drawer; **no new timetable grid/drawer** is introduced; zero-block teachers show the empty hint.
- **Screenshots**: frame #6 (`teacher__ar__light__desktop__timetable.png`).
- Binds to `teacher-profile-contract.md` (§8), the Spec 003 `../../003-timetable-scheduling/contracts/*` (the agenda + appointment drawer + the `#view=timetable` deep-link), and the Spec 006 `cohort-panels` reuse. **MUST NOT** introduce a new timetable engine, a scheduling mutation, or a bespoke drawer.

**Acceptance (binding):**
1. **Given** the Timetable tab, **When** rendered, **Then** the Spec 003 `scheduleAgenda` shows the teacher's blocks + a real "View in schedule" deep-link to `schedule.html#view=timetable`.
2. **Given** a session row, **When** opened, **Then** the SHARED appointment drawer opens (no bespoke drawer).
3. **Given** a zero-block teacher, **When** rendered, **Then** a calm "no recent sessions" hint appears — never a broken grid.

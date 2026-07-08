# Teacher Entity Scope — Spec 028

## Teacher (reuse `fixtures/teachers.js` TEACHERS)
- **Display fields (allowed)**: id, nameKey, subjectsKeys, primary, bioKey, statusId (active/paused/inactive → deepen to Active/Incomplete/Unconfirmed/Deactive per legacy enum), avail (available/busy/off), workload (light/balanced/high), followUp signal, sessions, hours, util, courses/groups/students counts (via `teacher-links.js`), upcoming.
- **Excluded field**: `rating` (4.4–4.9) — present but NEVER rendered; **stays unused/unsurfaced** (no computed rating law).
- **NEVER**: salary, fixed_salary, hour_rate figure (the admin single-value "Hour Rate" literal is omitted by default unless the plan re-confirms it sits outside the `teacher-*` pay-free grep), fine, compensation, payout — any pay/finance value.
- **Relationship writes (all backendRequired)**: create teacher · edit teacher · add-note · status change (vacation/deactivate/activate) · delete.

## Teacher Category (new, grounded — `management-teacher-categories*`)
- **Display fields**: id, nameKey, descKey, statusId (Active/Deactive), members[] (teacher list, display-only).
- **Writes (backendRequired)**: create category · edit category · delete category · assign-members (display-only picker).
- **Mechanism**: reuse the Spec-027 family-category modal+drawer; nav item stays **planned** (no standalone page).

## Teacher ↔ Course / Teacher ↔ Group assignment reference
- **Display**: the currently assigned teacher (single) shown read-only on course.html/group.html (existing).
- **Write (backendRequired)**: reassign teacher via a **display-only single-teacher candidate picker** (drawer). No roster/schedule mutation; no `teacher_hour_rate`/`t_hour_rate` figure surfaced.
- **Cardinality**: one teacher per course/group (legacy: "ONE teacher and MANY students").

## Teacher availability reference (new, grounded — Schedule tab)
- **Display fields**: recurring weekly windows = day-pair (From/To day) + time-pair (From/To time), display-only rows.
- **Writes (backendRequired)**: Add / Update / Delete a window; Available / Not-Available toggle.
- **Bounds**: NO recurrence rules, NO per-date exceptions (those live on the shipped `public-holiday.html`); do not invent richer scheduling than the captured day/time rows.

## Teacher timetable reference (read-only)
- Existing `schedule.html#view=timetable` + `attendance.html` deep links stay real. The **all-teachers-timetable** cross-teacher grid is a plan decision (fold into schedule.html vs new page).

## Teacher performance signal (display-only)
- Authored counts (completed / teacherAbsent / studentAbsent / cancelled / groups / upcoming / courses / students) + labeled workload / follow-up / status / availability chips. **Never** a computed score/rank/percentile/chart. Board-wide tile totals are simple display sums (pre-existing Spec-007, no ordering of teachers).

## Which writes are backendRequired (summary)
Create/edit/delete teacher · status change · add-note · assign-teacher-to-course/group · category create/edit/delete/assign-members · availability add/update/delete — **all end at a `backendRequired` gate; none persist, mutate the DOM roster, flip status, or change the schedule.**

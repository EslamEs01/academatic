# Batch 37 — teacher · Timetable / Schedule

### `teacher-timetable` — Teacher Timetable  (HTTP 200)

- Purpose: Allows a teacher to view their personal weekly schedule as a time-grid calendar and manage their availability windows and course session slots.
- Key sections / flows: Full-week time-grid calendar (Sat–Fri columns, 12 AM–11 PM rows); session blocks labeled with student name, start time, and duration ("محمد احمد 3:00 AM 1 hour(s)"); 3 unnamed select filters at the top (likely week/scope selectors); notification badge showing "5 new"; "Availability" badge on calendar area; sidebar navigation to all teacher routes.
- Key SAFE actions: Navigate week view; view session block details (opens info modal); view notifications; switch language; navigate to other teacher pages via sidebar.
- Key MUTATING/dangerous actions: **Update** availability slot (POST to timetable); **Delete** availability slot; **Add** availability slot; **Save changes** on Edit Schedule modal (POST `https://academatic.online/teacher/timetable` with `course_id`); **Edit course** link from session detail modal; **Save** shortcut (POST to `/teacher/shortcuts`).
- Important modals/forms:
  - **Session detail modal** (Modal 2): Triggered by clicking a session block on the calendar; shows course/student info; contains an "Edit course" navigation link.
  - **Availability modal** (Modal 3): Manage teacher availability windows; fields: From day (Sat–Fri select), To day (Sat–Fri select), From time, To time; actions: Update existing slot, Delete slot, Add new slot; status toggles: "Not Available" / "Available".
  - **Edit Schedule modal** (Modal 4): Edit an existing scheduled session; fields inferred from POST form with hidden `course_id`; actions: Save changes (POST), Close.
  - **Add Shortcuts modal** (Modal 5, global chrome — noted for completeness): Title, Link fields; Save.
- Variant-of: unique template
- Broken/empty: Logo image returns 404 (`/storage/uploads/logo.png`). No data-empty states documented in the capture; calendar shows at least three session blocks so it loaded with live data.
- UX improvement for the rebuild: Replace the flat time-grid with a proper interactive calendar component (e.g., weekly view with drag-to-define availability bands); the current availability modal uses raw day/time selects with no visual feedback on overlap or conflicts — the rebuild should show a visual band overlay on the grid and warn on overlapping/conflicting slots before submit.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Teacher Timetable module is the teacher's personal schedule view. Core entities are: **Session** (a booked lesson: student, time, duration, course reference), **Availability Window** (a recurrence rule: from-day/to-day, from-time/to-time, available/not-available status), and implicitly **Course** (referenced via `course_id` and the "Edit course" link). The teacher can declare when they are available, view what sessions have been booked, and update individual scheduled sessions.

**Distinct page templates vs variant count:**
- 1 page in this batch — `teacher-timetable` is a unique template.
- 0 query-param/pagination variants.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- 3 unnamed select filters (likely week/date-range or subject/class scope) — safe.
- Session detail modal — safe view, but contains "Edit course" navigation trigger.
- Availability modal — **dangerous**: Update and Delete actions mutate availability data; Add creates new slots. No confirmation dialog observed.
- Edit Schedule modal — **dangerous**: Save changes POSTs course schedule mutation.
- All mutating actions submit directly without a visible confirmation step in the capture; the rebuild must add confirmation dialogs or undo for Delete and Save operations.

**Improvements for the new platform:**
1. **Visual calendar with drag interaction**: Replace select dropdowns for availability with a click-drag band on the weekly grid; color-code "Available" (green) vs "Not Available" (grey/red) bands directly on the grid.
2. **Conflict detection**: Before saving a new availability window or session edit, validate against existing windows and display an inline warning (not just a toast after submit).
3. **Confirmation on destructive actions**: Delete availability slot must show a confirmation modal with slot details before firing the DELETE request.
4. **Empty/loading states**: Add skeleton loaders for the calendar grid while data loads; show an illustrated empty state if no sessions exist for the selected week.
5. **Mobile-first layout**: A 7-column weekly grid is unusable on mobile; rebuild should offer a day-view toggle or a collapsible agenda list view for small screens.
6. **RTL support**: The existing page is LTR-only (lang=en). The rebuild must ensure the calendar grid and modal forms are RTL-compatible (Arabic locale is the primary operational language of the platform).
7. **Logo asset**: The logo 404 must be resolved in the asset pipeline; the rebuild should use a CDN-backed or versioned asset path.
8. **Accessibility**: Modals need focus traps and `role="dialog"` + `aria-modal="true"`; calendar cells need keyboard navigation and ARIA labels for time slots.

**Anything needing owner/backend confirmation:**
- What the three unlabeled select filters control (week range? subject? class group?) — labels must be confirmed with the backend team.
- Whether "Not Available" slots are teacher-initiated blocks or admin-imposed; the UI conflates both in the same Availability modal — needs product clarification.
- The `course_id` hidden field in the Edit Schedule form — confirm whether one timetable slot maps to exactly one course or can span multiple courses (affects the modal design).
- Whether the "Edit course" link in the session detail modal should navigate away (losing calendar state) or open an inline sub-panel.

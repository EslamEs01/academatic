# Batch 28 — Teacher · Tasks (Tickets)

### `teacher-tickets` — Tasks Dashboard

- Purpose: A summary dashboard showing task/assignment counts and per-staff-member task breakdowns for the teacher role; the page is labeled "Tasks" in UI but routed under `/teacher/tickets`.
- Key sections / flows: Four KPI cards at the top (Total, Completed, Pending, Inprogress, Overdue — all showing 0); a Staff Members table below listing each staff member with columns: Name, Total, Pending, Overdue, Completed, Average. The page also carries the standard sidebar nav and global header with notifications.
- Key SAFE actions: View task counts per KPI card; read staff members table; navigate via sidebar links (Home, Chat, Schedule, Students, Library, Tasks, monthly reports, Salaries, Salary Class Report); view all notifications.
- Key MUTATING/dangerous actions: "Save" button inside "Add shortcuts" modal (POSTs to `/teacher/shortcuts`); "See All Notifications" submit button; logout (POSTs to `/teacher/logout`).
- Important modals/forms: **Add Shortcuts modal** — allows teacher to pin a custom link (fields: `shortcut_title` (text), `shortcut_link` (text, pre-filled with a library URL)); Close and Save buttons. No task-creation modal is visible on this page — task creation/editing UI may be absent or accessible through a link not captured.
- Variant-of: unique template
- Broken/empty: All KPI values show 0 and the Staff Members table has 0 rows — the page rendered successfully (HTTP 200) but is entirely empty of data. A logo image returns 404 (`/storage/uploads/logo.png`). The page slug contains "tickets" but the UI says "Tasks" — naming inconsistency. Filters are rendered as unstyled `div` elements with no labels or names, suggesting the filter UI is non-functional or incomplete.
- UX improvement for the rebuild: Replace the all-zero empty state with a proper illustrated empty state ("No tasks assigned yet") and conditionally render the Staff Members table only when data exists. Also rename the route from `/tickets` to `/tasks` to match the UI label, and surface a visible "Create Task" or "Assign Task" action so teachers can immediately add work from this page rather than hunting for it elsewhere.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The Teacher Tasks module provides a read-only aggregated view of task assignments across a teacher's staff members. Core entities: Task (with status: Completed, Pending, In Progress, Overdue) and Staff Member (as the unit of grouping). The module does not expose task details, individual task rows, or direct creation UI within the captured state.

- **Distinct page templates vs variant count:** 1 unique template (`teacher-tickets`). No filter/sort/status variants captured.

- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:** The only modal present is "Add Shortcuts" (mutating — POSTs a custom link). The filter controls are structural `div` placeholders with no labels, meaning the filter capability is either unimplemented or requires JavaScript interaction not captured. No tabs were observed.

- **Improvements for the new platform:**
  - **Empty/loading states:** Show a meaningful empty state when all KPI values are zero; use skeleton loaders while data fetches.
  - **Filter UI:** Implement labeled, accessible filter controls (e.g., date range, status, staff member) instead of unlabeled `div` placeholders.
  - **Task creation entry point:** Add a primary "Assign Task" CTA on this page so the workflow is self-contained.
  - **Table enhancements:** Add sortable columns and clickable staff member rows that drill into per-member task detail; add pagination or virtual scrolling for large staff lists.
  - **RTL-first:** Current page is LTR English only; sidebar and KPI layout must reflow for Arabic (`dir=rtl`).
  - **Route naming:** Align URL slug (`/tasks`) with displayed label ("Tasks") — `/tickets` causes confusion.
  - **Logo 404:** Backend must fix the missing `/storage/uploads/logo.png` asset or provide a fallback in the layout.
  - **Status color system:** Introduce consistent semantic colors for task statuses (Completed = green, Pending = amber, Overdue = red, In Progress = blue) across all cards and table cells.
  - **Accessibility:** Filter controls and KPI cards need ARIA labels; the modal requires focus trap and Escape-key dismiss.

- **Anything that needs owner/backend confirmation:**
  - Confirm whether task creation/editing lives on a separate route not yet discovered (no "Add Task" button found here).
  - Confirm the intended data scope: is this page meant to show the teacher's own assigned tasks, or tasks they've assigned to students/staff?
  - Clarify why the route is `/teacher/tickets` when the module is called "Tasks" — check if "tickets" is a legacy alias or a distinct concept.
  - Verify whether the 5 filter `div` elements correspond to real server-side filter parameters (status, date, assignee, etc.).

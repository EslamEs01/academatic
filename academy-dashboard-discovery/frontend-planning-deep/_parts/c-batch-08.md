# Batch 8 — Admin · Mixed Utilities & Automation

---

### `management-courseclasses-default-member-course-details-1` — Default Member Course Details (ID 1)

- **Purpose:** Detail view for a single default course-class membership, showing student/parent/teacher info, course metadata, and a timeline of events.
- **Key sections / flows:** Two-section card layout: (1) `defaultCourse_details` card showing student name, parent name, teacher name, course name, schedule link, price, total hours; (2) `Timeline` card showing creation log (date + who created). Timetable modal triggered by "Show Timetable" shows Student/Teacher/Duration/Weekdays/Time columns.
- **Key SAFE actions:** View all courses (nav), View All Queues (nav), Show Timetable (modal, read-only).
- **Key MUTATING/dangerous actions:** Copy Course Data (button implied by card text), Edit, Delete (form POSTs to `/management/courses/1/delete`). Delete must require confirmation dialog.
- **Important modals/forms:** Student Timetable modal (read-only grid: Student, Teacher, Duration, Week Days, Time). No input fields — purely informational.
- **Variant-of:** Unique template (course-class member detail; not seen elsewhere in this batch).
- **Broken/empty:** Page loads (200). Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all pages in this batch.
- **UX improvement for the rebuild:** Destructive actions (Delete, Edit) should be moved into a row-action dropdown or explicit confirmation dialog with the entity name echoed back; "Copy Course Data" should also be a named action with feedback, not an unlabelled button.

---

### `management-export-course` — Export Course (error state)

- **Purpose:** Export course data page — but it rendered as an application error screen.
- **Key sections / flows:** Single error card: "Something went wrong, try again later" with a "Go Back to Home" link pointing to `/login`.
- **Key SAFE actions:** Go Back to Home (navigation).
- **Key MUTATING/dangerous actions:** None (page failed to render).
- **Important modals/forms:** None.
- **Variant-of:** Unique template (export trigger page), but only the error shell is visible.
- **Broken/empty:** BROKEN — application-level error rendered ("Something went wrong, try again later"). The export feature is non-functional or requires specific pre-conditions not met during crawl. DOM has only 1 link, 1 button, 0 forms.
- **UX improvement for the rebuild:** Implement a proper export flow: select format (CSV/XLSX), date range, and trigger a server-sent download. Include a loading state with progress and error recovery, not a bare error page.

---

### `management-families-feedback-family-1` — Family Feedback Detail (Family ID 1)

- **Purpose:** Per-family feedback detail view — shows feedback received about/from a specific family.
- **Key sections / flows:** Same broken error shell as export-course: "Something went wrong, try again later" + Go Back to Home.
- **Key SAFE actions:** Go Back to Home (navigation).
- **Key MUTATING/dangerous actions:** None (page failed).
- **Important modals/forms:** None.
- **Variant-of:** Shares the same error-page shell template as `management-export-course` and the broken scheduled-trials pages (identical DOM structure: rect×9, circle×6, svg×1, h4×1, a×1).
- **Broken/empty:** BROKEN — application error on load. 290 network requests captured (heavy pre-load) but content did not render.
- **UX improvement for the rebuild:** The family feedback detail should show the family's feedback history with date, rating, notes, and a link back to the family profile; needs proper 404 and permissions handling instead of a generic error.

---

### `management-heads` — Expense Heads / Budget Categories

- **Purpose:** CRUD management page for "Heads" — accounting expense category labels (name + active/inactive status).
- **Key sections / flows:** Single card with a data table (#, Name, Status, Actions). Table shows "No Data found" — empty state. Two modals: Add Head (name + status) and Edit (same fields).
- **Key SAFE actions:** View all courses (nav), View All Queues (nav), filter by status (GET form, select).
- **Key MUTATING/dangerous actions:** Add Head (POST to `/management/heads`), Save changes on Edit form (PUT via hidden `_method`). No delete seen but implied by Actions column.
- **Important modals/forms:** Add Head modal (fields: name [text, required], status [select: Active/Inactive]). Edit modal (same fields, pre-populated).
- **Variant-of:** Unique template (simple CRUD list with inline modals — same pattern as other category pages but for accounting heads).
- **Broken/empty:** Page loads (200) but table is empty — "No Data found". Functional but no data present.
- **UX improvement for the rebuild:** Add an inline status toggle per row (single click to activate/deactivate) instead of requiring open-edit-save; also add a visible delete action with confirmation to the Actions column.

---

### `management-new-requests-requests-date-range-2026-06-01-to-2026-06-30` — New Requests List (Date-Filtered)

- **Purpose:** Trial/enrollment request pipeline list filtered by a date range, with KPI summary cards above and a detailed request table below.
- **Key sections / flows:** Large KPI banner (Trials Completed=0, Overdue Scheduling=0, Upcoming Unconfirmed=5, Scheduling Efficiency=65%, Total Requests=0, Scheduled=0, Pending=0, Avg Scheduling Time=0h, Missed/Completed/Cancelled trial counts, Fastest Scheduling=0m); filtered table (#, Date, Parent name, Email, Phone, Status, Actions — 0 rows for this range). Per-row drawer shows full request: Parent info, Course/Trial date/time, Teacher gender preference, Classes/week, Duration, Country, Timezone, Language, Referral source, Coupon, IP/Browser/Device.
- **Key SAFE actions:** Filter by date range (GET form with flatpickr date range input), view request details modal (read-only), view notes list.
- **Key MUTATING/dangerous actions:** Create (new request), Add Notes (POST note to request), Change Status (POST to update status — options: Contacted, Qualified, Trial Taken, No Response, Duplicated, Trial Missed, Scheduled, Teacher Cancel), Cancel button in status modal.
- **Important modals/forms:** (1) Request detail modal (read-only, full intake form data). (2) Notes List modal (table: #, Date, Users, All Notes). (3) Add Notes modal (textarea: note, required). (4) Change Status modal (select status, required — 7 statuses including destructive ones like "Trial Missed", "Duplicated"). Status change is high-risk: confirm dialog needed.
- **Variant-of:** Variant of the New Requests base template — this is the `?date_range=` query-param variant.
- **Broken/empty:** Page loads (200), table has 0 rows for the selected date range (expected — no data in June 2026 scope). KPI cards show zeros — legitimate empty state.
- **UX improvement for the rebuild:** Replace the flat status change dropdown with a guided workflow (step-by-step status progression with required fields per status, e.g., "Trial Taken" requires trial date confirmation). The status-change modal should show current status and warn on destructive transitions.

---

### `management-new-requests-scheduled-trials-index-status-3-4-date-2026-06-01-to-202` — Scheduled Trials (Status 3,4 — filtered)

- **Purpose:** Filtered view of scheduled trials with statuses 3 and 4 (likely "Completed" / "Missed" or similar) for a date range.
- **Key sections / flows:** Error shell only — "Something went wrong, try again later".
- **Key SAFE actions:** Go Back to Home.
- **Key MUTATING/dangerous actions:** None (page failed).
- **Important modals/forms:** None.
- **Variant-of:** Variant of a scheduled-trials index template (filtered by status=3,4 + date), but broken — shares same error DOM as other broken pages.
- **Broken/empty:** BROKEN — application error. 288 network requests but no content rendered.
- **UX improvement for the rebuild:** The scheduled-trials list should support multi-status filter chips (select one or more statuses), a date range picker, and inline status badges with color coding. The backend needs to handle multi-value status params robustly.

---

### `management-new-requests-scheduled-trials-index-status-5-7-6-date-2026-06-01-to-2` — Scheduled Trials (Status 5,7,6 — filtered)

- **Purpose:** Same scheduled-trials index as above but with a different status combination (5, 7, 6).
- **Key sections / flows:** Same error shell.
- **Key SAFE actions:** Go Back to Home.
- **Key MUTATING/dangerous actions:** None (page failed).
- **Important modals/forms:** None.
- **Variant-of:** Variant of the same scheduled-trials index template (different status query params). Both status=3,4 and status=5,7,6 variants broke identically.
- **Broken/empty:** BROKEN — same error as status-3-4 variant (289 requests, no content).
- **UX improvement for the rebuild:** See status-3-4 note. Additionally, the status codes should be surfaced as human-readable labels in URLs/filters (e.g., `?status=completed,missed` not `?status=3,4`) for debuggability and maintainability.

---

### `management-scheduled-actions` — Scheduled Actions List

- **Purpose:** Admin automation hub listing all scheduled batch actions (stop family, stop student, cancel classes, activate family/student) with their type, target, date, status, result, and notes.
- **Key sections / flows:** Single card — H5 "Scheduled Actions". Table (10 columns: #, Action Type, Target, Scheduled Date, Status, Created by, Executed At, Result, Note, Settings). Table empty ("No data found"). Filter bar above table: Action Type (select: All / Stop Family / Stop Student / Cancel Classes / Activate Family / Activate Student), Status (select: All / Pending / Executed / Failed / Cancelled). "Create Scheduled Action" CTA link.
- **Key SAFE actions:** Filter by action type + status (GET form), Reset filter (nav link).
- **Key MUTATING/dangerous actions:** Create Scheduled Action (navigates to create form), Settings column (edit/delete per row — implied, not captured in empty state).
- **Important modals/forms:** None (all mutation is via separate create page or inline row controls).
- **Variant-of:** Unique template (automation queue list).
- **Broken/empty:** Page loads (200), table is empty — no actions in system. Legitimate empty state.
- **UX improvement for the rebuild:** Add status color-coding (Pending=amber, Executed=green, Failed=red, Cancelled=grey) and a "Retry" action for Failed items. Show the scheduled date relative to now (e.g., "in 2 days", "overdue 3h") instead of raw datetime only.

---

### `management-scheduled-actions-create` — Create Scheduled Action

- **Purpose:** Form to schedule a future batch action (stop/activate a family or student, or cancel/reschedule a student's classes with optional makeup logic).
- **Key sections / flows:** Single card "Scheduled Action Details". Dynamic form that shows/hides fields based on action_type selection:
  - **Stop Family**: family selector + optional returned_at date.
  - **Stop Student**: student selector + optional returned_at date.
  - **Cancel Classes**: student selector + teacher/material criteria + cancel_type radio (Auto Makeup / Reschedule / No Makeup) + reschedule_date/time + add_to_credit checkbox.
  - **Activate Family**: family selector.
  - **Activate Student**: student selector.
  - All types share: scheduled_date (required), note (textarea).
- **Key SAFE actions:** None (page is purely a creation form).
- **Key MUTATING/dangerous actions:** Submit (POST to `/management/scheduled-actions`) — creates a future action that will automatically stop/suspend/cancel records on the chosen date. Extremely high impact; no preview or confirmation step observed.
- **Important modals/forms:** Main form: action_type (select, required), scheduled_date (date, required), family_target_id / student_target_id / cancel_classes_student_id / activate targets (dynamic selects), criteria[teacher_id], criteria[material_id], criteria[cancel_type] (radio), criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit] (checkbox), returned_at (date, optional), note (textarea).
- **Variant-of:** Unique template (wizard-in-one-page creation form for automation).
- **Broken/empty:** Loads (200). No pre-populated data — blank form. Selects for targets appear populated via JS (Select2).
- **UX improvement for the rebuild:** Convert to a multi-step wizard: Step 1 pick action type, Step 2 pick target + dates, Step 3 review summary of what will happen + explicit confirmation ("This will suspend family X from 2026-07-01. Are you sure?"). The current single-page form with 19+ controls is error-prone for an irreversible batch action.

---

### `management-settings-customisation-message-builder` — Message Builder (Gateway Timeout)

- **Purpose:** Settings page for customising system notification/message templates — content not accessible.
- **Key sections / flows:** Raw Nginx/server "Gateway Timeout" page (H1: Gateway Timeout, bare body text, Times New Roman font, no app chrome).
- **Key SAFE actions:** None.
- **Key MUTATING/dangerous actions:** None (page unreachable).
- **Important modals/forms:** None.
- **Variant-of:** Unique template intent (message builder / template customiser), but only error page captured.
- **Broken/empty:** BROKEN — Gateway Timeout (504). The backend process for this route timed out entirely. This feature cannot be assessed from the crawl.
- **UX improvement for the rebuild:** The message builder should be a full rich-text or template-editor component (variable token insertion, preview pane, per-event message types). Needs backend route stability first — confirm with backend team whether this endpoint is implemented.

---

### `management-teachers-1-monthly-classes` — Teacher Monthly Classes (Teacher ID 1)

- **Purpose:** Monthly class report for a specific teacher — likely shows sessions taught in a given month.
- **Key sections / flows:** Same broken error shell — "Something went wrong, try again later" with Go Back to Home.
- **Key SAFE actions:** Go Back to Home.
- **Key MUTATING/dangerous actions:** None (page failed).
- **Important modals/forms:** None.
- **Variant-of:** Variant of the teacher detail sub-page template (monthly classes tab/sub-route), sharing the broken-page DOM.
- **Broken/empty:** BROKEN — application error. 279 network requests, no content rendered.
- **UX improvement for the rebuild:** Teacher monthly classes should be a calendar/table hybrid: rows per session with date, student, course, duration, status (held/cancelled/makeup); filterable by month. Should be reachable from the teacher profile as a sub-tab.

---

### `management-time-convertor` — World Time Zone Converter

- **Purpose:** Dual-purpose timezone tool: (1) interactive multi-timezone clock/comparison grid for scheduling, and (2) a "Changes" tab listing upcoming DST offset changes and their impact on teacher/family accounts.
- **Key sections / flows:** Two tabs — **"Time Zone"** (default active): horizontal 24-hour timeline grid per location, current time highlighted, navigation (Previous/Today/Next date), system timezone shown (Cairo +3), Add Location button opens region-filtered modal listing 150+ cities; **"Changes"** tab: table (Time Zone, Affected Accounts, Next Change Date, Current Offset UTC, Upcoming Offset UTC, Offset System) — 2 real rows: Egypt (Cairo, Teachers:1, Families:0, changes 2026-10-29) and United Kingdom (London, Teachers:0, Families:1, changes 2026-10-25).
- **Key SAFE actions:** Navigate date (Previous/Today/Next), switch tabs (Time Zone / Changes), filter timezone list by region (All/Americas/Europe/Asia/Africa/Oceania), Remove a location from the comparison grid.
- **Key MUTATING/dangerous actions:** Add Location (adds a timezone row to the session grid — client-state mutation, not a server write). System timezone button — may update admin's timezone preference.
- **Important modals/forms:** Add Location modal: region filter tabs (All Regions / Americas / Europe / Asia / Africa / Oceania) + scrollable list of cities with flag icons and IANA timezone identifiers; select to add to grid.
- **Variant-of:** Unique template (fully custom timezone comparison tool — not a standard CRUD page).
- **Broken/empty:** Loads (200). Data is real and live (2 timezone change rows, actual offsets).
- **UX improvement for the rebuild:** Add a "Notify affected accounts" button on the Changes tab so admin can send an advance warning to teachers/families whose timezone is about to shift. Also persist the selected timezone columns server-side (per admin session) so they survive page reload.

---

## Module Synthesis (this batch)

### What this module covers and its core entities

Batch 8 spans five distinct sub-domains within the admin panel:
1. **Course / class membership detail** — reading one student-course record.
2. **Course export** — a broken data export feature.
3. **Family feedback detail** — broken sub-route.
4. **Accounting heads** — CRUD for expense category labels.
5. **New Requests pipeline** — trial intake with rich KPI dashboard, date filtering, per-request detail, notes, and status transitions.
6. **Scheduled Trials index** — filtered subsets of the request pipeline (both broken on crawl).
7. **Scheduled Actions** — automation queue (list + create) for batch operations on families/students/classes.
8. **Settings / Message Builder** — timed out entirely.
9. **Teacher monthly classes** — broken sub-route.
10. **Time Zone Converter** — real-time timezone comparison grid + DST impact table.

### Distinct page templates vs variant count

| Template | Count | Variants |
|---|---|---|
| Course-class member detail | 1 | unique |
| Export course (error shell) | 1 | unique intent, broken |
| Generic app error shell ("Something went wrong") | 5 | families-feedback-family-1, new-requests-scheduled-trials status 3,4 and 5,7,6, teachers-monthly-classes, export-course |
| Accounting heads CRUD list | 1 | unique |
| New Requests list + KPI (date-filtered) | 1 | date_range query-param variant of base |
| Scheduled Actions list | 1 | unique |
| Scheduled Action create form | 1 | unique |
| Message Builder (504 gateway timeout) | 1 | unique intent, broken |
| Time Zone Converter | 1 | unique |

**Unique templates: 8** (course detail, heads CRUD, new requests list, scheduled actions list, scheduled action create, time converter, error shell, gateway-timeout shell)
**Variant pages: 4** (export-course broken, families-feedback broken, 2x scheduled-trials broken)

### Cross-cutting interactions and dangerous ones

- **Dangerous:** Change Status in New Requests (7 status options including Terminal: Duplicated, Trial Missed, Teacher Cancel — no confirm dialog). Create Scheduled Action Submit (irreversible future batch mutation — Stop/Activate families/students, cancel/reschedule classes with no preview step). Delete on course-class detail (no visible confirmation).
- **Modals used across pages:** Request detail (read-only), Notes List, Add Notes, Change Status, Student Timetable, Add Location (timezone), Add Head, Edit Head.
- **Filters:** Date range (flatpickr) on New Requests; Action Type + Status selects on Scheduled Actions; Region tabs in timezone modal.
- **Tabs:** Timezone Converter uses pill-tabs (Time Zone / Changes) — the only tab-based page in this batch.

### Improvements for the new platform

1. **Broken pages (5 of 12):** Four broken with app error + one 504 — backend team must stabilize `/management/families/feedback/family/:id`, `/management/teachers/:id/monthly-classes`, `/management/new-requests/scheduled-trials/index?status=...` (multi-value params), and `/management/settings/customisation/message-builder` (504) before frontend rebuild can proceed for these routes.
2. **Scheduled Action create wizard:** Convert the dense 19-control single-page form to a guided 3-step wizard with a preview + confirm step — this is the highest-risk form in the codebase (bulk suspend/cancel/activate).
3. **Status transitions in New Requests:** Use a workflow-aware status stepper (not a raw dropdown) with contextual required fields per transition and a warning for irreversible states (Duplicated, Trial Missed).
4. **Empty state design:** Heads list, Scheduled Actions list, and New Requests table all hit empty states — each needs a context-appropriate empty illustration + primary CTA (e.g., "Schedule your first action").
5. **Time Zone Converter — persistence + notification:** Persist selected timezone columns; add "Notify affected users" CTA on the DST Changes tab.
6. **Accounting Heads — inline status toggle:** Replace edit-modal-save for status with a single toggle switch per row.
7. **Color-coded status badges:** Scheduled Actions (Pending/Executed/Failed/Cancelled) and New Requests statuses need consistent semantic color tokens (defined in the design system, used RTL-safe).
8. **Course-class detail — destructive action guard:** Edit/Delete must use a named confirmation dialog; Copy Course Data needs a clear affordance and success feedback.
9. **Mobile / RTL:** All pages are LTR-only. The timezone grid and New Requests KPI banner are especially dense — both need responsive breakpoints and RTL flip for the Arabic audience.
10. **Logo 404:** `storage/uploads/logo.png` returns 404 on every page — fix asset path in the rebuild (or use a CDN URL).

### Needs owner / backend confirmation

- **Scheduled-trials multi-value status params** (`?status=3,4` and `?status=5,7,6`): The backend crashes on these — confirm whether comma-separated values are the intended API contract or whether the frontend should make separate requests per status.
- **Message Builder (504):** Confirm whether the message-builder feature is implemented at all, or planned for a future sprint — drives whether the rebuild needs a template editor.
- **Family Feedback per-family sub-route:** Confirm what data this page is supposed to show (family-specific feedback history vs aggregate) and whether auth/data issues caused the crash.
- **Export Course:** Clarify the intended export format and whether this is a direct download or an async job with status polling.
- **Status code semantics for Scheduled Trials:** What do statuses 3, 4, 5, 6, 7 map to in human terms? Needed for correct filter labels and workflow logic.

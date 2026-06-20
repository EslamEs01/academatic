# Batch 04 — Admin Courses Module

**Pages read:** 18
**Unique templates:** 6
**Variant pages:** 12
**Source role:** admin

---

## Page Digests

---

### management-courses — Courses List Index

**Purpose:** Primary landing page for the Courses module. Lists all courses with KPI counters across status groups, rich per-row action menus, and a global filter/search bar. Acts as the hub for all course lifecycle operations.

**Key sections / flows:**
- Header KPI cards: Active, Active & unpaid, Completed, Suspended, Indebted, Inactive — each card is a filter shortcut
- Main data table: course name, student, teacher, status badge, dates, action column
- Filter bar: status multi-select, type (no_invoices), student, teacher, date range — GET params compose a URL query
- Per-row action dropdown (10+ items): View, Edit, Edit Copy (new copy), Change Status, Assign Invoice, Schedule Cancel, Export, Send WA Message, Delete

**Key SAFE actions:**
- View course detail
- Export courses (navigation link, read-only)
- Filter / search table

**Key MUTATING actions:**
- Change Status — modal, changes lifecycle state; irreversible without another change
- Assign Invoice — POST to `/management/management/members/invoice` (note: doubled path segment, likely application bug)
- Schedule Cancel — modal to queue a future cancellation with cancel_type, reschedule date/time, add_to_credit, note
- Delete — POST to `/management/courses/{id}/delete`; destructive, no undo shown

**Important modals / forms:**
- Change Status modal: select target status, confirmation
- Schedule Cancel modal: date, cancel_type (Auto Makeup / Reschedule / No Makeup), reschedule_date, reschedule_time, add_to_credit toggle, note
- Assign Invoice modal: member/invoice picker

**Variant-of:** (canonical template — others are variants of this)

**Broken / empty:** None — list renders data when unfiltered

**UX improvement ideas:**
- KPI cards could show trend deltas (vs last period) rather than just counts
- Dangerous actions (Delete, Schedule Cancel) should be visually separated or placed at the bottom of the dropdown with a divider and warning color
- Double path segment in invoice endpoint is a backend bug; surface a clear error if it fails rather than silent failure
- Row action menus with 10+ items should be grouped: View/Edit group, Status group, Communication group, Danger group

---

### management-courses-1 — Course Detail (Class History)

**Purpose:** Deep-dive view of a single course. Shows course metadata at the top and a full class-session timeline table below. Every individual class row has its own action set covering attendance, cancellations, messaging, and queue management.

**Key sections / flows:**
- Course header: student name, teacher, status badge, schedule summary, hour rate(s), timezone(s)
- Class history table: date/time, status, attendance, teacher present, actions per row
- Timeline actions per class: Attend, Cancel, Mark Absent, Edit Session, Send WA Message, Add Queue, Reverse Action, Delete
- Modals fire inline (no page navigation) for each per-class action

**Key SAFE actions:**
- View class history
- Add Queue (non-destructive addition)

**Key MUTATING actions:**
- Attend — records attendance; POST endpoint per class
- Mark Absent — who is absent (student/teacher), notification type (none/default/custom message), makeup option (none/auto/reschedule with date+time+tz), add_to_credit toggle
- Cancel Class — who cancels (teacher/student/admin), notification option, makeup option, add_to_credit
- Edit Session — change date/time/timezone for a single class
- Reverse Action — undo the last status change on a class (limited scope)
- Delete — permanently removes a class record
- Send WA Message — triggers WhatsApp notification to student or teacher

**Important modals / forms:**
- Mark Absent modal: absent_party (student|teacher), notification_type, makeup_type (none|auto|reschedule), reschedule_date, reschedule_time, reschedule_tz, add_to_credit
- Cancel Class modal: cancel_by (teacher|student|admin), notification_type, makeup_type, reschedule fields, add_to_credit
- Edit Session modal: new_date, new_time, timezone selector
- Send WA Message modal: recipient selector, message body (custom or template)
- Feedback modal: rating, notes

**Variant-of:** (canonical template for detail view)

**Broken / empty:** None — class history populated in test data

**UX improvement ideas:**
- Per-class action menus repeat identical structure for every row; consider a slide-out panel pattern that loads the class context once rather than re-rendering 7 modals per row
- "Reverse Action" label is ambiguous — rename to "Undo Last Status" with a tooltip showing what will be reversed
- Mark Absent and Cancel Class flows are very similar — consider a unified "Record Class Outcome" flow with branching (attended/absent/cancelled) to reduce cognitive overhead
- Add a visual timeline instead of a flat table for easy scanning of class cadence and gaps

---

### management-courses-1-create — Create Course (Paid, Student 1)

**Purpose:** Multi-section form to create a new paid course for a specific student. Includes student timezone vs teacher timezone comparison and a multi-day weekly schedule builder.

**Key sections / flows:**
- Basic Info section: student (pre-filled), teacher selector, course name, status, start date
- Schedule section: day-of-week multi-selector, time picker, session duration, timezone selectors (student tz + teacher tz), T Difference display (computed, read-only, shows offset between the two)
- Additional Settings section: family_hour_rate (currency), teacher_hour_rate (currency), cancellation limits, notes
- Form POSTs to `/management/courses/{student_id}/store`

**Key SAFE actions:**
- Preview T Difference (computed inline, no server call)
- Cancel / navigate away

**Key MUTATING actions:**
- Submit form — creates course record, generates session schedule

**Important modals / forms:**
- Main create form (no modal — full page)
- Multi-day schedule builder: checkbox group for days, time input per day or shared time

**Variant-of:** (canonical paid-course create template)

**Broken / empty:** None

**UX improvement ideas:**
- T Difference display is very useful; surface it prominently with a visual clock overlay or world-clock widget rather than a raw offset string
- Consider a schedule preview calendar (mini weekly view) that updates live as the user picks days/times before submitting
- Family hour rate vs teacher hour rate should be explained inline — first-time admins may not know the distinction; add helper text
- Start date + day-of-week combination could auto-warn if the first occurrence falls more than N days in the future (alignment check)

---

### management-courses-1-create-free — Create Free Course (Student 1)

**Purpose:** Same as the paid create form but for a free/store course. Omits family_hour_rate entirely; only teacher_hour_rate applies. POSTs to `/management/courses/{student_id}/store_free`.

**Key sections / flows:**
- Identical to paid create except: no family_hour_rate field, endpoint is store_free

**Key SAFE actions:** Same as paid create

**Key MUTATING actions:**
- Submit — creates free course record

**Important modals / forms:** Same structure as paid create, minus rate field

**Variant-of:** management-courses-1-create (omits family_hour_rate, different endpoint)

**Broken / empty:** None

**UX improvement ideas:**
- Visual differentiation (e.g., a "Free Course" banner or color accent) should make it immediately clear to the admin that this form creates a non-billed course — prevents accidental use
- Could auto-set teacher_hour_rate to 0 with a note if the teacher is in a volunteer/free tier

---

### management-courses-1-edit — Edit Course (Student 1)

**Purpose:** Edit an existing course's metadata and/or schedule. Adds Course Edit Type controls that let the admin choose whether the change applies to the current course instance, the default template, or both. Also shows a preview table of existing scheduled sessions before submission.

**Key sections / flows:**
- Same three sections as create (Basic Info, Schedule, Additional Settings)
- Course Edit Type section: checkboxes — update_current, update_default
- Existing sessions preview table: readonly view of currently scheduled classes (date, time, status)
- Optional: delete_old_sessions checkbox — if checked, existing future sessions are purged and regenerated
- POSTs to `/management/courses/{id}/update`

**Key SAFE actions:**
- View existing session preview table
- Adjust form fields without submitting

**Key MUTATING actions:**
- Submit with update_current — modifies this course instance
- Submit with update_default — modifies the default template for future courses
- Submit with delete_old_sessions — destructively removes and regenerates all future sessions

**Important modals / forms:** Full-page form (no separate modal); delete_old_sessions is an inline checkbox with significant side-effects

**Variant-of:** management-courses-1-create (adds edit-type section, session preview, delete_old_sessions)

**Broken / empty:** None

**UX improvement ideas:**
- delete_old_sessions checkbox should have a prominent warning (red callout) — it is the most destructive checkbox on the page with no separate confirmation step
- update_current vs update_default distinction is subtle; add a plain-language description under each checkbox ("Changes the schedule for existing sessions" vs "Changes the template used for future auto-generated courses")
- The existing sessions preview table is valuable; add a diff view showing what will change after edit (before/after side-by-side)

---

### management-courses-2-create — Create Course (Paid, Student 2)

**Purpose:** Same paid course create form but scoped to student 2, who is in the Europe/London timezone. T Difference shows -02:00 relative to the configured teacher timezone, demonstrating that the offset is student-specific.

**Key sections / flows:** Identical to management-courses-1-create; only student_id and displayed timezone differ

**Key SAFE actions:** Same as paid create

**Key MUTATING actions:**
- Submit — POSTs to `/management/courses/2/store`

**Variant-of:** management-courses-1-create (student_id=2, different tz, T Diff=-02:00)

**Broken / empty:** None

**UX improvement ideas:** Same as paid create; additionally, if the student's timezone results in antisocial teaching hours (e.g., 2 AM for the teacher) add a visual warning on the time picker

---

### management-courses-2-create-free — Create Free Course (Student 2)

**Purpose:** Free course create for student 2 (Europe/London). Structurally identical to student-1 free create with student_id=2 in the endpoint.

**Key sections / flows:** Same as management-courses-1-create-free

**Key MUTATING actions:**
- Submit — POSTs to `/management/courses/2/store_free`

**Variant-of:** management-courses-1-create-free (student_id=2)

**Broken / empty:** None

**UX improvement ideas:** Same as free create (student 1)

---

### management-courses-create-new-copy-1 — Create New Copy of Course 1

**Purpose:** Creates a fresh course record that is a copy of course 1's configuration. Unlike edit, this creates a new course object. Shares the Course Edit Type section from the edit form, suggesting a workflow where the copy can also update the source default template.

**Key sections / flows:**
- Same three sections as create
- Course Edit Type section (same as edit): update_current, update_default checkboxes
- Existing sessions preview table showing course 1's current sessions (readonly reference)
- POSTs to `/management/courses/1/store` (same endpoint as initial create — server disambiguates by presence of copy flag or context)

**Key SAFE actions:**
- View source session preview
- Cancel

**Key MUTATING actions:**
- Submit — creates new course record; if update_default checked, also mutates the template

**Variant-of:** management-courses-1-edit (same structure but intent is to create a copy, not update in place)

**Broken / empty:** None

**UX improvement ideas:**
- "Create New Copy" intent should be explicit in the page heading and a prominent info banner — the form is visually indistinguishable from Edit, which could confuse admins
- Show a clear "You are creating a new course based on course X" notice with the source course name

---

### management-courses-status-0-0 — Courses List (Status=0, Stopped)

**Purpose:** Courses list filtered to status value 0 (Stopped courses). No data in the test dataset for this filter combination.

**Key sections / flows:** Same as Courses List Index; filter pre-applied; table shows empty state "No data found"

**Variant-of:** management-courses (status[0]=0 filter applied)

**Broken / empty:** Empty state — "No data found" (valid empty state, not an error)

**UX improvement ideas:** Empty state should include a contextual call-to-action ("No stopped courses — view all courses" link) rather than a plain "No data found" text

---

### management-courses-status-0-1 — Courses List (Status=1, Inactive)

**Purpose:** Courses filtered to status 1 (Inactive). Empty in test data.

**Key sections / flows:** Same as Courses List Index with status[0]=1 filter

**Variant-of:** management-courses (status[0]=1)

**Broken / empty:** Empty state — "No data found"

**UX improvement ideas:** Same empty-state improvement as status-0-0

---

### management-courses-status-0-2 — Courses List (Status=2, Active & Unpaid)

**Purpose:** Courses filtered to status 2, returning "Active & unpaid" courses. One result visible in test data. This is the most operationally significant status filter — courses that are running but not yet invoiced need prompt attention.

**Key sections / flows:**
- Filter pre-applied (status[0]=2)
- One course row shown with full per-row action menu
- All dangerous modals present (Delete, Schedule Cancel, Change Status, Assign Invoice)
- Assign Invoice action is especially relevant here — this status implies an invoice needs to be created

**Key SAFE actions:** View, Export

**Key MUTATING actions:** All same as Courses List Index

**Variant-of:** management-courses (status[0]=2)

**Broken / empty:** None — data present

**UX improvement ideas:**
- "Active & unpaid" status should have a visual urgency indicator (warning color badge, not just a neutral badge) across all views
- The "Assign Invoice" action should be the primary/highlighted action in the row menu for this status — consider auto-surfacing it as a quick action button outside the dropdown

---

### management-courses-status-0-3 — Courses List (Status=3)

**Purpose:** Courses filtered to status value 3. Empty in test data. Status label unclear from crawl data alone — requires backend enum confirmation.

**Variant-of:** management-courses (status[0]=3)

**Broken / empty:** Empty state — "No data found"

**UX improvement ideas:** Status label should be clearly documented; the numeric-to-label mapping should be visible in the filter UI, not just implied by the KPI cards on the index page

---

### management-courses-status-0-4 — Courses List (Status=4)

**Purpose:** Courses filtered to status value 4. Empty in test data.

**Variant-of:** management-courses (status[0]=4)

**Broken / empty:** Empty state — "No data found"

**UX improvement ideas:** Same as status-0-3

---

### management-courses-status-0-5 — Courses List (Status=5)

**Purpose:** Courses filtered to status value 5. Empty in test data.

**Variant-of:** management-courses (status[0]=5)

**Broken / empty:** Empty state — "No data found"

**UX improvement ideas:** Same as status-0-3

---

### management-courses-type-no-invoices — Courses Without Invoices

**Purpose:** Courses list filtered by type=no_invoices. Shows courses that have no associated invoice records — a billing/collections view. One result in test data, with Delete and Schedule Cancel as the primary dangerous actions surfaced.

**Key sections / flows:**
- Filter pre-applied (type=no_invoices)
- Same table structure as Courses List Index
- Row actions include Delete and Schedule Cancel prominently
- Assign Invoice action is available and is the natural resolution action for these rows

**Key SAFE actions:** View, Export

**Key MUTATING actions:** Delete, Schedule Cancel, Assign Invoice, Change Status

**Variant-of:** management-courses (type=no_invoices filter)

**Broken / empty:** None — data present

**UX improvement ideas:**
- This filter view is effectively a "billing exceptions" queue — give it a dedicated section in the admin navigation rather than just a filter
- Assign Invoice should be the primary call-to-action for every row in this view

---

### management-courses-type-no-invoices-status-0-0 — No Invoices + Status 0

**Purpose:** Intersection filter: no invoices AND status 0. Empty in test data.

**Variant-of:** management-courses-type-no-invoices (additional status[0]=0 filter)

**Broken / empty:** Empty state — "No data found"

**UX improvement ideas:** Same as other empty status variants

---

### management-courses-type-no-invoices-status-0-1 — No Invoices + Status 1

**Purpose:** Intersection filter: no invoices AND status 1. Empty in test data.

**Variant-of:** management-courses-type-no-invoices (additional status[0]=1 filter)

**Broken / empty:** Empty state — "No data found"

**UX improvement ideas:** Same as other empty status variants

---

### management-courses-type-no-invoices-status-0-2 — No Invoices + Status 2 (Active & Unpaid)

**Purpose:** Intersection filter: no invoices AND status 2 (Active & unpaid). One result in test data. This combination represents the highest-priority billing exception — a course that is actively running with no invoice.

**Key sections / flows:**
- Same table structure as Courses List Index
- One row visible with Delete and Schedule Cancel modals
- Assign Invoice is the critical action

**Key SAFE actions:** View, Export

**Key MUTATING actions:** Delete, Schedule Cancel, Assign Invoice

**Variant-of:** management-courses-type-no-invoices (additional status[0]=2 filter)

**Broken / empty:** None — data present

**UX improvement ideas:**
- This is the most urgent billing state — consider a dedicated "Urgent: Active & Unpaid with No Invoice" dashboard widget or alert banner surfaced on the admin home page
- Rows in this view should have a distinct visual treatment (e.g., red left border or warning badge) to communicate urgency

---

## Module Synthesis

### What this module does

The Admin Courses module covers the complete lifecycle of online tutoring courses: creation, scheduling, per-class session management, status transitions, billing linkage, and cancellation workflows. It is the operational core of the platform — every student-teacher engagement flows through it.

### Template map

| Template slug | Pages that use it |
|---|---|
| Courses List Index | management-courses (base) + 11 filter variants |
| Course Detail | management-courses-1 |
| Course Create Paid | management-courses-1-create, management-courses-2-create |
| Course Create Free | management-courses-1-create-free, management-courses-2-create-free |
| Course Edit | management-courses-1-edit |
| Course Create-New-Copy | management-courses-create-new-copy-1 |

### Status enum observations

The filter UI uses numeric status values (0–5 at minimum) but the KPI cards on the index show named statuses: Active, Active & unpaid, Completed, Suspended, Indebted, Inactive. The crawl data confirms:
- status[0]=2 returns "Active & unpaid" courses
- status[0]=0, 1, 3, 4, 5 all returned empty in test data

The mapping of numeric values to label names needs backend enum confirmation before building the new frontend's filter system. Do not assume sequential ordering matches the KPI card display order.

### Multi-timezone pattern

All create/edit forms carry two timezone selectors (student_tz, teacher_tz) and display a computed T Difference. This is a first-class UX concern — the new frontend should elevate this into a visual world-clock or dual-clock widget, not just a raw offset string.

### Dangerous action surface

The platform concentrates a large number of destructive/irreversible actions behind simple dropdown menus with minimal confirmation:
- Course Delete: one click, no second confirmation beyond a modal
- delete_old_sessions checkbox on edit: purges all future sessions without a dedicated confirmation step
- Schedule Cancel: schedules irreversible bulk class cancellations

The new frontend should introduce a graduated danger model: low-risk actions in normal menus, medium-risk actions in menus with confirmation dialogs, high-risk actions (delete, bulk cancel) behind a dedicated confirmation screen with explicit typed-confirmation or a summary of what will be deleted.

### Billing exception flows

Two filter views (type=no_invoices, type=no_invoices+status=2) surface a billing exceptions queue. These should be promoted to a dedicated "Billing Exceptions" section or alert queue in the new frontend rather than being buried in filter URL parameters.

### Empty state design gap

Seven of 18 pages show "No data found" with no contextual next action. The new frontend should design contextual empty states for each filter combination (e.g., "No stopped courses — that's good!" for status=Stopped, or "All active courses have invoices" for no_invoices filter returning empty).

### Known backend issues to track

- Invoice endpoint has a doubled path segment: `/management/management/members/invoice` — likely a routing bug, needs backend confirmation
- Logo asset at `/storage/uploads/logo.png` returns 404 on every page — infrastructure/asset pipeline issue, unrelated to course module but affects every page

### Cross-cutting concerns for the new frontend

1. Role-based action visibility: some actions (Delete, Change Status) should only surface for admin role — build a permission gate layer
2. Pagination: not crawled in detail but the table likely paginates; ensure filter state persists across page navigation
3. Scheduled cancellation system (`/management/scheduled-actions`) is a separate module but tightly coupled to course management — link from course detail to the scheduled action queue for that course
4. WhatsApp messaging integration: Send WA Message appears on both course list row actions and per-class actions — the new frontend should have a unified messaging composer component

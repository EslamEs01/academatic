# Batch 7 — admin · Dashboard / Home + New Requests + Teacher Home

---

### `management-new-requests-create` — Create New Request

- **Purpose:** Form page for manually creating a new student/family enrollment request from the admin side.
- **Key sections / flows:** Single-page form split into two card sections — "Main information" (first name, last name, email, phone, number of friends, class duration, how they heard about the academy, number of classes, gender, age, parent age, language, timezone, trial date/time, coupon code) and "Additional information" (parent country, course name, note). Breadcrumb: Dashboard > New Request > Create New Request.
- **Key SAFE actions:** View all courses (nav), View All Queues (nav), search bar, Apply (filter/open_ui).
- **Key MUTATING/dangerous actions:** Submit (POST to `/management/new-requests` — creates a new enrollment request); Save (shortcuts form); Cancel button present (but closes/cancels the form action).
- **Important modals/forms:**
  - Main create-request form (Form 2): 20 fields — first name, last name, email, phone, friends_number, classes_Duration, hear_from, classes_count, gender select, age, parent_age, language, timezone, trial_date, trial_time (hour/minute), coupone_code, country_id (required), course_name, note textarea. Action: POST `/management/new-requests`.
- **Variant-of:** Unique template (create form; distinct from the list/filter pages seen in prior batches).
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all pages; not a page-level break.
- **UX improvement for the rebuild:** Split the create-request form into a stepped/wizard flow (step 1: contact info, step 2: class preferences, step 3: trial scheduling) rather than a single long scrolling form; add inline validation and required-field indicators on all fields (currently `required` is only set on `country_id` in HTML despite the page implying more are required).

---

### `management-total-queues` — Total Queues

- **Purpose:** List view of all internal support/task queues across the platform, with level and status filtering.
- **Key sections / flows:** Single H4 "Total Queues" card containing a filterable table. Filter controls: level (Urgent / Medium / Normal) and status (Open / In progress / Closed). Table columns: #, Added by, Level, Text, Class, Status, Created at, Action. Table currently shows 0 rows (empty state at time of capture).
- **Key SAFE actions:** Filter (GET form — no mutation), View all courses (nav), View All Queues (nav).
- **Key MUTATING/dangerous actions:** Save (shortcuts modal — global chrome, skip). No row-level mutating actions visible with 0 rows, but the Action column implies edit/delete per row.
- **Important modals/forms:**
  - Filter form (Form 2, GET): `level` select (Urgent/Medium/Normal), `status` select (Open/In progress/Closed). Safe — query-param filter.
- **Variant-of:** Unique template (dedicated queue list; not a variant of any previously seen page).
- **Broken/empty:** Table has 0 rows at capture time — no data/empty state UI visible; the page renders without error (HTTP 200).
- **UX improvement for the rebuild:** Add a visible empty-state component (illustration + "No queues found" message + quick-create CTA) when the table has 0 rows; add column-level sorting and a search-within-table input; make level severity visually distinct with color-coded badges (red=Urgent, amber=Medium, green=Normal).

---

### `teacher-home` — Teacher Home (Admin view of teacher's home dashboard)

- **Purpose:** Admin-facing view of the teacher home dashboard — shows a per-day class schedule with KPI summary counters, rich per-row action menu, and multiple inline modals for class lifecycle management.
- **Key sections / flows:**
  - **KPI bar (8 cards):** Total Classes (1), Sessions Pending (0), Attend Sessions (0), Waiting & Running (1 & 0), Cancel Sessions (0), Sessions Absent (0), Trials Sessions (1), Last Today Sessions (0). Each card has a "Show Details" link that filters the class table by status.
  - **Filter Classes panel:** Date range, from/to time, teacher select, parent select, student select, class type (session/Trial/Group). Search button submits as GET to `/management/home`.
  - **Classes table (today's date):** Columns: #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions. Actions per row: Reverse Action, Add Queue, Attend Class, Cancel Class, Absent Class, Edit Class, Running, Send Reminder, Send WA Message, Delete Fine.
  - **Display settings:** Table display mode (Today's Classes / Upcoming / Past), Group by Time toggle — saved via modal.
  - **Export:** Hidden POST form to `/management/export-aa` (Submit button — unlabeled export trigger).
- **Key SAFE actions:** Show Details (filter by status), Search (filter form GET), Show Details (nav to class detail `/management/courseClasses/{id}`), display mode selection.
- **Key MUTATING/dangerous actions:**
  - **Attend Class** → Mark as attend modal (POST) — records attendance with or without sending class details to parent/teacher.
  - **Cancel Class** → Cancel Class modal (POST to `#`/`cancelClass_form`) — records who cancelled, note, notification option, makeup option (No Make-up / Auto Make-up / Reschedule), add-to-credit toggle.
  - **Absent Class** → Mark As Absent modal (POST) — who is absent, note, send message choice (Don't send / Default / Custom), makeup option, add-to-credit, reschedule date/time with timezone selection.
  - **Edit Class** → Edit Class modal (POST to `/management/courseClasses/edit-class`) — reschedule date/time, duration, teacher reassign, accounting statement, send notification toggle.
  - **Delete Fine** → Two forms (POST to `/management/teachers/1/compensations/3`) — directly deletes a compensation/fine record; no confirmation dialog visible in capture.
  - **Add Queue** → Add Quick Queue modal (POST to `#`/`add_queue_form`) — level (Urgent/Medium/Normal) + text.
  - **Send WA Message** → Send Whatsapp Message modal (POST) — message text, teacher/student checkbox recipients.
  - **Add Feedback** → Add Feedback modal (POST to `/management/class-feedback`) — note textarea, file upload.
  - **Save changes** (Settings modal) — persists display mode + group-by-time preferences.
  - **Export** — unlabeled submit button on export form.
- **Important modals/forms:**
  - **Settings (Modal 2):** classes Display Mode select (Today's/Upcoming/Past), Group by Time checkbox. POST GET to `/management/home`.
  - **Add Quick Queue (Modal 3):** level select (Urgent/Medium/Normal), text textarea. Fields: `class_id` hidden, `level`, `text`.
  - **Mark as attend (Modal 4):** radio (no details vs. with details), Class Remark select (Excellent/Very Good/Good/Acceptable/Needs Improvement), Summary textarea, Homework textarea, Notes text, image file upload. Fields: `class_id`, `markAsAttend`, `remark`, `summary`, `homework`, `notes`, `images[]`.
  - **Send Whatsapp Message (Modal 5):** `wa_message` textarea, `send_teacher` checkbox, `send_student` checkbox.
  - **Mark As Absent (Modal 6):** `absent_by` select (Student Absent/Teacher Absent), `note` textarea, `sendMessage` radio (Don't send/Default/Custom), `message` custom textarea, makeup tabs (No Make-up/Auto Make-up/Reschedule to another time), `add_to_credit` checkbox, timezone radio (Student TZ/Teacher TZ), `date`/`time` inputs for reschedule.
  - **Edit Class (Modal 7):** `date`/`time` inputs (Teacher Timezone), `sendMessage` (Send Notification) checkbox, `duration` select, `teacher_id` select, `accounting_statement` select.
  - **Cancel Class (Modal 8):** `cancel_by` select (Teacher/Student/Admin Cancel), `note` textarea, `sendMessage` checkbox, makeup tabs, `add_to_credit` checkbox, timezone radio, reschedule `date`/`time`.
  - **Add Feedback (Modal 9):** `feedback_note` textarea, `feedback_files[]` file input. Category/Percentage display (read-only in modal context).
- **Variant-of:** Unique template — the richest page in this batch; the admin-side teacher home is the operations command center for daily class management. Not a variant of any simpler page.
- **Broken/empty:** Logo 404 (system-wide, not page-specific). Page loads with live data (1 class row visible). No broken page status.
- **UX improvement for the rebuild:** The per-row action menu has 10 items in a flat list (Reverse Action, Add Queue, Attend, Cancel, Absent, Edit, Running, Send Reminder, Send WA, Delete Fine) — this is extremely dense and error-prone. Rebuild should use a contextual row-action menu that adapts based on class status: e.g., a "Waiting" class only shows Attend/Cancel/Absent/Edit as primary actions; Delete Fine should require a confirmation dialog; dangerous actions (Delete Fine, Absent, Cancel) should use destructive-red styling and a two-step confirm.

---

## Module synthesis (this batch)

**What this module covers and its core entities:**
- This batch covers three distinct admin-role pages spanning two functional areas: (1) the enrollment/new-requests pipeline (create form) and (2) the operational dashboard (total queues list + teacher home/daily class schedule). Core entities: new enrollment request (lead), support queue item (level + status), class/session (with rich lifecycle: waiting → attend/absent/cancel → makeup/credit).

**Distinct page templates vs variant count:**
- 3 pages read, all 3 are unique templates with no query-param/status variants in this batch.
  - `management-new-requests-create` — create-request form (unique)
  - `management-total-queues` — queue list with level/status filter (unique)
  - `teacher-home` — daily class operations dashboard (unique, most complex in entire discovery so far by form/modal count)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- All three pages share the same global chrome: sidebar nav, "Add shortcuts" modal, "Recent Searches" modal, "See All Notifications" — these are boilerplate and should be implemented once as layout components.
- The queue list and teacher home both use GET-form filters (level/status for queues; date-range/teacher/family/student/type for home) — safe, stateless.
- Teacher home has 9 meaningful modals beyond global chrome. Dangerous ones (must never be auto-fired, must require explicit confirmation):
  - Mark As Absent (sends messages, triggers makeup logic, credits)
  - Cancel Class (same as absent; teacher/student/admin cancel attribution)
  - Edit Class (reassigns teacher, changes time, sends notifications)
  - Delete Fine (no confirmation dialog seen — highest risk; deletes a compensation record)
  - Send WA Message (sends external WhatsApp message)
  - Attend Class with "send class details" option (triggers external notification)
- Safe modals: Add Quick Queue, Add Feedback, Settings (display mode), Mark as attend (no details send variant).
- Tabs in teacher home: makeup options within Cancel/Absent modals use tab pattern (No Make-up / Auto Make-up / Reschedule); timezone selection uses radio tabs. These must use `role="tablist"` with keyboard nav in the rebuild.

**Improvements for the new platform:**
1. **New request form:** Implement a multi-step wizard with progress indicator; add server-side + client-side validation with clear required field marking (current HTML only marks `country_id` as required); auto-detect timezone from IP; add date/time picker with timezone awareness for trial scheduling.
2. **Total queues:** Add empty-state with CTA; color-coded severity badges; inline status-change toggle per row (no page reload); column sort; search within list.
3. **Teacher home — KPI bar:** Make each KPI card clickable to filter the table in-place (current "Show Details" links are text links only); add sparkline or trend vs. previous period.
4. **Teacher home — class table:** Replace flat 10-item action list with a contextual action menu that shows only relevant actions per class status. Use a status-aware action resolver on the frontend. Add loading/skeleton state while table data fetches.
5. **Teacher home — dangerous modals:** Delete Fine must have a confirmation dialog. Cancel/Absent modals should summarize impact (e.g., "This will notify teacher + parent via WhatsApp") before the user confirms. Use a stepper within the modal for Cancel/Absent (step 1: who/why, step 2: notification, step 3: makeup/credit).
6. **RTL/mobile:** All three pages are LTR/en only. The class table has Arabic content (student name: محمد احمد, teacher name: المعلم محمد صادق صادق) embedded in an LTR table — RTL-first rebuild must handle mixed-direction cell content gracefully.
7. **Accessibility:** Teacher home has 54 buttons and 15 forms on one page — keyboard navigation and focus management between modals is critical; all modals need focus trap + Escape-to-close + `aria-labelledby`.
8. **Export:** The export form on teacher home is an unlabeled submit button — rebuild should expose this as a clearly labeled "Export CSV/Excel" button with date-range confirmation.

**Needs owner/backend confirmation:**
- The `Delete Fine` form targets a hardcoded URL (`/management/teachers/1/compensations/3`) — confirm whether this is dynamic per row or a capture artifact; in the rebuild this must be a dynamic route.
- The `cancelClass_form` and `markAsabsent_form` both POST to `#` — the actual endpoint is likely set by JavaScript before submission; confirm the real API endpoint for each action.
- The `Add Quick Queue` form also POSTs to `#` — confirm API endpoint.
- The `markAsAttended_form` posts to `#` — confirm endpoint.
- Confirm whether "Reverse Action" on a class row is a single-step undo or a soft toggle; clarify what state it reverts to and whether it can be triggered accidentally.
- Confirm the export endpoint `/management/export-aa` parameters and response format for the rebuild API contract.

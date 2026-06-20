# All-Page Interpretive Digests (read-every-MD evidence)

> Concatenation of all 47 module-batch interpretive parts (Phase C workflow). Every one of the 339 page MD reports was read. Companion structured data: 02-all-pages-expanded-inventory.json.


---
# Batch 0 — admin · Assignments / Homework (Tasks)

### `management-tickets` — Tasks  (HTTP 200)

- Purpose: Admin-facing task-management dashboard showing staff workload across Total, Completed, Pending, In-Progress, and Overdue states, with a per-staff-member breakdown table.
- Key sections / flows:
  - Five KPI summary cards (Total, Completed, Pending, In-Progress, Overdue) — all showed 0 at capture time.
  - "Staff Members" table (6 columns: Name, Total, Pending, Overdue, Completed, Average) — 0 rows at capture; intended to list every staff member's task load at a glance.
  - "Add Section" button to create a new task section.
  - Pagination control present (1 page, `javascript:void(0)` href — client-rendered).
  - One interaction screenshot shows a dropdown/menu open, consistent with row-level or section-level actions.
- Key SAFE actions: View KPI counts; read Staff Members table; "View all courses" and "View All Queues" navigation links; paginate.
- Key MUTATING/dangerous actions: "Add Section" (creates a new task section); "Save" (inside Add-shortcuts modal — adds a sidebar shortcut); "See All Notifications" (submits a POST-form, could mark notifications read).
- Important modals/forms:
  - **Modal 1 — unnamed (Loading…):** Lazy-loaded content; likely a task detail or section-edit drawer. Exact fields unknown — content was still loading at capture.
  - **Modal 3 — Add shortcuts:** Fields: `shortcut_title` (Title) + `shortcut_link` (URL); Submit: Save. Global chrome — skip in rebuild scope.
  - *(Modal 2 — Recent Searches: global chrome, skip.)*
- Variant-of: unique template
- Broken/empty: All KPI counters showed 0 and the Staff Members table had 0 rows at capture time — this is likely an empty-state (no tasks seeded in the test environment), NOT a broken page. Logo image returned 404 (`/storage/uploads/logo.png`). Modal 1 content was "Loading…" — may require additional auth context to resolve.
- UX improvement for the rebuild: The empty state (0 across all KPIs, empty table) has no visual prompt or CTA to guide the admin on what to do next. Add a contextual empty-state component that explains what tasks are, shows a prominent "Create first task / section" action, and indicates which staff members have no tasks assigned — this dramatically reduces confusion when the module is first activated.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Tasks module (`/management/tickets`) is the admin's staff-task management hub. Core entities are: Task Sections (groupings), Tasks (with status: Pending / In-Progress / Completed / Overdue), and Staff Members (assigned workers). The page aggregates task health across the entire staff via KPI cards and a per-staff summary table.

**Distinct page templates vs variant count:**
- Unique templates: 1 (`management-tickets`)
- Variant pages: 0
- Total pages in batch: 1

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- "Add Section" button → mutating (creates data); must require explicit confirmation or at minimum an accessible modal with required fields validated before submit.
- Unnamed lazy modal (Modal 1) → content unknown; potentially mutating if it opens a task-edit form; must be treated as dangerous until confirmed.
- "See All Notifications" submit button → potentially mutating (marks-as-read side-effect).
- 5 filter `div` controls detected (unlabeled) — almost certainly client-side status/date filters over the staff table. In the rebuild these should be proper `<select>` or chip-filter components with accessible labels.
- Pagination is client-side (`javascript:void(0)`) — rebuild should use server-side pagination via query params for deep-linkability.

**Improvements for the new platform:**

1. **Empty / loading / error states:** Add meaningful empty-state UI for the KPI grid and staff table; show a skeleton loader while data fetches; show an error banner if the API fails.
2. **Status colour system (RTL-first):** Map Pending → amber, In-Progress → blue, Completed → green, Overdue → red consistently. Current design uses only a purple brand palette with no semantic status colours.
3. **Staff table enhancements:** Add sortable columns (click-to-sort on Total, Overdue, etc.); add a search/filter input above the table to narrow by staff name; add an inline "Assign Task" row-action instead of a top-level "Add Section" that lacks context.
4. **Dangerous action safety:** "Add Section" should open a form modal with required-field validation; "Save" shortcuts should be guarded against empty title/link.
5. **Accessibility:** All filter `div`s must become labelled controls; modals need focus-trap + Escape-to-close + `role="dialog"` + `aria-labelledby`; KPI cards need `aria-label`.
6. **Mobile / RTL:** Current layout is LTR only. The 6-column staff table will break on mobile — consider a card-per-staff-member layout for narrow viewports. RTL mirroring (sidebar direction, icon flips) should be built into the design system from day one.
7. **Navigation:** The sidebar shortcut system (Add shortcuts modal) is a workaround for poor IA; the rebuild should provide a proper pinnable-favourites or quick-access rail instead.
8. **Logo 404:** The logo asset path (`/storage/uploads/logo.png`) is broken — the rebuild's asset pipeline must use a reliable CDN or static asset path.

**Anything that needs owner/backend confirmation:**
- What lazy content does Modal 1 load? Is it a task detail view, a section-edit form, or a staff-task drill-down? This determines whether it is read-only (safe) or mutating (needs confirm dialog).
- Is the 0-data state a test-environment artifact, or can this page legitimately be empty in production (no tasks ever created)? Affects empty-state copy.
- What does "Average" in the staff table represent — average completion time, average score, or percentage? Needs definition for accurate rebuild labelling.
- The 5 unnamed filter `div`s — are these status filters, date-range pickers, or department selectors? Backend must confirm API filter params.

---
# Batch 1 — Admin · Certificates

---

### `management-certificate-requests` — Certificate Requests

- **Purpose:** Lists all student certificate requests submitted to admin, allowing the admin to review, preview, and approve or cancel each request.
- **Key sections / flows:** Single H5 "Certificate Requests" heading; one data table with columns: #, Student Name, Course Name, Teacher Name, Description, Date, Action. Table currently shows "No data found" (empty state). Three select filters (two unlabeled + Month). Pagination present (1 page). A navigation link "Certificate Templates" points to `management-pdf`.
- **Key SAFE actions:** View table rows, apply filters (select + Month), paginate, navigate to Certificate Templates list.
- **Key MUTATING/dangerous actions:** "Approve" (triggers approve modal — sends certificate to student, optionally via WhatsApp); "Cancel" (cancels/rejects the request); "Save" (inside the Approve modal, persists template selection and settings).
- **Important modals/forms:**
  - *Approve modal* — fields: Student Name (display), Teacher Name (display), Description (display), Date (display), Certificate Template (select), send-to-WhatsApp toggle (Send group / Send Private Message / Don't send), link field; buttons: Preview, Cancel, Approve. This is the highest-risk modal: Approve dispatches the certificate, Cancel rejects the request, and WhatsApp send options have external side effects.
- **Variant-of:** unique template
- **Broken/empty:** Table shows "No data found" — may be genuinely empty data or a data-load failure; logo image returns 404 (`/storage/uploads/logo.png`).
- **UX improvement for the rebuild:** The Approve modal mixes display fields, template selection, and external-send options in one step with no confirmation gate — split into a two-step flow: (1) select template and preview, (2) confirm send channel and approve, with an explicit destructive-action confirmation dialog before final submission.

---

### `management-pdf` — Certificate Templates

- **Purpose:** Displays the library of reusable certificate PDF templates; entry point for creating new templates and linking to the requests queue.
- **Key sections / flows:** Single H5 "Certificate Templates" heading; one data table with columns: #, Certificate Name, Background, Certificates (count/link), Action. Table shows "No data found" (empty state). "Add" button (link) navigates to `management-pdf-create`. Pagination present (1 page). No filter controls on this page.
- **Key SAFE actions:** View template list, paginate, navigate to Certificate Requests, navigate to Create Template (Add link).
- **Key MUTATING/dangerous actions:** "Add" link (navigates to create form — initiates creation flow); row-level Action column (not fully detailed in capture, but expected to include edit/delete per standard CRUD pattern).
- **Important modals/forms:** None specific to this page beyond global chrome modals (Recent Searches, Add shortcuts — both skipped per rules).
- **Variant-of:** unique template
- **Broken/empty:** Table shows "No data found"; logo 404 same as above.
- **UX improvement for the rebuild:** Add an inline empty-state illustration and a prominent "Create your first template" call-to-action in the table body rather than relying on the top-right Add button, which is easy to miss when the table appears empty.

---

### `management-pdf-create` — Certificate Designer

- **Purpose:** A canvas-based visual editor for creating a new certificate PDF template, allowing background image upload and placement of text elements (e.g., Student Name) with typography controls.
- **Key sections / flows:** H5 "Certificate Designer"; H6 "Student Name" (representing one draggable text element on the canvas). Two content cards: (1) designer canvas area with background upload and "Save Settings" submit; (2) typography/positioning panel for the selected text element with controls for Font (Helvetica / Arial / Times New Roman / Courier), Style (Bold B, Italic I, Underline U checkboxes), Size (range slider, default 20px), Color (color picker + hex text input), Alignment (radio: left/center/right/justify), X/Y/W position inputs in mm. Form `certForm` POSTs to `management/pdf` with `name`, `background` (file), and `json_data` (hidden, serialized canvas layout). 235 network requests captured, indicating heavy asset/canvas loading.
- **Key SAFE actions:** Upload background image preview, adjust typography controls (live preview on canvas), change text alignment, move/resize text element via X/Y/W inputs.
- **Key MUTATING/dangerous actions:** "Save Settings" (submits `certForm` — creates/saves the certificate template to the backend); no delete on this page.
- **Important modals/forms:**
  - *Certificate create form (`certForm`)* — key fields: `name` (Certificate Name, required text), `background` (file upload, optional), `json_data` (hidden, serialized JSON layout), Font select, B/I/U checkboxes, Size range, Color picker, Alignment radios, X/Y/W number inputs. Posts to `POST /management/pdf`.
- **Variant-of:** unique template
- **Broken/empty:** No table; logo 404 persists. No edit route observed — unclear whether this same designer is reused for editing existing templates (needs backend confirmation).
- **UX improvement for the rebuild:** Replace the raw range/number inputs for position and size with a proper drag-and-drop canvas (e.g., Konva.js or Fabric.js) with snap-to-grid and real-time mm readout, and add undo/redo history; the current form-only positioning with X/Y/W numbers is error-prone and not WYSIWYG.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Certificates module handles the full lifecycle of student completion certificates: admins design reusable PDF templates (with background images and positioned text elements), and then fulfill student requests by selecting a template, previewing the output, and dispatching the certificate (optionally via WhatsApp). Core entities: `CertificateTemplate` (name, background image, JSON layout), `CertificateRequest` (student, course, teacher, description, date, status).

**Distinct page templates vs variant count:**
- 3 unique page templates (no pure query-param/status variants in this batch).
- 0 variant pages.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- *Approve modal* (on certificate-requests): dangerous — triggers Approve (dispatches certificate + possible WhatsApp send) and Cancel (rejects request). No intermediate confirmation gate observed.
- *Month filter + 2 unlabeled selects* (on certificate-requests): safe server-side filters.
- Global chrome modals (Recent Searches, Add shortcuts, notifications loading modal) appear on all three pages — these are cross-cutting but not module-specific and should be extracted as shared layout components in the rebuild.

**Improvements for the new platform:**
1. **Two-step Approve flow with confirmation:** Split the current single Approve modal into: Step 1 — template selection + preview; Step 2 — channel selection (WhatsApp group / private / none) + irreversible Approve confirm with clear destructive styling.
2. **Empty/error states:** All three pages currently show bare "No data found" table rows. Replace with illustrated empty states, contextual CTAs, and distinct error states (network failure vs. truly empty).
3. **Certificate Designer — WYSIWYG canvas:** Replace raw X/Y/W number fields with a drag-and-drop canvas (Fabric.js / Konva.js), undo/redo, snap guides, and live PDF preview. The current approach requires pixel/mm mental arithmetic.
4. **RTL-first layout:** All three pages are LTR (`dir: ltr`), but the platform serves Arabic users. The rebuild must flip the sidebar, table column order, and text alignment for RTL; the designer canvas must also handle RTL text rendering (especially for Arabic student names on certificates).
5. **Filter labeling:** The two unlabeled `<select>` filters on certificate-requests have no accessible labels — the rebuild must provide visible labels and ARIA attributes.
6. **Row actions menu:** The Action column in both list pages should use a kebab/overflow menu pattern with explicit confirmation dialogs for destructive actions (delete template, cancel request), rather than bare inline buttons.
7. **Pagination and search:** Both list pages need server-side pagination with page-size control and a search/filter bar (course, teacher, date range for requests; name search for templates).
8. **Logo 404:** The platform logo at `/storage/uploads/logo.png` returns 404 on all pages — the rebuild should use a reliable asset path or CDN reference.
9. **Mobile:** The designer canvas is inherently desktop-heavy; on mobile, degrade gracefully to a read-only preview with edit redirecting to desktop.
10. **Accessibility:** Modal focus trapping, Escape-to-close, `role="dialog"`, and `aria-labelledby` are absent in the current implementation — all modals in the rebuild must comply.

**Needs owner/backend confirmation:**
- Whether `management-pdf-create` doubles as the edit route for existing templates (no edit URL was discovered; the form POSTs to `POST /management/pdf` which suggests create-only).
- The exact WhatsApp integration mechanism (whether "Send group" and "Send Private Message" are via a configured WhatsApp Business API or a manual link; this affects the approve flow design).
- The two unlabeled filter selects on certificate-requests — their intended filter dimensions (status? teacher? course?) must be confirmed with the backend team.
- Whether `json_data` in the designer form is a proprietary schema or a standard canvas serialization format — important for the rebuild's canvas library choice.

---
# Batch 2 — Admin · Classes / Live Sessions (+ Finance cross-cut)

---

### `management-class-feedback` — Classes KPI  (HTTP 200)

- **Purpose:** Leaderboard-style KPI page showing each teacher's feedback percentage and session count across a selected date range, filtered by teacher and staff name.
- **Key sections / flows:** Filter card (teacher multi-select checkbox, date-range picker, staff-name dropdown) → "List of Teachers" table (#, Teacher Name, Percentage, session count); 1 row in sample data (all zeros, indicating sparse live data at crawl time).
- **Key SAFE actions:** Apply filter (GET), reset filter, paginate, navigate to teacher detail.
- **Key MUTATING/dangerous actions:** None that are page-specific (global "Add shortcuts" POST and "See All Notifications" submit are chrome-wide).
- **Important modals/forms:** Filter form (GET /management/class-feedback): teachers[] checkbox array, date_range text, user_id select. No per-row destructive actions visible.
- **Variant-of:** Unique template (teacher-level KPI list with percentage metric).
- **Broken/empty:** Table has 1 row but values are all 0/0 — data sparsity at crawl time, not an error state. Logo image returns 404 (`/storage/uploads/logo.png`) — global issue across all pages.
- **UX improvement for the rebuild:** Replace the checkbox teacher-selector with a searchable multi-select combobox (the current panel is awkward at scale); show a visual bar/progress indicator alongside the raw percentage so the ranking is scannable at a glance.

---

### `management-class-feedback-feedback` — Class Feedback Detail  (HTTP 200)

- **Discovered from:** `/management/class-feedback/feedback?date_range=2026-06-01+to+2026-06-30&teacher_id=1` (date-range + teacher_id query params passed from the KPI list).
- **Purpose:** Drill-down view of individual class feedback entries filtered by teacher, student, staff, and date range; no table was rendered (0 tables in DOM), suggesting an empty-state result or a card/list layout not captured as `<table>`.
- **Key sections / flows:** Filter card (teacher select, student select, staff-name select, date-range) → feedback list area (no rows captured); 6 XHR calls observed suggesting dynamic content loading.
- **Key SAFE actions:** Apply filter (GET), reset, navigate back.
- **Key MUTATING/dangerous actions:** None page-specific beyond global chrome.
- **Important modals/forms:** Filter form (GET /management/class-feedback/feedback): teacher_id, student_id, user_id, date_range. Richer filter set than the parent KPI page (adds student dimension).
- **Variant-of:** Variant of `management-class-feedback` (same module, scoped to a specific teacher+date, adds student filter, shows raw entries rather than aggregated KPIs).
- **Broken/empty:** 0 tables in DOM — either genuinely empty result for the crawled date or rendered as non-table HTML; data content not confirmed.
- **UX improvement for the rebuild:** Add an explicit empty-state illustration/message when no feedback entries match the selected filters, rather than silently showing nothing; also add an export-to-CSV action for admin review.

---

### `management-group-index` — Groups List  (HTTP 200)

- **Purpose:** Management list of all teaching groups (one teacher, multiple students), with a "Create Group" entry point and a per-row options column.
- **Key sections / flows:** Breadcrumb (Dashboard > Groups) → groups table (#, Start Date, Group Name, Teacher Name, Teacher rate, Student rate, Schedule, Status, Options); 0 rows at crawl time; "Details" modal triggered from row.
- **Key SAFE actions:** View group details (modal), navigate to create.
- **Key MUTATING/dangerous actions:** "Create Group" link (navigates to create form); row Options column likely contains edit/delete (not captured in DOM buttons at top level — presumably in the Details modal or inline).
- **Important modals/forms:** Modal "Details" (content: "Details Close") — appears to be a generic loading modal for row detail; no form fields captured inside it.
- **Variant-of:** Unique template (group list with schedule and rate columns).
- **Broken/empty:** Table shows 0 rows — empty dataset at crawl time. The second table captured has 0 columns and 0 rows, suggesting a ghost/hidden table in the markup.
- **UX improvement for the rebuild:** The "Options" column should be a row-action menu (edit, view sessions, delete with confirm) rather than an unlabelled column; add inline status chip (Active/Inactive) with colour coding so group health is visible at a glance.

---

### `management-groups-create` — Create Group  (HTTP 200)

- **Purpose:** Single-page form to create a recurring group session between one teacher and multiple students, including pricing, course selection, and a per-day timetable.
- **Key sections / flows:** Group Name → Start Date → Teacher select (single) + teacher hour rate → Students multi-select + student hour rate → Course select → Total Hours → Timetable grid (Saturday–Friday checkboxes, each with time picker and duration select — 7 days × 3 fields = 21 timetable inputs). Submit POSTs to `/management/groups`.
- **Key SAFE actions:** Navigate away, open teacher/student/course dropdowns.
- **Key MUTATING/dangerous actions:** Submit button (POST /management/groups) — creates the group and schedules recurring sessions; high-impact, no confirmation modal visible.
- **Important modals/forms:** Main form (POST /management/groups, id=students_form): name, start_date, teacher (select-one), t_hour_rate, students[] (select-multiple with search textarea), s_hour_rate, course_id, suggested_total_hours, schedule[0–6][value/time/duration]. 51 fields total; duration selects are `required`.
- **Variant-of:** Unique template (group creation wizard).
- **Broken/empty:** No table; no error state captured. Duration selects marked `required` but most other fields are not — inconsistent validation.
- **UX improvement for the rebuild:** Replace the flat Saturday-to-Friday checkbox grid with a visual weekly timetable picker (drag-to-select slots or toggle chips per day) that previews the recurrence pattern; add a live cost estimate card showing projected total teacher/student cost as fields are filled.

---

### `management-salary-class-report` — Salary Class Report  (HTTP 200)

- **Purpose:** Financial cross-report linking class sessions to salary data; filterable by date range, group-by dimension (Student / Date / Parent / Student / Teachers), and a specific teacher.
- **Key sections / flows:** Filter card (date_range, filter/group-by select, teacher_id select) → Submit (GET /management/update-result) → results area (no table rendered at crawl time, 0 tables in DOM).
- **Key SAFE actions:** Apply filter (GET), reset.
- **Key MUTATING/dangerous actions:** None beyond global chrome (Submit here is a GET).
- **Important modals/forms:** Filter form (GET /management/update-result): date_range, filter (group-by: Student/Date/Parent/Teachers), teacher_id. Naming mismatch: form action is `/management/update-result` despite being a GET read operation — potentially confusing during API design.
- **Variant-of:** Unique template (salary/finance cross-report tied to sessions).
- **Broken/empty:** 0 tables in DOM — no data returned for default state; no empty-state UI visible.
- **UX improvement for the rebuild:** Expose the "Group By" control as prominent toggle tabs (Student / Teacher / Date / Parent) rather than a hidden dropdown, so admins can pivot views without hunting for the field; pre-populate the current month's date range by default so the page loads with data rather than blank.

---

### `management-schedule-sessions-response` — Schedule Sessions Response  (HTTP 200)

- **Discovered from:** `/management/schedule-trials-response` via link (a sibling page for trial scheduling).
- **Purpose:** Shows pending schedule requests from students/families for regular sessions — admin reviews them, sees which teachers have been contacted and which have accepted.
- **Key sections / flows:** Main table (Student, Parent, Course Name, Schedule, Status, Requests, [action]) with "No schedule requests" empty state; two auxiliary modals — "Teachers You Sent" (table: #, Teacher Name) and "Accepted Teachers" (table: #, Teacher Name, Message from teacher, Options).
- **Key SAFE actions:** View "Teachers You Sent" modal, view "Accepted Teachers" modal, navigate.
- **Key MUTATING/dangerous actions:** The "Options" column in Accepted Teachers modal likely contains an accept/assign action (not fully captured); sending to teachers is presumably triggered elsewhere (the page is a response viewer, not initiator).
- **Important modals/forms:** "Teachers You Sent" (columns: #, Teacher Name) — read-only. "Accepted Teachers" (columns: #, Teacher Name, Message, Options) — Options column implied to hold assignment action; no form fields captured inside. No filter form on this page.
- **Variant-of:** Unique template (session scheduling request queue with teacher response tracking).
- **Broken/empty:** Main table row 1 = "No schedule requests" — genuine empty state; explicitly shows the text but no styled empty-state component.
- **UX improvement for the rebuild:** Add real-time status indicators per request row (Pending / Sent to X teachers / Teacher Accepted / Assigned) with colour-coded chips, so an admin can triage at a glance; the "Options" in the Accepted Teachers modal should be a prominent "Assign This Teacher" CTA with a confirmation step.

---

### `management-session-class-room-mq-3` — Session Class Room (Daily View)  (HTTP 200)

- **Discovered from:** Home page via link; URL is `/management/session-class-room/MQ==/3` (base64-encoded ID + tab/type param).
- **Purpose:** The primary operational class-management view for a specific student/context — shows today's classes with 8 KPI counters, a rich filter panel, and a session list; from each row the admin can take every session lifecycle action (attend, absent, cancel, edit, feedback, WhatsApp notify).
- **Key sections / flows:**
  1. KPI row: Total Classes (1), Sessions Pending (0), Attend (0), Waiting & Running (1 & 0), Cancelled (0), Absent (0), Trials (1), Last Today (0) — each with a "Show Details" drill-down link.
  2. Filter panel: date range, from/to time, teacher, parent, student, session type (session/trial/group) → Search (GET /management/home).
  3. Sessions table: #, Class Time, Student/Group Name, Teacher Name, Course Details (with Fine indicator), Left hours, Class Status (Waiting/Attend/etc.), Actions (Show Details link → `/management/courseClasses/{id}`).
  4. Settings modal: display mode (Today/Upcoming/Past) + Group by Time toggle.
  5. Row-level action modals: Mark as Attend, Send WhatsApp, Mark as Absent, Edit Class, Cancel Class, Add Feedback, Add Quick Queue.
- **Key SAFE actions:** Filter/search (GET), Show Details navigation, open Settings modal, change display mode.
- **Key MUTATING/dangerous actions:**
  - **Mark as Attend** (POST `#` → markAsAttended_form): remark, summary, homework, notes, file upload; option to send/not-send class details.
  - **Mark as Absent** (POST `#` → markAsabsent_form): who is absent, note, send message choice (Don't/Default/Custom), makeup option (No/Auto/Reschedule/Add-to-Credit), timezone choice, makeup date/time.
  - **Cancel Class** (POST `#` → cancelClass_form): who cancels (Teacher/Student/Admin), note, send notification, same makeup options as absent.
  - **Edit Class** (POST /management/courseClasses/edit-class): new date/time, teacher reassign, duration, accounting statement, send notification.
  - **Add Quick Queue** (POST `#` → add_queue_form): priority level, message.
  - **Send WhatsApp** (POST `#` → sendWhatsappMessage_form): message, recipients (teacher/student checkboxes).
  - **Add Feedback** (POST /management/class-feedback): note, file attachments.
  - **Export** (POST /management/export-aa): exports class data.
- **Important modals/forms:**
  - Settings (Form 4): timeType display mode, groupByTime checkbox.
  - Add Quick Queue (Form 5): level select (Urgent/Medium/Normal), text textarea, class_id hidden.
  - Mark as Attend (Form 6): markAsAttend radio (no-details / with-details), remark select (Excellent/Very Good/Good/Acceptable/Needs Improvement), summary, homework, notes, images[] file.
  - Send WhatsApp (Form 7): wa_message, send_teacher checkbox, send_student checkbox.
  - Mark as Absent (Form 8): absent_by select, note, sendMessage radio (3 options), message textarea, makupclass hidden, add_to_credit, cancelTzType radio (2), date, time.
  - Edit Class (Form 9): date, time, sendMessage checkbox, duration select (required), teacher_id (required), accounting_statement.
  - Cancel Class (Form 10): cancel_by select, note, sendMessage checkbox, makupclass hidden, add_to_credit, cancelTzType radio (2), date, time.
  - Add Feedback (Form 11): feedback_note textarea, feedback_files[] file.
  - Total: 13 forms, ~87 fields, 11 modals.
- **Variant-of:** Unique template — the most complex page in this batch; the base64 URL param `MQ==` (= "1") identifies the entity scope; tab param "3" selects a sub-context. Other `session-class-room/{id}/{tab}` URLs will be variants of this template.
- **Broken/empty:** No broken HTTP; 1 session row visible (trial, status=Waiting). Logo 404 global.
- **UX improvement for the rebuild:** The 7 action modals per row are all triggered from a single "Show Details" link — the rebuild should expose a compact row-action menu (3-dot or inline icon row) with labelled actions so admins do not have to open a detail page to find the right modal; the absent/cancel forms share identical makeup-option logic and should be unified into a single reusable "Session Outcome" component with conditional fields.

---

### `management-sessions-analysis` — Sessions Analysis  (HTTP 200)

- **Purpose:** Aggregate statistics dashboard for session outcomes across a configurable date/time/teacher/student/type filter; shows breakdown KPI cards for Regular Classes and Trial Classes by status (cancel-by, attend, absent, pending, rescheduled, makeup) plus live helpers counter.
- **Key sections / flows:**
  1. Filter panel: date_range (required), from_time, to_time, teacher_id, student_id, type (session/trial/group) → Search (GET /management/sessions_analysis).
  2. KPI card — Regular Classes: Total, Student Cancel, Teacher Cancel, Admin Cancel, Attended, Student Absent, Teacher Absent, Pending, Rescheduled To, Make-up, Returned Today (11 sub-counters, all showing 0 at crawl time).
  3. KPI card — Trial Classes: Trials (1), Student Cancel, Teacher Cancel, Admin Cancel, Attended, Pending, Student Absent, Teacher Absent (8 sub-counters).
  4. Helpers card: Last Session (0), Current Hour (0), Waiting (1), Running (0).
  - No data tables; results are pure KPI cards with numeric values.
- **Key SAFE actions:** Filter/search (GET), read KPI values.
- **Key MUTATING/dangerous actions:** None (read-only analytics page).
- **Important modals/forms:** Filter form only (GET /management/sessions_analysis). No row actions, no creation modals.
- **Variant-of:** Unique template (session-outcome analytics dashboard with dual Regular/Trial breakdown).
- **Broken/empty:** All Regular Class counters are 0 — likely genuine empty range rather than error; Trial card shows 1 trial session. No 404/500.
- **UX improvement for the rebuild:** Convert the flat KPI grid into a visual chart (stacked bar or donut by status category) with the numeric breakdown as a tooltip/legend; add a date-preset selector (Today / This Week / This Month) so common analysis ranges don't require manual date entry every time.

---

## Module synthesis (this batch)

### What this module does and its core entities

All 8 pages belong to the **Classes / Live Sessions** module (admin perspective). Core entities: **Group** (one teacher, many students, recurring schedule), **Session/Class** (an instance of a scheduled slot), **Teacher**, **Student**, **Feedback** (per-class quality notes + files), **Schedule Request** (family-initiated trial/session match-making), **Salary-Class Report** (finance cross-reference). Secondary modules touched: Finance/Salary (page 5), Timetable/Schedule (page 6), Reports/Analytics (pages 5 and 8).

### Distinct page templates vs variant count

- **6 unique templates:** class-feedback (KPI list), group-index (list), groups-create (creation form), salary-class-report (finance report), schedule-sessions-response (request queue), session-class-room (daily ops view), sessions-analysis (analytics dashboard).
- **1 drill-down variant:** class-feedback-feedback (query-param variant of class-feedback, adds student filter, shows individual entries).
- **Variant pages:** 1 (session-class-room will have multiple `{id}/{tab}` variants — only one slug crawled here).
- **Total pages read:** 8.

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

**Dangerous modals (require confirmation dialogs in rebuild):**
- Mark as Absent (sends messages, creates makeup/credit actions)
- Cancel Class (sends notifications, makeup options, affects billing)
- Edit Class (changes time/teacher, sends notification, accounting_statement field)
- Mark as Attend (posts class details to parent/student)
- Send WhatsApp (sends external messages)

**Safe modals:**
- Settings / display mode toggle, Show Details (read), Teachers Sent/Accepted (read), Add Feedback (low risk), Add Quick Queue.

**Shared filter pattern** (date_range + teacher_id + student_id + type) appears on sessions-analysis, session-class-room, and salary-class-report — can be implemented as a single reusable FilterPanel component. The class-feedback pages have a distinct teacher-checkbox multi-select variant.

**Tab pattern** on session-class-room: makeup-option tabs (No Make-up / Auto / Reschedule / Credit) appear inside both Absent and Cancel modals — duplicated logic that should be a shared `MakeupOptions` sub-component.

### Improvements for the new platform

1. **Session lifecycle modal unification:** Absent and Cancel share ~80% of their form logic (makeup option, timezone, notification). Rebuild as a single `SessionOutcomeModal` with a leading "reason type" discriminator.
2. **Row-action menu:** Replace the single "Show Details" link on the session table with a labelled icon-menu (Attend | Absent | Cancel | Edit | Feedback | WhatsApp | Queue) — reduces the click-depth from 3 to 2.
3. **Empty / loading states:** salary-class-report, group-index, and class-feedback-feedback all render blank on empty data with no illustration or guidance. Every list/report page needs a styled empty state and skeleton loaders.
4. **Sessions analysis charts:** Convert the flat H5/H6 counter grid to visual chart(s); add date presets (Today/Week/Month) to reduce filter friction.
5. **Groups create — timetable UX:** Replace 7 × 3 flat input rows with a weekly grid component; add live cost preview.
6. **Schedule sessions response — status workflow:** Add explicit status chips and a single "Assign Teacher" CTA with confirmation; the current design hides the key action inside a read-only modal.
7. **Salary report — group-by controls:** Promote the group-by select to tab-bar; pre-fill default date range.
8. **RTL readiness:** All pages are LTR (`lang: en`). Since the platform serves Arabic-speaking students/teachers (Arabic names in data), the rebuild must support RTL layout switching without a separate code path.
9. **Logo 404:** `/storage/uploads/logo.png` returns 404 on every page — backend must fix upload path or default asset before go-live.
10. **Accessibility:** 11 modals on the session-class-room page need focus-trap, Escape-to-close, and `role=dialog` + `aria-labelledby`; the current markup has none of this.
11. **Mobile / teacher view:** The session-class-room page has 64 buttons and 13 forms — it must be redesigned as a card-based mobile-first layout for teachers marking attendance on phones.
12. **Dangerous-action safeguards:** Cancel Class and Mark as Absent must show a confirmation step (with a summary of consequences — makeup created, credit added, message sent) before the POST fires. The current UI fires immediately on "Save changes".

### Anything that needs owner/backend confirmation

- The salary-class-report form action is `GET /management/update-result` — the name implies mutation; confirm it is truly read-only or rename the endpoint.
- The session-class-room URL encodes entity ID as base64 (`MQ==` = 1) — confirm this is intentional and document the encoding contract for the new API.
- The "Accepted Teachers" Options column in schedule-sessions-response is not fully captured — confirm the assign action, its payload, and whether it triggers any financial transaction.
- Mark as Absent has a hidden `makupclass` field and a `cancelTzType` (Student / Teacher timezone) radio — confirm how timezone affects the rescheduled makeup slot calculation, as this is business-logic-sensitive.
- The session-class-room export endpoint (`POST /management/export-aa`) needs a defined response format (CSV/Excel) for the new frontend to handle the download correctly.

---
# Batch 3 — Admin · Content / Materials / Library

---

### `management-library` — Library (Book List)

- **Purpose:** Central repository for educational media files (books, videos, images, audio, links) organized by category, with inline category management.
- **Key sections / flows:** Filter bar (media type dropdown); main table — columns: #, Book Name, Category, Published at, Views, Downloads, Status, View, Actions (1 row shown: "No Material Added" empty state); side panel showing Categories table — columns: Category name, Total of material, Action (1 example row: "اللغه العربيه / 0"). Two interaction flows: open Categories modal to manage category list; open Add Material modal to upload a new file.
- **Key SAFE actions:** View all courses (nav link), View All Queues (nav link), filter by media type (GET form), view material detail modal (read-only).
- **Key MUTATING/dangerous actions:** Add Material (file upload + category assignment — POST to `/management/library`); Edit category name (POST to `/management/library` with `cat_id`); Save changes on category edit; Save changes on material add.
- **Important modals/forms:**
  - *Category Details modal* — lists all categories in a table, inline edit row via "Edit" button; fields: `name` (text), `type_id` (hidden), `cat_id` (hidden); submit: "Save changes". Also has "Add new category" sub-action within the modal.
  - *Add Material modal* — fields: `name` (material name text), `type` (select: Video / Images / Audio / Links), `category_id` (select from existing categories), `file` (file upload), `thumbnail` (file upload); submit: "Save changes".
  - *Material detail modal* (read-only) — shows title, description text ("This material is provided solely for educational purposes and enrichment.").
- **Variant-of:** Unique template — combines a filterable file list with an inline category management panel and multi-type file upload.
- **Broken/empty:** Main table shows "No Material Added" — empty state present but no styled empty-state component; logo image returns 404 (`/storage/uploads/logo.png`).
- **UX improvement for the rebuild:** Split category management into a dedicated sub-page or drawer rather than embedding it in a modal on the library page; add per-type icon indicators and a media preview thumbnail column; add a confirmation step before saving edits to categories that already have materials attached.

---

### `management-materials` — Materials / Courses List

- **Purpose:** Admin list of course subjects/tracks (confusingly labeled "Courses List" despite living under `/materials`) — functions as a reference taxonomy that can be attached to library materials.
- **Key sections / flows:** Breadcrumb: Dashboard > Courses List; single table — columns: #, Name, name_ar, Settings (with Edit and Delete row actions); one example row: "arabic / للغه عربيه". "Add Course" button in header navigates to create page. Two dropdown interactions captured (likely row-action menus for Edit/Delete).
- **Key SAFE actions:** View list, follow breadcrumb to Dashboard.
- **Key MUTATING/dangerous actions:** Delete (inline row action — POST with `_method` override to `/management/materials/1`; no visible confirm dialog captured); Edit (navigates to edit page or triggers inline action).
- **Important modals/forms:** No meaningful content modals. Delete action uses hidden-method form (Form 2 and Form 3 both POST to `/management/materials/1` with `_method` hidden field — strongly suggests DELETE/PUT method spoofing with no confirmation guard shown in captures).
- **Variant-of:** Unique template (course/subject taxonomy list, distinct from library file list).
- **Broken/empty:** No empty state observed for the table. Logo 404 persists.
- **UX improvement for the rebuild:** Add an explicit confirmation dialog before delete (currently no visible guard); rename this section in navigation to avoid confusion between "Materials" (taxonomy) and "Library" (media files) — they serve different purposes but share the same module label.

---

### `management-materials-1-edit` — Edit Course (Subject/Track)

- **Purpose:** Single-record edit form for a course subject entry (bilingual: English name + Arabic name).
- **Key sections / flows:** Breadcrumb: Dashboard > messages.Materials > Edit Courses (note: `messages.Materials` is an untranslated i18n key — a bug); one card section "Main information" containing the edit form.
- **Key SAFE actions:** Navigate via breadcrumb/sidebar.
- **Key MUTATING/dangerous actions:** Submit (POST to `/management/materials/1` with `_method` hidden, updating the record); fields: `name` (Course Name), `name_ar` (Course Name in Arabic).
- **Important modals/forms:** *Main information card form* — fields: `name` (text, placeholder "Course Name"), `name_ar` (text, placeholder "Course Name in Arabic"); submit button: "Submit". No cancel/back button captured inside the form card itself.
- **Variant-of:** Unique template (dedicated full-page edit form for a materials taxonomy record).
- **Broken/empty:** Breadcrumb contains literal untranslated i18n key `messages.Materials` — translation mapping missing for this label. Logo 404 persists.
- **UX improvement for the rebuild:** Fix the broken i18n key in the breadcrumb; add a "Cancel" / "Back to list" link inside the form card so users can abandon edits without relying on the browser back button; require both name and name_ar fields (currently not marked required).

---

### `management-materials-create` — Create Course (Subject/Track)

- **Purpose:** New-record creation form for a course subject entry (bilingual), identical in structure to the edit page but POSTing to the collection endpoint.
- **Key sections / flows:** Breadcrumb: Dashboard > messages.Materials > Create Courses (same i18n key bug as edit); one card "Main information" with the creation form; no table.
- **Key SAFE actions:** Navigate via breadcrumb/sidebar.
- **Key MUTATING/dangerous actions:** Submit (POST to `/management/materials`); fields: `name` (Course Name), `name_ar` (Course Name in Arabic).
- **Important modals/forms:** *Main information card form* — fields: `name` (text), `name_ar` (text); submit button: "Submit". Structurally identical to edit form minus the `_method` hidden field.
- **Variant-of:** `management-materials-1-edit` — same layout, same two fields, same submit label; differs only in HTTP target (collection vs. resource) and absence of `_method` spoofing.
- **Broken/empty:** Same untranslated i18n key `messages.Materials` in breadcrumb. Logo 404. No field validation UI observed.
- **UX improvement for the rebuild:** Merge Create and Edit into a single reusable form component; add inline validation with RTL-aware error messages since `name_ar` is an Arabic field; add required markers on both fields.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Content / Materials / Library module manages two distinct but related domains that the current platform conflates under a single sidebar section:
1. **Course taxonomy** (`/materials`) — a bilingual (EN/AR) list of subject/track labels used to classify content. CRUD via list + create + edit pages.
2. **Media library** (`/library`) — the actual educational files (videos, images, audio, links, books/PDFs) stored per category, with views, downloads, and status tracking.

Core entities: `Material` (course subject record with `name` + `name_ar`), `LibraryItem` (media file with type, category, thumbnail, view/download counters, status), `LibraryCategory` (category for grouping library items, with item count).

**Distinct page templates vs variant count:**
- **3 unique templates:** Library (management-library), Materials List (management-materials), Materials Create/Edit form (management-materials-create / management-materials-1-edit are structural variants of one template).
- **1 variant pair:** `management-materials-create` and `management-materials-1-edit` share the same layout, same two fields, same submit label — differ only in the form target URL and presence of `_method` override.
- Total: 3 unique templates, 1 variant page.

**Cross-cutting interactions and which are dangerous:**
- Category edit inline in the Library modal (dangerous — saves without confirmation).
- Material add via modal with file upload (dangerous — irreversible server-side file storage).
- Course record Delete on the Materials list (dangerous — no confirmation dialog visible; raw form submission with `_method` DELETE).
- Course record Submit on create/edit (mutating but recoverable).
- All pages share the same global chrome: search modal, shortcuts modal, notifications — none dangerous in isolation.

**Improvements for the new platform:**

1. **Naming/navigation clarity:** Rename sidebar entries to clearly distinguish "Course Subjects" (taxonomy) from "Media Library" (files). The current "Materials" label is ambiguous and bleeds into i18n key leakage (`messages.Materials`).
2. **i18n fix:** Replace all raw `messages.*` i18n key fallbacks in breadcrumbs with proper translated labels; ensure Arabic names (`name_ar`) display RTL inline in the same list row.
3. **Delete guard:** Add a confirmation dialog (with record name displayed) before any delete action on course subjects — the current implementation fires immediately via a hidden-method form.
4. **Library empty state:** Add a styled empty-state component for the Library table ("No materials yet — upload your first file") with a direct CTA to Add Material.
5. **Category management separation:** Move category management out of the Library page modal into a dedicated route (`/library/categories`) or a persistent sidebar panel, reducing modal depth and improving discoverability.
6. **File upload UX:** The Add Material modal uses a plain `<input type="file">` for both file and thumbnail — replace with a Dropzone component showing preview, file size, and accepted formats, with progress indicator.
7. **Status column:** Library table has a Status column but no values are visible in the current empty state — clarify status values (draft/published/archived) and add color-coded badges.
8. **RTL-first forms:** The `name_ar` field should use `dir="rtl"` and an Arabic keyboard hint; the rebuild should apply per-field directionality automatically based on field name conventions.
9. **Mobile layout:** Both the library table (9 columns) and the materials table (4 columns) overflow on mobile — rebuild should use card or accordion layout on small screens.
10. **Accessibility:** No ARIA labels on form fields, no focus trap in modals — all modals need `role="dialog"`, `aria-labelledby`, and Escape-to-close.
11. **Logo asset:** `/storage/uploads/logo.png` returns 404 across all pages — backend file or config fix needed before go-live.

**Needs owner/backend confirmation:**
- What are the valid `status` values for library items (draft, published, archived, other)?
- Are "Materials" (course subjects) used only for library categorization or also for other features (e.g., sessions, courses)?
- Is there a soft-delete or hard-delete for course subjects? Any cascade impact on library items if a subject is deleted?
- The `/management/materials` endpoint appears to manage a course subject taxonomy but is titled "Courses List" — confirm this is not the same as `/management/courses` (which also exists in the sidebar).
- File storage path for uploads — confirm S3 or local; important for thumbnail preview URLs in the new frontend.

---
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

---
# Batch 5 — Admin · Courses / Payments / Invoices

All three pages in this batch are query-parameter variants of the same "Courses no invoice" list view, differing only in the pre-selected `status[0]` value (3 = Suspended, 4 = Indebted, 5 = Inactive). The underlying template, DOM structure, forms, modals, and KPI layout are byte-for-byte identical across all three pages.

---

### `management-courses-type-no-invoices-status-0-3` — Courses No Invoice · Status: Suspended (status=3)

- **Purpose:** Filtered view of courses that have no associated invoice, pre-filtered to the "Suspended" status bucket, allowing admins to identify and remediate suspended courses missing payment linkage.
- **Key sections / flows:** Six KPI summary cards (Active 0%, Active & unpaid 100%, Completed 0%, Suspended 0%, Indebted 0%, Inactive 0%) above a "List of Courses" data table (9 columns: #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions). Filter sidebar with course-type radio group (7 options), Teacher select, date range picker, Has Invoice select, and multi-checkbox Status filter. Export Courses link. Table renders "No data found" (empty state).
- **Key SAFE actions:** Filter (GET), Reset, Export Courses (navigation link), View all courses, View All Queues, Select All / Clear All checkboxes, Student Timetable modal (view only).
- **Key MUTATING/dangerous actions:** Assign course to invoice (POST to `/management/management/members/invoice`), Change Course Status (POST to `/management/courses/99/update_status` — options: Active & Unpaid, Active & Paid, Completed, Stop), Add Lesson (POST to `/management/courseClasses/add-classes`).
- **Important modals/forms:**
  - "All Invoice For This Parent" — assigns a course to an existing invoice; fields: `invoice` (select). Dangerous: fires a POST that links billing records.
  - "Change Course Status" — select new status (Active & Unpaid / Active & Paid / Completed / Stop). Dangerous: irreversible status transitions without confirmation step.
  - "Add Lesson (Student Timezone)" — fields: date (YYYY-MM-DD), time (HH:MM), duration (select, 10–180 min options), credit (select), teacher (select), accounting_statement (select). Dangerous: creates a new class session record.
  - "Student Timetable" — read-only view (Student, Teacher, Duration, Week Days, Time). Safe.
- **Variant-of:** `management-courses-type-no-invoices` (base "Courses no invoice" list template); this page is a status-pre-filter variant (`status[0]=3`).
- **Broken/empty:** Table shows "No data found" — no courses match this combination of `type=no_invoices` + `status[]=3` at capture time. Not a broken page; genuine empty state. Logo image returns HTTP 404 (`/storage/uploads/logo.png`) — asset missing across all pages.
- **UX improvement for the rebuild:** The "Change Course Status" modal has no confirmation/summary step before committing an irreversible status change. The rebuild must add a two-step confirm dialog (show current status → new status → confirm button) with clear labeling of which transitions are one-way (e.g., Completed, Stop).

---

### `management-courses-type-no-invoices-status-0-4` — Courses No Invoice · Status: Indebted (status=4)

- **Purpose:** Same "Courses no invoice" list pre-filtered to the "Indebted" status bucket — courses that have no invoice and whose payment state is marked Indebted.
- **Key sections / flows:** Identical KPI row (Active 0%, Active & unpaid 100%, Completed 0%, Suspended 0%, Indebted 0%, Inactive 0%) and 9-column courses table. Full filter panel unchanged. Table is empty ("No data found").
- **Key SAFE actions:** Same as status-0-3: Filter, Reset, Export Courses, View all courses, timetable modal.
- **Key MUTATING/dangerous actions:** Same three POST actions: assign invoice, change status, add lesson.
- **Important modals/forms:** Identical to status-0-3 variant — see above.
- **Variant-of:** `management-courses-type-no-invoices` (status-pre-filter variant, `status[0]=4`).
- **Broken/empty:** Table shows "No data found". Logo 404 persists. Not a functional error.
- **UX improvement for the rebuild:** The filter panel currently has 13 controls but no visible active-filter indicator — once filters are applied and the page reloads, admins have no at-a-glance summary of what is active. Add a "filter chip" strip below the filter bar showing each active filter as a removable pill (e.g., "Status: Indebted x").

---

### `management-courses-type-no-invoices-status-0-5` — Courses No Invoice · Status: Inactive (status=5)

- **Purpose:** Same "Courses no invoice" list pre-filtered to the "Inactive" status bucket — courses with no invoice and Inactive payment/enrollment state.
- **Key sections / flows:** Identical KPI row and 9-column table. Full filter sidebar unchanged. Table empty ("No data found"). Captured at 2026-06-20T19:02:50 — earliest of the three captures, confirming all three are independent crawl snapshots.
- **Key SAFE actions:** Same as the other two variants.
- **Key MUTATING/dangerous actions:** Same three POST actions.
- **Important modals/forms:** Identical to the other two variants.
- **Variant-of:** `management-courses-type-no-invoices` (status-pre-filter variant, `status[0]=5`).
- **Broken/empty:** Table shows "No data found". Logo 404 persists.
- **UX improvement for the rebuild:** The "Add Lesson" modal label reads "Add Lesson Student Timezone" but the `accounting_statement` field is confusingly labeled "Change Course Status" — same label as the status-change modal. The rebuild should use a distinct, accurate label such as "Accounting Rule" or "Session Billing Mode" to eliminate UI ambiguity.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Courses / Payments-Invoices module is the central operations hub for managing tutor-student course engagements at the billing level. Core entities: Course (has student, teacher, date, total hours, status, price), Invoice (parent's billing record, linked many-to-one from courses), Lesson/Class session (child of a course, has date/time/duration/credit/teacher/accounting rule). The "no invoice" sub-view is a financial reconciliation tool — surfacing courses that exist in the system but have not yet been attached to a parent billing invoice, scoped further by course status.

**Distinct page templates vs variant count:**
- Unique template: **1** (`management-courses-type-no-invoices` — the "Courses no invoice" filtered list)
- Variant pages: **3** (status=3/Suspended, status=4/Indebted, status=5/Inactive — all identical in structure, differing only in the pre-checked status checkbox)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**

| Interaction | Dangerous? | Notes |
|---|---|---|
| Filter form (GET) | No | Safe; changes URL params only |
| Export Courses | No | Navigation link, read-only |
| Student Timetable modal | No | Read-only view |
| Assign Invoice modal | YES | POST to `/members/invoice`; links a course to a billing invoice — must require confirmation |
| Change Course Status modal | YES | POST to `/courses/{id}/update_status`; status transitions include irreversible states (Stop, Completed) — no confirmation step visible |
| Add Lesson modal | YES | POST to `/courseClasses/add-classes`; creates a session record with billing implications |

**Improvements for the new platform:**

1. **Active filter indicator:** Add a filter-chip strip (removable pills) below the filter panel so admins always see which status/type/teacher/date filters are active without re-opening the panel.
2. **Confirmation dialogs on status changes:** The "Change Course Status" modal must have a two-step confirm (preview → confirm) with explicit warnings for irreversible states (Completed, Stop).
3. **Invoice assignment guard:** "Assign course to invoice" should display the invoice name, amount, and current courses already on it before the admin confirms, preventing accidental double-billing.
4. **Empty state improvement:** "No data found" is a bare string. The rebuild should render an illustrated empty state with context: "No courses without invoices in this status. Try changing the status filter or checking All Courses." with a direct action link.
5. **Add Lesson field labeling:** Rename the `accounting_statement` select from "Change Course Status" to an accurate label (e.g., "Session Billing Mode") to eliminate confusion with the separate status-change modal.
6. **Status color system:** The 8 course statuses (Stopped, Inactive, Active, Active & unpaid, Suspended, Indebted, Completed, Free) need a consistent, accessible color-coded badge system — consider: green=Active, amber=Active & unpaid/Indebted, red=Suspended/Stopped, gray=Inactive/Completed, teal=Free.
7. **RTL readiness:** All three pages are LTR-only (`dir=ltr`, `lang=en`). The admin UI needs RTL (Arabic) support. Tables, filter panels, modal layouts, and badge positions must all be RTL-mirrored.
8. **Logo 404:** Fix the missing logo asset (`/storage/uploads/logo.png`) — visible across all pages.
9. **Mobile:** The 13-control filter panel and 9-column table will not work on mobile as-is. Plan a collapsible filter drawer and a card-based or horizontally scrollable table for small screens.
10. **Bulk action clarity:** The "1 Selected / Select All / Clear All" controls are present but the resulting bulk actions are not visible in the captured state. The rebuild must make bulk actions explicit with a visible action bar (e.g., "Assign invoice to X selected courses").

**Anything that needs owner/backend confirmation:**
- What are the exact semantics of status codes 3, 4, 5? The captured page titles suggest Suspended=3, Indebted=4, Inactive=5 — confirm with the backend enum before building the status badge system.
- The `assigninvoiceForm` posts to `/management/management/members/invoice` — the double `/management/management/` path segment looks like a routing bug. Needs backend verification.
- The `statusForm` hardcodes course ID `99` in its action URL (`/management/courses/99/update_status`) — this is presumably a JS-populated placeholder, but should be confirmed so the rebuild can wire the correct dynamic ID.
- Which status transitions are truly irreversible (one-way)? This drives the confirmation dialog design.

---
# Batch 06 — Interpretive Digest

_Admin role. 18 pages read. Base dir: `output/roles/admin/pages/`._

---

## Per-Page Blocks

---

### 1. management-banks

**Route:** `GET /management/banks`
**Module:** Financial / Banks

**Purpose:** Lists all bank accounts used for financial tracking. Entry point from the sidebar under "List of Banks".

**Key sections/flows:**
- Single data table: columns `#`, `Bank Name`, `Settings`
- "Add Bank" CTA button navigates to the create form

**Safe actions:** Navigate to Add Bank

**Mutating/dangerous actions:** None visible from the list (settings column presumably holds edit/delete, but no rows present to confirm)

**Modals/forms:** None on this page

**Broken/empty:** YES — table contains zero rows, single "No data found" empty state. No records exist in the test environment.

**UX improvement:** Empty state should include a prompt/button to create the first bank rather than just "No data found".

---

### 2. management-banks-create

**Route:** `GET /management/banks/create` → `POST /management/banks`
**Module:** Financial / Banks

**Purpose:** Single-field form to create a new bank record.

**Key sections/flows:**
- Breadcrumb: Dashboard > Banks > Create Bank
- H4 heading: "Main information"
- Single field: `name` (text, required, placeholder "Bank Name")
- Submit POSTs to `/management/banks`

**Safe actions:** Navigate back via breadcrumb

**Mutating/dangerous actions:** Form submission creates a bank record

**Modals/forms:**
- Form: `name` (text, required)

**Variant-of:** None — standalone create form

**UX improvement:** Single-field form is functional but offers no inline validation feedback or cancel/back button within the form itself.

---

### 3–8. management-courseclasses-1 through management-courseclasses-6

**Route:** `GET /management/courseClasses/{id}` (IDs 1–6)
**Module:** Course Classes / Session Management

**Purpose:** Full administrative detail view for a single class session. Provides complete lifecycle controls: attendance, absence, cancellation, rescheduling, queuing, WhatsApp messaging, feedback, and fine management.

**Key sections/flows (based on courseclasses-1 as canonical; 2–6 confirmed identical template):**
- Header: Class ID badge, Status badge, Course name, Type (Trial/Regular), "Show Course" link to `/management/courses/{id}`
- Class metadata: Teacher, Student, Scheduled date/time, Duration, Remaining hours
- Fine indicator: inline "(3.00 Fine)" badge when a compensation record exists; "Delete Fine" form inline (POST to `/management/teachers/{teacher_id}/compensations/{compensation_id}` with `_method: DELETE`)
- Timeline: Ordered list of status change events (Pending → Waiting → Running → Attend, etc.)
- 10 modals accessible from per-row action dropdown:
  1. **Direct Links** (read-only table): Student room link / Teacher room link / Admin room link
  2. **Total Queues** (read-only table): columns `#`, Added by, Level, Text, Status, Created at
  3. **Add Quick Queue** (mutating): `level` select (Urgent / Medium / Normal) + `text` textarea; POSTs to action endpoint
  4. **Mark as Attend** (mutating): radio (`markAsAttend`: no-details / with-details); if with-details: `remark` select (Excellent / Very Good / Good / Acceptable / Needs Improvement), `summary` textarea, `homework` textarea, `notes` text, `images[]` file upload
  5. **Send WhatsApp Message** (mutating): `wa_message` textarea, `send_teacher` checkbox, `send_student` checkbox
  6. **Mark As Absent** (mutating): `absent_by` select (Student / Teacher); `note` textarea; `sendMessage` radio (Don't send / Default / Custom); `message` textarea (custom); makeup tabs: No Make-up / Auto Make-up class / Reschedule (with `cancelTzType` radio: Student Timezone / Teacher Timezone + date + time) / Add to Credit
  7. **Edit Class** (mutating): `date` text, `time` text, `duration` select (10–180 mins), `teacher_id` select, `accounting_statement` select, `sendMessage` checkbox; POSTs to `/management/courseClasses/edit-class`
  8. **Cancel Class** (mutating): `cancel_by` select (Teacher Cancel / Student Cancel / Admin Cancel); `note` textarea; `sendMessage` checkbox; makeup tabs identical to Mark As Absent
  9. **Add Feedback** (mutating): `feedback_note` textarea, `feedback_files[]` file; POSTs to `/management/class-feedback`
  10. **Direct session room links** modal (same as item 1, confirmed in courseclasses-2)

**Safe actions:** View Direct Links, View Total Queues, Navigate to Show Course, Navigate back

**Mutating/dangerous actions:** Add Quick Queue, Mark as Attend, Send WhatsApp, Mark As Absent, Edit Class, Cancel Class, Add Feedback, Delete Fine

**Status differences across IDs 1–6:**
- courseclasses-1: Status=Waiting, Type=Trial, has Fine (3.00), timeline shows Pending→Waiting
- courseclasses-2: Status=Admin Cancel, has "Show Course" badge, system auto-cancel note visible, no Fine
- courseclasses-3: Status=Pending, date 2026-06-22, no Fine, timeline shows only "created"
- courseclasses-4: Status=Pending, date 2026-06-24, no Fine
- courseclasses-5: Status=Pending, date 2026-06-26, no Fine
- courseclasses-6: Status=Pending, date 2026-06-29, no Fine

**Variant summary:** All 6 are the same template. courseclasses-1 and courseclasses-2 show additional data states (Fine present; Admin Cancel status). courseclasses-3 through 6 are data-light pending sessions.

**UX improvements:**
- Delete Fine inline in the class header row lacks a confirmation step — dangerous for accidental clicks
- Makeup tab interaction buried inside Absent/Cancel modals creates deep nesting; consider a dedicated rescheduling flow
- "Mark as Attend" label copy says "no class details will send" — grammatically incorrect

---

### 9. management-family-feedback-categories-create

**Route:** `GET /management/family/feedback-categories/create` → `POST /management/family/feedback-categories`
**Module:** Parents/Families + Messages/Notifications (KPIs)

**Purpose:** Create a new feedback category used to classify student/family feedback.

**Key sections/flows:**
- Breadcrumb: raw i18n key exposed — "messages.Create Feedback Categories" (bug)
- Fields: `name` (text), `status` select (Active / Deactive), `description` textarea
- Submit POSTs to `/management/family/feedback-categories`

**Safe actions:** Navigate back via breadcrumb

**Mutating/dangerous actions:** Form submission creates a feedback category record

**Modals/forms:**
- `name` text, `status` select [Active, Deactive], `description` textarea

**Broken/empty:** i18n key not resolved in breadcrumb — "messages.Create Feedback Categories" shown literally

**UX improvement:** Fix i18n key resolution in breadcrumb. Status field uses "Deactive" (nonstandard English); consider "Inactive". Description field should have character limit hint.

---

### 10. management-home

**Route:** `GET /management/home`
**Module:** Dashboard / Home

**Purpose:** Primary admin operations dashboard. Shows today's class schedule with inline action controls for each class, plus 8 KPI counters for session lifecycle states.

**Key sections/flows:**
- 8 KPI stat cards (each has "Show Details" link → `?status=<value>`):
  - Total Classes, Sessions Pending, Attend Sessions, Waiting & Running, Cancel Sessions, Sessions Absent, Trials Sessions, Last Today Sessions
  - Captured values: Total=1, Pending=0, Attend=0, Waiting=1, Running=0, Cancel=0, Absent=0, Trials=1, Last Today=0
- Filter form (GET /management/home): `date_range` (required), `from_time`, `to_time`, `teacher_id` select, `family_id` select, `student_id` select, `type` select (session / Trial / Group)
- Settings modal (gear icon): `timeType` select (Today's Classes / Upcoming Classes / Past Classes) + `groupByTime` checkbox
- Class table (8 cols): `#`, `Class Time`, `Student/Group Name`, `Teacher Name`, `Course Details`, `Left hours`, `Class Status`, `Actions`
  - Class Status column: status badge + "Show Details" link → `/management/courseClasses/{id}`
  - Actions dropdown per row: Reverse Action, Add Queue, Attend Class, Cancel Class, Absent Class, Edit Class, Running, Send Reminder, Send WA Message, Delete Fine (when fine exists)
- Export button: POST to `/management/export-aa`
- Notification panel with "See All Notifications" and badge counts
- Shortcuts system: "Add shortcuts" form (POST `/management/shortcuts`) with `shortcut_title` and `shortcut_link`
- Global search form (GET `/management/search?query=`)
- All row-level modals (Add Quick Queue, Mark as Attend, Send WhatsApp, Mark As Absent, Edit Class, Cancel Class, Add Feedback) are embedded in the page — identical to the courseclasses detail modals

**Safe actions:** Search/filter, view class details, navigate sidebar

**Mutating/dangerous actions:** Mark as Attend, Add Queue, Send WhatsApp, Mark As Absent, Cancel Class, Edit Class, Delete Fine, Export, Add Shortcuts

**Modals/forms (11 total):**
1. Loading/notifications modal
2. Settings (timeType + groupByTime)
3. Add Quick Queue
4. Mark as Attend
5. Send WhatsApp Message
6. Mark As Absent
7. Edit Class
8. Cancel Class
9. Add Feedback
10. Recent Searches
11. Add Shortcuts

**UX improvement:** 11 modals on one page with no visible modal router creates maintenance and accessibility burden. Filter form requires `date_range` as mandatory but the page loads without it — consider defaulting to today. Export endpoint `/management/export-aa` URL is non-descriptive.

---

### 11. management-home-helper-1

**Route:** `GET /management/home?helper=1`
**Variant of:** management-home

**Purpose:** Same dashboard template loaded under a helper/assistant user context (helper=1 query param). The class table shows "No session today" — this user has no assigned sessions.

**Key differences from base:** Table is empty (no rows); all modals still rendered in DOM. The `helper=1` param appears to scope the data to a helper-role user view rather than the primary admin view.

**Broken/empty:** Class table shows empty state "No session today" — data-empty, not broken.

---

### 12. management-home-status

**Route:** `GET /management/home?status=` (empty value)
**Variant of:** management-home

**Purpose:** Home dashboard with status filter applied as empty string — effectively equivalent to no filter. Shows same data as the base home page.

**Key differences from base:** `status` field pre-populated as empty in the filter form hidden input. Table data identical to management-home (1 class row visible if data exists).

---

### 13. management-home-status-1

**Route:** `GET /management/home?status=1`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status=1 (Pending sessions). In the captured state, no matching sessions today — class table shows "No session today" empty state.

**Key differences from base:** `status=1` pre-set; table is empty (empty state confirmed). All 11 modals still rendered in DOM. The "Show Details" link on the Waiting & Running KPI card navigated back to `?status=` (all) during interaction capture.

---

### 14. management-home-status-2-10

**Route:** `GET /management/home?status=2,10`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status values 2 and 10 (Waiting and Running). In the captured state, shows 1 row — class ID 1 (Trial, Status=Waiting, 3.00 Fine badge visible).

**Key differences from base:** `status=2,10` pre-set; table has 1 live data row. "Delete Fine" buttons appear (2 copies — likely mobile/desktop duplicates in DOM). Interaction 3 navigates from class status badge "Waiting Show Details" to `/management/courseClasses/1`.

---

### 15. management-home-status-3-4

**Route:** `GET /management/home?status=3,4`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status values 3 and 4 (Attend and Admin Cancel, or equivalent numeric codes). In the captured state, no matching sessions today — table shows "No session today".

**Key differences from base:** `status=3,4` pre-set; table empty state. All 11 modals still present. The "Show Details" interaction navigated back to `?status=` (empty) which confirms the status cards link to different multi-value status groups.

---

### 16. management-home-status-5-6-7

**Route:** `GET /management/home?status=5,6,7`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status values 5, 6, 7 (likely Cancel Sessions grouping — Teacher Cancel / Student Cancel / Admin Cancel). No matching sessions in captured state.

**Key differences from base:** `status=5,6,7` pre-set; table empty state. Identical DOM to other empty-state home variants.

---

### 17. management-home-status-8

**Route:** `GET /management/home?status=8`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status=8 (Absent sessions). No matching sessions in captured state.

**Key differences from base:** `status=8` pre-set; table empty. All modals intact in DOM.

---

### 18. management-home-trial-0

**Route:** `GET /management/home?trial=0`
**Variant of:** management-home

**Purpose:** Home dashboard filtered by `trial=0` param (non-trial / regular sessions filter). In the captured state shows 1 row — class ID 1 (Trial type, Status=Waiting, 3.00 Fine). The filter param is `trial` not `status`; the filter form reflects `trial` as the hidden input name instead of `status`. "Delete Fine" appears (2 DOM copies). Navigating to the class detail goes to `/management/courseClasses/1`.

**Key differences from base:** Uses `trial` query param instead of `status`; filter form hidden input is `trial` not `status`. Shows 1 live data row with full action dropdown and Delete Fine. Same 11 modals.

---

## Module Synthesis

### Templates vs Variants

| Unique Template | Variant Count | Variant Pages |
|---|---|---|
| Bank List | 1 | management-banks |
| Bank Create | 1 | management-banks-create |
| Class Detail | 6 | management-courseclasses-1 through 6 |
| Feedback Category Create | 1 | management-family-feedback-categories-create |
| Home Dashboard | 10 | management-home, management-home-helper-1, management-home-status, management-home-status-1, management-home-status-2-10, management-home-status-3-4, management-home-status-5-6-7, management-home-status-8, management-home-trial-0 (counted as 1 canonical + 8 variants) |

**Unique templates: 4**
**Total pages: 18 (4 unique + 14 variants)**

---

### Status Code Map (inferred from KPI "Show Details" links)

| KPI Card | status param | Status name |
|---|---|---|
| Sessions Pending | 1 | Pending |
| Waiting & Running | 2,10 | Waiting + Running |
| Attend Sessions | 3,4 | Attend (two substates) |
| Cancel Sessions | 5,6,7 | Teacher Cancel / Student Cancel / Admin Cancel |
| Sessions Absent | 8 | Absent |
| Trials Sessions | (trial filter, not status) | Trial type flag |
| Last Today Sessions | (unknown) | — |

---

### Cross-Cutting Interactions

1. **Class lifecycle state machine:** All 11 modals on the Home Dashboard are replicas of the same modals on the Class Detail page. The frontend should implement these as a shared modal/dialog system driven by `class_id` context, not duplicated per-page.

2. **Makeup flow (4 tabs):** Used identically in both "Mark As Absent" and "Cancel Class" modals:
   - No Make-up
   - Auto Make-up class
   - Reschedule to another time (requires timezone selection: Student Timezone / Teacher Timezone, then date + time)
   - Add to Credit
   The reschedule tab is the only one that reveals a date/time form.

3. **Delete Fine:** Appears inline in the class table row on the Home Dashboard (when a teacher has an outstanding compensation record). It is a small POST form (method override DELETE) targeting `/management/teachers/{id}/compensations/{id}`. Occurs in 2 DOM copies per row (likely mobile + desktop layout duplicates). No confirmation dialog.

4. **WhatsApp messaging:** `send_teacher` and `send_student` checkboxes allow targeting specific parties. Message body supports link insertion (placeholder text references this). This is a direct integration hook.

5. **Helper context (`?helper=1`):** Scopes the dashboard view to a secondary/assistant user. The template is identical but data is user-scoped. Rebuild should treat this as a context parameter, not a separate route.

6. **Export:** `POST /management/export-aa` with only a CSRF token — no visible field for format or date range. The export likely inherits active filter state from hidden fields or server session. Rebuild should clarify export parameters.

7. **Shortcuts:** The admin can create named shortcuts with a URL. These appear to be personal quick-access links stored per user. POSTs to `/management/shortcuts`.

8. **Sidebar navigation (rich):** The sidebar reveals a comprehensive admin nav: Home, Teachers Schedule, Chat, New Requests, Sessions Analysis, Time Convertor, Public Holiday, Advertise & Notify, Tasks, Scheduled Actions, Families, Students, Courses, Groups, Teachers, KPIs, Classes KPI, Monthly Performance, monthly reports, Data Analysis, Accounting, Banks, Materials, Library, Settings. This forms the backbone of the rebuild's primary navigation schema.

---

### UX Improvements (Consolidated)

1. **Empty state — Banks list:** Add a "Create your first bank" CTA directly in the empty state instead of just "No data found".

2. **i18n bug — Feedback Category breadcrumb:** Raw key `messages.Create Feedback Categories` exposed. All translation keys must be resolved before render; add fallback handling.

3. **"Deactive" label:** Non-standard. Use "Inactive" consistently across the platform.

4. **Delete Fine — no confirmation:** An inline destructive action with no confirmation modal. Rebuild must add a confirm dialog (or use optimistic UI with undo).

5. **Home Dashboard modal overload:** 11 modals on a single page, all pre-rendered in the DOM. Rebuild should use lazy-mounted modals loaded on demand by `class_id` to reduce initial payload.

6. **Status filter numeric codes:** Status values are bare integers in query params. Rebuild API should accept named status slugs (e.g., `?status=waiting`) and map to integers server-side, or expose a status enum endpoint.

7. **Makeup tab UX:** The 4-tab makeup picker is buried 2–3 levels deep (row dropdown → modal → tab). A direct "Reschedule" button on the row would improve discoverability.

8. **Export endpoint naming:** `/management/export-aa` is not self-documenting. Rebuild should use `/management/exports/classes` or similar REST-idiomatic path.

9. **Timezone picker in reschedule:** Two radio buttons (Student TZ / Teacher TZ) with no display of what the actual timezones are. Rebuild should show the resolved timezone name (e.g., "Asia/Riyadh — 7:00 AM") next to the radio option.

10. **Mark as Attend copy:** "Mark as attend (no class details will send)" — grammatically incorrect. Rebuild copy: "Mark attended (no class summary will be sent)" / "Mark attended (with class summary)".

11. **Consistent 404 on logo asset:** `/storage/uploads/logo.png` returns 404 on every page. Rebuild should serve a locally hosted logo asset and not depend on the `/storage/uploads/` path.

---
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

---
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

---
# Batch 9 — admin · Messages / Notifications (+ Settings)

---

### `management-chat` — Chat

- **Purpose:** Real-time messaging hub for the admin; supports both 1-on-1 contacts and group chats, with a "No chat selected" splash until a contact is chosen.
- **Key sections / flows:** Split layout — left panel is a searchable contact list (tabs: All / Staff / Teachers / Students) with unread badges; right pane is the message thread showing message history with "Loading more…" pagination. Group management is accessible from within the chat pane.
- **Key SAFE actions:** Search contacts (GET, client-side filter), navigate to contact thread, view group details panel.
- **Key MUTATING/dangerous actions:** Send message (unnamed submit), Create Group (form POST `create-group-form`), Add Member to group (`addMemberForm` POST), Delete Group (Confirm/Cancel flow), Leave Group (link action), Save group settings.
- **Important modals/forms:**
  - **Create Group** (`create-group-form`): Group Name, Bio, Image (file), multi-select Staff / Teachers / Students — fired via Submit; creates a new broadcast group.
  - **Add Member** (`addMemberForm`): multi-select Staff / Teachers / Students — appends members to an existing group.
  - **Group Settings** (modal 2): Edit group name/bio/image + Leave Group + Delete Group — all destructive paths live here without a dedicated confirmation step beyond a generic Confirm/Cancel pair.
  - **Chats drawer** (modal 3): Alternate contact list view, "Loading more…" scroll.
- **Variant-of:** unique template
- **Broken/empty:** Logo image 404 (`/storage/uploads/logo.png`). Chat pane shows placeholder "Open chat from the list" when no contact is selected — functional empty state, not an error.
- **UX improvement for the rebuild:** The Group Settings modal bundles Edit, Leave, and Delete into one modal with a generic Confirm button — split into three separate flows with a destructive-action confirmation dialog (typed name or explicit warning) for Delete Group and Leave Group. Add unread-count badge persistence and proper ARIA roles for the chat thread (live region, `role="log"`).

---

### `management-public-advertisement` — Public Advertisement & Notification

- **Purpose:** Compose and broadcast a message (in-app advertisement or WhatsApp) to targeted subsets of teachers and/or students, with category filtering, media attachment, expiry date, and send-rate limits.
- **Key sections / flows:** Single-page compose form at the top (type selector, message body, media upload, expiry date, audience filters); two tables below showing the resolved recipient lists — "List of Teachers" and "List of Students" — that update based on selected categories.
- **Key SAFE actions:** Filter teacher/student categories (client-side multi-select), view resolved recipient tables, select/deselect recipients via "Select All" checkboxes.
- **Key MUTATING/dangerous actions:** Submit broadcast (`management/public-advertisement-submit` POST) — sends WhatsApp and/or in-app advertisement to potentially all selected users; flagged with a "Maximum limit:0 / Maximum messages:0" quota indicator (values showed 0, suggesting rate-limit data may not have loaded).
- **Important modals/forms:**
  - **Broadcast form** (Form 2, inline — no modal): type checkboxes (Advertisement / WhatsApp), Private toggle, Message textarea, Media file upload, Expire At date, teacher category multi-select, student category multi-select, Country, Hours, Language dropdowns, and two "Select All" checkboxes for bulk recipient selection. Submits to `/public-advertisement-submit`.
- **Variant-of:** unique template
- **Broken/empty:** Quota badges show "Maximum limit:0" and "Maximum messages:0" — likely failed to load real limits from API. Recipient tables show "Select categories to send request" placeholder rows (no actual data rendered), possibly because no categories were pre-selected at capture time.
- **UX improvement for the rebuild:** Replace the single Submit button with a two-step flow: a "Preview Recipients" confirmation screen showing the resolved audience count and sampled names before the actual send, to reduce accidental mass-broadcasts. Surface real-time quota remaining prominently before the user composes the message.

---

### `management-settings-notification` — Settings: System Notifications

- **Purpose:** Admin configuration panel for controlling which notification events are sent to teachers and students, via which channel (app push, WhatsApp, email, profile), and with what timing/reminders.
- **Key sections / flows:** Single long-form settings page under H3 "System Notifications." Organised into logical groups: (1) Global on/off toggles (Notifications, App Notification); (2) Course Notifications — per teacher and per student channel select + status event checkboxes (Create, Edit, Status); (3) Class Notifications — per teacher and per student channel select + status checkboxes (Waiting, Running, Cancel, Absent, Teacher Absent, Auto Makeup, Reject, Cancel request, Approve, End class); (4) Reminders — teacher/student channel, hours-before numeric input, daily reminder, late-3-minutes, reschedule reminders, manual send toggle; (5) Invoice notifications — channel select + reminder interval in days; (6) Salaries and Family Status notification channels.
- **Key SAFE actions:** View current configuration, navigate settings sidebar.
- **Key MUTATING/dangerous actions:** Save changes (POST to `settings/notification/update`) — persists the entire notification configuration; a misconfiguration here silently changes all outbound notification behaviour for the platform.
- **Important modals/forms:**
  - **Notification settings form** (Form 2, 47 fields, inline): all the checkboxes and selects described above + `hours_to_reminder_teacher` and `hours_to_reminder_student` number inputs. Single "Save changes" submit button at the bottom.
- **Variant-of:** unique template
- **Broken/empty:** No broken states observed; page loaded cleanly (HTTP 200, 105 network requests). Logo image returns 404 (shared platform-wide issue).
- **UX improvement for the rebuild:** The single monolithic form with 47 fields and one Save button at the very bottom is error-prone — any accidental change is silently saved. Rebuild as tabbed sections (Courses / Classes / Reminders / Invoices / Salaries) each with its own Save, with unsaved-changes guards and a visual diff summary before the final save. Add per-section preview of who will be affected (e.g., "X teachers will now receive WhatsApp on class cancel").

---

## Module synthesis (this batch)

**What this module does and its core entities:**
Batch 9 covers the admin-side communication and notification layer — three distinct pages all in the "Messages / Notifications" module:
- **Chat** — real-time messaging with contacts and group management.
- **Public Advertisement** — mass-broadcast tool targeting teachers/students via in-app or WhatsApp.
- **Settings / Notifications** — system-wide configuration of all notification triggers, channels, and timing.

Core entities: Chat Contact, Group (members: Staff, Teachers, Students), Broadcast Message (type, recipients, media, expiry), Notification Rule (event, channel, statuses, reminder timing).

**Distinct page templates vs variant count:**
- 3 pages read, 3 unique templates, 0 variants.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Chat: Create Group and Add Member modals are mutating; Delete Group and Leave Group in Group Settings modal are **dangerous** (irreversible) and share a generic Confirm button — no dedicated destructive-action warning.
- Public Advertisement: the broadcast Submit is the single most dangerous action in the batch — one click sends messages to potentially all teachers and students; no preview/confirmation step exists.
- Notification Settings: the 47-field Save changes is a silent, sweeping configuration change; no per-section saves, no confirmation dialog.
- All three pages share global chrome modals (Recent Searches, Add shortcuts) — safe, not worth flagging per-page.

**Improvements for the new platform:**

1. **Chat — group safety:** Split Delete Group and Leave Group into explicit destructive-action flows with typed-name confirmation. Add ARIA live regions (`role="log"`) for the message thread. Introduce read-receipts or at least unread-count persistence.
2. **Chat — mobile:** The two-panel layout collapses poorly on mobile; implement a single-column slide-in panel pattern.
3. **Public Advertisement — send guard:** Add a mandatory preview step showing resolved audience count + channel breakdown + quota remaining before the final Send. Disable Submit when quota shows 0.
4. **Public Advertisement — rate limit visibility:** Show live quota (remaining messages, next reset time) at the top of the compose area, not as a badge that may show stale "0" values.
5. **Notification Settings — tabbed form:** Split the 47-field monolith into tabs per domain (Courses / Classes / Reminders / Invoices / Salaries), each with its own Save and unsaved-changes guard (route-leave warning).
6. **Notification Settings — impact preview:** Before save, show a concise summary ("This will enable WhatsApp reminders for all teachers 1h before each session") to help admins understand the blast radius.
7. **RTL / i18n:** All three pages are LTR-only (lang: en), but multi-select options include Arabic names (e.g., "المعلم محمد صادق", "الطالبة لمار حسن"). The rebuild must handle mixed-direction text inside form controls (dir="auto" on option text or RTL-first layout mode).
8. **Shared platform bug — logo 404:** `/storage/uploads/logo.png` returns 404 on every page; the rebuild should use a bundled fallback asset rather than a user-uploaded path for the primary logo.
9. **Empty states:** Public Advertisement recipient tables need a proper empty-state illustration + instructional copy ("Select at least one teacher category above to see recipients") rather than a raw table row with placeholder text.
10. **Accessibility:** Chat modals lack explicit `role="dialog"` and focus traps; Notification Settings checkboxes lack group `<fieldset>`/`<legend>` structures — both must be fixed in the rebuild for keyboard and screen-reader users.

**Owner / backend confirmation needed:**
- Public Advertisement: clarify what "Maximum limit:0 / Maximum messages:0" means — is it a per-day limit, per-account limit, or a WhatsApp BSP quota? The UI must surface whichever clearly.
- Notification Settings: confirm whether changes take effect immediately or on next scheduled run; the rebuild should communicate this to the admin.
- Chat: confirm whether the group chat messages persist in the DB or are ephemeral; affects data-fetch strategy and message history pagination design.

---
# Batch 10 — Admin · Families Categories & Families Management

---

### `management-categories-families` — Families Categories List

- **Purpose:** Index of family-category groupings (named supervisory buckets used to organise families), with per-category counts and per-row actions.
- **Key sections / flows:** H5 "Families Categories" heading; 1-table listing (#, Name, Description, Status, Count, Settings); KPI card wrapping the table; "Create category" link (mutating).
- **Key SAFE actions:** Browse/paginate the category list; navigate sidebar.
- **Key MUTATING/dangerous actions:** "Create category" (POST to /categories/families/store); "Delete" per row (hidden form POSTs to /categories/families/{id}/delete — two categories found: IDs 2 and 3); "Edit" per row.
- **Important modals/forms:** Delete forms are pre-rendered hidden forms — no confirmation dialog captured; direct POST on click is dangerous.
- **Variant-of:** Unique template (categories index).
- **Broken/empty:** None; 2 rows visible, both Active. Logo image 404 on all pages (minor).
- **UX improvement for the rebuild:** Replace the hidden-form delete with a named confirmation dialog (show category name + member count before deleting); add an empty-state illustration for zero categories.

---

### `management-categories-families-2-assign` — Assign Families to Category #2

- **Purpose:** Lets admin select and assign one or more family accounts (members) to category #2 via a multi-select picker.
- **Key sections / flows:** H4 "Choose Families"; select-multiple `member_id[]` rendered with a search textarea (Select2 filter); Submit button POSTs to /categories/families/2/assign-family.
- **Key SAFE actions:** Browse existing selections; use the search filter to narrow options.
- **Key MUTATING/dangerous actions:** "Submit" — assigns the selected families to the category (POST /categories/families/2/assign-family).
- **Important modals/forms:** Assignment form (member_id[] multi-select + Search filter textarea); no explicit "are you sure" before overwriting assignments.
- **Variant-of:** Unique template (category assign). ID-variant of itself at /3/assign — same template.
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Show currently-assigned families as pre-selected chips with an explicit diff (who will be added/removed) before the Submit fires, reducing accidental unassignments.

---

### `management-categories-families-2-edit` — Edit Category #2

- **Purpose:** Edit the name, status (Active/Deactive), and description of family category #2.
- **Key sections / flows:** H4 "Category Details"; form with name text, status select (Active/Deactive), description textarea; Submit button POSTs to /categories/families/2/update.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** "Submit" — updates the category record.
- **Important modals/forms:** Single edit form (name, status, description).
- **Variant-of:** Unique template (category edit). ID-variant: /3/edit same layout.
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Add field-level validation (name required, min length) inline rather than server-round-trip; show active member count as a read-only info line so admin knows impact of deactivating.

---

### `management-categories-families-3-assign` — Assign Families to Category #3

- **Purpose:** Identical assignment flow for category #3.
- **Key sections / flows:** Same as /2/assign — "Choose Families", multi-select member_id[], Search filter, Submit POSTs to /categories/families/3/assign-family.
- **Key SAFE actions:** Filter/browse available families.
- **Key MUTATING/dangerous actions:** Submit (POST /categories/families/3/assign-family).
- **Important modals/forms:** Same as /2/assign.
- **Variant-of:** management-categories-families-2-assign (ID variant, category 3).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Collapse into a single parameterised route /categories/families/:id/assign.

---

### `management-categories-families-3-edit` — Edit Category #3

- **Purpose:** Identical edit form for category #3 (name "المشرفه اسماء", description ".", status Active).
- **Key sections / flows:** Same as /2/edit — H4 "Category Details", name/status/description form, Submit POSTs to /categories/families/3/update.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit (POST update).
- **Important modals/forms:** Same as /2/edit.
- **Variant-of:** management-categories-families-2-edit (ID variant, category 3).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Same as /2/edit — inline validation + impact context.

---

### `management-categories-families-create` — Create New Family Category

- **Purpose:** New-category creation form — identical fields to the edit form but without a pre-populated record; POSTs to /categories/families/store.
- **Key sections / flows:** H4 "Category Details"; name, status (Active/Deactive), description; Submit button.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit (POST /categories/families/store — creates a new category record).
- **Important modals/forms:** Single creation form (name, status, description).
- **Variant-of:** Unique template (create — structurally identical to the edit form but distinct endpoint).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** After creation, redirect to the assign page for the new category rather than back to the list, guiding admin through the natural "create → assign members" flow.

---

### `management-families` — Families Index (List)

- **Purpose:** Master list of all registered family/guardian accounts with status KPIs and rich multi-criteria filtering.
- **Key sections / flows:** Seven KPI cards (On Trial 0, Incomplete 0, Active 2, Stopped 0, Suspended 0, Inactive 0, Deleted 0); large accordion "Filter" panel with 48 fields (hour_rate, children_no, invoice type Pre/Post, cost type Fixed/Variable, course type × 4, payment methods, currency × 16); table with 12 columns (#, Family name, Phone, Join Date, Username, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions); row actions: Show Details, Edit, Delete. Create button top-right.
- **Key SAFE actions:** Filter by any combination of fields; browse/paginate; view KPI cards.
- **Key MUTATING/dangerous actions:** "Delete" per row (hidden POST to /families/{id} with _method DELETE — no confirmation dialog captured); "Create" navigates to create form; "Update Suspension" modal (returned_at date + note field, POST /update-returning).
- **Important modals/forms:** "Update Suspension" modal (returned_at required date, note textarea — POST /update-returning); filter form with 48 fields (GET /families/index/filter).
- **Variant-of:** Unique template (families index / list).
- **Broken/empty:** No data in On Trial / Stopped / Suspended / Inactive / Deleted — all show 0 but the UI renders correctly.
- **UX improvement for the rebuild:** The filter panel with 48 fields is overwhelming; collapse into a smart filter drawer with logical groupings (status, billing, course, location) and an active-filter chip strip at the top; keep only the most-used defaults visible.

---

### `management-families-1` — Family Detail Page (Family ID 1 — "abdo ahmed")

- **Purpose:** Deep-dive profile for a single family account; 8-tab layout covering children/students, billing, invoice adjustments, credits, profile activity log, student feedback meetings, and settings (location, preferences, capabilities, notifications).
- **Key sections / flows:** Header card (name, status Active, total hours 12, member count 1, "Login as" button, action bar); 8 tab pills: Children (default), Billing, Invoice Adjustments, Credits, Profile Activity, Student Feedback, Settings. Each tab reveals its own sub-section; Settings tab contains 4 nested sections (Update Location, Preferences, Capabilities, Profile Notifications).
- **Key SAFE actions:** Switch tabs; view profile activity log; view student/child list; view billing history; view credits.
- **Key MUTATING/dangerous actions:** "Login as abdo ahmed" (POST impersonation — extremely dangerous, must never be auto-fired); "Send Reset Password" (triggers email/WhatsApp); "Deactivate" (POST /families/1/deactivate); "Suspend" (modal → POST /families/1/suspend with returned_at + note); "Stop" (modal → POST /families/1/stop with note); "Schedule Stop on Date" (modal → POST /scheduled-actions); "Delete" (POST DELETE /families/1); "Delete" child/student (POST /student/1/delete); "Delete" invoice adjustment (POST DELETE /families/1/invoice-adjustments/1); "Create Invoice" navigates away; "Submit" transaction (POST /accountant/store-transaction); Update Location (POST); Update Preferences (POST); Update Capabilities (POST); "Save changes" notifications (POST /families/1/store-notifications); "Activate" (POST /families/1/activate).
- **Important modals/forms:** "Suspended Family" modal (returned_at date, schedule_return checkbox, note required — POST /families/1/suspend); "Stop Family" modal (note required — POST /families/1/stop); "Schedule Stop Family" modal (scheduled_date required, returned_at optional, schedule_auto_return, note — POST /scheduled-actions); "Activate" modal (no-debt confirmation — POST /families/1/activate); "New Transaction" modal (transaction_id, date_payment, basic, additional, taxes, total, currency select, gateway select — POST /accountant/store-transaction); Invoice Adjustment form (type, amount, count, note — POST /families/1/invoice-adjustments); Student Details modal (read-only, Close only).
- **Variant-of:** Unique template (family detail / show with 8-tab layout). ID variant at /2 shares same template.
- **Broken/empty:** Billing table shows "No data found"; Credits table empty; Student Feedback meetings table empty (no meetings scheduled). Course status tag renders "messages.3" — likely an un-translated i18n key bug.
- **UX improvement for the rebuild:** Move "Login as", Delete, Suspend, Stop into a clearly segregated "Danger Zone" collapsible section with individual confirmation dialogs (not just one modal) naming the exact consequence; fix the "messages.3" i18n key.

---

### `management-families-1-edit` — Edit Family #1

- **Purpose:** Full edit form for family account #1 (abdo ahmed) covering main info, payment config, and course type.
- **Key sections / flows:** Three sections — "Main information" (name EN/AR, username, password, category multi-select, emails tag-input, phones tag-input, birth date, join date, gender, status, WhatsApp group), "Payment information" (invoice type Pre/Post, payment method, currency, recurring/auto-invoice flags), "Courses information" (course type radio × 4, hour rate, total hours, fees, invoice day, session day, cost type, notes); Submit POSTs to /families/1.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** "Submit" — full overwrite of family record including credentials (password field present); "remove tag" on email/phone chips.
- **Important modals/forms:** Main create/edit form (familyForm) — 33 fields across all sections. "send_info" checkbox sends the updated credentials to the family.
- **Variant-of:** Unique template (family edit). ID variant at /2/edit same template.
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Split into a multi-step wizard or a tabbed form (Identity / Contact / Billing / Course) so the ~33-field single-page form is not overwhelming; password change should require current-password confirmation or be a separate action.

---

### `management-families-2` — Family Detail Page (Family ID 2 — "الطالبة لمار حسن")

- **Purpose:** Same 8-tab family profile as /1, for family "الطالبة لمار حسن" (UK, GBP, 6 GBP/hr, 12 total hours).
- **Key sections / flows:** Identical tab structure; Children tab shows student "منار حسن" (Active, no teacher assigned, status "messages.3" bug again); Billing, Adjustments, Credits, Activity, Feedback all empty; Settings tabs populated with UK location/timezone.
- **Key SAFE actions:** Navigate tabs, view profile activity.
- **Key MUTATING/dangerous actions:** Same set as /1 — Login as, Send Reset Password, Deactivate, Suspend, Stop, Schedule Stop, Delete, Delete child, Create Invoice, New Transaction, Update Location, Update Preferences, Update Capabilities, Save notifications, Activate.
- **Important modals/forms:** Same as /1 — Suspended Family, Stop Family, Schedule Stop, Activate, New Transaction, Adjustment.
- **Variant-of:** management-families-1 (ID variant, family 2).
- **Broken/empty:** Invoice Adjustments table "No data found"; Credits empty; Student Feedback empty; "messages.3" i18n bug on child course status.
- **UX improvement for the rebuild:** Resolve "messages.3" i18n key before launch (affects all child/student status displays).

---

### `management-families-2-edit` — Edit Family #2

- **Purpose:** Same large edit form for family #2 (الطالبة لمار حسن — UK, GBP).
- **Key sections / flows:** Identical 3-section form to /1/edit; pre-populated with this family's data (status Active, category members المشرفه حسناء + المشرفه اسماء, email alaashapan1996, phone 441200480244); Submit POSTs to /families/2.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit full record update including password field; remove tag (email/phone chip delete).
- **Important modals/forms:** Same familyForm as /1/edit (33 fields).
- **Variant-of:** management-families-1-edit (ID variant, family 2).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Same as /1/edit; also: tag-input (email/phone) should validate formats on blur, not just on submit.

---

### `management-families-create` — Create New Family

- **Purpose:** New family registration form — same 3-section structure as edit but with an additional "Location information" section (country, city, timezone) that is absent from the edit form (location is editable via the Settings tab on the detail page).
- **Key sections / flows:** Four sections — Main information (same as edit minus pre-populated values, password now required), Location information (country_id, city_id, timezone, timezone_offset), Payment information, Courses information; Submit POSTs to /families (store).
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit — creates a new family account with credentials; "send_info" checkbox sends credentials to the family.
- **Important modals/forms:** Creation form with 37 fields.
- **Variant-of:** Unique template (family create — includes Location section not present in edit).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Guide the admin through creation with a multi-step flow (Identity → Location → Billing → Course → Review & Send) so that required fields per step are clear; show inline password strength indicator.

---

### `management-families-feedback` — Student Feedback Index (All Families / Date View)

- **Purpose:** Cross-family view of feedback meetings, filterable by date; allows admin to manage meeting records, notes, reports, and delete reports.
- **Key sections / flows:** H5 "Student Feedback"; "Parents" tab link; date filter input (GET /families/feedback?date=); table (#, Parents, Manager, Meeting Date, Meeting Time, Meeting Manager, Status, Actions — empty, "No data found"); secondary report table (Student, Manager, Curriculum, Expected Outcomes, Level, Achievements); 4+ action modals.
- **Key SAFE actions:** Filter by date; view "Parents" sub-tab.
- **Key MUTATING/dangerous actions:** "Delete Report" (POST DELETE via hidden form — destroys the curriculum/outcomes/level/achievements report for a student); "Save" on Edit meeting date modal; "Save" on Add Notes modal; "Save" on Add Report modal.
- **Important modals/forms:** "Edit" modal (meeting date field — POST update); "Add Notes" modal (feedback textarea — POST); "Add Report" modal (curriculum, expected outcomes, level, achievements textareas — POST); Report detail modal with "Delete Report" button (POST delete — irreversible).
- **Variant-of:** Unique template (feedback date-filter index).
- **Broken/empty:** Main meetings table shows "No data found" — no meetings exist in data at time of crawl. Empty state shows blank table only.
- **UX improvement for the rebuild:** Add a proper empty state with call-to-action ("Schedule first meeting from the Students view"); add a confirmation step before Delete Report since it destroys a substantive written record.

---

### `management-families-feedback-family-2` — Feedback Detail for Family #2

- **Purpose:** Per-family feedback detail showing the family header (name, status, contact), children/student list, and feedback meeting history for that specific family.
- **Key sections / flows:** H5 family name; family info card (Manager, E-mail, Total meetings 0, "Show Profile" link); "Family Members" table (Student, Teacher — منار حسن, Not added); "Student Feedback" section (empty, "No data found"); Edit meeting date modal.
- **Key SAFE actions:** "Show Profile" link (navigates to /families/2); view family info and student list.
- **Key MUTATING/dangerous actions:** "Save" on Edit meeting date modal (POST update meeting date).
- **Important modals/forms:** "Edit" modal (meeting date — POST /families/feedback/{id} update via hidden _method).
- **Variant-of:** Unique template (per-family feedback detail). ID variant (/family/1, /family/2 etc.).
- **Broken/empty:** Student Feedback table is empty ("No data found") — no meetings logged for this family. Student teacher shows "Not added".
- **UX improvement for the rebuild:** Show a timeline/calendar view of past and upcoming meetings rather than a flat table; surface the "Add Meeting Date" action prominently when the table is empty.

---

### `management-families-feedback-students` — Feedback Students List (All Statuses)

- **Purpose:** Admin view listing all families with their feedback tracking status (last feedback date, next meeting date, meeting manager), with KPI bar by family status and inline "Add Meeting Date" action.
- **Key sections / flows:** KPI bar (Incomplete 0, Inactive 0, On Trial 0, Active 2, Suspended 0); table (#, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions); search input (GET ?search=); status filter chips (clickable links per status). Row actions: "Show Details", "Add Meeting Date".
- **Key SAFE actions:** Search by name; view KPIs; click status chip to filter; "Show Details" navigates to per-family feedback page.
- **Key MUTATING/dangerous actions:** "Add Meeting Date" opens modal → POST /families/feedback (creates a new feedback meeting record for that family, with date and manager fields).
- **Important modals/forms:** "Add Meeting Date" modal (date required, user_id Manager select from staff list — POST /families/feedback). Note: form action is /families/feedback (same as the index), method POST.
- **Variant-of:** Unique template (feedback students/families listing).
- **Broken/empty:** Last Feedback and Next Meeting columns all show "—" (no meetings exist). Meeting Manager shows "Unknown" in card/grid preview.
- **UX improvement for the rebuild:** Make status-chip filtering a proper URL query param with browser-history support; show "Last Feedback" as a relative time ("2 weeks ago") rather than a raw date.

---

### `management-families-feedback-students-status-active` — Feedback Students List Filtered: Active

- **Purpose:** Same feedback students listing filtered to status=Active (shows both active families); adds "Active ×" dismissible filter chip.
- **Key sections / flows:** Identical to base feedback-students page; table shows 2 rows (both Active); "Active ×" chip in table header allows clearing the filter; search input persists the status=Active param.
- **Key SAFE actions:** Search within Active; clear filter chip; navigate to details.
- **Key MUTATING/dangerous actions:** "Add Meeting Date" (same modal as base page — POST /families/feedback).
- **Important modals/forms:** Same Add Meeting Date modal.
- **Variant-of:** management-families-feedback-students (query-param status=Active variant).
- **Broken/empty:** Last Feedback / Next Meeting empty for all rows.
- **UX improvement for the rebuild:** Status filter chips should be implemented as a single-source tab/pill component that updates a shared query param, not as separate discoverable links.

---

### `management-families-feedback-students-status-inactive` — Feedback Students List Filtered: Inactive

- **Purpose:** Same feedback students listing filtered to status=Inactive — shows empty table (no inactive families).
- **Key sections / flows:** Same structure; table "No data found"; "Inactive ×" dismiss chip.
- **Key SAFE actions:** Clear filter; search.
- **Key MUTATING/dangerous actions:** "Add Meeting Date" modal still present (even with empty table).
- **Important modals/forms:** Same Add Meeting Date modal.
- **Variant-of:** management-families-feedback-students (query-param status=Inactive variant).
- **Broken/empty:** Table is empty — "No data found" — expected given no inactive families in the dataset.
- **UX improvement for the rebuild:** Empty state should be contextual ("No Inactive families") not generic.

---

### `management-families-feedback-students-status-incomplete` — Feedback Students List Filtered: Incomplete

- **Purpose:** Same feedback students listing filtered to status=Incomplete — shows empty table (no incomplete families).
- **Key sections / flows:** Same structure; "Incomplete ×" chip; table "No data found".
- **Key SAFE actions:** Clear filter; search.
- **Key MUTATING/dangerous actions:** "Add Meeting Date" modal still present.
- **Important modals/forms:** Same Add Meeting Date modal.
- **Variant-of:** management-families-feedback-students (query-param status=Incomplete variant).
- **Broken/empty:** Empty result set — expected.
- **UX improvement for the rebuild:** Same contextual empty state as Inactive variant.

---

## Module synthesis (this batch)

### What this module does and its core entities

This batch covers the full **Families / Parents / Guardians** domain, structured around three sub-areas:

1. **Family Categories** — named groups (supervisors / buckets) to which families are assigned. CRUD: list, create, edit, delete; plus an assign-members workflow. Entities: Category (name, description, status, member count).
2. **Families (accounts)** — the main family/guardian accounts. Entities: Family (name EN/AR, username, emails, phones, gender, status [Incomplete/Inactive/On Trial/Active/Stopped/Suspended/Deleted], join date, country, city, timezone, WhatsApp group, payment method, currency, course type, hour rate, total hours, invoice day, cost type). Children (students) are linked to each family. Each family has Billing/Invoices, Invoice Adjustments, Credits, Activity log, Notifications prefs, and Settings (location, preferences, capabilities).
3. **Feedback** — meeting/feedback tracking for families, with per-family meeting records (date, manager, notes, report with curriculum/outcomes/level/achievements fields).

### Distinct page templates vs variant count

| Template | Count of pages |
|---|---|
| Category list | 1 (unique) |
| Category create | 1 (unique) |
| Category edit | 2 (ID variants: /2/edit, /3/edit) |
| Category assign | 2 (ID variants: /2/assign, /3/assign) |
| Family list | 1 (unique) |
| Family create | 1 (unique) |
| Family edit | 2 (ID variants: /1/edit, /2/edit) |
| Family detail (8-tab) | 2 (ID variants: /1, /2) |
| Feedback index (date-filter) | 1 (unique) |
| Feedback per-family detail | 1 (unique, ID /2 captured) |
| Feedback students list | 1 (unique) |
| Feedback students status-filtered | 3 (query-param variants: Active, Inactive, Incomplete) |

**Total: 7 distinct templates, 11 variant/instance pages (18 total).**

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

**Dangerous modals (must never auto-fire):**
- Suspend Family (returned_at, note — POST /suspend)
- Stop Family (note — POST /stop)
- Schedule Stop Family (scheduled_date, returned_at, schedule_auto_return, note — POST /scheduled-actions)
- Activate (POST /activate) — lower risk but irreversible state change
- Delete family (hidden form, no modal at all — highest risk: no confirmation dialog in the current implementation)
- Delete child/student (hidden form, no modal)
- Delete invoice adjustment (hidden form, no modal)
- Delete Report in feedback (POST delete with modal, but thin confirmation)
- Login as family (impersonation — POST, extremely dangerous)
- Send Reset Password (triggers external comms)
- New Transaction (POST /accountant/store-transaction — financial mutation)
- Assign families to category (POST /assign-family — can unassign existing members if multi-select cleared)

**Safe cross-cutting patterns:**
- The 8-tab anchor-hash navigation on family detail (/families/{id}#pills-*) is safe
- Status chip links on feedback students list are safe GET navigations
- Date filter on feedback index is a safe GET

**Filters:**
- Family list has a 48-field collapsible filter panel (GET) — safe but architecturally complex
- Feedback students list has search (GET) and status chip (GET link)
- Category assign uses a Select2 multi-select search filter

**Tab pattern:**
- Family detail uses Bootstrap pills (8 tabs) with hash-based navigation; Settings tab has 4 nested update forms each with their own submit.

### Improvements for the new platform

1. **Delete safety net:** All delete actions currently use hidden pre-rendered forms with no confirmation modal. The rebuild MUST gate every delete (family, child, category, invoice adjustment, report) behind a named confirmation dialog showing the entity name and a summary of what will be lost.
2. **Login-as / impersonation:** Must be segregated into a clearly marked "Admin Tools" zone with a mandatory acknowledgment step and an audit log entry — never in the normal action bar.
3. **Family list filter:** Collapse 48 fields into a smart filter drawer with 5–6 groupings (Status, Billing/Payment, Course Type, Location, Joined date range). Show active filters as dismissible chips above the table.
4. **Family edit form:** 33+ fields on a single page is overwhelming. Rebuild as a multi-step wizard (Identity / Location / Payment / Course / Confirm) or a tabbed form.
5. **"messages.3" i18n bug:** Child/student course status renders a raw translation key. Fix before launch — affects family detail tabs across all families.
6. **RTL/bilingual:** Category names and family names are Arabic; the UI is LTR. The rebuild must support RTL layout switching and mixed-direction text rendering (Arabic names inside LTR tables).
7. **Status colours:** 7 family statuses (Incomplete, Inactive, On Trial, Active, Stopped, Suspended, Deleted) — the rebuild needs a consistent colour system (e.g., green=Active, yellow=Trial, orange=Suspended, red=Stopped/Deleted, grey=Inactive/Incomplete).
8. **Family detail 8-tab:** Convert to a deep-linked route or hash-routed tab component with proper ARIA `role="tablist"` and keyboard navigation. Settings sub-sections (Location, Preferences, Capabilities, Notifications) should each auto-save or have a single "Save all settings" path to reduce accidental partial updates.
9. **Feedback module:** Add a meeting calendar/timeline view in addition to the flat table; show "No meetings yet" with a CTA rather than just an empty table.
10. **Empty states:** Every table in this module (Billing, Credits, Adjustments, Feedback meetings) renders "No data found" with no illustration or call-to-action. Rebuild each with contextual empty states.
11. **Mobile:** The families list table has 12 columns — needs a card/list view for mobile. The family detail 8-tab layout should collapse to an accordion on narrow screens.
12. **Feedback students list:** The status-filter chips should be a single URL-aware filter component (not separate hard-coded links) so all statuses (Active, Inactive, Incomplete, On Trial, Suspended) are available from one control.
13. **Pagination:** All lists use a single page-1 pagination placeholder — the rebuild needs real server-side pagination with page-size selector.

### Anything that needs owner/backend confirmation

- **Delete category with members:** Does deleting a category unassign its members or is it blocked? No indicator in the UI — backend behavior must be confirmed and surfaced in the delete confirmation dialog.
- **Assign-family overwrites:** Does POSTing /assign-family replace all existing assignments or merge? Needs confirmation to design the diff preview correctly.
- **Login-as audit trail:** Is impersonation logged server-side? The rebuild should require this for compliance.
- **"messages.3" key:** What is the intended display value for this course subscription status? Backend/translation file must be checked.
- **Feedback meeting "Manager":** The assign-manager dropdown on "Add Meeting Date" shows staff names (Eslam Essam, mohamed) — is this all admin users or a specific role group?
- **Category "Count" column:** Shows 0 for both categories despite families existing. Confirm if the count logic is a bug or if "count" refers to something other than assigned families.

---
# Batch 11 — admin · Families Management + Feedback + Settings/WhatsApp

---

### `management-families-feedback-students-status-suspended` — Feedback Students: Suspended Filter

- **Purpose:** Shows the student-level feedback list filtered to families with Suspended status; zero results in test data.
- **Key sections / flows:** 5 KPI status cards (Incomplete 0%, Inactive 0%, On Trial 0%, Active 2 (100%), Suspended 0%); a "Parents" section header with a data table (columns: #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions); a search input + status filter (hidden field pre-set to "Suspended"); a month selector filter.
- **Key SAFE actions:** Navigate status tabs, search by name, filter by month, navigate pagination (1 page).
- **Key MUTATING/dangerous actions:** "Add" meeting feedback (POST to `/management/families/feedback` — submits date + manager assignment for a family); also global "See All Notifications" POST.
- **Important modals/forms:** Add Feedback modal — fields: `date` (required), `user_id` (Manager select); posts to `/management/families/feedback`. Triggers with `family_id` hidden field pre-filled.
- **Variant-of:** `management-families-feedback-students` base template (status=Suspended query-param variant)
- **Broken/empty:** Table shows "No data found" — all 0 rows. This is a data-state empty, not a 404/500. Page itself loaded 200.
- **UX improvement for the rebuild:** Replace the raw active-filter badge "Suspended ×" (text-only) with a proper dismissible chip that visually matches the status color palette; add an explicit empty-state illustration/message with a CTA to clear the filter.

---

### `management-families-feedback-students-status-trial` — Feedback Students: On Trial Filter

- **Purpose:** Same student-feedback list as above, pre-filtered to "On Trial" status families.
- **Key sections / flows:** Identical layout to the Suspended variant — 5 KPI cards, Parents section, same 7-column table, search + month filter. Badge reads "On Trial ×". Zero rows visible.
- **Key SAFE actions:** Search, month filter, pagination, navigate tabs.
- **Key MUTATING/dangerous actions:** "Add" feedback meeting (same POST to `/management/families/feedback`).
- **Important modals/forms:** Add Feedback modal — same fields: `date` (required), `user_id` (Manager select).
- **Variant-of:** `management-families-feedback-students` (status=Trial query-param variant)
- **Broken/empty:** Table "No data found" — 0 rows, empty data state.
- **UX improvement for the rebuild:** Consolidate the feedback student list into a single page with a tab/pill group for all 5 statuses instead of separate URL-per-status to avoid URL proliferation and allow quick switching.

---

### `management-families-index-filter-payment-methods-0-1` — Families Index: Payment Method Filter

- **Purpose:** Families list filtered by a specific payment method (payment_methods[0]=1); shows active families matching that payment method criteria.
- **Key sections / flows:** 7 KPI status distribution cards (On Trial 0%, Incomplete 0%, Active 2 (100%), Stopped 0%, Suspended 0%, Inactive 0%, Deleted 0%); a collapsible "Filter" accordion panel; a 12-column families table (Family name + email, Phone, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions); a "Create" button. Filter panel exposes: Hour Rate (with operator <, >, =), Children No., Invoice Type (Pre/Post), Cost Type (Fixed/Variable), Course Type (4 options), Payment Methods (searchable checkbox list), Currency (16 options AED→YER). Row actions: Show Details, Edit, Delete.
- **Key SAFE actions:** Filter expand/collapse (accordion), filter submission (GET), sort/navigate table, view family details.
- **Key MUTATING/dangerous actions:** Create (link to family creation); Delete family (per-row POST form with _method override — destructive); "Update Suspension" (POST to `/management/update-returning` — sets returned_at date and note); filter Submit button.
- **Important modals/forms:** "Update Suspension" modal — fields: `returned_at` (date, required), `note` (textarea). This modal likely appears on Suspended rows to set a return date and confirm suspension end; dangerous because it modifies family subscription state.
- **Variant-of:** `management-families-status-active` base template (filter query-param variant; same DOM structure, same forms, same 12 columns)
- **Broken/empty:** No broken pages. 2 rows returned for active families.
- **UX improvement for the rebuild:** The 48-field filter panel is rendered as an accordion with nested dropdowns — rebuild as a proper slide-in filter drawer with grouped sections (Billing, Subscription Type, Payment, Currency), clear-all button, and applied-filters chips; improves discoverability significantly.

---

### `management-families-status-active` — Families List: Active

- **Purpose:** Families list pre-filtered to Active status; the primary operational view showing all currently active subscriber families.
- **Key sections / flows:** 7 KPI status cards (same distribution as above); Filter accordion; "Active Families" section heading; 12-column table with 2 data rows (abdo ahmed, الطالبة لمار حسن); per-row actions (Show Details, Edit, Delete); Create button; Range selector; pagination.
- **Key SAFE actions:** Filter, search (via filter form), navigate pagination, view details.
- **Key MUTATING/dangerous actions:** Delete (per-row POST, destructive — no confirm dialog visible from capture), Edit (link), Create (link), Update Suspension (POST with return date + note), filter Submit.
- **Important modals/forms:** "Update Suspension" modal — `returned_at` (required date) + `note` textarea; this is the dangerous form that changes a family's suspension return date.
- **Variant-of:** Unique template (base template for all `management-families-status-*` pages)
- **Broken/empty:** Not broken. 2 active rows, all others show 0%.
- **UX improvement for the rebuild:** The Delete action in the Actions column fires a form POST with no apparent confirmation dialog in captured data — rebuild must add a named confirmation modal ("Delete [family name]? This cannot be undone.") with explicit destructive-action button styling (red) before submitting.

---

### `management-families-status-deleted` — Families List: Deleted

- **Purpose:** Shows families in Deleted status; expected to be a soft-delete view for recovery or audit.
- **Key sections / flows:** Identical layout to the Active template — 7 KPI cards, Filter accordion, "Deleted Families" heading, 12-column table (0 rows). No "Show Details / Edit / Delete" row actions visible since 0 rows. Update Suspension modal still present in DOM.
- **Key SAFE actions:** Filter, search, pagination.
- **Key MUTATING/dangerous actions:** Create (link), Update Suspension POST, filter Submit.
- **Important modals/forms:** Update Suspension modal same as above.
- **Variant-of:** `management-families-status-active` (route-segment status variant: `/status/Deleted`)
- **Broken/empty:** Table has 0 rows — empty data state (no deleted families in test env). Page loaded 200.
- **UX improvement for the rebuild:** Deleted families view needs a restore/undelete action and should clearly communicate that records are soft-deleted; add "Restore" per-row action + empty-state message explaining the scope.

---

### `management-families-status-inactive` — Families List: Inactive

- **Purpose:** Lists families with Inactive status (lapsed/non-renewing subscribers).
- **Key sections / flows:** Identical template to Active — 7 KPI cards, Filter accordion, heading reads "messages.Inactive Families" (raw i18n key exposed — translation key not resolved), 12-column table with 0 rows.
- **Key SAFE actions:** Filter, search, pagination.
- **Key MUTATING/dangerous actions:** Create, Update Suspension POST, Delete, filter Submit.
- **Important modals/forms:** Update Suspension modal — same fields.
- **Variant-of:** `management-families-status-active` (route-segment status variant: `/status/Inactive`)
- **Broken/empty:** 0 rows (empty data state). **Translation bug detected:** heading renders raw key `messages.Inactive Families` instead of translated text.
- **UX improvement for the rebuild:** Fix the i18n key leakage — the new frontend must never render raw translation keys; use fallback strings and test locale coverage. Also: Inactive families are prime candidates for re-engagement actions; add a "Re-activate" row action on this view.

---

### `management-families-status-incomplete` — Families List: Incomplete

- **Purpose:** Lists families whose onboarding/registration is incomplete (missing data, not yet fully set up).
- **Key sections / flows:** Same 12-column table template, 0 rows, 7 KPI cards, Filter accordion, heading "Incomplete Families".
- **Key SAFE actions:** Filter, search, pagination.
- **Key MUTATING/dangerous actions:** Create, Delete, Update Suspension POST, filter Submit.
- **Important modals/forms:** Update Suspension modal same.
- **Variant-of:** `management-families-status-active` (route-segment status variant: `/status/Incomplete`)
- **Broken/empty:** 0 rows — empty data state.
- **UX improvement for the rebuild:** Incomplete families need a different action set — "Complete setup" or "Send reminder" CTA rather than Delete, which would be dangerous on partially onboarded records; the rebuild should differentiate the action column per-status view.

---

### `management-families-status-stopped` — Families List: Stopped

- **Purpose:** Lists families whose subscription has been stopped (distinct from Suspended or Inactive).
- **Key sections / flows:** Same 12-column template, 0 rows, 7 KPI cards, Filter accordion. Heading renders raw i18n key `messages.Stopped Families` (same translation bug).
- **Key SAFE actions:** Filter, search, pagination.
- **Key MUTATING/dangerous actions:** Create, Delete, Update Suspension POST, filter Submit.
- **Important modals/forms:** Update Suspension modal.
- **Variant-of:** `management-families-status-active` (route-segment status variant: `/status/Stopped`)
- **Broken/empty:** 0 rows — empty data state. **Translation bug detected:** heading shows raw key `messages.Stopped Families`.
- **UX improvement for the rebuild:** Confirm with backend the semantic difference between Stopped vs Suspended vs Inactive — they may warrant different workflows; in the rebuild, make status transitions explicit with labeled action buttons and status-specific icons/colors in the KPI row.

---

### `management-families-status-suspended` — Families List: Suspended

- **Purpose:** Lists families currently suspended (on hold, typically awaiting return date).
- **Key sections / flows:** Same 12-column template, 0 rows, "Suspended Families" heading, 7 KPI cards, Filter accordion. The "Update Suspension" modal is especially relevant here for managing return dates.
- **Key SAFE actions:** Filter, search, pagination.
- **Key MUTATING/dangerous actions:** Create, Delete, Update Suspension (sets `returned_at` date and note — dangerous because it controls when a suspended family is re-activated), filter Submit.
- **Important modals/forms:** "Update Suspension" modal — `returned_at` (required date input, in student timezone), `note` textarea. This is the key action on this view.
- **Variant-of:** `management-families-status-active` (route-segment status variant: `/status/Suspended`)
- **Broken/empty:** 0 rows — empty data state.
- **UX improvement for the rebuild:** The Update Suspension modal label says "Returned date ( (Student time))" — this is garbled/untranslated. In the rebuild, clearly label this field "Return Date (student local time)" and show the student's timezone next to the date picker; add a validation that return date must be in the future.

---

### `management-families-status-trial` — Families List: On Trial

- **Purpose:** Lists families in trial/evaluation status (prospective subscribers evaluating the service).
- **Key sections / flows:** Same 12-column template, 0 rows, "Trial Families" heading, 7 KPI cards, Filter accordion.
- **Key SAFE actions:** Filter, search, pagination.
- **Key MUTATING/dangerous actions:** Create, Delete, Update Suspension POST, filter Submit.
- **Important modals/forms:** Update Suspension modal same.
- **Variant-of:** `management-families-status-active` (route-segment status variant: `/status/Trial`)
- **Broken/empty:** 0 rows — empty data state.
- **UX improvement for the rebuild:** Trial families represent conversion opportunities — the rebuild should add a "Convert to Active" action and a "Schedule Demo/Trial Extension" action specific to this status view, rather than exposing the generic Delete as the primary action.

---

### `management-family-feedback-categories` — Family Feedback Categories (KPIs)

- **Purpose:** Admin management of feedback categories used for tracking family/student meeting KPIs; essentially a lookup/reference table CRUD.
- **Key sections / flows:** Single section "Feedback Categories"; 5-column table (#, Name, Description, Status, Settings); "Create category" link button; table shows 0 rows (no categories configured in test env); minimal filter/search (no dedicated filter panel).
- **Key SAFE actions:** Navigate to create category page, view list.
- **Key MUTATING/dangerous actions:** Create category (link/navigation to creation form); per-row Settings actions (edit/delete implied by "Settings" column — not captured in detail since 0 rows).
- **Important modals/forms:** No inline modal for create — navigates to a separate page. The "Loading..." modal captured appears to be a generic lazy-load placeholder.
- **Variant-of:** Unique template (standalone CRUD list for feedback category configuration)
- **Broken/empty:** Table shows "No data found" — 0 rows, empty data state. Page loaded 200.
- **UX improvement for the rebuild:** The empty state shows nothing actionable — rebuild should show an empty-state illustration with a "Create your first feedback category" CTA and a brief description of what categories are used for, since this is a setup step.

---

### `management-settings-integrations-whatsapp-families-insights` — WhatsApp Integration: Families Insights

- **Purpose:** A diagnostic/insights view within the WhatsApp integration settings showing which families are NOT connected to a WhatsApp group, helping admins identify communication gaps.
- **Key sections / flows:** Single card "Names of Null groups" with explanatory text "Check out which families are not connected to WhatsApp"; 5-column table (#, Family name, Phone number, Group Name, Status); 2 rows in test data (one family has Group Name "." — essentially null/empty, one has a proper group name).
- **Key SAFE actions:** View the list, paginate.
- **Key MUTATING/dangerous actions:** None directly on this page — read-only diagnostic view. Global chrome mutations only (shortcuts, notifications).
- **Important modals/forms:** None meaningful on this page (only global chrome modals).
- **Variant-of:** Unique template (WhatsApp integration sub-page, distinct from families list)
- **Broken/empty:** Not broken. Data present (2 rows). Group Name shows "." for one family — this is a data quality issue (null group stored as ".").
- **UX improvement for the rebuild:** Add a direct action button per row ("Assign to WhatsApp group" or "Send invite") so admins can fix the gap without navigating away; currently the view is information-only with no remediation path from this screen. Also: the "." group name should be displayed as "—" or "Not assigned".

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers two related sub-systems within the Families / Guardians module:
1. **Families Status List** (`/families/status/{Status}`) — the core CRUD list of family/parent accounts, segmented by enrollment lifecycle status (Trial, Incomplete, Active, Stopped, Suspended, Inactive, Deleted). Each family has: name, email, phone, join date, username, course type, children count, country, hour rate, total hours, and a suspension return date.
2. **Student Feedback by Status** (`/families/feedback/students?status=*`) — a cross-entity view showing feedback scheduling progress (last feedback date, next meeting, meeting manager) for students grouped by their family's status.
3. **Family Feedback Categories** — a configuration CRUD for the KPI categories used in feedback meetings.
4. **WhatsApp Integration Insights** — a diagnostic read-only view for families not mapped to WhatsApp groups.

**Distinct page templates vs variant count:**
- **Unique templates: 4**
  1. `management-families-status-active` — Families status list (12-col table + 7 KPI cards + full filter panel + Update Suspension modal + Delete per row)
  2. `management-families-feedback-students` (base, with `?status=Suspended` and `?status=Trial` as query-param variants) — student feedback table (7-col, simpler, Add Feedback modal)
  3. `management-family-feedback-categories` — feedback category CRUD (5-col table, no inline filter)
  4. `management-settings-integrations-whatsapp-families-insights` — read-only WhatsApp gap diagnostic (5-col table)
- **Variant pages: 8**
  - `/status/Active`, `/status/Deleted`, `/status/Inactive`, `/status/Incomplete`, `/status/Stopped`, `/status/Suspended`, `/status/Trial` = 7 route-segment variants of template 1
  - `/families/index/filter?payment_methods[0]=1` = 1 query-param variant of template 1 (payment method pre-applied)
  - `?status=Suspended` and `?status=Trial` on feedback/students = 2 query-param variants of template 2 (both also read in this batch)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- **Update Suspension modal** (POST `/management/update-returning`): `returned_at` date + `note` — DANGEROUS; controls when a family re-activates from suspension. Present on all 7 status variants even though only Suspended families need it.
- **Add Feedback Meeting modal** (POST `/management/families/feedback`): `date` + `user_id` (manager) — MUTATING; schedules a meeting and assigns a manager to a family.
- **Delete per row** (POST with `_method=DELETE` to `/management/families/{id}`): DANGEROUS; permanently or soft-deletes a family record. No confirmation dialog captured.
- **Filter accordion** (GET `/management/families/index/filter`): safe; 48 checkbox/input fields across invoice type, cost type, course type, payment method, currency, hour rate, children count.
- **Create category** (navigation link): safe navigation; leads to separate form page.

**Improvements for the new platform:**

1. **Consolidate status navigation into tabs/pills** on a single Families list page (`/families`) with a status tab bar (Trial | Incomplete | Active | Stopped | Suspended | Inactive | Deleted). Eliminate 7 separate URL-per-status to reduce confusion and allow quick status switching without full-page reload.

2. **Fix raw i18n key leakage**: Two pages (`Stopped`, `Inactive`) render raw keys `messages.Stopped Families` / `messages.Inactive Families`. The new frontend must never expose translation keys; implement fallback strings and locale test coverage.

3. **Confirm Delete with a named modal**: Delete action fires a POST with no visible confirmation. Rebuild must require a typed-name or explicit confirmation dialog before deleting a family, with clear warning text and a red destructive-action button.

4. **Update Suspension modal UX**: The current "Returned date ( (Student time))" label is garbled. Rebuild with: clear label "Return Date", timezone shown adjacently (student's local TZ), date picker restricted to future dates only, and a mandatory notes field with character minimum.

5. **Status-appropriate action sets**: The 12-column actions column shows the same row actions (Show Details / Edit / Delete) regardless of status. Rebuild should surface status-relevant actions: Trial → "Convert to Active"; Incomplete → "Send setup reminder"; Suspended → "Update Return Date"; Deleted → "Restore"; Inactive → "Re-activate".

6. **Filter panel rebuild**: The 48-field accordion filter should become a slide-in drawer with grouped sections (Billing, Subscription Type, Payment Methods, Currency, Household), applied-filters chips above the table, and a "Clear all filters" button.

7. **WhatsApp insights remediation CTA**: The families-not-in-WhatsApp-group page is read-only. Add "Assign to group" action per row and show the count of unlinked families as a dashboard KPI.

8. **Feedback Categories empty state**: The feedback categories list is empty in test data with no empty-state guidance. Add an illustration + description + "Create first category" CTA.

9. **RTL / Arabic data**: Two test families have Arabic names (الطالبة لمار حسن). The UI is LTR-only (lang=en, dir=ltr). The new platform must handle RTL-mixed content (Arabic names in LTR tables) properly — use `dir="auto"` on name cells and ensure text alignment is correct for Arabic content in LTR layouts.

10. **Logo 404**: Every page shows a 404 for `storage/uploads/logo.png`. The new platform should use a CDN-served or fallback logo asset.

**Anything that needs owner/backend confirmation:**
- Confirm the semantic distinctions between Stopped, Suspended, Inactive — are these three separate business states with different transition rules, or are some aliases? The Update Suspension modal appears on all statuses regardless, which is unexpected.
- Confirm whether Delete is soft or hard delete for families — if soft, the Deleted view should have a Restore action; if hard, deletion must require even stronger confirmation.
- Confirm whether the `.` group name in WhatsApp insights is a backend null-storage artifact or intentional; the display should be sanitized.
- Confirm the i18n keys for Stopped and Inactive status labels — are these missing translations or are the keys correct but the locale file is incomplete?
- Confirm the payment method represented by `payment_methods[0]=1` — the filter label shows "احمد محمد" (a person's name) as the sole payment method option, which seems like a data modelling oddity (payment methods stored as user records?).

---
# Batch 12 — Admin · Accounting Transactions, Invoice Analysis, Invoice List, Invoice Download, Invoice Creation

---

### `management-accounting-transaction-invoices` — Accounting Transaction: Invoices

- **Purpose:** Tabular ledger of invoice-based accounting transactions, filterable by family and date, within a three-tab view (Sessions / Invoices / Salary).
- **Key sections / flows:** Tabs: Sessions | Invoices | Salary (active). Filter panel (accordion): family_id select, date range text. Transaction table (11 columns): #, Serial, Invoice Date, Total Net Price, Total Additions, Discount Value, Fees Value, Other Effects, Final Total Price, Paid At, Family — 0 rows (empty). Currency Rates table (16 rows) accessible from EUR button.
- **Key SAFE actions:** Filter by family, filter by date, navigate between tabs, view currency rates modal.
- **Key MUTATING/dangerous actions:** Save currency rates (via "Save" in Currency Rates modal — posts to `management/shortcuts` or similar — needs confirmation).
- **Important modals/forms:** Currency Rates modal — base AED, 16 currencies, editable rate fields, Save button — mutating. "Loading…" generic loading modal.
- **Variant-of:** Unique template (base for transaction tab views).
- **Broken/empty:** Main transaction table shows 0 rows (empty data state, not an error).
- **UX improvement for the rebuild:** Replace the collapsible accordion filter with a persistent inline filter bar that shows active filter chips; the empty table state should display a meaningful illustration and "No transactions found for this period" message instead of a bare empty table row.

---

### `management-accounting-transaction-salary` — Accounting Transaction: Salary

- **Purpose:** Monthly salary totals ledger (teachers and staff) within the same three-tab transaction view, filterable by date.
- **Key sections / flows:** Tabs: Sessions | Invoices | Salary (active). Filter panel: date range text. Transaction table (4 columns): #, Month, Teachers Total Salary, Staff Total Salary — 0 rows. Currency Rates modal (same as session/invoices tab). EUR toggle button in header opens currency rates.
- **Key SAFE actions:** Filter by date, switch tabs, view/navigate.
- **Key MUTATING/dangerous actions:** Save currency rates (modal with Save).
- **Important modals/forms:** Currency Rates modal — same as base session template.
- **Variant-of:** `management-accounting-transaction-session` (different tab, different columns).
- **Broken/empty:** Table shows 0 rows.
- **UX improvement for the rebuild:** Add salary totals KPI cards above the table (total teachers salary, total staff salary for the period) so the "0 row but still meaningful summary" issue is resolved.

---

### `management-accounting-transaction-session` — Accounting Transaction: Sessions (Base)

- **Purpose:** Session-by-session financial ledger showing per-session student cost, teacher cost, and academy profit — the base/default tab of the transaction view.
- **Key sections / flows:** KPI header row: session count (0), attendance %, teacher EUR, student EUR, total profit EUR. Tabs: Sessions (active) | Invoices | Salary. Filter panel (accordion): date range, teacher_id, student_id, family_id, duration selects. Transaction table (10 columns): #, Student Name, Family, Teacher Name, Admin Date, Duration, Student [cost], Teacher [cost], Profit, Status — 0 rows (empty). Currency Rates table (sidebar modal).
- **Key SAFE actions:** Filter (GET), tab switch, view currency rates, navigate months with Current Month / Last Month shortcuts.
- **Key MUTATING/dangerous actions:** Save currency rates (modal).
- **Important modals/forms:** Currency Rates modal — 16 currency rate inputs, Save button, triggered by EUR button in header. "Loading…" modal.
- **Variant-of:** Unique template (base session transaction view).
- **Broken/empty:** Table shows "No data found" row — data exists but test account has no sessions.
- **UX improvement for the rebuild:** Surface status quick-filter chips (Attend / Student Absent / Teacher Absent) as tab pills directly on the table header instead of hidden in a query-param link, so the three status variants are discoverable without needing deep knowledge of the URL scheme.

---

### `management-accounting-transaction-session-status-attend` — Session Transactions: Attend Status

- **Purpose:** Identical session transaction view filtered to `status=attend` only.
- **Key sections / flows:** Same KPI cards (all 0), same 10-column table, same filters, same modals as the base session page.
- **Key SAFE actions:** Same as base template.
- **Key MUTATING/dangerous actions:** Save currency rates.
- **Important modals/forms:** Same Currency Rates modal.
- **Variant-of:** `management-accounting-transaction-session` (`?status=attend` param variant).
- **Broken/empty:** No data found.
- **UX improvement for the rebuild:** Status filter should be a UI control, not a URL change — collapse into the base page via a tab/chip.

---

### `management-accounting-transaction-session-status-student-absent` — Session Transactions: Student Absent Status

- **Purpose:** Session transaction view filtered to `status=student-absent`.
- **Key sections / flows:** Identical structure to base session page and attend variant.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** Save currency rates.
- **Important modals/forms:** Currency Rates modal.
- **Variant-of:** `management-accounting-transaction-session` (`?status=student-absent` param variant).
- **Broken/empty:** No data found.
- **UX improvement for the rebuild:** See attend variant — consolidate into status chip filter on the base template.

---

### `management-accounting-transaction-session-status-teacher-absent` — Session Transactions: Teacher Absent Status

- **Purpose:** Session transaction view filtered to `status=teacher-absent`.
- **Key sections / flows:** Identical structure to the other two status variants.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** Save currency rates.
- **Important modals/forms:** Currency Rates modal.
- **Variant-of:** `management-accounting-transaction-session` (`?status=teacher-absent` param variant).
- **Broken/empty:** No data found.
- **UX improvement for the rebuild:** Same as other status variants.

---

### `management-analysis-invoices` — Invoice Analytics Dashboard

- **Purpose:** Financial analytics overview of invoices — aggregate KPIs plus monthly and cumulative charts, broken down by family.
- **Key sections / flows:** Sidebar tab: "Profit and Losses / Invoices". KPI cards (6): Total Before Discount, Total After Discount, Discount, Paid (with count), UnPaid (with count), Overdue (with count) — all 0 AED. Two chart areas: "Total Invoices by Month" (bar chart) and "Cumulative Total of Invoices by Date" (line chart). Status multi-checkbox filter: Paid / Due / Overdue (GET, shown as status=3 dropdown). Family breakdown table (5 cols): #, Family name, Paid, Due, Overdue — empty. Date range filter via flatpickr.
- **Key SAFE actions:** Filter by status checkboxes, filter by date range, view charts, navigate sidebar tabs.
- **Key MUTATING/dangerous actions:** None (all filters are GET).
- **Important modals/forms:** No meaningful modals (only global Loading/Recent Searches/Add shortcuts chrome).
- **Variant-of:** Unique template.
- **Broken/empty:** All KPIs are 0 AED; table shows "No Data found"; charts are empty (no data in test account).
- **UX improvement for the rebuild:** Replace the collapsible status filter with an always-visible segmented toggle (Paid / Due / Overdue) so the chart and table update inline; add skeleton placeholders for the charts during load rather than blank chart canvases.

---

### `management-downlaod` — Invoice Download/Export Page (Base)

- **Purpose:** Filterable invoice list specifically for downloading/exporting, including KPI counts (all, unpaid, paid, deleted) — this is actually the `/management/invoices?status=SoftDelete` page renamed in the slug as "downlaod" (typo in route).
- **Key sections / flows:** KPI cards (4): all invoices 0, unpaid invoices 0, paid invoices 0, Deleted Invoices 0. Filter accordion: Date (flatpickr range), Filter By (Due Date / Payment Date), Currency (16 options), Gateway (named gateways). Invoice table (10 cols): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions — 0 rows. Download link + Export button above table. "New Transaction" modal (via row action, see below).
- **Key SAFE actions:** Filter (GET), Download link (navigation), Export (navigation).
- **Key MUTATING/dangerous actions:** "Submit" in New Transaction modal — POSTs to `/management/accountant/store-transaction` with fields: transaction_id, date_payment, basic, additional, taxes, total, currency, gateway. "Cancel" (reset form). Must NOT be auto-fired.
- **Important modals/forms:** New Transaction modal — fields: Transaction ID, Payment Date, Basic amount, Additional, Taxes, Total (auto-calc), Currency select (multi-currency), Gateway select. Dangerous: stores a financial transaction.
- **Variant-of:** Unique template (base for the download/invoice list with export).
- **Broken/empty:** All KPI counts are 0, table empty ("No data found"). Note: actual URL resolves to `?status=SoftDelete` which is the deleted invoices filter, making the "Deleted Invoices" KPI the expected active filter — but all are 0.
- **UX improvement for the rebuild:** Rename the route from the typo "downlaod" to "download"; separate the "Deleted Invoices" filter clearly from the All/Paid/Unpaid summary so the user understands they may be viewing a soft-deleted subset; the New Transaction modal should require explicit confirmation before submission.

---

### `management-downlaod-date-2026-06-01-to-2026-06-30` — Invoice Download: Date Range Filter

- **Purpose:** Same download/invoice list page with `date=2026-06-01 to 2026-06-30` pre-applied (and `status=SoftDelete` from the crawler context).
- **Key sections / flows:** Identical to base download template; date range populated in filter; all counts still 0.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** New Transaction modal (Submit).
- **Important modals/forms:** New Transaction modal — same fields.
- **Variant-of:** `management-downlaod` (date query-param variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base template.

---

### `management-downlaod-date-2026-06-01-to-2026-06-30-date-type-date-payment-status` — Invoice Download: Date+DateType(payment)+Status(Paid)

- **Purpose:** Download/invoice list filtered by date range, date_type=date_payment, status=Paid (though rendered URL also has status=SoftDelete from crawler context — intersection).
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (multi-param variant: date + date_type + status).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base template.

---

### `management-downlaod-date-2026-06-01-to-2026-06-30-date-type-due-date-status-unpa` — Invoice Download: Date+DateType(due_date)+Status(Unpaid)

- **Purpose:** Download/invoice list filtered by date range, date_type=due_date, status=Unpaid.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same as base.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (date + date_type=due_date + status=Unpaid variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base template.

---

### `management-downlaod-status-all` — Invoice Download: Status=All

- **Purpose:** Download/invoice list filtered to status=All.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=All` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-downlaod-status-paid` — Invoice Download: Status=Paid

- **Purpose:** Download/invoice list filtered to status=Paid.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=Paid` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-downlaod-status-softdelete` — Invoice Download: Status=SoftDelete

- **Purpose:** Download/invoice list filtered to soft-deleted invoices.
- **Key sections / flows:** Identical to base download template; the Deleted Invoices KPI is the semantically active one on this view.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=SoftDelete` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-downlaod-status-unpaid` — Invoice Download: Status=Unpaid

- **Purpose:** Download/invoice list filtered to status=Unpaid.
- **Key sections / flows:** Identical to base download template.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** New Transaction modal.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-downlaod` (`?status=Unpaid` variant).
- **Broken/empty:** All 0.
- **UX improvement for the rebuild:** See base.

---

### `management-invoices` — Invoice List (Main)

- **Purpose:** Primary admin invoice management list — the canonical page for browsing, filtering, downloading, exporting, and adding transactions to invoices.
- **Key sections / flows:** Title: "All Invoices". KPI cards (4): all invoices 0, unpaid 0, paid 0, Deleted Invoices 0. Filter accordion: Date range, Filter By (Due Date / Payment Date), Currency, Gateway selects. Invoice table (10 cols): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions — empty. Download link + Export button. New Transaction modal (row action). Note: a status=SoftDelete link appears in the discovered links, routing to the downlaod route.
- **Key SAFE actions:** Filter (GET), Download, Export (navigation links).
- **Key MUTATING/dangerous actions:** New Transaction modal Submit — POSTs to `/management/accountant/store-transaction` (Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency, Gateway). Must require explicit user confirmation.
- **Important modals/forms:** New Transaction modal — financial transaction entry (see above). This is the most consequential mutating action on this page.
- **Variant-of:** Unique template (root invoice list; the downlaod variants are secondary entry points to the same list with different status filters).
- **Broken/empty:** Table shows "No data found"; all KPI counts are 0.
- **UX improvement for the rebuild:** Move the status filter tabs (All / Paid / Unpaid / Deleted) to persistent pill/tab controls above the table rather than hidden query-param links, and add an explicit confirmation dialog with invoice summary before the New Transaction modal's Submit fires.

---

### `management-invoices-create-parent-invoice-1` — Create Invoice for Family #1

- **Purpose:** Full invoice creation form for a specific family (family_id=1), pre-loaded with that family's course data and existing sessions as line items.
- **Key sections / flows:** Two-panel layout: Invoice summary card (left — Invoice To: family info, Bill To: company info, Total Due: EUR 30.90, invoice #, date fields) + form panel (right). Courses table (6 cols): Start Date, Serial, Item, Student, Price, (delete action) — 1 row pre-filled. "Add Course" dropdown + "Add Item" button for manual line items. Discount Options section: price, discount %, fees %, additional amount, adjustment type, adjustment value, adjustment count, note textarea. Payment method select. "Send Notification" checkbox. Submit Invoice button. Sessions table shows 1 live session: arabic course, student محمد احمد, 30 EUR.
- **Key SAFE actions:** View invoice preview, change payment method selection, change date fields (read preview update).
- **Key MUTATING/dangerous actions:** Delete course row (removes line item, dynamically), Add Course (appends line item), Add Item (appends custom line item), Submit Invoice (POST to `/management/invoices` — creates invoice record and optionally sends notification to family). "Send Notification" checkbox if checked triggers a message send on submit — doubly dangerous.
- **Important modals/forms:** Invoice form (inline, not modal): serial, date, due_date, family_id (hidden), course_id[] (hidden), price, discount, fees, additional, adjustment_type, adjustment_value, adjustment_count, note, paymentMethod, sendMessage. Key dangerous fields: sendMessage (will trigger push notification to family on submit).
- **Variant-of:** Unique template (create invoice form, family-scoped by URL parameter).
- **Broken/empty:** No errors; shows real data (one session pre-loaded for family 1).
- **UX improvement for the rebuild:** The "Send Notification" checkbox should default to unchecked and be visually separated with an explicit label ("Notify family by message when invoice is created"), and Submit Invoice should show a confirmation dialog summarizing total due, recipient, and notification status before POSTing.

---

### `management-invoices-create-parent-invoice-2` — Create Invoice for Family #2

- **Purpose:** Same invoice creation form for a different family (family_id=2, "الطالبة لمار حسن"), with no pre-loaded sessions.
- **Key sections / flows:** Same two-panel layout as family #1. Total Due: GBP 0.00. Courses table: empty ("No data found"). Same form fields, same Discount Options, same payment/notification controls. No existing sessions for this family.
- **Key SAFE actions:** Same as family #1 create.
- **Key MUTATING/dangerous actions:** Add Course, Add Item, Submit Invoice (POST), Send Notification. Same danger profile as family #1.
- **Important modals/forms:** Same invoice creation form.
- **Variant-of:** `management-invoices-create-parent-invoice-1` (same template, different family_id URL param; the empty sessions state is noted).
- **Broken/empty:** Courses table empty (no sessions for this family in the period) — not an error, valid empty state.
- **UX improvement for the rebuild:** When no sessions exist for the family, show a clear empty-state prompt ("No courses found for this family — add a course manually or check if sessions have been logged") rather than a bare empty table row.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the core Accounting / Finance area of the admin dashboard, specifically: (1) the three-tab Transaction ledger (Sessions, Invoices, Salary); (2) the Invoice Analytics dashboard; (3) the Invoice List with download/export; (4) the Invoice Creation form. Core entities: Invoice (serial, date, due_date, family, status, line items, discounts, total), Transaction (id, payment_date, amounts, currency, gateway), Session (student, teacher, date, duration, cost components, profit, status — attend/student-absent/teacher-absent), Salary aggregates (month, teacher total, staff total).

**Distinct page templates vs variant count:**
- Unique templates: 6
  1. `management-accounting-transaction-session` — Session transaction ledger (base)
  2. `management-accounting-transaction-invoices` — Invoice transaction ledger
  3. `management-accounting-transaction-salary` — Salary transaction ledger
  4. `management-analysis-invoices` — Invoice analytics dashboard
  5. `management-invoices` — Invoice list with download/export/transaction
  6. `management-invoices-create-parent-invoice-{id}` — Create invoice form
- Variant pages: 12
  - Session status variants: 3 (`?status=attend`, `?status=student-absent`, `?status=teacher-absent`)
  - Invoice download/status variants: 7 (base download, status=All, Paid, Unpaid, SoftDelete, date-filtered, date+type+status filtered)
  - Create invoice family variants: 2 (family 1, family 2 — same template, different family_id)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Currency Rates modal (present on all 3 transaction tabs + session status variants): editing and **saving exchange rates** is a mutating global action — affects all financial calculations across the platform. Must require confirmation or role-level protection.
- New Transaction modal (on invoice list + all download variants): **store-transaction POST** creates a financial ledger entry — no confirmation dialog present. Must add explicit confirm step.
- Submit Invoice form (create-invoice pages): **creates invoice + optionally sends notification** — needs a summary confirmation dialog and clear opt-in for the notification.
- Filter forms across all transaction pages: all GET — safe.
- Status filter on invoice list: currently implemented as separate URL routes (`?status=Paid`, `?status=SoftDelete`, etc.) — not UI tabs, making the interface non-obvious.

**Improvements for the new platform:**
1. **Navigation/URL structure:** Consolidate the session transaction status variants into a single route with an in-page filter chip/tab group. Do the same for the invoice download status variants — they should all be states of one invoice list page, not separate routes. Fix the "downlaod" typo in the route.
2. **Dashboard/KPIs:** On the analytics page, use non-zero-state skeleton loaders and an empty illustration instead of empty chart canvases. Add period-selector (this month / last month / custom) as a top-level UI control, not buried in an accordion filter.
3. **Tables:** All tables in this batch had empty data in the test account. Build explicit empty-state components per entity: "No transactions for this period", "No invoices found", etc. with actionable CTAs. All tables need sortable columns.
4. **Modals:** Currency Rates modal must have a confirmation step before Save — this is a global financial setting. New Transaction modal must show a summary of what is being recorded and require explicit confirm. Both should trap focus and support Escape-to-close.
5. **Invoice creation form:** Pre-fill date to today and due_date to +30 days as sensible defaults. Show running total in real time as courses/items are added/removed. "Send Notification" checkbox must be unchecked by default and explained in plain language. Submit should open a confirm dialog: "Create invoice of EUR X.XX for [Family Name]? Notification will be sent." 
6. **Status colors:** Invoice statuses (Paid, Unpaid, Overdue, SoftDelete/Deleted) need consistent color coding across the list, KPI cards, and the create form. Use green/amber/red/gray semantic tokens.
7. **RTL/mobile:** None of the pages in this batch are RTL, but the family names appearing in Arabic (محمد احمد, الطالبة لمار حسن) confirm the data is bilingual. The invoice creation form will need RTL support for Arabic family names in the "Invoice To" section.
8. **Exports:** Download and Export buttons are simple anchor links — in the rebuild, expose these as a proper Export dialog with format selection (CSV/PDF) and date-range confirmation.
9. **Currency:** The multi-currency architecture (16 currencies, base AED) is a core financial primitive. The rebuild should surface the active display currency clearly on every financial page, and the Currency Rates modal should be a dedicated settings screen, not an afterthought flyout.
10. **Accessibility:** The three-tab transaction view uses no ARIA roles on the tab strip. All filter accordions have no keyboard trap or ARIA expanded state. The invoice form fields are missing labels in several cases (date field uses same label text "Invoice #" as the serial field — placeholder-as-label anti-pattern).

**Needs owner/backend confirmation:**
- Does saving Currency Rates affect historical invoices or only new ones? Clarify the impact scope before showing the modal as a casual click target.
- What does the "Send Notification" on invoice creation actually send (email, SMS, in-app)? This affects UX copy in the confirmation dialog.
- Is `management/downlaod` (the typo route) the canonical download URL or an alias? Safe to rename in the rebuild?
- What does the "New Transaction" modal (store-transaction) do exactly — record a payment received against an invoice, or a generic ledger entry? The field names (basic, additional, taxes) suggest the latter but it needs confirmation.
- The Salary transaction tab shows 0 rows — confirm whether staff salary data flows in automatically from the salaries module or requires manual entry.

---
# Batch 13 — admin · Payments / Invoices (List of Invoices + Monthly Invoices)

---

### `management-invoices-date-2026-06-01-to-2026-06-30` — Invoices (Date Range Filter, no status)

- **Purpose:** Invoice list filtered by a date range, status defaulting to "All Invoices".
- **Key sections / flows:** Four KPI summary cards (all invoices, unpaid, paid, deleted — all 0 here); collapsible Filter panel (date range, date-type selector, currency, gateway); paginated invoice table (10 cols: #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total in AED, Status, Actions); Download and Export links.
- **Key SAFE actions:** Filter (GET), Download, Export, pagination navigation.
- **Key MUTATING/dangerous actions:** "Submit" on the "New Transaction" modal (POST to `/management/accountant/store-transaction`); "Cancel" (reset); "Save" on Add Shortcuts.
- **Important modals/forms:** "New Transaction" modal — fields: Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency (multi-currency select), Gateway. This directly writes an accounting transaction against an invoice and must never be auto-fired.
- **Variant-of:** This is the base template for all 17 `management-invoices-*` pages in this batch; the only differences across variants are `status` and `date_type` query params.
- **Broken/empty:** All KPI counts are 0 and the table shows "No data found" — no live invoice data was present during the crawl.
- **UX improvement for the rebuild:** Replace the collapsible accordion filter with a persistent inline filter bar with live URL-param binding, so the active filter state is always visible without a second click.

---

### `management-invoices-date-2026-06-01-to-2026-06-30-status-paid-date-type-date-pay` — Invoices (Date=Jun, Status=Paid, DateType=Payment Date)

- **Purpose:** Same invoice list template narrowed to Paid status and filtered by payment date within a specific month.
- **Key sections / flows:** Same as base — 4 KPI cards, collapsible filter (all controls retained), 10-col table. Page heading reads "Paid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save (shortcuts).
- **Important modals/forms:** Same "New Transaction" modal present on page even though status=Paid (anomalous — should only appear for unpaid invoices; confirm with backend whether marking paid invoices is blocked server-side).
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` (base template, status+date_type params only differ).
- **Broken/empty:** Table shows "No data found".
- **UX improvement for the rebuild:** Add a visual "active status tab" indicator (pill or underline) so users can clearly see which status filter is applied without reading URL params.

---

### `management-invoices-date-2026-06-01-to-2026-06-30-status-unpaid-date-type-due-da` — Invoices (Date=Jun, Status=Unpaid, DateType=Due Date)

- **Purpose:** Invoice list filtered to Unpaid status with due-date range for June.
- **Key sections / flows:** Identical page structure. Heading reads "Unpaid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (highest risk — marks payment on an unpaid invoice), Cancel, Save shortcuts.
- **Important modals/forms:** "New Transaction" modal — same 8 fields. This is the primary action for processing a payment on an unpaid invoice and requires explicit confirmation.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Table empty, all KPIs 0.
- **UX improvement for the rebuild:** On the New Transaction modal, add a confirmation step (review-before-submit) before posting to `/store-transaction`, and auto-fill invoice total/currency from row context rather than requiring manual entry.

---

### `management-invoices-status-all` — Invoices (Status=All)

- **Purpose:** Full unfiltered invoice list with status=All; this is effectively the "default" view of the invoice module reachable via KPI card link.
- **Key sections / flows:** Same 4 KPI cards, 10-col table, collapsible filter. Heading "All Invoices". Discovered directly from the `/management/invoices` route via sidebar link.
- **Key SAFE actions:** Filter, Download, Export, pagination.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save shortcuts.
- **Important modals/forms:** Same "New Transaction" modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template (status param only).
- **Broken/empty:** All KPIs 0, table empty.
- **UX improvement for the rebuild:** Surface the KPI card counts as clickable tab filters (All / Unpaid / Paid / Deleted) directly on the page rather than separate URL navigations.

---

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=All, Date=Jun, DateType=empty)

- **Purpose:** Status=All with a date range applied but date_type left blank (degenerate filter state — date range present without a date dimension).
- **Key sections / flows:** Identical template; heading "All Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty table/KPIs. Note: `date_type` is empty string — the backend accepts this but it's a degenerate case. Rebuild should validate that date_type is required when a date range is supplied.
- **UX improvement for the rebuild:** Require date_type selection before enabling the date range picker, preventing this empty-key filter state.

---

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-date-paym` — Invoices (Status=All, Date=Jun, DateType=Payment Date)

- **Purpose:** All-status invoice list filtered by payment date in June.
- **Key sections / flows:** Same base template. Heading "All Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty table/KPIs. Notably 356 network requests captured (vs ~215 for simpler pages), suggesting extra background polling when filters are applied.
- **UX improvement for the rebuild:** Cache filter results locally with a stale-while-revalidate pattern; avoid polling on every param change.

---

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-due-date` — Invoices (Status=All, Date=Jun, DateType=Due Date)

- **Purpose:** All-status list filtered by due date in June.
- **Key sections / flows:** Identical base template. Heading "All Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 351 network requests.
- **UX improvement for the rebuild:** Show a clear "No results for this date range" empty state with a "Clear filters" action, rather than a generic "No data found" row inside the table.

---

### `management-invoices-status-paid` — Invoices (Status=Paid)

- **Purpose:** Invoice list filtered to Paid status, no date range — shows all paid invoices ever.
- **Key sections / flows:** Same template, heading "Paid Invoices"; 4 KPI cards; 10-col table.
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (anomalous on paid invoices — needs server-side guard), Cancel, Save shortcuts.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template (status param only).
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** On status=Paid, either hide or visually disable the "New Transaction" row action to prevent confusion — or show a "Payment already recorded" tooltip.

---

### `management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=Paid, Date=Jun, DateType=empty)

- **Purpose:** Paid invoices with date range but empty date_type — same degenerate filter state as the All variant.
- **Key sections / flows:** Identical base template, heading "Paid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Enforce date_type requirement on the filter form (same as noted above).

---

### `management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type-due-date` — Invoices (Status=Paid, Date=Jun, DateType=Due Date)

- **Purpose:** Paid invoices filtered by due date in June.
- **Key sections / flows:** Same base template, heading "Paid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 352 requests captured.
- **UX improvement for the rebuild:** For the Paid+due-date filter combo, provide a visual summary chip showing "Paid | Due: Jun 2026" so the filter state is scannable at a glance.

---

### `management-invoices-status-softdelete` — Invoices (Status=SoftDelete)

- **Purpose:** Invoice trash bin — shows invoices that have been soft-deleted; distinct from the other status tabs because these records are not permanently removed.
- **Key sections / flows:** Same base template, heading "Deleted Invoices". All 4 KPI cards still present including "Deleted Invoices" counter. Table same 10 columns with Actions (presumably restore/hard-delete actions in the real data).
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (should not apply to deleted invoices — confirm server-side guard), Cancel, Save. Actions in the table on real data likely include Restore and Permanent Delete — both dangerous.
- **Important modals/forms:** Same New Transaction modal present (likely vestigial for this view).
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Make the SoftDelete tab visually distinct (e.g., red/danger tinting, "Trash" icon) and surface Restore and Permanent Delete as explicit row actions with separate confirm dialogs.

---

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=SoftDelete, Date=Jun, DateType=empty)

- **Purpose:** Deleted invoices with a date range but empty date_type.
- **Key sections / flows:** Identical base template, heading "Deleted Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 348 requests.
- **UX improvement for the rebuild:** Require date_type before accepting date range (consistent fix across all variants).

---

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-da` — Invoices (Status=SoftDelete, Date=Jun, DateType=Payment Date)

- **Purpose:** Deleted invoices filtered by payment date in June.
- **Key sections / flows:** Same base template, heading "Deleted Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 358 requests captured.
- **UX improvement for the rebuild:** For deleted records, lock the transaction modal; only show Restore action.

---

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-du` — Invoices (Status=SoftDelete, Date=Jun, DateType=Due Date)

- **Purpose:** Deleted invoices filtered by due date in June.
- **Key sections / flows:** Same base template, heading "Deleted Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Same as above — lock mutating actions for soft-deleted records.

---

### `management-invoices-status-unpaid` — Invoices (Status=Unpaid)

- **Purpose:** Invoice list showing all unpaid invoices without a date constraint — the primary AR (accounts receivable) view for the admin.
- **Key sections / flows:** Same base template, heading "Unpaid Invoices"; 4 KPI cards; 10-col table. The New Transaction action is most contextually relevant here.
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit (core payment-recording action — highest risk), Cancel, Save shortcuts.
- **Important modals/forms:** "New Transaction" modal — Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency, Gateway. Fields have no visible required-field indicators in the current form.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** All financial fields in New Transaction must be validated (numeric, positive, total = basic + additional + taxes); add field-level error messages and pre-fill currency/gateway from invoice row data.

---

### `management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type` — Invoices (Status=Unpaid, Date=Jun, DateType=empty)

- **Purpose:** Unpaid invoices with a June date range and empty date_type.
- **Key sections / flows:** Identical base template, heading "Unpaid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty.
- **UX improvement for the rebuild:** Require date_type before accepting date range.

---

### `management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type-date-p` — Invoices (Status=Unpaid, Date=Jun, DateType=Payment Date)

- **Purpose:** Unpaid invoices filtered by payment date in June — likely an edge case (unpaid invoices with a payment date may indicate partially-processed or errored records).
- **Key sections / flows:** Same base template, heading "Unpaid Invoices".
- **Key SAFE actions:** Filter, Download, Export.
- **Key MUTATING/dangerous actions:** New Transaction Submit, Cancel, Save.
- **Important modals/forms:** Same New Transaction modal.
- **Variant-of:** `management-invoices-date-2026-06-01-to-2026-06-30` base template.
- **Broken/empty:** Empty. 357 requests.
- **UX improvement for the rebuild:** Investigate whether Unpaid+DateType=PaymentDate is a valid filter combination; if not, disable this combination in the UI or show an informational message.

---

### `management-monthly-invoices` — Monthly Invoice List

- **Purpose:** Separate invoice view organized by month rather than by status — likely a billing-cycle summary for subscription or recurring payments tied to a parent/family.
- **Key sections / flows:** Single section with heading "Monthly Invoices"; Filter card with a date picker (MM/DD/YYYY) and a month select; table with 3 columns: #, Parent, Status; breadcrumb "Dashboard > monthly invoice list"; no KPI summary cards (unlike the main invoice list).
- **Key SAFE actions:** Search/filter by date, pagination.
- **Key MUTATING/dangerous actions:** Save shortcuts (global chrome only — no invoice-specific mutations visible on this page).
- **Important modals/forms:** No invoice-action modal on this page. Only the global "Add shortcuts" and "Recent Searches" modals are present.
- **Variant-of:** Unique template — distinct from the main invoices list (fewer columns, different filter, no status tabs, no KPI cards, no Download/Export, no transaction modal).
- **Broken/empty:** Table empty ("No data found"). Only 91 network requests — much lighter than the main list pages.
- **UX improvement for the rebuild:** Add exportable monthly summary totals (sum by status) alongside the list, and allow drilling into a month to see the individual invoice rows, rather than a flat undifferentiated list.

---

## Module synthesis (this batch)

### What this module does and its core entities

The batch covers the **Payments / Invoices** module for the admin role. Core entities:
- **Invoice** — linked to a Parent (family/guardian), has Ordered Number, Due Date, Payment Date, Payment ID, Price (basic + additional + taxes), Total in AED (normalized currency), Status (Unpaid / Paid / SoftDelete / All).
- **Transaction** — an accounting record created per invoice to mark payment; fields: Transaction ID, Payment Date, Basic, Additional, Taxes, Total, Currency (15+ currencies), Gateway (payment processor).
- **Monthly Invoice** — a parallel billing-cycle view showing parent + status only, filtered by month.

### Distinct page templates vs variant count

- **Unique templates: 2**
  1. `management-invoices` — main invoice list with 4 KPI cards, 10-col table, collapsible filter, New Transaction modal.
  2. `management-monthly-invoices` — simplified monthly view with 3-col table, date-only filter, no transaction action.
- **Variant pages: 16** (pages 1–17 minus the base = 16 variants of the main invoices template, differing by combinations of `status` ∈ {no param, All, Paid, Unpaid, SoftDelete} × `date_type` ∈ {empty, none, due_date, date_payment} × date range).

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

- **New Transaction modal** — DANGEROUS: POST to `/management/accountant/store-transaction`. All 10 financial fields unvalidated in-browser; no required indicators; no confirmation step. Must have client-side validation + server-side idempotency guard in rebuild.
- **Filter panel** — SAFE: GET-only, no data mutation. However, the `date_type` field has no client-side enforcement — date ranges without a `date_type` are accepted silently by the backend (produces degenerate results).
- **Download / Export links** — SAFE navigation.
- **Status navigation** — currently implemented as separate URL loads (not in-page tab switching) — causes full page reloads and high network request counts (215–358 requests per page).
- **Add Shortcuts modal** — POST but low risk (UI personalization only).

### Improvements for the new platform

1. **Status tabs as in-page filters**: Replace URL-per-status navigation with a tab bar (`All | Unpaid | Paid | Deleted`) that updates query params without a full reload; preserve date/date_type/currency/gateway across tab switches.
2. **Date filter validation**: Require `date_type` to be selected before a date range is accepted; show inline validation error if date range is entered without a dimension.
3. **New Transaction modal hardening**: Add field-level validation (numeric, positive, total = basic + additional + taxes), pre-populate currency/gateway from invoice context, add a review step before submit, and show a success/error toast after posting.
4. **SoftDelete tab differentiation**: Apply visual danger styling (red tint, trash icon) to the Deleted Invoices tab; hide New Transaction action for soft-deleted records; expose Restore and Permanent Delete as separate confirmed actions.
5. **Empty-state design**: Replace generic "No data found" table row with a contextual empty state (illustration + message + clear-filters CTA).
6. **Paid invoice guard**: Disable or hide New Transaction on Paid invoices; show "Already paid" tooltip.
7. **Monthly Invoices expansion**: Add monthly totals row, drill-down to individual invoices per month, and add Export per month.
8. **Network efficiency**: The current crawl shows 215–358 requests per invoice page (likely due to polling or large initial asset loads). The rebuild should lazy-load non-critical assets and use a single API call with query params for filtering.
9. **RTL support**: All pages are LTR (`en`). The filter panel, table, and modals need full RTL mirroring for Arabic admin users.
10. **Accessibility**: The filter form labels are mismatched (e.g., Currency select has label "Taxes" — `currancy` field). Rebuild must audit and fix all label associations; modal focus traps and ARIA roles are absent in the original.

### Anything that needs owner/backend confirmation

- Does the backend block New Transaction for `status=Paid` or `status=SoftDelete` invoices, or is that guard missing? (Affects whether the UI hide/disable is sufficient or a server guard is also needed.)
- What actions are available in the "Actions" column on the SoftDelete view? (Restore and/or hard-delete — not visible in the crawler because all tables were empty.)
- The `Unpaid + DateType=PaymentDate` filter combination appears semantically contradictory (unpaid invoices shouldn't have a payment date). Confirm whether this is intentional or a degenerate state.
- Gateway options visible in the filter are `All`, `احمد محمد`, and `Unknown` — these look like real (possibly test) data names mixed into a system filter. Confirm intended gateway list.
- Monthly Invoices table only has 3 columns (# / Parent / Status) — confirm whether Amount/Total is intentionally absent or a data issue.

---
# Batch 14 — admin · Settings / Payment Methods

All 8 pages are HTTP 200. Module: Settings > Payments. The batch covers one "edit existing payment config" page and seven "create new payment method" pages, each parameterized by `?payment_method=N` to select the gateway type. All pages share the same outer shell (sidebar, header, modals), with the inner form card being the only differentiator.

---

### `management-settings-payments-1-edit` — Edit Payment Method (Custom)

- **Purpose:** Edit an existing saved "Custom" payment gateway configuration (record ID 1).
- **Key sections / flows:** Single card "Edit — Custom" with a Name field and a Payment Details textarea; the textarea requires each line to end with `\n` (used for multi-line bank transfer / manual payment instructions). Submit persists changes via POST to `/management/settings/payments/1` (PUT tunnel via hidden `_method`).
- **Key SAFE actions:** Navigate sidebar; view notifications; close modals.
- **Key MUTATING/dangerous actions:** Submit (saves edited payment details to live config); Save (shortcuts modal).
- **Important modals/forms:** Edit form (Form 2) — fields: `name` (text), `key1` (textarea, payment details with explicit `\n` line-ending instruction). No delete button visible on this page; confirm with backend whether delete is on the list page.
- **Variant-of:** unique template (edit path `/payments/{id}/edit`; only one edit page captured; create variants below share a different template)
- **Broken/empty:** None. Logo image 404 (`/storage/uploads/logo.png`) is a cross-site asset issue present on all pages in this batch — not a page-level error.
- **UX improvement for the rebuild:** Replace the raw `\n`-terminated textarea with a structured multi-row "payment detail lines" editor (add/remove rows), eliminating the error-prone manual `\n` instruction and preventing malformed output.

---

### `management-settings-payments-create-payment-method-1` — Add Payment Method: PayPal

- **Purpose:** Create a new PayPal payment gateway configuration.
- **Key sections / flows:** Single card "Add Payment — Paypal"; fields for display Name, Client ID, Client Secret, and an Environment radio group (Live / Sandbox). POSTs to `/management/settings/payments`.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates new live payment gateway config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Client ID), `key2` (Client Secret / Secret Key), `xpay_url` radio (Live | Sandbox).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (shared create template; this instance differs only in gateway-specific field labels and environment toggle)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Show a password-type input with reveal toggle for Client Secret; add a clear "Test Connection" CTA after saving so admins can validate credentials without live-firing a transaction.

---

### `management-settings-payments-create-payment-method-2` — Add Payment Method: Stripe

- **Purpose:** Create a new Stripe payment gateway configuration.
- **Key sections / flows:** Single card "Add Payment — Stripe"; fields: Name, Key 1 (Publishable Key), Key 2 (Secret Key). No environment toggle — Stripe mode presumably controlled by key prefix.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates new gateway config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Publishable Key), `key2` (Secret Key). Fewer fields than PayPal/XPay; no environment radio.
- **Variant-of:** `management-settings-payments-create-payment-method-N` (same create template, Stripe fields subset)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Mask the Secret Key field by default (password input) with a show/hide toggle; add inline help linking to Stripe dashboard docs.

---

### `management-settings-payments-create-payment-method-3` — Add Payment Method: Custom

- **Purpose:** Create a new "Custom" (manual / bank-transfer style) payment method.
- **Key sections / flows:** Single card "Add Payment — Custom"; fields: Name and Payment Details textarea (same `\n`-line convention as the edit page). No API keys — purely instructional text displayed to the payer.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates new custom payment config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (textarea, payment instructions with explicit `\n` per-line requirement).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (minimal field variant of the create template)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Same as edit-custom: replace `\n`-delimited textarea with structured rows editor (label + value pairs) to avoid user error on newline formatting.

---

### `management-settings-payments-create-payment-method-4` — Add Payment Method: XPay

- **Purpose:** Create a new XPay (Egyptian payment aggregator) gateway configuration.
- **Key sections / flows:** Single card "Add Payment — XPay"; richest field set in the batch: Name, API Key, Community ID, Variable Amount ID, XPay URL radio (staging | community), and four payment-method checkboxes (Card, Fawry, Meeza Digital / mobile wallets, Kiosk Aman). 12 inputs total.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates gateway config with live credentials and enabled payment methods).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (API Key), `key2` (Community ID), `key3` (Variable Amount ID), `xpay_url` radio (staging | community), `xpay_method[]` checkboxes (Card, Fawry, Meeza Digital, Kiosk Aman).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (most field-rich variant; unique checkbox group for payment sub-methods)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Group the payment-method checkboxes visually as a fieldset with logos/icons; add tooltip explaining staging vs. community URL; show a live preview of which checkout options the payer will see.

---

### `management-settings-payments-create-payment-method-5` — Add Payment Method: Mollie

- **Purpose:** Create a new Mollie payment gateway configuration (single-key setup).
- **Key sections / flows:** Single card "Add Payment — mollie"; minimal fields: Name and Key 1 (API Key). Simplest API-key gateway in the batch.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates gateway config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (API Key). No environment toggle, no additional keys.
- **Variant-of:** `management-settings-payments-create-payment-method-N` (minimal single-key variant of the create template)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Add a "Live / Test key" detector (Mollie keys are prefixed `live_` or `test_`) that auto-labels the environment based on key prefix, removing ambiguity.

---

### `management-settings-payments-create-payment-method-6` — Add Payment Method: Payoneer

- **Purpose:** Create a new Payoneer gateway configuration.
- **Key sections / flows:** Single card "Add Payment — Payoneer"; fields: Name, Merchant Code, API Key, and Environment radio (Sandbox (test) | Live (production)). Two API credentials plus environment toggle.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates gateway config for live or sandbox).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Merchant Code), `key2` (API Key), `xpay_url` radio (Sandbox | Live).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (same template, two-key + environment variant)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Highlight with a warning banner when the "Live" environment is selected, requiring an explicit confirmation before saving, to prevent accidental production activation during setup.

---

### `management-settings-payments-create-payment-method-7` — Add Payment Method: Paymob

- **Purpose:** Create a new Paymob gateway configuration (Egypt/GCC multi-country).
- **Key sections / flows:** Single card "Add Payment — Paymob"; most complex key set: Name, Secret Key, Integration ID (comma-separated, one per checkout type e.g. card + wallet + instalments), Public Key, HMAC Secret, optional API Key (for reconciliation), and a country/region radio (Egypt | Oman | Saudi Arabia | UAE). Inline `<small>` help text present for Integration ID and API Key — the only page in the batch with inline field help.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates full Paymob config including all credential keys and multi-region selector).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Secret Key), `key2` (Integration ID, comma-sep), `key3` (Public Key), `key4` (HMAC Secret), `settings[api_key]` (optional API Key), `xpay_url` radio (Egypt | Oman | Saudi Arabia | UAE).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (most complex variant; unique `settings[api_key]` nested field and `<small>` help text; region selector instead of sandbox/live toggle)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Surface the Integration ID multi-value entry as a tag/chip input (add one ID at a time) rather than a comma-delimited string, reducing formatting errors; make the optional API Key field collapsible with an "Advanced" disclosure to reduce cognitive load.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Settings > Payments sub-module lets admins register payment gateway credentials that the platform uses to process family invoices. Core entities: PaymentMethod (gateway type enum 1–7+), named gateway configurations (records), and per-gateway credential fields (key1–key4, environment/region). One edit page (for existing record ID 1, type Custom) and 7 create pages (one per gateway type) were captured.

**Distinct page templates vs variant count:**
- 2 distinct templates:
  1. **Edit template** (`/payments/{id}/edit`) — 1 page, fields differ by stored type
  2. **Create template** (`/payments/create?payment_method=N`) — 7 pages, each rendered by the same shell with gateway-specific field composition
- 6 of the 7 create pages are query-param variants of the same create template (differing only in which fields are rendered). XPay (method=4) and Paymob (method=7) are the most structurally distinct within the create template due to checkboxes and nested `settings[]` keys.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- All 8 pages carry the same 3 modals: (1) a loading/dynamic modal, (2) Recent Searches, (3) Add Shortcuts. None of these are payment-specific and all are globally inherited chrome — none are dangerous in isolation.
- The primary mutating action on every page is the main form **Submit**, which persists live credentials; this is potentially high-impact because a misconfigured or sandbox-keyed live gateway will silently fail payments.
- No delete/deactivate buttons are visible on any create/edit page — deletion is presumably handled on the list page (not in this batch).

**Improvements for the new platform:**

1. **Credential security:** Mask all secret key / API key fields as password inputs with show/hide toggle; never render plaintext secrets in the DOM after save.
2. **Environment safety:** When "Live" / "Production" is selected in the radio, show a persistent yellow warning strip and require a confirmation checkbox before Submit is enabled.
3. **Structured textarea:** Replace the `\n`-line-delimited Payment Details textarea (Custom type) with a structured key-value row editor; eliminate the manual line-ending convention.
4. **Integration ID chips (Paymob):** Comma-delimited multi-value Integration ID field should be a chip/tag input with per-item add/remove.
5. **Inline help:** Only Paymob has `<small>` help text today. All gateways should show contextual helper links (e.g., "Where to find your Client ID in PayPal" linking to external docs).
6. **Test connection CTA:** After saving, offer a "Test connection" action that pings the gateway API with the stored credentials and reports success/failure, rather than requiring a live payment to detect misconfiguration.
7. **Gateway logo / type badge:** The create pages have no gateway branding; the rebuild should show the gateway logo in the form header to make it obvious which gateway is being configured, especially important when multiple configs exist.
8. **RTL/Arabic support:** All captured pages are LTR (`lang: en`). If the platform serves Arabic, the settings forms must be RTL-compatible; radio labels and checkbox stacks need mirroring.
9. **Field required markers:** No form field has the HTML `required` attribute set despite fields marked `*`. The rebuild must enforce validation at the form level with ARIA `aria-required`, client-side validation feedback, and server-side error display.
10. **Empty state for payments list (not captured):** Need the payments list page to confirm whether it shows a meaningful empty state (no payment methods configured yet) and a direct "Add" CTA.

**Anything that needs owner/backend confirmation:**
- Why are fields named `key1`–`key4` generically rather than semantically (e.g., `stripe_publishable_key`)? The rebuild should decide whether to keep the generic schema or migrate to per-gateway named fields.
- Whether gateway `payment_method` IDs 1–7 are exhaustive or if more exist (only 7 captured, discovered from integration configure routes).
- Whether delete/deactivate of a payment config is accessible from the edit page or only the list page — confirm the delete flow and whether it checks for active invoices using that method.
- The logo.png 404 (`/storage/uploads/logo.png`) is a persistent asset error on every admin page — confirm whether this is an environment-specific asset gap or a genuine missing upload.

---
# Batch 15 — admin · Profile / Account & Settings (Security)

---

### `management-profile-show` — Profile Show

- **Purpose:** Read-only view of the logged-in admin's own profile (name, email, username, password placeholder).
- **Key sections / flows:** Single card showing profile fields (Name, E-mail, Username, Password masked); heading shows the actual admin display name (e.g. "Eslam Essam"); "Edit" link navigates to the edit page. No data tables.
- **Key SAFE actions:** View profile fields; navigate to Edit page; global search; sidebar navigation.
- **Key MUTATING/dangerous actions:** "Edit" link leads to the mutating edit form (not itself dangerous but entry point); "See All Notifications" is a POST submit; "Add shortcuts" POST form in global chrome.
- **Important modals/forms:** Global chrome only — Recent Searches (read), Add Shortcuts (POST: shortcut_title, shortcut_link). No page-specific modal.
- **Variant-of:** Unique template (profile read view).
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all pages in this batch. Page itself loaded 200 OK; content present.
- **UX improvement for the rebuild:** Combine Profile Show and Profile Edit into a single inline-editable card with a visible "Edit / Save / Cancel" toggle rather than a full-page navigation switch; avoids a wasted round-trip and keeps context.

---

### `management-profile-edit` — Profile Edit

- **Purpose:** Allows the admin to update their own account details: display name, email, username, password, and avatar photo.
- **Key sections / flows:** Single card form with avatar upload (file + online URL input), text fields (Name, E-mail, Username, Password); "Save changes" submits via POST to `/management/profile/edit`; "Discard" resets the form client-side; dropzone-style photo uploader (Dropzone.js loaded).
- **Key SAFE actions:** Discard / Reset button; navigate away via sidebar; view interaction dropdown/menu.
- **Key MUTATING/dangerous actions:** "Save changes" (POST form — updates name/email/username/password/avatar); "See All Notifications" POST; "Add shortcuts" POST.
- **Important modals/forms:** Form 2 (main): fields — onlineImage (text), image (file upload), name, email, username, password. No separate confirmation modal before save; password is plain-text input type (not `type=password`), which is a security concern.
- **Variant-of:** Unique template (profile edit form).
- **Broken/empty:** Logo 404 same as above. No empty-state issue; form always pre-fills current values.
- **UX improvement for the rebuild:** Password field must use `type="password"` (not `type="text"` as current); add a "Confirm password" field and strength indicator; avatar upload should show a live preview before submit; add a confirmation step or toast-undo for the save action.

---

### `management-settings-security-data` — Settings Security / Data

- **Purpose:** Bulk data operations hub: one-click LMS export (backup) and CSV import for teachers, families, children, and family invoices/subscriptions.
- **Key sections / flows:**
  - **Backup Settings card:** "Save changes" (saves backup config?) + "Send Backup" link (triggers backup export email/download).
  - **Import Data card:** Four separate file-upload sub-sections, each with: (a) a reference table showing required CSV column names and formats, (b) a file picker (`type=file`, required), (c) an "Upload" submit button, (d) a "Download Template" link for the CSV template. Entity types: teachers (10 columns), families (15 columns), children (7 columns), families/subscriptions (7 columns).
  - **Country List modal:** Triggered by "Show Country List" button; table of country codes (27 rows visible, full 240+ country dropdown in select); includes a "Copy" button to copy a code to clipboard.
  - Accordion interaction confirms sub-sections expand/collapse.
- **Key SAFE actions:** Download Template (CSV template download); Show Country List; Copy country code; sidebar navigation.
- **Key MUTATING/dangerous actions:** "Send Backup" (triggers data export/email — must NOT be auto-fired); four "Upload" buttons (each POSTs file to `/management/settings/security/data/import` with hidden `type` discriminator — bulk import, potentially destructive/irreversible); "Save changes" on backup config.
- **Important modals/forms:** Country List modal (read-only with Copy action). Four upload forms share identical structure: hidden `_token`, hidden `type`, file input (required). No confirmation dialog before bulk import — high risk.
- **Variant-of:** Unique template.
- **Broken/empty:** Logo 404. Page loaded 200 OK; all sections present. Country select has 670 option elements.
- **UX improvement for the rebuild:** Bulk import forms must show a confirmation modal with a row-count preview (parse CSV client-side before submit) and a clear warning that existing records may be affected; provide import result feedback (success count / error rows) after upload. "Send Backup" should use a confirm dialog before triggering. Separate the Backup and Import sections into distinct sub-route tabs to reduce cognitive load.

---

### `management-settings-security-policy` — Settings Security / Policy

- **Purpose:** Rich-text editor for maintaining the platform's legal/operational policies displayed to families and teachers.
- **Key sections / flows:** Two independent Quill rich-text editor panels — "Family Policy" and "Teacher Policy"; each has a full toolbar (bold, italic, underline, link, ordered list, bullet list, clean); a single "Submit" button saves both policy texts via POST; two unlabelled select dropdowns present (likely language or version selectors for the policy content).
- **Key SAFE actions:** Read and edit policy text in-editor (client-side only until submit); sidebar navigation.
- **Key MUTATING/dangerous actions:** "Submit" button (single POST that overwrites both policy texts — no confirmation); "See All Notifications" POST; "Add shortcuts" POST. Two `about:blank` iframes detected (likely Quill editor canvases).
- **Important modals/forms:** No page-specific modal beyond global chrome. Form is implicit Quill submission — no explicit `<form action>` captured (Quill likely submits via XHR). Two unlabelled selects (purpose unclear — possibly language or policy version).
- **Variant-of:** Unique template.
- **Broken/empty:** Logo 404. Page loaded 200 OK; both policy editors present. The two select filters are unlabelled — intent unclear, needs backend confirmation.
- **UX improvement for the rebuild:** Add auto-save / draft functionality so policy content is not lost on accidental navigation; the single Submit button for both policies is ambiguous — split into per-section save buttons; add a last-saved timestamp and a change-history/audit log for policy modifications; label the two unlabelled selects (likely language switcher for localized policy text).

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the admin's self-service profile management and two security/governance settings sub-pages. Core entities: admin user account (name, email, username, password, avatar); platform data (bulk teacher/family/student/invoice CSVs); platform policies (Family Policy text, Teacher Policy text).

**Distinct page templates vs variant count:**
- 4 unique templates, 0 variants.
  1. Profile Show (read-only account view)
  2. Profile Edit (account edit form)
  3. Settings Security / Data (backup + bulk import hub)
  4. Settings Security / Policy (dual rich-text policy editor)

**Cross-cutting interactions and dangerous ones:**
- Global chrome modals appear on all 4 pages: Recent Searches (safe), Add Shortcuts (mutating POST), Notifications (POST).
- Page-specific dangerous actions: Profile Edit "Save changes" (account mutation), Data page four "Upload" bulk import submits (irreversible), Data page "Send Backup" (external trigger), Policy page "Submit" (overwrites both policy documents simultaneously).
- No bulk-import action has a confirmation dialog — highest risk item in this batch.
- Country List modal on the Data page is safely read-only.

**Improvements for the new platform:**
- **Profile:** Merge Show + Edit into a single inline-editable page; fix password field type; add confirm-password + strength meter; live avatar preview.
- **Data import:** Pre-import CSV validation with row count and error preview; confirmation modal before each bulk upload; post-import result summary (imported / skipped / errors); consider job-queue pattern for large files with progress indicator.
- **Backup:** Confirmation dialog + success feedback toast for "Send Backup"; expose backup history/log.
- **Policy editor:** Per-section save, draft/preview mode, last-saved timestamp, audit trail, language-labeled selects.
- **Global:** Broken logo (`/storage/uploads/logo.png` 404) must be fixed in the new asset pipeline.
- **Accessibility:** All 4 pages are LTR only; new platform needs RTL-ready layout. Unlabelled selects and missing ARIA on Quill editors need remediation.
- **Security:** Plain-text `type="text"` password field on the Edit page is a critical UX/security defect — must be `type="password"` in the rebuild.

**Items needing owner/backend confirmation:**
- The two unlabelled `<select>` elements on the Policy page — are they language selectors for localized policy versions, or policy version history? Their POST target is not explicit from captured data.
- What the "Save changes" button on the Backup Settings card actually saves (configuration vs. immediate trigger) vs. "Send Backup" — their distinction needs API confirmation.
- Whether bulk import appends or upserts/replaces records (critical for import UX warnings).
- Whether the `type` hidden field in each upload form maps to a specific entity type — confirm the four accepted values with backend.

---
# Batch 16 — admin · Reports / Analytics (Forms, New Requests, Teacher Feedback)

---

### `management-forms` — Forms (List)

- **Purpose:** Lists all admin-created feedback/survey forms with status, question count, response count, and schema color control.
- **Key sections / flows:** Single table (cols: #, Form Title, Questions, Responses, Default, Status, Created at, Actions); "Create Form" CTA; schema color picker modal per form; pagination control present.
- **Key SAFE actions:** View forms list, navigate to follow-up reports.
- **Key MUTATING/dangerous actions:** Create Form (navigates to create page); Save (color picker form posts to `/management/forms/colors/update`).
- **Important modals/forms:**
  - Schema Color modal — posts to `/management/forms/colors/update` with `form_id` hidden field + color picker; Save button.
- **Variant-of:** unique template
- **Broken/empty:** Table renders "No data found" — no forms exist in the test dataset; 404 on logo image (`/storage/uploads/logo.png`) across all pages in this batch.
- **UX improvement for the rebuild:** Add an empty-state illustration and a prominent "Create your first form" CTA when the table has no data, rather than a bare "No data found" row. Also surface response count as a progress indicator inline in the table.

---

### `management-forms-create` — Create Form

- **Purpose:** Full-page form builder allowing admin to create a new feedback/survey form with custom question types, scheduling day, and optional/required fields.
- **Key sections / flows:** Single card "Add" containing: Form Title field (required), Day selector (1–28, day of month to show the report), dynamic question builder (Add Question adds fields for label, type, options, is-required checkbox), question type dropdown (Short Answer, Paragraph, Checkboxes, Multiple Choice, Dropdown, Rating), rating preview ("Users will select 1 to 5 stars"), Delete question and Remove option buttons, Save.
- **Key SAFE actions:** View builder, Add/remove option previews (client-side).
- **Key MUTATING/dangerous actions:** Save (POST `/management/forms`); Delete question; Remove option; Add Option; Add Question.
- **Important modals/forms:**
  - Main create form (POST `/management/forms`): fields `form_name` (required), `day` (select), `fields[1][label]`, `fields[1][type]`, `fields[1][options][]`, `fields[1][is_required]` checkbox — dynamic; repeats per question.
- **Variant-of:** unique template
- **Broken/empty:** No broken state; form is a blank builder.
- **UX improvement for the rebuild:** Replace the bare day-number picker with a labelled "Report publish day" control with explanatory tooltip. Add drag-to-reorder for questions and a live preview pane beside the builder.

---

### `management-new-requests` — New Requests Statistics (Overview)

- **Purpose:** Executive dashboard showing KPI summary cards for all new enrollment/trial requests, segmented by pipeline stage, with a date-range filter and drill-down links to each status bucket.
- **Key sections / flows:** Date-range filter bar (flatpickr, `date_range` + hidden `status`, GET submit); large KPI grid — Duplicated, PENDING, Contacted, No Response, Qualified, Scheduled, Trial Taken, Trial Missed, Teacher (each with count + "Show Details" link); Converted (18) / Not Converted (10); Male/Female teachers requested with % of requests; Avg Scheduling Time (0H), Pending Actions, Completed Trials, Cancelled Trials; Total Teachers / Families / New Families This Month / Avg Families per Teacher / Requests Growth MoM; Fastest Scheduling / Top Performer; Most Requested %.
- **Key SAFE actions:** Date range filter + Submit/Reset; Show Details (navigates to filtered list); Month dropdown filter.
- **Key MUTATING/dangerous actions:** None beyond filter submission (GET).
- **Important modals/forms:** Filter form (GET `/management/new-requests`): `date_range` text, hidden `status` — safe filter only.
- **Variant-of:** unique template
- **Broken/empty:** All pipeline-stage counts show 0 for the filtered period; Converted = 18, Not Converted = 10 visible at all-time level.
- **UX improvement for the rebuild:** Render the pipeline stages as a horizontal funnel or Kanban-style swimlane so the admin can see conversion drop-off at a glance, rather than a grid of disconnected cards.

---

### `management-new-requests-filter-contacting-date-range-2026-06-01-to-2026-06-30` — New Requests / Contacted (Filtered List)

- **Purpose:** Filtered view of requests in "Contacted" status for a specific date range, with a per-row detail drawer, notes, and status change workflow.
- **Key sections / flows:** Stats header with date-range filter; main table (cols: #, Date, Parent name, Email, Phone number, Status, Actions) — 0 rows in test period; clicking a row opens detail modal; Actions include: view detail, view/add notes, change status; detail modal shows full request profile (Basic Info + Course Trial Info + IP/device metadata); Notes List modal shows history; Add Notes modal; Change Status modal with dropdown of all pipeline statuses.
- **Key SAFE actions:** Filter by date range; Reset; view row detail modal; view Notes List.
- **Key MUTATING/dangerous actions:** Create (new request entry via link); Save (add note — POST `noteForm`); update status (POST `change-status` form with status select — moves the request through the pipeline).
- **Important modals/forms:**
  - "New Requests" detail modal: read-only — Parent, Parent Age, Email, Phone, Gender, Request Date, Course Name, Trial Date/Time, Teacher gender, Classes/Week, Class Duration, Country, Timezone, Language, How Heard, Coupon, Friends count, IP Address, Country/City/ISO, Device Type, Browser.
  - "Notes List" modal: table (#, Date, Users, All Notes) — lazy loaded ("Loading......").
  - "Add Notes" modal: `noteForm` POST, `note` textarea (required).
  - "Change Status" modal: `change-status` POST, `status` select (options: Contacted, Qualified, Trial Taken, no response, Duplicated, Trial Missed, scheduled, Teacher).
- **Variant-of:** management-new-requests-filter-[STATUS]-date-range (base template for all 7 status filter pages)
- **Broken/empty:** Main table has 0 rows (empty period); Notes list shows "Loading......" — possible async fetch not completing in capture.
- **UX improvement for the rebuild:** The status change modal should show the current status and highlight the new selection with color-coded labels; add a confirmation step before updating to prevent accidental pipeline moves.

---

### `management-new-requests-filter-duplicat-date-range-2026-06-01-to-2026-06-30` — New Requests / Duplicated (Filtered List)

- **Purpose:** Same filtered list template scoped to "DUPLICAT" (Duplicated) status requests.
- **Key sections / flows:** Identical structure to the Contacted variant — date-range filter header, requests table, detail/notes/change-status modals, "Create" CTA.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (add note); update status.
- **Important modals/forms:** Same 5 modals as Contacted variant (detail, notes list, add note, change status, global chrome).
- **Variant-of:** management-new-requests-filter-contacting-date-range (same base template, status=DUPLICAT)
- **Broken/empty:** Table 0 rows; notes loading stuck.
- **UX improvement for the rebuild:** For duplicate requests, auto-surface the duplicate detection logic (show "possible duplicate of request #X" in the detail modal) to speed resolution.

---

### `management-new-requests-filter-no-response-date-range-2026-06-01-to-2026-06-30` — New Requests / No Response (Filtered List)

- **Purpose:** Filtered list of requests where no response was received in the date range.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=NO_RESPONSE)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** Add a bulk "Send follow-up" action for the no-response bucket to speed outreach, with a confirmation dialog.

---

### `management-new-requests-filter-pending-date-range-2026-06-01-to-2026-06-30` — New Requests / Pending (Filtered List)

- **Purpose:** Filtered list of requests in PENDING status for the given date range.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=PENDING)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** Add an "Assign to agent" action in the row Actions menu for pending requests to enable team-based triage directly from this view.

---

### `management-new-requests-filter-qualified-date-range-2026-06-01-to-2026-06-30` — New Requests / Qualified (Filtered List)

- **Purpose:** Filtered list of requests that have been assessed as qualified prospects.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=QUALIFIED)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** For qualified requests, surface a "Schedule Trial" quick action in the row that pre-fills a trial scheduling modal, removing the need to open the detail then change status separately.

---

### `management-new-requests-filter-trial-missed-date-range-2026-06-01-to-2026-06-30` — New Requests / Trial Missed (Filtered List)

- **Purpose:** Filtered list of requests where the trial session was missed.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=TRIAL_MISSED)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** Add a "Reschedule" shortcut row action that moves status to Qualified and opens a trial re-scheduling flow in one click.

---

### `management-new-requests-filter-trial-taken-date-range-2026-06-01-to-2026-06-30` — New Requests / Trial Taken (Filtered List)

- **Purpose:** Filtered list of requests where the trial session was completed.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=TRIAL_TAKEN)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** For trial-taken requests, surface conversion outcome inline (Converted / Not Converted badge) in the table row, removing the need to open a separate detail modal to assess outcome.

---

### `management-teacher-feedback-feedback-teacher-id-1-year-2026` — Teacher Feedback Detail (Per Teacher / Year)

- **Purpose:** Shows a per-teacher, per-year feedback report, filtered by teacher selector and year number input; linked from the Monthly Performance list.
- **Key sections / flows:** Filter bar with teacher select (populated — shows Arabic teacher name "المعلم محمد صادق صادق") and year number input; "Filter" (GET) + Reset; content area below filter appears empty/chart-only in capture (no visible table — 0 tables detected, 211 network requests suggesting heavy chart/data loading); 2 interactions captured (teacher dropdown open, second dropdown).
- **Key SAFE actions:** Select teacher from dropdown; enter year; Filter (GET); Reset.
- **Key MUTATING/dangerous actions:** None directly on this page (no POST forms except global shortcuts/logout).
- **Important modals/forms:**
  - Filter form (GET `/management/teacher-feedback/feedback`): `teacher_id` select (required, lists actual teachers), `year` number input.
- **Variant-of:** unique template (query-param variant of the teacher-feedback base, but different enough structure to be its own template)
- **Broken/empty:** No visible content table or charts captured in the DOM summary (0 tables, minimal headings) — the feedback report content is likely rendered via JS/charts that didn't fully render in the static capture. The page loaded 211 requests, suggesting chart libraries are active. Treat as possibly partially broken in capture.
- **UX improvement for the rebuild:** Replace the bare year number input with a year picker (prev/next arrows + current year default) and render monthly feedback data as a bar or radar chart with a supporting data table for accessibility and export.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers two distinct but related sub-modules within the admin Reports / Analytics area: (1) the Forms builder/manager for custom feedback surveys and (2) the New Requests CRM pipeline tracker plus a Teacher Feedback per-teacher drilldown.

Core entities: Survey Forms (title, questions, day-of-month schedule, responses, status, color schema); New Requests / Enrollment Requests (parent contact info, children data, course/trial info, geographic/device metadata, pipeline status); Pipeline Statuses (PENDING, CONTACTING, DUPLICAT, NO_RESPONSE, QUALIFIED, TRIAL_TAKEN, TRIAL_MISSED, scheduled, Teacher, Converted, Not Converted); Teacher Feedback (teacher_id, year, monthly responses — chart-based).

**Distinct page templates vs variant count:**
- Unique templates: 4
  1. Forms List (`management-forms`)
  2. Create Form builder (`management-forms-create`)
  3. New Requests Statistics overview (`management-new-requests`)
  4. Teacher Feedback per-teacher detail (`management-teacher-feedback-feedback-teacher-id-1-year-2026`)
- Variant pages: 7 (all `management-new-requests-filter-{STATUS}-date-range-*` pages share one base template — only the status segment and the table heading label differ)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Date-range flatpickr filter (shared across all New Requests pages) — safe (GET).
- "Show Details" per-row detail modal — safe (read-only).
- "Notes List" modal — safe (read-only, async loaded).
- "Add Notes" modal — DANGEROUS (POST, saves note to request record; no confirm step).
- "Change Status" modal — DANGEROUS (POST, moves request through pipeline; no confirm step; status dropdown includes destructive statuses like Duplicated/Trial Missed).
- "Create" link on filter pages — DANGEROUS (initiates new request creation).
- Schema color picker modal (Forms list) — DANGEROUS (POST, updates form appearance).
- Form builder Save (Create Form) — DANGEROUS (POST, creates new form).

**Improvements for the new platform:**
1. **Navigation / pipeline:** Render the New Requests pipeline as a visual funnel or Kanban board rather than separate URL segments per status — allow drag-and-drop status changes with confirm dialog.
2. **Dashboards:** New Requests Statistics KPI cards should use a consistent color-code system (green = positive progress, amber = at-risk, red = drop-off) and render sparklines alongside counts for trend context.
3. **Tables:** All status-filtered tables are empty in the test period — implement a proper empty-state component ("No requests in this status for the selected range") with actionable CTA.
4. **Modals:** Change Status modal needs a confirmation step ("Move from X to Y?") and should display the full status label with color badge, not just a plain select. Add Notes modal needs character counter and required validation feedback.
5. **Error/loading states:** Notes List modal renders "Loading......" indefinitely in capture — the rebuild must handle async timeout/error with retry CTA.
6. **Forms builder:** The Create Form page needs drag-to-reorder questions, a live mobile preview pane, and field-level validation feedback. The Day picker (1–28) needs a tooltip explaining its meaning ("day of month the report is distributed").
7. **Teacher Feedback:** The per-teacher year report rendered no visible content in the capture (likely chart-only). Rebuild should include a data table alongside charts for accessibility and CSV export.
8. **RTL / mobile:** All pages currently LTR only; the teacher dropdown already contains Arabic text ("المعلم محمد صادق صادق") — the rebuild must support RTL for Arabic teacher names throughout and be responsive for mobile admin use.
9. **Accessibility:** Modal focus traps, ARIA role=dialog, keyboard-dismissible (Escape), and labeled form controls are missing in the original; must be built in from the start.
10. **Status color semantics:** The pipeline status list (Contacted, Qualified, Trial Taken, Trial Missed, Duplicated, etc.) has no color coding in the table — the rebuild should use a consistent status badge system (color + icon) across all filtered views.

**Anything that needs owner/backend confirmation:**
- The "DUPLICAT" status slug (likely a typo of "DUPLICATE") — confirm the backend API enum value before building the new URL routing.
- The Notes List async endpoint (`noteForm` action is blank `""`) — confirm the actual POST endpoint for adding notes and the fetch endpoint for the notes list.
- Change Status endpoint (also blank action) — confirm REST endpoint and whether status transitions have business rules (e.g., cannot move from Trial Missed to Contacted without confirmation).
- Teacher Feedback page: confirm what chart type and data structure the backend returns for `teacher_id + year` — the capture shows 211 requests but 0 tables and no headings beyond chrome, implying a chart-heavy response.
- Forms "Default" column and "Status" column — confirm what toggling Default or Status does (likely AJAX calls not captured).
- The `day` field in form creation (1–28) — confirm whether this is a fixed day-of-month schedule or a relative offset, and what happens in months shorter than 28 days.

---
# Batch 17 — admin · Roles / Permissions (Staff Member Permission Editor)

---

### `management-admins-permission-6` — Set Permissions for Staff Member (ID: 6)

- **Purpose:** Full-page permission editor for a specific staff member (admin ID 6), allowing a super-admin to grant or revoke any of 170 granular system permissions across all modules.
- **Key sections / flows:** Single H4 heading "Set Permissions for staff member"; permission counter badge "170/170 permissions selected"; grouped permission checkboxes organized by module (Dashboard=14, New Requests=6, Families=24, Students=21, Teachers=17, Schedule=1, Reports=20, Invoices=15, Payment Methods=3, Locations, Material, Library, Banks, System Settings, Staff Members, Groups=5, Scheduled Actions); global "Select All" and per-group "Clear All" toggle buttons; inline text search to filter permissions; Submit button posts to `/management/admins/permission/store`.
- **Key SAFE actions:** View permission list; search/filter permissions by keyword (client-side); Select All / Clear All toggles (client-side state only, no server round-trip until Submit); navigate sidebar.
- **Key MUTATING/dangerous actions:** **Submit** (POST `/management/admins/permission/store`) — saves the complete permission set for the staff member; this is the sole save action and replaces the entire permission record with whatever is checked at submit time, making accidental "Clear All then Submit" catastrophic.
- **Important modals/forms:** Permission store form (Form 2) — hidden `userID` field identifies the staff member; `permisions[]` checkbox array (170 items); no confirmation dialog before submit. No other domain-meaningful modals (Modal 1 is a generic loader; others are global chrome).
- **Variant-of:** `management-admins-permission-7` — same template, different staff member ID in the URL and `userID` hidden field; all structure, form fields, button list, and DOM counts are identical.
- **Broken/empty:** No 404/500; page loaded successfully (HTTP 200). Logo image returns 404 (`/storage/uploads/logo.png`) — cosmetic asset miss.
- **UX improvement for the rebuild:** Replace raw "Submit" with a two-step confirmation flow: show a diff of added/removed permissions since page load and require explicit confirmation before writing, to prevent accidental full-permission wipe.

---

### `management-admins-permission-7` — Set Permissions for Staff Member (ID: 7)

- **Purpose:** Identical permission editor as above, targeted at staff member ID 7 — a pure data variant of the same template.
- **Key sections / flows:** Identical structure to permission-6: H4 heading, 170/170 counter, same 170 checkboxes across the same module groups, Select All / Clear All, permission search, Submit. DOM element counts are byte-for-byte the same (674 divs, 179 inputs, 172 labels, 27 buttons, 4 forms).
- **Key SAFE actions:** Same as permission-6 — view, search, toggle selections client-side, navigate sidebar.
- **Key MUTATING/dangerous actions:** **Submit** (POST `/management/admins/permission/store`) with `userID=7` — same risk profile as permission-6: full replacement of permission set with no confirmation.
- **Important modals/forms:** Identical to permission-6. Form 2 posts to same `/store` endpoint; `userID` hidden field carries `7` instead of `6`.
- **Variant-of:** `management-admins-permission-6` (base template). Only the URL path segment and the hidden `userID` value differ.
- **Broken/empty:** HTTP 200; same cosmetic 404 on logo asset.
- **UX improvement for the rebuild:** Add per-module "preset roles" (e.g., "Teacher Ops", "Finance Viewer") as one-click templates to reduce the manual effort of configuring 170 checkboxes from scratch; allow saving named permission sets for reuse across multiple staff members.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Staff Member Permission Editor is a flat-checkbox RBAC (Role-Based Access Control) configuration surface. The core entities are: staff member (identified by integer ID in the URL), and a flat list of 170 named permissions spanning every system module. There are no roles or role groups in the UI — all permissions are assigned directly to the individual staff member. The single save action POSTs the full checked array to a shared `/permission/store` endpoint.

**Permission taxonomy (170 total, grouped by module):**
- Dashboard (14): class queue controls, chat, WhatsApp monitor, session analysis, advertise/notify, tasks, public holiday
- New Requests (6): show, create, update, delete, show details, create account, change status
- Families (24): full CRUD, force-delete, restore, account status, contact visibility, location/prefs/capabilities, categories
- Students (21): status views (active/suspended/deactivated/deleted), CRUD, courses, feedback, trial, certificates
- Teachers (17): CRUD, settings, vacation, force-delete, restore, KPIs, salaries, categories, schedule search
- Schedule (1): request schedule
- Reports (20): data analysis, expenses, agenda, transactions (add/export/edit/delete), salaries (generate/send/edit/delete), payouts (view/request/approve/execute/delete/providers), monthly report
- Invoices (15): full invoice lifecycle, credits, adjustments, payment methods, export/phone-export
- Payment Methods (3): show/add/edit/delete (counted as 3 in badge; 4 checkboxes)
- Locations, Material (course), Library (books), Banks — each: show + CRUD
- System Settings: general, integrations, customization, notification, security, backup
- Staff Members: show, add, edit, show actions, show/edit permissions, delete
- Groups (5): show, create, edit, show details, add/remove students, edit hour rate
- Scheduled Actions: show, create, cancel, delete

**Distinct page templates vs variant count:**
- 1 unique template: the staff member permission editor (`/management/admins/permission/{id}`)
- 2 pages in this batch, both variants of the same template (IDs 6 and 7)
- 0 broken pages

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Client-side permission search (text input): filters visible checkboxes, safe
- Select All / per-group Clear All: client-side toggle, safe on its own — dangerous only when followed by Submit
- **Submit (POST /permission/store)**: the only dangerous action — a full-replace write with no diff preview, no confirmation dialog, and no undo

**Improvements for the new platform:**

1. **Diff-before-save confirmation:** Show a modal listing permissions being added and removed before committing the POST, preventing accidental bulk revocation.
2. **Named permission presets / role templates:** Allow saving a checked state as a reusable preset (e.g., "Finance Admin", "Academic Ops") and applying it to any staff member — today there is no role abstraction, just per-user flat assignment across 170 items.
3. **Grouped accordion UI with progress indicators:** The current flat scroll of 170 checkboxes is unwieldy; group them into collapsible sections with per-group counts (already partially surfaced as badges) and expand-all/collapse-all controls.
4. **Permission search with highlighting:** The existing search input is unlabeled and has no ARIA role; the rebuild should use a labeled, accessible filter with real-time match highlighting and a "no results" empty state.
5. **Change audit log:** Log who changed which permissions and when; no audit trail is surfaced in the current UI.
6. **RTL/Arabic readiness:** Page is LTR-only; the permission label text is all English. If the platform serves Arabic-speaking admins, labels need Arabic translations and the layout must flip to RTL.
7. **Accessibility:** 172 checkbox labels exist but none have explicit ARIA descriptions; the form has no fieldset/legend grouping for screen readers; rebuild must add proper grouping and keyboard navigation.
8. **Logo asset fix:** `/storage/uploads/logo.png` returns 404 on both pages — the asset path is broken and should be resolved at the infrastructure level before launch.

**Anything that needs owner/backend confirmation:**
- Is there a server-side role/group abstraction that the frontend should expose, or is per-user flat permission assignment intentional design?
- Does the `/permission/store` endpoint perform a diff or a full replace? If full replace, the confirmation-dialog UX improvement is critical.
- The `permisions[]` field name has a typo (single `s`) — confirm whether the API accepts `permissions[]` or requires the misspelled key; the rebuild should use the correct spelling and update the API contract if needed.
- Staff member IDs 6 and 7 are hardcoded in URLs; confirm the ID range and whether there are pagination concerns when many staff members exist.

---
# Batch 18 — admin · Settings (General, Customisation, Integrations, Security/Backup)

---

### `management-settings-customisation-personalisation` — Personalisation

- **Purpose:** Lets admin customise the LMS visual identity — theme colours, light/dark/system mode, layout width, sidebar state, card style, and per-status colour codes for classes.
- **Key sections / flows:** Single card "Personalisation" with sub-sections: Global Appearance (primary colour picker `#5865F2`, secondary `#7B6BA8`, theme radio, container width radio, sidebar type radio, card style radio); Class Status Colours section mapping 11 statuses (pending, waiting, teacher-absent, student-absent, teacher-cancel, student-cancel, admin-cancel, attend, reschedule, running, makeup) to colour pickers + hex inputs.
- **Key SAFE actions:** View all courses, View All Queues (navigation only).
- **Key MUTATING/dangerous actions:** "Apply for me" (AI/auto colour apply), "Reset" (resets colour form), "Reset to Default" (resets all to system defaults), "Save changes" (persists all personalisation settings via POST to `/management/settings/customisation/personalisation`).
- **Important modals/forms:** Form 2 posts to the personalisation endpoint with 43 fields (radio groups + paired color/text inputs for each status). No confirmation dialog before Save.
- **Variant-of:** Unique template (distinct colour-mapping UI not seen elsewhere).
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all settings pages; not a page-level error, just a missing asset.
- **UX improvement for the rebuild:** Add live preview of the colour theme applied to a miniature UI mock, and require a confirmation step before "Reset to Default" since it wipes all customisation irreversibly.

---

### `management-settings-general` — General Settings

- **Purpose:** Central configuration hub for school-wide operational settings, split across four tabs: General (company identity + location), Teachers (pay rates + salary schedule), Courses & Classes (renewal/cancellation/automation rules), and Accessibility (2FA + OTP).
- **Key sections / flows:**
  - **General tab:** Company name (EN + AR), domain, contact email, phone, WhatsApp, logo upload, country/city/timezone selects, full address.
  - **Teachers tab:** Default session rate, tiered hour-rate rules (if-greater-than thresholds), salary period type (monthly or custom start day), lateness-discount tiers.
  - **Courses & Classes tab:** Status after renewal, auto-renew unpaid courses, stop-after-N-invoices, monthly plan email, teacher/family cancel permissions, automatic cancel rule (daily 4AM), makeup credit rules, classes-not-closed handling, cancellation window (minutes), teacher-absent-student flag + rate, pre-class entry minutes, teacher-edit permission.
  - **Accessibility tab:** Two-factor auth toggle (OTP via phone), shared OTP number for all admin/support users.
- **Key SAFE actions:** Tab switching (General / Teachers / Courses & Classes / Accessibility) — navigation only, no page reload.
- **Key MUTATING/dangerous actions:** "Save changes" on each of the four tabs (4 separate POST endpoints: `/settings/general/update`, `/settings/general/teachers/update`, `/settings/general/courses-classes/update`, `/settings/general/accessibility/update`); "Remove" buttons on salary tier rows (removes a dynamically-added rate tier).
- **Important modals/forms:** No dedicated modals; all editing is inline within the tabbed form sections.
- **Variant-of:** Unique template (multi-tab settings hub with four independent save flows).
- **Broken/empty:** Logo 404 as above. No other errors observed.
- **UX improvement for the rebuild:** The four tabs each have their own "Save changes" button with no cross-tab dirty-state indicator — users can navigate away from an unsaved tab without warning. Rebuild should track per-tab dirty state and warn on tab switch or navigate-away.

---

### `management-settings-integrations` — Integrations Hub (index)

- **Purpose:** Landing page listing all available third-party integrations grouped by category (Payments incoming, Payouts outgoing, Communications), each with a "Configure" link.
- **Key sections / flows:** H3 heading "Integrations"; category H4s: Payments (incoming) — Stripe, Paypal, Mollie, Xpay, Payoneer, Paymob, Custom; Payouts (outgoing) — Paymob Payout, Payoneer Payout; Communications — Whatsapp (Free), Email. Each card shows the provider name, a short description, and a "Configure" navigation link. Tab/badge bar shows: Communication, Mail Service, Payments, Webhooks (likely filter tabs, though no query-param change was observed).
- **Key SAFE actions:** 11 "Configure" navigation links, tab badges for category filtering.
- **Key MUTATING/dangerous actions:** None on the index page itself (all mutations are on configure sub-pages).
- **Important modals/forms:** None beyond global chrome.
- **Variant-of:** Unique template (integration catalogue/hub, no CRUD on this page).
- **Broken/empty:** No data errors. Logo 404 as above.
- **UX improvement for the rebuild:** Add connection-status badges (connected/disconnected/error) directly on each integration card, so admins can see health at a glance without clicking into each provider.

---

### `management-settings-integrations-1-configure` — WhatsApp (Free) Configure

- **Purpose:** Wizard to connect a personal WhatsApp number via unofficial/free integration, plus operational controls (status, test messaging, connection insights).
- **Key sections / flows:**
  - "WhatsApp Setup Wizard" — 4-step stepper: (1) Phone number, (2) Pairing Code, (3) Finishing Setup, (4) Success. User enters phone, receives pairing code to enter in WhatsApp's "Linked Devices" → "Link with Phone Number".
  - "Caution" card — disclaimer that this is unofficial, may break, encourages official WhatsApp Business API.
  - "Free Whatsapp Status" card — connection status badge (Connected / Disconnected count), Logout button, send-mode selector (group vs private), Update buttons for group/private send settings, Group Test / Private Test send buttons, Insights panel showing families/teachers connected to WhatsApp groups with Retry sync actions.
- **Key SAFE actions:** Copy (webhook/code), Retry, Refresh, Wake connection (status checks).
- **Key MUTATING/dangerous actions:** "Start Setup" (initiates pairing), "Logout" (disconnects WhatsApp session — dangerous, will break all WA notifications), "Update" ×2 (save send-mode settings), "Send" ×2 (send test messages to group/private).
- **Important modals/forms:** 4-step wizard embedded in page; a `send_group` select filter controls routing.
- **Variant-of:** Unique template (multi-step wizard + live-status panel, no other page has this pattern).
- **Broken/empty:** "Connected: 0" badge visible — may indicate no families/teachers connected in the test environment.
- **UX improvement for the rebuild:** The "Logout" button sits inline with status controls without a confirmation dialog; a destructive-confirm modal is essential since logout instantly kills all WhatsApp automation for the whole school.

---

### `management-settings-integrations-2-configure` — Stripe Configure

- **Purpose:** Manage Stripe payment gateway credentials — list existing Stripe API key sets per "payment name + family count" and add new ones.
- **Key sections / flows:** Info card (description of Stripe). Table with columns #, Name, Number Of Family, Key 1, Key 2, Settings (Edit/Delete row actions). "Add Payment" link navigates to create form.
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment" (creates a new Stripe key set), row-level "Edit" and "Delete" (table contains "No data found" in test environment so no live rows, but Delete would remove credentials).
- **Important modals/forms:** None captured; Add Payment likely goes to a separate form page.
- **Variant-of:** Base template for standard payment gateway configure pages (Stripe is the canonical instance; Paypal/Mollie/Xpay/Payoneer/Paymob all share this exact layout — confirmed by identical DOM counts and token values across slugs 2–7).
- **Broken/empty:** Table shows "No data found" — empty state (no gateways configured in test env).
- **UX improvement for the rebuild:** Column labels "Key 1" / "Key 2" are ambiguous; rename to the provider-specific names (e.g., "Publishable Key" / "Secret Key" for Stripe) and mask secret key values in the table with a reveal-on-hover toggle.

---

### `management-settings-integrations-3-configure` — Paypal Configure

- **Purpose:** Manage PayPal Client ID / Client Secret credential sets.
- **Key sections / flows:** Same pattern as Stripe: info card + table (#, Name, Number Of Family, Client ID, Client Secret, Settings with Edit/Delete) + "Add Payment" link.
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None on page.
- **Variant-of:** Variant of `management-settings-integrations-2-configure` (standard payment gateway configure template). Column heading differs: "Key 1" → "Client ID", "Key 2" → "Client Secret".
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Same as Stripe — show humanised credential names; also add environment badge (Sandbox/Live) so admins can immediately see which credential sets are live vs test.

---

### `management-settings-integrations-4-configure` — Mollie Configure

- **Purpose:** Manage Mollie API key sets for European payment methods (iDEAL, cards, SEPA, etc.).
- **Key sections / flows:** Same standard payment gateway template: info card + credentials table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Same as above (environment badge + meaningful column names).

---

### `management-settings-integrations-5-configure` — Xpay Configure

- **Purpose:** Manage XPay key sets for Egypt/MENA card, Fawry, and wallet payments.
- **Key sections / flows:** Standard payment gateway template — info + table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Consider adding a "families using this gateway" count as a read-only column so admins know impact before deleting.

---

### `management-settings-integrations-6-configure` — Payoneer Configure

- **Purpose:** Manage Payoneer credential sets for global payment collection.
- **Key sections / flows:** Standard payment gateway template — info + table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Same credential-masking and environment label improvements.

---

### `management-settings-integrations-7-configure` — Paymob Configure

- **Purpose:** Manage Paymob (Accept) credential sets for Egypt/MENA card, wallet, kiosk, and Valu payments.
- **Key sections / flows:** Standard payment gateway template — info + table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Distinguish visually from Paymob Payout (slug 8) since both are "Paymob" — use clear "Paymob Accept" vs "Paymob Payout" labelling.

---

### `management-settings-integrations-8-configure` — Paymob Payout Configure

- **Purpose:** Configure Paymob Disburse credentials for disbursing instructor salaries via mobile wallets; form also displays webhook URL for provider callbacks.
- **Key sections / flows:** Single card "Webhook URL" with copyable callback URL. Form fields: Mode (Sandbox/Live select), Active checkbox, Client ID (key1), Client Secret (key2), Username (key3), Password/key4 (password input). Note clarifies these are Paymob Payouts/Disburse credentials, different from Paymob Accept. "Back" navigation link. "Save" submits to `/payout-providers/7`.
- **Key SAFE actions:** Copy webhook URL, Back navigation.
- **Key MUTATING/dangerous actions:** "Save" (writes payout provider credentials to DB — switching Mode from Sandbox to Live would affect real payouts).
- **Important modals/forms:** Payout provider form (mode + 5 credential fields).
- **Variant-of:** Unique template within configure pages — payout providers have a different form structure (single-record credential form with Mode/Active toggles + webhook URL) vs incoming payment gateways (multi-record key table).
- **Broken/empty:** No errors; actual URL resolves to `/payout-providers/7/edit` (note: slug was accessed as integrations/8/configure but redirects to payout-providers route).
- **UX improvement for the rebuild:** Show current credential status (last-verified, last-successful-payout) alongside the form so admins know if existing credentials are valid before changing them.

---

### `management-settings-integrations-9-configure` — Payoneer Payout Configure

- **Purpose:** Configure Payoneer Mass Payouts credentials for disbursing instructor salaries globally.
- **Key sections / flows:** Same payout-provider template as slug 8: webhook URL card, Mode select (Sandbox/Live), Active checkbox, Username/Login (key1), API password/Key (key2), Program ID (key3). Submits to `/payout-providers/6`. "Back" link.
- **Key SAFE actions:** Copy webhook URL, Back navigation.
- **Key MUTATING/dangerous actions:** "Save" (writes Payoneer payout credentials).
- **Important modals/forms:** Payout provider form (3 credential fields vs 4 in Paymob Payout).
- **Variant-of:** Variant of `management-settings-integrations-8-configure` (payout provider configure template).
- **Broken/empty:** No errors. Actual URL is `/payout-providers/6/edit`.
- **UX improvement for the rebuild:** Same as slug 8 — show last-payout-status and credential validation date.

---

### `management-settings-integrations-10-configure` — Custom Payment Configure

- **Purpose:** Manage custom/offline payment methods (bank transfers, cash, manual workflows) that exist outside automated gateways.
- **Key sections / flows:** Info card (description). Table with columns #, Name, Number Of Family, Key 1, Key 2, Settings (Edit/Delete). One live sample row: "احمد محمد" (2 families, key "01015264856"). "Add Payment" link. Pagination showing "2" (second page links to families filtered by payment_methods[0]=1).
- **Key SAFE actions:** View table, paginate.
- **Key MUTATING/dangerous actions:** "Add Payment" (create custom payment method), row "Edit", row "Delete" (remove a payment method that families may already be using).
- **Important modals/forms:** None captured on page.
- **Variant-of:** Variant of `management-settings-integrations-2-configure` (payment configure template), but uniquely has actual live data (1 record) vs the "No data found" empty state of all other payment gateways.
- **Broken/empty:** Not broken; has real data. Logo 404 as above.
- **UX improvement for the rebuild:** "Delete" on a custom payment method that has "Number Of Family = 2" should be blocked or require an explicit migration step (reassign those families to another method), not just a simple confirm/delete.

---

### `management-settings-integrations-11-configure` — Email Integration Configure

- **Purpose:** Configure SMTP email accounts for CRM messaging and automated notifications; manage multiple accounts with default/active flags.
- **Key sections / flows:** Two top-level tabs: "Accounts" and "Mail Settings".
  - **Accounts tab** (default): Table (#, Email Address, Default, Status, Settings with Edit/Delete); "Add Email Account" link goes to add-account sub-tab. Sub-tabs: "Add Email Account" (inline form — Email Address, SMTP Username, SMTP Password, Active checkbox, Default checkbox, Test SMTP button, Submit) and list view of existing accounts.
  - **Mail Settings tab:** Global SMTP host/port/encryption form (smtp.example.com, port number, encryption select: None/SSL/TLS), Submit.
- **Key SAFE actions:** Tab switching (Accounts / Mail Settings), "Test SMTP" (sends a test connection check).
- **Key MUTATING/dangerous actions:** "Add Account" / "Submit" (create a new email account), "Mail Settings" → "Submit" (changes global SMTP settings affecting all outgoing email), row Delete (removes an email account), "Add Email Account" link.
- **Important modals/forms:** Add Email Account form (email, SMTP username, password, active, default toggles); Mail Settings form (host, port, encryption).
- **Variant-of:** Unique template (tabbed email account management + SMTP settings, distinct from payment gateway template).
- **Broken/empty:** Table shows "No data found" — no email accounts configured in test environment.
- **UX improvement for the rebuild:** "Test SMTP" should show real-time feedback (loading spinner → success/failure message with connection details) rather than silently submitting; currently the UX intent is unclear.

---

### `management-settings-security-data-backup-send` — Security / Data Backup Send

- **Purpose:** This page's slug suggests it is a security/data-backup-send action page, but the captured content is actually the Email integration configure page (identical to slug 11 in structure and content). The crawler appears to have captured this URL while navigating from `/settings/security/data` but rendered the email configuration state from integration 11.
- **Key sections / flows:** Same as `management-settings-integrations-11-configure` (Accounts + Mail Settings tabs, SMTP forms, email account table).
- **Key SAFE actions:** Same as slug 11.
- **Key MUTATING/dangerous actions:** Same as slug 11 (Submit email account, Submit SMTP settings).
- **Important modals/forms:** Same as slug 11.
- **Variant-of:** Variant of (or duplicate of) `management-settings-integrations-11-configure` — the URL is `/settings/security/data/backup/send` but the page content matches the Email integration configure view. This is likely a crawler navigation artefact where clicking "send backup" redirected through the email config page; the actual backup-send functionality (if it exists) was not distinctly captured.
- **Broken/empty:** Page loaded (200 OK) but content does not match the URL slug's implied purpose (security/backup). Actual URL in interaction logs resolves to `/settings/integrations/11/configure`. This may indicate that the backup-send action uses the email integration to send the backup, or that the crawler followed a misleading link.
- **UX improvement for the rebuild:** If a "send data backup via email" feature exists, it should have its own dedicated confirmation page (choose destination email, confirm, show download/send progress) rather than dumping the user into the generic email account configuration screen.

---

## Module synthesis (this batch)

### What this module does and its core entities

This batch covers the admin **Settings** module, specifically:
- **General settings** (organisation identity, timezone, teacher pay tiers, class-cancellation/makeup rules, 2FA)
- **Personalisation** (theme, colours, sidebar, per-class-status colour codes)
- **Integrations** (11 external service connectors grouped as: incoming payments ×7, outgoing payouts ×2, communications ×2)
- **Security/backup** (likely sends a data backup via email; captured as duplicate of email integration page)

Core entities: payment gateway credential sets (keyed per provider, linked to "Number Of Family"), payout provider credentials (single-record per provider), email accounts (SMTP credentials, default flag), WhatsApp connection session, school configuration scalars.

### Distinct page templates vs variant count

| Template | Pages using it |
|---|---|
| Multi-tab general settings hub | 1 (slug: general) |
| Theme/colour personalisation | 1 (slug: customisation-personalisation) |
| Integration catalogue index | 1 (slug: integrations) |
| WhatsApp wizard + status panel | 1 (slug: integrations-1) |
| Standard payment gateway configure (info + key table + Add) | 6 variants (Stripe=2, Paypal=3, Mollie=4, Xpay=5, Payoneer=6, Paymob=7) |
| Custom payment configure (same template but with live data) | 1 variant (slug: integrations-10) |
| Payout provider configure (single-record form + webhook URL) | 2 variants (Paymob Payout=8, Payoneer Payout=9) |
| Email integration configure (tabbed: accounts + SMTP settings) | 2 pages (integrations-11, security-data-backup-send are identical) |

**Unique templates: 7. Variant pages: 8.**

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

- **WhatsApp "Logout"** — appears inline, no confirm dialog. Destroys entire WA session. Dangerous.
- **Paymob/Payoneer Payout "Save"** — switches between Sandbox/Live mode. Dangerous if wrong mode is saved.
- **Custom payment "Delete"** — deletes a payment method that families are actively using. Dangerous; no guard observed.
- **General Settings "Remove" (salary tier)** — removes configured rate tiers inline. Mildly dangerous; no confirm observed.
- **Email "Submit" (Mail Settings tab)** — changes global SMTP config affecting all outbound mail. Dangerous.
- **General Settings "Save changes" ×4** — each tab has its own save; no cross-tab dirty-state warning.
- **WhatsApp "Send" ×2** — sends actual WhatsApp messages to families/teachers as a test. Dangerous in production.
- **Personalisation "Reset to Default"** — nukes all colour customisation without confirm. Dangerous if accidental.

All tabs in the integrations configure pages (WhatsApp wizard steps, Email Accounts/Add Account/Mail Settings) are safe navigation only.

### Improvements for the new platform

1. **Confirmation dialogs:** WhatsApp Logout, "Reset to Default" (personalisation), credential Delete, and "Send" test messages all need explicit confirm modals with impact statements (e.g., "This will stop all WhatsApp notifications for N families").
2. **Dirty-state guard:** General Settings tabs — show unsaved-changes badge per tab and warn before navigating away.
3. **Credential masking:** Payment gateway tables show API keys in plain text columns ("Key 1" / "Key 2"). Rebuild should mask secrets and use reveal-on-demand, with humanised column names per provider.
4. **Integration status overview:** The integrations index should show live connection health (connected/error/unconfigured) on each card, not just a description. Reduces need to click into each provider.
5. **Custom payment method guard:** Block delete if "Number Of Family" > 0; require reassignment to another method first.
6. **WhatsApp integration warning banner:** The unofficial/free WhatsApp integration has a "Caution" block but it is buried below the wizard. Move it to the top as a persistent warning banner until the admin acknowledges it.
7. **Sandbox/Live mode clarity:** Payout provider forms should have a prominent mode indicator at the top of the page (not just a dropdown), and show a warning if switching from Sandbox to Live.
8. **Email Test SMTP feedback:** Show real-time spinner and success/error message when testing SMTP connectivity.
9. **Class status colour preview:** Personalisation page has 11 status colour pickers but no live preview. A mini-calendar or class-card mock that updates in real time would dramatically improve usability.
10. **RTL readiness:** All pages are LTR-only. Arabic company name exists as a field in General settings, implying the LMS operates in Arabic too. The rebuild must be RTL-first with bidirectional layout support for all settings forms.
11. **Security/backup page:** Needs its own distinct template — the current crawler captured the email integration page instead. Confirm with backend whether "send backup" is a standalone feature or a sub-action of the email integration.
12. **Accessibility (general settings tab):** The shared OTP phone number for all admins is a security anti-pattern. Flag for backend confirmation — individual admin OTP phones would be safer.

### Anything that needs owner/backend confirmation

- Does `/settings/security/data/backup/send` have its own distinct page or does it redirect through the email integration? The captured content is ambiguous.
- Is "Webhooks" (badge seen on the integrations index) a real tab/filter for a webhooks section not yet discovered?
- The "Apply for me" button on personalisation — what does it apply? Confirm if this is an AI colour suggestion or something else.
- Custom payment "Key 1" / "Key 2" column names — what do they represent for each provider? Need API spec to rename them correctly in the rebuild.
- Shared OTP phone for all admins (accessibility tab) — is this intentional? Security review recommended.
- WhatsApp integration: does the system support the official WhatsApp Business API as an alternative (referenced in the Caution card) — if so, where is that configure page?

---
# Batch 19 — admin · Students & Data Analysis

---

### `management-analysis-student` — Analysis: Student Statistics  (HTTP 200)
- **Purpose:** Admin analytics dashboard showing high-level student population metrics across demographics, status, and trends.
- **Key sections / flows:** Tab switcher (General Student Statistics / Course Statistics); 5 KPI counters (All students has course, Students with Courses, Students with Trial, Stopped Students, Students without Courses); Charts: Students Per Month (line), Students by Age Group (bar), Students by Language (pie), Students by Status (pie), Students by Gender (pie), Students by Country (bar), Students by Country — Map; Month filter dropdown; pagination.
- **Key SAFE actions:** View charts, switch month filter (Current Month / Last Month), navigate to Course Statistics tab, view notifications.
- **Key MUTATING/dangerous actions:** None beyond global chrome (logout, Add shortcuts save).
- **Important modals/forms:** None (read-only analytics page). Global shortcuts modal (title + link, Save).
- **Variant-of:** Unique template — analytics dashboard with dual-tab (Students / Courses).
- **Broken/empty:** No broken state. Data is live (small dataset — 2 students total). Chart CSS leaked into card text (ApexCharts styles captured in text extraction).
- **UX improvement for the rebuild:** Combine the two sub-tabs (Student / Course) into a single top-level nav with deep-linking so bookmarking a specific chart view works; add date-range picker (not just month) for trend charts.

---

### `management-analysis-course` — Analysis: Course Statistics  (HTTP 200)
- **Purpose:** Admin analytics dashboard scoped to course-level metrics (teacher count per course, student distribution by course and language).
- **Key sections / flows:** Same dual-tab chrome as analysis-student; KPI cards: All students has course (1), Total Number of Teachers per Course (1); Charts: Number of Students per Course, Number of Students & Teachers per Course, Number of Students & Teachers per Student Language; course selector dropdown (×arabic); date-range picker; month selector.
- **Key SAFE actions:** Switch tab back to Student Statistics, choose course in filter dropdown, change month/date range.
- **Key MUTATING/dangerous actions:** None (read-only).
- **Important modals/forms:** None (read-only). Global chrome only.
- **Variant-of:** Variant-of `management-analysis-student` (same tab-shell, different charts/KPIs scoped to courses).
- **Broken/empty:** No broken state; course selector shows "×arabic" meaning a chip tag is removable — correct interaction captured.
- **UX improvement for the rebuild:** Add a multi-course comparison mode; allow comparing two courses on the same chart rather than one at a time.

---

### `management-forms-students` — Monthly Reports: Student Forms List  (HTTP 200)
- **Purpose:** Admin view to see which students have or have not received a monthly progress report from teachers; allows admin to trigger report submission.
- **Key sections / flows:** Filter bar (Teacher, Student, has report: Yes/No, Filter/Reset); table: #, Student Name, Parent name, Teacher, has report (0 rows on capture — empty state); "Send Report" modal triggered per row; "Student Timetable" modal for schedule view.
- **Key SAFE actions:** Filter by teacher/student/has-report, view student timetable modal, Reset filters.
- **Key MUTATING/dangerous actions:** Submit (Send Report modal) — posts to `/teacher/student-progress`; creates/updates the monthly progress report record for a student.
- **Important modals/forms:** **Send Report** modal (large) — fields: month (select Jan–Dec), achievements (textarea), learning_progress (radio: Excellent/Very Good/Good/Very Slow Progress), focus (radio: Always/Often/Sometimes/Rarely), homework_completion (radio), punctuality (radio), rescheduled_sessions (radio: None/1/2/More than 2), additional_support (textarea), learning_objectives (textarea); hidden: student_id, course_id, teacher_id, course_name, action. Submit button posts to `/teacher/student-progress`. **Student Timetable** modal — view only.
- **Variant-of:** Unique template — monthly report tracking list.
- **Broken/empty:** Table is empty (0 rows) on capture — no data in test environment. Empty state renders as blank table with headers only.
- **UX improvement for the rebuild:** Render an explicit empty-state illustration with CTA when no reports exist; add column sorting and a "Send Reminder to Teacher" quick action per row to prompt pending reports.

---

### `management-student` — Student List (Active)  (HTTP 200)
- **Purpose:** Primary admin student listing — shows all students with status breakdown KPIs at top and an active-status table with per-row actions.
- **Key sections / flows:** 7 status KPI tiles (Active 2/100%, Suspended 0, Stop 0, Inactive 0, On Trial 0, Incomplete 0, Deleted 0) — each tile is a clickable link to `/student/status/{N}`; table: #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age, Actions (per row: Show Details, Add Courses, Edit, Suspend Student, Delete).
- **Key SAFE actions:** Click status tile to filter by status, Show Details (navigate to student detail), Edit (navigate to edit form), view month picker.
- **Key MUTATING/dangerous actions:** **Suspend Student** (per-row); **Delete** (per-row, posts to `/student/{id}/delete` — no confirm dialog observed beyond possible JS confirm); Add Courses.
- **Important modals/forms:** Delete forms are inline (hidden `_method` + `_token`); no explicit confirmation modal captured on this page. Global chrome modals only.
- **Variant-of:** Unique template (base student list).
- **Broken/empty:** No broken state; table has 2 students.
- **UX improvement for the rebuild:** Replace raw inline delete forms with a confirmation modal (with student name displayed) to prevent accidental deletion; add search/filter bar (name, language, gender, timezone) directly on this list.

---

### `management-student-1` — Student Detail: Student #1  (HTTP 200)
- **Purpose:** Full student profile page with tabbed sub-sections: courses, trials, siblings, and monthly plan reports.
- **Key sections / flows:** Profile header (student name + parent, status badge: Active, Admin/Teacher notices); action buttons: Add trial, Add Course, Search Teacher, Add Free Course, Edit Profile, Suspend, Stop, Schedule Stop on Date; **Courses tab** (default): table of courses (Serial, Start Date, Teacher, Material, Total Hours, Status, Certificates, Actions — 1 row: Eg91718, arabic, 5H, Active & unpaid, Not Paid); course row actions: Copy Course Data, Add Classes, Assign to Invoice, Show Timetable, Show Current/Default Course, Change Status, Edit Schedule, Cancel on Date, Delete Schedule, Cancel Classes; **Trials tab**: table (Date & Time student TZ, Teacher, Course/Duration, Status, History, Settings — 1 row: 20 Jun 2026, arabic 30m, Waiting); trial row actions: Reverse Action, Add Queue, Attend Class, Cancel Class, Absent Class, Edit Class, Running, Send Reminder, Send WA Message, Delete Fine; **Siblings tab**: family members list with Add Sibling, Show Details, Search Teacher, Edit, Delete per sibling; **monthly plan tab**: report table (#, Month, Teacher Name, Course Name, View, Delete, Edit, Approve) — No data.
- **Key SAFE actions:** Navigate tabs, view timetable modal (read-only), view certificate details, view course details, preview certificate.
- **Key MUTATING/dangerous actions:** Delete Schedule (POST `/courses/{id}/delete`); Cancel Classes (POST to `/scheduled-actions` — schedules bulk cancellation); Stop Student (POST `/student/1/stop` — suspends all courses); Suspend Student; Delete student (POST `/student/1/delete`); Attend Class (marks attendance, optional message send); Mark As Absent (with notification and makeup choice); Cancel Class; Edit Class (reschedules with optional notification); Add Classes (POST `/courseClasses/add-classes`); Change Course Status (Active/Paid/Completed/Stop); Assign to Invoice; Create/Upload Certificate; Delete Fine (POST `/teachers/{id}/compensations/{id}`); Approve (certificate approval with WhatsApp send option); Add Sibling; Add Queue.
- **Important modals/forms:** 23 modals total. Key ones: **Schedule Cancel Classes** — scheduled_date, cancel_type (Auto Makeup/Reschedule/No Makeup), reschedule date/time, add_to_credit checkbox, note. **Stop Student** — note (required). **Suspend Student** — returned_at date, schedule_auto_return checkbox, note. **Schedule Stop** — scheduled_date, returned_at, schedule_auto_return, note. **Add Lesson** — date, time, duration, from credit, teacher, accounting statement. **Mark as attend** — radio (no details / with details), remark, summary, homework, notes, file upload. **Mark As Absent** — absent_by, note, notification choice (Don't send/Default/Custom message), makeup option, add_to_credit, timezone choice, reschedule date/time. **Cancel Class** — cancel_by, note, send_notification, makeup option, add_to_credit, timezone, reschedule. **Edit Class** — new date/time, send_notification, duration, teacher, accounting. **Send WhatsApp Message** — message text, send to Teacher/Student(s) checkboxes. **Certificate Information** — student_name, teacher_name, description, date, template select. **Add Quick Queue** — level (Urgent/Medium/Normal), text. **Approve** (certificate) — preview + send to WhatsApp options. **All Invoice For This Parent** — invoice select. **Change Course Status** — status select (Active Unpaid/Paid/Completed/Stop).
- **Variant-of:** Unique template (student detail with tabbed course management).
- **Broken/empty:** Monthly plan tab shows "No data found / No reports found". Certificate table 0 rows. Siblings trial tab 0 rows. These are empty states, not errors.
- **UX improvement for the rebuild:** The 23 modals on a single page create extreme cognitive load. Refactor into a structured action panel or drawer: group course actions (schedule, cancel, status) under a single "Course Actions" dropdown per row, session actions (attend, absent, cancel, edit) under a "Session" context menu, and lifecycle actions (stop, suspend, delete) behind a clearly labelled "Danger Zone" section with explicit double-confirm modals naming the student.

---

### `management-student-1-create` — Create Student for Family #1  (HTTP 200)
- **Purpose:** Form to add a new student under a specific family account.
- **Key sections / flows:** Single card "Student Information" with fields: name (EN), name_ar (AR), language select (10 options), gender select, birth_date, teacher_note textarea, admin_note textarea; optional "Add trial" checkbox that conditionally reveals trial fields: material select, teacher_id select, duration select, accounting_statement select, date, time.
- **Key SAFE actions:** Navigate away (cancel without submit).
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/1/store` (creates new student record under family 1, optionally scheduling a trial).
- **Important modals/forms:** Main form (POST `/student/1/store`). No additional modals.
- **Variant-of:** Unique template (student creation). See `management-student-2-create` which is identical with family ID 2.
- **Broken/empty:** No broken/empty state.
- **UX improvement for the rebuild:** Show trial scheduling fields inline with smooth expand animation on checkbox toggle; add real-time timezone display based on family's timezone so admin knows what time slot they're booking in student-local time.

---

### `management-student-1-edit` — Edit Student #1  (HTTP 200)
- **Purpose:** Edit form for an existing student's profile details (not course/trial data).
- **Key sections / flows:** Same card "Student Information" as create but pre-populated; fields: name, name_ar, language, gender, birth_date, teacher_note (optional), admin_note (optional); no trial fields (edit only, not creation).
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — PATCH via POST to `/student/1/update`.
- **Important modals/forms:** Single edit form. No additional modals.
- **Variant-of:** Variant-of `management-student-1-create` (same field layout, minus trial creation, pre-populated values).
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** Show last-edited timestamp and editor identity above the form; add change-log/history link for audit trail.

---

### `management-student-1-trial-create` — Create Trial for Student #1  (HTTP 200)
- **Purpose:** Schedule a new trial session for student #1 with a specific teacher, material, duration, and time.
- **Key sections / flows:** Card "Trial"; shows count of previous trials (1); student selector (locked to this student); unnamed select (appears to be sub-student/sibling picker); He studies ages radio (Children/Teens/Adults); active course select; duration select (10–180 min); accounting statement select (According to teacher/Paid/Paid if continue/Free); date picker; time picker; teacher select (async/searchable).
- **Key SAFE actions:** Cancel/navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/1/trial/store` (creates a trial session record).
- **Important modals/forms:** Single trial form (`students_form`).
- **Variant-of:** Unique template (trial creation). `management-student-2-trial-create` is identical for student #2.
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** Display teacher availability inline (mini calendar view) after teacher selection so admin can pick a slot without leaving the page.

---

### `management-student-2` — Student Detail: Student #2  (HTTP 200)
- **Purpose:** Same template as management-student-1 but for student #2 (منار حسن — female, no active courses).
- **Key sections / flows:** Identical tab structure (Courses/Trials/Siblings/monthly plan). Courses tab shows no course (empty), Trials tab shows no trials, Siblings shows family member with "Not added" course/subscription status, monthly plan shows "No data found".
- **Key SAFE actions:** Same as student-1 detail.
- **Key MUTATING/dangerous actions:** Same set: Add trial, Add Course, Suspend, Stop, Delete student, per-course and per-session actions (though no sessions present).
- **Important modals/forms:** Same 21 modals as student-1 (Certificate, Invoice, Timetable, Change Status, Add Lesson, Schedule Stop, Stop, Suspend, Add Lesson, Certificate Info, Add Queue, Attend, WhatsApp, Absent, Edit Class, Cancel Class, Feedback, Approve).
- **Variant-of:** Variant-of `management-student-1` (same template, different student ID; student #2 has fewer active records).
- **Broken/empty:** Courses tab is empty — no course row. Monthly plan: "No data found". Certificates: 0 rows. Expected empty states for a student with no active enrollment.
- **UX improvement for the rebuild:** When a student has no courses, show a prominent empty state with a direct "Add Course" CTA to reduce navigation steps.

---

### `management-student-2-create` — Create Student for Family #2  (HTTP 200)
- **Purpose:** Create a new student under family #2.
- **Key sections / flows:** Identical form to `management-student-1-create`.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/2/store`.
- **Important modals/forms:** Same as student-1-create.
- **Variant-of:** Variant-of `management-student-1-create` (family ID param only differs).
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** (Same as student-1-create) — inline trial scheduler with timezone context.

---

### `management-student-2-edit` — Edit Student #2  (HTTP 200)
- **Purpose:** Edit profile of student #2.
- **Key sections / flows:** Identical edit form to student-1-edit, pre-populated with student #2 data.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — PATCH via POST to `/student/2/update`.
- **Important modals/forms:** Same as student-1-edit.
- **Variant-of:** Variant-of `management-student-1-edit` (student ID only differs).
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** (Same as student-1-edit.)

---

### `management-student-2-trial-create` — Create Trial for Student #2  (HTTP 200)
- **Purpose:** Schedule a trial for student #2.
- **Key sections / flows:** Identical form to student-1-trial-create; no previous trial count shown (student #2 has 0 trials vs student #1's 1).
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/2/trial/store`.
- **Important modals/forms:** Same as student-1-trial-create.
- **Variant-of:** Variant-of `management-student-1-trial-create`.
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** (Same as student-1-trial-create.)

---

### `management-student-status-3` — Student List: Active Status  (HTTP 200)
- **Purpose:** Filtered student list showing only Active students (status=3); same layout as main student list with status KPIs + filtered table.
- **Key sections / flows:** Status KPI bar (same 7 tiles, Active highlighted); table with 2 rows (both students active) with per-row actions: Show Details, Add Courses, Edit, Suspend Student, Delete; delete forms present inline.
- **Key SAFE actions:** Click other status tiles to switch view, Show Details, Edit.
- **Key MUTATING/dangerous actions:** **Suspend Student** (per row); **Delete** (per row, POST `/student/{id}/delete`, no confirm modal observed at list level).
- **Important modals/forms:** No dedicated modals on list; delete is inline form.
- **Variant-of:** Variant-of `management-student` (status param = 3 / Active).
- **Broken/empty:** No issues; 2 active students present.
- **UX improvement for the rebuild:** Unify all status-filtered views into a single paginated table with a status filter chip/tab bar at the top (avoid 7 separate routes).

---

### `management-student-status-0` — Student List: Incomplete Status  (HTTP 200)
- **Purpose:** Filtered student list for status 0 (Incomplete students — registration started but not fully enrolled).
- **Key sections / flows:** Same KPI bar; table header present, 0 data rows (empty); no per-row delete forms (no students in this state).
- **Key SAFE actions:** Navigate to other status views.
- **Key MUTATING/dangerous actions:** None present (empty table).
- **Important modals/forms:** None (empty state).
- **Variant-of:** Variant-of `management-student` (status=0, Incomplete).
- **Broken/empty:** Empty table (expected — 0 incomplete students in test environment).
- **UX improvement for the rebuild:** Display an explicit "No incomplete students" empty state with description of what "Incomplete" means.

---

### `management-student-status-1` — Student List: Inactive Status  (HTTP 200)
- **Purpose:** Filtered list for Inactive students (status=1).
- **Key sections / flows:** Same template; 0 rows; table with column headers only.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty).
- **Important modals/forms:** None (empty state).
- **Variant-of:** Variant-of `management-student` (status=1, Inactive).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** (Same as status-0 — unified filter approach.)

---

### `management-student-status-2` — Student List: Trial Status  (HTTP 200)
- **Purpose:** Filtered list for students currently in Trial status (status=2).
- **Key sections / flows:** Same template; 0 rows.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty).
- **Important modals/forms:** None.
- **Variant-of:** Variant-of `management-student` (status=2, Trial).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** (Same — unified filter.)

---

### `management-student-status-4` — Student List: Suspended Status  (HTTP 200)
- **Purpose:** Filtered list for Suspended students (status=4).
- **Key sections / flows:** Same template; 0 rows.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty; if rows present, would have reinstate/delete per row).
- **Important modals/forms:** None.
- **Variant-of:** Variant-of `management-student` (status=4, Suspended).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** When students are suspended, show their suspension date and expected return date in the table.

---

### `management-student-status-6` — Student List: Stopped Status  (HTTP 200)
- **Purpose:** Filtered list for Stopped students (status=6 — fully stopped/unenrolled).
- **Key sections / flows:** Same template; 0 rows.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty; if rows present would include re-activate option).
- **Important modals/forms:** None.
- **Variant-of:** Variant-of `management-student` (status=6, Stopped).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** For stopped students, surface the stop reason (note stored at stop time) and the teacher recommendation in the row for quick triage.

---

## Module synthesis (this batch)

### What this module does and its core entities
This batch covers the **Students module** (full CRUD + lifecycle management) and the **Data Analysis / Analytics** sub-module for students and courses. Core entities: **Student** (belongs to a Family, has status, language, gender, age, timezone, WhatsApp group); **Course** (serial, teacher, material, hours, status, payment state); **Trial Session** (one-off evaluation class before enrollment); **Class/Session** (individual lesson within a course — can be attended, cancelled, rescheduled, or marked absent); **Monthly Report** (teacher's progress submission per student per course per month); **Certificate** (generated or uploaded per student per course); **Queue** (urgent/normal admin note per class); **Sibling** (cross-reference of students in the same family).

Student lifecycle status codes confirmed: 0=Incomplete, 1=Inactive, 2=Trial, 3=Active, 4=Suspended, 6=Stopped (no status 5 observed).

### Distinct page templates vs variant count
**Unique templates (8):**
1. `management-analysis-student` — student analytics dashboard (dual-tab)
2. `management-analysis-course` — course analytics tab (variant tab of #1, but distinct enough to note)
3. `management-forms-students` — monthly report tracking list
4. `management-student` — student list with status KPI tiles (base template)
5. `management-student-{id}` — student detail page with 4-tab structure + 23 modals
6. `management-student-{id}-create` — create student form
7. `management-student-{id}-edit` — edit student form
8. `management-student-{id}-trial-create` — create trial session form

**Variant pages (10):**
- `management-student-2` — variant of student detail (student ID differs)
- `management-student-2-create` — variant of create (family ID differs)
- `management-student-2-edit` — variant of edit
- `management-student-2-trial-create` — variant of trial create
- `management-student-status-0` (Incomplete), `-1` (Inactive), `-2` (Trial), `-3` (Active), `-4` (Suspended), `-6` (Stopped) — all variants of base student list template

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

**Tabs:** Dual-tab (Students/Course analysis); 4-tab (Courses/Trials/Siblings/Monthly Plan) on student detail. Both use client-side JS tab switching without URL change — deep-linking broken.

**Filters:** Status KPI tiles (clickable, navigate to separate URL per status); course/student/has-report dropdowns on forms-students; month picker on analytics; course selector on analysis-course.

**Dangerous modals (must never be auto-fired):**
- Stop Student — suspends all courses, affects billing
- Suspend Student — suspends courses with invoice implications
- Schedule Stop on Date — sets future automated stop
- Delete Student — permanent deletion (POST `/student/{id}/delete`)
- Delete Schedule — cancels course schedule
- Cancel Classes (bulk scheduled cancel) — mass session cancellation
- Mark As Absent — triggers notifications and makeup decisions
- Cancel Class — individual session cancel with notification
- Approve (certificate) — sends WhatsApp message to family
- Delete Fine — removes teacher compensation record

**Safe modals:**
- Student Timetable (view only)
- Certificate Details (view only)
- Add Quick Queue
- Mark as attend (with class details)
- Send WhatsApp Message (requires explicit send confirmation by author)
- Change Course Status (requires selection + submit)
- All Invoice for Parent (assign only)
- Add Lesson (schedules new lesson)

### Improvements for the new platform

1. **Status routing — consolidate into one page:** Replace 7 separate `/student/status/{N}` routes with a single `/students` page using a status filter chip row (Active / Suspended / Stopped / Trial / Inactive / Incomplete / Deleted). Use query params (`?status=3`) for deep-linking and browser back compatibility.

2. **Student detail — modal overload:** The 23-modal student detail page is a major UX problem. Refactor: group per-course actions into a course action drawer (slide-in panel), per-session actions into a session action context menu (right-click or ellipsis), and lifecycle/danger actions (stop, suspend, delete) into a separate "Account Management" panel with explicit two-step confirm dialogs that display the student name.

3. **Tab deep-linking:** Both the analysis dashboard and student detail tabs do not update the URL on tab switch, breaking the browser back button and making sharing/bookmarking impossible. All tab state must be reflected in the URL hash or query param.

4. **Delete confirmation:** No per-row confirmation modal observed for student deletion or course deletion on the list pages. The new platform must always show a named confirmation dialog (e.g., "Delete student Mohammed Ahmed? This cannot be undone.") before any destructive action.

5. **Monthly reports empty state:** `management-forms-students` table renders with 0 rows and no helpful empty state. Add an illustration + message + "Send Reminder to All Pending Teachers" bulk action.

6. **Analytics charts:** `management-analysis-student` uses ApexCharts with raw CSS leaking into the captured text. The rebuild should use a proper charting library with RTL support and accessible color palettes (not just language-specific color, but status-coded colors consistent with the rest of the UI).

7. **Trial form — teacher availability:** Selecting a teacher on the trial creation form provides no feedback on their availability. Show a mini weekly schedule or availability indicator after teacher selection.

8. **Status badge colors:** 7 statuses need distinct, accessible, RTL-safe status chips. Proposed palette: Active=green, Trial=blue, Suspended=amber, Stopped=red, Inactive=gray, Incomplete=orange, Deleted=black/strikethrough. Do not use only color — add icon + label.

9. **Certificate workflow:** The Approve modal triggers a WhatsApp send. This should show a preview of the message before dispatching, with explicit "Cancel" vs "Send" buttons rather than the current radio-then-approve flow.

10. **RTL / i18n:** All pages are LTR en. Student data includes Arabic names (محمد احمد, منار حسن) and teacher names in Arabic. The new platform must support RTL layout for Arabic users — particularly the student detail tabs, session table, and all modal forms.

### Anything that needs owner/backend confirmation
- **Status code 5 is missing:** Statuses 0,1,2,3,4,6 are confirmed. Status 5 is not represented — confirm with backend what status=5 means and whether a `/student/status/5` route exists.
- **`/management/management/members/invoice`** — double `management` in the URL (likely a routing bug): `https://academatic.online/management/management/members/invoice`. Confirm correct endpoint.
- **Accounting statement field** appears as both "Change Course Status" label and "Accounting Statement" depending on context — confirm the correct field semantics (free/paid/according-to-teacher).
- **Delete Fine** posts to `/management/teachers/{teacher_id}/compensations/{comp_id}` — confirm whether deleting a fine from a student's trial view is the intended flow or an accidental exposure.
- **Monthly report actions** post to `/teacher/student-progress` (teacher role endpoint), not a management endpoint — confirm admin has authority to submit teacher reports on the teacher's behalf, and whether audit logging exists.

---
# Batch 20 — admin · Students (Soft-Delete view)

---

### `management-student-status-softdelete` — Student Status: Deleted (SoftDelete)  (HTTP 200)

- **Purpose:** Displays the "Deleted Students" sub-view of the Student Status page — a filtered list of soft-deleted (logically removed but not purged) student records within the student management module.
- **Key sections / flows:**
  - KPI summary row: 7 status cards covering Active (2, 100%), Suspended (0%), Stop (0%), Inactive (0%), On Trial (0%), Incomplete (0%), and Deleted Students (0%) — each showing count + percentage.
  - "Deleted Students" section heading (H5) with a data table underneath.
  - Table columns: #, Student Name, Parent Name, Timezone, WhatsApp Group, Language, Gender, Age (9 columns total, 0 data rows in the captured snapshot — empty state).
  - Month filter (select) to scope the listing by time period.
  - Pagination present (1 page, `javascript:void(0)` — effectively empty).
  - Interaction: one dropdown/menu interaction captured on the same URL (no navigation change), likely the KPI-card status filter or row action menu.
- **Key SAFE actions:** View deleted student list, filter by month, navigate to other status views via KPI cards, navigate sidebar links, view all courses, view all queues.
- **Key MUTATING/dangerous actions:** "Save" (Add Shortcuts form — persists a shortcut link), "See All Notifications" (submit). No student-restore or permanent-delete buttons are visible in the captured state; however the row action menu (dropdown interaction) likely exposes restore/permanent-delete — these must NEVER be auto-fired and require confirmation dialogs.
- **Important modals/forms:**
  - Modal 1 (dynamic/loading): Content shown as "Loading…" — likely a row-level detail or action modal triggered from the table row action menu. Purpose unclear from static capture; must be confirmed with backend owner.
  - Modal 3 — Add Shortcuts: Title + Link fields; Save submits to `/management/shortcuts` (POST). Standard global chrome; skip in rebuild per rules.
- **Variant-of:** `management-student-status-*` template family. This page is a query-param/path variant of the parent Student Status listing (`/management/student/status/<StatusName>`), sharing the same KPI cards + table layout. The base template is `management-student` (student list) with a status-filter URL pattern. Among the status variants identified: Active, Suspended, Stop, Inactive, OnTrial, Incomplete, SoftDelete — this is the SoftDelete variant.
- **Broken/empty:** Table has 0 rows in the captured snapshot — empty state (no deleted students exist at capture time). No error HTTP status. Logo image returns 404 (`/storage/uploads/logo.png`) — site-wide asset issue, not page-specific.
- **UX improvement for the rebuild:** The empty state for the deleted students table renders as a completely blank table body with no messaging. The rebuild should display a proper empty-state component (e.g., an icon + "No deleted students found" message + optional "Return to Active Students" CTA) to make the zero-row state immediately comprehensible. Additionally, the row action menu (likely restore / permanent delete) should be replaced by an explicit two-step confirmation flow with clear labeling — especially for permanent delete, which should require a typed confirmation or a separate danger-zone modal.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single-page batch covers the Soft-Delete sub-view of the Student Status module within the admin panel. The core entity is the Student record, which carries a lifecycle status (Active / Suspended / Stop / Inactive / On Trial / Incomplete / Deleted). The SoftDelete view surfaces logically-deleted students for review and potential restoration or permanent removal, without destroying the records from the database.

**Distinct page templates vs variant count:**
- Unique templates: 1 (`management-student-status-softdelete` is itself a variant of the broader student-status template)
- Variant pages: 1 (this batch contains exactly 1 page; it is one of ~7 status-filter variants of the same underlying student table template)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Month filter (select): safe, scopes the table.
- KPI status cards: navigation-safe, switch between status views.
- Row action dropdown (inferred from interaction capture): likely mutating — restore or permanent delete. Must be treated as dangerous; requires confirmation.
- Loading modal (Modal 1): purpose unconfirmed — could be a student detail drawer or a row-action confirmation form. Dangerous if it triggers restore/delete.
- Add Shortcuts modal: global chrome, not dangerous to student data.

**Improvements for the new platform:**
1. **Empty/error state:** Replace the blank table body with a designed empty-state component (icon, message, optional action).
2. **Status navigation:** Replace the KPI card row as a navigation mechanism with a proper tab bar or segmented control so intent is explicit and accessible.
3. **Dangerous actions (restore / permanent delete):** Move out of an unlabeled dropdown into named row-action buttons with clear icons; wrap permanent delete in a two-step danger modal with explicit confirmation text ("Type DELETE to confirm").
4. **Table columns:** Consider adding a "Deleted At" timestamp column so admins can audit when deletion occurred — a critical field missing from the current layout.
5. **RTL-first:** Page is captured as LTR; rebuild should support RTL (Arabic) as the primary direction given the platform's audience, flipping the table, sidebar, and KPI cards.
6. **Mobile:** The 9-column table does not collapse gracefully on small screens; rebuild should use a card-list or collapsible row pattern for mobile teachers/family users.
7. **Pagination:** Rebuild with server-side pagination + page-size selector; the current `javascript:void(0)` pagination link is non-functional.
8. **Status colors:** KPI cards use text-only percentage labels; rebuild should apply semantic color coding (green=active, red=deleted, amber=suspended) with WCAG-compliant contrast ratios.
9. **Search within deleted list:** No search input is scoped to the deleted students table; add an inline filter/search for Student Name or Parent Name.
10. **Logo 404:** Site-wide broken logo asset should be resolved in the asset pipeline before launch.

**Items needing owner/backend confirmation:**
- What actions are available from the row action dropdown for deleted students (restore only, or permanent purge too)?
- Is permanent deletion hard-delete or does it move to a second archive tier?
- Does the "Deleted Students" KPI card count update in real time, or is it a cached/batch-computed figure?
- What triggers the Loading modal (Modal 1) — is it a student detail pane or an action confirmation form?
- Is the Month filter applied to deletion date, enrollment date, or session date?

---
# Batch 21 — admin · Staff / Admin Management + Teacher Operations

---

### `management-admins` — Staff Members List

- **Purpose:** Index page listing all admin/staff members with per-row action menu.
- **Key sections / flows:** Single table — columns: Name, Username, Phone number, Role, Actions. Each row exposes: Show All Action, Edit Permissions, Category, Edit, Duplicate with Permissions, Delete. Pagination present (1 page, 2 rows: "Eslam Essam" and "mohamed").
- **Key SAFE actions:** View table rows, navigate to other pages.
- **Key MUTATING/dangerous actions:** Delete admin (row-level hidden form POST to `/admins/{id}` with `_method` override — no visible confirm dialog captured); Edit, Duplicate, Category assignment.
- **Important modals/forms:** No meaningful inline modal for delete — the delete is a raw hidden form submit. "Add Member" link navigates to create form.
- **Variant-of:** Unique template (admin list index).
- **Broken/empty:** None — 2 rows loaded, HTTP 200. Logo image returns 404 (consistent across all pages in this batch).
- **UX improvement for the rebuild:** Replace the raw hidden-form delete with a named destructive confirmation dialog (show admin name + role, require typed confirmation or explicit confirm step). Consolidate the 6-action row menu into a clear icon-button dropdown with visual separators between safe/destructive actions.

---

### `management-admins-6-edit` — Edit Admin (ID 6)

- **Purpose:** Edit an existing admin staff member's profile, role, salary and access level.
- **Key sections / flows:** Single card/form. Fields: Full name, E-mail, Username, Phone number, Password, Salary, Currency (15 options), Role (Manager/Accountant/Supervisor/Support), Status (Active/Deactivate), Enable 2FA (Active/Deactivate). Submit button.
- **Key SAFE actions:** Navigate away, view sidebar.
- **Key MUTATING/dangerous actions:** Submit form (POST to `/admins/6` — saves all profile edits); changing role/status/2FA.
- **Important modals/forms:** Main edit form — fields: name, email, username, phone, password, salary, currency, role, status, enable (2FA toggle).
- **Variant-of:** `management-admins-7-edit` (same template, different ID).
- **Broken/empty:** None — HTTP 200.
- **UX improvement for the rebuild:** Password field should have a show/hide toggle and strength indicator. Role and 2FA changes (especially deactivation) should require a secondary confirm step. Group credentials vs. access-control fields visually.

---

### `management-admins-7-edit` — Edit Admin (ID 7)

- **Purpose:** Identical edit form for admin ID 7.
- **Key sections / flows:** Identical structure to `management-admins-6-edit` — full edit form targeting `/admins/7`.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit (saves name, email, username, phone, password, salary, currency, role, status, 2FA setting).
- **Important modals/forms:** Same as admin-6-edit.
- **Variant-of:** `management-admins-6-edit` (ID variant).
- **Broken/empty:** None — HTTP 200.
- **UX improvement for the rebuild:** Same as admin-6-edit. Consider a single `/admins/:id/edit` route instead of separate captured instances.

---

### `management-admins-appear-6` — Admin Activity Log (ID 6)

- **Purpose:** Read-only audit trail of all actions performed by admin user 6, filterable by action type and entity type.
- **Key sections / flows:** Two filter bar groups — (1) entity type: All Activities / Course / Teacher / Parent / Classes / Login; (2) action type: All Activities / Created / Updated / Deleted. Activity timeline below (empty for ID 6 — no entries shown). Pagination present.
- **Key SAFE actions:** Apply entity/action filters (GET forms), view timeline.
- **Key MUTATING/dangerous actions:** None on this page.
- **Important modals/forms:** No meaningful modals.
- **Variant-of:** `management-admins-appear-7` (same template, different ID).
- **Broken/empty:** ID 6 activity list appears empty (no entries rendered in the All Activity section). Not a system error — may simply have no recorded activity.
- **UX improvement for the rebuild:** Add an explicit empty state with illustration and explanation ("No activity recorded for this admin"). Add date-range filter. Replace the two separate filter bars with a single combined filter control.

---

### `management-admins-appear-7` — Admin Activity Log (ID 7)

- **Purpose:** Audit trail of all actions performed by admin user 7, with real data visible.
- **Key sections / flows:** Same two filter groups as ID 6. Activity timeline shows real entries (June 2026): updated family email, created/updated family and teacher records (with field-level diff). "Show Details" expand buttons reveal before/after field values.
- **Key SAFE actions:** Filter by entity type / action type, expand "Show Details" accordion, navigate.
- **Key MUTATING/dangerous actions:** None.
- **Important modals/forms:** "Show Details" accordion (inline expand, not a modal) reveals field-level change diff (e.g., `abdo` → `المعلم محمد صادق`, timezone changes, WhatsApp group URL).
- **Variant-of:** `management-admins-appear-6` (same template, different ID / populated data).
- **Broken/empty:** None — data loaded. HTTP 200.
- **UX improvement for the rebuild:** Show diffs inline with a clear before/after color distinction (red/green). Add export-to-CSV action. Support date-range navigation for the timeline.

---

### `management-admins-categories-6` — Assign Categories to Admin (ID 6)

- **Purpose:** Assign one or more supervisory categories (student-facing and teacher-facing) to an admin, controlling what they can manage.
- **Key sections / flows:** Two checkbox groups — "Student Categories" (المشرفه حسناء, المشرفه اسماء) and "Teacher Categories" (محمد السيد). Submit button saves the assignment to `/admins/categories/6`.
- **Key SAFE actions:** View current assignment.
- **Key MUTATING/dangerous actions:** Submit (reassigns category permissions for this admin — can expand or revoke access scope).
- **Important modals/forms:** Main form — `categories[]` checkboxes, one submit button.
- **Variant-of:** `management-admins-categories-7` (same template, different ID).
- **Broken/empty:** None — HTTP 200.
- **UX improvement for the rebuild:** Show current assignment state clearly (pre-checked). Add a "Select All" shortcut. Warn if removing all categories (would strip this admin of supervisory scope). RTL-friendly checkbox layout is needed for Arabic category names.

---

### `management-admins-categories-7` — Assign Categories to Admin (ID 7)

- **Purpose:** Identical category assignment for admin ID 7.
- **Key sections / flows:** Same checkbox form targeting `/admins/categories/7`. Same 3 categories available.
- **Key SAFE actions:** View assignment.
- **Key MUTATING/dangerous actions:** Submit (saves category permissions).
- **Important modals/forms:** Same as admin-6-categories.
- **Variant-of:** `management-admins-categories-6` (ID variant).
- **Broken/empty:** None — HTTP 200.
- **UX improvement for the rebuild:** Same as categories-6.

---

### `management-admins-create` — Create New Admin

- **Purpose:** Create a new admin/staff account from scratch.
- **Key sections / flows:** Single full form — identical fields to the edit page: Full name, E-mail, Username, Phone, Password, Salary, Currency, Role (Manager/Accountant/Supervisor/Support), Status, Enable 2FA. POSTs to `/admins`.
- **Key SAFE actions:** Navigate away without submitting.
- **Key MUTATING/dangerous actions:** Submit (creates new admin account with selected role and access level — dangerous if role is Manager).
- **Important modals/forms:** Creation form — same 11 fields as edit. No confirmation step before account creation.
- **Variant-of:** Unique template (create admin).
- **Broken/empty:** None — HTTP 200.
- **UX improvement for the rebuild:** Add a preview/summary step before final creation (especially for Manager role). Enforce required fields with ARIA validation. Password field must have strength meter. Email uniqueness check should be inline (async).

---

### `management-admins-duplicate-6` — Duplicate Admin with Permissions (ID 6)

- **Purpose:** Create a new admin account pre-seeded with the same permissions as admin ID 6, requiring only new identity credentials.
- **Key sections / flows:** Form identical to create, with a `source_id` hidden field pre-filled with 6 and a banner: "Duplicating permissions from: Eslam Essam". Fields: all credential fields + currency/role/status/2FA selects.
- **Key SAFE actions:** Navigate away without submitting.
- **Key MUTATING/dangerous actions:** Submit (creates a new admin who inherits all permissions of the source admin — high risk if source has Manager role).
- **Important modals/forms:** Form with `source_id` hidden field. No confirmation step.
- **Variant-of:** `management-admins-duplicate-7` (same template, different source admin).
- **Broken/empty:** None — HTTP 200.
- **UX improvement for the rebuild:** Show the inherited permissions list explicitly before submit. Require an explicit warning if the source admin is a Manager ("You are duplicating Manager-level permissions"). Breadcrumb shows "Create" — should show "Duplicate".

---

### `management-admins-duplicate-7` — Duplicate Admin with Permissions (ID 7)

- **Purpose:** Duplicate admin ID 7 ("mohamed") into a new account with same permissions.
- **Key sections / flows:** Identical to duplicate-6 with `source_id=7` and banner "Duplicating permissions from: mohamed".
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit (same risk as duplicate-6).
- **Important modals/forms:** Same form.
- **Variant-of:** `management-admins-duplicate-6` (ID variant).
- **Broken/empty:** None — HTTP 200.
- **UX improvement for the rebuild:** Same as duplicate-6.

---

### `management-all-teachers-timetable` — All Teachers Weekly Timetable

- **Purpose:** Visual weekly calendar showing scheduled sessions across all teachers, with teacher filter sidebar.
- **Key sections / flows:** Left panel — Teacher list (All Teacher, individual teachers). Main panel — 7-day week grid (Sat–Fri) with 24-hour time slots. Each session block shows teacher name, time, and duration. Clicking a session opens an inline popup: Show Details (nav), Edit course (mutating), Show Student (nav), Close (X). KPIs shown: sessions per week (3), different students (1), course statuses (Active/Active & unpaid/Inactive).
- **Key SAFE actions:** Filter by teacher, navigate to session details, navigate to student profile.
- **Key MUTATING/dangerous actions:** "Edit course" link from the session popup (navigates to course edit page).
- **Important modals/forms:** Session detail popup — shows teacher, time, duration, links to Show Details / Edit course / Show Student.
- **Variant-of:** Unique template (weekly timetable calendar).
- **Broken/empty:** None — sessions loaded (3 sessions for "محمد احمد" visible). HTTP 200.
- **UX improvement for the rebuild:** Add week navigation arrows (prev/next week). Support month/day/week view toggle. On mobile, switch to agenda-list mode. Color-code sessions by course status (Active = green, Inactive = grey, unpaid = amber). Add a teacher search/filter input in the left panel.

---

### `management-class-feedback-feedback-teacher-id-1-date-range-2026-06-01-to-2026-06` — Class Feedback (Teacher Filtered)

- **Purpose:** View per-session feedback scores filtered by teacher and/or student and/or staff member within a date range.
- **Key sections / flows:** Filter bar — Teachers (multi-select with remove tags), Student, Staff Name, Date Range, Filter/Reset buttons. Results show 6 session cards for "محمد احمد": each card shows Duration (#30 or #60), date/time, and Total score (all 0% in this dataset).
- **Key SAFE actions:** Apply teacher/student/staff/date filters, reset filters.
- **Key MUTATING/dangerous actions:** None explicit (× button on teacher tag clears the filter but does not delete data).
- **Important modals/forms:** Filter form (GET) — teacher_id, student_id, user_id, date_range.
- **Variant-of:** Unique template (class feedback filtered view).
- **Broken/empty:** Feedback scores are all 0% — could indicate no ratings have been submitted, not a system error. HTTP 200.
- **UX improvement for the rebuild:** Add visual score indicators (progress bars or star ratings) even when 0% so the schema is clear. Add an "Export" button. Provide an empty state if no sessions exist for the filter. Show aggregate/average score at the top of the filtered result.

---

### `management-new-requests-filter-teacher-date-range-2026-06-01-to-2026-06-30` — New Requests (Teacher Filter + Date Range)

- **Purpose:** Filtered view of new parent trial requests assigned to the "TEACHER" filter category, with date range, showing request-level stats and per-request management.
- **Key sections / flows:** Stats card "New Requests Statistics" with date-range filter and Reset. Main table (columns: #, Date, Parent name, E-mail, Phone, Status, Actions) — 0 rows for this filter. "Create" button to add a new request. Detail modal expands full parent + student + course information (all fields shown as "--" in capture). Notes List modal (shows notes history). Add Notes modal (textarea). Change Status modal (select: Contacted/Qualified/Trial Taken/no response/Duplicated/Trial Missed/scheduled Teacher).
- **Key SAFE actions:** Apply date range filter, reset, view request details, view notes.
- **Key MUTATING/dangerous actions:** Create new request, Add Notes (save), Change Status (update status), Cancel (closes modal but named "Cancel" which triggered mutating flag).
- **Important modals/forms:** (1) Request Detail modal — read-only with full parent/trial metadata; (2) Add Notes modal — textarea `note` (required), Save; (3) Change Status modal — `status` select (required), "update status" submit.
- **Variant-of:** Unique template (new requests teacher-filtered list). Shares the request table template with other new-requests views.
- **Broken/empty:** Table has 0 rows for this filter/date combination — not a system error, valid empty state.
- **UX improvement for the rebuild:** Provide a rich empty-state for the table (e.g., "No requests matching this filter"). The Change Status dropdown should show current status as selected. Add bulk-status-change capability. Request detail modal should pre-populate all shown fields from the API instead of "--".

---

### `management-new-requests-scheduled-trials-completed-date-2026-06-01-to-2026-06-30` — Completed Trials Dashboard (Date Range Only)

- **Purpose:** KPI summary and recent-trials table for completed trial sessions in a date range.
- **Key sections / flows:** KPI cards: total trials completed (0), Trials This Week (0), Trials This Month (0), Top Performing Teacher. "Recent Trials" table (columns: Teacher, Date, Duration, Status, Actions — 0 rows). "Top Teachers This Week" ranking table (0 rows). Per-row actions: Watch Recording (nav), Download Report (mutating POST), Add/Edit Family Feedback (mutating modal), Edit Feedback (mutating). Teacher Feedback panel with "Edit Feedback" button.
- **Key SAFE actions:** Apply date filter, Watch Recording, View All, navigate.
- **Key MUTATING/dangerous actions:** Download Report (POST), Add/Edit Family Feedback (rating + textarea + source select, Save), Edit Teacher Feedback (textarea, Save).
- **Important modals/forms:** (1) Teacher Report modal — read-only: Class Remark, Note, Class Summary, Homework, Files; (2) Family Feedback form — class_id, rating, content (required textarea), source (required select), Save; (3) Teacher Feedback form — content textarea.
- **Variant-of:** `management-new-requests-scheduled-trials-completed-status-8-date-2026-06-01-to-2` (same template, one adds `status=8` param).
- **Broken/empty:** All KPI values are 0, tables empty — valid empty state for the filter period. HTTP 200.
- **UX improvement for the rebuild:** Show a "no trials" illustration in the Recent Trials table. Make KPI cards link to the filtered list below. Top Teachers leaderboard should handle the empty case gracefully. Font stack switches to Poppins on this page vs. Inter elsewhere — normalize to a single design-system font.

---

### `management-new-requests-scheduled-trials-completed-status-8-date-2026-06-01-to-2` — Completed Trials Dashboard (Status=8 Filter)

- **Purpose:** Identical to the date-range-only completed trials view, but with an additional `status=8` query param applied.
- **Key sections / flows:** Structurally identical to the previous page — same KPI cards (all 0), same two empty tables, same feedback modals. Filter form action navigates to the date-only URL (strips status=8 on Filter submit, revealing these are two separate URL states).
- **Key SAFE actions:** Filter by date, View All, Watch Recording.
- **Key MUTATING/dangerous actions:** Same as date-range-only variant.
- **Important modals/forms:** Same two feedback forms.
- **Variant-of:** `management-new-requests-scheduled-trials-completed-date-2026-06-01-to-2026-06-30` (status query-param variant).
- **Broken/empty:** All 0 — same empty state as date-range variant.
- **UX improvement for the rebuild:** Consolidate into a single route with a status filter control in the filter bar, rather than separate URLs. Show current active filters as tags.

---

### `management-public-holiday` — Public Holiday Submission

- **Purpose:** Schedule a public holiday (a date+time range) that blocks classes across all or selected teacher categories.
- **Key sections / flows:** Form card: From date (YYYY-MM-DD), From time (HH:MM), To date, To time; Category multi-select (with searchable textarea and Select All checkbox) to choose which teacher categories to affect. "Submit Public holiday" button POSTs to `/public-holiday-submit`. Lower section: "List of Teachers" table showing categories (#, Select All, Teacher Name) — currently shows "Select categories to send request" placeholder row.
- **Key SAFE actions:** View the category list, browse sidebar.
- **Key MUTATING/dangerous actions:** Submit Public holiday (blocks all sessions for selected teachers in the date/time range — irreversible if classes exist).
- **Important modals/forms:** Main form — from_date (required), from_time, to_date (required), to_time, category_selected[] (multi-select), Search textarea (category filter), Select All checkbox.
- **Variant-of:** Unique template.
- **Broken/empty:** Teacher table shows only a placeholder row. HTTP 200.
- **UX improvement for the rebuild:** Add a confirmation step that shows exactly how many sessions will be affected before submitting (e.g., "This will block 12 sessions for 3 teachers"). Preview the affected sessions in a modal. Add an undo/cancel mechanism for recently submitted public holidays. Date pickers should enforce from < to constraint.

---

### `management-settings-integrations-whatsapp-teachers-insights` — WhatsApp Integration: Teacher Connection Status

- **Purpose:** Diagnostic page showing which teachers are not properly connected to a WhatsApp group (null group teachers).
- **Key sections / flows:** Table "Names of Null groups" — columns: #, Family name, Phone number, Group Name, Status. Subtitle "Check out which teachers are not connected to whatsapp". One data row visible: teacher المعلم محمد صادق with phone 201278910727, Group Name = WhatsApp link URL, Status = Active. No actions or filters.
- **Key SAFE actions:** View the table, navigate to the WhatsApp link.
- **Key MUTATING/dangerous actions:** None.
- **Important modals/forms:** None meaningful.
- **Variant-of:** Unique template (WhatsApp integration diagnostic).
- **Broken/empty:** Table heading says "Null groups" but the one row shown has a valid WhatsApp group URL — the "null" may refer to a different data condition (possibly teachers without a private/direct WhatsApp contact, not the group URL). Needs backend confirmation.
- **UX improvement for the rebuild:** Clarify the "null group" semantics with a tooltip or explainer. Add a direct action button to update/assign a WhatsApp group to a teacher inline. Add status badge color coding (Active = green, others = amber/red).

---

### `management-teacher-categories` — Teacher Categories Index

- **Purpose:** Manage teacher supervisory categories (labels used to group teachers under specific supervisors/admins).
- **Key sections / flows:** Table — columns: #, Name, Description, Status, Settings (Assign Teachers / Edit / Delete). One row: "محمد السيد", Status Active. "Add Category" link to create form.
- **Key SAFE actions:** View category list, navigate.
- **Key MUTATING/dangerous actions:** Delete (hidden form POST with `_method` override — no confirm dialog captured); Edit (navigates to edit form); Assign Teachers.
- **Important modals/forms:** No meaningful inline modals for the captured state.
- **Variant-of:** Unique template (teacher categories index).
- **Broken/empty:** None — 1 row loaded. HTTP 200.
- **UX improvement for the rebuild:** Add a deletion confirmation dialog showing the category name and count of teachers assigned. Inline edit (edit description/status directly in the row) would reduce navigation friction. Add a count badge showing how many teachers are in each category.

---

## Module synthesis (this batch)

**What this module covers and its core entities:**
This batch spans five distinct functional areas: (1) Admin/Staff CRUD (list, create, edit, duplicate, category assignment, activity log), (2) All-teachers weekly timetable calendar, (3) Class feedback scoring by teacher/student/date, (4) New requests management with completed-trial tracking and feedback capture, (5) Operational tools: Public Holiday bulk scheduler and WhatsApp integration diagnostics. A sixth standalone is Teacher Categories (used to group teachers under admin supervisors).

Core entities: Admin (staff member with role + 2FA + salary + currency), TeacherCategory (supervisor group), Trial/Request (family trial session request), Class/Session (scheduled teaching session), Feedback (family-facing and teacher-facing), PublicHoliday (date range affecting sessions), WhatsAppGroup (teacher integration status).

**Distinct page templates vs variant count:**
- Unique templates (10): Admins Index, Admin Create, Admin Activity Log, Admin Category Assignment, All Teachers Timetable, Class Feedback (filtered), New Requests Teacher-Filtered, Completed Trials Dashboard, Public Holiday, WhatsApp Insights, Teacher Categories Index.
- Variant pages (8): Admin Edit ×2 (IDs 6+7), Admin Activity Log ×2 (IDs 6+7), Admin Categories ×2 (IDs 6+7), Admin Duplicate ×2 (IDs 6+7), Completed Trials (date-only vs date+status=8).

**Cross-cutting interactions and dangerous ones:**
- Row-level delete on Admins and Teacher Categories: raw hidden-form POST with no confirmed dialog — DANGEROUS (must add confirm).
- Admin Duplicate: creates full Manager-level account from one click — DANGEROUS (must show permissions summary + confirm).
- Change Status on requests: POST modal with a select — mutating, should show current state.
- Public Holiday Submit: can block all sessions for selected categories — DANGEROUS (must preview affected sessions).
- Family Feedback and Teacher Feedback saves: mutating modals, relatively lower risk.
- Activity Log filters: safe GET filters, no risk.
- Timetable session popup "Edit course" link: navigates to course edit (not dangerous on this page, but leads to mutation).
- Download Report on completed trials: POST, not a navigation — unexpected risk pattern.

**Improvements for the new platform:**
1. Deletion confirmation: all deletes (admin, teacher category) need a named confirmation dialog with entity details.
2. Duplicate admin flow: show permission summary modal before allowing submit; highlight if source role is Manager.
3. Public Holiday: add a "preview affected sessions" step before submission; add date picker constraint (from < to).
4. Completed Trials Dashboard: normalize font (Poppins vs Inter inconsistency found here only — the section uses a different stylesheet from the rest of the admin). Consolidate date-only and status-filtered URLs into one page with a filter bar.
5. Activity Log: add date range filter, color-coded diff display (before/after), export to CSV.
6. Admin form (create/edit): group credential fields vs. access fields; password strength meter; async email uniqueness check; secondary confirm for role/2FA changes.
7. Class Feedback: add aggregate score summary; export; clear empty state.
8. Teacher Category list: inline count badge; inline edit; RTL support for Arabic names.
9. New Requests table: bulk status change; pre-populated detail modal (all fields should not be "--").
10. All Teachers Timetable: prev/next week navigation; agenda-list mobile fallback; color-code sessions by status.
11. WhatsApp Insights: clarify "null group" semantics with backend; add inline assign/update action per row.
12. Across all: the logo image 404s on every page (`/storage/uploads/logo.png`) — needs resolution before launch.
13. RTL: All pages are LTR-only despite Arabic content in category names, teacher names, activity logs. Full RTL flip required for Arabic locale users.

**Needs owner/backend confirmation:**
- WhatsApp "Null groups" definition: does the table show teachers missing a group link OR teachers whose group link resolves to null? One row has a valid link but is still shown here.
- Status code 8 for completed trials: confirm the status→label mapping (8 = "completed"?).
- Admin "Enable 2FA" toggle: is this enforced server-side on next login or takes effect immediately?
- Public Holiday: confirm whether submitting a holiday retroactively cancels already-booked sessions or only blocks new bookings.
- Download Report POST endpoint for trial sessions: confirm what it generates and whether it has side effects.

---
# Batch 22 — Admin · Teachers (Categories, Feedback, List, Profile, Compensations)

---

### `management-teacher-categories-create` — Create Teacher Category

- **Purpose:** Form to create a new teacher category with a name, status, and description.
- **Key sections / flows:** Single card "Main information" with fields: Name (text), Status (Active/Deactive select), Description (textarea). Submit posts to `/management/teacher-categories`.
- **Key SAFE actions:** Navigate away via breadcrumb or sidebar.
- **Key MUTATING/dangerous actions:** Submit (creates new category record).
- **Important modals/forms:** Main form — fields: name, status, description. No meaningful secondary modals beyond global chrome.
- **Variant-of:** unique template (teacher-category create).
- **Broken/empty:** None. HTTP 200, page loaded cleanly.
- **UX improvement for the rebuild:** Add inline validation and character counter on description; make status default visually clear (Active pre-selected); provide a Cancel button back to the category list.

---

### `management-teacher-categories-1-edit` — Edit Teacher Category

- **Purpose:** Edit form for an existing teacher category (name, status, description); submits via POST with `_method` spoofing.
- **Key sections / flows:** Single card "Main information" pre-populated with name, status (Active/Deactive), description. POST to `/management/teacher-categories/1`.
- **Key SAFE actions:** Breadcrumb navigation.
- **Key MUTATING/dangerous actions:** Submit (overwrites existing category).
- **Important modals/forms:** Edit form — fields: name, status (select), description. No meaningful secondary modals.
- **Variant-of:** unique template (teacher-category edit — shares card layout with create but POSTs to item URL with `_method=PUT`).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Show a "Last updated by / at" timestamp on the form to give admins context before overwriting; confirm on unsaved-changes navigation away.

---

### `management-teacher-categories-1-create-members` — Add Teacher Category Members

- **Purpose:** Assign teachers (members) to a specific teacher category via a multi-select picker.
- **Key sections / flows:** Single card "Main information" with a `select-multiple` for `member_id[]` and a search textarea. POSTs to `/management/teacher-categories/1/store-members`. Shows the category's existing member (المعلم محمد صادق صادق).
- **Key SAFE actions:** Breadcrumb, sidebar navigation.
- **Key MUTATING/dangerous actions:** Submit (adds members to category; cannot be trivially undone in this UI).
- **Important modals/forms:** Main assignment form — fields: member_id[] (multi-select with in-widget search). 1 pagination control (javascript:void(0) — possibly JS-driven).
- **Variant-of:** unique template (category membership assignment).
- **Broken/empty:** None. HTTP 200. Select2 library used for multi-select.
- **UX improvement for the rebuild:** Replace raw multi-select with a dual-list or token/chip picker showing current members vs available teachers; add a remove-member flow on the same screen to avoid requiring a separate edit.

---

### `management-teacher-feedback` — Monthly Performance (Teacher Feedback)

- **Purpose:** Monthly performance reporting per teacher — shows a filterable table of teachers with their feedback percentages, plus category management for feedback dimensions.
- **Key sections / flows:**
  - "Teachers" card with teacher checkbox multi-select + month/year range filter → Filter / Reset.
  - "List of Teachers" table: columns `#, Teacher Name, Percentage, Note, Action`; per-row "Add" button opens a feedback-entry modal.
  - "Deactive Categories" button opens a modal listing inactive feedback categories (showed "No data found").
  - "Add Category" button opens a modal form to create/edit a feedback category (name, description, status).
  - Second category-level table: `Category | Percentage`.
- **Key SAFE actions:** Filter (GET), Reset (navigation), view table.
- **Key MUTATING/dangerous actions:** Add (row-level feedback note entry, POST to `/management/teacher-feedback`); Save changes (add/edit feedback category, POST to `/management/teacher-feedback/category`); Deactive Categories (displays inactive ones — viewing only but the button name implies a future state-change action, confirm with backend).
- **Important modals/forms:**
  - "Add Feedback" (category management) — fields: category_id (hidden), name, description, status (Active/Deactive). Saves to `/management/teacher-feedback/category`.
  - "Add Feedback" (per-teacher note) — fields: date (hidden), teacher_id (hidden), feedback_note (textarea). Saves to `/management/teacher-feedback`.
  - "Deactive Categories" — read-only modal listing inactive categories, "No data found" currently.
- **Variant-of:** unique template (teacher feedback / monthly performance dashboard).
- **Broken/empty:** "Deactive Categories" modal shows "No data found" — expected when all categories are active, not an error.
- **UX improvement for the rebuild:** Surface the month/year filter more prominently as a date picker with a "current month" default; show percentage as a visual progress bar in the table; separate category management into its own settings sub-page rather than mixing CRUD modals into the reporting view.

---

### `management-teachers` — Teachers List

- **Purpose:** Main teacher roster with status summary KPI cards, a filterable data table, and per-row actions.
- **Key sections / flows:**
  - 5 KPI summary cards: Active (1, 100%), Under Training (0), Incomplete (0), Inactive (0), Deleted (0).
  - Collapsible "Filters" accordion: material (subject) and category selects → Apply (GET).
  - "Active Teachers" table: `#, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings`. Settings column has: Show Details / Edit / Delete.
  - "Add Teacher" link button at top of table.
- **Key SAFE actions:** Filter/Apply (GET), Show Details, Schedule (navigation), KPI card clicks (navigate to scoped list).
- **Key MUTATING/dangerous actions:** Delete (row-level, no visible confirmation dialog captured in this page — requires explicit confirm in rebuild); Edit (navigates to edit form); Add Teacher (navigates to create form).
- **Important modals/forms:** Filters panel (material_id, category_id selects). No destructive modal confirmed on this page for Delete — hidden POST forms for delete exist in DOM.
- **Variant-of:** unique template (teacher list/index).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Delete action must require a named confirmation dialog (show teacher name); add column sorting on Teacher Name, Country, Created at; KPI cards should be clickable scope tabs (they link to `/scope/Active` etc.) and should be styled distinctly per status with color coding.

---

### `management-teachers-scope-active` — Teachers List (Active Scope)

- **Purpose:** Identical to `management-teachers` but filtered to Active scope via URL path `/teachers/scope/Active`.
- **Key sections / flows:** Same 5 KPI cards, same filters accordion (material, category), same 10-column table, same per-row actions.
- **Key SAFE actions:** Filter, Apply, Schedule link, Show Details.
- **Key MUTATING/dangerous actions:** Delete (per row), Edit (per row), Add Teacher.
- **Important modals/forms:** Same filter form.
- **Variant-of:** variant of `management-teachers` (scope=Active path variant).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Collapse scope/status into a tab strip or segmented control on the list page rather than separate routes; preserve filter state when switching scope tabs.

---

### `management-teachers-scope-active-sort-by-country-sort-direction-asc-page-1` — Teachers List (Active, Sorted by Country, Page 1)

- **Purpose:** Active-scope teacher list with `sort_by=country&sort_direction=asc&page=1` query params applied; same template as `management-teachers-scope-active`.
- **Key sections / flows:** Same KPI cards, same table (sorted by country ascending), filter form now carries hidden inputs `sort_by`, `sort_direction`, `page` to preserve sort state across filter Apply.
- **Key SAFE actions:** Pagination, column header sort links, Apply filter.
- **Key MUTATING/dangerous actions:** Delete, Edit per row.
- **Important modals/forms:** Same.
- **Variant-of:** variant of `management-teachers-scope-active` (sort+pagination query param variant).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Make column headers sortable with visible ASC/DESC indicators; preserve sort/scope/filter as a single URL state object; never lose filters on pagination navigation.

---

### `management-teachers-1` — Teacher Detail Profile (Tabbed)

- **Purpose:** Full teacher profile page with 7 navigable tabs (Home, Monthly Classes, Schedule, Compensations, Salary, Settings, Activity) and a header action bar.
- **Key sections / flows:**
  - Header: teacher avatar (initials), name, status badge, quick-action buttons: Edit, Send Reset Password, On Vacation (toggle), Login as Teacher, Deactivate, Delete.
  - Contact info bar: phone button, course(s), WhatsApp group link, total students count.
  - **Tab: Home** — Three student tables: "List of Students" (active), "Left Students", "Acquired Students" (both empty). Teacher profile data block: username, email, address, birth date, levels, study age, gender, timezone, hour rate, CV/certificates status, notes.
  - **Tab: Monthly Classes** — Filterable session log: type (All/Trial/Group), date range. Table: `Date & Time, Student, Course & Duration, Paid, Status`. Statuses: Trial Waiting, Admin Cancel, Pending.
  - **Tab: Schedule** — Weekly calendar grid (Sat–Fri, 24h). Session blocks clickable showing student name/time. On-click popover: Show Details, Edit course, Show Student. Availability form (From day/To day/From time/To time) with Update/Delete/Add controls.
  - **Tab: Compensations** — Two sub-sections: "Compensations" table (`Month, Year, Amount, Type, Action` — types: Fine/Bonus) with Edit/Delete per row; "Class Deductions" table (`Date, Amount, Type, Action`). "Add" button for new compensation.
  - **Tab: Salary** — Monthly salary rows table: `Date, Fixed, Classes, Hours, Fine, Gift, Total, Status, Actions`. Currently "No data found".
  - **Tab: Settings** — Sub-panels: Update Location (country, city, timezone, timezone_diff), Preferences (language, pw_reset_method, whatsapp_private), Capabilities (can_chat, can_see_library, can_edit_schedule, can_edit_class), Profile Notifications (WhatsApp/Email toggles for course updates, class reminders, class updates, salary).
  - **Tab: Activity** — Chronological audit log of field-level changes made by admin (e.g., first_name, last_name, phone, language changes with before → after values).
- **Key SAFE actions:** Tab navigation (hash-based), Filter (GET — monthly classes), Schedule view, Show Details, Reset (filter), Show Student.
- **Key MUTATING/dangerous actions:** Edit (navigates to edit form); Send Reset Password (triggers password reset email/SMS — dangerous if accidental); Deactivate (POST to `/teachers/1/deactivate`); Delete (POST to `/teachers/1` with `_method=DELETE`); Login as Teacher (impersonation — high impact); Update (location/preferences/capabilities forms); Save changes (notifications); Delete in compensations/class deductions; Update/Delete availability in schedule; Add (compensation create).
- **Important modals/forms:**
  - Schedule popover — Show Details / Edit course / Show Student.
  - Availability modal — From/To day selects, From/To time inputs, Update, Delete, Add, Not Available/Available toggle.
  - "Details" modal — read-only compensation/session details viewer.
- **Variant-of:** unique template (teacher profile — the richest page in the module).
- **Broken/empty:** Left Students and Acquired Students tables show "No data found" — expected for a teacher with no transferred students. Salary tab shows "No data found" — expected if no salary records exist.
- **UX improvement for the rebuild:** Deactivate / Delete / Login-as actions must have named confirmation dialogs with the teacher name displayed; "Send Reset Password" should require secondary confirmation with channel choice; split the Settings tab into a dedicated settings page to reduce cognitive load; the Activity log should be paginated and filterable by field/date.

---

### `management-teachers-1-edit` — Edit Teacher

- **Purpose:** Comprehensive edit form for a teacher's full profile split into 4 card sections: Main information, Salary information, Zoom information, Additional information (with Payout details sub-panel).
- **Key sections / flows:**
  - **Main information:** send_info checkbox, first_name/last_name (EN + AR), email, password (update), username, national_id, phone, alt_phone, member_id[] (category multi-select with Select2), birth_date, gender, status, group_name (WhatsApp link).
  - **Salary information:** currency, fixed_salary, salary_type (Fixed/Variable radio), hour_rate, fine_per_hour, is_free_meeting checkbox.
  - **Zoom information:** zoom_email, zoom_password, zoom_meeting_link, zoom_passcode, zoom_id, zoom_account_id, zoom_client_id, zoom_client_secret.
  - **Additional information / Payout details:** cv_file upload, cv_certificates upload, course_id[] multi-select, level checkboxes (Preliminary/Middle/Advanced), age_student checkboxes, notes textarea, payout_method select, Paymob fields (issuer, wallet_phone, bank_card_number, bank_code), paymob_full_name, payoneer_payee_id, payout_email, payout_notes.
  - Interaction: "× arabic" removes a course tag (dynamic tag removal).
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit (large multi-field POST to `/teachers/1` with `_method=PUT`); password field change; payout method change; category assignment change.
- **Important modals/forms:** Main edit form (62 fields across 4 sections). No meaningful secondary modals.
- **Variant-of:** unique template (teacher edit — same sections as teacher create but with pre-filled data and no location section shown in the captured version).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Break this massive form into a stepper or tabbed section form; use progressive disclosure (show Zoom fields only if `is_free_meeting` is unchecked; show Paymob sub-fields only on Paymob payout method selection); validate payout fields inline; surface a "Zoom connection test" button.

---

### `management-teachers-create` — Create Teacher

- **Purpose:** New teacher creation form — structurally identical to the edit form but includes a Location information section (country, city, timezone) that is absent in the edit form.
- **Key sections / flows:** 5 sections: Main information, Location information (country, city, timezone, timezone_diff — **required**), Salary information, Zoom information, Additional information / Payout details. 63 fields total.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** Submit (creates new teacher account with login credentials, email/password, payout data).
- **Important modals/forms:** Main create form. Timezone select auto-populated when country is selected (Africa/Cairo detected).
- **Variant-of:** unique template (teacher create — has Location section, edit does not; otherwise structurally matching).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Add a "Send credentials to teacher" checkbox prominently (the `send_info` field exists but may be easy to miss); auto-derive timezone from country/city selection; validate email uniqueness inline before submit; consider a wizard (Step 1: Identity, Step 2: Location+Salary, Step 3: Capabilities+Payout) to reduce form overwhelm.

---

### `management-teachers-details` — Teachers Attendance Details (Performance View)

- **Purpose:** Date-range filterable attendance summary table for all teachers: cancel / absent / attend session counts and percentages; row-level actions include per-teacher admin operations.
- **Key sections / flows:**
  - Filter bar: date_range (flatpickr date input), sort_by_duration checkbox → GET to `/management/teachers_details`.
  - Table: `#, Teacher Name, Cancel, Absent, Attend` with counts and total hours.
  - Per-row expandable section (revealed via toggle button): shows Send Teacher Login, Show Details, Edit, Delete per teacher.
- **Key SAFE actions:** Filter (GET), Show Details (navigation), Sort toggle.
- **Key MUTATING/dangerous actions:** Delete (per teacher — POST with `_method=DELETE`; button reads "Delete المعلم محمد صادق" — named but still needs a confirmation dialog).
- **Important modals/forms:** No dedicated modals beyond global chrome.
- **Variant-of:** unique template (teacher attendance/performance summary — different from the main teacher list).
- **Broken/empty:** None. HTTP 200. Attend shows "0 (00:00) (0%)" — no sessions in the selected range, not an error.
- **UX improvement for the rebuild:** Pre-select "current month" date range by default; show visual bar/donut for Attend% per row; make the date range filter sticky so it persists on page reload; Delete must require an explicit confirm modal with teacher name.

---

### `management-teachers-1-compensations-create` — Add Compensation

- **Purpose:** Form to create a new compensation record (Fine or Bonus) for a specific teacher.
- **Key sections / flows:** Single card "Add Compensation" — fields: type (Fine/Bonus select), amount (number, required), month (select), year (select, 2025–2027), description (textarea, required, min 5 chars). POSTs to `/teachers/1/compensations`.
- **Key SAFE actions:** Navigate back.
- **Key MUTATING/dangerous actions:** Add (creates compensation record that affects salary calculations).
- **Important modals/forms:** Main compensation form. Description has client-side minimum character validation ("5 more character(s) required" hint shown).
- **Variant-of:** unique template (compensation create).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Add a currency display next to the amount field based on teacher's configured currency; show a running total of existing compensations for the selected month/year to give context before adding.

---

### `management-teachers-1-compensations-1` — Compensation Detail (Fine, ID=1)

- **Purpose:** Read-only detail view for a single compensation record (type: Fine, amount: 1,000.00, month/year: June 2026) plus a creation timeline.
- **Key sections / flows:** Two cards: "Compensation" (Type, Amount, Month/Year, Created at, Description) and "Timeline" (audit trail: "17th June 2026 08:26 PM mohamed created").
- **Key SAFE actions:** View details.
- **Key MUTATING/dangerous actions:** Edit (navigates to edit form).
- **Important modals/forms:** None meaningful.
- **Variant-of:** variant of compensation-detail template (compensation ID=1, type Fine).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Add a "Back to Teacher Compensations" breadcrumb; show the teacher name in the page header for context; add Delete action on this detail page to avoid having to navigate back to the list.

---

### `management-teachers-1-compensations-1-edit` — Edit Compensation (ID=1)

- **Purpose:** Edit form for compensation record #1 (type, amount, month, year, description); `_method=PUT`.
- **Key sections / flows:** Card "Edit Compensation" — fields: type (Fine/Bonus), amount (number, required), month (select), year (select 2025–2027), description (textarea, required). "1012 characters left" counter shown.
- **Key SAFE actions:** Navigate back.
- **Key MUTATING/dangerous actions:** Update (overwrites existing compensation record).
- **Important modals/forms:** Edit form.
- **Variant-of:** variant of compensation-edit template (same fields as compensations-2-edit and 3-edit; only the record ID differs).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Show original creation info (creator, date) as read-only context; warn if changing Type (Fine ↔ Bonus) would affect already-computed salary reports.

---

### `management-teachers-1-compensations-2` — Compensation Detail (Bonus, ID=2)

- **Purpose:** Read-only detail for compensation #2 (type: Bonus, amount: 2,000.00, June 2026). Same layout as compensations-1 detail.
- **Key sections / flows:** Two cards: Compensation detail + Timeline.
- **Key SAFE actions:** View.
- **Key MUTATING/dangerous actions:** Edit link.
- **Important modals/forms:** None.
- **Variant-of:** variant of `management-teachers-1-compensations-1` (different record ID/type).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Same as compensations-1 detail.

---

### `management-teachers-1-compensations-2-edit` — Edit Compensation (ID=2)

- **Purpose:** Edit form for compensation #2 (Bonus type). Structurally identical to compensations-1-edit.
- **Key sections / flows:** Same card/fields as edit-1. "1017 characters left" counter. POSTs to `/teachers/1/compensations/2`.
- **Key SAFE actions:** Navigate back.
- **Key MUTATING/dangerous actions:** Update.
- **Important modals/forms:** Edit form.
- **Variant-of:** variant of `management-teachers-1-compensations-1-edit` (different record ID).
- **Broken/empty:** None. HTTP 200.
- **UX improvement for the rebuild:** Same as compensations-1-edit.

---

### `management-teachers-1-compensations-3` — Compensation Detail (Fine, ID=3, Class Deduction)

- **Purpose:** Read-only detail for compensation #3 (type: Fine, amount: 3.00, June 2026, a class deduction created by "Deleted" user). Timeline shows creator as "Deleted" (actor account was deleted).
- **Key sections / flows:** Two cards: Compensation + Timeline. Timeline actor shown as "Deleted" rather than a user name — indicates the creating admin account was subsequently removed.
- **Key SAFE actions:** View.
- **Key MUTATING/dangerous actions:** Edit link.
- **Important modals/forms:** None.
- **Variant-of:** variant of `management-teachers-1-compensations-1` (different record, deleted-actor edge case in timeline).
- **Broken/empty:** None functionally, but timeline shows "Deleted" as actor — this is a data integrity edge case to handle in the rebuild.
- **UX improvement for the rebuild:** Show a "User (deleted)" placeholder with original user ID if available; grey out the actor name to distinguish from active users; flag this as an audit concern.

---

### `management-teachers-1-compensations-3-edit` — Edit Compensation (ID=3)

- **Purpose:** Edit form for compensation #3 (Fine class deduction). Structurally identical to edits for 1 and 2. Note: shows "4 more character(s) required" hint — description field has fewer than minimum characters currently.
- **Key sections / flows:** Same card/fields. POSTs to `/teachers/1/compensations/3`.
- **Key SAFE actions:** Navigate back.
- **Key MUTATING/dangerous actions:** Update.
- **Important modals/forms:** Edit form.
- **Variant-of:** variant of `management-teachers-1-compensations-1-edit`.
- **Broken/empty:** None. HTTP 200. Description is under the minimum length (hint active).
- **UX improvement for the rebuild:** Pre-validate on load and surface inline warnings before the user attempts to submit; show the minimum length requirement as a label not just a countdown counter.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Teachers module manages the full lifecycle of teacher staff at the academy. Core entities: Teacher (profile, credentials, salary config, Zoom config, location, payout details), Teacher Category (groupings with member assignments), Compensation (Fine/Bonus records per teacher per month), Class Deductions (session-based fines), and Teacher Feedback Categories (monthly performance rating dimensions). The module also surfaces teacher attendance/session analytics and provides an impersonation ("Login as") flow for admin support.

**Distinct page templates vs variant count:**
- Unique templates (11): teacher-category create, teacher-category edit, teacher-category add-members, teacher feedback/monthly performance, teacher list index, teacher profile (tabbed detail), teacher create, teacher edit, teacher attendance details, compensation detail, compensation edit/create.
- Variants (7): scope/Active (1), scope/Active+sort+page (1), compensations-detail ×3 instances (treated as 1 template, 2 variants), compensations-edit ×3 instances (1 template, 2 variants).

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Accordion filter panel (material, category) on list pages — safe (GET).
- Schedule availability modal (Update/Delete/Add) — **mutating**.
- Compensation add/edit forms (standalone pages) — **mutating**.
- Teacher feedback note entry modal — **mutating** (POST).
- Feedback category add/edit modal — **mutating** (POST).
- "Deactive Categories" view modal — currently safe (read-only), but name implies future state-change risk.
- Deactivate / Delete teacher (header action bar on profile) — **dangerous** (irreversible or hard to undo); no confirmation dialog confirmed captured.
- "Send Reset Password" on profile — **dangerous** (triggers credential reset to live user); needs explicit confirm.
- "Login as Teacher" (impersonation) — **high-impact**; must require confirmation and audit logging.
- Delete compensation / deduction row — **mutating** (affects salary calculations).

**Improvements for the new platform:**

1. **Teacher list:** Replace path-based scope routing (`/scope/Active`) with a tab strip or segmented control on a single list page; merge sort, filter, scope, and pagination into one unified query state object.
2. **Dangerous actions:** All delete and deactivate actions (teacher, compensation) must show a named confirmation dialog (display the teacher name or amount); "Send Reset Password" and "Login as Teacher" must each require a secondary confirmation step.
3. **Teacher create/edit form:** Break the 60+ field monolith into a stepped wizard (Identity → Location+Salary → Zoom → Capabilities+Payout) with step validation; use progressive disclosure to hide conditional fields (Zoom section, Paymob sub-fields).
4. **Teacher profile tabs:** Make tabs deep-linkable via URL hash (currently done via `#pills-*` anchors — keep this pattern but ensure SSR/URL preservation); add pagination to Monthly Classes and Activity log tabs.
5. **Compensations:** Add the compensation list inline in the Compensations tab of the teacher profile (currently present) with a slide-in drawer for create/edit rather than full-page navigation; show running monthly totals.
6. **Teacher Feedback page:** Separate feedback category management into a dedicated settings/admin screen; present the monthly performance table as a proper sortable data grid with % visualized as a progress bar or color-coded badge.
7. **RTL:** All pages are LTR (lang: en) but teacher names are Arabic (right-to-left text). Rebuild must handle mixed-direction text in table cells and form fields (use `dir="auto"` on name inputs/cells).
8. **Audit/Activity log:** The teacher profile Activity tab shows field-level before → after diffs; the rebuild should paginate this and allow filtering by field or date range. Handle "Deleted" user actors gracefully (show placeholder, not a raw "Deleted" string).
9. **Logo 404:** `/storage/uploads/logo.png` returns 404 on every page — fix the asset path in the rebuild's config.
10. **Teacher Categories:** The add-members form uses a raw `select-multiple`; replace with a dual-list picker or token picker with search. Allow removing members from the same screen.
11. **Empty states:** Left Students, Acquired Students, and Salary tab all show "No data found" text — replace with illustrated empty state messages with relevant calls-to-action.
12. **Mobile/accessibility:** The tabbed teacher profile page has 7 tabs with dense sub-content; on mobile, collapse to an accordion; ensure ARIA tablist/tabpanel roles are set correctly.

**Anything that needs owner/backend confirmation:**
- "Deactive Categories" button in teacher feedback — is this intended to be a batch-deactivate action or just a viewer? Confirm intended behavior before implementing.
- The "Login as Teacher" (impersonation) flow — confirm whether this is logged server-side and whether there are session isolation requirements.
- Compensation type "Class Deductions" appears to be a separate sub-system from "Compensations" (different table, different date format). Confirm whether these are the same API resource with a type flag or separate endpoints.
- Teacher profile "On Vacation" toggle — confirm it is a simple boolean flip or requires date range input (the form captured shows only a checkbox, but vacation typically needs start/end dates).
- Salary tab showing "No data found" — confirm whether salary records are auto-generated monthly by a scheduled job or manually created.

---
# Batch 23 — admin · Teachers (scope variants: Active / Deleted / Inactive, sort/page params)

---

### `management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1` — Active Teachers (sort: created_at asc)
- Purpose: Lists active teachers sorted by creation date ascending; page 1.
- Key sections / flows: 5 KPI summary cards (Active 1 / Under Training 0 / Incomplete 0 / Inactive 0 / Deleted 0), "Active Teachers" table section with Add Teacher CTA, 10-column sortable table (# / Teacher Name / Status / All students has course / Total Hours / Phone number / Schedule / Country / Created at / Settings), collapsible Filters panel, pagination.
- Key SAFE actions: View table, click Schedule link per row (navigates to teacher timetable), expand/collapse Filters accordion, Apply filter (GET form), paginate.
- Key MUTATING/dangerous actions: Add Teacher (navigates to create form), Show Details (loads teacher modal), Edit teacher (navigates to edit form), Delete teacher (POST form — dangerous, no confirm dialog captured), See All Notifications (POST).
- Important modals/forms: Filter form (GET, fields: material_id select, category_id select, hidden sort_by / sort_direction / page) — safe. Two hidden POST forms per row targeting `/management/teachers/{id}` with `_method` override (likely PATCH/DELETE for Edit and Delete row actions) — dangerous.
- Variant-of: Base template is `management-teachers-scope-active` (Active scope, default sort); this page differs only in `sort_by=created_at&sort_direction=asc&page=1`.
- Broken/empty: No broken state; 1 teacher row visible. Logo image 404 on every page (asset missing).
- UX improvement for the rebuild: Replace the two bare-POST hidden forms (Edit / Delete) in each row with a single row-action kebab menu; wrap Delete in a confirmation dialog with teacher name displayed to prevent accidental deletion.

---

### `management-teachers-scope-active-sort-by-first-name-sort-direction-desc-page-1` — Active Teachers (sort: first_name desc)
- Purpose: Same Active Teachers list, sorted alphabetically descending by first name.
- Key sections / flows: Identical structure to the created_at variant — 5 KPI cards, table with same 10 columns, Filters, pagination. 1 row visible.
- Key SAFE actions: Same as above.
- Key MUTATING/dangerous actions: Same as above.
- Important modals/forms: Same filter form and row POST forms.
- Variant-of: `management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1` (same Active template, different sort param).
- Broken/empty: No broken state.
- UX improvement for the rebuild: Column headers should be clickable sort toggles with visual asc/desc indicators (chevrons); currently sort is driven by separate link clicks that generate new URLs.

---

### `management-teachers-scope-active-sort-by-phone-sort-direction-asc-page-1` — Active Teachers (sort: phone asc)
- Purpose: Active Teachers list sorted by phone number ascending.
- Key sections / flows: Identical structure. 1 row.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Same.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1`.
- Broken/empty: No broken state.
- UX improvement for the rebuild: Phone numbers should be formatted consistently (international prefix displayed) and clickable (tel: link) on mobile.

---

### `management-teachers-scope-active-sort-by-status-sort-direction-asc-page-1` — Active Teachers (sort: status asc)
- Purpose: Active Teachers list sorted by status ascending (all are Active, so no visible reordering).
- Key sections / flows: Identical structure. 1 row.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Same.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1`.
- Broken/empty: No broken state. Sort by status on a single-status scope (Active) is visually a no-op.
- UX improvement for the rebuild: On a scoped list (scope=Active), sorting by status is meaningless — hide or disable status sort on single-scope views.

---

### `management-teachers-scope-active-sort-by-students-count-sort-direction-asc-page` — Active Teachers (sort: students_count asc)
- Purpose: Active Teachers list sorted by student count ascending.
- Key sections / flows: Identical structure. 1 row showing "All students has course: 1".
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Same.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1`.
- Broken/empty: No broken state. Note: slug is truncated (missing "-1" page suffix).
- UX improvement for the rebuild: The "All students has course" column label is grammatically unclear; rename to "Students with Active Course" for clarity.

---

### `management-teachers-scope-active-sort-by-total-hours-sum-sort-direction-asc-page` — Active Teachers (sort: total_hours_sum asc)
- Purpose: Active Teachers list sorted by total teaching hours ascending.
- Key sections / flows: Identical structure. 1 row showing "Total Hours: 0".
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Same.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1`.
- Broken/empty: No broken state. Slug truncated (missing page suffix).
- UX improvement for the rebuild: "Total Hours" should display formatted time (e.g., "0 h") and include a tooltip or drill-down to the teacher's session breakdown.

---

### `management-teachers-scope-deleted` — Deleted Teachers (default, no sort)
- Purpose: Lists soft-deleted teachers; serves as the base Deleted scope page.
- Key sections / flows: Same 5 KPI summary cards at top; "Deleted Teachers" section heading; same 10-column table; Filters accordion; pagination. Table shows "No Teachers Found" empty state.
- Key SAFE actions: View empty state, expand Filters, Apply filter, paginate.
- Key MUTATING/dangerous actions: Add Teacher (navigates to create form — present even on Deleted scope, slightly confusing). No row actions because table is empty.
- Important modals/forms: Filter form only (material_id, category_id selects). No row edit/delete forms (no data).
- Variant-of: Unique template for Deleted scope (differs from Active in that it shows empty state and has no row-level POST forms).
- Broken/empty: Empty state — "No Teachers Found / Start by adding teachers to your system". This is the genuine zero-data state, not a breakage.
- UX improvement for the rebuild: Deleted scope empty state should explain that no teachers have been soft-deleted yet (distinct from "no teachers exist") and optionally include a restore/recover context note.

---

### `management-teachers-scope-deleted-sort-by-country-sort-direction-asc-page-1` — Deleted Teachers (sort: country asc)
- Purpose: Deleted teachers sorted by country; still empty (no deleted teachers).
- Key sections / flows: Identical to base Deleted scope. Empty state.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher only.
- Important modals/forms: Same filter form with sort hidden fields added.
- Variant-of: `management-teachers-scope-deleted` (same template, sort param variant).
- Broken/empty: Empty — "No Teachers Found".
- UX improvement for the rebuild: Sorting params should be preserved in the URL but the sort UI should indicate "sorted by Country" even on empty state so admin knows filter is active.

---

### `management-teachers-scope-deleted-sort-by-created-at-sort-direction-asc-page-1` — Deleted Teachers (sort: created_at asc)
- Purpose: Deleted teachers sorted by creation date; empty.
- Key sections / flows: Identical to Deleted base. Empty.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same filter form.
- Variant-of: `management-teachers-scope-deleted`.
- Broken/empty: Empty — "No Teachers Found".
- UX improvement for the rebuild: Same as country variant — preserve and display active sort indicator on empty state.

---

### `management-teachers-scope-deleted-sort-by-first-name-sort-direction-desc-page-1` — Deleted Teachers (sort: first_name desc)
- Purpose: Deleted teachers sorted by first name descending; empty.
- Key sections / flows: Identical to Deleted base. Empty.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-deleted`.
- Broken/empty: Empty — "No Teachers Found".
- UX improvement for the rebuild: Collapse all Deleted sort variants into single URL pattern with React/Next query params rather than separate routes.

---

### `management-teachers-scope-deleted-sort-by-phone-sort-direction-asc-page-1` — Deleted Teachers (sort: phone asc)
- Purpose: Deleted teachers sorted by phone; empty.
- Key sections / flows: Same Deleted template. Empty.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-deleted`.
- Broken/empty: Empty — "No Teachers Found".
- UX improvement for the rebuild: No specific addition beyond shared Deleted-scope recommendation.

---

### `management-teachers-scope-deleted-sort-by-status-sort-direction-asc-page-1` — Deleted Teachers (sort: status asc)
- Purpose: Deleted teachers sorted by status; empty.
- Key sections / flows: Same Deleted template. Empty.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-deleted`.
- Broken/empty: Empty — "No Teachers Found".
- UX improvement for the rebuild: Status sort on Deleted scope is meaningless (all records would have Deleted status); disable in rebuild.

---

### `management-teachers-scope-deleted-sort-by-students-count-sort-direction-asc-page` — Deleted Teachers (sort: students_count asc)
- Purpose: Deleted teachers sorted by student count; empty. Slug truncated.
- Key sections / flows: Same Deleted template. Empty.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-deleted`.
- Broken/empty: Empty — "No Teachers Found".
- UX improvement for the rebuild: Same as above.

---

### `management-teachers-scope-deleted-sort-by-total-hours-sum-sort-direction-asc-pag` — Deleted Teachers (sort: total_hours_sum asc)
- Purpose: Deleted teachers sorted by total hours sum; empty. Slug truncated.
- Key sections / flows: Same Deleted template. Empty.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same.
- Variant-of: `management-teachers-scope-deleted`.
- Broken/empty: Empty — "No Teachers Found".
- UX improvement for the rebuild: Same as above.

---

### `management-teachers-scope-inactive` — Inactive Teachers (default, no sort)
- Purpose: Lists inactive teachers; base Inactive scope page.
- Key sections / flows: Same 5 KPI cards; "messages.Inactive Teachers" section heading (i18n key leaked into UI — translation missing); same 10-column table; Filters; pagination. Table empty: "No Teachers Found".
- Key SAFE actions: View empty state, expand Filters, Apply filter, paginate.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Filter form (material_id, category_id only — no sort hidden fields on base page, same as Deleted base).
- Variant-of: Unique template for Inactive scope (shares structure with Deleted scope empty-state template; distinct from Active).
- Broken/empty: Empty state — "No Teachers Found". Also note: heading renders raw i18n key `messages.Inactive Teachers` — a localization bug.
- UX improvement for the rebuild: Fix the translation key leak (heading shows `messages.Inactive Teachers` instead of "Inactive Teachers"). The new frontend should use a typed i18n system (e.g., i18next with TypeScript) so missing keys surface at build time, not in production.

---

### `management-teachers-scope-inactive-sort-by-country-sort-direction-asc-page-1` — Inactive Teachers (sort: country asc)
- Purpose: Inactive teachers sorted by country; empty. Same i18n bug.
- Key sections / flows: Same Inactive template. Empty.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Filter form with sort hidden fields.
- Variant-of: `management-teachers-scope-inactive`.
- Broken/empty: Empty — "No Teachers Found". i18n key leak present.
- UX improvement for the rebuild: Same i18n fix. Sort indicator should be visible on empty state.

---

### `management-teachers-scope-inactive-sort-by-created-at-sort-direction-asc-page-1` — Inactive Teachers (sort: created_at asc)
- Purpose: Inactive teachers sorted by creation date; empty.
- Key sections / flows: Same Inactive template. Empty. i18n leak.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same filter form.
- Variant-of: `management-teachers-scope-inactive`.
- Broken/empty: Empty — "No Teachers Found". i18n key leak.
- UX improvement for the rebuild: Same i18n fix.

---

### `management-teachers-scope-inactive-sort-by-first-name-sort-direction-desc-page-1` — Inactive Teachers (sort: first_name desc)
- Purpose: Inactive teachers sorted by first name descending; empty.
- Key sections / flows: Same Inactive template. Empty. i18n leak.
- Key SAFE actions: Same.
- Key MUTATING/dangerous actions: Add Teacher.
- Important modals/forms: Same filter form.
- Variant-of: `management-teachers-scope-inactive`.
- Broken/empty: Empty — "No Teachers Found". i18n key leak.
- UX improvement for the rebuild: Same i18n fix.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Teachers management module provides admin-level listing, filtering, sorting, and CRUD access for teacher accounts. Core entities: Teacher (name, email, phone, country, status, students_count, total_hours_sum, created_at). Teachers have lifecycle statuses: Active, Under Training, Incomplete, Inactive, Deleted (soft-delete). Navigation is via scope-based URL segments (`/scope/Active`, `/scope/Inactive`, `/scope/Deleted`) combined with sort and pagination query params. The top of the page always shows 5 KPI summary cards reflecting cross-scope counts regardless of current scope.

**Distinct page templates vs variant count:**
- **Template A — Active scope with data** (`management-teachers-scope-active`): unique template; has data rows, row-level Edit/Delete POST forms embedded, full 6-form DOM. Confirmed across 6 sort variants (all identical structure, only sort params differ). **1 unique template, 6 variants.**
- **Template B — Deleted scope empty** (`management-teachers-scope-deleted`): unique template for empty-state Deleted scope; no row forms (empty table), simpler DOM (4 forms). Confirmed across 7 sort variants (base + 6 sorted). **1 unique template, 7 variants.**
- **Template C — Inactive scope empty** (`management-teachers-scope-inactive`): effectively same DOM structure as Template B but with i18n key leak in section heading. Confirmed across 3 variants in this batch (base + 2 sorted; more expected in later batches). **1 unique template, 3 variants in this batch.**
- **Total this batch: 3 unique templates, 15 variants.**

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Filters accordion (safe GET form): `material_id` (subject/material filter) + `category_id` (teacher category filter). Triggers page reload with filtered results. Present on all scopes.
- Sort links (safe GET): Column header links pass `sort_by` and `sort_direction` via URL — no mutation.
- Row Settings column (Active scope only): Contains "Show Details" (opens a Loading modal via XHR — safe), "Edit" (navigates to edit page — safe navigation, but destination page mutates), "Delete" (inline POST form — DANGEROUS, no confirmation dialog observed in captured interactions).
- Add Teacher button: Navigates to create form page; not auto-dangerous but is a creation entry point.
- The two hidden POST forms embedded per row in the Active scope (`/management/teachers/{id}` with `_method` hidden) are the primary dangerous actions — one for Edit (PATCH) and one for Delete (DELETE). These fire without any confirmation layer visible in the captures.

**Improvements for the new platform:**
1. **Dangerous action safety**: Wrap Delete in a confirmation modal displaying teacher name, student count, and total hours before confirming. Never embed raw DELETE forms inline in table rows.
2. **Row actions UX**: Replace inline text links (Show Details / Edit / Delete) with a single kebab (three-dot) dropdown menu per row. Visually distinguish destructive actions with red/warning color.
3. **Scope navigation**: Replace scope-based URL segments (`/scope/Active`) with a tab/pill bar at the top of a single `/management/teachers` route with `?scope=active` param; scope counts from the KPI cards can populate tab badges.
4. **KPI cards**: The 5 cross-scope count cards appear on every scope page. In the rebuild, make these clickable scope-switcher chips (clicking "Inactive 0" switches scope to Inactive).
5. **Sort UX**: Replace separate sort links with sortable column headers (click toggles asc/desc, chevron icon shows direction). Sorting state persisted in URL for shareability/bookmarking.
6. **Filters**: Current filters (material, category) are unlabeled selects. Add clear labels and an "Active filters" chip summary bar so admins can see applied filters at a glance.
7. **Empty state quality**: "No Teachers Found" empty state should differentiate between "no teachers match your filters" vs "no deleted/inactive teachers exist yet" — different CTAs for each case. Deleted scope should say "No deleted teachers" not "Start by adding teachers" (that message belongs only on a truly empty system).
8. **i18n bug — Inactive scope**: The heading renders the raw key `messages.Inactive Teachers`. Fix with a proper i18n system; TypeScript-typed keys recommended.
9. **Logo 404**: `storage/uploads/logo.png` returns 404 on every page — a persistent missing asset. New platform should serve a reliable logo from a CDN or static asset path.
10. **Missing text search**: The filter form has no name/email text search field for teachers; only material and category selects. Add a text search input for teacher name or email.
11. **RTL / mobile**: All pages are LTR (English). The rebuild should be RTL-first (Arabic is likely primary audience given Arabic teacher name in the only data row). Tables need horizontal scroll or card layout on mobile.
12. **Accessibility**: No ARIA labels on filter selects (unnamed selects). Row action buttons lack aria-label. Rebuild needs full ARIA compliance.

**Anything that needs owner/backend confirmation:**
- What happens to a teacher's active sessions/students when they are soft-deleted? Does the Delete action cascade-suspend sessions? — needs confirmation before UX copy and guard rails are designed.
- The Inactive scope heading i18n key (`messages.Inactive Teachers`) — confirm the correct English label and whether additional statuses ("Under Training", "Incomplete") each have their own scope endpoints or are sub-filters.
- Are the filter fields (`material_id`, `category_id`) backed by API endpoints that return lists, or are they static dropdowns? The crawler only captured select elements without option values; backend must confirm the available options and whether they are dynamic.
- Two slug files have truncated names (missing the `-1` page suffix): `...-sort-by-students-count-sort-direction-asc-page` and `...-sort-by-total-hours-sum-sort-direction-asc-page`. Confirm these are page=1 results captured with a filesystem slug-length truncation issue, not separate non-paginated endpoints.

---
# Batch 24 — admin · Teachers (scope: Inactive, Incomplete, Unconfirmed — sort/page variants)

All 18 pages in this batch are scoped teacher list views under `/management/teachers/scope/{scope}` with various `sort_by`, `sort_direction`, and `page` query parameters. Three scope values are covered: **Inactive** (4 pages), **Incomplete** (8 pages), and **Unconfirmed** (6 pages). Every page was captured with HTTP 200 and rendered the same structural template; all tables show "No Teachers Found" because the test account has zero teachers in these statuses.

---

### `management-teachers-scope-inactive-sort-by-phone-sort-direction-asc-page-1` — Inactive Teachers, sorted by Phone ASC

- **Purpose:** Shows teachers with Inactive status, sorted by phone number ascending, page 1.
- **Key sections / flows:** 5-card KPI bar (Active 1/100%, Under Training 0%, Incomplete 0%, Inactive 0%, Deleted 0%) → collapsible Filters accordion (material, category selects) → data table (10 cols: #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings) → "No Teachers Found" empty state with "Start by adding teachers to your system" message → pagination (page 1 placeholder link).
- **Key SAFE actions:** View all courses (nav), View All Queues (nav), Filters accordion toggle, Apply filter (GET form, no mutation), pagination links.
- **Key MUTATING/dangerous actions:** Add Teacher (creates new teacher record), See All Notifications (POST form), Add shortcuts (POST).
- **Important modals/forms:** Filters form (GET, fields: sort_by hidden, sort_direction hidden, page hidden, material_id select, category_id select); "Add shortcuts" modal (POST to /management/shortcuts, fields: shortcut_title, shortcut_link).
- **Variant-of:** `management-teachers-scope-inactive` (base template — scope=Inactive, default sort); this page adds sort_by=phone&sort_direction=asc&page=1.
- **Broken/empty:** Table shows "No Teachers Found" — the Inactive scope has 0 records in the test dataset. Logo image 404 (`/storage/uploads/logo.png`) on all pages in this batch.
- **UX improvement for the rebuild:** The sort controls are hidden as HTML hidden inputs inside the filter form — they are not visible affordances. The rebuild should render explicit sortable column headers in the table that toggle asc/desc and update the URL, with a visual sort indicator per column.

---

### `management-teachers-scope-inactive-sort-by-status-sort-direction-asc-page-1` — Inactive Teachers, sorted by Status ASC

- **Purpose:** Same Inactive teachers list sorted by status field ascending.
- **Key sections / flows:** Identical structure to phone-sort variant — KPI bar, Filters accordion, 10-col table (empty), pagination.
- **Key SAFE actions:** Filter Apply, navigation links.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Same Filters form (sort_by=status hidden).
- **Variant-of:** `management-teachers-scope-inactive` base template.
- **Broken/empty:** "No Teachers Found" — 0 Inactive records.
- **UX improvement for the rebuild:** Sorting by "Status" on a scope-filtered list (already scoped to Inactive) is redundant — consider hiding irrelevant sort options per scope, or displaying a notice that all results have the same status.

---

### `management-teachers-scope-inactive-sort-by-students-count-sort-direction-asc-pag` — Inactive Teachers, sorted by Student Count ASC

- **Purpose:** Inactive teachers list sorted by number of students (ascending).
- **Key sections / flows:** Same KPI bar + Filters + empty 10-col table + pagination.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=students_count hidden.
- **Variant-of:** `management-teachers-scope-inactive` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** "All students has course" column label is grammatically incorrect — rephrase as "Students with Course" or similar for clarity.

---

### `management-teachers-scope-inactive-sort-by-total-hours-sum-sort-direction-asc-pa` — Inactive Teachers, sorted by Total Hours ASC

- **Purpose:** Inactive teachers list sorted by total teaching hours sum ascending.
- **Key sections / flows:** Same template structure; sort_by=total_hours_sum.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=total_hours_sum hidden.
- **Variant-of:** `management-teachers-scope-inactive` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** "Total Hours" would benefit from a numeric badge or sparkline in the column header showing the sum across visible records; expose as a footer aggregate in the rebuild.

---

### `management-teachers-scope-incomplete` — Incomplete Teachers (base scope)

- **Purpose:** Landing view for teachers with Incomplete profile status (missing required profile data), no explicit sort or page params.
- **Key sections / flows:** KPI bar (Active 1/100%, Under Training 0%, Incomplete 0%, Inactive 0%, Deleted 0%) → Filters accordion (material_id, category_id) → 10-col table empty state ("No Teachers Found / Start by adding teachers to your system") → pagination.
- **Key SAFE actions:** Filter Apply, column header sort links (inferred from discovered sort-variant pages), navigation links.
- **Key MUTATING/dangerous actions:** Add Teacher (link to /teachers/create), See All Notifications (POST), Add shortcuts (POST).
- **Important modals/forms:** Filters form (GET, 2 select fields only — no hidden sort fields on base load); Add shortcuts modal.
- **Variant-of:** Unique template (base for the Incomplete scope; sort/page derivatives are variants of this).
- **Broken/empty:** "No Teachers Found" — 0 Incomplete records in test data. Logo 404.
- **UX improvement for the rebuild:** The Incomplete scope implies teachers with missing profile data — the empty state should guide admin to proactively complete profiles, e.g. a CTA "View all teachers and complete profiles" rather than just "Start by adding teachers."

---

### `management-teachers-scope-incomplete-sort-by-country-sort-direction-asc-page-1` — Incomplete Teachers, sorted by Country ASC

- **Purpose:** Incomplete teachers list sorted by country field ascending.
- **Key sections / flows:** Same as incomplete base — KPI bar, Filters (with hidden sort_by=country, sort_direction=asc, page=1), empty table, pagination.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=country hidden.
- **Variant-of:** `management-teachers-scope-incomplete` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Country filter as a free-sort column is less useful; consider adding a country-dropdown filter to quickly narrow by region.

---

### `management-teachers-scope-incomplete-sort-by-created-at-sort-direction-asc-page` — Incomplete Teachers, sorted by Created At ASC

- **Purpose:** Incomplete teachers list sorted by account creation date ascending (oldest first).
- **Key sections / flows:** Same 10-col table structure; sort_by=created_at.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=created_at hidden.
- **Variant-of:** `management-teachers-scope-incomplete` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Default sort for Incomplete scope should be created_at desc (newest first) so admins see the most recent incomplete registrations at the top.

---

### `management-teachers-scope-incomplete-sort-by-first-name-sort-direction-desc-page` — Incomplete Teachers, sorted by First Name DESC

- **Purpose:** Incomplete teachers list sorted by first name descending (Z→A).
- **Key sections / flows:** Same structure; sort_by=first_name, sort_direction=desc.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with hidden sort fields.
- **Variant-of:** `management-teachers-scope-incomplete` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Name sort (both asc/desc) should be clickable directly on the column header with a toggle indicator, not a separate URL link.

---

### `management-teachers-scope-incomplete-sort-by-phone-sort-direction-asc-page-1` — Incomplete Teachers, sorted by Phone ASC

- **Purpose:** Incomplete teachers list sorted by phone number ascending.
- **Key sections / flows:** Same structure; sort_by=phone.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=phone hidden.
- **Variant-of:** `management-teachers-scope-incomplete` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Phone number sorting is a secondary use case; consider hiding rarely-used sort columns behind a "customize columns" affordance.

---

### `management-teachers-scope-incomplete-sort-by-status-sort-direction-asc-page-1` — Incomplete Teachers, sorted by Status ASC

- **Purpose:** Incomplete teachers list sorted by sub-status field ascending.
- **Key sections / flows:** Same KPI + Filters + empty table; sort_by=status.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=status hidden.
- **Variant-of:** `management-teachers-scope-incomplete` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Status-sorting within a single-status scope is a no-op and should be suppressed or replaced with sorting by a more meaningful field like "completion percentage."

---

### `management-teachers-scope-incomplete-sort-by-students-count-sort-direction-asc-p` — Incomplete Teachers, sorted by Student Count ASC

- **Purpose:** Incomplete teachers list sorted by number of assigned students ascending.
- **Key sections / flows:** Same structure; sort_by=students_count.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=students_count hidden.
- **Variant-of:** `management-teachers-scope-incomplete` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Incomplete teachers having students is a business concern — if an incomplete teacher has students, surface a warning badge on the row.

---

### `management-teachers-scope-incomplete-sort-by-total-hours-sum-sort-direction-asc` — Incomplete Teachers, sorted by Total Hours ASC

- **Purpose:** Incomplete teachers list sorted by total teaching hours sum ascending.
- **Key sections / flows:** Same structure; sort_by=total_hours_sum.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=total_hours_sum hidden.
- **Variant-of:** `management-teachers-scope-incomplete` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Show a total-hours aggregate footer row in the table so admins can gauge overall teaching load across the filtered set.

---

### `management-teachers-scope-unconfirmed` — Unconfirmed Teachers (base scope)

- **Purpose:** Landing view for teachers whose accounts have been created but not yet email/identity confirmed, no explicit sort or page params.
- **Key sections / flows:** KPI bar (Active 1/100%, all other scopes 0%) → Filters accordion (material_id, category_id selects, no hidden sort on base) → 10-col table empty state → pagination.
- **Key SAFE actions:** Filter Apply, navigation links.
- **Key MUTATING/dangerous actions:** Add Teacher (could create a teacher bypassing confirmation flow), See All Notifications (POST), Add shortcuts (POST).
- **Important modals/forms:** Filters form (GET, 2 selects); Add shortcuts modal.
- **Variant-of:** Unique template (base for Unconfirmed scope; sort derivatives are variants).
- **Broken/empty:** "No Teachers Found" — 0 Unconfirmed records. Logo 404.
- **UX improvement for the rebuild:** The Unconfirmed scope should surface a "Resend confirmation email" row-action per teacher, which is currently absent from the visible column set — likely hidden in the Settings column. Make it a visible inline action with a confirmation step.

---

### `management-teachers-scope-unconfirmed-sort-by-country-sort-direction-asc-page-1` — Unconfirmed Teachers, sorted by Country ASC

- **Purpose:** Unconfirmed teachers list sorted by country ascending.
- **Key sections / flows:** Same structure as unconfirmed base; hidden sort_by=country.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=country hidden.
- **Variant-of:** `management-teachers-scope-unconfirmed` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Group unconfirmed teachers by country in a collapsible section rather than sorting — reduces scroll overhead in international academies.

---

### `management-teachers-scope-unconfirmed-sort-by-created-at-sort-direction-asc-page` — Unconfirmed Teachers, sorted by Created At ASC

- **Purpose:** Unconfirmed teachers list sorted by account creation date ascending (oldest pending first).
- **Key sections / flows:** Same structure; sort_by=created_at.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=created_at hidden.
- **Variant-of:** `management-teachers-scope-unconfirmed` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Show a "Days pending" derived column so admins can prioritize long-waiting unconfirmed teachers for follow-up.

---

### `management-teachers-scope-unconfirmed-sort-by-first-name-sort-direction-desc-pag` — Unconfirmed Teachers, sorted by First Name DESC

- **Purpose:** Unconfirmed teachers list sorted by first name descending.
- **Key sections / flows:** Same structure; sort_by=first_name, sort_direction=desc.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with hidden sort fields.
- **Variant-of:** `management-teachers-scope-unconfirmed` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Alphabetic sort by name should be the default for this scope when looking for a specific teacher; surface it as the default.

---

### `management-teachers-scope-unconfirmed-sort-by-phone-sort-direction-asc-page-1` — Unconfirmed Teachers, sorted by Phone ASC

- **Purpose:** Unconfirmed teachers list sorted by phone number ascending.
- **Key sections / flows:** Same structure; sort_by=phone.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=phone hidden.
- **Variant-of:** `management-teachers-scope-unconfirmed` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Phone as a sort axis is low value for Unconfirmed — consider adding a "Contact" quick action (click-to-call/WhatsApp) per row rather than sort.

---

### `management-teachers-scope-unconfirmed-sort-by-status-sort-direction-asc-page-1` — Unconfirmed Teachers, sorted by Status ASC

- **Purpose:** Unconfirmed teachers list sorted by sub-status ascending.
- **Key sections / flows:** Same structure; sort_by=status.
- **Key SAFE actions:** Filter Apply, navigation.
- **Key MUTATING/dangerous actions:** Add Teacher, See All Notifications, Add shortcuts.
- **Important modals/forms:** Filters form with sort_by=status hidden.
- **Variant-of:** `management-teachers-scope-unconfirmed` base template.
- **Broken/empty:** "No Teachers Found."
- **UX improvement for the rebuild:** Status-sorting within a scope-filtered view is redundant — suppress this sort option or replace it with sub-status (e.g. email sent / email bounced) to surface actionable distinction.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Teachers module's scoped list views allow admins to inspect teacher accounts in non-active lifecycle states: **Inactive** (deactivated accounts), **Incomplete** (profiles with missing required fields), and **Unconfirmed** (registered but not yet email/identity confirmed). Core entities are Teacher records with fields: name, status, student count, total hours, phone, schedule, country, created_at, and a Settings action column. A 5-segment KPI bar at the top shows distribution across all status buckets (Active/Under Training/Incomplete/Inactive/Deleted) as count + percentage.

**Distinct page templates vs variant count:**
- **Unique templates: 3** — one per scope (`scope/inactive`, `scope/incomplete`, `scope/unconfirmed`), each with a base (no sort params) URL.
- **Variant pages: 15** — sort/page parameter variants across the three scopes (4 for Inactive, 7 for Incomplete, 5 for Unconfirmed, not counting the 3 base pages as variants of themselves). All 18 pages render an identical DOM structure; only the section title heading and the active scope differ.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Filters accordion (material_id, category_id selects + Apply GET submit) — safe, no mutation.
- Column sort links (hidden inputs in filter form triggered by clicking column headers) — safe GET navigation.
- "Add Teacher" CTA — dangerous: navigates to teacher creation form; must not be auto-fired.
- "See All Notifications" (POST form) — potentially mutating; treat as dangerous.
- "Add shortcuts" modal (POST to /management/shortcuts) — mutating but low-stakes; requires title + link.
- Settings column per row — content unknown (inferred from column header); likely contains Edit/Delete/Activate/Suspend row actions which are dangerous and require confirmation dialogs in the rebuild.

**Improvements for the new platform:**
1. **Unified scope switcher UI:** Replace separate URL scope routes with a tab bar or segmented control (Active / Under Training / Incomplete / Inactive / Unconfirmed / Deleted) on a single route `/management/teachers` — reduces URL sprawl from 18+ variants to one page with state.
2. **Sortable column headers:** Replace hidden-input sort params with clickable `<th>` headers that toggle asc/desc and update the URL via query string — visible affordance with sort arrow indicators.
3. **Empty state per scope:** Each scope needs a tailored empty state: Incomplete should prompt "complete profile"; Unconfirmed should offer "resend confirmation email"; Inactive should offer "reactivate".
4. **Inline row actions:** Surface scope-specific quick actions directly on table rows (Reactivate for Inactive, Complete Profile for Incomplete, Resend Email for Unconfirmed) instead of burying them in a Settings dropdown.
5. **"Days pending" derived column:** For Unconfirmed and Incomplete scopes, show how long the teacher has been in the current state to prioritize follow-up.
6. **Logo 404 fix:** `/storage/uploads/logo.png` returns 404 on all captured pages — backend must seed/upload a logo.
7. **i18n cleanup:** `messages.Inactive Teachers` raw translation key leaks in the Inactive scope heading — needs proper locale fallback handling.
8. **RTL/mobile:** All pages are LTR-only; the rebuild must support RTL for Arabic locale and mobile layouts for teacher management on-the-go.
9. **Dangerous action safety:** "Add Teacher" and any Delete/Suspend row actions must use confirmation dialogs. The Settings dropdown (not visible in this batch) needs audit to identify dangerous operations.
10. **Status colors:** The KPI bar currently shows plain counts; color-code each status segment (e.g. red for Inactive, orange for Incomplete, yellow for Unconfirmed) so at-a-glance health of the teacher pool is immediately clear.

**Anything that needs owner/backend confirmation:**
- What sub-statuses exist within Incomplete (missing photo? missing bio? missing availability?)? This drives whether a completion-progress bar per row is feasible.
- Are there any row-level actions (confirm, reject, reactivate, suspend) accessible from the Settings column that were not captured in this empty-state crawl? Need live data to verify.
- The Unconfirmed scope: does "resend confirmation" email exist in the backend, and what is the API endpoint?
- The filter form posts to `/management/teachers` (not the scoped URL) — confirm that material_id and category_id filters work correctly with scope parameter in the rebuild's API contract.

---
# Batch 25 — admin · Teachers (sort/scope variants)

All 16 pages confirmed read. This batch is exclusively the admin Teachers list viewed through sort-direction and scope-filter query-parameter combinations. Two sub-groups exist: pages 1–2 are the `scope/Unconfirmed` view; pages 3–16 are the default `Active` scope with every sortable column toggled asc and desc.

---

### `management-teachers-scope-unconfirmed-sort-by-students-count-sort-direction-asc` — Unconfirmed Teachers · Sort by Student Count ASC

- **Purpose:** Shows the Unconfirmed scope of the teacher roster sorted ascending by student count; in this crawl the list is empty (no unconfirmed teachers exist).
- **Key sections / flows:** Five status KPI cards (Active=1, Under Training=0, Incomplete=0, Inactive=0, Deleted=0); section heading "Unconfirmed Teachers"; 10-column table (#, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings); collapsible Filters accordion (material, category); server-side sort encoded as hidden inputs; pagination stub (1 page).
- **Key SAFE actions:** Toggle Filters accordion; select material/category filter and Apply (GET); navigate Schedule link per row; pagination.
- **Key MUTATING/dangerous actions:** Add Teacher (navigates to create form); Delete teacher (POST with _method override per row — must require confirmation); Edit teacher (navigates to edit form).
- **Important modals/forms:** Filter form (GET, fields: sort_by, sort_direction, page, material_id, category_id); per-row delete form posts to `/management/teachers/{id}` with `_method` hidden — dangerous, must require explicit confirmation dialog.
- **Variant-of:** `management-teachers-scope-unconfirmed` (base template); sort param variant only.
- **Broken/empty:** Table body shows "No Teachers Found / Start by adding teachers to your system" — data-empty state, not an HTTP error (page returns 200).
- **UX improvement for the rebuild:** The empty state for Unconfirmed scope should surface a clear call-to-action explaining what "unconfirmed" means and how teachers get into that state, rather than a generic "start by adding" prompt.

---

### `management-teachers-scope-unconfirmed-sort-by-total-hours-sum-sort-direction-asc` — Unconfirmed Teachers · Sort by Total Hours ASC

- **Purpose:** Same Unconfirmed scope sorted by total hours ascending; also empty.
- **Key sections / flows:** Identical structure to the student-count sort variant above — five KPI cards, "Unconfirmed Teachers" heading, empty 10-column table, Filters accordion.
- **Key SAFE actions:** Same as above.
- **Key MUTATING/dangerous actions:** Add Teacher; Delete teacher (per-row hidden-method POST).
- **Important modals/forms:** Same filter form structure; no row-level forms rendered because table is empty.
- **Variant-of:** `management-teachers-scope-unconfirmed-sort-by-students-count-sort-direction-asc` (same template, different sort_by param).
- **Broken/empty:** Empty table (no data), HTTP 200.
- **UX improvement for the rebuild:** Unify sort controls with the main active-scope list so scope switching preserves the chosen sort column — currently each scope/sort combo is a separate URL.

---

### `management-teachers-sort-by-country-sort-direction-asc-page-1` — Active Teachers · Sort by Country ASC

- **Purpose:** Default Active scope of the teacher roster sorted alphabetically by country (A→Z); one teacher record visible.
- **Key sections / flows:** Five status KPI cards; "Active Teachers" section heading with "Add Teacher" CTA; 10-column sortable table with one data row (teacher name + email, status badge "Active", student count=1, total hours=5, phone, Schedule link, country=Egypt, created date, Settings dropdown with Show Details / Edit / Delete); collapsible Filters accordion; pagination (1 page).
- **Key SAFE actions:** Click column header links to re-sort (asc/desc toggle); open Filters accordion; select material or category and Apply; click Schedule link to navigate to teacher timetable; view Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher (navigates to create); Edit (navigates to edit); Delete (per-row POST via hidden `_method` — dangerous, must require confirmation dialog before firing).
- **Important modals/forms:** Two per-row hidden-method forms targeting `/management/teachers/1` (one for edit, one for delete); filter form (GET); the row Settings menu appears to be a dropdown that reveals Show Details, Edit, and Delete inline links — the Delete link submits the hidden form without a visible confirmation in the captured markup.
- **Variant-of:** `management-teachers` (base Active-scope list template); sort_by=country, sort_direction=asc variant.
- **Broken/empty:** No broken state; one live teacher row confirmed.
- **UX improvement for the rebuild:** The per-row Delete action has no visible confirmation step in the original — rebuild must gate it behind a modal confirm dialog (teacher name + "This cannot be undone") before any POST is fired.

---

### `management-teachers-sort-by-country-sort-direction-desc-page-1` — Active Teachers · Sort by Country DESC

- **Purpose:** Same Active-scope list sorted by country descending (Z→A); same single-teacher dataset.
- **Key sections / flows:** Identical to the ASC variant; same row data, same KPI cards, same filter accordion.
- **Key SAFE actions:** Re-sort by clicking column header (toggles to ASC); filter; Schedule link; Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher; Edit; Delete (hidden-method POST, no native confirm).
- **Important modals/forms:** Same two per-row hidden-method forms; filter form.
- **Variant-of:** `management-teachers-sort-by-country-sort-direction-asc-page-1` (flip of sort_direction only).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Column header sort indicators (asc/desc arrow) should be visually obvious; currently the active sort column is not highlighted distinctly.

---

### `management-teachers-sort-by-created-at-sort-direction-asc-page-1` — Active Teachers · Sort by Created At ASC

- **Purpose:** Active-scope teacher list sorted oldest-first by registration date.
- **Key sections / flows:** Identical chrome and table structure; single row showing created date 2026/6/17.
- **Key SAFE actions:** Sort toggle, filter, Schedule, Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher; Edit; Delete.
- **Important modals/forms:** Same per-row hidden-method forms; filter form.
- **Variant-of:** `management-teachers-sort-by-country-sort-direction-asc-page-1` (same base Active-scope template; sort_by=created_at variant).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Date column should display relative time ("3 days ago") alongside the absolute date for quick scanning, especially when admins need to identify newly registered teachers.

---

### `management-teachers-sort-by-created-at-sort-direction-desc-page-1` — Active Teachers · Sort by Created At DESC

- **Purpose:** Active-scope teacher list sorted newest-first — the most operationally useful default order for onboarding review.
- **Key sections / flows:** Same as ASC; identical single row.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** Same.
- **Important modals/forms:** Same.
- **Variant-of:** `management-teachers-sort-by-created-at-sort-direction-asc-page-1` (direction flip).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Consider making sort-by-created_at-desc the default landing sort for the teacher list so newest teachers surface first for onboarding workflows.

---

### `management-teachers-sort-by-first-name-sort-direction-asc-page-1` — Active Teachers · Sort by First Name ASC

- **Purpose:** Alphabetical ascending sort of the teacher roster by first name.
- **Key sections / flows:** Identical layout; single row; name column is Arabic (المعلم محمد صادق صادق).
- **Key SAFE actions:** Sort toggle, filter, Schedule, Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher; Edit; Delete.
- **Important modals/forms:** Same per-row hidden-method forms; filter form.
- **Variant-of:** `management-teachers-sort-by-country-sort-direction-asc-page-1` (sort_by=first_name variant).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Arabic teacher names require RTL-aware text rendering in the name column even when the overall page direction is LTR; the rebuild must handle bidirectional text in table cells.

---

### `management-teachers-sort-by-first-name-sort-direction-desc-page-1` — Active Teachers · Sort by First Name DESC

- **Purpose:** Reverse-alphabetical sort by first name.
- **Key sections / flows:** Same as ASC; identical single row.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** Same.
- **Important modals/forms:** Same.
- **Variant-of:** `management-teachers-sort-by-first-name-sort-direction-asc-page-1` (direction flip).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Same RTL-in-LTR bidi text requirement as ASC variant.

---

### `management-teachers-sort-by-phone-sort-direction-asc-page-1` — Active Teachers · Sort by Phone ASC

- **Purpose:** Teacher list sorted numerically ascending by phone number; useful for deduplication or region grouping.
- **Key sections / flows:** Same structure; single row with phone 201278910727 (Egypt country code visible).
- **Key SAFE actions:** Sort toggle, filter, Schedule, Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher; Edit; Delete.
- **Important modals/forms:** Same per-row hidden-method forms; filter form.
- **Variant-of:** `management-teachers-sort-by-country-sort-direction-asc-page-1` (sort_by=phone variant).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Phone numbers should be formatted with international dial codes and ideally rendered as clickable tel: links for mobile admin users.

---

### `management-teachers-sort-by-phone-sort-direction-desc-page-1` — Active Teachers · Sort by Phone DESC

- **Purpose:** Teacher list sorted phone descending; same single-record dataset.
- **Key sections / flows:** Identical to phone ASC.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** Same.
- **Important modals/forms:** Same.
- **Variant-of:** `management-teachers-sort-by-phone-sort-direction-asc-page-1` (direction flip).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Same tel: link improvement as ASC.

---

### `management-teachers-sort-by-status-sort-direction-asc-page-1` — Active Teachers · Sort by Status ASC

- **Purpose:** Teacher list sorted alphabetically by status label (A→Z); with only Active records in view, this is trivially ordered.
- **Key sections / flows:** Same layout; single Active-status row; status displayed as badge.
- **Key SAFE actions:** Sort toggle, filter, Schedule, Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher; Edit; Delete.
- **Important modals/forms:** Same per-row hidden-method forms; filter form.
- **Variant-of:** `management-teachers-sort-by-country-sort-direction-asc-page-1` (sort_by=status variant).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Status column should use colored badges (green=Active, yellow=Under Training, orange=Incomplete, red=Inactive, grey=Deleted) so admins can scan status at a glance; currently the badge color scheme is not captured but should be standardized in the design system.

---

### `management-teachers-sort-by-status-sort-direction-desc-page-1` — Active Teachers · Sort by Status DESC

- **Purpose:** Reverse-alphabetical sort by status; operationally useful when the roster has mixed statuses (surfaces Inactive/Deleted at top).
- **Key sections / flows:** Same as ASC variant.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** Same.
- **Important modals/forms:** Same.
- **Variant-of:** `management-teachers-sort-by-status-sort-direction-asc-page-1` (direction flip).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** In the rebuild, status sorting should ideally follow a logical severity order (Active > Under Training > Incomplete > Inactive > Deleted) rather than alphabetical, making the sort more operationally meaningful.

---

### `management-teachers-sort-by-students-count-sort-direction-asc-page-1` — Active Teachers · Sort by Student Count ASC

- **Purpose:** Teacher list sorted ascending by number of assigned students; useful for identifying under-utilized teachers.
- **Key sections / flows:** Same layout; single row (students=1).
- **Key SAFE actions:** Sort toggle, filter, Schedule, Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher; Edit; Delete.
- **Important modals/forms:** Same per-row hidden-method forms; filter form.
- **Variant-of:** `management-teachers-sort-by-country-sort-direction-asc-page-1` (sort_by=students_count variant).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Student count and Total Hours columns together are a load-distribution indicator; in the rebuild these could surface a capacity bar or mini-chart per row to communicate teacher workload at a glance.

---

### `management-teachers-sort-by-students-count-sort-direction-desc-page-1` — Active Teachers · Sort by Student Count DESC

- **Purpose:** Descending student count — surfaces highest-load teachers first; the primary operational sort for capacity management.
- **Key sections / flows:** Same as ASC; single row.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** Same.
- **Important modals/forms:** Same.
- **Variant-of:** `management-teachers-sort-by-students-count-sort-direction-asc-page-1` (direction flip).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Consider making sort-by-students_count-desc a quick-access preset ("Busiest") in a filter chip bar so admins can jump to workload view without hunting through sort columns.

---

### `management-teachers-sort-by-total-hours-sum-sort-direction-asc-page-1` — Active Teachers · Sort by Total Hours ASC

- **Purpose:** Teacher list sorted ascending by cumulative teaching hours; lowest-hours teachers first.
- **Key sections / flows:** Same layout; single row (hours=5).
- **Key SAFE actions:** Sort toggle, filter, Schedule, Show Details.
- **Key MUTATING/dangerous actions:** Add Teacher; Edit; Delete.
- **Important modals/forms:** Same per-row hidden-method forms; filter form.
- **Variant-of:** `management-teachers-sort-by-country-sort-direction-asc-page-1` (sort_by=total_hours_sum variant).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** Total hours is a key salary/payout input; surfacing a quick link from this column to the teacher's salary or payout record would reduce operational steps.

---

### `management-teachers-sort-by-total-hours-sum-sort-direction-desc-page-1` — Active Teachers · Sort by Total Hours DESC

- **Purpose:** Descending total hours — surfaces highest-earning/most-active teachers first.
- **Key sections / flows:** Same as ASC.
- **Key SAFE actions:** Same.
- **Key MUTATING/dangerous actions:** Same.
- **Important modals/forms:** Same.
- **Variant-of:** `management-teachers-sort-by-total-hours-sum-sort-direction-asc-page-1` (direction flip).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** The rebuild could add an inline "hours this month" sparkline or delta indicator so admins see trends rather than a bare cumulative number.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Teachers management module is the primary roster view for all teacher accounts. Core entities: Teacher (name, email, status, phone, country, created_at), student-count (aggregated), total_hours_sum (aggregated), material assignments, category assignments. The list supports two route-level scopes (`Active` at `/management/teachers`, `Unconfirmed` at `/management/teachers/scope/Unconfirmed`) and seven sortable columns (first_name, status, students_count, total_hours_sum, phone, country, created_at), each with asc/desc directions. Combined with filter by material and category, this batch represents the combinatorial explosion of a single underlying list template.

**Distinct page templates vs variant count:**
- Unique templates: **2**
  1. `teachers-active-list` — the default `/management/teachers` active-scope list with data rows (10-column table, 5 KPI cards, collapsible filters, Add Teacher CTA, per-row Settings with Show Details/Edit/Delete)
  2. `teachers-unconfirmed-list` — the `/management/teachers/scope/Unconfirmed` scoped list (same chrome, same columns, but section heading changes and the dataset was empty at capture time — showing "No Teachers Found" empty state)
- Variant pages: **14** (12 sort-direction pairs across 6 columns for the active scope + 2 sort variants for the unconfirmed scope = 14 confirmed variants in this batch)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Filters accordion (safe): collapses/expands; submits GET with material_id + category_id; preserves sort state via hidden inputs.
- Column-header sort (safe): GET with sort_by + sort_direction params; page resets to 1.
- Per-row Settings dropdown (reveals): Show Details (safe navigation), Edit (safe navigation to edit form), Delete (DANGEROUS — submits hidden-method POST to `/management/teachers/{id}` with no visible confirmation step in captured markup; must be gated in rebuild).
- Add Teacher button (safe navigation to create form — but result is mutating).
- No inline status-change controls visible; status changes likely happen inside the teacher detail/edit page.

**Improvements for the new platform:**
1. **Single sortable table component** — collapse all 16 (and more) sort-variant URLs into one route with client-side or API sort; use column-header click with asc/desc indicator and URL state preservation via query params.
2. **Scope as a tab/chip strip** — Active / Under Training / Incomplete / Inactive / Deleted / Unconfirmed as status filter chips above the table rather than separate route scopes; eliminates the scope URL proliferation.
3. **Delete confirmation modal** — every Delete action must open a modal naming the teacher and warning about consequences before any POST fires; the current hidden-form pattern has no native confirm.
4. **RTL-aware name cells** — Arabic teacher names must render RTL in the name column even on an LTR page; use `dir="auto"` or `<bdi>` wrapping.
5. **Status badge color system** — define semantic colors: Active=green, Under Training=amber, Incomplete=orange, Inactive=red, Deleted=grey; currently undifferentiated.
6. **Workload indicators** — student count and total hours columns should show a progress/capacity indicator relative to a configurable max (confirm max-load value with backend/ops team).
7. **Clickable phone numbers** — render as `tel:` links for mobile admin use.
8. **Relative timestamps** — Created At column should show "X days ago" tooltip on hover over the absolute date.
9. **Empty-state for Unconfirmed** — replace generic "start by adding" with a contextual explanation of how teachers enter the Unconfirmed state and what action the admin should take (confirm, contact, reject).
10. **Filter labels** — material_id and category_id selects have no visible labels in the current form; rebuild must add explicit `<label>` elements for accessibility and clarity.
11. **Persistent sort preference** — consider storing the admin's last-used sort in localStorage or a user preference so the list opens in their preferred order on return visits.

**Anything that needs owner/backend confirmation:**
- What is the intended maximum student load per teacher (for capacity indicator)?
- Does "Unconfirmed" mean email-unverified, or admin-approval pending? The distinction changes the empty-state copy and the action available.
- Are there bulk actions (bulk delete, bulk status change) planned but not visible in these captured pages?
- The per-row delete form at `/management/teachers/{id}` with `_method` override — confirm whether this is a soft-delete (sets status=Deleted) or a hard database delete; this affects the confirmation copy and reversibility UI.
- Logo image at `/storage/uploads/logo.png` returns 404 on every captured page — confirm whether this is a known missing asset or a configuration issue to fix pre-launch.

---
# Batch 26 — admin · Timetable / Schedule (Request & Search sub-module)

---

### `management-request-schedule-1-1` — Request Schedule (student 1, parent 1)

- **Purpose:** Wizard-style form that lets an admin broadcast a schedule request to a filtered set of teachers on behalf of a specific student/parent, choosing between a Trial Class or a Regular Course.
- **Key sections / flows:**
  - Card 1 "Request Schedule" — two-step mode toggle: "Request For Trial Class" vs "Request For Regular Course". Each branch reveals different fields: Trial = teacher multi-select by category, course, duration (30–180 min), accounting statement (Paid/Paid-if-continue/Free), single date+time; Regular = category multi-select, course, total hours, start date, per-day-of-week checkboxes (Sat–Fri) each with time HH:MM and duration select.
  - Card 2 "List of Teachers" — 3-col table (index, checkbox "Select All", Teacher Name). At capture time shows only a placeholder row "Select categories to send request", meaning it is dynamically populated after category selection.
  - Hidden fields carry `parent_id`, `student_id`, `family_id` (bound to the URL route params `/1/1`).
- **Key SAFE actions:** View all courses (link), View All Queues (link), page-level navigation.
- **Key MUTATING/dangerous actions:** **Send Request** (POST `/management/store-request-schedule`) — broadcasts a scheduling request to all checked teachers; must never be auto-fired. Also "Add shortcuts" (POST) and "Save" for the shortcuts widget.
- **Important modals/forms:**
  - Main form (POST `store-request-schedule`): request_type radio, category multi-select with search textarea, course_id, duration, accounting_statement, date, time (Trial branch); OR category multi-select, course_id, total_hours, start_date, per-day checkboxes + time + duration (Regular branch). The dual-branch layout with 63 fields total is confusing; rebuilds should use a clear step wizard.
- **Variant-of:** Base template for `management-request-schedule-{parent_id}-{student_id}`. `management-request-schedule-2-2` is a direct variant (same HTML structure, different IDs in hidden fields).
- **Broken/empty:** Teacher table populates only after category is selected (dynamic); at capture it shows the placeholder. Logo image 404 (`/storage/uploads/logo.png`) — consistent across all pages.
- **UX improvement for the rebuild:** Replace the flat dual-branch form with a multi-step wizard: Step 1 = choose type (Trial/Regular), Step 2 = category + course filters with live teacher list preview, Step 3 = schedule specifics, Step 4 = review + confirm. Add a summary of matched teachers before the "Send Request" action and require explicit confirmation (modal with teacher count).

---

### `management-request-schedule-2-2` — Request Schedule (student 2, parent 2)

- **Purpose:** Identical to `management-request-schedule-1-1` but scoped to a different student/parent pair (IDs 2/2, discovered from `/management/families/2`).
- **Key sections / flows:** Exact same two-card layout: Request Schedule form with Trial/Regular toggle, and the List of Teachers table with dynamic population. Form submits to the same endpoint `store-request-schedule`. All 63 fields, 15 selects, 4 forms, DOM element counts are byte-for-byte identical to the /1/1 page.
- **Key SAFE actions:** Navigation links (View all courses, View All Queues).
- **Key MUTATING/dangerous actions:** **Send Request** (POST `store-request-schedule`) — same as above.
- **Important modals/forms:** Same 3 modals as /1/1 (Loading..., Recent Searches, Add shortcuts). Main form is structurally identical with different hidden field values.
- **Variant-of:** `management-request-schedule-1-1` (same template, route params differ: parent_id=2, student_id=2).
- **Broken/empty:** Same placeholder teacher table at load time. Same logo 404.
- **UX improvement for the rebuild:** This page should not be a separate route in the new system; the student/parent context should be passed as query params or a route parameter to a single `RequestSchedule` component. Eliminates N×M page explosion.

---

### `management-schedule-trials-response` — Request Result (Trial Schedule Responses)

- **Purpose:** Inbox/results board where the admin reviews teacher responses to trial-class schedule requests sent via the Request Schedule tool.
- **Key sections / flows:**
  - Main table (9 cols): Student | Parent | Course Name | Date | Time | Duration | Status | Requests | (actions). At capture: 0 rows, shows "no trial requests" empty state.
  - Two modals accessible from table rows: "Teachers You Sent" (2-col list: #, Teacher Name) and "Accepted Teachers" (4-col list: #, Teacher Name, Message from teacher, Options). These allow the admin to see which teachers were notified and which accepted.
  - 3 total tables: main request table, "Teachers You Sent" table, "Accepted Teachers" table (both in modals, 0 rows at capture).
- **Key SAFE actions:** Navigation links, modal "Close" buttons (6 Close buttons total), view teacher lists.
- **Key MUTATING/dangerous actions:** "See All Notifications" (submit on non-GET form); no explicit approve/reject buttons captured but "Options" column in Accepted Teachers modal likely has action controls (not fully captured).
- **Important modals/forms:**
  - **Teachers You Sent** modal: read-only list of teachers who received the request.
  - **Accepted Teachers** modal: list of teachers who accepted, with a "Message from teacher" field and "Options" — likely where admin finalises the booking. Must not auto-fire.
- **Variant-of:** Unique template.
- **Broken/empty:** Main table empty ("no trial requests") at capture time. Modal tables also 0 rows. This is a valid empty state, not a broken page.
- **UX improvement for the rebuild:** Replace the tabular empty state with an actionable empty-state panel (e.g., "No pending trial requests — send a new request" with a CTA link). The "Accepted Teachers" modal options should be labeled clearly (e.g., "Book this teacher" / "Decline") and require a confirmation step before finalizing.

---

### `management-search-schedule` — Search Schedule (Teacher Availability Finder)

- **Purpose:** Utility tool for admins to find teachers who are available within a specified time window, optionally filtered by category, availability flag, or course.
- **Key sections / flows:**
  - Single card "Search Schedule — Teacher Timezone": a search form with From/To time pickers (HH:MM, required), category multi-select with search, and two checkboxes: "Filter By Availability" and "Courses".
  - On submission (POST to `/management/search-available-teacher`) the page presumably renders a result list (no table captured — the DOM shows 0 tables, indicating results appear dynamically or the page was captured in its empty pre-search state).
  - The heading badge "Teacher Timezone" indicates results are shown in the teacher's local timezone.
- **Key SAFE actions:** Navigation links, Close modals.
- **Key MUTATING/dangerous actions:** **Search** button (submit on POST form `/management/search-available-teacher`) — although labelled "Search" it is a POST, not GET, so flagged as non-safe. In practice it is a read operation (availability query) but the method choice could confuse the new API contract.
- **Important modals/forms:**
  - Main search form: `from` (HH:MM, required), `to` (HH:MM, required), `category_selected[]` (multi-select required), `filter_by_available` checkbox, `filter_by_courses` checkbox. Submit → "Search".
- **Variant-of:** Unique template.
- **Broken/empty:** No results table visible at capture (0 tables in DOM). Either results render after search POST, or there were no results. No explicit empty-state message captured.
- **UX improvement for the rebuild:** Convert the search to a GET-based query with URL params so results are shareable/bookmarkable. Add an inline results panel below the form (rather than a full page reload). Show teacher cards with their weekly availability grid so admins can immediately proceed to "Request Schedule" for a matched teacher.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the admin-side Schedule Request & Discovery sub-module within Timetable / Schedule. Core entities: Student, Parent/Family, Teacher, Course, ScheduleRequest (with type=Trial|Regular), ScheduleResponse (teacher acceptance/rejection with message). The workflow is: Search for available teachers → Send a request → Review responses.

**Distinct page templates vs variant count:**
- Unique templates: 3 (`management-request-schedule-{p}-{s}` as one template, `management-schedule-trials-response`, `management-search-schedule`)
- Variant pages: 1 (`management-request-schedule-2-2` is a parameter variant of `management-request-schedule-1-1`)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- "Send Request" (POST `store-request-schedule`) — DANGEROUS: broadcasts to all selected teachers; needs confirmation modal with teacher count summary.
- "Search" on search-schedule (POST, effectively read-only but mislabeled method).
- "Accepted Teachers > Options" — DANGEROUS: likely finalizes a booking; needs labeled CTA + confirmation.
- All other modals (Teachers You Sent, Recent Searches, Add shortcuts, Loading) are safe view/utility.
- The dual-branch form (Trial vs Regular) on the request page has 63 fields total; 17 filter controls. This is the most complex form in the batch.

**Improvements for the new platform:**
1. **Consolidate route explosion:** `request-schedule/{parent_id}/{student_id}` produces N×M pages. Rebuild as a single component accepting context via route params, opened from within the student or family detail page (contextual action, not a standalone route).
2. **Step wizard for request creation:** Break the 63-field dual-branch form into a 4-step wizard (type → teachers → schedule → confirm) to reduce cognitive load and prevent accidental mass-sends.
3. **Mandatory confirmation before Send Request:** Add a modal showing "You are about to notify X teachers. Proceed?" with teacher names listed.
4. **GET-based availability search:** Refactor search-schedule to use GET + query params so results are bookmarkable and shareable; add inline results with teacher availability cards.
5. **Empty/loading states:** `schedule-trials-response` shows a plain text empty state; replace with an actionable empty state component with a direct "New Request" CTA. `search-schedule` has no visible result state at all — add a clear "no results" illustration.
6. **Status colors on response table:** The Requests/Status columns in `schedule-trials-response` need clear color-coded badges (Pending = yellow, Accepted = green, Declined = red).
7. **Accepted Teachers modal clarity:** Rename "Options" column to explicit action labels; require two-step confirmation for finalizing a teacher booking.
8. **RTL readiness:** All 4 pages are LTR-only (`lang=en`, `dir=ltr`). The teacher name in the request form already contains Arabic text (`محمد السيد`), confirming bilingual data. The new platform must support RTL layout for Arabic locale.
9. **Mobile / teacher-facing:** The per-day schedule grid (7 rows × time + duration) is unusable on small screens; rebuild with a responsive day-card accordion on mobile.
10. **Timezone clarity:** The "Teacher Timezone" badge on search-schedule is the only hint that time data is timezone-relative. The rebuild should surface timezone labels on all time inputs throughout the request flow.

**Needs owner/backend confirmation:**
- The POST method on `search-available-teacher` — is this a true write or a read? If read, it should be refactored to GET for the new API.
- What actions are available in "Accepted Teachers > Options"? Are they approve/book/reject/reschedule? This shapes the response-review page's API contract.
- Can a single request go to multiple students (multi-student batch request), or is each request always 1:1 student-to-teacher-pool?
- Accounting statement options ("Paid", "Paid if continue", "Free") — what backend entity do these map to and who sets the default?

---
# Batch 27 — admin · Wallet / Finance

---

### `management-accounting` — Accounting

- **Purpose:** Financial overview dashboard showing a snapshot of all money flows (invoices, salaries, expenses, net income) for a selected month, plus a currency-rate management panel.
- **Key sections / flows:** KPI summary cards (Total, Paid, UnPaid, Teachers Salaries, Staff Salaries, Expenses Income/Outcome, Total Income, Total Expenses, Net Income); ApexCharts line/bar charts for Net Income, Invoices (Paid/Unpaid), Teachers Salaries, Staff Salaries, Expenses; a currency-rates table (16 rows: AED, AUD, CAD, EGP, EUR, GBP, KWD, MAD, PKR, QAR, RUB, RWF, SAR, TRY, USD, YER); month/year filter via date input + GET form; "Current Month" / "Last Month" toggle buttons.
- **Key SAFE actions:** View charts; filter by date (GET form); switch month toggle; navigate to sub-pages via sidebar.
- **Key MUTATING/dangerous actions:** Save currency exchange rates (POST via "Currency Rates" modal — modifies base rates used across all financial calculations).
- **Important modals/forms:**
  - "Currency Rates" (triggered by AED button): displays all 16 currency fields pre-filled; Save button POSTs rate updates — must require confirmation since wrong rates affect all finance.
- **Variant-of:** Unique template.
- **Broken/empty:** All KPI values show 0.00 AED (test environment with no data); logo image returns 404.
- **UX improvement for the rebuild:** Replace the free-text date input for month selection with a proper month-picker control; add explicit "unsaved changes" warning in the currency-rates form since a mistake affects the entire financial module.

---

### `management-analysis-expenses` — Profits & Losses

- **Purpose:** Year-range P&L analytics page showing expected vs. actual revenue, net profit, salaries, and expenses with monthly breakdown table and two cumulative charts.
- **Key sections / flows:** Header KPI cards (Expected Net Profit, Actual Net Profit, Expected Revenue, Actual Revenue, Expected Teachers Salaries, Teachers Salaries till now, Staff Salaries, Expenses); "Financial Data Table (Monthly)" section with year-range "From/To" dropdowns (2021–2026) + Apply button; two chart sections (Cumulative Expected vs. Actual Profits/Revenues/Expenses); monthly table (12 rows × 9 columns: Month, Expected Revenue, Actual Revenue, Expected Net Profit, Actual Net Profit, Teachers Salaries, Staff Salaries, Expenses, Total Expenses); "Profit and Losses invoices" tab.
- **Key SAFE actions:** Filter by year range (GET); view charts and table; navigate tabs.
- **Key MUTATING/dangerous actions:** None beyond global chrome.
- **Important modals/forms:** None meaningful (only global chrome modals).
- **Variant-of:** Unique template.
- **Broken/empty:** All values EUR 0.00 except expected teacher salaries (EUR 540.00), actual teacher salaries (EUR 997.00), staff salaries (EUR 9,333.00) — some seeded data present but most fields empty; logo 404.
- **UX improvement for the rebuild:** Add a chart toggle to switch between "Expected vs. Actual" overlaid on one chart rather than two separate sections; make the year-range dropdowns a connected date-range component that prevents "To < From" selection.

---

### `management-expense` — Expenses

- **Purpose:** CRUD list of all income/outcome expense transactions categorised by "head", showing a filterable table and supporting add/edit per-entry.
- **Key sections / flows:** "Add Expenses" action button; "Heads" navigation link; table with columns: #, Name of Income or Outcome, Value, Currency, Description, Date, Reason, Name of Executor, Transaction Type, Actions; filters for head_id, user_id, is_income (income/outcome), currency, month.
- **Key SAFE actions:** Filter by head, user, income/outcome type, currency, month; navigate to Heads page.
- **Key MUTATING/dangerous actions:** Add Expenses (POST /management/expense — creates a new expense record); Edit Expense ("Expense Edit" modal — PUT); actions column likely contains delete (inferred from pattern in other pages, not explicitly listed for this page).
- **Important modals/forms:**
  - "Expense Details" (triggered by "Add Expenses"): fields — head_id (select), user_id (select), is_income (Income/Outcome toggle), description (textarea), reason (textarea), amount (number), currency (select), date (text); POST to /management/expense.
  - "Expense Edit": same field set but method override PUT to /management/expense/{id}.
- **Variant-of:** Unique template.
- **Broken/empty:** Table shows "No Expenses Added" — test environment empty; logo 404.
- **UX improvement for the rebuild:** Separate the "Transaction Type" filter into a prominent toggle (Income / Outcome / All) directly above the table rather than burying it in a select; add inline row-level edit instead of a full-screen modal for simple fields like amount and date.

---

### `management-payout-providers` — Payout Providers

- **Purpose:** Listing page for external payout gateway integrations (Paymob, Payoneer), showing their configuration status and providing a link to each provider's settings page.
- **Key sections / flows:** Table (5 cols: Method, Mode, Active, Webhook URL, Actions); rows for Paymob (sandbox, Inactive, webhook URL) and Payoneer (sandbox, Inactive, webhook URL); "Configure" link per row navigates to the provider-specific edit page.
- **Key SAFE actions:** View provider list; click "Configure" to navigate to edit page.
- **Key MUTATING/dangerous actions:** None on this page itself; mutations happen on the edit sub-pages.
- **Important modals/forms:** None meaningful.
- **Variant-of:** Unique template.
- **Broken/empty:** Both providers shown as "sandbox / Inactive" — not yet configured; logo 404.
- **UX improvement for the rebuild:** Add a visual active/inactive toggle badge (colour-coded: green/grey) directly in the table with an inline confirmation rather than requiring navigation to the edit form to toggle activation status.

---

### `management-payout-providers-6-edit` — Payoneer Payout Provider Edit

- **Purpose:** Settings/configuration form for the Payoneer payout gateway — sets mode (sandbox/live), activation toggle, and API credentials.
- **Key sections / flows:** Webhook URL display with copy instruction; form fields: Mode (required, Sandbox/Live select), Active (checkbox), key1 (Username/Login), key2 (API password/Key), key3 (Program ID); Back navigation link; Save button (PUT /management/payout-providers/6).
- **Key SAFE actions:** Copy webhook URL; navigate Back.
- **Key MUTATING/dangerous actions:** Save (PUT) — updates gateway credentials and live/sandbox mode; switching to "Live" mode with wrong credentials could break teacher payouts.
- **Important modals/forms:** No modal; single inline form.
- **Variant-of:** Variant of `management-payout-providers-7-edit` (same template, different provider ID and slightly different credential fields).
- **Broken/empty:** None; form loaded correctly.
- **UX improvement for the rebuild:** Mask credential inputs by default (show/hide toggle); add a "Test connection" button that pings the provider API with saved credentials before allowing live-mode activation.

---

### `management-payout-providers-7-edit` — Paymob Payout Provider Edit

- **Purpose:** Settings/configuration form for the Paymob payout gateway — sets mode, activation, and OAuth2 credentials (Client ID, Client Secret, Username, Password).
- **Key sections / flows:** Webhook URL display; form fields: Mode (required), Active (checkbox), key1 (Client ID), key2 (Client Secret), key3 (Username), key4 (Password — password input type); note clarifying these are different from Paymob Accept (checkout) credentials; Save button (PUT /management/payout-providers/7).
- **Key SAFE actions:** Copy webhook URL; navigate Back.
- **Key MUTATING/dangerous actions:** Save (PUT) — updates OAuth2 credentials and mode; notably key4 is password type (correct), but keys 1–3 are plain text inputs for sensitive values.
- **Important modals/forms:** No modal; single inline form.
- **Variant-of:** Variant of `management-payout-providers-6-edit` (same template, provider 7 — Paymob — has one extra field: key4/password).
- **Broken/empty:** None.
- **UX improvement for the rebuild:** All four credential fields should use password-type inputs with a reveal toggle; add inline validation to prevent saving an empty required credential when mode is switched to "Live".

---

### `management-payouts` — Payouts (Current Month View)

- **Purpose:** Admin approval and monitoring dashboard for teacher payout requests, scoped to the current month by default, with status-breakdown KPIs and bulk-approval capability.
- **Key sections / flows:** Page title "Payouts June 2026"; KPI cards: Pending approval (count + EUR total), Pending, Successful, Failed, Rejected, Returned; Filter panel (accordion) with Month select, Year input, Status select, Filter/Reset buttons; payouts table (cols: checkbox, #, Teacher, Amount, Method, Status, Month, Requested at, Actions); bulk "Approve selected (N)" button that POSTs to /management/payouts/approve.
- **Key SAFE actions:** Filter by month/year/status (GET form); view payout statuses.
- **Key MUTATING/dangerous actions:** "Approve selected (N)" (bulk POST to /management/payouts/approve) — triggers actual payout execution to teachers; must require explicit confirmation with count and total amount displayed.
- **Important modals/forms:** Filter form (GET — safe); bulk-approve form (POST — dangerous, no confirmation modal observed).
- **Variant-of:** Unique template (base); `management-payouts-all-1` is a query-param variant.
- **Broken/empty:** Table shows "No data found"; all KPI counts 0 — empty test data.
- **UX improvement for the rebuild:** The bulk "Approve selected" action must open a confirmation dialog showing the selected teacher names, amounts, and total before submitting; add per-row status colour coding (e.g. green=Successful, orange=Pending, red=Failed/Rejected).

---

### `management-payouts-all-1` — Payouts (All-Time View)

- **Purpose:** Same payouts management page as `management-payouts` but with `?all=1` query parameter removing the month scope to show all historical payouts.
- **Key sections / flows:** Identical to `management-payouts` except the heading reads "Payouts" (no month qualifier) and all-time data is displayed; same KPI cards, filter panel, table, and bulk-approve form.
- **Key SAFE actions:** Same as base page; filter still works.
- **Key MUTATING/dangerous actions:** Same "Approve selected" bulk POST — equally dangerous without confirmation.
- **Important modals/forms:** Same as base.
- **Variant-of:** `management-payouts` (query-param variant: `?all=1` removes month scope filter).
- **Broken/empty:** All empty — no payout data in test environment.
- **UX improvement for the rebuild:** The `all=1` scope toggle should be an explicit "View All / View This Month" toggle button in the UI rather than a raw query param — makes it discoverable and avoids confusion.

---

### `management-salaries` — Teachers Salaries

- **Purpose:** Monthly teacher salary management — generates salary calculations from session attendance data, displays a per-teacher salary breakdown table, supports download/export, and allows bulk payout requests.
- **Key sections / flows:** KPI cards: Attended (hours), Student Absent, Teacher Absent, Fixed salary count, Fine/Gift (+/-), Total EUR; Filter accordion (month/year selectors + Download + Export + Delete buttons); salary table (15 cols: #, Teacher Name, Cash Number, Fixed, plus, minus, Fine, Gift, Hour Rate, Total, Total EUR, Salary Type, Status, Actions); "Generate Salary" button opens a modal; "Request payouts (N)" bulk-POST to /management/payouts; summary row showing Fixed/Fine/Bonus/Total hours/Total EUR; a secondary 7-row table showing a salary slip template (Name, Hours, Hour Rate, Phone, Trials, Total Salary, Fixed, Absence Fines, Fine, Notes, Total Hours, Total Fines, Net Salary, Gift, Paid).
- **Key SAFE actions:** Filter by month/year; Download (salary slip PDF); Export (likely CSV); view per-teacher detail modal.
- **Key MUTATING/dangerous actions:** "Generate Salary" (POST /management/salaries — creates salary records for selected teachers and month, with checkbox to select all teachers); "Request payouts (N)" (bulk POST to /management/payouts — submits payout requests for selected teachers); Delete (deletes salary records for the selected month — irreversible).
- **Important modals/forms:**
  - "Salary Month" (Generate Salary trigger): fields — month (select, Dec 2025–Dec 2026), date_range (text, MM-DD-YYYY), generateteacher (checkbox "teachers salary"), allteachers (checkbox "Select All Teachers"), teachers[] (individual teacher checkboxes, currently 1 teacher listed in Arabic).
  - "Teacher Salary" (row detail): read-only view of Attended/Absent/Trials breakdown per teacher; Close only.
  - "Salary" (individual slip): shows full salary calculation with Download PDF option.
- **Variant-of:** Unique template.
- **Broken/empty:** Table shows placeholder data (0s, no actual rows of real salary data); logo 404.
- **UX improvement for the rebuild:** The "Generate Salary" modal should show a preview/summary of what will be calculated before committing (e.g. "Will generate salaries for N teachers for Month X covering Y sessions"); separate the destructive "Delete" button visually from "Download" and "Export" with spacing and colour differentiation.

---

### `management-staff-salaries` — Staff Salaries

- **Purpose:** Monthly salary management for non-teaching staff — generates fixed salary records, displays a per-staff member table with fine/gift/total columns, and supports deletion of salary records.
- **Key sections / flows:** No KPI summary cards (unlike teacher salaries); Filter accordion (month/year selectors + Delete button); salary table (9 cols: #, Name, Cash Number, Fine, Gift, Total, Total EUR, Status, Actions); "Generate Salary" button opens modal.
- **Key SAFE actions:** Filter by month/year; view table.
- **Key MUTATING/dangerous actions:** "Generate Salary" (POST /management/staff-salaries — creates salary records for selected staff members and month); Delete (removes salary records — irreversible); row-level Actions (likely edit/delete per row).
- **Important modals/forms:**
  - "Generate salaries" (Generate Salary trigger): fields — date_range (MM-DD-YYYY), month (select), generatestaff (checkbox "Staff Salary"), allstaff (checkbox "Select All Staff"), staff_members[] (3 staff listed: Owner, Eslam Essam, mohamed).
- **Variant-of:** Unique template (parallel to `management-salaries` but for staff, not teachers; no attendance-based calculation — simpler fixed structure).
- **Broken/empty:** Table shows 0.00 values and "No data found"; logo 404.
- **UX improvement for the rebuild:** Add KPI summary cards (matching teacher salaries page) showing total staff salary cost, total fines, net payout for the selected month; the "Delete" button in the filter bar should only activate when a month is selected and should require a confirmation modal explicitly naming the month being deleted.

---

## Module synthesis (this batch)

### What this module does and its core entities
This batch covers the **Wallet / Finance** module's core operational pages: financial reporting/analytics (Accounting dashboard, Profits & Losses), operational expense tracking (Expenses), outbound payment infrastructure (Payout Providers configuration), teacher/staff payout workflow (Payouts), and payroll generation (Teacher Salaries, Staff Salaries). Core entities: expenses, payout providers, payout requests, teacher salary records, staff salary records, currency rates, monthly financial aggregates.

### Distinct page templates vs variant count
- **Unique templates (8):** management-accounting, management-analysis-expenses, management-expense, management-payout-providers, management-payout-providers-7-edit (base for provider edit), management-payouts (base payout list), management-salaries, management-staff-salaries.
- **Variants (2):** management-payout-providers-6-edit (variant of provider-7-edit template, same structure, provider 6 = Payoneer with 3 credential fields vs 4 for Paymob); management-payouts-all-1 (query-param `?all=1` variant of management-payouts, removes month scope).

### Cross-cutting interactions and dangerous ones
- **Filter accordion** (collapsible panel with month/year selects + submit) — appears on salaries, staff-salaries, payouts pages — safe but inconsistently implemented across pages.
- **Generate Salary modal** (identical pattern on both salaries and staff-salaries) — **dangerous**: creates salary records; needs preview step.
- **Bulk Approve** (payouts) — **most dangerous**: triggers actual financial disbursements via POST to /management/payouts/approve with no observed confirmation dialog.
- **Delete salary records** — **dangerous**: appears in filter bar on both salary pages without row-level scoping; must target a full month's data.
- **Currency Rates modal** (accounting) — **dangerous**: wrong rate changes affect all financial calculations globally.
- **Expense Add/Edit modals** — mutating but scoped to single record; relatively safe if form-validated.
- **Payout Provider Save** (provider edit forms) — **operationally dangerous**: switching to Live mode with wrong credentials could break all teacher payouts.

### Improvements for the new platform
1. **Confirmation dialogs on all financial mutations**: "Approve selected", "Generate Salary", "Delete salary month", and "Save currency rates" must each show a confirmation step with a human-readable summary (who, what month, total amount).
2. **Credential security on payout provider forms**: all API key/secret/password fields must default to masked input with reveal-toggle; add a "Test connection" action before live-mode activation is allowed.
3. **Accounting dashboard**: replace the free-text date picker with a proper month/year picker; add trend indicators (up/down arrow + delta %) on each KPI card comparing to prior period.
4. **P&L analytics (analysis-expenses)**: merge the two cumulative charts into one togglable chart; make the year-range selector a connected component that validates From ≤ To.
5. **Salaries pages**: add KPI summary row to staff-salaries (matching teacher-salaries); "Generate Salary" modal should show a preview of records to be created before committing; "Download" and "Export" must be visually separated from "Delete".
6. **Payouts list**: add per-row status colour badges (green/orange/red/grey); make the all-time vs. current-month scope toggle a visible UI control, not a raw query param.
7. **Payout providers list**: add inline Active/Inactive toggle with confirmation instead of navigating to the edit page just to flip a flag.
8. **RTL-first**: all currency values (AED/EUR) must be laid out correctly in RTL context; consider placing currency symbol to the right when language is Arabic.
9. **Empty states**: every table in this batch shows "No data found" or zeros — the rebuild must include meaningful empty states with contextual guidance (e.g. "No salary records for June 2026 — click Generate Salary to create them").
10. **Mobile**: salary tables (15 cols on teacher salaries) are not mobile-friendly; rebuild needs a card/row-expand pattern for narrow viewports.
11. **Accessibility**: filter accordions must use `aria-expanded`; bulk-approve and generate-salary forms need accessible label associations on all checkbox lists.

### Items needing owner/backend confirmation
- Whether "Approve selected" on payouts immediately triggers external API calls to Paymob/Payoneer, or just marks records as approved for a batch job — affects required confirmation UX.
- Whether deleting salary records also reverses any associated payout requests, or if those must be cancelled separately.
- The "Request payouts (N)" flow on teacher salaries — unclear if this creates payout records automatically or just flags them for admin review on the Payouts page.
- Currency rate scope: are rates per-academy or global? Saving rates in the modal on the Accounting page has wide financial impact that needs clarification.
- Paymob/Payoneer webhook URLs are hardcoded to the current domain — confirm these are environment-aware in the new frontend build.

---
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

---
# Batch 29 — teacher · Classes / Sessions + Salary Reports

---

### `teacher-course-history-1-class` — Class History (Trial class detail)

- **Purpose:** Shows the course history detail view for a specific trial class session, scoped to a single course enrollment (course ID 1).
- **Key sections / flows:** Single card "Class History Trial" — displays teacher name, student name, scheduled datetime, course name, class remark, notes, class summary, homework, and teacher/student file attachments. A "Details" link opens a modal with fuller session info.
- **Key SAFE actions:** View Details modal (read-only), navigate sidebar, view notifications.
- **Key MUTATING/dangerous actions:** None specific to session data on this page — the only mutating controls are global chrome (Add Shortcuts / Save shortcuts form); no session-edit or cancel button present on this page.
- **Important modals/forms:** Modal "Details" — read-only preview of session record (Close only). Global "Add shortcuts" modal (title + link fields, Save).
- **Variant-of:** Base template: `teacher-course-history-[id]-class` — this is the "Trial" status variant of the class history detail view, parameterized by course ID in the URL.
- **Broken/empty:** No 404/500 or empty-state signals; page loaded 200. Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all teacher pages.
- **UX improvement for the rebuild:** The detail card shows all fields inline with `--` as null values; replace null dashes with labeled empty states (e.g., "No summary provided") and add clear section separators. The "Details" modal duplicates most of the card — consolidate into an expandable card or slide-over panel instead.

---

### `teacher-course-history-2-class` — Class History (Sessions — Admin-cancelled class detail)

- **Purpose:** Shows the course history detail view for a regular (non-trial) session class, displaying an auto-cancelled session with a system-generated cancellation note.
- **Key sections / flows:** Single card "Class History Sessions" — fields identical to the Trial variant (teacher, student, datetime, course name, remark, note, summary, homework, file attachments). Status badge is "Admin Cancel" rather than "Trial/Waiting". The note field contains an important auto-cancel explanation: "This Session Has Been Automatically Cancelled, Because Neither Teacher Nor Student Attended It And It Stayed Pending."
- **Key SAFE actions:** View Details modal, sidebar navigation, notifications.
- **Key MUTATING/dangerous actions:** Same as above — none session-specific; only global Add Shortcuts.
- **Important modals/forms:** Modal "Details" (read-only, Close only). Global "Add shortcuts" modal.
- **Variant-of:** `teacher-course-history-[id]-class` — same template as the Trial variant above; difference is the session type ("Sessions" vs. "Trial") and status badge ("Admin Cancel" vs. "Waiting"). Both are variants of one base detail template.
- **Broken/empty:** Page returned 200; no empty state. Logo 404 persists.
- **UX improvement for the rebuild:** Auto-cancel reason is buried in the plain-text "Note" field. In the rebuild, surface auto-cancellation as a prominent status banner with an icon and reason code, distinct from user-entered notes, so teachers immediately understand why a session disappeared.

---

### `teacher-salary-class-report` — Salary Class Report (filter/search entry)

- **Purpose:** Entry page for a teacher's salary breakdown by class; lets the teacher filter by date range and group-by dimension (Student or Date or Session) before viewing results via a GET submit.
- **Key sections / flows:** One card "Salary Class Report" containing: a date-range picker (`date_range`, MM-DD-YYYY format), a "Group By" select (options: Student, Date, Session), and a Submit button that GETs `/teacher/update-result` with the chosen params. No results table is visible on the initial load — the page is a filter entry point only.
- **Key SAFE actions:** Set date range, choose group-by, submit filter (GET — read-only query), view notifications.
- **Key MUTATING/dangerous actions:** None from a data perspective — the Submit fires a GET. The only mutating global chrome is Add Shortcuts / Save.
- **Important modals/forms:** Form 2 (`/teacher/update-result`, GET): fields `date_range` (text, flatpickr range) + `filter` select (group-by). Global "Add shortcuts" modal.
- **Variant-of:** Unique template — no other salary-class-report filter page found in prior batches.
- **Broken/empty:** 200 OK; no results visible because no filter has been submitted yet. Logo 404 persists.
- **UX improvement for the rebuild:** The filter form uses a plain text input for date range (`MM-DD-YYYY`) rather than a proper date-range picker component. In the rebuild, use a native date-range picker with presets (This Month, Last Month, Custom) and show a result table inline below the filter rather than requiring a full page reload.

---

### `teacher-session-class-room-mq-2` — Session Classroom (Live Room — teacher daily dashboard)

- **Purpose:** The teacher's live session room / daily schedule hub: shows real-time salary KPIs, a date-filtered table of today's classes with per-row actions (View history, Enter Again, End class, Send Reminder), and multiple in-context modals for end-of-class workflow, cancellation requests, absence recording, and rescheduling.
- **Key sections / flows:**
  - **KPI strip:** Total Hours (04:30), Remaining Hours (04:30), Teacher name, Taken Hours (00:00), Attended Percentage (0%), Your Salary card with breakdown: Estimated 1,537.00 EGP / Fines 1,003.00 / Bonus 2,000.00 / Salary till today 997.00 EGP. Salary card links to `/teacher/update-result` (the salary class report).
  - **Today's Classes table (7 columns):** #, Class Time, Student Name, Course Name (with duration and fine info), Class Status (Trial/Waiting badges), History (View link → course history), Action row-buttons (Enter Again, End class, Send Reminder).
  - **Date search form (GET):** date + month + year inputs; searches by date to filter the session table.
- **Key SAFE actions:** View (→ course history), Enter Again (re-enter classroom link), date search/filter, view salary summary, navigate sidebar.
- **Key MUTATING/dangerous actions:**
  - **End class (Submit form → `/teacher/classes-end`):** posts remark (required select), summary (required textarea), homework (required textarea), notes, file attachments, class_id. Finalizes the class record.
  - **Send (cancel request → `/` POST `cancel_form__request`):** posts cancel/reschedule request with class_id, family_id, type (Reschedule or Auto Make-up), new date/time.
  - **Mark class as absent (Submit form → `/teacher/classes-absent`):** posts class_id, optional video upload (max 10 MB), notes. Records teacher/student absence.
  - **Edit Class (Save changes → `/teacher/edit-class`):** posts session_id, parent_id, teacher_id, new date/time, duration, optional "Send Notification" checkbox. Reschedules an existing session.
- **Important modals/forms:**
  - Modal "End class": remark (Excellent/Very Good/Good/Acceptable/Needs Improvement — required), summary (required), homework (required), notes, file upload. Submit → `/teacher/classes-end`. Dangerous — finalizes session permanently.
  - Modal "Request Cancel": radio type (Reschedule Class / Auto Make-up), new date+time picker, Send → POST. Dangerous — triggers cancel/reschedule workflow.
  - Modal "Mark class as absent": video upload + notes, Submit → `/teacher/classes-absent`. Dangerous — marks absence on record.
  - Modal "Edit Class": date/time picker, duration select, Send Notification checkbox, Save changes → `/teacher/edit-class`. Dangerous — modifies existing session schedule.
- **Variant-of:** Unique template — the core teacher live/daily session room; the URL contains a base64 `MQ==` (decodes to "1") + `/2` which appear to be encoded course/student identifiers. No equivalent template seen in prior batches.
- **Broken/empty:** 200 OK; one session row shown. Logo 404 persists. The "Taken Hours" shows 00:00 and "Attended Percentage" is 0% — likely accurate for this test session state, not a data error.
- **UX improvement for the rebuild:** The "End class" modal requires three mandatory fields (remark, summary, homework) with no autosave or draft state — if the teacher closes the modal accidentally they lose input. In the rebuild, persist draft state in `localStorage` or via an autosave API call while the modal is open, and add a confirmation guard before closing if any field is filled.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the teacher-facing session lifecycle: the live classroom room (daily schedule + real-time salary KPIs), the post-session course history detail (both Trial and regular Sessions types), and the salary-by-class report filter. Core entities: Session/Class (with status: Trial, Waiting, Admin Cancel), Teacher, Student, Course (with duration and fine metadata), Salary (estimated, fines, bonus, actual).

**Distinct page templates vs variant count:**
- 2 unique templates: `teacher-session-class-room-[id]` (live room dashboard) and `teacher-salary-class-report` (filter entry).
- 1 base detail template with 2 variants: `teacher-course-history-[id]-class` — one for Trial status, one for Sessions/Admin-Cancel status. Both share identical DOM structure; only the session type label and status badge differ.
- Total pages: 4 (2 unique + 2 variants).

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Dangerous modals (must require confirmation in rebuild): End class (finalizes session — remark/summary/homework required), Request Cancel (triggers admin workflow), Mark as Absent (records absence), Edit Class (modifies schedule).
- Safe modals: Details (read-only), Add Shortcuts (global chrome).
- Date/month/year filter on session room is GET-based (safe).
- Salary report filter is GET-based (safe).
- The "Send Reminder" action in the session table row has no modal captured — backend behavior unclear; needs confirmation whether it immediately sends a notification or opens a confirm step.

**Improvements for the new platform:**

1. **Session room layout:** Consolidate the date-search form and KPI strip into a sticky top bar; the current layout scatters them. On mobile, collapse the KPI strip into a swipeable summary card.
2. **Status color system:** "Trial", "Waiting", "Admin Cancel" need distinct semantic colors (e.g., info/blue, warning/amber, error/red) — currently appear as plain badges. Apply RTL-compatible status pill components.
3. **End class modal — draft persistence:** Add autosave to `localStorage` or a draft API endpoint so mandatory fields (remark, summary, homework) survive accidental modal close.
4. **Course history detail — null display:** Replace `--` null values with styled empty-state placeholders. Merge the redundant "Details" modal into an expandable inline section.
5. **Auto-cancel reason surfacing:** Auto-cancel system messages are buried in the free-text "Note" field; rebuild should use a dedicated `cancellation_reason` field displayed as a banner with icon and structured reason code.
6. **Salary report filter:** Replace the plain text date range input with a date-range picker component with preset shortcuts (This Month / Last Month). Show results inline without full page reload.
7. **RTL-first:** All four pages are LTR-only. Arabic content appears inline (teacher/student names in Arabic script) but layout doesn't flip. Rebuild must apply RTL layout for Arabic locale — especially tables, modal CTAs, and the KPI strip.
8. **Accessibility:** 6 modals on the session room page have no confirmed focus trapping or ARIA roles. Rebuild must implement `role="dialog"`, `aria-modal`, `aria-labelledby`, and Escape-to-close on all modals.
9. **Export:** Salary class report has no export action visible. Add CSV/PDF export on filtered results.
10. **Send Reminder action:** Unclear if this immediately sends a message or opens a confirm dialog. Needs backend confirmation — must not fire silently in the rebuild.

**Anything that needs owner/backend confirmation:**
- What does "Send Reminder" do exactly — immediate send or confirm step? Should it be gated behind a confirmation modal in the rebuild.
- The URL segment `MQ==` is base64 for "1" — confirm whether the session room route should use encoded IDs or plain numeric IDs in the new API design.
- "Auto Make-up Class" cancel type appends a new session at the end of a course — confirm business rule and who approves it (teacher alone, or requires admin sign-off).
- Fine amounts (3.00 Fine shown in course name field) appear embedded in the course name string — confirm whether this is a proper API field or a text concatenation hack that should be a separate `fine` attribute in the new data model.

---
# Batch 30 — Teacher · Content / Materials / Library

### `teacher-library` — Teacher Library  (HTTP 200)

- Purpose: Browsable content/materials library for teachers, organized by category with search and filter capability.
- Key sections / flows: Single hero-style heading "Education and talents All in one place." with an "All Categories" filter dropdown. Category filter renders options including at least "All Categories" and "اللغه العربيه" (Arabic subject). Content items appear as image-rich cards with "New" and badge-count indicators (e.g., "5 new"). Interactions confirm a category dropdown expands inline on the same URL without navigating away.
- Key SAFE actions: Browse/view library items; search by keyword via the search form (GET, query param `query`); filter by category via `filter` select; view notifications; navigate sidebar links.
- Key MUTATING/dangerous actions: "See All Notifications" (submit button — could persist read-state); "Save" in Add Shortcuts modal (POSTs to `/teacher/shortcuts`); logout form (POST to `/teacher/logout`).
- Important modals/forms: **Add Shortcuts modal** — fields: `shortcut_title` (text, placeholder "Title"), `shortcut_link` (text, pre-filled with current page URL); submits POST to `/teacher/shortcuts`. Skip global chrome (logout form, notification panel).
- Variant-of: unique template
- Broken/empty: Logo image returns 404 (`/storage/uploads/logo.png`). No "No data" state captured, but page appears to load live content (2 XHR/fetch calls observed). No error state documented.
- UX improvement for the rebuild: Replace the flat category select dropdown with a persistent left-panel or top chip-bar of category filters; this gives teachers a faster scan-and-click pattern and makes the active filter visually obvious, especially important when the library grows to many subjects. Also add a loading skeleton and a proper empty state when no items match a search.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The Teacher Library is a read-oriented content browser where teachers discover and access educational materials grouped by subject/category. Core entities: library items (cards with images, "New" badge, numerical counts), categories (subject tags), and the search/filter controls. The shortcuts modal is a cross-cutting global feature rather than library-specific logic.

- **Distinct page templates vs variant count:** 1 unique template (`teacher-library`). No URL-level variants were discovered in this batch (the category filter interaction stays on the same URL without navigation).

- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
  - Category dropdown (safe — client-side filter, same URL)
  - Search form (safe — GET with `query` and `filter` params)
  - Add Shortcuts modal (mutating — POSTs to `/teacher/shortcuts`; must not be auto-fired)
  - Notification panel / "See All Notifications" button (potentially mutating — marks notifications read)
  - Logout forms (mutating — session-terminating; three instances in DOM)

- **Improvements for the new platform:**
  - **Filter UX:** Migrate from a single `<select>` dropdown to a visible chip/tab row for category filtering; improves discoverability and mobile tap targets.
  - **RTL-first:** The existing page is LTR-only despite Arabic content appearing in the category list (اللغه العربيه). The rebuild must wrap all text containers with RTL-aware utilities and ensure card layouts flip correctly.
  - **Empty/loading/error states:** No skeleton or empty state captured. Add shimmer loading cards (2 API calls are made on load) and a "No items found" illustration with a clear CTA.
  - **"New" badge semantics:** The badge design ("New", "5 new") should use accessible `aria-label` and a consistent badge color system across the platform (avoid relying on color alone).
  - **Logo 404:** Backend must confirm correct logo upload path (`/storage/uploads/logo.png` is broken); the rebuild's asset pipeline should fail-fast with a placeholder rather than a broken image.
  - **Shortcuts feature:** The "Add shortcut" flow is a global affordance bolted onto every teacher page. For the rebuild, consider a dedicated "My Shortcuts" widget in the sidebar or user profile area rather than a floating modal on every page.
  - **Mobile layout:** 33 images on a card-grid page requires a responsive image grid with lazy loading. Current design not optimized for small screens.
  - **Accessibility:** Modals need focus trap and `role="dialog"` with `aria-labelledby`. The search form's `query` input lacks a visible `<label>`.

- **Anything that needs owner/backend confirmation:**
  - What categories and item types exist in the full library? Is there pagination or infinite scroll for large libraries?
  - Does filtering by category hit the server (API call) or is it client-side? The two XHR calls need mapping to confirm endpoint shape.
  - Is "See All Notifications" read-marking server-side? If so, it must never be triggered automatically in the new frontend.
  - Confirm the intended behavior of "View all notifications" link pointing to `/teacher/monthly-plans` — this looks like a misconfigured link (notifications redirecting to monthly plans page).

---
# Batch 31 — teacher · Dashboard / Home

---

### `management-home` — Home  (effective HTTP 200, entry via 302 redirect from /management/home → /teacher/home)

- Purpose: Teacher's main dashboard landing page, accessible via both `/management/home` (redirects) and `/teacher/home`; displays a personal summary widget and today's scheduled classes table with inline session actions.
- Key sections / flows:
  - **Personal summary card** — Teacher name, total hours (04:30), remaining hours (04:30), taken hours (00:00), attended percentage (0%), current salary (997.00 EGP), estimated earnings (1,537.00), fines (1,003.00), bonus (2,000.00); salary card links to `/teacher/update-result` filtered by current month.
  - **Today's Classes table** — 7 columns: #, Class Time, Student Name, Course Name (with duration + fine badge), Class Status, History (View link → `/teacher/course-history/{id}`), Action (Enter Again, End class, Send Reminder, Running). Date-picker filter (date + month + year) drives the table via GET search.
  - **Notification bell** — shows "5 new" badge; "View all notifications" links to `/teacher/monthly-plans`.
  - **Sidebar nav** — Home, Chat, Schedule, Students, Library, Tasks (badge "New"), monthly reports, Salaries, Salary Class Report, Log Out; language switcher (9 locales).
- Key SAFE actions: View course history, Enter Again (re-enter classroom link), date-filter search, navigate sidebar, view notifications, language switch.
- Key MUTATING/dangerous actions:
  - **End class** (Submit modal → POST `/teacher/classes-end`) — records remark, summary, homework, notes, file upload; must NOT be auto-fired.
  - **Send (Request Cancel)** (POST via `cancel_form__request`) — requests cancellation or reschedule/make-up; must NOT be auto-fired.
  - **Mark class as absent** (Submit → POST `/teacher/classes-absent`) — marks student absent with optional video + notes; must NOT be auto-fired.
  - **Save changes (Edit Class)** (POST `/teacher/edit-class`) — reschedules a session, optionally sends notification; must NOT be auto-fired.
  - **Save (Add shortcuts)** (POST `/teacher/shortcuts`) — adds a personal shortcut tile; must NOT be auto-fired.
- Important modals/forms:
  - **End class modal** — fields: remark (select: Excellent/Very Good/Good/Acceptable/Needs Improvement, required), summary (textarea, required), homework (textarea, required), notes (text, optional), images[] (file upload, optional). Triggered by "End class" row button. Posts to `/teacher/classes-end`.
  - **Request Cancel modal** — radio choice: Reschedule Class vs. Auto Make-up Class (appends session to end of course); date+time picker for new slot. Posts to `cancel_form__request` (action URL blank — uses current page with JS intercept).
  - **Mark class as absent modal** — video upload (≤10 MB) + notes textarea. Posts to `/teacher/classes-absent`.
  - **Edit Class modal** — new date+time picker, Send Notification checkbox, duration select (required). Posts to `/teacher/edit-class`.
- Variant-of: Same rendered page as `teacher-home`; `management-home` slug exists because `/management/home` 302-redirects to `/teacher/home`. Both page reports are identical in structure, content, forms, buttons, and DOM counts — they represent a single underlying template.
- Broken/empty: Logo image returns 404 (`/storage/uploads/logo.png`). Initial `/management/home` request returns 302 (expected redirect, not a broken page). Actual page renders at 200. Today's classes table shows only 1 row (live data snapshot, not a "no data" empty state).
- UX improvement for the rebuild: The salary card mixes three financial figures (estimated, fines, bonus) in a single dense text block with no visual hierarchy; split into distinct labeled metric chips or a mini-table so teachers can scan their compensation breakdown at a glance without following a link.

---

### `teacher-home` — Teacher Home  (HTTP 200)

- Purpose: Canonical teacher dashboard at `/teacher/home` — identical content and behavior to `management-home` (which redirects here); serves as the true entry point for the teacher role.
- Key sections / flows: Identical to `management-home` — personal summary card, Today's Classes date-filtered table, notification bell, full sidebar nav. No structural or content difference detected between the two captured snapshots.
- Key SAFE actions: Same as `management-home` — date filter search, View (course history), Enter Again (classroom re-entry), sidebar navigation, language switch.
- Key MUTATING/dangerous actions: Same set — End class, Request Cancel/Send, Mark as absent, Edit Class, Add shortcuts (Save). All POST to the same endpoints as documented above.
- Important modals/forms: Identical 6 modals/forms as `management-home` — End class, Request Cancel, Mark as absent, Edit Class, Add shortcuts, and one unnamed Modal 1 (no content captured, likely a notification dropdown).
- Variant-of: `management-home` (both render the same template; `management-home` is a redirect alias).
- Broken/empty: Same 404 on logo; same single-row live table snapshot. No true empty/error state captured.
- UX improvement for the rebuild: The "End class" workflow requires three mandatory free-text fields (summary, homework, remark) submitted in a single modal; for mobile teachers, break this into a stepped form (step 1: remark + attendance, step 2: summary + homework, step 3: notes + upload) to reduce cognitive load and accidental submission of empty fields.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Teacher Home dashboard is the primary operational screen for the teacher role. Core entities: Teacher (with salary/hours KPIs), Class Session (scheduled slot with status, course, student), Course History, and Shortcuts. The page is the hub from which a teacher monitors today's workload, takes session-level actions (start, end, reschedule, cancel, mark absent), and tracks their compensation in real time.

**Distinct page templates vs variant count:**
- Unique templates: **1** (the teacher home dashboard)
- Variant pages: **1** (`management-home` is a redirect alias to the same template; counted as a variant, not a distinct template)
- Total pages in batch: 2

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Date-picker filter (GET, safe) — drives Today's Classes table
- 5 modal flows, 4 of which are mutating/dangerous:
  - End class (POST /teacher/classes-end) — DANGEROUS: finalizes a session with remark + content
  - Request Cancel (POST, blank action with JS) — DANGEROUS: cancels or reschedules a session
  - Mark as absent (POST /teacher/classes-absent) — DANGEROUS: records student absence
  - Edit Class (POST /teacher/edit-class) — DANGEROUS: reschedules time/duration, may trigger notifications
  - Add shortcuts (POST /teacher/shortcuts) — mutating but low-stakes
- Notification dropdown (Modal 1) — safe/read-only

**Improvements for the new platform:**

1. **Route clarity**: Eliminate the `/management/home` → `/teacher/home` redirect; a single canonical route avoids confusion and crawl duplication.
2. **Salary card redesign**: Break estimated/fines/bonus into distinct metric chips with color coding (green for bonus, red for fines) and expose them without requiring a link navigation.
3. **Session action safety**: "End class", "Mark as absent", and "Request Cancel" are irreversible or operationally significant — add a confirmation step (SweetAlert-style confirm or a two-step review before POST) in the new UI.
4. **End class stepped modal**: Convert the single-screen 3-required-field modal into a multi-step wizard, especially for mobile teachers.
5. **Edit Class notification opt-in**: The "Send Notification" checkbox in Edit Class is easy to miss; make it an explicit toggle with a preview of the message to be sent.
6. **Empty/loading states**: No "no classes today" empty state was captured; the rebuild must define an illustrated empty state and a skeleton loader for the table.
7. **RTL-first**: The teacher's name (`المعلم محمد صادق صادق`) is Arabic but the page is LTR; the rebuild should support RTL layout at the user level, not just at the locale/lang level — particularly important for Arabic-speaking teachers.
8. **Logo 404**: A broken logo image is displayed on every page; the rebuild asset pipeline must validate and serve a real logo.
9. **Mobile**: The 7-column table (with multiple action buttons per row) collapses poorly on small screens; replace with an expandable row-card pattern on mobile.
10. **Date filter UX**: The current filter requires manual date text + month select + year number — replace with a single unified date-range picker component.
11. **Accessibility**: Multiple modals lack ARIA `role="dialog"`, focus traps, and `aria-labelledby`; rebuild must enforce accessible modal patterns throughout.

**Anything that needs owner/backend confirmation:**

- The `cancel_form__request` form has a blank `action` attribute — it relies on JS to intercept and POST; backend team should confirm the actual endpoint and whether CSRF is correctly handled.
- "Auto Make-up Class" option appends a session to the end of the course — confirm whether this is backend-automated or requires admin approval.
- Salary figures show a large discrepancy between estimated (1,537), actual (997), fines (1,003), and bonus (2,000) — confirm the calculation logic for the rebuild's compensation display.
- Modal 1 content was not captured; confirm what it renders (likely a notifications list).

---
# Batch 32 — teacher · General / Error Pages + Profile

---

### `main-index-html` — "Opps!!!" 404 Error Page  (HTTP 302 → redirect loop → 200 on /teacher/home, served as 404 content)

- Purpose: Generic not-found error page rendered when `/main/index.html` is visited directly; the URL is a crawler artifact of following a sidebar link that resolves to a non-existent route.
- Key sections / flows: Single H1 "Opps!!!" + H4 "This page you are looking for could not be found." + one "Go Back to Home" navigation link. No data, no tables, no forms.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: Shares identical DOM structure, design tokens, and button set with `teacher-main-index-html` and `teacher-course-history-main-index-html` and `teacher-monthly-plans-main-index-html` — all are the same 404 error template triggered by crawler-generated `main/index.html` suffixes
- Broken/empty: YES — 404 content page. Also: logo image returns HTTP 404 (`/storage/uploads/logo.png`). Network log shows redirect chain: `/management/home` → `/login` → `/teacher/home` (200), indicating the crawler resolved auth but then tried the static `.html` path which doesn't exist.
- UX improvement for the rebuild: Implement a proper branded error state with a meaningful back-link pointing to the teacher's actual home dashboard (not `/login`), and include a short explanation so teachers understand why they landed here rather than a cryptic "Opps!!!" heading.

---

### `teacher-course-history-main-index-html` — "Opps!!!" 404 Error Page (Course History variant)

- Purpose: Same 404 error page as above, triggered when the crawler followed a sidebar link from `/teacher/course-history/1/class` and appended `/main/index.html`, which does not exist.
- Key sections / flows: Identical to `main-index-html` — H1 "Opps!!!", H4 not-found message, single navigation link.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: `main-index-html` (same 404 error template; different originating URL only)
- Broken/empty: YES — 404 content page. Logo 404 present. Redirect chain identical.
- UX improvement for the rebuild: Same as above — replace with a contextual error that redirects to `/teacher/course-history` rather than `/login`, preserving teacher navigation context.

---

### `teacher-main-index-html` — "Opps!!!" 404 Error Page (Teacher-scoped variant)

- Purpose: Same 404 error page, triggered from `/teacher/course-history/1` sidebar link resolving to `/teacher/main/index.html` which does not exist.
- Key sections / flows: Identical DOM — H1, H4, one link.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: `main-index-html` (same 404 error template)
- Broken/empty: YES — 404 content page. Logo 404 present.
- UX improvement for the rebuild: Contextual back-link to `/teacher/home` instead of `/login`.

---

### `teacher-monthly-plans-main-index-html` — "Opps!!!" 404 Error Page (Monthly Plans variant)

- Purpose: Same 404 error page, triggered when the crawler followed a sidebar link from `/teacher/monthly-plans/mq==/show` and resolved to `/teacher/monthly-plans/main/index.html`, a non-existent route.
- Key sections / flows: Identical DOM — H1 "Opps!!!", H4 not-found, one "Go Back to Home" link.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None
- Important modals/forms: None
- Variant-of: `main-index-html` (same 404 error template)
- Broken/empty: YES — 404 content page. Logo 404 present. Base64-encoded plan ID in the originating URL (`mq==`) suggests plan IDs are base64-encoded in this system.
- UX improvement for the rebuild: Contextual back-link to `/teacher/monthly-plans` and surfacing a "plan not found" message when a plan ID resolves to nothing, rather than a generic 404.

---

### `teacher-profile` — Teacher Profile (error state)

- Purpose: The teacher's own profile page; captured in a broken/error state ("Something went wrong, try again later") rather than showing actual profile data.
- Key sections / flows: Only an H4 error message "Something went wrong, try again later" and a single "Go Back to Home" navigation link are rendered. No profile fields, no form, no avatar, no personal data visible in this capture.
- Key SAFE actions: "Go Back to Home" (navigates to `/login`)
- Key MUTATING/dangerous actions: None visible in this error state
- Important modals/forms: None (not rendered in error state)
- Variant-of: unique template (conceptually distinct from the 404 pages — this is a 500/server-error state for a real functional page)
- Broken/empty: YES — error state with "Something went wrong, try again later". Logo also 404. Redirect chain: `/management/home` → `/login` → `/teacher/home` (200), but then the profile API call failed. DOM structure uses `rect`/`circle` SVG elements indicating a skeleton/loading illustration rather than the 404 icon, confirming this is a different error component from the not-found pages.
- UX improvement for the rebuild: Design a dedicated profile error state with retry capability and a meaningful explanation (e.g., network issue vs. auth issue vs. data missing). The actual profile page (when healthy) should expose editable fields for name, contact, avatar, subject/grade assignments — confirm required fields with backend.

---

## Module synthesis (this batch)

**What this module covers and its core entities:**
This batch contains only teacher-role pages, and all 5 were captured in broken states. Four are identical "Opps!!!" 404 error pages produced by the crawler following sidebar/navigation links that contain `main/index.html` path suffixes — these routes do not exist on the server. The fifth (`teacher-profile`) is a real functional page captured in a server error state (500-class), rendering a different error illustration (SVG with circles/rects = skeleton/broken state graphic) rather than an "Opps!!!" 404 heading.

**Distinct page templates vs variant count:**
- 1 unique template: `teacher-profile` (real page, server error state — unique SVG error graphic, distinct heading copy)
- 1 shared 404 error template instantiated in 4 variants: `main-index-html`, `teacher-course-history-main-index-html`, `teacher-main-index-html`, `teacher-monthly-plans-main-index-html` — DOM byte-for-byte identical, only originating URL differs
- Total: 2 distinct templates, 4 variant pages

**Cross-cutting observations:**
- All 5 pages share the same redirect chain at network level: `/management/home` (302) → `/login` (302) → `/teacher/home` (200), meaning the crawler's teacher session correctly resolved auth but could not access the intended sub-routes
- Logo asset (`/storage/uploads/logo.png`) is broken (HTTP 404) across every page in this batch — a systemic asset issue affecting all teacher pages
- The "Go Back to Home" link on the 404 error pages points to `/login` (not `/teacher/home`) — a UX flaw that would log teachers out instead of returning them to their dashboard
- No mutating actions are present in any page in this batch (all error states)
- The monthly-plans originating URL uses base64-encoded IDs (`mq==` in the path) — the rebuild must handle base64 plan IDs or replace with numeric/UUID routing

**Improvements for the new platform:**
1. **Error page system:** Build two distinct error components — one for not-found routes (404) and one for server errors (500/503) — both with role-aware back-links (teacher → `/teacher/home`, not `/login`)
2. **Asset management:** Fix the broken logo asset pipeline; use a CDN-hosted or build-time logo with fallback
3. **Teacher profile:** When healthy, this page likely includes personal info, subject/grade assignments, and possibly a password-change form — design with a two-panel layout (read view + edit mode) and a dedicated error/retry state
4. **Monthly plans URL scheme:** Confirm with backend whether base64-encoded plan IDs are intentional; if so, the rebuild router must decode them; prefer UUID or numeric slugs for cleaner URLs
5. **Sidebar link integrity:** The four 404s were all triggered by sidebar navigation — the rebuild should validate sidebar links at runtime and suppress or grey-out links that resolve to non-existent routes

**Items needing owner/backend confirmation:**
- What fields does the teacher profile expose and which are editable (name, phone, email, avatar, subjects, grades, bio)?
- Are base64-encoded IDs (`mq==`) intentional for monthly plan routes, or a legacy artifact?
- Why does the profile page throw a server error during crawler capture — is it a session/auth restriction or a backend bug?
- What content should the teacher-scoped `main/index.html` routes have served (course history index, monthly plans index) — are these planned but unbuilt pages?

---
# Batch 33 — teacher · Chat / Messaging

---

### `teacher-chat` — Teacher Chat  (HTTP 200)

- **Purpose:** Real-time group and direct messaging hub for teachers, supporting multi-conversation chat with group and contact management.
- **Key sections / flows:**
  - Left panel: contact/conversation list with "Search Contact" input and "New alerts" badge; conversations listed with participant name, role label (Teacher), message count badge (0), and last message timestamp (e.g. "Wednesday").
  - Right panel (main): Opens selected conversation thread; shows "Loading more …" pagination for history; "Open chat from the list" placeholder when no conversation is selected.
  - Chat thread header: shows group/contact name, action icons (file preview, group settings).
  - Group Settings panel (modal/drawer): sections — "About Chat", "Members", "Leave Group" link.
  - Chats modal (Modal 3): Shows "New alerts" section with a contact list ("abdo ahmed", Teacher role); triggered by a UI control in the conversation panel.
  - File Preview: overlay on top of chat for attachment viewing.
- **Key SAFE actions:** Search contacts (GET form), browse conversation list, view chat history (with "Loading more…" infinite scroll), view group members list, view file preview, navigate sidebar links.
- **Key MUTATING/dangerous actions:**
  - Send message (submit button — could post to a chat endpoint, not explicitly named but inferred from the XHR call and submit button on form).
  - Leave Group ("Leave Group" link/button inside Group Settings modal — destructive, removes teacher from a group permanently).
  - Save (Add Shortcuts form — POSTs to `/teacher/shortcuts`; title + link fields).
  - See All Notifications (submit button — could trigger a state change or mark-read).
- **Important modals/forms:**
  - **Group Settings (Modal 2):** Shows chat metadata (About, Members list), contains "Leave Group" action — must require confirm dialog before executing.
  - **Chats / New Alerts (Modal 3):** Contact picker or notification inbox with conversation list; fields serialized as `[object Object]` (likely a search input or filters).
  - **Add Shortcuts (Modal 4):** Fields: `shortcut_title` (text, placeholder "Title"), `shortcut_link` (text, placeholder URL). POSTs to `/teacher/shortcuts`. Low risk but is a persistent mutating save.
  - **Message send form (Form 2/3/4):** Three near-identical GET forms with "Search Contact" placeholder — likely three rendering states (mobile, desktop, modal variant) of the same contact search. The actual message send appears to be via a separate XHR/fetch (1 captured), not a traditional form submission.
- **Variant-of:** Unique template — this is the sole chat page for the teacher role.
- **Broken/empty:**
  - Logo image returns HTTP 404 (`/storage/uploads/logo.png`).
  - Empty state present: "Open chat from the list" shown in right panel when no thread is selected — functional but visually plain.
  - "Loading more …" indicator visible in captured card content — chat history pagination works but no spinner/skeleton captured.
- **UX improvement for the rebuild:** The "Leave Group" action is embedded in the same Group Settings panel alongside benign member/about info, with no confirmation guard. In the rebuild, move "Leave Group" out to a dedicated danger zone section with a SweetAlert2-style confirm modal ("Are you sure you want to leave this group?"), requiring explicit acknowledgment before the action fires.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The `teacher-chat` page is the teacher-role messaging centre. Core entities: Conversations (group chats and direct messages), Contacts (teachers and possibly students/staff), Messages (paginated history, with file attachments), Groups (with membership management). Secondary entity: Shortcuts (personal quick-links saved to the sidebar).

**Distinct page templates vs variant count:**
- Unique templates: **1** (`teacher-chat`)
- Variants: **0** (single page; the three duplicate "Search Contact" forms are rendering artifacts of the same template, not separate routes)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Group Settings modal: opens in-page panel — contains "Leave Group" (DANGEROUS — no confirm guard observed).
- Chats/New Alerts modal: notification inbox with conversation picker (safe read-only browsing).
- File Preview overlay: safe, view-only attachment viewer.
- Contact search (3x GET forms): safe filter, no mutation.
- Add Shortcuts modal: low-risk save action; persists a personal quick-link.
- Send message (XHR): mutating but low risk (normal chat send).

**Improvements for the new platform:**
1. **Dangerous action guard:** "Leave Group" must trigger a confirmation modal with explicit acknowledgment — never fire on a single tap/click.
2. **Empty state:** Replace the plain "Open chat from the list" text with an illustrated empty state and a call-to-action to start a conversation, improving discoverability.
3. **RTL-first layout:** The existing page is LTR (`dir=ltr`, `lang=en`). In the rebuild, the two-panel chat layout (contact list left, thread right) must mirror correctly for RTL (Arabic primary language), with all flex/grid directions, padding, and icon placements flipped.
4. **Mobile responsive:** Chat UIs should collapse into a single-panel view on small screens (contact list → tap → thread), with a back button to return to the list. The current layout appears fixed two-panel with no captured mobile breakpoint.
5. **Loading/skeleton states:** Replace "Loading more …" raw text with a proper skeleton loader for message history, and add a send-progress indicator on the message composer.
6. **Duplicate form deduplication:** The three near-identical "Search Contact" forms suggest the template renders the contact search component multiple times (possibly sidebar + header + modal). The rebuild should share a single composable component for contact search, rendered once per context.
7. **Notification badge integration:** "New alerts" / "5 new" badges in the conversation list should integrate with the global notification system (not maintain a separate counter).
8. **Accessibility:** Chat message list needs `aria-live="polite"` region for incoming messages; modals need focus trap and `role=dialog`; "Leave Group" needs `aria-describedby` pointing to consequence text.
9. **Logo 404:** Fix the missing logo asset (`/storage/uploads/logo.png`) — this breaks brand identity across all teacher pages.

**Anything that needs owner/backend confirmation:**
- The actual message-send API endpoint is not explicitly captured (only 1 XHR noted without a URL in the excerpt). Backend team should confirm the WebSocket vs. polling vs. REST approach for real-time chat before rebuilding the frontend messaging layer.
- "Leave Group" — confirm whether this is reversible (can a teacher be re-added?) to correctly calibrate the severity of the confirmation warning.
- The "Chats / New Alerts" modal fields serialized as `[object Object]` — the backend schema for the notification/alert inbox needs clarification.

---
# Batch 34 — teacher · Profile / Account

### `teacher-profile-edit` — Teacher Profile Edit

- **Purpose:** Allows a teacher to update their personal profile information (name, email, avatar) and change their account password from a single settings page.
- **Key sections / flows:** Two card panels side-by-side — (1) "First Name" card: avatar upload/reset + first name, last name, email fields; (2) "Change Password" card: old password, new password, confirm password fields. Both cards have independent "Save changes" submit buttons. Header notification bell shows "5 new" badge and a "New" tag.
- **Key SAFE actions:** View profile fields, Reset avatar preview (client-side reset button), View all notifications (navigation link to monthly-plans), Close modals, language switcher, sidebar navigation.
- **Key MUTATING/dangerous actions:** "Save changes" (profile form — POST `/teacher/profile-edit`), "Save changes" (password form — POST `/teacher/update-teacher-password`), "Save" (shortcut form — POST `/teacher/shortcuts`), "Add shortcuts" (opens shortcut creation modal), logout (POST `/teacher/logout`).
- **Important modals/forms:**
  - Modal 2 "Add shortcuts": Title field + Link field; submit saves a sidebar shortcut entry. Key fields: `shortcut_title` (text), `shortcut_link` (URL text). Dangerous — saves persistent navigation shortcuts.
  - Form 2 (profile): `onlineImage` (hidden URL), `image` (file upload, JPG/GIF/PNG ≤1MB), `first_name`, `last_name`, `email`. No client-side required validation flagged.
  - Form 3 (password): `old_password`, `new_password`, `confirm_password`. No required attributes set — backend must validate.
- **Variant-of:** unique template
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`). Initial page load redirects through `/management/home` → `/login` → `/teacher/home` before landing (302 chain), suggesting auth session handling. No page-level 404/500. One empty Modal 1 captured (no content/fields recorded — likely a notification or generic confirmation dialog not fully populated during crawl).
- **UX improvement for the rebuild:** Split the page into two clearly labelled, independently scrollable sections (or tabs: "Personal Info" / "Security") with inline validation and visible required-field markers. The password form lacks `required` attributes and any visible strength indicator — add both. Avatar upload should show a live preview before save. The "Add shortcuts" modal is buried in the global header chrome; consider moving shortcut management to a dedicated preferences section.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single page covers the teacher's self-service account management — identity data (name, email, avatar) and credentials (password change). Secondary functionality adds personal navigation shortcuts. Core entities: Teacher profile record, teacher credentials, sidebar shortcuts.

**Distinct page templates vs variant count:**
- 1 unique template (`teacher-profile-edit`)
- 0 variant pages

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- "Add shortcuts" modal (POST to `/teacher/shortcuts`) — mutating; persists sidebar entries.
- "Save changes" (profile) — mutating; updates PII.
- "Save changes" (password) — mutating and security-sensitive; requires old-password verification.
- Notification dropdown (header) — safe read-only view.
- Language switcher — safe, GET-based locale change.

**Improvements for the new platform:**
1. **Tabs / sections:** Replace the flat two-card layout with named tabs ("Personal Info", "Security") to reduce visual clutter and allow independent save flows without confusion.
2. **Form validation:** Add `required` on all password fields client-side; enforce password strength rules with a visible meter; confirm-password match validation before submit.
3. **Avatar upload UX:** Live crop/preview before committing the upload; explicit file-size error if >1MB.
4. **Dangerous action confirmation:** Password change should show a confirmation step or success/failure toast (SweetAlert2 is already loaded — use it consistently for all mutating outcomes).
5. **RTL-first:** Page is LTR only; the new build must flip layout direction when Arabic/Urdu/Persian locale is active — form labels, avatar positioning, and card stacking all need RTL mirrors.
6. **Shortcuts modal:** Move shortcut management out of the profile-edit page into a dedicated "Preferences" section or a persistent sidebar management drawer; its current placement is discoverable only via a header button.
7. **Logo 404:** Replace hardcoded `/storage/uploads/logo.png` with a configurable, fallback-safe logo asset reference.
8. **Accessibility:** Add ARIA labels to password inputs (placeholders are bullet characters only), use `role=dialog` + focus trap on modals, and ensure avatar `<input type=file>` has an accessible label.

**Anything that needs owner/backend confirmation:**
- Whether `onlineImage` (text URL) and `image` (file upload) are mutually exclusive or merged server-side — the rebuild needs to know which takes precedence.
- Password change endpoint (`/teacher/update-teacher-password`) — confirm whether the old password is validated server-side before accepting a change (not visible from the crawl).
- The empty Modal 1 — confirm what it is (possibly a confirmation dialog or notification detail view); needs content spec before rebuilding.
- Logo upload mechanism — is there a separate admin-side upload, or is the 404 a data gap on this environment?

---
# Batch 35 — teacher · Students / Salary Class Report

---

### `management-student-1` — Student 1 (teacher-context redirect)

- **Purpose:** Teacher's home dashboard for a specific student (ID=1), showing today's scheduled classes, teacher KPIs (total hours, salary, fines, bonus), and inline class management actions.
- **Key sections / flows:** KPI strip (Total Hours 04:30, Remaining Hours 04:30, Taken Hours 00:00, Attended % 0%, Salary till today 997.00 EGP, Estimated 1,537.00, Fines 1,003.00, Bonus 2,000.00); "Today's Classes" table with date-picker filter (date / month / year); 1-row table showing class at 04:00 AM with student محمد احمد, course "arabic Duration (30)m (3.00 Fine)", status "Trial Waiting"; row actions: View (history), Enter Again (classroom link), End class, Send Reminder, Running toggle.
- **Key SAFE actions:** View course history (`/teacher/course-history/1`), Enter Again classroom (`/teacher/session-class-room/MQ==/2`), date/month/year search filter (GET), view notifications.
- **Key MUTATING/dangerous actions:** End class (POST `/teacher/classes-end` — remark + summary + homework + notes + images); Mark class as absent (POST `/teacher/classes-absent` — video + notes); Request Cancel/Reschedule (POST `cancel_form__request` — reschedule or auto-makeup with new date/time); Edit Class (POST `/teacher/edit-class` — new date, time, duration, send notification toggle); Send Reminder (submit form — mutating).
- **Important modals/forms:**
  - *Request Cancel* — radio choice: Reschedule Class vs Auto Make-up Class (adds session to end of course); fields: date, month, year, time (hour, minute). Key choice: auto-makeup silently extends course length.
  - *End class* — remark (required select: Excellent/Very Good/Good/Acceptable/Needs Improvement), summary (required textarea), homework (required textarea), notes (optional), file upload (images[]). POST to `/teacher/classes-end`.
  - *Mark class as absent* — video upload (≤10MB), notes. POST to `/teacher/classes-absent`.
  - *Edit Class* — new date/time, duration select (required), optional "Send Notification" checkbox. POST to `/teacher/edit-class`.
- **Variant-of:** This URL (`/management/student/1`) redirects to `/teacher/home` (HTTP 302 observed in network log), then renders the teacher home with student context. It is a navigation/redirect variant of the teacher home dashboard, not a standalone unique template.
- **Broken/empty:** Logo image 404 (`/storage/uploads/logo.png`). Class table has 1 row (low data but not empty). No other broken states.
- **UX improvement for the rebuild:** The "End class" modal bundles remark, summary, homework, and file upload into one dense form with no auto-save; split into a stepper (Step 1: remark + summary; Step 2: homework; Step 3: notes/files) with a confirmation step before final submission, preventing accidental empty submissions.

---

### `teacher-students` — Monthly Reports (Student List)

- **Purpose:** Teacher-facing list of their assigned students, intended as the entry point for submitting monthly progress reports per student per course.
- **Key sections / flows:** Single card "List of Students" containing a 4-column table (#, Student Name, Country, Report For Student). Table showed 0 rows at capture time (empty state). Modal for "Send Report" (monthly progress form) accessible per student row. Modal for "Student Timetable" (view-only).
- **Key SAFE actions:** View student timetable (modal, read-only), view notifications.
- **Key MUTATING/dangerous actions:** Send Report (POST `/teacher/student-progress`) — submits monthly progress evaluation for a student/course; Submit button.
- **Important modals/forms:**
  - *Send Report* — month selector (Jan–Dec 2026), achievements textarea, learning_progress radio (Excellent/Very Good/Good/Very Slow Progress), focus radio (Always/Often/Sometimes/Rarely), homework_completion radio (same scale), punctuality radio (same scale), rescheduled_sessions radio (None/1/2/More than 2), additional_support textarea, learning_objectives textarea. Hidden: student_id, course_id, teacher_id, course_name, action. This is a comprehensive monthly rubric.
  - *Student Timetable* — view-only modal, no fields, just "Close".
- **Variant-of:** Unique template — this is the monthly reports list, separate from `teacher-studentslist` (which is the full student management view).
- **Broken/empty:** Table has 0 rows — page shows empty state with no students loaded (likely data issue at capture time, not a true broken page). Logo 404.
- **UX improvement for the rebuild:** The table is entirely empty at capture with no empty-state illustration or CTA; add a contextual empty state ("No students assigned yet — contact your coordinator") and pre-fill the Send Report modal with the previous month's data as a draft so teachers don't re-enter repeated fields.

---

### `teacher-studentslist` — Students List (Full Management View)

- **Purpose:** Teacher's primary student roster page showing all assigned students with per-row actions: view course history, view schedule, submit monthly report, view learning plans, and request a completion certificate.
- **Key sections / flows:** Single card "List of Students" with 9-column table (#, Student Name, Country, Course Name, History, Schedule, Report For Student, all plans, certificate); 1 row captured (محمد احمد, country VUT, course arabic); row actions: View (course history), Show (timetable modal), Monthly Report (Send Report modal), View (all plans `/teacher/monthly-plans/MQ==/show`), Request Certificate.
- **Key SAFE actions:** View course history (`/teacher/teacher-history/1`), Show timetable (modal), View all plans (`/teacher/monthly-plans/MQ==/show`), view notifications.
- **Key MUTATING/dangerous actions:** Monthly Report submit (POST `/teacher/student-progress` — same rubric form as teacher-students); Request Certificate (POST `/teacher/certificate-request` — description required, date required; sends to management for approval).
- **Important modals/forms:**
  - *Student Timetable* — triggered by "Show"; view-only, just Close.
  - *Send Report* — same 24-field monthly progress rubric as teacher-students (month, achievements, learning_progress, focus, homework_completion, punctuality, rescheduled_sessions, additional_support, learning_objectives + hidden IDs).
  - *Request Certificate* — fields: Student Name (read-only), Course Name (read-only), Description (required textarea), Date (required, YYYY-MM-DD). Note: "This request will be sent to management for approval and template selection." POST to `/teacher/certificate-request`.
- **Variant-of:** Unique template — richer than `teacher-students`; adds course column, plans column, and certificate column. The two pages serve overlapping but distinct purposes (this is the roster/management view; teacher-students is the monthly-report-specific list).
- **Broken/empty:** No broken states; 1 student row present. Logo 404.
- **UX improvement for the rebuild:** The 9-column table is cramped; use a card-per-student layout on mobile and collapse secondary actions (all plans, certificate) into a row-action menu (kebab/ellipsis) to reduce horizontal overflow and make "Monthly Report" and "History" the primary CTAs.

---

### `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student` — Salary Class Report (By Student, June 2026)

- **Purpose:** Teacher's salary breakdown report filtered by date range and grouped by student, showing session counts and calculated earnings across multiple session-type and cancel-type columns.
- **Key sections / flows:** Filter card "Salary Class Report" with Date Range input (flatpickr, MM-DD-YYYY), Group By selector (Student / Date / Session), Submit. Results card "Report By Student 2026-06-01 - 2026-06-30" with a 23-column table: #, Student Name, Pending, Attended, Absent, Cancel, Paid Duration, Price, session, Trial, Student-cancel, Teacher-cancel, Student-reschedule, Teacher-reschedule, Normal, Custom (×2), Normal, Custom (×2), Absent, Total, Paid, Paid if continue, Free. 3 rows: 1 data row (محمد احمد: 4 pending sessions 04:00h, all others 0), 1 blank separator, 1 Total row. Student name is a link to `/management/student/1`.
- **Key SAFE actions:** Filter/resubmit (GET `/teacher/update-result` with date_range + filter params), click student name to navigate to student detail.
- **Key MUTATING/dangerous actions:** None beyond the global shortcuts Save (POST `/teacher/shortcuts`). The report Submit is a GET filter, not a data mutation.
- **Important modals/forms:**
  - *Filter form* — date_range text (MM-DD-YYYY range picker), filter select (Student/Date/Session). GET form — safe.
  - No other meaningful modals; only the global Add Shortcuts modal.
- **Variant-of:** This is a query-param variant of the base template `/teacher/update-result` (or `/teacher/salary-class-report`), filtered by `date_range=2026-06-01+to+2026-06-30&filter=student`. The base template is `teacher-update-result` / `teacher-salary-class-report`.
- **Broken/empty:** No broken states. 23-column table is extremely wide and likely overflows horizontally on most screens. Only 1 student in results (low data).
- **UX improvement for the rebuild:** The 23-column salary breakdown table is unreadable without horizontal scrolling; group related columns under collapsible column groups (Sessions: Pending/Attended/Absent/Cancel; Cancellations: Student/Teacher by type; Earnings: Normal/Custom/Total/Paid/Free) with sticky first column (Student Name) and a print/export-to-CSV action.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the teacher-role Students module (student roster, monthly progress reports, certificate requests) and the Salary Class Report (earnings breakdown by student/date/session). Core entities: Student (name, country, course enrollment), Session/Class (scheduled time, status, duration, fine), MonthlyReport (rubric with 5 rating dimensions), Certificate Request (managed by admin), SalaryReport (session counts × pay rates across Normal/Custom/Trial/Absent categories).

**Distinct page templates vs variant count:**
- 3 unique templates:
  1. `teacher-studentslist` — full student roster with multi-action row menu
  2. `teacher-students` — monthly-report-focused student list (subset of columns)
  3. `teacher-update-result` (salary class report) — date-range + group-by report
- 1 variant page:
  - `management-student-1` — redirects to teacher home and loads student-1 context (302 redirect variant of teacher home, not a standalone template)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- *Send Report* modal (POST `/teacher/student-progress`): appears identically on both `teacher-students` and `teacher-studentslist` — 24-field rubric with no draft/save; DANGEROUS (irreversible submission, no confirm step).
- *End class* modal (POST `/teacher/classes-end`): remark + summary + homework required; DANGEROUS — once submitted, class is marked as ended.
- *Mark class as absent* modal (POST `/teacher/classes-absent`): video upload; DANGEROUS — marks student absent.
- *Request Cancel / Reschedule* modal: DANGEROUS — "Auto Make-up" silently extends the course; needs clear explanation and confirmation.
- *Edit Class* modal (POST `/teacher/edit-class`): rescheduling an existing session; DANGEROUS — changes student-visible schedule; "Send Notification" checkbox controls whether family is alerted.
- *Request Certificate* modal (POST `/teacher/certificate-request`): initiates admin workflow; moderate risk.
- *Student Timetable* modal: safe, view-only.
- Salary report filter: safe GET form.

**Improvements for the new platform:**
1. **Navigation clarity:** Two near-identical sidebar entries ("Students" → studentslist, "monthly reports" → students) confuse the purpose; merge into one "Students" section with sub-tabs: Roster | Monthly Reports | Certificates.
2. **Empty states:** `teacher-students` captured 0 rows with no visual feedback; every list page needs an illustrated empty state with context ("No students assigned to you yet").
3. **Dangerous action confirmation:** End class, Mark Absent, Auto Make-up, and Cancel forms must show a confirmation dialog with a summary of what will change before POST fires.
4. **Salary table UX:** 23-column table must be rebuilt with column groups, sticky left column, and horizontal scroll locked to the report area only; add CSV/PDF export.
5. **Monthly report form UX:** The 24-field Send Report modal is too dense for a modal; present it as a full-page form or a multi-step side-panel with progress indicator; add auto-save/draft.
6. **RTL support:** All 4 pages are LTR/EN only; Arabic student names (محمد احمد) appear frequently, meaning the real user base is Arabic-speaking; rebuild must be RTL-first with bi-directional layout.
7. **Mobile teacher experience:** The 9-column student table and 23-column salary table are unusable on mobile; both need responsive card layouts for small screens.
8. **Logo 404:** `/storage/uploads/logo.png` returns 404 on all pages; fix asset path or provide fallback in the new frontend.
9. **Class row actions:** The action cell on the today's-classes table bundles "View / Enter Again / End class / Send Reminder / Running" as inline text; replace with a clear primary CTA (Enter/End depending on status) and secondary actions in a kebab menu.
10. **Status color system:** Class statuses (Trial Waiting, Attended, Absent, Cancel) need a consistent semantic color palette (not just text labels) across all pages for rapid scan.

**Anything that needs owner/backend confirmation:**
- What does "Auto Make-up Class" do exactly to the course end date and billing? The UI description is vague ("adds new session in end of course") — needs backend clarification before rebuild.
- Are MonthlyReport submissions editable after submission, or are they locked? The current UI has no edit path.
- Certificate request workflow: what states exist after submission (pending/approved/rejected)? No status display observed on the student list.
- The salary table column headers repeat "Student" and "Teacher" twice for both cancel and reschedule sub-types — the exact mapping of the 23 columns to backend pay-rule categories needs API schema confirmation.
- `management-student/1` redirecting to `/teacher/home` suggests the `/management/` prefix is an admin namespace; confirm whether teacher role should ever land on `/management/` routes or if all links should be rewritten to `/teacher/` in the rebuild.

---
# Batch 36 — Teacher · Course History / Monthly Plans / Teacher History

---

### `teacher-course-history-1` — Course History (Student Detail View)

- **Purpose:** Shows the class history list for a specific student (by student ID), scoped to courses taught by the logged-in teacher; entry point is `/teacher/course-history/1`.
- **Key sections / flows:** Single H5 card "Classes History Details of [student name]"; a 3-column table (Class Date & Time, Teacher Name, Show) with 2 sample rows showing status badges (Waiting, Admin Cancel) and duration (30m, 60m); a "View" link in header that navigates to the teacher-history view; per-row "Class History" links navigating to `/teacher/course-history/{id}/class`; "Show Details" buttons open a Student Details modal (tabbed: Class Remark, Class Summary, Homework Note, Files, Teacher, Student).
- **Key SAFE actions:** View (navigates to teacher-history), Class History (row-level nav link), Close modal, View all notifications (nav).
- **Key MUTATING/dangerous actions:** Show Details (POST form — opens a session detail modal; classified as submit/mutating by the crawler, but appears to be a read action that opens a modal; confirm with backend). Add shortcuts (POST `/teacher/shortcuts`), Save (shortcut form).
- **Important modals/forms:** Student Details modal — tabbed view showing class remark, class summary, homework notes, uploaded files, teacher and student info; no edit fields visible, just close. Show Details is the trigger.
- **Variant-of:** Shares identical template with `teacher-teacher-history-1` and `teacher-teacher-history-1-d861d6e` — same columns, same sample data, same modal set. The route path differs (`course-history` vs `teacher-history`) but rendered content is identical. Likely a routing alias or the same controller rendering both.
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all pages in this batch.
- **UX improvement for the rebuild:** The "Show Details" button uses a POST submit mechanism to open a read-only modal; replace with a lightweight GET-based drawer or slide-over panel with proper URL state (`?classId=X`) so the detail view is deep-linkable and shareable.

---

### `teacher-monthly-plans` — Monthly Plans (Student List)

- **Purpose:** Lists all students assigned to the teacher, providing per-student entry points to history, schedule, and monthly progress reports; the main hub for the monthly reporting workflow.
- **Key sections / flows:** H5 card "List of Students"; 8-column table (#, Student Name, Course Name, History, Schedule, Report For Student, all plans, monthly plan) with **0 rows** at capture time (empty state, no "No data" message observed in card text). Month filter (select). Modals: Student Timetable (view schedule inline), Send Report (large progress form). "View all notifications" header link resolves to this page's URL, indicating this is a notification destination.
- **Key SAFE actions:** View history, view schedule (Student Timetable modal), month filter, navigation.
- **Key MUTATING/dangerous actions:** Submit (POST `/teacher/student-progress`) — sends a monthly progress report for a student; this is the primary write action. Add shortcuts / Save.
- **Important modals/forms:**
  - **Student Timetable modal** — read-only timetable; just Close button.
  - **Send Report modal** (POST `/teacher/student-progress`) — rich form with: month select (12 months), achievements textarea, 4-point radio for learning_progress (Excellent/Very Good/Good/Very Slow), focus radio (Always/Often/Sometimes/Rarely), homework_completion radio, punctuality radio, rescheduled_sessions radio (None/1/2/More than 2), additional_support textarea, learning_objectives textarea (upcoming plan). Hidden: student_id, course_id, teacher_id, course_name, action. Submit fires the report creation/update.
- **Variant-of:** Unique template — the only page in this batch that hosts the full Send Report form and the student-list table (with 8 columns).
- **Broken/empty:** Table has 0 rows at capture — no explicit empty-state UI text visible in the card; the card text simply shows headers with no data message. Logo 404.
- **UX improvement for the rebuild:** The Send Report form is entirely within a modal with 20+ fields and multiple radio groups — this is too heavy for a modal. Rebuild as a dedicated full-page wizard or side-sheet with step indicators (Step 1: Month & Overview, Step 2: Behavioral ratings, Step 3: Objectives & Support), with autosave drafts and a confirmation step before submit. Also add an explicit empty-state illustration when no students are assigned.

---

### `teacher-monthly-plans-mq-show` — Monthly Plans Detail (Report List for Student)

- **Purpose:** Shows all submitted monthly progress reports for a specific student (ID encoded as Base64 `MQ==` = `1` in the URL), with columns for Month, Parent name, Student Name, Course Name, and View/Approve actions.
- **Key sections / flows:** H4 card "Total Report"; 7-column table (#, Month, Parent name, Student Name, Course Name, View, Approve) with **0 rows** — card text says "No reports found". Month filter. Same Send Report modal and Student Timetable modal as `teacher-monthly-plans` (identical form structure). Approve column is present but no rows to act on.
- **Key SAFE actions:** View report (per-row), month filter, Student Timetable modal (read), navigation.
- **Key MUTATING/dangerous actions:** Submit (POST `/teacher/student-progress`) — same report submission form. Approve action (column present but no data to confirm behavior). Add shortcuts / Save.
- **Important modals/forms:** Same as `teacher-monthly-plans`: Student Timetable (Close only) + Send Report (full 20+ field POST form). Approve column action behavior not confirmed by crawler — needs backend clarification.
- **Variant-of:** Variant of `teacher-monthly-plans` — same chrome, same forms, same modals. Differs in: (a) URL scoped to a specific student ID (Base64-encoded), (b) heading changes from "List of Students" to "Total Report", (c) table columns differ (7 vs 8 cols — adds Parent name, Month; changes "all plans"/"monthly plan" to "View"/"Approve"). Counts as a scoped variant of the monthly-plans template.
- **Broken/empty:** Table shows "No reports found" — confirmed empty state text in card. Logo 404.
- **UX improvement for the rebuild:** The Approve action in the table column needs explicit confirmation UX (confirm dialog naming the month/student) — its POST behavior is unclear from the crawler data. Add a status badge column (Pending / Approved / Rejected) so teachers can scan report states at a glance, and make the View action open a read-only report preview rather than navigating away.

---

### `teacher-teacher-history-1` — Teacher History (Student Class List, trailing-dash URL)

- **Purpose:** Displays the class session history for student ID 1, accessed via the canonical teacher-history route with a trailing dash artifact (`/teacher/teacher-history/1-`); functionally identical to the clean URL variant.
- **Key sections / flows:** H5 card "Classes History Details of [student name]"; 3-column table (Class Date & Time, Teacher Name, Show) with 2 rows, same status badges (Waiting, Admin Cancel) and durations; "View" link navigates to `/teacher/teacher-history/1` (clean URL); per-row "Class History" links to `/teacher/course-history/{id}/class`; "Show Details" buttons open Student Details modal.
- **Key SAFE actions:** View (nav to clean URL), Class History (per-row nav), Close modals, notification nav.
- **Key MUTATING/dangerous actions:** Show Details (POST submit — opens modal), Add shortcuts, Save.
- **Important modals/forms:** Student Details modal (tabbed: Class Remark, Class Summary, Homework Note, Files, Teacher, Student — read-only + Close). Add shortcuts form.
- **Variant-of:** Variant of `teacher-teacher-history-1-d861d6e` — same template, same data, different URL (trailing dash `1-` vs `1`). The "View" interaction navigates from this URL to the clean URL, confirming it is a crawler artifact / redirect-miss rather than a distinct route.
- **Broken/empty:** Trailing dash in URL is likely a routing anomaly — the View link self-corrects to `/1`. Logo 404.
- **UX improvement for the rebuild:** Consolidate the trailing-dash and clean URL into a single canonical route with a proper 301 redirect; the current system silently renders both, risking duplicate entries in history and analytics.

---

### `teacher-teacher-history-1-d861d6e` — Teacher History (Student Class List, Clean URL)

- **Purpose:** Canonical teacher-history detail page for student ID 1 at `/teacher/teacher-history/1`; shows the same class list and detail modals as the trailing-dash variant.
- **Key sections / flows:** Identical to `teacher-teacher-history-1`: H5 "Classes History Details of [student]", 3-column table (2 rows, Waiting + Admin Cancel statuses), Show Details buttons, Student Details modal (tabbed), View link (inline state change — stays on same URL), Class History per-row links.
- **Key SAFE actions:** View (inline state change, same URL), Class History (nav), Close modal, notification nav.
- **Key MUTATING/dangerous actions:** Show Details (POST), Add shortcuts, Save.
- **Important modals/forms:** Student Details modal — same tabs (Class Remark, Class Summary, Homework Note, Files, Teacher, Student); read-only, Close only. The "View" interaction is classified as `inline_state_change` here (vs `navigation` in the trailing-dash variant), suggesting the clean URL may toggle an expanded row or panel rather than navigating.
- **Variant-of:** This is the base template for `teacher-teacher-history-1` (trailing dash) and shares the same template as `teacher-course-history-1`. All three render identical DOM structures with the same 3-column table and Student Details modal.
- **Broken/empty:** Logo 404.
- **UX improvement for the rebuild:** The Student Details modal contains 5+ tabs (Remark, Summary, Homework, Files, Teacher, Student) — in the rebuild, convert this to an inline expandable row or a slide-over drawer with lazy-loaded tab content; also add status chip styling to distinguish Waiting vs Admin Cancel vs Completed classes visually in the table.

---

## Module synthesis (this batch)

**What this module covers and core entities:**
This batch covers the Teacher role's student-progress and class-history tracking subsystem. Core entities: Student, Course, Class Session (with status: Waiting / Admin Cancel), Monthly Progress Report (with multi-dimensional behavioral ratings), Teacher. The subsystem has two functional clusters: (1) class-session history — browsable per-student list of scheduled/cancelled classes with a tabbed detail modal; (2) monthly progress reporting — a hub listing all teacher-assigned students with a large structured form for submitting monthly reports, plus a per-student report history view with an Approve column.

**Distinct page templates vs variant count:**
- **2 unique templates:**
  1. **Class History template** — `/teacher/course-history/{id}` and `/teacher/teacher-history/{id}` (and the trailing-dash variant): 3-column table (Date/Time, Teacher Name, Show), Student Details modal with tabs. Three pages (`teacher-course-history-1`, `teacher-teacher-history-1`, `teacher-teacher-history-1-d861d6e`) all render this same template. The course-history and teacher-history routes appear to be route aliases for the same view.
  2. **Monthly Plans template** — `/teacher/monthly-plans` (list) and `/teacher/monthly-plans/{id}/show` (per-student report history): share the same chrome, both forms (Send Report, Student Timetable modal). Two pages (`teacher-monthly-plans`, `teacher-monthly-plans-mq-show`) — the show variant adds Parent Name column and Approve action, and changes heading; counts as a scoped variant.
- **3 variant pages** (trailing-dash URL, course-history alias, monthly-plans-show scoped view)
- **2 distinct templates**

**Cross-cutting interactions and dangerous ones:**
- Add Shortcuts modal (POST `/teacher/shortcuts`) — present on all 5 pages; low-risk but a write action.
- Show Details (POST) — triggers Student Details modal; appears read-only but uses a POST form; backend should confirm if any session state is mutated.
- Send Report (POST `/teacher/student-progress`) — the most significant write action: creates/updates a monthly progress report for a student. Present in both monthly-plans pages. Must never be auto-fired; requires a multi-field confirmation flow.
- Approve action (in `teacher-monthly-plans-mq-show` table) — POST behavior unconfirmed; must not auto-fire; needs explicit confirm dialog.
- Logout (POST `/teacher/logout`) — present everywhere in sidebar/header; standard session termination.

**Improvements for the new platform:**

1. **Route consolidation:** `/teacher/course-history/{id}` and `/teacher/teacher-history/{id}` render the same content; the rebuild should unify these to one canonical route (`/teacher/students/{id}/class-history`) with a 301 for the old paths. Fix the trailing-dash routing bug.
2. **Class History table:** Add a status color-chip column (green = Completed, yellow = Waiting, red = Admin Cancel / other cancellation types) so teachers can scan at a glance. Add date-range filter and course filter.
3. **Student Details modal:** Replace the multi-tab modal with an inline expandable row or a slide-over drawer. Lazy-load each tab. Tab labels (Class Remark, Class Summary, Homework, Files, Teacher, Student) need clearer naming for non-English speakers — use RTL-aware layout when locale is Arabic.
4. **Send Report form:** Move out of a modal into a dedicated full-page or slide-over wizard with 3 steps. Add autosave draft, required-field validation with inline errors, and a preview-before-submit step. Radio groups need accessible labeling (fieldset + legend per group). Add a "copy from last month" option.
5. **Monthly Plans list empty state:** When no students are assigned, show an illustrated empty state with guidance. When data is present, add student name search/filter and course filter on the 8-column table.
6. **Monthly Plans show (report history):** Add status badges (Pending/Approved/Rejected) to each row. The Approve action needs a confirmation dialog naming the report month and student. Add a View action that opens a read-only report preview panel (not just raw data link).
7. **RTL support:** All pages captured as LTR/English but the teacher's name data contains Arabic text inline (`المعلم محمد صادق صادق`, `arabic` course label). The rebuild must handle mixed-direction content (bidi isolation for Arabic names inside LTR tables) and support full RTL layout toggle.
8. **Logo 404:** `/storage/uploads/logo.png` returns 404 across all pages — the asset is missing in the current deployment; the rebuild should use a reliable CDN path or a fallback SVG.
9. **Accessibility:** All forms lack ARIA labels and required-field markers. Radio groups in the Send Report form lack fieldset/legend wrappers. Modal focus traps are absent in the current implementation.

**Needs owner/backend confirmation:**
- Whether `/teacher/course-history/{id}` and `/teacher/teacher-history/{id}` are intentionally separate routes or a duplication error.
- Whether Show Details (POST form) mutates any server state or is purely a read action (if read-only, rebuild as a GET request to a dedicated endpoint).
- The Approve action behavior in `monthly-plans/{id}/show` — what state it sets, whether it notifies parents, whether it is reversible, and what role (teacher vs admin) can perform it.
- Whether the `action` hidden field in the student-progress form differentiates between create and update; if so, the UI should surface the distinction clearly to the teacher.

---
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

---
# Batch 38 — teacher · Wallet / Finance

### `teacher-salary` — Teacher Salary

- Purpose: Displays a teacher's salary breakdown for each period, showing session attendance metrics, fines, gifts, hourly rate, and a computed total with a status indicator.
- Key sections / flows: Single H5 "Salary" heading; one KPI card summarising the salary block; a 13-column data table (columns: #, Fixed, Attended, Student Absent, Teacher Absent, Trials Attended, Trials Student Absent, Trials Teacher Absent, Fine, Gift, Hour Rate, Total, Status). On this capture the table returned 0 rows ("No salary found" empty state).
- Key SAFE actions: View salary table; navigate via sidebar (Home, Chat, Schedule, Students, Library, Tasks, monthly reports, Salary Class Report); view notifications; language switcher; profile/settings navigation.
- Key MUTATING/dangerous actions: None that are salary-specific. Only global-chrome mutations present: "Add shortcuts" (POST /teacher/shortcuts) and the logout form (POST /teacher/logout). Neither should be auto-fired.
- Important modals/forms: "Add shortcuts" modal — two fields (shortcut_title, shortcut_link) with a Save submit; this is global chrome, not salary-specific. No salary-specific modal or form detected.
- Variant-of: unique template (no query-param or scope variants identified in this batch).
- Broken/empty: Table has 0 rows — "No salary found" empty state rendered at capture time; logo image returns 404 (`/storage/uploads/logo.png`).
- UX improvement for the rebuild: The empty state ("No salary found") gives no context — add a period selector (month/year picker) above the table so the teacher can explicitly choose a salary period, and display a clear "No salary records for [Month Year]" message with a suggested action (e.g., contact admin) rather than a bare empty table.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The Wallet / Finance module for the teacher role surfaces a single Salary page. Its core entity is a salary record per period, decomposed into fixed pay, attendance counts (regular + trial), absence penalties/gifts, hourly rate, and a computed total with a status flag. There are no mutating salary actions available to the teacher — the page is read-only.
- **Distinct page templates vs variant count:** 1 unique template (`teacher-salary`); 0 variants. This batch is a single-page batch.
- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:** Only the global "Add shortcuts" modal exists on this page — it is the sole mutating surface (POST), but it is global chrome unrelated to salary data. No salary-specific filters, tabs, date range pickers, or modals were captured; the period/month selector is absent in the current implementation.
- **Improvements for the new platform:**
  - **Period selector:** Add a prominent month/year date-range filter at the top of the salary page so teachers can navigate across pay periods without relying on the backend to pre-select a period.
  - **Empty/error state:** Replace the bare "No salary found" with a contextual empty state (selected period, explanation, admin contact CTA).
  - **Status colors:** The "Status" column should use a consistent color-coded badge system (e.g., Paid → green, Pending → amber, Disputed → red) rather than plain text.
  - **Column clarity:** Column names like "Fixed", "Attended", "Trials Attended" are terse; rebuild should include tooltip explanations for each metric.
  - **RTL-first:** The page is LTR-only; the rebuild must support RTL layout (Arabic is the first alternate language in the switcher) — table column order, number alignment, and badge placement must all flip correctly.
  - **Mobile:** A 13-column table is unusable on mobile; rebuild should collapse to a card-per-row layout or a horizontally scrollable table with frozen first column on small screens.
  - **Export:** No export (CSV/PDF) is available; teachers may need a printable salary slip — consider adding a download/print action per row or per period.
  - **Broken logo:** The 404 on `/storage/uploads/logo.png` should be resolved or a fallback asset served.
- **Anything that needs owner/backend confirmation:**
  - Confirm whether salary periods are auto-selected by the backend (and why this capture returned 0 rows) or whether a period parameter should be passed by the frontend.
  - Clarify the meaning and allowed values of the "Status" field (paid, pending, disputed, etc.) so the rebuild can map them to correct badge colors and labels.
  - Confirm whether teachers can dispute or acknowledge a salary record, or if the page is strictly read-only for teachers (vs. admin).

---
# Batch 39 — family · Classes / Live Sessions + Students

### `student-today-sessions` — Today's Sessions  (HTTP 200)

- Purpose: Shows the family/student a filterable list of today's scheduled live classes with per-session actions (cancel request, file upload).
- Key sections / flows:
  - Single H5 heading "Today's Classes" anchors the page.
  - Date-filter form (GET, date picker — MM/DD/YYYY) lets the student look up sessions on a specific date.
  - Data table (10 columns): Class Date, Class Time, Student Name, Teacher Name, Course Name, Subscription, Class Status, History, Files, (action column). Table captured with 0 rows (empty state at time of crawl).
  - Header badge showing notification count (0 New / 5 new).
  - "View all invoices" quick-link navigates to billing.
  - Two month-select filter dropdowns (appear to be secondary scope filters, possibly for the notification panel).
- Key SAFE actions: Date search (GET form), "View all invoices" navigation, Close modal buttons, "Start" voice-record toggle inside upload modal.
- Key MUTATING/dangerous actions:
  - **Request Cancel** (POST `cancel_form__request`) — submits a cancellation request with optional reschedule (class_id, teacher_id, type radio: "Reschedule Class" vs "No Reschedule", new date/time). The "No Reschedule" branch explicitly warns the student they will not get a replacement session.
  - **Upload File** (POST `/student/upload-files`) — uploads files (files[]) or a recorded audio blob (audio hidden field) for a specific session (session_id).
  - **See All Notifications** (POST form, non-GET) — likely marks notifications as read server-side.
- Important modals/forms:
  - **Modal: Request Cancel** — fields: class_id (hidden), teacher_id (hidden), type (radio: Reschedule / No Reschedule), date (text), time (text), Hour (number), Minute (number). Action empty string (submits to current URL or resolved by JS). Buttons: Close, Send.
  - **Modal: Upload File** — fields: session_id (hidden), files[] (file input), audio (hidden, for voice recording blob). Includes an in-browser voice recorder ("Start / 00:00"). Buttons: Close, Start (record), Upload.
- Variant-of: unique template (no other "today-sessions" variant observed in this batch).
- Broken/empty: Table rendered with 0 rows — no "No data" empty-state UI is described; a logo image 404s (`/storage/uploads/logo.png`), and a custom stylesheet 404s (`/assets/custom/style.css`).
- UX improvement for the rebuild: Replace the flat text date picker with a proper calendar/date-range component and add a visible empty state (illustration + message) when no sessions exist for the chosen date. The "No Reschedule" radio option carries significant consequence (permanent loss of a session) — add a dedicated confirmation step or warning callout before the Send action is enabled.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single-page batch covers the family/student "Today's Sessions" view — the primary daily touchpoint for a student to check, manage, and act on their live class schedule. Core entities: Session (class), Student, Teacher, Course, Subscription, File/Attachment, Cancellation Request.

**Distinct page templates vs variant count:**
- Unique templates: 1 (`student-today-sessions`)
- Variant pages: 0

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Date filter (GET, safe) — scopes table by date.
- Month dropdowns (safe, secondary scope filter, possibly for notification panel).
- "Request Cancel" modal — **dangerous**: irreversible if "No Reschedule" option is chosen; must have a confirmation guard in the rebuild.
- "Upload File" modal — mutating (file POST), but reversible; low danger level.
- Notifications panel open (dropdown interaction captured) — "See All Notifications" is a POST that mutates read-state.

**Improvements for the new platform:**
1. **Empty/loading states:** Table shows 0 rows with no empty-state UI — add an illustration and "No sessions today" message with a link to the weekly schedule.
2. **Dangerous action safeguard:** The "No Reschedule" cancellation path must require a separate confirmation dialog clearly stating the consequence before Send is enabled.
3. **Date picker UX:** Replace MM/DD/YYYY text input with a locale-aware calendar widget; support RTL calendar display for Arabic users.
4. **RTL-first:** The page is LTR-only; a rebuild must flip the layout, sidebar, table, and modal button order for Arabic/Urdu.
5. **File upload UX:** The upload modal mixes file upload and voice recording in a small space — split into two clearly labelled tabs or steps; show upload progress and file-size limits.
6. **Status column:** "Class Status" column in the table needs colour-coded badges (scheduled, completed, cancelled, rescheduled) rather than raw text.
7. **Mobile:** A 10-column table is unusable on mobile — collapse to card layout with expandable row for detail and action buttons.
8. **Broken assets:** Logo 404 and custom stylesheet 404 need to be resolved or removed from the template; the rebuild should not carry forward these broken references.
9. **Accessibility:** Modals need focus trap, Escape-to-close, and aria-role="dialog"; voice-record Start button needs an accessible label and live region for recording state.
10. **Notification POST:** "See All Notifications" should use a dedicated API endpoint with explicit feedback (toast), not a hidden form submit.

**Anything that needs owner/backend confirmation:**
- Confirm whether the empty table (0 rows) is a data gap or expected for the crawl date — need to see a populated state to validate all column types and row-action placements.
- Confirm the POST target for `cancel_form__request` (action attribute is empty) — is it handled by JS fetch or a traditional form redirect?
- Confirm maximum file size and permitted types for `/student/upload-files`.
- Confirm whether voice-recording upload (`audio` hidden field) sends a base64 blob or a multipart binary.

---
# Batch 40 — family · Content / Materials / Library

### `student-library` — Student Library

- Purpose: Allows a family/student portal user to browse and search the platform's content library, filtered by category.
- Key sections / flows: Hero banner with tagline ("Education, talents, and career opportunities. All in one place."), category dropdown filter ("All Categories" / "اللغه العربيه"), search input with submit, library item grid (33 images indicating material cards), notification badges ("0 New", "5 new").
- Key SAFE actions: Browse library items; search by keyword (GET form); filter by category (dropdown, GET); navigate to Billing ("View all invoices"); navigate sidebar links (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library).
- Key MUTATING/dangerous actions: "See All Notifications" button (POST submit form — could mutate notification state); Logout (POST form via sidebar/header).
- Important modals/forms: 1 modal captured via the "All Categories" dropdown interaction (category filter panel); search form (GET, fields: `query` text search + `filter` category select) — both safe, no destructive outcome. Logout form (POST) includes hidden `_token` and `id` fields — standard CSRF logout, not a content-level mutation.
- Variant-of: unique template (sole library page in family role; no other library slug found in this batch).
- Broken/empty: Logo image returns 404 (`/storage/uploads/logo.png`); custom stylesheet returns 404 (`/assets/custom/style.css`). Library content cards are present (33 images loaded), so the page itself is not empty. No server error observed.
- UX improvement for the rebuild: Replace the plain category select dropdown with a pill/chip filter row so users can see all available categories at a glance without opening a dropdown, and add an empty-state illustration + CTA when no results match the search/filter combination.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The Student Library is the content discovery surface for the family/student role. Core entities: library materials (courses, resources, or media items) organized by category. Users browse, filter by category, and search by keyword. No purchase or enrollment action is visible on this page — it is read-only discovery.
- **Distinct page templates vs variant count:** 1 unique template (`student-library`), 0 variants in this batch.
- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
  - Category filter dropdown (safe GET interaction) — opens a filter overlay; stays on same URL.
  - Keyword search (safe GET form submit).
  - "See All Notifications" button is the only flagged mutating control on the page (POST form); must never be auto-fired.
  - Logout is present in both sidebar and header (POST); standard guard needed.
- **Improvements for the new platform:**
  - **Filters:** Replace select dropdown with horizontal chip/pill category filter; support multi-select for power users.
  - **Search:** Add debounced live search to avoid a full page reload on every keystroke; surface search result count.
  - **Empty/error state:** Add a proper no-results state with illustration and "Clear filters" CTA; current capture shows no such state.
  - **Loading state:** Add skeleton cards during fetch to avoid layout shift.
  - **Mobile:** Card grid should collapse to single-column on small screens; category chips should scroll horizontally.
  - **RTL-first:** The library tagline area and category filter must mirror for Arabic sessions (currently LTR only; Arabic category already in the option list, so RTL rendering is expected).
  - **Notifications:** The "See All Notifications" button pattern (POST submit) should be replaced with a safe GET-based notification drawer; mark-as-read should be an explicit user action with optimistic update, not a side-effect of opening the panel.
  - **Broken assets:** Logo and custom stylesheet 404s should be resolved before launch; they silently degrade the branded experience.
  - **Accessibility:** Search form lacks ARIA labels on `query` and `filter` fields; modal focus trap needs implementation.
- **Anything that needs owner/backend confirmation:**
  - What data source backs the library? (CMS, uploaded files, external catalog?) — determines whether search is client-side or API-driven.
  - Is the "See All Notifications" POST marking notifications as read, or does it navigate? Confirm intended mutation before rebuild.
  - Confirm whether library materials are role-gated (family vs. teacher vs. admin) or shared across roles.

---
# Batch 41 — family · Dashboard / Home

---

### `management-home` — Home  (HTTP 302 → student/home)

- **Purpose:** Entry-point route for the family role; immediately redirects (302) to `/student/home`, so there is no distinct management home page — it is purely a redirect alias.
- **Key sections / flows:** After redirect lands on the student dashboard: greeting card with student name + hour-budget summary (Total Hours / Remaining Hours / Hours Taken, all 0 in this capture); "Today's Classes" card with a "No sessions today" empty state + Request Trial CTA + Show More link; "Your Teachers" card showing an empty teachers table ("No Teachers"); notification badge in header (0 New, 5 new counts visible).
- **Key SAFE actions:** "View all invoices" → `/student/billing`; "Request Trial" → `/student/request-trial`; "Show More" → `/student/today-sessions`; sidebar navigation links (Schedule, Classes Summary, Courses, Billing, Student Feedback, Library).
- **Key MUTATING/dangerous actions:** "See All Notifications" (button type=submit on a form — could POST); logout form (POST to `/student/logout`).
- **Important modals/forms:** Modal 1 was captured via interaction (dropdown_or_menu trigger, stays on same URL) — likely a notifications or user-menu dropdown; no meaningful data-entry form beyond the hidden logout form.
- **Variant-of:** unique template (redirect alias, but the landing content is the same as `student-home`)
- **Broken/empty:** Logo 404 (`/storage/uploads/logo.png`); custom stylesheet 404 (`/assets/custom/style.css`); all KPI values are 0 (empty/no-data state — this is live data, not a broken page); Teachers table shows "No Teachers" empty state; Today's Classes shows "No sessions today".
- **UX improvement for the rebuild:** Replace the three separate "0 / 0 / 0" hour counters with a single visual progress ring or horizontal bar showing consumed vs. remaining hours, making the budget status immediately scannable at a glance.

---

### `student-home` — Student Home  (HTTP 200)

- **Purpose:** The actual family/student dashboard — the canonical landing page after the redirect from `/management/home`; shows a holistic summary of the enrolled student's current status.
- **Key sections / flows:** Header with notification bell (0 New badge), language switcher (9 languages), "View all invoices" quick-link, and user avatar with profile dropdown; sidebar with 8 navigation items (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout) plus a "Dashboard 1" legacy link; main content has three widget cards: (1) student greeting + hour budget (Total / Remaining / Taken, displayed as "0/0 H"), (2) Today's Classes with empty state + "Request Trial" CTA + "Show More" to `/student/today-sessions`, (3) Your Teachers table (empty). One XHR/fetch call observed indicating live data loading.
- **Key SAFE actions:** All sidebar nav links; "View all invoices"; "Request Trial" (navigate to trial request form); "Show More" (navigate to today's sessions list); language switcher links; "My Profile" → `/student/profile`; profile-edit → `/student/profile-edit`.
- **Key MUTATING/dangerous actions:** "See All Notifications" (submit button on form — may mark notifications read/POST); logout POST form.
- **Important modals/forms:** Interaction 0 shows a dropdown_or_menu firing (stays on `/student/home`) — inferred to be the notifications panel or user-account menu dropdown. No destructive modal visible in this state.
- **Variant-of:** unique template (this is the canonical student home; `management-home` is just a redirect to it)
- **Broken/empty:** Logo 404; custom stylesheet 404; all hour values are 0 and teachers/sessions tables are empty (live data state — student has no active packages or sessions in this snapshot); "Dashboard 1" sidebar link points to a separate legacy `main/index.html` route (dead-end / legacy).
- **UX improvement for the rebuild:** The "Request Trial" CTA buried inside an empty-state card is easy to miss; for zero-state users (no active package), show a prominent onboarding banner or step-by-step setup wizard (e.g. "Start here: Book a trial lesson") at the top of the dashboard to drive conversion instead of relying on the small card link.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The family-role dashboard is a lightweight student overview hub. Core entities: enrolled Student (one per family session), Hour Budget (total/remaining/taken hours), Today's Sessions list, Teacher roster. The dashboard is read-only in normal operation; the only write surfaces are notification dismissal and logout.

**Distinct page templates vs variant count:**
- Unique templates: **2** (`management-home` as redirect alias + `student-home` as the real page)
- Effective rendering templates: **1** — both slugs deliver identical DOM/content; `management-home` is a server-side redirect to `student-home` with no distinct layout.
- Variant pages: **1** (management-home is just an alias variant)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Notifications dropdown (triggered on both pages, stays in-place) — moderate risk if it POSTs a mark-as-read; the "See All Notifications" button is flagged unsafe.
- Logout form (POST) — dangerous, must always require explicit user intent; do not auto-fire.
- "Show More" navigates to `/student/today-sessions` (safe, read-only).
- No filters or tabs observed in the dashboard widgets themselves.

**Improvements for the new platform:**
1. **Redirect elimination:** Map `/management/home` directly to the family dashboard route at the router level; avoid the double 302 redirect chain that adds latency.
2. **Hour budget visualization:** Replace raw 0/0/0 number cards with a progress indicator (ring, bar) — far more scannable for parents checking quickly on mobile.
3. **Zero-state onboarding:** When all values are 0 (no package purchased), show a contextual onboarding card with a primary CTA ("Book your first trial") above the fold instead of embedding it inside an empty sessions card.
4. **Notifications:** The "See All Notifications" submit button should be converted to a safe GET navigation link to the notifications page, or if it must POST (mark-as-read), protect it with a visible confirmation or at minimum debounce.
5. **Logo 404 fix:** The logo image asset is missing server-side; rebuild should use a correct path or fallback SVG placeholder.
6. **Legacy "Dashboard 1" link:** Remove or gate this orphan link (`/main/index.html`) — it points to an old UI and will confuse family users.
7. **RTL/i18n:** The page is LTR but links to Arabic, Urdu, and other RTL language options. The rebuild must implement a full RTL layout switch (flex-direction, text-align, icon mirroring) when the user selects an RTL language — the current app does not appear to handle this.
8. **Mobile:** The three-card layout should collapse to a single-column scroll on small viewports; the hour-budget card and today's-classes card are priority content for mobile parents.
9. **Accessibility:** The logout form uses hidden inputs with no ARIA; the notifications button has no aria-label; implement proper roles and keyboard navigation for all interactive elements.
10. **Teacher card empty state:** Rather than a bare table with "No Teachers" row, show a friendly empty-state illustration with guidance (e.g., "Your teacher will appear here once a session is scheduled").

**Needs owner/backend confirmation:**
- What does the "See All Notifications" button actually POST? Is it mark-as-read, or just a navigation wrapped in a form? Confirm so the rebuild can safely convert it to a GET link.
- Is the hour budget (0/0/0) always per-student-enrollment, or per-subject/course? The display label "Time Spendings" is ambiguous — confirm data model before designing the budget widget.
- The "Request Trial" link and the trial-booking flow scope: does this create a new booking record (mutating)? Confirm so the rebuild can gate it appropriately (e.g., disable if trial already requested).
- The "Dashboard 1" legacy link: can it be safely removed from the sidebar for the family role?

---
# Batch 42 — Family · General / Unknown

Both pages in this batch belong to the `family` role and are classified under "General / Unknown" module. Both rendered as error/broken states during the discovery crawl.

---

### `main-index-html` — Opps!!!  (404-equivalent / broken page)

- **Purpose:** Not a real functional page — this is the platform's generic 404 / "page not found" error screen, reached when a family-role user navigates to `/main/index.html` (which does not exist for this role).
- **Key sections / flows:** Single-screen error layout with H1 "Opps!!!" and H4 "This page you are looking for could not be found." One CTA button leads back to login.
- **Key SAFE actions:** "Go Back to Home" — navigates to `/login`.
- **Key MUTATING/dangerous actions:** None.
- **Important modals/forms:** None.
- **Variant-of:** Unique template (global 404 error page).
- **Broken/empty:** YES — this IS the broken/not-found state. The page title itself is the error. Additionally, logo asset at `/storage/uploads/logo.png` returns 404, and `/assets/custom/style.css` returns 404 — the error page itself has broken assets.
- **UX improvement for the rebuild:** Replace the generic "Opps!!!" error page with a role-aware 404 screen that (a) keeps the family-role chrome/nav intact so the user can orient themselves, (b) suggests likely destinations (e.g., Student Home, Today's Sessions) rather than redirecting to the login page, and (c) properly loads the logo and stylesheet.

---

### `student-profile` — Student Profile  (server error / broken page)

- **Purpose:** Intended to be the student profile page at `/student/profile` for a family-role viewer, but during capture it rendered a server error state instead of real profile content.
- **Key sections / flows:** Single-screen error layout with H4 "Something went wrong, try again later." One CTA navigates back to login. No headings, forms, inputs, tables, or meaningful content were captured.
- **Key SAFE actions:** "Go Back to Home" — navigates to `/login`.
- **Key MUTATING/dangerous actions:** None (error state only; no actions exposed).
- **Important modals/forms:** None.
- **Variant-of:** Unique template (global server error / 500-equivalent page — distinct from the 404 template above by its H4 copy and SVG illustration).
- **Broken/empty:** YES — page failed to load student profile data. The crawler hit a 302 redirect chain from `/management/home` → `/login` → `/student/home`, suggesting auth or session instability caused the profile API/render to fail. Logo (`/storage/uploads/logo.png`) and custom stylesheet also 404 here.
- **UX improvement for the rebuild:** The student profile should be a first-class page for families, showing the linked student's name, grade, enrollment status, attendance summary, and session history. The error state should include a "Retry" action rather than routing the user entirely back to login. Offline/error state should preserve navigation so the user is not stranded.

---

## Module synthesis (this batch)

- **What this module does:** Both pages represent the family-role's access to student-facing routes (`/main/index.html` and `/student/profile`). Neither rendered working content — both hit error states during the crawl (404 and server error respectively). This batch reveals that the family role's routing and auth session handling was broken or incomplete at capture time.

- **Distinct page templates vs variant count:**
  - 2 unique error-state templates captured (404/not-found and 500/server-error).
  - 0 functional pages with real content.
  - 0 variant pages (no query-param/status/scope variants).

- **Cross-cutting interactions:** None observed — both pages are dead-end error screens with a single "Go Back to Home" link pointing to `/login`. No modals, no filters, no tabs, no mutations.

- **Improvements for the new platform:**
  1. **Role-aware error pages:** The rebuild must render role-specific not-found and server-error states that preserve the navigation shell so users can self-recover without being ejected to the login screen.
  2. **Student profile as a core family feature:** `/student/profile` must be a fully designed, data-rich page for the family role — it is conceptually the most important page for parents/guardians and should not be an afterthought. Include: student avatar/name, grade/class, enrollment status, upcoming sessions, recent grades, attendance percentage.
  3. **Broken asset audit:** Both pages share broken logo and custom stylesheet 404s; the rebuild must serve all static assets from a reliable CDN or verified path.
  4. **Auth session stability:** The 302 redirect chain (management/home → login → student/home) observed in network logs suggests the family role's session was not properly established before page capture, causing both pages to fail. Backend must ensure stable family-role auth tokens before frontend integration testing begins.
  5. **RTL readiness:** Both pages use LTR (`lang: en`, `dir: ltr`). The rebuild should support RTL from day one given the platform's Arabic locale support (Arabic flag icon loaded in both network logs).
  6. **Retry / graceful degradation:** Error pages need actionable recovery options — "Retry", "Go to Dashboard", "Contact Support" — not just a redirect to login.

- **Anything needing owner/backend confirmation:**
  - Confirm whether `/student/profile` is intentionally gated for the family role or if the crawl session auth failure was the sole cause of the error.
  - Confirm whether `/main/index.html` is a legacy/dead route or was a real page that has been removed.
  - Confirm the correct "home" route for the family role (the network logs suggest `/student/home` and `/student/today-sessions` are loaded as sub-navigations, implying the family portal is actually the student portal viewed as a parent proxy).

---
# Batch 43 — family · Payments / Invoices

### `student-billing` — Student Billing  (HTTP 200)

- Purpose: Read-only invoice/billing summary page for a family-role student, listing all invoices tied to their enrolled courses.
- Key sections / flows: Single H5 "Billing Details" heading; one table with columns #, Serial No, Month-Year, Due Date, Course, Amount, Status (0 rows captured — empty state); a "View all invoices" navigation link in the header area; notification badge indicators ("0 New", "5 new").
- Key SAFE actions: View billing table; click "View all invoices" (navigates to same `/student/billing` route — effectively a self-link or intended to reset filters); language switcher (AR, FR, DE, ES, UR, IT, PT, RU, TR); navigate to My Profile; navigate via sidebar (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library).
- Key MUTATING/dangerous actions: "See All Notifications" button (type=submit on a non-GET form — must not be auto-fired; likely marks notifications as read or fetches more); Logout (POST to `/student/logout`).
- Important modals/forms: One modal captured via dropdown/menu interaction (content not detailed in report — likely a notifications dropdown triggered by the notification bell). Logout form (hidden fields: `_token`, `id`; POST `/student/logout`) — standard CSRF-protected logout, not a risk to auto-fire data mutations but must require explicit user intent.
- Variant-of: unique template (only billing page for the family/student role).
- Broken/empty: Table has 0 rows — no invoice data present at crawl time. The logo image returns 404 (`/storage/uploads/logo.png`). Custom stylesheet 404 (`/assets/custom/style.css`). These are asset-level broken resources, not a page-level failure; the page itself returned HTTP 200.
- UX improvement for the rebuild: The empty-state for the billing table should show a meaningful illustration + message (e.g., "No invoices yet — your billing history will appear here once you are enrolled in a paid course") with a clear CTA. Currently the table silently renders with no rows and no guidance. Also add status color-coding (paid = green, overdue = red, pending = amber) as a distinct visual column rather than relying on text alone, and expose a date-range filter so families can narrow by month/year without scrolling an unbounded list.

---

## Module synthesis (this batch)

- **What this module does and its core entities:** The `student-billing` page is the family-role student's payment and invoice portal. Core entities: Invoice (Serial No, Month-Year, Due Date, Course, Amount, Status). It is a read-only ledger — families can view what they owe or have paid per course per month but cannot initiate payments or disputes from this surface (no payment button was detected).
- **Distinct page templates vs variant count:** 1 unique template; 0 variants. This batch contains a single page.
- **Cross-cutting interactions (modals/filters/tabs) and which are dangerous:** One modal/dropdown captured (notification panel, triggered by bell icon) — likely safe read action but the submit button on it is classified unsafe (could mark-as-read or paginate server-side). The logout POST is the only confirmed mutating action on the page and must always require explicit user confirmation in the rebuild.
- **Improvements for the new platform:**
  - **Empty/error state:** Replace the silent empty table with a contextual empty-state component (illustration + message + CTA).
  - **Status colors:** Paid/Overdue/Pending badges with semantic color tokens; support RTL badge layout since Arabic is a target locale.
  - **Filters:** Add month/year range picker and course filter above the table; the current page offers zero filtering.
  - **"View all invoices" link:** Currently self-links to the same URL — clarify intent (reset filters? expand paginated view?). In the rebuild this should either be removed or wired to a dedicated full-list route.
  - **Mobile:** Billing tables are notoriously poor on small screens; rebuild should use a card/accordion pattern on mobile and a traditional table on desktop.
  - **RTL-first:** The crawled page is LTR (`en`) but the platform targets Arabic (`ar`) — all table columns, badge alignment, and amount formatting (currency direction) must be RTL-compatible.
  - **Logo / asset 404s:** Two 404 assets (`logo.png`, `custom/style.css`) must be resolved before launch; the logo 404 in particular breaks brand identity on every page.
  - **Accessibility:** The single H5 heading structure is flat; rebuild should use a proper H1 page title with H2 section headings, ARIA live regions for the notification count, and keyboard-accessible table sorting.
- **Anything that needs owner/backend confirmation:**
  - Confirm whether payment initiation (pay now, download invoice PDF) is intended to exist on this page in the new frontend or lives in a separate payment flow.
  - Confirm the "See All Notifications" submit button behavior — is it a pagination fetch or a mark-all-read mutation?
  - Clarify the "View all invoices" link target — same route vs. a paginated/filterable sub-route.
  - The 0-row table may reflect a test account with no billing history; confirm with a seeded account that the table actually populates correctly.

---
# Batch 44 — family · Profile / Account & Students

### `student-profile-edit` — Student Profile Edit

- **Purpose:** Allows a student (family role) to update their personal information and change their account password from a single settings page.
- **Key sections / flows:** Two primary card sections — (1) Profile info card: avatar upload with reset, first name, last name, email fields, Save changes submit; (2) Change Password card: old password, new password, confirm password fields, Save changes submit. Header shows notification badge ("0 New", "5 new") and billing shortcut ("View all invoices"). Sidebar navigation covers Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout.
- **Key SAFE actions:** Reset avatar preview (UI reset, no POST), View all invoices (navigation to billing), language switcher (GET), My Profile (navigation), sidebar links (navigation).
- **Key MUTATING/dangerous actions:** "Save changes" on profile form (POST to `/student/profile-edit` — updates name, email, avatar); "Save changes" on password form (POST to `/student/update-password` — changes account password); logout form (POST to `/student/logout`). "See All Notifications" is also flagged as submit/mutating.
- **Important modals/forms:** (1) Profile Edit Form — fields: `onlineImage` (hidden text, current avatar URL), `image` (file upload, JPG/GIF/PNG, max 1 MB), `first_name`, `last_name`, `email`; no field is marked required — rebuild must add server-side and client-side validation. (2) Change Password Form — fields: `old_password`, `new_password`, `confirm_password`; no required flags, no visible strength indicator. (3) One captured interaction triggered a dropdown/menu (likely the header avatar dropdown — no dedicated modal content captured beyond that).
- **Variant-of:** Unique template (no other student profile-edit variant seen in the batch set).
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`); custom stylesheet returns 404 (`/assets/custom/style.css`). No page-level 4xx/5xx — page loads at HTTP 200. No "No data" empty state, but avatar placeholder behavior when logo is missing is degraded.
- **UX improvement for the rebuild:** Split the two forms into clearly labelled tab sections (or accordion panels) — "Personal Info" and "Security" — with inline field-level validation (required markers, email format, password strength meter, new/confirm match check) and a confirmation toast/snackbar on success rather than a full page reload. Password fields should include show/hide toggles. The file upload should preview the selected image immediately before saving (currently requires save to see effect). Add explicit confirmation dialog before password change to prevent accidental submission.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single-page batch covers the student self-service profile management surface for the family role. Core entities: Student account (name, email, avatar) and credentials (password). The page acts as the account settings hub for the student portal.

**Distinct page templates vs variant count:**
- Distinct templates: **1** (`student-profile-edit`)
- Variant pages: **0** — no query-param, tab, or pagination variants captured in this batch.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Header notification dropdown (safe — read-only list)
- Header avatar/account dropdown → triggers navigation to My Profile or Logout (logout is dangerous — POST)
- Language switcher dropdown (safe — GET)
- Two independent POST forms on the same page (both dangerous — profile update and password change); the page conflates them visually, increasing accidental submission risk.

**Improvements for the new platform:**
1. **Form separation & validation:** Isolate profile and password sections (tabs or accordion); add client-side required/format validation with ARIA live-region error messages before any POST fires.
2. **Password UX:** Strength meter, show/hide toggles, real-time new/confirm match feedback; confirm dialog or 2-step verification before committing password change.
3. **Avatar upload:** Live preview on file select; enforce 1 MB / format constraints client-side with clear error text; show loading state during upload.
4. **Dangerous action distinction:** Use different button styles for destructive (password change) vs. standard save (profile info) so users don't confuse the two "Save changes" buttons — currently identical.
5. **RTL/i18n-ready:** Page is LTR-only; Arabic, Urdu, and other RTL languages are selectable from the language switcher — rebuild must apply `dir="rtl"` dynamically and test layout flip for both forms (labels, file upload row, button alignment).
6. **Broken assets:** Resolve 404 on logo and custom stylesheet before launch; use fallback avatar SVG rather than broken image when logo/avatar is missing.
7. **Notification badge:** "5 new" / "0 New" shown simultaneously in header — likely a dual-widget bug; rebuild should consolidate into one authoritative notification count with real-time polling or websocket update.
8. **Mobile:** Both cards should stack vertically and the file input row (photo + reset + allowed-types note) should wrap gracefully on small screens.
9. **Accessibility:** All inputs currently lack ARIA labels (only placeholder text present); rebuild must add `<label for>` associations, `aria-required`, `aria-describedby` for format hints, and `role="dialog"` on any modal overlays.
10. **Logout safety:** Logout is a POST form hidden in the sidebar — rebuild should add a confirm step or move to a clearly labelled "Sign out" button with a brief confirmation to prevent accidental session termination.

**Items needing owner/backend confirmation:**
- What fields are actually editable by the student vs. read-only (e.g., can email be changed freely, or does it require re-verification)?
- Does password change require email OTP/2FA confirmation?
- Is avatar stored server-side or as a URL reference (`onlineImage` field suggests both paths)?
- What triggers the notification count (5 new) — is there a real-time endpoint or is it polled?
- The `See All Notifications` button is flagged as a submit-type — confirm whether this is a GET redirect or an actual form submission that marks notifications as read.

---
# Batch 45 — family · Students (Courses / Class History / Feedback / Trial)

---

### `student-feedbacks` — Student Feedback  (HTTP 200)

- **Purpose:** Family-role landing page for tracking scheduled feedback meetings between the academy and family members; currently shows an empty table.
- **Key sections / flows:** Single card titled "Student Feedback" containing a table with columns: #, Meeting Date, Meeting Time, Meeting Manager, Family Members, Action. Notification badge (0 New / 5 new) in header. No data loaded at capture time.
- **Key SAFE actions:** View all invoices (→ billing), sidebar navigation (Home, Schedule, Classes Summary, Courses, Billing, Library).
- **Key MUTATING/dangerous actions:** "See All Notifications" (POST form, classified unsafe — non-GET submit). Logout (POST form).
- **Important modals/forms:** One modal captured via dropdown/menu interaction (content not extracted beyond the empty state). No meaningful standalone form beyond logout.
- **Variant-of:** Unique template — dedicated feedback-meeting list for the family portal; no other page in this batch shares this layout.
- **Broken/empty:** Table contains "No data found" — zero rows loaded. Logo image returns 404 (`/storage/uploads/logo.png`). Custom stylesheet 404 (`/assets/custom/style.css`).
- **UX improvement for the rebuild:** Replace the bare "No data found" empty state with an informative illustration + explanation of what feedback meetings are and how to request one; add date-range filter so families can narrow history once data exists.

---

### `student-request-trial` — Request Trial  (HTTP 200)

- **Purpose:** Two-step wizard allowing a family member to book a trial lesson — either for a new child or an existing registered child — including date/time/course selection.
- **Key sections / flows:** H4 "Request Trial" with a two-tab wizard: Step 1 "Student Details" (create new child: name, age, language, gender; or choose existing child from dropdown), Step 2 "Trial Info" (date YYYY-MM-DD, time HH:MM, duration in mins, course select). Previous/Next/Submit navigation anchors. No table.
- **Key SAFE actions:** Previous/Next step navigation (anchor-based, same URL); sidebar navigation.
- **Key MUTATING/dangerous actions:** "Submit" (POST to `/student/request-trial`) — creates a trial booking; "See All Notifications" (unsafe submit).
- **Important modals/forms:** Form `steps-uid-0` (POST `/student/request-trial`): 12 fields — `request_type` radio (new/existing), `name`, `age`, `language` (10 locales), `gender`, `student_id` (choose existing child), `date`, `time`, `duration`, `course`. Meaningful form; requires validation on all date/time fields.
- **Variant-of:** Unique template — multi-step trial booking wizard; not replicated elsewhere in this batch.
- **Broken/empty:** Logo 404, custom stylesheet 404. No broken page state; page loads with data (one existing child "منار حسن" visible in student_id dropdown).
- **UX improvement for the rebuild:** Replace the wizard's anchor-based Previous/Next with proper client-side step state; add inline validation per step before advancing (date format, required fields); show a confirmation summary screen before final submit rather than posting immediately.

---

### `student-student-history-fillter-2` — Classes Summary (History Filter)  (HTTP 200)

- **Purpose:** Family view of session history across all (or a selected) child — a filterable table showing past class dates, times, and teachers, with drill-down modals for class detail.
- **Key sections / flows:** H5 "History of : All Student". Filter bar: single `select[name=filter]` (populated with at least "منار حسن") + Submit button. Table: Class Date & Time, Teacher Name, Show (action). Zero rows at capture. Two "Student Details" modals captured: Modal 2 has tabs Class Remark / Class Summary / Homework Note / Files / Teacher / Student; Modal 3 has Class Summary / Homework Note / File. Both have Close buttons.
- **Key SAFE actions:** Student select + Submit (GET form to `/student/student-history-fillter`), "Show" row action (opens detail modal), Close modal buttons.
- **Key MUTATING/dangerous actions:** "See All Notifications" (POST, unsafe). "Submit" filter button classified mutating by the crawler (but is a GET form — low real risk). Logout POST.
- **Important modals/forms:** "Student Details" modal (Modal 2): tabs for Class Remark, Class Summary, Homework Note, Files, Teacher, Student — read-only drill-down. "Student Details" modal (Modal 3): Class Summary, Homework Note, File — also read-only. Both are safe/informational.
- **Variant-of:** Unique template — the only class-history table for the family role in this batch. (The URL `?2` is a query-param variant of the base route `/student/student-history-fillter` but captured as the only instance here.)
- **Broken/empty:** Table has 0 rows at capture ("No data" implied). Logo 404, custom stylesheet 404.
- **UX improvement for the rebuild:** The dual-tab modal structure (Modal 2 vs Modal 3 appear to be two different data shapes for the same detail view) should be unified into a single adaptive detail panel; add date-range filter alongside the student selector so families can scope history without scrolling through a long table.

---

### `student-studentslist` — Courses / All Account Subscriptions  (HTTP 200)

- **Purpose:** Family dashboard listing all subscription/course enrollments across children, with inline feedback submission per course row.
- **Key sections / flows:** H5 "All Account Subscriptions". Student selector (`select[name=student]`, GET form `#studentform`) to filter the table. Table (8 columns): #, Student Name, Status, Teacher Name, Course Name, Subscription, History, Feedback About Course. One row captured shows "not have any courses" — empty state via badge text. Feedback modal (Modal 2) accessible per row.
- **Key SAFE actions:** Student filter (GET), History column link (navigation to class history), sidebar navigation, View all invoices.
- **Key MUTATING/dangerous actions:** "Submit" inside feedback modal (POST to `/student/feedback`) — posts teacher rating, class interactivity score, audio/video quality, teaching style notes, complaints, additional comment. "See All Notifications" (unsafe submit). Logout.
- **Important modals/forms:** "Feedback about your teacher" modal (Form 3, POST `/student/feedback`): fields — `student_name` (hidden), `teacher_name` (hidden), `teacher_rating` (hidden, star widget), `class_interactive` (hidden, rating widget), `see_hear` (select: Yes/No), `like_teacher` (textarea, required), `complain` (textarea, required), `additional_comment` (textarea, optional). This is a real mutating action — submits a permanent teacher review.
- **Variant-of:** Unique template — subscription/course list with embedded feedback submission.
- **Broken/empty:** Table row shows "not have any courses" (empty state badge, not a proper empty state component). Logo 404, custom stylesheet 404.
- **UX improvement for the rebuild:** The feedback form hidden fields (`teacher_rating`, `class_interactive`) suggest star/slider widgets that are presumably injected via JS but not captured — the rebuild must implement accessible rating widgets (keyboard-navigable stars, slider with ARIA) rather than hidden inputs; also add a confirmation dialog before submitting feedback since it is permanent.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The family/student portal (`/student/*`) provides a parent or guardian a self-service view of their children's academic life at the academy. Core entities: Child/Student profiles, Course Subscriptions, Session/Class History, Feedback Meetings, Trial Requests, Teacher Ratings. All pages share the same sidebar (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout) and LTR English layout.

**Distinct page templates vs variant count:**
- 4 unique templates: student-feedbacks, student-request-trial, student-student-history-fillter-2, student-studentslist.
- 0 pure query-param/pagination variants within this batch (the `?2` URL is the only captured instance of that base route).
- Total: 4 unique, 0 variants.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Student selector (GET filter) appears on both history and courses pages — safe, read-only.
- "Student Details" drill-down modals on the history page are safe/read-only (class remark, homework, files).
- Feedback modal on the courses page is DANGEROUS: permanent POST of teacher ratings and subjective comments. Must have a confirmation step.
- Two-step trial wizard (tabs) on request-trial is mutating (POST booking) — requires inline validation before submit.
- "See All Notifications" button is a POST submit on every page — crawler flags it as unsafe; the rebuild should ensure this is a safe read-only operation or clearly gate it.
- Logout POST form is present on every page.

**Improvements for the new platform:**
1. **Empty states:** Every page in this batch rendered with zero or near-zero real data. Replace bare "No data found" text with informative empty states (illustration + call to action, e.g. "Request a trial to get started").
2. **Feedback form accessibility:** Replace hidden JS-driven star/rating inputs with proper accessible rating components (ARIA role=radiogroup, keyboard navigation). Add a confirmation modal before posting.
3. **Trial wizard UX:** Implement true client-side step validation (prevent advancing with blank required fields). Add a summary/review step before final submission. Use a progress indicator (step 1 of 2 with visual progress bar).
4. **Class history:** Unify the two different "Student Details" modal variants into one adaptive detail panel. Add date-range picker alongside the student filter.
5. **RTL readiness:** All pages captured LTR/en; the sidebar includes Arabic, Urdu, and other RTL language links. The rebuild must be RTL-first — layout, table column order, and modal positioning must flip correctly on locale switch.
6. **Logo 404:** Every page fails to load `/storage/uploads/logo.png` — backend fix needed, but the rebuild should use a CSS/SVG fallback rather than a broken image.
7. **Mobile / teacher-family context:** The sidebar navigation has 8 items; on mobile this needs a collapsible drawer. The trial booking form's date/time text inputs should become native date/time pickers on touch devices.
8. **Navigation clarity:** Sidebar label "Courses" links to `/student/studentslist` (subscriptions, not a course catalog); rename to "Subscriptions" or "My Courses" for clarity.
9. **Status colors:** The "Status" column in the courses table has no visible status badges in the captured data — the rebuild should define a clear color-coded status set (active/inactive/pending/suspended) with accessible contrast ratios.
10. **Search:** No text search exists on any of these pages; adding a name/course search on the studentslist and history pages would significantly reduce friction for families managing multiple children.

**Needs owner/backend confirmation:**
- What states does the "Status" column in studentslist represent? What color/badge mapping is expected?
- Are feedback submissions editable after posting, or one-time permanent?
- The `?2` param on the history URL: is this intentional filtering (e.g., filtering by child ID = 2) or a legacy artifact?
- The "See All Notifications" POST — is this a mark-as-read operation? Should be confirmed safe before the rebuild exposes it.
- Trial booking confirmation flow: does the backend send an email/SMS confirmation? Does the family portal show pending trial status?

---
# Batch 46 — family · Timetable / Schedule

### `student-timetable` — Student Timetable  (HTTP 200)

- Purpose: Displays the student's weekly class schedule in a day-column grid so the family/student can see what sessions are scheduled for each day of the week.
- Key sections / flows: Single 8-column table with columns for `#`, `Saturday`, `Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`; a KPI/header card area showing the day columns; notification badge area (0 New / 5 new); header with "View all invoices" quick link to billing; sidebar navigation with links to Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library; language switcher supporting 9 locales (ar, fr, de, es, ur, it, pt, ru, tr); one XHR call to `/student/today-sessions` populating session data.
- Key SAFE actions: View weekly timetable; navigate to billing via "View all invoices"; navigate to any sidebar route (Home, Classes Summary, Courses, Billing, Student Feedback, Library); switch display language.
- Key MUTATING/dangerous actions: "See All Notifications" button (submit type, non-GET form — could mark notifications read or trigger server state change); Logout (POST to `/student/logout`).
- Important modals/forms: Modal 1 captured via dropdown/menu interaction (no named purpose in capture — likely a notification panel or user profile dropdown triggered from the header); no data-entry forms beyond the logout form.
- Variant-of: unique template (sole timetable/schedule page in this batch).
- Broken/empty: Table has **0 rows** — the timetable grid rendered with no session data, indicating either no sessions are scheduled or the data failed to load; logo image 404 (`/storage/uploads/logo.png`); custom stylesheet 404 (`/assets/custom/style.css`).
- UX improvement for the rebuild: The zero-row timetable provides no visual feedback — add a proper **empty state** ("No sessions scheduled this week") with a call-to-action or teacher contact link; also replace the flat day-column table with a responsive week-view grid that stacks to a day-picker on mobile and supports RTL day ordering for Arabic locale.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch contains a single page from the **family/student portal** covering the **Timetable / Schedule** module. The core entity is the student's weekly schedule — a grid of days × time slots showing which classes (sessions) are booked. Supporting entities referenced via navigation include billing invoices, course lists, feedback, and library resources.

**Distinct page templates vs variant count:**
- 1 unique template (`student-timetable`); 0 variants.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Header notification panel (dropdown/menu interaction captured) — "See All Notifications" submit button is flagged unsafe (potential server mutation; must not be auto-fired).
- Logout POST form — dangerous (session termination).
- Language switcher — safe navigation, but switching locale mid-session should preserve the current route.
- No filters, tabs, or date-range selectors are present on this page (daterangepicker and flatpickr CSS/JS are loaded but appear unused in this render, suggesting dynamic filtering may be intended but not yet surfaced in the captured state).

**Improvements for the new platform:**
1. **Empty/error states:** The timetable grid with 0 rows must show a clear empty state explaining why no data appears and what the student/parent should do.
2. **Responsive week-view:** Replace the plain HTML table with a CSS-grid week view that collapses gracefully to a day-tab selector on mobile — critical for family use on phones.
3. **RTL-first day ordering:** For Arabic locale, days should render right-to-left (Friday → Saturday) to match natural reading direction.
4. **Session detail on click:** Each timetable cell should open an accessible modal (focus-trapped, Escape-closable, role=dialog) showing session details (teacher, subject, room, meeting link) instead of a bare table cell.
5. **Loading skeleton:** Since data is fetched via XHR (`/student/today-sessions`), add a skeleton loader to prevent a confusing empty grid flash.
6. **Notification action safety:** The "See All Notifications" submit should be a safe GET navigation or at minimum require no confirmation — but it must not auto-fire; ensure it is clearly labeled and not styled as a primary action.
7. **Asset hygiene:** The missing logo (`logo.png`) and custom stylesheet cause silent visual degradation — the rebuild should serve all assets from a versioned CDN with fallbacks.
8. **Sidebar hierarchy:** "Schedule" is a top-level sidebar item but leads to a minimal page — consider nesting it under a "My Learning" section alongside Classes Summary and Courses for better information architecture.

**Anything that needs owner/backend confirmation:**
- Why does `/student/today-sessions` return no data — is this a test-environment data gap or a production issue?
- The `daterangepicker` and `flatpickr` libraries are loaded but no date filter UI is visible — confirm whether date-range filtering is a planned but unimplemented feature or was removed.
- The "See All Notifications" button's actual server action must be confirmed before assigning it a safe/unsafe classification in the rebuild.
- Confirm which day is the week start (Saturday is column #2, Sunday is #3 — Middle-East calendar convention) so the rebuild week-view is configured correctly per locale.

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

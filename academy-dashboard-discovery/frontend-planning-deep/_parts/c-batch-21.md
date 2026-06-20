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

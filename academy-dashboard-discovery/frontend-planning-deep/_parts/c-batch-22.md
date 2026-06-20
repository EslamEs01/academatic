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

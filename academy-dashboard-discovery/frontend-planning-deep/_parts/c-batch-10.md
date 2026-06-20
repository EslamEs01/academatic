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

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

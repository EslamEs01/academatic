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

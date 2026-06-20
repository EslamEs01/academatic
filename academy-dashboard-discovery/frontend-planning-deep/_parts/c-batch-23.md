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

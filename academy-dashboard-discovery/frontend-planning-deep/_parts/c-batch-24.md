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

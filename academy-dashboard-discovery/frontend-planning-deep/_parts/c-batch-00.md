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

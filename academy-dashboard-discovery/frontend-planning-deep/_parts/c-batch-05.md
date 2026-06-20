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

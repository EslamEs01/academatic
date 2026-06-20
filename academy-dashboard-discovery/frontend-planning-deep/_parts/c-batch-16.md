# Batch 16 — admin · Reports / Analytics (Forms, New Requests, Teacher Feedback)

---

### `management-forms` — Forms (List)

- **Purpose:** Lists all admin-created feedback/survey forms with status, question count, response count, and schema color control.
- **Key sections / flows:** Single table (cols: #, Form Title, Questions, Responses, Default, Status, Created at, Actions); "Create Form" CTA; schema color picker modal per form; pagination control present.
- **Key SAFE actions:** View forms list, navigate to follow-up reports.
- **Key MUTATING/dangerous actions:** Create Form (navigates to create page); Save (color picker form posts to `/management/forms/colors/update`).
- **Important modals/forms:**
  - Schema Color modal — posts to `/management/forms/colors/update` with `form_id` hidden field + color picker; Save button.
- **Variant-of:** unique template
- **Broken/empty:** Table renders "No data found" — no forms exist in the test dataset; 404 on logo image (`/storage/uploads/logo.png`) across all pages in this batch.
- **UX improvement for the rebuild:** Add an empty-state illustration and a prominent "Create your first form" CTA when the table has no data, rather than a bare "No data found" row. Also surface response count as a progress indicator inline in the table.

---

### `management-forms-create` — Create Form

- **Purpose:** Full-page form builder allowing admin to create a new feedback/survey form with custom question types, scheduling day, and optional/required fields.
- **Key sections / flows:** Single card "Add" containing: Form Title field (required), Day selector (1–28, day of month to show the report), dynamic question builder (Add Question adds fields for label, type, options, is-required checkbox), question type dropdown (Short Answer, Paragraph, Checkboxes, Multiple Choice, Dropdown, Rating), rating preview ("Users will select 1 to 5 stars"), Delete question and Remove option buttons, Save.
- **Key SAFE actions:** View builder, Add/remove option previews (client-side).
- **Key MUTATING/dangerous actions:** Save (POST `/management/forms`); Delete question; Remove option; Add Option; Add Question.
- **Important modals/forms:**
  - Main create form (POST `/management/forms`): fields `form_name` (required), `day` (select), `fields[1][label]`, `fields[1][type]`, `fields[1][options][]`, `fields[1][is_required]` checkbox — dynamic; repeats per question.
- **Variant-of:** unique template
- **Broken/empty:** No broken state; form is a blank builder.
- **UX improvement for the rebuild:** Replace the bare day-number picker with a labelled "Report publish day" control with explanatory tooltip. Add drag-to-reorder for questions and a live preview pane beside the builder.

---

### `management-new-requests` — New Requests Statistics (Overview)

- **Purpose:** Executive dashboard showing KPI summary cards for all new enrollment/trial requests, segmented by pipeline stage, with a date-range filter and drill-down links to each status bucket.
- **Key sections / flows:** Date-range filter bar (flatpickr, `date_range` + hidden `status`, GET submit); large KPI grid — Duplicated, PENDING, Contacted, No Response, Qualified, Scheduled, Trial Taken, Trial Missed, Teacher (each with count + "Show Details" link); Converted (18) / Not Converted (10); Male/Female teachers requested with % of requests; Avg Scheduling Time (0H), Pending Actions, Completed Trials, Cancelled Trials; Total Teachers / Families / New Families This Month / Avg Families per Teacher / Requests Growth MoM; Fastest Scheduling / Top Performer; Most Requested %.
- **Key SAFE actions:** Date range filter + Submit/Reset; Show Details (navigates to filtered list); Month dropdown filter.
- **Key MUTATING/dangerous actions:** None beyond filter submission (GET).
- **Important modals/forms:** Filter form (GET `/management/new-requests`): `date_range` text, hidden `status` — safe filter only.
- **Variant-of:** unique template
- **Broken/empty:** All pipeline-stage counts show 0 for the filtered period; Converted = 18, Not Converted = 10 visible at all-time level.
- **UX improvement for the rebuild:** Render the pipeline stages as a horizontal funnel or Kanban-style swimlane so the admin can see conversion drop-off at a glance, rather than a grid of disconnected cards.

---

### `management-new-requests-filter-contacting-date-range-2026-06-01-to-2026-06-30` — New Requests / Contacted (Filtered List)

- **Purpose:** Filtered view of requests in "Contacted" status for a specific date range, with a per-row detail drawer, notes, and status change workflow.
- **Key sections / flows:** Stats header with date-range filter; main table (cols: #, Date, Parent name, Email, Phone number, Status, Actions) — 0 rows in test period; clicking a row opens detail modal; Actions include: view detail, view/add notes, change status; detail modal shows full request profile (Basic Info + Course Trial Info + IP/device metadata); Notes List modal shows history; Add Notes modal; Change Status modal with dropdown of all pipeline statuses.
- **Key SAFE actions:** Filter by date range; Reset; view row detail modal; view Notes List.
- **Key MUTATING/dangerous actions:** Create (new request entry via link); Save (add note — POST `noteForm`); update status (POST `change-status` form with status select — moves the request through the pipeline).
- **Important modals/forms:**
  - "New Requests" detail modal: read-only — Parent, Parent Age, Email, Phone, Gender, Request Date, Course Name, Trial Date/Time, Teacher gender, Classes/Week, Class Duration, Country, Timezone, Language, How Heard, Coupon, Friends count, IP Address, Country/City/ISO, Device Type, Browser.
  - "Notes List" modal: table (#, Date, Users, All Notes) — lazy loaded ("Loading......").
  - "Add Notes" modal: `noteForm` POST, `note` textarea (required).
  - "Change Status" modal: `change-status` POST, `status` select (options: Contacted, Qualified, Trial Taken, no response, Duplicated, Trial Missed, scheduled, Teacher).
- **Variant-of:** management-new-requests-filter-[STATUS]-date-range (base template for all 7 status filter pages)
- **Broken/empty:** Main table has 0 rows (empty period); Notes list shows "Loading......" — possible async fetch not completing in capture.
- **UX improvement for the rebuild:** The status change modal should show the current status and highlight the new selection with color-coded labels; add a confirmation step before updating to prevent accidental pipeline moves.

---

### `management-new-requests-filter-duplicat-date-range-2026-06-01-to-2026-06-30` — New Requests / Duplicated (Filtered List)

- **Purpose:** Same filtered list template scoped to "DUPLICAT" (Duplicated) status requests.
- **Key sections / flows:** Identical structure to the Contacted variant — date-range filter header, requests table, detail/notes/change-status modals, "Create" CTA.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (add note); update status.
- **Important modals/forms:** Same 5 modals as Contacted variant (detail, notes list, add note, change status, global chrome).
- **Variant-of:** management-new-requests-filter-contacting-date-range (same base template, status=DUPLICAT)
- **Broken/empty:** Table 0 rows; notes loading stuck.
- **UX improvement for the rebuild:** For duplicate requests, auto-surface the duplicate detection logic (show "possible duplicate of request #X" in the detail modal) to speed resolution.

---

### `management-new-requests-filter-no-response-date-range-2026-06-01-to-2026-06-30` — New Requests / No Response (Filtered List)

- **Purpose:** Filtered list of requests where no response was received in the date range.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=NO_RESPONSE)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** Add a bulk "Send follow-up" action for the no-response bucket to speed outreach, with a confirmation dialog.

---

### `management-new-requests-filter-pending-date-range-2026-06-01-to-2026-06-30` — New Requests / Pending (Filtered List)

- **Purpose:** Filtered list of requests in PENDING status for the given date range.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=PENDING)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** Add an "Assign to agent" action in the row Actions menu for pending requests to enable team-based triage directly from this view.

---

### `management-new-requests-filter-qualified-date-range-2026-06-01-to-2026-06-30` — New Requests / Qualified (Filtered List)

- **Purpose:** Filtered list of requests that have been assessed as qualified prospects.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=QUALIFIED)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** For qualified requests, surface a "Schedule Trial" quick action in the row that pre-fills a trial scheduling modal, removing the need to open the detail then change status separately.

---

### `management-new-requests-filter-trial-missed-date-range-2026-06-01-to-2026-06-30` — New Requests / Trial Missed (Filtered List)

- **Purpose:** Filtered list of requests where the trial session was missed.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=TRIAL_MISSED)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** Add a "Reschedule" shortcut row action that moves status to Qualified and opens a trial re-scheduling flow in one click.

---

### `management-new-requests-filter-trial-taken-date-range-2026-06-01-to-2026-06-30` — New Requests / Trial Taken (Filtered List)

- **Purpose:** Filtered list of requests where the trial session was completed.
- **Key sections / flows:** Same template as other status filters.
- **Key SAFE actions:** Filter, Reset, view detail, view notes.
- **Key MUTATING/dangerous actions:** Create; Save (note); update status.
- **Important modals/forms:** Same modal set as Contacted variant.
- **Variant-of:** management-new-requests-filter-contacting-date-range (status=TRIAL_TAKEN)
- **Broken/empty:** 0 rows; notes loading incomplete.
- **UX improvement for the rebuild:** For trial-taken requests, surface conversion outcome inline (Converted / Not Converted badge) in the table row, removing the need to open a separate detail modal to assess outcome.

---

### `management-teacher-feedback-feedback-teacher-id-1-year-2026` — Teacher Feedback Detail (Per Teacher / Year)

- **Purpose:** Shows a per-teacher, per-year feedback report, filtered by teacher selector and year number input; linked from the Monthly Performance list.
- **Key sections / flows:** Filter bar with teacher select (populated — shows Arabic teacher name "المعلم محمد صادق صادق") and year number input; "Filter" (GET) + Reset; content area below filter appears empty/chart-only in capture (no visible table — 0 tables detected, 211 network requests suggesting heavy chart/data loading); 2 interactions captured (teacher dropdown open, second dropdown).
- **Key SAFE actions:** Select teacher from dropdown; enter year; Filter (GET); Reset.
- **Key MUTATING/dangerous actions:** None directly on this page (no POST forms except global shortcuts/logout).
- **Important modals/forms:**
  - Filter form (GET `/management/teacher-feedback/feedback`): `teacher_id` select (required, lists actual teachers), `year` number input.
- **Variant-of:** unique template (query-param variant of the teacher-feedback base, but different enough structure to be its own template)
- **Broken/empty:** No visible content table or charts captured in the DOM summary (0 tables, minimal headings) — the feedback report content is likely rendered via JS/charts that didn't fully render in the static capture. The page loaded 211 requests, suggesting chart libraries are active. Treat as possibly partially broken in capture.
- **UX improvement for the rebuild:** Replace the bare year number input with a year picker (prev/next arrows + current year default) and render monthly feedback data as a bar or radar chart with a supporting data table for accessibility and export.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers two distinct but related sub-modules within the admin Reports / Analytics area: (1) the Forms builder/manager for custom feedback surveys and (2) the New Requests CRM pipeline tracker plus a Teacher Feedback per-teacher drilldown.

Core entities: Survey Forms (title, questions, day-of-month schedule, responses, status, color schema); New Requests / Enrollment Requests (parent contact info, children data, course/trial info, geographic/device metadata, pipeline status); Pipeline Statuses (PENDING, CONTACTING, DUPLICAT, NO_RESPONSE, QUALIFIED, TRIAL_TAKEN, TRIAL_MISSED, scheduled, Teacher, Converted, Not Converted); Teacher Feedback (teacher_id, year, monthly responses — chart-based).

**Distinct page templates vs variant count:**
- Unique templates: 4
  1. Forms List (`management-forms`)
  2. Create Form builder (`management-forms-create`)
  3. New Requests Statistics overview (`management-new-requests`)
  4. Teacher Feedback per-teacher detail (`management-teacher-feedback-feedback-teacher-id-1-year-2026`)
- Variant pages: 7 (all `management-new-requests-filter-{STATUS}-date-range-*` pages share one base template — only the status segment and the table heading label differ)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Date-range flatpickr filter (shared across all New Requests pages) — safe (GET).
- "Show Details" per-row detail modal — safe (read-only).
- "Notes List" modal — safe (read-only, async loaded).
- "Add Notes" modal — DANGEROUS (POST, saves note to request record; no confirm step).
- "Change Status" modal — DANGEROUS (POST, moves request through pipeline; no confirm step; status dropdown includes destructive statuses like Duplicated/Trial Missed).
- "Create" link on filter pages — DANGEROUS (initiates new request creation).
- Schema color picker modal (Forms list) — DANGEROUS (POST, updates form appearance).
- Form builder Save (Create Form) — DANGEROUS (POST, creates new form).

**Improvements for the new platform:**
1. **Navigation / pipeline:** Render the New Requests pipeline as a visual funnel or Kanban board rather than separate URL segments per status — allow drag-and-drop status changes with confirm dialog.
2. **Dashboards:** New Requests Statistics KPI cards should use a consistent color-code system (green = positive progress, amber = at-risk, red = drop-off) and render sparklines alongside counts for trend context.
3. **Tables:** All status-filtered tables are empty in the test period — implement a proper empty-state component ("No requests in this status for the selected range") with actionable CTA.
4. **Modals:** Change Status modal needs a confirmation step ("Move from X to Y?") and should display the full status label with color badge, not just a plain select. Add Notes modal needs character counter and required validation feedback.
5. **Error/loading states:** Notes List modal renders "Loading......" indefinitely in capture — the rebuild must handle async timeout/error with retry CTA.
6. **Forms builder:** The Create Form page needs drag-to-reorder questions, a live mobile preview pane, and field-level validation feedback. The Day picker (1–28) needs a tooltip explaining its meaning ("day of month the report is distributed").
7. **Teacher Feedback:** The per-teacher year report rendered no visible content in the capture (likely chart-only). Rebuild should include a data table alongside charts for accessibility and CSV export.
8. **RTL / mobile:** All pages currently LTR only; the teacher dropdown already contains Arabic text ("المعلم محمد صادق صادق") — the rebuild must support RTL for Arabic teacher names throughout and be responsive for mobile admin use.
9. **Accessibility:** Modal focus traps, ARIA role=dialog, keyboard-dismissible (Escape), and labeled form controls are missing in the original; must be built in from the start.
10. **Status color semantics:** The pipeline status list (Contacted, Qualified, Trial Taken, Trial Missed, Duplicated, etc.) has no color coding in the table — the rebuild should use a consistent status badge system (color + icon) across all filtered views.

**Anything that needs owner/backend confirmation:**
- The "DUPLICAT" status slug (likely a typo of "DUPLICATE") — confirm the backend API enum value before building the new URL routing.
- The Notes List async endpoint (`noteForm` action is blank `""`) — confirm the actual POST endpoint for adding notes and the fetch endpoint for the notes list.
- Change Status endpoint (also blank action) — confirm REST endpoint and whether status transitions have business rules (e.g., cannot move from Trial Missed to Contacted without confirmation).
- Teacher Feedback page: confirm what chart type and data structure the backend returns for `teacher_id + year` — the capture shows 211 requests but 0 tables and no headings beyond chrome, implying a chart-heavy response.
- Forms "Default" column and "Status" column — confirm what toggling Default or Status does (likely AJAX calls not captured).
- The `day` field in form creation (1–28) — confirm whether this is a fixed day-of-month schedule or a relative offset, and what happens in months shorter than 28 days.

# Batch 26 — admin · Timetable / Schedule (Request & Search sub-module)

---

### `management-request-schedule-1-1` — Request Schedule (student 1, parent 1)

- **Purpose:** Wizard-style form that lets an admin broadcast a schedule request to a filtered set of teachers on behalf of a specific student/parent, choosing between a Trial Class or a Regular Course.
- **Key sections / flows:**
  - Card 1 "Request Schedule" — two-step mode toggle: "Request For Trial Class" vs "Request For Regular Course". Each branch reveals different fields: Trial = teacher multi-select by category, course, duration (30–180 min), accounting statement (Paid/Paid-if-continue/Free), single date+time; Regular = category multi-select, course, total hours, start date, per-day-of-week checkboxes (Sat–Fri) each with time HH:MM and duration select.
  - Card 2 "List of Teachers" — 3-col table (index, checkbox "Select All", Teacher Name). At capture time shows only a placeholder row "Select categories to send request", meaning it is dynamically populated after category selection.
  - Hidden fields carry `parent_id`, `student_id`, `family_id` (bound to the URL route params `/1/1`).
- **Key SAFE actions:** View all courses (link), View All Queues (link), page-level navigation.
- **Key MUTATING/dangerous actions:** **Send Request** (POST `/management/store-request-schedule`) — broadcasts a scheduling request to all checked teachers; must never be auto-fired. Also "Add shortcuts" (POST) and "Save" for the shortcuts widget.
- **Important modals/forms:**
  - Main form (POST `store-request-schedule`): request_type radio, category multi-select with search textarea, course_id, duration, accounting_statement, date, time (Trial branch); OR category multi-select, course_id, total_hours, start_date, per-day checkboxes + time + duration (Regular branch). The dual-branch layout with 63 fields total is confusing; rebuilds should use a clear step wizard.
- **Variant-of:** Base template for `management-request-schedule-{parent_id}-{student_id}`. `management-request-schedule-2-2` is a direct variant (same HTML structure, different IDs in hidden fields).
- **Broken/empty:** Teacher table populates only after category is selected (dynamic); at capture it shows the placeholder. Logo image 404 (`/storage/uploads/logo.png`) — consistent across all pages.
- **UX improvement for the rebuild:** Replace the flat dual-branch form with a multi-step wizard: Step 1 = choose type (Trial/Regular), Step 2 = category + course filters with live teacher list preview, Step 3 = schedule specifics, Step 4 = review + confirm. Add a summary of matched teachers before the "Send Request" action and require explicit confirmation (modal with teacher count).

---

### `management-request-schedule-2-2` — Request Schedule (student 2, parent 2)

- **Purpose:** Identical to `management-request-schedule-1-1` but scoped to a different student/parent pair (IDs 2/2, discovered from `/management/families/2`).
- **Key sections / flows:** Exact same two-card layout: Request Schedule form with Trial/Regular toggle, and the List of Teachers table with dynamic population. Form submits to the same endpoint `store-request-schedule`. All 63 fields, 15 selects, 4 forms, DOM element counts are byte-for-byte identical to the /1/1 page.
- **Key SAFE actions:** Navigation links (View all courses, View All Queues).
- **Key MUTATING/dangerous actions:** **Send Request** (POST `store-request-schedule`) — same as above.
- **Important modals/forms:** Same 3 modals as /1/1 (Loading..., Recent Searches, Add shortcuts). Main form is structurally identical with different hidden field values.
- **Variant-of:** `management-request-schedule-1-1` (same template, route params differ: parent_id=2, student_id=2).
- **Broken/empty:** Same placeholder teacher table at load time. Same logo 404.
- **UX improvement for the rebuild:** This page should not be a separate route in the new system; the student/parent context should be passed as query params or a route parameter to a single `RequestSchedule` component. Eliminates N×M page explosion.

---

### `management-schedule-trials-response` — Request Result (Trial Schedule Responses)

- **Purpose:** Inbox/results board where the admin reviews teacher responses to trial-class schedule requests sent via the Request Schedule tool.
- **Key sections / flows:**
  - Main table (9 cols): Student | Parent | Course Name | Date | Time | Duration | Status | Requests | (actions). At capture: 0 rows, shows "no trial requests" empty state.
  - Two modals accessible from table rows: "Teachers You Sent" (2-col list: #, Teacher Name) and "Accepted Teachers" (4-col list: #, Teacher Name, Message from teacher, Options). These allow the admin to see which teachers were notified and which accepted.
  - 3 total tables: main request table, "Teachers You Sent" table, "Accepted Teachers" table (both in modals, 0 rows at capture).
- **Key SAFE actions:** Navigation links, modal "Close" buttons (6 Close buttons total), view teacher lists.
- **Key MUTATING/dangerous actions:** "See All Notifications" (submit on non-GET form); no explicit approve/reject buttons captured but "Options" column in Accepted Teachers modal likely has action controls (not fully captured).
- **Important modals/forms:**
  - **Teachers You Sent** modal: read-only list of teachers who received the request.
  - **Accepted Teachers** modal: list of teachers who accepted, with a "Message from teacher" field and "Options" — likely where admin finalises the booking. Must not auto-fire.
- **Variant-of:** Unique template.
- **Broken/empty:** Main table empty ("no trial requests") at capture time. Modal tables also 0 rows. This is a valid empty state, not a broken page.
- **UX improvement for the rebuild:** Replace the tabular empty state with an actionable empty-state panel (e.g., "No pending trial requests — send a new request" with a CTA link). The "Accepted Teachers" modal options should be labeled clearly (e.g., "Book this teacher" / "Decline") and require a confirmation step before finalizing.

---

### `management-search-schedule` — Search Schedule (Teacher Availability Finder)

- **Purpose:** Utility tool for admins to find teachers who are available within a specified time window, optionally filtered by category, availability flag, or course.
- **Key sections / flows:**
  - Single card "Search Schedule — Teacher Timezone": a search form with From/To time pickers (HH:MM, required), category multi-select with search, and two checkboxes: "Filter By Availability" and "Courses".
  - On submission (POST to `/management/search-available-teacher`) the page presumably renders a result list (no table captured — the DOM shows 0 tables, indicating results appear dynamically or the page was captured in its empty pre-search state).
  - The heading badge "Teacher Timezone" indicates results are shown in the teacher's local timezone.
- **Key SAFE actions:** Navigation links, Close modals.
- **Key MUTATING/dangerous actions:** **Search** button (submit on POST form `/management/search-available-teacher`) — although labelled "Search" it is a POST, not GET, so flagged as non-safe. In practice it is a read operation (availability query) but the method choice could confuse the new API contract.
- **Important modals/forms:**
  - Main search form: `from` (HH:MM, required), `to` (HH:MM, required), `category_selected[]` (multi-select required), `filter_by_available` checkbox, `filter_by_courses` checkbox. Submit → "Search".
- **Variant-of:** Unique template.
- **Broken/empty:** No results table visible at capture (0 tables in DOM). Either results render after search POST, or there were no results. No explicit empty-state message captured.
- **UX improvement for the rebuild:** Convert the search to a GET-based query with URL params so results are shareable/bookmarkable. Add an inline results panel below the form (rather than a full page reload). Show teacher cards with their weekly availability grid so admins can immediately proceed to "Request Schedule" for a matched teacher.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the admin-side Schedule Request & Discovery sub-module within Timetable / Schedule. Core entities: Student, Parent/Family, Teacher, Course, ScheduleRequest (with type=Trial|Regular), ScheduleResponse (teacher acceptance/rejection with message). The workflow is: Search for available teachers → Send a request → Review responses.

**Distinct page templates vs variant count:**
- Unique templates: 3 (`management-request-schedule-{p}-{s}` as one template, `management-schedule-trials-response`, `management-search-schedule`)
- Variant pages: 1 (`management-request-schedule-2-2` is a parameter variant of `management-request-schedule-1-1`)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- "Send Request" (POST `store-request-schedule`) — DANGEROUS: broadcasts to all selected teachers; needs confirmation modal with teacher count summary.
- "Search" on search-schedule (POST, effectively read-only but mislabeled method).
- "Accepted Teachers > Options" — DANGEROUS: likely finalizes a booking; needs labeled CTA + confirmation.
- All other modals (Teachers You Sent, Recent Searches, Add shortcuts, Loading) are safe view/utility.
- The dual-branch form (Trial vs Regular) on the request page has 63 fields total; 17 filter controls. This is the most complex form in the batch.

**Improvements for the new platform:**
1. **Consolidate route explosion:** `request-schedule/{parent_id}/{student_id}` produces N×M pages. Rebuild as a single component accepting context via route params, opened from within the student or family detail page (contextual action, not a standalone route).
2. **Step wizard for request creation:** Break the 63-field dual-branch form into a 4-step wizard (type → teachers → schedule → confirm) to reduce cognitive load and prevent accidental mass-sends.
3. **Mandatory confirmation before Send Request:** Add a modal showing "You are about to notify X teachers. Proceed?" with teacher names listed.
4. **GET-based availability search:** Refactor search-schedule to use GET + query params so results are bookmarkable and shareable; add inline results with teacher availability cards.
5. **Empty/loading states:** `schedule-trials-response` shows a plain text empty state; replace with an actionable empty state component with a direct "New Request" CTA. `search-schedule` has no visible result state at all — add a clear "no results" illustration.
6. **Status colors on response table:** The Requests/Status columns in `schedule-trials-response` need clear color-coded badges (Pending = yellow, Accepted = green, Declined = red).
7. **Accepted Teachers modal clarity:** Rename "Options" column to explicit action labels; require two-step confirmation for finalizing a teacher booking.
8. **RTL readiness:** All 4 pages are LTR-only (`lang=en`, `dir=ltr`). The teacher name in the request form already contains Arabic text (`محمد السيد`), confirming bilingual data. The new platform must support RTL layout for Arabic locale.
9. **Mobile / teacher-facing:** The per-day schedule grid (7 rows × time + duration) is unusable on small screens; rebuild with a responsive day-card accordion on mobile.
10. **Timezone clarity:** The "Teacher Timezone" badge on search-schedule is the only hint that time data is timezone-relative. The rebuild should surface timezone labels on all time inputs throughout the request flow.

**Needs owner/backend confirmation:**
- The POST method on `search-available-teacher` — is this a true write or a read? If read, it should be refactored to GET for the new API.
- What actions are available in "Accepted Teachers > Options"? Are they approve/book/reject/reschedule? This shapes the response-review page's API contract.
- Can a single request go to multiple students (multi-student batch request), or is each request always 1:1 student-to-teacher-pool?
- Accounting statement options ("Paid", "Paid if continue", "Free") — what backend entity do these map to and who sets the default?

# Batch 06 — Interpretive Digest

_Admin role. 18 pages read. Base dir: `output/roles/admin/pages/`._

---

## Per-Page Blocks

---

### 1. management-banks

**Route:** `GET /management/banks`
**Module:** Financial / Banks

**Purpose:** Lists all bank accounts used for financial tracking. Entry point from the sidebar under "List of Banks".

**Key sections/flows:**
- Single data table: columns `#`, `Bank Name`, `Settings`
- "Add Bank" CTA button navigates to the create form

**Safe actions:** Navigate to Add Bank

**Mutating/dangerous actions:** None visible from the list (settings column presumably holds edit/delete, but no rows present to confirm)

**Modals/forms:** None on this page

**Broken/empty:** YES — table contains zero rows, single "No data found" empty state. No records exist in the test environment.

**UX improvement:** Empty state should include a prompt/button to create the first bank rather than just "No data found".

---

### 2. management-banks-create

**Route:** `GET /management/banks/create` → `POST /management/banks`
**Module:** Financial / Banks

**Purpose:** Single-field form to create a new bank record.

**Key sections/flows:**
- Breadcrumb: Dashboard > Banks > Create Bank
- H4 heading: "Main information"
- Single field: `name` (text, required, placeholder "Bank Name")
- Submit POSTs to `/management/banks`

**Safe actions:** Navigate back via breadcrumb

**Mutating/dangerous actions:** Form submission creates a bank record

**Modals/forms:**
- Form: `name` (text, required)

**Variant-of:** None — standalone create form

**UX improvement:** Single-field form is functional but offers no inline validation feedback or cancel/back button within the form itself.

---

### 3–8. management-courseclasses-1 through management-courseclasses-6

**Route:** `GET /management/courseClasses/{id}` (IDs 1–6)
**Module:** Course Classes / Session Management

**Purpose:** Full administrative detail view for a single class session. Provides complete lifecycle controls: attendance, absence, cancellation, rescheduling, queuing, WhatsApp messaging, feedback, and fine management.

**Key sections/flows (based on courseclasses-1 as canonical; 2–6 confirmed identical template):**
- Header: Class ID badge, Status badge, Course name, Type (Trial/Regular), "Show Course" link to `/management/courses/{id}`
- Class metadata: Teacher, Student, Scheduled date/time, Duration, Remaining hours
- Fine indicator: inline "(3.00 Fine)" badge when a compensation record exists; "Delete Fine" form inline (POST to `/management/teachers/{teacher_id}/compensations/{compensation_id}` with `_method: DELETE`)
- Timeline: Ordered list of status change events (Pending → Waiting → Running → Attend, etc.)
- 10 modals accessible from per-row action dropdown:
  1. **Direct Links** (read-only table): Student room link / Teacher room link / Admin room link
  2. **Total Queues** (read-only table): columns `#`, Added by, Level, Text, Status, Created at
  3. **Add Quick Queue** (mutating): `level` select (Urgent / Medium / Normal) + `text` textarea; POSTs to action endpoint
  4. **Mark as Attend** (mutating): radio (`markAsAttend`: no-details / with-details); if with-details: `remark` select (Excellent / Very Good / Good / Acceptable / Needs Improvement), `summary` textarea, `homework` textarea, `notes` text, `images[]` file upload
  5. **Send WhatsApp Message** (mutating): `wa_message` textarea, `send_teacher` checkbox, `send_student` checkbox
  6. **Mark As Absent** (mutating): `absent_by` select (Student / Teacher); `note` textarea; `sendMessage` radio (Don't send / Default / Custom); `message` textarea (custom); makeup tabs: No Make-up / Auto Make-up class / Reschedule (with `cancelTzType` radio: Student Timezone / Teacher Timezone + date + time) / Add to Credit
  7. **Edit Class** (mutating): `date` text, `time` text, `duration` select (10–180 mins), `teacher_id` select, `accounting_statement` select, `sendMessage` checkbox; POSTs to `/management/courseClasses/edit-class`
  8. **Cancel Class** (mutating): `cancel_by` select (Teacher Cancel / Student Cancel / Admin Cancel); `note` textarea; `sendMessage` checkbox; makeup tabs identical to Mark As Absent
  9. **Add Feedback** (mutating): `feedback_note` textarea, `feedback_files[]` file; POSTs to `/management/class-feedback`
  10. **Direct session room links** modal (same as item 1, confirmed in courseclasses-2)

**Safe actions:** View Direct Links, View Total Queues, Navigate to Show Course, Navigate back

**Mutating/dangerous actions:** Add Quick Queue, Mark as Attend, Send WhatsApp, Mark As Absent, Edit Class, Cancel Class, Add Feedback, Delete Fine

**Status differences across IDs 1–6:**
- courseclasses-1: Status=Waiting, Type=Trial, has Fine (3.00), timeline shows Pending→Waiting
- courseclasses-2: Status=Admin Cancel, has "Show Course" badge, system auto-cancel note visible, no Fine
- courseclasses-3: Status=Pending, date 2026-06-22, no Fine, timeline shows only "created"
- courseclasses-4: Status=Pending, date 2026-06-24, no Fine
- courseclasses-5: Status=Pending, date 2026-06-26, no Fine
- courseclasses-6: Status=Pending, date 2026-06-29, no Fine

**Variant summary:** All 6 are the same template. courseclasses-1 and courseclasses-2 show additional data states (Fine present; Admin Cancel status). courseclasses-3 through 6 are data-light pending sessions.

**UX improvements:**
- Delete Fine inline in the class header row lacks a confirmation step — dangerous for accidental clicks
- Makeup tab interaction buried inside Absent/Cancel modals creates deep nesting; consider a dedicated rescheduling flow
- "Mark as Attend" label copy says "no class details will send" — grammatically incorrect

---

### 9. management-family-feedback-categories-create

**Route:** `GET /management/family/feedback-categories/create` → `POST /management/family/feedback-categories`
**Module:** Parents/Families + Messages/Notifications (KPIs)

**Purpose:** Create a new feedback category used to classify student/family feedback.

**Key sections/flows:**
- Breadcrumb: raw i18n key exposed — "messages.Create Feedback Categories" (bug)
- Fields: `name` (text), `status` select (Active / Deactive), `description` textarea
- Submit POSTs to `/management/family/feedback-categories`

**Safe actions:** Navigate back via breadcrumb

**Mutating/dangerous actions:** Form submission creates a feedback category record

**Modals/forms:**
- `name` text, `status` select [Active, Deactive], `description` textarea

**Broken/empty:** i18n key not resolved in breadcrumb — "messages.Create Feedback Categories" shown literally

**UX improvement:** Fix i18n key resolution in breadcrumb. Status field uses "Deactive" (nonstandard English); consider "Inactive". Description field should have character limit hint.

---

### 10. management-home

**Route:** `GET /management/home`
**Module:** Dashboard / Home

**Purpose:** Primary admin operations dashboard. Shows today's class schedule with inline action controls for each class, plus 8 KPI counters for session lifecycle states.

**Key sections/flows:**
- 8 KPI stat cards (each has "Show Details" link → `?status=<value>`):
  - Total Classes, Sessions Pending, Attend Sessions, Waiting & Running, Cancel Sessions, Sessions Absent, Trials Sessions, Last Today Sessions
  - Captured values: Total=1, Pending=0, Attend=0, Waiting=1, Running=0, Cancel=0, Absent=0, Trials=1, Last Today=0
- Filter form (GET /management/home): `date_range` (required), `from_time`, `to_time`, `teacher_id` select, `family_id` select, `student_id` select, `type` select (session / Trial / Group)
- Settings modal (gear icon): `timeType` select (Today's Classes / Upcoming Classes / Past Classes) + `groupByTime` checkbox
- Class table (8 cols): `#`, `Class Time`, `Student/Group Name`, `Teacher Name`, `Course Details`, `Left hours`, `Class Status`, `Actions`
  - Class Status column: status badge + "Show Details" link → `/management/courseClasses/{id}`
  - Actions dropdown per row: Reverse Action, Add Queue, Attend Class, Cancel Class, Absent Class, Edit Class, Running, Send Reminder, Send WA Message, Delete Fine (when fine exists)
- Export button: POST to `/management/export-aa`
- Notification panel with "See All Notifications" and badge counts
- Shortcuts system: "Add shortcuts" form (POST `/management/shortcuts`) with `shortcut_title` and `shortcut_link`
- Global search form (GET `/management/search?query=`)
- All row-level modals (Add Quick Queue, Mark as Attend, Send WhatsApp, Mark As Absent, Edit Class, Cancel Class, Add Feedback) are embedded in the page — identical to the courseclasses detail modals

**Safe actions:** Search/filter, view class details, navigate sidebar

**Mutating/dangerous actions:** Mark as Attend, Add Queue, Send WhatsApp, Mark As Absent, Cancel Class, Edit Class, Delete Fine, Export, Add Shortcuts

**Modals/forms (11 total):**
1. Loading/notifications modal
2. Settings (timeType + groupByTime)
3. Add Quick Queue
4. Mark as Attend
5. Send WhatsApp Message
6. Mark As Absent
7. Edit Class
8. Cancel Class
9. Add Feedback
10. Recent Searches
11. Add Shortcuts

**UX improvement:** 11 modals on one page with no visible modal router creates maintenance and accessibility burden. Filter form requires `date_range` as mandatory but the page loads without it — consider defaulting to today. Export endpoint `/management/export-aa` URL is non-descriptive.

---

### 11. management-home-helper-1

**Route:** `GET /management/home?helper=1`
**Variant of:** management-home

**Purpose:** Same dashboard template loaded under a helper/assistant user context (helper=1 query param). The class table shows "No session today" — this user has no assigned sessions.

**Key differences from base:** Table is empty (no rows); all modals still rendered in DOM. The `helper=1` param appears to scope the data to a helper-role user view rather than the primary admin view.

**Broken/empty:** Class table shows empty state "No session today" — data-empty, not broken.

---

### 12. management-home-status

**Route:** `GET /management/home?status=` (empty value)
**Variant of:** management-home

**Purpose:** Home dashboard with status filter applied as empty string — effectively equivalent to no filter. Shows same data as the base home page.

**Key differences from base:** `status` field pre-populated as empty in the filter form hidden input. Table data identical to management-home (1 class row visible if data exists).

---

### 13. management-home-status-1

**Route:** `GET /management/home?status=1`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status=1 (Pending sessions). In the captured state, no matching sessions today — class table shows "No session today" empty state.

**Key differences from base:** `status=1` pre-set; table is empty (empty state confirmed). All 11 modals still rendered in DOM. The "Show Details" link on the Waiting & Running KPI card navigated back to `?status=` (all) during interaction capture.

---

### 14. management-home-status-2-10

**Route:** `GET /management/home?status=2,10`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status values 2 and 10 (Waiting and Running). In the captured state, shows 1 row — class ID 1 (Trial, Status=Waiting, 3.00 Fine badge visible).

**Key differences from base:** `status=2,10` pre-set; table has 1 live data row. "Delete Fine" buttons appear (2 copies — likely mobile/desktop duplicates in DOM). Interaction 3 navigates from class status badge "Waiting Show Details" to `/management/courseClasses/1`.

---

### 15. management-home-status-3-4

**Route:** `GET /management/home?status=3,4`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status values 3 and 4 (Attend and Admin Cancel, or equivalent numeric codes). In the captured state, no matching sessions today — table shows "No session today".

**Key differences from base:** `status=3,4` pre-set; table empty state. All 11 modals still present. The "Show Details" interaction navigated back to `?status=` (empty) which confirms the status cards link to different multi-value status groups.

---

### 16. management-home-status-5-6-7

**Route:** `GET /management/home?status=5,6,7`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status values 5, 6, 7 (likely Cancel Sessions grouping — Teacher Cancel / Student Cancel / Admin Cancel). No matching sessions in captured state.

**Key differences from base:** `status=5,6,7` pre-set; table empty state. Identical DOM to other empty-state home variants.

---

### 17. management-home-status-8

**Route:** `GET /management/home?status=8`
**Variant of:** management-home

**Purpose:** Home dashboard filtered to status=8 (Absent sessions). No matching sessions in captured state.

**Key differences from base:** `status=8` pre-set; table empty. All modals intact in DOM.

---

### 18. management-home-trial-0

**Route:** `GET /management/home?trial=0`
**Variant of:** management-home

**Purpose:** Home dashboard filtered by `trial=0` param (non-trial / regular sessions filter). In the captured state shows 1 row — class ID 1 (Trial type, Status=Waiting, 3.00 Fine). The filter param is `trial` not `status`; the filter form reflects `trial` as the hidden input name instead of `status`. "Delete Fine" appears (2 DOM copies). Navigating to the class detail goes to `/management/courseClasses/1`.

**Key differences from base:** Uses `trial` query param instead of `status`; filter form hidden input is `trial` not `status`. Shows 1 live data row with full action dropdown and Delete Fine. Same 11 modals.

---

## Module Synthesis

### Templates vs Variants

| Unique Template | Variant Count | Variant Pages |
|---|---|---|
| Bank List | 1 | management-banks |
| Bank Create | 1 | management-banks-create |
| Class Detail | 6 | management-courseclasses-1 through 6 |
| Feedback Category Create | 1 | management-family-feedback-categories-create |
| Home Dashboard | 10 | management-home, management-home-helper-1, management-home-status, management-home-status-1, management-home-status-2-10, management-home-status-3-4, management-home-status-5-6-7, management-home-status-8, management-home-trial-0 (counted as 1 canonical + 8 variants) |

**Unique templates: 4**
**Total pages: 18 (4 unique + 14 variants)**

---

### Status Code Map (inferred from KPI "Show Details" links)

| KPI Card | status param | Status name |
|---|---|---|
| Sessions Pending | 1 | Pending |
| Waiting & Running | 2,10 | Waiting + Running |
| Attend Sessions | 3,4 | Attend (two substates) |
| Cancel Sessions | 5,6,7 | Teacher Cancel / Student Cancel / Admin Cancel |
| Sessions Absent | 8 | Absent |
| Trials Sessions | (trial filter, not status) | Trial type flag |
| Last Today Sessions | (unknown) | — |

---

### Cross-Cutting Interactions

1. **Class lifecycle state machine:** All 11 modals on the Home Dashboard are replicas of the same modals on the Class Detail page. The frontend should implement these as a shared modal/dialog system driven by `class_id` context, not duplicated per-page.

2. **Makeup flow (4 tabs):** Used identically in both "Mark As Absent" and "Cancel Class" modals:
   - No Make-up
   - Auto Make-up class
   - Reschedule to another time (requires timezone selection: Student Timezone / Teacher Timezone, then date + time)
   - Add to Credit
   The reschedule tab is the only one that reveals a date/time form.

3. **Delete Fine:** Appears inline in the class table row on the Home Dashboard (when a teacher has an outstanding compensation record). It is a small POST form (method override DELETE) targeting `/management/teachers/{id}/compensations/{id}`. Occurs in 2 DOM copies per row (likely mobile + desktop layout duplicates). No confirmation dialog.

4. **WhatsApp messaging:** `send_teacher` and `send_student` checkboxes allow targeting specific parties. Message body supports link insertion (placeholder text references this). This is a direct integration hook.

5. **Helper context (`?helper=1`):** Scopes the dashboard view to a secondary/assistant user. The template is identical but data is user-scoped. Rebuild should treat this as a context parameter, not a separate route.

6. **Export:** `POST /management/export-aa` with only a CSRF token — no visible field for format or date range. The export likely inherits active filter state from hidden fields or server session. Rebuild should clarify export parameters.

7. **Shortcuts:** The admin can create named shortcuts with a URL. These appear to be personal quick-access links stored per user. POSTs to `/management/shortcuts`.

8. **Sidebar navigation (rich):** The sidebar reveals a comprehensive admin nav: Home, Teachers Schedule, Chat, New Requests, Sessions Analysis, Time Convertor, Public Holiday, Advertise & Notify, Tasks, Scheduled Actions, Families, Students, Courses, Groups, Teachers, KPIs, Classes KPI, Monthly Performance, monthly reports, Data Analysis, Accounting, Banks, Materials, Library, Settings. This forms the backbone of the rebuild's primary navigation schema.

---

### UX Improvements (Consolidated)

1. **Empty state — Banks list:** Add a "Create your first bank" CTA directly in the empty state instead of just "No data found".

2. **i18n bug — Feedback Category breadcrumb:** Raw key `messages.Create Feedback Categories` exposed. All translation keys must be resolved before render; add fallback handling.

3. **"Deactive" label:** Non-standard. Use "Inactive" consistently across the platform.

4. **Delete Fine — no confirmation:** An inline destructive action with no confirmation modal. Rebuild must add a confirm dialog (or use optimistic UI with undo).

5. **Home Dashboard modal overload:** 11 modals on a single page, all pre-rendered in the DOM. Rebuild should use lazy-mounted modals loaded on demand by `class_id` to reduce initial payload.

6. **Status filter numeric codes:** Status values are bare integers in query params. Rebuild API should accept named status slugs (e.g., `?status=waiting`) and map to integers server-side, or expose a status enum endpoint.

7. **Makeup tab UX:** The 4-tab makeup picker is buried 2–3 levels deep (row dropdown → modal → tab). A direct "Reschedule" button on the row would improve discoverability.

8. **Export endpoint naming:** `/management/export-aa` is not self-documenting. Rebuild should use `/management/exports/classes` or similar REST-idiomatic path.

9. **Timezone picker in reschedule:** Two radio buttons (Student TZ / Teacher TZ) with no display of what the actual timezones are. Rebuild should show the resolved timezone name (e.g., "Asia/Riyadh — 7:00 AM") next to the radio option.

10. **Mark as Attend copy:** "Mark as attend (no class details will send)" — grammatically incorrect. Rebuild copy: "Mark attended (no class summary will be sent)" / "Mark attended (with class summary)".

11. **Consistent 404 on logo asset:** `/storage/uploads/logo.png` returns 404 on every page. Rebuild should serve a locally hosted logo asset and not depend on the `/storage/uploads/` path.

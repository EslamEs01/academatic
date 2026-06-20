# Batch 31 — teacher · Dashboard / Home

---

### `management-home` — Home  (effective HTTP 200, entry via 302 redirect from /management/home → /teacher/home)

- Purpose: Teacher's main dashboard landing page, accessible via both `/management/home` (redirects) and `/teacher/home`; displays a personal summary widget and today's scheduled classes table with inline session actions.
- Key sections / flows:
  - **Personal summary card** — Teacher name, total hours (04:30), remaining hours (04:30), taken hours (00:00), attended percentage (0%), current salary (997.00 EGP), estimated earnings (1,537.00), fines (1,003.00), bonus (2,000.00); salary card links to `/teacher/update-result` filtered by current month.
  - **Today's Classes table** — 7 columns: #, Class Time, Student Name, Course Name (with duration + fine badge), Class Status, History (View link → `/teacher/course-history/{id}`), Action (Enter Again, End class, Send Reminder, Running). Date-picker filter (date + month + year) drives the table via GET search.
  - **Notification bell** — shows "5 new" badge; "View all notifications" links to `/teacher/monthly-plans`.
  - **Sidebar nav** — Home, Chat, Schedule, Students, Library, Tasks (badge "New"), monthly reports, Salaries, Salary Class Report, Log Out; language switcher (9 locales).
- Key SAFE actions: View course history, Enter Again (re-enter classroom link), date-filter search, navigate sidebar, view notifications, language switch.
- Key MUTATING/dangerous actions:
  - **End class** (Submit modal → POST `/teacher/classes-end`) — records remark, summary, homework, notes, file upload; must NOT be auto-fired.
  - **Send (Request Cancel)** (POST via `cancel_form__request`) — requests cancellation or reschedule/make-up; must NOT be auto-fired.
  - **Mark class as absent** (Submit → POST `/teacher/classes-absent`) — marks student absent with optional video + notes; must NOT be auto-fired.
  - **Save changes (Edit Class)** (POST `/teacher/edit-class`) — reschedules a session, optionally sends notification; must NOT be auto-fired.
  - **Save (Add shortcuts)** (POST `/teacher/shortcuts`) — adds a personal shortcut tile; must NOT be auto-fired.
- Important modals/forms:
  - **End class modal** — fields: remark (select: Excellent/Very Good/Good/Acceptable/Needs Improvement, required), summary (textarea, required), homework (textarea, required), notes (text, optional), images[] (file upload, optional). Triggered by "End class" row button. Posts to `/teacher/classes-end`.
  - **Request Cancel modal** — radio choice: Reschedule Class vs. Auto Make-up Class (appends session to end of course); date+time picker for new slot. Posts to `cancel_form__request` (action URL blank — uses current page with JS intercept).
  - **Mark class as absent modal** — video upload (≤10 MB) + notes textarea. Posts to `/teacher/classes-absent`.
  - **Edit Class modal** — new date+time picker, Send Notification checkbox, duration select (required). Posts to `/teacher/edit-class`.
- Variant-of: Same rendered page as `teacher-home`; `management-home` slug exists because `/management/home` 302-redirects to `/teacher/home`. Both page reports are identical in structure, content, forms, buttons, and DOM counts — they represent a single underlying template.
- Broken/empty: Logo image returns 404 (`/storage/uploads/logo.png`). Initial `/management/home` request returns 302 (expected redirect, not a broken page). Actual page renders at 200. Today's classes table shows only 1 row (live data snapshot, not a "no data" empty state).
- UX improvement for the rebuild: The salary card mixes three financial figures (estimated, fines, bonus) in a single dense text block with no visual hierarchy; split into distinct labeled metric chips or a mini-table so teachers can scan their compensation breakdown at a glance without following a link.

---

### `teacher-home` — Teacher Home  (HTTP 200)

- Purpose: Canonical teacher dashboard at `/teacher/home` — identical content and behavior to `management-home` (which redirects here); serves as the true entry point for the teacher role.
- Key sections / flows: Identical to `management-home` — personal summary card, Today's Classes date-filtered table, notification bell, full sidebar nav. No structural or content difference detected between the two captured snapshots.
- Key SAFE actions: Same as `management-home` — date filter search, View (course history), Enter Again (classroom re-entry), sidebar navigation, language switch.
- Key MUTATING/dangerous actions: Same set — End class, Request Cancel/Send, Mark as absent, Edit Class, Add shortcuts (Save). All POST to the same endpoints as documented above.
- Important modals/forms: Identical 6 modals/forms as `management-home` — End class, Request Cancel, Mark as absent, Edit Class, Add shortcuts, and one unnamed Modal 1 (no content captured, likely a notification dropdown).
- Variant-of: `management-home` (both render the same template; `management-home` is a redirect alias).
- Broken/empty: Same 404 on logo; same single-row live table snapshot. No true empty/error state captured.
- UX improvement for the rebuild: The "End class" workflow requires three mandatory free-text fields (summary, homework, remark) submitted in a single modal; for mobile teachers, break this into a stepped form (step 1: remark + attendance, step 2: summary + homework, step 3: notes + upload) to reduce cognitive load and accidental submission of empty fields.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Teacher Home dashboard is the primary operational screen for the teacher role. Core entities: Teacher (with salary/hours KPIs), Class Session (scheduled slot with status, course, student), Course History, and Shortcuts. The page is the hub from which a teacher monitors today's workload, takes session-level actions (start, end, reschedule, cancel, mark absent), and tracks their compensation in real time.

**Distinct page templates vs variant count:**
- Unique templates: **1** (the teacher home dashboard)
- Variant pages: **1** (`management-home` is a redirect alias to the same template; counted as a variant, not a distinct template)
- Total pages in batch: 2

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Date-picker filter (GET, safe) — drives Today's Classes table
- 5 modal flows, 4 of which are mutating/dangerous:
  - End class (POST /teacher/classes-end) — DANGEROUS: finalizes a session with remark + content
  - Request Cancel (POST, blank action with JS) — DANGEROUS: cancels or reschedules a session
  - Mark as absent (POST /teacher/classes-absent) — DANGEROUS: records student absence
  - Edit Class (POST /teacher/edit-class) — DANGEROUS: reschedules time/duration, may trigger notifications
  - Add shortcuts (POST /teacher/shortcuts) — mutating but low-stakes
- Notification dropdown (Modal 1) — safe/read-only

**Improvements for the new platform:**

1. **Route clarity**: Eliminate the `/management/home` → `/teacher/home` redirect; a single canonical route avoids confusion and crawl duplication.
2. **Salary card redesign**: Break estimated/fines/bonus into distinct metric chips with color coding (green for bonus, red for fines) and expose them without requiring a link navigation.
3. **Session action safety**: "End class", "Mark as absent", and "Request Cancel" are irreversible or operationally significant — add a confirmation step (SweetAlert-style confirm or a two-step review before POST) in the new UI.
4. **End class stepped modal**: Convert the single-screen 3-required-field modal into a multi-step wizard, especially for mobile teachers.
5. **Edit Class notification opt-in**: The "Send Notification" checkbox in Edit Class is easy to miss; make it an explicit toggle with a preview of the message to be sent.
6. **Empty/loading states**: No "no classes today" empty state was captured; the rebuild must define an illustrated empty state and a skeleton loader for the table.
7. **RTL-first**: The teacher's name (`المعلم محمد صادق صادق`) is Arabic but the page is LTR; the rebuild should support RTL layout at the user level, not just at the locale/lang level — particularly important for Arabic-speaking teachers.
8. **Logo 404**: A broken logo image is displayed on every page; the rebuild asset pipeline must validate and serve a real logo.
9. **Mobile**: The 7-column table (with multiple action buttons per row) collapses poorly on small screens; replace with an expandable row-card pattern on mobile.
10. **Date filter UX**: The current filter requires manual date text + month select + year number — replace with a single unified date-range picker component.
11. **Accessibility**: Multiple modals lack ARIA `role="dialog"`, focus traps, and `aria-labelledby`; rebuild must enforce accessible modal patterns throughout.

**Anything that needs owner/backend confirmation:**

- The `cancel_form__request` form has a blank `action` attribute — it relies on JS to intercept and POST; backend team should confirm the actual endpoint and whether CSRF is correctly handled.
- "Auto Make-up Class" option appends a session to the end of the course — confirm whether this is backend-automated or requires admin approval.
- Salary figures show a large discrepancy between estimated (1,537), actual (997), fines (1,003), and bonus (2,000) — confirm the calculation logic for the rebuild's compensation display.
- Modal 1 content was not captured; confirm what it renders (likely a notifications list).

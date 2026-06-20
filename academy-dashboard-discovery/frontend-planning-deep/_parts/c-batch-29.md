# Batch 29 — teacher · Classes / Sessions + Salary Reports

---

### `teacher-course-history-1-class` — Class History (Trial class detail)

- **Purpose:** Shows the course history detail view for a specific trial class session, scoped to a single course enrollment (course ID 1).
- **Key sections / flows:** Single card "Class History Trial" — displays teacher name, student name, scheduled datetime, course name, class remark, notes, class summary, homework, and teacher/student file attachments. A "Details" link opens a modal with fuller session info.
- **Key SAFE actions:** View Details modal (read-only), navigate sidebar, view notifications.
- **Key MUTATING/dangerous actions:** None specific to session data on this page — the only mutating controls are global chrome (Add Shortcuts / Save shortcuts form); no session-edit or cancel button present on this page.
- **Important modals/forms:** Modal "Details" — read-only preview of session record (Close only). Global "Add shortcuts" modal (title + link fields, Save).
- **Variant-of:** Base template: `teacher-course-history-[id]-class` — this is the "Trial" status variant of the class history detail view, parameterized by course ID in the URL.
- **Broken/empty:** No 404/500 or empty-state signals; page loaded 200. Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all teacher pages.
- **UX improvement for the rebuild:** The detail card shows all fields inline with `--` as null values; replace null dashes with labeled empty states (e.g., "No summary provided") and add clear section separators. The "Details" modal duplicates most of the card — consolidate into an expandable card or slide-over panel instead.

---

### `teacher-course-history-2-class` — Class History (Sessions — Admin-cancelled class detail)

- **Purpose:** Shows the course history detail view for a regular (non-trial) session class, displaying an auto-cancelled session with a system-generated cancellation note.
- **Key sections / flows:** Single card "Class History Sessions" — fields identical to the Trial variant (teacher, student, datetime, course name, remark, note, summary, homework, file attachments). Status badge is "Admin Cancel" rather than "Trial/Waiting". The note field contains an important auto-cancel explanation: "This Session Has Been Automatically Cancelled, Because Neither Teacher Nor Student Attended It And It Stayed Pending."
- **Key SAFE actions:** View Details modal, sidebar navigation, notifications.
- **Key MUTATING/dangerous actions:** Same as above — none session-specific; only global Add Shortcuts.
- **Important modals/forms:** Modal "Details" (read-only, Close only). Global "Add shortcuts" modal.
- **Variant-of:** `teacher-course-history-[id]-class` — same template as the Trial variant above; difference is the session type ("Sessions" vs. "Trial") and status badge ("Admin Cancel" vs. "Waiting"). Both are variants of one base detail template.
- **Broken/empty:** Page returned 200; no empty state. Logo 404 persists.
- **UX improvement for the rebuild:** Auto-cancel reason is buried in the plain-text "Note" field. In the rebuild, surface auto-cancellation as a prominent status banner with an icon and reason code, distinct from user-entered notes, so teachers immediately understand why a session disappeared.

---

### `teacher-salary-class-report` — Salary Class Report (filter/search entry)

- **Purpose:** Entry page for a teacher's salary breakdown by class; lets the teacher filter by date range and group-by dimension (Student or Date or Session) before viewing results via a GET submit.
- **Key sections / flows:** One card "Salary Class Report" containing: a date-range picker (`date_range`, MM-DD-YYYY format), a "Group By" select (options: Student, Date, Session), and a Submit button that GETs `/teacher/update-result` with the chosen params. No results table is visible on the initial load — the page is a filter entry point only.
- **Key SAFE actions:** Set date range, choose group-by, submit filter (GET — read-only query), view notifications.
- **Key MUTATING/dangerous actions:** None from a data perspective — the Submit fires a GET. The only mutating global chrome is Add Shortcuts / Save.
- **Important modals/forms:** Form 2 (`/teacher/update-result`, GET): fields `date_range` (text, flatpickr range) + `filter` select (group-by). Global "Add shortcuts" modal.
- **Variant-of:** Unique template — no other salary-class-report filter page found in prior batches.
- **Broken/empty:** 200 OK; no results visible because no filter has been submitted yet. Logo 404 persists.
- **UX improvement for the rebuild:** The filter form uses a plain text input for date range (`MM-DD-YYYY`) rather than a proper date-range picker component. In the rebuild, use a native date-range picker with presets (This Month, Last Month, Custom) and show a result table inline below the filter rather than requiring a full page reload.

---

### `teacher-session-class-room-mq-2` — Session Classroom (Live Room — teacher daily dashboard)

- **Purpose:** The teacher's live session room / daily schedule hub: shows real-time salary KPIs, a date-filtered table of today's classes with per-row actions (View history, Enter Again, End class, Send Reminder), and multiple in-context modals for end-of-class workflow, cancellation requests, absence recording, and rescheduling.
- **Key sections / flows:**
  - **KPI strip:** Total Hours (04:30), Remaining Hours (04:30), Teacher name, Taken Hours (00:00), Attended Percentage (0%), Your Salary card with breakdown: Estimated 1,537.00 EGP / Fines 1,003.00 / Bonus 2,000.00 / Salary till today 997.00 EGP. Salary card links to `/teacher/update-result` (the salary class report).
  - **Today's Classes table (7 columns):** #, Class Time, Student Name, Course Name (with duration and fine info), Class Status (Trial/Waiting badges), History (View link → course history), Action row-buttons (Enter Again, End class, Send Reminder).
  - **Date search form (GET):** date + month + year inputs; searches by date to filter the session table.
- **Key SAFE actions:** View (→ course history), Enter Again (re-enter classroom link), date search/filter, view salary summary, navigate sidebar.
- **Key MUTATING/dangerous actions:**
  - **End class (Submit form → `/teacher/classes-end`):** posts remark (required select), summary (required textarea), homework (required textarea), notes, file attachments, class_id. Finalizes the class record.
  - **Send (cancel request → `/` POST `cancel_form__request`):** posts cancel/reschedule request with class_id, family_id, type (Reschedule or Auto Make-up), new date/time.
  - **Mark class as absent (Submit form → `/teacher/classes-absent`):** posts class_id, optional video upload (max 10 MB), notes. Records teacher/student absence.
  - **Edit Class (Save changes → `/teacher/edit-class`):** posts session_id, parent_id, teacher_id, new date/time, duration, optional "Send Notification" checkbox. Reschedules an existing session.
- **Important modals/forms:**
  - Modal "End class": remark (Excellent/Very Good/Good/Acceptable/Needs Improvement — required), summary (required), homework (required), notes, file upload. Submit → `/teacher/classes-end`. Dangerous — finalizes session permanently.
  - Modal "Request Cancel": radio type (Reschedule Class / Auto Make-up), new date+time picker, Send → POST. Dangerous — triggers cancel/reschedule workflow.
  - Modal "Mark class as absent": video upload + notes, Submit → `/teacher/classes-absent`. Dangerous — marks absence on record.
  - Modal "Edit Class": date/time picker, duration select, Send Notification checkbox, Save changes → `/teacher/edit-class`. Dangerous — modifies existing session schedule.
- **Variant-of:** Unique template — the core teacher live/daily session room; the URL contains a base64 `MQ==` (decodes to "1") + `/2` which appear to be encoded course/student identifiers. No equivalent template seen in prior batches.
- **Broken/empty:** 200 OK; one session row shown. Logo 404 persists. The "Taken Hours" shows 00:00 and "Attended Percentage" is 0% — likely accurate for this test session state, not a data error.
- **UX improvement for the rebuild:** The "End class" modal requires three mandatory fields (remark, summary, homework) with no autosave or draft state — if the teacher closes the modal accidentally they lose input. In the rebuild, persist draft state in `localStorage` or via an autosave API call while the modal is open, and add a confirmation guard before closing if any field is filled.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the teacher-facing session lifecycle: the live classroom room (daily schedule + real-time salary KPIs), the post-session course history detail (both Trial and regular Sessions types), and the salary-by-class report filter. Core entities: Session/Class (with status: Trial, Waiting, Admin Cancel), Teacher, Student, Course (with duration and fine metadata), Salary (estimated, fines, bonus, actual).

**Distinct page templates vs variant count:**
- 2 unique templates: `teacher-session-class-room-[id]` (live room dashboard) and `teacher-salary-class-report` (filter entry).
- 1 base detail template with 2 variants: `teacher-course-history-[id]-class` — one for Trial status, one for Sessions/Admin-Cancel status. Both share identical DOM structure; only the session type label and status badge differ.
- Total pages: 4 (2 unique + 2 variants).

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Dangerous modals (must require confirmation in rebuild): End class (finalizes session — remark/summary/homework required), Request Cancel (triggers admin workflow), Mark as Absent (records absence), Edit Class (modifies schedule).
- Safe modals: Details (read-only), Add Shortcuts (global chrome).
- Date/month/year filter on session room is GET-based (safe).
- Salary report filter is GET-based (safe).
- The "Send Reminder" action in the session table row has no modal captured — backend behavior unclear; needs confirmation whether it immediately sends a notification or opens a confirm step.

**Improvements for the new platform:**

1. **Session room layout:** Consolidate the date-search form and KPI strip into a sticky top bar; the current layout scatters them. On mobile, collapse the KPI strip into a swipeable summary card.
2. **Status color system:** "Trial", "Waiting", "Admin Cancel" need distinct semantic colors (e.g., info/blue, warning/amber, error/red) — currently appear as plain badges. Apply RTL-compatible status pill components.
3. **End class modal — draft persistence:** Add autosave to `localStorage` or a draft API endpoint so mandatory fields (remark, summary, homework) survive accidental modal close.
4. **Course history detail — null display:** Replace `--` null values with styled empty-state placeholders. Merge the redundant "Details" modal into an expandable inline section.
5. **Auto-cancel reason surfacing:** Auto-cancel system messages are buried in the free-text "Note" field; rebuild should use a dedicated `cancellation_reason` field displayed as a banner with icon and structured reason code.
6. **Salary report filter:** Replace the plain text date range input with a date-range picker component with preset shortcuts (This Month / Last Month). Show results inline without full page reload.
7. **RTL-first:** All four pages are LTR-only. Arabic content appears inline (teacher/student names in Arabic script) but layout doesn't flip. Rebuild must apply RTL layout for Arabic locale — especially tables, modal CTAs, and the KPI strip.
8. **Accessibility:** 6 modals on the session room page have no confirmed focus trapping or ARIA roles. Rebuild must implement `role="dialog"`, `aria-modal`, `aria-labelledby`, and Escape-to-close on all modals.
9. **Export:** Salary class report has no export action visible. Add CSV/PDF export on filtered results.
10. **Send Reminder action:** Unclear if this immediately sends a message or opens a confirm dialog. Needs backend confirmation — must not fire silently in the rebuild.

**Anything that needs owner/backend confirmation:**
- What does "Send Reminder" do exactly — immediate send or confirm step? Should it be gated behind a confirmation modal in the rebuild.
- The URL segment `MQ==` is base64 for "1" — confirm whether the session room route should use encoded IDs or plain numeric IDs in the new API design.
- "Auto Make-up Class" cancel type appends a new session at the end of a course — confirm business rule and who approves it (teacher alone, or requires admin sign-off).
- Fine amounts (3.00 Fine shown in course name field) appear embedded in the course name string — confirm whether this is a proper API field or a text concatenation hack that should be a separate `fine` attribute in the new data model.

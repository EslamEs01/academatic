# Batch 39 — family · Classes / Live Sessions + Students

### `student-today-sessions` — Today's Sessions  (HTTP 200)

- Purpose: Shows the family/student a filterable list of today's scheduled live classes with per-session actions (cancel request, file upload).
- Key sections / flows:
  - Single H5 heading "Today's Classes" anchors the page.
  - Date-filter form (GET, date picker — MM/DD/YYYY) lets the student look up sessions on a specific date.
  - Data table (10 columns): Class Date, Class Time, Student Name, Teacher Name, Course Name, Subscription, Class Status, History, Files, (action column). Table captured with 0 rows (empty state at time of crawl).
  - Header badge showing notification count (0 New / 5 new).
  - "View all invoices" quick-link navigates to billing.
  - Two month-select filter dropdowns (appear to be secondary scope filters, possibly for the notification panel).
- Key SAFE actions: Date search (GET form), "View all invoices" navigation, Close modal buttons, "Start" voice-record toggle inside upload modal.
- Key MUTATING/dangerous actions:
  - **Request Cancel** (POST `cancel_form__request`) — submits a cancellation request with optional reschedule (class_id, teacher_id, type radio: "Reschedule Class" vs "No Reschedule", new date/time). The "No Reschedule" branch explicitly warns the student they will not get a replacement session.
  - **Upload File** (POST `/student/upload-files`) — uploads files (files[]) or a recorded audio blob (audio hidden field) for a specific session (session_id).
  - **See All Notifications** (POST form, non-GET) — likely marks notifications as read server-side.
- Important modals/forms:
  - **Modal: Request Cancel** — fields: class_id (hidden), teacher_id (hidden), type (radio: Reschedule / No Reschedule), date (text), time (text), Hour (number), Minute (number). Action empty string (submits to current URL or resolved by JS). Buttons: Close, Send.
  - **Modal: Upload File** — fields: session_id (hidden), files[] (file input), audio (hidden, for voice recording blob). Includes an in-browser voice recorder ("Start / 00:00"). Buttons: Close, Start (record), Upload.
- Variant-of: unique template (no other "today-sessions" variant observed in this batch).
- Broken/empty: Table rendered with 0 rows — no "No data" empty-state UI is described; a logo image 404s (`/storage/uploads/logo.png`), and a custom stylesheet 404s (`/assets/custom/style.css`).
- UX improvement for the rebuild: Replace the flat text date picker with a proper calendar/date-range component and add a visible empty state (illustration + message) when no sessions exist for the chosen date. The "No Reschedule" radio option carries significant consequence (permanent loss of a session) — add a dedicated confirmation step or warning callout before the Send action is enabled.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single-page batch covers the family/student "Today's Sessions" view — the primary daily touchpoint for a student to check, manage, and act on their live class schedule. Core entities: Session (class), Student, Teacher, Course, Subscription, File/Attachment, Cancellation Request.

**Distinct page templates vs variant count:**
- Unique templates: 1 (`student-today-sessions`)
- Variant pages: 0

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Date filter (GET, safe) — scopes table by date.
- Month dropdowns (safe, secondary scope filter, possibly for notification panel).
- "Request Cancel" modal — **dangerous**: irreversible if "No Reschedule" option is chosen; must have a confirmation guard in the rebuild.
- "Upload File" modal — mutating (file POST), but reversible; low danger level.
- Notifications panel open (dropdown interaction captured) — "See All Notifications" is a POST that mutates read-state.

**Improvements for the new platform:**
1. **Empty/loading states:** Table shows 0 rows with no empty-state UI — add an illustration and "No sessions today" message with a link to the weekly schedule.
2. **Dangerous action safeguard:** The "No Reschedule" cancellation path must require a separate confirmation dialog clearly stating the consequence before Send is enabled.
3. **Date picker UX:** Replace MM/DD/YYYY text input with a locale-aware calendar widget; support RTL calendar display for Arabic users.
4. **RTL-first:** The page is LTR-only; a rebuild must flip the layout, sidebar, table, and modal button order for Arabic/Urdu.
5. **File upload UX:** The upload modal mixes file upload and voice recording in a small space — split into two clearly labelled tabs or steps; show upload progress and file-size limits.
6. **Status column:** "Class Status" column in the table needs colour-coded badges (scheduled, completed, cancelled, rescheduled) rather than raw text.
7. **Mobile:** A 10-column table is unusable on mobile — collapse to card layout with expandable row for detail and action buttons.
8. **Broken assets:** Logo 404 and custom stylesheet 404 need to be resolved or removed from the template; the rebuild should not carry forward these broken references.
9. **Accessibility:** Modals need focus trap, Escape-to-close, and aria-role="dialog"; voice-record Start button needs an accessible label and live region for recording state.
10. **Notification POST:** "See All Notifications" should use a dedicated API endpoint with explicit feedback (toast), not a hidden form submit.

**Anything that needs owner/backend confirmation:**
- Confirm whether the empty table (0 rows) is a data gap or expected for the crawl date — need to see a populated state to validate all column types and row-action placements.
- Confirm the POST target for `cancel_form__request` (action attribute is empty) — is it handled by JS fetch or a traditional form redirect?
- Confirm maximum file size and permitted types for `/student/upload-files`.
- Confirm whether voice-recording upload (`audio` hidden field) sends a base64 blob or a multipart binary.

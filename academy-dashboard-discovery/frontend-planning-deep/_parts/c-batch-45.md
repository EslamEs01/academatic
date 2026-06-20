# Batch 45 — family · Students (Courses / Class History / Feedback / Trial)

---

### `student-feedbacks` — Student Feedback  (HTTP 200)

- **Purpose:** Family-role landing page for tracking scheduled feedback meetings between the academy and family members; currently shows an empty table.
- **Key sections / flows:** Single card titled "Student Feedback" containing a table with columns: #, Meeting Date, Meeting Time, Meeting Manager, Family Members, Action. Notification badge (0 New / 5 new) in header. No data loaded at capture time.
- **Key SAFE actions:** View all invoices (→ billing), sidebar navigation (Home, Schedule, Classes Summary, Courses, Billing, Library).
- **Key MUTATING/dangerous actions:** "See All Notifications" (POST form, classified unsafe — non-GET submit). Logout (POST form).
- **Important modals/forms:** One modal captured via dropdown/menu interaction (content not extracted beyond the empty state). No meaningful standalone form beyond logout.
- **Variant-of:** Unique template — dedicated feedback-meeting list for the family portal; no other page in this batch shares this layout.
- **Broken/empty:** Table contains "No data found" — zero rows loaded. Logo image returns 404 (`/storage/uploads/logo.png`). Custom stylesheet 404 (`/assets/custom/style.css`).
- **UX improvement for the rebuild:** Replace the bare "No data found" empty state with an informative illustration + explanation of what feedback meetings are and how to request one; add date-range filter so families can narrow history once data exists.

---

### `student-request-trial` — Request Trial  (HTTP 200)

- **Purpose:** Two-step wizard allowing a family member to book a trial lesson — either for a new child or an existing registered child — including date/time/course selection.
- **Key sections / flows:** H4 "Request Trial" with a two-tab wizard: Step 1 "Student Details" (create new child: name, age, language, gender; or choose existing child from dropdown), Step 2 "Trial Info" (date YYYY-MM-DD, time HH:MM, duration in mins, course select). Previous/Next/Submit navigation anchors. No table.
- **Key SAFE actions:** Previous/Next step navigation (anchor-based, same URL); sidebar navigation.
- **Key MUTATING/dangerous actions:** "Submit" (POST to `/student/request-trial`) — creates a trial booking; "See All Notifications" (unsafe submit).
- **Important modals/forms:** Form `steps-uid-0` (POST `/student/request-trial`): 12 fields — `request_type` radio (new/existing), `name`, `age`, `language` (10 locales), `gender`, `student_id` (choose existing child), `date`, `time`, `duration`, `course`. Meaningful form; requires validation on all date/time fields.
- **Variant-of:** Unique template — multi-step trial booking wizard; not replicated elsewhere in this batch.
- **Broken/empty:** Logo 404, custom stylesheet 404. No broken page state; page loads with data (one existing child "منار حسن" visible in student_id dropdown).
- **UX improvement for the rebuild:** Replace the wizard's anchor-based Previous/Next with proper client-side step state; add inline validation per step before advancing (date format, required fields); show a confirmation summary screen before final submit rather than posting immediately.

---

### `student-student-history-fillter-2` — Classes Summary (History Filter)  (HTTP 200)

- **Purpose:** Family view of session history across all (or a selected) child — a filterable table showing past class dates, times, and teachers, with drill-down modals for class detail.
- **Key sections / flows:** H5 "History of : All Student". Filter bar: single `select[name=filter]` (populated with at least "منار حسن") + Submit button. Table: Class Date & Time, Teacher Name, Show (action). Zero rows at capture. Two "Student Details" modals captured: Modal 2 has tabs Class Remark / Class Summary / Homework Note / Files / Teacher / Student; Modal 3 has Class Summary / Homework Note / File. Both have Close buttons.
- **Key SAFE actions:** Student select + Submit (GET form to `/student/student-history-fillter`), "Show" row action (opens detail modal), Close modal buttons.
- **Key MUTATING/dangerous actions:** "See All Notifications" (POST, unsafe). "Submit" filter button classified mutating by the crawler (but is a GET form — low real risk). Logout POST.
- **Important modals/forms:** "Student Details" modal (Modal 2): tabs for Class Remark, Class Summary, Homework Note, Files, Teacher, Student — read-only drill-down. "Student Details" modal (Modal 3): Class Summary, Homework Note, File — also read-only. Both are safe/informational.
- **Variant-of:** Unique template — the only class-history table for the family role in this batch. (The URL `?2` is a query-param variant of the base route `/student/student-history-fillter` but captured as the only instance here.)
- **Broken/empty:** Table has 0 rows at capture ("No data" implied). Logo 404, custom stylesheet 404.
- **UX improvement for the rebuild:** The dual-tab modal structure (Modal 2 vs Modal 3 appear to be two different data shapes for the same detail view) should be unified into a single adaptive detail panel; add date-range filter alongside the student selector so families can scope history without scrolling through a long table.

---

### `student-studentslist` — Courses / All Account Subscriptions  (HTTP 200)

- **Purpose:** Family dashboard listing all subscription/course enrollments across children, with inline feedback submission per course row.
- **Key sections / flows:** H5 "All Account Subscriptions". Student selector (`select[name=student]`, GET form `#studentform`) to filter the table. Table (8 columns): #, Student Name, Status, Teacher Name, Course Name, Subscription, History, Feedback About Course. One row captured shows "not have any courses" — empty state via badge text. Feedback modal (Modal 2) accessible per row.
- **Key SAFE actions:** Student filter (GET), History column link (navigation to class history), sidebar navigation, View all invoices.
- **Key MUTATING/dangerous actions:** "Submit" inside feedback modal (POST to `/student/feedback`) — posts teacher rating, class interactivity score, audio/video quality, teaching style notes, complaints, additional comment. "See All Notifications" (unsafe submit). Logout.
- **Important modals/forms:** "Feedback about your teacher" modal (Form 3, POST `/student/feedback`): fields — `student_name` (hidden), `teacher_name` (hidden), `teacher_rating` (hidden, star widget), `class_interactive` (hidden, rating widget), `see_hear` (select: Yes/No), `like_teacher` (textarea, required), `complain` (textarea, required), `additional_comment` (textarea, optional). This is a real mutating action — submits a permanent teacher review.
- **Variant-of:** Unique template — subscription/course list with embedded feedback submission.
- **Broken/empty:** Table row shows "not have any courses" (empty state badge, not a proper empty state component). Logo 404, custom stylesheet 404.
- **UX improvement for the rebuild:** The feedback form hidden fields (`teacher_rating`, `class_interactive`) suggest star/slider widgets that are presumably injected via JS but not captured — the rebuild must implement accessible rating widgets (keyboard-navigable stars, slider with ARIA) rather than hidden inputs; also add a confirmation dialog before submitting feedback since it is permanent.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The family/student portal (`/student/*`) provides a parent or guardian a self-service view of their children's academic life at the academy. Core entities: Child/Student profiles, Course Subscriptions, Session/Class History, Feedback Meetings, Trial Requests, Teacher Ratings. All pages share the same sidebar (Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout) and LTR English layout.

**Distinct page templates vs variant count:**
- 4 unique templates: student-feedbacks, student-request-trial, student-student-history-fillter-2, student-studentslist.
- 0 pure query-param/pagination variants within this batch (the `?2` URL is the only captured instance of that base route).
- Total: 4 unique, 0 variants.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Student selector (GET filter) appears on both history and courses pages — safe, read-only.
- "Student Details" drill-down modals on the history page are safe/read-only (class remark, homework, files).
- Feedback modal on the courses page is DANGEROUS: permanent POST of teacher ratings and subjective comments. Must have a confirmation step.
- Two-step trial wizard (tabs) on request-trial is mutating (POST booking) — requires inline validation before submit.
- "See All Notifications" button is a POST submit on every page — crawler flags it as unsafe; the rebuild should ensure this is a safe read-only operation or clearly gate it.
- Logout POST form is present on every page.

**Improvements for the new platform:**
1. **Empty states:** Every page in this batch rendered with zero or near-zero real data. Replace bare "No data found" text with informative empty states (illustration + call to action, e.g. "Request a trial to get started").
2. **Feedback form accessibility:** Replace hidden JS-driven star/rating inputs with proper accessible rating components (ARIA role=radiogroup, keyboard navigation). Add a confirmation modal before posting.
3. **Trial wizard UX:** Implement true client-side step validation (prevent advancing with blank required fields). Add a summary/review step before final submission. Use a progress indicator (step 1 of 2 with visual progress bar).
4. **Class history:** Unify the two different "Student Details" modal variants into one adaptive detail panel. Add date-range picker alongside the student filter.
5. **RTL readiness:** All pages captured LTR/en; the sidebar includes Arabic, Urdu, and other RTL language links. The rebuild must be RTL-first — layout, table column order, and modal positioning must flip correctly on locale switch.
6. **Logo 404:** Every page fails to load `/storage/uploads/logo.png` — backend fix needed, but the rebuild should use a CSS/SVG fallback rather than a broken image.
7. **Mobile / teacher-family context:** The sidebar navigation has 8 items; on mobile this needs a collapsible drawer. The trial booking form's date/time text inputs should become native date/time pickers on touch devices.
8. **Navigation clarity:** Sidebar label "Courses" links to `/student/studentslist` (subscriptions, not a course catalog); rename to "Subscriptions" or "My Courses" for clarity.
9. **Status colors:** The "Status" column in the courses table has no visible status badges in the captured data — the rebuild should define a clear color-coded status set (active/inactive/pending/suspended) with accessible contrast ratios.
10. **Search:** No text search exists on any of these pages; adding a name/course search on the studentslist and history pages would significantly reduce friction for families managing multiple children.

**Needs owner/backend confirmation:**
- What states does the "Status" column in studentslist represent? What color/badge mapping is expected?
- Are feedback submissions editable after posting, or one-time permanent?
- The `?2` param on the history URL: is this intentional filtering (e.g., filtering by child ID = 2) or a legacy artifact?
- The "See All Notifications" POST — is this a mark-as-read operation? Should be confirmed safe before the rebuild exposes it.
- Trial booking confirmation flow: does the backend send an email/SMS confirmation? Does the family portal show pending trial status?

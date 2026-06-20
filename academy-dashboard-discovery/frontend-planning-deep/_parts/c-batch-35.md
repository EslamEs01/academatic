# Batch 35 — teacher · Students / Salary Class Report

---

### `management-student-1` — Student 1 (teacher-context redirect)

- **Purpose:** Teacher's home dashboard for a specific student (ID=1), showing today's scheduled classes, teacher KPIs (total hours, salary, fines, bonus), and inline class management actions.
- **Key sections / flows:** KPI strip (Total Hours 04:30, Remaining Hours 04:30, Taken Hours 00:00, Attended % 0%, Salary till today 997.00 EGP, Estimated 1,537.00, Fines 1,003.00, Bonus 2,000.00); "Today's Classes" table with date-picker filter (date / month / year); 1-row table showing class at 04:00 AM with student محمد احمد, course "arabic Duration (30)m (3.00 Fine)", status "Trial Waiting"; row actions: View (history), Enter Again (classroom link), End class, Send Reminder, Running toggle.
- **Key SAFE actions:** View course history (`/teacher/course-history/1`), Enter Again classroom (`/teacher/session-class-room/MQ==/2`), date/month/year search filter (GET), view notifications.
- **Key MUTATING/dangerous actions:** End class (POST `/teacher/classes-end` — remark + summary + homework + notes + images); Mark class as absent (POST `/teacher/classes-absent` — video + notes); Request Cancel/Reschedule (POST `cancel_form__request` — reschedule or auto-makeup with new date/time); Edit Class (POST `/teacher/edit-class` — new date, time, duration, send notification toggle); Send Reminder (submit form — mutating).
- **Important modals/forms:**
  - *Request Cancel* — radio choice: Reschedule Class vs Auto Make-up Class (adds session to end of course); fields: date, month, year, time (hour, minute). Key choice: auto-makeup silently extends course length.
  - *End class* — remark (required select: Excellent/Very Good/Good/Acceptable/Needs Improvement), summary (required textarea), homework (required textarea), notes (optional), file upload (images[]). POST to `/teacher/classes-end`.
  - *Mark class as absent* — video upload (≤10MB), notes. POST to `/teacher/classes-absent`.
  - *Edit Class* — new date/time, duration select (required), optional "Send Notification" checkbox. POST to `/teacher/edit-class`.
- **Variant-of:** This URL (`/management/student/1`) redirects to `/teacher/home` (HTTP 302 observed in network log), then renders the teacher home with student context. It is a navigation/redirect variant of the teacher home dashboard, not a standalone unique template.
- **Broken/empty:** Logo image 404 (`/storage/uploads/logo.png`). Class table has 1 row (low data but not empty). No other broken states.
- **UX improvement for the rebuild:** The "End class" modal bundles remark, summary, homework, and file upload into one dense form with no auto-save; split into a stepper (Step 1: remark + summary; Step 2: homework; Step 3: notes/files) with a confirmation step before final submission, preventing accidental empty submissions.

---

### `teacher-students` — Monthly Reports (Student List)

- **Purpose:** Teacher-facing list of their assigned students, intended as the entry point for submitting monthly progress reports per student per course.
- **Key sections / flows:** Single card "List of Students" containing a 4-column table (#, Student Name, Country, Report For Student). Table showed 0 rows at capture time (empty state). Modal for "Send Report" (monthly progress form) accessible per student row. Modal for "Student Timetable" (view-only).
- **Key SAFE actions:** View student timetable (modal, read-only), view notifications.
- **Key MUTATING/dangerous actions:** Send Report (POST `/teacher/student-progress`) — submits monthly progress evaluation for a student/course; Submit button.
- **Important modals/forms:**
  - *Send Report* — month selector (Jan–Dec 2026), achievements textarea, learning_progress radio (Excellent/Very Good/Good/Very Slow Progress), focus radio (Always/Often/Sometimes/Rarely), homework_completion radio (same scale), punctuality radio (same scale), rescheduled_sessions radio (None/1/2/More than 2), additional_support textarea, learning_objectives textarea. Hidden: student_id, course_id, teacher_id, course_name, action. This is a comprehensive monthly rubric.
  - *Student Timetable* — view-only modal, no fields, just "Close".
- **Variant-of:** Unique template — this is the monthly reports list, separate from `teacher-studentslist` (which is the full student management view).
- **Broken/empty:** Table has 0 rows — page shows empty state with no students loaded (likely data issue at capture time, not a true broken page). Logo 404.
- **UX improvement for the rebuild:** The table is entirely empty at capture with no empty-state illustration or CTA; add a contextual empty state ("No students assigned yet — contact your coordinator") and pre-fill the Send Report modal with the previous month's data as a draft so teachers don't re-enter repeated fields.

---

### `teacher-studentslist` — Students List (Full Management View)

- **Purpose:** Teacher's primary student roster page showing all assigned students with per-row actions: view course history, view schedule, submit monthly report, view learning plans, and request a completion certificate.
- **Key sections / flows:** Single card "List of Students" with 9-column table (#, Student Name, Country, Course Name, History, Schedule, Report For Student, all plans, certificate); 1 row captured (محمد احمد, country VUT, course arabic); row actions: View (course history), Show (timetable modal), Monthly Report (Send Report modal), View (all plans `/teacher/monthly-plans/MQ==/show`), Request Certificate.
- **Key SAFE actions:** View course history (`/teacher/teacher-history/1`), Show timetable (modal), View all plans (`/teacher/monthly-plans/MQ==/show`), view notifications.
- **Key MUTATING/dangerous actions:** Monthly Report submit (POST `/teacher/student-progress` — same rubric form as teacher-students); Request Certificate (POST `/teacher/certificate-request` — description required, date required; sends to management for approval).
- **Important modals/forms:**
  - *Student Timetable* — triggered by "Show"; view-only, just Close.
  - *Send Report* — same 24-field monthly progress rubric as teacher-students (month, achievements, learning_progress, focus, homework_completion, punctuality, rescheduled_sessions, additional_support, learning_objectives + hidden IDs).
  - *Request Certificate* — fields: Student Name (read-only), Course Name (read-only), Description (required textarea), Date (required, YYYY-MM-DD). Note: "This request will be sent to management for approval and template selection." POST to `/teacher/certificate-request`.
- **Variant-of:** Unique template — richer than `teacher-students`; adds course column, plans column, and certificate column. The two pages serve overlapping but distinct purposes (this is the roster/management view; teacher-students is the monthly-report-specific list).
- **Broken/empty:** No broken states; 1 student row present. Logo 404.
- **UX improvement for the rebuild:** The 9-column table is cramped; use a card-per-student layout on mobile and collapse secondary actions (all plans, certificate) into a row-action menu (kebab/ellipsis) to reduce horizontal overflow and make "Monthly Report" and "History" the primary CTAs.

---

### `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student` — Salary Class Report (By Student, June 2026)

- **Purpose:** Teacher's salary breakdown report filtered by date range and grouped by student, showing session counts and calculated earnings across multiple session-type and cancel-type columns.
- **Key sections / flows:** Filter card "Salary Class Report" with Date Range input (flatpickr, MM-DD-YYYY), Group By selector (Student / Date / Session), Submit. Results card "Report By Student 2026-06-01 - 2026-06-30" with a 23-column table: #, Student Name, Pending, Attended, Absent, Cancel, Paid Duration, Price, session, Trial, Student-cancel, Teacher-cancel, Student-reschedule, Teacher-reschedule, Normal, Custom (×2), Normal, Custom (×2), Absent, Total, Paid, Paid if continue, Free. 3 rows: 1 data row (محمد احمد: 4 pending sessions 04:00h, all others 0), 1 blank separator, 1 Total row. Student name is a link to `/management/student/1`.
- **Key SAFE actions:** Filter/resubmit (GET `/teacher/update-result` with date_range + filter params), click student name to navigate to student detail.
- **Key MUTATING/dangerous actions:** None beyond the global shortcuts Save (POST `/teacher/shortcuts`). The report Submit is a GET filter, not a data mutation.
- **Important modals/forms:**
  - *Filter form* — date_range text (MM-DD-YYYY range picker), filter select (Student/Date/Session). GET form — safe.
  - No other meaningful modals; only the global Add Shortcuts modal.
- **Variant-of:** This is a query-param variant of the base template `/teacher/update-result` (or `/teacher/salary-class-report`), filtered by `date_range=2026-06-01+to+2026-06-30&filter=student`. The base template is `teacher-update-result` / `teacher-salary-class-report`.
- **Broken/empty:** No broken states. 23-column table is extremely wide and likely overflows horizontally on most screens. Only 1 student in results (low data).
- **UX improvement for the rebuild:** The 23-column salary breakdown table is unreadable without horizontal scrolling; group related columns under collapsible column groups (Sessions: Pending/Attended/Absent/Cancel; Cancellations: Student/Teacher by type; Earnings: Normal/Custom/Total/Paid/Free) with sticky first column (Student Name) and a print/export-to-CSV action.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This batch covers the teacher-role Students module (student roster, monthly progress reports, certificate requests) and the Salary Class Report (earnings breakdown by student/date/session). Core entities: Student (name, country, course enrollment), Session/Class (scheduled time, status, duration, fine), MonthlyReport (rubric with 5 rating dimensions), Certificate Request (managed by admin), SalaryReport (session counts × pay rates across Normal/Custom/Trial/Absent categories).

**Distinct page templates vs variant count:**
- 3 unique templates:
  1. `teacher-studentslist` — full student roster with multi-action row menu
  2. `teacher-students` — monthly-report-focused student list (subset of columns)
  3. `teacher-update-result` (salary class report) — date-range + group-by report
- 1 variant page:
  - `management-student-1` — redirects to teacher home and loads student-1 context (302 redirect variant of teacher home, not a standalone template)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- *Send Report* modal (POST `/teacher/student-progress`): appears identically on both `teacher-students` and `teacher-studentslist` — 24-field rubric with no draft/save; DANGEROUS (irreversible submission, no confirm step).
- *End class* modal (POST `/teacher/classes-end`): remark + summary + homework required; DANGEROUS — once submitted, class is marked as ended.
- *Mark class as absent* modal (POST `/teacher/classes-absent`): video upload; DANGEROUS — marks student absent.
- *Request Cancel / Reschedule* modal: DANGEROUS — "Auto Make-up" silently extends the course; needs clear explanation and confirmation.
- *Edit Class* modal (POST `/teacher/edit-class`): rescheduling an existing session; DANGEROUS — changes student-visible schedule; "Send Notification" checkbox controls whether family is alerted.
- *Request Certificate* modal (POST `/teacher/certificate-request`): initiates admin workflow; moderate risk.
- *Student Timetable* modal: safe, view-only.
- Salary report filter: safe GET form.

**Improvements for the new platform:**
1. **Navigation clarity:** Two near-identical sidebar entries ("Students" → studentslist, "monthly reports" → students) confuse the purpose; merge into one "Students" section with sub-tabs: Roster | Monthly Reports | Certificates.
2. **Empty states:** `teacher-students` captured 0 rows with no visual feedback; every list page needs an illustrated empty state with context ("No students assigned to you yet").
3. **Dangerous action confirmation:** End class, Mark Absent, Auto Make-up, and Cancel forms must show a confirmation dialog with a summary of what will change before POST fires.
4. **Salary table UX:** 23-column table must be rebuilt with column groups, sticky left column, and horizontal scroll locked to the report area only; add CSV/PDF export.
5. **Monthly report form UX:** The 24-field Send Report modal is too dense for a modal; present it as a full-page form or a multi-step side-panel with progress indicator; add auto-save/draft.
6. **RTL support:** All 4 pages are LTR/EN only; Arabic student names (محمد احمد) appear frequently, meaning the real user base is Arabic-speaking; rebuild must be RTL-first with bi-directional layout.
7. **Mobile teacher experience:** The 9-column student table and 23-column salary table are unusable on mobile; both need responsive card layouts for small screens.
8. **Logo 404:** `/storage/uploads/logo.png` returns 404 on all pages; fix asset path or provide fallback in the new frontend.
9. **Class row actions:** The action cell on the today's-classes table bundles "View / Enter Again / End class / Send Reminder / Running" as inline text; replace with a clear primary CTA (Enter/End depending on status) and secondary actions in a kebab menu.
10. **Status color system:** Class statuses (Trial Waiting, Attended, Absent, Cancel) need a consistent semantic color palette (not just text labels) across all pages for rapid scan.

**Anything that needs owner/backend confirmation:**
- What does "Auto Make-up Class" do exactly to the course end date and billing? The UI description is vague ("adds new session in end of course") — needs backend clarification before rebuild.
- Are MonthlyReport submissions editable after submission, or are they locked? The current UI has no edit path.
- Certificate request workflow: what states exist after submission (pending/approved/rejected)? No status display observed on the student list.
- The salary table column headers repeat "Student" and "Teacher" twice for both cancel and reschedule sub-types — the exact mapping of the 23 columns to backend pay-rule categories needs API schema confirmation.
- `management-student/1` redirecting to `/teacher/home` suggests the `/management/` prefix is an admin namespace; confirm whether teacher role should ever land on `/management/` routes or if all links should be rewritten to `/teacher/` in the rebuild.

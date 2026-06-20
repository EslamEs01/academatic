# Batch 19 — admin · Students & Data Analysis

---

### `management-analysis-student` — Analysis: Student Statistics  (HTTP 200)
- **Purpose:** Admin analytics dashboard showing high-level student population metrics across demographics, status, and trends.
- **Key sections / flows:** Tab switcher (General Student Statistics / Course Statistics); 5 KPI counters (All students has course, Students with Courses, Students with Trial, Stopped Students, Students without Courses); Charts: Students Per Month (line), Students by Age Group (bar), Students by Language (pie), Students by Status (pie), Students by Gender (pie), Students by Country (bar), Students by Country — Map; Month filter dropdown; pagination.
- **Key SAFE actions:** View charts, switch month filter (Current Month / Last Month), navigate to Course Statistics tab, view notifications.
- **Key MUTATING/dangerous actions:** None beyond global chrome (logout, Add shortcuts save).
- **Important modals/forms:** None (read-only analytics page). Global shortcuts modal (title + link, Save).
- **Variant-of:** Unique template — analytics dashboard with dual-tab (Students / Courses).
- **Broken/empty:** No broken state. Data is live (small dataset — 2 students total). Chart CSS leaked into card text (ApexCharts styles captured in text extraction).
- **UX improvement for the rebuild:** Combine the two sub-tabs (Student / Course) into a single top-level nav with deep-linking so bookmarking a specific chart view works; add date-range picker (not just month) for trend charts.

---

### `management-analysis-course` — Analysis: Course Statistics  (HTTP 200)
- **Purpose:** Admin analytics dashboard scoped to course-level metrics (teacher count per course, student distribution by course and language).
- **Key sections / flows:** Same dual-tab chrome as analysis-student; KPI cards: All students has course (1), Total Number of Teachers per Course (1); Charts: Number of Students per Course, Number of Students & Teachers per Course, Number of Students & Teachers per Student Language; course selector dropdown (×arabic); date-range picker; month selector.
- **Key SAFE actions:** Switch tab back to Student Statistics, choose course in filter dropdown, change month/date range.
- **Key MUTATING/dangerous actions:** None (read-only).
- **Important modals/forms:** None (read-only). Global chrome only.
- **Variant-of:** Variant-of `management-analysis-student` (same tab-shell, different charts/KPIs scoped to courses).
- **Broken/empty:** No broken state; course selector shows "×arabic" meaning a chip tag is removable — correct interaction captured.
- **UX improvement for the rebuild:** Add a multi-course comparison mode; allow comparing two courses on the same chart rather than one at a time.

---

### `management-forms-students` — Monthly Reports: Student Forms List  (HTTP 200)
- **Purpose:** Admin view to see which students have or have not received a monthly progress report from teachers; allows admin to trigger report submission.
- **Key sections / flows:** Filter bar (Teacher, Student, has report: Yes/No, Filter/Reset); table: #, Student Name, Parent name, Teacher, has report (0 rows on capture — empty state); "Send Report" modal triggered per row; "Student Timetable" modal for schedule view.
- **Key SAFE actions:** Filter by teacher/student/has-report, view student timetable modal, Reset filters.
- **Key MUTATING/dangerous actions:** Submit (Send Report modal) — posts to `/teacher/student-progress`; creates/updates the monthly progress report record for a student.
- **Important modals/forms:** **Send Report** modal (large) — fields: month (select Jan–Dec), achievements (textarea), learning_progress (radio: Excellent/Very Good/Good/Very Slow Progress), focus (radio: Always/Often/Sometimes/Rarely), homework_completion (radio), punctuality (radio), rescheduled_sessions (radio: None/1/2/More than 2), additional_support (textarea), learning_objectives (textarea); hidden: student_id, course_id, teacher_id, course_name, action. Submit button posts to `/teacher/student-progress`. **Student Timetable** modal — view only.
- **Variant-of:** Unique template — monthly report tracking list.
- **Broken/empty:** Table is empty (0 rows) on capture — no data in test environment. Empty state renders as blank table with headers only.
- **UX improvement for the rebuild:** Render an explicit empty-state illustration with CTA when no reports exist; add column sorting and a "Send Reminder to Teacher" quick action per row to prompt pending reports.

---

### `management-student` — Student List (Active)  (HTTP 200)
- **Purpose:** Primary admin student listing — shows all students with status breakdown KPIs at top and an active-status table with per-row actions.
- **Key sections / flows:** 7 status KPI tiles (Active 2/100%, Suspended 0, Stop 0, Inactive 0, On Trial 0, Incomplete 0, Deleted 0) — each tile is a clickable link to `/student/status/{N}`; table: #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age, Actions (per row: Show Details, Add Courses, Edit, Suspend Student, Delete).
- **Key SAFE actions:** Click status tile to filter by status, Show Details (navigate to student detail), Edit (navigate to edit form), view month picker.
- **Key MUTATING/dangerous actions:** **Suspend Student** (per-row); **Delete** (per-row, posts to `/student/{id}/delete` — no confirm dialog observed beyond possible JS confirm); Add Courses.
- **Important modals/forms:** Delete forms are inline (hidden `_method` + `_token`); no explicit confirmation modal captured on this page. Global chrome modals only.
- **Variant-of:** Unique template (base student list).
- **Broken/empty:** No broken state; table has 2 students.
- **UX improvement for the rebuild:** Replace raw inline delete forms with a confirmation modal (with student name displayed) to prevent accidental deletion; add search/filter bar (name, language, gender, timezone) directly on this list.

---

### `management-student-1` — Student Detail: Student #1  (HTTP 200)
- **Purpose:** Full student profile page with tabbed sub-sections: courses, trials, siblings, and monthly plan reports.
- **Key sections / flows:** Profile header (student name + parent, status badge: Active, Admin/Teacher notices); action buttons: Add trial, Add Course, Search Teacher, Add Free Course, Edit Profile, Suspend, Stop, Schedule Stop on Date; **Courses tab** (default): table of courses (Serial, Start Date, Teacher, Material, Total Hours, Status, Certificates, Actions — 1 row: Eg91718, arabic, 5H, Active & unpaid, Not Paid); course row actions: Copy Course Data, Add Classes, Assign to Invoice, Show Timetable, Show Current/Default Course, Change Status, Edit Schedule, Cancel on Date, Delete Schedule, Cancel Classes; **Trials tab**: table (Date & Time student TZ, Teacher, Course/Duration, Status, History, Settings — 1 row: 20 Jun 2026, arabic 30m, Waiting); trial row actions: Reverse Action, Add Queue, Attend Class, Cancel Class, Absent Class, Edit Class, Running, Send Reminder, Send WA Message, Delete Fine; **Siblings tab**: family members list with Add Sibling, Show Details, Search Teacher, Edit, Delete per sibling; **monthly plan tab**: report table (#, Month, Teacher Name, Course Name, View, Delete, Edit, Approve) — No data.
- **Key SAFE actions:** Navigate tabs, view timetable modal (read-only), view certificate details, view course details, preview certificate.
- **Key MUTATING/dangerous actions:** Delete Schedule (POST `/courses/{id}/delete`); Cancel Classes (POST to `/scheduled-actions` — schedules bulk cancellation); Stop Student (POST `/student/1/stop` — suspends all courses); Suspend Student; Delete student (POST `/student/1/delete`); Attend Class (marks attendance, optional message send); Mark As Absent (with notification and makeup choice); Cancel Class; Edit Class (reschedules with optional notification); Add Classes (POST `/courseClasses/add-classes`); Change Course Status (Active/Paid/Completed/Stop); Assign to Invoice; Create/Upload Certificate; Delete Fine (POST `/teachers/{id}/compensations/{id}`); Approve (certificate approval with WhatsApp send option); Add Sibling; Add Queue.
- **Important modals/forms:** 23 modals total. Key ones: **Schedule Cancel Classes** — scheduled_date, cancel_type (Auto Makeup/Reschedule/No Makeup), reschedule date/time, add_to_credit checkbox, note. **Stop Student** — note (required). **Suspend Student** — returned_at date, schedule_auto_return checkbox, note. **Schedule Stop** — scheduled_date, returned_at, schedule_auto_return, note. **Add Lesson** — date, time, duration, from credit, teacher, accounting statement. **Mark as attend** — radio (no details / with details), remark, summary, homework, notes, file upload. **Mark As Absent** — absent_by, note, notification choice (Don't send/Default/Custom message), makeup option, add_to_credit, timezone choice, reschedule date/time. **Cancel Class** — cancel_by, note, send_notification, makeup option, add_to_credit, timezone, reschedule. **Edit Class** — new date/time, send_notification, duration, teacher, accounting. **Send WhatsApp Message** — message text, send to Teacher/Student(s) checkboxes. **Certificate Information** — student_name, teacher_name, description, date, template select. **Add Quick Queue** — level (Urgent/Medium/Normal), text. **Approve** (certificate) — preview + send to WhatsApp options. **All Invoice For This Parent** — invoice select. **Change Course Status** — status select (Active Unpaid/Paid/Completed/Stop).
- **Variant-of:** Unique template (student detail with tabbed course management).
- **Broken/empty:** Monthly plan tab shows "No data found / No reports found". Certificate table 0 rows. Siblings trial tab 0 rows. These are empty states, not errors.
- **UX improvement for the rebuild:** The 23 modals on a single page create extreme cognitive load. Refactor into a structured action panel or drawer: group course actions (schedule, cancel, status) under a single "Course Actions" dropdown per row, session actions (attend, absent, cancel, edit) under a "Session" context menu, and lifecycle actions (stop, suspend, delete) behind a clearly labelled "Danger Zone" section with explicit double-confirm modals naming the student.

---

### `management-student-1-create` — Create Student for Family #1  (HTTP 200)
- **Purpose:** Form to add a new student under a specific family account.
- **Key sections / flows:** Single card "Student Information" with fields: name (EN), name_ar (AR), language select (10 options), gender select, birth_date, teacher_note textarea, admin_note textarea; optional "Add trial" checkbox that conditionally reveals trial fields: material select, teacher_id select, duration select, accounting_statement select, date, time.
- **Key SAFE actions:** Navigate away (cancel without submit).
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/1/store` (creates new student record under family 1, optionally scheduling a trial).
- **Important modals/forms:** Main form (POST `/student/1/store`). No additional modals.
- **Variant-of:** Unique template (student creation). See `management-student-2-create` which is identical with family ID 2.
- **Broken/empty:** No broken/empty state.
- **UX improvement for the rebuild:** Show trial scheduling fields inline with smooth expand animation on checkbox toggle; add real-time timezone display based on family's timezone so admin knows what time slot they're booking in student-local time.

---

### `management-student-1-edit` — Edit Student #1  (HTTP 200)
- **Purpose:** Edit form for an existing student's profile details (not course/trial data).
- **Key sections / flows:** Same card "Student Information" as create but pre-populated; fields: name, name_ar, language, gender, birth_date, teacher_note (optional), admin_note (optional); no trial fields (edit only, not creation).
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — PATCH via POST to `/student/1/update`.
- **Important modals/forms:** Single edit form. No additional modals.
- **Variant-of:** Variant-of `management-student-1-create` (same field layout, minus trial creation, pre-populated values).
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** Show last-edited timestamp and editor identity above the form; add change-log/history link for audit trail.

---

### `management-student-1-trial-create` — Create Trial for Student #1  (HTTP 200)
- **Purpose:** Schedule a new trial session for student #1 with a specific teacher, material, duration, and time.
- **Key sections / flows:** Card "Trial"; shows count of previous trials (1); student selector (locked to this student); unnamed select (appears to be sub-student/sibling picker); He studies ages radio (Children/Teens/Adults); active course select; duration select (10–180 min); accounting statement select (According to teacher/Paid/Paid if continue/Free); date picker; time picker; teacher select (async/searchable).
- **Key SAFE actions:** Cancel/navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/1/trial/store` (creates a trial session record).
- **Important modals/forms:** Single trial form (`students_form`).
- **Variant-of:** Unique template (trial creation). `management-student-2-trial-create` is identical for student #2.
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** Display teacher availability inline (mini calendar view) after teacher selection so admin can pick a slot without leaving the page.

---

### `management-student-2` — Student Detail: Student #2  (HTTP 200)
- **Purpose:** Same template as management-student-1 but for student #2 (منار حسن — female, no active courses).
- **Key sections / flows:** Identical tab structure (Courses/Trials/Siblings/monthly plan). Courses tab shows no course (empty), Trials tab shows no trials, Siblings shows family member with "Not added" course/subscription status, monthly plan shows "No data found".
- **Key SAFE actions:** Same as student-1 detail.
- **Key MUTATING/dangerous actions:** Same set: Add trial, Add Course, Suspend, Stop, Delete student, per-course and per-session actions (though no sessions present).
- **Important modals/forms:** Same 21 modals as student-1 (Certificate, Invoice, Timetable, Change Status, Add Lesson, Schedule Stop, Stop, Suspend, Add Lesson, Certificate Info, Add Queue, Attend, WhatsApp, Absent, Edit Class, Cancel Class, Feedback, Approve).
- **Variant-of:** Variant-of `management-student-1` (same template, different student ID; student #2 has fewer active records).
- **Broken/empty:** Courses tab is empty — no course row. Monthly plan: "No data found". Certificates: 0 rows. Expected empty states for a student with no active enrollment.
- **UX improvement for the rebuild:** When a student has no courses, show a prominent empty state with a direct "Add Course" CTA to reduce navigation steps.

---

### `management-student-2-create` — Create Student for Family #2  (HTTP 200)
- **Purpose:** Create a new student under family #2.
- **Key sections / flows:** Identical form to `management-student-1-create`.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/2/store`.
- **Important modals/forms:** Same as student-1-create.
- **Variant-of:** Variant-of `management-student-1-create` (family ID param only differs).
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** (Same as student-1-create) — inline trial scheduler with timezone context.

---

### `management-student-2-edit` — Edit Student #2  (HTTP 200)
- **Purpose:** Edit profile of student #2.
- **Key sections / flows:** Identical edit form to student-1-edit, pre-populated with student #2 data.
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — PATCH via POST to `/student/2/update`.
- **Important modals/forms:** Same as student-1-edit.
- **Variant-of:** Variant-of `management-student-1-edit` (student ID only differs).
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** (Same as student-1-edit.)

---

### `management-student-2-trial-create` — Create Trial for Student #2  (HTTP 200)
- **Purpose:** Schedule a trial for student #2.
- **Key sections / flows:** Identical form to student-1-trial-create; no previous trial count shown (student #2 has 0 trials vs student #1's 1).
- **Key SAFE actions:** Navigate away.
- **Key MUTATING/dangerous actions:** **Submit** — POST to `/student/2/trial/store`.
- **Important modals/forms:** Same as student-1-trial-create.
- **Variant-of:** Variant-of `management-student-1-trial-create`.
- **Broken/empty:** No issues.
- **UX improvement for the rebuild:** (Same as student-1-trial-create.)

---

### `management-student-status-3` — Student List: Active Status  (HTTP 200)
- **Purpose:** Filtered student list showing only Active students (status=3); same layout as main student list with status KPIs + filtered table.
- **Key sections / flows:** Status KPI bar (same 7 tiles, Active highlighted); table with 2 rows (both students active) with per-row actions: Show Details, Add Courses, Edit, Suspend Student, Delete; delete forms present inline.
- **Key SAFE actions:** Click other status tiles to switch view, Show Details, Edit.
- **Key MUTATING/dangerous actions:** **Suspend Student** (per row); **Delete** (per row, POST `/student/{id}/delete`, no confirm modal observed at list level).
- **Important modals/forms:** No dedicated modals on list; delete is inline form.
- **Variant-of:** Variant-of `management-student` (status param = 3 / Active).
- **Broken/empty:** No issues; 2 active students present.
- **UX improvement for the rebuild:** Unify all status-filtered views into a single paginated table with a status filter chip/tab bar at the top (avoid 7 separate routes).

---

### `management-student-status-0` — Student List: Incomplete Status  (HTTP 200)
- **Purpose:** Filtered student list for status 0 (Incomplete students — registration started but not fully enrolled).
- **Key sections / flows:** Same KPI bar; table header present, 0 data rows (empty); no per-row delete forms (no students in this state).
- **Key SAFE actions:** Navigate to other status views.
- **Key MUTATING/dangerous actions:** None present (empty table).
- **Important modals/forms:** None (empty state).
- **Variant-of:** Variant-of `management-student` (status=0, Incomplete).
- **Broken/empty:** Empty table (expected — 0 incomplete students in test environment).
- **UX improvement for the rebuild:** Display an explicit "No incomplete students" empty state with description of what "Incomplete" means.

---

### `management-student-status-1` — Student List: Inactive Status  (HTTP 200)
- **Purpose:** Filtered list for Inactive students (status=1).
- **Key sections / flows:** Same template; 0 rows; table with column headers only.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty).
- **Important modals/forms:** None (empty state).
- **Variant-of:** Variant-of `management-student` (status=1, Inactive).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** (Same as status-0 — unified filter approach.)

---

### `management-student-status-2` — Student List: Trial Status  (HTTP 200)
- **Purpose:** Filtered list for students currently in Trial status (status=2).
- **Key sections / flows:** Same template; 0 rows.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty).
- **Important modals/forms:** None.
- **Variant-of:** Variant-of `management-student` (status=2, Trial).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** (Same — unified filter.)

---

### `management-student-status-4` — Student List: Suspended Status  (HTTP 200)
- **Purpose:** Filtered list for Suspended students (status=4).
- **Key sections / flows:** Same template; 0 rows.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty; if rows present, would have reinstate/delete per row).
- **Important modals/forms:** None.
- **Variant-of:** Variant-of `management-student` (status=4, Suspended).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** When students are suspended, show their suspension date and expected return date in the table.

---

### `management-student-status-6` — Student List: Stopped Status  (HTTP 200)
- **Purpose:** Filtered list for Stopped students (status=6 — fully stopped/unenrolled).
- **Key sections / flows:** Same template; 0 rows.
- **Key SAFE actions:** Navigate to other status tiles.
- **Key MUTATING/dangerous actions:** None (empty; if rows present would include re-activate option).
- **Important modals/forms:** None.
- **Variant-of:** Variant-of `management-student` (status=6, Stopped).
- **Broken/empty:** Empty table.
- **UX improvement for the rebuild:** For stopped students, surface the stop reason (note stored at stop time) and the teacher recommendation in the row for quick triage.

---

## Module synthesis (this batch)

### What this module does and its core entities
This batch covers the **Students module** (full CRUD + lifecycle management) and the **Data Analysis / Analytics** sub-module for students and courses. Core entities: **Student** (belongs to a Family, has status, language, gender, age, timezone, WhatsApp group); **Course** (serial, teacher, material, hours, status, payment state); **Trial Session** (one-off evaluation class before enrollment); **Class/Session** (individual lesson within a course — can be attended, cancelled, rescheduled, or marked absent); **Monthly Report** (teacher's progress submission per student per course per month); **Certificate** (generated or uploaded per student per course); **Queue** (urgent/normal admin note per class); **Sibling** (cross-reference of students in the same family).

Student lifecycle status codes confirmed: 0=Incomplete, 1=Inactive, 2=Trial, 3=Active, 4=Suspended, 6=Stopped (no status 5 observed).

### Distinct page templates vs variant count
**Unique templates (8):**
1. `management-analysis-student` — student analytics dashboard (dual-tab)
2. `management-analysis-course` — course analytics tab (variant tab of #1, but distinct enough to note)
3. `management-forms-students` — monthly report tracking list
4. `management-student` — student list with status KPI tiles (base template)
5. `management-student-{id}` — student detail page with 4-tab structure + 23 modals
6. `management-student-{id}-create` — create student form
7. `management-student-{id}-edit` — edit student form
8. `management-student-{id}-trial-create` — create trial session form

**Variant pages (10):**
- `management-student-2` — variant of student detail (student ID differs)
- `management-student-2-create` — variant of create (family ID differs)
- `management-student-2-edit` — variant of edit
- `management-student-2-trial-create` — variant of trial create
- `management-student-status-0` (Incomplete), `-1` (Inactive), `-2` (Trial), `-3` (Active), `-4` (Suspended), `-6` (Stopped) — all variants of base student list template

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

**Tabs:** Dual-tab (Students/Course analysis); 4-tab (Courses/Trials/Siblings/Monthly Plan) on student detail. Both use client-side JS tab switching without URL change — deep-linking broken.

**Filters:** Status KPI tiles (clickable, navigate to separate URL per status); course/student/has-report dropdowns on forms-students; month picker on analytics; course selector on analysis-course.

**Dangerous modals (must never be auto-fired):**
- Stop Student — suspends all courses, affects billing
- Suspend Student — suspends courses with invoice implications
- Schedule Stop on Date — sets future automated stop
- Delete Student — permanent deletion (POST `/student/{id}/delete`)
- Delete Schedule — cancels course schedule
- Cancel Classes (bulk scheduled cancel) — mass session cancellation
- Mark As Absent — triggers notifications and makeup decisions
- Cancel Class — individual session cancel with notification
- Approve (certificate) — sends WhatsApp message to family
- Delete Fine — removes teacher compensation record

**Safe modals:**
- Student Timetable (view only)
- Certificate Details (view only)
- Add Quick Queue
- Mark as attend (with class details)
- Send WhatsApp Message (requires explicit send confirmation by author)
- Change Course Status (requires selection + submit)
- All Invoice for Parent (assign only)
- Add Lesson (schedules new lesson)

### Improvements for the new platform

1. **Status routing — consolidate into one page:** Replace 7 separate `/student/status/{N}` routes with a single `/students` page using a status filter chip row (Active / Suspended / Stopped / Trial / Inactive / Incomplete / Deleted). Use query params (`?status=3`) for deep-linking and browser back compatibility.

2. **Student detail — modal overload:** The 23-modal student detail page is a major UX problem. Refactor: group per-course actions into a course action drawer (slide-in panel), per-session actions into a session action context menu (right-click or ellipsis), and lifecycle/danger actions (stop, suspend, delete) into a separate "Account Management" panel with explicit two-step confirm dialogs that display the student name.

3. **Tab deep-linking:** Both the analysis dashboard and student detail tabs do not update the URL on tab switch, breaking the browser back button and making sharing/bookmarking impossible. All tab state must be reflected in the URL hash or query param.

4. **Delete confirmation:** No per-row confirmation modal observed for student deletion or course deletion on the list pages. The new platform must always show a named confirmation dialog (e.g., "Delete student Mohammed Ahmed? This cannot be undone.") before any destructive action.

5. **Monthly reports empty state:** `management-forms-students` table renders with 0 rows and no helpful empty state. Add an illustration + message + "Send Reminder to All Pending Teachers" bulk action.

6. **Analytics charts:** `management-analysis-student` uses ApexCharts with raw CSS leaking into the captured text. The rebuild should use a proper charting library with RTL support and accessible color palettes (not just language-specific color, but status-coded colors consistent with the rest of the UI).

7. **Trial form — teacher availability:** Selecting a teacher on the trial creation form provides no feedback on their availability. Show a mini weekly schedule or availability indicator after teacher selection.

8. **Status badge colors:** 7 statuses need distinct, accessible, RTL-safe status chips. Proposed palette: Active=green, Trial=blue, Suspended=amber, Stopped=red, Inactive=gray, Incomplete=orange, Deleted=black/strikethrough. Do not use only color — add icon + label.

9. **Certificate workflow:** The Approve modal triggers a WhatsApp send. This should show a preview of the message before dispatching, with explicit "Cancel" vs "Send" buttons rather than the current radio-then-approve flow.

10. **RTL / i18n:** All pages are LTR en. Student data includes Arabic names (محمد احمد, منار حسن) and teacher names in Arabic. The new platform must support RTL layout for Arabic users — particularly the student detail tabs, session table, and all modal forms.

### Anything that needs owner/backend confirmation
- **Status code 5 is missing:** Statuses 0,1,2,3,4,6 are confirmed. Status 5 is not represented — confirm with backend what status=5 means and whether a `/student/status/5` route exists.
- **`/management/management/members/invoice`** — double `management` in the URL (likely a routing bug): `https://academatic.online/management/management/members/invoice`. Confirm correct endpoint.
- **Accounting statement field** appears as both "Change Course Status" label and "Accounting Statement" depending on context — confirm the correct field semantics (free/paid/according-to-teacher).
- **Delete Fine** posts to `/management/teachers/{teacher_id}/compensations/{comp_id}` — confirm whether deleting a fine from a student's trial view is the intended flow or an accidental exposure.
- **Monthly report actions** post to `/teacher/student-progress` (teacher role endpoint), not a management endpoint — confirm admin has authority to submit teacher reports on the teacher's behalf, and whether audit logging exists.

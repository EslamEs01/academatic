# Batch 36 — Teacher · Course History / Monthly Plans / Teacher History

---

### `teacher-course-history-1` — Course History (Student Detail View)

- **Purpose:** Shows the class history list for a specific student (by student ID), scoped to courses taught by the logged-in teacher; entry point is `/teacher/course-history/1`.
- **Key sections / flows:** Single H5 card "Classes History Details of [student name]"; a 3-column table (Class Date & Time, Teacher Name, Show) with 2 sample rows showing status badges (Waiting, Admin Cancel) and duration (30m, 60m); a "View" link in header that navigates to the teacher-history view; per-row "Class History" links navigating to `/teacher/course-history/{id}/class`; "Show Details" buttons open a Student Details modal (tabbed: Class Remark, Class Summary, Homework Note, Files, Teacher, Student).
- **Key SAFE actions:** View (navigates to teacher-history), Class History (row-level nav link), Close modal, View all notifications (nav).
- **Key MUTATING/dangerous actions:** Show Details (POST form — opens a session detail modal; classified as submit/mutating by the crawler, but appears to be a read action that opens a modal; confirm with backend). Add shortcuts (POST `/teacher/shortcuts`), Save (shortcut form).
- **Important modals/forms:** Student Details modal — tabbed view showing class remark, class summary, homework notes, uploaded files, teacher and student info; no edit fields visible, just close. Show Details is the trigger.
- **Variant-of:** Shares identical template with `teacher-teacher-history-1` and `teacher-teacher-history-1-d861d6e` — same columns, same sample data, same modal set. The route path differs (`course-history` vs `teacher-history`) but rendered content is identical. Likely a routing alias or the same controller rendering both.
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all pages in this batch.
- **UX improvement for the rebuild:** The "Show Details" button uses a POST submit mechanism to open a read-only modal; replace with a lightweight GET-based drawer or slide-over panel with proper URL state (`?classId=X`) so the detail view is deep-linkable and shareable.

---

### `teacher-monthly-plans` — Monthly Plans (Student List)

- **Purpose:** Lists all students assigned to the teacher, providing per-student entry points to history, schedule, and monthly progress reports; the main hub for the monthly reporting workflow.
- **Key sections / flows:** H5 card "List of Students"; 8-column table (#, Student Name, Course Name, History, Schedule, Report For Student, all plans, monthly plan) with **0 rows** at capture time (empty state, no "No data" message observed in card text). Month filter (select). Modals: Student Timetable (view schedule inline), Send Report (large progress form). "View all notifications" header link resolves to this page's URL, indicating this is a notification destination.
- **Key SAFE actions:** View history, view schedule (Student Timetable modal), month filter, navigation.
- **Key MUTATING/dangerous actions:** Submit (POST `/teacher/student-progress`) — sends a monthly progress report for a student; this is the primary write action. Add shortcuts / Save.
- **Important modals/forms:**
  - **Student Timetable modal** — read-only timetable; just Close button.
  - **Send Report modal** (POST `/teacher/student-progress`) — rich form with: month select (12 months), achievements textarea, 4-point radio for learning_progress (Excellent/Very Good/Good/Very Slow), focus radio (Always/Often/Sometimes/Rarely), homework_completion radio, punctuality radio, rescheduled_sessions radio (None/1/2/More than 2), additional_support textarea, learning_objectives textarea (upcoming plan). Hidden: student_id, course_id, teacher_id, course_name, action. Submit fires the report creation/update.
- **Variant-of:** Unique template — the only page in this batch that hosts the full Send Report form and the student-list table (with 8 columns).
- **Broken/empty:** Table has 0 rows at capture — no explicit empty-state UI text visible in the card; the card text simply shows headers with no data message. Logo 404.
- **UX improvement for the rebuild:** The Send Report form is entirely within a modal with 20+ fields and multiple radio groups — this is too heavy for a modal. Rebuild as a dedicated full-page wizard or side-sheet with step indicators (Step 1: Month & Overview, Step 2: Behavioral ratings, Step 3: Objectives & Support), with autosave drafts and a confirmation step before submit. Also add an explicit empty-state illustration when no students are assigned.

---

### `teacher-monthly-plans-mq-show` — Monthly Plans Detail (Report List for Student)

- **Purpose:** Shows all submitted monthly progress reports for a specific student (ID encoded as Base64 `MQ==` = `1` in the URL), with columns for Month, Parent name, Student Name, Course Name, and View/Approve actions.
- **Key sections / flows:** H4 card "Total Report"; 7-column table (#, Month, Parent name, Student Name, Course Name, View, Approve) with **0 rows** — card text says "No reports found". Month filter. Same Send Report modal and Student Timetable modal as `teacher-monthly-plans` (identical form structure). Approve column is present but no rows to act on.
- **Key SAFE actions:** View report (per-row), month filter, Student Timetable modal (read), navigation.
- **Key MUTATING/dangerous actions:** Submit (POST `/teacher/student-progress`) — same report submission form. Approve action (column present but no data to confirm behavior). Add shortcuts / Save.
- **Important modals/forms:** Same as `teacher-monthly-plans`: Student Timetable (Close only) + Send Report (full 20+ field POST form). Approve column action behavior not confirmed by crawler — needs backend clarification.
- **Variant-of:** Variant of `teacher-monthly-plans` — same chrome, same forms, same modals. Differs in: (a) URL scoped to a specific student ID (Base64-encoded), (b) heading changes from "List of Students" to "Total Report", (c) table columns differ (7 vs 8 cols — adds Parent name, Month; changes "all plans"/"monthly plan" to "View"/"Approve"). Counts as a scoped variant of the monthly-plans template.
- **Broken/empty:** Table shows "No reports found" — confirmed empty state text in card. Logo 404.
- **UX improvement for the rebuild:** The Approve action in the table column needs explicit confirmation UX (confirm dialog naming the month/student) — its POST behavior is unclear from the crawler data. Add a status badge column (Pending / Approved / Rejected) so teachers can scan report states at a glance, and make the View action open a read-only report preview rather than navigating away.

---

### `teacher-teacher-history-1` — Teacher History (Student Class List, trailing-dash URL)

- **Purpose:** Displays the class session history for student ID 1, accessed via the canonical teacher-history route with a trailing dash artifact (`/teacher/teacher-history/1-`); functionally identical to the clean URL variant.
- **Key sections / flows:** H5 card "Classes History Details of [student name]"; 3-column table (Class Date & Time, Teacher Name, Show) with 2 rows, same status badges (Waiting, Admin Cancel) and durations; "View" link navigates to `/teacher/teacher-history/1` (clean URL); per-row "Class History" links to `/teacher/course-history/{id}/class`; "Show Details" buttons open Student Details modal.
- **Key SAFE actions:** View (nav to clean URL), Class History (per-row nav), Close modals, notification nav.
- **Key MUTATING/dangerous actions:** Show Details (POST submit — opens modal), Add shortcuts, Save.
- **Important modals/forms:** Student Details modal (tabbed: Class Remark, Class Summary, Homework Note, Files, Teacher, Student — read-only + Close). Add shortcuts form.
- **Variant-of:** Variant of `teacher-teacher-history-1-d861d6e` — same template, same data, different URL (trailing dash `1-` vs `1`). The "View" interaction navigates from this URL to the clean URL, confirming it is a crawler artifact / redirect-miss rather than a distinct route.
- **Broken/empty:** Trailing dash in URL is likely a routing anomaly — the View link self-corrects to `/1`. Logo 404.
- **UX improvement for the rebuild:** Consolidate the trailing-dash and clean URL into a single canonical route with a proper 301 redirect; the current system silently renders both, risking duplicate entries in history and analytics.

---

### `teacher-teacher-history-1-d861d6e` — Teacher History (Student Class List, Clean URL)

- **Purpose:** Canonical teacher-history detail page for student ID 1 at `/teacher/teacher-history/1`; shows the same class list and detail modals as the trailing-dash variant.
- **Key sections / flows:** Identical to `teacher-teacher-history-1`: H5 "Classes History Details of [student]", 3-column table (2 rows, Waiting + Admin Cancel statuses), Show Details buttons, Student Details modal (tabbed), View link (inline state change — stays on same URL), Class History per-row links.
- **Key SAFE actions:** View (inline state change, same URL), Class History (nav), Close modal, notification nav.
- **Key MUTATING/dangerous actions:** Show Details (POST), Add shortcuts, Save.
- **Important modals/forms:** Student Details modal — same tabs (Class Remark, Class Summary, Homework Note, Files, Teacher, Student); read-only, Close only. The "View" interaction is classified as `inline_state_change` here (vs `navigation` in the trailing-dash variant), suggesting the clean URL may toggle an expanded row or panel rather than navigating.
- **Variant-of:** This is the base template for `teacher-teacher-history-1` (trailing dash) and shares the same template as `teacher-course-history-1`. All three render identical DOM structures with the same 3-column table and Student Details modal.
- **Broken/empty:** Logo 404.
- **UX improvement for the rebuild:** The Student Details modal contains 5+ tabs (Remark, Summary, Homework, Files, Teacher, Student) — in the rebuild, convert this to an inline expandable row or a slide-over drawer with lazy-loaded tab content; also add status chip styling to distinguish Waiting vs Admin Cancel vs Completed classes visually in the table.

---

## Module synthesis (this batch)

**What this module covers and core entities:**
This batch covers the Teacher role's student-progress and class-history tracking subsystem. Core entities: Student, Course, Class Session (with status: Waiting / Admin Cancel), Monthly Progress Report (with multi-dimensional behavioral ratings), Teacher. The subsystem has two functional clusters: (1) class-session history — browsable per-student list of scheduled/cancelled classes with a tabbed detail modal; (2) monthly progress reporting — a hub listing all teacher-assigned students with a large structured form for submitting monthly reports, plus a per-student report history view with an Approve column.

**Distinct page templates vs variant count:**
- **2 unique templates:**
  1. **Class History template** — `/teacher/course-history/{id}` and `/teacher/teacher-history/{id}` (and the trailing-dash variant): 3-column table (Date/Time, Teacher Name, Show), Student Details modal with tabs. Three pages (`teacher-course-history-1`, `teacher-teacher-history-1`, `teacher-teacher-history-1-d861d6e`) all render this same template. The course-history and teacher-history routes appear to be route aliases for the same view.
  2. **Monthly Plans template** — `/teacher/monthly-plans` (list) and `/teacher/monthly-plans/{id}/show` (per-student report history): share the same chrome, both forms (Send Report, Student Timetable modal). Two pages (`teacher-monthly-plans`, `teacher-monthly-plans-mq-show`) — the show variant adds Parent Name column and Approve action, and changes heading; counts as a scoped variant.
- **3 variant pages** (trailing-dash URL, course-history alias, monthly-plans-show scoped view)
- **2 distinct templates**

**Cross-cutting interactions and dangerous ones:**
- Add Shortcuts modal (POST `/teacher/shortcuts`) — present on all 5 pages; low-risk but a write action.
- Show Details (POST) — triggers Student Details modal; appears read-only but uses a POST form; backend should confirm if any session state is mutated.
- Send Report (POST `/teacher/student-progress`) — the most significant write action: creates/updates a monthly progress report for a student. Present in both monthly-plans pages. Must never be auto-fired; requires a multi-field confirmation flow.
- Approve action (in `teacher-monthly-plans-mq-show` table) — POST behavior unconfirmed; must not auto-fire; needs explicit confirm dialog.
- Logout (POST `/teacher/logout`) — present everywhere in sidebar/header; standard session termination.

**Improvements for the new platform:**

1. **Route consolidation:** `/teacher/course-history/{id}` and `/teacher/teacher-history/{id}` render the same content; the rebuild should unify these to one canonical route (`/teacher/students/{id}/class-history`) with a 301 for the old paths. Fix the trailing-dash routing bug.
2. **Class History table:** Add a status color-chip column (green = Completed, yellow = Waiting, red = Admin Cancel / other cancellation types) so teachers can scan at a glance. Add date-range filter and course filter.
3. **Student Details modal:** Replace the multi-tab modal with an inline expandable row or a slide-over drawer. Lazy-load each tab. Tab labels (Class Remark, Class Summary, Homework, Files, Teacher, Student) need clearer naming for non-English speakers — use RTL-aware layout when locale is Arabic.
4. **Send Report form:** Move out of a modal into a dedicated full-page or slide-over wizard with 3 steps. Add autosave draft, required-field validation with inline errors, and a preview-before-submit step. Radio groups need accessible labeling (fieldset + legend per group). Add a "copy from last month" option.
5. **Monthly Plans list empty state:** When no students are assigned, show an illustrated empty state with guidance. When data is present, add student name search/filter and course filter on the 8-column table.
6. **Monthly Plans show (report history):** Add status badges (Pending/Approved/Rejected) to each row. The Approve action needs a confirmation dialog naming the report month and student. Add a View action that opens a read-only report preview panel (not just raw data link).
7. **RTL support:** All pages captured as LTR/English but the teacher's name data contains Arabic text inline (`المعلم محمد صادق صادق`, `arabic` course label). The rebuild must handle mixed-direction content (bidi isolation for Arabic names inside LTR tables) and support full RTL layout toggle.
8. **Logo 404:** `/storage/uploads/logo.png` returns 404 across all pages — the asset is missing in the current deployment; the rebuild should use a reliable CDN path or a fallback SVG.
9. **Accessibility:** All forms lack ARIA labels and required-field markers. Radio groups in the Send Report form lack fieldset/legend wrappers. Modal focus traps are absent in the current implementation.

**Needs owner/backend confirmation:**
- Whether `/teacher/course-history/{id}` and `/teacher/teacher-history/{id}` are intentionally separate routes or a duplication error.
- Whether Show Details (POST form) mutates any server state or is purely a read action (if read-only, rebuild as a GET request to a dedicated endpoint).
- The Approve action behavior in `monthly-plans/{id}/show` — what state it sets, whether it notifies parents, whether it is reversible, and what role (teacher vs admin) can perform it.
- Whether the `action` hidden field in the student-progress form differentiates between create and update; if so, the UI should surface the distinction clearly to the teacher.

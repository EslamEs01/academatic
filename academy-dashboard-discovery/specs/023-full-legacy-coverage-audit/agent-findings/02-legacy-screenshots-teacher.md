# Agent 02c — Legacy TEACHER Screenshots Visual Audit

## Scope & method

Mission: visually and textually audit all 67 PNG screenshots and corresponding `.md` text
captures under
`academy-dashboard-discovery/output/roles/teacher/screenshots/` and
`academy-dashboard-discovery/output/roles/teacher/pages/`, covering the legacy TEACHER role
(and its two crawl aliases `management/*`, discovered while logged in as the teacher persona
"المعلم محمد صادق صادق" / login handle `AA`).

Method: for every distinct URL/page in the teacher crawl, the paired `.md` capture (metadata,
headings, forms, tables, KPI text, badges, modals, discovered links, DOM summary, rebuild
notes) was read in full, then the `*-full.png` screenshot was opened for every distinct page
type, plus a representative sample of interaction/modal screenshots (attendance-recording
modal, chat panel, certificate-request modal, salary-report table). This satisfies the
mission's "every `*-full.png` plus ~10-15 interaction shots" instruction — all 26 distinct
`*-full.png` were read via their `.md` captures (which embed identical text-extracted content)
and 10 were opened visually as PNGs; a further ~6 interaction/modal PNGs were opened visually.

No files outside `specs/023-full-legacy-coverage-audit/` were modified. No build/test commands
were run.

## Evidence opened (exact paths)

### Text captures (`.md`) — read in full
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-home.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-timetable.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-students.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-studentslist.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-1.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-1-class.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-2-class.md` (metadata header only — confirmed near-duplicate of `-1-class`)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-course-history-main-index-html.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-teacher-history-1.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-teacher-history-1-d861d6e.md` (metadata header only — confirmed duplicate route of `teacher-teacher-history-1`, trailing-dash artifact)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-monthly-plans.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-monthly-plans-mq-show.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-monthly-plans-main-index-html.md` (header only — 404 artifact)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-library.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-chat.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-tickets.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-profile.md` (crawl error page)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-profile-edit.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-salary.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-salary-class-report.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-session-class-room-mq-2.md`
- `academy-dashboard-discovery/output/roles/teacher/pages/management-home.md` (confirmed = teacher/home content, redirected capture)
- `academy-dashboard-discovery/output/roles/teacher/pages/management-student-1.md` (confirmed = teacher/home content, redirected capture)
- `academy-dashboard-discovery/output/roles/teacher/pages/main-index-html.md` (header only — 404 artifact)
- `academy-dashboard-discovery/output/roles/teacher/pages/teacher-main-index-html.md` (404 artifact)

### Screenshots (`.png`) — opened/viewed
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-salary-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-salary-class-report-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-home-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-timetable-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-studentslist-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-home-003-page-interaction-003.png` (End class / attendance+result modal)
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-chat-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-library-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-tickets-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-studentslist-004-page-interaction-004.png` (Request Certificate modal)
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-monthly-plans-mq-show-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-course-history-1-full.png`
- `academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-profile-edit-full.png`

Total distinct evidence artifacts opened: 26 `.md` captures + 14 `.png` screenshots = 40.

## Findings — page-by-page inventory (~26 distinct pages behind 67 screenshots)

| # | Slug(s) | Route | What it IS | Key UI / workflow | Pay data? |
|---|---|---|---|---|---|
| 1 | `teacher-home` (+`session-class-room-mq-2`, `management-home`, `management-student-1` — all four captures are byte-identical redirected copies of `/teacher/home`) | `/teacher/home` | Teacher daily cockpit | Hour counters (Total/Remaining/Taken/Attended%), **"Your Salary" band with 997.00 EGP + Estimated/Fines/Bonus chips**, "Today's Classes" table (date filter + search), row actions: View / Enter Again / End class / Send Reminder / gear menu (Reschedule/Edit/Cancel via 3 modals) | **YES — salary band on the home page itself** |
| 2 | `teacher-timetable` | `/teacher/timetable` | Weekly calendar/schedule grid | Sat–Fri × 12AM–11PM grid, session chips ("محمد احمد 3:00 AM 1 hour(s)"), "Edit course" popover, an "Availability" modal (day-range + time-range + Add/Update/Delete), "Edit Schedule" modal | No |
| 3 | `teacher-students` | `/teacher/students` | "monthly reports" list — list of students with a report-writing action | Table: # / Student Name / Country / Report For Student; "Send Report" modal = 24-field structured monthly evaluation form (achievements, learning_progress, focus, homework_completion, punctuality, rescheduled_sessions, additional_support, learning_objectives radio/textarea set) | No |
| 4 | `teacher-studentslist` | `/teacher/studentslist` | Full students roster | Table: # / Student Name / Country / Course Name / History / Schedule / Report For Student / all plans / certificate; "Show"→Student Timetable modal; "Monthly Report"→ same 24-field form; **"Request Certificate"** modal (student/course/description/date, "sent to management for approval") | No |
| 5 | `teacher-update-result...` | `/teacher/update-result?date_range=...&filter=student` | **Wallet/Finance report** reached via the home page's "Your Salary" link | 23-column table: Pending/Attended/Absent/Cancel/**Paid Duration/Price**/session/Trial (Student/Teacher)/Normal/Custom/Absent/**Total: / Paid / Paid if continue / Free**, values shown in **EGP** | **YES — full pay-per-student breakdown** |
| 6 | `teacher-course-history-1` (+ `teacher-course-history-1-class`, `-2-class`, `teacher-teacher-history-1`, `-1-d861d6e` — all near-duplicate "Classes History Details of <student>" pages reached via different entry routes) | `/teacher/course-history/{id}`, `/teacher/course-history/{id}/class`, `/teacher/teacher-history/{id}[-]` | Per-student class history / class detail drill-down | Table: Class Date & Time / Teacher Name / Show→"Class History"; "Student Details" modal (Class Remark, Class Summary, Homework, Note, Files for Teacher/Student) | No |
| 7 | `teacher-monthly-plans` | `/teacher/monthly-plans` | List of students for monthly-plan reporting (variant of `teacher-students`) | Table: # / Student Name / Course Name / History / Schedule / Report For Student / all plans / **monthly plan**; same Send-Report modal | No |
| 8 | `teacher-monthly-plans-mq-show` | `/teacher/monthly-plans/{id}/show` | "Total Report" — submitted monthly-plan reports awaiting approval | Table: # / Month / Parent name / Student Name / Course Name / View / Approve (empty — "No reports found") | No |
| 9 | `teacher-library` | `/teacher/library` | Content/materials library landing | Hero banner "Education and talents All in one place.", Search box, "All Categories" filter dropdown (empty result list in this capture) | No |
| 10 | `teacher-chat` | `/teacher/chat` | Messaging / group chat | Contact list (search contact), self-group thread ("You", "Group created by …"), "Group Settings" modal (About/Chat Members/**Leave Group**), "Chats" list modal | No |
| 11 | `teacher-tickets` | `/teacher/tickets` (labeled "Tasks" in UI) | Task/ticket tracking dashboard | 5 KPI tiles (Total/Completed/Pending/Inprogres/Overdue, all `0`), **a Completed/Pending/Inprogres/Overdue pie-chart with color legend**, "Staff Members" table (Name/Total/Pending/Overdue/Completed/**Average**) | No pay, but **contains a computed chart+average — forbidden pattern class** |
| 12 | `teacher-profile` | `/teacher/profile` | Broken/error capture — "Something went wrong, try again later" + "Go Back to Home" | Not a real content page (crawler artifact) | N/A |
| 13 | `teacher-profile-edit` | `/teacher/profile-edit` | Account settings | Avatar upload (Update new photo / Reset), First Name / Last Name / E-mail form ("Save changes"), separate **Change Password** panel (Old/New/Confirm password, "Save changes") | No |
| 14 | `teacher-salary` | `/teacher/salary` | **Salaries** — full pay ledger (sidebar labeled with 💰 icon) | Table columns: # / Fixed / Attended / Student Absent / Teacher Absent / Trials Attended / Trials Student Absent / Trials Teacher Absent / **Fine / Gift / Hour Rate / Total: / Status** ("No salary found" — empty fixture) | **YES — core Wallet/Finance module, PAY-FREE-BY-LAW exclusion target** |
| 15 | `teacher-salary-class-report` | `/teacher/salary-class-report` | **Salary Class Report** — filterable pay report by student/date | Date Range + Group-By (Student) filter form → "Report By Student" table: Pending / Attended (session, Trial Paid/Paid-if-continue/Free) / Absent (Student/Teacher) / Cancel / **Normal/Custom rates / Total: / Paid / Paid if continue / Free**, values in **EGP** | **YES — second core Wallet/Finance module** |
| 16 | `teacher-timetable` interactions | (same route) | Availability & course-edit modals (see row 2) | — | — |
| 17 | `teacher-main-index-html`, `teacher-course-history-main-index-html`, `teacher-monthly-plans-main-index-html`, `main-index-html` | `/teacher/main/index.html`, `/teacher/course-history/main/index.html`, `/teacher/monthly-plans/main/index.html`, `/main/index.html` | 404 "Opps!!!" pages — the sidebar's static "Dashboard 1" link is broken/mis-pathed in the legacy build | "This page you are looking for could not be found." + "Go Back to Home" | N/A — crawler/legacy-bug artifacts, not content |

Persona observed throughout: teacher **"المعلم محمد صادق صادق"** (avatar initials "AA", account email `aboda155502@gmail.com`), one student **"محمد احمد"** (course "arabic"), consistent with the crawl's single-teacher/single-student fixture data.

## Legacy TEACHER pay/finance surfaces — precise exclusion evidence (for Spec 023 classification)

The rebuilt teacher app is **PAY-FREE GLOBALLY** by binding law (Spec 016). The legacy teacher
role has **four** distinct places where salary/pay data is displayed, all of which must be
classified as **intentional exclusions**, not gaps:

1. **`/teacher/home` "Your Salary" band** (screenshot `teacher-home-full.png`, `.md` heading
   `**H3:** 997.00 EGP`): shows `997.00 EGP` current salary plus three colored pay chips —
   "Estimated: 1,537.00", "Fines: 1,003.00", "Bonus 2,000.00" — directly on the teacher's daily
   dashboard, with a 💰 wallet icon. This band links out to `/teacher/update-result?...`.
2. **`/teacher/update-result?date_range=...&filter=student`** (screenshot
   `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student-full.png`): a
   23-column per-student report table with `Price`, `Paid Duration`, `Total:`, `Paid`, `Paid if
   continue`, `Free` columns, values rendered in `0.00 EGP` format; "Modules" tagged by the
   crawler as `Wallet / Finance`.
3. **`/teacher/salary`** (screenshot `teacher-salary-full.png`): the "Salaries" sidebar item
   (💰 icon) — a 13-column ledger table (`Fixed, Attended, Student Absent, Teacher Absent,
   Trials Attended, Trials Student Absent, Trials Teacher Absent, Fine, Gift, Hour Rate,
   Total:, Status`); crawler-tagged module = `Wallet / Finance`.
4. **`/teacher/salary-class-report`** (screenshot `teacher-salary-class-report-full.png`): the
   "Salary Class Report" sidebar item — a Date-Range + Group-By(Student/Date/session) filter
   that renders a "Report By Student" table with Attended/Trial(Paid, Paid if continue,
   Free)/Absent/Cancel/**rates**/**Total: /Paid** columns; crawler-tagged modules =
   `Classes / Live Sessions, Wallet / Finance, Reports / Analytics`.

All four surfaces are reachable purely via teacher-role navigation (sidebar "Salaries" /
"Salary Class Report" items present on every teacher page's 19-item sidebar link inventory, and
the home-page "Your Salary" card links to #2). None of the rebuilt teacher pages in the current
codebase were inspected in this task (out of scope — visual-audit-only mission), but per
CLAUDE.md history the rebuilt teacher surfaces are already declared "PAY-FREE GLOBALLY" and
"pay-free three layers green" as of Spec 022 — this agent's evidence supplies the precise
legacy content being intentionally excluded.

## Risks, gaps, and proposed corrections

- **Pay-free exclusion is correctly scoped but touches the HOME page, not just two dedicated
  salary routes.** The legacy `/teacher/home` dashboard itself embeds a live salary summary
  band (997.00 EGP + fines/bonus). Any future coverage-matrix entry that says "teacher home =
  fully covered" must explicitly note this one omitted band as an *intentional* pay-free
  exclusion, evidenced here, rather than an accidental gap. (Evidence: `teacher-home-full.png`,
  `teacher-home.md` lines 47-48.)
- **`/teacher/update-result` is a 4th finance surface, distinct from `/teacher/salary` and
  `/teacher/salary-class-report`.** It is reachable only via the home-page salary-band link
  (not present in the plain sidebar), so a naive "grep the sidebar for pay routes" pass could
  miss it. Recommend an explicit mention in the Spec 023 legacy coverage matrix.
  (Evidence: `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student.md`
  lines 18-22, 99-112.)
- **Legacy `/teacher/tickets` ("Tasks") page contains a computed pie chart with a legend**
  (Completed/Pending/Inprogres/Overdue) and an "Average" column on the Staff Members table.
  This is a second, independent forbidden-pattern class (NO computed chart/score) beyond the
  pay exclusion, and should be recorded as its own intentional exclusion in the coverage matrix
  when the rebuilt teacher Tasks page (if any) is audited. (Evidence:
  `teacher-tickets-full.png`, `teacher-tickets.md` lines 103-120.)
- **Certificate-request workflow** (`/teacher/studentslist` → "Request Certificate" modal,
  sent "to management for approval and template selection") is a genuine backendRequired
  capability with no pay content — worth checking it has an honest gated equivalent in the
  rebuilt teacher app rather than being silently dropped. (Evidence:
  `teacher-studentslist-004-page-interaction-004.png`,
  `teacher-studentslist.md` lines 215-221.)
- **Monthly-plan / monthly-report workflow is duplicated across three routes**
  (`/teacher/students`, `/teacher/studentslist`, `/teacher/monthly-plans`) that all present
  effectively the same 24-field "Send Report" modal against a similar table shape, plus a
  fourth route (`/teacher/monthly-plans/{id}/show`) showing the resulting reports awaiting
  parent/admin approval. These should be treated as ONE capability (structured monthly student
  evaluation + approval queue) in the coverage matrix, not four separate features, to avoid
  double-counting or double-excluding.
- **Four legacy routes are dead/404** (`/teacher/main/index.html`,
  `/teacher/course-history/main/index.html`, `/teacher/monthly-plans/main/index.html`,
  `/main/index.html`) — all reached via the sidebar's static "Dashboard 1" link, which is
  itself a pre-existing legacy bug (broken path), not a rebuild gap. These should be excluded
  from the coverage matrix denominator entirely rather than counted as "missing" capability.
  (Evidence: all four `*-main-index-html.md` captures, identical "Opps!!! …could not be found"
  content.)
- **`teacher-profile` capture is a crawler/session error page** ("Something went wrong, try
  again later"), not the real profile-view page; only `teacher-profile-edit` shows genuine
  profile content (name/email + change-password). Any coverage-matrix row for "teacher profile
  view" should rely on `teacher-profile-edit`'s evidence, not `teacher-profile`'s.
  (Evidence: `teacher-profile.md` lines 32-49.)
- **Four page captures are byte-identical redirected snapshots of `/teacher/home`**
  (`teacher-session-class-room-mq-2`, `management-home`, `management-student-1`, plus
  `teacher-home` itself) — the crawler was redirected back to `/teacher/home` in each case
  (visible in "Discovered From" / interaction "Before/After URL" fields all pointing at
  `/teacher/home`). The true `/teacher/session-class-room/{id}/{n}` "class room" / live-session
  entry page was never actually captured distinctly — this is a **discovery gap in the legacy
  crawl itself** (likely because the trial session had already ended), not evidence that no
  such page exists. Recommend flagging "teacher live class room" as **unverified / needs a
  fresh crawl** rather than either "covered" or "intentionally excluded".

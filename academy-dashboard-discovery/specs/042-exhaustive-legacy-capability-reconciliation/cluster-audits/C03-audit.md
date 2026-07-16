# C03 — Students · Exhaustive Legacy Capability Reconciliation (Spec 042)

**Method**: 40 legacy screenshots opened AS IMAGES (admin 21 · family 9 · teacher 10) + 7 current-app
screenshots + 10 raw page records (`output/roles/*/pages/*.json`) read field-by-field + the current source
(`app/src/js/pages/{students,student,student-portal,student-schedule,student-homework,student-materials,
student-progress,student-history,student-profile}.js`, `fixtures/students.js`,
`components/{result-summary,evaluation-rubric,learning-path}.js`, `enhance.js` studentMenu) + the settled
contracts of Specs 004 · 019 · 021 · 023 · 025 · 027 · 032 · 035 · 037.

**Read-only**: nothing under `app/**` was written.

---

## 1. What the legacy actually is (evidence, not summary)

The Students module is the **single richest legacy module in the product**, and it is far deeper than the
page count suggests. The 39 pages resolve into three role lenses over ONE entity:

### 1.1 Admin lens — `/management/student*`
- **Directory** (`management-student-full.png`): 7 lifecycle KPI tiles (Active · Suspended · Stop ·
  Inactive · On Trial · Incomplete · **Deleted**) each a link into `/management/student/status/{0..6}` +
  `/status/softdelete`; a table with **8 columns** — `# · Student Name · Parent name · Timezone ·
  Whatsapp Group · Language · Gender · Age` — a date-**Range** filter, and a row kebab
  (`management-student-status-3-002`): **Show Details · Add Courses · Edit · Suspend Student · Delete**.
- **Detail hub** (`management-student-1-full.png` + interactions 001–005, raw
  `admin/pages/management-student-1.json`): banner (avatar · student name · **parent link** · lifecycle
  chip · `Admin Notice::…` + `Teacher Notice::…` chips) over **4 tabs** — `Courses · Trials · Siblings ·
  monthly plan` — plus a 3-button primary bar (`Add trial` → `/student/1/trial/create`, `Add Course` →
  `/courses/1/create`, `Search Teacher` → `/request-schedule/1/1`) and a dropdown: **Add Free Course ·
  Edit Profile · Suspend · Stop · Schedule Stop on Date**.
  - `Courses` table: `Serial · Start Date · Teacher · Material · Total Hours · Status · Certificates ·
    Actions` — the status cell carries **`Active & unpaid` + `Not Paid`** money chips.
  - `Trials` table: `Date & Time (Student time) · Teacher Name · Course Name/Dur · Status (Waiting) ·
    History (View) · Settings`.
  - `Siblings` table: `Student · Status · Teacher Name · course details · Subscription · Options` +
    `Add Sibling` → `/management/student/1/create`.
  - `monthly plan` = **"Total Report"**: `# · Month · Teacher Name · Course Name · View · Delete · Edit ·
    **Approve**` (empty "No data found").
  - The record carries **~20 modals** — the real depth: `basicModal` **Add Lesson Student Timezone**
    (date · time · duration · from-credit · teacher · accounting_statement), `markAsAttended` (radio
    send-details · remark · summary · homework · notes · **`type=file` images[]**), `markAsabsent`
    (absent_by · note · 3-way send-message radio · custom message · **add_to_credit** · **student-tz vs
    teacher-tz radio**), `cancelClass` (8 controls), `schedule-cancel-course-1-modal` (scheduled_date ·
    Auto-Makeup/Reschedule/No-Makeup radio · reschedule date+time · add_to_credit · note),
    `schedule-stop-student-modal` (scheduled_date · returned_at · schedule_auto_return · note), `stop`
    (note), `suspend` (date · schedule_return · note), `statusModal` (Change Course Status),
    `assigninvoiceModal`, `onboardHorizontalImageModal` **Certificate Information** (student_name ·
    teacher_name · description · date_certificate · **pdfcertificat_id**), `certApproveModal`,
    `sendWhatsappMessage` (message + send_teacher/send_student checkboxes), `modalTop` **Student
    Timetable**, and **two `Delete Fine` submit buttons**.
- **Forms** (raw, exact):
  - create `POST /management/student/{familyId}/store` → **14 visible controls**: `name · name_ar ·
    language(11) · gender(4) · birth_date · teacher_note · admin_note · hasTrial[checkbox] · material ·
    teacher_id · duration(5) · accounting_statement(3) · date · time`.
  - edit `POST /management/student/{id}/update` → **7 controls** (the create set minus the trial block and
    the checkbox).
  - trial `POST /management/student/{id}/trial/store` → **9 controls**: `student_id · gender ·
    studies_ages[Children 1-10 / Teens 11-20 / Adults >20] · material_id · duration(15) ·
    **accounting_statement** ("Trial statement (According to teacher)" = Paid) · date(Student date) ·
    time(Student time) · teacher_id`, with the banner "The number of previous trial sessions : 1".
- **Analytics** (`management-analysis-student-full.png`): "Student Statistics" — 5 count tiles (All
  students has course · with Courses · with Trial · Stopped · without Courses) + **6 charts**: Students
  Per Month (bar) · by Age Group (bar) · by Language / Status / Gender (donuts with %) · by Country (bar)
  · **by Country — world map**. `management-analysis-course` is the sibling "Course Statistics" tab.
- **Monthly-reports index** (`management-forms-students-full.png`): filter `Teacher · Student · has
  report` + table `# · Student Name · Parent name · Teacher · has report`; the page **bakes the same
  9-field `POST /teacher/student-progress` Send-Report modal** the teacher uses.
- **Student Feedback** (`management-families-feedback-students*`): a **Parents** board — `Name · Status ·
  Last Feedback · Next Meeting · Meeting Manager · Actions` (kebab: Show Details · **Add Meeting Date**),
  5 status tiles, 5 `?status=` routes, and an `addFeedbackModal` = `date + user_id (Manager)`.
- **Public Advertisement**: audience-targeted broadcast (type Advertisement/WhatsApp · Send Private ·
  message + link · **Choose Media file** · Expire At · teacher-category · **student-category** ·
  Countries · Hours · Language) with `Select All` recipient pickers for teachers AND students.

### 1.2 Teacher lens — `/teacher/students*`
- `teacher-studentslist`: `# · Student Name · **Country** · Course Name · History[View] · Schedule[Show]
  · Report For Student[**Monthly Report**] · all plans[View] · certificate[**Request Certificate**]`.
- **Send Report modal** (`teacher-studentslist-003`, raw `POST /teacher/student-progress`) — the exact
  **9 controls**: `month · achievements(textarea) · learning_progress[Excellent/Very Good/Good/Very Slow
  Progress] · focus[Always/Often/Sometimes/Rarely] · homework_completion[Always/Most of the time/
  Sometimes/Rarely] · punctuality[Always/Often/Sometimes/Rarely] · rescheduled_sessions[None/1/2/More
  than 2] · additional_support(textarea) · learning_objectives(textarea)`.
- **Request Certificate modal** (`teacher-studentslist-004`, `POST /teacher/certificate-request`): student
  name (RO) · course name (RO) · description · date — with the honest note *"This request will be sent to
  management for approval and template selection."*
- `teacher-studentslist-005`: **Classes History Details of <student>** — date/time · status chip
  (`Waiting` / `Admin Cancel`) · teacher · course · duration · `Class History`.
- `teacher-monthly-plans`: the same roster with an extra `monthly plan` column.
- `teacher/management-student-1` **redirected to `/teacher/home`** — a REAL role-isolation proof: the
  teacher cannot open the admin student page. (The redirected home also renders `Your Salary 997.00 EGP ·
  Fines: 1,003.00 · Bonus 2,000.00` — the pay surface our teacher law forbids forever.)
- `teacher/update-result?filter=student` is **not** an academic surface: it is the **Salary Class Report
  grouped by Student** (Pending / Attended-session / Trial[Paid · Paid-if-continue · Free] / Absent[Student
  · Teacher] / Cancel[Student · Teacher] hour matrix).

### 1.3 Family lens — `/student/*` (the guardian login; there is **NO student login** — Spec 021 DEC-001)
Nav: Home · Schedule · Classes Summary · Courses · Billing · Student Feedback · Library · Logout.
- `student-home`: Total/Remaining/Taken Hours counters · **Time Spendings 0/0 H** · Today's Classes
  (+ `Request Trial`, `Show More`) · Your Teachers.
- `student-studentslist` = **All Account Subscriptions** (`Student · Status · Teacher · Course ·
  Subscription · History · Feedback About`).
- `student-today-sessions`: date search → `Class Date · Class Time · Student · Teacher · Course ·
  Subscription · Class Status`.
- `student-student-history-fillter?2=`: **Select Student** → per-child class history.
- `student-feedbacks`: the guardian's meeting board (`Meeting Date · Meeting Time · Meeting Manager ·
  Family Members · Action`) — the family end of the admin Student-Feedback capability.
- `student-request-trial`: a **2-step wizard**, raw fields = `request_type[Create New Child / Choose
  Existing Child] · name · age · language(10) · gender(2) · student_id · date · time · duration ·
  course` = **10 controls**.
- `student-profile-edit`: photo upload (JPG/GIF/PNG ≤1MB) + Reset · First Name · Last Name · E-mail ·
  Save · **Change Password (Old / New / Confirm)** · Save.
- `student-library`: marketing hero + search + category catalog.

---

## 2. What we have today, and the honest gap

Our Students surface is **shallower than the legacy in workflow depth, but categorically better in
honesty, accessibility, RTL/EN parity, and role safety**. The three biggest real gaps are:

1. **The whole TRIAL lifecycle is absent.** Legacy has an `Add trial` primary, a 9-field trial form, a
   `Trials` tab with `Waiting` status + history, a family-facing 2-step `Request Trial` wizard, and a
   "previous trial sessions: N" counter. We have: a `trial` lifecycle chip, a `trial`/`trial_taken`/
   `trial_missed` **lead** status (Spec 034), 3 trial fields inside the `stu-add` drawer, and a
   display-only "trial request" card on `family-requests` — **no trial entity, no trial tab, no trial
   form, no trial status board**. Spec 023 already registered the family wizard's step-2 as a recorded
   gap; nobody ever registered the **admin** trial surface. This is the single largest MISSING row.
2. **The monthly student-progress report has a READ view but no WRITE view, and no admin queue.** Our
   `evaluation-rubric.js` reproduces the legacy report's read-out almost exactly (4 of the 6 rated
   dimensions + achievements + objectives + an Approve gate) — but the **9-field teacher authoring form
   does not exist** (`teacher-reports.js` renders the dimension *labels* only), and the **admin
   approve/edit/delete queue** (`monthly plan` tab + `forms/students` has-report index) does not exist.
   Spec 023 row 4 assigned the form to 025; 025 shipped display-only lines. It is still open.
3. **Forms are consistently narrower than the evidenced field sets** (see the counts in the ledger):
   `stu-add` 9 vs 14 · child-view profile 0 fields vs 7 · family trial 0 vs 10 · teacher monthly report
   0 vs 9 · admin suspend/stop 0 vs 3/1/4 (we use a bare confirm). Every one of these is PARTIAL, never
   COMPLETE.

Three legacy behaviours we **correctly refuse** and must never "fix back":
- **Money/pay chips on the student record**: `Active & unpaid`, `Not Paid`, `accounting_statement` =
  Paid / Paid-if-continue / Free, the **two `Delete Fine` buttons**, and the teacher `Salary Class Report`
  grouped by student. All excluded (teacher pay-free GLOBAL · finance no-fake-money · the sole honest lock
  `classSalaryReport`).
- **Real PII / channel data on the student row**: `Whatsapp Group` column, real parent names/emails
  (`abdo ahmed`, `alaashapan1996`), and the `sendWhatsappMessage` blast. Excluded (no real PII; no fake
  delivery) — owner Spec 043.
- **Credential + upload surfaces**: `Old/New/Confirm Password` on the child-view profile,
  `type=file images[]` in mark-attended, certificate `pdfcertificat_id` render, photo upload. We render
  0 `type=password` / 0 `type=file` and gate every write.

Two things we do that the legacy does **not**, and that must be preserved:
- **Labeled lifecycle chips instead of numeric `/status/0..6` routes** (`components/family-status.js`
  header comment states this explicitly) — icon+text always, never colour-only.
- **The child-view recognition layer** (achievements · group stars · "next step" lines, unordered, never a
  leaderboard) — an academy-identity improvement with no legacy source. Spec 052 owns its future.

---

## 3. Cross-role propagation (Spec 055 material)

| Producer | Output | Consumer surface today |
|---|---|---|
| Teacher monthly report (9 fields) | student evaluation | **Consumer EXISTS** (`student.html#view=evaluation`, `students.html#view=evaluation`, `family-progress`) but the **producer does NOT** — the read view is fed by fixtures with no authoring path. Backwards from the usual gap. |
| Teacher certificate request | admin approval queue | **Consumer EXISTS** (`certificates.html#view=requests`, 5 authored rows carrying `teacherKey`) but the teacher-portal **producer does NOT exist**. |
| Teacher End-class → Homework field | child-view homework | Both exist (`outcome-details.js` → `student-homework.js`), but the homework text is authored separately in `portal.js` — the propagation is not modelled. |
| Admin suspend/stop student | family + teacher rosters | Confirm gate only; no downstream status propagation surface. |
| Admin Add-Lesson (student timezone) | schedule + child-view schedule | `sess-new` drawer exists on sessions; the **student-timezone framing** ("Student date/time" labels legacy uses everywhere) does not exist anywhere in our app. |
| Family Request-Trial | admin trial queue | Neither producer form nor admin queue exists. `leads.html` is the closest surface (trial_taken/trial_missed statuses) but it is a *lead*, not an enrolled child's trial. |

---

## 4. Visual verdict

Our admin `students.html` and `student.html` are **materially better than legacy**: warm cream canvas,
labeled chips, family chips, real RTL, a clean 3-tab hub, and a `stu-add` slide-over that is genuinely
usable. The child-view (`student-portal`, `student-progress`) is the most academy-feeling surface in the
whole product — cheerful sky-blue hero, day rail, medals — and should be the identity reference for the
045–050 redesign groups.

Flag for visual review:
- `student.html#view=overview` is thin and reads corporate-ERP (two grey info-cards + a bar); the legacy
  hero at least carried the Admin/Teacher Notice chips. Needs the academy treatment.
- `students.html` directory table is dense and drops the *online-academy* essentials the legacy carried:
  **timezone** and **age**. Timezone is not cosmetic — every legacy session label says "(Student time)".
- The `stu-add` drawer's 2-column grid crowds at desktop width; the trial block has no section heading, so
  the three trial selects read as if they were core identity fields.

---

## 5. Evidence paths (representative)

- `output/roles/admin/screenshots/management-student-full.png`
- `output/roles/admin/screenshots/management-student-1-002-page-interaction-002.png` (action dropdown)
- `output/roles/admin/screenshots/management-student-1-003-page-interaction-003.png` (Trials tab)
- `output/roles/admin/screenshots/management-student-1-005-page-interaction-005.png` (monthly plan)
- `output/roles/admin/screenshots/management-student-1-trial-create-full.png`
- `output/roles/admin/pages/management-student-1.json` (≈20 modals, the real depth)
- `output/roles/admin/pages/management-student-1-create.json` (14 controls)
- `output/roles/teacher/screenshots/teacher-studentslist-003-page-interaction-003.png` (Send Report)
- `output/roles/teacher/pages/teacher-studentslist.json` (9-field `POST /teacher/student-progress`)
- `output/roles/family/pages/student-request-trial.json` (10-field wizard)
- `output/roles/family/screenshots/student-profile-edit-full.png` (password + upload)
- `output/roles/teacher/screenshots/management-student-1-full.png` (isolation redirect + salary band)

---

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C03-01 | Admin student directory (7 lifecycle KPI tiles · 8-column table · date-range filter · row kebab; timezone + age columns dropped today) | PARTIAL | 045-050 | §1.1 Admin lens / §4 Visual verdict |
| C03-02 | Admin student detail hub (banner + notice chips · Courses/Siblings tabs · 3-button primary bar · action dropdown; overview thin today) | PARTIAL | 045-050 | §1.1 Admin lens / §4 Visual verdict |
| C03-03 | Admin per-student session-lifecycle modal suite (~20 modals: Add Lesson · mark attended/absent · cancel class · schedule-cancel-course · timetable) | PARTIAL | 044 | §1.1 Admin lens / §2 gap intro |
| C03-04 | Admin student create/edit forms (14- and 7-control evidenced sets vs `stu-add` 9 fields) | PARTIAL | 056 | §1.1 Forms / §2 item 3 |
| C03-05 | Admin suspend / stop / schedule-stop lifecycle actions (evidenced 3/1/4-field modals vs bare confirm today) | PARTIAL | 056 | §1.1 modals / §2 item 3 |
| C03-06 | Admin student analytics (5 count tiles · 6 charts · world map) — no current-state comparison recorded in this audit | UNKNOWN_EVIDENCE | 045-050 | §1.1 Analytics |
| C03-07 | Monthly student-progress report cycle (teacher 9-field authoring form + admin `monthly plan` approve/edit/delete queue + `forms/students` has-report index; read view shipped in `evaluation-rubric.js`) | PARTIAL | 055 | §1.1/§1.2 / §2 item 2 / §3 |
| C03-08 | Student Feedback meeting boards (admin Parents board + `addFeedbackModal` + family `student-feedbacks` end) — no current-state comparison recorded in this audit | UNKNOWN_EVIDENCE | 054 | §1.1 Student Feedback / §1.3 |
| C03-09 | Public Advertisement audience-targeted broadcast (media file · WhatsApp type · teacher/student recipient pickers) — no current-state comparison recorded in this audit | UNKNOWN_EVIDENCE | 053 | §1.1 Public Advertisement |
| C03-10 | Trial lifecycle (admin `Add trial` 9-field form · Trials tab with Waiting/history · family 2-step 10-field Request-Trial wizard · previous-trials counter) | MISSING | 055 | §2 item 1 / §3 |
| C03-11 | Teacher student roster (Country · history · schedule · plans columns + per-student Classes History view) | PARTIAL | 056 | §1.2 Teacher lens |
| C03-12 | Teacher certificate-request producer modal (admin consumer `certificates.html#view=requests` exists) | PARTIAL | 055 | §1.2 / §3 |
| C03-13 | Teacher→admin role isolation (legacy redirect proof; real enforcement requires backend auth — hiding a link is not authorization) | FUTURE_BACKEND | 043 | §1.2 isolation redirect |
| C03-14 | Salary Class Report grouped by student (`teacher/update-result?filter=student`) — stays the sole honest lock `classSalaryReport` | HONEST_LOCK | — | §1.2 / §2 refusals |
| C03-15 | Money/pay chips on student surfaces (`Active & unpaid` · `Not Paid` · `accounting_statement` · two `Delete Fine` buttons · teacher salary/fines/bonus band) | REJECTED_PAY_FREE | — | §1.2 / §2 refusals |
| C03-16 | Family child-view pages (home counters · All Account Subscriptions · today-sessions · per-child history filter · library) | PARTIAL | 045-050 | §1.3 Family lens / §4 |
| C03-17 | Child-view profile edit (legacy 7 non-credential profile controls vs 0 fields today) | PARTIAL | 056 | §1.3 / §2 item 3 |
| C03-18 | Real PII / channel data (WhatsApp Group column · real parent names/emails · `sendWhatsappMessage` blast) | REJECTED_PRIVACY | 043 | §2 refusals |
| C03-19 | Credential + upload surfaces (Old/New/Confirm password · `type=file images[]` · photo upload · `pdfcertificat_id` render) | REJECTED_SECURITY | — | §2 refusals |
| C03-20 | Labeled lifecycle chips replacing numeric `/status/0..6` routes (icon+text, never colour-only) | INTENTIONALLY_IMPROVED | — | §2 improvements |
| C03-21 | Child-view recognition layer (achievements · group stars · next-step lines; never a leaderboard) | INTENTIONALLY_IMPROVED | 052 | §2 improvements |
| C03-22 | Homework propagation End-class → child-view homework (both ends exist; propagation not modelled — homework text authored separately) | PARTIAL | 055 | §3 propagation table |
| C03-23 | Student-timezone framing ("Student date/time" labels on sessions/Add-Lesson; absent everywhere in our app) | MISSING | 055 | §3 / §4 |

Honest counts: screenshotsOpened=47 · recordsInspected=10 · currentSourceFiles=14

Normalization notes (Spec 042 pass, no re-audit): counts are taken verbatim from the Method line
(40 legacy + 7 current screenshots = 47; 10 raw records; 14 source files = 9 `pages/*` + `fixtures/students.js`
+ 3 components + `enhance.js` studentMenu). Rows C03-06/-08/-09 carry UNKNOWN_EVIDENCE because the audit
describes the legacy surface but records no current-state comparison; owners for rows the audit did not
explicitly assign follow the binding Spec-042 future-owner register (044 modal system · 053 integrations ·
054 meeting lifecycle · 055 propagation/workflow · 056 forms audit · 045-050 visual redesign).

# C08 — Reports & Analytics · Capability Audit (Spec 042)

**Method (honest counts)**: **31 screenshots opened AS IMAGES** with the Read tool (22 legacy + 9 current) and
**17 raw legacy page records** (`output/roles/*/pages/*.json` — forms, modals, tables, buttons, filters, sidebarLinks)
read field-by-field. The current implementation was read at source (`app/src/js/pages/reports.js`,
`components/report-feedback.js`, `components/report-actions.js`, `components/evaluation-rubric.js`,
`fixtures/reports.js`, `fixtures/report-feedback.js`, `fixtures/form-options.js`, `fixtures/control-center.js`,
`pages/leads.js`, `pages/teacher-reports.js`, `nav.config.js`, `locales/{ar,en}.rep.js`, `locales/en.extra.js`).
Where a planning summary and a raw record disagreed, **the record won**.

Legacy records read: admin `management-forms`, `management-forms-create`, **`management-forms-students`** (the
"reports follow-up" destination — module-tagged *Students*, but it is the other half of this cluster's monthly-report
capability), `management-new-requests`, `management-new-requests-filter-pending…`, `management-teacher-feedback`,
`management-teacher-feedback-feedback-teacher-id-1-year-2026`, `management-salary-class-report`,
`management-settings-integrations-whatsapp-families-insights`, `…-whatsapp-teachers-insights`,
`management-settings-security-data-backup-send`, plus the four **Data Analysis** sub-pages the cluster's nav actually
points at (`management-analysis-student`, `management-analysis-course`, `management-analysis-invoices`,
`management-analysis-expenses`) and `management-sessions-analysis`; teacher `teacher-salary-class-report`.

---

## 1. What the legacy "Reports" module actually is (proved from records + pixels)

The legacy **REPORT rail** (pixel-visible in `management-forms-full.png`, link targets read from
`management-forms.json → sidebarLinks`) is:

| Rail item | Real href |
|---|---|
| **monthly reports** | **`/management/forms`** ← the FORM BUILDER page |
| **Data Analysis** ▾ | `javascript:void(0)` → children: Students `/management/analysis-student` · Invoices & Accounts `/management/analysis-invoices` · Profits & Losses `/management/analysis-expenses` |
| List of Invoices / Monthly Invoices / Salaries / Staff Salaries / Payouts | finance (C07) |
| **Salary Class Report** | `/management/salary-class-report` |

**This is the cluster's single most important finding.** Legacy "monthly reports" is **NOT** a month-by-month
operations roll-up — it is the **form/questionnaire builder** whose default form is the **Monthly Student Progress
Report**, plus its follow-up tracker (`Create Form` + `reports follow-up` → `/management/forms/students`). The
teacher rail says the same thing: teacher **"monthly reports" → `/teacher/students`**
(`teacher-salary-class-report.json → sidebarLinks`). Our `nav.monthlyReports → reports.html#view=monthly` therefore
**carries the legacy label over a different capability** (an authored ops board). That is not dishonest — nothing is
faked — but the promise/behaviour pairing must be recorded (see §5).

**The form builder** (`management-forms-create.json → forms[1]`, pixels in `management-forms-create-full.png`):
`form_name` (required) · `day` (select 1–7, required) · then **N repeatable question rows**, each
`fields[i][label]` (required) · `fields[i][type]` ∈ **{Short Answer, Paragraph, Checkboxes, Multiple Choice,
Dropdown, Rating}** · `fields[i][options][]` (repeatable, per-option Add/Remove) · `fields[i][is_required]` checkbox;
buttons **Add Question · Add Option · Remove option · Delete (question) · Save**. The list page adds a per-form
**colour picker** (`POST /management/forms/colors/update` with `form_id`) and a table
`# · Form Title · Questions · Responses · Default · Status · Created at · Actions` (empty at crawl time —
"No data found", so the row-level Actions menu is **unproven**).

**The monthly progress report itself** (`management-forms-students.json → modals[modalTopForm]` "Send Report",
`POST /teacher/student-progress`) is a **9-input rubric**: `month` (12 options) · `achievements` (textarea) ·
`learning_progress` (Excellent/Very Good/Good/Very Slow) · `focus` (Always/Often/Sometimes/Rarely) ·
`homework_completion` (Always/Most of the time/Sometimes/Rarely) · `punctuality` (Always/Often/Sometimes/Rarely) ·
`rescheduled_sessions` (None/1/2/More than 2) · `additional_support` (textarea) · `learning_objectives` (textarea),
over a follow-up list filtered by `teacher_id` · `student_id` · `has_report` (All/Yes/No) · `month`, with a
**Student Timetable** modal per row.

**Teacher-feedback / Monthly Performance** (`management-teacher-feedback.json`, pixels ×4): a teacher multi-select +
`date_month` + `date_year` filter → a table `# · Teacher Name · **Percentage** · Note · Action[Add]`, a second table
`Category · Percentage`, an **Add Feedback (category)** modal (`name` · `description` · `status`
Active/Deactive → `POST /management/teacher-feedback/category`), a **Deactive Categories** modal, and a per-teacher
**Add Feedback** note modal (`feedback_note` + hidden `teacher_id`/`date` → `POST /management/teacher-feedback`).
The drill-down `/management/teacher-feedback/feedback?teacher_id=1&year=2026` is a teacher+year lens ("No data found").

**Data Analysis** is chart/BI territory: `analysis-student` = 5 stat cards + *Students Per Month · by Age Group · by
Language · by Status · by Gender · by Country · **by Country — Map***; `analysis-course` = *Number of Students &
Teachers per Course / per Student Language*; `analysis-invoices` = money aggregates (`Total Before/After Discount`,
`Paid/UnPaid/Overdue`, cumulative charts); `analysis-expenses` = **`Expected Teachers Salaries EUR 540.00`** +
Net Profit/Revenue charts + a 12-row financial table.

**New Requests Statistics** (`management-new-requests-full.png`) is the lead-funnel BI board: 9 status cards with
`Show Details` drill-downs (Duplicated · PENDING · Contacted · no response · Qualified · scheduled · Trial Taken ·
Trial Missed · Teacher) + Converted/Not Converted + `Total Request` + Male/Female Teachers Requested (**% of
requests**) + Avg. Scheduling Time (**% Faster than last month**) + Pending Actions + Completed/Cancelled Trials +
Total Teachers/Families + New Families This Month + **Avg. Families per Teacher** + **Requests Growth (MoM %)** +
Fastest Scheduling + **Top Performer** + Most Requests From + Most Requested ≈ **25 computed metrics**.

Two more pages ride this cluster's module tag: the **WhatsApp "Names of Null groups" insights** (families + teachers)
and **`/settings/security/data/backup/send`**.

---

## 2. What our product has today (control-level)

`reports.html` = a 3-tab hub on the existing `tabs()`/`#view=` engine:

* **Overview** — `reportActions()` (Print · Export CSV · Export PDF · Share = 4 `data-disabled-reason` gates +
  Schedule = a `data-confirm` → backendRequired toast) · 8 roll-up tiles (`REPORT_SUMMARY`, every value derived from
  an existing fixture count) · a filterable 7-card catalogue (5 available + monthlyReports + dataAnalysis) · 5 area
  detail cards with real deep-links · **Feedback review** (12 authored rows · type/status filterBar · a read-only
  drawer per row with Approve/Delete confirms · a 5-field Create-feedback drawer · a categories drawer = 5 rows +
  a 3-field create form + Save/Assign gates) · **Forms & surveys** (5 authored cards: title · questions · responses ·
  Default badge · status chip · a read-only drawer · a **10-control** Create-form drawer + Save gate · a real
  deep-link to `student.html#view=evaluation`).
* **Monthly** (`#view=monthly`) — 3 summary tiles + 3 month sections × 2–3 authored rows (area · count · signal chip ·
  narrative) + `Generate monthly report` and per-month `Export` gates. **0 filters, 0 inputs.**
* **Analysis** (`#view=analysis`) — 5 authored insight cards (count + **authored categorical** trend chip
  improving/steady/declining + note) + `Run analysis` / `Export` gates. **No chart, no `<canvas>`, no computed value.**

Adjacent surfaces that own parts of the legacy cluster: `leads.html` (Spec 034 → cluster C11) for the new-request
list/detail/notes/status/create; `teacher-performance.html#view=sessions-kpi|monthly` (Spec 036) for the teacher KPI
board; `student.html#view=evaluation` (read-only rubric) and `teacher-reports.html` (rubric **dimension names only**)
for the progress report; `finance.html` + the `classSalaryReport` lock (Spec 038) for salary reporting.

---

## 3. The honest gaps (control-level, legacy count → our count)

1. **Form builder: 10 controls vs an unbounded builder.** Ours = `formCreate-name` · `day` (6 options) + **exactly
   two baked** field rows (label · type · options · required) + Save gate. Legacy = name · day (1–7) + **N** rows with
   **Add Question / Delete / Add Option / Remove option** and **6** field types. Ours has **4** types
   (`FIELD_TYPE_OPTS = text · select · yesno · note`) — **Paragraph, Checkboxes/Multiple-Choice and Rating are absent**.
   No per-form **colour** control. → PARTIAL (owner 056).
2. **The monthly student progress report cannot be AUTHORED anywhere.** Legacy: a 9-input Send-Report modal, reachable
   by admin (`/management/forms/students`) *and* teacher (`/teacher/students`). Ours: the student Evaluation tab is a
   **read-only** rubric (4 criteria pills + achievements + objectives + an Approve confirm = **0 authoring inputs**),
   and `teacher-reports.html` renders the rubric **dimension names with no answer scale**. The producer surface is
   **MISSING for both roles** — while family-progress / student-evaluation (the consumers) already exist. This is the
   cluster's biggest real hole.
3. **The reports follow-up tracker is missing entirely.** Legacy: teacher/student/`has_report`/month filters over a
   student list = the "who still owes a monthly report" board (+ a Student Timetable modal). Ours: nothing —
   `rep.form.progressHint` just points at the student profile.
4. **Form responses cannot be viewed.** We render a `responses` count literal (42/18/31/0/12) and no way to open one.
   Legacy had a `Responses` column and (unproven, empty table) row Actions.
5. **Teacher-feedback note entry**: legacy = a per-teacher row `Add` → `feedback_note` posted with `teacher_id`+`date`.
   Ours = a generic 5-field Create-feedback drawer (type · subject · category · remark · note) + gate. Field-wise this
   is a superset, but there is **no per-teacher-per-month entry point** from the teacher board.
6. **Data Analysis**: legacy = 4 pages, ~15 chart widgets incl. a **country map** and money aggregates. Ours = 5
   authored cards. Charts/maps are forbidden by standing law; the *demographic breakdowns* (age/language/status/
   gender/country counts) are **not** forbidden and are simply absent → PARTIAL.
7. **Lead statistics board**: ~25 legacy metrics → 4 authored KPI cards on `leads.html`. The **9 status drill-downs**
   survive (as the leads status filter); the aggregates do not.
8. **Salary Class Report (admin)** = the one honest lock (`nav.config.js:93`, `status:'disabled'`,
   `reasonKey:'nav.reason.finance'`, no route). Legacy form = date range + Group By (Student/Date/Parent) + teacher
   select + Submit → `GET /management/update-result`. Correct to keep locked: a real one computes per-class pay.

---

## 4. What we deliberately REFUSED (must never be "fixed back")

* **Computed `Percentage` per teacher / per category** (`management-teacher-feedback-full.png` table columns) and the
  lead board's `% of requests` / `Requests Growth (MoM)` / `Avg. Families per Teacher` / **`Top Performer`** ranking →
  categorical chips + authored counts instead (Specs 029/036/037). No computed score/rank/percentile ever.
* **`analysis-expenses` teacher salary figures** (`Expected Teachers Salaries EUR 540.00`, a 12-month
  salaries/profit table) and the **teacher-role Salary + Salary Class Report rail**
  (`teacher-salary-class-report.json → sidebarLinks`) → teacher pay-free GLOBAL. Finance analysis belongs to Spec 038,
  never to the reports body.
* **WhatsApp "Names of Null groups"** — real family/teacher names, **real phone numbers** (`01154859653`,
  `201278910727`), a real e-mail (`abod11@gmail.com`) and a **live `chat.whatsapp.com/HNeGQ2J7HDzJAHmLKyIcIK…`
  invite URL** rendered in a plain table → REJECTED_PRIVACY, already excluded by Spec 040, owner **043**.
* **"Database backup has been initiated successfully."** — a GET route that fires a **real DB backup with no confirm**
  and then silently redirects to the Email/SMTP integration screen (which itself renders a
  `type=password smtp_password` field) → REJECTED_NO_FAKE + REJECTED_SECURITY; Spec 040 replaced it with a scoped gate.
* The legacy crawl's own operator PII (`Eslam Essam / eslammekky@gmail.com` in every profile menu) is never ported.

## 5. Evidence conflicts / naming risk

* **`nav.monthlyReports` label ≠ legacy capability** (legacy "monthly reports" = the form builder / progress-report
  workflow). Our tab is an authored ops roll-up. Nothing is faked, but a reviewer expecting the legacy meaning will
  read it as a regression. Record it in 042 and let **056/057** decide whether to rename the item or land the real
  progress-report workflow behind it.
* `management-forms` and `management-forms-students` are tagged to *different* modules in the crawl
  (Reports/Analytics vs Students) although the Forms page's own **"reports follow-up"** button links to the latter.
  The capability is one workflow; C08 owns it.
* `management-settings-security-data-backup-send` is tagged *Reports/Analytics* but is a Settings/Security route
  (Spec 040 owns the gate). Listed here for completeness only.
* The Forms table and the teacher-feedback drill-down were **empty at crawl time** ("No data found"), so the row-level
  **Actions** (edit/delete/set-default/toggle-status/duplicate) are **UNKNOWN_EVIDENCE** — never invent them.

## 6. Visual verdict

Our reports hub reads calm, academic and warm (cream + violet, rounded cards, labelled icon+text chips, working
light/dark and a clean 390px column) — a clear improvement on the legacy grey ERP board. Two visual notes:
the **Analysis tab is thin** (5 cards on a wide empty canvas — it looks unfinished rather than deliberate), and the
**Monthly tab has no per-month affordance beyond an Export gate**. Both are candidates for the 045–050 academic
redesign groups, not for new engines.

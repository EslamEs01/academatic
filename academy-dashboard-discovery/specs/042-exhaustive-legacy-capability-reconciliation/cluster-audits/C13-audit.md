# C13 — Exams / Assignments / Results & Evaluation · Capability Audit (Spec 042)

**Method (honest counts)**: **15 screenshots opened AS IMAGES** with the Read tool (8 legacy — 4 `-full.png` +
4 interaction frames — and 7 current) and **10 raw legacy records** read field-by-field
(4 page `.json` — forms/modals/tables/buttons/filters/interactions, 3 `text/*.txt`, 3 raw `.html` greps for the
Livewire wiring, chart library and empty-state strings). The current implementation was read at source
(`app/src/js/pages/tasks.js`, `pages/teacher-tasks.js`, `pages/students.js`, `pages/student.js` (targeted),
`pages/student-homework.js`, `components/ops-bands.js`, `components/result-summary.js`,
`components/evaluation-rubric.js`, `fixtures/ops-bands.js`, `fixtures/control-center.js` (tasks block),
`nav.config.js` (targeted) — **11 source files**). Where a module tag or a prior-spec summary disagreed with a raw
record, **the record won** (see §5).

## 0. Exact page assignment — all 4 cluster pages accounted for, grouped into 2 surfaces

| Surface | Legacy pages (2 + 2 = 4, zero unassigned) | Grouping rationale |
|---|---|---|
| **A — "Request Result" response tracker** | admin `management-schedule-trials-response` (`/management/schedule-trials-response`) · admin `management-schedule-sessions-response` (`/management/schedule-sessions-response`) | ONE tracker with two pill "tabs" that are really two server routes linking to each other ("Trial Responses" ↔ "Schedule Responses" — `internalLinks area:"main"` in both `.json`); identical shell, one table each, same two static modals |
| **B — staff "Tasks" (tickets) board** | admin `management-tickets` (`/management/tickets`) · teacher `teacher-tickets` (`/teacher/tickets`) | The SAME Livewire board rendered to two roles; the teacher variant differs only by the missing "Add Section" button (and its own sidebar) |

No filter/pagination variants exist in this cluster; no sampling was needed — all 4 records and all 8 legacy
screenshots (full + interaction) were inspected.

---

## 1. What the legacy actually is (proved from images + records)

### THE HEADLINE: there is NO legacy exam/quiz/assignment/homework engine

The cluster carries the module tags *Exams / Quizzes* and *Assignments / Homework*, but the raw evidence shows the
tags are classifier artifacts:

* The two "Exams / Quizzes"-tagged pages (`management-schedule-trials-response.json → modules`,
  `management-schedule-sessions-response.json → modules`) are **trial/schedule REQUEST-RESPONSE trackers** — the
  sidebar item is **"Request Result"** under the FAMILIES group (pixel-proved in
  `output/roles/admin/screenshots/management-schedule-trials-response-full.png`). Nothing on either page is an exam.
* The two "Assignments / Homework"-tagged pages (`management-tickets.json`, `teacher-tickets.json`) are **staff
  task/ticket boards** ("Tasks" in both sidebars). Nothing on either page is student homework.

Across this cluster the legacy corpus contains **no exam builder, no quiz, no gradebook, no marks entry, no student
assignment submission, no homework authoring**. The only academic-assessment artifacts in the whole legacy corpus
are the **monthly student progress report (9-input Send-Report rubric) and the form/questionnaire builder — both
owned by C08** (referenced, not re-owned here; the producer-surface gap is C08-02, owner 056). This absence must be
recorded so nobody ever "restores" an imagined legacy exam engine.

### Surface A — "Request Result" tracker (2 routes, both tables EMPTY at crawl)

Evidence: `output/roles/admin/pages/management-schedule-trials-response.json` (tables, modals, internalLinks),
`…/management-schedule-sessions-response.json` (same), `output/roles/admin/text/management-schedule-trials-response.txt`,
raw HTML greps, and the two `-full.png` + two interaction screenshots (opened as images).

| Element | Trial Responses | Schedule Responses |
|---|---|---|
| Table columns | **9**: Student · Parent · Course Name · Date · Time · Duration · Status · Requests · (unlabeled actions col) | **7**: Student · Parent · Course Name · Schedule · Status · Requests · (unlabeled actions col) |
| Empty state | pink banner **"no trial requests"** | pink banner **"No schedule requests"** |
| Static modal 1 | **"Teachers You Sent"** — table `# · Teacher Name` (0 rows) | same (baked on both routes) |
| Static modal 2 | **"Accepted Teachers"** — table `# · Teacher Name · Message from teacher · Options` (0 rows) | same |
| Filters / tabs / forms | none (page-level `forms[]` = logout + global search + shortcuts only) | same |

Reading of the workflow (strictly from the captured structure, no invention): a family/schedule request row would
show its Status plus a **Requests** drill-down revealing **which teachers the admin sent the request to**
("Teachers You Sent") **and which teachers accepted, each with a free-text "Message from teacher"** and an Options
column ("Accepted Teachers"). Both tables and both modals were **empty at crawl**, so the row-level actions, the
Requests cell content and the Options column content are **UNKNOWN_EVIDENCE** — never to be guessed.

### Surface B — staff "Tasks" (tickets) board (admin + teacher variants)

Evidence: `output/roles/admin/pages/management-tickets.json`, `output/roles/teacher/pages/teacher-tickets.json`,
both `.txt` files, raw `management-tickets.html` greps, and both `-full.png` + both interaction screenshots.

* **5 KPI counter tiles**: `Total: · Completed · Pending · Inprogres · Overdue` (all **0** at crawl; note the legacy
  typo **"Inprogres"** — `text/management-tickets.txt:23`).
* **A chart card that renders as an empty white box** with a stranded 4-colour legend
  (Completed/Pending/Inprogres/Overdue). Raw HTML loads **chart.js** (`ChartInstance` / `ChartInstance.destroy` in
  `html/raw/management-tickets.html`) — a computed status-distribution chart, empty at crawl.
* **"Staff Members" table** — `Name · Total: · Pending · Overdue · Completed · Average` (**0 rows**). The `Average`
  column semantics are unproven (empty), but the shape is a per-staff computed roll-up.
* **Admin-only "Add Section"** button → **Livewire `wire:click="create"`**
  (`html/raw/management-tickets.html`; the page loads `livewire.min.js`). The section/task create forms are rendered
  server-side on demand and were **never captured** — `management-tickets.json → modals` holds only the global
  mobilenavbar/searchAll/shortcuts modals. **All board form fields = UNKNOWN_EVIDENCE.**
* **Teacher variant** (`teacher-tickets-full.png`, opened as image): the IDENTICAL board — same 5 KPIs, same empty
  chart + legend, same **Staff Members table** — with **no Add Section** button. Sidebar: Home · Chat · Schedule ·
  Students · Library · **Tasks (New badge)** · Log Out. Two role/privacy facts fall out of this:
  the create permission is admin-only (asymmetry proved by the missing button), and **the teacher role is shown the
  whole org's per-staff task statistics** — a role-isolation leak (see §4).
* The interaction screenshots add nothing functional: the admin ones open the profile menu (exposing the crawl
  operator's real name/e-mail — §4), the teacher one opens the Shortcuts popover.

---

## 2. What we ship today (control-level, read at source)

* **`tasks.html`** (Spec 034, `pages/tasks.js` + `fixtures/control-center.js`): pageHeader with **New task** +
  **Add Section** triggers → two `formDrawer`s — task form = **7 fields** (name · desc textarea · assignee select ·
  status select · priority select · due · section select) + ONE backendRequired Save; section form = **1 field** +
  gated Save. **4 KPI tiles** (total 24 · completed 11 · pending 9 · overdue 4 — authored), a **display-only 4-column
  status board** (pending/inprogress/completed/overdue; per-column honest tally badge; cards = title + priority chip +
  due chip + assignee line; NO drag), and the **Staff Members table with all 6 legacy columns**
  (Name/Total/Pending/Overdue/Completed/**Average**) where Average is an **authored categorical literal**
  (`task.avg.good|fair`), never computed. No chart, no `<canvas>`. Verified visually in
  `app/screenshots/tasks__ar__light__desktop__sp034-tasks.png` and `…sp034-tasks-create.png` (both opened as images).
* **`teacher-tasks.html`** (Spec 025, `pages/teacher-tasks.js`): the teacher-portal Tasks board — 3 authored
  prep/review cards (status tag + due chip) + a monthly-plan preview row + ONE honest gate («إنهاء مهمة أو إسنادها
  يتطلّب الاتصال بالخادم»). **No Add Section** (matches the legacy permission asymmetry) and **no org-wide staff
  table** (deliberate — §4). Pay-free. Verified in `app/screenshots/teacher-tasks__ar__light__desktop.png`.
* **`schedule.html` requests band** (Spec 026, `components/ops-bands.js → scheduleRequestsBand()` +
  `fixtures/ops-bands.js → SCHEDULE_REQUESTS`): the fold of the Request-Result/schedule-requests capability — a
  display-only pending-inbox band, 2 authored request cards each carrying a **kind chip (regular/trial)** — the
  current mirror of the legacy trial-vs-schedule split — student + course + when, and **Accept / Reject
  backendRequired gates**. The fixture header names `management-schedule-*-response` as its grounding and records
  that both captures were empty. Verified in `app/screenshots/schedule__ar__light__desktop__list.png` (band renders
  at the bottom of the schedule list: «طلبات الجدولة الواردة… للعرض فقط», قبول/رفض gates).
* **`students.html#view=results` / `#view=evaluation`** (Spec 037, `pages/students.js → resultsPanel/evaluationPanel`):
  cross-student display boards — per row: avatar + name + family/level meta + (results) an **authored
  certificate-count literal** + lifecycle chip + deep-link `student.html#view=results`, or (evaluation) an authored
  **approved/pending chip** + month + deep-link `student.html#view=evaluation`. Source comments and code confirm
  **NO computed score/rank/GPA/percentage/average**. Routes pinned in `nav.config.js:47-48`. Verified in
  `app/screenshots/students__ar__light__desktop__sp037-student-results.png`.
* **`student.html` Results / Evaluation tabs** (`pages/student.js:227-243` → `components/result-summary.js`,
  `components/evaluation-rubric.js`): Results = per-course progress bars + certificates list + Export
  (disabled+reason) / Print (demo toast); Evaluation = the **read-only 4-criteria rubric** (rating pills icon+text,
  approved chip, achievements + objectives narratives) + **Approve = `confirmAction` → `common.backendRequiredNote`**
  (an honest confirm, no fake approval). Verified in `app/screenshots/student__ar__light__desktop__evaluation.png`
  («تقرير تقدّم شهري وصفي – وليس نظام درجات» + «عرض تجريبي – لا يوجد سير عمل اعتماد فعلي»).
* **`student-homework.html`** (Spec 019, `pages/student-homework.js`): the child-view homework page — KPI trio +
  homework grouped pending/in-progress/reviewed + teacher-note lines on reviewed items + the **hwSubmit gate**
  («تسليم الواجبات… يتطلب الخادم»). Zero forms. Verified in
  `app/screenshots/student-homework__ar__light__desktop.png`.

**Role/permission picture (current)**: task board writes and Add Section = admin surface; teacher portal gets its
own scoped board; the child (not a role — child-view per Spec 021) gets display-only homework with a submit gate;
family portal untouched by this cluster. Hiding is not authorization — every write is a gate, and the real
permission model is backend-owned (043 for RBAC enforcement).

---

## 3. The honest gaps (control-level)

1. **The request→teacher→response tracking half of Surface A is not shipped.** We ship the *pending inbox*
   (accept/reject gates on `schedule.html`), but the legacy page's actual identity — a **response tracker** with
   Status + Requests columns and the **"Teachers You Sent" / "Accepted Teachers" (Message from teacher · Options)**
   per-request drill-down modals — exists nowhere in the current app. An admin cannot see which teachers a request
   went to, who accepted, or what the teacher wrote. Tracker table → **PARTIAL** (C13-07); the two modals →
   **MISSING** (C13-08); the propagation engine behind them → **FUTURE_BACKEND** (C13-14). Primary owner **055**
   (cross-role propagation & workflow consistency).
2. **Every form field on the legacy Tasks board is unproven.** The create-task and Add-Section forms are Livewire
   (`wire:click="create"`) and were never rendered in the capture. Our 7-field task drawer + 1-field section drawer
   are **authored derivations from the captured columns** (the `pages/tasks.js` header says exactly that). This is a
   documented-unknown, not a verified match → **UNKNOWN_EVIDENCE** (C13-02, C13-03), owner **056** (forms & data
   capture audit) to settle the canonical field set when the backend arrives.
3. **Response-row actions / Requests-cell / Options-column content** (Surface A tables empty at crawl) →
   **UNKNOWN_EVIDENCE** (C13-09), owner **055**. Never invent an edit/resend/cancel action.
4. **Real persistence** for task/section create-edit, task completion/assignment, and homework submission upload →
   **FUTURE_BACKEND** (C13-13), nearest owner **056**.

## 4. What we deliberately REFUSED (must never be "fixed back")

* **The computed task-status chart** (chart.js card + 4-colour legend, empty white box at crawl,
  `html/raw/management-tickets.html`) → charts/`<canvas>` are forbidden by standing law; replaced by the display-only
  status board with honest per-column tallies (C13-04).
* **A computed per-staff `Average`** → the column is kept (6/6 legacy columns) but its value is an **authored
  categorical literal** (good/fair), never math (part of C13-01's verification).
* **Org-wide staff task statistics rendered to the TEACHER role** (`teacher-tickets-full.png` shows the full Staff
  Members table + all-staff KPI counters inside the teacher session) → our teacher board is scoped to the teacher's
  own work; the exposure is REJECTED_PRIVACY / role isolation, owner **043** (C13-06).
* **Fake exam/assessment machinery**: our Approve, Export, Print, submit-homework, accept/reject and Save finals are
  all gates or labelled demo toasts — no fake approval workflow, no fake grade, no invented exam engine (§1 headline;
  C13-10 records that legacy had nothing to port).
* **The crawl operator's real PII** (`Eslam Essam · eslammekky@gmail.com`, visible in the profile-menu interaction
  frames of both admin pages) is never ported (C13-15) — consistent with C08-13.

## 5. Evidence conflicts (resolved from raw evidence)

1. **Module tags vs. reality** — the crawler tagged Surface A *Exams / Quizzes* (apparently keying on the sidebar
   label "Request **Result**") and Surface B *Assignments / Homework* (task ≈ assignment). The raw pages disprove
   both tags. The cluster paths file (`cluster-evidence-paths/C13-paths.md`) inherits the tags; this audit follows
   the **records**, and the "exams/assignments" capability comparison therefore resolves to the C08 rubric reference
   plus the §1 absence finding.
2. **Capability overlap with other clusters** — Surface A is functionally a scheduling-workflow surface (its Spec-026
   fold lives on `schedule.html`), and the monthly progress report / rubric authoring overlap belongs to **C08**
   (the 9-input Send-Report modal finding, owner 056). C13 owns the response-*tracking* gap (C13-07/-08/-14); it does
   NOT re-own the C08 authoring gap.
3. **Both Surface A tables and both Surface B tables were empty at crawl** ("no trial requests" / "No schedule
   requests" / all-zero KPIs / 0 staff rows) — every row-level behaviour is UNKNOWN_EVIDENCE by construction; only
   the captured structure (columns, counters, modals, buttons) is treated as proven.
4. **`pages/tasks.js` drops the fifth KPI tile** ("Inprogres") while keeping in-progress as a board column — a
   deliberate reshaping, recorded here so the 4-vs-5 tile diff is never misread as a lost status (the status itself
   survives, typo fixed, in `TASK_STATUS_ORDER`).

## 6. Visual verdict

Legacy: a competent but generic purple ERP shell; its two real visual defects are the **empty chart card rendering
as a large blank white box with a stranded legend** (both tickets pages) and the response tracker being a whole page
that is ~90% empty pink banner. Current: the tasks board (`tasks__ar__light__desktop__sp034-tasks.png`) is a clear
improvement — warm cream/violet RTL, labelled icon+text priority/status chips, honest tallies, clean drawer
(`…sp034-tasks-create.png`) — and the students results/evaluation boards and child-view homework page read calm and
consistent. Two review notes for the 045-050 groups (C13-16): the **schedule-requests band sits at the very bottom
of a long schedule list page** (weak discoverability for an admin looking for "Request Result"), and the tasks board
columns render somewhat sparse at 2 cards/column on wide desktop. Neither needs an engine — placement/density only.

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C13-01 | Staff Tasks board structure (5 status counters · status board · 6-column staff table incl. non-computed Average) | COMPLETE_AND_VERIFIED | — | §1 Surface B / §2 tasks.html / §4 |
| C13-02 | Create/Edit-task form fields (legacy Livewire form never captured; ours = authored 7-field drawer + gated Save) | UNKNOWN_EVIDENCE | 056 | §3 item 2 |
| C13-03 | Add-Section form fields (`wire:click="create"`, uncaptured; ours = 1-field drawer + gated Save) | UNKNOWN_EVIDENCE | 056 | §3 item 2 |
| C13-04 | Computed task-status distribution chart (chart.js + 4-colour legend) | REJECTED_NO_FAKE | — | §4 |
| C13-05 | Teacher-role Tasks board variant (scoped prep/review board, no Add Section — matches legacy permission asymmetry) | INTENTIONALLY_IMPROVED | — | §1 Surface B / §2 teacher-tasks.html |
| C13-06 | Legacy exposure of org-wide per-staff task statistics to the teacher role | REJECTED_PRIVACY | 043 | §1 Surface B / §4 |
| C13-07 | Trial/Schedule response tracker tables (Student·Parent·Course·Date/Time/Duration/Schedule·Status·Requests) | PARTIAL | 055 | §1 Surface A / §3 item 1 |
| C13-08 | "Teachers You Sent" / "Accepted Teachers" per-request drill-down modals (teacher message + Options) | MISSING | 055 | §1 Surface A / §3 item 1 |
| C13-09 | Response-row actions + Requests/Options cell content (both tables empty at crawl) | UNKNOWN_EVIDENCE | 055 | §3 item 3 / §5 item 3 |
| C13-10 | Legacy exam/quiz/assignment/homework engine (none exists in the corpus — nothing lost; guard against invention; rubric authoring = C08-02) | INTENTIONALLY_IMPROVED | — | §1 headline |
| C13-11 | Cross-student Results & Evaluation boards + read-only student Results/Evaluation tabs (no computed score/rank/GPA/chart; Approve = backendRequired confirm) | INTENTIONALLY_IMPROVED | — | §2 |
| C13-12 | Child-view homework page (state-grouped cards, teacher notes, honest submit gate; legacy has no student role) | INTENTIONALLY_IMPROVED | — | §2 |
| C13-13 | Real persistence for task/section writes, task completion/assignment and homework submission upload | FUTURE_BACKEND | 056 | §3 item 4 |
| C13-14 | Request→teacher→response cross-role propagation engine (send-to-teachers, acceptance, teacher message) | FUTURE_BACKEND | 055 | §3 item 1 |
| C13-15 | Legacy crawl operator PII in profile menus (real name + e-mail in interaction frames) | REJECTED_PRIVACY | — | §4 |
| C13-16 | Schedule-requests band discoverability + tasks-board column density (visual notes) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045-050 | §6 |

Honest counts: screenshotsOpened=15 · recordsInspected=10 · currentSourceFiles=11

# C06 — Sessions, Schedule, Attendance · Capability Audit (Spec 042)

**Method (honest counts)**: **34 screenshots opened AS IMAGES** with the Read tool (22 legacy + 12 current) and
**16 raw legacy page records** (`output/roles/*/pages/*.json` — forms, modals, tables, buttons, interactions,
network) read field-by-field. The current implementation was read at source
(`app/src/js/pages|components|fixtures|locales`). Where a planning summary and a raw record disagreed, the record won.

Legacy records read: admin `teacher-home` (= the class board at `/management/home`), `management-session-class-room-mq-3`
(screens), `management-sessions-analysis`, `management-all-teachers-timetable`, `management-search-schedule`,
`management-request-schedule-1-1`, `management-schedule-sessions-response`, `management-schedule-trials-response`,
`management-public-holiday`, `management-scheduled-actions`, `management-scheduled-actions-create`;
teacher `teacher-timetable`, `teacher-session-class-room-mq-2`, `teacher-course-history-1-class`;
family `student-timetable`, `student-today-sessions`, `student-student-history-fillter-2`.

---

## 1. What the legacy actually is (proved from records + pixels, not summaries)

The "Classes / Live Sessions" module is **a class-lifecycle machine**, not a list page. The class board
(`teacher-home-full.png` = `/management/home`) carries: 6 tiles (Total Classes · Sessions Pending · Attend Sessions ·
Waiting & Running · Cancel Sessions · Sessions Absent), a collapsible **Filter Classes** form (`date_range`,
`from_time` h+m, `to_time` h+m, `teacher_id`, `family_id`, `student_id`, `type` ∈ {session, Trial, Group} → Search =
**9 controls**), a **display-mode modal** `custemize-table` (`timeType` ∈ Today's/Upcoming/Past + `groupByTime` =
**2 controls**), an **Excel export** (`POST /management/export-aa`), and a per-row kebab whose **ten** items are
pixel-visible in `teacher-home-002-page-interaction-002.png`:

> Reverse Action · Add Queue · Attend Class · Cancel Class · Absent Class · Edit Class · Running · Send Reminder ·
> Send WA Message · **Delete Fine**

Each kebab item is a real multi-control modal (field lists taken verbatim from `teacher-home.json → forms/modals`):

| Legacy modal | Evidenced visible controls | Count |
|---|---|---|
| `markAsAttended` "Mark as attend" | 2 radios (no-details / with-details) · `remark` select (Excellent…Needs Improvement) · `summary` · `homework` · `notes` · `images[]` **file** | **7** |
| `markAsabsent` "Mark As Absent" | `absent_by` (Student/Teacher) · `note` · 3 `sendMessage` radios (Don't send / Default / Custom) · `message` · makeup buttons (No Make-up / Auto Make-up / Reschedule) · `add_to_credit` · 2 `cancelTzType` radios (student/teacher timezone) · `date` · `time` (h+m) | **13** |
| `cancelClass` "Cancel Class" | `cancel_by` (Teacher / Student / **Admin** Cancel) · `note` · `sendMessage` · makeup buttons · `add_to_credit` · 2 tz radios · `date` · `time` (h+m) | **10** |
| `editClass` "Edit Class" | `date` · `time` (h+m) · `sendMessage` · `duration` (15 options) · **`teacher_id` (REASSIGN)** · `accounting_statement` (Paid / Paid if continue / Free) | **8** |
| `sendWhatsappMessage` | `wa_message` · `send_teacher` · `send_student` | **3** |
| `addQueueAction` "Add Quick Queue" | `level` (Urgent/Medium/Normal) · `text` | **2** |
| `feedback` "Add Feedback" | `feedback_note` · `feedback_files[]` **file** (panel labels "Category / **Percentage**") | **2 + a computed metric** |

The **class detail** (`teacher-home-004` / `management-session-class-room-mq-3-004`) = "Class History" with Trial/Paid
chips, an Actions dropdown, teacher + student cards, Management date/time/duration, **Class Information** (Class Remark ·
Note · Class Summary · Homework), **Files** (teacher / student), a **TimeTable event log** (Student Enter At · Teacher
Enter At · Remind Teacher At), **Class Recording** ("No recording available"), **Show Queues (0)**, **Direct Links**, and
a **Timeline audit log** ("… updated Status" / "mohamed created").

**Teacher role** (`teacher-session-class-room-mq-2.json`): its own `endclass` modal (`remark`/`summary`/`homework`/
`notes`/`images[]` = **5**), `markasAbsent_teacher` (`video` file + `notes` = **2**), `editClass` (date/time/notify/
duration = **8**, **no teacher reassign, no accounting_statement** — a genuine role restriction), `modalTop` "Request
Cancel" (Reschedule / Auto Make-up radios + date + time), plus **Enter Again / End class / Send Reminder / Running**.

**Family role** (`student-today-sessions.json`): today's classes table (10 cols incl. **Subscription** and **Files**),
`modalTop` "Request Cancel" (Reschedule Class / No Reschedule radios + date + time h/m → POST), and `uploadFileModal`
(`files[]` + an audio "Or record voice" slot → `POST /student/upload-files`). `student-student-history-fillter-2` =
a per-student history picker → table (Class Date & Time · Teacher · Show) + detail modals.

**Timetable / Schedule (8 pages)**: an all-teachers week grid (`management-all-teachers-timetable`) with a **teacher
checkbox filter**, counters ("3 sessions per week", "1 different students"), a **course-status legend Active /
Active & unpaid / Inactive**, and an `eventPopover` (Show Details · Edit course · Show Student); the teacher's own week
grid with an **`availabilityModal`** (From day · To day · From time · To time · Available/Not-Available = **5 controls**,
Add/Update/Delete) and an `editSchedulePopover` (POST `/teacher/timetable`); the family weekday table;
`search-schedule` (`POST /management/search-available-teacher`: from h+m, to h+m, `category_selected[]`,
`filter_by_available`, `filter_by_courses` = **8 controls** — the page renders **no results area at all**);
`request-schedule/{parent}/{student}` (`POST store-request-schedule`: trial-vs-regular radios, teacher-category
multiselect + teacher list with **Select All**, `course_id`, `duration`, **`accounting_statement`**, `date`, `time`, and
for a regular course `total_hours`, `start_date` + **seven `schedule[i][value|time|duration]` weekly slot rows** ⇒
**~35 controls**); and the two response inboxes (`schedule-sessions-response` / `schedule-trials-response`) with tabs,
tables (Student · Parent · Course · Schedule|Date/Time/Duration · Status · Requests) and the modals **"Teachers You
Sent"** and **"Accepted Teachers"** (Teacher · *Message from teacher* · Options).

**Public Holiday** (`management-public-holiday.json`): `from_date`, `from_time` h+m, `to_date`, `to_time` h+m,
`category_selected[]`, a teacher list with **Select All** → `POST /management/public-holiday-submit` (**~9 controls**;
sets a holiday for all/part of the teachers = an implicit bulk cancel).
**Scheduled Actions**: list = 2 filters (`action_type`, `status`) + a **10-column** table (# · Action Type · Target ·
Scheduled Date · Status · **Created by** · **Executed At** · **Result** · Note · Settings); create = **18 visible
controls** (`action_type`, `scheduled_date`, per-type targets, `returned_at` ×2, `criteria[teacher_id]`,
`criteria[material_id]`, 3 `criteria[cancel_type]` radios (Auto Makeup / Reschedule / No Makeup),
`criteria[reschedule_date]`, `criteria[reschedule_time]`, `criteria[add_to_credit]`, `note`).
**Sessions Analysis**: Filter-Classes form (**8 controls**) + Regular **11** rows (incl. **Returned Today**) +
Trial **8** rows + Helpers **4**.

## 2. What we ship today (read at source)

`sessions.html` (List + today-agenda tabs, 4 status tiles, 3 filter controls, row kebab, the canonical outcome drawer,
the folded ops-queue band, a `sess-new` **7-field** form drawer) · `schedule.html` (day-grouped list + a hand-rolled
week grid, teacher-lens/subject/status filters, the appointment drawer, the folded schedule-requests band) ·
`attendance.html` (5 outcome tiles that double as filters, 6 filters + search, outcome rows, the canonical outcome
drawer) · `sessions-analysis.html` (4 helpers + **10** regular + **6** trial authored stat cards + an export gate) ·
`schedule-search.html` (5 filters + KPIs + candidate cards + per-slot drawer + book/assign gates) ·
`public-holiday.html` (4 tiles + 5 window cards + **2 gates, 0 form controls**) · `scheduled-actions.html`
(4 tiles + 6 queued cards + **1 gate, 0 filters, 0 form controls**). Portals: `teacher-schedule`, `teacher-outcomes`
(record = `gateNote`), `family-schedule`, `family-requests`, `student-schedule`, `student-history`.

## 3. The honest gaps (control-level)

1. **Every session-lifecycle write is a ZERO-FIELD control.** `components/outcome-details.js:gatedActions()` renders
   "Mark attended" as a bare `data-demo-action` toast (**0 fields vs 7**), and student-absent / teacher-absent / cancel /
   reschedule as `data-confirm` dialogs (**0 fields vs 13 / 13 / 10 / 8**). None of the evidenced decision inputs exist
   anywhere in our product: *who cancelled* (admin/teacher/student), *notify none/default/custom*, *make-up
   none/auto/reschedule-to-date+time*, *add-to-credit*, *student-vs-teacher timezone*, *class remark*, *summary*,
   *homework*. The toasts are **honest** ("يُتاح بعد ربط الخادم") — the **forms are simply absent**.
2. **"Edit / Reschedule" is a toast, not a form.** `components/appointment-details.js:appointmentActions()` emits
   `data-demo-action data-toast="appt.editedToast"` with **0 fields** — so the one place a session's date/time/duration/
   **teacher reassignment**/accounting statement could change renders nothing. Spec 032's "no field-less create/edit"
   sweep audited `data-modal-trigger` openers; this `data-demo-action` opener slipped through.
3. **The sessions row kebab is weaker than every other kebab** (`enhance.js:94-101`): View (drawer) · Edit
   (`data-demo-action`) · **Cancel (`data-demo-action` — a plain toast, NOT a `data-confirm`)**, while
   `familyMenu`/`studentMenu`/`teacherMenu`/`staffMenu` all guard their destructive item with `data-confirm`.
   Legacy has 10 items here. An inconsistency to fix in 044, not a "feature" to preserve.
4. **The request→response scheduling loop is missing.** We render the *inbox* side as two display cards with
   accept/reject gates (`ops-bands.js:scheduleRequestsBand`) but there is **no surface at all** for *sending* a
   schedule/trial request to a set of teachers (~35 controls incl. the 7 weekly slot rows), and no "Teachers you sent /
   Accepted teachers + message from teacher" response view.
5. **Public holiday and scheduled actions are display-only shells.** Legacy public-holiday = a ~9-control form that
   bulk-cancels; ours = 0 form controls + 2 gates. Legacy scheduled-actions = 2 filters + a 10-column table (incl.
   *Created by · Executed At · Result*) + an **18-control** create form; ours = 0 filters + 0 form + 1 gate.
6. **Sessions Analysis lost its filter and three rows.** Legacy: an 8-control Filter-Classes form + **11** regular rows
   (incl. **Returned Today**) + **8** trial rows. Ours: **10** regular (no Returned Today) + **6** trial (no Teacher
   Cancel, no Admin Cancel) + **no filter at all**.
7. **Teacher availability editing is gone.** Legacy `availabilityModal` = 5 controls + Add/Update/Delete on
   `/teacher/timetable`; ours is a `gateNote` line on `teacher-schedule`.
8. **Family "Request cancel/reschedule" and "Upload session files" are gone.** Legacy family `modalTop` (2 type radios +
   date + time → POST) and `uploadFileModal` (`files[]` + voice → `/student/upload-files`); ours = a preview card + a
   gate on `family-requests`, and no session-file surface anywhere (teacher `images[]` / class Files panel likewise).
9. **The class-detail depth is missing**: no event log (Student/Teacher Enter At · Remind Teacher At), no timeline audit
   log, no queues panel, no files panel. Our drawer shows ~10 rows.

## 4. What we deliberately REFUSED (must never be "fixed back")

* **Pay on session surfaces** — the legacy prints **`(3.00 Fine)` on every class row** (admin board `teacher-home-full.png`
  *and* the teacher board `teacher-session-class-room-mq-2-full.png`), a **"Delete Fine"** kebab item wired to
  `POST /management/teachers/1/compensations/3` **with no confirmation** (`teacher-home.json → forms`), a teacher-home
  "Your Salary **997.00 EGP** / Estimated 1,537.00 / **Fines: 1,003.00** / Bonus 2,000.00" panel, and a `Price` column in
  `teacher/update-result`. **REJECTED_PAY_FREE**; `classSalaryReport` stays the sole honest lock.
* **"Active & unpaid" tinting of timetable blocks** (the legacy course-status legend, `management-all-teachers-timetable-full.png`)
  — a payment signal leaking into a teaching surface. REJECTED_PAY_FREE (the standing M-14 exclusion).
* **Computed percentages** — the teacher home prints "**Attended Percentage 0%**", Classes-KPI prints a `Percentage`
  column per teacher (`management-class-feedback-full.png`), and the Add-Feedback panel carries a `Percentage` label.
  REJECTED_NO_FAKE / no-computed-metric; Spec 036's `teacher-performance#view=sessions-kpi` ships authored session
  **counts** + categorical quality chips instead — an improvement to preserve.
* **Fake live room / recording / direct links** — legacy "Enter Again", "Start", "Running", "Direct Links", "Class
  Recording". We render one honest `appt.joinReason` gate. Owner: **054**.
* **Real PII** — the crawl's real names (محمد احمد · منار حسن · المعلم محمد صادق صادق), the staff email
  `eslammekky@gmail.com`, and the WhatsApp send-to-teacher/student flow are NOT ported; all our session data is authored.
  Messaging channel owner: **053**; the family class table's cross-child exposure + the admin board's
  parent+student+teacher name triple: **043**.
* **No-confirm destructive actions** — "Delete Fine" fires straight from the kebab with no dialog. We keep confirms
  (and must add one to the sessions kebab Cancel, see gap 3).
* **The family "Subscription" column** on the today-classes table (`student-today-sessions.json → tables`) — a payment
  signal in the family app. REJECTED_PAY_FREE (family zero-pay).

## 5. What we do BETTER (preserve)

* A dedicated **Attendance & Outcomes review board** (`attendance.html`) — the legacy has no such surface (outcomes exist
  only as per-row modals + the analysis board). Our outcome tiles double as filters, every row is labelled icon+text, and
  the drawer links out to the student and the family.
* **Schedule Search** as a real, filterable availability finder with KPIs, per-slot detail drawers and honest book/assign
  gates (Spec 035) — the legacy page is a bare 8-control form that renders **no results area at all**.
* **The week grid** (`schedule.html#view=timetable`) — day columns, real block cards with teacher/room, conflict + "may
  run late" flags. The legacy grid is a raw hour lattice with unlabeled colour tints.
* **Sessions Analysis** carries an explicit "display only, nothing is computed" note and no chart engine.
* Zero-pay family portal + child-view student pages; no Subscription/Fine anywhere.

## 6. Owner assignment

* **044** Modal/Drawer/Long-Form Interaction System → SES-04…SES-08 (attend/absent/cancel/edit/reverse forms), the
  row-kebab confirm inconsistency, the drawer→form escalation, the class-detail depth.
* **056** Complete Forms & Data Capture Audit → the same field sets + the Filter-Classes form, public-holiday (~9),
  scheduled-actions create (18), request-schedule (~35), teacher availability (5), display-mode preference.
* **055** Cross-Role Propagation → the request→response→class-created loop, notification fan-out, the audit timeline.
* **053** Integrations Command Center → Send WA Message / Send Reminder channels.
* **054** Embedded Virtual Classroom → enter/end/running, recording, direct links, the enter-time event log.
* **043** Privacy/Role Isolation → the family class-history student picker and the admin board's parent+student+teacher
  name exposure.
* **045–050** page review / visual redesign → `sessions-analysis` (a flat 20-card grid reads as a generic ERP KPI wall),
  `scheduled-actions` / `public-holiday` (card walls with no filter, no table, no empty state).

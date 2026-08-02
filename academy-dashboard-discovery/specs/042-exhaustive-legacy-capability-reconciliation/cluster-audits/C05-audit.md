# C05 — Courses & Groups — Capability Audit (Spec 042)

Method: 37 screenshots opened AS IMAGES (22 admin legacy, 3 teacher legacy, 1 family legacy, 11 current app);
17 raw records inspected (11 legacy page `.json`, 2 combined inventories, 4 prior-spec artifacts). Every field count
below is taken from the RAW `forms[]` arrays in the page records, not from planning summaries.

## 0. THE CENTRAL FINDING — two different meanings of the word "Course"

**Legacy "Course" (`/management/courses`) is NOT a subject catalogue. It is a per-student ENROLLMENT /
SUBSCRIPTION CONTRACT.** Proof (image + raw record, not inference):

- `management-courses-full.png`: the "List of Courses" table columns are `# · Student Name · Teacher Name · Date ·
  Total Hours · Status · Invoice · Price · Actions`, with a `Total:` money row. That is one row per *student × teacher
  × subject × schedule*, not one row per subject.
- `management-courses-1-full.png` (course #1): `Serial Number Eg91718 · Ordered Number · Student Name · Course Hours
  Count 5 · Parent name · Course Name (arabic) · Teacher Name · Invoice → "Create Invoice" · Status "Active & unpaid"
  · schedual → "Show Timetable" · Price 30`.
- `management-courses-1-create` posts to `/management/courses/1/store` where `1` is the **student id** (record
  `discoveredFrom: /management/student`), and the page header literally reads **"SCHEDULE FOR STUDENT محمد احمد —
  abdo ahmed"**.

**Our "Course" (`courses.html` / `course.html`) is a SUBJECT OFFERING** (Math L2 · 142 students · 2 groups ·
2 teachers · Learning Path). The legacy enrollment record is split across our model into
`student.html → Courses tab` (enrollment cards: course, teacher, status chip, progress) + `groups`/`schedule`
+ `finance` (invoices). This split is a deliberate, good model (Spec 006), but it means **several legacy
capabilities have no home at all** — they were not "improved away", they were dropped. They are listed as MISSING
below and must not be hand-waved as "covered by courses.html".

## 1. Legacy control inventory (raw, field-by-field)

`students_form` on the four course forms (from `forms[]`, `_token` excluded):

| Form | Endpoint | Raw fields | Allowed-by-our-laws controls |
|---|---|---|---|
| create (paid) | `courses/{studentId}/store` | 17 | material_id · teacher_id · start_date · schedule[0] {student day, student time, **teacher day, teacher time**, duration} · student_cancel (12 opts) · teacher_cancel (12 opts) = **10** (+ 6 rate controls REJECTED) |
| create **free/trial** | `courses/{studentId}/store_free` | 14 | same minus the family-rate pair; **a distinct free/trial creation path** |
| edit | `courses/{id}/update` | 31 | + `delete_old_sessions` · **`update_current` / `update_default`** (apply scope: current course vs default course) · N repeatable schedule rows (3 baked) = **~24** |
| copy | `courses/{id}/store` (prefilled from an existing course, route `courses/create_new_copy/{id}`) | 29 | duplicate-an-enrollment |

Row kebab on the list AND on the detail (`management-courses-006`, `-1-002`): **Copy Course Data · Add Classes ·
Assign This Course To Invoice · Show Timetable · Show Current Course · Show Default Course · Change Status · Edit ·
Schedule Cancel on Date · Delete** (10 actions).

List toolbar (`filter_form`, raw): **7 saved views** (All / Renew / Completed & Not Paid / Courses no invoice /
Deleted Courses / actual hours exceed total hours / Courses with Free Hours) + teacher select + date range +
has_invoice + **8 status checkboxes** (Stopped, Inactive, Active, Active & unpaid, Suspended, Indebted, Completed,
Free) + Filter + Reset + **Export Courses** = ~20 controls, plus 6 KPI cards.

Baked modals on the list/detail (raw `modals[]`): `schedule-cancel-course-N-modal` (scheduled_date, cancel_type
{Auto Makeup | Reschedule | No Makeup}, reschedule_date, reschedule_time, **add_to_credit**, note = 8 controls),
`assigninvoiceModal` (invoice select), `statusModal` (Mark as Active & Unpaid / Active & Paid / Completed / Stop),
`basicModal` "Add Lesson" (date, time, duration, from-credit, teacher, accounting_statement {According to the
teacher | Paid | Free}), `modalTop` "Student Timetable" (**dual-timezone** weekly grid: student weekday+time /
teacher weekday+time / duration).

Groups: `management-group-index` table = `# · Start Date · Group Name · Teacher Name · **Teacher rate** ·
**Student rate** · Schedule · Status · Options` with **0 rows captured** (so the per-row Options menu was never
seen). `management-groups-create` = **45 raw fields**: name, start_date, teacher, `t_hour_rate`, `students[]`
(multi-select + search), `s_hour_rate`, `course_id`, `suggested_total_hours`, and a **7-weekday timetable**
(per day: enable checkbox + time + duration).

## 2. Our current control inventory (raw source)

- `courses.html`: 3 summary cards + filterBar (search, subject, level, status) + card grid + `crs-add` drawer.
- `course.html`: banner + 7 actions (**Edit · Assign teacher · Add students · Create group from course ·
  View in schedule · View attendance · Print (gate)**) + 8 tabs (Overview/Groups/Students/Teachers/Timetable/
  Outcomes/Learning Path/Notes) + `crs-edit`, `crs-enroll`, `crs-assign-teacher`, prefilled `grp-add` drawers.
- `crs-add` = **6 fields** (subject, teacher, start date, weekly day, session time, duration) → 1 gated Save.
  `crs-edit` = **7** (+ old-sessions keep/delete). Both single-schedule-row, single-timezone.
- `groups.html`: 3 tiles + 6 filters + group rows + `grp-add`. `grp-add`/`grp-edit` = **8 fields** (name, start
  date, course, candidate students [**single select**], day, time, duration, suggested hours) — **no teacher field
  at all**, while the legacy create form *requires* one.
- `group.html`: 8 actions (Edit · Add students · Remove student [confirm] · Move student [gate] · Assign teacher ·
  Schedule · Attendance · Print [gate]) + 7 tabs.
- Sessions-side: `sess-new` (sessions.html) = 7 fields (course, teacher, date, time, duration, from-credit, status)
  ≈ the legacy "Add Lesson" modal — but it is NOT reachable from a course/enrollment.

## 3. What we correctly REFUSE (must never be "fixed back")

- **Teacher hour rate.** `teacher_hour_rate` / `t_hour_rate` appear on course create, course create-free, course
  edit, course copy, the group create form AND as a **"Teacher rate" column on the group list**. Worse: the course
  detail class table renders `Duration Price` = `60 min (120)` — 120 is exactly the custom teacher hour rate from
  `management-courses-1-edit` (family rate 6 × 5h = the 30.00 course price; teacher rate 120/h × 60min = 120), i.e.
  the legacy course screen exposes **per-class teacher pay**. REJECTED_PAY_FREE, permanently.
- **Money on the course object** (Price, student hour rate, invoice assignment, "Active & unpaid"/"Indebted"/"Free"
  statuses, `add_to_credit`). Admin finance (Specs 030/038) owns invoices; the course/group/family/teacher surfaces
  stay figure-free (Spec 009 invariant · family zero-pay).
- **Charts** on `management-analysis-course` (treemap + two bar charts) — banned by the standing no-chart law;
  Spec 037 rebuilt analysis as authored, chart-free cards.
- **Real PII** in the corpus (student محمد احمد, parent abdo ahmed, admin *Eslam Essam / eslammekky@gmail.com* in
  `management-courses-003-page-interaction-003.png`) — never ported; our fixtures are authored.

## 4. Real gaps (ranked)

1. **The enrollment ledger does not exist.** No cross-student list of "who is enrolled with whom, on what schedule,
   in what state". Our `courses.html` answers a different question. Admins lose the 7 legacy working lists
   (renew due · completed & not paid · no invoice · deleted · **actual hours exceed total hours** · free hours).
2. **Course lifecycle writes are absent, not gated**: Copy/duplicate, Change status, Delete — all three were listed
   as Spec-027 deltas ("course create/edit/copy/status/delete gates") but only edit/add-students/create-group were
   implemented (`crs.act.*` = add, addStudents, assignTeacher, createGroup, edit, print — nothing else). This is a
   **planning-summary vs. source conflict**; the source wins.
3. **Free / trial enrollment path** (`store_free`) has no counterpart. Groups have a `trial` status; courses have
   no free/trial creation.
4. **No teacher field on our group create form** although the legacy group is defined as "one teacher and many
   students" (the form's own subtitle). Assign-teacher is a separate gated picker — the create form is incomplete.
5. **Dual-timezone scheduling is gone.** Every legacy schedule row carries *student* weekday/time AND *teacher*
   weekday/time (Pacific/Efate vs Africa/Cairo) + a "T Difference (Localtime)" badge; the Student-Timetable modal
   shows both columns. Our timetable/agenda is single-timezone. For a remote academy this is a correctness issue,
   not a nicety.
6. **Bulk "Schedule Cancel on Date"** (cancel every class on a date with Auto-makeup / Reschedule / No-makeup +
   credit + note) has no equivalent anywhere.
7. **Course timeline / audit trail** ("mohamed updated Status → Show Details → Inactive → Active & unpaid") has no
   equivalent on any of our management pages.
8. **Cross-role holes**: teacher has no per-student class-history drill-down (legacy `teacher/course-history/{id}`);
   family has no "Feedback about course" and no per-subscription "History" link (legacy `student/studentslist`
   columns) — our `family-children` cards drill to the child, not to the subscription's class history.
9. **Modal/drawer quality**: `crs-enroll` / `grp-assign` pickers render a list with **no selection control at all**
   (no checkbox/radio) above a gated CTA; `grp-edit` opens with **empty placeholders instead of the group's current
   values** (crs-edit prefills the selects but not the text fields). Both are Spec-044 material.

## 5. Visual verdict

Our courses/course/groups/group are clearly better than the legacy purple-ERP tables: warm cream canvas, medallions,
labeled status chips, card/row hybrids, an academic Learning Path ladder, real empty/no-results states. They read as
an academy, not an ERP. Two caveats: (a) `course.html` Overview is thin (two info cards + an attention strip) for a
page whose banner promises 8 tabs; (b) the drawers are plain two-column field stacks — fine, but the pickers look
like read-only lists, which is exactly why they read as unfinished. Redesign priority: LOW for the lists, MEDIUM for
`course.html#view=overview` and the drawer/picker system.

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C05-01 | Course model split: legacy per-student enrollment contract → subject offering + student Courses tab + groups/schedule + finance | INTENTIONALLY_IMPROVED | — | §0 THE CENTRAL FINDING |
| C05-02 | Course (enrollment) create/edit forms — lawful field coverage (legacy 10 allowed create / ~24 allowed edit vs crs-add 6 / crs-edit 7; single schedule row) | PARTIAL | 056 | §1 Legacy control inventory / §2 Our current control inventory |
| C05-03 | Add Lesson from a course/enrollment (sess-new ≈ legacy Add Lesson but not reachable from course) | PARTIAL | 055 | §2 Our current control inventory |
| C05-04 | Teacher hour rate on course/group forms + per-class teacher pay exposure | REJECTED_PAY_FREE | — | §3 What we correctly REFUSE |
| C05-05 | Money on the course object (Price, student hour rate, invoice assignment, unpaid/indebted/free statuses, add_to_credit) | REJECTED_PAY_FREE | — | §3 What we correctly REFUSE |
| C05-06 | Course-analysis charts (treemap + bar charts) → authored chart-free cards (Spec 037) | INTENTIONALLY_IMPROVED | — | §3 What we correctly REFUSE |
| C05-07 | Porting of real legacy PII (student/parent/admin names, email) | REJECTED_PRIVACY | — | §3 What we correctly REFUSE |
| C05-08 | Cross-student enrollment ledger (7 saved working lists, 8 status filters, teacher/date/has-invoice filters, export) | MISSING | 045 | §4.1 |
| C05-09 | Course lifecycle writes: copy/duplicate, change status, delete (gates never implemented) | MISSING | 044 | §4.2 |
| C05-10 | Free / trial enrollment creation path (store_free) | MISSING | 056 | §4.3 |
| C05-11 | Teacher field on the group create form (legacy requires one; grp-add has none) | PARTIAL | 056 | §4.4 |
| C05-12 | Dual-timezone scheduling (student + teacher weekday/time per schedule row, timezone-difference badge, dual-column timetable) | MISSING | 056 | §4.5 |
| C05-13 | Bulk "Schedule Cancel on Date" (Auto Makeup / Reschedule / No Makeup + credit + note) | MISSING | 044 | §4.6 |
| C05-14 | Course timeline / status audit trail | MISSING | 055 | §4.7 |
| C05-15 | Cross-role drill-downs: teacher per-student class history; family course feedback + per-subscription history | MISSING | 055 | §4.8 |
| C05-16 | Picker/drawer completeness: crs-enroll / grp-assign lack any selection control; grp-edit opens without current values | PARTIAL | 044 | §4.9 |
| C05-17 | Courses/course/groups/group visual redesign over the legacy purple-ERP tables (chips, medallions, Learning Path, real empty states) | INTENTIONALLY_IMPROVED | — | §5 Visual verdict |
| C05-18 | course.html Overview thinness + drawer/picker visual system (redesign priority MEDIUM) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045 | §5 Visual verdict |

Honest counts: screenshotsOpened=37 · recordsInspected=17 · currentSourceFiles=not stated

Normalization notes (Spec 042, this section is normalization only — no new analysis): the audit's Method line states 37
screenshots opened as images and 17 raw records inspected; it does not state a count of current-app source files
inspected, so that count is recorded as "not stated". The audit names an owning spec only for §4.9 ("Spec-044
material"); owners for the other gap rows were assigned from the binding Spec-042 future-owner register by domain
(forms/field gaps → 056; modal/drawer/lifecycle-write interactions → 044; cross-role/workflow → 055; missing list
surface + visual review → 045) and are flagged as normalization-assigned, not audit-stated.

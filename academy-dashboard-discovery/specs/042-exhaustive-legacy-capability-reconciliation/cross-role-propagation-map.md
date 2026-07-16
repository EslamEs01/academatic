# Spec 042 — Cross-Role Propagation Map

**Lens:** cross-role propagation lifecycles. For every capability that ORIGINATES in one role and is CONSUMED by
another, the full lifecycle is mapped leg by leg. **A feature is NOT complete because its creation surface exists.**

**Method.** Built from RAW evidence (legacy `pages/*.json`, `html/raw/*.html`, `text/*.txt`, screenshots) and from
CURRENT source (`app/src/js/**`, read-only). Where the digest, a planning summary or a prior spec conflicted with raw
HTML, **raw HTML won** (each such case is recorded in §7). Nothing is invented: an unproven leg is
`UNKNOWN_EVIDENCE` + an owner, never a guess.

**Leg vocabulary.** Every lifecycle is decomposed into:
`ORIGIN` (who creates) → `TRANSIT` (routing / review / approval / channel) → `CONSUMER` (who receives).
Each leg carries one of: **OK** · **GATE** (honest backendRequired stop, no fake) · **BROKEN** (the surface exists
but is field-less / inert / disconnected) · **MISSING** (no surface at all) · **REJECTED_\*** (refused by a standing
law) · **UNKNOWN_EVIDENCE**.

**Scope note.** This is a DOCUMENT. It changes zero application files.

---

## 1. The legacy's own declaration of the propagation graph

The single most important artifact in this audit is **not** a page — it is the legacy notification routing form. It
enumerates, in the system's own words, which cross-role events fan out to whom and over which channel.

`output/roles/admin/pages/management-settings-notification.json` → `POST /management/settings/notification/update`:

| Event group | Recipient legs (each a `select` with `Off · As Profile · whats App · E-mail · Private`) | Event set |
|---|---|---|
| `course_updates` | `teacher_course_updates` · `student_course_updates` | Create · Edit (+ Status for student) |
| `class_updates` | `teacher_class_updates_type` · `student_class_updates_type` | Waiting · Running · Cancel · Absent · Teacher Absent · Auto Makeup · Reject · Cancel request · Approve (+ **End class** for student) |
| `class_reminder` | `teacher_reminder_type` (+ `hours_to_reminder_teacher`, `teacher_daily_class_reminder`, `teacher_delay_reminder`, `teacher_reminder`) · `student_reminder_type` (+ `hours_to_reminder_student`, `student_send_reschedule_reminders`, `student_reminder`) | N hours before · daily · late-3-min · reschedule reminders |
| `invoice` | `invoice` · `invoice_reminder` + `invoice_reminder_days` | family only |
| `salaries` | `salaries` | teacher — **routing only; the FIGURE is REJECTED_PAY_FREE** |
| `family_status` | `family_status` | family — suspend / stop / activate |

**Two-tier model (proven).** The `As Profile` channel value delegates to a **per-recipient override layer**:

* `output/roles/admin/pages/management-teachers-1.json` → `POST /management/teacher/teacher-notifications/1` —
  4 events × {WhatsApp, E-mail} = `course_updates_by_*`, `class_reminders_by_*`, `class_updates_by_*`,
  `salary_by_*`.
* `output/roles/admin/pages/management-families-1.json` → `POST /management/families/{id}/store-notifications` —
  7 events × {WhatsApp, E-mail} = `invoice_by_*`, `invoice_reminders_by_*`, `class_reminders_by_*`,
  `class_updates_by_*`, `course_updates_by_*`, **`certificate_by_*`**, `family_status_by_*`.

**Our coverage of this graph.** Tier 1 exists (`app/src/js/pages/settings.js:187` `notificationsPanel()`, fixtures at
`app/src/js/pages/settings.js:49` → `fixtures/settings-notifications.js`, Spec 040 — 47 controls, local previews).
**Tier 2 = 0 surfaces. Delivery = 0. Recipient inbox = 0.** The routing table configures a bus that has no wire and
no letterbox. See P-15.

---

## 2. The lifecycle register (P-01 … P-24)

### P-01 — Class outcome ("end class" / "mark attended") → family + child + admin boards
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (teacher) | `output/roles/teacher/pages/teacher-home.json` → `POST /teacher/classes-end`: `remark` (select, **required**), `summary` (textarea, **required**), `homework` (textarea, **required**), `notes`, `images[]` (file) | **BROKEN** — `app/src/js/pages/teacher-outcomes.js` renders **0** input controls (`grep -c "field(\|<input\|<textarea\|<select"` = 0); the whole capability is one `gateNote('prt.tch.pg.outcomes.saveGate')` at `:94` |
| ORIGIN (admin) | `output/roles/admin/pages/management-home.json` → `markAsAttended` modal (2 notify radios + remark + summary + homework + notes + images[]) | **BROKEN** — `app/src/js/components/outcome-details.js:72` `A.push(demoBtn('att.act.attend', …))`; `demoBtn` (`:48`) is a `data-demo-action` toast with **0 fields** |
| TRANSIT (notify) | routing matrix `student_class_update_statuses[] = End class`; `teacher/edit-class` carries `sendMessage` = "Send Notification" | **MISSING** — no notification bus (P-15) |
| CONSUMER (child) | `app/src/js/pages/student-history.js`, `pages/student-homework.js`, `pages/student-portal.js` all render `summary` / `homework` | **OK (authored)** — they display data **no role in our product can create** |
| CONSUMER (admin) | `attendance.html` / `sessions.html` outcome drawer; `reports.html` | OK (authored) |

**Verdict:** the outcome chain has **five consumer surfaces and zero producers**. Every homework line, every class
summary the guardian and the child read is a fixture literal that the teaching workflow can never write.
**Owner: 056** (the 5-field form) + **044** (long-form host) + **055** (the notify fan-out). Persistence FUTURE_BACKEND.

---

### P-02 — Homework assignment → child homework board → submission
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN | the same required `homework` textarea (P-01) — this single field **is** the legacy's entire "assignments" module | **MISSING** |
| CONSUMER (child) | `app/src/js/pages/student-homework.js` (KPI trio + 5 records grouped by state + teacher review notes) | OK (authored) |
| CONSUMER (guardian) | **none** — `grep -l homework app/src/js/pages/family-*.js` → 0 files. The guardian reaches homework only through the Spec-022 fold link into the child view | **MISSING** (and the legacy had none either — a *new* capability, not a regression) |
| SUBMISSION (child → teacher) | legacy: **no student login, no submission surface anywhere in the corpus** | `FUTURE_BACKEND` — our `PORTAL_PLANNED.student.hwSubmit` gate is honest |

**Owner: 056** (capture) · **045–050** (a guardian-side homework rollup is a product decision, not a restoration).

---

### P-03 — Absence / cancellation / reschedule → teacher day + family schedule + child view + credit ledger
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (admin) | `management-home.json` → `markAsabsent` (13 fields incl. `absent_by`, 3 notification radios, custom message, make-up none/auto/reschedule, `add_to_credit`, student-vs-teacher timezone) · `cancelClass` (10 fields) | **BROKEN** — `outcome-details.js` renders these as `data-confirm` dialogs with **0 fields**; a confirm cannot carry a make-up date, an add-to-credit rule or a timezone |
| ORIGIN (teacher) | `POST /teacher/classes-absent` (`video` file + `notes`) | **MISSING** |
| TRANSIT | `add_to_credit` → the family credit ledger; make-up → a *new* session on both calendars; notify → 3 channels | **MISSING** — no credit ledger surface exists (C04-13), no make-up generator, no notify bus |
| CONSUMER | teacher day rail, family schedule, child schedule, admin attendance | authored-only |

**The load-bearing point:** cancelling a class in the legacy is not a status flip — it *emits* a credit, a make-up
session, and up to three notifications across two roles. Our confirm dialog models none of that.
**Owner: 056** (fields) · **044** (confirm-with-fields) · **055** (credit + make-up + notify fan-out).

---

### P-04 — Class edit / **teacher reassignment** → the teacher's day changes under them
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN | `POST /management/courseClasses/edit-class` — `date`, `time` (H/M), `duration`, **`teacher_id` (REASSIGN)**, `accounting_statement`, notify toggle | **BROKEN** — `app/src/js/components/appointment-details.js` Edit = `data-demo-action` toast, **0 fields**; the only session FORM we ship is the CREATE drawer (`sess-new`) |
| CONSUMER | the reassigned-away teacher's day; the reassigned-to teacher's day; the family's schedule | **MISSING** |

**Teacher reassignment is the single biggest missing operator control in the product.** A teacher's day rail presents
itself as authoritative while nothing in the product can change it. **Owner: 056** (form; `accounting_statement`
must be classified with finance before it is rendered) · **055** (the two-sided calendar fan-out).

---

### P-05 — TEACHER requests cancel / reschedule / auto-make-up → admin inbox → answer back
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (teacher) | legacy teacher-home `modalTop` "Request Cancel" (type: Reschedule ‖ Auto Make-up + new date/time) | **MISSING** — `teacher-schedule.html` carries a gate note only (`app/src/js/pages/teacher-schedule.js:5`) |
| TRANSIT (admin inbox) | our `schedule.html` pending-requests band (Spec 026, `ops-bands.js`) with Accept/Reject gates | **GATE** — but it is an inbox for **new-class** requests, not for cancel/reschedule requests |
| ANSWER BACK (→ teacher) | routing matrix `teacher_class_update_statuses[] = Cancel request / Approve / Reject` | **MISSING** |

**We ship the inbox with no letterbox, and the reply has no route home.** **Owner: 055** + **044** (the form).

---

### P-06 — FAMILY requests cancel / reschedule → admin inbox → answer back
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (family) | `output/roles/family/pages/student-today-sessions.json` → POST with `class_id`, `teacher_id`, `type` radios ("Reschedule Class" / "No Reschedule — You will not have any replacement"), `date`, `time`, Hour, Minute | **BROKEN** — `app/src/js/pages/family-requests.js` renders **0** `field(` controls: preview cards + option LINES + a `gateNote` (`:34`) |
| TRANSIT | admin inbox | **MISSING** — the `schedule.html` band does not receive family cancel requests |
| ANSWER BACK | `student_class_update_statuses[] = Cancel request / Approve / Reject` | **MISSING** |

**Owner: 055** (the request → inbox → decision loop) · **044** (form host) · **056** (fields).

---

### P-07 — Schedule / trial request FAN-OUT (admin → teacher pool → teacher accepts → admin picks → class exists)
This is the legacy's most elaborate cross-role loop, and it is the one we reproduce least.

| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (admin) | `output/roles/admin/pages/management-request-schedule-1-1.json` → `POST /management/store-request-schedule`: `parent_id`, `student_id`, `request_type`, `family_id`, `course_id`, `duration`, `accounting_statement`, `date`, `time`, `total_hours`, `start_date`, **repeatable `schedule[0..N][value|time|duration]` weekly rows**, and a teacher table `['#','Select All','Teacher Name']` (a **broadcast to a teacher category**) | **MISSING** (~35 controls; 0 built) |
| TRANSIT (teacher answers) | proven only by its RESULT: `management-schedule-sessions-response.json` modal **"Accepted Teachers"** with columns `['#','Teacher Name','Message from teacher','Options']` — a teacher composed a message. The teacher-side accept/decline SURFACE was **never crawled** (no such record in `output/roles/teacher/`) | **UNKNOWN_EVIDENCE** — never reconstruct it from the result table. **Owner: 055** (design it explicitly; record as designed, not restored) |
| CONSUMER (admin decides) | `management-schedule-sessions-response.json` / `-trials-response.json` — tables `[Student, Parent, Course Name, Schedule, Status, Requests]` + modals "Teachers You Sent" / "Accepted Teachers" | **PARTIAL** — our `schedule.html` band shows **2 authored cards** + Accept/Reject gates; no teacher-response modal, no "Requests" count |
| RESULT | the accepted slot becomes a class on the teacher's AND the family's calendars | **MISSING** |

**Privacy note (043):** the fan-out broadcasts a **named child's** schedule to an entire teacher CATEGORY via
Select-All. Spec 043 must rule on data-minimisation **before** 056 builds the form.

---

### P-08 — Family requests a trial → admin lead → convert to family/student
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (family) | `output/roles/family/pages/student-request-trial.json` → `POST /student/request-trial`: `request_type` radios (Create New Child ‖ Choose Existing Child), `name`, `age`, `language`, `gender`, `student_id`, `date`, `time`, `duration`, `course` (10 controls) | **BROKEN** — `family-requests.js` = 0 fields |
| TRANSIT (admin lead board) | `leads.html` (Spec 034) — a **19/19 field-perfect** intake form (`lead-new`) | **OK / GATE** — the best-covered leg in the entire map |
| CONVERSION (lead → family) | legacy: Converted (18) / Not Converted (10) counters prove the workflow, but **no convert control was ever captured** | **UNKNOWN_EVIDENCE** — `app/src/js/pages/leads.js:115-116` ships `gate('lead.act.convert')` + `gate('lead.act.assign')`, correctly gated but **ungrounded in field mapping**. **Owner: 055 + 056 — design it, do not "restore" it** |
| CONSUMER | `add-family.html` / `families.html` exist | OK |

**This is the closable one.** Unlike P-14, both endpoints exist — only the family trigger and the conversion form
are open. **Owner: 056** (2 forms) · **055** (the hop).

---

### P-09 — Teacher requests a certificate → admin approves → guardian receives
The cleanest proven cross-role lifecycle in the corpus, and the one where **we shipped the inbox with no letterbox.**

| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (teacher) | `output/roles/teacher/html/raw/teacher-studentslist.html` → `#certificateRequestModal`, `action="…/teacher/certificate-request"`: hidden `course_id`, disabled `student_name` / `course_name` (context), **`description`** (textarea, `required`, `maxlength=250`), **`date_certificate`** (`required`). The modal states its own propagation contract verbatim: *"This request will be sent to management for approval and template selection."* | **MISSING** — `app/src/js/pages/teacher-students.js` (62 lines) is a **link-less** roster: `grep -n "href\|data-drawer\|data-disabled-reason\|field("` returns **zero hits** |
| TRANSIT (admin approval) | `output/roles/admin/html/raw/management-certificate-requests.html` → `#certApproveModal`: `student_name`, `teacher_name`, `description`, `date_certificate`, **`cert-template` (required select)**, a **Preview** button, **`cert-send`** (`none` ‖ `group` ‖ `private`), `cert-message` ("add link") | **BROKEN** — `app/src/js/pages/certificates.js:107-108` render Approve/Reject as **bare `gate()` calls with 0 controls**; template/date/message live in a *separate* `cert-create` drawer (`:126`) that is not bound to a request |
| STATUS BACK (→ teacher) | `output/roles/teacher/text/teacher-studentslist.txt:10-11` — the teacher's roster columns end at `certificate → Request Certificate`. **There is no status column.** The requesting teacher never learns the outcome — in the legacy either. | **MISSING (both systems)** — **Owner: 055** |
| CONSUMER (guardian/child) | `grep -ril certificate output/roles/family/` → **0 hits**. The legacy guardian had **no certificate surface at all**; delivery was a WhatsApp message. Our family/child portals: also none (the only `certificate` tokens in `family-*.js` are the *icon name* — `family-billing.js:67`, `family-children.js:38`). | **MISSING** — **Owner: 052** (privacy-safe recognition) + **043** |
| DELIVERY channel | `cert-send = group` pushes a **named child's** certificate + link into a shared WhatsApp group | **REJECTED_PRIVACY** — cross-family disclosure of a minor's record. Private, per-guardian, opt-in only. **Owner: 043** (rule) + **053** (mechanics) |

**Verdict:** 1 of 5 legs built, and the built one is field-less. The certificate module currently has **no honest
origin**: nothing a teacher can do creates a request in the queue we ship.

---

### P-10 — Monthly student progress report: teacher authors → admin approves → family/child reads
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (teacher) | `POST /teacher/student-progress` — proven on **four** teacher pages (`teacher-studentslist.json`, `teacher-students.json`, `teacher-monthly-plans.json`, `teacher-monthly-plans-mq-show.json`). Fields: `month`, `achievements`, `learning_progress`×4, `focus`×4, `homework_completion`×4, `punctuality`×4, `rescheduled_sessions`×4, `additional_support`, `learning_objectives` (+ `student_id`, `course_id`, `teacher_id`, `course_name`, `action`) = **9 dimensions / 24 inputs** | **MISSING** — `teacher-reports.html` renders **5 dimension LABELS**, 0 controls |
| TRANSIT (admin approve) | legacy `teacher/monthly-plans/MQ==/show` → a "Total Report" table with a `View | Approve` column (**table empty; no endpoint captured** — WHO approves is unproven) | **UNKNOWN_EVIDENCE** for the actor. Our surface: `student.html#view=evaluation` → **one** confirm ("اعتماد التقرير"), no queue. **Owner: 055** |
| ADMIN MONITOR | legacy `/management/forms/students` — filters `teacher_id` / `student_id` / `has_report` + Parent + Teacher columns (the "who still has no report" chase board) | **PARTIAL** — `students.html#view=evaluation` = 14 rows, **0 filters**, no parent/teacher columns |
| CONSUMER (admin/child/family) | `student.html#view=evaluation` (7 of the 9 dimensions rendered — `rescheduled_sessions` and `additional_support` are **absent**), `family-progress.html` | OK (authored) |
| CONSUMER (guardian gets the approved report) | legacy: the family corpus has **zero** report/progress tokens — the guardian could not read it either | **MISSING (both systems)** — an approved report has **no delivery path**. **Owner: 055** |

**Three consumer surfaces, zero producer.** Same shape as P-01. **Owner: 056** (the 24-input form) · **044**
(the 2-column long-form modal) · **055** (approve → deliver).

---

### P-11 — Guardian feedback about the teacher → admin review board
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (family) | `output/roles/family/pages/student-studentslist.json` → `POST /student/feedback`: hidden `student_name`, `teacher_name`, **`teacher_rating`**, `class_interactive`; `see_hear` (select), `like_teacher`, `complain`, `additional_comment` | **BROKEN** — `family-requests.js` renders the four question LINES as text, **0 fields** |
| TRANSIT/CONSUMER (admin) | `reports.html` feedback board (Spec 029) — 12 rows incl. `type: family`, read-only drawers, Approve/Delete confirms | OK (authored) |
| BACK TO TEACHER | the teacher never sees feedback about themselves in either system | **MISSING** — **Owner: 043** (visibility rules) + **051** (moderation semantics) |

**Note (052):** the hidden `teacher_rating` field is a guardian-supplied score about a teacher. Any future build
must route it through **052** (privacy-safe recognition) — never a public 5-star teacher score, never a ranking.

---

### P-12 — Parent-teacher meeting: admin schedules → guardian sees it → outcome report
**Our product ships the CONSUMER and not the PRODUCER — the inverse of every other row in this map.**

| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (admin) | `output/roles/admin/pages/management-families-feedback-students.json` → table `[#, Name, Status, Last Feedback, **Next Meeting**, **Meeting Manager**, Actions]` + `POST /management/families/feedback` with **`family_id`, `date`, `user_id`** (= the assigned manager) | **MISSING** — no meeting-scheduling surface anywhere; `reports.html` has only a `meeting` feedback *category* (`fixtures/report-feedback.js:20-21,32`), no date, no manager |
| BOARD | `management-families-feedback.json` → `[#, Parents, Manager, Meeting Date, Meeting Time, Meeting Manager, Status, Actions]` + modals `Edit` / `Add Notes` / `Add Report` | **MISSING** |
| OUTCOME REPORT | same record → form `student_id`, **`curriculum`**, **`expected`**, **`level`**, **`achievements`** (the 4-part per-student progress report written at the meeting) | **MISSING** (0 of 4 fields) |
| CONSUMER (family) | **`app/src/js/pages/family-requests.js:58-63`** — a «لقاءات المتابعة» section rendering `pt-empty` (`prt.fam.req.meetingsEmpty`) + `plannedCard(meetingGate())` | **BROKEN** — a truthful empty state that **can never fill**, because nothing can schedule a meeting |

**Owner: 055** (the producer + the propagation) · **056** (the 3-field scheduler + the 4-field report) · **043**
(a narrative report about a child must never cross families).

---

### P-13 — Admin publishes a library item → teacher shelf + guardian/child shelf
**The legacy proves ONE shared catalog. We ship THREE disconnected ones.**

| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (admin) | `output/roles/admin/text/management-library.txt` — `[# , Book Name, Category, Published at, Views, Downloads, Status, View, Actions]` + "Add Material" (table empty: *"No Material Added"*) | GATE (Spec 031/039 — add/upload/publish/delete are honest gates) |
| PROOF OF ONE CATALOG | `output/roles/teacher/text/teacher-library.txt` and `output/roles/family/text/student-library.txt` **both render the identical category** «اللغه العربيه» under identical "All Categories / Filter Categories" controls | — |
| CONSUMER (teacher) | `app/src/js/pages/teacher-library.js:8-13` imports **`TEACHER_PREVIEW` from `fixtures/portal.js`** | **BROKEN** |
| CONSUMER (family) | `app/src/js/pages/family-materials.js:11-12` imports `STUDENT_BY_ID` + `FAMILY_PREVIEW` | **BROKEN** |
| CONSUMER (child) | `app/src/js/pages/student-materials.js:9-11` imports `courseOf` + `STUDENT_PAGES` | **BROKEN** |
| THE PROOF | `grep -rn "content-library" app/src/js/` → **exactly one importer: `pages/library.js:18`**. `SUBJECTS` / `BOOKS` / `BOOK_CATEGORIES` reach **no other page in the product.** | **MISSING propagation** |

**Verdict:** publishing a book in admin changes nothing on any teacher/family/child shelf, and the three shelves do
not even share a category vocabulary. This is a *data-model* propagation break, not a UI gap — the fix is one shared
catalog + a per-role lens, not three fixtures. **Owner: 055** (the shared catalog) · **045–050** (the shelves'
missing search/filter) · **043** (whether `can_see_library` gates it — see P-20).

---

### P-14 — Announcement / broadcast → every role's dashboard
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (admin) | `output/roles/admin/html/raw/management-public-advertisement.html` — `<input type="checkbox" name="type[]" id="dashboard" value="1" checked>` with the label **"Advertisement <span> ( Will appear on the dashboard ) </span>"**. It is the **default-checked** channel. (`whatsapp` value=2 is `disabled`; `private` = anti-block mode.) | **PARTIAL** — `announcements.html` (Spec 034): compose form exists; Publish/Send/media are gates; the country/hours/language selects are 1-option stubs; recipient targeting is display-only chips |
| CONSUMER (admin/teacher/family/child dashboards) | `grep -rln "announc\|megaphone\|إعلان"` across `pages/dashboard.js` + every `*portal*` / `family-*` / `student-*` / `teacher-*` page → **ZERO files** | **MISSING** |

**The composition surface's entire stated purpose is to render on the role dashboards, and no such band exists on
any of the four.** The renderer was never captured either (no ad was live at crawl time), so the band's SHAPE is
`UNKNOWN_EVIDENCE` — **it must be authored, not reconstructed.** **Owner: 055** (the consumer band) · **053**
(the WhatsApp channel) · **043** (who may be targeted — the legacy audience selects leak real staff names).

---

### P-15 — Notification routing → delivery → recipient inbox
| Leg | Evidence | Status |
|---|---|---|
| TIER-1 CONFIG (admin) | §1 above; ours: `pages/settings.js:187` | **OK (local preview)** |
| TIER-2 PER-RECIPIENT | `POST /management/teacher/teacher-notifications/1` (4 events × 2 channels) · `POST /management/families/{id}/store-notifications` (7 events × 2 channels, incl. **`certificate_by_*`**) | **MISSING** — 0 surfaces. **Owner: 043** (the WhatsApp target is a privacy decision) + **056** (the form) |
| DELIVERY | WhatsApp / E-mail / in-app / Private | **FUTURE_BACKEND** — **Owner: 053** |
| CONSUMER (all four shells) | `app/src/js/components/topbar.js:38-39` (admin bell) and `components/portal-shell.js:45-49` (portal bell, Spec 024 B-03) → `enhance.js notificationsMenu()`: **2 `data-action="noop"` placeholder items + 1 gated "view all"**. No inbox page is registered in `scripts/build-html.mjs`. | **BROKEN** |
| THE UNREAD DOT | `components/topbar.js:39` → `${icon('bell','ico')}<span class="dot"></span>` — a **static unread signal that can never be true** | **REJECTED_NO_FAKE candidate** — remove it or make it honest. **Owner: 055** (with the feed) |

**Every lifecycle in this map (P-01, P-03, P-04, P-05, P-06, P-09, P-12, P-14, P-16, P-17, P-23, P-25) terminates
in this bus.** It is the single highest-leverage missing consumer in the product.
The legacy notification LIST page was **never crawled** → its item schema is `UNKNOWN_EVIDENCE`; do not invent it.

---

### P-16 — Family / student lifecycle (suspend · stop · deactivate · delete · scheduled action)
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN | `POST /management/families/{id}/suspend` (date + auto-return + **mandatory note** + a red accrued-debt warning) · `/stop` · `/deactivate` · `/activate` · `POST /management/student/{id}/stop` | **BROKEN** — our suspend/stop are **field-less `data-confirm` dialogs**; deactivate/activate/delete have **no surface at all** |
| SCHEDULED variant | `output/roles/admin/pages/management-scheduled-actions-create.json` → `action_type`, `scheduled_date`, `family_target_id`, `student_target_id`, `returned_at`, `cancel_classes_student_id`, `criteria[teacher_id]`, `criteria[material_id]`, `criteria[cancel_type]` (Auto Makeup / Reschedule / …) | **BROKEN** — `scheduled-actions.html` header "create" is a **field-less disabled gate** |
| TRANSIT (notify) | routing matrix `family_status` channel | **MISSING** (P-15) |
| CONSUMER (family portal) | `grep -rln "suspend\|stopped\|معلّق\|موقوف" app/src/js/pages/family-*.js pages/student-*.js` → **ZERO files** | **MISSING** |

**The demonstrable break, inside our own fixture universe:**
`app/src/js/fixtures/scheduled-actions.js:17` ships `sca1 = { typeKey:'stopStudent', targetLabel:'sca.target.salman', scheduledDateLabel:'sca.date.jul12', returnedAtLabel:'sca.ret.jul26', autoReturn:true, statusKey:'upcoming' }`.
`app/src/locales/ar.ops.js:107` → `salman: 'سلمان (طالب)'`. And `app/src/js/fixtures/portal.js:8` → `student: 'st1'`;
`app/src/js/fixtures/students.js:73` → `st1` → `data.stud.a.name`; `app/src/locales/ar.extra.js:180` → **`a: { name: 'سلمان الغامدي' }`**.

**Salman is scheduled to be STOPPED on Jul 12 — and Salman's own child view (`student-portal.html`) and his
guardian's home (`family-portal.html`) render nothing about it.** Same persona, same fixture universe, zero
propagation. **Owner: 055** (the state fan-out) · **044** (confirm-with-fields) · **056** (the 16-control
conditional form).

---

### P-17 — Public holiday → bulk-cancel → teacher schedules + family schedules
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN | `output/roles/admin/pages/management-public-holiday.json` → `POST /management/public-holiday-submit`: `from_date`+`from_time` (H/M), `to_date`+`to_time` (H/M), `category_selected[]` (multi-select teacher categories), teacher search + **Select All** | **BROKEN** — `public-holiday.html` = 5 authored cards + **2 field-less gates** |
| FAN-OUT | bulk-cancels every affected class across every affected teacher and every affected family | **MISSING** |
| CONSUMER | no "your class was cancelled by a holiday" state on any teacher or family surface | **MISSING** |

A single admin click silently rewrites N teachers' weeks and M families' schedules. It is the **widest blast-radius
write in the product** and it has zero notice surface. **Owner: 055** (fan-out + notice) · **056** (the ~9-control form).

---

### P-18 — Timezone / location → every rendered session time (dual-timezone)
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN | `POST /management/teachers/1/location/update` and `POST /management/families/{id}/location/update` — both: `country_id`, `city_id`, `type`, **`timezone`**, **`timezone_diff`** ("Time difference*") | **MISSING** — timezone appears only in the add-family wizard; there is **no update surface** on any profile |
| RENDERING CONTRACT | legacy renders a session in **BOTH** clocks: the "Student Timetable" modal (course list + course detail) and `/management/courseclasses/default-member-course-details/1` → "Show Timetable" (student weekday/time **and** teacher weekday/time) | **MISSING** — `schedule.html`, `sessions.html`, `teacher-schedule`, `family-schedule`, `student-schedule` all render a **single wall-clock**, which is silently WRONG for one of the two parties |
| IRONY | we already ship a working `Intl.DateTimeFormat({timeZone})` converter (`enhance.js` `initTimeConverter`, Spec 034) — the engine exists and is unused by the schedules | — |

**Owner: 055** (the dual-clock contract across all five schedule surfaces) · **056** (the location form).

---

### P-19 — Automation policy (Settings) → behaviour on teacher/family surfaces
`output/roles/admin/pages/management-settings-general.json` → `general/courses-classes/update`: renewal status,
auto-renew, stop-after-N-unpaid, **cancellation windows**, **auto-makeup**, makeup-to-credit, classes-not-closed
action + hours, **pre-class entry window**, **`teacher_can_edit_class`**, completed-course report, monthly-plan report.

Our `settings.html#view=general` renders all of it (Spec 040, 5 `<details>` groups). **No surface in the product
reads any of it** — there is no engine, so a cancellation window bounds nothing and `teacher_can_edit_class`
authorizes nothing. This is correct for a fixtures-only frontend, but it must be stated: **we ship a policy console
whose policies are inert.** **Owner: 055** (FO-22 — the propagation contract) · backend.
*(`rate_student_absent` = a % of class price added to the teacher's salary → **REJECTED_PAY_FREE**, permanently.)*

---

### P-20 — Per-recipient CAPABILITIES → portal feature visibility (an AUTHORIZATION leg)
| Evidence | Status |
|---|---|
| `management-teachers-1.json` → `POST /management/teachers/1/capabilities/update`: **`can_chat`**, **`can_see_library`**, **`can_edit_schedule`**, **`can_edit_class`** | **MISSING** — 0 of 4 controls |
| `management-families-1.json` → `POST /management/families/{id}/capabilities/update`: **`can_chat`**, **`can_see_library`** | **MISSING** — 0 of 2 controls |
| Consumers today | `teacher-library.html` and `family-materials.html` are **unconditionally visible**; there is no chat surface at all | **UNGOVERNED** |

**Binding law applies verbatim: "Hiding a link is NOT authorization."** These four switches govern four teacher-portal
features and two family-portal features. They have **no representation in either role**, so the entitlement model does
not exist. **Owner: 043** (Role Isolation — it is an authz model, not a form) · **056** (the form) · **051** (chat).

---

### P-21 — RBAC permissions → enforcement
`/management/admins/permission/{id}` = **170 permissions / 17 groups** (`permisions[]`, sic). Both captured staff
members are **170/170 granted** — RBAC exists and nobody uses it.

Ours: `app/src/js/pages/staff.js:43-46` renders `PERM_GROUPS` as a **display-only** matrix.
`grep -rn "PERM_GROUPS\|granted" app/src/js/pages/ components/sidebar.js nav.config.js` → **`staff.js` only**.
`sidebar.js` / `nav.config.js` never consult a permission. **Enforcement = 0 surfaces.**

**We ship a permissions UI that is a promise the backend must keep.** That is acceptable and was declared
(Spec 031 `rbac-display-only-contract.md`) — but note that the permission list contains **privacy gates in disguise**
(`Show Parent Phone`, `Show Parent Email`) and **pay gates** (`Show Teacher Rate`, `Show Salaries Page`), which the
legacy granted to *everyone* by default. **Owner: 043** (deny-by-default posture) + a dedicated RBAC spec.

---

### P-22 — Virtual classroom / meeting lifecycle (the 3-role room)
**The clearest proof of a role-scoped propagation model in the whole corpus:**
`output/roles/admin/html/raw/management-courseclasses-5.html` → the class detail's **"Direct Links"** panel is a
literal role→URL table:

| # | Role | URL |
|---|---|---|
| 1 | **Student** | `https://academatic.online/student/session-class-room/NQ==/1` |
| 2 | **Teacher** | `https://academatic.online/teacher/session-class-room/NQ==/2` |
| 3 | **Admin** | `https://academatic.online/management/session-class-room/NQ==/3` |

One class → three role-scoped rooms, keyed by `base64(class_id)` + a role discriminator. The teacher's home
"Enter Again" (`output/roles/teacher/text/teacher-home.txt:56`) resolves to `…/session-class-room/MQ==/2`.

The room **emits back into the class record**: `output/roles/admin/text/management-courseclasses-1.txt:50-63` →
`TimeTable` panel with **`Student Enter At  2026-06-20 19:55:34`**, **`Teacher Enter At  2026-06-20 04:03:01`**,
`Remind Teacher At`, then `Class Recording` ("No recording available"), `Show Queues 0`, `Direct Links`, `Timeline`.

| Leg | Status |
|---|---|
| Room creation / start / end / Running | **MISSING** (`teacher-outcomes` end-class = a gate) |
| Join (all 3 roles) | **GATE** — one honest disabled Join (`app/src/js/components/appointment-details.js:47`, `appt.joinReason`) + gate notes on teacher/family/student schedules. **Correct; hold it.** |
| Enter-time presence log | **MISSING** |
| Recording playback | **UNKNOWN_EVIDENCE** — no populated recording was ever captured. Do not design a player. |

**Security constraint for 054 (record it now):** the room URL is a *guessable* `base64(id)/role` path. Any future
meeting lifecycle must enforce authorization **server-side**; the URL shape is not a permission.
**Owner: 054** (whole lifecycle) · **043** (recordings of minors; presence monitoring of teachers/children).

---

### P-23 — DST change → the accounts it will hit
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (system) | `output/roles/admin/pages/management-time-convertor.json` → table headers **`[Time Zone, Affected Accounts, Next Change Date, Current Offset (UTC), Upcoming Offset (UTC), Offset System]`**; the raw HTML renders **`Teachers: N / Families: N`** inside *Affected Accounts* | — |
| CONSUMER (admin) | `app/src/js/pages/time-converter.js:119-131` → a **4-column** authored table (`zone`, `next`, `cur`, `up`) — **the `Affected Accounts` column is DROPPED** | **PARTIAL** |
| CONSUMER (teacher / family) | neither the legacy nor our product tells the affected teacher or guardian anything | **MISSING (both)** — a session silently moves an hour |

**Owner: 043** (scoping the account aggregate — a cross-account count is admin-only) · **055** (propagating the
DST warning to the affected teacher/family). The account-count column itself is `FUTURE_BACKEND`.

---

### P-24 — Teacher availability → admin schedule-search / request-schedule
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (teacher) | `output/roles/teacher/html/raw/teacher-timetable.html` → `#availabilityModal` (`avFromDay` "From day", to-day, from/to time, available) + Add/Update/Delete | **MISSING** — `app/src/js/pages/teacher-schedule.js:5` states availability edit is an honest gate |
| CONSUMER (admin) | `POST /management/search-available-teacher` → our `schedule-search.html` (Spec 035) | **BROKEN** — `app/src/js/fixtures/schedule-search.js:8`: *"availability is an authored label, never a computed overlap"* |

The admin's availability finder consumes labels **no teacher can set**. **Owner: 056** (the 5-control editor) ·
**055** (the availability → search chain) · FUTURE_BACKEND (the overlap).

---

### P-25 — Invoice issued / sent / reminded → family billing
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN | 16-field parent-invoice builder | **BROKEN** (0 fields; `finance.js` Create-invoice = a gate) |
| TRANSIT | `Send invoice` / `Send reminder` — `app/src/js/components/finance-actions.js:82-88` | **GATE** |
| ROUTING | matrix `invoice` + `invoice_reminder` + `invoice_reminder_days` → family; per-family `invoice_by_*` | **MISSING** (P-15) |
| CONSUMER (family) | legacy `/student/billing` → `[Serial No, Month-Year, Due Date, Course, **Amount**, Status]`. Ours: `app/src/js/pages/family-billing.js:3-5` — serial / month / due / course / **status ONLY**, amount-free | **INTENTIONALLY_IMPROVED** (family zero-pay law) |

The admin can (gated) "send" an invoice to a guardian who has **no inbox** to receive it. The **amount-free** family
view is a *law*, not a defect — do not drift into "fixing" it; a change requires an explicit law amendment (043).
**Owner: 055** (delivery) · future billing backend.

---

### P-26 — Family uploads a file / voice note against a session → the class Files panel
| Leg | Evidence | Status |
|---|---|---|
| ORIGIN (family) | `output/roles/family/pages/student-today-sessions.json` → `POST /student/upload-files`: `session_id`, `files[]` (file), `audio` ("**Or record voice**"). The family's own table carries a `Files` column (`output/roles/family/text/student-today-sessions.txt`) | **MISSING** (correctly: 0 `type=file` sitewide) |
| CONSUMER (admin/teacher) | the class detail **`Files`** panel (`management-courseclasses-1.txt:45`) — also fed by the teacher's `images[]` (P-01) | **MISSING** — our outcome drawer has no Files panel |

**Owner: 044/056** (render as an honest GATE — never a `type=file` that goes nowhere) · FUTURE_BACKEND (storage) ·
**043** (a voice recording of a minor is a hard privacy item and must be ruled on **before** any UI is designed).

---

## 3. Convergence points (where the graph meets)

1. **The class record** is the product's true hub. The legacy class detail
   (`management-courseclasses-1.txt:45-63`) fuses **seven** cross-role streams into one page: `Files` (family
   uploads + teacher images) · `TimeTable` (Student Enter At / Teacher Enter At / Remind Teacher At) ·
   `Class Recording` · `Show Queues` (staff ops) · `Direct Links` (3 role rooms) · `Timeline` (audit) · the outcome
   itself. **Our equivalent is one summary drawer with ~10 display rows.** Owner **044** (drawer→detail escalation)
   + **055** (audit timeline) + **054** (rooms/recording).
2. **The notification bus** (P-15) is the terminus of twelve lifecycles and is entirely absent.
3. **The audit timeline** (`Timeline` on classes, courses, families, enrollments — e.g. *"mohamed updated Status →
   Show Details → Inactive → Active & unpaid"*) is the only cross-role *provenance* surface, and exists nowhere in
   our product (`staff.html` has a staff-scoped activity drawer only). Owner **055** (+ **043** — an actor identity
   is PII; never author a real staff name into a fixture).

---

## 4. Scoreboard

| | Count |
|---|---|
| Lifecycles mapped | **24** (P-01 … P-24) |
| Lifecycles with **at least one broken/missing leg** | **24** |
| Lifecycles where a **CONSUMER exists with NO producer** | **6** — P-01 (outcome), P-02 (homework), P-09 (certificates), P-10 (monthly report), P-12 (parent meetings), P-24 (availability) |
| Lifecycles where a **PRODUCER exists with NO consumer** | **5** — P-14 (announcements), P-15 (notification routing), P-19 (automation policy), P-21 (RBAC), P-25 (invoice send) |
| Lifecycles broken at **both ends** | **4** — P-05, P-06, P-07, P-12 |
| Field-less "creation" surfaces feeding a cross-role chain | **11** (P-01 admin+teacher, P-03, P-04, P-06, P-09 approve, P-16 suspend/stop, P-16 scheduled-action, P-17 holiday, P-25 invoice) |
| `UNKNOWN_EVIDENCE` legs (never invent) | **6** (§6) |
| Legs **refused by law** (must never propagate) | **7** (§5) |

---

## 5. The NEVER-PROPAGATE register (refusals are load-bearing, not omissions)

| # | The legacy propagates | Verdict | Owner |
|---|---|---|---|
| N-1 | Teacher pay across the graph: `salaries` notification channel, the teacher-home salary band, `(3.00 Fine)` on every class row, `rate_student_absent`, per-session Teacher cost + Profit | **REJECTED_PAY_FREE** — the *routing* row may exist (`ntf-salEventsCh`), the **figure never** | Never |
| N-2 | A certificate for a **named child** pushed into a **shared WhatsApp group** (`cert-send=group`) | **REJECTED_PRIVACY** | 043 rules · 053 mechanics (private, per-guardian, opt-in only) |
| N-3 | The certificate **preview URL** carrying `student_name` / `teacher_name` in a shareable query string | **REJECTED_PRIVACY** | 043 |
| N-4 | WhatsApp "null-group" insights — real guardian/teacher names, **unmasked phones**, a **live `chat.whatsapp.com` invite URL** | **REJECTED_PRIVACY** | 043 (masked, count-only if it survives) |
| N-5 | A **staff-performance table** (Name/Total/Pending/Overdue/Completed/Average) rendered inside the **TEACHER** role (`teacher-tickets`) | **REJECTED_PRIVACY** (cross-role leak) | 043 |
| N-6 | The chat transport: `mqtt.connect("ws://localhost:8083/mqtt")`, topic `user/{userType}/{id}`, no client ACL | **REJECTED_SECURITY** | 043 + 054 (design a new transport; never port this one) |
| N-7 | The request fan-out broadcasting a **named child's** schedule to a whole teacher category (Select-All) | **REJECTED_PRIVACY pending 043** — 043 must rule **before** 056 builds P-07 | 043 |

---

## 6. UNKNOWN_EVIDENCE register (do not invent; do not reconstruct from the result)

| # | The unproven leg | Why | Owner |
|---|---|---|---|
| U-1 | **The teacher's accept/decline surface** for a schedule/trial request (P-07). Proven only by its RESULT — the "Accepted Teachers" modal's `Message from teacher` column. **No teacher-role record exists.** | never crawled | **055** — design it explicitly, record it as designed |
| U-2 | **Who approves a monthly plan** (P-10). `teacher/monthly-plans/MQ==/show` shows a `View | Approve` column on a *teacher-role* page; the table is empty and no endpoint was captured. | ambiguous actor | **055** |
| U-3 | **The notification inbox** (P-15). Every legacy page has a bell + "See All Notifications"; the destination page was never crawled. Item schema unknown. | never crawled | 055 / FUTURE_BACKEND |
| U-4 | **The announcement renderer** on role dashboards (P-14). The label proves the destination; no ad was live. | never captured | **055** — author it, do not reconstruct |
| U-5 | **The lead→family conversion form** (P-08). Converted/Not-Converted counters prove the workflow; **no convert control was captured.** | never captured | **055 + 056** |
| U-6 | **A populated class recording** (P-22) and the `Reverse Action` / `Running` state machine (P-01/P-03). | never captured | **054** / **055** |

---

## 7. Evidence conflicts resolved from RAW evidence

1. **`missing-coverage.md:209` / `role-permission-matrix.md:24` claim certificates are "absent for teacher".**
   **FALSE.** `output/roles/teacher/html/raw/teacher-studentslist.html` contains a live `#certificateRequestModal`
   posting to `/teacher/certificate-request`. **The teacher is the ORIGIN of the certificate lifecycle.** Raw HTML wins.
2. **The "one shared library catalog" is provable, not inferred:** the *identical* category string «اللغه العربيه»
   renders in `teacher/text/teacher-library.txt` and `family/text/student-library.txt`. Our three fixtures do not
   share a vocabulary.
3. **Spec 032 reported `fieldlessCreateEdit === 0`.** That audit covered `data-modal-trigger`/`openModal` finals only.
   The eleven field-less finals in §4 are `data-demo-action` toasts, `data-confirm` dialogs and
   `data-disabled-reason` gates — **every one of them escaped it**, and every one sits at the head of a cross-role chain.
4. **The Direct Links panel is not a "join button" — it is a role→URL routing table** (`…/1` Student, `…/2` Teacher,
   `…/3` Admin). A prior note read `/management/session-class-room/MQ==/3` as a teacher link; `/3` is the **admin**
   role code. Resolved from `management-courseclasses-5.html`.
5. **"Planned items = 0 sitewide"** is true for the *admin nav census* only. `teacher-portal.html` still renders
   seven «قريبًا» quick-tiles for **pages that exist and are linked from the same page's sidebar** — a broken
   *intra*-role propagation leg (owner **045–050**; a one-expression corrective mirroring `family-portal.js`).

---

## 8. Owner assignment (rolled up)

| Owner | Lifecycles / legs |
|---|---|
| **055 — Cross-Role Propagation & Workflow Consistency** (primary owner of this map) | P-01 notify · P-03 credit+make-up+notify · P-04 two-sided calendar · P-05/P-06 request→inbox→answer loops · **P-07 the fan-out loop (U-1)** · P-08 the lead hop (U-5) · P-09 status-back-to-teacher · P-10 approve→deliver (U-2) · **P-12 the missing meeting producer** · **P-13 the ONE shared content catalog** · **P-14 the announcement consumer band (U-4)** · **P-15 the notification bus (U-3)** · P-16 lifecycle state fan-out · P-17 holiday fan-out · **P-18 the dual-timezone contract** · P-19 policy propagation · P-23 DST warnings · P-24 availability chain · the **audit timeline** |
| **054 — Embedded Virtual Classroom & Meeting Lifecycle** | **P-22 in full** (create/start/end/Running · the 3 role-scoped rooms · the enter-time presence log · recording (U-6)). Keep the join GATE until a real room exists. |
| **053 — Integrations Command Center** | every CHANNEL: WhatsApp / E-mail / in-app / Private delivery (P-15) · per-class WhatsApp + reminders · certificate delivery mechanics (private-only, per N-2) · announcement WhatsApp channel |
| **043 — Privacy / Role Isolation / Anti-Poaching** | **P-20 capabilities = an AUTHZ model** ("hiding a link is not authorization") · **P-21 RBAC deny-by-default** (`Show Parent Phone` / `Show Teacher Rate`) · N-2…N-7 · who may read a child's narrative report (P-10/P-12) · the P-07 broadcast · voice/video of minors (P-26) · presence monitoring (P-22) · the DST account aggregate (P-23) |
| **044 — Modal/Drawer/Long-Form System** | the class detail escalation (7 panels) · confirm-with-fields (P-03/P-16) · the 2-column 9-question report modal (P-10) · nested drawers · the teacher-response modal (P-07) |
| **056 — Complete Forms & Data Capture Audit** | the eleven field-less producers: end-class (5) · attend (7) · absent (13) · cancel (10) · edit+reassign (8) · certificate request (4) · certificate approve (7) · monthly report (24) · trial request (10) · guardian feedback (4) · suspend/stop · scheduled action (16) · holiday (9) · request-schedule (~35) · availability (5) · per-recipient notification matrices |
| **045–050 — Bounded page review + redesign** | the teacher-portal «قريبًا» tiles (§7.5) · the three library shelves' missing search/filter · the DST board · the monthly-report monitor's 3 filters |
| **051 / 052** | chat + moderation (P-20's `can_chat`) · the guardian's `teacher_rating` and any guardian-facing certificate/recognition surface (P-09/P-11) — **privacy-safe, never a ranking** |
| **057 — Final Production Freeze** | record the standing refusals (§5) and the six UNKNOWN_EVIDENCE legs (§6) as frozen decisions |

---

## 9. The one-sentence finding

**Our product is a museum of creation surfaces.** Twelve lifecycles terminate in a notification bus that does not
exist; six render consumer surfaces (homework, class summaries, certificates, monthly reports, follow-up meetings,
teacher availability) fed by data **no role in the product can produce**; and the single most demonstrable break is
inside our own fixtures — `scheduled-actions.js:17` schedules **Salman** to be stopped on Jul 12, and Salman's own
child view and his guardian's home say nothing at all.

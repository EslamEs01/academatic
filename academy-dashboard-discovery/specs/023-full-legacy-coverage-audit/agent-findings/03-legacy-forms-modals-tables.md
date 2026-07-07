# Agent 03 — Legacy Forms / Modals / Tables / Interactions Audit

Spec 023 "Full Legacy Coverage Audit 000–022". Audit date: undefined (per harness).

## Scope & method

This agent inventories legacy **interactive capability** (not visual design) from the discovery
crawler's combined outputs and the frontend-planning-deep synthesis docs. Method:

1. Read the two small aggregate docs first (`interaction-inventory.md`,
   `frontend-planning-deep/05-distinct-interaction-catalog.md`,
   `frontend-planning-deep/11-interactions-states-v2.md`) — these already deduplicate the raw
   1,373-modal / 20,619-line form-inventory crawl into distinct shapes, so they are treated as the
   primary evidence and cross-checked against the raw combined files rather than re-deriving from
   scratch.
2. Grepped `output/combined/form-inventory.md` (20,619 lines) by `## Role:` boundaries and
   `### form #` headings to find the line ranges for admin (9–19380), teacher (19381–20389), family
   (20390–end), then extracted the **distinct URLs** per role and read full field tables for the
   teacher/family entity-mutating forms (the admin ones are already summarized faithfully in
   `06-complete-data-surface.md` §B, cross-checked against raw grep of the same file).
3. Read `output/combined/modal-inventory.md` heading counts (`## Role:` totals) and cross-checked
   against the deduped table in `frontend-planning-deep/05-distinct-interaction-catalog.md` §B (66
   distinct modals from 1,373 instances).
4. Read `output/combined/table-inventory.md` heading structure (per-URL, many duplicate shapes) and
   used `frontend-planning-deep/06-complete-data-surface.md` §C (104 distinct column-sets, already
   deduplicated by the earlier synthesis pass) as the primary table-shape evidence, spot-checked
   against raw headings.
5. Read `output/combined/button-coverage.md` in full for both aggregate role totals and the
   per-button unsafe classification (admin sample rows, teacher role in full, family role in full).
6. Read `output/combined/skipped-actions.md` in full for both roles' route-level skips and
   action-level refusals (verified admin totals, and read teacher+family sections in full since they
   are short).
7. No build/test commands run; no files modified outside the specs/023 folder (read-only crawl
   artifacts only).

This agent did **not** re-open the 339 raw per-page JSONs (`_build/aggregates.json` etc.) — the
frontend-planning-deep docs state they were built from exactly that source, and the combined `.md`
files independently corroborate the same counts (1,373 modals; 66 distinct; 195 GET routes; 109
mutation endpoints), so the deduped synthesis is treated as reliable for a capability checklist.

## Evidence opened (exact paths)

- `academy-dashboard-discovery/output/combined/interaction-inventory.md` (full, 38 lines)
- `academy-dashboard-discovery/output/combined/modal-inventory.md` (headings/counts, lines 1, 9,
  1294, 1376, 1397 — role boundaries and totals)
- `academy-dashboard-discovery/output/combined/table-inventory.md` (headings, lines 1–500 sampled)
- `academy-dashboard-discovery/output/combined/button-coverage.md` (full, 394 lines)
- `academy-dashboard-discovery/output/combined/skipped-actions.md` (full, 913 lines)
- `academy-dashboard-discovery/output/combined/form-inventory.md` (strategic: role-boundary grep,
  distinct-URL grep, and full-table reads for teacher lines ~19381–20389 and family lines
  ~20390–20619, plus admin-section spot reads around lines 30–400)
- `academy-dashboard-discovery/frontend-planning-deep/05-distinct-interaction-catalog.md` (full, 216
  lines)
- `academy-dashboard-discovery/frontend-planning-deep/11-interactions-states-v2.md` (full, 45 lines)
- `academy-dashboard-discovery/frontend-planning-deep/06-complete-data-surface.md` (full, 506 lines)

No screenshots opened for this mission (interaction/form/modal/table inventory is text-evidence
work; visual grounding is other agents' scope).

## 1) Forms by role

**Total forms discovered by crawler: 1,713** (`form-inventory.md` line "Total forms discovered:
1713"). Distinct form-bearing URLs: **admin 294**, **teacher 21**, **family 4** (grep of `### form #`
headings by role range in `form-inventory.md`); the raw count of 1,713 vs. 294+21+4 distinct URLs
reflects the same global-chrome forms (logout, shortcuts, notifications) repeating on nearly every
page — corroborated by `06-complete-data-surface.md` §B stating **109 distinct form-action
(mutation) endpoints**.

### Admin (109 distinct mutation endpoints total across all roles; ~95 of them admin-only)
Key entity forms (evidence: `06-complete-data-surface.md` §B, cross-checked against
`form-inventory.md` admin section):

| Entity | Create | Edit/Update | Delete/Stop | Key fields |
|---|---|---|---|---|
| Family | `POST /management/families` | `POST /management/families/{id}` (×16) | `.../{id}/deactivate`, `.../{id}/stop`, `.../{id}/suspend` | course_type, first/last name (ar+en), user_name, password, member_id[], emails, phones, birth_date, gender |
| Family sub-resources | — | `.../location/update`, `.../preferences/update`, `.../capabilities/update`, `.../store-notifications`, `.../invoice-adjustments` | `.../activate` | country/city/timezone, language, can_chat/can_see_library, per-channel notification toggles |
| Student | `POST /management/student/{id}/store` (×2), `.../trial/store` | `.../update` (×2) | `.../delete` (×10), `.../stop` (×4) | name/name_ar, language, gender, birth_date, teacher_note, admin_note, hasTrial, material, teacher_id, duration |
| Teacher | `GET/POST /management/teachers` (×56) | `.../teachers/{id}` (×50), `.../location/update`, `.../preferences/update`, `.../capabilities/update` | `.../deactivate` | level[], age_student[], salary_type, email, password, national_id |
| Teacher compensation | `.../compensations` | `.../compensations/{id}` (×22) | — | type, amount, month, year, description |
| Course | `.../store` (×3), `.../store_free` (×2) | `.../update` (×1), `.../update_status` (×17) | `.../delete` (×12) | material_id, teacher_id, family/teacher_hour_rate(_type), schedule[n][value/time/duration] |
| Session/Class | `.../add-classes` (×19) | `.../edit-class` (×20) | — | session_id, family_id, date, time, duration, teacher_id, accounting_statement |
| Invoice | `GET/POST /management/invoices` (×28) | — | — | status, date, date_type, currency, gateway, family_id, price, discount, fees, adjustment_type |
| Transaction | `.../accountant/store-transaction` (×28) | — | — | transaction_id, date_payment, basic, additional, taxes, total, currancy, getway |
| Salaries/Payouts | `.../salaries`, `.../staff-salaries` | `.../payout-providers/{id}` | `.../payouts/approve` | month, date_range, teachers[]/staff_members[], mode, key1–4 |
| Expense | `.../expense` | `.../heads` | — | head_id, is_income, description, reason, amount, currency, date |
| Admins/RBAC | `POST /management/admins` (×3) | `.../admins/{id}` (×6), `.../categories/{id}`, `.../permission/store` | — | name, email, username, phone, password, salary, currency, role, permisions[] |
| Groups | `POST /management/groups` | — | — | name, start_date, teacher, students[], schedule[n] |
| Leads/CRM | `GET/POST /management/new-requests` (×2) | — | — | first/last name, email, phone, hear_from, classes_count, gender, age, language |
| Settings (7 sub-forms) | — | payments, email-accounts, personalisation, general, notification, general/teachers, general/courses-classes, general/accessibility | — | company_name, domain, theme, class_statuses_colors[...], tfa/otp, salary_period_type |
| Certificates | `.../create-certificate` (×2), `.../upload-certificate` (×2) | — | — | teacher_id, student_id, course_id, description, date_certificate |
| Materials/Library | `.../materials` | `.../materials/{id}` (×3) | — | name, name_ar, type, category_id, file, thumbnail |
| Public holiday / scheduled actions | `.../public-holiday-submit`, `.../scheduled-actions` (×16) | — | — | from_date/time, to_date/time, criteria[cancel_type/reschedule_date/...] |
| Teacher-feedback / class-feedback | `GET/POST /management/class-feedback` (×21), `.../teacher-feedback` (×2) | `.../teacher-feedback/category` | — | class_id, feedback_note, feedback_files[], teachers[], date_range |
| Forms builder | `POST /management/forms` | `.../forms/colors/update` | — | form_name, day, fields[n][label/type/options/is_required] |

### Teacher (21 distinct form-bearing URLs; entity mutations: 10 distinct endpoints)
Evidence: `form-inventory.md` teacher section (lines 19381–20389) + `06-complete-data-surface.md`
§B "Teacher portal":
- `POST /teacher/edit-class` — edit own session (session_id, date, time, duration, sendMessage) — **no pay field present** (pay-free global contract holds structurally, confirmed field-by-field).
- `POST /teacher/classes-end` — end-of-class report (remark [6-option select: Excellent/Very Good/Good/Acceptable/Needs Improvement — matches the "Class remark" enum in `06-complete-data-surface.md` §D], summary, homework, notes, images[]).
- `POST /teacher/classes-absent` — mark class absent (video upload, notes).
- `POST /teacher/student-progress` — monthly progress report (month select, achievements textarea, learning_progress radio [Excellent...], focus, homework_completion, punctuality, rescheduled_sessions, additional_support).
- `POST /teacher/certificate-request` — request a certificate for a student (course_id, description, date_certificate).
- `POST /teacher/update-teacher-password` — change password (old/new/confirm).
- `POST /teacher/profile-edit` — profile (image, first_name, last_name, email).
- `POST /teacher/timetable` — availability/course selection (course_id).
- `POST /teacher/get-schedual` — schedule lookup (network-observed, GET-adjacent).
- `POST /teacher/logout` — session end (id).

### Family (4 distinct form-bearing URLs; entity mutations: 6 distinct endpoints)
Evidence: `form-inventory.md` family section (lines 20390–20619) + `06-complete-data-surface.md` §B
"Family portal":
- `POST /student/request-trial` — book a trial: radio (Create New Child / Choose Existing Child),
  name, age, language (10 options), gender, student_id, date, time, duration, course.
- `POST /student/feedback` — rate the teacher after a class: hidden student_name/teacher_name/
  teacher_rating/class_interactive + visible `see_hear` (select), `like_teacher` (textarea),
  `complain` (textarea).
- `POST /student/upload-files` — upload homework/session artifact: session_id, files[] (file input),
  audio (hidden — "Or record voice").
- `POST /student/update-password` — old/new/confirm password.
- `POST /student/profile-edit` — image, first_name, last_name, email.
- `POST /student/logout` — session end (id).
**Zero currency/amount fields in any family form** — confirms the zero-pay-figures law holds at the
form level, not just the UI copy level.

## 2) Modals by role

Evidence: `output/combined/modal-inventory.md` headings (admin 1,280 instances / teacher 77 / family
16 / total 1,373 captured) deduplicated in `frontend-planning-deep/05-distinct-interaction-catalog.md`
§B to **66 distinct modals** (63 functional + 3 global chrome per `11-interactions-states-v2.md`
line 6).

Notable **admin** modals (danger ⚠ = mutating; each row cites §B of the 05 doc):
- **Mark As Absent** (20 pages) — sendMessage, cancelTzType, absent_by, add_to_credit, date/time;
  buttons: Don't send / Send Default Message / Send Custom Message / No Make-up.
- **Cancel Class** (20 pages) — cancelTzType, cancel_by, add_to_credit; buttons: Send Notification /
  No Make-up / Auto Make-up class / Reschedule class to another time.
- **Mark as attend** (20 pages) — markAsAttend, remark, summary, homework, notes, images[].
- **Send Whatsapp Message** (20 pages) — wa_message, send_teacher, send_student.
- **New Transaction** (28 pages, ⚠) — transaction_id, date_payment, basic, additional, taxes, total,
  currancy, getway — the finance-mutation modal (admin-only; out of scope for teacher/family per the
  zero-pay law, and it stays admin-only in the legacy app).
- **Schedule Cancel Classes** (6 pages) — bulk scheduling with criteria[cancel_type],
  scheduled_date, reschedule_date/time, add_to_credit.
- **Suspend/Stop/Schedule-Stop/Activate** family & student (2 pages each) — account lifecycle
  actions with date, schedule_return, note.
- **Certificate Information** / **Request Certificate** — cert workflow shared admin+teacher.
- **Create Group** / **Add Member** — staff/teacher/student roster assembly (name, bio, image,
  staff[]/teachers[]/students[]).
- View-only (non-mutating) modals: Student Timetable, Details, Notes List, Direct Links for Sessions,
  Total Queues, Course History, Country List, Teacher Salary/Salary (Download only).

Notable **teacher** modals (shared with admin or teacher-only): **End class** (remark/summary/
homework/notes/images[]), **Mark class as absent** (video/notes), **Request Certificate**, **Student
Details** (view), **Student Timetable** (view), **Chats** (offcanvas, view).

Notable **family** modals: **Feedback about your teacher** (see_hear, like_teacher, complain,
additional_comment — matches the `/student/feedback` form above), **Upload File:** (files[], Start/
Upload buttons — matches `/student/upload-files`), **Request Cancel** (shared with teacher — type,
date, time, Hour/Minute/Month/Year), **Student Details** (view, shared with teacher).

## 3) Tables by role

Evidence: `output/combined/table-inventory.md` (1,740 lines, heavily repeated per-URL — same table
shape appears on many pages) deduplicated in `06-complete-data-surface.md` §C to **104 distinct
column-sets**. Operationally important ones (role inferred from the "Roles" column in the 05 doc /
column vocabulary in the 06 doc):

| Reuse | Role | Columns | Operational meaning |
|--:|---|---|---|
| 55 | admin | #, Teacher Name, Status, All students has course, Total Hours, Phone, Schedule, Country, Created at, Settings | teacher roster (list + per-status scope pages) |
| 26 | admin | #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total (AED), Status, Actions | invoices list — **currency column present (admin-only; confirms zero-pay law is scoped to teacher/family surfaces, not admin)** |
| 18 | admin | Category, Percentage | teacher-category breakdown (reports) |
| 18 | admin | Student, Teacher, Duration, Week Days, Time ×2 | timetable/schedule grid |
| 14 | admin | #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions | session/accounting ledger |
| 11 | admin | #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions | course-classes session table (the row that spawns Attend/Absent/Cancel/Edit modals) |
| 9 | admin | #, Family name, Phone, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions | families list |
| 9 | admin | #, Date, Parent name, E-mail, Phone, Status, Actions | leads/new-requests list |
| 8 | admin | #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age | student roster |
| 7 | admin | Currency, Code, Rate | FX rates table |
| 6 | admin | #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions | family feedback/meeting tracker |
| 4 | teacher | #, Class Time, Student Name, Course Name, Class Status, History, Action | teacher's own class list (pay-free — no rate/amount column, confirmed) |
| 4 | family/teacher | Class Date & Time, Teacher Name, Show | today-sessions/timetable shared shape |
| 2 | admin/teacher | Name, Total:, Pending, Overdue, Completed, Average | progress/report summary row (non-financial "Total" here is a count, not currency — needs field-level confirmation in rebuild, flagged below) |
| 2 | family | No Teachers | empty-state table (verified-empty, per `11-interactions-states-v2.md` "Empty states") |

Also present (admin finance only, 1× each): Payment Id/Due Date/Amount table, expense ledger (Name of
Income/Outcome, Value, Currency, Reason, Transaction Type), salary summary (Teachers Total Salary,
Staff Total Salary), P&L table (Expected/Actual Revenue, Net Profit, Teachers/Staff Salaries) — all
admin-scoped, all with currency columns, consistent with the standing law that finance stays
admin-only and teacher/family surfaces carry zero pay figures.

## 4) Interactions by role

Evidence: `interaction-inventory.md` + `05-distinct-interaction-catalog.md` §C + `11-interactions-
states-v2.md`.

- **Dropdowns/menus:** 551 opens total (admin 513, teacher 26, family 12) — per-row action menus,
  top-bar profile/lang/notifications, searchable select2 controls. Top filter fields: Month (278),
  material_id (63), category_id (56), duration (54), teacher_id (51), status (49),
  accounting_statement (45), currency/currancy/getway/gateway (admin-only finance filters).
- **Tabs:** 8 distinct tab_changes, all admin (session-action tabs: Auto Make-up/No Make-up/
  Reschedule/Add to Credit variants; detail-page tabs: Sessions/invoices/Salary; Family Members/Add
  New Child; Billing; Credits; Profile Activity). Teacher and family show **0** tab_change events —
  their detail pages are flatter.
- **Date-ranges:** `date_type` (26), `date_payment` (26) filters — admin invoice/session views;
  family-portal date pickers appear inside modals (Request Cancel: date/time/Hour/Minute/Month/Year).
- **Wizards:** family `request-trial` is a stepped form (`steps-uid-0` id in form-inventory.md) —
  radio-gated branch (Create New Child vs Choose Existing Child) before the rest of the fields render.
- **Chat:** admin/teacher `Chats` offcanvas with Search Contact (view-only capture; the underlying
  `POST /management/chat/loadMoreChats` and `/teacher/chat/loadMoreChats` endpoints are pagination,
  not message-send — no send-message form field was captured in the crawl, only the container).
- **Uploads:** teacher `classes-absent` (video), family `upload-files` (files[] + hidden `audio` for
  voice recording), admin `Add Material` (file + thumbnail), admin `create-certificate`/`upload-
  certificate` (fileInput).
- **Accordions:** 104 expands, all admin (filter panels, detail sections) — teacher/family show 0.
- **Inline state changes:** 5 total (admin 4, teacher 1, family 0) — likely toggle-switch style
  controls captured without full modal.

## 5) Unsafe/skipped endpoints (capability signals)

Evidence: `output/combined/skipped-actions.md` (full read) + `button-coverage.md`.

**Totals: 84 route-level skips + 1,935 action-level refusals across all roles** (`skipped-
actions.md` line 910–913).

- **Route-level `skipped_unsafe_reason` (5 total, all roles):** `management/logout` (admin),
  `teacher/logout`, `student/logout`, and **two explicit student-suspend routes**
  `management/student/1/suspend` and `management/student/2/suspend` — the crawler refused to
  navigate directly to a destructive per-student suspend URL even via GET, treating it as unsafe by
  URL shape alone. This is a strong signal: **suspend is the single most guarded capability in the
  whole legacy app** (also confirmed by the "Suspend Student"/"Update Suspension"/"Schedule Stop
  Student" modal family in §2).
- **Route-level `skipped_safe_reason` (84 total):** dominated by (a) 9× locale-switch URLs per role
  (`management/lang/{ar,fr,de,es,ur,it,pt,ru,tr}` — deliberately not crawled to avoid mixing
  locales/session state — a signal that i18n switching is itself a distinct, un-audited interaction
  the rebuild must design fresh, not copy) and (b) admin-only pagination/sort-permutation URLs
  (`teachers/scope/{status}?sort_by=...`) cut off by the 300-page-per-role budget — these are **not**
  missing capability, just crawl-depth limits on an already-covered sortable-table pattern.
- **Action-level refusals — logout (1):** the crawler's own safety net refused the one real "Logout"
  button it found mid-page (on `settings/integrations/1/configure`), distinct from the nav-level
  logout forms, confirming logout is treated as unsafe everywhere it appears, not just at route level.
- **Action-level refusals — mutating (1,541 across roles: 1,463 admin / 72 teacher / 6 family):**
  every Save/Save changes/Submit/Add/Delete/Cancel/Send/Approve/Update button on every visited page.
  This is expected (crawler policy = never fire mutations) and is a coverage **signal**, not a gap:
  the volume by role (admin ≫ teacher > family) is itself evidence of where the legacy app
  concentrates mutating power (matches the admin console being the "6-category rail" mega-app).
- **Action-level refusals — submit (393 across roles):** almost entirely "See All Notifications" (a
  non-GET form even for a read action — legacy technical debt, not a capability) plus teacher's
  "Show Details" (course-history rows) and family's "Upload" (today-sessions) — these last two ARE
  real capability signals the rebuild should honor as honest gated actions, not just chrome.
- **Notable non-obvious skip:** `student/today-sessions` "Send" (mutating, family) — a send action on
  the family today-sessions page whose target form wasn't independently captured elsewhere in
  form-inventory.md family section; flagged as a risk below (needs one more targeted look by whoever
  owns family-portal parity, since Spec 020 already shipped `family-schedule`/`family-billing` etc. —
  confirm this maps to an existing sanctioned action or is a genuine gap).

## 6) Top 20 highest-value legacy interactive capabilities for the rebuild

1. **Session lifecycle action set** (Attend / Absent / Cancel / Edit / Reschedule / Make-up / Queue)
   — `modal-inventory.md` roles admin (20× each); `06-complete-data-surface.md` §B
   `courseClasses/edit-class` (×20), `add-classes` (×19). Status-gated per
   `11-interactions-states-v2.md` line 11–15.
2. **Teacher end-of-class report** (`POST /teacher/classes-end`: remark enum + summary + homework +
   notes + images[]) — `form-inventory.md` teacher section; pay-free, confirmed field-by-field.
3. **Teacher mark-absent with video** (`POST /teacher/classes-absent`) — same section.
4. **Teacher monthly student-progress report** (`POST /teacher/student-progress`, 24-field form per
   `11-interactions-states-v2.md` "Loading states" note — autosave-drafts recommendation) —
   `form-inventory.md` + `06-complete-data-surface.md` §B "Teacher portal".
5. **Family trial-booking wizard** (`POST /student/request-trial`, stepped radio-gated form) —
   `form-inventory.md` family section (`steps-uid-0`).
6. **Family post-class teacher feedback** (`POST /student/feedback`) — same section; feeds the
   admin-side "Add Feedback"/"Class Feedback" reporting modal family.
7. **Family homework/session upload with voice** (`POST /student/upload-files`, files[] + audio) —
   same section.
8. **Admin bulk Schedule-Cancel-Classes** (criteria[cancel_type], reschedule_date/time,
   add_to_credit) — `05-distinct-interaction-catalog.md` §B row "Schedule Cancel Classes" (6 pages).
9. **Admin WhatsApp/notification broadcast** (`Send Whatsapp Message` modal + `public-advertisement-
   submit` endpoint) — §B + `06-complete-data-surface.md` §B "Messages".
10. **Admin family lifecycle** (Suspend / Stop / Schedule-Stop / Activate, each with date + note) —
    §B modal rows + `families/{id}/suspend|stop|activate` endpoints.
11. **Admin student lifecycle** (Suspend / Stop / Schedule-Stop, same shape) — mirrors #10; also the
    ONE route the crawler refused to even GET (`student/{id}/suspend`) — highest-guard capability.
12. **Admin invoice + transaction recording** (`New Transaction` modal, `store-transaction` ×28,
    `invoices` ×28) — admin-only, currency-bearing, must stay off teacher/family per the pay-free law.
13. **Admin teacher compensation/salary generation** (`Generate salaries`, `Salary Month`,
    `compensations/{id}` ×22) — admin-only; explicitly the surface the teacher-portal companion pages
    (`teacher/salary`) must NOT route into per the pay-free global contract.
14. **Admin invoice adjustments** (`invoice-adjustments`, type/amount/count/note) — family-billing
    counterpart (Spec 020) must stay status-first per the zero-pay law; this is the admin source of
    truth for that data.
15. **Certificate request → approve → issue pipeline** (teacher `certificate-request` → admin
    `Request Certificate`/`Approve`/`create-certificate`/`upload-certificate`) — cross-role workflow
    spanning 3 endpoints across 2 roles.
16. **Admin RBAC** (admins create/edit + `permission/store` with `permisions[]` + `categories/{id}`)
    — `06-complete-data-surface.md` §B "Staff/RBAC"; governs the 57-row admin sidebar inventory (Spec
    016 binding law).
17. **Admin group/roster assembly** (`Create Group`/`Add Member` — staff[]/teachers[]/students[]
    multi-select) — §B modal rows (1 page each, but structurally important: the only multi-entity
    composition modal found).
18. **Family Request-Cancel** (shared teacher/family modal: type, date, time, Hour/Minute/Month/Year)
    — the one mutation surface family and teacher share verbatim; anchors the "cancel a session"
    honest-action class for both non-admin roles.
19. **Admin settings suite** (7 distinct settings sub-forms: payments, email-accounts, personalisation
    incl. `class_statuses_colors[...]`, general, notification, teachers-payroll-period, courses-
    classes automation rules) — `06-complete-data-surface.md` §B "Settings"; drives status-color map
    and automation toggles referenced across the whole app.
20. **Locale/language switch** (9 `management/lang/{code}` routes, deliberately un-crawled in ALL
    three roles) — not a form/modal but a first-class interaction the rebuild must design without any
    legacy behavioral evidence (flagged as a genuine "no evidence" gap, not an omission).

## Risks, gaps, and proposed corrections

- **No evidence for locale-switch UX.** All 27 `management/lang/{code}` routes (9 per role × 3
  roles) were deliberately skipped by the crawler (`skipped-actions.md` `skipped_safe_reason` rows).
  The rebuild's ar/en toggle has zero legacy behavioral reference — this is a "need," not a
  discovered capability. *Correction:* design fresh, document as a new (not ported) interaction; no
  legacy screenshot/DOM evidence exists to audit against.
- **Chat message-send not captured.** The `Chats` offcanvas (admin/teacher, 2 pages, view-only per
  §2) only shows Search Contact + Close; the actual message-compose/send control was not captured in
  modal-inventory.md, though `POST /management/chat/loadMoreChats` and `/teacher/chat/loadMoreChats`
  exist as pagination endpoints. *Correction:* treat "send chat message" as **unconfirmed** capability
  — do not assume a send-form contract; flag for a targeted follow-up crawl or explicit backendRequired
  gate rather than inventing fields.
- **`student/today-sessions` "Send" button (family, mutating) has no matching captured form.** Per
  §5, this button was refused as unsafe but its target form/endpoint doesn't appear standalone in
  `form-inventory.md`'s family section. *Correction:* before Spec 023 closes, confirm whether this
  maps to an already-shipped Spec 020 family action (e.g. `family-schedule`/session actions) or is a
  genuine missing capability; do not silently drop it.
- **Admin table shape "Name, Total:, Pending, Overdue, Completed, Average" (2 pages, admin/teacher
  shared)** — the "Total:" column label is ambiguous from column-name evidence alone (could be a
  session/task count or could imply an amount). *Correction:* whoever audits this table shape should
  open the underlying page JSON/screenshot to confirm it is non-financial before porting it to the
  teacher surface, to avoid an accidental pay-figure leak into the pay-free teacher app.
- **Admin volume dwarfs teacher/family in raw button/form/modal counts** (1,280 admin modal
  instances vs. 77 teacher vs. 16 family; 1,463 admin mutating-button refusals vs. 72 teacher vs. 6
  family). This is expected given the corrected role model (Spec 021: THREE logins, admin is the
  mega-app) — not a coverage gap, but the sheer admin surface area (57-row sidebar, Specs 021–026)
  means this agent's per-item enumeration above is necessarily a representative top-slice, not
  exhaustive; the full 104 distinct table shapes and 66 distinct modals are the exhaustive counts,
  itemized fully in the cited source docs, not restated line-by-line here.
- **No new hooks/keys implied.** Everything inventoried above is legacy capability description only;
  none of it should be read as license to add new `data-*` hooks or storage keys — any rebuild
  coverage must fit inside Spec 016's closed hook set per project law.

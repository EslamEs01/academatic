# C01 — Dashboard & Home — Capability Audit (Spec 042)

**Method**: 33 screenshots opened AS IMAGES (Read tool), 21 raw records / source files inspected
(5 legacy page JSONs read field-by-field, built HTML greps, current `app/src/js` sources, Spec 026 contract).
Documentation only — nothing under `app/` was modified.

**Legacy scope**: 36 pages tagged `Dashboard / Home`. **Important tagging caveat**: only ~14 of those 36 are
genuinely dashboard/home surfaces (`management-home` + its 7 query-variants, `management-total-queues`,
`management-new-requests-create`, `teacher-home` ×2 roles, `student-home`, and the role-isolation redirects).
The other ~16 (`management-admins-*`, `management-banks*`, `management-courseclasses-*`, `management-group-index`,
`management-family-feedback-categories-create`) carry `Dashboard / Home` only as a **secondary module tag** —
they belong to the staff/finance/sessions/groups/reports clusters. They are audited here only where their
evidence bears on the dashboard (the class-detail actions, the queues modal), and are otherwise cross-referenced.

---

## 1. What the legacy admin home actually is (raw evidence, not summaries)

`output/roles/admin/pages/management-home.json` + `screenshots/management-home-full.png`:

* **8 KPI tiles**, each with a real drill-down link: Total Classes → `?status=` · Sessions Pending → `?status=1` ·
  Attend Sessions → `?status=8` · Waiting & Running → `?status=2,10` · Cancel Sessions → `?status=5,6,7` ·
  Sessions Absent → `?status=3,4` · Trials Sessions → `?trial=0` · Last Today Sessions → `?helper=1`.
  Proven by the 8 `Show Details` anchors in `buttons[]` and by the eight `management-home-*` variant captures.
  The tiles do **not** change when the table is filtered (compare `management-home-status-1-full.png`: tiles still
  `1 / 0 / 0 / 1&0`, table = the "No session today" empty state).
* **A 12-input "Filter Classes" GET form** (collapsed by default): `date_range` (required), `from_time` (+Hour/Minute),
  `to_time` (+Hour/Minute), `teacher_id`, `family_id`, `student_id`, `type` (session/Trial/Group) → `Search`.
* **The day board**: `Classes Of <date>` — 8 columns (`# · Class Time · Student/Group Name · Teacher Name ·
  Course Details · Left hours · Class Status · Actions`), an **Excel export** (`POST /management/export-aa`),
  and a **table-settings modal** (`custemize-table`: `timeType` = Today's / Upcoming / Past Classes +
  `groupByTime` checkbox → "Save changes" = a persisted per-user board preference).
* **A 10-action row kebab** (`management-home-002`): Reverse Action · Add Queue · Attend Class · Cancel Class ·
  Absent Class · Edit Class · Running · Send Reminder · Send WA Message · **Delete Fine**. Each backed by a real
  multi-field modal:
  | legacy modal | fields (raw record) |
  |---|---|
  | `markAsAttended` | 2 radios (send/don't send class details) · `remark` (Excellent…Needs Improvement) · `summary` · `homework` · `notes` · `images[]` **file** = **7** |
  | `markAsabsent` | `absent_by` · `note` · 3 notification radios · `message` · `add_to_credit` · 2 timezone radios · makeup `date`/`time` (+Hour/Minute) = **13** |
  | `cancelClass` | `cancel_by` · `note` · `sendMessage` · `add_to_credit` · 2 TZ radios · `date`/`time` (+H/M) = **10** |
  | `editClass` | `date` · `time` (+H/M) · `sendMessage` · `duration` · **`teacher_id` (reassign)** · `accounting_statement` = **8** |
  | `sendWhatsappMessage` | `wa_message` · `send_teacher` · `send_student` = **3** |
  | `addQueueAction` | `level` (Urgent/Medium/Normal) · `text` = **2** |
  | `feedback` | `feedback_note` · `feedback_files[]` **file** = **2** |
* **Row → class detail** (`management-home-004` = `/management/courseclasses/1`): Class History header (Trial/Paid
  chips + the same 10-action `Actions` menu), teacher/student/course cards, Class Information (remark/note/summary/
  homework), **Files** (teacher/student), **TimeTable** (Student Enter At · Teacher Enter At · Remind Teacher At),
  **Class Recording** ("No recording available"), **Show Queues** modal, **Direct Links**, and a **Timeline audit
  trail** (`… updated Status`, `mohamed created`, with a Pending → Admin Cancel status diff).
* **Topbar** (every admin page): global search (`GET /management/search` + a `searchAll` "Recent Searches" modal),
  WhatsApp connection dot, apps grid, an **unpaid-courses alert** (`courses?type=no_invoices` + "View all courses"),
  a **queues** widget ("View All Queues" → `total-queues`), notifications bell (count badge + "See All
  Notifications"), a **7-language** switcher, dark-mode toggle, profile menu, and **"Add shortcuts"**
  (`POST /management/shortcuts`, `shortcut_title` + `shortcut_link` — user-defined nav shortcuts, present on
  admin AND teacher).

**Role isolation is real in the legacy** and is worth preserving: `teacher/management-home` and
`family/management-home` both render the *teacher* / *family* home, and `admin/teacher-home` renders the *admin*
home. Three independent redirect proofs — the legacy has no cross-role dashboard leak.

## 2. What we ship today

`app/src/js/pages/dashboard.js` → welcome hero (greeting · 2 stat cards · attendance ring) · **4 KPI cards**
(today's sessions 24 · active students 1,284 · attendance 92% · revenue 48,200 SAR — authored literals, hand-rolled
sparklines) · Today's Sessions module (7 columns, 5 rows, a `sess-new` form drawer, a "view all sessions" link) ·
an "up next this week" strip · a families/attention chip row · **4 status tiles** · the reports grid · **and a
"UI states" showcase band** (loading skeleton + error state + empty state) rendered on the production home.

## 3. The gaps that matter (capability level)

1. **KPI/status drill-down is gone.** Every legacy tile is a link into a status-filtered board; our KPI cards and
   `statusTile()`s are inert `<div>`s. 8 drill-downs → 0.
2. **The daily-board filter is gone from the dashboard** (Spec 026 DU-20 chose Option B — a settled decision, not
   re-litigated). But the capability did **not** move intact: `sessions.html` offers `search + status + subject`
   (3 controls) against the legacy's `date_range + time-window + teacher + family + student + type` (12 inputs).
   No date/time-window/teacher/family/student facet exists anywhere for the day board.
3. **Every session write is field-less.** The dashboard row kebab (`enhance.js:rowMenu`) = View · Edit
   (`data-demo-action`) · Cancel (`data-demo-action`); the drawer (`appointmentActions()`) = Edit/Notify toasts +
   a Cancel confirm. The richer `outcomeTemplate()` cluster (attend/absent/cancel/reschedule/reverse) is on
   attendance/sessions — and it too carries **zero form fields**. Against the legacy: attend 7 → 0, absent 13 → 0,
   cancel 10 → 0, edit 8 → 0 (and the legacy edit is the only place a session can be **reassigned to another
   teacher** — we have no reassignment control anywhere). Spec 032's "no field-less create/edit" law was applied to
   `openModal` triggers; these `data-demo-action` finals slipped through it.
4. **Missing outright**: board display-mode preference (Today/Upcoming/Past + group-by-time), Excel export of the
   day, per-class Send Reminder / Send WA, "Running" status transition, the class **Timeline audit trail**, the
   class **Files** panel, per-class **queue add with fields**, the topbar unpaid-courses alert, user-defined nav
   **shortcuts**, and a real **global search results** surface.
5. **Teacher home**: our teal cockpit is pay-free (correct) but the legacy teacher home's *working* controls —
   date search over own classes, **Enter Again** (join), **End class** (remark/summary/homework/notes/images),
   **Mark absent** (video + notes), **Request cancel/reschedule** — are all reduced to a `guidePanel` gate with
   0 fields (`pages/teacher-outcomes.js` has `field(` count = **0**).

## 4. Defects found in OUR product (not legacy gaps)

* **D-A · Teacher home advertises 7 existing pages as «قريبًا».** `pages/teacher-portal.js:33 quickTiles()` never
  received the Spec 019/020 status-aware honesty fix that family/student got — it hard-codes
  `.pt-qtile.is-planned` + `pt-qtile-soon` for **every** non-home nav entry, even though all 8 `ROLE_NAV.teacher`
  entries are `status:'implemented'` and all 7 pages were built by Spec 025.
  Proof: `grep -c 'قريبًا' public/teacher-portal.html` = **7**; `family-portal.html` = 0 (7 real
  `.pt-qtile.pt-lift` anchors); `student-portal.html` = 0 (6 anchors). Visually confirmed in
  `app/screenshots/teacher-portal__ar__light__desktop.png`: the sidebar links "جدولي/طلابي/نتائج الحصص/…" while
  the body's «روابط سريعة» band badges the same seven «قريبًا».
  **This also contradicts the standing "planned = 0 / 0 `[data-coming-soon]` sitewide" claim** — the census only
  counts `.nav-item.is-planned` and `[data-coming-soon]`, so the `.pt-qtile-soon` badges escape it.
* **D-B · The sessions table pager is a dead control.** `components/table.js:88-90` (and `data-table.js:24-26`)
  render `<button class="pager">1|2|3</button>` with **no** `data-action`, `data-filter`, or handler anywhere in
  `enhance.js`. Clicking page 2 does nothing at all — not even the honest "available once the server is connected"
  toast (the global delegate only matches `[data-action],[data-row-menu],[data-modal-trigger],a[href="#"]`).
  The footer claims "showing 5 of 24". This is the one *silent* dead control I found in the cluster.
* **D-C · The "UI states" showcase band ships on the production admin home** (`dashboard.js` renders
  `loadingSkeleton() + errorState() + emptyState()` under a "حالات الواجهة" heading). It is a design-system
  gallery artifact on a live operator surface, and it means the dashboard has **no real empty/error state** for the
  actual sessions table (the legacy has one: the red "No session today" band, see
  `management-home-status-1-full.png`).

## 5. What we do BETTER (preserve — do not "fix" back)

* **Teacher pay-free**: the legacy teacher home leads with a salary band (`997.00 EGP`, `Estimated 1,537.00`,
  `Fines: 1,003.00`, `Bonus 2,000.00`) and the admin day board tints a `(3.00 Fine)` chip onto the class row plus a
  `Delete Fine` kebab item wired to `POST /management/teachers/1/compensations/3`. None of it is ported.
* **No real PII**: the legacy profile popover exposes a real name + real gmail address
  (`management-home-001-page-interaction-001.png`); the corpus' real family/teacher names are not ported.
* **No computed vanity metrics**: legacy teacher home shows an "Attended Percentage 0%"; our teacher surfaces carry
  no computed score/percentage.
* **No destructive no-confirm actions**: the legacy `Delete Fine` fires straight from the kebab with no confirm.
* **Hash-aware language switch** (`enhance.js langUrl()` + `sidebar.js langRoute()`) preserves `#view=` — the
  legacy's 7-language links are plain page swaps.
* **Honest gates everywhere**: every write ends in a `backendRequired` gate, never a fake success toast.
* **The portals hub** (a demo role-switch device with an explicitly-labelled "no login, fixtures only" note) has no
  legacy equivalent and correctly demotes the student to a child-view preview (Spec 021 DEC-001/004).

## 6. Cross-role reality check

* The admin day board is the **only** surface where a session's outcome can be recorded for *someone else*. Its
  consumers (family billing "left hours", teacher follow-ups, attendance reports) all exist as **display** surfaces
  in our product — but because no outcome can actually be recorded, every one of them is fed by authored fixtures.
  That is expected and honest, but it means "creation surface exists" is false for the whole outcome chain
  (owner: 055 Cross-Role Propagation).
* Legacy `Send WA Message` / `Send Reminder` from a class row is the only messaging path that touches BOTH the
  teacher and the family for a specific session. Our `messages.html` / `announcements.html` compose surfaces are
  not session-scoped → the per-session notification capability has no home (owner: 053 + 055).
* Legacy role isolation (3 redirect proofs) should be an explicit invariant in **Spec 043**; today we have no auth
  at all, so "isolation" is only a routing convention.

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C01-01 | KPI/status tile drill-down links (8 status-filtered board links → 0; cards/tiles inert) | PARTIAL | 045-050 | §3 The gaps that matter (capability level) |
| C01-02 | Day-board filter form (legacy 12 inputs: date_range/time-window/teacher/family/student/type vs 3 controls on sessions.html) | PARTIAL | 056 | §3 The gaps that matter (capability level) |
| C01-03 | Session outcome/write forms with fields (attend 7 → 0 · absent 13 → 0 · cancel 10 → 0 · edit 8 → 0; kebab/drawer finals field-less) | PARTIAL | 056 | §3 The gaps that matter (capability level) |
| C01-04 | Session teacher-reassignment control (legacy editClass `teacher_id`; no reassignment control anywhere in our product) | MISSING | 056 | §3 The gaps that matter (capability level) |
| C01-05 | Board display-mode preference (custemize-table modal: Today/Upcoming/Past + group-by-time, persisted per user) | MISSING | 044 | §3 The gaps that matter (capability level) |
| C01-06 | Excel export of the day board (legacy POST /management/export-aa) | MISSING | 045-050 | §3 The gaps that matter (capability level) |
| C01-07 | Per-class Send Reminder / Send WA message (session-scoped notification touching teacher AND family) | MISSING | 053 | §3 The gaps that matter (capability level) · §6 Cross-role reality check |
| C01-08 | Per-class "Running" status transition | MISSING | 055 | §3 The gaps that matter (capability level) |
| C01-09 | Class Timeline audit trail (status diffs, actor, timestamps) | FUTURE_BACKEND | 055 | §3 The gaps that matter (capability level) |
| C01-10 | Class Files panel (teacher/student files per class) | FUTURE_BACKEND | 056 | §3 The gaps that matter (capability level) |
| C01-11 | Per-class queue add with fields (legacy addQueueAction: level + text) | MISSING | 056 | §3 The gaps that matter (capability level) |
| C01-12 | Topbar unpaid-courses alert (courses?type=no_invoices) | FUTURE_BACKEND | 055 | §3 The gaps that matter (capability level) |
| C01-13 | User-defined nav shortcuts (POST /management/shortcuts: shortcut_title + shortcut_link) | FUTURE_BACKEND | 056 | §3 The gaps that matter (capability level) |
| C01-14 | Global search results surface (GET /management/search + Recent Searches modal) | MISSING | 045-050 | §3 The gaps that matter (capability level) |
| C01-15 | Teacher-home working session controls (date search over own classes · Enter Again/join · End class form · Mark absent · request cancel/reschedule — reduced to a 0-field guidePanel gate) | PARTIAL | 054 | §3 The gaps that matter (capability level) |
| C01-16 | D-A: teacher quick-tiles falsely badge 7 implemented pages as «قريبًا» (missed Spec 019/020 status-aware fix; escapes the planned/coming-soon census) | PARTIAL | 045-050 | §4 Defects found in OUR product (not legacy gaps) |
| C01-17 | D-B: sessions-table pager is a silent dead control (no handler, no honest gate) | PARTIAL | 044 | §4 Defects found in OUR product (not legacy gaps) |
| C01-18 | D-C: "UI states" showcase band ships on the production admin home; the real sessions table has no genuine empty/error state | PARTIAL | 045-050 | §4 Defects found in OUR product (not legacy gaps) |
| C01-19 | Legacy teacher salary band / per-class fine chip / Delete Fine kebab (POST …/compensations/3) — not ported | REJECTED_PAY_FREE | — | §5 What we do BETTER (preserve — do not "fix" back) |
| C01-20 | Legacy real PII (profile popover real name + gmail; corpus real family/teacher names) — not ported | REJECTED_PRIVACY | — | §5 What we do BETTER (preserve — do not "fix" back) |
| C01-21 | Legacy computed vanity metric ("Attended Percentage 0%") — our teacher surfaces carry no computed score/percentage | INTENTIONALLY_IMPROVED | — | §5 What we do BETTER (preserve — do not "fix" back) |
| C01-22 | Destructive actions require confirmation (legacy Delete Fine fired from the kebab with no confirm) | INTENTIONALLY_IMPROVED | — | §5 What we do BETTER (preserve — do not "fix" back) |
| C01-23 | Hash-aware language switch preserving #view= (vs legacy plain page swaps) | INTENTIONALLY_IMPROVED | — | §5 What we do BETTER (preserve — do not "fix" back) |
| C01-24 | Honest backendRequired gates on every write — never a fake success toast | INTENTIONALLY_IMPROVED | — | §5 What we do BETTER (preserve — do not "fix" back) |
| C01-25 | Portals hub demo role-switch ("no login, fixtures only" note) with student demoted to child-view preview | INTENTIONALLY_IMPROVED | — | §5 What we do BETTER (preserve — do not "fix" back) |
| C01-26 | Session-outcome cross-role chain (record-outcome creation surface absent; family billing / teacher follow-ups / attendance consumers are fixture-fed display surfaces) | FUTURE_BACKEND | 055 | §6 Cross-role reality check |
| C01-27 | Role isolation as an explicit invariant (legacy 3 redirect proofs; today no auth — routing convention only) | FUTURE_BACKEND | 043 | §6 Cross-role reality check |

Honest counts: screenshotsOpened=33 · recordsInspected=21 · currentSourceFiles=not stated

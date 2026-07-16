# C14 — General / Unknown / Utilities — Capability Audit (Spec 042)

**Legacy scope**: the 19 pages tagged `General / Unknown` (12 admin · 2 family · 5 teacher).
**Current scope**: `gallery.html` (orphan), `time-converter.html`, `tasks.html` — plus, because the legacy
evidence for them lands in THIS cluster, `scheduled-actions.html` (Spec 026), `leads.html` (Spec 034) and the
settings expense-**heads** block (Spec 031/032/040).

**Method**: 19 legacy screenshots opened as images + 7 current-app screenshots opened as images; 14 raw
`pages/*.json` records read field-by-field (forms, modals, tables, filters, option lists); current source read
end-to-end (`pages/time-converter.js`, `pages/tasks.js`, `pages/gallery.js`, `pages/scheduled-actions.js`,
`pages/leads.js`, `fixtures/control-center.js`, `fixtures/scheduled-actions.js`, `enhance.js:336-379`,
`nav.config.js`, `scripts/build-html.mjs`); prior contracts read and **not re-litigated**
(Spec 034 `contracts/time-converter-contract.md`, `contracts/tasks-page-contract.md`,
Spec 041 `spec.md` D-2 = the frozen gallery orphan set, Spec 040 = Message Builder → Spec 053).

---

## 1. The headline finding: **12 of the 19 legacy pages in this cluster are ERROR CAPTURES**

This is the single most important fact about C14 and it is invisible in every planning summary, which lists all
19 as if they were real surfaces.

| Legacy slug | HTTP | What the pixels actually show |
| --- | --- | --- |
| `management-export-course` | **500** | branded "500 Server Error — Something went wrong, try again later" |
| `management-families-feedback-family-1` | **500** | same 500 page |
| `management-new-requests-scheduled-trials-index-status-3-4-…` | **500** | same 500 page |
| `management-new-requests-scheduled-trials-index-status-5-7-6-…` | **500** | same 500 page |
| `management-teachers-1-monthly-classes` | **500** | same 500 page |
| `family/student-profile` | **500** | same 500 page |
| `teacher/teacher-profile` | **500** | same 500 page |
| `management-settings-customisation-message-builder` | **504** | bare "Gateway Timeout" |
| `family/main-index-html`, `teacher/main-index-html`, `teacher/teacher-course-history-main-index-html`, `teacher/teacher-monthly-plans-main-index-html` | **404** | the branded "Opps!!! / 404 ERROR / Go Back to Home" page (all four byte-identical) |

Proof: the five 500 captures are md5-identical in pairs
(`896b81c2a8bccb89459a9602fcf85987` / `54e0071d192a03e45f41863360337214`) and every record carries
`"httpStatus": 500, "isErrorPage": true, "forms": []`. The four `main/index.html` captures are one file
(`49817` bytes, identical across roles).

**Consequence**: the "Export Course", "Family Feedback", "Monthly Classes", "Scheduled Trials", "Student
Profile", "Teacher Profile" and "Message Builder" capabilities have **ZERO field-level evidence in this
cluster**. Any spec that claims to have "covered" them from C14 evidence is guessing. The correct disposition
for each is **UNKNOWN_EVIDENCE**, with the owner pointed at the cluster that does hold real evidence
(profiles → C12/C02/C03 `*-profile-edit` captures; feedback → C08/Spec 029; monthly classes → C02/Spec 036;
trials queue → C11/Spec 034; message builder → **Spec 053**, already decided in Spec 040).

Only **7 of 19** pages carry usable evidence: `time-convertor`, `scheduled-actions`, `scheduled-actions/create`,
`heads`, `new-requests/requests`, `courseclasses/default-member-course-details/1`, and (via C13's record, which
our current `tasks.html` is actually grounded in) `management-tickets`.

---

## 2. Time Converter — our tool is REAL, but it is a *point converter*, not the legacy *comparison board*

**Legacy (`management-time-convertor`, 200, screenshots `-full`, `-002`)** has two tabs:

*Tab "Time Zone"* — a **multi-location 24-hour band grid**:
- one row per added location (`🇪🇬 +3 Cairo (System)`), 24 hour-cells per row, business-hours (9–5) and
  night-hours (10pm–6am) shading, a **red "current time" marker** drawn across the grid at 8:42 PM;
- a date rail: **Previous · Today · `Saturday, June 20, 2026` · Next + a `YYYY-MM-DD` date input**;
- **Add Location** → a modal (`addLocationModal`) with a *search cities or timezones* input, **6 region tabs**
  (All Regions / Americas / Europe / Asia / Africa / Oceania) and **~150 city→IANA rows**
  (`🇺🇸 New York America/New_York` … `🇳🇨 Noumea Pacific/Noumea`), already-added cities marked "Added";
- a per-row **Remove** (trash) control and a "System timezone" button.

*Tab "Changes"* — a **DST-transition impact board** (table, 6 columns, 2 rows):
`Time Zone | Affected Accounts (Teachers: 1 / Families: 0) | Next Change Date | Current Offset (UTC) |
Upcoming Offset (UTC) | Offset System (Current Hour: 08:42 PM / After Change: 07:42 PM)`.

**Ours (`time-converter.html`, `pages/time-converter.js` 147 lines + `enhance.js:336-379`)**:
- *Tab "المناطق الزمنية"*: **4 controls** — source zone select, target zone select, date, time — plus **5
  quick chips** and a text legend; the output card prints the converted instant (screenshot proves
  `Cairo 03:00 PM → New York 08:00 AM`, a genuine `Intl.DateTimeFormat({timeZone})` conversion, no network).
- *Tab "التغييرات"*: a **4-column** authored DST table (zone / next change / current offset / upcoming offset),
  4 authored rows.

**Control-level verdict**
| | legacy | ours |
| --- | --- | --- |
| compared locations | N (add/remove, ~150 candidates) | exactly 2 (source→target) |
| 24-hour band grid + business/night shading + now-marker | yes | **absent** (legend text only) |
| date navigation (Prev/Today/Next) | yes | date input only |
| DST board columns | 6 (incl. **Affected Accounts**, **Offset System**) | 4 |

⇒ **PARTIAL**, and note that Spec 034's own contract explicitly allowed *"add/remove a compared zone
(client-side)"* — that clause was never implemented. The **Affected Accounts** column is the only part that
truly needs a backend (it counts live teacher/family accounts per zone) ⇒ **FUTURE_BACKEND**. The band grid,
the add/remove locations and the date rail are all pure client-side work and are **honestly buildable today**.

**Cross-role gap**: a DST switch silently moves every session for a teacher or a family in that zone. The
legacy at least *told the admin* how many accounts each change hits. **We surface DST nowhere in the teacher
portal, the family portal or the child view.** No consumer surface exists.

---

## 3. Scheduled Actions — the list is display-only and the CREATE FORM DOES NOT EXIST

This is the most serious form gap in the cluster.

**Legacy `management/scheduled-actions/create`** (raw record, POST `/management/scheduled-actions`) is a
**conditional 16-visible-control form**:

| # | name | control | evidence |
| --- | --- | --- | --- |
| 1 | `action_type` * | select — **Stop Family · Stop Student · Cancel Classes · Activate Family · Activate Student** | options in raw json |
| 2 | `scheduled_date` * | date | screenshot + raw |
| 3 | `family_target_id` | select ("Family *") | raw |
| 4 | `returned_at` | date ("Returned date" — auto-return) | raw |
| 5 | `student_target_id` | select ("Student *") | raw |
| 6 | `returned_at` (2nd) | date | raw |
| 7 | `cancel_classes_student_id` | select | raw |
| 8 | `criteria[teacher_id]` | select ("Teacher *") | raw |
| 9 | `criteria[material_id]` | select ("Material *") | raw |
| 10–12 | `criteria[cancel_type]` | **radio ×3: Auto Makeup / Reschedule / No Makeup** | raw |
| 13 | `criteria[reschedule_date]` * | date | raw |
| 14 | `criteria[reschedule_time]` * | time | raw |
| 15 | `criteria[add_to_credit]` | checkbox — *"When on, cancelled sessions are added to the family's credit."* | raw |
| 16 | `activate_family_target_id` / `activate_student_target_id` | selects ("Students and Courses", "Courses to Activate") | raw |
| 17 | `note` | textarea | screenshot + raw |

**Ours** (`pages/scheduled-actions.js:80-95`): the header primary is
`button({ ..., disabled: true, reasonKey: 'sca.reason.backend' })` — a **field-less disabled gate. 0 fields
against 16 evidenced.** That directly contradicts the Spec-032 law ("every Create opens a REAL form UI with
visible grounded fields FIRST; only the final Save is a gate"). It escaped Spec 032's `fieldlessCreateEdit===0`
audit because that audit counted field-less `data-modal-trigger`s, and this control is a `data-disabled-reason`
lock instead. **This is a genuine, machine-provable hole in the form-completion freeze.** Owner: **Spec 056**.

**The list** is also thinner than evidenced:
- legacy columns: `# · Action Type · Target · Scheduled Date · Status · Created by · Executed At · Result ·
  Note · Settings` + two filters (`action_type`, `status`);
- ours: authored cards with type · target · scheduled date · auto-return date · status chip. **No filter bar,
  no Created-by / Executed-At / Result / Note, no per-row Settings.**
- **Status vocabulary diverges**: legacy = `Pending · Executed · Failed · Cancelled`; ours =
  `queued · upcoming · cancelled` (`fixtures/scheduled-actions.js`). We invented `upcoming`, and we dropped
  `Executed`/`Failed` — which is *defensible* (nothing executes without a scheduler) but it must be recorded,
  not silently carried. The 5 action types themselves match the legacy enum **exactly** — that part is solid.

---

## 4. Expense "Heads" — the ADD form is field-complete; the ROW ACTIONS are missing

Legacy `management/heads`: table `# · Name · Status · Actions`, **Add Head** modal = exactly **2 fields**
(`name` text, `status` select Active/Inactive) + *Save changes*; a second form in the DOM carries
`_method` (an in-place **edit**), and the table exposes an **Actions** column (edit/delete).

Ours (`pages/settings.js:157-169`, settings ▸ General): a figure-free `name + status-chip` list + an
`head-add` form drawer with **2/2 fields** and a gated Save. ⇒ the *create* is **COMPLETE** (2 = 2, no amount
field, correctly figure-free per the finance law). But there is **no per-row edit, no delete, no status
toggle** ⇒ the *manage* capability is **PARTIAL**. Owner: **Spec 056**.

---

## 5. New Requests / Trials — our leads page covers the record, not the pipeline analytics

Legacy `management/new-requests/requests?date_range=…` (200) is two things at once:

1. **A trials pipeline dashboard** — hero "0 Trials Completed", 3 alert cards (*Trials Overdue for
   Scheduling* "more than 1 hour passed without scheduling" · *Upcoming Trials Not Confirmed* "starting in less
   than 2 hours" · **Scheduling Efficiency 65 % "requests scheduled within target time"**), 4 KPI cards
   (Total New Requests / Scheduled Trials / Pending Actions / **Avg. Scheduling Time 0h ↓0 %**), 3 outcome
   cards (Missed / Completed / Cancelled trials, each with **"% of requests"**), 3 insight cards (Fastest
   Scheduling / Most Requests From / Most Requested) and a date-range filter.
   → **Every one of these is a COMPUTED aggregate.** Our constitution forbids computed
   score/rank/percentage/chart on authored fixtures, and faking them would be dishonest.
   ⇒ **FUTURE_BACKEND** (a trials-pipeline analytics service). Our `leads.html` KPI strip (4 authored counts)
   is the honest stand-in.
2. **A lead record workflow** — table `# · Date · Parent name · E-mail · Phone number · Status · Actions`;
   `showNewRequest` detail modal with *Basic Information* (Parent · Parent Age · E-mail · Phone number ·
   Gender · Request Date), *Course Trial Information* (Course Name · Trial Date · Trial Time · **Teacher
   gender** · Number of Classes Per Week · Class Duration), *Additional information* (Country · Timezone ·
   Language · How Did You Hear About Us? · Coupon Code · Number of Friends · Note), a **Children (Name/Age)**
   table and a Notes list; plus *Add Notes* and *Change Status* modals with the exact 8-status enum
   (Contacted · Qualified · Trial Taken · no response · Duplicated · Trial Missed · scheduled · Teacher).

Our `pages/leads.js` create drawer carries **19 fields** against ~21 evidenced; the two misses are the
**repeatable Children (name+age) rows** and the **Teacher-gender preference**. The 9-status vocabulary in
`fixtures/control-center.js` maps 1:1 onto the legacy 8 + an added `pending`. Notes + Change-Status forms exist
as gated mini-forms. ⇒ **PARTIAL** (record workflow), **FUTURE_BACKEND** (pipeline analytics).

---

## 6. Two capabilities we have NOWHERE, both from `courseclasses/default-member-course-details/1`

This page is the only C14 record with a real entity on it, and it hides two genuinely missing capabilities:

- **A dual-timezone timetable.** "Show Timetable" opens the `modalTop` modal
  (interaction-003): a table whose columns are **Student ▸ Week Days ▸ Time | Teacher ▸ Week Days ▸ Time |
  Duration** — Friday 11:00 AM (student) is the *same* session as Friday 03:00 AM (teacher), with a `60 mins`
  chip. The legacy renders every session **in both parties' local clocks**. Nothing in our product does this:
  `schedule.html`, `sessions.html`, the teacher portal and the family portal all show a single wall-clock. For
  a cross-timezone academy this is a correctness feature, not a nicety. ⇒ **MISSING**, owner **Spec 055**
  (cross-role propagation) with the zone data coming from the same fixtures the time-converter already uses.
- **An entity activity timeline.** The page carries a `Timeline` band ("18th June 2026 · 02:56 PM · *mohamed*
  created"). We have exactly one audit surface (the Spec-031 staff *Activity* drawer) and none on
  enrollments/courses/sessions. A real audit trail needs a backend ⇒ **FUTURE_BACKEND**, owner **Spec 055**.

The page's kebab (`Copy Course Data · Show Current Course · Edit · Delete`) also proves a **Delete that POSTs
to `/management/courses/1/delete` with no captured confirmation step** — exactly the pattern our law rejects.
Our deletes are `data-confirm` + a `backendRequired` final that mutates nothing ⇒ **REJECTED_NO_FAKE /
INTENTIONALLY_IMPROVED, keep it that way.**

The same page carries `Price 30` on a student↔teacher enrollment row. That is a **course price**, not teacher
pay — but it sits one field away from a teacher name, and porting it would put a money figure on a teacher
surface. It stays out. (Teacher pay-free GLOBAL; the Spec-004/009 sanctioned single-value admin plan literal on
`family.html` is a different, already-settled thing.)

---

## 7. Tasks — we are better than the legacy, and the legacy form was never captured

`management-tickets` (the record our `tasks.html` is actually grounded in — note it is filed under **C13**, not
C14, an evidence-index inconsistency) was captured **completely empty**: 5 zeroed KPI tiles (Total · Completed ·
Pending · **Inprogres** · Overdue), an **empty donut chart** (legend: Completed/Pending/Inprogres/Overdue), an
empty `Staff Members` table (`Name · Total: · Pending · Overdue · Completed · Average`) and a single **Add
Section** button. There is **no captured task row, no captured create-task form, no captured drag interaction**.

Ours: 4 KPI cards, a 4-column display-only board with 7 authored cards (title · priority chip · due chip ·
assignee), the 4-row staff table with an **authored** `Average` literal (جيد/مقبول — never computed), a 7-field
create-task drawer and a 1-field add-section drawer, both ending in a `backendRequired` Save.

⇒ the board/KPI/staff-table shell is **INTENTIONALLY_IMPROVED** (we render real content where the legacy
rendered zeros; we replaced a banned chart with honest per-column tallies). But the **create-task field set
(7 fields) and the add-section field set (1 field) are AUTHORED, not evidenced** ⇒ **UNKNOWN_EVIDENCE**, and
**moving a task** (drag / status change) does not exist at all ⇒ **FUTURE_BACKEND**. Do not let a future spec
"restore" a chart here.

---

## 8. Gallery — settled, leave it alone

`gallery.html` / `gallery.en.html` are a **design-system showcase** (buttons, status tiles, KPI cards, chips,
medallions, fields, avatars, badges, report cards, menus, **empty + error states**, toast/modal) with **no
legacy counterpart**. Spec 041 **D-2** froze the orphan set at exactly `{gallery.html, gallery.en.html}`, owner
= the frontend/design-system maintainer, entry path = direct URL, deliberately absent from nav.
**Do not re-litigate. Do not add it to the sidebar. Do not delete it.** ⇒ **INTENTIONALLY_IMPROVED.**

One thing the gallery proves that C14 otherwise lacks: we *have* an `emptyState()` and an `errorState()`
component. What we do **not** have is a **404 / error page** — the legacy has a branded one ("Opps!!!" + *Go
Back to Home*) that every mistyped URL in all three roles lands on. Our static build has no `404.html`.
⇒ **MISSING**, owner **Spec 057**.

---

## 9. Shell capabilities visible in every C14 record (belong to C15, flagged here)

Every admin record in this cluster carries three topbar capabilities we do not implement:
- **`shortcutsNavModal`** — "Add shortcuts" (`shortcut_title`, `shortcut_link` → POST `/management/shortcuts`):
  a **personal, persisted nav shortcut**. Our topbar has no equivalent. ⇒ **MISSING** (owner C15 / Spec 057);
  it needs persistence to be honest ⇒ FUTURE_BACKEND if built.
- **`searchAll`** — a global "Recent Searches" modal over `/management/search?query=`. Our topbar search is a
  `data-action="command-palette"` control. Cross-check owned by C15.
- **"View All Queues" / "View all courses"** quick links. Owned by C01/C06.

---

## 10. Privacy — what the legacy leaks and we must never port

| Leak | Evidence |
| --- | --- |
| Real admin identity + e-mail (`Eslam Essam · eslammekky@gmail.com`) in the profile popover | `…/screenshots/management-time-convertor-001-page-interaction-001.png`, `…/management-heads-001-…png`, `…/management-courseclasses-…-001-…png` |
| Real student / parent / teacher names (`محمد احمد`, `abdo ahmed`, `المعلم محمد صادق صادق`) + course price | `…/management-courseclasses-default-member-course-details-1-full.png` |
| Real actor name in the audit timeline (`mohamed created`) | same capture |
| Live account counts per timezone (`Teachers: 1 · Families: 1`) on a *utility* page | `…/management-time-convertor-002-page-interaction-002.png` |

Our fixtures use authored names, `@example.com` addresses and `05000000NN` phones. Keep it that way; the
account-count column, if it is ever built, is an **admin-only** aggregate and must be scoped in **Spec 043**.

---

## 11. Visual verdict

- **time-converter**: honest and legible, but ~60 % of the viewport is empty below the fold on desktop; it
  reads like a utility widget, not an academy tool. The legacy's hour-band grid is *both* more useful and more
  characterful. **Redesign candidate** (045–050) — and there is **no current screenshot of the Changes tab at
  all** ⇒ visual review required.
- **tasks**: the strongest page in the cluster — cheerful chips, real cards, good density. Keep.
- **scheduled-actions**: acceptable card board, but the disabled "create" primary reads as a broken button; the
  page has no filters and no empty state on screen. **Needs the real form (Spec 056)** more than a redesign.
- **gallery**: fine for its purpose (maintainer-facing).

---

## 12. Owners at a glance

| Owner | Work |
| --- | --- |
| **Spec 043** | scoping the DST "affected accounts" aggregate; keeping real PII out of any ported fixture |
| **Spec 044** | the scheduled-action **conditional** create form (a 16-control form whose fields appear per action type) is the exact long-form/drawer problem 044 exists to solve |
| **045–050** | time-converter redesign (multi-zone band grid, add/remove location, date rail) |
| **Spec 053** | Message Builder (504 — zero evidence; already assigned in Spec 040) |
| **Spec 055** | dual-timezone (student ↔ teacher) session rendering; entity activity timelines |
| **Spec 056** | scheduled-action create form (0 → 16 fields); heads row edit/delete; leads children-rows + teacher-gender; task create/section field sets |
| **Spec 057** | a real 404/error page; topbar shortcuts; final orphan/route freeze |
| **Frontend maintainer** | `gallery.html` (Spec 041 D-2 — frozen, unowned by any spec) |

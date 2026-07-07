# Agent 09 — Risk / Drift / Extra-Pages Audit (reverse-direction: current → legacy)

Spec 023 · Full Legacy Coverage Audit 000–022 · Agent 09

## Scope & method

Direction: for EVERY current rebuilt page (38 ar+en page pairs + `index.html` = 77 files in
`academy-dashboard-discovery/app/public/`, backed by 38 modules in
`academy-dashboard-discovery/app/src/js/pages/`), establish the legacy source that grounds it,
or flag it as net-new / drift. Method:

1. Enumerated the current inventory (`ls` of `app/public/` and `app/src/js/pages/`).
2. Read the two legacy route inventories end-to-end:
   `output/combined/page-inventory.md` (339 captured pages, 3 roles) and
   `frontend-planning-deep/08-role-page-inventory-v2.md` (178 route templates: admin 145,
   teacher 22, family 11). Grepped `frontend-planning-deep/02-all-pages-expanded-inventory.md`
   for endpoint confirmation.
3. Read the header/self-documentation of all 38 current page modules (they carry explicit
   spec + legacy-shape provenance comments) plus `app/public/index.html`.
4. Visually opened 6 legacy screenshots (small batches) to confirm the contested groundings:
   the family `/student/*` surface (home, studentslist, billing), the teacher class-history
   surface, the admin home board, and the admin session-status (attend/absent) board.
5. Judged every current item against the binding laws: legacy = capability checklist not a
   pixel target; zero pay figures anywhere; teacher surfaces pay-free globally; family zero-pay;
   no fake actions; corrected role model (Spec 021 DEC-001..009: three legacy logins, NO
   standalone student role, student pages = demoted child-view owned by Family).

Classification vocabulary and owner-spec vocabulary are exactly the sets fixed by the mission.

## Evidence opened (exact paths)

Legacy evidence (9):

- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/combined/page-inventory.md` (read in full; line cites below use its numbering)
- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/frontend-planning-deep/08-role-page-inventory-v2.md` (read in full)
- `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/frontend-planning-deep/02-all-pages-expanded-inventory.md` (grep for `/management/all/teachers/timetable`, `studentslist`, `analysis-student`, `teachers_details`, `update-result` endpoints)
- Screenshot `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/family/screenshots/student-studentslist-full.png` ("All Account Subscriptions" table: Student Name · Status · Teacher Name · Course Name · Subscription · History · Feedback About)
- Screenshot `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/family/screenshots/student-billing-full.png` ("Billing Details": Serial No · Month-Year · Due Date · Course · **Amount** · Status)
- Screenshot `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/family/screenshots/student-home-full.png` (identity hero: avatar + "الطالبة لمار حسن" + Total/Remaining/Taken hours + Time Spendings; "Today's Classes"; "Your Teachers"; Request Trial button)
- Screenshot `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/teacher/screenshots/teacher-teacher-history-1-full.png` ("Classes History Details" rows with Waiting/Admin Cancel statuses)
- Screenshot `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/admin/screenshots/management-home-full.png` (KPI tiles Total Classes / Sessions Pending / Attend / Waiting & Running / Cancel / Absent + "Classes Of 2026-06-20" board)
- Screenshot `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/admin/screenshots/management-accounting-transaction-session-status-attend-full.png` (Attend / Student Absent / Teacher Absent tiles + Transaction table with Profit/EUR columns)

Current evidence (39): `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/public/index.html` plus the header blocks of all 38 modules under `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/src/js/pages/`:
`add-family.js, attendance.js, course.js, courses.js, dashboard.js, families.js, family.js, family-billing.js, family-child.js, family-children.js, family-materials.js, family-portal.js, family-profile.js, family-progress.js, family-requests.js, family-schedule.js, finance.js, gallery.js, group.js, groups.js, portals.js, reports.js, schedule.js, sessions.js, settings.js, student.js, student-history.js, student-homework.js, student-materials.js, student-portal.js, student-profile.js, student-progress.js, student-schedule.js, students.js, teacher.js, teacher-performance.js, teacher-portal.js, teachers.js`.

Directory listings: `app/public/`, `app/src/js/pages/`, `output/combined/`, `frontend-planning-deep/`, `output/roles/{admin,family,teacher}/`, `output/roles/*/screenshots/`.

Path shorthand used in the table below: `pages/` = `academy-dashboard-discovery/app/src/js/pages/`, `public/` = `academy-dashboard-discovery/app/public/`, `PI` = `output/combined/page-inventory.md` (line no.), `RPI` = `frontend-planning-deep/08-role-page-inventory-v2.md`, `shots/` = `output/roles/`.

## Reverse-grounding table (one row per current page pair; ID prefix X-)

| ID | Current item | Current evidence | Legacy grounding | Classification | Keep / merge / rename / hide / remove / improve | Owner spec | Reason |
|---|---|---|---|---|---|---|---|
| X-01 | index.html (redirect) | `public/index.html` (3-line meta-refresh → dashboard.html) | None direct; legacy root `/main/index.html` was HTTP 404 (PI L318, RPI L267) | useful-net-new | Keep | done | GitHub-Pages entry infrastructure; honest single redirect, no content to ground |
| X-02 | dashboard(.en).html | `pages/dashboard.js` | Admin home `/management/home` — PI L119 (66 btn, 15 forms); `shots/admin/screenshots/management-home-full.png` (KPI tiles + today's classes board) | legacy-grounded-improved | Keep | done | Same capability: KPI band + today board; rebuilt without numeric-status codes |
| X-03 | students(.en).html | `pages/students.js` | `/management/student` — PI L220; RPI L180 | legacy-grounded | Keep | done | Direct directory equivalent with family relationship enrich |
| X-04 | student(.en).html | `pages/student.js` | `/management/student/1` — PI L221 (99 btn, 23 modals); RPI L181 (19 forms, 24 tabs) | legacy-grounded-improved | Keep | done | Legacy's richest page rebuilt as baked tabbed profile |
| X-05 | families(.en).html | `pages/families.js` | `/management/families` — PI L88; RPI L100 | legacy-grounded | Keep | done | Directory ↔ directory |
| X-06 | family(.en).html | `pages/family.js` | `/management/families/1` — PI L89 (62 btn, 7 tbl); RPI L101 | legacy-grounded-improved | Keep | done | Family hub with children-as-hero; billing tab is figure-safe by law |
| X-07 | add-family(.en).html | `pages/add-family.js` (wizard header) | `/management/families/create` — PI L93; RPI L103 (1 form, 37 flds) | legacy-grounded-improved | Keep | done | The 37-field legacy create form rebuilt as a stepped wizard — a UX improvement over a real route, NOT drift |
| X-08 | teachers(.en).html | `pages/teachers.js` | `/management/teachers` — PI L242; RPI L208 (15 var) | legacy-grounded | Keep | done | Directory ↔ directory; no pay figures by law |
| X-09 | teacher(.en).html | `pages/teacher.js` | `/management/teachers/1` — PI L258; RPI L209 (14 forms, 16 tabs) | legacy-grounded-improved | Keep | done | Legacy profile's compensations sub-tree (PI L259–265) intentionally excluded (zero-pay law); rest of capability present |
| X-10 | courses(.en).html | `pages/courses.js` | `/management/courses` — PI L57; RPI L48 (14 var) | legacy-grounded | Keep | done | Catalogue ↔ catalogue |
| X-11 | course(.en).html | `pages/course.js` | `/management/courses/1` — PI L71 (83 btn); RPI L49 | legacy-grounded-improved | Keep | done | Tabbed course profile mirrors the legacy detail page |
| X-12 | groups(.en).html | `pages/groups.js` | `/management/group/index` — PI L116; RPI L28 | legacy-grounded | Keep | done | Cohort list ↔ groups index |
| X-13 | group(.en).html | `pages/group.js` | `/management/courseclasses/{id}` — PI L50–55; RPI L61 (6 var, 14 tabs) | legacy-grounded-improved | Keep | done | courseclasses detail rebuilt as group profile |
| X-14 | sessions(.en).html | `pages/sessions.js` | Admin home classes board (`shots/admin/screenshots/management-home-full.png`, "Classes Of 2026-06-20" table + session-status tiles) + `/management/session-class-room/{enc}/{id}` PI L188 | legacy-grounded-improved | Keep | done | List+agenda tabs over the same session capability; classroom write surface stays backendRequired |
| X-15 | schedule(.en).html | `pages/schedule.js` | `/management/all/teachers/timetable` PI L32 + `/management/search-schedule` PI L187; RPI L198, L228 | legacy-grounded-improved | Keep | done | Hand-rolled weekly grid + agenda replaces the legacy timetable; no calendar lib by law |
| X-16 | attendance(.en).html | `pages/attendance.js` | `/management/accounting/transaction/session?status=attend/student-absent/teacher-absent` PI L17–19; `shots/admin/screenshots/management-accounting-transaction-session-status-attend-full.png` (Attend/Student Absent/Teacher Absent tiles); `/teacher/update-result` PI L343 | legacy-grounded-improved | Keep | done | Outcome taxonomy is legacy-exact; legacy Profit/EUR columns on that screen intentionally excluded (zero-pay law) |
| X-17 | finance(.en).html | `pages/finance.js` | `/management/accounting` PI L13, `/management/invoices` PI L128, `/management/salaries` PI L181; RPI L234–241 | legacy-grounded-improved | Keep (body Spec 009-invariant) | done | Whole legacy Wallet/Finance family condensed to one figure-safe shell; full admin finance/invoices/salaries/banks rework is scheduled |
| X-18 | reports(.en).html | `pages/reports.js` | `/management/analysis-student` PI L36, `/management/analysis-course` PI L33, `/management/sessions_analysis` PI L189; RPI L177–178 | legacy-grounded-improved | Keep | done | Legacy analysis pages rebuilt as chart-free, finance-free roll-up links (law); deep analytics rework scheduled in 029 |
| X-19 | settings(.en).html | `pages/settings.js` | `/management/settings/general` PI L192, `/management/settings/customisation/personalisation` PI L191; RPI L167–171 | legacy-grounded | Keep | done | Settings shell over the legacy settings family; integrations/notification depth scheduled in 031 |
| X-20 | gallery(.en).html | `pages/gallery.js` (header: "Component / style preview — proves the design system") | NONE — no legacy route in PI or RPI | useful-net-new | Keep; HIDE from all role-facing navigation; consider renaming title to make its dev-infrastructure nature explicit | 032-final-qa | Design-system proof page required by the screenshot-based visual-acceptance law; not a product surface — 032 must verify it is not reachable from any role nav |
| X-21 | portals(.en).html (hub) | `pages/portals.js` (header: "demo role-switch HUB… honest framing: fixtures only, no login") | NONE as a single route; grounded in the FACT of three legacy logins (PI role sections L9/L314/L345; Spec 021 DEC-001) | useful-net-new | Keep — MUST STAY | done | The static demo has no auth; the hub is the honest replacement for three login screens. 2 role cards + admin console + demoted child-view preview exactly encodes DEC-001/002/004 |
| X-22 | family-portal(.en).html | `pages/family-portal.js` (living guardian cockpit) | Legacy family home `/student/home` — PI L353; `shots/family/screenshots/student-home-full.png` (identity hero + hours counters + Today's Classes + Your Teachers) | legacy-grounded-improved | Keep | done | The living hero/day-rail/story rows are a direct capability match for the legacy hero band + Today's Classes; zero-pay held |
| X-23 | teacher-portal(.en).html | `pages/teacher-portal.js` | `/teacher/home` — PI L326; RPI teacher sections L243–313 | legacy-grounded-improved | Keep | done | Teaching cockpit over the legacy teacher home; legacy Salary/Salary-Class-Report nav (PI L334–335) intentionally excluded (teacher pay-free GLOBAL law) |
| X-24 | student-portal(.en).html (child-view home) | `pages/student-portal.js` (header: reframed per DEC-002/003/005) | `/student/home` — PI L353 (family login persona = the child); `shots/family/screenshots/student-home-full.png` | legacy-grounded-improved | Keep (as demoted child-view, never a 4th role) | done | Former wrong-role-classification CORRECTED by Spec 022 at the locale layer; body preserved |
| X-25 | student-schedule(.en).html | `pages/student-schedule.js` | `/student/timetable` — PI L360; RPI L364 | legacy-grounded | Keep (child-view twin of X-33 — sanctioned, no merge) | done | Direct route match; duplication with family-schedule is the DEC-005 "demoted not deleted" design, not drift |
| X-26 | student-materials(.en).html | `pages/student-materials.js` | `/student/library` — PI L354; RPI L325 | legacy-grounded | Keep | done | Direct route match; legacy marketing hero intentionally dropped |
| X-27 | student-history(.en).html | `pages/student-history.js` | `/student/student-history-fillter` — PI L358; RPI L357 | legacy-grounded | Keep | done | Direct route match (session-record list) |
| X-28 | student-profile(.en).html | `pages/student-profile.js` (exactly 3 gates = legacy write surface) | `/student/profile-edit` — PI L356; RPI L349 (2 forms, 10 flds); legacy `/student/profile` VIEW was HTTP 500 (RPI L337) | legacy-grounded-improved | Keep | done | Honest gates mirror the profile-edit write surface; the broken legacy view page replaced by a working display card |
| X-29 | student-progress(.en).html | `pages/student-progress.js` | Partial: `/student/feedbacks` — PI L352 (teacher-signal lines) + the hours trio of `/student/home` (`shots/family/screenshots/student-home-full.png`) | useful-but-needs-better-grounding | Keep; record the grounding note (progress bars + achievements are AUTHORED net-new joy layer, feedbacks + hours are legacy) | 024-correction | Core facts grounded; the achievements/celebration band has no legacy counterpart — fine under "capability checklist" law but should be documented as authored demo content |
| X-30 | student-homework(.en).html | `pages/student-homework.js` | Weak: no `/student/homework` route exists in PI/RPI; nearest = homework-note lines inside session records (`/student/student-history-fillter` PI L358) and the teacher outcome flow (`/teacher/update-result` PI L343) | useful-but-needs-better-grounding | Keep; add an explicit grounding note (homework state derives from session outcomes); do NOT remove | 024-correction | Useful child-view surface; the honest hwSubmit gate already marks the write path backendRequired; needs its provenance recorded so 023+ audits stop re-flagging it |
| X-31 | family-children(.en).html | `pages/family-children.js` (header cites "All Account Subscriptions") | `/student/studentslist` — PI L359; `shots/family/screenshots/student-studentslist-full.png` (exact column set: Student Name · Status · Teacher · Course · Subscription · History · Feedback) | legacy-grounded-improved | Keep | done | Column-for-capability rebuild of the legacy subscriptions table as child cards with real drill-downs |
| X-32 | family-child(.en).html (drill-down) | `pages/family-child.js` (5 baked hash-switched panels, fam1 roster) | No single legacy route; grounded in the legacy per-child ACCOUNT SWITCH (the "student" switcher button top-right of `shots/family/screenshots/student-studentslist-full.png`) + DEC-004 (family owns the child journey) | useful-net-new | Keep — MUST STAY | done | The static build cannot switch accounts; baked `#child=stX` panels are the honest equivalent of the legacy account switcher. Deleting it would orphan 11 sanctioned anchors (family home 5, family-children 5, family-progress links) |
| X-33 | family-schedule(.en).html | `pages/family-schedule.js` (header: child tags = "the legacy Student-Name column, reborn") | `/student/timetable` PI L360 + `/student/today-sessions` PI L361 | legacy-grounded-improved | Keep | done | The two legacy schedule surfaces merged into one guardian view across children |
| X-34 | family-progress(.en).html | `pages/family-progress.js` | `/student/feedbacks` — PI L352; `shots/family/screenshots/student-feedbacks-full.png` exists in the capture set (not opened; PI row is the cite) | legacy-grounded-improved | Keep | done | Per-child feedback/progress view; zero charts/rank by law |
| X-35 | family-billing(.en).html | `pages/family-billing.js` (header documents the dropped figure column) | `/student/billing` — PI L351; `shots/family/screenshots/student-billing-full.png` (Serial/Month-Year/Due/Course/Amount/Status) | legacy-grounded-improved | Keep | done | Every legacy column kept EXCEPT Amount — the intentional zero-pay exclusion; hour-quota model is figure-safe |
| X-36 | family-requests(.en).html | `pages/family-requests.js` | `/student/request-trial` — PI L357; RPI L356 (1 form, 12 flds, 6 filt) | legacy-grounded-improved | Keep | done | Trial request grounded; meetings/cancel/reschedule cards are honest backendRequired previews of adjacent legacy admin flows (`/management/request-schedule` PI L179) |
| X-37 | family-materials(.en).html | `pages/family-materials.js` | `/student/library` — PI L354 | legacy-grounded-improved | Keep | done | Library regrouped by child (guardian mental model); honest download gate |
| X-38 | family-profile(.en).html | `pages/family-profile.js` (exactly 3 legacy-evidenced gates) | `/student/profile-edit` — PI L356 (legacy view page was a 500) | legacy-grounded-improved | Keep | done | Same write-surface-as-gates pattern as X-28 |
| X-39 | teacher-performance(.en).html | `pages/teacher-performance.js` (admin board, activeId teacherKpi, "no score/rank/pay") | Merge of `/management/teachers_details` PI L243 + `/management/teacher-feedback` PI L240 + `/teacher/teacher-history/{id}` PI L339–340 (`shots/teacher/screenshots/teacher-teacher-history-1-full.png`) | legacy-grounded-improved | Keep; re-verify against the full teacher-feedback capability when 028 lands | 028-admin-teachers-performance | A deliberate capability MERGE (counts + follow-ups, no computed rating) rather than a 1:1 route; the admin teachers/performance spec is its permanent owner |

Classification totals: 21 legacy-grounded-improved · 9 legacy-grounded · 4 useful-net-new (X-01, X-20, X-21, X-32) · 2 useful-but-needs-better-grounding (X-29, X-30) · 0 wrong-role-classification (the one historical case, student-portal, was corrected by Spec 022 per DEC-002) · 0 weak-design · 0 duplicate-or-merge-candidate · 0 random-or-unnecessary · 0 needs-correction.

## Narrative — what to merge / hide / rename / reclassify / remove, and which net-new pages must STAY

**Nothing should be removed.** Every one of the 38 page pairs traces to a legacy capability or to
sanctioned demo infrastructure; no page is random or unnecessary.

**Must STAY (net-new, justified):**
- **portals hub (X-21)** — the honest stand-in for the three legacy logins (Admin, Teacher,
  Family at `/student/*` — `output/combined/page-inventory.md` role sections). A static,
  fixtures-only build has no auth screen; removing the hub would leave the role dashboards
  unreachable and would violate the no-fake-actions law (a fake login would be worse).
- **family-child drill-down (X-32)** — the baked equivalent of the legacy per-child account
  switcher visible in `student-studentslist-full.png`. It is the structural anchor of the
  corrected role model (DEC-004: family owns the child journey); the family home, family-children
  and family-progress bodies all point their sanctioned anchors at it.
- **gallery (X-20)** — required by the screenshot-based visual-acceptance law as the
  design-system proof surface, but it is developer infrastructure: **032-final-qa should verify
  it is not linked from any role-facing navigation** (hide, don't delete). A clarifying subtitle
  ("design-system preview — not a product page") would remove any future drift ambiguity.
- **index.html (X-01)** — a 3-line redirect; pure hosting infrastructure.

**Hide / rename:** only the gallery nav-exposure check above. No page needs renaming — the
`student-*` filenames were deliberately KEPT while the shell reframed the wording at the locale
layer («بوابة الطالب» → «عرض الابن», Spec 022), which is exactly the no-deletion correction path.

**Reclassify:** none pending. The historical wrong-role-classification (a standalone Student
role) was already corrected by Spec 022 under Spec 021 DEC-001..005; this audit confirms the
current state matches the legacy three-login truth.

**Merge:** none recommended. The apparent duplication between the `student-*` child-view set
(X-24..X-30) and the `family-*` set (X-31..X-38) is the sanctioned DEC-005 design ("demoted,
NOT deleted"): the student pages are the child's own lens, reachable only through the demoted
hub preview and the family-child fold-point. Merging them would delete preserved work without a
correction plan, which the laws forbid.

**Needs-better-grounding (2, both 024-correction paperwork — content is fine):**
- **student-homework (X-30)**: no legacy `/student/homework` route exists; its facts derive from
  homework-note lines in session records. A one-line provenance note in the 024 correction pass
  stops every future audit from re-flagging it.
- **student-progress (X-29)**: feedback lines and hour counters are legacy-grounded; the
  achievements/celebration band is authored joy-layer content. Same fix: record it as authored.

**Intentional exclusions confirmed as law, not gaps** (so downstream agents don't count them as
drift): the Amount column on family billing (`student-billing-full.png`), the teacher Salary /
Salary-Class-Report nav (PI L334–335), the admin teacher compensations sub-tree (PI L259–265),
and the Profit/EUR columns on the session-transaction board
(`management-accounting-transaction-session-status-attend-full.png`).

## Risks, gaps, and proposed corrections

1. **Gallery nav exposure (low)** — if `gallery.html` is reachable from any role-facing nav it
   reads as product drift. Correction: 032-final-qa adds a machine check that no role page links
   to it (evidence to check: sanctioned-anchor registries in the smoke script).
2. **Two provenance holes (low)** — X-29/X-30 as above; ownership 024-correction, documentation
   only, zero page changes needed.
3. **teacher-performance merge provenance (low-medium)** — it is the only current page whose
   grounding is a three-route MERGE (teachers_details + teacher-feedback + teacher-history).
   When 028-admin-teachers-performance builds the real admin teachers group, it must either
   absorb this board or explicitly re-pin it, or the same capability will exist twice.
4. **Reverse direction is clean, forward direction is not (informational)** — this audit found
   no orphan current pages, but the legacy inventories show large families with NO current
   surface yet (teacher internal pages: chat/tickets/monthly-plans/library/timetable/students —
   PI L318–343, owner 025; admin chat/new-requests/certificates/forms/settings-integrations/
   accounting depth — owners 026–031). Those are coverage gaps for the forward-direction agents,
   not drift, and are already sequenced by DEC-009.
5. **Legacy 404/500 routes (informational)** — several legacy captures are error pages
   (`/main/index.html` 404 PI L318; `/student/profile` 500 RPI L337; `/management/export-course`
   500 RPI L73). Current pages correctly do NOT reproduce them; no correction needed, but 023's
   coverage matrix should mark them "legacy-broken, intentionally unreproduced".

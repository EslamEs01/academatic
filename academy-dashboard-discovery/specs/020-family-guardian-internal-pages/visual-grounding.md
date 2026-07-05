# Visual Grounding — Spec 020 (Family / Guardian Internal Pages), recorded 2026-07-04

**Gate status: COMPLETE — 100% of the family role's screenshots personally opened and viewed.**
The family folder holds **27 frames**; every one has now been visually inspected (11 during the
017/018/019 gates, the remaining **16 opened for this spec**, including all interaction shots).
`output/roles/student/` DOES NOT EXIST (re-verified) — the legacy `/student/*` routes ARE the
guardian app, crawled under `output/roles/family/`. The combined inventories (page/table/form)
were greped for family/guardian rows and are cited below.

## The complete legacy guardian app (what the frames prove)

Legacy guardian sidebar = **Home · Schedule · Classes Summary · Courses · Billing · Student
Feedback · Library** (+ Logout). Topbar carries a notifications popover ("No notifications / 0 New").
The account is multi-child (the Classes-Summary dropdown lists لمار AND منار). The profile VIEW
page is a **500**; the profile EDIT page works (photo/name/email/password). The site index for the
role is a **404** (never clone). Test data is mostly empty — the record SHAPES are the evidence.

## Evidence table (the 9 required areas)

| Area | Screenshot/file opened | What was visually observed | Business idea we keep | What we improve | Impact on the Family page design |
|---|---|---|---|---|---|
| **Children / students** | `student-studentslist-full.png` + `student-studentslist-001` (the "Courses" nav item) | **"All Account Subscriptions"** table: `# · Student Name · Status · Teacher Name · Course Name · Subscription · History · Feedback About` + a labeled "not have any courses" empty chip | One row per child×course with status/teacher/subscription + per-child History/Feedback entry points — THE children-list ancestor | Table → child CARDS (avatar · course/group/teacher · status/subscription chips · attendance/progress snapshot · latest-note line) each with the REAL `family-child.html#child=stX` drill-down | `family-children`: per-child cards over the fam1 roster; every capability column becomes a card element or a link/gate |
| **Child profile / drill-down** | `student-profile-full.png` (**500**) + the existing 018 `family-child(.en).html` (ours, shipped) + teacher `course-history` record shape | Legacy never delivered a working child profile; our family-child page already ships the five baked panels | Per-child inspection stays ONE surface (family-child) | Children/progress/schedule pages LINK to it (`#child=stX`) instead of duplicating panels | family-child PRESERVED as drill-down (not a sidebar item); Spec 020 pages feed it traffic |
| **Schedule / timetable** | `student-timetable-full.png` + `student-timetable-001` + `student-today-sessions-full.png` + `student-today-sessions-001` + home's Today's Classes card | Week = Sat-first day-column table (empty); Today = date-filtered table `Class Date · Time · Student Name · Teacher · Course · Subscription · Class Status`; every row is CHILD-TAGGED (Student Name column) | Today-across-children + the weekly view + child tagging on every session | Grid/table → today band (child-tagged cards) + day-grouped week agenda (the sanctioned pattern) + truthful rest days + ONE live gate | `family-schedule`: today ≤N child-tagged cards → next card → day-grouped week with child tags |
| **Progress / classes summary / history** | `student-student-history-fillter-2-full.png` + `-001` ("Classes Summary" = "History of : All Student": Select-Student dropdown (multi-child) + Submit → `Class Date & Time · Teacher Name · Show`) | Per-child history reached via a select+submit form; **no student-facing progress page ever existed** (nearest: subscriptions status + the admin analytics frame — charts stay admin-side) | Per-child learning visibility (history + notes) is the guardian's core need | Select+submit → per-child progress CARDS (authored bars + attendance mini + latest signal) each linking to `family-child.html#child=stX`; zero charts/rank | `family-progress`: family summary band + 5 per-child cards + teacher notes/signals + real drill-downs |
| **Billing / subscriptions / invoices** | `student-billing-full.png` + `student-billing-001` (**columns: `# · Serial No · Month-Year · Due Date · Course · Amount · Status`**, view-only, NO pay button) + the home's **hour-quota banner** (`Total Hours / Remaining Hours / Hours Taken` + "Time Spendings 0/0 H") from `management-home-full.png` | Legacy billing = view-only invoice rows + an HOUR-QUOTA subscription model (hours, not money, are the guardian-facing unit) | Invoice-row visibility (serial/month/due/course/STATUS) + the hour-quota idea (hours are session counts — figure-safe, not money) + per-child subscription status | DROP the Amount column entirely (zero-pay law); status-first: quota tiles (hour counts) + per-child subscription chips + invoice STATUS rows + backendRequired finance gates + the admin-finance note | `family-billing`: hour-quota tiles + subscription chips + amount-free invoice status rows + gates; the zero-pay regex stays green by construction |
| **Requests / feedback** | `student-feedbacks-full.png` + `-001` (meetings table: `# · Meeting Date · Time · Meeting Manager · Family Members · Action`; "No data found") + `student-request-trial-full.png` + `-001` (the 2-step wizard: Create New Child / Choose Existing + name/age/language/gender → step 2 "Trial Info") + admin `families/feedback/students` table shape (`Name · Status · Last Feedback · Next Meeting · Meeting Manager`) from the combined table-inventory | Guardian requests = trial requests (new/existing child), feedback meetings w/ a manager, cancel/reschedule (the 014 requests-hub register) | The request TYPES + their status lifecycle + the new-vs-existing-child concept | Real forms → grouped request cards by type w/ labeled status chips + preview lines + backendRequired create/submit gates; truthful empty | `family-requests`: summary band + type-grouped cards (trial/meeting/feedback/cancel-reschedule) + gates; the RETAINED 014 `prt.fam.req.*` keys re-render here |
| **Materials / library** | `student-library-full.png` + `-001` (category dropdown OPEN: "All Categories" + «اللغه العربيه») + `-002` | Marketing hero + a real category taxonomy (subject categories); empty list | Materials organized by category/subject per family | Kill the hero; group by CHILD (the guardian's mental model) with course/type chips; download gates | `family-materials`: per-child groups (the 014 materials slice re-homed + extended) + type chips + matDownload gate |
| **Family profile / settings** | `student-profile-edit-full.png` + `-001` (avatar upload JPG/GIF/PNG ≤1MB + First/Last name + E-mail + Save; separate Change-Password card) + the existing fam1 account register (014 acctTitle rows) | Account identity + THREE write capabilities (photo upload · profile save · password change) | Guardian account visibility + the exact legacy write surface as gates | Display-only guardian identity + family details + children summary + preference chips + the 3 backendRequired gates (the proven 019 profile pattern) | `family-profile`: identity card + account rows + children line + prefs + exactly 3 gates; zero forms |
| **Admin compact reference** | `design-references/academy-dashboard.png` + `admin/management-categories-families-full.png` (both re-cited from the recorded 018/019 gates) | Welcome→KPI row→today table w/ labeled chips→drill-down cards→honest states; one-card compact list rhythm | The target rhythm for every internal page | Re-expressed in `.pt-*` tokens, violet accent | All 7 pages: compact header → summary band → short bands → gates → note; ≤2 screens |

## Screenshots opened for Spec 020

All **27 of 27** family-role frames are now personally viewed. Opened FOR this gate (16):
`main-index-html-full.png` (404 — never clone) · `management-home-full.png` (**the real guardian
home**: hour-quota banner + Today's Classes w/ Request-Trial/Show-More + Your-Teachers panel) ·
`management-home-001` (+notifications popover) · `management-home-002` (the date-filtered today
table) · `student-home-001` (notifications popover) · `student-home-002` (today table) ·
`student-billing-001` (**the full invoice column set**) · `student-feedbacks-001` ·
`student-library-001` (**category dropdown open**) · `student-library-002` ·
`student-profile-edit-001` · `student-request-trial-001` · `student-student-history-fillter-2-001`
(**multi-child select: منار حسن**) · `student-studentslist-001` (**All-Account-Subscriptions
columns + empty chip**) · `student-timetable-001` · `student-today-sessions-001`.
Previously viewed in the recorded 017/018/019 gates (11): `student-home-full` ·
`student-studentslist-full` · `student-student-history-fillter-2-full` · `student-billing-full` ·
`student-profile-full` (500) · `student-profile-edit-full` · `student-timetable-full` ·
`student-today-sessions-full` · `student-feedbacks-full` · `student-request-trial-full` ·
`student-library-full`. Inventories greped: `combined/page-inventory.md` (family/student routes),
`combined/table-inventory.md` (feedback-students + class-feedback + subscription column sets),
`combined/form-inventory.md` (trial/password/select-students fields).

## Legacy gaps / nearest evidence

- **Trial wizard step 2 ("Trial Info")** was never captured by the crawler → nearest evidence: the step-1 frame + the form-inventory trial fields; our requests page previews the two-step concept as display lines (the RETAINED `prt.fam.req.trial*` keys) behind the backendRequired gate — no invented step-2 fields.
- **No guardian-facing progress page existed** → nearest evidence: subscription-status rows + per-child history + the admin-side analytics (charts stay admin). Our progress page is authored-figures-only.
- **No working child profile** (500) → our `family-child` page IS the fix (shipped in 018); Spec 020 links to it, never duplicates it.
- **No cancel/reschedule or certificate surface captured for the guardian** → nearest evidence: the Spec-014 requests-hub register (cancel/reschedule options + caution line, grounded at 014 time) — re-rendered as gated request cards, not invented flows.
- **Amount column exists in legacy billing** → deliberately EXCLUDED (the zero-pay hard line is stricter than legacy by design; hours are the guardian-safe unit).

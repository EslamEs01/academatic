# Agent 02b — Legacy FAMILY/GUARDIAN Screenshots Visual Audit

Spec 023 — Full Legacy Coverage Audit 000–022. Audit date: undefined (per mission brief).

## Scope & method

Visually audited all 27 legacy screenshots under
`academy-dashboard-discovery/output/roles/family/screenshots/` and cross-read all 13 matching
text-capture markdown files under `academy-dashboard-discovery/output/roles/family/pages/`. This
role's routes are all under `/student/*` and `/management/*` in the legacy Laravel app, but per
Spec 021 (binding role model) this is the **Family/Guardian login**, not a standalone Student role
— confirmed independently below by roster/multi-child evidence. No files were modified; this is a
read-only visual + text audit. Screenshots were opened in five small batches (≤5 each) via the Read
tool, in file-listing order, followed by the two remaining today-sessions shots. All findings below
cite the exact screenshot filename and/or page `.md` file that proves the claim.

## Evidence opened (exact paths)

All paths relative to `academy-dashboard-discovery/output/roles/family/`.

**Page markdown (13/13 read):**
1. `pages/main-index-html.md`
2. `pages/management-home.md`
3. `pages/student-billing.md`
4. `pages/student-feedbacks.md`
5. `pages/student-home.md`
6. `pages/student-library.md`
7. `pages/student-profile.md`
8. `pages/student-profile-edit.md`
9. `pages/student-request-trial.md`
10. `pages/student-student-history-fillter-2.md`
11. `pages/student-studentslist.md`
12. `pages/student-timetable.md`
13. `pages/student-today-sessions.md`

**Screenshots (27/27 opened visually):**
1. `screenshots/main-index-html-full.png`
2. `screenshots/management-home-full.png`
3. `screenshots/management-home-001-page-interaction-001.png`
4. `screenshots/management-home-002-page-interaction-002.png`
5. `screenshots/student-home-full.png`
6. `screenshots/student-home-001-page-interaction-001.png`
7. `screenshots/student-home-002-page-interaction-002.png`
8. `screenshots/student-billing-full.png`
9. `screenshots/student-billing-001-page-interaction-001.png`
10. `screenshots/student-feedbacks-full.png`
11. `screenshots/student-feedbacks-001-page-interaction-001.png`
12. `screenshots/student-library-full.png`
13. `screenshots/student-library-001-page-interaction-001.png`
14. `screenshots/student-library-002-page-interaction-002.png`
15. `screenshots/student-profile-full.png`
16. `screenshots/student-profile-edit-full.png`
17. `screenshots/student-profile-edit-001-page-interaction-001.png`
18. `screenshots/student-request-trial-full.png`
19. `screenshots/student-request-trial-001-page-interaction-001.png`
20. `screenshots/student-student-history-fillter-2-full.png`
21. `screenshots/student-student-history-fillter-2-001-page-interaction-001.png`
22. `screenshots/student-studentslist-full.png`
23. `screenshots/student-studentslist-001-page-interaction-001.png`
24. `screenshots/student-timetable-full.png`
25. `screenshots/student-timetable-001-page-interaction-001.png`
26. `screenshots/student-today-sessions-full.png`
27. `screenshots/student-today-sessions-001-page-interaction-001.png`

## Per-page findings

### 1. `main-index-html` (route `main/index.html`, discovered from `management/home` redirect)
- **Evidence:** `screenshots/main-index-html-full.png`, `pages/main-index-html.md`
- **What it is:** A generic **404 "Opps!!!" error page** ("This page you are looking for could not
  be found"), with a single "Go Back to Home" button → `/login`. Not a real family surface — an
  artifact of the crawler hitting a dead route.
- **UI:** Illustration + heading + one CTA. No tables/forms/roster data.
- **Pay/currency:** none.
- **Children/roster:** none.

### 2. `management-home` (route `management/home`) — the login-redirect target
- **Evidence:** `screenshots/management-home-full.png`,
  `screenshots/management-home-001-page-interaction-001.png` (notification dropdown open, "0 New" /
  "No notifications"), `screenshots/management-home-002-page-interaction-002.png` (identical to
  full — an interaction that navigated back), `pages/management-home.md`
- **What it is:** `/management/home` 302-redirects to `/student/home` — **this is the exact same
  rendered page as `student-home`** (byte-identical screenshot content: same hero, same KPIs, same
  "Today's Classes"/"Your Teachers" cards). Confirms `/management/home` and `/student/home` are the
  same guardian dashboard entry point, just different route aliases.
- **Key UI:** Sidebar nav: Home · Schedule · Classes Summary · Courses · Billing · Student Feedback
  · Library · Logout. Topbar: theme toggle, notification bell, two icon buttons, language flag
  (English/en shown), avatar "اح" dropdown. Main content: hero band with avatar "اح", child name
  "الطالبة لمار حسن 👋🏻" (**"the student Lamar Hassan"**) + "Student" badge, 3 KPI numbers (0 Total
  Hours / 0 Remaining Hours / 0 Hours Taken), "Time Spendings" widget (0/0 H, 0 H remaining badge).
  "Today's Classes" card (empty: "No sessions today") with **"Request Trial"** (yellow/gold CTA) and
  **"Show More"** (purple) buttons. "Your Teachers" card ("No Teachers").
- **Forms:** hidden logout form (`POST /student/logout`).
- **Pay/currency:** **ZERO** — the whole home page is hour-quota based (Total/Remaining/Taken
  Hours), no currency symbol or amount anywhere. Consistent with the current family app's zero-pay
  law.
- **Children/roster:** the header shows exactly ONE child persona ("لمار حسن") on this home screen,
  but the sidebar's "Courses" link goes to `studentslist` (see below) which is explicitly labelled
  **"All Account Subscriptions"** — i.e. the account (guardian) owns a roster, home just shows the
  currently-selected/default child.
- **Workflow:** "Request Trial" and "Show More" (→ today's sessions) are the two primary actions.

### 3. `student-home` (route `student/home`)
- **Evidence:** `screenshots/student-home-full.png` (identical to management-home-full),
  `screenshots/student-home-001-page-interaction-001.png` (notification dropdown),
  `screenshots/student-home-002-page-interaction-002.png` (Today's Classes search view after
  clicking "Show More" → this screenshot is actually the today-sessions page reached via
  navigation, per the interactions table: "Show More" → `student/today-sessions`), `pages/student-home.md`
- **What it is:** Same guardian home dashboard as `management-home` (this route is the canonical
  slug; `management/home` 302s here).
- **Confirmed identical content** to management-home — no additional findings beyond #2.

### 4. `student-billing` (route `student/billing`)
- **Evidence:** `screenshots/student-billing-full.png`,
  `screenshots/student-billing-001-page-interaction-001.png`, `pages/student-billing.md`
- **What it is:** "Billing Details" table page.
- **Key UI:** Table with columns **#, Serial No, Month-Year, Due Date, Course, Amount, Status**
  (0 rows — empty fixture data for this account). Sidebar "Billing" item highlighted active.
- **Pay/currency in LEGACY:** the table SCHEMA includes an **"Amount" column** — i.e. legacy billing
  IS amount-bearing (a real dollar/currency figure would render per invoice row if data existed).
  This is exactly the capability the binding law (family app = zero-pay, status-first,
  hour-quota-based billing) DELIBERATELY excludes/reclassifies — confirmed intentional exclusion,
  not a gap, per Spec 020's "amount-free invoice rows" decision.
- **Children/roster:** none visible (table empty in this capture).
- **Workflow:** no interactive workflow captured beyond the notification dropdown; "View all
  invoices" header link routes back to this same page.

### 5. `student-feedbacks` (route `student/feedbacks`)
- **Evidence:** `screenshots/student-feedbacks-full.png`,
  `screenshots/student-feedbacks-001-page-interaction-001.png`, `pages/student-feedbacks.md`
- **What it is:** "Student Feedback" — parent/guardian-teacher **meeting log**, not a
  student-authored feedback form.
- **Key UI:** Table columns: **#, Meeting Date, Meeting Time, Meeting Manager, Family Members,
  Action**. Empty state: sad-face icon + "No data found".
- **CRITICAL role evidence:** the column **"Family Members"** is direct proof this is a
  family/guardian-facing meeting-log surface, not a single-student page — meetings are logged
  against the family unit, listing which family members attended.
- **Pay/currency:** none.

### 6. `student-library` (route `student/library`)
- **Evidence:** `screenshots/student-library-full.png`,
  `screenshots/student-library-001-page-interaction-001.png` (category dropdown open, showing
  "All Categories" + "اللغه العربيه" (Arabic language) option),
  `screenshots/student-library-002-page-interaction-002.png`, `pages/student-library.md`
- **What it is:** A content/materials library — "Education, talents, and career opportunities. All
  in one place." with a search bar and a category filter dropdown.
- **Key UI:** Search input + Search button; "All Categories" filter select (one real category seen:
  "اللغه العربيه" = Arabic language); results grid empty in this capture.
- **Pay/currency:** none.
- **Workflow:** search/filter only — no mutating actions.

### 7. `student-profile` (route `student/profile`, discovered via header "My Profile" link)
- **Evidence:** `screenshots/student-profile-full.png`, `pages/student-profile.md`
- **What it is:** **BROKEN — a legacy 500 "Server Error"** page ("Something went wrong, try again
  later") with one "Go Back to Home" CTA. The read-only profile VIEW route is non-functional in the
  captured legacy build; only `profile-edit` (below) works.
- **Pay/currency:** none (error page).

### 8. `student-profile-edit` (route `student/profile-edit`)
- **Evidence:** `screenshots/student-profile-edit-full.png`,
  `screenshots/student-profile-edit-001-page-interaction-001.png`, `pages/student-profile-edit.md`
- **What it is:** Guardian account profile editor — two stacked panels: (a) avatar
  upload/reset + First Name ("الطالبة لمار") / Last Name ("حسن") / E-mail
  ("alaashapan1996") + "Save changes"; (b) "Change Password" panel (Old/New/Confirm Password +
  "Save changes").
- **Forms:** `POST /student/profile-edit` (name/email/avatar), `POST /student/update-password`
  (password change), plus hidden logout form.
- **Workflow:** account-settings edit — real mutating actions (Save changes ×2), the only true CRUD
  surface in this role's capture set.
- **Pay/currency:** none.
- **Note:** the pre-filled "First Name" value is literally "الطالبة لمار" (**"the student Lamar"**
  — includes the Arabic word for "student" baked into the name field), an artifact of how the
  legacy fixture account was seeded, not a real UX pattern to replicate.

### 9. `student-request-trial` (route `student/request-trial`, discovered via "Request Trial" link)
- **Evidence:** `screenshots/student-request-trial-full.png`,
  `screenshots/student-request-trial-001-page-interaction-001.png`,
  `pages/student-request-trial.md`
- **What it is:** A 2-step wizard ("Student Details" → "Trial Info") for booking a trial class.
- **Key UI, step 1 ("Student Details"):** radio choice **"Create New Child"** vs **"Choose Existing
  Child"** (radio name `request_type`), then Name/Age text fields, Language select (11 languages
  incl. Arabic/English/French/German/Italian/Portuguese/Russian/Spanish/Turkish/Urdu), Gender select
  (Male/Female). Step 2 (not screenshotted, per markdown): Choose Date/Time/Duration/Course select
  for the trial slot.
- **CRITICAL role evidence:** the explicit **"Choose Existing Child"** option (with a `student_id`
  select populated with "منار حسن" per the markdown Cards/KPIs summary) proves the account manages
  **multiple children** and can add new ones — this is unambiguously a guardian/family account
  capability, not a single student's self-service page.
- **Pay/currency:** none — trial requests carry no cost figure.
- **Workflow:** `POST /student/request-trial`, a genuine multi-step form-submission workflow
  (Previous/Next/Submit).

### 10. `student-student-history-fillter-2` (route `student/student-history-fillter?2`, "Classes Summary")
- **Evidence:** `screenshots/student-student-history-fillter-2-full.png`,
  `screenshots/student-student-history-fillter-2-001-page-interaction-001.png`,
  `pages/student-student-history-fillter-2.md`
- **What it is:** "History of : All Student" — a class-history report filterable **by child**.
- **CRITICAL role evidence:** the "Select Student" dropdown shows **"منار حسن" (Manar Hassan)** — a
  **DIFFERENT child name** than "لمار حسن" (Lamar Hassan) shown on the Home/Billing/Profile-Edit
  pages for the same logged-in session. This is direct, unambiguous proof that **one guardian
  account manages multiple named children** (at minimum Lamar Hassan and Manar Hassan appear across
  this account's pages), confirming the "manages MULTIPLE students" mission requirement.
- **Key UI:** table columns Class Date & Time / Teacher Name / Show (empty), "Submit" button to
  re-filter. Two "Student Details" modals documented in the markdown (Modal 2/3) with Class
  Remark/Class Summary/Homework/Note/Files/Teacher/Student fields — a per-class detail drill-down
  dialog (view-only, "Close" button).
- **Pay/currency:** none.

### 11. `student-studentslist` (route `student/studentslist`, sidebar label "Courses")
- **Evidence:** `screenshots/student-studentslist-full.png`,
  `screenshots/student-studentslist-001-page-interaction-001.png`, `pages/student-studentslist.md`
- **What it is:** **"All Account Subscriptions"** — literally named as an account-level (not
  single-student) subscription list.
- **CRITICAL role evidence:** the page title itself — "All Account Subscriptions" — plus a
  "student" filter chip/select confirms multiple students are selectable per account. Table columns:
  **#, Student Name, Status, Teacher Name, Course Name, Subscription, History, Feedback About
  Course** — a per-child, per-course roster row structure (empty here: "not have any courses"
  badge).
- **Forms:** a hidden "Feedback about your teacher" modal form (`POST /student/feedback`) with
  rating/interactivity/see-hear select + like_teacher/complain/additional_comment textareas —
  student-authored per-class teacher feedback (distinct from the guardian-level "Student Feedback"
  meeting log at #5).
- **Pay/currency:** none in this table (no Amount column here — subscription STATUS only, not
  price).

### 12. `student-timetable` (route `student/timetable`, sidebar "Schedule")
- **Evidence:** `screenshots/student-timetable-full.png`,
  `screenshots/student-timetable-001-page-interaction-001.png`, `pages/student-timetable.md`
- **What it is:** A weekly timetable grid, columns **# | Saturday | Sunday | Monday | Tuesday |
  Wednesday | Thursday | Friday** (Saturday highlighted/selected in gold), 0 data rows in this
  capture.
- **Pay/currency:** none.

### 13. `student-today-sessions` (route `student/today-sessions`, discovered via "Show More" link)
- **Evidence:** `screenshots/student-today-sessions-full.png`,
  `screenshots/student-today-sessions-001-page-interaction-001.png`,
  `pages/student-today-sessions.md`
- **What it is:** "Today's Classes" — date-filtered live-session list + session action modals.
- **Key UI:** Date search filter (prefilled "2026-06-20") + Search; table columns **Class Date,
  Class Time, Student Name, Teacher Name, Course Name, Subscription, Class Status, History, Files**
  (0 rows in capture). Three modals documented in markdown (not separately screenshotted, page had
  no active sessions to trigger them): **"Request Cancel"** (Reschedule Class vs "No Reschedule"
  radio + new date/time picker, Close/Send), **"Upload File:"** (file chooser + voice recording
  Start/00:00 timer, Close/Upload).
- **Forms:** `POST` reschedule/cancel form (`cancel_form__request`), `POST /student/upload-files`
  (homework/session file + voice-note upload).
- **Workflow:** the richest real-time workflow of the role — join/cancel/reschedule a live session,
  upload homework files or a voice note tied to `session_id`.
- **Pay/currency:** none.

## Cross-page role-model evidence summary (multi-child guardian proof)

| Evidence | Source |
|---|---|
| Child name "لمار حسن" (Lamar Hassan) shown as the active/default profile on Home, Billing sidebar-active state, Profile-Edit form fields | `student-home-full.png`, `student-billing-full.png`, `student-profile-edit-full.png` |
| Different child name "منار حسن" (Manar Hassan) selectable in the "Select Student" dropdown on the class-history page for the SAME session | `student-student-history-fillter-2-full.png` |
| Sidebar item literally labelled "Courses" but page titled **"All Account Subscriptions"**, with a student-filter chip | `student-studentslist-full.png`, `pages/student-studentslist.md` |
| Request Trial wizard offers explicit **"Create New Child"** vs **"Choose Existing Child"** radio choice, with a populated `student_id` select | `student-request-trial-full.png`, `pages/student-request-trial.md` |
| "Student Feedback" meeting log has a **"Family Members"** column (not "Student Name") | `student-feedbacks-full.png`, `pages/student-feedbacks.md` |

These five independent pieces of evidence jointly and unambiguously confirm this `/student/*`
legacy login is architecturally a **Family/Guardian account that manages a roster of ≥2 children**
(at least Lamar Hassan + Manar Hassan observed), consistent with Spec 021 DEC-001 (no standalone
Student role; family owns the child journey).

## Pay/currency figures in legacy (explicit accounting)

- **Billing page (`student-billing`)** is the only page with a schema-level currency slot: its
  table has an explicit **"Amount"** column (empty in this capture, but structurally present) —
  this is the ONE place legacy would show a real dollar/price figure per invoice.
- Every other page (home, studentslist/subscriptions, timetable, today-sessions) uses
  **hour-quota** language only (Total/Remaining/Taken Hours, "0/0 H", "0 H") — no currency symbols
  anywhere in the 27 captured screenshots.
- **No screenshot in this set shows an actual non-zero dollar figure** — the captured fixture
  account (`لمار حسن` / `منار حسن`) has empty billing/course data throughout, so we cannot confirm
  what a populated invoice row's "Amount" cell would literally render (e.g. "$40.00" vs a masked
  value), only that the column schema supports it.
- This matches and is fully consistent with the binding law that the current family rebuild is
  **zero-pay, status-first, hour-quota-based** — legacy's Amount column is a **declared, deliberate
  exclusion**, not a coverage gap.

## Risks, gaps, and proposed corrections

1. **`student-profile` (view route) is legacy-broken (500 Server Error)** — evidenced by
   `student-profile-full.png`. There is no working legacy reference screenshot for a populated
   read-only profile view; only the edit form (`student-profile-edit`) renders. Any Spec 023
   capability-coverage claim for a "profile view" page should note the source was non-functional in
   the crawl, not assume a rich view existed.
2. **All roster/billing/subscription tables were captured empty** (fixture account with zero
   courses/invoices/feedback) — this audit can confirm column SCHEMAS (e.g. Billing's "Amount"
   column, Feedback's "Family Members" column) but cannot visually confirm real populated-row
   rendering (e.g. status chip colors, actual per-child rows side by side). A gap for future visual
   parity checks: no populated multi-child roster screenshot exists anywhere in this legacy capture
   set to compare against the rebuilt `family-children`/`family-child` pages' populated states.
3. **Two child names appear (Lamar Hassan, Manar Hassan) but no page shows both simultaneously in
   one list** — the studentslist/subscriptions table was captured with 0 rows, so legacy's actual
   "multiple children side-by-side" UI treatment (cards? table rows? tabs?) is NOT visually provable
   from this evidence; only the existence of a multi-child capability is provable (via the separate
   selects/labels noted above). Downstream specs should not claim a specific rebuilt roster-card
   layout is a "pixel match" to legacy since legacy's populated roster view was never captured.
4. **No exclusion/violation found**: the current zero-pay, status-first billing law is a correct,
   deliberate, and well-evidenced reclassification of legacy's Amount-bearing billing table — not an
   accidental omission. No correction needed there.
5. **No fake/href="#" actions observed** in this role's legacy captures — all buttons/links resolve
   to real routes or real (if broken) endpoints; this is a legacy reference set, not a rebuild
   artifact, so the honesty-contract laws don't directly apply to it, but no conflicting pattern was
   found that would justify copying anything unsafe.

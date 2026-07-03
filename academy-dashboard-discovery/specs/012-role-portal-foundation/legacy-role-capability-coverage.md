# Legacy Role Capability Coverage (Spec 012)

**Status**: Binding · Zero silent future-role gaps · Formalizes research **D9** seed map · Satisfies **FR-007 / FR-008**, **US7**, **SC-006**, contract `contracts/legacy-role-capability-coverage-contract.md`, data-model §6.

This artifact classifies **every** legacy teacher-portal (26 pages / 22 route templates) and legacy guardian-operated family-portal (13 pages / 11 route templates) capability under the seven-way scheme, giving each an explicit destination and a one-line rationale. Spec 012 ships only the three portal **foundations**; this document is the itemized bridge to Specs 013 (Student), 014 (Family/Guardian), and 015 (Teacher). No legacy private wording or status code is reused as a new-system label; pay vocabulary appears here **only** as classification metadata and is never proposed as portal UI.

## Grounding sources *(every row is grounded in these captures — read this session, not memory)*

- **Teacher portal captures** — `academy-dashboard-discovery/output/roles/teacher/role-map.md` (26 pages visited, 0 failed) + `academy-dashboard-discovery/output/roles/teacher/pages/*.md`. Load-bearing page records read: `teacher-home.md`, `teacher-session-class-room-mq-2.md`, `teacher-studentslist.md`, `teacher-salary.md`, `teacher-salary-class-report.md`, `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student.md`, `teacher-timetable.md`, `teacher-course-history-1.md`, `teacher-tickets.md` (plus `teacher-chat.md`, `teacher-library.md`, `teacher-monthly-plans*.md`, `teacher-students.md`, `teacher-profile*.md`, `teacher-teacher-history*.md`, `teacher-course-history-*-class.md`, `management-student-1.md`, `*main-index-html.md`).
- **Family/Guardian portal captures** — `academy-dashboard-discovery/output/roles/family/role-map.md` (13 pages visited, 0 failed) + `academy-dashboard-discovery/output/roles/family/pages/*.md`. Load-bearing page records read: `student-home.md`, `student-today-sessions.md`, `student-billing.md`, `student-request-trial.md`, `student-studentslist.md`, `student-student-history-fillter-2.md`, `student-feedbacks.md` (plus `student-timetable.md`, `student-library.md`, `student-profile*.md`, `main-index-html.md`).
- **Template folding + page flags** — `academy-dashboard-discovery/frontend-planning-deep/08-role-page-inventory-v2.md` (teacher = 22 templates, family = 11 templates; HTTP 404/500 flags).
- **IA opinions (card-first, mobile-first, single row-action, real empty states)** — `academy-dashboard-discovery/frontend-planning-deep/13-improved-information-architecture-v2.md`.
- **Binding seed classifications + Foundation Composition** — `academy-dashboard-discovery/specs/012-role-portal-foundation/research.md` §D9, `spec.md` ("Foundation Composition").

**Classification scheme (exactly one primary per row):** `foundation-only` (previewed by a Spec 012 portal section) · `planned-013` · `planned-014` · `planned-015` · `backendRequired` · `future-role-deep` (portal-layer but beyond 013–015 scoping) · `intentionally excluded` (reason mandatory).

---

## 1. Teacher portal — capability coverage (all 22 templates / 26 pages)

Legacy persona in the captures is a guardian-agnostic teacher account; Spec 012's teacher portal binds persona **`sara`** (fixture teacher). Every "What it did" cell is a neutral paraphrase — no proprietary copy.

| # | Capability | Legacy route(s) | What it did (1 line) | Classification | Destination | Rationale (1 line) |
|---|---|---|---|---|---|---|
| T1 | Home dashboard: hours strip + today's classes | `/management/home` → `/teacher/home` | Landing with total/remaining/taken-hours + attended-% tiles and a today's-classes list | foundation-only | Spec 012 teacher portal welcome + today's-schedule sections | The calm today-first strip is exactly what the foundation previews (fixture sessions), minus the pay hero. |
| T2 | Home earnings hero tile | `/teacher/home` | Prominent estimated / fine / bonus running-total hero at the top of home | backendRequired | Backend payroll/compensation service — never surfaced in any portal with figures | FR-006/SC-005: the #1 thing not carried over; pay stays figure-free in portals. |
| T3 | End-of-session recording workflow | `/teacher/home`, `/teacher/session-class-room/{enc}/{id}` (`classes-end`) | Modal to log a rating remark + summary + homework + notes + file attachment | planned-015 | Spec 015 teacher deep dashboard (end-class flow) | Real session-outcome authoring; foundation only previews how it will feel (see T22). |
| T4 | Mark class absent | `/teacher/home` (`classes-absent`) | Modal to record an absence with a reason note + video/file attach | planned-015 | Spec 015 teacher deep dashboard (attendance actions) | Absence recording is a write action; out of foundation scope, no engine now. |
| T5 | Request-cancel / reschedule class | `/teacher/home` (`edit-class`, cancel request) | Modal to reschedule, auto-make-up, or edit a session time with optional notify | planned-015 | Spec 015 teacher deep dashboard (schedule actions) | Schedule mutation; foundation shows schedule read-only. |
| T6 | "Live room" surface | `/teacher/session-class-room/{enc}/{id}` | Page that merely re-renders the home dashboard — no actual classroom | intentionally excluded | Not rebuilt as-is | The captured "room" is a re-rendered home with no real classroom; excluded to avoid cloning a fake surface. |
| T7 | Real live classroom (join/host) | — (no legacy equivalent; only the fake T6 existed) | A genuine video classroom the fake room pretended to be | backendRequired | Backend live-session / video integration | Requires real conferencing infra; the next-session preview stays an honest demo, never a fake join. |
| T8 | My-students roster | `/teacher/studentslist` | Roster table with per-student history / schedule / report / plan / certificate actions | planned-015 | Spec 015 teacher deep dashboard (students) | Deep roster + row actions; the read-only my-students summary slice is the foundation-only preview. |
| T9 | Monthly report rubric | `/teacher/studentslist` (`student-progress`) | Structured monthly rubric: achievements + learning-progress + focus + homework + punctuality | planned-015 | Spec 015 teacher deep dashboard (monthly reports) | Structured authored report; also the anchor for the net-new student progress preview (see §3). |
| T10 | Certificate request | `/teacher/studentslist` (`certificate-request`) | Modal to request a student certificate routed to admin approval | planned-015 | Spec 015 teacher deep dashboard (certificates) | Request-and-approval flow; no submission engine in foundation. |
| T11 | Monthly learning plans | `/teacher/monthly-plans`, `/teacher/monthly-plans/{enc}/show` | Author / view a per-student monthly plan (objectives, support notes) | planned-015 | Spec 015 teacher deep dashboard (plans) | Planning authoring surface; two captured pages (author + view) consolidate to one. |
| T12 | Thin duplicate roster | `/teacher/students` | A second, sparser student roster overlapping the main list | intentionally excluded | Consolidated into the T8 roster | Weak duplicate of `studentslist`; one clean roster replaces both. |
| T13 | Chat / messaging | `/teacher/chat` | One-to-one messaging thread surface | backendRequired | Backend messaging service | Real-time messaging needs a backend; no chat engine in any spec's foundation. |
| T14 | Timetable + availability editor | `/teacher/timetable` | Weekly grid plus add / edit / delete availability-slot modals | planned-015 | Spec 015 teacher deep dashboard (schedule + availability) | Availability editing mutates schedule; foundation previews schedule read-only. |
| T15 | Materials library | `/teacher/library` | Read-only browse of shared teaching materials | planned-015 | Spec 015 teacher portal (library surface) | Shared read-only browse concept (also owned per-portal by 013/014); teacher surface is 015's. |
| T16 | Tasks (empty KPI shell) | `/teacher/tickets` | Total/completed/pending/overdue tiles (all zero) + empty staff-members table | intentionally excluded | Not a portal surface; concept already covered by the admin planned tasks item | Thin/empty shell with no data; the task concept lives in the admin console, not a teacher portal. |
| T17 | Salary breakdown ledger | `/teacher/salary` | Multi-column per-line pay breakdown (fixed / fine / gift / hour-rate / total) | backendRequired | Backend payroll/compensation service — no portal figures | Pay surface; classified for a future backend, never previewed with numbers. |
| T18 | Salary class report | `/teacher/salary-class-report` | Date-range → per-class / per-session compensation report | backendRequired | Backend payroll/compensation service — no portal figures | Pay-report surface; figure-free in portals. |
| T19 | Per-student pay result | `/teacher/update-result?date_range=…&filter=…` | The salary-class-report result rendered by student for a date range | backendRequired | Backend payroll/compensation service — no portal figures | Same pay lineage as T18; excluded from portal UI with figures. |
| T20 | Session / course history | `/teacher/course-history/{id}`, `/teacher/course-history/{id}/class` (×2 variants) | Per-student class-history list with per-session detail modals | planned-015 | Spec 015 teacher deep dashboard (history) | Consolidated single history; the duplicate course-history route family is noted, not preserved. |
| T21 | Teacher history (duplicate family) | `/teacher/teacher-history/{id}`, `/teacher/teacher-history/1-` | A parallel history route family duplicating T20 | planned-015 | Merged into the T20 single history | Duplicate route family; one consolidated history replaces both. |
| T22 | Outcome-workflow preview | (derived from T3/T4) | A display-only glimpse of how end-of-session recording will feel | foundation-only | Spec 012 teacher portal attendance/outcome-workflow section | Foundation shows the workflow shape (no writes); the real flow is T3/T4 → Spec 015. |
| T23 | Profile / account edit | `/teacher/profile-edit` | Edit account details (name, contact, password) | planned-015 | Spec 015 teacher portal (account) | Account management concept; the working edit page is the rebuild basis (see T24). |
| T24 | Profile view (broken) | `/teacher/profile` | Server error page (HTTP 500) — never rendered content | intentionally excluded | Account view rebuilt from the T23 edit surface | Broken route; the account view is reconstructed from `profile-edit`, not the 500. |
| T25 | "Dashboard 1" dead index | `/main/index.html`, `/teacher/main/index.html`, `/teacher/monthly-plans/main/index.html`, `/teacher/course-history/main/index.html` | Sidebar "Dashboard 1" link resolving to error pages (HTTP 404) | intentionally excluded | Dropped entirely | Dead links (four 404 variants); no destination to carry over. |
| T26 | Admin student profile via pay link | `/management/student/{id}` | The admin student profile reached by following a teacher pay link | intentionally excluded | Not a teacher-portal surface — it is the admin page owned by Spec 009 | An admin console page leaked into the teacher crawl; belongs to admin, not a portal. |
| T27 | Dual notification badge bug | (global chrome, all pages) | Two conflicting unread-count badges rendered in the header | intentionally excluded | Not carried over | Cosmetic legacy defect; the rebuilt header shows one honest badge. |

**Teacher page coverage:** all 26 captured pages resolve — P1/P2 home→T1 (T2–T5 derive from `teacher-home`); chat→T13; timetable→T14; studentslist→T8 (T9/T10 derive); library→T15; tickets→T16; students→T12; salary→T17; salary-class-report→T18; the two `main-index` 404s + two nested `main/index` 404s→T25; monthly-plans + mq/show→T11; profile-edit→T23; profile(500)→T24; update-result→T19; course-history-1 + two `/class` variants→T20; session-class-room→T6; the two teacher-history variants→T21; management-student-1→T26. Rows T7/T22/T27 are capabilities without a distinct captured page.

**Teacher tally (27 rows):** foundation-only 2 · planned-013 0 · planned-014 0 · planned-015 12 · backendRequired 6 · future-role-deep 0 · intentionally excluded 7.

---

## 2. Family / Guardian portal — capability coverage (all 11 templates / 13 pages)

Legacy had **one guardian-operated portal at `/student/*` with no separate student login** (the guardian proxies each child via a "choose child" selector). Spec 012 binds persona **`fam1`** (guardian «أبو سلمان الغامدي», children `st1/st6/st11/st12/st13`); the student child `st1` owns the separate student portal. See §3 for the deliberate split.

| # | Capability | Legacy route(s) | What it did (1 line) | Classification | Destination | Rationale (1 line) |
|---|---|---|---|---|---|---|
| F1 | Guardian home widgets | `/management/home` → `/student/home` | Hours tiles + a time-spent gauge + today's-classes panel + a "your teachers" panel | foundation-only | Spec 012 family portal welcome / today / progress-preview sections | The calm home widgets are the foundation preview; the gauge anchors the student progress preview (§3). |
| F2 | Multi-child overview / child switcher | (guardian "choose child" proxy across `/student/*`) | Guardian selects among their children to scope every view | foundation-only | Spec 012 family portal children-overview section (multi-child cards) | The multi-child pattern is real and previewed from day one as friendly child cards (not a fake control). |
| F3 | Today's sessions + request-cancel | `/student/today-sessions` | Today's sessions list with a request-cancel (reschedule / no-reschedule) modal and show-more | planned-014 | Spec 014 family deep dashboard (today's sessions) | Cancellation is a guardian write action; foundation previews the list read-only. |
| F4 | File / voice upload to a session | `/student/today-sessions` (`upload-files`) | Modal to attach a file or record a voice note against a session | backendRequired | Backend upload / media service | Real uploads need storage/backend; absent from foundation entirely. |
| F5 | Student timetable | `/student/timetable` | Weekly schedule grid for the selected child | planned-013 | Spec 013 student deep dashboard (timetable); a guardian view is Spec 014 | Timetable browsing is student-facing first; the family-side view is 014's. |
| F6 | Class history + per-session details | `/student/student-history-fillter?…` | History list plus a per-session details modal (remark / summary / homework / note / files) | planned-013 | Spec 013 student history; guardian history view → Spec 014; teacher-notes preview slice → foundation-only (F16) | The per-session notes are student-facing; the guardian sees a mirrored view; the read-only notes preview ships now. |
| F7 | Subscriptions / plans | `/student/studentslist` | "All account subscriptions" list of the family's enrolments by child | planned-014 | Spec 014 family deep dashboard (subscriptions / plans) | Account-level subscription view is a guardian concern. |
| F8 | Feedback-about-teacher rubric | `/student/studentslist` (`feedback`) | Modal rubric rating the teacher (see/hear, likes, complaints, comment) | planned-014 | Spec 014 family deep dashboard (teacher feedback) | Structured guardian feedback authoring; no submission engine in foundation. |
| F9 | Billing ledger (view-only) | `/student/billing` | Read-only invoices table (serial / month / due / course / amount / status) — no pay flow | backendRequired | Backend billing portal — no portal figures; the Spec 009 fixture finance shell already covers the admin-side demo | Real billing needs a backend; foundation surfaces billing only as an honest planned/backendRequired card. |
| F10 | Feedback / meetings | `/student/feedbacks` | Meetings table (date / time / manager / members) — empty in capture | planned-014 | Spec 014 family deep dashboard (meetings) | Meeting scheduling is a guardian surface; deferred with an honest empty-state. |
| F11 | Request-trial wizard | `/student/request-trial` | Two-step wizard: new-vs-existing child, then trial date/time/duration/course | planned-014 | Spec 014 family deep dashboard (request a trial) | Multi-step guardian request flow; no request engine in foundation. |
| F12 | Materials library | `/student/library` | Read-only browse of shared materials | planned-013 | Spec 013 student library; a family view is Spec 014 | Shared read-only browse concept, student surface first; family surface is 014's. |
| F13 | Profile / account edit | `/student/profile-edit` | Edit guardian account details | planned-014 | Spec 014 family portal (account) | Guardian account management; the working edit page is the rebuild basis (see F14). |
| F14 | Profile view (broken) | `/student/profile` | Server error page (HTTP 500) — never rendered content | intentionally excluded | Account view rebuilt from the F13 edit surface | Broken route; account view reconstructed from `profile-edit`, not the 500. |
| F15 | "Dashboard 1" dead index | `/main/index.html` | Sidebar "Dashboard 1" link resolving to an error page (HTTP 404) | intentionally excluded | Dropped entirely | Dead link; no destination to carry over. |
| F16 | Teacher-notes preview | (derived from F6) | A display-only glimpse of the latest per-session teacher summary / homework note | foundation-only | Spec 012 family portal teacher-notes section | Anchored in the F6 per-session details; read-only preview ships in the foundation. |
| F17 | Dual notification badge bug | (global chrome, all pages) | Two conflicting unread-count badges in the header | intentionally excluded | Not carried over | Cosmetic legacy defect; the rebuilt header shows one honest badge. |

**Family page coverage:** all 13 captured pages resolve — P1/P2 home→F1 (F2 derives from the guardian proxy; gauge anchors the progress preview); timetable→F5; student-history-fillter→F6 (F16 derives); studentslist→F7 (F8 derives); billing→F9; feedbacks→F10; library→F12; main-index(404)→F15; profile-edit→F13; profile(500)→F14; request-trial→F11; today-sessions→F3 (F4 derives). Rows F2/F16/F17 are capabilities without a distinct captured page.

**Family tally (17 rows):** foundation-only 3 · planned-013 3 · planned-014 6 · planned-015 0 · backendRequired 2 · future-role-deep 0 · intentionally excluded 3.

---

## 3. Net-new value (no legacy equivalent) + the deliberate portal split

**Gamification is absent from the legacy captures.** No achievements, badges, points, leaderboard, streaks, or ranked progress appear anywhere in either role's 39 pages. The student portal's **achievements preview** and **progress preview** are therefore **net-new value**, introduced by Spec 012 and owned deep by Spec 013 — and they are anchored **only** in three real legacy signals, so they never fabricate a metric:

- the family home **time-spent hours gauge** (`/student/home`) — anchors the visual progress preview (display-only, no computed score);
- the teacher **monthly report rubric** (`/teacher/studentslist` `student-progress`: learning-progress / focus / homework / punctuality) — anchors what "progress" and "achievements" describe;
- the per-session **summary + homework notes** (`/student/student-history-fillter`, `/teacher/home` end-class) — anchors the "recent wins / teacher said" moments.

The **leaderboard** card is honestly labeled net-new/planned (Spec 013) with **no legacy source** — presented as a planned availability card, never as fabricated rankings.

**The guardian-proxied single portal is deliberately split into two portals.** Legacy shipped exactly one non-teacher portal — the guardian-operated `/student/*` surface with **no separate student login** — where the guardian proxied every child action. Spec 012 splits this into:

- a **Student portal** (`student-portal.html`, deep experience = **Spec 013**) — a fun, encouraging, learner-facing surface (today, my courses, progress, achievements); and
- a **Family / Guardian portal** (`family-portal.html`, deep experience = **Spec 014**) — a calm, trustworthy, multi-child guardian surface (children, sessions, notes, billing, subscriptions).

This is a product **improvement**, not a legacy clone: it separates the child's motivational experience from the guardian's management experience, each with its own tone and persona (`st1` vs `fam1`). The legacy `FUTURE_ROLE` note that "the student experience lives under the family portal" is thereby superseded (its wording is updated in `nav.config.js`, the one sanctioned register edit).

---

## 4. Spec 013 / 014 / 015 ownership boundaries (itemized, non-overlapping)

Each future spec owns a distinct capability set. Foundation-only rows are previews shipped by Spec 012 and are **not** re-listed here; `backendRequired` and `intentionally excluded` items are cross-cutting and listed in §5, not owned by a single future spec. The shared **read-only library browse** is a reusable component surfaced once per portal (student surface = 013, family surface = 014, teacher surface = 015).

**Spec 013 — Student portal (deep):**
1. Student deep home / today's-learning experience (beyond the foundation welcome/today).
2. Student-facing timetable browsing (from `/student/timetable`).
3. Student class-history browsing + per-session details, student view (from `/student/student-history-fillter`).
4. Student progress visualization, deep (anchored in the hours gauge — display-only, no computed scoring).
5. Achievements experience, deep (net-new; anchored in monthly rubric + session notes).
6. Leaderboard (net-new; no legacy source — honest, non-fabricated).
7. Homework / tasks student surface (net-new; honest planned card in the foundation).
8. Student materials library surface (shared read-only browse).
9. Student-facing account/profile view slice.

**Spec 014 — Family / Guardian portal (deep):**
1. Guardian deep home + multi-child management (beyond the foundation children overview).
2. Today's sessions + request-cancel / reschedule (from `/student/today-sessions`).
3. Guardian history + teacher-notes view (guardian slice of `/student/student-history-fillter`).
4. Subscriptions / plans view (from `/student/studentslist`).
5. Feedback-about-teacher rubric (from `/student/studentslist`).
6. Feedback / meetings scheduling (from `/student/feedbacks`).
7. Request-trial wizard, new-vs-existing child (from `/student/request-trial`).
8. Family-side timetable view (guardian slice of `/student/timetable`).
9. Family materials library surface (shared read-only browse).
10. Guardian account/profile management (from `/student/profile-edit`).

**Spec 015 — Teacher portal (deep):**
1. Teacher deep home dashboard (beyond the foundation today/welcome).
2. End-of-session recording workflow (remark / summary / homework / notes / attach) (from `classes-end`).
3. Mark-absent + request-cancel / edit-class / reschedule / make-up (from `classes-absent`, `edit-class`).
4. Timetable + availability editor (from `/teacher/timetable`).
5. My-students deep roster (from `/teacher/studentslist`).
6. Monthly report rubric (from `student-progress`) + monthly learning plans (from `/teacher/monthly-plans`).
7. Certificate requests (from `certificate-request`).
8. Consolidated session history — single surface merging the duplicate course-history + teacher-history families.
9. Teacher materials library surface (shared read-only browse).
10. Teacher account/profile management (from `/teacher/profile-edit`).

---

## 5. Cross-cutting: backendRequired and intentionally excluded (not owned by a single future spec)

**backendRequired** (deferred to real backend services; never previewed in any portal with figures or fake behavior): teacher pay surfaces — home earnings hero (T2), salary ledger (T17), salary class report (T18), per-student pay result (T19); chat/messaging (T13); real live classroom / video (T7); file / voice uploads (F4); the family billing portal (F9, with the Spec 009 fixture finance shell already covering the admin-side demo).

**intentionally excluded** (with reasons): both `/profile` HTTP 500 routes (T24, F14) — broken, account view rebuilt from `profile-edit`; all "Dashboard 1" `main/index.html` HTTP 404 links (T25, F15) — dead; the fake "live room" (T6) — re-renders home, no real classroom (the genuine classroom is T7, backendRequired); the thin duplicate `/teacher/students` roster (T12) — consolidated into T8; the empty `/teacher/tickets` tasks shell (T16) — thin/empty, concept covered by the admin planned tasks item; the admin `/management/student/{id}` page reached via a teacher pay link (T26) — an admin console surface owned by Spec 009, not a portal; the dual notification-badge bug (T27, F17) — cosmetic defect not carried over.

---

## 6. Sign-off checklist

> The boxes below are checked at **implementation completion** (post-build, post-screenshot review), matching the Spec 010/011 sign-off discipline. They are intentionally left unchecked in this authored artifact.

- [x] **All classified** — all 39 legacy portal pages (26 teacher + 13 family) resolve to exactly one classified row with a destination and a one-line rationale (page-coverage maps in §1 and §2).
- [x] **Exclusions justified** — every `intentionally excluded` row carries an explicit reason (§1, §2, §5).
- [x] **Pay never previewed** — all pay/earnings/salary surfaces (T2, T17, T18, T19) are classified `backendRequired` and are never surfaced in any portal with figures (FR-006 / SC-005).
- [x] **Boundaries itemized** — Specs 013 / 014 / 015 each have an itemized, non-overlapping capability set (§4); shared/cross-cutting items are isolated in §5.
- [x] **Net-new recorded** — gamification / achievements / leaderboard / points recorded as absent-in-legacy net-new value, and the guardian-proxied single portal recorded as deliberately split into Student (013) + Family (014) (§3).

**Reviewer:** ______________________  **Date:** ______________

---

## 7. Spec 013 delivery notes (student planned-013 resolution — appended, no row reclassified)

Spec 013 (Student Dashboard) deepens the student portal and resolves the student-owned `planned-013` rows. These are **delivery annotations only** — the §1/§2 classifications, destinations, and rationales above are unchanged; nothing is re-scoped.

| Row / item | Spec 013 delivery |
|---|---|
| **F5** — Student timetable | **Delivered** as the *week-at-a-glance* agenda (SAT-first stacked day groups from `SCHEDULE_WEEK`, sara/grp1 proxy; «اليوم» marker; the Friday rest-day empty state). Never a grid/table clone. The guardian-side timetable view remains Spec 014. |
| **F6** — Class history + per-session details | **Delivered** as the *recent-sessions* feedback cards (Class Summary + Homework Note fields; the first card resolves the REAL `SESSION_OUTCOMES.out1` row — st1·math·sara·attended·`data.att.fb.good`; one display-only attachment annotation). The full-history surface remains a labeled `planned` mini-card; the guardian mirror remains Spec 014. |
| **F12** — Materials library | **Delivered** as the *materials* display-only preview (3 authored cards, type icons). Download stays `backendRequired` (F4 unchanged); the family/teacher library surfaces remain 014/015. |
| **§4 item 6** — Leaderboard (net-new) | **Delivered** as *celebration recognition* («نجوم مجموعتي») — unordered, authored, stress-free, demo-labeled. NO computed ranking, points, or per-peer comparison (research D3). |
| **§4 items 1/4/5/7/8/9** | **Delivered** by the corresponding Spec-013 sections: deep today's-learning (1), deep progress visualization + attendance trio (4), deep achievements (5), homework/tasks student surface (7), student materials surface (8), student profile slice (9). |

**Still deferred (unchanged):** uploads (F4) and material downloads → `backendRequired` (visibly gated by the two backendRequired mini-cards); the full-history deep surface → `planned`; all `planned-014` / `planned-015` / other `backendRequired` / `intentionally excluded` rows are untouched. **Zero silent gaps.**

**Spec 013 sign-off:**
- [x] All three student `planned-013` rows (F5, F6, F12) carry delivery notes.
- [x] Every §4 Spec-013 item is delivered (1/4/5/6/7/8/9) — none silently dropped.
- [x] The leaderboard is delivered as honest celebration, not computed ranking.
- [x] Backend-gated capabilities (uploads, downloads, full history) stay visibly labeled, never faked.

**Reviewer:** ______________________  **Date:** ______________

---

## 8. Spec 014 delivery notes (family/guardian dispositions — appended, no row reclassified)

Spec 014 (Family / Guardian Dashboard) deepens the family portal and dispositions every guardian row (F1–F17). These are **delivery annotations only** — the §2 classifications, destinations, and rationales above are unchanged; nothing is re-scoped. Requests are honest previews whose *submission* stays gated (backend / planned-016).

| Row | Spec-014 disposition |
|---|---|
| **F1** guardian home widgets | **Delivered** — deep guardian hero + five-children overview + today band + the attendance trio |
| **F2** multi-child proxy | **Delivered** — everyone-inline five-children overview (capture-verified: legacy had NO global switcher; the switching promise resolves as everyone-visible-at-once; the Spec-012 kidsHint copy is updated to post-014 truth) |
| **F3** today + request-cancel | **Delivered** as honest preview — child-associated today band + the cancel/reschedule preview card with the no-replacement caution; the request *submission* stays gated (backendRequired now; real request flow → planned-016) |
| **F5** timetable (family slice) | **Delivered** — the today band answers the family-side schedule question; the deep student timetable shipped in Spec 013 (§7); no separate family grid (calm > grid, deliberate) |
| **F6** history (guardian mirror) | **Delivered** — child-first recent-sessions cards resolving REAL `out1` (st1 attended + good feedback) and REAL `out15` (st11 absent + support feedback) + one authored record; full history stays a labeled `planned` mini-card |
| **F7** subscriptions / plans | **Delivered** — per-child plan-label rows («الخطة المتقدمة») + status chips; **ZERO amounts** |
| **F8** feedback-about-teacher rubric | **Delivered** as a display-only rubric preview (question lines, no rating-scale visual, no score vocabulary); submit `backendRequired` |
| **F9** billing (view-only) | **Delivered** as a calm STATUS preview (settled chip + reassurance), **ZERO currency figures**, no pay-now; real invoices/payment stay `backendRequired` (capture-verified: legacy itself rendered zero amounts) |
| **F10** feedback / meetings | **Delivered** — the truthful "no meetings scheduled" empty state + a labeled `planned` request-a-meeting mini-card |
| **F11** request-trial / add-child | **Delivered** as a display-only new-vs-existing-child preview; submit `backendRequired` |
| **F12** materials (family slice) | **Delivered** — 3 display-only child-associated cards; download `backendRequired` |
| **F13** account / profile edit | **Delivered** as the account slice (guardian contact / joined / children display-only); editing `backendRequired` |
| **F16** teacher-notes preview | **Delivered** — deepened to 3 child-associated notes (summary/homework shape) |
| **F4** file/voice upload | **UNCHANGED** — `backendRequired`; never rendered as a control (no upload/record affordance exists on the page) |
| **F14** `/profile` 500 · **F15** Dashboard-1 404 · **F17** dual-badge bug | **UNCHANGED** — `intentionally excluded` |

**Real request-submission engines** (cancel / feedback / trial / meeting requests) are deferred to **planned-016** (the Role-Portal Operations / Communications shell) on top of their per-card backendRequired gates. Already-delivered-013 items (the student slices of F5/F6/F12, and the student portal generally) remain under §7 and are untouched.

**Spec 014 sign-off:**
- [x] All 17 guardian rows (F1–F17) carry an explicit Spec-014 disposition — zero silent gaps.
- [x] Billing/subscriptions delivered with ZERO amounts / no pay control (the zero-pay hard line; grep- and smoke-enforced).
- [x] Every request is an honest preview; no fake pay/cancel/upload/voice/feedback submission; the page carries zero form controls.
- [x] The multi-child pattern is everyone-visible-at-once (no fake switcher).
- [x] §§1–7 byte-unchanged; no student/teacher row reclassified.

**Reviewer:** ______________________  **Date:** ______________

## 9. Spec 015 delivery notes (teacher dispositions — appended, no row reclassified)

Spec 015 (Teacher Dashboard) deepens the teacher portal into the one-page daily cockpit and dispositions every teacher row (T1–T27). These are **delivery annotations only** — the §1 classifications, destinations, and rationales above are unchanged; nothing is re-scoped. Every write (outcome save, absence, cancel/reschedule, upload, availability, certificate, profile) stays honestly gated; **the four pay rows never render**.

| Row | Spec-015 disposition |
|---|---|
| **T1** home dashboard | **Delivered** — the deep cockpit hero + today's schedule (authored student counts) + follow-up board, WITHOUT the legacy pay hero (see T2) |
| **T2** home pay hero tile | **UNCHANGED** — `backendRequired`; never rendered, zero figures, zero vocabulary, no route (grep- and smoke-enforced, three layers) |
| **T3** end-of-session recording | **Delivered** as the display-only 5-step workflow preview (attendance · remark · summary · homework note · files — the capture-verified `classes-end` order); the save itself = the labeled `outcomeSave` backendRequired mini-card |
| **T4** mark class absent | **Delivered** as a VISIBLE gated capability (amendment A2) — the calm backendRequired note «تسجيل الغياب يحتاج تفعيل الخادم.» inside the workflow section; no control, no write |
| **T5** request-cancel / reschedule | **Delivered** as a VISIBLE gated capability (amendment A2) — the calm backendRequired note «طلب إلغاء أو تعويض الحصة يحتاج تفعيل الخادم.» inside requests & performance; no control, no write |
| **T6** fake "live room" | **UNCHANGED** — `intentionally excluded` (never cloned) |
| **T7** real live classroom | **UNCHANGED** — `backendRequired`; the next-class card keeps the honest integration note, never a join-styled control |
| **T8** my-students roster | **Delivered** — the 4-card grp1 roster (st1/st6/st11/st13): group/course association, labeled lifecycle chips, authored worded learning notes; display-only, zero links, zero percentages (deep row actions stay out) |
| **T9** monthly report rubric | **Delivered** as the display-only 5-dimension preview (achievements · learning progress · focus · homework completion · punctuality); NO answer scales/rating visual; submit = inline backendRequired chip |
| **T10** certificate request | **Delivered** as the display-only routed-to-management preview (description + date concept lines); submit = inline backendRequired chip |
| **T11** monthly learning plans | **Delivered (folded)** — the planning concept folds into the tasks preview (incl. the prepare-monthly-reports card) + the rubric preview; no separate authoring surface (real authoring stays backend) |
| **T12** duplicate roster | **UNCHANGED** — `intentionally excluded` (consolidated into the one T8 roster) |
| **T13** chat / messaging | **UNCHANGED** — `backendRequired`; surface home refined: the messaging shell arrives with **planned-016** on top of the backend gate (the closing note says so) |
| **T14** timetable + availability | **Delivered** — SAT/MON/TUE day-grouped agenda cards (never a grid) + the TRUTHFUL merged free-days empty state («الأربعاء والخميس — بلا حصص») + the `availabilityEdit` backendRequired mini-card |
| **T15** materials library | **Delivered** — 3 display-only course-associated cards; upload AND download = the `matUpload` backendRequired mini-card |
| **T16** tasks (empty KPI shell) | **UNCHANGED** — `intentionally excluded` as a surface; the authored 3-card tasks preview delivers MORE than the legacy empty shell ever shipped; the full task board = the `taskManage` planned-016 mini-card |
| **T17** pay breakdown ledger | **UNCHANGED** — `backendRequired`; never rendered, no route |
| **T18** pay class report | **UNCHANGED** — `backendRequired`; never rendered, no route |
| **T19** per-student pay result | **UNCHANGED** — `backendRequired`; never rendered, no route |
| **T20** session / course history | **Delivered** — the EXPLICIT recent-sessions history slice (amendment A1): 2 cards resolving REAL `out1` (st1 attended + good feedback) and REAL `out11` (st11 attended) with real outcome chips + homework-note lines, PLUS the workflow preview that produces such records; full history browsing stays out (no route, no modal) |
| **T21** teacher history (duplicate) | **Delivered** — merged into the single T20 slice exactly as §1 planned (one consolidated history, duplicate route family dropped) |
| **T22** outcome-workflow preview | **Delivered** — deepened from the 4-step foundation glimpse to the capture-verified 5-step order with the explicit save gate |
| **T23** profile / account edit | **Delivered** — the account slice (name · subject · labeled status chip · labeled availability chip, display-only); editing = the backendRequired note; sara's numeric `rating`/`util`/`hours`/`sessions` are NEVER rendered |
| **T24** `/profile` 500 | **UNCHANGED** — `intentionally excluded`; the account view derives from the working edit surface's concept, the 500 is not reproduced |
| **T25** Dashboard-1 404s | **UNCHANGED** — `intentionally excluded` |
| **T26** admin page leak | **UNCHANGED** — `intentionally excluded` (admin surface, not a portal one) |
| **T27** dual-badge bug | **UNCHANGED** — `intentionally excluded`; the cockpit hero carries NO notification count at all |

The ONE page-body link remains the sanctioned labeled admin performance card → `teacher-performance(.en).html` (a pay-free KPI board; smoke pins `bodyAnchors === 1` + the exact target). Real messaging/notifications and the full task board are **planned-016**; admin missing modules = Spec 017.

**Spec 015 sign-off:**
- [x] All 27 teacher rows (T1–T27) carry an explicit Spec-015 disposition — zero silent gaps.
- [x] T2/T17/T18/T19 stay backendRequired: zero pay figures, zero pay vocabulary (copy AND comments), zero currency tokens, zero routes — three-layer enforced (source grep · built grep · the byte-verbatim Spec-012 smoke assert).
- [x] T20/T21 delivered through the explicit recent-sessions/history slice + the session-outcome workflow preview.
- [x] T4/T5 visible on the page as honest backendRequired gated notes (non-anchor, zero controls).
- [x] No computed score/rank/rating anywhere; sara's numerics stay display-suppressed.
- [x] The page carries zero form controls and exactly ONE sanctioned body anchor.
- [x] §§1–8 byte-unchanged; no student/family row reclassified.

**Reviewer:** ______________________  **Date:** ______________

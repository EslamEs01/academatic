# Feature Specification: Teacher Dashboard (Spec 015)

**Feature Branch**: `feature/015-teacher-dashboard` *(proposed; branching is user-controlled — spec authored on `feature/012-role-portal-foundation`)*
**Created**: 2026-07-03
**Status**: Draft
**Input**: User description: "/speckit.specify Teacher Dashboard — Spec 015 deepens the Teacher Portal (Spec 012 foundation) into a rich, practical, daily-use teacher cockpit. Owns the Teacher Dashboard only; student (013 done), family (014 done), operations/comms (016), admin missing modules (017), final QA (018) stay out. Organized, calm, today-first, classroom-focused, Arabic-first, premium, mobile-first, not admin-like, not a legacy clone. **Salary/pay surfaces stay completely absent** (backendRequired, zero vocabulary). Capability coverage from the Spec-012 legacy artifact; honesty + admin/student/family/hub protection binding."

## Context & Vision

Spec 012 (commit `5bcf490`) shipped the role-portal foundation; Spec 013 (`86729a9`) deepened the **student** dashboard; Spec 014 (`0d144aa`) deepened the **family** dashboard. The teacher portal foundation (`teacher-portal.html` / `teacher-portal.en.html`, persona **sara** — math teacher, active, balanced workload, strong-delivery signal) today renders: welcome hero · today's-schedule · next-session demo note · my-students · a 4-step outcome-workflow preview · an optional labeled admin teacher-performance link · 2 planned cards (materials / tasks) · Spec-015 note. It is already **pay-token-free** (grep-enforced).

Spec 015 turns that foundation into **the teacher's daily cockpit** — a single organized page that answers, fast: *What classes do I have today? What is my next class? Which students need follow-up? What should I record after class? What materials/tasks do I need? What reports or notes are pending?* It graduates the two planned cards into honest sections and adds the teacher-owned legacy capabilities (student follow-up board, deepened session-outcome workflow preview, timetable/availability, monthly-report rubric, certificates/requests, account slice) — all fixture-authored, honest, engine-free, and — the hard rule — **with zero salary/pay/earnings surface or vocabulary anywhere**.

**Product direction (binding):** organized · calm · fast to use · respectful · comfortable · very easy · creative · human · Arabic-first · premium · mobile-first · today-first · classroom-focused · student-follow-up-focused · card-based · **not admin-like** · not table-heavy · not corporate · **not a legacy clone**. A teacher daily cockpit, never an admin console.

**Series position:** Spec 016 = Role-Portal Operations / Communications shell · Spec 017 = Admin Missing-Modules Coverage · Spec 018 = Final Full-Product QA. Spec 015 must not pre-implement any of their surfaces.

## The Salary/Pay Hard Rule *(critical — carries the project-wide zero-pay spine + FR-006 of Spec 012)*

The legacy teacher portal's most prominent surface was a **salary/earnings hero** on `/teacher/home` plus dedicated pay pages (salary ledger, salary-class-report, per-student pay result). Spec 015 surfaces **none** of it. Teacher compensation stays classified **backendRequired / future finance work**, never rendered, and these tokens must appear in **no visible copy and no source comment** (the standing word-bounded grep, EN + AR): `salary`, `salaries`, `pay`, `payout`, `earnings`, `compensation`, `bonus`, `fine`, `راتب`, `رواتب`, `أجر`, `مستحقات`, `غرامة`, `مكافأة` — plus zero money/currency figures. The Spec-012 smoke teacher pay-token assertion stays green on the deepened page, and Spec 015 adds no way to reach a pay surface.

## Legacy Capability Inheritance *(binding input — no silent gaps)*

From `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` §1 (all 26 teacher pages classified T1–T27), Spec 015 owns the teacher-facing capabilities. Classification for every teacher legacy capability is exactly one of: **delivered-015 · planned-016 · backendRequired · future-role-deep · intentionally-excluded.**

**Delivered by Spec 015 (display-only / honest previews):**
- **T1** home dashboard (hours strip minus the pay hero) → the deep teacher hero + today's-schedule + the follow-up board.
- **T22 / T3** the outcome-workflow preview (derived from the `classes-end` flow) → the deepened session-outcome workflow preview (display-only steps: attendance · remark · summary · homework note · files note).
- **T8** my-students roster → the my-students preview (display-only cards, group/course association).
- **T9** the monthly report rubric (achievements · learning-progress · focus · homework · punctuality) → the monthly-report rubric preview.
- **T11** monthly learning plans → folded into the tasks/report previews (planned).
- **T14** timetable + availability → the timetable/availability preview (agenda cards, not a grid).
- **T15** materials library → the materials preview.
- **T20 / T21** session/course history → the recent-sessions slice within the outcome/history preview.
- **T23** profile/account edit → the account slice (contact/role display-only; editing backendRequired).

**Authoring/request capabilities — honest previews, submit stays gated:**
- **T3/T4/T5** end-class recording · mark-absent · request-cancel/reschedule → display-only workflow preview; every submit/save is a labeled backendRequired/planned control (no real write).
- **T10** certificate request → certificate/request preview; submit backendRequired.
- **T14** availability editing → labeled backendRequired/planned.

**Stays gated / out (unchanged classification):**
- **T2 / T17 / T18 / T19** the salary hero + all pay pages → **backendRequired**, never rendered (the hard rule).
- **T7** real live classroom → **backendRequired** (the next-class affordance is an honest demo note, never a fake join).
- **T13** chat/messaging → **backendRequired** → deepens to **planned-016** (the Communications shell); not rendered as a control.
- **planned-016**: any real request/notification/messaging submission engine.
- **intentionally-excluded**: **T6** the fake "live room" (re-rendered home), **T12** the thin duplicate roster, **T16** the empty tasks shell (concept lives in the admin planned item), **T24** the `/profile` 500, **T25** the Dashboard-1 404s, **T26** the admin student page reached via a pay link, **T27** the dual-badge bug.

**Do NOT copy** legacy visuals/layout/classes/colors/icons/private-wording/broken-routes/numeric-status-codes/dense-tables/weak-patterns/**salary hero**/**old KPI wall**. **Do improve** the teacher daily workflow, today-first schedule, next-class clarity, student follow-up, outcome-recording preview, class-summary/homework notes, materials access, tasks preview, timetable/availability clarity, monthly-report preview, mobile comfort, empty states, microcopy.

**Capture-verified grounding (re-read this session from `output/roles/teacher/` + planning docs, not memory):** the legacy `/teacher/home` led with a **salary hero** — a `Your Salary` card showing `997.00 EGP` + `Estimated:` / `Fines:` / `Bonus` badges, itself a link to the per-student pay report — plus an in-table `(3.00 Fine)` fragment on the class cell; the dedicated pay pages were `/teacher/salary` (13-col ledger: Fixed/Fine/Gift/Hour Rate/Total), `/teacher/salary-class-report`, and the `/teacher/update-result` 23-col pay matrix (all `EGP`). **Every one of these is excluded** and pins the exact token set FR-018 forbids. The capability field lists are capture-verified: the end-class `classes-end` flow = **remark · summary · homework · notes · files** (drives FR-006's outcome steps); the monthly rubric `student-progress` = **achievements · learning-progress · focus · homework-completion · punctuality (+ rescheduled-sessions · additional-support · learning-objectives)** (FR-010); certificate-request = **description · date** (FR-011); availability = from-day/to-day/from-time/to-time/available slots (FR-009). The fake "live room" re-rendered home (incl. the salary hero) — excluded; the anti-patterns to beat are the 13/23-column pay tables and the empty tickets KPI shell.

## Page Strategy *(decided)*

**One strong page.** Spec 015 upgrades the existing `teacher-portal.html` / `.en.html` pair in place — no new teacher pages. Every owned capability fits as a section of one organized cockpit; a single today-first page is the fastest daily tool. Any plan-time page proposal carries the burden of proof (static, bilingual, portal-shell, reachable only from the portal/hub, never admin nav).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Teacher instantly understands today (Priority: P1) 🎯 MVP

As the teacher (sara), I open my dashboard and within one glance I know my classes today, my next class, and who needs follow-up — greeted by name with a calm professional summary and a clear next-action hint.

**Why this priority**: "Today-first" is the cockpit's defining promise; everything supports the teaching day.

**Independent Test**: Open `teacher-portal.html` — hero + today's-schedule + next-class render with sara's fixture truth in an organized order before deep scrolling; the "today/next/follow-up" questions are answerable without reading any table; **zero pay vocabulary**.

**Acceptance Scenarios**:

1. **Given** the Arabic page, **When** it loads, **Then** the hero greets sara by fixture name with a today summary and a next-action hint — no fake notification count, no baked calendar date, and NO pay/salary wording.
2. **Given** the today's-schedule section, **When** classes render, **Then** each card shows time / course / group / room from fixtures with a labeled status chip and (if authored) a student count; no fake live-join control.
3. **Given** an area whose truthful content is empty, **When** it renders, **Then** an encouraging designed empty state appears (never a blank card, never a technical message).

---

### User Story 2 - Next class clear and honest (Priority: P1)

As the teacher, I see my next class prominently (time/course/group/room + what to prepare); any live-session affordance is honestly a backendRequired note, never a working join.

**Independent Test**: The next-class card shows fixture data + a "what to prepare" line; the join affordance is a labeled backendRequired note (never button-styled), in both languages.

**Acceptance Scenarios**:

1. **Given** the next-class card, **When** inspected, **Then** it shows time/course/group/room + a prepare hint, and the live affordance says the real join requires the live-session integration (the legacy "live room" was itself fake — excluded).
2. **Given** both built files, **When** grep-inspected, **Then** no anchor/button simulates a live-join/start-class URL.

---

### User Story 3 - Students and follow-up signals (Priority: P1)

As the teacher, I see which of my students need follow-up (gentle labeled signals from real attendance outcomes) and my full student roster — display-only, no computed risk score.

**Independent Test**: The follow-up board surfaces sara's real follow-up outcome(s) (st11 absence follow-up) as gentle chips; my-students shows sara's roster (st1/st6/st11/st13) with group/course association; nothing is a computed score.

**Acceptance Scenarios**:

1. **Given** the follow-up board, **When** rendered, **Then** it shows students needing follow-up from real outcome fixtures (the st11 studentAbsent+followUp; the teacherAbsent signal) as gentle labeled chips — not an aggressive alarm, not a computed risk number.
2. **Given** the my-students preview, **When** rendered, **Then** sara's students render as display-only cards with group/course association and a labeled learning signal; no fake profile route (or only a real safe existing one).

---

### User Story 4 - Session outcome workflow preview (Priority: P1)

As the teacher, I see how recording a session outcome will work — attendance result · class remark · class summary · homework note · files note — as display-only steps; saving is a labeled backendRequired/planned control, never a fake submit.

**Independent Test**: The workflow preview renders the ordered steps (the legacy `classes-end` fields) display-only; the save/submit affordance is labeled backendRequired; no attendance-save or end-class submit acts.

**Acceptance Scenarios**:

1. **Given** the workflow preview, **When** rendered, **Then** the steps show the F-field shape (attendance/remark/summary/homework/files) as display-only, and the record/save control is a labeled backendRequired affordance — no acting submit, no fake attendance write.
2. **Given** the section, **When** inspected, **Then** there are no `<form>`/`<input>` controls simulating the end-class flow.

---

### User Story 5 - Homework/tasks and materials (Priority: P2)

As the teacher, I see the tasks I need to prepare and homework notes to review, and I browse my course materials — display-only; assign/upload/download are labeled backendRequired.

**Independent Test**: The tasks preview and materials preview render authored display-only cards (or truthful empty states); assign/upload/download appear ONLY as labeled backendRequired affordances.

**Acceptance Scenarios**:

1. **Given** the tasks preview, **When** rendered, **Then** items are display-only authored cards; no fake assign/upload control (the legacy tickets shell was empty — excluded; this is the honest tasks preview).
2. **Given** the materials preview, **When** rendered, **Then** cards are display-only (or real safe local links where they exist); upload/download is a labeled backendRequired gate.

---

### User Story 6 - Timetable and availability (Priority: P2)

As the teacher, I see my weekly schedule and availability as friendly agenda cards (not a dense grid); editing availability is a labeled backendRequired/planned control.

**Independent Test**: The timetable/availability section renders sara's schedule blocks (SAT/MON/TUE) agenda-style, zero tables; the availability-edit affordance is labeled backendRequired/planned.

**Acceptance Scenarios**:

1. **Given** the timetable/availability section, **When** rendered, **Then** sara's schedule blocks render as day-grouped agenda cards (never a grid clone), with the availability-edit affordance labeled backendRequired/planned.

---

### User Story 7 - Monthly report / progress rubric preview (Priority: P2)

As the teacher, I see how the monthly student-progress report works — its rubric dimensions (achievements · learning progress · focus · homework · punctuality) — as a display-only preview; submitting a report is a labeled backendRequired/planned control.

**Independent Test**: The rubric preview lists the dimensions display-only; submit is a labeled backendRequired/planned control; no fake submission.

**Acceptance Scenarios**:

1. **Given** the rubric preview, **When** rendered, **Then** the dimensions render display-only (no rating-scale mockup implying a computed score), and submit is a labeled backendRequired/planned affordance.
2. **Given** the section, **When** present, **Then** the optional labeled admin teacher-performance link (the pay-free KPI board) may be offered as the ONE sanctioned real page-body link — clearly labeled, teacher-appropriate.

---

### User Story 8 - Requests/certificates and profile honestly (Priority: P2)

As the teacher, I see the certificate-request capability and my account slice — display-only; requesting a certificate and editing my account are labeled backendRequired controls; no fake submit/save.

**Independent Test**: The certificate/request preview + account slice render display-only; every submit/save is a labeled backendRequired affordance.

**Acceptance Scenarios**:

1. **Given** the certificate/request preview, **When** rendered, **Then** the capability shows display-only with submit as a labeled backendRequired control.
2. **Given** the account slice, **When** rendered, **Then** the teacher contact/role shows display-only with editing as a labeled backendRequired note; the `/profile` 500 is not reproduced.

---

### User Story 9 - Beautiful on mobile (Priority: P1)

As a teacher often on a phone between classes, the dashboard is a comfortable single-column flow at 390px — no horizontal overflow, touch-friendly, readable Arabic type.

**Independent Test**: 390px screenshot + smoke computed-layout check: no horizontal scroll; sections and cards stack cleanly.

**Acceptance Scenarios**:

1. **Given** the AR page at 390px, **When** captured, **Then** zero horizontal overflow and a clean single-column card flow.

---

### User Story 10 - Bilingual, RTL/LTR, themed, localized digits (Priority: P1)

Arabic RTL default and English LTR both render completely; light/dark/system pass contrast; every number on Arabic pages uses Arabic-Indic digits.

**Independent Test**: Both files load with zero raw i18n keys; smoke digit-locale assertions pass; a11y critical=0 serious=0 on all teacher scenarios including dark.

**Acceptance Scenarios**:

1. **Given** `teacher-portal.html` (AR), **When** scanned, **Then** counters render Arabic-Indic and layout is RTL-correct; the EN page mirrors LTR.
2. **Given** dark mode, **When** audited, **Then** all new teacher surfaces pass with zero critical/serious issues (ink-strength accent-token discipline carried from Specs 012–014; teacher accent = teal).

---

### User Story 11 - Student, family, hub, admin protected (Priority: P1)

Nothing outside the teacher surface changes: all 40 admin files stay content-identical; `student-portal`, `family-portal`, and `portals` built pairs stay byte-identical; no admin nav/body change ever.

**Independent Test**: Hash-compare 40 admin files + student/family/hub pairs vs HEAD (byte-identical); admin-scoped smoke assertions re-run verbatim green; the Spec-013 student and Spec-014 family smoke branches re-run unchanged.

**Acceptance Scenarios**:

1. **Given** the post-015 build, **When** hashed against HEAD, **Then** all 40 admin files AND the student/family/hub built pairs are byte-identical (default; any deviation must be a spec-sanctioned, itemized shared-key/shell change proven unavoidable).
2. **Given** the admin console, **When** crawled, **Then** zero portal references exist in any admin file.

---

### User Story 12 - Legacy teacher capabilities accounted for (Priority: P1)

Every legacy teacher capability (T1–T27) is delivered here or explicitly classified (planned-016, backendRequired, future-role-deep, intentionally-excluded) — no silent gaps; every pay surface stays backendRequired.

**Independent Test**: The coverage artifact gains a Spec-015 delivery-notes section mapping T1–T27 to their 015 disposition; every row accounted for; T2/T17/T18/T19 remain backendRequired.

**Acceptance Scenarios**:

1. **Given** the coverage diff, **When** reviewed, **Then** each teacher row (T1–T27) carries a Spec-015 disposition note preserving its original classification; zero silent gaps.

---

### User Story 13 - Screenshots prove it (Priority: P1)

Visual acceptance proves the dashboard is organized, complete, teacher-friendly, and unmistakably not admin-like — plus unchanged-proof frames for student/family/hub/admin.

**Independent Test**: The Spec-015 screenshot matrix captures with zero console errors and passes the failure-condition review recorded in `screenshots/REVIEW.md`.

**Acceptance Scenarios**:

1. **Given** the captured frames, **When** reviewed against the failure conditions, **Then** every frame passes and the verdict table is recorded.

---

### User Story 14 - Salary/pay surfaces completely absent (Priority: P1)

No salary/pay/earnings figure, control, or word appears anywhere on the teacher dashboard, in either language, including source comments.

**Independent Test**: The word-bounded pay-token grep (EN + AR) over the teacher sources + built pages = zero hits; the Spec-012 teacher pay-token smoke assertion stays green; visual review finds no pay surface.

**Acceptance Scenarios**:

1. **Given** the teacher sources + both built files, **When** grepped for the pay-token set, **Then** zero hits (visible copy AND comments).
2. **Given** the dashboard, **When** reviewed, **Then** there is no salary hero, no pay ledger, no earnings figure, no route to a pay surface.

---

### Edge Cases

- **The pay hard line** — the legacy home led with a salary hero; the deepened hero must be pay-free by construction, and no section may introduce a money figure. This is the sharpest line (SC-005, FR-020).
- **No computed score** — sara's fixture carries a numeric `rating`/`util`; the dashboard must NOT surface them as computed ratings/scores. Only labeled signals (workload flag, follow-up signal) are used.
- **Fake-live trap** — the next-class and the outcome workflow must never look like a working join/start/save; the legacy "live room" was itself fake (excluded).
- **No form controls** — the outcome-workflow, certificate, rubric, and availability previews must be display-only; no `<form>`/`<input>` simulating a real submit/save.
- **Gentle vs aggressive follow-up** — the st11 absence and teacherAbsent signals read as calm "needs follow-up", never a red risk wall or a computed number.
- **Smoke drift from graduating planned cards** — the Spec-012 smoke pins teacher planned-card count = 2; as materials/tasks graduate and availability/report/certificate gates appear, the count/semantics change. The **teacher branch** of the portal smoke block must be re-scoped in the same change (sanctioned reconciliation, like Specs 012/013/014) — never deleted, never loosened for other pages; the student/family branches and admin/hub asserts stay byte-verbatim; the pay-token assert stays.
- **Stale-date honesty** — no baked calendar date/countdown; "today"-relative framing only.
- **i18n overlay safety** — new keys extend the `prt.tch.*` namespace; shared `prt.shell/portal/role/hub` and the sibling `prt.stu.*`/`prt.fam.*` namespaces must not change (they would ripple into student/family/hub built files and break byte-identity).

## Requirements *(mandatory)*

### Functional Requirements

**Teacher experience**

- **FR-001**: The dashboard MUST open with an organized teacher hero: sara's fixture name, a today summary, and a next-action hint — calm professional tone, no fake notification count, no baked date, **zero pay/salary wording**.
- **FR-002**: A today's-schedule section MUST present sara's classes as time/course/group/room cards with labeled status chips (and an authored student count where available) from fixtures; no fake live-join.
- **FR-003**: A next-class card MUST show time/course/group/room + a "what to prepare" hint, with the live-session affordance a labeled backendRequired note — NEVER styled as a working join.
- **FR-004**: A student-follow-up board MUST surface gentle labeled signals from real outcome fixtures (the st11 absence follow-up, the teacherAbsent signal) — calm, not aggressive, not a computed risk score.
- **FR-005**: A my-students preview MUST render sara's roster (st1/st6/st11/st13) as display-only cards with group/course association and a labeled learning signal; no fake profile route.
- **FR-006**: A session-outcome-workflow preview MUST present the ordered steps (attendance · remark · summary · homework note · files note — the legacy `classes-end` fields) display-only, with save/submit a labeled backendRequired/planned control.
- **FR-007**: A homework/tasks preview MUST render display-only authored task/homework cards; assign/upload appears ONLY as a labeled backendRequired affordance.
- **FR-008**: A materials/library preview MUST render display-only material cards (or real safe local links where they exist); upload/download is a labeled backendRequired gate.
- **FR-009**: A timetable/availability preview MUST present sara's schedule blocks agenda-style (day-grouped cards, never a grid/table clone); availability editing is a labeled backendRequired/planned control.
- **FR-010**: A monthly-report rubric preview MUST list the dimensions (achievements · learning progress · focus · homework · punctuality) display-only, with submit a labeled backendRequired/planned control; no rating-scale mockup implying a computed score.
- **FR-011**: A certificate/request preview MUST show the capability display-only with submit a labeled backendRequired control.
- **FR-012**: A teacher profile/account slice MUST show contact/role display-only; editing is a labeled backendRequired note (no fake edit/save; the `/profile` 500 is not reproduced).
- **FR-013**: A friendly, encouraging empty-state pattern MUST exist and be used wherever a list is truthfully empty (no classes today / no follow-up / no tasks / no materials) — no raw blank cards, no technical messages.

**Honesty & the pay hard line**

- **FR-014**: Every interactive element MUST be one of the four honest classes: real link to an existing page · demo toast (existing hooks only) · labeled disabled/planned control · display-only content. No fake live-join/start-class/end-class-submit/attendance-save/homework-upload/material-upload-download/chat/notification/certificate-submit/profile-save.
- **FR-015**: All planned/backendRequired affordances MUST carry the labeled availability chip vocabulary (icon + text, never color-only, never an anchor), consistent with Specs 008/012/013/014.
- **FR-016**: The ONE sanctioned real page-body link is the optional labeled admin **teacher-performance** link (the pay-free KPI board); any other page-body affordance is display-only or a labeled gate. Zero `href="#"`, zero dead links.
- **FR-017**: All copy MUST use honest availability language (no "coming soon" hype, no backend promises), Arabic-first quality in both languages.
- **FR-018**: **Zero salary/pay/earnings/compensation vocabulary or money figure** anywhere on the teacher dashboard — in visible copy AND source comments — enforced by the standing word-bounded grep (EN + AR) and the Spec-012 teacher pay-token smoke assertion; no route to any pay surface.

**Architecture**

- **FR-019**: The dashboard MUST remain static HTML-first: complete pre-rendered page pair, no whole-page `#app`, no SPA, no runtime page construction, enhancement only via the existing closed `data-*` hook set — NO new hook, NO new library/framework/TypeScript/CDN, no backend/API/DB/auth; GitHub-Pages compatible and Django-template-ready.
- **FR-020**: New content MUST bind existing fixtures/persona (sara + the teacher-links graph + existing session/outcome/schedule/course fixtures) plus display-only authored literals in the portal fixture namespace; NO new domain entities, NO engine-shaped state, NO pay/finance field surfaced, NO computed score/rank/rating.
- **FR-021**: New styles MUST live inside the `.portal-shell` CSS namespace using existing tokens; new locale keys MUST extend the `prt.tch.*` overlay without altering shared or sibling-namespace keys.

**Impact protection**

- **FR-022**: All 40 admin built files MUST remain content-identical to HEAD (hash-compare — the Spec-012/013/014 standard); no admin nav/sidebar/body change; reports/finance/dashboard contracts untouched.
- **FR-023**: `student-portal`, `family-portal`, and `portals` built pairs MUST remain byte-identical by default; any deviation requires an itemized, spec-sanctioned justification recorded before implementation.
- **FR-024**: The portal separation invariants remain binding: portal pages carry zero admin markup; admin pages carry zero portal references; the hub stays the only documented demo entry.

**QA**

- **FR-025**: The full gate MUST stay green: build (49 files) · smoke (all pages, both languages; admin/student/family/hub assertions verbatim; the teacher branch re-scoped only as sanctioned; the teacher pay-token assertion green) · a11y critical=0 serious=0 · link crawl (zero dead links, zero `href="#"`, zero raw keys) · the teacher pay-token grep (sources + built) zero hits · screenshot matrix with zero console errors · mobile 390px review.
- **FR-026**: The legacy coverage artifact MUST gain a Spec-015 delivery-notes section (T1–T27 dispositions), preserving the classification scheme and the no-silent-gaps rule; pay surfaces stay backendRequired.

### Key Entities *(documentation/build-time shapes only — no DB/API/auth schema)*

- **TeacherDashboard**: the composed page — ordered sections, persona binding (sara), language pair.
- **TeacherHero**: teacher name + today summary + next-action hint (honest class; pay-free).
- **TeacherTodayClass**: time/course/group/room/status refs + authored student count (existing session fixtures).
- **TeacherNextClass**: next class refs + prepare hint + the backendRequired live note.
- **TeacherStudentCard**: sara's roster student refs (group/course association) + a labeled learning signal.
- **TeacherFollowUpSignal**: a real outcome ref (st11 absence follow-up / teacherAbsent) rendered as a gentle labeled chip.
- **TeacherOutcomeStep**: one ordered display-only step (attendance/remark/summary/homework/files).
- **TeacherTaskPreview**: authored task/homework card (display-only).
- **TeacherMaterialPreview**: authored material card (display-only) + backendRequired upload/download.
- **TeacherAvailabilityPreview**: schedule blocks agenda-style + backendRequired availability edit.
- **TeacherReportRubricPreview**: the rubric dimensions (display-only) + backendRequired submit.
- **TeacherRequestPreview**: certificate/request capability (display-only) + backendRequired submit.
- **TeacherProfileSlice**: teacher contact/role (display-only) + backendRequired edit.
- **TeacherCapabilityClassification**: the T1–T27 Spec-015 disposition notes in the coverage artifact.
- **TeacherAcceptanceFrame**: one screenshot-matrix row (page/lang/theme/viewport/area + verdict).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The teacher dashboard pair renders complete in AR (RTL) and EN (LTR) with zero raw i18n keys and zero console errors; persona sara is visible.
- **SC-002**: Zero admin chrome on the teacher page (no `.app-shell`/`.nav-rail`/`.nav-panel`/admin topbar) — asserted by smoke.
- **SC-003**: Zero dense tables by default (any exception explicitly justified — none anticipated).
- **SC-004**: Zero fake live-join / start-class / end-class-submit / attendance-save / upload / download / chat / certificate-submit / profile-save affordances.
- **SC-005**: **Zero salary/pay/earnings/compensation vocabulary or money figure** anywhere (copy + comments), both languages — grep + smoke + review enforced.
- **SC-006**: Zero `href="#"` and zero dead local links sitewide; the only page-body link is the labeled teacher-performance admin link.
- **SC-007**: Mobile 390px AR layout shows no horizontal overflow.
- **SC-008**: a11y critical=0 serious=0 across the teacher scenario set including dark/mobile.
- **SC-009**: All 40 admin built files hash-identical to HEAD; student/family/hub built pairs byte-identical (or each deviation itemized and sanctioned).
- **SC-010**: Every legacy teacher capability (T1–T27) carries a Spec-015 disposition — zero silent gaps; T2/T17/T18/T19 remain backendRequired.
- **SC-011**: The Spec-015 screenshot matrix (≥14 frames) passes visual review with the verdict table recorded; every failure condition evaluated false.
- **SC-012**: Prior guards (Spec 008 reports-body, 009 finance, 010 chip-tone, 011 zero-`href="#"`, 012 portal G5 incl. the teacher pay-token assert, 013 student smoke branch, 014 family smoke branch) re-run green with zero new amendments beyond the sanctioned teacher smoke re-scope.

## Screenshot Acceptance *(minimum frames)*

teacher AR light desktop (full) · teacher AR dark desktop · teacher EN light desktop · teacher AR mobile 390px · today-schedule/next-class area · students/follow-up area · session-outcome-workflow area · tasks/materials area · reports/availability area · profile/requests area · student portal unchanged-proof · family portal unchanged-proof · portal hub unchanged-proof · admin dashboard unchanged-proof.

**Failure conditions (any → fail):** looks admin-like · looks like a legacy clone · too many tables · **salary/pay/earnings vocabulary visible** · fake live join looks real · fake end-class submit looks real · fake attendance save looks real · fake upload/download/chat/certificate submit · raw i18n keys · `href="#"` · dead links · broken RTL/LTR · poor mobile · poor dark contrast · student page changed · family page changed · admin page changed · reports/finance regression · new backend/API/DB/auth · new library/CDN.

## Scope Guard *(summary — full contract at plan time)*

**Allowed:** `teacher-portal` page/content upgrade · teacher entries in the portal fixture file (display-only) · teacher `prt.tch.*` locale keys · teacher-specific portal components if needed · teacher CSS inside the `.portal-shell` namespace · tests/screenshots/docs · legacy teacher delivery notes.

**Forbidden:** admin page/nav/body edits · student dashboard implementation (`prt.stu.*`, student module) · family dashboard implementation (`prt.fam.*`, family module) · real auth/permissions · backend/API/DB · real live-join/chat/attendance-write/end-class/homework/material/certificate engines · **salary/payroll/earnings surfaces** · **teacher salary/pay figures or vocabulary anywhere (copy + comments)** · new libraries/frameworks/CDN/TypeScript · SPA/`#app`/runtime page construction · `portal-shell.js`/`build-html.mjs`/`nav.config.js`/`enhance.js`/`package.json` · shared `prt.shell/portal/role` keys + sibling `prt.stu.*`/`prt.fam.*` keys · legacy clone work · dense admin tables · computed score/rank/rating.

## Expected Plan Artifacts *(produced by `/speckit-plan`, not this spec)*

Contracts: `teacher-dashboard-contract.md` · `teacher-dashboard-honesty-contract.md` · `teacher-schedule-next-class-contract.md` · `teacher-student-follow-up-contract.md` · `teacher-session-outcome-contract.md` · `teacher-materials-tasks-contract.md` · `teacher-reports-availability-contract.md` · `teacher-mobile-accessibility-contract.md` · `teacher-pay-free-contract.md` · `legacy-teacher-capability-coverage-contract.md` · `admin-impact-contract.md` · `student-family-impact-contract.md` · `static-html-django-ready-contract.md` · `source-links-contract.md` · `planned-backendrequired-contract.md` · `screenshot-acceptance.md` · `scope-guard.md`. Plus `research.md` (open decisions below), `data-model.md` (the Key Entities), `quickstart.md` (verify: build · preview both languages · themes · mobile · every section · honest gated affordances · zero pay vocabulary · admin/student/family/hub unchanged · screenshots · full tests).

**Open decisions deferred to research (none blocks this spec):** exact section order after the hero/today/next trio · how the follow-up board maps real outcomes (st11 absence, teacherAbsent) to gentle chips without a KPI wall or computed score · the session-outcome-workflow preview shape (display-only stepper vs cards) · whether the teacher-performance admin link is kept as the one page-body link or moved to a gated preview · which section truthfully demonstrates the empty-state pattern · the teacher smoke re-scope shape (planned-card count/semantics + the pay-token assert preserved).

## Assumptions

- Persona remains **sara** (math teacher, active, balanced, strong-delivery) — continuity with Spec 012; no persona change.
- The build/watcher workflow is unchanged; Spec 015 implementation will not commit/push (watcher/user-controlled).
- Byte-identity for admin (40) AND student/family/hub pairs is achievable because the teacher upgrade touches only the teacher page module, teacher fixture entries, `prt.tch.*` keys, and namespaced CSS — shared shell and sibling namespaces are not expected to change.
- The Spec-012 portal smoke block's **teacher branch** is the amendment surface for graduated teacher planned cards (sanctioned re-scope; other branches + the pay-token assert stay verbatim).
- The numeric `rating`/`util` fields in the teacher fixture are display-suppressed — the dashboard surfaces labeled signals only, never a computed score.
- Arabic copy is authored first, English mirrors it.
- No calendar/date engine; "today" framing stays relative and honest in static output.

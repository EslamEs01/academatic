# Feature Specification: Student Dashboard (Spec 013)

**Feature Branch**: `feature/013-student-dashboard` *(proposed; branching is user-controlled — spec authored on `feature/012-role-portal-foundation`)*
**Created**: 2026-07-02
**Status**: Draft
**Input**: User description: "/speckit.specify Student Dashboard — Spec 013 deepens the Student Portal introduced in Spec 012 into a richer, polished, student-focused dashboard experience. Owns the Student Dashboard only; family (014), teacher (015), communications shell (016), final portal QA (017) stay future. Cheerful, calming, Arabic-first, premium, mobile-first, today-first, card-based, not admin-like. Capability coverage from `legacy-role-capability-coverage.md` planned-013 rows; honesty and admin/family/teacher protection binding."

## Context & Vision

Spec 012 (commit `5bcf490`) shipped the role-portal foundation: the shared warm portal shell, the demo hub, and three foundation pages. The student portal foundation (`student-portal.html` / `student-portal.en.html`, persona `st1`) today renders 8 blocks: hero · today's learning (2 session cards) · next-session card with honest note · 2 course cards · one overall progress gauge (٧٨٪) · 3 achievement cards («جديد») · 3 planned cards (homework / materials / leaderboard, all `planned`) · Spec-013 closing note.

Spec 013 turns that foundation into **the student's real learning home** — a single strong dashboard page that answers, within one screen-glance each: *What do I have today? What is my next session? What should I do now? How am I progressing? What did I achieve? What homework/materials are waiting?* It graduates the three planned cards into real display-only sections, adds the student-owned legacy capabilities (week timetable view, class history with teacher feedback, profile slice), and deepens progress/achievements — all fixture-authored, honest, and engine-free.

**Product direction (binding):** cheerful · calming · comfortable · very easy · creative · human · Arabic-first · premium · mobile-first · child/student-friendly · **bright but not childish** · focused on today · focused on progress · low cognitive load · card-based · **not admin-like** · not table-heavy · not corporate. The page must feel like a real student learning home, not an admin dashboard with different colors — and not a legacy clone.

**Series position:** Spec 014 = Family/Guardian Dashboard · Spec 015 = Teacher Dashboard · Spec 016 = Communications/Requests/Tasks/Notifications shell · Spec 017 = Final role-portals QA + demo polish. Spec 013 must not pre-implement any of their surfaces.

## Legacy Capability Inheritance *(binding input — no silent gaps)*

From `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` (all 39 legacy pages classified), Spec 013 owns exactly:

**The three `planned-013` rows:**
- **F5 — Student timetable** (`/student/timetable`): weekly schedule browsing, student-facing first (the guardian view is 014's).
- **F6 — Class history + per-session details** (`/student/student-history-fillter`): history list + per-session record (remark / summary / homework / note / files), student view (guardian mirror is 014's; the read-only teacher-notes preview slice already shipped in the family foundation).
- **F12 — Materials library** (`/student/library`): read-only browse, student surface first (family view 014, teacher view 015).

**The §4 Spec-013 ownership list (9 items):** deep today's-learning experience · timetable browsing · class-history + per-session details · deep progress visualization (anchored in the legacy hours gauge — display-only, never computed scoring) · deep achievements (net-new; anchored in the monthly rubric + session notes) · leaderboard (net-new, no legacy source — honest, non-fabricated) · homework/tasks student surface (net-new) · student materials library surface · student account/profile view slice.

**Stays out of Spec 013 (classification unchanged):** everything `planned-014`/`planned-015` (guardian cancel/reschedule, subscriptions, feedback rubric, meetings, request-trial, all teacher flows) · `backendRequired` (uploads F4, billing F9, chat T13, real live classroom T7, all pay surfaces) · `intentionally excluded` rows. Every capability Spec 013 renders display-only or defers MUST keep (or receive) an explicit classification note — no silent gaps. The coverage artifact may be annotated ONLY where Spec 013 resolves a planned-013 row (status note "delivered by Spec 013 as …"); no row may be reclassified silently.

**Do NOT copy from legacy:** visuals, layout, classes, colors, icons, private wording, broken routes (both `/profile` 500s, Dashboard-1 404s), numeric status codes, dense tables, weak UI patterns. **Do improve:** student daily flow, today-first structure, learning progress, course clarity, homework/materials previews, achievements/gamification, mobile comfort, empty states, friendly microcopy, honest planned/backendRequired actions.

**Capture-verified grounding (re-read this session from `output/roles/family/` + planning docs, not memory):** the per-session record shape is exactly *Class Remark · Class Summary · Homework Note · Files · Teacher · Student* (the "Student Details" modal on `/student/student-history-fillter`) — FR-011's card content mirrors this capability, not its modal form. Legacy progress was hours-only (Total/Remaining/Taken KPIs + a Time-Spendings gauge; no percentages, no levels). Gamification and any leaderboard are confirmed absent from all 13 family-portal pages — the achievements/celebration areas are honestly net-new. The legacy anti-patterns to beat: a 10-column today-sessions table, an 8-column Saturday-first timetable grid, and zero empty-state design anywhere (empty tables rendered raw column headers) — which is why FR-002/FR-012/FR-014 mandate cards, agenda form, and designed empty states.

## Page Strategy *(decided)*

**One strong page.** Spec 013 upgrades the existing `student-portal.html` / `student-portal.en.html` pair in place. No new student pages: every owned capability fits as a section of one coherent today-first dashboard, a single page keeps cognitive load low (the core product value), and fragmenting into sub-pages before the deep 014/015 experiences exist would multiply navigation without user value. If planning uncovers a genuinely page-worthy surface, it must be justified against this default (static, bilingual, portal-shell, reachable only from the student portal/hub, never admin nav) — the burden of proof is on the new page.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student instantly understands today (Priority: P1) 🎯 MVP

As the student (st1), I open my dashboard and within one glance I know what I have today, what my next session is, and what I should do now — greeted warmly by name, with calm motivating copy and a clear next-action hint.

**Why this priority**: "Focused on today" is the experience-defining promise; every other section supports it.

**Independent Test**: Open `student-portal.html` — hero + today's-learning + next-session render with st1's fixture truth, in a friendly order, before any scrolling on desktop; the three "today" questions are answerable without reading any table.

**Acceptance Scenarios**:

1. **Given** the Arabic page, **When** it loads, **Then** the hero greets st1 by fixture name with today-focused encouraging copy and a next-action hint — with no fake notification count and no baked calendar date that could go stale.
2. **Given** the today's-learning section, **When** sessions render, **Then** each card shows time / course / teacher / room from existing fixtures with a labeled (icon + text) status chip, and the "what happens next" wording is clear.
3. **Given** an area whose truthful content is empty, **When** it renders, **Then** a friendly designed empty state appears (never a blank card, never a technical message).

---

### User Story 2 - Next session is clear and honest (Priority: P1)

As the student, I see my next session prominently — time, course, group, teacher — and any join-like affordance is honestly a demo/planned control, never styled as a working live join.

**Why this priority**: The next-session moment is the highest-anxiety, highest-value moment for a student; honesty here is a hard constitutional line (no fake Zoom/live join — the legacy "live room" was itself fake and is excluded).

**Independent Test**: Inspect the next-session card in both languages: fixture data correct; the affordance is one of the four honest classes and is explicitly labeled demo/planned; nothing looks like a live link.

**Acceptance Scenarios**:

1. **Given** the next-session card, **When** inspected, **Then** it shows time/course/teacher (group where available) from fixtures and its affordance is a labeled honest demo/planned control (disabled or note-form), with wording that says the real join requires the live-session integration.
2. **Given** both language builds, **When** grep-inspected, **Then** no anchor or button simulates a live-join URL or a chat/notification affordance.

---

### User Story 3 - Courses, homework, and materials as friendly cards (Priority: P1)

As the student, I browse my courses, waiting homework/tasks, and learning materials as warm cards — never tables — with due labels and gentle progress hints; nothing pretends to upload, submit, or download.

**Why this priority**: Graduates two of the three Spec-012 planned cards (homework, materials) into real student value and covers legacy F12 + the per-session homework concept with a better daily flow.

**Independent Test**: Homework and materials sections render authored display-only cards (or a truthful friendly empty state); course cards show name/level/progress hint; zero `<table>` elements on the page; zero upload/submit/download affordances.

**Acceptance Scenarios**:

1. **Given** the my-courses section, **When** it renders, **Then** each enrollment is a card with course name, level, teacher/group where fixture-available, and a gentle authored progress hint — links only to pages that exist (else no link).
2. **Given** the homework/tasks preview, **When** it renders, **Then** items are display-only authored cards with due labels; submission/upload is represented ONLY as a labeled planned/backendRequired affordance (per coverage row F4: uploads are backendRequired).
3. **Given** the materials preview, **When** it renders, **Then** material cards are display-only (or real safe local links if such targets exist); no fake download/upload control.

---

### User Story 4 - Progress, attendance, and achievements motivate without stress (Priority: P1)

As the student, I see my progress visualization, a small attendance summary, and a cheerful achievements area — authored numbers only, celebratory not competitive, no KPI wall, no computed grade/rank.

**Why this priority**: "Focused on progress" is the second experience-defining promise, and it carries the net-new gamification value (legacy had none — this must stay honestly framed as a new experience).

**Independent Test**: Progress + attendance + achievements sections render with fixture/authored literals, localized digits, labeled chips; nothing is presented as computed; the achievements framing says it's new; the tone reads encouraging in both languages.

**Acceptance Scenarios**:

1. **Given** the progress area, **When** rendered, **Then** the visualization derives from authored fixture literals (st1 `progress: 78` + per-course literals), display-only, with Arabic-Indic digits on AR pages.
2. **Given** the attendance summary, **When** rendered, **Then** it is a small friendly trio-style summary from authored/fixture values with labeled icon+text chips — not an admin KPI wall.
3. **Given** the achievements area, **When** rendered, **Then** badges/points are authored literals, the area is framed as a new improved experience, and no ranking engine or computed score is implied.
4. **Given** the leaderboard-style area (if included per FR-010), **When** rendered, **Then** it is celebration-styled (unordered "stars"-type recognition), clearly labeled authored/demo, stress-free, with student-friendly language — never a computed competitive ranking.

---

### User Story 5 - History and session summaries as learning feedback (Priority: P2)

As the student, I read my recent class history — per-session teacher summary, homework note, and remark — as friendly display-only feedback cards (legacy F6, rebuilt kindly).

**Why this priority**: Resolves the largest inherited planned-013 capability, but the dashboard is already valuable without it (P2, not P1).

**Independent Test**: The history/feedback section renders 2–3 authored per-session records (teacher, session, summary note, homework note) as cards, display-only, no fake detail route.

**Acceptance Scenarios**:

1. **Given** the history section, **When** rendered, **Then** each record shows session/course, teacher, and authored summary/homework note text, with any attachment concept represented display-only (no fake file download).
2. **Given** the section footer, **When** inspected, **Then** any "full history" affordance is an honest planned control (a dedicated history surface is not built in 013 unless planning justifies it) — never a dead link.

---

### User Story 6 - My week at a glance (Priority: P2)

As the student, I see my weekly schedule (legacy F5) as a friendly agenda-style view — day groups with session cards — never a dense grid table clone.

**Why this priority**: Second inherited planned-013 row; today-first remains primary, the week view is supporting context.

**Independent Test**: The week section renders st1's group schedule from existing schedule/session fixtures grouped by day, in agenda-card form, zero tables, mobile-clean.

**Acceptance Scenarios**:

1. **Given** the week view, **When** rendered, **Then** days group session cards (time/course/teacher) from existing fixtures, with RTL-correct day ordering on Arabic pages.
2. **Given** a day without sessions, **When** rendered, **Then** either the day is gracefully omitted or shows the friendly empty pattern — never a blank slot grid.

---

### User Story 7 - Beautiful on mobile (Priority: P1)

As a student mostly on a phone, the dashboard is a comfortable single-column flow at 390px — no horizontal overflow, touch-friendly targets, readable Arabic type.

**Independent Test**: 390px screenshot + smoke computed-layout check: no horizontal scroll, sections stack cleanly, all interactive targets comfortably tappable.

**Acceptance Scenarios**:

1. **Given** the AR page at 390px, **When** captured, **Then** there is zero horizontal overflow and every section reads as a clean single-column card flow.

---

### User Story 8 - Bilingual, RTL/LTR, themed, localized digits (Priority: P1)

Arabic RTL default and English LTR pages both render completely; light/dark/system all pass contrast; every number on Arabic pages uses Arabic-Indic digits.

**Independent Test**: Both built files load with zero raw i18n keys; smoke digit-locale assertions pass; a11y critical=0 serious=0 on all portal scenarios including dark.

**Acceptance Scenarios**:

1. **Given** `student-portal.html` (AR), **When** scanned, **Then** counters/percentages render Arabic-Indic (٧٨٪-style) and layout is RTL-correct; the EN page mirrors LTR with Western digits.
2. **Given** dark mode, **When** audited, **Then** all new student surfaces pass with zero critical/serious issues (ink-strength accent tokens discipline from Spec 012 carried forward).

---

### User Story 9 - Admin, family, and teacher surfaces protected (Priority: P1)

Nothing outside the student surface changes: all 40 admin built files stay content-identical, family/teacher portal deep content unchanged, the hub unchanged (except a student-related label ONLY if required and sanctioned), no admin nav/sidebar pollution ever.

**Independent Test**: Hash-compare 40 admin files vs HEAD (byte-identical); family-portal/teacher-portal/portals built pairs byte-identical unless a sanctioned shared-key change is explicitly recorded; admin-scoped smoke assertions re-run verbatim green.

**Acceptance Scenarios**:

1. **Given** the post-013 build, **When** hashed against HEAD, **Then** all 40 admin files are byte-identical, and the family/teacher/hub built pairs are byte-identical (default; any deviation must be a spec-sanctioned, itemized shared-shell/locale change proven unavoidable).
2. **Given** the admin console, **When** crawled, **Then** zero portal references exist in any admin file (standing Spec-012 invariant).

---

### User Story 10 - Screenshots prove the experience (Priority: P1)

Visual acceptance (the project's binding acceptance mechanism) proves the dashboard is cheerful, easy, premium, and unmistakably not admin-like — plus unchanged-proof frames for hub/family/teacher/admin.

**Independent Test**: The Spec-013 screenshot matrix (see Screenshot Acceptance) captures with zero console errors and passes the failure-condition review recorded in `screenshots/REVIEW.md`.

**Acceptance Scenarios**:

1. **Given** the captured frames, **When** reviewed against the failure conditions, **Then** every frame passes and the verdict table is recorded in REVIEW.md.

---

### Edge Cases

- **Long Arabic names/titles at 390px** — cards must wrap gracefully (`min-width:0` discipline), never overflow horizontally.
- **RTL time and day ordering** — times remain tabular/readable in RTL; week view day order is locale-correct.
- **Dark-mode contrast on new surfaces** — any new accent use follows the `--pt-accent-ink` ink-strength rule from Spec 012 (that a11y lesson is binding).
- **Truthfully empty lists** — the friendly empty-state pattern must exist and be used wherever a list is truthfully empty; never a raw blank card or scary message.
- **Smoke drift from graduating planned cards** — the Spec-012 smoke assertion pins student planned-card count = 3; as homework/materials/leaderboard graduate into real sections, that count changes. The assertion MUST be re-scoped in the same change (sanctioned test reconciliation, like Spec 012's re-scope discipline) — never deleted, never silently loosened for other pages; the gauge existence-floor and zero-table assertions stay.
- **Stale-date honesty** — no baked calendar date/countdown (static output would lie tomorrow); "today"-relative framing only.
- **i18n overlay safety** — new keys extend the `prt.*` student namespace; shared `prt.shell.*`/`prt.portal.*` keys must not change (they would ripple into family/teacher/hub built files and break byte-identity).

## Requirements *(mandatory)*

### Functional Requirements

**Student experience**

- **FR-001**: The student dashboard MUST open with an upgraded warm hero: st1's fixture name, today-focused greeting, calm motivational copy, and a clear next-action hint — with no fake notification count and no baked calendar date.
- **FR-002**: A today's-learning section MUST present st1's sessions as time/course/teacher/room cards with labeled (icon + text) status chips from existing fixture truth and clear "what happens next" wording.
- **FR-003**: A next-session card MUST show time, course/group, and teacher, with an honest demo/planned affordance — wording explicitly demo/planned; NEVER styled as a working live join.
- **FR-004**: A my-courses section MUST render enrollment cards (name, level, teacher/group where available) with gentle authored progress hints; links only to existing safe pages, otherwise no link — zero tables.
- **FR-005**: A homework/tasks preview MUST render display-only authored cards with due labels; any submit/upload concept appears ONLY as a labeled planned/backendRequired affordance (uploads are backendRequired per coverage F4).
- **FR-006**: A materials/library preview MUST render friendly display-only material cards (or real safe local links where targets exist); no fake download/upload.
- **FR-007**: A progress area MUST visualize authored fixture literals (overall + per-course) display-only — no computed grade/rank/score, no KPI wall.
- **FR-008**: A small attendance summary MUST render from authored/fixture values with labeled chips, in a friendly non-stressful form.
- **FR-009**: An achievements area MUST present authored badges/points cheerfully, framed as a new improved experience (net-new vs legacy) — no ranking engine implied.
- **FR-010**: If a leaderboard-style element is included, it MUST be celebration-styled recognition (unordered, non-competitive), clearly labeled authored/demo, stress-free, student-friendly — never computed ranking. If planning drops it instead, the coverage row must record the deferral reason (still Spec-013-owned).
- **FR-011**: A history/session-feedback section MUST present recent per-session records (teacher summary, homework note, remark — the F6 record shape) as display-only friendly cards; attachments display-only.
- **FR-012**: A week-at-a-glance section MUST present st1's schedule agenda-style (day-grouped cards) from existing fixtures — never a dense grid/table clone (F5).
- **FR-013**: A small profile card MUST show st1's identity slice (level / course / family relation from existing fixtures) display-only; account editing is represented ONLY as a labeled backendRequired/planned note (no fake edit/save).
- **FR-014**: A friendly empty-state pattern MUST exist and be used wherever a list is truthfully empty — no raw blank cards, no technical messages.

**Honesty**

- **FR-015**: Every interactive element MUST be one of the four honest classes: real link to an existing page · demo toast (existing enhancement hooks only) · labeled disabled/planned control · display-only content. No fake live join, homework upload/submit, chat, notifications engine, or ranking engine anywhere.
- **FR-016**: All planned/backendRequired affordances MUST carry the labeled availability chip vocabulary (icon + text, never color-only, never an anchor), consistent with Specs 008/012.
- **FR-017**: All copy MUST use honest availability language (no "coming soon" hype, no backend promises), Arabic-first quality in both languages.

**Architecture**

- **FR-018**: The dashboard MUST remain static HTML-first: complete pre-rendered page pair at build, no whole-page `#app`, no SPA, no runtime page construction, enhancement only via the existing closed `data-*` hook set — NO new hook, NO new library/framework/TypeScript/CDN, no backend/API/DB/auth; GitHub-Pages compatible (relative paths) and Django-template-ready.
- **FR-019**: New content MUST bind existing fixtures/persona (st1) plus display-only authored preview literals in the portal fixture namespace; NO new domain entities, NO engine-shaped state.
- **FR-020**: New styles MUST live inside the `.portal-shell` CSS namespace using existing tokens; new locale keys MUST extend the `prt.*` overlay without altering shared keys used by family/teacher/hub pages.

**Impact protection**

- **FR-021**: All 40 admin built files MUST remain content-identical (hash-compare vs HEAD — the Spec-012 byte-identity standard); no admin nav/sidebar/body change of any kind; reports/finance/dashboard contracts untouched.
- **FR-022**: Family-portal, teacher-portal, and hub built pairs MUST remain byte-identical by default; any deviation requires an itemized, spec-sanctioned justification (e.g., an unavoidable shared-shell fix) recorded before implementation.
- **FR-023**: The Spec-012 portal separation invariants remain binding: portal pages carry zero admin markup; admin pages carry zero portal references; the hub stays the only documented demo entry.

**QA**

- **FR-024**: The full gate MUST stay green: build (49 files) · smoke (all pages, both languages; admin-scoped assertions verbatim; portal assertions re-scoped only as sanctioned by the Edge-Case reconciliation) · a11y critical=0 serious=0 · link crawl (zero dead links, zero `href="#"`, zero raw keys) · teacher-portal pay-token grep unchanged-green · screenshot matrix with zero console errors · mobile 390px review.
- **FR-025**: The legacy coverage artifact MUST be updated ONLY on the resolved planned-013 rows (delivery notes), preserving the seven-way scheme and the no-silent-gaps rule.

### Key Entities *(documentation/build-time shapes only — no DB/API/auth schema)*

- **StudentDashboard**: the composed page — ordered sections, persona binding (st1), language pair.
- **StudentTodaySession**: time, course, teacher, room, status chip ref (existing session fixture rows).
- **StudentNextAction**: the hero hint + next-session affordance (honest class, label key).
- **StudentCourseCard**: course title/level/teacher-group refs + authored progress literal.
- **StudentHomeworkPreview**: authored item — title, course ref, due label, display-only status.
- **StudentMaterialPreview**: authored item — title, type icon, course ref, display-only.
- **StudentProgressMetric**: authored literal (overall or per-course) + presentation form.
- **StudentAchievement**: authored badge — icon, title, description, new-experience framing.
- **StudentLeaderboardPreview**: celebration entries — student name refs (existing fixtures), unordered, authored/demo label.
- **StudentHistoryFeedback**: authored per-session record — session/course ref, teacher ref, summary note, homework note (the F6 shape, display-only).
- **StudentDashboardAction**: any interactive element classed real-link / demo-toast / disabled-planned / display-only.
- **StudentCapabilityClassification**: the planned-013 row resolution notes in the coverage artifact.
- **StudentAcceptanceFrame**: one screenshot-matrix row (page/lang/theme/viewport/area focus + verdict).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The student dashboard pair renders complete in AR (RTL) and EN (LTR) with zero raw i18n keys and zero console errors.
- **SC-002**: Zero admin chrome on the student page (no `.app-shell`/`.nav-rail`/`.nav-panel`/admin topbar) — asserted by smoke.
- **SC-003**: Zero `<table>` elements on the student page (default stands; any exception would require explicit justification — none is anticipated).
- **SC-004**: Every student section renders fixture-bound or authored display-only data; grep+review find zero fake live-join / upload / submit / chat / notification / ranking affordances.
- **SC-005**: Zero `href="#"` and zero dead local links sitewide (standing invariant, re-verified).
- **SC-006**: Mobile 390px AR layout shows no horizontal overflow.
- **SC-007**: a11y critical=0 serious=0 across the full scenario set including the student dark/mobile frames.
- **SC-008**: All 40 admin built files hash-identical to HEAD; family/teacher/hub built pairs byte-identical (or each deviation itemized and sanctioned).
- **SC-009**: All three planned-013 coverage rows (F5, F6, F12) carry delivery notes; every §4 Spec-013 item is delivered or explicitly re-deferred with reason — zero silent gaps.
- **SC-010**: The Spec-013 screenshot matrix (≥12 frames) passes visual review with the verdict table recorded in REVIEW.md; every failure condition evaluated false.
- **SC-011**: Prior guards (Spec 008 reports-body, 009 finance, 010 chip-tone, 011 zero-`href="#"`, 012 portal G5 incl. pay-token grep) re-run green with zero new amendments beyond the sanctioned smoke re-scope.
- **SC-012**: The today/next/progress questions are each answerable from a single section without cross-referencing (reviewed in the screenshot verdicts: hero+today above the fold on desktop).

## Screenshot Acceptance *(minimum frames)*

student AR light desktop (full) · student AR dark desktop · student EN light desktop · student AR mobile 390px · next-session area close-up · homework/materials area · progress/achievements area · history/feedback area · portal hub unchanged-proof · family portal unchanged-proof · teacher portal unchanged-proof · admin dashboard unchanged-proof.

**Failure conditions (any → fail):** looks admin-like · looks like a legacy clone · tables present · childish or cheap design · fake live join looks real · fake upload/submit looks real · ranking engine implied · stressful leaderboard · raw i18n keys · `href="#"` · dead links · broken RTL/LTR · poor mobile · poor dark contrast · any admin page changed · family/teacher deep content changed · reports/finance regression · new backend/API/DB/auth · new library/CDN.

## Scope Guard *(summary — full contract at plan time)*

**Allowed:** `student-portal` page/content upgrade · student entries in the portal fixture file (display-only) · student `prt.*` locale keys · student-specific portal components if needed · student CSS inside the `.portal-shell` namespace · tests/screenshots/docs · planned-013 coverage delivery notes.

**Forbidden:** admin page/nav/body edits · family dashboard implementation · teacher dashboard implementation · real auth/permissions · backend/API/DB · real chat/homework-upload/live-session/payment/ranking engines · teacher salary/pay figures or vocabulary anywhere (standing grep) · new libraries/frameworks/CDN/TypeScript · SPA/`#app`/runtime page construction · legacy clone work · dense admin tables.

## Expected Plan Artifacts *(produced by `/speckit-plan`, not this spec)*

Contracts: `student-dashboard-contract.md` · `student-dashboard-honesty-contract.md` · `student-progress-achievements-contract.md` · `student-homework-materials-contract.md` · `student-history-feedback-contract.md` · `student-mobile-accessibility-contract.md` · `legacy-student-capability-coverage-contract.md` · `admin-impact-contract.md` · `family-teacher-impact-contract.md` · `static-html-django-ready-contract.md` · `source-links-contract.md` · `planned-backendrequired-contract.md` · `screenshot-acceptance.md` · `scope-guard.md`. Plus `research.md` (open decisions below), `data-model.md` (the Key Entities), `quickstart.md` (verify: build · preview both languages · themes · mobile · every section · honest affordances · admin/family/teacher unchanged · screenshots · full tests).

**Open decisions deferred to research (none blocks this spec):** exact section order after the hero/today/next trio · which section truthfully demonstrates the empty-state pattern · whether the week view uses day-tabs vs stacked day groups (must stay table-free either way) · leaderboard include-as-celebration vs defer-with-reason (FR-010 allows both) · whether any existing safe page merits a course-card link.

## Assumptions

- Persona remains `st1` (fam1, math, grp1, progress 78) — continuity with Spec 012; no persona change.
- The build/watcher workflow is unchanged; Spec 013 implementation will not commit/push (watcher/user-controlled).
- Byte-identity for admin (40 files) AND family/teacher/hub pairs is achievable because the student upgrade touches only the student page module, student fixture entries, student locale keys, and namespaced CSS additions — the shared shell and shared keys are not expected to change.
- The Spec-012 smoke portal block is the amendment surface for graduated planned cards (sanctioned re-scope, tests remain honest and at-least-as-strict elsewhere).
- Arabic copy is authored first, English mirrors it (established project discipline).
- No calendar/date engine exists or is added; "today" framing stays relative and honest in static output.

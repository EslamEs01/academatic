# Feature Specification: Teacher Internal Pages

**Feature Branch**: `feature/012-role-portal-foundation` (repo convention: specs 013–025 on this branch; no new branch)
**Feature Directory**: `academy-dashboard-discovery/specs/025-teacher-internal-pages`
**Created**: 2026-07-07
**Status**: Draft
**Input**: User description: "Teacher Internal Pages — build the seven teacher internal pages behind the teacher portal nav; static, pay-free, honest gates; no backend, no fake actions."

## Overview

Specs 021–024 corrected the role model, audited legacy coverage, and closed the GO-conditional gate for teacher internals (Spec 024 recorded B-04 live-room → future-backend, B-05 teacher library → planned owner 025, B-06 chat → future/backendRequired, B-07 pay-free exemption). Spec 025 builds the **seven teacher internal pages** so the teacher portal is a full role app, not a home dashboard with «قريبًا» links. Each page is a complete static AR+EN page pair, consistent with the Spec 022 living design system, grounded in the legacy teacher capabilities (Spec 015 T1–T27 map, capture-verified from `output/roles/teacher/`), and **pay-free by construction**. The seven planned `ROLE_NAV.teacher` items convert planned → implemented; the teacher-home performance anchor (grandfathered in Spec 024 B-07) repoints to the new `teacher-reports` page.

**Pages** (each × 2 languages = 14 new public HTML): teacher-schedule · teacher-students · teacher-outcomes · teacher-tasks · teacher-reports · teacher-profile · teacher-library.

## Clarifications

No `[NEEDS CLARIFICATION]` markers. The feature description, the Spec 015 T1–T27 capability map, the retained `TEACHER_PREVIEW` fixtures, and the Spec 024 gate contracts fully determine scope; ambiguities are resolved by binding law (pay-free, no-fake-actions, static-first) and recorded in Assumptions.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Teacher reviews their schedule without fake live-room actions (Priority: P1)

The teacher opens teacher-schedule and sees today + the week as agenda cards (time · course/group · room · student count · status), with session prep state, and any live/room action as an honest backendRequired gate — never a working join.

**Why this priority**: The schedule is the teacher's primary daily surface and the highest-value legacy capability (T14); it is also where the live-room law is most at risk.

**Independent Test**: Open teacher-schedule(.en).html; every session card shows agenda fields from fixtures; the live-room control is a labeled backendRequired gate (no `href="#"`, no fake join); no pay token.

**Acceptance Scenarios**:
1. **Given** sara's fixture sessions, **When** the page renders, **Then** today's and the week's sessions appear as agenda cards with status chips and authored student counts, no grid clone, no fake start/attendance-write.
2. **Given** the "enter class" affordance, **When** inspected, **Then** it is a backendRequired gate (labeled, non-activating), not a live-room engine.

---

### User Story 2 - Teacher understands assigned students and learning context (Priority: P1)

The teacher opens teacher-students and sees the roster (sara's students) as display-only cards with course/group labels, a learning signal, and next-session/latest-outcome context — no messaging, no edit/save, no private guardian contact.

**Why this priority**: The roster (T8) is the second core daily surface and the anchor for outcomes/reports.

**Independent Test**: Open teacher-students(.en).html; each roster card shows course/group + a labeled signal from real outcome fixtures; zero form controls; zero messaging affordance.

**Acceptance Scenarios**:
1. **Given** sara's roster (st1/st6/st11/st13), **When** rendered, **Then** each student card is view-only with group/course and a calm learning signal (not a computed risk score).
2. **Given** any "contact/message" concept, **When** present at all, **Then** it is an honest backendRequired gate, never a fake composer.

---

### User Story 3 - Teacher reviews the outcome workflow with honest gates (Priority: P1)

The teacher opens teacher-outcomes and sees the prepare→attend→record→review workflow with the legacy `classes-end` outcome fields (attendance · remark · summary · homework note · files note) display-only, example outcome states, and every save/submit a backendRequired gate.

**Why this priority**: Outcome recording (T22/T3) is the teaching workflow's core; it is the sharpest no-fake-write surface.

**Independent Test**: Open teacher-outcomes(.en).html; the flowStrip renders 4 steps; the outcome checklist shows the five fields display-only; save/submit is a backendRequired gate; no fake save/attendance-write.

**Acceptance Scenarios**:
1. **Given** the outcome workflow, **When** rendered, **Then** the four ordered steps + the five-field checklist appear display-only with honest review status.
2. **Given** the record/save control, **When** inspected, **Then** it is backendRequired (labeled), never writes.

---

### User Story 4 - Teacher manages teaching tasks without fake completion (Priority: P2)

The teacher opens teacher-tasks and sees a task/follow-up board (prep work, admin-review items) with priority/status tags and due/next-class context; completion is a backendRequired gate.

**Independent Test**: Open teacher-tasks(.en).html; task cards render from `TEACHER_PREVIEW.tasks` with status tags; the complete control is a backendRequired gate; no fake completion.

**Acceptance Scenarios**:
1. **Given** the task board, **When** rendered, **Then** authored tasks show priority/status + due/next-class context.
2. **Given** the complete control, **When** inspected, **Then** it is backendRequired, not a fake toggle.

---

### User Story 5 - Teacher sees academic reports, never financial (Priority: P2)

The teacher opens teacher-reports and sees academic-only teaching reports (session completion, student-progress summaries, attendance/outcome quality, the monthly rubric dimensions) with export/download as a backendRequired gate — **zero pay/finance/salary vocabulary**. This page is the repoint target for the Spec 024 teacher-home performance anchor.

**Why this priority**: Reports (T9 + T20/T21) is the pay-free law's sharpest test and closes the B-07 anchor-repoint.

**Independent Test**: Open teacher-reports(.en).html; the three-layer pay-free scan is zero-hit; the rubric shows dimensions (no answer scales/computed score); export is a backendRequired gate; teacher-portal's performance anchor now targets teacher-reports.

**Acceptance Scenarios**:
1. **Given** the reports page, **When** the pay-free scan runs, **Then** it returns zero hits (source + built + comments).
2. **Given** the rubric, **When** rendered, **Then** it shows dimension lines only (achievements · learning-progress · focus · homework · punctuality + support/objectives), no computed rating/percentile/chart.
3. **Given** the teacher home, **When** the performance link is followed, **Then** it lands on teacher-reports (a teacher-owned page), not the admin board.

---

### User Story 6 - Teacher reviews profile and availability without fake save (Priority: P2)

The teacher opens teacher-profile and sees the account summary, subjects/specializations, availability windows, and teaching preferences; profile/password save is a backendRequired gate; **no financial/pay information**.

**Independent Test**: Open teacher-profile(.en).html; identity/subjects/availability/preferences render display-only; the three write controls (photo/save/password) are backendRequired gates; no pay token.

**Acceptance Scenarios**:
1. **Given** the profile, **When** rendered, **Then** subjects + availability windows + preferences are display-only.
2. **Given** the save/password controls, **When** inspected, **Then** each is a backendRequired gate.

---

### User Story 7 - Teacher reviews learning materials with honest gates (Priority: P2)

The teacher opens teacher-library and sees resource cards (material · status · linked course/group) with upload/download as backendRequired gates and static filters if working — no fake upload/download/open/delete.

**Independent Test**: Open teacher-library(.en).html; resource cards render from `TEACHER_PREVIEW.materials`; upload/download are backendRequired gates; any filter is static-working (no fake file action).

**Acceptance Scenarios**:
1. **Given** the library, **When** rendered, **Then** resource cards show status + linked course/group.
2. **Given** upload/download, **When** inspected, **Then** each is a backendRequired gate; no fake file open/delete/sync.

---

### User Story 8 - Product owner sees grounded, pay-free teacher pages (Priority: P2)

The product owner can confirm every teacher page traces to a legacy teacher capability (or is an honest gate where legacy evidence is incomplete) and that no teacher-owned surface carries pay wording.

**Independent Test**: `teacher-legacy-coverage.md` maps each page → its T-capability + evidence path; `pay-free-risk-register.md` enumerates the excluded pay surfaces + the three-layer enforcement.

---

### User Story 9 - QA verifies all teacher pages load, link, and stay pay-free (Priority: P2)

QA can verify all 7 pages load, all teacher nav links are valid (7 implemented + home + any honest planned), no `href="#"`/dead links/raw keys, and the pay-free scan is green.

**Independent Test**: smoke asserts the new load count, the teacher nav conversion, `plannedNavAnchors===0`, and `payHit` false on all 8 teacher-portal-family pages; a11y critical=0 serious=0.

---

### Edge Cases

- **Pay surfaces** (T2/T17/T18/T19: salary hero, /salary, /salary-class-report, /update-result): intentionally-excluded-by-law; NEVER rendered; they pin the forbidden token set — no teacher page/nav/locale/comment/fixture may contain them.
- **Live-room** (T7): no real capture exists (Spec 024 B-04); the "enter class" affordance is a backendRequired gate, never a fake join/camera/mic/attendance-write.
- **Chat** (T13): future/backendRequired (Spec 024 B-06); NO teacher chat page and NO teacher chat nav item in 025 (the send-form was never captured — UNCONFIRMED); the admin-side preview stays owned by Spec 026. If chat is ever surfaced it is an honest planned/backendRequired gate only.
- **Library file actions**: upload/download/open/delete/sync are backendRequired gates — never fake.
- **Reports repoint**: the Spec 024-grandfathered teacher-home→teacher-performance anchor repoints to teacher-reports; the admin board link (if any) is demoted to admin-only. The pay-free contract exemption is superseded once the anchor no longer targets the admin shell.
- **Incomplete legacy evidence**: where a capability's legacy capture is thin/absent, the page gates it honestly (backendRequired/planned) and records the gap in `teacher-legacy-coverage.md` — never invents a SaaS feature.
- **Density**: not every page leads with a full idHero; secondary pages may use a lighter `pageHead` + `secHead` to avoid hero-fatigue while staying in the living-design language.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (teacher-schedule)**: MUST render sara's sessions as today + week agenda cards (time · course/group · room · authored student count · status chip · prep state), using dayRail/living primitives; the live-room affordance MUST be a backendRequired gate; no grid clone, no fake start/attendance-write. Grounded in T14.
- **FR-002 (teacher-students)**: MUST render sara's roster (st1/st6/st11/st13) as display-only cards (course/group label · calm learning signal from real outcome fixtures · next-session/latest-outcome context); zero form controls; any contact/message concept is a backendRequired gate. Grounded in T8; T12 duplicate excluded.
- **FR-003 (teacher-outcomes)**: MUST render the prepare→attend→record→review flowStrip + the five-field `classes-end` outcome checklist (attendance · remark · summary · homework note · files note) display-only, with example outcome states and honest review status; every save/submit is a backendRequired gate; no fake save/attendance-write. Grounded in T22/T3.
- **FR-004 (teacher-tasks)**: MUST render a task/follow-up board from `TEACHER_PREVIEW.tasks` with priority/status tags + due/next-class context; completion is a backendRequired gate; no fake completion. Grounded in T11/T16.
- **FR-005 (teacher-reports)**: MUST render academic-only reports (session completion · student-progress summaries · attendance/outcome quality · the monthly rubric dimensions: achievements · learning-progress · focus · homework · punctuality (+ rescheduled/support/objectives)) display-only, with export/download a backendRequired gate; NO computed score/rank/percentile/chart; **ZERO pay/finance/salary vocabulary**. Grounded in T9 + T20/T21. This page is the teacher-home performance anchor's repoint target.
- **FR-006 (teacher-profile)**: MUST render the account summary (identity · subjects/specializations · availability windows · teaching preferences) display-only; the three write controls (photo/save/password) are backendRequired gates; NO financial/pay information. Grounded in T23; T24 /profile 500 excluded.
- **FR-007 (teacher-library)**: MUST render resource cards from `TEACHER_PREVIEW.materials` (material · status · linked course/group) with upload/download as backendRequired gates and static filters if working; no fake upload/download/open/delete/sync. Grounded in T15.
- **FR-008 (nav conversion)**: The seven planned `ROLE_NAV.teacher` items (schedule/students/outcomes/tasks/reports/library/profile) MUST convert planned → implemented (real self-links, `aria-current` on the active page); home stays implemented; `plannedNavAnchors===0` holds; NO teacher chat nav item, NO teacher finance/pay nav item.
- **FR-009 (anchor repoint)**: The teacher-home performance anchor MUST repoint from `teacher-performance.html` (admin board) to `teacher-reports.html`; the Spec 024 pay-free contract exemption is updated to reflect that the teacher home no longer routes into the admin shell.
- **FR-010 (AR/EN + RTL/LTR)**: Every page MUST ship a complete AR (RTL default) + EN (LTR) pair; locales mirrored; no raw keys; no student-primary drift; no family payment tokens.
- **FR-011 (dark/light + mobile 390)**: Every page MUST support light/dark/system and render clean at mobile 390 (no overflow), reusing the additive living CSS layer; all motion inside the single `prefers-reduced-motion` block.
- **FR-012 (static gates, no fake actions)**: Every unavailable action (live-room, save/submit, upload/download, profile/password, task complete, export, contact) MUST be a labeled backendRequired/planned gate; zero `href="#"`, zero dead buttons, zero fake dynamic state.
- **FR-013 (teacher pay-free, absolute)**: No teacher-owned page/nav/locale key/comment/fixture/built output may contain the forbidden token set (salary/salaries/pay/payout/earnings/compensation/bonus/fine/fines/money/currency/راتب/رواتب/أجر/أتعاب/مستحقات/مكافأة/غرامة/فلوس/جنيه/ريال/دولار/EGP/SAR/USD/$/€/£). Enforced at three layers (source incl. comments · built · smoke payHit).
- **FR-014 (live-room future-backend)**: Live/room actions are backendRequired gates only; no fake enter/start/end-class, attendance-write, meeting/Zoom engine, or camera/mic controls.
- **FR-015 (chat future/backendRequired)**: No teacher chat page, no teacher chat nav item, no fake chat send/composer/unread/attachments/conversation engine; chat ownership stays with Spec 026 (admin preview).
- **FR-016 (library honest gates)**: Library file actions are backendRequired gates; no fake upload/download/open/delete/cloud-sync.
- **FR-017 (static-first, no new deps)**: Complete pre-rendered public pages; GitHub-Pages-compatible; no backend/API/auth/database/framework/CDN/external dependency/new storage key; `build-html.mjs` edited ONLY to register the 7 new pages; `package.json` untouched.
- **FR-018 (fixtures = authored static)**: Extend fixtures only as static authored teacher data (schedule rows · roster · outcome states · tasks · academic report summaries · profile fields · library resources · gate metadata); NO teacher salary/pay data, fake live-classroom/chat/notification data, or upload/download data implying real action.
- **FR-019 (count integrity)**: Public HTML MUST go from 77 → **91** (77 + 14); no accidental page removals; no unrelated page additions; the 40 admin + index + other role pages stay byte-identical except the teacher-portal anchor repoint (FR-009).
- **FR-020 (smoke/a11y/screenshots)**: Spec 025 MUST define smoke coverage (new load count, page loads, nav conversion + counts, no `href="#"`/dead/raw-key, no fake action buttons, pay-free source+built, honest chat/live-room/library gates, gated write actions, mobile 390), a11y (all 7 pages, AR+EN, dark/light, mobile 390, critical=0 serious=0), and screenshots (all 7 AR, ≥1 EN, teacher portal post-conversion, mobile, dark), + REVIEW.md update.
- **FR-021 (artifacts)**: Spec 025 MUST produce `spec.md`, `visual-grounding.md`, `teacher-legacy-coverage.md`, `teacher-page-scope.md`, `pay-free-risk-register.md`, `checklists/requirements.md`. This specify step does NOT generate plan.md/tasks.md and does NOT implement or commit.

### Key Entities

- **Teacher internal page**: one of the 7 pages; a portal-shell page (`shell: 'portal', role: 'teacher'`) with a page module, AR+EN output, and honest gates.
- **Teacher capability (T#)**: a legacy teacher capability from the Spec 015 T1–T27 map; each internal page realizes one or more T# with an evidence path.
- **Honest gate**: a labeled backendRequired/planned non-interactive control (no `href="#"`, no fake behavior).
- **TEACHER_PREVIEW slice**: retained static fixture data (followUps/recentSessions/tasks/materials/rubric/certificate) that each page renders.
- **Excluded pay surface**: T2/T17/T18/T19 — never rendered; pins the forbidden token set.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Public HTML count is exactly **91** after build (77 + 14); zero accidental removals/additions; 40 admin + index byte-identical.
- **SC-002**: All 7 teacher internal pages load in both languages; the 7 nav items are implemented self-links; `plannedNavAnchors===0`; no teacher chat/finance nav item.
- **SC-003**: The teacher pay-free scan is zero-hit at all three layers (source incl. comments · built · smoke `payHit`) across all 8 teacher-portal-family pages.
- **SC-004**: Every unavailable action is a labeled backendRequired/planned gate; zero `href="#"`, zero dead buttons, zero raw keys (smoke).
- **SC-005**: teacher-reports carries zero computed score/rank/percentile/chart and zero finance vocabulary; the teacher-home performance anchor targets teacher-reports.
- **SC-006**: a11y critical=0 serious=0 across all 7 pages (AR+EN, dark/light, mobile 390); no horizontal overflow at 390px.
- **SC-007**: Every page traces to a legacy T-capability in `teacher-legacy-coverage.md` (or is an honest gate with the gap recorded); no invented feature.
- **SC-008**: Live-room and chat remain future-backend/honest-gate (no fake join/send); library file actions gated.

## Assumptions

- Spec 024 is the **committed baseline** (HEAD `32c78c8`); the 7 `ROLE_NAV.teacher` planned items + the `book-open` library item already exist and only need status flips + real pages.
- The retained `TEACHER_PREVIEW` fixtures (followUps out15/out4 · recentSessions out1/out11 · tasks tk1/tk2 · materials tm1/tm2/tm3 · rubric dims · certificate lines) are the authored data source; new static rows may extend them without pay data.
- The living primitives in `portal-page.js` (idHero/dayRail/storyRow/flowStrip/guidePanel + kpiRow/plannedCard/gateNote/secHead/pageHead) are the building blocks; the additive `app.css` living layer is extended only as needed.
- The demo persona is sara (`data.t.sara`); no real auth.
- Expected count 91 is verified at preflight (currently 77) and re-verified after build.
- No new git branch; specs 013–025 all live on `feature/012-role-portal-foundation`.
- This specify step produces the spec + companion docs only.

## Scope

**May create/modify**: 7 `teacher-*.js` page modules · `fixtures/portal.js` · `ar.prt.js`/`en.prt.js` · `app.css` · `build-html.mjs` (register the 7 pages ONLY) · `tests/{smoke,a11y,screenshots}` · `screenshots/REVIEW.md` · `README.md` · CLAUDE.md · `specs/016/023/024/025` docs · the teacher-home performance anchor (repoint) in `teacher-portal.js`.

**May generate**: the 14 `teacher-{schedule,students,outcomes,tasks,reports,profile,library}(.en).html` pages.

**Must NOT create**: teacher-chat / teacher-finance / teacher-salary / teacher-pay / teacher-live-room page; backend/API/auth.

**Must NOT modify**: `package.json`; external deps; admin/family/student page modules; backend files. `build-html.mjs` only registers the 7 new pages.

**This specify step**: docs only — no implementation, no plan.md/tasks.md, no commit/push.

# Feature Specification: Corrections From Legacy Coverage Audit

**Feature Branch**: `feature/012-role-portal-foundation` (repo convention: specs 013–024 all specified on this branch; no new branch created)
**Feature Directory**: `academy-dashboard-discovery/specs/024-corrections-from-legacy-coverage-audit`
**Created**: 2026-07-07
**Status**: Draft
**Input**: User description: "Corrections From Legacy Coverage Audit — implement the Spec 023 correction backlog (B-01…B-11) before Spec 025 Teacher Internal Pages. Correction/alignment spec, not new feature pages."

## Overview

Spec 023 completed the Full Legacy Coverage Audit 000–022 and found **no P0 blockers and no product drift**, but produced a correction backlog (`correction-backlog-for-024.md`, B-01…B-18) that must be closed before Teacher Internal Pages (Spec 025) proceed. Spec 024 is a **correction and alignment spec** — it implements the Must-Fix and Should-Fix backlog items and records the documentation/decision items. It adds **no new pages, no backend, and no fake behavior**; it changes copy/framing, adds honest gates, records decisions/provenance, verifies a possible regression, and runs one small pure-CSS visual-density pass.

This spec.md defines WHAT must be corrected and WHY. The exact per-item implementation scope lives in the companion `correction-scope.md`; the evidence each correction rests on lives in `evidence-review.md`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Child-view wording matches the corrected role model (Priority: P1)

A guardian (or reviewer) opening any child-view page reads framing that says this is the family-owned child view — never "your student dashboard" as if Student were a primary role.

**Why this priority**: B-01 is the only Must-Fix that changes a visible, confirmed role-model contradiction (F-00-1). It is the top child-view correction candidate and gates a clean Spec 025 start.

**Independent Test**: Grep the built child-view pages for the forbidden primary-role wording «لوحة الطالب»/«بوابة الطالب» / "Student Portal"/"student dashboard"; the note now reads child-view / family-owned framing.

**Acceptance Scenarios**:

1. **Given** the six child-view pages carrying the leftover note, **When** the correction ships, **Then** `grep "لوحة الطالب" app/public/student-*.html` returns zero and the note reads «عرض الابن»-family wording (ar) / "Child view — part of the family account" (en).
2. **Given** the note lives inside hash-pinned `#page-body` regions, **When** the correction rebakes those pages, **Then** the affected extraction hashes are re-recorded as a declared, intentional baseline change and smoke passes.

---

### User Story 2 - Every legacy capability has an honest owner or gate before more building (Priority: P1)

A product owner reviewing the app before Spec 025 sees that the audit's Must-Fix ownership/gate decisions (Locations owner, notifications gate, live-room decision) are resolved — nothing is silently missing or faked.

**Why this priority**: B-02, B-03, B-04 are the remaining Must-Fix items; they close the last honest-coverage gaps the audit found.

**Independent Test**: The coverage/sequence docs name an owner for Locations; notifications appear only as an honest backendRequired gate or a recorded futures entry (no fake count/read state); the live-room is recorded as future-backend or backed by fresh evidence.

**Acceptance Scenarios**:

1. **Given** the admin RBAC Locations group had no owner, **When** the decision ships, **Then** a written owner (Spec 031) is recorded and, if surfaced, appears only as an honest planned/backendRequired note.
2. **Given** notifications had no role-portal surface, **When** the correction ships, **Then** either an honest gate reusing the existing pattern exists (no new hook, no fake badge/count) or a futures-register entry is recorded.
3. **Given** the teacher live-room was never captured, **When** the decision ships, **Then** it is recorded future-backend (or backed by a fresh capture) and no fake enter/end-class/attendance-write behavior is added.

---

### User Story 3 - Teacher internals are honestly gated and pay-free before Spec 025 (Priority: P2)

A developer about to build Teacher Internal Pages sees that teacher library and chat are honestly classified/gated, the teacher→performance anchor's pay-free exemption is recorded, and no teacher surface carries any pay token.

**Why this priority**: B-05, B-06, B-07 are Should-Fix items that de-risk Spec 025's scope and protect the teacher pay-free GLOBAL law.

**Independent Test**: Teacher library has an honest planned gate or a recorded fold decision (owner 025); chat is classified backendRequired/future with no fake send; the pay-free contract carries a written exemption for the pre-existing Spec 007 admin board; the pay-free token scan stays green on all teacher surfaces.

**Acceptance Scenarios**:

1. **Given** teacher library had no visible gate, **When** the correction ships, **Then** it has an honest planned «قريبًا» presence or a recorded 025 fold decision — never a fake page.
2. **Given** the teacher→`teacher-performance.html` anchor lands in an admin shell with pay-named nav, **When** the exemption is recorded, **Then** the pay-free contract documents it and schedules the 025 repoint; the teacher-portal pay-token scan remains zero-hit.

---

### User Story 4 - Intentional exclusions and boundaries are provenance-recorded (Priority: P2)

A QA engineer (and the Spec 032 no-missing audit) can see every intentional exclusion named with its governing law, so nothing reads as an unexplained gap and no future pass "restores" a law-excluded surface.

**Why this priority**: B-08/B-09 are documentation Should-Fixes that make the exclusion scope durable and auditable.

**Independent Test**: The exclusion/provenance records name teacher pay surfaces, family Amount, chart/score engines, fake-action engines, the finance/payroll boundary, notifications/shortcuts, and the admin invoice-amount boundary — each with the law that governs it.

**Acceptance Scenarios**:

1. **Given** the audit's excluded-by-law items, **When** the provenance records ship, **Then** each appears in a correction/coverage doc (and README/CLAUDE where appropriate) with its law cited, and the admin-invoice-amount vs pay-figure boundary is stated in one sentence.

---

### User Story 5 - No living-rework capability was silently dropped, and weak sections read better (Priority: P2)

A designer/reviewer confirms that Spec 022's living rework did not delete any prior entry point (moved content is still reachable), and that the weakest empty/underfilled living sections got a small honest polish.

**Why this priority**: B-10 protects the no-deletion law; B-11 addresses the owner-valued visual-quality debt — both Should-Fix, low-risk.

**Independent Test**: Each prior important entry point is still reachable (real link or honest gate); the addressed design-register rows (D-01/D-04…D-13 as scoped) show a before/after improvement with motion still accessible and no new hooks/pages.

**Acceptance Scenarios**:

1. **Given** the pre-022 rails carried prep-hint/count content, **When** B-10 verification runs, **Then** the content is proven moved (reachable) or restored as a real link/honest gate — never left deleted.
2. **Given** the empty-heavy living sections, **When** B-11's pure-CSS pass ships, **Then** the scoped sections read fuller (better empty-state copy, compact tiles, richer rail cards, dark-hero wash) with reduced-motion honored and zero new hooks/pages/engines.

---

### Edge Cases

- **B-01 hash pins**: the leftover note sits inside byte-frozen `#page-body` regions (Spec 022 law). The correction MUST declare a supersession of the affected extraction hashes and re-pin smoke — never bypass the assert.
- **B-01 scope trap**: only the STUDENT child-view note is wrong. The parallel family («لوحة العائلة») and teacher («لوحة المعلم») notes are CORRECT (those are primary roles) and MUST NOT be changed.
- **B-03 admin already gated**: the admin shell already has an honest notifications gate; B-03 must NOT duplicate or re-engineer it — it targets the role-portal shell (family/teacher/student) decision only, reusing the existing honest pattern.
- **B-04**: if no live-session capture is feasible, the room is recorded future-backend; teacher pages may show live/room actions only as honest gates — no fake enter/end/attendance write.
- **B-11 byte-freeze**: any density fix touching a hash-pinned body ships with a declared hash supersession + one sanctioned smoke amendment; fixes confined to the additive living CSS layer do not.
- **Do-not-fix items**: B-12…B-18 (later/do-not-fix in the backlog) are NOT implemented here except where the backlog marks a documentation record as needed now (B-15 finance-boundary note folds into B-09; B-17 family-children-no-fold-link protection folds into B-10's verification record).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (B-01 child-view wording)**: The child-view note copy MUST be reframed (ar+en) to child-view / family-owned wording; the six affected built pages MUST be rebaked; the affected `#page-body` extraction hashes MUST be re-recorded as a declared baseline change; smoke MUST be re-pinned and pass. Forbidden wording «لوحة الطالب»/«بوابة الطالب»/"Student Portal"/"standalone student dashboard" MUST NOT appear in any child-view surface. The family/teacher role notes MUST be left unchanged.
- **FR-002 (B-02 Locations owner)**: An ownership decision for the admin RBAC Locations capability MUST be recorded (default owner: Spec 031, as a settings/general display slice). No full Locations page is built in Spec 024; if any current surface can carry an honest planned/backendRequired note, it MAY be added, otherwise the owner is documented in the coverage/sequence records.
- **FR-003 (B-03 notifications gate)**: Notifications on the role-portal surfaces MUST be either (a) an honest gate reusing the existing honest pattern (no new hook, no fake count/read/unread/popover behavior beyond the existing Soon-badged pattern) or (b) a recorded futures-register entry. If UI text is added, smoke/a11y coverage MUST be added. The admin notifications gate MUST NOT be duplicated or altered.
- **FR-004 (B-04 live-room decision)**: The teacher live-room MUST be recorded as future-backend (or backed by a fresh capture if feasible within existing evidence). Teacher surfaces MUST show any live/room action only as an honest gate; no fake enter-class/end-class/attendance-write is added.
- **FR-005 (B-05 teacher library gate)**: Teacher library MUST have an honest planned/backendRequired presence (owner Spec 025) — either an honest «قريبًا» nav/section entry or a recorded fold-into-an-owned-025-page decision. No teacher internal page is built here.
- **FR-006 (B-06 chat ownership/gate)**: Chat MUST be classified backendRequired/future with a recorded owner (teacher-side decision: honest «قريبًا» item in 025 vs explicit exclusion with admin preview staying 026). Any surface mentioning chat MUST use an honest gate; no fake chat send. The send-form stays UNCONFIRMED (never invent fields).
- **FR-007 (B-07 pay-free exemption record)**: The teacher pay-free GLOBAL contract MUST record a written exemption for the pre-existing Spec 007 admin `teacher-performance` board (body pay-free + smoke-asserted; the admin-shell nav chrome is the reason) AND schedule the Spec 025 repoint of the home→performance anchor. No teacher surface gains any pay wording; the pay-free token list stays binding.
- **FR-008 (B-08/B-09 exclusion + boundary provenance)**: Provenance records MUST be added for the intentional exclusions (teacher pay surfaces, family Amount/payment, chart/score engines, fake-action engines, finance/payroll UI boundary, notifications/shortcuts) and for the finance boundary (authored admin invoice-amount literals are Spec-009-sanctioned; salary/payroll/compensation figures are NEVER allowed; family/teacher stay figure-free). Records go in the correction/coverage docs and README/CLAUDE where appropriate.
- **FR-009 (B-10 rail moved-vs-deleted)**: The correction MUST verify against the Spec 022 contracts that no prior important entry point / rail content was silently deleted by the living rework; moved content MUST be proven reachable; anything genuinely missing MUST be restored as a real link or honest gate. The result (moved vs restored) MUST be recorded.
- **FR-010 (B-11 visual-density pass)**: A small pure-CSS visual-density polish MUST address the scoped design-register rows (empty-heavy rails, stat-void tiles, underfilled week strip, family-children static roster, dark-hero wash, hub empty slot, delight gaps, mobile topbar as scoped) — improving empty-state copy/spacing/story lines only. Forbidden: large redesign, new pages/workflows, decorative bloat, fake actions, new hooks, chart/animation engines. Rows touching hash-pinned bodies ship with a declared hash supersession.
- **FR-011 (evidence-grounded)**: Every correction MUST cite its Spec 023 backlog ID and the exact current file(s) it touches; no correction may be invented or added beyond the backlog's Must/Should-Fix set (plus the folded documentation records noted in Edge Cases).
- **FR-012 (no new scope)**: Spec 024 MUST NOT create new pages, teacher/admin internal pages, backend/API/auth, a real live room, real chat, a real notifications engine, real payment, teacher pay surfaces, family payment surfaces, or any new chart/score/animation engine, framework, or CDN.
- **FR-013 (hard laws preserved)**: Static HTML-first · no fake actions · no `href="#"` · no raw keys · teacher pay-free GLOBAL · family zero-pay · student demoted-not-deleted · family owns the child journey · admin/family/teacher primary roles · 77 public HTML count · mobile 390 · dark/light · RTL/LTR · `prefers-reduced-motion` — all MUST hold.
- **FR-014 (artifacts)**: Spec 024 MUST produce `spec.md`, `evidence-review.md`, `correction-scope.md`, `checklists/requirements.md`, and append-only correction-status notes to Spec 023 if needed. It MUST NOT generate plan.md/tasks.md, and MUST NOT commit/push.

### Key Entities

- **Correction item (B-NN)**: a Spec 023 backlog entry with a priority (Must/Should/Later/Do-not-fix), the current files it touches, and acceptance criteria — Spec 024 implements the Must/Should set.
- **Child-view note**: the `noteT`/`noteD` locale pair rendered inside child-view `#page-body` regions (the F-00-1 leftover).
- **Honest gate**: a labeled, non-interactive backendRequired/planned control (no fake behavior, no `href="#"`).
- **Provenance record**: a documentation entry naming an intentional exclusion or a boundary with its governing law.
- **Hash supersession**: a declared, intentional re-recording of a byte-frozen `#page-body` extraction hash + smoke re-pin.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero occurrences of forbidden primary-role wording («لوحة الطالب»/«بوابة الطالب» / "Student Portal"/"student dashboard") on any child-view surface (grep-verifiable); the family/teacher role notes are byte-unchanged.
- **SC-002**: All four Must-Fix items (B-01…B-04) are implemented or recorded per their acceptance criteria; the Locations owner, notifications disposition, and live-room disposition are each written down.
- **SC-003**: All seven Should-Fix items (B-05…B-11) are implemented or explicitly deferred with a reason; none is silently dropped.
- **SC-004**: The teacher pay-free token scan is zero-hit on all teacher surfaces after the changes; the family zero-pay `famPay` scan stays green on all family bodies.
- **SC-005**: Public HTML count remains exactly 77; zero new pages, zero new `data-*` hooks, zero new storage keys, zero `href="#"`.
- **SC-006**: Any `#page-body` change ships with a declared hash supersession and a re-pinned smoke assertion; the smoke, a11y, and screenshot suites are green after the corrections.
- **SC-007**: The B-10 verification produces a written moved-vs-deleted determination; no prior important entry point is left deleted.
- **SC-008**: Spec 025 (Teacher Internal Pages) can start immediately after Spec 024, with B-04/B-05/B-06/B-07 closed (the GO-conditional gate from Spec 023).

## Assumptions

- Spec 023 is present as the audit baseline (its folder is on disk; the working tree at HEAD `837b0c1` is the baseline). Spec 023 is **not yet committed** — it is used as the working-tree baseline; this is reported, not blocking.
- B-01 targets ONLY the student child-view note (`ar.prt.js:297-298` / `en.prt.js:294`); the family/teacher notes are correct and out of scope.
- B-03's honest notifications pattern already exists in the admin shell (`enhance.js` `notificationsMenu()`, Soon-badged, aria-disabled); the role-portal shell (`portal-shell.js`) has no notifications surface — B-03's decision is scoped to the role portals and reuses that existing pattern (no new hook) or a futures-register record.
- Owner-spec sequencing follows Spec 021 DEC-009 (025 Teacher internals, 026–031 admin groups, 032 final QA).
- This spec produces the spec + companion docs only; implementation, plan.md/tasks.md, and commits are out of scope for the `/speckit-specify` step (a later `/speckit-plan` and `/speckit-implement` carry the build).
- No new git branch is created: repo convention since Spec 013 keeps all spec work on `feature/012-role-portal-foundation`.

## Scope

**May modify (when implemented in a later phase):** student/child-view copy & framing · family-child fold-point copy if needed · portal hub copy if needed · teacher/family/admin honest gates · locales (ar/en) · fixtures if needed · small `app.css` living-layer density fixes · smoke/a11y/screenshots docs · README/CLAUDE · append-only Spec 023 correction-status notes.

**Must NOT implement:** new pages · teacher internal pages · admin internal pages · backend/API/auth · real live room · real chat · real notifications engine · real payment · teacher pay surfaces · family payment surfaces · new chart/score/animation engine · new framework/CDN.

**This `/speckit-specify` step produces the spec + companion docs only** — no code changes, no plan.md/tasks.md, no commit, no push.

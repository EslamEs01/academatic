# Feature Specification: Family / Guardian Dashboard (Spec 014)

**Feature Branch**: `feature/014-family-guardian-dashboard` *(proposed; branching is user-controlled — spec authored on `feature/012-role-portal-foundation`)*
**Created**: 2026-07-03
**Status**: Draft
**Input**: User description: "/speckit.specify Family Guardian Dashboard — Spec 014 deepens the Family/Guardian Portal (Spec 012 foundation) into a rich, calm, parent-friendly one-page family dashboard. Owns the Family Dashboard only; student (013 done), teacher (015), operations/comms (016), admin missing modules (017), final QA (018) stay out. Calm, trustworthy, child-centered, Arabic-first, premium, mobile-first, not admin-like, not a legacy clone. Capability coverage from the Spec-012 legacy artifact; honesty + admin/student/teacher/hub protection binding; ZERO fake payment/cancel/upload/feedback-submit."

## Context & Vision

Spec 012 (commit `5bcf490`) shipped the role-portal foundation; Spec 013 (commit `86729a9`) deepened the **student** dashboard. The family portal foundation (`family-portal.html` / `family-portal.en.html`, persona **fam1** — guardian «أبو سلمان الغامدي», children st1/st6/st11/st12/st13) today renders: guardian hero · children overview (5 cards) · today's sessions · a 3-tile attendance/progress preview · teacher-notes preview · 3 planned cards (billing backendRequired / meetings / subscriptions) · Spec-014 note.

Spec 014 turns that foundation into **the guardian's reassuring control center** — a single calm page that answers, at a glance: *How are my children doing? What sessions do they have today? Is anyone absent or behind? What did teachers say recently? Are there billing/subscription issues? Do I need to take action?* It graduates the three planned cards into honest sections and adds the guardian-owned legacy capabilities (subscriptions, billing status, cancel/reschedule/absence requests, feedback-about-teacher, meetings, request-trial/add-child, materials, account slice) — all fixture-authored, honest, and engine-free.

**Product direction (binding):** calm · trustworthy · comfortable · very easy · clear · parent-friendly · child-centered · Arabic-first · premium · mobile-first · warm · human · creative · **not admin-like** · not table-heavy · not corporate · **not a legacy clone**. A reassuring parent control center, never an admin console.

**Series position:** Spec 015 = Teacher Dashboard · Spec 016 = Role-Portal Operations / Communications shell · Spec 017 = Admin Missing-Modules Coverage · Spec 018 = Final Full-Product QA. Spec 014 must not pre-implement any of their surfaces.

## Legacy Capability Inheritance *(binding input — no silent gaps)*

From `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` §2 (all 13 guardian pages classified F1–F17) plus §7 (Spec-013 deliveries), Spec 014 owns the guardian-facing capabilities. Classification for every family/student legacy capability is exactly one of: **delivered-014 · already-delivered-013 · planned-015 · planned-016 · backendRequired · future-role-deep · intentionally-excluded.**

**Delivered by Spec 014 (display-only / honest previews):**
- **F1** guardian home widgets → the deep guardian hero + children overview + today band.
- **F2** multi-child overview / child proxy → the children overview (all five children visible inline — the switcher legacy pattern becomes "everyone at once", a genuine improvement).
- **F7** subscriptions / plans (`/student/studentslist` "All Account Subscriptions") → subscriptions preview (status/plan labels, **zero amounts**).
- **F9** billing ledger (view-only) → billing **status** preview (calm settled/attention summary, **zero amounts**, no pay control; real figures/payment stay backendRequired).
- **F10** feedback / meetings (`/student/feedbacks`) → meetings preview (status + planned request).
- **F16** teacher-notes preview (already a foundation slice) → deepened teacher-notes section.
- The **guardian slice of F6** (class history + per-session details) → history/session-feedback preview per child (the student view shipped in 013; this is the guardian mirror).
- The **guardian/family slice of F5** (timetable) and **F12** (materials) → a family materials preview + a today/coming-sessions view (the deep student timetable shipped in 013).

**Request/authoring capabilities — honest previews, submit stays gated:**
- **F3** today's sessions + request-cancel/reschedule → cancel/reschedule/absence **request preview** (labeled planned/backendRequired; the "no replacement" warning shown as honest copy; NO submit).
- **F8** feedback-about-teacher rubric → rubric **preview** (dimensions display-only; submit backendRequired).
- **F11** request-trial / add-child wizard → trial-request **preview** (new-vs-existing child distinction display-only; submit backendRequired).
- **F13** guardian profile/account edit → account **slice** (contact display-only; editing backendRequired). **F14** `/student/profile` 500 stays intentionally-excluded (rebuilt from the working edit surface, not the error).

**Stays gated / out (unchanged classification):**
- **F4** file/voice upload → **backendRequired** (never faked — no upload/record control).
- Real payment/renewal → **backendRequired** (billing status only, zero amounts, no pay-now).
- **planned-016**: any real request submission / notification / messaging engine (the Communications shell).
- **intentionally-excluded**: the `/profile` 500 (F14), the Dashboard-1 404 (F15), the dual-badge bug (F17).

**Do NOT copy** legacy visuals/layout/classes/colors/icons/private-wording/broken-routes/numeric-status-codes/dense-tables/weak-patterns. **Do improve** multi-child clarity, daily overview, progress clarity, teacher notes, history, subscriptions/billing clarity, cancel/reschedule clarity, feedback flow, trial requests, materials access, mobile comfort, empty states, microcopy.

**Capture-verified grounding (re-read this session from `output/roles/family/` + planning docs, not memory):** legacy billing was **genuinely view-only** — a money sweep of all 13 guardian pages found the *only* money reference to be the Billing table's "Amount" column header (zero rendered figures, no pay button, no pay form anywhere); this hard-validates FR-009's zero-amount / no-pay-now line. Legacy had **no global child-switcher** — child scoping was per-page `<select>` dropdowns; a top-bar switcher was a rebuild aspiration, not a legacy feature — validating FR-002's everyone-visible-at-once decision over a fake switcher. The feedback-about-teacher rubric fields (see-hear · likes · complaints · comment · rating · interactivity), the request-cancel "no replacement" warning, the request-trial new-vs-existing-child two-step wizard, and the file/voice (MediaRecorder) upload are all captured — mapped to FR-010/FR-011/FR-013 previews and the backendRequired upload gate respectively. The legacy anti-patterns to beat: the 10-column today-sessions table, 8-column subscriptions/billing tables, and zero empty-state design — which is why the spec mandates cards, gentle signals, and designed empty states.

## Page Strategy *(decided)*

**One strong page.** Spec 014 upgrades the existing `family-portal.html` / `.en.html` pair in place — no new family pages. Every owned capability fits as a section of one calm control center; a single page keeps the parent's cognitive load low (the core value), and the child-centered story reads best top-to-bottom. Any plan-time page proposal carries the burden of proof (static, bilingual, portal-shell, reachable only from the portal/hub, never admin nav).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Guardian instantly understands the family day (Priority: P1) 🎯 MVP

As the guardian (fam1), I open my dashboard and within one glance I know how my children are doing today and whether I need to act — greeted calmly by name with a today-focused reassurance and a clear next-action hint.

**Why this priority**: "How are my children doing / do I need to act" is the experience-defining promise; every section supports it.

**Independent Test**: Open `family-portal.html` — hero + children overview + today band render with fam1's fixture truth in a calm order before deep scrolling; the "how/today/act" questions are answerable without reading any table.

**Acceptance Scenarios**:

1. **Given** the Arabic page, **When** it loads, **Then** the hero greets the guardian by fixture name with a today-focused reassurance and a next-action hint — no fake notification count, no baked calendar date.
2. **Given** any area whose truthful content is empty, **When** it renders, **Then** a reassuring designed empty state appears (never a blank card, never a technical message).

---

### User Story 2 - All children clear; focus without confusion (Priority: P1)

As the guardian, I see all five children at once as clear cards (name, level, status, gentle progress, today's status) so I never lose a child; any deeper per-child drill is honestly a preview, never a fake switch that changes nothing.

**Why this priority**: The multi-child pattern is the family portal's defining structure; the legacy "choose child" proxy is replaced by everyone-visible-at-once.

**Independent Test**: All five fam1 children render as cards with distinct real data (st1 78% math, st6 33% science, st11 41% math with an absence follow-up, st12 28% science, st13 15% english trial); no control claims to switch content it does not actually change.

**Acceptance Scenarios**:

1. **Given** the children overview, **When** it renders, **Then** all five fam1 children appear with name, level, labeled status chip, and a gentle progress indicator, each from fixtures.
2. **Given** a child with a real attention signal (st11 absence follow-up / st13 trial), **When** shown, **Then** the signal is a gentle labeled chip, not an aggressive warning, and not computed.
3. **Given** any "focus/expand child" affordance, **When** present, **Then** it either genuinely toggles pre-rendered content via an existing hook OR is a labeled display-only preview — never a control that appears to switch but does nothing.

---

### User Story 3 - Today's sessions across children (Priority: P1)

As the guardian, I see today's sessions across my children as friendly cards (time / course / teacher / which child / status) so I know the family's day; no fake join and no fake cancel.

**Independent Test**: The today band shows fam1 children's sessions from fixtures with the child clearly associated and a labeled status chip; no join/cancel control acts.

**Acceptance Scenarios**:

1. **Given** the today band, **When** it renders, **Then** each session shows time/course/teacher, the associated child, and a labeled status chip from fixtures, with clear "what to know" wording.
2. **Given** the session cards, **When** inspected, **Then** no join-styled control and no acting cancel button exist (cancel is the request-preview section, US6).

---

### User Story 4 - Attendance, progress, teacher notes — calm (Priority: P1)

As the guardian, I see per-child progress, gentle attendance signals (including a real "needs a little attention" where the fixtures show one), and recent teacher notes — calm, never a scary KPI wall, never a computed score.

**Independent Test**: Progress + attendance signals + teacher-notes sections render from fixtures/authored literals with labeled chips and localized digits; no computed grade/rank; the absence follow-up (st11) and trial (st13) surface honestly.

**Acceptance Scenarios**:

1. **Given** the progress area, **When** rendered, **Then** each child's progress is an authored/fixture literal (display-only), Arabic-Indic on AR, with no computed score.
2. **Given** the attendance signals, **When** rendered, **Then** they derive from real outcome fixtures (attended/upcoming/absence-follow-up/trial-cancel) as gentle labeled chips — not an aggressive alarm.
3. **Given** the teacher-notes section, **When** rendered, **Then** recent notes show the summary/homework-note shape with a clear child association, display-only.

---

### User Story 5 - Billing & subscriptions without fake payment (Priority: P1)

As the guardian, I see my subscription/plan state and a calm billing **status** — with **zero amounts** and **no pay-now** — so I know if anything needs attention; real figures and payment are honestly backend-gated.

**Why this priority**: The #1 honesty landmine — the finance surface must never look payable, and no pay figure may appear (carrying the project-wide zero-pay-figures spine).

**Independent Test**: Subscriptions preview shows per-child plan/status labels (no price); billing shows a status summary (settled/attention) with zero currency figures and a labeled backendRequired "view invoices / pay" gate; grep finds zero amounts/pay controls.

**Acceptance Scenarios**:

1. **Given** the subscriptions preview, **When** rendered, **Then** each child's plan appears as a status/label (active/trial) with no monetary amount and no renewal control.
2. **Given** the billing preview, **When** rendered, **Then** it is a calm status summary with ZERO currency figures, no pay-now button; the deeper billing/payment is a labeled backendRequired gate.
3. **Given** both built files, **When** grep-inspected, **Then** zero currency tokens (SAR/ريال/amount figures) and zero pay-control affordances.

---

### User Story 6 - Requests honest: cancel / reschedule / trial (Priority: P2)

As the guardian, I see what I can request — cancel/reschedule a session (with the honest "no replacement" caution), request a trial, add a child, give teacher feedback, ask for a meeting — but every submit is a labeled planned/backendRequired control; nothing fakes a backend action.

**Independent Test**: The requests/feedback sections render the request kinds and the feedback-about-teacher + trial + meetings previews; every actionable control is a labeled disabled/planned affordance or display-only; no submit fires.

**Acceptance Scenarios**:

1. **Given** the cancel/reschedule/absence preview, **When** rendered, **Then** it explains what can be requested (with the "no replacement" caution as honest copy) and the request control is labeled planned/backendRequired — never an acting submit.
2. **Given** the feedback-about-teacher rubric preview, **When** rendered, **Then** the rubric dimensions are display-only and submit is backendRequired — no fake submission.
3. **Given** the request-trial / add-child preview, **When** rendered, **Then** the new-vs-existing-child distinction is shown display-only and submit is backendRequired.
4. **Given** the meetings preview, **When** rendered, **Then** meeting status shows and requesting a meeting is a labeled planned control.

---

### User Story 7 - History, feedback, and materials (Priority: P2)

As the guardian, I read recent session history/feedback per child and browse child-related materials — display-only; the full history and downloads are honestly gated.

**Independent Test**: The history section shows recent per-child session records (summary/homework/remark shape); materials render as display-only cards; full-history and download are labeled planned/backendRequired.

**Acceptance Scenarios**:

1. **Given** the history section, **When** rendered, **Then** recent per-child records show the summary/homework-note shape display-only, with the full-history surface a labeled planned control (no fake detail route).
2. **Given** the materials preview, **When** rendered, **Then** cards are display-only (or real safe local links where they exist); download is a labeled backendRequired gate.

---

### User Story 8 - Beautiful on mobile (Priority: P1)

As a guardian mostly on a phone, the dashboard is a comfortable single-column flow at 390px — no horizontal overflow, touch-friendly, readable Arabic type, calm spacing.

**Independent Test**: 390px screenshot + smoke computed-layout check: no horizontal scroll; sections and child cards stack cleanly.

**Acceptance Scenarios**:

1. **Given** the AR page at 390px, **When** captured, **Then** zero horizontal overflow and a clean single-column card flow.

---

### User Story 9 - Bilingual, RTL/LTR, themed, localized digits (Priority: P1)

Arabic RTL default and English LTR both render completely; light/dark/system pass contrast; every number on Arabic pages uses Arabic-Indic digits.

**Independent Test**: Both files load with zero raw i18n keys; smoke digit-locale assertions pass; a11y critical=0 serious=0 on all family scenarios including dark.

**Acceptance Scenarios**:

1. **Given** `family-portal.html` (AR), **When** scanned, **Then** counters/percentages render Arabic-Indic and layout is RTL-correct; the EN page mirrors LTR.
2. **Given** dark mode, **When** audited, **Then** all new family surfaces pass with zero critical/serious issues (ink-strength accent-token discipline carried from Specs 012/013).

---

### User Story 10 - Student, teacher, hub, admin protected (Priority: P1)

Nothing outside the family surface changes: all 40 admin files stay content-identical; `student-portal`, `teacher-portal`, and `portals` built pairs stay byte-identical; no admin nav/body change ever.

**Independent Test**: Hash-compare 40 admin files + student/teacher/hub pairs vs HEAD (byte-identical); admin-scoped smoke assertions re-run verbatim green; the Spec-013 student smoke branch re-runs unchanged.

**Acceptance Scenarios**:

1. **Given** the post-014 build, **When** hashed against HEAD, **Then** all 40 admin files AND the student/teacher/hub built pairs are byte-identical (default; any deviation must be a spec-sanctioned, itemized shared-key/shell change proven unavoidable).
2. **Given** the admin console, **When** crawled, **Then** zero portal references exist in any admin file.

---

### User Story 11 - Legacy family/student capabilities accounted for (Priority: P1)

Every legacy family/student capability is delivered here, already delivered in 013, or explicitly classified (planned-015/016, backendRequired, future-role-deep, intentionally-excluded) — no silent gaps.

**Independent Test**: The coverage artifact gains a Spec-014 delivery-notes section mapping F1–F17 to their 014 disposition; every row accounted for.

**Acceptance Scenarios**:

1. **Given** the coverage diff, **When** reviewed, **Then** each guardian row (F1–F17) carries a Spec-014 disposition note preserving its original classification; zero silent gaps.

---

### User Story 12 - Screenshots prove it (Priority: P1)

Visual acceptance proves the dashboard is calm, complete, parent-friendly, and unmistakably not admin-like — plus unchanged-proof frames for student/teacher/hub/admin.

**Independent Test**: The Spec-014 screenshot matrix captures with zero console errors and passes the failure-condition review recorded in `screenshots/REVIEW.md`.

**Acceptance Scenarios**:

1. **Given** the captured frames, **When** reviewed against the failure conditions, **Then** every frame passes and the verdict table is recorded.

---

### Edge Cases

- **Zero amounts everywhere** — the family fixture carries `hourRate`/`plan` cost data; the dashboard MUST NOT surface any of it. Billing/subscriptions are status-only; this is the hard finance line (project-wide zero-pay-figures spine).
- **Multi-child at 390px** — five child cards must stack cleanly; long Arabic names wrap (`min-width:0`), no overflow.
- **Gentle vs aggressive signals** — the real st11 absence-follow-up and st13 trial-cancel must read as calm "needs a little attention", never alarming red walls.
- **Fake-switch trap** — the children pattern must not present a switcher that appears to change content but doesn't; render everyone inline (or a real baked toggle via an existing hook / a labeled preview).
- **Smoke drift from graduating planned cards** — the Spec-012 smoke pins family planned-card count = 3; as billing/meetings/subscriptions graduate, that count/semantics change. The family branch of the portal smoke block MUST be re-scoped in the same change (sanctioned reconciliation, like Specs 012/013) — never deleted, never loosened for other pages; the student branch and admin/teacher/hub asserts stay byte-verbatim.
- **Stale-date honesty** — no baked calendar date/countdown; "today"-relative framing only.
- **i18n overlay safety** — new keys extend the `prt.fam.*` namespace; shared `prt.shell.*`/`prt.portal.*`/`prt.role.*` and the `prt.stu.*`/`prt.tch.*` sibling namespaces must not change (they would ripple into student/teacher/hub built files and break byte-identity).

## Requirements *(mandatory)*

### Functional Requirements

**Guardian experience**

- **FR-001**: The dashboard MUST open with a calm guardian hero: fam1 guardian name, a family summary, a today-focused reassurance, and a next-action hint — no fake notification count, no baked calendar date.
- **FR-002**: A children overview MUST render all five fam1 children as clear cards (name, level, labeled status chip, gentle progress) from fixtures; the multi-child pattern shows everyone at once, and any focus/expand affordance is a real baked toggle (existing hook) or a labeled display-only preview — never a fake switch.
- **FR-003**: A today's-sessions band MUST present the family's sessions as cards (time/course/teacher/child/status chip) from fixtures with clear "what to know" wording; no fake join, no acting cancel.
- **FR-004**: A per-child progress area MUST visualize authored/fixture progress literals display-only — no computed grade/rank/score, no KPI wall.
- **FR-005**: An attendance-signals area MUST surface gentle labeled signals from real outcome fixtures (including the st11 absence follow-up and st13 trial/cancel) — calm, never aggressive, never computed.
- **FR-006**: A teacher-notes section MUST present recent notes in the summary/homework-note shape with a clear child association, display-only.
- **FR-007**: A history/session-feedback section MUST present recent per-child records (summary/homework/remark shape) display-only; the full-history surface is a labeled planned control (no fake route).
- **FR-008**: A subscriptions/plans preview MUST show per-child plan/status labels with **zero monetary amounts** and no renewal control.
- **FR-009**: A billing preview MUST be a calm view-only **status** summary with **zero currency figures** and **no pay-now**; deeper billing/payment is a labeled backendRequired gate.
- **FR-010**: A cancel/reschedule/absence-request preview MUST explain what can be requested (with the "no replacement" caution as honest copy) and gate the request as a labeled planned/backendRequired control — no acting submit.
- **FR-011**: A feedback-about-teacher preview MUST show the rubric dimensions display-only with submit as a labeled backendRequired control — no fake submission.
- **FR-012**: A meetings preview MUST show meeting status with requesting a meeting as a labeled planned control.
- **FR-013**: A request-trial / add-child preview MUST show the new-vs-existing-child distinction display-only with submit as a labeled backendRequired control.
- **FR-014**: A materials preview MUST render child-related material cards display-only (or real safe local links where they exist); download is a labeled backendRequired gate; no fake download.
- **FR-015**: A family profile/account slice MUST show the guardian contact + children relation display-only; editing is a labeled backendRequired/planned note — no fake edit/save.
- **FR-016**: A friendly, reassuring empty-state pattern MUST exist and be used wherever a list is truthfully empty (no sessions today / no notes / no billing issue / no meetings) — no raw blank cards, no technical messages.

**Honesty**

- **FR-017**: Every interactive element MUST be one of the four honest classes: real link to an existing page · demo toast (existing hooks only) · labeled disabled/planned control · display-only content. No fake pay-now, cancel/reschedule submit, file/voice upload, feedback submit, chat, or notification engine anywhere.
- **FR-018**: All planned/backendRequired affordances MUST carry the labeled availability chip vocabulary (icon + text, never color-only, never an anchor), consistent with Specs 008/012/013.
- **FR-019**: All copy MUST use honest availability language (no "coming soon" hype, no backend promises), Arabic-first quality in both languages; ZERO pay figures/currency; ZERO teacher salary/pay vocabulary (standing grep).

**Architecture**

- **FR-020**: The dashboard MUST remain static HTML-first: complete pre-rendered page pair, no whole-page `#app`, no SPA, no runtime page construction, enhancement only via the existing closed `data-*` hook set — NO new hook, NO new library/framework/TypeScript/CDN, no backend/API/DB/auth; GitHub-Pages compatible and Django-template-ready.
- **FR-021**: New content MUST bind existing fixtures/persona (fam1 + its children + existing session/outcome/course fixtures) plus display-only authored literals in the portal fixture namespace; NO new domain entities, NO engine-shaped state, NO pay-adjacent fields surfaced.
- **FR-022**: New styles MUST live inside the `.portal-shell` CSS namespace using existing tokens; new locale keys MUST extend the `prt.fam.*` overlay without altering shared or sibling-namespace keys.

**Impact protection**

- **FR-023**: All 40 admin built files MUST remain content-identical to HEAD (hash-compare — the Spec-012/013 standard); no admin nav/sidebar/body change; reports/finance/dashboard contracts untouched.
- **FR-024**: `student-portal`, `teacher-portal`, and `portals` built pairs MUST remain byte-identical by default; any deviation requires an itemized, spec-sanctioned justification recorded before implementation.
- **FR-025**: The portal separation invariants remain binding: portal pages carry zero admin markup; admin pages carry zero portal references; the hub stays the only documented demo entry.

**QA**

- **FR-026**: The full gate MUST stay green: build (49 files) · smoke (all pages, both languages; admin/student/teacher/hub assertions verbatim; the family branch re-scoped only as sanctioned) · a11y critical=0 serious=0 · link crawl (zero dead links, zero `href="#"`, zero raw keys) · teacher-portal pay-token grep unchanged-green · a family-page zero-pay-figures assertion · screenshot matrix with zero console errors · mobile 390px review.
- **FR-027**: The legacy coverage artifact MUST gain a Spec-014 delivery-notes section (F1–F17 dispositions), preserving the classification scheme and the no-silent-gaps rule.

### Key Entities *(documentation/build-time shapes only — no DB/API/auth schema)*

- **FamilyDashboard**: the composed page — ordered sections, persona binding (fam1), language pair.
- **GuardianHero**: guardian name + family summary + reassurance + next-action hint (honest class).
- **FamilyChildCard**: child name/level/status/progress refs (existing student fixtures) + gentle signal.
- **FamilyTodaySession**: time/course/teacher/child/status refs (existing session fixtures).
- **FamilyProgressSignal**: authored/fixture progress or attendance signal (display-only, labeled).
- **FamilyTeacherNote**: child ref + teacher ref + summary/homework note (display-only).
- **FamilyHistoryFeedback**: recent per-child session record (summary/homework/remark shape, display-only).
- **FamilySubscriptionPreview**: per-child plan/status label (NO amount).
- **FamilyBillingPreview**: view-only status summary (NO currency figure) + backendRequired gate.
- **FamilyRequestAction**: cancel/reschedule/absence/meeting/trial/feedback request (labeled planned/backendRequired).
- **FamilyFeedbackPreview**: teacher-feedback rubric dimensions (display-only) + backendRequired submit.
- **FamilyTrialRequestPreview**: new-vs-existing-child trial flow (display-only) + backendRequired submit.
- **FamilyMaterialPreview**: authored material card (display-only) + backendRequired download.
- **FamilyProfileSlice**: guardian contact + children relation (display-only) + backendRequired edit.
- **FamilyCapabilityClassification**: the F1–F17 Spec-014 disposition notes in the coverage artifact.
- **FamilyAcceptanceFrame**: one screenshot-matrix row (page/lang/theme/viewport/area + verdict).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The family dashboard pair renders complete in AR (RTL) and EN (LTR) with zero raw i18n keys and zero console errors.
- **SC-002**: All five fam1 children are visible in the children overview.
- **SC-003**: Zero admin chrome on the family page (no `.app-shell`/`.nav-rail`/`.nav-panel`/admin topbar) — asserted by smoke.
- **SC-004**: Zero dense tables by default (any exception explicitly justified — none anticipated).
- **SC-005**: Zero fake pay / cancel / reschedule / upload / voice / feedback-submit affordances; **zero currency figures / pay vocabulary** on the family page — grep + review enforced.
- **SC-006**: Zero `href="#"` and zero dead local links sitewide (standing invariant, re-verified).
- **SC-007**: Mobile 390px AR layout shows no horizontal overflow.
- **SC-008**: a11y critical=0 serious=0 across the family scenario set including dark/mobile.
- **SC-009**: All 40 admin built files hash-identical to HEAD; student/teacher/hub built pairs byte-identical (or each deviation itemized and sanctioned).
- **SC-010**: Every legacy family/student capability (F1–F17) carries a Spec-014 disposition — zero silent gaps.
- **SC-011**: The Spec-014 screenshot matrix (≥14 frames) passes visual review with the verdict table recorded; every failure condition evaluated false.
- **SC-012**: Prior guards (Spec 008 reports-body, 009 finance, 010 chip-tone, 011 zero-`href="#"`, 012 portal G5, 013 student smoke branch) re-run green with zero new amendments beyond the sanctioned family smoke re-scope.

## Screenshot Acceptance *(minimum frames)*

family AR light desktop (full) · family AR dark desktop · family EN light desktop · family AR mobile 390px · children-overview area · today-sessions area · progress/teacher-notes area · billing/subscriptions area · requests/feedback area · history/materials area · student portal unchanged-proof · teacher portal unchanged-proof · portal hub unchanged-proof · admin dashboard unchanged-proof.

**Failure conditions (any → fail):** looks admin-like · looks like a legacy clone · too many tables · confusing child switcher · fake payment looks real · fake cancel/reschedule looks real · fake upload/voice/feedback submit · raw i18n keys · `href="#"` · dead links · broken RTL/LTR · poor mobile · poor dark contrast · student page changed · teacher page changed · admin page changed · reports/finance regression · new backend/API/DB/auth · new library/CDN.

## Scope Guard *(summary — full contract at plan time)*

**Allowed:** `family-portal` page/content upgrade · family entries in the portal fixture file (display-only) · family `prt.fam.*` locale keys · family-specific portal components if needed · family CSS inside the `.portal-shell` namespace · tests/screenshots/docs · legacy family delivery notes.

**Forbidden:** admin page/nav/body edits · student dashboard implementation (`prt.stu.*`, student module) · teacher dashboard implementation (`prt.tch.*`, teacher module) · real auth/permissions · backend/API/DB · real payment/cancel/upload/voice/feedback/chat/live engines · teacher salary/pay figures or vocabulary anywhere · **any pay/currency figure on the family page** · new libraries/frameworks/CDN/TypeScript · SPA/`#app`/runtime page construction · `portal-shell.js`/`build-html.mjs`/`nav.config.js`/`enhance.js`/`package.json` · shared `prt.shell/portal/role` keys · legacy clone work · dense admin tables.

## Expected Plan Artifacts *(produced by `/speckit-plan`, not this spec)*

Contracts: `family-dashboard-contract.md` · `family-dashboard-honesty-contract.md` · `family-children-overview-contract.md` · `family-sessions-progress-contract.md` · `family-billing-subscriptions-contract.md` · `family-requests-feedback-contract.md` · `family-history-materials-contract.md` · `family-mobile-accessibility-contract.md` · `legacy-family-capability-coverage-contract.md` · `admin-impact-contract.md` · `student-teacher-impact-contract.md` · `static-html-django-ready-contract.md` · `source-links-contract.md` · `planned-backendrequired-contract.md` · `screenshot-acceptance.md` · `scope-guard.md`. Plus `research.md` (open decisions below), `data-model.md` (the Key Entities), `quickstart.md` (verify: build · preview both languages · themes · mobile · every section · honest gated affordances · zero pay figures · admin/student/teacher/hub unchanged · screenshots · full tests).

**Open decisions deferred to research (none blocks this spec):** the multi-child pattern mechanism (everyone-inline vs a real baked toggle via an existing hook vs a labeled focus-preview) · exact section order after the hero/children/today trio · which section truthfully demonstrates the empty-state pattern · how attendance signals map real outcome rows (st11 absence-follow-up, st13 trial) to gentle chips without a KPI wall · billing-status wording that is reassuring yet figure-free · the family smoke re-scope shape (planned-card semantics + a zero-pay-figures assertion).

## Assumptions

- Persona remains **fam1** (guardian «أبو سلمان الغامدي», five children) — continuity with Spec 012; no persona change.
- The build/watcher workflow is unchanged; Spec 014 implementation will not commit/push (watcher/user-controlled).
- Byte-identity for admin (40) AND student/teacher/hub pairs is achievable because the family upgrade touches only the family page module, family fixture entries, `prt.fam.*` keys, and namespaced CSS — shared shell and sibling namespaces are not expected to change.
- The Spec-012 portal smoke block's **family branch** is the amendment surface for graduated family planned cards (sanctioned re-scope; other branches stay verbatim).
- Arabic copy is authored first, English mirrors it.
- No calendar/date engine; "today" framing stays relative and honest in static output.
- Billing/subscription figures (`hourRate`, `plan`) exist in the family fixture but are display-suppressed — the dashboard surfaces status only.

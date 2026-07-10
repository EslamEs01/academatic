# Feature Specification: Admin Nav Completion Strategy / Remove Coming Soon & Locks / Frontend Closure Map

**Feature Branch**: `feature/012-role-portal-foundation` (spec authored in place per repo convention — specs 021–032 share this branch; no per-spec branch)
**Spec**: 033 · **Created**: 2026-07-10 · **Status**: Draft (strategy/classification only — NOT implementation)
**Baseline**: Spec 032 committed (HEAD `a438ac2`, public HTML **103**, working tree clean)
**Input**: "Admin Nav Completion Strategy / Remove Coming Soon & Locks / Frontend Closure Map — produce the final navigation completion strategy so the frontend can be fully closed through Specs 034+ without forgotten menu items."

## Overview

Specs 021–032 rebuilt the core frontend, completed the 40 create/edit forms (Spec 032), and production-froze the currently-implemented pages. But the Admin sidebar still visibly shows **30 of its 50 items** as either **«قريبًا» (coming soon)** or **🔒 locked/disabled**, even where a safe frontend surface already exists or could be built. This spec produces the **final navigation completion strategy**: a per-item classification (keep / standalone page / deep-link / folded owner / future-backend / unlock-reword) and a follow-up spec roadmap, so every follow-up spec (034+) closes the sidebar with zero forgotten items.

**Spec 033 is strategy and classification only.** It implements no pages, creates no routes, changes no nav behavior, changes no tests, changes no app source (only the spec folder + `feature.json` metadata). It produces no `plan.md` and no `tasks.md`. It does not commit or push.

**The nav completion rule (Spec-032 principle applied to navigation):** *show the page/tab/frontend surface first; only the final backend action (send/save/pay/generate) is gated. A sidebar item must not stay «قريبًا» or locked if a safe frontend surface can be shown.* Only true backend **engines** (messaging delivery, CRM ingestion, task persistence, notification delivery, money movement, payroll calculation, file/PDF generation, integration credentials, auth/permission) remain gated — and even then a display/compose **shell** is built; only the final action is `backendRequired`.

**Grounding:** the legacy academy system is a **capability-coverage checklist, not a pixel-clone target**. Every decision below is grounded in the exact current nav (`app/src/js/nav.config.js`), the current sidebar screenshots, the Spec-032 coverage inventories, and the legacy `output/roles/admin/` + `output/combined/` evidence — see `visual-grounding.md` and `current-sidebar-screenshot-analysis.md`. No decision relies on memory alone.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Product owner sees the true state of every Admin menu item (Priority: P1)

The product owner opens the Admin sidebar and today sees «قريبًا» pills and 🔒 lock icons scattered across Control, Families, Teachers, Reports/Finance, Admin, and Settings — with no explanation of which are genuinely blocked on a backend engine versus which already have a frontend surface hidden behind a misleading label. Spec 033 gives them a single classification of all 50 items: implemented, folded (surface exists), planned (no surface yet), disabled/locked, and the recommended final state for each.

**Why this priority**: Without a complete, evidence-based classification, follow-up specs risk leaving menu items forgotten or shipping misleading locks — the exact freeze gap this spec closes.

**Independent Test**: Open `admin-nav-completion-matrix.md` and confirm all 50 nav ids appear with a current state and a recommended final state, 0 unclassified.

**Acceptance Scenarios**:

1. **Given** the current sidebar, **When** the owner reads the matrix, **Then** every one of the 50 nav items has a current status and a recommended final state (page / deep-link / fold / future-backend / unlock).
2. **Given** a «قريبًا» or lock, **When** the owner reads the coming-soon-and-locks register, **Then** each marker is recorded with why it appears and its recommended resolution.

---

### User Story 2 - Product owner understands why any «قريبًا» or lock remains (Priority: P1)

For every item recommended to STAY future-backend or stay gated, the product owner can see the specific real engine that blocks it (e.g. "needs a real message-delivery engine") and confirm that a frontend shell is still planned so the user is never shown a dead label.

**Why this priority**: The core law is "no misleading «قريبًا»/lock if a frontend surface can be built." This story makes every remaining gate justified and non-misleading.

**Independent Test**: Open `future-backend-nav-register.md` and confirm every entry names a real engine AND records whether a frontend shell can still be built.

**Acceptance Scenarios**:

1. **Given** a future-backend item, **When** the owner reads its register row, **Then** it names the real engine reason and its recommended frontend shell.
2. **Given** a finance lock, **When** the owner reads the decision register, **Then** it shows whether the surface already exists (deep-link) or a figure-free display shell is planned (page/fold) with money actions gated.

---

### User Story 3 - Developer has the exact follow-up spec roadmap to close the sidebar (Priority: P1)

A developer can read the follow-up roadmap and know exactly which specs (034+) own which menu items, whether each item becomes a standalone page or a deep-link, the count impact, the risk level, and the recommended agent/model routing.

**Why this priority**: The whole point of Spec 033 is to make the remaining frontend closable spec-by-spec without gaps.

**Independent Test**: Open `follow-up-spec-roadmap.md` and confirm every non-implemented item maps to exactly one owner spec, and every proposed spec lists items/pages/deep-links/count-impact/risk/model-routing.

**Acceptance Scenarios**:

1. **Given** the roadmap, **When** the developer picks a follow-up spec, **Then** it lists its covered items, expected pages/deep-links, count impact, key laws, and model routing.
2. **Given** the matrix, **When** the developer cross-checks owners, **Then** every planned/folded/disabled item has a follow-up owner spec.

---

### User Story 4 - Developer sees the route/page/deep-link decision and count impact (Priority: P2)

For every currently planned/folded/locked item, the developer sees whether it should be a standalone page, a deep-link into an existing page/tab, a folded owner, or future-backend — with the reason, the expected route, and the count impact — and the overall page-count envelope after all follow-up specs.

**Why this priority**: Count control (currently frozen at 103) is a standing invariant; the envelope prevents uncontrolled page growth.

**Independent Test**: Open `page-vs-deeplink-decision-register.md` and `page-count-envelope.md`; confirm each decision has a count impact and the envelope defines a min/recommended/max range.

**Acceptance Scenarios**:

1. **Given** a planned item, **When** the developer reads its decision row, **Then** it states page vs deep-link vs fold vs future-backend + the count impact.
2. **Given** the envelope, **When** the developer sums the per-spec impacts, **Then** the final range is bounded and consistent with the decisions.

---

### User Story 5 - QA verifies no Admin sidebar item remains unowned or misleading (Priority: P2)

QA can verify against the matrix + registers that no sidebar item is unclassified, no «قريبًا»/lock is unrecorded, and every one has an owner and an acceptance check — so the final sidebar (after 034+) has zero misleading labels.

**Why this priority**: The final production re-freeze depends on a machine-checkable "zero forgotten items" guarantee.

**Independent Test**: Run the checklist in `checklists/requirements.md`; all boxes pass (50 classified, 0 unclassified, all markers recorded).

**Acceptance Scenarios**:

1. **Given** the registers, **When** QA counts, **Then** all «قريبًا» + all locks are recorded with a resolution and owner.
2. **Given** the final-sidebar target, **When** QA reads it, **Then** it defines the zero-«قريبًا»/zero-lock end state.

---

### User Story 6 - Future implementers preserve role-laws and no-fake laws (Priority: P2)

Any developer implementing a follow-up spec has a single carryover list of the binding role-laws and no-fake laws that every new page/deep-link must preserve (teacher pay-free, family zero-pay, student child-view, finance no-fake-money, settings no-fake-settings, no `type=file`/`type=password`/secret, backendRequired finals, etc.).

**Why this priority**: The frontend's honesty guarantees must survive every follow-up spec, not just Spec 032.

**Independent Test**: Open `role-law-and-no-fake-carryover.md`; confirm it lists every standing law with its enforcement anchor.

**Acceptance Scenarios**:

1. **Given** a follow-up spec, **When** the implementer reads the carryover, **Then** every no-fake and role-law is listed with how it is enforced (smoke assert / grep).

### Edge Cases

- **A folded item's surface is a drawer, not a hash-addressable tab** (familyCategories, teacherCategories, addTeacher): a deep-link cannot open a drawer via `#view=`. Resolution = documented folded owner + the nav item becomes a real anchor to the host list page (families.html/teachers.html), never a «قريبًا» button.
- **A "data analysis" item implies a chart/analytics engine** (dataAnalysis): the no-fake law forbids computed charts/scores. Resolution = a display-only authored board (no `<canvas>`, no computed analytics), or it stays future-backend if no honest display is possible.
- **A finance item implies money movement** (invoices/payments/salaries): the finance no-fake-money law forbids arithmetic/payment/payroll/PDF. Resolution = a figure-free (or Spec-009 amount-literal) display shell with every money/generation action `backendRequired`.
- **An item duplicates an existing owner** (settingsUsers ↔ staff.html, B-16 alias): resolution = deep-link to the canonical owner, not a second page.
- **Evidence is missing for an item**: record the gap in `visual-grounding.md` and classify conservatively as future-backend-with-shell; never invent a capability.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Spec 033 MUST complete a targeted visual grounding pass over the exact current nav/sidebar files, sidebar screenshots, legacy admin evidence, and prior-spec coverage inventories, recorded in `visual-grounding.md` with a final grounding verdict and any evidence gaps.
- **FR-002**: Spec 033 MUST analyze the current sidebar screenshots by category (Control, Families, Teachers, Reports/Finance, Admin, Settings) in `current-sidebar-screenshot-analysis.md`, recording for each item its displayed label, displayed state, whether a user-visible problem exists, the recommended correction, and the owner spec.
- **FR-003**: Spec 033 MUST classify **all 50** Admin nav items in `admin-nav-completion-matrix.md` with the full field set (nav id, label, category, current status/route/page/visible-state, legacy evidence, current owner, recommended final state, recommended route/deep-link, needs-page?, can-deep-link?, can-fold?, can-stay-future-backend?, remove-«قريبًا»?, remove-lock?, follow-up owner, acceptance check). **0 unclassified rows.**
- **FR-004**: Spec 033 MUST record **every** visible «قريبًا» and every lock/disabled state in `coming-soon-and-locks-register.md` with why it appears, whether a frontend UI is possible, the recommended resolution, the owner spec, and an acceptance check. **No unresolved row.**
- **FR-005**: Spec 033 MUST decide, for every currently planned/folded/locked item in `page-vs-deeplink-decision-register.md`, standalone-page vs deep-link vs folded-owner vs future-backend, with reason, evidence, expected route, expected count impact, and owner spec.
- **FR-006**: Spec 033 MUST list, in `future-backend-nav-register.md`, only items that legitimately stay future-backend (each justified by a real engine), and for each record whether a frontend shell can still be built and the recommended shell.
- **FR-007**: Spec 033 MUST propose the follow-up spec roadmap (034+) in `follow-up-spec-roadmap.md`, with each spec's covered items, expected pages/deep-links, risk level, model routing (Opus for complex/high-risk, Sonnet for repetitive), count impact, and key laws.
- **FR-008**: Spec 033 MUST define the page-count envelope in `page-count-envelope.md` (current 103, per-spec impact, standalone AR/EN +2 each, deep-link/fold 0, final min/recommended/max range).
- **FR-009**: Spec 033 MUST define the role-law and no-fake carryover laws in `role-law-and-no-fake-carryover.md` that every follow-up spec must preserve.
- **FR-010**: Spec 033 MUST NOT implement pages, create route files, modify nav behavior, change tests, change any app source beyond `feature.json` + this spec folder, and MUST NOT produce a plan or tasks or commit or push.
- **FR-011**: Every recommended future-backend classification MUST cite a real engine reason (messaging/CRM/task/notification/payment/payroll/file-PDF/integration-credential/auth) — never "not built yet" alone.
- **FR-012**: Every non-implemented item MUST map to exactly one follow-up owner spec; no item may be left ownerless.
- **FR-013**: The strategy MUST target a final sidebar with **zero «قريبًا» and zero misleading locks** — every item resolved to a real page, a real deep-link, or a documented folded owner (with a real anchor), reserving `backendRequired` only for the final action.

### Key Entities

- **Admin Nav Item**: one of the 50 sidebar entries — nav id, Arabic label, category, status (implemented/planned/disabled), route (if any), reasonKey (if disabled), current frontend owner, recommended final state, follow-up owner.
- **Nav Category**: one of the 6 rail categories (control/families/teachers/reports/admin/settings), each owning a panel of items (+ finance/teachers-perf sub-sections).
- **Coming-Soon / Lock Marker**: a visible «قريبًا» pill (planned) or 🔒 lock (disabled) on a nav item, with its reason and resolution.
- **Follow-up Spec**: a proposed spec (034–041) owning a set of items, with pages/deep-links, count impact, risk, and model routing.
- **Carryover Law**: a standing role-law or no-fake law every follow-up spec must preserve, with its enforcement anchor.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the 50 Admin nav items are classified in the matrix (0 unclassified).
- **SC-002**: 100% of visible «قريبًا» markers (23 planned) and 100% of locks (7 disabled) are recorded with a resolution and an owner (30/30).
- **SC-003**: Every non-implemented item (30) maps to exactly one follow-up owner spec.
- **SC-004**: Every future-backend recommendation cites a real engine reason and states whether a frontend shell is still built.
- **SC-005**: The page-count envelope defines a bounded final range (min/recommended/max) consistent with the per-item decisions.
- **SC-006**: The follow-up roadmap covers 100% of non-implemented items across its proposed specs, ending in a final re-freeze with zero «قريبًا» and zero misleading locks.
- **SC-007**: Zero app source changes beyond `feature.json` + the spec folder; no plan/tasks; no commit/push (HEAD unchanged).

## Assumptions

- The authoritative nav inventory is `app/src/js/nav.config.js` (50 items across 6 categories); the sidebar screenshots render exactly those statuses (planned → «قريبًا» button, disabled → 🔒 lock, implemented → active link) — cross-validated in grounding.
- The Spec-032 coverage baseline (20 IMPL · 11 FOLD · 6 PLAN-029 · 6 FB · 7 DIS = 50) is correct and is the starting classification Spec 033 refines toward a closure strategy.
- Existing tab surfaces are hash-addressable via the `#view=` deep-link machinery (settings 6 tabs, finance salaries/banks, library materials/books, certificates templates/requests, student results/evaluation) — so those items can deep-link at 0 count cost.
- Drawer-based folds (familyCategories/teacherCategories/addTeacher) are not hash-addressable; their nav items resolve to real anchors to the host list page + a documented folded owner.
- Standalone AR+EN page pairs cost +2 to the page count each; deep-links and folds cost 0.
- All standing laws from Specs 009/016/021–032 remain binding (teacher pay-free, family zero-pay, student child-view, finance no-fake-money, settings no-fake-settings, no `type=file`/`type=password`/secret, backendRequired finals, no `href="#"`, AR/EN mirrored, a11y 0/0).
- Spec 033 does not finalize exact page counts; it defines a strategy + envelope that the follow-up implementation specs (034+) fix and build-verify.

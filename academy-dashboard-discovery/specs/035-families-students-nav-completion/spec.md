# Feature Specification: Families & Students Nav Completion / Family Categories / Schedule Search / Student Results / Student Evaluation

**Feature Branch**: `feature/012-role-portal-foundation` (single-branch convention; per-spec branch NOT cut — see Assumptions)
**Spec**: 035
**Created**: 2026-07-10
**Status**: Draft (specify-only — no plan, no tasks, no implementation, no commit)
**Input**: User description: "/speckit.specify Families Students Nav Completion — Family Categories / Schedule Search / Student Results / Student Evaluation"

## Why this spec exists

Spec 033 classified the Admin sidebar and assigned the remaining **Families** category items to Spec 035. Spec 034 closed the **Control** category. Spec 035 now closes the four Families-category gaps that still show «قريبًا» in `nav.config.js` (lines 44,46,47,48):

- `familyCategories` / فئات العائلات
- `scheduleSearch` / بحث الجدول
- `studentResult` / نتائج الطلاب
- `studentEvaluation` / تقييم الطلاب

**Core frontend law (binding):** a visible Admin menu item must not remain «قريبًا» if a safe frontend surface can be shown. Show the page/tab/surface first; only the final backend action is gated. Do not stop at `backendRequired` too early.

## Grounded decisions (evidence in `visual-grounding.md` / `legacy-families-students-coverage.md`)

| Item | Decision | Route | Count |
|---|---|---|---|
| familyCategories | **Fold-anchor** to the existing families surface | `families.html` | 0 |
| scheduleSearch | **New standalone page** (distinct legacy availability finder) | `schedule-search.html` (+ `.en`) | +2 |
| studentResult | **Deep-link** to the existing display-only Results tab | `student.html#view=results` | 0 |
| studentEvaluation | **Deep-link** to the existing display-only Evaluation tab | `student.html#view=evaluation` | 0 |

**Count target: 113 → 115 (+2).** Nav flips = exactly the 4 scoped items; after 035 the families category has **0 «قريبًا»**. Admin-menu total stays 50 items.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Family Categories reachable, not «قريبًا» (Priority: P1)

An admin clicks **Family Categories** in the sidebar and lands on `families.html`, where they can filter families by category and open the display-only category-reclassify preview — instead of a dead «قريبًا».

**Why this priority**: Removes a misleading coming-soon on a surface that already exists; zero build risk.

**Independent Test**: Click the nav item → arrive at families.html → apply the category filter → open a family's "Reclassify category" drawer; the Save is a visible `backendRequired` gate.

**Acceptance Scenarios**:
1. **Given** the sidebar, **When** I open Family Categories, **Then** it is a real link to families.html (no «قريبًا»).
2. **Given** families.html, **When** I open the reclassify drawer, **Then** the category select is inert and Save is disabled-with-reason (no mutation).

### User Story 2 - Schedule Search page (Priority: P1)

An admin opens **Schedule Search** and sees a real search page: a time-window/teacher/course/availability criteria form, a results board of matching authored candidates, and an empty state — with Book/Assign as a gated final.

**Why this priority**: The only genuinely new surface; the largest coverage gain; faithful to a real legacy tool.

**Independent Test**: Load `schedule-search.html` (AR) and `schedule-search.en.html` (EN); enter criteria; the visible results narrow client-side; the Book/Assign button is `backendRequired`.

**Acceptance Scenarios**:
1. **Given** the page, **When** it loads, **Then** a search form + results container + empty state render in AR and EN.
2. **Given** a result, **When** I click Book/Assign, **Then** it is disabled-with-reason — no slot is booked, no row mutates, no external request fires.
3. **Given** a teacher result, **Then** it shows name/subject/time only — **no** pay/rate figure.

### User Story 3 - Student Results without computed scores (Priority: P2)

An admin opens **Student Results** and reaches the display-only Results tab (per-course progress + certificates + level/term) with no computed score/rank/chart.

**Why this priority**: Honest resolution of an item with no legacy page; zero new surface.

**Independent Test**: Click the nav item → `student.html#view=results` opens the Results tab directly.

**Acceptance Scenarios**:
1. **Given** the nav item, **When** clicked, **Then** the Results tab is the active view via `#view=results`.
2. **Given** the Results tab, **Then** all figures are authored literals — no GPA/rank/percentage rollup, no chart.

### User Story 4 - Student Evaluation without fake calculations (Priority: P2)

An admin opens **Student Evaluation** and reaches the display-only Evaluation rubric tab (categorical ratings + achievements + objectives) with no computed total and an honest Approve gate.

**Independent Test**: Click the nav item → `student.html#view=evaluation` opens the Evaluation tab.

**Acceptance Scenarios**:
1. **Given** the nav item, **When** clicked, **Then** the Evaluation tab is active via `#view=evaluation`.
2. **Given** the Evaluation tab, **Then** ratings are categorical pills (no number/total) and Approve is `backendRequired`.

### User Story 5 - QA: «قريبًا» removed for all four (Priority: P1)

QA verifies the four Families/Students «قريبًا» markers are resolved (1 anchor-to-page, 1 new page, 2 deep-links) in AR and EN.

**Acceptance Scenarios**:
1. **Given** the families category panel, **Then** it contains 0 «قريبًا» items and 0 dead buttons.

### User Story 6 - QA: no fake academic behavior (Priority: P1)

QA verifies no fake booking/assignment, no fake category save, no fake result/evaluation calculation, no fake publish/export, no computed score/rank/chart, no row/status mutation, no backend call.

**Acceptance Scenarios**:
1. **Given** any final action across the four surfaces, **Then** it ends at a `backendRequired` gate with honest wording («يُتاح بعد ربط الخادم»).

### User Story 7 - QA: role-law carryover green (Priority: P1)

QA verifies student child-view, teacher pay-free, family zero-pay, and admin-finance invariants remain green; protected smoke regexes stay byte-verbatim.

**Acceptance Scenarios**:
1. **Given** the full suite, **Then** `payHit`/`payFigure`/`famPay`/child-view and all 026–034 protected asserts pass byte-verbatim; new asserts are additive.

### Edge Cases
- **Schedule-search: no matches** → the empty state renders (no fabricated results).
- **Deep-link with no hash / stored view** → the tab widget falls back to the baked default, then honors `#view=` (enhance.js:261-269).
- **EN twin** → `families.en.html`, `schedule-search.en.html`, `student.en.html#view=…` resolve correctly (lang-aware nav rendering).
- **Active-pill** on `student.html`/`schedule-search.html` → resolves to the families category without a false «current» on an unrelated item.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Targeted Visual Grounding MUST precede implementation (done here; recorded in `visual-grounding.md`).
- **FR-002**: All four scoped nav items MUST be resolved (no «قريبًا» remains in the families category).
- **FR-003**: `familyCategories` MUST become a real anchor to `families.html` (folded owner); the existing category filter + `fam-cat` reclassify drawer stay reachable; Save stays `backendRequired`; no fake category create/mutation. Count impact 0.
- **FR-004**: `scheduleSearch` MUST become a standalone page pair (`schedule-search.html` + `.en`) with a search form, results board, empty state, and gated Book/Assign. Count impact +2.
- **FR-005**: `studentResult` MUST become a deep-link to `student.html#view=results` (display-only). Count impact 0.
- **FR-006**: `studentEvaluation` MUST become a deep-link to `student.html#view=evaluation` (display-only). Count impact 0.
- **FR-007**: Public HTML count MUST go 113 → 115 (+2); exactly 1 new page base; nav changes = exactly the 4 scoped items; no unrelated page added/removed.
- **FR-008**: NO fake booking, NO fake schedule assignment, NO fake category save, NO fake result/evaluation calculation, NO fake publish/export/PDF, NO row/status mutation, NO backend/API/websocket, NO external dependency.
- **FR-009**: NO computed score/rank/GPA/percentage/rubric-total; NO `<canvas>`/chart; NO `type=file`/`type=password`/credential/secret.
- **FR-010**: AR/EN locale parity (0 divergence, 0 raw keys); RTL + LTR; responsive at mobile 390.
- **FR-011**: A11y critical=0 serious=0 across the new/changed surfaces (light/dark/mobile/open-form).
- **FR-012**: Reuse ONLY the closed `data-*` hook set (`filterBar`/`data-facet`, `data-disabled-reason`/`data-reason-key`, `#view=` tab hash, `data-drawer`→`template[data-preview]`, `data-confirm`); NO new hook or storage key or engine.
- **FR-013**: Role-law/no-fake carryover MUST stay green with protected smoke assertions byte-verbatim; smoke additions additive only (see `role-law-and-no-fake-carryover.md`).
- **FR-014**: This `/speckit.specify` step MUST NOT implement, plan, generate tasks, or commit/push; the only app-source touch is `feature.json` → 035.

### Key Entities
- **Nav item (scoped)**: `{ id, labelKey, status, route? }` in `nav.config.js` — status flips planned→implemented + gains a route (or hash route).
- **Schedule-search candidate (authored)**: teacher name key, subject/category, day + start/end, availability status label — display-only, no pay, no computed metric.
- **Student.results / Student.evaluation (existing fixtures)**: authored per-course progress literals, certificate rows, categorical rubric ratings + narrative keys — no computed value.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: 0 «قريبًا» / coming-soon markers remain among the four scoped items (both languages).
- **SC-002**: Public HTML count = 115 after implementation (113 + 2).
- **SC-003**: Exactly 4 nav items change status; 0 unrelated nav/page changes; admin-menu stays 50 items.
- **SC-004**: 100% of final write actions across the four surfaces are honest `backendRequired` gates (0 fake success, 0 mutation, 0 external request).
- **SC-005**: 0 computed academic figures (score/rank/GPA/percentage/total) and 0 charts newly introduced.
- **SC-006**: Build green (115 pages, 0 raw keys, locale 0-divergence); smoke PASS; a11y critical=0 serious=0; screenshots 0 console errors.
- **SC-007**: All protected role-law/no-fake smoke assertions remain byte-verbatim; every changed admin `#page-body` (except the nav-flip on families.html) + all 16 portal pages + index stay byte-identical.

## Assumptions
- **Branch**: The project uses the single working branch `feature/012-role-portal-foundation` and locates the feature via `.specify/feature.json` (updated to 035 by this step). The mandatory `before_specify` git.feature hook is intentionally not run to cut a per-spec branch — consistent with Specs 021–034. This is the one deviation from the default hook behavior, matching established project convention and the command's locked baseline.
- **Baseline verified**: Spec 034 is committed (HEAD `1eb4d9a`, clean tree); public HTML = 113; build/smoke/a11y green.
- **Deep-link honesty**: studentResult/studentEvaluation land on the representative student's profile tab (the app's established single-representative pattern; `students.html` is the multi-student directory that drills into it). Recorded as a minor UX note, not a defect.
- **Client-side filtering** of authored fixtures (the existing `data-facet` pattern) is an allowed, honest display mechanism and is NOT a backend query.
- **Locale**: new keys live in a mirrored AR/EN module (new or existing families module) with 0 divergence.

## Non-goals (this spec)
- No implementation, no `plan.md`, no `tasks.md`, no commit/push, no app-source edits except `feature.json`.
- No backend/API/auth/database; no finance/pay pages; no teacher pages; no settings pages; no external dependency.
- No fake result/evaluation calculation; no fake booking persistence; no aggregate results/evaluation board; no family-category CRUD persistence.

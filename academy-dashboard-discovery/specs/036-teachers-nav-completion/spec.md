# Feature Specification: Teachers Nav Completion / Add Teacher / Teacher Categories / Sessions KPI / Monthly Performance

**Feature Branch**: `feature/012-role-portal-foundation` (single-branch convention; no per-spec branch)
**Spec**: 036
**Created**: 2026-07-10
**Status**: Draft (specify-only — no plan, no tasks, no implementation, no commit)
**Input**: User description: "/speckit.specify Teachers Nav Completion — Add Teacher / Teacher Categories / Sessions KPI / Monthly Performance"

## Why this spec exists

Spec 033 classified the Admin sidebar and assigned the remaining **Teachers**-category items to Spec 036. Spec 034 closed Control; Spec 035 closed Families/Students. Spec 036 closes the four Teachers gaps still marked «قريبًا» (nav.config.js: `addTeacher` :55, `teacherCategories` :56, `sessionsKpi` :63, `monthlyPerf` :64):

- `addTeacher` / إضافة معلم
- `teacherCategories` / فئات المعلمين
- `sessionsKpi` / مؤشر أداء الحصص
- `monthlyPerf` / الأداء الشهري

**Core frontend law:** a visible Admin menu item must not remain «قريبًا» if a safe frontend surface can be shown. Show the surface first; only the final backend action is gated.

**Teacher pay-free law (GLOBAL, binding):** no salary/rate/hour-rate/fine/payout/payroll/compensation/currency/pay figure or vocabulary may appear on any teacher surface this spec touches.

## Baseline note
Spec 035 is implemented and green (public HTML = 115) but **not yet committed** (HEAD `1eb4d9a` = Spec 034; the watcher commits between specs). Per the user's explicit decision, Spec 036 is specified against the green working-tree baseline. `feature.json` → 036.

## Grounded decisions (evidence in `visual-grounding.md` / `legacy-teachers-coverage.md`)

| Item | Decision | Route | Count |
|---|---|---|---|
| addTeacher | Fold-anchor to the existing `trn-add` drawer | `teachers.html` | 0 |
| teacherCategories | Fold-anchor to the existing `trn-categories` drawer | `teachers.html` | 0 |
| sessionsKpi | Fold as a display-only tab | `teacher-performance.html#view=sessions-kpi` | 0 |
| monthlyPerf | Fold as a display-only tab | `teacher-performance.html#view=monthly` | 0 |

**Count target: 115 → 115 (delta 0), 0 new pages.** Nav flips = exactly 4; teachers category → 0 «قريبًا»; admin-menu stays 50. `teacher-performance.html` gains a `tabs()` widget (its body changes — the ONE sanctioned body change); `teachers.html`/`teacher.html` bodies stay byte-identical.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Teacher reachable, not «قريبًا» (Priority: P1)
An admin clicks **Add Teacher** and lands on `teachers.html`, where the existing Add-Teacher form drawer (`trn-add`) is available — instead of a dead «قريبًا».
**Independent Test**: Click the nav item → arrive at teachers.html → open the Add-teacher drawer; Save is a visible `backendRequired` gate; no salary/password field.
**Acceptance**:
1. **Given** the sidebar, **When** I open Add Teacher, **Then** it is a real link to teachers.html (no «قريبًا»).
2. **Given** teachers.html, **When** I open `trn-add`, **Then** fields are inert, Save is disabled-with-reason, and there is no pay/password/`type=file` field.

### User Story 2 - Teacher Categories reachable (Priority: P1)
An admin clicks **Teacher Categories** → `teachers.html`, where the `trn-categories` drawer (category list + Create form + Save/assign gates) is available.
**Independent Test**: Click the nav item → teachers.html → open "Manage categories"; Save/assign are gates.
**Acceptance**:
1. **Given** the sidebar, **When** I open Teacher Categories, **Then** it is a real link to teachers.html (no «قريبًا»).
2. **Given** the drawer, **Then** the Create form is inert and Save/assign are backendRequired (no mutation).

### User Story 3 - Sessions KPI display tab (Priority: P2)
An admin opens **Sessions KPI** and sees a display-only sessions-KPI tab on teacher-performance (authored session counts + categorical labels), with no computed rank/chart and no pay figure.
**Independent Test**: Click the nav item → `teacher-performance.html#view=sessions-kpi` opens the sessions-KPI tab.
**Acceptance**:
1. **Given** the nav item, **When** clicked, **Then** the sessions-KPI tab is active via `#view=`.
2. **Given** the tab, **Then** it shows counts/labels only — no computed score/rank/percentage/chart, no pay token.

### User Story 4 - Monthly Performance display tab (Priority: P2)
An admin opens **Monthly Performance** and sees a display-only monthly tab (month + categorical trend/status + notes), no computed figures, no pay.
**Independent Test**: Click the nav item → `teacher-performance.html#view=monthly` opens the monthly tab.
**Acceptance**:
1. **Given** the nav item, **When** clicked, **Then** the monthly tab is active via `#view=`.
2. **Given** the tab, **Then** ratings are categorical (no number/total/%), no chart, no pay token.

### User Story 5 - QA: «قريبًا» removed for all four (Priority: P1)
QA verifies the four Teachers «قريبًا» markers are resolved (2 anchors + 2 tabs) in AR and EN; teachers category has 0 planned items.

### User Story 6 - QA: no fake teacher behavior (Priority: P1)
QA verifies no fake teacher creation, no fake category save/assign, no fake KPI/monthly calculation, no computed score/rank/chart, no fake export.

### User Story 7 - QA: teacher pay-free + role-law carryover (Priority: P1)
QA verifies no salary/rate/fine/payout/pay figure on any new/folded teacher surface; teacher pay-free (portal ×16 byte-identical) + all role laws green; protected asserts byte-verbatim.

### Edge Cases
- **sessions-kpi / monthly with no filter match** → an honest empty state (no fabricated rows).
- **Deep-link with no hash** → teacher-performance falls back to the Overview (default) tab, then honors `#view=`.
- **EN twins** → `teachers.en.html`, `teacher-performance.en.html#view=…` resolve via the hash-aware `langRoute`.
- **Active-pill** on teacher-performance.html → the `teacherKpi` item stays current; sessionsKpi/monthlyPerf are hash tabs on the same page.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Targeted Visual Grounding precedes implementation (done; `visual-grounding.md`).
- **FR-002**: All four scoped nav items resolved (0 «قريبًا» in the teachers category).
- **FR-003**: `addTeacher` → real anchor to `teachers.html`; `trn-add` reachable; Save `backendRequired`; NO password/salary/hour-rate/fine/payout/zoom field; CV = gate. Count 0.
- **FR-004**: `teacherCategories` → real anchor to `teachers.html`; `trn-categories` list + Create form + Save/assign gates reachable; drop stale `FUTURE_ROUTES.teacherCategories`; no fake category mutation. Count 0.
- **FR-005**: `sessionsKpi` → display-only tab `teacher-performance.html#view=sessions-kpi` (authored counts + categorical labels; NO computed score/rank/percentage/chart). Count 0.
- **FR-006**: `monthlyPerf` → display-only tab `teacher-performance.html#view=monthly` (month + categorical trend/status + notes; NO computed figures/chart). Count 0.
- **FR-007**: Public HTML count 115 → 115; 0 new page bases; nav changes = exactly the 4 scoped items; admin-menu 50.
- **FR-008**: NO fake teacher creation / category save-assign / KPI or monthly calculation; NO fake export/PDF; NO row/status mutation; NO backend/API/websocket; NO external dependency.
- **FR-009**: NO computed score/rank/GPA/percentage/rating; NO `<canvas>`/chart.
- **FR-010**: Teacher pay-free — NO salary/rate/hour-rate/fine/payout/payroll/compensation/currency/pay figure on any touched surface.
- **FR-011**: AR/EN locale parity (0 divergence, 0 raw keys); RTL + LTR; mobile-390.
- **FR-012**: A11y critical=0 serious=0 across new/changed surfaces.
- **FR-013**: Reuse ONLY the closed hook set (`data-drawer`→`template[data-preview]`, `data-disabled-reason`, `tabs()`+`#view=`, `filterBar`/`data-facet`, `data-confirm`); NO new hook/storage key/engine.
- **FR-014**: Role-law/no-fake carryover green; protected smoke asserts byte-verbatim; smoke additions additive only.
- **FR-015**: This `/speckit.specify` step performs NO implementation, plan, tasks, or commit; the only app-source touch is `feature.json` → 036.

### Key Entities
- **Nav item (scoped)**: `{ id, labelKey, status, route? }` — status flips planned→implemented + gains a route (or hash route).
- **Teacher (existing fixture)**: name/subjects/status/counts — display-only; NO pay attribute surfaced.
- **Sessions-KPI row (authored)**: teacher + session counts + categorical quality/attendance label — no computed metric.
- **Monthly-performance row (authored)**: teacher + month + categorical trend/status + note — no computed metric.

## Success Criteria *(mandatory)*
- **SC-001**: 0 «قريبًا» among the four items (both languages); teachers category 0 planned.
- **SC-002**: Public HTML count = 115 (unchanged); 0 new pages.
- **SC-003**: Exactly 4 nav items change; 0 unrelated nav/page changes; admin-menu 50.
- **SC-004**: 100% of final write actions are honest `backendRequired` gates (0 fake success/mutation/external request).
- **SC-005**: 0 computed academic figures (score/rank/percentage/total) and 0 charts introduced.
- **SC-006**: 0 pay/salary/rate/fine/payout figure or token on any touched teacher surface.
- **SC-007**: Build green (115, 0 raw keys, locale 0-divergence); smoke PASS; a11y 0/0; screenshots 0 console errors.
- **SC-008**: Protected role-law/no-fake asserts byte-verbatim; `teachers.html`/`teacher.html` `#page-body` + all 16 portal pages + index byte-identical; only `teacher-performance.html` body changes (tabs) + the shared sidebar.

## Assumptions
- **Branch**: single working branch; feature located via `feature.json` (→036). The mandatory `before_specify` git.feature hook is not run to cut a per-spec branch — consistent with Specs 021–035.
- **Baseline**: Spec 035 green but uncommitted; specified against the working tree per the user's explicit decision.
- **teacher-performance.html gains tabs**: the current flat board becomes the default Overview tab; sessionsKpi/monthlyPerf are added as `#view=` tabs. Its body changes (the one sanctioned body change); still count-0.
- **No computed % reproduced**: legacy Classes-KPI/Monthly-Performance showed a computed Percentage; the tabs render authored counts + categorical labels instead (no-computed-score law).

## Non-goals (this spec)
- No implementation, plan, tasks, commit/push, or app-source edits except `feature.json`.
- No backend/API/auth/database; no finance/payroll/salary/rate/fine/payout surface; no family/student/settings pages; no external dependency.
- No fake teacher creation / category persistence / KPI calculation; no computed score/rank/chart; no standalone add-teacher/KPI/monthly page.

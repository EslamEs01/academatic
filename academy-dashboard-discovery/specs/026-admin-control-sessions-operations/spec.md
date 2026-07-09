# Feature Specification: Admin Control / Sessions / Operations + Global Action Completion Pass

**Feature Branch**: `feature/012-role-portal-foundation` (spec authored in place per the established 023–025 convention; no new branch)
**Spec**: 026 — Admin Control / Sessions / Operations + Global Action Completion Pass
**Created**: 2026-07-07
**Status**: Draft (specify phase — no plan, no tasks, no implementation, no commit)
**Input**: User `/speckit.specify` request — Admin Control Sessions Operations And Action Completion Pass

---

## Why this spec exists

Spec 025 completed the seven Teacher Internal Pages and brought the public HTML count to **91** (committed baseline, HEAD `e4ee3cd`). The role-portal surface (Specs 012–025) is now a full, honest set of role apps. The roadmap returns to **Admin**.

Spec 026 has **two layers**, both binding:

- **Layer A — Admin Control / Sessions / Operations.** Ground and (in a later implementation phase) make honest the admin operational surface around sessions, timetable/schedule control, attendance monitoring, session outcome/result review, cancellation & reschedule, daily operational controls, and admin→teacher/session/student cross-links — as far as legacy evidence supports, and no further.
- **Layer B — Global Action Completion Audit** over **all 91 current public pages.** Every visible button / link / action must resolve to one honest outcome. No page may feel like a dead static mockup.

Layer B is the product owner's **standing law** (`main-user-law`): every visible action must either (1) open its real page, (2) open a modal/drawer, (3) operate a real static tab/filter/switcher, (4) show an honest `backendRequired`/`planned` gate, or (5) be removed/reclassified if it is random or unsupported. Layer B does **not** mean building every future module now — it means every action is **classified and made honest**, with out-of-scope work assigned to an owner spec behind an honest gate.

### The grounded core finding (already established during specify)

The app already has strong no-dead-button discipline: `href="#"` is **0 sitewide**; `enhance.js` has a catch-all `toast(acknowledge(btn))` plus `data-coming-soon`, `data-disabled-reason`, and `data-confirm` handlers; the smoke suite already asserts "no dead buttons / no unexplained disabled controls." The real Layer-B substance is an **honesty inconsistency between two eras**:

- **Admin shell (Specs 001–009)** wires Create / Edit / Cancel / Save / Export row-actions to `data-demo-action` → a **«إجراء تجريبي / preview action» toast** (feedback, but no persistence and no explicit "needs a server" honesty).
- **Portal surface (Specs 012–025)** wires every unavailable action to a **non-interactive `backendRequired` gate** (labeled note, explicitly honest).

Spec 026's job is to **reconcile** these: reclassify admin actions that imply persistence (Create/Edit/Delete/Cancel/Save/Export/Upload) so their **final** step is an honest `backendRequired` confirmation/gate rather than a bare "preview action" toast — while keeping genuinely-honest behaviors (tabs, filters, drawers, entity previews, coming-soon nav) as they are. This is correction/alignment, **not** fake CRUD and **not** a new feature engine.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Admin manages daily sessions/operations without dead controls (Priority: P1)

An academy admin opens the sessions / schedule / attendance operational pages and every control has a clear outcome: create/edit/view/cancel/reschedule open a modal, drawer, or real page; the final persist step honestly declares it needs the server; filters and tabs work statically; nothing silently does nothing or fakes a save.

**Why this priority**: This is the primary admin operational surface and the direct subject of Layer A. Without it, the admin console still reads as a static mockup for its most-used daily flows.

**Independent Test**: Load the admin sessions/schedule/attendance pages; exercise every page-body action; confirm each opens a page/modal/drawer/tab/filter or shows an honest `backendRequired`/`planned` gate; confirm no final Create/Edit/Delete/Save persists or fakes persistence.

**Acceptance Scenarios**:

1. **Given** the admin sessions page, **When** the admin clicks "New session" / "Create", **Then** a create modal/drawer opens with the relevant fields and its final Save/Submit is an honest `backendRequired` gate (never a silent no-op, never a fake "saved" toast).
2. **Given** a session row, **When** the admin opens its row menu and clicks Edit / Cancel / Reschedule, **Then** a prefilled modal or confirmation modal opens whose final action is an honest `backendRequired` gate.
3. **Given** the admin schedule/timetable, **When** the admin uses a view tab or a filter, **Then** it operates statically and correctly (no server needed for view/filter/tab).

### User Story 2 — Admin opens create/edit/view/cancel/reschedule flows (Priority: P1)

For every grounded session operation, the admin can open the right surface: a create/edit modal or drawer, a read-only details drawer, or a confirmation modal — each with an honest final step.

**Why this priority**: These are the concrete operations Layer A must make honest; they are the actions most likely to currently resolve to a bare "preview action" toast.

**Independent Test**: For each of create/edit/view/cancel/reschedule on the admin ops pages, confirm a modal/drawer/page opens and the final persist step is `backendRequired`.

**Acceptance Scenarios**:

1. **Given** any admin ops Create/Edit action, **When** clicked, **Then** it opens a modal/drawer (or real page if one exists) — not just a toast.
2. **Given** any admin ops Delete/Cancel action, **When** clicked, **Then** a confirmation modal opens and the final confirm is `backendRequired` (the DOM row is never faked-deleted).
3. **Given** any admin ops View/Details action, **When** clicked, **Then** a read-only modal/drawer or a real detail page opens.

### User Story 3 — Admin reviews attendance/outcomes through honest gates (Priority: P2)

The admin can open attendance and session-outcome review surfaces; where writing a result requires a backend, the action is an honest `backendRequired` gate, never a fake attendance/outcome write.

**Why this priority**: Attendance/outcome review is core to admin operations but is inherently write-heavy; honesty here is essential and legally bound by the no-fake laws.

**Independent Test**: Open attendance/outcome review; confirm view/filter works statically and every write (mark attendance, save outcome, approve) is a `backendRequired` gate.

**Acceptance Scenarios**:

1. **Given** the admin attendance surface, **When** the admin reviews a session, **Then** the roster and status display statically and any "mark/save" is `backendRequired`.
2. **Given** an outcome-review surface, **When** the admin approves/records, **Then** the final action is `backendRequired` (no fake write).

### User Story 4 — Product owner sees every current button/link has an outcome (Priority: P1)

The product owner can open `current-action-inventory.md` and see every action across all 91 pages classified into an honest class, with any dead/misleading/missing action resolved (fixed in 026 or assigned to an owner spec behind an honest gate).

**Why this priority**: This is the explicit product-owner requirement (`main-user-law`) and the acceptance backbone of Layer B.

**Independent Test**: Read the inventory + dead-UI register; confirm coverage of all 91 pages and zero unresolved rows.

**Acceptance Scenarios**:

1. **Given** the action inventory, **When** the owner scans it, **Then** every action carries one classification from the approved taxonomy and no forbidden classification appears.
2. **Given** the dead-UI register, **When** the owner scans it, **Then** every listed item has a resolution (fix-now or owner spec + honest gate).

### User Story 5 — QA runs an action inventory and finds zero dead buttons (Priority: P1)

QA runs the smoke suite (extended by this spec) and every page passes: no `href="#"`, no dead links, no raw keys, no dead buttons, every `data-action` has a handler or honest gate, every create/edit/delete/view opens a page/modal/drawer/gate, no fake final submit/save/delete, filters/tabs work, and the role laws stay green.

**Why this priority**: Machine-checkable enforcement is what keeps the action-completion guarantee from regressing.

**Independent Test**: `npm run test:smoke` passes with the extended action-completion asserts.

**Acceptance Scenarios**:

1. **Given** the smoke suite, **When** it runs over all pages, **Then** the action-completion asserts pass and pay-free/zero-pay/child-view asserts stay byte-verbatim green.

### User Story 6 — Developer sees which missing actions belong to future specs (Priority: P2)

A developer can open `future-owner-register.md` and see every out-of-scope missing action mapped to its owner spec (027–032), `future-backend`, or `intentionally-excluded`, so Spec 026 does not accidentally absorb future admin families.

**Why this priority**: Keeps Spec 026 bounded and preserves the 027–032 sequence.

**Independent Test**: Every "missing / points-to-future-page" row in the inventory has a matching owner-register entry.

**Acceptance Scenarios**:

1. **Given** an action that points to a future family/course/finance/settings/report page, **When** classified, **Then** it is `missing-owner-future-spec` with an owner and an honest interim gate — never built in 026.

### User Story 7 — Teacher/family/student roles stay protected while admin ops improve (Priority: P1)

While admin operations are made honest, the teacher pay-free law, family zero-pay law, and student child-view law remain green, and no forbidden page is created.

**Why this priority**: These are absolute standing laws that a broad cross-page pass could accidentally violate.

**Independent Test**: The three role-law smoke assertions (teacher `payHit`, family `famPay`, student child-view wording) stay byte-verbatim green; no teacher chat/pay/live-room page, no family payment page, no student primary-role page is added.

**Acceptance Scenarios**:

1. **Given** the cross-page action pass, **When** it touches any role page, **Then** the role-law asserts remain green and no forbidden page/nav/token is introduced.

### Edge Cases

- **An action's "preview action" toast is arguably honest already.** Resolution: if the action does not imply persistence (e.g., a genuine demo toggle, a "copy", a benign acknowledge), it may stay; if it implies Create/Edit/Delete/Save/Export/Upload persistence, it must be reclassified to a `backendRequired` final step. The inventory records the judgment per action.
- **A control looks clickable (a card) but is display-only.** Resolution: classify `display-only-not-action` and ensure it carries no misleading affordance (cursor/hover) — or give it a real drill-down if one is grounded.
- **A button needs a page that is out of Spec 026 scope.** Resolution: do not build the page; convert to an honest `planned`/`backendRequired` gate and record the owner spec; add a smoke check so it never reads as dead.
- **A disabled control has no reason.** Resolution: attach a `data-disabled-reason` (honest label) or remove it.
- **Count drift.** Resolution: if `npm run build` does not yield exactly the count declared in planning, STOP and report before proceeding.
- **A legacy admin operation has thin/absent evidence.** Resolution: do not invent it; present it as an honest gate and record the evidence gap.

---

## Requirements *(mandatory)*

### Functional Requirements

**Grounding & audit**

- **FR-001**: Spec 026 MUST inspect exact legacy admin operational evidence (sessions, timetable/schedule, attendance, outcomes, cancellation/reschedule, daily ops, admin cross-links) from `output/roles/admin/`, `output/combined/`, `frontend-planning/`, `frontend-planning-deep/`, `design-references/`, and cite exact evidence paths — not memory or broad summaries.
- **FR-002**: Spec 026 MUST produce a **current action inventory covering all 91 public pages**; every `<a>`, `<button>`, `[data-action]`, `[data-modal]`, `[data-drawer]`, `[data-tab]`, `[data-filter]`, disabled/planned control, clickable-looking card, table row action, quick action, and sidebar/topbar action is accounted for. Shared shell chrome MAY be classified once and referenced, but no page may be omitted.
- **FR-003**: Spec 026 MUST classify every action as exactly one of: `real-page-link`, `real-static-tab`, `real-static-filter`, `real-modal`, `real-drawer`, `backendRequired-gate`, `planned-future-gate`, `permission-locked-gate`, `display-only-not-action`, `remove-or-reword`, `missing-needs-026-fix`, `missing-owner-future-spec`.
- **FR-004**: No action may carry a forbidden classification: `dead-button`, `href-hash`, `empty-link`, `fake-submit`, `fake-save`, `fake-delete`, `fake-upload`, `fake-download`, `fake-chat-send`, `fake-live-join`, `unexplained-soon`, `visual-button-with-no-outcome`.
- **FR-005**: Spec 026 MUST produce a **dead-UI register** listing every currently dead / missing-modal / missing-page / misleading / fake-looking / unexplained-disabled / planned-without-reason / `href="#"` / empty-anchor action, and MUST resolve every row (fixed in 026, or owner spec + honest gate). No row may remain unresolved.

**Button behavior (the completion contract)**

- **FR-006**: Create/Add/New MUST open a real create page (if one exists) or a static modal/drawer with the relevant fields; the final submit/save inside MUST be `backendRequired` when no backend exists; it MUST NOT silently do nothing.
- **FR-007**: Edit MUST open an edit page or a prefilled modal/drawer; the final save MUST be `backendRequired`.
- **FR-008**: Delete/Cancel/Stop/Suspend MUST open a confirmation modal; the final confirm MUST be `backendRequired`; the DOM MUST NOT be faked-mutated (no fake deletion).
- **FR-009**: View/Details MUST open a real detail page (if present) or a read-only modal/drawer with relevant static data.
- **FR-010**: Export/Print/Download MUST open a `backendRequired`/`planned` gate unless truly implemented; file generation MUST NOT be faked.
- **FR-011**: Upload MUST open an upload modal/drawer (if grounded) whose final upload is `backendRequired`; file upload MUST NOT be faked.
- **FR-012**: Save/Submit/Send MAY open a review/confirmation modal; the final action MUST be `backendRequired`; data save MUST NOT be faked.
- **FR-013**: Join/Live/Start/End class MUST always be a `backendRequired`/`future-backend` gate; no fake live-room, attendance write, or camera/mic/meeting engine.

**Admin ops scope (Layer A)**

- **FR-014**: Spec 026 MUST scope admin operational pages/modals/drawers ONLY where grounded in legacy evidence and current app inventory, around: sessions management, timetable/schedule control, attendance monitoring, outcome/result review, cancellation/reschedule, daily operational controls, admin→teacher/session/student links, and admin approvals/review gates if legacy supports them. Page names MUST derive from evidence, not assumption.
- **FR-015**: Admin create/edit forms MAY open modals/drawers; submit/save/cancel-confirm final actions MUST be `backendRequired`; details MAY open read-only modal/drawer; export/print MAY be `backendRequired` unless truly implemented; filters/tabs MUST work statically if present; **no fake CRUD**.
- **FR-016**: If a button needs a page in Spec 026 scope, the page/modal/drawer MAY be created (if grounded), registered in build (if a page), given AR/EN output, and covered by nav/smoke/a11y/screenshots. If a button needs a page **outside** Spec 026 scope, it MUST NOT be built now — convert to an honest `planned`/`backendRequired` gate, record the owner spec, and add a smoke check so it is not dead.

**No-fake & honesty**

- **FR-017**: All no-fake laws MUST hold: no fake create/save/edit/delete/submit/upload/download/export/print/chat/notification-count/live-room/attendance-write/outcome-write/payment/invoice-payment/report-generation/password-change. Honest alternatives only: `backendRequired`, `planned`, `future-backend`, `permission-locked`, `display-only`, read-only modal, confirmation modal with a `backendRequired` final step.
- **FR-018**: `href="#"` MUST remain 0 sitewide; no dead links; no raw i18n keys; every `[data-action]` MUST have a handler or resolve to an honest gate.

**Role laws (binding, unchanged)**

- **FR-019 (Teacher)**: Teacher pages remain pay-free (the extended token set incl. `$ € £ ريال جنيه راتب رواتب أجر مستحقات`); no teacher chat/live-room/pay/finance page; teacher live/upload/download/save/export = `backendRequired`.
- **FR-020 (Family)**: Family zero-pay stays green; no payment-amount leakage; no fake request/payment/upload behavior.
- **FR-021 (Student/Child view)**: Student remains child-view, not a primary role; no «لوحة الطالب» primary-role wording; no fake homework/profile/material actions.
- **FR-022 (Admin)**: Admin MAY show finance/admin-only operational data only where prior specs allow (Spec 009 finance invariant; authored invoice literals sanctioned, zero aggregate/math; salary/payroll figures never anywhere); admin actions MAY open modals/drawers but MUST NOT fake backend persistence.

**Count, impact, and verification**

- **FR-023**: Current public HTML count MUST be verified = 91 before proceeding; if different, STOP and report. Spec 026 MAY add pages only where evidence proves they are needed for Admin Control / Sessions / Operations; the expected count MUST be defined during planning; **no accidental removals, no unrelated additions**.
- **FR-024**: Impact protection — pages/modules outside the touched set MUST stay byte-identical; `package.json` MUST NOT change; no backend/API/auth; no new dependency; no new chart/live-room/chat/notification engine.
- **FR-025**: Smoke coverage MUST verify: public HTML count; all new/changed pages load; no `href="#"`; no dead links; no raw keys; no dead buttons; every `[data-action]` has a handler or honest gate; every create/edit/delete/view opens page/modal/drawer/gate; all admin ops modals/drawers open; no fake final submit/save/delete; filters/tabs work if present; teacher pay-free green; family zero-pay green; student child-view wording green; mobile-390 clean.
- **FR-026**: A11y MUST cover new/changed admin ops pages + at least one modal/drawer, with keyboard/focus safety, aria labels for gates, dark/light, mobile-390, critical=0, serious=0.
- **FR-027**: Screenshots MUST include changed admin ops pages, key modals/drawers, one global action-gate example, one mobile-390 proof, one dark-mode proof; `screenshots/REVIEW.md` MUST be updated.
- **FR-028**: Every out-of-scope missing action MUST be recorded in `future-owner-register.md` against an owner (027 families/students/courses/groups · 028 teachers/performance · 029 reports/analytics/feedback/forms · 030 finance/invoices/banks · 031 management/content/certificates/settings · 032 final QA · `future-backend` · `intentionally-excluded`).
- **FR-029**: This is a **specify** deliverable only — no implementation, no plan, no tasks, no commit, no push happen during this phase.

### Key Entities

- **Action** — a visible interactive affordance on a page (link, button, row action, tab, filter, card, gate). Attributes: page, label, element/selector, current behavior, expected behavior, classification, fix-in-026, owner spec, risk, acceptance check.
- **Dead-UI item** — an action currently failing the completion law. Attributes: id, page, action, problem, evidence, resolution, fix-now, owner spec, acceptance check.
- **Admin ops surface** — a page/modal/drawer in Layer A scope. Attributes: name, grounded evidence, action flows, which finals are `backendRequired`, expected HTML delta.
- **Gate** — an honest non-persistence outcome: `backendRequired`, `planned`, `future-backend`, `permission-locked`, `display-only`.
- **Owner-spec mapping** — an out-of-scope action → future spec / `future-backend` / `intentionally-excluded`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: **100% of the 91 public pages** appear in `current-action-inventory.md`; **0 pages** omitted.
- **SC-002**: **Every** inventoried action carries exactly one approved classification; **0** forbidden classifications remain.
- **SC-003**: **Every** dead-UI-register row has a resolution; **0** unresolved rows.
- **SC-004**: **0** `href="#"` sitewide; **0** dead buttons; **0** raw i18n keys (unchanged from baseline, re-verified across all pages).
- **SC-005**: **Every** Create/Edit/Delete/View/Export/Upload/Save/Send/Join action across the app has a defined honest outcome (real page / modal / drawer / static tab-filter / `backendRequired`/`planned` gate).
- **SC-006**: **Every** out-of-scope missing action has an owner-spec entry; **0** orphan "missing" rows.
- **SC-007**: Teacher pay-free, family zero-pay, and student child-view smoke assertions stay **byte-verbatim green**; **0** forbidden pages created.
- **SC-008**: The expected public HTML count is **defined and met** by build; **0** accidental removals, **0** unrelated additions.
- **SC-009**: A11y critical=0 and serious=0 across the new/changed admin ops pages and at least one modal/drawer, in dark/light and mobile-390.

---

## Assumptions

- **Spec 025 is the committed baseline** (HEAD `e4ee3cd`; working tree clean; 91 public HTML). No app changes happen during this specify phase.
- The existing action infrastructure is reused: the delegated `enhance.js` click dispatch, the `data-confirm` confirmation-modal pattern, the `data-drawer` entity-preview sheet, `data-tab`/`data-filter` static engines, and the portal `gateNote`/`plannedCard`/`guidePanel` honest gates. **No new hook or storage key** is assumed necessary; if one is, it must be justified in planning.
- Legacy is used as **capability coverage, not a pixel clone**; admin ops page names are determined by evidence during planning, not pre-named here.
- The action inventory MAY group identical shared shell chrome (topbar/rail actions present on all 40 admin pages, and the portal shell present on all role pages) into a single classified reference, provided every page is still explicitly covered and the grouping method is documented in `visual-grounding.md`.
- "Preview action" toasts that imply persistence (Create/Edit/Delete/Save/Export/Upload) are treated as **not honest enough** and are reclassification targets; benign acknowledgements (demo toggles, copy, non-persistence acknowledgements) MAY remain, judged per action.
- The finance boundary (Spec 009 / B-09) is binding: admin authored invoice literals are sanctioned; salary/payroll/compensation/payout figures are never allowed anywhere; family/teacher stay figure-free.
- Static-first constraints hold: no backend/API/auth/database, no new framework/CDN/dependency, GitHub-Pages-compatible complete pre-rendered pages, AR RTL + EN LTR, light/dark/system, native JS only.

---

## Artifacts (this spec folder)

- `spec.md` (this file)
- `visual-grounding.md` — legacy + current evidence opened; 91-page sampling/grouping method; exact gaps; what 026 fixes
- `legacy-admin-ops-coverage.md` — legacy admin op → evidence → current module → disposition → owner
- `current-action-inventory.md` — the 91-page action inventory (classified)
- `dead-ui-register.md` — every dead/missing/misleading action + resolution
- `admin-ops-page-scope.md` — admin ops pages/modals/drawers to create/update; which finals stay `backendRequired`; expected HTML count
- `modal-and-gate-scope.md` — the standard modal/drawer/gate/confirm/upload-export patterns to reuse
- `future-owner-register.md` — out-of-scope actions → owner spec / future-backend / excluded
- `checklists/requirements.md` — specify-phase quality gate

**Explicitly out of scope for 026 (owner specs):** 027 admin families/students/courses/groups · 028 admin teachers/performance · 029 admin reports/analytics/feedback/forms · 030 admin finance/invoices/banks · 031 admin management/content/certificates/settings · 032 final QA. **Never created:** teacher chat/pay/finance/live-room page, family payment page, student primary-role page, backend/API/auth, real CRUD persistence, real upload/download/export, real chat/live-room/notification engines.

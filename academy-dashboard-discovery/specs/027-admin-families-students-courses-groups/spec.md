# Feature Specification: Admin Families / Students / Courses / Groups Deep Management

**Feature Branch**: `feature/012-role-portal-foundation` (authored in place per the 023–026 convention)
**Spec**: 027 — Admin Families / Students / Courses / Groups Deep Management
**Created**: 2026-07-07
**Status**: Draft (specify phase — no plan, no tasks, no implementation, no commit)
**Input**: User `/speckit.specify` request — Admin Families Students Courses Groups Deep Management

---

## Why this spec exists

Spec 026 completed the Admin Control / Sessions / Operations pass and established the **standing action-completion law**: no page may feel like a dead static mockup — every visible action opens a real page, a modal/drawer, a real static tab/filter, or an honest `backendRequired`/`planned`/`permission` gate (or is removed/reworded). Spec 026 made the family/student/course/group pages **honest** (create primaries → backendRequired modals; inline verbs → honest backendRequired toasts; confirms reworded).

Spec 027 takes the next roadmap step (016 sequence / 021 DEC-009): the admin **deep-management** area — **Families · Students · Courses · Groups** and the enrollment/assignment relationships between them. It makes these pages feel like real, usable admin management screens by completing the management workflows (Create/Edit/View/Delete/Add/Assign/Enroll/Remove/Move) — **as honest static UI**, every write a `backendRequired` gate, no fake persistence.

This is correction/completion of an existing surface (9 pages already exist and are honest after 026), **not** a new feature area and **not** a backend.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Admin manages families without dead or fake actions (Priority: P1)

An admin opens Families → a family → the add-family wizard, and every action has an honest outcome: create/edit open a modal/drawer or the wizard; the final Create/Save is a `backendRequired` gate; suspend/stop open a confirmation whose final step is `backendRequired`; add-child and notes are honest gates; relationship links (to the family's students / schedule) are real.

**Why this priority**: Families is the entry point of the management graph (a family owns students); it must read as a real admin screen.

**Independent Test**: Load families/family/add-family; exercise every action; confirm each opens page/modal/drawer/tab/filter or an honest `backendRequired` gate; confirm no create/edit/delete/suspend persists or fakes success; family stays **zero-pay**.

**Acceptance Scenarios**:

1. **Given** the families list, **When** the admin clicks Add family, **Then** the real add-family wizard opens (existing page) and its final Save is a `backendRequired` gate.
2. **Given** a family detail, **When** the admin clicks Edit / Add child, **Then** a modal/drawer opens whose final Save/Add is `backendRequired` (no fake mutation).
3. **Given** a family, **When** the admin clicks Suspend/Stop, **Then** a confirmation modal opens whose final confirm is `backendRequired` (no DOM row change, no fake status flip).
4. **Given** any family surface, **Then** no currency/pay figure appears (family zero-pay).

### User Story 2 — Admin manages students and relationships honestly (Priority: P1)

An admin opens Students → a student profile, and can Edit, Add note, Enroll in a course, Assign to a group, and open related records (family/schedule/attendance) — each an honest outcome: real links where a page exists, modals/drawers for management, `backendRequired` finals for every write, no fake enrollment/assignment.

**Why this priority**: Students carry the course/group relationships; enroll/assign are the core deep-management operations.

**Independent Test**: Load students/student; exercise Edit / Add-note / Enroll / Assign-to-group / View-family / attendance; confirm modal/drawer/gate/link outcomes; no fake relationship mutation.

**Acceptance Scenarios**:

1. **Given** a student profile, **When** the admin clicks Enroll in course / Assign to group, **Then** an assignment modal/drawer opens whose final Assign/Enroll is `backendRequired` (no fake link created).
2. **Given** a student, **When** the admin clicks Edit / Add note, **Then** a modal/gate opens with a `backendRequired` final.
3. **Given** a student, **When** the admin opens family/schedule/attendance, **Then** real detail pages/links open.
4. **Given** the admin student page, **Then** no «لوحة الطالب» primary-role wording appears; no fake homework/material/profile persistence.

### User Story 3 — Admin manages courses and groups honestly (Priority: P1)

An admin opens Courses/course and Groups/group and can Create/Edit, Add students, Assign teacher (reference), Remove student, and open related schedule/attendance/roster — each honest: modals/drawers for management, `backendRequired` finals, no fake CRUD/enrollment, capacity/status display-only.

**Why this priority**: Courses/Groups complete the management graph and hold the roster + teacher-reference relationships.

**Independent Test**: Load courses/course/groups/group; exercise Add course/group, Edit, Add-students, Assign-teacher, Remove-student, View-schedule/attendance; confirm honest outcomes; no fake mutation.

**Acceptance Scenarios**:

1. **Given** a course/group, **When** the admin clicks Add students / Assign teacher, **Then** an assignment modal/drawer or `backendRequired` gate opens; no fake roster change.
2. **Given** a group, **When** the admin clicks Remove student, **Then** a confirmation modal opens whose final confirm is `backendRequired` (no DOM removal).
3. **Given** a course/group, **When** the admin clicks Add course/group / Edit, **Then** a create/edit modal opens with a `backendRequired` final.

### User Story 4 — Admin opens create/edit/view/remove/assign flows as modal/drawer/page/gate (Priority: P1)

For every management operation in scope, the admin gets the right surface: a real page where one exists, a modal/drawer for a bounded op, a confirmation for destructive ops, or an honest gate — never a dead button, never a fake success.

**Why this priority**: This is the concrete manifestation of the action-completion law for this domain.

**Independent Test**: Every inventoried action resolves to exactly one honest class; smoke asserts it.

**Acceptance Scenarios**:

1. **Given** any in-scope action, **When** clicked, **Then** it opens page/modal/drawer/tab/filter or shows an honest gate — 0 dead buttons, 0 `href="#"`, 0 fake finals.

### User Story 5 — Product owner verifies every family/student/course/group action has an outcome (Priority: P1)

The product owner opens `current-management-action-inventory.md` + `missing-action-register.md` and sees every action classified and every missing/dead/misleading action resolved (fixed in 027 or owner spec + honest gate).

**Independent Test**: Read the two registers; confirm full coverage of the 9 pages + shared components; 0 unresolved rows.

**Acceptance Scenarios**:

1. **Given** the registers, **Then** every action has an approved classification; 0 forbidden classifications; 0 unresolved missing-action rows.

### User Story 6 — Developer sees which out-of-scope actions belong to future specs (Priority: P2)

A developer opens `future-owner-register.md` and sees every out-of-scope action mapped to its owner (028 teachers/performance · 029 reports · 030 finance/billing · 031 management/content/certs/settings · 032 QA · future-backend · intentionally-excluded), so 027 stays bounded.

**Independent Test**: Every "out-of-scope / missing-owner-future-spec" inventory row has an owner-register entry.

**Acceptance Scenarios**:

1. **Given** a family billing/payment action, **When** classified, **Then** it is owner-030 or `intentionally-excluded` behind an honest gate — never built in 027, never a pay figure.

### User Story 7 — QA runs smoke/a11y/screenshots and finds zero dead or fake actions (Priority: P1)

QA runs the suite (extended by this spec) and every in-scope page passes: no `href="#"`, no dead links, no raw keys, no dead buttons, every action opens page/modal/drawer/gate, no fake final submit/save/delete/enroll/assign, filters/tabs work, role laws green, mobile-390 clean.

**Acceptance Scenarios**:

1. **Given** the suite, **When** it runs, **Then** the in-scope action-completion asserts pass and the Spec-026 protections stay green byte-verbatim.

### User Story 8 — Existing role laws from 021–026 stay green (Priority: P1)

Family zero-pay, student child-view, teacher pay-free, admin finance Spec-009 invariant, and the Spec-026 action-completion law all remain green while the management surface deepens.

**Acceptance Scenarios**:

1. **Given** the 027 pass, **When** it touches any page, **Then** all standing role/finance/action laws remain green and no forbidden page/token appears.

### Edge Cases

- **A management op has thin/absent legacy evidence** (e.g. a "move/transfer student" flow never captured). Resolution: do not invent the fields — present it as an honest `backendRequired`/`planned` gate and record the evidence gap.
- **An action points to a future domain** (billing amount, teacher deep-edit, certificate). Resolution: honest gate + owner-register; never built in 027; family billing never shows a figure.
- **A create/edit modal would be disproportionate**. Resolution: align to the sanctioned gate pattern (like the finance Create-invoice `data-disabled-reason` gate) — still honest.
- **A relationship write looks clickable but has no backend**. Resolution: `backendRequired` final; never a fake DOM mutation (no fake enroll/assign/remove).
- **Count drift**. Resolution: default is **97** (improve via existing pages/modals/drawers); any new standalone page must be legacy-justified in planning and the exact count re-verified by build — else STOP.
- **A Spec-026 protection regresses** (a reworded toast reverts, a modal becomes a fake toast). Resolution: STOP — the 026 action-completion asserts must stay green.

---

## Requirements *(mandatory)*

### Functional Requirements

**Grounding & audit**

- **FR-001**: Spec 027 MUST inspect exact legacy evidence for families/guardians, students, courses, groups, and their enrollment/assignment relationships (`output/roles/admin/*`, `output/combined/*`, `frontend-planning*`, `design-references/*`), citing exact paths — not memory, not a pixel clone; legacy = capability/workflow coverage.
- **FR-002**: Spec 027 MUST produce a **current management action inventory** covering the 9 pages (families/family/add-family/students/student/courses/course/groups/group) + their shared components, in their post-026 honest state; every `<a>`/`<button>`/`[data-action]`/`[data-modal-trigger]`/`[data-demo-action]`/`[data-confirm]`/`[data-drawer]`/`[data-tab]`/`[data-filter]`/disabled control accounted for.
- **FR-003**: Every action MUST be classified as exactly one of: `real-page-link`, `real-static-tab`, `real-static-filter`, `real-modal`, `real-drawer`, `backendRequired-gate`, `planned-future-gate`, `permission-locked-gate`, `display-only-not-action`, `remove-or-reword`, `missing-needs-027-fix`, `missing-owner-future-spec`. No forbidden classification (`dead-button`, `href-hash`, `empty-link`, `fake-submit`, `fake-save`, `fake-delete`, `fake-upload`, `fake-download`, `fake-enroll`, `fake-assign`, `fake-remove`, `fake-message-send`, `visual-button-with-no-outcome`).
- **FR-004**: Spec 027 MUST produce a **missing-action register** of every missing / dead / misleading / out-of-scope management action, each with a resolution (fixed in 027 or owner spec + honest gate). No unresolved row.
- **FR-005**: Spec 027 MUST produce an **entity-relationship scope** (Family owns Students; Student belongs to one Family; Student ↔ Courses; Student ↔ Groups; Course ↔ Groups; Group has Students; Group may reference an assigned Teacher; schedule/attendance are references, not owned by 027) — with the display fields and the relationship actions, marking which writes are `backendRequired`.

**Action behavior (the completion contract)**

- **FR-006 (Create/Add)**: Add family/student/course/group/child MUST open a real page (add-family wizard) or a create modal/drawer (or a review modal for the wizard final step); the final Create/Save/Add MUST be `backendRequired`; no fake creation.
- **FR-007 (Edit)**: Edit family/student/course/group MUST open a prefilled modal/drawer (or a real edit page if grounded); the final Save MUST be `backendRequired`; no fake update.
- **FR-008 (Delete/Remove/Suspend/Stop)**: MUST open a confirmation modal; the final confirm MUST be `backendRequired`; no fake DOM removal, no fake status mutation.
- **FR-009 (Assign/Enroll/Move/Transfer)**: assigning students to a course/group, moving/transferring a student, assigning a teacher (reference) to a group/course MUST open an assignment modal/drawer (or an honest gate); the final Assign/Enroll/Move MUST be `backendRequired`; no fake relationship mutation.
- **FR-010 (View/Details)**: MUST open a real profile/detail page (family/student/course/group exist) or a read-only drawer/modal with the related-record summary.
- **FR-011 (Message/Contact/Notify)**: `backendRequired`/`future-backend` gate only; no fake chat/send/composer.
- **FR-012 (Upload/Export/Print)**: `backendRequired`/`planned` gate unless truly implemented; no fake file generation, no fake upload.

**Domain scope**

- **FR-013 (Family)**: families-list improvements; family-detail action completion; add-family wizard honesty; edit-family modal/drawer; add-child modal/drawer or wizard step; suspend/stop confirmation → `backendRequired`; family notes → `backendRequired`; family↔student/schedule relation links real. Billing/payment actions stay gated (owner-030) or excluded — **no family payment figure ever**.
- **FR-014 (Student)**: students-list improvements; student-detail action completion; edit-student modal/drawer; add-note gate; enroll-in-course action; assign-to-group action; move/transfer only if legacy-grounded; attendance/schedule/family links stay real; message/contact → `backendRequired`.
- **FR-015 (Course)**: courses-list + course-detail action completion; add/edit-course modal/drawer; status/level/subject filters work; assign-teacher gate (reference; deep teacher mgmt = 028); add-students-to-course modal/gate; groups/schedule/attendance links real; remove-student confirmation if present.
- **FR-016 (Group)**: groups-list + group-detail action completion; add/edit-group modal/drawer; add-students-to-group modal/gate; assign-teacher gate; remove-student confirmation; schedule/attendance/course/student links real; capacity/status display-only.

**Standing laws (binding, unchanged)**

- **FR-017 (No fake)**: no fake create/save/edit/delete/remove/suspend/enroll/assign/move/upload/download/export/print/message; honest alternatives only (`backendRequired`/`planned`/`future-backend`/`permission-locked`/`display-only`/read-only modal/confirm-with-backendRequired-final). Preserve all Spec-026 protections (no preview-action persistence, no fake-success wording, no dead buttons, `href="#"`=0, no raw keys, every `data-action` handled-or-gated, admin ops pages + dashboard filter unchanged).
- **FR-018 (Family zero-pay)**: family pages stay figure-free; no payment-amount leakage; no family payment page.
- **FR-019 (Student child-view)**: no new standalone student role; no «لوحة الطالب» primary-role wording; no fake homework/material/profile persistence (the admin student page is admin-owned but the child-view law still holds on portal surfaces).
- **FR-020 (Teacher pay-free)**: teacher references stay pay-free; no teacher chat/pay/live-room page; deep teacher management is Spec 028.
- **FR-021 (Admin finance invariant)**: Spec-009 finance invariant preserved; no salary/payroll figures; **no new finance module in 027**.

**Count, impact, verification**

- **FR-022**: Current count MUST be verified = **97** before proceeding (STOP if not). Default = keep **97** via existing pages/modals/drawers; any new standalone page MUST be legacy-justified in planning and the exact count re-verified by build. No accidental removals, no unrelated additions.
- **FR-023**: Impact protection — pages/modules outside the touched set stay byte-identical (all portal pages + admin ops pages + index); `package.json` unchanged; no backend/API/auth/database; no new dependency/engine; reuse the CLOSED `data-*` hook set (the Spec-026 `data-modal-trigger`/`data-modal-title-key`/`data-modal-note-key`, `data-confirm`, `data-drawer`, `data-disabled-reason`, `data-tab`, `data-filter`) — no new hook unless planning justifies it.
- **FR-024**: Smoke MUST verify: count; all 9 pages + changed pages load; every Create/Add/Edit/Delete/Remove/Assign/View opens page/modal/drawer/gate; no fake final submit/save/delete/enroll/assign; no preview-action persistence; `href="#"`=0; no dead links/raw keys/dead buttons; filters/tabs work; teacher pay-free / family zero-pay / student child-view / admin finance invariants green; mobile-390 clean.
- **FR-025**: A11y MUST cover changed family/student/course/group pages + add-family wizard + ≥1 create modal + ≥1 edit modal/drawer + ≥1 confirm modal, keyboard/focus, gate aria, dark/light, mobile-390, critical=0 serious=0.
- **FR-026**: Screenshots MUST include the changed list + detail pages (family/student/course/group), add-family wizard final gate, one create modal, one edit modal/drawer, one confirm backendRequired final, mobile-390, dark; `REVIEW.md` updated.
- **FR-027**: Every out-of-scope missing action MUST be recorded in `future-owner-register.md` (028/029/030/031/032/future-backend/intentionally-excluded).
- **FR-028**: This is a **specify** deliverable only — no implementation, no plan, no tasks, no commit, no push.

### Key Entities

- **Family** — a guardian account owning students. Display: name, contact, category, status (active/trial/suspended/stopped/inactive), children. Actions: create/edit/suspend/stop/add-child/notes (writes = `backendRequired`). **No pay figures.**
- **Student** — a child record belonging to one family. Display: name, level, status, courses, groups, family, schedule/attendance refs. Actions: create/edit/note/enroll-course/assign-group/move (writes = `backendRequired`).
- **Course** — a curriculum unit. Display: name, subject, level, status, groups, roster count. Actions: create/edit/assign-teacher(ref)/add-students (writes = `backendRequired`).
- **Group** — a class group. Display: name, capacity/status, course, teacher(ref), students. Actions: create/edit/add-students/remove-student/assign-teacher(ref) (writes = `backendRequired`).
- **Teacher reference** — a read-only link/name only (deep teacher management = Spec 028).
- **Schedule/attendance reference** — real links to existing pages (not owned by 027).
- **Action** / **Missing-action** / **Gate** — as in Spec 026 (classified affordance / unresolved op / honest non-persistence outcome).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: **100%** of actions on the 9 management pages + shared components appear in `current-management-action-inventory.md`, each with exactly one approved classification; **0** forbidden classifications.
- **SC-002**: **Every** missing/dead/misleading/out-of-scope action has a resolution in `missing-action-register.md`; **0** unresolved rows.
- **SC-003**: **Every** Create/Add/Edit/Delete/Remove/Assign/Enroll/View/Message/Export action has a defined honest outcome (real page/modal/drawer/tab/filter/gate).
- **SC-004**: **0** `href="#"` sitewide; **0** dead buttons; **0** raw keys; **0** fake finals (no fake create/save/delete/enroll/assign/remove) — Spec-026 protections stay green byte-verbatim.
- **SC-005**: The entity-relationship map is fully scoped, and **every** relationship write is marked `backendRequired`.
- **SC-006**: **Every** out-of-scope action has an owner-register entry; **0** orphan rows.
- **SC-007**: Family zero-pay, student child-view, teacher pay-free, admin finance Spec-009 invariant smoke assertions stay **green byte-verbatim**; **0** forbidden pages created.
- **SC-008**: The expected public HTML count is **defined and met** by build (default 97); **0** accidental removals, **0** unrelated additions.
- **SC-009**: A11y critical=0 serious=0 across changed pages + wizard + ≥1 create modal + ≥1 edit modal/drawer + ≥1 confirm modal, in dark/light + mobile-390.

---

## Assumptions

- **Spec 026 is the committed baseline** (HEAD `a0189d0`; 97 public HTML; working tree clean). No app changes during this specify phase.
- The 9 management pages already exist and are honest after Spec 026 (create primaries = backendRequired modals; inline verbs = honest backendRequired toasts; confirms reworded). Spec 027 **completes** the management workflows (assign/enroll/edit-detail/remove) and upgrades toast-gates to modals/drawers where a bounded operation warrants it.
- Reuse the Spec-026 mechanism: the generalized `openModal()` (`data-modal-trigger` + `data-modal-title-key`/`data-modal-note-key`), `data-confirm` confirmations, `data-drawer` read-only previews, `data-disabled-reason` gates, `data-tab`/`data-filter` engines. **No new hook or storage key** assumed; if an assignment modal needs richer content, it reuses `openModal()`/`openSheet()` — justified in planning if anything new is required.
- Legacy is capability/workflow coverage, not a pixel clone; page names for any new standalone page are evidence-decided in planning, not pre-named here (default: no new page).
- Default count = **97**; a new page is the exception, legacy-justified + build-verified.
- Family billing/payment is owner-030 or excluded — **never a figure on a family surface**; deep teacher management is owner-028 (teacher here is a reference only).
- Static-first constraints hold: no backend/API/auth/database, no new framework/CDN/dependency, complete pre-rendered pages, AR RTL + EN LTR, light/dark/system, native JS only.

---

## Artifacts (this spec folder)

- `spec.md` (this file)
- `visual-grounding.md` — legacy + current evidence opened; sampling method; gaps; what 027 fixes
- `legacy-family-student-course-group-coverage.md` — legacy capability → evidence → current module → disposition → owner
- `current-management-action-inventory.md` — the 9-page action inventory (classified)
- `missing-action-register.md` — every missing/dead/misleading action + resolution
- `entity-relationship-scope.md` — the entity/relationship map + which writes are `backendRequired`
- `modal-and-page-scope.md` — create/edit/assign/remove/note/message/export surfaces (modal/drawer/gate/page) + expected count
- `future-owner-register.md` — out-of-scope actions → owner spec / future-backend / excluded
- `checklists/requirements.md` — specify-phase quality gate

**Out of scope for 027 (owner specs):** 028 admin teachers/performance · 029 reports/analytics/feedback/forms · 030 finance/invoices/banks · 031 management/content/certificates/settings · 032 final QA. **Never created:** teacher chat/pay/live-room page, family payment page, student primary-role page, admin finance/reports/settings pages, backend/API/auth, real CRUD persistence, real upload/download/export, real notification/chat/live-room engine.

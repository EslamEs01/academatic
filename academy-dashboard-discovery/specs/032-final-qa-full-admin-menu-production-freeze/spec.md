# Feature Specification: Final QA / Full Admin Menu Coverage / Create-Edit Forms Completion / Production Freeze

**Spec number**: 032 (final production-freeze spec)
**Feature directory**: `academy-dashboard-discovery/specs/032-final-qa-full-admin-menu-production-freeze/`
**Status**: SPECIFIED (specify-only — no plan, no tasks, no implementation, no commit)
**Baseline**: Spec 031 committed — HEAD `80449be` ("implement admin management for certificates and content library…"); working tree clean; public HTML **= 103**.

## Why this spec exists

Specs 021–031 rebuilt and deepened the admin / teacher / family dashboard frontend from legacy evidence. Spec 032 is the **final production-freeze** spec. It verifies the system is not merely visually complete but **operationally complete as a frontend**, and closes the one remaining class of gap the earlier specs left: **create/edit actions that open a backendRequired gate *too early* — before showing any form UI.**

### The core law (frontend completion)

Every visible **Add / Create / New / Edit / Duplicate / Manage / Assign / Enroll / Move / Upload / Generate / Approve / Reject** action must open an actual frontend **page, modal, drawer, tab, wizard, or form surface with visible fields**. The final **Save / Submit / Confirm** may be `backendRequired` (there is no backend) — but **the form UI itself must exist**. A button that jumps straight to "available when the backend is connected" with no form is *not* frontend completion.

The old honesty law is unchanged and still binding: **no fake persistence, no fake save/upload/PDF/payment/role-mutation/backend.** Spec 032 only clarifies *when* the gate is allowed: **the gate is honest only at the final commit step, not as the first-and-only response to an Add/Edit button when the form can be built from legacy evidence.**

### The grounded finding that motivates this spec

`enhance.js` `openModal()` (`src/js/enhance.js:417-435`) renders **only** a title + a backendRequired note + a Close button — it renders **no `<input>`, `<select>`, `<textarea>`, `<form>`, or Save**. Therefore **every `data-modal-trigger` Add/Edit/Create/Duplicate action opens a field-less gate.** A read-only census found **40 such actions** (39 field-less `openModal` triggers + 1 bare `disabled-reason` create) across the whole app — each with a grounded, fixture-backed form the frontend *could* show. These are the "too-early backendRequired gates" Spec 032 must fix (add the real fields; keep the final Save a gate). The **add-family wizard** (`add-family.js`) and the **14 Spec-027/028 candidate-list drawer pickers** already prove the correct "real UI → honest final gate" pattern; the fix generalizes that pattern to the 40 field-less modals.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Product owner verifies complete admin menu coverage (Priority: P1)

A product owner reviews `full-admin-menu-coverage-inventory.md` and finds every one of the 50 admin nav items classified as implemented / folded / deliberate-planned-gate / future-backend / disabled-with-reason — 0 unclassified, 0 stale coming-soon without an owner, 0 broken nav link.

**Independent Test**: The inventory lists all 50 items with status + route/fold-owner; the `nav.config.js` build guard passes; the Spec-010/029 nav block stays green; the 2 stale `FUTURE_ROUTES` documentation entries (`sessionsAnalysis`, `teacherCategories`) are recorded and (optionally) cleaned.

**Acceptance Scenarios**:
1. **Given** the menu inventory, **When** reviewed, **Then** no nav item is unclassified and every implemented item has a real route + built page.
2. **Given** `nav.config.js`, **When** the build runs, **Then** implemented⇒route / non-implemented⇒no-route / disabled⇒reasonKey all hold.

### User Story 2 — Admin sees a real form before the final gate on every Add/Create/Edit (Priority: P1)

An admin clicks any Add/Create/Edit/Duplicate action (Add Family, Edit Course, Add Teacher, Add Staff, Create-template, Add Material, Add Bank, Add expense-head, New session, Add note, …) and a **modal/drawer with visible, grounded fields** opens; the final Save/Submit is an honest backendRequired gate.

**Why this priority**: This is the defining gap of the whole rebuild and the reason Spec 032 exists.

**Independent Test**: For each of the 40 too-early actions, the opened surface renders ≥1 visible form control (`input`/`select`/`textarea`) from grounded fields; the final Save is a `data-disabled-reason`/backendRequired final; nothing persists, no row is added, no status flips.

**Acceptance Scenarios**:
1. **Given** "Add Teacher", **When** clicked, **Then** a surface opens with teacher fields (name/subjects/status/availability — **no pay**) and Save = gate.
2. **Given** "Edit Course", **When** clicked, **Then** a surface opens with course fields (title/subject/level/schedule — **no teacher-hour-rate**) and Save = gate.
3. **Given** "Add Staff", **When** clicked, **Then** a surface opens with staff fields (name/username/email/phone/role — **no password, no salary**) and Save = gate.
4. **Given** any of the 40, **When** clicked, **Then** it never responds with a field-less "backend required" toast/modal as its first-and-only UI.

### User Story 3 — Admin sees a real picker before the final gate on every Assign/Enroll/Move (Priority: P1)

An admin clicks any Assign/Enroll/Move/Transfer action and a **candidate-list picker UI** opens (the existing Spec-027/028 drawer pattern) before the final backendRequired confirm.

**Independent Test**: The 14 complete-picker drawers (`stu-enroll`, `grp-assign`, `crs-assign-teacher`, `trn-availability`, `fam-cat`, …) each render a candidate list + an honest final gate — verified already-green; Spec 032 re-pins them and completes the 3 hybrid category drawers (`trn-categories`, `rep-fbcat`, `lib-cats`) whose embedded **Create/Add** button still opens the field-less modal (they become form-bearing).

**Acceptance Scenarios**:
1. **Given** "Assign Student", **When** clicked, **Then** a picker list opens and the final assign is a gate.
2. **Given** a category drawer's "Create category", **When** clicked, **Then** a name/status/description form surface opens (not a field-less modal), Save = gate.

### User Story 4 — Admin meets honest gates (not fake files) on Upload/Generate/PDF (Priority: P2)

An admin clicks Upload/Download/Generate-PDF/Export/Import/Reconcile/Print and always meets an honest gate — **no `type=file`, no `<canvas>` designer, no generated/opened file, no fake success** — because those cannot be safely represented without a backend.

**Independent Test**: The MUST-GATE set (teacher CV/logo/library file/thumbnail/certificate-background uploads; certificate PDF preview/download/generate; WhatsApp pairing) stays a gate; smoke finds 0 real `type=file` inputs, 0 `<canvas>`, 0 `.pdf`/`blob:`/`window.open`.

**Acceptance Scenarios**:
1. **Given** any Upload action, **When** clicked, **Then** it is a gate with no `type=file`.
2. **Given** any Generate-PDF/Preview action, **When** clicked, **Then** it produces/opens no file.

### User Story 5 — QA proves zero dead UI and zero too-early gates (Priority: P1)

QA runs smoke and proves: 0 `href="#"`, 0 raw i18n keys (`⟦`), 0 dead buttons, 0 stale coming-soon-without-owner, and — the new freeze assertion — **0 field-less create/edit modals** (every Add/Edit surface renders ≥1 form control before its Save gate).

**Independent Test**: An additive smoke "form-completion" assertion opens each create/edit trigger and asserts a visible form control exists; the existing sitewide dead-UI asserts stay byte-verbatim.

**Acceptance Scenarios**:
1. **Given** the freeze smoke, **When** run, **Then** every create/edit surface shows a form control and every final Save is a gate.
2. **Given** the sitewide asserts, **When** run, **Then** `href="#"`=0, raw-keys=0, dead-buttons=0.

### User Story 6 — QA proves all role laws 021–031 remain green (Priority: P1)

QA reviews `role-law-regression-register.md` and confirms teacher pay-free, family zero-pay, student child-view, finance no-fake-money, and settings no-fake-settings are all green, each tied to its enforcing smoke assertion by file:line.

**Independent Test**: All 9 role-law guards + 8 no-fake guards pass; the protected regexes (`payHit`/`tchPay`/`famPay`/`payFigure`/child-view/finance-`forbidden`/no-mutation/`FAKE`) stay byte-verbatim; adding form fields introduces no pay/credential/file/figure token.

**Acceptance Scenarios**:
1. **Given** the freeze, **When** the new form fields ship, **Then** no teacher/staff form renders a pay/salary field and no form renders `type=password`/`type=file`/credential input.
2. **Given** the smoke diff, **When** reviewed, **Then** every protected assertion is byte-verbatim.

### User Story 7 — QA proves production-ready AR/EN, RTL/LTR, mobile, dark/light, a11y (Priority: P2)

QA confirms 11 locale pairs mirror (0 divergence), AR-RTL/EN-LTR render correctly, a mobile-390 + dark pass is present, and a11y is critical=0 serious=0 — including the newly-built form surfaces.

**Independent Test**: locale parity 0-divergence; the final screenshot/a11y pack adds the gaps found (mobile a11y rows, dark-per-family, missing EN a11y rows, modal-open a11y rows, the new form-modal frames); a11y 0/0.

**Acceptance Scenarios**:
1. **Given** the 11 locale pairs, **When** diffed, **Then** 0 keys diverge and every new form key is mirrored AR/EN.
2. **Given** the final pack, **When** run, **Then** a11y critical=0 serious=0 across all surfaces incl. the open-form state, and mobile 390 has no overflow.

### User Story 8 — Developer sees the final future-backend list (Priority: P2)

A developer reviews `future-backend-or-excluded-form-register.md` and finds every action that cannot safely show a form (real auth/credentials/upload/PDF/pairing/payout/pay-rate) recorded with legacy evidence + the reason it stays a gate.

**Acceptance Scenarios**:
1. **Given** the register, **When** reviewed, **Then** each future-backend-only action has evidence + a MUST-OMIT/MUST-GATE reason.

### Edge Cases

- **openModal is field-less** → the fix reuses the EXISTING `data-drawer`+`<template data-preview>` mechanism (a form-bearing drawer) OR a small additive `<template data-modal-form>` clone in openModal — **no new hook/storage key** either way. (`create-edit-forms-completion-inventory.md` §fix-strategy.)
- **MUST-OMIT fields** (grounded): password (family/teacher/staff), salary/hour-rate/fine (teacher/staff/course/group/settings pay-period), gateway/payout/SMTP/zoom credentials, 2FA `otp` — never rendered on any rebuilt form.
- **MUST-GATE affordances**: `type=file` (teacher CV, library file/thumbnail, certificate background, settings logo), certificate PDF preview/download + canvas designer, WhatsApp pairing — stay gates, no form.
- **Money arithmetic**: Record-payment's `basic+additional+taxes=Total` is the only computed-total form → stays a full gate (no live Total). Create-invoice + all other amounts are single authored literals (already sanctioned).
- **Add-Note** has no standalone legacy form → reuse each entity's own `notes`/`admin_note`/`teacher_note` field (not an invented entity).
- **create-group-from-course** has no distinct endpoint → a prefilled variant of the group form.
- **Count**: the fix is modals/drawers folded into existing pages → **no new pages; count holds at 103**. A standalone create/edit page is allowed only if a modal would be dishonest/cramped and legacy IA required a page (planning decides; default = no new page).
- **Stale `FUTURE_ROUTES`** (`sessionsAnalysis`, `teacherCategories`) → documentation-only drift, cleanup candidates (not a build-guard violation).

## Requirements *(mandatory)*

### Functional Requirements

**Coverage audits**
- **FR-001**: Produce `full-admin-menu-coverage-inventory.md` classifying all 50 nav items (0 unclassified); confirm the build guard + Spec-010/029 nav block green.
- **FR-002**: Produce `full-route-page-coverage-inventory.md` — every one of 103 built pages has a source owner (a `PAGES` entry) + both `.html`/`.en.html`; 0 orphan, 0 missing mirror, 0 accidental extra.
- **FR-003**: Produce `current-action-completion-inventory.md` — every visible action (link/tab/filter/modal/drawer/confirm/gate) classified into an honest class; none dead/fake.

**The forms-completion gate (core)**
- **FR-004**: Produce `create-edit-forms-completion-inventory.md` inventorying every Add/Create/New/Edit/Update/Duplicate/Manage/Assign/Enroll/Move/Transfer/Upload/Import/Generate/Approve/Reject/Request/Configure/Connect/Save/Submit/Delete/Deactivate/Activate/Reset/Invite action with: page · role · action · current UI target · opens-real-form? · fields-visible? · fields-grounded? · final-submit-backendRequired? · problem · fix · owner · acceptance. Classification ∈ {complete-form-ui, complete-readonly-drawer, complete-confirm-gate, missing-form-ui, too-early-backend-gate, future-backend-only-with-evidence, intentionally-excluded, owned-by-previous-spec-and-green}. No forbidden unresolved state (dead-button/href-hash/button-only-toast/coming-soon-without-owner/backendRequired-too-early/add-without-form/edit-without-form/create-without-form/upload-without-gate-or-form/duplicate-without-form/assign-without-picker).
- **FR-005**: Produce `missing-frontend-form-register.md` — the 40 too-early actions with the required frontend form, grounded fields, and fix; no unresolved row.
- **FR-006**: Every rebuilt create/edit form MUST render its grounded fields (from `create-edit-forms-completion-inventory.md`) and MUST end its Save/Submit as a `backendRequired`/disabled-with-reason gate that persists nothing, adds no row, flips no status.
- **FR-007**: No create/edit action MUST respond with a field-less backendRequired gate as its first-and-only UI when a form is possible.

**Honesty & exclusions**
- **FR-008**: Produce `future-backend-or-excluded-form-register.md` — every action that cannot safely show a form (password/credential/upload/PDF/pairing/payout/pay-rate) recorded with evidence + MUST-OMIT/MUST-GATE reason.
- **FR-009**: No rebuilt form MUST render a MUST-OMIT field (password/salary/hour-rate/fine/gateway/payout/SMTP/zoom credential/2FA-otp) or a MUST-GATE affordance as a working control (`type=file`/canvas-designer/PDF-generate/WhatsApp-pairing).
- **FR-010**: Produce `no-fake-behavior-freeze-register.md` — no fake save/delete/create/edit/assign/upload/download/PDF/payment/salary/permission/certificate/integration-connect/notification-send/backup/backend; each tied to its guard.

**Role laws & parity**
- **FR-011**: Produce `role-law-regression-register.md` — teacher pay-free, family zero-pay, student child-view, no teacher pay page, no family payment page, no student primary-role page, teacher-performance display-only, finance no-fake-money, settings no-fake-settings — each green with enforcing file:line.
- **FR-012**: Produce `locale-and-content-parity-register.md` — 11 locale pairs registered + mirrored (0 divergence); every new form key mirrored AR/EN; 0 raw keys.
- **FR-013**: Produce `mobile-a11y-screenshot-scope.md` — the final production-freeze a11y/screenshot pack scope (close the mobile-a11y, dark-per-family, missing-EN-a11y, interaction-state-a11y gaps; add the new form-modal frames).
- **FR-014**: Produce `visual-grounding.md` (evidence paths) + `production-freeze-checklist.md` (the final go/no-go list) + `checklists/requirements.md`.

**Freeze invariants**
- **FR-015**: The freeze MUST NOT introduce a new dependency/engine/hook/storage key; the forms fix reuses the closed `data-*` set.
- **FR-016**: The protected role-law + 026-031 smoke assertions MUST stay byte-verbatim; any smoke change is additive.
- **FR-017**: Count policy MUST be defined in planning (default: hold 103 via modals/drawers; a new page only if legacy IA requires it + build-verified).

### Key Entities *(audit artifacts; no runtime data)*

- **NavItem** — id, status, route/fold-owner, reasonKey.
- **PageRoute** — base, `.html`+`.en.html`, source owner, reachability.
- **ActionRow** — page, role, action label, UI target, classification, opens-real-form?, fields-grounded?, final-gate?, fix, owner.
- **FormSpec** — form name, grounded field list, MUST-OMIT fields, MUST-GATE affordances, evidence path.
- **RoleLawGuard** — law, enforcing assert file:line, verdict.
- **NoFakeGuard** — behavior, guard file:line, verdict.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of 50 nav items classified (0 unclassified); build guard + nav block green.
- **SC-002**: 100% of 103 pages owned (0 orphan, 0 missing mirror).
- **SC-003**: 100% of the ~40+ create/edit/assign/upload actions classified; **0 too-early-backend-gate** left unresolved (each either becomes a form/picker or is justified future-backend/excluded with evidence).
- **SC-004**: Every rebuilt create/edit form renders ≥1 visible grounded field and ends its Save as a backendRequired gate (0 field-less create/edit modals after the fix).
- **SC-005**: 0 MUST-OMIT field rendered (0 `type=password`, 0 salary/pay figure) and 0 MUST-GATE affordance working (0 `type=file`, 0 `<canvas>`, 0 `.pdf`/`blob:`/`window.open`) on any surface.
- **SC-006**: All 9 role-law guards + 8 no-fake guards green; protected regexes byte-verbatim.
- **SC-007**: 11 locale pairs 0-divergence; 0 raw keys; every new form key mirrored.
- **SC-008**: a11y critical=0 serious=0 (incl. open-form state + mobile 390); final screenshot pack 0 console errors.
- **SC-009**: Public HTML count matches the planning-fixed target (default 103); `package.json` 0-diff; no new hook/storage key/engine/dependency.
- **SC-010**: `production-freeze-checklist.md` fully green — the system is frozen-ready.

## Assumptions

- Baseline is Spec 031 committed (HEAD `80449be`, count 103, clean tree). If count ≠ 103 at plan/implement time, stop and report.
- The forms fix reuses the EXISTING drawer/template mechanism (Option B) or a small additive openModal `<template>` clone (Option A) — planning picks one; both avoid a new hook/storage key.
- Grounded fields come from `create-edit-forms-completion-inventory.md`; MUST-OMIT/MUST-GATE flags from `future-backend-or-excluded-form-register.md`.
- Count holds at 103 by default (forms are modals/drawers); planning may justify a standalone page only if a modal is dishonest/cramped.
- The exact fix mechanism, count, and smoke-assertion set are finalized in `/speckit.plan`.

## Scope

**In scope**: the full-system final QA (menu/route/action coverage) + the create-edit forms-completion fix (add real form fields to the 40 too-early gates, final Save = gate) + the freeze registers + the final a11y/screenshot pack.

## Out of Scope (routed or excluded)

- **future-backend / never-mocked**: real auth/user/permission engine · real upload/storage/download · real PDF/certificate generator · real integration connectors + credentials (gateway/payout/SMTP/zoom/WhatsApp-pairing) · real notification delivery · real backup/restore · reset-password/invite/2FA. (See `future-backend-or-excluded-form-register.md`.)
- **intentionally-excluded fields**: password/salary/hour-rate/fine/pay-period/credential/`type=password`/`type=file`/canvas-designer/computed-Total.
- **deliberate planned-gates owned by Spec 029** (studentResult/studentEvaluation/sessionsKpi/monthlyPerf/monthlyReports/dataAnalysis) + **future-backend nav** (messages/leads/tasks/announcements/timeConverter/scheduleSearch) — stay honest planned gates (documented owners).
- No new backend/API/auth/database, no new dependency/engine/hook/storage key.

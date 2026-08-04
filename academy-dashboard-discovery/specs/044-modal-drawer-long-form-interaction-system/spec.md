# Feature Specification: Modal, Drawer & Long-Form Interaction System

**Feature Branch**: `044-modal-drawer-long-form-interaction-system`  
**Created**: 2026-08-02  
**Status**: Specified — quality review passed  
**Input**: User description: "Create, plan, task, implement, and independently verify Academatic Spec 044 — Modal, Drawer & Long-Form Interaction System."

## Purpose and Evidence Authority

Spec 044 defines and applies one product-wide contract for confirmation modals, simple-form modals, preview and form drawers, long-form and long-details drawers, mobile full-screen surfaces, large wizards, dedicated very-large-form pages, shared overlay/focus/scroll behavior, unsaved-change protection, validation, truthful operation states, the mobile sidebar, and the non-modal dropdown boundary.

The requirements below are grounded in [Targeted Visual Grounding](targeted-visual-grounding.md), the live interaction inventory reconstructed there, the Spec-042 interaction carry-forward ledger, the frozen Spec-041 route/navigation model, and the protected Spec-043 privacy/RBAC contracts. Where a requirement cites “TVG inventory,” it refers to the exact current-tree counts and source observations in that evidence record.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open, use, and close the right interaction safely (Priority: P1)

As a staff member, teacher, family member, or student, I can open any available interaction and receive the presentation appropriate to the task, with predictable close behavior and no dead trigger.

**Why this priority**: Every other workflow depends on reliable trigger mapping, one active surface, and safe dismissal.

**Independent Test**: Exercise every inventoried opener-to-target mapping in both locales and verify that the expected family opens, required selectors fail loudly, safe dismissal works, and focus returns to the exact opener.

**Acceptance Scenarios**:

1. **Given** a concise important or destructive action, **When** its trigger is activated, **Then** a compact confirmation modal opens with the safest initial focus and deterministic cancel/confirm choices.
2. **Given** a bounded simple form, **When** its trigger is activated on desktop, **Then** a readable medium form modal opens without long scrolling or clipped actions.
3. **Given** a contextual detail or long form, **When** its trigger is activated, **Then** a full-height drawer opens with stable header, independently scrolling content, and stable actions where applicable.
4. **Given** a required opener whose target is absent, duplicated, or unresolved, **When** inventory or interaction verification runs, **Then** the verification fails explicitly rather than substituting a toast or silently continuing.
5. **Given** an interaction is open, **When** it closes safely, **Then** the overlay, listeners, classes, scroll lock, and background isolation are removed exactly once and focus returns to the exact opener.

---

### User Story 2 - Complete interactions on mobile without clipping (Priority: P1)

As a user at the project mobile breakpoint, especially at exactly 390px, I can read and complete applicable modal, drawer, and sidebar interactions without anything leaving the screen.

**Why this priority**: Grounding proves an existing student form is almost entirely off-screen and the mobile sidebar is clipped.

**Independent Test**: Open each distinct interaction family at 390px in AR/RTL and EN/LTR, with long content and keyboard-sensitive focus, then verify viewport containment, scroll, header/footer/action reachability, safe-area handling, and zero horizontal overflow.

**Acceptance Scenarios**:

1. **Given** an applicable modal or drawer at 390px, **When** it opens, **Then** it safely fills the available dynamic viewport and exposes a visible close/back action.
2. **Given** a long form and an on-screen keyboard, **When** a lower field receives focus, **Then** the field and primary action can still be reached without permanent obstruction.
3. **Given** AR/RTL or EN/LTR, **When** a mobile surface opens and closes, **Then** it never translates outside the viewport or creates horizontal overflow.
4. **Given** the existing mobile sidebar, **When** it opens, **Then** it behaves as a modal-grade surface without changing its information architecture or routes.

---

### User Story 3 - Keep meaningful edits until I explicitly discard them (Priority: P1)

As a user editing meaningful data, I receive a warning before an accidental close or departure, and canceling that warning preserves everything I entered.

**Why this priority**: The current interaction system has no shared dirty-state protection, creating direct data-loss risk.

**Independent Test**: Change meaningful editable data, attempt every supported dismissal/departure path, verify one in-surface discard decision, cancel it, and prove values remain; then confirm discard and prove the defined in-memory draft is cleared.

**Acceptance Scenarios**:

1. **Given** unchanged initial values, **When** the user closes, **Then** no discard warning appears.
2. **Given** meaningfully changed values, **When** the user presses Escape, clicks the overlay, activates close, navigates away, switches to an incompatible surface, reloads, or leaves a dedicated long-form page, **Then** the close guard warns before loss.
3. **Given** a dirty modal or drawer, **When** the warning is shown, **Then** it replaces or appears inside the current surface and never opens a second modal or focus trap.
4. **Given** the user chooses continue editing, **When** the normal editing state returns, **Then** all entered values and focus context remain.
5. **Given** a theme, locale, responsive-mode, wizard-step, validation, backend-required, or recoverable-error transition, **When** the transition completes, **Then** current input remains available.
6. **Given** sensitive or private fields, **When** draft protection operates, **Then** their values remain in the active in-memory session and are absent from storage, URLs, generated content, attributes, and logs.

---

### User Story 4 - Correct validation and truthful terminal states (Priority: P1)

As a user submitting a form, I receive accessible validation and truthful backend-required or real operation feedback without losing my entries or seeing a false success.

**Why this priority**: The product is frontend-only for many terminal actions, and current shared forms lack a complete validation/error contract.

**Independent Test**: Submit each representative form family with invalid data and then with valid data that reaches a backend-required gate; verify error semantics, focus/announcement, preserved values, no duplicated messages, and no saved/submitted claim.

**Acceptance Scenarios**:

1. **Given** invalid input, **When** submission is attempted, **Then** field messages, invalid semantics, descriptions, and an appropriate summary appear while the values remain editable.
2. **Given** an error in a hidden wizard step, **When** submission is attempted, **Then** the affected step and error become discoverable and focus moves appropriately.
3. **Given** a frontend-valid action without a server connection, **When** its terminal action is invoked, **Then** the user is told that a backend/server connection is required and that the current information has not been saved.
4. **Given** a real asynchronous operation, **When** it is pending or fails recoverably, **Then** duplicate action is prevented, state is announced, input remains, and controls recover without false success.
5. **Given** no real asynchronous work, **When** the action runs, **Then** no fake loading delay or progress state is shown.

---

### User Story 5 - Navigate by keyboard without focus loss or leakage (Priority: P1)

As a keyboard or assistive-technology user, I can understand, enter, navigate, and leave every modal-grade interaction while the background remains unavailable.

**Why this priority**: Current confirms and generic modals lack focus trapping/background isolation, while the drawer implementation provides only a partial trap.

**Independent Test**: Open each family, verify accessible name/description and initial focus, cycle Tab and Shift+Tab, attempt background focus, trigger validation, resize, and close; verify visible focus and exact restoration.

**Acceptance Scenarios**:

1. **Given** an open modal-grade surface, **When** Tab or Shift+Tab reaches a boundary, **Then** focus wraps inside the current surface.
2. **Given** a modal-grade surface is open, **When** background content is queried or navigated, **Then** no hidden/background control is focusable or operable.
3. **Given** a destructive confirmation, **When** it opens, **Then** the safest action—not blindly the first DOM focusable—receives focus.
4. **Given** validation failure or responsive mode change, **When** the surface updates, **Then** focus remains visible, meaningful, and inside the same interaction.
5. **Given** the surface closes, **When** its exact opener still exists, **Then** focus returns to that opener.

---

### User Story 6 - Use dropdowns without modal behavior (Priority: P2)

As a user opening a row or global menu, I receive a keyboard-operable non-modal popover that closes predictably without trapping focus.

**Why this priority**: The live product has 405 dropdown/menu openers per locale and they must not be broken by the global modal system.

**Independent Test**: Exercise representative row and global menus inside and outside an active interaction, including Arrow, Home/End, Escape, outside click, and focus restoration.

**Acceptance Scenarios**:

1. **Given** a dropdown opener, **When** it opens, **Then** the popover is not modal and does not isolate the page or trap focus.
2. **Given** an open dropdown, **When** Escape or outside click occurs, **Then** it closes and logical focus is preserved or restored.
3. **Given** a menu with multiple options, **When** directional keys, Home, or End are used, **Then** focus follows the expected menu order.
4. **Given** a dropdown inside an active modal-grade surface, **When** it is used, **Then** it remains operable without becoming a second modal-grade overlay.

---

### User Story 7 - Complete a very large workflow on a dedicated page (Priority: P2)

As a user completing the current multi-section family workflow, I remain on a dedicated page with understandable step navigation, protected edits, and reliable return navigation.

**Why this priority**: Legacy and current evidence prove this workflow is too large for an overlay, and the current dedicated page must share the new state contract.

**Independent Test**: Traverse the localized `add-family` steps, alter data, move between steps, attempt departure, return to editing, and reach the truthful backend-required terminal action without losing values or changing the frozen navigation model.

**Acceptance Scenarios**:

1. **Given** the existing very-large family workflow, **When** it is classified, **Then** it remains a dedicated page and no new route/sidebar domain is created.
2. **Given** changes on any step, **When** the user moves between steps or cancels a departure warning, **Then** values remain in the active session.
3. **Given** a final backend-required action, **When** invoked, **Then** validation is completed first and no save or completion is claimed.

---

### User Story 8 - Preserve privacy, routes, locale, theme, and generated parity (Priority: P1)

As a product owner, I can adopt the shared interaction system without regressing Spec-043 privacy/RBAC, Spec-041 navigation, AR/EN parity, theme support, or source/generated ownership.

**Why this priority**: Shared host changes touch protected policy drawers and every generated page.

**Independent Test**: Run protected privacy tests, route/page inventories, bilingual/theme/responsive matrices, source/generated parity, and exact impact accounting after all migrations.

**Acceptance Scenarios**:

1. **Given** a protected staff, teacher, or student surface, **When** its host migrates, **Then** privacy/RBAC content and authorization evidence remain unchanged and green.
2. **Given** a locale or theme change while a form is dirty, **When** the surface re-renders or adapts, **Then** data and interaction state remain and layout remains usable.
3. **Given** the completed build, **When** page and body impact is calculated, **Then** every changed page is explained by an authored source owner and unrelated drift is zero.

### Edge Cases

- The opener is removed while its interaction is open: close safely and focus the nearest logical surviving control without throwing.
- The target template is missing, duplicated, nested unexpectedly, or mapped by the wrong dynamic row-menu family: fail the required guard explicitly.
- A surface has no normally focusable control: focus its named heading or surface container and keep containment valid.
- A dirty surface receives another modal-grade open request: retain one overlay and use an approved replacement/transition only after the close guard resolves.
- Escape or overlay click occurs during a real non-cancellable operation: keep the surface open and announce why dismissal is unavailable.
- Multiple open calls occur during animation: end in one deterministic state with one overlay, one lock, and one listener set.
- A validation message becomes long under translation or text zoom: keep field, message, summary, and action reachable without horizontal overflow.
- A dropdown/select/date popover opens inside a modal-grade surface: keep it non-modal and within the active focus boundary.
- A browser lacks optional viewport/safe-area capabilities: retain a usable bounded fallback without extending outside the viewport.
- The user returns an edited value to its initial normalized value: clear dirty state.
- A backend-required state is retriggered: do not duplicate announcements, messages, or errors.
- An interaction contains sensitive Spec-043 data: never place values in persistent client storage, URL state, generated files, or logs.

## Requirements *(mandatory)*

### Functional Requirements

#### Inventory, classification, and ownership

- **FR-001**: The product MUST maintain a deterministic inventory of every current modal, drawer, wizard, dedicated long-form page, mobile-sidebar trigger, dropdown, opener, closer, target, form, locale, direction, theme, viewport behavior, scroll region, action region, state behavior, nested risk, duplicate-ID risk, source owner, generated consumer, and owning specification. [Evidence: TVG inventory and source table.]
- **FR-002**: Inventory generation MUST fail explicitly for missing expected source, missing opener, unresolved target, duplicate target or page record, duplicate interaction/field ID, parser failure, unsupported fallback, silently ignored interaction, or source/generated mismatch. [Evidence: TVG nested-ID and `openSheet()` fallback findings.]
- **FR-003**: Every current interaction MUST have an evidence-based record of current type, required type, migration need, source owner, generated consumers, and final verified state. [Evidence: Spec-042 carry-forward and TVG classification boundary.]
- **FR-004**: A small confirmation modal MUST be used only for one concise important/destructive decision with no unrelated form or long content. [Evidence: attendance/teacher confirmation captures.]
- **FR-005**: A medium simple-form modal MUST be used for a bounded, single-purpose form that remains understandable and completable without long scrolling; classification MUST consider workflow, context, sections, repeatability, validation, and scrolling rather than an arbitrary field count. [Evidence: legacy admin and current bounded-form captures.]
- **FR-006**: A drawer MUST be used for contextual details, vertical reading, contextual editing, long/repeatable forms, or interactions that need the underlying page context. [Evidence: attendance details, family edit, lead create, policy drawers.]
- **FR-007**: A dedicated page MUST be used for a very large, multi-section workflow needing substantial navigation, review, or persistent context; the existing `add-family` workflow MUST remain the current dedicated-page instance and no additional page may be created without inventory proof. [Evidence: legacy family create and current wizard.]
- **FR-008**: Dropdowns, tooltips, date pickers, select popovers, and menus MUST be classified as non-modal unless repository evidence proves otherwise. [Evidence: student row kebab and dropdown source.]
- **FR-009**: Each deferred issue MUST name exactly one future owning specification with rationale; FO-24 remains Spec 056 and FO-26 remains Spec 057. [Evidence: carry-forward registers.]

#### Open, close, overlay, and nesting

- **FR-010**: Every required opener MUST deterministically reach exactly its mapped surface, and no required selector or mapping may fail silently or substitute an unrelated toast. [Evidence: `openSheet()` fallback and Spec-043 selector history.]
- **FR-011**: Opening and closing MUST produce no stale state class, duplicate listener, duplicate overlay, flashing, race, layout jump, or off-viewport surface, and MUST honor reduced-motion preference. [Evidence: current separate overlay paths and animation teardown.]
- **FR-012**: The product MUST permit at most one active modal-grade overlay, one focus trap, one Escape authority, and one body-scroll lock at a time. [Evidence: independent drawer/confirm/modal implementations.]
- **FR-013**: A logical transition between modal-grade interactions MUST replace content in the current surface, advance an internal step, close-before-open while preserving required state, or navigate to a dedicated page; it MUST NOT stack modal over modal/drawer or drawer over modal/drawer. [Evidence: nested feedback path.]
- **FR-014**: Safe close controls, Escape, and overlay click MUST close deterministically; unsafe dirty or real non-cancellable states MUST route every close/departure request through the shared guard. [Evidence: no current dirty/operation guard.]
- **FR-015**: Closing MUST remove all interaction-owned overlay, lock, listener, background-isolation, loading, and transition state exactly once and restore the prior scroll position. [Evidence: current partial timeout teardown.]
- **FR-016**: If an exact opener survives, closing MUST restore focus to it; if it does not, focus MUST move to a documented nearest logical surviving control. [Evidence: current single `lastFocus` variable.]

#### Accessibility and focus

- **FR-017**: Every applicable modal-grade surface MUST expose dialog semantics, modal state, an accessible name, and an accessible description when needed. [Evidence: current partial semantics.]
- **FR-018**: Initial focus MUST be chosen by interaction purpose: safest action for destructive confirmation, first meaningful field for a simple form, heading/logical control when field focus is harmful, and current-step heading/control for a wizard. [Evidence: current confirm-first and first-focusable behavior.]
- **FR-019**: Tab and Shift+Tab MUST remain contained within the active modal-grade surface, including boundary wrapping and dynamically enabled/disabled controls. [Evidence: drawer-only partial trap.]
- **FR-020**: Background content MUST be non-interactive and unreachable while a modal-grade surface is active, with no hidden interactive element remaining focusable. [Evidence: no current inert/background isolation.]
- **FR-021**: Focus indicators MUST remain visible in both themes, both directions, at zoom/enlarged text, after validation, during state transitions, and across responsive changes. [Evidence: visual matrix gaps.]
- **FR-022**: Validation, loading, backend-required, and recoverable-error messages MUST be announced and correctly associated with the affected field or region. [Evidence: missing shared state semantics.]
- **FR-023**: Close/back controls MUST have accessible names and remain reachable in every viewport and locale. [Evidence: clipped mobile sidebar capture.]

#### Mobile sidebar and non-modal dropdowns

- **FR-024**: The mobile sidebar MUST use modal-grade focus containment, background isolation, safe Escape/close behavior, focus restoration, scroll lock/restoration, and viewport containment without altering Spec-041 IA or routes. [Evidence: two mobile sidebar captures and source.]
- **FR-025**: A dropdown MUST close on Escape and outside click, preserve or restore logical focus, support applicable directional/Home/End keyboard navigation, and MUST NOT use modal semantics, background isolation, or a modal focus trap. [Evidence: dropdown source and row-kebab capture.]
- **FR-026**: A dropdown or supported popover inside an active modal-grade surface MUST remain operable without becoming a second modal-grade overlay or escaping the active interaction boundary. [Evidence: nested-popover risk.]

#### Scroll, viewport, and layout

- **FR-027**: Opening a modal-grade interaction MUST lock background scroll where appropriate, prevent scrollbar-induced layout shift, and restore the exact prior scroll position on close. [Evidence: no current body lock.]
- **FR-028**: Long surfaces MUST provide a stable title/close header, independently scrollable content, and a stable footer/action region when actions exist. [Evidence: lead/family/report drawer captures.]
- **FR-029**: The primary/save action MUST remain visible or reliably reachable; content, controls, validation, toast, and error messages MUST not clip or create horizontal overflow. [Evidence: long drawer and mobile clipping.]
- **FR-030**: At the project mobile breakpoint and exactly 390px, every applicable modal and drawer MUST safely fill the available dynamic viewport, account for safe areas and keyboard appearance, and keep header, footer, close/back, active field, and actions usable. [Evidence: student-add and settings mobile captures.]
- **FR-031**: Directional placement, motion, icons, alignment, and logical spacing MUST remain correct for AR/RTL and EN/LTR without translating a surface outside the viewport. [Evidence: 390px RTL failure.]
- **FR-032**: Long validation messages, enlarged text, and zoom MUST not hide required content or actions; unavoidable nested scrolling MUST be minimized and documented. [Evidence: missing long-state coverage.]

#### Unsaved changes and data preservation

- **FR-033**: A surface MUST become dirty only after meaningful editable data differs from its normalized initial state and MUST become clean again when values return to that state. [Evidence: no current dirty model.]
- **FR-034**: Dirty close button, Escape, overlay click, incompatible-surface open, route/page navigation, dedicated-page departure, and supported reload/close attempts MUST warn before discard. [Evidence: current unconditional close.]
- **FR-035**: The discard warning MUST use one in-surface/replacement state with one overlay and one focus trap; it MUST NOT open a nested modal. [Evidence: one-overlay requirement and absent current state.]
- **FR-036**: The warning MUST offer clear continue-editing and discard choices; continuing MUST restore the editing state, values, and meaningful focus, while confirmed discard MAY clear the active in-memory draft. [Evidence: user contract.]
- **FR-037**: Client validation failure, backend-required state, recoverable error, theme change, locale change, responsive change, wizard navigation, temporary internal state change, and canceled close MUST preserve entered values. [Evidence: no shared preservation contract.]
- **FR-038**: Sensitive/private values MUST NOT be persisted to local or session storage, URLs, generated files, logs, or HTML attributes for draft protection. [Evidence: Spec-043 privacy contracts.]
- **FR-039**: Persistence beyond the active in-memory interaction session MUST be introduced only with repository evidence, field sensitivity classification, documented lifetime/clearing, and no false server-persistence claim. [Evidence: frontend-only architecture and privacy contracts.]

#### Validation and operation states

- **FR-040**: Validation MUST provide human-readable AR/EN field messages near affected controls, non-color-only indication, invalid semantics, described relationships, and an error summary where appropriate for long forms. [Evidence: missing shared validation layer.]
- **FR-041**: Invalid values MUST remain available for correction, repeated submission MUST not duplicate errors, corrected fields MUST update deterministically, and success MUST not appear while errors remain. [Evidence: state-contract gap.]
- **FR-042**: Failed validation MUST move focus to an appropriate summary or first invalid field without losing values; hidden wizard-step errors MUST expose the affected step. [Evidence: wizard and long-form requirements.]
- **FR-043**: Loading MUST appear only during real asynchronous work, announce busy state, prevent duplicate submission, preserve data, provide understandable progress, honor safe cancel rules, avoid indefinite state, and restore controls after failure. [Evidence: no real async work in current representative forms.]
- **FR-044**: Recoverable errors MUST provide clear AR/EN messages, a meaningful retry path where one exists, preserved input, a focus/announcement path, and no duplicate message or false success. [Evidence: absent current error state.]
- **FR-045**: The backend-required state MUST distinguish valid client data from missing server capability, preserve the form, remain accessible, provide a clear next action, and never claim submission, persistence, authorization, completion, acceptance, or record creation. [Evidence: current global copy and frontend-only terminal actions.]
- **FR-046**: The shared backend-required copy MUST communicate that completion requires a backend/server connection and current information has not been saved; every consumer MUST use the global key only when it is truthful, otherwise an evidence-based specialized key MUST be mapped explicitly in AR and EN. [Evidence: locale copy and 7 direct/40 generated-page consumers.]
- **FR-047**: `confirm-modal.js` MUST be included in the small-confirmation audit but MUST NOT be included in the `common.backendRequiredNote` copy sweep unless a concrete consumer supplies or mishandles that key. [Evidence: source inspection.]

#### Locale, theme, responsive, and privacy parity

- **FR-048**: Every distinct interaction family and implementation variant MUST behave equivalently in AR/RTL and EN/LTR, light and dark themes, desktop, relevant tablet layouts, and exactly 390px mobile. [Evidence: TVG matrix.]
- **FR-049**: Translated copy, focus rings, overlays, surfaces, disabled/loading/destructive/error/validation states, icons, labels, headers, and footers MUST remain readable, distinguishable, and unclipped in every required matrix cell. [Evidence: current missing state matrix.]
- **FR-050**: Theme or locale changes MUST NOT destroy dirty data or active interaction state. [Evidence: data-preservation contract.]
- **FR-051**: Spec-043 parent-contact, teacher capability/pay-free, student child-view, and sensitive-data protections MUST remain unchanged in meaning and pass all protected tests after host migration. [Evidence: protected policy screenshots/contracts.]
- **FR-052**: Spec-041 routes, sidebar domains, navigation information architecture, and established return navigation MUST remain unchanged unless the interaction inventory independently proves a dedicated page is required. [Evidence: frozen Spec-041 model.]

#### Deterministic verification, mutations, and impact

- **FR-053**: Verification MUST prove every inventoried opener, target, close control, dismissal rule, focus boundary/restoration path, background isolation, scroll lock/restoration, mobile rule, sticky action rule, dirty-state transition, validation state, backend-required state, nesting rule, and locale/theme variant without optional assertions or swallowed required failures. [Evidence: user acceptance contract and prior selector defect.]
- **FR-054**: Protected tests MUST not be weakened; every additive guard block or declared supersession that requires mutation proof MUST receive one-mutation isolated RED evidence, intended-guard attribution, restored primary-tree GREEN, isolated-copy removal, and zero residue. [Evidence: protected-test/mutation registers.]
- **FR-055**: Mutation coverage MUST include missing opener, wrong trigger target, removed dialog semantics, disabled focus trap, broken focus restoration, removed Escape behavior, unguarded dirty close, allowed nested modal, unrestored body scroll, removed 390px full-screen rule, removed stable footer/action rule, invalid backend-required copy, missing AR/EN copy, and swallowed selector failure. [Evidence: user mutation contract.]
- **FR-056**: A mutation RED MUST NOT be accepted when caused by syntax/load failure, unrelated exception, missing fixture, broken build, or any failure other than the intended guard. [Evidence: mutation contract.]
- **FR-057**: Before implementation, the project MUST record truthful accepted baselines for source files, generated pages, page and page-body count, interaction and backend-note consumers, smoke, accessibility, screenshots, console errors, and protected files. [Evidence: baseline contract and current 115 pages.]
- **FR-058**: Final impact MUST report exact changed source/generated files and page bodies, justified new/removed pages, migrated/unaffected consumers, test-matrix growth, and a reason for each count change; unrelated page-body drift MUST be zero. [Evidence: impact contract.]
- **FR-059**: Authored source MUST remain authoritative, generated output MUST match it, and generated HTML MUST not be hand-edited. [Evidence: build pipeline.]
- **FR-060**: Final acceptance MUST include passing build, smoke, interaction guards, protected tests, exact inventory/count guards, zero critical/serious accessibility findings, zero screenshot console errors, source/generated parity, mutation residue zero, and `git diff --check`. [Evidence: project gates.]

### Scope Boundaries and Ownership

| Item | Owner | Spec-044 treatment |
|---|---|---|
| Shared interaction host, classification, focus, overlay, scroll, dirty state, validation presentation, operation presentation, migrations | Spec 044 | In scope and cannot be deferred |
| Parent-contact privacy, role isolation, child two-gate view, teacher pay-free policy | Spec 043 | Preserve protected meaning and tests; host-only changes allowed |
| Route/sidebar IA and navigation domains | Spec 041 | Frozen; no redesign |
| Exhaustive business-field completeness (FO-24) | Spec 056 | Deferred with explicit rationale; shared presentation still belongs to 044 |
| Final parity/security/production freeze (FO-26) | Spec 057 | Deferred final program-wide freeze; Spec-044 acceptance remains complete in its own scope |
| Real sessions, API authorization, persistence, field-level backend RBAC | Future backend work | No fake implementation or claims |
| Gallery | Existing gallery owner unless a direct shared-interaction defect is proven | Not automatically in scope |

### Key Entities

- **Interaction Consumer**: One source-owned opener and its generated localized instances, including trigger, target, family, state support, and owner.
- **Interaction Surface**: One active modal-grade presentation with identity, family, accessible naming, focus boundary, scroll regions, action region, and lifecycle state.
- **Interaction Session**: The in-memory lifetime from opening or entering a dedicated workflow until safe close, confirmed discard, or truthful completion boundary.
- **Draft Snapshot**: Normalized initial editable values and current values used only to determine dirty state and preserve active-session input.
- **Close Request**: A close button, Escape, overlay click, navigation, incompatible open, reload, or departure attempt evaluated against dismissal safety.
- **Operation State**: Idle, validating, validation-error, real-loading, recoverable-error, backend-required, inline-discard-confirmation, or closing.
- **Inventory Record**: Fail-loud mapping of consumer, selectors, target, classification, locale/theme/viewport support, source/generated ownership, and verification state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of inventoried interaction openers reach exactly one correct surface, 100% of close controls work under their safe/guarded policy, and zero required selectors are silently skipped.
- **SC-002**: Every modal-grade family passes initial-focus, Tab, Shift+Tab, background-isolation, Escape, close, and exact-opener-restoration checks with zero keyboard-trap or focus-leak defects.
- **SC-003**: At exactly 390px, 100% of applicable representative variants remain within the viewport with zero horizontal overflow and reachable headers, close controls, fields, errors, footers, and actions.
- **SC-004**: 100% of dirty-state departure paths warn; canceling discard preserves 100% of entered values; confirmed discard is the only user action that clears the active draft.
- **SC-005**: Zero sensitive/private draft values appear in persistent browser storage, URLs, generated files, attributes, or logs.
- **SC-006**: 100% of invalid representative submissions preserve entered values, expose accessible AR/EN errors, and show no success while errors remain.
- **SC-007**: All backend-required consumers truthfully state that a server/backend connection is required and current information is not saved; zero terminal actions claim false save, submission, completion, or acceptance.
- **SC-008**: AR/RTL and EN/LTR, light and dark themes, desktop and 390px matrices pass for every distinct interaction family and implementation variant with zero console errors.
- **SC-009**: Accessibility verification reports zero critical and zero serious findings and no manual keyboard/focus defect.
- **SC-010**: Every required mutation produces the intended isolated RED followed by primary-tree GREEN, all isolated copies are removed, and mutation residue equals zero.
- **SC-011**: Build, smoke, interaction guards, protected Spec-043 tests, inventory/count guards, screenshots, source/generated parity, and whitespace validation all pass.
- **SC-012**: Final impact accounting explains every changed source/generated file and page body, preserves the accepted page count unless inventory justifies a dedicated page, and reports zero unrelated drift.

## Assumptions

- The current 115-page generated product and committed Spec-043 protected evidence are the accepted starting baseline because no relevant bytes changed after HEAD `7d2397b110f8d3311402d02f93719395b7d46e68` before Spec-044 evidence capture.
- The existing `add-family` bilingual route is the only current workflow proven large enough to require a dedicated page; Spec 044 does not add a page unless later deterministic inventory contradicts this assumption.
- Current frontend-only terminal actions remain backend-required; no new server, session, API, persistence, or authorization contract is introduced.
- Active-session in-memory preservation plus departure protection is the safe default for sensitive data; cross-reload persistence is excluded without new privacy evidence.
- Existing product breakpoint conventions apply, with exactly 390px as a mandatory acceptance viewport.
- Representative visual matrices cover every distinct interaction family/variant, while deterministic inventory and selector guards cover every repeated consumer.
- The global backend-required message remains valid unless consumer-by-consumer inventory proves a specialized reason is necessary.

## Dependencies

- Completed Spec 041 route/navigation contracts and current route/page inventories.
- Completed Spec 043 privacy/RBAC contracts, protected tests, and mutation register.
- Spec-042 interaction ledger and follow-up ownership register, especially FO-23, FO-24, and FO-26.
- Existing authored-source build pipeline and current smoke, accessibility, screenshot, selector, localization, parity, and mutation mechanisms.

## Clarification Record

No user clarification is required. The authoritative prompt fixes scope, privacy, mobile, mutation, and ownership behavior; repository evidence resolves the classification boundary and proves that no new dedicated page is currently justified.

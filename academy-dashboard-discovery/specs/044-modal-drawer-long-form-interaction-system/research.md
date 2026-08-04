# Research Decisions — Spec 044

All decisions are grounded in the live source, current/legacy screenshots, Specs 041/043, the Spec-042 carry-forward ledger, and the frontend-only architecture. No unresolved research item remains.

## R1 — One modal-grade lifecycle owner

- **Decision**: Use one shared controller for confirmation, form-modal, drawer, generic backend-note, and mobile-sidebar lifecycle; keep dropdowns separate and non-modal.
- **Rationale**: Current independent `openPanel`, `openConfirm`, and `openModal` paths can create competing overlays, traps, Escape handlers, and restoration state. A single owner directly enforces the one-overlay contract.
- **Alternatives considered**: Patch each path independently (rejected: duplicated rules and nesting races); treat dropdowns as modal (rejected: incorrect semantics and behavior).

## R2 — Explicit source classification

- **Decision**: Require source producers to declare the interaction family; never infer it at runtime from a field count.
- **Rationale**: The real boundary depends on context, scrolling, repeatability, sections, review, and validation. Identical counts can represent different workflows.
- **Alternatives considered**: Automatic field-count threshold (rejected by evidence and prompt); preserve every current form as drawer (rejected because bounded forms do not meet the required matrix).

## R3 — Existing dedicated page is sufficient

- **Decision**: Retain localized `add-family` as the only current dedicated-page large-form workflow; add no new page.
- **Rationale**: Current/legacy evidence proves that workflow is multi-section and page-scale. Current other forms remain usable as classified modal/drawer hosts once sticky actions and mobile behavior are fixed. Field-completeness expansion belongs to 056 and cannot justify speculative pages now.
- **Alternatives considered**: New family-edit route (rejected: current inventory does not require it and route/IA is frozen); force wizard into drawer (rejected: unusable and contrary to evidence).

## R4 — Dirty state and sensitive drafts

- **Decision**: Compare normalized current values with an in-memory initial snapshot; guard departure and use an in-surface discard state; persist no sensitive draft beyond the active session.
- **Rationale**: This prevents accidental loss without violating Spec-043 privacy or claiming server persistence.
- **Alternatives considered**: local/session storage (rejected: private-data leakage and unsupported lifetime); nested confirmation modal (rejected: competing overlays/traps); warn on focus/touch alone (rejected: false dirty state).

## R5 — Validation without Spec-056 scope theft

- **Decision**: Present and announce existing native/authored validity constraints consistently; do not invent missing business fields or required rules.
- **Rationale**: Spec 044 owns validation interaction/presentation, while Spec 056 owns exhaustive business-field completeness.
- **Alternatives considered**: Mark every field required (rejected: unsupported business semantics); defer all validation (rejected: shared interaction defect belongs to 044).

## R6 — Truthful backend-required terminal state

- **Decision**: Validate first, then show the localized backend-required message inside the active form/surface while preserving values; keep the current global copy unless per-consumer evidence proves it inaccurate.
- **Rationale**: Current AR/EN copy already states server need and no save. An in-surface live region is clearer and more accessible than a transient toast for forms.
- **Alternatives considered**: Fake save/progress (forbidden); disable the terminal action entirely (prevents the user from learning the truthful boundary); specialize every key without evidence (unnecessary copy fragmentation).

## R7 — Loading and error evidence

- **Decision**: Provide controller states for real asynchronous work, but do not fabricate a loading or recoverable-operation-error consumer. Record non-applicability if final inventory finds none.
- **Rationale**: The current representative terminal actions are synchronous client validation followed by a backend-required boundary.
- **Alternatives considered**: Timed spinner/demo error for screenshots (rejected as fake behavior).

## R8 — Background isolation and scroll lock

- **Decision**: Isolate non-surface siblings while open, retain prior isolation state, lock the document with scrollbar compensation, and restore exact scroll/state once the last modal-grade surface closes.
- **Rationale**: This satisfies assistive-technology and layout stability requirements and is centrally reversible.
- **Alternatives considered**: Overlay alone (does not stop focus/scroll); permanent global hidden state (breaks page after close); per-page hacks (duplicated and fragile).

## R9 — Nested feedback interaction

- **Decision**: Transition within one active surface/session and keep a logical return point; derive nested field IDs from the owning outcome identity.
- **Rationale**: Current nested templates are the exact source of 30 duplicate localized ID records and close-before-open can restore focus at the wrong moment.
- **Alternatives considered**: Stack another drawer (forbidden); retain fixed IDs (invalid and ambiguous); navigate to a new route (unjustified).

## R10 — Verification and mutations

- **Decision**: Add a fail-loud recursive inventory guard and focused browser interaction block within the existing tooling, then falsify each important guarantee in a fresh isolated copy.
- **Rationale**: Ordinary DOM queries miss nested template content, and unrelated RED failures cannot prove a guard.
- **Alternatives considered**: New test framework (unnecessary dependency); screenshots alone (cannot prove focus/security/state); optional catches (repeat of known defect).


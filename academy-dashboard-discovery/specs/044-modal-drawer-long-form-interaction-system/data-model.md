# Interaction and State Model — Spec 044

## InteractionConsumer

| Field | Contract |
|---|---|
| `sourceOwner` | Authored file/function responsible for markup and classification |
| `generatedPage` | Exact localized HTML consumer |
| `locale`, `direction` | AR/RTL or EN/LTR |
| `openerSelector`, `closerSelector` | Required fail-loud selectors |
| `targetId` | Unique within the recursively expanded page/template graph |
| `currentFamily`, `requiredFamily` | Confirmation, form modal, drawer, sidebar, wizard/page, or dropdown |
| `formKind` | none, bounded, contextual, long, repeatable, or multi-section |
| `themeSupport`, `viewportSupport` | Required light/dark and desktop/tablet/390 states |
| `stateSupport` | dirty, validation, real-loading/error applicability, backend-required |
| `ownerSpec` | Exactly one primary owning specification |
| `verificationState` | baseline, migrated, focused-green, full-green |

Uniqueness: `(generatedPage, targetId)` for targets and `(generatedPage, openerSelector, ordinal)` for repeated triggers. Duplicate records or IDs fail inventory generation.

## SurfaceDescriptor

| Field | Contract |
|---|---|
| `family` | `confirmation`, `form-modal`, `drawer`, or `sidebar` |
| `target` | Resolved content node/template; required and unique |
| `opener` | Exact active element/trigger for restoration |
| `dismissal` | safe, dirty-guarded, or operation-locked |
| `initialFocusPolicy` | safe action, meaningful field, heading/logical control, or current step |
| `label`, `description` | Accessible naming sources |
| `hasActions` | Whether stable action region is required |
| `transitionParent` | Optional same-session prior state; never another active overlay |

## InteractionSession

States:

```text
closed
  → opening
  → editing | viewing | confirming
  → validating
      → validation-error → editing
      → backend-required → editing
      → loading (real work only) → error | editing | safe-close
  → discard-confirmation → editing | closing
  → transitioning → editing | viewing
  → closing → closed
```

Invariants:

- exactly zero or one active modal-grade session;
- exactly one overlay/trap/Escape owner/body lock while active;
- dropdown/popover state is subordinate and non-modal;
- closing/transition teardown is idempotent;
- sensitive draft values exist only in memory during the session;
- no backend-required or error transition clears current values.

## DraftSnapshot

| Field | Contract |
|---|---|
| `initial` | Normalized meaningful editable values at session start |
| `current` | Normalized current values |
| `dirty` | `current` differs from `initial` |
| `sensitive` | Field classification inherited from Spec-043/source evidence |
| `lifetime` | Active session only unless a separate evidence-backed contract exists |

Normalization preserves semantic values while ignoring irrelevant presentation differences. A value returned to its initial normalized form clears dirty state.

## ValidationIssue

| Field | Contract |
|---|---|
| `field` | Exact invalid control |
| `messageKey` | AR/EN human-readable message |
| `descriptionId` | Unique association target |
| `step` | Wizard step when applicable |
| `resolved` | Updated deterministically when corrected |

No repeated submission may duplicate issue nodes or associations.

## CloseRequest

Sources: close button, Escape, overlay, incompatible open, internal navigation, route/page navigation, reload/window close where supported.

Resolution:

- clean + safe → close;
- dirty → in-surface discard decision;
- real non-cancellable operation → remain open and announce;
- continue editing → restore values/focus/state;
- confirmed discard → clear active draft and close/transition.


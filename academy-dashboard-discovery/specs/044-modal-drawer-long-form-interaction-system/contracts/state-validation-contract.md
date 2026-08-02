# Dirty State, Validation, and Operation Contract

## Dirty state

- Snapshot normalized meaningful editable values when the session begins.
- Recompute after input/change and clear dirty state when values return to the snapshot.
- Do not mark focus, open, responsive/theme change, validation decoration, or operation messaging as edits.
- Guard close, Escape, overlay, incompatible open, page/route departure, dedicated-page departure, and supported reload/window close.
- Render continue-editing/discard within the same surface and preserve values/focus when canceled.
- Persist no sensitive/private draft beyond the active in-memory session.

## Validation

- Use existing authored/native constraints; do not invent Spec-056 business fields or rules.
- Preserve invalid values and render one field message per active issue.
- Apply invalid semantics and description association; update deterministically when corrected.
- Use a summary for long/multi-section forms and expose hidden-step errors.
- Focus the appropriate summary/first invalid field after failure.
- Never show success while an issue remains.

## Backend-required

- Validate first.
- State in AR/EN that completion needs a backend/server connection and current information is not saved.
- Preserve all values and dirty state.
- Render an accessible in-surface status/next action for forms; do not rely only on a transient toast.
- Never claim submission, persistence, authorization, acceptance, completion, or record creation.
- Use `common.backendRequiredNote` only where truthful; specialized keys require an explicit inventory mapping.

## Loading and recoverable errors

- Enter loading only for real asynchronous work.
- Announce busy state, prevent duplicate action, preserve values, and recover controls on failure.
- Offer retry only when real retry exists.
- Do not fabricate a consumer solely to capture a screenshot; record non-applicability when no real work exists.


# Contract: RBAC Display-Only

**Purpose**: The permission matrix is informational, not a working engine.

**MUST**:
- Render the ~17-group / ~170-item permission set as a display-only grouped matrix (authored granted/not chips), reusing the existing `rolesSection` pattern.
- No functional checkboxes; no persisted `checked` state; no real enforcement.
- Save-permissions = backendRequired gate; toggling anything mutates nothing.
- No role-definition CRUD (legacy has none) — role is a fixed 4-value enum display.
- Category-scope = read-only drawer + assign gate; activity log = read-only.

**Verify**: smoke — RBAC matrix present (≥10 groups); Save = gate; no chip/`checked` mutation after a toggle/confirm (before/after snapshot).

**Status**: Binding. Register #9.

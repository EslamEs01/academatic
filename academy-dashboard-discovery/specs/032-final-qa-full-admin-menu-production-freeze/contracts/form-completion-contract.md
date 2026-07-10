# Contract: Form Completion (core)

**Purpose**: Every Add/Create/New/Edit/Duplicate/Manage action shows a real form UI before the final gate.

**MUST**:
- Each of the 40 FC surfaces opens a drawer whose template body contains **≥1 visible `input`/`select`/`textarea`** (grounded fields, minus MUST-OMIT) **before** any Save.
- Exactly one **final Save/Submit** per form, rendered as a `data-disabled-reason` backendRequired gate (never a fake save).
- **0 field-less create/edit modal** remains anywhere (no create/edit action responds with a title+note-only modal as its first-and-only UI).
- Assign/Enroll/Move keep their candidate-list picker (14 exist); the 3 hybrid category drawers gain a Create form.
- Fields are INERT (no behavior hook, no persistence, no validation).

**Verify**: smoke form-completion block (`smoke-form-completion-contract.md`) — every trigger's surface has a control + a Save gate; 0 field-less create/edit modal.

**Status**: Binding. `create-edit-forms-completion-inventory.md`.

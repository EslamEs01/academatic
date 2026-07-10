# Contract: Current Action Completion

**Purpose**: Every visible action is an honest class; the too-early gate is the only fix.

**MUST**:
- Every action ∈ {real-page-link · real-static-tab · real-static-filter · complete-picker · complete-form-wizard · complete-form-drawer (NEW) · complete-confirm-gate · honest-gate · planned-nav-gate · disabled-with-reason-nav}.
- 0 forbidden class: dead-button · href-hash · empty-link · button-only-toast · coming-soon-without-owner · backendRequired-too-early · add/edit/create-without-form · upload-without-gate-or-form · duplicate-without-form · assign-without-picker.
- After the fix, the 40 too-early gates become **complete-form-drawer**; all other classes stay byte-identical.

**Verify**: `current-action-completion-inventory.md` — 0 unresolved; smoke `href="#"`=0, raw-keys=0, dead-buttons=0, FAKE-clean.

**Status**: Binding.

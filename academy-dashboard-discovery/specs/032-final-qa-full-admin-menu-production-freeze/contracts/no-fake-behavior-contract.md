# Contract: No-Fake Behavior

**Purpose**: No fake persistence/success/mutation is introduced by the forms fix.

**MUST** (guards in `no-fake-behavior-freeze-register.md`):
- No fake save/create/edit/delete/assign/upload/download/PDF/payment/salary/permission/certificate/integration/notification/backup.
- No misleading success wording (`FAKE` :148→:160 byte-verbatim).
- No row/status mutation after any Save/confirm (no-mutation snapshot :990-1005).
- No entity localStorage write (UI-state prefs only).
- Reports/finance export honesty (Print/CSV/PDF gates, 0 `data-demo-action`); planned nav = non-anchor buttons.

**Verify**: smoke FAKE guard = 0 across all 103 HTML; no-mutation snapshot green; export/print clusters 0 demo-action.

**Status**: Binding (15 guards green today).

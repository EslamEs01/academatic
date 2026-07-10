# Contract: No-Fake Final Submit

**Purpose**: Every rebuilt form ends honestly.

**MUST**:
- Save/Submit/Confirm = a `data-disabled-reason` (or `data-confirm`→backendRequired) final; **persists nothing**.
- No row added, no status/chip flipped, no entity localStorage write (only existing UI prefs: rail/nav-category/schedule-view/lang/theme).
- No fake-success wording (`بنجاح`/`successfully`/`(demo)`/`إجراء تجريبي`/`preview action`) on any toast/confirm.
- No generated/opened/uploaded file; no API call.
- Form inputs are INERT (no behavior hook).

**Verify**: smoke `FAKE` guard byte-verbatim over `[data-toast],[data-confirm-toast],[data-confirm-msg]` = 0; no-mutation snapshot on a representative Save/confirm (chips/rows byte-identical before/after); every form's final is `data-disabled-reason`/`data-confirm`.

**Status**: Binding.

# Contract: No Fake Settings

**Purpose**: No settings/user/permission action fakes persistence, success, or mutation.

**MUST**:
- Every Save/Save-changes = backendRequired gate; nothing persists.
- Toggles show authored current state ONLY; flipping changes nothing.
- No fake-success wording: `\(تجريبي\)`/`\(demo\)`/`بنجاح`/`\bsuccessfully\b`/`تم الحفظ`/`\bsaved\b`/`تم الحذف`/`\bdeleted\b`/`تم الإرسال`/`sent`/`connected`/`مفعّل` (reuse the `FAKE` guard, `run.cjs:146`).
- No status/permission chip or `checked` state mutates after any confirm/toggle (before/after snapshot equal — reuse `run.cjs:988-1003`).
- Theme/language remain the ONE genuinely functional control (preserved).

**Verify**: smoke `FAKE`-guard clean over `data-toast`/`data-confirm-*`; no-mutation snapshot on a save/toggle/permission confirm.

**Status**: Binding. Register: `no-fake-settings-register.md` #8, #9, #17.

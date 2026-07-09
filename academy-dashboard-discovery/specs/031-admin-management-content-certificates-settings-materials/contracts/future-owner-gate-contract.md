# Contract: Future-Owner Gate

**Purpose**: Every real engine is a gate with an owner — never mocked.

**MUST** render as honest gates (future-backend), never functional:
- Real auth/user engine; reset-password/invite (no password field).
- Real permission engine (RBAC = display + Save gate).
- Real file upload/storage/download (all gates, no `type=file`).
- Real PDF/certificate generator (static preview + gates).
- Integration connectors — payment-gateway, payout-provider, WhatsApp, Email/SMTP (locked cards + gates, no credentials).
- Notification delivery (toggles + Save gate, no "sent").
- Backup/restore + Import (excluded/gate, no `type=file`, no template, no `backup_email`).
- Message-Builder (504 — generic gate, no invented fields).

**Excluded** (never built/mocked): `type=password`/`type=file`; api-key/secret/webhook; salary/pay figures; canvas/drag designer; `password:123456` template; legacy PII.

**Verify**: cross-check `future-owner-register.md`; smoke `noSecret`/`noFile`/`noPdf`/`noBackup`; every listed action is a gate.

**Status**: Binding.

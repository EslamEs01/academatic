# No-Fake Settings & Integrations Register (Spec 040)

Every final action in Settings is exactly one of two things:

1. **a safe local preview** that claims no persistence, or
2. **an honest `data-disabled-reason` backendRequired gate.**

There is no third option. A destructive or expensive action additionally requires a **confirmation before the gate**.

## Allowed

authored provider catalog · authored descriptions · authored **disconnected / unavailable** status · local filter & search (one filterable region per page) · local tabs · form validation intent · **a genuinely-local theme/language preference, honestly labelled** · drawers & modals · read-only diagnostics/reference (e.g. column contracts, webhook URLs shown as information) · `backendRequired` / `data-disabled-reason` gates.

## Forbidden (each maps to a real legacy behaviour we are refusing to inherit)

| Forbidden | The legacy behaviour it refuses |
|---|---|
| fake settings persistence | 10 real write endpoints across Settings |
| **fake connected provider** | legacy has no status vocabulary at all — a bare toggle |
| fake test-connection result | legacy `Test SMTP` |
| fake webhook success | payout webhook URLs |
| fake payment connection / activation | `POST /settings/payments` |
| fake WhatsApp pairing | the 4-step wizard + live websocket |
| fake email delivery | `POST /settings/email-accounts` |
| **fake import** | 4 × multipart `.xlsx` upload |
| **fake backup** | `Send Backup` fired a **real DB backup with no confirm** |
| fake policy save | "Policies updated successfully" |
| fake theme save | `PUT …/personalisation` |
| fake notification delivery | `POST …/notification/update` |
| fake OAuth | — |
| fake API / network request | — |
| fake success toast | SweetAlert success messages |
| **real credentials in fixtures** | gateway tables **print `Key 1`/`Key 2` in plain text** |
| secret exposure | 17 sensitive fields; 15 rendered as plain `type=text` |
| dead buttons · `href="#"` · raw locale keys | standing law |
| hidden unauthorized functionality | standing law |
| new backend / API / auth / database | standing law |

## The action ledger — every final in Settings

| Tab | Action | Class | Confirm first? |
|---|---|---|---|
| General | Save identity / location / automation | **gate** | — |
| | Upload logo | **gate** (no `type=file`) | — |
| | Add / edit / delete expense head | **gate** | delete: **✔** |
| Notifications | Save the matrix | **gate** | — |
| | Create / edit a message template | **gate** (message-builder → Spec 053) | — |
| Customization | **Theme (light/dark/system)** | **REAL local preference** — labelled as personal, not academy-wide | — |
| | **Language** | **REAL local preference** | — |
| | Save appearance / brand colours / status palette | **gate** | — |
| | Reset to default | **gate** | **✔** |
| Security | Save backup destination | **gate** | — |
| | **Send backup** | **gate** | **✔** |
| | Upload import file (×4) | **gate** (no `type=file`) | **✔** |
| | Download template (×4) | **gate** (no file leaves the page) | — |
| | Edit / publish policy | **gate** | — |
| | Enable 2FA | **gate** (and **no OTP control at all**) | — |
| Users | Manage roles / permissions | **gate** | — |
| | Open the staff directory | **REAL link** → `staff.html` | — |
| Integrations | Connect / Disconnect a provider | **gate** | disconnect: **✔** |
| | Test connection | **gate** | — |
| | Pair WhatsApp | **gate** (no wizard, no QR) | — |
| | Save provider configuration | **gate** | — |
| | Create / edit a payment method | **gate** | — |
| | Activate a payment method | **gate** | — |
| | Delete a payment method | **gate** | **✔** |

**Every gate carries a reason key** explaining, in the user's language, that the action becomes available once the server is connected. No gate says "demo", "preview action", "saved", "done", or anything that implies the write happened.

## The theme/language exception, stated precisely

Theme and language are **real**: they apply immediately and persist via the **existing** `academy.theme` / `academy.lang` keys through the **existing** `data-set-theme` / `data-set-lang` hooks. They are the only genuine writes in Settings.

This is honest, and it is faithful to the evidence — legacy's own **"Apply for me"** button writes localStorage only and performs **no server write**, while its "Save changes" is the only server write. Our split is the same split.

They must be **labelled as a personal preference**, never as an academy-wide saved setting. Everything else in Customization is display-only with a gated Save, because making layout/colour genuinely live would require **new hooks and new storage keys**, which standing law forbids.

## Machine-checkable invariants

| Invariant | Value |
|---|---|
| `type="password"` | **0** |
| `type="file"` | **0** |
| Credential-like input (password/secret/api/key/token/webhook) | **0** |
| Authored secret value in any fixture or locale module | **0** |
| `<canvas>` / draggable / chart engine | **0** |
| `.pdf` / `blob:` / `createObjectURL` / `window.open` / `download=` | **0** |
| Provider status reading "connected" / «مفعّل» | **0** |
| Currency / pay figure anywhere in the Settings body | **0** |
| `href="#"` | **0** |
| Raw locale keys | **0** |
| External network requests | **0** |
| Fake-success wording | **0** |
| Console errors | **0** |
| Final actions that are neither a gate nor a labelled local preview | **0** |

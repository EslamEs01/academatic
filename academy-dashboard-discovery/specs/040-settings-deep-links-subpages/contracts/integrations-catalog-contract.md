# Contract — Integrations Catalog (Spec 040)

**Surface** `settings.html#view=integrations` / `settings.en.html#view=integrations` (the **existing** `integrations`
tab id — byte-pinned at `smoke:1194`). **Nav** `settingsIntegrations` flips `planned → implemented` +
`route:'settings.html#view=integrations'` (Ledger B #2). **Count impact 0** — no page, no nav item, no new hook
(Ledger A).

Baseline: HEAD **`58a53e2`** (Ledger R9). Current app: **7 display-only cards, 0 configuration fields.**
After Spec 040: **11 provider cards + 11 Configure drawers** (`21 field()` · `8 data-toggle` previews ·
`26 structure-only rows` · `≈24 gates` — Ledger F.5/F.7).

---

## 1. The catalog — 11 providers (definitive, 0 UNKNOWN in the register itself)

Grouped under three category headings inside one inline card grid (Ledger G: *"inline card grid (`.card`, existing
`integCard()` pattern extended)"*). **No `filterBar` is rendered on the settings hub** — the Ledger presentation plan
specifies none, and `enhance.js` supports exactly **one** global `[data-no-results]` region per page. Grouping is by
heading, not by a facet.

| # | Provider | Legacy id | Category | Drawer id (`FORM_DRAWERS_032.settings`) | Authored status | Mode control | Sensitive rows |
|---|---|---|---|---|---|---|---|
| 1 | **Stripe** | 2 | Payments (incoming) | `integ-stripe` | not-connected | — *(none in legacy; **none added** — Ledger F.5 safe controls = `name` only)* | **2** |
| 2 | **PayPal** | 3 | Payments (incoming) | `integ-paypal` | not-connected | environment: Live / Sandbox — **never defaulted to Live** | **2** |
| 3 | **Mollie** | 4 | Payments (incoming) | `integ-mollie` | not-connected | — | **1** |
| 4 | **XPay** | 5 | Payments (incoming) | `integ-xpay` | not-connected | url: staging / community (**legacy preselects neither — we preselect `staging`**) | **3** |
| 5 | **Payoneer** | 6 | Payments (incoming) | `integ-payoneer` | not-connected | environment: Sandbox / Live | **2** |
| 6 | **Paymob** | 7 | Payments (incoming) | `integ-paymob` | not-connected | **region** (Egypt / Oman / Saudi Arabia / UAE — proven help text: **region, not environment**) | **5** |
| 7 | **Custom** (offline / bank transfer / cash) | 10 | Payments (incoming) | `integ-custom` | not-connected | — | **0** |
| 8 | **Paymob Payout** | 8 | Payouts (outgoing) | `integ-paymob-payout` | not-connected | mode: sandbox / live (**required**) | **4** |
| 9 | **Payoneer Payout** | 9 | Payouts (outgoing) | `integ-payoneer-payout` | not-connected | mode: sandbox / live (**required**) | **3** |
| 10 | **WhatsApp (Free)** | 1 | Communications | `integ-whatsapp` | requires-server | — | **0** |
| 11 | **Email (SMTP)** | 11 | Communications | `integ-email` | not-connected | — | **2** |
| | | | | **11 drawers** | | | **24** |

**Added by Spec 040 (absent from the current 7-card set): Mollie · XPay · Custom · Payoneer Payout.**
Sensitive-row total **24** — see `sensitive-provider-fields-contract.md` (Ledger R10: **PICK 24**, not 17).

---

## 2. Allowed authored connection states — a CLOSED set of three

| State | AR copy | EN copy | Chip tone (`build-html.mjs:168-175` closed set) | Meaning |
|---|---|---|---|---|
| `not-connected` | «غير مُعدّ» | "not configured" | `neutral` | No provider instance is configured. **The only state the 10 non-WhatsApp cards may carry.** |
| `requires-server` | «يتطلب ربط الخادم» | "requires the server" | `amber` | The capability exists but cannot function frontend-only (WhatsApp pairing, SMTP test). |
| `unavailable` | «غير متاح» | "unavailable" | `cancelled` | Reserved; carried by no card today. Kept in the vocabulary so no author invents a fourth. |

**«متصل» / "Connected" is UNREACHABLE — and so is "not connected".** No code path, no fixture value, no locale key
may put the **token** «متصل» / `connected` inside a chip, **in any form, including the negative** (Ledger F.5:
*"Status chips: NEVER 'Connected'"*; stop condition #5). The machine census is **chip-scoped and token-absolute**
(`0` `.chip` matching `/متصل|connected/i`) because a body-wide affirmative-only regex is unwritable: the honest
backendRequired sentence *"available once the server is connected"* legitimately contains the word elsewhere on the
page. Hence the `not-connected` state is **rendered** as «غير مُعدّ» / "not configured" — stricter than the Ledger's
descriptive phrasing, and the only phrasing that is machine-provable.
The legacy WhatsApp 7-code enum (`UNKNOWN · PAIRING · DISCONNECTED · CONNECTING · CONNECTED · IDLE · STOPPED`) is
**documented in a fixture comment and never simulated** — no Laravel Echo, no websocket, no `/broadcasting/auth`,
no polling, no timer.
The earlier artifact vocabulary *"available to connect"* is **NOT used**: every Connect is a `backendRequired` gate,
so a card claiming it is *available to connect* over-claims. Ledger F.5 governs.

Every chip is **icon + text** (standing law, Specs 001–016). Tone is one of the six legal tones only — a seventh
tone **throws at build** (Ledger R6).

---

## 3. Per-provider card contract

Each card renders, and renders **nothing else**:

1. Provider **name** (authored, plain product name — no logo asset, no remote image, no `ui-avatars.com` egress).
2. **Category** label (Payments incoming · Payouts outgoing · Communications).
3. An authored **description** (1–2 lines, what the provider does for the academy).
4. One honest **status chip** from §2.
5. A **Configure** button → `data-drawer="integ-<id>"` (a drawer-open is **not** a write, so it is not a gate).
6. A **Connect** button → `data-disabled-reason` gate.

**MUST NOT appear on a card:** a credential, a key column, a masked value, a live toggle that POSTs
(legacy's `is_enabled` does — ours is a **preview toggle inside the drawer** + a gated Save, Ledger F.5),
a "Number Of Family" count, a webhook secret, an amount/rate/currency token, a `<canvas>`, a QR image.

### Product areas each provider would affect (authored copy — descriptive, never a live claim)

| Provider group | Product area named in the description | Pay-free note |
|---|---|---|
| Payments (incoming) ×7 | family invoices & payment collection (admin Finance surfaces) | Names the area; renders **no figure**. |
| Payouts (outgoing) ×2 | disbursing **staff/teacher salaries** | May name the category "payouts (outgoing)"; **no salary/rate/fine/payout FIGURE, ever** (teacher pay-free GLOBAL; Ledger stop condition #6). The legacy WhatsApp card copy advertising **"salary reports"** is **not reproduced**. |
| Communications ×2 | announcements / message delivery (Spec 034 surfaces) | — |

---

## 4. Gated actions — MUST-GATE register (`data-disabled-reason`, `backendRequired` wording)

| Action | Where | Class |
|---|---|---|
| **Connect** (×11) | provider card | gate |
| **Save** (×11) | the ONE primary final inside each `integ-*` drawer | gate (`.btn-primary[data-disabled-reason]` — **exactly one per drawer**, `smoke:1221`) |
| **Test SMTP** | `integ-email` drawer | gate |
| **Add account** (SMTP, legacy "Add Account" — management model **UNKNOWN**, U-4) | `integ-email` drawer | gate |
| **Pair WhatsApp** | `integ-whatsapp` drawer | gate — **no QR, no `<canvas>`, no 4-step wizard** (the pairing UI was never captured ⇒ UNKNOWN ⇒ **not invented**) |
| **Wake connection · Send test · Logout** (WhatsApp) | `integ-whatsapp` drawer | gates (secondary buttons; legacy's Logout kills all automation with **no confirm** — not reproduced as a live action) |
| **Add payment method** (×7 incoming) | the provider's empty methods list | opens the SAME `integ-<id>` drawer (`data-drawer`) — see `payment-methods-fold-contract.md` |

Built gate count on the Integrations tab ≈ **24** (Ledger F.7). The machine floor is the sitewide settings assert
`a31.gates >= 20` (strengthened from `>= 4`; predicted hub total ≈ 45).
**Every** final write/connect/test/pair is a gate — there is no other honest class here.

---

## 5. Forbidden (0 occurrences, anywhere in the Integrations surface)

`type="password"` · `type="file"` · `<canvas>` · `draggable="true"` · `download=` · `window.open` · `blob:` ·
any authored key/secret/token/HMAC/webhook-secret/merchant-id **value** · any credential **input** (text, masked, or
readonly-with-value) · a "Connected" chip · a fake test-connection / pairing / OAuth / webhook / delivery result ·
a fake success toast («تم الحفظ» / "saved" / "done") · a live-mode default · generic `Key 1` / `Key 2` labelling ·
a currency symbol or pay figure (`a31.currency === 0`) · a new `data-*` hook · a new localStorage key · a new
dependency · a websocket/poll/network request.

---

## 6. Excluded capabilities + future owners

| Capability | Why not here | Owner |
|---|---|---|
| Real connections, OAuth, webhooks, credential storage, test-connection | Requires a server; frontend-only cannot do it honestly | **Spec 053 — Integrations Command Center** |
| **Message Builder** (`/management/settings/customisation/message-builder`) | Only evidence = **HTTP 504**, `isErrorPage:true`, all-zero `domSummary`. **Zero UI evidence ⇒ no UI may be invented.** The existing honest gate (`adm.set.cust.msgBuilder` + `adm.set.cust.msgBuilderReason`, shipped by Spec 031) is **unchanged by Spec 040** | **capability: Spec 053** · **placement custodian: Spec 048** (Ledger E) |
| WhatsApp pairing wizard / QR | Never captured (UNKNOWN) + `<canvas>` forbidden | Spec 053 |
| **WhatsApp insights pages** | They leak a live joinable `chat.whatsapp.com` invite URL, unmasked phones/emails, and egress real names to `ui-avatars.com` | **EXCLUDED ENTIRELY.** Privacy → **Spec 043**; capability → a messaging surface |
| Embedded meetings (Zoom / Google Meet) | Not a Settings capability | **Spec 054** |
| Payout execution (both payout providers disburse instructor salaries) | Payroll backend + pay-free law | payroll/billing backend — **and no pay figure may ever appear here** |
| Real checkout / payment processing | — | Spec 053 / payments backend |

---

## 7. Verify

- **smoke (`settings`, AR+EN)** — `a31.passwordInputs===0`, `a31.fileInputs===0`, `a31.canvas===0`, `a31.noDrag`,
  `a31.credInputs===0`, `a31.noPdf`, `a31.currency===0`, `a31.gates>=20`, hub `tabIds` byte-identical to
  `['general','notifications','customization','security','users','integrations']` (`smoke:1194` — unchanged).
- **smoke `f32`** — all **11** `integ-*` drawers registered in `FORM_DRAWERS_032.settings` (Ledger R4; an
  unregistered drawer silently escapes the audit ⇒ **spec failure**): each has ≥1 control, ≥1
  `[data-disabled-reason]`, **≤1** `.btn-primary[data-disabled-reason]`, 0 OMIT-named controls, 0 `<canvas>`.
- **smoke (additive Spec-040 block)** — 11 provider cards present; **`connectedChips === 0`** (chip-scoped:
  **0** `.chip` whose text matches `/متصل|connected/i`, body **and** drawer templates — never a body-wide grep, which
  the backendRequired sentence would trip); the `#view=integrations` fresh-context deep-link opens exactly ONE
  visible `[role=tabpanel]` (= `integrations`) with **0 external requests**, AR + EN.
- **a11y** — `#view=integrations` × AR/EN × light/dark + mobile-390 + ≥1 open `integ-*` drawer row; critical=0,
  serious=0.
- **screenshots** — `sp040-*` frames incl. the 11-card grid and one open provider drawer showing structure rows;
  0 console errors.

**Status**: Binding. Sources: Ledger §A, §B#2, §F.5, §F.7, §G, §E, §K (R1/R2/R4/R6); `integrations-scope.md`;
`integration-provider-field-matrix.md`; `no-fake-settings-integrations-register.md`.

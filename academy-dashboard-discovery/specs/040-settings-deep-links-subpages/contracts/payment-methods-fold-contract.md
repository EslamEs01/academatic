# Contract — Payment Methods Fold (Spec 040)

**Nav id: NONE.** Payment Methods is **not** a settings nav item — not in the current app (`nav.config.js:110-115`
= `settingsGeneral · settingsIntegrations · settingsCustomization · settingsNotifications · settingsSecurity ·
**settingsUsers**`) and not in the legacy Settings sidebar (General · Integrations · Customization · Notifications ·
Security · Users & Staff). **Ledger R10 resolves the brief's "sixth domain = Payment Methods" → `settingsUsers`.**

**Surface**: inside `settings.html#view=integrations`, under the **Payments (incoming)** provider group.
**Count impact 0** — 0 pages (115 held), 0 nav items (admin menu **50** held), 0 new hook, 0 new page base.

Giving payment methods a seventh nav item would break the 50-item menu freeze for a surface the legacy product
**never navigated to directly**: there is **no `/management/settings/payments` index page at all** (verified against
page-inventory, route-graph and endpoints). Payment methods are reached **only** through Integrations.

---

## 1. The legacy relationship (the structural finding)

```
Integrations card (gateway N)
        └─ Configure  →  table of that gateway's configured methods
                          #  |  Name  |  Number Of Family  |  Key 1  |  Key 2  |  Settings     ← prints stored secrets in plain text
                          └─ Add Payment  →  /management/settings/payments/create?payment_method=N
                                             (7 provider-specific credential forms; POST /management/settings/payments)
                          └─ per-row Edit (…/payments/{id}/edit, _method=PUT) · Delete
```

**Payment methods are the configuration objects of the incoming-payment integrations** — not a settings domain.
The provider is **seeded by the query string** and carried in a hidden field; **no create form has a visible
method-type selector** — the chooser screen was never captured (**UNKNOWN**, U-2).

---

## 2. The fold — what Spec 040 builds

| Legacy element | Spec 040 |
|---|---|
| Gateway *Configure* | `data-drawer="integ-<id>"` → the provider's **Configure drawer** (`formDrawer`, the wide sheet — Ledger G: *"never a small modal"*) |
| The method **table** | An honest **empty state** inside the drawer's provider card region: «لا توجد طريقة دفع مُعدّة — يُتاح بعد ربط الخادم» / "no payment method configured — available once the server is connected". **0 authored instances** (Ledger F.6). |
| Column `Key 1` / `Key 2` | **DELETED — no key column, ever.** (`sensitive-provider-fields-contract.md`) |
| Column `Number Of Family` | **DELETED** — a computed count with no authored source; fabricating it is forbidden. |
| *Add Payment* → 7 create variants | **The Configure drawer IS the create form.** The CTA on the empty state opens the **same** `integ-<id>` drawer (`data-drawer` — a drawer-open is not a write, so it is not a gate). |
| The chooser screen (never captured) | **The provider catalogue is the chooser** — 11 cards, grouped. No chooser page invented. |
| *Edit* (the 8th capture, `payment_method=1`/Custom, `_method=PUT`) | **NOT a separate surface**: structurally identical to create variant 3 — same field set; only the HTTP verb and prefilled values differ (Ledger F.6). With **0 authored instances there is nothing to edit** ⇒ **no Edit control is rendered.** |
| *Delete* | **Not rendered** (nothing to delete). Recorded for **Spec 053**: when real instances exist, Delete **must** be `confirm → data-disabled-reason` gate — legacy deletes a method families may be actively paying through, with no guard. |
| Provider *enable* toggle (legacy `is_enabled` POSTs a real toggle) | **Not on the card.** A `data-toggle` **preview** inside the drawer + **one gated Save** (Ledger F.5). |

**Exactly ONE gated primary final per drawer** — the Save (`.btn-primary[data-disabled-reason]`; `smoke:1221`
enforces `≤1`). Connect / Add-payment / Activate / Test are gates or drawer-openers, never fake writes.

---

## 3. Per-provider semantic field matrix (7 incoming variants)

**R** = rendered inert `field()` · **S** = structure-only row (label + required + purpose; **never an input, never a
value**) · **G** = `data-disabled-reason` gate.
**`Key 1` / `Key 2` / `Key 3` / `Key 4` labelling is FORBIDDEN** — every field carries its true provider-specific
name. Semantic labels are used **only where proven** in raw HTML (label / placeholder / help text); everything else
is **UNKNOWN and marked as such** — no meaning is invented.

| # | Provider | Legacy name | Rendered label | Class | Control name | Evidence / meaning |
|---|---|---|---|---|---|---|
| 1 | **PayPal** | `name` | Display name | **R** text | `integ-paypal-name` | proven |
| | | `key1` | Client ID | **S** | — | label proven |
| | | `key2` | Client Secret | **S** | — | label proven |
| | | `xpay_url` | Environment: Sandbox / Live | **R** select | `integ-paypal-env` | **legacy defaults to Live — a defect; NEVER defaulted to live** |
| 2 | **Stripe** | `name` | Display name | **R** text | `integ-stripe-name` | proven |
| | | `key1` | Publishable Key | **S** | — | placeholder proven |
| | | `key2` | Secret Key | **S** | — | placeholder proven |
| | | *(none)* | *no mode control exists in legacy* | — | — | **No mode is invented** (Ledger F.5 safe controls = `name` only). A legacy gap is recorded, not filled with UI. |
| 3 | **Custom** (offline / bank / cash) | `name` | Display name | **R** text | `integ-custom-name` | proven |
| | | `key1` | Payment details | **R** **textarea** | `integ-custom-details` | The one genuinely non-sensitive provider — **0 sensitive fields.** The legacy raw escape leaked into the label (`((End Each Line With \n))`) is **not reproduced**. |
| 4 | **XPay** | `name` | Display name | **R** text | `integ-xpay-name` | proven |
| | | `key1` | API Key | **S** | — | — |
| | | `key2` | Community ID | **S** | — | **UNKNOWN** business meaning |
| | | `key3` | Variable Amount ID | **S** | — | **UNKNOWN** business meaning |
| | | `xpay_url` | Environment: staging / community | **R** select | `integ-xpay-url` | legacy preselects **neither** (broken) → we preselect **staging** |
| | | `xpay_method[]` ×4 | Channels: card · Fawry · Meeza-digital · Kiosk Aman | **R** 4 `data-toggle` previews | `integ-xpay-ch-1…4` | channel names live in the **copy**, never in an id (Ledger R1) |
| 5 | **Mollie** | `name` | Display name | **R** text | `integ-mollie-name` | proven |
| | | `key1` | API Key | **S** | — | — |
| 6 | **Payoneer** | `name` | Display name | **R** text | `integ-payoneer-name` | proven |
| | | `key1` | Merchant Code | **S** | — | **UNKNOWN** business meaning |
| | | `key2` | API Key | **S** | — | — |
| | | `xpay_url` | Environment: Sandbox / Live | **R** select | `integ-payoneer-env` | legacy default sandbox — kept; live is never the default |
| 7 | **Paymob** | `name` | Display name | **R** text | `integ-paymob-name` | proven |
| | | `key1` | Secret Key | **S** | — | — |
| | | `key2` | Integration ID | **S** | — | **proven help text**: "comma-separated when offering more than one" |
| | | `key3` | Public Key | **S** | — | — |
| | | `key4` | HMAC Secret | **S** | — | — |
| | | `settings[api_key]` | API Key *(optional)* | **S** | — | **proven help text**: "optional; status reconciliation only; a separate credential from the Secret Key" |
| | | `xpay_url` | **Region**: Egypt / Oman / Saudi Arabia / UAE | **R** select | `integ-paymob-region` | **proven: region, NOT environment.** No mode is invented. |

**Naming accident recorded, not reproduced:** the environment/region control is named **`xpay_url`** on *every*
provider in legacy. Our controls are named for what they are (`…-env` / `…-url` / `…-region`).
**Sensitive rows across the 7 incoming variants: 15** (PayPal 2 · Stripe 2 · Custom 0 · XPay 3 · Mollie 1 ·
Payoneer 2 · Paymob 5) — of the **24** total (Ledger R10).

### Deliberately NOT copied (real legacy gaps — absent from every variant)

webhook / callback / return URL · active toggle · default-method flag · display order · **currency / fee / min-max**
· a customer-facing description (only Custom's raw textarea) · icon upload · verify-credentials · any validation
message · any `required` attribute (the `*` is label decoration only). **`type="password"` across all 8 legacy
payment forms = ZERO — every secret is a plain unmasked `type=text`. That is the defect the rebuild must not
inherit.**

---

## 4. Hard prohibitions (0 occurrences)

- **No real gateway, checkout, payment processing, credential storage, activation, webhook or OAuth.** Every final
  (Save / Connect / Add / Activate / Test) is a `data-disabled-reason` **backendRequired** gate.
- **No secret**: 0 `type=password`, 0 `type=file`, 0 authored key/secret/token/HMAC/merchant-id **value**, 0
  credential input, 0 key column, 0 mask. See `sensitive-provider-fields-contract.md`.
- **No fake state**: no "Connected" chip, no fake test-connection / verify-credentials result, no fake success
  toast («تم الحفظ» / "saved"), no live-mode default.
- **No money**: 0 currency symbol or token (`a31.currency === 0` — `ريال|SAR|جنيه|EGP|AED|EUR|$|€|£`), 0 fee, 0
  amount, 0 min/max, **0 computed metric** (no `Number Of Family`). Family zero-pay, admin finance
  no-fake-money and teacher pay-free are **untouched** — the payout providers may be *named* and categorised, but
  **no pay figure exists anywhere on this surface** (Ledger stop condition #6).
- **No `<canvas>`, no `draggable`, no `download=`, no `window.open`, no `blob:`.**
- **No new** `data-*` hook, localStorage key, dependency, page, nav item.

---

## 5. Verify

- smoke `settings` AR+EN: `a31.credInputs===0`, `passwordInputs===0`, `fileInputs===0`, `canvas===0`, `noPdf`,
  `currency===0`, `gates>=20`; hub `tabIds` unchanged.
- smoke `f32` (`FORM_DRAWERS_032.settings` must include the 7 incoming drawers `integ-stripe`, `integ-paypal`,
  `integ-mollie`, `integ-xpay`, `integ-payoneer`, `integ-paymob`, `integ-custom`): each has ≥1 control, ≥1 gate,
  **≤1** primary gate, **0** OMIT-named controls, 0 `<canvas>` (Ledger R4).
- smoke (additive Spec-040): body text contains **0** occurrences of `Key 1|Key 2|Key 3|Key 4|مفتاح ١|مفتاح ٢`;
  **0** method rows are authored (the empty state renders); **0** Edit/Delete method control exists.
- a11y: an open incoming-provider drawer (e.g. `integ-paymob`: 2 fields + 5 structure rows + 1 gated Save) —
  critical=0, serious=0.
- screenshots: an `sp040-*` frame of a Payments (incoming) card with its empty methods state + the Add-payment CTA.

---

## 6. Future owner

Real checkout, payment processing, gateway connection, credential ingestion/storage, webhooks,
verify-credentials, method instances (and therefore Edit/Delete/activate) → **Spec 053 — Integrations Command
Center** / the payments backend. Payout execution → the payroll/billing backend, still under the pay-free law.

**Status**: Binding. Sources: Ledger §A, §F.5, §F.6, §F.7, §G, §K (R1/R2/R4/R6/R10), stop conditions #2/#4/#5/#6/#7;
`payment-methods-scope.md`; `integrations-scope.md`; `integration-provider-field-matrix.md`.

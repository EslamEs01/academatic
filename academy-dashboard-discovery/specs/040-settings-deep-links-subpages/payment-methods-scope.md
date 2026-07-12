# Payment Methods — Scope (Spec 040)

**Nav id**: **NONE.** Payment methods is **not** a Settings nav item — not in the current app, and not in the legacy Settings sidebar.
**Surface**: inside `settings.html#view=integrations`, under the **Payments (incoming)** provider group.
**Count impact**: **0** — and, critically, **admin-menu impact 0** (stays at 50).

## Why the brief's "sixth domain" is not a nav item

The brief expected the six Settings domains to end with *Payment Methods*. Read from source, the sixth nav id is **`settingsUsers`** (`nav.config.js:115`). The legacy Settings sidebar likewise contains **General · Integrations · Customization · Notifications · Security · Users & Staff** — no payments entry.

Payment methods are reached in legacy **only** through Integrations: a gateway card's *Configure* opens a table of that gateway's configured methods, whose *Add Payment* link leads to `/management/settings/payments/create?payment_method=N`. There is **no `/management/settings/payments` index page at all** (verified against page-inventory, route-graph and endpoints).

**Conclusion**: payment methods are the *configuration objects* of the incoming-payment integrations. They belong inside Integrations. Giving them a seventh nav item would break the 50-item menu freeze for a surface the legacy product never navigated to directly.

## The 7 provider variants (+1 edit) — definitive

All post to `POST /management/settings/payments`; the provider is **seeded by the query string** (`?payment_method=N`) and carried in a hidden field. **There is no visible method-type selector on any create form** — the chooser lives on a screen that was never captured (**UNKNOWN**). In the rebuild the chooser *is* the provider catalog.

### Common fields

**Exactly one**: `name` — "Name *" (text, required). Everything else is provider-specific. (`_token` and the hidden `payment_method` are plumbing; `_method=PUT` is added on edit.)

Note: the environment control is always the input named **`xpay_url`**, regardless of provider — a legacy naming accident. The rebuild names it for what it is (mode / environment / region).

### Per-provider field matrix

| # | Provider | Field (legacy name) | Meaning | Type | Sensitive? | Rebuild disposition |
|---|---|---|---|---|---|---|
| 1 | **PayPal** | `name` | Display name | text | — | render |
| | | `key1` | **Client ID** | text | **YES** | structure-only row |
| | | `key2` | **Client Secret** | text | **YES** | structure-only row |
| | | `xpay_url` | Mode: **live ✓ (default!)** / sandbox | radio | — | render — **never defaulted to live** |
| 2 | **Stripe** | `name` | Display name | text | — | render |
| | | `key1` | **Publishable key** (ph. "Publishable Key") | text | **YES** | structure-only row |
| | | `key2` | **Secret key** (ph. "Secret Key") | text | **YES** | structure-only row |
| | | — | *no mode control at all* | — | — | **add an explicit mode** (a legacy gap, not a legacy feature) |
| 3 | **Custom** (offline / bank / cash) | `name` | Display name | text | — | render |
| | | `key1` | **Payment instructions** (`((End Each Line With \n))` — raw escape leaked into the label) | **textarea** | **no** | **render as a real textarea** — the one genuinely non-sensitive provider |
| 4 | **XPay** | `name` | Display name | text | — | render |
| | | `key1` | **API key** | text | **YES** | structure-only row |
| | | `key2` | **Community ID** | text | — | render |
| | | `key3` | **Variable Amount ID** | text | — | render |
| | | `xpay_url` | Environment: `staging` / `community` (**neither preselected — broken**) | radio | — | render as a proper mode |
| | | `xpay_method[]` ×4 | Channels: **card · Fawry · Meeza/digital · Kiosk Aman** | checkbox | — | render |
| 5 | **Mollie** | `name` | Display name | text | — | render |
| | | `key1` | **API key** | text | **YES** | structure-only row |
| 6 | **Payoneer** | `name` | Display name | text | — | render |
| | | `key1` | **Merchant code** | text | — | render |
| | | `key2` | **API key** | text | **YES** | structure-only row |
| | | `xpay_url` | Mode: sandbox ✓ / live | radio | — | render |
| 7 | **Paymob** | `name` | Display name | text | — | render |
| | | `key1` | **Secret key** | text | **YES** | structure-only row |
| | | `key2` | **Integration ID** (comma-separated) | text | — | render |
| | | `key3` | **Public key** | text | **YES** | structure-only row |
| | | `key4` | **HMAC secret** | text | **YES** | structure-only row |
| | | `settings[api_key]` | **API key** (optional) | text | **YES** | structure-only row |
| | | `xpay_url` | Region: **Egypt ✓** / Oman / Saudi Arabia / UAE | radio | — | render (region ≠ environment — **add an explicit mode**) |
| — | **Edit** (captured variant = Custom) | `name` + `key1` | identical component, values bound; provider immutable; **no delete, no status** | — | — | same, with the provider fixed |

**Absent from every legacy variant** (i.e. real product gaps, not things to copy): webhook/callback/return URL · active toggle · default-method flag · display order · currency / fee / min-max · a customer-facing description (only Custom's raw textarea) · icon upload · verify-credentials · any validation message. **No `required` attribute exists anywhere** — the `*` is label decoration only.

**`type="password"` count across all 8 payment forms: ZERO.** Every secret is a plain `type=text`. This is the defect the rebuild must not inherit.

## What Spec 040 builds

- Within the Integrations tab, each **Payments (incoming)** provider lists its configured methods — **name · provider · mode · status** — with **no key column, ever**.
- **Add / Edit a payment method** opens a drawer carrying that provider's *specific* field structure above, with sensitive fields as **structure-only rows** and non-sensitive ones as real inert inputs.
- **Mode is explicit and never pre-set to live.**
- Create / Save / Activate / Delete are `data-disabled-reason` gates; **Delete is a confirm → gate** (legacy deletes a method families may actively be paying through).
- Meaningful, provider-specific labels throughout — **`Key 1` / `Key 2` labelling is forbidden**.

## What Spec 040 does NOT build

Real checkout, real payment processing, real gateway connection, real credential storage, webhooks, verify-credentials. **Owner: Spec 053 / the future payments backend.** Family-facing billing remains under the family zero-pay law; admin finance remains under the finance no-fake-money law. **No money figure is computed anywhere in Settings.**

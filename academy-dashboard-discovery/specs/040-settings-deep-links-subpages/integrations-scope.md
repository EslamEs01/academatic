# Integrations — Scope (Spec 040)

**Nav id** `settingsIntegrations` · **Route** `settings.html#view=integrations` · **Surface** the existing `integrations` tab · **Count impact** 0

This is the largest capability gap in the spec **and** the highest credential risk in the product. Current app: **7 display-only cards, 0 configuration fields.** Legacy: **11 providers in 3 groups**, each with a real configuration surface.

## The catalog (11 providers — definitive, 0 UNKNOWN)

| Legacy id | Provider | Category | Legacy route result |
|---|---|---|---|
| 1 | **WhatsApp (Free)** | Communications | 200 — a 4-step pairing wizard |
| 2 | **Stripe** | Payments (incoming) | 200 — a method table + *Add Payment* |
| 3 | **PayPal** | Payments (incoming) | 200 — same |
| 4 | **Mollie** | Payments (incoming) | 200 — same |
| 5 | **XPay** | Payments (incoming) | 200 — same |
| 6 | **Payoneer** | Payments (incoming) | 200 — same |
| 7 | **Paymob** | Payments (incoming) | 200 — same |
| 8 | **Paymob Payout** | Payouts (outgoing) | **302** → `/management/payout-providers/7/edit` |
| 9 | **Payoneer Payout** | Payouts (outgoing) | **302** → `/management/payout-providers/6/edit` |
| 10 | **Custom** (offline / bank transfer / cash) | Payments (incoming) | 200 — same |
| 11 | **Email (SMTP)** | Communications | 200 — accounts + mail settings |

Current app has 7 cards (Stripe · PayPal · Paymob · Paymob Payout · Payoneer · WhatsApp · Email/SMTP). **Missing: Mollie · XPay · Custom · Payoneer Payout.**

## The Integrations ↔ Payment Methods relationship (the key structural finding)

For the **7 incoming gateways**, "Configure" does **not** open a credential form. It opens a **table of configured payment methods** for that gateway — `# | Name | Number Of Family | Key 1 | Key 2 | Settings` (PayPal's columns are `Client ID | Client Secret`) — plus an **Add Payment** link and per-row Edit / Delete. *Add Payment* is what leads to `/settings/payments/create?payment_method=N` — the 7 provider-specific credential forms.

So **payment methods are not a separate settings domain; they are the configuration objects of the incoming-payment integrations.** That is why the sixth nav item is `settingsUsers` and not "Payment Methods". Spec 040 rebuilds this relationship inside the Integrations tab — **no new nav item, admin menu stays 50**.

⚠ **That legacy table prints stored `Key 1` / `Key 2` — i.e. live secret material — in plain text on screen.** The rebuild renders **no key column at all**.

## What Spec 040 builds

1. **A grouped, searchable provider catalog** — 11 cards under Payments (incoming) / Payouts (outgoing) / Communications, each with an authored description and an honest **icon + text** status chip.
   - Honest status vocabulary (closed set): **not connected · available to connect · unavailable**.
   - **A "connected" state is unreachable.** No card may ever claim a live connection.
   - Legacy has **no status vocabulary at all** (a bare toggle) — the rebuild is strictly better here.
   - If a filter/search is rendered, it must actually filter (legacy's chip row is dead decoration). Note the platform constraint: `enhance.js` supports exactly **one** global `[data-no-results]` per page, so the Settings page may host **at most one** filterable region — this one.
2. **A per-provider configuration drawer** carrying that provider's **specific** evidenced field structure (see `integration-provider-field-matrix.md`), with:
   - non-sensitive fields as real, inert, labelled inputs (display name, mode, instructions, non-secret ids);
   - **sensitive fields as structure-only rows** — label + "required" + purpose, **never an input**;
   - webhook requirements shown as **read-only, non-actionable information** where the provider needs one;
   - Save / Connect / **Test connection** / Disconnect all as `data-disabled-reason` gates.
3. **The payment-method surface** for the 7 incoming gateways — the list of configured methods (name + provider + mode + status, **never a key column**) and the Add/Edit forms, per `payment-methods-scope.md`.

## Hard prohibitions (carried law + this spec)

- `type="password"` = **0**, `type="file"` = **0** sitewide.
- **No credential input of any kind** — not text, not masked, not readonly-with-value.
- **No authored credential value** anywhere: no API key, client secret, HMAC secret, SMTP password, OAuth token, webhook secret, merchant/integration id, or any realistic-looking placeholder for one.
- **No** fake connected state, fake test-connection result, fake pairing, fake webhook success, fake OAuth, fake delivery.
- **No** WhatsApp QR/pairing wizard (never captured — **UNKNOWN**; pairing is a gate).
- **No** SMTP secret surface (legacy exposes `smtp_password` as one of only **two** real `type=password` inputs in the entire crawl).
- **No** live-mode default. Where a provider has a sandbox/live mode, the control is explicit and never pre-set to live (legacy PayPal defaults to **Live** — a defect).
- Generic `Key 1` / `Key 2` labelling is **forbidden**; every field carries its true provider-specific name.

## What is explicitly NOT built here

| Capability | Owner |
|---|---|
| Real provider connections, OAuth, webhooks, test-connection | **Spec 053 — Integrations Command Center** |
| Embedded meetings (Zoom / Google Meet) | **Spec 054** |
| Message Builder (only evidence = a 504) | **Spec 053** |
| WhatsApp insights tables (leak a live group-invite URL + unmasked phones) | Not in Settings; privacy → **Spec 043**; capability → a messaging surface |
| Payout execution (these providers disburse **instructor salaries**) | The payroll/billing backend — and **no pay figure may appear here** |

## Pay-free note

Both payout providers exist to disburse **teacher salaries**, and WhatsApp advertises sending **salary reports**. Spec 040 may name the provider and its category ("payouts (outgoing)") but may render **no pay figure, rate or amount** anywhere in this tab. The teacher pay-free law is unchanged.

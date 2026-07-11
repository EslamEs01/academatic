# Integration Provider Field Matrix (Spec 040)

**S** = structure-only row (label + requirement + purpose; **never an input, never a value**) · **R** = rendered inert input · **G** = gate.
**No credential value is authored anywhere. `type="password"` = 0. `type="file"` = 0.**

## Provider register (11)

| # | Provider | Category | Current-app card | Honest status (authored) | Mode | Webhook | Sensitive fields | Spec 040 disposition | Real-integration owner |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **WhatsApp (Free)** | Communications | ✔ | not connected | — | — | phone/pairing | Card + description + **pairing = G**. **No QR/wizard invented** (never captured — UNKNOWN). | Spec 053 |
| 2 | **Stripe** | Payments (incoming) | ✔ | available to connect | *(none in legacy — we add an explicit one)* | — | publishable key, **secret key** | Card + method list + create/edit drawer | Spec 053 |
| 3 | **PayPal** | Payments (incoming) | ✔ | available to connect | live **(legacy default — forbidden)** / sandbox | — | client id, **client secret** | Card + method list + drawer; **mode never defaults to live** | Spec 053 |
| 4 | **Mollie** | Payments (incoming) | **✘ missing** | not connected | *(none)* | — | **API key** | **Add the provider** | Spec 053 |
| 5 | **XPay** | Payments (incoming) | **✘ missing** | not connected | staging / community *(broken: neither preselected)* | — | **API key** | **Add the provider** | Spec 053 |
| 6 | **Payoneer** | Payments (incoming) | ✔ (as payout) | not connected | sandbox ✓ / live | — | **API key** | Card + method list + drawer | Spec 053 |
| 7 | **Paymob** | Payments (incoming) | ✔ | not connected | region (≠ environment) | implied by HMAC | **secret key, public key, HMAC secret, API key** | Card + method list + drawer; add an explicit mode | Spec 053 |
| 8 | **Paymob Payout** | Payouts (outgoing) | ✔ | not connected | **sandbox / live (required)** | **✔ read-only URL** | **client secret, password** (the legacy `type=password`) | Card + configure drawer | Spec 053 + payroll backend |
| 9 | **Payoneer Payout** | Payouts (outgoing) | **✘ missing** | not connected | **sandbox / live (required)** | **✔ read-only URL** | **API password / key** | **Add the provider** | Spec 053 + payroll backend |
| 10 | **Custom** (offline / bank / cash) | Payments (incoming) | **✘ missing** | available to connect | — | — | **none** | **Add the provider** — the one fully renderable form | Spec 053 |
| 11 | **Email (SMTP)** | Communications | ✔ | not connected | — | — | **SMTP password** | Card + configure drawer (host/port/encryption **R**; password **S**) | Spec 053 |

**Missing from the current app: Mollie · XPay · Custom · Payoneer Payout.**

## Per-provider field structures

### Payment gateways (incoming) — the fields live on the payment-method form

See `payment-methods-scope.md` for the full per-provider table. Sensitivity summary:

| Provider | R (rendered) | S (structure-only) |
|---|---|---|
| PayPal | display name · mode | **client id · client secret** |
| Stripe | display name · mode *(added)* | **publishable key · secret key** |
| Mollie | display name | **API key** |
| XPay | display name · community id · variable-amount id · environment · 4 channel checkboxes (card / Fawry / Meeza-digital / Kiosk Aman) | **API key** |
| Payoneer | display name · merchant code · mode | **API key** |
| Paymob | display name · integration id · region · mode *(added)* | **secret key · public key · HMAC secret · API key** |
| **Custom** | display name · **payment instructions (textarea)** | *(none — the only provider with no secret)* |

### Payout providers (outgoing)

| Field | Paymob Payout | Payoneer Payout | Disposition |
|---|---|---|---|
| Webhook URL | ✔ (read-only, prefilled by the server) | ✔ (read-only) | **R — read-only, non-actionable information.** No webhook secret, ever. |
| **Mode** (`sandbox` / `live`) | **required** | **required** | **R** — explicit; never defaulted to live |
| Active | checkbox (off) | checkbox (off) | **R** inert; activation = **G** |
| Client ID / Username | ✔ | ✔ (username / login) | **R** |
| **Client Secret** | ✔ | — | **S** |
| Username | ✔ | — | **R** |
| **Password** | ✔ — **a real `type=password` in legacy** | — | **S** |
| **API password / key** | — | ✔ | **S** |
| Program ID | — | ✔ | **R** |
| Save | the only action | the only action | **G** |

### Email (SMTP) — provider 11

| Legacy form | Field | Disposition |
|---|---|---|
| Mail settings | `smtp_host` (text) | **R** |
| | `smtp_port` (number) | **R** |
| | `smtp_encryption` (select: None / SSL / TLS) | **R** |
| Account | `email_address` | **R** |
| | `smtp_username` | **R** |
| | **`smtp_password` (`type=password`)** | **S — never an input** |
| | `is_active`, `is_default` | **R** inert |
| Actions | Add Account · **Test SMTP** · Submit ×2 | **G ×4** |

### WhatsApp — provider 1

Legacy: a 4-step wizard (Phone → Pairing code → Finishing → Success) with `phone_number`, a pairing/QR mode radio, `send_group` (Private / Group), `group_name`, plus Logout / Wake / Retry / Send-test actions and a live websocket channel.

**Spec 040**: the provider card, its description, and an honest **pairing = gate**. **No wizard, no QR, no phone input, no test-send** — the pairing UI was never captured (UNKNOWN) and every one of those actions requires a live backend. WhatsApp **Logout** (which in legacy kills all automation with no confirm) is not rendered at all.

## Sensitive-field census

| Sensitive field | Provider | Legacy input type | Spec 040 |
|---|---|---|---|
| Client secret | PayPal, Paymob Payout | `text` / `password` | **S** |
| Secret key | Stripe, Paymob | `text` | **S** |
| Publishable key | Stripe | `text` | **S** |
| API key | Mollie, XPay, Payoneer, Paymob, Payoneer Payout | `text` | **S** |
| Public key | Paymob | `text` | **S** |
| **HMAC secret** | Paymob | `text` | **S** |
| Password | Paymob Payout | **`password`** | **S** |
| SMTP password | Email | **`password`** | **S** |
| **Total** | | **17 sensitive fields; legacy renders 15 of them in plain `type=text`** | **0 inputs, 0 values** |

## Non-negotiables

1. A sensitive field is **never** an input — not text, not masked, not readonly-with-value. Only its label, its requirement and its purpose appear.
2. **No** authored value that resembles a key, secret, token, HMAC, merchant/integration id or webhook secret exists in any fixture or locale module.
3. **No** provider may display "connected". The closed honest set is {not connected · available to connect · unavailable}, each an **icon + text** chip.
4. **No** fake test-connection, pairing, webhook, OAuth or delivery. Every final is a `data-disabled-reason` gate.
5. Where a provider has a **mode**, it is explicit and **never pre-set to live**.
6. Generic `Key 1` / `Key 2` labels are **forbidden**.
7. The sitewide no-secret assertions are **not weakened** — they get stricter.

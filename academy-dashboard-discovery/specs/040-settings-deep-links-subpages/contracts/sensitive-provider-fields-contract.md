# Contract — Sensitive Provider Fields (Spec 040)

**The law:** a sensitive field is **NEVER an input** — not `text`, not masked, not `readonly`-with-value, not
`type="password"`. Only its **safe label**, its **required indicator** and its **purpose** appear, as a
**structure-only row** (`.set-struct`, a `<div>` — additive CSS, **no control, no value, no new hook**).

**Count = 24 sensitive fields** (Ledger R10 — **PICK 24**). The earlier Spec-040 artifact figure of **17** is
**superseded**: it silently dropped Paymob-Payout key1–3, Payoneer-Payout key1–3 and `smtp_username`. The 24 below is
itemisable field-by-field from raw legacy HTML: incoming **15** (PayPal 2 · Stripe 2 · Mollie 1 · XPay 3 ·
Payoneer 2 · Paymob 5 · Custom 0) + payouts **7** (Paymob Payout 4 · Payoneer Payout 3) + Email **2**.

Structure rows rendered on the Integrations tab = **26** = the 24 sensitive rows + **2 read-only webhook-URL rows**
(Paymob Payout · Payoneer Payout) — the webhook URL is *information*, not a credential, and carries **no value**
(Ledger F.5/F.7).

---

## 1. The legacy anti-pattern (why this contract exists)

- The entire legacy crawl contains exactly **two** `type="password"` inputs: Paymob-Payout `password` and
  `smtp_password`. **The other 22 sensitive fields are plain, unmasked `type="text"`.**
- The gateway *Configure* tables print stored secret material **in plain text on screen** as `Key 1` / `Key 2`
  columns (the one populated row emits `<td>01015264856</td>`). **Zero masking exists anywhere in legacy.**
- Generic `Key 1 … Key 4` labelling hides *what* each credential is, so it cannot even be audited.

**Spec 040 renders none of it: 0 inputs, 0 values, 0 masks-of-a-value, 0 key columns.**

---

## 2. The 24 sensitive fields — structure-only rows

**Purpose copy is a CLOSED set — no business explanation may be invented:**

| Code | Purpose sentence (AR / EN — authored, mirrored) |
|---|---|
| **P1** | «بيانات اعتماد تُخزَّن على الخادم — لا تُعرض ولا تُدخل من هذه الشاشة.» / "A server-stored credential — never displayed and never entered from this screen." |
| **P2** | The **proven legacy help text**, reproduced only where raw HTML carries it (2 fields only). |
| **P3** | «الغرض غير مُثبت في المصدر (UNKNOWN).» / "Business meaning not proven by the source (UNKNOWN)." |

State shown on every row: «غير متاح — يُدار على الخادم» / "unavailable — managed on the server". There is **no
value**, therefore **no mask** (`••••` bound to nothing is a lie about possession).

| # | Provider | Legacy name | Safe label (rendered) | Required | Purpose | Legacy input type |
|---|---|---|---|---|---|---|
| 1 | Stripe | `key1` | **Publishable Key** *(placeholder-proven)* | ✔ | P1 | text |
| 2 | Stripe | `key2` | **Secret Key** *(placeholder-proven)* | ✔ | P1 | text |
| 3 | PayPal | `key1` | **Client ID** *(label-proven)* | ✔ | P1 | text |
| 4 | PayPal | `key2` | **Client Secret** *(label-proven)* | ✔ | P1 | text |
| 5 | Mollie | `key1` | **API Key** | ✔ | P1 | text |
| 6 | XPay | `key1` | **API Key** | ✔ | P1 | text |
| 7 | XPay | `key2` | **Community ID** | ✔ | P1 + **P3** | text |
| 8 | XPay | `key3` | **Variable Amount ID** | ✔ | P1 + **P3** | text |
| 9 | Payoneer | `key1` | **Merchant Code** | ✔ | P1 + **P3** | text |
| 10 | Payoneer | `key2` | **API Key** | ✔ | P1 | text |
| 11 | Paymob | `key1` | **Secret Key** | ✔ | P1 | text |
| 12 | Paymob | `key2` | **Integration ID** | ✔ | **P2** — "comma-separated when offering more than one" *(proven help text)* | text |
| 13 | Paymob | `key3` | **Public Key** | ✔ | P1 | text |
| 14 | Paymob | `key4` | **HMAC Secret** | ✔ | P1 | text |
| 15 | Paymob | `settings[api_key]` | **API Key** | ✘ *(optional)* | **P2** — "optional; status reconciliation only; a separate credential from the Secret Key" *(proven help text)* | text |
| 16 | Paymob Payout | client id | **Client ID** | ✔ | P1 | text |
| 17 | Paymob Payout | client secret | **Client Secret** | ✔ | P1 | text |
| 18 | Paymob Payout | username | **Username** | ✔ | P1 | text |
| 19 | Paymob Payout | `key4` | **Password** | ✔ | P1 | **`password`** *(1 of the only 2 in the crawl)* |
| 20 | Payoneer Payout | username / login | **Username / Login** | ✔ | P1 | text |
| 21 | Payoneer Payout | api password / key | **API Password / Key** | ✔ | P1 | text |
| 22 | Payoneer Payout | program id | **Program ID** | ✔ | P1 + **P3** | text |
| 23 | Email (SMTP) | `smtp_username` | **SMTP Username** | ✔ | P1 | text |
| 24 | Email (SMTP) | `smtp_password` | **SMTP Password** | ✔ | P1 | **`password`** *(2 of 2)* |

**Custom (offline / bank / cash) has ZERO sensitive fields** — the one provider whose whole form is renderable.

### Where these are configured securely (authored copy, one shared sentence per row group)

In the **provider's own account/console**, and stored **server-side** in the backend's secret store — never in this
UI, never in a fixture, never in a locale module, never in a built HTML file. **Backend requirement (Spec 053):**
write-only ingestion, server-side storage, **never returned to the client**, never echoed into a template; the
frontend may only ever learn a *derived, non-secret* connection state — and even that is out of scope for Spec 040.

---

## 3. Explicit BAN LIST (0 occurrences on `settings.html` / `settings.en.html`)

| Banned | Scope |
|---|---|
| `input[type="password"]` | any page (`field()` supports only `text\|number\|select\|textarea` — structurally unreachable) |
| `input[type="file"]` | any page (same) |
| **Any authored credential value** — API key, publishable key, secret key, client secret, HMAC secret, public key, merchant code, integration id, community id, variable-amount id, program id, OAuth token, webhook secret, SMTP username/password | fixtures, locales, built HTML |
| Any **realistic-looking placeholder** for a credential (e.g. `sk_live_…`, `pk_test_…`, a phone number, an email) | fixtures, locales |
| A **mask** (`••••`, `****`, `xxxx1234`) implying a stored value | anywhere |
| A **credential input** of any kind — text, masked, `readonly`, `disabled`, hidden | anywhere |
| Generic **`Key 1` / `Key 2` / `Key 3` / `Key 4`** labelling | anywhere (the improved product names every credential) |
| A **webhook secret** (the read-only webhook **URL** row is allowed — with **no value**) | anywhere |
| A **"Connected"** chip · a fake test-connection / pairing / OAuth / delivery result · a fake success toast | anywhere |
| `<canvas>` · `draggable="true"` · `download=` · `window.open` · `blob:` | anywhere |
| A currency symbol / pay figure | the whole settings body (`a31.currency === 0`) |

---

## 4. The NAMING LAW (Ledger R1 — the highest risk in Spec 040)

Two machine guards scan control **`name` + `id`** (never labels, never body text):

| Guard | Regex | Scope |
|---|---|---|
| `a31.credInputs` (`smoke:1152`) | `/pass\|secret\|api\|key\|token\|webhook\|card\|cvv/i` | every `input,textarea` inside `#page-body` |
| `f32` `OMIT` (`smoke:1216`) | `/pass\|secret\|api[-_]?key\|token\|webhook\|otp\|salary\|hour[-_]?rate\|fine\|payout\|iban\|cvv/i` | every `input,select,textarea` inside a registered `FORM_DRAWERS_032` template |

⚠ **The drawer guard additionally bans `payout`.** A control named `integ-paymob-payout-mode` **fails the build's
test** even though the *drawer id* `integ-paymob-payout` is fine (the audit reads control names, not the template id).

**The 21 sanctioned `field()` names on the Integrations tab** (Ledger F.5: exactly 21) — all verified clean against
both regexes:

| Provider | Control names |
|---|---|
| Stripe | `integ-stripe-name` |
| PayPal | `integ-paypal-name` · `integ-paypal-env` |
| Mollie | `integ-mollie-name` |
| XPay | `integ-xpay-name` · `integ-xpay-url` |
| Payoneer | `integ-payoneer-name` · `integ-payoneer-env` |
| Paymob | `integ-paymob-name` · `integ-paymob-region` |
| Custom | `integ-custom-name` · `integ-custom-details` *(textarea)* |
| Paymob Payout | `integ-pmb-out-mode` *(**not** `…-payout-…`)* |
| Payoneer Payout | `integ-pyn-out-mode` *(**not** `…-payout-…`)* |
| WhatsApp | `integ-wa-phone` · `integ-wa-audience` · `integ-wa-group` |
| Email (SMTP) | `integ-email-address` · `integ-email-host` · `integ-email-port` *(number)* · `integ-email-enc` *(select: None / SSL / TLS)* |
| **Total** | **21** |

The **8 `data-toggle` previews** are `<button>`s (existing hook, existing `.toggle/.knob/.is-on` CSS) and therefore
cannot trip either guard — but they still avoid the banned substrings:
`integ-xpay-ch-1…4` (channel labels *card · Fawry · Meeza-digital · Kiosk Aman* live in the **copy**, never in an
id) · `integ-pmb-out-active` · `integ-pyn-out-active` · `integ-email-active` · `integ-email-default`.
Every toggle is a **labelled local preview**: it flips visually, **persists nothing**, its `data-toast` carries the
**backendRequired** wording, and its section shows the visible preview-only note («معاينة فقط — لا يُخزَّن أي تغيير
قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected" — **never** "not saved", which
would trip the `\bsaved\b` fake-success census) plus **one gated Save** (Ledger F.5/R5).

**Elsewhere on the hub the same law binds** — notably Customization's `card_style` → **`cust-surface`** (a name
containing `card` fails `credInputs`, Ledger R1).

---

## 5. Machine-checkable invariants

```
settings(.en).html  #page-body:
  input[type=password]                       === 0
  input[type=file]                           === 0
  canvas                                     === 0
  credInputs  (name|id ~ pass|secret|api|key|token|webhook|card|cvv)   === 0
  structure rows (.set-struct) on integrations                        === 26   (24 sensitive + 2 webhook URL)
  .set-struct input|select|textarea          === 0        (a structure row is never a control)
  .set-struct [value]                        === 0        (a structure row never carries a value)
  text matching /متصل|connected/i in a status chip                     === 0
  a31.currency                                === 0
  a31.noPdf                                   === true
  a31.gates                                   >= 20
FORM_DRAWERS_032.settings ⊇ the 11 integ-* drawers  →  per drawer:
  controls >= 1 · gates >= 1 · primary gates <= 1 · OMIT-named controls === 0 · canvas === 0
fixtures + locales (source grep):
  0 authored value matching a key/secret/token/HMAC/merchant-id shape
  0 occurrence of "Key 1|Key 2|Key 3|Key 4" as a label
```

Provider **names** ("Paymob", "Stripe", "Payoneer") and honest reason copy ("no secrets are shown here") are
**LEGITIMATE** body text — `smoke:1142-1143` says so explicitly, and the credential guards target real **inputs**,
not words. The finance-scoped `noSecret` body-text regex (`smoke:1121`) applies to the **finance** body only and is
**not** extended to settings.

---

## 6. Verify

- smoke `settings` AR+EN: the invariants in §5.
- smoke `f32`: all 11 `integ-*` drawers registered (Ledger R4 — **an unregistered drawer escapes the audit and is a
  spec failure, not a pass**).
- a11y: an open provider drawer must expose each structure row as readable, non-interactive text (label + required
  badge + purpose); critical=0, serious=0.
- screenshots: one `sp040-*` frame of an open `integ-paymob` drawer showing **5 structure rows and 0 credential
  inputs**.

**Status**: Binding. Sources: Ledger §F.5, §F.6, §F.7, §H, §K (R1/R2/R3/R4/R5), stop conditions #4/#5/#7;
`integration-provider-field-matrix.md`; `payment-methods-scope.md`; `no-secret-credential-contract.md` (Spec 031,
carried and **strengthened**, never weakened).

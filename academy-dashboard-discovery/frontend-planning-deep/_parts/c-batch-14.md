# Batch 14 — admin · Settings / Payment Methods

All 8 pages are HTTP 200. Module: Settings > Payments. The batch covers one "edit existing payment config" page and seven "create new payment method" pages, each parameterized by `?payment_method=N` to select the gateway type. All pages share the same outer shell (sidebar, header, modals), with the inner form card being the only differentiator.

---

### `management-settings-payments-1-edit` — Edit Payment Method (Custom)

- **Purpose:** Edit an existing saved "Custom" payment gateway configuration (record ID 1).
- **Key sections / flows:** Single card "Edit — Custom" with a Name field and a Payment Details textarea; the textarea requires each line to end with `\n` (used for multi-line bank transfer / manual payment instructions). Submit persists changes via POST to `/management/settings/payments/1` (PUT tunnel via hidden `_method`).
- **Key SAFE actions:** Navigate sidebar; view notifications; close modals.
- **Key MUTATING/dangerous actions:** Submit (saves edited payment details to live config); Save (shortcuts modal).
- **Important modals/forms:** Edit form (Form 2) — fields: `name` (text), `key1` (textarea, payment details with explicit `\n` line-ending instruction). No delete button visible on this page; confirm with backend whether delete is on the list page.
- **Variant-of:** unique template (edit path `/payments/{id}/edit`; only one edit page captured; create variants below share a different template)
- **Broken/empty:** None. Logo image 404 (`/storage/uploads/logo.png`) is a cross-site asset issue present on all pages in this batch — not a page-level error.
- **UX improvement for the rebuild:** Replace the raw `\n`-terminated textarea with a structured multi-row "payment detail lines" editor (add/remove rows), eliminating the error-prone manual `\n` instruction and preventing malformed output.

---

### `management-settings-payments-create-payment-method-1` — Add Payment Method: PayPal

- **Purpose:** Create a new PayPal payment gateway configuration.
- **Key sections / flows:** Single card "Add Payment — Paypal"; fields for display Name, Client ID, Client Secret, and an Environment radio group (Live / Sandbox). POSTs to `/management/settings/payments`.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates new live payment gateway config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Client ID), `key2` (Client Secret / Secret Key), `xpay_url` radio (Live | Sandbox).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (shared create template; this instance differs only in gateway-specific field labels and environment toggle)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Show a password-type input with reveal toggle for Client Secret; add a clear "Test Connection" CTA after saving so admins can validate credentials without live-firing a transaction.

---

### `management-settings-payments-create-payment-method-2` — Add Payment Method: Stripe

- **Purpose:** Create a new Stripe payment gateway configuration.
- **Key sections / flows:** Single card "Add Payment — Stripe"; fields: Name, Key 1 (Publishable Key), Key 2 (Secret Key). No environment toggle — Stripe mode presumably controlled by key prefix.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates new gateway config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Publishable Key), `key2` (Secret Key). Fewer fields than PayPal/XPay; no environment radio.
- **Variant-of:** `management-settings-payments-create-payment-method-N` (same create template, Stripe fields subset)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Mask the Secret Key field by default (password input) with a show/hide toggle; add inline help linking to Stripe dashboard docs.

---

### `management-settings-payments-create-payment-method-3` — Add Payment Method: Custom

- **Purpose:** Create a new "Custom" (manual / bank-transfer style) payment method.
- **Key sections / flows:** Single card "Add Payment — Custom"; fields: Name and Payment Details textarea (same `\n`-line convention as the edit page). No API keys — purely instructional text displayed to the payer.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates new custom payment config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (textarea, payment instructions with explicit `\n` per-line requirement).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (minimal field variant of the create template)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Same as edit-custom: replace `\n`-delimited textarea with structured rows editor (label + value pairs) to avoid user error on newline formatting.

---

### `management-settings-payments-create-payment-method-4` — Add Payment Method: XPay

- **Purpose:** Create a new XPay (Egyptian payment aggregator) gateway configuration.
- **Key sections / flows:** Single card "Add Payment — XPay"; richest field set in the batch: Name, API Key, Community ID, Variable Amount ID, XPay URL radio (staging | community), and four payment-method checkboxes (Card, Fawry, Meeza Digital / mobile wallets, Kiosk Aman). 12 inputs total.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates gateway config with live credentials and enabled payment methods).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (API Key), `key2` (Community ID), `key3` (Variable Amount ID), `xpay_url` radio (staging | community), `xpay_method[]` checkboxes (Card, Fawry, Meeza Digital, Kiosk Aman).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (most field-rich variant; unique checkbox group for payment sub-methods)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Group the payment-method checkboxes visually as a fieldset with logos/icons; add tooltip explaining staging vs. community URL; show a live preview of which checkout options the payer will see.

---

### `management-settings-payments-create-payment-method-5` — Add Payment Method: Mollie

- **Purpose:** Create a new Mollie payment gateway configuration (single-key setup).
- **Key sections / flows:** Single card "Add Payment — mollie"; minimal fields: Name and Key 1 (API Key). Simplest API-key gateway in the batch.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates gateway config).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (API Key). No environment toggle, no additional keys.
- **Variant-of:** `management-settings-payments-create-payment-method-N` (minimal single-key variant of the create template)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Add a "Live / Test key" detector (Mollie keys are prefixed `live_` or `test_`) that auto-labels the environment based on key prefix, removing ambiguity.

---

### `management-settings-payments-create-payment-method-6` — Add Payment Method: Payoneer

- **Purpose:** Create a new Payoneer gateway configuration.
- **Key sections / flows:** Single card "Add Payment — Payoneer"; fields: Name, Merchant Code, API Key, and Environment radio (Sandbox (test) | Live (production)). Two API credentials plus environment toggle.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates gateway config for live or sandbox).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Merchant Code), `key2` (API Key), `xpay_url` radio (Sandbox | Live).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (same template, two-key + environment variant)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Highlight with a warning banner when the "Live" environment is selected, requiring an explicit confirmation before saving, to prevent accidental production activation during setup.

---

### `management-settings-payments-create-payment-method-7` — Add Payment Method: Paymob

- **Purpose:** Create a new Paymob gateway configuration (Egypt/GCC multi-country).
- **Key sections / flows:** Single card "Add Payment — Paymob"; most complex key set: Name, Secret Key, Integration ID (comma-separated, one per checkout type e.g. card + wallet + instalments), Public Key, HMAC Secret, optional API Key (for reconciliation), and a country/region radio (Egypt | Oman | Saudi Arabia | UAE). Inline `<small>` help text present for Integration ID and API Key — the only page in the batch with inline field help.
- **Key SAFE actions:** Sidebar navigation; close modals.
- **Key MUTATING/dangerous actions:** Submit (creates full Paymob config including all credential keys and multi-region selector).
- **Important modals/forms:** Create form (Form 2) — `name`, `key1` (Secret Key), `key2` (Integration ID, comma-sep), `key3` (Public Key), `key4` (HMAC Secret), `settings[api_key]` (optional API Key), `xpay_url` radio (Egypt | Oman | Saudi Arabia | UAE).
- **Variant-of:** `management-settings-payments-create-payment-method-N` (most complex variant; unique `settings[api_key]` nested field and `<small>` help text; region selector instead of sandbox/live toggle)
- **Broken/empty:** None (200).
- **UX improvement for the rebuild:** Surface the Integration ID multi-value entry as a tag/chip input (add one ID at a time) rather than a comma-delimited string, reducing formatting errors; make the optional API Key field collapsible with an "Advanced" disclosure to reduce cognitive load.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Settings > Payments sub-module lets admins register payment gateway credentials that the platform uses to process family invoices. Core entities: PaymentMethod (gateway type enum 1–7+), named gateway configurations (records), and per-gateway credential fields (key1–key4, environment/region). One edit page (for existing record ID 1, type Custom) and 7 create pages (one per gateway type) were captured.

**Distinct page templates vs variant count:**
- 2 distinct templates:
  1. **Edit template** (`/payments/{id}/edit`) — 1 page, fields differ by stored type
  2. **Create template** (`/payments/create?payment_method=N`) — 7 pages, each rendered by the same shell with gateway-specific field composition
- 6 of the 7 create pages are query-param variants of the same create template (differing only in which fields are rendered). XPay (method=4) and Paymob (method=7) are the most structurally distinct within the create template due to checkboxes and nested `settings[]` keys.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- All 8 pages carry the same 3 modals: (1) a loading/dynamic modal, (2) Recent Searches, (3) Add Shortcuts. None of these are payment-specific and all are globally inherited chrome — none are dangerous in isolation.
- The primary mutating action on every page is the main form **Submit**, which persists live credentials; this is potentially high-impact because a misconfigured or sandbox-keyed live gateway will silently fail payments.
- No delete/deactivate buttons are visible on any create/edit page — deletion is presumably handled on the list page (not in this batch).

**Improvements for the new platform:**

1. **Credential security:** Mask all secret key / API key fields as password inputs with show/hide toggle; never render plaintext secrets in the DOM after save.
2. **Environment safety:** When "Live" / "Production" is selected in the radio, show a persistent yellow warning strip and require a confirmation checkbox before Submit is enabled.
3. **Structured textarea:** Replace the `\n`-line-delimited Payment Details textarea (Custom type) with a structured key-value row editor; eliminate the manual line-ending convention.
4. **Integration ID chips (Paymob):** Comma-delimited multi-value Integration ID field should be a chip/tag input with per-item add/remove.
5. **Inline help:** Only Paymob has `<small>` help text today. All gateways should show contextual helper links (e.g., "Where to find your Client ID in PayPal" linking to external docs).
6. **Test connection CTA:** After saving, offer a "Test connection" action that pings the gateway API with the stored credentials and reports success/failure, rather than requiring a live payment to detect misconfiguration.
7. **Gateway logo / type badge:** The create pages have no gateway branding; the rebuild should show the gateway logo in the form header to make it obvious which gateway is being configured, especially important when multiple configs exist.
8. **RTL/Arabic support:** All captured pages are LTR (`lang: en`). If the platform serves Arabic, the settings forms must be RTL-compatible; radio labels and checkbox stacks need mirroring.
9. **Field required markers:** No form field has the HTML `required` attribute set despite fields marked `*`. The rebuild must enforce validation at the form level with ARIA `aria-required`, client-side validation feedback, and server-side error display.
10. **Empty state for payments list (not captured):** Need the payments list page to confirm whether it shows a meaningful empty state (no payment methods configured yet) and a direct "Add" CTA.

**Anything that needs owner/backend confirmation:**
- Why are fields named `key1`–`key4` generically rather than semantically (e.g., `stripe_publishable_key`)? The rebuild should decide whether to keep the generic schema or migrate to per-gateway named fields.
- Whether gateway `payment_method` IDs 1–7 are exhaustive or if more exist (only 7 captured, discovered from integration configure routes).
- Whether delete/deactivate of a payment config is accessible from the edit page or only the list page — confirm the delete flow and whether it checks for active invoices using that method.
- The logo.png 404 (`/storage/uploads/logo.png`) is a persistent asset error on every admin page — confirm whether this is an environment-specific asset gap or a genuine missing upload.

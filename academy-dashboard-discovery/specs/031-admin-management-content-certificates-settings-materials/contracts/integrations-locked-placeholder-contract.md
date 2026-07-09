# Contract: Integrations Locked-Placeholder

**Purpose**: Integration provider cards show name + status only; no credentials, no live connection.

**MUST**:
- Cards for payments (Stripe/Paypal/Mollie/Xpay/Payoneer/Paymob/Custom), payouts (Paymob/Payoneer Payout), WhatsApp, Email — each a **locked placeholder** (provider name + authored status chip like "not connected").
- No credential input; no `type=password`; no API-key/secret/webhook/token/`smtp_password`; no phone input; no pairing wizard; no real PII.
- Connect/Disconnect/Test-connection/Configure/Save-credentials = future-backend gates.
- Status never flips to a live "Connected"/«مفعّل».
- Payment-gateway + payout-provider credentials → future-backend (Spec-030 boundary); no config surface.

**Verify**: smoke — Integrations tab renders ≥8 locked cards; Connect/Test = gates; `noSecret` = true; status is authored (no live-connect mutation).

**Status**: Binding. `future-owner-register.md` E-rows; Register #12.

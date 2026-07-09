# Contract: No Secret / Credential

**Purpose**: No credential, secret, or password field is ever rendered.

**MUST** (0 occurrences on any 031 built body):
- `type="password"` = 0.
- `api[-_ ]?key` / `client[-_ ]?secret` / `webhook` / `secret` / `token` (as credential) = 0.
- `paymob`/`payoneer`/`stripe`/`paypal`/`xpay`/`mollie` credential inputs = 0.
- `smtp_password`/`smtp_username`/`key1..key4`/`settings[api_key]`/`backup_email` = 0.
- Integration/gateway/payout/SMTP cards = **locked placeholders** (provider name + status chip only); if credential parity is needed, a locked card — never an input.
- Payment-gateway + payout-provider credentials → future-backend (Spec-030 boundary); no config surface.

**Verify**: smoke `noSecret = !/type="password"|api[-_ ]?key|client[-_ ]?secret|webhook|secret|token|paymob|payoneer|stripe|paypal|xpay|mollie|smtp_password/i` over 031 bodies.

**Status**: Binding. Register #1–#5.

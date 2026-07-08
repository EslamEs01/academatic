# Contract — Bank Surface (F-G)

**Guarantee**: display-only banks; no integration; no credentials.
- Bank rows = name + status only. Add/Edit bank = backendRequired modal (name only).
- Import statement / Match / Reconcile = backendRequired gates.
- NO credentials, NO account numbers, NO balances, NO bank integration, NO API keys.
**Verify (smoke)**: rows name/status only; Add = modal; Import/Reconcile = gates; no credential/account-number field.
**Fail if**: a credential/account-number/balance appears; a fake import/reconcile occurs.

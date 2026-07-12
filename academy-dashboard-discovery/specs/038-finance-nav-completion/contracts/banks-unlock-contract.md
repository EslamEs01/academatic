# Contract — banks Unlock

**Decision:** NAV-UNLOCK ONLY. `finance.html#view=banks` (+ `.en`) already exists — it shipped
in Spec 030 (`banksSection()` in `pages/finance.js`) and is already reachable via the in-page tab
button + `#view=banks` deep-link (proven since Spec 030/032). Count impact **0**; **0 body
change**.

## Mechanism
- Nav-only: `nav.config.js` `banks` item (`cat.finance` sub-section) `status:'disabled'`,
  `reasonKey:'nav.reason.finance'` → `status:'implemented'` (drop `status`/`reasonKey`),
  `route:'finance.html#view=banks'`. This is the ONE change this contract scopes.
- **No `finance.js` / `fixtures/finance.js` / `ar.fin.js` / `en.fin.js` / `enhance.js` change is
  required or proposed** — the tab body, its fixture, and its locale keys are confirmed as
  already satisfying the unlocked nav promise.
- `PLANNED_FINANCE`'s `banks` entry (`availability:'backendRequired'`, icon `lock`, the REAL
  bank-integration/API-connection capability) is a DIFFERENT capability from this display-only
  tab (4 authored bank names + status) and is explicitly **KEPT unchanged** — same
  Spec 036/037/038 precedent as `teacherCategories`/`monthlyReports`/`monthlyInvoices`
  (a promoted nav item and its sibling planned card coexist). `plannedN===9` stays
  byte-verbatim.

## Must render (already shipped — confirmed, not re-specified)
- Tab header: `fin.bank.title` / `fin.bank.sub` (`banksSection()`).
- Action cluster: `fin.bank.add` (a REAL `data-drawer="bank-add"` form-drawer, Spec 032 FC-29:
  name-only field) + `fin.bank.import` / `fin.bank.reconcile` (both `data-disabled-reason`
  gates).
- Bank cards: `cardGrid(BANKS.map(bankRow))` — 4 authored rows (`bank1`..`bank4`), each `nameKey`
  + `bankStatusChip(statusId)` (active/inactive). Name and status ONLY.
- Add-bank drawer: `formDrawer('bank-add', { fields: field({ name }), … })` — a single
  `bankAdd-bankName` text field; the Save final is the standard clickable
  `data-disabled-reason` `backendRequired` gate (nothing persists).
- No new section is required by this contract — the existing 4-row board + gates already satisfy
  the `nav.banks` promise once the nav item points at it.

## Must NOT (already enforced — reconfirmed, not modified)
- No fake balance figure of any kind (no "Balance: X SAR" tile — never existed, must never be
  added).
- No fake reconciliation/verification/transaction-sync success — Import/Reconcile stay
  `data-disabled-reason` gates; no toast implying a statement was actually parsed or matched.
- No credential/API-key/webhook/routing-number/IBAN/account-number field on the Add-bank drawer
  (name-only, per the Spec 032 FC-29 MUST-OMIT contract).
- No status mutation — a bank's `active`/`inactive` chip never flips from the UI.
- No backend/API/websocket call of any kind.

## Final gated actions (already shipped — unchanged)
- `fin.bank.import` (Import statement) → `data-disabled-reason` gate, `fin.bank.importReason`.
- `fin.bank.reconcile` (Reconcile) → `data-disabled-reason` gate, `fin.bank.reconcileReason`.
- `fin.bank.add` (Add bank) → opens the REAL `bank-add` form drawer; its Save final is a
  `data-disabled-reason` `backendRequired` gate (name-only field, nothing persists).

## Fixture / locale plan
- **Zero fixture change** — `BANKS`, `BANK_STATUS` in `fixtures/finance.js` stay exactly as
  shipped in Spec 030/032, 0-diff.
- **Zero locale change** — all `fin.bank.*` keys already exist in `ar.fin.js`/`en.fin.js`
  (`title`/`sub`/`status.active`/`status.inactive`/`add`/`addTitle`/`form.name`/`form.namePh`/
  `import`/`importReason`/`reconcile`/`reconcileReason`/`empty`/`name.*`); `nav.banks` (the nav
  LABEL key) already exists too. No new key needed.

## Acceptance (smoke)
- `finance.html#view=banks` / `.en` deep-links open the Banks tab on fresh load (already proven
  since Spec 030/032 — re-pin, not newly asserted).
- The nav sidebar's `banks` item is now a real `<a href>` (not a disabled-with-reason button);
  clicking it lands on the Banks tab.
- Exactly **4** bank rows render; the `bank-add` drawer opens with its single name field; 0
  balance/credential token anywhere.
- `PLANNED_FINANCE`'s `banks` card (backendRequired) is KEPT unchanged; `plannedN===9` unaffected.
- `finance.js` / `fixtures/finance.js` / `ar.fin.js` / `en.fin.js` diff = **0** for this change
  (nav.config.js only).
- Admin-menu stays 50 (status change only, not an add/remove); route/page count stays 115; a11y
  critical=0 serious=0 on the Banks tab (re-confirm after the disabled→enabled nav-link role
  change); existing finance/`plannedN===9`/payHit/famPay/child-view/Spec 026-037 asserts stay
  byte-verbatim.

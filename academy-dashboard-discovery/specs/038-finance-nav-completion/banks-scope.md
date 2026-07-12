# Banks — Scope (Spec 038)

## Tab decision
- Route: `finance.html#view=banks` (and the EN mirror `finance.en.html#view=banks`).
- Page-count impact: **0 new pages; 0 new HTML changes to the tab body itself.** Count HELD
  115 → 115. Unlike `invoices`/`payments`/`monthlyInvoices`, the **Banks tab already exists** —
  it shipped in Spec 030 (`banksSection()` in `pages/finance.js`, wired into the SAME `tabs({
  group: 'finance', items: [overview, salaries, banks], … })` call) and is already reachable via
  the in-page tab button + `#view=banks` deep-link (proven since Spec 030/032). **This file is a
  NAV-UNLOCK ONLY** — no `finance.js`/`fixtures/finance.js`/component change is required or
  proposed.
- Nav flip: `nav.config.js` — the `banks` item (`cat.finance` sub-section, line ~91) currently
  `status: 'disabled', reasonKey: 'nav.reason.finance'` (no route) → `status: 'implemented'`
  (drop `status`/`reasonKey`), `route: 'finance.html#view=banks'`. This is the ONE change this
  file scopes. Note `PLANNED_FINANCE` (in `fixtures/finance.js`) ALSO carries a `banks` entry
  (`availability: 'backendRequired'`, icon `lock`) inside the Overview tab's planned-cards
  section — that card represents the REAL bank-integration/API-connection capability (different
  from the display-only Banks TAB, which lists 4 authored bank names + status). Per the
  Spec 036/037/038 precedent (teacherCategories, monthlyReports, monthlyInvoices), a promoted nav
  item and its sibling `PLANNED_FINANCE`/`plannedN` card can coexist — **this card is KEPT
  unchanged**; `plannedN===9` stays byte-verbatim (unaffected — the nav flip touches
  `nav.config.js` only, never `PLANNED_FINANCE`).

## Display sections (already shipped — confirmed, not re-specified)
1. **Tab header** — `fin.bank.title`/`fin.bank.sub` (`banksSection()`).
2. **Action cluster** — `fin.bank.add` (a REAL `data-drawer="bank-add"` form-drawer, Spec 032
   FC-29: name-only field) + `fin.bank.import` / `fin.bank.reconcile` (both
   `data-disabled-reason` gates).
3. **Bank cards** — `cardGrid(BANKS.map(bankRow))`: 4 authored rows (`bank1..bank4`), each
   `nameKey` + `bankStatusChip(statusId)` (active/inactive) — name and status ONLY.
4. **Add-bank drawer** — `formDrawer('bank-add', { fields: field({ name }) , … })` — a single
   `bankAdd-bankName` text field; the Save final is the standard clickable
   `data-disabled-reason` `backendRequired` gate (nothing persists).

No new section is added by this scope file — the existing 4-row board + gates already satisfy
the `nav.banks` promise once the nav item points at it.

## Allowed authored data
- The EXISTING 4 `BANKS` rows (`fixtures/finance.js`): `id`, `nameKey`, `statusId`
  (active/inactive). No new rows, no new fields — explicitly NO account number, NO IBAN, NO
  balance, NO routing/SWIFT code, NO credential of any kind (already the case; this file confirms
  it, does not change it).

## Forbidden behavior (already enforced — reconfirmed for the nav-unlock)
- No fake balance figure of any kind (no "Balance: X SAR" tile — never existed, must never be
  added).
- No fake reconciliation/verification/transaction-sync success (Import/Reconcile stay
  `data-disabled-reason` gates; no toast implying a statement was actually parsed or matched).
- No credential/API-key/webhook/routing-number field on the Add-bank drawer (name-only, per the
  Spec 032 FC-29 MUST-OMIT contract) — reconfirmed, not modified.
- No backend/API/websocket call of any kind.
- No status mutation (a bank's `active`/`inactive` chip never flips from the UI).

## Final gated actions (already shipped — unchanged)
- `fin.bank.import` (Import statement) → `data-disabled-reason` gate, `fin.bank.importReason`.
- `fin.bank.reconcile` (Reconcile) → `data-disabled-reason` gate, `fin.bank.reconcileReason`.
- `fin.bank.add` (Add bank) → opens the REAL `bank-add` form drawer; its Save final is a
  `data-disabled-reason` `backendRequired` gate (name-only field, nothing persists).

## Fixture / locale plan
- **Zero fixture change.** `BANKS`, `BANK_STATUS` in `fixtures/finance.js` stay exactly as
  shipped in Spec 030/032 — 0-diff.
- **Zero locale change.** All `fin.bank.*` keys already exist in `ar.fin.js`/`en.fin.js`
  (`title`/`sub`/`status.active`/`status.inactive`/`add`/`addTitle`/`form.name`/`form.namePh`/
  `import`/`importReason`/`reconcile`/`reconcileReason`/`empty`/`name.*`). No new key is needed
  for this file's scope (nav-unlock only) — `nav.banks` (the nav LABEL key) already exists too.

## Smoke / a11y / screenshot scope
- Smoke: `finance.html#view=banks` and `finance.en.html#view=banks` deep-links open the Banks
  tab on fresh load (already proven since Spec 030/032 — re-pin, not newly asserted); the nav
  sidebar's `banks` item is now a real `<a href>` (not a disabled-with-reason button) and clicking
  it lands on the Banks tab; exactly 4 bank rows render; the `bank-add` drawer opens with its
  single name field; 0 balance/credential token anywhere. Admin-menu stays 50 (the `banks` item
  simply changes status, it does not add/remove a menu row); route/page count stays 115. Re-pin
  all existing finance/`plannedN===9`/payHit/famPay/child-view/Spec 026-037 asserts byte-verbatim.
- a11y: critical=0 serious=0 on the Banks tab (already audited in Spec 030/032 — re-confirm after
  the nav-status change, since the sidebar link's disabled→enabled state changes its accessible
  role from `aria-disabled` button to a plain link).
- Screenshots: sidebar with `banks` now an active nav link (AR + EN) + the Banks tab itself
  (already captured in Spec 030/032) — 0 console errors.

## Acceptance checks
- [ ] `nav.config.js` `banks` item: `disabled` → `implemented`, `route:
      'finance.html#view=banks'`, no `reasonKey`.
- [ ] `finance.js` / `fixtures/finance.js` / `ar.fin.js` / `en.fin.js`: **0-diff** — the Banks tab
      body is untouched; this file changes ONLY the nav visibility/route.
- [ ] `PLANNED_FINANCE`'s `banks` card (backendRequired, real bank-integration capability) is
      KEPT unchanged — `plannedN===9` unaffected.
- [ ] 0 new HTML pages; 0 new fixture rows; 0 new `data-*` hooks; `enhance.js` 0-diff.
- [ ] 0 balance/credential/reconciliation-success token anywhere (unchanged, reconfirmed).
- [ ] Admin-menu 50 items; route/page count 115; smoke green.

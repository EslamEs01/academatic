# Contract: Recent Payments Section (Spec 009)

**Status**: Binding · The fixture-authored recent-payments list. References FR-009, FR-010; SC-002, SC-003, SC-007; data-model §2, §5.

## 1. Row anatomy (every payment row, baked)

Payment date label · family name → real `<a href="family.html">` · referenced invoice serial → `data-drawer="inv-<invoiceId>"` (opens that invoice's baked drawer — payments have no separate drawer) · **authored amount** + currency label (LTR span) · generic **method chip** (`fin.method.bankTransfer` / `fin.method.card` / `fin.method.cash` — labels, not a status map) · labeled **payment-status chip** (`paymentStatusChip()`: recorded / pending / returned).

## 2. Authored data constraints (guard-enforced — data-model §2)

- ~6 rows; every payment-status appears ≥ 1.
- Every payment references an existing **non-cancelled** invoice; its `familyId` equals the invoice's family (both throw at build otherwise).
- Amounts are authored literals — never an allocation, split, or remainder of an invoice amount; the section never shows "X of Y paid" math.

## 3. Shape & scope decisions (binding)

- The section is a short **"recent payments"** list — deliberately NOT a standalone filterable payments workspace: the verified legacy had no standalone payments page (payments were "New Transaction" records keyed against invoices), and the page's single `[data-filter-form]` is bound to the invoice list (research D6). Payment rows therefore carry no facet attributes and no filter bar.
- No gateway branding (Paymob/Payoneer/etc.), no gateway state, no transaction-ledger tabs, no FX columns — the legacy transactions ledger belongs to the backendRequired accounting card.
- No receipt/proof-of-payment anything (verified absent from the reference).

## 4. MUST NOT

No add-payment form (Record payment is a confirm→demo action on the invoice, not a real form flow); no mutation of any invoice chip after a payment action; no derived "outstanding balance" anywhere.

**Acceptance (binding):**
1. **Given** every payment row, **When** its invoice reference is followed, **Then** the referenced invoice's drawer opens and that invoice is non-cancelled.
2. **Given** the method chips, **When** read, **Then** only the three generic labels appear — zero gateway names, zero gateway states.
3. **Given** the section, **When** audited, **Then** all three payment statuses are represented, every amount is an authored literal, and no balance/allocation math is displayed.

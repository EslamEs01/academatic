# Contract: Family Billing & Subscriptions (Spec 014)

**Status**: Binding · The zero-pay hard line. References FR-008/FR-009, US5, SC-005; research D3; delivers F7 + F9 (status form); capture-verified: legacy billing was view-only with ZERO rendered amounts.

## 1. Plans & subscriptions section

- Per-child rows: child name + the family plan label (`data.fam.fam1.plan` — «الخطة المتقدمة», an amount-free label) + per-child `familyStatusChip` (active ×4, trial ×1).
- NO amount, NO price, NO renewal/upgrade control, NO `fam.plan.perHour` reference.

## 2. Billing status section

- ONE calm status card: authored settled state («جميع الفواتير مسوّاة» chip, tone-completed) + a reassurance line answering "are there billing issues?" — nothing more.
- The gate: `.pt-planned` mini-card **`billingGate`** classed **backendRequired** («الفواتير والدفع» — viewing real invoices and paying requires the billing backend).
- NO pay-now, NO invoice rows, NO due dates, NO serials, NO amounts — a status answer, not a ledger.

## 3. Fixture suppression rule

`FAMILIES.rows[fam1].hourRate` (80), `plan.hourRate`, `fam.plan.perHour` («ريال/ساعة»), and any currency-bearing key MUST NOT be referenced by the family page module. The smoke zero-pay regex (`ريال|ر\.س|SAR|USD|[$€£]|pay now|ادفع|سداد`) polices the built body in both languages.

## Acceptance (binding)

1. **Given** both built files, **Then** the zero-pay regex = 0 hits and no renewal/pay affordance exists.
2. **Given** the subscriptions section, **Then** 5 child rows render with plan labels + status chips and zero monetary content.
3. **Given** the billing section, **Then** exactly one status card + the backendRequired gate mini-card render.

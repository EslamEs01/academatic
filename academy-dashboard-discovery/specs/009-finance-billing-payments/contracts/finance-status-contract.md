# Contract: Finance Status Vocabularies (Spec 009)

**Status**: Binding · The two NEW labeled maps + the REUSED availability map. References FR-007, FR-010, FR-013; SC-002, SC-009; data-model §4–§6 + map reconciliation.

## 1. The id sets (binding — exact)

- **invoice-status** (`components/finance-status.js`): `paid`, `unpaid`, `overdue`, `cancelled` — nothing else. NO `partial`, NO `draft` (verified absent from the legacy reference — inventing them would violate "reference-backed vocabulary only").
- **payment-status** (`components/finance-status.js`): `recorded`, `pending`, `returned` — nothing else. NO `failed`, `refunded`, `authorized`, `captured`, `processing`, `wallet`, `credit` (gateway lifecycle = backendRequired concept).
- **finance availability**: REUSED — `import { REPORT_AVAILABILITY, availabilityChip } from './report-status.js'` (`available/demoOnly/planned/backendRequired`). MUST NOT be duplicated as a new map (FR-013; the repo's distinct-sets convention).

## 2. Map shape (house pattern — mirrors `outcome-status.js`/`group-status.js`)

Each entry `{ id, tone, icon, labelKey }`; exports `INVOICE_STATUS`, `INVOICE_STATUS_ORDER`, `invoiceStatusOf(id)` (safe default), `invoiceStatusChip(id)`; same quartet for `PAYMENT_STATUS`. Chips render via the shared `chip({ labelKey, tone, icon })` atom — **icon + text, never numeric, never color-only**.

## 3. Tones & icons (binding constraints)

`tone` values ONLY from the CSS-styled chip set: `live, upcoming, completed, cancelled, amber, neutral` (the Spec 008 post-review fix documents that `tone:'coral'` chips render unstyled — that bug class is forbidden here). Assignment: paid→`completed` · unpaid→`amber` · overdue→`cancelled` · cancelled→`neutral` · recorded→`completed` · pending→`upcoming` · returned→`amber`. Icons from the existing sprite only (candidates: `check-circle`, `check`, `clock`, `alert-triangle`, `x-circle`, `wallet`); final icon ids verified against `icons.json` at implementation — no new icon unless added through the existing sprite pipeline.

## 4. Semantics (display facts, not a lifecycle)

A statusId is an **authored fixture fact**. There is no transition table, no state machine, no rule that computes `overdue` from a due date, and no action that moves an invoice/payment between statuses (a confirmed Mark-as-paid toasts and changes nothing). Legacy grounding: Paid/UnPaid (invoice lists) + Due/Overdue (invoice analysis) + soft-delete → modernized as `paid/unpaid/overdue/cancelled`; payments were keyed-in transactions with no own vocabulary → `recorded/pending/returned` (grounded in the transaction model + the payout terms Pending/Returned, without importing the 8-status payout lifecycle).

## 5. Distinctness & reconciliation (no shadowing)

Both new sets are distinct as sets from all ten existing maps. Rendering matrix is binding (data-model): invoice-status only on invoice tiles/rows/drawer; payment-status only on payment rows; method labels only on payment rows; availability only on section headers + planned cards. No existing map is re-labeled, re-toned, or shadowed; `statusChip`/`outcomeChip`/`groupStatusChip` are untouched.

## 6. i18n

Label keys `fin.status.*` (4) + `fin.pay.*` (3) + `fin.method.*` (3) live in `ar.fin.js`/`en.fin.js`, key-mirrored; Arabic labels are calm product wording (e.g. مدفوعة / غير مدفوعة / متأخرة / ملغاة) — never legacy raw codes (`messages.3`-style leaks are a documented legacy bug, forbidden).

**Acceptance (binding):**
1. **Given** `finance-status.js`, **When** inspected, **Then** exactly 4 + 3 ids exist with the exact sets above, and availability is imported — not redefined.
2. **Given** every finance chip, **When** rendered in light/dark/AR/EN, **Then** it shows icon + translated text with a styled tone (no unstyled chip, no color-only signal).
3. **Given** the whole feature, **When** grepped, **Then** zero occurrences of `partial|draft|refunded|authorized|captured|processing` as status ids in the finance files.
4. **Given** any action on any row, **When** confirmed, **Then** no chip's statusId changes anywhere (no lifecycle exists).

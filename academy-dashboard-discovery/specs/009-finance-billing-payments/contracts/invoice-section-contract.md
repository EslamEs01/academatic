# Contract: Family Invoices Section (Spec 009)

**Status**: Binding · The fixture-authored family-invoices list + baked invoice drawer. References FR-006, FR-007, FR-008; SC-001, SC-002, SC-007; data-model §1, §4, §10.

## 1. Row anatomy (every invoice row, baked)

Serial (LTR span) · family name → real `<a href="family.html">` (EN: `.en.html`) · billing month label · due-date hint · **authored amount** + currency label (`unit.sar`), digits LTR inside RTL · course/group context link when authored · labeled **invoice-status chip** (icon + text via `invoiceStatusChip()`) · row actions (View → `data-drawer="inv-<id>"` · Record payment per `finance-actions-contract.md`). Rows carry the existing facet attributes (`data-row` + `data-status` + `data-family` + search haystack) for filtering — no new hook.

## 2. Authored data constraints (guard-enforced at build — data-model §1)

- Every status (`paid/unpaid/overdue/cancelled`) appears ≥ 1 across ~9 rows.
- `fam5` has ≥ 1 `overdue` invoice — the shell must agree with its existing Spec 004 `fam.attn.payment` flag.
- `fam3` and `fam8` have **0** invoices (zero-rate/trial/inactive families owe nothing).
- The single `cancelled` invoice belongs to `fam7` (stopped family) and has **no** payment rows.
- Amounts are authored literals in one currency; plausible next to the family `hourRate` stubs but **never derived** from them (and fixture comments must not claim derivation).
- Every referenced family/student/course/group id exists in its fixture.

## 3. Legacy grounding (product reference only)

Mirrors the verified legacy shapes without copying them: the admin All-Invoices list (`#, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total (AED), Status, Actions`) and the family billing table (`#, Serial No, Month-Year, Due Date, Course, Amount, Status`) — reduced to a calm row (the legacy 10-column table + 3–6 inline action pills per row is the documented anti-pattern). Dual-currency (`Total (AED)`) is deliberately absent — multi-currency/FX is a backendRequired card.

## 4. Invoice drawer (baked, one per row)

`previewTemplate('inv-<id>', …)` with `sheetRow` lines: serial · family (link) · students (links, when authored) · course/group (links) · billing month · issued/due hints · amount lines labeled **display-only** — **NO computed total line, NO subtotal arithmetic** · status chip · note. Drawer actions per `finance-actions-contract.md` (Mark as paid confirm→demo · Send reminder confirm→demo · Send invoice disabled · Print demo). Drawer close restores focus (existing sheet mechanics).

## 5. MUST NOT

- No `partial`/`draft` status, no per-line-item math, no instalment/adjustment engine (legacy `adjustment_type/value/count` is part of the backendRequired invoices-engine card).
- No overdue computation from a date — `overdue` is an authored statusId.
- No status mutation from any action; no dead link; no receipt affordance.

**Acceptance (binding):**
1. **Given** the invoice list, **When** each row is inspected, **Then** family/context links resolve to implemented pages and the status chip is labeled icon+text (never color-only).
2. **Given** `fam5`, **When** its rows are filtered, **Then** ≥ 1 overdue invoice appears; **Given** `fam3`/`fam8`, **Then** zero rows + the calm empty state.
3. **Given** any drawer, **When** opened with JS, **Then** all content was already baked in the HTML source and no total line exists.
4. **Given** the fixture guard, **When** any §2 constraint is violated, **Then** `npm run build` throws (a broken fixture cannot ship).

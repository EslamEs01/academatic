# Contract: Planned / Backend-Required Finance Surfaces (Spec 009)

**Status**: Binding · The nine figure-free planned cards. References FR-011, FR-012, FR-013; SC-004; data-model §8; research D8.

## 1. The card set (binding — exactly nine)

| id | availability | legacy grounding (reference only) |
|---|---|---|
| `monthlyInvoices` | **planned** | `/management/monthly-invoices` (3-column stub) |
| `invoicesEngine` | backendRequired | Create-Parent-Invoice (line items · discount/fees/additional · adjustment type/value/count instalments) |
| `paymentsCollection` | backendRequired | "New Transaction" recording + gateway config (`/management/settings/payments`) |
| `teacherSalaries` | backendRequired | `/management/salaries` (attendance-driven, Generate Salary) |
| `staffSalaries` | backendRequired | `/management/staff-salaries` |
| `classSalaryReport` | backendRequired | `/management/salary-class-report` (+ the teacher-side 23-column drill-down) |
| `payoutsCompensations` | backendRequired | `/management/payouts` (8 statuses) + teacher Compensations (Fine/Bonus) |
| `accountingExpenses` | backendRequired | `/management/accounting` (10 money KPIs + 16-currency FX) · expenses + heads · P&L/invoice analyses |
| `banks` | backendRequired | `/management/banks` (near-empty stub) |

1:1 story with the six locked nav items (invoices→`invoicesEngine`, monthlyInvoices, salaries, staffSalaries, payments→`paymentsCollection`, classSalaryReport) plus accounting/expenses + banks — the sidebar locks and the shell cards must always tell the same story.

## 2. Rendering (reuse, not rebuild)

Each card = the existing `reportCard(r)` **route-less disabled-with-reason variant** + `availabilityChip(r.availability)` (imported from Spec 008 `report-status.js`) + icon + title + one-line description (`fin.planned.*`). The card exposes its reason **inline** (`.report-reason` text) and as a `title` tooltip on the `aria-disabled` block — the accepted Spec 008 disabled-card modality, reused unchanged (`reports.html` behaves identically; no click-toast is added, since that would require modifying the shared Spec 008 component). Never an `<a>`; never `data-coming-soon` (these are backend-gated, not merely scheduled).

## 3. MUST NOT (binding boundary — the Spec 007 invariant carried forward)

- **Zero figures** on any card: no salary number, payout count, expense total, FX rate, balance, or even a fixture count — cards are purely descriptive.
- No teacher/staff pay data anywhere: no fixture field is added to `teachers.js` or any staff-shaped data; no compensation amount, no payout lifecycle UI, no salary row — the words salaries/payouts appear ONLY as planned-card labels/descriptions.
- No working sub-features: no FX table, no expense form, no head list, no analysis chart, no bank row.
- No card links to a locked nav item, a nonexistent page, or a portal.

## 4. Honest copy

Descriptions state plainly that the capability ships with the real billing backend (e.g. «تُفعَّل مع نظام الفوترة الفعلي»); no "coming soon" hype, no implied schedule, no fake progress.

**Acceptance (binding):**
1. **Given** the planned section, **When** counted, **Then** exactly 9 cards render, each with an availability chip (1 planned + 8 backendRequired) and zero numeric content.
2. **Given** any card, **When** inspected or focused, **Then** its reason is visible inline and as a tooltip (`aria-disabled` + `title` + `.report-reason` — the reused Spec 008 modality); no navigation occurs, no demo implies function.
3. **Given** the six locked sidebar items, **When** compared with the cards, **Then** every locked concept has exactly one corresponding card (sidebar↔shell story match).
4. **Given** `git diff`, **When** reviewed, **Then** `fixtures/teachers.js` (and every academic fixture) gained zero finance fields.

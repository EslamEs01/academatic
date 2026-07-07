# Contract: Pay-free / Zero-pay Safety

**Purpose**: guarantee no Spec 024 change breaches the teacher pay-free GLOBAL law or the family zero-pay law. These are hard, non-negotiable.

## Teacher pay-free GLOBAL (three layers, re-run after every change)

1. **Source grep** (incl. comments) over the teacher family:
   `salary|salaries|payout|earnings?|compensation|راتب|رواتب|أجر|مستحقات|غرامة|مكافأة|أتعاب|فلوس|دولار|ريال|جنيه|[$€£]|EGP|SAR|USD` → **0 hits** in `teacher-portal.js`, `teacher-portal.html`(+`.en`), teacher locale keys.
2. **Built grep** over all teacher pages → 0 hits.
3. **Smoke `payHit`** over the rendered `teacher-portal` `#page-body` (both langs) → false; BYTE-VERBATIM (unchanged by 024).

B-07 documents the pre-existing admin-board exemption; it does NOT add any teacher pay token.

## Family zero-pay (re-run after B-11 family copy)

- `famPay` / `payFigure` regex over all 18 family bodies → green.
- No family payment/amount token; family-billing stays status-first (hour-quota ٤٠/١٢/٢٨).

## Admin finance boundary (B-09)

- Authored admin invoice-amount literals on admin finance pages are Spec-009-sanctioned (zero aggregate, zero math, admin-only).
- Salary/payroll/compensation/payout **figures** are NEVER allowed anywhere.
- Family/teacher stay figure-free.

## Acceptance

- All three teacher layers green; family scan green; admin invoice literals unchanged; no pay figure on any family/teacher surface.

**Stop condition**: any teacher/family pay token appearing → STOP and report.

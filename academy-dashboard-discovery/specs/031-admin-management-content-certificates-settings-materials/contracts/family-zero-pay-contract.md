# Contract: Family Zero-Pay

**Purpose**: 031 must not weaken the family zero-pay law.

**MUST**:
- All family-portal HTML stay **byte-identical** (031 touches admin surfaces only).
- No family payment page; no payment amount leakage into any family surface.
- The family cert-notification toggles are family-settings (not duplicated in 031's certificates).
- Smoke `famPay` (`run.cjs:1299`) and `payFigure` (`:1365`,`:1389`) stay **byte-verbatim**.

**Verify**: git — family pages byte-identical; smoke diff shows `famPay`/`payFigure` unchanged.

**Status**: Binding.

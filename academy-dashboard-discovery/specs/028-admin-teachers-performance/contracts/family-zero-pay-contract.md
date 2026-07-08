# Contract — Family Zero-Pay (Spec 028)
**MUST**: 028 does not touch family surfaces; the family portal stays figure-free and the family zero-pay smoke asserts (`famPay`/`payFigure`) stay byte-verbatim green.
**Acceptance**
- Family pages (`family*.html`) byte-identical (028 doesn't touch them).
- `famPay`/`payFigure` byte-verbatim green; no family payment figure anywhere.
- **STOP** on any family pay figure or a family page byte-diff.

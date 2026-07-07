# Contract — Family Zero-Pay (unchanged)

**MUST**: family pages carry zero currency/pay figures (`مبلغ سعر رسوم ادفع سداد amount price pay-now $ € £ SAR USD EGP`). No family payment page, no payment-amount leakage, no fake request/payment/upload.

**Acceptance**
- Smoke `famPay`/`payFigure` byte-verbatim green on all family bodies incl. `family-billing` (status-only).
- Spec 026 does not touch family portal pages → family built output byte-identical.
- **Fail/STOP** on any family pay figure.

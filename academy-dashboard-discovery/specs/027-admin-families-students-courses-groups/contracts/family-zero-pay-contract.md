# Contract — Family Zero-Pay

**MUST**: the family **PORTAL** surface stays figure-free (`family-portal.*`/`family-billing.*`: no `مبلغ/سعر/رسوم/ادفع/amount/price/pay-now/$ € £`). No family payment page. Billing persistence → 030.

**Note (admin plan literal)**: `family.html`/`add-family.html` (ADMIN pages) may carry the Spec-004/009-sanctioned **single-value** plan hour-rate literal («سعر الساعة ٨٠ ريال/ساعة· عرض فقط») — zero aggregate/math, admin-only. This is distinct from the portal zero-pay line and MUST stay single-value/no-math; **no salary/payroll/payout figure anywhere**.

**Acceptance**
- Smoke `famPay`/`payFigure` byte-verbatim green on family-portal/family-billing.
- No new pay figure on any family surface; the admin plan literal unchanged (no math added).
- **STOP** on any family-portal pay figure or any salary/payroll figure.

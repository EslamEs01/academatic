# Contract — Invoice Surface (F-A/F-B)

**Guarantee**: display-only invoice + monthly-invoice surfaces; honest write gates; amount literals only.
- Invoice rows display-only; read-only detail drawer; status/date/family filters real static.
- Create/Edit invoice = backendRequired modal; Mark-paid/Record-payment/Send-invoice/Download-PDF/Export = gates.
- Monthly invoices = status-first Parent/Status (no aggregate) or planned card.
- Amount = single authored SAR literal; NO balance/tax/discount/total computation; NO status mutation.
**Verify (smoke)**: rows authored; drawer read-only; filters facet; gates honest; no aggregate; no status flip.
**Fail if**: a computed total/balance appears; a status flips on confirm; a fake PDF/payment occurs.

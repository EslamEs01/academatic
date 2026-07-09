# Contract — Smoke Rescope

**Guarantee**: smoke changes are ADDITIVE; protected asserts byte-verbatim.
**Add a Spec-029 block asserting**:
- public HTML count == 97.
- reports.html AR/EN loads with the Feedback + Forms sections; feedback rows authored; filter facets.
- every feedback/form action opens page/modal/drawer/gate; open a feedback detail drawer → read-only.
- no fake export/download/pdf/csv/excel/print; no fake feedback submit; no fake report generation.
- no `<canvas>`/chart; no computed %/score/rank on 029 bodies.
- body-scoped pay grep over new/changed 029 bodies (excl. sidebar nav) == 0 (token union incl. AED/EUR).
- admin-menu coverage: nav-id set == classified-id set; build guard intact.
- `href="#"`==0; no raw keys; no dead buttons; filters/tabs work.
- R-E add-feedback = modal; R-F approve = confirm; R-G print = disabled-with-reason.
**Byte-verbatim (unchanged)**: payHit, tchPay, famPay, payFigure, child-view, admin-finance, and all 026/027/028 action asserts.
**Sanctioned re-pins ONLY**: the attendance/sessions add-feedback assertion (demo→modal) and the student eval-approve assertion (demo→confirm).
**Fail if**: any protected regex is weakened; a hardcoded pass is added; a deletion (not addition) is made.

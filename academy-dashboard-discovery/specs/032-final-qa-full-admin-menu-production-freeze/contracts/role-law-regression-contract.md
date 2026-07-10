# Contract: Role-Law Regression

**Purpose**: The forms fix regresses no standing role-law.

**MUST stay GREEN (enforcing file:line in `role-law-regression-register.md`)**:
1. Teacher pay-free — 16 portal surfaces (`payHit` :1483-1485, `tchPay` :1403-1404) + admin boards (`PAY28` :665, `forbidden` :751-760).
2. Family zero-pay — home/child (`payFigure` :1438/:1462) + 7 internal (`famPay` :1372).
3. Student child-view (:1361-1362).
4. Finance no-fake-money (`forbidden` :944, no-mutation :990-1005, figure-free :1037).
5. Settings/staff/library/certificates no-fake (block :1064-1129).
6. Admin finance Spec-009 invariant (dashboard/reports :1137-1167).
7. Zero `href="#"` (:96-98/:131).

**MUST**: the new teacher/staff forms render **no pay/salary field**; no form renders `type=password`/`type=file`/credential/`<canvas>`/`.pdf`; student surfaces gain no primary-role wording; the protected regexes stay **byte-verbatim** (any smoke change additive); teacher-portal ×16 + family + student bodies byte-identical.

**Verify**: `git diff tests/smoke/run.cjs` shows the protected regexes unchanged; smoke role-law block green; the touched teacher/staff form bodies pass the pay/secret/figure greps.

**Status**: Binding (all 9 green today).

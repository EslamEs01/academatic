# Contract — Role-Law Carryover (Spec 039)

Nav-only change ⇒ all role laws hold by construction. This contract restates them as binding.

## Content/certificate role rights
| Role | Rights | Spec 039 effect |
|---|---|---|
| Admin | reach + manage Materials · Content Library · Certificate Templates · Certificate Requests | surfaces made reachable (deep-link); management writes stay gated |
| Teacher | read-only library; request certificate (portal, out of scope); NO admin mgmt; NO approval | untouched (byte-identical) |
| Family/Student | read-only permitted library; NO admin mgmt; NO approval | untouched (byte-identical) |

## Carried-forward global laws (byte-verbatim smoke asserts preserved)
- **Teacher pay-free GLOBAL** — no touch.
- **Family zero-pay** — no touch.
- **Student child-view** — no touch.
- **Finance no-fake-money** + **classSalaryReport honest lock** — no touch.
- Every prior protected role assertion (payHit/tchPay/famPay/payFigure/child-view/finance) stays byte-verbatim.

## MUST NOT
- No teacher/family portal file change; no admin action exposed in any teacher/family page; no permission widened
  based on legacy UI visibility.

## Acceptance
All 16 portal page bodies byte-identical; role-law smoke asserts pass byte-verbatim; no admin control appears in
teacher/family surfaces.

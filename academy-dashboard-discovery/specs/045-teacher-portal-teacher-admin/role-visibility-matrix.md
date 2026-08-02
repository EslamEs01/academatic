# Role and Visibility Matrix

| Data/control | Teacher portal | Teacher self-profile | Admin directory | Admin detail | Admin performance |
|---|---|---|---|---|---|
| Teacher own name/subjects/status | allow | allow | allow authored record | allow | allow |
| Teacher own email | no need | allow | deny listing | only existing accepted admin form boundary | deny |
| Safe student learning identity | teacher-scoped only | deny | aggregate/count only | teacher-scoped tab only | aggregate/count only |
| Guardian/student private contact/locality | deny | deny | deny | deny | deny |
| Admin management controls | deny | deny | allow existing honest controls | allow existing honest controls | display filters only |
| Teacher performance board | deny | deny | admin navigation only | admin deep context only | allow admin only |
| Salary/payroll/compensation | deny | deny | deny | deny | deny |
| Rank/score/leaderboard/percentile | deny | deny | deny | deny | deny |
| Authored workload category | portal context if evidenced | allow own context | allow | allow | allow |
| Fake impersonation/login-as | deny | deny | deny | frozen truthful unavailable control only; no state change | deny |
| Backend mutation/success | deny | deny | deny | deny | deny |

Rendered HTML/DOM and payload/fixtures must satisfy the same boundary; hiding a forbidden value is not compliance.

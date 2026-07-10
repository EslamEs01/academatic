# Contract: MUST-OMIT Fields

**Purpose**: Forbidden fields are never rendered on any rebuilt form.

**MUST NOT render** (0 occurrences on any form body):
- `type="password"` / any password field (family, teacher, staff).
- salary / `fixed_salary` / `salary_type` / `hour_rate` / `fine_per_hour` / `teacher_hour_rate` / `t_hour_rate` / `salary_period_*` / fine config (staff, teacher, course, group, settings).
- currency paired with salary; notification `salaries` toggle.
- `zoom_password` / `zoom_client_secret` / zoom credentials; payout / paymob / payoneer credentials; gateway `key1`/`key2` / client-secret / payment-details credentials; SMTP username/password/host.
- 2FA `otp`.
- computed `Total` (`basic+additional+taxes`) — no money arithmetic.

**Verify**: smoke greps every form body — 0 `type="password"`, 0 salary/pay/hour-rate/fine/amount/currency-with-salary token, 0 credential-named input (`name`/`id` ~ pass|secret|api|key|token|webhook|otp), 0 computed-total; role-law figure-free asserts byte-verbatim.

**Status**: Binding. `future-backend-or-excluded-form-register.md`.

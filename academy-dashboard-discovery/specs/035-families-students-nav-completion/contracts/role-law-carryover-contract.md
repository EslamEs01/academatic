# Contract — Role-Law & No-Fake Carryover

All standing laws (Specs 016–034) remain BINDING; their protected smoke assertions stay **byte-verbatim**. (See `../role-law-and-no-fake-carryover.md`.)

## Role laws (green)
- **Teacher pay-free (GLOBAL):** schedule-search shows teachers by name/subject only — no rate/salary/pay token; `teacher-*` files byte-identical.
- **Family zero-pay:** no currency figure anywhere; family portal untouched.
- **Student child-view:** the student PORTAL (`student-portal.html`) untouched; deep-links go to the ADMIN `student.html` profile tabs (a page, not the portal); no «لوحة الطالب/بوابة الطالب/student dashboard» token introduced.
- **Admin finance Spec-009 invariant:** no finance body touched; schedule-search carries no invoice/amount/salary/payout figure.

## No-fake laws (green)
- No fake send/save/publish/convert/book/assign; honest gate wording.
- No backend/API/websocket/auth/db; no external dependency (`package.json` 0-diff).
- No new `data-*` hook / storage key / engine.
- No `href="#"`, dead button, raw key, `type=file`/`type=password`/credential, `<canvas>`/`.pdf`/`window.open`/`blob:`.
- No computed score/rank/chart.

## Protected assertions (byte-verbatim)
- `payHit`, both `payFigure`/`famPay` regex lines, child-view body guard, admin-finance invariant.
- Spec-026 action-completion, Spec-032 form-completion, and 026–034 per-page asserts.
- Spec-035 additions are a separate additive block; they never edit a protected regex.

## Acceptance
- Full suite green with the four laws intact and every protected assert unchanged; the only sanctioned amendment is the route-freeze 113→115 (+ smoke PAGES entry) and, if needed, repointing a families-panel planned-item probe.

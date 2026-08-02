# Role-Visibility Matrix — Spec 043

**8 roles × 15 data classes.** Every cell is exactly one of: **ALLOW** (the role receives the full value) ·
**MASKED** (the role receives a partial/obfuscated identifier only, never the full value) · **DENY** (the value
is absent from the DOM/fixtures for this role — not CSS-hidden) · **CONDITIONAL_BACKEND** (allowed only under a
NAMED permission with a NAMED default, enforced by the backend; the frontend shows the honest gate) ·
**STRUCTURE_ONLY** (a documentation row with no value slot) · **UNKNOWN_EVIDENCE** (the corpus cannot decide;
never invented). No cell says "based on permissions" without naming the permission and its default.

**Frontend reality**: because there is no auth, the matrix is a *policy*. What the frontend enforces NOW is that
no page bakes a value a role should not receive (DENY = data absence). `CONDITIONAL_BACKEND` cells are honest
gates until the real backend exists. Data classes are defined in `sensitive-data-classification.md`.

## Roles

- **PA** platform admin (super-tenant operator)
- **AA** academy admin (tenant owner)
- **ST** staff / operator (back-office)
- **RA** reception / advisor (front-desk, lead-facing)
- **TE** teacher
- **GF** guardian / family (the `/student/*` login)
- **CV** student child-view («عرض الابن», inside the family journey — NOT a login)
- **PU** public / unauthenticated

## The matrix

| # | Data class | PA | AA | ST | RA | TE | GF | CV | PU |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Student name & learning identity | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW¹ | ALLOW² | ALLOW³ | DENY |
| 2 | Guardian name | ALLOW | ALLOW | ALLOW | ALLOW | DENY⁴ | ALLOW² | ALLOW³ | DENY |
| 3 | Guardian phone | ALLOW | CONDITIONAL_BACKEND⁵ | CONDITIONAL_BACKEND⁵ | CONDITIONAL_BACKEND⁶ | **DENY** | ALLOW² | DENY | DENY |
| 4 | Guardian e-mail | ALLOW | CONDITIONAL_BACKEND⁵ | CONDITIONAL_BACKEND⁵ | CONDITIONAL_BACKEND⁶ | **DENY** | ALLOW² | DENY | DENY |
| 5 | Student phone / e-mail | ALLOW | CONDITIONAL_BACKEND⁵ | CONDITIONAL_BACKEND⁵ | CONDITIONAL_BACKEND⁶ | **DENY** | ALLOW² | DENY⁷ | DENY |
| 6 | Address / country / locality | ALLOW | ALLOW | ALLOW | MASKED⁸ | **DENY** | ALLOW² | DENY | DENY |
| 7 | Teacher private contact | ALLOW | ALLOW | ALLOW | DENY | ALLOW⁹ | DENY | DENY | DENY |
| 8 | Staff private contact | ALLOW | ALLOW | ALLOW | DENY | DENY | DENY | DENY | DENY |
| 9 | Lead / prospect contact | ALLOW | ALLOW | CONDITIONAL_BACKEND⁵ | CONDITIONAL_BACKEND⁶ | **DENY** | DENY | DENY | DENY |
| 10 | Attendance / presence timestamps | ALLOW | ALLOW | ALLOW | DENY | MASKED¹⁰ | MASKED¹¹ | MASKED¹¹ | DENY |
| 11 | Audit actor identity | ALLOW | ALLOW | CONDITIONAL_BACKEND¹² | DENY | DENY | DENY | DENY | DENY |
| 12 | Meeting / room links | ALLOW¹³ | ALLOW¹³ | CONDITIONAL_BACKEND¹³ | DENY | CONDITIONAL_BACKEND¹³ | CONDITIONAL_BACKEND¹⁴ | CONDITIONAL_BACKEND¹⁴ | DENY |
| 13 | Certificate records | ALLOW | ALLOW | ALLOW | DENY | ALLOW¹⁵ | ALLOW¹⁶ | ALLOW³ | DENY |
| 14 | Financial / pay data | ALLOW¹⁷ | ALLOW¹⁷ | CONDITIONAL_BACKEND¹⁷ | DENY | **DENY**¹⁸ | DENY¹⁹ | DENY | DENY |
| 15 | Integration credentials / secrets | STRUCTURE_ONLY²⁰ | STRUCTURE_ONLY²⁰ | STRUCTURE_ONLY²⁰ | DENY | DENY | DENY | DENY | DENY |

## Cell notes (every non-trivial cell named)

1. **TE · learning identity = ALLOW** — but strictly the minimum to teach an *assigned* student: name + subject
   + level + course. No contact, no locality, no attribution (see the DENY cells in this column's neighbours).
2. **GF · own family = ALLOW** — a guardian sees their OWN children's identity/contact/locality/pay-free billing,
   never another family's (cross-family = DENY; enforced today as fam1-only fixtures, `direct-fetch-and-role-
   boundary-contract.md`). Guardian phone/e-mail here means the guardian's own, which they already possess.
3. **CV · own learning/certificate = ALLOW** — the child sees only their own learning/session/certificate data;
   no guardian contact, no cross-child data, no account controls (`child-view-account-boundary.md`).
4. **TE · guardian name = DENY** — a teacher teaches a *student*, not a guardian; the guardian's name is a
   poaching identifier and is absent from every teacher surface.
5. **AA/ST · guardian & student contact, lead contact = CONDITIONAL_BACKEND** — allowed only under the named
   permission `view guardian phone` / `view guardian e-mail` (default **DENY**), enforced by the backend
   (`parent-contact-default-deny-contract.md`). The frontend RBAC preview shows these rows deny-by-default; it
   claims no enforcement.
6. **RA · guardian/student/lead contact = CONDITIONAL_BACKEND** (safe default, OQ-3) — reception/advisor may see
   a **purpose-scoped MASKED** contact for approved communication only, under the named permission `use guardian
   contact for approved communication` (default DENY); the FULL value requires `reveal full value from a masked
   admin view` (default DENY). Teacher = DENY regardless.
7. **CV · student phone/e-mail = DENY** — the child-view carries no contact affordance (it is not an account).
8. **RA · locality = MASKED** — country only, never full address, and only where operationally needed; default
   the column is absent unless a proven advisor workflow requires country (safe default: MASKED country).
9. **TE · teacher private contact = ALLOW** — a teacher sees their OWN contact on their own profile only
   (`teacher-profile.js:53`, own synthetic `sara@academy.example`); never another teacher's.
10. **TE · presence = MASKED** — a teacher sees the session status of their OWN assigned classes (attended /
    absent / running) but not raw enter-timestamps of a minor; the raw log is admin-only (P-22, U-03).
11. **GF/CV · presence = MASKED** — the guardian/child see session status (their own), never actor timestamps of
    others; 055 propagates the status, 043 scopes it (P-22).
12. **ST · audit actor = CONDITIONAL_BACKEND** — under the named permission **`view audit actor identity`
    (default DENY)**, enforced by the backend; a real actor-attributed audit trail is a 055 concern. Today the
    log renders entity/action/date with **no actor field** (`staff-management.js:54-59`), and a real actor
    identity is never authored into a fixture (RJ-13).
13. **Room links (management/teacher copy) = CONDITIONAL_BACKEND** — under the named permission **`copy room
    link` (default DENY)**, granted to admin/assigned-teacher only and enforced server-side (the room URL is
    guessable, so authorization must be server-side, P-22). Today the Join control is an honest gate
    (`appointment-details.js:47`). 054 owns the lifecycle. Safe default OQ-5.
14. **GF/CV · room link = CONDITIONAL_BACKEND** — under the named permission **`join own scheduled room`
    (default DENY until a real propagated room exists, 054)**: a guardian/child receive only their OWN scoped
    **join action**, never a raw management/copy link. Today: gate only.
15. **TE · certificate = ALLOW** — a teacher may *request* a certificate for an assigned student (producer, 055)
    and see its status; never a group-delivery channel, never a named child in a shared group (N-2).
16. **GF · certificate = ALLOW (private per-guardian only)** — a guardian receives their own child's certificate
    privately, opt-in; never a shared group; no PII in a URL (`certificate-delivery-privacy.md`).
17. **Financial/pay = ALLOW/CONDITIONAL_BACKEND for admin/staff** — governed by the standing finance laws
    (authored literals only; figure-free salaries; sole `classSalaryReport` lock). Staff pay-visibility is
    permission-gated under the legacy **`Show Salaries Page` / `Show Teacher Rate` / `Show Student Rate`
    (each default DENY)**, owner 044/payroll backend. Not a 043 re-decision.
18. **TE · financial = DENY (absolute)** — teacher pay-free GLOBAL; no salary/rate/payout/fine figure, and the
    `salary_*` notification-matrix row is never surfaced to a teacher (`anti-poaching-contract.md`, PAY28).
19. **GF · financial = DENY (figure)** — family zero-pay; STATUS-FIRST billing, amount-free (Spec 020 law; the
    `famPay`/`payFigure` guards). "DENY" here = no pay FIGURE; status rows are allowed.
20. **Credentials/secrets = STRUCTURE_ONLY for admin/staff, DENY for everyone else** — provider fields render as
    documentation rows with no value slot (`settings.js:78-86`, 24 rows); 0 `type=password`, 0 saved-key
    columns, 0 raw PAN, no shared OTP; persistence is server-side (053, RJ-26/RJ-30).

## Ambiguity check (SC-001)

**0 ambiguous cells.** Every cell is one of the six dispositions; every `CONDITIONAL_BACKEND` cell names a
permission and its default — notes **5** (`view guardian phone`/`view guardian e-mail`), **6** (`use guardian
contact for approved communication` + `reveal full value from a masked admin view`), **12** (`view audit actor
identity`), **13** (`copy room link`), **14** (`join own scheduled room`), **17** (`Show Salaries Page` /
`Show Teacher Rate` / `Show Student Rate`) — all default **DENY**. No cell reads "based on permissions" without a
named permission + default. The teacher (TE) column is DENY for classes 3, 4, 5, 6, 9, 14 (contact, locality,
lead, pay) — the anti-poaching guarantee, absolute.

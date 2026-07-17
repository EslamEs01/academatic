# Contract 8 — No-Fake Authorization / Backend Honesty — executable

The frontend/backend boundary the implementation must hold. Frontend NOW = fixture/DOM absence, deny-by-default
structure-only registries, the teacher policy preview, the child-view correction, honest gates + wording,
executable tests + mutations. **FUTURE_BACKEND (honestly gated, never faked, never claimed to exist)**: real
authentication · sessions/cookies · direct-route denial · RBAC enforcement · per-member persistence ·
field-level authorization · secret storage · password change/reset · impersonation · bot protection/reCAPTCHA ·
notification/integration delivery · tenant/family row-level isolation · real WhatsApp/Zoom/payment behaviour.

## Binding rules

- **Never claim hiding a link is authorization.** The frontend guarantee is data-absence, not link-hiding.
- Every write/enforcement-implying control is an honest `backendRequired` gate («يُتاح بعد ربط الخادم» /
  "available once the server is connected"). Never «تم…»/"saved"/"authorized"/"verified"/"signed in".
- The staff RBAC preview + the teacher policy preview are **display-only promises the backend must keep** —
  stated plainly, never a working engine.
- 0 fake save/success/connected/authorized copy; 0 localStorage/sessionStorage key; 0 API/backend; 0 dependency;
  0 `<canvas>`/PDF/`window.open`/blob URL/download/external invite link.

## Guard

**G14** (Contract 5) — a wording census banning `authorized│verified│محمي│مسجّل الدخول` claiming a real enforced
session, scoped to **gate/authz context only** (gate copy + success-toast copy), with MUT-10. False-positive
exclusions: the `backendRequired` honest vocabulary; "Login" as an activity category; and the staff-activity-log
VALUE `login:'signed in'` (`en.adm.js`, a past-tense audit entry, not an authz claim). G14 is **not** a naive
sitewide `signed in`/`logged in` body ban (that would RED the baseline staff activity log).

## Verification

grep the built pages for the forbidden wording = 0; every gate resolves to the honest backendRequired copy; no
frontend behaviour asserts a real authenticated session exists (confirmed today: 0 hits for
`مصرّح│authorized│logged in│مسجّل الدخول`, `research.md`).

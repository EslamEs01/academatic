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
  "available once the server is connected"). **FORBIDDEN**: any gate/`data-disabled-reason` copy,
  success/toast copy, current-state chip, authz/enforcement note, or interactive control that claims the user is
  «تم…»/"saved"/"authorized"/"verified"/"protected"/"signed in"/«مسجّل الدخول» — i.e. any claim that a real
  operation, session, or enforcement happened. **ALLOWED (narrow baseline exception)**: the existing authored
  **past-tense** staff activity-log EVENT value `login: 'signed in'` (`en.adm.js`), shown ONLY inside the
  historical activity-log value/context — it is not a current-session chip, gate, status, success message, or
  authorization claim. G14 (below) is selector/context-scoped precisely so this audit event stays green while a
  fake current-auth claim goes RED.
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

G14 is **selector/context-scoped** (gate/`data-disabled-reason` copy + success-toast copy + current-state chips
+ authz/enforcement notes), NOT a naive sitewide body grep. In that scoped context, forbidden-claim wording = 0;
every gate resolves to the honest backendRequired copy; no frontend behaviour asserts a real authenticated
session exists (confirmed: 0 hits for `مصرّح│authorized│logged in│مسجّل الدخول` in `src/locales/*.js`,
`research.md`). **The verification does NOT assert a literal sitewide `"signed in" = 0`** — the documented
past-tense staff activity-log value `login:'signed in'` (`en.adm.js`, rendered in `staff.html`) legitimately
exists and MUST stay green; it is not an authz claim. MUT-10 mutates an honest gate/authz copy into a real-state
claim ("authorized"/«مسجّل الدخول») → G14 RED, while the activity-log value stays GREEN (the two are
selector-distinguished).

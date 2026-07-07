# Contract: B-06 — Chat ownership/gate (Should fix)

**Problem**: teacher chat appears in legacy but is backend-heavy; the only sequenced owner is the admin-side preview (026); the teacher-side send-form was never captured (M-02, UNCONFIRMED).

## Decision

- Classify teacher chat as **backendRequired / future**.
- **Do NOT add a teacher chat nav item in 024** (no retained teacher-side fixture; the send-form contract is unconfirmed — a gate would assert an unevidenced surface shape).
- Record the teacher-side decision: owner deferred to **Spec 025** scoping (025 may add an honest «قريبًا» chat item if the teacher IA warrants it, else it stays an admin-026 preview). Admin preview stays 026.

## Allowed edits (records only)

- Append-only note to `specs/023-…/missing-capabilities-register.md` (M-02 status) + this spec's `correction-scope.md`.

## Forbidden

- Any fake chat send / thread / message.
- Inventing send-form fields (send-form UNCONFIRMED).
- Adding a teacher chat nav item in 024.

## Acceptance

- Chat is classified backendRequired/future with a written owner decision.
- No fake chat anywhere; no invented fields.

**Owner**: 024-correction (Should fix) → teacher-side decision to 025; admin preview 026.

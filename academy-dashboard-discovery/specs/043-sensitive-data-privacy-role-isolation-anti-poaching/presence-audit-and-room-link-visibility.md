# Presence, Audit & Room-Link Visibility — Spec 043

Owns C14-09 (DST affected-accounts) + the visibility-scoping of U-02/U-03/UK-08/UK-26/P-22/P-23. 054 owns the
room LIFECYCLE; 055 owns propagation; **043 owns only the visibility constraint** — who may see what. Grounded
in `management-courseclasses-1.txt` (presence log + Timeline, author-verified) and
`management-courseclasses-5.html` (the 3 role-scoped room URLs, author-verified).

## The legacy exposures (evidence)

- **Presence log** (`courseclasses-1.txt:52-56`): `Student Enter At 2026-06-20 19:55:34` · `Teacher Enter At
  2026-06-20 04:03:01` · `Remind Teacher At` — presence-monitoring of a minor and of staff.
- **Audit actor** (`courseclasses-1.txt:70`): `mohamed created`, and the family Activity timeline `mohamed
  updated country_id…` — a real staff actor identity attached to each change.
- **Room links** (`courseclasses-5.html`): `session-class-room/NQ==/1` (Student), `/2` (Teacher), `/3` (Admin)
  — one class → three role-scoped rooms keyed by `base64(id)/role`; **guessable**, so authorization must be
  server-side (P-22 security constraint).
- **DST affected accounts** (`management-time-convertor`): the "Changes" tab column `Affected Accounts
  (Teachers: N / Families: N)` — a cross-account aggregate.

## The audience decisions (PR-1 … PR-7)

| ID | Item | Audience decision | Basis | Retained UNKNOWN? |
|---|---|---|---|---|
| **PR-1** | "Student Enter At" / "Teacher Enter At" (raw presence timestamps) | **Admin-only** (PA/AA/ST); teacher/guardian/child get session STATUS only (MASKED), never raw enter-times of a minor/staff. | matrix cell 10; presence-of-a-minor is T1 | No — decided admin-only |
| **PR-2** | "Added by" / audit actor identity | **Admin-only**, and a REAL actor identity is `CONDITIONAL_BACKEND` even for staff (a named actor is PII); DENY for RA/TE/GF/CV/PU. Today the audit log renders entity/action/date with **no actor field** (`staff-management.js:54-59`) — correct. | matrix cell 11; RJ-13 (never author a real staff name) | No — decided admin-only; the "who" stays backend + never a real name in a fixture |
| **PR-3** | Presence timelines (the full TimeTable event log) | **Admin-only.** Guardian/child/teacher receive their own session status via 055 propagation, not the raw log. | P-22 | No |
| **PR-4** | Class direct links (raw `session-class-room/base64(id)/role` URLs) | Raw management/copy links = **admin + assigned teacher only**, and only after real backend authorization (the URL is guessable). GF/CV receive only their own scoped JOIN action. | P-22 security constraint; matrix cell 12 | No — decided; enforcement is 054/backend |
| **PR-5** | Student / teacher / admin room links | Same as PR-4: role-scoped; no role sees another role's raw link; a real room must exist before any join surface claims availability (054 Gate 3). | P-22 | No |
| **PR-6** | Copy-link permission | **Admin / assigned teacher only, after real backend authorization.** Student/family never get a raw management/copy link. | OQ-5 safe default | Partially — WHO exactly (assigned-teacher scoping) is a backend authz detail; the RULE (student/family never) is decided |
| **PR-7** | Per-timezone affected-account counts (C14-09) | A cross-account count is **admin-only**; the column stays ABSENT today (no live data without a backend). The affected teacher/family get their own DST change (055), not the aggregate. | matrix cell 13; the DST table is 4-col with no Affected-Accounts (`time-converter.js:110-133`) | No — decided admin-only; the live count is `FUTURE_BACKEND` |

## What stays UNKNOWN_EVIDENCE (never manufactured)

- **The room RECORDING player / a populated recording** (U-6/UK-08): never captured. 043 does not scope a
  recording UI; 054 owns it. If a recording of a minor is ever built, 043's visibility rules apply then
  (admin-only, consent-gated) — but the surface is not designed from convenience now.
- **Exactly which copy-link scoping a real backend enforces** (PR-6 detail): the RULE is decided (student/family
  never); the precise assigned-teacher authorization is a backend authz detail, not manufactured here.

## Current-state compliance

- No presence/room-entry tracking anywhere (`grep 'Enter At|joined|presence' src/js` = 0 real hits, Agent D).
- The Join control is a `backendRequired` gate (`appointment-details.js:47`), not a live link (P-22 "hold it").
- The audit log has no actor field (no actor PII).
- The DST table has no Affected-Accounts column.

043 freezes these; it changes nothing. 054/055 inherit PR-1…PR-7 as visibility constraints at their Gate 3.

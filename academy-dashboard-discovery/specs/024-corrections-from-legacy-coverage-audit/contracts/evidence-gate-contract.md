# Contract: Evidence Gate

**Purpose**: guarantee every Spec 024 correction is grounded in the Spec 023 backlog + the actual current files — never memory, never invented.

## Binding rules

- Before any edit, the implementer MUST have read: `specs/023-…/{correction-backlog-for-024, missing-capabilities-register, extra-or-drift-register, design-quality-register, role-model-consistency-audit, coverage-matrix}.md` and the current file each B-item touches (see `evidence-review.md`).
- Every change MUST cite its backlog ID (B-01…B-11) and the exact file:line it edits.
- No correction outside the B-01…B-11 Must/Should set (plus the folded documentation records B-15→B-09, B-17→B-10, B-18→B-08) may be introduced.

## Confirmed facts (must hold; re-verify if in doubt)

- B-01 targets ONLY `ar.prt.js:297-298` / `en.prt.js:294` (student note); family `:387-388` + teacher `:446-447` notes are correct → out of scope.
- B-02 Locations has no current nav/page (`nav.config.js` zero "location" hits) → documentation only.
- B-03 admin notifications gate exists (`enhance.js:82`) → must not be duplicated; role portals have none (`portal-shell.js:56,59`).
- B-04 live-room = redirected home copy → future-backend.
- B-05 `library` absent from `ROLE_NAV.teacher` (`portal.js:161-166`).
- B-06 chat send-form never captured → UNCONFIRMED.

## Acceptance

- The correction-status record lists each implemented B-item with its evidence path.
- No file outside the allowed list (`scope-guard.md`) is modified.

**Stop condition**: if any evidence is missing or contradicts a planned edit, STOP and report before editing.

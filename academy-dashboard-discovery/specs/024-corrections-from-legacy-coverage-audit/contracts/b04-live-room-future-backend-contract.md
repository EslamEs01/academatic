# Contract: B-04 — Live-room future-backend (Must fix)

**Problem**: the teacher live `session-class-room` page was never truly captured (the only capture is a redirected `/teacher/home` copy incl. the salary band) — M-05, `unclear-needs-review`.

## Decision

- Record the teacher live-room as **future-backend** (no real capture exists; no fresh live-session crawl is in 024 scope).
- Teacher surfaces may show any live/room action only as an honest gate.

## Allowed edits (records only)

- Append-only status note to `specs/023-…/coverage-matrix.md` (teacher `session-class-room` row: `unclear-needs-review` → `intentionally-excluded / future-backend`) and `missing-capabilities-register.md` (M-05 status).
- `correction-scope.md` (already carries B-04).

## Forbidden

- Any fake enter-class / end-class / attendance-write behavior.
- Building a live-room page or a fake live surface.

## Acceptance

- Live-room recorded future-backend (or a fresh capture cited, if one is later obtained).
- The coverage-matrix teacher row no longer reads `unclear-needs-review`.
- Zero fake live behavior in any teacher page.

**Owner**: 024-correction (Must fix) → real room = future-backend.

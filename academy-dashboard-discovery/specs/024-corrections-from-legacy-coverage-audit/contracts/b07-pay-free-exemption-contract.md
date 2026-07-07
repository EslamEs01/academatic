# Contract: B-07 — Pay-free exemption record (Should fix)

**Problem**: the sanctioned teacher-home → `teacher-performance.html` anchor lands in an ADMIN `app-shell` whose nav rail carries `finance.html` + الرواتب labels one click from the teacher persona (M-09/X-44). The pay-free contract has no written exemption for this pre-existing Spec 007 board.

## Decision (documentation only; strengthens, never weakens)

- Append a written exemption to `specs/016-…/contracts/teacher-pay-free-global-contract.md` (cross-referenced from `specs/022-…/contracts/teacher-pay-free-contract.md`):
  - `teacher-performance.html` is a pre-existing **Spec 007 ADMIN** board (admin `app-shell`, `activeId teacherKpi`); its `#page-body` is pay-free and smoke-asserted (`run.cjs:548-561`).
  - The الرواتب tokens are ADMIN-shell nav chrome, NOT teacher-owned content.
  - The teacher-home→performance anchor is grandfathered pending the **Spec 025** repoint to the real `teacher-reports` internal page; the admin-board link is then demoted to admin-only.
- Record a 025 task: repoint `teacher-portal.html:378`.

## Forbidden

- Weakening/altering the `payHit` grep or the pay-free token list.
- Adding any pay wording to a teacher-owned surface.
- Repointing/renaming in 024 (target page does not exist yet; would break the sanctioned smoke pin).

## Acceptance

- The pay-free contract carries the exemption citing Spec 007 provenance + the 025 repoint task.
- Teacher-portal pay-token scan stays zero-hit; `payHit` byte-verbatim.

**Owner**: 024-correction (Should fix) → repoint owned by 025.

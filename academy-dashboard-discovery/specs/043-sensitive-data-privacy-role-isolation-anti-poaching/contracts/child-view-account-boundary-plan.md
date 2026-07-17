# Contract 2 — Child-View Account Boundary (outcome A, C12-09) — executable

Translates `../child-view-account-boundary.md` into the exact edit + supersession + mutation.

## The exact edit (1 fixture line)

`src/js/fixtures/portal.js` — `STUDENT_PAGES.profile.gates` (lines 320-324). **Delete line 323**:
```
{ id: 'passwordChange', icon: 'help', titleKey: 'prt.stu.pg.prof.gPass.t', descKey: 'prt.stu.pg.prof.gPass.d', availability: 'backendRequired' },
```
Result: the array holds `photoUpload` + `profileSave` (2 gates). `student-profile.js:72` renders
`STUDENT_PAGES.profile.gates.map(plannedCard)` → 2 cards. **`student-profile.js` = 0-diff.**

> **Stale-comment carry (honest note)**: `student-profile.js:2`'s header comment reads "…EXACTLY three
> backendRequired gates (photo/save/password)". After the removal the rendered count is 2, but `student-profile.js`
> stays on the forbidden 0-diff list — so the comment is left as-is (a comment, no token/functional impact). The
> implement phase may optionally correct this ONE comment line if comment accuracy is wanted; if it does, that is
> a declared, comment-only exception to the 0-diff list (no rendered-body change). Default: leave 0-diff.

## Invariants (STOP if any cannot hold)

- **student-profile only.** `FAMILY_PAGES.profile.gates` (`portal.js:377-381`, keeps `passwordChange` @ line
  380) and the inline teacher gates (`teacher-profile.js:83-85`, no fixture, no `id`) stay **byte-verbatim**.
  The three gate sets are SEPARATE arrays — a shared-array edit is impossible here (verified).
- **No new form / no fake password workflow.** The removal deletes an affordance; it adds nothing. 0
  `type=password`, 0 input.
- **Child-view wording implies no standalone account.** The remaining copy («عرض الابن», the 2 kept gates, the
  «بدون تسجيل دخول» footer) is untouched; no wording is added implying a child login.
- **photo + profile-save gates remain honest `backendRequired` gates** (a guardian may, in a real backend, set
  the child's photo/display profile from within the family journey).

## The declared protected-test supersession (the ONLY meaning-change in Spec 043)

Two lines in `tests/smoke/run.cjs` (re-grounded, exact current lines, zero drift):
- `:1971` — `if (page === 'student-profile') ok(prt.plannedBackend === 3, …photo/save/password…)` →
  `=== 2` and comment "photo/save/password" → "photo/save".
- `:2082` — the `expPlanned` map entry `'student-profile': 3,` → `'student-profile': 2,`.

`plannedBackend` = `document.querySelectorAll('.pt-planned .chip.tone-amber').length` (`smoke:1916`);
`plannedCount` (`.pt-planned`, `smoke:1889`) is asserted against `expPlanned` at `smoke:2085`.

**Neighbours preserved byte-verbatim (MUST NOT touch)**: family-profile assert `smoke:2007` + map entry
`smoke:2083` (`'family-profile': 3`); teacher-profile assert `smoke:2020` + map entry `smoke:2084`
(`'teacher-profile': 3`). The guardian and teacher are real account holders — their password gates stay.

**Six supersession fields**: old code (`=== 3` / `'student-profile': 3`) · new code (`=== 2` /
`'student-profile': 2`) · evidence (G-03; `portal.js:323`; the child-view screenshot) · reason (a child has no
login; the password gate implies a non-existent account) · neighbours (family `:2007`/`:2083` + teacher
`:2020`/`:2084` byte-verbatim) · **mutation proof (MUT-3)**.

## MUT-3

On an isolated copy: re-add the `passwordChange` gate to `STUDENT_PAGES.profile.gates` → build → run smoke →
the `:1971` assert (`plannedBackend === 2`) fails RED (`student-profile/<lang>: … got 3`). Restore → GREEN,
residue 0.

## Downstream

**Spec 047 PRESERVES only** — it may not reintroduce the gate; its MUT-3-equivalent stays green. 047 is NOT the
owner of this correction (the circular defect this plan removes).

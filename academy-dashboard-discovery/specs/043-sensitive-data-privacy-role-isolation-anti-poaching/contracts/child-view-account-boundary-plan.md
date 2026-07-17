# Contract 2 — Child-View Account Boundary (outcome A, C12-09) — executable

Translates `../child-view-account-boundary.md` into the exact edit + supersession + mutation.

## The exact edits (1 fixture line + 1 header comment)

`src/js/fixtures/portal.js` — `STUDENT_PAGES.profile.gates` (lines 320-324). **Delete line 323**:
```
{ id: 'passwordChange', icon: 'help', titleKey: 'prt.stu.pg.prof.gPass.t', descKey: 'prt.stu.pg.prof.gPass.d', availability: 'backendRequired' },
```
Result: the array holds `photoUpload` + `profileSave` (2 gates). `student-profile.js:72` renders
`STUDENT_PAGES.profile.gates.map(plannedCard)` → 2 cards. **`student-profile.js`'s executable code (the render
function and everything from the first `import` onward) stays byte-identical.**

### The mandatory header-comment correction (`src/js/pages/student-profile.js:1-4`)

`student-profile.js`'s header comment currently reads "…EXACTLY **three** backendRequired gates (photo upload ·
profile save · **password change** — the legacy profile-edit page's exact write surface)". After the fixture
removal the rendered count is 2, so this comment is **now false**. Leaving a knowingly-stale source comment is
forbidden. **The implement phase MUST correct it** to describe **two** gates and remove the `password` reference —
e.g. "…EXACTLY **two** backendRequired gates (photo upload · profile save — the legacy profile-edit page's write
surface)". This is a **mandatory comment-only** correction (part of the child-view outcome), **not** optional and
**not** "default: leave 0-diff". Done-conditions: (a) the comment says "two"; (b) it lists only photo/save;
(c) **no `password` token remains** in that child header comment; (d) the executable code (from the first `import`
onward) is byte-identical; (e) the rendered body changes only the already-predicted fixture-driven 3→2 cards — the
comment adds **no** additional body/asset change. **This correction does NOT broaden the two-line smoke
supersession** below (it is a source comment, not a test change).

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

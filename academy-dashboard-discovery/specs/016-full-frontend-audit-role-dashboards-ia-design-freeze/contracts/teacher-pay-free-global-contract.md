# Contract: Teacher Pay-Free — GLOBAL (Spec 016)

**Status**: Binding FOREVER · Extends Spec-015's page rule to the entire teacher app (`teacher-portal.html` + every future `teacher-*.html` + their sources, locales, fixtures slices, and comments).

1. Zero pay vocabulary: word-bounded EN `salary|salaries|pay|payouts?|earnings?|compensation|bonus|fines?` + AR substrings `راتب|رواتب|أجر|مستحقات|غرامة|مكافأة` — copy AND comments.
2. Zero currency tokens: `EGP|SAR|USD|ريال|ر.س|جنيه|$|€|£`. Zero money figures of any kind.
3. Zero routes from any teacher page to any pay surface (admin finance included); the sanctioned-anchor registries enforce this structurally.
4. Zero computed score/rating/rank; sara's numeric `rating|util|hours|sessions` never render on any teacher page.
5. Three-layer enforcement scales with the app: source grep (incl. comments) over the whole teacher family · built grep over all teacher pages · smoke pay asserts per teacher page (the Spec-012 payHit lineage, never weakened).
6. Legacy pay pages (T2/T17/T18/T19 + compensations + payouts) live ONLY as admin-finance GATE shells (Spec 025) with zero figures.

**Acceptance**: Spec 020's G-audit runs all three layers family-wide; 025 proves no teacher-app route/link entered; 027 re-runs globally.

---

## Spec 024 — recorded exemption (B-07): the pre-existing admin `teacher-performance` board

`teacher-performance(.en).html` carries the `teacher-*` filename that rule 3's letter ("zero routes
from any teacher page to any pay surface") would sweep in, but it is a pre-existing **Spec 007 ADMIN**
board, not a teacher-role page: it renders inside the admin `app-shell` with the six-category admin
rail (`activeId teacherKpi`). Its `#page-body` is pay-free and smoke-asserted (`tests/smoke/run.cjs:548-561`).
The الرواتب / رواتب الموظفين / تقرير رواتب الفصول tokens one click away are **admin-shell nav chrome**
(the admin finance category), NOT teacher-owned content.

**Exemption**: the sanctioned teacher-home → `teacher-performance.html` anchor (`teacher-portal.html`
body, smoke-pinned `run.cjs:1124-1126`) is grandfathered. The pay-free grep is NOT weakened by this
exemption — it stands over the teacher-owned family (teacher-portal + sources + teacher locale keys),
which remains zero-hit.

**Scheduled close (Spec 025)**: when the real `teacher-reports` internal page ships, repoint the
teacher-home performance anchor to it and demote the admin-board link to admin-only. Until then the
admin board is the honest destination for "see my performance", pay-free in body.

(Recorded by Spec 024 — `specs/024-corrections-from-legacy-coverage-audit/correction-status.md`.)

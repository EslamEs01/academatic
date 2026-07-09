# Contract: Smoke Rescope

**Purpose**: extend smoke to cover the 7 new pages + the nav/anchor changes; real, non-vacuous; never loosen existing guards.

## Sanctioned amendments (each declared)
- **New pages**: add teacher-{schedule,students,outcomes,tasks,reports,profile,library} to PORTAL_PAGES; assert each loads (AR+EN), is a teacher portal page (role teacher, one sidebar), body has no `href="#"`/dead button/raw key, `payHit` false.
- **Nav conversion**: teacher block `navListAnchors === 8` (was 1), `plannedNavAnchors === 0`, `navAside === 8 && navDrawer === 8`, `aria-current` self on each internal page.
- **Anchor repoint**: teacher-portal `bodyAnchors === 1`, target regex `teacher-performance` → `teacher-reports`; shell-anchor multiset stays {self×2, hub×3}=5.
- **Per-page gate asserts**: schedule live-room backendRequired; outcomes save backendRequired; library upload/download backendRequired; profile exactly 3 write gates; reports export backendRequired + no chart/computed-score + finance-free.
- **Load count** bumped to the new total.

## Byte-verbatim (MUST NOT change)
- `payHit` regex + assertion; `famPay`/`payFigure` lines; ALL admin asserts; the role-model pins (hubRoleTargets/childViewLinks/family-child bodyAnchors===6); the student/family nav counts.

## Acceptance
- `npm test` green; every amendment additive + declared; the byte-verbatim set unchanged; load count == 91×… (the new page-load total).

**Stop**: a smoke change that can't be explained, or a loosened assertion → STOP.

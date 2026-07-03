# Contract: Teacher Schedule & Next Class (Spec 015)

**Status**: Binding · References FR-002/FR-003, US1/US2; research D2; delivers T1 (minus the pay hero).

## 1. Today's schedule

- Cards from `SESSIONS_FULL` rows with `trainer.id === 'sara'` (s2 · s3), each: time · course title · room · labeled `statusChip` («جارية الآن»/…) · the authored student count (`present` — an existing fixture literal, e.g. «١٨ طالبًا», localized via `num()`).
- NO live-join/start affordance; NO duration-fine fragment (the legacy `(3.00 Fine)` cell is part of the excluded pay set).

## 2. My next class

- The later sara row as a rich card: time · course · room (+ group label) · the authored **prepare hint** (`prt.tch.nextPrep` — what to have ready).
- The live affordance is the honest backendRequired note («الانضمام المباشر يتطلب ربط نظام الجلسات الفعلي») — never a button-styled join; the legacy fake live room stays excluded.

## 3. MUST NOT

No countdown/clock computation (static output honesty); no per-class actions (end/absent/edit are the workflow section's gated preview); no derived aggregates beyond the authored fixture literals.

## Acceptance (binding)

1. **Given** the today band, **Then** sara's session cards render with labeled chips + Arabic-Indic student counts on AR; zero action controls.
2. **Given** the next-class card, **Then** the prepare hint renders and the live note is a note, not a control.

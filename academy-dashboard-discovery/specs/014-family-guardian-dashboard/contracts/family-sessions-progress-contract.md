# Contract: Family Sessions, Progress & Signals (Spec 014)

**Status**: Binding · References FR-003/FR-004/FR-005/FR-006, US3/US4; research D9; delivers F1 (widgets), F16 (notes deepened), the F5 family slice.

## 1. Today's sessions

- Cards from existing `SESSIONS_FULL` rows (the established sara/khalid family proxy), each showing: **which child** (via the authored `FAMILY_PREVIEW.todayChildren` sessionId→studentId mapping) · time · course · teacher · labeled `statusChip`.
- Clear "what a parent should know" hint line; NO join affordance, NO cancel control (cancel lives in the requests hub as a gated preview).

## 2. The signals band (the "is anyone behind?" answer)

- The authored family trio (attended ١٢ · upcoming ٣ · «تحتاج متابعة» ١ — foundation literals, gentle labels).
- The needs-attention row — REAL fixture rows only: `out15` → st11 card (real `studentAbsent` outcome chip + follow-up framing + sara association) · `out12` → st13 card (real `cancelled` chip + trial framing). Gentle tone: soft cards, labeled chips, no red walls.
- The reassurance close: «بقية الأبناء على المسار الصحيح ✅» (authored).

## 3. Teacher notes (deepened)

- 3 notes (existing n1 st1/sara + n2 st6/khalid + NEW authored n3), each: child association · teacher · summary/homework-note shape · day label. Display-only.

## 4. MUST NOT

No derived counts (the trio stays authored); no KPI wall (max the trio + two attention cards); no computed "behind" score; no alarming styling; no per-session actions.

## Acceptance (binding)

1. **Given** the today band, **Then** every session card names its child and carries a labeled status chip; zero action controls.
2. **Given** the signals band, **Then** the two attention cards resolve the REAL `out15`/`out12` rows (correct child, real outcome chip) and the reassurance line renders.
3. **Given** the notes section, **Then** 3 child-associated notes render in the summary/homework shape.

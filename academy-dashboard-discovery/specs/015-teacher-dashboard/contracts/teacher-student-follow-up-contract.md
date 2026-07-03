# Contract: Teacher Student Follow-Up (Spec 015)

**Status**: Binding · References FR-004/FR-005, US3; research D3/D4; delivers the follow-up slice of T1 + the T8 roster preview.

## 1. The follow-up board (the "who needs follow-up" answer)

- EXACTLY the real follow-up rows from `outcomesOfTeacher('sara')`:
  1. **out15** → st11 card: real `studentAbsent` outcome chip + gentle framing («غياب في جلسة الرياضيات — تواصل لطيف مع الأسرة») + the existing `data.att.fb.support` note text.
  2. **out4** → st7 card: real `teacherAbsent` chip + make-up framing («جلسة تحتاج تعويضًا»).
- The reassurance close: «بقية طلابك على المسار الصحيح ✅» (authored).
- Gentle register: soft cards, labeled chips — NO risk number, NO computed ordering, NO red wall.

## 2. My students (roster preview)

- `studentsOfTeacher('sara')` → the grp1 roster (st1/st6/st11/st13) as display-only cards: avatar · name · group/course label · `familyStatusChip(statusId)` · an authored learning note (`data.prtTchStu*`).
- NO links (student/course pages are admin surfaces); NO progress percentages (the teacher register leads with notes, not bars).

## 3. MUST NOT

No computed risk/score/rating of any kind; no fabricated follow-up entries (real rows only); no aggressive styling; no per-student actions.

## Acceptance (binding)

1. **Given** the board, **Then** the two cards resolve the REAL out15/out4 rows (correct students, real chips, the support note) + the reassurance line renders.
2. **Given** the roster, **Then** exactly 4 display-only cards render (the grp1 students) with zero anchors and zero percentages.

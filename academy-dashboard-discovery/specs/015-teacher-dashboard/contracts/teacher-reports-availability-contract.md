# Contract: Teacher Reports, Availability & Requests (Spec 015)

**Status**: Binding · References FR-009/FR-010/FR-011, US6/US7/US8; research D8–D11; delivers T14 (read-only + gated edit), T9 (rubric preview), T10 (certificate preview), T20/T21 (folded history slice), and keeps the D11 sanctioned link.

## 1. Timetable & availability

- `scheduleOfTeacher('sara')` day-grouped agenda (the `.pt-day` pattern): SAT (b14) · MON (b4) · TUE (b6) — compact start–end/course/room cards with status chips. NEVER an hour×day grid.
- The merged truthful free-days `.pt-empty`: «الأربعاء والخميس — بلا حصص، وقت مثالي للتحضير 🌤» (genuinely true — no WED/THU blocks exist; the D12 empty-state demonstration).
- The `.pt-planned` mini-card **`availabilityEdit`** classed **backendRequired** («تعديل التوفّر» — slot editing writes to the real schedule).

## 2. Monthly report rubric preview

- The five capture-verified dimensions as display-only `.pt-lines`: الإنجازات · تقدّم التعلّم · التركيز · إتمام الواجبات · الالتزام بالمواعيد + a one-line explainer.
- An inline **backendRequired** availability chip (submitting reports requires the backend). NO answer scales (the legacy Excellent/Good radios are NOT mocked), NO rating visual, NO score vocabulary.

## 3. Requests & performance

- The **certificate-request preview** card: routed-to-management framing + description/date concept lines (capture-verified fields), display-only + inline **backendRequired** chip.
- The **teacher-performance link card**: the ONE sanctioned page-body anchor — labeled («فتح لوحة الأداء», admin-console framing) → `teacher-performance(.en).html` (real, existing, pay-free). Smoke pins `bodyAnchors === 1` with the exact target.

## Acceptance (binding)

1. **Given** the timetable section, **Then** the three day groups + the truthful free-days empty state + the backendRequired edit gate render; zero grids/tables.
2. **Given** the rubric + certificate previews, **Then** the dimension/concept lines are display-only with their inline backendRequired chips; zero form controls.
3. **Given** the anchor inventory, **Then** exactly one page-body link exists and targets the performance page (language-correct).

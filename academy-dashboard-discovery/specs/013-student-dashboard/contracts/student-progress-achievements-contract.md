# Contract: Student Progress & Achievements (Spec 013)

**Status**: Binding · References FR-007…FR-010; research D3/D8.

## 1. Progress

- Overall gauge = the existing authored `overallProgress: 78` (st1's fixture figure). Per-course bars = existing authored `pct` literals (78 / 41) + a NEW authored next-step line each.
- The trio = `STUDENT_PREVIEW.attendance` authored literals: attended **9** · upcoming **2** · **streak 5 days** (the streak deliberately replaces the guardian-flavored needs-follow-up tile — motivational register, research D8; it ties into the existing persistence badge).
- All digits via `num()` — Arabic-Indic on AR (٧٨٪، ٩، ٥). Percent sign locale-correct (٪ / %).
- NO derivation, NO computed grade/rank/percentile, NO KPI wall (max the gauge + bars + one trio).

## 2. Achievements

- The 3 existing authored badges (persistence / progress / attendance) presented in the deepened band; the net-new framing stays («تجربة جديدة كليًا — النظام القديم لم يكن يقدّم هذا»-class wording).
- Badges are collected, not earned-with-points; no points economy, no badge history fabrication, no locked-badge teasers.

## 3. Celebration («نجوم مجموعتي»)

- Exactly 3 authored, unordered group-win cards; section labeled authored/demo; content celebrates the GROUP's month + st1's own badge — never named-peer performance comparisons.

## Acceptance (binding)

1. **Given** the AR page, **Then** gauge counters ≥ 2 exist (`.pt-gauge-num`), all with Arabic-Indic digits (smoke gaugeCount + gaugeAscii asserts).
2. **Given** both pages, **Then** no ordinal/rank/points vocabulary appears in the celebration section, and its demo label is present.
3. **Given** the progress band, **Then** every number matches the authored fixture literals exactly (no derived values in the markup).

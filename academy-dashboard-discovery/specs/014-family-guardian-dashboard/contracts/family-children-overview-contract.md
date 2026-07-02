# Contract: Family Children Overview (Spec 014)

**Status**: Binding · References FR-002, US2, SC-002; research D2; delivers coverage F2.

## 1. Everyone-inline (the multi-child resolution)

- ALL FIVE fam1 children render as cards: st1 (math, l2, 78, active) · st6 (science, foundation, 33, active) · st11 (math, l1, 41, active) · st12 (science, foundation, 28, active) · st13 (english, l1, 15, **trial**) — every value an existing fixture ref/literal.
- Card shape: avatar (existing `avatar` atom) · name · level · `familyStatusChip(statusId)` · gentle progress bar + localized percent · a one-line authored per-child hint (`data.prtFamKid*`).
- **NO switcher control of any kind** — no tabs, no select, no fake focus toggle. The capture proves legacy had no global switcher; everyone-visible-at-once is the recorded improvement.
- The Spec-012 `prt.fam.kidsHint` copy («التبديل الكامل يأتي في ٠١٤») is RESOLVED to honest post-014 copy (family-owned key; only the family page consumes it).

## 2. MUST NOT

No per-child navigation links (no student-appropriate target pages exist); no computed aggregate ("family average") anywhere; no child hidden behind interaction; no alarming styling on the trial child (the trial chip is the existing labeled vocabulary).

## Acceptance (binding)

1. **Given** the children section, **Then** exactly 5 child cards render with the five fixture names, levels, status chips, and progress literals (smoke five-children assert).
2. **Given** the section, **Then** zero interactive controls exist inside it.
3. **Given** the AR page, **Then** progress percents render Arabic-Indic.

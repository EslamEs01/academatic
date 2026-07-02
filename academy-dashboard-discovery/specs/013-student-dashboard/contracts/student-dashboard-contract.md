# Contract: Student Dashboard Composition (Spec 013)

**Status**: Binding · Supersedes the Spec-012 `student-portal-foundation-contract.md` composition (which it extends — nothing from the foundation is removed, only deepened). References FR-001…FR-014; research D1/D4/D5/D8.

## 1. Composition (exactly these sections, this order — research D1)

1. **Hero** — st1 fixture name, today-focused greeting, calm motivational copy, plain-text next-action hint. NO notification count, NO baked calendar date, NO anchor in the hint.
2. **Today's learning** — st1's sessions (grp1 proxy) as time/course/teacher/room cards, labeled icon+text status chips.
3. **My next session** — rich card (time · course · teacher · room) + the honest join note classed backendRequired (see honesty contract §2).
4. **My week** — SAT-first stacked day groups from `SCHEDULE_WEEK` (sara-filtered), «اليوم» marker on `isToday`, compact start–end cards; empty days omitted EXCEPT Friday which renders the `.pt-empty` rest-day state.
5. **My courses** — display-only cards: title, level, authored progress hint + next-step line. Zero hrefs.
6. **Homework & tasks** — 3 display-only authored items (due labels) + the submit backendRequired mini-card.
7. **Learning materials** — 3 display-only authored items (type icons) + the download backendRequired mini-card.
8. **My progress** — overall gauge (78) + per-course bars + the attended/upcoming/streak trio; all `num()`-localized.
9. **My achievements** — the 3 authored badges, net-new framing kept.
10. **Stars of my group** — 3 unordered celebration cards, authored/demo-labeled.
11. **My recent sessions** — 3 F6-shaped feedback cards (first = real `out1`) + the full-history planned mini-card.
12. **My profile** — identity slice card (level/course/family relation) + backendRequired editing note.
13. **Closing note** — honest delivered-state summary; Spec-016 pointer.

## 2. MUST NOT

No `<table>` anywhere; no admin chrome; no KPI wall; no computed score/rank/percentile; no fake join/upload/submit/download/chat/notification; no legacy layout cloning; no childish styling; no new links beyond the shell's; no section beyond this list without a contract amendment.

## Acceptance (binding)

1. **Given** both built files, **When** sections are enumerated, **Then** all 13 render in order with st1's fixture/authored data, ≥10 `.pt-section` blocks, zero tables.
2. **Given** the AR page at 390px, **Then** zero horizontal overflow (smoke probe + mobile frame).
3. **Given** desktop AR, **Then** hero + today's learning + next session are visible without scrolling (the six-questions promise, reviewed in the full-page frame).

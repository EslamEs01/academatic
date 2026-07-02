# Contract: Student Portal Foundation (Spec 012)

**Status**: Binding · The st1 foundation page — deep dashboard = Spec 013. References FR-002/FR-004/FR-005; US2; research D3/D9.

## 1. Composition (exactly these sections, in a friendly order)

1. **Welcome hero** — st1 by name, encouraging tone (bright-not-childish), today framing.
2. **Today's learning preview** — st1's fixture session(s) today (via grp1/schedule fixtures), friendly card(s), labeled status chips.
3. **Next session preview** — time/course/teacher card; its affordance is honest demo/planned — never styled as a live join button.
4. **My courses preview** — st1's enrollments as small warm cards (icon, subject, level) — **zero tables**.
5. **Progress preview** — fixture-authored visual (gauge/bars from `progress: 78` + authored per-course literals) — display-only, no computed score/rank.
6. **Achievements preview** — honestly introduced as a new experience (legacy had none): a few authored badge-style cards with a "new here" framing — no fake history.
7. **Planned cards** — homework/tasks · materials · leaderboard — labeled availability, one line each, mapping to classification rows.
8. **Spec-013 note** — honest closing card: the deep student dashboard arrives in Spec 013.

## 2. MUST NOT

No tables; no admin chrome; no KPI wall; no computed scoring/ranking; no fake join/chat/upload; no legacy layout cloning; no childish styling; no unlabeled planned affordance.

**Acceptance (binding):**
1. **Given** the page in AR+EN, **When** sections are enumerated, **Then** all 8 blocks render with st1's real fixture data and zero `<table>` elements.
2. **Given** the achievements/progress blocks, **When** inspected, **Then** every number/badge is an authored literal, presented display-only.
3. **Given** the whole page, **When** reviewed, **Then** it reads fun/encouraging/easy, mobile-first single column, and unmistakably not the admin console.

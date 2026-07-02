# Research & Decisions — Spec 013 Student Dashboard

All twelve required decisions resolved. Format: Decision · Rationale · Alternatives considered. Grounding: spec.md, the Spec 012 coverage artifact (F5/F6/F12 + §4), fresh fixture reads (`students.js` st1, `SCHEDULE_WEEK`, `SESSION_OUTCOMES`, `COURSES`), the current `student-portal.js`/`ar.prt.js`/`en.prt.js`, the smoke portal block, and the capture-verified legacy inventory (10-col today table, 8-col SAT-first grid, F6 modal fields, hours-only progress, no gamification, no empty states).

---

**D1 — Final section order.**
**Decision**: 13 sections in a narrative that answers the six student questions in order of urgency:
1. **Hero** (greet st1 · today-focused copy · plain-text next-action hint — no anchor, no date, no notification count)
2. **Today's learning** (session cards, labeled status chips)
3. **My next session** (rich card + honest backendRequired join note)
4. **My week** (SAT-first stacked day agenda, D4; Friday rest-day empty state, D5)
5. **My courses** (display-only cards, D7)
6. **Homework & tasks** (graduated display-only cards + submit mini-card, D2)
7. **Learning materials** (graduated display-only cards + download mini-card, D2)
8. **My progress** (overall gauge + per-course bars + the attendance/streak trio, D8)
9. **My achievements** (deepened authored badges, net-new framing kept)
10. **Stars of my group** (celebration recognition, D3)
11. **My recent sessions** (F6 feedback cards + full-history planned mini-card, D6)
12. **My profile** (identity slice card + backendRequired editing note)
13. **Closing honest note** (dashboard delivered; account/live features backendRequired; communications arrive with Spec 016)
**Rationale**: today-block first (questions 1–3 answered above the fold on desktop), plans next (week), commitments next (courses/homework/materials = question 6), reflection last (progress/achievements/celebration/history = questions 4–5), identity/administrivia at the bottom — a child-friendly cognitive ramp from "now" to "me".
**Alternatives**: progress-first (rejected: violates today-first); grouping homework inside courses (rejected: homework is its own legacy capability and its own student question).

**D2 — Homework/materials graduation.**
**Decision**: each Spec-012 planned card becomes a real display-only section: **Homework** = 3 authored items (`STUDENT_PREVIEW.homework`: title key, course ref, authored due label, display-only state chip) + one `.pt-planned` mini-card «تسليم الواجبات» classed **backendRequired** (uploads are coverage row F4). **Materials** = 3 authored items (`STUDENT_PREVIEW.materials`: title key, type icon file-text/play/materials, course ref) + one `.pt-planned` mini-card «تحميل الملفات» classed **backendRequired**. `PORTAL_PLANNED.student` is re-registered to the new mini-card set (D9 keeps the count contract).
**Rationale**: content becomes real student value while the write/download actions stay honestly backend-gated using the established labeled-planned-card vocabulary — no new honesty pattern to invent, smoke stays strong.
**Alternatives**: inline chips only, zero planned cards (rejected: weakens the countable smoke contract and hides the backend gate); linking materials to real files (rejected: no safe student-appropriate local targets exist — D7).

**D3 — Leaderboard: include as celebration.**
**Decision**: **include**, transformed into «نجوم مجموعتي» — three authored, **unordered** celebration cards about st1's group month (e.g., group finished 5 sessions · st1 earned the persistence badge · full-attendance week), labeled with the demo/authored chip, no points, no ordinals, no per-peer standings.
**Rationale**: delivers the §4 item honestly; celebrating shared wins is motivating and stress-free, and avoiding named-peer performance both prevents fabricated rankings and models a privacy-kind pattern. The Spec-012 planned card (id `leaderboard`) is thereby delivered, not deferred — the coverage note records the celebration-form resolution.
**Alternatives**: defer-with-reason (allowed by FR-010 but weaker: leaves a §4 item undelivered for no cost saving); ordinal "top 3" list (rejected: computed-ranking implication + stress + constitution adjacency).

**D4 — Week view layout.**
**Decision**: **stacked day groups** from `SCHEDULE_WEEK` filtered by `trainer.id === 'sara'` (the established st1/grp1 proxy from Spec 012): SAT-first order exactly as the fixture (which matches the regional week), each day a slim header (day name; «اليوم» chip when `isToday`) above 1–2 compact session cards (start–end, course, room); days with no matching blocks are omitted — **except Friday**, which renders the rest-day empty state (D5). No tabs, no grid, zero tables.
**Rationale**: stacked groups are mobile-first (tabs hide content and would lean on enhancement hooks), the fixture already carries `dayId`/`isToday`/trainer-tagged blocks, and agenda cards are the direct anti-pattern to the legacy 8-column grid.
**Alternatives**: day tabs (rejected: needs interactive JS, hides the week shape, worse on mobile); a 7-column mini-grid (rejected: table-clone territory, unreadable at 390px).

**D5 — Empty-state demonstration site.**
**Decision**: a shared friendly empty-state pattern (`.pt-empty`: soft icon + warm one-liner, namespaced CSS) demonstrated **truthfully on Friday in the week view** — the fixture week genuinely contains no Friday sessions, rendered as «الجمعة — يوم راحة 🌤» / "Friday — rest day". The pattern is reusable by any future truthfully-empty list.
**Rationale**: the only place the fixtures are *genuinely* empty; turning it into a designed rest-day moment demonstrates the pattern with zero fabrication (an empty "no homework" state would be fiction while authored homework cards exist).
**Alternatives**: faking an empty homework day (rejected: dishonest next to authored items); shipping the pattern unused (rejected: spec FR-014 requires it used, and an unused pattern rots).

**D6 — History/feedback card shape (F6).**
**Decision**: «جلساتي الأخيرة» renders 3 records — the first anchored on the **real** `SESSION_OUTCOMES` row `out1` (st1 · math · sara · attended · existing `data.att.fb.good` feedback key), plus 2 authored records in `STUDENT_PREVIEW.history` — each card: course/session title + teacher + authored day label + **summary line** + **homework-note line** (the capture-verified F6 fields: Class Summary · Homework Note, with Class Remark folded into the summary line) + a labeled outcome chip where fixture truth exists. Attachments appear as a display-only paperclip-style annotation on ONE authored record (no link, no fake download). A `.pt-planned` mini-card «السجل الكامل» classed **planned** closes the section (the full history surface remains future-deep).
**Rationale**: carries the exact legacy record capability in friendly card form, anchored in real fixture truth where it exists; the planned mini-card keeps the deeper surface honest and countable.
**Alternatives**: modal-based details (rejected: legacy-clone interaction + needs hooks); more records (rejected: reflection section, not a log — low cognitive load wins).

**D7 — Course/material link policy: display-only, zero new links.**
**Decision**: course cards and material cards carry **no links**. The student page's only interactive elements remain the shell's theme/lang menus and the hub switch link.
**Rationale**: the only existing course/material surfaces are **admin console pages**; sending the child persona into admin chrome would break the portal-separation invariant and the "never looks admin" acceptance. The teacher portal's labeled admin performance link was a deliberate teacher-appropriate exception — there is no student-appropriate equivalent. In-page fragment anchors were also rejected: the link-crawl treats non-`.html` hrefs conservatively, and a plain-text hint serves the "what should I do now" job without risk.
**Alternatives**: labeled admin course links (rejected: persona-inappropriate + separation risk); new student course sub-pages (rejected: spec's one-page default; no user value at this depth yet).

**D8 — Progress/attendance data strategy.**
**Decision**: all authored/fixture literals, zero derivation: overall = existing `STUDENT_PREVIEW.overallProgress` 78 (st1's authored figure); per-course = existing authored `pct` 78/41 + a new authored one-line "next step" microcopy per course; the trio = **attended ٩ · upcoming ٢ · streak ٥ أيام** (`STUDENT_PREVIEW.attendance`) — a *streak* replaces the family portal's needs-follow-up tile because the student page is motivational, not supervisory (follow-up is the guardian's Spec-014 concern); the streak ties into the existing persistence achievement. The real `out1` row provides the attendance truth-anchor in the history section instead (D6).
**Rationale**: "every portal number authored" is the standing Spec-012 rule; st1 has exactly one real outcome row, so a derived trio would be thin AND derivation is engine-adjacent; the authored trio stays coherent with st1's active-student story.
**Alternatives**: deriving counts from `outcomesOfStudent('st1')` (rejected: 1/0/0 tells no story and derivation contradicts the authored-numbers rule); reusing the family's follow-up tile (rejected: wrong emotional register for a child).

**D9 — Smoke re-scope (student branch only).**
**Decision**: inside the existing Spec-012 portal block, amend ONLY the student expectations: planned-card count stays **{student: 3, family: 3, teacher: 2, hub: 0}** but the student ids/semantics change (submit-hw **backendRequired** · download-mat **backendRequired** · full-history **planned**) — add asserts: AR student body contains the «يتطلب الخادم» availability label (≥1 backendRequired chip); `.pt-empty` count ≥ 1 (the Friday state); `.pt-section` count ≥ 10; `<table>` count stays 0; gauge existence floor rises to ≥ 2 counters (overall + trio); plus a one-shot **390px viewport probe** for the student page asserting `scrollWidth ≤ 391` (no horizontal overflow). The plannedBad rule (never `<a>`, labeled icon+text chip) applies unchanged to the new mini-cards. **All admin-scoped assertions, the portal-absence check, and the family/teacher/hub expectations stay byte-verbatim.**
**Rationale**: the Spec-012 contract stays at least as strict everywhere; the student branch gets stronger, not looser — the count is preserved, the semantics assert the graduation honestly, and the new floors close the fail-open gaps the Spec-012 test-guard flagged as philosophy.
**Alternatives**: dropping the planned-count assert for the student (rejected: silent-loosening is exactly what the reconciliation discipline forbids); a separate new test file (rejected: fragmenting the harness).

**D10 — Byte-identity protection.**
**Decision**: post-build hash-compare vs HEAD must show **46/49 files identical** — all 40 admin files + `family-portal`/`teacher-portal`/`portals` pairs (index.html is untouched too — 47 including it; only the student pair changes). Enforced by construction: page-module edits confined to `student-portal.js`; `fixtures/portal.js` edits confined to the student registers (`STUDENT_PREVIEW`, `PORTAL_PLANNED.student`); locale edits confined to new `prt.stu.*`/`data.prtStu*` keys (the shared `prt.shell/portal/role/hub`, `prt.fam.*`, `prt.tch.*`, `data.prtNote*` keys are frozen); CSS additions are new selectors only (external stylesheet — cannot affect built-HTML bytes anyway); `build-html.mjs`/`nav.config.js`/`portal-shell.js`/`enhance.js`/`package.json` untouched.
**Rationale**: byte-identity is the strongest possible non-regression proof and Spec 012 demonstrated it is cheap to hold when edits are namespace-confined.
**Alternatives**: body-scoped comparison (rejected: strictly weaker and unnecessary here).

**D11 — Screenshot matrix & mobile checks.**
**Decision**: capture additions (additive MATRIX entries): student **ar/light**, **ar/dark**, **en/light** desktop + **ar/light mobile 390px** full-page, plus **four area frames** captured as element-scoped screenshots (Playwright `locator.screenshot()` on the section wrappers — an additive capture.cjs capability, no new dependency): next-session · homework+materials · progress+achievements+celebration · history/feedback. Unchanged proofs: hub, family, teacher, admin dashboard (ar/light desktop) re-captured for the review record. Mobile correctness is double-checked by the D9 smoke overflow probe, and dark contrast by the existing a11y dark scenarios (student dark scenario already in the matrix from Spec 012; verify it covers the new sections by full-page audit).
**Rationale**: area frames make the four experience bands reviewable at reading size; element screenshots are the cheapest faithful mechanism.
**Alternatives**: viewport-scroll cropping (rejected: brittle offsets); skipping area frames (rejected: the user's minimum frame list names them).

**D12 — MVP & sequencing.**
**Decision**: Baseline gate (build+tests green, HEAD recorded, REVIEW stub) → fixtures + locales (all `STUDENT_PREVIEW` extensions + keys, both languages, key-mirrored) → **Band A: hero/today/next/week + Friday empty state + `.pt-day`/`.pt-empty` CSS** → **smoke D9 re-scope** (run green = MVP) → **Band B: courses/homework/materials + mini-cards** → **Band C: progress/trio/achievements/celebration** → **Band D: history/profile/closing note** → full gate + byte-identity audit + prior guards → a11y + screenshots (incl. area frames) + REVIEW verdicts → coverage delivery notes (F5/F6/F12 + §4 items, celebration-form note for the leaderboard) → docs (README Django note if needed, CLAUDE.md).
**Rationale**: Band A alone proves the deepened composition, delivers F5, demonstrates the empty state, and re-greens the harness — a true independently-valuable MVP; later bands are additive sections with no cross-dependencies.
**Alternatives**: section-by-section test updates (rejected: one D9 re-scope keeps the smoke diff reviewable as a single sanctioned amendment).

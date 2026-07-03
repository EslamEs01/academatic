# Contract: Teacher Dashboard Composition (Spec 015)

**Status**: Binding · Supersedes the Spec-012 `teacher-portal-foundation-contract.md` composition (extends — nothing removed, only deepened). References FR-001…FR-013; research D1–D12.

## 1. Composition (exactly these sections, this order — research D1)

1. **Hero** — sara's fixture name, today summary, plain-text next-action hint. Professional/calm; NO pay wording, NO notification count, NO baked date, NO anchor.
2. **Today's schedule** — sara's session cards: time · course · room · labeled status chip · authored student count (`present` fixture literal via `num()`). No live-join affordance.
3. **My next class** — rich card (time/course/room/group) + the authored prepare hint + the honest backendRequired live note (never join-styled).
4. **Student follow-up board** — the two REAL follow-up cards (out15 st11 studentAbsent + support note · out4 st7 teacherAbsent/make-up), real outcome chips, gentle framing + the reassurance close (D3). No computed risk.
5. **My students** — the grp1 roster (st1/st6/st11/st13) as display-only cards: avatar · name · group/course label · lifecycle chip · authored learning note. No links.
6. **Session-outcome workflow** — the 5 display-only flowStep cards (attendance · remark · summary · homework note · files note) + the `outcomeSave` backendRequired mini-card (D5). No form controls.
7. **Recent sessions** (amendment A1 — T20/T21 explicit) — exactly 2 display-only cards from REAL sara outcome refs (out1 · out11): child-first, real `outcomeChip`, day label, summary/homework-note lines. No modal, no full-history route, no anchor.
8. **Homework & tasks** — 3 authored display-only task cards (due labels) + the `taskManage` planned mini-card (D6).
9. **Materials & library** — 3 authored display-only material cards (type icons) + the `matUpload` backendRequired mini-card (D7).
10. **Timetable & availability** — SAT/MON/TUE day-grouped agenda cards + the merged truthful free-days `.pt-empty` (WED/THU) + the `availabilityEdit` backendRequired mini-card (D8/D12). Never a grid.
11. **Monthly report rubric** — the 5 dimension lines display-only + inline backendRequired chip (D9). No answer scales.
12. **Requests & performance** — the certificate-request preview card (+ inline backendRequired chip) + the cancel/reschedule backendRequired note (amendment A2, T5) + the ONE sanctioned labeled admin performance link card (D10/D11).
13. **My account** — name/subject/status/availability rows (labeled chips) + the backendRequired editing note. No rating/util numerics.
14. **Closing honest note** — delivered-state summary; live/writes backendRequired; communications = Spec 016.

Amendment A2 also places the mark-absent backendRequired note (T4) inside section 6 (the workflow) — a non-anchor `.pt-note` with the labeled chip, zero controls.

## 2. MUST NOT

No `<table>`; no `<form>`/`<input>`/`<select>`/`<textarea>`; no admin chrome; no KPI wall; no pay token or figure (copy + comments); no computed score/rank/rating (the fixture `rating`/`util` never render); no join/start/save-styled control; no legacy layout cloning; no page-body anchor beyond the one sanctioned performance link; no section beyond this list without a contract amendment.

## Acceptance (binding)

1. **Given** both built files, **When** sections are enumerated, **Then** all 14 render in order with sara's fixture/authored data, ≥10 `.pt-section` blocks, zero tables, zero form controls.
2. **Given** the AR page at 390px, **Then** zero horizontal overflow (smoke probe + mobile frame).
3. **Given** desktop AR, **Then** hero + today + next class are visible without deep scrolling (the cockpit promise, reviewed in the full-page frame).

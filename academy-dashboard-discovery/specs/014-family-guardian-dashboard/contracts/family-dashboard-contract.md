# Contract: Family Dashboard Composition (Spec 014)

**Status**: Binding · Supersedes the Spec-012 `family-portal-foundation-contract.md` composition (extends — nothing removed, only deepened). References FR-001…FR-016; research D1/D2/D9/D10.

## 1. Composition (exactly these sections, this order — research D1)

1. **Hero** — fam1 guardian name, family summary, today reassurance, plain-text next-action hint. NO notification count, NO baked date, NO anchor.
2. **My children** — ALL FIVE fam1 children inline (name · level · lifecycle chip · gentle progress bar · per-child hint). NO switcher control of any kind (D2).
3. **Today's sessions** — child-associated cards (child · time · course · teacher · status chip), clear "what to know" wording; no join, no cancel control.
4. **Attendance & progress signals** — the authored family trio + the two REAL needs-attention cards (out15 st11 absence-follow-up · out12 st13 trial-cancel, real outcome chips, gentle framing) + the reassurance line (D9).
5. **Teacher notes** — 3 child-associated notes (summary/homework shape), display-only.
6. **Recent sessions** — the guardian F6 mirror: 3 child-first records (real out1 + real out15 + 1 authored; summary + homework-note lines; outcome chips where real) + the «السجل الكامل» planned mini-card (D7).
7. **Plans & subscriptions** — per-child plan-label rows + status chips. ZERO amounts (D3).
8. **Billing status** — ONE calm settled/attention status card + the «الفواتير والدفع» backendRequired mini-card. ZERO figures, NO pay-now (D3).
9. **Requests & communication hub** — four honest preview cards: cancel/reschedule (+ the no-replacement caution) · feedback-about-teacher rubric · meetings (the truthful `.pt-empty`, D10) · request-trial/add-child — each with its inline availability chip (D4/D5/D6).
10. **Family materials** — 3 child-associated display-only cards + the «تحميل الملفات» backendRequired mini-card (D8).
11. **My account** — guardian contact/joined/children rows + backendRequired editing note.
12. **Closing honest note** — delivered-state summary; requests/payment/live = backendRequired; communications = Spec 016.

## 2. MUST NOT

No `<table>`; no `<form>`/`<input>`/`<select>` elements; no admin chrome; no KPI wall; no computed score/rank; no switcher that doesn't switch; no fake pay/cancel/upload/voice/feedback/join controls; no currency token; no legacy layout cloning; no new links beyond the shell's; no section beyond this list without a contract amendment.

## Acceptance (binding)

1. **Given** both built files, **When** sections are enumerated, **Then** all 12 render in order with fam1 fixture/authored data, ≥10 `.pt-section` blocks, zero tables, zero form controls.
2. **Given** the AR page at 390px, **Then** zero horizontal overflow (smoke probe + mobile frame).
3. **Given** desktop AR, **Then** hero + children + today are visible without deep scrolling (the six-questions promise, reviewed in the full-page frame).

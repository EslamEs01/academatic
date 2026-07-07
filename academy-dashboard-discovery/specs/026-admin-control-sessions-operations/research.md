# Research & Decisions — Spec 026

Decisions D1–D31, each with rationale grounded in the spec artifacts + codebase evidence.

- **D1 — Evidence gate sufficient?** YES. The three-agent read-only audit (legacy admin ops · 20 admin-page actions · 25 portal pages) + built-HTML census + `enhance.js` dispatch read produced `legacy-admin-ops-coverage.md`, `current-action-inventory.md`, `dead-ui-register.md` with exact-path citations. No P0 gaps; every operational capability is covered/planned/excluded. Sufficient to plan without re-crawling.

- **D2 — Current public HTML count.** **91** (verified `find … | wc -l`).

- **D3 — Spec 026 page set + expected count.** New pages: `sessions-analysis`, `public-holiday`, `scheduled-actions` (×2 = +6). Folds (0 pages): total-queues, schedule-requests. Honest gates (0 pages): leads/tasks/messages/announcements/time-convertor. **Target = 97.**

- **D4 — Build `sessions-analysis`?** YES, standalone. Strongly grounded (`management-sessions-analysis.md` + full-page screenshot); it is core session-outcome operations. Display-only KPI board, authored counts, **no computed score/rank/chart** (no-score law M-13).

- **D5 — Build `public-holiday`?** YES, standalone. Grounded (`management-public-holiday.md`); core ops (bulk absence windows). List real; set-holiday/bulk-absence = `backendRequired` gate.

- **D6 — Build `scheduled-actions`?** YES, standalone. Grounded (`management-scheduled-actions.md`+create); core ops automation registry. List real; create/automation = gate (engine future-backend).

- **D7 — total-queues fold or standalone?** **Fold** into `sessions.js` (ops queue/notes band) — the legacy table was empty at crawl, so a standalone page would be mostly invented; folding keeps it honest and bounded. Add-queue = gate.

- **D8 — schedule-requests fold or standalone?** **Fold** into `schedule.js` (inbox preview band) — inboxes were empty and the accept/reject form was never captured; a preview + gated accept/reject is honest. Do not invent form fields.

- **D9 — Non-core planned items.** leads, tasks, messages, announcements, time-convertor stay **honest `data-coming-soon` planned nav gates**, owner-recorded (leads→029/CRM-future, tasks→ops-future, messages→future-backend/M-02, announcements→future-backend, time-convertor→utility-future). Not built (out of the tight sessions/ops core; avoids scope creep).

- **D10 — Create/Add/New modal strategy.** Primary stays active → opens a create modal (`data-modal-trigger`/`openModal()` reading a baked `<template>` of the entity's fields) → the modal's **final Save/Create** is a `backendRequired` gate (a labeled note + disabled-with-reason Save). Where a full field modal is disproportionate, align to the finance Create-invoice sanctioned gate (`data-disabled-reason` backendRequired). Reuses existing `openModal()`; no new hook.

- **D11 — Edit modal strategy.** Edit opens a prefilled read-only modal (or the existing `data-drawer` details sheet with an Edit affordance) → final Save = `backendRequired`. Reuse `openModal()`/`openSheet()`.

- **D12 — Delete/Cancel/Suspend confirmation.** Keep `data-confirm`/`openConfirm()` (already a real, accessible modal) → reword CTA + `data-confirm-toast` to state backend-required; never a success toast; never DOM-fake the mutation (D19).

- **D13 — View/Details drawer.** Keep `data-drawer`/`openSheet()` read-only entity previews (already honest); any write inside = gate. No change except ensuring internal write verbs follow Tier-2.

- **D14 — Export/Print/Download gate.** All → `backendRequired` gate. Print (reports+finance) currently `data-demo-action` → align to the adjacent Export CSV/PDF `data-disabled-reason` gate. No fake file generation.

- **D15 — Upload gate.** No admin upload exists today; if an ops surface needs one (e.g., attendance files), it is a `backendRequired` gate, no fake upload. (Upload otherwise lives only on portals — unchanged.)

- **D16 — Save/Submit/Send final.** Every persist → `backendRequired` gate (modal final step or disabled-with-reason). No fake save.

- **D17 — Join/Live/Start/End.** `backendRequired`/`future-backend` gate only; no fake live room, attendance write, or meeting engine (G13, excluded-by-law).

- **D18 — DU-01…DU-20 fix strategy.** Per `dead-ui-register.md` tiers, summarized in `plan.md` §4. Tier 1 (create modals→backendRequired), Tier 2 (shared-component verbs→modal/gate), Tier 3 (confirm wording), Tier 4 (dashboard filter Option A/B).

- **D19 — DU-21 build/fold/gate.** Build 3 core pages (D4–D6); fold 2 (D7–D8); the rest stay honest gates.

- **D20 — DU-22 future-owner.** leads/tasks/messages/announcements/time-convertor recorded to owners in `future-owner-register.md`; converted to/kept as honest planned gates; smoke asserts they are non-anchor `data-coming-soon` (never dead).

- **D21 — Shared-component reclassification.** Fix the ~8 shared components ONCE (`appointment-details.js`, `outcome-details.js`, `enhance.js` rowMenu/familyMenu, `teacher-actions.js`, `course-group-actions.js`, `finance-actions.js`, `settings-section.js`, `wizard.js`) → propagates the honest outcome to all pages that bake them. Re-verify each touched admin page's built output (byte-diff review).

- **D22 — Dashboard Apply/Clear widget.** Preferred **Option A**: wire to the real `data-filter` engine (reuse `data-filter-form`/`-apply`/`-reset`) if the widget selects allow it with closed hooks. Fallback **Option B**: reword to a static "showing today" label (remove the fake Apply/Clear). Decided after inspecting the widget markup; both honest.

- **D23 — Closed data-hook strategy.** **No new hook, no new storage key.** The pass changes attribute values (`data-demo-action`→`data-disabled-reason`/`data-modal-trigger`/`data-confirm` rewording) + adds baked modal `<template>`s + optional `data-filter` wiring — all existing hooks. A new hook is a last resort requiring explicit justification; current analysis shows none needed.

- **D24 — Modal/gate copy AR/EN.** All new copy mirrored AR (RTL, default) + EN (LTR), under existing key namespaces (admin `nav.*`, page-specific `*.act.*`/`*.gate.*`). Honest wording ("… requires the server / يتطلب الخادم"), no "saved/done", no pay tokens on teacher/family, no student-primary wording. No raw keys.

- **D25 — Smoke action-completion strategy.** Extend `tests/smoke/run.cjs` (additive): count=97; 3 new pages load + ops gates present; 3 nav flips (planned→implemented); action-completion asserts (reclassified Create/Edit/Delete/Save/Print resolve to modal/drawer/gate, not «preview action»; confirm finals backendRequired; dashboard Apply/Clear honest); `href="#"`=0; every `data-action` handled-or-gated. Keep payHit/famPay/child-view/admin-finance/portal asserts **byte-verbatim**.

- **D26 — A11y modal/drawer/focus.** Extend `tests/a11y/run.cjs`: 3 new pages (AR light/dark + EN sample) + at least one modal-open state + one drawer-open state; verify focus trap, `Escape`, aria labels on gates; dark/light; mobile-390; critical=0 serious=0. (Existing `enhance.js` modal/drawer already implement focus trap + Escape.)

- **D27 — Screenshot plan.** Extend `tests/screenshots/capture.cjs`: 3 new pages AR desktop + ≥1 EN + a create modal + a details drawer + one action-gate + dashboard filter proof (if Option A) + mobile-390 + dark. Update `REVIEW.md`.

- **D28 — Role-law protection.** Teacher pay-free (extended token set), family zero-pay, student child-view «عرض الابن», admin finance Spec-009 invariant (authored literals only, zero salary/payroll figures) — all re-verified + smoke asserts byte-verbatim. Portal components are not touched (admin components differ), so portal output stays byte-identical.

- **D29 — Impact protection.** Only the touched admin pages/components change; unrelated admin pages + all 49 portal files + index stay byte-identical (byte-diff proof). `package.json`/dependencies unchanged; no backend/engine.

- **D30 — Allowed/forbidden files.** Per `plan.md` §9 (narrowed). Forbidden: `package.json`, deps, backend/auth, forbidden role pages, new engines, new hook/key.

- **D31 — Risks/stop conditions.** Per `plan.md` §11 + `contracts/scope-guard.md`. Biggest risks: (a) shared-component reclassification regressing an unrelated admin page (mitigate: per-page byte-diff review); (b) create-modal scope creep (mitigate: gate-align where a modal is disproportionate); (c) dashboard filter honest-wiring (mitigate: Option B fallback). None blocking.

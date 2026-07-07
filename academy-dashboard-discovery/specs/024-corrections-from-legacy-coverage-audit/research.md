# Research — Spec 024 Corrections From Legacy Coverage Audit

**Date**: 2026-07-07
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Spec 023 + Spec 024 present as uncommitted working-tree baseline; 77 public HTML.
**Method**: resolved D1–D22 by re-reading the Spec 024 evidence files + the Spec 023 backlog/registers + the current app files each B-item touches (recorded in `evidence-review.md`). Every decision below is Decision / Rationale / Alternatives.

---

## D1 — Evidence gate sufficiency

**Decision**: Sufficient. All six Spec 023 backlog/register files and every current file each B-item touches were opened (`evidence-review.md`). The 11 confirmations in the plan request are all verified:
- B-01 targets only the student child-view note (`ar.prt.js:297-298`, `en.prt.js:294`); family (`:387-388`) and teacher (`:446-447`) notes are correct and out of scope. ✔
- B-02 Locations = ownership/documentation, no page (`nav.config.js` has zero "location" hits). ✔
- B-03 admin gate exists (`enhance.js:82` `notificationsMenu()`) and must not be duplicated; role portals have no notifications surface (`portal-shell.js:56,59` = theme+lang only). ✔
- B-04 live-room has no real capture (redirected home copy) → future-backend. ✔
- B-05 teacher library absent from `ROLE_NAV.teacher` (schedule/students/outcomes/tasks/reports/profile). ✔
- B-06 chat is future/backendRequired; send-form never captured. ✔
- B-07 exemption documents, does not weaken. ✔ · B-08/B-09 provenance records. ✔ · B-10 verification, restore only if deleted. ✔ · B-11 small density polish only. ✔
**Rationale**: no evidence gap blocks planning; the one true gap (B-04 live-room capture) is itself the decision (future-backend).
**Alternatives**: order a fresh live-session crawl now — rejected as out of scope for a correction spec and not required to plan honestly (recorded future-backend).

## D2 — B-01 child-view note implementation strategy

**Decision**: Edit only the student `noteT`/`noteD` keys in `ar.prt.js:297-298` and `en.prt.js:294` (and the shipped mirror `app/public/assets/locales/ar.prt.js` regenerates on rebake). New wording aligned to the existing «عرض الابن» vocabulary already in the file (`ar.prt.js:205/209/214`):
- ar `noteT: 'عرض الابن — النسخة الأولى'`; `noteD` guardian-addressed (e.g. «هذه معاينة لوحة الابن ضمن حساب العائلة. الجلسات المباشرة وتعديل الحساب يتطلبان الخادم؛ الرسائل والإشعارات لاحقًا.»).
- en `noteT: 'Child view — part of the family account'`; `noteD` guardian-addressed.
Then rebake the 6 affected pages (home `student-portal` + 5 internals `student-homework/history/profile/progress/materials`) × 2 langs. `student-schedule` carries no note → untouched.
**Rationale**: the note is a locale key rendered into `#page-body`; a locale edit + rebake is the minimal, no-new-hook change and reuses the correct child-view vocabulary already present.
**Alternatives**: edit the built HTML directly — rejected (build is source-of-truth; would desync locales). Add a new key — rejected (reuse the existing `noteT`/`noteD`).

## D3 — Hash supersession strategy for the six pages

**Decision**: Smoke (`run.cjs`) uses **structural probes** (`sectionCount`, `bodyAnchors`, `idHero/railStops/storyRows`, `childViewLinks`, `formControls`, `plannedNavAnchors`) on `#page-body`, NOT live md5/byte-hash asserts. The `pt-note` reframe changes text only — it changes **no** counted structure. Therefore: (a) declare, in the 024 correction record + an append-only note to `specs/022-…/`, that the Spec 022 documented extraction-hash baseline for the 5 affected internals (10 of the 12 recorded hashes; `student-schedule`'s 2 remain) is **intentionally superseded** by B-01; (b) re-run smoke to confirm the structural probes are unchanged; (c) record the new baseline as declared, not accidental.
**Rationale**: honors the byte-freeze contract's intent (no silent body change) while recognizing smoke never pinned md5 — so no live assert needs editing unless a new probe is added.
**Alternatives**: add a live md5 assert now — rejected (out of scope; would introduce a new gate mid-correction). Bypass the freeze silently — forbidden by law.

## D4 — Grep checks for forbidden student-primary wording

**Decision**: The acceptance gate is:
```
grep -RIl "لوحة الطالب"  app/public/student-*.html      → 0
grep -RIl "بوابة الطالب" app/public/student-*.html      → 0
grep -RIl "student dashboard" app/public/student-*.en.html → 0
grep -c  "لوحة العائلة" ar.prt.js  (family note) unchanged
grep -c  "لوحة المعلم"  ar.prt.js  (teacher note) unchanged
```
**Rationale**: directly encodes SC-001; catches ar + en variants; guards the scope trap (family/teacher notes unchanged).
**Alternatives**: broader `طالب` grep — rejected (too broad; «الطالب» legitimately appears in child-view content like «الطالبة»); the precise phrases are the correct target.

## D5 — B-02 Locations owner documentation target

**Decision**: Record owner = **Spec 031** (admin management/content/certificates/settings, as a display slice inside settings/general — legacy general settings already carries Country/City/Timezone/Address). Documentation targets: this spec's `correction-scope.md` (already), plus an append-only note to `specs/023-…/coverage-matrix.md` §Locations row and the `missing-capabilities-register.md` M-04 status. No `nav.config.js` change (no honest place exists yet; a nav item would imply a planned page 031 owns). No page built.
**Rationale**: a pure ownership decision closes M-04/B-02 without inventing UI; 031 is the natural home per the legacy general-settings evidence.
**Alternatives**: add a planned nav item now — rejected (would pre-empt 031's IA and imply an owned surface not yet designed).

## D6 — B-03 role-shell notifications: gate vs futures-only

**Decision**: **Option A** — add an honest role-shell notifications gate, **conditional** on it reusing the existing pattern with zero new hooks; else fall back to **Option B** (futures record). The existing admin gate (`enhance.js:82` `notificationsMenu()`) is wired via `data-action="notifications"` (`enhance.js:519`) and uses existing `topbar.notif*` locale keys — all reusable by the role-portal topbar. Plan Option A: add a `data-action="notifications"` icon-button to `portal-shell.js`'s topbar (beside theme/lang), which the existing `enhance.js` popover handler already serves (Soon-badged, `aria-disabled`, `data-disabled-reason` — no fake count/read state). If, during implementation, wiring the role-shell topbar to the admin popover proves to need any `enhance.js` change beyond the existing action, **stop and switch to Option B** (record notifications as future-backend in the correction/coverage docs, no UI).
**Rationale**: Option A improves capability-presence parity (guardians/teachers regain the honest "something needs attention" gate) using an existing, honest, hook-free pattern; the fallback keeps the scope-guard hard (no new engine).
**Alternatives**: build a role-specific notifications component — rejected (new surface/hook). Fake a count/badge — forbidden.

## D7 — B-03 Option A interaction strategy without new hooks

**Decision**: Reuse verbatim: the `data-action="notifications"` attribute (existing), the `enhance.js` `openPopover(trg, notificationsMenu())` handler (existing, `enhance.js:519`), the `topbar.notifications` / `topbar.notifViewAll` / `topbar.notifViewAllReason` locale keys (existing), and the `badge-soon`/`is-soon`/`aria-disabled` honest-gate classes (existing). The ONLY edit is markup in `portal-shell.js` adding the bell icon-button to the role topbar. No `enhance.js` edit, no new hook, no new storage key. If a role-portal page does not already load `enhance.js`, confirm it does (it does — the portal pages enhance) before relying on the handler.
**Rationale**: the popover handler is generic (`data-action="notifications"`), so the role topbar inherits the honest gate for free.
**Alternatives**: a static inline `pt-guide` gate in `#page-body` instead of the topbar — viable Option-A2 (no `enhance.js` dependency at all); kept as the fallback-within-A if topbar wiring is unexpectedly page-scoped. Recorded in the B-03 contract.

## D8 — B-04 live-room future-backend record strategy

**Decision**: Record the teacher live-room as **future-backend** in this spec's `correction-scope.md` (already) + an append-only status note to `specs/023-…/coverage-matrix.md` (teacher `session-class-room` row moves from `unclear-needs-review` → `intentionally-excluded / future-backend`) and `missing-capabilities-register.md` M-05. No app change; teacher live/room actions remain honest gates; no fake enter/end-class/attendance-write is added.
**Rationale**: no live capture exists; the honest disposition is future-backend, matching the no-fake-live-surface law.
**Alternatives**: fresh crawl — deferred (not required to plan; recorded as an optional future evidence task).

## D9 — B-05 teacher library: nav item vs 025 fold

**Decision**: **Option A** — add ONE honest planned `library` item to `ROLE_NAV.teacher` (`portal.js`), rendered as a non-anchor `is-planned` «قريبًا» button (the existing pattern; `plannedNavAnchors===0` holds), owner Spec 025. Add mirrored `prt.nav.tch.library` ar/en keys. No page built.
**Rationale**: makes the retained capability honestly visible (closes M-03 "invisible ≠ gated") with the smallest change, reusing the existing planned-button pattern; 025 then builds the real page.
**Alternatives**: Option B (record a 025 fold decision, no nav item) — kept as fallback if adding a 7th teacher nav item is judged to crowd the rail; the B-05 contract lets 025 collapse it into an owned page instead. Either way the decision is recorded.

## D10 — B-06 teacher chat: planned gate vs explicit exclusion

**Decision**: **Explicit teacher-side exclusion, recorded** — do NOT add a teacher chat nav item in 024. Chat's only sequenced owner is the admin-side preview (Spec 026); the teacher-side send-form was never captured (UNCONFIRMED). Record: teacher chat = backendRequired/future, owner decision deferred to 025's scoping (025 may add an honest «قريبًا» chat item if the teacher IA warrants it, or leave it to the admin 026 preview). No fake chat, no invented send fields, no nav item in 024.
**Rationale**: unlike library (a retained fixture capability), teacher chat has no retained teacher-side fixture and an unconfirmed contract; adding a gate now would assert a capability shape not evidenced. Recording the decision is the honest close.
**Alternatives**: add a planned chat item now — rejected (asserts an unconfirmed teacher-side surface); build admin preview — out of 024 scope (026).

## D11 — B-07 pay-free exemption documentation location

**Decision**: Append the written exemption to `specs/016-…/contracts/teacher-pay-free-global-contract.md` (the binding global contract) and cross-reference it from `specs/022-…/contracts/teacher-pay-free-contract.md`. The exemption states: `teacher-performance.html` is a pre-existing **Spec 007 admin** board (admin `app-shell`, `activeId teacherKpi`); its `#page-body` is pay-free and smoke-asserted (`run.cjs:548-561`); the الرواتب tokens are ADMIN-shell nav chrome, not teacher-owned content; the sanctioned teacher-home→performance anchor is grandfathered pending the Spec 025 repoint to the real `teacher-reports` internal. Also record a 025 task: repoint `teacher-portal.html:378` and demote the admin-board link to admin-only.
**Rationale**: documents the tension precisely without weakening the pay-free grep; schedules the real fix in 025.
**Alternatives**: repoint the anchor now — rejected (the target 025 page does not exist yet; would break the sanctioned smoke pin). Rename `teacher-performance.html` — rejected (admin surface; out of 024 scope).

## D12 — B-08/B-09 provenance documentation location

**Decision**: Consolidate the exclusion + finance-boundary provenance into: (a) this spec's `correction-scope.md` provenance rows (B-08/B-09), (b) an append-only "Intentional Exclusions Register" note to `specs/023-…/missing-capabilities-register.md` (M-10…M-16 already list them — add the status "recorded in 024"), and (c) a concise boundary line in `app/README.md` + the CLAUDE.md hard-constraints block. The finance boundary sentence: *authored admin invoice-amount literals on admin finance pages are Spec-009-sanctioned (zero aggregate, zero runtime math, admin-only); salary/payroll/compensation/payout figures are NEVER allowed anywhere; family and teacher surfaces stay figure-free.*
**Rationale**: durable, discoverable records in the two places future passes read (README/CLAUDE + the 023 register); prevents both "restore the excluded surface" and "copy amounts onto family/teacher" mistakes.
**Alternatives**: a new standalone doc — rejected (proliferation; the 023 register + README/CLAUDE are the canonical homes).

## D13 — B-10 moved-vs-deleted verification method

**Decision**: Verification steps: (1) open `app/screenshots/before-022/teacher-portal__ar__light__desktop.png` vs current; (2) read `specs/022-…/contracts/{teacher-living-home-contract.md, impact-protection-contract.md, smoke-rescope-contract.md, visual-regression-screenshot-contract.md}`; (3) determine whether the pre-022 rail prep-hint/count content was **moved** (still reachable via the flowStrip/counters/quick-links) or **deleted**. If moved → record where, close the row. If deleted → restore as real content inside the rail card body (feeds B-11's D-01), never a fake control. Also record the family-children no-fold-link as an **intentional** deviation (B-17 protection: do NOT add per-child child-view links). Result recorded in `correction-scope.md` + an append-only 023 note.
**Rationale**: the impact-protection + smoke-rescope contracts are the authoritative record of what 022 moved; comparing them to the before/after screenshots resolves moved-vs-deleted deterministically.
**Alternatives**: restore blindly — rejected (would re-add content that may already be reachable, contradicting the contracts).

## D14 — B-11 visual-density scope and pages/bodies touched

**Decision**: Scope = the design-register rows that are pure-CSS-solvable on the additive living layer: **D-01** (rail second content column/cap), **D-06** (role-tinted dark-hero tokens), **D-07** (schedule day-row hierarchy), **D-08** (hub 2-up primary row), **D-10/D-11/D-12** (delight touches on family-requests/family-internals/teacher all-clear strip), **D-13** (mobile topbar no-wrap). Rows that touch pinned `#page-body` bodies — **D-04** (family-children storyRow), **D-05** (compact stat tiles), **D-09** (7-cell week strip) — are included ONLY with a declared hash supersession + smoke re-pin; if any of D-04/D-05/D-09 cannot be done purely in the living CSS layer (needs markup), it is deferred to a later design spec rather than forced. **D-02 is F-00-1 → handled by B-01, not B-11.** All edits additive in `app.css`'s living layer; empty-state copy edits in ar/en; motion stays in the one reduced-motion block.
**Rationale**: maximizes the owner-valued visual payoff at low risk; the CSS-only rows carry zero byte-freeze cost, and the body-touching rows are gated behind the supersession discipline or deferred.
**Alternatives**: do all D-rows now — rejected (D-04/D-05/D-09 may need markup = pinned-body churn; defer rather than force). Skip B-11 — rejected (Should-Fix; the owner cares about visual quality).

## D15 — Smoke amendment scope

**Decision**: Minimal. (a) B-01: no new assert needed (structural probes unchanged); optionally add a guard assert that child-view `#page-body` bodyText does NOT match `/لوحة الطالب|بوابة الطالب|student dashboard/i` — a ONE-line honest addition to the existing role-model pin block. (b) B-03 Option A: if the topbar gate is added, extend the shell-anchor/plannedNav probe expectations to accept the new `is-soon` notifications control (non-anchor, so `plannedNavAnchors` unaffected; verify the shell-anchor multiset still holds). (c) B-05 Option A: if a `library` planned item is added, bump the ROLE_NAV.teacher planned-count expectation from 6 to 7 and keep `plannedNavAnchors===0`. (d) B-11: re-pin any structural probe whose count changes (e.g., a new stat-tile wrapper) with a declared reason. Every amendment is ONE sanctioned change, documented; `payHit`, `famPay`, admin asserts stay BYTE-VERBATIM.
**Rationale**: the smoke suite is the correction's safety net; amendments are additive and declared, never loosening the pay/role guards.
**Alternatives**: large smoke rewrite — rejected (correction spec, not a test refactor).

## D16 — a11y / screenshot scope

**Decision**: a11y (`tests/a11y/run.cjs`): critical = 0, serious = 0 preserved; if B-03 adds the topbar gate, assert the `aria-disabled="true"` + `aria-label` honest-gate a11y (keyboard-focusable, non-activating). Screenshots (`tests/screenshots/capture.cjs` + `REVIEW.md`): capture after-shots for — a child-view page (B-01 note proof) + family note + teacher note (unchanged proof); role-portal topbar (if B-03 gate added); teacher home (if B-05 library item added); hub/family/teacher/student after the density pass; a dark-mode hero (if B-06/D-06 touched); mobile-390 proof. 
**Rationale**: matches the visual-acceptance law (screenshots) + honest-gate a11y; scoped to what changed.
**Alternatives**: full screenshot re-capture — acceptable but unnecessary; scope to changed surfaces.

## D17 — Teacher pay-free protection strategy

**Decision**: The three-layer enforcement stays binding and is RE-RUN after every 024 change: (1) source grep (incl. comments) over the teacher family, (2) built grep over teacher pages, (3) smoke `payHit` (byte-verbatim). B-07 strengthens the contract (adds an exemption for the admin board) without touching the grep. No teacher-owned surface gains any pay token; B-05 library and any B-11 teacher delight copy are pay-free.
**Rationale**: the pay-free GLOBAL law is non-negotiable; 024 only documents the pre-existing admin-board exemption, never adds teacher pay wording.
**Alternatives**: none — this is a hard law.

## D18 — Family zero-pay protection strategy

**Decision**: `famPay`/`payFigure` regex stays green on all 18 family bodies after any B-11 family density copy; no family payment token is added; family-billing stays status-first (hour-quota). Re-run the family zero-pay scan after B-11.
**Rationale**: hard law; B-11 family delight copy («جميع الفواتير مسوّاة» celebration) is status-only, figure-free.
**Alternatives**: none.

## D19 — No-new-pages / no-new-hooks guard

**Decision**: Enforced by `scope-guard.md`: the build PAGES registry (`build-html.mjs`) is NOT edited (forbidden file); no new `data-*` attribute name is introduced (B-03 reuses `notifications`, B-05/B-06 reuse `is-planned`); no new storage key. Smoke asserts the closed hook set implicitly (any new hook would surface as an unexpected control). Public HTML count asserted = 77.
**Rationale**: the two most drift-prone risks (a new page, a new hook) are both pinned by existing guards + the forbidden-file list.
**Alternatives**: none.

## D20 — Public HTML count guard

**Decision**: `find app/public -maxdepth 1 -name "*.html" | wc -l` MUST equal 77 before and after; B-01 rebakes existing files (no add/remove); no page module added. Smoke load-count stays at its pinned value.
**Rationale**: SC-005; the single clearest anti-drift metric.
**Alternatives**: none.

## D21 — Allowed / forbidden file list

**Decision**: **Allowed**: `ar.prt.js`, `en.prt.js`, `fixtures/portal.js` (B-05 only), `components/portal-shell.js` (B-03 Option A only), `styles/app.css` (B-11), `tests/{smoke,a11y,screenshots}` (re-pin/coverage), `screenshots/REVIEW.md`, `README.md`, `CLAUDE.md`, `specs/016-…/contracts/teacher-pay-free-global-contract.md` (B-07), `specs/022-…/contracts/` (append-only 022-hash-supersession + B-10 notes), `specs/023-…/` (append-only status notes), `specs/024-…/` (these docs). Built outputs from rebake: `public/student-*.html`, `public/student-*.en.html`, `public/assets/locales/*`, `public/assets/*` (+ any shared-asset rebake). **Forbidden**: new page modules, `build-html.mjs`, `package.json`, `nav.config.js` (unless a proven-safe B-02 doc note), `enhance.js` (unless a hard B-03 blocker), `topbar.js`, admin/teacher-internal page source, backend/API/auth, new dependencies.
**Rationale**: mirrors the plan's Project Structure; the conditional files (portal-shell/portal.js) are gated by their chosen option.
**Alternatives**: none.

## D22 — Risks and stop conditions

**Decision**: Stop and report if: public HTML ≠ 77 · a new page/hook/storage key is needed · a teacher/family pay token appears · student-primary wording remains after B-01 · the family/teacher role notes change accidentally · a role-shell notifications gate needs a new engine (→ fall back to B-03 Option B) · the live-room cannot be recorded honestly · B-11 becomes a redesign · a smoke hash change cannot be explained · the admin/family/teacher role model regresses. Residual risks: (r1) B-03 topbar wiring proves page-scoped → use Option A2 (inline `pt-guide`) or Option B; (r2) B-11 D-04/D-05/D-09 need markup → defer those rows; (r3) B-05 7th nav item crowds the rail → use Option B fold record.
**Rationale**: the stop-conditions are the correction spec's tripwires; each risk has a pre-planned safe fallback so implementation never improvises.
**Alternatives**: none.

---

## Summary of chosen options

| Item | Decision |
|---|---|
| B-01 | Locale reframe (ar/en) + rebake 6 pages + declared 022-hash supersession |
| B-02 | Owner = 031; documentation only (no nav item, no page) |
| B-03 | **Option A** (honest topbar gate reusing `data-action="notifications"`, no new hook); fallback A2 inline gate / Option B futures record |
| B-04 | Future-backend record; matrix row → intentionally-excluded/future-backend |
| B-05 | **Option A** (one honest planned `library` nav item; `plannedNavAnchors===0` holds); fallback Option B fold record |
| B-06 | **Explicit teacher-side exclusion recorded**; no nav item (owner decision to 025); admin preview stays 026 |
| B-07 | Written exemption in the 016 pay-free contract + scheduled 025 anchor repoint |
| B-08/B-09 | Provenance records in 023 register + README/CLAUDE; one-sentence finance boundary |
| B-10 | Verify moved-vs-deleted vs 022 contracts + before-022 shots; restore only if deleted; record |
| B-11 | Pure-CSS density pass (D-01/06/07/08/10/11/12/13 now; D-04/05/09 with supersession or defer) |

Zero NEEDS CLARIFICATION remain. Ready for Phase 1 artifacts.

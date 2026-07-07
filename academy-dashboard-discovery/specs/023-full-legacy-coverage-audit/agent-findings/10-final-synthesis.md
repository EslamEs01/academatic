# Agent 10 — Final Synthesis

Spec 023 · Full Legacy Coverage Audit 000–022 · Audit date 2026-07-06
Baseline: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Specs 020/021/022 committed; 77 public HTML files.

This file closes the audit: it records the cross-register contradictions found and how they were resolved, the overall verdict, per-role verdicts, and the recommended Spec 024 scope. It was written by the main audit session after the two evidence agents (07 teacher, 08 design) and the artifact writers completed; the backlog + this synthesis were authored directly from the on-disk registers when the workflow's backlog/critic stages were cut off by the session limit.

## Method note (how the audit actually ran)

Executed as a multi-pass fan-out: 11 evidence passes (`agent-findings/00`…`09`, screenshots split per role) → 9 synthesis artifacts → this synthesis + the 024 backlog. The workflow was interrupted twice by session limits; every evidence finding and 7 of 9 synthesis artifacts were written by subagents, and the 4 remaining artifacts (`coverage-matrix.md`, `visual-grounding.md`, `correction-backlog-for-024.md`, this file) were authored by the main session from the completed evidence — nothing was invented, every claim keeps an evidence path back to a finding or a repo file.

## Cross-register contradictions found and resolved

1. **F-00-1 vs finding 09's "0 needs-correction"** — finding 09 (written earliest) reported zero needs-correction current pages; findings 00/06/08 + the role-model audit later confirmed the «لوحة الطالب — النسخة الأولى» footer survives on 6 of 7 child-view pages. Resolved in favor of the later, directly-grepped evidence: the extra-or-drift register amended 6 rows (X-24, X-26…X-30) to carry needs-correction (F-00-1) and superseded 09's zero count; the coverage matrix child-view rows carry `Correction needed? = Yes`. The role model itself remains intact (shell framing dominates) — this is copy-level, routed to B-01.
2. **`teacher-performance.html` role** — finding 09 classified it done/keep; finding 07 verified it is an ADMIN `app-shell` surface carrying `finance.html` + الرواتب nav chrome despite the `teacher-*` filename the pay-free contract's letter covers. Both are right about different layers (body pay-free + smoke-asserted `run.cjs:548-561`; file-level nav = admin shell chrome). Resolved: legacy-grounded-improved as an admin board, but needs a written pay-free-contract exemption (B-07) and 028 re-pin.
3. **Teacher denominator** — 02c/07 agreed 26 raw captures fold to ~17 honest capabilities (4 dead-404, 3 redirect-home copies, 1 `/profile` 500, 5 history/monthly → 2). Applied consistently in the matrix and missing register so "missing" is never overstated.
4. **family-children fold link** — 022 spec draft mentioned per-child fold links; implementation sanctioned family-child ONLY. Resolved as INTENTIONAL (per-child links would be dishonest — preview persona is st1); B-17 protects it from being "fixed".
5. **Date "undefined"** — several synthesis files initially carried `Date: undefined` from an interpolation miss; reconciled to the audit date 2026-07-06 (recorded in `00-main-session-grounding.md`).

No other conflicts required adjudication; findings 01/04/06 agreed on the role model, hub shape, ROLE_NAV registries, and smoke pins, and the three load-bearing greps (noteT lines, the 6-file «النسخة الأولى» set, the zero-hit «بوابة الطالب» scan) were re-run and reproduced exactly.

## Overall audit verdict

**The rebuilt academy dashboard is traceable to the legacy system and is NOT drifting into a different product.**

- **Forward direction (legacy → current)**: every legacy capability is implemented, improved, merged, honestly gated/planned under the DEC-009 sequence (025–031), intentionally excluded by a binding law, or a single `unclear-needs-review` item (admin Locations, B-02). All 300 admin captures, 13 family pages, and ~17 teacher capabilities are owned; the 43 admin future items re-verify against the 016 57-row inventory EXACTLY.
- **Reverse direction (current → legacy)**: all 38 page pairs + `index.html` trace to a legacy route, a legacy capability, or sanctioned demo/hosting infrastructure. Zero orphan pages, zero random surfaces, zero pages recommended for removal.
- **Every divergence from legacy is a LAW, not drift**: the dropped family Amount column, the excluded teacher salary surfaces, the excluded admin payroll figures/charts, and the pay-signal leaks are intentional zero-pay/pay-free/no-engine exclusions with visual legacy proof.
- **No P0 blockers.** The worst confirmed defect is F-00-1 (six baked footer notes with pre-021 phrasing), a knowing by-law byte-freeze leftover with a fully specified 024 correction.

## Per-role verdicts

- **Admin** — Complete and correct. 14 pages shipped and legacy-grounded (incl. the net-new attendance board); 43 capabilities honestly sequenced for 026–031; finance is status-first with figure-free GATE shells (charts + payroll math excluded by law, admin invoice literals sanctioned by Spec 009). One genuine hole: the RBAC Locations group has no owner (B-02). Deep audit confirms the admin surface is under-built by design (sequenced), not overbuilt or drifting.
- **Family/Guardian** — Strongly covered after Specs 020/022 (as hypothesized, now verified). 13/13 legacy capabilities accounted; living cockpit; family zero-pay verified at all three layers; the child journey is family-owned end-to-end through family-child. One cross-cutting missing capability (notifications, B-03) and the child-view copy leftover (B-01).
- **Teacher** — Home improved to a living, pay-free cockpit; internals correctly planned for Spec 025; pay-free GLOBAL verified at all three layers (0 hits on built/source/locales; smoke `payHit` byte-verbatim). Two open decisions (library gate B-05, chat ownership B-06), one anchor-hygiene item (B-07), one crawl gap (B-04). Teacher is visually the thinnest role today — by sequencing, not by drift.
- **Role model** — Consistently implemented and machine-guarded; 9/9 checks PASS; the demoted child-view is the correct classification (student demoted, not deleted; hub encodes 2 primary roles + admin + demoted preview). One confirmed copy-level contradiction (F-00-1), routed to 024.
- **Design/UX** — The rebuild is decisively ahead of legacy on every opened surface pair; remaining debt concentrates in one repeated empty-card pattern (D-01/D-05/D-09) + a dark hero wash + family-internal delight gaps — resolvable in one pure-CSS Spec-024 pass (B-11).

## Recommended Spec 024 scope (one list)

1. B-01 child-view wording reframe (Must; hash-supersession-guarded).
2. B-02 Locations owner decision (Must).
3. B-03 notifications honest gate/register (Must).
4. B-04 live-room crawl order (Must).
5. B-05/B-06 teacher library + chat gating decisions (Should → feed 025).
6. B-07 pay-free contract exemption for the Spec 007 board (Should).
7. B-08/B-09 exclusion + provenance register entries (Should).
8. B-10 rail moved-vs-deleted verification (Should → feeds B-11).
9. B-11 one pure-CSS visual-density / living-uplift pass (Should; resolves D-01/D-04–D-13).
10. B-12…B-18 hygiene, documentation, protective records (Later / Do-not-fix).

## Continuation gate

**GO — conditional** for Spec 025 (Teacher Internal Pages) after 024, provided 024 closes B-04 (live-room), B-05 (library gate), B-06 (chat ownership), and B-07 (pay-free exemption). The teacher home + pay-free enforcement are already sound, so 025 can begin on the pay-free internals even if those decisions are absorbed as it lands them — but recording them in 024 is the cleaner path.

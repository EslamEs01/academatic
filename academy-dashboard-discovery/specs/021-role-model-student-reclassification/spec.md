# Feature Specification: Role Model & Student Reclassification Audit

**Feature Branch**: `feature/012-role-portal-foundation` (spec-only; no branch change)
**Created**: 2026-07-05
**Status**: Audit complete — decisions recorded; implementation delegated to Specs 022/024
**Input**: The user's corrective verdict — stop new page development; the dashboards feel static and
dead; the role model may have drifted (legacy = Admin/Family/Teacher with students managed under
Family); audit and correct before building more.

## Why this spec exists

Specs 012–020 delivered a technically complete four-portal frontend (admin + student + family +
teacher + hub). The user's review found two possible drifts: an invented standalone **Student role**,
and a **static card-gallery presentation** that loses to the legacy system's living, operational
feel. Spec 021 is an evidence-first audit: prove the correct role model from the legacy crawl,
decide the student question, diagnose the deadness, brief the redesign, and re-sequence the roadmap.
**No app files change in this spec.**

## Companion artifacts (normative)

- `visual-grounding.md` — the mandatory evidence record (L1–L8 legacy, C1–C7 current; all opened).
- `role-model-decision.md` — audit answers A/B/C/D and binding decisions DEC-001…DEC-009.
- `current-vs-legacy-map.md` — page-by-page current↔legacy alignment with verdicts.

## User Scenarios & Testing

### User Story 1 — The product owner gets a proven role model (Priority: P1)

The owner asks: "Is Student a real role, or did we invent it?" Spec 021 answers from evidence: the
legacy has exactly three logins (Admin/Teacher/Family); every legacy `student-*` route is a guardian
surface; the rebuilt Student portal is correctly-derived content under a wrong top-level label.

**Acceptance**: `visual-grounding.md` shows the three proofs (filesystem, inventories, pixels);
DEC-001/DEC-002 are recorded with Option A adopted and Options B/C dispositioned.

### User Story 2 — The Spec 019 investment is protected (Priority: P1)

The owner must not lose the six student pages already built. The audit reclassifies them as "the
child's own view" under the family journey — preserved byte-for-byte until an implementing spec
re-links entry points under its own contracts.

**Acceptance**: DEC-003 records zero deletion; the map file shows each student page's guardian
ancestor and post-reclassification meaning.

### User Story 3 — The redesign has a concrete, grounded brief (Priority: P1)

The owner's "static and dead" verdict becomes an actionable diagnosis (B1–B6) and a design brief for
Spec 022, grounded in what the legacy homes actually do better (identity hero, live day spine,
status stories) — without importing what they do worse (clutter, pay figures, fake-action risk).

**Acceptance**: the B-answers cite specific current frames; the §Living-Dashboards Brief below is
complete enough to start `/speckit.specify` for 022 without re-research.

### User Story 4 — The roadmap is re-sequenced honestly (Priority: P2)

Teacher Internal Pages pause; the corrective work is scheduled first; every displaced item keeps an
owner.

**Acceptance**: DEC-009 records the 021–032 sequence and its supersession of the 018 renumbering.

## Requirements

- **FR-001**: The audit MUST prove the legacy role set from at least three independent evidence
  classes (filesystem, written inventories, opened screenshots). *(Done — visual-grounding §4.)*
- **FR-002**: The audit MUST answer A1–A7, B1–B6, C1–C5, D1–D4 explicitly. *(Done — decision record.)*
- **FR-003**: The audit MUST produce DEC-001…DEC-009 with evidence citations. *(Done.)*
- **FR-004**: The audit MUST evaluate reclassification Options A/B/C and pick one with rationale.
  *(Done — A adopted, B as future extension, C rejected on evidence.)*
- **FR-005**: The audit MUST NOT modify `app/src`, `app/public`, tests, or README; allowed writes are
  `.specify/feature.json`, this spec folder, and the CLAUDE.md pointer. *(Enforced — see Scope Guard.)*
- **FR-006**: The audit MUST define the Spec 022 brief (below) without implementing any of it.
- **FR-007**: The audit MUST propose the revised sequence and mark Teacher Internal Pages' resume
  point. *(Done — DEC-009; resume = 025.)*
- **FR-008**: All decisions MUST preserve the standing laws (pay-free, zero-pay, honesty gates,
  closed hook set, static HTML-first, zero deletion). *(Recorded in the decision file's final section.)*

## Success Criteria

- **SC-001**: A reader can verify the "no standalone Student" conclusion by opening the cited files
  alone, without trusting this spec's prose.
- **SC-002**: Zero app-behavior diffs exist when this spec lands (`git status` shows only spec-folder,
  feature.json, and CLAUDE.md pointer changes from this work).
- **SC-003**: Spec 022 can be specified directly from the brief below with no new discovery pass on
  the role-model question.
- **SC-004**: Every Spec 019 artifact keeps an owner and a future (no orphaned capability), per the
  map file §2.

## Living-Dashboards Brief (input to Spec 022 — DO NOT implement here)

**Mission**: transform the three role homes (and set the pattern for internals) from static card
stacks into living educational cockpits — same content honesty, radically better presence.

Grounded ingredients (each traces to an opened frame):
1. **Role identity hero band** — page-wide gradient/artwork header with avatar, greeting, role chip,
   and 2–3 headline counters (legacy L2/L4 concept, modernized; NO pay figures on teacher).
2. **Living day timeline** — today's sessions as a visual time rail (now/next/done states, child or
   room tags), replacing inert session cards; static-safe (states baked from fixtures).
3. **Status stories** — every KPI number gains a one-line story + next-step link («٩ جلسات حضرتها —
   استعرض سجل الحصص»), replacing isolated tiles.
4. **Progress movement** — bars/gauges animate on load (CSS only, `prefers-reduced-motion` honored);
   celebratory accents for streaks/completions.
5. **Working tabs/chips/filters where static-safe** — reusing ONLY the existing closed `data-*` hook
   set (data-tab/data-filter/:target patterns already proven in family-child); no new hooks.
6. **Action panels that explain what happens next** — gates upgraded from dashed cards to guided
   panels (what this will do when live · who acts · current status), staying honest.
7. **Page-wide visual identity** — per-role accent washes, sectional depth (subtle elevation layers),
   iconography with educational character; dark/RTL/mobile safe.
8. **Helpful empties** — every empty state offers context + one real link.
9. **Micro-interactions** — hover lift, focus rings, transition tokens in `app.css`; no JS animation
   engines; no gimmicks.
10. **Hub rework (DEC-004)** — three primary role cards + admin; student demoted to an honest
    child-view entry.

Constraints carried verbatim: static HTML-first · closed hook set (NO new hooks/storage keys) ·
no chart/engine/rank/score · teacher pay-free GLOBAL · family zero-pay · honesty classes · zero
`href="#"` · ceilings remain (tunable ±10% if the hero band demands, recorded in the 022 contract) ·
screenshot-based acceptance · identity impact is EXPECTED (full rebake of touched pages — 022 must
ship its own identity/protection + smoke-rescope contracts).

## Revised sequence (DEC-009)

021 Role Model & Student Reclassification Audit (this spec) · **022 Living Dashboards Experience
Rework** · **023 Full Legacy Coverage Audit 000–020** · **024 Corrections From Legacy Coverage
Audit** (incl. the student reclassification mechanics if 022 didn't absorb the hub work) · **025
Teacher Internal Pages** · 026 Admin Control/Sessions/Operations · 027 Admin Families/Students/
Courses/Groups · 028 Admin Teachers/Performance · 029 Admin Reports/Analytics/Feedback/Forms · 030
Admin Finance/Invoices/Salaries/Banks · 031 Admin Management/Content/Certificates/Settings · **032
Final Full Frontend QA + No-Missing Coverage Audit**.

This supersedes the Spec 018 renumbering (019 student · 020 family · 021 teacher · 022–027 admin ·
028 QA). The 016 sequence artifact receives its append-only amendment note when the first
implementing spec (022) lands.

## Scope Guard

**This spec changed**: `academy-dashboard-discovery/specs/021-role-model-student-reclassification/*`
(new), `.specify/feature.json` (pointer), `CLAUDE.md` (pointer). **Nothing else.** No app source, no
built pages, no tests, no README, no previous-spec files. No plan/tasks generated. No commit, no
push, no hook triggers (the watcher owns git).

## Assumptions

- The pre-Spec-020 uncommitted working tree (Spec 020's delivery, 77 files, all gates green) is the
  audit baseline; the watcher commit will land it unchanged.
- The single-child legacy account's student-name greeting (L2) is presentation, not a separate
  role — supported by the same login owning the multi-student "All Account Subscriptions" view (L3).
- Exact Arabic copy for demoted/child-view labels is an implementing-spec decision, not fixed here.

## Zero open clarifications

All audit questions the user posed are answered in the decision record; no [NEEDS CLARIFICATION]
markers remain.

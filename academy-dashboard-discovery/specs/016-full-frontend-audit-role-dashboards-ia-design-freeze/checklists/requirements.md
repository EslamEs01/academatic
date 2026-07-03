# Specification Quality Checklist: Full Frontend Audit + Role Dashboards IA + Design Freeze

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-07-03
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs) — the spec fixes IA/design/coverage direction; file naming and pattern names are product decisions carried from the standing constitution, not new tech choices
- [x] Focused on user value and business needs — the owner's six questions answered directly
- [x] Written for non-technical stakeholders — verdicts stated in plain words before detail
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain (the two candidate `needs-decision` rows were resolved inside the artifacts: studentResult/studentEvaluation = dedicated thin pages · all-teachers timetable = existing lens stands)
- [x] Requirements are testable and unambiguous (FR-001…FR-016 each name their artifact and its zero-uncategorized/zero-unclassified condition)
- [x] Success criteria are measurable (SC-001…SC-009: filled-column counts, reconciliation totals, machine-checkable rules)
- [x] Success criteria are technology-agnostic
- [x] All acceptance scenarios are defined (14 user stories, each with an independent test)
- [x] Edge cases are identified (uncrawlable surfaces, student-role evidence gap, naming variants, legacy anti-features)
- [x] Scope is clearly bounded (documents only; FR-016; app/tests/built files untouched; no tasks)
- [x] Dependencies and assumptions identified (Spec 015 committed at `20dc089`; sidebar list = current legacy; constitution unchanged)

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows (audit → reclassify → per-role plans → admin inventory → matrix → freeze → sequence → QA rules)
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- Validation run 2026-07-03: all items PASS on first pass. Companion artifacts complete: frontend-audit-001-015 · missing-pages-and-gaps-register · role-dashboard-ia · role-dashboard-page-inventory · admin-sidebar-page-inventory · legacy-to-new-coverage-matrix · role-dashboard-design-freeze · future-spec-sequence · honesty-and-backendrequired-contract · legacy-screenshot-review · visual-reference-audit.
- The optional artifacts from the brief are folded (per spec.md's companion list): the three per-role page docs → role-dashboard-page-inventory; role-navigation-map → role-dashboard-ia §3; locked-and-coming-soon-replacement-plan → admin-sidebar-page-inventory; admin-finish-plan + final-frontend-acceptance-rules → future-spec-sequence.
- CLAUDE.md deliberately NOT updated by this spec (outside the allowed surface); the pointer refresh rides with the next implementation spec's docs task.

## Verification record (T001–T020 execution, 2026-07-03)

- **T001 state**: git status = `.specify/feature.json` + this folder ONLY · HEAD `20dc089` · branch `feature/012-role-portal-foundation` · app diff **0 lines** · public HTML **49** · Spec-012 coverage artifact diff **0** ✓
- **T002 vocabulary closure**: all classifications/statuses/treatments/end-states used across the 13 artifacts are members of their sanctioned sets (register 6-value gap set · matrix 21-value set · inventory 10-value set · treatments 8 codes · end-states REAL/LOCK/GATE) — zero ad-hoc values ✓
- **T003 audit fields**: fix applied — the 15×6 **field matrix** appended to `frontend-audit-001-015.md` (compressed sections expanded); nav census re-confirmed read-only (29 planned · 7 disabled · 3 future-role) ✓
- **T004 register**: 20 rows G1–G20 (grep-counted) · one classification each · totals sum 20 · must-fix ×0 · every move-to destination exists in the sequence table ✓
- **T005 IA**: reclassification stated · filenames kept · home↔internal contract §4 · shell v2 second-family ✓
- **T006/T007/T008 role inventories**: table rows student 7 (home+6) · family 8 (home+7) · teacher 7 (home+6) grep-counted; teacher exclusion row (T2/T17/T18/T19/T6/T12/T25/T26/T27) present; pay-free-global contract scopes the whole `teacher-*` family w/ Specs 020/025/027 enforcement ✓
- **T009 sidebar**: 57 rows awk-counted per group (Control 14 · Families 10 · Teachers 8 · R&F 13 · Mgmt 5 · Settings 7); corrected totals line reconciles (13/1/26/3/6/2/5/1); ownership 021×10 022×4 023×5 024×3 025×9 026×12 ✓
- **T010 «قريبًا»/locked**: all 36 non-implemented nav items (29+7) present with REAL/LOCK/GATE end-states + owning specs; never-dead rule stated in inventory + contract ✓
- **T011 evidence**: inspected frames named with findings; corpus totals (1,113 · 339 · 178) stated; student-evidence gap honest; all nine visual-audit answers present ✓
- **T012 anti-clone**: treatment column filled on all non-excluded matrix rows; fix applied — **aggressive warning walls / alarm-styled empty states** added by name to the freeze's forbidden register ✓
- **T013 matrix**: 83 cluster rows all statused (awk: 0 missing) covering 178 templates (145/22/11/0); reconciliation + zero-uncategorized + zero-needs-decision assertions present; Spec-012 artifact untouched (git diff 0) ✓
- **T014 honesty**: four classes · four gate patterns · complete no-fake register (payment→permission-save) · role hard lines · enforcement continuity; citation requirement in contract ✓
- **T015 freeze**: 29 frozen entries answering every category of the freeze list; change-control clause present ✓
- **T016 sequence**: eleven rows 017–027 w/ scope/pages/deps/floors; no overlap/gap vs inventory ownership; split valve internal-only; ~145–150 projection stated; destination spot-checks agree across register↔matrix↔inventory (المحادثات→021 · الرواتب→025 GATE · بحث الجدول→022 · التكاملات→026) ✓
- **T017 QA rules**: 8 machine-checkable rules in the sequence, mirrored 1:1 (8/8 grep-counted) in `final-frontend-qa-contract.md` with the no-weakening clause ✓
- **T018 zero-TBD**: TBD/TODO matches are all meta-references to the sweep itself; needs-decision matches are the vocabulary definition + the edge-case policy — zero genuine open markers ✓
- **T019 scope-guard G3**: two G1 paths only · app diff 0 · tasks.md verification-only per amendment A1 ✓
- **T020 Spec-017 readiness**: PASS — what 017 builds (shell v2 + role-nav registries + re-hosted homes + hub copy + CLAUDE.md pointer refresh as first docs task), what it must not touch (admin files, home content, siblings), layout/nav maps (flat sidebar 7/8/7, drawer, role-accent active pill), gate rendering (planned = labeled non-links), acceptance floor (shell on 4 pages · frozen nav maps · sanctioned-anchor registry · payHit green · 40 admin files + index byte-identical) — all answerable from the artifacts alone.

**Fixes applied during verification (inside Spec 016 only)**: (1) the 15×6 audit field matrix (T003) · (2) the alarm-empties forbidden-register entry (T012) · (3) [at plan time] the sidebar totals-line correction 52→57 · (4) [at tasks time] scope-guard amendment A1. **Result: 20/20 verification tasks green.**

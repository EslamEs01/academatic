# Feature Specification: Full Legacy Coverage Audit 000–022

**Feature Branch**: `feature/012-role-portal-foundation` (repo convention: specs 013–022 specified and delivered on this branch; no new branch created)
**Feature Directory**: `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit`
**Created**: 2026-07-06
**Status**: Draft → Audit executed same-session (audit-only spec: the audit artifacts ARE the deliverable)
**Input**: User description: "Full Legacy Coverage Audit 000–022 — evidence-based global audit of the rebuilt academy dashboard (Specs 000–022) against the legacy system; audit-only; produces the correction backlog for Spec 024."

## Name correction (binding)

The roadmap (Spec 016 sequence, DEC-009) originally called this feature **"Full Legacy Coverage Audit 000–020"**. After Spec 021 (role-model correction) and Spec 022 (living dashboards rework) landed, the audit baseline is the full delivered set **Specs 000–022**, explicitly including:

- Admin specs 001–011
- Role foundation specs 012–017
- Student/child specs 018–019
- Family specs 018/020
- Role-model correction Spec 021
- Living dashboard rework Spec 022

Specs 021/022 MUST NOT be skipped because the old roadmap name said 000–020.

## Why this spec exists

Stop and verify that the rebuilt academy dashboard is truly based on the legacy system being rebuilt — not random invented pages. The product owner's standing requirement:

> Everything we built must be traceable to the legacy system's real idea, routes, dashboards, workflows, screenshots, forms, tables, modals, and interactions. We can improve the UX and add small helpful touches, but we must not drift into a different product.

Spec 023 produces **no code changes**. Its output is a complete evidence-based coverage map plus a prioritized correction backlog that Spec 024 can implement directly.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Legacy-to-current coverage map (Priority: P1)

The product owner can see every legacy capability (route, page, dashboard, workflow, form, modal, table, interaction) mapped to the rebuilt surface that covers it, with an evidence path on both sides.

**Why this priority**: This is the core question of the audit — traceability of the rebuild to the legacy product. Every other output derives from this map.

**Independent Test**: Open `coverage-matrix.md`; pick any legacy admin/family/teacher page from the crawler output; find its row; verify both evidence paths resolve to real files.

**Acceptance Scenarios**:

1. **Given** the legacy crawler output (`output/roles/*`, `output/combined/*`), **When** the coverage matrix is complete, **Then** every legacy route/page/capability appears as a row with a coverage classification from the sanctioned taxonomy and exact legacy + current evidence paths.
2. **Given** a coverage row claiming "implemented" or "improved", **When** the cited current file is opened, **Then** the claimed capability is actually present in it.

---

### User Story 2 - Missing-capability visibility before further building (Priority: P1)

The product owner can see which legacy capabilities are missing or weakly covered **before** more pages are built, each with severity and a recommended owner spec.

**Why this priority**: Building Specs 025–031 on top of unknown gaps would compound drift; the whole point of pausing at 023 is to catch this now.

**Independent Test**: Open `missing-capabilities-register.md`; verify every entry has evidence, severity (P0/P1/P2/P3/excluded-by-law), and an owner spec; verify the explicit P0-blocker verdict line exists.

**Acceptance Scenarios**:

1. **Given** a legacy capability with no current counterpart and no lawful exclusion, **When** the register is complete, **Then** it appears with severity and owner spec.
2. **Given** capabilities excluded by binding laws (e.g., teacher salary surfaces), **When** classified, **Then** they are recorded as intentionally-excluded/excluded-by-law with the law cited — not as gaps.

---

### User Story 3 - Drift and extra-page detection (Priority: P1)

The product owner can see whether any rebuilt page is random, unnecessary, or weakly grounded — and gets a keep/merge/rename/hide/remove/improve disposition for each, with a bias toward preserving useful work.

**Why this priority**: The anti-drift requirement is the second half of traceability: current→legacy. A rebuild that adds ungrounded surfaces is drifting into a different product even if legacy coverage is complete.

**Independent Test**: Open `extra-or-drift-register.md`; verify every current page pair appears in `current-vs-legacy-map.md` and every non-grounded item has a disposition and reason in the drift register.

**Acceptance Scenarios**:

1. **Given** the 77 built public pages, **When** the reverse map is complete, **Then** each page has a named legacy grounding or an explicit net-new/drift classification.
2. **Given** a useful net-new page (e.g., demo hub), **When** classified, **Then** the recommendation prefers reclassify/hide/merge/relabel over deletion, with justification.

---

### User Story 4 - Justified net-new work stays (Priority: P2)

The product owner can see **why** a useful net-new page (hub, drill-downs, demo infrastructure) should stay, with an explicit usefulness argument rather than silent acceptance.

**Why this priority**: Prevents over-correction in Spec 024 — deleting useful scaffolding would violate the zero-deletion law.

**Independent Test**: Every `useful-net-new` row in the drift register carries a "keep" disposition with a stated reason.

**Acceptance Scenarios**:

1. **Given** a net-new item classified useful, **When** the register is read, **Then** its keep-reason and owner spec are stated.

---

### User Story 5 - Actionable Spec 024 correction backlog (Priority: P1)

The product owner can see exactly what must be corrected in Spec 024, prioritized (Must fix / Should fix / Can schedule later / Do not fix), with acceptance criteria machine-checkable where possible.

**Why this priority**: This is the practical output; Spec 024 should be able to consume `correction-backlog-for-024.md` directly without re-deriving the audit.

**Independent Test**: Open `correction-backlog-for-024.md`; verify the 9-column table, the priority buckets, the P0 verdict, and the GO/NO-GO line for Spec 025.

**Acceptance Scenarios**:

1. **Given** every needs-correction finding across the registers, **When** the backlog is complete, **Then** each is either a backlog row or explicitly triaged out with a reason.
2. **Given** the backlog, **When** Spec 024 is planned, **Then** no additional audit work is required to scope it.

---

### User Story 6 - Safe continuation for developers (Priority: P2)

A developer can safely continue Teacher internal pages (Spec 025) and the admin groups (026–031) after 024, because the audit states whether the foundations they build on are sound.

**Why this priority**: Sequencing protection; depends on Stories 1–3, 5.

**Independent Test**: The backlog ends with an explicit GO/NO-GO (with conditions) for Spec 025 after 024.

**Acceptance Scenarios**:

1. **Given** the completed audit, **When** the final synthesis is read, **Then** it states whether teacher-internal work can proceed after 024 and under which conditions.

---

### User Story 7 - Design-quality visibility (Priority: P2)

A designer can see which pages still need visual uplift after Spec 022 — what is better than legacy, what is weaker, what still feels static, and where hierarchy/density/delight need work. The product owner cares strongly about visual quality, not only functionality.

**Why this priority**: Spec 022 transformed the hub + role homes; the remaining surfaces (family internals, student internals, admin pages) need an honest visual verdict to plan future uplift.

**Independent Test**: Open `design-quality-register.md`; verify the seven required assessment sections and the ranked register with screenshot evidence.

**Acceptance Scenarios**:

1. **Given** current and legacy screenshots, **When** the register is complete, **Then** every claim cites the exact screenshot(s) observed on both sides where a comparison is made.

---

### User Story 8 - QA verifies no silent drops (Priority: P2)

QA can verify that no legacy area was silently dropped: every legacy role area was inspected, every claim has an evidence path, and the audit's own coverage (what was opened) is itself recorded.

**Why this priority**: An audit that cannot prove its own coverage cannot certify the product's coverage.

**Independent Test**: Open `visual-grounding.md`; verify the 25-area coverage table, per-role screenshot lists, sampling method, and evidence-gap declarations.

**Acceptance Scenarios**:

1. **Given** the grounding record, **When** any area row is read, **Then** it names legacy evidence opened, current evidence opened, what was observed, coverage status, and risk.

---

### Edge Cases

- **Pay/finance surfaces**: legacy shows real pay data (teacher salary band with EGP figures, fines/bonus; admin accounting; fine amounts in class tables). These MUST classify as intentionally-excluded/excluded-by-law or constrained-by-law (status-first), never as plain "missing" — and never trigger a correction that would reintroduce pay figures.
- **Legacy `/student/*` naming trap**: the legacy "student" routes are the Family/Guardian login (Spec 021 DEC-001). Coverage rows must not resurrect a standalone Student role from route names.
- **One legacy page → many current pages (splits)** and **many legacy pages → one current page (merges)**: classify as renamed/merged with both sides listed, not as missing + extra.
- **Planned-but-honest gates**: teacher internals and admin groups scheduled for 025–031 with honest «قريبًا»/backendRequired gates are "accounted", not "missing"; dishonest or unscheduled gates ARE findings.
- **Uncommitted baseline**: if Specs 020/021/022 were uncommitted, the audit uses the working tree as baseline and reports it. (Preflight result: working tree clean at `837b0c1` — all committed; baseline is HEAD.)
- **Archives vs extracted folders**: `output.zip`, `frontend-planning.zip`, `frontend-planning-deep.zip` exist; extracted folders are preferred and archives recorded as accounted-for.
- **Conflicting evidence**: where prior-art artifacts (Spec 016 matrix, Spec 021 map) disagree with fresh file inspection, fresh inspection wins and the conflict is recorded.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Full legacy inventory)**: The audit MUST inventory the legacy system from real crawler files: role list, routes by role, page templates by role, sidebar/menu items by role, forms, modals, tables, interactions by role, screenshot counts by role, and unsafe/skipped endpoints — in `legacy-inventory-audit.md`.
- **FR-002 (Role-model verification)**: The legacy inventory MUST explicitly verify with evidence: Admin role exists; Teacher role exists; Family role exists; NO standalone Student role exists; `/student/*` belongs to the Family/Guardian login.
- **FR-003 (Full current inventory)**: The audit MUST inventory the rebuilt app from real files: public HTML count + list, source page modules, ROLE_NAV entries, portal hub cards, student/child-view pages, family pages, teacher pages, admin pages, tests/smoke coverage, screenshot coverage, and known intentional gates — in `current-app-inventory-audit.md`.
- **FR-004 (Targeted Visual Grounding Gate — broad)**: Before conclusions are drawn, the exact relevant legacy screenshots AND current screenshots MUST be visually inspected (not recalled from memory, not inferred from summaries alone), across all role areas; `visual-grounding.md` MUST record exactly what was opened, the sampling method, the 25 required area rows, and evidence gaps.
- **FR-005 (Multi-agent audit)**: The audit MUST be executed as a multi-agent (or equivalent multi-pass) split of ~10 audit areas — legacy routes; legacy screenshots; legacy forms/modals/tables; current inventory; admin coverage; family/child/student coverage; teacher coverage; design/UX; drift/extra; final synthesis — each producing a findings file in `agent-findings/` with exact evidence paths. No agent may rely on memory or claim coverage without naming both the current file and the legacy source.
- **FR-006 (Coverage matrix)**: The audit MUST produce `coverage-matrix.md` with one row per legacy route/page/capability using exactly the columns: Legacy role | Legacy route/page/capability | Legacy evidence path | Current rebuilt page/module | Current evidence path | Coverage classification | Quality classification | Correction needed? | Owner spec | Notes.
- **FR-007 (Classification taxonomy — legacy)**: Every legacy item MUST be classified as exactly one of: implemented | improved | merged | renamed | reclassified | gated-backendRequired | planned-future | intentionally-excluded | missing | unclear-needs-review.
- **FR-008 (Classification taxonomy — current)**: Every current item MUST be classified as one of: legacy-grounded | legacy-grounded-improved | useful-net-new | useful-but-needs-better-grounding | wrong-role-classification | weak-design | duplicate-or-merge-candidate | random-or-unnecessary | needs-correction.
- **FR-009 (Owner specs)**: Owner-spec values MUST come only from: done | 024-correction | 025-teacher-pages | 026-admin-control-sessions-ops | 027-admin-families-students-courses-groups | 028-admin-teachers-performance | 029-admin-reports-analytics-feedback-forms | 030-admin-finance-invoices-salaries-banks | 031-admin-management-content-certificates-settings | 032-final-qa | future-backend | intentionally-excluded.
- **FR-010 (Missing register)**: The audit MUST produce `missing-capabilities-register.md` (columns: ID | Legacy capability | Evidence | Why it matters | Current status | Severity | Recommended owner spec | Correction type | Notes) with severity only from: P0-blocker | P1-before-next-build | P2-scheduled | P3-nice-to-have | excluded-by-law.
- **FR-011 (Extra/drift register)**: The audit MUST produce `extra-or-drift-register.md` (columns: ID | Current item | Current evidence | Legacy grounding | Classification | Keep / merge / rename / hide / remove / improve | Owner spec | Reason), preferring reclassify/hide/merge/relabel over deletion of useful work.
- **FR-012 (Reverse map)**: The audit MUST produce `current-vs-legacy-map.md` mapping every current page pair back to its legacy grounding.
- **FR-013 (Design-quality register)**: The audit MUST produce `design-quality-register.md` covering: better-than-legacy; still-weaker-than-legacy; still-static pages; living-uplift candidates; visual-hierarchy needs; delight needs; density problems — with screenshot evidence, judged after Spec 022's living design system.
- **FR-014 (Role-model consistency audit)**: The audit MUST produce `role-model-consistency-audit.md` verifying: Admin/Family/Teacher primary; Student not primary; student pages preserved as child-view; hub copy matches; ROLE_NAV.student functional but secondary; family owns the child journey; family-child is the fold point; no page contradicts the model.
- **FR-015 (024 backlog)**: The audit MUST produce `correction-backlog-for-024.md` (columns: Backlog ID | Problem | Evidence | Why it matters | Recommended correction | Affected files/pages | Risk | Acceptance criteria for 024 | Priority) with priorities: Must fix in 024 | Should fix in 024 | Can schedule later | Do not fix / intentionally excluded — plus an explicit P0 verdict and a GO/NO-GO for Spec 025 after 024.
- **FR-016 (Evidence paths everywhere)**: Every claim in every artifact MUST carry an exact file/screenshot path; "looks covered" without naming both sides is forbidden.
- **FR-017 (No implementation)**: The audit MUST NOT modify `academy-dashboard-discovery/app/**` (src, public, tests, screenshots, README), previous specs (except append-only pointers only if explicitly necessary), or any build/smoke file. No code changes, no CSS edits, no smoke-test edits.
- **FR-018 (No commit/push)**: The audit MUST NOT commit or push. (Repo watcher handles commits.)
- **FR-019 (Law-respecting corrections)**: All classifications and proposed corrections MUST respect the binding laws: no pixel clone (legacy = capability checklist); teacher pay-free global; family zero-pay; no fake actions; honest backendRequired gates; static HTML-first; no deletion of useful work without a correction plan; student demoted not deleted; admin/family/teacher primary roles.
- **FR-020 (Checklist)**: The audit MUST produce `checklists/requirements.md` validating: grounding complete; multi-agent audit performed; all legacy + current role areas inspected; every claim evidenced; all seven registers/matrices created; 024 backlog created; no app files changed; no implementation; no plan/tasks generated; no commit/push.

### Key Entities

- **Legacy capability**: a route/page/dashboard/workflow/form/modal/table/interaction observed in the legacy crawler output; attributes: role, evidence path, coverage classification, owner spec.
- **Current surface**: a built page pair (`public/*.html` + `.en`), source module, nav registry entry, or gate; attributes: evidence path, legacy grounding, quality classification, disposition.
- **Finding**: an evidence-backed claim by one audit agent; lives in `agent-findings/*`; feeds registers.
- **Correction backlog item**: a prioritized, acceptance-criteria-bearing problem for Spec 024.
- **Audit area**: one of the 25 grounding areas (admin×9, family×9, student child-view, teacher×2, hub, shell, design, responsiveness/theme/direction).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of legacy captured pages (admin ~300 distinct captures, family 13, teacher ~26) are represented in the coverage matrix (individually or in an explicitly-listed module group) — zero uncategorized.
- **SC-002**: 100% of the 77 built public pages appear in the reverse map with a grounding or an explicit net-new classification.
- **SC-003**: Every coverage/missing/drift/design/backlog row carries at least one exact evidence path per side it references; a spot-check of sampled claims by an independent verifier finds the cited evidence supports the claim.
- **SC-004**: All classifications and severities are drawn only from the sanctioned taxonomies (zero invented labels).
- **SC-005**: The 25-area grounding table is complete, and legacy screenshots were opened for every role (family: all 27; teacher: all distinct pages; admin: ≥1 full-page capture per module group, sampling method recorded).
- **SC-006**: The audit answers all 10 product-owner questions (fully covered / renamed-merged / improved / excluded-by-law / gated / missing / extra-weak / merge-hide-rename candidates / design-weaker / exact 024 corrections) with pointers to the artifact that answers each.
- **SC-007**: `git status` after the audit shows changes ONLY under the Spec 023 folder, `.specify/feature.json`, and (if convention requires) `CLAUDE.md` — zero app/output/spec-001–022 modifications, zero commits, zero pushes.
- **SC-008**: Spec 024 can be planned from `correction-backlog-for-024.md` alone, and the backlog states whether Spec 025 (Teacher Internal Pages) may proceed after 024.

## Assumptions

- Working tree at HEAD `837b0c1` (branch `feature/012-role-portal-foundation`) is the audit baseline; preflight showed it clean, so Specs 020/021/022 are committed — the "uncommitted baseline" contingency is not needed.
- The extracted folders (`output/`, `frontend-planning/`, `frontend-planning-deep/`) supersede their `.zip` archives; archives are recorded as accounted-for without re-extraction.
- The legacy crawler output is treated as the authoritative picture of the legacy system; areas the crawler skipped (documented in `skipped-actions.md` / `failed-pages.md`) are recorded as evidence gaps, not silently assumed.
- Prior-art audits (Spec 016 coverage matrix, Spec 021 role-model map) are inputs to re-verify, never substitutes for fresh file inspection.
- "Multi-agent" is satisfied by parallel subagent passes with one findings file per audit area; the recommended 10-agent split is honored (screenshot auditing split per role for depth, still one findings file per area).
- Spec numbering for owner specs follows Spec 021 DEC-009 (025 Teacher internals, 026–031 admin groups, 032 final QA).
- No new git branch is created: repo convention since Spec 013 keeps all spec work on `feature/012-role-portal-foundation`, and the user's scope limits changes to the spec folder, `.specify/feature.json`, and the CLAUDE.md pointer.

## Scope

May create/update: `.specify/feature.json` · CLAUDE.md pointer (convention) · `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/**`.

Must NOT modify: `academy-dashboard-discovery/app/src/**` · `app/public/**` · `app/tests/**` · `app/screenshots/**` · `app/README.md` · previous specs (except append-only pointer only if explicitly necessary). No implementation, no corrections, no page/CSS/smoke edits, no commit, no push, no plan.md/tasks.md generation.

## Deliverables (the audit artifact set)

```
academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/
├── spec.md                          (this file)
├── visual-grounding.md              (grounding-gate record, 25-area table)
├── legacy-inventory-audit.md        (FR-001/FR-002)
├── current-app-inventory-audit.md   (FR-003)
├── coverage-matrix.md               (FR-006 — most important artifact)
├── current-vs-legacy-map.md         (FR-012)
├── missing-capabilities-register.md (FR-010)
├── extra-or-drift-register.md       (FR-011)
├── design-quality-register.md       (FR-013)
├── role-model-consistency-audit.md  (FR-014)
├── correction-backlog-for-024.md    (FR-015 — practical output)
├── agent-findings/                  (FR-005 — one file per audit area)
└── checklists/requirements.md       (FR-020)
```

## Expected conclusions to verify (not assume)

Recorded as hypotheses only; each must be confirmed or refuted from evidence in the registers: family app strongly covered after 020/022 · student-as-child-view correct after 021/022 · teacher home improved but internals planned → Spec 025 · admin pages exist but need the deep coverage audit · some admin areas may be overbuilt/underbuilt/renamed/split · some current pages may be useful net-new demo improvements · finance/pay surfaces exist in legacy but are intentionally constrained by pay-free/zero-pay laws.

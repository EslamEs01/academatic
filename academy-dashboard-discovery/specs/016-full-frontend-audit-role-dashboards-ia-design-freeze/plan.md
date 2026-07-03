# Implementation Plan: Full Frontend Audit + Role Dashboards IA + Design Freeze (Spec 016)

**Branch**: `feature/012-role-portal-foundation` (watcher-owned) · **Date**: 2026-07-03 · **Spec**: [spec.md](spec.md)
**Input**: the 13 authored Spec-016 artifacts + the full 001–015 audit evidence + the legacy crawl corpus (178 route templates · 1,113 screenshots) + the current build (49 files, HEAD `20dc089`, tree clean).

## Summary

Spec 016 is **docs-only**: it audits Specs 001–015, reclassifies the three portals as Role Dashboard HOME pages, fixes the role-app + admin-sidebar finish plan, freezes the design, and binds the 017–027 sequence. The "implementation" of this spec is therefore **verification and binding**: prove the artifact set is internally consistent (counts reconcile, zero unclassified/uncategorized, every gap exactly one destination), express each strategic decision as a citable contract, and hand Spec 017 an unambiguous starting brief. Zero app/source/test/built changes.

## Technical Context

**Language/Version**: Markdown documents only (this spec) · **Primary Dependencies**: none — the app stack is untouched · **Storage**: n/a · **Testing**: consistency verification of documents (counts, cross-references, vocabulary closure) + `git status` cleanliness; no build/test runs required beyond state verification · **Target Platform**: the spec folder · **Project Type**: audit/strategy documentation · **Performance Goals**: n/a · **Constraints**: allowed surface = `specs/016-*/` (+ the already-updated `.specify/feature.json` pointer); FORBIDDEN: tasks.md, app source, public HTML, CSS/JS/tests, `nav.config.js`, `portal-shell.js`, commit, push · **Scale/Scope**: 13 authored artifacts + 4 plan artifacts + 11 contracts; 20 gaps · 57 sidebar rows · 178 legacy templates · 49 current built files · ~145–150 projected final files.

## Constitution Check

*GATE: `.specify/memory/constitution.md` remains the unfilled template — the effective constitution is the CLAUDE.md hard-constraints block + Specs 001–015 binding contracts.*

| Gate | Verdict | Evidence |
|---|---|---|
| Static HTML-first, closed hooks, no SPA | **PASS (n/a-preserving)** | Docs only; every future-facing rule restates the standing constraints |
| Fixtures only; four honest action classes | **PASS** | The honesty contract carries the classes + no-fake register forward |
| Zero pay figures; teacher pay-free; family zero-figures; reports finance-free | **PASS** | `teacher-pay-free-global-contract.md` extends the three-layer rule to the whole future teacher app; 025 shells are figure-free |
| No computed score/rank/chart/engines | **PASS** | Freeze forbids charts/leaderboards; analytics = authored STAT treatment |
| Admin console protected; portal separation | **PASS** | Two-shell law restated; hub-only entry stands; `future-role` never rendered |
| Screenshot-based visual acceptance | **PASS** | Freeze + visual-reference-audit make it checkable against the forbidden-pattern register |
| **This spec changes no app source** | **PASS** | `git status` = feature pointer + spec folder only (verified at plan pre-flight) |

**Post-Phase-1 re-check**: contracts introduce no new surface; docs-only holds. **GATE PASS.**

## Verified counts (re-checked at plan time — one correction applied)

- Gaps register: **20 rows (G1–G20), zero `must-fix-before-continuing`** — classification totals sum to 20 ✓.
- Admin sidebar inventory: **57 rows** (the 50-item user sidebar list + 7 crawl-only additions), zero unclassified — **corrected from the earlier "~52" summary line** (the table was always complete; only the totals line undercounted; fixed in place: 13 already-built · 1 built-but-needs-redesign · 26 coming-soon · 3 locked · 6 backendRequired-shell · 2 dedicated · 5 merged · 1 already-covered; ownership 021×10 · 022×4 · 023×5 · 024×3 · 025×9 · 026×12) ✓.
- Coverage matrix: **178 legacy route templates** (admin 145 · teacher 22 · family 11 · student 0 — no legacy student role), zero uncategorized, zero remaining `needs-decision` ✓.
- Current surface: **49 built files** = 20 admin pairs + 3 role-home pairs + hub pair + ar-only index ✓ (recounted from `public/`).
- Projected final surface: **~145–150 built files** (49 + ~12 role-internal pairs + ~35 admin pairs) ✓.
- Next implementation spec: **017 (Role Dashboard Shell + Navigation)** ✓.

## Project Structure (this feature's documentation)

```text
academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/
├── spec.md · checklists/requirements.md
├── frontend-audit-001-015.md · missing-pages-and-gaps-register.md
├── role-dashboard-ia.md · role-dashboard-page-inventory.md
├── admin-sidebar-page-inventory.md · legacy-to-new-coverage-matrix.md
├── role-dashboard-design-freeze.md · future-spec-sequence.md
├── honesty-and-backendrequired-contract.md
├── legacy-screenshot-review.md · visual-reference-audit.md
├── plan.md · research.md (D1–D12) · data-model.md · quickstart.md
└── contracts/ (11)
    full-frontend-audit-contract.md · role-dashboard-ia-contract.md ·
    design-freeze-contract.md · admin-sidebar-inventory-contract.md ·
    legacy-coverage-matrix-contract.md · future-spec-sequence-contract.md ·
    honesty-backendrequired-contract.md · teacher-pay-free-global-contract.md ·
    no-app-source-change-contract.md · final-frontend-qa-contract.md · scope-guard.md
```

**No app-source structure section exists for this spec — nothing under `app/` changes.**

## Phase 0 — Research (complete)

All twelve decisions D1–D12 resolved in `research.md`; headline answers: zero blockers before 017 · homes are NOT redesigned again · shell-first confirmed · flat role sidebar + drawer locked · page counts stable (student 6 / family 7 / teacher 6) · 021–026 balanced with a plan-time split valve · the REAL/LOCK/GATE conversion table is binding · screenshot-evidence citation rule for future specs · freeze + change-control prevents redesign · 027 proof mechanics machine-checkable · CLAUDE.md refresh deferred to 017 · Spec 016 stays docs-only.

## Phase 1 — Design artifacts (complete)

`data-model.md` (the six documentation shapes + integrity rules) · 11 contracts (each binds one strategic artifact with acceptance criteria and names its consumer specs) · `quickstart.md` (the manual verification walk of the whole doc set). No agent-context script run is needed (no tech-stack change; docs only).

## Phase 2 — Completion path (what "done" means for Spec 016)

1. Artifact-consistency verification green (the quickstart checks: counts reconcile; every gap exactly one destination; vocabulary closure between register ↔ matrix ↔ inventories ↔ sequence).
2. `git status` shows only the sanctioned surface (feature pointer + spec folder). No tasks.md exists.
3. Spec 017 can be specified directly from `role-dashboard-ia.md` (shell/nav) + `role-dashboard-design-freeze.md` (patterns) + `future-spec-sequence.md` (floors) + the contracts — zero open design questions. The CLAUDE.md pointer refresh is 017's first docs task.

**STOP — this plan produces no tasks; a docs-only spec completes at Phase 2 verification.**

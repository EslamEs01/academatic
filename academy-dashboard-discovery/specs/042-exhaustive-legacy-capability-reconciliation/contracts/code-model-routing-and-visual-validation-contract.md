# Contract 14 — Code-Model Routing & Visual Validation (planning note with BINDING validation rules)

**Canonical sources:** `../plan.md` **D12** (this contract's charter — tool routing, not a dependency) ·
contract 5 (`academic-visual-redesign-handoff-contract.md` — the 11-step loop + 8-surface matrix this contract
enforces) · `../visual-quality-and-academic-design-audit.md` §0 (the screenshot-first method the loop inherits) ·
`../protected-test-carryover.md` §2 (R-2/R-3 hard gates).

## 1. The task division (verbatim per plan.md D12, restating the brief)
Specs 045–050 are expected to execute with **Codex**:
- **Sol High** — visual direction · IA · dashboard redesign · complex CSS/layout · screenshot interpretation ·
  high-risk pages · final visual critique.
- **Sol Medium** — mechanical page updates · responsive adaptations · locale parity · test additions ·
  screenshot-matrix expansion · deterministic guards.
A task on the High list may not be delegated to Medium to save budget; a Medium task may be escalated to High
freely. Ambiguous tasks default High.

## 2. Claude Opus — the independent critic
**Claude Opus, when used, acts as the independent contract/visual critic**: it reviews diffs and rendered
screenshots against contracts 5/6/7/8/9/10/11 and the standing laws, and reports findings. It does **not** take
implementation ownership of a surface Codex is actively editing, and it **never edits the same file concurrently
with Codex** (§3). Critique output = findings with evidence paths, in the reviewed spec's records.

## 3. Single-writer-per-file (hard rule)
At any moment, **exactly one model/agent is the writer of a given file**. No Claude+Codex concurrent edits on one
file, ever — handoff is explicit (the writer finishes and records; then the other may take the pen). Reviewers
comment; they do not patch the file under review. Parallelism comes from the page-group partition
(`../page-review-ownership-map.md` §2) and the D5 waves, never from co-editing.

**Integration gate for parallel work (three-gate model — dependency contract §4a, corrected 2026-07-16).**
Parallel implementation happens in **isolated branches/worktrees** and may not claim integrated completion.
Integration/merge passes **Gate 3**: the applicable foundation implementation (043 frontend protections ·
044 shared components) and its tests must be available and **green** before a dependent surface is declared
complete or merged. A frozen interface authorizes *starting* in isolation — never *merging*.

## 4. The MANDATORY browser/screenshot loop (the binding core of this contract)
**A design is NOT complete because the source looks correct.** For every implemented/redesigned page:
1. Build, load the page in a real browser context, and **capture screenshots after implementation** (step 9 of
   the contract-5 loop) — source-reading, DOM greps and passing smoke asserts are never visual acceptance.
2. **Open the captured screenshots as images and judge them** (the visual audit's own method: pixels beat
   summaries; a capture row that silently no-ops is a known failure class — contract 7 §2).
3. Iterate until the page meets the contract-5 IS list; then run the 8-surface matrix (AR/EN · desktop/mobile ·
   light/dark · states · overlays · keyboard/focus · console errors · a11y) with R-2/R-3 as hard gates.
4. The final visual critique (Sol High or Opus-as-critic) happens on the CAPTURED frames, not on the diff.
This inherits the user's standing screenshot-based visual acceptance law (Specs 001–041) and the Spec-041 lesson:
a runner that cannot fail proves nothing.

## 5. Tool routing only — no application dependency
This contract routes WORK, not code: it adds **zero** application dependencies, zero build steps, zero runtime
references. Nothing under `app/**` may name, embed, or depend on any model or tool. The routing may be revised by
a later planning note without a supersession; the **validation obligations in §4 may not** — they are binding on
045–050 (and on any 043–057 spec that changes a rendered surface) and are inseparable from contract 5.

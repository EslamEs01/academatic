---
name: claude-codex-handoff-guard
description: Reconstruct handoff state from repository evidence rather than a previous agent's completion claim.
---

# Claude–Codex Handoff Guard

At a handoff, inspect the branch/HEAD, status, diff, untracked files, active
Spec tasks and checklists, contracts, and relevant test evidence. Compare the
claimed scope to live bytes and identify incomplete, conflicting, or unverified
work. Never trust a completion claim, handoff note, checkbox, or green summary
without independently reconstructing the evidence. Preserve dirty work and
stop when evidence contradicts the claimed state.

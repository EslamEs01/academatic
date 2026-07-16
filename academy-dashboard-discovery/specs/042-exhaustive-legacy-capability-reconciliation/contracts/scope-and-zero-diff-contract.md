# Contract 15 — Scope & Zero-Diff

**Canonical sources**: `count-and-impact-contract.md` §3/§5 (allowlist + proof commands) · `plan.md` D14 (plan-phase
impact boundary) and Stop conditions · `spec.md` §6 (scope of change: NONE) / §10 (stop conditions).

**Bound parties**: Spec 042's plan phase and tasks phase (both documentation-only); the watcher.

## 1. The impact boundary (plan + tasks phases)

Spec 042 may create/modify files **only** inside:

```
academy-dashboard-discovery/specs/042-exhaustive-legacy-capability-reconciliation/
```

…plus the **CLAUDE.md `<!-- SPECKIT -->` marker block** the standard workflow refreshes (`plan.md` D14, reported
separately) and, per `count-and-impact-contract.md` §3, `.specify/feature.json` (the speckit pointer).
**Nothing else.** Within the spec directory, the specify-phase ledgers (spec.md, the audits, the registers, the
maps, `checklists/requirements.md`) are committed evidence and are **not edited** — the one known draft conflict
is handled by precedence (`plan.md` D2), not by rewriting the draft.

## 2. MUST BE 0-DIFF (a diff here is a STOP, not a cleanup item)

| Path | Why |
|---|---|
| `app/src/**` | 042 implements nothing |
| `app/tests/**` | the Spec-041 gates stand exactly as committed (`protected-test-carryover-contract.md`) |
| `app/public/**` | no generated HTML edit; the build is not re-run *as a change* |
| `app/scripts/**` · `app/package.json` | no build/dependency change |
| `app/src/js/nav.config.js` | no nav edit, no new route, no status flip |

## 3. The zero-diff proof (run at the end of each 042 phase)

```
git diff --stat -- academy-dashboard-discovery/app        →  (empty)
git status --porcelain academy-dashboard-discovery/app    →  (empty)
```

…and the nine invariants of `count-route-freeze-contract.md` §1 re-derive to the same values. Because no
application file is touched, the Spec-041 suites remain green **by construction** — they may be run as a no-op
sanity check, never cited as evidence of a change.

## 4. STOP-and-report: specify-phase ledger contradictions

If a **factual** contradiction is discovered in a specify-phase ledger (not a superseded draft — those resolve
by D2 precedence): **STOP. Report the contradiction with both citations (path + stable ID) before any edit.**
Never silently rewrite the audit; never "harmonize" two artifacts by editing the inconvenient one; never fix the
fact in a new document while leaving the ledger claiming otherwise. The report decides whether a declared
correction is authorized — and by whom.

## 5. No git mutation — the watcher owns commits

**No commit · no push · no merge · no rebase · no pull · no branch · no stash · no reset · no checkout · no
clean** (`plan.md` Stop conditions). Spec 042's phases leave their files in the working tree; **the watcher
commits**. Non-destructive read-only git (status, diff, log, show) is the only sanctioned git usage — proving
zero-diff must never itself mutate state (no `git stash` "to check", no `git checkout --` "to restore").

## 6. Scope discipline for future specs (inherited shape)

Every spec 043–057 declares its own impact boundary in its own plan using this contract's shape: an explicit
allowlist, an explicit 0-diff list, the proof commands, and the STOP rule. "Just fixing one small thing while in
there" is the canonical violation (`count-and-impact-contract.md` §1) — a change outside the declared boundary is
an unreviewed change even if it is correct.

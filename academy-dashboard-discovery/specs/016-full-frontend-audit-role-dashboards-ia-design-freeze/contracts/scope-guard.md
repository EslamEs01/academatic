# Contract: Scope Guard (Spec 016)

**Status**: Binding · The change-surface law for this docs-only spec.

## G1 — Allowed (exhaustive)
1. `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/**` (spec.md, checklists, the 11 strategy artifacts, plan.md, research.md, data-model.md, quickstart.md, contracts/).
2. `.specify/feature.json` — the feature pointer only.

## G2 — Forbidden (hard)
anything under `app/` (src/public/styles/tests/scripts/package) · `nav.config.js` · `portal-shell.js` · CLAUDE.md (deferred to 017) · README.md · REVIEW.md · the Spec-012 coverage artifact (extended by future delivery notes, not by 016) · any build/regeneration side-effect · commit · push · any git hook · any implementation task (tasks.md is VERIFICATION-ONLY, see amendment A1).

## Amendment A1 (sanctioned at /speckit-tasks time)
The original G2 forbade a tasks.md outright (per the specify-phase brief "no tasks"). The user's explicit `/speckit-tasks` invocation sanctions ONE tasks.md whose tasks are **verification-only** — document consistency checks, closure sweeps, git-cleanliness audits, and the Spec-017 readiness gate. It may not contain implementation, app-source, build, or test-harness work of any kind.

## G3 — Audit (at completion)
1. `git status --short` = the two G1 paths only.
2. `git diff -- academy-dashboard-discovery/app` empty; built output byte-identical to HEAD (49 files untouched).
3. tasks.md (if generated) contains verification-only tasks per amendment A1 — zero tasks touch any G2 path.
4. Artifact consistency: quickstart §2/§3 checks all green (counts 20/57/178/49; zero unclassified/uncategorized/needs-decision/TBD).
5. Consumer-readiness: the Spec-017 readiness test (quickstart §4) passes.

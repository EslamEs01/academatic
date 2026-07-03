# Contract: No App-Source Change (Spec 016)

**Status**: Binding on THIS spec.

1. Spec 016 changes nothing under `academy-dashboard-discovery/app/` — no src, public, styles, tests, scripts, package files.
2. Allowed writes: `specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/**` + `.specify/feature.json` (pointer only).
3. No tasks.md exists for this spec; no build artifacts regenerate; no commit/push/hook.
4. Verification: `git status --short` shows only the two sanctioned paths; `git diff -- academy-dashboard-discovery/app` is empty.

**Acceptance**: the two git checks green at spec completion (verified at plan pre-flight: only feature.json + the spec folder present).

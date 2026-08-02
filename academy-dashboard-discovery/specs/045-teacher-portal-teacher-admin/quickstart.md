# Spec 045 Verification Quickstart

## Preconditions

- Work only on `045-teacher-portal-teacher-admin`.
- Preserve HEAD `722be1c37904f0fd44d666553e91239d7e8b4400`; do not commit or publish.
- Read the assigned EG-045 evidence packet and exact screenshots before editing.
- Own only files named in the assignment ledger.

## Canonical application commands

Run from `academy-dashboard-discovery/app`:

```bash
npm run build
npm run test:smoke
npm run test:a11y
npm run screenshots
node tests/interaction/inventory.cjs
node tests/interaction/run.cjs
node tests/interaction/layout.cjs
node tests/interaction/impact.cjs
```

Use focused existing driver options where supported during a batch; the final gate runs the full commands.

## Batch acceptance

1. Inspect the actual authored diff and generated consumers.
2. Confirm no forbidden/unowned file changed.
3. Build canonically.
4. Run focused route, selector, behavior, locale, privacy, and 390px checks.
5. Open the affected screenshot at original detail.
6. Record console, overflow, clipping, accessibility, and visual verdict.
7. Review tests for silent skips or weakened assertions.
8. Accept or return exact corrections.

## Full acceptance

- 11 scopes / 22 localized consumers exact.
- Build and generated parity green.
- Smoke fully green.
- Accessibility critical=0 and serious=0.
- Screenshot console errors=0.
- AR/EN, RTL/LTR, light/dark, desktop/390px matrix accepted.
- Privacy/pay/rank/absence/portal-admin/interaction/action guards green.
- Every required isolated mutation exact RED→GREEN.
- Mutation residue=0.
- Exact impact with unrelated page-body drift=0.
- `git diff --check` green.

No screenshot existence, executor “done,” unrelated failure, or hidden-UI-only check is acceptance.

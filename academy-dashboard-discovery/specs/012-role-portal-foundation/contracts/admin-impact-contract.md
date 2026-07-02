# Contract: Admin Impact (Spec 012)

**Status**: Binding · The admin console is untouched — the strongest bar yet. References FR-013/FR-014; US8; SC-002/SC-009/SC-010.

## 1. The invariant

Zero admin change: no nav item/link, no body change, no shared-component behavior change, no admin fixture change. **All 40 admin built files rebuild content-identical to HEAD** (unlike Specs 009/010, nothing here gives them a reason to differ — this is asserted by hash compare, not just body-scoping). Dashboard/reports/finance bodies inherit their standing contracts automatically.

## 2. The two sanctioned edits (documented, not admin-visible)

1. `nav.config.js` `FUTURE_ROLE` `reason` strings updated to the post-012 truth (research D7) — comment-level wording; the register's structure and the "never an admin nav item" guarantee unchanged. This edit MUST NOT alter any rendered admin output (the register is never rendered).
2. `tests/smoke/run.cjs` portal-absence assertion re-scoped to the 20 admin bases (kept verbatim there); portal pages get their own block. Never deleted, never weakened on admin pages.

## 3. Enforcement

Hash-compare all 40 admin `public/*.html` vs `git show HEAD:` (scope-guard audit #1); `git diff` empty on all admin page modules/fixtures/components/`enhance.js`/`package.json`; Spec 008/009/010/011 guard audits re-run green; the admin-dashboard unchanged-proof screenshot reviewed.

**Acceptance (binding):**
1. **Given** the rebuilt output, **When** the 40 admin files are hash-compared with HEAD, **Then** all identical.
2. **Given** `git diff`, **When** reviewed, **Then** admin-side changes are exactly the two sanctioned edits.
3. **Given** all prior guards, **When** re-run, **Then** green.

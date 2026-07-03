# Contract: Admin Impact (Spec 013)

**Status**: Binding · References FR-021/FR-023, SC-008; research D10. Carries forward the Spec-012 admin-impact standard unchanged.

## 1. Zero admin change

- All **40 admin built files hash-identical to HEAD** after the full Spec-013 build (byte-identity — the strongest standard, again feasible because no shared file changes).
- No admin page module, fixture, component, nav config, or built body is touched; no admin nav/sidebar item, link, or reference to any portal appears (standing invariant, smoke-asserted on the 20 admin bases).
- Reports/finance/dashboard body contracts (Specs 008/009/011) re-run green untouched.

## 2. Forbidden absolutely

Admin page/nav/body edits · admin fixtures edits · `nav.config.js` · `build-html.mjs` · `enhance.js` · `package.json` · any admin-visible wording.

## Acceptance (binding)

1. **Given** the post-build hash compare, **Then** 40/40 admin files identical (the audit lists any offender by name — expected: none).
2. **Given** the smoke run, **Then** every admin-scoped assertion (shell, nav IA, portal-absence, truthfulness) passes byte-verbatim.
3. **Given** the admin dashboard unchanged-proof frame, **Then** it is pixel-equivalent to the Spec-012 record.

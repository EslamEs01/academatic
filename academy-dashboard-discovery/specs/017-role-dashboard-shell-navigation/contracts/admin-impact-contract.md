# Contract: Admin Impact (Spec 017)

**Status**: Binding.

1. ZERO admin file changes: all 40 admin built files + `index.html` hash-identical to HEAD → **41/49**; only the four portal pairs differ.
2. `nav.config.js`, `enhance.js`, `build-html.mjs`, `package.json`, all admin page modules/fixtures: `git diff` empty.
3. The Spec-012 portal-absence assert on admin pages and admin-markup-absence on portal pages stay byte-verbatim green.
4. The hub remains the only entry; no admin page gains any role-app reference.

**Acceptance**: hash-compare + guarded-diff checks in the G-audit.

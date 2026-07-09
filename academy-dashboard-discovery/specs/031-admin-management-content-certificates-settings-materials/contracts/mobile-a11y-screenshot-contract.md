# Contract: Mobile / A11y / Screenshot

**Purpose**: Every new/folded 031 surface is accessible, responsive, and visually captured.

**A11y MUST** (critical=0 serious=0): add rows for staff, library (Materials+Books tabs), certificates (Templates+Requests tabs), settings hub tabs, one create/edit modal, one detail drawer, dark + light, mobile 390. Honest gates aria-safe (aria-disabled + reason).

**Screenshots MUST** (0 console errors): staff directory + RBAC drawer; library Materials/Books + category drawer; certificates Templates + static designer + request gate; settings overview + integrations locked card + create/edit modal; mobile 390 proof; dark-mode proof. Update `screenshots/REVIEW.md`.

**Mobile MUST**: 390px — settings hub tabs, staff directory, library/certificates tabs reflow with no horizontal overflow.

**Verify**: `npm run test:a11y` (0/0) + `node tests/screenshots/capture.cjs` (0 errors) + REVIEW.md updated.

**Status**: Binding.

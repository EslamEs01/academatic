# Contract: B-02 — Locations ownership (Must fix)

**Problem**: the legacy admin RBAC "Locations" permission group (Show/Add/Edit/Delete) has no owner row in the 57-row inventory or the 026–031 plan (M-04).

## Decision

- Owner = **Spec 031** (admin management/content/certificates/settings) as a display slice inside settings/general — legacy general settings already carries Country/City/Timezone/Address.
- Spec 024 records the decision ONLY. No Locations page is built.

## Allowed edits

- Append-only owner note to `specs/023-…/coverage-matrix.md` (Locations row) and `missing-capabilities-register.md` (M-04 status → "owner 031, recorded in 024").
- This spec's `correction-scope.md` (already carries B-02).

## Forbidden

- Building any Locations page.
- Adding a `nav.config.js` item (would imply an owned surface 031 has not designed).
- Any fake Locations UI.

## Acceptance

- A written owner (Spec 031) exists; the admin capability map reads as fully owned (58 with Locations); Spec 032's no-missing audit would pass.

**Owner**: 024-correction (Must fix) → build owned by 031.

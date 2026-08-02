# Contract 9 — Privacy / Anti-Poaching Role Law (binding on the implementation) — executable

The role-visibility + anti-poaching law from `../role-visibility-matrix.md` + `../anti-poaching-contract.md`,
reduced to the executable constraints the 6 changed bodies must satisfy.

## The absolute (verified today; the implementation must not regress it)

- **Teacher surfaces**: DENY guardian phone/e-mail, student private contact, address/country/locality, lead
  contact, Left/Acquired attribution, and pay. No teacher-reachable parent-contact grant. Minimum learning
  identity only. (Guards G1/G2/G3; MUT-1/MUT-2. The teacher policy preview adds NO contact/locality/pay row.)
- **Guardian-facing surfaces**: only the active authored family (fam1); no cross-family data. (G4/MUT-8.)
- **Child-view**: no password/account affordance; no guardian contact; only the child's own learning/session
  data. (G5/MUT-3; the child-view screenshot confirms guardian = name+city only.)
- **Secrets**: 0 rendered secret/PAN/type=password/value slot; the parent-contact + teacher-policy previews are
  structure-only. (G10/MUT-5.)
- **DENY ≠ masking-via-CSS** — DENY means data absent from fixtures/DOM (verified by grep=0), not `display:none`.

## Data classes touched by the 3 edited surfaces

| Surface | Class rendered | Disposition |
|---|---|---|
| `student-profile` (child-view) | guardian name+city (matrix note 2/3) · own learning identity · 2 gates | guardian contact = DENY (absent); no account control |
| `staff.html` (RBAC preview) | the 5 parent-contact permission rows (structure-only, deny-by-default) | admin-only preview; teacher-unreachable; no value |
| `teacher.html` (policy preview) | capability + non-pay notification rows (structure-only) | no contact/locality/pay; enforcement backend |

## Verification

The guards G1–G14 (Contract 5) collectively enforce this law on the built output; the mutations
(Contract 7) prove each is falsifiable. Preservation rows I-01…I-06 + B-4.* re-asserted post-change (no
regression). Applicable RJ rows (RJ-11/13/19/21/22/26/30/33/36/38 + others) stay negative requirements — 0
re-proposals.

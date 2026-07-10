# Contract: Locale Parity

**Purpose**: Every new form key is mirrored AR/EN; 0 raw keys.

**MUST**:
- New field-label / option-label / gate-reason keys go into the EXISTING per-spec module pairs (`ar/en.fam.js`, `.crs.js`, `.trn.js`, `.rep.js`, `.fin.js`, `.adm.js`, `.extra.js`/`.ops.js`) — no new locale module unless a spec needs one.
- Every new key added to BOTH ar.X.js and en.X.js (mirrored).
- 11 locale pairs remain 0-divergence (flattened-key diff `onlyAr=0`/`onlyEn=0`); i18n.js registration unchanged.
- 0 raw keys (`⟦`) in any built page (smoke).

**Verify**: re-run the flattened-key diff per pair → 0 divergence; smoke raw-key check = 0.

**Status**: Binding (11 pairs 0-divergence today).

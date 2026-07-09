# Contract — Export / Print / Download / Upload Gate

**MUST**: Export/Print/Download/Upload are `backendRequired`/`planned` gates unless truly implemented (none are). No fake file generation, download, or upload.

**Acceptance**
- reports Print + finance Print reclassified from `data-demo-action` → `backendRequired` gate (aligned with the adjacent Export CSV/PDF `data-disabled-reason`).
- sessions-analysis / new-page exports = `backendRequired` gate.
- No admin upload is faked (none exists today; any new one is a gate).
- Finance stays Spec-009-invariant (no pay math introduced by Print/Export copy).
- **Fail** if any export/print/download/upload produces or claims a file.

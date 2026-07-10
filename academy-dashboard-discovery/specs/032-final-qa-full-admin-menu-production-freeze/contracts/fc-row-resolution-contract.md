# Contract: FC-Row Resolution

**Purpose**: Every FC-01…FC-40 resolved to a form/picker/gate.

**MUST** — resolve each row per `data-model.md` / `research.md` D8–D34:
- **FORM drawer** (grounded fields + Save gate): FC-01/02/03 · FC-04/06/07/08/09/11/12/13/14 · FC-15/16/17/18/19 · FC-20/21/22/23/24 · FC-25/26/27/28 · FC-29 · FC-30/31/32/33/34/35/36/37/38(lib) · FC-39(head).
- **PICKER reuse + select** (FC-05 family reclassify): existing `fam-cat` drawer + a category select.
- **WIZARD append** (FC-10): real `childRow` in add-family.
- **PANEL gate** (settings customization save / policy edit): panel already shows fields → Save/Edit = `data-disabled-reason` gate.
- **LINK/cleanup** (FC-40): empty-state CTA routes to host create form/list.
- Every FORM's Save = backendRequired gate; every MUST-OMIT field omitted; every MUST-GATE affordance a gate.

**Verify**: `missing-frontend-form-register.md` 0 unresolved; smoke opens each FC trigger and finds a control + gate (or the row is a registered picker/gate/link).

**Status**: Binding.

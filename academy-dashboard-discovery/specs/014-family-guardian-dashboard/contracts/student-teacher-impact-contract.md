# Contract: Student / Teacher / Hub Impact (Spec 014)

**Status**: Binding · References FR-024, SC-009; research D12. The sibling-protection contract — now guarding the DELIVERED Spec-013 student dashboard too.

## 1. Byte-identity default

`student-portal.html`/`.en.html`, `teacher-portal.html`/`.en.html`, `portals.html`/`.en.html`, and `index.html` rebuild **byte-identical to HEAD**. Combined with the 40 admin files: **47 of 49 built files identical; only the family pair changes.**

## 2. Enforcement by construction

- **Shared-key freeze**: `prt.shell.*`, `prt.portal.*`, `prt.role.*`, `prt.title.*`, `prt.hub.*` read-only.
- **Sibling-namespace freeze**: `prt.stu.*` (the delivered student dashboard), `prt.tch.*`, `data.prtStu*`, `data.prtNote1/2` read-only. New keys live under `prt.fam.*` and `data.prtFam*` only (family-owned keys like `kidsHint` may be updated — they render only on the family page).
- **Fixture-block discipline**: `fixtures/portal.js` edits confined to `FAMILY_PREVIEW` and `PORTAL_PLANNED.family`; `PORTAL_PERSONAS`, `STUDENT_PREVIEW`, `PORTAL_PLANNED.student/teacher` untouched.
- **Shell + registry freeze**: `portal-shell.js`, `build-html.mjs`, `nav.config.js` untouched.
- **CSS**: additive namespaced selectors only (external stylesheet — cannot alter other built HTML bytes).
- **Smoke**: the Spec-013 student branch + teacher/hub expectations re-run byte-verbatim (incl. the teacher pay-token grep and the student planned/gauge/empty asserts).

## Acceptance (binding)

1. **Given** the post-build hash compare, **Then** the 6 sibling files + index are identical to HEAD.
2. **Given** the locale diff, **Then** only `prt.fam.*`/`data.prtFam*` changes appear, key-mirrored AR/EN.
3. **Given** the three unchanged-proof frames (student/teacher/hub), **Then** visual review confirms no drift.

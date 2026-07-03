# Contract: Student / Family / Hub Impact (Spec 015)

**Status**: Binding · References FR-023, SC-009; research D14. The sibling-protection contract — now guarding BOTH delivered dashboards (013 student + 014 family).

## 1. Byte-identity default

`student-portal.html`/`.en.html`, `family-portal.html`/`.en.html`, `portals.html`/`.en.html`, and `index.html` rebuild **byte-identical to HEAD**. Combined with the 40 admin files: **47 of 49 built files identical; only the teacher pair changes.**

## 2. Enforcement by construction

- **Shared-key freeze**: `prt.shell.*`, `prt.portal.*`, `prt.role.*`, `prt.title.*`, `prt.hub.*` read-only.
- **Sibling-namespace freeze**: `prt.stu.*` (delivered student dashboard), `prt.fam.*` (delivered family dashboard), `data.prtStu*`, `data.prtFam*`, `data.prtNote1/2` read-only. New keys live under `prt.tch.*` and `data.prtTch*` only.
- **Fixture-block discipline**: `fixtures/portal.js` edits confined to the NEW `TEACHER_PREVIEW` block + `PORTAL_PLANNED.teacher`; `PORTAL_PERSONAS`, `STUDENT_PREVIEW`, `FAMILY_PREVIEW`, `PORTAL_PLANNED.student/family` untouched.
- **Shell + registry freeze**: `portal-shell.js`, `build-html.mjs`, `nav.config.js` untouched.
- **CSS**: additive namespaced selectors only (external stylesheet — cannot alter other built HTML bytes).
- **Smoke**: the Spec-013 student branch + Spec-014 family branch (incl. its zero-pay regex) + hub expectations re-run byte-verbatim.

## Acceptance (binding)

1. **Given** the post-build hash compare, **Then** the 6 sibling files + index are identical to HEAD.
2. **Given** the locale diff, **Then** only `prt.tch.*`/`data.prtTch*` changes appear, key-mirrored AR/EN.
3. **Given** the three unchanged-proof frames (student/family/hub), **Then** visual review confirms no drift.

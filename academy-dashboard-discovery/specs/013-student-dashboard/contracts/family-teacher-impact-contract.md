# Contract: Family / Teacher / Hub Impact (Spec 013)

**Status**: Binding · References FR-022, SC-008; research D10. NEW contract class — the first spec that must protect *sibling portals*.

## 1. Byte-identity default

`family-portal.html`/`.en.html`, `teacher-portal.html`/`.en.html`, and `portals.html`/`.en.html` (plus `index.html`) rebuild **byte-identical to HEAD**. Combined with the admin 40: **47 of 49 built files identical; only the student pair changes.**

## 2. Enforcement by construction

- **Shared-key freeze**: `prt.shell.*`, `prt.portal.*`, `prt.role.*`, `prt.title.{hub,family,teacher}`, `prt.hub.*`, `prt.fam.*`, `prt.tch.*`, `data.prtNote1/2` are read-only. New keys live under `prt.stu.*` and `data.prtStu*` only.
- **Fixture-block discipline**: `fixtures/portal.js` edits confined to `STUDENT_PREVIEW` and `PORTAL_PLANNED.student`; `PORTAL_PERSONAS`, `FAMILY_PREVIEW`, `PORTAL_PLANNED.family/teacher` untouched.
- **Shell freeze**: `portal-shell.js` untouched (any shell bug discovered is reported, not fixed here, unless proven unavoidable AND itemized as a sanctioned deviation BEFORE implementation).
- **CSS**: additive namespaced selectors only — and being an external stylesheet, `app.css` cannot alter built-HTML bytes regardless.
- The hub gains nothing: no new links/labels (the student card's existing copy already fits the deepened page).

## 3. Teacher pay guard

The teacher-portal pay-token grep (word-bounded EN + AR) re-runs green — trivially, since the teacher files don't change; the audit still runs as proof.

## Acceptance (binding)

1. **Given** the post-build hash compare, **Then** the 6 sibling-portal files + index are identical to HEAD.
2. **Given** the locale diff, **Then** only `prt.stu.*`/`data.prtStu*` additions appear, key-mirrored AR/EN.
3. **Given** the three unchanged-proof frames (hub/family/teacher), **Then** visual review confirms no drift.

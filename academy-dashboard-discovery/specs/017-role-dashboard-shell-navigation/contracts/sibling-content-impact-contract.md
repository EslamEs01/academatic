# Contract: Sibling Content Impact (Spec 017)

**Status**: Binding.

1. Frozen byte-untouched: ALL `prt.stu.*`, `prt.fam.*`, `prt.tch.*` content keys, all `data.prt*` strings, `PORTAL_PERSONAS`, `STUDENT_PREVIEW`, `FAMILY_PREVIEW`, `TEACHER_PREVIEW`, `PORTAL_PLANNED` — the fixture gains ROLE_NAV ONLY.
2. 017-owned locale surface: the NEW `prt.nav.*` namespace + the FOUR sanctioned hub-copy keys (`prt.hub.sub` + 3 role-card `d` lines). `prt.shell/portal/role/title` and every other key byte-verbatim.
3. The three role page modules: content untouched (integrity contract); `portals.js` markup untouched (copy keys only).

**Acceptance**: locale diff shows only `prt.nav.*` additions + the 4 reworded values; fixture diff shows only ROLE_NAV.

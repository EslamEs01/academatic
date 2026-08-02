# Contract 3 — Parent-Contact Deny-by-Default Registry (outcome B, C12-13/C12-01/G-01) — executable

Translates `../parent-contact-default-deny-contract.md` into the exact fixture + locale edit + mutations. Host:
the existing staff RBAC preview (`permDrawer`, `staff.js:42-52`), already dispatched via `data-drawer="st-perm"`
(`enhance.js:156`). **`staff.js` = 0-diff** — `permDrawer` maps `PERM_GROUPS` generically.

## The exact edits

### 1. Fixture: `src/js/fixtures/staff-management.js` → `PERM_GROUPS` (lines 34-45)
Add one group (the 5 separate parent-contact permissions, all deny-by-default):
```js
{ labelKey: 'adm.staff.perm.g.parents', items: [
  { k: 'viewPhone', granted: false },
  { k: 'viewEmail', granted: false },
  { k: 'exportContacts', granted: false },
  { k: 'approvedUse', granted: false },
  { k: 'revealMasked', granted: false },
] },
```
`permDrawer` renders each as `icon('x-circle') + t('adm.staff.perm.i.<k>') — t('adm.staff.perm.notGranted')`.

### 2. Locale: `src/locales/ar.adm.js` + `src/locales/en.adm.js` (inside the existing `perm` block, 27-32)
- `g.parents` — group label (AR "أولياء الأمور — بيانات التواصل" / EN "Parent Contacts").
- `i.viewPhone`, `i.viewEmail`, `i.exportContacts`, `i.approvedUse`, `i.revealMasked` — the 5 row labels
  (bilingual, mirrored; use distinct keys — do NOT reuse the generic `i.export` which renders ambiguous "Export").
- **No new note key** — the shared `perm.note` ("Display-only matrix — no real enforcement" / "مصفوفة عرض فقط —
  دون تفعيل حقيقي") already states deny-by-default / no-enforcement. Reuse verbatim.

## Invariants (STOP if any cannot hold)

- Every row `granted:false` (deny-by-default). Never "all granted".
- **Teacher-unreachable**: the group lives in `PERM_GROUPS`, rendered only by `permDrawer` (staff.html); no
  teacher surface imports `PERM_GROUPS` (structural). G3 asserts no teacher-facing file references these keys.
- Structure-only: no value slot, no toggle, no data-attribute payload, no query string. Display-only preview.
- No new RBAC engine, no new page, no new shared component. `staff.js`/`enhance.js`/`i18n.js` = 0-diff.
- Wording says real field-level authorization is FUTURE_BACKEND (the shared `note` + the Save gate reason).

## Guards

- **G11 (deny-by-default)**: a source census that the `parents` group's 5 items are all `granted:false`.
- **G3 (teacher-unreachable)**: a source census that no teacher-facing file (`teacher*.js`, `teacher-*` fixtures)
  references `adm.staff.perm.g.parents`/`i.viewPhone`/etc., and that the parents group is not rendered on any
  teacher page body (grep the built teacher HTML). Mirrors the ROUTES_50 closed-register pattern
  (`smoke:2606-2652`).

## Mutations

- **MUT-2**: on an isolated copy, make a parent-contact grant reachable by a teacher (add the parents group to a
  teacher-rendered surface, or a `granted:true` parent row that a teacher body renders) → G3 teacher-unreachable
  assert RED. Restore → GREEN.
- **MUT-6**: flip one parent row to `granted:true` → G11 deny-by-default assert RED. Restore → GREEN.

## Downstream

**Spec 048 PRESERVES only**; **Spec 044 owns host interaction/design quality, never the privacy content.**

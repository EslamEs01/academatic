# Contract 10 — Fixtures & Locales — executable

Exact fixture shapes + bilingual locale keys for the three source edits. No new module → `i18n.js` 0-diff.

## Fixtures

### `src/js/fixtures/portal.js` (edit)
`STUDENT_PAGES.profile.gates` (320-324): **remove** the `passwordChange` entry (line 323). No other change.
`FAMILY_PAGES.profile.gates` (377-381): **0-diff** (keeps `passwordChange`).

### `src/js/fixtures/staff-management.js` (add)
Append one group to `PERM_GROUPS`: `{ labelKey:'adm.staff.perm.g.parents', items:[
{k:'viewPhone',granted:false},{k:'viewEmail',granted:false},{k:'exportContacts',granted:false},
{k:'approvedUse',granted:false},{k:'revealMasked',granted:false} ] }`. No `STAFF_ROLES`/`STAFF`/`STAFF_ACTIVITY`
change.

### `src/js/fixtures/teacher-management.js` (add)
Add `export const TEACHER_CAPABILITY_POLICY = { academic:[…4 rows…], comm:[…3 non-pay rows…] }` (data-model E2).
No `salary` row. No `ASSIGN_*`/`AVAILABILITY_WINDOWS` change.

## Locales (bilingual, mirrored, inside already-registered namespaces)

### `src/locales/ar.adm.js` + `src/locales/en.adm.js` — inside the existing `perm` block (27-32)
Add: `g.parents` (group label) + `i.viewPhone` / `i.viewEmail` / `i.exportContacts` / `i.approvedUse` /
`i.revealMasked`. Reuse the existing `perm.note`, `perm.granted`, `perm.notGranted`, `perm.save`,
`perm.saveReason` verbatim (no new state keys).

### `src/locales/ar.trn.js` + `src/locales/en.trn.js` — new `trn.policy.*` block
`title` · `academicTitle` · `commTitle` · `cap.{chat,library,editSchedule,editClass}` · notification event +
`ch.{whatsapp,email}` labels · `granted`/`notGranted` (local twins) · `note` · gate `open`/`reason`.

## Rules

- AR and EN are separate mirrored files — every new key exists in BOTH with mirrored structure, only string
  values differ. Locale parity must hold (0 divergence between ar/en key sets).
- No new locale MODULE (would need `i18n.js` registration = a forbidden-file change/STOP). `adm.*` and `trn.*`
  are already registered.
- No real PII in any fixture/locale value — authored synthetic labels only. No phone/e-mail/address/country in a
  teacher fixture. No pay figure/currency anywhere in the new fixtures/locales.
- The `prt.stu.pg.prof.gPass.*` keys become unused after the child-view removal — leaving them is harmless (no
  locale edit required for G-03); do not add churn removing them unless a cleanliness pass is explicitly wanted.

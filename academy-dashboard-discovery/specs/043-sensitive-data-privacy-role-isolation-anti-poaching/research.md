# Research — Spec 043 Plan Phase

Grounded decisions (Decision · Rationale · Alternatives) for the five Wave-0 outcomes. Every decision is
evidence-backed; the grounding trace + honest counts are at the end. Cited by path + line; the specify
artifacts' old line numbers were **re-verified against the current tree** (drift check below).

## Grounding trace (honest counts)

**Targeted Visual Grounding (screenshots re-opened AS IMAGES this plan phase):**
- By the writer (3, current-app, for the render hosts): `student-profile__ar__light__desktop.png` (3 gate
  cards — photo/save/**password**; guardian name+city only; «عرض الابن») · `staff__ar__light__desktop__sp031-staff-rbac.png`
  (the RBAC host directory; header «عرض فقط: كل إجراء يحتاج ربط الخادم»; the open drawer was never captured —
  UK-44) · `teacher__ar__light__desktop.png` (admin teacher detail; 8-tab bar + overview info-cards;
  **pay-free** — availability/workload are categorical chips, no figures).
- By the visual grounding agent (9, legacy+family): the two 170-permission matrices (Show Parent Phone / Show
  Parent Email confirmed as the ONLY 2 named PII gates), the teacher roster Country column (`VUT`), the teacher
  profile Left/Acquired + live invite URL + `Hour Rate 120 EGP`, **the teacher Settings tab** (capabilities
  Chat=On/Library=On/Edit-Schedule=Off/Edit-Class=Off + the notification matrix with the **Salary** row), both
  WhatsApp insights, the family child-profile edit, the admin password-as-text defect.

**Current-source grounding (agents + writer):** `portal.js`, `student-profile.js`, `family-profile.js`,
`teacher-profile.js`, `staff-management.js`, `staff.js`, `teacher-management.js`, `teacher.js`, the shared
`components/preview-drawer.js`/`portal-page.js`/`tabs.js`, `nav.config.js`, `enhance.js`, `sidebar.js`,
`i18n.js`, `build-html.mjs`, `package.json`, and the 4 locale files (`ar/en.adm.js`, `ar/en.trn.js`).

**Test grounding:** `tests/smoke/run.cjs` (2904 lines), `tests/a11y/run.cjs` (398), `tests/screenshots/capture.cjs`
(561), `app/screenshots/REVIEW.md` (1026).

**Drift verdict: ZERO functional drift.** All specify-phase line citations re-verified exact against the current
tree, including the two load-bearing supersession lines `smoke:1971` and `smoke:2082`. Two cosmetic corrections:
(1) the R-3 console-error gate `if (withErrors > 0)` is at `capture.cjs:555` (the specify register cited 556, the
message line one below); (2) `REVIEW.md` lives at `app/screenshots/REVIEW.md`, not `tests/screenshots/`.

---

## Decision 1 — Child-view password-gate removal (outcome A, C12-09)

**Decision**: delete the single fixture entry `passwordChange` from `STUDENT_PAGES.profile.gates`
(`fixtures/portal.js:323`). `student-profile.js:72` renders the array via `STUDENT_PAGES.profile.gates.map(plannedCard)`,
so removing the entry reduces the child-view profile from 3 gate cards to 2 (photo + profile-save) with **no
page-renderer edit**.

**Rationale**: the child-view is «عرض الابن», not an adult account — the legacy has no student login (the
`/student/*` login IS the family/guardian, confirmed at the cookie layer). A password-change gate implies an
account the child does not have (G-03). Pixel-verified: the current child-view shows exactly 3 gate cards and a
guardian block that is name+city only (no contact) — removing the password card is the minimal correct change.

**Alternatives rejected**: (a) editing `student-profile.js` to filter the gate — unnecessary (the fixture is the
source of truth); (b) removing the `prt.stu.pg.prof.gPass.*` locale keys — harmless-if-left (they become unused);
leaving them avoids extra churn (zero-deletion parity). (c) touching family/teacher — REJECTED: `FAMILY_PAGES.profile.gates:380`
and the inline `teacher-profile.js:83-85` gates belong to real account holders and stay byte-verbatim. The three
gate sets are **separate arrays** (no shared aliasing) — a shared-array edit cannot accidentally remove all three.

**Supersession**: `smoke:1971` (`ok(prt.plannedBackend === 3` → `=== 2`, comment "photo/save/password" →
"photo/save") + `smoke:2082` (`'student-profile': 3` → `2`). `plannedBackend` = `.pt-planned .chip.tone-amber`
count (`smoke:1916`). Neighbours preserved byte-verbatim: family assert `smoke:2007` + map `smoke:2083`; teacher
assert `smoke:2020` + map `smoke:2084`. MUT-3 re-adds the gate → RED.

## Decision 2 — Parent-contact deny-by-default registry (outcome B, C12-13/C12-01/G-01)

**Decision**: add ONE new group to `PERM_GROUPS` (`fixtures/staff-management.js:34-45`):
`{ labelKey: 'adm.staff.perm.g.parents', items: [ {k:'viewPhone',granted:false}, {k:'viewEmail',granted:false},
{k:'exportContacts',granted:false}, {k:'approvedUse',granted:false}, {k:'revealMasked',granted:false} ] }` — the
five separate parent-contact permissions, all `granted:false`. Add the locale keys `adm.staff.perm.g.parents` +
`adm.staff.perm.i.{viewPhone,viewEmail,exportContacts,approvedUse,revealMasked}` to `ar.adm.js`/`en.adm.js`
(inside the existing `perm` block, lines 27-32). **`staff.js` is 0-diff** — `permDrawer()` (`staff.js:42-52`)
maps `PERM_GROUPS` generically (`t('adm.staff.perm.i.'+it.k)` + `check-circle`/`x-circle` + granted/notGranted),
and the drawer is already dispatched via `data-drawer="st-perm"` (`enhance.js:156`). The shared `note`
(«مصفوفة عرض فقط — دون تفعيل حقيقي» / "Display-only matrix — no real enforcement") already carries the
deny-by-default / no-enforcement framing.

**Rationale**: the legacy 170-permission matrix's ONLY two named PII gates are `parent-phone` (Show Parent
Phone) and `parent-email` (Show Parent Email), grantable-to-everyone and shipped ON (RJ-37); our `PERM_GROUPS`
has no parent-contact row at all (G-01). The 5-permission model (view phone · view email · export · approved use
· reveal masked) is the ratified specify decision; the staff RBAC preview is the correct, already-wired host —
teacher-unreachable by construction (`teacher.js` never imports `PERM_GROUPS`).

**Alternatives rejected**: (a) a new modal/host (044) — REJECTED, the existing `permDrawer` renders it; 044 owns
host quality, never privacy content. (b) reusing the generic `i.export` key — REJECTED (ambiguous "Export"); use
distinct `exportContacts`. (c) a real toggle — REJECTED (structure-only, no enforcement). **MUT-2** = add a
parent-contact grant reachable by a teacher surface → RED; **MUT-6** = flip one parent row `granted:true` → the
deny-by-default assert RED.

## Decision 3 — Teacher capability/notification policy preview (outcome C, C02-04/C02-05)

**Decision**: a **structure-only** `capabilityPolicyDrawer('trn-policy')` on the teacher admin host
(`teacher.js`), mirroring the shipped `availabilityDrawer()` precedent (`teacher.js:131-137` — `previewTemplate`
+ `sheetRow()` rows + a trailing `data-disabled-reason` gate), opened via a new `data-drawer="trn-policy"`
trigger placed in the overview tab panel (beside the availability opener). Fed by a new structure-only
`TEACHER_CAPABILITY_POLICY` registry in `fixtures/teacher-management.js` and a `trn.policy.*` locale block
(`ar/en.trn.js`). The drawer body: an **Academic capabilities** subhead + 4 rows (`can_chat`, `can_see_library`,
`can_edit_schedule`, `can_edit_class` — display-only status, no toggle) + a **Communication & Notifications**
subhead + the non-pay notification-channel rows (Courses Update / Class Reminders / Class Updates × WhatsApp/Email
as structure rows) + the structure-only note. **The legacy `salary_*` notification row is EXCLUDED** (pay-free).

**Rationale**: C02-04/C02-05 are Spec-043 primary-owned MISSING rows requiring an actual frontend-now outcome
(not deferral). The legacy teacher Settings tab (pixel-verified) carries a live capabilities toggle form + a
notification matrix whose 4th row is a **Salary** pay-channel; the honest frontend renders the capabilities +
non-pay channels as a read-only policy preview and drops the Salary row. The existing teacher admin host is
pay-free today (verified) and uses the exact drawer precedent — no new component.

**Alternatives rejected**: (a) folding a 3rd info-card into the overview 2-col grid — workable but a drawer is
more contained and matches the availability/picker precedent exactly (smaller visual footprint, Ponytail-lite).
(b) live toggles — REJECTED (would imply enforcement). (c) a new `pol.*` namespace/module — REJECTED (would need
`i18n.js` registration = a forbidden-file change/STOP); `trn.*` is already registered. **MUT-TP** = add a pay
token (e.g. a Salary row / rate figure) to the policy preview → the teacher-policy census RED (0 pay token / 0
value slot / 0 enforcement / 0 guardian-contact).

## Decision 4 — Global privacy guards G1–G14 (outcome D)

**Decision**: implement all 14 guards in `tests/smoke/run.cjs` — additive except the ONE declared G5
supersession. Exact insertion points (re-grounded, current lines) in `global-privacy-guards-plan.md`. G7/G8 are
**strengthening** (broaden the settings-scoped real-PII regex `smoke:1287` sitewide); G9/G10 are already-strong
(no new assert / optional PAN census); the rest are additive net-new siblings to existing blocks.

**Rationale**: "already safe" ≠ "no implementation" — the implementation is the executable guard + its mutation.
The guards freeze the current safe posture BEFORE any dependent spec integrates, closing the circular defect.

**Alternatives rejected**: scheduling guards for 045–049 — REJECTED (circular; a dependent page's Gate 3 depends
on the guard being green). 043 owns them now.

## Decision 5 — Host, hook, and 0-diff strategy

**Decision**: reuse every existing host/hook. `permDrawer`/`data-drawer="st-perm"` for parent-contact;
`capabilityPolicyDrawer` mirroring `availabilityDrawer` + a `data-drawer="trn-policy"` trigger (generic
`openSheet` dispatch, `enhance.js:441/589`) for the teacher policy; the fixture-mapped renderers for the
child-view. **`i18n.js` stays 0-diff** — both previews extend already-registered namespaces (`adm.*`, `trn.*`);
new keys go inside existing locale files. `nav.config.js`/`enhance.js`/`sidebar.js`/`build-html.mjs`/`package.json`/
`staff.js`/`student-profile.js`/`family-profile.js`/`teacher-profile.js` = 0-diff.

**Rationale**: Ponytail-lite smallest-honest-solution + the count/route/hook freeze. Every outcome folds into an
existing host with an existing hook; no new page/route/nav-item/dependency/component/storage-key.

**Alternatives rejected**: any new module/namespace/component/page — REJECTED (forbidden-file change / STOP).

---

## Open questions

**None remain.** The specify phase resolved OQ-1…OQ-7 to safe defaults; the plan phase confirmed every render
path against the current source with zero drift and zero forbidden-file requirement. No `[NEEDS CLARIFICATION]`.

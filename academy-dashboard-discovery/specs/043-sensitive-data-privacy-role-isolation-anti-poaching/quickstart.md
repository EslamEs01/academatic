# Quickstart — Implementing Spec 043 (for `/speckit.implement`)

The exact edit list + verify loop for Spec 043's own Wave-0 implement phase. Every step folds into an existing
host; **0 new page/route/nav-item/dependency/component/hook/storage-key**. Impact: exactly **3 changed surfaces
/ 6 localized bodies** (`staff`, `teacher`, `student-profile` × AR/EN). All line numbers re-grounded against HEAD `cd56aa0` (zero
drift). Do not commit/push — the watcher owns commits.

## Prerequisites

- Clean tree at HEAD `cd56aa0`; `npm run build` byte-identical; smoke PASS; a11y 0/0.
- The `#page-body` md5 baseline snapshot exists (impact proof; `contracts/impact-protection-plan.md`).

## Edit list (the exact allowlist)

### Step A — Child-view password-gate removal (C12-09, outcome A)
1. `src/js/fixtures/portal.js` — **delete line 323** (the `passwordChange` entry) from
   `STUDENT_PAGES.profile.gates`. Leave `FAMILY_PAGES.profile.gates` (line 380) and the inline
   `teacher-profile.js:83-85` gates **byte-verbatim**. (The `prt.stu.pg.prof.gPass.*` locale keys become unused —
   leaving them is harmless; no locale edit required.)
1b. `src/js/pages/student-profile.js` — **MANDATORY comment-only correction** (part of this outcome): the header
   comment (`:1-4`) reads "…EXACTLY **three** backendRequired gates (photo upload · profile save · **password
   change** …)". Correct it to "…EXACTLY **two** backendRequired gates (photo upload · profile save …)" so no
   `password` token remains in the child header comment. **The functional renderer code (from the first `import` /
   the render function onward) stays byte-identical** — only the header comment differs.
2. `tests/smoke/run.cjs` — the DECLARED supersession (two lines only):
   - `:1971` `ok(prt.plannedBackend === 3` → `=== 2`; comment "photo/save/password" → "photo/save".
   - `:2082` `'student-profile': 3` → `'student-profile': 2`.
   - **Do NOT touch** family (`:2007`/`:2083`) or teacher (`:2020`/`:2084`).
3. Verify: build; `student-profile.html`/`.en` render **2** gate cards; `smoke` PASS; **MUT-3** RED→GREEN.

### Step B — Parent-contact registry (C12-13/C12-01/G-01, outcome B)
1. `src/js/fixtures/staff-management.js` — add one group to `PERM_GROUPS` (after the existing groups):
   `{ labelKey: 'adm.staff.perm.g.parents', items: [ {k:'viewPhone',granted:false}, {k:'viewEmail',granted:false},
   {k:'exportContacts',granted:false}, {k:'approvedUse',granted:false}, {k:'revealMasked',granted:false} ] }`.
2. `src/locales/ar.adm.js` + `src/locales/en.adm.js` — inside the existing `perm` block (lines 27-32): add
   `g.parents` (group label) and `i.viewPhone` / `i.viewEmail` / `i.exportContacts` / `i.approvedUse` /
   `i.revealMasked` (bilingual, mirrored). The shared `perm.note` already states deny-by-default/no-enforcement —
   reuse it (no new note key required).
3. `staff.js` = **0-diff** (`permDrawer` maps `PERM_GROUPS` generically).
4. Verify: build; `staff.html` RBAC drawer renders 5 new "not allowed" parent rows; smoke PASS; **MUT-2 + MUT-6**
   RED→GREEN.

### Step C — Teacher capability/notification policy preview (C02-04/C02-05, outcome C)
1. `src/js/fixtures/teacher-management.js` — add `TEACHER_CAPABILITY_POLICY` (structure-only registry; academic
   block: chat/library/editSchedule/editClass; communication block: coursesUpdate/classReminders/classUpdates ×
   whatsapp/email; **NO salary row**).
2. `src/js/pages/teacher.js` — add `capabilityPolicyDrawer('trn-policy', …)` mirroring `availabilityDrawer()`
   (`:131-137`): `previewTemplate('trn-policy', { titleKey:'trn.policy.title', … bodyHTML })` with `sheetRow()`
   rows under an academic subhead + a communication subhead + a trailing `data-disabled-reason` gate; append it
   to the `pickers` const (`:193-196`); add a `data-drawer="trn-policy"` trigger button inside the overview tab
   panel (beside the availability opener).
3. `src/locales/ar.trn.js` + `src/locales/en.trn.js` — add the `trn.policy.*` block (title, academicTitle,
   commTitle, cap.{chat,library,editSchedule,editClass}, ch.{whatsapp,email} + event labels, granted/notGranted,
   note). Bilingual, mirrored.
4. Verify: build; `teacher.html` overview shows the policy drawer trigger; the drawer renders academic +
   communication rows, **no Salary row, no pay token, no value slot**; smoke PASS; **MUT-TP** RED→GREEN.

### Step D — Global privacy guards G1–G14 (outcome D + E freeze)
1. `tests/smoke/run.cjs` — add the G1–G14 assertions at the re-grounded insertion points
   (`contracts/global-privacy-guards-plan.md`): additive for G1/G2/G3/G4/G6/G11/G12/G13/G14; strengthening for
   G7/G8 (broaden the `smoke:1287` real-PII regex sitewide); G5 is the Step-A supersession; G9/G10 already strong.
2. `tests/a11y/run.cjs` + `tests/screenshots/capture.cjs` — additive MATRIX rows for the 3 changed surfaces
   (AR/EN, light/dark, mobile-390 where layout changes, the open RBAC drawer + the open teacher-policy drawer);
   `app/screenshots/REVIEW.md` — a Spec-043 review entry.
3. Verify: smoke PASS; a11y critical=0 serious=0; screenshots 0 console errors; every G-mutation RED→GREEN.

## Verify loop (mandatory, per surface)

For each of the 6 localized bodies (3 surfaces × AR/EN): `npm run build` → open the built page in a browser/screenshot → confirm the
rendered surface (AR+EN, light+dark, mobile-390 where layout changes) → run smoke + a11y + screenshots → run the
paired mutation on an **isolated copy** (RED) → restore (GREEN, residue 0). No design is "done" from source
reading alone.

## Impact proof (non-destructive)

After the edits + build, diff the new `#page-body` md5s against the baseline snapshot: exactly `staff`,
`teacher`, `student-profile` × AR/EN (6) differ; every other body byte-identical; `index`/`gallery` pair
unchanged; the forbidden-file 0-diff list holds. **Never** use `stash`/`reset`/`checkout` as an impact method.

## Done conditions

- 6 bodies changed, all else byte-identical; counts 115/57/50/24-25-1/49-0-1; `FUTURE_ROUTES {}`; sole lock;
  gallery pair.
- smoke PASS; a11y 0/0; screenshots 0 console errors.
- MUT-1…MUT-11 + MUT-TP (12 mutations) each executed RED→GREEN on isolated copies, residue 0.
- No forbidden-file change; no commit/push (watcher).

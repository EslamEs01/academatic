# Add Teacher — Fold Register (Spec 036)

**Item:** `addTeacher` / إضافة معلم
**Decision:** **FOLD-ANCHOR to `teachers.html`** — the Add-Teacher form already lives there. **Count 0.** Only the misleading «قريبًا» flips to a real anchor.

## Existing drawer/form owner
- **`trn-add` form drawer** — a baked `formDrawer('trn-add', …)` (teacher-actions.js:71-73, `teacherAddDrawer()`), rendered on **teachers.html** (teachers.js:112).
- **Trigger:** the teachers page header **primary** button `addTeacherAction()` → `data-drawer="trn-add"` (teacher-actions.js:28-30; teachers.js:105 `primary: addTeacherAction()`).
- **Fields** (all INERT `field()` controls): firstName / lastName / firstNameAr / lastNameAr / email (+ph) / phone (+ph) / status (select) / subjects (select) / level (select) / courses (select) / city / country / notes (textarea) + a **CV upload GATE** (teacher-actions.js:42-43 `cvGate()` — a `data-disabled-reason` button, **never** `type=file`).
- Provenance: Spec 028 (teacher deep-management) + Spec 032 FC (trn-add form-bearing drawer).

## Host page
- **`teachers.html`** (+ `.en`). No new page.

## Nav anchor decision
- `nav.config.js`: `addTeacher` `status:'planned'` → `status:'implemented'`, `route:'teachers.html'`. The «قريبًا» `<button>` becomes a real `<a href="teachers.html">` (EN → `teachers.en.html` via the hash-aware `langRoute`). Not in `FUTURE_ROUTES`.

## How the form remains reachable
- Unchanged: the teachers page header shows the "Add teacher" primary button → opens the `trn-add` drawer. Spec 036 only points the nav item at this page; no body edit.

## Why no standalone page (add-family precedent not required)
- `add-family` is a wizard page because family creation spans 5 grounded steps (guardian + multiple children + schedule). Teacher creation is a single flat form already fully realized in the `trn-add` drawer — a standalone `add-teacher.html` would duplicate it with no added honesty. Spec 033 recommended fold-anchor; the drawer is the honest surface. (No legacy multi-step add-teacher wizard exists — confirmed in grounding.)

## Final Save gate
- `formDrawer`'s single primary final (`common.add`) is a clickable `data-disabled-reason` **backendRequired** gate — no persistence, no mutation, no fake success.

## Forbidden fields (MUST stay absent — all already absent)
- ❌ password / `type=password` (reset-password is a separate disabled-with-reason gate, `trn.reason.resetPassword`).
- ❌ salary / fixed_salary / salary_type / hour_rate / teacher_hour_rate / rate / fine / fine_per_hour / payout / payroll / payment / compensation / any currency figure — the excluded legacy pay fieldset is OMITTED (teacher-actions.js:36 "The excluded legacy fieldset … is OMITTED entirely").
- ❌ `type=file` (CV = gate).

## No-fake mutation proof
- The `trn-add` fields are INERT (no persistence listener); the Save is `aria-disabled="true"` with a reason. No teacher row is created, no directory mutates, no toast claims success. Smoke re-affirms the `trn-add` drawer + its gate are present and unchanged.

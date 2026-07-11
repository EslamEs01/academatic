# Teacher Categories — Fold Register (Spec 036)

**Item:** `teacherCategories` / فئات المعلمين
**Decision:** **FOLD-ANCHOR to `teachers.html`** — the teacher-category surface already lives there. **Count 0.** Flip the «قريبًا» to a real anchor + drop the stale `FUTURE_ROUTES` entry.

## Existing drawer/form owner
- **`trn-categories` drawer** — a baked `previewTemplate('trn-categories', …)` (teachers.js:70-84, `categoriesDrawer()`) rendered on **teachers.html** (teachers.js:110). It shows:
  - a **display-only category list** (each row: name + member-count label, from `TEACHER_CATEGORIES` in `fixtures/teacher-management.js`);
  - a **real inline Create-category form** (INERT fields: name / status select / description textarea — teachers.js:72-74);
  - a single primary **Save** final = `data-disabled-reason` `common.backendRequiredNote` gate (teachers.js:81);
  - an **assign-members** `data-disabled-reason` gate (`trn.cat.assignReason`, teachers.js:80).
- **Trigger:** the teachers page header **secondary** button "Manage categories" → `data-drawer="trn-categories"` (teachers.js:105 `secondary: button({… attrs:'data-drawer="trn-categories"'})`).
- Provenance: Spec 028 (grounded teacher categories) + Spec 032 FC-24 (real inline Create form). The source comment (teachers.js:65-69) explicitly notes "The teacherCategories nav item stays planned — no page" — Spec 036 now flips it to the fold anchor.

## Host page
- **`teachers.html`** (+ `.en`). No new page.

## Nav anchor decision
- `nav.config.js`: `teacherCategories` `status:'planned'` → `status:'implemented'`, `route:'teachers.html'`. Remove `FUTURE_ROUTES.teacherCategories: 'teachers.html'` (line 144 — now redundant since the item is implemented with that route).

## How the category form remains reachable
- Unchanged: the "Manage categories" button opens the `trn-categories` drawer (list + Create form + gates). Spec 036 only repoints the nav item; no body edit.

## Final Save gate
- The Create-category "Save" stays a `data-disabled-reason` `common.backendRequiredNote` gate; the assign-members action stays a `trn.cat.assignReason` gate. Both byte-identical.

## No-fake mutation proof
- Category rows are authored (`TEACHER_CATEGORIES`); the Create form fields are INERT; Save/assign are `aria-disabled` with reasons. No category is created, renamed, deleted, or assigned; no list mutates; no fake success. Smoke re-affirms the `trn-categories` drawer + its create form + gate are present and unchanged.

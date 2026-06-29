# Contract: Add / Edit Family Wizard

**Status**: Binding · `public/add-family.html` (+ `.en`). A **baked multi-step wizard** (5 steps: Identity → Contact & Location → Children → Plan & Billing → Review) — all steps pre-rendered static HTML; runtime adds only a tiny **stepper** over the existing tab-selection logic; "Save" = a demo toast; **NO persistence, NO form library, NO validation engine** (D4/R24). Promotes the `addFamily` nav item (NI12). Active nav: `families`.

## 1. Purpose & reuse

- Give the admin a guided, **every-field-labeled** preview of the create/edit-family journey — the honest improvement over the legacy one enormous 4-section form (~30 fields, ~48% unlabeled). It is a **demo flow only**: a calm stepper that walks the conceptual sections without saving anything.
- It MUST compose existing chrome — `pageHeader`, `chip`, `states`, `ui` (button) — plus the **NEW** `wizard.js` (the stepper) and the **NEW** labeled `form-field.js` helpers. The stepper MUST reuse the **same tab-selection logic** as the Spec 003 tabs widget (R24) — **NO new engine**, no form/validation library.

## 2. Label & navigation (NI12 promotion)

- This page **promotes** the `addFamily` nav item `planned → implemented` with route `add-family.html`: at promotion, **add `add-family.html` to `FUTURE_ROUTES`** (it has no reserved route yet, NI9), set `status:'implemented'`, add the `route`, drop the «قريبًا/Soon» affordance, and register the SSG `PAGES` entry `{ base:'add-family', activeId:'families', titleKey, crumbKey, render }`. `activeId:'families'` keeps the **`families`** nav item active (the wizard is not its own nav category) and opens the `families` category panel.
- The build-time guard (NI6) MUST pass (implemented ⇒ route present); **no dead links**. Reached via the **"+ add family"** CTA on `families.html` (language-aware `add-family.en.html`).
- Title/breadcrumb/heading MUST use one label `إضافة عائلة` (Arabic) / `Add family` (English).

## 3. Baked multi-step wizard (all steps pre-rendered — hard)

- The wizard MUST ship **all five steps as complete static HTML** in `public/` at build time (the full Identity, Contact & Location, Children, Plan & Billing, and Review markup all exist in the file). Each step is a baked `role="tabpanel"`-style panel (`data-step="<id>"`, `aria-labelledby`, `tabindex="0"`); the inactive steps carry the `hidden` attribute. Step ids are stable and build-baked — **never JS-generated**.
- `enhance.js`/`wizard.js` MUST only **toggle step visibility** (set/remove `hidden`, flip the active step's `aria-current`/selected state, move roving `tabindex`) — it MUST NOT render, build, or fetch step content. This satisfies SD1/SD2 and keeps the wizard Django-portable (`{% if step %}`). With JS off, all steps remain reachable as anchored sections (graceful degradation, edge case "Wizard with JS off").

## 4. Step indicator

- A baked **step indicator** (a `role="tablist"`-style strip, `data-tabs="add-family"`) MUST show the five steps in order with their labels and a current marker (the active step gets `aria-current`/selected + the violet accent), reusing `chip`/token styling. It MUST NOT be color-only — each step shows its number/label.
- The indicator MUST stay in sync with Next/Back (§5): advancing/retreating updates the active marker. It MAY also act as direct step controls (clicking a step selects it) using the same selection logic — never a dead control.

## 5. The stepper over the tab engine (`data-step-next` / `data-step-prev`)

- Each step's footer carries **Back** (`data-step-prev`) and **Next** (`data-step-next`) buttons; the final Review step carries **Save** (§7) instead of Next. `wizard.js` finds the currently-active step and **advances/retreats** it by reusing the SAME tab-selection routine as the Spec 003 tabs widget (select the previous/next step id, toggle `hidden`, update the indicator, move focus) — the **only** new runtime is this next/prev resolution over existing selection. NO new engine, NO multi-panel router.
- Selecting a step MUST show **exactly one** step panel (others `hidden`) and update the indicator — no navigation, no reload, no scroll jump, no JS-built DOM. The transient active-step is reflected in the URL hash `#step=<id>` (so `add-family.html#step=children` deep-links a step) and is **NOT persisted** beyond the hash (the wizard step is transient per data-model; no draft storage).
- **No validation**: Next/Back never block on field state (there is no validation engine); every step is always reachable. There is no real submit between steps.

## 6. Labeled form-field helpers (`form-field.js` — every field labeled)

- Every input MUST be a **labeled** field built by `form-field.js`: a visible `.field-label` bound to the control (`for`/`id`) over the shared `.input` (text/number), `.select-input` (select), a textarea variant, and a toggle/switch variant — reusing Spec 001 form tokens. **No unlabeled inputs** (the explicit fix for the legacy's ~48% unlabeled fields). Placeholder text is never a substitute for a label.
- Fields are **inert demo controls**: they accept input locally but are not bound to any model and never persist. Backend-bound affordances (real save, real lookup, real upload, real enrollment) are **disabled-with-reason** (`data-disabled-reason`/`data-reason-key`) or a clearly-labeled demo. Long Arabic/English labels and values wrap gracefully in AR-RTL and EN-LTR.

## 7. "Save" = demo toast · no persistence (binding)

- The Review step's **Save** (and any "submit") MUST be a `data-demo-action` → a clearly-labeled **demo toast** (e.g. "Demo only — nothing was saved") — **NO persistence, NO API, NO write of any kind** (FR-006, scope-guard). The Review step MUST summarize the entered/placeholder values as a calm read-back (display-only), not a second form.
- No step performs a real create/edit; backend-bound controls stay disabled-with-reason. Every control on the page is honest under IP8: advance/retreat a step, fill an inert field, demo-with-toast, or disabled-with-reason. No raw i18n keys; **zero external requests**.

## 8. Curated field subset per step (a tight set — NOT the legacy ~30)

A deliberately **small, labeled** subset per step (the data-model `FamilyWizardDraft.steps[].fields`), NOT a port of the legacy form:

- **1 · Identity** — guardian name · account email (placeholder) · lifecycle status (select: active/trial/…) · family category/segment (select).
- **2 · Contact & Location** — phone · whatsapp (placeholder) · country (select) · city · timezone (select) — display-only, no real tz math.
- **3 · Children** — add 1..N children, each a compact labeled mini-row (child name · level select · subject/course select); an **"add another child"** control is a `data-demo-action` (no persistence). Maps to the family↔student link conceptually.
- **4 · Plan & Billing** — cost type (select) · hourly rate (number) · plan label — a calm **fixture/disabled-with-reason** stub; real charge/credit controls disabled-with-reason (no finance engine).
- **5 · Review** — a read-back summary of steps 1–4 + the **Save** demo action (§7).

## 9. Responsive

Below the wizard breakpoint the layout MUST become **one step per screen** (the step indicator may collapse to a compact "Step N of 5" + dots), with full-width labeled fields, no horizontal overflow, and Back/Next reachable. Desktop/tablet show the indicator strip + the active step.

## 10. `data-*` hooks (exact, reuse only — no invention)

`data-tabs="add-family"` (the step indicator), `data-step="<id>"` (each baked step panel), `data-view`/hash `#step=<id>` (transient step token); the NEW **`data-step-next`** / **`data-step-prev`** (the stepper controls); `data-demo-action` (add-child, Save), `data-disabled-reason`/`data-reason-key` (backend-bound controls), `data-toast` (demo feedback). Form fields use the labeled `.field-label`/`.input`/`.select-input` markup (no per-field behavior hooks — fields are inert). "+ add family" origin and the breadcrumb are real `<a href>`. **No JS-generated ids/classes; `data-step-next`/`data-step-prev` are the only new hooks introduced by Spec 004.**

## 11. Static-HTML-first & Django mapping

- `add-family.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + step indicator + **all five** baked step panels with every labeled field + the Review read-back as real markup; **no `<div id="app">`**, no JS-built step. Relative `./assets/` paths; per-language pages (`add-family.html` ar/rtl + `add-family.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no form/validation/chart library.
- Django: `public/add-family.html` → `templates/admin/add-family.html`; the steps → static sections / `{% if step == "children" %} … {% endif %}` (default Identity); the step indicator is plain markup; `{% for child in draft.children %}` for the children mini-rows; the labeled fields → form widgets later, but **no real form/persistence** in this spec. The active step comes from the hash/context, not server state. No whole-page `#app` mount.

## 12. Enforcement & cross-references

- **Smoke** (R31): `add-family` is in `PAGES` with `activeId:'families'`; **five** baked steps present with **exactly one** visible at load; `data-step-next` advances and `data-step-prev` retreats (Next/Back move the active step, no page rebuild); **Save** fires a demo toast and nothing persists; every field has a bound `.field-label`; the promoted `addFamily` nav item is a real `<a>` with a route (and `add-family.html` is in `FUTURE_ROUTES`); no dead actions; no `id="app"`; relative assets; axe critical = 0.
- **Screenshots** (screenshot-acceptance): Add/Edit family wizard AR-RTL light desktop with a step variant (`add-family__ar__light__desktop__wizard-step3.png`) — appended to `app/screenshots/REVIEW.md`.
- Binds to `families-page-contract.md` (the "+ add family" origin), the Spec 003 `schedule-tabs-contract.md` (the reused tab-selection logic the stepper extends), `static-html-django-ready-contract.md` (SD1/SD2/SD5/SD8/SD9), and the Spec 002 `navigation-ia-contract.md` (NI12 promotion + `FUTURE_ROUTES`) + `interaction-patterns-contract.md` (IP8/IP9). The scope-guard's no-persistence / no-form-library / no-finance-engine rules remain in force.

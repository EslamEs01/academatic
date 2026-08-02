# Spec 044 — Targeted Visual Grounding

**Gate status:** PASSED before specification, planning, task generation, delegation, or application edits  
**Inspected branch:** `044-modal-drawer-long-form-interaction-system`  
**Inspected HEAD:** `7d2397b110f8d3311402d02f93719395b7d46e68`  
**Project:** Academatic / `academy-dashboard-discovery`  
**Inspection authority:** current generated product, authored source, legacy capture evidence, Specs 041/043 contracts, and the Spec-042 interaction carry-forward ledger

## Gate method

Codex opened the images listed below at original detail rather than relying on filenames. The current generated HTML was also parsed recursively through every `template.content` boundary so nested interactions and duplicate IDs could not be hidden by ordinary DOM queries. Source behavior was traced through the shared interaction components, the delegated click dispatcher, mobile sidebar, dropdown engine, build pipeline, and AR/EN locale sources.

The current product has no implemented dirty, validation-error, real-loading, recoverable-operation-error, or inline unsaved-confirmation screenshot state for the shared interaction families. That absence is recorded as a Spec-044 defect; it is not treated as visual evidence that those states work.

## Visual evidence table

| Screenshot / evidence path | Route / trigger / family | Source and generated consumers | Current visual and interaction behavior observed | Coverage | Defect or risk and derived Spec-044 requirement | Owner |
|---|---|---|---|---|---|---|
| `app/screenshots/attendance__ar__light__desktop__confirm.png` | `attendance.html`; destructive/important action; small confirmation modal | `confirm-modal.js` + `enhance.js::openConfirm`; shared confirmation consumers | Compact centered surface with clear cancel/confirm hierarchy. The implementation focuses the confirm button but has no focus trap, background isolation, scroll lock, or shared overlay coordination. | AR, RTL, light, desktop, open | Preserve compact hierarchy; add safe initial focus, dialog naming, focus containment/restoration, safe Escape/overlay policy, background isolation, and one-overlay enforcement. | 044 |
| `app/screenshots/teacher__ar__light__desktop__confirm.png` | `teacher.html`; teacher action confirmation | `teacher-actions.js`, `confirm-modal.js`; teacher consumers | Same shared confirmation presentation; confirms visual reuse and that policy/pay-free content must not be changed by host work. | AR, RTL, light, desktop, open | Migrate through the shared confirmation contract without changing Spec-043 teacher capability/privacy policy. | 044 host; 043 policy preserved |
| `app/screenshots/family__ar__light__desktop__sp027-edit-modal.png` | `family.html`; edit opener; long form drawer despite legacy “modal” label | `pages/family.js::famEditDrawer`, `formDrawer()`, `openSheet()` | Full-height contextual drawer; title/close stable, but action is inside scrolling content and there is no dirty-state guard or shared validation state. | AR, RTL, light, desktop, open/initial | Classify by actual content, not historical filename. Keep a contextual long-form drawer; use stable action region, independent scroll, dirty-state protection, and accessible validation. | 044; field completeness remains 056 |
| `app/screenshots/leads__ar__light__desktop__sp034-leads-create.png` | `leads.html`; create lead; longest current form drawer | `pages/leads.js::createDrawer`, `formDrawer()`; 19 controls | Drawer contains a long, multi-row form extending well below the viewport; no stable footer/action is visible in the capture. | AR, RTL, light, desktop, long-content | Long-form drawer must retain context with stable header/footer, reachable action, independent scroll, error summary, and no clipping. Do not invent missing business fields. | 044 host; 056 exhaustive fields |
| `app/screenshots/reports__en__light__desktop__sp029-form-drawer-en.png` | `reports.en.html`; report form; form drawer | `report-feedback.js`, `formDrawer()` | LTR drawer placement and layout are usable at desktop; action remains in content flow. | EN, LTR, light, desktop, open | Preserve locale direction while applying explicit classification, stable actions, focus, scroll, and dirty state. | 044 |
| `app/screenshots/reports__ar__light__desktop__sp032-fb-create.png` | `reports.html`; feedback create; medium bounded form | `report-feedback.js::fbCreateDrawer`, `formDrawer()`; 5 controls | Visually bounded form currently opens as a drawer; save is visible only because content is short. | AR, RTL, light, desktop, initial | Explicitly classify bounded forms from workflow/content evidence; medium forms use the shared simple-form presentation and mobile full-screen mode. | 044 |
| `app/screenshots/attendance__ar__light__desktop__sp032-fb-add.png` | `attendance.html`; nested feedback add from outcome details | `outcome-details.js::fbAddDrawer`, `formDrawer()`; nested form | Short 3-control form is shown in a drawer. Recursive evidence exposes repeated fixed field IDs in multiple nested templates. | AR, RTL, light, desktop, nested | Use one active modal-grade surface, replace/transition rather than stack, generate unique IDs, preserve outcome context, and classify the short form explicitly. | 044 |
| `app/screenshots/attendance__ar__light__desktop__drawer.png` | `attendance.html`; row-menu view; details/preview drawer | `outcome-details.js`, `previewTemplate()`, dynamic `rowMenu()` | Contextual details drawer has stable header and scrolling body. Nested form entry can replace the active panel through the current global `panel`, with focus-return race risk. | AR, RTL, light, desktop, open/long | Retain details drawer; coordinate transitions without nested overlays/traps and restore focus to the logical opener only after the interaction session ends. | 044 |
| `app/screenshots/settings__ar__light__desktop__sp040-drawer-paymob.png` | `settings.html`; Paymob provider form drawer | `pages/settings.js::providerDrawer`, `formDrawer()` | Contextual integration fields in a full-height drawer; no evidence of real async work or persistence. | AR, RTL, light, desktop, initial | Preserve truthful backend-required terminal behavior and values; never add fake loading/success; add shared dirty/validation states. | 044 |
| `app/screenshots/settings__ar__light__mobile__sp040-drawer-paymob-mobile.png` | `settings.html`; provider form on mobile | Same provider source and shared drawer | Surface occupies most of the screen but uses fixed drawer sizing rather than safe dynamic viewport/full-screen rules; footer/action is not stable. | AR, RTL, light, mobile 390, open | Applicable forms become full-screen at 390px with `dvh`, safe areas, keyboard-safe focus/action reachability, and no horizontal overflow. | 044 |
| `app/screenshots/students__ar__light__mobile__sp032-stu-add-mobile.png` | `students.html`; add student form on mobile | `pages/students.js::stuAddDrawer`, `formDrawer()`; 9 controls | Severe regression: only a narrow strip of the drawer is visible off the right edge; the surface is not usable. | AR, RTL, light, mobile 390, open | Mandatory full-screen mobile presentation; width/translation must remain inside viewport in RTL and actions/fields must remain reachable. | 044 |
| `app/screenshots/attendance__ar__light__mobile__drawer.png` | `attendance.html`; details drawer on mobile | `previewTemplate()`, `openSheet()` | Drawer presentation is constrained by desktop-oriented width/translation rules; no safe-area or dynamic-height contract. | AR, RTL, light, mobile, open | Details drawers safely fill the mobile viewport at 390px, retain scrollable content and visible close/header. | 044 |
| `app/screenshots/reports__ar__dark__desktop__sp029-feedback-drawer-dark.png` | `reports.html`; feedback details/form variant | `report-feedback.js`, shared drawer | Dark-theme colors are coherent; action/header stability and state handling remain absent. | AR, RTL, dark, desktop, open | Preserve theme contrast and parity through all validation/error/dirty/disabled states. | 044 |
| `app/screenshots/staff__en__dark__desktop__sp043-parents-en-dark.png` | `staff.en.html`; kebab → permissions → parent contacts policy | `pages/staff.js`, dynamic `staffMenu()`, `st-perm` template | Spec-043 privacy content is correct and must remain unchanged. The host is a long details drawer governed by current weak focus/scroll behavior. | EN, LTR, dark, desktop, open | Improve only the shared host interaction; protected parent-contact deny policy, routes, and assertions remain byte/behavior authoritative. | 044 host; 043 privacy |
| `app/screenshots/staff__ar__light__mobile__sp043-parents-mobile.png` | `staff.html`; permissions policy on mobile | Same staff source/consumer | Policy content remains visible, but the drawer requires full-screen/safe-area treatment and reliable focus containment. | AR, RTL, light, mobile 390, open/long | Preserve policy semantics while enforcing mobile full-screen, independent scroll, and modal-grade focus/background isolation. | 044 host; 043 privacy |
| `app/screenshots/teacher__ar__light__mobile__sp043-policy-mobile.png` | `teacher.html`; capability policy drawer | `pages/teacher.js`, policy template | Protected teacher policy is readable; long content and mobile host behavior rely on the same incomplete drawer system. | AR, RTL, light, mobile 390, open/long | Preserve pay-free capability policy; improve only the shared drawer host, focus, scroll, safe-area, and close behavior. | 044 host; 043 policy |
| `app/screenshots/add-family__ar__light__desktop__wizard-step3.png` | `add-family.html`; dedicated-page five-step family workflow | `wizard.js`, `pages/add-family.js` | Very large workflow already uses a dedicated page inside the established route/sidebar architecture; step navigation is visible and no overlay is required. | AR, RTL, light, desktop, wizard step | Retain the dedicated-page classification; add shared validation/dirty navigation protection and state preservation without adding a route or sidebar domain. | 044 interaction; 056 fields |
| `app/screenshots/dashboard__ar__light__mobile__drawer.png` | any mobile route; topbar menu → mobile sidebar | `drawer.js`, `enhance.js::openDrawer/openPanel`, shared sidebar | Cloned sidebar is clipped and lacks a clearly visible close control in the captured state; current engine traps focus but does not isolate background or lock/restore scroll. | AR, RTL, light, mobile, open | Keep frozen IA/routes; add modal-grade containment, background isolation, Escape/close, exact focus restoration, body lock, safe viewport sizing, and visible close. | 044 host; 041 IA frozen |
| `app/screenshots/teacher-portal__ar__light__mobile__drawer-open.png` | teacher portal mobile sidebar | Same mobile sidebar system | Confirms the sidebar defect is shared across portal contexts rather than one page. | AR, RTL, light, mobile, open | Fix once in the shared system and prove generated consumer parity. | 044 host; 041 routes frozen |
| `app/screenshots/students__ar__light__desktop__sp027-row-kebab.png` | `students.html`; row kebab; dropdown | `dropdown.js`, `studentMenu()` | Non-modal popover anchored to opener; it must remain usable inside/near modal-grade surfaces. | AR, RTL, light, desktop, open | Keep dropdown non-modal: no `aria-modal`, no focus trap; add complete keyboard navigation, outside/Escape close, and logical focus restoration. | 044 |
| `output/roles/admin/screenshots/management-families-create-full.png` and `management-families-create-001-page-interaction-001.png` | legacy family create; very large multi-section workflow | Legacy evidence; current equivalent `add-family` dedicated wizard | Large form requires substantial navigation and review; unsuitable for a modal/drawer. | legacy desktop, long form | Confirms dedicated-page boundary for very large multi-section workflows. No new page is justified because the current equivalent already exists. | 044 classification; 056 completeness |
| `output/roles/admin/screenshots/management-admins-create-full.png` | legacy admin create modal | Legacy evidence; current `staff-add` form | Bounded admin creation surface, materially smaller than family workflow. | legacy desktop, form | Supports medium/simple-form classification when the workflow fits without long scrolling; privacy and password decisions remain governed by later/backend owners. | 044 host; 056 fields/backend |
| `output/roles/admin/screenshots/management-forms-create-full.png` | legacy reusable-form creation | Legacy evidence; current `form-create` | Repeatable field construction makes the workflow longer and stateful even when the initial legacy view appears bounded. | legacy desktop, form builder | Keep as long-form interaction; preserve repeatable values and surface hidden-step/section errors without nested dialogs. | 044 host; 056 field audit |
| `output/roles/admin/screenshots/management-teacher-categories-1-create-members-full.png` | legacy category membership form | Legacy evidence; current category/member form surfaces | Contextual membership assignment is bounded but selection-heavy. | legacy desktop, form | Classify by scrolling/context and preserve selections across validation/backend-required state. | 044 |
| `output/roles/family/screenshots/student-profile-edit-full.png` | legacy student profile edit page | Legacy evidence; current profile/edit interactions | Profile edit is page-scale and privacy-sensitive; not evidence for a nested modal. | legacy desktop, long form | Do not force page-scale/private profile data into an overlay or persist drafts unsafely; Spec-043 child-view boundaries remain authoritative. | 044 host; 043 privacy |

## Source and contract evidence inspected

| Evidence | Observed behavior / constraint | Remaining-task mapping |
|---|---|---|
| `app/src/js/enhance.js` | Separate implementations for panel, confirmation, and generic modal; one global drawer `panel` but independent confirm/modal overlays; weak focus logic; no dirty state, inert background, shared body lock, validation, or viewport manager; missing templates fall back to a toast. | Create one shared modal-grade controller; fail loudly on missing targets; coordinate transitions; focus/inert/scroll/dirty/validation/mobile contracts. |
| `app/src/js/components/preview-drawer.js` | `previewTemplate()` and `formDrawer()` share drawer markup; form actions live in the scrolling body; default reason key is `common.backendRequiredNote`. | Add explicit interaction classification metadata, stable action region, accessible form state, and exact reason-key inventory. |
| `app/src/js/components/confirm-modal.js` | Emits confirmation trigger data only; it does not directly consume `common.backendRequiredNote`. | Audit under small-confirmation contract; exclude from the copy-consumer sweep unless a concrete caller supplies that key. |
| `app/src/js/components/wizard.js` | Dedicated-page stepper with backend-required final action. | Preserve route model; add dirty/validation protection and truthful terminal state. |
| `app/src/js/components/evaluation-rubric.js` | Confirmation consumer explicitly supplies `common.backendRequiredNote`. | Include in exact copy mapping and ensure a confirmation never claims persistence. |
| `app/src/js/components/report-feedback.js` | Details, bounded form, long form, and confirmation consumers share the current drawer/confirm primitives. | Representative migration and visual/test matrix owner. |
| `app/src/js/components/outcome-details.js` | Generates nested `fb-add` form templates repeatedly with fixed field IDs. | Remove 30 duplicate localized field-ID collisions and prove nested interaction replacement without stacked overlays. |
| `app/src/js/components/dropdown.js` | One popover at a time; outside/Escape handling; partial focus restoration; no full Arrow/Home/End menu navigation. | Preserve non-modal semantics and complete keyboard/focus contract. |
| `app/src/js/components/drawer.js` and sidebar sources | Separate sidebar implementation exists; `enhance.js` currently clones the static sidebar and strips IDs/ARIA references. | Consolidate modal-grade host behavior without changing IA or frozen routes. |
| `app/src/styles/app.css` | Drawer uses `min(..., 92vw)` and directional transforms; modal and drawer use separate z-index/scrim rules; no `dvh`, safe-area, shared body-lock compensation, full-screen 390px rule, or stable action footer. | Add logical, theme-safe, reduced-motion-aware shared interaction CSS. |
| `app/src/locales/ar.extra.js`, `en.extra.js` | AR: “هذا الإجراء يحتاج اتصال الخادم لإتمامه — لا يُحفَظ شيء الآن.” EN: “This action needs the server connection to complete — nothing is saved yet.” Both state server requirement and no save. | Preserve truthfulness; map exact consumers and introduce specialized reason keys only where evidence proves the global message inaccurate. |
| `app/scripts/build-html.mjs`, `build-assets.mjs` | 57 bilingual page sources build 114 localized pages plus redirect index = 115; authored source owns generated HTML/assets. | Never hand-edit generated HTML; record source/generated parity and exact count impact. |
| `app/tests/smoke/run.cjs`, `a11y/run.cjs`, `screenshots/capture.cjs` | Existing broad gates and protected Spec-043 scenarios exist; required-drawer paths were hardened, but Spec-044 state/focus/scroll/dirty/nesting coverage is absent and optional catches exist elsewhere. | Add fail-loud Spec-044 guards without weakening protected tests; require targeted mutations. |
| Specs 041 and 043 plus referenced contracts/ledgers | Spec 041 freezes navigation/route ownership. Spec 043 freezes privacy/RBAC content and protected G1–G14 behavior. | Host-only migrations; no route/sidebar redesign and no privacy-policy changes. |
| `specs/042-full-interaction-state-audit/modal-drawer-interaction-ledger.md` and carry-forward registers | FO-23 assigns the global interaction system and 30 duplicate `fb-add` IDs to 044; FO-24 assigns form completeness to 056; FO-26 assigns final freeze to 057. | Binding ownership matrix and no cross-Spec scope theft. |

## Deterministic current-tree inventory observed at the gate

Counting unit: a generated-page interaction consumer inside one locale. The recursive traversal includes nested `template.content`; AR and EN structures match exactly. `index.html` is counted only as the AR-side redirect page and contains no interaction consumer.

| Item | AR | EN | Total localized instances | Notes |
|---|---:|---:|---:|---|
| Generated HTML pages | 58 | 57 | 115 | 57 product routes × AR/EN + redirect index |
| Drawer targets, including nested targets | 234 | 234 | 468 | 220 top-level + 14 nested feedback targets per locale |
| Actual form surfaces | 72 | 72 | 144 | 58 top-level forms + 14 nested feedback forms; outer detail drawers containing nested templates remain details |
| Details/preview drawers | 162 | 162 | 324 | No direct editable controls outside nested templates |
| Static `data-drawer` openers | 229 | 229 | 458 | Dynamic row-menu mappings are additionally resolved by the shared menu functions |
| Confirmation consumers | 160 | 160 | 320 | 97 destructive per locale |
| Generic backend-note modal triggers | 13 | 13 | 26 | Current separate `openModal()` path |
| Dropdown/menu openers | 405 | 405 | 810 | 75 row menus + 330 global menu-action openers per locale |
| Mobile-sidebar openers | 32 | 32 | 64 | Shared cloned-sidebar path |
| Dedicated-page wizards | 1 | 1 | 2 | One logical `add-family` page, localized twice |
| `common.backendRequiredNote` consumers | 47 | 47 | 94 | 46 disabled-reason controls plus one wizard modal trigger per locale; 40 generated pages contain the key: 20 AR + 20 EN |
| Duplicate nested field-ID records | 15 | 15 | 30 | Five logical pages per locale; three duplicated ID names each |

Direct authored files containing the `common.backendRequiredNote` consumer key are exactly seven: `evaluation-rubric.js`, `preview-drawer.js`, `report-feedback.js`, `teacher-actions.js`, `wizard.js`, `pages/library.js`, and `pages/teachers.js`. The two locale files define rather than consume the key. The final deterministic inventory must additionally expand implicit `formDrawer()` default consumers so source-to-generated reach is explicit.

## Evidence-derived classification boundary

Field count is evidence, not the classifier. The current forms cluster into bounded single-purpose forms (usually one to four controls), contextual/selection-heavy forms (often five to eight controls), long or repeatable forms (nine to nineteen controls), and one existing multi-section dedicated-page wizard. Classification is based on all of: whether completion requires long scrolling; whether underlying context must remain visible; section/review/navigation needs; repeatable controls; validation/error-summary needs; and whether the task can be understood in one compact view.

- A bounded single-purpose form that fits without long scrolling is a medium simple-form modal on desktop and full-screen at 390px.
- A contextual, selection-heavy, long, repeatable, or vertically read form/details interaction is a drawer with stable header/content/action regions and full-screen mobile behavior.
- A multi-section workflow requiring navigation/review/persistent context is a dedicated page. The live inventory proves one such workflow and it already exists (`add-family`); no new page is justified by current evidence.
- Destructive/important one-decision actions remain compact confirmation modals.
- Dropdowns remain non-modal popovers; the mobile sidebar receives modal-grade behavior without IA redesign.

## Gate conclusions and task mapping

1. Build a fail-loud, source/generated interaction inventory that reproduces the counts above and resolves dynamic menu mappings.
2. Introduce one shared modal-grade controller for modal, drawer, confirmation, mobile-sidebar, and in-surface unsaved confirmation states.
3. Add explicit source-owned classification metadata and migrate every current consumer without changing Spec-043 privacy content or Spec-041 routes.
4. Fix 390px RTL positioning, dynamic viewport/safe-area behavior, sticky header/footer/action layout, body scroll lock/restoration, background isolation, and exact focus restoration.
5. Add truthful dirty-state, validation, real-loading/error, and backend-required states with in-memory preservation and no nested modal.
6. Fix the 30 duplicate localized field-ID records at their source.
7. Complete non-modal dropdown keyboard behavior and modal-grade mobile-sidebar behavior.
8. Expand fail-loud smoke/a11y/screenshot coverage and mutation proofs; preserve every protected Spec-043 assertion.
9. Keep FO-24 with Spec 056 and FO-26 with Spec 057; do not use those exclusions to defer a shared interaction-system defect.

With this record complete, the Targeted Visual Grounding Gate is passed. SpecKit specification work may begin from this evidence; implementation remains prohibited until specification, plan, tasks, and coverage audit are independently approved.

## Post-implementation visual acceptance

Codex reopened all 13 `sp044-*` acceptance frames at original detail after the final canonical build:
AR/EN confirmation, dirty, validation, backend-required, AR/EN 390px simple form and keyboard-height
form, desktop/mobile long form, details drawer, dedicated wizard dirty state, mobile sidebar, and
non-modal dropdown. All headers, close controls, content regions, focused fields, validation/error
copy, and primary footers remain visible and no nested overlay appears.

The first Arabic `students` 390px review exposed a real root-canvas widening defect caused by the
inert RTL table behind `stu-add`. A scoped `contain: layout; overflow: hidden` lock on `#shell`
reduced the root canvas to exactly 390px without paint-layer blanking. The corrected frame
`app/screenshots/students__ar__light__mobile__sp044-simple-mobile.png` was reopened at original
detail and accepted; the permanent M44-10 assertion now fails if the locked root widens again.

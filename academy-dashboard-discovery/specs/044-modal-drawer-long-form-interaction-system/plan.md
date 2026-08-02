# Implementation Plan: Modal, Drawer & Long-Form Interaction System

**Branch**: `044-modal-drawer-long-form-interaction-system` | **Date**: 2026-08-02 | **Spec**: [spec.md](spec.md)  
**Input**: Academatic Spec 044, its passed Targeted Visual Grounding evidence, and the live 115-page tree at `7d2397b110f8d3311402d02f93719395b7d46e68`

## Summary

Replace the product’s three competing modal-grade runtime paths with one explicit interaction controller; classify and migrate every existing consumer; make form presentations explicit at their source; provide safe focus, background isolation, scroll restoration, mobile full-screen behavior, in-surface dirty/discard state, accessible validation, and truthful backend-required state; preserve the existing dedicated-page wizard; complete non-modal dropdown keyboard behavior; and prove all behavior through fail-loud inventory, interaction, visual, accessibility, protected, and isolated-mutation gates.

No framework, runtime dependency, backend, route domain, persistence layer, or product module is added. Authored source remains authoritative and the build regenerates public output.

## Technical Context

**Language/Version**: HTML5, CSS, native ECMAScript modules on Node.js ≥18 for build/test tooling  
**Primary Dependencies**: existing Playwright 1.61 and axe Playwright adapter for verification; existing Tailwind/PostCSS asset pipeline; no new dependency  
**Storage**: no application persistence; dirty drafts remain in memory for the active interaction session; existing non-sensitive theme/navigation preferences remain untouched  
**Testing**: existing Node/Playwright smoke, accessibility, screenshot, selector, localization, generated-parity, protected-test, and isolated-copy mutation mechanisms  
**Target Platform**: static GitHub-Pages-compatible browser application; AR/RTL and EN/LTR; light/dark; desktop/tablet/mobile including exactly 390px  
**Project Type**: static multi-page web application with authored source and generated HTML/assets  
**Performance Goals**: deterministic single-frame state ownership; no duplicate listeners/overlays/locks; smooth existing-duration transitions and immediate reduced-motion behavior  
**Constraints**: one modal-grade surface; no fake async/success/persistence; safe focus/inert/scroll; zero critical/serious a11y; zero screenshot console errors; protected Spec-043 behavior unchanged  
**Scale/Scope**: 115 HTML pages; per locale 234 drawer targets (72 form, 162 detail), 160 confirmation consumers, 13 generic modal triggers, 405 menu openers, 32 mobile-sidebar openers, and one dedicated-page wizard

## Constitution Check

The repository constitution template is unratified, so the binding gates are `AGENTS.md`, `CLAUDE.md`, the project instructions, Specs 041/043, and their contracts.

| Gate | Pre-design result | Post-design result |
|---|---|---|
| Targeted Visual Grounding precedes visual/form work | PASS — exact current/legacy images opened and recorded | PASS — design derives from recorded defects and existing patterns |
| Preserve authored/current improvements and source/generated ownership | PASS | PASS — source-first migrations followed by build only |
| No fake backend, persistence, loading, authorization, or completion | PASS | PASS — only real work may be busy; backend-required remains explicit |
| Privacy/anti-poaching and protected tests remain authoritative | PASS | PASS — Spec-043 content is read-only; host and additive guards only |
| Frozen route/sidebar IA is preserved | PASS | PASS — existing `add-family` page retained; no new page or nav domain |
| One reusable system; no framework/dependency | PASS | PASS — shared native module and existing CSS/test stack |
| Accessibility and console checks are hard gates | PASS | PASS — focused guards plus full gates and visual review |
| Protected test changes require declared ownership and mutations | PASS | PASS — additive Spec-044 guard block; no weakening/supersession planned |
| FO-24 stays 056; FO-26 stays 057 | PASS | PASS — ownership matrix explicit |
| Git policy | PASS | PASS — branch creation only; no commit or remote/history mutation |

No gate violation requires a complexity exception.

## Architecture and State Ownership

### Shared controller

A single source-owned interaction controller becomes the only runtime owner of modal-grade lifecycle state. It receives an explicit surface descriptor (`confirmation`, `form-modal`, `drawer`, `sidebar`) and owns:

- target resolution and fail-loud errors;
- one active surface and optional same-surface transition history;
- one overlay, focus boundary, Escape handler, background-isolation set, and body lock;
- opening/closing transition cancellation and exact teardown;
- initial focus and exact opener restoration;
- safe dismissal policy and in-surface discard confirmation;
- validation and terminal backend-required presentation;
- active-session draft snapshots without persistent sensitive storage.

The existing delegated dispatcher remains the single click entry point but delegates modal-grade behavior to this controller. `openSheet`, `openConfirm`, `openModal`, and cloned-sidebar behavior become thin descriptors or are removed after parity is proven. Dropdowns remain a separate non-modal subsystem.

### Source-owned classification

Every baked target receives explicit family metadata from its source component. Form-producing helpers require a declared `modal` or `drawer` presentation; omission is a build/inventory error. Preview/detail helpers always emit drawer classification unless a caller explicitly supplies another evidence-approved family. Confirmation triggers remain confirmation consumers. The current `add-family` wizard remains a dedicated page.

The classification boundary is qualitative: compact single-purpose completion without long scroll → form modal; contextual, selection-heavy, repeatable, vertical, or long workflow → drawer; multi-section navigation/review → page. Control counts are audit evidence, never a runtime classifier.

### Form state

The controller snapshots normalized editable values when a form surface/session begins and recalculates dirty state on meaningful input/change. Native constraints and existing authored rules drive validity; Spec 044 adds presentation and association but does not invent missing business fields or requiredness. Invalid values remain. A form terminal action validates first, then renders a localized in-surface backend-required state and keeps values.

The current product has no modal-grade real asynchronous consumer. Loading and recoverable-operation-error APIs/states are defined and tested only with real work if one is discovered by the final inventory; no delay or fake request will be created for screenshots.

### Mobile and layout

Shared CSS supplies logical placement, stable surface grid regions, body lock compensation, dynamic viewport fallback, safe-area padding, full-screen presentation at the existing mobile breakpoint/390px, visible focus, theme parity, and reduced motion. The mobile sidebar uses the same host lifecycle without changing cloned navigation content or routes.

### Nested feedback transition and IDs

Nested `fb-add` targets transition within the one active interaction session rather than stacking. Field identities include the owning outcome identity so all 30 current localized duplicate-ID records disappear. Transition state preserves the parent context and returns to the logical prior control when canceled/backed out.

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/044-modal-drawer-long-form-interaction-system/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── targeted-visual-grounding.md
├── interaction-inventory.md
├── classification-matrix.md
├── ownership-matrix.md
├── baseline.md
├── implementation-status.md
├── checklists/requirements.md
├── contracts/
│   ├── interaction-system-contract.md
│   ├── inventory-contract.md
│   ├── state-validation-contract.md
│   └── verification-mutation-contract.md
└── tasks.md
```

### Source Code

```text
academy-dashboard-discovery/app/
├── src/
│   ├── js/
│   │   ├── enhance.js
│   │   ├── components/
│   │   │   ├── interaction-system.js       # new shared modal-grade owner
│   │   │   ├── preview-drawer.js
│   │   │   ├── confirm-modal.js
│   │   │   ├── dropdown.js
│   │   │   ├── drawer.js
│   │   │   ├── wizard.js
│   │   │   └── current interaction producers
│   │   └── pages/                           # source-owned consumer classifications
│   ├── locales/ar.extra.js
│   ├── locales/en.extra.js
│   └── styles/app.css
├── scripts/
│   ├── build-assets.mjs
│   └── build-html.mjs
├── tests/
│   ├── interaction/                         # deterministic inventory/contract guard, existing runner style
│   ├── smoke/run.cjs
│   ├── a11y/run.cjs
│   └── screenshots/capture.cjs
└── public/                                  # generated only
```

**Structure Decision**: Extend the existing static application. Add one shared component module and one deterministic guard area under the existing test tree; do not introduce another framework or test runner.

## Delivery Phases and Dependency Order

1. Freeze accepted baseline and implement fail-loud recursive inventory/count guard without changing application behavior.
2. Add failing focused interaction contracts and register additive protected/mutation blocks.
3. Implement the shared lifecycle controller and layout foundation; migrate confirmation, generic modal, drawer, and mobile-sidebar hosts.
4. Add explicit target classification and migrate all form/detail consumers, serialized by file ownership.
5. Implement dirty/close guard, validation/backend-required state, nested feedback transition, and unique IDs.
6. Complete dropdown keyboard behavior, dedicated-page dirty/validation integration, locales, and responsive/theme parity.
7. Build generated output and run focused interaction, protected privacy, smoke, accessibility, screenshot, and count gates.
8. Execute every isolated mutation one at a time, remove copies, prove residue zero, and rerun final GREEN.
9. Produce exact impact/ownership/implementation ledgers and conduct independent Codex review; route corrections and rerun invalidated gates.

## Executor Boundaries

- **Claude Opus**: shared controller architecture, focus/inert/scroll lifecycle, dirty/discard state, nested transitions, accessible validation state, protected test/mutation design, high-risk debugging.
- **Kimi K3**: approximately 60–75% of bounded executable effort through deterministic inventory/count tooling, explicit consumer classification and repetitive migrations, AR/EN and RTL/LTR mechanics, CSS responsive/theme work within approved architecture, screenshot/a11y scenarios, mechanical execution of Claude-designed low-risk mutations, and evidence/count ledgers.
- **Claude Sonnet**: bounded accessibility/test/localization corrections after architectural work.
- **Codex**: artifact authority, assignment ledger, diff review, focused acceptance, independent final review, and only tiny ledger corrections.

One writer owns each file at a time. Shared controller and `enhance.js` stay with Claude until accepted; classification producers are partitioned to Kimi only after helper contracts freeze; test files serialize under the assigned executor.

## Verification Strategy

- Focused deterministic interaction guard for recursive inventory, explicit metadata, duplicates, source/generated parity, and backend-note reach.
- Browser interaction scenarios for open/close, safe/dirty dismissal, initial focus, Tab boundaries, background isolation, exact restoration, one-overlay, body scroll position/compensation, full-screen 390px, stable header/footer/action, value preservation, validation semantics, backend-required state, dropdown non-modality, sidebar modality, and wizard departure.
- Existing protected Spec-043 suite unchanged and green.
- Full build, 115-page/body census unless justified otherwise, smoke, axe, screenshot/console, AR/EN/RTL/LTR/theme/desktop/390 matrix, and manual original-detail visual review.
- One fresh isolated copy for each registered mutation; one mutation only; exact intended RED; deletion; primary GREEN; residue zero.

## Complexity Tracking

No constitution or project-rule violation. A new shared module is the smallest structure that removes three competing modal-grade implementations without expanding the technology stack.

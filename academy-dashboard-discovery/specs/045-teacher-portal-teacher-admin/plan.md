# Implementation Plan: Teacher Portal + Teacher Admin

**Branch**: `045-teacher-portal-teacher-admin` | **Date**: 2026-08-02 | **Spec**: [spec.md](spec.md)  
**Input**: Evidence-grounded requirements FR-001–FR-068 and SC-001–SC-013.

## Summary

Complete the visual and usability design of the eight Teacher portal pages and three Teacher administration pages without changing their frozen route identities, privacy model, shared interaction architecture, or static frontend honesty. The plan establishes a bounded Teacher-domain visual composition, repairs the portal’s false navigation states, restores evidenced student/library/directory discovery depth, improves dense admin/mobile layouts, preserves the accepted categorical performance model, and proves exact AR/EN, RTL/LTR, light/dark, desktop/390px, accessibility, mutation, and page-impact results.

## Technical Context

**Language/Version**: HTML5, CSS, ECMAScript modules on Node.js 22 for the static generator and modern browsers at runtime  
**Primary Dependencies**: existing in-repository design system and components; Playwright and axe-core already present in the project; no new runtime dependency  
**Storage**: authored in-memory fixtures and generated static files; no database, API, or new browser persistence  
**Testing**: existing build, smoke, accessibility, screenshot, interaction, privacy, locale, protected-test, mutation, and impact drivers  
**Target Platform**: static responsive web product; Arabic/RTL and English/LTR; light/dark; desktop/tablet/mobile including exact 390px  
**Project Type**: statically generated multi-page frontend  
**Performance Goals**: deterministic build and immediate client-side filter/navigation feedback with no artificial delay; no visible layout jump or interaction regression  
**Constraints**: 115 current HTML files, 114 page bodies, 57 localized route pairs; frozen Spec-041 navigation; Spec-043 privacy/pay-free; Spec-044 shared interactions; frontend-only honesty; source owns generated output; no unrelated page redesign  
**Scale/Scope**: 11 authored page modules, 22 localized page consumers, eight portal pages and three admin pages; no justified new page or route

## Constitution Check

The repository constitution remains an unratified placeholder, so it creates no additional enforceable gate. The applicable ratified project rules are `AGENTS.md`, `CLAUDE.md`, and Specs 041/043/044.

| Gate | Pre-design result | Post-design result |
|---|---|---|
| Targeted Visual Grounding before design | PASS — EG-045-01–11 and C01–C09 | PASS — all planned batches cite packets |
| Evidence over inference / contradictions recorded | PASS — D045-01–06 | PASS — research and ownership ledgers preserve rulings |
| Preserve route/sidebar freeze | PASS — no new route | PASS — current 11/22 consumers retained |
| Preserve privacy/pay-free/role isolation | PASS | PASS — explicit role-visibility and negative guards |
| Preserve Spec-044 shared interactions | PASS | PASS — composition only; regression fixes must remain shared and bounded |
| No fake backend/persistence/success | PASS | PASS — terminal-action classification required |
| Source/generated ownership | PASS | PASS — authored modules/locales/styles then canonical build |
| No new framework/runtime dependency | PASS | PASS |
| Executor availability before application work | Pending by design | Required hard gate after task coverage audit |
| Kimi largest accepted weighted share | Pending by design | Enforced by assignment ledger if Kimi probe passes |
| Protected tests/mutations/a11y/console are gates | PASS | PASS — dedicated contracts and tasks |

No complexity exception is required.

## Architecture and design decisions

### A. Bounded Teacher visual composition

- Portal pages continue using the role portal shell and `pt-*` primitives.
- Administrator pages continue using the admin shell and established card/filter/tab/drawer primitives.
- Additive Teacher-domain classes may establish shared section rhythm, priority bands, compact metadata/action patterns, and mobile transformations.
- Existing globally shared tokens remain authoritative. A global selector change requires an impact list and non-Teacher regression proof.
- Page modules keep semantic markup baked by the generator; no whole-page runtime mount or duplicated page-specific design system is allowed.

### B. Page-family work

1. **Portal home/navigation**: make eight implemented Teacher destinations truthful; remove admin-performance implication; retain the accepted content hierarchy.
2. **Portal daily work**: schedule/outcomes/tasks/reports use one calm workflow/state language and preserve display-only semantics.
3. **Portal people/resources/account**: add safe roster depth, deterministic library discovery, and preserve distinct self-profile boundaries.
4. **Admin directory**: retain direct D1 Add/Categories surfaces; add evidence-backed scope/sort/pagination; remove computed utilization presentation.
5. **Admin detail**: retain eight tabs and deep links; improve action priority and 390px layout; preserve shared policy/action interactions.
6. **Admin performance**: retain categorical counts/signals/trends and admin-only identity; improve repeated-record density and 390px hierarchy without scores/charts.

### C. Behavior

- Reuse existing link, tab, filter, dropdown, form, preview, confirmation, and interaction-system contracts.
- Add client-side discovery behavior only where the reference proves it and existing architecture supports it.
- Required controls and targets are hard assertions; no silent fallback or optional required selector.
- All terminal actions receive a recorded classification and truthful localized copy.

### D. Source and generated ownership

`app/src/js/pages/*.js`, relevant shared Teacher components/fixtures/locales, and `app/src/styles/app.css` are authored owners. `app/public/*.html` and copied assets are generated by the canonical build. Executors own authored files only unless a verification task explicitly runs the build; generated consumers travel with the owning batch and may not be independently hand-edited.

## Project Structure

### Documentation

```text
specs/045-teacher-portal-teacher-admin/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── visual-grounding.md
├── teacher-domain-inventory.md
├── route-page-matrix.md
├── source-generated-matrix.md
├── role-visibility-matrix.md
├── responsive-matrix.md
├── page-state-matrix.md
├── interaction-inventory.md
├── assignment-ledger.md
├── executor-review-ledger.md
├── ownership-matrix.md
├── requirement-coverage-matrix.md
├── baseline-ledger.md
├── screenshot-review-ledger.md
├── mutation-ledger.md
├── impact-ledger.md
├── verification-evidence.md
├── implementation-status.md
├── contracts/
│   ├── visual-system-contract.md
│   ├── role-privacy-truthfulness-contract.md
│   ├── responsive-accessibility-contract.md
│   ├── interaction-integration-contract.md
│   ├── source-generated-impact-contract.md
│   └── verification-mutation-contract.md
├── checklists/requirements.md
└── tasks.md
```

### Application and tests

```text
app/
├── src/
│   ├── js/
│   │   ├── pages/                 # eleven Teacher page owners
│   │   ├── components/            # existing shared portal/admin/interaction primitives
│   │   └── fixtures/              # authored static display records and route registries
│   ├── locales/                    # mirrored AR/EN keys
│   └── styles/app.css              # established tokens plus bounded domain composition
├── scripts/build-html.mjs          # canonical AR/EN generator
├── public/                         # generated product; never hand-edited
└── tests/
    ├── smoke/run.cjs
    ├── a11y/run.cjs
    ├── screenshots/capture.cjs
    └── interaction/                # inventory, lifecycle, layout, impact, mutations
```

**Structure Decision**: Preserve the existing single static frontend. Extend existing authored page/components/styles/locales and existing test drivers only. No backend project, package, runtime dependency, new route system, or new test framework.

## Implementation phases and dependency order

1. Freeze and validate baseline counts/hashes/inventories.
2. Complete requirement/acceptance/task coverage and executor capability probes.
3. Establish the shared Teacher visual composition and protected guard skeleton.
4. Implement portal home/navigation, then the seven portal internals in non-overlapping batches.
5. Implement admin directory, detail, and performance batches after the shared pattern is accepted.
6. Build after each material source batch; review source/generated scope and focused tests.
7. Claude reviews every material Kimi batch; Sol reviews actual diffs and focused evidence.
8. Run full deterministic gates, full screenshot matrix, manual original-detail review, isolated mutations, impact accounting, documentation review, and independent Sol acceptance.
9. Route every discovered defect back to its owning executor, rerun invalidated gates, and repeat review until clean.

## Executor strategy

Weighted implementation units are defined before probes, not by lines or generated files:

- Kimi target 65 units: portal navigation/home (10), portal page families (28), directory discovery and parity (12), mechanical visual propagation (7), guards/captures/evidence (8).
- Claude target 25 units: shared premium visual pattern (8), complex admin detail/performance/responsive work (10), focused protected tests/mutation design (3), reviews of Kimi batches (4).
- Sol target 10 units: integration seams and small final corrections only; leadership/review is excluded from implementation share.

These are provisional assignment weights. Application work begins only if the safe Kimi probe proves grounded file delivery. Exact file ownership and read-only evidence dependencies are recorded in `assignment-ledger.md`; two writers never own the same authored or generated file concurrently.

## Verification strategy

- **Focused per batch**: source syntax, build, exact localized consumer diff, scoped smoke/interaction/locale checks, 390px screenshot(s), console result, and reviewer inspection.
- **Full primary-tree gates**: canonical build; inventory; layout; interaction; smoke; Spec-043 privacy; accessibility; screenshots; AR/EN/source-generated parity; pay/rank/absence/role/action guards; exact page/body impact; protected tests; `git diff --check`.
- **Manual visual**: every one of the 22 localized pages in AR/EN light desktop/390px plus dark coverage for every page/layout variant; all accepted frames opened by Sol at original detail.
- **Mutation**: one mutation in each fresh isolated copy; exact intended RED; deletion; primary GREEN; residue zero.
- **Documentation**: every count and completion claim verified against live bytes after the final application/test change.

## Plan review

The plan covers all 11 scopes, all 68 FRs, all 10 user journeys, all role/privacy/pay/interaction boundaries, required executor ownership, and every final gate. No page/route addition is justified. No requirement remains without a planned owner or verification family; the detailed mapping is in `requirement-coverage-matrix.md`.

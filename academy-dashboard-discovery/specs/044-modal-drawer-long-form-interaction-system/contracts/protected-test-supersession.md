# Contract — Spec 044 protected-test supersession

Spec 044 changes three assertions inside the protected Spec-032 form-completion block in
`app/tests/smoke/run.cjs`. These are narrow strengthening supersessions: the business-field,
MUST-OMIT, honest-backend-final, and no-fake-save guarantees remain enforced. The Spec-043
privacy/RBAC assertions and the R2/R3 hard-exit guards are unchanged.

## S44-01 — active truthful backend-required final

- **Old code:** form templates, form-bearing picker templates, and opened surfaces passed when they contained
  `[data-disabled-reason]` or `[data-confirm]`; the primary count only inspected
  `.btn-primary[data-disabled-reason]`.
- **New code:** a form template and its opened surface must contain exactly one enabled
  `button.btn-primary[data-interaction-submit][data-reason-key]`, and that control must not be
  disabled or `aria-disabled`. The picker-presence assertion accepts that strengthened terminal
  action in addition to the unchanged inert final used by genuinely read-only pickers.
- **Evidence:** Spec 044 FR-044–FR-048 and the live `formDrawer()` contract require a real
  client validation action that transitions to an accessible backend-required state while
  preserving input. An inert control cannot exercise validation, focus, or preservation.
- **Reason:** retaining the old inert selector would reject the required interaction or tempt
  production code to carry a false disabled-state compatibility attribute.
- **Neighbours:** read-only picker finals, navigation locks, policy locks, and every non-form
  `[data-disabled-reason]` assertion remain enforced. Field-count, MUST-OMIT, canvas,
  fake-success, and primary-cardinality assertions in the same block remain active.
- **Mutation proof:** M44-12 invalid backend-required copy and M44-14 swallowed or
   missing required selector must produce the intended RED; final smoke and interaction suites
   must return GREEN.

## S44-02 — classified shared surface instead of drawer-only surface

- **Old code:** the first visible form opener had to produce `.drawer.sheet`.
- **New code:** the opener must produce the exact active
  `.interaction-surface[role="dialog"][aria-modal="true"]` whose
  `data-interaction-target` matches the opened template; controls and the single active
  backend-required final must be present.
- **Evidence:** the accepted classification matrix assigns bounded forms to the medium-modal
  family and long forms to drawers. Requiring every form to be a drawer contradicts the
  objective Spec-044 classification.
- **Reason:** the replacement checks the stronger invariant—correct trigger-to-target mapping
  plus modal semantics—without prescribing the wrong visual family.
- **Neighbours:** every original source-template lookup, control-count assertion, picker audit,
  and page mapping remains unchanged.
- **Mutation proof:** M44-01 missing opener, M44-02 broken target mapping, and M44-03 removed
  dialog semantics must each produce the intended RED; final smoke and interaction suites must
  return GREEN.

## S44-03 — unique nested feedback target IDs

- **Old code:** nested outcome templates were discovered only through the duplicated literal
  target `template[data-preview="fb-add"]`.
- **New code:** every nested feedback form must use an outcome-scoped `fb-add-<outcome-id>`
  target, be structurally audited, and have a matching scoped opener inside the same outcome
  template. Duplicate target IDs remain a hard failure in the Spec-044 inventory guard.
- **Evidence:** the live inventory found ten duplicate target records and thirty duplicate field
  IDs when the literal target was repeated. The scoped form now generates zero duplicates.
- **Reason:** preserving the literal target would violate unique-ID, deterministic mapping, and
  single-surface requirements.
- **Neighbours:** the minimum nested-feedback presence check, its form-field audit, and all
  outcome/detail assertions remain active.
- **Mutation proof:** M44-02 broken mapping and the final duplicate-ID/consumer inventory guards
  must produce RED for a missing or duplicated scoped target; final smoke and inventory suites
  must return GREEN.

Codex approves these three exact supersessions for Spec 044. No other protected assertion is
weakened, skipped, thresholded, or swallowed.

## Additive test-driver hardening

This is not a requirement supersession. Fixed-duration waits in the preserved deep-link and
topbar-language checks now wait for the exact URL and sole expected visible panel. The assertions
and expected values are unchanged; the driver no longer samples before asynchronous page setup is
complete. Spec-044 accessibility and screenshot setup also removes optional opener catches for
required states, so a missing opener, target, or state fails the gate directly.

The final screenshot review found four inherited rows that named stale hosts rather than the live
required interaction. They were relocated without changing the visual requirement: staff
permissions now opens `st-perm` through the staff row menu, settings head creation opens `head-add`,
and the family/student note rows open their required notes views before `fam-note`/`stu-note`.
Required popover setup now retries only until `aria-expanded="true"`, then requires the exact item;
it never swallows a missing selector. M44-10 was also strengthened to reject a locked 390px page
whose root `scrollWidth` exceeds the viewport. These are additive synchronization/coverage guards,
not additional supersessions.

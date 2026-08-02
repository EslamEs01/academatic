# Interaction Classification Matrix — Spec 044

Counting unit is one generated consumer in one locale. AR and EN are structurally identical; counts below are per locale unless a localized total is stated. The route-target inventory in [interaction-inventory.md](interaction-inventory.md) enumerates every drawer target.

## Final required classification

| Current type | Required type | Per locale | Localized total | Migration | Evidence/final rule |
|---|---|---:|---:|---|---|
| Current confirmation trigger | Small confirmation modal | 160 | 320 | Shared host migration | One concise decision; 97 destructive per locale; safest focus and guarded dismissal |
| Current generic modal trigger | Small informational/backend-required modal state | 13 | 26 | Shared host migration | Concise message/action; no form; one modal-grade owner |
| Form target | Medium simple-form modal | 54 | 108 | Presentation migration | Bounded single-purpose completion without long scrolling; mobile full-screen |
| Form target | Contextual/long form drawer | 18 | 36 | Host/layout migration | Contextual, selection-heavy, repeatable, or long; stable action footer |
| Detail target | Details/preview drawer | 162 | 324 | Host/layout migration | Vertical/contextual reading; stable header and independent scroll |
| Current dedicated wizard page | Dedicated large-form page | 1 | 2 | State integration only | Existing five-step `add-family`; no new route/page |
| Current dropdown/menu opener | Non-modal dropdown/menu | 405 | 810 | Keyboard/focus correction | Never modal or focus trapped |
| Current mobile-sidebar opener | Modal-grade mobile sidebar | 32 | 64 | Shared host migration | IA/routes/content frozen |

At 390px the 234 templated surfaces plus 13 generic modal surfaces per locale receive full-screen/safe-viewport presentation. Confirmation presentation must safely fit the viewport; it may remain visually compact when the entire surface and actions fit. The sidebar uses its own modal-grade full-screen contract.

## Form-target decision table

Control count is recorded only as evidence. Context, scroll, repeatability, sections, and review determine the class.

### Medium simple-form modal — 54 generated targets per locale

| Logical target IDs | Generated consumer rationale |
|---|---|
| `bank-add`, `cert-tpl`, `fam-cat`, `fam-note`, `stu-note`, `task-section`, `trn-note` | Single compact value/choice/note task |
| `integ-stripe`, `integ-paypal`, `integ-mollie`, `integ-xpay`, `integ-payoneer`, `integ-paymob`, `integ-custom`, `integ-paymob-payout`, `integ-payoneer-payout`, `integ-whatsapp`, `integ-email` | Bounded provider configuration; no real connection/save is claimed |
| `head-add`, `lib-cats`, `mat-add`, `mat-edit` | Bounded administrative form |
| `lead-l1`…`lead-l8` | Bounded row-specific edit; identity must be preserved |
| `fb-add-<outcome-id>` ×14 | Bounded nested feedback form; unique outcome-derived IDs and one-surface transition required |
| `lib-item`, `msg-member`, `rep-fbcat` | Bounded selection/data-entry task |
| `cert-create`, `fb-create`, `msg-group` | Bounded coherent form that fits a medium desktop surface |
| `staff-add`, `staff-edit`, `staff-dup` | Legacy/current evidence supports medium administrative form; protected privacy rules remain unchanged |

### Contextual/long form drawer — 18 generated targets per locale

| Logical target IDs | Generated consumer rationale |
|---|---|
| `crs-add`, `crs-edit`, `grp-add` ×2, `grp-edit` | Contextual academic entity editing/selection benefits from underlying page context |
| `fam-child`, `fam-edit` ×2 | Family-context editing with longer/related fields; privacy state remains protected |
| `sess-new` ×2, `task-new` | Longer contextual scheduling/task workflow |
| `stu-edit` ×2, `stu-add` | Longer student workflow; 390px clipping is a proven defect |
| `form-create` | Repeatable/section-like form-builder workflow |
| `trn-edit` ×2 | Long teacher edit; pay-free/privacy constraints preserved |
| `lead-new` | Longest current form (19 controls) with proven below-fold action |

### Details/preview drawer — 162 generated targets per locale

Every `D` target in [interaction-inventory.md](interaction-inventory.md) remains a details/preview drawer. A containing details target is not reclassified merely because it embeds a nested `fb-add` template. Policy/detail content owned by Spec 043 is host-only migration.

## Source ownership and generated consumers

- `preview-drawer.js` owns the common target markup and explicit presentation contract.
- Current component/page producers own their target classification and field identity.
- `enhance.js` plus the new shared controller own lifecycle behavior, not classification policy.
- `build-html.mjs` maps each logical route source to AR/EN generated consumers.
- Generated HTML is verification output only.

The final inventory and layout guards reproduce these counts exactly with zero duplicate target/field IDs; application pages were not edited to manufacture a count.

<!-- SPECKIT START -->

# Project rules

Read [CLAUDE.md](CLAUDE.md), the [active Spec 044 plan](academy-dashboard-discovery/specs/044-modal-drawer-long-form-interaction-system/plan.md), and the preserved [Spec 043 contracts](academy-dashboard-discovery/specs/043-sensitive-data-privacy-role-isolation-anti-poaching/contracts/) before acting.
Evidence beats inference; contradictions trigger STOP. Preserve authored and
current-product improvements. Never commit, push, merge, stash, reset,
checkout, clean, or auto-commit without explicit user authorization.

## Layout and commands

The product is under `academy-dashboard-discovery/`: `app/src/` is authored
source, `app/public/` is built product, `app/tests/` holds smoke/a11y/screenshot
checks, and `specs/` holds SpecKit artifacts. From `academy-dashboard-discovery/app`,
use `npm run build`, `npm run test:smoke`, `npm run test:a11y`, and `npm run screenshots`
only when the assigned task permits generated output. SpecKit lifecycle is
`specify → plan → tasks → implement`; never mark a task complete without evidence.

## Non-negotiable delivery laws

- Run Targeted Visual Grounding before visual or form work; do not guess.
- Do not fake backend success, persistence, delivery, payment, approval, or mutation.
- A create/save/add surface carries the complete evidenced information set, not a token subset.
- Enforce role privacy and anti-poaching: teacher pay-free, family zero-pay, and student child-view.
- Protected tests change only through declared supersession. Mutate one isolated copy at a time and prove RED → GREEN.
- Accessibility and console-error checks are gates, not advisory reports.

## Routing and collaboration

| Work | Model / effort | Access |
| --- | --- | --- |
| Specs, plans, architecture, privacy/security, evidence, visual judgment, mutation design, final review | `gpt-5.6-sol` high/xhigh | read-only unless explicitly assigned |
| Bounded implementation, inventories, locale/CSS mechanics, focused tests | `gpt-5.6-terra` medium/high | scoped access |

Escalate Terra work to Sol for security-sensitive, ambiguous, or high-blast-radius
changes. At most four agents including root; depth one; one writer per file;
read-only work may run in parallel and shared-file writers serialize. Ponytail
is always **lite** and subordinate to the Spec, contracts, evidence, privacy,
accessibility, visual grounding, tests, mutations, and propagation. Its review
supplements—never replaces—correctness or security review.
<!-- SPECKIT END -->

# Scope — `classSalaryReport` nav item (the hard case)

## Current state (grounded)
- `app/src/js/nav.config.js:90` — `item({ id: 'classSalaryReport', labelKey: 'nav.classSalaryReport', icon: 'wallet', status: 'disabled', reasonKey: 'nav.reason.finance' })`, Finance sub-section.
- `app/tests/smoke/run.cjs:1586` — member of `lockedFin`, asserted disabled+reason+lock.
- Currently represented ONLY as one of the 9 figure-free planned cards: `app/src/js/fixtures/finance.js:99` — `{ id: 'classSalaryReport', availability: 'backendRequired', titleKey: 'fin.planned.classSalaryReport.title', descKey: 'fin.planned.classSalaryReport.desc', icon: 'clipboard-check', tone: 'muted' }`, rendered in `plannedSection()` (`finance.js:160-171`) via `reportCard`/`plannedCard` — a route-less card, not a nav-linked page.
- Legacy grounding: `specs/016-.../admin-sidebar-page-inventory.md` and `specs/030-.../legacy-finance-coverage.md` classify the legacy `/salary-class-report` as a payroll-computation surface (per-class teacher pay), same family as `analysis-expenses`/`analysis-invoices`.

## Why this is the hard case
A "class salary report" is, by its own name, a computed **per-class teacher pay** artifact (sessions taught × rate, or similar). That computation:
1. Requires a rate/hour_rate figure per teacher or per class — forbidden under the teacher pay-free GLOBAL law and the salary-figure-never-shown law.
2. Requires an arithmetic combination (count × rate, or a summed payout) — forbidden under the no-fake-money / no-computed-anything law.
There is no honest way to show a "salary report" that contains a salary number. Any literal number shown here would either be fabricated (dishonest) or would leak a real-looking payroll figure into a page the finance invariant explicitly protects.

## Two honest options (record — do not resolve here)

**(a) Thin figure-free per-class status board.**
Route: `finance.html#view=class-salary-report` (new 4th tab, or a sub-panel within Salaries). Content: one row per class/group — teacher name + class/group name + a CATEGORICAL status chip (e.g. `pending`/`generated`/`approved`/`paid`, reusing `SALARY_STATUS` tones) — **no pay amount, no session count × rate, no per-class total**. Generate/Export stay `data-disabled-reason` gates. This is honest ONLY if the status chip is clearly a workflow-state label, not a disguised amount, and if no "sessions taught" count is paired with any rate context that would let a reader infer pay.

**(b) Keep the honest lock (recommended).**
`classSalaryReport` nav item stays `status: 'disabled'` + `reasonKey: 'nav.reason.finance'` (or a more specific reason key such as `fin.reason.backend`/a new `nav.reason.classSalaryReport` documenting "requires the payroll backend to compute per-class pay"). The existing `PLANNED_FINANCE` card (`finance.js:99`) already documents this honestly as a `backendRequired` gate. No new UI, no new tab, no new fixture. This preserves the existing "9 planned cards" invariant (`plannedN===9`, held byte-verbatim across Specs 026-037) with zero risk of a figure leaking through a "status" chip that a reader could still mentally reverse-engineer into a pay signal (e.g. if `sessionsCount` were ever added next to the class name).

## Recommendation
**(b) Honest lock.** The thin board in (a) adds surface area and reviewer burden (a per-class board is closer in spirit to a payroll report than the whole-teacher/whole-staff `salaries` board is, raising the risk of scope creep toward a real per-class rate column in a later spec) for a UI that is still route-less from the user's point of view (a locked nav item + an existing planned card already communicates "this is coming with the real backend" honestly). If `/speckit.plan` prefers unlocking it, (a) is the fallback — but it must remain thinner than the `salaries`/`staffSalaries` boards (no period-by-period rows, no session/class-count column placed next to any status that implies payment).

**This is the key open decision for `/speckit.plan`.**

## Route
- (b), recommended: no route change — nav item stays `disabled`, no deep-link.
- (a), fallback: `finance.html#view=class-salary-report`.

## Display sections
- (b): none (locked nav item + existing planned card only).
- (a): tab header + action gates (Generate, Export) + a `cardGrid` of class/group rows (teacher name + class/group name + status chip only).

## Allowed authored data
- (b): none new.
- (a): new fixture rows shaped `{ id, teacherNameKey, classNameKey, statusId }` — explicitly NO `amount`, `rate`, `sessionsCount`, or `hourRate` field, ever, on this shape.

## Forbidden
- Any per-class or per-teacher pay/rate/hour_rate/fine/payout figure.
- Any computed total, count-times-rate, or aggregate payroll sum.
- Any session/class COUNT displayed adjacent to a status chip in a way that could be read as an implicit payout basis.
- Real Generate/Export mutation, PDF, CSV, download.
- Reducing `plannedN` below 9 without an explicit, separately-sanctioned amendment (only relevant if (a) is chosen and the planned card is promoted/removed).

## Gated finals
If (a): Generate / Export as `data-disabled-reason` gates, mirroring `fin.sal.generate`/`fin.sal.exportRoster` reason-key conventions (new keys e.g. `fin.classSal.generateReason`).
If (b): no new gate; existing `PLANNED_FINANCE` card `backendRequired` availability stands.

## Smoke / a11y scope
- (b): `lockedFin` (`run.cjs:1586`) KEEPS `'classSalaryReport'` — no amendment needed; add a small clarifying comment in the smoke assert (optional) that this is a deliberate stay-locked decision under Spec 038, not an oversight.
- (a): amend `lockedFin` to remove `'classSalaryReport'`; add a figure-free assert scoped to the new panel (no `/\d+\s*(SAR|ريال)/` money pattern, no rate/hour_rate token) mirroring the existing `salFigureFree` check; add nav-anchor resolution assert.

## Acceptance
- Count 115 unchanged either way; admin-menu 50 unchanged.
- `plannedN === 9` held unless (a) is chosen AND explicitly re-pinned with a sanctioned amendment note.
- 0 pay/rate/payout figure in any reachable surface under either option.

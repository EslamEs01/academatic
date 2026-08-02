# Count, Route & Impact Contract — Spec 043

Authoritative on page/route/count impact. Default and frozen (`contracts/count-route-freeze-contract.md`,
Spec 042; baseline HEAD `ce33a7c`, re-measured this specify pass):

## The frozen invariants

| Invariant | Value | 043 expectation |
|---|---|---|
| Public HTML files | **115** | unchanged |
| Page bases (PAGES) | **57** | unchanged (0 new bases) |
| Admin menu items | **50** | unchanged |
| Route split | **24 deep / 25 plain / 1 disabled** | unchanged |
| Nav status split | **49 implemented / 0 planned / 1 disabled** | unchanged |
| `FUTURE_ROUTES` | **{}** | unchanged |
| Sole honest lock | **`classSalaryReport`** (`disabled` + `nav.reason.finance` + route-less) | unchanged |
| Gallery orphan pair | **`{gallery.html, gallery.en.html}`** | unchanged |

All re-verified against HEAD `ce33a7c` this pass (115 HTML; PAGES 57; menu 50 via `catItems`; deep/plain/disabled
24/25/1; `FUTURE_ROUTES {}`; disabled id = `classSalaryReport`; gallery pair present).

## The architecture default

Spec 043 is a **policy + visibility foundation**, not a page build. Every requirement folds into existing
surfaces:

- The parent-contact deny-by-default rows → the existing staff RBAC preview (`staff.html`) / settings users tab.
- The child-view password-gate removal → the existing `student-profile.html` (a gate is removed, not a page).
- The role-visibility matrix, anti-poaching, secrets, presence, room-link rules → policy consumed by later
  specs on their existing surfaces (045–056), not new pages.
- The connection-health contract → a CONTRACT only; no route is built (`privacy-safe-connection-health.md`).

**0 new page bases. Public HTML stays 115. PAGES stays 57. Admin menu stays 50. `FUTURE_ROUTES` stays {}.**

## No "Privacy Center"

043 does **NOT** create a generic "Privacy Center" page merely because the spec exists (directive). Policy and
controls fold into existing tabs/drawers.

## Stop-and-report rule

If evidence ever proved a standalone page necessary, the specify phase MUST **STOP and report the page/count/
route impact BEFORE authoring that decision** (directive; spec.md Stop Condition #3). **No such page was needed
— none of the 17 owned rows requires a new surface** (the two frontend-now closures, G-01 and G-03, are a
fixture-preview row addition and a gate removal on existing pages). The connection-health view is explicitly
NOT built (contract only). Therefore counts are unchanged and no stop was triggered.

## No application edits during specify; 043's OWN implement phase owns the class-A changes

`app/**`, tests, public HTML, and package files are **untouched** during the `/speckit.specify` phase — the only
files this phase writes are this feature directory's artifacts + `.specify/feature.json`. **CORRECTION
(2026-07-17): the Spec-043-owned frontend foundation changes — the G-01 parent-contact registry rows + preview,
the G-03 child-view gate removal + declared test supersession, the teacher-capability policy preview, and the
global privacy absence guards — are implemented by Spec 043's OWN `/speckit.implement` phase (Wave 0), NOT by any
later spec.** That implement phase may edit **existing** sources / tests / locales / styles **only where the plan
proves necessary** — **0 new page bases**, no new host, no new dependency, no new component when an existing host
suffices (the staff RBAC preview host for parent-contact; the teacher admin host for the capability policy;
`portal.js` for the child-view gate). All frozen counts above hold across the implement phase.

## Any future count impact is DECLARED, never pre-applied

Consistent with the Spec-042 rule (`contracts/count-route-freeze-contract.md` §3): should any later
043-consuming spec ever need a count change, it declares it (old value · new value · evidence · reason ·
neighbours · mutation proof). 043 pre-applies nothing.

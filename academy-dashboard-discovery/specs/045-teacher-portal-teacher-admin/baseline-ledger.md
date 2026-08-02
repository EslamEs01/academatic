# Accepted Pre-Implementation Baseline

**Authority:** committed HEAD `722be1c37904f0fd44d666553e91239d7e8b4400`  
**Captured:** 2026-08-02 before any Spec-045 application/test edit  
**Branch after authorized creation:** `045-teacher-portal-teacher-admin`  
**Application-byte state:** identical to the clean committed Spec-044 tree; only Spec-045 documentation and the active AGENTS plan reference were added before this ledger.

## Repository and generated product

| Measure | Accepted baseline | Evidence |
|---|---:|---|
| HTML files | 115 | committed Spec-044 implementation status and live public inventory |
| Localized product pages | 114 | 57 AR + 57 EN |
| Redirect pages without `#page-body` | 1 | `index.html` |
| Extractable unique page bodies | 114 | existing strict impact contract |
| Added/removed routes for 045 | 0 / 0 | all 11 scopes already registered |
| Teacher authored page modules | 11 | exact source matrix |
| Teacher localized pages | 22 | 11 AR + 11 EN |
| Teacher localized page bodies | 22 | one unique `#page-body` per consumer |

## Teacher-domain inventory

| Family | Logical pages | AR | EN | Authored page owners |
|---|---:|---:|---:|---:|
| Teacher portal | 8 | 8 | 8 | 8 |
| Teacher administration | 3 | 3 | 3 | 3 |
| **Total** | **11** | **11** | **11** | **11** |

All eight Teacher role navigation entries are marked `implemented` in `app/src/js/fixtures/portal.js`. The defect is the home-page quick-tile presentation, not the route registry.

## Interaction baseline

The committed Spec-044 recursive inventory remains authoritative because no application byte changed:

- 234 generated interaction targets per locale: 72 form targets + 162 detail targets.
- 468 localized targets total, 320 confirmation instances, 810 non-modal menus, 64 mobile-sidebar openers.
- Teacher portal internal pages: no page-local modal/drawer/form targets; each uses the shared role shell and native mobile navigation.
- `teachers` per locale: one form, 33 controls, eight drawer openers, nine targets, eight row menus, five filters, three direct tabs, six backend-required gates.
- `teacher` per locale: 11 drawer openers, 16 targets, nine confirmations, five menus, two modal triggers, eight tabs, six backend-required gates.
- `teacher-performance` per locale: one filter form, five controls, four filters, three tabs, one backend-required gate.

The exact target/opener mapping is re-extracted after implementation; these are accepted baseline values, not desired manufactured counts.

## Accepted broad verification

Because HEAD is the committed, independently verified Spec-044 tree and no relevant byte changed after its final evidence:

| Gate | Baseline evidence |
|---|---|
| Build | 115 HTML |
| Smoke | 114/114 PASS |
| Accessibility | 300 scenarios; critical=0; serious=0 |
| Screenshots | 402 captures; console errors=0 |
| Focused interaction | 22/22 PASS |
| Spec-044 mutations | 15/15 intended RED; restored GREEN; residue=0 |
| Generated parity | 11 copied JS/locale assets byte-exact; CSS/HTML canonical |
| Unrelated page-body drift in 044 | 0 |

These gates are not rerun before implementation because their committed evidence is present and unaffected. Every gate invalidated by Spec-045 application/test changes is rerun after implementation.

## Protected baseline

Specs 041, 043, and 044 protected assertions remain immutable except through a declared bounded strengthening/supersession. Spec 045 adds page-local and domain guards; it does not become the owner of foundation privacy or interaction behavior.

## Baseline truth rules

- No current-tree snapshot is called historical evidence.
- Historical comparison reads `722be1c...` through Git.
- Page-body extraction must fail on missing/duplicate bodies, unexpected paths, parse failure, or whole-file fallback.
- New/removed pages are expected to remain zero.
- Unrelated page-body drift must be zero.

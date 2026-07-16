# Spec 042 — Count & Impact Contract

**Feature**: 042 — Exhaustive Legacy Capability & Page Reconciliation
**Baseline**: HEAD **`de8d552`** (Spec 041 · Full Frontend Route & Sidebar Production Freeze) · working tree **clean**
**Status**: SPECIFICATION / DOCUMENTATION ONLY

---

## 1. The rule

> **Spec 042 changes NOTHING that runs.**
> It is an audit. It produces documents. It modifies **zero** application source, **zero** tests, **zero**
> generated HTML, **zero** navigation entries and **zero** routes.

Any finding that *would* require a code change is recorded as a **proposal with a named future owner** — it is
never executed here. A spec that "just fixes one small thing while it is in there" is not an audit; it is an
unreviewed change.

## 2. Frozen invariants (inherited from Spec 041, verified at `de8d552`)

| Invariant | Value | Verified from |
|---|---|---|
| Public HTML pages | **115** | `ls public/*.html` |
| Page bases (`PAGES`) | **57** | `scripts/build-html.mjs` |
| Admin menu items | **50** | `nav.config.js` (categories + sections) |
| **Route split** deep / plain / route-less | **24 / 25 / 1** | `nav.config.js` |
| implemented / planned / disabled | **49 / 0 / 1** | `nav.config.js` |
| `FUTURE_ROUTES` | **`{}`** | `nav.config.js` |
| Honest locks | **1** — `classSalaryReport` (route-less, `nav.reason.finance`) | `nav.config.js` |
| Orphan set | **exactly 2** — `{gallery.html, gallery.en.html}` | derived from all 115 files |
| `[data-coming-soon]` | **0** | built output |

**Target after Spec 042: every value above is UNCHANGED.**

## 3. Impact boundary — the complete allowlist

Spec 042 may create/modify **only** files inside:

```
academy-dashboard-discovery/specs/042-exhaustive-legacy-capability-reconciliation/
```

…plus `.specify/feature.json` (the speckit pointer) and, if the roadmap record demands it, `CLAUDE.md`.

### MUST BE 0-DIFF (a diff here is a STOP)

| Path | Why |
|---|---|
| `app/src/**` | no source edit — 042 implements nothing |
| `app/tests/**` | no test edit — the Spec-041 gates stand exactly as committed |
| `app/public/**` | no generated HTML edit; the build is not even re-run as a change |
| `app/scripts/**` · `app/package.json` | no build/dependency change |
| `app/src/js/nav.config.js` | **no nav edit, no new route, no status flip** |

## 4. Proposal register (how a real gap is recorded without acting on it)

If the evidence proves a new page or route is genuinely required, it is recorded as:

| Field | Meaning |
|---|---|
| Proposal ID | `P-nn` |
| Capability | what it enables, and for whom |
| Evidence | exact legacy record + screenshot path proving the need |
| Count impact | e.g. `+1 base ⇒ 115 → 117 HTML` (a base is always **×2 languages**) |
| Menu impact | e.g. `+1 nav item ⇒ 50 → 51` |
| Owning spec | who may implement it (043–057) |
| Why not now | the boundary reason it is not done in 042 |

**No proposal is executed in Spec 042.** A count that changes during this spec is a STOP condition.

## 5. Verification (documentation-only proof)

At the end of Spec 042, all of the following must hold:

```
git diff --stat -- academy-dashboard-discovery/app   →  (empty)
git status --porcelain academy-dashboard-discovery/app  →  (empty)
```

and the nine invariants in §2 re-derive to the same values. Because no application file is touched, the
Spec-041 suites (build / smoke / a11y / screenshots) are **unchanged and remain green by construction** — they
are not re-run as evidence of a change, only optionally as a no-op sanity check.

**No commit · no push · no branch · no stash · no reset · no checkout · no clean.** The watcher commits.

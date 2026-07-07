# Contract: Scope Guard

**Purpose**: the master allowed/forbidden boundary for Spec 024 implementation. No change may fall outside this.

## Allowed source files

| File | For | Condition |
|---|---|---|
| `app/src/locales/ar.prt.js`, `en.prt.js` | B-01 note reframe; B-05 planned label; B-03 gate copy; B-11 empty-state copy | mirrored ar/en; no student-primary wording; no pay token |
| `app/src/js/fixtures/portal.js` | B-05 planned `library` nav item | Option A only; non-anchor `is-planned` |
| `app/src/js/components/portal-shell.js` | B-03 role-shell notifications gate | Option A only; reuse `data-action="notifications"` |
| `app/src/styles/app.css` | B-11 density | additive living layer only; motion in the one reduced-motion block |
| `app/tests/{smoke,a11y,screenshots}/*` | re-pin / coverage | additive, declared amendments only (see smoke-rescope-contract) |
| `app/screenshots/REVIEW.md`, `app/README.md`, `CLAUDE.md` | B-08/B-09 provenance; visual notes; plan pointer | documentation |
| `specs/016-…/contracts/teacher-pay-free-global-contract.md` | B-07 exemption | append-only |
| `specs/022-…/contracts/` | 022-hash supersession + B-10 notes | append-only |
| `specs/023-…/*` | B-02/B-04/B-08/B-10 status notes | append-only |
| `specs/024-…/*` | these planning docs | — |

## Allowed built outputs (from rebake only)

`public/student-*.html`, `public/student-*.en.html`, `public/assets/locales/*`, `public/assets/*` (+ shared-asset rebake). Count MUST stay 77.

## Forbidden files

`build-html.mjs` · `package.json` · `nav.config.js` (unless a proven-safe B-02 documentation-only note) · `enhance.js` (unless a hard B-03 blocker proves it necessary) · `topbar.js` · any admin page source · any teacher/admin internal page source · any NEW page module · backend/API/auth · any new external dependency.

## Hard guards (every one MUST hold)

- Public HTML count == **77** (no add/remove).
- No new `data-*` hook name; no new storage key; no `href="#"`; no raw locale key.
- Teacher pay-free GLOBAL + family zero-pay green (see `pay-zero-safety-contract.md`).
- Student demoted-not-deleted; family owns child journey; admin/family/teacher primary; role-model smoke pins green.
- Any `#page-body` change → declared hash supersession + smoke re-pin.
- Dark/light + RTL/LTR + mobile-390 + reduced-motion preserved.

## Stop conditions

Public HTML ≠ 77 · new page/hook/storage key needed · teacher/family pay token appears · student-primary wording remains after B-01 · family/teacher role notes changed · B-03 needs a new engine · live-room can't be recorded honestly · B-11 becomes a redesign · unexplained smoke hash change · role model regresses → **STOP and report.**

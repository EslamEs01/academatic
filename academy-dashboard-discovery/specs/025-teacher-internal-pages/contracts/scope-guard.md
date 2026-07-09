# Contract: Scope Guard

**Purpose**: the master allowed/forbidden boundary for Spec 025 implementation.

## Allowed source files
| File | For |
|---|---|
| `app/src/js/pages/teacher-{schedule,students,outcomes,tasks,reports,profile,library}.js` | the 7 NEW page modules |
| `app/src/js/pages/teacher-portal.js` | performance anchor repoint ONLY (`perfHref` line) |
| `app/src/js/fixtures/portal.js` | ROLE_NAV.teacher flips + static TEACHER_PREVIEW rows |
| `app/src/locales/ar.prt.js`, `en.prt.js` | mirrored `prt.title.tch*` + `prt.tch.<page>.*` keys |
| `app/src/styles/app.css` | additive living-layer rules if needed |
| `app/scripts/build-html.mjs` | 7 imports + 7 PAGES entries ONLY |
| `app/tests/{smoke,a11y,screenshots}/*` | coverage + declared re-pins |
| `app/screenshots/REVIEW.md`, `app/README.md`, `CLAUDE.md` | docs |
| `specs/016/023/024/025/*` | append-only records (016 B-07 exemption update; 024 status) |

## Allowed built outputs
The 14 `teacher-{schedule,students,outcomes,tasks,reports,profile,library}(.en).html` + `teacher-portal(.en).html` rebake + `public/assets/*`. Count MUST be **91**.

## Forbidden files / creations
`package.json` · external deps · admin/family/student page modules · `enhance.js`/`topbar.js`/`portal-shell.js` (no change needed) · a `teacher-chat`/`teacher-finance`/`teacher-salary`/`teacher-pay`/`teacher-live-room` page · backend/API/auth · new dependency · new chart/animation engine · new `data-*` hook · new storage key.

## Hard guards (every one MUST hold)
- Public HTML == **91**.
- Teacher pay-free 3 layers green; `payHit` byte-verbatim.
- No `href="#"`, no dead links/buttons, no raw keys, no fake actions.
- Live-room = gate; no teacher chat page/nav; no teacher finance/pay nav.
- `plannedNavAnchors===0`; `navListAnchors===8`; anchor → teacher-reports.
- Admin+index+family+student byte-identical (except teacher-portal nav/anchor).
- Dark/light + RTL/LTR + mobile-390 + reduced-motion preserved.

## Stop conditions
HTML ≠ 91 · teacher pay token · reports finance wording · anchor still → teacher-performance · fake live-room/chat/upload/download/save · teacher chat/finance/pay nav · package.json change · admin/family/student module change · new backend/dep/chart engine · a11y critical/serious · mobile-390 overflow → **STOP and report.**

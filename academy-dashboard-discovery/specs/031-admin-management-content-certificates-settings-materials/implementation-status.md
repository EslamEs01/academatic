# Spec 031 — Implementation Status: IMPLEMENTED (awaiting watcher commit)

**Baseline**: Spec 030 committed — HEAD `7c5ab7b` ("finance tabbed hub…"); T001 gate PASSED. Public HTML **97 → 103**
(+6 = staff/library/certificates × AR/EN). No commit / no push performed — the watcher commits.

## Count & page decision
- **103** public HTML. Settings-category items **fold into `settings.html`** as a 6-tab hub (0-delta, finance
  precedent). Admin-category items become **3 focused pages**: `staff.html` (directory + kebab + RBAC drawer),
  `library.html` (Materials + Books tabs; `materials` folded), `certificates.html` (Templates + static designer +
  Requests tabs; `certificateRequests` folded). `nav.config.js` = exactly **3 flips** (`staff`/`books`/
  `certificates` planned→implemented + route); `materials`/`certificateRequests`/six `settings*` stay `planned` (folded).

## Tasks T001–T074 — all complete
| Phase | Tasks | Result |
|---|---|---|
| 1 Setup/Preflight | T001–T006 | gate PASSED (HEAD `7c5ab7b`, count 97, build/smoke/a11y green); no app change before start; contracts loaded |
| 2 Foundation/registration | T007–T014 | 3 page modules + 3 build-html entries + 3 nav flips + i18n reg + ar/en.adm.js; build→103 |
| 3 Fixtures/locale/CSS | T015–T020 | `staff-management`/`content-library`/`certificates`/`settings-management` (authored, no PII/pay/secret/file); `ar/en.adm.js` mirrored **391 keys each, 0 divergence**; additive `.cert-stage`/`.cert-field` CSS |
| 4 US1 Staff | T021–T028 | directory + `staffMenu` branch (existing `data-row-menu`) + no-pw/no-salary modals + display-only RBAC drawer + category/activity drawers + Deactivate/Delete confirms (no mutation) + Reset/Invite gates; `staff.html` = the ONE staff home |
| 5 US2 Materials/Books | T029–T034 | `library.html` Materials(subjects) + Books(count-literal rows + filters + category drawer) tabs; Add/Upload/Download/Publish/Delete gates; **no `type=file`** |
| 6 US3/US4 Certificates | T035–T041 | `certificates.html` Templates(+**static designer**, no canvas/drag) + Requests tabs; Approve/Reject/Generate/Preview/Download/Send/Create/Upload gates (no PDF/window.open/mutation) |
| 7 US5/US6 Settings hub | T042–T051 | `settings.js`→`tabs({group:'settings',…6})`; theme/lang **preserved real**; General(identity+locations+heads, pay-rate omitted, logo gate) · Notifications(figure-free matrix) · Customization(brand + msgbuilder gate) · Security(2FA + policy display + backup/import gates) · Users(RBAC preview + deep-link to staff) · Integrations(locked cards) |
| 8 US7 Gates | T052–T056 | message-builder/backup/import/credentials/gateway/payout/SMTP → future-backend gates; export/download → gates; **0 `type=file`/`type=password`/secret/api-key/webhook** in built bodies |
| 9 US8 Menu coverage | T057–T059 | 3 flips + folded reachability; coverage inventory updated; admin category still 5 items; build guard green; smoke coverage re-pin |
| 10 US9 Future-owner | T060–T061 | teacher-library/family-notify/CV/request-origin not duplicated (portal/family/student byte-identical); register accurate |
| 11 Cross-cut | T062–T063 | every C-row resolved; every write a modal/drawer/confirm/gate; href="#"=0/raw=0/dead=0; no-mutation |
| 12 Smoke/a11y/screenshots | T064–T068 | additive f30-model 031 block; a11y +12 rows; screenshots +11 sp031 frames; all green |
| 13 Docs/final | T069–T074 | README + CLAUDE + this record + REVIEW; clean-code + test guards; impact proof; no commit |

## C-row resolution
**Built/folded (031)**: C-01…C-05, C-07, C-08…C-14, C-15…C-18, C-19(omitted pay-rate), C-20, C-21, C-23…C-26,
C-28, C-31, C-33, C-34, C-35.
**Future-backend gates**: C-06 reset/invite · C-22 message-builder · C-27 backup/import · C-29 credentials ·
C-30 gateway/payout · C-32 SMTP.
**Owned elsewhere / 032**: C-36 teacher-library(025) · C-37 family-notify · C-38 teacher-CV · C-39 request-origin ·
C-40 final sweep(032).

## Verification
- Build: **103**; icons 69 ok / 0 missing; chip-tone guard green.
- Smoke: **PASS — 102 loads**; additive Spec-031 block (per-page: no `type=password`/`type=file`/canvas/drag/pdf
  credential-input, figure-free, gates present, tabs render + switch, staff kebab+RBAC drawer, library Materials/
  Books, certificates static designer, settings 6 tabs + real theme) all green; **`payHit`/`tchPay`/`famPay`/
  `payFigure`/child-view + all 026/027/028/029/030 asserts BYTE-VERBATIM**.
- A11y: **critical=0 serious=0** (+12 rows: staff/library/certificates/settings tabs, dark, en, hashes).
- Screenshots: **219 captured · 0 console errors** (11 sp031 frames).
- Impact: **new** = staff/library/certificates ×2. **Changed existing** = `settings.html`/`.en` (folded hub) +
  the shared sidebar on every admin page (the 3 nav flips: staff/books/certificates → anchors — proven the ONLY
  change; every protected `#page-body` byte-identical). **Byte-identical**: teacher-portal ×16 + all portal pages +
  index; finance/reports/teacher/family/student/dashboard/sessions/etc. **bodies**. `package.json` **0-diff**;
  no new dependency/engine/hook/storage key (`staffMenu` = a branch on the existing `data-row-menu`).
- Role laws: teacher pay-free (portal byte-identical; admin staff omits salary), family zero-pay, student
  child-view, finance Spec-030 invariant — all green. No salary/payout/compensation FIGURE on any 031 body; no
  computed metric; no chart/canvas; no credential/secret/`type=file`/`type=password`.

## No new page beyond the 3 justified
No settings sub-page, no materials-standalone, no certificateRequests-standalone, no finance/payroll/bank page.
Each new page passed the page-candidate test (grounded · reserved route · distinct `admin`-category IA · too large
to fold · +2 AR/EN · smoke/a11y/screenshot coverage added). Next: watcher commit.

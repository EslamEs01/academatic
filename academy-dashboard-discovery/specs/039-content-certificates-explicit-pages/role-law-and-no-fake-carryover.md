# Role-Law & No-Fake Carryover — Spec 039

Spec 039 is a nav-unlock spec (2 deep-links). It changes **no** content/certificate page body and adds **no**
behavior — so every standing law is upheld by construction. This artifact restates the binding contracts and how
they are proven. It merges the required **no-fake report/content actions** and **no-fake student/family**
registers into one carryover (there is no report/finance/student-calculation surface in this scope).

## Role & permission law (carried from Specs 031/035–038)
| Role | Content/Certificates rights | Spec 039 effect |
|---|---|---|
| **Admin** | manage materials · manage library/content · review certificate requests · manage templates (frontend-honest) | the two admin surfaces become reachable from the sidebar (deep-link); management finals stay gated |
| **Teacher** | read library · request certificate for permitted own students · NO admin content mgmt · NO cert approval | untouched — teacher portal not modified; request origin is future-backend |
| **Family/Student** | read permitted library content · NO admin content mgmt · NO cert approval | untouched — portal not modified |

No admin action is exposed in any teacher/family page. No role permission is widened. Teacher/family library
pages (`teacher-library.html`, `family-materials.html`, `student-materials.html`) stay byte-identical (out of
scope). Prior role laws — teacher pay-free GLOBAL, family zero-pay, student child-view, admin finance
Spec-009-invariant — are not touched by this spec and their smoke asserts stay byte-verbatim.

## Frontend honesty / no-fake law (binding, carried from Spec 031)
**Allowed:** authored fixture rows; read-only filter/search; drawers/modals; local form validation; local visual
preview honestly labelled (the static certificate `cert-stage` `role="img"` preview); categorical authored
statuses; honest `backendRequired`/`data-disabled-reason` gates; real in-page tab/deep-link state.

**Forbidden (0 rendered anywhere in scope):**
- fake DB persistence · fake upload success · fake delete success · fake approval/rejection success
- fake PDF generation · fake certificate issuance · fake certificate delivery · fake WhatsApp/email send
- fake download/view metric mutation · fake server pagination · fake API/network request · fake success toast
- silent request-status mutation · dead buttons · `href="#"` · raw locale keys
- secrets/credentials · payment/finance behavior · new backend/API/database/auth
- `<canvas>` · `type=file` · `type=password` · `.pdf`/`blob:` asset · `window.open` preview
- drag/position certificate editor · computed score/finance figure

**Every final write action** = a proven existing frontend-safe interaction **or** an honest `backendRequired`/
`data-disabled-reason` gate. No new file input is introduced (the Spec 031 conditions for a file input are NOT
satisfied → uploads stay locked gates).

## How it is proven (nav-only change ⇒ inherited proofs hold)
1. **Bodies unchanged:** `library.js`/`certificates.js`/fixtures 0-diff → the existing `a31` honesty block
   (no `type=file`/`type=password`/`<canvas>`, gates present, static designer) stays green byte-verbatim.
2. **Sitewide `g32` sweep:** `pw===0 && file===0 && canvas===0 && !pdfish` on every built page — unaffected.
3. **No new fixtures/locales** → no new PII/pay/secret/computed value can enter.
4. **Nav guard:** build-time throw prevents a dead/implemented-without-route link.
5. **Deep-links are display-only:** they open an existing display tab; no mutation occurs on load.

## No-fake registers (folded)
- **No-fake content actions:** no fake material create/edit/delete persistence; no fake library upload/publish/
  download/category-save; no fake view/download metric; no `type=file`; no backend/API; no row mutation.
- **No-fake certificate actions:** no fake request create; no status mutation on approve/reject/cancel; no PDF
  generation/preview/download; no certificate issuance; no WhatsApp/email delivery; no gateway/credential;
  no `<canvas>`/drag designer; no `window.open`.
- **No-fake student/family:** N/A to this scope (no student-result/evaluation/family-category surface here);
  those laws remain green and byte-verbatim from Specs 035/037.

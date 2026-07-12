# Certificate Requests Scope — Spec 039

**Primary target.** Nav id `certificateRequests` (AR «طلبات الشهادات»). Currently `status:'planned'` («قريبًا»),
**no `FUTURE_ROUTES` entry**.

## Current surface (already built — Spec 031)
`certificates.html` → `tabs({ group:'certificates', … })` with a **Requests tab** (`adm.cert.tab.requests`,
`requestsPanel()`): authored `CERT_REQUESTS` rows (student · course · teacher · description · date · status
chip), a read-only **review drawer** per request (`requestDrawer()`), a **create-request drawer**
(`certCreateDrawer()`), and disposition actions (Approve/Reject/Generate/Preview/Download/Send) as
`data-disabled-reason` **gates**. Deep-link `certificates.html#view=requests` already valid.

## Legacy evidence (grounding)
Columns `# · Student · Course · Teacher · Description · Date · Action`; empty "No data found"; **Approve modal** =
Student/Teacher/Description/Date/**Template select**/**WhatsApp delivery select**/notes → Close/**Preview**/
**Cancel**/**Approve**; filters incl. "Month". The rebuild **populates** the queue (improvement over the empty
legacy table) and keeps every write gated.

## Gap
Navigational only: the item shows «قريبًا» though the Requests queue is built and reachable. No functional gap.

## Decision — DEEP-LINK (Option B)
Flip `certificateRequests` `planned → implemented`, `route:'certificates.html#view=requests'`; remove «قريبًا».
(No `FUTURE_ROUTES` entry to trim.) **0 new pages, count 115, admin-menu 50.** Matches the Spec 033 roadmap.

## Product capabilities (confirm-as-present; no rebuild)
- Request queue: student · course/material · teacher · description/reason · date · authored status chip.
- Filters/search per the existing pattern (display-only over authored rows).
- Read-only detail/review drawer; template selection shown (templates exist on the Templates tab).
- Disposition **Approve / Reject / Cancel / Generate / Preview / Download / Send (WhatsApp)** = **gates**.
- States: empty · populated · filtered-empty · backend-required.

## No-fake / role law (highest-risk area)
**No status mutation** on approve/reject/cancel; **no PDF generation**, no `window.open`/`.pdf` href, no fake
issuance; **no WhatsApp/email send**, no gateway/credential/`type=password`; no `<canvas>`; **no `type=file`**;
no fake success toast. Every final = `backendRequired`. Admin-review only — teachers request (portal, out of
scope), families never approve. Teacher→admin handoff is documented, display-only (see handoff artifact).

## Test contract (see count-and-route-contract.md)
Assert: `certificateRequests` nav item is a real anchor to `certificates.html#view=requests` (not «قريبًا»/
aria-disabled/lock), AR + EN; fresh-load opens the Requests tab; review + create drawers reachable; Approve/
Reject/Generate/Preview/Download/Send are gates (no mutation/PDF/send); no `type=file`/`type=password`/`<canvas>`.

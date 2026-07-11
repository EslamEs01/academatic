# Contract — Certificate Requests Deep-Link (Spec 039)

## Change
`certificateRequests`: `planned` → `implemented`, `route:'certificates.html#view=requests'`. (No FUTURE_ROUTES
entry exists to remove.)

## Target surface (existing, 0-diff — `pages/certificates.js` Requests tab)
`CERT_REQUESTS` (5) rows: student · course · teacher · description · date · status chip. Read-only review drawer
(`requestDrawer`); create-request drawer (`cert-create`). Dispositions Approve/Reject/Generate/Preview/Download/
Send = `data-disabled-reason` **gates**. No status mutation, no PDF, no `window.open`, no WhatsApp/email send, no
`type=file`, no `type=password`, no `<canvas>`.

## Behavior
- `certificates.html#view=requests` opens the Requests tab on fresh load; `data-tabpanel="requests"` visible,
  `data-tabpanel="templates"` hidden. EN: `certificates.en.html#view=requests`.

## MUST NOT
- No standalone `certificate-requests.html`; no body/fixture/locale change; no fake approval/generation/delivery.

## Acceptance
Anchor href = `certificates.html#view=requests` (AR) / `certificates.en.html#view=requests` (EN), implemented, no
«قريبًا»/aria-disabled/lock; fresh-load shows exactly the Requests panel; review + create drawers reachable; every
disposition is a gate with no mutation.

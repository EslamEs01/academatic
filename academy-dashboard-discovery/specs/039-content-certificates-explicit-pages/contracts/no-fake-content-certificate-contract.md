# Contract — No-Fake Content & Certificate (Spec 039)

Nav-only change preserves every no-fake law (no body change). Binding forbidden/allowed sets:

## Forbidden (0 anywhere in scope)
fake material persistence · fake content persistence · fake upload · fake category save · fake publish/delete/
download · view/download metric mutation · certificate request status mutation · fake approve/reject/cancel ·
fake certificate generation · fake PDF preview/download · fake issuance · fake WhatsApp/email delivery · fake
success toast · backend/API/database/auth/network request · `type=file` · `type=password` · `<canvas>` ·
drag designer · `.pdf`/`blob:` asset · `window.open` · secret/credential · `href="#"` · raw locale keys · dead
buttons · new dependency.

## Allowed
authored fixture rows · read-only filter/search · drawers/modals · local form validation · honestly-labelled
static preview · categorical authored statuses · `backendRequired`/`data-disabled-reason` gates · real in-page
tab/deep-link state.

## Every final write ends as
`backendRequired`, OR `data-disabled-reason`, OR a confirm that ends in a backend-required gate. No new `type=file`
is introduced (Spec 031 file-input conditions are NOT satisfied → uploads stay locked gates).

## Proof (inherited — no body change)
- Existing smoke `a31`: `fileInputs===0`, `passwordInputs===0`, `canvas===0`, `noDrag`, gate thresholds — byte-verbatim.
- Sitewide `g32`: `pw===0 && file===0 && canvas===0 && !pdfish` on every built page — unaffected.
- No new fixture/locale ⇒ no PII/pay/secret/computed value can enter.

## Acceptance
Built library/certificates bodies: 0 `type=file`/`type=password`/`<canvas>`/`.pdf`/`window.open`/`href="#"`/raw
keys/fake-success; every write is a gate; no status/metric mutation on any action.

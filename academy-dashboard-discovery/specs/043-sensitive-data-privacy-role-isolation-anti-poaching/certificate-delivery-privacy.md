# Certificate Delivery Privacy — Spec 043

043 owns the delivery-PRIVACY contract for certificates (P-06/P-07/N-2/N-3); the delivery TRANSPORT and the
issue/generate surfaces are owned by 053 (`C10-20`) and 056 (`C10-12/-18`). Grounded in
`management-certificate-requests.html` (author-verified: `<option value="group">Send group`, `student_name=`
in the preview URL, `window.open`).

## The refused legacy behaviours (NEVER — RJ-17/RJ-18)

- **Send group** — `<option value="group">Send group` pushed a NAMED CHILD's certificate + link into a shared
  WhatsApp group: cross-family disclosure of a minor's record (P-06/N-2).
- **Preview URL with minor data** — `/preview?student_name=…&teacher_name=…&description=…` opened via
  `window.open`: a shareable link containing a child's record (P-07/N-3).

## The frozen rules (CD-1 … CD-7)

| ID | Rule | Guard |
|---|---|---|
| **CD-1** | "Send to group" is rejected **permanently**. No certificate Send control offers a group channel. | `certificates.html` Send = a bare backendRequired gate with no channel/recipient control (Specs 031/039); MUT-7 (restore group delivery) → the cert-delivery census fails |
| **CD-2** | No named child certificate in a shared group, ever. | no group option exists to carry one |
| **CD-3** | Private, **per-guardian** delivery only. | the only sanctioned channel is private to the child's own guardian |
| **CD-4** | Explicit guardian **opt-in** required by the future backend before any delivery. | `FUTURE_BACKEND` (consent store, B-10); the gate says so |
| **CD-5** | **No minor data in URL query strings.** No `student_name=`/`teacher_name=`/`description=` in any href. | href query-string census (G13, net-new); 0 `student_name=` anywhere; 0 `window.open`, 0 `.pdf` |
| **CD-6** | Generate / preview / send / download remain honest **gates** without a backend — no fake PDF, no fake issuance, no fake delivery. | existing Spec 031/039 gate contracts; no-fake law |
| **CD-7** | Delivery **transport** (WhatsApp/e-mail/in-app) remains **053-owned**; 043 owns only the privacy rules above. | `cross-spec-handoff-register.md` → 053 |

## Current-state compliance

The current `certificates.html` Send is already a bare backendRequired gate with **no channel/recipient
control** (Specs 031/039); 0 `window.open`, 0 `.pdf`, no `student_name=` query param anywhere
(`current-rendered-data-exposure-inventory.md`, link-safety + no-secret censuses). 043 freezes this as a
standing refusal; it changes nothing in the app.

## Handoff

- **053** (Integrations Command Center) builds the real delivery transport under CD-3/CD-4 (private, opt-in) —
  never a group channel (N-2).
- **056** (Forms audit) audits the certificate issue/approve field sets — sensitive fields stay omitted /
  structure-only.
- 043's contribution: the four permanent refusals (group delivery, named minor in group, minor-in-URL, fake
  delivery) as negative requirements every downstream owner inherits.

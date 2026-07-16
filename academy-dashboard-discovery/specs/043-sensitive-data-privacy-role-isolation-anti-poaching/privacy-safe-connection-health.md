# Privacy-Safe Connection-Health Contract — Spec 043

Owns C04-22 (WhatsApp families insights board) + the P-01/P-02/RJ-11/N-4 refusals. The legacy shipped two
"Names of Null groups" boards that leaked unmasked guardian/teacher phones, real e-mails, a username dump, and a
**live `chat.whatsapp.com` group-invite URL** (pixel-confirmed both frames; grounding in
`contracts/privacy-role-isolation-handoff-contract.md`). Spec 040 already excluded both pages. This contract
freezes what a connection-health view may EVER be — and rules that 043 builds no such view now.

## The refused legacy surface (never port — RJ-11 / N-4, marked NEVER)

- `management-settings-integrations-whatsapp-families-insights` — table columns `Family name · Phone number ·
  Group Name · Status`; pixel rows: `abdo ahmed / abod11@gmail.com / 01154859653 / Active`, a named child +
  `441200480244 / Active`.
- `management-settings-integrations-whatsapp-teachers-insights` — one row: `المعلم محمد صادق صادق / msadeqx9 /
  201278910727 / https://chat.whatsapp.com/HNeGQ2J7HDzJAHmLKyIcIK?... / Active`.
- **Conflict recorded (Agent A)**: the JSON row-count is 0 (rows render as `<h6>` cards, not `<td>`), so the
  real leak is worse than any `tables[].rows` count suggests. The raw pixels win; the refusal is unchanged.

## The decision (CH-DECISION)

**043 implements ONLY the privacy contract for a connection-health view. It does NOT build a standalone view or
route now.** Rationale: (a) the directive default is 0 new pages / counts unchanged; (b) the only legacy evidence
is a PII-leaking board that is a permanent refusal; (c) a real connection-health surface needs the integration
(053) to have any true data. Inventing a route now would be an ungrounded page (a STOP condition). Page/menu
counts stay **115/57/50/24-25-1**; `FUTURE_ROUTES` stays `{}`.

## The contract a future connection-health view MUST obey (CH-1 … CH-9)

IF a connection-health view is ever built (by 053, on an existing settings host, with real integration data),
it MUST:

| ID | Rule |
|---|---|
| **CH-1** | Be **admin-only** (matrix: PA/AA/ST allowed; TE/GF/CV/PU/RA = DENY). |
| **CH-2** | Show **counts + masked identifiers only** — e.g. "N families not connected", a masked suffix `…653` at most, never a full phone. |
| **CH-3** | Render **no full phone number**. |
| **CH-4** | Render **no e-mail**. |
| **CH-5** | Render **no live group invite URL** (the `chat.whatsapp.com/...` link is refused forever, N-4). |
| **CH-6** | Render **no username dump** (`msadeqx9`, etc.). |
| **CH-7** | Render **no minor record** (a named child in a connection table). |
| **CH-8** | Render **no provider secret** and **no copied legacy PII** (I-01 stays 0). |
| **CH-9** | Keep the integration BEHAVIOUR (pairing, sending, connection state) owned by **053**; 043 owns only the visibility contract above. |

## Masking rule (when a masked identifier is even allowed)

A masked identifier is permitted ONLY where the admin genuinely needs to *act* on a specific unconnected
account (CH-2 "actionable"). Default posture: **counts first**; a masked suffix appears only when the workflow
requires distinguishing rows, and never the full value. This resolves OQ-4 (safe default: counts first; masked
suffix only when actionable).

## Guards

- The real-PII census (broadened sitewide from the settings-only census, `protected-test-and-mutation-register.md`
  G7/G8) keeps `chat.whatsapp.com` + the crawl phone/e-mail tokens at 0 across all 115 pages.
- MUT-4 (insert a live WhatsApp invite URL into a fixture/page) → the sitewide census fails.
- No new page/route is added (count contract); if 053 ever adds a connection-health surface, it lands on an
  existing settings host under CH-1…CH-9 with its own declared count impact.

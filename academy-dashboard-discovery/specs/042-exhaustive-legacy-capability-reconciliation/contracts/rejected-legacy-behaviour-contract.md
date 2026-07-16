# Contract 10 — Rejected Legacy Behaviour: the NEGATIVE Requirements Source (BINDING on Specs 043–057)

**Canonical source (cite by path + RJ-nn; never restate):**
`../rejected-legacy-behaviour-register.md` — **52 rows, RJ-01…RJ-52** (REJECTED_PAY_FREE 10 · REJECTED_PRIVACY 12
· REJECTED_SECURITY 15 · REJECTED_NO_FAKE 15), each with exact evidence, the violated law, the current refusal
mechanism, the guard that keeps it out, and its re-proposal rule. Disposition law: `../plan.md` **D3** —
REJECTED_\* are **negative requirements, never backlog**.

## 1. The rule
1. Every future spec (043–057) MUST enumerate, in its own plan, the RJ rows touching its owned surfaces and
   **assert their ABSENCE post-change** (the register's Guard column names the mechanism per row: grep / smoke
   assert / census / gate contract).
2. **Zero re-proposals.** The specify-phase adversarial review (check 17, `../checklists/requirements.md`) proved
   **0 RJ re-proposals across the whole 042 corpus**; every future spec keeps that count at 0. A finding of a
   re-proposed RJ behaviour in any 043–057 artifact or diff = review failure.
3. Rows marked **NEVER** in the register may not be re-proposed by any spec, ever. All other rows re-open ONLY
   via the register's standing supersession rule (names the RJ id · cites new evidence · proves the guard still
   holds) — and per contract 13, with mutation proof for any guard change.
4. Never weaken a Guard-column assertion to make a feature fit (the `PAY28` word-boundary warning is the model:
   "improving" the regex to `/SAR/i` would match the persona "Sara").

## 2. Headline rows (named so no reviewer can miss them; the register is the authority)
- **RJ-27** — PayPal environment defaulting to **Live** (we default Sandbox; never default Live).
- **RJ-29** — the no-confirm real DB **backup** fired from a bare GET + fake success banner + silent SMTP redirect.
- **RJ-26** — **plaintext provider secrets** (15 `type=text` credential inputs, saved keys printed as columns);
  structure-only rows stand forever.
- **RJ-11** — the **WhatsApp insights PII tables + the LIVE `chat.whatsapp.com` invite URL** (see contract 6's
  pixel grounding; NEVER port names/phones/URLs).
- **RJ-39** — **computed `Percentage` / `Top Performer` ranking** and every vanity metric (rankings stay banned;
  052 owns privacy-safe recognition).
- **RJ-01 / RJ-02** — **teacher salary figures** (the teacher-home salary band; the 15-column wage tables;
  `classSalaryReport` stays the SOLE honest lock).
- **RJ-30** — the **shared OTP** destination phone for all admins.
- **RJ-10** — the **`hour_rate` / `currency` / `password` import columns** (exactly 33 safe columns ship).
- **RJ-13** — **crawl-operator PII** in the chrome (`eslammekky@gmail.com`, ui-avatars.com).
- **RJ-38** — **fake-success toasts / optimistic UI** (Approve firing `Swal.fire("Success!")` and deleting the
  row regardless of the server) — no success signal without a real server response, anywhere, ever.

## 3. Interpretation guards
- A REJECTED_\* row is never "missing functionality": ledgers and dashboards derived from 042 may not count RJ
  rows as gaps, debt, or TODO items.
- REJECTED_NO_FAKE ≠ permission to fake later behind a nicer UI; FUTURE_BACKEND execution paths (contract 8 §3.4)
  stay honestly gated until a real backend answers.
- Where an RJ row names a conditional re-proposal owner (e.g. RJ-19 admin-only attribution under 043, RJ-36
  route-allowlist shortcuts), ONLY that owner may open it, under §1.3.

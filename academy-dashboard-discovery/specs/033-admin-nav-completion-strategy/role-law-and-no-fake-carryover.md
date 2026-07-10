# Role-Law & No-Fake Carryover — Spec 033

Every follow-up spec (034–041) MUST preserve these standing laws (from Specs 009/016/021–032). Each new page, deep-link, board, or shell is bound by all of them. Enforcement anchor = the smoke/a11y assert or grep that proves it.

## No-fake / honesty laws
| Law | Rule | Enforcement anchor |
|---|---|---|
| No backend/API/auth/database | fixtures only; no network; localStorage = UI-state only (rail/nav-category/schedule-view/lang/theme) | smoke external-request=0; no entity localStorage |
| No fake persistence | no row added, no status/chip flipped after any Save/Confirm | smoke no-mutation snapshot (`run.cjs` chip before/after) |
| No fake save/create/edit/delete | forms/actions are INERT; final = gate/confirm that mutates nothing | smoke `fieldlessCreateEdit`/no-mutation; Spec-032 form-completion block |
| No fake upload/download/PDF | no `type=file`, no `.pdf"`/`blob:`/`createObjectURL`/`window.open`/`download=` | smoke `noFile`/`noPdf` greps |
| No fake payment / salary / payroll generation | display only; no money movement; no computed Total; Spec-009 amount literals only | finance `forbidden`/no-mutation/figure-free asserts |
| No fake permission mutation | RBAC display-only; no persisted `checked` | Spec-031 credInputs/RBAC assert |
| No fake integration connection | provider names OK; connect/test = gates; no credential input | Spec-031 no-secret assert |
| No fake notification delivery | no "sent"/«تم الإرسال»; send = gate | `FAKE` guard |
| No fake success wording | no `(demo)`/«بنجاح»/`successfully`/«إجراء تجريبي»/`preview action` | smoke `FAKE` regex over `[data-toast],[data-confirm-toast],[data-confirm-msg]` |
| Final action gated | every Save/Send/Submit/Confirm/Generate/Pay = `data-disabled-reason` (or `data-confirm` → backendRequired) | smoke gate asserts |
| **Frontend UI shows first** | nav item opens a real page/tab/surface; only the final action is gated (the Spec-033 nav rule) | admin-menu coverage (0 «قريبًا»/lock over a buildable surface) |

## Role laws
| Law | Rule | Enforcement anchor |
|---|---|---|
| Teacher pay-free (GLOBAL) | teacher portal ×16 + admin teacher boards carry no salary/rate/fine/payout figure or vocabulary | smoke `payHit`/`tchPay`/`PAY28` byte-verbatim |
| Family zero-pay | family portal + home + child carry no currency/pay figure | smoke `famPay`/`payFigure` byte-verbatim |
| Student child-view | student surfaces carry no primary-role wording («لوحة الطالب»/«بوابة الطالب») | smoke child-view assert |
| Finance no-fake-money | finance body: no chart/canvas/score, no receipt/file, no arithmetic/computed-Total; salaries/banks figure-free; amount literals only | finance `forbidden`/no-mutation/figure-free block |
| Settings no-fake-settings | no `type=password`/`type=file`/credential input, no `<canvas>`, figure-free; theme/lang stay real | Spec-031 settings block |
| Admin finance Spec-009 invariant | dashboard/reports body finance-free; six wallet nav items locked | smoke enHit/arHit/walletOk |

## Forbidden tokens (0 in any new surface)
`type="password"` · `type="file"` (real input; `data-type="file"` facet on library rows is exempt) · api-key/client-secret/webhook/token/OTP control · salary/hour-rate/fine/pay figure on protected surfaces · computed Total (`reduce`/`+=` on money) · `<canvas>`/draggable designer · `.pdf"`/`blob:`/`createObjectURL`/`window.open`/`download=` · `href="#"` · raw i18n key (`⟦`) · dead button.

## Quality bars (every follow-up spec)
AR/EN mirrored (0 locale divergence, 0 raw keys) · RTL/LTR correct · light/dark/system · mobile 390 no horizontal overflow · a11y critical=0 serious=0 (incl. open-form/interaction rows) · screenshots 0 console errors · `package.json` 0-diff (no new dependency) · no new hook/storage key/engine · smoke changes additive only; protected 009/021–032 asserts stay byte-verbatim.

## Deep-link / fold specific carryover
- A deep-link nav item is a real `<a href="page.html#view=tab">` (never a «قريبًا» button); the `#view=` hash must activate the tab on load (existing enhance.js machinery — no new hook).
- A fold-anchor nav item is a real `<a href="host.html">` to the list page that owns the drawer; the drawer stays reachable there; never a dead button.
- Flipping a nav item planned→implemented (deep-link/page) or unlocking a disabled item updates `nav.config.js` per its build-time guard (implemented ⇒ route; non-implemented ⇒ no route; disabled ⇒ reasonKey) and re-pins the Spec-010/029 nav smoke block + the admin-menu-50 assert — additively, protected asserts byte-verbatim.

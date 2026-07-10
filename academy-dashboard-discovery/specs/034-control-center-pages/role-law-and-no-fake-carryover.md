# Role-Law & No-Fake Carryover — Spec 034

The Control Center pages inherit all standing laws from Spec 033's carryover (Specs 009/016/021–032). Each of the 5 new pages is bound by every law below; enforcement anchor = the smoke/a11y assert or grep that proves it.

## No-fake / honesty (the load-bearing laws for 034)
| Law | Rule for the 5 Control pages | Enforcement |
|---|---|---|
| No fake message send/reply | messages compose/reply UI shows; **Send/Reply = backendRequired gate**; no message appended, no thread mutation, no "sent"/«تم الإرسال» | smoke `FAKE` guard + no-mutation snapshot on messages |
| No fake lead convert/assign | leads convert/assign/follow-up form shows; **Convert/Assign/Save = gate**; no row mutation, no fake CRM persistence | smoke `FAKE` + no-mutation on leads |
| No fake task create/move/assign | tasks create/edit form + board show; **Save/Assign/Move = gate**; no card added, no column move persisted, no status flip | smoke `FAKE` + no-mutation on tasks (board is display-only; DnD is NOT wired) |
| No fake announcement publish/send | announcements compose + preview show; **Publish/Send = gate**; no delivery, no "published"/«تم النشر» | smoke `FAKE` on announcements |
| No fake success wording | none of `(demo)`/«بنجاح»/`successfully`/«إجراء تجريبي»/`preview action`/«تم الإرسال»/«تم النشر» on any toast/confirm | smoke `FAKE` regex over `[data-toast],[data-confirm-toast],[data-confirm-msg]` |
| No backend/API/websocket | fixtures only; no network; no realtime; localStorage = UI-state only | smoke external-request=0 |
| Final action gated | every Send/Reply/Convert/Assign/Save/Move/Publish = `data-disabled-reason` (or `data-confirm` → backendRequired) | smoke gate asserts on the 5 pages |
| No `type=file` / upload | attachments (chat/announcements) shown as **gated affordances**, never an `<input type="file">` | smoke `noFile` DOM check |
| No `href="#"` / dead button / raw key | every anchor a real route; every button gives feedback; 0 `⟦` | smoke deadNav/raw-key/dead-button |

## timeConverter exception (the ONE fully-frontend page)
- `time-converter.html` is a **pure client tool** — it MAY compute locally with native `Date`/`Intl` APIs (timezone conversion is real, not gated). **No backendRequired gate on the conversion itself.**
- Still bound by: no external API, no new dependency, no `type=file`, no fake "unavailable" gate over a working tool, AR/EN mirrored, a11y 0/0.
- A "copy result" affordance MAY use the existing safe client-side copy pattern if one exists; otherwise it is a display-only output (no fake copy toast).

## Role laws (must stay green — none of these pages touch pay/role surfaces)
| Law | Rule | Enforcement |
|---|---|---|
| Teacher pay-free (GLOBAL) | no salary/rate/fine/payout figure or vocabulary on any Control page (leads/tasks may reference teachers by name only) | smoke `payHit`/`tchPay`/`PAY28` byte-verbatim |
| Family zero-pay | no currency/pay figure (leads may show a lead's requested course, never a price) | smoke `famPay`/`payFigure` byte-verbatim |
| Student child-view | no primary-role student wording | smoke child-view assert |
| Finance no-fake-money | no money figure/arithmetic on Control pages (they are non-finance) | finance `forbidden` unaffected |
| Admin finance Spec-009 invariant | Control pages carry no finance chrome | smoke enHit/arHit |

## Forbidden tokens (0 in the 5 new page bodies)
`type="password"` · `type="file"` · api-key/secret/webhook/token/OTP control · salary/hour-rate/fine/amount/price figure · computed Total · `<canvas>` · `.pdf"`/`blob:`/`createObjectURL`/`window.open`/`download=` · `href="#"` · raw i18n key (`⟦`) · fake-success wording.

## Quality bars
AR/EN mirrored (0 divergence, 0 raw keys) · RTL/LTR correct · light/dark/system · mobile 390 no horizontal overflow · a11y critical=0 serious=0 (incl. open-compose-form interaction rows) · screenshots 0 console errors · `package.json` 0-diff · no new hook/storage key/engine · smoke additive only; protected 009/021–032 + Spec-032 form-completion asserts byte-verbatim; the 5 nav flips re-pin the Spec-010/029 nav block + the admin-menu-50 assert additively.

# Contract 8 — Cross-Role Propagation Handoff (PRIMARY: Spec 055; binding on every producer/consumer owner)

**Canonical source (cite by path + P-ID; never restate the legs):**
`../cross-role-propagation-map.md` (§1 the legacy routing graph · §2 P-01…P-26 · §3 convergence points ·
§4 scoreboard · §5 NEVER-PROPAGATE N-1…N-7 · §6 UNKNOWN legs U-1…U-6 · §7 conflicts · §8 owner rollup ·
§9 the finding). Charter: `../plan.md` D5 (055 = Wave 3, after 045–050; 053/054 for channel-dependent legs).

## 1. The 26 lifecycles (by P-ID — full leg tables live ONLY in the map)
P-01 class outcome · P-02 homework · P-03 absence/cancel/reschedule · P-04 class edit + teacher REASSIGN ·
P-05 teacher request loop · P-06 family request loop · P-07 schedule/trial fan-out · P-08 trial→lead→family ·
P-09 certificate request→approve→deliver · P-10 monthly progress report · P-11 guardian feedback ·
P-12 parent-teacher meeting · P-13 shared library catalog · P-14 announcement→dashboards · P-15 notification
bus · P-16 family/student lifecycle states · P-17 public holiday fan-out · P-18 dual-timezone rendering ·
P-19 automation policy · P-20 per-recipient capabilities (authz) · P-21 RBAC→enforcement · P-22 classroom/meeting
rooms · P-23 DST warnings · P-24 teacher availability · P-25 invoice→family billing · P-26 family session files.

## 2. The scoreboard (frozen from map §4 — re-derive there, never here)
**26 mapped · all 26 with ≥1 broken/missing leg · 6 consumer-no-producer** (P-01, P-02, P-09, P-10, P-12, P-24) ·
**5 producer-no-consumer** (P-14, P-15, P-19, P-21, P-25) · **4 broken-both-ends** (P-05, P-06, P-07, P-12) ·
**11 field-less producers** feeding cross-role chains · **6 UNKNOWN legs** (§6 U-1…U-6) · **7 refused legs**
(§5 N-1…N-7). Convergence: the class record fuses seven streams; **the P-15 notification bus is the terminus of
twelve lifecycles and is entirely absent** — the single highest-leverage missing consumer (§3, §9).

## 3. Binding rules
1. **A creation surface ≠ a working feature.** No spec may claim a lifecycle capability "done" because one leg
   renders. Completion of a lifecycle = every leg OK/GATE with the gates honest, or the leg explicitly
   REJECTED_*/UNKNOWN_EVIDENCE with its owner.
2. **Every future producer or consumer implementation MUST name its lifecycle P-ID** in its spec/plan and, on
   landing, **update that leg's status** in its own spec's records (origin/transit/consumer, using the map's leg
   vocabulary: OK · GATE · BROKEN · MISSING · REJECTED_* · UNKNOWN_EVIDENCE). A surface that belongs to no P-ID
   and creates cross-role data is a new lifecycle and must be registered with 055 before it merges.
3. **UNKNOWN legs are never reconstructed from their results** (U-1 teacher accept/decline surface · U-2 monthly
   plan approver · U-3 notification inbox schema · U-4 announcement renderer · U-5 lead→family conversion form ·
   U-6 recording/state machine). Designing one fresh is allowed by its owner; it is then recorded as DESIGNED,
   not restored (contract 11 governs resolution).
4. **Honest gates hold until a real backend**: delivery, credit ledgers, make-up generation, fan-outs and the
   bus are FUTURE_BACKEND — faking any of them is an RJ-38 violation (contract 10).
5. The **family amount-free billing consumer (P-25) is a LAW, not a defect** — "completing" it with amounts
   requires an explicit law amendment via 043, never a propagation fix.

## 4. The NEVER-PROPAGATE register (§5 — binding refusals; see contract 10 for the RJ mirrors)
| # | Never propagates | Verdict / owner |
|---|---|---|
| N-1 | Teacher pay across the graph (the routing row may exist; the FIGURE never) | REJECTED_PAY_FREE — never |
| N-2 | A named child's certificate into a shared WhatsApp group | REJECTED_PRIVACY — 043 rule · 053 mechanics (private, per-guardian, opt-in) |
| N-3 | Certificate preview URL carrying a minor's data in a query string | REJECTED_PRIVACY — 043 |
| N-4 | WhatsApp null-group insights (real names, unmasked phones, live invite URL) | REJECTED_PRIVACY — 043 (masked, count-only if it survives) |
| N-5 | A staff-performance table rendered to the TEACHER role | REJECTED_PRIVACY — 043 |
| N-6 | The legacy chat transport (`ws://` MQTT, guessable topics, no ACL) | REJECTED_SECURITY — 043 + 054 design their own |
| N-7 | Broadcasting a named child's schedule to a whole teacher category | REJECTED_PRIVACY pending 043 — 043 rules BEFORE 056 builds P-07 |

## 5. Ownership pointers (§8 rollup — POINTERS ONLY; the map's §8 table is the assignment of record)
**055** (primary): the notify/credit/make-up/calendar fan-outs, both request→inbox→answer loops, the P-07 loop,
the P-08 hop, P-09 status-back, P-10 approve→deliver, the P-12 meeting producer, the P-13 ONE shared catalog,
the P-14 consumer band, **the P-15 bus**, P-16/P-17 state fan-outs, the P-18 dual-clock contract, P-19, P-23,
P-24, the audit timeline. **054**: P-22 in full (hold the join GATE until a real room). **053**: every delivery
channel. **043**: P-20 authz, P-21 deny-by-default, N-2…N-7, child-report readership, minors' voice/video (P-26),
presence monitoring, the DST aggregate. **044**: detail escalation, confirm-with-fields, the long-form hosts.
**056**: the eleven field-less producers' field sets. **045–050**: the teacher-portal tiles (§7.5), the shelves'
search/filter, the DST board, the monitor's filters. **051/052**: chat + privacy-safe recognition (never a
ranking). **057**: freeze the §5 refusals and §6 unknowns as recorded decisions.

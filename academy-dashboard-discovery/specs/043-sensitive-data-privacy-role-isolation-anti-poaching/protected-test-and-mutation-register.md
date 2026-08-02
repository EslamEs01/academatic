# Protected-Test & Mutation Register — Spec 043

Specifies the tests that PROVE 043's guarantees, maps each to the existing protected suite (Agent E, exact line
numbers), and pairs every new guarantee with a falsifying mutation run on an isolated copy. **The current
`/speckit.specify` phase modifies no test file.** **CORRECTION (2026-07-17): the foundation guards + their
mutations (child-view supersession, parent-contact registry guards, and the global privacy absence guards
G1–G14) are OWNED, IMPLEMENTED and EXECUTED by Spec 043's own `/speckit.implement` phase — NOT by later specs.**
They are green before any dependent spec (045–056) begins Gate-3 integration. Downstream specs ADD page-local
coverage for their own new/changed surfaces only; they may never become the primary owner of a 043 foundation
test, and may never weaken or replace one. The classifications (additive / strengthening / declared supersession)
and the ≥10 mutations are Spec 043's own plan/tasks/implement deliverable
(`contracts/protected-test-carryover-contract.md`).

## 1. Inherited protected gates — MUST stay green, byte-verbatim unless a declared supersession

Quoted verbatim from disk (Agent E), never to be weakened:

- **PAY28** teacher pay-free regex — `smoke:748` (reused 771/804/821/2715/2736). Word-boundaried by design
  (`/SAR/i` would match "Sara"). **Never "improve" it.**
- **tchPay / payHit** teacher-portal pay — `smoke:2018-2019, 2098-2100`.
- **famPay / payFigure** family zero-pay — `smoke:1987-1988, 2053-2054, 2077-2078`.
- **child-view guard** — `smoke:1976-1977` (`!/لوحة الطالب|بوابة الطالب|student dashboard/i`).
- **role isolation (M-8)** — `smoke:1939` (`!prt.adminMarkup`).
- **ROUTES_50** — `smoke:2608-2652`.
- **no-external-request** — `smoke:176` (+9 sites).
- **no-secret (g32)** — `smoke:1404-1413` (`pw===0 && file===0 && canvas===0`, unconditional on all 114 loads).
- **planned===0 / coming-soon** — `smoke:260-264, 1602`.
- **orphan-set** — `smoke:2743, 2752-2754`.
- **honest lock** — `smoke:2426` (+ source check 2838).
- **real-PII census (settings-scoped today)** — `smoke:1287, 1312`.
- **D-1 direct-surface** — `smoke:2695-2740`.
- **R-2** a11y hard gate — `a11y/run.cjs:393` (`if (critical > 0 || serious > 0)` → exit 1). **Never relaxed.**
- **R-3** console-error hard gate — `capture.cjs:556` (`if (withErrors > 0)` → exit 1). **Never relaxed.**

## 2. The 043 guarantee → guard mapping (additive unless noted)

| Guarantee | Existing coverage | Classification + insertion point |
|---|---|---|
| **G1** teacher pages contain no guardian/student contact VALUE | PARTIAL (PAY28 = pay only; g32 = inputs only) | **Additive** phone/e-mail-pattern census scoped to TEACHER_INTERNAL + teacher-portal, sibling to `smoke:2018/2098` |
| **G2** teacher fixtures contain no guardian phone/e-mail/address/country | NEW (no fixture-content census exists) | **Additive** SOURCE audit of `fixtures/teachers.js`/`teacher-management.js` (mirrors the nav.config source audit at `smoke:2608/2837`) |
| **G3** teacher cannot receive parent-contact permissions | NEW, no substrate (`grep PERM_GROUPS tests/` = 0) | **Additive** — 043 defines the parent-contact registry (PC-1/PC-2) first, then an assert pins teacher-unreachability (mirrors ROUTES_50 closed-register at `smoke:2608`) |
| **G4** family surfaces contain only the active authored family (fam1) | NEW (fam1-only by construction, unasserted) | **Additive** census on FAMILY_INTERNAL banning any other-family literal |
| **G5** child-view has no password/account affordance | **EXISTS, OPPOSITE POLARITY** | **DECLARED SUPERSESSION** at `smoke:1971` (`plannedBackend===3`→`2`) + `smoke:2082` (`'student-profile':3`→`2`). Family (`:2007`/`:2083`) + teacher (`:2020`/`:2084`) profiles UNTOUCHED. See `child-view-account-boundary.md`. |
| **G6** portal pages contain no admin links | PARTIAL (M-8 = CSS-markup only) | **Additive** no-admin-link href census for every portal page except `portals`, sibling to `smoke:1939`; allowlist `portals→dashboard` + exempt board |
| **G7** no real legacy PII token in src/public | PARTIAL (settings-scoped, `smoke:1287`) | **Strengthening** — broaden the identical regex to a sitewide per-page census |
| **G8** no live WhatsApp invite URL | COVERED (settings only, same regex includes `chat.whatsapp.com`) | **Strengthening** — same broadening as G7 |
| **G9** no external host | EXISTS, STRONG (`smoke:176` ×9) | no new assert |
| **G10** no credential value slot / type=password / raw PAN | EXISTS, STRONG (g32 sitewide) | **Additive** (optional) PAN-digit-pattern census; password/file already covered |
| **G11** permission privacy rows deny-by-default | NEW, no substrate (same as G3) | **Additive** — new fixture rows (PC-1/PC-2 `granted:false`) + assert |
| **G12** no certificate group delivery | NOT COVERED | **Additive** certificates.html Send/deliver census (no group option, no recipient picker) |
| **G13** no minor data in query strings | CONFIRMED ABSENT, net-new | **Additive** href query-string census banning `student_name=`/minor-identifying params |
| **G14** honest backend wording never claims auth enforced | NOT COVERED | **Additive** copy-content census banning `authorized`/`verified`/`محمي`/`مسجّل الدخول` outside the honest backendRequired vocabulary |

**No protected assert is weakened.** The ONLY meaning-change is G5's declared supersession (two lines,
student-profile only), fully specified with its six fields in `child-view-account-boundary.md`.

## 3. The ≥10 falsifying mutations (each on a fresh isolated copy; restored to residue 0)

The directive's 10 mandated mutations, each named to the guarantee it falsifies:

| MUT | Mutation (on an isolated copy) | Falsifies | Expected result |
|---|---|---|---|
| **MUT-1** | Add a guardian phone value to a teacher fixture / teacher page body | G1 | teacher-contact census → RED |
| **MUT-2** | Grant parent-phone visibility to a teacher role (PC-1 on a teacher grant set) | G3 / AP-8 | teacher-unreachable assert → RED |
| **MUT-3** | Re-add the child password gate (`passwordChange` to `STUDENT_PAGES.profile.gates`) | G5 | `student-profile: plannedBackend===2` → RED |
| **MUT-4** | Insert a live `chat.whatsapp.com/...` invite URL into a fixture/page | G8 / RJ-11 | sitewide real-PII census → RED |
| **MUT-5** | Add a credential input / `type=password` / value slot | G10 / SR-4 | g32 (`pw===0`) → RED |
| **MUT-6** | Make a privacy grant default true (PC-1 `granted:true`) | G11 / RJ-37 | deny-by-default assert → RED |
| **MUT-7** | Restore certificate group delivery (`<option value="group">`) | G12 / CD-1 | cert-delivery census → RED |
| **MUT-8** | Add another family's data (`أم جوري`) to a family portal page | G4 / DF-4 | family-isolation census → RED |
| **MUT-9** | Add an admin route (`dashboard.html`) to a portal page | G6 / DF-1 | no-admin-link census → RED |
| **MUT-10** | Change honest backend wording into a fake authorization claim ("authorized"/"signed in") | G14 / no-fake | wording census → RED |

**The T061/G-1 law**: a test that cannot fail is not a test. Each guarantee ships with its mutation; the
mutation is executed one-per-fresh-isolated-copy, never on the primary tree, and restored to residue 0. A
guarantee whose mutation passes the suite is invalid (the Spec-041 M-2 lesson).

## 4. Ownership of the guards (corrected 2026-07-17)

- The current `/speckit.specify` phase modifies no test file and weakens no protected assert; it pins the exact
  insertion points.
- **Spec 043's OWN implement phase owns and executes** (Wave 0, before any dependent spec's Gate 3): the G5
  declared supersession (child-view, student-profile only) with **MUT-3**; the parent-contact registry guards
  **G3 + G11** with **MUT-2 + MUT-6**; the global privacy absence guards **G1–G14** with their mutations; the
  teacher-capability policy census (FR-008a) with its mutation. Every one is green before downstream integration.
- **Downstream specs (045–056) ADD page-local coverage only** for surfaces they newly introduce/change. A
  downstream spec may NOT: become the primary implementation owner of a 043 foundation guard; weaken, rescope,
  loosen, skip, or `catch()`-swallow a 043 test; or replace a 043 guard with a weaker one. Where a downstream
  spec does not exercise a 043 capability it supplies an explicit non-applicability proof — it never silently
  drops the guard.
- No 043 guard's implementation is deferred to a spec whose own Gate 3 depends on that guard (the circular
  defect this correction removes).

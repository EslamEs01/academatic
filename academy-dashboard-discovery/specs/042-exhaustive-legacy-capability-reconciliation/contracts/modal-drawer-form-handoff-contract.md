# Contract 7 — Modal / Drawer / Form Handoff to Specs 044 + 056 (BINDING)

**Canonical sources (cite by path + stable ID; never restate):**
`../modal-drawer-interaction-ledger.md` (Part A dup-ids · Part B silent test failures · Part C focus/close/
scroll/mobile · Part D long-form-in-sheet · Part E legacy-modal gaps · Part F preserve list) ·
`../forms-completeness-ledger.md` (§0 executive counts · §1 outcome chain · §6 field-less gates · §7 law-driven
omissions · §8 validation gap) · `../protected-test-carryover.md` §5 (counting basis) · `../plan.md` **D10** and
**D5(b)** (ownership-vs-execution split).

**Grounding (reopened AS IMAGES for this contract):**
`output/roles/admin/screenshots/management-families-create-full.png` (the C04 long-form family contract page,
path from `../cluster-evidence-paths/C04-paths.md`) — SEEN: a four-section long form (Main information · Location
information · Payment information · Courses information + Notes) with red required asterisks throughout,
multi-value email/phone inputs, a real `Password` input + "Send data to family" toggle, `Hour Rate`/`Total Hours`/
`Automatic Fees %`/`Currency (Euro €)` money fields, a WhatsApp Group name field, and a Payment Methods select
whose visible value is a person's name («احمد محمد», RJ-43). This grounds two rules below: legacy long forms are
SECTIONED with explicit required markers, and rejected fields sit interleaved with safe ones — so omission is a
field-level law, never a form-level excuse.

## 1. The 30 duplicate `f-fbAdd-*` ids → Spec 044 (Part A; carryover §5)
- Pre-existing at baseline `21502af` (born with Spec-032 FC-25), NOT introduced by 041/042. Owner **044 only**.
- **Counting basis (both true, no contradiction):** 30 = 3 duplicated id NAMES × 10 page files
  (attendance/course/group/sessions/teacher ×2 langs); per-file OCCURRENCE counts differ (attendance 5 ·
  sessions 3 · course/group/teacher 2 — Part A.2). Cite whichever basis you use, by name.
- The fix (hoist `fb-add` once per page, or suffix per host row) must keep the FC-25 guarantee (3 inert fields +
  one backendRequired Save), must not regress `nestedFbAdd>=1` (`smoke/run.cjs:1378`), and ships with a
  falsifying mutation (contract 13). `teachers.html`/`.en` stay at 0 duplicate ids (Spec 041 D-1/M-14).

## 2. Missing-selector silent test passes are FORBIDDEN (Part B)
A drawer a test claims to open must FAIL the test if absent. The proven instance: `capture.cjs:251` `st-perm`
resolves to zero static triggers, `.catch(()=>{})` swallows it, and the "RBAC open" frame is md5-identical to the
closed frame (`124561b3…`) — the RBAC matrix has never been rendered in any artifact (B.1). 044 migrates the row
to the working kebab-driver AND makes selector-resolution a hard failure in both runners. The 133 never-opened
template ids (B.3, incl. the 57 named drawers) are an interaction-coverage debt 044 owns scheduling for.

## 3. Form completeness rules (forms ledger §0: 48 legacy forms audited · 26 PARTIAL + 13 MISSING = 39
incomplete · 9 field-less gates)
- **No decorative subset may stand in for an evidenced long form.** Every evidenced-SAFE field ships;
  sensitive/pay/secret fields stay omitted or structure-only per the 11 law-driven omission families (§7) —
  field-level, per the grounding above. The Spec-032 `fieldlessCreateEdit===0` audit provably missed the
  toast/confirm/gate finals (map §7.3): the §6 nine field-less gates and the §1 chain are the debt.
- **Required/optional/conditional is explicit** on every shipped form (the legacy marks required; we currently
  don't — §8).
- **Validation, dependencies, help text, confirmation and error states are specified per form** — the ledger's
  "~0 validation" systemic gap (§8) is 044-system work (patterns) + 056-census work (per-field).
- The three most serious findings (§0) set priority: the outcome/monthly-report/parent-meeting capture chain (§1),
  the four 0-field finance workflows (§5), the three highest-control conditional forms with no host (§6 —
  scheduled-action 18 · request-schedule ~52 · public-holiday 11; 044 owes the conditional long-form pattern).
- Persistence stays FUTURE_BACKEND: fields are inert + exactly one backendRequired final (Part F; contract 10
  RJ-38 forbids fake success).

## 4. Overlay behaviour test obligations (Part C/D — every 044 deliverable ships these as gates)
Focus-trap on ALL dialog types (confirm + note modals currently trap nothing, C.1) · Esc + backdrop close +
return-focus · background scroll-lock/inert (C.2) · mobile fit incl. the clipped admin drawer (C.3) · RTL
mirroring · sticky action footer for long forms (Part D / visual X-5) · per-row drawer identity (Part E′ —
`mat-edit`×6, `cert-tpl`×4; the `cr-*` drawers are the correct pattern) · confirm-with-fields for
suspend/stop/cancel (Part D′) · hash-addressability ruled per surface without regressing the tab engine (C.4).

## 5. The D5(b) split: 056 = final field-level census AFTER page implementations
056 owns the 82 field-set allocation rows as the **accountable auditor**; the safe field sets for a page group's
owned surfaces are **delivered inside that group's review** (guided by the forms ledger + the 044 host system),
then **verified by 056's final census** (after 045–050 and 055). 056 is not a mid-graph bottleneck and never a
pretext for a page group to ship a decorative subset "pending 056".

## 6. Preserve (Part F — do not "fix")
The single `openPanel` engine (trap/Esc/return-focus) · `formDrawer` inert-fields+one-gated-Save · settings'
deliberate 0 confirms (Spec 040) · the mobile-clone id/aria stripping · the `cr-*` per-row and kebab-driver
patterns.

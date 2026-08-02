# Contract 5 — Global Privacy Guards G1–G14 (outcome D + E freeze) — executable

Every guard's exact test file · insertion point (re-grounded current lines, zero drift) · scope · forbidden
tokens · false-positive exclusions · neighbouring protected asserts · classification (additive / strengthening /
the ONE declared supersession) · falsifying mutation · expected RED. All in `tests/smoke/run.cjs` unless noted.

| G | Guarantee | File · insertion sibling | Scope | Forbidden tokens / expected set | False-positive exclusions | Class | Mutation · expected RED |
|---|---|---|---|---|---|---|---|
| **G1** | teacher pages contain no guardian/student contact VALUE | smoke · sibling to `tchPay` `:2018-2019` / teacher-portal `payHit` `:2096-2100` | rendered `teacher-*.html` + admin `teacher.html` bodies (TEACHER_INTERNAL ∪ teacher) | phone/e-mail regex (e.g. `\b\d{10,}\b`, `@`), guardian-contact tokens = 0 | the teacher's OWN synthetic e-mail on `teacher-profile` (`sara@academy.example`) is the teacher's own, not a guardian's — scope the census to guardian/student-contact context, exclude the own-profile self-contact row | additive | MUT-1: add a guardian phone to a teacher fixture/body → RED |
| **G2** | teacher fixtures contain no guardian phone/e-mail/address/country | smoke SOURCE audit · mirror `nav.config` source audit `:2607` / `:2837-2838` | `import` of `fixtures/teachers.js` + `teacher-management.js` module text | `country`/`locality`/`phone`/`email`/`address` field on a teacher-roster fixture row = 0 | subject/level/course learning fields allowed | additive | MUT-1 (shared) → RED |
| **G3** | teacher cannot receive parent-contact permissions | smoke closed-register · mirror `ROUTES_50` `:2606-2652` | source: `PERM_GROUPS` parents group + teacher-facing files | no teacher-facing file references `adm.staff.perm.g.parents`/`i.viewPhone`…; parents group not on any teacher body | staff.html rendering the group is correct (admin) | additive | MUT-2: parent-contact grant reachable by a teacher → RED |
| **G4** | family surfaces contain only the active authored family (fam1) | smoke · sibling to FAMILY_INTERNAL block `:1983-2008` | rendered `family-*` bodies | any non-fam1 guardian name (`أم جوري` fam2 … fam8) = 0 on guardian-facing pages | admin `families.html` may show all 8 (not a portal) | additive | MUT-8: add `أم جوري` to a family portal page → RED |
| **G5** | child-view has no password/account affordance | smoke `:1971` + `:2082` | `student-profile` body (plannedBackend count) | `plannedBackend === 2` (was 3) | family/teacher profile stay 3 (neighbours byte-verbatim) | **declared supersession** (Contract 6) | MUT-3: re-add child password gate → RED |
| **G6** | portal pages contain no admin links (except allowlist) | smoke · sibling to `adminMarkup` `:1939` | rendered portal `a[href]` | 0 href to any admin base (dashboard/staff/finance/… 57 bases) | allowlist: `portals.html→dashboard.html`; `teacher-performance.html` is the sanctioned exempt board (not a portal page) | additive | MUT-9: add `dashboard.html` link to a portal page → RED |
| **G7** | no real legacy PII token in src/public | smoke · **broaden** the settings-scoped realPii regex `:1287` sitewide | all built pages | `01015264856│أحمد محمد│chat.whatsapp.com│201508604112│afaaqonline1│01154859653│441200480244│201278910727│eslammekky│ui-avatars│abod11│msadeqx9│aboda155502│alaashapan1996` = 0 | w3.org SVG namespace is not PII | **strengthening** | MUT-4 (shared) → RED |
| **G8** | no live WhatsApp invite URL | smoke · same broadening as G7 (`chat\.whatsapp\.com`) | all built pages | `chat.whatsapp.com` = 0 | — | **strengthening** | MUT-4: insert a live invite URL → RED |
| **G9** | no external host | smoke `:176` (+9 sites) already strong | all pages | `ext.length === 0` | `www.w3.org` SVG ns allowed | (existing, no new assert) | (existing external-request mutation) |
| **G10** | no credential value slot / type=password / raw PAN | smoke g32 `:1404-1413` already strong (sitewide) | all pages | `pw===0 && file===0 && canvas===0` | `data-type="file"` book facet is not an input | (existing; optional additive PAN-digit census) | MUT-5: add a `type=password` input → RED |
| **G11** | privacy permission rows deny-by-default | smoke source census (paired with G3) | `PERM_GROUPS` parents group | all 5 items `granted:false` | — | additive | MUT-6: flip one to `granted:true` → RED |
| **G12** | no certificate group delivery | smoke · sibling to certificates block `:1237-1240` | `certificates.html` body | no `Send group`/group-channel option; no recipient picker | the honest gate is allowed | additive | MUT-7: restore a group-delivery option → RED |
| **G13** | no minor identity in query strings | smoke new standalone census | all built page `a[href]` | 0 `student_name=`/minor-identifying query param | in-page `#view=`/`#child=` hashes allowed | additive | **MUT-11**: add a `?student_name=…` href → RED |
| **G14** | honest backend wording never claims auth enforced | smoke · sibling to `fakeSuccess` `:1281` or new sitewide | gate/authz **context only** (`data-disabled-reason`/gate copy + success-toast copy), NOT arbitrary body text | 0 `authorized│verified│محمي│مسجّل الدخول` claiming a real enforced session, in gate/authz context | **the `backendRequired` honest vocabulary; the staff-activity-log VALUE `login:'signed in'` (`en.adm.js`, rendered in `staff.html`'s activity drawer) — a past-tense audit-log entry, NOT an authz claim; "Login" as an activity category. G14 must NOT be a naive sitewide `signed in`/`logged in` body ban (it would RED the baseline staff activity log)** | additive | MUT-10: change a gate's honest wording → a fake authorization claim → RED |

## The Class-(2) existing-safe freeze (outcome E)

"Already safe" ≠ "no implementation." The 12 Class-(2) rows are frozen by the guards above + these census
assertions (each with its mutation): teacher contact/locality/Left-Acquired absence (G1/G2), portal→admin
absence (G6), WhatsApp-URL/real-PII absence (G7/G8), honest RBAC wording (G14), no fake impersonation (no-fake),
DST no-affected-accounts column (a `time-converter.html` census: 4-column table, no "Affected Accounts"), no
invented login UI (no `<form action` login on any body), no cert group delivery (G12), no PII/minor in URLs
(G13). Each freeze assertion is additive; each ships a mutation.

## Protected asserts NOT weakened (verified present, current lines)

PAY28 `:748` · tchPay/payHit `:2018-2019/:2096-2100` · famPay/payFigure `:1987-1988/:2053-2054/:2077-2078` ·
child-view guard `:1976-1977` · adminMarkup(M-8) `:1939` · ROUTES_50 `:2608-2652` · no-external `:176` ·
g32 `:1404-1413` · planned===0 `:263-264/:1602` · orphan-set `:2752-2754` · honest-lock `:2426/:2838` ·
D-1 `:2695-2740` · R-2 `a11y:393` · R-3 `capture:555`. None relaxed/thresholded/allow-listed/`catch()`-swallowed.
A required selector must FAIL loudly (no silent `.catch(()=>{})`).

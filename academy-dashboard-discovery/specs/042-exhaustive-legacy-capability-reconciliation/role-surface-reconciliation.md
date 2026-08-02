# Spec 042 — Role Surface Reconciliation

**Evidence**: `output/combined/role-permission-matrix.md` · `output/roles/{admin,teacher,family}/role-map.json` ·
`output/combined/shared-unique-pages.md` · current `src/js/nav.config.js` + `src/js/fixtures/portal.js`
**Baseline**: HEAD `de8d552`

---

## 1. The role model — settled, and re-confirmed here

The legacy system has **THREE logins**: **admin**, **teacher**, **family/guardian**.

> **There is NO student login.** `output/roles/` contains exactly `admin/`, `teacher/`, `family/` — no `student/`
> directory exists. This independently re-confirms Spec 021's finding (DEC-001) from the raw crawl root, not from
> a summary.

Consequently our **student pages are a CHILD-VIEW owned by the family**, not an independent role app. That is a
**deliberate, evidence-backed divergence** and must never be "fixed" into a student login.

| Role | Legacy pages crawled | Our surfaces |
|---|---|---|
| **admin** | **300** | 64 admin HTML (32 bases × 2 langs) |
| **teacher** | **26** | teacher portal ×8 bases |
| **family** | **13** | family portal ×8 bases (+ `family-child` drill-down) |
| **student** | **— (does not exist)** | 7 child-view bases, reached **through the family**, framed «عرض الابن» |

## 2. Legacy role × module presence (raw evidence)

From `role-permission-matrix.md`. `—` = the role has **no** crawled page in that module.

| Module | admin | family | teacher |
|---|---|---|---|
| Dashboard / Home | yes (29p) | yes (3p) | yes (4p) |
| Students | yes (26p) | yes (8p) | yes (5p) |
| **Teachers** | yes (94p) | **—** | yes (15p) |
| **Parents / Guardians / Families** | yes (31p) | **—** | **—** |
| Courses | yes (22p) | yes (1p) | yes (3p) |
| Classes / Live Sessions | yes (10p) | yes (2p) | yes (5p) |
| Timetable / Schedule | yes (6p) | yes (1p) | yes (1p) |
| Assignments / Homework | yes (1p) | — | yes (1p) |
| Exams / Quizzes | yes (2p) | — | — |
| Certificates | yes (3p) | — | — |
| **Payments / Invoices** | yes (51p) | **yes (2p)** | — |
| **Wallet / Finance** | yes (16p) | — | **yes (3p)** |
| Reports / Analytics | yes (16p) | — | yes (1p) |
| Messages / Notifications | yes (4p) | — | yes (1p) |
| Content / Materials / Library | yes (4p) | yes (1p) | yes (1p) |
| **Settings** | yes (27p) | — | — |
| **Roles / Permissions** | yes (2p) | — | — |
| Profile / Account | yes (5p) | yes (1p) | yes (1p) |
| General / Unknown | yes (12p) | yes (2p) | yes (5p) |

### What this matrix proves

1. **The legacy already isolates families from teachers.** Family has **no** Teachers module. Our anti-poaching
   posture is therefore *not* a restriction we invented — it matches the legacy's own boundary, and we harden it.
2. **`Attendance` has no module tag at all** in the legacy (folded into Classes/Live Sessions). Our dedicated
   `attendance.html` is an **addition**, not a port.
3. **Two boundaries we deliberately REFUSE to reproduce** — see §3.

## 3. The two deliberate role divergences (both are REJECTIONS, both are correct)

### 3.1 Teacher → Wallet / Finance — `REJECTED_PAY_FREE`

**The legacy gives the teacher role 3 Wallet/Finance pages.** That is the teacher's own salary/earnings surface.

Our **teacher pay-free GLOBAL** law forbids every salary, rate, hour-rate, fine, payout and currency figure on
every teacher surface — copy *and* comments — enforced across three layers (source grep, built output, and the
`PAY28` smoke assert), with `teacher-performance.html` as the single sanctioned **admin-only** exempt board.

- **Disposition**: `REJECTED_PAY_FREE`
- **Why**: a salary figure rendered from fixtures is a **fake pay figure**. There is no payroll backend; showing a
  teacher a number they might act on is worse than showing nothing. The legacy additionally computes salary from a
  percentage of class price (`rate_student_absent`) — arithmetic we refuse to fabricate.
- **Owner if ever revived**: a real payroll/accounting backend spec. **Not 045–050.** Until then this stays
  refused, and `classSalaryReport` remains the sole honest lock naming the reason.

### 3.2 Family → Payments / Invoices — `INTENTIONALLY_IMPROVED` (zero-pay portal)

**The legacy gives the family role 2 Payments/Invoices pages** with real amounts.

Our family portal is **zero-pay**: `family-billing` is **status-first** — hour-quota (40/12/28) and **amount-free**
invoice rows — verified by a dedicated `payFigure` regex across all 18 family bodies.

- **Disposition**: `INTENTIONALLY_IMPROVED` (with `REJECTED_NO_FAKE` on the payment action itself)
- **Why**: we have no payment gateway. A family portal that displays a payable amount and a "Pay" button that does
  nothing is a lie with financial consequences. Status + quota is honest and still useful.
- **Preserve**: this must **not** be regressed toward legacy parity by any redesign spec.
- **Owner for a real payment flow**: **053** (Integrations) + a billing backend. Never a frontend spec.

## 4. Admin-only modules — correctly admin-only in our product

`Parents/Guardians/Families` · `Settings` · `Roles/Permissions` · `Certificates` · `Exams/Quizzes` are **admin-only
in the legacy**, and are admin-only in ours. **No teacher or family route reaches them** — enforced by the Spec-041
role-isolation assert (mutation **M-8**: injecting an admin destination into `ROLE_NAV.teacher` turns the suite
RED, 64 assertions).

> **"Hiding a link is not authorization."** These are static pages with fixture data and no auth layer, so the
> honest claim is: **no role's navigation exposes them, and no cross-role link exists**. Real server-side
> authorization is owned by **Spec 043**, and this is stated plainly rather than implied.

## 5. Current role surfaces (from source)

| Role | Nav items | Bases |
|---|---|---|
| **admin** | **50** (6 categories; 24 deep-links / 25 plain / 1 lock) | 32 |
| **teacher** | 8 | `teacher-portal`, `-schedule`, `-students`, `-outcomes`, `-tasks`, `-reports`, `-library`, `-profile` |
| **family** | 8 | `family-portal`, `-children`, `-schedule`, `-progress`, `-billing`, `-requests`, `-materials`, `-profile` |
| **child-view** | (reached via family) | `student-portal`, `-schedule`, `-homework`, `-materials`, `-progress`, `-history`, `-profile` |

**Coverage vs legacy**: teacher 8 surfaces vs 26 legacy pages · family 8 vs 13 · admin 32 bases vs 300 legacy
pages. **These ratios are not gaps by themselves** — the legacy's page count is inflated by per-entity detail
routes and modal-as-page patterns. The capability ledger, not the page count, decides what is missing.

## 6. Sensitive-data / anti-poaching posture (→ Spec 043)

The legacy corpus contains **real PII** (real names, phone numbers, emails, and a live `chat.whatsapp.com` invite
URL). **None of it is ported.** Our fixtures are authored.

Open questions this audit hands to **043**:

1. Which family/student **contact fields** does a teacher surface actually need? (The legacy teacher role has
   Students access — 5 pages. Does any expose a guardian phone/email?)
2. Does any of our surfaces render a contact detail a teacher should not hold (anti-poaching)?
3. Cross-family isolation: can any family surface reference another family's child?
4. Real authorization — the whole of it. Static pages cannot enforce it; **043 owns it**.

**Nothing above is normalized as acceptable.** Each is a finding with an owner.

## 7. Quality gate

- Every legacy role appears: **admin · teacher · family** ✅ (student correctly absent, with evidence)
- Every current role surface appears: admin 50 nav / teacher 8 / family 8 / child-view 7 ✅
- Every role divergence is **explicitly dispositioned**, not silently inherited ✅
- No permission is broadened because the legacy exposed it ✅

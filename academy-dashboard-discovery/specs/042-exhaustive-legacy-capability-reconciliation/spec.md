# Spec 042 — Exhaustive Legacy Capability & Page Reconciliation

**Status**: SPECIFY (documentation-only) · **Baseline**: HEAD **`de8d552`** (Spec 041 · committed) · tree clean
**Type**: **AUDIT / RECONCILIATION.** Not a redesign. Not an implementation. **Zero application bytes change.**

---

## 1. Why this spec exists

Specs 001–041 built the product **forward** — page by page, module by module, each spec grounded in the slice of
legacy evidence it happened to need. Spec 023 audited coverage once, at Spec 022. Since then the product has
grown by **eighteen specs** (024–041), and the legacy corpus has never been reconciled against the *finished*
product **as a whole**.

That leaves three questions nobody can currently answer with evidence:

1. **What did the legacy system do that we still cannot do?** Not "which page is missing" — *which capability*.
2. **What do we do that the legacy did badly, and must never regress back toward?**
3. **Who owns every remaining gap?** A gap with no owner is a gap that ships.

Spec 042 answers all three, from **raw evidence**, at **capability level**, with **exactly one owner per gap**.

### The lesson that shaped this spec

Spec 041 shipped a task (`T061`) marked complete with the claim *"Done: 50/50 match"* — for a test block that had
**never been written**. It survived review. It was caught only by *executing* a mutation (M-2), which passed the
entire suite with **exit 0**, proving the 25 plain routes were pinned nowhere (gap **G-1**).

> **A claim is not evidence. A summary is not a source. A page that exists is not a capability that works.**

Spec 042 therefore refuses to trust: planning summaries, prior spec reports, filenames, route existence, or its
own earlier conclusions. Every row in every register carries an **exact evidence path**, and anything unproven is
recorded as `UNKNOWN_EVIDENCE` with an owner — never guessed.

## 2. The reconciliation unit: capability, not page

Comparing by HTML filename is how a product convinces itself it is complete while being hollow. `teachers.html`
exists in both systems — that proves nothing about whether an admin can *reassign a teacher's sessions*.

The unit of reconciliation is the **capability**: a user-meaningful ability, owned by one or more roles, with a
creation surface, a consumption surface, and a lifecycle. Every capability row records:

`capId` · capability · legacy route · legacy screenshot paths · legacy raw-record paths · current
route/page/tab/drawer · roles · reachability · **legacy control count vs current control count** ·
modal/drawer status · empty/loading/error states · sensitive-data exposure · backend dependency ·
**cross-role consumers** · visual status · **disposition** · **future owning spec** · proof/test needed.

### Dispositions (closed set)

| Disposition | Meaning |
|---|---|
| `COMPLETE_AND_VERIFIED` | field-level / control-level comparison done, and it matches |
| `COMPLETE_BUT_VISUAL_REVIEW_REQUIRED` | functionally complete; the design needs a review pass |
| `PARTIAL` | exists but is a **subset** of the evidenced workflow |
| `MISSING` | evidenced in legacy, absent here |
| `INTENTIONALLY_IMPROVED` | we deliberately do it **better** — must be **preserved**, not regressed |
| `HONEST_LOCK` | deliberately disabled with a truthful reason (e.g. `classSalaryReport`) |
| `REJECTED_SECURITY` / `REJECTED_PRIVACY` / `REJECTED_NO_FAKE` / `REJECTED_PAY_FREE` | the legacy behaviour is refused, by law |
| `FUTURE_BACKEND` | cannot be honest without a real server |
| `UNKNOWN_EVIDENCE` | evidence missing or contradictory — **never** guessed |

> **`COMPLETE_AND_VERIFIED` is forbidden without a field-level comparison.** A 3-field form standing in for a
> 20-field evidenced workflow is `PARTIAL`, and saying otherwise is the exact failure this spec exists to catch.

## 3. Evidence corpus (established and verified)

| Side | Reality |
|---|---|
| **Legacy** | **339 pages** (admin 300 · teacher 26 · family 13) · **19 modules** · **1,113 screenshots** (crawler captures on disk under `output/roles/**`: admin 1,019 · teacher 67 · family 27; the oft-quoted **1,162** is the `reference-imports` MIRROR total, which adds the 49 `frontend-planning-deep` frames that are not crawler page captures) · **1,723 raw records** — a sitewide `find output/` count: 679 HTML (339 raw + 339 sanitized page captures + `combined/report.html`) · 346 JSON (339 page records + `combined/academy-system-map.json`, 3 `role-map.json`, 3 `network/endpoints.json`) · 359 MD (339 page MD + 20 index/summary files) · 339 TXT (the page-record corpus itself is 339 per type; 678 page HTML) · **829 skipped actions** · 0 failed pages |
| **Current** | **115** HTML · **57** bases · **50** admin nav items · 3 role portals (7/8/8) · **402** own screenshots (`app/screenshots/*.png`; +6 archived `before-022/` comparison frames = 408 files under the directory) |

**339/339 legacy pages are assigned to a capability cluster — zero unassigned.** Every referenced path was
verified to exist on disk (0 broken references). See `exhaustive-evidence-inventory.md` and
`cluster-evidence-paths/`.

### The 15 capability clusters

The clusters partition **both** sides: all 19 legacy modules **and** all 57 current bases, with no gaps and no
double-ownership.

| # | Cluster | Legacy pages | Current surfaces |
|---|---|---|---|
| C01 | Dashboard & Home | 36 | `dashboard`, `portals` |
| **C02** | **Teachers** | **109** | `teachers`, `teacher`, `teacher-performance`, teacher portal ×8 |
| C03 | Students | 39 | `students`, `student`, student portal ×7 |
| C04 | Families / Guardians | 31 | `families`, `family`, `add-family`, `family-child`, family portal ×8 |
| C05 | Courses & Groups | 26 | `courses`, `course`, `groups`, `group` |
| C06 | Sessions · Schedule · Attendance | 24 | `sessions`, `schedule`, `attendance`, `sessions-analysis`, `schedule-search`, `public-holiday`, `scheduled-actions` |
| **C07** | **Finance · Payments · Invoices** | **67** | `finance` (6-tab hub) |
| C08 | Reports & Analytics | 17 | `reports` (3 tabs) |
| C09 | Settings | 27 | `settings` (6-tab hub) |
| C10 | Content · Materials · Certificates | 9 | `library`, `certificates` |
| C11 | Messages · Notifications · Leads | 5 | `messages`, `announcements`, `leads` |
| C12 | Staff · Profile · Roles & Permissions | 9 | `staff`, `settings#view=users`, `*-profile` |
| C13 | Exams · Assignments · Results | 4 | `students#view=results`, `#view=evaluation`, `student-homework` |
| C14 | General · Utilities | 19 | `gallery` (orphan), `time-converter`, `tasks` |
| C15 | Auth · Public · Shared Shell | 0 legacy tag | `index`, admin shell, portal shell, `enhance.js` |

**Teachers (109) and Finance (67) carry ~52% of the legacy surface between them** — that is where the real gaps
live, and the audit weights its grounding effort accordingly.

## 4. Method (binding)

1. **Targeted visual grounding.** Screenshots are **opened as images**. A filename is not evidence; extracted
   text is not evidence of layout. Each cluster opens every distinct surface/state (list · detail · create ·
   edit · modal · drawer · empty · error).
2. **Raw records beat summaries — always.** Any field, label, route, state or interaction that cannot be *proven*
   from the image is resolved from `output/roles/<role>/pages/<slug>.json` and `text/<slug>.txt`. A planning
   document is never authoritative over the raw record it summarizes.
3. **Current source is read directly** (`app/src/js/**`), not inferred from a prior spec's claim about it.
4. **Conflicts are recorded, not smoothed.** Where evidence disagrees, the disagreement is stated, the strongest
   source named, and the resolution justified — or it stays `UNKNOWN_EVIDENCE`.
5. **Honest effort counts.** Every cluster reports how many screenshots it *actually opened* and how many raw
   records it *actually read*. An under-grounded cluster is a finding, not a rounding error.

## 5. Binding laws (carried forward, non-negotiable)

- **No fake anything**: persistence, upload, delete, approval, payment, PDF, delivery, gateway, backup, export,
  success. No fabricated backend/API/websocket behaviour.
- **No-secret**: no authored credential, API key, token or secret. 0 `type=password`, 0 `type=file`.
- **No real PII** from the crawl corpus (real names, phone numbers, emails, live WhatsApp invite URLs).
- **Teacher pay-free, GLOBAL** — no salary/rate/fine/payout/currency figure on any teacher surface.
- **Family zero-pay** portal · **student is a CHILD-VIEW**, not an independent role (the legacy has **no student
  login** — proven in Spec 021).
- **Hiding a link is not authorization.** A surface that leaks when fetched directly, leaks.
- **Do not broaden permissions because the legacy exposed something.** The legacy's exposure is evidence of a
  *defect*, not a requirement.
- `classSalaryReport` remains the **sole** honest lock. `FUTURE_ROUTES` stays `{}`. Planned items stay **0**.
- **No new payment or communication engine in Spec 042** — or in any spec, without a real backend owner.

## 6. Scope of change: NONE

Spec 042 is **documentation-only**. See `count-and-impact-contract.md`.

| Frozen | Value |
|---|---|
| Public HTML · bases | **115 · 57** |
| Admin menu · route split | **50** · **24 deep / 25 plain / 1 lock** |
| implemented / planned / disabled | **49 / 0 / 1** |
| Orphan set | exactly `{gallery.html, gallery.en.html}` |

**MUST BE 0-DIFF**: `app/src/**` · `app/tests/**` · `app/public/**` · `app/scripts/**` · `package.json` ·
`nav.config.js`. No new page, route, nav item, hook or storage key.

If evidence proves a new page or route is genuinely required, it is recorded as a **proposal** (capability,
evidence path, count impact, owning spec, why-not-now) — and **not built here**. A count that changes during this
spec is a **STOP**.

## 7. Ownership: every gap gets exactly one owner

Spec 042's deliverable is not a list of complaints — it is an **allocation**.

- **All 57 page bases** are partitioned across Specs **045–050** for review + academic visual redesign. Every
  base appears **exactly once**: no overlap, no orphan. The arithmetic is shown. (Unit note: the review
  partition in `visual-quality-and-academic-design-audit.md` §10 counts **58 review units** = the 57 mirrored
  bases **+ `index.html`**, which has no `.en` mirror — 57×2+1 = 115 files. "57 bases" and "58 review units"
  are the same partition stated in two units.)
- **Teacher and Family dashboards receive explicit priority ownership** — they are the weakest experiences and
  the most-used role surfaces.
- Every `PARTIAL` / `MISSING` / `UNKNOWN_EVIDENCE` / `FUTURE_BACKEND` capability is allocated to its owning spec
  through **057**, with dependencies and ordering.

| Spec | Owns |
|---|---|
| **043** | Sensitive Data Privacy, Role Isolation & Anti-Poaching |
| **044** | Modal, Drawer & Long-Form Interaction System — **incl. the 30 pre-existing `f-fbAdd` duplicate ids** |
| **045–050** | Bounded page-review + academic visual redesign groups (the 57-base partition) |
| **051** | Community, Moderation & Safe Social Interactions |
| **052** | Recognition, Achievements & Privacy-Safe Leaderboards |
| **053** | Integrations Command Center |
| **054** | Embedded Virtual Classroom & Meeting Lifecycle |
| **055** | Cross-Role Propagation & Workflow Consistency |
| **056** | Complete Forms & Data Capture Audit |
| **057** | Final Production Freeze |

## 8. Design stance: improve, do not clone

The legacy is **capability and workflow evidence** — never a design target. It is a generic corporate ERP wearing
an academy's name, and in several places it is actively unsafe (plain-text secrets, a no-confirm database backup,
PayPal defaulting to Live, real PII on screen).

The redesign specs (045–050) must:

- keep everything **we already do better** (`current-product-better-than-legacy-register.md` is a
  **preservation** list, not a nice-to-have);
- move the product toward a **cheerful, modern, academy-specific** identity — friendly empty states, clear
  hierarchy, education-appropriate density — **not** a corporate ERP;
- preserve **RTL/LTR**, **mobile**, and **accessibility** (`critical=0 serious=0`, now machine-gated);
- verify forms and modal/drawer experience for the pages they own.

## 9. Quality gates (the spec is NOT ready unless all pass)

1. Every one of the **57** current page bases appears in the reconciliation.
2. Every one of the **50** admin nav items appears.
3. Every legacy page/capability appears **or** is explicitly excluded **with evidence**.
4. Every screenshot/record group has an owner.
5. Every `PARTIAL` / `MISSING` / `UNKNOWN_EVIDENCE` has a future owner.
6. The 045–050 map is a true **partition** (arithmetic shown).
7. No sensitive-data leak is normalized; no fake backend behaviour is proposed.
8. **No form is labelled complete without a field-level comparison.**
9. Cross-role propagation gaps are recorded (a creation surface ≠ a working feature).
10. Current improvements over the legacy are preserved.
11. **No source, test or public HTML file is modified.**

**Gate-evaluation status note.** Gates 3–6 are evaluated against the consolidation deliverables, some of which
land in a separate consolidation pass: the per-capability roll-up (`legacy-current-capability-ledger.md`), the
owner allocation (`future-spec-allocation-register.md`), the 045–050 partition extract
(`page-review-ownership-map.md`), the federated REJECTED_*/UNKNOWN_EVIDENCE registers
(`rejected-legacy-behaviour-register.md`, `unknown-and-conflicting-evidence-register.md`) and the adversarial
checklist (`checklists/requirements.md`) with an explicit PASS/FAIL per gate. Until those land, their content is
**federated**: dispositions + owners live in the 15 cluster audits' "Disposition summary" tables
(`cluster-audits/C01–C15-audit.md` — all 15 written), the REJECTED_* rows in the six cross-cutting ledgers
(privacy §2–§4, forms §7, cross-role §5, better-register §1–§9), the UNKNOWN_EVIDENCE rows in the same ledgers
(privacy §9, forms §11, cross-role §6), and the partition arithmetic in the visual audit §10. **Spec 042 is not
declared complete until the consolidated artifacts exist and every §9 gate is explicitly evaluated.**

## 10. Stop conditions

Spec 041 uncommitted or tree unclean · evidence roots missing · screenshots unopenable · the audit cannot cover
the known corpus · an implementer would have to **guess** a field, role, route, workflow or design · page
ownership overlaps or leaves a gap · a source/test/HTML edit becomes necessary · any count or freeze invariant
changes.

**No commit · no push · no branch · no stash · no reset · no checkout · no clean.** The watcher commits.

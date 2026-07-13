# Carry-Forward Register — Spec 041

Scope: the complete, evidence-verified record of everything Spec 041's audit **surfaced but must not fix**,
because fixing it would exceed a route/sidebar freeze's impact boundary — real copy changes, backend behaviour,
new product surfaces, integrations, cross-role propagation, form-completeness re-audits, interaction redesign,
visual redesign, or legacy-capability reconciliation. This register is descriptive of the committed state at
HEAD `21502af`; it proposes no implementation. No source/test/HTML file is touched by this document.

**The governing rule (stated once, applied nine times below):** Spec 041 is bound by
`040-.../future-owner-register.md` §3 — *"no real integrations may be assigned to Spec 041"* — and by its own
`spec.md` §1.2 boundary against the review specs. Its only two lawful actions on anything in this register are
**(a)** record it with evidence, and **(b)** where the corpus leaves ownership ambiguous, verify and name the
single correct owner from the committed roadmap. It may never perform the fix itself.

**Roadmap provenance (load-bearing for every "owner" cell below).** The committed spec corpus contains, as
formally chartered specs with their own `spec.md`, exactly **041** — defined by
`033-admin-nav-completion-strategy/follow-up-spec-roadmap.md` as the final sidebar/route/production re-freeze.
**Specs 042–057 do not exist as their own spec directories.** They are named in exactly one committed document —
`040-settings-deep-links-subpages/future-owner-register.md` §1 — which states, verbatim: *"the committed spec
corpus contains only Spec 041 … Specs 042–057 appear nowhere in any committed artifact. The roadmap below is a
maintainer-directed, append-only amendment (the same mechanism used when the 019–021 sequence was renumbered),
and it REDEFINES 041."* So every owner cited below by number (042, 043, …, 057) is **committed evidence** in the
sense that the register recording it is checked into the repository and part of Spec 040's committed artifact
set — but the numbered spec itself is **not** a chartered spec with its own plan/tasks; it is a recorded
maintainer intention. This register repeats that distinction at each entry rather than letting the number alone
imply a spec that exists.

| # | Title (per the amendment) |
|---|---|
| 042 | Exhaustive Legacy Coverage Re-Audit |
| 043 | Sensitive Data Privacy, Role Isolation & Anti-Poaching |
| 044 | Modal, Drawer & Long-Form Interaction System |
| 045 | Admin General Operations & Communications Review |
| 046 | Admin People & Academic Operations Review |
| 047 | Reports, Analytics & Finance Review |
| 048 | Content, Certificates, Access & Settings Review |
| 049 | Teacher Portal Full Review |
| 050 | Family & Student Portal Full Review |
| 051 | Academy Community, Moderation & Safe Social Interactions |
| 052 | Recognition, Achievements & Privacy-Safe Leaderboards |
| 053 | Integrations Command Center |
| 054 | Embedded Virtual Classroom & Meeting Lifecycle |
| 055 | Cross-Role Feature Propagation & Workflow Consistency |
| 056 | Complete Forms & Data Capture Audit |
| 057 | Final Exhaustive Parity, Security & Production Freeze |

Source: `040-settings-deep-links-subpages/future-owner-register.md` §1 table (verified live at the path above,
HEAD `21502af`). 045–050 are the "bounded review specs" the 041 `spec.md` groups together in its own CF-5/§11.

---

## CF-1 — The product-wide copy/honesty sweep (`common.backendRequiredNote`)

### The finding

`src/locales/en.extra.js:3` (verified live):

```js
common: { close: 'Close', confirm: 'Confirm', cancel: 'Cancel', save: 'Save', add: 'Add', view: 'View', edit: 'Edit',
  backendRequiredNote: 'This action needs the server connection to complete — nothing is saved yet.' },
```

This is the **shared Spec-032 gate reason** — the string a `formDrawer`/`preview-drawer` final renders when its
Save/Submit action is a `backendRequired` gate. It is **honest in meaning**: the sentence's whole grammatical
purpose is to *deny* that anything was saved. But it is also **token-bearing**: it contains the literal word
"saved", which is exactly the token the sitewide fake-success census greps for. Sitewide, the fake-success token
count **fell only 182 → 179 under Spec 040** — this note is the largest single reason the count is not lower.

### Where it renders (verified)

`components/preview-drawer.js:32-33` wires it as the **default** `reasonKey` for every `formDrawer(...)` call that
does not override it — i.e. it is the fallback copy for the entire Spec-032 form-drawer system, not a one-off
string. It is also referenced directly by `components/wizard.js`, `components/evaluation-rubric.js`,
`components/report-feedback.js`, `pages/teachers.js`, and `pages/library.js`. Live grep of the built output:
`grep -o "nothing is saved yet" public/*.en.html` → **130 occurrences** across the English build (the Arabic
mirror carries the equivalent honest-denial phrasing under the same key). The claim "rendered on ~50 pages" in
the Spec 040 handoff is the page-count view of the same fact; 130 is the raw occurrence count (several
drawers/gates per page on the busier admin surfaces).

### Why it is out of scope for a route/sidebar freeze

Spec 041 audits **routes and the sidebar** — which nav item points at which page/tab, and whether that pointer is
honest. `common.backendRequiredNote` is **body copy inside gated finals**, reached only after a user has already
arrived via a route and opened a drawer/wizard step. Rewording it touches **no route, no sidebar item, no
`nav.config.js` entry** — it touches the shared locale string and, transitively, the `#page-body` of every page
that renders a `formDrawer`/`preview-drawer`/wizard gate with the default reason. Per the 040 impact-protection
method (`git show <commit>:<path>` / detached worktree, §"Impact protection" in `spec.md`), a body-text edit on
~50 pages is **far outside** the "0 body changes, sidebar-only" impact envelope Spec 041 is chartered to prove
(see `count-and-freeze-contract.md` — the 041 baseline expectation is 0 body-changed / 0 sidebar-changed / 115
untouched, a **pure** re-freeze). Editing this string would make 041 a copy-fix spec wearing a freeze spec's
name.

### Ownership — verified, not asserted (FR-023)

The **only** statement in the committed corpus assigning an owner is one line, `040-.../implementation-status.md:135`:
*"A product-wide copy sweep belongs to Spec 044/056."* That is a **dual owner** — which, functionally, is no
owner — and it is recorded in a *findings-handed-forward* section, **not in any contract** (`040-.../contracts/*.md`
assigns nothing about copy). Spec 041's own `spec.md` FR-023 is explicit that 041 must **name one owner, verified
from the committed roadmap, not asserted.**

Verification performed: `040-.../future-owner-register.md` §2 assigns the two candidates to **different, narrower**
capabilities:

| ID | Capability assigned | Scope, per the register's own wording |
|---|---|---|
| FO-23 | **The global modal/drawer/long-form system** | "040 documents Settings' presentation requirements only" → owner **044** |
| FO-24 | **Product-wide form-completeness re-audit** | "040 enforces completeness for Settings now; 056 must not be used as an excuse to leave Settings shallow" → owner **056** |

Neither line names a *copy/wording* sweep verbatim — 044 owns the **system** (component architecture/interaction
patterns for modals, drawers, long forms), 056 owns **completeness** (are the right *fields* present, not what a
shared reason string *says*). But the finding itself is scoped **exactly** to the presentation layer 044 already
owns: `backendRequiredNote` is not a stray string — it is the **default `reasonKey`** wired into
`preview-drawer.js`'s `formDrawer()` (the very function 040/FO-23 assigns to 044), and every other file that
references it (`wizard.js`, `evaluation-rubric.js`, `report-feedback.js`) is itself a modal/drawer/long-form
component, not a forms-data-capture concern. `confirm-modal.js` — the OTHER shared gate component — does **not**
reference `backendRequiredNote` at all (verified: zero matches), confirming the string's blast radius is the
drawer/wizard family, not confirms generically, and not form-field completeness.

**041's RECOMMENDATION (not a decision): the single owner should be Spec 044** (Modal, Drawer & Long-Form Interaction
System), because the defect lives in the shared component that 044 is chartered to own, not in a missing field that
056 would surface. Per `spec.md` FR-023 / Q-4, the **single owner is NAMED in `/speckit.plan`**, choosing only among
the candidates the committed corpus already names (**044 · 056 · 057**); this register supplies the evidence that
makes 044 the best-supported of the three. It does **not** authorize 041 to act on the sweep, and per the
roadmap-provenance note above, **"044" is a recorded maintainer amendment, not a chartered spec** — so the assignment
binds **whichever spec is chartered into that slot**, and is not a commitment that a spec literally titled "044" will
exist verbatim.

---

## CF-2 — Backend permission enforcement

**The finding (context, not new work for 041):** every admin nav item's honesty in this product is about
**presence** — does the link go where it claims — never about **authorization** — should *this* logged-in user be
allowed to see or click it. Legacy's real RBAC was permission-**data**-driven (`/management/admins/permission/{id}`,
~170 flags across 17 named groups, per a Manager/Accountant/Supervisor/Support role label). The rebuild has no
backend, so it cannot enforce any of that; hiding a link is the only lever a static-HTML build has, and **hiding a
link is explicitly not authorization** (041's own standing-law list, and Edge Case E-13 in `spec.md`).

**Why out of scope for a route/sidebar freeze:** enforcement requires a live session, a server-verified role/claim
set, and a deny path for a route the user is not permitted to reach — none of which exist in a static-HTML,
fixture-only build with no auth. Freezing routes says nothing about who may traverse them; that is a runtime
security property, not a link-presence property.

**Owner:** **043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching**, per `future-owner-register.md` FO-17
verbatim: *"RBAC enforcement — real route/API denial per permission … Hiding links is not enforcement → **043**."*
FO-16 (2FA/OTP, session policy) and FO-12 (the `password` import column) are adjacent sub-items under the same
owner. As with every 04x/05x reference in this register, **043 is a recorded maintainer-roadmap entry, not a
chartered spec** — the owner assignment is the best evidence available in the committed corpus, not a promise of
043's exact eventual scope.

---

## CF-3 — Community/social hub + leaderboards

**The finding:** no chat, forum, feed, moderation surface, badge/achievement system, or ranked leaderboard exists
anywhere in the current 115-page build — by design. The standing laws forbid computed
score/rank/leaderboard/percentile everywhere in the product (carried since Spec 016 and re-verified by every
subsequent spec's honesty census), so a real leaderboard cannot be authored honestly without a backend to compute
it, and a *fake* one would violate the no-fake law directly.

**Why out of scope for a route/sidebar freeze:** these are wholly new product surfaces (new pages, new nav
categories, new fixture domains, new computed-ranking logic) — the exact things Spec 041's own `spec.md` §11 rules
out ("Any new page, new nav item, new category… Any real behaviour… any computed metric"). A freeze audits what
exists; it cannot originate a community feature.

**Owner:** **051 — Academy Community, Moderation & Safe Social Interactions** (social/chat/moderation) and
**052 — Recognition, Achievements & Privacy-Safe Leaderboards** (the "privacy-safe" qualifier in 052's own title
signals its authors already intend to resolve the no-fake/no-computed-rank tension deliberately, rather than
inherit it by accident). Both are recorded-amendment entries per the roadmap-provenance note, not chartered specs
today.

---

## CF-4 — WhatsApp / Zoom / Meet / payment integrations

**The finding:** these are the largest concentration of honest gates in the product. WhatsApp pairing (the 4-step
QR wizard, `send_group`, test-send, logout, the live websocket) was **never captured** in the legacy crawl at all
(status: UNKNOWN); every action needs a live third-party provider. Payment/payout processing is real money moving
through a gateway. Zoom/Google Meet has **no legacy Settings evidence** and would be a distinct embedded-room
product surface. All are correctly represented today as `data-disabled-reason` gates or absent entirely — never
faked, never a mock "Connected" chip (the standing zero-count census: fake-`'Connected'`-chip = 0, credential-input
= 0, `type=password` = 0).

**Why out of scope for a route/sidebar freeze:** 041 is **expressly barred** from assigning any real integration
to itself — `040-.../future-owner-register.md` §3, quoted in 041's own `spec.md` §1.2: *"no real integrations may
be assigned to Spec 041."* An integration requires live credentials, a provider SDK/webhook, and a backend to hold
secrets — none of which a static-HTML freeze can or should touch.

**Owner:** **053 — Integrations Command Center** owns WhatsApp pairing, real provider connections/OAuth,
payment-gateway calls, payout execution, and SMTP/email account management (`future-owner-register.md` FO-01
through FO-06 verbatim, all pointed at 053). **054 — Embedded Virtual Classroom & Meeting Lifecycle** owns
Zoom/Google Meet specifically (FO-08: *"No legacy Settings evidence; a distinct product surface → **054**"*).
Both recorded-amendment entries, not chartered specs.

---

## CF-5 — Cross-role propagation

**The finding:** several settings/behaviours are documented as *should eventually affect other roles or surfaces*
but do not today — e.g. a notification event configured in the admin Settings matrix has no live channel to
actually reach a teacher/family/student; a timezone or automation rule set once has no mechanism to propagate
anywhere. `future-owner-register.md` FO-07 records notification **delivery** split across two owners (channels →
053, propagation → 055); FO-19/FO-20/FO-21/FO-22 record theme/brand/layout/palette persistence-and-propagation as
requiring **new hooks and new storage keys**, which is forbidden by the closed-hook-set standing law regardless of
which spec eventually does it.

**Why out of scope for a route/sidebar freeze:** cross-role propagation is a data-flow and event-system design
question — it presupposes a backend event bus or shared state layer that does not exist, and any frontend
approximation would require new `data-*` hooks/storage keys, which Spec 041 (and every spec before it) is bound
never to add.

**Owner:** **055 — Cross-Role Feature Propagation & Workflow Consistency**, per FO-22 verbatim: *"Cross-surface
propagation of every setting (timezone, automation rules, palette, routing) — 040 documents it; it does not
implement it → **055**."* Recorded-amendment entry, not a chartered spec.

---

## CF-6 — Full form-completeness review

**The finding:** the Spec-032 form-completion pass (24 form-bearing drawers) closed the **field-less-create/edit**
defect class sitewide, and Spec 040 additionally enforced completeness for **Settings specifically** (its own
`complete-settings-forms-contract.md`). No committed spec has re-audited **every** form across **every** domain for
field-level completeness against the legacy 57-field/170-permission-flag surface the grounding docs describe —
that is a much larger, domain-by-domain undertaking than any nav-freeze spec's scope.

**Why out of scope for a route/sidebar freeze:** field-level form completeness is a **content/authoring** question
inside pages that already have honest routes — it is orthogonal to "does the sidebar item point at the right
place." Auditing every field in every drawer against legacy is explicitly excluded by 041's own §11 ("Any real
behaviour…").

**Owner:** **056 — Complete Forms & Data Capture Audit**, per FO-24 verbatim, which carries its own explicit
non-excuse clause: *"040 enforces completeness for Settings now; 056 must not be used as an excuse to leave
Settings shallow."* Per `complete-settings-forms-contract.md`, 056 may **tighten** that contract's assertions but
may **not weaken** them. Recorded-amendment entry, not a chartered spec.

---

## CF-7 — Modal/drawer redesign

**The finding:** the modal/drawer/wizard system (`preview-drawer.js`, `wizard.js`, `confirm-modal.js`) has grown
organically since Spec 026 (the closed `data-modal-trigger`/`data-drawer`/`data-confirm` hook set) through Spec 032
(the `formDrawer()` helper) to Spec 040 (12 registered `integ-*` provider drawers). It has never had a dedicated
interaction-design review — only incremental additive extension. CF-1 above (the `backendRequiredNote` copy) is a
concrete symptom that lives inside this exact system.

**Why out of scope for a route/sidebar freeze:** an interaction-system redesign is, by definition, a **redesign**
— explicitly the first item 041's own §11 rules out ("Any redesign: sidebar visuals, rail grouping, IA,
typography, colour, layout, density" — the same principle extends to modal/drawer interaction patterns, which are
presentation, not routing).

**Owner:** **044 — Modal, Drawer & Long-Form Interaction System**, per FO-23 verbatim: *"The global modal/drawer/
long-form system — 040 documents Settings' presentation requirements only → **044**."* Recorded-amendment entry,
not a chartered spec; see CF-1 for the specific defect this owner inherits first.

---

## CF-8 — Full academic visual redesign

**The finding:** the product's visual language (typography, colour, density, card/board layouts) has been built
incrementally per-domain across Specs 018–040, anchored to the "approved-dashboard" reference and the Spec-016
design freeze, but never subjected to a single end-to-end academic-visual review across all role surfaces at once.

**Why out of scope for a route/sidebar freeze:** visual redesign is, again, the literal first exclusion in 041's
own §11. A route/sidebar audit checks *where a link goes*; it has no jurisdiction over *how the destination looks*.

**Owner:** the bounded per-domain review sequence **045–050** — Admin General Operations & Communications (045),
Admin People & Academic Operations (046), Reports/Analytics/Finance (047), Content/Certificates/Access/Settings
(048), Teacher Portal Full Review (049), Family & Student Portal Full Review (050) — per the roadmap table above.
041's own `spec.md` groups these together as "the bounded review specs" in its §11/CF-5. All six are
recorded-amendment entries, not chartered specs.

---

## CF-9 — Page-by-page legacy capability reconciliation

**The finding:** two concrete gaps surfaced during 041's grounding and are recorded, not fixed, here (they overlap
041 `spec.md`'s own CF-2/CF-3, restated for completeness of this register):

- **Legacy destinations with no current top-level nav item.** The legacy 51-item flat sidebar carried
  `/management/accounting` (+3 transaction sub-pages), `/management/expense`, `/management/analysis-expenses`,
  `/management/analysis-invoices`, `/management/analysis-student`, `/management/payouts`, and
  `/management/schedule-trials-response`. These survive today only as deferred/gated **planned cards** inside
  `finance.html`, with **no nav route at all** — a legacy admin who used the sidebar for these loses direct nav
  access in the rebuild. This is a **capability-coverage** gap, not a route-honesty defect (nothing here is a
  dead or lying link — the items are simply not present as nav items).
- **Current items with no functioning legacy ancestor.** `dataAnalysis` continues a legacy sidebar *label* whose
  legacy target was a dead `javascript:void(0)` stub (captured under External Links); `monthlyReports` continues a
  caption legacy's own sidebar mis-applied to `/management/forms` (the form builder). Both current items are
  **honest today** — Spec 037 built them as real, authored, display-only tabs — but they are not faithful ports of
  a working legacy page, and a future reconciliation pass should not mistake them for one.

**Why out of scope for a route/sidebar freeze:** reconciling every one of the ~51 legacy destinations against the
current 50-item nav, item-by-item, with a verdict of "ported / folded / deferred / dropped" for each, is a
**coverage audit** spanning every domain — precisely the job the roadmap names as a dedicated spec, not a
by-product of a freeze whose own scope is "does the promoted set of 50 items resolve honestly," not "is the
promoted set complete against legacy."

**Owner:** **042 — Exhaustive Legacy Coverage Re-Audit**, the first-named entry in the roadmap table, positioned
immediately after 041 for exactly this reason. Recorded-amendment entry, not a chartered spec.

---

## Summary table

| # | Item | Class | Owner (per roadmap) | Chartered spec today? |
|---|---|---|---|---|
| CF-1 | `common.backendRequiredNote` copy/honesty sweep | Body copy, ~50 pages / 130 occurrences | **044 — RECOMMENDED**, evidence-traced, not asserted; **named in `/speckit.plan`** per FR-023/Q-4 (candidates: 044 · 056 · 057) | No — recorded amendment |
| CF-2 | Backend permission enforcement | Runtime security | **043** | No — recorded amendment |
| CF-3 | Community/social hub + leaderboards | New product surface | **051** (social) / **052** (recognition/leaderboards) | No — recorded amendment |
| CF-4 | WhatsApp/Zoom/Meet/payment integrations | Real integration (barred from 041 by name) | **053** (WhatsApp/payments/SMTP) / **054** (Zoom/Meet) | No — recorded amendment |
| CF-5 | Cross-role propagation | Data-flow/event design, new hooks implied | **055** | No — recorded amendment |
| CF-6 | Full form-completeness review | Content/authoring audit | **056** | No — recorded amendment |
| CF-7 | Modal/drawer redesign | Interaction-system redesign | **044** | No — recorded amendment |
| CF-8 | Full academic visual redesign | Visual redesign | **045–050** (bounded per-domain reviews) | No — recorded amendment |
| CF-9 | Page-by-page legacy capability reconciliation | Coverage audit | **042** | No — recorded amendment |

**Binding conclusion for 041:** every row above is **recorded, not designed, and not fixed** by this spec. The only
row where 041 does more than record is CF-1, where FR-023 obligates 041 to **resolve** the ownership by verification:
this register traces the defect to the exact shared component (`formDrawer()`'s default `reasonKey`) that the
roadmap's own FO-23 already assigns to **044**, and therefore **recommends 044** rather than inheriting the ambiguous
"044/056" dual-owner note verbatim from Spec 040's implementation-status findings. **The single owner is named in
`/speckit.plan`** (Q-4), from the corpus-named candidates only. No owner in this register is invented: every number
cited is a maintainer-amendment slot recorded in `040-settings-deep-links-subpages/future-owner-register.md` §1, and
none of them is a chartered spec today.

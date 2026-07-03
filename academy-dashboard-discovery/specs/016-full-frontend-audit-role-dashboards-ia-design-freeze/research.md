# Research & Decisions — Spec 016 (D1–D12)

Format: Decision · Rationale · Alternatives. Grounding: the 001–015 audit (three parallel audit passes this session), the legacy sweep (178 templates), the visual review, and the current green build (HEAD `20dc089`).

**D1 — Must any 001–015 gap block Spec 017?**
**Decision**: **No. Zero `must-fix-before-continuing`.** All 20 registered gaps are scope-forward (017–027), backendRequired, excluded, or already-covered; the build is green on every guard (smoke 48 loads, axe 0/0, byte-audit lineage intact).
**Rationale**: the audit found no broken, fake, or dishonest surface — only planned breadth. Blocking 017 on any of it would manufacture urgency the evidence doesn't support.
**Alternatives**: treating the ar-only `index.html` or the settings shell as blockers — rejected: cosmetic/deepening items with owned destinations (027/026).

**D2 — Do the role homes need redesign before the shell lands?**
**Decision**: **No redesign.** The three homes enter the 017 shell as-is; 017 re-hosts them (adds sidebar/topbar around the existing `pt-body` content) and updates only what hosting requires (closing-note copy, sanctioned-anchor registry entries).
**Rationale**: the homes are the newest, most-reviewed surfaces in the product (013/014/015, 20-frame reviews); the freeze names their language as the standard. Redesigning them would violate the freeze the same spec establishes.
**Alternatives**: merging home sections into internal pages at shell time — rejected: deepening belongs to 018–020; 017 stays structural.

**D3 — Shell before internal pages?**
**Decision**: **Yes — 017 ships the shell + navigation alone** (no new content pages), then 018–020 add pages inside it.
**Rationale**: every internal page needs the shell to exist (nav registry, active states, drawer); shipping shell+pages together for one role would leave the other two homes shell-less and force three shell integrations instead of one.
**Alternatives**: shell embedded in 018 — rejected: makes student the shell guinea pig and re-ripples family/teacher later.

**D4 — Final role navigation shape (desktop + mobile)?**
**Decision**: as frozen in `role-dashboard-ia.md` §2–3: desktop = flat single-level role sidebar (7–9 items, icon+label, collapsible, role-accent active pill); mobile = the existing off-canvas drawer hosting the same list; topbar = evolved portal header (no notification badge, no search); nav data-driven from per-role registries with the honest status vocabulary; planned items render as labeled non-links.
**Rationale**: role users have ≤9 destinations — the admin's two-level category rail would be over-structure; the drawer pattern already exists and is axe-clean.
**Alternatives**: bottom tab bar on mobile — rejected (forbidden in the freeze: one nav pattern per family, and 7–9 items exceed comfortable tabs); nested groups — rejected (no role has enough items).

**D5 — Are the internal page counts stable?**
**Decision**: **Yes: student 6 · family 7 · teacher 6** internal pages (+3 kept homes). Consolidated pairs (sessions+schedule, tasks+materials, subscriptions+billing-status, requests+feedback, outcomes+history, progress+achievements) are deliberate and final; a future spec may only SPLIT a page via an explicit amendment if a page exceeds ~12 sections — never merge further.
**Rationale**: counts mirror the legacy capability surface minus duplicates/fakes; each page has a single cockpit question.
**Alternatives**: 1:1 legacy route cloning (9–12 pages/role) — rejected: rebuilds legacy's duplicate-route problem.

**D6 — Are admin specs 021–026 balanced?**
**Decision**: **Balanced enough to bind, with one safety valve**: ownership is 021×10 · 022×4 · 023×5 · 024×3 · 025×9 · 026×12 sidebar rows. 021 (~9–10 new pairs) and 026 (~11–12 pairs) are the heaviest; the valve: **a future spec may split at ITS plan time (e.g., 026 → settings vs content halves) without renumbering others** — the sequence contract permits internal splitting, forbids reordering.
**Rationale**: category-aligned specs keep byte-identity audits simple (one nav category flips per spec); the valve avoids re-litigating the roadmap now for a risk that may not materialize.
**Alternatives**: pre-splitting into 13+ specs now — rejected: speculative overhead.

**D7 — How do locked/«قريبًا» items become pages?**
**Decision**: the REAL/LOCK/GATE conversion table in `admin-sidebar-page-inventory.md` is binding: each owning spec (a) builds the page at its honest end-state, (b) flips the nav item `planned/disabled → implemented`, (c) extends smoke so the item is crawl-verified. LOCK = permission-locked shell with visible preview + labeled reason; GATE = backendRequired shell explaining the capability; both are REAL pages (header, cards, states) — never blank, never toast-only, never dead.
**Rationale**: converts the current honest-but-thin toasts into honest-and-useful destinations without faking function.
**Alternatives**: leaving finance items as toasts forever — rejected by the user's requirement (no dead/blank/coming-soon endpoints).

**D8 — How must implementation specs reference screenshot evidence?**
**Decision**: every 017–027 spec MUST cite, per owned page: the legacy route(s) from the coverage matrix + at least one screenshot path under `output/roles/<role>/screenshots/` (or state `docs-only evidence` where none exists), and record the design-treatment code it applies. The capture-verified grounding note pattern from Spec 015 becomes the standard.
**Rationale**: keeps "capability coverage, not pixel cloning" auditable at 027.
**Alternatives**: freeform inspiration — rejected: unauditable.

**D9 — How does the freeze prevent another redesign?**
**Decision**: three mechanisms: (1) every freeze entry is *frozen-as-exists* naming shipped CSS/components or *frozen-new* with its owning spec — no undefined pattern remains; (2) the forbidden-pattern register makes violations screenshot-reviewable; (3) change control — deviations require an explicit amendment section (the 015 A1/A2 precedent) and silent drift is a 027-blocking finding.
**Rationale**: redesign happens when specs face unanswered visual questions; the freeze answers them or names the owner.
**Alternatives**: a pixel styleguide document — rejected: the shipped product + tokens ARE the styleguide; duplicating it invites divergence.

**D10 — How will 027 prove "no missing frontend"?**
**Decision**: the eight machine-checkable rules in `future-spec-sequence.md` (coverage-matrix closure script-checked; zero planned/disabled without destination; link crawl; action-class audit; pay/currency greps over teacher/family families; smoke+axe+390px; per-spec identity lineage; screenshot verdicts vs the forbidden register). 027 runs them as a single audit and publishes the close-out table.
**Rationale**: every rule is a grep/crawl/assert — no judgment-only acceptance.
**Alternatives**: manual review checklist — rejected: the project's whole history is machine-verified acceptance.

**D11 — Does the CLAUDE.md pointer refresh belong in 017?**
**Decision**: **Yes — deferred to Spec 017's docs task.** CLAUDE.md is outside 016's allowed surface (spec folder only); it still points at Spec 015 as active, which is true until 017 begins implementation.
**Rationale**: honors the user's explicit scope boundary; no downstream command depends on CLAUDE.md before 017 (feature.json already points at 016).
**Alternatives**: updating it now — rejected: scope violation for a one-line convenience.

**D12 — Is any app-source change needed in Spec 016?**
**Decision**: **None.** Verified: `git status` = `.specify/feature.json` + the spec folder; no build/test run modified anything; all verification is read-only.
**Rationale/Alternatives**: n/a — the boundary is the point.

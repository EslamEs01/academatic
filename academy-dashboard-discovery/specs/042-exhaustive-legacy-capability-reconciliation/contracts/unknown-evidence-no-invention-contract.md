# Contract 11 — Unknown Evidence: the No-Invention Register (BINDING on Specs 043–057)

**Canonical source (cite by path + UK-nn; never restate):**
`../unknown-and-conflicting-evidence-register.md` — **47 rows, UK-01…UK-47** (9 never-captured/error surfaces ·
17 empty-at-crawl unknowns · 3 current-product comparison unknowns · 18 label/tag/summary-vs-raw conflicts), each
with the exact evidence that exists, why it is insufficient, the resolution rule applied, and **exactly one
primary owner**. Disposition law: `../plan.md` **D3** — UNKNOWN_EVIDENCE is a **no-invention hold**, never
permission to invent.

## 1. How a UK row is resolved (the ONLY three ways)
A UK row is resolved by **new evidence**, never by inference:
1. **a fresh capture** (re-crawl / new screenshot / newly obtained record),
2. **a backend answer** (the real system's schema or behaviour, once connected), or
3. **an explicit user decision** (recorded as a decision, not presented as legacy fact).
Plausibility, symmetry with a sibling feature, reconstruction from a result table (map §6 rule), or an LLM's
guess are NOT evidence. "The table would obviously have edit/delete" is the exact failure mode this register
exists to block (UK-10/UK-13/UK-15/UK-16).

## 2. The update protocol
- Each resolution is performed **via the row's owning spec**: the owning spec's change declares the resolution,
  **attaches the evidence** (path to the new capture / backend answer / recorded decision), and updates the
  register row in the same change — an explicit, evidence-carrying amendment, never a silent rewrite and never
  an edit from a non-owning spec. Ownership transfer requires a declared supersession naming the UK id.
- Rows already marked "resolved as recorded" (e.g. UK-07 by substitution, UK-29 by cross-reference, UK-42's
  grouped notes) stay closed; 057 re-verifies at freeze that no closed row is "re-discovered" as a defect and
  that mirrored-verdict pairs never diverge (UK-40).

## 3. Implementing AROUND a UK row
Building a surface adjacent to a UK row means **building only what IS evidenced and honestly gating the rest**:
- proven columns/structures may ship; the unproven row-menus/actions/fields do not (UK-10, UK-13, UK-15, UK-16);
- an authored stand-in must be RECORDED as authored/designed, never claimed as legacy parity (UK-17 tasks fields,
  UK-08 room UI, map §6 U-1/U-4);
- a gate standing in for an unknown workflow keeps the standard honest copy — never a fake approximation.

## 4. Anchor rows (named for visibility; the register is the authority for all 47)
- **UK-01** — the legacy login/register/reset UI was never captured (crawler ran authenticated) → **043**
  re-crawls unauthenticated or designs fresh; nothing is "restored" from imagination.
- **UK-02** — Message Builder = a single 504 capture → **053**; refused-to-invent since Spec 040.
- **UK-08** — the live classroom UI redirected to home in both roles → **054**; never design the room from the
  entry buttons (link-visibility privacy sub-question → 043).
- **UK-17** — the legacy tasks create/section fields were Livewire-rendered and never captured → **056** settles
  the field set when the backend arrives; our drawers are recorded derivations.
- **UK-25 / UK-26 / UK-43** — staff-category semantics, presence/audit visibility, and the named-roles vs
  per-member-grants RBAC model are open **043** decisions (contract 6 §2).
- **UK-46 / UK-47** — documentation-vs-raw conflicts (index.html's real behaviour; the teacher-portal «قريبًا»
  tiles falsifying a user-visible claim) — the raw file won; owners **057** / **045-050**; never weaken a census
  to hide a finding.

## 5. Interpretation guards
- UNKNOWN_EVIDENCE is not backlog, not a defect count, and not a licence for "temporary" invented UI.
- Absence of evidence ≠ evidence of absence (UK-20): do not assert "the legacy had no X" from a silent corpus.
- Raw records beat planning summaries and prior-spec claims in every future conflict, exactly as this register
  resolved its 18 conflict rows.

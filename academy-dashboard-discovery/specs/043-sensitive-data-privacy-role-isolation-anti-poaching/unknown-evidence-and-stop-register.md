# Unknown-Evidence & Stop Register — Spec 043

The `UNKNOWN_EVIDENCE` rows 043 owns or must scope, each with its stop condition. A UK row resolves ONLY by new
evidence — a fresh capture, a backend answer, or an explicit user decision — never by inference, symmetry, or an
LLM guess (`contracts/unknown-evidence-no-invention-contract.md` §1). "The table would obviously have X" is the
exact failure mode this register blocks.

## Retained UNKNOWNs (owned by 043)

| ID | Unknown | Why unknowable | Owned row / UK | STOP condition |
|---|---|---|---|---|
| **UE-1** | Legacy login / register / password-reset / public marketing UI (layout, fields, validation, error/branding) | The crawler ran fully authenticated — 0 login/register/reset/public page records exist (C15 §1) | C15-01 / UK-01 | Do NOT design a login/register/reset UI from imagination. Define only the security requirements + future-backend ownership + honest boundary. Resolve only by a fresh unauthenticated re-crawl OR a real backend OR an explicit user decision. |
| **UE-2** | Login-as / impersonation for staff/admins | ZERO evidence in all 9 C12 records (no button/form/link); it is ungovernable (no matching permission in the 170-set) | C12-19 / UK-20 | Do NOT invent an impersonation surface. Any affordance is dropped or an honest gate — never fake. Resolve only by new evidence + a real auth+audit backend. |
| **UE-3** | Staff "category" semantics — is a "category" a data-visibility scope, a supervisor grouping, or a teacher-category? | The `/management/admins/categories/{id}` checkboxes are just real people's names (Agent B: `المشرفه حسناء`, `محمد السيد`); labels alone cannot define the model | U-01 / UK-25 | Do NOT expand the current invented `st-cat` two-row scope model. Build no further until backend/domain confirmation, a fresh capture, OR an explicit user decision (FR-017). |
| **UE-4** | What a PARTIALLY-granted permission matrix renders (mixed checkboxes, group counts like 9/24) | Both captured members are 170/170 all-granted; a partial state was never observed — only inferred from the counter + Clear-All controls | UK-18 | Do NOT assert a partial-matrix rendering never seen. The RBAC preview may show authored mixed grants (already does), but 043 claims no specific legacy partial-render. Resolve only by a fresh capture. |
| **UE-5** | The room RECORDING player / a populated recording (of a minor) | `session-class-room` redirected to home in both roles; no populated recording ever captured (U-6/UK-08) | part of UK-08 | Do NOT design a recording UI. 054 owns the room; 043's visibility rules (admin-only, consent) apply only IF/when it is built with real evidence. |

## Boundary UNKNOWNs where 043 decides the RULE but not the backend detail

These are NOT retained as blockers — 043 makes the visibility RULE; only a backend authz detail stays open:

- **Who exactly a real backend authorizes to copy a room link** (assigned-teacher scoping) — the RULE is decided
  (student/family never get a raw management/copy link; admin/assigned-teacher only after backend authz, PR-4…
  PR-6). The precise authorization predicate is a backend detail, not manufactured.
- **The exact per-zone affected-account count** (C14-09) — the RULE is decided (admin-only; column absent
  today), the live count is `FUTURE_BACKEND` (PR-7).

## Interpretation guards (binding)

- UNKNOWN_EVIDENCE is **not backlog**, not a defect count, and not a licence for "temporary" invented UI.
- **Absence of evidence ≠ evidence of absence** (UK-20): 043 does not assert "the legacy had no impersonation"
  from a silent corpus — it says the evidence is absent and the surface stays unbuilt/gated.
- Raw records beat planning summaries and prior-spec claims in every conflict.
- Each resolution, when it comes, is performed by the row's OWNING spec, attaches the new evidence, and updates
  the Spec-042 register row in the same change — never a silent rewrite, never from a non-owner
  (`contracts/unknown-evidence-no-invention-contract.md` §2).

## Stop-and-report triggers specific to 043 specify

STOP and report (do not proceed) if authoring would require: inventing a login/register/reset field set;
inventing an impersonation surface; inventing a staff-category scope model; asserting a partial-matrix
rendering; or designing a recording player — any of these is a UE-row violation and a directive stop condition.
None was required to author this spec.

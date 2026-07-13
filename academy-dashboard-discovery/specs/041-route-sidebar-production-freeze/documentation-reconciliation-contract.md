# Contract — Documentation Reconciliation (Spec 041)

Governs FR-019, FR-020, FR-021, FR-022, FR-023 (ownership record only), and SC-22. Baseline **HEAD `21502af`**
(Spec 040 committed), branch `feature/012-role-portal-foundation`, tree clean except this directory +
`.specify/feature.json`. Reconciles with `spec.md` §1, §8 (FR-019…FR-023), §9 (CF-1), §12 Q-8/Q-4,
`research.md` R-17/R-20, `plan.md` §8 (Not supersessions table), §10.4, §15 P7, §17.

---

## 0. Roadmap-provenance caveat (binding, repeated per §1 of `spec.md`)

> The committed spec corpus contains, as chartered specs with their own `spec.md`, **only Spec 041**. **Specs
> 042–057 do not exist as spec directories.** They are named in exactly one committed document —
> `040-settings-deep-links-subpages/future-owner-register.md` §1 — which states this itself: *"the committed spec
> corpus contains only Spec 041 … Specs 042–057 appear nowhere in any committed artifact. The roadmap below is a
> maintainer-directed, append-only amendment … and it redefines 041."*

Every spec number this contract assigns an owner to (**044**, and the sequence **042 → 043 → 044 → 045–050 →
051–057** implied by cross-references elsewhere in the corpus) is a **recorded maintainer intention**, not a
chartered spec. This contract invents no spec number and no roadmap entry beyond what `future-owner-register.md`
already names; it repeats this caveat at every point where a slot number appears (§3, §4 below) rather than
stating it once and letting readers forget it.

---

## 1. Classification rule (Q-8, decided in `research.md` R-20 — cite, do not re-derive)

A **supersession** changes an assertion's **logic, subject, or threshold**; it must be declared, contracted, and
justified per `protected-test-register.md`'s L-1…L-6 procedure (FR-011, SC-17). A **documentation correction**
changes explanatory text (a comment, a narrative, a status line) **around** an assertion whose behaviour is
untouched.

| Test | Documentation correction | Supersession |
|---|---|---|
| Does the assertion's pass/fail condition change for any input? | No | Yes |
| Does the assertion's subject (what DOM/config it reads) change? | No | Yes |
| Does the assertion's threshold/count change? | No | Yes |
| Is the change confined to a comment, header, or a register's narrative prose? | Yes | No |

Applying this test:

| Item | Behaviour touched? | Classification |
|---|---|---|
| FR-020 (`run.cjs:2580` header comment) | No — the assert one line below (`pub.length === 115`) is already correct and is not edited | **DOCUMENTATION CORRECTION** |
| FR-021 (`truth010.badPlanned` vacuity) | No — the assert is retained byte-verbatim; only a status note is added | **DOCUMENTATION CORRECTION** |
| FR-022 (corrected probe-chain narrative) | No — corrects `040-.../protected-test-supersession-register.md`'s prose about *history*; no assert in `run.cjs` is touched by this correction itself (the historical probe moves it describes — 034/035/036/039 — already happened in their own specs) | **DOCUMENTATION CORRECTION** |
| S1–S5 (D-1, `protected-test-register.md`) | Yes — subject changes (drawer → tab host), one regex changes, one array's members change | **PROTECTED-TEST SUPERSESSION** ×5 (out of this contract's scope — see **`protected-test-contract.md`** §2) |
| D-3 `langUrl()` behaviour change | Yes — a route helper's output changes | **0-DIFF-WALL SUPERSESSION** (**W-1**; exactly ONE line — out of this contract's scope, see **`d3-language-hash-contract.md`** §5) |

**The declared amendment set of Spec 041 — the numbers every artifact must use:**
**5 protected-test supersessions** (S1–S5, D-1) **+ 2 zero-diff-wall supersessions** (**W-1** `enhance.js`, exactly
one line, D-3 · **W-2** `components/teacher-actions.js`, the field-body extraction forced by the MOVE). Counted as
*behaviour* changes the total is **six** (S1–S5 + W-1); W-2 changes no assertion and no rendered byte beyond what D-1
already declares. **The two load-bearing figures: protected-test edits = 5; `enhance.js` changed lines = 1.**
FR-020/FR-021/FR-022 are **not** among any of them, and must never be counted as, or confused with, protected-assert
changes. Treating a comment fix as a supersession would devalue the term and risk the reading that "a comment fix
licenses an assert change" — it does not.

---

## 2. FR-020 — stale `run.cjs:2580` header comment

| Field | Value |
|---|---|
| Location | `tests/smoke/run.cjs:2580` (comment) / `:2581` (assert, untouched) |
| Current text | `// ===== Spec 032 — route/page count freeze: 51 bases × 2 languages + index = 103 =====` |
| Stale because | The assert immediately below already reads `pub.length === 115` — the comment describes a count (103) that predates Specs 034–040 (which raised the page count to 115). The comment was never updated across seven page-count-affecting specs. |
| Corrected text | `// ===== Spec 041 — route/page count freeze (recomputed from 21502af): 57 bases × 2 languages + index = 115 =====` |
| What changes | Comment text only |
| What does NOT change | The assert (`pub.length === 115`) — byte-verbatim, not touched, not re-declared |
| Classification | DOCUMENTATION CORRECTION (§1) |
| Evidence | `spec.md` FR-020; `research.md` R-20; `plan.md` §8 "Not supersessions" table |

---

## 3. FR-021 — `truth010.badPlanned` vacuity note

| Field | Value |
|---|---|
| Assertion | `truth010.badPlanned` — filters nav items for `status === 'planned'` and asserts the filtered set is empty |
| Why now vacuous | Spec 040 drove the planned census to **0** sitewide (`FUTURE_ROUTES` = `{}`, admin menu 49 implemented / 1 disabled / 0 planned). Since zero planned items exist, the filter this assert runs over is permanently empty — it **can never observe a non-empty set**, i.e. it can never be the assert that goes RED on its own subject running dry. |
| Precedent | `plannedNavAnchors === 0` is **already** documented in the suite as exactly this kind of guard — retained after its subject count hit zero, kept as a permanent census rather than deleted. FR-021 applies the identical treatment to `truth010.badPlanned`, closing an inconsistency (one vacuous guard was already documented; the other was not). |
| Action | **Retain the assert BYTE-VERBATIM.** Add an explanatory comment/note at its site stating it is vacuous-but-retained and why (mirrors E-09, zero-deletion law). |
| What does NOT change | The assert's code, its subject, its threshold |
| Classification | DOCUMENTATION CORRECTION (§1) |
| Evidence | `spec.md` FR-021, E-09; `research.md` R-20; `protected-test-register.md` (zero-deletion law) |

**Why retain rather than delete (E-08/E-09, binding):** *"A test may never be the reason a product lies."* The
inverse also holds under the zero-deletion law — a test does not get deleted merely because its subject shrank to
zero; it becomes a documented, permanent, vacuous-but-honest census, exactly like `plannedNavAnchors === 0`.
Deleting either would remove a regression guard: if a future spec ever reintroduces a `planned` item, both asserts
must be there to catch it going non-vacuous again.

---

## 4. FR-022 — corrected planned-probe supersession chain

Spec 040's own register (`040-settings-deep-links-subpages/protected-test-supersession-register.md`) states:
*"Spec 038 pointed the probe at `admin`; Spec 039 repointed it admin → settings."* **Git disproves the first
clause** — commit `4cbcb31` (Spec 038) still reads `admin` at that call site; Spec 038's sole supersession was
`nav010`'s `lockedFin`/`finLinks`, not the planned-probe target.

**The true chain (verified live against each commit named):**

| Spec | Probe action | Evidence |
|---|---|---|
| 034 | control → families | Spec 034 implementation record |
| 035 | families → teachers | Spec 035 implementation record |
| **036** | **teachers → admin** | commit `56bc418`, `run.cjs:227` |
| 038 | **no-op** on the planned probe — its sole supersession was `nav010` `lockedFin`/`finLinks` | `4cbcb31` still reads `admin` at the probe site |
| 039 | admin → settings | Spec 039 implementation record |
| 040 | **RETIRED** — the single-target probe is replaced in place by the sitewide `planned === 0 && comingSoon === 0` census (there is no longer a "next category with a planned item" to point at) | Spec 040 implementation record; `FUTURE_ROUTES` = `{}` |

**What this corrects:** Spec 040's narrative sentence in its own register, which skipped the 036 step and
misattributed a probe-repoint to 038 that 038 never made. **Spec 040's conclusion is unaffected** — the probe was
correctly retired either way; only the *history* of how it got to `admin` before that was mis-told.

**Action for 041:** publish this table (as done above) in place of the incorrect two-clause sentence, wherever the
041 documentation set narrates the probe's history (this contract; `CLAUDE.md` if it repeats the narrative;
`implementation-status.md` when written).

**What does NOT change:** no assert in `run.cjs` is edited by FR-022 itself — the repoints it describes (036,
039) and the retirement (040) already happened, in their own specs' commits. FR-022 is purely a correction to a
**narrative document**, not a new test action.

**Classification:** DOCUMENTATION CORRECTION (§1) — corrects prose in a register, touches no assertion.

**Evidence:** `spec.md` FR-022; `040-settings-deep-links-subpages/protected-test-supersession-register.md`
(the mis-narrated sentence); commit `56bc418` `run.cjs:227`; commit `4cbcb31` (038, `admin` unchanged);
`research.md` R-20 (cross-reference).

---

## 5. `CLAUDE.md` refresh (FR-019, SC-22)

**Drift found (must be closed by 041):** `CLAUDE.md` at the start of the 041 audit still named HEAD `4cbcb31` and
described Spec 039 as *"awaiting the watcher commit."* In fact **both Spec 039 (`58a53e2`) and Spec 040
(`21502af`) are committed.** Spec 040's own contracts logged this exact drift as Risk R9 and warned that *"any
supersession computed against `4cbcb31` is void."* Every count in Spec 041's artifacts is recomputed from
`21502af`, never inherited from `CLAUDE.md`'s stale prose.

**Required refresh — five elements, all sourced from this spec's own recomputation, none invented:**

| Element | Corrected content | Source |
|---|---|---|
| HEAD pointer | `4cbcb31` → **`21502af`** | `research.md` §2 baseline table |
| Spec 039/040 status | "awaiting the watcher commit" → **both COMMITTED** (`58a53e2`, `21502af`) | same |
| Frozen counts | 115 HTML · 57 bases · 64 admin / 50 portal / 1 index · 6 categories · 50 menu items · 49 implemented / 1 disabled / 0 planned · `FUTURE_ROUTES` `{}` · route split **24 deep-link + 25 plain + 1 route-less = 50** (post-D-1 reclassification) · orphan set exactly `{gallery.html, gallery.en.html}` | `spec.md` §3; `count-and-freeze-contract.md`; this spec's Final Frozen Counts block |
| The 041 redefinition | 041 = route/sidebar production freeze + D-1 (teachers MOVE) + D-2 (gallery orphan, frozen) + D-3 (topbar language-hash fix); NOT a redesign/feature/form-expansion/integration spec | `spec.md` §1 |
| Corrected supersession chain | the §4 table above (034→035→036→038 no-op→039→040 retired), replacing any residual reference to the incorrect two-clause 038/039 sentence | §4 above |

**Also record in `CLAUDE.md` (ownership, not a sweep — FR-023, Q-4):** `common.backendRequiredNote`
(`components/preview-drawer.js:32`, `formDrawer()`'s default `reasonKey`, rendered on ~50 pages, EN *"…nothing is
saved yet"*) is **NOT swept in 041**. Per `research.md` R-17, its owner is the **044 slot** — the maintainer-
amendment slot for the shared modal/drawer/long-form interaction system (the string is a **component default**,
not a stray literal; FO-23 already assigns that component to 044). Per the roadmap-provenance caveat (§0 above),
"044" names a maintainer intention, not a chartered spec; the assignment binds whichever spec is chartered into
that slot. Alternatives considered and rejected: dual owner "044/056" (the corpus's only prior statement, in a
findings section, in no contract — a dual owner is no owner); 056 (wrong topic — field completeness, not gate
copy); 057 (would make the final freeze the first place the sweep happens); sweeping it inside 041 (≈50 body
changes, far outside a route/sidebar freeze's impact boundary — R-17 §4/§5).

**What must NOT appear in the refreshed `CLAUDE.md`:** a rival count, a rival option letter for D-1/D-2/D-3, or
any invented spec number outside 042–057 as already named in `future-owner-register.md`. The refresh is
reconciliation with the tree at `21502af`, not a redesign of the roadmap.

---

## 6. `app/README.md` (optional — roadmap sync)

Prior specs' practice (e.g. Spec 040's commit-scope table lists `app/README.md` as one of the bundled files)
treats a README roadmap-sync note as optional, additive documentation — never a required behavioural change. If
041's implementation round touches it, the only permitted content is: the same HEAD pointer / committed-spec
status / frozen-count refresh as `CLAUDE.md` §5 above, restated for the README's audience. No new claim, no new
option, no new count not already frozen in this spec's artifacts.

---

## 7. `app/screenshots/REVIEW.md` (optional — verification record)

Per `impact-boundary.md` §1, this file is touched **only if** a later 041 round captures verification screenshots
(P6 of `plan.md` §15: a11y/screenshot rows for `teachers#view=add`, `teachers#view=categories`, and the
`settingsUsers` +1 frame). If written, it records the captured frames and their 0-console-error status
(remembering E-11: the screenshot suite's exit code is advisory only, never a gate — smoke + a11y are the gates).
It is not a required artifact of the specify/plan rounds and carries no route or count claim of its own; any count
it states must match §5 above.

---

## 8. Non-scope (what this contract does NOT authorize)

* It does **not** perform the `common.backendRequiredNote` copy sweep (owner named, not executed — §5, R-17).
* It does **not** perform legacy-capability reconciliation (CF-2/CF-3 — owner **042** slot, per the roadmap-
  provenance caveat §0; recorded, not resolved, here).
* It does **not** touch, weaken, or re-scope any protected assert — see §1's classification boundary. FR-020/
  FR-021/FR-022 are prose-only.
* It does **not** invent a spec number, option letter, or count beyond what `spec.md`, `research.md`, and
  `plan.md` already freeze. Where this contract cites a slot number (044), it is citing `future-owner-register.md`,
  not assigning it independently.

---

## 9. Evidence index

`spec.md` §1 (roadmap-provenance caveat), FR-019, FR-020, FR-021, FR-022, FR-023, §9 CF-1, SC-22, Q-4, Q-8.
`research.md` R-17, R-20. `plan.md` §2 (documentation drift), §8 ("Not supersessions" table), §10.4, §15 P7, §17
(Q-4, Q-8). `040-settings-deep-links-subpages/protected-test-supersession-register.md` (the mis-narrated
sentence). `040-settings-deep-links-subpages/future-owner-register.md` §1/§3 (roadmap provenance; 042–057 slot
names). `tests/smoke/run.cjs:2580-2581`, `:227` (the `truth010`/probe-history call sites). Commits `56bc418`
(036), `4cbcb31` (038), `58a53e2` (039), `21502af` (040).

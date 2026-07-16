# Spec 042 — RESUME CHECKPOINT

**Stopped deliberately** (usage-limit pause), not failed. Nothing is broken. Nothing is half-written into the app.

---

## 1. Repo state at the stop — SAFE

| Fact | Value |
|---|---|
| Branch | `feature/012-role-portal-foundation` |
| HEAD | **`de8d552`** (Spec 041 · committed by the watcher) |
| Commits made this session | **0** |
| `app/` dirty entries | **0** — no source, test, public HTML, script or `package.json` touched |
| Untracked | **only** `specs/042-exhaustive-legacy-capability-reconciliation/` (the deliverable) |
| Background processes | **none** — workflow + monitors stopped cleanly |

**No commit · no push · no branch · no stash · no reset · no checkout · no clean.**

## 2. Precondition gate — ALREADY PASSED (do not redo)

Spec 041 is committed as **`de8d552`** and all five required contents were verified **against the committed
tree**, not the commit message:

- `ROUTES_50` exact-route register present in committed `tests/smoke/run.cjs`
- 16/16 mutations (M-1…M-16) recorded in committed `implementation-status.md`
- **R-2** serious-a11y gate at `tests/a11y/run.cjs:393`; **R-3** console-error gate at `tests/screenshots/capture.cjs:556`
- 115 HTML · 57 bases · admin menu 50 · route split **24/25/1** · planned 0 · sole lock `classSalaryReport` · `FUTURE_ROUTES {}`
- impact 2 bodies / 62 sidebar-only / 51 byte-identical; orphan set = exactly `{gallery.html, gallery.en.html}`

## 3. Evidence corpus (established, verified, reusable)

| Side | Reality |
|---|---|
| Legacy | **339 pages** (admin 300 · teacher 26 · family 13) · **19 modules** · **1,162 screenshots** · **1,723 raw records** (679 HTML · 346 JSON · 359 MD · 339 TXT) · 829 skipped actions · 0 failed pages |
| Current | 115 HTML · **57 bases** · 50 admin nav items · 3 role portals (7/8/8) · 408 own screenshots |

**339/339 legacy pages assigned to a cluster — zero unassigned.** Every path reference verified to exist on
disk (0 broken).

Cluster weights (why Teachers and Finance dominate the remaining work):

| Cluster | Legacy pages | Buttons | Forms | Modals |
|---|---|---|---|---|
| **C02 Teachers** | **109** | 1,473 | **511** | 358 |
| **C07 Finance/Payments/Invoices** | 67 | 950 | 317 | 266 |
| C03 Students | 39 | 556 | 185 | 158 |
| C01 Dashboard & Home | 36 | 1,181 | 283 | 248 |
| C04 Families/Guardians | 31 | 614 | 184 | 129 |
| C09 Settings | 27 | 340 | 105 | 82 |
| C05 Courses & Groups | 26 | 593 | 175 | 154 |
| C06 Sessions/Schedule/Attendance | 24 | 363 | 103 | 95 |
| C14 General/Utilities | 19 | 100 | 26 | 26 |
| C08 Reports & Analytics | 17 | 264 | 82 | 82 |
| C10 Content/Materials/Certificates | 9 | 88 | 34 | 28 |
| C12 Staff/Profile/Roles | 9 | 169 | 38 | 25 |
| C11 Messages/Notifications/Leads | 5 | 68 | 25 | 20 |
| C13 Exams/Assignments/Results | 4 | 39 | 11 | 15 |
| C15 Auth/Public/Shared Shell | 0 (current-app shell/auth infra only) | — | — | — |

## 4. DONE — do not repeat

| Artifact | Status |
|---|---|
| `count-and-impact-contract.md` | ✅ written (documentation-only boundary; 115/57/50/24-25-1 frozen; MUST-BE-0-DIFF list) |
| `protected-test-carryover.md` | ✅ written (all Spec-041 gates; the **G-1 / T061** lesson; the **30 pre-existing `f-fbAdd` duplicate ids** formally assigned to **Spec 044**, not silently fixed) |
| `exhaustive-evidence-inventory.md` | ✅ written (corpus totals, per-cluster counts, 339/339 assigned) |
| `cluster-evidence-paths/` (15 files) | ✅ exact legacy record + screenshot + current-source paths per cluster |
| `cluster-audits/` — **C01…C06** | ✅ **6 of 15 cluster audits completed** (Dashboard · Teachers · Students · Families · Courses/Groups · Sessions/Schedule/Attendance) |

## 5. REMAINING — the resume work-list

1. **Cluster audits C07–C15** (9 left): Finance · Reports · Settings · Content/Certificates ·
   Messages/Leads · Staff/Roles · Exams/Results · General/Utilities · Auth/Shared-Shell.
   Method is binding: **open screenshots AS IMAGES**, read raw `pages/*.json` + `text/*.txt`, inspect current
   `app/src/js/**`, produce capability-level rows with the 12 dispositions. Honest `screenshotsOpened` /
   `recordsInspected` counts.
2. **9 cross-cutting artifacts**: `privacy-and-sensitive-data-findings.md` ·
   `cross-role-propagation-map.md` · `forms-completeness-ledger.md` ·
   `modal-drawer-interaction-ledger.md` · `empty-loading-error-state-ledger.md` ·
   `visual-quality-and-academic-design-audit.md` · `current-product-better-than-legacy-register.md` ·
   `rejected-legacy-behaviour-register.md` · `unknown-and-conflicting-evidence-register.md`
3. **Ownership allocation**: `page-review-ownership-map.md` (57 bases → Specs **045–050** as a strict
   **partition**; Teacher + Family dashboards get explicit priority) and `future-spec-allocation-register.md`.
4. **Adversarial completeness critic** → `checklists/requirements.md` (PASS/FAIL per quality gate).
5. **Still to write**: `spec.md` · `legacy-current-capability-ledger.md` ·
   `page-and-route-reconciliation.md` · `role-surface-reconciliation.md`.
6. **Final 23-point report** per the brief.

## 6. How to resume the workflow

```
Workflow({
  scriptPath: "/home/mekky/.claude/projects/-media-mekky-work-backend-dashboard-intelligence-crawler-academy-dashboard-discovery/3d428385-ca8d-4fa9-9579-59092b1a8f20/workflows/scripts/spec042-legacy-reconciliation-wf_91679282-87a.js",
  resumeFromRunId: "wf_91679282-87a",
  args: { …same args… }
})
```
Completed agents return **cached** results (the Inventory agent + the finished cluster audits), so the resume
picks up at the unfinished clusters.

**Journal**: `~/.claude/projects/…/subagents/workflows/wf_91679282-87a/journal.jsonl` — inspect it before
assuming a cached result is non-empty.

## 7. KNOWN BUG TO FIX ON RESUME (important)

The subagents **wrote their output files into the repo** (`academy-dashboard-discovery/clusters/` and
`evidence-inventory.md` at the disc root) instead of the absolute scratchpad path they were given. `app/` was
never touched, and I relocated everything into the Spec-042 directory — but on resume the script must **force
absolute output paths** (or write only into `${SPEC}/`) so the working tree is not polluted again.

## 8. Standing laws (unchanged)

Spec 042 is **documentation-only**: no app source, no tests, no public HTML, no nav edit, no new route, no
count change. Every gap ⇒ a **proposal with a named future owner**, never an edit. Never invent — unproven
evidence ⇒ `UNKNOWN_EVIDENCE` + owner. The watcher owns the commit.

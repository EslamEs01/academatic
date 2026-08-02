# Contract 1 — Evidence Reuse & Targeted Grounding

**Canonical sources** (paths relative to `specs/042-exhaustive-legacy-capability-reconciliation/` unless noted):
`future-spec-allocation-register.md` (ownership) · `cluster-audits/C01-audit.md`…`C15-audit.md` (findings) ·
`cluster-evidence-paths/C01-paths.md`…`C15-paths.md` (exact artifact paths) · `exhaustive-evidence-inventory.md`
(frozen corpus census) · `spec.md` §4 (method) · `plan.md` D1/D2 (referential law, precedence). Raw evidence lives
under `output/roles/<role>/…` (repo-root relative).

**Bound parties**: every future spec 043–057, and any later consumer of the Spec-042 corpus.

## 1. The consumption pipeline (mandatory order)

1. **Identify owned rows** — read your spec's own section of `future-spec-allocation-register.md` (§4–§18). Your
   scope is exactly your allocated `Cnn-mm` rows plus, for page groups 045–050, the review dimensions of
   `page-review-ownership-map.md` §3 over your owned bases. Nothing else is yours.
2. **Open the owning cluster audit(s)** — for each row, read the normalized table + finding text in
   `cluster-audits/Cnn-audit.md`. The audit row is the verified conclusion; start there, not from memory.
3. **Follow the paths file** — `cluster-evidence-paths/Cnn-paths.md` maps every legacy page in the cluster to its
   record (`.json`/`.md`), extracted text, raw + sanitized HTML, and screenshot paths. Never guess a path.
4. **Reopen ONLY owned-scope screenshots AS IMAGES** — use the Read tool on the `.png`. A filename is not
   inspection; extracted text is not evidence of layout (`spec.md` §4.1). Reopen the surfaces your rows touch,
   not the whole cluster.
5. **Inspect raw records** whenever a **field, action, permission or workflow** matters —
   `output/roles/<role>/pages/<slug>.json` and `html/raw/<slug>.html` beat any summary, always (`spec.md` §4.2).
   Current-app behavior is read directly from `app/src/js/**`, never inferred from a prior spec's claim (§4.3).
6. **Report honest reopen counts** — every consuming spec states how many screenshots it actually opened and how
   many raw records it actually read (`spec.md` §4.5). An under-grounded review is a finding, not a rounding error.
7. **Never re-verify corpus totals by full recrawl** — 339 legacy pages (300 admin / 26 teacher / 13 family),
   1,113 crawler screenshots, 1,723 raw record files (679 HTML + 346 JSON + 359 MD + 339 TXT) are frozen and
   already verified in `exhaustive-evidence-inventory.md`. Re-derive a total only if you allege the inventory is
   wrong — and that is a STOP-and-report, not a silent recount.

## 2. When to reopen evidence (the grounding gate)

Reopening is **required** when any trigger fires; when none fires, cite the audit row by `Cnn-mm` and move on.

| Trigger | Example |
|---|---|
| T1 — a **new binding visual contract** is being written for a surface | 045 writing the teacher-portal redesign acceptance |
| T2 — an **artifact conflict** is discovered | resolve per `plan.md` D2 precedence, from RAW evidence — never by picking the more convenient summary |
| T3 — a **page is assigned to redesign** | the 045–050 per-page loop begins by reopening that page's legacy screenshots (map §3 + the redesign handoff contract) |
| T4 — an audit **conclusion is converted to an implementation rule** | a `PARTIAL` row becoming a MUST in a future spec's requirements |

## 3. Standing laws

- **Thin and referential** (`plan.md` D1): anything not citable by path + stable ID (`Cnn-mm` · `RJ-nn` · `UK-nn` ·
  `P-nn` · `B-x.y` · `S/G/U/I/A-nn` · groups `045…050`) is not a planning input. Never copy a ledger table into a
  new document — cite the row.
- **Precedence** (`plan.md` D2): cluster audits (normalized tables) → consolidation ledgers/registers → prose →
  pre-consolidation proposals. Raw records beat all of them on questions of legacy fact.
- **Conflicts are recorded, not smoothed** (`spec.md` §4.4). Unresolvable evidence stays `UNKNOWN_EVIDENCE` with
  its existing owner — reopening is never a license to invent.
- Screenshots are opened with the Read tool as images. Batch-listing filenames, grepping OCR text, or trusting a
  prior spec's description of an image does NOT satisfy any trigger in §2.

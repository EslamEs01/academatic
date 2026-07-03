# Quickstart — verifying Spec 016 (docs-only)

No build/test commands are required. Verification is reading + counting + `git status`.

## 1. State verification (read-only)

```bash
git status --short          # expect ONLY: .specify/feature.json + the 016 spec folder
git log -1 --oneline        # expect HEAD 20dc089 (Spec 015 implemented & committed)
ls academy-dashboard-discovery/app/public/*.html | wc -l   # expect 49
```

## 2. Artifact walk (inspect each, checking its closure property)

| Artifact | What to verify |
|---|---|
| `frontend-audit-001-015.md` | all 15 specs have delivered/owned/deferred/excluded/weakness entries; verdict states zero broken/fake/silent-missing |
| `missing-pages-and-gaps-register.md` | 20 rows G1–G20; every row exactly one classification; totals sum to 20; `must-fix-before-continuing` = 0 |
| `role-dashboard-ia.md` | reclassification stated; home filenames kept; shell v2 + flat sidebar + drawer; nav maps 7/8/7 items |
| `role-dashboard-page-inventory.md` | student 6 / family 7 / teacher 6 internal pages; each with sections/sources/gates/covers; teacher table ends with the pay-exclusion row |
| `admin-sidebar-page-inventory.md` | 57 rows, zero unclassified; totals line reconciles (13/1/26/3/6/2/5/1); ownership 021×10 022×4 023×5 024×3 025×9 026×12 |
| `legacy-to-new-coverage-matrix.md` | 178 templates; zero uncategorized; zero needs-decision; closes with the reconciliation assertion |
| `role-dashboard-design-freeze.md` | every freeze-list category present; forbidden register present; change-control clause present |
| `future-spec-sequence.md` | 017–027 table with floors; the 8 machine-checkable 027 rules; projected ~145–150 files |
| `honesty-and-backendrequired-contract.md` | four classes; four gate patterns; the complete no-fake register; role hard lines |
| `legacy-screenshot-review.md` + `visual-reference-audit.md` | named frames inspected; the required visual-audit answers all present |

## 3. Cross-checks (zero-TBD sweep)

```bash
grep -rn "TBD\|TODO\|needs-decision" academy-dashboard-discovery/specs/016-*/*.md | grep -v "needs-decision rows: \*\*0\|needs-decision\` = 0\|zero needs-decision\|reopening"   # expect no genuine open markers
```
Also confirm by reading: register/matrix/inventory agree on destinations for spot samples (e.g., المحادثات→021 GATE · الرواتب→025 GATE zero-figures · فتح لوحة الأداء stays the teacher app's sanctioned link).

## 4. Spec-017 readiness test

A reader holding only `role-dashboard-ia.md` + `role-dashboard-design-freeze.md` + `future-spec-sequence.md` (017 row) + the contracts can answer, without new decisions: what 017 builds (shell v2 + registries + re-hosted homes + hub copy), what it may NOT touch (admin files, home content, sibling anything), its acceptance floor (shell on 4 pages, frozen nav maps, sanctioned-anchor registry, payHit green, 40 admin files identical), and its first docs task (CLAUDE.md pointer refresh). If yes — Spec 016 is complete.

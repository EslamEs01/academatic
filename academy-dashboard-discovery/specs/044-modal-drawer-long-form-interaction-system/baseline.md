# Accepted Pre-Implementation Baseline — Spec 044

**Captured/accepted:** 2026-08-02 before application or test implementation  
**Branch:** `044-modal-drawer-long-form-interaction-system`  
**Application baseline commit:** `7d2397b110f8d3311402d02f93719395b7d46e68`  
**Application diff at capture:** zero changed bytes under `academy-dashboard-discovery/app/`

This is not a new current-tree snapshot mislabeled as historical evidence. HEAD contains the committed Spec-043 correction and final evidence; only new Spec-044 documentation and root `.specify/feature.json` differed when this baseline was recorded.

## Repository and generated baseline

| Measure | Accepted value | Method/evidence |
|---|---:|---|
| Authored source files under `app/src` | 192 | direct current-tree file census at baseline |
| Product route sources | 57 | `build-html.mjs` page inventory |
| Generated HTML | 115 | 114 localized product pages + redirect `index.html` |
| Generated `#page-body` elements | 114 | exactly one on every product HTML; `index.html` is the sole explicit redirect exception; duplicates=0 |
| Interaction targets per locale | 234 | recursive `template.content` inventory |
| Form targets per locale | 72 | 58 top-level + 14 nested; direct controls only |
| Details targets per locale | 162 | nested forms do not reclassify their containing detail target |
| Confirmation consumers per locale | 160 | 97 destructive |
| Generic modal triggers per locale | 13 | separate current generic path |
| Dropdown/menu openers per locale | 405 | 75 row + 330 global menu-action openers |
| Mobile-sidebar openers per locale | 32 | existing open-drawer action |
| Dedicated-page wizards per locale | 1 | `add-family` |
| `common.backendRequiredNote` direct source consumer files | 7 | exact authored key census, excluding two locale definitions |
| Generated pages containing the key | 40 | 20 AR + 20 EN |
| Localized key consumer instances | 94 | 47 AR + 47 EN: 46 disabled-reason controls + one wizard modal trigger per locale |
| Duplicate nested field-ID records | 30 | 15 AR + 15 EN across attendance/course/group/sessions/teacher |

## Accepted verification baseline

The final Spec-043 evidence at the current baseline commit is valid because no `app/` byte changed afterward before Spec-044 implementation:

| Gate | Accepted result | Evidence |
|---|---|---|
| Build | exit 0; 114 product pages + index = 115 HTML; 69 icons; 0 missing | Spec-043 implementation status |
| Smoke | 114/114 page loads PASS | Spec-043 implementation status |
| Accessibility | 293 scenarios; critical=0; serious=0 | expanded committed Spec-043 matrix |
| Screenshots | 389 captures; console errors=0 | expanded committed Spec-043 matrix |
| Spec-043 mutations | MUT-1…MUT-11 + MUT-TP intended RED, final GREEN, residue=0 | Spec-043 mutation ledger/status |
| Whitespace | `git diff --check` PASS | fresh baseline check |

## Protected baseline

Protected Spec-043 smoke guards PAY28, teacher/family pay censuses, child-view, role isolation, ROUTES_50, no-external-request, no-secret, planned/coming-soon, orphan set, honest lock, real-PII, D-1, G1–G14, teacher policy, and mutation register remain authoritative. The accessibility critical/serious exit and screenshot console-error exit remain hard gates. Spec 044 plans additive guards only; no supersession is currently authorized.

## Final comparison rules

- Compare authored/generated application files against commit `7d2397b...`; do not use the documentation-modified current tree as a fake historical application baseline.
- Extract exactly one `#page-body` from each of the 114 product pages; handle redirect `index.html` explicitly and never hash an entire product file as a fallback.
- Fail for missing/duplicate body, unexpected path, parser failure, or seventh/unrelated drift.
- Explain every source, generated, count, and test-matrix change.


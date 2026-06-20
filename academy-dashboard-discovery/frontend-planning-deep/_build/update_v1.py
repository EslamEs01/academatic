#!/usr/bin/env python3
"""Non-destructively prepend an 'updated by exhaustive pass' banner to each v1 frontend-planning/ doc,
   pointing to its verified v2 counterpart. Idempotent."""
import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
V1=os.path.join(ROOT,"frontend-planning")
MAP={
 "00-source-reading-log.md":"00-output-manifest.md & 01-completeness-ledger.md (verified manifest of all 2,837 files; 339/339 pages, 0 gaps)",
 "01-discovery-summary.md":"18-final-deep-planning-summary.md (exhaustive read of all 339 pages)",
 "02-product-module-map.md":"07-product-module-map-v2.md",
 "03-role-page-inventory.md":"08-role-page-inventory-v2.md (178 templates) & 02-all-pages-expanded-inventory.md (every page)",
 "04-permission-and-navigation-matrix.md":"09-permission-navigation-matrix-v2.md",
 "05-component-inventory.md":"10-component-inventory-v2.md",
 "06-interactions-and-states.md":"11-interactions-states-v2.md & 05-distinct-interaction-catalog.md (66 distinct modals)",
 "07-data-and-api-surface.md":"12-data-api-surface-v2.md & 06-complete-data-surface.md (195 GET routes, 109 mutation endpoints)",
 "08-improved-information-architecture.md":"13-improved-information-architecture-v2.md",
 "09-design-system-direction.md":"14-design-system-direction-v2.md",
 "10-spec-splitting-plan.md":"15-spec-splitting-plan-v2.md & 19-spec-coverage-map.md (every page→spec, verified)",
 "11-next-spec-001-brief.md":"16-spec-001-brief-v2.md",
 "12-open-decisions.md":"17-open-decisions-v2.md",
 "13-final-planning-summary.md":"18-final-deep-planning-summary.md",
}
MARK="<!-- deep-v2-banner -->"
banner=lambda v2: (f"{MARK}\n> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **{v2}**.\n"
 "> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.\n\n")
n=0
for fn,v2 in MAP.items():
    p=os.path.join(V1,fn)
    if not os.path.exists(p): print("skip missing",fn); continue
    txt=open(p,encoding="utf-8").read()
    if MARK in txt: print("already",fn); continue
    open(p,"w",encoding="utf-8").write(banner(v2)+txt)
    n+=1; print("updated",fn)
print("updated",n,"v1 docs")

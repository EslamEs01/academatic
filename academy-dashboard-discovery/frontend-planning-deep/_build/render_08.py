#!/usr/bin/env python3
"""Render 08-role-page-inventory-v2.md: TEMPLATE-level inventory (variants collapsed),
   exact counts from the verified data. One row per route template."""
import os, json, collections
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
DEEP=os.path.join(ROOT,"frontend-planning-deep"); BUILD=os.path.join(DEEP,"_build")
pages=json.load(open(os.path.join(DEEP,"02-all-pages-expanded-inventory.json")))
cov=json.load(open(os.path.join(BUILD,"coverage.json")))
spec_of={r["slug"]:r["spec"] for r in cov["pages"]}
by_route=collections.defaultdict(list)
for p in pages: by_route[p["routeNorm"]].append(p)

# representative = shortest slug in group (usually the base)
def rep(group): return sorted(group, key=lambda p:(len(p["slug"]),p["slug"]))[0]

rows=[]
for route,group in by_route.items():
    r=rep(group)
    # meaningful modal count (exclude chrome)
    chrome={"add shortcuts","recent searches","","(untitled)","settings","details","new requests"}
    mm=[m for m in r["modals"] if (m["title"] or "").strip().lower() not in chrome]
    mf=[f for f in r["forms"] if f["action"] not in ("/management/logout","/management/search","/management/shortcuts","/teacher/logout","/teacher/shortcuts","/student/logout","/student/shortcuts","#","/")]
    rows.append({"route":route,"slug":r["slug"],"role":r["role"],
        "module":(r["modules"][0] if r["modules"] else ""),"display":r["display"] if "display" in r else r["displayName"],
        "variants":len(group),"http":r["httpStatus"],"spec":spec_of.get(r["slug"],"?"),
        "forms":len(mf),"modals":len(mm),"tables":len(r["tables"]),
        "fields":sum(len(f["fields"]) for f in mf),"filters":len(r["filters"]),"tabs":len([t for t in r["tabs"] if t])})

order={"admin":0,"teacher":1,"family":2}
rows.sort(key=lambda x:(order[x["role"]],x["module"],x["slug"]))

m=[]
m.append("# 08 — Role × Page Inventory (v2, template‑level, exhaustive)\n")
m.append("> Every captured page collapses into a **route template**; this lists all templates (variants folded in), with exact structural counts from the verified extraction and the spec each maps to. Per‑page detail is in [02](02-all-pages-expanded-inventory.md); coverage proof in [19](19-spec-coverage-map.md). Counts exclude global chrome (logout/search/shortcuts/Recent Searches).\n")
tot_templates=len(rows); tot_pages=len(pages)
m.append(f"**{tot_pages} captured pages → {tot_templates} route templates** (admin {sum(1 for r in rows if r['role']=='admin')}, teacher {sum(1 for r in rows if r['role']=='teacher')}, family {sum(1 for r in rows if r['role']=='family')}). 'var' = how many captured pages share this template (query‑param variants).\n")
cur=None
for r in rows:
    key=(r["role"],r["module"])
    if key!=cur:
        cur=key
        m.append(f"\n## {r['role']} · {r['module']}\n")
        m.append("| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |")
        m.append("|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|")
    flags=[]
    if r["http"]!=200: flags.append(f"HTTP {r['http']}")
    if r["variants"]>1: flags.append(f"{r['variants']-1} variants")
    m.append(f"| `{r['route'].replace('https://academatic.online','')}` | `{r['slug']}` | {r['variants']} | {r['spec']} | {r['forms']} | {r['fields']} | {r['modals']} | {r['tables']} | {r['filters']} | {r['tabs']} | {', '.join(flags)} |")
open(os.path.join(DEEP,"08-role-page-inventory-v2.md"),"w").write("\n".join(m)+"\n")
print("templates:",tot_templates,"from pages:",tot_pages)
print("admin templates:",sum(1 for r in rows if r['role']=='admin'),
      "teacher:",sum(1 for r in rows if r['role']=='teacher'),
      "family:",sum(1 for r in rows if r['role']=='family'))

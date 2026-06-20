#!/usr/bin/env python3
"""Render 02-all-pages-expanded-inventory.md (every page, structured) from the 02 JSON,
   and build MD-reading batches (by role+module) for the interpretation workflow."""
import os, json, collections, math
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "output"); DEEP = os.path.join(ROOT, "frontend-planning-deep")
BUILD = os.path.join(DEEP,"_build"); BATCH = os.path.join(BUILD,"batches")
os.makedirs(BATCH, exist_ok=True)
pages = json.load(open(os.path.join(DEEP,"02-all-pages-expanded-inventory.json")))

GLOBAL_MODALS = {"add shortcuts","recent searches","","(untitled)"}
def primary_module(p): return (p["modules"][0] if p["modules"] else "General / Unknown")

# ---------- render 02 md (grouped role -> module -> page)
groups = collections.defaultdict(lambda: collections.defaultdict(list))
for p in pages: groups[p["role"]][primary_module(p)].append(p)

m = []
m.append("# 02 — All Pages Expanded Inventory (every page)\n")
m.append("> Machine-rendered from **all 339 page JSONs** (`02-all-pages-expanded-inventory.json`). One block per page, grouped role → module. Structured facts are authoritative (extracted, not sampled). Interpretive notes (purpose, UX) are layered by the MD-reading workflow into the v2 docs. Global chrome modals (Add shortcuts / Recent Searches / untitled) are omitted per page for signal.\n")
order = ["admin","teacher","family"]
for role in order:
    m.append(f"\n# ===== ROLE: {role} ({sum(len(v) for v in groups[role].values())} pages) =====\n")
    for module in sorted(groups[role].keys()):
        plist = sorted(groups[role][module], key=lambda x:x["slug"])
        m.append(f"\n## {role} · {module} ({len(plist)} pages)\n")
        for p in plist:
            flags = []
            if p["httpStatus"]!=200: flags.append(f"HTTP {p['httpStatus']}")
            if p["isErrorPage"]: flags.append("ERROR")
            fl = (" — **"+", ".join(flags)+"**") if flags else ""
            m.append(f"### `{p['slug']}` — {p['displayName']}{fl}")
            m.append(f"- route: `{p['routeNorm']}`  ·  modules: {', '.join(p['modules']) or '—'}")
            if p["headings"]:
                hs = [h for h in p["headings"] if h and h.strip()][:14]
                if hs: m.append(f"- sections/headings: {', '.join(h.strip()[:40] for h in hs)}")
            if p["cards"]:
                cs=[c['title'] for c in p['cards'] if c['title']][:14]
                if cs: m.append(f"- cards/KPIs: {', '.join(cs)}")
            for t in p["tables"]:
                cols = [c for c in t["columns"] if c]
                if cols: m.append(f"- table ({t['rowCount']} rows): {', '.join(str(c)[:24] for c in cols[:14])}")
            # meaningful forms (skip pure-chrome logout/search/shortcuts)
            mf = [f for f in p["forms"] if f["action"] not in ("/management/logout","/management/search","/management/shortcuts","/teacher/logout","/teacher/shortcuts","/student/logout","/student/shortcuts")]
            for f in mf[:12]:
                named = [x["name"] for x in f["fields"] if x["name"] and not x["name"].startswith("_")]
                if named or f["action"] not in ("#","/"):
                    m.append(f"- form `{f['method']} {f['action']}` fields: {', '.join(named[:18]) or '(no named fields)'}")
            mm = [md for md in p["modals"] if (md['title'] or '').strip().lower() not in GLOBAL_MODALS]
            for md in mm[:18]:
                fields = [x for x in md["fieldNames"] if x][:10]
                extra = (" fields: "+", ".join(fields)) if fields else ""
                m.append(f"- modal: **{md['title'] or '(untitled)'}** [{md['kind']}/{md['source']}]{extra}")
            if p["filters"]:
                fn=[f['name'] for f in p['filters'] if f['name']][:14]
                if fn: m.append(f"- filters: {', '.join(fn)}")
            if p["tabs"]:
                tn=[t for t in p['tabs'] if t][:14]
                if tn: m.append(f"- tabs: {', '.join(tn)}")
            if p["unsafeSkipped"]:
                m.append(f"- ⚠ unsafe-skipped: {', '.join((u['text'] or u['category']) for u in p['unsafeSkipped'][:8])}")
            bc = p["buttons_by_cat"]
            m.append(f"- buttons: {sum(bc.values())} (mutating {bc.get('mutating',0)}, submit {bc.get('submit',0)}, nav {bc.get('navigation',0)}, open_ui {bc.get('open_ui',0)})")
            if p["network_endpoints"]:
                eps=[e for e in p["network_endpoints"] if "/management/" in e or "/teacher/" in e or "/student/" in e][:10]
                if eps: m.append(f"- app endpoints touched: {', '.join(eps)}")
            m.append(f"- screenshot: `output/roles/{role}/screenshots/{p['slug']}-full.png`")
            m.append("")
open(os.path.join(DEEP,"02-all-pages-expanded-inventory.md"),"w").write("\n".join(m)+"\n")
print("02 md lines:", len(m))

# ---------- build MD-reading batches (by role+module, cap ~18 files/batch)
CAP=18
batches=[]
idx=0
for role in order:
    for module in sorted(groups[role].keys()):
        plist=sorted(groups[role][module], key=lambda x:x["slug"])
        nchunks=math.ceil(len(plist)/CAP)
        for c in range(nchunks):
            chunk=plist[c*CAP:(c+1)*CAP]
            label=f"{role}:{module}"+(f" [{c+1}/{nchunks}]" if nchunks>1 else "")
            paths=[f"output/roles/{role}/pages/{p['slug']}.md" for p in chunk]
            bf=os.path.join(BATCH, f"batch_{idx:02d}.txt")
            open(bf,"w").write("\n".join(paths)+"\n")
            batches.append({"idx":idx,"role":role,"module":module,"label":label,
                            "listFile":f"frontend-planning-deep/_build/batches/batch_{idx:02d}.txt",
                            "count":len(chunk),"slugs":[p['slug'] for p in chunk]})
            idx+=1
json.dump(batches, open(os.path.join(BUILD,"md_batches.json"),"w"), indent=1)
print("batches:", len(batches), "covering", sum(b['count'] for b in batches), "md files")
for b in batches: print(f"  {b['idx']:02d} {b['count']:2d} {b['label']}")

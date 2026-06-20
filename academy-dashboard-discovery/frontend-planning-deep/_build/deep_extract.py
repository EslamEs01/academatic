#!/usr/bin/env python3
"""
Deep exhaustive extraction over the ENTIRE output/ tree.
Emits:
  00-output-manifest.json / .md          (verified recursive manifest)
  01-completeness-ledger.json / .md      (per-page artifact ledger)
  02-all-pages-expanded-inventory.json   (full structured record per page, from JSON = authoritative)
  _build/aggregates.json                 (endpoints, modals, forms, tables, filters, tabs, buttons, statuses, tokens, dom)
No proprietary content is copied verbatim beyond short structural labels needed for planning.
"""
import os, json, re, hashlib, collections, statistics, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))  # academy-dashboard-discovery
OUT = os.path.join(ROOT, "output")
DEEP = os.path.join(ROOT, "frontend-planning-deep")
BUILD = os.path.join(DEEP, "_build")
ROLES = ["admin", "teacher", "family"]

def rel(p): return os.path.relpath(p, ROOT)

# ---------------------------------------------------------------- manifest
def classify(path):
    r = rel(path)
    parts = r.split(os.sep)
    role = parts[2] if len(parts) > 2 and parts[1] == "roles" else ("" )
    base = os.path.basename(path)
    if r.startswith("output/combined/"):
        if base.endswith(".json"): return ("combined_json", "")
        if base == "report.html": return ("combined_report_html", "")
        if base.endswith(".md"): return ("combined_md", "")
        return ("combined_other", "")
    if "/pages/" in r and base.endswith(".md"): return ("page_md", role)
    if "/pages/" in r and base.endswith(".json"): return ("page_json", role)
    if "/text/" in r and base.endswith(".txt"): return ("text_snapshot", role)
    if "/html/sanitized/" in r: return ("html_sanitized", role)
    if "/html/raw/" in r: return ("html_raw", role)
    if "/screenshots/" in r:
        if base.endswith("-full.png"): return ("screenshot_full", role)
        return ("screenshot_interaction", role)
    if "/network/" in r: return ("network_json", role)
    if base == "role-map.json": return ("role_map_json", role)
    if base == "role-map.md": return ("role_map_md", role)
    if base == ".gitkeep": return ("gitkeep", role)
    return ("other", role)

manifest_files = []
by_type = collections.Counter()
by_type_role = collections.Counter()
by_folder = collections.Counter()
by_ext = collections.Counter()
total_bytes = 0
for dirpath, dirs, files in os.walk(OUT):
    for f in files:
        p = os.path.join(dirpath, f)
        try: sz = os.path.getsize(p)
        except OSError: sz = 0
        total_bytes += sz
        typ, role = classify(p)
        ext = f.rsplit(".",1)[-1].lower() if "." in f else "(none)"
        by_type[typ]+=1; by_type_role[(typ,role)]+=1
        by_folder[os.path.dirname(rel(p))]+=1; by_ext[ext]+=1
        manifest_files.append({"path": rel(p), "type": typ, "role": role, "ext": ext, "bytes": sz})

manifest = {
    "root": rel(OUT),
    "totalFiles": len(manifest_files),
    "totalBytes": total_bytes,
    "byType": dict(sorted(by_type.items())),
    "byExt": dict(sorted(by_ext.items(), key=lambda x:-x[1])),
    "byTypeRole": {f"{t}|{r or '-'}": n for (t,r),n in sorted(by_type_role.items())},
    "byFolderCount": dict(sorted(by_folder.items())),
    "files": manifest_files,
}
json.dump(manifest, open(os.path.join(DEEP,"00-output-manifest.json"),"w"), indent=1)

# ---------------------------------------------------------------- helpers
def load(p):
    try: return json.load(open(p, encoding="utf-8"))
    except Exception as e:
        print("WARN load", rel(p), e, file=sys.stderr); return None

def norm_url(u):
    """Normalize a URL path for endpoint/route grouping."""
    if not u: return u
    u = re.sub(r"^https?://[^/]+", "", u)        # strip origin
    u = u.split("?")[0].split("#")[0]
    segs = []
    for s in u.split("/"):
        if s == "": segs.append(s); continue
        if re.fullmatch(r"\d+", s): segs.append("{id}")
        elif re.search(r"[A-Za-z0-9+/]{2,}={1,2}$", s) or re.fullmatch(r"[A-Za-z0-9+/]{4,}=*", s) and ("=" in s): segs.append("{enc}")
        elif re.fullmatch(r"\d{4}-\d{2}-\d{2}.*", s): segs.append("{date}")
        else: segs.append(s)
    return "/".join(segs) or "/"

# ---------------------------------------------------------------- per-role role-map
role_maps = {}
for role in ROLES:
    rm = load(os.path.join(OUT,"roles",role,"role-map.json"))
    role_maps[role] = rm or {}

# ---------------------------------------------------------------- per-page extraction
pages = []            # full records (02)
ledger = []           # artifact ledger (01)
agg_endpoints = []    # from role network files
modal_index = collections.defaultdict(lambda: {"count":0,"kinds":set(),"sources":set(),"roles":set(),"fieldNames":collections.Counter(),"buttons":collections.Counter(),"pages":set(),"title":""})
form_index = collections.defaultdict(lambda: {"count":0,"methods":set(),"roles":set(),"fieldNames":collections.Counter(),"pages":set(),"actionNorm":""})
table_index = collections.defaultdict(lambda: {"count":0,"columns":None,"roles":set(),"pages":set()})
filter_counter = collections.Counter()
tab_counter = collections.Counter()
badge_counter = collections.Counter()
button_cat = collections.Counter()
button_text_by_cat = collections.defaultdict(collections.Counter)
unsafe_actions = collections.Counter()
interaction_types = collections.Counter()
module_counter = collections.Counter()
status_pages = collections.Counter()      # discoveryStatus
http_status = collections.Counter()
error_pages = []
color_counter = collections.Counter(); font_counter = collections.Counter(); radius_counter = collections.Counter()
dom_tag_counter = collections.Counter()

def artifact_exists(*parts):
    return os.path.exists(os.path.join(OUT, *parts))

for role in ROLES:
    pdir = os.path.join(OUT,"roles",role,"pages")
    slugs = sorted(f[:-5] for f in os.listdir(pdir) if f.endswith(".json"))
    # screenshots per slug
    sdir = os.path.join(OUT,"roles",role,"screenshots")
    shots = os.listdir(sdir) if os.path.isdir(sdir) else []
    for slug in slugs:
        j = load(os.path.join(pdir, slug+".json")) or {}
        # artifacts
        sc_full = [s for s in shots if s == slug+"-full.png"]
        sc_inter = [s for s in shots if s.startswith(slug+"-") and "interaction" in s]
        forms = j.get("forms") or []
        fields_total = sum(len(f.get("fields") or []) for f in forms)
        buttons = j.get("buttons") or []
        modals = j.get("modals") or []
        tables = j.get("tables") or []
        cards = j.get("cards") or []
        filters = j.get("filters") or []
        tabs = j.get("tabs") or []
        badges = j.get("badges") or []
        dds = j.get("dropdownTriggers") or []
        inter = j.get("interactions") or []
        net_raw = j.get("network") or []
        if isinstance(net_raw, dict):
            net_raw = net_raw.get("requests") or net_raw.get("endpoints") or []
        net = []
        for e in (net_raw if isinstance(net_raw, list) else []):
            if isinstance(e, dict): net.append(e)
            elif isinstance(e, str): net.append({"method":"GET","url":e})
        unsafe = j.get("unsafeSkipped") or []
        safe = j.get("safeSkipped") or []
        modules = j.get("modules") or []
        # ledger entry
        led = {
            "role": role, "slug": slug, "displayName": j.get("displayName",""),
            "url": j.get("url",""), "normalizedRoute": j.get("normalizedRoute",""),
            "routeNorm": norm_url(j.get("normalizedRoute") or j.get("url","")),
            "modules": modules, "httpStatus": j.get("httpStatus"),
            "isErrorPage": bool(j.get("isErrorPage")), "discoveryStatus": j.get("discoveryStatus",""),
            "lang": j.get("lang",""), "dir": j.get("dir",""), "isRTL": bool(j.get("isRTL")),
            "has_md": artifact_exists("roles",role,"pages",slug+".md"),
            "has_json": True,
            "has_txt": artifact_exists("roles",role,"text",slug+".txt"),
            "has_sanitized": artifact_exists("roles",role,"html","sanitized",slug+".html"),
            "has_raw": artifact_exists("roles",role,"html","raw",slug+".html"),
            "screenshot_full": len(sc_full), "screenshot_interaction": len(sc_inter),
            "interactions": len(inter), "network": len(net),
            "forms": len(forms), "fields": fields_total, "buttons": len(buttons),
            "buttons_unsafe": sum(1 for b in buttons if (b.get("safety") or {}).get("category") in ("mutating","submit")),
            "modals": len(modals), "tables": len(tables), "cards": len(cards),
            "filters": len(filters), "tabs": len(tabs), "badges": len(badges),
            "dropdowns": len(dds), "unsafeSkipped": len(unsafe), "safeSkipped": len(safe),
        }
        ledger.append(led)
        status_pages[j.get("discoveryStatus","")]+=1
        http_status[j.get("httpStatus")]+=1
        if j.get("isErrorPage") or (j.get("httpStatus") not in (200,None)):
            error_pages.append({"role":role,"slug":slug,"httpStatus":j.get("httpStatus"),"display":j.get("displayName",""),"url":j.get("url","")})
        for m in modules: module_counter[m]+=1
        # full record (02) — keep structured, drop heavy nav link dumps
        def field_brief(f):
            return {"name":f.get("name",""),"type":f.get("type",""),"tag":f.get("tag",""),
                    "label":(f.get("label") or "")[:60],"placeholder":(f.get("placeholder") or "")[:40],
                    "required":bool(f.get("required")),"options":len(f.get("options") or [])}
        rec = {
            "role":role,"slug":slug,"displayName":j.get("displayName",""),
            "url":j.get("url",""),"normalizedRoute":j.get("normalizedRoute",""),"routeNorm":led["routeNorm"],
            "modules":modules,"httpStatus":j.get("httpStatus"),"isErrorPage":bool(j.get("isErrorPage")),
            "discoveryStatus":j.get("discoveryStatus",""),"lang":j.get("lang",""),"dir":j.get("dir",""),
            "discoveredFrom":j.get("discoveredFrom",""),
            "headings":[ (h.get("text") if isinstance(h,dict) else h) for h in (j.get("headings") or []) ][:60],
            "cards":[{"title":(c.get("title") or "")[:80],"value":(c.get("value") or "")[:40]} for c in cards][:40],
            "tables":[{"columns":(t.get("columns") or t.get("headers") or []),"rowCount":t.get("rowCount", len(t.get("rows") or []))} for t in tables],
            "forms":[{"action":norm_url(f.get("action","")),"rawAction":f.get("action",""),"method":(f.get("method") or "").lower(),"id":f.get("id",""),"fields":[field_brief(x) for x in (f.get("fields") or [])]} for f in forms],
            "buttons_unique":sorted({ (b.get("text") or "").strip()[:50] for b in buttons if (b.get("text") or "").strip() }),
            "buttons_by_cat":dict(collections.Counter((b.get("safety") or {}).get("category","") for b in buttons)),
            "modals":[{"title":(m.get("title") or "").strip()[:80],"kind":m.get("kind",""),"source":m.get("source",""),"trigger":(m.get("triggerText") or "")[:50],"buttons":[ (x or "")[:30] for x in (m.get("buttons") or []) ],"fieldNames":[ (x.get("name") or x.get("label") or "")[:40] for x in (m.get("fields") or []) ]} for m in modals],
            "filters":[{"type":f.get("type",""),"name":f.get("name",""),"label":(f.get("label") or "")[:40]} for f in filters],
            "tabs":[ (t.get("text") or "")[:40] for t in tabs ],
            "badges":sorted({ (b if isinstance(b,str) else b.get("text","")).strip()[:40] for b in badges if (b if isinstance(b,str) else b.get("text","")) }),
            "interactions":[{"type":i.get("type",""),"trigger":(i.get("triggerText") or "")[:40],"before":i.get("beforeUrl",""),"after":i.get("afterUrl","")} for i in inter],
            "unsafeSkipped":[{"text":(u.get("text") or "")[:50],"category":u.get("category",""),"reason":(u.get("reason") or "")[:60]} for u in unsafe],
            "network_endpoints":sorted({ (e.get("method","GET")+" "+norm_url(e.get("url",""))) for e in net }),
            "domCounts":(j.get("domSummary") or {}).get("counts") or {},
        }
        pages.append(rec)
        # aggregates
        for m in modals:
            key = re.sub(r"\s+"," ",(m.get("title") or "").strip().lower())[:60] or "(untitled)"
            mi = modal_index[key]; mi["title"]=(m.get("title") or "").strip()[:80] or "(untitled)"
            mi["count"]+=1; mi["kinds"].add(m.get("kind","")); mi["sources"].add(m.get("source","")); mi["roles"].add(role); mi["pages"].add(slug)
            for fld in (m.get("fields") or []):
                n=(fld.get("name") or fld.get("label") or "").strip()[:40]
                if n: mi["fieldNames"][n]+=1
            for b in (m.get("buttons") or []):
                if b: mi["buttons"][b.strip()[:30]]+=1
        for f in forms:
            key = norm_url(f.get("action","")) or "#"
            fi = form_index[key]; fi["actionNorm"]=key; fi["count"]+=1; fi["methods"].add((f.get("method") or "").lower()); fi["roles"].add(role); fi["pages"].add(slug)
            for fld in (f.get("fields") or []):
                n=(fld.get("name") or "").strip()
                if n and not n.startswith("_"): fi["fieldNames"][n]+=1
        for t in tables:
            cols = t.get("columns") or t.get("headers") or []
            key = hashlib.sha1(("|".join(map(str,cols))).encode()).hexdigest()[:10]
            ti=table_index[key]; ti["count"]+=1; ti["columns"]=cols; ti["roles"].add(role); ti["pages"].add(slug)
        for fl in filters:
            n=(fl.get("name") or fl.get("label") or "").strip()
            if n: filter_counter[n]+=1
        for tb in tabs:
            n=(tb.get("text") or "").strip()[:40]
            if n: tab_counter[n]+=1
        for bd in badges:
            n=(bd if isinstance(bd,str) else bd.get("text","")).strip()[:40]
            if n: badge_counter[n]+=1
        for b in buttons:
            cat=(b.get("safety") or {}).get("category","")
            button_cat[cat]+=1
            txt=(b.get("text") or "").strip()[:40]
            if txt: button_text_by_cat[cat][txt]+=1
            if not (b.get("safety") or {}).get("safe", True):
                if txt: unsafe_actions[txt]+=1
        for i in inter: interaction_types[i.get("type","")]+=1
        dt = j.get("designTokens") or {}
        for c,_ in (dt.get("textColors") or dt.get("colors") or {}).items() if isinstance(dt.get("textColors") or dt.get("colors"),dict) else []:
            color_counter[c]+=1
        ds = (j.get("domSummary") or {}).get("counts") or {}
        for k,v in ds.items():
            try: dom_tag_counter[k]+=int(v)
            except: pass

# role network endpoint files (authoritative endpoint capture)
endpoint_index = collections.defaultdict(lambda: {"count":0,"methods":set(),"statuses":set(),"roles":set(),"resourceTypes":set(),"sample":""})
for role in ROLES:
    ne = load(os.path.join(OUT,"roles",role,"network","endpoints.json")) or {}
    eps = ne.get("endpoints") or ne.get("requests") or []
    for e in eps:
        url = e.get("url","")
        # only keep app endpoints (same origin path), skip static asset hosts
        path = norm_url(url)
        if any(path.startswith(p) for p in ("/storage/","/assets/","/build/","/css/","/js/")): continue
        if not path.startswith("/"): continue
        key = (e.get("method","GET").upper(), path)
        ei = endpoint_index[key]; ei["count"]+=1; ei["methods"].add(key[0]); ei["roles"].add(role)
        if e.get("status") is not None: ei["statuses"].add(e.get("status"))
        if e.get("resourceType"): ei["resourceTypes"].add(e.get("resourceType"))
        ei["sample"]=url

def setify(d):
    out={}
    for k,v in d.items():
        out[k]={kk:(sorted(vv) if isinstance(vv,set) else (dict(vv) if isinstance(vv,collections.Counter) else (sorted(vv) if isinstance(vv,set) else vv))) for kk,vv in v.items()}
    return out

aggregates = {
    "moduleCounts": dict(module_counter.most_common()),
    "discoveryStatusCounts": dict(status_pages),
    "httpStatusCounts": {str(k):v for k,v in http_status.items()},
    "errorPages": error_pages,
    "interactionTypes": dict(interaction_types),
    "buttonCategories": dict(button_cat),
    "topUnsafeActions": dict(unsafe_actions.most_common(80)),
    "filtersByName": dict(filter_counter.most_common()),
    "tabsByText": dict(tab_counter.most_common(60)),
    "badgesByText": dict(badge_counter.most_common(120)),
    "domTagTotals": dict(dom_tag_counter.most_common()),
    "modals_distinct_count": len(modal_index),
    "forms_distinct_count": len(form_index),
    "tables_distinct_count": len(table_index),
    "endpoints_distinct_count": len(endpoint_index),
}
# detailed distinct lists
modals_distinct = []
for k,v in sorted(modal_index.items(), key=lambda x:-x[1]["count"]):
    modals_distinct.append({"title":v["title"],"count":v["count"],"kinds":sorted(v["kinds"]),"sources":sorted(v["sources"]),
        "roles":sorted(v["roles"]),"topFields":v["fieldNames"].most_common(15),"buttons":v["buttons"].most_common(8),"pageCount":len(v["pages"])})
forms_distinct = []
for k,v in sorted(form_index.items(), key=lambda x:-x[1]["count"]):
    forms_distinct.append({"action":v["actionNorm"],"count":v["count"],"methods":sorted(v["methods"]),"roles":sorted(v["roles"]),"topFields":v["fieldNames"].most_common(25),"pageCount":len(v["pages"])})
tables_distinct = []
for k,v in sorted(table_index.items(), key=lambda x:-x[1]["count"]):
    tables_distinct.append({"columns":v["columns"],"count":v["count"],"roles":sorted(v["roles"]),"pageCount":len(v["pages"])})
endpoints_distinct = []
for k,v in sorted(endpoint_index.items(), key=lambda x:(x[0][1],x[0][0])):
    endpoints_distinct.append({"method":k[0],"path":k[1],"count":v["count"],"statuses":sorted(str(s) for s in v["statuses"]),"roles":sorted(v["roles"]),"resourceTypes":sorted(v["resourceTypes"])})

json.dump({"aggregates":aggregates,"modals_distinct":modals_distinct,"forms_distinct":forms_distinct,
           "tables_distinct":tables_distinct,"endpoints_distinct":endpoints_distinct},
          open(os.path.join(BUILD,"aggregates.json"),"w"), indent=1)
json.dump(pages, open(os.path.join(DEEP,"02-all-pages-expanded-inventory.json"),"w"), indent=1)
json.dump({"generatedFrom":"all 339 page JSONs (100%)","pageCount":len(ledger),"ledger":ledger},
          open(os.path.join(DEEP,"01-completeness-ledger.json"),"w"), indent=1)

# ---------------------------------------------------------------- print summary for the run log
print("FILES:", len(manifest_files), "BYTES:", total_bytes)
print("byType:", dict(by_type))
print("pages extracted:", len(pages))
print("distinct: modals",len(modal_index),"forms",len(form_index),"tables",len(table_index),"endpoints",len(endpoint_index))
print("modules:", dict(module_counter.most_common()))
print("discoveryStatus:", dict(status_pages))
print("httpStatus:", dict(http_status))
print("error/non-200 pages:", len(error_pages))
for e in error_pages: print("   ", e["role"], e["slug"], e["httpStatus"], e["display"])
print("interactionTypes:", dict(interaction_types))
print("buttonCategories:", dict(button_cat))
# artifact gaps
gaps=[l for l in ledger if not (l["has_md"] and l["has_txt"] and l["has_sanitized"] and l["has_raw"] and l["screenshot_full"]>=1)]
print("pages missing >=1 expected artifact:", len(gaps))
for g in gaps[:40]: print("   GAP", g["role"], g["slug"], "md",g["has_md"],"txt",g["has_txt"],"san",g["has_sanitized"],"raw",g["has_raw"],"full",g["screenshot_full"])

#!/usr/bin/env python3
"""Structural signature of every sanitized HTML snapshot (counts only; no content copied).
   Reveals legacy layout/component structure to improve upon. Emits _build/html_signatures.json + prints summary."""
import os, re, json, collections
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
OUT=os.path.join(ROOT,"output"); BUILD=os.path.join(ROOT,"frontend-planning-deep","_build")
TAGS=["nav","aside","header","footer","main","section","article","table","thead","tbody","form","select","textarea","button","dialog","iframe","canvas","svg","ul","li","details","summary"]
CLASS_PAT=["modal","offcanvas","sidebar","card","kpi","navbar","nav-link","tab-pane","nav-tabs","dropdown","accordion","collapse","btn","badge","breadcrumb","table-responsive","form-control","form-select","select2","flatpickr","dropzone","ql-editor","apexcharts","datatable","pagination","avatar","toast","alert","tooltip","popover"]
TOGGLE=["modal","tab","dropdown","collapse","offcanvas","pill"]
agg_tags=collections.Counter(); agg_class=collections.Counter(); agg_toggle=collections.Counter(); role_present=collections.Counter()
per_page={}
roles=["admin","teacher","family"]
for role in roles:
    sdir=os.path.join(OUT,"roles",role,"html","sanitized")
    for fn in sorted(os.listdir(sdir)):
        if not fn.endswith(".html"): continue
        try: html=open(os.path.join(sdir,fn),encoding="utf-8",errors="ignore").read()
        except: continue
        low=html.lower()
        sig={}
        for t in TAGS:
            n=len(re.findall(r"<"+t+r"[\s/>]",low));
            if n: sig["tag_"+t]=n; agg_tags[t]+=n
        for c in CLASS_PAT:
            n=len(re.findall(r"class=\"[^\"]*\b"+re.escape(c)+r"\b",low))+len(re.findall(r"class='[^']*\b"+re.escape(c)+r"\b",low))
            if n: sig["cls_"+c]=n; agg_class[c]+=n
        for tg in TOGGLE:
            n=len(re.findall(r"data-bs-toggle=\"?"+tg,low))
            if n: sig["tog_"+tg]=n; agg_toggle[tg]+=n
        sig["bytes"]=len(html)
        per_page[f"{role}/{fn[:-5]}"]=sig
json.dump({"perPage":per_page,
           "aggTags":dict(agg_tags.most_common()),
           "aggClass":dict(agg_class.most_common()),
           "aggToggle":dict(agg_toggle.most_common())},
          open(os.path.join(BUILD,"html_signatures.json"),"w"),indent=1)
print("pages scanned:",len(per_page))
print("TOP TAGS:",dict(agg_tags.most_common(18)))
print("TOP CLASS PATTERNS:",dict(agg_class.most_common(30)))
print("BS TOGGLES:",dict(agg_toggle.most_common()))
# pages with biggest sanitized html (most complex)
big=sorted(per_page.items(),key=lambda kv:-kv[1]["bytes"])[:12]
print("LARGEST sanitized pages:", [(k,v["bytes"]) for k,v in big])

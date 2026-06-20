#!/usr/bin/env python3
"""Render 05-distinct-interaction-catalog.md and 06-complete-data-surface.md
   from the authoritative aggregates (all 339 JSONs). Data-driven & exhaustive."""
import os, json, re, collections
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
DEEP=os.path.join(ROOT,"frontend-planning-deep"); BUILD=os.path.join(DEEP,"_build")
agg=json.load(open(os.path.join(BUILD,"aggregates.json")))
A=agg["aggregates"]

GLOBAL_CHROME={"add shortcuts","recent searches","","(untitled)","settings","details","new requests"}
MUT_WORDS=("save","submit","send","delete","cancel","generate","approve","suspend","stop","deactivate","remove","add","update","create","assign","pay","request","import","reset password","execute","reject")
def danger(title, buttons):
    blob=(title+" "+" ".join(b for b,_ in buttons)).lower()
    return any(w in blob for w in MUT_WORDS)

# ---------------- 05 distinct interaction catalog
m=[]
m.append("# 05 — Distinct Interaction Catalog\n")
m.append("> Deduplicated from **all 339 page JSONs** (`_build/aggregates.json`). The crawler instance‑counted 1,373 modals / 551 dropdown opens etc.; collapsed here to the **distinct** set. Each modal: title, roles, kind/source, dominant fields, buttons, danger flag, and how many pages embed it. Global chrome (Add shortcuts / Recent Searches / logout / search) is listed once and excluded from per‑module counts.\n")
m.append(f"**Distinct counts:** {A['modals_distinct_count']} modals · {A['forms_distinct_count']} form‑actions · {A['tables_distinct_count']} table shapes · {A['endpoints_distinct_count']} app endpoints.\n")
m.append("**Interaction types exercised (safe, read‑only):** " + ", ".join(f"{k}={v}" for k,v in A["interactionTypes"].items()) + ".\n")
m.append("**Button safety classes (all pages):** " + ", ".join(f"{k or '(none)'}={v}" for k,v in A["buttonCategories"].items()) + ".\n")

m.append("## A. Global chrome (build once, exclude from module counts)\n")
m.append("| Modal/Control | Instances | Note |\n|---|--:|---|")
chrome=[x for x in agg["modals_distinct"] if x["title"].strip().lower() in ("add shortcuts","recent searches","(untitled)","")]
for x in chrome:
    m.append(f"| {x['title'] or '(untitled placeholder)'} | {x['count']} | repeated on nearly every page |")
m.append("| Global search / Notifications / Logout | per page | top‑bar chrome |\n")

m.append("## B. Distinct functional modals/dialogs (deduped)\n")
m.append("| Modal | Roles | Kind/Source | Pages | Danger | Key fields | Buttons |\n|---|---|---|--:|:--:|---|---|")
for x in agg["modals_distinct"]:
    t=x["title"].strip()
    if t.lower() in ("add shortcuts","recent searches","(untitled)",""): continue
    flds=", ".join(f for f,_ in x["topFields"][:8]) or "—"
    btns=", ".join(b for b,_ in x["buttons"][:5]) or "—"
    dg="⚠" if danger(t, x["buttons"]) else "view"
    m.append(f"| **{t}** | {'/'.join(x['roles'])} | {'/'.join(x['kinds'])}·{'/'.join(x['sources'])} | {x['pageCount']} | {dg} | {flds} | {btns} |")
m.append("")
m.append("## C. Dropdowns / tabs / filters / accordions\n")
m.append("- **Dropdowns/menus:** 551 opens exercised; primarily per‑row action menus + top‑bar menus (profile/lang/notifications) + searchable select2 controls.")
m.append("- **Tabs (distinct labels, top):** " + ", ".join(f"{k} ({v})" for k,v in list(A["tabsByText"].items())[:24]) + ".")
m.append("- **Filters (distinct field names, top):** " + ", ".join(f"`{k}` ({v})" for k,v in list(A["filtersByName"].items())[:30]) + ".")
m.append("- **Accordions:** 104 expands exercised (filter panels, detail sections).")
m.append("")
m.append("## D. Status vocabulary (badges, deduped — drives the status‑color map)\n")
m.append("| Badge/Status | Count |\n|---|--:|")
for k,v in list(A["badgesByText"].items())[:60]:
    if k.strip(): m.append(f"| {k} | {v} |")
m.append("")
m.append("## E. Dangerous / mutating actions (must be confirmed; never auto‑fired)\n")
m.append("Top button texts the crawler classified UNSAFE and refused to trigger:\n")
m.append("| Action label | Occurrences |\n|---|--:|")
for k,v in list(A["topUnsafeActions"].items())[:50]:
    if k.strip(): m.append(f"| {k} | {v} |")
m.append("")
open(os.path.join(DEEP,"05-distinct-interaction-catalog.md"),"w").write("\n".join(m)+"\n")

# ---------------- 06 complete data surface
def section_of(path):
    p=path
    for pre,name in [("/management/accounting","Finance·Accounting"),("/management/invoices","Finance·Invoices"),
        ("/management/salar","Finance·Salaries"),("/management/staff-salaries","Finance·Salaries"),
        ("/management/payout","Finance·Payouts"),("/management/expense","Finance·Expenses"),
        ("/management/heads","Finance·Expenses"),("/management/banks","Finance·Banks"),
        ("/management/analysis","Reports"),("/management/sessions_analysis","Reports"),
        ("/management/forms","Reports·Forms"),("/management/teacher-feedback","Reports"),("/management/class-feedback","Reports"),
        ("/management/new-requests","Leads/CRM"),("/management/families","Families"),("/management/categories/families","Families"),
        ("/management/family","Families"),("/management/student","Students"),("/management/teacher","Teachers"),
        ("/management/admins","Staff/RBAC"),("/management/courses","Courses"),("/management/courseClasses","Sessions"),
        ("/management/courseclasses","Sessions"),("/management/group","Sessions/Groups"),("/management/session-class-room","Sessions"),
        ("/management/all/teachers/timetable","Timetable"),("/management/search-schedule","Timetable"),("/management/schedule","Timetable"),
        ("/management/request-schedule","Timetable"),("/management/scheduled-actions","Automation"),("/management/public-holiday","Teachers"),
        ("/management/materials","Content"),("/management/library","Content"),("/management/pdf","Certificates"),
        ("/management/certificate","Certificates"),("/management/chat","Messages"),("/management/public-advertisement","Messages"),
        ("/management/settings","Settings"),("/management/profile","Profile"),("/management/time-convertor","Tools"),
        ("/management/tickets","Tasks"),("/management/home","Dashboard"),("/management/accountant","Finance·Invoices"),
        ("/teacher/","Teacher portal"),("/student/","Family portal")]:
        if p.startswith(pre): return name
    return "Other/Utility"

# GET routes from network endpoints (already filtered to app paths)
endpoints=agg["endpoints_distinct"]
# POST/mutation endpoints from form actions
forms=agg["forms_distinct"]
mut_eps=[]
for f in forms:
    act=f["action"]
    if not act.startswith("/"): continue
    if "post" in f["methods"]:
        mut_eps.append(f)

m=[]
m.append("# 06 — Complete Data & API Surface\n")
m.append("> Built from **all 339 page JSONs** + the 3 role `network/endpoints.json`. Two sources: (1) **observed GET routes** captured in the network log; (2) **form‑action endpoints** (POST/PUT/DELETE) read from every form's `action`. The legacy is server‑rendered (no clean JSON API observed) — these are route/endpoint **observations**, plus **inferred** entity fields. Field names are legacy DOM `name`s (hints, not a contract). Do not treat as a final API.\n")
m.append(f"**Distinct app endpoints (GET, observed in network):** {len(endpoints)}  ·  **Distinct form‑action endpoints (mutations):** {len(mut_eps)}.\n")

# group GET endpoints by section
bysec=collections.defaultdict(list)
for e in endpoints:
    bysec[section_of(e["path"])].append(e)
m.append("## A. Observed GET routes (grouped)\n")
for sec in sorted(bysec):
    eps=sorted(bysec[sec], key=lambda x:x["path"])
    m.append(f"### {sec} ({len(eps)})")
    for e in eps:
        m.append(f"- `{e['method']} {e['path']}`  [{'/'.join(e['roles'])}]")
    m.append("")

# mutation endpoints grouped
bysec2=collections.defaultdict(list)
for f in mut_eps: bysec2[section_of(f["action"])].append(f)
m.append("## B. Mutation endpoints (from form actions — POST/PUT/DELETE)\n")
m.append("> These are where the new frontend will POST. Each lists the top field names (legacy `name`s).\n")
for sec in sorted(bysec2):
    fs=sorted(bysec2[sec], key=lambda x:-x["count"])
    m.append(f"### {sec}")
    for f in fs:
        flds=", ".join(n for n,_ in f["topFields"][:14]) or "(no named fields)"
        m.append(f"- `{'/'.join(f['methods']).upper()} {f['action']}` ×{f['count']} [{'/'.join(f['roles'])}] — fields: {flds}")
    m.append("")

# table shapes
m.append("## C. Distinct table shapes (entity list/detail columns)\n")
m.append("> 104 distinct column‑sets across the app. Top shapes by reuse:\n")
m.append("| ×pages | Roles | Columns |\n|--:|---|---|")
for t in agg["tables_distinct"][:60]:
    cols=", ".join(str(c) for c in (t["columns"] or []) if c)[:160]
    if cols: m.append(f"| {t['count']} | {'/'.join(t['roles'])} | {cols} |")
m.append("")
m.append("## D. Reference enums (observed in option lists / fields)\n")
m.append("- **Currencies (16):** AED(base), AUD, CAD, EGP, EUR, GBP, KWD, MAD, PKR, QAR, RUB, RWF, SAR, TRY, USD, YER.")
m.append("- **Languages (10):** Arabic, English, French, German, Italian, Portuguese, Russian, Spanish, Turkish, Urdu.")
m.append("- **Durations (min):** 10,15,20,25,30,40,45,50,60,75,80,90,120,150,180.")
m.append("- **Age groups:** Children (1–10), Teens (11–20), Adults (>20).")
m.append("- **Accounting statement:** According to teacher / Paid / Paid if continue / Free.")
m.append("- **Class remark:** Excellent / Very Good / Good / Acceptable / Needs Improvement.")
m.append("- **Session statuses (11):** Pending, Waiting, Running, Attended, Student Absent, Teacher Absent, Student Cancel, Teacher Cancel, Admin Cancel, Reschedule, Make‑up.")
m.append("- **Course types (4):** Monthly Subscription, Hours per Course, Hours Subscription, Number Session.")
m.append("- **Family/Student statuses (7):** On Trial, Incomplete, Active, Stopped/Stop, Suspended, Inactive, Deleted.")
m.append("- **Payout statuses (8):** Pending approval, Approved, Rejected, Successful, Failed, Pending, Returned, Unknown.")
m.append("- **Staff roles (4):** Manager, Accountant, Supervisor, Support.")
m.append("")
m.append("## E. Honesty: observed vs inferred\n")
m.append("- **Observed:** the GET routes (network log), the form action URLs + field `name`s, table columns, badge/status strings, option enums.")
m.append("- **Inferred:** entity field semantics, required/validation rules, relationships, the *JSON API contract* (none was observed — pages are server‑rendered HTML), real‑time/upload/export/PDF/payment internals.")
m.append("- **Do not invent endpoints.** Anything not in A/B above is a *need*, not a discovered API. Confirm with backend (see open decisions).")
open(os.path.join(DEEP,"06-complete-data-surface.md"),"w").write("\n".join(m)+"\n")
print("05 distinct functional modals:", sum(1 for x in agg["modals_distinct"] if x["title"].strip().lower() not in ("add shortcuts","recent searches","(untitled)","")))
print("06 GET endpoints:", len(endpoints), "mutation endpoints:", len(mut_eps))

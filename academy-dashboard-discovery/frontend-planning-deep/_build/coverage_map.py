#!/usr/bin/env python3
"""Map EVERY page (all 339) + every distinct modal to exactly one future spec. Verify 0 unassigned.
   Emits 19-spec-coverage-map.md and _build/coverage.json (for the audit)."""
import os, json, re, collections
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
DEEP=os.path.join(ROOT,"frontend-planning-deep"); BUILD=os.path.join(DEEP,"_build")
pages=json.load(open(os.path.join(DEEP,"02-all-pages-expanded-inventory.json")))
agg=json.load(open(os.path.join(BUILD,"aggregates.json")))

SPECS={
 "S001":"Foundation + Design System + App Shell",
 "S002":"Admin Shell + Dashboard + Reports/Analytics",
 "S003":"Admin: Students + Families + Leads",
 "S004":"Admin: Teachers + Staff/RBAC + Courses + Materials/Library",
 "S005":"Classes + Timetable + Attendance + Live Sessions",
 "S006":"Forms/Assessments + Certificates + Tasks",
 "S007":"Finance (Invoices + Accounting + Expenses + Payroll + Payouts)",
 "S008":"Messages + Notifications + Broadcast + Chat",
 "S009":"Teacher Portal",
 "S010":"Family/Student Portal",
 "S011":"Settings + Profile + Roles/Permissions polish + Error/Utility",
 "S012":"Final QA + Responsive + Coverage Check",
}

def assign(role, slug, modules):
    if role=="teacher": return "S009"
    if role=="family": return "S010"
    s=slug
    def pre(*xs): return any(s.startswith(x) for x in xs)
    # ordered overrides (admin)
    if pre("main-index-html"): return "S011"            # error page
    if pre("management-export-course"): return "S011"   # broken util/export
    if pre("management-time-convertor","management-scheduled-actions"): return "S011"
    if pre("management-profile"): return "S011"
    if pre("management-settings-payments"): return "S007"   # payment methods -> finance
    if pre("management-settings"): return "S011"
    if pre("management-home","management-total-queues"): return "S002"
    if pre("management-sessions-analysis","management-analysis-","management-class-feedback","management-teacher-feedback","management-new-requests-filter","management-new-requests-scheduled","management-new-requests-requests"): return "S002"
    if pre("management-forms"): return "S006"
    if pre("management-pdf","management-certificate"): return "S006"
    if pre("management-tickets"): return "S006"
    if pre("management-chat","management-public-advertisement"): return "S008"
    if pre("management-courseclasses","management-session-class-room","management-group","management-groups",
           "management-all-teachers-timetable","management-search-schedule","management-schedule-trials-response",
           "management-schedule-sessions-response","management-request-schedule"): return "S005"
    if pre("management-courses"): return "S004"
    if pre("management-materials","management-library"): return "S004"
    if pre("management-teachers","management-teacher-categories","management-teacher-feedback","management-public-holiday","management-teacher","management-admins","management-heads"):
        return "S004" if not s.startswith("management-heads") else "S007"
    if pre("management-new-requests"): return "S003"
    if pre("management-families-feedback","management-family-feedback"): return "S003"
    if pre("management-families","management-categories-families","management-family"): return "S003"
    if pre("management-student","management-forms-students"): return "S003"
    if pre("management-accounting","management-invoices","management-monthly-invoices","management-downlaod",
           "management-expense","management-salaries","management-staff-salaries","management-payouts",
           "management-payout-providers","management-salary-class-report","management-banks"): return "S007"
    # fallback by primary module
    prim=modules[0] if modules else ""
    MODSPEC={"Dashboard / Home":"S002","Reports / Analytics":"S002","Students":"S003",
     "Parents / Guardians / Families":"S003","Teachers":"S004","Roles / Permissions":"S004",
     "Courses":"S004","Content / Materials / Library":"S004","Classes / Live Sessions":"S005",
     "Timetable / Schedule":"S005","Assignments / Homework":"S006","Exams / Quizzes":"S006",
     "Certificates":"S006","Payments / Invoices":"S007","Wallet / Finance":"S007",
     "Messages / Notifications":"S008","Settings":"S011","Profile / Account":"S011","General / Unknown":"S011"}
    return MODSPEC.get(prim,"S011")

# assign pages
rows=[]
spec_count=collections.Counter()
unassigned=[]
# variant detection by normalized route
route_groups=collections.defaultdict(list)
for p in pages: route_groups[p["routeNorm"]].append(p["slug"])
for p in pages:
    sp=assign(p["role"], p["slug"], p["modules"])
    if sp not in SPECS: unassigned.append(p["slug"])
    spec_count[sp]+=1
    grp=route_groups[p["routeNorm"]]
    is_variant = len(grp)>1 and p["slug"]!=sorted(grp)[0]
    note=[]
    if p["httpStatus"]!=200: note.append(f"BROKEN {p['httpStatus']} → error-state in {sp}")
    if is_variant: note.append(f"variant of `{sorted(grp)[0]}` (route {p['routeNorm']})")
    rows.append({"slug":p["slug"],"role":p["role"],"module":(p["modules"][0] if p["modules"] else ""),
                 "spec":sp,"variant":is_variant,"http":p["httpStatus"],"note":"; ".join(note)})

# assign distinct modals to spec (by majority page) — approximate via title keywords reuse of page assign on its pages
# we lack page list per modal title->use roles + keyword
modal_spec=[]
for x in agg["modals_distinct"]:
    t=x["title"].strip().lower()
    if t in ("add shortcuts","recent searches","(untitled)",""):
        sp="S001"  # global chrome -> shell
    else:
        # keyword routing
        if any(k in t for k in ["attend","absent","cancel class","edit class","queue","whatsapp","feedback","direct link","timetable","makeup","make-up","reschedule","add lesson","schedule cancel","mark as"]): sp="S005"
        elif any(k in t for k in ["invoice","transaction","salary","payout","currency","expense","parent"]): sp="S007"
        elif any(k in t for k in ["status","suspend","stop","activate","notes","new request","change status"]): sp="S003"
        elif any(k in t for k in ["certificate"]): sp="S006"
        elif any(k in t for k in ["permission","staff"]): sp="S004"
        elif "course status" in t or "course" in t: sp="S004"
        elif any(k in t for k in ["group","member","chat"]): sp="S008"
        else: sp="S005"
    modal_spec.append({"title":x["title"],"count":x["count"],"roles":x["roles"],"spec":sp})

cov={"specCounts":dict(spec_count),"unassigned":unassigned,"pages":rows,"modals":modal_spec,
     "templateGroups":{k:v for k,v in route_groups.items() if len(v)>1}}
json.dump(cov, open(os.path.join(BUILD,"coverage.json"),"w"), indent=1)

# render 19 md
m=[]
m.append("# 19 — Spec Coverage Map\n")
m.append("> Deterministic mapping of **every one of the 339 captured pages** (and every distinct modal) to exactly **one** future spec. Generated by `_build/coverage_map.py` from `02-all-pages-expanded-inventory.json`. Verifies nothing is dropped: every page is `included = yes`.\n")
m.append(f"**Pages mapped:** {len(rows)}/{len(pages)}  ·  **Unassigned:** {len(unassigned)}  ·  **Distinct route templates:** {len(route_groups)} (so {len(pages)-len(route_groups)} pages are query‑param variants).\n")
m.append("## Pages per spec\n")
m.append("| Spec | Title | Pages |\n|---|---|--:|")
for sp in SPECS:
    m.append(f"| {sp} | {SPECS[sp]} | {spec_count.get(sp,0)} |")
m.append("")
m.append("## Coverage table (every page)\n")
m.append("> `variant`=collapses into a template already in the spec. Broken pages get an error‑state in their spec. Grouped by spec → role → module.\n")
bysp=collections.defaultdict(list)
for r in rows: bysp[r["spec"]].append(r)
for sp in SPECS:
    rs=sorted(bysp.get(sp,[]), key=lambda x:(x["role"],x["module"],x["slug"]))
    if not rs:
        m.append(f"### {sp} — {SPECS[sp]} — (0 captured pages; cross‑cutting)\n"); continue
    uniq=sum(1 for x in rs if not x["variant"]); var=sum(1 for x in rs if x["variant"])
    m.append(f"### {sp} — {SPECS[sp]}  ·  {len(rs)} pages ({uniq} templates + {var} variants)\n")
    m.append("| Page (slug) | Role | Module | Incl | Notes |\n|---|---|---|:--:|---|")
    for x in rs:
        m.append(f"| `{x['slug']}` | {x['role']} | {x['module']} | yes | {x['note'] or ('variant' if x['variant'] else 'unique template')} |")
    m.append("")
m.append("## Distinct modals → spec\n")
m.append("| Modal | ×inst | Roles | Spec |\n|---|--:|---|---|")
for x in sorted(modal_spec, key=lambda y:(y["spec"], -y["count"])):
    if x["title"].strip(): m.append(f"| {x['title']} | {x['count']} | {'/'.join(x['roles'])} | {x['spec']} |")
m.append("")
open(os.path.join(DEEP,"19-spec-coverage-map.md"),"w").write("\n".join(m)+"\n")
print("pages mapped:", len(rows), "unassigned:", len(unassigned))
print("per spec:", dict(spec_count))
if unassigned: print("UNASSIGNED:", unassigned)
print("template groups (variant families):", sum(1 for v in route_groups.values() if len(v)>1))

# 03b — Visual Patterns & Weaknesses (to improve in the rebuild)

> Layout/visual patterns extracted from the contact sheets, with the concrete weaknesses our new design system should fix. Visual style is **not** to be copied — we build an original system ([14-design-system-direction-v2.md](14-design-system-direction-v2.md)). These are UX observations.

## Recurring layout patterns
| Pattern | Where | Keep / improve |
|---|---|---|
| Purple sidebar + top bar shell | admin (all) | Keep shell; **regroup** the ~40 flat sidebar items into ≤8 sections; add icon‑rail collapse. |
| Banner "hero" KPI card | teacher/family home | Keep; make KPIs responsive, add progress gauges, ensure RTL mirroring. |
| Row of colored KPI/status tiles | admin lists & dashboards | Keep; give tiles a consistent token‑driven status‑color map (not ad‑hoc colors); make "clickable‑as‑filter" tiles obviously interactive. |
| Wide data table + collapsible filters | admin lists | Keep table; **surface filters** (persistent FilterBar + active‑filter chips); replace per‑row button clusters with a **row‑action menu**. |
| Centered Bootstrap modal (purple/yellow buttons) | everywhere | Keep modal; make destructive actions a distinct **danger** style; move very large forms (24‑field report, create‑family) to **drawers/full‑page**. |
| Banner header + tabs on detail pages | student/family/teacher/course | Keep; **lazy‑load** tabs (legacy ships all at once → huge 330–380 KB HTML); sticky tab bar. |
| ApexCharts + world map analytics | reports | Keep charts; ensure dark‑mode + RTL‑aware axes; responsive chart containers. |
| Canvas certificate designer | pdf‑create | Keep concept; rebuild as accessible drag canvas + properties panel. |
| Grouped checkbox permission matrix | admins‑permission | Keep; add collapsible groups, search (exists), per‑group counts, sticky Save. |

## Visual weaknesses to fix
1. **Too many inline row actions.** Teacher/admin tables show 3–6 colored action pills per row (View/Enter/End/Cancel…). → single **row‑action menu** grouping safe vs destructive.
2. **Flat, overlong sidebar.** ~40 ungrouped admin links. → grouped, collapsible IA ([13](13-improved-information-architecture-v2.md)).
3. **Hidden/ollapsed filters.** Filter forms are tucked away. → persistent, visible FilterBar with chips and Reset.
4. **Inconsistent status colors.** Many ad‑hoc colors for statuses/badges. → one themeable **status‑color map** (the 11 session statuses + account/invoice/payout).
5. **Dense wide tables, no obvious responsive story.** Up to 23 columns (salary report). → sticky first column + horizontal scroll + column‑priority hide; card view on mobile.
6. **Empty states are bare** ("No data found" / pink banner). → purpose‑built EmptyState (icon + message + primary CTA).
7. **Broken pages shipped to users** (2× profile 500s, 404 nav bug, 504 settings, 4 admin 500s). → working pages + proper error states; remove the dead "Dashboard 1" link.
8. **Heavy detail pages** (330–380 KB sanitized HTML; all tabs eager‑loaded). → lazy tabs, skeletons.
9. **Modals are tall & field‑dense** (e.g. Mark Absent, Cancel Class, Edit Class with makeup + timezone tabs). → step/section the largest; clear dual‑timezone affordance; danger confirms.
10. **No visible loading affordance** beyond "Loading…" text (many AJAX sections; class‑feedback page fired ~344 XHRs). → skeletons + spinners + retry.
11. **Logo/asset 404 on every page.** → avatar/logo fallbacks system‑wide.
12. **RTL never exercised** (English‑only capture). → RTL is a **fresh, first‑class** requirement, validated in Arabic.

## Brand/visual cues (reference only — we will NOT copy)
Legacy leans purple primary + amber/yellow secondary + teal/green/pink action accents; Inter font; ~12 px card radius; soft shadows; flatpickr/select2/ApexCharts/Quill/dropzone widgets. We will design an **original** palette/typography/iconography ([14](14-design-system-direction-v2.md)); these are recorded only to understand the product's tone (cheerful‑but‑professional academy) and the widget families we must provide equivalents for.

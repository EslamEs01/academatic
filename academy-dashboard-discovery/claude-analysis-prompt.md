# Claude / Codex Analysis Prompt — Academy Dashboard Discovery Crawler

## Purpose of This Document

This document is a structured prompt for Claude, Codex, or any capable LLM to read the
crawler's structured output and produce **spec-kit-ready documentation** for building a
**new, original, improved** frontend application.

---

## CRITICAL LEGAL AND ETHICAL CONSTRAINTS — READ FIRST

Before doing anything else, acknowledge and commit to these rules:

1. **Do NOT copy proprietary code.** The crawler output is derived from an existing product.
   You must not reproduce any JavaScript, server-side logic, API implementations, business
   logic algorithms, or any other code that belongs to the original platform.

2. **Do NOT copy brand identity.** Do not use, reference, or reproduce the original platform's
   name, logo, color palette presented as-is, icon set, fonts selected as-is, slogans,
   taglines, or any other brand asset in the new frontend. The new product must have its own
   distinct visual identity.

3. **Do NOT copy exact private wording.** UI labels, error messages, help text, and copy from
   the crawled screens are references for understanding product functionality only. All wording
   in the new frontend must be independently written.

4. **Do NOT copy assets.** Screenshots, icons, illustrations, and images captured by the
   crawler are reference artifacts. Do not embed, hotlink, or reproduce them in the new product.

5. **Use crawler output as product and UX reference only.** The purpose is to understand:
   what features exist, what user roles need, what workflows are supported, what data is
   displayed, and where UX can be improved — not to clone the product.

6. **Do NOT implement anything until discovery is reviewed and approved.** After completing
   all deliverables listed below, stop. Present the documentation for human review. Do not
   generate any code, wireframes, or design tokens until a human stakeholder explicitly
   approves the discovery report.

---

## Input Files to Read

All input files are located under the crawler output directory. Read each of the following
files in order before producing any output:

| File | Location | What It Contains |
|------|----------|-----------------|
| `llm-context.md` | `output/combined/llm-context.md` | High-level LLM-optimized overview of the entire crawl, all roles, and key findings. Start here. |
| `academy-system-map.md` | `output/combined/academy-system-map.md` | Module map, route graph, and role-to-module coverage matrix. |
| `page-inventory.md` | `output/combined/page-inventory.md` | Full inventory of every discovered page across all roles, with titles, modules, and routes. |
| `role-permission-matrix.md` | `output/combined/role-permission-matrix.md` | Per-module, per-role breakdown of available actions, buttons, forms, modals, and tables. |
| `component-inventory.md` | `output/combined/component-inventory.md` | Aggregated inventory of all UI components discovered: buttons, forms, tables, cards, badges, filters, tabs, modals. |
| `interaction-inventory.md` | `output/combined/interaction-inventory.md` | Aggregated log of all safe interactions explored: dropdowns, modals, tab switches, accordion toggles, inline state changes. |
| `speckit-discovery.md` | `output/combined/speckit-discovery.md` | Spec-kit bootstrap: structured UX requirements and component suggestions derived from the crawl. |
| `report.html` | `output/combined/report.html` | Visual HTML report for human review; scan for overall structure but do not parse HTML deeply. |

Additionally, for deep per-page analysis:

- **Per-role page records:** `output/roles/<role>/pages/<slug>.json` — full structured data for every visited page.
- **Per-role maps:** `output/roles/<role>/role-map.json` — route graph and summary for each role.
- **Screenshots:** `output/roles/<role>/screenshots/` — visual reference for each page and each interaction.

Active roles to process: `admin`, `teacher`, `family`. For each, read all `.json` files in their `pages/` directory.

---

## Ordered Deliverables

Produce the following deliverables in order. Do not skip ahead. Each deliverable builds on the previous.

---

### Deliverable 1 — Product and Module Map

**Source:** `llm-context.md`, `academy-system-map.md`, per-role `role-map.json` files.

Produce a concise, structured document that answers:

- What is this product? (One paragraph, in your own words, describing the purpose and audience — do not copy the platform's own marketing text.)
- What are the functional modules? List every module found in the crawl using the canonical module names from `academy-system-map.md`. For each module, write one sentence describing its purpose as inferred from the crawl data.
- What roles use each module? Use the role-to-module matrix from `academy-system-map.md`.
- What is the overall route structure? Summarize the navigation tree (sidebar, header, nested routes) without copying UI text verbatim — paraphrase to produce original documentation.
- What pages were discovered, failed, skipped, or redirected to login? Summarize discovery coverage statistics.

Do not copy page titles or navigation labels verbatim from the target platform. Paraphrase them.

---

### Deliverable 2 — Page Inventory

**Source:** `page-inventory.md`, per-role `pages/*.json` files.

Produce a structured table or list of all unique pages (deduplicated by normalized route) that includes:

- Normalized route (URL pattern)
- Inferred page purpose (your own words)
- Functional module(s) it belongs to
- Roles that can access it
- Discovery status (visited / failed / login-redirected / etc.)
- Key data displayed (tables, cards, KPIs — described functionally, not by copying label text)
- Key actions available (categorized as: navigation, data viewing, filtering, interaction — do not list mutating actions in detail since they were not explored)

Group pages by module. Note any pages that appear broken, redirected, or inaccessible.

---

### Deliverable 3 — Permission Matrix

**Source:** `role-permission-matrix.md`, per-role `role-map.json` and `pages/*.json`.

Produce a permission matrix that shows, for each module and each role:

- Whether the role can access the module at all
- What data views are available (read-only tables, cards, KPIs)
- What interactive UI elements are present (filters, tabs, dropdowns, search)
- What safe UI interactions were found (modals, drawers, accordions) — described functionally
- What potentially mutating controls exist (from `unsafeSkipped` lists) — listed by category only (e.g., "edit form", "delete button") without quoting original UI text

Present as a matrix table: rows = modules, columns = roles (admin, teacher, family). Use symbols (Y / N / partial) plus short notes.

---

### Deliverable 4 — Component Inventory

**Source:** `component-inventory.md`, per-role `pages/*.json` (buttons, forms, tables, cards, badges, filters, tabs, modals, interactions).

Produce a component inventory suitable for a component library specification:

For each component category (Button, Form, Table, Card / KPI widget, Badge / Status chip, Filter bar, Tab group, Modal / Drawer, Dropdown menu, Accordion, Pagination):

- How many distinct instances were found across all pages and roles
- What variants appear (e.g., primary/secondary/destructive buttons; data tables with/without pagination)
- What states were observed (selected tab, expanded accordion, open modal)
- Functional description of each variant (do not copy visual style from the original — describe behavior and purpose)
- Suggested canonical component name for the new frontend's component library (use generic, original names)

Do not replicate the visual design of the original platform. Focus on structure and behavior.

---

### Deliverable 5 — Page-by-Page Requirements

**Source:** Per-role `pages/*.json`, screenshots (listed by path only — do not embed), `interaction-inventory.md`.

For each unique page (grouped by module), produce a requirements specification section:

```
## [Module Name] — [Inferred Page Purpose]

### Routes
- Primary: <normalized route>
- Also accessible to: <roles>

### Purpose
<One paragraph describing the page's functional purpose in the new system — original wording.>

### Data Requirements
- <What entities / data objects are displayed: list, table, card, etc.>
- <What fields are shown per record (inferred from table headers, card labels, visible text)>
- <What KPIs or summary stats are shown>

### Interaction Requirements
- <What filtering / search controls are needed>
- <What tabs or views exist>
- <What modals or drawers open and what they contain>
- <What navigation actions are present>

### UX Improvement Opportunities
<Neutral observations: e.g., "the page shows X tables without pagination — new design should add server-side pagination", "filter controls are hidden — consider a visible persistent filter bar", etc. These must be YOUR independent analysis, not copied from original UI text.>

### Screenshots (reference only — do not reproduce)
- Full page: output/roles/<role>/screenshots/<slug>-full.png
- Interactions: output/roles/<role>/screenshots/<slug>-interaction-*.png
```

Cover every module. Within each module, cover every unique page. Skip duplicate routes (same normalized route across roles — note which roles share it).

---

### Deliverable 6 — Improved Original Frontend Rebuild Plan

**Source:** All prior deliverables.

Produce a structured rebuild plan for a **new, original, improved** frontend. This plan must be an independent product specification — not a copy or description of the original platform.

The plan must cover:

#### 6.1 — Architecture Decisions
- Recommended frontend framework and why (base decision on project needs, not on what the original uses)
- State management approach
- Routing strategy (client-side vs server-side, route protection per role)
- API layer design (REST, GraphQL, or hybrid — recommend based on the data patterns observed)
- Internationalization and RTL support requirements (Arabic + English; RTL layout considerations found in the crawl)
- Authentication strategy (role-based; session/token approach — do not copy the original's auth mechanism)

#### 6.2 — Module Build Order (Phased Roadmap)
Recommend a phased build order based on:
- Role criticality (admin first, teacher second, family third, or justify a different order)
- Module dependency (e.g., Students module is a dependency for Attendance, Assignments, Exams)
- UI complexity (simple list/detail pages before complex dashboards)

Present as Phase 1 / Phase 2 / Phase 3 with modules and rationale.

#### 6.3 — Component Library Specification
Based on Deliverable 4, define the minimal component library needed:
- List every component to build, with its canonical name and a one-line description
- Note any component that requires RTL-aware styling
- Note any component that requires role-aware conditional rendering
- Do NOT specify colors, fonts, or visual tokens here — those belong to the design system, which must be originally created

#### 6.4 — Permission and Route Guard Specification
Based on Deliverable 3, define:
- Route guard rules per role (which routes require which role)
- Feature flag approach for role-conditional UI elements (buttons, columns, modals that only certain roles see)
- Handling for unauthorized access (redirect targets, error pages)

#### 6.5 — Data Model Inferences
Based on what was observed in tables, forms, and cards across all pages, infer a preliminary entity model:
- List the main data entities (e.g., Student, Teacher, Course, Session, Assignment, Exam, Invoice, etc.)
- For each entity, list the fields inferred from visible table headers and form fields
- Note relationships between entities
- Flag any entity where the data model is unclear and needs API documentation

#### 6.6 — UX Improvement Summary
Consolidate all UX improvement opportunities noted in Deliverable 5 into a prioritized list:
- High priority: usability issues that affect core workflows
- Medium priority: missing features that modern dashboards typically include
- Low priority: polish and progressive enhancement

#### 6.7 — Open Questions
List every question that cannot be answered from crawler output alone and must be addressed with the platform owner or backend team before implementation begins. Examples:
- API endpoint structure and authentication tokens
- Real-time features (WebSocket / SSE requirements)
- File upload/download flows (not crawled)
- Payment gateway integration details
- Notification delivery mechanism

---

## Final Instruction

**STOP HERE. Do not write any code. Do not generate wireframes. Do not produce design tokens.**

After completing all six deliverables above, present the full documentation set and wait for explicit human review and approval before proceeding to any implementation phase.

The crawler output is a discovery artifact. The deliverables above are a discovery report.
Implementation begins only after a stakeholder has reviewed and signed off on this report.

---

## Quick Reference — File Paths

```
output/
  combined/
    llm-context.md                  <- Start here
    academy-system-map.md
    page-inventory.md
    role-permission-matrix.md
    component-inventory.md
    interaction-inventory.md
    speckit-discovery.md
    report.html
  roles/
    admin/
      role-map.json
      pages/
        *.json                      <- One file per visited page
        *.md
      screenshots/
        *-full.png
        *-interaction-*.png
      html/
        raw/*.html
        sanitized/*.html
      text/*.txt
      network/endpoints.json
    teacher/
      <same structure as admin>
    family/
      <same structure as admin>
```

All paths above are relative to the project root:
`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery`

---

*This prompt document was generated by the Academy Dashboard Discovery Crawler pipeline.
It is part of the discovery phase only. No proprietary code, brand identity, or private content
from the target platform should appear in any output produced by following this prompt.*

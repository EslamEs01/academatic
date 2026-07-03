# Contract: Source Links (Spec 015)

**Status**: Binding · References FR-016, SC-006; research D11. The teacher page is the ONE portal with a sanctioned page-body link.

## 1. The complete anchor inventory of the teacher page

| Anchor | Target | Class |
|---|---|---|
| Skip link (shell) | `#page` | real (in-document) |
| Hub switch link (shell) | `portals.html` / `portals.en.html` | real link, language-correct |
| **Performance link (page body)** | `teacher-performance.html` / `teacher-performance.en.html` | real link, labeled admin-console framing — **the ONE sanctioned exception (D11)** |

**That is the entire set.** Every other element — schedule cards, follow-up cards, roster, workflow steps, tasks, materials, timetable blocks, rubric/certificate previews, account rows — is display-only or a labeled non-anchor gate.

## 2. Rules

Zero `href="#"` (standing sitewide invariant) · zero dead local links (crawl-verified; the performance target exists) · exactly ONE page-body anchor with the exact performance target (smoke `bodyAnchors === 1` + href match) · every planned/backendRequired affordance is a non-anchor element with a labeled chip · no external URLs · language-correct targets everywhere.

## Acceptance (binding)

1. **Given** both built files, **When** anchors are enumerated, **Then** the set matches the table exactly (smoke-asserted inventory).
2. **Given** the smoke crawl, **Then** zero dead targets, zero `href="#"`, zero external requests.

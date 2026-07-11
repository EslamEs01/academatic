# Contract — Targeted Visual Grounding (Spec 039)

**Purpose:** the plan and implementation MUST be grounded in re-inspected evidence, not memory/roadmap/spec.md.

## Requirements
- [x] All 17 Spec 039 artifacts read before planning.
- [x] Current source re-opened: `nav.config.js`, `pages/library.js`, `pages/certificates.js`,
  `fixtures/content-library.js`, `fixtures/certificates.js`, `locales/ar.adm.js`, `locales/en.adm.js`,
  `enhance.js`, `components/tabs.js`, `components/sidebar.js` (langRoute), `scripts/build-html.mjs`,
  `tests/smoke|a11y|screenshots`.
- [x] Screenshots re-confirmed: materials-full, certificate-requests-full, library-003 (re-opened this step);
  full 12-shot set inspected in the specify gate this session (committed `output/`, unchanged).
- [x] Drift check performed against exact paths/lines/counts/tab-ids/test-blocks.

## Drift result: NONE
| Item | Expected | Re-confirmed |
|---|---|---|
| `materials` nav | planned, no route (line 100) | ✅ |
| `certificateRequests` nav | planned, no route (line 103) | ✅ |
| `books` nav | implemented, `library.html` (line 101) | ✅ |
| `FUTURE_ROUTES.materials` | present (line 144) | ✅ |
| library tabs | group `library` [materials, books] | ✅ |
| certificates tabs | group `certificates` [templates, requests] | ✅ |
| `langRoute` hash-aware | sidebar.js:18 | ✅ |
| build PAGES | library 129 / certificates 130; no materials/requests page | ✅ |
| smoke probe | 227–230 admin planned-item | ✅ (will break) |
| smoke navCount | `=== 50` @1300 | ✅ |
| smoke admItems | `=== 5 && !banks` @1636 | ✅ |
| smoke a31 tabIds | @1184/1189 | ✅ |
| count / menu | 115 / 50 | ✅ |

## Rule
If any of the above drifts at implementation time, update the evidence artifacts first, record the drift, and
reconcile the plan — never proceed against stale evidence.

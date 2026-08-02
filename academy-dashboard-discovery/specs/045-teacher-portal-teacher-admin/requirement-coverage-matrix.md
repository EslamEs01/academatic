# Requirement Coverage Matrix

| Requirement group | FRs | Acceptance journeys | Planned work packages | Verification |
|---|---|---|---|---|
| Scope/evidence/inventory | 001–005 | US10 | T001–T009, T063–T068, T091–T092 | fail-loud domain inventory, counts, ledgers |
| Unified visual system | 006–010 | US9 | T014–T015, T056–T062, T093 | screenshots/manual review/non-domain regression |
| Portal home/navigation | 011–014 | US1 | T016–T020, T063, T077 | routes, role guard, visual matrix |
| Portal internals | 015–027 | US2–US5 | T021–T042, T063, T079–T081, T086 | focused behavior/privacy/action guards |
| Directory | 028–031 | US6 | T043–T047, T063, T076 | filter/sort/page/D1/privacy tests |
| Admin detail | 032–036 | US7 | T048–T051, T063, T080, T087–T088 | tab/deep-link/interaction/390px tests |
| Performance | 037–039 | US8 | T052–T055, T063, T077, T083 | admin-only/no-score/filter/responsive tests |
| Privacy/roles/pay | 040–044 | US3, US5–US8 | T016–T055, T063, T073, T076–T079, T088 | rendered/payload protected guards and mutations |
| Interaction/truth | 045–051 | all action journeys | T016–T055, T065–T068, T080, T085–T087 | inherited Spec-044 + action census |
| Locale/theme/responsive/a11y | 052–057 | US9 | T014–T015, T056–T072, T081–T083 | AR/EN/dark/390px/a11y |
| Ownership/source/tests/impact | 058–068 | US10 | T063–T100, especially T084–T092 | source parity, mutations, impact, docs, final review |

All 68 FRs and 10 acceptance journeys have implementation and verification task coverage. No FR or acceptance journey is left without an owner and falsifying gate.

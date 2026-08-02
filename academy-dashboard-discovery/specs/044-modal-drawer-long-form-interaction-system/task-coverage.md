# Requirement → Scenario → Task Coverage Audit — Spec 044

**Result:** PASS before implementation  
**Tasks:** T001–T100, all strict checkbox format, no duplicate/missing ID  
**FRs:** FR-001–FR-060, all mapped below  
**Success criteria:** SC-001–SC-012, all mapped to final gates

## Functional requirement coverage

| Requirement(s) | Acceptance scenario family | Implementation/evidence tasks | Verification/correction tasks |
|---|---|---|---|
| FR-001, FR-002, FR-003 | US1-4 fail-loud mapping; US8-3 exact impact | T004–T006, T013–T014, T069 | T018–T019, T074, T091–T092, T095–T099 |
| FR-004 | US1-1 confirmation | T020–T024, T063 | T026–T027, T031–T033, T051–T053, T077 |
| FR-005 | US1-2 bounded form | T005, T022, T063–T067 | T030–T033, T069–T074 |
| FR-006 | US1-3 drawer/details | T005, T022, T028, T063–T067 | T030–T033, T069–T074 |
| FR-007 | US7-1 existing dedicated page | T005, T059 | T060–T062, T091, T095 |
| FR-008 | US6-1 non-modal dropdown | T054–T056 | T057–T058 |
| FR-009 | US8 preservation/ownership | T006, T096 | T098–T100 |
| FR-010 | US1-4 required mapping | T013–T014, T021–T022 | T018, T026–T027, T075–T076, T088 |
| FR-011 | US1-5 deterministic teardown | T020–T024, T028–T029 | T026–T027, T092, T099 |
| FR-012 | US1-5 one owner | T020–T025 | T026–T027, T082 |
| FR-013 | US1 transition/nesting | T024, T068 | T026–T027, T082, T089 |
| FR-014 | US1/US3 dismissal | T021, T035–T036 | T037, T040, T080–T081 |
| FR-015 | US1 exact teardown | T020–T021, T024, T029 | T026–T027, T083 |
| FR-016 | US1-5 and US5-5 restoration | T020, T024, T049 | T026, T051–T053, T079 |
| FR-017 | US5 semantics | T020, T022–T023, T049 | T051–T053, T077 |
| FR-018 | US5-3 purpose focus | T023, T049 | T051–T053 |
| FR-019 | US5-1 Tab boundaries | T049 | T051–T053, T078 |
| FR-020 | US5-2 background isolation | T020, T049 | T051–T053, T078 |
| FR-021 | US5-4 focus visibility | T028–T029, T049–T050 | T030–T033, T051–T053 |
| FR-022 | US4/US5 announcements | T041–T046, T050 | T046–T048, T051–T053 |
| FR-023 | US2/US5 close reachability | T022, T025, T028 | T030–T033, T052–T053 |
| FR-024 | US2-4 sidebar modality | T025, T028–T029 | T030–T033, T051–T053 |
| FR-025 | US6-1/2/3 dropdown behavior | T054–T055 | T057–T058 |
| FR-026 | US6-4 dropdown inside surface | T055–T056 | T057–T058, T082 |
| FR-027 | US2 scroll lock/restore | T028–T029 | T030, T033, T083 |
| FR-028 | US1-3/US2 stable regions | T022, T028, T063–T067 | T030–T033, T085 |
| FR-029 | US2 action/content reachability | T028, T063–T067 | T030–T033, T094 |
| FR-030 | US2-1/2 390px viewport/keyboard | T028–T029 | T030–T033, T084, T094 |
| FR-031 | US2-3 AR/EN direction | T028, T063–T067 | T030–T033, T072–T074 |
| FR-032 | Edge long translation/zoom | T028, T041, T045 | T030–T033, T052–T053, T093–T094 |
| FR-033 | US3-1 meaningful dirty | T034 | T037, T040, T081 |
| FR-034 | US3-2 all departure paths | T035–T036 | T037, T040, T081 |
| FR-035 | US3-3 one-surface warning | T035 | T037, T040, T082 |
| FR-036 | US3-4 continue/discard | T035, T038 | T037, T039–T040 |
| FR-037 | US3-4/5 preservation | T034–T038, T041–T046, T059 | T037, T040, T046–T048, T060–T062 |
| FR-038 | US3-6 sensitive storage ban | T034–T037 | T037, T040, T071, T099 |
| FR-039 | US3-6 no unsupported persistence | T034–T036 | T037, T040, T071, T099 |
| FR-040 | US4-1 accessible validation | T041, T043, T045 | T046–T048, T052–T053 |
| FR-041 | US4-1/2 deterministic issues | T041, T043 | T046–T048 |
| FR-042 | US4-1/2 focus/hidden step | T041, T059 | T046–T048, T060–T062 |
| FR-043 | US4-4/5 real loading only | T042 | T046–T048, T099 |
| FR-044 | US4-4 real errors | T042, T045 | T046–T048, T099 |
| FR-045 | US4-3 backend boundary | T042–T045 | T046–T048, T086–T087 |
| FR-046 | US4-3 exact key/copy mapping | T044–T045 | T046–T048, T069, T086–T087 |
| FR-047 | narrow confirm-copy audit | T016, T023, T044 | T018, T048, T099 |
| FR-048 | US8-2 complete parity | T028, T031–T032, T039, T047, T052, T057, T061, T072–T073 | T033, T040, T048, T053, T058, T062, T074, T093–T094 |
| FR-049 | US2/US8 unclipped states | T028, T031–T032, T038–T039, T045, T072–T073 | T033, T040, T048, T053, T074, T093–T094 |
| FR-050 | US3-5/US8-2 state across theme/locale | T034–T038 | T037, T039–T040, T072–T074 |
| FR-051 | US8-1 Spec-043 preservation | T019, T065, T068, T071 | T027, T048, T053, T071, T074, T092, T099 |
| FR-052 | US7-1/US8 route preservation | T006, T025, T059 | T062, T091, T095, T099 |
| FR-053 | all deterministic behaviors/no silent skip | T013–T017, T026, T030, T037, T046, T051, T054, T060, T069 | T018, T027, T033, T040, T048, T053, T058, T062, T074, T088, T092, T099 |
| FR-054 | protected/additive mutation protocol | T016, T019, T071, T075–T090 | T018–T019, T071, T090, T097, T099 |
| FR-055 | all mutation candidates | T075–T089 | T090, T099 |
| FR-056 | intended RED attribution | T075–T089 | T090, T099 |
| FR-057 | truthful pre-implementation baseline | T001–T006 | T011, T018–T019, T091, T095 |
| FR-058 | exact final impact | T070, T095–T096 | T091, T095, T098–T100 |
| FR-059 | authored/generated ownership | T013–T014, T063–T070 | T069–T070, T091, T095, T099 |
| FR-060 | full acceptance gates | T090–T100 | T099–T100 |

## User-story scenario coverage

| Story | Scenario count | Task phases | Independent acceptance |
|---|---:|---|---|
| US1 | 5 | T020–T027 | lifecycle/mapping/focus/teardown focused GREEN |
| US2 | 4 | T028–T033 | AR/EN 390px geometry/a11y/original-detail visual acceptance |
| US3 | 6 | T034–T040 | all dirty paths, preservation, discard, no sensitive persistence |
| US4 | 5 | T041–T048 | validation/backend truth/value/no-fake-state GREEN |
| US5 | 5 | T049–T053 | keyboard/background/restoration plus a11y GREEN |
| US6 | 4 | T054–T058 | dropdown keyboard/non-modal/inside-surface GREEN |
| US7 | 3 | T059–T062 | existing wizard dirty/validation/terminal state, no page growth |
| US8 | 3 | T063–T074 | every consumer classified/migrated, protected/parity GREEN |

## Success-criteria coverage

- SC-001/SC-002: T026–T027, T051–T053, T092.
- SC-003: T030–T033, T084, T094.
- SC-004/SC-005: T037–T040, T081, T099.
- SC-006/SC-007: T046–T048, T086–T087.
- SC-008/SC-009: T072–T074, T093–T094.
- SC-010: T075–T090.
- SC-011: T091–T094, T097–T099.
- SC-012: T095–T100.

## Coverage audit conclusions

- Missing FR IDs: 0; unexpected FR IDs: 0.
- Missing task IDs: 0; duplicate task IDs: 0; invalid checklist-format tasks: 0.
- Every task has an owner, exact file path/evidence artifact, and verification path.
- Every discovered interaction consumer is covered by recursive inventory plus explicit producer migration.
- AR/EN, RTL/LTR, themes, desktop/tablet/390, dirty, validation, backend, nested prevention, dedicated-page, dropdown, sidebar, protected tests, mutations, impact, and documentation are explicit.
- Implementation may begin only after T012 assignment ledger and T013–T019 foundational guard acceptance.

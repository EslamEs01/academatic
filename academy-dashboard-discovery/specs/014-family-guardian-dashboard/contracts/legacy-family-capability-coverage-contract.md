# Contract: Legacy Family Capability Coverage (Spec 014)

**Status**: Binding · References FR-027, SC-010; the Spec-012 coverage artifact is the single source of truth; edits are a NEW §8 delivery-notes section ONLY.

## 1. §8 Spec-014 delivery notes (the ONLY sanctioned coverage edits)

Append to `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` a §8 mapping every guardian row — classifications, destinations, and §§1–7 text untouched:

| Row | Spec-014 disposition |
|---|---|
| **F1** home widgets | Delivered — deep hero + children overview + today band + signals trio |
| **F2** multi-child proxy | Delivered — everyone-inline five-children overview (capture: legacy had NO global switcher; the switching promise resolves as everyone-visible-at-once; kidsHint copy updated accordingly) |
| **F3** today + request-cancel | Delivered as honest preview — today band + the cancel/reschedule preview card with the no-replacement caution; SUBMISSION stays gated (real request flow = planned-016 / backend) |
| **F5** timetable (family slice) | Delivered — the today/coming view; the deep student timetable was 013's; no separate family grid (deliberate: calm > grid) |
| **F6** history (guardian mirror) | Delivered — child-first recent-sessions cards (real out1 + out15); full history stays planned |
| **F7** subscriptions | Delivered — per-child plan-label rows, zero amounts |
| **F8** feedback rubric | Delivered as display-only rubric preview; submit backendRequired |
| **F9** billing (view-only) | Delivered as a STATUS preview (settled chip + reassurance), zero figures; real invoices/payment stay backendRequired (capture: legacy itself rendered zero amounts) |
| **F10** meetings | Delivered — truthful empty status + planned request chip |
| **F11** request-trial | Delivered as display-only new-vs-existing-child preview; submit backendRequired |
| **F12** materials (family slice) | Delivered — display-only cards; download backendRequired |
| **F13** account edit | Delivered as the account slice (contact/joined/children display-only); editing backendRequired |
| **F16** teacher notes | Delivered — deepened to 3 child-associated notes |
| **F4** uploads (file/voice) | UNCHANGED — backendRequired, never rendered as a control |
| **F14** `/profile` 500 · **F15** Dashboard-1 404 · **F17** badge bug | UNCHANGED — intentionally excluded |

Real submission engines (cancel/feedback/trial/meeting requests) → **planned-016** (the Communications shell) on top of their backendRequired gates — recorded in the §8 close.

## 2. No silent gaps

Every F-row accounted for; already-delivered-013 items (F5 student slice, F6 student view, F12 student slice) stay under §7; nothing reclassified; planned-015/backendRequired/excluded rows read-only.

## Acceptance (binding)

1. **Given** the coverage diff, **Then** it is exactly the appended §8 (+ a sign-off block); §§1–7 byte-unchanged.
2. **Given** §8, **Then** all 17 F-rows have an explicit disposition — zero silent gaps.

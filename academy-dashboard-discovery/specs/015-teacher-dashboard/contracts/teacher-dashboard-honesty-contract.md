# Contract: Teacher Dashboard Honesty (Spec 015)

**Status**: Binding · References FR-014…FR-017; research D5–D11.

## 1. The four honest action classes (exhaustive)

Every interactive element is exactly one of:
1. **Real link to an existing page** — permitted set: the shell's hub switch link + EXACTLY ONE page-body anchor: the labeled admin **teacher-performance** link (`teacher-performance(.en).html` — a real, existing, pay-free KPI board; the sanctioned D11 exception).
2. **Demo toast via existing hooks** — none planned.
3. **Labeled disabled/planned control** — the four `.pt-planned` mini-cards ({outcomeSave, matUpload, availabilityEdit} backendRequired · {taskManage} planned) + the two inline availability chips (rubric submit · certificate submit, both backendRequired). Each labeled icon+text, never an anchor.
4. **Display-only content** — everything else.

## 2. Write-boundary honesty (the teacher's defining risk)

- **Live class**: the next-class affordance is a note that SAYS real joining requires the live-session integration — never join/start-styled (the legacy "live room" was itself fake — excluded).
- **End-class / attendance**: the outcome workflow is a display-only 5-step preview; recording/saving is the labeled `outcomeSave` backendRequired gate. NO attendance toggle, NO submit, NO form controls.
- **Uploads/downloads**: materials are display-only; the `matUpload` gate covers both directions.
- **Availability**: schedule blocks display-only; editing is the `availabilityEdit` gate.
- **Reports/certificates**: rubric + certificate previews are display-only concept lines; submits are inline backendRequired chips. NO answer scales, NO rating visual.
- **Chat/notifications**: not rendered as controls at all (backendRequired → planned-016).
- **Profile**: display-only rows; editing is the backendRequired note (the `/profile` 500 not reproduced).

## 3. Forbidden outright

`href="#"` · dead links · any second page-body anchor · `<form>`/`<input>`/`<select>`/`<textarea>` · fake join/start/end/save/upload/download/chat/certificate/profile-save affordances · notification counts · backend promises · "coming soon" hype · computed rating/score/rank · ANY pay token (see the pay-free contract).

## Acceptance (binding)

1. **Given** both built files, **When** anchors and form controls are enumerated, **Then** page-body anchors = exactly 1 (the performance link, exact target) and form controls = 0 (smoke-asserted).
2. **Given** the four mini-cards + two inline chips, **Then** each carries the labeled availability vocabulary and none is an anchor (plannedBad = 0).
3. **Given** grep over both files, **Then** zero join/start/save-styled control vocabulary presented as working.

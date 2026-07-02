# Contract: Family Dashboard Honesty (Spec 014)

**Status**: Binding · References FR-017…FR-019; research D3–D6/D10.

## 1. The four honest action classes (exhaustive)

Every interactive element is exactly one of:
1. **Real link to an existing page** — permitted set: the shell's hub switch link ONLY (the page body contributes ZERO anchors).
2. **Demo toast via existing hooks** — none planned.
3. **Labeled disabled/planned control** — the four `.pt-planned` mini-cards ({billingGate, matDownload} backendRequired · {fullHistory, meetingRequest} planned) + the four inline availability chips on the requests-hub preview cards. Each labeled icon+text, never an anchor.
4. **Display-only content** — everything else.

## 2. The zero-pay hard line (machine-enforced)

The family page must NEVER render: amounts, prices, `hourRate`, plan costs, currency tokens (ريال · ر.س · SAR · USD · $ € £), pay-now/سداد/ادفع vocabulary, renewal controls, invoice figures, or any payment affordance. The fixture's `plan.perHour`/`hourRate` fields are display-suppressed. Smoke asserts a currency/pay regex = 0 hits on the built body (research D11).

## 3. Request honesty (the F3/F8/F10/F11 previews)

- **Cancel/reschedule**: display-only option lines + the honest no-replacement caution note; NO radios/date/time inputs/submit; gate = inline backendRequired chip.
- **Feedback-about-teacher**: display-only question lines (no rating-scale visual, no score vocabulary); gate = inline backendRequired chip.
- **Meetings**: the truthful `.pt-empty` (no meetings exist in fixtures) + inline planned chip.
- **Trial/add-child**: two display-only path tiles (new vs existing child); gate = inline backendRequired chip.
- **Uploads (file/voice)**: NEVER rendered as controls — F4 stays backendRequired, invisible except honest wording where relevant.

## 4. Forbidden outright

`href="#"` · dead links · `<form>`/`<input>`/`<select>`/`<textarea>` elements · fake chat/notification/live-join affordances · notification counts · backend promises · "coming soon" hype · aggressive warning styling (the caution is a calm note, not an alarm).

## Acceptance (binding)

1. **Given** both built files, **When** anchors and form controls are enumerated, **Then** anchors = shell set only, form controls = 0.
2. **Given** the built family body, **Then** the zero-pay regex finds 0 hits (AR + EN), and «يتطلب الخادم»-class gate labels appear on every request/billing/download gate.
3. **Given** the requests hub, **Then** every preview card carries its labeled availability chip and no control simulates submission.

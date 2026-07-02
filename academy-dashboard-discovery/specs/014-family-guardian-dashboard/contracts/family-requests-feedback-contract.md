# Contract: Family Requests & Feedback Hub (Spec 014)

**Status**: Binding · References FR-010…FR-013, US6; research D4/D5/D6/D10; delivers F3 (preview), F8 (preview), F10, F11 (preview); capture-verified field inventories.

## 1. ONE hub section, four preview cards

The requests & communication hub is a single section with exactly four preview cards, each carrying real display content + an INLINE labeled availability chip (these are NOT `.pt-planned` mini-cards):

| Card | Content (display-only) | Chip |
|---|---|---|
| **Cancel / reschedule** | The two request kinds as option LINES (with-reschedule / without-replacement) + the honest caution note («عند الإلغاء دون تأجيل لا تُعوَّض الجلسة» — calm `pt-note`, not an alarm) | **backendRequired** |
| **Feedback about the teacher** | The rubric dimensions as question lines (see/hear clarity · what you like · anything to improve · optional comment — gentle rewordings; NO rating-scale visual, NO score vocabulary) | **backendRequired** |
| **Meetings** | The truthful `.pt-empty` — «لا توجد لقاءات مجدولة — كل شيء على ما يرام 🌿» (no meetings entity exists in fixtures; legacy capture was empty too) | **planned** (request a meeting) |
| **Request a trial / add a child** | Two path tiles: «طفل جديد» (name/age/language/gender concept line) · «طفل حالي» (choose-from-my-children concept line) | **backendRequired** |

## 2. MUST NOT

No `<form>`/`<input>`/`<select>`/`<textarea>`/radio/checkbox anywhere in the hub; no submit/send button; no disabled form fields (they read as broken); no star/scale rating visual; no fabricated meeting entries; no upload/voice affordance (F4 stays backendRequired and unrendered).

## Acceptance (binding)

1. **Given** the hub, **Then** exactly 4 preview cards render, each with its labeled inline availability chip (2 backendRequired visible here + meetings planned + trial backendRequired) and zero form controls.
2. **Given** the cancel card, **Then** the no-replacement caution renders as a calm note in both languages.
3. **Given** the meetings card, **Then** the `.pt-empty` pattern renders truthfully (smoke `.pt-empty ≥ 1`).

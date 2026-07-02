# Contract: Student History & Session Feedback (Spec 013)

**Status**: Binding · References FR-011; research D6; delivers coverage row F6 (student view).

## 1. Record shape (capture-verified F6 fields)

Each «جلساتي الأخيرة» card renders: course/session title · teacher name · authored day label · **summary line** (Class Summary, with Class Remark folded in) · **homework-note line** (Homework Note) · a labeled outcome chip where fixture truth exists.

## 2. The three records

1. **Real anchor**: `SESSION_OUTCOMES` row `out1` — st1 · math (s1) · sara · **attended** · existing feedback key `data.att.fb.good`. Its chip is the real outcome chip from the existing outcome-status map.
2–3. **Authored records** (`STUDENT_PREVIEW.history`): course ref + teacher key + authored summary/homework keys. Exactly ONE carries a display-only attachment annotation (paperclip + label — NO link, NO fake download).

## 3. The future surface

The section closes with the `.pt-planned` mini-card **«السجل الكامل»** classed **planned** — the deep history surface stays future; no fake "view all" route.

## 4. MUST NOT

No modal interaction (legacy-clone), no computed streaks/aggregates from the records, no more than 3 records (reflection, not a log), no invented negative feedback (the tone stays constructive — this is a child's page).

## Acceptance (binding)

1. **Given** the section, **Then** 3 cards render — the first resolving `out1`'s real fields (teacher sara, attended chip, good-feedback text) and each showing the summary + homework-note pair.
2. **Given** the attachment annotation, **Then** it is display-only (no anchor, no click affordance).
3. **Given** the coverage artifact, **Then** row F6 carries the "delivered by Spec 013 (…full history remains planned)" note.

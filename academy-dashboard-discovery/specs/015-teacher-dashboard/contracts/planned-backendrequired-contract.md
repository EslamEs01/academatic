# Contract: Planned / backendRequired Vocabulary (Spec 015)

**Status**: Binding · References FR-015; research D5–D10/D13; reuses the Spec-008 availability vocabulary via `availabilityChip` unchanged.

## 1. The teacher page's exact planned register (re-registered `PORTAL_PLANNED.teacher`)

| id | Section | Availability | Label concept |
|---|---|---|---|
| `outcomeSave` | Session-outcome workflow | **backendRequired** | «حفظ نتيجة الجلسة» — recording results needs the real backend |
| `matUpload` | Materials & library | **backendRequired** | «رفع وتنزيل الملفات» — file storage (both directions) |
| `availabilityEdit` | Timetable & availability | **backendRequired** | «تعديل التوفّر» — slot editing writes to the schedule |
| `taskManage` | Homework & tasks | **planned** | «إدارة المهام» — the full task surface arrives with Spec 016 |

Count **2 → 4** (smoke D13: `.pt-planned .chip.tone-amber === 3` + `.tone-neutral === 1`). The Spec-012 ids retire honestly: `materials` graduates to the materials section + `matUpload`; `tasks` graduates to the tasks section + `taskManage`.

## 2. Inline availability chips (NOT planned mini-cards)

The rubric-preview and certificate-preview cards carry INLINE `availabilityChip('backendRequired')` (the proven 014 pattern) — content-bearing preview cards, not `.pt-planned` gates. Each chip is the labeled icon+text vocabulary.

## 3. Rules (standing)

Every `.pt-planned` mini-card: a non-anchor `<div>` with the labeled chip; figure-free; honest availability language; no "coming soon" hype; **no pay-adjacent wording anywhere near the gates** (the outcome-save gate speaks of recording, never of rates). Student (3) and family (4) registers byte-untouched.

## Acceptance (binding)

1. **Given** the teacher page, **Then** exactly 4 `.pt-planned` cards render with the ids/availabilities above; plannedBad = 0.
2. **Given** the rubric + certificate previews, **Then** the two inline backendRequired chips render labeled.
3. **Given** student/family/hub pages, **Then** their planned counts/labels are byte-unchanged (identity contract).

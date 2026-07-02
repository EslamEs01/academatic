# Contract: Planned / backendRequired Vocabulary (Spec 013)

**Status**: Binding · References FR-016; research D2/D9; reuses the Spec 008 availability vocabulary via `availabilityChip` unchanged.

## 1. The student page's exact planned register (re-registered `PORTAL_PLANNED.student`)

| id | Section | Availability | Label concept |
|---|---|---|---|
| `hwSubmit` | Homework & tasks | **backendRequired** | «تسليم الواجبات يتطلب الخادم» — the upload gate (coverage F4) |
| `matDownload` | Learning materials | **backendRequired** | «تحميل الملفات يتطلب الخادم» — the download gate |
| `fullHistory` | My recent sessions | **planned** | «السجل الكامل» — the future deep-history surface |

Count stays 3 (smoke contract preserved); semantics graduate from 3×planned to 2×backendRequired + 1×planned. The Spec-012 ids (`homework`/`materials`/`leaderboard`) retire: the first two graduate into real sections, the third resolves into the celebration section (research D3).

## 2. Rules (unchanged from Spec 012, restated as binding)

- Every mini-card: `<div class="pt-card pt-planned">` (NEVER `<a>`), with the labeled `availabilityChip` (icon + text — never color-only).
- Figure-free: no amounts, counts-of-things-that-don't-exist, or dates on planned cards.
- Honest availability language; no "coming soon" hype; the in-section join note in next-session uses the same backendRequired vocabulary.
- Family/teacher registers untouched (family 3: bill backendRequired · meet planned · subs planned; teacher 2: mat/tasks planned).

## Acceptance (binding)

1. **Given** the student page, **Then** exactly 3 `.pt-planned` cards render with the ids/availabilities above (smoke re-scope D9), plannedBad = 0.
2. **Given** the AR body, **Then** «يتطلب الخادم» ≥ 2 occurrences (both gates) and the planned chip label on the history card.
3. **Given** family/teacher/hub pages, **Then** their planned counts/labels are byte-unchanged (identity contract).

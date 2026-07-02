# Contract: Planned / backendRequired Vocabulary (Spec 014)

**Status**: Binding · References FR-018; research D3/D8/D10/D11; reuses the Spec-008 availability vocabulary via `availabilityChip` unchanged.

## 1. The family page's exact planned register (re-registered `PORTAL_PLANNED.family`)

| id | Section | Availability | Label concept |
|---|---|---|---|
| `billingGate` | Billing status | **backendRequired** | «الفواتير والدفع» — real invoices/payment need the billing backend |
| `matDownload` | Family materials | **backendRequired** | «تحميل الملفات» — the download gate |
| `fullHistory` | Recent sessions | **planned** | «السجل الكامل» — the deep history surface |
| `meetingRequest` | Requests hub (meetings card) | **planned** | «طلب لقاء» — requesting a meeting |

Count **3 → 4** (smoke re-scope D11: `.pt-planned .chip.tone-amber === 2` + `.tone-neutral === 2`). The Spec-012 ids retire honestly: `billing` graduates to the status section + `billingGate`; `subscriptions` graduates to the plans section (no gate needed — fully display-only); `meetings` graduates to the meetings preview + `meetingRequest`.

## 2. Inline availability chips (NOT planned mini-cards)

The requests-hub preview cards carry INLINE `availabilityChip`s (cancelResched backendRequired · teacherFeedback backendRequired · trial backendRequired) — they are content-bearing preview cards, not `.pt-planned` gates; the plannedBad rule does not apply to them, but each chip must still be the labeled icon+text vocabulary.

## 3. Rules (standing)

Every `.pt-planned` mini-card: a non-anchor `<div>` with the labeled chip; figure-free; honest availability language; no "coming soon" hype. Student (3) and teacher (2) registers byte-untouched.

## Acceptance (binding)

1. **Given** the family page, **Then** exactly 4 `.pt-planned` cards render with the ids/availabilities above; plannedBad = 0.
2. **Given** the requests hub, **Then** the three inline backendRequired chips + the meetings planned chip render labeled.
3. **Given** student/teacher/hub pages, **Then** their planned counts/labels are byte-unchanged (identity contract).

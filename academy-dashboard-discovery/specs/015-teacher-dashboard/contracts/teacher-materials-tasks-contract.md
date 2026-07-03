# Contract: Teacher Materials & Tasks (Spec 015)

**Status**: Binding · References FR-007/FR-008, US5; research D6/D7; delivers T15 (materials) + the honest tasks preview (the legacy T16 tickets shell was empty — excluded; T11 plans fold into the tasks/report previews).

## 1. Homework & tasks section

- Exactly 3 authored display-only task cards (`TEACHER_PREVIEW.tasks`): prepare the fractions worksheet · review st1's homework · prepare grp1's monthly report — each with a course/child association line + an authored due label (`.pt-tag` vocabulary).
- Section closes with the `.pt-planned` mini-card **`taskManage`** classed **planned** («إدارة المهام» — the full task surface arrives with the portal operations shell, Spec 016).
- NO assign/upload control, NO checkboxes, NO fake completion toggles.

## 2. Materials & library section

- Exactly 3 authored display-only material cards (`TEACHER_PREVIEW.materials`): worksheet PDF · equations video · practice examples — type icons (`file-text`/`play`/`materials`) + course refs.
- Section closes with the `.pt-planned` mini-card **`matUpload`** classed **backendRequired** («رفع وتنزيل الملفات» — file storage requires the real backend; one gate covers both directions).
- NO links, NO fake download/upload, NO search/filter shell (the legacy library search graduates with a real materials surface later, not as a dead control).

## Acceptance (binding)

1. **Given** both sections, **Then** 3 + 3 display-only cards render with resolving refs and zero interactive controls.
2. **Given** the gates, **Then** `taskManage` renders planned (neutral) and `matUpload` backendRequired (amber) — counted by the smoke chip-tone assert.

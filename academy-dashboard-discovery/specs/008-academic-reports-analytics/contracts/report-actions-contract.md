# Contract: Report Actions (honest, no engine)

**Status**: Binding · Defines the report action cluster (Print / Export CSV / Export PDF / Share / Schedule) as honest demo/confirm/disabled — reusing existing hooks. No real export/send/schedule/persist. References FR-010 / FR-015; data-model §12.

---

## 1. Purpose & honest scope (no export engine)

The legacy reports carried thin/broken export buttons (an unlabeled `export-aa`, a `downlaod` typo, a 500 `export-course`) — real export is an **unbuilt backend feature**. Spec 008 reproduces the **affordances** honestly: a `reportActions()` cluster where every action is a **demo toast**, a **confirm modal → demo toast**, or **disabled-with-reason**. **No real file generation, CSV/PDF, download, email/share, or scheduled job.**

## 2. The action matrix (binding — exact)

`reportActions()` (`report-actions.js`) emits:

| key | kind | hook(s) | labelKey (AR / EN) |
|---|---|---|---|
| `print` | demo | `data-demo-action` `data-toast="rep.act.print.toast"` | طباعة التقرير / Print report |
| `exportCsv` | disabled-with-reason | `data-disabled-reason` `data-reason-key="rep.reason.export"` | تصدير CSV / Export CSV |
| `exportPdf` | disabled-with-reason | `data-disabled-reason` `data-reason-key="rep.reason.export"` | تصدير PDF / Export PDF |
| `share` | disabled-with-reason | `data-disabled-reason` `data-reason-key="rep.reason.share"` | مشاركة التقرير / Share report |
| `schedule` | confirm → demo | `data-confirm` `-title="rep.act.schedule.title"` `-msg="rep.act.schedule.msg"` `-cta="rep.act.schedule.cta"` `-toast="rep.act.schedule.toast"` | جدولة التقرير / Schedule report |

`print` is a **demo toast** ("report print is a demo — no file is generated"); `exportCsv`/`exportPdf`/`share` are **disabled-with-reason** (they genuinely need a backend); `schedule` is the **confirm → demo** (the frame-#4 capture) with copy that states it is a demo and **no backend job is created**.

## 3. Reason keys (binding list)

| key | AR | EN |
|---|---|---|
| `rep.reason.export` | التصدير يتطلب الخدمة الخلفية — خارج النطاق الحالي | Export requires the backend — out of current scope |
| `rep.reason.share` | المشاركة تتطلب الخدمة الخلفية — خارج النطاق الحالي | Sharing requires the backend — out of current scope |

## 4. MUST NOT (binding boundary)

No real file/CSV/PDF generation; no `window`-blob download faking a real export; no email/share send; no scheduled/queued backend job; no persistence; no finance/export of money data; no dead control; no new action `data-*` hook.

## 5. `data-*` hooks (reuse only)

`data-demo-action`, `data-toast`, `data-confirm` (+`-title|-msg|-cta|-toast`), `data-disabled-reason`, `data-reason-key`. Wired by the existing `enhance.js` delegated-click engine. No new hook.

## 6. States / responsive / a11y

Disabled actions show the reason on hover + focus (keyboard-reachable); toasts announced; the Schedule confirm traps focus + returns it; labels icon+text (no raw key); RTL/LTR + dark correct; the cluster wraps on mobile.

## 7. Static-HTML-first & Django

Action markup baked; behavior is `enhance.js`. **Django**: static markup; hooks carry into templates unchanged; no server action wired in this spec.

## 8. Enforcement & cross-references

- **Smoke**: every report action matches one honest kind (a `data-demo-action`+`data-toast`, OR `data-disabled-reason`+`data-reason-key`, OR a `data-confirm`+title/msg/cta/toast); **zero** dead controls; **zero** real export/send/schedule; the Schedule confirm opens a modal → demo toast; no raw `rep.*` key.
- **Screenshots**: frame #4 (`reports__ar__light__desktop__action.png`) — the Schedule confirm-demo modal.
- Binds to `reports-page-contract.md`, `scope-guard.md`, and the Spec 007 `../../007-teacher-performance-kpis/contracts/teacher-actions-contract.md` (the honesty model). **MUST NOT** introduce a real export/send/schedule, a finance export, or a new action hook.

**Acceptance (binding):**
1. **Given** any report action, **When** triggered, **Then** it produces a demo toast / confirm→demo-toast / disabled-with-reason — never a real export/send/schedule/persist.
2. **Given** the action set, **When** audited, **Then** no real file/CSV/PDF/share/scheduled-job occurs and there are zero dead controls.
3. **Given** Schedule report, **When** clicked, **Then** a confirm modal opens stating it is a demo, and confirming shows a demo toast with no backend job.

# 20 — No‑Missing‑Items Audit

> Verification gate. Every answer below is backed by a machine artifact (manifest, ledger, inventory, aggregates, coverage map), not by recollection. Generated against `01-completeness-ledger.json`, `02-all-pages-expanded-inventory.json`, `_build/aggregates.json`, `_build/coverage.json`.

## Q1 — Did every role page appear in the inventory?
**Yes — 339/339.** Manifest counts 339 page `.json` + 339 page `.md` (admin 300, teacher 26, family 13). The completeness ledger ([01](01-completeness-ledger.md)) has one row per page; the expanded inventory ([02](02-all-pages-expanded-inventory.md)) has one block per page. Role‑map ↔ JSON cross‑check: **0 orphans, 0 map‑only** for all three roles. Every page also has its `.txt`, sanitized `.html`, raw `.html`, and ≥1 full screenshot — **0 artifact gaps**.

## Q2 — Did every page get a future‑spec assignment?
**Yes — 339/339, 0 unassigned** ([19](19-spec-coverage-map.md), `_build/coverage.json`). Distribution: S002=34, S003=49, S004=109, S005=16, S006=7, S007=56, S008=2, S009=26, S010=13, S011=27 (+ S001 foundation & S012 QA are cross‑cutting). 44 route‑template families mean many of the 339 are query‑param **variants** that collapse into shared templates (e.g. ~60 teacher scope/sort pages → one list; ~25 invoice status/date variants → one list).

## Q3 — Did every distinct modal / interaction get assigned?
**Yes.** 66 distinct modal titles (deduped from 1,373 instances); 63 functional + 3 global‑chrome. All 66 mapped to a spec in [19](19-spec-coverage-map.md) (chrome → S001 shell; session‑action family → S005; finance modals → S007; etc.). Interaction types (dropdown/menu 551, accordion 104, modal 47, navigation 59, tab 8, inline 5) are catalogued in [05](05-distinct-interaction-catalog.md) and covered by the component specs (S001 primitives + owning module specs).

## Q4 — Did every major form / table / module get assigned?
**Yes.** 141 distinct form‑action endpoints and 104 distinct table column‑sets ([06](06-complete-data-surface.md)) belong to pages that are all spec‑assigned (Q2). All **19 discovered modules** map to specs ([02 module map‑v2](07-product-module-map-v2.md), [19](19-spec-coverage-map.md)). 195 observed GET routes + 109 mutation endpoints are grouped by domain in [06](06-complete-data-surface.md).

## Q5 — What is still uncertain?
- **RTL/Arabic UI:** never exercised (English‑only capture) — our RTL is a forward design requirement, not an observation.
- **Mutating flows:** never executed (by design) — field lists known, but server validation, success/error states, and multi‑step outcomes are **inferred**.
- **Empty test data:** many lists captured empty — column sets known, row/edge rendering inferred.
- **JSON API contract:** **none observed** (server‑rendered HTML). The 195 GET routes + 109 form endpoints are observations, not a documented API.
- **Field semantics:** legacy DOM `name`s are hints, not a contract.

## Q6 — What needs owner / backend confirmation? (carried to [17](17-open-decisions-v2.md))
1. The **API contract & auth** (REST/GraphQL? endpoints, params, tokens, pagination) — biggest unknown.
2. **Real‑time** mechanism (chat, live session status, notifications).
3. **File upload/download/export** flows incl. the 2 failing exports + salary‑slip & certificate PDF generation + family voice upload.
4. **Payment‑gateway** server flows (7 in, 2 payout providers); does family pay online (no pay form found on `/student/billing`)?
5. Whether a real **Exams/Quizzes** feature exists beyond the Forms builder.
6. **Permission semantics** of the ~170 flags + category scoping.
7. **Multi‑currency conversion** timing (point‑in‑time FX on invoices?).
8. Certificate `json_data` canvas format + PDF render service.
9. CSV import shapes + legacy data migration.

## Q7 — What should be deliberately dropped or redesigned?
**Drop (do not rebuild as‑is):**
- The broken "Dashboard 1" sidebar link → 4 `main/index.html` 404s (teacher×3, family×1) — remove; fix nav to absolute paths.
- Broken legacy profile **view** pages (`/teacher/profile`, `/student/profile` = 500) — rebuild working views from the edit fields.
- The 504 `settings/customisation/message-builder` — redesign blind.
- The 4 admin 500s as legacy behavior (`export-course`, `families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`) — rebuild the underlying feature + proper error states.
- The misleading legacy labels (Materials shown as "Courses List", `downlaod` typo route) — rename.
- Per‑row button clusters (3–6 colored pills) — replace with a row‑action menu.

**Redesign (improve):**
- Flat ~40‑item admin sidebar → grouped ≤8‑section IA ([13](13-improved-information-architecture-v2.md)).
- Hidden filters → persistent FilterBar + chips. Eager‑rendered tabs/modals (300–380 KB pages) → lazy. Status colors → one themeable map. Wide tables → responsive (sticky col / card view). Empty/loading/error states → designed components. Large modals (Mark Absent/Cancel/Edit, 24‑field report, create‑family) → drawers/full‑page with dual‑timezone affordance + danger confirms.

## Broken‑page coverage check (13)
Each broken page is assigned to a spec that must ship a **working page + proper error state**:
| Page | HTTP | Spec |
|---|--:|---|
| `management-export-course` | 500 | S011 (export UX) |
| `management-families-feedback-family-1` | 500 | S003 |
| `management-new-requests-scheduled-trials-index-status-3-4-…` | 500 | S002 |
| `management-new-requests-scheduled-trials-index-status-5-7-6-…` | 500 | S002 |
| `management-settings-customisation-message-builder` | 504 | S011 |
| `management-teachers-1-monthly-classes` | 500 | S004 |
| teacher `main-index-html` (+3 variants) | 404 | S009 (remove nav) |
| `teacher-profile` | 500 | S009 (build view) |
| family `main-index-html` | 404 | S010 (remove nav) |
| `student-profile` | 500 | S010 (build view) |

## Verdict
**No captured page, modal, form, table, or module is unaccounted for.** 339/339 pages inventoried, artifact‑complete, and spec‑assigned; 66/66 modals assigned; 19/19 modules assigned. Remaining gaps are **backend/owner confirmations** (Q6) and **forward design requirements** (RTL, error states), all logged — none are silent drops. Spec **S012** re‑runs this audit against the built product.

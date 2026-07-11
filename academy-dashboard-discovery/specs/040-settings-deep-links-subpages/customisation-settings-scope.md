# Customisation / Personalisation — Scope (Spec 040)

**Nav id** `settingsCustomization` · **Route** `settings.html#view=customization` · **Surface** the existing `customization` tab · **Count impact** 0

Legacy: `/management/settings/customisation/personalisation` — **35 visible fields, 17 distinct names**, one `PUT`. Plus a **Message Builder** sibling that returns a **504**.

## The evidenced field set (17 distinct names)

### Global appearance (6 controls)

| Legacy name | Control | Options / default | Disposition |
|---|---|---|---|
| `color_scheme` | colour + hex text | `#5E4D7E` | **render display-only** + gated Save |
| `secondary_color_scheme` | colour + hex text | `#7B6BA8` | **render display-only** + gated Save |
| `theme` | radio ×3 | light · dark · **system** ✓ | **REAL — keep functional** (existing `data-set-theme` hook + `academy.theme` key) |
| `container_layout` | radio ×2 | **full** ✓ · boxed | **render display-only** + gated Save |
| `sidebar_type` | radio ×2 | **full/expanded** ✓ · mini/collapsed | **render display-only** + gated Save |
| `card_style` | radio ×2 | **border** ✓ · shadow | **render display-only** + gated Save |

### Class/session status colours (11)

`class_statuses_colors[...]` — `pending` #FFC107 · `waiting` #17A2B8 · `teacher-absent` #DC3545 · `student-absent` #DC3545 · `teacher-cancel` #6C757D · `student-cancel` #6C757D · `admin-cancel` #6C757D · `attend` #28A745 · `reschedule` #007BFF · `running` #007BFF · `makeup` #17A2B8

Badged in legacy: **"Applies globally to all users."**

**Disposition**: render **all 11** as a display-only palette list with a gated Save and a gated Reset-to-Default. The current app shows only 4 hex swatches — 9 are missing (2 of the 11 map onto existing chips).

> **The decisive accessibility finding**: those 11 statuses collapse to **7 distinct hex values** (`#DC3545` ×2, `#6C757D` ×3, `#007BFF` ×2, `#17A2B8` ×2). Colour alone is *literally* ambiguous in the legacy product — teacher-absent and student-absent are the same red; three different cancels are the same grey. This is direct vindication of the standing **icon + text** chip law. Every status must remain identified by **icon + text**, and the palette must never become the sole carrier of meaning.

### Legacy actions (4)

| Action | Legacy behaviour | Disposition |
|---|---|---|
| **Apply for me** | `preventDefault` → writes **localStorage only** (`theme`, `boxedLayout`, `sidebarType`, `cardBorder`). **No server write.** A per-admin override. | This is exactly our theme model. **Theme and language stay real** via the existing hooks/keys; the *other* three are display-only because making them live would require **new hooks and new storage keys**, which standing law forbids. |
| **Reset** | clears that localStorage | folded into the real theme/language controls |
| **Reset to Default** | restores the 11 hexes client-side | **confirm → gate** |
| **Save changes** | the **only** server write (`PUT`) | **gate** |
| **Pick from logo** ×2 | derives a palette from the company logo image, client-side | **NOT rebuilt** — depends on a real uploaded logo (which is itself a gate) and on client-side image analysis. Recorded as a future enhancement, not invented. |

## The honesty split (this tab's whole point)

| What | Honest class |
|---|---|
| **Theme** (light / dark / system) and **language** | **REAL.** Genuinely applies, genuinely persists to the existing keys. Must be **labelled as a personal preference**, not an academy-wide saved setting — this is the distinction the brief demands between "safe local theme preview" and "real persisted settings". |
| Brand colours, container layout, sidebar type, card style, status palette | **Display-only + one gated Save.** No new hook, no new storage key, no fake persistence, no fake theme save. |

Legacy itself makes the same split — "Apply for me" is local-only and "Save changes" is the only server write — so this is faithful to the evidence, not a compromise.

## Contrast & safety requirements

- The rendered palette must not present combinations that fail WCAG AA against their surfaces; the spec requires contrast validation at design time and forbids shipping an unsafe default pairing.
- Because the palette is display-only in Spec 040, no user-chosen unsafe combination can reach the product. When it becomes real (backend), contrast validation is a **hard gate** — recorded for the owning spec.
- Reset-to-default must be a confirm, not a silent wipe.

## Message Builder — the 504

`/management/settings/customisation/message-builder` returns **HTTP 504 Gateway Timeout**. Captured: `0 links, 0 buttons, 0 forms, 0 inputs, 0 tables, 0 modals`. The deep corpus is explicit: *"This feature cannot be assessed from the crawl"* and flags it as **"redesign blind"**.

**Disposition** — all three options in the brief were considered:

| Option | Verdict |
|---|---|
| Explicitly reject | Rejected — the *capability* (per-event message templates) is clearly real and is referenced by the Notifications tab's Create/Edit buttons |
| **Assign a safe redesigned future owner** | **CHOSEN** — owner **Spec 053 (Integrations Command Center)**, because message templating is inseparable from the real channel providers |
| Replace with an evidence-backed alternative | Not possible — **there is no evidence** |

In Spec 040 it remains exactly what it is today: an **honest `data-disabled-reason` gate** (`adm.set.cust.msgBuilderReason`). **The 504/broken state is never reproduced as a feature**, and no message-builder UI is invented.

## Field accounting

17 distinct evidenced names → **2 real** (theme; language is ours) · **15 rendered display-only with gated Save** · **2 actions not rebuilt** (Pick-from-logo ×2, recorded) · 0 invented.

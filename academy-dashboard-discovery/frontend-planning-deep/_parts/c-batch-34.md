# Batch 34 — teacher · Profile / Account

### `teacher-profile-edit` — Teacher Profile Edit

- **Purpose:** Allows a teacher to update their personal profile information (name, email, avatar) and change their account password from a single settings page.
- **Key sections / flows:** Two card panels side-by-side — (1) "First Name" card: avatar upload/reset + first name, last name, email fields; (2) "Change Password" card: old password, new password, confirm password fields. Both cards have independent "Save changes" submit buttons. Header notification bell shows "5 new" badge and a "New" tag.
- **Key SAFE actions:** View profile fields, Reset avatar preview (client-side reset button), View all notifications (navigation link to monthly-plans), Close modals, language switcher, sidebar navigation.
- **Key MUTATING/dangerous actions:** "Save changes" (profile form — POST `/teacher/profile-edit`), "Save changes" (password form — POST `/teacher/update-teacher-password`), "Save" (shortcut form — POST `/teacher/shortcuts`), "Add shortcuts" (opens shortcut creation modal), logout (POST `/teacher/logout`).
- **Important modals/forms:**
  - Modal 2 "Add shortcuts": Title field + Link field; submit saves a sidebar shortcut entry. Key fields: `shortcut_title` (text), `shortcut_link` (URL text). Dangerous — saves persistent navigation shortcuts.
  - Form 2 (profile): `onlineImage` (hidden URL), `image` (file upload, JPG/GIF/PNG ≤1MB), `first_name`, `last_name`, `email`. No client-side required validation flagged.
  - Form 3 (password): `old_password`, `new_password`, `confirm_password`. No required attributes set — backend must validate.
- **Variant-of:** unique template
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`). Initial page load redirects through `/management/home` → `/login` → `/teacher/home` before landing (302 chain), suggesting auth session handling. No page-level 404/500. One empty Modal 1 captured (no content/fields recorded — likely a notification or generic confirmation dialog not fully populated during crawl).
- **UX improvement for the rebuild:** Split the page into two clearly labelled, independently scrollable sections (or tabs: "Personal Info" / "Security") with inline validation and visible required-field markers. The password form lacks `required` attributes and any visible strength indicator — add both. Avatar upload should show a live preview before save. The "Add shortcuts" modal is buried in the global header chrome; consider moving shortcut management to a dedicated preferences section.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single page covers the teacher's self-service account management — identity data (name, email, avatar) and credentials (password change). Secondary functionality adds personal navigation shortcuts. Core entities: Teacher profile record, teacher credentials, sidebar shortcuts.

**Distinct page templates vs variant count:**
- 1 unique template (`teacher-profile-edit`)
- 0 variant pages

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- "Add shortcuts" modal (POST to `/teacher/shortcuts`) — mutating; persists sidebar entries.
- "Save changes" (profile) — mutating; updates PII.
- "Save changes" (password) — mutating and security-sensitive; requires old-password verification.
- Notification dropdown (header) — safe read-only view.
- Language switcher — safe, GET-based locale change.

**Improvements for the new platform:**
1. **Tabs / sections:** Replace the flat two-card layout with named tabs ("Personal Info", "Security") to reduce visual clutter and allow independent save flows without confusion.
2. **Form validation:** Add `required` on all password fields client-side; enforce password strength rules with a visible meter; confirm-password match validation before submit.
3. **Avatar upload UX:** Live crop/preview before committing the upload; explicit file-size error if >1MB.
4. **Dangerous action confirmation:** Password change should show a confirmation step or success/failure toast (SweetAlert2 is already loaded — use it consistently for all mutating outcomes).
5. **RTL-first:** Page is LTR only; the new build must flip layout direction when Arabic/Urdu/Persian locale is active — form labels, avatar positioning, and card stacking all need RTL mirrors.
6. **Shortcuts modal:** Move shortcut management out of the profile-edit page into a dedicated "Preferences" section or a persistent sidebar management drawer; its current placement is discoverable only via a header button.
7. **Logo 404:** Replace hardcoded `/storage/uploads/logo.png` with a configurable, fallback-safe logo asset reference.
8. **Accessibility:** Add ARIA labels to password inputs (placeholders are bullet characters only), use `role=dialog` + focus trap on modals, and ensure avatar `<input type=file>` has an accessible label.

**Anything that needs owner/backend confirmation:**
- Whether `onlineImage` (text URL) and `image` (file upload) are mutually exclusive or merged server-side — the rebuild needs to know which takes precedence.
- Password change endpoint (`/teacher/update-teacher-password`) — confirm whether the old password is validated server-side before accepting a change (not visible from the crawl).
- The empty Modal 1 — confirm what it is (possibly a confirmation dialog or notification detail view); needs content spec before rebuilding.
- Logo upload mechanism — is there a separate admin-side upload, or is the 404 a data gap on this environment?

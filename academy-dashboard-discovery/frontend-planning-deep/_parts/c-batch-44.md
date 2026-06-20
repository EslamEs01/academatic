# Batch 44 — family · Profile / Account & Students

### `student-profile-edit` — Student Profile Edit

- **Purpose:** Allows a student (family role) to update their personal information and change their account password from a single settings page.
- **Key sections / flows:** Two primary card sections — (1) Profile info card: avatar upload with reset, first name, last name, email fields, Save changes submit; (2) Change Password card: old password, new password, confirm password fields, Save changes submit. Header shows notification badge ("0 New", "5 new") and billing shortcut ("View all invoices"). Sidebar navigation covers Home, Schedule, Classes Summary, Courses, Billing, Student Feedback, Library, Logout.
- **Key SAFE actions:** Reset avatar preview (UI reset, no POST), View all invoices (navigation to billing), language switcher (GET), My Profile (navigation), sidebar links (navigation).
- **Key MUTATING/dangerous actions:** "Save changes" on profile form (POST to `/student/profile-edit` — updates name, email, avatar); "Save changes" on password form (POST to `/student/update-password` — changes account password); logout form (POST to `/student/logout`). "See All Notifications" is also flagged as submit/mutating.
- **Important modals/forms:** (1) Profile Edit Form — fields: `onlineImage` (hidden text, current avatar URL), `image` (file upload, JPG/GIF/PNG, max 1 MB), `first_name`, `last_name`, `email`; no field is marked required — rebuild must add server-side and client-side validation. (2) Change Password Form — fields: `old_password`, `new_password`, `confirm_password`; no required flags, no visible strength indicator. (3) One captured interaction triggered a dropdown/menu (likely the header avatar dropdown — no dedicated modal content captured beyond that).
- **Variant-of:** Unique template (no other student profile-edit variant seen in the batch set).
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`); custom stylesheet returns 404 (`/assets/custom/style.css`). No page-level 4xx/5xx — page loads at HTTP 200. No "No data" empty state, but avatar placeholder behavior when logo is missing is degraded.
- **UX improvement for the rebuild:** Split the two forms into clearly labelled tab sections (or accordion panels) — "Personal Info" and "Security" — with inline field-level validation (required markers, email format, password strength meter, new/confirm match check) and a confirmation toast/snackbar on success rather than a full page reload. Password fields should include show/hide toggles. The file upload should preview the selected image immediately before saving (currently requires save to see effect). Add explicit confirmation dialog before password change to prevent accidental submission.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
This single-page batch covers the student self-service profile management surface for the family role. Core entities: Student account (name, email, avatar) and credentials (password). The page acts as the account settings hub for the student portal.

**Distinct page templates vs variant count:**
- Distinct templates: **1** (`student-profile-edit`)
- Variant pages: **0** — no query-param, tab, or pagination variants captured in this batch.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Header notification dropdown (safe — read-only list)
- Header avatar/account dropdown → triggers navigation to My Profile or Logout (logout is dangerous — POST)
- Language switcher dropdown (safe — GET)
- Two independent POST forms on the same page (both dangerous — profile update and password change); the page conflates them visually, increasing accidental submission risk.

**Improvements for the new platform:**
1. **Form separation & validation:** Isolate profile and password sections (tabs or accordion); add client-side required/format validation with ARIA live-region error messages before any POST fires.
2. **Password UX:** Strength meter, show/hide toggles, real-time new/confirm match feedback; confirm dialog or 2-step verification before committing password change.
3. **Avatar upload:** Live preview on file select; enforce 1 MB / format constraints client-side with clear error text; show loading state during upload.
4. **Dangerous action distinction:** Use different button styles for destructive (password change) vs. standard save (profile info) so users don't confuse the two "Save changes" buttons — currently identical.
5. **RTL/i18n-ready:** Page is LTR-only; Arabic, Urdu, and other RTL languages are selectable from the language switcher — rebuild must apply `dir="rtl"` dynamically and test layout flip for both forms (labels, file upload row, button alignment).
6. **Broken assets:** Resolve 404 on logo and custom stylesheet before launch; use fallback avatar SVG rather than broken image when logo/avatar is missing.
7. **Notification badge:** "5 new" / "0 New" shown simultaneously in header — likely a dual-widget bug; rebuild should consolidate into one authoritative notification count with real-time polling or websocket update.
8. **Mobile:** Both cards should stack vertically and the file input row (photo + reset + allowed-types note) should wrap gracefully on small screens.
9. **Accessibility:** All inputs currently lack ARIA labels (only placeholder text present); rebuild must add `<label for>` associations, `aria-required`, `aria-describedby` for format hints, and `role="dialog"` on any modal overlays.
10. **Logout safety:** Logout is a POST form hidden in the sidebar — rebuild should add a confirm step or move to a clearly labelled "Sign out" button with a brief confirmation to prevent accidental session termination.

**Items needing owner/backend confirmation:**
- What fields are actually editable by the student vs. read-only (e.g., can email be changed freely, or does it require re-verification)?
- Does password change require email OTP/2FA confirmation?
- Is avatar stored server-side or as a URL reference (`onlineImage` field suggests both paths)?
- What triggers the notification count (5 new) — is there a real-time endpoint or is it polled?
- The `See All Notifications` button is flagged as a submit-type — confirm whether this is a GET redirect or an actual form submission that marks notifications as read.

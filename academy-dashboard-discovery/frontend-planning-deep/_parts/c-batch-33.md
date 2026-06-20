# Batch 33 — teacher · Chat / Messaging

---

### `teacher-chat` — Teacher Chat  (HTTP 200)

- **Purpose:** Real-time group and direct messaging hub for teachers, supporting multi-conversation chat with group and contact management.
- **Key sections / flows:**
  - Left panel: contact/conversation list with "Search Contact" input and "New alerts" badge; conversations listed with participant name, role label (Teacher), message count badge (0), and last message timestamp (e.g. "Wednesday").
  - Right panel (main): Opens selected conversation thread; shows "Loading more …" pagination for history; "Open chat from the list" placeholder when no conversation is selected.
  - Chat thread header: shows group/contact name, action icons (file preview, group settings).
  - Group Settings panel (modal/drawer): sections — "About Chat", "Members", "Leave Group" link.
  - Chats modal (Modal 3): Shows "New alerts" section with a contact list ("abdo ahmed", Teacher role); triggered by a UI control in the conversation panel.
  - File Preview: overlay on top of chat for attachment viewing.
- **Key SAFE actions:** Search contacts (GET form), browse conversation list, view chat history (with "Loading more…" infinite scroll), view group members list, view file preview, navigate sidebar links.
- **Key MUTATING/dangerous actions:**
  - Send message (submit button — could post to a chat endpoint, not explicitly named but inferred from the XHR call and submit button on form).
  - Leave Group ("Leave Group" link/button inside Group Settings modal — destructive, removes teacher from a group permanently).
  - Save (Add Shortcuts form — POSTs to `/teacher/shortcuts`; title + link fields).
  - See All Notifications (submit button — could trigger a state change or mark-read).
- **Important modals/forms:**
  - **Group Settings (Modal 2):** Shows chat metadata (About, Members list), contains "Leave Group" action — must require confirm dialog before executing.
  - **Chats / New Alerts (Modal 3):** Contact picker or notification inbox with conversation list; fields serialized as `[object Object]` (likely a search input or filters).
  - **Add Shortcuts (Modal 4):** Fields: `shortcut_title` (text, placeholder "Title"), `shortcut_link` (text, placeholder URL). POSTs to `/teacher/shortcuts`. Low risk but is a persistent mutating save.
  - **Message send form (Form 2/3/4):** Three near-identical GET forms with "Search Contact" placeholder — likely three rendering states (mobile, desktop, modal variant) of the same contact search. The actual message send appears to be via a separate XHR/fetch (1 captured), not a traditional form submission.
- **Variant-of:** Unique template — this is the sole chat page for the teacher role.
- **Broken/empty:**
  - Logo image returns HTTP 404 (`/storage/uploads/logo.png`).
  - Empty state present: "Open chat from the list" shown in right panel when no thread is selected — functional but visually plain.
  - "Loading more …" indicator visible in captured card content — chat history pagination works but no spinner/skeleton captured.
- **UX improvement for the rebuild:** The "Leave Group" action is embedded in the same Group Settings panel alongside benign member/about info, with no confirmation guard. In the rebuild, move "Leave Group" out to a dedicated danger zone section with a SweetAlert2-style confirm modal ("Are you sure you want to leave this group?"), requiring explicit acknowledgment before the action fires.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The `teacher-chat` page is the teacher-role messaging centre. Core entities: Conversations (group chats and direct messages), Contacts (teachers and possibly students/staff), Messages (paginated history, with file attachments), Groups (with membership management). Secondary entity: Shortcuts (personal quick-links saved to the sidebar).

**Distinct page templates vs variant count:**
- Unique templates: **1** (`teacher-chat`)
- Variants: **0** (single page; the three duplicate "Search Contact" forms are rendering artifacts of the same template, not separate routes)

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- Group Settings modal: opens in-page panel — contains "Leave Group" (DANGEROUS — no confirm guard observed).
- Chats/New Alerts modal: notification inbox with conversation picker (safe read-only browsing).
- File Preview overlay: safe, view-only attachment viewer.
- Contact search (3x GET forms): safe filter, no mutation.
- Add Shortcuts modal: low-risk save action; persists a personal quick-link.
- Send message (XHR): mutating but low risk (normal chat send).

**Improvements for the new platform:**
1. **Dangerous action guard:** "Leave Group" must trigger a confirmation modal with explicit acknowledgment — never fire on a single tap/click.
2. **Empty state:** Replace the plain "Open chat from the list" text with an illustrated empty state and a call-to-action to start a conversation, improving discoverability.
3. **RTL-first layout:** The existing page is LTR (`dir=ltr`, `lang=en`). In the rebuild, the two-panel chat layout (contact list left, thread right) must mirror correctly for RTL (Arabic primary language), with all flex/grid directions, padding, and icon placements flipped.
4. **Mobile responsive:** Chat UIs should collapse into a single-panel view on small screens (contact list → tap → thread), with a back button to return to the list. The current layout appears fixed two-panel with no captured mobile breakpoint.
5. **Loading/skeleton states:** Replace "Loading more …" raw text with a proper skeleton loader for message history, and add a send-progress indicator on the message composer.
6. **Duplicate form deduplication:** The three near-identical "Search Contact" forms suggest the template renders the contact search component multiple times (possibly sidebar + header + modal). The rebuild should share a single composable component for contact search, rendered once per context.
7. **Notification badge integration:** "New alerts" / "5 new" badges in the conversation list should integrate with the global notification system (not maintain a separate counter).
8. **Accessibility:** Chat message list needs `aria-live="polite"` region for incoming messages; modals need focus trap and `role=dialog`; "Leave Group" needs `aria-describedby` pointing to consequence text.
9. **Logo 404:** Fix the missing logo asset (`/storage/uploads/logo.png`) — this breaks brand identity across all teacher pages.

**Anything that needs owner/backend confirmation:**
- The actual message-send API endpoint is not explicitly captured (only 1 XHR noted without a URL in the excerpt). Backend team should confirm the WebSocket vs. polling vs. REST approach for real-time chat before rebuilding the frontend messaging layer.
- "Leave Group" — confirm whether this is reversible (can a teacher be re-added?) to correctly calibrate the severity of the confirmation warning.
- The "Chats / New Alerts" modal fields serialized as `[object Object]` — the backend schema for the notification/alert inbox needs clarification.

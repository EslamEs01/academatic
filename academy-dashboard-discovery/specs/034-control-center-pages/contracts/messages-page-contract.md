# Contract: messages.html — Spec 034

**Sections**: inbox list (authored conversations: name/role/unread/last-time) · default open thread panel (authored bubbles) · compose/reply box · filter/search · Create-Group + Add-Member form drawers.
**Allowed (read/UI)**: select/open a conversation (read-only thread sheet via `data-drawer="msg-<id>"`), filter/search, open Create-Group/Add-Member drawers.
**Final gated actions**: Send/Reply → `data-disabled-reason`; Create-Group Save → gate; Add-Member Save → gate; group image → inline gate.
**Forbidden**: fake sent, thread/read-state mutation, `type=file` (image = gate), websocket/realtime, backend/API, fake-success wording.
**Coverage**: smoke (messages.html/.en load; inbox rows render; thread panel renders; compose has visible controls; Send is a gate; no fake sent; no mutation; noFile). a11y (open-compose row). screenshots (inbox/thread/compose AR/EN/dark/mobile + Create-Group drawer).

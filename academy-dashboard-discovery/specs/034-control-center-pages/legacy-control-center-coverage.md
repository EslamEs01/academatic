# Legacy Control-Center Coverage — Spec 034

Maps each legacy capability to its evidence, current frontend state, and Spec-034 disposition. Capability coverage, not pixel clone.

| Legacy capability | Evidence path | Current frontend state | Disposition | Fix in 034? | Owner | Acceptance check |
|---|---|---|---|---|---|---|
| Chat / messaging inbox+thread | roles/admin/pages/management-chat.md | planned «قريبًا» (messages) | Build messages.html shell (inbox/thread/compose) | Yes | 034 | inbox+thread+compose render; Send gated |
| Create Group (name/bio/image/members) | management-chat.md (create-group-form) | none | Build as a form drawer; **image = gate (no type=file)** | Yes | 034 | form renders; image gated; Save gated |
| Add Member (staff/teachers/students) | management-chat.md (addMemberForm) | none | Build as a form drawer (member multi-selects) | Yes | 034 | form renders; Save gated |
| Message send/reply | management-chat.md (AJAX submit) | none | Compose textarea + **Send = gate** | Yes (shell) | 034 / future-backend (delivery) | Send gated; no fake sent |
| New Requests / leads list | management-new-requests*.md, table-inventory L836 | planned «قريبًا» (leads) | Build leads.html (KPI cards + list + 9 filters) | Yes | 034 | list + status filters render |
| Lead KPI statistics (computed) | management-new-requests.md | none | Authored display-only stat cards (no arithmetic) | Yes (display) | 034 | KPI cards are authored literals |
| Create New Request (2-section form) | management-new-requests-create.md (form-inventory L11176) | none | Build as a form drawer (~19 grounded fields, no money) | Yes | 034 | form renders; Submit gated |
| Add Notes (note textarea) | management-new-requests filter pages (noteForm) | none | Build inside lead-detail drawer | Yes | 034 | note field; Save gated |
| Change Status (9-option select) | management-new-requests (change-status) | none | Build inside lead-detail drawer | Yes | 034 | status select; Update gated; no fake flip |
| Convert lead / assign | management-new-requests (row Actions) | none | Convert/Assign = **gate** | Yes (gate) | 034 / future-backend (CRM) | convert/assign gated; no row mutation |
| Tasks board + per-staff table | management-tickets.md, table-inventory L1601 | planned «قريبًا» (tasks) | Build tasks.html (KPI strip + board/list + per-staff table) | Yes | 034 | board/list + table render |
| Task KPIs + "Average" (computed) | management-tickets.md | none | Authored display-only (no compute) | Yes (display) | 034 | counts/Average are literals |
| Add Section / create/move task | management-tickets.md (JS, not captured) | none | Create-task form (authored fields) + Add-Section; Save/Move = gate | Yes (shell) | 034 / future-backend (persistence) | form renders; Save/Move gated; no fake move |
| Public Advertisement compose | management-public-advertisement.md (form-inventory) | planned «قريبًا» (announcements) | Build announcements.html (list + compose + preview) | Yes | 034 | compose + preview + list render |
| Ad media attachment | management-public-advertisement.md (media[] type=file) | none | **Gate (no type=file)** | Yes (gate) | 034 / future-backend (storage) | media affordance is a gate |
| Ad channels (Advertisement/WhatsApp/private) | management-public-advertisement.md | none | Channel toggles shown; **Publish/WhatsApp send = gate** | Yes (shell) | 034 / future-backend (delivery) | Publish gated; WhatsApp gated |
| Audience category selects + recipient tables | management-public-advertisement.md | none | Audience multi-selects + recipient display | Yes | 034 | audience selects + recipient list render |
| System Notification settings (46 fields) | management-settings-notification.md | **already in settings.html Notifications tab (Spec 031)** | NOT rebuilt here | No | Spec 040 (settings deep-link) | announcements.html does not duplicate it |
| Time Zone converter (client-side) | management-time-convertor.md ("Time Zone" tab) | planned «قريبًا» (timeConverter) | Build time-converter.html — **real client tool (native Intl)** | Yes | 034 | live conversion works; no gate |
| Add Location / IANA catalog | management-time-convertor.md (Add-Location modal) | none | Timezone selects from an authored IANA list | Yes | 034 | timezone selects populate |
| DST "Changes" table (backend-read) | management-time-convertor.md ("Changes" tab) | none | Authored display-only DST board | Yes (display) | 034 | changes board is authored; no live sync |

## Evidence-gap note
- **tasks**: board/create/assign forms not captured (JS-driven, empty state). Rebuilt with authored safe demo fields grounded in the captured KPI + per-staff columns.
- **messages**: composer not captured as a structured form. Rebuilt with a standard compose textarea + gated Send.

# Contract: announcements.html — Spec 034

**Sections**: announcements list (audience/channel/status chips) · compose form (message textarea · channel toggles [Advertisement/WhatsApp] · private checkbox · expire date · audience category multi-selects · country/hours/language selects · media = gate) · preview card · recipient display (authored) · schedule = display/gate.
**Allowed (read/UI)**: fill compose, pick audience, preview (client-side render), filter list.
**Final gated actions**: Publish/Send → `data-disabled-reason`; WhatsApp/channel delivery → gate; media attachment → gate.
**Forbidden**: fake publish/notification delivery, `type=file` (media = gate), fake-success wording, duplicate of the settings Notifications form, backend/API.
**Boundary**: the System-Notification *settings* stay in `settings.html` (Spec 031/040); NOT rebuilt here.
**Coverage**: smoke (announcements.html/.en load; list renders; compose shows controls; preview renders; Publish/Send are gates; media gate/noFile; no fake published; no delivery). a11y (compose form row). screenshots (list+compose+preview AR/EN/dark/mobile).

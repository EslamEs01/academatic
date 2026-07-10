/* Spec 034 — Announcements (Control Center).
 *
 * A calm, fixture-only admin surface grounded in the legacy
 * `management-public-advertisement` page. It DISPLAYS the academy's authored
 * announcements (message · audience · channel · status · expiry) and offers a
 * REAL compose surface with visible, labeled fields (message, channels, expiry,
 * audience/country/timing/language selects) plus an authored preview and the
 * teacher/student recipient lists.
 *
 * Everything is display-only. Every write path is an honest backendRequired
 * gate: the media attach stays a disabled-with-reason button (never an upload
 * control), and Publish / WhatsApp send are disabled-with-reason buttons — they
 * never persist, never mutate a card, never fake a success. There is NO plotting
 * element, NO computed total, NO credential/secret field, and NO pay figure.
 * The notification event/channel settings matrix lives in settings.html, not here. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHeader } from '../components/page-header.js';
import { cardGrid } from '../components/card-grid.js';
import { button, chip } from '../components/ui.js';
import { field, optsFrom } from '../components/form-field.js';
import { emptyBox } from '../components/states.js';
import { ANNOUNCEMENTS, ANN_CHANNELS, ANN_STATUSES, ANN_AUDIENCES, ANN_RECIPIENTS } from '../fixtures/control-center.js';

/* authored channel / status → labeled chip (icon + text), resolved from the maps */
function channelChip(id) {
  const c = ANN_CHANNELS[id] || ANN_CHANNELS.dashboard;
  return chip({ labelKey: c.labelKey, tone: c.tone, icon: c.icon });
}
function statusChip(id) {
  const s = ANN_STATUSES[id] || ANN_STATUSES.draft;
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

/* one authored announcement card: status + channel chips, message, audience + expiry */
function announcementCard(a) {
  return `<article class="card p-4" data-row>
    <div class="flex flex-wrap items-center gap-1.5 mb-2.5">
      ${statusChip(a.statusId)}
      ${channelChip(a.channelId)}
    </div>
    <p class="text-[14px] text-ink mb-3" style="line-height:1.5">${esc(t(a.msgKey))}</p>
    <div class="flex flex-wrap items-center gap-2 text-[12.5px]" style="color:var(--c-ink-3)">
      ${chip({ labelKey: a.audienceKey, tone: 'neutral', icon: 'user' })}
      <span class="inline-flex items-center gap-1.5">${icon('calendar-clock', 'ico ico-sm')}<span>${esc(t(a.expireKey))}</span></span>
    </div>
  </article>`;
}

/* the authored announcement list (published / scheduled / draft, per fixture order) */
function announcementList() {
  const body = ANNOUNCEMENTS.length
    ? cardGrid(ANNOUNCEMENTS.map(announcementCard), { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'ann-list' })
    : `<div id="ann-list">${emptyBox({ icon: 'megaphone', tone: 'muted', titleKey: 'ann.empty.title', msgKey: 'ann.empty.msg' })}</div>`;
  return `<section class="mt-2">
    <div class="mb-3"><h2 class="section-title">${esc(t('ann.listTitle'))}</h2></div>
    ${body}
  </section>`;
}

/* one labeled checkbox row (implicitly associated via the wrapping <label>).
 * Plain checkbox — inert demo control, nothing is submitted. */
function checkRow(labelKey, name) {
  return `<label class="flex items-center gap-2.5 text-[13px] text-ink" for="cb-${esc(name)}">
    <input id="cb-${esc(name)}" name="${esc(name)}" type="checkbox" style="accent-color:var(--c-primary); width:16px; height:16px" />
    <span>${esc(t(labelKey))}</span>
  </label>`;
}

/* the three honest write gates — disabled-with-reason (media attach · WhatsApp · publish).
 * Media stays a gate, NOT an upload control; publishing/sending stay gated. */
const mediaGate = () =>
  button({ labelKey: 'ann.field.media', variant: 'secondary', size: 'sm', icon: 'file-text', disabled: true, reasonKey: 'ann.reason.media' });
const whatsappGate = () =>
  button({ labelKey: 'ann.ch.whatsapp', variant: 'secondary', size: 'sm', icon: 'message-circle', disabled: true, reasonKey: 'ann.reason.whatsapp' });
const publishGate = () =>
  button({ labelKey: 'ann.act.publish', variant: 'primary', size: 'sm', icon: 'megaphone', disabled: true, reasonKey: 'ann.reason.backend' });

/* the compose surface — a real card with visible, labeled fields. Selects reuse
 * the authored audience set; country/timing/language carry a single neutral option. */
function composeForm() {
  const oneOpt = [{ value: 'all', labelKey: 'cc.common.filterAll', selected: true }];
  return `<section class="card p-5 mt-8">
    <h2 class="section-title mb-1">${esc(t('ann.composeTitle'))}</h2>
    <p class="text-[12.5px] mb-4" style="color:var(--c-ink-3)">${esc(t('cc.common.backendNote'))}</p>
    <div class="wiz-grid">
      ${field({ labelKey: 'ann.field.message', name: 'ann-message', type: 'textarea', placeholderKey: 'ann.field.messagePh', full: true })}
      ${field({ labelKey: 'ann.field.expire', name: 'ann-expire', type: 'text' })}
      ${field({ labelKey: 'ann.field.audienceT', name: 'ann-aud-teacher', type: 'select', options: optsFrom(ANN_AUDIENCES, 'ann.aud') })}
      ${field({ labelKey: 'ann.field.audienceS', name: 'ann-aud-student', type: 'select', options: optsFrom(ANN_AUDIENCES, 'ann.aud') })}
      ${field({ labelKey: 'ann.field.country', name: 'ann-country', type: 'select', options: oneOpt })}
      ${field({ labelKey: 'ann.field.hours', name: 'ann-hours', type: 'select', options: oneOpt })}
      ${field({ labelKey: 'ann.field.language', name: 'ann-language', type: 'select', options: oneOpt })}
    </div>
    <div class="mt-4">
      <div class="field-label">${esc(t('ann.field.channel'))}</div>
      <div class="flex flex-col gap-2.5">
        ${checkRow('ann.field.chAdvertisement', 'ann-ch-ad')}
        ${checkRow('ann.field.chWhatsapp', 'ann-ch-wa')}
        ${checkRow('ann.field.private', 'ann-private')}
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-2.5 mt-5">
      ${mediaGate()}
      ${whatsappGate()}
      ${publishGate()}
    </div>
  </section>`;
}

/* an authored, display-only preview of how a composed announcement reads on the
 * dashboard — built from the first authored entry (no live render, no push). */
function previewCard() {
  const a = ANNOUNCEMENTS[0];
  return `<section class="mt-8">
    <div class="mb-3"><h2 class="section-title">${esc(t('ann.previewTitle'))}</h2></div>
    <article class="card p-4 flex items-start gap-3">
      <span class="medallion m-soft tone-primary">${icon('megaphone', 'ico')}</span>
      <div class="min-w-0">
        <p class="text-[14px] text-ink mb-2" style="line-height:1.5">${esc(t(a.msgKey))}</p>
        <div class="flex flex-wrap items-center gap-2 text-[12.5px]" style="color:var(--c-ink-3)">
          ${chip({ labelKey: a.audienceKey, tone: 'neutral', icon: 'user' })}
          ${channelChip(a.channelId)}
          <span class="inline-flex items-center gap-1.5">${icon('calendar-clock', 'ico ico-sm')}<span>${esc(t(a.expireKey))}</span></span>
        </div>
      </div>
    </article>
  </section>`;
}

/* one recipient column: heading + authored name chips */
function recipientColumn(titleKey, keys, chipIcon) {
  return `<div class="card p-4">
    <div class="field-label mb-2.5">${esc(t(titleKey))}</div>
    <div class="flex flex-wrap gap-2">
      ${keys.map((k) => chip({ labelKey: k, tone: 'neutral', icon: chipIcon })).join('')}
    </div>
  </div>`;
}

/* the recipient lists (teachers + students) — authored names, display-only */
function recipientsSection() {
  return `<section class="mt-8">
    <div class="mb-3"><h2 class="section-title">${esc(t('ann.recipients.title'))}</h2></div>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
      ${recipientColumn('ann.recipients.teachers', ANN_RECIPIENTS.teachers, 'trainers')}
      ${recipientColumn('ann.recipients.students', ANN_RECIPIENTS.students, 'graduation-cap')}
    </div>
  </section>`;
}

export function renderAnnouncements() {
  return `
    ${pageHeader({ titleKey: 'ann.title', subKey: 'ann.sub' })}
    ${announcementList()}
    ${composeForm()}
    ${previewCard()}
    ${recipientsSection()}
  `;
}

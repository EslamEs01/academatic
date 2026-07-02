/* Appointment detail-drawer content — the shared session-drawer builder reused by
 * Schedule blocks, Sessions rows, the Sessions agenda, and the dashboard rows.
 * Emits a baked <template data-preview="<id>"> so it pre-renders to static HTML
 * and maps to a SINGLE Django partial. Progressive disclosure: status → summary →
 * people → logistics → online → notes/attention → actions. Pure string, Node-safe.
 *
 * Spec 005: the field-rows are factored into `appointmentRows(item)` and the
 * action cluster into `appointmentActions(item)` so the canonical outcome drawer
 * (components/outcome-details.js) can compose `appointmentRows` + an outcome
 * section + a status-gated cluster WITHOUT duplicating any row (R35). The shared
 * `appointmentRows` is byte-identical to before unless `item.familyHref` is set. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { previewTemplate, sheetRow } from './preview-drawer.js';
import { statusChip } from './status-chip.js';
import { attentionFlag } from './attention-flag.js';

/** the shared session field-rows (status → summary → people → logistics → notes/attention) */
export function appointmentRows(item) {
  const i = item || {};
  const rows = [];

  // 1) Status chip (top)
  rows.push(`<div class="mb-3">${statusChip(i.statusId)}</div>`);

  // 2) Summary — when / how long
  if (i.dateKey) rows.push(sheetRow(t('appt.date'), t(i.dateKey)));
  if (i.start && i.end) rows.push(sheetRow(t('appt.time'), `<span class="tabular">${esc(i.start)} – ${esc(i.end)}</span>`));
  else if (i.time) rows.push(sheetRow(t('appt.time'), `<span class="tabular">${esc(i.time)}</span>`));
  if (i.durationMin) rows.push(sheetRow(t('appt.duration'), t('sessions.duration', { n: num(i.durationMin) })));

  // 3) People — who / how many
  if (i.trainer && i.trainer.nameKey) rows.push(sheetRow(t('appt.teacher'), t(i.trainer.nameKey)));
  if (i.students != null) {
    const v = i.capacity != null ? `${num(i.students)} / ${num(i.capacity)}` : num(i.students);
    rows.push(sheetRow(t('appt.students'), `<span class="tabular">${v}</span>`));
  }
  // family — a real <a href> when familyHref is provided (Spec 005), else plain text (Schedule)
  if (i.familyKey) rows.push(sheetRow(t('appt.family'), i.familyHref ? `<a href="${esc(i.familyHref)}" class="link-more">${t(i.familyKey)}</a>` : t(i.familyKey)));

  // 4) Logistics — subject/level, room, online link
  if (i.subjectKey) rows.push(sheetRow(t('appt.subject'), t(i.subjectKey)));
  else if (i.levelKey) rows.push(sheetRow(t('appt.subject'), t(i.levelKey)));
  if (i.roomKey) rows.push(sheetRow(t('appt.room'), t(i.roomKey)));
  if (i.roomLinkKey) {
    const join = `<button type="button" class="btn btn-secondary btn-sm" aria-disabled="true" data-disabled-reason data-reason-key="appt.joinReason" title="${esc(t('appt.joinReason'))}">${icon('arrow-left', 'ico ico-sm')}<span>${t('appt.join')}</span></button>`
      + `<p class="text-[12px] mt-1" style="color:var(--c-ink-3)">${t('appt.tzHint')}</p>`;
    rows.push(sheetRow(t('appt.onlineLink'), join));
  }

  // 5) More — notes + optional attention flag
  rows.push(sheetRow(t('appt.notes'), i.notesKey ? t(i.notesKey) : t('sess.note')));
  if (i.attention) rows.push(sheetRow('', attentionFlag(i.attention)));

  return rows.join('');
}

/** the default session action cluster (demo edit / notify, confirm-guarded cancel) */
export function appointmentActions() {
  return `<div class="flex flex-wrap gap-2 mt-5">`
    + `<button type="button" class="btn btn-secondary btn-sm" data-demo-action data-toast="${esc(t('appt.editedToast'))}">${icon('settings', 'ico ico-sm')}<span>${t('appt.edit')}</span></button>`
    + `<button type="button" class="btn btn-secondary btn-sm" data-demo-action data-toast="${esc(t('appt.notifiedToast'))}">${icon('bell', 'ico ico-sm')}<span>${t('appt.notify')}</span></button>`
    + `<button type="button" class="btn btn-danger btn-sm" data-confirm data-confirm-danger data-confirm-title="${esc(t('appt.cancelTitle'))}" data-confirm-msg="${esc(t('appt.cancelMsg'))}" data-confirm-cta="${esc(t('appt.cancelCta'))}" data-confirm-toast="${esc(t('appt.cancelToast'))}">${icon('x-circle', 'ico ico-sm')}<span>${t('appt.cancel')}</span></button>`
    + `</div>`;
}

export function appointmentTemplate(item) {
  const i = item || {};
  return previewTemplate(i.id, { title: t(i.titleKey), headIcon: 'schedule', tone: 'primary', bodyHTML: appointmentRows(i) + appointmentActions(i) });
}

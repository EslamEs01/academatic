/* Schedule page — calm day-grouped weekly overview (no calendar library). */
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { t, num, getLang } from '../i18n.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { scheduleList } from '../components/schedule-list.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { statusChip } from '../components/status-chip.js';
import { noResults } from '../components/states.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const STATUSES = ['live', 'upcoming', 'completed', 'cancelled'];

function dateText(iso) {
  const locale = getLang() === 'ar' ? 'ar-EG' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(new Date(iso));
}

function preview(b) {
  const body = `
    <div class="mb-3">${statusChip(b.statusId)}</div>
    ${sheetRow(t('sessions.col.time'), `<span class="tabular">${b.start} – ${b.end}</span>`)}
    ${sheetRow(t('sessions.col.trainer'), t(b.trainer.nameKey))}
    ${sheetRow(t('sessions.col.room'), t(b.roomKey))}
    ${sheetRow(t('sess.colSubject'), t(b.levelKey))}
    <p class="text-[12.5px] mt-4" style="color:var(--c-ink-3)">${t('sess.note')}</p>`;
  return previewTemplate(b.id, { title: t(b.titleKey), headIcon: 'schedule', tone: 'primary', bodyHTML: body });
}

export function renderSchedule() {
  const days = SCHEDULE_WEEK.map((d) => ({ ...d, dateText: dateText(d.dateISO) }));
  const allBlocks = SCHEDULE_WEEK.flatMap((d) => d.blocks);
  const filters = filterBar({
    targetId: 'schedule-list', searchKey: 'sch.searchPh',
    selects: [
      { name: 'status', labelKey: 'sess.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...STATUSES.map((v) => ({ value: v, labelKey: 'status.' + v }))] },
      { name: 'subject', labelKey: 'sess.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
    ],
  });
  return `
    ${pageHeader({ titleKey: 'sch.title', subKey: 'sch.sub' })}
    ${filters}
    <div id="schedule-list">${scheduleList(days)}</div>
    ${noResults()}
    ${allBlocks.map(preview).join('')}
  `;
}

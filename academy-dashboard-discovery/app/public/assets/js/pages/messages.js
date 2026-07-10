/* Spec 034 — Messages (Control Center). A real messaging surface, display-only:
 * a two-pane inbox (a searchable/filterable conversation list on the left + an
 * open thread with authored bubbles on the right). Grounded in the legacy
 * `management-chat` surface (conversation list · thread · Create-Group ·
 * Add-Member). EVERYTHING is baked from authored fixtures — there is NO live
 * socket, NO computed unread engine, and the row/thread never mutates.
 *
 * Every write is an honest backendRequired gate: the compose Send is a disabled-
 * with-reason button, the file attach stays a gate (never an upload input), and
 * the Create-Group / Add-Member drawers each end at ONE data-disabled-reason
 * Save final. The read-only thread sheets (one per conversation) carry no inputs. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { button, chip, medallion } from '../components/ui.js';
import { previewTemplate, formDrawer } from '../components/preview-drawer.js';
import { field } from '../components/form-field.js';
import { MESSAGES, MSG_STATUS } from '../fixtures/control-center.js';

/* member-picker options reuse EXISTING authored names (no new locale keys):
 * staff = the team roles, teachers/students = the announcement recipient roster. */
const STAFF_OPTS = [
  { value: 'reception', labelKey: 'task.asg.reception' },
  { value: 'advisor', labelKey: 'task.asg.advisor' },
  { value: 'supervisor', labelKey: 'task.asg.supervisor' },
];
const TEACHER_OPTS = [
  { value: 't1', labelKey: 'ann.rcp.t1' },
  { value: 't2', labelKey: 'ann.rcp.t2' },
  { value: 't3', labelKey: 'ann.rcp.t3' },
];
const STUDENT_OPTS = [
  { value: 's1', labelKey: 'ann.rcp.s1' },
  { value: 's2', labelKey: 'ann.rcp.s2' },
  { value: 's3', labelKey: 'ann.rcp.s3' },
];

/* one authored chat bubble — mine (right) / theirs (left), text + authored time. */
function bubble(b) {
  return `<div class="cc-bubble ${b.mine ? 'is-mine' : 'is-them'}">
    <div>${esc(t(b.textKey))}</div>
    <div class="text-[10.5px] mt-1 tabular" style="opacity:.65">${esc(t(b.timeKey))}</div>
  </div>`;
}

/* one conversation row — the whole card is a data-drawer trigger that opens the
 * read-only thread sheet; it carries data-row + facets for the filter bar. */
function convRow(c) {
  const roleChip = chip({ labelKey: c.roleKey, tone: 'neutral', icon: 'user' });
  const u = MSG_STATUS.unread;
  const unreadChip = c.unread > 0
    ? chip({ label: t('msg.unreadN', { n: num(c.unread) }), tone: u.tone, icon: u.icon })
    : '';
  return `<article class="card p-3" ${facetAttrs({ search: t(c.nameKey), status: c.statusId })}>
    <button type="button" class="w-full text-start" data-drawer="msg-${esc(c.id)}" aria-label="${esc(t(c.nameKey))}">
      <div class="flex items-center justify-between gap-2">
        <span class="font-bold text-[13.5px] text-ink truncate">${esc(t(c.nameKey))}</span>
        <span class="text-[11.5px] tabular shrink-0" style="color:var(--c-ink-3)">${esc(t(c.timeKey))}</span>
      </div>
      <div class="flex flex-wrap items-center gap-1.5 mt-1.5">${roleChip}${unreadChip}</div>
      <p class="text-[12px] mt-1.5 truncate" style="color:var(--c-ink-3)">${esc(t(c.lastKey))}</p>
    </button>
  </article>`;
}

/* the open thread (first conversation) rendered inline + a compose box.
 * Send + Attach are honest disabled-with-reason gates — nothing is sent. */
function threadPanel() {
  const c = MESSAGES[0];
  const bubbles = c.bubbles.map(bubble).join('');
  const send = button({ labelKey: 'msg.act.send', variant: 'primary', size: 'sm', icon: 'mail', disabled: true, reasonKey: 'msg.reason.backend' });
  const attach = button({ labelKey: 'msg.act.attach', variant: 'secondary', size: 'sm', icon: 'file-text', disabled: true, reasonKey: 'msg.reason.attach' });
  return `<div class="card p-4">
    <div class="flex items-center gap-2.5 mb-3">
      ${medallion({ icon: 'messages', tone: 'primary', variant: 'soft', size: 'sm' })}
      <div>
        <h2 class="text-[14px] font-bold text-ink">${esc(t(c.nameKey))}</h2>
        <div class="text-[11.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t(c.roleKey))}</div>
      </div>
    </div>
    <div class="cc-msg-thread">${bubbles}</div>
    <div class="mt-4">
      ${field({ labelKey: 'msg.act.reply', name: 'msg-compose', type: 'textarea', placeholderKey: 'msg.composePh', full: true })}
      <div class="flex items-center gap-2.5 mt-2">${send}${attach}</div>
    </div>
  </div>`;
}

/* one read-only thread sheet per conversation (no inputs — display only). */
function threadSheet(c) {
  const body = `<div class="cc-msg-thread">${c.bubbles.map(bubble).join('')}</div>`;
  return previewTemplate('msg-' + c.id, { title: t(c.nameKey), headIcon: 'user', tone: 'primary', bodyHTML: body });
}

/* the image-attach control stays a gate — NOT an upload input. */
function attachGate() {
  return `<div class="field field-full">
    <label class="field-label">${t('msg.act.attach')}</label>
    <button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="msg.reason.attach" aria-disabled="true" title="${esc(t('msg.reason.attach'))}">${icon('file-text', 'ico ico-sm')}<span>${t('msg.act.attach')}</span></button>
  </div>`;
}

/* Create-Group drawer — name/bio + three member pickers + an attach gate; ends
 * at the ONE formDrawer backendRequired Save final. */
function groupDrawer() {
  const fields = [
    field({ labelKey: 'msg.group.name', name: 'grp-name' }),
    field({ labelKey: 'msg.group.bio', name: 'grp-bio' }),
    field({ labelKey: 'msg.group.staff', name: 'grp-staff', type: 'select', options: STAFF_OPTS }),
    field({ labelKey: 'msg.group.teachers', name: 'grp-teachers', type: 'select', options: TEACHER_OPTS }),
    field({ labelKey: 'msg.group.students', name: 'grp-students', type: 'select', options: STUDENT_OPTS }),
    attachGate(),
  ].join('');
  return formDrawer('msg-group', { titleKey: 'msg.group.title', headIcon: 'staff', tone: 'primary', fields, ctaKey: 'msg.act.newGroup', reasonKey: 'msg.reason.backend' });
}

/* Add-Member drawer — the three member pickers + the ONE backendRequired final. */
function memberDrawer() {
  const fields = [
    field({ labelKey: 'msg.member.staff', name: 'mbr-staff', type: 'select', options: STAFF_OPTS }),
    field({ labelKey: 'msg.member.teachers', name: 'mbr-teachers', type: 'select', options: TEACHER_OPTS }),
    field({ labelKey: 'msg.member.students', name: 'mbr-students', type: 'select', options: STUDENT_OPTS }),
  ].join('');
  return formDrawer('msg-member', { titleKey: 'msg.member.title', headIcon: 'user-plus', tone: 'violet', fields, ctaKey: 'msg.act.addMember', reasonKey: 'msg.reason.backend' });
}

export function renderMessages() {
  const primary = button({ labelKey: 'msg.act.newGroup', variant: 'primary', size: 'sm', icon: 'messages', attrs: 'data-drawer="msg-group"' });
  const secondary = button({ labelKey: 'msg.act.addMember', variant: 'secondary', size: 'sm', icon: 'user-plus', attrs: 'data-drawer="msg-member"' });
  const filters = filterBar({
    targetId: 'msg-list', searchKey: 'msg.searchPh',
    selects: [{
      name: 'status', labelKey: 'msg.filterStatus',
      options: [
        { value: 'all', labelKey: 'cc.common.filterAll' },
        { value: 'unread', labelKey: 'msg.status.unread' },
        { value: 'read', labelKey: 'msg.status.read' },
      ],
    }],
  });
  const list = `<div class="cc-msg-list" id="msg-list">${MESSAGES.map(convRow).join('')}</div>`;
  const drawers = MESSAGES.map(threadSheet).join('') + groupDrawer() + memberDrawer();
  return `
    ${pageHeader({ titleKey: 'msg.title', subKey: 'msg.sub', primary, secondary })}
    <div class="cc-msg mt-6">
      <div>${filters}${list}</div>
      ${threadPanel()}
    </div>
    ${drawers}
  `;
}

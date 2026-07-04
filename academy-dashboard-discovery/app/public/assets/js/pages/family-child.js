/* Spec 018 — FAMILY-CHILD drill-down (fam1's five children as baked, hash-switched
 * panels). Reached from the family home child cards (family-child.html#child=stX).
 * Switching is PURE CSS :target (no-JS-safe deep links): the frozen enhance.js tab
 * machinery keys its hash on #view= only, so the MANDATED #child= fragments are
 * driven entirely in CSS (research D6 amendment — zero new JS hooks, zero
 * frozen-file edits). Display-only: zero forms, zero figure-bearing fields; the ONLY
 * body anchors are the five switcher pills (all #child= hash links); the full
 * history and profile editing are honest availability gates (Specs 020 own them). */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { statusChip } from '../components/status-chip.js';
import { familyStatusChip } from '../components/family-status.js';
import { STUDENT_BY_ID, GROUP_BY_ID } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { FAMILY_PREVIEW, CHILD_PROFILE, CHILD_ORDER } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const SESS_BY_ID = Object.fromEntries(SESSIONS_FULL.rows.map((r) => [r.id, r]));
/* reverse the authored today-session→child map so each child finds its own today session */
function todaySessionFor(childId) {
  const sid = Object.keys(FAMILY_PREVIEW.todayChildren).find((k) => FAMILY_PREVIEW.todayChildren[k] === childId);
  return sid ? SESS_BY_ID[sid] : null;
}

function metaItem(labelKey, valueHTML) {
  return `<div class="pt-card" style="padding:11px 13px;gap:2px">
    <div class="pt-card-sub" style="font-size:11px;color:var(--c-ink-3)">${esc(t(labelKey))}</div>
    <div class="pt-card-title" style="font-size:13px">${valueHTML}</div>
  </div>`;
}

function statTile(icn, tone, value, labelKey) {
  return `<div class="pt-card pt-stat">
    <div class="pt-card-row">${medallion({ icon: icn, tone })}<span class="pt-gauge-num tabular">${num(value)}</span></div>
    <div class="pt-stat-label">${esc(t(labelKey))}</div>
  </div>`;
}

function gateNote(msgKey) {
  return `<div class="pt-note" style="padding:10px 12px">${availabilityChip('backendRequired')}<span>${esc(t(msgKey))}</span></div>`;
}

function subHead(icn, titleKey) {
  return `<div class="pt-sec-head"><h2 class="pt-sec-title" style="font-size:15px">${icon(icn, 'ico')}${esc(t(titleKey))}</h2></div>`;
}

function childPanel(id, isDefault) {
  const s = STUDENT_BY_ID[id];
  const prof = CHILD_PROFILE[id];
  const e0 = s.enrollments[0];
  const groupKey = s.groupIds && s.groupIds.length ? GROUP_BY_ID[s.groupIds[0]].nameKey : null;
  const today = todaySessionFor(id);
  const att = prof.attendance;
  const nowHTML = today
    ? `<div class="pt-card">
        <div class="pt-card-row">
          <span class="pt-time tabular">${esc(today.time)}</span>
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t(today.titleKey))}</div>
            <div class="pt-card-sub">${esc(t(today.trainer.nameKey))} · ${esc(t(today.roomKey))}</div>
          </div>
          ${statusChip(today.statusId)}
        </div>
      </div>`
    : `<div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.child.noToday'))}</span></div>`;
  return `<section class="pt-child-panel"${isDefault ? ' data-default' : ''} id="child=${esc(id)}" aria-label="${esc(t(s.nameKey))}">
    <div class="pt-child-head">
      ${avatar({ nameKey: s.nameKey, accent: s.accent })}
      <div style="flex:1;min-width:0">
        <div class="pt-child-name">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(s.levelKey))} · ${esc(t(s.subjectKey))}</div>
      </div>
      ${familyStatusChip(s.statusId)}
    </div>

    <div class="pt-child-meta">
      ${metaItem('prt.child.course', esc(t(e0.courseTitleKey)))}
      ${metaItem('prt.child.group', groupKey ? esc(t(groupKey)) : '—')}
      ${metaItem('prt.child.teacher', esc(t(e0.teacherNameKey)))}
    </div>

    ${subHead('sessions', 'prt.child.todayTitle')}
    ${nowHTML}

    ${subHead('clipboard-check', 'prt.child.attTitle')}
    <div class="pt-cards pt-cards-3">
      ${statTile('check-circle', 'success', att.attended, 'prt.child.att.attended')}
      ${statTile('clock', 'sky', att.upcoming, 'prt.child.att.upcoming')}
      ${statTile('alert-triangle', att.absent ? 'amber' : 'success', att.absent, 'prt.child.att.absent')}
    </div>
    <div class="pt-card">
      <div class="pt-gauge">
        <span class="pt-gauge-num tabular" style="font-size:24px">${num(s.progress)}${pctSign()}</span>
        <div style="flex:1">
          <div class="pt-card-sub" style="margin-bottom:6px">${esc(t('prt.child.progress'))}</div>
          <div class="pt-bar"><span style="width:${s.progress}%"></span></div>
        </div>
      </div>
    </div>

    <div class="pt-card">
      <div class="pt-card-row">
        ${medallion({ icon: 'message-circle', tone: 'primary' })}
        <div style="flex:1;min-width:0">
          <div class="pt-card-title" style="font-size:13px">${esc(t('prt.child.noteTitle'))} — ${esc(t(e0.teacherNameKey))}</div>
          <p class="pt-card-sub">${esc(t(prof.noteKey))}</p>
        </div>
      </div>
    </div>

    <div class="pt-cards">
      <div class="pt-card">
        <div class="pt-card-row">${medallion({ icon: 'tasks', tone: 'primary' })}<div style="flex:1;min-width:0"><div class="pt-card-title" style="font-size:13px">${esc(t('prt.child.hwTitle'))}</div><div class="pt-card-sub">${esc(t(prof.hwKey))}</div></div></div>
      </div>
      <div class="pt-card">
        <div class="pt-card-row">${medallion({ icon: 'materials', tone: 'primary' })}<div style="flex:1;min-width:0"><div class="pt-card-title" style="font-size:13px">${esc(t('prt.child.matTitle'))}</div><div class="pt-card-sub">${esc(t(prof.matKey))}</div></div></div>
      </div>
    </div>

    ${gateNote('prt.child.historyGate')}
    ${gateNote('prt.child.profileGate')}
  </section>`;
}

export function renderFamilyChild() {
  const pill = (id, isDefault) => {
    const s = STUDENT_BY_ID[id];
    return `<a class="pt-child-pill" href="#child=${esc(id)}"${isDefault ? ' data-default' : ''}>${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}<span>${esc(t(s.nameKey))}</span></a>`;
  };
  return `
    <div class="pt-home-head">
      <h1 class="pt-home-hi">${esc(t('prt.title.familyChild'))}</h1>
      <p class="pt-home-status">${esc(t('prt.child.intro'))}</p>
    </div>

    <div class="pt-child-root">
      ${subHead('families', 'prt.child.switchTitle')}
      <div class="pt-child-switch" role="group" aria-label="${esc(t('prt.child.switchAria'))}">
        ${CHILD_ORDER.map((id, i) => pill(id, i === 0)).join('')}
      </div>

      <div class="pt-child-panels">
        ${CHILD_ORDER.map((id, i) => childPanel(id, i === 0)).join('')}
      </div>
    </div>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.child.note'))}</span></div>
  `;
}

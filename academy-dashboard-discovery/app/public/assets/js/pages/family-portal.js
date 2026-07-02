/* Spec 014 — FAMILY / GUARDIAN DASHBOARD (fam1's control center). Calm,
 * trustworthy, child-centered. All authored/fixture display-only content — NO
 * computed score/rank, NO engine, NO fake pay/cancel/upload/voice/feedback/join.
 * THE ZERO-PAY HARD LINE: no amount/price/rate/currency is ever rendered (the
 * family fixture's hourRate/plan cost is display-suppressed). The page body
 * contributes zero anchors and zero form controls; the only links are the shell's.
 * Deep siblings: Student = Spec 013 · Teacher = Spec 015 · Comms = Spec 016. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar, chip } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { statusChip } from '../components/status-chip.js';
import { outcomeChip } from '../components/outcome-status.js';
import { FAMILIES } from '../fixtures/families.js';
import { STUDENTS } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { familyStatusChip } from '../components/family-status.js';
import { FAMILY_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const fam = () => FAMILIES.rows.find((f) => f.id === PORTAL_PERSONAS.family);
const kids = () => STUDENTS.rows.filter((s) => s.familyId === PORTAL_PERSONAS.family);
const STUD = Object.fromEntries(STUDENTS.rows.map((s) => [s.id, s]));
const childName = (id) => t(STUD[id].nameKey);
/* family's sessions today — the established sara/khalid family proxy */
const todaySessions = () => SESSIONS_FULL.rows.filter((r) => ['sara', 'khalid'].includes(r.trainer.id)).slice(0, 3);
const planned = (id) => PORTAL_PLANNED.family.find((p) => p.id === id);

function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}

function plannedCard(p) {
  return `<div class="pt-card pt-planned">
    <div class="pt-card-row">
      ${medallion({ icon: p.icon, tone: 'muted' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(p.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(p.descKey))}</div>
      </div>
    </div>
    ${availabilityChip(p.availability)}
  </div>`;
}

/* ── section: my children (everyone inline, no switcher) ───────────────── */
function kidCard(s, i) {
  return `<div class="pt-card" ${i === 0 ? 'style="border-color:var(--pt-accent)"' : ''}>
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(s.levelKey))}</div>
      </div>
      ${familyStatusChip(s.statusId)}
    </div>
    <div class="pt-gauge">
      <div class="pt-bar"><span style="width:${s.progress}%"></span></div>
      <span class="tabular pt-card-sub" style="font-weight:700">${num(s.progress)}${pctSign()}</span>
    </div>
    <div class="pt-card-sub">${esc(t(FAMILY_PREVIEW.kidHints[s.id]))}</div>
  </div>`;
}

/* ── section: today's sessions (child-associated) ──────────────────────── */
function sessCard(r) {
  const childId = FAMILY_PREVIEW.todayChildren[r.id];
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(r.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(r.titleKey))} · <span style="color:var(--pt-accent-ink)">${esc(t('prt.fam.todayFor'))} ${childId ? esc(childName(childId)) : ''}</span></div>
        <div class="pt-card-sub">${esc(t(r.trainer.nameKey))} · ${esc(t(r.roomKey))}</div>
      </div>
      ${statusChip(r.statusId)}
    </div>
  </div>`;
}

/* ── section: attendance signals (REAL outcome rows) ───────────────────── */
function statTile(icn, tone, value, labelKey) {
  return `<div class="pt-card pt-stat">
    <div class="pt-card-row">${medallion({ icon: icn, tone })}<span class="pt-gauge-num tabular">${num(value)}</span></div>
    <div class="pt-stat-label">${esc(t(labelKey))}</div>
  </div>`;
}
function signalCard(sig) {
  const o = OUTCOME_BY_ID[sig.outcomeId];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: STUD[o.studentId].nameKey, accent: STUD[o.studentId].accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(childName(o.studentId))}</div>
        <div class="pt-card-sub">${esc(t(sig.framingKey))}</div>
      </div>
      ${outcomeChip(o.outcomeId)}
    </div>
  </div>`;
}

/* ── section: teacher notes ────────────────────────────────────────────── */
function noteCard(n) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'message-circle', tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(childName(n.studentId))} — ${esc(t(n.teacherKey))}</div>
        <p class="pt-card-sub">${esc(t(n.noteKey))}</p>
      </div>
    </div>
  </div>`;
}

/* ── section: recent sessions (guardian F6 mirror, child-first) ────────── */
function historyCard(h) {
  if (h.outcomeId) {
    const o = OUTCOME_BY_ID[h.outcomeId];
    return `<div class="pt-card">
      <div class="pt-card-row">
        ${medallion({ icon: 'clipboard-check', tone: o.outcomeId === 'attended' ? 'success' : 'amber' })}
        <div style="flex:1;min-width:0">
          <div class="pt-card-title">${esc(childName(o.studentId))} — ${esc(t(o.trainer.nameKey))}</div>
          <div class="pt-card-sub">${esc(t(h.dayKey))}</div>
        </div>
        ${outcomeChip(o.outcomeId)}
      </div>
      ${o.feedbackKey ? `<p class="pt-card-sub">${esc(t(o.feedbackKey))}</p>` : ''}
    </div>`;
  }
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'clipboard-check', tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(childName(h.childId))} — ${esc(t(h.teacherKey))}</div>
        <div class="pt-card-sub">${esc(t(h.dayKey))}</div>
      </div>
    </div>
    <p class="pt-card-sub">${esc(t(h.summaryKey))}</p>
    <p class="pt-card-sub">${esc(t(h.homeworkKey))}</p>
    ${h.hasAttachment ? `<span class="pt-attach">${icon('file-text', 'ico ico-sm')}${esc(t('prt.fam.histAttach'))}</span>` : ''}
  </div>`;
}

/* ── section: plans & subscriptions (ZERO amounts) ─────────────────────── */
function subRow(s) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0"><div class="pt-card-title">${esc(t(s.nameKey))}</div></div>
      ${familyStatusChip(s.statusId)}
    </div>
  </div>`;
}

/* ── section: materials ────────────────────────────────────────────────── */
function materialCard(m) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: m.typeIcon, tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(m.titleKey))}</div>
        <div class="pt-card-sub">${esc(childName(m.childId))}</div>
      </div>
    </div>
  </div>`;
}

/* ── section: requests hub — preview cards (no form controls) ──────────── */
function lineList(keys) {
  return `<div class="pt-lines">${keys.map((k) => `<div class="pt-line">${icon('check-circle', 'ico ico-sm')}<span>${esc(t(k))}</span></div>`).join('')}</div>`;
}
function reqCard(icn, titleKey, bodyHTML, chipHTML) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: icn, tone: 'primary' })}
      <div style="flex:1;min-width:0"><div class="pt-card-title">${esc(t(titleKey))}</div></div>
    </div>
    ${bodyHTML}
    ${chipHTML}
  </div>`;
}

export function renderFamilyPortal() {
  const f = fam();
  const children = kids();
  const att = FAMILY_PREVIEW.attendance;
  const backendChip = `<div class="pt-card-chip">${availabilityChip('backendRequired')}</div>`;

  return `
    <section class="pt-hero">
      <h1 class="pt-hero-hi">${esc(t('prt.shell.greet'))} ${esc(t(f.guardian.nameKey))} 🌿</h1>
      <p class="pt-hero-sub">${esc(t('prt.fam.heroSub'))}</p>
      <p class="pt-hero-sub" style="margin-top:8px;font-weight:600;color:var(--pt-accent-ink)">${icon('sparkles', 'ico ico-sm')} ${esc(t('prt.fam.heroHint'))}</p>
    </section>

    <section class="pt-section">
      ${secHead('families', 'prt.fam.kidsTitle', 'prt.fam.kidsHint', ` <span class="pt-role-chip" style="font-size:11px">${num(children.length)}</span>`)}
      <div class="pt-cards">${children.map(kidCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('sessions', 'prt.fam.todayTitle', 'prt.fam.todayHint')}
      <div class="pt-cards">${todaySessions().map(sessCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.fam.progTitle', 'prt.fam.progHint')}
      <div class="pt-cards pt-cards-3">
        ${statTile('check-circle', 'success', att.attended, 'prt.fam.att.attended')}
        ${statTile('clock', 'sky', att.upcoming, 'prt.fam.att.upcoming')}
        ${statTile('alert-triangle', 'amber', att.followUp, 'prt.fam.att.followUp')}
      </div>
      <div class="pt-sec-head" style="margin-top:6px"><h2 class="pt-sec-title" style="font-size:14px">${icon('alert-triangle', 'ico')}${esc(t('prt.fam.sigTitle'))}</h2><span class="pt-sec-hint">${esc(t('prt.fam.sigHint'))}</span></div>
      <div class="pt-cards">${FAMILY_PREVIEW.signals.map(signalCard).join('')}</div>
      <div class="pt-note" style="padding:10px 12px">${icon('check-circle', 'ico ico-sm')}<span>${esc(t('prt.fam.sigReassure'))}</span></div>
    </section>

    <section class="pt-section">
      ${secHead('message-circle', 'prt.fam.notesTitle', 'prt.fam.notesHint')}
      <div class="pt-cards">${FAMILY_PREVIEW.teacherNotes.map(noteCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.fam.histTitle', 'prt.fam.histHint')}
      <div class="pt-cards">${FAMILY_PREVIEW.history.map(historyCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('fullHistory'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('certificates', 'prt.fam.subsTitle', 'prt.fam.subsHint')}
      <div class="pt-note" style="padding:10px 12px">${icon('certificates', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.subsPlan'))}:</strong> ${esc(t('data.fam.fam1.plan'))}</span></div>
      <div class="pt-cards">${children.map(subRow).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('wallet', 'prt.fam.billTitle', 'prt.fam.billHint')}
      <div class="pt-card">
        <div class="pt-card-row">
          ${chip({ labelKey: 'prt.fam.billSettled', tone: 'completed', icon: 'check-circle' })}
        </div>
        <p class="pt-card-sub">${esc(t('prt.fam.billReassure'))}</p>
      </div>
      <div class="pt-cards">${plannedCard(planned('billingGate'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('help', 'prt.fam.reqTitle', 'prt.fam.reqHint')}
      <div class="pt-cards">
        ${reqCard('calendar', 'prt.fam.req.cancelT', `${lineList(['prt.fam.req.cancelOpt1', 'prt.fam.req.cancelOpt2'])}<div class="pt-note" style="padding:10px 12px;margin-top:8px">${icon('alert-triangle', 'ico ico-sm')}<span>${esc(t('prt.fam.req.cancelCaution'))}</span></div>`, backendChip)}
        ${reqCard('message-circle', 'prt.fam.req.feedbackT', lineList(['prt.fam.req.fbQ1', 'prt.fam.req.fbQ2', 'prt.fam.req.fbQ3', 'prt.fam.req.fbQ4']), backendChip)}
        ${reqCard('families', 'prt.fam.req.trialT', `<div class="pt-tiles"><div class="pt-tile"><div class="pt-tile-t">${esc(t('prt.fam.req.trialNew'))}</div></div><div class="pt-tile"><div class="pt-tile-t">${esc(t('prt.fam.req.trialExisting'))}</div></div></div>`, backendChip)}
        <div class="pt-card">
          <div class="pt-card-row">${medallion({ icon: 'calendar', tone: 'primary' })}<div style="flex:1;min-width:0"><div class="pt-card-title">${esc(t('prt.fam.req.meetingsT'))}</div></div></div>
          <div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.fam.req.meetingsEmpty'))}</span></div>
        </div>
        ${plannedCard(planned('meetingRequest'))}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('materials', 'prt.fam.matTitle', 'prt.fam.matHint')}
      <div class="pt-cards">${FAMILY_PREVIEW.materials.map(materialCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('matDownload'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('user', 'prt.fam.acctTitle')}
      <div class="pt-card">
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.fam.acct.guardian'))}</span><span class="pt-prof-v">${esc(t(f.guardian.nameKey))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.fam.acct.email'))}</span><span class="pt-prof-v">${esc(t(f.contact.emailKey))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.fam.acct.city'))}</span><span class="pt-prof-v">${esc(t(f.location.cityKey))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.fam.acct.joined'))}</span><span class="pt-prof-v">${esc(t(f.joinedDateKey))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.fam.acct.children'))}</span><span class="pt-prof-v tabular">${num(children.length)}</span></div>
        <div class="pt-note" style="padding:10px 12px;margin-top:4px">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.fam.acctEditNote'))}</span></div>
      </div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.fam.noteD'))}</span></div>
  `;
}

/* Spec 012 — FAMILY portal foundation (fam1's guardian page). Calm, trustworthy,
 * child-centered. The multi-child pattern is real (fam1's five fixture children).
 * Deep family dashboard = Spec 014. Display-only; the billing card is a labeled
 * backend-gated planned card with zero amounts. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { FAMILIES } from '../fixtures/families.js';
import { STUDENTS } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { familyStatusChip } from '../components/family-status.js';
import { FAMILY_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS } from '../fixtures/portal.js';

const fam = () => FAMILIES.rows.find((f) => f.id === PORTAL_PERSONAS.family);
const kids = () => STUDENTS.rows.filter((s) => s.familyId === PORTAL_PERSONAS.family);
const todaySessions = () => SESSIONS_FULL.rows.filter((r) => ['sara', 'khalid'].includes(r.trainer.id)).slice(0, 3);

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
      <span class="tabular pt-card-sub" style="font-weight:700">${num(s.progress)}${getLang() === 'en' ? '%' : '٪'}</span>
    </div>
  </div>`;
}

function sessCard(r) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(r.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(r.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(r.trainer.nameKey))} · ${esc(t(r.roomKey))}</div>
      </div>
    </div>
  </div>`;
}

function noteCard(n) {
  const kid = STUDENTS.rows.find((s) => s.id === n.studentId);
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'message-circle', tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(kid.nameKey))} — ${esc(t(n.teacherKey))}</div>
        <p class="pt-card-sub">${esc(t(n.noteKey))}</p>
      </div>
    </div>
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

export function renderFamilyPortal() {
  const f = fam();
  const children = kids();
  return `
    <section class="pt-hero">
      <h1 class="pt-hero-hi">${esc(t('prt.shell.greet'))} ${esc(t(f.guardian.nameKey))} 🌿</h1>
      <p class="pt-hero-sub">${esc(t('prt.fam.heroSub'))}</p>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('families', 'ico')}${esc(t('prt.fam.kidsTitle'))} <span class="pt-role-chip" style="font-size:11px">${num(children.length)}</span></h2>
        <span class="pt-sec-hint">${esc(t('prt.fam.kidsHint'))}</span>
      </div>
      <div class="pt-cards">${children.map(kidCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('sessions', 'ico')}${esc(t('prt.fam.todayTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.fam.todayHint'))}</span>
      </div>
      <div class="pt-cards">${todaySessions().map(sessCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('clipboard-check', 'ico')}${esc(t('prt.fam.progTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.fam.progHint'))}</span>
      </div>
      <div class="pt-cards pt-cards-3">
        <div class="pt-card"><div class="pt-card-row">${medallion({ icon: 'check-circle', tone: 'success' })}<div><div class="pt-gauge-num tabular" style="font-size:22px">${num(12)}</div><div class="pt-card-sub">${esc(t('att.tile.attended'))}</div></div></div></div>
        <div class="pt-card"><div class="pt-card-row">${medallion({ icon: 'clock', tone: 'sky' })}<div><div class="pt-gauge-num tabular" style="font-size:22px">${num(3)}</div><div class="pt-card-sub">${esc(t('status.upcoming'))}</div></div></div></div>
        <div class="pt-card"><div class="pt-card-row">${medallion({ icon: 'alert-triangle', tone: 'amber' })}<div><div class="pt-gauge-num tabular" style="font-size:22px">${num(1)}</div><div class="pt-card-sub">${esc(t('att.tile.needsFollowUp'))}</div></div></div></div>
      </div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('message-circle', 'ico')}${esc(t('prt.fam.notesTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.fam.notesHint'))}</span>
      </div>
      <div class="pt-cards">${FAMILY_PREVIEW.teacherNotes.map(noteCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-cards pt-cards-3">${PORTAL_PLANNED.family.map(plannedCard).join('')}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.fam.noteD'))}</span></div>
  `;
}

/* Spec 018 — FAMILY / GUARDIAN HOME, reworked into a COMPACT admin-like dashboard
 * (the 7-band recipe: compact header · 4-KPI row · now band · children core w/ REAL
 * drill-down links · preview · quick-links · one-line note). The endless 12-section
 * portal is gone; the displaced detail is RETAINED in fixtures/locales and re-rendered
 * by Spec 020's internal pages + the NEW family-child page (each child card links to
 * family-child(.en).html#child=stX). Display-only; THE ZERO-PAY HARD LINE holds
 * (status-only billing, no rendered figures ever); the body's only anchors are the
 * five child drill-downs; zero form controls, zero fake pay/cancel/upload. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar, chip } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { statusChip } from '../components/status-chip.js';
import { familyStatusChip } from '../components/family-status.js';
import { FAMILIES } from '../fixtures/families.js';
import { STUDENTS } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { FAMILY_PREVIEW, COMPACT_HOME, PORTAL_PLANNED, PORTAL_PERSONAS, ROLE_NAV, CHILD_ORDER } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const enSuffix = () => (getLang() === 'en' ? '.en' : '');
const fam = () => FAMILIES.rows.find((f) => f.id === PORTAL_PERSONAS.family);
const STUD = Object.fromEntries(STUDENTS.rows.map((s) => [s.id, s]));
const childName = (id) => t(STUD[id].nameKey);
const orderedKids = () => CHILD_ORDER.map((id) => STUD[id]);
const todaySessions = () => SESSIONS_FULL.rows.filter((r) => ['sara', 'khalid'].includes(r.trainer.id)).slice(0, 3);
const planned = (id) => PORTAL_PLANNED.family.find((p) => p.id === id);

/* ── shared compact-home primitives (duplicated per page by the Spec-018 file scope:
 * no new shared render module is permitted; kept byte-identical across the 3 homes) ── */
function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}
function kpiCard(k, tone) {
  const pct = k.format === 'percent' ? pctSign() : '';
  return `<div class="pt-kpi">
    <div class="pt-kpi-top">${medallion({ icon: k.icon, tone, size: 'sm' })}<span class="pt-gauge-num tabular">${num(k.value)}${pct}</span></div>
    <div class="pt-kpi-label">${esc(t(k.labelKey))}</div>
  </div>`;
}
function kpiRow(kpis, tone) { return `<div class="pt-kpi-row">${kpis.map((k) => kpiCard(k, tone)).join('')}</div>`; }
function quickTiles(role) {
  return `<div class="pt-qtiles">${ROLE_NAV[role].filter((e) => e.id !== 'home').map((e) =>
    `<div class="pt-qtile is-planned">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span><span class="pt-qtile-soon">${esc(t('prt.nav.soon'))}</span></div>`).join('')}</div>`;
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

/* ── now band: a today session, child-tagged (the family proxy) ─────────────── */
function sessCard(r) {
  const childId = FAMILY_PREVIEW.todayChildren[r.id];
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(r.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(r.titleKey))}${childId ? ` · <span style="color:var(--pt-accent-ink)">${esc(t('prt.fam.todayFor'))} ${esc(childName(childId))}</span>` : ''}</div>
        <div class="pt-card-sub">${esc(t(r.trainer.nameKey))} · ${esc(t(r.roomKey))}</div>
      </div>
      ${statusChip(r.statusId)}
    </div>
  </div>`;
}

/* ── role-core band: a compact child card with the REAL drill-down link ─────── */
function childCard(s) {
  const href = `family-child${enSuffix()}.html#child=${s.id}`;
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(FAMILY_PREVIEW.kidHints[s.id]))}</div>
      </div>
      ${familyStatusChip(s.statusId)}
    </div>
    <div class="pt-gauge">
      <div class="pt-bar"><span style="width:${s.progress}%"></span></div>
      <span class="tabular pt-card-sub" style="font-weight:700">${num(s.progress)}${pctSign()}</span>
    </div>
    <a class="pt-drill" href="${href}">${icon('user', 'ico ico-sm')}<span>${esc(t('prt.band.openChild'))}</span></a>
  </div>`;
}

export function renderFamilyPortal() {
  const f = fam();
  const children = orderedKids();
  const today = todaySessions();
  const next = today.find((r) => r.statusId === 'upcoming') || today[0];

  return `
    <div class="pt-home-head">
      <h1 class="pt-home-hi">${esc(t('prt.shell.greet'))} ${esc(t(f.guardian.nameKey))} 🌿</h1>
      <p class="pt-home-status">${esc(t('prt.band.famStatus'))}</p>
    </div>

    <section class="pt-section">
      ${secHead('trending-up', 'prt.band.overview', 'prt.band.overviewHint')}
      ${kpiRow(COMPACT_HOME.family.kpis, 'primary')}
    </section>

    <section class="pt-section">
      ${secHead('sessions', 'prt.fam.todayTitle', 'prt.fam.todayHint')}
      <div class="pt-now">
        <div class="pt-now-col">${today.map(sessCard).join('')}</div>
        <div class="pt-now-col">
          <div class="pt-card" style="border-color:var(--pt-accent)">
            <div class="pt-card-row">
              <span class="pt-time tabular">${esc(next.time)}</span>
              <div style="flex:1;min-width:0">
                <div class="pt-card-title">${esc(t('prt.band.nowNext'))}: ${esc(t(next.titleKey))}</div>
                <div class="pt-card-sub">${esc(t(next.trainer.nameKey))} · ${esc(t(next.roomKey))}</div>
              </div>
              ${statusChip(next.statusId)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('families', 'prt.band.famCore', 'prt.band.famCoreHint', ` <span class="pt-role-chip" style="font-size:11px">${num(children.length)}</span>`)}
      <div class="pt-cards">${children.map(childCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('wallet', 'prt.band.famPreview', 'prt.band.famPreviewHint')}
      <div class="pt-card">
        <div class="pt-card-row">${chip({ labelKey: 'prt.fam.billSettled', tone: 'completed', icon: 'check-circle' })}</div>
        <p class="pt-card-sub">${esc(t('prt.fam.billReassure'))}</p>
      </div>
      <div class="pt-cards">
        ${plannedCard(planned('billingGate'))}
        ${plannedCard(planned('meetingRequest'))}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('grid', 'prt.band.quickTitle', 'prt.band.quickHint')}
      ${quickTiles('family')}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}

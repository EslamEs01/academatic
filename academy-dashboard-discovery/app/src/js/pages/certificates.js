/* Spec 031 (US3/US4) — Certificates. Two tabs: Templates (list + a STATIC designer preview)
 * and Requests (queue). The designer is a display-only preview (CSS-positioned label spans over
 * an authored band) — no plotting element, no drag-reposition, no serialized layout or server
 * render commands; upload stays a gate. Approve/Reject/Generate/Preview/Download/Send/Upload are
 * backendRequired gates — no real document, no opening a file, no send, no status mutation.
 * Spec 032 (FC-33/34/35): template Create/Edit share ONE form drawer and Issue-certificate is a
 * form drawer — INERT fields, each ending at ONE backendRequired final.
 * Reuses the closed data-* hook set. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { chip, button, medallion } from '../components/ui.js';
import { tabs } from '../components/tabs.js';
import { pageHeader } from '../components/page-header.js';
import { previewTemplate, sheetRow, formDrawer } from '../components/preview-drawer.js';
import { field } from '../components/form-field.js';
import { CERT_TEMPLATES, CERT_DESIGNER, CERT_STATUS, CERT_REQUESTS, CERT_ISSUED } from '../fixtures/certificates.js';

const gate = (labelKey, ic, reasonKey, variant = 'secondary') =>
  `<button type="button" class="btn btn-${variant} btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;
const drawerBtn = (labelKey, ic, id, variant = 'secondary') =>
  button({ labelKey, variant, size: 'sm', icon: ic, attrs: `data-drawer="${esc(id)}"` });
const confirmDel = (labelKey, k) =>
  `<button type="button" class="btn btn-ghost btn-sm" data-confirm data-confirm-danger data-confirm-title="${esc(t(k + 'Title'))}" data-confirm-msg="${esc(t(k + 'Msg'))}" data-confirm-cta="${esc(t(k + 'Cta'))}" data-confirm-toast="${esc(t(k + 'Toast'))}">${icon('x-circle', 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

const certStatusChip = (id) => chip({ labelKey: (CERT_STATUS[id] || {}).labelKey || 'adm.cert.st.pending', tone: (CERT_STATUS[id] || {}).tone || 'neutral', icon: (CERT_STATUS[id] || {}).icon || 'clock' });

/* ---------------- Templates tab ---------------- */
function templateCard(tpl) {
  return `<div class="card p-4 flex flex-col gap-3">
    <div class="flex items-center gap-3">
      ${medallion({ icon: 'certificates', tone: tpl.accent || 'primary', variant: 'soft', size: 'sm' })}
      <div class="min-w-0">
        <h3 class="font-bold text-ink text-[14px] truncate">${t(tpl.nameKey)}</h3>
        <p class="text-[12px]" style="color:var(--c-ink-3)">${t('adm.cert.tplUsage', { n: num(tpl.usageCount) })}</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-1.5">
      ${drawerBtn('adm.common.edit', 'edit', 'cert-tpl', 'ghost')}
      ${confirmDel('adm.cert.tplDel', 'adm.cert.tplDel')}
    </div>
  </div>`;
}
/* Spec 032 (FC-33/34) — ONE shared template form drawer (Create + Edit open it):
 * a real name field + the same STATIC designer preview (CSS-positioned spans —
 * no plotting element, no drag) + the background-image affordance as an inline
 * gate (upload stays a gate). Ends at the ONE formDrawer backendRequired final. */
function certTplDrawer() {
  const spans = CERT_DESIGNER.fields.map((f) =>
    `<span class="cert-field" style="left:${f.x}%;top:${f.y}%">${t(f.labelKey)}</span>`).join('');
  const fields = field({ labelKey: 'adm.form.name', name: 'certTpl-name', valueKey: 'adm.cert.tpl.completion', full: true })
    + `<div class="field field-full"><span class="field-label">${t('adm.cert.designer.title')}</span>
        <div class="cert-stage" style="height:150px" role="img" aria-label="${esc(t('adm.cert.designer.title'))}">${spans}</div>
        <p class="text-[12px] mt-1.5" style="color:var(--c-ink-3)">${t('adm.cert.designer.note')}</p></div>`
    + `<div class="field field-full">${gate('adm.cert.tplBg', 'materials', 'adm.cert.tplBgReason')}</div>`;
  return formDrawer('cert-tpl', { titleKey: 'adm.cert.tplFormTitle', headIcon: 'certificates', tone: 'violet', fields });
}
/* STATIC designer preview — positioned label spans over a band. No plotting element, no drag; upload stays a gate. */
function designerPreview() {
  const fields = CERT_DESIGNER.fields.map((f) =>
    `<span class="cert-field" style="left:${f.x}%;top:${f.y}%">${t(f.labelKey)}</span>`).join('');
  return `<section class="card p-4 mt-4">
    <div class="flex items-center gap-2 mb-3">${medallion({ icon: 'award', tone: 'amber', variant: 'soft', size: 'sm' })}
      <div><h2 class="text-[15px] font-bold text-ink">${t('adm.cert.designer.title')}</h2>
      <p class="text-[12px]" style="color:var(--c-ink-3)">${t('adm.cert.designer.note')}</p></div></div>
    <div class="cert-stage" role="img" aria-label="${esc(t('adm.cert.designer.title'))}">${fields}</div>
  </section>`;
}
function templatesPanel() {
  const add = drawerBtn('adm.cert.tplCreate', 'plus', 'cert-tpl', 'primary');
  return `<div class="flex items-center flex-wrap gap-2 mb-3">${add}</div>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${CERT_TEMPLATES.map(templateCard).join('')}</div>
    ${designerPreview()}
    ${certTplDrawer()}`;
}

/* ---------------- Requests tab ---------------- */
function requestDrawer(r) {
  const rows = `<div class="sheet-rows">
    ${sheetRow(t('adm.cert.colStudent'), t(r.studentKey))}
    ${sheetRow(t('adm.cert.colCourse'), t(r.courseKey))}
    ${sheetRow(t('adm.cert.colTeacher'), t(r.teacherKey))}
    ${sheetRow(t('adm.cert.colDesc'), t(r.descKey))}
    ${sheetRow(t('adm.cert.colDate'), t(r.dateKey))}
    ${sheetRow(t('adm.cert.colStatus'), t((CERT_STATUS[r.statusId] || {}).labelKey))}
  </div>`;
  const issued = `<div class="mt-3"><div class="font-bold text-[12.5px] text-ink mb-1.5">${t('adm.cert.issTitle')}</div>
    ${CERT_ISSUED.map((i) => `<div class="perm-item">${icon('certificates', 'ico ico-sm')}<span>${t(i.labelKey)} · ${t((CERT_STATUS[i.statusId] || {}).labelKey)}</span><span class="ms-auto text-[12px]" style="color:var(--c-ink-3)">${t('adm.cert.issOptions')}</span></div>`).join('')}</div>`;
  const actions = `<div class="flex flex-wrap gap-1.5 mt-4">
    ${gate('adm.cert.generate', 'file-text', 'adm.cert.generateReason', 'ghost')}
    ${gate('adm.cert.preview', 'search', 'adm.cert.previewReason', 'ghost')}
    ${gate('adm.cert.download', 'download', 'adm.cert.downloadReason', 'ghost')}
    ${gate('adm.cert.send', 'mail', 'adm.cert.sendReason', 'ghost')}
  </div>`;
  return previewTemplate('cr-' + r.id, { titleKey: 'adm.cert.detailTitle', headIcon: 'certificates', tone: 'primary', bodyHTML: rows + issued + actions });
}
function requestRow(r) {
  return `<tr data-row ${facetAttrs({ search: t(r.studentKey) + ' ' + t(r.courseKey), status: r.statusId })}>
    <td><span class="font-bold text-ink">${t(r.studentKey)}</span></td>
    <td><span style="color:var(--c-ink-2)">${t(r.courseKey)}</span></td>
    <td><span style="color:var(--c-ink-2)">${t(r.teacherKey)}</span></td>
    <td><span class="text-[12.5px]" style="color:var(--c-ink-3)">${t(r.descKey)}</span></td>
    <td><span class="text-[12.5px]" style="color:var(--c-ink-3)">${t(r.dateKey)}</span></td>
    <td>${certStatusChip(r.statusId)}</td>
    <td class="text-end"><div class="flex flex-wrap gap-1.5 justify-end">
      ${button({ labelKey: 'adm.cert.view', variant: 'ghost', size: 'sm', icon: 'search', attrs: `data-drawer="cr-${esc(r.id)}"` })}
      ${gate('adm.cert.approve', 'check-circle', 'adm.cert.approveReason', 'ghost')}
      ${gate('adm.cert.reject', 'x-circle', 'adm.cert.rejectReason', 'ghost')}
    </div></td>
  </tr>`;
}
/* Spec 032 (FC-35) — the Issue-certificate form drawer (replaces the bare gate):
 * fixture-derived selects + date/message controls + the document-preview
 * affordance as an inline gate. The Issue final = the formDrawer gate. */
function certCreateDrawer() {
  const studentOpts = CERT_REQUESTS.map((r, i) => ({ value: r.id, labelKey: r.studentKey, selected: i === 0 }));
  const courseOpts = [...new Set(CERT_REQUESTS.map((r) => r.courseKey))].map((k, i) => ({ value: k.split('.').pop(), labelKey: k, selected: i === 0 }));
  const tplOpts = CERT_TEMPLATES.map((tp, i) => ({ value: tp.id, labelKey: tp.nameKey, selected: i === 0 }));
  const fields = [
    field({ labelKey: 'adm.cert.colStudent', name: 'certCreate-student', type: 'select', options: studentOpts }),
    field({ labelKey: 'adm.cert.colCourse', name: 'certCreate-course', type: 'select', options: courseOpts }),
    field({ labelKey: 'adm.cert.createTplLabel', name: 'certCreate-template', type: 'select', options: tplOpts }),
    field({ labelKey: 'adm.cert.colDate', name: 'certCreate-date', placeholderKey: 'adm.form.datePh' }),
    field({ labelKey: 'adm.cert.createMsg', name: 'certCreate-message', type: 'textarea', placeholderKey: 'adm.cert.createMsgPh', full: true }),
  ].join('') + `<div class="field field-full">${gate('adm.cert.preview', 'search', 'adm.cert.previewReason')}</div>`;
  return formDrawer('cert-create', { titleKey: 'adm.cert.create', headIcon: 'certificates', fields, ctaKey: 'adm.cert.create', reasonKey: 'adm.cert.createReason' });
}
function requestsPanel() {
  const toolbar = `<div class="flex items-center flex-wrap gap-2 mb-3">
    ${drawerBtn('adm.cert.create', 'plus', 'cert-create', 'primary')}
    ${gate('adm.cert.uploadCert', 'download', 'adm.cert.uploadCertReason')}
  </div>`;
  const table = `<section class="card overflow-hidden"><div class="overflow-x-auto"><table class="tbl">
    <thead><tr>
      <th>${t('adm.cert.colStudent')}</th><th>${t('adm.cert.colCourse')}</th><th>${t('adm.cert.colTeacher')}</th>
      <th>${t('adm.cert.colDesc')}</th><th>${t('adm.cert.colDate')}</th><th>${t('adm.cert.colStatus')}</th>
      <th class="text-end"><span class="sr-only">${t('adm.cert.view')}</span></th>
    </tr></thead>
    <tbody>${CERT_REQUESTS.map(requestRow).join('')}</tbody>
  </table></div></section>`;
  const drawers = CERT_REQUESTS.map(requestDrawer).join('') + certCreateDrawer();
  return `${toolbar}${table}${drawers}`;
}

export function renderCertificates() {
  const views = tabs({
    group: 'certificates', ariaKey: 'adm.cert.tab.aria',
    items: [
      { id: 'templates', labelKey: 'adm.cert.tab.templates', icon: 'certificates' },
      { id: 'requests', labelKey: 'adm.cert.tab.requests', icon: 'inbox' },
    ],
    panels: { templates: templatesPanel(), requests: requestsPanel() },
  });
  return `${pageHeader({ titleKey: 'adm.cert.title', subKey: 'adm.cert.sub' })}${views}`;
}

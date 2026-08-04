'use strict';

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value)) deepFreeze(child);
  return value;
}

const BASELINE = deepFreeze({
  htmlFiles: 115,
  pageBodies: 114,
  routesPerLocale: 57,
  redirectNoBody: ['index.html'],
  drawerTargetsPerLocale: 234,
  formTargetsPerLocale: 72,
  topLevelFormTargetsPerLocale: 58,
  nestedFormTargetsPerLocale: 14,
  detailTargetsPerLocale: 162,
  staticDrawerTriggersPerLocale: 229,
  dynamicRowMenuTriggersPerLocale: 75,
  confirmationsPerLocale: 160,
  destructiveConfirmationsPerLocale: 97,
  genericModalTriggersPerLocale: 13,
  menusPerLocale: 405,
  rowMenusPerLocale: 75,
  shellGlobalMenusPerLocale: 330,
  mobileSidebarOpenersPerLocale: 32,
  dedicatedPageWizardsPerLocale: 1,
  backendRequiredAuthoredConsumers: 7,
  backendRequiredGeneratedPages: 40,
  backendRequiredGeneratedPagesByLocale: { ar: 20, en: 20 },
  backendRequiredLocalizedInstances: 94,
  backendRequiredLocalizedInstancesByLocale: { ar: 47, en: 47 },
  knownDuplicateIdRecords: 30,
  knownDuplicateIdRecordsByLocale: { ar: 15, en: 15 },
  knownDuplicateTargetRecords: 10,
  knownDuplicateTargetRecordsByLocale: { ar: 5, en: 5 },
  knownDuplicateFieldIds: ['f-fbAdd-category', 'f-fbAdd-remark', 'f-fbAdd-note'],
});

const FINAL = deepFreeze({
  duplicateIdRecords: 0,
  duplicateTargetRecords: 0,
  pageCount: 115,
  pageBodyCount: 114,
  newDedicatedPages: 0,
  classificationsPerLocale: {
    smallConfirmations: 160,
    genericInformationalModals: 13,
    mediumSimpleFormModals: 54,
    contextualLongFormDrawers: 18,
    detailDrawers: 162,
    dedicatedPageWizards: 1,
    dropdowns: 405,
    mobileSidebars: 32,
    fullScreenTemplatedSurfacesAt390: 234,
    fullScreenGenericSurfacesAt390: 13,
  },
});

const BACKEND_REQUIRED = deepFreeze({
  key: 'common.backendRequiredNote',
  ar: 'هذا الإجراء يحتاج اتصال الخادم لإتمامه — لا يُحفَظ شيء الآن.',
  en: 'This action needs the server connection to complete — nothing is saved yet.',
});

const MUTATION_GUARDS = deepFreeze({
  'M44-01': 'inventory.required-opener',
  'M44-02': 'interaction.opener-target-mapping',
  'M44-03': 'interaction.dialog-semantics',
  'M44-04': 'interaction.focus-containment',
  'M44-05': 'interaction.focus-restoration',
  'M44-06': 'interaction.escape-dismissal',
  'M44-07': 'interaction.dirty-dismissal',
  'M44-08': 'interaction.one-overlay',
  'M44-09': 'interaction.scroll-restoration',
  'M44-10': 'layout.mobile-390-fullscreen',
  'M44-11': 'layout.stable-action-footer',
  'M44-12': 'interaction.backend-required-truthfulness',
  'M44-13': 'inventory.locale-parity',
  'M44-14': 'inventory.fail-loud',
  'M44-15': 'inventory.recursive-duplicate-id',
});

module.exports = deepFreeze({ BASELINE, FINAL, BACKEND_REQUIRED, MUTATION_GUARDS, deepFreeze });

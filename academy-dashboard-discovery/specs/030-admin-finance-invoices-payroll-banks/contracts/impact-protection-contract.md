# Contract — Impact Protection

**Guarantee**: only intended finance files change.
**Changed (intended)**: `finance.html`/`.en` (+ shared-asset hashes from fixtures/locales/CSS build).
**Byte-identical**: 16 teacher-portal, teacher-performance, family, student, reports (+ Spec-029 fold), all 026/027/028/029 pages, index, dashboard.
**0-diff**: `package.json`, `nav.config.js`, `enhance.js`, no new dependency/engine/hook/storage key.
**Verify**: `git diff --stat` matches the changed set exactly (finance HTML only).
**Fail if**: any unexpected file changes; package.json/nav.config/enhance change.

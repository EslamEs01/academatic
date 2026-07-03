# Contract: Static HTML / Django-Ready (Spec 017)

**Status**: Binding.

1. Shell v2 is fully baked by the SSG: complete pre-rendered pairs, no runtime DOM construction, no new hooks, native `<details>` for mobile, GitHub-Pages relative hrefs.
2. Django mapping: the aside/drawer render from `ROLE_NAV` → a `{% for item in role_nav %}` loop in `templates/portal/_base.html`; `status` gates anchor-vs-button exactly like the admin nav's status mapping; `aria-current` from the view's `active_id`.
3. AR default + `.en.html` LTR pairs; light/dark/system tokens untouched; no library/CDN/TS.

**Acceptance**: build output diff confined to the four pairs; README gains the shell-v2 Django note.

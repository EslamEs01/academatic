# Source, Generated Output, and Impact Contract

- Authored page modules/components/fixtures/locales/styles own all behavior and markup.
- `app/public` is build output and is never hand-edited.
- Each authored change declares its AR/EN page consumers and shared asset consumers.
- The pre-implementation authority is committed HEAD `722be1c37904f0fd44d666553e91239d7e8b4400`; historical bytes are read through Git when needed.
- The impact extractor must reject missing/duplicate `#page-body`, unexpected paths, parse failure, and whole-file fallback.
- Page/body/source/generated/test/screenshot/a11y counts are recorded before and after.
- No application page is edited to manufacture an impact count.
- Added/removed pages are expected to remain zero; any deviation is a STOP until evidence, route, and ownership are proven.
- Unrelated page-body drift must be zero.

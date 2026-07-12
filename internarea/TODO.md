# Task TODO: Fix Public Space profile card translation

- [x] Inspect Public Space components for any hardcoded English messages related to posting restrictions and other Public Space text.

- [ ] Add missing i18n translation keys for the posting restriction message(s) to `LanguageContext.tsx` under `publicSpace` for each supported language.

- [x] Replace hardcoded English strings with `t('publicSpace.<key>')` in the Public Space posting restriction logic (toast/message shown in profile card / UI).

- [x] Ensure language switching updates immediately by using the `t` function at render time (no caching of translated strings).

- [x] Ensure translated text persists after refresh (use existing localStorage language mechanism; avoid storing English strings).

- [x] Apply the same fix to any other remaining hardcoded text in the Public Space section.

- [ ] Run a quick TypeScript build/lint (if available) and do a minimal manual verification (switch language -> message changes; refresh -> translated message shown).

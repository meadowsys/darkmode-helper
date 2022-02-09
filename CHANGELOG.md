# changelog

## v0.3.0

- redid everything again (basically made everything lower_snake_case)
- listen to events from the media matcher and rerun `init` when that happens
- added `set_local_storage_key` and `get_local_storage_key` to change the localStorage key of where to store the setting
- use one global media matcher (don't create a new one every time one is needed) and provide `get_matcher` to expose it to end users
- added a way to get/set classname of dark mode class

## v0.2.1

- inline the sources in the source map

## v0.2.0

- rewrote the whole thing, pretty much
- new methods: `settingIsDarkMode`, `settingIsLightMode`, `settingIsSystemMode`
- changed methods: `querySystemColorScheme` -> `getSystemPreferredColorScheme`, `getColorScheme` -> `getColorSchemeSetting`, `setColorScheme` rewritten, `initColorScheme` rewritten, `setToDarkMode`,  `setToLightMode`, and `setToSystemMode` rewritten, `isDarkMode` -> `shouldUseDarkMode`, `isLightMode` -> `shouldUseLightMode`
- change storage key from `choospac-display-mode` to `__darkmode-helper_mode__` (choospac is another project, I wrote this small module for that project initially)

## v0.1.0

- initial release
- provided functions `querySystemColorScheme`, `getColorScheme`, `setColorScheme`, `initColorScheme`, `toggleDisplayMode`, `setToDarkMode`, `setToLightMode`, `setToSystemMode`, `isDarkMode`, `isLightMode`

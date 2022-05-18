# changelog

## ~~v0.4.0~~ v0.4.2 (I did a publishing oopsie)

- redid everything YET AGAIN
- can create individual instances (not one global instance) using `define_darkmode_helper`, which returns a function `use_darkmode_helper`. Call `use_darkmode_helper` to get the same instance every time.
  - `get` to get the mode, either `light` or `dark`
  - `get_setting` to get the currently set setting
  - `get_setting_and_mode` convenience function for `get` and `get_setting`
  - `set_setting` sets the setting. Triggers all watchers
  - `watch` watch for setting and system preference changes
  - `unwatch` pass the same callback you passed to `watch` to remove it
- Setting stores to specify the storage backend. Two provided OOTB, `create_local_storage`: uses localStorage , and `create_custom`: provides a way for you to provide your own functions to get/set setting from a backend
- `dark_watcher` and `light_watcher` to watch for `dark` and `light` modes, and add/remove `.dark` and `.light` to `document.documentElement` respectively, as well as `mode_class_watcher`, to watch for the specified mode and apply the specified class on specified setting

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

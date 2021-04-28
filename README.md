# darkmode-helper <!-- omit in toc -->

small module to help manage dark mode. It provides functions for toggling dark mode, switching between light and dark modes, using system mode, and automatically saves the preference in local storage. Also works with [tailwindcss](https://tailwindcss.com/) with dark mode set to "class".

## Table of Contents <!-- omit in toc -->

- [install](#install)
- [usage](#usage)
  - [types](#types)
    - [ColorSchemes](#colorschemes)
    - [ColorSchemeSettings](#colorschemesettings)
  - [methods](#methods)
    - [getSystemPreferredColorScheme](#getsystempreferredcolorscheme)
    - [getColorSchemeSetting](#getcolorschemesetting)
    - [setColorScheme](#setcolorscheme)
    - [initColorScheme](#initcolorscheme)
    - [toggleDisplayMode](#toggledisplaymode)
    - [settingIsDarkMode](#settingisdarkmode)
    - [settingIsLightMode](#settingislightmode)
    - [settingIsSystemMode](#settingissystemmode)
    - [setToDarkMode](#settodarkmode)
    - [setToLightMode](#settolightmode)
    - [setToSystemMode](#settosystemmode)
    - [shouldUseDarkMode](#shouldusedarkmode)
    - [shouldUseLightMode](#shoulduselightmode)
- [license](#license)

## install

install with package manager of choice. for example:

```txt
pnpm i -D darkmode-helper
```

## usage

Use this with a frontend bundler. CDN not supported at the moment, sorry!

```ts
import { initColorScheme, setToLightMode, setToDarkMode } from "darkmode-helper";

document.querySelector("#lightbutton").onclick = () => setToLightMode();
document.querySelector("#darkbutton").onclick = () => setToDarkMode();
initColorScheme();
```

To detect the mode, query for the class `.dark` on the `<body>` tag. If it is there, dark mode is on; if not, light mode. The setting defaults to using system's color scheme mode.

### types

#### ColorSchemes

**type** `type ColorSchemes = "light" | "dark"`

either light or dark, represents the actual color schemes that can be presented on the UI

#### ColorSchemeSettings

**type** `type ColorSchemeSettings = "light" | "dark" | "system"`

either light, dark, or system, represents the settings that are stored. system means that light/dark is picked based on the system preference.

### methods

lots of random methods! but because you are using a bundler, the extras are tree-shaken out so its all good

#### getSystemPreferredColorScheme

**signature** `function getSystemPreferredColorScheme(): ColorSchemes`

queries the system for its preferred color scheme\
**returns** `dark` if system prefers dark mode, `light` if system prefers light mode

#### getColorSchemeSetting

**signature** `function getColorSchemeSetting(): ColorSchemeSettings`

gets stored color scheme setting

#### setColorScheme

**signature** `function setColorScheme(scheme: ColorSchemeSettings): void`

sets the color scheme setting to the specified and applies it\
**param `scheme`** color scheme to set it to, either `light`, `dark`, or `system`

#### initColorScheme

**signature** `function initColorScheme(): void`

initialises the color scheme. pulls the setting from local storage and applies it

#### toggleDisplayMode

**signature** `function toggleDisplayMode(): ColorSchemeSettings`

toggles display mode setting like so:

- system becomes dark
- dark becomes light
- light becomes system

**returns** mode that it set to

#### settingIsDarkMode

**signature** `function settingIsDarkMode(): boolean`

**returns** true if the setting is set to `dark`

#### settingIsLightMode

**signature** `function settingIsLightMode(): boolean`

**returns** true if the setting is set to `light`

#### settingIsSystemMode

**signature** `function settingIsSystemMode(): boolean`

**returns** true if the setting is set to `system`

#### setToDarkMode

**signature** `function setToDarkMode(): void`

sets to dark mode

#### setToLightMode

**signature** `function setToLightMode(): void`

sets to light mode

#### setToSystemMode

**signature** `function setToSystemMode(): void`

sets to system preferred mode

#### shouldUseDarkMode

**signature** `function shouldUseDarkMode(): boolean`

**returns** true if system should use dark mode (either setting is `dark`, or etting is `system` and system prefers dark mode)

#### shouldUseLightMode

**signature** `function shouldUseLightMode(): boolean`

**returns** true if system should use light mode (either setting is `light` or setting is `system` and system prefers light mode)

## license

[MIT](LICENSE)

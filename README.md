# darkmode-helper <!-- omit in toc -->

small module to help manage dark mode. It provides functions for toggling dark mode, turning it on, off, using system mode, and automatically saves the preference in local storage. Also works with [tailwindcss](https://tailwindcss.com/) with dark mode set to "class".

## Table of Contents <!-- omit in toc -->

- [install](#install)
- [usage](#usage)
  - [methods](#methods)
- [license](#license)

## install

install with package manager of choice. for example:

```txt
pnpm i -D darkmode-helper
```

## usage

Use this with a frontend bundler. CDN not supported at the moment, sorry!

```ts
import { initColorScheme } from "darkmode-helper";

initColorScheme();
```

To detect the mode, query for the class `.dark` on the `<body>` tag. If it is there, dark mode is on; if not, light mode. The setting defaults to using system's color scheme mode.

### methods

Examples coming soon&trade;. You can see the documentation for the methods inside your editor using intellisense.

## license

[MIT](LICENSE)

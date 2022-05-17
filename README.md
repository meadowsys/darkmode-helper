# darkmode-helper <!-- omit in toc -->

small module to help manage dark mode. It provides functions for toggling dark mode, switching between light and dark modes, using system mode, and automatically saves the preference in local storage. Also works with [windicss] / [tailwindcss] with dark mode set to "class".

## Table of Contents <!-- omit in toc -->

- [install](#install)
- [usage](#usage)
- [license](#license)

## install

install with package manager of choice. for example:

```txt
pnpm i -D darkmode-helper
```

## usage

Use this with a frontend bundler. CDN not supported at the moment, sorry!

```ts
import { define_darkmode_helper, create_local_storage } from ".";

const use_darkmode_helper = await define_darkmode_helper(create_local_storage());

// then, in any other file that it is needed in
import { use_darkmode_helper } from "./other-file";

const helper = use_darkmode_helper();

helper.watch(mode => console.log(mode));

document.querySelector("#dark-button").onclick = () => helper.set_setting("dark");
document.querySelector("#light-button").onclick = () => helper.set_setting("light");
document.querySelector("#system-button").onclick = () => helper.set_setting("system");
```

To detect the mode, query for the class `.dark` on the `<body>` tag. If it is there, dark mode is on; if not, light mode. The setting defaults to using system's color scheme mode.

This module does ship documentation in the form of jsdoc comments.

## license

[MIT](LICENSE)

[windicss]: https://windicss.org
[tailwindcss]: https://tailwindcss.com/

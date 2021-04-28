export type ColorSchemes = "light" | "dark";
export type ColorSchemeOptions = "light" | "dark" | "system";
export const ColorSchemeStorageKey = "choospac-display-mode";

/**
 * @returns `dark` if system prefers dark mode, `light` if system prefers
 *          light mode
 */
export function querySystemColorScheme(): ColorSchemes {
   return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * gets color scheme setting
 */
export function getColorScheme(): ColorSchemeOptions {
   const storedmode = localStorage.getItem(ColorSchemeStorageKey);

   // no key is system
   if (storedmode === null) return "system";

   // validate its a valid mode and return it
   if (storedmode === "dark" || storedmode === "light") return storedmode;

   // invalid mode, nuke it lol and use system
   localStorage.removeItem(ColorSchemeStorageKey);
   return "system";
}

/**
 * sets color scheme setting to one of `dark`, `light`, or `system`
 */
export function setColorScheme(mode: ColorSchemeOptions): void {
   mode === "dark" || mode === "light"
      // dark mode or light mode, set it in storage
      ? localStorage.setItem(ColorSchemeStorageKey, mode)
      // not in storage is system
      : localStorage.removeItem(ColorSchemeStorageKey);

   mode === "dark" || (mode !== "light" && querySystemColorScheme() === "dark")
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
}

/**
 * initialises the color scheme. If setting is set to `dark`, or it is set to `system`
 * and the system prefers dark mode, then it adds the class to the body. Oherwise
 * do nothing (light mode).
 */
export function initColorScheme(): void {
   setColorScheme(getColorScheme());
}

/**
 * toggles display mode setting like so:
 *
 * - system becomes dark
 * - dark becomes light
 * - light becomes system
 *
 * @returns mode that it set to
 */
export function toggleDisplayMode(): ColorSchemeOptions {
   const mode = getColorScheme();
   const newmode = mode === "system" ? "dark"
                 : mode === "dark" ? "light"
                 : "system"
   setColorScheme(newmode);
   return newmode;
}

/**
 * @returns if the setting is set to `dark` mode
 */
export function setToDarkMode() {
   return getColorScheme() === "dark";
}

/**
 * @returns if the setting is set to `light` mode
 */
export function setToLightMode() {
   return getColorScheme() === "light";
}

/**
 * @returns if the setting is set to `system` mode
 */
export function setToSystemMode() {
   return getColorScheme() === "system";
}

/**
 * @returns if system should use dark mode (either setting is `dark` or
 *          setting is `system` and system prefers dark mode)
 */
export function isDarkMode() {
   return setToDarkMode() || querySystemColorScheme() === "dark";
}

/**
 * @returns if system should use light mode (either setting is `light` or
 *          setting is `system` and system prefers light mode)
 */
export function isLightMode() {
   return setToLightMode() || querySystemColorScheme() === "light";
}

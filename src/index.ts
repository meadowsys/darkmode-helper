/**
 * either light or dark, represents the actual color schemes
 * that can be presented on the UI
 */
export type ColorSchemes = "light" | "dark";
/**
 * either light, dark, or system, represents the settings that are stored.
 * system means that light/dark is picked based on the system preference.
 */
export type ColorSchemeSettings = "light" | "dark" | "system";
export const ColorSchemeStorageKey = "__darkmode-helper_mode__";

const matcher = matchMedia("(prefers-color-scheme: dark)");
matcher.addEventListener("change", () => initColorScheme());

/**
 * queries the system for its preferred color scheme
 * @returns `dark` if system prefers dark mode, `light` if system prefers
 *          light mode
 */
export function getSystemPreferredColorScheme(): ColorSchemes {
   return matcher.matches ? "dark" : "light";
}

/**
 * sets the color scheme setting to the specified and applies it
 * @param scheme color scheme to set it to, either `light`, `dark`, or `system`
 */
export function setColorScheme(scheme: ColorSchemeSettings): void {
   scheme === "system"
      // system scheme is when no item in localstorage
      ? localStorage.removeItem(ColorSchemeStorageKey)
      // light/dark store in localstorage
      : localStorage.setItem(ColorSchemeStorageKey, scheme);

   initColorScheme();
}

/**
 * gets stored color scheme setting
 */
export function getColorSchemeSetting(): ColorSchemeSettings {
   const stored = localStorage.getItem(ColorSchemeStorageKey);
   if (stored === "dark" || stored === "light") return stored;
   // its null or some other random string
   // no nuke, just leave it i guess lul
   return "system";
}

/**
 * initialises the color scheme. pulls the setting from local storage
 * and applies it
 */
export function initColorScheme(): void {
   const scheme = getColorSchemeSetting();

   shouldUseDarkMode()
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
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
export function toggleDisplayMode(): ColorSchemeSettings {
   const mode = getColorSchemeSetting();
   const newmode = mode === "system" ? "dark"
                 : mode === "dark" ? "light"
                 : "system"
   setColorScheme(newmode);
   return newmode;
}

/**
 * @returns true if the setting is set to `dark`
 */
export function settingIsDarkMode(): boolean {
   return getColorSchemeSetting() === "dark";
}

/**
 * @returns true if the setting is set to `light`
 */
export function settingIsLightMode(): boolean {
   return getColorSchemeSetting() === "light";
}

/**
 * @returns true if the setting is set to `system`
 */
export function settingIsSystemMode(): boolean {
   return getColorSchemeSetting() === "system";
}

/**
 * sets to dark mode
 */
export function setToDarkMode(): void {
   setColorScheme("dark");
}

/**
 * sets to light mode
 */
export function setToLightMode(): void {
   setColorScheme("light");
}

/**
 * sets to system preferred mode
 */
export function setToSystemMode(): void {
   setColorScheme("system");
}

/**
 * @returns true if system should use dark mode (either setting is `dark`, or
 *          setting is `system` and system prefers dark mode)
 */
export function shouldUseDarkMode(): boolean {
   const scheme = getColorSchemeSetting();
   return scheme === "dark" || (scheme === "system" && getSystemPreferredColorScheme() === "dark");
}

/**
 * @returns true if system should use light mode (either setting is `light` or
 *          setting is `system` and system prefers light mode)
 */
export function shouldUseLightMode(): boolean {
   const scheme = getColorSchemeSetting();
   return scheme === "light" || (scheme === "system" && getSystemPreferredColorScheme() === "light");
}

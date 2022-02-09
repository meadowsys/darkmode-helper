//#region typedefs / global vars

/**
 * either light or dark, represents the actual colour schemes
 * that can be presented on the UI
 */
export type ColourSchemes = "light" | "dark";

/**
 * either light, dark, or system, represents the settings that are stored.
 * system means that light/dark is picked based on the system preference.
 */
export type ColourSchemeSettings = "light" | "dark" | "system";

/** localstorage key to use to store the setting */
let colour_scheme_localstorage_key = "__darkmode-helper_mode__";

//#endregion

//#region matcher

/** one instance of matcher, don't create a new one every time (probably microoptimisation) */
const matcher_prefers_dark = matchMedia("(prefers-color-scheme: dark)");
matcher_prefers_dark.addEventListener("change", () => init());

/**
 * get the media matcher used internally. This matcher tests for `prefers-color-scheme: dark`
 */
export function get_matcher() {
   return matcher_prefers_dark;
}

//#endregion

//#region classname

let classname = "dark";

/**
 * get the name of the class that is applied to the root element of the html when
 * dark mode is enabled
 */
export function get_classname() {
   return classname;
}

/**
 * set the name of the class that is applied to the root element of the html when
 * dark mode is enabled
 */
export function set_classname(c: string) {
   classname = c;
}

//#endregion

//#region local storage key

/**
 * Use this localStorage key to store preference instead of the default
 * (`__darkmode-helper_mode__`). Use this first if the default needs to be reserved
 * for something else. Make sure to call this before doing anything else.
 *
 * @param key the key
 * @param delete_old whether or not to delete the value set at the old key
 */
export function set_local_storage_key(key: string, delete_old = false) {
   delete_old && localStorage.removeItem(colour_scheme_localstorage_key);
   colour_scheme_localstorage_key = key;
}

/**
 * Gets the localStorage key that is being used to store the setting
 */
export function get_local_storage_key() {
   return colour_scheme_localstorage_key;
}

//#endregion

//#region get/set the setting

/**
 * queries the system for its preferred colour scheme
 * @returns `dark` if system prefers dark mode, `light` if system prefers
 *          light mode
 */
export function get_system_preferred_colour_scheme(): ColourSchemes {
   return matcher_prefers_dark.matches ? "dark" : "light";
}

/**
 * gets colour scheme setting (stored in localStorage)
 */
export function get_colour_scheme_setting(): ColourSchemeSettings {
   const stored = localStorage.getItem(colour_scheme_localstorage_key);
   if (stored === "dark" || stored === "light") return stored;
   // could be "system", could be something else, not going to touch
   return "system";
}

/**
 * gets the colour scheme to use (either dark or light)
 */
export function get_colour_scheme(): ColourSchemes {
   const setting = get_colour_scheme_setting();
   return setting === "system" ? get_system_preferred_colour_scheme() : setting;
}

/**
 * sets the colour scheme setting to the specified and applies it
 * @param scheme colour scheme to set it to, either `light`, `dark`, or `system`
 */
export function set_colour_scheme(scheme: ColourSchemeSettings): void {
   scheme === "system"
      ? localStorage.removeItem(colour_scheme_localstorage_key)
      : localStorage.setItem(colour_scheme_localstorage_key, scheme);
}

//#endregion

//#region dark

/**
 * @returns true if the setting is set to `dark`
 */
export function setting_is_dark_mode(): boolean {
   return get_colour_scheme_setting() === "dark";
}

/**
 * sets to dark mode
 */
export function set_to_dark_mode(): void {
   set_colour_scheme("dark");
}

//#endregion

//#region light

/**
 * @returns true if the setting is set to `light`
 */
export function setting_is_light_mode(): boolean {
   return get_colour_scheme_setting() === "light";
}

/**
 * sets to light mode
 */
export function set_to_light_mode(): void {
   set_colour_scheme("light");
}

//#endregion

//#region system

/**
 * @returns true if the setting is set to `system`
 */
export function setting_is_system_mode(): boolean {
   return get_colour_scheme_setting() === "system";
}

/**
 * sets to system preferred mode
 */
export function set_to_system_mode(): void {
   set_colour_scheme("system");
}

//#endregion

//#region interpret the settings and stuffs

/**
 * @returns true if you should use dark mode (either setting is `dark`, or
 *          setting is `system` and the system prefers dark mode)
 */
export function should_use_dark_mode(): boolean {
   return get_colour_scheme() === "dark";
}

/**
 * @returns true if you should use light mode (either setting is `light` or
 *          setting is `system` and the system prefers light mode)
 */
export function should_use_light_mode(): boolean {
   return get_colour_scheme() === "light";
}

//#endregion

//#region misc

/**
 * initialises the colour scheme. pulls the setting from local storage
 * and applies it
 */
export function init(): void {
   should_use_dark_mode()
      ? document.documentElement.classList.add(classname)
      : document.documentElement.classList.remove(classname);
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
export function toggle_display_mode(): ColourSchemeSettings {
   const mode = get_colour_scheme_setting();
   const new_mode = mode === "system" ? "dark"
                  : mode === "dark" ? "light"
                  : "system";
   set_colour_scheme(new_mode);
   return new_mode;
}

//#endregion

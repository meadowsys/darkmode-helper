import { ColourScheme, ColourSchemeModeAndSetting,  ColourSchemeSetting,  WatchCallback } from "./helpers";

/**
 * a watcher to pass to the darkmode helper to automaticall add `dark` class
 * to `document.documentElement`. Use this with tailwindcss or windicss
 */
export const dark_watcher: WatchCallback = mode_class_watcher("mode", "dark", "dark");
/**
 * a watcher to pass to the darkmode helper to automaticall add `light` class
 * to `document.documentElement`
 */
export const light_watcher: WatchCallback = mode_class_watcher("mode", "light", "light");

export function mode_class_watcher(type: "mode", set_mode: ColourScheme, class_name: string): WatchCallback;
export function mode_class_watcher(type: "setting", set_setting: ColourSchemeSetting, class_name: string): WatchCallback;

/**
 * returns a watcher that adds the specified class when the mode is the specified
 * mode.
 *
 * @param type `mode` if set if mode matches, `setting` to set if setting matches (it matches on `system` too)
 * @param set_mode mode to add on
 * @param class_name class to add to `document.documentElement`
 */
export function mode_class_watcher(
	type: "mode" | "setting",
	set_mode: ColourScheme | ColourSchemeSetting,
	class_name: string
): WatchCallback {
	return (_mode: ColourSchemeModeAndSetting) =>
		set_mode === (type === "mode" ? _mode.mode : _mode.setting)
			? document.documentElement.classList.add(class_name)
			: document.documentElement.classList.remove(class_name)
}

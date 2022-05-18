import { ColourScheme } from "./helpers";

/**
 * a watcher to pass to the darkmode helper to automaticall add `dark` class
 * to `document.documentElement`. Use this with tailwindcss or windicss
 */
export const dark_watcher = mode_class_watcher("dark", "dark");
/**
 * a watcher to pass to the darkmode helper to automaticall add `light` class
 * to `document.documentElement`
 */
export const light_watcher = mode_class_watcher("light", "light");

/**
 * returns a watcher that adds the specified class when the mode is the specified
 * mode.
 * @param set_mode mode to add on
 * @param class_name class to add to `document.documentElement`
 */
export function mode_class_watcher(set_mode: ColourScheme, class_name: string) {
	return (_mode: ColourScheme) => set_mode === _mode
		? document.documentElement.classList.add(class_name)
		: document.documentElement.classList.remove(class_name)
}

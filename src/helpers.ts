/** one instance of matcher, don't create a new one every time (probably microoptimisation) */
const matcher_prefers_dark = matchMedia("(prefers-color-scheme: dark)");

/**
 * either light or dark, represents the actual colour schemes
 * that can be presented on the UI
 */
export type ColourScheme =
	| "light"
	| "dark";

/**
 * either light, dark, or system, represents the settings that are stored.
 * system means that light/dark is picked based on the system preference.
 */
export type ColourSchemeSetting =
	| "light"
	| "dark"
	| "system";

export type DarkModeHelper<Sync extends "sync" | "async"> = {
	/** gets the mode that should be used, either "light" or "dark" */
	get: Sync extends "sync"
		? () => ColourScheme
		: () => Promise<ColourScheme>;

	/** gets the setting that is set, either "light", "dark", or "system" */
	get_setting: Sync extends "sync"
		? () => ColourSchemeSetting
		: () => Promise<ColourSchemeSetting>;

	/** changes the setting to one of "light", "dark", or "system" */
	set: Sync extends "sync"
		? (s: ColourSchemeSetting) => void
		: (s: ColourSchemeSetting) => Promise<void>;

	// watch: {
	// 	(cb: (s: ColourSchemeSetting) => void): void;
	// 	(key: string, cb: (s: ColourSchemeSetting) => void): void;
	// }
	// unwatch: {
	// 	(cb: (s: ColourSchemeSetting) => void): void;
	// 	(key: string): void;
	// }
};

/** queries the system for its preferred colour scheme, either "light" or "dark" */
export function get_system_preference(): ColourScheme {
	return matcher_prefers_dark.matches ? "dark" : "light";
}

export function setting_to_mode(s: ColourSchemeSetting) {
	return s === "system" ? get_system_preference() : s;
}

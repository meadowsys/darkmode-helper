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

export type WatchCallback = (s: ColourScheme) => void;

export type DarkModeHelper<S extends "sync" | "async", W extends boolean = false> = {
	/** gets the mode that should be used, either "light" or "dark" */
	get: S extends "sync"
		? () => ColourScheme
		: () => Promise<ColourScheme>;

	/** gets the setting that is set, either "light", "dark", or "system" */
	get_setting: S extends "sync"
		? () => ColourSchemeSetting
		: () => Promise<ColourSchemeSetting>;

	/** changes the setting to one of "light", "dark", or "system" */
	set: S extends "sync"
		? (s: ColourSchemeSetting) => void
		: (s: ColourSchemeSetting) => Promise<void>;
} & (W extends true ? {
	/**
	 * register a listener for when the setting changes.
	 * Provide a key for more convenient unregistering.
	 */
	watch: {
		(cb: WatchCallback): void;
		(key: string, cb: WatchCallback): void;
	};

	/**
	 * remove a listener function previously registered,
	 * either by function or previously provided key
	 */
	unwatch: {
		(cb: WatchCallback): void;
		(key: string): void;
	};
} : {});

/** queries the system for its preferred colour scheme, either "light" or "dark" */
export function get_system_preference(): ColourScheme {
	return matcher_prefers_dark.matches ? "dark" : "light";
}

export function setting_to_mode(s: ColourSchemeSetting) {
	return s === "system" ? get_system_preference() : s;
}

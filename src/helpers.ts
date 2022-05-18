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

/** mode and colour scheme setting all in one */
export type ColourSchemeModeAndSetting = {
	mode: ColourScheme;
	setting: ColourSchemeSetting;
};

/** callback for watcher */
export type WatchCallback = (s: ColourSchemeModeAndSetting) => void;

/** store of the settings. Provides two methods to get/set the setting however it needs to */
export type SettingStore = {
	get_setting: () => Promise<ColourSchemeSetting>;
	set_setting: (s: ColourSchemeSetting) => Promise<void>;
};

/** queries the system for its preferred colour scheme, either "light" or "dark" */
function get_system_preference(): ColourScheme {
	return matcher_prefers_dark.matches ? "dark" : "light";
}


/**
 * takes a setting and turns it into a mode, by transforming "system" setting
 * into "light" or "dark" based on system preference
 */
function setting_to_mode(s: ColourSchemeSetting) {
	return s === "system" ? get_system_preference() : s;
}

/**
 * wrapper for two variables to cache the setting, to prevent from having to
 * query expensive backends for example.
 */
export function create_settings_cache(cb: (c: ColourSchemeModeAndSetting) => void) {
	let setting: ColourSchemeSetting = "system";
	let mode: ColourScheme = setting_to_mode(setting);

	function get(): ColourSchemeModeAndSetting {
		return { setting, mode };
	}

	function set(s: ColourSchemeSetting): ColourSchemeModeAndSetting {
		setting = s;
		return update();
	}

	function update(): ColourSchemeModeAndSetting {
		mode = setting_to_mode(setting);
		return get();
	}

	matcher_prefers_dark.addEventListener("change", () => cb(update()));

	return { get, set, update };
}

/**
 * checks the setting backend for nonexistent / wrong settings and updates them
 * with a default of `system`
 */
export async function init_setting(
	get_setting: () => Promise<ColourSchemeSetting>,
	set_setting: (s: ColourSchemeSetting) => Promise<void>
) {
	const current_setting = await get_setting();
	if (
		current_setting !== "dark"
		&& current_setting !== "light"
		&& current_setting !== "system"
	) await set_setting("system");
}

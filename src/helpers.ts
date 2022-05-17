/** one instance of matcher, don't create a new one every time (probably microoptimisation) */
export const matcher_prefers_dark = matchMedia("(prefers-color-scheme: dark)");

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
export type MediaQueryCallback = (e: MediaQueryListEvent) => void;

export type SettingStore = {
	get_setting: () => Promise<ColourSchemeSetting>;
	set_setting: (s: ColourSchemeSetting) => Promise<void>;
};

/** queries the system for its preferred colour scheme, either "light" or "dark" */
export function get_system_preference(): ColourScheme {
	return matcher_prefers_dark.matches ? "dark" : "light";
}


/**
 * takes a setting and turns it into a mode, by transforming "system" setting
 * into "light" or "dark" based on system preference
 */
function setting_to_mode(s: ColourSchemeSetting) {
	return s === "system" ? get_system_preference() : s;
}

export type ColourSchemeModeAndSetting = {
	mode: ColourScheme;
	setting: ColourSchemeSetting;
};

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

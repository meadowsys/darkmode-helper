import * as h from "../helpers";

export function create_custom(
	get_setting_from_storage: () => h.ColourSchemeSetting,
	set_setting_to_storage: (s: h.ColourSchemeSetting) => void,
	// watch: (s: h.ColourSchemeSetting) => void
): h.DarkModeHelper<"sync"> {
	return { get, get_setting, set };

	function get_setting(): h.ColourSchemeSetting {
		return get_setting_from_storage();
	}

	function get(): h.ColourScheme {
		let setting = get_setting();
		return h.setting_to_mode(setting);
	}

	function set(s: h.ColourSchemeSetting) {
		set_setting_to_storage(s);
	}
}

import * as h from "..";

/** this helper uses `localStorage` as the method of storing the preferences. */
export function create_local_storage(store_key: string): h.DarkModeHelper<"sync"> {
	return { get, get_setting, set };

	function get_setting(): h.ColourSchemeSetting {
		return (localStorage.getItem(store_key) || "system") as h.ColourSchemeSetting;
	}

	function get(): h.ColourScheme {
		let setting = get_setting();
		return setting === "system" ? h.get_system_preference() : setting;
	}

	function set(s: h.ColourSchemeSetting) {
		localStorage.setItem(store_key, s);
	}
}

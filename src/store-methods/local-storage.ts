import * as h from "../helpers";

/** this helper uses `localStorage` as the method of storing the preferences. */
export function create_local_storage(store_key: string): h.DarkModeHelper<"sync", true> {
	let event_listener_store = h.create_event_listener_store("sync", get_setting);

	return { get, get_setting, set, watch, unwatch };

	function get_setting(): h.ColourSchemeSetting {
		return (localStorage.getItem(store_key) || "system") as h.ColourSchemeSetting;
	}

	function get(): h.ColourScheme {
		let setting = get_setting();
		return h.setting_to_mode(setting);
	}

	function set(s: h.ColourSchemeSetting) {
		localStorage.setItem(store_key, s);
	}

	function watch(watch_cb: h.WatchCallback) {
		let listener = event_listener_store.store_function(watch_cb);
		h.matcher_prefers_dark.addEventListener("change", listener);
	}

	function unwatch(watch_cb: h.WatchCallback) {
		let listener = event_listener_store.get_function(watch_cb);
		listener && h.matcher_prefers_dark.removeEventListener("change", listener);
	}
}

import * as h from "../helpers";

export function create_custom_async(
	get_setting_from_storage: () => Promise<h.ColourSchemeSetting>,
	set_setting_to_storage: (s: h.ColourSchemeSetting) => Promise<void>,
	// watch: (s: h.ColourSchemeSetting) => Promise<void>
): h.DarkModeHelper<"async"> {
	let event_listener_store = h.create_event_listener_store("async", get_setting);

	return { get, get_setting, set, watch, unwatch };

	function get_setting(): Promise<h.ColourSchemeSetting> {
		return get_setting_from_storage();
	}

	async function get(): Promise<h.ColourScheme> {
		let setting = await get_setting();
		return h.setting_to_mode(setting);
	}

	function set(s: h.ColourSchemeSetting) {
		return set_setting_to_storage(s);
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

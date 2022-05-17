import * as h from "../helpers";

/** this helper uses `localStorage` as the method of storing the preferences. */
export function create_local_storage(store_key: string): h.DarkModeHelper<"sync", true> {
	let event_listener_store = h.create_event_listener_store("sync", get_setting);

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

	const watch: h.DarkModeHelper<"sync", true>["watch"] = (arg1, arg2 = undefined) => {
		if (typeof arg1 === "function") {
			let listener = event_listener_store.store_function(arg1);
			h.matcher_prefers_dark.addEventListener("change", listener);
		} else if (typeof arg1 === "string" && typeof arg2 === "function") {
			let listener = event_listener_store.store_function(arg2 as any, arg1);
			h.matcher_prefers_dark.addEventListener("change", listener);
		}
	}

	function unwatch(key: h.WatchCallback | string) {
		let fn = event_listener_store.get_function(key);
		fn && h.matcher_prefers_dark.removeEventListener("change", fn);
	}

	return { get, get_setting, set, watch, unwatch };
}

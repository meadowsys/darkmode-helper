import * as h from "../helpers";

export function create_custom(
	get_setting_from_storage: () => h.ColourSchemeSetting,
	set_setting_to_storage: (s: h.ColourSchemeSetting) => void,
	// watch: (s: h.ColourSchemeSetting) => void
): h.DarkModeHelper<"sync"> {
	const event_listener_store = h.create_event_listener_store("sync", get_setting);

	function get_setting(): h.ColourSchemeSetting {
		return get_setting_from_storage();
	}

	function get(): h.ColourScheme {
		const setting = get_setting();
		return h.setting_to_mode(setting);
	}

	function set(s: h.ColourSchemeSetting) {
		event_listener_store.call_on_all_cbs(s);
		set_setting_to_storage(s);
	}

	const watch = h.watch(event_listener_store);

	const unwatch = h.unwatch(event_listener_store);

	return { get, get_setting, set, watch, unwatch };
}

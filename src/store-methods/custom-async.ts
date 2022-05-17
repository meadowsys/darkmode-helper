import * as h from "../helpers";

export function create_custom_async(
	get_setting_from_storage: () => Promise<h.ColourSchemeSetting>,
	set_setting_to_storage: (s: h.ColourSchemeSetting) => Promise<void>,
	// watch: (s: h.ColourSchemeSetting) => Promise<void>
): h.DarkModeHelper<"async"> {
	const event_listener_store = h.create_event_listener_store("async", get_setting);

	function get_setting(): Promise<h.ColourSchemeSetting> {
		return get_setting_from_storage();
	}

	async function get(): Promise<h.ColourScheme> {
		const setting = await get_setting();
		return h.setting_to_mode(setting);
	}

	function set(s: h.ColourSchemeSetting) {
		event_listener_store.call_on_all_cbs(s);
		return set_setting_to_storage(s);
	}

	const watch = h.watch(event_listener_store);

	const unwatch = h.unwatch(event_listener_store);

	return { get, get_setting, set, watch, unwatch };
}

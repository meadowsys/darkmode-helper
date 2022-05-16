import * as h from "../helpers";

export function create_custom_async(
	get_setting_from_storage: () => Promise<h.ColourSchemeSetting>,
	set_setting_to_storage: (s: h.ColourSchemeSetting) => Promise<void>,
	// watch: (s: h.ColourSchemeSetting) => Promise<void>
): h.DarkModeHelper<"async"> {
	return { get, get_setting, set };

	function get_setting(): Promise<h.ColourSchemeSetting> {
		return get_setting_from_storage();
	}

	async function get(): Promise<h.ColourScheme> {
		let setting = await get_setting();
		return h.setting_to_mode(setting);
	}

	async function set(s: h.ColourSchemeSetting) {
		await set_setting_to_storage(s);
	}
}

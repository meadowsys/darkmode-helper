import type { ColourSchemeSetting, SettingStore } from "./helpers";
import { init_setting } from "./helpers";

export async function create_local_storage(key = "__darkmode-helper_mode__"): Promise<SettingStore> {
	async function get_setting(): Promise<ColourSchemeSetting> {
		return localStorage.getItem(key) as ColourSchemeSetting;
	}

	async function set_setting(setting: ColourSchemeSetting) {
		localStorage.setItem(key, setting);
	}

	await init_setting(get_setting, set_setting);

	return { get_setting, set_setting };
}

export async function create_custom(
	_get_setting: () => ColourSchemeSetting | Promise<ColourSchemeSetting>,
	_set_setting: (s: ColourSchemeSetting) => void | Promise<void>
): Promise<SettingStore> {
	const get_setting = () => Promise.resolve(_get_setting());
	const set_setting = (s: ColourSchemeSetting) => Promise.resolve(_set_setting(s));

	await init_setting(get_setting, set_setting);

	return { get_setting, set_setting };
}

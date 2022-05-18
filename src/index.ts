import {
	ColourScheme,
	ColourSchemeSetting,
	ColourSchemeModeAndSetting,
	SettingStore,
	WatchCallback,
	create_settings_cache
} from "./helpers";

export * from "./stores";
export * from "./util";

export type {
	ColourScheme,
	ColourSchemeModeAndSetting,
	ColourSchemeSetting,
	SettingStore,
	WatchCallback
} from "./helpers";

/**
 * creates a dark mode helper
 */
export async function define_darkmode_helper(
	_settings_store: SettingStore | Promise<SettingStore>
) {
	let watch_cbs: Array<WatchCallback> = [];
	const cached_setting = create_settings_cache(
		s => watch_cbs.forEach(cb => cb(s))
	);
	const settings_store = await Promise.resolve(_settings_store);
	cached_setting.set(await settings_store.get_setting());

	async function get_setting_and_mode(bypass = false): Promise<ColourSchemeModeAndSetting> {
		if (bypass) return cached_setting.set(await settings_store.get_setting());
		return cached_setting.get();
	}

	async function get(bypass = false): Promise<ColourScheme> {
		return (await get_setting_and_mode(bypass)).mode;
	}

	async function get_setting(bypass = false): Promise<ColourSchemeSetting> {
		return (await get_setting_and_mode(bypass)).setting;
	}

	async function set_setting(setting: ColourSchemeSetting): Promise<void> {
		await settings_store.set_setting(setting);
		const mode_and_setting = cached_setting.set(setting);
		watch_cbs.forEach(cb => cb(mode_and_setting));
	}

	function watch(cb: WatchCallback) {
		get_setting_and_mode().then(cb);
		watch_cbs.push(cb);
	}

	function unwatch(cb: WatchCallback) {
		const i = watch_cbs.findIndex(c => c === cb);
		i >= 0 && watch_cbs.splice(i, 1);
	}

	const helper = {
		get,
		get_setting,
		get_setting_and_mode,
		set_setting,
		watch,
		unwatch
	};

	return function use_darkmode_helper() {
		return helper;
	}
}

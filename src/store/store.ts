/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preferences } from '@capacitor/preferences';

export const store = {
	async get<T>(key: string) {
		const ret = await Preferences.get({ key });
		if (ret.value && ret.value !== 'undefined') {
			return JSON.parse(ret.value) as T;
		}
	},

	async remove(key: string) {
		await Preferences.remove({
			key
		});
	},

	async set(key: string, value: any) {
		await Preferences.set({
			key,
			value: JSON.stringify(value)
		});
	}
};

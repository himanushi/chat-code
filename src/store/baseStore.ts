import { writable } from 'svelte/store';
import { store } from './store';

export const baseStore = <T>({ key, initialValue }: { key: string; initialValue: T }) => {
	const { subscribe, set } = writable<T>(initialValue);

	store.get<T>(key).then((value) => {
		if (value) {
			set(value);
		}
	});

	return {
		subscribe,
		set: (value: T) => {
			store.set(key, value);
			set(value);
		}
	};
};

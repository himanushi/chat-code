import { writable } from 'svelte/store';
import { store } from './store';

export const booleanStore = ({ key, initialValue }: { key: string; initialValue: boolean }) => {
	const { subscribe, set } = writable<boolean>(initialValue);

	store.get<boolean>(key).then((value) => {
		if (value !== undefined) set(value);
	});

	return {
		subscribe,
		set: (value: boolean) => {
			store.set(key, value);
			set(value);
		}
	};
};

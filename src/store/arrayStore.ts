import { writable } from 'svelte/store';
import { store } from './store';

type UpdateFunction<T> = (array: T) => T;

export const arrayStore = <T extends any[]>({
	key,
	initialValue
}: {
	key: string;
	initialValue: T;
}) => {
	const { subscribe, set, update } = writable<T>(initialValue);

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
		},
		push: (value: T[number]) => {
			update(((array: T) => {
				const result = [...array, value];
				store.set(key, result);
				return result;
			}) as UpdateFunction<T>);
		},
		remove: (index: number) => {
			update(((array: T) => {
				const result = array.filter((_, i) => i !== index);
				store.set(key, result);
				return result;
			}) as UpdateFunction<T>);
		},
		edit: (index: number, value: T[number]) => {
			update(((array: T) => {
				const result = [...array];
				result[index] = value;
				store.set(key, result);
				return result;
			}) as UpdateFunction<T>);
		},
		move: (from: number, to: number) => {
			update(((array: T) => {
				const result = [...array];
				const [removed] = result.splice(from, 1);
				result.splice(to, 0, removed);
				store.set(key, result);
				return result;
			}) as UpdateFunction<T>);
		}
	};
};

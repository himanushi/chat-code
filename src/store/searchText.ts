import { baseStore } from './baseStore';

export const searchText = baseStore<string | null | undefined>({
	key: 'searchText',
	initialValue: undefined
});

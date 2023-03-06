import { writable } from 'svelte/store';
import { store } from './store';

export type ApiKeyType = string | undefined;
export const apiKeyStoreId = 'apiKey';

const createApiKey = () => {
	const { subscribe, update } = writable<ApiKeyType>(undefined);

	return {
		subscribe,
		update: (key: ApiKeyType | undefined) => {
			update(() => {
				store.set(apiKeyStoreId, key);
				return key;
			});
		}
	};
};

export const apiKey = createApiKey();

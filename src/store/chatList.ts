import { writable } from 'svelte/store';
import { store } from './store';
import type { ChatCompletionRequestMessage, CreateCompletionResponseUsage } from 'openai';

export type ContentType = {
	messages: ChatCompletionRequestMessage[];
	usages: CreateCompletionResponseUsage[];
};

export type ChatListType = {
	[key: string]: ContentType;
};

export const chatListStoreId = 'chatList';

const createChatList = () => {
	const { subscribe, update } = writable<ChatListType>({});

	return {
		delete: (id: string) => {
			update((object) => {
				delete object[id];
				store.set(chatListStoreId, object);
				return object;
			});
		},
		remember: (object: ChatListType | undefined = {}) => {
			update(() => object);
		},
		update: (id: string, value: ContentType) => {
			update((object) => {
				object[id] = value;
				store.set(chatListStoreId, object);
				return object;
			});
		},
		subscribe
	};
};

export const chatList = createChatList();

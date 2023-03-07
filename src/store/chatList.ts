import { writable } from 'svelte/store';
import { store } from './store';
import type { ChatCompletionRequestMessage, CreateCompletionResponseUsage } from 'openai';

export type ContentType = {
	messages: ChatCompletionRequestMessage[];
	usages: CreateCompletionResponseUsage[];
};

export type ChatType = {
	id: string;
	content: ContentType;
};

export type ChatListType = ChatType[];

export const chatListStoreId = 'chatList';

const createChatList = () => {
	const { subscribe, update } = writable<ChatListType>([]);

	return {
		delete: (id: string) => {
			update((object) => {
				const list = object.filter((item) => item.id !== id);
				store.set(chatListStoreId, list);
				return list;
			});
		},
		remember: (object: ChatListType) => {
			update(() => object);
		},
		add: (value: ChatType) => {
			update((object) => {
				if (object) {
					const list = [...object, value];
					store.set(chatListStoreId, list);
					return list;
				} else if (value) {
					store.set(chatListStoreId, [value]);
					return [value];
				}
				return object;
			});
		},
		update: (id: string, value: ContentType) => {
			update((object) => {
				const prevValue = object.find((item) => item.id === id);
				if (!prevValue) return object;

				prevValue.content = value;
				store.set(chatListStoreId, object);
				return object;
			});
		},
		subscribe
	};
};

export const chatList = createChatList();

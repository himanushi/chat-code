import { writable } from 'svelte/store';
import { store } from './store';
import type { ChatCompletionRequestMessage, CreateCompletionResponseUsage } from 'openai';

export type ChatCompletionRequestMessageWithTimeStamp = ChatCompletionRequestMessage & {
	timestamp?: number;
};

export type CreateCompletionResponseUsageWithModel = CreateCompletionResponseUsage & {
	model?: string;
};

export type ContentType = {
	messages: ChatCompletionRequestMessageWithTimeStamp[];
	usages: CreateCompletionResponseUsageWithModel[];
};

export type ChatType = {
	id: string;
	content: ContentType;
};

export type ChatListType = ChatType[];

export const chatListStoreId = 'chatList';

const filter = (data: ChatListType) =>
	data.filter((obj, index) => {
		return index === data.findIndex((t) => t.id === obj.id);
	});

const createChatList = () => {
	const { subscribe, update } = writable<ChatListType>([]);

	store.get<ChatListType>(chatListStoreId).then((value) => {
		if (value) {
			update(() => value);
		}
	});

	return {
		delete: (id: string) => {
			update((object) => {
				const list = object.filter((item) => item.id !== id);
				store.set(chatListStoreId, list);
				return list;
			});
		},
		add: (value: ChatType) => {
			update((object) => {
				if (object) {
					const list = filter([...object, value]);
					store.set(chatListStoreId, list);
					return list;
				} else if (value) {
					store.set(chatListStoreId, [value]);
					return [value];
				}
				return object;
			});
		},
		updateMessages: (id: string, messages: ChatCompletionRequestMessageWithTimeStamp[]) => {
			update((object) => {
				const prevValue = object.find((item) => item.id === id);
				if (!prevValue) return object;

				prevValue.content.messages = messages;
				store.set(chatListStoreId, object);
				return object;
			});
		},
		updateUsages: (id: string, usages: CreateCompletionResponseUsageWithModel[]) => {
			update((object) => {
				const prevValue = object.find((item) => item.id === id);
				if (!prevValue) return object;

				prevValue.content.usages = usages;
				store.set(chatListStoreId, object);
				return object;
			});
		},
		subscribe
	};
};

export const chatList = createChatList();

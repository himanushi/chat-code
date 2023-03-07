import {
	Configuration,
	OpenAIApi,
	type ChatCompletionRequestMessage,
	type CreateCompletionResponseUsage
} from 'openai';
import { assign, createMachine } from 'xstate';
import { chatListStoreId, type ChatListType } from '~/store/chatList';
import { store } from '~/store/store';

type Context = {
	id?: string;
	openai?: OpenAIApi;
	model: string;
	apiKey?: string;
	messages: ChatCompletionRequestMessage[];
	usages: CreateCompletionResponseUsage[];
};

type Events =
	| { type: 'INIT' }
	| { type: 'SET_API_TOKEN'; apiKey: string }
	| { type: 'SET_ID'; id: string }
	| { type: 'ADD_MESSAGES'; messages: ChatCompletionRequestMessage[] }
	| { type: 'ADD_USAGES'; usages: CreateCompletionResponseUsage[] };

export const chatMachine = createMachine(
	{
		schema: {
			context: {} as Context,
			events: {} as Events
		},
		id: 'chat',
		context: {
			model: 'gpt-3.5-turbo',
			messages: [],
			usages: []
		},
		initial: 'idle',
		states: {
			idle: {
				on: {
					SET_API_TOKEN: { actions: 'setApiKey' },
					SET_ID: { actions: 'setId' },
					INIT: {
						actions: 'setOpenAi',
						target: 'initializing'
					}
				}
			},
			initializing: {
				invoke: {
					src:
						({ id }) =>
						(callback) => {
							(async () => {
								const chatList = await store.get<ChatListType>(chatListStoreId);
								if (id && chatList) {
									const messages = chatList[id].messages ?? [];
									const usages = chatList[id].usages ?? [];
									callback({ type: 'ADD_MESSAGES', messages });
									callback({ type: 'ADD_USAGES', usages });
								}
								callback('INIT');
							})();
						}
				},
				on: {
					ADD_MESSAGES: { actions: 'addMessages' },
					ADD_USAGES: { actions: 'addUsages' },
					INIT: 'ready'
				}
			},
			ready: {
				on: {
					ADD_MESSAGES: {
						actions: 'addMessages',
						target: 'chatting'
					}
				}
			},
			chatting: {
				invoke: {
					src:
						({ openai, model, messages }) =>
						(callback) => {
							if (!openai) {
								throw new Error('OpenAI not initialized');
							}
							openai
								.createChatCompletion({
									model: model,
									messages
								})
								.then((response) => {
									if (response.data.usage) {
										callback({
											type: 'ADD_USAGES',
											usages: [response.data.usage]
										});
									}
									const content = response.data.choices[0].message?.content;
									if (content) {
										callback({
											type: 'ADD_MESSAGES',
											messages: [{ role: 'assistant', content }]
										});
									}
								});
						}
				},
				on: {
					ADD_MESSAGES: {
						actions: 'addMessages',
						target: 'ready'
					},
					ADD_USAGES: { actions: 'addUsages' }
				}
			}
		}
	},
	{
		actions: {
			setApiKey: assign({
				apiKey: (_, event) => ('apiKey' in event ? event.apiKey : undefined)
			}),
			setId: assign({
				id: (_, event) => ('id' in event ? event.id : undefined)
			}),
			setOpenAi: assign({
				openai: ({ apiKey }) => {
					if (!apiKey) return;
					return new OpenAIApi(new Configuration({ apiKey }));
				}
			}),
			addMessages: assign({
				messages: ({ messages }, event) => {
					console.log({ event });
					if (!('messages' in event)) return messages;
					return [...messages, ...event.messages];
				}
			}),
			addUsages: assign({
				usages: ({ usages }, event) => {
					if (!('usages' in event)) return usages;
					return [...usages, ...event.usages];
				}
			})
		}
	}
);

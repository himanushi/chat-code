import { toastController } from '@ionic/core';
import {
	Configuration,
	OpenAIApi,
	type ChatCompletionRequestMessage,
	type CreateCompletionResponseUsage
} from 'openai';
import { assign, createMachine, interpret } from 'xstate';
import {
	chatList,
	chatListStoreId,
	type ChatCompletionRequestMessageWithTimeStamp,
	type ChatListType
} from '~/store/chatList';
import { store } from '~/store/store';

type Context = {
	id?: string;
	openai?: OpenAIApi;
	model: string;
	apiKey?: string;
	messages: ChatCompletionRequestMessageWithTimeStamp[];
	usages: CreateCompletionResponseUsage[];
};

type Events =
	| { type: 'INIT' }
	| { type: 'READY' }
	| { type: 'SET_API_TOKEN'; apiKey: string }
	| { type: 'SET_ID'; id: string }
	| { type: 'RESET' }
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
		on: { SET_ID: { actions: 'setId', target: 'initializing' } },
		states: {
			idle: {
				on: {
					SET_API_TOKEN: { actions: ['setApiKey', 'setOpenAi'] },
					SET_ID: { actions: 'setId' },
					INIT: 'initializing'
				}
			},
			initializing: {
				invoke: {
					src:
						({ id }) =>
						(callback) => {
							(async () => {
								const cList = (await store.get<ChatListType>(chatListStoreId)) ?? [];
								const chat = cList.find((item) => item.id === id);
								callback('RESET');
								if (chat) {
									const { messages, usages } = chat.content;
									callback({ type: 'ADD_MESSAGES', messages });
									callback({ type: 'ADD_USAGES', usages });
								} else if (id) {
									chatList.add({
										id,
										content: { messages: [], usages: [] }
									});
								}
								callback('INIT');
							})();
						}
				},
				on: {
					ADD_MESSAGES: { actions: 'addMessages' },
					ADD_USAGES: { actions: 'addUsages' },
					INIT: 'ready',
					RESET: { actions: 'reset' }
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
						({ id, openai, model, messages }) =>
						(callback) => {
							if (!openai) {
								throw new Error('OpenAI not initialized');
							}

							openai
								.createChatCompletion({
									model: model,
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									messages: messages.map(({ timestamp, ...message }) => message)
								})
								.then((response) => {
									const content = response.data.choices[0].message?.content;
									const usage = response.data.usage;
									if (content && usage && id) {
										const message = { role: 'assistant', content } as ChatCompletionRequestMessage;
										callback({
											type: 'ADD_USAGES',
											usages: [usage]
										});
										callback({
											type: 'ADD_MESSAGES',
											messages: [message]
										});
									}
								})
								.catch((error) => {
									toastController
										.create({
											message: error.message,
											duration: 10000,
											color: 'danger'
										})
										.then((toast) => toast.present());
									callback('READY');
								});
						}
				},
				on: {
					READY: 'ready',
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
				messages: ({ id, messages }, event) => {
					if (!('messages' in event) || !id) return messages;
					const results = [
						...messages,
						...event.messages.map((message) => ({ timestamp: Date.now(), ...message }))
					];
					chatList.updateMessages(id, results);
					return results;
				}
			}),
			addUsages: assign({
				usages: ({ id, usages }, event) => {
					if (!('usages' in event) || !id) return usages;
					const results = [...usages, ...event.usages];
					chatList.updateUsages(id, results);
					return results;
				}
			}),
			reset: assign({
				usages: () => [],
				messages: () => []
			})
		}
	}
);

export const chatService = interpret(chatMachine).start();

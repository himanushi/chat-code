import {
	ChatCompletionRequestMessageRoleEnum,
	Configuration,
	OpenAIApi,
	type ChatCompletionRequestMessage
} from 'openai';
import { assign, createMachine } from 'xstate';
import { store } from '~/store/store';

type Context = {
	id?: string;
	openai?: OpenAIApi;
	model: string;
	apiKey?: string;
	messages: ChatCompletionRequestMessage[];
};

type Events =
	| { type: 'SET_ID'; id: string }
	| { type: 'SET_API_KEY'; apiKey: string }
	| { type: 'ADD_MESSAGE'; role: ChatCompletionRequestMessageRoleEnum; message: string };

export const chatMachine = createMachine(
	{
		schema: {
			context: {} as Context,
			events: {} as Events
		},
		id: 'chat',
		context: {
			model: 'gpt-3.5-turbo',
			messages: []
		},
		initial: 'idle',
		states: {
			idle: {
				exit: 'setOpenAi',
				on: {
					SET_API_KEY: {
						actions: 'setApiKey',
						target: 'ready'
					}
				}
			},
			ready: {
				on: {
					SET_API_KEY: {
						actions: ['setApiKey', 'setOpenAi']
					},
					ADD_MESSAGE: {
						actions: 'addMessage',
						target: 'chatting'
					}
				}
			},
			chatting: {
				invoke: {
					id: 'chatting',
					src:
						({ openai, model, messages }) =>
						(callback) => {
							if (!openai) {
								throw new Error('OpenAI not initialized');
							}
							// openai
							// 	.createChatCompletion({
							// 		max_tokens: input,
							// 		model: model,
							// 		messages,
							// 		stop: '\n'
							// 	})
							// 	.then((response) => {
							// 		callback({ type: 'CHAT', input: response.data.choices[0].text });
							// 	});
						}
				},
				on: {
					ADD_MESSAGE: {
						actions: 'addMessage',
						target: 'ready'
					}
				}
			}
		}
	},
	{
		actions: {
			setApiKey: assign({
				apiKey: (_, event) => {
					if (!('apiKey' in event)) return;
					store.set('apiKey', event.apiKey);
					return event.apiKey;
				}
			}),
			setOpenAi: assign({
				openai: ({ apiKey }) => {
					if (!apiKey) return;
					return new OpenAIApi(new Configuration({ apiKey }));
				}
			}),
			addMessage: assign({
				messages: ({ messages }, event) => {
					if (!('message' in event)) return messages;
					return [
						...messages,
						{ role: event.role, content: event.message } as ChatCompletionRequestMessage
					];
				}
			})
		}
	}
);

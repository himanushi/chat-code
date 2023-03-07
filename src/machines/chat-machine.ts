import {
	ChatCompletionRequestMessageRoleEnum,
	Configuration,
	OpenAIApi,
	type ChatCompletionRequestMessage,
	type CreateCompletionResponseUsage
} from 'openai';
import { assign, createMachine } from 'xstate';

type Context = {
	id?: string;
	openai?: OpenAIApi;
	model: string;
	apiKey?: string;
	messages: ChatCompletionRequestMessage[];
	usages: CreateCompletionResponseUsage[];
};

type Events =
	| { type: 'INIT'; id: string; apiKey: string }
	| { type: 'ADD_MESSAGE'; role: ChatCompletionRequestMessageRoleEnum; message: string }
	| { type: 'ADD_USAGE'; usage: CreateCompletionResponseUsage | undefined };

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
					INIT: {
						actions: ['setId', 'setApiKey', 'setOpenAi'],
						target: 'ready'
					}
				}
			},
			ready: {
				on: {
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
							openai
								.createChatCompletion({
									model: model,
									messages
								})
								.then((response) => {
									callback({
										type: 'ADD_USAGE',
										usage: response.data.usage
									});
									callback({
										type: 'ADD_MESSAGE',
										role: 'assistant',
										message: response.data.choices[0].message?.content ?? ''
									});
								});
						}
				},
				on: {
					ADD_MESSAGE: {
						actions: 'addMessage',
						target: 'ready'
					},
					ADD_USAGE: {
						actions: 'addUsage'
					}
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
			addMessage: assign({
				messages: ({ messages }, event) => {
					if (!('message' in event)) return messages;
					return [
						...messages,
						{ role: event.role, content: event.message } as ChatCompletionRequestMessage
					];
				}
			}),
			addUsage: assign({
				usages: ({ usages }, event) => {
					if (!('usage' in event)) return usages;
					return [
						...usages,
						{
							completion_tokens: event.usage?.completion_tokens ?? 0,
							prompt_tokens: event.usage?.prompt_tokens ?? 0,
							total_tokens: event.usage?.total_tokens ?? 0
						}
					];
				}
			})
		}
	}
);

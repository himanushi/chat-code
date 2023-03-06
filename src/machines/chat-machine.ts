import {
	ChatCompletionRequestMessageRoleEnum,
	Configuration,
	OpenAIApi,
	type ChatCompletionRequestMessage
} from 'openai';
import { assign, createMachine } from 'xstate';

type Context = {
	id?: string;
	openai?: OpenAIApi;
	model: string;
	apiKey?: string;
	messages: ChatCompletionRequestMessage[];
};

type Events =
	| { type: 'INIT'; id: string; apiKey: string }
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
							console.log({ openai });
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
			})
		}
	}
);

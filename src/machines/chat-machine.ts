import { Configuration, OpenAIApi } from 'openai';
import { assign, createMachine, interpret } from 'xstate';
import { store } from '~/store/store';

type Context = { openai?: OpenAIApi; model: string };
type Events = { type: 'INIT_OPENAI'; apiKey: string } | { type: 'CHAT'; input: string };

const chatMachine = createMachine(
	{
		schema: {
			context: {} as Context,
			events: {} as Events
		},
		id: 'chat',
		initial: 'idle',
		context: {
			model: 'gpt-3.5-turbo'
		},
		states: {
			idle: {
				on: {
					INIT_OPENAI: {
						actions: 'initOpenAI'
					}
				}
			},
			ready: {
				on: {
					CHAT: 'chatting'
				}
			},
			chatting: {
				invoke: {
					id: 'chatting',
					src: async ({ openai, model }, { input }) => {
						// // openai?.usage();
						// if (!openai) {
						// 	throw new Error('OpenAI not initialized');
						// }
						// const response = await openai.createChatCompletion({
						// 	max_tokens: input,
						// 	model: model,
						// 	messages: [{ role: 'user', content: input }],
						// 	stop: '\n'
						// });
						// return '';
					}
				}
			}
		}
	},
	{
		actions: {
			initOpenAI: assign({
				openai: (_, event) => {
					if (!('apiKey' in event)) return;
					store.set('apiKey', event.apiKey);
					return new OpenAIApi(new Configuration({ apiKey: event.apiKey }));
				}
			})
		}
	}
);

export const chatService = interpret(chatMachine).start();

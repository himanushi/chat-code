import { Configuration, OpenAIApi } from 'openai';
import { assign, createMachine } from 'xstate';

export const Models = ['gpt-3.5-turbo', 'gpt-3.5', 'gpt-3.4', 'gpt-3.3'];

const chatMachine = createMachine(
	{
		schema: {
			context: {} as { openai?: OpenAIApi; model: string },
			events: {} as
				| { type: 'INIT_OPENAI'; apiKey: string }
				| { type: 'SET_MODEL'; model: string }
				| { type: 'CHAT'; input: string }
		},
		id: 'chat',
		initial: 'idle',
		context: {
			model: Models[0]
		},
		states: {
			idle: {
				on: {
					INIT_OPENAI: {
						actions: 'initOpenAI'
					}
				}
			},
			loading: {
				invoke: {
					id: 'generate-chat',
					src: async (_, { input }) => {
						const response = await openai.createCompletion({
							model: OPENAI_MODEL,
							prompt: `User: ${input}\nAI:`,
							max_tokens: 50,
							n: 1,
							stop: '\n'
						});
						const { choices } = response.data;
						const { text } = choices[0];
						return text?.trim();
					},
					onDone: {
						target: 'success',
						actions: (_, event) => console.log(event.data)
					},
					onError: {
						target: 'failure',
						actions: (_, event) => console.error(event.data)
					}
				}
			},
			success: {},
			failure: {}
		}
	},
	{
		actions: {
			initOpenAI: assign({
				openai: (_, { apiKey }) => new OpenAIApi(new Configuration({ apiKey }))
			})
		}
	}
);

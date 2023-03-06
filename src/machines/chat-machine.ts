import { Configuration, OpenAIApi } from 'openai';
import { assign, createMachine } from 'xstate';

// OpenAI APIの認証情報
// const OPENAI_API_KEY = 'your-api-key-here';
const OPENAI_MODEL = 'gpt-3.5-turbo';

export const Models = ['gpt-3.5-turbo', 'gpt-3.5', 'gpt-3.4', 'gpt-3.3'];

// XStateの状態マシン定義
const chatMachine = createMachine(
	{
		schema: {
			context: {} as { openai?: OpenAIApi; model: string },
			events: {} as { type: 'INIT_OPENAI'; apiKey: string }
		},
		id: 'chat',
		initial: 'idle',
		context: {},
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

import { baseStore } from './baseStore';

export const models = [
	{
		name: 'gpt-4-32k',
		promptPrice: 0.00006,
		completionPrice: 0.00012,
		description: 'Max 32768 tokens.'
	},
	{
		name: 'gpt-4',
		promptPrice: 0.00003,
		completionPrice: 0.00006,
		description: 'Max 8192 tokens.'
	},
	{
		name: 'gpt-3.5-turbo',
		promptPrice: 0.000002,
		completionPrice: 0.000002,
		description: 'Max 4096 tokens.'
	}
];

export const defaultValue = 'gpt-3.5-turbo';

export const openaiModel = baseStore<string>({ key: 'openaiModel', initialValue: defaultValue });

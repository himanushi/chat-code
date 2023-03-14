import { baseStore } from './baseStore';

export const models = [
	{ name: 'gpt-3.5-turbo', price: 0.000002 },
	{ name: 'gpt-3.5-turbo-0301', price: 0.000002 }
];

export const defaultValue = 'gpt-3.5-turbo';

export const openaiModel = baseStore<string>({ key: 'openaiModel', initialValue: defaultValue });

import { baseStore } from './baseStore';

export const defaultValue = 4000;

export const openaiMaxTokens = baseStore<number>({
	key: 'openaiMaxTokens',
	initialValue: defaultValue
});

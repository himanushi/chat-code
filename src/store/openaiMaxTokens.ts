import { baseStore } from './baseStore';

export const defaultValue = 4096;

export const openaiMaxTokens = baseStore<number>({
	key: 'openaiMaxTokens',
	initialValue: defaultValue
});

import { baseStore } from './baseStore';

export const defaultValue = undefined;

export const openaiMaxTokens = baseStore<number | undefined>({
	key: 'openaiMaxTokens',
	initialValue: defaultValue
});

import { baseStore } from './baseStore';

export const defaultValue = 1;

export const openaiTopP = baseStore<number>({
	key: 'openaiTopP',
	initialValue: defaultValue
});

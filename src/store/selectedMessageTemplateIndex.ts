import { baseStore } from './baseStore';

export const selectedMessageTemplateIndex = baseStore<number>({
	key: 'selectedMessageTemplateIndex',
	initialValue: -1
});

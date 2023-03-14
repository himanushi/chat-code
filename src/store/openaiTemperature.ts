import { baseStore } from './baseStore';

export const defaultValue = 1;

export const openaiTemperature = baseStore<number>({
	key: 'openaiTemperature',
	initialValue: defaultValue
});

import { baseStore } from './baseStore';

export const currencyExchangeRate = baseStore<number>({
	key: 'currencyExchangeRate',
	initialValue: 137
});

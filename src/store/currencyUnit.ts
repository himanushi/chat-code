import { baseStore } from './baseStore';

export const currencyUnit = baseStore<string>({ key: 'currencyUnit', initialValue: '円' });
